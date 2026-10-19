# Batch 063 independent review

All 16 items pass. I edited one item (`A2:speaking:batch003-jas:1`, its alt and sample) and rejected nothing. This is an authorised replacement batch: every ID, its order and its set membership are kept, and all 16 IDs go in `replaces`.

- `content/batches/063-proposed.json` is the author's file with the jas edit applied. SHA-256: `4fa88d95360650df5c37a48b4aa0512f5fa6bb755d495e015a78ceae3a861d51`.
- No starter changed, so there is no proposed starters file. The starters source is `content/batches/063-starters.json`, SHA-256 `9ffd1ff57c194d4e810874dcca23fa2ee849049da91e45283e59a5f02fd5f7f6`.
- `npx tsx scripts/batch-check.ts content/batches/063-proposed.json` reports "No failures, no warnings". It also prints the expected info line that all 16 items are already in the catalogue.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| A2:speaking:batch001-apotheek:1 | pass | comparable | Report 6 is fully answered. No printed text names the place, and the opinion question is now concrete ("Vindt u het zelf makkelijk om medicijnen te halen? Vertel ook waarom."). |
| A2:speaking:batch003-jas:1 | pass (edited) | comparable | C0 now asks for the action the picture shows. I corrected the alt and the sample, because the picture does not show Roos looking at the coat. |
| A2:speaking:batch003-speeltuin:1 | pass | comparable | The situation "Fatima maakt een wandeling." and the title give no place. The alt now carries the scene for the judge. |
| A2:speaking:batch003-monteur:1 | pass | comparable | The prompt no longer supplies the C0 and C2 answers. C2 is now the natural move: ask when the technician will come. |
| A2:speaking:batch027-keuken:1 | pass | comparable | The situation no longer names the cooking action that C1 asks for. |
| A2:speaking:batch026-regen:1 | pass | comparable | The situation and title no longer give "wacht op de bus". |
| A2:speaking:buurvrouw:1 | pass | comparable | The printed prompt no longer announces the two cue questions. The speaker name is merged into the first sentence. |
| A2:speaking:te-laat:1 | pass | comparable | The printed prompt no longer announces the two cue questions. |
| A2:speaking:batch001-koelkast:1 | pass | comparable | The double meaning of "andere" is gone ("een nieuwe", "het andere plaatje"). |
| A2:speaking:batch009-bushalte:1 | pass | comparable | Title only. "Een vraag bij de bushalte" no longer prints the cue question. |
| A2:speaking:batch027-ziekmelden:1 | pass | comparable | Title only. "Een nieuwe collega" no longer prints the cue question. |
| A2:speaking:batch027-cursuskeuze:1 | pass | comparable | Title only. "Avondcursussen op school" agrees with "de adviseur van de school". |
| A2:speaking:batch009-ochtenddienst:1 | pass | comparable | Title only. "Het rooster voor volgende maand" names the situation, not the either/or question. |
| A2:speaking:batch002-burenpakket:1 | pass | comparable | The situation no longer narrates panel 1. The three alts now state each panel's action, checked against the pictures. |
| A2:speaking:batch009-verjaardag:1 | pass | comparable | C0 and C1 are now distinct and announced by the prompt: who is there, and two things on the table. |
| A2:speaking:batch003-tramkaart:1 | pass | comparable | C2 is now clear and matches the bank wording. The prompt is unchanged. |

## Method

- **Diff against the base.** I diffed every item field by field against `tmp/content-fix-2026-10-19/base/063-base.json`, and the starters against `063-starters-base.json`.
  - The base equals the published catalogue records with the media fields removed (checked programmatically), and the starters base equals `content/hints/sentence-starters.json`.
  - Every change in the author's file is a spec fix or a consequence of one. Item order and key order are unchanged.
  - `status` is `"draft"` everywhere.
  - There are no media or derived fields and no `type` field.
  - Every image `brief`, every `cue` and all metadata are byte-identical to the base.
- **Visibility.** I read `app/components/OpenExercise.tsx` (lines 298–345).
  - Criteria and starters are hidden until review only for cued tasks: monteur, buurvrouw, te-laat, bushalte, ziekmelden, cursuskeuze and ochtenddienst.
  - For the nine picture items, the criteria, the title (the h1) and the starters (on request) are visible while the learner answers.
- **What the judge sees.** I read `server/services.ts` (`requestJudgment`, `pictureFor`). The judge receives the prompt, the criteria and the numbered alts. It does not receive the title, the brief or the cue text.
- **Pictures.** I converted and viewed all 17 published pictures of the 16 items.
- **Contract script.** For every item: exactly one null quote, the other quotes verbatim in the sample, no prompt sentence in the sample or the model, model 25–45 words with no sentence over 16 words, no digits in prompts or cues, one starter per criterion, each with "…".
- **Titles.** All 59 A2 speaking titles are unique after the change.

## Report 6 (`A2:speaking:batch001-apotheek:1`)

