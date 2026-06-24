"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

const words = ["Innovation", "in", "Water.", "Precision", "in", "Every", "Environment."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden bg-abyss">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: shouldReduceMotion ? undefined : parallaxY }}
      >
        <Image
          src="/images/hero.png"
          alt="Jet propulsion unit firing in test tank"
          fill
          priority
          className="object-cover"
          style={{ filter: "saturate(0.7)" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-abyss/55" />
        {/* Cyan tint overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,168,204,0.08) 0%, transparent 70%)" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to bottom, transparent, #050D12)" }}
        />
      </motion.div>

      {/* Sonar grid SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Static concentric rings */}
          {[120, 240, 360, 480, 600, 720].map((r) => (
            <circle
              key={r}
              cx="720"
              cy="450"
              r={r}
              fill="none"
              stroke="#00A8CC"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}
          {/* Radial lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="720"
                y1="450"
                x2={720 + Math.cos(angle) * 800}
                y2={450 + Math.sin(angle) * 800}
                stroke="#00A8CC"
                strokeWidth="0.3"
                opacity="0.06"
              />
            );
          })}
          {/* Animated pulse rings */}
          <circle
            cx="720"
            cy="450"
            r="250"
            fill="none"
            stroke="#00A8CC"
            strokeWidth="1"
            className="animate-sonar-1"
          />
          <circle
            cx="720"
            cy="450"
            r="250"
            fill="none"
            stroke="#00A8CC"
            strokeWidth="1"
            className="animate-sonar-2"
          />
          <circle
            cx="720"
            cy="450"
            r="250"
            fill="none"
            stroke="#00A8CC"
            strokeWidth="1"
            className="animate-sonar-3"
          />
        </svg>
      </div>

      {/* Content — lower left editorial */}
      <div className="absolute bottom-16 left-8 md:left-16 lg:left-20 max-w-3xl z-10">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Deep-Sea Engineering · Klagenfurt, Austria
        </motion.p>

        {/* Headline — word by word clipPath reveal */}
        <h1 className="font-display text-white text-display-xl font-bold leading-[1.0]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
              <motion.span
                className="inline-block"
                initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
                animate={shouldReduceMotion ? {} : { clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub copy */}
        <motion.p
          className="mt-6 text-sonar/80 font-body text-body-lg max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Custom battery systems, BMS, and jet propulsion devices — engineered for the environments where others stop.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          <Link
            href="/contact"
            onClick={() => track("intent")}
            className="relative overflow-hidden bg-cyan px-7 py-3.5 font-mono text-sm text-abyss uppercase tracking-wider font-semibold group"
          >
            <motion.span
              className="absolute inset-0 bg-teal origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative">Partner With Us</span>
          </Link>
          <a
            href="#solutions"
            className="border border-sonar/30 px-7 py-3.5 font-mono text-sm text-sonar uppercase tracking-wider hover:border-cyan hover:text-cyan transition-colors duration-300"
          >
            Explore Solutions
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="font-mono text-[10px] text-sonar/40 tracking-widest uppercase rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan/40 to-transparent" />
      </motion.div>
    </section>
  );
}
