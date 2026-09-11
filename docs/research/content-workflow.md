# Exercise content workflow

## Scope and roles

This process applies to original reading, listening, writing, speaking, and KNM practice. The author creates a batch and may revise it. A separate reviewer evaluates the final source independently and never edits the author’s batch. Editorial review cannot validate CEFR difficulty, predict exam results, or establish equivalence with an official inburgering exam.

## 1. Define the batch

Record the requested number of items by level and part before writing. Add explicit diversity targets for setting, purpose, text type, tested operation, and answer shape. Reserve unique, stable item IDs. Mark level labels as authoring targets with `targetLevelValidated: false` until learner evidence supports calibration.

## 2. Research and provenance

Write all scenarios, source texts, questions, options, samples, and model answers from scratch. Do not copy or closely paraphrase official practice items, commercial exercises, or distinctive passages. Keep a source log for factual research without importing source wording.

KNM facts require a current primary source from the Dutch government or the public body responsible for the rule or service. Prefer pages on `rijksoverheid.nl`, `overheid.nl`, `inburgeren.nl`, `duo.nl`, `belastingdienst.nl`, `uwv.nl`, `svb.nl`, or the responsible municipality or agency. Record the direct URL, page title, access date, supported claim, and whether the fact may change. Avoid secondary summaries when a responsible-body page exists. Recheck time-sensitive facts during every later revision.

## 3. Author the items

A2 items use common vocabulary, short clauses, explicit links, and everyday communication. B1 items use connected information, paraphrase, reasons, conditions, consequences, or simple inference. B1 difficulty should come from meaning and information structure rather than obscure words, trick negatives, or excessive memory load.

Each closed question needs one defensible answer. Store a verbatim `evidence` quote that entails the key and record a rationale for each wrong option in the authoring notes or review artifact. Rationales should name the nearby detail, reversal, timing error, scope error, or unsupported assumption that makes an option tempting. Review dates, times, quantities, pronouns, negatives, exceptions, and modal verbs carefully.

Each writing or speaking task needs concrete communication goals, one sample used for prepared feedback, exact sample quotes for demonstrated goals, and a model answer that fulfills every goal. Use `null` when the prepared sample deliberately omits a goal. Criteria must accept varied natural wording and should not require details the prompt makes impossible to supply.

Listening scripts need short audible sentences, distinct names and numbers, and enough spacing between competing details. Avoid punctuation-dependent meaning. Do not create audio yet, because editorial revisions can change the script.

## 4. Author self-check

The author validates JSON parsing, schema fields, unique IDs, requested counts, answer labels, exact quote containment, and model coverage. The author also checks task diversity and searches the repository for repeated stems, situations, and distinctive phrases. The draft and notes then go to the reviewer.

## 5. Independent editorial review

The reviewer reads every item in full and applies `content/reviews/rubric.md`. For closed questions, the reviewer proves the key from the stored quote and source, tests every distractor as a possible competing answer, and checks that the explanation matches both. For open tasks, the reviewer maps prompt to criteria, criteria to sample quotes, and criteria to the model. The reviewer compares A2 and B1 demands across the batch and flags duplicate concepts.

For KNM, the reviewer opens each cited official page, confirms that it supports the precise claim, checks current terminology and exceptions that could change the answer, and records the verified URL in the review evidence. Search snippets alone do not count as verification.

The reviewer records item-specific findings and writes repairs to a proposed copy, following `docs/briefs/review.md`. The author's source stays intact until the coordinator adopts the hash-verified proposal. Larger changes can return to the author for another independent review.

## 6. Revision loop

The author applies requested edits and reruns author checks. The reviewer rereads every changed item in context and repeats affected fact, answer, quote, distractor, level, and duplication checks. Continue until each item passes or is rejected and removed. A revision can invalidate a prior evidence quote or media asset, so downstream checks must use the final wording.

## 7. Hash gate and review artifact

After the last edit, calculate SHA-256 from the exact source JSON. The review JSON records the source path, hash, item count, distribution, per-item verdict, concrete evidence, source verification where applicable, limitations, and `ready_for_integration`. The Markdown report mirrors the same verdicts for human reading.

