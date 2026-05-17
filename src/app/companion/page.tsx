"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ZippyParrot } from "@/components/ZippyParrot";

type Message = { role: "user" | "buddy"; text: string };

const QUICK_PROMPTS = [
  "We practiced the S sound today! 🐍",
  "I said a new word! 🌟",
  "Tell me something fun to practice!",
  "I need help with my R sound 🦜",
  "Can we practice animals? 🐸",
];

export default function CompanionPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "buddy",
      text: "Hey there! I'm Zippy! 🦜 What sounds are we practicing today? Tell me all about it!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setError(null);

    const userMessage: Message = { role: "user", text: msg };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const apiMessages = [...messages, userMessage]
      .filter((m) => m.role !== "buddy" || messages.indexOf(m) > 0)
      .map((m) => ({ role: m.role === "buddy" ? "assistant" : "user", content: m.text }));

    try {
      const res = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        setError(typeof errJson?.error === "string" ? errJson.error : "Oops! Try again.");
        return;
      }
      const reply = await res.text();
      setMessages((prev) => [...prev, { role: "buddy", text: reply }]);
    } catch {
      setError("Network error — check your connection!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href="/home" className="text-sm font-semibold text-[var(--accent)]">
          ← Home
        </Link>
        <div className="flex items-center gap-2 ml-2">
          <ZippyParrot size={44} className="animate-float flex-shrink-0" />
          <div>
            <p className="font-bold text-[var(--ink)]">Zippy the Parrot</p>
            <p className="text-xs text-[var(--success)] font-semibold">● Online & ready!</p>
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto rounded-3xl bg-white shadow-md ring-1 ring-slate-100 p-4 space-y-3 min-h-64 max-h-96">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
          >
            {m.role === "buddy" && (
              <ZippyParrot size={36} className="flex-shrink-0 mt-1" />
            )}
            <div
              className={`rounded-3xl px-4 py-3 max-w-[80%] text-sm font-medium leading-relaxed ${
                m.role === "buddy"
                  ? "bg-[var(--accent-soft)] text-[var(--ink)] rounded-tl-sm"
                  : "bg-[var(--accent)] text-white rounded-tr-sm"
              }`}
            >
              {m.text}
            </div>
            {m.role === "user" && (
              <span className="text-2xl flex-shrink-0 mt-1">🧒</span>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-end animate-fade-in-up">
            <ZippyParrot size={36} className="flex-shrink-0" />
            <div className="rounded-3xl bg-[var(--accent-soft)] px-4 py-3 rounded-tl-sm">
              <span className="animate-wiggle inline-block text-[var(--ink)] font-medium">
                Zippy is thinking... 🤔
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700 text-center">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => send(p)}
            disabled={loading}
            className="flex-shrink-0 rounded-full border-2 border-[var(--accent-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--accent)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded-full border-2 border-slate-200 px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tell Zippy about practice... 💬"
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button
          type="button"
          disabled={!input.trim() || loading}
          onClick={() => send()}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-lg font-bold text-white disabled:opacity-40 transition-transform hover:scale-105 active:scale-95"
        >
          📤
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-slate-400">
        🔒 Safe conversation · No personal info stored
      </p>
    </main>
  );
}
