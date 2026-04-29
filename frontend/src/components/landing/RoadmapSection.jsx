import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";

const NOW = [
  { title: "Multi-agent analysis", desc: "Vision, events, analytics and reporting working together." },
  { title: "Telegram bot interface", desc: "Drop a video, get a report — from your phone." },
  { title: "Plain-English follow-ups", desc: "Ask anything about the match, get a clear answer." },
];

const NEXT = [
  { title: "Real-time mode", desc: "Live tracking and stats while the match is being played." },
  { title: "Meters · calibrated", desc: "Pixel-to-meter conversion for true distance and speed." },
  { title: "Local-first option", desc: "Run analysis on your machine, no cloud needed." },
  { title: "More event types", desc: "Set pieces, expected outcomes and tactical patterns." },
  { title: "Web dashboard", desc: "A full browser-based control center for analysts and staff." },
];

export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      data-testid="roadmap-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            Roadmap
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Where PREDA is going.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            We’re building this with the community. Here’s what works today, and what’s
            coming next.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="hud-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
                <span className="font-display text-base font-semibold text-white">
                  Now · in development
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--primary))]"
              >
                v0.x
              </Badge>
            </div>
            <ul className="mt-5 space-y-3">
              {NOW.map((it) => (
                <li key={it.title} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                  <div>
                    <div className="font-medium text-white">{it.title}</div>
                    <div className="text-sm text-white/60">{it.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="hud-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[hsl(var(--accent))]" />
                <span className="font-display text-base font-semibold text-white">
                  Next · V2 highlights
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--accent))]"
              >
                v2 · planned
              </Badge>
            </div>
            <ul className="mt-5 space-y-3">
              {NEXT.map((it) => (
                <li key={it.title} className="flex gap-3">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10">
                    <Clock className="h-2.5 w-2.5 text-[hsl(var(--accent))]" />
                  </span>
                  <div>
                    <div className="font-medium text-white">{it.title}</div>
                    <div className="text-sm text-white/60">{it.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
