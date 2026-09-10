# Batch 008: design notes (A2 Schrijven, sixteen tasks)

Batch 008 contains sixteen original A2 writing tasks in the four task types of the DUO "Schrijven A2" exam as described in `content/blueprint.md` §4.4: eight e-mails with a printed header, salutation and closing and three or four bullet requirements; three wijkkrant pieces with three guiding questions; three forms with personal-data fields plus open fields; two picture notes to a colleague. Every situation, criterion, sample, quote and model was written for this project. Official material was used for structure only (task shape, header layout, "Bedenk zelf …" bullets, "Sommige gegevens moet u zelf bedenken").

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction. Feedback follows the official scales in order (adequaatheid/begrijpelijkheid 0–3, grammatica 0–2, spelling 0–2, coherentie 0–1, woordenschat 0–2); the criteria only carry the adequacy elements.

Conventions used in every item:

- E-mail models are the body only. The header, salutation and closing are printed by the scaffold, so the learner writes what comes between "Beste …," and "Met vriendelijke groet," / "Groetjes,". The name under the closing is the learner's own or an invented one and is not scored.
- Form samples and models are the open-field answers in field order, written as full sentences without the labels (the app pre-fills the labels in the answer box; the model is shown as one paragraph).
- Criteria address the learner with "u" (as the exam does) even when the e-mail itself is informal; the register of the task is set by the scaffold's salutation and closing and by the model.
- Every sample fulfils all criteria but one (that quote is `null`) and contains exactly one small learner error, listed per task below. Quotes are exact substrings of the sample. Models are correct and complete.
- Cast names from `config/illustration.json` where a persona is needed: Fatima (colleague with a car), Julio (fellow student), Karim (neighbour), Amina (the learner's ten-year-old daughter), Sem (the learner's teenage son; supermarket colleague), Roos (restaurant colleague). Mila (blueprint §8 list) is the friend. Formal addressees are invented: mevrouw Vermeer, meneer Van Dijk, Woonstichting De Brug, Elektrowinkel Van Dam, sportclub De Sprong, Tandartspraktijk Molenzicht.
- Dates were checked for 2026: dinsdag 13 oktober, donderdag 15 oktober, maandag 28 september, 31 oktober (Saturday, only used as a contract end date), 1 december.
- Addresses, phone numbers and e-mail addresses are invented and written as the exam writes them (Kastanjestraat 7, 06 23 45 67 89, kandidaat@mail.nl, info@…).

## 1. Batch matrix

