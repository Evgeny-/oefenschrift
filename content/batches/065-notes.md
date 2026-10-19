# Batch 065 author notes

This is an authorised replacement (rewrite) of three published B1 writing exercises:

- `B1:writing:batch015-kledingkast:1` (korte schrijftaak with a table, `klagen`, set b1-writing-04);
- `B1:writing:batch029-groepsresultaten:1` (korte schrijftaak with a table, `informeren`, set b1-writing-10);
- `B1:writing:batch015-avondcursus:1` (deelschrijftaak with a form).

All three IDs belong in the review's `replaces` list.

**Why.** On 19 October 2026 a learner filed report 6 against `A2:speaking:batch001-apotheek:1`. The prompt gave away where Roos was, and its opinion question was meaningless. The owner confirmed the report and asked for every similar exercise to be checked. The writing audit (`tmp/content-fix-2026-10-19/audit/writing.md`) found the following problems in these items:

- kledingkast: a prompt sentence that supplies the answer to a "Bedenk dit zelf" criterion (medium);
- groepsresultaten: a 40-word prompt sentence with three nested questions, over the B1 limit of 30 words (medium);
- avondcursus: a low-priority note. The form label still presumes experience on a beginners' course, although batch 060 fixed the criterion.

The coordinator accepted all three in `tmp/content-fix-2026-10-19/spec/065.md`.

**Base and method.** The base is `tmp/content-fix-2026-10-19/base/065-base.json`, which holds the published records with media removed. A script in the session scratchpad applies exact string replacements; each replacement asserts that it matches exactly once. A field-level diff against the base then confirms what changed. Only these leaves differ:

- `status` on all three items, which is now `"draft"`;
- `prompt` on kledingkast and on groepsresultaten;
- `formFields[4].label` on avondcursus.

Key order, item order, tables, scaffolds, criteria, samples, quotes and models are identical to the base. No `revision` or other generated field was added. `targetLevelValidated` stays `false`. This is AI editorial authoring and does not validate CEFR level or exam equivalence.

**Visibility.** For both korte schrijftaken and for the form deelschrijftaak (no images), `app/components/OpenExercise.tsx` shows the criteria while the learner answers. The title and any opened starters are visible too. I checked that none of these gives away a criterion after the change.

## Changes per item

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| kledingkast | `prompt`, fourth sentence | "U hebt al contact gehad met de klantenservice, maar er is nog niets opgelost." | "U hebt al geprobeerd het probleem op te lossen, maar dat is niet gelukt." | C2 asks "Schrijf wat u zelf al hebt gedaan om het probleem op te lossen. Bedenk dit zelf." The old sentence handed over the answer (contacting customer service). I used the spec's wording rather than the audit's "U hebt zelf al iets gedaan, maar er is nog niets opgelost.": "iets gedaan" is vague Dutch, and "geprobeerd … op te lossen" mirrors C2 and the end of the prompt ("dat de winkel het probleem oplost"). The new sentence keeps the fact the e-mail needs, an earlier attempt that failed, without saying what the attempt was. |
| groepsresultaten | `prompt`, fourth sentence split into three | "De coördinator van de cursussen, meneer Verhoeven, vraagt u per e-mail hoe de groep het heeft gedaan, hoe de aanwezigheid bij de lessen was en wat u daarbij opvalt, en wat u voorstelt voor de laatste weken van de cursus." (40 words) | "De coördinator van de cursussen, meneer Verhoeven, vraagt u per e-mail hoe de groep het heeft gedaan. Hij wil ook weten hoe de aanwezigheid bij de lessen was en wat u daarbij opvalt. Ten slotte vraagt hij wat u voorstelt voor de laatste weken van de cursus." (17, 16 and 14 words) | B1 allows no sentence over 30 words (blueprint §10), and the learner should be able to follow the three requests. Each sentence now carries one request, and the requests follow the order of C1/C2, C3 and C4. I kept "vraagt u per e-mail" from the original first sentence, where the audit had "wil weten". That is the smaller change, and it keeps the request by e-mail that the sample ("U vroeg mij …"), the model ("zoals afgesproken") and starter 0 ("Zoals u vroeg, …") answer. The audit's "Ten slotte wil hij weten" became "Ten slotte vraagt hij" so that "wil weten" is not repeated. |
| avondcursus | `formFields[4].label` | "Welke ervaring heeft u al met dit onderwerp?" | "Heeft u al ervaring met dit onderwerp? Zo ja, welke?" | The course is "Boekhouden voor beginners", and batch 060 widened C1 to "Schrijf of u al ervaring hebt met boekhouden en, zo ja, welke." The label now asks the same yes/no question, so "Ik heb nog geen ervaring" answers the field as well as the criterion. I wrote "Heeft u" where the spec suggested "Hebt u". The form already uses "heeft u" (the old label), and so does the other B1 form label in the catalogue ("Welke werkervaring heeft u?"). Both forms are correct. "Zo ja, …" follows an existing catalogue label ("Heeft uw kind deze sport eerder gedaan? Zo ja, waar?"). |

