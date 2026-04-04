/** Phase 1 static content — replace with CMS or clinician config later. */

export const ASSESSMENT_WORDS: { id: string; word: string; hint: string }[] = [
  { id: "w1", word: "cat", hint: "Soft /k/ at the start" },
  { id: "w2", word: "sun", hint: "Smile for /s/" },
  { id: "w3", word: "ball", hint: "Lips together for /b/" },
  { id: "w4", word: "fish", hint: "Light /f/ on your lip" },
  { id: "w5", word: "dog", hint: "Tap the /d/ with your tongue" },
  { id: "w6", word: "moon", hint: "Hum the /m/" },
  { id: "w7", word: "tree", hint: "Little puff for /t/" },
  { id: "w8", word: "book", hint: "Round lips for /b/ and /k/" },
  { id: "w9", word: "star", hint: "Stretch the /s/" },
  { id: "w10", word: "jump", hint: "Quick /dʒ/ sound" },
];

export type ActivityId = "picture-naming" | "sound-safari" | "minimal-pairs";

export const ACTIVITIES: {
  id: ActivityId;
  title: string;
  blurb: string;
  path: string;
}[] = [
  {
    id: "picture-naming",
    title: "Picture Naming",
    blurb: "Name what you see — we listen and cheer you on.",
    path: "/activities/picture-naming",
  },
  {
    id: "sound-safari",
    title: "Sound Safari",
    blurb: "Hunt for things that start with today’s sound.",
    path: "/activities/sound-safari",
  },
  {
    id: "minimal-pairs",
    title: "Minimal Pairs",
    blurb: "Listen closely — which word did you hear?",
    path: "/activities/minimal-pairs",
  },
];

export const PICTURE_NAMING_ROUNDS = [
  { imageLabel: "A round fruit", target: "apple" },
  { imageLabel: "Something you wear on your feet", target: "shoe" },
  { imageLabel: "Fluffy farm animal", target: "sheep" },
];

export const SOUND_SAFARI_TARGETS = [
  { letter: "S", word: "snake" },
  { letter: "M", word: "mouse" },
  { letter: "B", word: "bee" },
];

export const MINIMAL_PAIR_SETS = [
  { a: "cat", b: "cap", prompt: "Which word am I thinking of? It rhymes with hat." },
  { a: "ship", b: "sip", prompt: "Listen for the first sound — ship or sip?" },
];
