/**
 * Word-level pronunciation scoring boundaries for Phase 1.
 * Transcripts are normalized; scores are 0–1 for pass/fail thresholds in the UI.
 */

export type ScoringResult = {
  normalizedTarget: string;
  normalizedTranscript: string;
  score: number;
  pass: boolean;
};

const DEFAULT_PASS_THRESHOLD = 0.72;

export function normalizeSpeechToken(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, "")
    .replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const prevRow = new Array<number>(b.length + 1);
  const currRow = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prevRow[j] = j;

  for (let i = 1; i <= a.length; i++) {
    currRow[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,
        currRow[j - 1] + 1,
        prevRow[j - 1] + cost,
      );
    }
    for (let j = 0; j <= b.length; j++) prevRow[j] = currRow[j];
  }
  return prevRow[b.length];
}

/**
 * Similarity in [0, 1]: 1 = identical after normalization, 0 = empty or unrelated.
 */
export function wordSimilarity(target: string, transcript: string): number {
  const t = normalizeSpeechToken(target).replace(/\s/g, "");
  const u = normalizeSpeechToken(transcript).replace(/\s/g, "");
  if (!t && !u) return 0;
  if (!t || !u) return 0;

  const dist = levenshtein(t, u);
  const maxLen = Math.max(t.length, u.length);
  return 1 - dist / maxLen;
}

export function scoreUtterance(
  targetWord: string,
  transcript: string,
  options?: { passThreshold?: number },
): ScoringResult {
  const normalizedTarget = normalizeSpeechToken(targetWord);
  const normalizedTranscript = normalizeSpeechToken(transcript);
  const threshold = options?.passThreshold ?? DEFAULT_PASS_THRESHOLD;

  const score = wordSimilarity(targetWord, transcript);
  const pass = score >= threshold;

  return {
    normalizedTarget,
    normalizedTranscript,
    score: Math.round(score * 1000) / 1000,
    pass,
  };
}

export function aggregateAssessmentScores(results: ScoringResult[]): {
  average: number;
  passedCount: number;
} {
  if (results.length === 0) return { average: 0, passedCount: 0 };
  const sum = results.reduce((acc, r) => acc + r.score, 0);
  const passedCount = results.filter((r) => r.pass).length;
  return {
    average: Math.round((sum / results.length) * 1000) / 1000,
    passedCount,
  };
}
