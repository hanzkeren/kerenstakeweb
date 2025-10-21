"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const chains = [
  { name: "Canton", category: "Tesnet", logo: "/logos/canton.svg", link: "/mainnets/canton", type: "mainnet" },
  { name: "Fogo", category: "Mainnet", logo: "https://paxinet.io/resources/img/icon_transparent.png", link: "/testnets/fogo", type: "testnet" },
  { name: "GenLayer", category: "Mainnet", logo: "/logos/genlayer.svg", link: "/mainnets/genlayer", type: "mainnet" },
  { name: "Fermah", category: "Mainnet", logo: "/logos/fermah.svg", link: "/testnets/fermah", type: "testnet" },
  { name: "Mango", category: "Mainnet", logo: "/logos/mango.svg", link: "/mainnets/mango", type: "mainnet" },
  { name: "Fogo", category: "Tech/Community", logo: "https://assets.nodes.guru/0443336c-23f1-4a87-8270-4a1414ccb13e.svg", link: "/testnets/fogo", type: "testnet" },
  { name: "Rome", category: "Tech/Community", logo: "/logos/rome.svg", link: "/testnets/rome", type: "testnet" },
  { name: "Ritual", category: "Community/Tech", logo: "/logos/ritual.svg", link: "/mainnets/ritual", type: "mainnet" },
  { name: "Somnia", category: "Tech/Community", logo: "/logos/somnia.svg", link: "/testnets/somnia", type: "testnet" },
  { name: "Aztec", category: "Tech/Community", logo: "/logos/aztec.svg", link: "/mainnets/aztec", type: "mainnet" },
];

type ChainGridProps = {
  compact?: boolean
}

export default function ChainGrid({ compact = false }: ChainGridProps) {
  const [filter, setFilter] = useState<"all" | "mainnet" | "testnet">("all");

  const filteredChains =
    filter === "all"
      ? chains
      : chains.filter((c) => c.type === filter);

  return (
    <section className={compact ? "pt-0 pb-10 bg-black" : "py-20 bg-black"}>
      <div className="mx-auto w-full max-w-6xl px-4">

        {/* Filter Bar (shadcn Tabs) */}
        <div className={compact ? "mb-4" : "mb-8"}>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
            <TabsList className="mx-auto w-fit rounded-full h-11 sm:h-12 bg-neutral-900/80 border border-neutral-800 p-1 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70">
              <TabsTrigger
                value="all"
                className="grow-0 basis-auto rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base capitalize text-neutral-300 transition-colors hover:bg-neutral-800/50 data-[state=active]:bg-neutral-800/80 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-[#00e5ff]/40"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="mainnet"
                className="grow-0 basis-auto rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base capitalize text-neutral-300 transition-colors hover:bg-neutral-800/50 data-[state=active]:bg-neutral-800/80 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-[#00e5ff]/40"
              >
                Mainnet
              </TabsTrigger>
              <TabsTrigger
                value="testnet"
                className="grow-0 basis-auto rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base capitalize text-neutral-300 transition-colors hover:bg-neutral-800/50 data-[state=active]:bg-neutral-800/80 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-[#00e5ff]/40"
              >
                Testnet
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Grid */}
        <div className="bg-[#09090B] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-8 justify-items-center w-fit mx-auto">
          {filteredChains.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-[#F5F5F7] dark:bg-[#131313] rounded-3xl px-4 py-4 w-40 h-44 hover:shadow-[0_0_30px_0_rgba(0,0,0,0.15)] transition-shadow group"
            >
              <Link href={item.link} className="absolute inset-0 z-10 rounded-3xl" />

              {/* Decorative SVG shape (inline path from public/circle.svg) with centered chain logo */}
              <div className="absolute -right-[15%] -bottom-[15%] h-28 w-28 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <div className="relative h-full w-full">
                  <svg
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                    focusable="false"
                  >
                    <path
                      d="M181,1 L141,9 L107,23 L75,44 L44,75 L23,107 L9,141 L1,181 L1,219 L9,259 L23,293 L44,325 L75,356 L107,377 L141,391 L181,399 L219,399 L259,391 L293,377 L325,356 L356,325 L377,293 L391,259 L399,219 L399,181 L391,141 L377,107 L356,75 L325,44 L293,23 L259,9 L219,1 Z"
                      fill="#262626"
                    />
                  </svg>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={112}
                    height={112}
                    className="absolute inset-0 m-auto p-2 object-contain"
                  />
                </div>
              </div>

              {/* Teks */}
              <p className="relative text-xl font-semibold text-neutral-900 dark:text-white">
                {item.name}
              </p>
              <p className="relative text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
                {item.category}
              </p>

              {/* Hover bar */}
              <div className="absolute inset-x-1 bottom-1 h-10 px-2 rounded-full flex items-center justify-between bg-white/80 dark:bg-black/30 backdrop-blur-md backdrop-saturate-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Link
                  href={item.link}
                  className="text-xs px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                >
                  Explorer
                </Link>
                <button
                  disabled
                  className="text-xs px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700 opacity-50 cursor-not-allowed"
                >
                  Delegate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
