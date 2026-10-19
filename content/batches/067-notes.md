# Batch 067 author notes

A2 speaking, 38 of 44 checked items changed, 19 October 2026. Authorised replacement (rewrite) batch.

## Replacement and reason

On 19 October 2026 a learner filed report 6 against `A2:speaking:batch001-apotheek:1`: "In de opdracht staat al waar Roos is. De vraag over hulp bij de apotheek is onduidelijk." The project owner confirmed it and asked for every similar exercise to be checked. The audit of all A2 speaking items is `tmp/content-fix-2026-10-19/audit/a2-speaking.md`. Batch 063 applied its fixes earlier today.

Later the same day the owner approved a second change. Speaking tasks now hide their criteria until review (`app/components/OpenExercise.tsx`, the `requirements` list). While answering, the learner sees only the prompt and the pictures, plus the sentence starters ("Beginzinnen") if they open them. The task for this batch is `tmp/content-fix-2026-10-19/spec/hidden-criteria.md`, and the round rules are `tmp/content-fix-2026-10-19/spec/common.md`. The rule is that a learner who does exactly what the prompt says must meet every criterion, and the starters must not name content that the pictures or the learner should supply.

Base: `tmp/content-fix-2026-10-19/base/067-base.json`, which holds all 44 A2 picture-describe, picture-choose and picture-sequence tasks with media removed. The starters base is `067-starters-base.json`. I read every task in full: prompt, criteria, alt, brief, sample, quotes, model, starters and title. I looked at the pictures for schoonmaak, gymles, afval, ehbo, kringloop and marktkraam, where a criterion asks the learner to name things in the picture.

`067-original.json` holds only the 38 changed tasks, in base order, with `status: "draft"`. Fields not listed below are byte-identical to the base. That covers every image `brief`, `kind` and `size`, every criterion, sample, quote, model and title, all metadata, and the key order of every record. No media or derived fields were added. `067-starters.json` holds the full starters for the 38 tasks.

All 38 IDs go in the review's `replaces` list, in this order:

1. `A2:speaking:batch002-kapper:1`
2. `A2:speaking:batch002-portemonnee:1`
3. `A2:speaking:batch003-jas:1`
4. `A2:speaking:batch009-schoonmaak:1`
5. `A2:speaking:batch009-gymles:1`
6. `A2:speaking:batch009-afval:1`
7. `A2:speaking:batch009-ehbo:1`
8. `A2:speaking:batch009-kringloop:1`
9. `A2:speaking:batch009-alleen-samen:1`
10. `A2:speaking:batch009-klas-thuis:1`
11. `A2:speaking:batch009-gemeente-bellen:1`
12. `A2:speaking:batch009-trein-auto:1`
13. `A2:speaking:batch009-flat-dorp:1`
14. `A2:speaking:batch009-sportschool-park:1`
15. `A2:speaking:batch009-paspoort:1`
16. `A2:speaking:batch009-brief-gemeente:1`
17. `A2:speaking:batch009-vakantie:1`
18. `A2:speaking:batch009-bioscoop:1`
19. `A2:speaking:batch009-rijbewijs:1`
20. `A2:speaking:batch009-kleermaker:1`
21. `A2:speaking:batch026-marktkraam:1`
22. `A2:speaking:batch026-regen:1`
23. `A2:speaking:batch026-schoolplein:1`
24. `A2:speaking:batch026-online-winkel:1`
25. `A2:speaking:batch026-fiets-lopen:1`
26. `A2:speaking:batch026-feest-thuis:1`
27. `A2:speaking:batch026-treinkaartje:1`
28. `A2:speaking:batch026-bibliotheekboek:1`
29. `A2:speaking:batch026-koken-buurvrouw:1`
30. `A2:speaking:batch027-wachtkamer:1`
31. `A2:speaking:batch027-keuken:1`
32. `A2:speaking:batch027-kassa:1`
33. `A2:speaking:batch027-bakkerij:1`
34. `A2:speaking:batch027-contant-pinnen:1`
35. `A2:speaking:batch027-bus-fiets:1`
36. `A2:speaking:batch027-sollicitatiegesprek:1`
37. `A2:speaking:batch027-verhuizen:1`
38. `A2:speaking:batch027-tandartsbezoek:1`

