"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/ui/animated-list"
import { BellRing } from "lucide-react"

export interface Item {
  id?: string
  name: string
  description: ReactNode
  icon: ReactNode
  color: string
  time: string
}

let notifications = [
  {
    name: "Block proposed",
    description: "Validator 0xA3F…9D • Slot 843,129",
    time: "15s ago",
    icon: <BellRing size={24} />,
    color: "#1E86FF",
  },
  {
    name: "Attestation included",
    description: "Committee 4 • Epoch 268",
    time: "40s ago",
    icon: <BellRing size={24} />,
    color: "#00C9A7",
  },
  {
    name: "New peer connected",
    description: "Peer 52.87.10.24:9000",
    time: "2m ago",
    icon: <BellRing size={24} />,
    color: "#7C3AED",
  },
  {
    name: "Checkpoint finalized",
    description: "Epoch 268 • 96% participation",
    time: "5m ago",
    icon: <BellRing size={24} />,
    color: "#FFB800",
  },
  {
    name: "Sync completed",
    description: "Head 0xabc…123 • Slot 843,130",
    time: "7m ago",
    icon: <BellRing size={24} />,
    color: "#06B6D4",
  },
  {
    name: "Slashing alert",
    description: "Double vote suspected • Validator 0x9C…2E",
    time: "12m ago",
    icon: <BellRing size={24} />,
    color: "#EF4444",
  },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[560px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <BellRing size={24} className="text-neutral-600 dark:text-neutral-300 shrink-0" />
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function AnimatedListDemo({
  className,
  items,
}: {
  className?: string
  items?: Item[]
}) {
  const feed = (items && items.length > 0)
    ? items
    : Array.from({ length: 10 }, () => notifications).flat()
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {feed.map((item, idx) => (
          <Notification {...(item as Item)} key={idx} />
        ))}
      </AnimatedList>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  )
}

export default AnimatedListDemo
