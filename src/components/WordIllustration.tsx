/**
 * Hand-crafted SVG illustrations for speech-practice target words.
 * All illustrations use viewBox "0 0 120 120" and are centered in the canvas.
 * Used in both the Assessment page and Picture Naming activity.
 */

import type { SVGProps } from "react";

/* ─────────────────────────────────────────────
   Individual word illustrations
───────────────────────────────────────────── */

function Apple() {
  return (
    <>
      {/* Body */}
      <circle cx="60" cy="72" r="43" fill="#ef4444" />
      {/* Depth shading */}
      <ellipse cx="72" cy="76" rx="26" ry="32" fill="#dc2626" opacity="0.45" />
      {/* Shine */}
      <ellipse cx="44" cy="55" rx="11" ry="8" fill="white" opacity="0.28"
        transform="rotate(-25 44 55)" />
      {/* Stem */}
      <rect x="56" y="24" width="6" height="15" rx="3" fill="#78350f" />
      {/* Leaf */}
      <ellipse cx="66" cy="27" rx="11" ry="6" fill="#16a34a"
        transform="rotate(25 66 27)" />
      {/* Leaf vein */}
      <path d="M58 30 Q66 23 75 26" stroke="#15803d" strokeWidth="1.2"
        fill="none" opacity="0.6" />
    </>
  );
}

function Shoe() {
  return (
    <>
      {/* Sole */}
      <rect x="15" y="88" width="90" height="16" rx="8" fill="#374151" />
      {/* Midsole stripe */}
      <rect x="15" y="88" width="90" height="7" rx="4" fill="#6b7280" />
      {/* Upper body */}
      <path
        d="M22 88 Q18 70 24 58 Q30 48 50 46 Q70 44 86 52 Q98 58 100 72 Q102 84 100 88 Z"
        fill="#3b82f6"
      />
      {/* Toe cap */}
      <path
        d="M22 88 Q18 70 24 58 Q30 50 42 50 Q38 64 36 88 Z"
        fill="#2563eb"
      />
      {/* Toe cap shine */}
      <path
        d="M26 72 Q26 60 32 56"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.3"
      />
      {/* Tongue */}
      <path
        d="M50 46 Q60 44 68 46 Q66 62 60 68 Q54 62 50 46 Z"
        fill="#60a5fa"
      />
      {/* Lace holes row */}
      <g fill="white" opacity="0.7">
        <circle cx="50" cy="54" r="2.5" />
        <circle cx="60" cy="52" r="2.5" />
        <circle cx="70" cy="52" r="2.5" />
        <circle cx="80" cy="54" r="2.5" />
        <circle cx="88" cy="58" r="2.5" />
      </g>
      {/* Laces */}
      <path d="M50 54 L60 52 M60 52 L70 52 M70 52 L80 54 M80 54 L88 58"
        stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Logo stripe */}
      <path d="M55 68 Q70 62 90 66" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" fill="none" opacity="0.5" />
    </>
  );
}

function Sheep() {
  return (
    <>
      {/* Fluffy body — overlapping circles */}
      <circle cx="38" cy="74" r="21" fill="#f1f5f9" />
      <circle cx="55" cy="66" r="23" fill="#f8fafc" />
      <circle cx="72" cy="72" r="21" fill="#f1f5f9" />
      <circle cx="47" cy="60" r="19" fill="#f8fafc" />
      <circle cx="64" cy="58" r="20" fill="#ffffff" />
      <circle cx="55" cy="53" r="17" fill="#f8fafc" />
      {/* Shadow under body */}
      <ellipse cx="58" cy="94" rx="30" ry="5" fill="#94a3b8" opacity="0.25" />
      {/* Head */}
      <ellipse cx="26" cy="68" rx="17" ry="15" fill="#64748b" />
      {/* Left ear */}
      <ellipse cx="14" cy="58" rx="7" ry="5.5" fill="#64748b"
        transform="rotate(-25 14 58)" />
      <ellipse cx="14" cy="58" rx="4.5" ry="3.5" fill="#fda4af"
        transform="rotate(-25 14 58)" />
      {/* Eye */}
      <circle cx="21" cy="65" r="4" fill="white" />
      <circle cx="22" cy="66" r="2.5" fill="#0f172a" />
      <circle cx="23" cy="65" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="28" cy="76" rx="5.5" ry="3.5" fill="#fda4af" />
      <path d="M26 76 Q28 79 30 76" stroke="#f43f5e" strokeWidth="1.2"
        fill="none" />
      {/* Legs */}
      <rect x="38" y="92" width="9" height="22" rx="4.5" fill="#475569" />
      <rect x="52" y="92" width="9" height="22" rx="4.5" fill="#475569" />
      <rect x="66" y="92" width="9" height="22" rx="4.5" fill="#475569" />
      {/* Hooves */}
      <rect x="38" y="109" width="9" height="7" rx="3" fill="#1e293b" />
      <rect x="52" y="109" width="9" height="7" rx="3" fill="#1e293b" />
      <rect x="66" y="109" width="9" height="7" rx="3" fill="#1e293b" />
    </>
  );
}

