import React from "react"
import ChainGrid from "@/components/ChainGrid"
//

//

// --
export function Showcase() {
  return (
    <section className="relative py-16 mt-8 md:mt-12" id="showcase">
      {/* Right-side subtle dark gradient accent */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black/20 to-transparent dark:from-black/40 z-0" />

  <div className="relative z-10 mx-auto mb-8 max-w-6xl text-center px-4">
        {/* Heading wrapper: image width follows heading width */}
        <div className="inline-block mx-auto">
          <div
            className="relative w-full -mb-12 sm:-mb-16 md:-mb-20"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, white 0%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, white 0%, transparent 100%)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            } as React.CSSProperties}
          >
            <div
              className="h-28 w-full md:h-32 bg-gradient-to-b from-black to-gray-300/80 dark:from-white dark:to-slate-900/10"
              style={{
                WebkitMaskImage: 'url("/trace (1).svg")',
                maskImage: 'url("/trace (1).svg")',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              } as React.CSSProperties}
            />
          </div>
          <span
            className="pointer-events-none bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-center text-4xl sm:text-5xl md:text-6xl leading-none font-bold whitespace-pre-wrap text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.2)] dark:from-white dark:to-white/90 dark:drop-shadow-[0_1px_0_rgba(0,0,0,0.6)]"
            style={{ WebkitTextStroke: "0.25px rgba(0,0,0,0.35)" } as React.CSSProperties}
          >
            Our Networks
          </span>
        </div>
      <p className="mt-3 text-muted-foreground">Networks we validate and secure across the Interchain.</p>
    </div>
    {/* Chain grid */}
    <ChainGrid compact />
    </section>
  )
}
