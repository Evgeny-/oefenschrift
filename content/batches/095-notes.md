# Batch 095: author notes (A2 Spreken, eight tasks)

Batch 095 is one of the three speaking batches of the A2 expansion of 5 November 2026 (`docs/briefs/a2-expansion-2026-11-05.md`, section "093, 094, 095"). It contains eight original A2 speaking tasks, two of each official type described in `content/blueprint.md` §4.3 and in the "Spreken A2" paragraph of `docs/research/exam-blueprints-2026-09-10.md`: two `video-answer`, two `picture-describe`, two `picture-choose` and two `picture-sequence`. The slugs, topics and domains are the plan's own. Every prompt, cue, criterion, sample, model, alt and brief was written for this batch. Official material was used for its structure only, through the instruction sentences that batch 009 fixed and batches 063 and 067 revised: "U hoort de vraag. Geef antwoord.", "Vertel wat u ziet. Noem twee dingen die … Vertel ook wat u van … vindt. Gebruik het plaatje.", "Kies een van de plaatjes. Vertel ook waarom. Zeg ook iets over het andere plaatje." and "Kijk naar de plaatjes. Vertel wat … doet. Vertel iets over alle plaatjes."

Every item is `status: "draft"` and `targetLevelValidated: false`, with `speakingSeconds: 40`, `prepSeconds: 10` and `rubric: "a2-spreken"`. The records leave out media and derived fields (`revision`, `promptAudio`, `cueAudio`, `images[].file`). The level labels are authoring targets. Nothing here claims official equivalence, an official score or a pass prediction.

## 1. Batch matrix

| # | id | taskType | Domain | People | Tone |
| --- | --- | --- | --- | --- | --- |
| 1 | `A2:speaking:batch095-reiziger-weg:1` | video-answer | vervoer | unnamed older traveller (cue `f-older`, `u`) | ordinary |
| 2 | `A2:speaking:batch095-baliemedewerker:1` | video-answer | instanties | unnamed desk employee (cue `m-young`, `u`) | ordinary |
| 3 | `A2:speaking:batch095-ouderavond:1` | picture-describe | opleiding | Sophie, an unnamed male teacher | ordinary |
| 4 | `A2:speaking:batch095-strand-familie:1` | picture-describe | vrije-tijd-familie | Chantal, her husband, their son | ordinary, warm |
| 5 | `A2:speaking:batch095-afspraak-bellen-online:1` | picture-choose | gezondheid | Vincent (drawn only; the learner is "u") | ordinary |
| 6 | `A2:speaking:batch095-tweedehands-nieuw:1` | picture-choose | winkels-diensten | Roel (drawn only; the learner is "u") | ordinary |
| 7 | `A2:speaking:batch095-verjaardag-voorbereiden:1` | picture-sequence | vrije-tijd-familie | Maaike, a baker, two friends | ordinary, warm |
| 8 | `A2:speaking:batch095-bibliotheek-lid:1` | picture-sequence | opleiding | Mustafa, his son, a librarian | ordinary |

Counts: 2 video-answer, 2 picture-describe, 2 picture-choose, 2 picture-sequence. Domains: vervoer 1, instanties 1, opleiding 2, vrije-tijd-familie 2, gezondheid 1, winkels-diensten 1. Names: each of the six names in the batch pool appears in exactly one item (Sophie, Chantal, Vincent, Roel, Maaike, Mustafa). The batch uses no voice name and none of the older recurring cast.

Tone: all eight are ordinary everyday tasks. Two have some warmth (a beach day, a birthday at home). No item is humorous. The plan allows at most one, and none was needed.

## 2. Per task: what the learner must do, the omitted criterion and its errors, how the model meets every criterion

The app hides the criteria until review, so each prompt (or, for video-answer, the cue together with the prompt) asks for every criterion in its own words. No title, situation line or starter states what the learner must supply. The printed prompts of the two video tasks do not repeat the cue's question.

### Video-answer