## What I found

There are three kinds of mismatch, one per group of tasks.

1. **Picture-choose: the other picture is never asked for (12 items).** In every picture-choose item C2 is "Zeg ook iets over het andere plaatje.". Twelve prompts end "… Vertel ook waarom. Kies een van de plaatjes." and never mention the other picture. So a learner who follows the prompt loses C2 without knowing it existed. Only koelkast and tramkaart already asked for it. Fix: add the official short sentence "Zeg ook iets over het andere plaatje." to the end of the prompt.
2. **Picture-describe: "minstens twee" while the prompt asks "Vertel wat …" (11 items).** C1 is "Noem minstens twee dingen/soorten …", but the prompt says only "Vertel wat de leerlingen doen." or "Vertel wat Karim gaat kopen.". A learner who names one thing does what the prompt says and still fails C1. Five of these samples (gymles, ehbo, kringloop, schoolplein, kassa) are built on exactly that: they name one thing and get null on C1. Fix: the prompt sentence becomes "Noem twee dingen die …", the form batch 063 used for apotheek, jas, speeltuin and verjaardag. The blueprint (§4.3, "two things or actions named") keeps C1, so I changed the prompt rather than loosening the criterion. Where the alt did not list the things C1 asks for, I added them, checked against the picture, so the judge can verify the learner's items.
3. **Starters that name the action a criterion asks for (15 items).** In 14 of the 15 picture-sequence items the starters give each picture's action. Examples are "Eerst hangt Roos …", "Daarna knipt de kapper …", "Eerst doet Karim … in zijn koffer.", "Daarna zet hij … in de auto." and "Bij de kleermaker …". The criteria ask "Vertel wat X op het eerste plaatje doet.", so the starter supplies the very content the picture should supply. That is the same defect as the spec's example of a starter that names the place. The jas starter "Roos houdt …" does the same for C0 "Zeg wat Roos doet.". Fix: the starters keep the sequence words ("Eerst …", "Daarna …", "Op het derde plaatje …") and drop the verb. This is the form burenpakket already has ("Eerst …", "Daarna …", "Op het laatste plaatje …").

### C0 "Vertel wat u op het plaatje ziet" (11 picture-describe items)

The prompt never says "Vertel wat u ziet". I judged C0 to be covered without a change, for three reasons:

- It is the blueprint's "scene" criterion for the official one-picture instruction, which ends "Gebruik het plaatje.".
- Any description of the picture meets it, including the two things the learner names for C1. The judge is told to judge each criterion independently "by the specific information it requests" (`server/feedback-instructions.json`), and "what you see" is requested by any picture sentence.
- No sample puts its null on C0.

See doubt 1.

## Verdicts for all 44 base tasks

