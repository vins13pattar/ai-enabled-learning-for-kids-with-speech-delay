"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PICTURE_NAMING_ROUNDS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { scoreUtterance } from "@/lib/scoring";

export default function PictureNamingPage() {
  const [round, setRound] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [lastPass, setLastPass] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const item = PICTURE_NAMING_ROUNDS[round];
  const done = round >= PICTURE_NAMING_ROUNDS.length;

  const label = useMemo(
    () => (!item ? "" : `${round + 1} / ${PICTURE_NAMING_ROUNDS.length}`),
    [item, round],
  );

  const progressPct = Math.round((round / PICTURE_NAMING_ROUNDS.length) * 100);

  function submitRound() {
    if (!item) return;
    const r = scoreUtterance(item.target, transcript);
    setLastPass(r.pass);
    if (!r.pass) return;

    setScore((s) => s + 1);
    setTranscript("");

    setTimeout(() => {
      setLastPass(null);
      if (round + 1 >= PICTURE_NAMING_ROUNDS.length) {
        recordPracticeSession(3);
        setFinished(true);
      } else {
        setRound((x) => x + 1);
      }
    }, 800);
  }

  function skipRound() {
    if (!item) return;
    setLastPass(null);
    setTranscript("");
    if (round + 1 >= PICTURE_NAMING_ROUNDS.length) {
      recordPracticeSession(score > 0 ? 2 : 1);
      setFinished(true);
    } else {
      setRound((x) => x + 1);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          {!done && !finished ? `Picture ${label}` : finished ? "Done! 🎉" : ""}
        </span>
      </div>

      {!finished && item && (
        <>
          {/* Progress bar */}
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🦜</span>
              <p className="font-bold text-slate-700">What do you see? Say the word!</p>
            </div>

            {/* Big emoji picture */}
            <div className="rounded-3xl bg-[var(--accent-soft)] py-10 text-center">
              <p className="text-8xl animate-float">{item.emoji}</p>
              <p className="mt-3 text-sm font-medium text-slate-500">{item.imageLabel}</p>
            </div>

            {lastPass === true && (
              <div className="rounded-2xl bg-[var(--success-soft)] py-4 text-center animate-bounce-in">
                <p className="text-xl font-black text-[var(--success)]">🌟 You got it!</p>
              </div>
            )}

            {lastPass === false && (
              <div className="rounded-2xl bg-[var(--warning-soft)] py-3 text-center animate-bounce-in">
                <p className="font-semibold text-[var(--warning)]">
                  💪 Try again — you're almost there!
                </p>
              </div>
            )}

            {lastPass === null && (
              <>
                <label className="block space-y-2 text-sm font-semibold text-slate-700">
                  Type the word:
                  <input
                    className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-2xl font-bold text-center focus:border-[var(--accent)] focus:outline-none"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="???"
                    onKeyDown={(e) => e.key === "Enter" && transcript.trim() && submitRound()}
                  />
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={skipRound}
                    className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-500 transition-transform hover:scale-105 active:scale-95"
                  >
                    Skip ⏭️
                  </button>
                  <button
                    type="button"
                    disabled={!transcript.trim()}
                    onClick={submitRound}
                    className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 text-base font-bold text-white disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
                  >
                    Check it! ✅
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}

      {finished && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-bounce-in text-center">
          <p className="text-6xl animate-celebrate inline-block">🎉</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Amazing work!</h2>
          <p className="text-lg font-semibold text-slate-600">
            You named {score} out of {PICTURE_NAMING_ROUNDS.length} pictures!
          </p>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 py-4">
            <p className="text-2xl font-black text-amber-500">+3 ⭐ Stars earned!</p>
          </div>
          <Link
            href="/home"
            className="block rounded-3xl bg-[var(--accent)] py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            🏠 Back to Home
          </Link>
        </section>
      )}
    </main>
  );
}
