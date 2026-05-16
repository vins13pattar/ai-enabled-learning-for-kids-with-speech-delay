/** Phase 1 static content — replace with CMS or clinician config later. */

export const ASSESSMENT_WORDS: { id: string; word: string; hint: string; emoji: string }[] = [
  { id: "w1", word: "cat", hint: "Soft /k/ at the start", emoji: "🐱" },
  { id: "w2", word: "sun", hint: "Smile for /s/", emoji: "☀️" },
  { id: "w3", word: "ball", hint: "Lips together for /b/", emoji: "⚽" },
  { id: "w4", word: "fish", hint: "Light /f/ on your lip", emoji: "🐟" },
  { id: "w5", word: "dog", hint: "Tap the /d/ with your tongue", emoji: "🐶" },
  { id: "w6", word: "moon", hint: "Hum the /m/", emoji: "🌙" },
  { id: "w7", word: "tree", hint: "Little puff for /t/", emoji: "🌳" },
  { id: "w8", word: "book", hint: "Round lips for /b/ and /k/", emoji: "📚" },
  { id: "w9", word: "star", hint: "Stretch the /s/", emoji: "⭐" },
  { id: "w10", word: "jump", hint: "Quick /dʒ/ sound", emoji: "🐸" },
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

export const PICTURE_NAMING_ROUNDS: { imageLabel: string; target: string; emoji: string }[] = [
  { imageLabel: "A round red fruit", target: "apple", emoji: "🍎" },
  { imageLabel: "Something you wear on your feet", target: "shoe", emoji: "👟" },
  { imageLabel: "Fluffy farm animal", target: "sheep", emoji: "🐑" },
  { imageLabel: "A yellow fruit you peel", target: "banana", emoji: "🍌" },
  { imageLabel: "A big orange cat", target: "tiger", emoji: "🐯" },
  { imageLabel: "Something you ride", target: "bike", emoji: "🚲" },
  { imageLabel: "It flies in the sky", target: "bird", emoji: "🐦" },
  { imageLabel: "A yellow smiley face", target: "sun", emoji: "☀️" },
];

export const SOUND_SAFARI_TARGETS: { letter: string; word: string; emoji: string; clue: string }[] = [
  { letter: "S", word: "snake", emoji: "🐍", clue: "It slithers and says ssss!" },
  { letter: "M", word: "mouse", emoji: "🐭", clue: "Tiny and loves cheese!" },
  { letter: "B", word: "bear", emoji: "🐻", clue: "Big and loves honey!" },
  { letter: "F", word: "frog", emoji: "🐸", clue: "It jumps and croaks!" },
  { letter: "D", word: "duck", emoji: "🦆", clue: "It quacks and swims!" },
  { letter: "R", word: "rabbit", emoji: "🐰", clue: "Hops and has long ears!" },
];

export const MINIMAL_PAIR_SETS: {
  a: string;
  b: string;
  emojiA: string;
  emojiB: string;
  prompt: string;
  answer: "a" | "b";
}[] = [
  {
    a: "cat",
    b: "cap",
    emojiA: "🐱",
    emojiB: "🧢",
    prompt: "Which rhymes with HAT? 🎩",
    answer: "a",
  },
  {
    a: "ship",
    b: "sip",
    emojiA: "🚢",
    emojiB: "🥤",
    prompt: "Which goes on the OCEAN? 🌊",
    answer: "a",
  },
  {
    a: "bug",
    b: "mug",
    emojiA: "🐛",
    emojiB: "☕",
    prompt: "Which is a tiny creepy-crawly? 🌿",
    answer: "a",
  },
  {
    a: "fan",
    b: "van",
    emojiA: "🌬️",
    emojiB: "🚐",
    prompt: "Which keeps you COOL? ❄️",
    answer: "a",
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
