# Batch 069 author notes

Three original A1 reading messages, written on 27 October 2026 for the user's authorised A1 expansion. Each has two questions and three answer options. The batch uses `exam: "a1-practice"`, `status: "draft"` and `targetLevelValidated: false` throughout.

These are foundation exercises. Their shape does not claim to reproduce an official A1 exam. A1 is an authoring target pending teacher review or learner calibration. Independent AI editorial review can assess the wording and answer logic without validating the difficulty.

## Sources and provenance

- Council of Europe, _Common European Framework of Reference for Languages: Learning, teaching, assessment — Companion volume_ (2020): <https://rm.coe.int/common-european-framework-of-reference-forlanguages-learning-teaching/16809ea0d4>. The coordinator supplied and checked this source for the A1 target of understanding short, simple messages about familiar matters. No descriptor wording or exercise content is copied into the items. The author did not perform a separate source retrieval.
- Project constraints: `content/blueprint.md`, `content/reviews/rubric.md`, `docs/briefs/author.md` and `docs/research/content-workflow.md`.
- Catalogue reading titles and slugs were checked before writing. The three slugs are new within reading.

The messages, situations, names, questions, options and explanations are newly written. All local facts are fictional: where cups and plates stand, classroom materials and numbers, and each family member's task. No factual Dutch public-service, legal, financial or medical claims need verification. The items use generic settings without invented organisation, shop, street or website names. The personal names do not refer to real people.

## Diversity and catalogue comparison

| Item | Domain | Communicative purpose | Information and operation | Existing reading topics considered |
| --- | --- | --- | --- | --- |
| `kopjes` | `werk` | A colleague asks someone to put cups away. | Match an object to an instruction; locate plates. | `kantine` concerns ordering lunch; `werkkleding` concerns clothing. This message concerns putting workplace supplies away. |
| `lesboek` | `opleiding` | A teacher reminds a learner about materials and an exercise. | Find what to bring; match an exercise to its number. | `praktijkles` concerns extra lessons; `openingstijden` and `bibliobus` concern library access. This message concerns preparation for one ordinary lesson. |
| `tafel-dragen` | `vrije-tijd-familie` | A sister asks for help with a new table. | Identify the addressee's action; match a named person to a task. | `picknick` concerns a family outing; `speelgoed` concerns exchanging toys. This message concerns help carrying furniture. |

The tested skills are `detail` (four questions), `time-place` (one question) and `person` (one question). All answers are explicit. No question requires inference, arithmetic, a negative condition or general knowledge.

## Keys, evidence and distractors

### `A1:reading:batch069-kopjes:1`

- **q1, A: De kopjes.** Evidence: “Zet de kopjes in de kast.” B confuses the cups with the plates on the table. C selects the spoons by the tap. All options are two words and name items in the message.
- **q2, B: Op de tafel.** Evidence: “De borden staan op de tafel.” A substitutes the place where Lina must put the cups. C substitutes the spoons' location. Each option is three words and identifies a different place in the message.

### `A1:reading:batch069-lesboek:1`

- **q1, C: Je boek.** Evidence: “Neem je boek mee.” A selects the notebook already in the cupboard. B selects the pen the teacher supplies. The options are two words each. The instruction applies explicitly to the book.
- **q2, A: Oefening 4.** Evidence: “Daarna maak je oefening 4.” B transfers the classroom number, 2, to the exercise. C transfers the reading-text number, 3, to the exercise. Each option uses the same noun and a single digit, so finding the correct number is the only distinction.

### `A1:reading:batch069-tafel-dragen:1`

- **q1, B: De tafel dragen.** Evidence: “Jij kunt de tafel met Ali dragen.” The situation and salutation identify “jij” as Sem. A assigns Mila's coffee task to Sem. C assigns Noor's bread task to Sem. Each option has three words and names a task in the message.
- **q2, C: Noor.** Evidence: “Noor neemt brood mee.” A selects Ali, who helps Sem with the table. B selects Mila, who writes the message and makes coffee. Each option is one personal name. Noor and Mila have the same character length, so the key has no unique length cue.

Question order gives **A, B, C, A, B, C**. Counts are **A: 2, B: 2, C: 2**. Each question has exactly three options. Every evidence quote appears verbatim in its source.

The explanations restate the supporting fact and identify the nearby facts behind the distractors. They use short main clauses and familiar words.

## Language control

Counts use whitespace-delimited words. The main text paragraph excludes the greeting and sign-off. A second measurement splits the complete `text` at `.`, `!` and `?`, so greetings without punctuation attach to the next sentence and the sign-off may count as a fragment. Both measurements stay under the coordinator's average of eight words and maximum of twelve.

| Item | Words in complete text | Main sentences | Mean words in main sentence | Longest main sentence | Complete-text split mean | Complete-text split maximum |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `kopjes` | 30 | 4 | 6.25 | 7 | 5.00 | 9 |
| `lesboek` | 40 | 6 | 5.83 | 7 | 5.00 | 9 |
| `tafel-dragen` | 34 | 6 | 5.00 | 7 | 4.86 | 7 |

All three texts have 25–60 words. They use present-tense main clauses, one simple command in each of the first two messages, and concrete familiar nouns. “Daarna” marks the classroom instruction explicitly. The family message has one direct reference from “jij” to its named addressee. The items need neither audio nor pictures.

## Doubts for the reviewer

- This is the first A1 batch. Check the complete messages and all supporting text against the new foundation blueprint, including whether “cursist”, “oefening” and “dragen” suit the intended beginning learner. The short sentence counts alone do not establish A1 difficulty.
- In `lesboek` q2, both distractors deliberately reuse a number from another category in the same message. Judge whether this creates useful literal reading practice at A1.
- `tafel-dragen` q1 uses “jij” in the message and “Sem” in the question. The situation and salutation make the reference explicit; verify that the learner can follow it without any added context.

## Checker output

```text
$ npm run batch:check content/batches/069-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/069-original.json

Checked 3 items, 6 questions. Keys: {"A":2,"B":2,"C":2}. Options: {"3":6}.
No failures, no warnings.
```

Additional scripted author checks confirmed the six evidence quotes, equal option word counts within every question, the language figures above and the absence of catalogue slug collisions. The independent reviewer must read the full final source and record the hash of the reviewed proposal before adoption or integration.
