"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    let frame: number;
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);
  return value;
}

const stats: { value: number; suffix: string; prefix?: string; label: string; note: string }[] = [
  { value: 10, suffix: "+", label: "Years of Engineering\nExperience", note: "Founded 2014" },
  { value: 140, suffix: "+", label: "Battery Systems\nDeployed", note: "Across 3 continents" },
  { value: 2000, suffix: "", prefix: ">", label: "Propulsion Units\nin the Field", note: "Marine & industrial" },
  { value: 12, suffix: "", label: "Countries Served", note: "EU · MENA · APAC" },
];

export function StatConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative bg-abyss py-24 md:py-36 overflow-hidden depth-chart-bg">
      {/* Faint depth-chart contour overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,168,204,0.03) 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section label */}
        <div className="overflow-hidden mb-4">
          <motion.p
            className="font-mono text-xs text-cyan tracking-[0.2em] uppercase"
            initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            By the Numbers
          </motion.p>
        </div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-display text-white text-display-lg font-bold"
            initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Not a supplier.<br className="hidden md:block" /> A development partner.
          </motion.h2>
        </div>

        {/* Asymmetric stat grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              index={i}
              active={isInView}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>

        {/* Bottom descriptor */}
        <motion.p
          className="mt-16 text-sonar/40 text-sm font-body max-w-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We engage from the earliest design stage — architecture, prototyping, validation, and series production — as a single integrated partner.
        </motion.p>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  active,
  shouldReduceMotion,
}: {
  stat: { value: number; suffix: string; prefix?: string; label: string; note: string };
  index: number;
  active: boolean;
  shouldReduceMotion: boolean;
}) {
  const count = useCounter(stat.value, 1800, active && !shouldReduceMotion);
  const display = shouldReduceMotion ? stat.value : count;

  return (
    <motion.div
      className={`${index % 2 === 1 ? "lg:mt-10" : ""} p-6 lg:p-8 border border-cyan/10 relative overflow-hidden group`}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Counter */}
      <div className="font-display text-teal font-bold leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        {stat.prefix && <span className="text-cyan/60">{stat.prefix}</span>}
        {display}
        <span className="text-cyan/60">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="mt-3 text-white font-body text-sm font-medium leading-snug whitespace-pre-line">
        {stat.label}
      </p>

      {/* Note */}
      <p className="mt-2 font-mono text-[10px] text-sonar/40 tracking-wider uppercase">
        {stat.note}
      </p>
    </motion.div>
  );
}
