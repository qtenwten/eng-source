# sENG — Evidence-Based Learning Blueprint

**Status:** source of truth for product and learning design  
**Product:** sENG  
**Primary surface:** mobile-first web/PWA, high-quality desktop adaptation

## 1. Locked decisions

### Visual systems
Two equal first-class themes are approved:

1. **Modern Clean** — crisp, contemporary, content-first, high readability.
2. **Cozy Notebook** — warm, personal, tactile, journal-like without sacrificing speed or legibility.

Both support **Light / Dark / System**. Theme is presentation only; curriculum and functionality remain identical.

### Product philosophy
sENG is not a Duolingo clone. It must not optimize primarily for XP, streak pressure, recognition-only questions or lesson completion.

Primary target:

> **Long-term ability to understand and produce real English.**

Product mantra:

> **Understand it. Retrieve it. Use it. Meet it again. Make it automatic.**

---

## 2. Evidence hierarchy

When product ideas conflict, prefer:

1. systematic reviews / meta-analyses;
2. CEFR and other established proficiency frameworks;
3. peer-reviewed second-language acquisition research;
4. corpus/frequency evidence;
5. established university language-learning frameworks;
6. high-quality teaching practice;
7. our own learner analytics;
8. gamification/preferences.

Engagement supports learning. It does not replace learning.

---

## 3. Curriculum backbone

### CEFR as public progression
Use CEFR A1–C2, but never reduce a learner to one decorative level. Track a skill profile:

- listening;
- reading;
- spoken interaction;
- spoken production;
- writing;
- vocabulary / lexicogrammar;
- pronunciation;
- fluency.

Progress should be expressed through meaningful abilities (“Can describe a past event”) rather than only counters (“240 cards completed”).

### Nation's Four Strands
Across rolling 7- and 30-day windows, aim for approximate balance:

- **Meaning-focused input** ~25% — reading/listening/video/stories;
- **Meaning-focused output** ~25% — speaking/writing/retelling/tasks;
- **Language-focused learning** ~25% — vocabulary/grammar/pronunciation/spelling/SRS;
- **Fluency development** ~25% — known language used faster and more automatically.

This is a curriculum balance, not a rigid formula for every session.

---

## 4. The core language model

### A word is not known/unknown
A lexical item may be strong in reading but weak in listening or productive use. Track multiple dimensions where useful:

- written recognition;
- audio recognition;
- meaning recognition;
- meaning → English recall;
- spelling;
- pronunciation;
- grammatical behavior;
- collocations;
- contextual comprehension;
- productive contextual use;
- automaticity.

### Primary learning unit: lexical concept
First-class item types:

- word sense;
- phrasal verb;
- collocation;
- formulaic chunk;
- idiom;
- grammar pattern;
- irregular-verb paradigm;
- pronunciation contrast;
- sentence frame.

Examples:

```text
reliable
figure out
make a decision
as far as I know
go / went / gone
have been + V-ing
It took me ___ to ___.
```

Do not turn a polysemous word into one giant dictionary card.

---

## 5. Vocabulary selection

Do not teach a random dictionary. Priority should combine:

- contemporary frequency;
- CEFR relevance;
- usefulness across contexts;
- learner goals/interests;
- prior encounters;
- personal imports;
- error frequency;
- collocation/chunk value;
- coverage benefit.

For reading/viewing selection, estimated lexical coverage can guide difficulty. A comfortable mode should usually contain mostly known language; research commonly places useful coverage around 95–98% depending on task, with ~98% a useful heuristic for comfortable independent reading.

Personal encounters (“I saw this in a film/game/video/message”) should receive a relevance bonus.

---

## 6. Spaced repetition and retrieval

### Scheduler architecture
Use a scheduler abstraction designed for a validated **FSRS-style** memory model with concepts such as difficulty, stability and retrievability. Do not hardwire learning UI to scheduler math.

The prototype may use a lightweight model, but production should integrate a tested scheduler and later personalize it from review history.

### Review data
Capture more than correct/incorrect where practical:

- correctness;
- response latency;
- hint use;
- attempts;
- modality;
- spelling / semantic error type;
- user rating as supplementary input.

### Retrieval before reveal
For recall tasks:

1. cue;
2. learner attempts retrieval;
3. answer/feedback appears;
4. future successful retrieval is scheduled.

Recognition-only multiple-choice must not dominate the product.

### Multi-direction practice
Depending on level and target:

- English → meaning;
- Russian/concept → English;
- audio → meaning;
- context gap → English;
- picture/concept → English;
- free sentence production.

---

## 7. Daily learning engine

The home screen has one dominant action: **Continue learning**.

A session is assembled dynamically from:

- overdue items;
- weak items;
- new material;
- current grammar patterns;
- input activity;
- output activity;
- fluency activity;
- learner goals;
- recent errors;
- available time.

Suggested time choices: 5 / 10 / 15 / 25 minutes / custom.

A 20-minute session could mix review, 4–6 new lexical items, one grammar/verb target, listening, productive recall and short speaking. This is an example, not a fixed recipe.