function Banana() {
  return (
    <>
      {/* Main banana body */}
      <path
        d="M 28 100 C 14 68 20 28 55 14 C 82 4 106 22 106 50 C 106 72 90 90 76 95 C 64 99 54 93 52 87 C 50 81 57 76 64 79 C 72 82 76 88 80 85 C 88 80 94 68 92 52 C 90 38 76 22 58 28 C 44 32 36 64 40 94 Z"
        fill="#fbbf24"
      />
      {/* Inner lighter curve */}
      <path
        d="M 40 94 C 36 64 44 32 58 28 C 52 30 44 46 44 70 C 44 84 46 92 48 94 Z"
        fill="#fde68a"
      />
      {/* Left tip */}
      <ellipse cx="28" cy="99" rx="8" ry="5" fill="#92400e"
        transform="rotate(-55 28 99)" />
      {/* Right tip */}
      <ellipse cx="106" cy="50" rx="8" ry="5" fill="#92400e"
        transform="rotate(-25 106 50)" />
      {/* Shine highlight */}
      <path d="M 42 40 Q 52 22 68 18" stroke="white" strokeWidth="3"
        strokeLinecap="round" fill="none" opacity="0.35" />
    </>
  );
}

function Tiger() {
  return (
    <>
      {/* Shadow */}
      <ellipse cx="60" cy="112" rx="32" ry="6" fill="#f97316" opacity="0.2" />
      {/* Body */}
      <ellipse cx="60" cy="88" rx="26" ry="22" fill="#fb923c" />
      {/* Body stripes */}
      <path d="M44 76 Q40 88 44 100" stroke="#1c1917" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      <path d="M72 74 Q77 87 73 100" stroke="#1c1917" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      {/* Tail */}
      <path d="M86 90 Q106 80 108 100 Q106 108 96 104"
        stroke="#fb923c" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M96 104 Q106 108 108 100" stroke="#1c1917" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      {/* Head */}
      <circle cx="60" cy="54" r="30" fill="#fb923c" />
      {/* White muzzle */}
      <ellipse cx="60" cy="66" rx="18" ry="14" fill="#fef3c7" />
      {/* Forehead stripes */}
      <path d="M50 34 Q48 42 50 50" stroke="#1c1917" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <path d="M60 30 Q60 38 60 48" stroke="#1c1917" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <path d="M70 34 Q72 42 70 50" stroke="#1c1917" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      {/* Ears */}
      <circle cx="34" cy="30" r="12" fill="#fb923c" />
      <circle cx="34" cy="30" r="7" fill="#fda4af" />
      <circle cx="86" cy="30" r="12" fill="#fb923c" />
      <circle cx="86" cy="30" r="7" fill="#fda4af" />
      {/* Eyes */}
      <ellipse cx="48" cy="48" rx="8" ry="9" fill="#fef08a" />
      <ellipse cx="48" cy="49" rx="4" ry="6" fill="#0f172a" />
      <circle cx="50" cy="46" r="2" fill="white" />
      <ellipse cx="72" cy="48" rx="8" ry="9" fill="#fef08a" />
      <ellipse cx="72" cy="49" rx="4" ry="6" fill="#0f172a" />
      <circle cx="74" cy="46" r="2" fill="white" />
      {/* Nose */}
      <path d="M54 63 L60 68 L66 63 Q60 60 54 63 Z" fill="#ec4899" />
      {/* Mouth */}
      <path d="M56 69 Q60 74 64 69" stroke="#9f1239" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
      {/* Whiskers */}
      <line x1="26" y1="63" x2="48" y2="65" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      <line x1="26" y1="68" x2="48" y2="68" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      <line x1="72" y1="65" x2="94" y2="63" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      <line x1="72" y1="68" x2="94" y2="68" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
    </>
  );
}

