# Batch 058 author notes

Authorised replacement batch for eleven integrated A2 writing tasks from batch 008. Written on 14 October 2026 from `tmp/content-fix-2026-10-14/base/058-base.json` and `tmp/content-fix-2026-10-14/base/058-starters-base.json`, following `tmp/content-fix-2026-10-14/spec/common.md` and `tmp/content-fix-2026-10-14/spec/058.md`. Author: Claude Opus 5.5, in a context separate from the reviewer. Every record keeps its ID, its position and its set membership. Status is `draft` and `targetLevelValidated` is `false`. No media, `revision` or derived fields were added. Image briefs are unchanged. This is editorial work. It does not validate CEFR difficulty or establish exam equivalence.

## Why these items are replaced

The project owner authorised the fixes after the editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, sections 2, 3.4–3.6 and the A2 writing lines of section 4) and two learner reports:

- **Report 4, 7 October 2026, `A2:writing:batch008-restaurant:1`:** "why is 'zij' used when the note is addressed to Roos". The restaurant and supermarkt criteria were in the third person ("Schrijf dat zij/hij …"). They are hidden until review. When the AI suggestion falls back to placeholders, they appear verbatim inside the suggested note (`withPlaceholders` in `server/services.ts`).
- **Report 5, 7 October 2026, `A2:writing:batch008-meerijden:1`:** "I did what was asked and they said I didn't write it". The judge reads every criterion literally, and the old wording rejected natural complete answers.
- **Other audit findings:**
  - sportclub: an honest "Nee" was impossible.
  - kast: the criterion was unnatural.
  - bezorging and huur: sample quotes disagreed with their criteria.
  - bezorging: its dates are now in the past.
  - lantaarnpaal: the model used a date the prompt does not give.
  - restaurant, supermarkt, reizen, gezond and boodschappen: models were over the blueprint length.

## Replaced IDs

The review JSON needs all eleven in `replaces`. All are integrated from `content/batches/008-original.json`.

- `A2:writing:batch008-meerijden:1`
- `A2:writing:batch008-sportclub:1`
- `A2:writing:batch008-kast:1`
- `A2:writing:batch008-restaurant:1`
- `A2:writing:batch008-supermarkt:1`
- `A2:writing:batch008-bezorging:1`
- `A2:writing:batch008-lantaarnpaal:1`
- `A2:writing:batch008-huur:1`
- `A2:writing:batch008-reizen:1`
- `A2:writing:batch008-gezond:1`
- `A2:writing:batch008-boodschappen:1`

## What the author read and verified

Read:

- `AGENTS.md`
- `docs/briefs/author.md`, including the shared record contract and the rewrite rule
- `content/blueprint.md` §1, §3, §4.4, §6, §8 and §10
- `content/reviews/rubric.md`
- `docs/research/content-workflow.md` §3–4, §10 and "Optional sentence starters"
- `content/batches/008-notes.md`
- the judge payload and placeholder fallback in `server/services.ts`
- `app/components/OpenExercise.tsx` around line 291

That component hides the criteria until review for `picture-note`, `zinstaak`, cued tasks and `deelschrijftaak` with images, and it also hides starters for `picture-note` until review. The two picture notes therefore have to announce everything in the prompt. They do: "Kijk naar de plaatjes. … Vertel wat zij/hij moet doen. Schrijf drie dingen op." The three tasks are what the three pictures show. E-mail, form and wijkkrant criteria are visible before answering.

Verified before editing:

- The base records equal the catalogue records apart from `status`, `revision` and media fields.
- The starters base equals the eleven entries in `content/hints/sentence-starters.json`.

After editing, a field-level diff against the base shows that only the fields in the table below changed. Key order and item order are unchanged.

Judge evidence comes from the coordinator's runs. The author did not call the production judge.

