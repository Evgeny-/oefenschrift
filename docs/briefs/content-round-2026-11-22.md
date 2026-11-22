# Content round, 22 November 2026

Evgeny asked for more exercises where the bank is scarcest. Text difficulty must be checked closely, above all at A1, because earlier A2 items carried B1–B2 words. Authors and reviewers are Sonnet sub-agents in separate contexts (blueprint §12).

## Where the bank is short

Production answers from 10 September to 21 November 2026 (read-only query of the live database):

| Part | Items | Most items one learner has done | Learners in the last 45 days |
| --- | --- | --- | --- |
| KNM | 104 | 104 (five learners), then 86, 71 | 29 |
| A2 listening | 61 | 37 | 19 |
| A2 reading | 67 | 43 (two learners) | 32 |
| A2 writing | 43 | 43 | 15 |
| A2 speaking | 83 | 59 | 10 |
| A1 reading / listening | 30 / 30 | 30 / 30 | 11 / 7 |
| B1 (all parts) | 116 | 11 | 1–5 |

KNM ran out first. It is also furthest from the launch target in `docs/research/exam-blueprints-2026-09-10.md`, which is 160 questions with every eindterm covered at least twice. A2 listening, reading and writing come next. B1 is small but barely used, so it waits.

## Plan

| Batch | Part | Items | Notes |
| --- | --- | --- | --- |
| 101 | A1 reading, step 2 | 6 new | 50–80 words, three questions, same A1 word list |
| 102 | A1 listening, step 2 | 6 new | 5–7 turns, 45–65 words, three questions |
| 103 | A1, all four skills | 28 revised | only hard words replaced; pictures kept |
| 104, 105 | A2 listening | 12 + 12 new | weighted toward nieuws, reclame and uitleg |
| 106 | A2 reading | 12 new | weighted toward krant, rooster, folder and advertentie |
| 107 | A2 writing | 8 new | weighted toward form, wijkkrant and picture-note |
| 108–112 | KNM | 14 + 13 + 13 + 13 + 13 new | every eindterm at least twice; theme 5 for the first time |

After this round the plan gives 170 KNM items, 85 A2 listening, 79 A2 reading, 51 A2 writing, and 36 A1 reading and 36 A1 listening.

The A1 step-2 trial follows the Sonnet length analysis of 22 November 2026, whose measurements are in blueprint §4.0. The KNM coverage audit is in `docs/research/knm-coverage-2026-11-22.md`.

## Rules every batch shares

- **Words.** A2 batches pass the A2 word gate in `npm run batch:check`: `config/a2-vocabulary.json` on top of the A1 list.
  - Titles, situations, prompts, questions, options, explanations, criteria, scaffolds, form labels, models, alts and starters use listed words only.
  - A reading text or listening script may hold one unlisted word per 50 words, when the context explains it and no question depends on it.
  - Authors never edit the list. Prefer the plain phrase: "de huur gaat omhoog", not "huurverhoging"; "vóór vrijdag", not "uiterlijk vrijdag".
  - If a scene cannot work without a missing everyday word, list it under "Requested words" in the notes.
  - A1 batches pass the A1 gate (`config/a1-vocabulary.json`).
  - KNM is outside the word gate because it tests terms of Dutch society, but everything around the term is A2 or simpler. The fact card explains the tested term in plain words, and no option uses a hard word that is not the subject of the question.
- **Sentences.** Follow blueprint §10 for A2 (average under 12 words, none over 18, simple subordinate clauses only) and §4.0 for A1. Difficulty comes from finding and combining details, never from vocabulary.
- **Realistic and interesting.** Every text, call, task or question is something a real organisation or person would send, say or ask, with a concrete purpose and believable details for 2026–2027. No absurd premises, no classroom role-plays, no messages to someone standing beside the writer. About one A2 item in eight may be lightly humorous, never silly. KNM items are never jokes.
- **Address.** Instructions, situations and questions address the learner with **u**. People inside a text use **je** or **u** as their relationship requires.
- **People.** Use the batch's name pool plus unnamed roles. A name appears in at most two items of a batch.
  - Never use the voice names (Roos, Lieke, Ruben, Daan, Ruth, Jerry, Robert, Arjen, Hanneke, Peter, Serge).
  - Never use the older recurring cast (Sem, Karim, Fatima, meneer De Vries, mevrouw Bakker, Julio, Amina, Modibo, Sabrina, Hasan).
  - A person drawn in more than one picture keeps the same three visual traits, copied verbatim into every brief.
- **Organisations.** Invented and plausible, and checked on the web (blueprint §13). Name real public bodies (gemeente, DUO, UWV, Belastingdienst, huisartsenpost, NS) only when the item is about them. No brand names; invented web addresses end in `.nl`.
- **Topics.** Use the assigned slug and premise. You may adjust details to make the premise more natural; record why in the notes. Follow the blueprint §9 avoid list.
- **Pictures.** One plain scene per picture in the house style.
  - Write the brief in plain English, at most about 60 words: the people (age, hair, one clothing colour), what they do, where, and the two or three objects that matter. Describe only what is there; the closing "No text." is the only exclusion.
  - Never ask for readable text, numbers, clocks, signs, logos or screens with content.
  - Closed-task stills and KNM pictures show the setting and never the tested fact. Open-task pictures show exactly the facts the criteria need.
  - The Dutch `alt` describes the picture; for closed tasks it does not reveal a key.
- **Audio.** Scripts and cues name roles from `config/voices.json`, with two different roles per conversation; never pair `m-adult` with `f-adult`. Spell numbers, times and prices out in words. No fillers.
- **Status.** `status: "draft"`, `targetLevelValidated: false`, and no media or derived fields.
- **Check.** `npx tsx scripts/batch-check.ts content/batches/<NNN>-original.json` must end without failures. Read every warning and record its judgement in the notes.

## KNM rules

These come from blueprint §4.5 and §5; the November rules come from learner data.

- `taskType: "feit"`. Each item has:
  - one question of at most twenty words with three options;
  - a fact card `text` of at most thirty words, shown after answering;
  - `theme`, `eindterm`, and `domain` (theme 1 werk, 3 wonen-buurt, 4 gezondheid, 6 and 7 instanties, 8 opleiding, 2 by subject);
  - one picture: `imageBrief` plus `imageAlt`, a drawing in the house style;
  - `sourceUrl`, `sourceNote` quoting the sentence that states the fact, and `sourceReviewedAt: "2026-11-22"`.
- **Sources.** Open the primary source today: rijksoverheid.nl, government.nl, inburgeren.nl, duo.nl, belastingdienst.nl, a ministry, or the responsible body. Test only what the page says now. Mark amounts or dates that change yearly "re-check yearly" in the notes; prefer facts that do not change.
- **Question forms.** Mix three forms: direct facts ("Wie …?", "Wat …?", "Wanneer …?"), persona facts ("Lina woont in een huurhuis. Wie …?") and a few yes/no items with a qualification. Learners score far lower on yes/no items, so keep them to two or three per batch.
  - Never ask a behaviour question ("Wat kan zij het beste doen?").
- **Distractors.** Every distractor is false as a statement about the Netherlands, not only as an answer to the prompt.
  - When the key is an exception or a condition, the prompt states that condition or asks for it.
  - No "nooit" or "altijd" distractor that a learner who knows the general rule would pick.
  - Options differ in exactly what the prompt asks.
  - Options are parallel in form and length, and the key is not the longest or most specific.
- **Explanations.** The explanation quotes or paraphrases the source and says why the tempting distractor fails, in A2 Dutch.
- **Keys.** Balance keys across the batch: no letter above 40%, none below 20%.

## Reviewer contract for this round

Use `docs/briefs/review.md` in full:
- the blind packet first (`npm run batch:review-source -- content/batches/<NNN>-original.json`), with its findings persisted;
- then the full item pass;
- then a proposed file with repairs, plus the review JSON and Markdown.

`content/reviews/085-review.json` shows the current JSON shape for A2 and A1, and `content/reviews/100-review.json` for KNM. `scripts/meaning-review.ts` is the gate. On top of the rubric:

- **Words.** Run the batch check and read every vocabulary warning. Replace any word a learner at the target level would not understand from its parts or the context, and flag listed words that are still too hard in context. For KNM, check every word outside the tested term against A2.
- **Facts (KNM).** Open every `sourceUrl` yourself today. Confirm that the page states the keyed fact and that each distractor is false in the Netherlands now. Correct the source or reject the item.
- **Realism.** Would this organisation or person really send or say this, with these details? Reject an item whose premise needs inventing, rather than rewriting it.
- **Exam shape.** Check lengths, question and option counts, persona and purpose questions, turn counts and spoken numbers.
- **Pictures.** Briefs follow the picture rule, and closed-task alts and stills reveal no key.
- **Bounded effort.** Make one careful pass, then re-check what you changed. Do not spawn other agents.

Write the files named in `docs/briefs/review.md`, with `review_contract_version: 2`, `reviewed_at` set to the current UTC time, and `limitations` including "AI editorial review does not validate CEFR difficulty or official exam equivalence."

## After review

The coordinator then:
- adopts each passing proposal (`npm run batch:adopt <NNN>`) and integrates (`npm run content:integrate`);
- adds practice sets;
- generates audio with `--keys` for exactly the new clips;
- draws pictures with the local Z-Image Turbo model (`docs/research/local-image-model-2026-11-05.md`) and reviews every one on a contact sheet before setting `reviewed: true`.

## Batches

### 101 — A1 step 2 reading, 6 new (`a1Step: 2`)

Follow blueprint §4.0: the simplified profile and "A1 step 2". Names: Femke, Omar, Rosa, Ivo, Sara, Dina (on the A1 name list and unused in A1 so far), plus unnamed roles. Two sets of three, each mixing domains. Exactly one item is lightly funny.

1. `zwemles-donderdag`, vrije-tijd-familie: the swimming school writes to a parent. This week the child's lesson is on Thursday, not Wednesday, at the same time. Bring a towel and a bottle of water. Parents wait in the café.
2. `bieb-tijden`, vrije-tijd-familie: a library notice written as lines: opening hours per day (closed on Sunday, late on Thursday), new children's books on the table at the door, and the free children's card.
3. `nieuwe-collega`, werk: the team leader writes to the team. A new colleague starts on Monday at nine. Someone shows her the kitchen and the lockers. On Friday there is cake at twelve.
4. `markt-buurvrouw`, wonen-buurt: a neighbour goes to the market on Saturday and asks what you need. She buys fruit and bread. Meet at ten at the front door, or text her before Friday.
5. `nieuwe-dokter`, gezondheid: the GP practice writes that a new doctor starts on the first of December. The practice stays in the same building. Call in the morning for an appointment; on Wednesday afternoon the practice is closed.
6. `menu-week`, opleiding: the canteen of a language school puts up the menu for the week as lines: a dish and a price per day, with soup on Friday. Questions ask which day, what and how much.

Each item has three questions on three facts from different sentences, with nine keys per set balanced three per letter where possible.

### 102 — A1 step 2 listening, 6 new (`a1Step: 2`)

Names: Nora, Joep, Saar, Mert, Timo, Aylin, Lena, Jonas, plus unnamed roles ("de kapper", "de juf"). Five to seven turns, 45–65 spoken words, three questions. Two distinct voice roles, never `m-adult` with `f-adult`. Exactly one item is lightly funny.

1. `kapper-bellen`, winkels-diensten: a phone call to the hairdresser. Saturday is full; Friday at four is free; a cut costs twenty euros.
2. `fiets-klaar`, vervoer: at the bike shop. The bike is ready on Thursday, the light is new, and it costs fifteen euros.
3. `juf-dierentuin`, opleiding: a parent and the teacher at the school door. On Friday the class goes to the zoo (or the woods, if "dierentuin" is not on the list), the children bring lunch, and they are back at three.
4. `nieuwe-buren`, wonen-buurt: a new neighbour introduces herself. She lives at number twelve with two children, works at the hospital, and invites you for coffee on Sunday.
5. `pauze-werk`, werk: a colleague explains the breaks. Lunch is at half past twelve in the kitchen, the coffee is free, and on Friday work ends at four.
6. `oma-jarig`, vrije-tijd-familie: a brother and sister plan their grandmother's birthday. It is on Sunday at two; he buys flowers and she brings a cake.

### 103 — A1 word revision (existing ids, no picture changes)

Rewrite only the words below under the existing ids. Keep every `images[].brief` byte-identical; an `alt` may change. Keep each sentence's meaning, and keep the question and key logic and the picture valid. Change as few fields as possible: a changed script, question prompt, option or speaking prompt means new audio.

- huismeester → "Leo van de flat" (reading `batch076-geen-water`, situation and signature).
- rit → "Hoe betaalt Zara in de bus?" (listening `batch078-bus-station`, q2 prompt).
- passen → a shop sentence without the verb, such as "Wat kost hij?" (listening `batch078-jas-passen`, script). The tested facts must stay.
- bewaren / bewaart → hebben or krijgen. Listening `batch078-buren-sleutel`: script, q1 prompt and explanation. Writing `batch074-reuzenbox`: prompt.
- ophalen → halen (reading `batch071-winkel-sok`, `batch075-nieuw-paspoort`, `batch076-pas-klaar`, `batch076-medicijn`).
- pinnen → "met uw pinpas betalen" (reading `batch076-kapper-zaterdag`).
- lekke band → "de band is kapot" or "de band is leeg" (writing `batch074-fietsfeest`, criteria and alt). Keep "kapot".
- rooster → "mijn werk" (reading `batch071-kat-werkt`).
- beterschap and grappig → plain list words (listening `batch078-kind-ziek`, `batch078-twee-schoenen`, script turns that no question tests).
- griep → drop or "koorts" (writing `batch082-ziek-les`, criterion).
- studenten → mensen (speaking `batch080-docent-bord`, prompt, model and criteria).
- "noemt … niet" → "zegt … niet" in every A1 explanation that uses it (listening; explanations are not narrated).
- "om … te" infinitive clauses in A1 writing prompts → a direct question, as in "Vraag Ravi: kom je spelen?". Writing prompts have no audio.

