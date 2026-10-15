# Batch 053 author notes

## Authorised replacement

Batch 053 is an authorised replacement (rewrite) batch of eight published A2 reading exercises. Each item keeps its ID, item order, question order, answer keys and set membership:

- `A2:reading:batch004-telefoon:1`
- `A2:reading:batch001-pakketpunt:1`
- `A2:reading:batch021-terugbrengen:1`
- `A2:reading:batch004-ramen:1`
- `A2:reading:batch004-verwarming:1`
- `A2:reading:batch021-gezinskaart:1`
- `A2:reading:batch020-spoorwerk:1`
- `A2:reading:batch020-politiebureau:1`

Why: the editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, §4, "A2 reading" under Medium and Low) found a contradiction between a rule and a price list, a first sentence that contradicts the rest of a message, a persona prompt that did not entail its key, an explanation claim that is not in the text, two spelling and wording errors and an implausible price. The project owner authorised the fixes. The fix list is `tmp/content-fix-2026-10-14/spec/053-054.md` (part 053).

Source: `tmp/content-fix-2026-10-14/base/053-base.json`. That file holds the current published records without `revision` and with `status: "draft"`. Reading items carry no generated media. I applied the listed fixes with an assertion-checked script: each replaced fragment had to match exactly once. Apart from the fields in the table below, every field value is identical to the base. A field-by-field comparison confirmed this. Every ID is owned by an earlier reviewed batch (001, 004, 020, 021), so the review JSON must list all eight IDs in `replaces`. The checker's "already in the catalogue" info line is expected.

## Changes per item

Where only part of a field changed, "Before" and "After" show the changed fragment exactly as it appears in the field.

### A2:reading:batch004-telefoon:1 (fix 1)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` (Saturday paragraph) | Op zaterdag doen wij alleen batterijen. Andere reparaties nemen wij op zaterdag wel aan. U kunt de telefoon dan op maandag ophalen. | Op zaterdag doen wij alleen batterijen. Andere reparaties nemen wij op zaterdag wel aan. Een nieuw scherm is dan op maandag klaar. Bij een oplaadaansluiting of waterschade bellen wij u als de telefoon klaar is. | "Every other repair on Monday" contradicted the price list (oplaadaansluiting in 2 dagen, waterschade in 3 dagen). Now only the screen gets a fixed day. For the slower repairs the shop calls, which fits any count of 2 or 3 days across the closed Sunday. |
| `questions[q2].evidence` | (the old paragraph above) | (the new paragraph above, verbatim) | Consequential: the quote must match the text. It still entails key A (only batteries on Saturday) and rules out B and C. |
| `questions[q2].explanation` | Op zaterdag doet de winkel alleen batterijen. Een scherm of oplaadaansluiting neemt de winkel wel aan, maar die telefoon is pas maandag klaar. | Op zaterdag doet de winkel alleen batterijen. Een scherm of oplaadaansluiting neemt de winkel wel aan, maar die reparaties zijn niet dezelfde dag klaar: een nieuw scherm is pas maandag klaar, en bij een oplaadaansluiting belt de winkel als de telefoon klaar is. | The old explanation repeated the contradiction. The new one follows the new rule. |

### A2:reading:batch001-pakketpunt:1 (fix 2)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` (first sentence) | We hebben uw pakket dinsdag bij u thuis gebracht, maar u was niet thuis. | We wilden uw pakket dinsdag bij u thuis bezorgen, maar u was niet thuis. | The old sentence said the parcel had been delivered, which contradicts the rest of the message. The new wording is the one the spec prescribes. No evidence quote contains this sentence (q1 and q2 checked). |

### A2:reading:batch021-terugbrengen:1 (fix 3)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q1].prompt` (fragment) | Zij heeft de jas niet gedragen en zij heeft de kassabon nog. | Zij heeft de jas niet gedragen, het prijskaartje zit er nog aan en zij heeft de kassabon nog. | The rules require the price tag to be attached. Without that fact the prompt did not entail key B. |
| `questions[q2].options.A` | Ja, want het prijskaartje zit er nog aan de zwembroek. | Ja, want het prijskaartje zit er nog aan. | "er … aan de zwembroek" named the object twice. The wording is the one the spec prescribes. |

### A2:reading:batch004-ramen:1 (fix 4)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q2].options.C` | Bewoners vertellen dat de huur omhoog gaat. | Bewoners vertellen dat de huur omhooggaat. | Spelling: in a subordinate clause the separable verb is written as one word. The text's main clause "De huur gaat niet omhoog" is correct and unchanged. |

### A2:reading:batch004-verwarming:1 (fix 5)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q1].prompt` | Karim heeft geen verwarming. Wat moet hij het eerste doen? | Karim heeft geen verwarming. Wat moet hij eerst doen? | "het eerste doen" is not idiomatic here. |

### A2:reading:batch021-gezinskaart:1 (fix 6)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` (price list) | Gezinskaart – 24,00 euro | Gezinskaart – 36,00 euro | The family card was cheaper than two adult tickets (2 × 12,50). At 36,00 it saves money for two adults with three children (single tickets 43,00) or with two children (37,00), but not with one child (31,00). That is plausible. No question, option or explanation uses this price: q1 option D and the q1 explanation mention only the 6,00 child price and "niets extra". |

### A2:reading:batch020-spoorwerk:1 (fix 7)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q2].explanation` (last sentence, fragment) | een rolstoel is geen fiets, en de chauffeur helpt alleen mensen met een rolstoel. | een rolstoel is geen fiets. Ook als Roos het tegen de chauffeur zegt, mag haar fiets niet mee. | "alleen" is not in the text, so the claim is removed. That clause was how the explanation refuted option B, so I replaced it with a statement that follows from the text's unconditional rule "Fietsen mogen niet mee in de bus." |

