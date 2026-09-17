# sENG architecture — foundation

## Product identity

`sENG` is a standalone mobile-first English-learning web application. It is deliberately independent from the visual identity and implementation of the main Qsen site.

Approved visual systems:
- Modern Clean
- Cozy Notebook

Each supports light, dark and system color modes through semantic CSS tokens.

## Current vertical slice

The prototype currently implements:
- responsive application shell (phone + desktop)
- persistent theme preferences
- Today / Learn / Practice / Progress / Profile navigation
- vocabulary, chunks/collocations and irregular-verb seed content
- retrieval-before-reveal study flow
- local review event history
- FSRS-ready memory-state abstraction (stability, difficulty, due time)
- adaptive next-due calculation prototype
- browser TTS for English seed items
- local persistence
- installable PWA manifest and service worker shell
- CI typecheck and production build

## Deliberate boundaries

The current scheduler is a lightweight, testable memory model, **not a claim of exact FSRS implementation**. The API is designed so a validated FSRS engine can replace it without coupling scheduler math to React UI.

Likewise, voice recognition, server sync, authentication, canonical content storage and AI tutoring are kept behind future provider/service boundaries rather than being mocked into core state.

## Layers

- `src/data/` — canonical seed content for the prototype
- `src/lib/` — domain utilities (scheduler, persistence)
- `src/app/` — learner state and theme resolution
- `src/components/` — presentation and interaction surfaces
- `docs/LEARNING_BLUEPRINT.md` — pedagogical source of truth

## Next architectural steps

1. Add server-side identity + sync event log.
2. Replace local prototype content with versioned canonical content store.
3. Integrate validated FSRS scheduler adapter.
4. Add diagnostic/onboarding slice.
5. Add listening content player with fading transcript support.
6. Add personal vocabulary inbox.
7. Add recurring-error model.
8. Add AI tutor provider with structured task schemas.
