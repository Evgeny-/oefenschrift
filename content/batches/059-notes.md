# Batch 059 author notes

This batch is an authorised replacement (rewrite) of 22 published A2 speaking exercises:

- 13 video answers (cued tasks);
- one picture sequence;
- one picture description;
- seven picture choices.

The editorial audit of 14 October 2026 found the defects (`docs/research/content-and-feedback-audit-2026-10-14.md`):

- §3.3, hidden requirements in cued tasks;
- §3.6, samples whose quotes disagree with the criteria;
- §4, "A2 speaking and writing".

The coordinator's fix list is `tmp/content-fix-2026-10-14/spec/059.md`. Two learner reports of 7 October 2026 on A2 writing started this fix round, and the project owner authorised it.

The sources are:

- `tmp/content-fix-2026-10-14/base/059-base.json`: the published records with generated media removed and `status: "draft"`. It matches the catalogue field for field.
- `059-starters-base.json`: identical to the live entries in `content/hints/sentence-starters.json`. I checked both.

Every item keeps its ID, its position and its set membership. All items stay `status: "draft"` and `targetLevelValidated: false`. No `revision`, `promptAudio`, `cueAudio` or image `file` is present. Image briefs, image alts and cue texts are unchanged in all 22 items. This is AI editorial authoring. It does not validate CEFR level or exam equivalence.

## Replaced IDs

For the review's `replaces` list, in batch order:

```text
A2:speaking:batch009-ochtenddienst:1
A2:speaking:batch009-thuis-oefenen:1
A2:speaking:batch009-nieuwe-buurvrouw:1
A2:speaking:batch009-slaap:1
A2:speaking:batch009-abonnement:1
A2:speaking:batch009-bushalte:1
A2:speaking:batch026-lunchpauze:1
A2:speaking:batch026-woorden-leren:1
A2:speaking:batch026-huisarts-afspraak:1
A2:speaking:batch027-ziekmelden:1
A2:speaking:batch027-taalcafe-oefenen:1
A2:speaking:batch027-cursuskeuze:1
A2:speaking:batch003-monteur:1
A2:speaking:batch009-kleermaker:1
A2:speaking:batch009-flat-dorp:1
A2:speaking:batch026-online-winkel:1
A2:speaking:batch027-contant-pinnen:1
A2:speaking:batch026-fiets-lopen:1
A2:speaking:batch027-bakkerij:1
A2:speaking:batch027-keuken:1
A2:speaking:batch027-bus-fiets:1
A2:speaking:batch026-feest-thuis:1
```

## Reading and method

**What I read:**

- AGENTS.md, `spec/common.md` and `spec/059.md`;
- `docs/briefs/author.md` (the shared record contract and the rewrite rule);
- `content/blueprint.md` §1, §3, §4.3, §6, §8 and §10;
- `content/reviews/rubric.md`;
- `docs/research/content-workflow.md` §3–4, §10 and "Optional sentence starters";
- the audit sections above;
- `scripts/batch-validation.ts` and the judge request in `server/services.ts`;
- every item's cue, image alts and image briefs.

`app/components/OpenExercise.tsx` (lines 280–310) decides what learners see before answering:

- A cued task shows only the prompt and the spoken question. Its criteria and starters appear at review time.
- A picture task without a cue shows its criteria and starters before answering.

The catalogue models `A2:speaking:buurvrouw:1` and `A2:speaking:batch003-monteur:1` announce the extra detail after "Geef antwoord." ("Bedenk zelf …", "Geef ook …", "Zeg ook …"). Their third criterion repeats that sentence.

**How I built it:** `build059.py` in the session scratchpad applies exact replacements to the base. Each one must equal the base value, or match a substring exactly once. The script then asserts:

- one null quote per sample;
- every other quote verbatim in its sample;
- models of 25–45 words;
- unchanged images, cues and key order;
- no generated fields;
- no prompt sentence copied into a sample or model.