Keep "kapot", "kwijt", "toetje", "pinpas", "koelkast", "pleister" and "ballonnen". Evgeny counts plain everyday words as easy, and these are first-weeks words tied to their pictures.

### 104 — A2 listening, 12 new

Names: Anil, Margot, Bogdan, Chidi, Rami, Yvonne, Tobias, Khadija.
Types: gesprek 3, voicemail 1, omroep 2, uitleg 2, nieuws 2, reclame 2. Domains: werk 2, gezondheid 2, opleiding 2, instanties 2, wonen 1, vrije-tijd 1, winkels 1, vervoer 1. Humour: item 6.

1. `werkgesprek`, gesprek, werk. Margot (manager, `f-adult`) talks with Anil (`m-young`) at the garden-supplies shop where he has worked for six months. She is happy that he is on time and helps customers well. One thing must change: on Monday mornings the order list is not ready before the shop opens at nine, so he starts at eight on Mondays from now on. Anil asks for a course for the stock computer system: Thursday afternoons for four weeks, paid by the shop. Next talk in September. Tested: what goes well, what changes (Monday start 8:00, not 9:00 or Thursday), which afternoon the course is. VOCAB: avoid "functioneringsgesprek"; title "Een gesprek over uw werk"; "bestellijst", "cursus" fine.
2. `bril-kopen`, gesprek, gezondheid. Khadija is at the optician after an eye test: she needs reading glasses. The employee shows two frames: a blue one for 65 euro and a black one for 85 euro; the glasses (lenses) cost 45 euro extra for either; the glasses are ready on Thursday after two o'clock; she pays half now and half at pickup. Tested: price of the black pair with glasses (130), when ready, how she pays. VOCAB: "montuur" and "opticien" unlisted; say "een bril in het blauw of in het zwart", "de winkel voor brillen"; "glazen" only in the script, once.
3. `school-inschrijven`, gesprek, opleiding. Tobias (`m-young`) registers his daughter (turns four on 3 February) with the school secretary (`f-older`). She may start on her fourth birthday after two trial mornings; he brings her passport on the first visit; school is from 8.30 to 14.30, on Wednesday until 12.15; a tour for new parents is on Tuesday at nine. Tested: what to bring, Wednesday end time, tour day and time. Do not state leerplicht rules. One still: school entrance (no tested fact).
4. `schilderwerk-gang`, voicemail, wonen-buurt. Yvonne hears a message from the landlord (`m-adult`): a painter paints the shared hallway and stairs from Tuesday 9 to Thursday 11 March, 8.00-17.00; the paint stays wet, so please keep hands off the wall; bikes and pushchairs must leave the hallway by Monday evening and can stand in the bike shed; the hallway is cleaned on Friday; questions: phone (spelled out). Tested: which days, where bikes go, when it is cleaned. VOCAB: "kinderwagen" check; plain "verf", "nat".
5. `ontruimingsoefening`, omroep, opleiding. A language school announces over the speaker (`narrator`) an exercise today at eleven o'clock (not at quarter past eleven): a bell rings; everyone leaves by the stairs, not the lift, takes jacket and bag, and goes to the car park behind the building (not the bike shed in front); the teachers count the groups; after about fifteen minutes lessons go on; coffee in the canteen afterwards. Tested: time, exit and meeting place, what to take. VOCAB: "ontruiming", "alarm" unlisted; say "oefening: iedereen gaat naar buiten".
6. `bioscoop-later`, omroep, vrije-tijd-familie. HUMOUR. Cinema announcement (`narrator`): the film in zaal 4 starts at quarter past eight instead of five to eight because the projector must be restarted; everyone gets a free coffee or tea at the bar; popcorn is two for one until the film starts ("zo hebt u genoeg te doen"); the other halls are not affected. Tested: new time, what is free, which hall. One still: cinema foyer with a popcorn counter (no tested fact).
7. `zelfscan`, uitleg, winkels-diensten. A supermarket employee (`f-adult`) explains the new self-scan: take a handheld scanner at the entrance; scan each product and put it in your own bag; fruit and vegetables: choose on the screen; at the end hold the scanner on the pay machine and pay with a bank card only; for wine and beer an employee comes to check your age; sometimes an employee looks in your bag at the exit and that is normal. Tested: where to get the scanner, how to pay, what happens with wine. VOCAB: "zelfscan", "scannen" unlisted: questions say "het apparaat" and "de kassa"; one script word allowed.
8. `rookmelder`, uitleg, instanties. A fire-service employee (`m-adult`) at a residents' evening explains: have a smoke detector on every floor; hang it on the ceiling in the hall, not in the kitchen or bathroom (steam sets it off); press the button once a month to test; if it beeps every minute the battery is nearly empty and a new one costs about five euro; never cover it. Tested: where to hang it, how often to test, what a beep every minute means. VOCAB: "rookmelder" (compound, reported), "alarm" unlisted; questions say "het apparaat". Reviewer verifies the advice against brandweernederland.nl.
9. `gladde-wegen`, nieuws, vervoer. Radio news (`presenter`): tonight it freezes, minus four degrees at seven tomorrow; the gemeente puts salt on main roads and bus lanes from four in the morning; side streets and most bike paths get no salt, so cyclists take care; buses can be up to fifteen minutes late; schools are open as usual. Tested: where salt goes, what to expect from buses, what about schools. VOCAB: "gladheid", "strooien" unlisted; use "glad", "zout op de weg".
10. `gemeente-zaterdag`, nieuws, instanties. Radio news (`presenter`): from Saturday 6 February the town hall is open on the first Saturday of each month from nine to one for ID cards and passports, by appointment only (phone or website); on Thursday evening the counters stay open until eight. Not for other things (moving, parking). Tested: which Saturday, appointment needed, what is possible. Keep it distinct from `paspoort-klaar` (voicemail) and `identiteitskaart` (reading): this item is about opening hours.
11. `wandelgroep`, reclame, gezondheid. Radio advert (`presenter`) of an invented neighbourhood movement team (check the name): walking group every Tuesday and Friday at half past nine from the park entrance; about four kilometres, one hour, slow pace; coffee afterwards at the park café; free; any age; a volunteer walks in front; also when it rains; start 5 January. Tested: days and time, how long, cost. VOCAB: "wandelgroep" (compound, reported).
12. `radio-vacature`, reclame, werk. Radio advert (`presenter`) of an invented hotel (check the name): breakfast helpers wanted for Friday, Saturday and Sunday from half past six to eleven; 14 euro 50 per hour; no experience needed; a free breakfast on working days; come to the reception on Wednesday between two and four with a short CV, or phone (spelled out). Tested: which days, hourly pay, when to come. No e-mail addresses spoken aloud.

### 105 — A2 listening, 12 new

Names: Selin, Niels, Amara, Piotr, Sanjay, Karolina, Gloria, Teun.
Types: gesprek 3, voicemail 1, omroep 1, uitleg 3, nieuws 2, reclame 2. Domains: wonen 3, winkels 2, instanties 1, werk 2, gezondheid 1, opleiding 1, vervoer 1, vrije-tijd 1. Humour: item 11.

1. `energie-bellen`, gesprek, wonen-buurt. Selin (`f-adult`) phones her energy company (invented; `m-young` employee). From 1 March her monthly amount goes from 95 to 118 euro because she used more gas in the cold months. She may ask for a lower amount if she gives the numbers on her meter; she does that today in the company's app, not by phone; the new amount applies from the next month. Tested: new amount, from when, how to give the numbers. VOCAB: "voorschot", "meterstand", "tarief" unlisted: use "elke maand betaalt u", "de cijfers op uw meter".
2. `internet-kiezen`, gesprek, winkels-diensten. Niels (`m-young`) is in a shop of an invented internet provider (`f-adult`). Normal internet costs 32 euro a month, fast internet 42 euro; with a one-year contract the installation is free, without it 40 euro; a technician comes on Thursday between eight and twelve; he chooses normal internet with a one-year contract. Tested: price of the choice, installation cost, which day and part of the day. VOCAB: "modem", "wifi" unlisted; use "het apparaat voor internet".
3. `stadspas`, gesprek, instanties. Amara (`f-adult`) asks at the gemeente desk (`m-young`) for a stadspas: for people with little money; with it a swim costs 2 euro and children's sports lessons cost half; she shows her last payslip and an ID; the pass comes by post within ten working days and is valid until 31 December. Tested: what she must show, how long it takes, what swimming costs. Keep it neutral and respectful. Only one earlier item mentions a stadspas (a computer course advert).
4. `dienst-eerder`, voicemail, werk. Piotr hears a message from the team leader (`m-adult`): tomorrow (Wednesday) the shift at the warehouse starts at six instead of seven because a lorry arrives early; the end stays at three; bring safety shoes; phone back before eight tonight if you cannot (number spelled out). Tested: new start, end time, what to bring.
5. `ziekenhuis-lift`, omroep, gezondheid. Announcement in a hospital hall (`narrator`): because of work, the lifts at the main entrance do not work until Friday; use the lifts at the east entrance next to the café; the eye clinic is moved to the second floor; blood tests stay on the ground floor; wheelchairs are at the desk; the café closes at five. Tested: which lifts, which floor for the eye clinic, café time. VOCAB: "begane grond", "poli" check; use "beneden", "tweede verdieping". One still: hospital hall (no tested fact). Distinct from `ziekenhuis-parkeren` (parking news).
6. `ventileren`, uitleg, wonen-buurt. A housing-organisation employee (`f-adult`) at a welcome meeting for new tenants explains how to keep walls dry: open the windows wide for ten minutes in the morning and again in the evening; also while cooking and after a shower; do not dry washing in the bedroom; keep the doors of cold rooms closed; if black spots appear on the wall, wipe with a wet cloth and phone the landlord. Tested: how long and how often, where not to dry washing, what to do about black spots. VOCAB: "ventileren", "schimmel", "vochtig" unlisted: say "ramen open", "zwarte vlekken op de muur".
7. `school-app`, uitleg, opleiding. A teacher (`f-older`) explains the school app to parents on the first evening: messages from the teacher arrive in the app; report a sick child in the app before 8.15 (phone only if you have no app); homework for the week is in the app on Monday; the teacher answers within two days and not after eight in the evening. Tested: where to report illness and by what time, when homework appears, how fast an answer comes.
8. `ov-uitchecken`, uitleg, vervoer. An employee of an invented bus company (`m-adult`) explains paying with your bank card: tap the card on the reader when you step in and again when you leave; forget the second tap and you pay five euro; use the same card both times; children under four travel free; trouble: ask the driver. Fares are invented. Tested: when to tap, what a forgotten tap costs, who travels free. VOCAB: "saldo" unlisted; "bankpas" and "betalen" fine. Reviewer checks that the invented rule is not presented as the national OV rule.
9. `zorg-werkdag`, nieuws, werk. Radio news (`presenter`): on Saturday 6 March a care home (invented, check the name) holds an information day for people who want to work in care: ten to two, talk to employees, no diploma needed for some jobs and a paid course for those who start, free lunch, no registration, bus 5 stops at the door. Tested: date and time, what is free, whether you must register.
10. `buurtsuper-sluit`, nieuws, winkels-diensten. Radio news (`presenter`): the supermarket in the Kruisstraat closes on Saturday 30 January because the building will be taken down; a new, larger shop opens there in two years; meanwhile the supermarket on the Dorpsplein is open until nine instead of eight; people over 75 in the Kruisstraat get their groceries free at home for six months. Tested: closing day, new opening time at the other shop, who gets free delivery. Invent a different street name if the reviewer finds a clash with a real shop.
11. `verhuisbus`, reclame, wonen-buurt. HUMOUR. Radio advert (`presenter`) of an invented van-rental company: a van with driver's licence B for 59 euro a day, 49 euro Monday to Thursday; 100 kilometres included; ten moving boxes free; reserve by phone or online because weekends fill quickly; closing line: with the van your friends stay friends. Tested: price on a Tuesday, what is included, when it fills up.
12. `binnenspeeltuin`, reclame, vrije-tijd-familie. Radio advert (`presenter`) of an invented indoor playground: open every day from ten to six; children from one to twelve pay 6 euro 50, under one free, adults free; Wednesday afternoon from two o'clock children pay 4 euro; birthday party package 12 euro per child with pancakes; socks are required; café for parents. Tested: price Wednesday afternoon, what adults pay, what you must bring. VOCAB: "trampoline" unlisted, do not use.

### 106 — A2 reading, 12 new

Names: Samira, Lucas, Dmitri, Marit, Kwame, Naomi, Henrik, Dilan.
Types: krant 3, rooster 3, folder 3, advertentie 2, brief 1. Domains: werk 3, vervoer 2, opleiding 2, winkels 2, wonen 1, vrije-tijd 1, instanties 1. Humour: item 11. At least three texts with a table (all three roosters and the folders `open-dag-college` and `werk-via-bureau`). Per text two or three questions, 100-250 words, a persona question in every text, a `purpose` question in four or five texts, 60/40 three/four options, keys balanced (blueprint §4.1).

