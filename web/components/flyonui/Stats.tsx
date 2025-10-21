import Image from "next/image";
import { Globe, Users } from "lucide-react";

export default function FlyonStats() {
  return (
    <section className="relative bg-[#000] text-white flex justify-center px-4 py-16">
      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden rounded-[32px] px-6 md:px-12 py-14 md:py-20 text-white">
          {/* Card background image (match hero) */}
          <div className="absolute inset-0 -z-10 bg-[url('/hero.webp')] bg-cover bg-center" />

          {/* Corner bracket accents (match hero) */}
          <span className="pointer-events-none absolute left-4 top-4 h-[3px] w-[24px] bg-white" />
          <span className="pointer-events-none absolute left-4 top-4 h-[24px] w-[3px] bg-white" />
          <span className="pointer-events-none absolute right-4 top-4 h-[3px] w-[24px] bg-white" />
          <span className="pointer-events-none absolute right-4 top-4 h-[24px] w-[3px] bg-white" />
          <span className="pointer-events-none absolute left-4 bottom-4 h-[3px] w-[24px] bg-white" />
          <span className="pointer-events-none absolute left-4 bottom-4 h-[24px] w-[3px] bg-white" />
          <span className="pointer-events-none absolute right-4 bottom-4 h-[3px] w-[24px] bg-white" />
          <span className="pointer-events-none absolute right-4 bottom-4 h-[24px] w-[3px] bg-white" />

          {/* Stats content */}
          <div className="stats stats-vertical lg:stats-horizontal w-full bg-transparent text-white gap-4">
            {/* Stat 1 */}
            <div className="stat flex-1 min-w-[14rem]">
              <div className="stat-figure size-8 text-white/90">
                <Globe className="size-8" aria-hidden />
              </div>
              <div className="stat-title text-white/80">Networks</div>
              <div className="stat-value text-white">7</div>
              <div className="stat-desc text-white/80">Active networks we validate</div>
            </div>

            {/* Stat 2 */}
            <div className="stat flex-1 min-w-[14rem]">
              <div className="stat-figure size-8 text-white/90">
                <Users className="size-8" aria-hidden />
              </div>
              <div className="stat-title text-white/80">Delegators</div>
              <div className="stat-value text-white">3.8K</div>
              <div className="stat-desc text-white/80">+15% growth this quarter</div>
            </div>

            {/* Stat 3 */}
            <div className="stat flex-1 min-w-[14rem]">
              <div className="stat-title text-white/80">Uptime</div>
              <div className="stat-figure size-12">
                <div className="relative w-12 h-12">
                  <Image src="/astro@2x.png" alt="Uptime" fill className="object-contain object-center" />
                </div>
              </div>
              <div className="stat-value text-success">99%</div>
              <div className="stat-desc text-white/80">Reliable validator performance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
