"use client";

import Link from "next/link";
import { useState } from "react";
import { SING_ALONG_SONGS } from "@/lib/content";
import { recordPracticeSession } from "@/lib/rewards";

export default function SingAlongPage() {
  const [songIndex, setSongIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [done, setDone] = useState(false);

  const song = SING_ALONG_SONGS[songIndex];

  function nextLine() {
    if (lineIndex + 1 < song.lines.length) {
      setLineIndex((l) => l + 1);
    } else {
      setCelebrating(true);
      setTimeout(() => {
        setCelebrating(false);
        if (songIndex + 1 < SING_ALONG_SONGS.length) {
          setSongIndex((s) => s + 1);
          setLineIndex(0);
        } else {
          recordPracticeSession(3);
          setDone(true);
        }
      }, 1500);
    }
  }

  const progressPct = Math.round(
    ((songIndex * song.lines.length + lineIndex) /
      (SING_ALONG_SONGS.length * song.lines.length)) *
      100,
  );

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-5 px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-bold text-slate-500">
          Song {songIndex + 1} of {SING_ALONG_SONGS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-pink-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {!done && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-fade-in-up">
          {/* Song header */}
          <div className="text-center space-y-2">
            <p className="text-6xl animate-wiggle inline-block">{song.emoji}</p>
            <h1 className="text-2xl font-black text-[var(--ink)]">{song.title}</h1>
            <div className="inline-block rounded-full bg-pink-100 border border-pink-300 px-3 py-1">
              <p className="text-xs font-bold text-pink-700">
                Practises the /{song.targetSound}/ sound
              </p>
            </div>
          </div>

          {/* Lyrics display */}
          <div className="rounded-3xl bg-pink-50 border-2 border-pink-200 p-5 space-y-3">
            {song.lines.map((line, i) => (
              <p
                key={i}
                className={`text-base font-semibold leading-relaxed transition-all duration-300 ${
                  i === lineIndex
                    ? "text-pink-700 text-xl font-black scale-105 inline-block"
                    : i < lineIndex
                    ? "text-slate-400 line-through"
                    : "text-slate-400"
                }`}
              >
                {i === lineIndex ? "🎵 " : ""}{line}
              </p>
            ))}
          </div>

          {celebrating ? (
            <div className="rounded-2xl bg-[var(--success-soft)] py-4 text-center animate-bounce-in">
              <p className="text-xl font-black text-[var(--success)]">
                🎉 Wonderful singing! 🎵
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 rounded-2xl bg-[var(--accent-soft)] p-4">
                <span className="text-2xl">🦜</span>
                <p className="text-sm font-semibold text-[var(--ink)]">
                  Sing the highlighted line out loud, then tap Next!
                </p>
              </div>

              <button
                type="button"
                onClick={nextLine}
                className="w-full rounded-3xl bg-pink-500 py-5 text-xl font-black text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {lineIndex < song.lines.length - 1 ? "Next line! 🎵" : "I sang it! 🌟"}
              </button>
            </>
          )}
        </section>
      )}

      {done && (
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 space-y-5 animate-bounce-in text-center">
          <p className="text-6xl animate-celebrate inline-block">🎤</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Superstar singer!</h2>
          <p className="text-lg font-semibold text-slate-600">
            You sang all {SING_ALONG_SONGS.length} songs!
          </p>
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 py-4">
            <p className="text-2xl font-black text-amber-500">+3 ⭐ Stars earned!</p>
          </div>
          <Link
            href="/home"
            className="block rounded-3xl bg-pink-500 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            🏠 Back to Home
          </Link>
        </section>
      )}
    </main>
  );
}
