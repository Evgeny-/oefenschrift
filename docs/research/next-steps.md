# What to build next

The local app now has 77 original exercises, ten listening clips, saved progress, AI-assisted writing feedback and speaking transcription. Learners can report individual questions. Eight KNM exercises are available. The catalogue groups all 77 exercises into 20 short sets that resume independently and offer the next set at completion. The interface supports reviewing saved mistakes, resuming drafts, exact evidence highlights and comparing suggested rewrites. The next milestone remains a dependable A2 practice journey.

Feedback now shares one assessment between Dutch and English. Summaries follow its criterion decisions, but synthetic cases still expose causal and negation errors. Prioritize a Dutch-reviewed regression set before expanding claims about grading quality. See [current evaluation and limitations](feedback-consistency-2026-09-10.md).

## 1. Test the A2 material with learners

Start with the user's A2 review and ask an NT2 teacher to check a representative sample. Record ambiguous questions, missing acceptable answers and tasks that feel too easy or too hard. Keep the target level separate from a validated difficulty claim. The current agent review checks editorial consistency; it cannot establish exam equivalence.

Each exercise now has a content revision and editorial status. Reports store that revision, while saved mistakes expire when the corresponding question changes. The React Router admin now resolves reports and edits JSON drafts in SQLite, with optimistic versions and reversible archiving. Next add a field-based editor and a comparison view for revision history; retain independent editorial review before publication.

## 2. Help learners decide what to practise next

“Review mistakes” shows set retries in the catalogue and individual exercise retries in Progress, based on saved wrong answers. Set results now group mistakes by the reviewed skill of each question and offer a focused retry of only the missed questions that keeps the first result. Skill ids exist for the first reading set only; add them to the remaining sets so the grouping names the skill rather than the text. The start page now shows unfinished work, the five subjects with live counts, one question to try and a short FAQ (what it is, why it is free, where progress lives). Still open: a next-practice suggestion based on the least-used skill.

Keep progress on the device by default. Export/import of records and drafts as a JSON file is available on the Progress page. Cross-device sync can be optional later.

## 3. Expand toward full exam practice

The 20 short practice sets now connect the available exercises into continuous sessions. Their membership and URLs are explicit; add future content to new sets instead of repartitioning existing sets. The build verifies coverage and subject/level consistency. These groups use existing catalogue order and have not been calibrated as a learning sequence.

The separate test builder combines available reading or listening questions. It does not reproduce a full official exam. Define each supported exam's task types, length and timing from current official specifications before expanding the generator. Commission original content for those specifications and review it independently.

Prioritize varied A2 everyday situations, then deepen B1 across all four language skills. Expand the initial eight KNM exercises after learner review. B2 should stay unavailable until there is enough reviewed material to support a useful session. Preserve the unofficial label and avoid an official pass prediction.

## 4. Evaluate speaking with real learner recordings

Collect a small consented test set with different accents and recording conditions. Compare the learner's intended words with the single editable transcript, then check whether correcting recognition errors produces sound feedback. The optional second transcription was removed after user review because it added complexity without a useful result.

Keep pronunciation assessment separate. Recognition confidence alone cannot establish pronunciation quality. Add pronunciation guidance only after choosing and testing a suitable method with a Dutch-language specialist.

## 5. Prepare a public service

Before opening access, identify the operator and finish the privacy information, including legal basis, retention and provider arrangements. Decide how learners can request deletion and how microphone consent and processing notices work for the intended audience.

Move the API behind a production service with per-user limits, provider spending caps and monitoring. Cache generated listening audio. Keep ordinary practice free even if an AI feedback allowance is exhausted. Add accessible error recovery, check the full keyboard and screen-reader journey, and test Firefox plus mobile browsers.

The SQLite report queue, local admin and online backup command are implemented. Assign an owner for submissions, test restoring backups, add authenticated administration and set retention periods before a wider rollout. Publication remains a separate step; the current app runs locally.
