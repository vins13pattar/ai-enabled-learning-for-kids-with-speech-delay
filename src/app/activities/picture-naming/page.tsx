"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PICTURE_NAMING_ROUNDS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";
import { logSession } from "@/lib/progress-storage";
import { scoreUtterance } from "@/lib/scoring";
import { playCorrect, playWrong, playStar, playCelebrate } from "@/lib/sounds";
import { speak, isSpeechSupported } from "@/lib/use-speech";
import { ZippyParrot } from "@/components/ZippyParrot";
import { MicButton } from "@/components/MicButton";
import { WordIllustration } from "@/components/WordIllustration";

type WordResult = { word: string; phoneme: string; pass: boolean; score: number };

export default function PictureNamingPage() {
  const [round, setRound] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [lastPass, setLastPass] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [wordResults, setWordResults] = useState<WordResult[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);

  const item = PICTURE_NAMING_ROUNDS[round];
  const done = round >= PICTURE_NAMING_ROUNDS.length;

  const label = useMemo(
    () => (!item ? "" : `${round + 1} / ${PICTURE_NAMING_ROUNDS.length}`),
    [item, round],
  );
  const progressPct = Math.round((round / PICTURE_NAMING_ROUNDS.length) * 100);

  useEffect(() => { setSpeechSupported(isSpeechSupported()); }, []);

  // Speak prompt when new image appears
  useEffect(() => {
    if (item && speechSupported) {
      const t = setTimeout(() => speak("What is this? Name the picture!"), 350);
      return () => clearTimeout(t);
    }
  }, [round, item, speechSupported]);

  function handleTranscript(text: string) {
    if (!item || lastPass !== null) return;
    const r = scoreUtterance(item.target, text);
    const result: WordResult = { word: item.target, phoneme: item.phoneme, pass: r.pass, score: r.score };

    if (r.pass) {
      setLastPass(true);
      setScore((s) => s + 1);
      setWordResults((prev) => [...prev, result]);
      playCorrect();
      speak("You got it! Awesome!");
      setTranscript("");
      setTimeout(() => {
        setLastPass(null);
        if (round + 1 >= PICTURE_NAMING_ROUNDS.length) {
          finish([...wordResults, result]);
        } else {
          setRound((x) => x + 1);
        }
      }, 900);
    } else {
      setLastPass(false);
      playWrong();
      speak("Good try! Try saying it again.");
      setTimeout(() => setLastPass(null), 1500);
    }
  }

  function submitTyped() {
    if (!transcript.trim()) return;
    handleTranscript(transcript);
  }

  function skipRound() {
    if (!item) return;
    const result: WordResult = { word: item.target, phoneme: item.phoneme, pass: false, score: 0 };
    setWordResults((prev) => [...prev, result]);
    setLastPass(null);
    setTranscript("");
    if (round + 1 >= PICTURE_NAMING_ROUNDS.length) {
      finish([...wordResults, result]);
    } else {
      setRound((x) => x + 1);
    }
  }

  function finish(results: WordResult[]) {
    const starsEarned = score >= 6 ? 3 : score >= 3 ? 2 : 1;
    recordPracticeSession(starsEarned);
    logSession({ activityId: "picture-naming", results, starsEarned });
    playStar();
    setTimeout(playCelebrate, 400);
    setFinished(true);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-bold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          {!finished ? `Picture ${label}` : "Done! 🎉"}
        </span>
      </div>

      {!finished && item && (
        <>
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <ZippyParrot size={40} className="flex-shrink-0" />
              <p className="font-bold text-slate-700">What do you see? Say the word!</p>
            </div>

            <div className="rounded-3xl bg-[var(--accent-soft)] py-6 text-center flex flex-col items-center gap-2">
              <WordIllustration
                word={item.target}
                size={160}
                className="animate-float drop-shadow-md"
              />
              <p className="text-sm font-medium text-slate-500 italic">{item.imageLabel}</p>
            </div>

            {lastPass === true && (
              <div className="rounded-2xl bg-[var(--success-soft)] py-4 text-center animate-bounce-in">
                <p className="text-xl font-black text-[var(--success)]">🌟 You got it!</p>
              </div>
            )}
            {lastPass === false && (
              <div className="rounded-2xl bg-[var(--warning-soft)] py-3 text-center animate-bounce-in">
                <p className="font-bold text-[var(--warning)]">💪 Good try — say it again!</p>
              </div>
            )}

            {lastPass === null && (
              speechSupported ? (
                <div className="flex flex-col items-center gap-4">
                  <MicButton onResult={handleTranscript} />
                  <button
                    type="button"
                    onClick={skipRound}
                    className="text-sm font-semibold text-slate-400 underline"
                  >
                    Skip ⏭️
                  </button>
                </div>
              ) : (
                <>
                  <label className="block space-y-2 text-sm font-bold text-slate-700">
                    Type the word:
                    <input
                      className="w-full rounded-2xl border-2 border-slate-200 px-4 py-4 text-2xl font-black text-center focus:border-[var(--accent)] focus:outline-none"
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="???"
                      onKeyDown={(e) => e.key === "Enter" && submitTyped()}
                    />
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={skipRound}
                      className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-500"
                    >
                      Skip ⏭️
                    </button>
                    <button
                      type="button"
                      disabled={!transcript.trim()}
                      onClick={submitTyped}
                      className="flex-[2] rounded-2xl bg-[var(--accent)] py-3 text-base font-bold text-white disabled:opacity-40"
                    >
                      Check it! ✅
                    </button>
                  </div>
                </>
              )
            )}
          </section>
        </>
      )}

      {finished && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-bounce-in text-center">
          <ZippyParrot size={80} variant="celebrate" className="mx-auto animate-celebrate" />
          <h2 className="text-3xl font-black text-[var(--ink)]">Amazing work!</h2>
          <p className="text-lg font-bold text-slate-600">
            You named {score} out of {PICTURE_NAMING_ROUNDS.length} pictures!
          </p>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 py-4">
            <p className="text-2xl font-black text-amber-500">+{score >= 6 ? 3 : 2} ⭐ Stars earned!</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/progress"
              className="block rounded-3xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] py-3 text-center text-sm font-bold text-[var(--accent)]"
            >
              📊 See progress
            </Link>
            <Link
              href="/home"
              className="block rounded-3xl bg-[var(--accent)] py-3 text-center text-base font-bold text-white shadow-lg"
            >
              🏠 Home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