1. `parkeren-centrum`, krant, vervoer (or instanties). Dmitri reads in the town paper: from Monday 1 March you pay for street parking in the centre until nine in the evening instead of six; Sunday stays free; the first thirty minutes are free; the car park under the market costs 2 euro an hour and at most 9 euro a day; pay at the machine or in the app. Persona: Dmitri parks on Saturday at half past seven in the evening; does he pay? Purpose question: why does the paper write this. VOCAB: "parkeerautomaat" check, say "de automaat".
2. `banenmarkt`, krant, werk. Naomi reads in the neighbourhood paper: job fair in the community centre De Oever on Saturday 20 March, 10.00-15.00; free entrance; 25 employers (care, shops, a bus company, a hotel); free help with your CV at a table from eleven to one; bring three paper copies; ten-minute talks with employers; coffee free; play corner for children. Persona: Naomi arrives at half past one and wants help with her CV (too late: help stops at one). VOCAB: "banenmarkt" compound, reported.
3. `ijsbaan`, krant, vrije-tijd-familie. Henrik reads: open-air ice rink on the market square from Saturday 12 December to Sunday 3 January, daily 10.00-21.00; on 24 and 31 December until five; adults 6 euro, children 4 to 11 years 4 euro, under four free; skates 3 euro to rent; on Wednesday afternoon children pay 2 euro. Persona: Henrik goes on Saturday with his daughter (8) and his son (3) and rents skates for the daughter. VOCAB: "ijsbaan" reported; "schaatsen" unlisted, check whether it is needed; "schaatsen huren" in text only.
4. `werkrooster-winkel`, rooster, werk. Kwame is a shop employee; the rota for one week (table: day, Kwame, Dilan, Henrik with 8-16, 12-20 or free); whoever wants to swap tells the team leader before Thursday; on Saturday two people must work. Persona: Kwame has a birthday party on Saturday at seven in the evening; with whom can he swap (who works 8-16)?
5. `buslijn-weekend`, rooster, vervoer. Lucas reads the weekend timetable of invented line 12 (table: stop Station, Markt, Ziekenhuis, Zuidwijk, with departure times on Saturday and Sunday: Saturday first bus 7.40 and every thirty minutes, Sunday first bus 9.10, last bus Saturday 23.10, Sunday 21.40); on holidays the bus runs as on Sunday. Persona: Lucas must be at the hospital before ten on Sunday. VOCAB: avoid "dienstregeling"; title "Wanneer rijdt lijn 12?".
6. `tweedehandswinkel`, rooster, winkels-diensten. Samira reads the opening hours of an invented second-hand shop (table: Tuesday to Friday 10-17, Saturday 10-16, Sunday and Monday closed; bringing things: Tuesday to Friday 10-15 only, not on Saturday); pick-up of large items on Thursday only for 15 euro within the city, by phone; pay by bank card only; closed 24-26 December. Persona: Samira wants to bring a bookcase on Saturday (not possible; Thursday pick-up). VOCAB: "kringloop" unlisted: use "tweedehandswinkel".
7. `open-dag-college`, folder, opleiding. Dilan reads a folder of an invented vocational college (check the name) for the open day on Saturday 6 February, 10-15: table of programmes (care, technology, computers, hotel and restaurant) with a short try-out lesson at 10.30 and 13.30 and the room; entrance free; soup lunch 3 euro; come by bus 12, no parking; no registration needed. Persona: Dilan wants to try computers and care in one morning.
8. `werk-via-bureau`, folder, werk. Marit reads a folder of an invented work agency "Werkplan" (check the name): how to work through us: step table (1 register online with your ID and bank number; 2 a talk of thirty minutes at the office; 3 first job offer, contract per job; 4 payment every Friday, payslip online; 5 ill: phone the agency before nine and the company too). VOCAB: "uitzendbureau" unlisted: say "ons bureau voor tijdelijk werk" or "werk via ons"; "tijdelijk", "bankrekening" check. Distinct from `uitzendbureau` KNM card (a fact item); this is practical.
9. `energie-besparen`, folder, wonen-buurt. Henrik reads a gemeente folder with a table of tips and what each saves in a year (stove one degree lower about 100 euro; shower two minutes shorter about 50; LED lamps about 30; curtains closed in the evening about 20) and a free home visit by a volunteer (phone to register; a free pack with LED lamps). Amounts are "ongeveer" and invented; not a national claim. Persona: Henrik takes showers of ten minutes and wants to save about 50 euro. VOCAB: "thermostaat", "douche", "gordijnen" check; "radiator".
10. `huiswerkklas`, advertentie, opleiding. Marit reads an advert on the library notice board: homework class for children 10-14 on Monday and Wednesday 15.30-17.30 at the community centre; groups of eight; 30 euro per month; first lesson free; bring homework and a laptop if you have one (laptops available); register by e-mail. Persona: Marit's son is eleven and has football on Monday.
11. `klusjes-huis`, advertentie, winkels-diensten. HUMOUR. An invented handyman advert (opening line: the lamp that has stood on the cupboard for a year): hang a lamp 25 euro, put a cupboard together 35, hang curtains 20, paint a room 30 per hour; from three small jobs 10% off; travel free in the city; open Monday to Saturday 8-20; send a message or phone. Persona: Lucas needs a lamp, a cupboard and curtains (80, minus 10% = 72). VOCAB: "klusjes" unlisted: use "kleine werkjes in huis" in title/questions, "klus" once in the text; "in elkaar zetten" fine.
12. `digid-brief`, brief, instanties. Kwame has asked for a DigiD and receives the letter with the activation code (code not shown in full: "uw code staat hieronder"): you must activate within twenty days of the date on this letter; steps in the DigiD app or on the website; if the code is lost or too late, ask for a new one on the website; never give the code to anyone, also not to someone from the helpdesk who phones you. The reviewer checks "twintig dagen" and the advice against digid.nl on the day of review. VOCAB: "activeren" unlisted (cognate; allowed once in the text, not in questions: use "aanzetten", "gebruiken"). Purpose question: why does he receive this letter?

### 107 — A2 writing, 8 new

Names (for recipients and people in notes): Ioana, Mateo, Zainab, Wiebe, Nuria, Emre, Maud, Cem.
Types: email 2, form 2, wijkkrant 2, picture-note 2. Registers: formal 4 (item 1, both forms are formal documents, item 8), informal 2 (items 2 and 7), the two wijkkrant texts are neutral (three personal answers). Domains: wonen 2, instanties 2, vervoer 2, gezondheid 1, vrije-tijd 1.

Shared W rules: `rubric: a2-schrijven`, `model` of the §10 length (email 45-70 words in four to eight sentences, wijkkrant 25-45 words, form open fields one short sentence each, picture-note 20-40 words with one sentence per picture; checker accepts 20-90), `sample` that misses exactly one criterion with one or two typical learner errors, `quotes` verbatim (one null), criteria as bilingual pairs naming checkable information, starters in `NNN-starters.json` (one partial sentence per criterion, each containing "..."), printable rendering. The prompt does not copy sentences into sample or model. An email has at least one "Bedenk zelf ..." criterion.

1. `huisarts-zoeken`, email, gezondheid, formal. Scaffold: to the invented practice (check the name), subject "Inschrijven als nieuwe patiënt", "Geachte heer/mevrouw", closing. Situation: you moved last month and want to register with the practice for yourself and your child (six years). Criteria: say that you want to register and for whom; ask what you must bring (Bedenk zelf: one document or card); say which days and times suit you for a first visit; ask one more question (opening hours, phone number or parking: Bedenk zelf). Distinct from the existing tandarts form (nieuwe patiënt): this is an e-mail asking questions.
2. `brief-hulp`, email, instanties, informal. To a friend, Nuria. You received a letter from the gemeente that you do not understand; ask if she can help on Thursday evening after seven at your home; say what she should bring or you will have ready (the letter, a laptop); offer something in return (dinner or coffee); Bedenk zelf: say in one sentence what the letter is about (invent it). Salutation "Hoi Nuria".
3. `maandkaart-aanvragen`, form, vervoer. Application form of an invented bus company for a monthly pass. `formFields`: naam, adres, postcode, woonplaats, geboortedatum, telefoonnummer (personal, no real data); open: "Van welke halte naar welke halte reist u?", "Op welke dagen reist u?", "Vanaf welke datum wilt u de maandkaart?". One short sentence each. No images. The existing reading folder `stadsbus` is about tickets; this is the writing counterpart for a different company.
4. `straatfeest-aanvragen`, form, instanties. Request form of the gemeente to hold a street party: personal fields plus open fields: which street and which Saturday; how many people come; until what time there is music and what you do to keep it quiet (one sentence). No images. VOCAB: "evenement", "vergunning" check; say "feest in de straat".
5. `mijn-straat`, wijkkrant, wonen-buurt. Neighbourhood paper asks for a short text about your street. Three guiding questions: where do you live and with whom; what do you like in your street; what is missing or could be better. Opening line "Dit is mijn tekst over mijn straat." `minSentences: 3`.
6. `mijn-familie`, wijkkrant, vrije-tijd-familie. Neighbourhood paper series about families. Three guiding questions: who is in your family (names invented are fine); what do you do together on a free day; what is your favourite family moment or dish. Opening line "Dit is mijn tekst over mijn familie." The criteria accept invented answers; the app never asks for real personal data.
7. `fiets-lenen`, picture-note, vervoer, informal. A friend, Emre, borrows your bike this weekend; you leave a note on the table. Salutation "Hoi Emre". Three pictures (objects only, no people, no text): (1) a bicycle pump standing next to a front wheel; (2) a bicycle with a chain lock hanging on the frame and a small key on a hook next to it; (3) a bicycle standing in a garden shed with the door open. Criteria: pump the tyres, lock the bike, put the bike in the shed. Alts name the objects.
8. `huismeester-briefje`, picture-note, wonen-buurt, formal. A note for the caretaker of your building ("Geachte heer/mevrouw"): three things are broken. Pictures (no people, no text): (1) a kitchen tap with a drop hanging from the spout; (2) a hallway ceiling lamp with an empty socket and no bulb; (3) a letterbox with the flap hanging loose. Criteria: name each problem; say when you are at home; thank them. Distinct from `raam-kapot` (e-mail about a window): this is a note from pictures.


### A2 rules from the gap audit (apply to 104–107)

- **Words.** Batches pass the A2 word gate (`config/a2-vocabulary.json` on top of `config/a1-vocabulary.json`, `scripts/a2-vocabulary.ts`, run by `npm run batch:check`). Titles, situations, prompts, questions, options, explanations, criteria, scaffolds, form labels, models, alts and starters use listed words only. A reading text or listening script may hold one unlisted word per 50 words, when the context explains it and no question depends on it. Compounds of two listed words pass and are reported; use them only when an A2 learner sees the meaning from the parts. Authors never edit the list. Prefer the plain phrase ("de huur gaat omhoog", "vóór vrijdag"). If a scene cannot work without a missing everyday word, write it under "Requested words" in the notes; the coordinator decides. The plan flags each risky word with VOCAB below. Words checked on 22 November 2026 and NOT listed: zelfscan, scannen, ventileren, schimmel, vochtig, gladheid, strooien, kringloop, activeren, opticien, montuur, alarm, ontruiming, modem, wifi, tarief, uitzendbureau, saldo, stalling, verbouwing, trampoline, evenement, functioneren, poortje, account, maximum, portiek. Compounds that pass but are reported: rookmelder, maandkaart, stadspas, banenmarkt, ijsbaan, verhuisbus, wijkhuis, wandelgroep, straatfeest, nachtbus, binnenspeeltuin. Listed and safe: brandweer, bril, energie, abonnement, internet, code, huiswerk, app, oefening, trap, lift, spreekuur, loket, korting, kassa, lamp, kraan, brievenbus, rijbewijs, huren.
- **Sentences.** §10: average under 12 words, none over 18; subordinate clauses only with omdat, als, dat, wanneer, toen; present, perfect and simple future. Difficulty comes from finding and combining two details, never from vocabulary.
- **Realistic and interesting.** Every text, call or task is something a real organisation or person would send or say, with a concrete practical purpose and believable details (prices, times, dates in Dec 2026 - spring 2027). No absurd premises, no classroom role-plays, no messages to someone beside the writer, no "imagine you are...". Warmth or a mild surprise is welcome. Lightly humorous items are marked HUMOUR below (one in each of L1, L2, R; none in W); the rest is ordinary.
- **Address.** Instructions, situations and questions address the learner with **u**. People inside a text use **je** or **u** as their relationship requires.
- **People.** Use the batch's name pool below plus unnamed roles ("de teamleider", "de assistente"). A name appears in at most two items of a batch. Never use the voice names (Roos, Lieke, Ruben, Daan, Ruth, Jerry, Robert, Arjen, Hanneke, Peter, Serge) or the older cast (Sem, Karim, Fatima, De Vries, Bakker, Julio, Amina, Modibo, Sabrina, Hasan). The pools below also avoid every name in the 087-095 pools and every first name found in `content/` and `config/` on 22 November. A person drawn in more than one picture keeps the same three visual traits, copied verbatim in every brief and listed in the notes.
- **Organisations.** Invented, plausible and checked on the web (blueprint §13); two invented names in an earlier batch turned out to be real firms. Real public bodies (gemeente, brandweer, DigiD) only when the item is about them. No brand names (no "WhatsApp", "Bol", "Albert Heijn"). Web addresses end in `.nl` and are invented. Phone numbers are invented and written as in the exam ("0345 55 88 20"); in listening scripts spell them out digit by digit.
- **Facts about real procedures** (DigiD code letter, brandweer advice, bank-card payment on the bus): authors keep to what the real procedure says today or invent the organisation's own rule in a way that cannot be mistaken for the national rule; the reviewer opens an official source for any fact that matches a national rule (digid.nl, brandweernederland.nl) and records it in the notes.
- **Pictures** (listening stills, picture-note images). One plain scene per picture in the house style. English brief, at most about 60 words: people (age, hair, one clothing colour), what they do, where, and the two or three objects that matter; positive description only, closing "No text." Never readable text, numbers, clocks, signs, screens with content or logos; a screen, card or paper is "blank". Closed-task stills show the setting and never a tested fact. Open-task pictures show exactly the facts the criteria need. Dutch `alt` describes the picture; for closed tasks it does not reveal a key. A listening item gets a still only where the real exam would (shop, school, waiting room); most announcements, voicemails and radio items have none.
- **Audio.** Scripts name roles from `config/voices.json`; two different roles per conversation; never pair `m-adult` (Robert) with `f-adult` (Lieke). `narrator` reads announcements in stations, shops, schools and hospitals; `presenter` reads news items and advertisements. Numbers, times, prices and phone numbers in words in the script. No fillers ("eh", "nou ja"). Conversations have four to ten turns and 70-200 words; one-speaker items 70-170 words.
- **Questions.** Blueprint §5. Two or three questions per item; keys balanced per batch (no letter above 40%, none below 20%, no key three times in a row); the competing detail (the distractor) is said or written in the same item; no unrelated stocktaking added to make distractors. Never a distractor the text does not mention in some form.
- **Status.** `status: "draft"`, `targetLevelValidated: false`, no media or derived fields. Do not edit the catalogue, practice sets, hints, config or app code.
- **Check.** `npx tsx scripts/batch-check.ts content/batches/<NNN>-original.json` must end without failures. Read every warning: unlisted words in a text need a reason in the notes; reported compounds need a judgement ("transparent: ski + baan").


