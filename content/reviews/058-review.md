# Batch 058 review (A2 Schrijven, eleven replacement tasks)

**Verdict:** pass. All eleven tasks and all eleven starter sets pass. I made no edits. `content/batches/058-proposed.json` is a byte-identical copy of the author's `content/batches/058-original.json`. There is no proposed starters file, because the author's `content/batches/058-starters.json` passes as written.

- Proposed source: `content/batches/058-proposed.json`, SHA-256 `a1013359351af41416514924322573ce4805f9ce4b13e90e87e0add1378fc668`
- Starters: `content/batches/058-starters.json`, SHA-256 `01db13af389d922274ac82fb07c3a9c6df09c4afc926a86a6d32da8975e8aa5e`
- Reviewed on 14 October 2026 by an independent AI reviewer (Claude Opus 5.5), in a context separate from the author's. This is AI editorial review. It does not validate CEFR difficulty or equivalence with the official exam.

## What I checked

- **Diff against the base.** I compared every field of every item with `tmp/content-fix-2026-10-14/base/058-base.json`. Only the fields that spec 058 names changed, plus their direct consequences:
  - bezorging: criterion 0 and the starter now use the relative date.
  - sportclub: starter 3 no longer assumes the answer is yes.
  - Item order and key order are unchanged. No `revision` or media fields were added. Image briefs and alt texts are byte-identical.
  - The base equals the catalogue apart from `status`, `revision` and `images[].file`. The starters base equals the hints overlay.
- **Checker.** `npx tsx scripts/batch-check.ts content/batches/058-proposed.json` reports 11 items, "No failures, no warnings".
- **Samples, quotes and models.**
  - Every quote is a verbatim substring of its sample, and each sample has exactly one `null` quote.
  - Each sample has exactly one deliberate learner error.
  - Every model meets every criterion and stays within its blueprint §10 target. No model sentence is over 16 words or has more than one subordinate clause.
  - No sample or model sentence copies a prompt sentence or form label; the check was normalised for case and spacing.
  - The only absolute date left in the batch is huur's "1 december", which the learner chooses. It has no year and is still in the future.
- **What learners see.** `app/components/OpenExercise.tsx` (about lines 290–302) hides the criteria of `picture-note` tasks until review, and it hides their starters too. The criteria of e-mails, forms and wijkkrant pieces are shown before writing. A form's answer box starts with one line per field label, so a bare "Nee" is read next to its question.
- **Pictures.** I looked at all six drawings (restaurant and supermarkt). Each shows one clear action, and the actions match criteria 0–2.
- **Judge evidence.** This comes from the coordinator's runs on `gpt-6-luna` (scratchpad `mr-v1.log`, `rest.log` and the scratch catalogue).
  - meerijden: the batch criteria equal variant `meerijden:v1` with the same prompt, sample and model. The runs give 35 of 36 correct decision vectors.
  - restaurant: the batch criteria equal variant `restaurant:v1`. The runs give 15 of 15 correct, and the old "zij" wording also gave 15 of 15. The change therefore fixes the wording learners see without changing judge decisions.
