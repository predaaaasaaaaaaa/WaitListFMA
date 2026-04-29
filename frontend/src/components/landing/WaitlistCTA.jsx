import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { joinWaitlist, getStats } from "@/lib/api";
import { logError } from "@/lib/log";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({ feedback_count: 0, waitlist_count: 0 });

  useEffect(() => {
    let cancelled = false;
    getStats()
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("That email doesn’t look quite right.");
      return;
    }
    try {
      setSubmitting(true);
      await joinWaitlist({ email: email.trim().toLowerCase(), source: "landing" });
      setDone(true);
      toast.success("You’re on the list. Welcome aboard.");
      const s = await getStats();
      setStats(s);
    } catch (err) {
      logError(err);
      toast.error("Couldn’t join the waitlist. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      data-testid="waitlist-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a1118] p-8 sm:p-12"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(700px circle at 12% 20%, rgba(124,255,107,0.16), transparent 55%), radial-gradient(700px circle at 90% 80%, rgba(76,201,255,0.14), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 tactical-grid opacity-30" aria-hidden />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                Early access
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                Be first to put PREDA on the pitch.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Join the waitlist for product updates, early demos, and your invite when we open
                the first cohort to clubs and academies.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <div className="font-mono text-2xl font-semibold text-white">
                    {stats.waitlist_count.toLocaleString()}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                    on the waitlist
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="font-mono text-2xl font-semibold text-white">
                    {stats.feedback_count.toLocaleString()}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                    early feedbacks
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              {!done ? (
                <form
                  onSubmit={submit}
                  className="hud-card relative rounded-2xl p-5"
                  data-testid="waitlist-form"
                >
                  <label
                    htmlFor="waitlist-email"
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55"
                  >
                    Your work email
                  </label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="waitlist-email"
                      data-testid="waitlist-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@club.com"
                      className="h-12 flex-1 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                    />
                    <Button
                      data-testid="waitlist-submit-button"
                      type="submit"
                      disabled={submitting}
                      className="group h-12 rounded-xl bg-[hsl(var(--primary))] px-5 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:brightness-110 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Joining…
                        </>
                      ) : (
                        <>
                          Join
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="mt-3 text-[11px] text-white/45">
                    We’ll only email you about PREDA — no spam, ever.
                  </p>
                </form>
              ) : (
                <div
                  className="hud-card flex items-center gap-4 rounded-2xl p-5"
                  data-testid="waitlist-success"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10">
                    <CheckCircle2 className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold text-white">
                      You’re on the list.
                    </div>
                    <div className="text-sm text-white/65">
                      We’ll reach out as soon as the first cohort opens.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