| # | id (slug) | taskType | Register | Domain | Addressee | Topic | Why not a duplicate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | contract | email | formal (u) | werk | chef, mevrouw Vermeer | contract ends 31 October; wants to stay; asks for a talk | "Contracts" is on the needed list. Existing werk writing is *loonstrook* (hours on a payslip); *training* and *werkdag* (listening) are receptive. No existing task asks for a new contract. |
| 2 | groep | email | formal (u) | opleiding | docent, meneer Van Dijk | evening group no longer possible because of new evening work; asks for a daytime group | Existing course items: *kookcursus* (join a course, ask day and price), *toets* (listening), *cursusavond gemist* and *cursuslocatie* (B1 speaking), *rooster conflict* (B1 writing, work shift vs course). Changing group because of work hours is a new act at A2. |
| 3 | huur | email | formal (u) | wonen-buurt | verhuurder, Woonstichting De Brug | ending the tenancy: address, reason (new job elsewhere), end date, keys | No housing-termination item exists; *verhuizing* (KNM) is a fact card about reporting a move to the gemeente. Shares the verb "opzeggen" with *sportles opzeggen*; see doubts. |
| 4 | bezorging | email | formal (u) | winkels-diensten | winkel, Elektrowinkel Van Dam | washing-machine delivery falls on a day the learner is at work; proposes another day and time, gives address and phone, asks the driver to call | "Delivery" is on the needed list. *Pakketpunt* (reading) is a parcel ready for pick-up; *pakket buren* (speaking) is accepting a parcel; *schoenen* is a return; *koelkast kapot* is a repair. Rescheduling a delivery is new. |
| 5 | meerijden | email | informal (je) | vervoer | collega Fatima | bus does not run next week (roadworks); asks to ride along; pick-up place and time; petrol money | *Bus* (listening 005) is a driver's detour announcement; *stadsbus* (reading) is tickets; *fietsroute* is B1 speaking. Asking a colleague for a lift is new. |
| 6 | cadeau | email | informal (je) | opleiding | medestudent Julio | a group present for the teacher at the end of the course: reason, present, amount per person, shopping together | No present or collection item exists anywhere in the bank. |
| 7 | kast | email | informal (je) | wonen-buurt | buurman Karim | a heavy new wardrobe has to go up to the third floor; asks for help; day and time | *Ladder lenen* borrows an object; *plant* and *afspraak verzetten* are other favours. Asking for physical help with a chosen day is a different act with different information. |
| 8 | oppassen | email | informal (je) | vrije-tijd-familie | vriendin Mila | working Thursday evening; asks a friend to babysit the ten-year-old daughter; times; bedtime | "Family" is on the needed list. No childcare or babysitting item exists; *voetbal* (listening) is a trainer's voicemail. |
| 9 | reizen | wijkkrant | personal | vervoer | wijkkrant readers | how you travel to work or school, how long it takes, what you think of it | The official wijkkrant topics seen were a festival, favourite clothes and the weekend; travelling to work is none of these and no existing item asks a learner to describe their own commute. |
| 10 | gezond | wijkkrant | personal | gezondheid | wijkkrant readers | what you do to stay healthy, how often, what is hard | Health items in the bank are receptive (huisarts, apotheek, bloedprikken, tabletten). A first-person piece about healthy habits is new. |
| 11 | boodschappen | wijkkrant | personal | winkels-diensten | wijkkrant readers | where and when you shop, what you think of the local shops | *Bakker* (listening) and *flessenautomaat* (reading) are single shop incidents; describing one's own shopping habits is new. |
| 12 | lantaarnpaal | form | formal | instanties | gemeente (melding openbare ruimte) | a broken street light in front of the house: problem, exact place, since when, how to reply | Municipal-report form shape (as in the official booklets), own content. *Afvalcontainer* is a wrong container delivered by the gemeente; *oversteekplaats* (B1 writing) is a persuasive letter about traffic safety. |
| 13 | sportclub | form | formal | vrije-tijd-familie | sportclub De Sprong (inschrijfformulier) | registering the son for a sport: sport choice, training days, earlier experience, why | "A sports club" is on the needed list. *Sportles opzeggen* cancels a class; *voetbal* (listening) is a match change; *zwemles* (reading) is an e-mail about lessons. Registration is new. |
| 14 | nieuwe-patient | form | formal | gezondheid | Tandartspraktijk Molenzicht (new-patient form) | registering at a dental practice after a move: why this practice, last visit, availability, reminder choice | "Tandarts" is on the needed list. *Tandarts* (listening) is a voicemail from the dentist; here the learner fills a registration form. No medical detail is asked. |
| 15 | restaurant | picture-note | informal (je) | werk | collega Roos | three chores in a restaurant: set the tables, clean the windows, wash the glasses | First restaurant setting in the bank (*kantine* is ordering lunch at work). |
| 16 | supermarkt | picture-note | informal (je) | werk | collega Sem | three chores in a supermarket: milk into the cooler, trolleys from the car park, sweep the floor | *Winkelcentrum* (listening) is a customer announcement; *magazijn* (reading) is a job advertisement. A supermarket shift note is new. |

Counts: 8 e-mails (4 formal: chef, docent, verhuurder, winkel; 4 informal: collega, medestudent, buur, vriendin), 3 wijkkrant, 3 forms, 2 picture notes. Bullets: seven e-mails with four criteria, one (kast) with three; every e-mail has at least one "Bedenk zelf …". Domains: werk 3, opleiding 2, wonen-buurt 2, gezondheid 2, winkels-diensten 2, vervoer 2, vrije-tijd-familie 2, instanties 1.

## 2. Per task: the omitted criterion, the sample error, and how the model meets every criterion

### 1 contract (`A2:writing:batch008-contract:1`)

- Sample omits criterion 4 (no request for a meeting; it only hopes for a new contract). Error: "omdat ik praat graag met klanten" (verb not at the end of the omdat-clause).
- Model: end date "Mijn contract stopt op 31 oktober" (1); "Ik wil heel graag blijven werken in de winkel" (2); reason "omdat ik graag met klanten praat" plus "veel geleerd van mijn collega's" (3); "Kunnen wij binnenkort een gesprek hebben over een nieuw contract?" (4). 56 words.

### 2 groep

- Sample omits criterion 3 (asks for "een andere groep" without choosing a day and time). Error: "een nieuw werk" (uncountable "werk" with an article; "een nieuwe baan" or "nieuw werk").
- Model: current group "op dinsdagavond" (1); reason: restaurant work every evening until ten, "Daarom kan ik niet meer 's avonds naar de les komen" (2); "de groep op donderdagochtend om negen uur" (3); "Kan ik in die groep komen?" (4). 59 words.

