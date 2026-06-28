"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { track } from "@/lib/funnel";

const PROJECT_TYPES = [
  "Battery System",
  "Propulsion",
  "Full-Stack Electronics",
  "Other",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: ProjectType | "";
  message: string;
}

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    track("intent");
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(data.error ?? "Submission failed. Please try again or email us directly.");
        return;
      }
      router.push("/contact/thank-you");
    } catch {
      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <label className="grid gap-2 text-sm">
                    <span className="font-mono text-xs text-sonar/50 tracking-wider uppercase">
                      Full Name <span className="text-cyan">*</span>
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      className="border border-cyan/20 bg-navy/60 text-white px-4 py-3.5 outline-none focus:border-cyan transition-colors"
                    />
                  </label>

                  {/* Company */}
                  <label className="grid gap-2 text-sm">
                    <span className="font-mono text-xs text-sonar/50 tracking-wider uppercase">
                      Company / Organisation <span className="text-cyan">*</span>
                    </span>
                    <input
                      name="company"
                      type="text"
                      required
                      value={form.company}
                      onChange={set("company")}
                      className="border border-cyan/20 bg-navy/60 text-white px-4 py-3.5 outline-none focus:border-cyan transition-colors"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <label className="grid gap-2 text-sm">
                    <span className="font-mono text-xs text-sonar/50 tracking-wider uppercase">
                      Email Address <span className="text-cyan">*</span>
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      className="border border-cyan/20 bg-navy/60 text-white px-4 py-3.5 outline-none focus:border-cyan transition-colors"
                    />
                  </label>

                  {/* Phone (optional) */}
                  <label className="grid gap-2 text-sm">
                    <span className="font-mono text-xs text-sonar/50 tracking-wider uppercase">
                      Phone
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      className="border border-cyan/20 bg-navy/60 text-white px-4 py-3.5 outline-none focus:border-cyan transition-colors"
                    />
                  </label>
                </div>

                {/* Project type */}
                <label className="grid gap-2 text-sm">
                  <span className="font-mono text-xs text-sonar/50 tracking-wider uppercase">
                    Project Type <span className="text-cyan">*</span>
                  </span>
                  <select
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={set("projectType")}
                    className="border border-cyan/20 bg-navy/60 text-white px-4 py-3.5 outline-none focus:border-cyan transition-colors appearance-none"
                  >
                    <option value="" disabled>Select a category</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                {/* Message */}
                <label className="grid gap-2 text-sm">
                  <span className="font-mono text-xs text-sonar/50 tracking-wider uppercase">
                    Project Brief <span className="text-cyan">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Describe your requirements, target environment, timeline, and any key constraints."
                    className="border border-cyan/20 bg-navy/60 text-white px-4 py-3.5 outline-none focus:border-cyan transition-colors resize-none placeholder:text-sonar/30"
                  />
                </label>

                {/* Error message */}
                {error && (
                  <p className="font-mono text-xs text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <div>
                  <motion.button
                    type="submit"
                    disabled={busy}
                    whileHover={busy ? {} : { scale: 1.02 }}
                    whileTap={busy ? {} : { scale: 0.98 }}
                    className="bg-cyan text-abyss font-mono uppercase tracking-wider px-8 py-4 font-semibold transition-colors hover:bg-teal disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {busy ? "Sending…" : "Send Project Brief"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
