# sENG

**English that stays.**

`sENG` is a standalone, mobile-first English-learning application built around durable memory and real language use rather than XP farming or recognition-only quizzes.

## Product principles

> Understand it. Retrieve it. Use it. Meet it again. Make it automatic.

The learning design is documented in [`docs/LEARNING_BLUEPRINT.md`](docs/LEARNING_BLUEPRINT.md). The implementation intentionally separates learning logic from presentation so the scheduler, content system, speech providers and AI tutor can evolve independently.

## Approved UI directions

Both are first-class themes and both support Light / Dark / System:

- **Modern Clean** — crisp, contemporary and content-first.
- **Cozy Notebook** — warm, personal and tactile without sacrificing readability.

Phone is the primary learning device; desktop uses the same product model with a richer layout rather than a stretched mobile screen.

## Current foundation

- React + TypeScript + Vite
- mobile-first responsive app shell
- Today / Learn / Practice / Progress / Profile
- working retrieval study session
- words, chunks/collocations and irregular verbs
- local review history and memory states
- adaptive due-date prototype behind a scheduler abstraction
- browser text-to-speech
- local persistence
- PWA manifest + basic offline shell
- GitHub Actions CI

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