function Bike() {
  return (
    <>
      {/* Shadow */}
      <ellipse cx="60" cy="110" rx="44" ry="5" fill="#94a3b8" opacity="0.2" />
      {/* Rear wheel */}
      <circle cx="30" cy="84" r="26" fill="none" stroke="#374151" strokeWidth="6" />
      <circle cx="30" cy="84" r="20" fill="none" stroke="#6b7280" strokeWidth="2" />
      {/* Rear wheel spokes */}
      <g stroke="#9ca3af" strokeWidth="1.5">
        <line x1="30" y1="58" x2="30" y2="110" />
        <line x1="4" y1="84" x2="56" y2="84" />
        <line x1="12" y1="66" x2="48" y2="102" />
        <line x1="48" y1="66" x2="12" y2="102" />
      </g>
      <circle cx="30" cy="84" r="5" fill="#374151" />
      {/* Front wheel */}
      <circle cx="90" cy="84" r="26" fill="none" stroke="#374151" strokeWidth="6" />
      <circle cx="90" cy="84" r="20" fill="none" stroke="#6b7280" strokeWidth="2" />
      {/* Front wheel spokes */}
      <g stroke="#9ca3af" strokeWidth="1.5">
        <line x1="90" y1="58" x2="90" y2="110" />
        <line x1="64" y1="84" x2="116" y2="84" />
        <line x1="72" y1="66" x2="108" y2="102" />
        <line x1="108" y1="66" x2="72" y2="102" />
      </g>
      <circle cx="90" cy="84" r="5" fill="#374151" />
      {/* Frame — red */}
      {/* Chain stay: rear hub to bottom bracket */}
      <line x1="30" y1="84" x2="58" y2="84" stroke="#ef4444" strokeWidth="5"
        strokeLinecap="round" />
      {/* Seat tube: bottom bracket up */}
      <line x1="58" y1="84" x2="54" y2="52" stroke="#ef4444" strokeWidth="5"
        strokeLinecap="round" />
      {/* Down tube: head tube to bottom bracket */}
      <line x1="58" y1="84" x2="86" y2="58" stroke="#ef4444" strokeWidth="5"
        strokeLinecap="round" />
      {/* Top tube: seat to head */}
      <line x1="54" y1="52" x2="86" y2="58" stroke="#ef4444" strokeWidth="5"
        strokeLinecap="round" />
      {/* Seat stay: seat to rear hub */}
      <line x1="30" y1="84" x2="54" y2="52" stroke="#ef4444" strokeWidth="4"
        strokeLinecap="round" />
      {/* Fork: head tube to front hub */}
      <line x1="86" y1="58" x2="90" y2="84" stroke="#ef4444" strokeWidth="5"
        strokeLinecap="round" />
      {/* Handlebar stem */}
      <line x1="86" y1="58" x2="88" y2="44" stroke="#374151" strokeWidth="4"
        strokeLinecap="round" />
      {/* Handlebars */}
      <line x1="78" y1="44" x2="98" y2="44" stroke="#374151" strokeWidth="4"
        strokeLinecap="round" />
      {/* Grip ends */}
      <circle cx="78" cy="44" r="4" fill="#374151" />
      <circle cx="98" cy="44" r="4" fill="#374151" />
      {/* Seat post */}
      <line x1="54" y1="52" x2="52" y2="38" stroke="#374151" strokeWidth="4"
        strokeLinecap="round" />
      {/* Seat */}
      <ellipse cx="52" cy="36" rx="14" ry="5" fill="#374151" />
    </>
  );
}

