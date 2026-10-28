# Editorial review rubric for original A1, A2 and B1 exercises

This rubric supports an AI editorial review. It does not provide independent human difficulty validation or establish equivalence with an official inburgering exam.

For new A1 listening items, apply the simpler authoring target in blueprint section 4.0: preferably 30–40 spoken words in four turns, one everyday exchange and one directly stated fact per question. Flag extra names, competing times, exception questions or incidental details that increase memory load. Simple words alone do not make a conversation suitable for the requested beginner practice.

## Item checks

1. **Target-level language:** A1 tasks follow blueprint section 4.0: very short familiar messages or conversations, simple main clauses and explicit facts. A2 material uses common words and short, direct sentence structures; any less common word is explained by context and is not the sole obstacle to the answer. B1 material may use longer connected texts, common subordinate clauses, paraphrase, reasons, conditions, and simple inference while remaining clear to an independent language user.
2. **Level distinction:** A1 reading and listening ask for a directly stated detail from a short message or recording. A1 writing and speaking ask for two concrete facts in short, understandable phrases, without a required explanation or connected narrative. B1 requires more integration, paraphrase, or explanation than a parallel A2 item. Difficulty comes from the communication task and information structure, rather than obscure vocabulary, trick wording, or excessive memory load.
3. **Natural Dutch:** The situation, register, word order, collocations, and forms of address sound plausible in everyday Dutch. Dialogue and audio scripts remain clear when heard rather than read. Meaning is a blocking gate: establish human intentions, coherent replies, compatible categories and a practical purpose before reading answer material. No invented off-page context may rescue the source. Repeated stocktaking or a list of answer choices inside dialogue fails even when every key has a literal quote.
4. **Unambiguous task:** The prompt defines what the learner must find or produce. Dates, times, pronouns, negatives, and implied context cannot reasonably support two readings. Read all visible prompts together: another question, title or starter must not supply the requested answer.
5. **One defensible answer:** A closed item has exactly one best answer. An open item has concrete success criteria and allows natural wording variants that express the required content.
6. **Explicit evidence:** Reading and listening answers follow from an exact sentence or short passage. The review records that evidence as a quote. Writing and speaking criteria trace to explicit prompt requirements.
7. **Functional distractors:** Wrong choices are plausible misunderstandings grounded in the situation, while remaining clearly different from the explicitly stated answer. Short A1 sources need not mention every wrong choice. Never add unrelated facts to a source just to seed distractors. They do not depend on trivia, fine grammatical distinctions, or missing information.
8. **Self-review criteria:** Writing and speaking tasks tell learners what to check after answering. Criteria cover task completion, understandable language, and the requested practical details without implying an official score.
9. **Answer and quote consistency:** The answer key, explanation, evidence quote, labels, and any numeric facts agree exactly with the source. Quoted text appears verbatim in the final source.
10. **Originality and claims:** Metadata identifies the material as original practice, says difficulty is unvalidated, and avoids claims of official approval, official scoring, or exam equivalence.
11. **Task diversity:** Items in the same batch vary their setting, communicative purpose, information structure, and tested skill. A changed name, object, or number does not make a repeated task concept distinct.
12. **Closed-item audit trail:** Each closed question records a verbatim evidence quote from its source and a short rationale for every distractor. The quote entails the keyed answer; the rationale explains the specific misunderstanding without making the distractor defensible.
13. **Current KNM facts:** Every time-sensitive KNM claim is checked against a current primary Dutch government or responsible public-body source. The item records the supporting URL and access date. Law, benefits, agencies, procedures, duties, eligibility, and official terminology receive special attention.
14. **Copyright and provenance:** Wording, scenarios, questions, options, samples, and models are newly written. Factual research may guide content, but official practice questions, commercial exercises, and distinctive source phrasing are not copied or closely paraphrased.

15. **Record contract:** `taskType` is recognised for the part and level and describes the actual exercise. Required metadata and per-part structures pass the shared batch validator. B1 `textType` describes the communicative category. No retired `type` field or generated media appears in a new authored record.

## Verdicts

- **Pass:** All applicable checks pass. Small style preferences do not affect use.
- **Revise:** A concrete edit can fix one or more failed checks. State the affected field, proposed wording or rule, and why it matters.
- **Reject:** The item needs replacement because its premise, answer logic, or task design cannot be repaired locally.

## Batch acceptance

Every item receives an individual verdict and evidence. A batch is ready for integration only when all items pass after revisions, the JSON parses, IDs are unique, each requested modality has the requested count, required audit fields are complete, and the recorded SHA-256 matches the reviewed source file. Listening scripts may pass editorial review before audio exists, but the published listening item remains blocked until its media review passes.

For the playful A1 expansion, reviewers also rate language simplicity, clarity, variety, visual interest and fit between task and illustration from 1 to 5. These are editorial ratings, separate from the pass/revise/reject gate and from human difficulty validation. Humour must remain understandable with familiar words, and closed-task pictures must not reveal either key.

The program should be mostly ordinary, with about 15% lightly humorous tasks (about one in six A1 exercises). A1 items also pass the simplified profile in blueprint §4.0: list words only, sentences of at most eight words and real premises. Reviewers classify each scene and count the mix independently; ordinary tasks still deserve clear, appealing graphics. Small-batch rounding does not replace the coordinator's combined program count.

## Meaning-first evidence

New and revised sources use review contract version 2 in docs/briefs/review.md. A fresh reviewer receives a source-only packet before the full item. Every final item records its practical purpose, a source-grounded coherence explanation and a check for forced facts. Dialogue turns are checked individually; open tasks justify their medium and recipient. Any revise/reject meaning verdict blocks adoption, integration and media generation. Historical source approvals through batch 068 are frozen in legacy-source-approvals.json; later sources receive no legacy exemption. This gate requires explicit editorial evidence and does not claim automatic detection of all nonsense.