| # | ID | Type | Verdict |
| --- | --- | --- | --- |
| 1 | `A2:speaking:batch001-apotheek:1` | picture-describe | ok, prompt covers all criteria. C0 "Vertel waar Roos is.", C1 "Noem twee dingen die de mensen doen.", C2 "Vindt u het zelf makkelijk …? Vertel ook waarom." (batch 063). The starters name no place or action. "de medewerker" names a person, not what the person does. |
| 2 | `A2:speaking:batch001-koelkast:1` | picture-choose | ok, prompt covers all criteria ("Kiest u …? Vertel waarom. Zeg ook iets over het andere plaatje."). |
| 3 | `A2:speaking:batch002-kapper:1` | picture-sequence | changed: starters only. Prompt ok ("Vertel wat er gebeurt. Vertel iets over alle drie de plaatjes."). |
| 4 | `A2:speaking:batch002-portemonnee:1` | picture-sequence | changed: starters only. Prompt ok. |
| 5 | `A2:speaking:batch002-burenpakket:1` | picture-sequence | ok, prompt covers all criteria. The starters are already neutral (batch 063). |
| 6 | `A2:speaking:batch003-tramkaart:1` | picture-choose | ok, prompt covers all criteria ("Koopt u het liever …? Kies … Vertel waarom. Vertel ook iets over het andere plaatje."). |
| 7 | `A2:speaking:batch003-jas:1` | picture-describe | changed: starter 0 only. Prompt ok ("Vertel wat Roos doet. Noem twee dingen … Wat vindt u van deze situatie?"). |
| 8 | `A2:speaking:batch003-speeltuin:1` | picture-describe | ok, prompt covers all criteria. Starter "Fatima staat …" leaves the place to the learner. |
| 9 | `A2:speaking:batch009-schoonmaak:1` | picture-describe | changed: prompt ("Noem twee dingen …"), alt. |
| 10 | `A2:speaking:batch009-gymles:1` | picture-describe | changed: prompt, alt. |
| 11 | `A2:speaking:batch009-afval:1` | picture-describe | changed: prompt. The alt already names the bottles and the cardboard. |
| 12 | `A2:speaking:batch009-ehbo:1` | picture-describe | changed: prompt, alt. |
| 13 | `A2:speaking:batch009-kringloop:1` | picture-describe | changed: prompt, alt. |
| 14 | `A2:speaking:batch009-verjaardag:1` | picture-describe | ok, prompt covers all criteria ("Vertel wie er op het feest zijn. Noem twee dingen die u op de tafel ziet. Vertel ook wat u van kinderfeestjes vindt.", batch 063). |
| 15 | `A2:speaking:batch009-alleen-samen:1` | picture-choose | changed: prompt (adds "Zeg ook iets over het andere plaatje."). |
| 16 | `A2:speaking:batch009-klas-thuis:1` | picture-choose | changed: prompt (same). |
| 17 | `A2:speaking:batch009-gemeente-bellen:1` | picture-choose | changed: prompt (same). |
| 18 | `A2:speaking:batch009-trein-auto:1` | picture-choose | changed: prompt (same). |
| 19 | `A2:speaking:batch009-flat-dorp:1` | picture-choose | changed: prompt (same). |
| 20 | `A2:speaking:batch009-sportschool-park:1` | picture-choose | changed: prompt (same). |
| 21 | `A2:speaking:batch009-paspoort:1` | picture-sequence | changed: starters only. Prompt ok. |
| 22 | `A2:speaking:batch009-brief-gemeente:1` | picture-sequence | changed: starters only. Prompt ok. |
| 23 | `A2:speaking:batch009-vakantie:1` | picture-sequence | changed: starters only. Prompt ok. |
| 24 | `A2:speaking:batch009-bioscoop:1` | picture-sequence | changed: starters only. Prompt ok. |
| 25 | `A2:speaking:batch009-rijbewijs:1` | picture-sequence | changed: starters 0 and 1 only. Prompt ok. |
| 26 | `A2:speaking:batch009-kleermaker:1` | picture-sequence | changed: starters only. Prompt ok. |
| 27 | `A2:speaking:batch026-marktkraam:1` | picture-describe | changed: prompt, alt. |
| 28 | `A2:speaking:batch026-regen:1` | picture-describe | changed: prompt. The alt already names the actions. The 063 situation line is kept. |
| 29 | `A2:speaking:batch026-schoolplein:1` | picture-describe | changed: prompt. The alt already names the actions. |
| 30 | `A2:speaking:batch026-online-winkel:1` | picture-choose | changed: prompt (adds "Zeg ook iets over het andere plaatje."). |
| 31 | `A2:speaking:batch026-fiets-lopen:1` | picture-choose | changed: prompt (same). |
| 32 | `A2:speaking:batch026-feest-thuis:1` | picture-choose | changed: prompt (same). |
| 33 | `A2:speaking:batch026-treinkaartje:1` | picture-sequence | changed: starters only. Prompt ok. |
| 34 | `A2:speaking:batch026-bibliotheekboek:1` | picture-sequence | changed: starters only. Prompt ok. |
| 35 | `A2:speaking:batch026-koken-buurvrouw:1` | picture-sequence | changed: starters only. Prompt ok. |
| 36 | `A2:speaking:batch027-wachtkamer:1` | picture-describe | changed: prompt. The alt already names the actions. |
| 37 | `A2:speaking:batch027-keuken:1` | picture-describe | changed: prompt. The alt already names the actions. The 063 situation line is kept. |
| 38 | `A2:speaking:batch027-kassa:1` | picture-describe | changed: prompt. The alt already names the bread, milk and bananas. |
| 39 | `A2:speaking:batch027-bakkerij:1` | picture-choose | changed: prompt (adds "Zeg ook iets over het andere plaatje."). |
| 40 | `A2:speaking:batch027-contant-pinnen:1` | picture-choose | changed: prompt (same). |
| 41 | `A2:speaking:batch027-bus-fiets:1` | picture-choose | changed: prompt (same). |
| 42 | `A2:speaking:batch027-sollicitatiegesprek:1` | picture-sequence | changed: starters only. Prompt ok. |
| 43 | `A2:speaking:batch027-verhuizen:1` | picture-sequence | changed: starters only. Prompt ok. |
| 44 | `A2:speaking:batch027-tandartsbezoek:1` | picture-sequence | changed: starters only. Prompt ok. |

