import React from "react";
import { motion } from "framer-motion";
import { FileVideo, Eye, Zap, LineChart, FileText } from "lucide-react";

const STEPS = [
  {
    icon: FileVideo,
    title: "Drop the video",
    desc: "Upload a match clip from your phone, drone, or broadcast feed.",
  },
  {
    icon: Eye,
    title: "AI watches it",
    desc: "PREDA tracks every player and the ball, frame by frame.",
  },
  {
    icon: Zap,
    title: "Events appear",
    desc: "Passes, duels, shots and turnovers are detected automatically.",
  },
  {
    icon: LineChart,
    title: "Stats build up",
    desc: "Distance, sprints, top speed and heatmaps for every player.",
  },
  {
    icon: FileText,
    title: "Report ready",
    desc: "Get a clean summary you can share with staff — plus chat in plain English.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(700px circle at 50% 0%, rgba(76,201,255,0.10), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From video to insights in 5 steps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            No GPU farms. No model tuning. PREDA orchestrates a small team of specialised AI agents
            so you get pro-grade output, automatically.
          </p>
        </div>

        <div className="relative mt-12">
          {/* connector line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
            aria-hidden
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <s.icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                    <span className="absolute -right-1 -top-1 rounded-md border border-white/10 bg-black/70 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-white/65">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