A leaf-level diff against the base shows exactly 62 changed leaves (all listed below) and four changed starter fragments. Otherwise the output is byte-identical to the base serialised with 2-space indentation, plus the trailing newline the base lacked.

## Changes per item

C0 is the first criterion. Where a cell quotes one sentence of a longer field, the rest of that field is unchanged.

### Fix 1: the third criterion is now announced in the prompt (12 cued video answers)

Each item gets one sentence after "Geef antwoord." C2 (Dutch and English) now repeats that sentence. The prompt keeps all earlier sentences, and the cue is unchanged.

I picked each extra detail so that the existing model already meets it and the existing sample keeps its single gap. Where that was not possible, the sample or the starter changed (last column). Each sentence also makes sense before the learner hears the question, because the prompt is read first.

| Item | Prompt sentence added | C2 before | C2 after (nl / en) | Consequential edits and checks |
| --- | --- | --- | --- | --- |
| batch009-ochtenddienst | "Zeg ook hoe laat u wilt beginnen." | "Geef nog een detail, bijvoorbeeld een tijd." / "Give one more detail, for example a time." | "Zeg hoe laat u wilt beginnen." / "Say what time you want to start." | Starter C2: "Ik begin meestal om …" → "Ik begin graag om …". The roster asks for a preference, not a habit. The sample's gap stays C2. The model meets it with "Ik begin graag om zeven uur." |
| batch009-thuis-oefenen | "Zeg ook waarom thuis oefenen u helpt." | "Geef nog een detail of een reden." / "Give one more detail or a reason." | "Zeg waarom thuis oefenen u helpt." / "Say why practising at home helps you." | None. Sample quote 2 "Zo leer ik nieuwe woorden." and the model's "Zo leer ik nieuwe woorden en ik versta de mensen beter." meet it. Starter "Zo leer ik …" fits. |
| batch009-nieuwe-buurvrouw | "Zeg ook wat er dichtbij is." | "Geef een reden of een detail." / "Give a reason or a detail." | "Zeg wat er dichtbij is." / "Say what is nearby." | None. Quote 2 "De buren zijn vriendelijk en er is een park dichtbij." contains the park. The model has "De supermarkt en de bushalte zijn dichtbij." Starter "Dichtbij is er …" fits. |
| batch009-slaap | "Vertel ook hoe u slaapt." | "Geef nog een detail over uw slaap." / "Give one more detail about your sleep." | "Vertel hoe u slaapt." / "Say how you sleep." | Sample: "Ik slaap niet goed." added at the end. `quotes[2]`: "Ik kijk 's avonds lang naar mijn telefoon." → "Ik slaap niet goed.", because a phone habit is not how the learner sleeps. The gap stays C1 (no wake-up time). The model meets C2 with "Ik word 's nachts ook vaak wakker." Starter "'s Nachts …" fits. |
| batch009-abonnement | "Zeg ook waarvoor u uw telefoon gebruikt." | "Geef een reden of een detail." / "Give a reason or a detail." | "Zeg waarvoor u uw telefoon gebruikt." / "Say what you use your phone for." | None. Quote 2 starts "Ik bel vooral en ik stuur berichten." The model has "ik bel elke dag met mijn familie via video. Ik luister ook veel naar muziek op mijn telefoon." Starter "Mijn telefoon gebruik ik vooral voor …" fits. |
| batch009-bushalte | "Zeg ook waar hij moet wachten." | "Geef nog een detail, bijvoorbeeld waar de halte is." / "Give one more detail, for example where the stop is." | "Zeg waar de man moet wachten." / "Say where the man has to wait." | None. The learner already stands at a stop, so "waar de halte is" became "waar hij moet wachten". Quote 2 is "De halte is hier aan de overkant van de straat." The model has "U moet aan de overkant wachten, bij die halte daar." Starter "De halte is …" fits. |
| batch026-lunchpauze | "Zeg ook met wie u eet." | "Geef nog een detail, bijvoorbeeld met wie u eet." / "Give one more detail, for example who you eat with." | "Zeg met wie u eet." / "Say who you eat with." | None. The quote, the model ("samen met twee collega's") and the starter "Ik eet samen met …" fit. |
| batch026-woorden-leren | "Zeg ook waarom uw manier van leren goed werkt." | "Geef nog een detail of een tip." / "Give one more detail or a tip." | "Zeg waarom uw manier van leren goed werkt." / "Say why your way of learning works well." | Starter C2: "Dat betekent …" → "Mijn manier werkt goed, want …". Sample quote 2 "Dat help goed, want dan vergeet ik ze niet." and the model's "Zo onthoud ik het beter." meet it. I rejected "Zeg ook wat het woord betekent". The sample's gap is C1 (no word named), so the sample would have missed two criteria. |
| batch026-huisarts-afspraak | "Zeg ook op welke dag u kunt komen." | "Geef nog een detail, bijvoorbeeld een dag of een tijd." / "Give one more detail, for example a day or a time." | "Zeg op welke dag u kunt komen." / "Say on which day you can come." | None. Asking for a day rather than "a day or a time" keeps C2 apart from C0 (morning or afternoon). Quote 2 starts "Kan ik donderdag komen?" The model has "morgen … Woensdag kan ik ook." Starter "Ik kan … komen." fits. |
| batch027-ziekmelden | "Zeg ook wanneer u zich ziek moet melden." | "Geef nog een detail, bijvoorbeeld hoe laat u dat doet." / "Give one more detail, for example at what time you do that." | "Zeg wanneer u zich ziek moet melden." / "Say when you have to call in sick." | None. Quote 2 starts "Je moet dat voor acht uur doen". The model has "Je moet 's ochtends bellen, voor acht uur." Starter "Dat doe je voor …" fits. |
| batch027-taalcafe-oefenen | "Zeg ook waarom u wilt oefenen." | "Geef nog een detail of een reden, bijvoorbeeld een tijd." / "Give one more detail or a reason, for example a time." | "Zeg waarom u wilt oefenen." / "Say why you want to practise." | Starter C2: "Dat is voor mij het beste, want …" → "Oefenen is belangrijk voor mij, want …". Right after the C1 day starter, "Dat" read as a reason for the day. Quote 2 is "Ik versta veel, maar ik praat niet goed." The model has "Ik begrijp veel, maar praten vind ik moeilijk." |
| batch027-cursuskeuze | "Zeg ook op welke avonden u kunt komen." | "Geef nog een detail, bijvoorbeeld wanneer u kunt." / "Give one more detail, for example when you are available." | "Zeg op welke avonden u kunt komen." / "Say on which evenings you can come." | None. Quote 2 is "Ik kan elke avond komen, alleen niet op vrijdag." The model has "Ik kan op maandag en op donderdag komen." Starter "Ik kan op … komen." fits. |