In every picture-sequence item the prompt ("Vertel wat X doet. Vertel iets over alle (drie de) plaatjes.") covers the three per-picture criteria. Every picture-describe C2 is asked by "Vertel ook wat u van … vindt." or a question. Every picture-choose C0 and C1 are asked by "… liever … of …?" and "Vertel ook waarom.".

Titles: I read all 44 again and none gives away a criterion. The sequence titles name the theme (for example "Roos gaat naar de kapper" or "Karim gaat naar de tandarts"), not a picture's action. The choose titles name the two options, which the prompt also names. Two titles echo the situation line, which in turn names one picture's action: "Modibo brengt een boek te laat terug" and "Fatima kookt voor haar buurvrouw". The audit treats this as the official pattern, so I left both unchanged (doubt 7).

## Changes per task

### Picture-describe: prompt asks for the number C1 checks (11 items)

In each prompt one sentence changes. Before → after:

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| schoonmaak | prompt | Vertel wat Julio bij zich heeft. | Noem twee dingen die Julio bij zich heeft. | C1 "Noem minstens twee dingen die Julio bij zich heeft." |
| schoonmaak | images[0].alt | Een jonge man staat met schoonmaakspullen in een kantoor. | Een jonge man staat met schoonmaakspullen in een kantoor: een dweil in een emmer, een stofzuiger, een spuitfles en een doek. | The judge gets only the alt, and "schoonmaakspullen" does not let it check the learner's two things. Checked against the picture. |
| gymles | prompt | Vertel wat de leerlingen doen. | Noem twee dingen die de leerlingen doen. | C1 "Noem minstens twee dingen die de leerlingen doen." The sample ("Sem klimt in een touw.") names one action and gets null on C1. |
| gymles | images[0].alt | Leerlingen sporten in een gymzaal: een jongen klimt in een touw, anderen spelen met een bal. | Leerlingen sporten in een gymzaal: een jongen klimt in een touw, twee leerlingen gooien een bal naar elkaar en een meisje springt bij een mat. | The jumping girl, which the model names ("Een meisje springt op een mat."), was missing. Checked against the picture: she jumps beside the mat. |
| afval | prompt | Vertel wat Karim weggooit. | Noem twee soorten afval die Karim weggooit. | C1 "Noem minstens twee soorten afval." I used "soorten afval" rather than "dingen" so that "flessen en glas" does not look like two answers. The alt already has "een tas flessen en karton". |
| ehbo | prompt | Vertel wat er in de doos zit. | Noem twee dingen uit de doos. | C1 "Noem minstens twee dingen uit de doos." In the picture most items lie on the table beside the box, so "uit de doos" fits better than "in de doos". The sample names one item and gets null on C1. |
| ehbo | images[0].alt | Een vrouw zit aan tafel met een open doos met verband en pleisters. | Een vrouw zit aan tafel met een open doos. Voor haar op tafel liggen een rol verband, pleisters, een schaar en een thermometer. | The model names the scissors and the thermometer, which the old alt did not mention. Checked against the picture. |
| kringloop | prompt | Vertel wat Fatima daar kan kopen. | Noem twee dingen die Fatima daar kan kopen. | C1 "Noem minstens twee dingen die Fatima kan kopen." The sample names one item and gets null on C1. |
| kringloop | images[0].alt | Een vrouw kijkt in een winkel naar een bank, een lamp en een fiets. | Een vrouw kijkt in een winkel naar een bank. Er zijn ook een lamp, een kast met kopjes en borden, een stapel boeken en een fiets. | The model names "een kast met borden en kopjes", which the old alt did not mention. Checked against the picture. |
| marktkraam | prompt | Vertel wat Hasan bij deze kraam kan kopen. | Noem twee dingen die Hasan bij deze kraam kan kopen. | C1 "Noem minstens twee dingen die Hasan kan kopen." |
| marktkraam | images[0].alt | … met fruit en groente; … | … met appels, tomaten en wortels; … | The judge can now check the learner's items. Checked against the picture. |
| regen | prompt | Vertel wat de mensen bij de halte doen. | Noem twee dingen die de mensen bij de halte doen. | C1 "Noem minstens twee dingen die de mensen doen." The 063 situation "Sabrina gaat naar haar werk." is kept. |
| schoolplein | prompt | Vertel wat de kinderen doen. | Noem twee dingen die de kinderen doen. | C1 "Noem minstens twee dingen die de kinderen doen." The sample names one action and gets null on C1. |
| wachtkamer | prompt | Vertel wat de mensen doen. | Noem twee dingen die de mensen doen. | C1 "Noem minstens twee dingen die de mensen doen." |
| keuken | prompt | Vertel wat de mensen doen. | Noem twee dingen die de mensen doen. | C1 "Noem minstens twee dingen die de mensen doen." The 063 situation "Fatima is thuis met haar kinderen." is kept. |
| kassa | prompt | Vertel wat Karim gaat kopen. | Noem twee dingen die Karim gaat kopen. | C1 "Noem minstens twee dingen die Karim gaat kopen." The sample names only "brood" and gets null on C1. |

