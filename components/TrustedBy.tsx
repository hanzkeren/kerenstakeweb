"use client"
import Image from "next/image"

type Logo = {
  alt: string
  src: string
  width?: number
}

const LOGOS: Logo[] = [
  { alt: "Long Hash Ventures", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/google-logo-bw.png", width: 74 },
  { alt: "Binance", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/amazon-logo-bw.png", width: 92 },
  { alt: "Cyber Fund", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/hubspot-logo-bw.png", width: 108 },
  { alt: "Semantic", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/walmart-logo-bw.png", width: 95 },
  { alt: "Coin Fund", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/microsoft-logo-bw.png", width: 104 },
  { alt: "Re7Capital", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/evernote-icon-bw.png", width: 106 },
  { alt: "Bitscale", src: "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/paypal-logo-bw.png", width: 90 },
]

export default function TrustedBy() {
  const items = [...LOGOS, ...LOGOS]
  return (
    <section className="bg-transparent -mt-8 md:-mt-12 lg:-mt-16 pt-2 pb-8 sm:pt-2 lg:pt-2 lg:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="w-full overflow-hidden py-6"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)",
          }}
        >
          <div className="animate-scroll flex w-max items-center">
            {items.map((logo, idx) => (
              <div key={`${logo.alt}-${idx}`} className="mx-4 flex h-5 w-40 shrink-0 items-center justify-center py-4">
                <Image
                  alt={logo.alt}
                  src={logo.src}
                  width={logo.width ?? 120}
                  height={20}
                  className="h-5 w-auto select-none opacity-90"
                  loading={idx < LOGOS.length ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 120px, 200px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