1. **reiziger-weg.** Prompt: "U bent op het station van uw stad. Een vrouw met een koffer stelt u een vraag. U hoort de vraag. Geef antwoord. Zeg ook hoe zij het gemeentehuis kan herkennen." The situation names who asks first. The cue is an older traveller, role `f-older` (Hanneke: "older neighbour, grandmother, older customer"), speaking 20 words in two sentences: "Pardon, ik ben hier niet bekend. Hoe loop ik van het station naar het gemeentehuis, en hoe lang duurt dat?" That is one question in two parts: the way and the time. The prompt adds the third detail, a landmark, which is what someone giving directions in real life adds. The plan's item names the traveller "een reiziger". In the prompt she is "een vrouw met een koffer", because the still shows a woman and "reizigster" is not on the list. The title keeps "reiziger" as a neutral word.
   - Criteria: the way on foot / how long the walk takes / how she can recognise the town hall.
   - Sample (27 words) omits criterion 2: it gives the way and the building but no time. Errors: "Na de brug u gaat naar rechts" (verb second after a fronted phrase) and "is groot wit gebouw" (missing article).
   - Model (43 words): "U gaat hier naar buiten en dan naar links. U loopt rechtdoor tot de brug. Na de brug gaat u naar rechts." (1); "Het is ongeveer tien minuten lopen." (2); "Het gemeentehuis is een groot wit gebouw aan een plein. U kunt het niet missen." (3).
2. **baliemedewerker.** Prompt: "U bent in het gemeentehuis. U staat bij de balie. Een medewerker stelt u een vraag. U hoort de vraag. Geef antwoord. Zeg ook wat u hebt meegenomen." The cue is a young male desk employee, role `m-young` (Ruben). He is cast as a man so that not every desk worker in the bank is a woman. He speaks 14 words: "Goedemorgen, welkom bij de gemeente. Waarvoor komt u vandaag, en hebt u een afspraak?" Neither the cue nor the prompt asks for a BSN, a date of birth or any other personal data. "Wat u hebt meegenomen" asks only which documents the learner brings, which a desk visit really involves. The learner picks the purpose (an id-kaart, a passport, a new address, a parking permit).
   - Criteria: what you come for / whether you have an appointment / what you have brought.
   - Sample (20 words) omits criterion 2: no word about an appointment. Errors: "Ik kom voor nieuwe id-kaart" (missing article) and "Ik heb meegenomen mijn oude kaart" (participle not at the end).
   - Model (40 words): "Ik kom voor een nieuwe id-kaart. Mijn oude kaart is volgende maand niet meer geldig." (1); "Ja, ik heb een afspraak om half tien." (2); "Ik heb mijn oude id-kaart en een nieuwe pasfoto meegenomen." (3); it ends with "Wanneer is de nieuwe kaart klaar?". The facts in the model are checked in section 7.

### Picture-describe

3. **ouderavond.** Prompt: "Sophie heeft een zoon van zeven. Vanavond is er ouderavond op zijn school. Vertel wat u ziet. Noem twee dingen die u op de tafel ziet. Vertel ook wat u van een ouderavond vindt. Gebruik het plaatje." The situation names the occasion but not what the picture shows (who sits with Sophie, what they look at, what lies on the table). The count "twee" of criterion 2 is in the prompt. The opinion question is about something concrete that parents attend, not an abstract noun. The teacher is a man ("de leraar"), against the stereotype in §9.
   - Criteria: what you see / at least two things on the table / your opinion of a parents' evening.
   - Sample (27 words) omits criterion 2: it names only the drawings, one thing. Errors: "Ze kijken de tekeningen" (missing "naar") and "Ik vind ouderavond goed" (missing article).
   - Model (41 words): "Ik zie Sophie en de leraar in de klas. Ze zitten aan een kleine tafel." (1); "Op de tafel liggen tekeningen en een schrift. Er staan ook twee kopjes koffie." (2); "Ik vind een ouderavond belangrijk. Dan hoor ik veel over mijn kind." (3).
4. **strand-familie.** Prompt: "Het is een warme zaterdag. Chantal en haar gezin hebben een vrije dag. Vertel wat u ziet. Noem twee dingen die het gezin doet. Vertel ook wat u van een dag aan het strand vindt. Gebruik het plaatje." The situation does not state the place or the actions. The word "strand" appears only in the opinion question, as in the official example ("Vertel ook wat u van dit eten vindt"). The picture shows exactly two activities (reading on a towel; father and son playing ball by the water).
   - Criteria: what you see / at least two things the family does / your opinion of a day at the beach.
   - Sample (27 words) omits criterion 3, the opinion. Errors: "De vader en de zoon speelt" (agreement) and "haar familie" for "haar gezin" (word choice).
   - Model (42 words): "Ik zie Chantal en haar gezin op het strand." (1); "Chantal zit op een handdoek en leest een boek. Haar man en haar zoon spelen met een bal bij het water." (2); "Een dag aan het strand vind ik heerlijk, want ik zwem graag." (3).

