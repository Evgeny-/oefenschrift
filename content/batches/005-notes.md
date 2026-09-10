# Batch 005: design notes (A2 Luisteren, twelve fragments)

Batch 005 contains twelve original A2 listening fragments with 28 closed questions, written to the shape of the DUO "Luisteren A2" exam as described in `content/blueprint.md` §4.2: a situation line, a script with voice roles, 30–90 seconds of spoken Dutch, two or three questions with three or four options. Every scenario, script, question and option was written for this project; official material was used for structure only. Audio does not exist yet: the scripts go to review first, and the `text` field is the exact join of the script turns that the audio pipeline will speak.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id (slug) | taskType | domain | Scenario | Q | Spoken words |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | training | gesprek | werk | A supervisor asks Karim to follow a forklift safety training; Tuesday is impossible, so Thursday | 3 | 114 |
| 2 | scherm | gesprek | winkels-diensten | Fatima has a phone screen repaired; price with and without a battery; the shop will e-mail, not call | 2 | 120 |
| 3 | tabletten | gesprek | gezondheid | Mevrouw Bakker collects blood-pressure tablets; new dose, what to do when she forgets, part of the box comes Thursday | 2 | 125 |
| 4 | feestje | gesprek | wonen-buurt | Roos tells her older neighbour about her housewarming; music until eleven, guests by bike | 2 | 119 |
| 5 | toets | gesprek | opleiding | Julio asks his teacher about next week's test: day, room, what may be used, how the result comes | 3 | 137 |
| 6 | parkeervergunning | voicemail | instanties | The gemeente asks for a missing copy of the kentekenbewijs for a parking-permit application | 3 | 132 |
| 7 | voetbal | voicemail | vrije-tijd-familie | Amina's football trainer: match moved to Sunday, white shirt, please confirm by message | 2 | 127 |
| 8 | bus | omroep | vervoer | Bus driver: line 12 skips the Stadhuisplein this week; get off at Markt; normal route from Saturday | 2 | 120 |
| 9 | winkelcentrum | omroep | winkels-diensten | Shopping-centre announcement: found coat, broken lift, closing times of shops, garage and bike shed | 2 | 107 |
| 10 | speelplaats | nieuws | wonen-buurt | Local radio: a new playground in the wijk, paid by the gemeente; volunteers report to the wijkcentrum | 2 | 125 |
| 11 | werkdag | uitleg | werk | A hotel team leader explains the first working day: clocking in, locker key, canteen, breaks, calling in sick | 3 | 148 |
| 12 | computercursus | reclame | opleiding | A library presents its computer course for beginners: day, group size, price, free with a stadspas | 2 | 153 |

Totals: 12 items, 28 questions (4 × 3, 8 × 2), 11 four-option questions (39%), 13 persona-scenario prompts, 4 purpose questions. Spoken length 107–153 words per fragment, roughly 45–75 seconds at the deliberate A2 pace.

## 2. Why each topic is not a duplicate

The existing A2 listening items are: tandarts voicemail, taalles buurthuis, marktomroep (market closes early), schoolreis voicemail, stationsomroep (platform change), bakker telefoon (order problem), zwembad uitleg (locker and closed pool). The batch avoids those settings and the other topics in blueprint §9.