The criteria stay. "minstens twee" in the criterion and "twee" in the prompt agree, because two things meet "at least two". The samples and quotes are unchanged and still miss exactly one criterion. In gymles, ehbo, kringloop, schoolplein and kassa, the sample now plainly misses what the prompt asks for. The models are unchanged and each names at least two things (38–44 words). The starters are unchanged. The C1 starters already have two slots ("… en …") or leave the items to the learner. Afval's "Hij gooit … in de …" takes its verb from the prompt and lets the learner supply the waste.

### Picture-choose: prompt asks for C2 (12 items)

The same edit in all 12. The prompt ending "… Vertel ook waarom. Kies een van de plaatjes." becomes "… Vertel ook waarom. Kies een van de plaatjes. Zeg ook iets over het andere plaatje.".

| Item | Field | Before (start of prompt unchanged) | After | Reason |
| --- | --- | --- | --- | --- |
| alleen-samen, klas-thuis, gemeente-bellen, trein-auto, flat-dorp, sportschool-park, online-winkel, fiets-lopen, feest-thuis, bakkerij, contant-pinnen, bus-fiets | prompt | … Vertel ook waarom. Kies een van de plaatjes. | … Vertel ook waarom. Kies een van de plaatjes. Zeg ook iets over het andere plaatje. | C2 is "Zeg ook iets over het andere plaatje." and the prompt did not ask for it. The wording is the spec's official form, and C2 is unchanged. |

