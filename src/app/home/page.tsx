"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ACTIVITIES } from "@/lib/content";
import { loadOnboarding } from "@/lib/onboarding-storage";
import { loadRewards } from "@/lib/rewards";

const GREETINGS = [
  "Ready to practice? Let's go!",
  "Zippy is so excited to see you!",
  "Time to practice your super sounds!",
  "You're a speech superstar — let's shine!",
  "Every practice makes you stronger!",
];

const ACTIVITY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "picture-naming": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  "sound-safari": { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  "minimal-pairs": { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  "sing-along": { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
};

export default function HomeScreen() {
  const [ready, setReady] = useState(false);
  const [rewards, setRewards] = useState(loadRewards());
  const [profile, setProfile] = useState<ReturnType<typeof loadOnboarding>>(null);
  const [greeting] = useState(() => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);

  const subtitle = useMemo(() => {
    if (!profile) return "Set up your profile first.";
    return `Age ${profile.ageBracket.replace("-", "–")} · ${profile.languagesAtHome}`;
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
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 py-12">
        <span className="animate-float text-6xl">🦜</span>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-4 px-6 py-12">
        <span className="text-5xl text-center">🦜</span>
        <h1 className="text-2xl font-bold text-center">Almost ready!</h1>
        <p className="text-slate-600 text-center">A grown-up needs to finish setup first.</p>
        <Link
          href="/onboarding"
          className="rounded-3xl bg-[var(--accent)] py-4 text-center text-lg font-bold text-white shadow-lg"
        >
          Go to setup
        </Link>
      </main>
    );
  }

  const streakFire = rewards.streakDays >= 3 ? "🔥" : rewards.streakDays >= 1 ? "⚡" : "💤";

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 py-8">
      {/* Header */}
      <header className="animate-fade-in-up">
        <Link href="/" className="text-sm font-medium text-[var(--accent)]">
          ← Back
        </Link>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-5xl animate-float" role="img" aria-label="Zippy">🦜</span>
          <div>
            <h1 className="text-2xl font-bold text-[var(--ink)]">{greeting}</h1>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
        <div className="rounded-3xl bg-amber-50 border-2 border-amber-200 px-4 py-4 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-600">⭐ Stars</p>
          <p className="text-4xl font-black text-amber-500 mt-1">{rewards.stars}</p>
        </div>
        <div className="rounded-3xl bg-green-50 border-2 border-green-200 px-4 py-4 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">
            {streakFire} Streak
          </p>
          <p className="text-4xl font-black text-green-600 mt-1">
            {rewards.streakDays}
            <span className="text-lg font-semibold"> day{rewards.streakDays === 1 ? "" : "s"}</span>
          </p>
        </div>
      </div>

      {/* Today's Flow */}
      <section className="space-y-3 animate-fade-in-up">
        <h2 className="text-xl font-bold text-[var(--ink)]">🌟 Today's check-in</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/assessment"
            className="rounded-3xl bg-[var(--accent)] px-5 py-5 font-bold text-white shadow-lg text-center text-lg transition-transform hover:scale-105 active:scale-95"
          >
            📝 10-Word Speech Check
          </Link>
          <Link
            href="/companion"
            className="rounded-3xl bg-white border-2 border-[var(--accent-soft)] px-5 py-5 font-bold text-[var(--accent)] text-center text-lg shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            🦜 Chat with Zippy
          </Link>
        </div>
      </section>

      {/* Activities */}
      <section className="space-y-3 animate-fade-in-up">
        <h2 className="text-xl font-bold text-[var(--ink)]">🎮 Fun Activities</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACTIVITIES.map((a) => {
            const colors = ACTIVITY_COLORS[a.id] ?? {
              bg: "bg-slate-50",
              border: "border-slate-200",
              text: "text-slate-700",
            };
            return (
              <Link
                key={a.id}
                href={a.path}
                className={`rounded-3xl ${colors.bg} border-2 ${colors.border} p-5 shadow-sm transition-transform hover:scale-105 active:scale-95`}
              >
                <p className="text-4xl mb-2">{a.emoji}</p>
                <p className={`text-base font-bold ${colors.text}`}>{a.title}</p>
                <p className="text-sm text-slate-600 mt-1">{a.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer link */}
      <div className="text-center pb-4">
        <Link href="/onboarding" className="text-sm text-slate-500 underline">
          ⚙️ Update profile settings
        </Link>
      </div>
    </main>
  );
}