### KNM batches 108–112 (66 new items, from the coverage audit)

The coverage audit read the Regeling inburgering 2021, bijlage 2, on wetten.overheid.nl: 78 eindtermen in eight themes. Before this round, 13 eindtermen had no item (including all of theme 5) and 40 had one. These 66 items bring every eindterm to at least two, and the bank to 170.

The question ideas below are starting points. Write the final item from the source page you open today. Where an idea names an older character (Karim, Fatima, Hasan, Roos), use your batch's name pool instead.

KNM rules for this round, on top of "KNM rules" above:
- **Drawings only.** Every picture is a drawing in the house style, including theme 5: a dike, a flag, a monument, a calendar. Draw no maps with names and no real photographs.
- **Sensitive history.** For slavery, the Holocaust, domestic violence and child protection, keep the fact card factual and calm. No people in distress, no graphic detail.
- **Pick facts that last.** Prefer facts that do not change. Note the "check yearly" ones in the notes.
- **Reviewer judgement.** Where the plan says a mapping is loose or a quote is only partly confirmed, choose the best primary source or a better fact for the same eindterm, and explain it in the notes.

Name pools:
- 108: Lina, Yusuf, Marieke, Daniel, Fenna, Rachid, Ana, Wouter.
- 109: Iris, Mohammed, Sanne, Bilal, Esther, Kofi, Mariam, Thijs.
- 110: Hatice, Gerrit, Priya, Sven, Layla, Jeroen, Zeynep, Milan.
- 111: Fiona, Ahmed, Bente, Hugo, Rutger, Sofia, Tarik, Noa.
- 112: Mustafa, Lieve, Oscar, Hiba, Stijn, Rana, Willem, Ines.

Mix persona questions and direct questions. Not every item needs a named person.

#### 108 — KNM batch A: themes 1 and 3 (work and housing) (14 items; theme 1: 10, theme 3: 4)

**A1. `map-module`** - theme 1, eindterm 1.1.1, P1
- Fact: The MAP (Module Arbeidsmarkt en Participatie) is the inburgering module about working and looking for work, done at the gemeente.
- Question idea: Fatima volgt de MAP bij de gemeente. Waar gaat de MAP over? Key: werken en werk zoeken in Nederland. Distractors: wonen en huren; zorgverzekering.
- Source: <https://www.inburgeren.nl/examen-doen/inhoud-kennisexamens.jsp> - quote: "De MAP gaat over werken en werk zoeken in Nederland."
- Notes: Official DUO/inburgeren.nl page, read 22 Nov 2026.

**A2. `participatiewet-werk`** - theme 1, eindterm 1.1.1, P1
- Fact: The Participatiewet covers everyone who can work but cannot manage on the labour market without support; gemeenten are responsible.
- Question idea: Hasan kan werken, maar vindt zonder hulp geen baan. Onder welke wet valt hij? Key: de Participatiewet.
- Source: <https://www.rijksoverheid.nl/onderwerpen/participatiewet> - quote: "Iedereen die kan werken maar het op de arbeidsmarkt zonder ondersteuning niet redt, valt onder de Participatiewet."
- Notes: Law is being reformed ('Participatiewet in balans', changes 2026-2027); keep the name only. Check yearly.

**A3. `werknl-vacatures`** - theme 1, eindterm 1.1.2, P1
- Fact: On werk.nl (UWV) you can search vacancies, apply and request a benefit.
- Question idea: Karim zoekt een baan. Waar kan hij online vacatures zoeken en solliciteren? Key: op werk.nl.
- Source: <https://www.rijksoverheid.nl/vraag-en-antwoord/ww-uitkering/hoe-helpt-uwv-mij-bij-het-vinden-van-werk> - quote: "Op werk.nl kunt u vacatures zoeken, solliciteren en een uitkering aanvragen."
- Notes: werk.nl itself blocks automated fetching (HTTP 403); cite the Rijksoverheid page.

**A4. `kansrijke-beroepen`** - theme 1, eindterm 1.1.3, P1
- Fact: UWV publishes a yearly list of kansrijke beroepen (jobs with good chances) and a career-choice tool.
- Question idea: Roos zoekt een beroep met veel kans op werk. Welke organisatie publiceert daarvoor een lijst? Key: het UWV.
- Source: <https://www.uwv.nl/nl/arbeidsmarktinformatie/kansen-beroep/kansrijke-beroepen> - quote: "Met de beroepskeuzehulp kunnen mensen binnen hun regio zoeken naar banen met veel kans op werk."
- Notes: Do not name professions (the list changes yearly); check yearly.

**A5. `taal-doorgroeien`** - theme 1, eindterm 1.1.3, P1
- Fact: Weak Dutch at work has consequences for safety and for growth opportunities.
- Question idea: Karim spreekt weinig Nederlands op zijn werk. Wat kan dat voor hem betekenen? Key: minder kans om door te groeien in zijn werk.
- Source: <https://www.rijksoverheid.nl/themas/werk/arbeidsovereenkomst-en-cao/taalakkoord-taalvaardigheid-werknemers-verbeteren> - quote: "Dan kan dat bijvoorbeeld gevolgen hebben voor de veiligheid en duurzame inzetbaarheid op de werkvloer. En voor doorgroeimogelijkheden."
- Notes: Loose match to the eindterm's 'beheersing van de Nederlandse taal' factor; reviewer decides. Avoid the 750,000 figure.

**A6. `taaleis-leraar`** - theme 1, eindterm 1.1.6, P1
- Fact: An employer may require near-perfect Dutch when the job needs it (example: teacher of Dutch).
- Question idea: Een school zoekt een leraar Nederlands. Mag de school eisen dat de leraar heel goed Nederlands spreekt? Key: ja, dat is nodig voor het werk. Distractors: nee, dat is altijd discriminatie; alleen als de leraar in Nederland is geboren.
- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/gelijke-behandeling-op-het-werk/mag-een-werkgever-onderscheid-maken-tussen-sollicitanten> - quote: "Een werkgever mag bijvoorbeeld van een leraar Nederlands verlangen dat deze perfect Nederlands spreekt."
- Notes: Key is a justified exception: the prompt sets up the condition (the job needs it), per blueprint section 5.

**A7. `vog-gastouder`** - theme 1, eindterm 1.1.6, P1
- Fact: For some jobs a VOG (Verklaring Omtrent het Gedrag) is legally required, for example teachers, gastouders and taxi drivers.
- Question idea: Fatima wil gastouder worden. Welke verklaring is voor dat werk wettelijk verplicht? Key: een Verklaring Omtrent het Gedrag (VOG).
- Source: <https://www.justis.nl/service-contact/veelgestelde-vragen/vog/waarom-heb-ik-een-vog-nodig> - quote: "Voor sommige functies is een VOG wettelijk verplicht, bijvoorbeeld voor onderwijzers, gastouders en taxichauffeurs."
- Notes: Loose match to 'eisen aan competenties'; keep distractors as false statements (no other document is required by law for gastouders).

**A8. `diplomawaardering-idw`** - theme 1, eindterm 1.1.4, P1
- Fact: The government designated Nuffic and SBB to value foreign diplomas; IDW is the desk where you apply.
- Question idea: Sabrina heeft een buitenlands diploma. Via welk loket vraagt zij een diplomawaardering aan? Key: IDW (van Nuffic en SBB).
- Source: <https://www.nuffic.nl/studeren-en-werken-in-nederland/diplomawaardering-aanvragen> - quote: "De overheid heeft Nuffic en SBB aangewezen om diplomawaarderingen te maken. IDW is het loket voor onze diplomawaarderingen."
- Notes: Different fact from 006 diplomawaardering (what it is). Acronym IDW is hard at A2: consider 'Bij Nuffic of SBB'.

**A9. `herplaatsing-bijscholing`** - theme 1, eindterm 1.1.5, P2
- Fact: Before dismissal the employer must try to place the employee in another suitable job; this can mean retraining (omscholen, bijscholen).
- Question idea: Het werk van Julio verdwijnt. Wat moet zijn werkgever eerst proberen? Key: een andere passende functie voor Julio zoeken, eventueel met bijscholing.
- Source: <https://www.rijksoverheid.nl/onderwerpen/ontslag/vraag-en-antwoord/herplaatsing-voor-ontslag> - quote: "Dit kan betekenen dat uw werkgever u laat omscholen of bijscholen."
- Notes: Weak mapping to 1.1.5 ('belang van bijscholing'); first to cut. Avoid behaviour wording.

**A10. `bijstand-gemeente`** - theme 1, eindterm 1.1.7, P1
- Fact: Without a work history you apply for bijstand at the gemeente (not at UWV).
- Question idea: Karim is nieuw in Nederland en heeft nog nooit gewerkt. Hij heeft geen inkomen. Bij welke organisatie vraagt hij bijstand aan? Key: bij de gemeente.
- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/bijstand/waar-kan-ik-mijn-bijstand-regelen> - quote: "U kunt algemene bijstand aanvragen bij uw gemeente of via werk.nl."
- Notes: Do not use werk.nl or UWV as a distractor wording that is also true; use Belastingdienst, DUO. Pairs with 006 ww-uitkering (UWV).

**A11. `eerste-woning`** - theme 3, eindterm 3.1.1, P1
- Fact: The gemeente has the legal task to arrange housing for people who get a residence permit as refugee.
- Question idea: Hasan heeft een verblijfsvergunning als vluchteling. Welke organisatie zorgt voor zijn eerste woning? Key: de gemeente.
- Source: <https://www.rijksoverheid.nl/onderwerpen/asielbeleid/vraag-en-antwoord/zijn-gemeenten-verplicht-vergunninghouders-aan-een-woning-te-helpen> - quote: "Daarna moet de gemeente zorgen voor een woning, zoals een zelfstandige woning of huurwoning, of een gedeelde woning."
- Notes: Do not touch waiting times or numbers (change yearly; politically sensitive).

**A12. `meterstanden-verhuizen`** - theme 3, eindterm 3.2.1, P1
- Fact: When you move you pass on your meter readings (meterstanden) to the energy supplier within 5 working days.
- Question idea: Karim verhuist naar een ander huis. Wat geeft hij door aan zijn energieleverancier? Key: zijn meterstanden.
- Source: <https://www.consuwijzer.nl/energie/energierekening/eindafrekening/meterstanden-bij-verhuizing-overstap> - quote: "Dan moet u uw meterstanden binnen 5 werkdagen na uw overstap of verhuizing doorgeven."
- Notes: ACM ConsuWijzer is the consumer service of the Autoriteit Consument en Markt. Smart meters send readings automatically; keep the question generic.

**A13. `energie-voorschot`** - theme 3, eindterm 3.2.2, P1
- Fact: The termijnbedrag is a monthly advance on the annual bill (jaarafrekening).
- Question idea: Julio betaalt elke maand een termijnbedrag voor stroom en gas. Wat is dat? Key: een voorschot op de jaarafrekening.
- Source: <https://consument.acm.nl/elektriciteit-en-gas/wat-betaal-ik-voor-mijn-energie/termijnbedrag> - quote: "Het termijnbedrag is een voorschot daarop. (Het gaat om de jaarafrekening in de zin ervoor.)"
- Notes: Distinct from 006 energietarief (vast tarief).

