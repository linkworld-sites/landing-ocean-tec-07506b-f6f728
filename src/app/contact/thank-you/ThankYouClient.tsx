"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function ThankYouClient() {
  useEffect(() => {
    track("convert");
    if (typeof window !== "undefined" && typeof (window as { gtag?: Function }).gtag === "function") {
      (window as { gtag?: Function }).gtag!("event", "generate_lead", {
        event_category: "contact",
        event_label: "contact_form",
      });
    }
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-abyss pt-24 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            className="max-w-xl w-full text-center py-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Enquiry Received
            </motion.p>
            <motion.h1
              className="font-display text-white text-3xl md:text-4xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Your enquiry has been received.
            </motion.h1>
            <motion.p
              className="text-sonar/70 text-lg leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              An Ocean Tec engineer will review your requirements and respond within 2 business days.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-block font-mono text-xs tracking-wider uppercase px-8 py-4 border border-cyan/30 text-cyan hover:bg-cyan hover:text-abyss transition-colors duration-200"
              >
                Return to Homepage
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </main>
    </>
  );
}
