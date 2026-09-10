# Batch 023: design notes (A2 Luisteren, nine fragments)

Batch 023 contains nine original A2 listening fragments with 26 closed questions, written to the shape of the DUO "Luisteren A2" exam as described in `content/blueprint.md` §4.2: a situation line, a script with voice roles from `config/voices.json`, 30–90 seconds of spoken Dutch, two or three questions with three or four options. The settings were assigned by the coordinator (a doctor's-assistant call about blood-test results, a primary-school study-day announcement, a station platform change, a job-centre CV workshop, a furniture shop's delivery service, a birthday-cake order, a sports-club voicemail about a cancelled training, a heat-wave news item, a pharmacy repeat prescription). Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and `text` is the mechanical join of the script turns as "Speaker: text" lines, so the evidence quotes and the audio pipeline work from the same string.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id (slug) | taskType | domain | Scenario | Q | Spoken words | ≈ seconds |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | bloedonderzoek | gesprek | gezondheid | Meneer De Vries calls the huisartsenpraktijk: the blood-test result is in, the assistant may not read it out, the doctor calls Thursday between two and three; a visit would be next Wednesday; no new test | 3 | 161 | 64–73 |
| 2 | studiedag | omroep | opleiding | The school director closes a parents' evening with an announcement: study day Friday 2 October, school closed, opvang open half acht to six, register at the opvang by Monday, not at school | 3 | 145 | 58–66 |
| 3 | spoor | omroep | vervoer | Station announcement: the sprinter to Leiden leaves from platform five instead of two, at half past three instead of quarter past; it terminates in Leiden, change there for Den Haag; the intercity to Amsterdam leaves as usual from platform three | 3 | 114 | 46–52 |
| 4 | cv-workshop | uitleg | werk | A werkplein adviser explains the workshop Een goed cv: two mornings, room four, bring your CV on paper and your diplomas, no CV needed, laptops provided, register at the desk by Friday, follow-up appointment | 3 | 151 | 60–69 |
| 5 | bezorgservice | reclame | winkels-diensten | Radio spot for Meubelhuis Tulpenveld: free delivery within twenty-five kilometres, twenty euro beyond, delivery days, a message the day before with the time, assembly thirty euro, old furniture taken away free | 2 | 158 | 63–72 |
| 6 | verjaardagstaart | gesprek | winkels-diensten | Roos orders a cake for her father's sixtieth: large cake for twelve at thirty-six euro, small for eight at twenty-four, text and chocolate, ready Saturday after eleven, ten euro deposit | 3 | 136 | 54–62 |
| 7 | turnles | voicemail | vrije-tijd-familie | Trainer Daan of turnvereniging Rietburg: Wednesday's training is cancelled (hall floor repaired), extra training Saturday ten to half past eleven in sporthal West, no registration, bring water, message rather than call | 3 | 141 | 56–64 |
| 8 | hitte | nieuws | gezondheid | Radio news: heat until Friday, GGD tips (two litres of water, stay inside between twelve and four, heavy work early in the morning, look in on older neighbours), extra water taps, pool open until nine, cooler Saturday | 3 | 150 | 60–68 |
| 9 | herhaalmedicijn | gesprek | gezondheid | Modibo collects a repeat prescription: different box, same medicine from another manufacturer; three months' supply; the prescription runs a year, so order three more times by phone or website when a week is left; after-hours pick-up from the afhaalkast with a code | 3 | 179 | 72–81 |

Totals: 9 items, 26 questions (8 × 3, 1 × 2), 9 four-option questions (35%), 12 persona-scenario prompts (at least one per item), 3 purpose questions. Spoken length 114–179 words per fragment, roughly 46–81 seconds at 2.2–2.5 words per second (the deliberate A2 pace of the chosen voices). Domains as assigned: gezondheid × 3, opleiding, vervoer, werk, winkels-diensten × 2, vrije-tijd-familie.

## 2. Sources and facts mirrored

No facts from official practice exams were used. The practical rules in the scripts are ordinary, generic Dutch practice and are stated as fiction:

- Doctor's assistants generally do not read out results themselves; a telephone consultation with the doctor is a common form (item 1). No medical detail is given: the fragment never says what the result is.
- Primary schools announce studiedagen with the children free and out-of-school care (BSO/opvang) available on registration (item 2). The dates are real calendar days in 2026: Thursday 1 October, Friday 2 October, Monday 5 October.
- Station announcements name platform, delay, terminating trains and transfers in the way NS does; Leiden, Den Haag and Amsterdam are real cities, the station itself is unnamed (item 3). No claim about real timetables.
- Werkplein is the generic name of the joint UWV/gemeente service points; the workshop, room and adviser are invented (item 4).
- Furniture shops commonly charge for delivery by distance and for assembly, and take old furniture away (item 5); the prices are invented.
- Bakeries take deposits on ordered cakes (item 6); the prices are invented.
- Sports clubs cancel training when a hall is closed and use another hall (item 7).
- Heat advice (drink two litres, stay in the shade in the early afternoon, look after older neighbours, extra public water taps, longer pool hours) mirrors the usual public heat-plan messages; "de GGD" is named as the body that gives such tips, without any specific GGD (item 8).
- Dutch pharmacies dispense the same medicine from different manufacturers, hold year-long repeat prescriptions, take repeat orders by phone or website two working days ahead, and offer after-hours lockers with a code (item 9). Whether the medicine costs the patient anything is deliberately not said (eigen risico varies).

Invented names, all checked on the web on 10 September 2026: **Meubelhuis Tulpenveld** (no such firm; "Tulpenveld" only occurs as a street and a holiday-house name), **turnvereniging Rietburg** (no such club; Rietburg is a castle ruin in Germany, not a Dutch place, and batch 005 already uses "gemeente Rietburg" as an invented municipality). Other names are generic: sporthal West, Beukenlaan, Industrieweg, het stadspark. The huisartsenpraktijk, school, bakery and pharmacy are unnamed. First names: Ellen (assistant), Ruben (adviser), Daan (trainer); personas from blueprint §8 and the illustration cast: meneer De Vries, Fatima and Amina, Farah, Sem, Sabrina, Karim, Roos, Hasan, Julio, Modibo.

## 3. Why each setting is not a duplicate

The A2 listening items in the catalogue and blueprint §9 are: tandarts voicemail, taalles buurthuis, marktomroep, schoolreis voicemail, stationsomroep (trein), bakker telefoon, zwembad uitleg, and batch 005 (training, scherm, tabletten, feestje, toets, parkeervergunning, voetbal, bus, winkelcentrum, speelplaats, werkdag, computercursus). Sibling batch 022 takes a garage call, a daycare voicemail, a supermarket announcement, a bicycle-bridge news item, a coffee-money explanation, a language-café spot, a ticket-counter conversation, a passport voicemail and a parcel conversation; none of those subjects is touched here.