### Fixes 2–7

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| batch003-monteur | `prompt` (one sentence becomes two) | "U praat met medewerker Sabrina." | "U belt het bedrijf van de monteur. Medewerker Sabrina neemt op." | Fix 2. Only the image brief said that this is a phone call to the repair company. The rest of the prompt and the criteria, sample, quotes, model, alt and starters are unchanged. The alt "Sabrina praat aan de telefoon." now matches the prompt. |
| batch009-kleermaker | `sample` | "De broek van Hasan is te lang. Hij haalt de broek later op bij de winkel en betaalt." | "Hasan kijkt in de spiegel en hij ziet dat de broek is te lang. Hij haalt de broek later op bij de winkel." | Fix 3. Picture 1 now has an action, and the payment that no picture shows is gone. The gap stays C1 (picture 2). |
| batch009-kleermaker | `quotes[0]` | "De broek van Hasan is te lang." | "Hasan kijkt in de spiegel en hij ziet dat de broek is te lang." | Hasan's action on picture 1 (he looks in the mirror and sees), not only the state of the trousers. |
| batch009-kleermaker | `quotes[2]` | "Hij haalt de broek later op bij de winkel en betaalt." | "Hij haalt de broek later op bij de winkel." | The brief for picture 3 has him receive the folded trousers in a paper bag at the counter. Nobody pays. |
| batch009-kleermaker | `model` | "Op het eerste plaatje staat Hasan voor de spiegel. Zijn nieuwe broek is veel te lang. Op het tweede plaatje is hij bij de kleermaker. Zij meet de broek en maakt hem korter. Op het derde plaatje haalt hij de broek op en betaalt hij." | "Op het eerste plaatje kijkt Hasan thuis in de spiegel. Zijn broek is veel te lang. Op het tweede plaatje staat hij bij de kleermaker. Zij zet spelden in de broek. Op het derde plaatje haalt hij de broek op aan de balie." | Each picture's action as drawn: he looks in the mirror at home, stands at the tailor's while she pins the hem, and collects the trousers at the counter. I removed three things the pictures do not show: "nieuwe", "meet" (the tape hangs round her neck) and "betaalt". |
| batch009-flat-dorp | `sample` | "In de stad zijn de winkels en de bus dichtbij. Dat is handig. In het dorp is het rustig, maar je hebt een auto nodig." | "Ik kies de flat, plaatje één. Op het andere plaatje is een klein huis in een dorp. Er staat een fiets bij de hek." | Fix 4. A clear choice that names the picture. The reason is now the gap. The village sentences only describe the picture, so nothing in them reads as a reason (see Doubts 1). |
| batch009-flat-dorp | `quotes` | [null, "In de stad zijn de winkels en de bus dichtbij. Dat is handig.", "In het dorp is het rustig, maar je hebt een auto nodig."] | ["Ik kies de flat, plaatje één.", null, "Op het andere plaatje is een klein huis in een dorp."] | Follows the new sample. |
| batch026-online-winkel | `sample` | "Online is makkelijk, want de kleren komen naar mijn huis. Maar in de winkel je kan de kleren passen. Dat is ook belangrijke." | "Ik kies plaatje één, online. Online is makkelijk, want de kleren komen naar mijn huis. Dat is voor mij belangrijke." | Fix 4. A clear choice that names the picture. The other picture is now the gap, and nothing in the sample mentions the shop. The reason sentence is unchanged. |
| batch026-online-winkel | `quotes` | [null, "Online is makkelijk, want de kleren komen naar mijn huis.", "Maar in de winkel je kan de kleren passen."] | ["Ik kies plaatje één, online.", "Online is makkelijk, want de kleren komen naar mijn huis.", null] | Follows the new sample. |
| batch027-contant-pinnen | `sample` | "Contant betalen is handig, want dan zie je hoeveel geld je nog heeft. Maar met pinpas ik betaal sneller." | "Ik kies plaatje één. Ik betaal liever contant. Op plaatje twee de vrouw betaalt met pinpas." | Fix 4. A clear choice that names the picture. The reason is now the gap. The other-picture sentence only describes what the woman does, and it keeps the old error types. |
| batch027-contant-pinnen | `quotes` | [null, "Contant betalen is handig, want dan zie je hoeveel geld je nog heeft.", "Maar met pinpas ik betaal sneller."] | ["Ik kies plaatje één. Ik betaal liever contant.", null, "Op plaatje twee de vrouw betaalt met pinpas."] | Follows the new sample. |
| batch026-feest-thuis | `sample` | "Ik kies het restaurant, plaatje twee. Ik vind een restaurant meer leuk. Thuis, op het eerste plaatje, ze zitten ook gezellig aan tafel." | "Ik kies het restaurant, plaatje twee. Thuis, op het eerste plaatje, ze zitten ook gezellig aan tafel." | Fix 5. The sentence that read as a reason is removed. The quotes are unchanged and still verbatim. |
| batch027-bus-fiets | `sample` | "… Fietsen is gezond en ik moet niet betalen. …" | "… Fietsen is gezond en ik ben graag buiten. …" | Fix 6. "Ik moet niet betalen" implied that the bus costs money, while C2 (other picture) is the gap. The replacement is the fix list's own suggestion. |
| batch027-bus-fiets | `quotes[1]` | "Fietsen is gezond en ik moet niet betalen." | "Fietsen is gezond en ik ben graag buiten." | Follows the sample. |
| batch026-fiets-lopen | `model` | "… Op het eerste plaatje fietst Julio. …" | "… Op het eerste plaatje fietst een man. …" | Fix 7. "Julio" exists only in the briefs. |
| batch027-bakkerij | `model` | "… Op het eerste plaatje werkt Julio heel vroeg. …" | "… Op het eerste plaatje werkt een man heel vroeg. …" | Fix 7. |
| batch027-keuken | `sample` | "… Sem snijdt groente en Amina zetten de borden op tafel." | "… Haar zoon snijdt groente en haar dochter zetten de borden op tafel." | Fix 7. The prompt names only Fatima and "haar kinderen". The learner error "zetten" is kept. |
| batch027-keuken | `quotes[1]` | "Sem snijdt groente en Amina zetten de borden op tafel." | "Haar zoon snijdt groente en haar dochter zetten de borden op tafel." | Follows the sample. |
| batch027-keuken | `model` | "… Haar zoon Sem snijdt groente op een plank. Amina zet de borden op tafel. …" | "… Haar zoon snijdt groente op een plank. Haar dochter zet de borden op tafel. …" | Fix 7. |
| batch027-keuken | starter C1 | "Fatima …, Sem … en Amina …" | "Fatima …, haar zoon … en haar dochter …" | Consequential edit: the starter used the same unseen names. |