Prompt length: kledingkast 81 → 81 words; groepsresultaten 111 → 118 words, longest sentence 40 → 17 words; avondcursus prompt unchanged at 53 words.

### Consequential checks: no other field had to change

- **kledingkast.** The model says "Ik heb dit dezelfde dag gemeld bij uw klantenservice en foto's van de schade gestuurd. Uw medewerker beloofde dat ik binnen twee dagen antwoord zou krijgen, maar tot nu toe heb ik niets gehoord." This is now the writer's own invention, and it agrees with "dat is niet gelukt". The sample still misses only C2 (`quotes[2]` is null), and the other four quotes are verbatim. Starter 2, "Ik heb inmiddels al …", states no fact.
- **groepsresultaten.** The criteria, table, sample, quotes, model and starters fit the split prompt unchanged. The sample still misses only C3, attendance (`quotes[3]` is null).
- **avondcursus.** The model ("Een cursus boekhouden heb ik nog niet gevolgd, maar in mijn geboorteland heb ik drie jaar de administratie gedaan …") and the sample (`quotes[1]`) both answer "Zo ja, welke?" with experience in an uncle's shop. The sample still misses only C0 (one reason). Starter 1, "Met boekhouden heb ik … ervaring, want …", works for both answers.
- **No copying.** No 4-word sequence of any prompt or form label appears in any sample or model (case-insensitive check). Every quote that is not null is a substring of its sample. Each sample has exactly one null.
- **Model lengths.** These are unchanged: kledingkast 179 and groepsresultaten 178 words (120–180), avondcursus 116 words (50–150).

## Starters (`content/batches/065-starters.json`)

The file is identical to `tmp/content-fix-2026-10-19/base/065-starters-base.json`, in batch order with one fragment per criterion. No criterion changed. No fragment gives away anything the changed prompts or label now hold back.

## Media consequences

None. B1 writing has no audio, so no `#prompt` or `#cue` clip needs regeneration. These items have no images, and no generated field was added.

## Doubts for the reviewer

1. **kledingkast, singular "het probleem".** The sentence before it names two dissatisfactions (delivery and the cabinet). I kept the singular because C2 and the next prompt sentence ("dat de winkel het probleem oplost") both use it. "de problemen op te lossen" would be more exact, but it would no longer echo C2.
2. **kledingkast, no explicit "Bedenk zelf" in the prompt.** The prompt does not tell the learner to say what they already did. C2 does, with "Bedenk dit zelf", and the criteria are visible while answering, which is how the official bullets work. Following the spec ("nothing else changes"), I did not add "Bedenk zelf wat u al hebt gedaan." to the prompt. "geprobeerd … op te lossen" could also invite "I tried to repair the door myself". C2 accepts that.
3. **groepsresultaten, second sentence.** It still joins two questions with "en" (attendance, and what strikes you). They form one criterion (C3), so I kept them together rather than writing a fourth sentence.
4. **avondcursus, "Heeft u" or "Hebt u".** This is a style choice. If the reviewer prefers the spec's "Hebt u", the swap is one word and has no other consequences.
5. **Not changed, out of scope.** The kledingkast title "Klacht over een beschadigde kledingkast" names one of the two problems in C1. The table states the same damage ("één deur beschadigd"), which is the official fact-transfer form, so I left the title.

## Checker output

`npx tsx scripts/batch-check.ts content/batches/065-original.json`

```text
Checked 3 items, 0 questions. Keys: {}. Options: {}.
  info  3 of 3 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
