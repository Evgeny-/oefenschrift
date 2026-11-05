# Batch 094 — A2 speaking, eight new tasks (5 November 2026)

Author notes for batch 094 of the A2 expansion round (`docs/briefs/a2-expansion-2026-11-05.md`, section "093, 094, 095"). It has two tasks of each official A2 Spreken type: video-answer, picture-describe, picture-choose and picture-sequence. The tasks follow `content/blueprint.md` §4.3 and the "Spreken A2" paragraph of `docs/research/exam-blueprints-2026-09-10.md`. The record shape is copied from the current catalogue records `A2:speaking:batch027-cursuskeuze:1`, `-kassa:1`, `-bus-fiets:1` and `-tandartsbezoek:1`. Their vocabulary is not reused. Media and derived fields (`revision`, `promptAudio`, `cueAudio`, `images[].file`) are left out.

All situations, cues, criteria, samples, models and briefs are original. The official instruction patterns are used for structure only: "… stelt u een vraag. U hoort de vraag. Geef antwoord.", "Vertel wat u ziet. Noem twee dingen die … Vertel ook wat u van … vindt. Gebruik het plaatje.", "… liever …? Vertel ook waarom. Kies een van de plaatjes. Zeg ook iets over het andere plaatje." and "Kijk naar de plaatjes. Vertel wat … doet. Vertel iets over alle plaatjes.". Level labels are authoring targets (`targetLevelValidated: false`). AI editorial review does not validate CEFR difficulty or official exam equivalence.

## Conventions

- **Fields.** Every item has `exam: duo-a2`, `status: draft`, `rubric: a2-spreken`, `speakingSeconds: 40` and `prepSeconds: 10`, plus three criteria as `[nl, en]` pairs. Each sample misses exactly one criterion: one `null` quote, and the other quotes are verbatim substrings. Image `kind` is `drawing`. `size` is `still` for the two video stills, `pair` for the four choice pictures and `sequence` for the six panels. The two single pictures take the default size.
- **Criteria mirror the type (§4.3).** Video-answer: part one of the cue, part two, and the extra detail the prompt asks for. Describe: the scene, at least two of the things asked for, the opinion. Choose: the choice, a reason, something about the other picture. Sequence: one criterion per picture, in order.
- **Hidden criteria (prompt audit of 19 October 2026).** Each prompt asks for every criterion in its own words:
  - Describe prompts say "Vertel wat u ziet." before "Noem twee dingen die …", and "twee" is in the prompt.
  - Both choose prompts end with "Zeg ook iets over het andere plaatje."
  - Video prompts never print the cue's question. They only add the extra detail ("Vraag ook wat de reparatie kost.", "Zeg ook met wie u op vakantie gaat.").
  - No title, situation or starter states what the picture or the learner must supply. The sequence titles are neutral ("De eerste werkdag van Faisal", "Eline doet de was"), and "Eline doet thuis de was" does not reveal the leak.
- **Address.** Every instruction addresses the learner with `u`. Both cue speakers say `u` to an adult customer or course participant.
- **Names.** Faisal, Saida, Dennis and Eline from the batch pool each appear in one item. Laura and Gerrit are not needed. The cue speakers and the people in the pair pictures are unnamed roles. In the pairs the learner chooses for themselves, so the person stands in for "u". No voice name and no older recurring cast member is used.
- **No organisations.** No invented shop, firm, school or institution name appears anywhere: "de fietsenmaker", "de taalles", "de fysiotherapeut", "een bedrijf", "een restaurant", "een monteur". The web check of §13 therefore had nothing to check. No brand names, no addresses, no personal data asked.
- **Pictures** follow the plan's rule: short positive briefs (38–61 words), the people with age, hair and one clothing colour, the action, the place and the two or three objects that matter, ending "No text.". Cards are "blank" and the watch is "plain". Each open-task picture shows exactly what its criteria need. The alts describe the picture in Dutch and name the pictured objects and actions. They may do so because these are open tasks, and the feedback judge reads the alt.

## Batch matrix