- **meerijden:** the criteria are verbatim the variant `A2:writing:batch008-meerijden:v1` in the coordinator's scratch catalogue. The run log (`/private/tmp/claude-501/-Users-evgeny-nikiforov-Projects-inburgering/facbb40b-a149-4265-8526-2c767cfdb29b/scratchpad/mr-v1.log`, model `gpt-6-luna`) shows 35 of 36 correct decision vectors for twelve synthetic answers × 3 runs.
  - The only miss is `adres_apart#2`: c2 was judged unmet for "Ik woon in de Kerkstraat 12. Kom je om 8 uur?".
  - All six answers that offer petrol money as the thank-you met c3 in all 18 runs, for example "Ik betaal mee voor de benzine." and "Ik geef jou 20 euro voor benzine.".
- **restaurant:** the criteria are verbatim the variant `…restaurant:v1`. `rest.log` in the same folder shows 15 of 15 correct, covering requests, "je moet", imperatives, learner errors and a control without the windows.

## Changes per item

Word counts are whitespace tokens, as `scripts/batch-validation.ts` counts them. The phone number "06 23 45 67 89" counts as five, which is why bezorging shows 65 words before the edit, where `008-notes.md` gave 58.

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| meerijden | `criteria[0]` | "Schrijf waarom u volgende week niet met de bus kunt." / "Say why you cannot take the bus next week." | "Schrijf waarom u volgende week niet met de bus kunt (bijvoorbeeld: de bus rijdt niet)." / "Say why you cannot take the bus next week (for example: the bus is not running)." | Report 5; exact wording from the spec, tested with the judge |
| meerijden | `criteria[2]` | "Schrijf waar en hoe laat Fatima u kan ophalen. Bedenk dit zelf." / "Say where and at what time Fatima can pick you up. Decide this yourself." | "Schrijf hoe laat en waar Fatima u kan ophalen. Bedenk zelf een tijd en een plek." / "Say at what time and where Fatima can pick you up. Choose a time and a place yourself." | as above |
| meerijden | `criteria[3]` | "Schrijf wat u voor Fatima terugdoet. Bedenk zelf iets." / "Say what you will do for Fatima in return. Think of something yourself." | "Schrijf wat u als bedankje voor Fatima doet. Bedenk zelf iets." / "Say what you will do for Fatima to thank her. Think of something yourself." | as above |
| sportclub | `formFields[9].label` | "Heeft uw kind deze sport eerder gedaan? Waar?" | "Heeft uw kind deze sport eerder gedaan? Zo ja, waar?" | "Nee" must be a possible honest answer |
| sportclub | `criteria[2]` | "Schrijf of uw kind deze sport eerder heeft gedaan, en waar." / "Say whether your child has done this sport before, and where." | "Schrijf of uw kind deze sport eerder heeft gedaan. Zo ja: schrijf waar." / "Say whether your child has done this sport before. If so, say where." | as above; Dutch as in the spec |
| sportclub | `model` | 56 words, 5 sentences; the "Waarom" field answered in two sentences | "Hij vindt voetbal heel leuk en hij wil graag in een team spelen." removed; 43 words, 4 sentences | Optional trim from the spec; blueprint §10: form fields get one short sentence each |
| kast | `criteria[2]` | "Schrijf op welke dag en hoe laat u wilt dragen. Bedenk dit zelf." / "Say on which day and at what time you want to carry it. Decide this yourself." | "Schrijf op welke dag en hoe laat Karim kan komen helpen. Bedenk zelf een dag en een tijd." / "Say on which day and at what time Karim can come and help. Choose a day and a time yourself." | "dragen" without an object was unnatural; uses the spec's wording with the prompt's neighbour Karim |
| restaurant | `criteria[0–2]` | "Schrijf dat zij de tafels moet dekken." / "Say that she must set the tables."; same pattern for ramen schoonmaken and glazen afwassen | "Schrijf dat Roos de tafels moet dekken." / "Tell Roos to set the tables."; "Schrijf dat Roos de ramen moet schoonmaken." / "Tell Roos to clean the windows."; "Schrijf dat Roos de glazen moet afwassen." / "Tell Roos to wash the glasses." | Report 4; exact wording from the spec, tested with the judge |
| restaurant | `model` | 49 words, 7 sentences | "De borden en het bestek staan in de kast." and "Er zijn bijna geen schone glazen meer." removed; 33 words, 5 sentences | Picture-note target is 20–40 words. The removed sentences add facts that no picture shows. All three tasks stay. |
| supermarkt | `criteria[0–2]` | "Schrijf dat hij de melk in de koeling moet zetten." / "Say that he must put the milk in the cooler."; same pattern for winkelwagens and vloer | "Schrijf dat Sem de melk in de koeling moet zetten." / "Tell Sem to put the milk in the cooler."; "Schrijf dat Sem de winkelwagens van de parkeerplaats moet halen." / "Tell Sem to fetch the shopping trolleys from the car park."; "Schrijf dat Sem de vloer moet vegen." / "Tell Sem to sweep the floor." | Same defect as restaurant: the colleague is now named |
| supermarkt | `model` | 46 words, 6 sentences | "De dozen staan in het magazijn." removed; 40 words, 5 sentences | Spec: at most 40 words. No picture shows the storeroom. |
| bezorging | `prompt` | "De winkel bezorgt de wasmachine op dinsdag 13 oktober tussen 9 en 12 uur." | "De winkel bezorgt de wasmachine volgende week dinsdag tussen 9 en 12 uur." | Date now in the past; dates made relative throughout |
| bezorging | `criteria[0]` | "Schrijf waarom u op dinsdag 13 oktober niet thuis bent. Bedenk zelf een reden." / "Say why you are not at home on Tuesday 13 October. Think of a reason yourself." | "Schrijf waarom u volgende week dinsdag niet thuis bent. Bedenk zelf een reden." / "Say why you are not at home on Tuesday next week. Think of a reason yourself." | Consistency with the prompt |
| bezorging | `sample` | "De bezorging is op dinsdag 13 oktober, maar …"; "Kunt u de wasmachine op donderdag 15 oktober bezorgt?" (55 words) | "De bezorging is volgende week dinsdag, maar …"; "Kunt u de wasmachine volgende week donderdag om 10 uur bezorgt?" (56 words) | Relative dates. The clock time makes the quote meet c1, which asks for a day and a time. The learner error "bezorgt" is kept. |
| bezorging | `quotes[1]` | "Kunt u de wasmachine op donderdag 15 oktober bezorgt? Dan ben ik de hele dag thuis." | "Kunt u de wasmachine volgende week donderdag om 10 uur bezorgt? Dan ben ik de hele dag thuis." | Verbatim from the new sample; still exactly one null (quote 3) |
| bezorging | `model` | "U bezorgt de wasmachine op dinsdag 13 oktober, …"; "Kunt u de wasmachine op donderdag 15 oktober bezorgen, …" (65 words) | "U bezorgt de wasmachine volgende week dinsdag, …"; "Kunt u de wasmachine volgende week donderdag bezorgen, …" (63 words, 7 sentences) | Relative dates. The `scaffold` contains no date and is unchanged. |
| lantaarnpaal | `model` | "… Het licht gaat 's avonds niet aan. Daardoor is het heel donker op straat. …"; "Het licht doet het sinds maandag 28 september niet meer." (48 words, 6 sentences) | "Daardoor is het heel donker op straat." removed; "Het licht doet het sinds vorige week maandag niet meer." (41 words, 5 sentences) | The prompt says "al een week" and gives no date. "Wat is het probleem?" is now answered in two sentences. The removed sentence also nearly copied the prompt sentence "'s Avonds is het heel donker op straat." |
| huur | `quotes[1]` | "omdat ik daar een nieuwe baan heb" | "Ik ga verhuizen naar Utrecht, omdat ik daar een nieuwe baan heb." | The quote now holds the reason for cancelling, the move; checked verbatim in the sample |
| reizen | `model` | 47 words, 6 sentences | "Dat vind ik heel prettig." removed; 42 words, 5 sentences | Wijkkrant target is 25–45 words in 3–5 sentences |
| gezond | `model` | 55 words, 5 sentences | "Verder eet ik veel groente en fruit en ik drink geen cola meer." removed; 42 words, 4 sentences | as above |
| boodschappen | `model` | 56 words, 6 sentences | "Brood koop ik bij de bakker in de Julianastraat." and "Daarom ga ik voor groente naar de markt." removed; 39 words, 4 sentences | as above; no single sentence could be dropped to reach 45 words |
| sportclub | starter 3 | "Hij heeft deze sport eerder gedaan bij …" | "Hij heeft deze sport … gedaan." | The old starter presupposed "yes". The new one completes to "nog nooit gedaan" or "twee jaar bij een club in … gedaan". |
| bezorging | starter 1 | "Op dinsdag 13 oktober ben ik niet thuis, want …" | "Volgende week dinsdag ben ik niet thuis, want …" | Relative date, matching the criterion |

