"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MINIMAL_PAIR_SETS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";

export default function MinimalPairsPage() {
  const [setIndex, setSetIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  const pair = MINIMAL_PAIR_SETS[setIndex];
  const done = setIndex >= MINIMAL_PAIR_SETS.length;

  const progress = useMemo(
    () => (!pair ? "" : `Pair ${setIndex + 1} / ${MINIMAL_PAIR_SETS.length}`),
    [pair, setIndex],
  );

  function pick(word: string) {
    if (!pair || complete) return;
    setChoice(word);
    const correct = word === pair.a;
    setFeedback(correct ? "Yes! Listening superpower!" : "Good listening — try the other one.");
    if (correct) {
      if (setIndex + 1 >= MINIMAL_PAIR_SETS.length) {
        recordPracticeSession(2);
        setComplete(true);
      } else {
        setTimeout(() => {
          setSetIndex((i) => i + 1);
          setChoice(null);
          setFeedback(null);
        }, 600);
      }
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-medium text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-medium text-slate-500">{progress}</span>
      </div>

      {!done && pair && !complete && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-2xl font-semibold">Minimal pairs</h1>
          <p className="text-slate-700">{pair.prompt}</p>
          <p className="text-xs text-slate-500">
            Prototype: tap the word you think matches the clue. Later: recorded audio prompts and
            adaptive pairs.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => pick(pair.a)}
              className={`rounded-2xl border px-4 py-6 text-lg font-semibold ${
                choice === pair.a ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-slate-200"
              }`}
            >
              {pair.a}
            </button>
            <button
              type="button"
              onClick={() => pick(pair.b)}
              className={`rounded-2xl border px-4 py-6 text-lg font-semibold ${
                choice === pair.b ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-slate-200"
              }`}
            >
              {pair.b}
            </button>
          </div>
          {feedback && <p className="text-sm text-slate-700">{feedback}</p>}
        </section>
      )}

      {complete && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold">Great listening!</h2>
          <p className="pt-2 text-slate-600">All pairs sorted. +2 ★</p>
          <Link
            href="/home"
            className="mt-4 block rounded-2xl bg-[var(--accent)] py-3 text-center font-semibold text-white"
          >
            Home
          </Link>
        </section>
      )}
    </main>
  );
}
