# Product Requirements Document (PRD)
# AI-Enabled Learning App for Kids with Speech Delay

**Version:** 1.0
**Date:** 2026-03-31
**Status:** Draft

---

## 1. Problem Statement

An estimated 5–10% of preschool-aged children experience speech and language delays. Early intervention is critical — children who receive structured support before age 5 show significantly better outcomes. However:

- **Access gaps:** Speech-language pathologists (SLPs) are scarce in rural and underserved areas, with wait times of 6–12 months.
- **Cost barriers:** Private therapy sessions cost $100–250/hour, often with limited insurance coverage.
- **Practice consistency:** Children need daily repetition between therapy sessions, but parents lack the tools and training to guide structured practice at home.
- **Engagement:** Young children (ages 2–7) lose interest quickly with traditional drill-based exercises.

There is no widely available, AI-powered tool that provides personalized, engaging, and clinically informed speech practice for young children at home.

---

## 2. Vision

**An AI-powered companion app that makes speech practice fun, personalized, and accessible — helping children with speech delays build communication skills through play, while giving parents and therapists visibility into progress.**

The app is not a replacement for professional therapy. It is a daily practice tool that reinforces therapy goals, fills gaps between sessions, and provides early intervention for children on waitlists.

---

## 3. Target Users

### 3.1 Primary: Children (Ages 2–7)

- Children with mild-to-moderate speech delays (articulation, phonological, expressive language)
- Children on waitlists for SLP evaluation
- Children in active therapy who need daily home practice

### 3.2 Secondary: Parents / Caregivers

- Parents seeking guided activities to support their child's speech development
- Caregivers who are not trained in speech therapy techniques
- Parents in areas with limited access to SLPs

### 3.3 Tertiary: Speech-Language Pathologists (SLPs)

- Therapists who want to assign structured home practice
- Clinicians who want data on a child's practice between sessions

---

## 4. Goals & Success Metrics

| Goal | Metric | Target (6 months post-launch) |
|------|--------|-------------------------------|
| Daily engagement | Average sessions per week per active child | ≥ 4 sessions/week |
| Session duration | Average time per session | 8–15 minutes (age-appropriate) |
| Speech improvement | % of children showing measurable progress on targeted sounds | ≥ 60% |
| Parent satisfaction | NPS score from parent surveys | ≥ 50 |
| Retention | 30-day retention rate | ≥ 40% |
| Accessibility | % of users from underserved/rural areas | ≥ 25% |

---

## 5. Core Features

### 5.1 Onboarding & Speech Profile

**Purpose:** Understand the child's current speech abilities and create a personalized learning path.

- **Parent questionnaire:** Age, known diagnoses, sounds the child struggles with, languages spoken at home, therapy status.
- **AI speech assessment:** A short, game-like activity where the child names pictures or repeats words. The AI analyzes pronunciation to identify target sounds.
- **Speech profile:** Generated summary of the child's strengths and areas for improvement, mapped to a developmental milestone framework.
- **Goal setting:** Parents (or SLPs) can select focus areas (e.g., /r/ sound, two-word phrases, vocabulary expansion).

### 5.2 Interactive Practice Activities

**Purpose:** Daily speech practice disguised as play.

#### Activity Types

| Activity | Description | AI Role |
|----------|-------------|---------|
| **Picture Naming** | Child sees an image and says the word. AI listens and provides feedback. | Real-time speech recognition + pronunciation scoring |
| **Story Time** | Animated stories with pause points where the child fills in words or repeats phrases. | Contextual prompting, adaptive difficulty |
| **Sound Safari** | Scavenger hunt game — find objects that start with a target sound. | Speech recognition, positive reinforcement |
| **Conversation Practice** | AI character asks simple questions; child responds verbally. | Natural language understanding, dialogue management |
| **Sing-Along** | Songs with target sounds emphasized. Child sings along; AI tracks participation. | Audio analysis, rhythm matching |
| **Minimal Pairs** | "Is this a 'cat' or a 'cap'?" — listening discrimination games. | Audio playback, response evaluation |
| **Sentence Builder** | Child constructs sentences using visual word blocks, then reads them aloud. | Expressive language scaffolding |

