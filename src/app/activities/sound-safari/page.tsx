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
  const [hint, setHint] = useState<string | null>(null);

  const target = SOUND_SAFARI_TARGETS[index];
  const done = index >= SOUND_SAFARI_TARGETS.length;

  const progress = useMemo(
    () => (!target ? "" : `Find ${index + 1} / ${SOUND_SAFARI_TARGETS.length}`),
    [index, target],
  );

  function submit() {
    if (!target) return;
    const r = scoreUtterance(target.word, guess);
    setHint(null);
    if (!r.pass) {
      setHint(`Try a word closer to “${target.word}”.`);
      return;
    }
    setGuess("");
    if (index + 1 >= SOUND_SAFARI_TARGETS.length) {
      recordPracticeSession(2);
      setComplete(true);
    } else {
      setIndex((i) => i + 1);
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

      {!done && target && !complete && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-2xl font-semibold">Sound safari</h1>
          <p className="text-lg text-slate-700">
            Find something that starts with{" "}
            <span className="font-bold text-[var(--accent)]">{target.letter}</span>
          </p>
          <p className="text-sm text-slate-500">
            Prototype: name your discovery below. Later: camera clues, audio cues, and offline
            packs.
          </p>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            I found…
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder={`Something starting with ${target.letter}`}
            />
          </label>
          <button
            type="button"
            disabled={!guess.trim()}
            onClick={submit}
            className="w-full rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white disabled:opacity-40"
          >
            Check word
          </button>
          {hint && <p className="text-sm text-amber-700">{hint}</p>}
        </section>
      )}

      {complete && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold">Safari complete</h2>
          <p className="pt-2 text-slate-600">You tracked every sound. +2 ★</p>
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
