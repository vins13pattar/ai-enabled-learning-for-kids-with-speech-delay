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
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-6 px-6 py-12">
        <span className="animate-float text-6xl">🦜</span>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-8 px-6 py-12">
      <header className="space-y-4 text-center animate-fade-in-up">
        <div className="flex justify-center">
          <span className="text-8xl animate-float" role="img" aria-label="Zippy the parrot">
            🦜
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--ink)]">
            Speech Practice Buddy
          </h1>
          <p className="mt-1 text-lg font-semibold text-[var(--accent)]">
            with Zippy the Parrot!
          </p>
        </div>
        <p className="text-slate-600 text-base leading-relaxed">
          Fun daily practice for kids ages 2–7 working on their speech sounds.
          Guided by a grown-up, loved by kids! 🌟
        </p>
      </header>

      <div className="flex flex-col gap-3 animate-fade-in-up">
        {!hasProfile ? (
          <Link
            href="/onboarding"
            className="rounded-3xl bg-[var(--accent)] px-5 py-5 text-center text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            👋 Start Setup (Grown-ups first!)
          </Link>
        ) : (
          <Link
            href="/home"
            className="rounded-3xl bg-[var(--accent)] px-5 py-5 text-center text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            🎉 Let's Practice!
          </Link>
        )}
        <Link
          href="/onboarding"
          className="rounded-3xl border-2 border-slate-200 bg-white px-5 py-4 text-center text-base font-semibold text-slate-700 shadow-sm transition-transform hover:scale-105 active:scale-95"
        >
          {hasProfile ? "⚙️ Update settings" : "👀 Preview the app"}
        </Link>
      </div>

      <div className="rounded-3xl bg-[var(--accent-soft)] px-5 py-4 text-center animate-fade-in-up">
        <p className="text-sm font-semibold text-[var(--accent)]">🩺 For grown-ups</p>
        <p className="mt-1 text-xs text-slate-600">
          This is a practice companion, not a medical device. Always work with a
          qualified speech-language pathologist for clinical advice.
        </p>
      </div>
    </main>
  );
}
