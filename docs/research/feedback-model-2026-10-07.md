# Feedback model comparison, 7 October 2026

Use the direct OpenAI connection with `gpt-6-luna` and explicit `reasoning.effort: "none"`. The production model before this change was `gpt-5.4-nano`, also with `none`. A bounded synthetic comparison supports Luna for this tutor: it understood the tested criteria more reliably and cost less. A separate review found that changing the model alone would leave defects in suggested wording for sentence gaps.

The model choice follows the [OpenAI model page](https://developers.openai.com/api/docs/models/gpt-6-luna), which documents Structured Outputs, the Responses API and `none` reasoning support. Luna defaults to `medium`, so changing only the model name would silently increase reasoning work. [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations) names Luna as the replacement for GPT-5.4 nano, deprecated on 1 October 2026 and scheduled to leave the API on 1 April 2027.

## Comparison method

Thirty requests tested ten synthetic answers against five current catalogue exercises. Each answer was assessed once by nano with `none`, Luna with `none`, and Luna with `low`. Requests used the existing prompt and exercise-specific strict schema at feedback version `3a61944507689716`, `store:false` and a 1,800-token output ceiling. The harness called `assess()` directly, bypassing the application's result cache and automatic retry. Provider prompt caching remained enabled.

The cases cover the four-point gift e-mail, a repeated inability without a cause, negated illness, a complete appointment e-mail with personal details, correct and incorrect inversion in a sentence gap, a route answer with one of two requested reasons, an off-task instruction and missing information that needs placeholders. A separate reviewer read every exercise and fixture, verified the expected decisions, and reviewed all returned Dutch and English explanations and suggested wording. No learner answers or recordings were submitted.

One Luna request first probed account access. Other arms for each case ran concurrently. The measured duration covers the complete provider call, parsing and application validation. This sample cannot establish stable latency percentiles or catalogue-wide grading accuracy; concurrent work, caching and run order can affect times.

| Model and effort | Accepted responses | Expected decision vectors | Median duration | Input tokens | Output tokens | Estimated cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| GPT-5.4 nano, none | 9/10 | 8/10 | 2.495 s | 12,177 | 2,486 | $0.005542900 |
| GPT-6 Luna, none | 10/10 | 10/10 | 2.740 s | 12,177 | 2,399 | $0.002042145 |
| GPT-6 Luna, low | 10/10 | 10/10 | 3.675 s | 12,177 | 3,296 | $0.002490645 |

An accepted response passed the application's structural and quote checks. The decision-vector column compares every criterion decision with the fixture; a rejected response counts as a failure. Neither measure proves that the suggested wording is suitable.

## Semantic findings

Nano treated “Het lukt me niet” as a reason for cancelling while overlooking the supplied Tuesday alternative. Its suggestion then added a placeholder for a day already present. A correct sentence-gap answer failed exact-evidence validation. Nano also expanded a clear, complete gift answer with a subject and closing, contrary to the instruction to leave clear Dutch unchanged. Its missing-information e-mail used a bare day/time fragment.

Both Luna arms recognized the missing cause and preserved the alternative day and time. They distinguished contributing money from accompanying Julio to buy the gift, preserved negation, accepted the separate sentence that gives the dentist appointment as a cause, and kept clear complete answers unchanged. Their evidence supported the tested criteria without inventing personal facts.

Low effort did not improve the expected decisions. One explanation wrongly said inversion could not be assessed because the learner had not supplied the printed “Daarom”, although that lead-in was already in the exercise. The selected `none` arm avoided that claim and used fewer output tokens. An explanation in its first incorrect-inversion run could state more clearly that it was describing the learner's wrong order, rather than the rule.

## Sentence-gap replay and application defect

Six further requests replayed the correct and incorrect inversion answers with all three arms, retaining raw provider JSON before application normalization. Both Luna arms again made the expected decisions and left the correct gap unchanged. For the incorrect gap, both returned “Daarom blijf ik vandaag thuis.” This repairs inversion but includes a word already printed before the gap. The learner needs the completion “blijf ik vandaag thuis”.

The existing normalizer required a bracket placeholder for every unmet criterion, including grammar. It discarded these grammar repairs because they lacked brackets, restored the original wrong order, and appended the grammar criterion as a placeholder. The same fallback reduced a missing buying invitation to a rubric placeholder. This behavior comes from the application and prompt contract; a model change cannot correct it by itself.

The migration distinguishes missing content from a grammatical error in the catalogue's two-criterion `zinstaak` exercises. It retains grammar repairs without demanding brackets, removes repeated printed lead-ins and punctuation, and retries copied surrounding e-mails or an empty completion. Missing content still needs a Dutch placeholder; sentence repairs without one are rejected and retried. The prompt explicitly asks for only the gap completion and the request labels the content and grammar criteria. Other exercise types keep their existing placeholder rules. The feedback version changes to prevent the application from reusing results made under the previous contract.

Offline regressions cover the repair and retry paths. An independent check retained all 27 reviewed sentence-task model completions unchanged and verified removal of the printed `dat`, `als` and `want` lead-ins against their actual exercises. These checks verify application behavior. They cannot prove that a provider's new wording preserves facts or uses correct grammar, so the follow-up evaluation must inspect the final displayed suggestion as well as the raw output.

Nano's replay copied the full printed e-mail into its suggestion. On the incorrect gap it also marked inversion as met, fabricated its supporting quote and failed validation. The application's partial quote recovery accepted a different fabricated quote in the correct-gap replay. This shows why successful validation cannot establish semantic accuracy.

## Usage and cost

Standard listed rates per million tokens are $0.20 input, $0.02 cached input and $1.25 output for [GPT-5.4 nano](https://developers.openai.com/api/docs/models/gpt-5.4-nano), and $0.10 input, $0.01 cached input and $0.50 output for [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna). Luna cache writes cost $0.125 per million tokens. Reasoning tokens are included in billed output; the initial low-effort arm used 801 reasoning tokens.

The initial nano arm reported no cached reads or writes. Each Luna arm reported 5,902 cached input tokens and 6,245 cache-write tokens within its 12,177 input tokens. Estimates count ordinary input as `input - cached - writes`, writes at 1.25 times the ordinary input rate, cached reads at the cached rate, and all output at the output rate. Using the ordinary input rate for cache writes would undercount Luna's cost.

The replay used 2,387 input tokens per arm. Each Luna arm reported 2,381 cached reads and no writes. Nano produced 389 output tokens and cost $0.000963650; Luna with `none` produced 269 and cost $0.000158910; Luna with `low` produced 445, including 161 reasoning tokens, and cost $0.000246910. The complete 36-request investigation cost approximately **$0.011445160** before tax or account-specific adjustments.

For the same uncached input and output volume, Luna's unit prices are lower than nano's. The measured comparison also benefited from provider caching, which the nano arm did not receive. These estimates exclude transcription and cannot predict future traffic, retry rates or output length.

## Evidence

The tracked [fixtures](feedback-model-2026-10-07/cases.json), [exercise and prompt context](feedback-model-2026-10-07/context.json), [initial results](feedback-model-2026-10-07/comparison.json) and [raw sentence-gap replay](feedback-model-2026-10-07/cloze-replay.json) preserve the evidence. Costs in the saved results include the cache-write correction. The initial run retained validated outputs and rejection reasons; it did not retain raw provider outputs. Only the replay separates raw suggestions from application normalization.

The earlier latency work remains in [feedback-latency.md](feedback-latency.md). This investigation supports a model choice and exposes specific repair failures. It does not validate CEFR difficulty, certify exam equivalence or guarantee future judgments.

## Rollout validation

The first post-change check passed 13 of 14 decision vectors. Luna incorrectly accepted a main-clause order after printed “dat” and claimed the modal was at the end. Generic grammar instructions now require checking the completion within its printed context, including subordinate verb groups, inversion, main clauses and separable infinitives. A four-case probe corrected the decision and suggested wording, but its explanation offered a second malformed example. Grammar explanations now describe the error and rule; repaired wording belongs only in corrected_text.

The final 16-case run used Luna with explicit `none` and the final prompt. All 16 complete decision vectors matched the independently reviewed expectations on the first request. The dat, als, want and om repairs preserved supplied meaning and returned only the gap. Paired correct dat/modal and separable-infinitive completions stayed unchanged. Two reviewers read the full raw and normalized outputs in both languages. These calls cost approximately $0.003514, including cache writes.

The raw route suggestion copied a second reason from the exercise table. It lacked the required missing-content placeholder, so the existing open-task fallback discarded that suggestion and displayed the learner answer with a rubric placeholder. The raw buying invitation also lacked a placeholder and reached that fallback. Final suggestions preserved the tested facts, while these observations show why raw output alone remains unsuitable for display. The dat explanation uses the rubric's simplified “verb at the end” wording for a final modal/infinitive group.

The [16 fixtures](feedback-model-2026-10-07/rollout-cases.json), [first check](feedback-model-2026-10-07/rollout-first.json), [grammar probe](feedback-model-2026-10-07/grammar-probe.json), [final results](feedback-model-2026-10-07/rollout.json) and [exact prompt, task and harness context](feedback-model-2026-10-07/rollout-context.json) retain the failed checks as well as the final outcome. This is a bounded synthetic rollout check, not a guarantee of future grading accuracy.

Offline regressions cover model parameters, grammar repairs, printed lead-ins, missing-content handling and rejection retries. An isolated baseline reproduced eight failures in the previous implementation. The current normalizer also preserved all 27 published sentence-task model completions in an independent check. Firefox verification covered normal practice, narrow screens and failure recovery, with additional compiled-production browser checks. A synthetic request with the production credential source confirmed Luna access before deployment.