1. **training** — work training day. Not a shift swap (B1 reading "dienst ruilen"), not a werkoverleg (B1 listening), not "te laat op het werk" (A2 speaking).
2. **scherm** — a repair at a phone shop. Not a bakery, bicycle shop or hairdresser; not the B1 writing "laptopreparatie duurt langer" (that is a complaint e-mail about a delay, this is the intake conversation with price and pick-up).
3. **tabletten** — instructions at the apotheek counter. The A2 speaking "apotheek" task asks the learner to ask for help; this is a receptive dialogue about dose, a forgotten tablet and a partial delivery. Not a dentist, not a new huisarts appointment.
4. **feestje** — a new neighbour announces a party. Not a parcel, ladder, key or plant; not the B1 "buurtfeest" (organising a street party).
5. **toets** — test rules in a language course. Not a missed course evening (B1 speaking), not a rooster conflict (B1 writing), not a course location.
6. **parkeervergunning** — a public body asks for a missing document. The KNM cards cover inschrijven, verhuizing and DigiD as facts; no existing item is a voicemail from the gemeente.
7. **voetbal** — a sports club calling a parent. The existing school voicemail is about a school trip; this is a match change from a club trainer with a kit instruction.
8. **bus** — a bus detour announced by the driver. The existing station announcement is a platform change for a train.
9. **winkelcentrum** — a shopping-centre announcement about a found item, a broken lift and closing times. The existing market announcement is about the market closing early because of wind; here the closing times are background and the questions ask for the pick-up place and the garage time.
10. **speelplaats** — a local news item. The A2 speaking "speeltuin" task is a warning at a playground gate; this is a news report about who pays for a new playground and where volunteers report. First `nieuws` item in the bank.
11. **werkdag** — a first-day briefing in a hotel. The existing uitleg is the swimming pool; "collega inwerken" (B1 speaking) asks the learner to propose better onboarding.
12. **computercursus** — a library presents a course. The existing "taalles buurthuis" is a short room announcement for a language lesson; this is a `reclame` with price rule and group size. First `reclame` item in the bank.

## 3. Voice roles

Roles come from `config/voices.json`; every conversation uses two different roles. Monologues are one turn because the checker requires two roles as soon as a script has more than one turn.

| # | Speakers → role | Why |
| --- | --- | --- |
| 1 | Leidinggevende → f-adult; Karim → m-adult | f-adult is the manager voice; Karim is in his thirties (cast), so m-adult rather than m-young. Female supervisor balances the male team leader in item 11. |
| 2 | Fatima → f-adult; Medewerker → m-shop | Fatima is in her forties (cast); m-shop is the only shopkeeper/repair voice. |
| 3 | Assistente → f-adult; Mevrouw Bakker → f-older | voices.json lists "huisarts assistant" under f-adult; mevrouw Bakker is about 65 (cast). Two female voices, but different roles and clearly different ages. |
| 4 | Roos → f-young; Meneer De Vries → m-older | Roos is a young woman, De Vries about 60 (cast); m-older is the older-neighbour voice. |
| 5 | Julio → m-young; Docent → m-adult | Julio is a young man (cast); a male teacher balances the female supervisor, assistant and gemeente clerk. |
| 6 | Medewerker gemeente → f-adult | receptionist/official register; female official to avoid all-male authority roles. |
| 7 | Trainer Lisa → f-young | a young volunteer trainer; friend/young-colleague voice fits the informal "hoi". |
| 8 | Chauffeur → narrator | narrator is the announcement voice; a driver's announcement in the bus. |
| 9 | Omroeper → narrator | announcement voice. |
| 10 | Nieuwslezer → presenter | presenter is the news voice. |
| 11 | Teamleider → m-adult | the uitleg is given by a person (a team leader), not by an organisation, so the manager voice rather than the presenter. |
| 12 | Presentator → presenter | company/organisation presentation. |

Role use across the batch: f-adult 4 items, m-adult 3, f-young 2, narrator 2, presenter 2, m-shop 1, f-older 1, m-older 1, m-young 1. All nine roles are exercised at least once.

The five conversations carry `notes` saying that the official exam may show such a conversation on video and that here it is audio (with one still where an `imageBrief` is given), as blueprint §4.2 asks.

## 4. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring; the competing detail is said elsewhere in the fragment. Rationales name the misunderstanding behind each distractor.

### 1 training

- **q1** time-place, key **B** "Op donderdag." — evidence "Dan doen we donderdag."
  - A "Op dinsdag.": the first proposal, withdrawn because Karim works at a client that day.
  - C "Vandaag.": the day the supervisor puts the training in the rooster, not the training day.
- **q2** advice (4 options), key **C** "Zijn werkschoenen." — "Je werkschoenen, want je gaat ook oefenen."
  - A "Zijn laptop.": explicitly "niet nodig".
  - B "Zijn lunch.": the company provides lunch ("voor de lunch zorgen wij").
  - D "Zijn certificaat.": he receives a certificate after the training; reversed direction.
- **q3** purpose, key **A** "Ze wil dat hij een training volgt." — "Er komt een training … Ik wil graag dat jij die volgt."
  - B "…dinsdag bij een klant werkt.": the client visit is Karim's own reason for not coming on Tuesday.
  - C "…zijn certificaat laat zien.": the certificate is the outcome, not the reason for the talk.

