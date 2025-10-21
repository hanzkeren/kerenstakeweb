"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-[#000] text-white flex justify-center px-4 pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden rounded-[32px] px-12 py-20 text-center"
        >
          {/* Card background image */}
          <div className="absolute inset-0 -z-10 bg-[url('/hero.webp')] bg-cover bg-center" />

        {/* Corner bracket accents (3px thick, 24px long) */}
        {/* Top-left */}
        <span className="pointer-events-none absolute left-4 top-4 h-[3px] w-[24px] bg-white" />
        <span className="pointer-events-none absolute left-4 top-4 h-[24px] w-[3px] bg-white" />
        {/* Top-right */}
        <span className="pointer-events-none absolute right-4 top-4 h-[3px] w-[24px] bg-white" />
        <span className="pointer-events-none absolute right-4 top-4 h-[24px] w-[3px] bg-white" />
        {/* Bottom-left */}
        <span className="pointer-events-none absolute left-4 bottom-4 h-[3px] w-[24px] bg-white" />
        <span className="pointer-events-none absolute left-4 bottom-4 h-[24px] w-[3px] bg-white" />
        {/* Bottom-right */}
        <span className="pointer-events-none absolute right-4 bottom-4 h-[3px] w-[24px] bg-white" />
        <span className="pointer-events-none absolute right-4 bottom-4 h-[24px] w-[3px] bg-white" />

          <div className="flex w-full flex-col items-center justify-center gap-8">
          <a
            href="/partners"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 group flex flex-col items-center justify-center rounded-full p-1.5 px-6 transition-colors sm:flex-row sm:pr-1.5 sm:pl-3"
          >
            <p className="text-white">Interchain Validator</p>
            <div className="hidden size-5 items-center justify-center sm:flex">
              <div className="bg-white size-[0.2rem] rounded-full" />
            </div>
            <p className="text-white/80 group-hover:text-white flex items-center transition-colors hover:underline hover:underline-offset-2">
              <span>About our ops</span>
              <span className="flex size-5 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right size-3 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </p>
          </a>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[3.5rem] leading-[1.15] font-semibold text-white">
              Trusted Infrastructure for <span className="block">the Interchain.</span>
            </h1>
            <p className="max-w-[46ch] text-center text-xl leading-7 text-white/80">
              Enterprise-grade uptime, precision operations, and proven reliability — built to secure your network.
            </p>
          </div>

          <Link href="https://app.neutron.org/bitcoin-summer" target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white text-black font-bold transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] min-w-24 h-14 px-6 text-lg hover:bg-white/90"
            >
              Delegate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
    </section>
  );
}
