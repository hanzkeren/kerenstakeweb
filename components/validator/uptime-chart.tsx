"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

type Point = {
  t: number
  uptime: number
}

type Fetcher = () => Promise<number>

type UptimeChartProps = {
  title?: string
  moniker?: string
  chainId?: string
  windowSize?: number // number of points kept
  pollMs?: number
  height?: number
  sourceUrl?: string // returns { uptime: number }
  fetcher?: Fetcher // custom fetcher that returns uptime 0..100
  className?: string
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" })
}

export function UptimeChart({
  title = "Validator Uptime",
  moniker,
  chainId,
  windowSize = 60,
  pollMs = 5000,
  height = 220,
  sourceUrl,
  fetcher,
  className,
}: UptimeChartProps) {
  const [data, setData] = useState<Point[]>([])
  const [live, setLive] = useState(false)
  const timerRef = useRef<number | null>(null)

  const effectiveFetcher: Fetcher = useMemo(() => {
    if (fetcher) return fetcher
    if (sourceUrl) {
      return async () => {
        const url = new URL(sourceUrl, window.location.origin)
        if (moniker) url.searchParams.set("moniker", moniker)
        if (chainId) url.searchParams.set("chain", chainId)
        const res = await fetch(url.toString(), { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch uptime")
        const json = await res.json()
        const val = Number(json?.uptime)
        return Number.isFinite(val) ? Math.max(0, Math.min(100, val)) : 0
      }
    }
    // Fallback local generator (demo)
    let last = 99.7
    return async () => {
      last = Math.max(97.5, Math.min(100, last + (Math.random() - 0.5) * 0.15))
      return Number(last.toFixed(3))
    }
  }, [fetcher, sourceUrl, moniker, chainId])

  useEffect(() => {
    let mounted = true
    setLive(true)
    const tick = async () => {
      try {
        const uptime = await effectiveFetcher()
        if (!mounted) return
        setData((prev) => {
          const next = [...prev, { t: Date.now(), uptime }]
          return next.length > windowSize ? next.slice(next.length - windowSize) : next
        })
      } catch {
        // keep last data, set live false temporarily
        if (mounted) setLive(false)
      }
    }
    // prime immediately, then interval
    tick()
    timerRef.current = window.setInterval(tick, pollMs) as unknown as number

    return () => {
      mounted = false
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [effectiveFetcher, pollMs, windowSize])

  const barColor = "#22c55e" // green-500

  return (
    <div className={"w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4 " + (className ?? "")}> 
      <div className="mb-3">
        <div className="text-sm font-medium text-foreground">{title}</div>
        {moniker ? <div className="mt-0.5 text-xs text-muted-foreground">{moniker}</div> : null}
      </div>
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="currentColor" strokeOpacity={0.08} vertical={false} />
            <XAxis
              dataKey="t"
              tickFormatter={formatTime}
              tick={{ fill: "currentColor", opacity: 0.5, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={24}
            />
            <YAxis
              domain={[0, 100]}
              tickCount={5}
              tick={{ fill: "currentColor", opacity: 0.5, fontSize: 11 }}
              width={28}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                const p = payload[0]
                return (
                  <div className="rounded-md border border-border bg-background/90 px-2 py-1 text-xs shadow">
                    <div className="font-medium">{formatTime(label as number)}</div>
                    <div className="text-muted-foreground">Uptime: {Number(p.value).toFixed(3)}%</div>
                  </div>
                )
              }}
            />
            <Bar
              dataKey="uptime"
              fill={barColor}
              radius={[3, 3, 0, 0]}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={350}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Updates every {Math.round(pollMs / 1000)}s • window {windowSize} points
      </div>
    </div>
  )
}

export default UptimeChart
