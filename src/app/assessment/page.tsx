"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ASSESSMENT_WORDS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { logSession } from "@/lib/progress-storage";
import { aggregateAssessmentScores, scoreUtterance, type ScoringResult } from "@/lib/scoring";
import { playCorrect, playStar, playWrong, playCelebrate } from "@/lib/sounds";
import { speak, useSpeechRecognition, isSpeechSupported } from "@/lib/use-speech";
import { ZippyParrot } from "@/components/ZippyParrot";
import { MicButton } from "@/components/MicButton";
import { WordIllustration } from "@/components/WordIllustration";

export default function AssessmentPage() {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState<ScoringResult[]>([]);
  const [savedRewards, setSavedRewards] = useState(false);
  const [totalStarsAfterSave, setTotalStarsAfterSave] = useState<number | null>(null);
  const [lastFeedback, setLastFeedback] = useState<"pass" | "try" | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  const current = ASSESSMENT_WORDS[index];
  const done = index >= ASSESSMENT_WORDS.length;
  const summary = useMemo(() => aggregateAssessmentScores(results), [results]);

  // Detect speech API availability after mount
  useEffect(() => { setSpeechSupported(isSpeechSupported()); }, []);

  // Speak the word whenever we advance to a new one
  useEffect(() => {
    if (current && speechSupported) {
      const timer = setTimeout(() => speak(`Say: ${current.word}`), 400);
      return () => clearTimeout(timer);
    }
  }, [current, speechSupported]);

  function handleTranscript(text: string) {
    if (!current || lastFeedback !== null) return;
    const r = scoreUtterance(current.word, text);
    setResults((prev) => [...prev, r]);
    setLastFeedback(r.pass ? "pass" : "try");

    if (r.pass) {
      playCorrect();
      speak("Great job!");
      setTimeout(() => {
        setLastFeedback(null);
        setTranscript("");
        setIndex((i) => i + 1);
      }, 800);
    } else {
      playWrong();
      speak("Good try! Give it another go.");
      setTimeout(() => {
        setLastFeedback(null);
        setTranscript("");
      }, 1500);
    }
  }

  function submitTyped() {
    if (!transcript.trim()) return;
    handleTranscript(transcript);
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

    // Log phoneme-level data for progress tracking
    logSession({
      activityId: "assessment",
      results: ASSESSMENT_WORDS.slice(0, results.length).map((w, i) => ({
        word: w.word,
        phoneme: w.phoneme,
        pass: results[i]?.pass ?? false,
        score: results[i]?.score ?? 0,
      })),
      starsEarned: stars,
    });

    setSavedRewards(true);
    setTotalStarsAfterSave(next.stars);
    playStar();
    setTimeout(playCelebrate, 400);
    speak(`Amazing! You earned ${stars} stars!`);
  }

  const progressPct = Math.round((index / ASSESSMENT_WORDS.length) * 100);

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
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
            <ZippyParrot size={40} className="flex-shrink-0" />
            <p className="text-base font-bold text-slate-700">
              {speechSupported ? "Listen, then say this word!" : "Say this word!"}
            </p>
          </div>

          {/* Illustration + word */}
          <div className="rounded-3xl bg-[var(--accent-soft)] py-6 text-center flex flex-col items-center gap-2">
            <WordIllustration
              word={current.word}
              size={140}
              className="animate-float drop-shadow-sm"
            />
            <p className="text-5xl font-black text-[var(--ink)] tracking-wide mt-1">
              {current.word}
            </p>
            {speechSupported && (
              <button
                type="button"
                onClick={() => speak(`Say: ${current.word}`)}
                className="mt-1 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[var(--accent)] shadow-sm border border-[var(--accent-soft)]"
              >
                🔊 Hear it again
              </button>
            )}
          </div>

          <p className="text-center text-sm font-medium text-slate-500">{current.hint}</p>

          {/* Feedback overlay */}
          {lastFeedback === "pass" && (
            <div className="rounded-2xl bg-[var(--success-soft)] py-4 text-center animate-bounce-in">
              <p className="text-xl font-black text-[var(--success)]">🌟 Amazing! Great sound!</p>
            </div>
          )}
          {lastFeedback === "try" && (
            <div className="rounded-2xl bg-[var(--warning-soft)] py-3 text-center animate-bounce-in">
              <p className="text-base font-bold text-[var(--warning)]">
                🤔 Good try! Give it another go.
              </p>
            </div>
          )}

          {/* Input area */}
          {lastFeedback === null && (
            speechSupported ? (
              <div className="flex flex-col items-center gap-4">
                <MicButton onResult={handleTranscript} />
                <button
                  type="button"
                  onClick={skipWord}
                  className="text-sm font-semibold text-slate-400 underline"
                >
                  Skip this word ⏭️
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-center text-slate-400">
                  Type what the child said (speech recognition coming soon!)
                </p>
                <label className="block space-y-2 text-sm font-bold text-slate-700">
                  What did they say?
                  <input
                    className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-xl font-bold text-center focus:border-[var(--accent)] focus:outline-none"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder={current.word}
                    onKeyDown={(e) => e.key === "Enter" && submitTyped()}
                  />
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={skipWord}
                    className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-500"
                  >
                    Skip ⏭️
                  </button>
                  <button
                    type="button"
                    className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 text-base font-bold text-white disabled:opacity-40"
                    disabled={!transcript.trim()}
                    onClick={submitTyped}
                  >
                    Check it! ✅
                  </button>
                </div>
              </>
            )
          )}
        </section>
      )}

      {done && (
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 animate-bounce-in">
          <div className="text-center space-y-2">
            <ZippyParrot size={72} variant="celebrate" className="mx-auto animate-celebrate" />
            <h2 className="text-3xl font-black text-[var(--ink)]">Check-in complete!</h2>
            <p className="text-lg font-bold text-[var(--success)]">
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
                  <WordIllustration word={w.word} size={36} />
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
            <p className="text-center text-lg font-black text-amber-600 animate-bounce-in">
              ⭐ You now have {totalStarsAfterSave} stars total!
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/progress"
              className="block rounded-3xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] py-3 text-center text-sm font-bold text-[var(--accent)]"
            >
              📊 View progress
            </Link>
            <Link
              href="/home"
              className="block rounded-3xl border-2 border-slate-200 py-3 text-center text-sm font-bold text-slate-600"
            >
              🏠 Home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
