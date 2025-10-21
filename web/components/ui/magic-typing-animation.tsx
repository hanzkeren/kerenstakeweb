"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, MotionProps, useInView } from "motion/react"
import { cn } from "@/lib/utils"
import { useItemIndex, useSequence } from "@/components/ui/terminal"

type MagicTypingAnimationProps = MotionProps & {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: React.ElementType
  startOnView?: boolean
  blinkCursor?: boolean
  cursorChar?: string
}

export function MagicTypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  blinkCursor = true,
  cursorChar = "_",
  ...props
}: MagicTypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("")
  const [started, setStarted] = useState(false)
  const [frozen, setFrozen] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  // Sequence integration
  const sequence = useSequence()
  const itemIndex = useItemIndex()

  const MotionComponent = useMemo(
    () => motion.create(Component, { forwardMotionProps: true }),
    [Component]
  )

  useEffect(() => {
    // If participating in a sequence, wait for turn
    if (sequence && itemIndex !== null) {
      if (!sequence.sequenceStarted) return
      if (started) return
      if (sequence.activeIndex === itemIndex) {
        const t = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(t)
      }
      return
    }

    // Otherwise, use view-based start
    if (!startOnView) {
      const t = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(t)
    }
    if (!isInView) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay, startOnView, isInView, sequence?.activeIndex, sequence?.sequenceStarted, itemIndex, started])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        if (sequence && itemIndex !== null) {
          sequence.completeItem(itemIndex)
        }
        setFrozen(true)
      }
    }, duration)
    return () => clearInterval(interval)
  }, [children, duration, started, sequence?.completeItem, itemIndex])

  const typing = displayedText.length < children.length
  if (frozen) {
    const StaticComponent = Component as any
    return (
      <StaticComponent className={cn("text-sm font-normal tracking-tight", className)} {...props}>
        {children}
      </StaticComponent>
    )
  }

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
      {blinkCursor && (
        <span className={cn("inline-block", typing && "animate-blink-cursor")}>{typing ? cursorChar : ""}</span>
      )}
    </MotionComponent>
  )
}
