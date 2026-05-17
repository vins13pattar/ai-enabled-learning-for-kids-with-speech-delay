/**
 * Persists per-session phoneme accuracy data in localStorage.
 * Zero-PII: stores only word strings and pass/fail booleans — no audio, no names.
 */

export type WordResult = {
  word: string;
  phoneme: string;
  pass: boolean;
  score: number;
};

export type SessionRecord = {
  id: string;
  date: string; // YYYY-MM-DD UTC
  activityId: string;
  results: WordResult[];
  starsEarned: number;
};

export type PhonemeStats = {
  phoneme: string;
  label: string;
  attempts: number;
  passes: number;
  accuracy: number; // 0-100
};

const KEY = "speech-practice-sessions-v1";

const PHONEME_LABELS: Record<string, string> = {
  k: "/k/ sound",
  s: "/s/ sound",
  b: "/b/ sound",
  f: "/f/ sound",
  d: "/d/ sound",
  m: "/m/ sound",
  r: "/r/ sound",
  j: "/j/ sound",
  sh: "/sh/ sound",
  t: "/t/ sound",
  a: "Vowel sounds",
};

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadSessions(): SessionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionRecord[]) : [];
  } catch {
    return [];
  }
}

export function logSession(record: Omit<SessionRecord, "id" | "date">): void {
  if (typeof window === "undefined") return;
  const sessions = loadSessions();
  sessions.push({
    ...record,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: todayUtc(),
  });
  // Retain last 120 sessions (~4 months at daily use)
  window.localStorage.setItem(KEY, JSON.stringify(sessions.slice(-120)));
}

/** Aggregate accuracy per phoneme across all stored sessions. */
export function getPhonemeStats(): PhonemeStats[] {
  const map: Record<string, { attempts: number; passes: number }> = {};
  for (const s of loadSessions()) {
    for (const r of s.results) {
      const p = r.phoneme || "?";
      if (!map[p]) map[p] = { attempts: 0, passes: 0 };
      map[p].attempts++;
      if (r.pass) map[p].passes++;
    }
  }
  return Object.entries(map)
    .map(([phoneme, { attempts, passes }]) => ({
      phoneme,
      label: PHONEME_LABELS[phoneme] ?? `/${phoneme}/ sound`,
      attempts,
      passes,
      accuracy: attempts > 0 ? Math.round((passes / attempts) * 100) : 0,
    }))
    .sort((a, b) => b.attempts - a.attempts);
}

/** Returns dates (YYYY-MM-DD) that had at least one session, sorted ascending. */
export function getActiveDates(): string[] {
  return [...new Set(loadSessions().map((s) => s.date))].sort();
}

/**
 * Returns the phoneme most in need of practice (lowest accuracy, min 3 attempts).
 * Falls back to cycling through a default list by day.
 */
const DEFAULT_ROTATION = ["s", "b", "k", "m", "f", "r", "sh", "d", "t"];

export function getTodaysFocusPhoneme(): { phoneme: string; label: string } {
  const stats = getPhonemeStats().filter((s) => s.attempts >= 3);
  const lowest = stats
    .filter((s) => s.accuracy < 80)
    .sort((a, b) => a.accuracy - b.accuracy)[0];

  if (lowest) return { phoneme: lowest.phoneme, label: lowest.label };

  const dayIndex = Math.floor(Date.now() / 86_400_000) % DEFAULT_ROTATION.length;
  const p = DEFAULT_ROTATION[dayIndex];
  return { phoneme: p, label: PHONEME_LABELS[p] ?? `/${p}/ sound` };
}
