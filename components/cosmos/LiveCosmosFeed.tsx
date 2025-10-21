"use client"

import * as React from "react"
import { BellRing } from "lucide-react"
import { cn } from "@/lib/utils"
import AnimatedListDemo, { type Item } from "@/components/ui/animated-list-demo"

const chainColor: Record<string, string> = {
  cosmoshub: "#4F46E5",
  osmosis: "#7C3AED",
  juno: "#2563EB",
  akash: "#DC2626",
  stargaze: "#0EA5E9",
  kujira: "#111827",
  evmos: "#F97316",
  celestia: "#9333EA",
  noble: "#0EA5E9",
  sei: "#EF4444",
}

const iconFor = () => <BellRing size={24} />

function fmtTime(input?: string) {
  if (!input) return "now"
  try {
    const d = new Date(input)
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  } catch {
    return "now"
  }
}

// Ensure text length is consistently capped
function shortenTo105(input: string | undefined, max = 105) {
  if (!input) return ""
  let s = input.replace(/\*\*?|__|~~/g, "").replace(/\s+/g, " ").trim()
  if (s.length <= max) return s
  return s.slice(0, max - 1).trimEnd() + "…"
}

const chainDisplayMap: Record<string, string> = {
  cosmoshub: "COSMOS HUB",
  osmosis: "OSMOSIS",
  juno: "JUNO",
  akash: "AKASH",
  stargaze: "STARGAZE",
  kujira: "KUJIRA",
  evmos: "EVMOS",
  celestia: "CELESTIA",
  noble: "NOBLE",
  sei: "SEI",
}

function displayChain(chain: string) {
  return chainDisplayMap[chain] ?? chain.toUpperCase()
}

function makeDescription(chain: string, title: string | undefined) {
  const up = displayChain(chain)
  const budget = Math.max(0, 105 - (up.length + 3))
  const shortTitle = shortenTo105(sanitizeText(title ?? ""), budget)
  return (
    <>
      <strong className="font-semibold">{up}</strong>
      {" • "}
      {shortTitle}
    </>
  )
}

function makeUpgradeDescription(chain: string, tail: string) {
  const up = displayChain(chain)
  const budget = Math.max(0, 105 - (up.length + 3))
  const shortTail = shortenTo105(sanitizeText(tail), budget)
  return (
    <>
      <strong className="font-semibold">{up}</strong>
      {" • "}
      {shortTail}
    </>
  )
}


export function LiveCosmosFeed({ className, showBadge = true }: { className?: string; showBadge?: boolean }) {
  const [items, setItems] = React.useState<Item[]>([])
  const [status, setStatus] = React.useState<'connecting' | 'open' | 'closed'>(
    'connecting'
  )
  const seenRef = React.useRef<Set<string>>(new Set())

  React.useEffect(() => {
    const es = new EventSource("/api/cosmos/stream?chains=all&interval=15000&endingSoonMs=3600000")
    es.onopen = () => setStatus('open')

    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data) as {
          type: 'proposal' | 'upgrade' | 'proposal_status' | 'proposal_ending_soon'
          chain: string
          id?: number
          title?: string
          status?: string
          name?: string
          height?: number
          time?: string
          voting_end_time?: string
        }
        if (!data?.chain || !data?.type) return
        const chain = data.chain
        const color = chainColor[chain] ?? "#2563EB"
        const t = fmtTime(data.time)
        const next: Item = data.type === 'proposal'
          ? {
              id: `${chain}:proposal:${data.id}`,
              name: shortenTo105(`New Proposal #${data.id}`),
              description: makeDescription(chain, data.title),
              time: t,
              icon: iconFor(),
              color,
            }
          : data.type === 'upgrade' ? {
              id: `${chain}:upgrade:${data.name}`,
              name: shortenTo105(`Upgrade Scheduled: ${sanitizeText(String(data.name ?? ''))}`),
              description: makeUpgradeDescription(
                chain,
                data.height ? `at height ${data.height.toLocaleString()}` : "scheduled"
              ),
              time: t,
              icon: iconFor(),
              color,
            } : data.type === 'proposal_ending_soon' ? {
              id: `${chain}:proposal-ending:${data.id}`,
              name: shortenTo105(`Voting Ends Soon: #${data.id}`),
              description: makeUpgradeDescription(
                chain,
                data.voting_end_time ? `ends ${fmtTime(data.voting_end_time)}` : 'ending soon'
              ),
              time: t,
              icon: iconFor(),
              color,
            } : {
              id: `${chain}:proposal-status:${data.id}:${data.status}`,
              name: shortenTo105(statusTitle(data.status, data.id)),
              description: makeDescription(chain, undefined),
              time: t,
              icon: iconFor(),
              color,
            }
        function statusTitle(status?: string, id?: number) {
          const s = String(status ?? '').replace('PROPOSAL_STATUS_', '')
          switch (s) {
            case 'DEPOSIT_PERIOD':
              return `Deposit Started: #${id}`
            case 'VOTING_PERIOD':
              return `Voting Started: #${id}`
            case 'PASSED':
              return `Proposal Passed: #${id}`
            case 'REJECTED':
              return `Proposal Rejected: #${id}`
            case 'FAILED':
              return `Proposal Failed: #${id}`
            default:
              return `Proposal Status: #${id} → ${s}`
          }
        }
        // Dedupe agar tidak ada duplikasi saat reconnect/interval berikutnya
        const id = next.id as string | undefined
        if (id && seenRef.current.has(id)) return
        if (id) seenRef.current.add(id)
        // Append langsung dan batasi panjang, biar ringan
        setItems((prev) => [...prev, next].slice(-50))
      } catch {
        // ignore malformed
      }
    }
    es.onerror = () => {
      // EventSource auto-reconnect; mark as connecting while retrying
      setStatus('connecting')
    }
    return () => {
      es.close()
      setStatus('closed')
    }
  }, [])

  const dotClass =
    status === 'open'
      ? 'bg-emerald-500'
      : status === 'connecting'
        ? 'bg-amber-500 animate-pulse'
        : 'bg-rose-500'

  return (
    <div className={cn('relative', className)}>
      <AnimatedListDemo items={items} />
      {showBadge && (
        <div className="pointer-events-none absolute top-1.5 left-2 z-10 flex items-center gap-2">
          <span className={cn('inline-block h-2.5 w-2.5 rounded-full', dotClass)} />
          <span className="select-none rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-white/80 backdrop-blur dark:bg-black/40 dark:text-white">
            Live
          </span>
        </div>
      )}
    </div>
  )
}

// Remove URLs, markdown images, and emojis/specials from external text
function sanitizeText(input: string) {
  let s = input
  // remove markdown images ![alt](url)
  s = s.replace(/!\[[^\]]*\]\([^\)]*\)/g, '')
  // remove raw urls (http/https and www.)
  s = s.replace(/https?:\/\/\S+/gi, '')
  s = s.replace(/\bwww\.[^\s]+/gi, '')
  // remove common emoji ranges + variation selectors + ZWJ
  s = s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D]+/gu, '')
  // collapse whitespace
  s = s.replace(/\s+/g, ' ').trim()
  return s
}

export default LiveCosmosFeed
