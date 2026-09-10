# Batch 013: design notes (B1 Luisteren, two texts)

Batch 013 contains two original B1 listening texts for the Staatsexamen NT2 Programma I shape described in `content/blueprint.md` §4.7: a printed situation line, a narrator intro of 8–60 words, and one fragment per question, each fragment a continuous stretch of one conversation between two voice roles. Thirteen closed questions with three options each. Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and `questions[].text` and the item `text` are the exact mechanical joins of the script turns that the audio pipeline will speak.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id | taskType | textType | domain | Fragments | Spoken words | Turns | Est. length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `B1:listening:batch013-logistiek:1` | gesprek | descriptief | educatie | 7 | 811 | 43 | ≈5.7 min |
| 2 | `B1:listening:batch013-ziekenhuiskeuken:1` | instructie | instructief | werk | 6 | 821 | 32 | ≈5.7 min |

Length estimate: 2.5 spoken words per second (the brief's 190 words ≈ 75 s) plus the 0.45 s stitching gap per turn from `config/voices.json`. With the faster natural pace of the B1 voices (about 2.8 words per second) both texts would run about 5.1 minutes; either way inside the 4–7 minute window. The item `text` (fragments with speaker labels) is 877 and 853 words, under the checker's 900-word cap.

### Text 1: Een avondopleiding tot teamleider

Karim (m-adult) has worked six years in the warehouse of a wholesaler; his team leader retires next year and his manager has asked him to take over, which needs a level-3 diploma. Mevrouw Jansen (f-adult), study adviser at a regionaal opleidingscentrum, describes two routes: a one-year part-time course (one evening a week at school, assignments at his own workplace, a recognised diploma) and a twelve-evening certificate (no diploma, some employers accept it, later exemption). Then costs and who pays, the language requirement with a colleague's case, the intake and the 15 December deadline, and Karim's choice.

### Text 2: Regels in de ziekenhuiskeuken

Roos (f-young) starts in the kitchen of a hospital; Hasan (m-older), head of the kitchen, walks her through the procedures: clocking in and the fixed order (clock in, change, wash hands), hygiene rules and what to do with a cut, calling in sick and the different rules for a cold and for buikgriep, the two-group break rota, what to do when a machine breaks down, and whom to ask (Fatima this week, otherwise Hasan). Roos asks clarifying questions and compares with the restaurant where she worked before.

## 2. Voice roles

Roles come from `config/voices.json`; both texts use exactly two roles, and the narrator reads the intro and the questions. No third voice.

| # | Speakers → role | Why |
| --- | --- | --- |
| 1 | Mevrouw Jansen → f-adult; Karim → m-adult | f-adult is the teacher/manager voice; Karim is in his thirties (cast). Female adviser, male student. |
| 2 | Hasan → m-older; Roos → f-young | Hasan is in his fifties (cast), head of the kitchen; Roos is the young new colleague (cast). Male supervisor, female newcomer, so the batch has one female and one male authority figure. |

Register: mevrouw Jansen says *je* to Karim (usual between an adviser and an adult student); Karim says *u* to her ("Dank u wel"). Hasan says *je* to Roos; Roos never addresses Hasan with a pronoun. Third persons mentioned but not heard: Modibo (Karim's colleague, cast) and Fatima (Roos's mentor, cast).

## 3. Fragment tables

Spoken words exclude the speaker labels; seconds by the estimate above.

### Text 1 (logistiek)

| Fragment | Content | Skill | Key | Spoken words | Turns | ≈ s |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Karim's situation and reason | detail | A | 127 | 7 | 54 |
| q2 | Route 1: the one-year part-time course | detail | B | 115 | 7 | 49 |
| q3 | Route 2: the certificate; Karim's doubt | opinion | C | 118 | 5 | 49 |
| q4 | Costs of both routes; who pays; paying in parts | quantity | B | 111 | 6 | 47 |
| q5 | Language requirement; the case of Modibo | rule-application | C | 121 | 7 | 52 |
| q6 | Start, deadline, intake; register before the employer decides | advice | A | 109 | 5 | 46 |
| q7 | Karim's choice and next steps | inference | B | 110 | 6 | 47 |

Total 811 words, 43 turns, ≈344 s.

### Text 2 (ziekenhuiskeuken)

| Fragment | Content | Skill | Key | Spoken words | Turns | ≈ s |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Welcome; clocking in; the order clock in → change → wash hands | sequence | B | 152 | 5 | 63 |
| q2 | Hygiene rules; the restaurant comparison; a cut | rule-application | A | 135 | 5 | 56 |
| q3 | Calling in sick; a cold versus buikgriep | rule-application | C | 127 | 6 | 54 |
| q4 | Break rota in two groups; Roos's view of the quarter hour | opinion | B | 140 | 5 | 58 |
| q5 | A broken machine: card, tablet, urgent cases | sequence | C | 128 | 6 | 54 |
| q6 | Whom to ask; why the rules are stricter; Roos goes to change | inference | A | 139 | 5 | 58 |

Total 821 words, 32 turns, ≈343 s.

## 4. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring of its own fragment; the competing detail is said in the same fragment. Rationales name the misunderstanding behind each distractor.

### Text 1: logistiek

- **q1** detail, key **A** "Hij kan teamleider worden, maar daarvoor heeft hij een diploma nodig." — evidence "mijn manager heeft gevraagd of ik zijn werk wil overnemen. Dat wil ik graag, maar daarvoor heb ik een diploma op niveau drie nodig."
  - B "Zijn diploma van niveau twee is na tien jaar niet meer geldig.": Karim says his level-2 diploma is ten years old, never that it has expired; he needs a higher level, not a renewal.
  - C "Hij wil bij een ander bedrijf gaan werken als teamleider.": reversal of "En je wilt bij je eigen bedrijf blijven?" — "Ja, graag."
- **q2** detail, key **B** "Eén lesavond per week op school en opdrachten op het eigen werk." — "De rest leer je op je werk. Je krijgt opdrachten die je met je eigen team uitvoert"
  - A "…een stage bij een ander bedrijf.": the school arranges a stageplek only for someone without a job in logistics; "voor jou is dat niet nodig".
  - C "Alle lessen op het eigen werk en alleen de toetsen op school.": reverses where lessons take place; the lessons are the Tuesday evening at school, the work part consists of assignments.
- **q3** opinion, key **C** "Het is snel klaar, maar hij twijfelt of zijn werkgever het genoeg vindt." — "Drie maanden klinkt aantrekkelijk, want dan ben ik snel klaar. Maar mijn manager heeft duidelijk gezegd dat hij een diploma wil."
  - A "Het is de beste keuze, omdat hij de vrijstelling later kan gebruiken.": the exemption is the adviser's information, not Karim's judgement; he calls it a doubt, not the best choice.
  - B "Het is niet interessant, omdat het alleen over planning gaat.": planning is one of the two subjects named; Karim finds the short route attractive, not uninteresting.
- **q4** quantity (two spoken figures combined), key **B** "Ongeveer dertienhonderd euro." — "Het lesgeld voor de opleiding van een jaar is elfhonderd euro. Daar komt nog ongeveer tweehonderd euro bij, voor de boeken en het examen."
  - A "Ongeveer elfhonderd euro.": the lesgeld alone, without books and exam.
  - C "Ongeveer negentienhonderd euro.": 1100 + 200 + 600, adding the price of the certificate, which belongs to the other route.
- **q5** rule-application, key **C** "Bij de intake een taaltoets maken op de computer." — "Dan maakt hij bij de intake een korte taaltoets, een uurtje op de computer."
  - A "Eerst zelf het Staatsexamen halen en zich daarna aanmelden.": that is Karim's situation, not Modibo's obligation; contradicted by "Dus hij hoeft niet eerst zelf een examen te halen?" — "Nee, de toets bij ons is genoeg."
  - B "Eerst de taalmodule van tien weken volgen en daarna de intake doen.": reversed order; the module comes only after a low test result ("Is die te laag, dan volgt hij eerst onze taalmodule").
- **q6** advice, key **A** "Zich toch vóór vijftien december aanmelden." — "Nee, meld je juist alvast aan. De aanmelding kost niets en je zit nergens aan vast."
  - B "Wachten met aanmelden tot de manager heeft beslist.": Karim's own proposal, which the adviser rejects.
  - C "Zich aanmelden voor de groep die in september start.": September is the consequence of waiting ("dan is de volgende start pas in september"), not the advice.
- **q7** inference on the whole text, key **B** "Karim kiest bewust de langere weg, omdat die hem meer zekerheid geeft." — "Hoewel die langer duurt en meer kost, heb ik dan een diploma dat overal geldig is. Met het certificaat ben ik bang dat ik over een jaar toch weer hier zit."
  - A "Karim kiest de kortste weg, omdat hij snel teamleider wil worden.": reversal; the three months attracted him in q3, but he chooses the year.
  - C "Karim laat de keuze aan zijn manager, omdat die de opleiding betaalt.": the manager is consulted about the costs only; the choice is Karim's own ("Ik denk de opleiding van een jaar").

### Text 2: ziekenhuiskeuken

- **q1** sequence, key **B** "Ze trekt in de kleedkamer haar werkkleding aan." — "Na het inklokken ga je naar de kleedkamer. Je werkkleding ligt daar in je kastje: kleding aan, haarnetje op, sieraden uit."
  - A "Ze wast haar handen bij de deur van de keuken.": the later step ("Pas daarna ga je de keuken in, en bij de deur was je eerst je handen").
  - C "Ze meldt zich bij Hasan in de keuken.": reporting to Hasan is the rule for a forgotten clock-in, not a fixed step.
- **q2** rule-application, key **A** "Het melden en een blauwe pleister met een handschoen dragen." — "Dan meld je het bij mij en plak je een blauwe pleister uit de verbanddoos. Blauw, zodat je hem ziet als hij in het eten valt. Daaroverheen draag je een handschoen zolang de wond open is."
  - B "Een gewone pleister plakken en doorwerken tot de pauze.": explicitly forbidden ("Doorwerken met een gewone pleister mag niet").
  - C "Naar huis gaan en pas terugkomen als de wond dicht is.": overgeneralisation of "zolang de wond open is": the glove covers the open wound; nobody sends her home.
- **q3** rule-application, key **C** "Nog twee dagen thuisblijven en dan pas weer komen." — "Bij buikgriep blijf je thuis, en je mag pas twee dagen nadat je beter bent weer in de keuken werken."
  - A "Vóór zes uur naar de keuken bellen dat ze weer komt.": the calling rule is for reporting sick; it does not shorten the two days.
  - B "Vandaag komen werken, maar alleen bij de afwas.": the rule for a verkoudheid, not for buikgriep.
- **q4** opinion, key **B** "Ze vindt een kwartier nogal kort." — "Een kwartier is wel kort, vind ik. Net genoeg voor een kop koffie."
  - A "Ze vindt het jammer dat ze niet naar buiten mag.": reversal; she may go outside ("Ja, maar als je terugkomt, was je eerst weer je handen").
  - C "Ze vindt het fijn dat de soep gratis is.": her "Dat is dan weer mooi" is about the paid lunch break and the free soup and bread at lunch, not about the morning break.
- **q5** sequence, key **C** "De machine uitzetten en het rode kaartje eraan hangen." — "Dan zet je hem uit en hang je het rode kaartje eraan, dat naast elke machine hangt. Daarna schrijf je het op het tablet bij mijn bureau"
  - A "Het opschrijven op het tablet bij het bureau van Hasan.": the second step ("Daarna schrijf je het op het tablet").
  - B "Zelf de technische dienst bellen.": explicitly excluded ("Zelf bellen doe je nooit"); Hasan calls when it is urgent.
- **q6** inference on the whole text, key **A** "Roos kent keukenwerk uit een restaurant, maar het ziekenhuis is strenger." — "In het restaurant waar ik werkte, was het minder streng, maar ik snap wel waarom het hier zo is."
  - B "Roos heeft nog nooit in een keuken gewerkt en leert alles van Fatima.": overgeneralisation of "ik heb nog nooit in een ziekenhuis gewerkt" (q1); she has restaurant experience (the ring in q2, the monteur in q5), and Fatima is her mentor for this week.
  - C "Roos kende de regels al, omdat het restaurant hetzelfde deed.": reversal; the restaurant was "minder streng".

## 5. Key balance and skills

| Key | Count | Share |
| --- | --- | --- |
| A | 4 | 31% |
| B | 5 | 38% |
| C | 4 | 31% |

All 13 questions have three options. Skills: rule-application 3, detail 2, opinion 2, inference 2, sequence 2, quantity 1, advice 1. Each text has one `opinion`, one `inference`, and ends with an `inference` on the whole text. Text 1 has the required combined-figure `quantity` (q4) and `advice` (q6); text 2 has two `sequence` (q1, q5) and two `rule-application` (q2, q3) questions of the "Wat moet Roos doen als …?" kind. Within each text no two consecutive questions share a key.

Prompts paraphrase the fragments (for example "Nog twee dagen thuisblijven" for "je mag pas twee dagen nadat je beter bent weer in de keuken werken"; "in totaal" for the sum that is never spoken). No option is a superset of another; option lengths per question stay within 3 words of each other except q4 (10/6/9, the shortest option is the key) and q5 (10/5/9, the key is the middle length) of text 2; in neither case is the key the longest or most specific option.

## 6. Level and audio notes

- Sentence statistics from the builder (spoken words only, sentences split on . ! ?): text 1 88 sentences, average 9.2 words, longest 20; text 2 79 sentences, average 10.4 words, longest 20. The averages sit under the 12–18 target of blueprint §10 because these are dialogues with short replies; the brief's spoken guideline (8–20 words) is met and no sentence exceeds 20 words.
- B1 features in use: conditionals with inversion ("Haal je alles, dan…", "Doe je later toch de hele opleiding, dan…", "Betaalt je werkgever, dan…", "Is die te laag, dan…", "Blijft iemand langer weg, dan…", "Word je ziek tijdens je dienst, dan…"); relative clauses ("opdrachten die je met je eigen team uitvoert", "een diploma dat overal geldig is", "het rode kaartje …, dat naast elke machine hangt", "mensen die al ziek zijn", "het restaurant waar ik werkte"); signal words (text 1: dus 4, want 2, omdat 1, hoewel 1, maar 6, juist 2, eerlijk gezegd 1; text 2: want 5, zodat 2, terwijl 1, daarom 1, omdat 1, ook al 1, zolang 1, nadat 1, namelijk 1, anders 4); passive or participial forms ("erkend diploma", "ingeklokt", "de lunchpauze betaald is"). The only hesitation marker is "Eerlijk gezegd"; there is no transcribed "uh".
- Less common words are carried by context: heftruck (in a magazijn), lesgeld, vrijstelling ("voor dat deel"), intake/intakegesprek, taalmodule; inklokken (explained as holding the pass against the box), haarnetje, verbanddoos, blauwe pleister (the colour is explained), buikgriep, besmetten, de lopende band (the tray line: "de karren gaan naar de afdelingen"), technische dienst, koeling.
- Numbers and times in words throughout: zes jaar, tien jaar, niveau twee/drie, half zeven, half tien, twaalf lesavonden, drie maanden, elfhonderd, tweehonderd, zeshonderd euro, tien weken, vijftien december, programma één; zes uur, zeven uur, half tien, tien uur, elf uur, een kwartier, een half uur, twee dagen, twaalf jaar. No digits, years or phone numbers.
- Abbreviations are avoided in everything that is spoken, for the sake of the text-to-speech round trip: "regionaal opleidingscentrum" instead of ROC, "erkend diploma op niveau drie" instead of mbo-diploma, "verbanddoos" instead of EHBO-doos, "het niveau van het Staatsexamen, programma één" instead of B1. The printed situation lines avoid them too.
- No organisation, street, brand or place name is used; the college and the hospital stay unnamed.

## 7. Diversity against the catalogue

- Existing B1 listening items are werkoverleg (a spoken notice about a meeting change), lekkage and vrijwilligers festival; neither text touches those, and neither uses the over-represented neighbourhood or volunteering settings. The sibling batch 012 subjects (retraining as a bus driver; care for an elderly parent) are not used.
- **logistiek** versus B1 reading `batch011-deeltijdopleiding` (a website page about part-time mbo at a named college: intake, niveautest, EVC, 760 euro, 250 euro books, two starts): this is a conversation about one person's choice between two concrete routes, with different figures (elfhonderd + tweehonderd, zeshonderd), a language rule applied to a colleague, a deadline and advice; no EVC, no college name; the one-hour intake language test appears in both (niveautest there, taaltoets here), as the editorial review notes. Versus B1 reading "Een stageplaats kiezen" and B1 reading "Bijdrage voor een cursus" (cursusfonds): different task (study route choice, employer pays), different part.
- **ziekenhuiskeuken** versus A2 listening `batch005-werkdag` (a hotel team leader's 148-word monologue: entrance, pass, locker key, canteen, breaks, call before seven, no message): the brief assigned the first-day briefing as the situation; the B1 version is an 821-word two-voice dialogue in a hospital kitchen whose tested content (the fixed order of steps, the blue plaster, buikgriep versus verkoudheid, the machine procedure, the restaurant contrast) does not occur in the A2 item. The sick-call rule (bel vóór zes uur, niet appen) resembles the A2 rule in kind and is therefore used as context and as a distractor anchor, never as a key; the clocking-in sentence was reworded after a six-word phrase comparison against the catalogue flagged the original wording. Versus B1 reading `batch011-verlofregeling` (ziek melden en verlof aanvragen): one sentence of sick reporting here, as context. Versus B1 speaking "Help een nieuwe collega beter inwerken": a production task, different part.
- A six-word phrase comparison of both texts against every text, prompt, option, model and sample in `content/catalogue.json` finds no overlap.

## 8. Checker result

`npm run batch:check content/batches/013-original.json`:

```
Checked 2 items, 13 questions. Keys: {"A":4,"B":5,"C":4}. Options: {"3":13}.
No failures, no warnings.
```

## 9. Points for the reviewer

1. **Adviser's name.** "Mevrouw Jansen" is not in the cast of blueprint §8 or `config/illustration.json`; the batch brief allowed "Mevrouw Jansen or similar". If a cast name is preferred, "Sabrina" (thirties) fits the brief's own example intro; the label appears in 23 turns, the intro, the q6 prompt and the q3 and q6 explanations.
2. **Staatsexamen named.** Text 1 q5 names the Staatsexamen, programma één, as the language requirement and as the exam Karim passed. A real exam, named because the item is about that requirement and it is the learner's own context; it also avoids the token "B1", which the voices may read unpredictably. Say if this feels too self-referential; "een diploma Nederlands op het niveau van de inburgering" is the fallback.
3. **Inference labels.** Both closing questions are labelled `inference`, as the brief asks for one per text. Because the evidence rule requires verbatim support in the closing fragment, the key is fairly explicit there (Karim's "Hoewel die langer duurt…", Roos's "was het minder streng…"); the inference lies in combining it with the earlier fragments (the three months that attracted Karim; "nog nooit in een ziekenhuis gewerkt" plus the ring and the monteur). Relabel as `summary` if preferred; the last-question rule allows both.
4. **Hygiene facts.** The blue detectable plaster with a glove, the two symptom-free days after buikgriep and the cold-to-dishwashing rule reflect common food-safety practice in institutional kitchens; they are presented as this hospital's house rules in a fictional setting, not as medical guidance. "Buikgriep" is kept non-graphic (no symptoms named).
5. **Opinion question, text 2 q4.** Distractor C is true as a reaction to the lunch benefits ("Dat is dan weer mooi") but answers a different question; the prompt is anchored on "de ochtendpauze" and the free soup is tied to the lunch in the script. Confirm the prompt is tight enough.
6. **Length.** Both texts run about 5.7 minutes by the 2.5-words-per-second estimate; the longest fragment is text 2 q1 (152 words, ≈63 s). The item texts are 877 and 853 words against the 900-word cap, so revisions that add material need a matching cut.
7. **Overlap with the A2 hotel item** as described in §7: same communicative situation by assignment, different part, level, setting, tested content and wording.
8. **Dates.** "uiterlijk vijftien december", "begin februari", "september" carry no weekday or year, so nothing needs checking against a calendar.

## Revision after the editorial review (10 September 2026)

The editorial review (`content/reviews/013-review.md` and `.json`, verdict revise, minor; reviewed hash `03719b36e27502f68cc853528edac2775ecd9e85af5597025f2807e64ed1c183`) passed `logistiek` as written and asked for one required and two recommended edits on `ziekenhuiskeuken`. All three are applied with the reviewer's exact text. No script, `text`, prompt, option, key or explanation changed, so the spoken-word counts, turns, fragment lengths and the 853-word item text in §1 and §3 stand, and the `logistiek` item is byte-identical to the reviewed version.

- **`B1:listening:batch013-ziekenhuiskeuken:1`**, three fields. `questions[1].evidence` (q2, required, rubric 12): the key names melden, blauwe pleister and handschoen, but the quote covered only the first two; the glove is said two sentences later in the same turn. The evidence now runs over the three contiguous sentences from "Dan meld je het bij mij" to "zolang de wond open is." (verbatim in the q2 fragment, once in the item text). `intro` (recommended, coherence): "U hoort een gesprek in de keuken van een ziekenhuis" placed the talk inside the kitchen, while the text's own rule keeps a newcomer out until she has changed and washed her hands (Roos: "Dan ga ik me nu omkleden"; Hasan: "ik kom zo bij jullie kijken"). The first sentence now reads "U hoort een gesprek in het kantoortje naast de keuken van een ziekenhuis."; the rest of the intro is unchanged (41 words, inside 8–60). The `situation` line stays as it was, since "in de keuken van een ziekenhuis" there describes the job, not the room. `questions[4].evidence` (q5, recommended): the prompt asks for the first step and the old quote proved only the action; it now continues with "Daarna schrijf je het op het tablet bij mijn bureau", which proves the rank against distractor A. The q2 and q5 quotes in §4 above are updated to match; the distractor rationales are unchanged.
- **`B1:listening:batch013-logistiek:1`**: no change (pass). The review's optional notes for both texts (paslezer, "geen uren", dropping "bij de band", a two-sentence q3 prompt, the logistiek intro, q3 turn, q3 option C, q1 evidence, q2 prompt and q6 option A) were not taken, as the revision task instructed.
- The review's coordinator notes also call §7's claim that `logistiek` has "no niveautest" relative to B1 reading `batch011-deeltijdopleiding` inaccurate: the listening text has the same intake language test under the name taaltoets. §7 is corrected; the overlap itself is accepted in the review's §7.

Checker after the revision, `npm run batch:check content/batches/013-original.json`:

```
Checked 2 items, 13 questions. Keys: {"A":4,"B":5,"C":4}. Options: {"3":13}.
No failures, no warnings.
```

Hashes (`shasum -a 256`):

- `content/batches/013-original.json`: `209eeb35000dd8803b669b901af807dcdc4c23677b923bcea25c7af610fd45ea` (reviewed version: `03719b36e27502f68cc853528edac2775ecd9e85af5597025f2807e64ed1c183`).
- No starters file exists for this batch.

Next step: a focused re-review of `ziekenhuiskeuken`; `logistiek` needs no re-reading. Audio remains blocked until the media review.