Placement: I put the sentence after "Kies een van de plaatjes.", because "het andere plaatje" only makes sense once one has been chosen. It also keeps the two "ook" sentences apart. Koelkast (063) puts it before "Kies een van de plaatjes.", and tramkaart puts it at the end, as here (doubt 4). Every new sentence has 7 words, and no prompt sentence exceeds 16 words. Every model already says something about the other picture, for example "Alleen werken, zoals op het eerste plaatje, vind ik te stil." Eight samples put their null on C2 (alleen-samen, gemeente-bellen, trein-auto, sportschool-park, online-winkel, fiets-lopen, bakkerij and bus-fiets), and the other four put it on C1 (klas-thuis, flat-dorp, feest-thuis and contant-pinnen). Both still miss exactly one criterion. The third starters ("Op het andere plaatje …", "Het andere plaatje vind ik …", "Met de … moet je …") are unchanged.

### Starters that named a picture's action (15 items)

Only `067-starters.json` differs. In these records only `status` differs from the base. `status` is not among the fields that `scripts/content.ts` hashes into `revision`, so integration keeps each item's revision and its audio, and learners' stored answers stay valid. The items are in the batch only because `content:integrate` merges a batch's starters only for IDs that the batch owns.

| Item | Before | After | Reason |
| --- | --- | --- | --- |
| jas | "Roos houdt …", "Ik zie … en …", "Ik vind deze situatie …" | "Roos …", (unchanged), (unchanged) | C0 is "Zeg wat Roos doet."; "houdt" is the action the picture shows. "Roos …" keeps the subject-and-gap form of apotheek's "Roos … en de medewerker …". It does not restore the old "Roos is …", which led to "thuis". |
| kapper | "Eerst hangt Roos …", "Daarna knipt de kapper …", "Aan het einde betaalt Roos …" | "Eerst …", "Daarna …", "Aan het einde …" | Each starter gave the action of its picture. The model's sequence words are kept. |
| portemonnee | "Eerst kijkt Modibo …", "Daarna praat Modibo met …", "Op het laatste plaatje krijgt hij …" | "Eerst …", "Daarna …", "Op het laatste plaatje …" | Same. |
| paspoort | "Op het eerste plaatje laat Fatima …", "Op het tweede plaatje geeft ze …", "Op het derde plaatje krijgt ze …" | "Op het eerste plaatje …", "Op het tweede plaatje …", "Op het derde plaatje …" | Same. |
| brief-gemeente | "Eerst leest Julio …", "Daarna belt hij …", "Op het laatste plaatje praat hij met …" | "Eerst …", "Daarna …", "Op het laatste plaatje …" | Same. |
| vakantie | "Eerst doet Karim … in zijn koffer.", "Daarna zet hij … in de auto.", "Op het derde plaatje zit hij …" | "Eerst …", "Daarna …", "Op het derde plaatje …" | The first two needed only a noun to make a full answer. |
| bioscoop | "Eerst koopt mevrouw Bakker …", "Daarna haalt ze …", "Op het derde plaatje zitten ze …" | "Eerst …", "Daarna …", "Op het derde plaatje …" | Same as kapper. |
| rijbewijs | "Op het eerste plaatje heeft Modibo …", "Daarna oefent hij …", "Op het derde plaatje …" | "Op het eerste plaatje …", "Daarna …", (unchanged) | "oefent" gave picture 2. "heeft Modibo …" pointed to "rijles". |
| kleermaker | "Eerst staat Hasan …", "Bij de kleermaker …", "Daarna haalt hij …" | "Eerst …", "Daarna …", "Op het laatste plaatje …" | "Bij de kleermaker" named the place of picture 2, which the prompt does not name. "haalt" gave picture 3. |
| treinkaartje | "Op het eerste plaatje koopt Sem …", "Daarna staat hij op …", "Op het derde plaatje zit hij …" | "Op het eerste plaatje …", "Daarna …", "Op het derde plaatje …" | Same as kapper. |
| bibliotheekboek | "Op het eerste plaatje vindt Modibo …", "Daarna brengt hij …", "Op het derde plaatje pakt hij …" | "Op het eerste plaatje …", "Daarna …", "Op het derde plaatje …" | Same. |
| koken-buurvrouw | "Op het eerste plaatje kookt Fatima …", "Daarna brengt ze …", "Op het derde plaatje eten ze …" | "Op het eerste plaatje …", "Daarna …", "Op het derde plaatje …" | Same. |
| sollicitatiegesprek | "Op het eerste plaatje schrijft Sabrina …", "Op het tweede plaatje praat ze met …", "Op het derde plaatje geeft ze …" | "Op het eerste plaatje …", "Op het tweede plaatje …", "Op het derde plaatje …" | Same. |
| verhuizen | "Op het eerste plaatje doet Modibo … in dozen.", "Daarna draagt hij … naar …", "Op het derde plaatje zit hij …" | "Op het eerste plaatje …", "Daarna …", "Op het derde plaatje …" | The first needed only a noun to make a full answer. |
| tandartsbezoek | "Op het eerste plaatje heeft Karim … en hij belt …", "Op het tweede plaatje ligt hij …", "Op het derde plaatje krijgt hij …" | "Op het eerste plaatje …", "Op het tweede plaatje …", "Op het derde plaatje …" | "belt", "ligt" and "krijgt" gave the three actions. |