1. **bloedonderzoek** — a call about a result being ready. The existing tandarts voicemail is a one-line appointment reminder; the reading item `batch004-bloedprikken` is a rooster of prikpost locations. This is the follow-up call: who tells the result, when, and whether a visit or a new test is needed.
2. **studiedag** — a school announcement about a day off and the opvang rule. The schoolreis voicemail is about a trip (times, what to bring); the B1 speaking "medicijn-school" is unrelated. First `omroep` in a school setting.
3. **spoor** — the coordinator assigned a platform change; the existing `batch002-trein` (12–21 s, slated for rewriting per `docs/research/exam-blueprints-2026-09-10.md`) is a single fact (platform seven, time unchanged). This fragment combines a platform change with a delay, a terminating train and a transfer rule, and its persona questions require picking the right train among three. The slug differs (spoor). Flagged in §9 as the closest neighbour.
4. **cv-workshop** — a job-centre explanation. Existing work items are a forklift training (gesprek), a first working day (uitleg), a werkoverleg (B1); the KNM `sollicitatie` card is about discrimination. No existing item is about writing a CV.
5. **bezorgservice** — a shop presenting its delivery service. The writing task `batch008-bezorging` asks the learner to move a washing-machine delivery date; here the learner listens to the shop's rules (distance price, days, message, assembly, old furniture). Second `reclame` in the bank.
6. **verjaardagstaart** — ordering at the counter. The existing `batch002-bakker` is a voicemail from the bakery about a problem with an order (missing strawberries); this is the intake conversation with size, price, text, flavour, pick-up time and deposit. The A2 speaking "verjaardag" is a picture description of a children's party.
7. **turnles** — a club cancels a training and offers a replacement. The `batch005-voetbal` voicemail moves a match to Sunday and gives a kit instruction; here the training is cancelled, the replacement is in another hall, and the contact rule (message, not call) is tested. The writing form `batch008-sportclub` (Sem joins sportclub De Sprong) is a form-filling task.
8. **hitte** — a health news item (needed per §9: health). The `batch005-speelplaats` news item is about a playground; no existing item is about weather or public health advice.
9. **herhaalmedicijn** — a repeat prescription at the counter. The `batch005-tabletten` conversation is about dose instructions and a partial delivery; the reading letter `batch004-herhaalrecept` announces that counter orders stop and gives the website/app route. This conversation covers what those do not: a different box from another manufacturer, a year-long prescription without a doctor's visit, when to order, and after-hours pick-up from a locker. The slug avoids the catalogue slug `herhaalrecept`.

A six-word phrase comparison of the spoken scripts against every `text` and `prompt` in `content/catalogue.json` found no overlap (two generic phrases that did overlap in the first draft were reworded).

## 4. Voice roles

Roles come from `config/voices.json`; every conversation uses two different roles; monologues are one turn.

| # | Speakers → role | Why |
| --- | --- | --- |
| 1 | Assistente → f-adult; Meneer De Vries → m-older | voices.json lists "huisarts assistant" under f-adult; meneer De Vries is about 60 (cast), the m-older voice. |
| 2 | Directeur → f-adult | The announcement is spoken by a person to a room of parents, so the teacher/manager voice rather than the omroep voice; noted in the item's `notes`. |
| 3 | Omroeper → narrator | Station announcement, the announcement voice. |
| 4 | Adviseur → m-adult | An explanation by a named person (as batch 005 did for the team leader), the manager/interviewer voice. |
| 5 | Presentator → presenter | Company presentation. |
| 6 | Roos → f-young; Verkoper → m-shop | Roos is the cast's young woman; m-shop is the shopkeeper voice. |
| 7 | Trainer Daan → m-young | A young volunteer trainer who says "u" to a parent and signs off informally. |
| 8 | Nieuwslezer → presenter | News voice. |
| 9 | Modibo → m-young; Apothekersassistente → f-young | Modibo is the cast's young man; a young pharmacy assistant fits f-young ("young colleague"); f-adult is the alternative if the reviewer prefers a more formal-sounding assistant (f-adult already serves items 1 and 2). |

Role use: f-adult 2, f-young 2, m-young 2, presenter 2, m-older 1, m-adult 1, m-shop 1, narrator 1; f-older is not used. Male and female speakers are balanced across authority roles (a female assistant and director, a male adviser and trainer).

The three conversations carry `notes` saying that the official exam may show such a conversation on video and that here it is audio with one still, as blueprint §4.2 asks.

## 5. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring (checked verbatim against `text`); the competing detail is said elsewhere in the fragment. Rationales name the misunderstanding behind each distractor.

### 1 bloedonderzoek

- **q1** time-place, key **B** "Donderdagmiddag." — "De dokter belt u donderdag, tussen twee en drie uur."
  - A "Vanmiddag.": explicitly impossible ("Vanmiddag lukt niet, want dan heeft ze spreekuur").
  - C "Volgende week woensdag.": the earliest date for a visit to the practice, which he declines.
