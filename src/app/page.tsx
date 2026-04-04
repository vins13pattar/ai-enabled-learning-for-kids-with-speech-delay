"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadOnboarding } from "@/lib/onboarding-storage";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHasProfile(loadOnboarding() !== null);
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-6 px-6 py-12">
        <p className="text-center text-slate-600">Loading…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-8 px-6 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm font-medium text-[var(--accent)]">Phase 1 slice</p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)]">
          Speech practice, made playful
        </h1>
        <p className="text-slate-600">
          Short onboarding, a ten-word check-in, three practice shells, and a safe AI buddy
          stub — built for caregivers and kids ages 2–7.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {!hasProfile ? (
          <Link
            href="/onboarding"
            className="rounded-2xl bg-[var(--accent)] px-5 py-4 text-center text-lg font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Start parent onboarding
          </Link>
        ) : (
          <Link
            href="/home"
            className="rounded-2xl bg-[var(--accent)] px-5 py-4 text-center text-lg font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Go to home
          </Link>
        )}
        <Link
          href="/onboarding"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-700 shadow-sm"
        >
          {hasProfile ? "Review onboarding answers" : "Skip to preview onboarding"}
        </Link>
      </div>

      <p className="text-center text-xs text-slate-500">
        Not a medical device. For professional advice, talk with a qualified clinician.
      </p>
    </main>
  );
}
