"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ZippyParrot } from "@/components/ZippyParrot";
import { MINIMAL_PAIR_SETS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";

export default function MinimalPairsPage() {
  const [setIndex, setSetIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [complete, setComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const pair = MINIMAL_PAIR_SETS[setIndex];
  const done = setIndex >= MINIMAL_PAIR_SETS.length;

  const progress = useMemo(
    () => (!pair ? "" : `${setIndex + 1} / ${MINIMAL_PAIR_SETS.length}`),
    [pair, setIndex],
  );

  const progressPct = Math.round((setIndex / MINIMAL_PAIR_SETS.length) * 100);

  function pick(word: string) {
    if (!pair || complete || feedback !== null) return;
    setChoice(word);
    const correct = word === pair[pair.answer === "a" ? "a" : "b"]
      ? pair.answer === "a" ? word === pair.a : word === pair.b
      : false;

    const isCorrect = (pair.answer === "a" && word === pair.a) || (pair.answer === "b" && word === pair.b);
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setTimeout(() => {
        setChoice(null);
        setFeedback(null);
        if (setIndex + 1 >= MINIMAL_PAIR_SETS.length) {
          recordPracticeSession(3);
          setComplete(true);
        } else {
          setSetIndex((i) => i + 1);
        }
      }, 900);
    } else {
      setTimeout(() => {
        setChoice(null);
        setFeedback(null);
      }, 1200);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          {!done && !complete ? `Pair ${progress}` : complete ? "Done! 🎉" : ""}
        </span>
      </div>

      {!done && pair && !complete && (
        <>
          {/* Progress bar */}
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center gap-3">
              <ZippyParrot size={40} className="flex-shrink-0" />
              <p className="font-bold text-slate-700">Listen carefully! 👂</p>
            </div>

            {/* Prompt */}
            <div className="rounded-3xl bg-purple-50 border-2 border-purple-200 py-6 text-center">
              <p className="text-5xl mb-3">🤔</p>
              <p className="text-xl font-bold text-purple-700">{pair.prompt}</p>
            </div>

            {/* Choice buttons */}
            <div className="grid grid-cols-2 gap-4">
              {[pair.a, pair.b].map((word, idx) => {
                const emoji = idx === 0 ? pair.emojiA : pair.emojiB;
                const isChosen = choice === word;
                const isCorrectAnswer = (idx === 0 && pair.answer === "a") || (idx === 1 && pair.answer === "b");
                let btnClass = "rounded-3xl border-3 px-4 py-6 text-center transition-transform hover:scale-105 active:scale-95 border-2";

                if (feedback === null) {
                  btnClass += isChosen
                    ? " border-purple-500 bg-purple-100"
                    : " border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50";
                } else if (feedback === "correct" && isChosen) {
                  btnClass += " border-green-500 bg-green-50 animate-bounce-in";
                } else if (feedback === "wrong" && isChosen) {
                  btnClass += " border-red-400 bg-red-50";
                } else {
                  btnClass += " border-slate-200 bg-white opacity-60";
                }

                return (
                  <button
                    key={word}
                    type="button"
                    onClick={() => pick(word)}
                    className={btnClass}
                    disabled={feedback !== null}
                  >
                    <p className="text-5xl mb-2">{emoji}</p>
                    <p className="text-2xl font-black text-[var(--ink)]">{word}</p>
                  </button>
                );
              })}
            </div>

            {feedback === "correct" && (
              <div className="rounded-2xl bg-[var(--success-soft)] py-3 text-center animate-bounce-in">
                <p className="text-lg font-black text-[var(--success)]">
                  🌟 Perfect listening! You got it!
                </p>
              </div>
            )}

            {feedback === "wrong" && (
              <div className="rounded-2xl bg-red-50 border border-red-200 py-3 text-center animate-bounce-in">
                <p className="font-semibold text-red-600">
                  🤔 Not quite — try the other one!
                </p>
              </div>
            )}

            {feedback === null && (
              <p className="text-center text-xs text-slate-400">
                Tap the word that matches the clue!
              </p>
            )}
          </section>
        </>
      )}

      {complete && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-bounce-in text-center">
          <p className="text-6xl animate-celebrate inline-block">👂</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Super listener!</h2>
          <p className="text-lg font-semibold text-slate-600">
            You got {correctCount} out of {MINIMAL_PAIR_SETS.length} pairs right!
          </p>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 py-4">
            <p className="text-2xl font-black text-amber-500">+3 ⭐ Stars earned!</p>
          </div>
          <Link
            href="/home"
            className="block rounded-3xl bg-purple-600 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            🏠 Back to Home
          </Link>
        </section>
      )}
    </main>
  );
}