## Criteria, sample quotes and models after the edit

Each line gives the sample quote first and then the model sentence that meets the criterion. Items whose criteria or model changed:

- **meerijden** (sample error: "mee rijden")
  - c0: "Volgende week rijdt mijn bus niet, omdat er werk aan de weg is." This is the criterion's own example plus the cause; the model uses the same sentence.
  - c1: "Mag ik volgende week met jou mee rijden?" → "Mag ik volgende week met jou meerijden?"
  - c2: null; the sample gives neither a time nor a place → "Je kunt mij ophalen bij de bushalte op de Meerweg, om kwart voor acht."
  - c3: "Ik betaal graag mee aan de benzine." → same sentence. Petrol money counted as a thank-you in every judge run.
  - Sample, quotes and model are otherwise unchanged.
- **sportclub**
  - c2: null; the sample says nothing about earlier experience. The new wording would accept "Nee"; the sample gives no answer at all. → "Sem heeft twee jaar gevoetbald bij een club in onze oude stad." This answers yes and gives the place.
  - c3: "Sem wil bij de club, want zijn vrienden zitten ook bij De Sprong." → "Hij wil bij De Sprong, omdat zijn vrienden daar ook spelen."
- **kast**
  - c2: null; the sample gives only a duration, "Het duurt ongeveer een half uur." → "Kan het zaterdag om tien uur?" This proposes a day and a time for the help asked for in the sentence before it, "Kun je mij helpen met dragen?".
