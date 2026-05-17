"use client";

import { useSpeechRecognition, type MicState } from "@/lib/use-speech";

interface Props {
  onResult: (transcript: string) => void;
  disabled?: boolean;
}

const BG: Record<MicState, string> = {
  idle: "bg-[var(--accent)] shadow-lg hover:opacity-90",
  listening: "bg-green-500 shadow-green-300 shadow-lg",
  error: "bg-amber-500 shadow-lg",
};

const LABEL: Record<MicState, string> = {
  idle: "Tap to speak! 🎤",
  listening: "Listening… 👂",
  error: "Try again! 🔄",
};

/** Large microphone button that uses the Web Speech API for voice input. */
export function MicButton({ onResult, disabled = false }: Props) {
  const { micState, start, supported } = useSpeechRecognition({ onResult });

  if (!supported) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={start}
        disabled={disabled || micState === "listening"}
        aria-label="Tap to speak"
        className={`relative rounded-full p-8 text-white transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${BG[micState]}`}
      >
        {/* Ripple rings while listening */}
        {micState === "listening" && (
          <>
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
            <span
              className="absolute rounded-full bg-green-300 animate-ping opacity-35"
              style={{ inset: "-10px", animationDelay: "0.25s" }}
            />
          </>
        )}

        {/* Microphone icon */}
        <svg
          viewBox="0 0 28 28"
          width="52"
          height="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* Capsule */}
          <rect x="10" y="2" width="8" height="14" rx="4" fill="currentColor" stroke="none" />
          {/* Stand */}
          <path d="M5 13a9 9 0 0 0 18 0" />
          {/* Pole */}
          <line x1="14" y1="22" x2="14" y2="26" />
          {/* Base */}
          <line x1="9" y1="26" x2="19" y2="26" />
        </svg>
      </button>

      <p className="text-lg font-black text-slate-700">{LABEL[micState]}</p>
    </div>
  );
}
