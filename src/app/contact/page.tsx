"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ConversionForm from "@/components/ConversionForm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { track } from "@/lib/funnel";

const fields = [
  { name: "name", label: "Full Name", required: true },
  { name: "company", label: "Company / Organisation", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "role", label: "Your Role (e.g. R&D Lead, Procurement)" },
  { name: "message", label: "Project Brief — what are you working on?", type: "textarea", required: true },
];

export default function ContactPage() {
  useEffect(() => {
    track("form_start");
  }, []);


  return (
    <>
      <Nav />
      <main className="min-h-screen bg-abyss pt-24">
        {/* Hero strip */}
        <div className="border-b border-cyan/10 pb-12 pt-16 md:pt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <motion.p
                  className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  Start a Conversation
                </motion.p>
                <motion.h1
                  className="font-display text-white text-display-lg font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Not a supplier.<br />
                  A development<br />
                  partner.
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-sonar/70 text-body-lg mb-6">
                  Tell us about your project. We engage from requirements through series production — the earlier you involve us, the better the outcome.
                </p>
                <div className="space-y-3 font-mono text-xs text-sonar/50">
                  <p>hello@ocean-tec.eu</p>
                  <p>+43 463 20 33 73</p>
                  <p>Klagenfurt, Austria — CET/CEST</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h2 className="font-display text-white text-xl font-semibold mb-6">
                What to expect
              </h2>
              <ul className="space-y-5">
                {[
                  { step: "01", text: "We review your brief within 2 business days." },
                  { step: "02", text: "A technical lead schedules a 30-min discovery call." },
                  { step: "03", text: "We provide a preliminary scope and feasibility statement — no cost." },
                  { step: "04", text: "If it's a fit, we propose an engagement structure." },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="font-mono text-xs text-cyan/50 mt-0.5 shrink-0">{item.step}</span>
                    <p className="text-sonar/60 text-sm leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-5 border border-cyan/10 bg-navy/50">
                <p className="font-mono text-xs text-cyan tracking-wider uppercase mb-2">Office</p>
                <address className="not-italic text-sm text-sonar/60 space-y-1">
                  <p>OCEAN TEC GmbH</p>
                  <p>Waidmannsdorferstrasse 83</p>
                  <p>9020 Klagenfurt, Austria</p>
                </address>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* onSubmitCapture fires track("convert") when the form is submitted */}
              <div
                onSubmitCapture={() => track("convert")}
                className="[&_label>span]:font-mono [&_label>span]:text-xs [&_label>span]:text-sonar/50 [&_label>span]:tracking-wider [&_label>span]:uppercase [&_input]:bg-navy/60 [&_input]:border-cyan/20 [&_input]:text-white [&_input]:px-4 [&_input]:py-3.5 [&_input:focus]:border-cyan [&_textarea]:bg-navy/60 [&_textarea]:border-cyan/20 [&_textarea]:text-white [&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea:focus]:border-cyan [&_button[type=submit]]:bg-cyan [&_button[type=submit]]:text-abyss [&_button[type=submit]]:font-mono [&_button[type=submit]]:uppercase [&_button[type=submit]]:tracking-wider [&_button[type=submit]]:px-8 [&_button[type=submit]]:py-4 [&_button[type=submit]:hover]:bg-teal [&_button[type=submit]]:transition-colors [&_button[type=submit]]:font-semibold [&_p.text-xl]:font-display [&_p.text-xl]:text-white [&_p.opacity-60]:text-sonar/60"
              >
                <ConversionForm
                  startStep="form_start"
                  submitStep="lead"
                  cta="Send Project Brief"
                  fields={fields}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
