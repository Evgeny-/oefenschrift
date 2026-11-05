# Batch 093 — A2 speaking, eight new tasks (5 November 2026)

Batch 093 is the first of the three speaking batches in `docs/briefs/a2-expansion-2026-11-05.md`. It has two tasks of each official DUO "Spreken A2" type (blueprint §4.3): two `video-answer`, two `picture-describe`, two `picture-choose` and two `picture-sequence`. Every situation, cue, criterion, sample, model, brief and starter was written for this project. Official material was used for structure only: the instruction sentences follow the patterns in blueprint §4.3 and the A2 Spreken paragraph of `docs/research/exam-blueprints-2026-09-10.md`. No official scenario, picture or question was reused. No facts needed checking, since nothing here is a KNM claim or a time-sensitive fact.

The levels are authoring targets (`status: "draft"`, `targetLevelValidated: false`). This is AI editorial work. It does not validate CEFR difficulty and claims no exam equivalence or pass prediction. The record shape copies the current `batch027` records (cursuskeuze, kassa, bus-fiets, tandartsbezoek), without media or derived fields (`revision`, `promptAudio`, `cueAudio`, `images[].file`).

Shared settings: `speakingSeconds: 40`, `prepSeconds: 10`, `rubric: a2-spreken`, three criteria per task that mirror the type. Each model is 25–45 words, uses main clauses only (no subordinate clause at all; `want` and `dus` are coordinating), and has no sentence over 13 words. Each sample misses exactly one criterion: one `null` quote, the other quotes verbatim, and one or two typical learner errors.

**Tone.** `buurman-hond` is the one lightly humorous item. Bobbie the dog "stopt bij elke boom", and the model calls back to this with "Daar staan veel bomen, dus hij is blij!". The other seven are ordinary everyday tasks.

**Organisations and names.** No firm, shop, school or web address is named, so there was no name to check on the web: the shop is "de bouwmarkt", the repair shop "de fietsenmaker" and the office "een groot bedrijf". People come from the 093 pool (Ayoub, Mirjam, Henk, Gülsen, Sander, Inge). No voice name and no older recurring cast member is used. Bobbie is the dog's name.

## 1. Batch matrix

| # | slug | taskType | Domain | Cast / speaker | Topic | Omitted criterion in sample |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | buurman-hond | video-answer | wonen-buurt | Henk, neighbour (`m-older`, `je`) | can you walk his dog on Saturday, and at what time; plus where you will walk | 2 (time) |
| 2 | collega-weekend | video-answer | werk | Mirjam, colleague (`f-mature`, `je`) | what you did at the weekend and whether you liked it; plus with whom | 3 (with whom) |
| 3 | bouwmarkt | picture-describe | winkels-diensten | Sander | a man with a trolley in a DIY store; two things he buys; opinion on doing jobs at home yourself | 3 (opinion) |
| 4 | vergadering | picture-describe | werk | Inge (+ three unnamed colleagues) | a team meeting; two things on the table; opinion on meetings at work | 2 (two things) |
| 5 | cadeau-kiezen | picture-choose | vrije-tijd-familie | two unnamed women (giver, colleague) | birthday gift for a colleague: flowers or chocolates | 2 (reason) |
| 6 | kantoor-thuiswerken | picture-choose | werk | Ayoub (named in the briefs only) | work at the office or at home | 3 (other picture) |
| 7 | fiets-lek | picture-sequence | vervoer | Gülsen (+ unnamed bicycle repairer) | flat tyre at home, walking the bike to the repairer, riding away | 2 (picture 2) |
| 8 | boodschappen-online | picture-sequence | winkels-diensten | Henk (+ unnamed delivery man) | ordering groceries on a laptop, the delivery at the door, the fridge | 1 (picture 1) |

Domains: werk 3, winkels-diensten 2, wonen-buurt 1, vrije-tijd-familie 1, vervoer 1, as the plan assigns. Omitted criteria across the batch: criterion 1 once, criterion 2 four times, criterion 3 three times.

## 2. Cast and fixed traits (copied verbatim in every brief)

