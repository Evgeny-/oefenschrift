# Batch 053 review (A2 reading, authorised replacement)

**Verdict: pass.** All 8 items pass, with no reviewer edits and nothing rejected. `content/batches/053-proposed.json` is a byte-for-byte copy of the author's `content/batches/053-original.json`.

Reviewer: an independent AI reviewer (Claude Opus 5.5) working in a separate context. I did not write this batch. Reviewed on 14 October 2026 against `docs/briefs/review.md`, `content/reviews/rubric.md`, blueprint §4.1, `tmp/content-fix-2026-10-14/spec/common.md`, `review-common.md` and the 053 section of `053-054.md`.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| A2:reading:batch004-telefoon:1 | pass | comparable | The Saturday rule now agrees with the price list: a screen is ready on Monday, and the shop calls about the slower repairs. Keys B/A/C proven. |
| A2:reading:batch001-pakketpunt:1 | pass | comparable | The first sentence now describes a failed delivery. No evidence quote contains it. Keys B/C proven. |
| A2:reading:batch021-terugbrengen:1 | pass | comparable | The q1 prompt now states the price tag, so key B is entailed. q2 option A no longer names the object twice. Keys B/C/B proven. |
| A2:reading:batch004-ramen:1 | pass | comparable (easy end) | "omhooggaat" is now spelled correctly. Keys B/A proven. |
| A2:reading:batch004-verwarming:1 | pass | comparable | "Wat moet hij eerst doen?" is plain and clear. Keys C/A proven. |
| A2:reading:batch021-gezinskaart:1 | pass | comparable (upper end) | The family card at 36,00 is now plausible, and no question uses the price. Keys A/C/B proven. |
| A2:reading:batch020-spoorwerk:1 | pass | comparable | The unsupported "alleen" is gone. Option B is now refuted from the unconditional bike ban. Keys A/C/D proven. |
| A2:reading:batch020-politiebureau:1 | pass | comparable | "Waar moet zij kijken?" is clear A2 and leaves one defensible answer. Keys B/B proven. |

## What was checked

- **Diff against the base.** I compared each item with `tmp/content-fix-2026-10-14/base/053-base.json`. The base equals the live catalogue records apart from `status` and `revision`. There are 11 field changes, all on the fix list or direct consequences of it:
  - telefoon: `text`, q2 `evidence`, q2 `explanation`
  - pakketpunt: `text`
  - terugbrengen: q1 `prompt`, q2 option A
  - ramen: q2 option C
  - verwarming: q1 `prompt`
  - gezinskaart: `text`
  - spoorwerk: q2 `explanation`
  - politiebureau: q2 `prompt`

  Item order, field order and keys are as in the base. There is no `type` field, no `revision` and no media or image field.
- **Full reading.** I read every item in full. All 20 keys are proven from verbatim evidence, and every distractor was tested as a competing answer (the per-question audit is in the JSON). Every explanation agrees with its key and the text.
- **Key signals.** No prompt word recurs only in a key. No key is the odd polarity out (terugbrengen q2 Ja/Nee/Nee\*, gezinskaart q1 Ja\*/Nee/Nee/Ja, spoorwerk q2 Ja/Ja/Nee\*/Nee). The longest option is the key in 4 of 20 questions, below the roughly 6 expected by chance.
- **Dates.** All eight weekday–date pairs hold in 2026 (12, 13 and 18 May; 24 September; 5, 16, 17 and 19 October).
- **A2 heuristics.** Counting prose sentences only (header and table lines excluded), averages are 6.3–9.7 words and the longest sentence has 17. The only subordinator is "als". The new text sentences have 8 and 13 words; the new prompt sentence has 17.
- **Invented names.** Three batch-004 names had never been checked on the web: "Woningstichting De Berk", "deberk.nl" and "Telefoonwinkel De Knop". A WebSearch on 14 October 2026 found no real business for any of them, and "westerhout.nl" is not an indexed site. The 020 and 021 reviews already checked Vlierbes, Het Blikken Paard, Zuidstad and Noorddorp. The batch has no KNM content.
- **Other copies of the old strings.** The old strings appear only in `content/catalogue.json`, which integration replaces. `content/evidence/001-existing.json` holds the historical batch-001 overlay for pakketpunt, which cannot overwrite a rewritten item. The one cross-part neighbour, listening `batch005-scherm`, is an unnamed shop with other prices and rules, so there is no contradiction.

## Decisions on the author's doubts

