import Link from "next/link"
import { Github, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer role="contentinfo" className="relative mt-20 bg-gradient-to-b from-transparent via-background to-background/95">
      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + blurb */}
          <div className="md:col-span-5">
            <div className="text-lg font-semibold tracking-tight">KerenStake</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Reliable validator infrastructure across the Interchain. High uptime. Solid ops. Trusted delivery.
            </p>
            <div className="mt-5 flex items-center gap-4 text-muted-foreground">
              <Link href="https://twitter.com" className="hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="size-4" />
              </Link>
              <Link href="https://github.com" className="hover:text-foreground transition-colors" aria-label="GitHub">
                <Github className="size-4" />
              </Link>
              <Link href="mailto:hello@kerenstake.com" className="hover:text-foreground transition-colors" aria-label="Email">
                <Mail className="size-4" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold">Product</div>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#showcase" className="hover:text-foreground">Showcase</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold">Company</div>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-foreground">About</Link></li>
              <li><Link href="#partners" className="hover:text-foreground">Partners</Link></li>
              <li><Link href="#contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter (UI only) */}
          <div className="md:col-span-3">
            <div className="text-sm font-semibold">Stay in the loop</div>
            <p className="mt-2 text-sm text-muted-foreground">Get updates on networks, upgrades, and ops notes.</p>
            <form className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-10 w-full rounded-md border border-input bg-input/30 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label="Email address"
              />
              <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90" aria-label="Subscribe">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>© {new Date().getFullYear()} KerenStake. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#terms" className="hover:text-foreground">Terms</Link>
              <Link href="#privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="#security" className="hover:text-foreground">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
