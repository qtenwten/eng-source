# sENG

**English that stays.**

`sENG` is a standalone, mobile-first English-learning application built around durable memory and real language use rather than XP farming or recognition-only quizzes.

## Product principles

> Understand it. Retrieve it. Use it. Meet it again. Make it automatic.

The learning design is documented in [`docs/LEARNING_BLUEPRINT.md`](docs/LEARNING_BLUEPRINT.md). The September 2026 evidence refresh is in [`docs/METHODOLOGY_AUDIT_2026.md`](docs/METHODOLOGY_AUDIT_2026.md).

## Approved UI directions

Both are first-class themes and both support Light / Dark / System:

- **Modern Clean** — crisp, contemporary and content-first.
- **Cozy Notebook** — warm, personal and tactile without sacrificing readability.

Phone is the primary learning device; desktop uses the same product model with a richer layout rather than a stretched mobile screen.

## Current foundation

- React + TypeScript + Vite
- mobile-first responsive app shell
- Today / Learn / Practice / Progress / Profile
- first-run goal/time/level onboarding
- working retrieval-before-reveal study sessions
- separate new-material and due-review queues
- goal-aware ordering of unseen material
- words, chunks/collocations and irregular verbs
- `ts-fsrs` 5.4.2 scheduling with persisted card state
- evidence-only progress counters and real practice streaks
- browser text-to-speech after answer reveal
- versioned local persistence
- PWA manifest + offline shell
- GitHub Actions typecheck + production build

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for technical boundaries and next steps.

## Development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run check
npm run build
```

## Deployment

The Vite base is relative (`./`) so the build can be mounted under a path such as `qsen.ru/englearning/` or deployed independently. Hosting and DNS integration are intentionally separate from the application repository.