function Bird() {
  return (
    <>
      {/* Shadow */}
      <ellipse cx="62" cy="110" rx="24" ry="5" fill="#3b82f6" opacity="0.15" />
      {/* Tail feathers */}
      <path d="M38 86 Q24 96 20 88 Q28 78 36 82 Z" fill="#1d4ed8" />
      <path d="M36 84 Q20 90 18 82 Q26 74 34 80 Z" fill="#3b82f6" />
      <path d="M40 90 Q28 104 22 98 Q28 88 38 88 Z" fill="#1d4ed8" />
      {/* Body */}
      <ellipse cx="62" cy="80" rx="26" ry="22" fill="#3b82f6" />
      {/* Wing upper */}
      <path
        d="M52 62 Q44 52 48 38 Q60 30 78 38 Q88 46 84 60 Q76 56 68 58 Q60 60 52 62 Z"
        fill="#2563eb"
      />
      {/* Wing feather tips */}
      <path d="M48 38 Q44 28 50 26 Q56 34 60 38" fill="#1d4ed8" />
      <path d="M58 32 Q56 22 62 20 Q68 28 72 34" fill="#1d4ed8" />
      <path d="M68 30 Q68 20 74 18 Q80 26 82 34" fill="#1d4ed8" />
      {/* Wing shine */}
      <path d="M56 54 Q58 42 64 36" stroke="white" strokeWidth="1.5"
        strokeLinecap="round" fill="none" opacity="0.3" />
      {/* Belly */}
      <ellipse cx="66" cy="84" rx="16" ry="14" fill="#bfdbfe" />
      {/* Head */}
      <circle cx="80" cy="60" r="20" fill="#3b82f6" />
      {/* Head shine */}
      <ellipse cx="72" cy="52" rx="6" ry="4" fill="#93c5fd" opacity="0.4"
        transform="rotate(-30 72 52)" />
      {/* Eye */}
      <circle cx="86" cy="56" r="8" fill="white" />
      <circle cx="87" cy="57" r="5" fill="#0f172a" />
      <circle cx="89" cy="55" r="2" fill="white" />
      {/* Beak */}
      <path d="M95 60 L108 56 L95 64 Z" fill="#f97316" />
      <path d="M95 60 L108 56 L103 58 Z" fill="#ea580c" />
      {/* Feet */}
      <g stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="54" y1="100" x2="44" y2="112" />
        <line x1="54" y1="100" x2="52" y2="114" />
        <line x1="54" y1="100" x2="62" y2="112" />
        <line x1="66" y1="100" x2="56" y2="112" />
        <line x1="66" y1="100" x2="64" y2="114" />
        <line x1="66" y1="100" x2="74" y2="112" />
      </g>
    </>
  );
}

function Sun() {
  return (
    <>
      {/* Outer glow */}
      <circle cx="60" cy="60" r="54" fill="#fef9c3" />
      {/* Rays — alternating long/short */}
      <g fill="#fbbf24">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const innerR = 38;
          const outerR = i % 2 === 0 ? 56 : 50;
          const w = i % 2 === 0 ? 6 : 4.5;
          const x1 = 60 + Math.cos(rad) * innerR;
          const y1 = 60 + Math.sin(rad) * innerR;
          const x2 = 60 + Math.cos(rad) * outerR;
          const y2 = 60 + Math.sin(rad) * outerR;
          return (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#f59e0b" strokeWidth={w} strokeLinecap="round" />
          );
        })}
      </g>
      {/* Main circle */}
      <circle cx="60" cy="60" r="36" fill="#fbbf24" />
      {/* Inner shine */}
      <circle cx="60" cy="60" r="36" fill="url(#sunGrad)" />
      <defs>
        <radialGradient id="sunGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Face */}
      {/* Eyes */}
      <ellipse cx="48" cy="55" rx="5" ry="6" fill="#92400e" />
      <ellipse cx="72" cy="55" rx="5" ry="6" fill="#92400e" />
      <circle cx="50" cy="53" r="2" fill="white" opacity="0.5" />
      <circle cx="74" cy="53" r="2" fill="white" opacity="0.5" />
      {/* Smile */}
      <path d="M46 68 Q60 80 74 68" stroke="#92400e" strokeWidth="3.5"
        strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="38" cy="68" r="6" fill="#fca5a5" opacity="0.55" />
      <circle cx="82" cy="68" r="6" fill="#fca5a5" opacity="0.55" />
    </>
  );
}