| # | id | taskType | domain | People / cue role | Tone | Null quote |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `A2:speaking:batch094-fietsenmaker-vraag:1` | video-answer | winkels-diensten | the bicycle repairer, `m-shop` (Jerry, "repair service") | ordinary | 1 |
| 2 | `A2:speaking:batch094-docent-vakantie:1` | video-answer | opleiding | the language teacher, `f-adult` (Lieke, "teacher") | ordinary | 0 |
| 3 | `A2:speaking:batch094-fysiotherapie:1` | picture-describe | gezondheid | Saida + male physiotherapist | ordinary | 1 |
| 4 | `A2:speaking:batch094-fietsenstalling:1` | picture-describe | vervoer | Dennis | ordinary (a familiar small annoyance, no joke) | 2 |
| 5 | `A2:speaking:batch094-vakantie-strand-stad:1` | picture-choose | vrije-tijd-familie | unnamed man, same in both pictures | ordinary | 1 |
| 6 | `A2:speaking:batch094-koken-afhalen:1` | picture-choose | winkels-diensten | unnamed woman, same in both pictures | ordinary | 2 |
| 7 | `A2:speaking:batch094-eerste-werkdag:1` | picture-sequence | werk | Faisal + receptionist + two colleagues | ordinary, warm | 0 |
| 8 | `A2:speaking:batch094-wasmachine-kapot:1` | picture-sequence | wonen-buurt | Eline + repairman | ordinary | 2 |

Null positions 0/1/2 occur 2/3/3 times. Tone: all eight are ordinary. The batch allows one lightly humorous item at most, and none is needed. Gender spread: two male and two female main characters; the cue speakers are one man and one woman; the physiotherapist is a man and the receptionist a woman. Neither role is assigned by stereotype across the batch, and the repairer, the repairman and the cook are drawn as in everyday life.

## Diversity against the catalogue and the sibling batches

| Item | Nearest existing items | Why it is new |
| --- | --- | --- |
| fietsenmaker-vraag | speaking `batch003-monteur` (video: waiting for a late repairman), `batch009-abonnement` (video: phone plan); reading fietsenmaker texts; sibling 093 `fiets-lek` (sequence: flat tyre, walk to the shop, ride away) | The learner explains a fault to a repairer and asks for a date and a price. The model and sample avoid the flat tyre of 093 (brakes and light; bell and rear light). |
| docent-vakantie | speaking `batch009-vakantie` (sequence: Karim travels), `batch009-thuis-oefenen`, `batch027-taalcafe-oefenen`, `batch027-cursuskeuze` (course talk) | End-of-course small talk about holiday plans. The model visits family in a village (no beach) so that it does not overlap with item 5 or with 095 `strand-familie`. |
| fysiotherapie | listening 089 `fysio-verzet` and 090 `fysio-oefeningen` (receptive); speaking `batch009-sportschool-park` (choose) | The first spoken description of a physiotherapy session. The opinion asks about daily exercise, not about the physiotherapist. |
| fietsenstalling | speaking `batch026-regen` (bus stop), `batch026-fiets-lopen`, `batch027-bus-fiets` (choose) | A full station bicycle parking with a commuter in a hurry; the opinion is about cycling to the station. |
| vakantie-strand-stad | speaking `batch009-vakantie` (sequence), `batch009-flat-dorp` (choose where to live); 095 `strand-familie` (describe) | A choice between two holiday types, with the same man in both pictures. |
| koken-afhalen | speaking `batch026-feest-thuis` (celebrate at home or in a restaurant), `batch026-koken-buurvrouw` (sequence), `batch027-keuken` (describe) | An ordinary weekday dinner after work, not a celebration. The choice is cooking versus picking up food. |
| eerste-werkdag | speaking `batch027-ziekmelden` (video: new colleague), `batch027-sollicitatiegesprek` (sequence: the interview); listening 089 `printer-uitleg` (staff pass at the printer) | Narrates the first morning: reception, pass, meeting the colleagues. |
| wasmachine-kapot | speaking `batch003-monteur` (video), `batch001-koelkast` (choose a new fridge); reading 088 `water-onderbreking` | Narrates a household fault from discovery to repair. |

