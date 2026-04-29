import React from "react";
import { motion } from "framer-motion";
import { Clock, Wallet, BarChart3 } from "lucide-react";

const PAINS = [
  {
    icon: Clock,
    title: "Hours wasted tagging",
    desc: "Manually marking events frame by frame burns the time you should spend coaching.",
  },
  {
    icon: Wallet,
    title: "Premium data is gated",
    desc: "Opta and StatsBomb are built for elite budgets. Mid and low-tier clubs get left out.",
  },
  {
    icon: BarChart3,
    title: "Inconsistent output",
    desc: "Different analysts, different reports. Decisions get fuzzy when comparison is hard.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            The Problem
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl text-balance"
          >
            Manual analysis is slow.{" "}
            <span className="text-white/60">Premium data is expensive.</span>
          </motion.h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
            Most clubs and academies still review tape by hand or pay enterprise prices for
            insights they can’t fully control. PREDA gives you the same depth, in plain English,
            from the videos you already have.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {PAINS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="hud-card rounded-2xl p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <p.icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