### A2:reading:batch020-politiebureau:1 (fix 8)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q2].prompt` | Mevrouw Bakker is haar sleutels kwijt. Waar moet zij zijn? | Mevrouw Bakker is haar sleutels kwijt. Waar moet zij kijken? | "Waar moet zij zijn?" is colloquial. "kijken" matches the text's instruction "Kijk op www.westerhout.nl/gevonden" and all three options (politiebureau, website gemeente, website politie). |

## Key rationale for the affected questions

The keys did not change. For each question whose wording changed:

- **telefoon q2 (key A):** "Op zaterdag doen wij alleen batterijen" and a battery takes 1 hour. B (scherm) tempts through "vóór 12.00 uur … dezelfde dag", but on Saturday a screen is ready on Monday. C (oplaadaansluiting) is accepted on Saturday but not repaired that day; the shop calls when the phone is ready.
- **terugbrengen q1 (key B):** three weeks is after 14 days and before 30. The jacket is not worn, the price tag is on and Roos has the receipt, so she can exchange it or get a credit note. A (money back) applies only within 14 days. C (nothing) applies only after 30 days.
- **terugbrengen q2 (key C):** swimwear is never taken back, "Ook niet met prijskaartje". A treats the general price-tag condition as sufficient. B reverses the 14-day rule: exchanging is still possible after 14 days.
- **ramen q2 (key A):** unchanged. C is contradicted by "De huur gaat niet omhoog."
- **verwarming q1 (key C):** unchanged. Step 1 is the thermostat. A is step 3. B comes only after the three steps fail.
- **spoorwerk q2 (key C):** A is about the ticket (paying, not bikes). B misreads the wheelchair sentence: telling the driver is about help with boarding and does not lift the bike ban. D: a folding bike may also come along, and the wheelchair sentence is not a rule about what may come along.
- **politiebureau q2 (key B):** A is excluded by "Dan gaat u niet naar de politie". C (website politie) is for aangifte. The gemeente website lists "alle gevonden voorwerpen".

## Language control

Word counts use the checker's whitespace count. Sentence averages use the checker's A2 split.

| Item | Words before → after | Average sentence before → after | New sentences (words) |
| --- | --- | --- | --- |
| telefoon | 153 → 166 | 9.6 → 9.8 | 8, 13 |
| pakketpunt | 130 → 130 | 10.0 → 10.0 | 14 |
| gezinskaart | 224 → 224 | 10.7 → 10.7 | none (price changed) |
| other five | unchanged | unchanged | none (questions only) |

All texts stay within 100–250 words, and no new sentence is over 18 words. The new q1 prompt sentence in terugbrengen has 17 words: it lists three facts with a comma, which keeps the published phrases "niet gedragen" and "zij heeft de kassabon nog".

## Media consequences

None. A2 reading items carry no audio (no question, intro or prompt audio), and none of these eight items has images. No reading item in `content/catalogue.json` has a media field. No clip or picture needs to be generated or reviewed. Integration assigns new `revision` values.

## Key distribution

A 5, B 8, C 6, D 1 of 20 questions (25 / 40 / 30 / 5 %). This is identical to the published items: no key moved. B is at the 40 % maximum but not above it. Options: 11 three-option and 9 four-option questions (45 % four-option). The key sequence across the batch is unchanged, with no letter three times in a row.

## Doubts for the reviewer

1. **telefoon:** the new sentence "Bij een oplaadaansluiting of waterschade bellen wij u als de telefoon klaar is." partly repeats the general "Wij bellen u als de telefoon klaar is." I chose this over naming a weekday, because "in 2 dagen" or "in 3 dagen" counted from a Saturday crosses the closed Sunday, and any fixed day could be contested. "Een nieuw scherm is dan op maandag klaar" overrides the before-12.00 rule on Saturdays, and distractor B tests exactly that override.
2. **terugbrengen q1:** the rules also say the garment is "niet gewassen". The prompt says the jacket was not worn, which in practice implies not washed. The spec asks only for the price tag, so I did not add "en niet gewassen". Add it if you want every condition entailed literally.
3. **terugbrengen q2:** after the prescribed shortening of A, key C is the longest option by characters (49 against 44 and 41), although all three options have eight words. I did not touch B or C, because they are outside the fix list. The checker only flags this per text with four or more questions.
4. **ramen q2:** key A was already the longest option by characters before this fix (47 against 41–43). This is pre-existing and out of scope.
5. **politiebureau q2:** I used "Waar moet zij kijken?" instead of the spec's example "Waar kan zij kijken?". "moet" mirrors the instruction "Kijk op …" and, together with "Dan gaat u niet naar de politie", keeps exactly one defensible answer. "kan" would also be acceptable.
6. **Checker warnings:** the two "longest sentence" warnings (telefoon 48, gezinskaart 45) count the price tables, whose lines have no sentence punctuation, as one sentence. The published version gives the same warnings, and the new telefoon sentences are 8 and 13 words.

## batch:check output

`npx tsx scripts/batch-check.ts content/batches/053-original.json`

```
Checked 8 items, 20 questions. Keys: {"B":8,"A":5,"C":6,"D":1}. Options: {"3":11,"4":9}.
  info  8 of 8 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
  warn  A2:reading:batch004-telefoon:1: longest sentence 48 words (A2 target 18)
  warn  A2:reading:batch021-gezinskaart:1: longest sentence 45 words (A2 target 18)
2 warning(s), no failures.
```

SHA-256 of `content/batches/053-original.json` when these notes were written: `53001109b836b101d6ff75dc686829542d579cc3cde66691fc01f1ed774bdfac`.
