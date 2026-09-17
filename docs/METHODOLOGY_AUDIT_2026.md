# sENG methodology audit — September 2026

This document is the pre-merge audit of the learning model. It supplements `LEARNING_BLUEPRINT.md` with newer 2024–2026 evidence and records what must be implemented now versus later.

## Product rule

sENG optimizes for **durable comprehension and usable production**, not lesson completion, XP, streak preservation, or recognition-only success.

The core loop remains:

> Understand it → Retrieve it → Use it → Meet it again → Make it automatic.

## What is implemented in the foundation

### 1. Retrieval before reveal
The learner must attempt production before seeing the English answer. Audio is also withheld until after reveal so it cannot accidentally disclose the answer.

### 2. New material is separate from due review
A never-seen item is not counted as an overdue review. `new` and `due` queues have different semantics.

### 3. Modern spaced repetition
The hand-written prototype scheduler has been replaced with the maintained TypeScript implementation `ts-fsrs` (stable 5.4.2 at audit time). The app currently targets 90% requested retention, uses short-term learning/relearning steps and keeps the scheduler behind the learning-state boundary.

References:
- https://github.com/open-spaced-repetition/ts-fsrs
- https://open-spaced-repetition.github.io/ts-fsrs/
- https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm

### 4. Productive vocabulary direction
Seed vocabulary uses concept/L1 → English retrieval where appropriate instead of `reliable → reliable` recognition masquerading as recall.

### 5. Goal-aware ordering
The onboarding goal now changes the priority of unseen seed items. This is only a first heuristic; the later recommendation engine must combine goal, CEFR, frequency, personal encounters, errors and memory need.

### 6. Evidence-only progress
The product does not fabricate Reading, Listening, Speaking or Four-Strands percentages before those task types produce evidence. Current counters are derived from actual review history and memory state.

### 7. Honest feature states
Unimplemented Personal Inbox / listening / speaking features are clearly marked as future modules rather than presented as dead controls.

## High-priority methodology for the next slices

### Extensive reading is core, not optional
A 2025 meta-analysis found positive effects of extensive reading across reading comprehension, vocabulary, fluency/decoding, motivation, writing, oral proficiency and general proficiency, generally small to medium.

Product consequence:
- add a dedicated extensive-reading mode;
- select material near the learner's lexical coverage;
- minimize forced interruptions;
- permit tap-to-define and save-to-inbox;
- use light accountability such as a short reaction or retell, not a quiz after every paragraph.

Source: https://link.springer.com/article/10.1007/s10648-025-10068-6

### Captioned viewing should be adaptive scaffolding
The 2025 Language Learning meta-analysis synthesized 49 experiments / 89 effect sizes and found a medium positive effect of L2 captions on incidental vocabulary learning. Effects vary by learner/material factors, and beginner material requires extra care.

Product consequence:
- English captions are available by default as support, not permanent dependence;
- beginner material should be linguistically controlled and visually supportive;
- support can fade from captions → keyword help → no captions → transcript after attempt.

Source: https://onlinelibrary.wiley.com/doi/10.1111/lang.12697

### Mobile learning works when it is sustained
A 2025 ReCALL meta-analysis of 65 experimental/quasi-experimental studies found strong vocabulary-learning effects for mobile applications, especially in longer treatments (10+ weeks), while noting substantial heterogeneity.

Product consequence:
- mobile-first is not just a layout decision;
- optimize return sessions, low-friction review and long-term adherence;
- avoid manipulative streak mechanics that create short-term engagement without learning.

Source: https://www.cambridge.org/core/journals/recall/article/metaanalysis-on-mobileassisted-vocabulary-learning-do-mobile-applications-help/79C8F00E48D521ED3BCFE0625B5549F3

### Pronunciation needs explicit feedback, not a magic accent score
A ReCALL meta-analysis found a medium overall effect for ASR-supported pronunciation; explicit corrective feedback was stronger than indirect dictation-style feedback, and effects differed for segmental versus suprasegmental targets. A 2025 phonetic-training meta-analysis further supports targeted L2 phonetic training.

Product consequence:
- speech recognition must identify a small actionable target;
- train sounds, stress, rhythm/linking and intelligibility separately;
- never reduce pronunciation to one pseudo-precise “accent score”.

Sources:
- https://www.cambridge.org/core/journals/recall/article/effectiveness-of-automatic-speech-recognition-in-eslefl-pronunciation-a-metaanalysis/A915444CF252B61D14961D2FE733822D
- https://pubs.asha.org/doi/10.1044/2024_JSLHR-24-00432

### GenAI should perform structured language tasks
A 2025 meta-analysis of 41 experimental/quasi-experimental studies reported a positive effect of GenAI chatbots on second-language acquisition. A 2025/2026 systematic review and meta-analysis focused on task-based GenAI identified instructional moderators such as planning and assessment. A 2026 broader meta-analysis synthesizes 51 studies / 175 effect sizes.

Product consequence:
- AI is not an open-ended “chat with a bot” tab;
- every AI activity receives target language, task, level, correction policy and output schema;
- during fluency, corrections are delayed and selective;
- during accuracy practice, target errors can be corrected immediately;
- AI must distinguish incorrect from merely less natural.

Sources:
- https://onlinelibrary.wiley.com/doi/10.1111/jcal.70060
- https://link.springer.com/article/10.1007/s11528-025-01140-7
- https://link.springer.com/article/10.1007/s10791-026-10015-1

### Multimedia must not become cognitive clutter
A 2024 second-round meta-analysis supports multimedia glosses for L2 vocabulary but does not justify adding every possible modality to every item; some results favored simpler single-mode glossing for recognition outcomes.

Product consequence:
- use image/audio/context only when each channel adds useful information;
- do not decorate every card with redundant media;
- test delayed productive learning, not only immediate recognition.

Source: https://www.sciencedirect.com/science/article/pii/S000169182400218X

## Architecture consequences

The next production slices should be implemented in this order:

1. Personal Vocabulary Inbox with original encounter context.
2. Short adaptive diagnostic that samples vocabulary, grammar, reading/listening and later speech.
3. Reading player with coverage estimation and extensive-reading mode.
4. Listening/video player with adaptive L2 captions and tap-to-save language.
5. Recurring Error Notebook that turns personal mistakes into future retrieval tasks.
6. Speaking/pronunciation pipeline using ASR plus explicit, target-specific feedback.
7. Task-based AI conversation/writing engine with structured goals and delayed/selective correction.
8. Four-Strands event instrumentation so balance is calculated from real activity rather than guessed.
9. FSRS parameter optimization only after enough valid review history exists; defaults are used before that.

## Guardrails

Do not ship:
- new items disguised as due reviews;
- recognition-only cards presented as active recall;
- subtitles that can never be removed;
- open-ended AI chat without a learning target;
- pronunciation feedback based only on ASR transcription success;
- fabricated skill percentages;
- XP/streak mechanics that can be farmed without difficult retrieval;
- “all multimedia everywhere” card design;
- user-facing precision that exceeds the quality of the evidence.

## Merge conclusion

The foundation is suitable for device testing once CI is green. It is intentionally a **foundation**, not a claim that reading, listening, speaking and AI tutoring are already implemented. The code and UI must remain honest about that distinction.