The learner wrote: "In de opdracht staat al waar Roos is. De vraag over hulp bij de apotheek is onduidelijk."

- **Nothing printed gives away the place.**
  - Title: "Roos heeft medicijnen nodig".
  - Prompt: "Roos heeft medicijnen nodig. Vertel waar Roos is. Noem twee dingen die de mensen doen. Vindt u het zelf makkelijk om medicijnen te halen? Vertel ook waarom. Gebruik het plaatje."
  - Visible criteria: "Zeg waar Roos is." / "Noem twee dingen die de mensen doen." / "Zeg of u medicijnen halen makkelijk vindt, en waarom."
  - Starters: "Roos is bij …" / "Roos … en de medewerker …" / "Medicijnen halen vind ik …, want …".

  None contains "apotheek", "balie" or another place. "medicijnen nodig" points the learner towards the scene without naming it, the way the official situation lines do. It avoids the "recept van de huisarts" trap.
- **Every question is concrete and answerable at A2.**
  - Where Roos is: the picture shows a counter, a man in a white shirt, shelves of medicine boxes and bottles, and a medicine box.
  - Two things people do: she hands over a paper, and he takes a box.
  - A yes/no opinion about the learner's own life, plus a reason. Report 6 called the old question unclear; this one is not.
- **The judge can verify C0.** The alt now begins "Roos staat bij de balie van een apotheek." The alt is only the img alt attribute. It describes what a sighted learner sees, so it gives nothing away.
- **The rest.**
  - The model, 33 words, meets all three criteria and uses "papier", as the picture shows.
  - Sample quote 0 "Roos staat in een apotheek." meets C0, quote 1 meets C1, and the null is on C2.

## Edits

| ID | Field | Before | After | Why |
| --- | --- | --- | --- | --- |
| A2:speaking:batch003-jas:1 | images[0].alt | Roos houdt een blauwe jas vast en kijkt er bezorgd naar. Naast haar ligt een telefoon op een tafeltje. | Roos houdt een blauwe jas vast en kijkt bezorgd. Naast haar ligt een telefoon op een tafeltje. | In the picture Roos's eyes look sideways at about face height, not at the coat in her hands (I viewed a crop of the face). An alt must describe only what the picture shows, and the judge reads it as fact. |
| A2:speaking:batch003-jas:1 | sample | Roos kijkt naar een jas. Ze heeft een blauw jas vast en er ligt een telefoon op tafel. | Roos houdt een jas vast. Het is een blauw jas en er ligt een telefoon op tafel. | Quote 0 credited C0 ("Zeg wat Roos doet.") for an action the picture does not clearly show. It now credits the action it does show. The second sentence is reworded so that "vast" is not repeated. The learner error "een blauw jas" stays. |
| A2:speaking:batch003-jas:1 | quotes | ["Roos kijkt naar een jas.", "Ze heeft een blauw jas vast en er ligt een telefoon op tafel.", null] | ["Roos houdt een jas vast.", "Het is een blauw jas en er ligt een telefoon op tafel.", null] | Both are verbatim in the new sample. Quote 0 meets C0. Quote 1 names the coat, the phone and the table (C1). The null stays on C2. |

These edits need no audio and no new drawing. The starter "Roos houdt …" fits the new sample even better.

## Answers to the author's doubts

1. **Apotheek opinion question.** Keep "Vindt u het zelf makkelijk om medicijnen te halen? Vertel ook waarom." C2 is two-part, but the prompt asks both parts explicitly, so it is no trap. The bank already pairs a question with "Vertel ook waarom" (koelkast, tramkaart). "Zeg of u … makkelijk vindt" accepts "moeilijk" too. The vaguer alternative would bring back the complaint in report 6.
2. **Apotheek judge check.** Agreed. Before release, run a bounded judge check: "Roos is bij de apotheek." should pass C0, and "Roos is bij de huisarts." should fail it. I made no feedback calls. This is listed as a coordinator action.
3. **Speeltuin situation.** Accept "Fatima maakt een wandeling." and the title "Fatima maakt een wandeling". "in haar buurt" would itself answer "Waar is Fatima?". The picture shows the playground and the pavement clearly, and the alt lets the judge accept "bij de speeltuin", "op de stoep" or "bij een hek".
4. **Extra alt edits.**
   - Speeltuin: kept. It matches the picture and the judge needs the scene.
   - Jas: kept in substance. I removed the gaze claim (see Edits). The judge needs "houdt een jas vast" to credit the new C0.
