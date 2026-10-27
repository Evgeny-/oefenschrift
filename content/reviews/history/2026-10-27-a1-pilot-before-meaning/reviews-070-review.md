# Batch 070: A1 listening editorial review

All three proposed items pass after repairs. The independent reviewer is a Codex AI agent in a separate context. This review checks the local authoring target; learner difficulty remains unvalidated.

| ID suffix | Verdict | Level-target verdict | Reason |
| --- | --- | --- | --- |
| foto-werk | pass after brief edit | compatible with A1 foundation target | Person and place stated directly in 51 spoken words. |
| potlood-lenen | pass after speaker edits | compatible with A1 foundation target | Concrete classroom loan and explicit return time in 48 words. |
| tas-kopen | pass after edits | compatible with A1 foundation target | Clear bag choice and card payment in 48 words; overlapping payment distractor repaired. |

Totals: 3 passing items, 3 edited, 0 rejected. The six keys remain A, B, C, A, B, C. Every distractor has an individual audit in 070-review.json.

## Repairs

- foto-werk image brief adds an explicit clock exclusion.
- potlood-lenen names the teacher Mark in its situation, speaker labels and image brief. The joined transcript was rebuilt. His role stays m-adult and every spoken word stays the same.
- tas-kopen title becomes “In de winkel”. The earlier title supplied the bag category and favored two options over the backpack distractor.
- tas-kopen names the seller Ruben in its situation, speaker labels and brief. His voice role stays m-shop.
- tas-kopen seller line becomes “Prima. Betalen kan ook met munten of een telefoon.” The joined transcript, q2 option A (“Met haar munten.”) and explanation were updated. Geld also covers money spent using a card; coins give a separate physical payment method.
- tas-kopen brief adds an explicit clock exclusion. Cast traits and answer-bearing object exclusions are preserved.

The exact old and new fields appear in the JSON artifact. The author's original and notes remain unchanged.

## Source and language

I independently opened the Council of Europe's [CEFR Companion Volume](https://rm.coe.int/common-european-framework-of-reference-forlanguages-learning-teaching/16809ea0d4), accessed 27 October 2026. Printed pages 48 and 52 support recognizing explicit everyday information from short recordings with very slow, clear speech and pauses. Pages 54–55 provide the simple-language reading foundation. The local counts and multiple-choice shape come from blueprint section 4.0. These descriptors cannot validate the new exercises' difficulty.

| Item | Spoken words | Turns | Sentence mean | Longest sentence |
| --- | ---: | ---: | ---: | ---: |
| foto-werk | 51 | 6 | 4.25 | 8 |
| potlood-lenen | 48 | 6 | 4.36 | 6 |
| tas-kopen | 48 | 6 | 4.00 | 8 |

Each conversation has two personally named speakers, stable distinct roles, two questions and one context picture brief. Text exactly joins the script. All six quotes are verbatim and entail their keys in context. Equal option lengths within each question avoid a length cue. No calculation or combined condition appears.

The loan is clear because Roos asks to borrow and then asks when to return the object. The short follow-up “En in de pauze?” is natural within the lesson exchange. Julio's “Hier in de gang?” follows his location question and receives a direct correction. The concrete terms lenen, tekenen, gum, terug, rugzak, pas and munten are accepted for this authoring target. Their learner difficulty remains open to calibration.

## Diversity and media

I checked all 50 catalogue listening titles and read the nine nearest records in full: bakker, training, scherm, toets, werkdag, computercursus, koffiegeld, loket and verjaardagstaart. Staff-photo coordination differs from training or first-day rules. A classroom loan serves another purpose than bringing lesson materials or discussing a test. Choosing a bag and a payment method differs from ordering a cake or arranging a repair. No same-part ID or slug collision was found.

Voice pairs are Sabrina f-adult / Julio m-young, Roos f-young / Mark m-adult and Ruben m-shop / Fatima f-adult. All are configured Netherlands Dutch roles. Each named cast trait is copied verbatim. Every image brief shows a neutral conversation with empty hands or surfaces and omits the tested objects, places or actions. Dutch alts supply context only. No brief allows text, numerals, signage, logos or clocks. The photo picture shows nobody taking a picture, so visible dialogue participants are not presented as photographers.

After adoption, generate fragment and question audio through scripts/audio.ts with deliberate A1 pacing and pauses. The manifest must record the final script and round-trip result. Rendered illustrations need review against both questions. A full listening review remains separate from the transcription check.

## Exact gate

The final proposal was formatted and reread in full after the final brief edit. The shared checker reports:

```text
npm run batch:check content/batches/070-proposed.json
Checked 3 items, 6 questions. Keys: {"A":2,"B":2,"C":2}. Options: {"3":6}.
No failures, no warnings.
```

Proposed source: content/batches/070-proposed.json.

SHA-256: 638850e3b48d020587ea6e6a51616152252a70f09779abc4da6b8475a0731743.

The source is ready for adoption under the editorial gate. The coordinator must complete the separate fresh-context first-batch level-target check, adopt with npm run batch:adopt 070, and satisfy the media gates before local learner delivery. No media, catalogue, set or code was changed by this reviewer.

## Limits

This review cannot establish exam equivalence or calibrate CEFR difficulty. There are no A1 listening exemplars in the existing catalogue, so the level column uses the primary descriptors and the local specification. Media was absent at source review. The author notes retain their original wording; this record documents the final decisions.