## Prepared feedback (the samples)

Every sample still misses exactly one criterion, and every other quote is verbatim. These are the changed samples:

- **slaap:** the gap is C1 (no wake-up time). C0 "om één uur" and C2 "Ik slaap niet goed." are met. No learner error, as before.
- **kleermaker:** the gap is C1. Nothing describes the tailor or the pinning. "Later" marks the step the learner skipped. The new error is word order in the dat-clause ("dat de broek is te lang"). The old sample had no error, and the author brief asks for one or two typical errors.
- **flat-dorp:** the gap is C1 (reason). The choice names both the flat and the picture. The other picture is only described ("een klein huis in een dorp", "een fiets bij de hek"), with nothing for or against either option. The error is "bij de hek" (het hek). The old sample had no error.
- **online-winkel:** the gap is C2 (other picture). Nothing mentions the shop. The kept error is "Dat is voor mij belangrijke.". The old "in de winkel je kan" left with the shop sentence.
- **contant-pinnen:** the gap is C1 (reason). "Ik betaal liever contant" states the preference, not a reason. Two kept error types:
  - verb-second: "Op plaatje twee de vrouw betaalt";
  - a missing article: "met pinpas".

  Both match the old "met pinpas ik betaal".
- **feest-thuis:** the gap is still C1. The kept error is "Thuis, …, ze zitten". The "meer leuk" error left with the removed sentence.
- **bus-fiets:** the gap is still C2. The kept error is "gekopen". The moeten/hoeven error left with "ik moet niet betalen".
- **keuken:** the gap is still C2. Only the names changed.

