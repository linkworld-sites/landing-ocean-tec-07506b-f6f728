import type { Metadata } from "next";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "OCEAN TEC — Custom Marine Battery Systems & Jet Propulsion OEM",
  description:
    "OCEAN TEC designs and manufactures custom marine battery systems, underwater jet propulsion units, and high-voltage BMS electronics for maritime, ROV, and subsea applications. 800V BMS · 300 m-rated drives · IP68 packs.",
  alternates: {
    canonical: "https://0c72351b.run.linkworld.ai",
  },
  keywords: [
    "custom marine battery system manufacturer",
    "underwater jet propulsion OEM",
    "custom BMS development maritime",
    "ROV propulsion unit",
    "subsea battery pack",
    "800V battery management system",
    "IP68 battery pack",
    "maritime electromobility",
    "embedded electronics maritime",
    "BLDC motor underwater",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OCEAN TEC",
  url: "https://0c72351b.run.linkworld.ai",
  description:
    "OCEAN TEC engineers and manufactures custom battery systems, jet propulsion units, and embedded electronics for maritime and subsea applications — from concept to series production.",
  areaServed: ["EU", "MENA", "APAC"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English", "German"],
  },
  sameAs: [],
};

const productSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom Li-ion / LFP Battery Systems",
    description:
      "Custom battery pack assemblies configured for specific voltage (24V–800V) and capacity (2 kWh–200 kWh). IP67/IP68 rated housings validated for 2000+ charge/discharge cycles under real operating conditions.",
    brand: { "@type": "Brand", name: "OCEAN TEC" },
    category: "Marine Battery Systems",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: { "@type": "Organization", name: "OCEAN TEC" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Underwater Jet Propulsion Units",
    description:
      "Brushless jet propulsion units for ROVs, unmanned underwater vehicles, and custom maritime platforms. Depth-rated to 300 m with integrated BLDC driver. Designed for minimal acoustic signature and high thrust efficiency.",
    brand: { "@type": "Brand", name: "OCEAN TEC" },
    category: "Underwater Propulsion",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: { "@type": "Organization", name: "OCEAN TEC" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "In-House Battery Management System (BMS)",
    description:
      "High-voltage BMS designed and validated in-house. Supports up to 96 cells in series (800V), active and passive balancing, ±2 mV cell monitoring, ±3% SOC estimation, and multi-protocol communication (CAN 2.0B / RS485 / UART).",
    brand: { "@type": "Brand", name: "OCEAN TEC" },
    category: "Battery Management Electronics",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: { "@type": "Organization", name: "OCEAN TEC" },
    },
  },
];

const jsonLd = [organizationSchema, ...productSchemas];

export default function Home() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
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
    </>
  );
}
