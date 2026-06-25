"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

const components = [
  {
    label: "Motor Controller",
    spec: "24–96V · 400A peak · CAN/PWM",
    image: "/images/products/product-5.jpg",
  },
  {
    label: "Battery System",
    spec: "Li-ion · 48V–800V · Custom config",
    image: "/images/products/product-6.jpg",
  },
  {
    label: "BMS Platform",
    spec: "96S max · Active balance · RS485",
    image: "/images/products/product-4.jpg",
  },
];

export function CatalogueCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="catalogue" className="bg-abyss py-24 md:py-36 border-t border-cyan/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="overflow-hidden mb-4">
              <motion.p
                className="font-mono text-xs text-cyan tracking-[0.2em] uppercase"
                initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Product Catalogue
              </motion.p>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-display text-white text-display-lg font-bold"
                initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Plug & Play.
                <br />
                <span className="text-cyan">Tested.</span>
                <br />
                Production-ready.
              </motion.h2>
            </div>

            <motion.p
              className="text-sonar/70 text-body-lg mb-8 max-w-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Every component is designed to integrate. Validated interfaces, documented protocols, and available engineering support from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Link
                href="/contact"
                onClick={() => track("intent")}
                className="relative overflow-hidden inline-block bg-cyan px-8 py-4 font-mono text-sm text-abyss uppercase tracking-wider font-semibold group"
              >
                <motion.span
                  className="absolute inset-0 bg-teal origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative">Browse Catalogue</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: product grid */}
          <div className="grid grid-cols-3 gap-3">
            {components.map((comp, i) => (
              <motion.div
                key={comp.label}
                className="group relative overflow-hidden bg-navy border border-cyan/10"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={comp.image}
                    alt={comp.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    style={{ filter: "saturate(0.8)" }}
                  />
                  <motion.div
                    className="absolute inset-0 grid-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Label */}
                <div className="p-3">
                  <p className="font-body text-white text-xs font-medium leading-snug">{comp.label}</p>
                  <p className="font-mono text-[9px] text-sonar/40 mt-1 leading-relaxed">{comp.spec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