All eight slugs are new in A2 speaking. The checker reports no catalogue slug clash.

## Per item

### 1. fietsenmaker-vraag (video-answer, winkels-diensten)

- **Prompt.** "Uw fiets is kapot. U brengt de fiets naar de fietsenmaker. Hij stelt u een vraag. U hoort de vraag. Geef antwoord. Vraag ook wat de reparatie kost." The situation names the speaker first. "Kapot" does not say what is broken; the learner invents the fault.
- **Cue.** `m-shop`, "de fietsenmaker", 21 words: "Goedemorgen. Zet uw fiets hier maar neer. Wat is er kapot aan de fiets, en wanneer hebt u hem weer nodig?" One question with two parts.
- **Still.** The repairer (man of about 50, short dark curly hair, dark green work apron) beside a bicycle on a repair stand, with a closed notebook. The bicycle shows no fault, so the learner may name any.
- **Criteria.** What is broken; when the bicycle is needed again; ask the price. Asking the price is a realistic third move that fills the 40 seconds and is a different speech act from the two answers.
- **Sample** (20 words). Misses criterion 2 (no day or time). Errors: "de achterlicht" (gender: *het achterlicht*) and "Vandaag ik ben lopend gekomen" (verb-second after a fronted adverb).
- **Model** (40 words, 7 sentences, longest 10 words). Criterion 1: "De remmen werken niet goed. En het licht aan de voorkant doet het niet meer." Criterion 2: "Ik heb de fiets morgen weer nodig. Dan fiets ik om half acht naar mijn werk. Kan dat?" Criterion 3: "En wat kost de reparatie ongeveer?"
- **Starters.** "Mijn … is kapot." / "Ik heb de fiets … weer nodig." / "En hoeveel …?". None supplies the fault, the time or the price.

### 2. docent-vakantie (video-answer, opleiding)

- **Prompt.** "Het is bijna zomervakantie. U praat na de taalles met uw docent. Zij stelt u een vraag. U hoort de vraag. Geef antwoord. Zeg ook met wie u op vakantie gaat."
- **Cue.** `f-adult`, "de docent", 22 words: "Zo, dat was de laatste les voor de zomer. Waar gaat u in de vakantie naartoe, en wat gaat u daar doen?" A real teacher's small talk at the end of the last lesson. The destination is not identifying personal data, and the learner may invent it.
- **Still.** The teacher (woman of about 45, short red hair, glasses, dark blue cardigan) by a blank whiteboard with a closed book.
- **Criteria.** Where; what you will do there; with whom.
- **Sample** (24 words). Misses criterion 1 (no destination). Errors: "In de vakantie ik ga" (verb-second) and "een leuk vakantie" (adjective without -e before a de-word).
- **Model** (43 words, 6 sentences, longest 8 words). Criterion 1: "naar Polen … in een klein dorp". Criterion 2: "We gaan veel wandelen", "mijn moeder kookt elke dag voor ons", "Ik neem ook een Nederlands boek mee!". Criterion 3: "met mijn man en onze zoon". Visiting family abroad is the most common real holiday for course participants. "Polen" is only an example.
- **Starters.** "In de vakantie ga ik naar …" / "Daar ga ik …" / "Ik ga samen met …".

### 3. fysiotherapie (picture-describe, gezondheid)

