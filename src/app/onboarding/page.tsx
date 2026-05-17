"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ZippyParrot } from "@/components/ZippyParrot";
import {
  type AgeBracket,
  type OnboardingProfile,
  saveOnboarding,
} from "@/lib/onboarding-storage";

const STEPS = ["Welcome", "Child", "Focus", "Consent"] as const;

const STEP_EMOJIS = ["👋", "🧒", "🎯", "✅"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [ageBracket, setAgeBracket] = useState<AgeBracket>("3-4");
  const [languagesAtHome, setLanguagesAtHome] = useState("English");
  const [therapyStatus, setTherapyStatus] =
    useState<OnboardingProfile["therapyStatus"]>("none");
  const [focusAreas, setFocusAreas] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);

  const progressLabel = useMemo(
    () => `${step + 1} of ${STEPS.length}`,
    [step],
  );

  const progressPct = Math.round(((step + 1) / STEPS.length) * 100);

  function finish() {
    const profile: OnboardingProfile = {
      completedAt: new Date().toISOString(),
      ageBracket,
      languagesAtHome: languagesAtHome.trim() || "English",
      therapyStatus,
      focusAreas: focusAreas.trim(),
      consentAccepted,
    };
    saveOnboarding(profile);
    router.push("/home");
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-[var(--accent)]">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg">{STEP_EMOJIS[step]}</span>
          <span className="text-xs font-bold text-slate-500">
            {STEPS[step]} — {progressLabel}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-fade-in-up">
          <div className="text-center space-y-3">
            <ZippyParrot size={100} variant="wave" className="animate-float mx-auto" />
            <h1 className="text-3xl font-black text-[var(--ink)]">Hi, grown-up!</h1>
            <p className="text-slate-600 leading-relaxed">
              I'm Zippy! I help kids practice their speech sounds in a fun, safe way.
              Let's set up a practice profile together — it only takes 2 minutes!
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--accent-soft)] p-4 text-sm text-slate-700 space-y-1">
            <p className="font-bold text-[var(--accent)]">🔒 Privacy first</p>
            <p>We never store your child's name, voice recordings, or personal details. Everything stays on this device.</p>
          </div>

          <button
            type="button"
            className="w-full rounded-3xl bg-[var(--accent)] py-5 text-xl font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            onClick={() => setStep(1)}
          >
            Let's go! 🚀
          </button>
        </section>
      )}

      {/* Step 1: Child info */}
      {step === 1 && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧒</span>
            <h2 className="text-2xl font-black text-[var(--ink)]">About your child</h2>
          </div>

          <label className="block space-y-2 text-sm font-bold text-slate-700">
            Child's age bracket
            <select
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4 text-base font-semibold focus:border-[var(--accent)] focus:outline-none"
              value={ageBracket}
              onChange={(e) => setAgeBracket(e.target.value as AgeBracket)}
            >
              <option value="2-3">🐣 2–3 years</option>
              <option value="3-4">🌱 3–4 years</option>
              <option value="4-5">🌟 4–5 years</option>
              <option value="5-7">🚀 5–7 years</option>
            </select>
          </label>

          <label className="block space-y-2 text-sm font-bold text-slate-700">
            Languages spoken at home
            <input
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-base focus:border-[var(--accent)] focus:outline-none"
              value={languagesAtHome}
              onChange={(e) => setLanguagesAtHome(e.target.value)}
              placeholder="e.g. English, Spanish"
            />
          </label>

          <label className="block space-y-2 text-sm font-bold text-slate-700">
            Current therapy status
            <select
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4 text-base font-semibold focus:border-[var(--accent)] focus:outline-none"
              value={therapyStatus}
              onChange={(e) =>
                setTherapyStatus(e.target.value as OnboardingProfile["therapyStatus"])
              }
            >
              <option value="none">Not in therapy right now</option>
              <option value="waitlist">On a waitlist</option>
              <option value="active">Active speech therapy</option>
              <option value="other">Something else</option>
            </select>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border-2 border-slate-200 py-3 font-bold text-slate-600 transition-transform hover:scale-105 active:scale-95"
              onClick={() => setStep(0)}
            >
              ← Back
            </button>
            <button
              type="button"
              className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              onClick={() => setStep(2)}
            >
              Next →
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Focus areas */}
      {step === 2 && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            <h2 className="text-2xl font-black text-[var(--ink)]">Practice goals</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            What sounds or goals feel most important right now? A few words is plenty —
            this helps Zippy know what to focus on!
          </p>
          <textarea
            className="min-h-28 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none"
            value={focusAreas}
            onChange={(e) => setFocusAreas(e.target.value)}
            placeholder="e.g. S blends, final K, more two-word phrases, R sounds..."
          />

          <div className="rounded-2xl bg-[var(--teal-soft)] p-3 text-xs text-[var(--teal)]">
            <p className="font-bold">💡 Tip</p>
            <p>Not sure? Just leave this blank — Zippy will help with common practice sounds!</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border-2 border-slate-200 py-3 font-bold text-slate-600 transition-transform hover:scale-105 active:scale-95"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
            <button
              type="button"
              className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              onClick={() => setStep(3)}
            >
              Next →
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Consent */}
      {step === 3 && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-4xl">✅</span>
            <h2 className="text-2xl font-black text-[var(--ink)]">One last step!</h2>
          </div>

          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              This app is a <strong>practice companion</strong>, not a medical tool or diagnosis device.
            </p>
            <p>
              Speech audio is <strong>never stored</strong>. Only scores you generate
              locally are kept on this device.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] p-5">
            <input
              type="checkbox"
              className="mt-1 size-5 accent-[var(--accent)]"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
            />
            <span className="text-sm font-semibold text-[var(--ink)] leading-relaxed">
              I am a parent or legal guardian. I understand this is not medical care,
              and I will supervise my child's practice time.
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border-2 border-slate-200 py-3 font-bold text-slate-600 transition-transform hover:scale-105 active:scale-95"
              onClick={() => setStep(2)}
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={!consentAccepted}
              className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
              onClick={finish}
            >
              Start practicing! 🎉
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