#### Adaptive Difficulty

- Activities adjust in real time based on the child's performance.
- Mastered sounds are cycled less frequently; struggling sounds get more exposure.
- Difficulty progresses: single sounds → words → phrases → sentences → conversation.

### 5.3 AI Speech Analysis Engine

**Purpose:** Evaluate the child's speech in real time and provide feedback.

- **Pronunciation scoring:** Per-phoneme accuracy scoring, not just word-level pass/fail.
- **Error pattern detection:** Identify systematic patterns (e.g., fronting, stopping, cluster reduction) rather than isolated mistakes.
- **Child-speech model:** AI models trained/fine-tuned on child speech data (ages 2–7), not adult speech. This is critical — standard ASR systems perform poorly on young children's speech.
- **Feedback delivery:** Visual + audio feedback (e.g., character animations, stars, gentle verbal cues like "Try again — watch my mouth!"). Never punitive.
- **Noise tolerance:** Must handle background noise typical of home environments (siblings, TV, pets).

### 5.4 AI Companion Character

**Purpose:** Create an emotional connection that motivates daily practice.

- **Persistent character:** A friendly animated character (e.g., a talking animal) that the child interacts with across sessions.
- **Personality:** Warm, patient, encouraging. Uses simple language appropriate for the child's age.
- **Powered by LLM:** The character's dialogue is generated by a large language model, constrained to:
  - Age-appropriate vocabulary and topics
  - Therapeutic best practices (modeling correct pronunciation, expansion techniques)
  - Safety guardrails (no inappropriate content, no data collection through conversation)
- **Emotional responsiveness:** Character reacts to the child's mood cues (long pauses, repeated failures) with encouragement or activity switches.

### 5.5 Parent Dashboard

**Purpose:** Give parents visibility and control.

- **Progress tracking:** Visual charts showing which sounds/skills have been practiced, accuracy trends over time, and session frequency.
- **Activity log:** What the child did in each session, with pronunciation scores and AI feedback summary (no audio stored).
- **Recommendations:** AI-generated suggestions for what to practice next, activities to try offline, and when to consult a professional.
- **Settings:** Manage child profile, adjust difficulty, set session length limits, configure notification reminders.
- **Multi-child support:** Families with multiple children can manage separate profiles.

### 5.6 SLP Portal (Phase 2)

**Purpose:** Enable therapists to integrate the app into their practice.

- **Client linking:** SLP connects to a child's profile (with parent consent).
- **Goal assignment:** SLP sets specific therapy goals; the app generates activities aligned to those goals.
- **Progress reports:** Exportable reports with data on practice frequency, accuracy by sound, and error patterns.
- **Activity customization:** SLP can create custom word lists or activities for a specific child.

### 5.7 Reward & Motivation System

**Purpose:** Sustain engagement over weeks and months.

- **Stars and streaks:** Earn stars for completing activities; maintain daily streaks.
- **Character customization:** Unlock outfits, accessories, and environments for the AI companion.
- **Story progression:** Unlock new chapters in an ongoing story as the child practices.
- **Celebration moments:** Special animations and sounds for milestones (e.g., "You practiced the /s/ sound 100 times!").
- **No extrinsic pressure:** No leaderboards, no competition, no penalty for missing days.

---

## 6. Technical Architecture

### 6.1 Platform

- **Mobile-first:** iOS and Android (React Native or Flutter)
- **Web companion:** Parent dashboard and SLP portal as a Next.js web app
- **Offline support:** Core activities must work offline; sync when connected

### 6.2 AI Stack

