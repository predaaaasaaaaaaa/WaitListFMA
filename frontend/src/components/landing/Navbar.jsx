import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#preview", label: "Preview" },
  { href: "#agents", label: "Agents" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="navbar"
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "border-white/10 bg-black/55 backdrop-blur supports-[backdrop-filter]:bg-black/40"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#top"
          onClick={(e) => handleAnchorClick(e, "#top")}
          className="flex items-center gap-2 font-display text-base font-semibold tracking-wide text-white"
          data-testid="navbar-brand"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <Activity className="h-4 w-4 text-[hsl(var(--primary))]" />
          </span>
          <span>PREDA</span>
          <span className="ml-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/65">
            v0.1
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-sm text-white/70 transition-colors duration-150 hover:text-white"
              data-testid={`navbar-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            data-testid="navbar-waitlist-button"
            onClick={(e) => handleAnchorClick(e, "#waitlist")}
            className="h-10 rounded-xl bg-[hsl(var(--primary))] px-4 text-sm font-medium text-[hsl(var(--primary-foreground))] transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_0_0_3px_rgba(124,255,107,0.18)]"
          >
            Join the waitlist
          </Button>
        </div>

        <button
          data-testid="navbar-mobile-menu-button"
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="block rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/85"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                onClick={(e) => handleAnchorClick(e, "#waitlist")}
                className="mt-4 h-11 w-full rounded-xl bg-[hsl(var(--primary))] text-sm font-medium text-[hsl(var(--primary-foreground))] hover:brightness-110"
              >
                Join the waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
