# sENG — Learning Integrity Audit

**Date:** 2026-09-17  
**Scope:** production logic, learning methodology, content semantics, progress claims, mobile-first learning flows and persistence.

## Principle

This audit does not add mechanics because they are fashionable. A change is included only when it fixes a concrete bug, removes a misleading claim, or makes an existing learning mechanism better aligned with evidence.

## Material findings fixed in this audit

### 1. Review sessions could skip cards

The session queue previously came from the live `due/new` arrays. After rating a card, that card could leave the parent queue while the session index also advanced, causing the next card to be skipped.

**Fix:** freeze the selected queue at session start. FSRS may update future scheduling without mutating the current session order.

### 2. Short-term FSRS reviews did not become due while the app stayed open

`isDue()` depended on `Date.now()` but the derived queue was memoized only from learner state. A 10-minute learning/relearning step could remain invisible until another state change or reload.

**Fix:** a lightweight 30-second learning clock refreshes due queues and error queues.

### 3. “Active vocabulary” was being inferred from flashcards

Recognition/retrieval cards are useful memory evidence, but they are not direct evidence that a learner can produce an item in communication.

**Fix:** card reviews can establish recognition/recall. A productive use in a speaking/writing task establishes contextual use. Active use requires productive evidence on at least two different days.

### 4. Error practice revealed the answer before retrieval

The previous Error Notebook displayed incorrect and corrected forms together, then asked whether the learner remembered the correction.

**Fix:** when an error is due, the correction is hidden until the learner attempts retrieval. Corrective feedback follows the attempt. A failed error returns after a short interval; successful retrieval receives a longer interval.

### 5. Productive-task target matching rejected natural inflections

A target such as `figure out` did not count `figured out`; `turn out` did not count `turned out`.

**Fix:** transparent lexical variant matching for high-value current targets. This is still explicitly a heuristic, not an AI language judgment.

### 6. Early task practice could postpone the intended spaced return

Submitting the same speaking/writing task early reset `nextDueAt`, allowing repeated early practice to continually move the intended return date.

**Fix:** optional early practice is allowed, but it does not move an already-future scheduled return.

### 7. Listening could be completed before listening

The interface allowed transcript reveal/completion without enforcing an audio attempt, and one clip stored `eventually / figure out` as one fake lexical item with the sentence translation as its gloss.

**Fix:** at least one audio play precedes transcript reveal/completion; targets are separate lexical units with their own meanings. If browser speech synthesis is unavailable, the attempt is not logged as listening.

### 8. Personal Inbox could create impossible retrieval cues and duplicates

A text-only saved expression produced the generic cue “remember the saved expression”, which did not identify what should be recalled.

**Fix:** Inbox requires a meaning or context. Context-only entries produce a cloze-style prompt. Normalized duplicate entries update the original item instead of creating another SRS item.

### 9. Onboarding preferences were largely decorative

The chosen daily duration did not change session size; learner level did not influence the order of new material; the Today “Settings” route opened a profile without learning controls.

**Fix:** 10/15/20/30-minute preferences now change review-session size, CEFR self-estimate is used conservatively to avoid material far above the learner, goal tags affect priority, and learning preferences can be changed from Profile.

The level remains labelled a **starting hypothesis**, not a measured CEFR result.

### 10. Streak ignored meaningful learning outside cards

Reading/listening/speaking/writing did not count as practice days.

**Fix:** streak uses both review and learning-activity events. It remains a secondary motivational statistic, not a learning objective.

### 11. Productive activity duration was fabricated

Speaking/writing attempts were previously recorded as exactly three minutes.

**Fix:** the UI records elapsed task time (minimum one minute). Reading/listening use their explicit task duration when the learner marks the activity complete.

### 12. Speaking and pronunciation were conflated

The interface could imply that speaking/dictation amounted to pronunciation assessment.

**Fix:** speaking remains an oral production/rehearsal task with a text trace. sENG explicitly states that pronunciation, intonation and ASR quality are not yet measured.

### 13. Productive tasks requested language the course had not taught

Tasks asked for `eventually`, `used to`, `recently`, `was supposed to`, `instead`, and `probably`, while those targets were absent from the core graph.

**Fix:** these high-utility targets are now first-class learning items. Productive-task target chips also expose available learner-friendly meanings as pre-task planning support.

### 14. Content semantics