| Component | Technology | Notes |
|-----------|-----------|-------|
| **Speech Recognition** | Custom child-speech ASR model (fine-tuned Whisper or similar) | Must handle child voices, accents, speech errors |
| **Pronunciation Scoring** | Phoneme-level forced alignment + scoring model | Compare child's utterance to target pronunciation |
| **Conversational AI** | LLM via AI Gateway (e.g., `anthropic/claude-sonnet-4.6`) | Character dialogue, activity narration, parent recommendations |
| **Text-to-Speech** | High-quality child-friendly TTS (e.g., ElevenLabs, Azure Neural TTS) | Character voice must be warm, clear, and consistent |
| **Image Generation** | AI-generated activity visuals (e.g., picture cards) | Pre-generated + on-demand for custom word lists |
| **Analytics/ML Pipeline** | Progress modeling, adaptive difficulty engine | Runs on backend; updates child's learning path |

### 6.3 Infrastructure

| Layer | Technology |
|-------|-----------|
| **Frontend (Mobile)** | React Native with Expo |
| **Frontend (Web)** | Next.js 16 (App Router) on Vercel |
| **API** | Next.js Route Handlers + Vercel Functions |
| **Database** | Neon Postgres (child profiles, progress data, activity logs) |
| **File Storage** | Vercel Blob (generated activity images — no audio stored) |
| **Authentication** | Clerk (parent accounts, SLP accounts) |
| **Real-time AI** | AI SDK v6 + AI Gateway (streaming responses) |
| **Background Jobs** | Vercel Workflow DevKit (progress report generation, model retraining triggers) |
| **Caching** | Upstash Redis (session state, activity queues) |
| **Monitoring** | Sentry (errors), Vercel Analytics (performance) |

### 6.4 Data Architecture

**Zero-PII Design Principle:** The system never stores personally identifiable information for children. All child data is referenced through opaque, system-generated identifiers. No names, photos, birth dates, school names, or biometric data are persisted.

```
Parent Account (Clerk — parent email + auth only)
├── Child Profile 1 (system-generated UUID — NO name, DOB, photo, or PII stored)
│   ├── Age Bracket (e.g., "3–4 years" — not exact date of birth)
│   ├── Speech Profile (target sounds, current level, error patterns)
│   ├── Learning Path (ordered sequence of activities)
│   ├── Session History
│   │   ├── Session 1
│   │   │   ├── Activity log (what was practiced)
│   │   │   ├── Pronunciation scores (per-phoneme accuracy, numerical only)
│   │   │   └── AI feedback given
│   │   └── Session N...
│   ├── Progress Metrics (aggregated trends, no raw audio retained)
│   └── Rewards (stars, unlocks, streaks)
├── Child Profile 2...
└── Settings (notifications, session limits, language)
```

**Audio processing model:** All speech audio is processed in real time on-device or via ephemeral server-side analysis. Raw audio is **never persisted** to any database or file store. Only numerical scores and phoneme-level accuracy metrics are retained. This eliminates biometric data storage entirely.

---

## 7. Privacy, Safety & Ethics

### 7.0 Zero-PII Architecture (Foundational Principle)

**The app does not collect, store, or process any Personally Identifiable Information (PII) for children.** This is a design-level decision, not a policy overlay.

| Data Category | Approach |
|---------------|----------|
| **Child's name** | Never collected. Child profiles use parent-chosen display labels stored only on-device (not synced to server). AI companion uses a generic greeting (e.g., "Hey buddy!") |
| **Date of birth** | Never collected. Parent selects an age bracket (e.g., "3–4 years") during onboarding |
| **Photos / Videos** | Never collected. No camera access requested |
| **Voice / Audio** | Processed ephemerally in real time (on-device or streaming to server). **Never stored.** Only numerical pronunciation scores are retained |
| **Location** | Never collected. No GPS/location permissions requested |
| **Device identifiers** | Not linked to child profiles. Only anonymous analytics (if parent opts in) |
| **Biometric data** | Not applicable — voice audio is not retained, so no voiceprint is created |
| **School / Contacts** | Never collected. AI companion is constrained from asking for this information |