1. **telefoon, the repeated "bellen wij u als de telefoon klaar is": keep.** The repetition does a job: it tells a Saturday customer that the slower repairs get no fixed day, unlike the screen's Monday. Naming a weekday would mean counting 2 or 3 days across the closed Sunday, which a learner could contest. The paragraph follows the spec's own suggestion. "Bij een oplaadaansluiting" is clipped but matches the folder's register ("Op zaterdag doen wij alleen batterijen") and maps onto the table row. On Saturday, "Een nieuw scherm is dan op maandag klaar" overrides the before-12.00 rule, and option B tests exactly that.
2. **terugbrengen q1, "niet gewassen": do not add it.**
   - The price tag is a condition a reader cannot infer, because tags are often cut off at home, so it had to be stated. That a jacket has not been washed follows from "niet gedragen".
   - No option turns on washing. Option C's reason, "niet meer", is the 30-day limit.
   - Adding it would stretch a four-sentence prompt to 38 words and turn it into a copy of the rule list.
3. **terugbrengen q2, key C now the longest option by characters (49 against 44 and 41): keep.**
   - All three options have eight words in the same "Ja/Nee, want …" frame, so the 5-character gap is not a visible cue. The checker's per-text threshold is not reached.
   - Across the batch the key is the longest option in only 4 of 20 questions, so length gives no strategy.
   - The prescribed option A copies the rule sentence "Het prijskaartje zit er nog aan.", which is what makes it a strong lure. Padding B or rewording the key would change fields outside the fix list for no gain to the learner.
   - This means the 021 review's "no key is the longest option by words or characters" no longer holds by characters for this one question. I accept that.
4. **ramen q2, key A the longest by characters: keep.** This predates the fix and is outside the fix list. A ties with D at eight words, and the fix only shortened C by one character. As the 004–005 level check noted, this purpose question remains the weakest question in the item.
5. **politiebureau q2, "moet" or "kan": keep "Waar moet zij kijken?".**
   - It mirrors the instruction "Kijk op …" and fits all three options as places to look.
   - "moet" asks what the text tells her to do, so option A, going to the police station anyway, cannot be argued as a possibility the way it could be under "kan".
6. **Checker warnings: accept.** The checker's splitter reads the header and table lines as one long sentence. The longest real sentences are 13 words (telefoon) and 17 words (gezinskaart).

Additional note on verwarming: `docs/research/exam-blueprints-2026-09-10.md` records "Wat moet hij het eerste doen?" as an official DUO question form. "eerst" is the plain standard form and just as clear, so the authorised fix does not reduce exam-likeness.

## Edits

None. The author's 11 changes are correct and complete, and no further change was needed.

## Rejected

None.

## Diversity and set assembly

IDs and set membership are unchanged:

| Set | Items |
| --- | --- |
| a2-reading-01 | pakketpunt |
| a2-reading-05 | telefoon, verwarming |
| a2-reading-06 | ramen |
| a2-reading-07 | terugbrengen |
| a2-reading-08 | gezinskaart |
| a2-reading-10 | spoorwerk, politiebureau |

No key letter moved, so key balance within the sets is unchanged. Across the batch the keys are A5 B8 C6 D1: B is at the 40% maximum, and D is the key in 1 of 9 four-option questions. This is the published distribution of these eight items, a property of this grouping rather than of any mock form. There are 9 four-option questions (45%) and 2 purpose questions, and every text has a persona question.

## Media

None. A2 reading items have no question, intro or prompt audio, and these eight items have no images. Their catalogue records hold no media fields. Three question prompts changed (terugbrengen q1, verwarming q1, politiebureau q2), but no clip exists for them or needs to be generated. Integration assigns new revisions, so saved sessions for these IDs start fresh.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence. `targetLevelValidated` stays false.
- No `content/exemplars` directory exists. Level verdicts compare each text with the official A2 Lezen description and the 004–005 level check.
- Web searches cover indexed pages only. I did not check the domain registration of deberk.nl or westerhout.nl.
- Optional notes from the 004 review are still unapplied: "ook in het weekend" on the verwarming website line, and the telefoon q3 concept repeat. They are not defects.

## Checker and hash

```
npx tsx scripts/batch-check.ts content/batches/053-proposed.json
Checked 8 items, 20 questions. Keys: {"B":8,"A":5,"C":6,"D":1}. Options: {"3":11,"4":9}.
  info  8 of 8 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
  warn  A2:reading:batch004-telefoon:1: longest sentence 48 words (A2 target 18)
  warn  A2:reading:batch021-gezinskaart:1: longest sentence 45 words (A2 target 18)
2 warning(s), no failures.
```

SHA-256 of `content/batches/053-proposed.json`: `53001109b836b101d6ff75dc686829542d579cc3cde66691fc01f1ed774bdfac`. This is identical to the author's file.

Coordinator: run `npm run batch:adopt 053`, then `npm run content:integrate`. No audio or illustration step is needed.
