# sENG architecture — foundation

## Product identity

`sENG` is a standalone mobile-first English-learning web application. It is deliberately independent from the visual identity and implementation of the main Qsen site.

Approved visual systems:
- Modern Clean
- Cozy Notebook

Each supports light, dark and system color modes through semantic CSS tokens.

## Current vertical slice

The foundation currently implements:
- responsive application shell (phone + desktop)
- persistent theme preferences
- first-run goal/time/level onboarding
- Today / Learn / Practice / Progress / Profile navigation
- vocabulary, chunks/collocations and irregular-verb seed content
- retrieval-before-reveal study flow
- separate new and due queues
- goal-aware ordering of unseen content
- local review event history
- maintained `ts-fsrs` scheduler with persisted card state
- evidence-only learning statistics and practice streak
- browser TTS after answer reveal
- versioned local persistence
- installable PWA manifest and offline shell
- CI typecheck and production build

## Scheduler boundary

The application uses the stable `ts-fsrs` package rather than maintaining hand-written spaced-repetition equations. FSRS parameters and card state remain isolated in `src/lib/srs.ts` so later parameter optimization, server sync, analytics and migrations do not leak into React presentation code.

The initial requested retention is 0.90. This is a product default, not a claim that 90% is universally optimal. Parameter optimization should only be introduced after there is enough trustworthy review history.

## Honest evidence boundary

The app must never create skill precision from data it has not collected. Vocabulary/review evidence is available in the current slice; Listening, Speaking, Reading and Four-Strands balance remain explicitly unmeasured until their corresponding activity events exist.

Voice recognition, server sync, authentication, canonical content storage and AI tutoring remain future provider/service boundaries rather than mocked functionality.

## Layers

- `src/data/` — canonical seed content for the foundation
- `src/lib/` — scheduler and persistence boundaries
- `src/app/` — learner state, derived queues/statistics and theme resolution
- `src/components/` — presentation and interaction surfaces
- `docs/LEARNING_BLUEPRINT.md` — broad pedagogical source of truth
- `docs/METHODOLOGY_AUDIT_2026.md` — current evidence refresh and implementation guardrails

## Next architectural steps

1. Add Personal Vocabulary Inbox with original encounter context.
2. Add short adaptive diagnostic.
3. Add server-side identity + sync event log.
4. Replace prototype seed content with a versioned canonical content store.
5. Add reading player with coverage estimation and extensive-reading mode.
6. Add listening/video player with fading L2-caption support.
7. Add recurring-error model.
8. Add ASR pronunciation provider with explicit target-specific feedback.
9. Add task-based AI tutor provider with structured schemas and correction policy.
10. Instrument Four-Strands activity events from real input/output/fluency work.
