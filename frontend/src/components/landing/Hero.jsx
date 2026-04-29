import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const HeroScene = lazy(() => import("@/components/landing/three/HeroScene"));

function useReducedAndSmall() {
  const [reduced, setReduced] = useState(false);
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const s = window.matchMedia("(max-width: 640px)");
    const update = () => {
      setReduced(m.matches);
      setSmall(s.matches);
    };
    update();
    m.addEventListener?.("change", update);
    s.addEventListener?.("change", update);
    return () => {
      m.removeEventListener?.("change", update);
      s.removeEventListener?.("change", update);
    };
  }, []);
  return { reduced, small };
}

export default function Hero() {
  const { reduced, small } = useReducedAndSmall();
  const disable3D = reduced || small;

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative isolate overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 tactical-grid opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" aria-hidden />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-28">
        {/* Left: copy */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-60 preda-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
              Early access · AI match analyzer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance"
          >
            Turn match video into{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              clear performance insights.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Player tracking, events, physical stats and shareable reports — built for clubs
            and analysts who need pro-grade output without the Opta or StatsBomb price tag.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              data-testid="hero-primary-cta-button"
              onClick={() => scrollTo("#waitlist")}
              className="group h-12 rounded-xl bg-[hsl(var(--primary))] px-6 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_0_0_4px_rgba(124,255,107,0.18)]"
            >
              Join the waitlist
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Button>
            <Button
              data-testid="hero-secondary-cta-button"
              variant="ghost"
              onClick={() => scrollTo("#preview")}
              className="h-12 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              See interactive preview
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-3"
          >
            {[
              { k: "20×", v: "more affordable" },
              { k: "6", v: "AI agents" },
              { k: "plain", v: "english Q&A" },
            ].map((it, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
              >
                <div className="font-mono text-base font-semibold text-white">{it.k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/55">
                  {it.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D scene */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
            data-testid="hero-scene-wrapper"
          >
            <div className="hud-card hud-corner relative overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] preda-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                    Live tracking · PREDA HUD
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/55">
                  <Sparkles className="h-3 w-3 text-[hsl(var(--accent))]" />
                  multi-agent
                </div>
              </div>
              <div className="relative aspect-[5/4] w-full bg-[#050810]">
                {disable3D ? (
                  <HeroFallback />
                ) : (
                  <Suspense fallback={<HeroFallback skeleton />}>
                    <HeroScene />
                  </Suspense>
                )}
                {/* Overlay HUD elements */}
                <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1">
                  <span className="rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75">
                    cam_01 · 1080p
                  </span>
                  <span className="rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--primary))]">
                    tracked: 22 · ball: ok
                  </span>
                </div>
                <div className="pointer-events-none absolute bottom-3 right-3">
                  <span className="rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                    fps 58 · lag 22ms
                  </span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-x-6 -bottom-6 h-32 bg-gradient-to-t from-[hsl(var(--primary))]/15 to-transparent blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroFallback({ skeleton = false }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 tactical-grid-fine opacity-70" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(closest-side at 50% 55%, rgba(124,255,107,0.18), transparent 70%)",
        }}
      />
      {/* Pitch outline */}
      <svg viewBox="0 0 640 480" className="relative z-10 h-full w-full">
        <defs>
          <linearGradient id="pitch-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(124,255,107,0.7)" />
            <stop offset="100%" stopColor="rgba(76,201,255,0.5)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#pitch-fade)" strokeWidth="1.2" opacity="0.85">
          <rect x="60" y="60" width="520" height="360" rx="4" />
          <line x1="320" y1="60" x2="320" y2="420" />
          <circle cx="320" cy="240" r="60" />
          <rect x="60" y="150" width="80" height="180" />
          <rect x="500" y="150" width="80" height="180" />
        </g>
        {!skeleton && (
          <g>
            {Array.from({ length: 11 }).map((_, i) => (
              <circle
                key={`a${i}`}
                cx={120 + (i % 4) * 60}
                cy={120 + Math.floor(i / 4) * 80}
                r="5"
                fill="rgba(124,255,107,0.95)"
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <circle
                key={`b${i}`}
                cx={420 + (i % 4) * 40}
                cy={150 + Math.floor(i / 4) * 75}
                r="5"
                fill="rgba(76,201,255,0.95)"
              />
            ))}
            <circle cx="330" cy="260" r="4" fill="#fff" />
          </g>
        )}
      </svg>
    </div>
  );
}