5. **Jas gaze and starter.** Resolved by my edit: the alt and the sample now say only what is visible. The starter "Roos houdt …" is a strong hint, but the learner still has to complete it from the picture, and it is optional.
6. **Monteur "Hij is te laat."** Keep. C1 checks that the learner answers the yes/no half of the cue. Any situation that explains why the learner calls ("U wacht al lang.") implies the same fact. "te laat" also gives the reason for the call and fits the invented time window. The phrase does not appear in C1's wording, and C1 stays hidden until review.
7. **Verjaardag balloons.** Fine. The alt says "Boven de tafel hangen ballonnen", so the judge can tell that balloons are not on the table. A taart, its kaarsjes and three cadeaus are clearly on the table.
8. **Not changed.**
   - Keuken's title "Druk in de keuken" and regen's "bij de halte" stay. In both, C0 is the broad scene criterion ("Vertel wat u op het plaatje ziet."), which follows the official pattern, and the spec did not list them.
   - The koelkast and tramkaart C2 differ by "ook". That is harmless, because each matches its own prompt.

## Rejected items

None.

## Notes per item (the full rubric applied to the final records)

- **Jas.** The past-tense situation ("heeft … meegenomen") is distinct from the present action C0 asks for. A learner who repeats the situation sentence does not describe what Roos is doing in the picture. The title "Roos heeft de verkeerde jas" repeats only the situation.
- **Speeltuin.**
  - "Wat vindt u van deze situatie?" now follows "Fatima maakt een wandeling.", so a learner could give an opinion about walking. C2 accepts any opinion, so this is no trap. The picture makes the broken fence the obvious "situatie".
  - This vagueness predates the change. The same sentence is in jas.
- **Monteur.**
  - The learner now invents the appointment time, as in the official video items.
  - The model, 35 words, meets C0 ("tussen negen en elf uur"), C1 ("de monteur is er nog niet") and C2 ("Wanneer kan hij nu komen?").
  - The sample's null is on C2.
- **Buurvrouw.** "U kunt morgen niet op bezoek bij uw buurvrouw, mevrouw Bakker." reads naturally aloud, and the trailing apposition is easy to follow. `cue.speaker` is unchanged, so the label stays "Luister naar mevrouw Bakker".
- **Koelkast.** "U koopt een nieuwe." is a natural ellipsis after "Uw koelkast is kapot.". "Zeg ook iets over het andere plaatje." can no longer be read as the broken fridge.
- **Burenpakket.**
  - Panel 1 (the courier hands Karim the box at the mustard door), panel 2 (he puts it on a small table inside, by the open door) and panel 3 (he hands it to the neighbour outside) match the new alts.
  - The neighbour is unnamed in the alt, consistent with the prompt.
  - The new situation is set before panel 1 and narrates no panel. Sample quote 0 no longer copies a prompt sentence.
- **Verjaardag.**
  - "Vertel wie er op het feest zijn." still lets the learner reuse "Amina" from the situation. C0 asks for the people present, though, and the plural "zijn" plus the picture lead to "Amina en twee vrienden".
  - The model (37 words) and the sample follow the new criteria. "Op de tafel ik zie" is a deliberate inversion error, and its content meets C1.
- **The four title-only items.** The new titles name the situation, not the cue question. Each is consistent with its prompt and is unique among the A2 speaking titles.

## Diversity and set assembly

- Set membership is unchanged: a2-speaking-01, -02, -03, -04, -07, -13, -16 and -17.
- Two A2 speaking titles now share "bij de bushalte": "Een vraag bij de bushalte" (set 04) and "Regen bij de bushalte" (set 13). They are in different sets and different task types, so no edit is needed.
- Jas and speeltuin (both in set 03) share the opinion sentence "Wat vindt u van deze situatie?", as before.

## Media notes

New narrator audio is needed for exactly these 11 prompt clips:

- `A2:speaking:batch001-apotheek:1#prompt`
- `A2:speaking:batch003-jas:1#prompt`
- `A2:speaking:batch003-speeltuin:1#prompt`
- `A2:speaking:batch003-monteur:1#prompt`
- `A2:speaking:batch027-keuken:1#prompt`
- `A2:speaking:batch026-regen:1#prompt`
- `A2:speaking:buurvrouw:1#prompt`
- `A2:speaking:te-laat:1#prompt`
- `A2:speaking:batch001-koelkast:1#prompt`
- `A2:speaking:batch002-burenpakket:1#prompt`
- `A2:speaking:batch009-verjaardag:1#prompt`

No `#cue` clip needs new audio, because no cue text, speaker or role changed. The cue clips of monteur, buurvrouw, te-laat, bushalte, ziekmelden, cursuskeuze and ochtenddienst stay.

The other five items changed only their title (bushalte, ziekmelden, cursuskeuze, ochtenddienst) or a criterion (tramkaart), so they keep their prompt audio. Alt, sample, model and criterion edits need no audio.

No image brief changed, so no picture needs redrawing. Every changed alt was checked against its picture.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Eleven prompts changed. Their new audio still needs generation from the adopted text, with a transcription round trip. None was generated in this review.
- I made no feedback calls. Judge behaviour on the changed prompts and alts was not measured, in particular "apotheek" vs "huisarts" for C0, and "Hij is te laat." for monteur C1.
- `content/exemplars/` does not exist. The level verdicts compare each item with the blueprint §4.3 patterns and with the other A2 speaking items of the same type in the bank, and do not calibrate difficulty.