End-of-session feedback should explain what strengthened, what remains weak and what is likely due next — not only award XP.

---

## 8. Required modules

### Vocabulary
Each item can include lemma, part of speech, IPA/audio, CEFR, concise meaning, Russian gloss, English definition, examples, collocations, word family, register, common mistakes, related phrases and original encounter.

Progression:

**Encounter → Recognition → Recall → Context → Production → Automaticity**

### Irregular verbs
Do not make a dead table the primary method. Teach forms through retrieval and context:

```text
go — went — gone
Yesterday I went home early.
I've already gone through the report.
```

Track forms separately and practice completion, audio identification, tense choice, transformation and timed recall.

### Collocations
Treat natural combinations as first-class curriculum:

```text
make a decision
heavy rain
take responsibility
highly likely
```

Distinguish incorrect, possible-but-unusual, common/natural and register-dependent choices.

### Chunks / formulaic language
Examples:

```text
as far as I know
it depends on
I was about to...
the thing is...
it turns out that...
```

Chunks should be retrievable units and may later be decomposed grammatically.

### Phrasal verbs
Teach by sense and context, not alphabetical lists. Separate meanings of items such as `take off` and include transitivity/separability where useful.

### Grammar patterns
Grammar can be explicit and contextual:

1. observe examples;
2. concise explanation;
3. contrast;
4. controlled practice;
5. contextual retrieval;
6. production;
7. spaced revisit;
8. use in listening/speaking.

Repeated errors such as `depend from → depend on` or `didn't went → didn't go` become future personalized exercises.

### Listening
Use fading support:

1. audio/video;
2. optional English captions;
3. keyword hints;
4. no captions;
5. replay segment;
6. transcript after attempt.

Transcript words should be tappable for contextual meaning, pronunciation and saving to review.

### Pronunciation
Optimize for comprehensibility and useful control, not “accent erasure”. Train phoneme contrasts, word stress, sentence stress, reductions, linking, rhythm and intonation.

Workflow: hear → discriminate → imitate → record → compare → focused feedback → repeat in phrase → use spontaneously.

Avoid presenting a single AI “accent score” as objective truth.

### Speaking / AI tutor
The AI is a **task generator + conversational partner + feedback layer**, not just an open chatbot.

A speaking task receives structured context:

- learner level;
- target chunks;
- target grammar;
- known/unknown items;
- recent errors;
- scenario;
- feedback policy.

During fluency work, avoid interrupting every mistake; collect a few high-value corrections. During accuracy drills, immediate correction may be appropriate.

Separate **wrong** from **less natural**.

### Writing
Do not simply rewrite learner text perfectly. Prefer a small number of high-value corrections, explanation, learner self-correction and later spaced revisit of recurring errors.

### Reading
Support graded microtexts, stories, dialogues, articles, learner-interest content and later authentic material. Include level/coverage estimate, tap-to-define, optional audio, comprehension and retelling.

Create a low-interruption extensive-reading mode for reading for pleasure.

### Fluency
Fluency requires explicit practice using mostly known language:

- timed rereading;
- repeated listening;
- repeated storytelling;
- 4/3/2-style speaking adaptations;
- rapid retrieval;
- speed reading with comprehension checks;
- shadowing with understandable material.

---

## 9. Personal Vocabulary Inbox

Capture English from real life:

- typed word/phrase;
- pasted sentence;
- subtitle;
- webpage text;
- later: screenshot OCR / share sheet / voice note.

Store original encounter context and enrich it with meaning, audio, level, collocations and examples.

---

## 10. Error Notebook

Recurring mistakes are a central personalized asset, not a hidden analytics table.

Each error stores:

- incorrect pattern;
- preferred correction;
- explanation;
- contexts/examples;
- first/last seen;
- frequency;
- mastery;
- next scheduled practice.

Example:

```text
depend from ✕
depend on   ✓
Seen incorrectly: 4 times
```

---

## 11. Diagnostics and progression

First launch should avoid a huge exam. Use progressive diagnostics: vocabulary sample, grammar/pattern sample, short reading, short listening, optional speech and learner goals.

Initial level can be provisional (for example A2–B1) and should continue updating from actual use.

Do not let one failed flashcard lower “English level”. Internally keep uncertainty; externally show useful skill-level evidence rather than fake precision.

---

## 12. Adaptive recommendation model

Conceptual learner state:

```text
learner_state {
  proficiency_by_skill
  lexical_memory
  grammar_patterns
  pronunciation_targets
  recurring_errors
  interests
  goals
  time_budget
  review_load
  four_strands_balance
}
```

The recommendation engine should maximize expected learning gain × relevance × retention need × transfer value × completion probability, subject to time, balance, cognitive load and review-overload limits.

---

## 13. Motivation without manipulation

Allowed: optional streaks, meaningful milestones, skill maps, weekly reflection, personal records and gentle celebrations.

Avoid guilt notifications, streak hostage mechanics, fake scarcity, punitive missed days, XP grinding, default leaderboards and artificially easy recognition questions.

A missed day does not erase learning.

---

## 14. Mobile-first UX

Phone is primary:

- one-handed navigation;
- large tap targets;
- minimal typing except where pedagogically useful;
- thumb-reachable audio controls;
- safe-area support;
- keyboard-aware layouts;
- fast resume;
- no tiny desktop tables.

Suggested primary nav:

**Today · Learn · Practice · Progress · Profile**

Desktop should use additional space for richer dictionary panels, transcripts, conversation feedback and analytics rather than stretching the phone UI.

Accessibility target: WCAG 2.2 AA, visible focus, keyboard support, screen-reader semantics, reduced motion, captions/transcripts and no color-only correctness signals.

---

## 15. Theme system

Use semantic tokens (`bg`, `surface`, `text`, `border`, `accent`, `success`, `warning`, `danger`, `focus`) so learning logic never depends on theme colors.

Modern Clean Dark should be restrained and readable, not gaming neon.

Cozy Notebook Dark should feel like a warm charcoal notebook/desk atmosphere, not simply “paper painted black”.

---

## 16. AI, speech and content architecture

Abstract providers for TTS, STT and pronunciation analysis so vendors can be swapped.

AI outputs used for teaching should receive structured inputs and, where feasible, structured/validated outputs. Canonical high-value learning content should be curated and versioned rather than regenerated from scratch on every request.

Potentially sensitive voice recordings, writing samples and conversation logs require clear recording indicators, retention controls, deletion/export and data minimization.

---

## 17. MVP phases

### MVP 1 — learning core
- responsive shell;
- Modern Clean + Cozy Notebook;
- Light/Dark/System;
- onboarding / provisional diagnostic;
- vocabulary + chunks + irregular verbs;
- basic grammar patterns;
- adaptive SRS layer;
- due reviews;
- personal inbox;
- progress;
- error notebook;
- TTS;
- desktop adaptation.

### MVP 2 — comprehensible input
- reading player;
- listening player;
- transcript/captions;
- tap-to-save;
- personalized coverage/difficulty;
- extensive reading mode.

### MVP 3 — productive language
- writing;
- AI conversation;
- STT;
- structured feedback;
- pronunciation practice.

### MVP 4 — adaptive tutor
- skill models;
- Four Strands balancing;
- content graph;
- advanced recommendations;
- personalized error curriculum;
- scheduler parameter optimization from real data.

---

## 18. Technical principles

- TypeScript end-to-end where practical;
- PWA-friendly and offline-capable review queue;
- local optimistic state + later server sync;
- versioned content;
- database migrations from day one when backend arrives;
- analytics schema before large-scale implementation;
- no learning/business logic embedded in visual components;
- deterministic exercise scoring where possible;
- AI must never be the only source of truth.

---

## 19. What sENG explicitly should not become

Do not build:

- translation-only vocabulary lists;
- 90% multiple choice;
- endless new material without review;
- XP economy hiding weak learning;
- one global known/unknown word flag;
- permanent subtitles;
- grammar encyclopedia disconnected from use;
- AI that fixes text without teaching;
- magic accent scores;
- random idiom lists;
- giant irregular-verb tables as the core method;
- streak punishment;
- desktop UI squeezed onto a phone.

---

## 20. Key research/reference backbone

The product blueprint was synthesized from major frameworks and peer-reviewed evidence including:

- Council of Europe — **CEFR Companion Volume (2020)** and CEFR descriptors;
- ACTFL Proficiency Guidelines;
- English Profile / English Vocabulary Profile / English Grammar Profile;
- Paul Nation — **The Four Strands** and vocabulary-learning research;
- Cepeda et al. — distributed practice meta-analysis;
- Kim & Webb — spaced practice in second-language learning meta-analysis;
- Webb, Yanagisawa & Uchihara — intentional vocabulary-learning meta-analysis;
- Nation; Schmitt, Jiang & Grabe; van Zeeland & Schmitt — lexical coverage research;
- Norris & Ortega; Spada & Tomita; Li & Sun — L2 instruction / explicit instruction research;
- Bryfonski & McKay — task-based language teaching meta-analysis;
- Boers & Lindstromberg — formulaic sequences;
- Montero Perez et al.; Kurokawa — captioned video/listening research;
- extensive-reading meta-analytic evidence;
- Saito & Plonsky — pronunciation teaching meta-analysis;
- Kang & Han; Lyster, Saito & Sato — corrective feedback;
- mobile-assisted vocabulary-learning meta-analysis;
- Sailer & Homner — gamification meta-analysis;
- Open Spaced Repetition / FSRS documentation and benchmark work.

The detailed research synthesis that preceded implementation should continue to be expanded as sENG moves from prototype to production. New product decisions should cite the relevant evidence in issues/ADRs when they materially alter the learning model.

---

## 21. Definition of success

sENG succeeds when sustained use produces better delayed recall, larger usable vocabulary, stronger listening, more natural chunks/collocations, more accurate spontaneous grammar, faster retrieval, better reading fluency, more comprehensible speaking, fewer recurring personal errors and transfer to unfamiliar real contexts.

It does **not** succeed merely because DAU, streak length, lesson count or XP increase.

**Learning outcomes are the product.**