### Picture-choose

5. **afspraak-bellen-online.** Prompt: "U wilt een afspraak maken bij de huisarts. Belt u liever, of maakt u de afspraak liever online? Kies een van de plaatjes. Vertel ook waarom. Zeg ook iets over het andere plaatje." The two pictures show the same man at the same kitchen table with the same cup of tea, holding a phone in one and working on a laptop with a blank screen in the other.
   - Criteria: which picture (phone or online) / a reason / something about the other picture.
   - Sample (22 words) omits criterion 2: it chooses and describes the other picture but gives no reason. Error: "Op plaatje twee de man zit" (verb second). "aan de tafel" for "aan tafel" is a smaller slip. The sample says "de man", because the learner is never told the drawn man's name.
   - Model (42 words): "Ik kies het eerste plaatje. Ik bel liever naar de huisarts." (1); "Dan kan ik mijn vraag meteen stellen. De assistente zoekt een goede tijd." (2); "Online een afspraak maken, op het tweede plaatje, is ook handig. Maar de website vind ik soms moeilijk." (3).
6. **tweedehands-nieuw.** Prompt: "U zoekt een fiets voor elke dag. Koopt u liever een tweedehands fiets of een nieuwe fiets? Kies een van de plaatjes. Vertel ook waarom. Zeg ook iets over het andere plaatje." Both pictures show the same man in the same pose in the same bicycle shop, next to the same dark blue city bike. Only its condition changes: used (faded paint, rust spots, a worn saddle) or new and shiny. Many Dutch bicycle shops sell both, so one setting is realistic.
   - Criteria: which picture (second-hand or new) / a reason / something about the other picture.
   - Sample (28 words) omits criterion 3. Its reason ("niet duur", "niet veel geld") never compares with the new bike, so the omission is unambiguous. Error: "naar de station" (wrong article).
   - Model (40 words): "Ik kies het eerste plaatje, de tweedehands fiets." (1); "Die is veel goedkoper. Ik fiets elke dag naar het station. Daar staat hij de hele dag buiten." (2); "De nieuwe fiets op het tweede plaatje is mooi. Maar die kost veel geld." (3). Bicycle theft was left out of the reasoning on purpose (§9 avoids crime).

### Picture-sequence

7. **verjaardag-voorbereiden.** Prompt: "Maaike is zaterdag jarig. Kijk naar de plaatjes. Vertel wat Maaike doet. Vertel iets over alle plaatjes." The situation gives the occasion only. It does not mention the bakery, the balloons or the guests. An adult who organises her own birthday at home, buys the cake and lets friends in is a normal Dutch verjaardag.
   - Criteria: what Maaike does in picture 1 / picture 2 / picture 3.
   - Sample (23 words) omits picture 2 (the balloons). Error: "Ze koop" (verb ending). The comma splice in "Dan komen haar vrienden, ze doet de deur open" is acceptable in speech.
   - Model (42 words): "Op het eerste plaatje is Maaike bij de bakker. Ze koopt een taart met aardbeien." (1); "Op het tweede plaatje hangt ze thuis ballonnen boven de tafel." (2); "Op het derde plaatje doet ze de deur open. Haar vrienden brengen bloemen en een cadeau." (3).
8. **bibliotheek-lid.** Prompt: "Het is zaterdag. Mustafa gaat met zijn zoon naar de bibliotheek. Kijk naar de plaatjes. Vertel wat Mustafa en zijn zoon doen. Vertel iets over alle plaatjes." The situation gives the destination, as batch 027's "Hij gaat naar de tandarts" did. It does not give the actions: the son becoming a member and getting a card, choosing books, reading at home. Children's library membership is a normal desk transaction.
   - Criteria: what Mustafa and his son do in picture 1 / picture 2 / picture 3.
   - Sample (24 words) omits picture 3 (reading at home). Errors: "Ze wordt lid" (agreement) and "Daarna ze kiezen" (verb second).
   - Model (43 words): "Op het eerste plaatje staan Mustafa en zijn zoon bij de balie. De jongen wordt lid en krijgt een pasje." (1); "Op het tweede plaatje kiezen ze samen boeken." (2); "Op het derde plaatje zitten ze thuis op de bank. Ze lezen samen een boek." (3).

