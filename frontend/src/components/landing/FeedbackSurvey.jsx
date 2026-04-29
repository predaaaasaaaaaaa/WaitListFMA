import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle2,
  SkipForward,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { submitFeedback } from "@/lib/api";

const QUESTIONS = [
  {
    key: "role",
    label: "What is your current role in soccer analytics?",
    placeholder: "E.g. Performance analyst at a Ligue 2 club / Coach at an academy / Scout / Solo content creator…",
    type: "input",
  },
  {
    key: "workflow",
    label: "Describe your current workflow.",
    placeholder: "How does a match-week look for you? Tools you use, where you spend time…",
    type: "textarea",
  },
  {
    key: "time_sink",
    label: "What takes you the most time in your work?",
    placeholder: "Tagging events, syncing video, building reports, sharing with staff…",
    type: "textarea",
  },
  {
    key: "pain_point",
    label: "How would you describe your principal pain point?",
    placeholder: "What’s the one thing that, if solved, would change your week?",
    type: "textarea",
  },
  {
    key: "favorite_feature",
    label: "What feature got your interest the most in PREDA?",
    placeholder: "Auto reports, plain-English Q&A, Telegram bot, physical stats, event detection…",
    type: "textarea",
  },
  {
    key: "workflow_change",
    label: "How would PREDA change your current workflow?",
    placeholder: "Best-case scenario — what would you stop doing manually?",
    type: "textarea",
  },
];

export default function FeedbackSurvey() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(() =>
    QUESTIONS.reduce((acc, q) => ({ ...acc, [q.key]: "" }), { email: "" })
  );
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isLast = step === QUESTIONS.length - 1;
  const progress = useMemo(
    () => ((step + 1) / QUESTIONS.length) * 100,
    [step]
  );
  const current = QUESTIONS[step];

  const update = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  const next = () => {
    if (!isLast) setStep((s) => s + 1);
  };
  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };
  const skip = () => {
    if (!isLast) setStep((s) => s + 1);
  };

  const submit = async () => {
    const hasAny = Object.entries(values).some(
      ([, val]) => (val || "").trim().length > 0
    );
    if (!hasAny) {
      toast.error("Add at least one answer or your email so we can follow up.");
      return;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      toast.error("That email doesn’t look quite right.");
      return;
    }
    try {
      setSubmitting(true);
      await submitFeedback({
        ...values,
        email: values.email || null,
        source: "landing",
      });
      setDone(true);
      toast.success("Thanks — your feedback shapes what we build next.");
    } catch (err) {
      console.error(err);
      toast.error("Couldn’t send your feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="feedback"
      data-testid="feedback-survey-section"
      className="relative border-t border-white/5 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            Analyst feedback
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl text-balance">
            Tell us how you work.{" "}
            <span className="text-white/60">We’ll build accordingly.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Six short, optional questions. Skip anything you want — even one answer helps PREDA
            ship the right features for clubs and academies.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/65">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              Takes ~ 2 minutes
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              All questions are optional
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              Email is only used for follow-up
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="hud-card hud-corner overflow-hidden rounded-2xl"
          >
            {!done ? (
              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                      Question
                    </span>
                    <span className="font-mono text-sm text-white">
                      {String(step + 1).padStart(2, "0")}
                      <span className="text-white/40">
                        /{String(QUESTIONS.length).padStart(2, "0")}
                      </span>
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                    optional
                  </span>
                </div>

                <Progress
                  value={progress}
                  className="mt-4 h-1 overflow-hidden bg-white/10 [&>div]:bg-[hsl(var(--primary))]"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-7"
                  >
                    <label
                      htmlFor={`q-${current.key}`}
                      className="block font-display text-lg font-semibold leading-snug text-white sm:text-xl"
                    >
                      {current.label}
                    </label>
                    <div className="mt-4">
                      {current.type === "input" ? (
                        <Input
                          id={`q-${current.key}`}
                          data-testid={`feedback-input-${current.key}`}
                          placeholder={current.placeholder}
                          value={values[current.key]}
                          onChange={(e) => update(current.key, e.target.value)}
                          className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                        />
                      ) : (
                        <Textarea
                          id={`q-${current.key}`}
                          data-testid={`feedback-input-${current.key}`}
                          placeholder={current.placeholder}
                          value={values[current.key]}
                          onChange={(e) => update(current.key, e.target.value)}
                          className="min-h-[120px] rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                        />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {isLast && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <label
                      htmlFor="q-email"
                      className="block text-[11px] font-medium uppercase tracking-[0.18em] text-white/55"
                    >
                      Email (optional, for follow-up)
                    </label>
                    <Input
                      id="q-email"
                      data-testid="feedback-input-email"
                      type="email"
                      placeholder="you@club.com"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="mt-2 h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                    />
                  </motion.div>
                )}

                <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      data-testid="feedback-survey-back-button"
                      type="button"
                      variant="ghost"
                      onClick={back}
                      disabled={step === 0}
                      className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white hover:bg-white/10 disabled:opacity-40"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    {!isLast && (
                      <Button
                        data-testid="feedback-survey-skip-button"
                        type="button"
                        variant="ghost"
                        onClick={skip}
                        className="h-11 rounded-xl px-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                      >
                        <SkipForward className="mr-2 h-4 w-4" />
                        Skip
                      </Button>
                    )}
                  </div>
                  {!isLast ? (
                    <Button
                      data-testid="feedback-survey-next-button"
                      type="button"
                      onClick={next}
                      className="h-11 rounded-xl bg-[hsl(var(--primary))] px-5 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:brightness-110"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      data-testid="feedback-survey-submit-button"
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      className="h-11 rounded-xl bg-[hsl(var(--primary))] px-5 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:brightness-110 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send feedback
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center"
                data-testid="feedback-success"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10">
                  <CheckCircle2 className="h-7 w-7 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  Thanks — every word helps.
                </h3>
                <p className="max-w-md text-sm text-white/65">
                  We read every submission. If you left an email, we’ll reach out as soon as
                  PREDA opens its first invite cohort.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDone(false);
                    setStep(0);
                    setValues({
                      role: "",
                      workflow: "",
                      time_sink: "",
                      pain_point: "",
                      favorite_feature: "",
                      workflow_change: "",
                      email: "",
                    });
                  }}
                  className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white/80 hover:bg-white/10"
                >
                  Send another response
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
