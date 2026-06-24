import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { CredentialBar } from "@/components/sections/CredentialBar";
import { CoreCapability } from "@/components/sections/CoreCapability";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { StatConstellation } from "@/components/sections/StatConstellation";
import { CaseStudiesGrid } from "@/components/sections/CaseStudiesGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CatalogueCTA } from "@/components/sections/CatalogueCTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <CredentialBar />
      <CoreCapability />
      <SolutionsShowcase />
      <StatConstellation />
      <CaseStudiesGrid />
      <ProcessTimeline />
      <CatalogueCTA />
      <Footer />
    </main>
  );
}
