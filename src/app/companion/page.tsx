"use client";

import Link from "next/link";
import { useState } from "react";

export default function CompanionPage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setReply("");
    try {
      const res = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: input.trim() }],
        }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        setError(typeof errJson?.error === "string" ? errJson.error : "Request failed");
        return;
      }
      const text = await res.text();
      setReply(text);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10">
      <Link href="/home" className="text-sm font-medium text-[var(--accent)]">
        ← Home
      </Link>
      <section className="space-y-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-2xl font-semibold">AI practice buddy</h1>
        <p className="text-sm text-slate-600">
          Short, safe encouragement about speech practice. Set OPENAI_API_KEY for live model
          replies; otherwise the API returns a static fallback line.
        </p>
        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Your message
          <textarea
            className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-3 text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. We practiced the S sound today!"
          />
        </label>
        <button
          type="button"
          disabled={!input.trim() || loading}
          onClick={send}
          className="w-full rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white disabled:opacity-40"
        >
          {loading ? "Thinking…" : "Send"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {reply && (
          <div className="rounded-2xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--ink)]">
            {reply}
          </div>
        )}
      </section>
    </main>
  );
}
