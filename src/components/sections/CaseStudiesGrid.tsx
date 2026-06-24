"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

const studies = [
  {
    id: "auv",
    title: "Autonomous Underwater Vehicle — Energy Module",
    tags: ["Battery Pack", "48V System", "IP68"],
    image: "/images/products/product-0.jpg",
    size: "large",
  },
  {
    id: "rov",
    title: "ROV Propulsion Retrofit",
    tags: ["Jet Propulsion", "CAN Control"],
    image: "/images/products/product-5.jpg",
    size: "small",
  },
  {
    id: "emobility",
    title: "E-Mobility High-Voltage BMS",
    tags: ["BMS", "800V Architecture"],
    image: "/images/products/product-6.jpg",
    size: "small",
  },
  {
    id: "marine",
    title: "Marine Research Platform — Integrated Drive System",
    tags: ["Full Stack", "Drive + Energy"],
    image: "/images/products/product-7.jpg",
    size: "large",
  },
];

function Tile({
  study,
  index,
}: {
  study: (typeof studies)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer"
      style={{ minHeight: study.size === "large" ? "480px" : "230px" }}
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 1.06 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
    >
      {/* Image */}
      <Image
        src={study.image}
        alt={study.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/20 to-transparent" />

      {/* Grid overlay on hover */}
      <motion.div
        className="absolute inset-0 grid-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Slide-up content */}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-cyan/80 uppercase tracking-wider border border-cyan/20 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-white font-semibold text-lg leading-snug">
          {study.title}
        </h3>
        <Link
          href="/contact"
          onClick={() => track("intent")}
          className="inline-flex items-center gap-2 mt-3 font-mono text-xs text-cyan uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span>Discuss This Project</span>
          <span>→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function CaseStudiesGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="overflow-hidden mb-4">
              <motion.p
                className="font-mono text-xs text-cyan tracking-[0.2em] uppercase"
                initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Field Applications
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-white text-display-lg font-bold"
                initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Projects that shipped.
              </motion.h2>
            </div>
          </div>
          <Link
            href="/contact"
            onClick={() => track("intent")}
            className="font-mono text-xs text-sonar/50 uppercase tracking-wider hover:text-cyan transition-colors self-end"
          >
            Discuss Your Project →
          </Link>
        </div>

        {/* Asymmetric grid: 2 large + 1 stack of 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <Tile study={studies[0]} index={0} />
          </div>
          <div className="md:col-span-1 flex flex-col gap-3">
            <Tile study={studies[1]} index={1} />
            <Tile study={studies[2]} index={2} />
          </div>
          <div className="md:col-span-1">
            <Tile study={studies[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