- **Invented names, checked on the web on 14 October 2026.**
  - No business trades under "Woonstichting De Brug", "Elektrowinkel Van Dam" or "sportclub De Sprong".
  - Similar names exist: [Elektrik van Dam](http://www.elektrikvandam.nl/newpage.php?id=53) (an electrical shop in Gouda), [Sportcomplex De Sprong](https://www.optisport.nl/de-sprong-middelburg) (Middelburg), [Woonvoorziening De Brug](https://woonvoorzieningdebrug.nl/) (a care provider in Alkmaar) and [De Brug](https://www.woonzorg.nl/de_brug_veendam) (a Woonzorg housing complex in Veendam).
  - `elektrovandam.nl` is free according to the SIDN whois, and `woonstichtingdebrug.nl` does not resolve (NXDOMAIN).
  - I accept the names as generic invented names. They predate this batch and the spec does not touch them.
- **Not applicable.** The batch has no KNM facts. A2 writing has no spoken text, so there are no scripts, prompt audio or cues to check.

## Verdicts

| ID (`A2:writing:batch008-…:1`) | Verdict | Level | Reason |
| --- | --- | --- | --- |
| meerijden | pass | comparable | The spec criteria are used verbatim and were tested with the judge. The sample omits only the pick-up time and place. The petrol sentence meets "als bedankje". The model (59 words, 7 sentences) meets all four. |
| sportclub | pass | comparable | "Zo ja, waar?" makes an honest "Nee" a full answer. Starter 3 no longer assumes "yes". The model (43 words) answers each field in one sentence. |
| kast | pass | comparable (light end) | The criterion names Karim and asks for a day and a time. "Kan het zaterdag om tien uur?" follows the request for help and meets it. The sample gives only a duration. |
| restaurant | pass | comparable | The criteria are addressed to Roos. The prompt announces three things from the pictures. The model is 33 words with one sentence per picture. |
| supermarkt | pass | comparable | The criteria name Sem. The model is 40 words, the top of the 20–40 range. "bij de ingang" adds a place that picture 3 does not show, but it does not contradict the picture. |
| bezorging | pass | comparable (upper end) | The dates are relative everywhere. Quote 1 now gives a day and a clock time and keeps the "bezorgt" error. The model is 63 words in 7 sentences. |
| lantaarnpaal | pass | comparable | "sinds vorige week maandag" fits "al een week". The problem now takes two sentences. The model is 41 words. |
| huur | pass | comparable | Quote 1 is now the full sentence about the move and the new job, verbatim in the sample. The model is unchanged. |
| reizen | pass | comparable | The model is 42 words in 5 sentences and answers how, how long and the opinion. |
| gezond | pass | comparable | The model is 42 words in 4 sentences and answers what, how often and what is hard. Its sentences are the densest of the three wijkkrant models, but within §10. |
| boodschappen | pass | comparable | The model is 39 words in 4 sentences and answers where, when and the opinion. |

Level comparisons use the official task descriptions in `docs/research/exam-blueprints-2026-09-10.md` §3.1 and blueprint §4.4 and §10, and the catalogue items named in the review JSON, because `content/exemplars/` does not exist.

The 2026-09-10 level check flagged restaurant and supermarkt as "easier as displayed". That flag no longer applies, because their requirements and starters are now hidden until review. Its mild "harder" flag on bezorging concerned the content load (six elements, five of them invented). This replacement does not change that load, and the model now has 7 sentences. I rate bezorging as on-level at the upper end.

## Edits

None.

## Rejected

None.

## Decisions on the author's doubts

1. **meerijden, criterion 2 residue.** No content change. The one miss in 36 runs is a judge-side edge case: an address in a separate sentence. That answer passed in the other two runs. The starter "Je kunt mij ophalen bij … om …" already steers learners towards an explicit pick-up sentence.
2. **meerijden, petrol money as "bedankje".** Keep. Offering to pay towards the petrol is the usual way to repay a lift. The English criterion ("to thank her") and the starter "Als dank wil ik graag …" fit it. All six petrol answers met the criterion in all 18 runs, while the "Dank je wel!" control correctly failed in 3 of 3, so the criterion still separates a gesture from plain thanks. The sample quote and the model sentence stay.
3. **kast, "Kan het zaterdag om tien uur?".** Keep. It follows "Kun je mij helpen met dragen?", so "het" refers to the help. The sentence names a day and a time, and it matches the starter "Kan het op … om …?".
4. **bezorging sample and starter.** Keep "om 10 uur" before "Dan ben ik de hele dag thuis.": it is plausible learner text. Keep the starter "Kunt u de wasmachine bezorgen op …?". Its natural completions, such as "op donderdag om tien uur", do not need "volgende week".
5. **lantaarnpaal, "sinds vorige week maandag".** Keep. It is idiomatic and consistent with "al een week".
6. **supermarkt length and "bij de ingang".** Keep. The model is within the 40-word limit. The place is the note-writer's own instruction and does not contradict picture 3, where the boy sweeps beside shelves.
7. **Wijkkrant trims.** All three are accepted. The repeated "meestal" in boodschappen mirrors two guiding questions and is acceptable A2 style.
8. **sportclub starter "Hij heeft deze sport … gedaan.".** Accepted. Completions for both "no" and "yes" are grammatical: "nog nooit gedaan" and "twee jaar bij een club in Utrecht gedaan".
9. **Left unchanged.** Accepted. huur's "1 december" has no year and stays in the future. The sportclub sample may answer a field in two sentences.

## Diversity and set assembly

The replacement keeps all eleven IDs, topics and set memberships:

- a2-writing-04: meerijden, lantaarnpaal and reizen
- a2-writing-05: sportclub and gezond
- a2-writing-06: kast, huur and boodschappen
- a2-writing-07: restaurant, supermarkt and bezorging

The two picture notes share their frame, as the task type requires, and both sit in a2-writing-07. That membership predates this batch and is preserved. A mock form should hold only one of them.

## Media

- **Audio:** none. A2 writing has no prompt, cue or question audio, so no clip needs generation or a transcription round trip. The bezorging prompt is printed only.
- **Images:** none redrawn. The restaurant and supermarkt briefs and alt texts are byte-identical to the base.
- **Revisions:** every item changes at least one field that feeds the exercise revision. huur changes only through `quotes`. All eleven therefore get new revisions, and saved answers to them start fresh.
- **Starters:** two starters changed: sportclub 3 and bezorging 1. Merge them into the overlay through integration with `--refresh-hints`.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- I did not call the production judge. The judge evidence for meerijden and restaurant comes from the coordinator's synthetic runs. The reworded criteria of sportclub, kast, supermarkt and bezorging were judged editorially only.
- `content/exemplars/` does not exist. The level verdicts compare against official task descriptions and catalogue items, and they do not calibrate difficulty.
- I looked at the drawings only to confirm that they match the criteria. This is not a media approval.
- I did not run browser, integration or app checks.
