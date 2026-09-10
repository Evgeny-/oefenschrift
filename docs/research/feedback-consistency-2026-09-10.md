# Feedback consistency, 10 September 2026

The app now makes one assessment for an answer and returns both Dutch and English explanations. Interface language is absent from the model input and server cache key. Changing it while feedback loads does not cancel the request. The browser selects a translation from the returned result, leaving decisions, uncertainty, evidence and the Dutch revision unchanged. Concurrent identical requests share the same pending operation.

The memory cache includes the prompt/schema/postprocessing version, configured model, exercise content, answer and relevant speech context. Entries expire after 30 minutes. Confirmed transcripts exclude stale recognition hypotheses from both assessment and cache identity. Nothing in this change clears the learner’s local storage. Feedback itself is not persisted in browser storage; drafts and completion history remain there.

The grader asks for decisions first, with separate Dutch and English explanations per criterion. A met criterion requires an exact, nonempty supporting quote and cannot also be uncertain. Missing criteria have empty evidence. Quote membership is checked, but it cannot prove that the quote supports the criterion. Task-completion summaries and the next missing requirement now derive from the canonical decisions, because free-form summaries contradicted the model’s own checkmarks in the experiment. Grammatical lenience at A2 does not excuse missing meaning. In particular, an apology or a repeated inability does not supply a cause, and a real cause need not use “omdat”. These are general instructions, without answer-specific exceptions.

Available revisions appear directly, with visible additions/removals and a brief reminder that other wording can work. Missing or uncertain criteria start expanded. In this initial version, the backend withheld a revision if any criterion was missing or uncertain. Prompt instructions asking for placeholders did not reliably prevent invented circumstances; withholding was the rule used for the evaluations below. The later user-requested restoration is documented at the end of this note. Complete-answer rewrites must still be read for factual fidelity. A prompt cannot guarantee that.

## Synthetic evaluation

The existing authorized credential source was used only for invented cases. No journal contents, user answers or recordings were used. The script records response bodies for these synthetic fixtures, reported usage and timings, never request headers or keys. Every file below includes the exact prompt and its version. A separate agent built and inspected the initial cases; the root agent inspected the comparison outputs and final smoke check.

| Run | Paid requests | What it showed |
| --- | ---: | --- |
| Initial bilingual GPT-5.4 nano | 12 | Nine responses validated and matched expected decisions; three failed closed. Semantic reading found summaries that demanded already-met requirements and rewrites that invented facts. |
| Nano diagnostic replay, revised schema/summary | 3 | All validated. Missing consequence was correctly identified; a negated cause was accepted and an ASR conflict was not marked uncertain. The missing-consequence rewrite invented inability to concentrate. |
| GPT-5.4 mini, conservative rewrite policy | 12 | All validated; 10 passed every deterministic check. The same negated-cause and ASR-uncertainty failures remained. Complete-answer revisions preserved the inspected facts; missing-answer revisions were empty. |
| Final nano smoke check | 4 | All four passed their checks. Repeated inability was rejected as a cause, fever in a separate sentence counted, and the complete route and personal details were preserved. The final prompt/schema was used. |

The mini calls took 1.254–2.426 seconds. The four final nano calls took 2.289–3.953 seconds, with a median of 2.694 seconds. Timings cover the complete direct `assess()` request through validation. They exclude app caching, transcription and rendering. The prompt changed between some runs; there are no repeated trials or randomized order. These are small diagnostic samples, not model rankings, latency guarantees or validated marking accuracy. Mini did not resolve the difficult semantic failures, so the configured model remains `gpt-5.4-nano`.

The known negation failure matters: both models accepted “I am not attending a course then” as an explanation for being unable to work. The unconfirmed-ASR case also remains unreliable. The current speaking interface always asks the learner to check the single transcript and submits it as confirmed; the uncertain-hypothesis path is not exposed there. That narrows the current surface, without fixing the underlying capability.

Artifacts:

- [Initial cases and outputs](feedback-canonical-results.json)
- [Diagnostic replays](feedback-canonical-retries.json)
- [Mini comparison](feedback-canonical-mini-results.json)
- [Final nano smoke check](feedback-final-nano-smoke.json)
- [Evaluation script](../../scripts/evaluate-feedback.ts)

A fresh full run is explicit: `npm run feedback:evaluate -- --output tmp/feedback-evaluation.json`. It makes 12 paid requests. Use `--cases` for a bounded subset and `--model` for a controlled comparison. Inspect the bilingual prose and revisions as well as boolean checks. The next useful grading work is a Dutch-reviewed test set covering causal contradictions, negation, partial fulfillment and grammatical corrections that must preserve meaning.

## Local regression checks

Offline tests cover malformed outputs, quote validation, shared concurrent caching, invalidation when the answer or rubric changes, retry after provider failure, localization preserving canonical values, direct-route responses, missing assets, old hash migration and browser link gestures. Firefox checks cover a language switch during a delayed response, translation without another request, open missing criteria, visible revision diffs, failure recovery and saved drafts across deep-link reloads.

The implementation uses strict structured output for shape, with separate checks for correctness. That distinction follows [OpenAI’s structured-output guidance](https://developers.openai.com/api/docs/guides/structured-outputs) and [evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices). The general grading problem remains probabilistic even though interface-language consistency is enforced in application code.

## Later update: visible suggested answers

The user found that suggested answers had disappeared. The current version requests a suggestion for every assessed answer, with Dutch bracket placeholders where the learner needs to supply missing information. The server falls back to the submitted answer plus missing Dutch rubric labels if no suggestion arrives or it has fewer placeholders than unmet/uncertain requirements. This provides a visible response without choosing new facts in the fallback. Counting placeholders cannot validate the semantics of a model-generated revision. The interface asks learners to fill the brackets and check that the meaning still matches.

A bounded five-case run used the existing nano model and synthetic inputs. All five responses validated and supplied visible suggestions; four matched the expected criterion decisions. In the missing-consequence case, the model also incorrectly marked the proposed solution as missing. Its fallback therefore added two rubric placeholders. This is a grading limitation, not a UI failure. The complete personal-detail and separate-cause answers remained unchanged. The inability and alternative-shift cases used bracket placeholders. Requests took 2.366–4.404 seconds, excluding application caching and rendering.

The exact prompt, outputs and checks are in [visible-suggestion evaluation](feedback-visible-suggestions.json). No real user answers or recordings were used. The model remains unchanged.
