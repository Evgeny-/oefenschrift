# Feedback speed and model check

Date: 9 September 2026.

This records earlier experiments. The current prompt, bilingual response format and cache behavior are described in [the 10 September consistency work](feedback-consistency-2026-09-10.md).

Keep the direct OpenAI connection and `gpt-5.4-nano` for now. In this small sample, GPT-4.1 mini was slower and more expensive. A candidate prompt intended to shorten feedback did not improve latency and introduced a semantic regression. The production prompt and model configuration remain unchanged. The grader now accepts an optional server-side model argument for controlled benchmarks; no model selection was exposed in the browser.

## What was measured

Nine sequential calls used three synthetic answers in each condition: the existing nano prompt, a candidate nano prompt, and the same candidate with GPT-4.1 mini. Each condition used an A2 speaking answer missing an alternative day, a complete B1 route explanation, and an irrelevant A2 writing answer containing an instruction to ignore the task. The first and third requested English feedback; the second requested Dutch. No learner recordings, journal entries or personal answers were used.

Times cover the complete `assess()` call, including connection, model generation, strict JSON parsing and exact-quote validation. These calls bypassed the app's result cache. They do not measure transcription, browser rendering or time to first token. One call per case cannot establish a percentile, service-level guarantee or stable model ranking. All baseline calls preceded the candidate calls, so provider load and run order may account for some differences.

| Condition | Missing day | Complete route | Irrelevant instruction | Median | Total input/output tokens |
| --- | ---: | ---: | ---: | ---: | ---: |
| Existing GPT-5.4 nano | 3.466 s | 2.603 s | 2.227 s | 2.603 s | 1,771 / 684 |
| Candidate GPT-5.4 nano | 3.034 s | 3.236 s | 3.452 s | 3.236 s | 1,777 / 675 |
| Candidate GPT-4.1 mini | 3.107 s | 3.707 s | 4.243 s | 3.707 s | 1,783 / 527 |

The candidate requested a single short summary, short criterion explanations, one next step and a minimally edited answer capped at 120 words. It reduced the output ceiling from 1,400 to 1,000 tokens and asked for placeholders when personal details were missing. Actual nano output fell by only nine tokens across three requests. A lower ceiling did not make these already short responses faster. The original 1,400-token ceiling was retained to avoid introducing an unproven truncation limit for longer answers.