The irregular-verb example for `go → went → gone` used `gone through`, which demonstrates the separate lexical construction `go through` rather than a clean example of `gone`.

**Fix:** changed to `She's already gone home.`

## Methodology recheck

### Retrieval + feedback: keep

A 2025 systematic/meta-analytic review comparing retrieval practice with elaborative encoding found a small overall retrieval advantage, a larger advantage for free recall versus cued recall, and—importantly—a substantially stronger retrieval advantage when corrective feedback was provided.

**Product consequence:** continue retrieval-before-reveal, but do not treat retrieval without feedback as intrinsically superior.

Source: Gonçalves, Muniz & Jaeger (2025), *Educational Psychology Review*  
https://doi.org/10.1007/s10648-025-10076-6

### Extensive reading: keep and expand

A 2025 meta-analysis found positive effects of extensive reading across included language domains, with small-to-medium effects, while also stressing suitable text selection and accountability.

**Product consequence:** Reading stays meaning-focused; future content selection should use learner coverage/level and include light accountability without turning every text into an intensive quiz.

Source: Sangers et al. (2025), *Educational Psychology Review*  
https://link.springer.com/article/10.1007/s10648-025-10068-6

### Captioned viewing/listening: keep as scaffold, not permanent dependency

A meta-analysis synthesizing 89 effects from 49 primary studies found a medium positive effect of L2 captioning on incidental vocabulary acquisition. Effects varied by learner/material characteristics and captions were not equally helpful for all proficiency levels.

**Product consequence:** audio first → learner attempt → L2 transcript/caption support. Lower-proficiency content should be controlled rather than assuming captions solve difficulty.

Source: Kurokawa, Hein & Uchihara (2025), *Language Learning*  
https://onlinelibrary.wiley.com/doi/10.1111/lang.12697

### Task repetition: keep, but schedule honestly

2025 meta-analyses report positive effects of task repetition on L2 oral and written performance. Writing effects are particularly strong for accuracy/lexical complexity in one meta-analysis, while moderator analyses show that spacing, task type, repetition count and feedback matter.

**Product consequence:** retain the same communicative goal and target language across later returns; allow practice, but preserve the planned spaced return rather than letting early practice push it indefinitely into the future.

Sources:  
https://doi.org/10.1016/j.system.2025.103868  
https://doi.org/10.1016/j.jslw.2025.101255

### GenAI: structured task layer, not an oracle

A 2025 systematic review/meta-analysis of 25 empirical studies (2,431 participants) reported positive overall effects in GenAI-supported language learning, but also very high heterogeneity and moderation by factors including task planning and assessor type.

**Product consequence:** keep sENG Coach structured around a task, targets, known learner errors and planned feedback. Do not present general-purpose AI judgments as objective language scores. Provider integration remains server-side.

Source: *TechTrends* (2025)  
https://link.springer.com/article/10.1007/s11528-025-01140-7

### Mobile-first: keep

A 2025 meta-analysis of 65 studies found positive effects for mobile-assisted vocabulary learning, with particularly strong effects reported for longer treatment durations, while also noting heterogeneity/publication-bias limitations.

**Product consequence:** mobile remains the primary interaction target, but product success should be judged by sustained learning outcomes rather than short engagement experiments.

Source: Zhou & Zhou (2025), *ReCALL*  
https://www.cambridge.org/core/journals/recall/article/metaanalysis-on-mobileassisted-vocabulary-learning-do-mobile-applications-help/79C8F00E48D521ED3BCFE0625B5549F3

## Things deliberately not changed

- FSRS remains the card-memory scheduler. It should not be reused blindly as a scheduler for every learning domain.
- No XP economy, leagues, punishment streaks or extra recognition quizzes were added.
- No fake pronunciation score was added.
- No AI key is shipped to the browser.
- CEFR remains provisional until the app has a real diagnostic/skill evidence model.
- Four Strands percentages are not shown until there is enough event coverage to make them meaningful.

## Next evidence-critical gaps

1. A real adaptive diagnostic (vocabulary + grammar patterns + listening; speaking optional later).
2. Higher-quality recorded/TTS listening with controlled difficulty and L2 captions.
3. Server-side structured AI feedback with validation and clear uncertainty boundaries.
4. Pronunciation/ASR module that gives feature-specific corrective feedback instead of an accent score.
5. Larger versioned content graph with CEFR/sense/collocation metadata and content QA.
6. User export/sync before the product relies on local browser data for long-term learning history.