- **Prompt.** "Saida heeft pijn in haar schouder. Ze is bij de fysiotherapeut. Vertel wat u ziet. Noem twee dingen die Saida bij de oefening gebruikt. Vertel ook wat u van elke dag bewegen vindt. Gebruik het plaatje." The situation sets the place, as the kassa exemplar does; it does not name the ball or the weight.
- **Picture.** Saida (woman of about 40, black curly hair in a ponytail, orange sports top) sits on a large blue exercise ball with a small weight in one hand. The physiotherapist (man of about 30, short blond hair, white polo shirt) holds her elbow. Exactly two things are used: the ball and the weight. Shoulder pain and a light arm exercise are mild and non-graphic.
- **Criteria.** The scene; at least two things Saida uses; an opinion on exercising every day.
- **Sample** (30 words). Misses criterion 2: only the ball is named. Errors: "een groot bal" (adjective inflection, *een grote bal*) and "de man kijken" (verb agreement).
- **Model** (44 words, 7 sentences, longest 8 words). Criterion 1: "Ik zie Saida bij de fysiotherapeut … De fysiotherapeut helpt haar met de oefening." Criterion 2: "een grote blauwe bal", "een klein gewicht". Criterion 3: "Ik vind elke dag bewegen belangrijk. Ik wandel elke avond een halfuur. Dan slaap ik beter."
- **Starters.** "Op het plaatje zie ik …" / "Saida gebruikt … en …" / "Elke dag bewegen vind ik …, want …".

### 4. fietsenstalling (picture-describe, vervoer)

- **Prompt.** "Dennis gaat met de trein naar zijn werk. Vertel wat u ziet. Noem twee dingen die Dennis doet. Vertel ook wat u van fietsen naar het station vindt. Gebruik het plaatje." The prompt neither says that the parking is full nor that he is looking for a place.
- **Picture.** A covered station bicycle parking with every place full. Dennis (man of about 35, short brown hair and glasses, dark blue raincoat) walks beside his bicycle and looks at the plain watch on his wrist, with a train at a platform behind. Two visible actions (walking with the bicycle, looking at the watch) and one obvious inference (looking for a place).
- **Criteria.** The scene; at least two things Dennis does; an opinion on cycling to the station.
- **Sample** (26 words). Misses criterion 3 (no opinion). Errors: "bij de station" (gender) and "Misschien hij is te laat" (verb-second).
- **Model** (43 words, 6 sentences, longest 11 words). Criterion 1: "Ik zie een fietsenstalling bij het station. Er staan veel fietsen." Criterion 2: "loopt met zijn fiets en zoekt een plek", "kijkt ook op zijn horloge". Criterion 3: "Ik vind fietsen naar het station fijn, want het is gezond. Maar soms is er geen plek."
- **Starters.** "Op het plaatje zie ik …" / "Dennis … en hij …" / "Fietsen naar het station vind ik …, want …". The second starter gives no action.

### 5. vakantie-strand-stad (picture-choose, vrije-tijd-familie)

- **Prompt.** "U gaat deze zomer een week op vakantie. Gaat u liever naar het strand of naar een stad? Vertel ook waarom. Kies een van de plaatjes. Zeg ook iets over het andere plaatje."
- **Pair.** The same man (about 40, short dark hair, light green T-shirt, small grey backpack) sits on a towel on a sunny beach, or walks through a sunny old city street. Same person, same weather, same bag; only the place differs.
- **Criteria.** The choice; a reason; something about the other picture.
- **Sample** (28 words). Misses criterion 2: it chooses the beach and says when and with whom, but gives no reason. Errors: "Op het tweede plaatje de man loopt" (verb-second) and "veel oude huis" (plural).
- **Model** (42 words, 5 sentences, longest 11 words). Criterion 1: "Ik kies het eerste plaatje, het strand." Criterion 2: "Ik werk veel en ik wil rust. Op het strand kan ik lezen en zwemmen." Criterion 3: "Een stad, op het tweede plaatje, is ook mooi. Maar dan loop ik de hele dag en ben ik moe." The sample chooses the other option; both are equally acceptable.
- **Starters.** "Ik kies het plaatje met …" / "Dat vind ik leuker, want …" / "Op het andere plaatje …".

### 6. koken-afhalen (picture-choose, winkels-diensten)

