"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  type AgeBracket,
  type OnboardingProfile,
  saveOnboarding,
} from "@/lib/onboarding-storage";

const STEPS = ["Welcome", "Child", "Focus", "Consent"] as const;

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
    () => `${STEPS[step]} — step ${step + 1} of ${STEPS.length}`,
    [step],
  );

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
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="text-sm font-medium text-[var(--accent)]">
          ← Back
        </Link>
        <span className="text-xs font-medium text-slate-500">{progressLabel}</span>
      </div>

      {step === 0 && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-2xl font-semibold text-[var(--ink)]">Welcome, grown-up</h1>
          <p className="text-slate-600">
            We’ll set up a gentle profile for practice time. This Phase 1 slice stores answers
            only on this device — no accounts yet.
          </p>
          <button
            type="button"
            className="w-full rounded-2xl bg-[var(--accent)] py-3 text-base font-semibold text-white"
            onClick={() => setStep(1)}
          >
            Continue
          </button>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold">About your child</h2>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Age bracket
            <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base"
              value={ageBracket}
              onChange={(e) => setAgeBracket(e.target.value as AgeBracket)}
            >
              <option value="2-3">2–3 years</option>
              <option value="3-4">3–4 years</option>
              <option value="4-5">4–5 years</option>
              <option value="5-7">5–7 years</option>
            </select>
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Languages at home
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
              value={languagesAtHome}
              onChange={(e) => setLanguagesAtHome(e.target.value)}
              placeholder="e.g. English, Spanish"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Therapy status
            <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base"
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
              className="flex-1 rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700"
              onClick={() => setStep(0)}
            >
              Back
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold">Focus areas</h2>
          <p className="text-sm text-slate-600">
            Which sounds or goals feel important right now? A few words is plenty.
          </p>
          <textarea
            className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
            value={focusAreas}
            onChange={(e) => setFocusAreas(e.target.value)}
            placeholder="e.g. S blends, final K, more two-word phrases"
          />
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white"
              onClick={() => setStep(3)}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold">Caregiver consent</h2>
          <p className="text-sm text-slate-600">
            This app is a practice companion, not a test or a diagnosis. Speech audio is not
            stored in this prototype; only scores you generate locally are kept on-device.
          </p>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-slate-300"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
            />
            <span>
              I am a parent or legal guardian. I understand this is not medical care and I
              will supervise practice time.
            </span>
          </label>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 rounded-2xl border border-slate-200 py-3 font-semibold text-slate-700"
              onClick={() => setStep(2)}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!consentAccepted}
              className="flex-1 rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              onClick={finish}
            >
              Save & continue
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