### 2 scherm

- **q1** quantity, key **A** "75 euro." — "Een nieuw scherm kost 75 euro."
  - B "110 euro.": the price with a new battery, which Fatima declines.
  - C "Niets, want er is garantie.": the warranty is over ("Dan is de garantie voorbij") because the phone is three years old.
- **q2** detail, key **C** "De winkel stuurt een e-mail." — "Ik stuur u een e-mail."
  - A "De winkel belt haar.": Fatima asks for a call, but calling is impossible because her phone stays in the shop.
  - B "Ze moet zelf de winkel bellen.": nobody proposes this; it reverses who contacts whom and ignores that her phone is in the shop.

### 3 tabletten

- **q1** rule-application (4 options), key **D** "De tablet later op de dag innemen." — "Neem de tablet dan later op de dag, met wat eten."
  - A "De volgende dag twee tabletten innemen.": the assistant forbids two at once ("nooit twee tabletten tegelijk"); the old dose was two per day.
  - B "De huisarts bellen.": the huisarts is called for a new prescription, not for a forgotten tablet.
  - C "Wachten tot donderdag.": Thursday is when the rest of the tablets are ready.
- **q2** time-place, key **B** "Donderdag." — "De rest ligt donderdag voor u klaar."
  - A "Vandaag.": today she gets only the part for two weeks ("Meer hebben we vandaag niet").
  - C "Over twee weken.": the length of time the first part lasts, not the pick-up day.

### 4 feestje

- **q1** time-place, key **B** "Tot elf uur." — "De muziek gaat om elf uur uit."
  - A "Tot acht uur.": the party starts at eight.
  - C "Tot twaalf uur.": at twelve everyone is gone; the music is already off by then.
- **q2** purpose, key **A** "Ze wil vertellen over haar feest." — "Ik kom even iets zeggen. Zaterdag geef ik een feestje…"
  - B "Ze wil klagen over de buren.": the neighbours on the other side are only mentioned to explain Friday's noise; no complaint.
  - C "Ze wil vragen of hij een auto heeft.": the car question is asked by meneer De Vries, and the guests come by bike.

### 5 toets

- **q1** time-place, key **A** "Op dinsdag." — "Nee, de toets is op dinsdag om negen uur."
  - B "Op donderdag.": the lesson day, which Julio assumes and the teacher corrects.
  - C "In juni.": the retake for whoever fails.
- **q2** rule-application (4 options), key **B** "Een woordenboek." — "Ja, een woordenboek mag."
  - A "Zijn telefoon.": must be switched off and in the bag.
  - C "Het boek van de les.": the test is about chapters of the book, but "Het boek zelf mag je niet gebruiken."
  - D "Zijn aantekeningen.": "blijven in je tas".
- **q3** detail, key **C** "Per e-mail." — "Na twee weken, per e-mail."
  - A "In de les.": explicitly excluded ("Ik zeg de uitslag niet in de les").
  - B "Per telefoon.": the phone is mentioned only as something to switch off.

### 6 parkeervergunning

- **q1** rule-application, key **B** "Tot acht uur." — "Op donderdag is de balie langer open, tot acht uur 's avonds."
  - A "Tot vijf uur.": the closing time on other days.
  - C "Tot negen uur.": nine is the opening time ("van negen tot vijf uur").
- **q2** time-place, key **C** "Als de vergunning klaar is." — "U betaalt pas als de vergunning klaar is."
  - A "Nu meteen.": reversal of "Betalen hoeft u nu nog niet".
  - B "Binnen twee weken.": the deadline for sending the document, not for paying.
- **q3** purpose (4 options), key **D** "Er mist nog een document." — "Maar wij missen nog één document: een kopie van het kentekenbewijs…"
  - A "De vergunning ligt klaar.": it is not ready; the application cannot even be completed yet.
  - B "Hasan moet nu betalen.": contradicted by "Betalen hoeft u nu nog niet".
  - C "De balie is donderdag dicht.": reversal; on Thursday the desk is open longer.

### 7 voetbal