The new starters keep what helps an A2 learner: one fragment per picture, in order, and a sequence word that sets up verb-second order ("Eerst hangt …"). Each keeps the sequence words of the old starter or the model. Each contains "…" and none is a complete answer.

I left the picture-describe starters that name only a person ("Sabrina … en een vrouw …", "Een kind … en een vrouw …", "Fatima …, haar zoon … en haar dochter …", "Amina … en twee kinderen …") unchanged. In each the learner still supplies the actions C1 asks for. Starters that open with a posture and leave the scene to the learner ("Karim staat bij …", "Roos zit aan tafel met …") are unchanged too, because C0 there is the broad "what you see". Starters that only repeat the situation line ("Ik zie Julio in …", "Karim staat in de rij bij …", "Fatima is in een winkel met …") are also unchanged.

## Self-check

Script checks against the base and the batch:

- Record keys and key order are identical to the base. Only `status`, `prompt` and `images[0].alt` differ, as listed above, and no image `brief` changed.
- Every sample has exactly one null quote, and every other quote is a verbatim substring of its sample.
- No prompt sentence appears in any sample or model.
- No prompt sentence has more than 16 words.
- Each record has one starter per criterion, each with "…".
- The models are unchanged and run from 28 to 44 words.
- The starters file has the same 38 IDs, in the same order as the batch.

## Media consequences

New narrator audio is needed for the 23 changed prompts:

