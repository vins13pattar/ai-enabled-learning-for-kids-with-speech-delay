/** Phase 1 static content — replace with CMS or clinician config later. */

export const ASSESSMENT_WORDS: {
  id: string;
  word: string;
  hint: string;
  emoji: string;
  phoneme: string;
}[] = [
  { id: "w1",  word: "cat",  hint: "Soft /k/ at the start",       emoji: "🐱", phoneme: "k"  },
  { id: "w2",  word: "sun",  hint: "Smile for /s/",               emoji: "☀️", phoneme: "s"  },
  { id: "w3",  word: "ball", hint: "Lips together for /b/",       emoji: "⚽", phoneme: "b"  },
  { id: "w4",  word: "fish", hint: "Light /f/ on your lip",       emoji: "🐟", phoneme: "f"  },
  { id: "w5",  word: "dog",  hint: "Tap the /d/ with your tongue",emoji: "🐶", phoneme: "d"  },
  { id: "w6",  word: "moon", hint: "Hum the /m/",                 emoji: "🌙", phoneme: "m"  },
  { id: "w7",  word: "tree", hint: "Little puff for /t/",         emoji: "🌳", phoneme: "r"  },
  { id: "w8",  word: "book", hint: "Round lips for /b/ then /k/", emoji: "📚", phoneme: "b"  },
  { id: "w9",  word: "star", hint: "Stretch the /s/",             emoji: "⭐", phoneme: "s"  },
  { id: "w10", word: "jump", hint: "Quick /dʒ/ sound",            emoji: "🐸", phoneme: "j"  },
];

export type ActivityId = "picture-naming" | "sound-safari" | "minimal-pairs" | "sing-along";

export const ACTIVITIES: {
  id: ActivityId;
  title: string;
  blurb: string;
  path: string;
  emoji: string;
  color: string;
  colorSoft: string;
}[] = [
  {
    id: "picture-naming",
    title: "Picture Naming",
    blurb: "Name what you see — we listen and cheer you on!",
    path: "/activities/picture-naming",
    emoji: "🖼️",
    color: "var(--accent)",
    colorSoft: "var(--accent-soft)",
  },
  {
    id: "sound-safari",
    title: "Sound Safari",
    blurb: "Hunt for things that start with today's sound!",
    path: "/activities/sound-safari",
    emoji: "🔍",
    color: "var(--orange)",
    colorSoft: "var(--orange-soft)",
  },
  {
    id: "minimal-pairs",
    title: "Minimal Pairs",
    blurb: "Listen closely — which word did you hear?",
    path: "/activities/minimal-pairs",
    emoji: "👂",
    color: "var(--purple)",
    colorSoft: "var(--purple-soft)",
  },
  {
    id: "sing-along",
    title: "Sing-Along",
    blurb: "Sing fun songs that practice tricky sounds!",
    path: "/activities/sing-along",
    emoji: "🎵",
    color: "var(--pink)",
    colorSoft: "var(--pink-soft)",
  },
];

export const PICTURE_NAMING_ROUNDS: {
  imageLabel: string;
  target: string;
  emoji: string;
  phoneme: string;
}[] = [
  { imageLabel: "A round red fruit",              target: "apple",  emoji: "🍎", phoneme: "a"  },
  { imageLabel: "Something you wear on your feet", target: "shoe",   emoji: "👟", phoneme: "sh" },
  { imageLabel: "Fluffy farm animal",              target: "sheep",  emoji: "🐑", phoneme: "sh" },
  { imageLabel: "A yellow fruit you peel",         target: "banana", emoji: "🍌", phoneme: "b"  },
  { imageLabel: "A big striped cat",               target: "tiger",  emoji: "🐯", phoneme: "t"  },
  { imageLabel: "Something you ride",              target: "bike",   emoji: "🚲", phoneme: "b"  },
  { imageLabel: "It flies in the sky",             target: "bird",   emoji: "🐦", phoneme: "r"  },
  { imageLabel: "It lights up the sky",            target: "sun",    emoji: "☀️", phoneme: "s"  },
];

export const SOUND_SAFARI_TARGETS: {
  letter: string;
  word: string;
  emoji: string;
  clue: string;
  phoneme: string;
}[] = [
  { letter: "S", word: "snake",  emoji: "🐍", clue: "It slithers and says ssss!",  phoneme: "s" },
  { letter: "M", word: "mouse",  emoji: "🐭", clue: "Tiny and loves cheese!",       phoneme: "m" },
  { letter: "B", word: "bear",   emoji: "🐻", clue: "Big and loves honey!",         phoneme: "b" },
  { letter: "F", word: "frog",   emoji: "🐸", clue: "It jumps and croaks!",         phoneme: "f" },
  { letter: "D", word: "duck",   emoji: "🦆", clue: "It quacks and swims!",         phoneme: "d" },
  { letter: "R", word: "rabbit", emoji: "🐰", clue: "Hops and has long ears!",      phoneme: "r" },
];

export const MINIMAL_PAIR_SETS: {
  a: string;
  b: string;
  emojiA: string;
  emojiB: string;
  prompt: string;
  answer: "a" | "b";
  phoneme: string;
}[] = [
  {
    a: "cat",   b: "cap",  emojiA: "🐱", emojiB: "🧢",
    prompt: "Which rhymes with HAT? 🎩",           answer: "a", phoneme: "k",
  },
  {
    a: "ship",  b: "sip",  emojiA: "🚢", emojiB: "🥤",
    prompt: "Which goes on the OCEAN? 🌊",         answer: "a", phoneme: "sh",
  },
  {
    a: "bug",   b: "mug",  emojiA: "🐛", emojiB: "☕",
    prompt: "Which is a tiny creepy-crawly? 🌿",  answer: "a", phoneme: "b",
  },
  {
    a: "fan",   b: "van",  emojiA: "🌬️", emojiB: "🚐",
    prompt: "Which keeps you COOL? ❄️",            answer: "a", phoneme: "f",
  },
];

export const SING_ALONG_SONGS: {
  id: string;
  title: string;
  targetSound: string;
  emoji: string;
  lines: string[];
}[] = [
  {
    id: "s1",
    title: "The Silly Snake Song",
    targetSound: "S",
    emoji: "🐍",
    lines: [
      "Silly snake goes ssss ssss ssss,",
      "Sliding down the slippery slide!",
      "Say it slow, say it right,",
      "S-S-S all through the night!",
    ],
  },
  {
    id: "s2",
    title: "Bouncy Ball Song",
    targetSound: "B",
    emoji: "⚽",
    lines: [
      "Bouncy ball, bouncy ball, bounce bounce bounce!",
      "Baby bear brings a big blue ball!",
      "B-B-B, can you say it with me?",
      "Bouncy ball for you and me!",
    ],
  },
  {
    id: "s3",
    title: "Merry Moon Song",
    targetSound: "M",
    emoji: "🌙",
    lines: [
      "Moon moon moon up in the sky,",
      "Mmm mmm mmm, way up high!",
      "Monkeys and mice look up and say,",
      "Mmm mmm mmm, what a beautiful day!",
    ],
  },
];
