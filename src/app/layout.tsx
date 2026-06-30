import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://0c72351b.run.linkworld.ai"),
  title: {
    default: "OCEAN TEC — Precision in Every Environment",
    template: "%s | OCEAN TEC",
  },
  description:
    "OCEAN TEC engineers and manufactures custom battery systems, jet propulsion units, and embedded electronics for maritime and subsea applications — from 800V BMS to 300 m-rated drives.",
  keywords: [
    "custom marine battery system manufacturer",
    "underwater jet propulsion OEM",
    "custom BMS development maritime",
    "battery systems",
    "propulsion",
    "maritime engineering",
    "BMS",
    "embedded electronics",
    "800V battery management system",
    "subsea electronics",
  ],
  alternates: {
    canonical: "https://0c72351b.run.linkworld.ai",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://0c72351b.run.linkworld.ai",
    siteName: "OCEAN TEC",
    title: "OCEAN TEC — Precision in Every Environment",
    description:
      "OCEAN TEC engineers and manufactures custom battery systems, jet propulsion units, and embedded electronics for maritime and subsea applications — from 800V BMS to 300 m-rated drives.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OCEAN TEC — Precision in Every Environment",
    description:
      "OCEAN TEC engineers and manufactures custom battery systems, jet propulsion units, and embedded electronics for maritime and subsea applications — from 800V BMS to 300 m-rated drives.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-abyss text-sonar font-body antialiased">
        <FunnelTracker />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