- **Prompt.** "U komt na een lange werkdag thuis en u hebt honger. Kookt u liever zelf, of haalt u eten bij een restaurant? Vertel ook waarom. Kies een van de plaatjes. Zeg ook iets over het andere plaatje." The phrase is "eten halen" rather than "afhalen", because the plain verb is easier to say back.
- **Pair.** The same woman (about 45, short black hair, glasses, mustard yellow cardigan) in the evening, either cutting vegetables in her kitchen with a pan on the stove, or receiving a paper bag with two closed food boxes from a cook at a restaurant counter.
- **Criteria.** The choice; a reason; something about the other picture.
- **Sample** (27 words). Misses criterion 3: it chooses the restaurant with a reason, and the last sentence is about the chosen option. Errors: "zin om koken" (missing *te*) and "ben ik ook rijst met kip gehaald" (wrong perfect auxiliary).
- **Model** (44 words, 6 sentences, longest 10 words). Criterion 1: "Ik kies het eerste plaatje. Ik kook liever zelf". Criterion 2: "want dat is goedkoper en gezonder. Ik maak iets snels, zoals pasta met groente." Criterion 3: "Eten halen, op het tweede plaatje, is makkelijk. Dat doe ik soms op vrijdag. Maar elke dag is het te duur."
- **Starters.** "Ik kies het … plaatje." / "Dat doe ik liever, want …" / "Op het andere plaatje …".

### 7. eerste-werkdag (picture-sequence, werk)

- **Prompt.** "Faisal heeft een nieuwe baan bij een bedrijf. Vandaag is zijn eerste werkdag. Kijk naar de plaatjes. Vertel wat Faisal doet. Vertel iets over alle plaatjes."
- **Panels.** All three show Faisal with the same traits in the same office building:
  1. At the reception desk in the entrance hall, he talks to the receptionist (woman of about 50, short grey hair, purple blouse).
  2. At the same desk, the same receptionist gives him a small blank card on a cord.
  3. In an open office of the same building, he shakes hands with a young woman (long red hair, yellow jumper) at a desk with a closed laptop. An older bald man in a dark green jumper stands next to her.
- **Criteria.** One per panel.
- **Sample** (21 words). Misses panel 1: it starts with the pass and never mentions arriving or talking at reception. Errors: "Faisal krijg" (verb agreement) and "Daarna hij gaat" (verb-second).
- **Model** (42 words, 5 sentences, longest 11 words). Panel 1: "komt Faisal bij de receptie. Hij zegt zijn naam tegen de mevrouw." Panel 2: "krijgt hij een pasje voor het gebouw." Panel 3: "is hij op kantoor. Hij geeft zijn nieuwe collega's een hand."
- **Starters.** "Op het eerste plaatje …" / "Op het tweede plaatje …" / "Op het derde plaatje …" (order words only).

### 8. wasmachine-kapot (picture-sequence, wonen-buurt)

- **Prompt.** "Eline doet thuis de was. Kijk naar de plaatjes. Vertel wat er gebeurt. Vertel iets over alle plaatjes." The prompt says "Vertel wat er gebeurt" rather than "Vertel wat Eline doet", because the repairman acts in panel 3. The criteria say "gebeurt" accordingly.
- **Panels.** All three are in the same small bathroom, and Eline has the same traits in each:
  1. She holds a laundry basket and looks in surprise at a big puddle in front of the washing machine.
  2. She stands by the machine with a phone to her ear; a towel lies on the floor.
  3. A repairman (about 50, grey beard, dark blue overalls) kneels at the open machine with a toolbox while Eline watches from the doorway.
- **Criteria.** One per panel.
- **Sample** (23 words). Misses panel 3: it stops after the phone call. Errors: "Eerst Eline ziet" (verb-second) and "ze vraag" (verb agreement).
- **Model** (42 words, 6 sentences, longest 11 words). Panel 1: "ziet Eline veel water op de vloer. De wasmachine lekt." Panel 2: "belt ze een monteur. Er ligt nu een handdoek op de vloer." Panel 3: "is de monteur er. Hij repareert de wasmachine."
- **Starters.** "Eerst …" / "Daarna …" / "Op het laatste plaatje …" (order words only, varied from item 7).

## People drawn in more than one picture (traits copied verbatim)