/* Assessment words */
function Cat() {
  return (
    <>
      {/* Body */}
      <ellipse cx="60" cy="85" rx="30" ry="26" fill="#f97316" />
      {/* Tail */}
      <path d="M90 85 Q115 70 110 95 Q105 108 94 100"
        stroke="#f97316" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M94 100 Q105 108 110 95" stroke="#ea580c" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      {/* Head */}
      <circle cx="60" cy="52" r="28" fill="#f97316" />
      {/* Ears */}
      <polygon points="36,30 28,12 48,22" fill="#f97316" />
      <polygon points="36,30 28,12 48,22" fill="#f97316" />
      <polygon points="84,30 92,12 72,22" fill="#f97316" />
      <polygon points="36,28 32,16 46,22" fill="#fda4af" />
      <polygon points="84,28 88,16 74,22" fill="#fda4af" />
      {/* Face white muzzle */}
      <ellipse cx="60" cy="64" rx="16" ry="12" fill="#fff7ed" />
      {/* Eyes */}
      <ellipse cx="47" cy="48" rx="8" ry="9" fill="#fef08a" />
      <ellipse cx="73" cy="48" rx="8" ry="9" fill="#fef08a" />
      <ellipse cx="47" cy="49" rx="4" ry="6" fill="#0f172a" />
      <ellipse cx="73" cy="49" rx="4" ry="6" fill="#0f172a" />
      <circle cx="49" cy="46" r="2" fill="white" />
      <circle cx="75" cy="46" r="2" fill="white" />
      {/* Nose */}
      <path d="M56 62 L60 65 L64 62 Q60 59 56 62 Z" fill="#ec4899" />
      {/* Mouth */}
      <path d="M57 66 Q60 70 63 66" stroke="#9f1239" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
      {/* Whiskers */}
      <line x1="24" y1="61" x2="48" y2="63" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      <line x1="24" y1="66" x2="48" y2="66" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      <line x1="72" y1="63" x2="96" y2="61" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      <line x1="72" y1="66" x2="96" y2="66" stroke="#78716c" strokeWidth="1.2" opacity="0.6" />
      {/* Stripes */}
      <path d="M46 76 Q42 86 46 96" stroke="#ea580c" strokeWidth="3"
        strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M74 76 Q78 86 74 96" stroke="#ea580c" strokeWidth="3"
        strokeLinecap="round" fill="none" opacity="0.5" />
    </>
  );
}

function SunSmall() {
  return <Sun />;
}

