interface Props {
  size?: number;
  variant?: "default" | "wave" | "celebrate";
  className?: string;
}

/**
 * Zippy the Parrot — hand-crafted SVG mascot for the speech practice app.
 * viewBox 0 0 100 122 so height = size * 1.22.
 */
export function ZippyParrot({ size = 80, variant = "default", className = "" }: Props) {
  const h = Math.round(size * 1.22);
  return (
    <svg
      viewBox="0 0 100 122"
      width={size}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zippy the parrot"
      role="img"
    >
      {/* ── Tail feathers ── */}
      <ellipse cx="38" cy="116" rx="5.5" ry="15" fill="#ef4444"
        transform="rotate(-22 38 116)" />
      <ellipse cx="50" cy="119" rx="5.5" ry="17" fill="#3b82f6" />
      <ellipse cx="62" cy="116" rx="5.5" ry="15" fill="#22c55e"
        transform="rotate(22 62 116)" />

      {/* ── Body ── */}
      <ellipse cx="50" cy="83" rx="21" ry="26" fill="#16a34a" />

      {/* ── Left wing ── */}
      <path d="M29 72 Q8 84 12 106 Q26 112 37 94 Z" fill="#2563eb" />
      <path d="M29 72 Q15 82 17 100 Q27 105 33 89 Z" fill="#60a5fa" />

      {/* ── Right wing (raised when waving) ── */}
      {variant === "wave" ? (
        <>
          <path d="M71 60 Q92 42 96 64 Q88 80 74 78 Z" fill="#2563eb" />
          <path d="M71 60 Q88 46 91 64 Q85 77 74 75 Z" fill="#60a5fa" />
        </>
      ) : (
        <>
          <path d="M71 72 Q92 84 88 106 Q74 112 63 94 Z" fill="#2563eb" />
          <path d="M71 72 Q85 82 83 100 Q73 105 67 89 Z" fill="#60a5fa" />
        </>
      )}

      {/* ── Belly highlight ── */}
      <ellipse cx="50" cy="88" rx="12" ry="17" fill="#4ade80" />

      {/* ── Neck connector ── */}
      <ellipse cx="50" cy="62" rx="14" ry="8" fill="#16a34a" />

      {/* ── Head ── */}
      <circle cx="50" cy="43" r="24" fill="#16a34a" />

      {/* ── Crest feathers ── */}
      <ellipse cx="43" cy="21" rx="3.5" ry="10" fill="#fbbf24"
        transform="rotate(-18 43 21)" />
      <ellipse cx="50" cy="19" rx="3.5" ry="11" fill="#f59e0b" />
      <ellipse cx="57" cy="21" rx="3.5" ry="10" fill="#fbbf24"
        transform="rotate(18 57 21)" />
      {/* crest shine tips */}
      <ellipse cx="43" cy="13" rx="2" ry="3" fill="#fde68a"
        transform="rotate(-18 43 13)" />
      <ellipse cx="50" cy="10" rx="2" ry="3" fill="#fde68a" />
      <ellipse cx="57" cy="13" rx="2" ry="3" fill="#fde68a"
        transform="rotate(18 57 13)" />

      {/* ── Cheek blush ── */}
      <circle cx="32" cy="50" r="5.5" fill="#fca5a5" opacity="0.75" />
      <circle cx="68" cy="50" r="5.5" fill="#fca5a5" opacity="0.75" />

      {/* ── Left eye ── */}
      <circle cx="39" cy="38" r="8" fill="white" />
      <circle cx="40.5" cy="39.5" r="5" fill="#0f172a" />
      <circle cx="42" cy="37.5" r="2" fill="white" />

      {/* ── Right eye ── */}
      <circle cx="61" cy="38" r="8" fill="white" />
      <circle cx="62.5" cy="39.5" r="5" fill="#0f172a" />
      <circle cx="64" cy="37.5" r="2" fill="white" />

      {/* celebrate: little stars near eyes */}
      {variant === "celebrate" && (
        <>
          <text x="22" y="30" fontSize="8" fill="#fbbf24">★</text>
          <text x="70" y="30" fontSize="8" fill="#fbbf24">★</text>
        </>
      )}

      {/* ── Upper beak ── */}
      <path d="M42 53 Q50 47 58 53 Q55 63 50 66 Q45 63 42 53 Z" fill="#f97316" />
      {/* ── Lower beak ── */}
      <path d="M44.5 58.5 Q50 63 55.5 58.5 Q53 67 50 68 Q47 67 44.5 58.5 Z"
        fill="#ea580c" />

      {/* ── Feet ── */}
      <g stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="42" y1="106" x2="36" y2="119" />
        <line x1="42" y1="106" x2="42" y2="120" />
        <line x1="42" y1="106" x2="48" y2="119" />
        <line x1="58" y1="106" x2="52" y2="119" />
        <line x1="58" y1="106" x2="58" y2="120" />
        <line x1="58" y1="106" x2="64" y2="119" />
      </g>
    </svg>
  );
}
