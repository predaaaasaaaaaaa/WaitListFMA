import React from "react";
import { Activity, Github } from "lucide-react";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Preview", href: "#preview" },
  { label: "Agents", href: "#agents" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Feedback", href: "#feedback" },
];

export default function Footer() {
  const handleAnchor = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/10 bg-[#070A0E]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,255,107,0.4), transparent)",
        }}
        aria-hidden
      />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a
            href="#top"
            onClick={(e) => handleAnchor(e, "#top")}
            className="flex items-center gap-2 font-display text-base font-semibold tracking-wide text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Activity className="h-4 w-4 text-[hsl(var(--primary))]" />
            </span>
            PREDA
          </a>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
            AI match intelligence for clubs and academies. Pro-grade insights, plain-English
            answers, accessible pricing.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              MIT · open source
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              Product
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleAnchor(e, l.href)}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              For who
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Clubs &amp; academies</li>
              <li>Performance analysts</li>
              <li>Coaches &amp; scouts</li>
              <li>Independent creators</li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              Status
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] preda-pulse" />
                Early access · v0.1
              </li>
              <li>Hosted V1 · in build</li>
              <li>Real-time mode · V2</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-[11px] text-white/45 sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} PREDA. All rights reserved.</span>
          <span className="font-mono uppercase tracking-widest">
            built for football · made with intent
          </span>
        </div>
      </div>
    </footer>
  );
}