- `A2:speaking:batch009-schoonmaak:1#prompt`
- `A2:speaking:batch009-gymles:1#prompt`
- `A2:speaking:batch009-afval:1#prompt`
- `A2:speaking:batch009-ehbo:1#prompt`
- `A2:speaking:batch009-kringloop:1#prompt`
- `A2:speaking:batch009-alleen-samen:1#prompt`
- `A2:speaking:batch009-klas-thuis:1#prompt`
- `A2:speaking:batch009-gemeente-bellen:1#prompt`
- `A2:speaking:batch009-trein-auto:1#prompt`
- `A2:speaking:batch009-flat-dorp:1#prompt`
- `A2:speaking:batch009-sportschool-park:1#prompt`
- `A2:speaking:batch026-marktkraam:1#prompt`
- `A2:speaking:batch026-regen:1#prompt`
- `A2:speaking:batch026-schoolplein:1#prompt`
- `A2:speaking:batch026-online-winkel:1#prompt`
- `A2:speaking:batch026-fiets-lopen:1#prompt`
- `A2:speaking:batch026-feest-thuis:1#prompt`
- `A2:speaking:batch027-wachtkamer:1#prompt`
- `A2:speaking:batch027-keuken:1#prompt`
- `A2:speaking:batch027-kassa:1#prompt`
- `A2:speaking:batch027-bakkerij:1#prompt`
- `A2:speaking:batch027-contant-pinnen:1#prompt`
- `A2:speaking:batch027-bus-fiets:1#prompt`

These items have no cue, so no `#cue` clip is affected. No image brief changed, so no new drawing is needed. Five alts changed (schoonmaak, gymles, ehbo, kringloop, marktkraam), and alts need no media. The 15 starter-only items keep their prompt audio and their revision.

## Doubts for the reviewer

1. **C0 "Vertel wat u op het plaatje ziet" is not asked for literally** in the 11 official-pattern picture-describe items. I rely on "Gebruik het plaatje." and on the C1 sentence also describing the picture. If the judge treats C0 as needing a separate scene sentence, a learner who does only what the prompt says would lose it. Before release I suggest a bounded judge check. For example, gymles answered with "Sem klimt in een touw en twee kinderen gooien een bal. Ik vind sport op school goed." should pass all three criteria. If it fails C0, the smallest fix is to add "Vertel wat u ziet." to the start of each prompt. I did not do that, because it would turn the prompt into a checklist that overlaps C1.
2. **The starter-only items (15) apply the spec's starter rule to actions.** I read "must not name content that the pictures … should supply" as covering the verb when the criterion asks what someone does, not only the place. If you read the rule as covering places only, drop those 15 records from `067-original.json` and `067-starters.json`. They are independent of the other 23, and only the kleermaker starter "Bij de kleermaker …" would still be a place leak. The new starters are thinner, but this is the form burenpakket already passed review with.
3. **Jas starter.** Batch 063 changed "Roos is …" to "Roos houdt …" earlier today, and its notes already flagged that "houdt" supplies the C0 verb. "Roos …" keeps the 063 fix (no lead into "thuis") and removes the verb.
4. **Placement of "Zeg ook iets over het andere plaatje."** It goes at the end in the 12 picture-choose prompts, as in tramkaart. Koelkast (063) has it before "Kies een van de plaatjes.". If you want one bank-wide order, the 12 prompts can move the sentence before "Kies …". That costs no extra audio, because these clips are regenerated anyway.
5. **Regen and keuken** had their prompts regenerated earlier today for batch 063, and they need prompt audio again.
6. **Criteria say "minstens twee", prompts say "twee".** I left the criteria unchanged, since the spec says not to reword criteria for style. They agree in meaning.
7. **Not changed, but noticed.**
   - Some situation lines name the action of one picture: bibliotheekboek "brengt een boek te laat terug", koken-buurvrouw "kookt voor haar buurvrouw" and tandartsbezoek "gaat naar de tandarts". So do their titles. The audit treats this as the official pattern ("Ricardo werkt als kapper").
   - Wachtkamer's situation "Hasan zit in de wachtkamer" can be repeated as one of the "twee dingen die de mensen doen".
   - The kassa sample's C0 quote "Karim staat in rij bij de kassa." restates the situation line. The audit's low-priority note covers this.
8. **Sollicitatiegesprek.** The model says "schrijft Sabrina een sollicitatiebrief", while the picture and alt show her typing at a laptop. This is unchanged, and the judge can accept either.

## Check output

```
$ npx tsx scripts/batch-check.ts content/batches/067-original.json
Checked 38 items, 0 questions. Keys: {}. Options: {}.
  info  38 of 38 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