- **q1** purpose, key **A** "De wedstrijd is op een andere dag." — "De wedstrijd is niet op zaterdag, maar op zondag om tien uur."
  - B "Amina heeft geen wit shirt.": she must wear her white shirt, so she has one; the shirt is an instruction, not a problem.
  - C "De training van woensdag gaat niet door.": reversal of "gaat gewoon door".
- **q2** advice (4 options), key **D** "Het witte shirt." — "Amina moet haar witte shirt aan, niet het blauwe."
  - A "Het blauwe shirt.": the shirt she must not wear because the other team plays in blue.
  - B "Een regenjas.": "niet nodig", it stays dry.
  - C "Een fles water.": water is available at the field ("Dat hoeft ze niet mee te nemen").

### 8 bus

- **q1** advice (4 options), key **B** "Bij de halte Markt." — "Wilt u naar het stadhuis? Stap dan uit bij de halte Markt."
  - A "Bij de halte Stadhuisplein.": the stop that is skipped this week.
  - C "Bij de halte Ziekenhuis.": the next stop after Markt, where the route becomes normal again.
  - D "Bij het station.": the destination of line 12.
- **q2** time-place, key **C** "Vanaf zaterdag." — "Vanaf zaterdag rijdt lijn 12 weer de gewone route."
  - A "Vanaf maandag.": the day the roadworks began.
  - B "Vanaf vrijdag.": the last day of the works ("tot en met vrijdag"), so the detour still runs on Friday.

### 9 winkelcentrum

- **q1** time-place, key **C** "Bij de informatiebalie." — "Dan kunt u hem ophalen bij de informatiebalie op de eerste verdieping."
  - A "Bij de ingang Noord.": where the coat was found, not where it is kept.
  - B "Bij de lift bij de ingang Zuid.": the alternative lift, unrelated to the coat.
- **q2** rule-application (4 options), key **B** "Tot half tien." — "Let op: de parkeergarage sluit om half tien."
  - A "Tot negen uur.": closing time of the shopping centre itself.
  - C "Tot tien uur.": tomorrow's opening time of the shops.
  - D "Tot half elf.": closing time of the bicycle shed.

### 10 speelplaats

- **q1** person, key **A** "De gemeente." — "De gemeente betaalt de nieuwe speelplaats."
  - B "De bewoners van de wijk.": the residents asked for the playground; they do not pay.
  - C "Basisschool De Vlinder.": the school's children only take part in the opening.
- **q2** advice (4 options), key **D** "Bij het wijkcentrum." — "Meld u dan bij het wijkcentrum aan de Vijverlaan."
  - A "Bij de gemeente.": the gemeente pays and looks for helpers, but the reporting point is the wijkcentrum.
  - B "Bij basisschool De Vlinder.": the school takes part in the opening only.
  - C "Bij de speelplaats.": the place of the opening, not a reporting point.

### 11 werkdag

- **q1** rule-application (4 options), key **A** "Voor zeven uur bellen." — "Bel mij dan voor zeven uur 's ochtends."
  - B "Een berichtje sturen.": explicitly discouraged ("Stuur geen berichtje").
  - C "Naar de receptie gaan.": the reception is for the locker key.
  - D "Naar de teamleider toe komen.": that is the advice for questions, not for sickness.
- **q2** time-place (4 options), key **D** "Op de eerste verdieping." — "De kantine is op de eerste verdieping, naast de keuken."
  - A "Naast de personeelsingang.": where the clock-in device hangs.
  - B "Bij de receptie.": where the locker key is collected.
  - C "In de kleedkamer.": where the work clothes are.
- **q3** detail, key **C** "Bij de receptie." — "De sleutel van je kastje haal je bij de receptie."
  - A "In de kleedkamer.": the locker itself is there, but the key is not.
  - B "Bij de teamleider.": the team leader is the contact for questions and sickness.

### 12 computercursus

- **q1** rule-application, key **C** "Niets." — "Hebt u een stadspas? Dan is de cursus gratis."
  - A "20 euro.": the price without a stadspas.
  - B "40 euro.": the price of the advanced course.
- **q2** quantity (4 options), key **B** "Tien." — "De groep is klein: maximaal tien mensen."
  - A "Acht.": the number of lessons.
  - C "Twintig.": the price in euro for beginners.
  - D "Veertig.": the price in euro for the advanced course.

