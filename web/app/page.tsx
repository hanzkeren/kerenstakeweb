import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero-section";
import { Footer } from "@/components/site/footer";
import { Showcase } from "@/components/sections/showcase";
import CtaSection from "@/components/sections/cta";
import TrustedBy from "@/components/TrustedBy";
import FlyonStats from "@/components/flyonui/Stats";

import { BentoDemo } from "@/components/Bento";
 

export default function Home() {
  return (
    <div className="min-h-dvh bg-black text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBy />
        <BentoDemo />
        <Showcase />
        <FlyonStats />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