### 3 huur

- Sample omits criterion 4 (asks for a confirmation instead of asking when to hand in the keys). Error: "opzegen" (spelling of opzeggen).
- Model: address "aan de Lindehof 18 in Zwolle" (1); reason "omdat ik daar een nieuwe baan heb" (2); "Vanaf 1 december huur ik de woning niet meer" (3); "Wanneer moet ik de sleutels inleveren?" (4). A phone number is added as a natural closing detail. 57 words.

### 4 bezorging

- Sample omits criterion 4 (no request that the driver calls first). Error: "Kunt u de wasmachine … bezorgt?" (finite form instead of the infinitive).
- Model: reason "Ik moet die dag werken" after "dan ben ik niet thuis" (1); "op donderdag 15 oktober … na twee uur 's middags" (2); "Kastanjestraat 7 in Almere", "06 23 45 67 89" (3); "Kan de bezorger mij eerst bellen?" (4). 70 words, the longest model in the batch because it carries an address and a phone number.

### 5 meerijden

- Sample omits criterion 3 (no pick-up place or time). Error: "mee rijden" written as two words.
- Model: "omdat er werk aan de weg is" (1); "Mag ik volgende week met jou meerijden?" (2); "bij de bushalte op de Meerweg, om kwart voor acht" (3); "Ik betaal graag mee aan de benzine" (4). 59 words.

### 6 cadeau

- Sample omits criterion 3 ("Iedereen in de groep kan iets betalen" names no amount). Error: "geholpt" (past participle of helpen is geholpen).
- Model: reason: last lesson in two weeks and "Onze docent heeft ons heel goed geholpen. Daarom …" (1); "een doos chocolade en een grote kaart" (2); "Iedereen betaalt dan drie euro" (3); "Ga je zaterdag met mij mee naar de winkel?" (4). 59 words.

### 7 kast

- Sample omits criterion 3 (no day or time; it mentions the duration and coffee instead). Error: "drink we" (plural drinken).
- Model: reason: heavy wardrobe, third floor, "Alleen krijg ik de kast niet naar boven" (1); "Kun je mij helpen met dragen?" (2); "Kan het zaterdag om tien uur?" (3). Duration and coffee are extra. 54 words.

### 8 oppassen

- Sample omits criterion 4 (no bedtime; it gives food and tv instead). Error: "pannekoeken" (spelling of pannenkoeken).
- Model: "Kun jij donderdagavond op Amina passen?" (1); "Ik moet die avond werken tot tien uur" (2); "Ik ga om half zeven weg en ik ben om half elf weer thuis" (3); "Om half negen moet ze naar bed" (4). 60 words. The prompt sentence "Zij kan nog niet alleen thuis blijven" is rephrased in both sample and model so that neither copies the prompt.

### 9 reizen (wijkkrant)

- Sample omits criterion 2 (no duration). Error: "met fiets" (missing article).
- Model: "meestal met de fiets", bus when it rains (1); "De reis duurt ongeveer twintig minuten" (2); opinion "Ik vind fietsen fijn, want het is gezond en het kost niets" plus the cycle paths (3). 47 words, six sentences (minimum three).

### 10 gezond (wijkkrant)

- Sample omits criterion 3 (nothing about what is difficult). Error: "fruits" (fruit has no plural here).
- Model: walking, vegetables and fruit, no cola, swimming (1); "elke dag", "Op zondag" (2); "Het moeilijkste vind ik snoep, want ik houd heel veel van chocolade" (3). 55 words.

### 11 boodschappen (wijkkrant)

- Sample omits criterion 2 (no day or time of shopping). Error: "op de plein" (het plein; gender errors are tolerated by the official scale but it is the deliberate error here).
- Model: supermarket on the square, bakery in the Julianastraat, market (1); "meestal op zaterdagochtend, want dan heb ik vrij" (2); opinion: good, everything close by, supermarket a bit expensive (3). 56 words.

### 12 lantaarnpaal (form)

- Sample omits criterion 3 (no "sinds wanneer"). Error: "bus halte" written as two words.
- Model: "De lantaarnpaal voor mijn huis is kapot. Het licht gaat 's avonds niet aan." (1); "voor Meidoornstraat 12 in Hoorn, naast de bushalte" (2); "sinds maandag 28 september" (3); "antwoord per e-mail" (4, one of the three choice options). 48 words. The six text fields (name, address, postcode, town, phone, e-mail) are invented by the learner and are not criteria.

### 13 sportclub (form)

