"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const panels = [
  {
    id: "battery",
    label: "01 / Battery Packs",
    headline: "Cell-level intelligence. System-level resilience.",
    body: "Custom Li-ion and LFP battery assemblies configured for your voltage, capacity, and form-factor. Every pack is qualified under real operating conditions.",
    specs: [
      "Voltage range — 24V to 800V",
      "Capacity — 2 kWh to 200 kWh",
      "IP67 / IP68 rated housings",
      "Cycle life — 2000+ validated",
      "Custom BMS integration",
    ],
    image: "/images/products/product-2.jpg",
    tag: "Energy Storage",
  },
  {
    id: "bms",
    label: "02 / BMS",
    headline: "From cell to system — battery intelligence, engineered for endurance.",
    body: "Our battery management systems provide real-time cell monitoring, balancing, thermal management, and CAN/RS485 communication. Designed in-house. Tested to spec.",
    specs: [
      "Cell monitoring — ±2 mV accuracy",
      "Active & passive balancing",
      "CAN 2.0B / RS485 / UART",
      "SOC estimation — ±3%",
      "Hardware fault protection",
    ],
    image: "/images/products/product-4.jpg",
    tag: "Electronics",
  },
  {
    id: "propulsion",
    label: "03 / Jet Propulsion",
    headline: "Thrust, control, endurance. Built for depth.",
    body: "Underwater jet propulsion units designed for unmanned vehicles, ROVs, and custom maritime platforms. Brushless motor, integrated driver, sealed to depth.",
    specs: [
      "Thrust — 2 N to 100+ N",
      "Depth rating — 300 m standard",
      "Efficiency — 85%+ at peak",
      "PWM / CAN control interface",
      "Full waterproof enclosure",
    ],
    image: "/images/products/product-3.jpg",
    tag: "Propulsion",
  },
];

export function SolutionsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  const [activePanel, setActivePanel] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.3) setActivePanel(0);
    else if (v < 0.65) setActivePanel(1);
    else setActivePanel(2);
  });

  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="solutions" ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-navy">
        {/* Section label */}
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <p className="font-mono text-xs text-cyan tracking-[0.2em] uppercase">Solutions Showcase</p>
        </div>

        {/* Progress indicator */}
        <div className="absolute top-8 right-8 md:right-16 z-20 flex gap-3 items-center">
          {panels.map((p, i) => (
            <div
              key={p.id}
              className={`h-px transition-all duration-500 ${i === activePanel ? "w-10 bg-cyan" : "w-4 bg-sonar/20"}`}
            />
          ))}
        </div>

        {/* Horizontal track */}
        <motion.div
          className="flex h-full"
          style={{ width: "300vw", x: shouldReduceMotion ? 0 : x }}
        >
          {panels.map((panel, pi) => (
            <div
              key={panel.id}
              className="relative flex h-full"
              style={{ width: "100vw" }}
            >
              {/* Product image — 70vw */}
              <div className="relative overflow-hidden" style={{ width: "70vw" }}>
                <Image
                  src={panel.image}
                  alt={panel.headline}
                  fill
                  className="object-cover"
                  style={{ filter: "saturate(0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy" />
                <div className="absolute inset-0 bg-navy/30" />
              </div>

              {/* Spec panel — 30vw */}
              <div
                className="flex flex-col justify-center px-8 md:px-12 py-16 bg-navy"
                style={{ width: "30vw", minWidth: "280px" }}
              >
                <motion.div
                  animate={{
                    opacity: activePanel === pi || shouldReduceMotion ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-mono text-xs text-cyan/60 tracking-[0.2em] uppercase mb-2">
                    {panel.tag}
                  </p>
                  <p className="font-mono text-sm text-cyan mb-5">{panel.label}</p>
                  <h3 className="font-display text-white font-bold text-xl md:text-2xl leading-snug mb-4">
                    {panel.headline}
                  </h3>
                  <p className="text-sonar/60 text-sm leading-relaxed mb-8">{panel.body}</p>

                  {/* Spec callouts */}
                  <ul className="space-y-2.5">
                    {panel.specs.map((spec, si) => (
                      <motion.li
                        key={si}
                        className="flex items-start gap-3"
                        initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                        animate={
                          activePanel === pi || shouldReduceMotion
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{
                          delay: si * 0.12,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="w-3 h-px bg-cyan mt-2 shrink-0" />
                        <span className="font-mono text-xs text-sonar/70 leading-relaxed">
                          {spec}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