- **restaurant**
  - c0: "Kun je vandaag de tafels dekken?" (a request, the tested form) → "Wil je eerst de tafels dekken?"
  - c1: null; the windows are left out → "Daarna moet je de ramen schoonmaken, want ze zijn vies."
  - c2: "Ook moet je de glazen afwassen, want er zijn niet genoeg schone glazen." → "Wil je ook de glazen afwassen?"
- **supermarkt**
  - c0: "Zet jij de melk in de koeling?" → "Wil je de melk in de koeling zetten?"
  - c1: "Daarna moet je de winkelwagens ophalen op de parkeerplaats." → "Daarna moet je de winkelwagens ophalen van de parkeerplaats, want er staan veel wagens buiten."
  - c2: null; the floor is left out → "Als laatste moet je de vloer vegen bij de ingang."
- **bezorging**
  - c0: "dan ben ik niet thuis, want ik moet werken" → "U bezorgt de wasmachine volgende week dinsdag, maar dan moet ik werken."
  - c1: "Kunt u de wasmachine volgende week donderdag om 10 uur bezorgt? Dan ben ik de hele dag thuis." This gives a day and a clock time. → "Kunt u de wasmachine volgende week donderdag bezorgen, na twee uur ’s middags?"
  - c2: address and phone number → the same data in the model
  - c3: null → "Kan de bezorger mij eerst bellen?"