I checked the 11 unchanged samples of the cued items against their new C2 (table above). Each still meets C2 or misses it exactly as before.

The three fix-4 samples now state the choice explicitly. Their other sentences say nothing evaluative about the option not chosen, because the audit showed that the judge reads such remarks as a choice or a reason. The bus-fiets reason no longer mentions or implies the bus. The feest-thuis sample still calls the home picture "gezellig". That sentence is its required remark about the other picture, unchanged, and is discussed under Doubts 9.

## Starters

`content/batches/059-starters.json` covers all 22 items in batch order: one partial fragment per criterion, each with "…".

Four fragments changed:

- ochtenddienst C2;
- woorden-leren C2;
- taalcafe-oefenen C2;
- keuken C1.

The tables above give the reasons. I tested natural completions:

- "Ik begin graag om zeven uur."
- "Mijn manier werkt goed, want ik zie de woorden elke dag."
- "Oefenen is belangrijk voor mij, want ik praat nog niet goed."
- "Fatima roert in de pan, haar zoon snijdt groente en haar dochter zet de borden op tafel."

None of them completes an answer or invents a task fact.

The other nine C2 starters of fix 1 still lead to the new criterion, so they stay. Every other starter belongs to an unchanged criterion and still fits.

## Language control

| Item | Model words | Sentences | Longest sentence | Prompt words before → after |
| --- | --- | --- | --- | --- |
| batch009-ochtenddienst | 33 | 4 | 12 | 21 → 28 |
| batch009-thuis-oefenen | 36 | 4 | 11 | 17 → 24 |
| batch009-nieuwe-buurvrouw | 33 | 6 | 8 | 18 → 24 |
| batch009-slaap | 33 | 4 | 12 | 17 → 22 |
| batch009-abonnement | 34 | 4 | 14 | 17 → 24 |
| batch009-bushalte | 27 | 4 | 10 | 18 → 24 |
| batch026-lunchpauze | 39 | 5 | 10 | 22 → 28 |
| batch026-woorden-leren | 43 | 6 | 9 | 22 → 31 |
| batch026-huisarts-afspraak | 39 | 5 | 13 | 25 → 33 |
| batch027-ziekmelden | 40 | 7 | 9 | 18 → 26 |
| batch027-taalcafe-oefenen | 39 | 5 | 10 | 23 → 29 |
| batch027-cursuskeuze | 40 | 6 | 10 | 24 → 32 |
| batch003-monteur | 30 | 4 | 9 | 42 → 48 |
| batch009-kleermaker (model changed) | 43 | 5 | 12 | unchanged (19) |
| batch026-fiets-lopen (model changed) | 41 | 5 | 13 | unchanged (25) |
| batch027-bakkerij (model changed) | 44 | 6 | 9 | unchanged (25) |
| batch027-keuken (model changed) | 42 | 6 | 11 | unchanged (28) |