| Person | Traits as written in every brief | Briefs |
| --- | --- | --- |
| Henk | `Henk (man of about 70, short white hair, dark green jumper)` | buurman-hond still; boodschappen-online panels 1–3. His dog is "a small brown dog" in the still and in panel 1. |
| Gülsen | `Gülsen (woman of about 30, long black hair in a ponytail, dark red coat)` | fiets-lek panels 1–3 |
| bicycle repairer (unnamed) | `the bicycle repairer, a man of about 50 with a grey beard and a dark blue apron` | fiets-lek panels 2–3 |
| Ayoub | `Ayoub (man of about 28, short black curly hair, light blue shirt)` | kantoor-thuiswerken pictures 1–2 |
| giver and colleague (unnamed) | `a woman of about 30 with short curly brown hair and a mustard-yellow jumper` / `a smiling colleague, a woman of about 55 with grey hair and glasses` | cadeau-kiezen pictures 1–2 |
| Mirjam | `Mirjam (woman of about 45, shoulder-length brown hair, green cardigan)` | collega-weekend still |
| Sander | `Sander (man of about 35, short blond hair and a beard, grey sweater)` | bouwmarkt |
| Inge | `Inge (woman of about 50, short grey hair, blue blouse)` | vergadering |

Each name appears in at most two items: Henk in two, everyone else in one. A woman leads the meeting and a man delivers the groceries, so the roles avoid stereotypes in both directions.

## 3. Per task

### Video-answer

1. **buurman-hond** (`A2:speaking:batch093-buurman-hond:1`).
   - Prompt: "U komt thuis. Uw buurman Henk staat bij zijn voordeur. Hij stelt u een vraag. U hoort de vraag. Geef antwoord. Zeg ook waar u met de hond gaat wandelen." The speaker is named first. The prompt does not repeat the cue's question; the extra detail is the place.
   - Cue: Henk, role `m-older` (Arjen, "older neighbour"), 33 words in four sentences: "Hoi! Ik heb last van mijn knie, dus ik kan even niet lang lopen. En Bobbie stopt bij elke boom! Kun jij zaterdag met hem wandelen, en hoe laat kom je hem halen?" It is one question with two parts.
   - Premise change: the plan asks "whether you can walk his dog on Saturday and at what time". A first draft had Henk away at his sister's all day, but then the learner could not "come and fetch" the dog without a key. A sore knee keeps Henk at home, which makes "hoe laat kom je hem halen" coherent. The knee is mild and everyday, not graphic illness.
   - Sample (23 words) omits criterion 2, the time. Errors: "bij de kanaal" (het kanaal) and "Daar hij kan lekker lopen" (verb second).
   - Model (40 words): "Ja hoor, dat doe ik graag." (1); "om tien uur halen" (2); "naar het park bij de school" (3); a return time and "Beterschap!" fill the 40 seconds naturally.
2. **collega-weekend** (`A2:speaking:batch093-collega-weekend:1`).
   - Prompt: "Het is maandagochtend. U bent op uw werk. Uw collega Mirjam stelt u een vraag. U hoort de vraag. Geef antwoord. Zeg ook met wie u dat hebt gedaan."
   - Cue: Mirjam, role `f-mature` (Ruth, "mature female colleague"), 29 words: "Goedemorgen! Ik heb het hele weekend in de tuin gewerkt, dus ik ben een beetje moe. En jij? Wat heb jij dit weekend gedaan, en vond je het leuk?" Mirjam shares her own weekend first, as colleagues do on a Monday.
   - Personal data: "with whom" asks for no real personal data. Any invented answer passes.
   - Sample (21 words) omits criterion 3. Errors: "ik heb veel groente kopen" (participle) and "het regent de hele dag" (tense).
   - Model (38 words): train trip to a brother in Utrecht (1); "Ik vond het heel leuk, want …" (2); "naar mijn broer … met zijn kinderen" (3).

### Picture-describe

3. **bouwmarkt** (`A2:speaking:batch093-bouwmarkt:1`).
   - Prompt: "Sander wil thuis een klus doen. Vertel wat u ziet. Noem twee dingen die Sander koopt. Vertel ook wat u van zelf klussen in huis vindt. Gebruik het plaatje." The situation says nothing about the shop or the trolley, and the title "Sander gaat klussen" gives no picture fact away.
   - Picture: Sander pushes a trolley with two pots of paint, a bucket and a lamp.
   - Plan change: the plan has "paint pots and a brush", but `kwast` is not on the word list. The model and alt must name what the picture shows, so the brush became a bucket (`emmer`) and a lamp (`lamp`). Both are listed words, and they make three nameable objects, one more than the count. See "Requested words".
   - Sample (24 words) omits criterion 3, the opinion. Error: "een groot winkel" (adjective inflection with a de-word).
   - Model (40 words): bouwmarkt and trolley (1); "twee potten verf, een emmer en een lamp" (2); "Zelf klussen vind ik leuk. Het is goedkoper en ik leer er veel van." (3).
