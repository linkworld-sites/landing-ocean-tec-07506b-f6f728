"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/funnel";

const links = [
  { label: "Solutions", href: "#solutions" },
  { label: "Engineering", href: "#engineering" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-abyss/95 backdrop-blur border-b border-cyan/10" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="font-display text-white font-semibold tracking-widest text-sm uppercase">
            OCEAN TEC
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                onClick={() => track("intent")}
                className="relative overflow-hidden border border-cyan/60 px-5 py-2 text-sm font-mono text-cyan uppercase tracking-wider group"
              >
                <motion.span
                  className="absolute inset-0 bg-cyan origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative group-hover:text-abyss transition-colors duration-300">
                  Partner With Us
                </span>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-sonar p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 space-y-1.5">
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
                className="block h-px bg-current"
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                className="block h-px bg-current"
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
                className="block h-px bg-current"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-abyss flex flex-col justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="space-y-6 mt-16">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-white font-medium tracking-tight"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  onClick={() => { setOpen(false); track("intent"); }}
                  className="inline-block mt-4 border border-cyan px-6 py-3 font-mono text-cyan uppercase tracking-wider text-sm"
                >
                  Partner With Us
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group relative text-sm text-sonar/80 hover:text-white transition-colors duration-200">
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-cyan"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: "left" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </Link>
  );
}