Omitted criteria across the batch: criterion 2 in five items (reiziger-weg, baliemedewerker, ouderavond, afspraak-bellen-online, verjaardag-voorbereiden), criterion 3 in three (strand-familie, tweedehands-nieuw, bibliotheek-lid). No sample omits criterion 1, which a speaker rarely skips in these types. No sample or model copies a whole prompt sentence.

## 3. Language-control figures

Computed per field (words; sentences; average and longest sentence in words). Every prompt, cue, sample and model stays under the A2 limits (average under 12, none over 18). No model sentence is over 16 words, and every model is between 40 and 43 words, inside 25–45.

| Task | Prompt | Cue | Sample | Model |
| --- | --- | --- | --- | --- |
| reiziger-weg | 31 w, 5 s, avg 6.2, max 9 | 20 w, 2 s, avg 10.0, max 14 | 27 w, 3 s, max 11 | 43 w, 6 s, avg 7.2, max 10 |
| baliemedewerker | 28 w, 6 s, avg 4.7, max 6 | 14 w, 2 s, avg 7.0, max 9 | 20 w, 3 s, max 10 | 40 w, 6 s, avg 6.7, max 10 |
| ouderavond | 37 w, 6 s, avg 6.2, max 9 | — | 27 w, 3 s, max 12 | 41 w, 6 s, avg 6.8, max 9 |
| strand-familie | 38 w, 6 s, avg 6.3, max 11 | — | 27 w, 3 s, max 12 | 42 w, 4 s, avg 10.5, max 12 |
| afspraak-bellen-online | 33 w, 5 s, avg 6.6, max 10 | — | 22 w, 3 s, max 12 | 42 w, 6 s, avg 7.0, max 11 |
| tweedehands-nieuw | 32 w, 5 s, avg 6.4, max 10 | — | 28 w, 3 s, max 10 | 40 w, 6 s, avg 6.7, max 9 |
| verjaardag-voorbereiden | 17 w, 4 s, avg 4.3, max 5 | — | 23 w, 3 s, max 13 | 42 w, 5 s, avg 8.4, max 11 |
| bibliotheek-lid | 27 w, 5 s, avg 5.4, max 8 | — | 24 w, 3 s, max 9 | 43 w, 5 s, avg 8.6, max 12 |

Subordinate clauses: the models contain none. They use only main clauses joined with `en`, `maar`, `want` and `dan`, so each meets the "at most one subordinate clause per sentence" rule. The prompts contain only the fixed instruction clauses of the official pattern ("Vertel wat u ziet", "Noem twee dingen die …", "Zeg ook hoe zij … kan herkennen", "Zeg ook wat u hebt meegenomen"). Tenses are present and one perfect ("hebt meegenomen").

**Word gate.** `scripts/a2-vocabulary.ts` reports no unlisted word and no compound in any checked field: titles, prompts, cues, criteria, models, alts and starters. The words that are least basic are all on the list and explained by the picture or the situation: `herkennen`, `gemeentehuis`, `balie`, `id-kaart`, `pasfoto`, `geldig`, `meegenomen`, `ouderavond`, `klaslokaal`, `schrift`, `handdoek`, `mand`, `heerlijk`, `praktijk`, `assistente`, `website`, `tweedehands`, `fietsenwinkel`, `gebruikte`, `aardbeien`, `ballonnen`, `lid`, `pasje`. The samples are learner speech with deliberate errors and fall outside the gate. Even so, they use only common words ("klok" and "familie" are on the A1 list).

## 4. Image briefs and recurring traits

There are 16 pictures: two stills (`size: "still"`), two single describe pictures (no size, so the speaking default `single` applies), four pair pictures (`size: "pair"`) and six sequence panels (`size: "sequence"`). Each brief is plain, positive English of at most about 60 words: people (age, hair, one clothing colour), what they do, where, and the two or three objects that matter. Each ends with "No text." No brief lists things to leave out. Screens and cards are "blank" and books have "plain covers". The open-task pictures show exactly what the criteria need: three objects on the ouderavond table, two family activities on the beach, the one difference in each pair, and one action per panel. Every alt is Dutch and describes the picture so that the feedback judge can check what the learner names.

Traits copied verbatim in every brief where the person appears:

