"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background fixed top-0 right-0 left-0 isolate z-10 flex h-16 w-full justify-center px-6 text-foreground">
      {/* bottom gradient blur */}
      <div
        className="from-background absolute -bottom-8 left-0 h-8 w-full border-t bg-gradient-to-b backdrop-blur"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="flex w-full max-w-7xl items-center justify-between">
        {/* Left: logo mark + wordmark */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/astro@2x.png" alt="Logo" width={28} height={28} priority className="h-[28px] w-[28px] rounded-full" />
          <span className="text-sm font-extrabold tracking-wide">KERENSTAKE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="min-w-max hidden md:block">
          <ul className="relative flex items-center gap-3">
            <li>
              <button type="button" className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] h-11 min-w-24 px-4 hover:bg-accent hover:text-accent-foreground">
                Resources
              </button>
            </li>
            <li>
              <button type="button" className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] h-11 min-w-24 px-4 hover:bg-accent hover:text-accent-foreground">
                Developers
              </button>
            </li>
            <li>
              <a href="https://app.neutron.org" target="_blank" className="rounded-full">
                <button type="button" className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] bg-primary text-primary-foreground hover:bg-primary/90 h-11 min-w-24 px-4">
                  Launch app
                </button>
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile toggle */}
        <div className="block md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="dialog"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 w-11"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu size-5" aria-hidden="true"><path d="M4 12h16"></path><path d="M4 18h16"></path><path d="M4 6h16"></path></svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed top-[calc(50%+1.25rem*var(--nested-dialogs))] left-1/2 z-50 mt-8 h-[calc(100dvh-4rem)] w-full max-w-full -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs))] overflow-y-auto rounded-none bg-background p-3 pt-6 text-foreground outline-0 outline-border duration-200 md:hidden"
          style={{ ['--nested-dialogs' as any]: 0 }}
        >
          <nav className="min-w-max">
            <ul className="relative flex flex-col items-start gap-6 p-0">
              <li className="w-full px-3">
                <a href="https://app.neutron.org" target="_blank" className="rounded-full" onClick={() => setOpen(false)}>
                  <button type="button" className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] bg-primary text-primary-foreground hover:bg-primary/90 h-11 min-w-24 px-4" tabIndex={-1}>Launch app</button>
                </a>
              </li>

              {/* Resources */}
              <div className="flex w-full flex-col gap-1">
                <h3 className="px-3 text-sm text-foreground/40">Resources</h3>
                {[
                  { href: "http://blog.neutron.org", title: "Blog", desc: "Latest news and updates" },
                  { href: "https://daodao.zone/dao/neutron1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrstdxvff/proposals", title: "Governance", desc: "Vote on proposals" },
                  { href: "https://cdn.neutron.org/neutron-brand-assets.zip", title: "Brand", desc: "Logos, assets, and guidelines" },
                  { href: "https://forum.neutron.org", title: "Forum", desc: "Discuss ideas and share feedback" },
                  { href: "https://docs.neutron.org/btc-summer/faq", title: "FAQ", desc: "Answers to common questions" },
                  { href: "https://www.mintscan.io/neutron", title: "Explorer", desc: "Track transactions" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    className="group flex items-center gap-3 rounded-[14px] p-3 pr-4 text-inherit no-underline transition-colors duration-200 ease-in-out hover:bg-secondary focus-visible:relative focus-visible:outline-ring focus-visible:outline-2 focus-visible:-outline-offset-1"
                    onClick={() => setOpen(false)}
                  >
                    <span aria-hidden className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full border-2 border-white/10 transition-colors duration-200 ease-in-out group-hover:border-primary group-hover:text-primary">{/* icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    </span>
                    <div>
                      <div className="font-medium">{l.title}</div>
                      <div className="text-sm text-muted-foreground">{l.desc}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Developers */}
              <div className="flex w-full flex-col gap-1">
                <h3 className="px-3 text-sm text-foreground/40">Developers</h3>
                {[
                  { href: "https://docs.neutron.org", title: "Documentation", desc: "Guides for building on Neutron" },
                  { href: "https://github.com/neutron-org", title: "Github", desc: "Integrate and contribute" },
                  { href: "https://immunefi.com/bug-bounty/neutron/information", title: "Bug Bounty", desc: "Find issues, earn rewards" },
                  { href: "https://neutron.celat.one/neutron-1", title: "Celatone", desc: "Organise smart contracts" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    className="group flex items-center gap-3 rounded-[14px] p-3 pr-4 text-inherit no-underline transition-colors duration-200 ease-in-out hover:bg-secondary focus-visible:relative focus-visible:outline-ring focus-visible:outline-2 focus-visible:-outline-offset-1"
                    onClick={() => setOpen(false)}
                  >
                    <span aria-hidden className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full border-2 border-white/10 transition-colors duration-200 ease-in-out group-hover:border-primary group-hover:text-primary">{/* icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>
                    </span>
                    <div>
                      <div className="font-medium">{l.title}</div>
                      <div className="text-sm text-muted-foreground">{l.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