**Why this matters:** By not collecting PII in the first place, we eliminate entire categories of compliance risk (breach notification, right-to-erasure complexity, cross-border transfer restrictions). This is the strongest privacy posture possible — **you can't leak what you don't have.**

### 7.1 India DPDP Act Compliance (Critical)

The Digital Personal Data Protection Act, 2023 (India) classifies children (under 18) as a protected category with heightened requirements. Our compliance strategy:

- **Verifiable parental consent (Section 9):** Before a child can use the app, the parent/legal guardian must provide verifiable consent. Implementation: parent creates account with email verification → confirms they are the legal guardian → accepts data processing terms. For additional assurance, OTP-based verification to the parent's registered mobile number.
- **No tracking or behavioral monitoring of children (Section 9(3)):** The app does not perform behavioral profiling, targeted advertising, or any tracking that could cause detrimental effects to the child. The adaptive difficulty engine uses only in-session performance data (scores), not behavioral patterns.
- **No profiling children (Section 9(3)):** The speech profile is a clinical assessment tool (which sounds the child struggles with), not a behavioral or psychological profile. It contains no PII and cannot identify the child.
- **Data Processing Purpose Limitation (Section 4):** Data is processed solely for the stated purpose — speech practice and progress tracking. No secondary use, no selling, no sharing with third parties.
- **Right to Erasure (Section 12):** Parent can delete all child profile data (scores, learning path, rewards) at any time from the app. Deletion is immediate and irreversible. Since we store no PII or audio, erasure is straightforward.
- **Data Fiduciary obligations (Section 8):** Implement reasonable security safeguards — encryption at rest and in transit, access controls, regular security audits.
- **Data Protection Officer:** Appoint a DPO as required when processing children's data at scale.
- **Data localization:** Store Indian users' data on servers within India (or in jurisdictions permitted under DPDP Act). Neon Postgres supports region selection.
- **Consent dashboard:** Parents can view, modify, and withdraw consent at any time from the parent dashboard.

### 7.2 COPPA Compliance (US Market)

- **No direct data collection from children under 13** without verifiable parental consent.
- **Parental consent flow:** Parent must create the account and explicitly consent before the child uses the app.
- **Minimal data collection:** Only collect data necessary for the app to function (pronunciation scores, progress metrics). No PII, no audio retention.
- **No advertising.** No third-party tracking. No data selling.
- **Safe harbor:** Consider participation in an FTC-approved COPPA Safe Harbor program (e.g., kidSAFE, PRIVO).

### 7.3 Global Privacy Compliance Matrix

| Regulation | Region | Key Requirement | Our Approach |
|-----------|--------|----------------|--------------|
| **DPDP Act** | India | Verifiable parental consent, no tracking/profiling children, DPO appointment | Zero-PII architecture, consent flows, DPO |
| **COPPA** | USA | Verifiable parental consent, data minimization | No PII collected, parent-gated access |
| **GDPR (Art. 8)** | EU/EEA | Parental consent for children under 16, DPIA required | Zero-PII eliminates most GDPR risk; DPIA conducted |
| **UK Age Appropriate Design Code** | UK | Best interests of child, data minimization, no nudge techniques | No dark patterns, no engagement manipulation, no PII |
| **PIPL** | China | Separate parental consent, necessity principle | Evaluate if/when entering China market |

### 7.4 Content Safety

- All AI-generated character dialogue is filtered through safety guardrails.
- Character cannot discuss topics outside of speech practice, encouragement, and age-appropriate conversation.
- Character is **explicitly constrained from asking for any personal information** (name, address, school, family details, etc.).
- All activity content (images, words, stories) is pre-reviewed for age-appropriateness.
- AI companion system prompt includes hard-coded safety rules that cannot be overridden by user input.

### 7.3 Clinical Responsibility