- **lantaarnpaal**
  - c0 → "De lantaarnpaal voor mijn huis is kapot. Het licht gaat 's avonds niet aan."
  - c1 → "De paal staat voor Meidoornstraat 12 in Hoorn, naast de bushalte."
  - c2: null → "Het licht doet het sinds vorige week maandag niet meer."
  - c3 → "Ik wil graag antwoord per e-mail."
  - The sample and quotes are unchanged.
- **huur:** c1 is now quoted as the full sentence. The model is unchanged and gives the same reason.
- **reizen**
  - c0: "Ik ga meestal met fiets naar mijn werk." → "Ik ga meestal met de fiets naar mijn werk." The model adds the bus when it rains.
  - c1: null → "De reis duurt ongeveer twintig minuten."
  - c2: the same opinion sentence in sample and model, "Ik vind fietsen fijn, want het is gezond en het kost niets."
- **gezond**
  - c0 and c1: the sample's walking sentences → the model's "Ik wandel elke dag een half uur in het park, ook als het regent." and "Op zondag ga ik zwemmen met mijn kinderen."
  - c2: null → "Het moeilijkste vind ik snoep, want ik houd heel veel van chocolade." The model adds "Na het eten wil ik altijd iets zoets."
- **boodschappen**
  - c0: "… bij de supermarkt op de plein." (sample error) → "… bij de supermarkt op het plein."
  - c1: null → "Ik ga meestal op zaterdagochtend, want dan heb ik vrij."
  - c2: "De winkels in de buurt zijn goed, maar de supermarkt is een beetje duur." → "De winkels in de buurt vind ik goed. Alles is dichtbij, maar de supermarkt is een beetje duur."

Every sample still has exactly one `null` quote and keeps its one deliberate learner error. All quotes are verbatim substrings of their samples. No sample or model sentence equals a prompt sentence; the comparison was normalised for case and spacing.

## Language figures for the changed models

| Item | Task type | Words before → after | Sentences before → after | Longest sentence (words) | Blueprint target |
| --- | --- | --- | --- | --- | --- |
| sportclub | form | 56 → 43 | 5 → 4 | 16 (unchanged sentence) | open fields only, one short sentence each |
| restaurant | picture-note | 49 → 33 | 7 → 5 | 10 | 20–40 words, one sentence per picture |
| supermarkt | picture-note | 46 → 40 | 6 → 5 | 15 | 20–40 words |
| bezorging | email | 65 → 63 | 7 → 7 | 16 (unchanged sentence) | 45–70 words, 4–8 sentences |
| lantaarnpaal | form | 48 → 41 | 6 → 5 | 11 | open fields; the problem in one or two sentences (spec) |
| reizen | wijkkrant | 47 → 42 | 6 → 5 | 12 | 25–45 words, 3–5 sentences |
| gezond | wijkkrant | 55 → 42 | 5 → 4 | 14 | 25–45 words, 3–5 sentences |
| boodschappen | wijkkrant | 56 → 39 | 6 → 4 | 11 | 25–45 words, 3–5 sentences |

Unchanged models: meerijden 59 words in 7 sentences, kast 54 words in 8, huur 57 words in 7. No model sentence is over 16 words or has more than one subordinate clause; the subordinate clauses use only omdat and als, plus coordinating want and maar.

## Sentence starters

`content/batches/058-starters.json` has an entry for all eleven IDs, in batch order. Each entry has one fragment per criterion, and each fragment contains "…". Two fragments changed, sportclub 3 and bezorging 1; see the table.

The others are identical to the base. These starters still fit criteria that changed wording:

- meerijden: "Volgende week kan ik niet met de bus, omdat …", "Je kunt mij ophalen bij … om …" (place and time, in either order) and "Als dank wil ik graag …" (a thank-you)
- kast: "Kan het op … om …?"
- restaurant and supermarkt: requests in the "je" form, which is how a note to Roos or Sem tells them to do something

No starter states a task fact or gives a complete answer.

## Media consequences