function Ball() {
  return (
    <>
      {/* Shadow */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#94a3b8" opacity="0.2" />
      {/* Ball */}
      <circle cx="60" cy="62" r="48" fill="white" />
      {/* Pentagon pattern (soccer ball) */}
      <circle cx="60" cy="62" r="48" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      {/* Black patches */}
      <polygon points="60,18 76,30 70,48 50,48 44,30" fill="#0f172a" />
      <polygon points="108,52 98,68 82,68 76,52 92,40" fill="#0f172a" />
      <polygon points="92,96 76,96 70,80 84,68 98,76" fill="#0f172a" />
      <polygon points="28,96 42,76 56,80 50,96 34,102" fill="#0f172a" />
      <polygon points="12,52 28,40 44,52 38,68 22,68" fill="#0f172a" />
      {/* Shine */}
      <ellipse cx="44" cy="40" rx="12" ry="8" fill="white" opacity="0.35"
        transform="rotate(-30 44 40)" />
    </>
  );
}

function Fish() {
  return (
    <>
      {/* Tail fin */}
      <path d="M28 60 L10 42 L10 78 Z" fill="#f97316" />
      <path d="M28 60 L12 46 L12 74 Z" fill="#fdba74" opacity="0.6" />
      {/* Body */}
      <ellipse cx="66" cy="60" rx="40" ry="28" fill="#f97316" />
      {/* Belly */}
      <ellipse cx="70" cy="64" rx="28" ry="16" fill="#fed7aa" />
      {/* Dorsal fin */}
      <path d="M50 34 Q62 20 78 30 Q74 34 66 34 Z" fill="#ea580c" />
      {/* Pectoral fin */}
      <path d="M64 58 Q70 44 80 46 Q80 56 72 60 Z" fill="#fdba74" />
      {/* Scales hint */}
      <path d="M50 50 Q56 44 62 50" stroke="#ea580c" strokeWidth="1.5"
        fill="none" opacity="0.4" />
      <path d="M60 46 Q66 40 72 46" stroke="#ea580c" strokeWidth="1.5"
        fill="none" opacity="0.4" />
      <path d="M40 54 Q46 48 52 54" stroke="#ea580c" strokeWidth="1.5"
        fill="none" opacity="0.4" />
      {/* Eye */}
      <circle cx="92" cy="52" r="9" fill="white" />
      <circle cx="93" cy="53" r="5.5" fill="#0f172a" />
      <circle cx="95" cy="51" r="2" fill="white" />
      {/* Mouth */}
      <path d="M104 58 Q108 62 104 66" stroke="#ea580c" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      {/* Bubbles */}
      <circle cx="108" cy="44" r="3.5" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="114" cy="36" r="2.5" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
    </>
  );
}

function Dog() {
  return (
    <>
      {/* Body */}
      <ellipse cx="60" cy="86" rx="30" ry="24" fill="#d97706" />
      {/* Tail */}
      <path d="M90 80 Q108 62 104 78 Q100 90 90 88"
        stroke="#d97706" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* Head */}
      <circle cx="58" cy="52" r="28" fill="#d97706" />
      {/* Left ear (floppy) */}
      <path d="M34 36 Q18 38 16 58 Q20 68 34 60 Z" fill="#b45309" />
      {/* Right ear (floppy) */}
      <path d="M82 36 Q98 38 100 58 Q96 68 82 60 Z" fill="#b45309" />
      {/* Snout */}
      <ellipse cx="60" cy="65" rx="18" ry="13" fill="#fde68a" />
      {/* Eyes */}
      <circle cx="46" cy="46" r="8" fill="#1e293b" />
      <circle cx="70" cy="46" r="8" fill="#1e293b" />
      <circle cx="48" cy="44" r="3" fill="white" />
      <circle cx="72" cy="44" r="3" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="61" rx="8" ry="6" fill="#1e293b" />
      <circle cx="58" cy="60" r="2" fill="white" opacity="0.5" />
      {/* Mouth */}
      <path d="M52 68 Q60 76 68 68" stroke="#92400e" strokeWidth="2"
        strokeLinecap="round" fill="none" />
      {/* Spots */}
      <circle cx="76" cy="86" r="7" fill="#b45309" opacity="0.5" />
      <circle cx="48" cy="94" r="5" fill="#b45309" opacity="0.5" />
    </>
  );
}

function Moon() {
  return (
    <>
      {/* Glow */}
      <circle cx="55" cy="60" r="52" fill="#fef9c3" opacity="0.5" />
      {/* Moon crescent */}
      <circle cx="55" cy="60" r="44" fill="#fbbf24" />
      {/* Cut-out circle for crescent */}
      <circle cx="75" cy="44" r="34" fill="#e0f2fe" />
      {/* Stars */}
      <text x="80" y="36" fontSize="14" fill="#fbbf24">★</text>
      <text x="94" y="58" fontSize="10" fill="#fbbf24">★</text>
      <text x="86" y="74" fontSize="8" fill="#fbbf24">✦</text>
      <text x="100" y="44" fontSize="6" fill="#fbbf24">✦</text>
      {/* Face on moon */}
      <ellipse cx="40" cy="56" rx="5" ry="6" fill="#92400e" />
      <ellipse cx="52" cy="50" rx="5" ry="6" fill="#92400e" />
      <path d="M36 68 Q44 76 54 70" stroke="#92400e" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      <circle cx="36" cy="68" r="5" fill="#fca5a5" opacity="0.5" />
    </>
  );
}

