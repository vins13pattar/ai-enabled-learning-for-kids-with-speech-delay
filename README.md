# AI-enabled learning for kids with speech delay

A **Next.js** web app that prototypes playful speech practice for young children (roughly ages 2–7) and their caregivers. The current codebase is a **phase-1 slice**: onboarding, a short assessment-style flow, activity shells, and an AI companion backed by the Vercel AI SDK.

This tool is **not** a substitute for a speech-language pathologist or medical care. It is meant to support structured practice at home between professional sessions.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) with React 19
- TypeScript, Tailwind CSS 4, ESLint
- [Vercel AI SDK](https://sdk.vercel.ai/) with `@ai-sdk/openai`
- Tests: [Vitest](https://vitest.dev/)

## Prerequisites

- Node.js 22+ (aligned with `@types/node` in this repo)
- A package manager (`npm`, `pnpm`, or `yarn`)

## Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a local env file (Next.js loads `.env.local` automatically):

   ```bash
   cp .env.example .env.local
   ```

   Set at least:

   - `OPENAI_API_KEY` — required for **live** streaming replies from the companion API route (`/api/companion`). Without it, the route returns a short fallback message so the UI still works in demo mode.
   - `OPENAI_BASE_URL` — optional; use if you proxy OpenAI-compatible APIs.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Dev server (Turbopack)   |
| `npm run build` | Production build        |
| `npm run start` | Start production server |
| `npm run lint` | ESLint                   |
| `npm run test` | Vitest (unit tests)      |

## Project layout

- `src/app/` — routes and UI (`onboarding`, `assessment`, `activities/*`, `companion`, etc.)
- `src/app/api/companion/route.ts` — streaming chat endpoint for the companion
- `src/lib/` — prompts, content, onboarding storage, scoring helpers
- `PRD.md` — product requirements and vision (draft)

## Contributing

Issues and pull requests are welcome. Please run `npm run lint` and `npm run test` before submitting changes.

## License

Follow the license shown on the repository’s main page on GitHub (add a `LICENSE` file when you choose one for the project).
