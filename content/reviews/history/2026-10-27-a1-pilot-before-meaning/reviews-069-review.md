# Batch 069: A1 reading editorial review

All three proposed items pass after small repairs. The independent reviewer is a Codex AI agent in a separate context and did not author this batch. This review does not validate CEFR difficulty or claim official exam equivalence.

| ID | Verdict | Level-target verdict | Reason |
| --- | --- | --- | --- |
| `A1:reading:batch069-kopjes:1` | pass after title edit | compatible with the A1 foundation target; unvalidated | Concrete objects and locations in 30 words; both keys follow from one sentence. |
| `A1:reading:batch069-lesboek:1` | pass after edits | compatible with the A1 foundation target; unvalidated | A 38-word classroom message with explicit materials and labelled numbers. |
| `A1:reading:batch069-tafel-dragen:1` | pass after edits | compatible with the A1 foundation target; unvalidated | The 33-word message now states Sem's action directly. Each person has an explicit task. |

Final totals: 3 pass, all 3 edited, 0 rejected. Questions and keys remain unchanged. Every distractor is checked individually in `069-review.json`.

## Repairs in the proposed copy

- `kopjes.title` → `Een bericht op het werk`. The old title supplied q1's object and destination.
- `lesboek.title` → `Morgen in de les`. The old title cued the book in q1.
- `lesboek.text`: `Beste cursist,` → `Hoi,`. The learner label adds unnecessary vocabulary.
- `lesboek.text`: `De docent geeft je een pen.` → `Ik geef je een pen.` Sara writes the message herself, so the direct self-reference makes the giver clear.
- `tafel-dragen.title` → `Helpen op zaterdag`. The title gives the context without cueing q1's object.
- `tafel-dragen.text` and `questions[q1].evidence`: `Jij kunt de tafel met Ali dragen.` → `Jij draagt de tafel met Ali.` The action is now explicit; the earlier modal could express ability or possibility.

The author's source and notes were not edited. No item was rejected.

## Evidence and language

The six final evidence quotes are `Zet de kopjes in de kast.`, `De borden staan op de tafel.`, `Neem je boek mee.`, `Daarna maak je oefening 4.`, `Jij draagt de tafel met Ali.` and `Noor neemt brood mee.` Each appears verbatim and entails its key. Options have equal word counts within every question, with no odd polarity or extra specificity in a key. Wrong options reuse nearby details and remain false for the question asked.

| Item | Complete words | Body sentence mean | Body sentence maximum |
| --- | ---: | ---: | ---: |
| kopjes | 30 | 6.25 | 7 |
| lesboek | 38 | 5.67 | 7 |
| tafel-dragen | 33 | 4.83 | 6 |

The complete-text split, including greetings and sign-offs, has maxima of 9, 8 and 6 words. Questions, options and explanations also use short, direct wording.

I independently opened and read the A1 overall reading and correspondence descriptors on pages 54–55 of the Council of Europe's [CEFR Companion Volume](https://rm.coe.int/common-european-framework-of-reference-forlanguages-learning-teaching/16809ea0d4), accessed 27 October 2026. They support phrase-by-phrase reading of familiar language in very short simple texts and short personal messages. The local word counts and multiple-choice shape come from blueprint section 4.0. The descriptors cannot validate these new items' difficulty. PDF screenshot requests failed; the primary PDF text and page markers were available for verification.

## Decisions on the author's doubts

`Cursist` was removed from the greeting. `Oefening` stays because it names a familiar classroom activity and appears in the source, question and all options. `Dragen` gives a concrete action with a familiar object.

The classroom number distractors are accepted. Room 2, text 3 and exercise 4 are separately labelled. The learner matches a category to a digit without calculation.

The family message's `jij` is explicitly anchored by `Hoi Sem` and the situation line. Removing `kunt` resolves the separate ambiguity about his task.

## Diversity, sets and media

I checked all 68 reading titles in the catalogue and read the seven nearest records in full: speelgoed, bibliobus, kantine, werkkleding, praktijkles, picknick and openingstijden. There is no existing A1 item or repeated slug. Putting workplace supplies away differs from ordering lunch or collecting clothing. Materials for one lesson serve a different purpose from selecting extra classes or using a library. Carrying a table differs from organising a family outing, although both can test person-to-task matching.

The requested pilot has three distinct messages and six keys, with A, B and C correct twice each. No existing set or catalogue record was changed. No media or starters are required.

## Exact source and gate

The complete final proposed source was formatted, reread and checked before hashing:

```text
npm run batch:check content/batches/069-proposed.json
Checked 3 items, 6 questions. Keys: {"A":2,"B":2,"C":2}. Options: {"3":6}.
No failures, no warnings.
```

Proposed file: `content/batches/069-proposed.json`.

SHA-256: `4f6c9a05fa7eb65460c1e7194b80a1d5d18bf8ac245f8900468d5a3e09048215`.

The JSON review records this hash under the adoption contract. The separate fresh-context A1 target check passes the same final hash in `content/reviews/069-level-check.md`. The coordinator can adopt with `npm run batch:adopt 069`, then integrate through `npm run content:integrate`. Keep the work local.

## Limits

AI editorial review cannot calibrate learner difficulty or establish exam equivalence. There are no existing A1 exemplars to compare with, so the target judgment uses the primary CEFR descriptors and section 4.0. The author's notes still describe the original wording; final repairs and measurements are recorded in this review.