- **Audio:** none. A2 writing has no audio, so no clip needs new audio.
- **Images:** the restaurant and supermarkt briefs and alt texts are byte-identical to the base, so no illustration is redrawn.
- **Revisions:** every record changes at least one revision field (criteria, model, prompt, formFields, sample or quotes). Integration will give all eleven new revisions, so saved answers to them start fresh.
- **Starters:** after a passing review, integration merges these starters into the overlay (`npm run content:integrate -- --refresh-hints "<reason>"`, blueprint §12).

## Key distribution

Not applicable: eleven open tasks, no closed questions.

## Doubts for the reviewer

1. **meerijden c2 residue.** The only miss in the coordinator's 36 runs is an address in a separate sentence, judged as not saying where Fatima can pick the learner up. The spec fixes the wording, so this is a feedback-side observation, not a content change.
2. **meerijden c3 "als bedankje" and petrol money.** Contributing to petrol is arguably a cost share rather than a thank-you. The judge accepted every petrol answer in all runs, so the sample quote and the model keep "Ik betaal graag mee aan de benzine." If the reviewer reads it differently, both the sample quote and the model need a new c3 sentence.
3. **kast model "Kan het zaterdag om tien uur?".** "het" refers to the help asked for in the sentence before. I read this as a clear proposal of a day and a time for Karim to come. "Kun je zaterdag om tien uur komen?" would be more literal. It is unchanged under the rule against improving unrelated wording.
4. **bezorging sample.** "om 10 uur" next to "Dan ben ik de hele dag thuis." is slightly redundant but plausible learner writing. The digits follow the prompt's "tussen 9 en 12 uur". The unchanged c1 starter "Kunt u de wasmachine bezorgen op …?" can lead a learner who copies the relative date to "op volgende week donderdag", which is less idiomatic than "op donderdag volgende week" but understandable. I left the starter because the criterion did not change.
5. **lantaarnpaal "sinds vorige week maandag".** This is the spec's suggestion. It means seven to thirteen days ago depending on the weekday, which fits the prompt's approximate "al een week". The criterion accepts any answer to "sinds wanneer".
6. **supermarkt length.** The model is exactly 40 words, the top of the picture-note range. Dropping the opener "Er is vanmorgen nieuwe melk gekomen." would give 34 words and exactly one sentence per picture. I kept the opener because it motivates the first task and the spec asks for at most 40. Unrelated and unchanged: the model says "de vloer vegen bij de ingang", while picture 3 shows an aisle. This is harmless for the criterion.
7. **Trim choices in the wijkkrant models.** Each keeps every criterion; the reviewer may prefer a different cut.
   - reizen: "In Nederland zijn er overal goede fietspaden." now ends the piece. The alternative is to drop it too, giving 35 words and 4 sentences.
   - gezond: the cut keeps exercise and the difficulty with sweets but drops the eating sentence. The alternative is to drop "Op zondag …" and "Na het eten …" instead, giving 39 words and 3 sentences.
   - boodschappen: "meestal" now appears in two consecutive sentences. Each mirrors its guiding question; this is acceptable at A2.
8. **sportclub starter "Hij heeft deze sport … gedaan."** It has the ellipsis in the middle, like the existing "Vanaf … huur ik de woning niet meer.". A learner who answers yes puts the place inside the frame ("… twee jaar bij een club in Utrecht gedaan."). The visible criterion asks for that.
9. **Left unchanged as outside the spec.** The huur date "1 december" is chosen by the learner and has no year, so it does not go stale. The sportclub sample still answers "Waarom" in two sentences; only the model was trimmed.

## Checker output

`npx tsx scripts/batch-check.ts content/batches/058-original.json`:

```
Checked 11 items, 0 questions. Keys: {}. Options: {}.
  info  11 of 11 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

SHA-256 at the time of writing:

- `content/batches/058-original.json`: `a1013359351af41416514924322573ce4805f9ce4b13e90e87e0add1378fc668`
- `content/batches/058-starters.json`: `01db13af389d922274ac82fb07c3a9c6df09c4afc926a86a6d32da8975e8aa5e`
