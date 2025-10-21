export const runtime = 'edge'

const CHAINS = [
  'cosmoshub',
  'osmosis',
  'juno',
  'akash',
  'stargaze',
  'kujira',
  'evmos',
  'celestia',
  'noble',
  'sei',
]

type ChainState = {
  lastProposalId?: number
  lastProposalStatus?: string
  lastUpgradeName?: string
  lastEndingSoonId?: number
}

async function fetchLatestProposal(chain: string) {
  const url = `https://rest.cosmos.directory/${chain}/cosmos/gov/v1/proposals?pagination.reverse=true&pagination.limit=1`
  const res = await fetch(url, { headers: { 'accept': 'application/json' } })
  if (!res.ok) return null
  const json = await res.json()
  const p = json?.proposals?.[0]
  if (!p?.id) return null
  const id = Number(p.id)
  const submit_time = p.submit_time as string | undefined
  const title = (p.summary || p.messages?.[0]?.content?.title || p.title || 'New governance proposal') as string
  const status = p.status as string | undefined
  const voting_end_time = p.voting_end_time as string | undefined
  return { id, title, status, submit_time, voting_end_time }
}

async function fetchCurrentUpgrade(chain: string) {
  const url = `https://rest.cosmos.directory/${chain}/cosmos/upgrade/v1beta1/current_plan`
  const res = await fetch(url, { headers: { 'accept': 'application/json' } })
  if (!res.ok) return null
  const json = await res.json()
  const plan = json?.plan
  if (!plan?.name) return null
  return {
    name: String(plan.name),
    height: plan.height ? Number(plan.height) : undefined,
    time: plan.time as string | undefined,
    info: plan.info as string | undefined,
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const intervalMs = Number(searchParams.get('interval') ?? 15000)
  const chainsParam = searchParams.get('chains')
  let targetChains = chainsParam
    ? chainsParam.split(',').map((s) => s.trim()).filter(Boolean)
    : CHAINS
  const endingSoonMs = Number(searchParams.get('endingSoonMs') ?? 2 * 60 * 60 * 1000)
  const useAll = chainsParam === 'all'

  async function fetchAllChainSlugs(): Promise<string[]> {
    try {
      const res = await fetch('https://chains.cosmos.directory/', { headers: { 'accept': 'application/json' } })
      if (!res.ok) return CHAINS
      const json = await res.json() as any
      const arr = Array.isArray(json?.chains) ? json.chains : []
      const slugs = arr.map((c: any) => c?.name || c?.path || c?.chain_name).filter(Boolean)
      // de-dup and basic sanity
      return Array.from(new Set(slugs))
    } catch {
      return CHAINS
    }
  }

  const encoder = new TextEncoder()
  const keepAliveMs = 20000

  const states = new Map<string, ChainState>()

  const stream = new ReadableStream({
    start(controller) {
      let closed = false

      async function emit(obj: unknown) {
        if (closed) return
        const line = `data: ${JSON.stringify(obj)}\n\n`
        controller.enqueue(encoder.encode(line))
      }

      async function pollChain(chain: string) {
        try {
          // Ambil hanya 1 proposal terbaru; emit maksimal 1 event
          const latest = await fetchLatestProposal(chain)
          if (latest?.id) {
            const prev = states.get(chain) || {}
            // 1) Proposal baru
            if (!prev.lastProposalId || latest.id > prev.lastProposalId) {
              states.set(chain, { ...prev, lastProposalId: latest.id, lastProposalStatus: latest.status })
              await emit({
                type: 'proposal',
                chain,
                id: latest.id,
                title: latest.title,
                status: latest.status,
                time: latest.submit_time,
              })
              return
            }
            // 2) Perubahan status
            if (prev.lastProposalId === latest.id && latest.status && latest.status !== prev.lastProposalStatus) {
              states.set(chain, { ...prev, lastProposalStatus: latest.status })
              await emit({
                type: 'proposal_status',
                chain,
                id: latest.id,
                status: latest.status,
                time: latest.submit_time,
              })
              return
            }
            // 3) Voting berakhir segera
            if (latest.voting_end_time) {
              const endTs = Date.parse(latest.voting_end_time)
              if (Number.isFinite(endTs)) {
                const msLeft = endTs - Date.now()
                if (msLeft > 0 && msLeft <= endingSoonMs) {
                  const prevLE = states.get(chain)?.lastEndingSoonId
                  if (prevLE !== latest.id) {
                    states.set(chain, { ...(states.get(chain) || {}), lastEndingSoonId: latest.id })
                    await emit({
                      type: 'proposal_ending_soon',
                      chain,
                      id: latest.id,
                      voting_end_time: latest.voting_end_time,
                    })
                    return
                  }
                }
              }
            }
          }
        } catch {}

        try {
          // Upgrades: emit when current plan changes (scheduled)
          const up = await fetchCurrentUpgrade(chain)
          if (up?.name) {
            const prev = states.get(chain) || {}
            if (up.name !== prev.lastUpgradeName) {
              states.set(chain, { ...prev, lastUpgradeName: up.name })
              await emit({
                type: 'upgrade',
                chain,
                name: up.name,
                height: up.height,
                time: up.time,
              })
              return
            }
          }
        } catch {}
      }

      // Resolve chain list (optionally from chain-registry aggregator)
      let chainsReady: Promise<string[]>
      if (useAll) {
        chainsReady = fetchAllChainSlugs()
      } else {
        chainsReady = Promise.resolve(targetChains)
      }
      chainsReady.then((chains) => {
        targetChains = chains
        // Initial poll satu chain acak
        if (targetChains.length > 0) {
          const idx = Math.floor(Math.random() * targetChains.length)
          void pollChain(targetChains[idx])
        }
      })

      // Satu notif/interval: random chain
      const poller = setInterval(() => {
        if (targetChains.length === 0) return
        const idx = Math.floor(Math.random() * targetChains.length)
        void pollChain(targetChains[idx])
      }, intervalMs)

      const pinger = setInterval(() => {
        controller.enqueue(encoder.encode(`: keepalive\n\n`))
      }, keepAliveMs)

      const abort = () => {
        if (closed) return
        closed = true
        clearInterval(poller)
        clearInterval(pinger)
        controller.close()
      }

      // @ts-ignore - property exists in edge runtime
      req.signal?.addEventListener('abort', abort)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