- **q2** rule-application (4 options), key **D** "Wachten tot de dokter belt." — "De dokter wil de uitslag zelf met u bespreken. Ze belt u daarvoor op."
  - A "Naar de praktijk komen.": he asks this and is told it is not needed.
  - B "Nog een keer bloed prikken.": "dat is nu niet nodig".
  - C "De assistente om de uitslag vragen.": he tries exactly this and she may not tell him.
- **q3** purpose, key **A** "Hij wil weten of de uitslag er is." — "Ik heb vorige week bloed laten prikken. Is de uitslag al binnen?"
  - B "Hij wil een afspraak maken.": no appointment is made; the call from the doctor is arranged by the assistant.
  - C "Hij wil nog een keer bloed prikken.": he asks whether a new test is needed, and it is not.

### 2 studiedag

- **q1** time-place, key **C** "Vrijdag twee oktober." — "Op vrijdag twee oktober is er een studiedag voor de leraren."
  - A "Donderdag één oktober.": a normal school day, mentioned right after.
  - B "Maandag vijf oktober.": the day lessons resume.
- **q2** rule-application (4 options), key **B** "Amina aanmelden bij de opvang." — "Meld uw kind dan aan bij de opvang zelf."
  - A "Amina aanmelden bij de school.": explicitly excluded ("Bij de school aanmelden kan niet").
  - C "Amina naar school brengen.": the school is closed all day.
  - D "Het aan de juf vragen.": the teacher is the contact for questions, not for care.
- **q3** time-place, key **A** "Tot zes uur." — "Op de studiedag is de opvang open van half acht 's ochtends tot zes uur 's avonds."
  - B "Tot half acht.": the opening time, not the closing time.
  - C "Tot half negen.": the time lessons start on Monday.

### 3 spoor

- **q1** time-place, key **C** "Van spoor vijf." — "De sprinter naar Leiden van kwart over drie vertrekt niet van spoor twee, maar van spoor vijf."
  - A "Van spoor twee.": the original platform, where a broken train stands.
  - B "Van spoor drie.": the platform of the intercity to Amsterdam.
- **q2** time-place, key **B** "Om half vier." — "De sprinter naar Leiden vertrekt ook later dan normaal: om half vier."
  - A "Om kwart over drie.": the scheduled time, no longer valid.
  - C "Om kwart voor vier.": the departure time of the Amsterdam intercity.
- **q3** rule-application (4 options), key **A** "In Leiden overstappen." — "Reizigers naar Den Haag stappen in Leiden over."
  - B "De intercity naar Amsterdam nemen.": the other train mentioned, not the one for Den Haag.
  - C "Naar de servicebalie gaan.": the advice for questions.
  - D "Op spoor twee wachten.": the platform with the broken train.

### 4 cv-workshop

- **q1** rule-application (4 options), key **D** "Het cv in de workshop maken." — "Hebt u nog geen cv? Dat is geen probleem. Dan maakt u het in de workshop."
  - A "Thuis eerst een cv maken.": reverses the rule; only an existing CV is brought along.
  - B "Een laptop meenemen.": "Een laptop is niet nodig. Die is er voor iedereen."
  - C "Een afspraak maken met de adviseur.": the appointment comes after the workshop and is made by the adviser.
- **q2** advice, key **A** "Haar diploma's." — "Neem wel uw diploma's mee, want die zetten we op het cv."
  - B "Een laptop.": explicitly not needed.
  - C "Een sollicitatiebrief.": written on Thursday in the workshop, not brought along.
- **q3** time-place, key **C** "Uiterlijk vrijdag." — "Meld u dan aan bij de balie beneden, uiterlijk vrijdag."
  - A "Uiterlijk dinsdag." / B "Uiterlijk donderdag.": the two workshop mornings.

### 5 bezorgservice

- **q1** rule-application (4 options), key **B** "Twintig euro." — "Woont u verder weg? Dan betaalt u twintig euro." (Karim lives forty kilometres away, beyond the free zone of twenty-five.)
  - A "Niets.": only within twenty-five kilometres.
  - C "Vijfentwintig euro.": the distance figure heard as a price.
  - D "Dertig euro.": the assembly surcharge.
