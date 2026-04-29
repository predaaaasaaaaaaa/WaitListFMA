import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQS = [
  {
    q: "Is PREDA live today?",
    a: "Not yet — PREDA is in early access. Join the waitlist below to get product updates, demos, and a first look as soon as we open invites.",
  },
  {
    q: "What footage do I need to use it?",
    a: "Just match video. PREDA is being designed to work with the camera angles you already use — broadcast feeds, drones, single-camera setups and even academy phone footage.",
  },
  {
    q: "Does PREDA replace Opta or StatsBomb?",
    a: "PREDA is built for clubs and analysts who can’t pay enterprise prices but still need pro-grade insights. We aim for high reliability at a fraction of the cost — not to compete on the same enterprise contracts.",
  },
  {
    q: "How accurate is the tracking and event detection?",
    a: "We’re continuously improving accuracy. Tracking and team classification are already strong on standard broadcast footage; ball detection and rare event types are key focus areas for the next milestones.",
  },
  {
    q: "Can I export reports and share them with my staff?",
    a: "Yes — reports are a first-class feature. Exports will include shareable summaries, key clips and player-by-player breakdowns. Collaboration tooling is on the roadmap.",
  },
  {
    q: "Will it work for academies and youth matches?",
    a: "That’s a priority. We’re optimising for real-world footage quality — not perfect broadcast feeds — so academies and lower-tier clubs benefit first.",
  },
  {
    q: "Do I need a powerful machine to run it?",
    a: "Not for the upcoming hosted version. We’re also planning a local-first option for clubs that want to keep video on their own machines, optimised for consumer GPUs.",
  },
  {
    q: "Can I really ask questions in plain English?",
    a: "Yes — PREDA includes a plain-English Q&A interface (delivered through a Telegram bot today). Ask things like “Who ran the most in the second half?” and get the answer directly.",
  },
  {
    q: "How do I influence what gets built next?",
    a: "Share your workflow and pain points using the feedback survey below. Early users genuinely shape the V1 — it’s not a marketing line.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Questions analysts ask us first.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Don’t see your question? Drop it in the feedback survey — we read every answer.
          </p>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="hud-card rounded-2xl px-2 py-1"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full"
              data-testid="faq-accordion"
            >
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${i}`}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <AccordionTrigger
                    className="px-4 py-4 text-left text-base font-medium text-white hover:no-underline data-[state=open]:text-[hsl(var(--primary))] sm:px-5"
                    data-testid={`faq-trigger-${i}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-sm leading-relaxed text-white/70 sm:px-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
