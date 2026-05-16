"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ASSESSMENT_WORDS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { aggregateAssessmentScores, scoreUtterance, type ScoringResult } from "@/lib/scoring";

function ConfettiPop() {
  const pieces = ["🌟", "⭐", "✨", "🎉", "🎊"];
  return (
    <div className="pointer-events-none fixed inset-0 flex items-start justify-center overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute text-2xl animate-celebrate"
          style={{
            left: `${15 + i * 18}%`,
            top: "20%",
            animationDelay: `${i * 0.12}s`,
            animationDuration: "1s",
          }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default function AssessmentPage() {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState<ScoringResult[]>([]);
  const [savedRewards, setSavedRewards] = useState(false);
  const [totalStarsAfterSave, setTotalStarsAfterSave] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<"pass" | "try" | null>(null);

  const current = ASSESSMENT_WORDS[index];
  const done = index >= ASSESSMENT_WORDS.length;

  const summary = useMemo(() => aggregateAssessmentScores(results), [results]);

  function submitWord() {
    if (!current) return;
    const r = scoreUtterance(current.word, transcript);
    setResults((prev) => [...prev, r]);
    setLastFeedback(r.pass ? "pass" : "try");
    setTranscript("");

    if (r.pass) {
      setTimeout(() => {
        setLastFeedback(null);
        setIndex((i) => i + 1);
      }, 700);
    } else {
      setTimeout(() => setLastFeedback(null), 1500);
    }
  }

  function skipWord() {
    if (!current) return;
    setResults((prev) => [
      ...prev,
      { normalizedTarget: current.word, normalizedTranscript: "", score: 0, pass: false },
    ]);
    setLastFeedback(null);
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
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  }

  const progressPct = Math.round((index / ASSESSMENT_WORDS.length) * 100);

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      {showConfetti && <ConfettiPop />}

      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          {!done ? `Word ${index + 1} / ${ASSESSMENT_WORDS.length}` : "All done! 🎉"}
        </span>
      </div>

      {/* Progress bar */}
      {!done && (
        <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      {!done && current && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦜</span>
            <p className="text-base font-semibold text-slate-700">Say this word!</p>
          </div>

          {/* Big emoji + word display */}
          <div className="rounded-3xl bg-[var(--accent-soft)] py-8 text-center">
            <p className="text-7xl animate-float">{current.emoji}</p>
            <p className="mt-3 text-5xl font-black text-[var(--ink)] tracking-wide">
              {current.word}
            </p>
          </div>

          <p className="text-center text-sm font-medium text-slate-500">{current.hint}</p>

          {lastFeedback === "pass" && (
            <div className="rounded-2xl bg-[var(--success-soft)] py-3 text-center animate-bounce-in">
              <p className="text-lg font-bold text-[var(--success)]">
                🌟 Amazing! Great sound!
              </p>
            </div>
          )}
          {lastFeedback === "try" && (
            <div className="rounded-2xl bg-[var(--warning-soft)] py-3 text-center animate-bounce-in">
              <p className="text-base font-semibold text-[var(--warning)]">
                🤔 Good try! Give it another go.
              </p>
            </div>
          )}

          {lastFeedback === null && (
            <>
              <p className="text-xs text-center text-slate-400">
                Type what the child said (speech recognition coming soon!)
              </p>
              <label className="block space-y-2 text-sm font-semibold text-slate-700">
                What did they say?
                <input
                  className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-xl font-bold text-center focus:border-[var(--accent)] focus:outline-none"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder={current.word}
                  onKeyDown={(e) => e.key === "Enter" && transcript.trim() && submitWord()}
                />
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={skipWord}
                  className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-500 transition-transform hover:scale-105 active:scale-95"
                >
                  Skip ⏭️
                </button>
                <button
                  type="button"
                  className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 text-base font-bold text-white disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
                  disabled={!transcript.trim()}
                  onClick={submitWord}
                >
                  Check it! ✅
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {done && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-bounce-in">
          <div className="text-center space-y-2">
            <p className="text-6xl animate-celebrate inline-block">🎉</p>
            <h2 className="text-3xl font-black text-[var(--ink)]">Check-in complete!</h2>
            <p className="text-lg font-semibold text-[var(--success)]">
              ✅ {summary.passedCount} out of {ASSESSMENT_WORDS.length} words
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 space-y-2">
            {ASSESSMENT_WORDS.map((w, i) => {
              const r = results[i];
              if (!r) return null;
              return (
                <div
                  key={w.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
                >
                  <span className="text-2xl">{w.emoji}</span>
                  <span className="font-bold flex-1">{w.word}</span>
                  <span className={`text-base font-bold ${r.pass ? "text-[var(--success)]" : "text-amber-500"}`}>
                    {r.pass ? "🌟" : "💪"}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="w-full rounded-3xl bg-amber-400 py-4 text-xl font-black text-white shadow-lg disabled:opacity-60 transition-transform hover:scale-105 active:scale-95"
            onClick={finalizeRewards}
            disabled={savedRewards}
          >
            {savedRewards ? "⭐ Stars saved!" : "Collect your stars! ⭐"}
          </button>

          {totalStarsAfterSave !== null && (
            <p className="text-center text-lg font-bold text-amber-600 animate-bounce-in">
              ⭐ You now have {totalStarsAfterSave} stars total!
            </p>
          )}

          <Link
            href="/home"
            className="block rounded-3xl border-2 border-slate-200 py-3 text-center text-base font-bold text-slate-600 transition-transform hover:scale-105 active:scale-95"
          >
            🏠 Back to Home
          </Link>
        </section>
      )}
    </main>
  );
}
