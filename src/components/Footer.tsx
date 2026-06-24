"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navCol1 = [
  { label: "Solutions", href: "#solutions" },
  { label: "Engineering", href: "#engineering" },
  { label: "Process", href: "#process" },
];
const navCol2 = [
  { label: "Catalogue", href: "#catalogue" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
const legalLinks = [
  { label: "Impressum", href: "/legal/impressum" },
  { label: "Datenschutz", href: "/legal/datenschutz" },
  { label: "Cookies", href: "/legal/cookies" },
];

export function Footer() {
  return (
    <footer className="bg-abyss border-t border-cyan/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-white font-semibold tracking-widest text-sm uppercase">
              OCEAN TEC
            </Link>
            <p className="mt-4 text-sonar/60 text-sm leading-relaxed">
              Precision engineering for harsh environments. Battery to propulsion — concept to series.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16 md:gap-8 md:col-span-2 md:justify-center">
            <ul className="space-y-3">
              {navCol1.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-sonar/60 hover:text-cyan transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {navCol2.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-sonar/60 hover:text-cyan transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1 md:text-right">
            <p className="text-sm text-white font-medium">OCEAN TEC GmbH</p>
            <address className="not-italic mt-2 text-sm text-sonar/60 space-y-1">
              <p>Waidmannsdorferstrasse 83</p>
              <p>9020 Klagenfurt, Austria</p>
              <p className="mt-3">
                <a href="tel:+43463203373" className="hover:text-cyan transition-colors">+43 463 20 33 73</a>
              </p>
              <p>
                <a href="mailto:hello@ocean-tec.eu" className="hover:text-cyan transition-colors">hello@ocean-tec.eu</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-cyan/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs text-sonar/30 tracking-widest">
            46.6167° N, 14.3031° E — Klagenfurt, Austria
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-sonar/40 hover:text-sonar/70 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