- **Clear disclaimer:** The app is not a diagnostic tool and does not replace professional evaluation or therapy.
- **Escalation prompts:** If the AI detects patterns suggesting a more serious condition (e.g., consistent regression, signs of apraxia), it notifies the parent and recommends professional evaluation.
- **Evidence-based approach:** Activity design is informed by established speech therapy methodologies (e.g., cycles approach, minimal pairs therapy, naturalistic intervention).
- **Advisory board:** Clinical advisory board of SLPs reviews activity content and AI behavior.

### 7.4 Accessibility

- Support for multilingual families (initial: English, Spanish; planned: Hindi, Mandarin, Arabic).
- Visual and auditory cues for children with hearing or visual impairments.
- Simple, large-target UI suitable for young children with developing motor skills.
- Support for AAC (Augmentative and Alternative Communication) integration in Phase 2.

---

## 8. User Flows

### 8.1 First-Time Setup (Parent)

```
Download App → Create Parent Account (Clerk) → Consent & Privacy Agreement
→ Add Child Profile (name, age, languages)
→ Parent Questionnaire (known diagnoses, therapy status, concern areas)
→ Child Speech Assessment (5-minute game)
→ AI generates Speech Profile & Learning Path
→ Parent reviews recommendations → Child starts first activity
```

### 8.2 Daily Practice Session (Child)

```
Open App → Character greets child by name
→ Character suggests today's activity (based on learning path)
→ Child plays activity (8–15 minutes)
│   ├── AI listens to speech attempts
│   ├── Provides real-time visual/audio feedback
│   ├── Adjusts difficulty dynamically
│   └── Awards stars and encouragement
→ Session summary (stars earned, sounds practiced)
→ Character says goodbye with a preview of tomorrow's activity
→ Parent receives session summary notification
```

### 8.3 Parent Reviews Progress

```
Open Parent Dashboard → View weekly progress summary
→ Drill into specific sounds/skills
→ Listen to audio playback of child's attempts
→ Read AI recommendations
→ Adjust goals or settings if needed
```

---

## 9. Phased Roadmap

### Phase 1: MVP (Months 1–4)

**Goal:** Validate core engagement and speech analysis accuracy.

- [ ] Parent onboarding + child profile creation
- [ ] Speech assessment (basic — 10 target words)
- [ ] 3 activity types: Picture Naming, Sound Safari, Minimal Pairs
- [ ] AI speech recognition (English only, child-speech optimized)
- [ ] Pronunciation scoring (word-level accuracy)
- [ ] AI companion character (scripted dialogue with LLM augmentation)
- [ ] Basic reward system (stars, streaks)
- [ ] Parent dashboard (progress charts, session log)
- [ ] COPPA-compliant data handling
- [ ] iOS + Android (React Native)

### Phase 2: Personalization & SLP Integration (Months 5–8)

- [ ] Phoneme-level pronunciation scoring
- [ ] Error pattern detection (fronting, stopping, etc.)
- [ ] Adaptive learning path engine
- [ ] 4 additional activity types: Story Time, Conversation Practice, Sing-Along, Sentence Builder
- [ ] SLP portal (client linking, goal assignment, progress reports)
- [ ] Custom word list support
- [ ] Hindi and regional language support (India-first)
- [ ] Spanish language support
- [ ] Offline mode with on-device speech processing
- [ ] Web app (parent dashboard + SLP portal)

### Phase 3: Scale & Impact (Months 9–12)

- [ ] Advanced AI companion (fully LLM-powered, emotionally responsive)
- [ ] Character customization and story progression
- [ ] Additional languages (Hindi, Mandarin, Arabic)
- [ ] AAC integration
- [ ] Teletherapy integration (SLP can observe live sessions)
- [ ] Research partnerships (clinical validation studies)
- [ ] Freemium model launch
- [ ] Community features (parent forums, therapist directory)

---