4. **vergadering** (`A2:speaking:batch093-vergadering:1`).
   - Prompt: "Inge werkt bij een groot bedrijf. Vertel wat u ziet. Noem twee dingen die u op de tafel ziet. Vertel ook wat u van vergaderingen op het werk vindt. Gebruik het plaatje."
   - Picture: Inge and three colleagues at a table; she points at a laptop with a blank screen; on the table are coffee cups, a plate of biscuits and a bottle of water.
   - Giveaway check: the opinion question names meetings. This tells the learner the topic but not what the picture shows (who, how many, what Inge does, what is on the table), as in the catalogue's gymles ("sport op school").
   - Sample (24 words) omits criterion 2: nothing on the table is named. Errors: "over de werk" (het werk) and "omdat ze duren te lang" (verb-final order after `omdat`).
   - Model (41 words): the scene (1); "koffie, koekjes en een fles water" (2); "Ik vind vergaderingen soms lang. Maar samen praten is wel belangrijk." (3).

### Picture-choose

5. **cadeau-kiezen** (`A2:speaking:batch093-cadeau-kiezen:1`).
   - Prompt: "Een collega is morgen jarig. U wilt haar een klein cadeau geven. Geeft u liever bloemen of chocolaatjes? Kies een van de plaatjes. Vertel ook waarom. Zeg ook iets over het andere plaatje."
   - Pair: the same giver and the same colleague at the same desk. The only difference is a bunch of flowers or a box of chocolates with a ribbon.
   - Sample (20 words) omits criterion 2, the reason: it chooses and mentions the flowers but never says why. Error: "ziet ik" (congruence).
   - Model (39 words): "Ik kies het eerste plaatje, de bloemen." (1); on her desk all week (2); "De chocolaatjes op het tweede plaatje zijn ook lekker. Maar misschien houdt ze niet van chocola." (3).
6. **kantoor-thuiswerken** (`A2:speaking:batch093-kantoor-thuiswerken:1`).
   - Prompt: "U hebt een nieuwe baan. U mag zelf kiezen: op kantoor werken of thuis. Waar werkt u liever? Kies een van de plaatjes. Vertel ook waarom. Zeg ook iets over het andere plaatje."
   - Pair: Ayoub with the same laptop (blank screen) in a busy office beside two colleagues, or at a kitchen table at home with a cup of tea.
   - Sample (21 words) omits criterion 3, the other picture. Error: "van hun" (object pronoun: hen / ze).
   - Model (44 words): second picture, home (1); no hour on the train, quiet (2); "Op het eerste plaatje zie je een kantoor met collega's. Dat is gezellig, maar vaak ook druk." (3).

### Picture-sequence

7. **fiets-lek** (`A2:speaking:batch093-fiets-lek:1`).
   - Prompt: "Gülsen gaat elke ochtend met de fiets naar haar werk. Kijk naar de plaatjes. Vertel wat Gülsen doet. Vertel iets over alle plaatjes." Neither the situation nor the title ("Gülsen en haar fiets") mentions the flat tyre.
   - Panels: Gülsen bends over a completely flat front tyre in front of her house; she walks the bike to the open door of a small bicycle shop where the repairer waits; she rides away from the same shop, smiling, with the repairer at the door.
   - Sample (25 words) omits criterion 2, the walk to the repairer. Error: "Op het laatste plaatje ze fietst" (verb second).
   - Model (41 words): one or two sentences per panel ("lekke band", "loopt ze met de fiets naar de fietsenmaker", "de band weer heel. Ze fietst blij weg").
8. **boodschappen-online** (`A2:speaking:batch093-boodschappen-online:1`).
   - Prompt: "Henk heeft bijna geen eten meer in huis. Kijk naar de plaatjes. Vertel wat Henk doet. Vertel iets over alle plaatjes." The title "Henk heeft eten nodig" names neither the laptop, the delivery nor the fridge.
   - Panels, all in Henk's house: at the living-room table with a laptop (blank screen), his dog at his feet; at the front door taking two crates from a young delivery man; in the kitchen, putting milk, cheese and vegetables from a shopping bag into the fridge.
   - Realism: panel 3 shows a shopping bag rather than the crates. Dutch grocery drivers usually take their crates back at the door.
   - Sample (20 words) omits criterion 1: it starts at the delivery. Error: "Dan Henk zet" (verb second).
   - Model (39 words): one sentence or two per panel; "Dat is handig!" closes it.

