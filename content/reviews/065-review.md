# Batch 065 review

Independent AI editorial review of replacement batch 065 (B1 writing, three items), written in a fresh context. I did not author the batch. I followed `tmp/content-fix-2026-10-19/spec/review-common.md`, `docs/briefs/review.md` and `content/reviews/rubric.md`, and checked the work against the spec `tmp/content-fix-2026-10-19/spec/065.md` and the audit `tmp/content-fix-2026-10-19/audit/writing.md`.

AI editorial review does not validate CEFR difficulty or official exam equivalence.

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| B1:writing:batch015-kledingkast:1 | pass | comparable | The new sentence "U hebt al geprobeerd het probleem op te lossen, maar dat is niet gelukt." no longer answers C2 ("wat u zelf al hebt gedaan … Bedenk dit zelf"). It keeps the earlier failed attempt the e-mail needs. |
| B1:writing:batch029-groepsresultaten:1 | pass | comparable | The 40-word request is now three sentences of 17, 16 and 14 words. They carry the three requests in criteria order. Nothing else changed. |
| B1:writing:batch015-avondcursus:1 | pass | comparable | The label "Heeft u al ervaring met dit onderwerp? Zo ja, welke?" no longer assumes experience on a beginners' course. It now matches C1 as batch 060 left it. |

Totals: 3 pass, 0 edited, 0 rejected. Batch verdict: pass, ready for integration.

## Edits

None. `content/batches/065-proposed.json` is a byte-identical copy of the author's `065-original.json` (SHA-256 `1eda197b148455572e2ca555210d2107dc3f5d41b4aa480fffbdaa8117f5789d`). No starter changed, so there is no proposed starters file. The review uses `content/batches/065-starters.json`, which is identical to the starters base and to the current entries in `content/hints/sentence-starters.json`.

## What was checked

- **Base diff.** I ran a field-level diff against `tmp/content-fix-2026-10-19/base/065-base.json`. The changed leaves are:
  - `status` → `"draft"` on all three items;
  - `prompt` on kledingkast (fourth sentence only) and on groepsresultaten (the coordinator sentence only);
  - `formFields[4].label` on avondcursus.

  Item order and key order are unchanged. There is no `revision`, media field or `type` field, and there are no images. The base equals the catalogue record minus `revision`.
- **Checker.** `npx tsx scripts/batch-check.ts content/batches/065-proposed.json` reports "No failures, no warnings", plus the expected info line that the three items are already in the catalogue.
- **Open-task contract.** I checked this with a script:
  - each item has exactly one null quote (kledingkast C2, groepsresultaten C3, avondcursus C0);
  - every other quote is a verbatim substring of its sample and meets its criterion;
  - each item has one starter per criterion, and each starter contains "…";
  - no prompt sentence or form label shares a 4-word sequence with any sample or model;
  - model lengths are 179 and 178 words for the korte schrijftaken (120–180) and 116 words for the deelschrijftaak (50–150).

  The longest prompt sentences are 19, 17 and 18 words, all within the B1 limit of 30.
- **Visibility.** `app/components/OpenExercise.tsx` shows the criteria and starters while the learner answers, because these items have no cue, no images and no zinstaak. I re-read the title, the criteria and the starters against the changed prompts. None of them gives away content the learner must invent.
- **Dates.** All six weekdays in the items are correct:
  - kledingkast: 25 Aug 2026 is a dinsdag, 4 Sep a vrijdag, 9 Sep a woensdag and 18 Sep a vrijdag; "vijf dagen te laat" is correct;
  - groepsresultaten: 13 Nov and 11 Dec 2026 are both vrijdagen.

## Decisions on the author's doubts

1. **kledingkast, singular "het probleem".** Kept. C2 and the next prompt sentence use the same singular, and in context it means the matter as a whole. Changing it would break that echo for no gain in clarity.
2. **kledingkast, no "Bedenk zelf" in the prompt.** Kept. C2 is visible and says "Bedenk dit zelf", which matches the official bullet form. A learner who copies the new prompt sentence still says nothing about what they did, so the copy does not meet C2.
3. **groepsresultaten, two questions in the second sentence.** Kept. Attendance and "wat u daarbij opvalt" form one criterion (C3), and the audit's own proposal joins them. The sentence is 16 words long.
4. **avondcursus, "Heeft u" or "Hebt u".** "Heeft u" is accepted. It is standard on Dutch forms, and the other B1 form label in the bank ("Welke werkervaring heeft u?") uses it.
5. **kledingkast title.** Kept. It names the damage that the table already states (fact transfer, as on the official form).

## Diversity and set assembly

Set membership in `content/practice-sets.json` is unchanged: avondcursus stays in b1-writing-03, kledingkast in b1-writing-04 and groepsresultaten in b1-writing-10. The settings of the three items are unchanged and distinct: a webshop complaint, a teacher's report and a course enrolment form.

## Media notes

None. B1 writing has no audio and these items have no images, so no `#prompt` or `#cue` clip needs generation.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- `content/exemplars/` does not exist. The level comparison uses B1 korte schrijftaken and form deelschrijftaken already in the bank (magnetron, pauzerooster, uitzendwerk, opleiding).
- No feedback-judge calls were made, so judge behaviour on the changed prompts was not measured.
- No names or organisations changed, so no web check was needed. KNM facts are not in scope.
- The prompt and label text changed, so integration gives each item a new revision and saved progress on them restarts. No audio is involved.
