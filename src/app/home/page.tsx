"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ACTIVITIES } from "@/lib/content";
import { loadOnboarding } from "@/lib/onboarding-storage";
import { loadRewards } from "@/lib/rewards";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [rewards, setRewards] = useState(loadRewards());
  const [profile, setProfile] = useState<ReturnType<typeof loadOnboarding>>(null);

  const greeting = useMemo(() => {
    if (!profile) return "Let’s set things up first.";
    return `Age ${profile.ageBracket.replace("-", "–")} • ${profile.languagesAtHome}`;
  }, [profile]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setRewards(loadRewards());
      setProfile(loadOnboarding());
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6 py-12">
        <p className="text-center text-slate-600">Loading…</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-4 px-6 py-12">
        <h1 className="text-2xl font-semibold">Finish onboarding</h1>
        <p className="text-slate-600">We need a saved caregiver profile on this device.</p>
        <Link
          href="/onboarding"
          className="rounded-2xl bg-[var(--accent)] py-3 text-center font-semibold text-white"
        >
          Go to onboarding
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <Link href="/" className="text-sm font-medium text-[var(--accent)]">
          ← Start
        </Link>
        <h1 className="text-3xl font-semibold text-[var(--ink)]">Home</h1>
        <p className="text-slate-600">{greeting}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
            <p className="text-xs uppercase tracking-wide text-slate-500">Stars</p>
            <p className="text-2xl font-semibold text-amber-500">{rewards.stars} ★</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
            <p className="text-xs uppercase tracking-wide text-slate-500">Streak</p>
            <p className="text-2xl font-semibold text-[var(--success)]">
              {rewards.streakDays} day{rewards.streakDays === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Today’s flow</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/assessment"
            className="rounded-2xl bg-[var(--accent-soft)] px-4 py-4 font-semibold text-[var(--ink)] ring-1 ring-blue-100"
          >
            10-word speech check-in
          </Link>
          <Link
            href="/companion"
            className="rounded-2xl bg-white px-4 py-4 font-semibold text-[var(--ink)] shadow-sm ring-1 ring-slate-100"
          >
            AI practice buddy
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Activities</h2>
        <div className="grid gap-4">
          {ACTIVITIES.map((a) => (
            <Link
              key={a.id}
              href={a.path}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {a.title}
              </p>
              <p className="pt-1 text-slate-600">{a.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