- **q2** detail, key **C** "De dag voor de bezorging." — "De dag voor de bezorging krijgt u een berichtje op uw telefoon. Daarin staat hoe laat wij komen."
  - A "Als hij bestelt.": ordering is mentioned (shop or website) but the time comes later.
  - B "Op de dag van de bezorging.": the delivery day is when they come, not when the time is announced.

### 6 verjaardagstaart

- **q1** quantity (4 options), key **C** "Zesendertig euro." — "Die is voor twaalf personen en kost zesendertig euro."
  - A "Tien euro.": the deposit paid today.
  - B "Vierentwintig euro.": the price of the small cake for eight.
  - D "Zestig euro.": the father's age heard as a price.
- **q2** time-place, key **B** "Zaterdag na elf uur." — "Maar de taart is pas om elf uur klaar. Komt u dus na elf uur."
  - A "Zaterdag om acht uur.": the shop's opening time, too early for the cake.
  - C "Zaterdag om twaalf uur.": "twaalf" is the number of persons, heard as a time.
- **q3** rule-application, key **A** "Tien euro." — "U betaalt nu tien euro."
  - B "Zesendertig euro.": the full price, of which the rest is paid on Saturday.
  - C "Niets.": reverses the deposit rule.

### 7 turnles

- **q1** purpose, key **A** "De training van woensdag gaat niet door." — "Ik bel over de training van woensdag. Die gaat niet door."
  - B "Sem moet zich aanmelden voor zaterdag.": reversed ("Sem hoeft zich niet aan te melden").
  - C "De training is voortaan in sporthal West.": only Saturday's extra training is there; next Wednesday is back in the own hall.
- **q2** time-place (4 options), key **B** "Zaterdag om tien uur." — "In plaats daarvan is er een extra training op zaterdag, van tien uur tot half twaalf."
  - A "Woensdag om zeven uur.": next week's normal training.
  - C "Zaterdag om half twaalf.": the end time.
  - D "Zaterdag om acht uur.": the time after which the trainer may be called ("'s avonds na acht uur").
- **q3** advice, key **C** "Een berichtje sturen." — "Hebt u vragen? Stuur mij dan een berichtje."
  - A "De trainer bellen.": possible only in the evening after eight, not during the day.
  - B "Naar de sporthal gaan.": the own hall is closed all week.

### 8 hitte

- **q1** purpose, key **A** "Omdat het heel warm wordt." — "De GGD geeft daarom tips voor het warme weer." (preceded by "Het wordt deze week erg warm.")
  - B "Omdat het gaat regenen.": rain is only a chance on Saturday, after the heat.
  - C "Omdat het zwembad dicht is.": reversed; the pool is open longer.
- **q2** advice (4 options), key **D** "'s Ochtends vroeg." — "Doe zwaar werk liever 's ochtends vroeg."
  - A "Tussen twaalf en vier uur.": the hours to stay inside or in the shade.
  - B "'s Avonds na negen uur.": nine is the pool's closing time.
  - C "Op zaterdag.": the day it gets cooler, not advice about heavy work.
- **q3** time-place, key **B** "Tot negen uur." — "Het zwembad is deze week langer open, tot negen uur 's avonds."
  - A "Tot vier uur." / C "Tot twaalf uur.": the boundaries of the stay-inside hours.

### 9 herhaalmedicijn

- **q1** detail, key **B** "De fabrikant is anders." — "Het medicijn is precies hetzelfde, alleen de fabrikant is anders."
  - A "Hij krijgt een ander medicijn.": contradicted by "precies hetzelfde".
  - C "De dokter heeft het recept veranderd.": the prescription stands for a whole year.
