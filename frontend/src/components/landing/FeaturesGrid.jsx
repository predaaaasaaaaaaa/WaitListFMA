import React from "react";
import { motion } from "framer-motion";
import {
  ScrollText,
  MessageCircle,
  Send,
  Activity,
  Trophy,
  Coins,
} from "lucide-react";

const FEATURES = [
  {
    title: "Auto match reports",
    desc: "Get a coach-ready summary every time — events, key players, talking points.",
    icon: ScrollText,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    accent: "green",
  },
  {
    title: "Plain-English Q&A",
    desc: "Ask: “Who ran the most in the second half?” — get the answer, not a query language.",
    icon: MessageCircle,
    accent: "blue",
  },
  {
    title: "Telegram bot interface",
    desc: "Submit videos and ask follow-ups from your phone, where your team already chats.",
    icon: Send,
    accent: "green",
  },
  {
    title: "Physical metrics",
    desc: "Distance, sprints, top speed and heatmaps for every player on the pitch.",
    icon: Activity,
    accent: "blue",
  },
  {
    title: "Event detection",
    desc: "Passes, duels, shots, turnovers — detected automatically and time-stamped.",
    icon: Trophy,
    accent: "green",
  },
  {
    title: "Built to be affordable",
    desc: "Designed so academies and lower-tier clubs can finally access pro-grade analytics.",
    icon: Coins,
    accent: "blue",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              Features
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything a club analyst needs — nothing they don’t.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Built around the workflows real coaches and analysts use every week. No bloat, no
            jargon, no enterprise sales calls.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[180px]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/20 ${f.span || ""}`}
              data-testid={`feature-card-${f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              <div
                className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-200 group-hover:opacity-50"
                style={{
                  backgroundColor:
                    f.accent === "green" ? "rgba(124,255,107,0.20)" : "rgba(76,201,255,0.20)",
                }}
              />
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 ${
                  f.accent === "green" ? "bg-[hsl(var(--primary))]/10" : "bg-[hsl(var(--accent))]/10"
                }`}
              >
                <f.icon
                  className={`h-4 w-4 ${
                    f.accent === "green" ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--accent))]"
                  }`}
                />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
