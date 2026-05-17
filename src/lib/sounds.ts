/**
 * Programmatic sound effects via Web Audio API — no external files needed.
 * All functions are safe to call on the server (no-ops when window is absent).
 */

let _ctx: AudioContext | null = null;

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (_ctx.state === "suspended") _ctx.resume().catch(() => {});
  return _ctx;
}

function tone(
  freq: number,
  duration: number,
  delay = 0,
  type: OscillatorType = "sine",
  maxGain = 0.28,
) {
  const c = ctx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + delay);
  gain.gain.setValueAtTime(0, c.currentTime + delay);
  gain.gain.linearRampToValueAtTime(maxGain, c.currentTime + delay + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
  osc.start(c.currentTime + delay);
  osc.stop(c.currentTime + delay + duration + 0.02);
}

/** Bright ascending arpeggio — correct answer */
export function playCorrect() {
  tone(523, 0.18, 0.00); // C5
  tone(659, 0.18, 0.14); // E5
  tone(784, 0.25, 0.28); // G5
}

/** Soft descending — gentle wrong (never punishing) */
export function playWrong() {
  tone(392, 0.22, 0.00, "sine", 0.18); // G4
  tone(330, 0.28, 0.20, "sine", 0.14); // E4
}

/** Sparkle chime — star earned */
export function playStar() {
  tone(880, 0.10, 0.00, "sine", 0.22);  // A5
  tone(1047, 0.10, 0.10, "sine", 0.22); // C6
  tone(1319, 0.15, 0.20, "sine", 0.22); // E6
}

/** Mini fanfare — activity complete */
export function playCelebrate() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, i * 0.18));
}

/** Soft click — button tap feedback */
export function playClick() {
  tone(900, 0.06, 0, "sine", 0.12);
}

/** Rising octave — streak milestone */
export function playStreak() {
  [440, 554, 659, 880].forEach((f, i) => tone(f, 0.16, i * 0.12, "triangle", 0.2));
}