| Person | Item | Traits (verbatim) | Panels |
| --- | --- | --- | --- |
| traveller | reiziger-weg | "a woman of about 70 with short grey curly hair and a purple coat" | still |
| desk employee | baliemedewerker | "a young man with short brown hair and a light blue shirt" | still |
| Sophie | ouderavond | "woman in her thirties, short red hair, yellow jumper" | 1 |
| teacher | ouderavond | "a man of about 50 with a grey beard and a dark blue shirt" | 1 |
| Chantal | strand-familie | "woman in her forties, short black curly hair, red summer dress" | 1 |
| Vincent | afspraak-bellen-online | "man in his fifties, short grey hair, dark green jumper" | both pair pictures |
| Roel | tweedehands-nieuw | "young man, short blond hair, black jacket" | both pair pictures |
| Maaike | verjaardag-voorbereiden | "woman in her thirties, long blond hair in a ponytail, orange jumper" | all three panels |
| Mustafa | bibliotheek-lid | "man in his forties, bald head and a black beard, dark red jumper" | all three panels |
| Mustafa's son | bibliotheek-lid | "boy of about seven, curly black hair, yellow T-shirt" | all three panels |

Pairs: each pair repeats the person, the setting, the table or bike and the pose. Only the chosen thing changes (phone or laptop; a used or a new bike of the same model and colour).

Sequence settings:
- verjaardag-voorbereiden: a bakery, then the living room, then the front door of the same home.
- bibliotheek-lid: the library desk, then the children's shelf "of the same library", then the sofa at home.

The plan's own panel descriptions move between places, so the "same setting" rule applies where it makes sense. The repeated objects, the cake with strawberries and the picture book with a plain cover, link the panels.

## 5. Sentence starters (`content/batches/095-starters.json`)

There is one partial sentence per criterion, in order, each with "…". None names an answer the picture or the learner must supply:
- Video starters frame the speech act only: "U gaat hier eerst naar …", "Lopen duurt ongeveer …", "Het gemeentehuis is een …"; and "Ik kom voor …", "Een afspraak heb ik …", "Ik heb … meegenomen.".
- Describe starters name the people the prompt already names and leave the scene, objects and actions open: "Op de tafel zie ik … en …", "Chantal … en haar man …".
- Choose starters keep the choice open ("Ik kies plaatje …", "Ik koop liever een … fiets.").
- Sequence starters keep only the order words, as batch 067 settled.

All starter words pass the A2 gate.

## 6. Organisations, names and facts

- **Invented organisations.** None. The batch names no shop, school, library, bakery, street or website, so there was nothing to check on the web for real firms.
- **Public bodies.** The only one is "de gemeente", in the item about a gemeente desk (allowed by §8 and the plan).
- **Names.** All six come from the batch pool and are on the A2 name list.

## 7. Facts in the models

- **baliemedewerker.** The model says that you apply for an id-kaart at the gemeente desk with an appointment and bring your old card and a pasfoto, and that the card is ready later.
  - Rijksoverheid ("Waar en hoe kan ik een paspoort of identiteitskaart aanvragen?") says you apply in person at the gemeente where you are registered, at an appointment, and bring a colour pasfoto. https://www.rijksoverheid.nl/onderwerpen/paspoort-en-identiteitskaart/vraag-en-antwoord/waar-en-hoe-kan-ik-een-paspoort-of-identiteitskaart-aanvragen
  - Gemeente Den Haag says an expired card must be handed in. https://www.denhaag.nl/nl/paspoort-en-identiteitskaart/nederlandse-identiteitskaart-aanvragen.htm
  - Municipal pages give a usual wait of about five working days, so "Wanneer is de nieuwe kaart klaar?" is a natural question.
  - Accessed 5 November 2026.
- **bibliotheek-lid.** Children's library membership is a normal desk transaction, and the model makes no claim about its price.
- No other model states a time-sensitive fact.

## 8. Diversity against the catalogue

