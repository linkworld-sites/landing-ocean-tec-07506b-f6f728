"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

function Panel({
  side,
  label,
  headline,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: {
  side: "left" | "right";
  label: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col min-h-[70vh] md:min-h-screen overflow-hidden bg-abyss group"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: side === "right" ? 0.15 : 0 }}
    >
      {/* Image */}
      <div className="relative flex-1 min-h-[40vh] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Grid overlay on hover */}
        <motion.div
          className="absolute inset-0 grid-overlay pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-abyss/20 to-abyss" />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-end p-8 md:p-10 lg:p-12 pb-10 md:pb-12 -mt-16">
        <p className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-3">{label}</p>
        <h2 className="font-display text-white text-display-md font-bold leading-tight mb-4">
          {headline}
        </h2>
        <p className="text-sonar/70 text-body-lg max-w-sm mb-8">{body}</p>

        {/* Directional CTA */}
        <Link
          href={ctaHref}
          onClick={() => track("intent")}
          className="inline-flex items-center gap-3 font-mono text-xs text-cyan uppercase tracking-wider group/cta"
        >
          <span>{ctaLabel}</span>
          <motion.span
            className="w-8 h-px bg-cyan inline-block origin-left"
            whileHover={{ scaleX: 1.5 }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-lg leading-none">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function CoreCapability() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="engineering" className="bg-abyss">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-24">
        <div className="overflow-hidden">
          <motion.p
            className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-4"
            initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Core Capability
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            ref={ref}
            className="font-display text-white text-display-lg font-bold max-w-2xl"
            initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Where others reach their limits, we begin.
          </motion.h2>
        </div>
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Panel
          side="left"
          label="Engineering"
          headline="Engineered for endurance."
          body="From system architecture to embedded firmware — we design electronics that survive where standard components fail. Pressure. Salinity. Temperature extremes. Full-stack development from circuit to chassis."
          ctaLabel="Engineering Capabilities"
          ctaHref="/contact"
          imageSrc="/images/detail.png"
          imageAlt="PCB assembly precision engineering"
        />
        <Panel
          side="right"
          label="Manufacturing"
          headline="From cell to system."
          body="Battery intelligence engineered for endurance. We build and qualify complete battery packs, BMS electronics, and propulsion units — production-ready, certified, and validated under operating conditions."
          ctaLabel="Manufacturing Process"
          ctaHref="/contact"
          imageSrc="/images/material.png"
          imageAlt="Battery pack manufacturing"
        />
      </div>
    </section>
  );
}