All 22 models have 27–44 words, and no sentence has more than 14 words. The models of the 12 fix-1 items and monteur are unchanged. The new prompt sentences have 5–9 words. Each is an imperative with one embedded wh-clause, in common A2 words. The longest is woorden-leren's "Zeg ook waarom uw manier van leren goed werkt." The monteur change adds six words. "neemt op" (answers the phone) is the least common phrase.

## Media consequences

These 13 items need new prompt audio (`promptAudio`, narrator), because their `prompt` changed:

1. A2:speaking:batch009-ochtenddienst:1
2. A2:speaking:batch009-thuis-oefenen:1
3. A2:speaking:batch009-nieuwe-buurvrouw:1
4. A2:speaking:batch009-slaap:1
5. A2:speaking:batch009-abonnement:1
6. A2:speaking:batch009-bushalte:1
7. A2:speaking:batch026-lunchpauze:1
8. A2:speaking:batch026-woorden-leren:1
9. A2:speaking:batch026-huisarts-afspraak:1
10. A2:speaking:batch027-ziekmelden:1
11. A2:speaking:batch027-taalcafe-oefenen:1
12. A2:speaking:batch027-cursuskeuze:1
13. A2:speaking:batch003-monteur:1

No other clip changes:

- Every cue text is unchanged, so all 13 `cueAudio` clips stay.
- The nine picture tasks keep their prompts and their `promptAudio`.
- No `brief` or `alt` changed, so no picture is redrawn.