At the documented uncached rates, the three existing nano calls cost approximately $0.001209; candidate nano cost $0.001199; candidate mini cost $0.001556. The entire nine-call comparison cost approximately **$0.003965** before taxes or any account-specific adjustment. Usage reported no cached input tokens. Current listed prices per million tokens are $0.20 input / $1.25 output for [GPT-5.4 nano](https://developers.openai.com/api/docs/models/gpt-5.4-nano), and $0.40 / $1.60 for [GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini).

## Quality gates and observed failures

The automated checks required a complete structured response, exactly the expected criterion decisions in order, no invented uncertainty in these unambiguous cases, and every nonempty evidence quote appearing verbatim in the submitted answer. All nine responses passed those checks. An additional semantic read was necessary because quote membership cannot establish that a quote supports a criterion.

- The candidate nano route response changed the learner's directions by adding a crossing and a straight-ahead segment. It also called for an additional safety explanation that the rubric did not require. This fails meaning preservation even though all three criterion decisions were correct.
- Candidate nano attached an irrelevant favourite-colour sentence as evidence for the missing cancellation criterion. It was an exact quote, but did not explain that criterion. Substring validation did not catch this.
- Candidate mini preserved the valid route, but its irrelevant-answer rewrite invented an illness. Its missing-day rewrite asked about “another day” without suggesting a concrete day or leaving a day placeholder. Those fail the intended rewrite requirements.
- The existing prompt also invents example details in rewrites: Thursday in the missing-day case, illness and Wednesday afternoon in the irrelevant-answer case. The benchmark does **not** certify existing rewrites as fact-preserving. Until a stronger rewrite evaluation passes, treat them as suggested examples that learners need to review.
- All conditions correctly rejected the instruction to mark every point correct. Both requested feedback languages were respected, and no response claimed to judge pronunciation or award an official score.

The candidate was rejected. Its exact source, usage, full synthetic outputs and measured times are preserved in [feedback-benchmark-results.json](feedback-benchmark-results.json). The current implementation retains exact-evidence checking; that is a useful integrity check, with the semantic limits above.

## OpenRouter

OpenRouter routes requests to model providers. It can prioritize latency or token throughput and supports provider allowlists and fallbacks. Its latency and throughput preferences are explicitly not guarantees. A route optimized for time to first token may not minimize the time until a complete structured answer is available. Moving this app there would need its own measurement with the chosen model, provider and output format. [OpenRouter provider routing](https://openrouter.ai/docs/guides/routing/provider-selection).

A local presence-only search checked 20 `.env` and `.env.*` files under `/Users/evgeny.nikiforov/Projects`, including the authorized CBT-bot file. It found no assignment named `OPENROUTER_API_KEY`. Hidden Git, dependency and virtual-environment directories were excluded. This does not establish whether a key exists in a password manager, shell configuration, another directory or under another variable name. No credential values were printed, and no OpenRouter request was made.

## Next useful work

Make pending feedback visible in a stable panel and keep a retry action on failure. Record transcription and grading duration separately before changing providers. The current result cache already helps repeated identical submissions, but it does not explain a slow first request. Do not display partial unverified JSON as learner feedback.

The next grader evaluation should separate criterion decisions from rewrite quality. Add cases where a complete answer needs no correction, missing personal facts require placeholders, and recognition errors alter meaning. Have a Dutch-speaking reviewer check whether the correction preserves the answer and avoids adding rubric requirements. An improved rewrite should pass those cases before its prompt replaces the existing one. This small latency sample cannot substitute for that evaluation.

## Repeating a bounded check

`python3 scripts/benchmark_feedback.py --model gpt-5.4-nano --output tmp/feedback-benchmark/new-run.json` makes exactly three paid calls using synthetic fixtures. The tool reads the existing authorized credential source, never logs keys, and leaves app configuration unchanged. It can also accept `--model gpt-4.1-mini`. Calls use the Responses API with strict structured output and `store:false`; GPT-5 nano uses `reasoning.effort=none`, while the non-reasoning GPT-4.1 mini request omits that parameter. Both model pages document structured-output support.

Two offline regression tests check model-parameter compatibility and rejection of a fabricated evidence quote. They do not call a provider.

## Post-benchmark fact-preservation change

Later on 9 September, a separate four-call nano check tested one narrow addition to the existing prompt. This does not replace the earlier comparison or establish a new latency advantage. The addition tells the rewrite to preserve supplied names, directions, routes, times and reasons; use generic Dutch placeholders for missing facts; and keep summary/next-step claims consistent with criterion decisions. The original prompt was otherwise retained, with the same model, schema, output cap and speech-uncertainty behavior.

| Synthetic case | Complete response | Rubric decisions | Semantic rewrite review |
| --- | ---: | --- | --- |
| A2 missing alternative day | 2.144 s | Expected true / true / false | Kept cancellation and illness; added `[dag]` without inventing a date |
| B1 complete route | 2.454 s | Expected true / true / true | Preserved park, canal, bridge, right turn, office and ten minutes |
| A2 irrelevant instruction | 2.593 s | Expected false / false / false | Used task facts plus `[reden]`, `[dag]`, `[naam]` |
| A2 complete personal details | 2.245 s | Expected true / true / true | Returned the answer unchanged, including Amir, Sara, dentist, 10.15, Saturday and 14.00 |

All four passed the specific factual-preservation and criterion-consistency gates, so the appended instruction was retained. This is the only prompt change accepted after the original benchmark. The four calls used 3,143 input and 1,036 output tokens, approximately $0.001924 at the rates above. They were not all sequential, so these times should not be pooled with the original latency comparison.

The route response still changed `Daar` to `Daarna` and proposed an unnecessary stylistic correction in its comment. It preserved the route's factual content but failed the stronger preference to leave a clear, complete answer entirely unchanged. The new instruction reduces the concrete invention observed in this sample; it does not guarantee that future rewrites preserve every fact or that comments will avoid unhelpful corrections. Larger Dutch-reviewed rewrite tests remain necessary.

The full outputs, exact prompt source and semantic review are saved in [feedback-fact-preservation-results.json](feedback-fact-preservation-results.json). No further model/provider change was made.