- Sample omits criterion 3 (nothing about earlier experience). Error: "Hij vind" (vindt).
- Model: "Sem wil graag voetballen" (1, one of the four choice options); "op maandag en woensdag na vier uur, en op zaterdag de hele dag" (2); "twee jaar gevoetbald bij een club in onze oude stad" (3); "omdat zijn vrienden daar ook spelen" and likes playing in a team (4). 56 words.

### 14 nieuwe-patient (form)

- Sample omits criterion 1 (no reason for choosing this practice). Error: "Op vrijdag ik ben" (no inversion after a fronted adverbial).
- Model: moved to Alkmaar, practice close to home, neighbour is a patient there (1); "in maart … voor een controle" (2); "dinsdag en donderdag … na half vijf", Friday all day (3). 54 words. The reminder choice (sms / e-mail / telefoon) is a form field without a criterion.

### 15 restaurant (picture note)

- Sample omits criterion 2 (windows). Error: "De borden en glazen staat" (plural staan).
- Model: "Wil je eerst de tafels dekken?" (1); "Daarna moet je de ramen schoonmaken" (2); "Wil je ook de glazen afwassen?" (3). 49 words. Pictures: Roos (cast traits: dark hair in a bun, yellow scarf) setting a table, cleaning a window, washing glasses; one three-panel generation per the sequence rule.

### 16 supermarkt (picture note)

- Sample omits criterion 3 (floor). Error: "de magazijn" (het magazijn).
- Model: "Wil je de melk in de koeling zetten?" (1); "de winkelwagens ophalen van de parkeerplaats" (2); "de vloer vegen bij de ingang" (3). 46 words. Pictures: Sem (cast traits: short brown hair, green sweater) filling the cooler with plain white milk cartons, pushing trolleys across the car park, sweeping an aisle.

## 3. Sentence starters (`content/batches/008-starters.json`)

One fragment per criterion, in criteria order, each with an ellipsis, in the register of the task. None is a complete answer; facts (days, times, amounts, addresses, reasons) are left to the learner.

| Task | Starters |
| --- | --- |
| contract | Mijn contract stopt op … / Ik wil graag … / Ik vind het werk leuk, omdat … / Kunnen wij een gesprek hebben over …? |
| groep | Ik zit nu in de groep op … / Ik kan niet meer 's avonds komen, omdat … / Ik wil graag naar de groep op … / Kan ik …? |
| huur | Ik huur de woning aan … / Ik zeg de huur op, omdat … / Vanaf … huur ik de woning niet meer. / Wanneer moet ik …? |
| bezorging | Op dinsdag 13 oktober ben ik niet thuis, want … / Kunt u de wasmachine bezorgen op …? / Mijn adres is … en mijn telefoonnummer is … / Kan de bezorger …? |
| meerijden | Volgende week kan ik niet met de bus, omdat … / Mag ik met jou …? / Je kunt mij ophalen bij … om … / Als dank wil ik graag … |
| cadeau | Ik wil een cadeau geven, omdat … / Ik denk aan … / Iedereen betaalt … / Ga je met mij mee om …? |
| kast | Ik heb hulp nodig, omdat … / Kun je mij …? / Kan het op … om …? |
| oppassen | Kun jij donderdagavond …? / Ik moet dan … / Ik ga om … weg en ik ben om … terug. / Amina moet om … naar bed. |
| reizen | Ik ga meestal met … naar … / De reis duurt ongeveer … / Ik vind deze manier van reizen …, want … |
| gezond | Om gezond te blijven … / Dat doe ik … per … / Moeilijk vind ik …, want … |
| boodschappen | Ik doe mijn boodschappen meestal bij … / Ik ga meestal op … / De winkels in de buurt vind ik …, want … |
| lantaarnpaal | Het probleem is dat … / De lantaarnpaal staat voor … / Het licht is kapot sinds … / Ik wil antwoord per … |
| sportclub | Mijn zoon wil graag … / Hij kan trainen op … / Hij heeft deze sport eerder gedaan bij … / Hij wil bij de club, omdat … |
| nieuwe-patient | Ik wil naar uw praktijk, omdat … / Ik was voor het laatst bij een tandarts in … / Ik kan komen op … |
| restaurant | Wil je eerst de tafels …? / Daarna moet je de ramen … / Kun je ook de glazen …? |
| supermarkt | Zet jij eerst de melk …? / Daarna moet je de winkelwagens … / Als laatste moet je … |

The picture-note starters name the object of each picture (tafels, ramen, glazen; melk, winkelwagens) and leave the verb, because the pictures and criteria already show the objects and the learning content is the verb phrase. The sportclub starter for criterion 3 presupposes a "yes"; a learner who chooses "no" can write "Hij heeft deze sport nog nooit gedaan" instead. The gezond starter "Om gezond te blijven …" invites inversion ("… wandel ik elke dag"), which a reviewer may find slightly demanding at A2; "Ik blijf gezond door …" is an alternative.