function Tree() {
  return (
    <>
      {/* Shadow */}
      <ellipse cx="60" cy="112" rx="22" ry="5" fill="#94a3b8" opacity="0.2" />
      {/* Trunk */}
      <rect x="48" y="82" width="24" height="34" rx="6" fill="#92400e" />
      {/* Trunk detail */}
      <path d="M54 90 Q52 100 55 110" stroke="#78350f" strokeWidth="2"
        fill="none" opacity="0.5" />
      {/* Bottom foliage */}
      <ellipse cx="60" cy="80" rx="44" ry="34" fill="#15803d" />
      {/* Middle foliage */}
      <ellipse cx="60" cy="58" rx="36" ry="30" fill="#16a34a" />
      {/* Top foliage */}
      <ellipse cx="60" cy="38" rx="26" ry="24" fill="#22c55e" />
      {/* Foliage shine */}
      <ellipse cx="48" cy="32" rx="10" ry="7" fill="#4ade80" opacity="0.45"
        transform="rotate(-20 48 32)" />
      <ellipse cx="44" cy="54" rx="12" ry="8" fill="#4ade80" opacity="0.35"
        transform="rotate(-15 44 54)" />
      {/* A few leaves detail */}
      <circle cx="78" cy="46" r="5" fill="#15803d" opacity="0.6" />
      <circle cx="82" cy="70" r="7" fill="#15803d" opacity="0.5" />
      <circle cx="36" cy="66" r="6" fill="#15803d" opacity="0.5" />
    </>
  );
}

function Book() {
  return (
    <>
      {/* Back cover */}
      <rect x="20" y="24" width="68" height="84" rx="6" fill="#1d4ed8" />
      {/* Pages block */}
      <rect x="28" y="28" width="56" height="76" rx="4" fill="#f8fafc" />
      {/* Page lines */}
      <g stroke="#cbd5e1" strokeWidth="1.5">
        <line x1="36" y1="50" x2="76" y2="50" />
        <line x1="36" y1="60" x2="76" y2="60" />
        <line x1="36" y1="70" x2="76" y2="70" />
        <line x1="36" y1="80" x2="76" y2="80" />
        <line x1="36" y1="90" x2="68" y2="90" />
      </g>
      {/* Front cover */}
      <rect x="34" y="24" width="62" height="84" rx="6" fill="#2563eb" />
      {/* Cover decoration */}
      <rect x="42" y="34" width="46" height="6" rx="3" fill="white" opacity="0.8" />
      <rect x="42" y="46" width="38" height="4" rx="2" fill="white" opacity="0.5" />
      {/* Star on cover */}
      <text x="50" y="82" fontSize="28" fill="#fbbf24">★</text>
      {/* Spine */}
      <rect x="34" y="24" width="8" height="84" rx="3" fill="#1d4ed8" />
      {/* Bookmark */}
      <rect x="82" y="16" width="8" height="26" rx="2" fill="#ef4444" />
      <path d="M82 40 L86 46 L90 40 Z" fill="#ef4444" />
    </>
  );
}

function Star() {
  return (
    <>
      {/* Background glow */}
      <circle cx="60" cy="60" r="54" fill="#fef9c3" opacity="0.6" />
      {/* Outer star (5-pointed) */}
      <polygon
        points="60,8 72,46 112,46 80,70 92,108 60,84 28,108 40,70 8,46 48,46"
        fill="#fbbf24"
      />
      {/* Inner star highlight */}
      <polygon
        points="60,20 70,48 100,48 76,66 86,98 60,78 34,98 44,66 20,48 50,48"
        fill="#fde68a" opacity="0.6"
      />
      {/* Shine top-left */}
      <ellipse cx="44" cy="36" rx="10" ry="6" fill="white" opacity="0.3"
        transform="rotate(-35 44 36)" />
      {/* Center shine */}
      <circle cx="60" cy="60" r="8" fill="white" opacity="0.2" />
      {/* Sparkles around */}
      <text x="94" y="28" fontSize="12" fill="#f59e0b">✦</text>
      <text x="18" y="30" fontSize="10" fill="#f59e0b">✦</text>
      <text x="100" y="90" fontSize="8" fill="#f59e0b">✦</text>
    </>
  );
}

