import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  CircleDot,
  Users2,
  Activity,
  LineChart,
  ScrollText,
} from "lucide-react";

const AGENTS = [
  {
    name: "Vision Agent",
    desc: "Finds every player and the ball in every frame, even on cluttered broadcast feeds.",
    icon: Eye,
    tone: "green",
  },
  {
    name: "Ball Interpolation Agent",
    desc: "Fills in missing ball moments so the story stays complete and believable.",
    icon: CircleDot,
    tone: "blue",
  },
  {
    name: "Team Classifier",
    desc: "Separates teams reliably — even with similar kits or tricky lighting.",
    icon: Users2,
    tone: "green",
  },
  {
    name: "Events Agent",
    desc: "Detects key moments: passes, duels, shots, turnovers, recoveries.",
    icon: Activity,
    tone: "blue",
  },
  {
    name: "Analytics Agent",
    desc: "Turns events into insights — distance, sprints, top speed, heatmaps.",
    icon: LineChart,
    tone: "green",
  },
  {
    name: "Reporting Agent",
    desc: "Builds a clean, share-ready summary in plain English for staff and players.",
    icon: ScrollText,
    tone: "blue",
  },
];

export default function AgentsShowcase() {
  return (
    <section
      id="agents"
      data-testid="agents-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            The 6 AI agents
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A small team of specialists — working as one.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Instead of one giant model, PREDA orchestrates focused agents that each do their job
            extremely well, then hand off to the next. The result feels like a calm, capable analyst
            who never sleeps.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20"
              data-testid={`agent-card-${a.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-200 group-hover:opacity-60"
                style={{
                  backgroundColor:
                    a.tone === "green" ? "rgba(124,255,107,0.18)" : "rgba(76,201,255,0.18)",
                }}
              />
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 ${
                  a.tone === "green" ? "bg-[hsl(var(--primary))]/10" : "bg-[hsl(var(--accent))]/10"
                }`}
              >
                <a.icon
                  className={`h-5 w-5 ${
                    a.tone === "green" ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--accent))]"
                  }`}
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-white">{a.name}</h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                  agent {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