- **q2** rule-application (4 options), key **D** "Bellen of bestellen op de website." — "U belt ons, of u bestelt op onze website. Doe dat op tijd: als u nog tabletten voor een week hebt."
  - A "Naar de huisarts voor een nieuw recept.": not needed this year ("U hoeft dan niet eerst naar de dokter").
  - B "Zonder bestellen naar de apotheek komen.": nothing is ready without an order; it takes two working days.
  - C "De code van de afhaalkast gebruiken.": the code comes after ordering, for pick-up.
- **q3** rule-application, key **A** "Uit de afhaalkast, met een code." — "Met die code haalt u uw medicijnen uit de kast, ook 's avonds."
  - B "Aan de balie, na zes uur 's avonds.": the pharmacy is closed by then ("Dan is de apotheek al dicht").
  - C "Bij de huisarts, met het recept.": the doctor gives the prescription; medicines come from the pharmacy.

## 6. Key balance and option counts

| Key | Count | Share |
| --- | --- | --- |
| A | 8 | 31% |
| B | 8 | 31% |
| C | 6 | 23% |
| D | 4 | 15% (of all 26; 4 of the 9 four-option questions) |

Key sequence in file order: B D A · C B A · C B A · D A C · B C · C B A · A B C · A D B · B D A. No letter three times in a row; within an item no two questions share a key. Three-option questions: 17 (65%); four-option: 9 (35%). No key is the longest option by more than two characters in any question (checked); options are parallel in form.

Skills: time-place 9, rule-application 8, purpose 3, advice 3, detail 2, quantity 1. No `picture` item; the stills support the situation only.

## 7. Level control

Figures from the checker's method (sentences split on . ! ?, counting the "Speaker:" prefix of each turn; the spoken-only average in brackets):

| # | Spoken words | Sentences | Average | Longest | Connectors used |
| --- | --- | --- | --- | --- | --- |
| 1 bloedonderzoek | 161 | 30 | 6.2 (5.5) | 11 | dat, want, als |
| 2 studiedag | 145 | 18 | 8.1 | 17 | dat (demonstrative), question–answer pairs instead of clauses |
| 3 spoor | 114 | 13 | 8.8 | 17 | maar |
| 4 cv-workshop | 151 | 22 | 6.9 | 14 | dat, want |
| 5 bezorgservice | 158 | 18 | 8.8 | 17 | dat, hoe laat (indirect question) |
| 6 verjaardagstaart | 136 | 27 | 5.5 (5.0) | 11 | dat, wanneer, maar, dus, als |
| 7 turnles | 141 | 18 | 7.9 | 16 | dat, dus, maar, want |
| 8 hitte | 150 | 19 | 7.9 | 15 | als |
| 9 herhaalmedicijn | 179 | 30 | 6.4 (6.0) | 13 | als, dat, hoe (indirect question) |

All averages are under the A2 target of 12 and no sentence exceeds 18 words. Subordinate clauses only with omdat/als/dat/wanneer (plus coordinating want, dus, maar); conditions are phrased as question–answer pairs ("Werkt u op vrijdag? Dan …"), as the official announcements do. Tenses: present, perfect ("heb gebeld", "heeft gegeven"), one "wordt" future in the news; no passive in the stimuli (the hall floor is "repareren ze"). Every number, day, time, price and platform is spoken in words ("zesendertig euro", "half vier", "spoor vijf", "twee oktober"); no phone numbers; no fillers. Less common words are explained by context: uitslag (of the blood test, "is alles goed?"), studiedag ("voor de leraren", "de kinderen zijn vrij"), opvang ("werkt u op vrijdag? dan kan uw kind naar de opvang"), sprinter/intercity (named with destinations and platforms), roltrap ("buiten gebruik, neem de trap of de lift"), werkplein (situation line, "zoekt werk"), cv (the whole workshop), bezorgen ("bij u thuis"), fabrikant ("hetzelfde medicijn, alleen … anders"), afhaalkast ("buiten, naast de deur … met een code"), watertappunten ("uw fles vullen"). Register: u between strangers, customers and officials; the trainer says u to the parent and signs off with "Groeten"; the adviser says u to Sabrina.

## 8. Image briefs

