import { describe, expect, it } from "vitest";
import {
  aggregateAssessmentScores,
  normalizeSpeechToken,
  scoreUtterance,
  wordSimilarity,
} from "./scoring";

describe("normalizeSpeechToken", () => {
  it("returns empty for empty input", () => {
    expect(normalizeSpeechToken("")).toBe("");
  });

  it("trims, lowercases, strips punctuation", () => {
    expect(normalizeSpeechToken("  Cat!  ")).toBe("cat");
    expect(normalizeSpeechToken("don't")).toBe("don't");
  });
});

describe("wordSimilarity", () => {
  it("is 1 for exact match", () => {
    expect(wordSimilarity("ball", "ball")).toBe(1);
  });

  it("is 0 when either side empty after normalization", () => {
    expect(wordSimilarity("", "hi")).toBe(0);
    expect(wordSimilarity("hi", "")).toBe(0);
    expect(wordSimilarity("   ", "x")).toBe(0);
  });

  it("reflects edit distance", () => {
    expect(wordSimilarity("cat", "bat")).toBeGreaterThan(0.5);
    expect(wordSimilarity("cat", "dog")).toBeLessThan(0.5);
  });
});

describe("scoreUtterance", () => {
  it("passes close typos at default threshold", () => {
    const r = scoreUtterance("apple", "aple");
    expect(r.pass).toBe(true);
    expect(r.normalizedTarget).toBe("apple");
    expect(r.normalizedTranscript).toBe("aple");
  });

  it("fails unrelated words", () => {
    const r = scoreUtterance("sun", "moon");
    expect(r.pass).toBe(false);
  });

  it("respects custom threshold boundary", () => {
    const loose = scoreUtterance("butterfly", "butter", { passThreshold: 0.5 });
    expect(loose.pass).toBe(true);
    const strict = scoreUtterance("butterfly", "butter", { passThreshold: 0.95 });
    expect(strict.pass).toBe(false);
  });
});

describe("aggregateAssessmentScores", () => {
  it("returns zeros for empty", () => {
    expect(aggregateAssessmentScores([])).toEqual({ average: 0, passedCount: 0 });
  });

  it("averages and counts passes", () => {
    const a = scoreUtterance("a", "a");
    const b = scoreUtterance("b", "x");
    const agg = aggregateAssessmentScores([a, b]);
    expect(agg.passedCount).toBe(1);
    expect(agg.average).toBeGreaterThan(0);
    expect(agg.average).toBeLessThan(1);
  });
});
