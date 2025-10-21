import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, BotIcon, NetworkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/components/ui/animated-list-demo";
import { LiveCosmosFeed } from "@/components/cosmos/LiveCosmosFeed";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { DottedMap } from "@/components/ui/second-map";
import UptimeChart from "@/components/validator/uptime-chart";
import { AnimatedSpan, Terminal, TypingAnimation, TypingLine } from "@/components/ui/terminal"
import { MagicTypingAnimation } from "@/components/ui/magic-typing-animation"


const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: NetworkIcon,
    name: "Global Validator Network",
    description: "Resilient infrastructure for a connected world.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 top-0 h-[200px] overflow-hidden rounded-xl border-none">
        <div className="absolute inset-0 z-0">
          <DottedMap />
        </div>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Stay updated with every network move.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <LiveCosmosFeed
        showBadge={false}
        className="absolute top-4 right-2 h-[300px] w-full scale-90 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-95"
      />
    ),
  },
  {
    Icon: BotIcon,
    name: "AI Agent Ops",
    description: "Smart infrastructure automation for validator management.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Terminal className="absolute top-4 right-2 h-[300px] w-[92%] sm:w-[88%] lg:w-[85%] max-w-lg sm:max-w-xl lg:max-w-2xl border-neutral-800 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105">
        <MagicTypingAnimation duration={40} className="term-cmd">codex monitor --validator KerenStake --modules uptime,gov</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-out">Loading modules...</MagicTypingAnimation>
        {/* Setiap baris pakai MagicTypingAnimation */}
        <MagicTypingAnimation duration={60} className="term-out">Validator KerenStake</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-out">Network cosmosis</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-num">Uptime (24h) 99.98%</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-num">Missed Blocks 2 / 10,000</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-var">Next Gov Vote 28 Oct 14:00 UTC</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-var">Active Proposals #82 (Voting), #79 (Passed)</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-path">Config ~/.config/validators/kerenstake.toml</MagicTypingAnimation>
        <MagicTypingAnimation duration={60} className="term-ok font-medium">OK: Uptime checks active. Alerts armed.</MagicTypingAnimation>
      </Terminal>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Uptime Block",
    description: "Real-time uptime that never sleeps.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <>
        <Calendar
          mode="single"
          selected={new Date(2022, 4, 11, 0, 0, 0)}
          className="absolute top-4 right-0 origin-top scale-75 rounded-md border bg-neutral-900 border-neutral-800 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90 sm:right-2 sm:scale-75 md:scale-90"
        />
        <div className="absolute inset-x-2 bottom-16 [mask-image:linear-gradient(to_top,transparent_18%,#000_100%)]">
          <UptimeChart
            title="Uptime Block"
            moniker="KerenStake"
            pollMs={4000}
            windowSize={30}
            height={90}
            sourceUrl="/api/uptime"
            className="rounded-lg border border-border bg-background p-2"
          />
        </div>
      </>
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="bg-black max-w-6xl mx-auto px-4 md:px-6 gap-4">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default BentoDemo;