Five items carry one still (`images[0]`, `kind: drawing`, `size: still`) with cast traits copied verbatim from `config/illustration.json`, "No text", and a Dutch `alt` that reveals no key. None shows an answer-relevant detail.

- **1 bloedonderzoek**: meneer De Vries at his kitchen table on the phone; no calendar, no clock (no day or time shown).
- **4 cv-workshop**: Sabrina at a desk opposite a male adviser of about forty (the m-adult voice); folder and blank paper, no screen (no laptop, no diploma visible).
- **5 bezorgservice**: two delivery workers carrying a sofa from a plain white van to a front door; no logo, no house number (no price, no day).
- **6 verjaardagstaart**: Roos at a bakery counter with a male baker; plain loaves and one round cake, no price tags.
- **9 herhaalmedicijn**: Modibo receiving a small box from a young female assistant in a pharmacy; plain boxes, no labels (no code, no locker).

Items 2, 3, 7 and 8 (an in-room announcement, a station announcement, a voicemail and a radio news item) have no still, as the official audio-only fragments do; the reviewer may add one to the news item if the launch bank wants more pictures.

## 9. Points for the reviewer

- **Item 3 (spoor)** is the closest neighbour to an existing item: the coordinator assigned a platform change although blueprint §9 lists "stationsomroep" (`batch002-trein`, a 12–21 s clip that the research document marks for rewriting). This fragment tests a delay, a terminating train and a transfer rule besides the platform; if the reviewer still finds it too close, the sibling item to retire is `batch002-trein`, not this one.
- **Item 1 (bloedonderzoek)** q1 keys "Donderdagmiddag." on "donderdag, tussen twee en drie uur"; the small inference (two to three o'clock is the afternoon) is intended. Replace with "Donderdag." only if the reviewer wants zero inference; the distractors then still work.
- **Item 2 (studiedag)** uses f-adult for a spoken announcement (`omroep`) because a named person addresses a room; the two batch-005 announcements use the narrator voice. Switch to `narrator` if the reviewer prefers one voice for every omroep.
- **Item 8 (hitte)** names "de GGD" once as the source of the tips; it is a real public body but no specific region is named, and the tips are generic. "De gemeente" is a drop-in replacement if the reviewer prefers to avoid the acronym.
- **Item 9 (herhaalmedicijn)** overlaps in subject with the reading letter `batch004-herhaalrecept` (a different part); the tested facts here (manufacturer change, year-long prescription, ordering lead time, locker) are not in that letter. A concurrent B1 listening batch (025, `medicijnlijst`, an instructie on ordering and collecting medicines) is in the same territory at the other level; the coordinator may want to keep the two out of the same practice session. The pharmacy assistant is f-young; f-adult is the alternative.
- **Item 6 (verjaardagstaart)** q2 distractor C ("Zaterdag om twaalf uur.") is grounded only in "twaalf personen"; it is the number-heard-elsewhere pattern the official items use. Replace with "Zaterdag om acht uur" style timings only if the reviewer finds it too weak, but then A and C would need a third time in the script.
- The two three-question conversations run 161 and 179 spoken words (about 65–80 seconds at the A2 pace); both are inside the 30–90 second window, but item 9 is the longest in the batch. Turns 3–4 of item 9 ("Voor hoe lang is dit doosje?" / "Voor drie maanden…") can be cut without touching any evidence quote if the audio comes out over 90 seconds.
- Real place names: Leiden, Den Haag, Amsterdam (item 3). Real institutions named generically: huisartsenpraktijk, werkplein, GGD, gemeente, apotheek.

## 10. Checker result

`npm run batch:check content/batches/023-original.json`:

```
Checked 9 items, 26 questions. Keys: {"B":8,"D":4,"A":8,"C":6}. Options: {"3":17,"4":9}.
No failures, no warnings.
```

SHA-256 of `content/batches/023-original.json` at the time of writing: `6fdf276a93b5cbc151f80599e5ff3be1eacc23e6bf60273f7506ba1ef9f7a397`.