## Key distribution

Not applicable. The batch has only open tasks and no closed questions; the checker reports `Keys: {}`.

## Doubts for the reviewer

1. **flat-dorp deviates from the example in the fix list.** The example sample was "Ik kies de flat, plaatje één. In het dorp is het rustig, maar je hebt een auto nodig." with the reason null. In it, "maar je hebt een auto nodig" is a drawback of the other option. A judge can read it as the reason for the flat, which is the same implicit cross-criterion content that fix 6 removes from bus-fiets. The criterion is only "Geef een reden.", so I made the village sentences purely descriptive. If you prefer the example's wording, drop its second clause. "Ik kies de flat, plaatje één. In het dorp is het rustig." is evaluative, but it cannot count as a reason for the flat.
2. **Which criterion each fix-4 sample now misses.** flat-dorp and contant-pinnen miss the reason; online-winkel misses the other picture. Mixing the gaps keeps the prepared feedback varied. Online-winkel misses the other picture so that its original reason sentence can stay verbatim. Contant-pinnen misses the reason so that its other-picture sentence keeps the original error types.
3. **woorden-leren.** The model supports C2 only with "Zo onthoud ik het beter." That is short, but it is an explicit benefit of the notes-on-objects method. The model already has 43 words, so a longer reason would mean cutting another sentence. I left the model unchanged. "Uw manier van leren" becomes concrete only once Modibo asks how the learner remembers words. The prompt text stays visible during answering.
4. **taalcafe-oefenen.** I chose "waarom u wilt oefenen" over "waarom u dat wilt oefenen": it makes sense before the cue and accepts any reason (for example a job). The sample and model give a reason for practising speaking.
5. **ziekmelden.** "Wanneer" accepts both "'s ochtends" and "voor acht uur", where "hoe laat" would fail "'s ochtends vroeg". The unchanged C0 starter "Je moet 's ochtends …" already hints at a time. It did so before too; C0 is unchanged, so I left it.
6. **bushalte.** C2 says "de man" so that the criterion reads on its own at review time. The prompt says "hij".
7. **Wide quotes kept verbatim.** Three C2 quotes are wider than the new criterion but still contain the evidence:
   - nieuwe-buurvrouw: "De buren zijn vriendelijk en er is een park dichtbij.";
   - abonnement: "… Thuis heb ik wifi.";
   - huisarts-afspraak: "… Dan ik ben vrij."

   I kept them to avoid unrequested edits. Narrow them if you prefer.
8. **kleermaker.** "Zij zet spelden in de broek" uses "spelden", a less common word that the picture supports. "Zij maakt de broek korter" is easier but describes a result that picture 2 does not show yet.
9. **Not in the fix list; left unchanged for your judgement:**
   - fiets-lopen: sample quote 1 "Met de fiets ik ben sneller op mijn werk" compares with walking, while C2 (other picture) is the gap. That is the pattern fix 6 removes from bus-fiets.
   - feest-thuis: in quote 2, "ze zitten ook gezellig aan tafel" uses "ook", which could imply that the restaurant is gezellig too.
10. **monteur prompt length.** The prompt now has 48 words in nine sentences, the longest narrator prompt in the batch. The fix list asked to keep the rest. "Medewerker Sabrina neemt op." follows the fix list's suggested wording; "neemt de telefoon op" would be more explicit for A2.
11. **Observation outside this batch.** The judge request (`server/services.ts`, both committed and in the working tree) sends `task: item.prompt` and the criteria, but not the cue text. For the 12 fix-1 items, the new prompt sentence is therefore also the judge's only statement of the third requirement besides the criterion.

## Checker output

```text
$ npx tsx scripts/batch-check.ts content/batches/059-original.json
Checked 22 items, 0 questions. Keys: {}. Options: {}.
  info  22 of 22 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