## 10. Business Model

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | 1 child profile, 1 activity/day, basic progress tracking |
| **Family** | $9.99/month | Unlimited children, unlimited activities, full dashboard, detailed progress analytics, offline mode |
| **Family + SLP** | $14.99/month | Everything in Family + SLP portal access, custom goals, exportable reports |
| **SLP Pro** | $29.99/month (per clinician) | Manage up to 30 clients, bulk reporting, custom activity creation, white-label option |

**Pricing philosophy:** Keep the free tier meaningful enough to provide value to underserved families. Partnerships with school districts and nonprofits for subsidized access.

---

## 11. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Child-speech ASR accuracy is insufficient | Core product fails | Medium | Invest in child-speech training data; partner with research labs; use phoneme-level analysis rather than full ASR |
| COPPA / DPDP Act violation | Legal/reputational disaster | Low (zero-PII architecture greatly reduces surface area) | Zero-PII by design; engage COPPA + DPDP legal counsel from day 1; implement verifiable parental consent flows; appoint DPO; regular audits; consider kidSAFE certification |
| Parents expect diagnostic capability | Misuse, liability | High | Clear disclaimers throughout UX; never use diagnostic language; recommend professional evaluation proactively |
| Low engagement after novelty wears off | Retention drops | Medium | Invest in narrative progression, character depth, and parent involvement features; study engagement data weekly |
| AI companion says something inappropriate | Trust destruction | Low | Strict output filtering; constrained system prompts; human review of conversation logs (with consent); kill switch |
| SLPs resist/distrust the tool | Phase 2 fails | Medium | Involve SLPs in design from day 1; position as practice tool, not replacement; build trust through transparency and clinical advisory board |

---

## 12. Open Questions

1. **Training data:** Where do we source child-speech audio data for ASR fine-tuning? Options: academic datasets (e.g., CHILDES), partnerships with universities, or synthetic data augmentation. Note: our zero-PII policy means we cannot use our own users' audio for training without a separate, explicit consent flow and anonymization pipeline.
2. **Clinical validation:** Should we pursue a formal clinical study before or after MVP launch? A pre-launch pilot with 50 families + 5 SLPs is recommended.
3. **Device access:** What percentage of target families have access to smartphones/tablets with decent microphones? This affects offline-first vs. cloud-first architecture decisions.
4. **Regulatory:** Beyond COPPA and DPDP Act, do we need to consider FDA classification (US) or CDSCO classification (India) if the app is marketed for therapeutic use? (Likely yes if we claim clinical outcomes — consult regulatory counsel in both jurisdictions.)
5. **Monetization timing:** Should the free tier be available from day 1, or should we launch as paid-only to validate willingness-to-pay?
6. **DPDP Act data localization:** The DPDP Act may require data to be stored in India for Indian users. Evaluate Neon Postgres region availability in India (Mumbai region) and implement geo-routing of user data accordingly.
7. **On-device vs. cloud speech processing:** To strengthen the zero-PII posture, evaluate whether speech recognition can run entirely on-device (e.g., using on-device Whisper models). This eliminates even ephemeral audio transmission to servers.

---

## 13. Appendix

### A. Competitive Landscape

| Product | Strengths | Gaps |
|---------|-----------|------|
| **Speech Blubs** | Fun activities, large library | Limited AI personalization, no SLP integration |
| **Articulation Station** | Clinician-designed, structured | Not engaging for young children, no AI |
| **LAMP Words for Life** | AAC-focused, evidence-based | Not for speech delay specifically |
| **Constant Therapy** | Data-driven, therapist dashboard | Adult-focused, not for children |

**Our differentiation:** AI-powered personalization + child-optimized speech recognition + engaging companion character + SLP integration — no existing product combines all four.

### B. References

- American Speech-Language-Hearing Association (ASHA) — Practice guidelines for childhood speech disorders
- CHILDES (Child Language Data Exchange System) — Research database
- FTC COPPA Rule — Children's Online Privacy Protection Act compliance guide
- Cycles Phonological Remediation Approach (Hodson & Paden)
- Naturalistic Developmental Behavioral Interventions (NDBIs)
