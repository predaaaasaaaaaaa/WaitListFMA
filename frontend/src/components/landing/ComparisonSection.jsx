import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const ROWS = [
  { label: "Designed for mid & low-tier clubs", preda: true, opta: false, sb: false },
  { label: "Works on the videos you already have", preda: true, opta: false, sb: "partial" },
  { label: "Plain-English Q&A from a chat app", preda: true, opta: false, sb: false },
  { label: "Player tracking + physical stats", preda: true, opta: true, sb: true },
  { label: "Event detection (passes, duels, shots)", preda: true, opta: true, sb: true },
  { label: "Self-serve onboarding (no sales call)", preda: true, opta: false, sb: false },
];

function Cell({ value }) {
  if (value === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))]">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-white/35">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-white/55">
      <Minus className="h-3.5 w-3.5" />
    </span>
  );
}

export default function ComparisonSection() {
  return (
    <section
      id="comparison"
      data-testid="comparison-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            How we compare
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl text-balance">
            Pro-grade output, without the enterprise gatekeeping.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Opta and StatsBomb set the bar — we love them. But they’re built and priced for elite
            clubs. PREDA is engineered to deliver the same depth where it’s needed most: youth
            academies, semi-pro and lower-tier clubs that want better decisions, faster.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Target price gap
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-white">
                ~ 20× lower
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Time to first report
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-white">
                Minutes, not weeks
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="hud-card overflow-hidden rounded-2xl"
          >
            <div className="grid grid-cols-12 border-b border-white/10 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:px-6">
              <div className="col-span-6">Capability</div>
              <div className="col-span-2 text-center text-[hsl(var(--primary))]">PREDA</div>
              <div className="col-span-2 text-center">Opta</div>
              <div className="col-span-2 text-center">StatsBomb</div>
            </div>
            <ul className="divide-y divide-white/5">
              {ROWS.map((r) => (
                <li
                  key={r.label}
                  className="grid grid-cols-12 items-center px-4 py-3 text-sm text-white/85 sm:px-6"
                >
                  <div className="col-span-6 pr-3">{r.label}</div>
                  <div className="col-span-2 flex justify-center">
                    <Cell value={r.preda} />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Cell value={r.opta} />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Cell value={r.sb} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/5 bg-white/[0.02] px-4 py-3 text-[11px] text-white/45 sm:px-6">
              Comparison is illustrative and reflects PREDA’s product positioning, not formal
              benchmarks.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
