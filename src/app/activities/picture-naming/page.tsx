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

  const item = PICTURE_NAMING_ROUNDS[round];
  const done = round >= PICTURE_NAMING_ROUNDS.length;

  const label = useMemo(
    () => (!item ? "" : `Round ${round + 1} / ${PICTURE_NAMING_ROUNDS.length}`),
    [item, round],
  );

  function submitRound() {
    if (!item) return;
    const r = scoreUtterance(item.target, transcript);
    setLastPass(r.pass);
    if (!r.pass) {
      return;
    }
    setTranscript("");
    if (round + 1 >= PICTURE_NAMING_ROUNDS.length) {
      recordPracticeSession(2);
      setFinished(true);
    } else {
      setRound((x) => x + 1);
      setLastPass(null);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-medium text-[var(--accent)]">
          ← Home
        </Link>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>

      {!done && item && !finished && (
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-2xl font-semibold">Picture naming</h1>
          <div className="flex h-40 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-lg font-medium text-[var(--ink)]">
            {item.imageLabel}
          </div>
          <p className="text-xs text-slate-500">
            Placeholder card — swap with illustrations or Blob assets later.
          </p>
          {lastPass !== null && (
            <p className={lastPass ? "text-[var(--success)]" : "text-amber-600"}>
              {lastPass ? "Nice naming!" : "Good try — we’ll practice that one again soon."}
            </p>
          )}
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            What did you say?
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
          </label>
          <button
            type="button"
            disabled={!transcript.trim()}
            onClick={submitRound}
            className="w-full rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white disabled:opacity-40"
          >
            Check & next
          </button>
        </section>
      )}

      {finished && (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold">Session wrapped</h2>
          <p className="pt-2 text-slate-600">+2 ★ added to your jar.</p>
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
