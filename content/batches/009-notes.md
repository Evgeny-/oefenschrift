# Batch 009: design notes (A2 Spreken, twenty-four tasks)

Batch 009 contains twenty-four original A2 speaking tasks in the four task types of the DUO "Spreken A2" exam (16 tasks in 35 minutes, no multiple choice since 1 March 2025) as described in `content/blueprint.md` §4.3 and `docs/research/exam-blueprints-2026-09-10.md` §3.1: six `video-answer` tasks (a person asks one two-part question; the learner answers), six `picture-describe` tasks (one picture: describe and give an opinion), six `picture-choose` tasks (two pictures: choose and say why) and six `picture-sequence` tasks (three pictures: narrate what a named person does). Every situation, cue, criterion, sample, quote, model and image brief was written for this project. Official material was used for structure only: the instruction sentences ("U hoort een vraag. Geef antwoord.", "Vertel wat … Vertel ook … Gebruik het plaatje.", "In welke … liever? Vertel ook waarom. Kies een van de plaatjes.", "Kijk naar de plaatjes. Vertel wat … doet. Vertel iets over alle plaatjes.") follow the official patterns; no official scenario, picture or question was reused.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction. The rater scales (on-topic precondition, content, word choice, sentence formation, pronunciation) live in the `a2-spreken` rubric; the criteria only carry the content checks.

Conventions used in every task:

- Fields: `id`, `level`, `part`, `exam: duo-a2`, `taskType`, `domain`, `title`, `status: draft`, `targetLevelValidated: false`, `rubric: a2-spreken`, `speakingSeconds: 40`, `prepSeconds: 10`, `prompt`, `cue` (video-answer only: `{speaker, role, text}` with a voice role from `config/voices.json`), `images` (`{brief, alt, kind: drawing, size?}`), `criteria` (`[[nl, en], …]`), `sample`, `quotes`, `model`. The `size` hint (`still` for the video-answer still, `pair` for the two-picture choice, `sequence` for the three panels, default `single` for the one-picture description) is read by `scripts/illustrate.ts` (`spec.size`) and maps to the sizes in `config/illustration.json`.
- **Three criteria per task** (the checker requires 3–6). For `video-answer` the cue is a two-part question, so the criteria are: answer part one, answer part two, add one detail or reason (research note §6.5: "both parts of a two-part question"). For `picture-describe`: describe the picture, name at least two of the things asked for, give the opinion. For `picture-choose`: state the choice, give a reason, say something about the other picture (§6.5: "both pictures mentioned"). For `picture-sequence`: one criterion per picture, in order.
- Prompts are the sentences the narrator reads aloud, in the official order and at A2 length (no sentence over 16 words); the situation comes first, the instruction sentences follow.
- Cues are spoken Dutch of 16–21 words: `je` from a colleague, `u` from a teacher, a doctor, a shop employee and strangers. Each cue asks one clear two-part question that anyone can answer from everyday life; no cue asks for a name, address, date of birth or other real personal data.
- Every sample fulfils all criteria but one (that quote is `null`); quotes are exact substrings of the sample. Samples are short, plausible learner answers without deliberate errors (the existing catalogue speaking samples have none either; batch 008's one-error-per-sample convention was a writing convention). Models are 27–45 words of spoken A2 Dutch in short main clauses (average sentence length under 12 words, none over 18).
- Cast from `config/illustration.json`, named in the briefs exactly as in the config so that `expandCast` appends their fixed traits (`mevrouw Bakker`, `meneer De Vries` in lower case mid-sentence): Julio (3), Karim (3), Fatima (3), mevrouw Bakker (3), meneer De Vries (2), Roos (1), Sem (1), Amina (1), Sabrina (1), Modibo (1), Hasan (1). Non-cast characters (a teacher, a doctor, a shop employee, a photographer, a tailor, a driving instructor) are described in the brief with two or three traits. Sequences describe the same cast member with the same traits in all three panels; pairs differ only in the thing chosen.
- Alt texts are neutral Dutch descriptions; for choice tasks they describe each option without preferring one.
- No brand names, no real addresses, no text or logos in any picture (envelopes, sheets, forms, tickets and cards are blank).

## 1. Batch matrix

| # | id (slug) | taskType | Domain | Cast / speaker | Topic | Why not a duplicate |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ochtenddienst | video-answer | werk | Julio (colleague, m-young) | the colleague makes next month's rota: morning or evening shifts, and why | "Shifts" is on the needed list (blueprint §9). Existing werk items are *te laat* (message), *loonstrook*, *contract*, *training*, *werkdag*, *werkkleding*, *magazijn*: none asks for a shift preference. |
| 2 | thuis-oefenen | video-answer | opleiding | teacher (f-adult) | how and how often you practise Dutch at home | *Taalles buurthuis* and *computercursus* are receptive; *groep* (008) changes a course group; *toets* is about a test. Nothing asks the learner to describe their own study habits. |
| 3 | nieuwe-buurvrouw | video-answer | wonen-buurt | mevrouw Bakker (new neighbour, f-older) | how long you have lived here and what you think of the neighbourhood | *Buurvrouw bericht* cancels a visit; *feestje* (listening) is a street party invitation. An opinion about one's own neighbourhood is new; the only neighbourhood item in the batch besides *afval* and *flat-dorp*. |
| 4 | slaap | video-answer | gezondheid | huisarts (m-older) | bedtime and rising time when you are often tired | "Huisarts" is on the needed list. *Huisarts afspraak* (reading) and *nieuwe-patient* (008 form) are procedural; *gezond* (008 wijkkrant) is about healthy habits in general. No item asks about sleep; nothing medical or graphic is required. |
| 5 | abonnement | video-answer | winkels-diensten | shop employee (m-shop) | subscription or prepaid, and how much internet you use | "A subscription" is on the needed list. *Scherm* (listening) and *telefoon* (reading folder) are repairs in a phone shop; this is a different act (choosing a product). See doubt 1. |
| 6 | bushalte | video-answer | vervoer | meneer De Vries (stranger at the stop, m-older) | which bus goes to the hospital and how often it runs | "OV" is on the needed list. *Kaartautomaat* asks for help with a machine; *bus* (listening) and *stadsbus* (reading) are receptive. Giving directions to a stranger is a new speech act. |
| 7 | schoonmaak | picture-describe | werk | Julio | Julio cleans an office: what he has with him; opinion about the work | First cleaning-job item. *Restaurant* and *supermarkt* (008 picture notes) are chore lists written to a colleague; here the learner describes equipment and gives an opinion. |
| 8 | gymles | picture-describe | opleiding | Sem | a school gym lesson: what the pupils do; opinion about sport at school | "School of the children" is on the needed list. *Sporthal* (reading) is a changed entrance; *sportclub* (008) is a registration form. A gym lesson is new. |
| 9 | afval | picture-describe | wonen-buurt | Karim | Karim at the glass, paper and rest containers; opinion about separating waste | *Container* (writing) is a wrongly delivered bin; KNM has no waste-separation item yet. Describing what goes into which container is a different act. |
| 10 | ehbo | picture-describe | gezondheid | Roos | the contents of a first-aid box at home; opinion | No first-aid or home-care item exists; *apotheek* and *tabletten* are pharmacy visits. |
| 11 | kringloop | picture-describe | winkels-diensten | Fatima | a second-hand shop: what can be bought; opinion about second-hand goods | *Speelgoed ruilen* (reading) is a toy-swap advertisement; no item has a kringloopwinkel or an opinion about second-hand goods. |
| 12 | verjaardag | picture-describe | vrije-tijd-familie | Amina | a child's birthday party: cake, candles, balloons, presents, friends; opinion about children's parties | "A birthday" is on the needed list. *Feestje* (listening) is a street party; *cadeau* (008) is a present for a teacher. |
| 13 | alleen-samen | picture-choose | werk | Sabrina | working alone or in a team | No preference-about-work item exists (*werkdruk*, *teamtaak*, *inwerken* are B1 problem-solving tasks). |
| 14 | klas-thuis | picture-choose | opleiding | meneer De Vries | learning Dutch in a classroom or at home online | "A course choice" is on the needed list. *Computercursus* advertises a course; *groep* switches groups. Choosing a learning form is new. |
| 15 | gemeente-bellen | picture-choose | instanties | Karim | phoning the gemeente or going to the counter | "Gemeente" is on the needed list. *Inschrijven* and *verhuizing* (KNM) are facts; *parkeervergunning* is a letter and a voicemail. A preference about contact channels is new. |
| 16 | trein-auto | picture-choose | vervoer | Fatima | train or car to a birthday in another city | *Reizen* (008 wijkkrant) describes the daily commute; *meerijden* asks for a lift; *trein* (listening) is a station announcement. A one-off trip choice with reasons is new. |
| 17 | flat-dorp | picture-choose | wonen-buurt | none (two dwellings) | a flat in the city or a house in a village | *Huur* (008) ends a tenancy; *logeerkamer* rents a room. No item asks where the learner would rather live. |
| 18 | sportschool-park | picture-choose | gezondheid | mevrouw Bakker | exercising in a gym or outside in the park | *Sportles* cancels a class; *sportclub* registers a child; *gezond* lists habits. A choice between two ways to exercise is new. |
| 19 | paspoort | picture-sequence | instanties | Fatima | passport photo, application at the counter, collecting the passport | "Official documents" (KNM theme 6) has no item; *inschrijven* is a registration card. |
| 20 | brief-gemeente | picture-sequence | instanties | Julio | reading a letter from the gemeente, phoning, an appointment at the town hall | "Gemeente letters" is on the needed list. *Parkeervergunning* (reading) is a letter to read; here the learner narrates what someone does with a letter. |
| 21 | vakantie | picture-sequence | vrije-tijd-familie | Karim | packing, loading the car, sitting by the tent at a lake | "A holiday" is on the needed list; no holiday item exists (*schoolreis* is a school trip voicemail). |
| 22 | bioscoop | picture-sequence | vrije-tijd-familie | mevrouw Bakker | buying tickets, getting popcorn, watching the film with a friend | No cinema or outing-with-a-friend item exists. |
| 23 | rijbewijs | picture-sequence | vervoer | Modibo | driving lesson, parking practice, passing the test | No driving or licence item exists; *monteur* (speaking) is a late technician; *deelauto* (B1) is a car-sharing rule text. |
| 24 | kleermaker | picture-sequence | winkels-diensten | Hasan | trousers too long, pinned by the tailor, collected and paid for | "A repair" is on the needed list but every existing repair is an appliance or a device (*koelkast*, *scherm*, *telefoon*, *reparatie*); a clothing alteration is a new service. |

Counts: 6 video-answer, 6 picture-describe, 6 picture-choose, 6 picture-sequence. Domains: werk 3, opleiding 3, wonen-buurt 3, gezondheid 3, winkels-diensten 3, instanties 3, vervoer 3, vrije-tijd-familie 3. Cue roles: m-young, f-adult, f-older, m-older (twice: huisarts and the stranger at the bus stop), m-shop.

## 2. Per task: cue casting, the omitted criterion, and how the model meets every criterion

### Video-answer

1. **ochtenddienst** (`A2:speaking:batch009-ochtenddienst:1`). Cue: Julio, a young colleague, informal `je`, role `m-young` (Nick; "student, young colleague"). Still: Julio at his desk with a paper calendar. Sample omits criterion 3 (no extra detail or time). Model: "Ik werk liever in de ochtend" (1); "Dan ben ik nog fris en ik werk sneller" (2); "'s Middags ben ik dan thuis …", "Ik begin graag om zeven uur" (3). 33 words.
2. **thuis-oefenen**. Cue: the teacher, formal `u` (the official exam addresses candidates with `u`), role `f-adult` (Esmee; "teacher"). Still: a non-cast teacher (woman of about 50, short grey hair, green blouse) at a blank whiteboard. Sample omits criterion 2 (no frequency). Model: news on tv and talking with the neighbour (1); "bijna elke dag, een half uur" (2); "Zo leer ik nieuwe woorden en ik versta de mensen beter" (3). 36 words.
3. **nieuwe-buurvrouw**. Cue: mevrouw Bakker, an older new neighbour, `u`, role `f-older` (Hanneke; "older neighbour"). Still: mevrouw Bakker at the fence with a moving box. Sample omits criterion 1 (no duration). Model: "Ik woon hier al drie jaar" (1); "Ik vind de buurt fijn" (2); people are kind, it is quiet, shops and bus stop close, parking sometimes hard (3). 33 words.
4. **slaap**. Cue: the huisarts, `u`, role `m-older` (Arjen; the voices file lists "huisarts" under this role). Still: a non-cast doctor (man of about 55, grey beard, light blue shirt) at his desk with a stethoscope; no white coat, as Dutch huisartsen usually wear none. Sample omits criterion 2 (no rising time). Model: "om twaalf uur naar bed" (1); "Ik sta om zes uur op" (2); only six hours of sleep, waking at night (3). 33 words.
5. **abonnement**. Cue: the shop employee, `u`, role `m-shop` (Jerry; "shopkeeper"). Still: a non-cast employee (man in his forties, shaved head, dark polo shirt) behind the counter with plain phones on display. Sample omits criterion 1 (never says subscription or prepaid). Model: "Ik wil graag een abonnement" (1); "Ik gebruik veel internet" (2); video calls with the family, music, a question about the monthly price (3). 33 words.
6. **bushalte**. Cue: meneer De Vries, a stranger at the stop, `u`, role `m-older` (Arjen; "older customer"). Still: meneer De Vries at a bus stop with a shopping bag. Sample omits criterion 2 (no frequency). Model: "Lijn vier gaat naar het ziekenhuis" (1); "Die bus rijdt elk kwartier" (2); wait at the stop across the road, about ten minutes (3). 27 words. The learner invents the line number; any number is acceptable.

### Picture-describe

7. **schoonmaak**. Sample omits criterion 3 (no opinion). Model: Julio in an office (1); bucket with mop, vacuum cleaner, spray bottle, cloth (2); "zwaar werk, maar het is belangrijk", a clean office is pleasant for everyone (3). 41 words.
8. **gymles**. Sample omits criterion 2 (names only one activity: the rope). Model: a gym hall at school (1); climbing the rope, playing with a ball, jumping over the box onto the mat (2); "Ik vind sport op school goed", children move every week, healthy (3). 41 words.
9. **afval**. Sample omits criterion 3. Model: Karim at three containers in the street (1); empty bottles for the glass container, cardboard for the paper container (2); good for the environment but it takes time (3). 41 words.
10. **ehbo**. Sample omits criterion 2 (names only the bandage). Model: Roos at the table with an open first-aid box (1); plasters, a roll of bandage, small scissors, a thermometer (2); "heel handig", a plaster is quickly at hand when a child falls (3). 42 words.
11. **kringloop**. Sample omits criterion 2 (names only the sofa). Model: Fatima in a kringloopwinkel (1); a green sofa, a lamp, a cupboard with plates and cups (2); a good idea, cheap, less waste (3). 39 words.
12. **verjaardag**. Sample omits criterion 3. Model: Amina at a table with a cake (1); candles, two friends, balloons, presents (2); "gezellig, maar ook druk", the learner's children love them (3). 42 words.

### Picture-choose

13. **alleen-samen**. Sample omits criterion 3 (nothing about the other picture). Model: "Ik kies het tweede plaatje. Ik werk liever samen met collega's" (1); asking questions, learning from each other, more sociable (2); "Alleen werken, zoals op het eerste plaatje, vind ik stil …" (3). 43 words. The sample chooses the other option (working alone), which is equally acceptable.
14. **klas-thuis**. Sample omits criterion 2 (chooses home without a reason; "niets voor mij" is a judgement, not a reason). Model: the classroom (1); talking with people, the teacher helps at once (2); at home behind the computer you are alone, which the speaker finds hard (3). 41 words.
15. **gemeente-bellen**. Sample omits criterion 3. Model: the town hall (1); seeing the employee and showing papers (2); phoning is hard because not everything is understood on the phone (3). 39 words.
16. **trein-auto**. Sample omits criterion 3. Model: the train (1); reading or sleeping, no parking search (2); by car you are often in a traffic jam, "Dat vind ik vervelend" (3). 40 words.
17. **flat-dorp**. Sample omits criterion 1: it gives arguments for both pictures without ever choosing, a realistic learner failure for this type. Model: the house in the village (1); a garden, quiet, children play outside (2); the flat is close to the shops but the city is too busy (3). 43 words.
18. **sportschool-park**. Sample omits criterion 3. Model: the park (1); fresh air, free (2); the gym is often busy and costs money, but useful when it rains (3). 41 words.

### Picture-sequence

19. **paspoort**. Sample omits criterion 2 (jumps from the photo to collecting the passport). Model: passport photo at a photographer (1); at the gemeente, hands in a form and the photo (2); collects the new passport, is happy (3). 44 words.
20. **brief-gemeente**. Sample omits criterion 3 (no appointment). Model: opens and reads the letter at the table (1); phones the gemeente (2); has an appointment and talks with an employee (3). 40 words. The pictures cannot show what the letter says; the narration is about the actions, and any invented reason for the letter is acceptable.
21. **vakantie**. Sample omits criterion 1 (no packing). Model: packs the suitcase with clothes (1); puts the suitcase in the car (2); at the campsite by his tent at a lake (3). 43 words. A campsite by a lake was chosen over a beach so that Karim's fixed grey jacket stays plausible in panel 3.
22. **bioscoop**. Sample omits criterion 2 (no popcorn and drinks). Model: buys two tickets at the counter, goes with a friend (1); gets popcorn and two drinks (2); they sit in the hall and watch the film (3). 42 words.
23. **rijbewijs**. Sample omits criterion 3 (no result). Model: a driving lesson, at the wheel with the instructor beside him (1); practises parking between two cones (2); has passed, holds his licence (3). 43 words. Modibo, a young adult from the extended cast, was chosen over the teenager Sem.
24. **kleermaker**. Sample omits criterion 2 (no tailor scene). Model: in front of the mirror, trousers far too long (1); at the tailor, who measures and shortens them (2); collects the trousers and pays (3). 45 words.

## 3. Image briefs

All briefs are in `images[].brief`; the table summarises them. Generation size follows `images[].size` (`still` 1024×640 for the six video stills, `single` 816×816 for the six one-picture tasks, `pair` 1024×640 for the twelve choice pictures, `sequence` 1024×640 for the eighteen panels; per the sequence rule each three-panel task is one generation split afterwards). 42 images in total. Cast traits are written out in the brief and are also expanded by `expandCast` because the cast name appears verbatim.

| Task | Picture(s) | Cast / character | Answer-relevant detail to check at review |
| --- | --- | --- | --- |
| ochtenddienst | still: Julio at a desk with a laptop and a paper calendar, turned to the viewer | Julio | looks like a colleague at work, not a manager |
| thuis-oefenen | still: a teacher beside a blank whiteboard | non-cast teacher (about 50, short grey hair, green blouse) | whiteboard must stay blank |
| nieuwe-buurvrouw | still: mevrouw Bakker at a low fence between two front gardens, moving box at her feet | mevrouw Bakker | the moving box marks her as the new neighbour |
| slaap | still: a doctor at a desk with a stethoscope in a consulting room | non-cast doctor (about 55, grey beard, light blue shirt) | no white coat, no readable screen |
| abonnement | still: an employee behind the counter of a phone shop, plain phones on display | non-cast employee (forties, shaved head, dark polo shirt) | phones without logos or screens with text |
| bushalte | still: meneer De Vries at a bus stop (pole and small shelter) with a shopping bag | meneer De Vries | the stop must read as a bus stop without a sign text |
| schoonmaak | single: Julio in an empty office with mop and bucket, vacuum cleaner, spray bottle, cloth | Julio | the four items are separately recognisable |
| gymles | single: gym hall; Sem climbs a rope, two pupils throw a ball, a girl jumps over a vaulting box onto a mat, a teacher with a whistle | Sem | three different activities visible |
| afval | single: Karim on the pavement before three containers (green with round opening, blue, grey), a bag of bottles in one hand, flattened cardboard under the other arm | Karim | bottles and cardboard clearly different |
| ehbo | single: Roos at a kitchen table with an open plain white box; bandage roll, plasters, small scissors, thermometer | Roos | no cross symbol on the box; four items recognisable |
| kringloop | single: Fatima before a green sofa; floor lamp, shelf with cups and plates, table with books, bicycle against the wall | Fatima | no price tags; it should read as a shop, not a living room |
| verjaardag | single: Amina at a table with a cake with lit candles, two friends, balloons above, wrapped presents | Amina | candles lit; presents wrapped |
| alleen-samen | pair: (1) Sabrina alone at a desk with a laptop in a quiet office; (2) Sabrina at a large table with three colleagues, same office | Sabrina | same room and clothes; only the number of people differs |
| klas-thuis | pair: (1) meneer De Vries in a classroom with four adult students and a teacher at a blank board; (2) meneer De Vries alone at a kitchen table with laptop and headphones | meneer De Vries | round glasses in both; whiteboard blank |
| gemeente-bellen | pair: (1) Karim on a sofa at home on the phone; (2) Karim at a town-hall counter with an employee | Karim | the counter must read as an office, not a shop |
| trein-auto | pair: (1) Fatima at a train window with a wrapped present on her lap; (2) Fatima at the wheel of a small car, the present on the seat beside her | Fatima | the present is the same in both |
| flat-dorp | pair: (1) a tall apartment building on a busy city street with a tram and street-level shops; (2) a small house with a red roof and a front garden on a quiet village street with trees and a bicycle at the fence | none | no signage; comparable framing and weather |
| sportschool-park | pair: (1) mevrouw Bakker on a treadmill in a gym with weights and an exercise bike; (2) mevrouw Bakker walking briskly on a park path with trees and a pond | mevrouw Bakker | red cardigan in both |
| paspoort | sequence: (1) Fatima on a stool while a photographer with a tripod camera takes her picture; (2) Fatima hands a form and a small photo to a town-hall employee; (3) the same employee hands her a small dark-red booklet | Fatima | headscarf and blue coat in all panels; the booklet blank |
| brief-gemeente | sequence: (1) Julio opens a white envelope at a kitchen table and reads a blank sheet; (2) Julio phones in the same kitchen with the sheet in his hand; (3) Julio sits opposite an employee at a town-hall desk, the sheet between them | Julio | the sheet stays blank; the office reads as an institution |
| vakantie | sequence: (1) Karim kneels by an open suitcase on a bed and packs folded clothes; (2) Karim lifts the closed suitcase into a car boot in front of a house; (3) Karim in a folding chair before a small tent at a lakeside campsite | Karim | grey jacket in all panels; the suitcase is the same |
| bioscoop | sequence: (1) mevrouw Bakker receives two tickets at a cinema counter, a friend beside her; (2) mevrouw Bakker carries a tray with a popcorn bucket and two cups; (3) both women in red seats before a large bright blank screen | mevrouw Bakker | no posters or text; the screen blank |
| rijbewijs | sequence: (1) Modibo at the wheel with an instructor pointing ahead; (2) Modibo reversing between two orange cones, the instructor on the pavement; (3) Modibo beside the car holding up a small pink card, the instructor applauding | Modibo | no roof sign or "L" plate (text); the card blank |
| kleermaker | sequence: (1) Hasan before a mirror in trousers far too long; (2) Hasan on a low platform while a tailor with a measuring tape pins the hem; (3) Hasan receives the folded trousers in a paper bag at the counter | Hasan | brown cap in all panels; trousers visibly too long in panel 1 |

## 4. Sentence starters (`content/batches/009-starters.json`)

One fragment per criterion in criteria order, each with an ellipsis, in spoken register; facts (times, reasons, objects, choices) are left to the learner. Choice starters are neutral between the two pictures. The starters are delivered in the batch file and not merged into `content/hints/sentence-starters.json`, because merging changes the overlay hash recorded in `content/hints/review.json` and needs the focused starter review described in `docs/research/content-workflow.md`.

| Task | Starters |
| --- | --- |
| ochtenddienst | Ik werk liever in de … / Dan kan ik … / Ik begin meestal om … |
| thuis-oefenen | Thuis oefen ik met … / Dat doe ik … per week. / Zo leer ik … |
| nieuwe-buurvrouw | Ik woon hier al … / Ik vind de buurt … / Dichtbij is er … |
| slaap | Ik ga meestal om … naar bed. / Ik sta om … op. / 's Nachts … |
| abonnement | Ik wil graag een … / Ik gebruik … internet. / Mijn telefoon gebruik ik vooral voor … |
| bushalte | U moet lijn … nemen. / De bus rijdt elke … / De halte is … |
| schoonmaak | Ik zie Julio in … / Hij heeft een … en een … bij zich. / Ik vind dit werk …, want … |
| gymles | Ik zie een … op school. / De leerlingen … en … / Sport op school vind ik …, want … |
| afval | Karim staat bij … / Hij gooit … in de … / Afval scheiden vind ik …, omdat … |
| ehbo | Roos zit aan tafel met … / In de doos zitten … en … / Zo'n doos vind ik …, want … |
| kringloop | Fatima is in een winkel met … / Ze kan daar een … en een … kopen. / Tweedehands spullen vind ik …, want … |
| verjaardag | Amina zit aan tafel met … / Ik zie ook … en … / Kinderfeestjes vind ik …, want … |
| alleen-samen | Ik kies plaatje … / Ik werk liever …, omdat … / Het andere plaatje vind ik … |
| klas-thuis | Ik leer liever … / Dat vind ik beter, omdat … / Op het andere plaatje zie ik … |
| gemeente-bellen | Ik kies plaatje … / Dat is beter voor mij, want … / Het andere plaatje vind ik …, omdat … |
| trein-auto | Ik ga liever met de … / Dat is handig, want … / Met de … moet je … |
| flat-dorp | Ik woon liever in … / Daar is het … / Op het andere plaatje … |
| sportschool-park | Ik kies … / Daar kan ik …, want … / Op het andere plaatje … |
| paspoort | Op het eerste plaatje laat Fatima … / Op het tweede plaatje geeft ze … / Op het derde plaatje krijgt ze … |
| brief-gemeente | Eerst leest Julio … / Daarna belt hij … / Op het laatste plaatje praat hij met … |
| vakantie | Eerst doet Karim … in zijn koffer. / Daarna zet hij … in de auto. / Op het derde plaatje zit hij … |
| bioscoop | Eerst koopt mevrouw Bakker … / Daarna haalt ze … / Op het derde plaatje zitten ze … |
| rijbewijs | Op het eerste plaatje heeft Modibo … / Daarna oefent hij … / Op het derde plaatje … |
| kleermaker | Eerst staat Hasan … / Bij de kleermaker … / Daarna haalt hij … |

The sequence starters name the verb of each panel where the picture makes the object obvious (laat … maken, geeft, krijgt; leest, belt, praat met), and leave the verb where the object is obvious and the verb is the learning content (Bij de kleermaker …). The slaap starter "'s Nachts …" invites inversion; "Ik word 's nachts …" is an easier alternative if the reviewer prefers.

## 5. Doubts for the reviewer

1. **abonnement: phone-shop setting.** A phone shop already appears twice in the bank (*scherm*, a broken screen conversation; *telefoon*, a repair folder). The act here is different (choosing a subscription, which the needed list asks for), but if the reviewer applies "repeating the setting is not a new item" strictly, the same question can be moved to a sports club desk ("Wilt u een abonnement voor een jaar of voor een maand? En hoe vaak wilt u komen?") without changing the criteria.
2. **Three criteria for video-answer.** The brief for this batch showed two criteria (answer; one detail or reason); `scripts/batch-check.ts` fails on fewer than three. The cues were therefore written as two-part questions with a third "one more detail or reason" criterion. If two criteria are preferred for this type, the checker's lower bound must change first, and criteria 1 and 2 of each video task can then be merged into "Beantwoord de vraag".
3. **Rater checks versus prompt wording in picture-describe.** Criterion 1 ("Vertel wat u op het plaatje ziet") traces to "Gebruik het plaatje" and the situation sentence rather than to a literal "vertel wat u ziet". It records the scene-setting the official raters expect (on-topic precondition); if the reviewer wants criteria to quote the prompt only, criterion 1 could become the prompt's own "Vertel wat X …" sentence and criterion 2 the count.
4. **Third criterion of picture-choose.** "Zeg ook iets over het andere plaatje" follows the research note's "both pictures mentioned" but is not in the official instruction text ("Vertel ook waarom"). A learner who only chooses and gives a reason would miss this criterion. If that is judged too strict, replace it with "Geef nog een reden of een detail" in all six tasks.
5. **slaap: a doctor's question.** The cue mentions tiredness ("U zegt dat u vaak moe bent") to motivate the question; nothing graphic follows and the criteria are only times. If any health framing is unwanted, the same cue works at a language-school intake ("Hoe laat gaat u meestal naar bed, en hoe laat staat u op?") with role `f-adult`.
6. **Personal data.** Bedtime (slaap), years in the street (nieuwe-buurvrouw) and study habits (thuis-oefenen) are personal but not identifying; learners may invent them. No task asks for a name, address, date of birth, number or employer.
7. **bushalte: the learner invents facts.** The answer requires making up a line number and frequency. Official video items sometimes ask for help or directions in this way; if the reviewer prefers questions about the learner's own life only, an alternative cue for meneer De Vries is "Gaat u vaak met de bus? En wat vindt u van de bussen hier?".
8. **flat-dorp has no person in the pictures**, unlike the other choice tasks. The official example ("In welke winkel werkt u liever?") also shows places rather than people, so both forms are exam-like; the reviewer may want one rule.
9. **gymles: Sem's green sweater in a gym.** The cast trait is kept for consistency; a reviewer may accept a sweater over gym clothes or prefer a non-cast pupil described in three traits.
10. **verjaardag opinion.** "Vertel ook wat u van kinderfeestjes vindt" asks an opinion about parties in general; the model also mentions the learner's children. A learner without children can answer in general terms; the criterion accepts both.
11. **vakantie panel 3 is a campsite by a lake**, chosen so that Karim's grey jacket stays plausible. If the reviewer would rather see a beach, the jacket rule of `config/illustration.json` needs a note that outerwear may be absent on holiday panels.
12. **rijbewijs panel 3 shows a small pink card** for the licence. Dutch licences are pink credit-card sized; the card carries no text. If pink reads as an unknown object at display size, the alt text and model still work when the instructor simply shakes his hand.
13. **paspoort: the passport is a small dark-red booklet.** Dutch passports are dark red (bordeaux); no text or emblem is drawn. Some learners may narrate an ID card; the model says paspoort as the prompt does.
14. **Samples have no deliberate errors.** The catalogue's speaking samples are error-free short answers, so this batch follows them; batch 008's one-error convention applied to writing. If the feedback evaluation wants a speaking error per sample, typical candidates are a dropped inversion ("Dan ik ben thuis") or a wrong verb form ("hij gaat vertrekt").
15. **Register of the criteria.** Criteria say "u" as the exam instructions do, also where the cue speaker says "je" (ochtenddienst).
16. **Domain labels.** *afval* is labelled wonen-buurt (waste separation is a housing theme in KNM) and *ehbo* gezondheid; *sportschool-park* gezondheid rather than vrije-tijd-familie because the prompt is about moving more. Reassigning them changes only the counts.
17. **Starter merging.** As in batch 008, the starters are not merged into the hints overlay; see section 4.
18. **KNM batches 006 and 007** (fact cards, appeared during this authoring run) touch two of the same subjects: *gft* (gft waste separation) and *reisdocument* (travelling abroad). They are receptive fact items about rules; *afval* and *paspoort* here are productive tasks about what a person does, so they are not treated as duplicates.

## 6. Checker

`npm run batch:check content/batches/009-original.json`: "Checked 24 items, 0 questions. No failures, no warnings."

Author self-checks beyond the script: exactly one `null` quote per task; quotes verbatim in the samples; models 27–45 words; cues 16–21 words; every cast name in a brief matches `config/illustration.json` exactly (checked with the same `includes` test as `expandCast`); every criterion has one starter with an ellipsis; sentence-length heuristics of blueprint §10 (average under 12 words, none over 18) hold for every prompt, cue, sample and model; no prompt sentence is copied into a sample or model; slugs are unique in the batch and in the catalogue; all six cue roles exist in `config/voices.json`; domains 3 × 8; task types 6 × 4.

Not run, per the brief: `scripts/audio.ts`, `scripts/illustrate.ts`, integration.

SHA-256 of `009-original.json` at the time of writing: `17c77994f1abf3dd07cc982f8552200b5fa1c35d25629b6d6e76300cd2b6b732`.

## Coordinator revision after the editorial review (10 September 2026)

Applied from `content/reviews/009-review.md`. Required: the ochtenddienst still now shows blank sheets of paper instead of a paper calendar (a text object); the gymles brief is reduced to three activities (rope, ball, mat) and the model's "springt over een kast op een mat" becomes "springt op een mat" (38 words). Recommended edits taken in the same pass: kringloop "Er staan ook een lamp en een kast …"; abonnement "veel naar muziek"; alleen-samen "vind ik te stil"; the friend in the bioscoop sequence has fixed traits in panels 1 and 3 (a woman of her age, grey curly hair, green coat); the three non-cast cue speakers are labelled "de docent", "de huisarts", "de medewerker" for the clip caption. Criteria, samples, quotes, alt texts and starters are unchanged.

## Coordinator revision after the picture review (10 September 2026)

The generated kleermaker sequence drifted: the tailor was a woman in panel 2 (as briefed) but a man in panel 3, and Hasan's cap was missing in panels 1 and 2. Panel 3's brief now names "the same tailor (a woman with a measuring tape around her neck)"; panels 1 and 2 are redrawn from their unchanged briefs (`scripts/illustrate.ts --redo`). No other field changed.

## Coordinator revision after the level check (10 September 2026)

The level check found the rijbewijs sequence drifting in the generated pictures (a different instructor and car colour in panel 2). All three briefs now name the car ("small blue car") and the instructor with three fixed traits ("a man of about fifty, short grey hair, dark blue jacket"), following the sequence rule in `config/illustration.json`; the pictures are redrawn from the new briefs. No other field changed.
