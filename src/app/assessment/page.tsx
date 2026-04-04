"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ASSESSMENT_WORDS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { aggregateAssessmentScores, scoreUtterance, type ScoringResult } from "@/lib/scoring";

export default function AssessmentPage() {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState<ScoringResult[]>([]);
  const [savedRewards, setSavedRewards] = useState(false);
  const [totalStarsAfterSave, setTotalStarsAfterSave] = useState<number | null>(null);

  const current = ASSESSMENT_WORDS[index];
  const done = index >= ASSESSMENT_WORDS.length;

  const summary = useMemo(() => aggregateAssessmentScores(results), [results]);

  function submitWord() {
    if (!current) return;
    const r = scoreUtterance(current.word, transcript);
    setResults((prev) => [...prev, r]);
    setTranscript("");
    setIndex((i) => i + 1);
  }

  function finalizeRewards() {
    if (savedRewards) return;
    const stars = Math.min(
      5,
      Math.max(1, summary.passedCount >= 8 ? 5 : summary.passedCount >= 5 ? 3 : 1),
    );
    const next = recordPracticeSession(stars);
    setSavedRewards(true);
    setTotalStarsAfterSave(next.stars);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-medium text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-medium text-slate-500">
          {!done ? `Word ${index + 1} / ${ASSESSMENT_WORDS.length}` : "Complete"}
        </span>
      </div>

      {!done && current && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-2xl font-semibold">Say the word</h1>
          <p className="text-5xl font-bold text-[var(--ink)]">{current.word}</p>
          <p className="text-sm text-slate-600">{current.hint}</p>
          <p className="text-xs text-slate-500">
            Prototype: type what was said. Real child-speech ASR replaces this in a later
            milestone — audio is not stored.
          </p>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Transcript
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Type the child’s attempt"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white disabled:opacity-40"
            disabled={!transcript.trim()}
            onClick={submitWord}
          >
            Score & next
          </button>
        </section>
      )}

      {done && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-semibold">Check-in complete</h2>
          <p className="text-slate-600">
            Passed {summary.passedCount} of {ASSESSMENT_WORDS.length} • Average match{" "}
            {summary.average.toFixed(2)}
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            {ASSESSMENT_WORDS.map((w, i) => {
              const r = results[i];
              if (!r) return null;
              return (
                <li key={w.id} className="flex justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                  <span className="font-medium">{w.word}</span>
                  <span className={r.pass ? "text-[var(--success)]" : "text-amber-600"}>
                    {r.pass ? "Nice!" : "Try again later"}
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="w-full rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white"
            onClick={finalizeRewards}
            disabled={savedRewards}
          >
            {savedRewards ? "Stars saved" : "Save stars & streak"}
          </button>
          {totalStarsAfterSave !== null && (
            <p className="text-center text-sm text-slate-600">
              You now have {totalStarsAfterSave} ★ total.
            </p>
          )}
          <Link
            href="/home"
            className="block rounded-2xl border border-slate-200 py-3 text-center font-semibold text-slate-700"
          >
            Back to home
          </Link>
        </section>
      )}
    </main>
  );
}