function Frog() {
  return (
    <>
      {/* Body */}
      <ellipse cx="60" cy="82" rx="34" ry="28" fill="#22c55e" />
      {/* Belly */}
      <ellipse cx="60" cy="86" rx="22" ry="18" fill="#86efac" />
      {/* Back legs */}
      <path d="M26 88 Q10 96 14 112 Q20 118 30 112 Q34 102 30 92 Z" fill="#16a34a" />
      <path d="M94 88 Q110 96 106 112 Q100 118 90 112 Q86 102 90 92 Z" fill="#16a34a" />
      {/* Front legs */}
      <path d="M38 94 Q22 104 24 114 Q30 116 36 110 Q40 102 40 96 Z" fill="#22c55e" />
      <path d="M82 94 Q98 104 96 114 Q90 116 84 110 Q80 102 80 96 Z" fill="#22c55e" />
      {/* Toes */}
      <g fill="#16a34a">
        <circle cx="14" cy="114" r="4" />
        <circle cx="22" cy="118" r="4" />
        <circle cx="30" cy="114" r="4" />
        <circle cx="96" cy="114" r="4" />
        <circle cx="104" cy="118" r="4" />
        <circle cx="112" cy="114" r="4" />
      </g>
      {/* Head */}
      <ellipse cx="60" cy="56" rx="32" ry="26" fill="#22c55e" />
      {/* Eye bumps */}
      <circle cx="40" cy="42" r="14" fill="#22c55e" />
      <circle cx="80" cy="42" r="14" fill="#22c55e" />
      {/* Eyes */}
      <circle cx="40" cy="40" r="11" fill="#fef08a" />
      <circle cx="80" cy="40" r="11" fill="#fef08a" />
      <circle cx="40" cy="41" r="6.5" fill="#0f172a" />
      <circle cx="80" cy="41" r="6.5" fill="#0f172a" />
      <circle cx="42" cy="38" r="2.5" fill="white" />
      <circle cx="82" cy="38" r="2.5" fill="white" />
      {/* Mouth */}
      <path d="M44 66 Q60 78 76 66" stroke="#15803d" strokeWidth="3"
        strokeLinecap="round" fill="none" />
      {/* Nostril dots */}
      <circle cx="55" cy="60" r="2" fill="#15803d" />
      <circle cx="65" cy="60" r="2" fill="#15803d" />
    </>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

const ILLUSTRATIONS: Record<string, () => React.JSX.Element> = {
  // Assessment words
  cat: Cat,
  sun: SunSmall,
  ball: Ball,
  fish: Fish,
  dog: Dog,
  moon: Moon,
  tree: Tree,
  book: Book,
  star: Star,
  jump: Frog, // frog jumping
  // Picture naming words
  apple: Apple,
  shoe: Shoe,
  sheep: Sheep,
  banana: Banana,
  tiger: Tiger,
  bike: Bike,
  bird: Bird,
};

interface WordIllustrationProps extends SVGProps<SVGSVGElement> {
  word: string;
  size?: number;
}

export function WordIllustration({ word, size = 120, className = "", ...props }: WordIllustrationProps) {
  const IllustrationFn = ILLUSTRATIONS[word.toLowerCase()];
  if (!IllustrationFn) {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size}
        xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
        <circle cx="60" cy="60" r="55" fill="#f1f5f9" />
        <text x="60" y="72" textAnchor="middle" fontSize="48" fill="#94a3b8">?</text>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={word}
      role="img"
      {...props}
    >
      <IllustrationFn />
    </svg>
  );
}
