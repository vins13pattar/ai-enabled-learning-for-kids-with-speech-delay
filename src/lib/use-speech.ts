"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MicState = "idle" | "listening" | "error";

/** True when the browser exposes a SpeechRecognition implementation. */
export function isSpeechSupported(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as unknown as Record<string, unknown>;
  return "SpeechRecognition" in w || "webkitSpeechRecognition" in w;
}

/**
 * Speak text aloud via the browser TTS engine.
 * Safe to call on the server — returns immediately without throwing.
 */
export function speak(text: string, rate = 0.88, pitch = 1.1): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate;
  u.pitch = pitch;
  u.volume = 1;
  window.speechSynthesis.speak(u);
}

export function cancelSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

interface Options {
  lang?: string;
  onResult: (transcript: string) => void;
}

/**
 * Lightweight wrapper around the Web Speech API.
 * Falls back gracefully when unsupported (micState stays "idle", start() is a no-op).
 */
export function useSpeechRecognition({ lang = "en-US", onResult }: Options) {
  const [micState, setMicState] = useState<MicState>("idle");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  // Keep callback ref stable so callers don't need to memoize onResult
  const cbRef = useRef(onResult);
  useEffect(() => { cbRef.current = onResult; }, [onResult]);

  const supported = isSpeechSupported();

  const start = useCallback(() => {
    if (!supported || micState === "listening") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = lang;
    rec.maxAlternatives = 3;

    rec.onstart = () => setMicState("listening");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript.trim().toLowerCase();
      setMicState("idle");
      cbRef.current(text);
    };

    rec.onerror = () => {
      setMicState("error");
      setTimeout(() => setMicState("idle"), 1500);
    };

    rec.onend = () => setMicState((s) => (s === "listening" ? "idle" : s));

    recRef.current = rec;
    try {
      rec.start();
    } catch {
      setMicState("error");
    }
  }, [supported, micState, lang]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    setMicState("idle");
  }, []);

  useEffect(() => () => { recRef.current?.abort(); }, []);

  return { micState, start, stop, supported };
}