**A14. `afval-verschil`** - theme 3, eindterm 3.3.1, P1
- Fact: Rules and methods for waste separation differ per gemeente; the national government is studying how to reduce the differences.
- Question idea: Roos verhuist naar een andere gemeente. Wat kan daar anders zijn? Key: de regels voor afval scheiden.
- Source: <https://www.rijksoverheid.nl/onderwerpen/afval/huishoudelijk-afval> - quote: "Ook onderzoekt de overheid momenteel of de verschillen in afvalscheiding tussen gemeenten kunnen worden verkleind."
- Notes: Milieu Centraal states it more directly ('Je gemeente kiest waar, hoe en wanneer je welk afval moet inleveren', https://www.milieucentraal.nl/minder-afval/afval-scheiden/bronscheiding-nascheiding-en-diftar/) but is a foundation, not a ministry.

#### 109 — KNM batch B: themes 1 (rest) and 4 (work, health) (13 items; theme 1: 4, theme 4: 9)

**B1. `vakbond-cao`** - theme 1, eindterm 1.2.2, P1
- Fact: A cao is concluded by employers (organisations) and employee organisations, mostly vakbonden, who represent employees.
- Question idea: Sem werkt in een bedrijf met een cao. Welke organisaties onderhandelen namens werknemers over de cao? Key: de vakbonden.
- Source: <https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao/vraag-en-antwoord/wat-is-een-cao> - quote: "werknemersorganisaties (meestal vakbonden)"
- Notes: Not a repeat of 006 cao ('what is a cao'); asks who. The 'wat doet een vakbond' wording was not found in a primary source.

**B2. `ww-premie-werkgever`** - theme 1, eindterm 1.2.3, P2
- Fact: The employer pays the premiums for the werknemersverzekeringen (WW, WIA) to the Belastingdienst; the rule has one exception (Whk share).
- Question idea: Sem werkt in loondienst. Wie betaalt voor hem de premies voor de WW aan de Belastingdienst? Key: zijn werkgever.
- Source: <https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/sociale_verzekeringen/premies_volks_en_werknemersverzekeringen/werknemersverzekeringen/hoe_betaalt_u_mee_aan_de_premies_werknemersverzekeringen> - quote: "De regel is dat uw werkgever of uitkeringsinstantie de premies werknemersverzekeringen betaalt."
- Notes: Close to 006 loonheffing; cut first if budget is 56. Prompt must say 'de regel' or ask about WW premium only because of the Whk exception.

**B3. `discriminatie-vakbond`** - theme 1, eindterm 1.3.1, P1
- Fact: With a suspicion of discrimination at work you can get legal advice from the Juridisch Loket or your vakbond, or help from an antidiscriminatiebureau.
- Question idea: Hasan denkt dat hij op zijn werk wordt gediscrimineerd. Bij wie kan hij juridisch advies vragen? Key: bij zijn vakbond.
- Source: <https://www.rijksoverheid.nl/onderwerpen/gelijke-behandeling-op-het-werk/vraag-en-antwoord/wat-kan-ik-doen-als-ik-ongelijk-behandeld-word-bij-een-sollicitatie-of-op-het-werk> - quote: "juridisch advies inwinnen, bijvoorbeeld bij het Juridisch Loket of bij uw vakbond"
- Notes: Avoid antidiscriminatiebureau/meldpunt as key (7.2.4 item 003 discriminatie already covers it).

**B4. `zzp-pensioen`** - theme 1, eindterm 1.4.1, P1
- Fact: A zzp'er has AOW but must arrange extra pension (oudedagsvoorziening) himself.
- Question idea: Roos werkt als zzp'er. Wie regelt haar extra pensioen naast de AOW? Key: zijzelf. Distractors: haar opdrachtgever; de gemeente.
- Source: <https://www.rijksoverheid.nl/onderwerpen/zelfstandigen-zonder-personeel-zzp/vraag-en-antwoord/zzp-pensioen> - quote: "U kunt daarnaast zelf uw oudedagsvoorziening aanvullen."
- Notes: A mandatory AOV is planned (about 2030) and the Zelfstandigenwet is changing: ask about pension only. Check yearly.

**B5. `huisarts-rekening`** - theme 4, eindterm 4.4.2, P1
- Fact: The huisarts's bill goes directly to the zorgverzekeraar (the insurer pays it).
- Question idea: Julio gaat naar de huisarts. Naar wie stuurt de huisarts de rekening? Key: naar de zorgverzekeraar.
- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/eerstelijnszorg/huisartskosten-op-zorgnota> - quote: "Uw zorgverzekeraar betaalt rechtstreeks de rekening van uw huisarts."
- Notes: Must differ from 006 eigenrisico (huisarts not counted against eigen risico): ask about who receives the bill, not the eigen risico.

**B6. `nota-zorgverlener`** - theme 4, eindterm 4.4.2, P1
- Fact: A bill received directly from a care provider: questions about it go to that provider; bills in 'mijn omgeving' go to the insurer.
- Question idea: Hasan heeft een rekening direct van zijn fysiotherapeut gekregen. Hij begrijpt een bedrag niet. Bij wie kan hij daarover terecht? Key: bij de fysiotherapeut.
- Source: <https://www.rijksoverheid.nl/onderwerpen/zorgverzekering/vraag-en-antwoord/zorgnota-controleren> - quote: "Heeft u een vraag over een rekening die u direct ontvangen heeft van de zorgverlener? Dan kunt u met uw vragen terecht bij de zorgverlener."
- Notes: Declareren is only named in the eindterm; the page speaks of rekeningen. Not a repeat of 006 zorgnota (online view at insurer).

**B7. `drogist-zonder-recept`** - theme 4, eindterm 4.1.2, P1
- Fact: Self-care medicines need no prescription and are sold at the drogist and other shops; prescription medicines only at the apotheek.
- Question idea: Sem heeft een verkoudheid en wil een medicijn zonder recept kopen. Waar kan dat? Key: bij de drogist. Distractors must be false: alleen bij de huisarts; bij het consultatiebureau.
- Source: <https://www.rijksoverheid.nl/onderwerpen/geneesmiddelen/vraag-en-antwoord/waar-kan-ik-medicijnen-kopen> - quote: "Voor zelfzorgmedicijnen heeft u geen recept nodig. Deze zijn ook bij de drogist of andere winkels te koop."
- Notes: Not a repeat of 006 receptmedicijnen (apotheek).

**B8. `tandarts-controle`** - theme 4, eindterm 4.1.3, P1
- Fact: Thuisarts advises one or two dental check-ups per year.
- Question idea: Hoe vaak is een controle bij de tandarts voor volwassenen gebruikelijk? Key: een of twee keer per jaar.
- Source: <https://www.thuisarts.nl/mond-verzorgen/ik-wil-mijn-tanden-goed-verzorgen> - quote: "Ga elk jaar 1 of 2 keer naar de tandarts voor controle."
- Notes: Thuisarts is run by the Nederlands Huisartsen Genootschap (NHG), a responsible professional body. Fills the 'regelmatig bezoek' bullet that 006 could not source.

**B9. `ggz-doorverwijzing`** - theme 4, eindterm 4.2.1, P2
- Fact: The huisarts can refer people with moderate to severe psychological problems to a care provider in the ggz.
- Question idea: Hasan heeft zware psychische klachten. Naar welke zorg kan zijn huisarts hem doorverwijzen? Key: naar een zorgaanbieder in de ggz.
- Source: <https://www.rijksoverheid.nl/onderwerpen/geestelijke-gezondheidszorg/psychische-hulp-huisarts-of-ggz> - quote: "kan mensen met matige tot zware psychische problemen doorverwijzen naar zorgaanbieders binnen de ggz"
- Notes: Close to 006 verwijsbrief (specialist); cut if budget is 56.

**B10. `spoed-huisartsenpost-eerst`** - theme 4, eindterm 4.3.1, P1
- Fact: Outside office hours you contact the huisartsenpost first, before going to the spoedeisende hulp, unless life is in danger (then 112).
- Question idea: Julio heeft zaterdag buikpijn, maar zijn leven is niet in gevaar. Wie belt hij eerst? Key: de huisartsenpost.
- Source: <https://www.rijksoverheid.nl/onderwerpen/eerstelijnszorg/vraag-en-antwoord/huisartsenpost-spoedeisende-hulp> - quote: "Neem altijd eerst contact op met uw huisartsenpost voordat u naar de spoedeisende hulppost gaat. Behalve bij een levensbedreigende situatie."
- Notes: The prompt must state 'geen levensgevaar' (condition rule). Different from 006 huisartsenpost (what it is).

**B11. `dossier-online`** - theme 4, eindterm 4.4.3, P2
- Fact: You can view your medical file online in your personal health environment (PGO) or at your doctor.
- Question idea: Sabrina wil haar medisch dossier bekijken. Waar kan dat online? Key: in een persoonlijke gezondheidsomgeving (PGO) / patientenportaal.
- Source: <https://www.rijksoverheid.nl/onderwerpen/rechten-van-patient-en-privacy/uw-medisch-dossier/mag-ik-mijn-medisch-dossier-inzien> - quote: "U kunt uw medisch dossier (online) inzien."
- Notes: PGO is jargon; use 'een patientenportaal'. Cut if budget is 56.

**B12. `toeslagen-servicepunt`** - theme 4, eindterm 4.4.4, P1
- Fact: Help with applying for toeslagen is available at toeslagenservicepunten (desks of Dienst Toeslagen and support points such as libraries and buurthuizen).
- Question idea: Meneer De Vries vindt toeslagen met DigiD moeilijk. Waar kan hij hulp krijgen? Key: bij een toeslagenservicepunt.
- Source: <https://www.belastingdienst.nl/wps/wcm/connect/nl/contact-met-dienst-toeslagen/content/hulpmiddel-adressen-toeslagenservicepunten> - quote: "U kunt ook bij de hulppunten terecht als u het bijvoorbeeld moeilijk vindt om uw toeslagen met DigiD te regelen."
- Notes: Do not use 'bibliotheek' as key (019 informatiepunt already keys it) and do not name the library as distractor.

**B13. `schuldhulp-gemeente`** - theme 4, eindterm 4.5.1, P1
- Fact: For help with debts you report to your gemeente (advice, schuldbemiddeling).
- Question idea: Sabrina heeft schulden en weet niet wat ze moet doen. Bij welke organisatie kan zij hulp krijgen? Key: bij de gemeente.
- Source: <https://www.rijksoverheid.nl/onderwerpen/schulden/vraag-en-antwoord/schuldhulpverlening-aanvragen> - quote: "Voor hulp bij uw schulden kunt u zich melden bij uw gemeente."
- Notes: Overlaps 006 wmo (key 'de gemeente'): vary key position and distractors; ask for hulp bij schulden, not Wmo.

#### 110 — KNM batch C: themes 5 and 7 (history and geography, state and law, part 1) (13 items; theme 5: 8, theme 7: 5)

**C1. `deltawerken`** - theme 5, eindterm 5.1.1, P1
- Fact: The 13 Deltawerken are the Netherlands' largest defence system against high water on the coast (storm surge barriers, dams).
- Question idea: Een foto van de Oosterscheldekering. Wat zijn de Deltawerken? Key: bouwwerken die Nederland beschermen tegen hoogwater en overstromingen.
- Source: <https://www.rijkswaterstaat.nl/water/waterbeheer/bescherming-tegen-het-water> - quote: "De bekendste waterkeringen zijn de 13 Deltawerken. Ze zijn Nederlands grootste verdedigingssysteem tegen hoogwater langs de kust."
- Notes: Photo (Wikimedia Commons, CC BY or CC BY-SA) allowed for a real place under blueprint section 7. Do not ask for the year (1953/1997) here.

**C2. `slavernij-afgeschaft`** - theme 5, eindterm 5.1.1, P1
- Fact: On 1 July 1863 slavery was formally abolished in the former Dutch colonies; the Nationale Herdenking Slavernijverleden is held on that date.
- Question idea: Op 1 juli is de Nationale Herdenking Slavernijverleden. Wat gebeurde er op 1 juli 1863? Key: de slavernij werd formeel afgeschaft in de koloniën.
- Source: <https://www.rijksoverheid.nl/themas/migratie-en-reizen/discriminatie-en-racisme/veelgestelde-vragen-herdenkingsjaar-slavernijverleden> - quote: "Op 1 juli 1863 werd de slavernij in de voormalige koloniën formeel afgeschaft."
- Notes: Say 'formeel' (state supervision lasted until 1873 for many people). No graphic image: monument or calendar only. Also touches 2.1.5 Keti Koti.

**C3. `holocaust-herdenking`** - theme 5, eindterm 5.1.2, P1
- Fact: On the last Sunday of January the victims of the Holocaust are commemorated in Amsterdam.
- Question idea: Wat herdenkt Nederland op de laatste zondag van januari? Key: de slachtoffers van de Holocaust. Distractors must be false: de bevrijding van Nederland (that is 5 May); de afschaffing van de slavernij (1 July).
- Source: <https://www.rijksoverheid.nl/onderwerpen/tweede-wereldoorlog/nationale-herdenkingen> - quote: "Op de laatste zondag in januari is de herdenking van de slachtoffers van de Holocaust in Amsterdam."
- Notes: Official exam content since 1 July 2025 (news item of 30 June 2025: 'wat de holocaust inhoudt'). Fact card should state in one plain sentence what the Holocaust was (persecution and murder of Jews, many of them Dutch Jews). Keep text non-graphic.

**C4. `gastarbeiders-jaren-zestig`** - theme 5, eindterm 5.1.2, P1
- Fact: In the early 1960s the Netherlands needed workers; people from Spain, Italy, Greece, Yugoslavia and later Turkey and Morocco came as gastarbeiders.
- Question idea: Karim vertelt over de gastarbeiders. Waarom kwamen veel mensen uit Turkije en Marokko in de jaren zestig naar Nederland? Key: om te werken.
- Source: <https://www.canonvannederland.nl/nl/page/368871/gastarbeiders> - quote: "Daarna kwamen ook mensen uit Turkije en Marokko. De meesten gingen werken in de industrie."
- Notes: Canon van Nederland is the Ministry of OCW's national history canon. Pages differ on dates; state 'jaren zestig' only.

**C5. `regering-den-haag`** - theme 5, eindterm 5.2.1, P1
- Fact: The Dutch government and parliament are seated in The Hague (Binnenhof); Amsterdam is the capital.
- Question idea: In welke stad is de regering van Nederland gevestigd? Key: Den Haag. Distractors: Amsterdam; Rotterdam.
- Source: <https://www.eerstekamer.nl/begrip/renovatie_binnenhof_en_de> - quote: "Op het Binnenhof in Den Haag zetelden de Eerste en Tweede Kamer, Raad van State en het ministerie van Algemene Zaken."
- Notes: Parliament is temporarily housed elsewhere in Den Haag during the Binnenhof renovation: ask for the city only. The Canon page 'Hoofdstad' (https://www.canonvannederland.nl/nl/page/443988/hoofdstad) says Amsterdam is the capital and the parliament sits in Den Haag. A single government page saying this plainly was not found.

**C6. `twaalf-provincies`** - theme 5, eindterm 5.2.1, P1
- Fact: The Netherlands has twelve provinces, the layer between Rijk and gemeenten.
- Question idea: Op de kaart staan de provincies van Nederland. Hoeveel provincies heeft Nederland? Key: twaalf. Distractors: acht; zestien.
- Source: <https://www.ipo.nl/over-het-ipo/over-provincies/> - quote: "Nederland telt twaalf provincies"
- Notes: IPO (Interprovinciaal Overleg) is the provinces' own association. Map picture; do not ask to name them in one item.

**C7. `ov-uitchecken`** - theme 5, eindterm 5.2.2, P1
- Fact: In the Dutch OV you check in and check out with an OV-chipkaart or bank card (OVpay).
- Question idea: Julio reist met een OV-chipkaart. Wat is in het Nederlandse openbaar vervoer nodig aan het begin en aan het eind van de reis? Key: inchecken en uitchecken.
- Source: <https://9292.nl/betalen-in-ov/inchecken-en-uitchecken/> - quote: "In Nederland werkt het hele OV met een systeem waarbij je in- en uitcheckt."
- Notes: 9292 is run by the Dutch public-transport operators; no ministry page was needed, reviewer may prefer ns.nl. Avoid minimum balances (change).

**C8. `reisplanner-9292`** - theme 5, eindterm 5.2.2, P1
- Fact: The 9292 reisplanner shows how to travel by bus, tram, metro and train.
- Question idea: Fatima wil weten hoe zij met bus en trein naar de stad reist. Welke reisplanner kan zij gebruiken? Key: 9292.
- Source: <https://9292.nl/> - quote: "Plan je reis met het OV en deelvervoer"
- Notes: Check that the key is not guessable from picture text; no logo in the picture (house style: no text).

**C9. `gelijk-loon`** - theme 7, eindterm 7.2.1, P1
- Fact: Employees doing work of equal value must receive equal pay; all parts of the pay count.
- Question idea: Roos en Karim doen hetzelfde werk in hetzelfde bedrijf. Mag Roos minder loon krijgen omdat zij een vrouw is? Key: nee, bij gelijkwaardig werk hoort gelijkwaardige beloning.
- Source: <https://www.rijksoverheid.nl/themas/werk/gelijke-behandeling-op-het-werk/regels-gelijke-behandeling-op-het-werk> - quote: "Alle medewerkers binnen een bedrijf moeten bij gelijkwaardig werk een gelijkwaardige beloning krijgen."
- Notes: The pay-transparency bill is in parliament (planned 2027); the equal-pay rule itself is stable.

**C10. `vrouw-directeur`** - theme 7, eindterm 7.2.1, P1
- Fact: Refusing a woman a job (e.g. director) only because she is a woman is direct discrimination and not allowed.
- Question idea: Een bedrijf zoekt een nieuwe directeur. Mag het bedrijf een vrouw weigeren alleen omdat zij een vrouw is? Key: nee, vrouwen en mannen moeten gelijk behandeld worden.
- Source: <https://www.rijksoverheid.nl/themas/werk/gelijke-behandeling-op-het-werk/regels-gelijke-behandeling-op-het-werk> - quote: "Bijvoorbeeld wanneer een vrouw hoort dat zij geen directeur wordt, omdat zij vrouw is. Direct onderscheid mag niet"
- Notes: Ensure the persona does not repeat 006 sollicitatie (origin). The page notes narrow legal exceptions: make the distractor 'ja, een bedrijf mag altijd kiezen' clearly false.

**C11. `eerste-kamer`** - theme 7, eindterm 7.1.1, P1
- Fact: The Eerste Kamer can only approve or reject a bill; it cannot change it. A bill becomes law only after the Eerste Kamer approves.
- Question idea: Er is een nieuw wetsvoorstel. Wat doet de Eerste Kamer ermee? Key: zij keurt het goed of af. Distractors: zij schrijft het hele voorstel opnieuw; zij kiest de koning.
- Source: <https://www.tweedekamer.nl/zo-werkt-de-kamer/de-tweede-kamer/staten-generaal> - quote: "De Eerste Kamer kan een wet alleen goedkeuren of afkeuren; ze kan het wetsvoorstel niet wijzigen."
- Notes: Tweede Kamer website. Not a repeat of 007 wetten (who makes laws).

**C12. `eu-meebeslissen`** - theme 7, eindterm 7.1.2, P2
- Fact: As a member state the Netherlands helps decide EU legislation and benefits from free movement of goods and capital.
- Question idea: Nederland is lid van de Europese Unie. Wat betekent dat voor de wetten van de EU? Key: Nederland beslist mee over de wetgeving van de EU.
- Source: <https://www.rijksoverheid.nl/onderwerpen/europese-unie/nederland-en-de-europese-unie> - quote: "Als lidstaat van de EU beslist Nederland mee over wetgeving van de EU."
- Notes: Cut if budget is 56. Vrij verkeer van personen is already tested by 007 europese-unie.

**C13. `rechter-beslist`** - theme 7, eindterm 7.1.3, P1
- Fact: When two parties disagree about the rules, the judge decides.
- Question idea: Twee buren hebben ruzie over een hek. Wie beslist als ze het niet samen oplossen? Key: de rechter.
- Source: <https://www.rechtspraak.nl/organisatie-en-contact/rechtspraak-in-nederland/democratische-rechtsstaat> - quote: "Als 2 partijen een conflict hebben over de regels, beslist de rechter."
- Notes: Rechtspraak.nl is the judiciary's own site. Not a repeat of 007 hoger-beroep. Distractor 'de politie' is wrong because the police enforce, they do not decide.

#### 111 — KNM batch D: themes 7 and 8 (rights, education and upbringing, part 1) (13 items; theme 7: 5, theme 8: 8)

**D1. `mening-voorwaarde`** - theme 7, eindterm 7.2.2, P1
- Fact: Everyone may say and write what they want, on condition that it is not against the law.
- Question idea: Roos wil op internet haar mening schrijven. Wat is in Nederland de voorwaarde? Key: het mag niet in strijd zijn met de wet.
- Source: <https://www.rijksoverheid.nl/themas/overheid-en-democratie/media-en-publieke-omroep/persvrijheid-bewaken> - quote: "Iedereen mag zeggen en schrijven wat hij wil. [...] Voorwaarde is dat het niet in strijd is met de wet."
- Notes: The prompt asks for the condition (blueprint section 5). Not a repeat of 007 meningsuiting (what is forbidden).

**D2. `geloof-kiezen`** - theme 7, eindterm 7.2.3, P1
- Fact: Article 6 of the Grondwet: you may change religion and you have the right not to follow any religion.
- Question idea: Hasan wil een andere godsdienst kiezen dan zijn familie. Mag dat in Nederland? Key: ja, iedereen mag zijn godsdienst kiezen en veranderen.
- Source: <https://www.rijksoverheid.nl/documenten/videos/2023/10/13/uitlegvideo-artikel-6-grondwet> - quote: "je van godsdienst mag veranderen en dat je het recht hebt geen godsdienst aan te hangen"
- Notes: Video transcript of BZK. Not a repeat of 007 godsdienstvrijheid (law above religion).

**D3. `geweld-thuis`** - theme 7, eindterm 7.2.6, P1
- Fact: Domestic violence consists of crimes such as physical and sexual violence; perpetrators can be prosecuted, even without a report from the victim.
- Question idea: Is geweld van een partner thuis in Nederland strafbaar? Key: ja, ook thuis is geweld strafbaar.
- Source: <https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/huiselijk-geweld/huisverbod-en-straf> - quote: "Plegers kunnen daar voor berecht worden."
- Notes: No persona, no description of violence. Another fact option: Veilig Thuis (helpline 0800-2000) as help.

**D4. `donor-vanaf-12`** - theme 7, eindterm 7.2.7, P2
- Fact: Children from 12 can fill in their own choice in the Donorregister; at 18 everyone gets a letter.
- Question idea: Vanaf welke leeftijd kan iemand zelf een keuze invullen in het Donorregister? Key: vanaf 12 jaar.
- Source: <https://www.donorregister.nl/uitleg-over-het-donorregister> - quote: "Vanaf 12 jaar kunnen kinderen een keuze invullen."
- Notes: Keep distractors at other ages (16, 18 are real thresholds elsewhere in the page: use 10 and 21 to be clearly false). Cut if budget is 56.

**D5. `zelfbeschikking-leven`** - theme 7, eindterm 7.2.8, P2
- Fact: Women in Netherlands decide freely about education, marriage and taking part in society; coercion is not allowed.
- Question idea: Wat betekent zelfbeschikking voor een vrouw in Nederland? Key: zij beslist zelf over haar opleiding, huwelijk en leven.
- Source: <https://www.rijksoverheid.nl/actueel/nieuws/2022/11/04/plan-bevordert-recht-op-zelfbeschikking> - quote: "dwang rond allerlei keuzes in het leven, zoals opleiding, huwelijk en deelname aan het maatschappelijk leven"
- Notes: Close to 007 zelfbeschikking (forced marriage). Cut if budget is 56, or ask about work/education choice instead.

**D6. `vve-peuters`** - theme 8, eindterm 8.1.4, P1
- Fact: Voorschoolse educatie (VVE) is for toddlers of 2.5 to 4 who benefit from extra support; 16 hours a week at a kinderopvang.
- Question idea: Amina is 3 jaar en praat nog weinig. Voor welk programma kan zij naar de kinderopvang? Key: voorschoolse educatie (VVE).
- Source: <https://www.rijksoverheid.nl/onderwerpen/voorschoolse-en-vroegschoolse-educatie/voorschoolse-educatie> - quote: "Voorschoolse educatie is voor peuters van 2,5 tot 4 jaar die baat hebben bij extra ondersteuning in hun ontwikkeling."
- Notes: Page is from the OCW topic; hours may change: leave hours out.

**D7. `bso`** - theme 8, eindterm 8.1.4, P1
- Fact: BSO (buitenschoolse opvang) is childcare for school-age children before and after school and in holidays; kinderopvangtoeslag is possible for registered BSO.
- Question idea: Sems zoon is 6 en zit op school. Waar kan hij voor en na school worden opgevangen? Key: bij de buitenschoolse opvang (BSO).
- Source: <https://www.rijksoverheid.nl/onderwerpen/kinderopvang/vraag-en-antwoord/soorten-kinderopvang> - quote: "Gaat uw kind naar een dagopvang of buitenschoolse opvang (BSO), dan kunt u mogelijk kinderopvangtoeslag krijgen."
- Notes: Do not use the 2026 hourly maximum (change yearly). 007 kinderopvangtoeslag uses a dagverblijf: keep it a different place.

**D8. `cjg-opvoedvragen`** - theme 8, eindterm 8.2.3, P1
- Fact: The Centrum voor Jeugd en Gezin (CJG) helps with questions about raising and developing a child.
- Question idea: Fatima heeft vragen over de opvoeding van haar zoon. Waar kan zij terecht? Key: bij het Centrum voor Jeugd en Gezin (CJG).
- Source: <https://www.rijksoverheid.nl/vraag-en-antwoord/jeugdhulp/hulp-vinden-voor-kind-4-18-jaar> - quote: "Het CJG helpt u bij vragen over opvoeden en ontwikkeling van uw kind."
- Notes: Avoid 'wat kan zij het beste doen'; ask 'waar kan zij terecht'. Local names differ (CJG, wijkteam): picture without text.

**D9. `kinderbescherming-kinderrechter`** - theme 8, eindterm 8.2.3, P1
- Fact: When there are serious worries about a child, the Raad voor de Kinderbescherming investigates and the kinderrechter decides whether a protection measure is needed.
- Question idea: Er zijn ernstige zorgen over de veiligheid van een kind thuis. Wie beslist of er een kinderbeschermingsmaatregel nodig is? Key: de kinderrechter. Distractors: de huisarts; de burgemeester.
- Source: <https://www.rijksoverheid.nl/onderwerpen/jeugdbescherming/maatregelen-jeugdbescherming> - quote: "De kinderrechter beslist of een kinderbeschermingsmaatregel nodig is."
- Notes: Sensitive but not graphic; no persona, no picture of a child in distress (use a courthouse or an empty room). Supports bullet 2 of 8.2.3 (kinderbescherming only intervenes in serious cases).

**D10. `bijzondere-school-betaalt`** - theme 8, eindterm 8.1.2, P1
- Fact: The government pays for both openbare and bijzondere schools if they meet conditions.
- Question idea: Sem gaat naar een katholieke basisschool. Wie betaalt de lessen op een bijzondere school? Key: de overheid. Distractor must be false: de kerk betaalt alles / de ouders betalen alle lessen.
- Source: <https://www.rijksoverheid.nl/themas/onderwijs/vrijheid-van-onderwijs/openbaar-en-bijzonder-onderwijs> - quote: "De overheid betaalt voor beide soorten onderwijs."
- Notes: Not a repeat of 007 bijzondere-school (what it is).

**D11. `diversiteit-les`** - theme 8, eindterm 8.1.5, P1
- Fact: Schools must pay attention to sexuality and sexual diversity because it is in the national kerndoelen; each school chooses how.
- Question idea: Moet een basisschool in Nederland aandacht besteden aan seksuele diversiteit? Key: ja, dat staat in de landelijke kerndoelen.
- Source: <https://www.rijksoverheid.nl/onderwerpen/gezondheid-en-preventie/seksuele-gezondheid/relationele-en-seksuele-vorming/veelgestelde-vragen-over-relationele-en-seksuele-vorming> - quote: "dit in de landelijke kerndoelen staat. Elke school doet dit op een eigen manier."
- Notes: Differs from 007 seksuele-vorming (relaties en seksualiteit): ask for diversiteit. The Rijksoverheid wording 'verplicht aandacht te besteden' is in the FAQ; reviewer re-reads.

**D12. `aansprakelijk-16`** - theme 8, eindterm 8.2.1, P1
- Fact: From 16 a child is liable for damage itself; below that the parents are liable.
- Question idea: Hasans zoon is 12 en breekt een raam van de buren. Wie is meestal aansprakelijk voor de schade? Key: Hasan, als ouder.
- Source: <https://www.rijksoverheid.nl/onderwerpen/schulden/vraag-en-antwoord/schulden-van-kinderen> - quote: "Is uw kind 16 jaar of ouder, dan is het zelf aansprakelijk."
- Notes: Rules for 14-15 differ (parents liable unless they supervised well): use age 12 or under. Not a repeat of 007 aansprakelijkheid (age 9): use a different damage and age 12.

**D13. `schoolreisje-ouders`** - theme 8, eindterm 8.2.2, P1
- Fact: Basisscholen often ask parents to help, for example with school trips or as reading parent (leesouder).
- Question idea: Amina's klas gaat op schoolreisje. Wie helpt de leraar vaak mee begeleiden? Key: ouders.
- Source: <https://www.rijksoverheid.nl/onderwerpen/basisonderwijs/vraag-en-antwoord/hoe-kan-ik-als-ouder-bij-de-school-betrokken-zijn> - quote: "De scholen doen vaak een beroep op de ouders. Bijvoorbeeld bij buitenschoolse activiteiten als schoolreisjes, of als leesouder."
- Notes: Easy end; place first in a drill. The page does not say 'vrijwillig' for this: do not ask that.

#### 112 — KNM batch E: themes 6 and 8 (institutions, school costs) (13 items; theme 6: 11, theme 8: 2)

**E1. `voedselbank`** - theme 6, eindterm 6.1.2, P1
- Fact: The Voedselbank provides free food to people who need extra help.
- Question idea: Hasan heeft weinig geld om eten te kopen. Waar kan hij gratis voedsel krijgen? Key: bij de voedselbank.
- Source: <https://voedselbankennederland.nl/> - quote: "Wij zorgen voor gezond en gratis voedsel voor iedereen die extra hulp goed kan gebruiken."
- Notes: Vereniging van Voedselbanken Nederland (non-profit). Do not state income limits (differ per local bank).

**E2. `nibud-geldzaken`** - theme 6, eindterm 6.1.2, P1
- Fact: The Nibud is an independent institute for household finances.
- Question idea: Sabrina wil onafhankelijke informatie over geld en uitgaven van gezinnen. Welke organisatie geeft die? Key: het Nibud.
- Source: <https://www.nibud.nl/over-het-nibud/missie-en-impact/> - quote: "Het Nibud is een onafhankelijk kennis en voorlichtingsinstituut op het gebied van huishoudfinanciën."
- Notes: Nibud is partly government-funded. Avoid amounts (reference budgets change yearly).

**E3. `gemeente-afvalheffing`** - theme 6, eindterm 6.2.4, P1
- Fact: The gemeente levies gemeentelijke belastingen, such as the afvalstoffenheffing.
- Question idea: Roos krijgt een aanslag voor de afvalstoffenheffing. Van welke organisatie komt die? Key: de gemeente. Distractor: de Belastingdienst.
- Source: <https://www.rijksoverheid.nl/onderwerpen/gemeenten/vraag-en-antwoord/welke-belastingen-heft-de-gemeente> - quote: "Voorbeelden van veelvoorkomende gemeentelijke belastingen zijn: afvalstoffenheffing; onroerendezaakbelasting (OZB)"
- Notes: Page from the Ministry of BZK. Do not give amounts (differ per gemeente and year).

**E4. `ozb-huiseigenaar`** - theme 6, eindterm 6.2.4, P1
- Fact: The onroerendezaakbelasting (OZB) is a gemeentelijke belasting paid by property owners.
- Question idea: Meneer De Vries heeft een eigen huis. Welke belasting betaalt hij aan de gemeente? Key: de OZB (onroerendezaakbelasting). Distractors: motorrijtuigenbelasting; inkomstenbelasting (both go to the Belastingdienst).
- Source: <https://www.rijksoverheid.nl/onderwerpen/gemeenten/vraag-en-antwoord/welke-belastingen-heft-de-gemeente> - quote: "onroerendezaakbelasting (OZB)"
- Notes: Check that the fact card says 'eigenaar' (the OZB for users of non-residential property is outside the question).

**E5. `afstand-nationaliteit`** - theme 6, eindterm 6.2.3, P1
- Fact: At naturalisation a person must in principle give up the original nationality (with exceptions).
- Question idea: Karim wordt Nederlander door naturalisatie. Wat moet hij in principe doen met zijn oude nationaliteit? Key: er afstand van doen.
- Source: <https://www.rijksoverheid.nl/themas/migratie-en-reizen/nederlandse-nationaliteit/dubbele-nationaliteit> - quote: "Daarom moet u bij naturalisatie verplicht afstand doen van uw oorspronkelijke nationaliteit, als dat kan."
- Notes: Prompt must say 'in principe' (exceptions exist); a bill for a new Rijkswet op het Nederlanderschap is pending (IND review of February 2026): check yearly. Distractor 'altijd houden' is false.

**E6. `netto-loon`** - theme 6, eindterm 6.3.1, P2
- Fact: Nettoloon is the amount you receive in your bank account after the employer withholds tax and premiums from the brutoloon.
- Question idea: Op de loonstrook van Sem staat brutoloon en nettoloon. Wat is het nettoloon? Key: het bedrag dat hij op zijn rekening krijgt.
- Source: <https://www.belastingdienst.nl/wps/wcm/connect/nl/jongeren/content/brutoloon-en-nettoloon> - quote: "Nettoloon is het bedrag dat je op je rekening ontvangt."
- Notes: Close to 006 loonheffing; cut first if budget is 56.

**E7. `belastinggeld`** - theme 6, eindterm 6.3.2, P1
- Fact: Tax money pays for care, benefits, education and safety.
- Question idea: Mensen in Nederland betalen belasting. Waarvoor gebruikt de overheid belastinggeld? Key: onder andere voor zorg, onderwijs en veiligheid. Distractors must be false: alleen voor het koningshuis; alleen voor wegen in het buitenland.
- Source: <https://www.rijksoverheid.nl/themas/belastingen-uitkeringen-en-toeslagen/belastingplan/achtergrond-belastingen> - quote: "Dankzij belastinggeld is er geld voor zorg, uitkeringen, onderwijs en veiligheid voor iedereen."
- Notes: Quote is from the Belastingdienst video text embedded on this Rijksoverheid page. No amounts.

**E8. `inkomen-doorgeven`** - theme 6, eindterm 6.3.3, P1
- Fact: If you have a toeslag and your income changes, you must report it to Dienst Toeslagen, otherwise you may have to pay back.
- Question idea: Julio krijgt zorgtoeslag. Zijn inkomen wordt hoger. Moet hij dat doorgeven aan de Belastingdienst? Key: ja, anders moet hij misschien geld terugbetalen.
- Source: <https://www.belastingdienst.nl/wps/wcm/connect/nl/werk-en-inkomen/content/mijn-inkomen-verandert-moet-ik-dat-doorgeven> - quote: "Ja, als u een voorlopige aanslag of een toeslag hebt. Zo voorkomt u dat u moet terugbetalen."
- Notes: Not a repeat of 019 zorgtoeslag (needs DigiD). Avoid income limits (change yearly).

**E9. `aangifte-diefstal`** - theme 6, eindterm 6.4.1, P1
- Fact: If a bike is stolen you report it to the police (by phone, online form or at the station); it then enters the bike-theft register.
- Question idea: Roos' fiets is gestolen. Bij welke organisatie doet zij aangifte? Key: bij de politie.
- Source: <https://www.rijksoverheid.nl/onderwerpen/fiets/vraag-en-antwoord/fiets-gestolen> - quote: "Doe aangifte bij de politie als uw fiets gestolen is."
- Notes: politie.nl blocks automated fetching (HTTP 403), so the Rijksoverheid page is cited. Easy end of the drill.

**E10. `ombudsman-gemeente`** - theme 6, eindterm 6.5.1, P1
- Fact: If you have a complaint about a gemeente, the Nationale ombudsman can look into it (if the gemeente is affiliated).
- Question idea: Karim heeft een klacht over de gemeente. Welke organisatie kan zijn klacht onderzoeken? Key: de Nationale ombudsman.
- Source: <https://www.nationaleombudsman.nl/vraag-en-antwoord/ik-heb-een-klacht-over-een-gemeente> - quote: "Staat uw gemeente er bij? Schrijf ons dan een brief of gebruik het klachtformulier."
- Notes: Some gemeenten have their own complaint body: say 'kan' in the key, not 'moet'. Not a repeat of 007 bezwaar (objection to a decision).

**E11. `avp-niet-verplicht`** - theme 6, eindterm 6.6.1, P2
- Fact: A private liability insurance (aansprakelijkheidsverzekering) is not mandatory but wise.
- Question idea: Is een aansprakelijkheidsverzekering voor een gezin verplicht? Key: nee, maar het is wel verstandig. Distractors: ja, altijd; nee, die bestaat niet.
- Source: <https://www.consumentenbond.nl/juridisch-advies/andere-onderwerpen/aansprakelijkheidsverzekering> - quote: "Een aansprakelijkheidsverzekering is niet verplicht, maar wel verstandig om af te sluiten."
- Notes: Consumentenbond (consumer organisation, updated 7 July 2026), not a ministry: reviewer should look for a Rijksoverheid or Verbond van Verzekeraars page. Not a repeat of 007 wa-verzekering (car). Cut first if the source is not accepted.

**E12. `schoolboeken-gratis`** - theme 8, eindterm 8.3.1, P1
- Fact: Many textbooks and materials in voortgezet onderwijs are free; the school provides them.
- Question idea: Sem zit in de brugklas van een middelbare school. Wie zorgt voor de meeste schoolboeken? Key: de school.
- Source: <https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/gratis-schoolboeken-voortgezet-onderwijs> - quote: "Verschillende studieboeken en lesmaterialen zijn gratis voor leerlingen op het voortgezet onderwijs. De middelbare school zorgt hier voor."
- Notes: Not free in mbo, vavo, particulier onderwijs: ask only about the brugklas. Not a repeat of 007 ouderbijdrage.

**E13. `kindpakket`** - theme 8, eindterm 8.3.2, P2
- Fact: Every gemeente supports low-income households, for example with a kindpakket (vouchers for clothes and swimming lessons).
- Question idea: Fatima heeft een laag inkomen. Bij welke organisatie vraagt zij hulp voor zwemles voor haar kinderen? Key: bij de gemeente.
- Source: <https://www.rijksoverheid.nl/onderwerpen/armoedebestrijding/vraag-en-antwoord/kan-ik-ondersteuning-voor-mijn-kinderen-krijgen> - quote: "Elke gemeente ondersteunt huishoudens met een laag inkomen. Bijvoorbeeld met een kindpakket."
- Notes: Overlaps 032 jeugdfonds (key 'de gemeente of een jeugdfonds'): cut first. Local offer differs.


#### KNM risks from the audit


- **Time-sensitive material (check yearly):** Participatiewet (reform 2026-2027), UWV kansrijke beroepen list, mandatory AOV and Zelfstandigenwet, naturalisation law (pending Rijkswet op het Nederlanderschap), loontransparantie bill, the Binnenhof renovation (parliament temporarily elsewhere in Den Haag), OV check-in details (OVpay), energy rules. No amounts, hours or tariffs are proposed.
- **Weak or loose eindterm mapping (reviewer should decide):** 1.1.3 `taal-doorgroeien`, 1.1.5 `herplaatsing-bijscholing`, 1.1.6 `vog-gastouder`, 6.6.1 `avp-niet-verplicht` (Consumentenbond only). Where no primary page states the fact plainly I said so in the item.
- **Overlap with existing items:** 4.5.1 and 8.3.2 with the 'de gemeente' key; 1.2.3 with 006 loonheffing; 6.3.1 with the same; 7.2.8 with 007 zelfbeschikking; 4.2.1 with 006 verwijsbrief. Authors should vary the distractors and the picture.
- **Key balance:** the proposal does not fix the key letters; the author should rotate them and the reviewer should check at most 40 per cent per letter per batch (blueprint section 5).
- **Sensitive topics:** slavery (5.1.1), Holocaust (5.1.2), domestic violence (7.2.6), child protection (8.2.3) are exam content but must be written without graphic detail, personas in distress or real photographs of people.
- **Level:** no claim of validated A2 difficulty or exam equivalence; the eindterm list is the only exam-derived input.

### Second A2 round (113 reading, 114 listening)

#### 113 — A2 reading, 12 new

Round 2 (after batches 104-107 and the 104-107 catalogue). Shared rules: section 3. The A2 bank before this batch: reading 79 (instanties 5, vervoer 6, gezondheid 8, wonen 9 are the thinnest domains; bericht 10, email 10, brief 10, regels 9 are the types this batch strengthens). Slugs checked on 22 November 2026 against every id in `content/catalogue.json` (all levels and parts) and every `content/batches/*-original.json`: none clashes.

Names: Wendy, Luka, Mirela, Hakim, Aisha, Oumar, Anton, Liam. (Checked against `content/`, `config/`, `app/`, `docs/briefs`: unused; not in any earlier pool, not a voice name, not the old cast.) A name appears in at most two items.
Types: bericht 3, email 2, brief 3, regels 2, krant 1, folder 1. Domains: instanties 3 (reading goes from 5 to 8), werk 2, opleiding 2, wonen 2, vervoer 1, winkels 1, gezondheid 1. Humour: item 3. Tables: items 1 and 12 (a table of days) and item 5 if the author wants it. Per text two or three questions, 100-250 words, a persona question in every text, a `purpose` question in four or five texts, 60/40 three/four options, keys balanced (blueprint §4.1). Avoid: apotheek/herhaalrecept, parkeervergunning, treinstoring, afvalpas (all exist); this batch's afval item is about holiday collection days, a reading text no earlier item covers.

1. `afval-feestdagen`, bericht, instanties. Wendy reads a gemeente notice: around Christmas the containers are emptied on other days. Friday 25 December is a holiday, so the paper container (normally Friday) is emptied on Saturday 26 December; the plastic container of Friday 1 January is emptied on Saturday 2 January; the green container (Thursday) is emptied as normal on 24 and 31 December; put containers out before half past seven; the recycling point is closed on 24, 25 and 26 December and on 31 December and 1 January, and open on Wednesday 30 December from nine to four. Persona: Wendy's paper container; a second question on the recycling point. VOCAB: "gft", "container" check (say "de groene container"); "grofvuil" unlisted, do not use.
2. `salaris-later`, bericht, werk. Luka reads a message from his employer to all staff: because of a problem in the payment system the March salary is paid on Thursday 1 April instead of Thursday 25 March; the payslip is online on the 25th as usual; anyone who needs money earlier for the rent can ask the team leader for 400 euro in advance before Friday 26 March; the problem will not come back in April. Persona: Luka pays his rent on 1 April. Purpose question. Distinct from `loonstrook` (a payslip error) in the writing and reading banks.
3. `luizen-controle`, bericht, opleiding. HUMOUR. Mirela reads a note from her daughter's school: on Wednesday 3 March parents check the children's hair from 8.15 to 9.00 in the hall; hair must be loose and dry, no gel; "no panic: lice come to every school, even to the best ones"; if the parents find lice the teacher phones the parent the same day; treat with shampoo from the drugstore and the child may come back the next day; a second check two weeks later. Persona: Mirela's daughter has long hair in a plait. VOCAB: "luizen" unlisted (cognate: "luis" is not guessable; allowed once in the text; titles and questions say "controle van de haren" or "kleine beestjes in het haar"); "shampoo", "drogist" check.
4. `kinderkaart`, email, vervoer. Hakim gets an e-mail from an invented regional bus company (check the name): children from 4 to 11 years travel for half price with a kinderkaart; children under 4 free; apply on the website with a photo of the child; the card costs 5 euro once and arrives within five working days; the card is valid until the twelfth birthday, after that the normal fare. Persona: his daughter turns twelve on 10 May; what does she pay on 11 May. Distinct from `ov-uitchecken` (L2, how to pay by bank card) and from the KNM item of the same name.
5. `garantie-koffiemachine`, email, winkels-diensten. Aisha gets an answer from the customer service of an invented household-goods shop (check the name): her coffee machine, bought eight months ago, no longer heats; the guarantee is two years, repair or a new machine is free; bring it with the receipt to the shop on the Kerkplein, Tuesday to Saturday 10-17; repair takes ten days, a new machine is given at once if it cannot be repaired; the guarantee does not cover a machine that fell or got wet. Persona: Aisha dropped the lid once (careful: the text must say a broken lid is not covered, the heating is). Purpose question. VOCAB: "garantie" check; "koffiemachine" compound passes.
6. `werkplein-afspraak`, brief, instanties. Oumar gets a letter from the gemeente's work desk ("Werkplein Zuid", invented; check the name; do not name UWV): appointment on Tuesday 9 March at 10.20 with an adviser; come ten minutes early; bring ID and your CV; if you cannot come, phone before Monday 8 March at twelve o'clock; if you are more than fifteen minutes late, you get a new appointment; the building is five minutes from the bus stop. Persona: Oumar is ill on Monday evening, when must he have phoned; and a purpose question. Distinct from the `cv-workshop` listening item (a workshop, explained by an adviser).
7. `geluid-klacht`, brief, wonen-buurt. Anton gets a letter from his landlord (invented housing organisation, check the name): neighbours reported loud music on three Saturday evenings after midnight; the house rules say quiet after ten on weekdays and after eleven on Friday and Saturday evenings; this is no warning yet, the organisation asks to talk to the neighbours; a free talk with a neighbourhood mediator is possible, phone on weekday mornings; if the noise goes on, a second letter follows. Persona: the time music must stop on a Sunday evening (weekday rule). Keep the tone neutral and polite; no accusation of crime. VOCAB: "buurtbemiddeling", "overlast" check; say "praten met de buren".
8. `school-geld`, brief, opleiding. Mirela gets a letter from the school about the parents' contribution: 40 euro per child per year, for parties, trips and extra material; it is voluntary, children whose parents do not pay still join everything; pay before 1 October to the school account or in two parts (20 euro before 1 October and 20 before 1 February); the contribution is not for books, those are free. Persona: two children, two parts, how much before 1 February. Purpose question. VOCAB: "ouderbijdrage" unlisted: write "geld voor feesten en uitjes".
9. `vakantie-regels`, regels, werk. Luka reads the rules for holiday days in the company: ask at least four weeks ahead in the staff app; the team leader answers within five working days; in July and August no more than two weeks in a row; at least two colleagues of your team must be at work; if you are ill during your holiday, tell the team leader the same day. Persona: Luka wants three weeks in July (not allowed in a row). Distinct from `vakantie-aanvragen` (listening gesprek) in the setting: written rules.
10. `fietsenschuur-regels`, regels, wonen-buurt. Liam reads the rules of the bike shed of his flat: each flat has two places; fix the sticker with your flat number on the bike (stickers at the caretaker's desk on Tuesday from nine to eleven); close the door after you; no scooters; bikes without a sticker are taken away after Monday 29 March; do not repair bikes in the shed. Persona: Liam has three bikes in the family.
11. `griepprik`, krant, gezondheid. Liam reads in the neighbourhood paper: the GP practice invites everyone aged 60 or older and people with a lung or heart illness for the flu shot; it is free; on Tuesday 5 October and Thursday 7 October in the community centre, from nine to twelve and from two to four, no appointment needed; bring the invitation letter and your ID; stay fifteen minutes afterwards. Persona: Liam is 63 and works on Tuesday mornings. Reviewer checks "60 jaar en ouder, gratis" against rijksoverheid.nl or the RIVM page on the day of review. VOCAB: "griepprik" compound, reported.
12. `wijkteam`, folder, instanties. Aisha reads a folder of an invented neighbourhood team (check the name, "Wijkteam Noord"): free help with questions about money, work, children and housing; they talk with you, help with forms and can visit you at home; you do not need a letter from a doctor; table of walk-in hours (Monday 9-11 community centre, Wednesday 14-16 library, Thursday 18-20 library); phone on weekdays 9-17; you may bring a friend. Persona: Aisha works Monday to Friday until five; which hour suits her (Thursday evening). VOCAB: "wijkteam" compound reported; "geldzaken" compound reported; "opvoeding", "schuld" unlisted (not needed: say "vragen over kinderen", "vragen over geld").

#### 114 — A2 listening, 12 new

The A2 listening bank before this batch: 85 (gesprek 24, voicemail 14, omroep 14, uitleg 13, nieuws 10, reclame 10). After: 97; gesprek 28, voicemail 17, omroep 16, uitleg 15, nieuws 11, reclame 10. Slugs checked as in section 10: none clashes. Topics that exist already and are therefore not repeated: vakantie-aanvragen, parkeervergunning voicemail, apotheek, fysio, tandarts, treinstoring, afvalpas, verhuisbus, schoolreis, woning bekijken, bezorging wasmachine (writing). The items below avoid the topics of batch R2 (afval feestdagen, salaris, luizen, kinderkaart, garantie, werkplein-afspraak, geluid-klacht, ouderbijdrage, vakantie-regels, fietsenschuur, griepprik, wijkteam).

Names: Naoual, Lenka, Floor, Ismail, Pavel, Sinan, Femi, Adriana. (Checked against `content/`, `config/`, `app/`, `docs/briefs`; unused; not in any earlier pool.) A name appears in at most two items.
Types: gesprek 4, voicemail 3, omroep 2, uitleg 2, nieuws 1. Domains: werk 3, opleiding 2, wonen 2, vrije-tijd 2, vervoer 1, winkels 1, instanties 1. Humour: item 7. Conversations have four to ten turns and 70-200 words; one-speaker items 70-170 words; two different roles per conversation, never `m-adult` with `f-adult`; no phone number or address spoken as an e-mail address; numbers, times, prices and phone numbers in words. Questions: two or three per fragment, keys balanced across the batch, one tested fact each with the competing detail in the same fragment (blueprint §4.2, §5).

1. `proeftijd-gesprek`, gesprek, werk. Floor (manager, `f-adult`) talks with Pavel (`m-young`) at the end of his first two months in the kitchen of a nursing home. She is happy: he gets a contract for one year, not for always; the pay stays 14 euro 20 an hour and goes up to 14 euro 80 after six months; he signs on Thursday 1 April at three o'clock in the office and brings his bank number and a copy of his ID; ask about holidays in the same talk (twenty days a year). Tested: what kind of contract and how long, when and where he signs, what he brings. VOCAB: "proeftijd" compound reported; say "de eerste twee maanden"; "contract" listed.
2. `sleutel-kwijt`, gesprek, wonen-buurt. Naoual (`f-adult`) phones the repair line of her landlord (`m-young`): she lost her keys yesterday on the bus. A new front-door key costs 15 euro, collect it at the office on Thursday between nine and twelve with ID; because her key ring has her street name on it, the landlord also changes the lock for 95 euro, unless she finds the keys before Thursday; she can ask a neighbour for a spare key until then. Tested: price of the key, collection day and time, when the lock is changed. Not a crime item: the keys are lost, not stolen. Distinct from the writing item `sleutel` (a found key).
3. `schap-prijs`, gesprek, winkels-diensten. Ismail (`m-young`) at a supermarket checkout (`f-adult`): three tins of tomatoes cost 2 euro 49 each on the receipt, but the shelf said 1 euro 99; the cashier checks: the offer ended on Sunday and the shelf label was not changed yet; the shop gives him the shelf price this time and he gets 1 euro 50 back; he asks to put a new label on the shelf. Tested: the price on the shelf, why the receipt differs, how much he gets back (3 x 50 cent). One still: checkout (no tested fact).
4. `fiets-weggehaald`, gesprek, instanties. Lenka (`f-adult`) phones the gemeente (`m-young`): her bike is gone from the pavement near the library. The gemeente took away bikes on Monday that stood in the wrong place; an orange label hung on them two weeks before; the bikes are at the depot on the Industrieweg, open Tuesday and Thursday from twelve to six; collect with ID and the key; it costs 12 euro; after three months the bikes are sold. Tested: why, when the depot is open, what she needs and pays. Not a theft item. VOCAB: "depot", "wegslepen" unlisted: say "meegenomen", "de plek waar de fietsen staan" and use "depot" once in the script.
5. `stage-bezoek`, voicemail, opleiding. Sinan (a student of a technical school, at an internship in a garage) hears the teacher (`m-adult`): the visit planned for Thursday moves to Friday 12 March at half past ten; thirty minutes with Sinan and his supervisor; bring the logbook and wear work clothes; phone the school if he is ill (number spelled out). Tested: new day and time, what to bring, what to do when ill. Distinct from the reading items `stagedagen` and `stagegesprek`.
6. `sollicitatie-terugbellen`, voicemail, werk. Adriana hears a message from Femi of a clothing chain (`f-young`): the shop-assistant job went to someone else; thank you for coming; but there is another job at the cash desk, weekends only, twelve hours a week, start on 1 April; phone back before Friday at twelve o'clock (number spelled out) and ask for Femi. Tested: why the call, what the new job is, the deadline. Keep the tone friendly and neutral.
7. `uitnodiging-etentje`, voicemail, vrije-tijd-familie. HUMOUR. Lenka leaves a voicemail for her friend Sinan (`f-adult`, informal): her birthday dinner is on Saturday 20 March at a restaurant (invented, check the name) at half past six, not seven; ten people; no presents; her father makes the cake ("he is not a baker, so come hungry and bring a strong stomach"); take the tram to the Havenplein; answer by message before Wednesday. Tested: time, how to get there, when to answer. The joke stays in the cake line only and needs no cultural knowledge.
8. `heftruck-veiligheid`, omroep, werk. Announcement in a warehouse (`narrator`) at the start of the day: from today the main aisle is for trucks only; walk on the yellow path along the wall; wear the yellow jacket in the whole hall; a truck beeps when it drives backwards; lunch for hall A is at half past twelve and for hall B at one o'clock. Tested: where to walk, what to wear, lunch for hall B. VOCAB: "heftruck", "hesje" unlisted: say "de wagens met de vork" (or "de heftruck" once); use "gele jas".
9. `pontje`, omroep, vervoer. Announcement on a small river ferry (`narrator`): today the ferry runs until half past six; the last crossing from the south side is at a quarter past six; this week only people and bikes, no cars because of work on the ramp; bikes stand at the front; a ticket costs 1 euro 50, pay by bank card only. Tested: last crossing, who may come on board, how to pay. VOCAB: "pont", "pontje", "veerboot" (compound reported) unlisted or compound: say "het bootje over de rivier"; one script word allowed.
10. `verhuizen-uitleg`, uitleg, wonen-buurt. A housing-organisation employee (`f-older`) explains to a tenant who will move out: cancel one month before the end, by letter or in the app; on the last day all rooms are empty and clean; hand over all keys, also for the mailbox and the bike shed, at an appointment at the office; write down the meter numbers and take photos of the rooms; the money paid at the start comes back within four weeks if everything is fine. Tested: when to cancel, which keys, how long for the money. Distinct from the writing item `huur` (e-mail to cancel) and the KNM card `meterstanden-verhuizen` (fact only).
11. `koor-nieuw-lid`, uitleg, vrije-tijd-familie. The leader of a neighbourhood choir (`m-older`) explains to new members: practice on Wednesday from eight to half past nine in the community centre; the first month is free, after that 8 euro a month; you do not need to read music; the sheet music is lent to you; there is a concert in June and coffee halfway the evening. Tested: day and time, price, what you need. VOCAB: "koor", "repetitie" unlisted: say "zangclub", "oefenen", use "koor" once.
12. `zomerschool`, nieuws, opleiding. Radio news (`presenter`): the gemeente organises a free summer school from Monday 12 to Friday 23 July, every morning from nine to twelve, for children of six to twelve who want extra practice with Dutch and reading; places for sixty children; register at your own school before 1 June; lunch is free. Tested: which weeks and hours, which children, the deadline. VOCAB: "zomerschool" compound reported (zomer + school).

### Reviewer notes for R2 and L3

Use section 8. Extra checks: (1) the lightly humorous items are `luizen-controle` and `uitnodiging-etentje`; the joke must work without cultural knowledge and without a hard word; (2) verify the real-world facts of `griepprik` (who is invited, that it is free) and that the invented rules in `werkplein-afspraak`, `school-geld` and `kinderkaart` are not presented as national rules; (3) search the web for every invented shop, restaurant, bus company, housing organisation and "Wijkteam Noord" name; (4) in L3 the three items about keys, depot and deposit must be distinct in setting from the existing items listed in the intro.