Set `ready_for_integration: true` only when every item passes, the batch checks succeed, and the recorded hash matches the current file. Any later byte change invalidates the gate and requires a new hash plus a focused rereview.

## 8. Media production and review

Generate listening audio only from a hash-approved script. Store the script hash or item version with the asset. A reviewer listens to the entire rendered file and checks pronunciation, pacing, pauses, names, numbers, negatives, intelligibility, clipping, and answer-revealing emphasis. Audio failure blocks that listening item even when its script passed. A changed script requires a new asset and media review.

## 9. Integration checks

Integrate only the source whose hash appears in the passing review. Rebuild derived catalogue or demo data through the project’s normal generator. Validate counts, IDs, routes, persistence, scoring, self-review behavior, transcript display, and media paths. Keep editorial status, level-validation status, and media status separate.

## 10. Learner reports and versioned revision

The current report form collects the item ID and version, optional question ID, reason, optional note and timestamp. It attaches no answer or recording. Selected answers and mistake history stay on the learner’s device. Treat an individual report as a signal rather than proof. A future consented learner study may collect timing, answer patterns and difficulty judgements, but that requires a defined data-minimisation and privacy plan before implementation.

Triage reports into content error, ambiguity, language level, media, interface, or preference. A wrong key or newly discovered competing answer blocks the affected item immediately. Other changes enter a versioned revision batch with a change reason and links to the reports that motivated it. Preserve prior review artifacts. Recheck current KNM sources, rerun editorial and media review where affected, assign a new content version, and issue a new hash before reintegration.

## Current implementation and remaining validation

Run `npm run content:integrate` after review, then `npm run build` and `npm test`. Integration checks exact batch and evidence hashes, verifies source-quote containment and assigns a stable `revision` to each content item. `scripts/audio.ts` and `scripts/illustrate.ts` invoke the integration gate before generating catalogue media; a file-based run requires an adopted, passing, hash-verified batch. The current app records exercise revisions with reports and question fingerprints with locally saved mistakes.

Batches 001–003 have independent AI editorial reviews. Batch 003 adds the first eight KNM sets and contains no new audio. The ten existing listening clips have technical and browser playback checks; a complete specialist listening review is still pending. No batch has teacher-validated difficulty, learner calibration or an official pass conversion. Keep these limits visible in release notes and do not promote an AI editorial pass into a validated exam claim.

## Optional sentence starters

`content/hints/sentence-starters.json` supplies one partial Dutch fragment per criterion, in criteria order. The author reads the prompt and criteria, writes enough words to suggest a sentence structure, and leaves facts or completions to the learner. A separate reviewer reads every fragment in task context, tests natural completions, and sends grammatical or alignment corrections to the author. Complete sample answers and invented task facts fail review.

The passing artifact in `content/hints/review.json` records the exact overlay and catalogue hashes. Integration rejects changed content until the overlay receives a focused review. `npm run build` runs the integration gate before bundling. The interface exposes hints on request without filling the answer field. This editorial review does not validate learning outcomes or CEFR difficulty.

## September 2026 record standardization

All active exercises use `taskType`; `textType` is reserved for B1 communicative categories. The app and authoring validator share the vocabulary and bilingual labels in `app/domain/exercise-types.ts`. Integration invokes `scripts/batch-validation.ts` on each effective reviewed batch, verifies individual passing verdicts, and refuses schema violations even when source hashes match.

Replacement batches preserve exercise IDs and set membership, leaving their older source and review files as history. They list the intentionally superseded IDs in `replaces`. Integration rebuilds each reviewed record and preserves only media whose source is unchanged. Historical evidence overlays cannot overwrite evidence from a rewritten item. `batch:adopt` validates the proposal before replacing the original files.

Saved sessions and completed records carry exercise revisions. The one-time migration record in `content/migrations/2026-09-standardization.json` identifies older saves that lack revisions, so rewritten exercises start fresh while unaffected progress and draft text survive. Every changed script or prompt passes media generation and review again.

`scripts/prepare.ts` checks required media before development, browser tests and production builds. Audio must exist, match the script hash and have a passing transcription round trip. Each illustration must exist and have a passing visual review for its current brief. A transcription round trip checks content fidelity; it does not certify pronunciation, pacing or emphasis. The specialist listening review described above remains a separate requirement.
