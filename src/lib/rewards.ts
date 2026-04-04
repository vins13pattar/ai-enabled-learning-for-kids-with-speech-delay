/**
 * Client-side stars + streak stub (no server persistence in Phase 1).
 * Aligns with PRD: opaque profile IDs later; here we only store aggregates locally.
 */

export type RewardsState = {
  stars: number;
  lastPracticeDay: string | null;
  streakDays: number;
};

const KEY = "speech-practice-rewards-v1";

function todayUtcDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadRewards(): RewardsState {
  if (typeof window === "undefined") {
    return { stars: 0, lastPracticeDay: null, streakDays: 0 };
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { stars: 0, lastPracticeDay: null, streakDays: 0 };
    const parsed = JSON.parse(raw) as RewardsState;
    return {
      stars: typeof parsed.stars === "number" ? parsed.stars : 0,
      lastPracticeDay:
        typeof parsed.lastPracticeDay === "string" ? parsed.lastPracticeDay : null,
      streakDays: typeof parsed.streakDays === "number" ? parsed.streakDays : 0,
    };
  } catch {
    return { stars: 0, lastPracticeDay: null, streakDays: 0 };
  }
}

function saveRewards(state: RewardsState) {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

/** Award stars and bump streak when practice happens on a new calendar day. */
export function recordPracticeSession(starsEarned: number): RewardsState {
  const prev = loadRewards();
  const today = todayUtcDate();
  let streakDays = prev.streakDays;
  if (prev.lastPracticeDay === null) {
    streakDays = 1;
  } else if (prev.lastPracticeDay === today) {
    streakDays = prev.streakDays;
  } else {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const y = yesterday.toISOString().slice(0, 10);
    streakDays = prev.lastPracticeDay === y ? prev.streakDays + 1 : 1;
  }
  const next: RewardsState = {
    stars: Math.max(0, prev.stars + starsEarned),
    lastPracticeDay: today,
    streakDays,
  };
  saveRewards(next);
  return next;
}