## 5. Key balance and option counts

| Key | Count | Share |
| --- | --- | --- |
| A | 7 | 25% |
| B | 8 | 29% |
| C | 8 | 29% |
| D | 5 | 18% (of all 28; 5 of the 11 four-option questions) |

Three-option questions: 17 (61%); four-option: 11 (39%). No letter above 40%, A/B/C all above 20%. Within each item, no two questions share a key.

Skills: time-place 8, rule-application 6, advice 4, purpose 4, detail 3, quantity 2, person 1. No `picture` item in this batch; the still images below support the situation only.

## 6. Level and audio notes

- Sentence statistics from the checker's method (including the "Speaker:" prefix): average 5.2–8.6 words per sentence, longest sentence 10–17 words; all under the A2 targets (12 average, 18 maximum).
- Subordinate clauses only with omdat, als, dat, want/dus (coordinating), plus one indirect "of Amina komt"; present and perfect tense, one "Ik dacht dat … was" and one "Vroeger had u" in dialogue.
- Less common words are explained by context: heftruck (a training "veilig werken met de heftruck", the still can show it), kentekenbewijs ("van uw auto"), stadspas (gratis), speeltoestellen (klimtoestel, schommel, waterpomp).
- Numbers are written as digits where the pipeline normalises them ("75 euro", "lijn 12", "0345 12 34 56") and in words where a digit string could be read ambiguously ("zestigduizend euro", "half tien", "kwart over negen"). Two invented phone numbers, one invented gemeente (Rietburg), invented streets and organisations; Utrecht is the only real place name.
- Register: u between strangers and to officials (items 2, 3, 6, 7 to a parent, 8, 9, 12), je between colleagues, teacher and student, and in the team-leader briefing; Roos says u to her older neighbour.

## 7. Checker result

`npm run batch:check content/batches/005-original.json`: 12 items, 28 questions, keys {A:7, B:8, C:8, D:5}, options {3:17, 4:11}. No failures, no warnings. A six-word phrase comparison against `content/catalogue.json` found no overlap.

## 8. Image briefs

Four items carry an `imageBrief` (English scene, cast names expanded by `scripts/illustrate.ts`) and a Dutch `imageAlt`. None of the images answers a question.

- **2 scherm**: Fatima at the counter of a small phone repair shop handing over a phone with a cracked screen; a few phone cases on a shelf, no prices or signs. (Does not show the price or the e-mail.)
- **5 toets**: Julio at the teacher's desk in an empty classroom after the lesson, holding his bag, while an older male teacher listens; no clock, calendar or text on the board. (Does not show the day, the dictionary or the e-mail.)
- **10 speelplaats**: a small neighbourhood playground with a climbing frame, a swing and a water pump, a few children and parents; no sign, banner or clock. (Does not show who pays or where to report.)
- **12 computercursus**: four adults of different ages at a long library table with open laptops while a woman helps; bookshelves behind, no text on screens or posters. (Shows four people, not the group maximum; no price.)

## 9. Points for the reviewer

- Item 3 (tabletten): confirm that the generic pharmacy advice ("later op de dag innemen, nooit twee tegelijk") reads as a normal counter instruction and not as medical guidance the app endorses; the item is fiction and names no medicine.
- Item 6 (parkeervergunning): "kentekenbewijs" is the least common word in the batch; it is glossed as "van uw auto" and the questions do not depend on knowing the word beyond recognising it as the missing document.
- Item 10 (speelplaats): "wethouder" appears once as the person who opens the playground; no politics beyond that. Replace with "de burgemeester" if the reviewer prefers.
- Items 8 and 9 use the narrator voice for an in-vehicle and an in-building announcement; item 11 uses m-adult rather than presenter because the explanation is given by a named person.
- Item 12 dates the next course "dinsdag 6 oktober", which is a Tuesday in 2026.

## Coordinator revision after review (10 September 2026)

The review passed all items and asked, per blueprint §4.2, for a still on every conversation. Added `imageBrief` and `imageAlt` to training, tabletten and feestje (office, pharmacy counter, front door; none shows an answer-relevant detail) and aligned the toets brief with the m-adult voice ("a male teacher of about forty"). No other field changed. The checker still reports no failures and no warnings.
