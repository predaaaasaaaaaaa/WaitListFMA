import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Goal, ShieldHalf, Footprints, Flame } from "lucide-react";

/* ---------- Helpers ---------- */
function useInViewOnce(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Counter({ to, suffix = "", duration = 1200, decimals = 0, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return (
    <span className="font-mono tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Stat strip ---------- */
function StatCounters({ start }) {
  const stats = [
    { label: "Distance", value: 11.7, suffix: " km", decimals: 1, icon: Footprints },
    { label: "Top speed", value: 33.4, suffix: " km/h", decimals: 1, icon: Flame },
    { label: "Sprints", value: 47, suffix: "", decimals: 0, icon: Activity },
    { label: "Possession", value: 58, suffix: " %", decimals: 0, icon: ShieldHalf },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          data-testid={`preview-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {s.label}
            </span>
            <s.icon className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
          </div>
          <div className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} start={start} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Heatmap ---------- */
function Heatmap({ start }) {
  const cols = 14;
  const rows = 8;
  const cells = useMemo(() => {
    return Array.from({ length: cols * rows }).map((_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      // gaussian-ish hot zone
      const cx = 8 + Math.sin(y * 0.6) * 1.2;
      const cy = 4;
      const d = Math.hypot(x - cx, y - cy);
      const v = Math.max(0, 1 - d / 6) * (0.5 + Math.random() * 0.5);
      return Math.min(1, v);
    });
  }, []);
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
          Heatmap · #10
        </span>
        <span className="font-mono text-[10px] text-white/55">90:00</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#06120c] p-2">
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {cells.map((v, i) => (
            <div
              key={i}
              className="aspect-square rounded-[2px]"
              style={{
                backgroundColor: `rgba(124, 255, 107, ${start ? v * 0.85 : 0.05})`,
                transition: "background-color 600ms ease",
                transitionDelay: `${(i % 18) * 25}ms`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/45">
        <span>Defensive third</span>
        <span>Final third</span>
      </div>
    </div>
  );
}

/* ---------- Event ticker ---------- */
const EVENTS = [
  { t: "04:21", team: "A", icon: Goal, type: "shot", text: "#9 Shot on target from 18 yards" },
  { t: "08:55", team: "B", icon: ShieldHalf, type: "duel", text: "#4 Won aerial duel near halfway" },
  { t: "12:03", team: "A", icon: Activity, type: "pass", text: "#10 Progressive pass into final third" },
  { t: "23:47", team: "B", icon: Footprints, type: "sprint", text: "#7 Sprint 28.4 km/h · 18m" },
  { t: "34:12", team: "A", icon: Goal, type: "goal", text: "#9 Goal · assisted by #10" },
  { t: "41:30", team: "B", icon: Activity, type: "pass", text: "#8 Switch of play · 36m" },
  { t: "56:08", team: "A", icon: ShieldHalf, type: "tackle", text: "#5 Tackle won, possession recovered" },
  { t: "68:44", team: "B", icon: Flame, type: "shot", text: "#11 Shot blocked, deflection out" },
  { t: "79:21", team: "A", icon: Footprints, type: "sprint", text: "#10 Sprint 31.2 km/h · 22m" },
];

function EventTicker({ start }) {
  const [idx, setIdx] = useState(3);
  useEffect(() => {
    if (!start) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) return;
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % EVENTS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [start]);

  const visible = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(EVENTS[(idx - i + EVENTS.length) % EVENTS.length]);
    }
    return arr;
  }, [idx]);

  return (
    <div
      data-testid="interactive-preview-event-ticker"
      className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
          Live event feed
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] preda-pulse" />
          streaming
        </span>
      </div>
      <ul className="divide-y divide-white/5">
        {visible.map((e, i) => (
          <motion.li
            key={`${e.t}-${i}`}
            initial={i === 0 ? { opacity: 0, y: -6 } : false}
            animate={{ opacity: 1 - i * 0.13, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <span className="font-mono text-[11px] text-white/55 w-12">{e.t}</span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                e.team === "A"
                  ? "border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10"
                  : "border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10"
              }`}
            >
              <e.icon
                className={`h-3.5 w-3.5 ${
                  e.team === "A"
                    ? "text-[hsl(var(--primary))]"
                    : "text-[hsl(var(--accent))]"
                }`}
              />
            </span>
            <span className="flex-1 truncate text-sm text-white/85">{e.text}</span>
            <Badge
              variant="outline"
              className={`border-white/10 bg-white/5 text-[10px] uppercase tracking-widest ${
                e.team === "A" ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--accent))]"
              }`}
            >
              {e.type}
            </Badge>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Players tab ---------- */
const PLAYERS = [
  { num: 10, name: "Ahmed B.", team: "A", role: "AM", dist: 11.4, top: 32.6, sprints: 18, passes: 64 },
  { num: 9, name: "Karim O.", team: "A", role: "ST", dist: 9.8, top: 33.4, sprints: 22, passes: 28 },
  { num: 8, name: "Lucas R.", team: "A", role: "CM", dist: 12.1, top: 28.9, sprints: 12, passes: 71 },
  { num: 7, name: "M. Diop", team: "B", role: "RW", dist: 10.6, top: 31.2, sprints: 19, passes: 35 },
  { num: 4, name: "J. Costa", team: "B", role: "CB", dist: 9.2, top: 26.1, sprints: 6, passes: 49 },
];

function PlayersTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5">
          <tr className="text-[10px] uppercase tracking-[0.16em] text-white/55">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Player</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Role</th>
            <th className="px-4 py-3 font-medium">Dist</th>
            <th className="px-4 py-3 font-medium">Top</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Sprints</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Passes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {PLAYERS.map((p) => (
            <tr key={p.num} className="text-white/85 transition-colors hover:bg-white/[0.03]">
              <td className="px-4 py-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs ${
                    p.team === "A"
                      ? "bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))]"
                      : "bg-[hsl(var(--accent))]/15 text-[hsl(var(--accent))]"
                  }`}
                >
                  {p.num}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-white">{p.name}</div>
                <div className="text-[11px] text-white/45">Team {p.team}</div>
              </td>
              <td className="hidden px-4 py-3 text-white/70 sm:table-cell">{p.role}</td>
              <td className="px-4 py-3 font-mono">{p.dist.toFixed(1)} km</td>
              <td className="px-4 py-3 font-mono">{p.top.toFixed(1)}</td>
              <td className="hidden px-4 py-3 font-mono sm:table-cell">{p.sprints}</td>
              <td className="hidden px-4 py-3 font-mono md:table-cell">{p.passes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Score strip ---------- */
function ScoreStrip({ start }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/15 font-display font-semibold text-[hsl(var(--primary))]">
            A
          </span>
          <div>
            <div className="font-display text-base font-semibold text-white">Falcons FC</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">home</div>
          </div>
        </div>
        <div className="text-center">
          <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
            <Counter to={2} start={start} /> : <Counter to={1} start={start} />
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/45">
            full time · demo
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-display text-base font-semibold text-white">River United</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">away</div>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--accent))]/15 font-display font-semibold text-[hsl(var(--accent))]">
            B
          </span>
        </div>
      </div>
      {/* Possession */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/55">
          <span>Possession</span>
          <span className="font-mono text-white/65">58% · 42%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-[hsl(var(--primary))]"
            style={{
              width: start ? "58%" : "4%",
              transition: "width 1100ms cubic-bezier(.22,1,.36,1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function InteractivePreview() {
  const [ref, inView] = useInViewOnce(0.25);
  return (
    <section
      id="preview"
      data-testid="interactive-preview-section"
      ref={ref}
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              Interactive preview
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A taste of what your match dashboard will look like.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              This is a simulated view — numbers, events and the heatmap are placeholders for the
              real PREDA output. Hover, switch tabs and feel the experience.
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white/65"
          >
            simulated demo · not live data
          </Badge>
        </div>

        <div className="hud-card mt-10 overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] opacity-50 preda-pulse" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                preda · match dashboard
              </span>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-widest text-white/45 sm:block">
              build 0.1.0 · demo
            </div>
          </div>
          <Tabs defaultValue="overview" className="w-full">
            <div className="px-4 pt-4 sm:px-6">
              <TabsList
                data-testid="interactive-preview-tabs"
                className="inline-grid h-10 w-full max-w-md grid-cols-3 rounded-xl border border-white/10 bg-white/5 p-1 text-white"
              >
                <TabsTrigger
                  value="overview"
                  className="rounded-lg text-xs data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--primary-foreground))]"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="rounded-lg text-xs data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--primary-foreground))]"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="players"
                  className="rounded-lg text-xs data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--primary-foreground))]"
                >
                  Players
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="p-4 sm:p-6">
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-7">
                    <ScoreStrip start={inView} />
                    <StatCounters start={inView} />
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                          Auto report · excerpt
                        </span>
                        <span className="font-mono text-[10px] text-white/45">~ 320 words</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">
                        Falcons FC controlled tempo through the first 30 minutes, completing
                        <span className="font-mono text-[hsl(var(--primary))]"> 64% </span>
                        of progressive passes. River United pressed higher after the break, but
                        <span className="text-[hsl(var(--accent))]"> #10 </span>
                        broke pressure with a sprint clocked at
                        <span className="font-mono text-[hsl(var(--primary))]"> 31.2 km/h </span>
                        leading to the second goal.
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <Heatmap start={inView} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="events" className="mt-0">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <EventTicker start={inView} />
                  </div>
                  <div className="lg:col-span-5">
                    <Heatmap start={inView} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="players" className="mt-0">
                <PlayersTable />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
