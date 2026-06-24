"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const steps = [
  {
    id: "idea",
    label: "Idea",
    title: "Requirements & Specification",
    body: "We define performance envelopes, environmental constraints, interface requirements, and qualification targets — before a single component is chosen.",
  },
  {
    id: "engineering",
    label: "Engineering",
    title: "System Architecture",
    body: "Electronics, firmware, mechanical integration. Every subsystem designed together to eliminate interface surprises at integration.",
  },
  {
    id: "prototyping",
    label: "Prototyping",
    title: "Functional Prototypes",
    body: "Hardware-in-the-loop prototypes delivered for your evaluation. Real parts, real firmware — not simulation outputs.",
  },
  {
    id: "testing",
    label: "Testing",
    title: "Qualification & Validation",
    body: "Environmental stress screening, IP testing, electrical characterisation, and field simulation. Failure modes found in the lab, not in the field.",
  },
  {
    id: "production",
    label: "Production",
    title: "Series Production",
    body: "Controlled manufacturing, traceability, and ongoing engineering support. We don't hand over a design — we stay in the loop.",
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="bg-abyss py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <div className="overflow-hidden mb-4">
            <motion.p
              className="font-mono text-xs text-cyan tracking-[0.2em] uppercase"
              initial={shouldReduceMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              How We Work
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
              Idea → Series.<br className="hidden md:block" /> No gaps.
            </motion.h2>
          </div>
        </div>

        {/* Pipe-and-node diagram */}
        <div ref={sectionRef} className="relative">
          {/* Horizontal pipe line */}
          <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-navy">
            <motion.div
              className="h-full bg-cyan/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <StepNode
                key={step.id}
                step={step}
                index={i}
                active={isInView}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepNode({
  step,
  index,
  active,
  shouldReduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      className="relative"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node */}
      <div className="relative mb-8">
        <div className="relative w-12 h-12 rounded-full border border-cyan/40 bg-navy flex items-center justify-center z-10">
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan/30"
            initial={shouldReduceMotion ? {} : { scale: 1, opacity: 0.5 }}
            animate={
              active && !shouldReduceMotion
                ? { scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }
                : {}
            }
            transition={{
              delay: 0.5 + index * 0.2,
              duration: 1.5,
              ease: "easeOut",
              repeat: 0,
            }}
          />
          <span className="font-mono text-xs text-cyan font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="font-mono text-xs text-cyan/60 tracking-[0.15em] uppercase mb-2">{step.label}</p>
      <h3 className="font-display text-white font-semibold text-base mb-3">{step.title}</h3>
      <p className="text-sonar/60 text-sm leading-relaxed">{step.body}</p>
    </motion.div>
  );
}