## 4. Doubts for the reviewer

1. **huur vs. sportles opzeggen.** Both are notices of termination ("opzeggen"). The A2 sportles item is a three-sentence message (which class, from when, confirmation); the new one is a formal e-mail with an address, a reason, an end date and a procedural question about keys. If the reviewer still reads it as the same concept, an alternative for the same addressee is asking the landlord for permission to keep a cat (reason, promise, request), which repeats nothing.
2. **lantaarnpaal vs. B1 oversteekplaats.** Both report a public-space problem to the gemeente. The B1 item is a persuasive letter with proposals; this one is a report form with three factual open fields. The form shape follows the official "municipal complaint" form type; the content is original.
3. **nieuwe-patient vs. the tandarts voicemail (listening).** Same institution, different act (registration form vs. receptive voicemail). The form asks no medical information: reason for choosing the practice, last visit, availability. The text field "Naam van uw zorgverzekering" expects an invented name; a reviewer may prefer to drop it to avoid inviting a brand name.
4. **oppassen vs. plant water geven.** Both ask a friend for a favour with time details. Plant: how long away, water the plant, where the key is. Oppassen: babysit, why, departure and return times, bedtime. The information structure differs, but it is the closest pair in the batch.
5. **Only one instanties task.** The needed list also mentions a police report; a form "aangifte van een gestolen fiets" was considered and left out because the official booklets contain a police-report form whose content is unknown to the author, so an identical topic could not be excluded. It is a candidate for a later batch if the reviewer thinks bike theft is safe.
6. **Both picture notes carry `domain: werk`** because the learner is the worker in both. The supermarket note could be labelled winkels-diensten instead; werk then drops to 2 and winkels-diensten rises to 3.
7. **Register of the criteria.** Criteria say "u" even for the informal e-mails, as the exam bullets do. If the app ever shows criteria as the learner's own checklist, "je" versions would read better; the English translations are neutral.
8. **Choice fields as criteria.** In lantaarnpaal (reply channel) and sportclub (sport) the choice field is a criterion ("Kies …"). In nieuwe-patient the reminder choice is not a criterion. The reviewer may want one rule for all three forms.
9. **Sample error in boodschappen ("op de plein")** is a gender error, which the official spelling/grammar scale tolerates. It was kept because it is the most frequent A2 error type; if the reviewer prefers a scored error, "Brood koop ik bij de bakker" could become "Brood ik koop bij de bakker".
10. **bezorging model is 70 words**, the longest in the batch, because the criteria ask for an address and a phone number. It stays under the 80-word guide but a reviewer may prefer to drop "Dan doe ik meteen open."
11. **Wijkkrant criterion 3 of reizen** ("Wat vindt u van deze manier van reizen?") asks for an opinion about the learner's own way of travelling; the model also comments on cycle paths in the Netherlands. The reviewer should confirm that both readings meet the criterion.
12. **Sentence starters and the criteria hash.** The starters are delivered in `008-starters.json` and not merged into `content/hints/sentence-starters.json`; merging changes the overlay hash recorded in `content/hints/review.json` and needs the focused starter review described in `docs/research/content-workflow.md`.

## 5. Checker

`npm run batch:check content/batches/008-original.json`: "Checked 16 items, 0 questions. No failures, no warnings."

Author self-checks beyond the script: exactly one `null` quote per task; model lengths 46–70 words (e-mails 54–70, wijkkrant 47–56, forms 48–56, picture notes 46–49); e-mail samples 5–7 sentences; every e-mail has at least one "Bedenk zelf"; no sample or model sentence equals a prompt sentence; sentence-length heuristics of blueprint §10 (average under 12 words, none over 18) hold for every prompt, sample and model; every starter has an ellipsis and there is one per criterion.

SHA-256 of `008-original.json` at the time of writing: `f5101326a4bdda3df321d6505985a20e6e7d5bfea9710b6eed4f7d03602eb9a2`.

## Coordinator revision after the level check (10 September 2026)

Two model answers changed, nothing else: the bezorging model was trimmed to seven sentences (58 words) so it stays within the four-to-eight-sentence range of the official e-mail, with the criteria unchanged; the supermarkt model now reads "want er staan veel wagens buiten" instead of the quantitative-er construction "er staan er veel buiten", which is correct Dutch but above A2. Criteria, samples, quotes and starters are unchanged.