| Item | Nearest existing items | Why this is new |
| --- | --- | --- |
| reiziger-weg | A2 speaking `batch009-bushalte` (an older man asks which bus goes to the hospital and how often); listening `batch002-trein` (station announcement) | Walking directions with a landmark and a duration, given at a station. No A2 speaking task asks for a route on foot. |
| baliemedewerker | A2 speaking `batch009-gemeente-bellen` (choose phone or visit), `batch009-paspoort` (sequence: photo, papers at a desk, collect a passport), `batch026-huisarts-afspraak` (huisarts assistant asks morning or afternoon and why); KNM `batch032-gemeente-afspraak` | The first video-answer in instanties (the domain has three A2 speaking items, none a video). The learner speaks to the desk and chooses the purpose. The model's id-kaart is one possible answer (see doubt 2). |
| ouderavond | B1 reading `batch003-ouderavond` (news about a new format of parents' evening; other part and level, hence the checker's slug warning); A2 speaking `batch009-gymles`, `batch026-schoolplein` (children at school) | The first A2 speaking task about a parent–teacher talk. The plan assigns the slug, which is new in A2 speaking. |
| strand-familie | A2 speaking `batch009-vakantie` (sequence: packing, car, tent by a lake) | No A2 speaking picture of a beach day. The parallel batch 094 has `vakantie-strand-stad` (choose beach or city), a different type and question. |
| afspraak-bellen-online | `batch026-huisarts-afspraak` (video at the huisarts), `batch009-gemeente-bellen` (phone or visit, instanties), `batch026-online-winkel` (online or shop, clothes) | The first choice about how to book a health appointment. The pair (phone or online) and the domain differ from both earlier choices. |
| tweedehands-nieuw | A2 speaking `batch009-kringloop` (describe a second-hand shop, opinion on second-hand goods); reading `batch020-tweedehandsfiets` (advert) | A choice task about one purchase in a bicycle shop, not a description of a charity shop (see doubt 3). |
| verjaardag-voorbereiden | A2 speaking `batch009-verjaardag` (describe a child's party table), `batch026-feest-thuis` (choose home or restaurant); listening `batch023-verjaardagstaart` (ordering a cake by phone) | A narrated sequence of an adult preparing her own birthday. Earlier items describe or choose. |
| bibliotheek-lid | A2 speaking `batch026-bibliotheekboek` (sequence: late book found, returned at the desk, new book taken); writing `bibliotheekpas` (form) | A child's membership, choosing books together, reading at home. The desk panel recurs, but the action and the home panel are new (see doubt 4). |

## 9. Doubts for the reviewer

1. **reiziger-weg: "vrouw" versus "reiziger".** The plan's premise is "a traveller". The prompt says "Een vrouw met een koffer" so that it matches the still. The cue speaker label and the title say "reiziger". If the reviewer prefers "Een reiziger stelt u een vraag", the still and the criteria ("de vrouw", "zij") need the same change.
2. **baliemedewerker: id-kaart overlap.** The model's id-kaart is close in subject to `batch009-paspoort` (a sequence). The task itself lets the learner choose any purpose. The model could instead use a parking permit ("een parkeervergunning", on the list). I avoided a new address, because the parallel listening batch 090 has `adres-wijzigen` at the same desk.
3. **tweedehands-nieuw and kringloop.** Second-hand goods are already the opinion topic of `batch009-kringloop`. The type (choice against description) and the object differ, and the plan assigned this premise.
4. **bibliotheek-lid: desk panel.** Panel 1 repeats the library desk of `batch026-bibliotheekboek`. The panels show different actions, and the son is in every panel.
5. **Picture realism.** Two things should be checked on the contact sheet:
   - In tweedehands-nieuw, the model must draw the difference between used and new on the same bike model clearly. The brief describes it with faded paint, rust spots and a worn saddle.
   - In ouderavond, the drawings must read as a child's drawings.
6. **Pair names.** Vincent and Roel are named only in the briefs, so that the traits stay consistent; the learner is "u". The afspraak sample therefore says "de man".
7. **Sequence settings.** Both sequences use two places, the home being the second. This follows the plan's own panel descriptions. The repeated object (cake, picture book) links the panels.

## 10. Requested words

None. Every scene works with listed words.

## 11. Checker

`npx tsx scripts/batch-check.ts content/batches/095-original.json` (also checks `095-starters.json`):

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
  warn  A2:speaking:batch095-ouderavond:1: slug "ouderavond" already used in the catalogue; make sure the topic differs
1 warning(s), no failures.
```

The warning refers to `B1:reading:batch003-ouderavond:1`, a B1 reading news item in another part and level. The plan assigns `ouderavond` as a slug that is new in A2 speaking, and the topic differs (section 8). The word gate reported no unlisted words and no compounds, so there is no compound to judge.