## 4. Language-control figures

Words (w), sentences (s), average and longest sentence in words. Every field stays within the A2 limits of blueprint §10: average under 12 and none over 18; models none over 16.

| Task | Prompt | Cue | Sample | Model | Brief words |
| --- | --- | --- | --- | --- | --- |
| buurman-hond | 30 w, 6 s, avg 5.0, max 9 | 33 w, 4 s, avg 8.3, max 13 | 23 w, 3 s, avg 7.7, max 10 | 40 w, 6 s, avg 6.7, max 10 | 44 |
| collega-weekend | 29 w, 6 s, avg 4.8, max 8 | 29 w, 4 s, avg 7.3, max 15 | 21 w, 2 s, avg 10.5, max 12 | 38 w, 4 s, avg 9.5, max 12 | 35 |
| bouwmarkt | 29 w, 5 s, avg 5.8, max 10 | — | 24 w, 3 s, avg 8.0, max 11 | 40 w, 6 s, avg 6.7, max 10 | 43 |
| vergadering | 32 w, 5 s, avg 6.4, max 10 | — | 24 w, 3 s, avg 8.0, max 11 | 41 w, 6 s, avg 6.8, max 10 | 48 |
| cadeau-kiezen | 33 w, 6 s, avg 5.5, max 7 | — | 20 w, 3 s, avg 6.7, max 9 | 39 w, 5 s, avg 7.8, max 9 | 43 / 46 |
| kantoor-thuiswerken | 33 w, 7 s, avg 4.7, max 7 | — | 21 w, 2 s, avg 10.5, max 13 | 44 w, 6 s, avg 7.3, max 13 | 37 / 38 |
| fiets-lek | 23 w, 4 s, avg 5.8, max 10 | — | 25 w, 3 s, avg 8.3, max 11 | 41 w, 5 s, avg 8.2, max 12 | 35 / 51 / 47 |
| boodschappen-online | 21 w, 4 s, avg 5.3, max 8 | — | 20 w, 3 s, avg 6.7, max 8 | 39 w, 5 s, avg 7.8, max 12 | 39 / 37 / 33 |

Tenses are present and perfect only. No model has a subordinate clause; the samples have one `omdat` clause (vergadering), which carries the intended word-order error. Numbers in the cues and models are words ("om tien uur", "om elf uur").

## 5. Word gate (blueprint §10, `scripts/a2-vocabulary.ts`)

All eight items fall under the gate (batch ≥ 087). The checker reports no unlisted word and no compound in any title, prompt, cue, criterion, model, alt or starter, so there is no compound to judge. Listed words that a reviewer may want to weigh in context:

- `klus` / `zelf klussen` (bouwmarkt): listed, and the situation "een klus doen" explains it.
- `last van mijn knie` and `Beterschap` (buurman-hond): idiomatic, every word listed.
- `jarig`, `chocolaatjes`, `bezorger`, `kratten`, `lekke band`, `fietsenmaker`, `winkelwagen`: listed, everyday words.
- `maandagochtend` passes through the day-part rule.

**Requested words** (the coordinator decides; I did not need them, and the items work without them):

- `kwast` (paint brush). The plan's bouwmarkt picture had a brush. It was replaced by a bucket and a lamp because the model and alt could not name a brush.
- `zwaaien` (to wave). Optional, for the fiets-lek alt: the repairer may wave in panel 3, and the alt leaves this out.

## 6. Image briefs

Every brief is short (33–51 words), positive and plain English, and ends with "No text." Screens are "blank". No brief lists things to leave out (blueprint §7, local model). Sizes:

- `still` for the two video-answer speakers, each looking at the viewer as if asking.
- No size (single) for picture-describe, as in kassa.
- `pair` for picture-choose.
- `sequence` for picture-sequence.

Open-task pictures show exactly what the criteria need: three nameable objects in the trolley, three on the meeting table, and one clear action per sequence panel (the flat tyre is "completely flat"). Each alt describes its picture in Dutch. Sequences keep one setting: Henk's house in all three panels; Gülsen's street, then the same bicycle shop in panels 2 and 3.

