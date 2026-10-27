# Batch 069: separate A1 reading target check

Date: 27 October 2026. Reviewer: separate Codex subagent `/root/a1_level_check`, with a fresh review context. Scope: the first A1 reading batch under blueprint sections 4.0 and 10.

**Verdict: Pass for the A1 foundation authoring target on the final proposed source recorded below.** Every message and all six questions, including their options and explanations, were read in full. This is an AI editorial judgment about the stated target. Difficulty remains unvalidated, and this report establishes no equivalence with an official exam. All three records retain `targetLevelValidated: false` and `exam: a1-practice`.

## Exact source and review basis

Final source read: `/Users/evgeny.nikiforov/Projects/inburgering/content/batches/069-proposed.json`.

SHA-256: `4f6c9a05fa7eb65460c1e7194b80a1d5d18bf8ac245f8900468d5a3e09048215`.

The earlier source was also read in full: `content/batches/069-original.json`, SHA-256 `b3d8c04f64e5d38bc58818a7a9a4ee8926a17289803518599a5b2398582434e7`. The verdict above applies to the final proposed bytes. After `npm run batch:adopt 069`, the adopted pathname is `/Users/evgeny.nikiforov/Projects/inburgering/content/batches/069-original.json`. This verdict applies to that adopted file when its hash equals the final proposed hash above. A later change requires a focused check and a new recorded hash.

Local rules consulted: `AGENTS.md`, `content/blueprint.md` sections 4.0 and 10, `content/reviews/rubric.md`, and `docs/research/content-workflow.md`. This separate target check complements the editorial review and does not replace the integration gate.

Primary source independently opened on 27 October 2026: Council of Europe, [CEFR Companion Volume, printed pages 54–55](https://rm.coe.int/common-european-framework-of-reference-forlanguages-learning-teaching/16809ea0d4#page=54), corresponding to PDF indices 53–54. Page 54 frames A1 reading as working through very brief, simple text using familiar language, with rereading available. The A1 correspondence descriptors on page 55 include short personal messages about everyday arrangements. I used those demands to assess the texts and their questions. The project's word limits and option counts are local teaching choices. These pages supply no Dutch vocabulary list or item calibration.

This is the first A1 batch. The checkout has no `content/exemplars/` directory, so an established pair of internal A1 exemplars was unavailable. The comparison uses the stated descriptors and the local A1 specification.

## Length, structure and spread

Word counts include each message's greeting and sign-off. Sentence statistics cover its body; punctuation ends a sentence and whitespace separates words.

| Item | Words | Body sentence lengths | Mean | Longest | Verdict |
| --- | ---: | --- | ---: | ---: | --- |
| `A1:reading:batch069-kopjes:1` | 30 | 7, 6, 6, 6 | 6.25 | 7 | Pass |
| `A1:reading:batch069-lesboek:1` | 38 | 7, 4, 6, 5, 7, 5 | 5.67 | 7 | Pass |
| `A1:reading:batch069-tafel-dragen:1` | 33 | 4, 5, 6, 5, 4, 5 | 4.83 | 6 | Pass |

All messages fit the local 25–60 word band and the sentence-length targets. Their clauses use the present tense, including straightforward commands. No subordinate clause, condition, calculation or idiom is needed to answer. Each message supplies two questions with three short options. Keys are A/B, C/A and B/C, giving two per letter. The settings cover a workplace instruction, preparation for a lesson and a family arrangement. The final titles give context without supplying the tested object or person.

## Item judgments

### `A1:reading:batch069-kopjes:1` — Een bericht op het werk

The situation identifies Omar as Lina's colleague, and the greeting identifies the addressee. The body names ordinary kitchen objects and gives one short instruction. `kopjes`, `borden`, `lepels`, `kast`, `tafel`, `doos` and `kraan` keep the vocabulary concrete. The locative inversion in “Bij de kraan liggen ook lepels” is a short main clause. It adds no hidden relation. The question with `moet ... zetten` restates the command in familiar task language.

| Question | Evidence and demand | Options and explanation | Verdict |
| --- | --- | --- | --- |
| q1, key A | “Zet de kopjes in de kast.” Identifies the object of a direct instruction. | A names the instructed object. B and C reuse the other kitchen objects, which receive no command. The explanation uses short clauses to repeat the instruction and locate both alternatives. | Pass |
| q2, key B | “De borden staan op de tafel.” Retrieves one stated location. | A gives the cups' destination; C gives the spoons' location. B repeats the plates' location exactly. The explanation keeps those object/place relations clear. | Pass |

Both answers follow from one sentence. Remembering the other locations is unnecessary because the learner can reread the short message.

### `A1:reading:batch069-lesboek:1` — Morgen in de les

The school objects and actions are familiar in the learner's immediate course setting. `schrift`, `boek`, `pen`, `tekst`, `oefening`, `kamer` and `les` form a coherent concrete vocabulary set. The situation explains `docent` through Sara's role. The separable verb in `Neem je boek mee` is an ordinary instruction; the question and explanation repeat its meaning. `Daarna` marks a simple next action. Answering q2 requires finding the exercise number, without reconstructing an activity sequence.

| Question | Evidence and demand | Options and explanation | Verdict |
| --- | --- | --- | --- |
| q1, key C | “Neem je boek mee.” Finds the object the reader must bring. | A reuses the notebook already in the cupboard. B reuses the pen Sara provides. C is the object of the command. The explanation repeats that command and gives a short factual reason for each distractor. | Pass |
| q2, key A | “Daarna maak je oefening 4.” Finds the stated exercise number. | B transfers the room number to the exercise; C transfers the text number. Each option has the same simple form. The explanation states exercise 4, room 2 and text 3 in separate short sentences. | Pass |

The final `Hoi` and `Ik geef je een pen` read naturally as a teacher's short message. The situation and signature make `Ik` identifiable. No inference about course rules is required.

### `A1:reading:batch069-tafel-dragen:1` — Helpen op zaterdag

Helping family with a table, making coffee and bringing bread are everyday activities. `dragen` is the target action and has a concrete object; the answer repeats the same verb. `neemt ... mee` is also a common action in personal arrangements. The named people stay attached to short action statements. The greeting identifies `Jij` as Sem and the signature identifies the writer as Mila. Those references have visible anchors in the message.

| Question | Evidence and demand | Options and explanation | Verdict |
| --- | --- | --- | --- |
| q1, key B | “Jij draagt de tafel met Ali.” Retrieves Sem's explicitly assigned action. | A belongs to the writer, Mila. C belongs to Noor. B restates Sem's action. The explanation names each person with the corresponding action and adds no unstated task. | Pass |
| q2, key C | “Noor neemt brood mee.” Retrieves the named person from one clause. | A reuses the person helping with the table; B reuses the writer who makes coffee. The explanation repeats the bread statement, then explains those two nearby roles in simple language. | Pass |

The final action statement resolves the original modal concern: `Jij kunt ... dragen` expressed a possibility, while q1 asked about a plan and its explanation asserted the action. The reviewed source now states `Jij draagt ...`, so the key follows directly. Four names create some matching work, but q2 names Noor in its exact evidence sentence and q1 identifies Sem through the greeting. Neither question requires combining conditions or inferring a motive.

## Adoption condition

All three final items pass this separate A1 authoring-target check. Preserve the recorded proposed-source hash when adopting the batch. Teacher review or learner evidence would be needed to make a difficulty-validation claim.
