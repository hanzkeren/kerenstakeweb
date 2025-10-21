# AI Training – Next.js + Tailwind + shadcn/ui

A clean, production-ready landing page scaffold using Next.js (App Router), Tailwind CSS v4, and shadcn/ui. Includes a responsive navbar, hero, features, showcase, testimonials, pricing, FAQ, CTA, and footer with dark mode support.

## Tech Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- shadcn/ui (Radix-based components)
- framer-motion, lucide-react, next-themes
- pnpm

## Getting Started
```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

## Build & Preview
```bash
pnpm build
pnpm start
```

## Project Structure
```
web/
├─ app/
│  ├─ layout.tsx        # Root layout + ThemeProvider
│  └─ page.tsx          # Landing composed from sections
├─ components/
│  ├─ sections/         # Landing sections (hero, features, ...)
│  ├─ site/             # Site chrome (navbar, footer)
│  ├─ ui/               # shadcn/ui components
│  └─ theme-provider.tsx
├─ lib/
│  └─ utils.ts          # cn utility
└─ app/globals.css      # Tailwind v4 + theme tokens
```

## Customization
- Update copy in `components/sections/*` as needed.
- Add or remove shadcn/ui components via: `pnpm dlx shadcn add <component>`.
- Tweak theme tokens in `app/globals.css`.

## Notes
- This template focuses on clean structure and DX. Replace placeholder visuals with product screenshots or demos.
- Follows the conventions in AGENT.md (Next 14+, Tailwind, shadcn, pnpm).

