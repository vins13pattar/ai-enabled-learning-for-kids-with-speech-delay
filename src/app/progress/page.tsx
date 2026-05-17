"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPhonemeStats, getActiveDates, loadSessions, type PhonemeStats } from "@/lib/progress-storage";
import { loadRewards } from "@/lib/rewards";
import { ZippyParrot } from "@/components/ZippyParrot";

function AccuracyBar({ stats }: { stats: PhonemeStats }) {
  const pct = stats.accuracy;
  const color =
    pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-400" : "bg-orange-500";
  const badge =
    pct >= 80 ? "🌟 Mastered!" : pct >= 50 ? "📈 Getting there" : "💪 Needs practice";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-slate-700">{stats.label}</span>
        <span className="text-xs text-slate-500">
          {stats.passes}/{stats.attempts} correct
        </span>
      </div>
      <div className="h-5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{badge}</span>
        <span className={`text-xs font-black ${pct >= 80 ? "text-green-600" : pct >= 50 ? "text-amber-600" : "text-orange-600"}`}>
          {pct}%
        </span>
      </div>
    </div>
  );
}

function CalendarDots({ activeDates }: { activeDates: string[] }) {
  const activeSet = new Set(activeDates);
  const today = new Date();
  const days: { date: string; label: string }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1);
    days.push({ date: iso, label });
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-slate-700">Last 14 days</h3>
      <div className="flex gap-1.5 flex-wrap">
        {days.map(({ date, label }) => (
          <div key={date} className="flex flex-col items-center gap-1">
            <div
              className={`size-7 rounded-full flex items-center justify-center text-xs font-bold ${
                activeSet.has(date)
                  ? "bg-green-400 text-white shadow-sm"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {activeSet.has(date) ? "✓" : ""}
            </div>
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [ready, setReady] = useState(false);
  const [phonemeStats, setPhonemeStats] = useState<PhonemeStats[]>([]);
  const [activeDates, setActiveDates] = useState<string[]>([]);
  const [rewards, setRewards] = useState({ stars: 0, streakDays: 0 });
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setPhonemeStats(getPhonemeStats());
      setActiveDates(getActiveDates());
      setRewards(loadRewards());
      setSessionCount(loadSessions().length);
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const mastered = phonemeStats.filter((s) => s.accuracy >= 80);
  const needsWork = phonemeStats.filter((s) => s.accuracy < 60 && s.attempts >= 3);
  const inProgress = phonemeStats.filter(
    (s) => s.accuracy >= 60 && s.accuracy < 80,
  );

  if (!ready) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 py-12">
        <ZippyParrot size={72} className="animate-float" />
      </main>
    );
  }

  const hasData = phonemeStats.length > 0;

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <h1 className="text-xl font-black text-[var(--ink)]">Progress Report 📊</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up">
        <div className="rounded-3xl bg-amber-50 border-2 border-amber-200 p-3 text-center">
          <p className="text-2xl font-black text-amber-500">{rewards.stars}</p>
          <p className="text-xs font-bold text-amber-600">⭐ Stars</p>
        </div>
        <div className="rounded-3xl bg-green-50 border-2 border-green-200 p-3 text-center">
          <p className="text-2xl font-black text-green-600">{rewards.streakDays}</p>
          <p className="text-xs font-bold text-green-700">🔥 Day streak</p>
        </div>
        <div className="rounded-3xl bg-blue-50 border-2 border-blue-200 p-3 text-center">
          <p className="text-2xl font-black text-[var(--accent)]">{sessionCount}</p>
          <p className="text-xs font-bold text-[var(--accent)]">🎮 Sessions</p>
        </div>
      </div>

      {/* Activity calendar */}
      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 animate-fade-in-up">
        <CalendarDots activeDates={activeDates} />
      </div>

      {!hasData && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 text-center space-y-4 animate-bounce-in">
          <ZippyParrot size={80} variant="wave" className="mx-auto animate-float" />
          <h2 className="text-xl font-black text-[var(--ink)]">No practice yet!</h2>
          <p className="text-slate-600">
            Complete a speech check-in or activity and your progress will appear here.
          </p>
          <Link
            href="/assessment"
            className="block rounded-3xl bg-[var(--accent)] py-4 text-center text-base font-bold text-white shadow-lg"
          >
            Start 10-Word Check-in
          </Link>
        </section>
      )}

      {hasData && (
        <>
          {/* Mastered sounds */}
          {mastered.length > 0 && (
            <section className="rounded-3xl bg-green-50 border-2 border-green-200 p-5 space-y-4 animate-fade-in-up">
              <h2 className="text-base font-black text-green-700">🌟 Mastered sounds</h2>
              {mastered.map((s) => (
                <AccuracyBar key={s.phoneme} stats={s} />
              ))}
            </section>
          )}

          {/* In progress */}
          {inProgress.length > 0 && (
            <section className="rounded-3xl bg-amber-50 border-2 border-amber-200 p-5 space-y-4 animate-fade-in-up">
              <h2 className="text-base font-black text-amber-700">📈 Getting stronger</h2>
              {inProgress.map((s) => (
                <AccuracyBar key={s.phoneme} stats={s} />
              ))}
            </section>
          )}

          {/* Needs practice */}
          {needsWork.length > 0 && (
            <section className="rounded-3xl bg-orange-50 border-2 border-orange-200 p-5 space-y-4 animate-fade-in-up">
              <h2 className="text-base font-black text-orange-700">💪 Keep practicing</h2>
              {needsWork.map((s) => (
                <AccuracyBar key={s.phoneme} stats={s} />
              ))}
              <div className="rounded-2xl bg-orange-100 p-3 text-xs text-orange-800">
                <strong>Tip for grown-ups:</strong> Focus on one sound at a time.
                Short, frequent practice works better than long sessions.
              </div>
            </section>
          )}

          {/* Zippy encouragement */}
          <div className="rounded-3xl bg-[var(--accent-soft)] p-5 flex items-center gap-4 animate-fade-in-up">
            <ZippyParrot size={56} variant="celebrate" className="flex-shrink-0" />
            <p className="text-sm font-semibold text-[var(--ink)] leading-relaxed">
              Every practice session makes you stronger! Keep it up — Zippy is cheering for you! 🎉
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500 text-center">
            🔒 All data stays on this device. No audio is stored.
          </div>
        </>
      )}
    </main>
  );
}
