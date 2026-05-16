"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SOUND_SAFARI_TARGETS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { scoreUtterance } from "@/lib/scoring";

export default function SoundSafariPage() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState<"pass" | "try" | null>(null);
  const [foundCount, setFoundCount] = useState(0);

  const target = SOUND_SAFARI_TARGETS[index];
  const done = index >= SOUND_SAFARI_TARGETS.length;

  const progress = useMemo(
    () => (!target ? "" : `${index + 1} / ${SOUND_SAFARI_TARGETS.length}`),
    [index, target],
  );

  const progressPct = Math.round((index / SOUND_SAFARI_TARGETS.length) * 100);

  function submit() {
    if (!target) return;
    const r = scoreUtterance(target.word, guess);
    if (!r.pass) {
      setFeedback("try");
      setTimeout(() => setFeedback(null), 1500);
      return;
    }
    setFeedback("pass");
    setFoundCount((c) => c + 1);
    setGuess("");
    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= SOUND_SAFARI_TARGETS.length) {
        recordPracticeSession(3);
        setComplete(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 900);
  }

  function skip() {
    setFeedback(null);
    setGuess("");
    if (index + 1 >= SOUND_SAFARI_TARGETS.length) {
      recordPracticeSession(foundCount > 0 ? 2 : 1);
      setComplete(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          {!done && !complete ? `Safari stop ${progress}` : complete ? "Safari complete! 🎉" : ""}
        </span>
      </div>

      {!done && target && !complete && (
        <>
          {/* Progress bar */}
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">🦜</span>
              <p className="font-bold text-slate-700">Sound Safari — find it!</p>
            </div>

            {/* Target letter display */}
            <div className="rounded-3xl bg-orange-50 border-2 border-orange-200 py-8 text-center">
              <p className="text-2xl font-bold text-orange-600 mb-2">Find something starting with</p>
              <p className="text-8xl font-black text-orange-500 animate-float">{target.letter}</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-5xl animate-wiggle">{target.emoji}</span>
                <p className="text-sm font-medium text-slate-500 max-w-32">{target.clue}</p>
              </div>
            </div>

            {feedback === "pass" && (
              <div className="rounded-2xl bg-[var(--success-soft)] py-4 text-center animate-bounce-in">
                <p className="text-xl font-black text-[var(--success)]">
                  🔍 Found it! Amazing safari explorer! 🌟
                </p>
              </div>
            )}

            {feedback === "try" && (
              <div className="rounded-2xl bg-[var(--warning-soft)] py-3 text-center animate-bounce-in">
                <p className="font-semibold text-[var(--warning)]">
                  🤔 Hmm… does that start with {target.letter}? Try again!
                </p>
              </div>
            )}

            {feedback === null && (
              <>
                <label className="block space-y-2 text-sm font-semibold text-slate-700">
                  I found…
                  <input
                    className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-2xl font-bold text-center focus:border-orange-400 focus:outline-none"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder={`${target.letter}...`}
                    onKeyDown={(e) => e.key === "Enter" && guess.trim() && submit()}
                  />
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={skip}
                    className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-500 transition-transform hover:scale-105 active:scale-95"
                  >
                    Skip ⏭️
                  </button>
                  <button
                    type="button"
                    disabled={!guess.trim()}
                    onClick={submit}
                    className="flex-[2] rounded-2xl bg-orange-500 py-3 text-base font-bold text-white disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
                  >
                    Found it! 🔍
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}

      {complete && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-bounce-in text-center">
          <p className="text-6xl animate-celebrate inline-block">🦁</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Safari complete!</h2>
          <p className="text-lg font-semibold text-slate-600">
            You tracked {foundCount} out of {SOUND_SAFARI_TARGETS.length} sounds!
          </p>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 py-4">
            <p className="text-2xl font-black text-amber-500">+3 ⭐ Stars earned!</p>
          </div>
          <Link
            href="/home"
            className="block rounded-3xl bg-orange-500 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            🏠 Back to Home
          </Link>
        </section>
      )}
    </main>
  );
}