- Faisal: "man of about 30, short black hair and a short beard, light blue shirt" (three panels). The receptionist: "a woman of about 50 with short grey hair and a purple blouse" (panels 1 and 2).
- Eline: "woman of about 30, blond hair in a high ponytail, red jumper" (three panels).
- Holiday man: "a man of about 40 with short dark hair and a light green T-shirt" plus "a small grey backpack" (both pictures).
- Cooking woman: "a woman of about 45 with short black hair, glasses and a mustard yellow cardigan" (both pictures).
- Single pictures: Saida "woman of about 40, black curly hair in a ponytail, orange sports top"; Dennis "man of about 35, short brown hair and glasses, dark blue raincoat".

## Language control

- **Models.** 40–44 words; 5–7 sentences; average sentence length 5.7–8.4 words; longest sentence 11 words. Main clauses only, joined with *en*, *maar* and *want*; no subordinate clause. Present tense throughout; times in words ("om half acht").
- **Prompts.** 18–37 words; longest sentence 11 words ("Kookt u liever zelf, of haalt u eten bij een restaurant?"); no subordinate clauses.
- **Cues.** 21 and 22 words, three and two sentences.
- **Samples.** 20–30 words, each with two typical A2 errors:
  - verb-second after a fronted element: 6 (items 1, 2, 4, 5, 7 and 8);
  - verb agreement: 3 (*de man kijken*, *Faisal krijg*, *ze vraag*);
  - gender: 2 (*de achterlicht*, *de station*);
  - adjective inflection: 2 (*leuk vakantie*, *groot bal*);
  - plural: 1 (*veel oude huis*);
  - missing *te*: 1 (*zin om koken*);
  - wrong perfect auxiliary: 1 (*ben … gehaald*).
  Verb-second is the most frequent, as it is the most common A2 speaking error.
- **A2 word gate.** Every strict field passes the gate with no unknown word: titles, prompts, cues, criteria, models, alts and starters. The final draft reports no compound warning. An earlier draft had "achterband" in the fietsenmaker model ("transparent: achter + band"); it was replaced by "De remmen werken niet goed" to stay clear of 093's flat tyre. The words the checker accepts as listed include *fietsenstalling*, *fysiotherapeut*, *zomervakantie*, *taalles*, *werkdag*, *klaslokaal*, *receptie*, *receptioniste* (matched as *receptionist* + -e) and *pasje*.
- **Words avoided.** These are unlisted or blocked and not used: *stalling* (use *fietsenstalling*), *saai*, *parasol*, *zand*, *ketting*, *knieën*, *aanrecht*, *fornuis* and *toonbank* (both notA2), *wijzen*, *terras*, *musea* (*museums* passes but is not used outside the sample).

## Requested words

None required. A learner answering the fietsenmaker cue may want *ketting* (bicycle chain). That is not needed for any model or starter, so it is only noted.

## Doubts for the reviewer

1. **fietsenmaker-vraag.** Criterion 3 asks the learner to put a question ("Vraag ook wat de reparatie kost.") rather than give a third piece of information. It is the most natural extra move at a repair counter. The judge should accept "Hoeveel kost het?" and "Wat gaat het kosten?".
2. **docent-vakantie.** A learner who stays at home can still answer ("Ik blijf thuis …"), but criterion 1 expects a destination. The reviewer may want "Zeg waar u in de vakantie naartoe gaat of bent." I kept the cue's own wording.
3. **fietsenstalling.** "Zoekt een plek" is an inference from the full parking, not a drawn action. The two drawn actions (walking with the bicycle, looking at the watch) satisfy "twee dingen" on their own. Check on the contact sheet that the rows look full and that the watch is visible.
4. **fysiotherapie.** The two things are the ball and the weight. If the image model adds a mat or other equipment, a learner could name those instead. That is acceptable, but the alt names only ball and weight.
5. **eerste-werkdag.** Panel 1 (talking at the reception desk) and panel 2 (getting the pass at the same desk) share a setting. The panels differ by the blank card, which must be clearly visible in panel 2.
6. **Two holiday items** (2 and 5) are in one batch, as the plan assigns. The docent model visits family in a village, so its content does not overlap with the beach-or-city choice.

## Checker output

`npx tsx scripts/batch-check.ts content/batches/094-original.json` (it also checks `094-starters.json`):

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```