## 7. Sentence starters (`093-starters.json`)

One partial fragment per criterion, in order, each with "…". None supplies a picture fact or the content of a criterion:

- Video tasks: "Zaterdag kan ik …", "Ik kom hem om … halen.", "We gaan samen naar …"; "Dit weekend heb ik …", "Ik vond het …, want …", "Dat deed ik samen met …".
- Describe tasks: "Ik zie Sander in …" and "Ik zie Inge met …". These leave the place or the company open. "Op de tafel staan … en …" repeats only the prompt's own "op de tafel".
- Choose tasks: the usual "Ik kies plaatje …", a "want" frame and "Op het andere plaatje …".
- Sequence tasks: order words only.

## 8. Diversity against the catalogue

| New item | Nearest catalogue items | Why it is distinct |
| --- | --- | --- |
| buurman-hond | `buurvrouw` (move a visit), `batch009-nieuwe-buurvrouw` (how long you have lived here) | A neighbour asking a favour (time, place) appears in no A2 speaking item. The A1 dog items are picture descriptions or messages. |
| collega-weekend | `batch026-lunchpauze`, `batch009-ochtenddienst` | Monday small talk about the weekend is a narration in the past tense (perfect), which no current A2 video task asks for. B1 `kustweekend` is a written account. |
| bouwmarkt | `batch027-kassa` (two things in a basket), `batch009-kringloop` (two things to buy) | New setting (DIY store) and a new opinion topic (doing jobs yourself). The "two things he buys" operation is the same as kassa: see doubt 3. |
| vergadering | `batch009-schoonmaak` (an office), `batch009-verjaardag` (two things on a table) | No A2 speaking item shows a team meeting. B1 `werkoverleg` is a listening conversation. |
| cadeau-kiezen | `batch026-feest-thuis` (where to celebrate), A2 writing `batch008-cadeau` (an e-mail about a gift for the teacher) | A spoken choice between two gifts is new. |
| kantoor-thuiswerken | `batch009-alleen-samen` (alone or with colleagues), `batch009-klas-thuis` (class or home) | The choice is the place of work, not company or learning form. The pictures differ in setting (office or kitchen), not in the number of people around the desk. See doubt 4. |
| fiets-lek | `batch026-fiets-lopen`, `batch027-bus-fiets` (choices), A2 reading `p1` (fietsenmaker message) | No A2 speaking narration of a repair exists. |
| boodschappen-online | `batch026-online-winkel` (choice), A2 writing `batch008-boodschappen`, A1 `boodschappen-vrijdag` | Ordering, delivery and putting away as a sequence is new. The online/shop choice is a different task type. |

## 9. Doubts for the reviewer

1. **buurman-hond premise.** Is the sore knee the right reason? The plan gave no reason. The alternative, Henk away all day, needs a key, which the cue would have to explain. The humour is one line ("En Bobbie stopt bij elke boom!") and the model's callback. Please judge whether it stays light and clear when heard once.
2. **collega-weekend prompt.** "Zeg ook met wie u dat hebt gedaan." points with `dat` to the activity the cue asks about. Read before the cue, it is still understandable, and it does not print the cue's question.
3. **bouwmarkt shape.** The task repeats kassa's "Noem twee dingen die X koopt". The plan assigned this shape, and the setting and opinion are new. Please also check that the lamp next to paint and a bucket reads as ordinary DIY shopping.
4. **kantoor-thuiswerken overlap.** It is close in theme to `alleen-samen`. The office picture has two colleagues beside Ayoub, so a learner may argue "samen werken". That is a valid reason for the office, so it does not hurt the task, but it does reduce the distance between the two items.
5. **cadeau-kiezen pictures.** The giver is not named, because the learner is the giver. If the reviewer prefers a named giver (as with Fatima in `bus-fiets`), Gülsen's traits would have to be copied verbatim.
6. **Henk across items.** The still in buurman-hond and panel 1 of boodschappen-online show the same man and the same small brown dog. This continuity is deliberate. If a reviewer finds it distracting, the dog can be dropped from panel 1 without affecting any criterion.

## 10. Checker

```
$ npx tsx scripts/batch-check.ts content/batches/093-original.json
Checked 8 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

The checker also read `093-starters.json`: no starter word falls outside the A2 list. `npx prettier --check` passes for both JSON files.
