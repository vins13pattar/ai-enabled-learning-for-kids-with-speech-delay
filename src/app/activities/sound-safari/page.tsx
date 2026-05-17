"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SOUND_SAFARI_TARGETS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { logSession } from "@/lib/progress-storage";
import { scoreUtterance } from "@/lib/scoring";
import { playCorrect, playWrong, playStar, playCelebrate } from "@/lib/sounds";
import { speak, isSpeechSupported } from "@/lib/use-speech";
import { ZippyParrot } from "@/components/ZippyParrot";
import { MicButton } from "@/components/MicButton";

type WordResult = { word: string; phoneme: string; pass: boolean; score: number };

export default function SoundSafariPage() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [complete, setComplete] = useState(false);
  const [feedback, setFeedback] = useState<"pass" | "try" | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const [wordResults, setWordResults] = useState<WordResult[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);

  const target = SOUND_SAFARI_TARGETS[index];
  const done = index >= SOUND_SAFARI_TARGETS.length;

  const progress = useMemo(
    () => (!target ? "" : `${index + 1} / ${SOUND_SAFARI_TARGETS.length}`),
    [index, target],
  );
  const progressPct = Math.round((index / SOUND_SAFARI_TARGETS.length) * 100);

  useEffect(() => { setSpeechSupported(isSpeechSupported()); }, []);

  useEffect(() => {
    if (target && speechSupported) {
      const t = setTimeout(
        () => speak(`Find something that starts with the ${target.letter} sound. ${target.clue}`),
        350,
      );
      return () => clearTimeout(t);
    }
  }, [index, target, speechSupported]);

  function handleResult(text: string) {
    if (!target || feedback !== null) return;
    const r = scoreUtterance(target.word, text);
    const result: WordResult = { word: target.word, phoneme: target.phoneme, pass: r.pass, score: r.score };

    if (r.pass) {
      setFeedback("pass");
      setFoundCount((c) => c + 1);
      setWordResults((prev) => [...prev, result]);
      playCorrect();
      speak(`Fantastic! You found ${target.word}!`);
      setGuess("");
      setTimeout(() => {
        setFeedback(null);
        if (index + 1 >= SOUND_SAFARI_TARGETS.length) {
          finish([...wordResults, result]);
        } else {
          setIndex((i) => i + 1);
        }
      }, 900);
    } else {
      setFeedback("try");
      playWrong();
      speak(`Hmm, try again. Find something starting with ${target.letter}.`);
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  function skip() {
    if (!target) return;
    const result: WordResult = { word: target.word, phoneme: target.phoneme, pass: false, score: 0 };
    setWordResults((prev) => [...prev, result]);
    setFeedback(null);
    setGuess("");
    if (index + 1 >= SOUND_SAFARI_TARGETS.length) {
      finish([...wordResults, result]);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function finish(results: WordResult[]) {
    const starsEarned = foundCount >= 4 ? 3 : foundCount >= 2 ? 2 : 1;
    recordPracticeSession(starsEarned);
    logSession({ activityId: "sound-safari", results, starsEarned });
    playStar();
    setTimeout(playCelebrate, 400);
    setComplete(true);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-bold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          {!done && !complete ? `Safari stop ${progress}` : "Safari complete! 🎉"}
        </span>
      </div>

      {!done && target && !complete && (
        <>
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-orange-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <ZippyParrot size={40} className="flex-shrink-0" />
              <p className="font-bold text-slate-700">Sound Safari — find it!</p>
            </div>

            <div className="rounded-3xl bg-orange-50 border-2 border-orange-200 py-8 text-center">
              <p className="text-2xl font-bold text-orange-600 mb-2">Find something starting with</p>
              <p className="text-8xl font-black text-orange-500 animate-float">{target.letter}</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="text-5xl animate-wiggle">{target.emoji}</span>
                <p className="text-sm font-medium text-slate-500 max-w-32">{target.clue}</p>
              </div>
              {speechSupported && (
                <button
                  type="button"
                  onClick={() => speak(`Find something that starts with the ${target.letter} sound. ${target.clue}`)}
                  className="mt-3 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-orange-600 shadow-sm border border-orange-200"
                >
                  🔊 Hear the clue again
                </button>
              )}
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
                <p className="font-bold text-[var(--warning)]">
                  🤔 Hmm… does that start with {target.letter}? Try again!
                </p>
              </div>
            )}

            {feedback === null && (
              speechSupported ? (
                <div className="flex flex-col items-center gap-4">
                  <MicButton onResult={handleResult} />
                  <button type="button" onClick={skip} className="text-sm font-semibold text-slate-400 underline">
                    Skip ⏭️
                  </button>
                </div>
              ) : (
                <>
                  <label className="block space-y-2 text-sm font-bold text-slate-700">
                    I found…
                    <input
                      className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-2xl font-black text-center focus:border-orange-400 focus:outline-none"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder={`${target.letter}...`}
                      onKeyDown={(e) => e.key === "Enter" && guess.trim() && handleResult(guess)}
                    />
                  </label>
                  <div className="flex gap-3">
                    <button type="button" onClick={skip}
                      className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-500">
                      Skip ⏭️
                    </button>
                    <button
                      type="button"
                      disabled={!guess.trim()}
                      onClick={() => handleResult(guess)}
                      className="flex-[2] rounded-2xl bg-orange-500 py-3 text-base font-bold text-white disabled:opacity-40"
                    >
                      Found it! 🔍
                    </button>
                  </div>
                </>
              )
            )}
          </section>
        </>
      )}

      {complete && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-bounce-in text-center">
          <ZippyParrot size={80} variant="celebrate" className="mx-auto animate-celebrate" />
          <h2 className="text-3xl font-black text-[var(--ink)]">Safari complete!</h2>
          <p className="text-lg font-bold text-slate-600">
            You tracked {foundCount} out of {SOUND_SAFARI_TARGETS.length} sounds!
          </p>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 py-4">
            <p className="text-2xl font-black text-amber-500">+3 ⭐ Stars earned!</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/progress"
              className="block rounded-3xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] py-3 text-center text-sm font-bold text-[var(--accent)]">
              📊 See progress
            </Link>
            <Link href="/home"
              className="block rounded-3xl bg-orange-500 py-3 text-center text-base font-bold text-white shadow-lg">
              🏠 Home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
