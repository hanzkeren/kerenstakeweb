import { NextResponse } from "next/server"

export async function GET(req: Request) {
  // Demo-only uptime generator with slight jitter around ~99.8%
  const { searchParams } = new URL(req.url)
  const moniker = searchParams.get("moniker") || undefined
  const chain = searchParams.get("chain") || undefined

  // Use a deterministic-ish jitter based on time to keep numbers stable
  const base = 99.8
  const t = Date.now() / 1000
  const jitter = (Math.sin(t / 7) + Math.cos(t / 11)) * 0.05 + (Math.random() - 0.5) * 0.03
  const uptime = Math.max(97.5, Math.min(100, base + jitter))

  return NextResponse.json({
    uptime: Number(uptime.toFixed(3)),
    at: Date.now(),
    moniker,
    chain,
  })
}

