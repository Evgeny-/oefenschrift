# Batch 008 editorial review (A2 Schrijven, sixteen tasks and their sentence starters)

**Verdict:** Pass. All sixteen tasks and all sixteen starter sets are ready for integration.

**Reviewed source:** `content/batches/008-original.json`
**SHA-256:** `f5101326a4bdda3df321d6505985a20e6e7d5bfea9710b6eed4f7d03602eb9a2` (matches the hash the author recorded at the end of `008-notes.md`, so the reviewed bytes are the author's final bytes)
**Starters:** `content/batches/008-starters.json`
**SHA-256:** `44594f782ed1aba5725064ef44cad330e9904285ddf440c7f7b8918da4e7ede9`
**Review date:** 2026-09-10. Reviewer context: fresh; the author's notes were read only after every task and starter had been judged.

The batch holds eight e-mails (four formal: chef, docent, woonstichting, winkel; four informal: collega, medestudent, buurman, vriendin), three wijkkrant pieces, three forms and two picture notes, all `exam: duo-a2`, `part: writing`, `rubric: a2-schrijven`, `status: draft`, `targetLevelValidated: false`. Domains: werk 3, opleiding 2, wonen-buurt 2, gezondheid 2, winkels-diensten 2, vervoer 2, vrije-tijd-familie 2, instanties 1. Every id and slug is new to the catalogue (the catalogue's eleven A2 writing items are all the older three-criterion message format; this is the first batch in the blueprint §4.4 format).

## Checker

`npm run batch:check content/batches/008-original.json` (run by the reviewer on the reviewed bytes):

```
Checked 16 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

Reviewer checks beyond the script, all on the reviewed bytes: every quote is an exact substring of its sample and exactly one quote per task is `null` (positions vary: index 0 once, index 1 three times, index 2 eight times, index 3 four times); every sample carries exactly one small learner error and no second one; no non-instruction prompt sentence is copied verbatim into a sample or model; model lengths 46–70 words (e-mails 54–70, wijkkrant 47–56, forms 48–56, picture notes 46–49), inside the checker's 20–90 range and above the 20–45 figure of blueprint §10 that was written for the old three-criterion format (a four-bullet e-mail with an address and a phone number cannot stay under 45 words; the checker's range is the operative one); sentence-length heuristics of blueprint §10 hold for every prompt, sample and model (averages 4.8–11.8 words, longest sentence 17, in the bezorging sample); the dates in prompts and models fall on the stated weekdays in 2026 (dinsdag 13 oktober, donderdag 15 oktober, maandag 28 september); the two picture-note characters carry exactly the fixed traits of `config/illustration.json` (Roos: dark hair in a bun, yellow scarf; Sem: teenage boy, short brown hair, green sweater), and the other cast names are used consistently with the cast (Amina as a ten-year-old daughter, Sem as a teenage son, Karim, Fatima, Julio as adults); `content/exemplars/` does not exist yet, so the level check below compares each task with the official task descriptions in `docs/research/exam-blueprints-2026-09-10.md` §3.1 and blueprint §4.4 instead of with stored exemplars.

## Task verdicts

| Task | Type, register | Verdict | Level | Evidence |
| --- | --- | --- | --- | --- |
| `batch008-contract` | email, formal | Pass | comparable | Four bullets incl. one "Bedenk zelf"; sample proves 1–3 exactly, omits the meeting request (4); one error (omdat word order); model meets all four in 56 words. |
| `batch008-groep` | email, formal | Pass | comparable | Sample proves 1, 2, 4, omits the chosen day and time (3); one error ("een nieuw werk"); model names donderdagochtend om negen uur. |
| `batch008-huur` | email, formal | Pass | comparable | Sample proves address, reason, end date, omits the keys question (4); one error ("opzegen"); model asks when to hand in the keys. |
| `batch008-bezorging` | email, formal | Pass | comparable | Sample proves reason, alternative day (with "de hele dag" as the time), address and phone; omits the call request (4); one error ("bezorgt"); model meets all four in 70 words. |
| `batch008-meerijden` | email, informal | Pass | comparable | Sample proves reason, request, petrol money; omits pick-up place and time (3); one error ("mee rijden"); model adds bushalte Meerweg, kwart voor acht. |
| `batch008-cadeau` | email, informal | Pass | comparable | Sample proves reason, present, shopping question; omits the amount (3); one error ("geholpt"); model adds "drie euro". |
| `batch008-kast` | email, informal | Pass | comparable | Three bullets; sample proves reason and request, omits day and time (3); one error ("drink we"); model adds "zaterdag om tien uur". |
| `batch008-oppassen` | email, informal | Pass | comparable | Sample proves request, reason, leaving and return times; omits bedtime (4); one error ("pannekoeken"); model adds "half negen". |
| `batch008-reizen` | wijkkrant | Pass | comparable | Sample answers how and opinion, omits duration (2); one error ("met fiets"); model answers all three in six sentences. |
| `batch008-gezond` | wijkkrant | Pass | comparable | Sample answers what and how often, omits what is difficult (3); one error ("fruits"); model answers all three. |
| `batch008-boodschappen` | wijkkrant | Pass | comparable | Sample answers where and opinion, omits when (2); one error ("op de plein"); model adds "zaterdagochtend". |
| `batch008-lantaarnpaal` | form, formal | Pass | comparable | Six personal-data lines, three open fields and one choice, each open field a criterion; sample proves problem, place, reply channel, omits since when (3); one error ("bus halte"); model adds "sinds maandag 28 september". |
| `batch008-sportclub` | form, formal | Pass | comparable | Seven data lines, one choice and three open fields, all four criteria; sample proves sport, days, reason, omits earlier experience (3); one error ("Hij vind"); model adds two years at a club in the old town. |
| `batch008-nieuwe-patient` | form, formal | Pass | comparable | Six data lines, three open fields (the criteria) and one uncriterioned reminder choice; sample proves last visit and availability, omits the reason for the practice (1); one error ("Op vrijdag ik ben"); model adds distance and the neighbour. |
| `batch008-restaurant` | picture-note, informal | Pass | comparable | Three briefs, one chore each, same traits, no text; criteria match the pictures; sample proves tables and glasses, omits windows (2); one error ("staat"); model names all three. |
| `batch008-supermarkt` | picture-note, informal | Pass | comparable | Three briefs, one chore each, plain cartons without text; sample proves milk and trolleys, omits sweeping (3); one error ("de magazijn"); model names all three. |

## Per-task findings

Each task was checked for: prompt shape (situation first, then the official instruction), scaffold completeness and register, criteria (concrete, observable, satisfiable from the prompt, accurate English), sample (every criterion but one, exact quotes, one small error), model (every criterion, correct A2 Dutch), level, originality against the catalogue and the other batches.

### 1. `A2:writing:batch008-contract:1` — pass

Prompt: situation (kledingwinkel since April, contract ends 31 October, wants to stay) then "U schrijft een e-mail aan uw chef, mevrouw Vermeer. Schrijf de e-mail. Schrijf in hele zinnen." Scaffold complete, formal (s.vermeer@brinkmode.nl, "Beste mevrouw Vermeer," / "Met vriendelijke groet,"); sample and model use "u". Criteria: end date (given), wish to stay (given), a reason ("Bedenk zelf"), a meeting request; English accurate. Sample: "Mijn contract stopt op 31 oktober." (1), "Ik wil heel graag blijven werken in de winkel." (2), "omdat ik praat graag met klanten" (3, the one error: finite verb not at the end of the omdat-clause); "Ik hoop dat u een nieuw contract voor mij heeft." hopes for a contract but asks for no gesprek, so `null` for 4 is right and gives the feedback a clear teaching point. Model: all four, "Kunnen wij binnenkort een gesprek hebben over een nieuw contract?", 56 words, average 8.0 words per sentence. Level: comparable with the official formal e-mails to a manager (four bullets, one invented). Originality: the only werk writing task in the catalogue is loonstrook (hours on a payslip); "contracts" is on the needed list.

### 2. `A2:writing:batch008-groep:1` — pass

Prompt: Tuesday-evening language course, new evening work, wants a daytime group; "U schrijft een e-mail aan uw docent, meneer Van Dijk." Scaffold formal and complete. Criteria: current group (given), why evenings no longer work (given), which group with an invented day and time, ask whether it is possible. Sample: quotes 1, 2 (two contiguous sentences, exact) and 4 ("Kan dat?") exact; "Ik wil graag naar een andere groep." names no day or time, so `null` for 3 is right. One error: "een nieuw werk". Model: "de groep op donderdagochtend om negen uur", "Kan ik in die groep komen?", 59 words. Level: comparable. Originality: kookcursus (join a course, ask day and price) and the B1 rooster conflict are different acts; changing group because of work hours is new.

### 3. `A2:writing:batch008-huur:1` — pass

Prompt: tenant of Woonstichting De Brug moving to another city, wants to end the tenancy. Scaffold formal ("Beste medewerker van Woonstichting De Brug,"), consistent with the catalogue's "Beste medewerker" convention. Criteria: which home (invent an address), why, from which date (invent), ask when to hand in the keys. Sample: quotes exact ("Ik huur de woning aan de Lindehof 18 in Zwolle.", "omdat ik daar een nieuwe baan heb", "Vanaf 1 december huur ik de woning niet meer."); it asks for a bevestiging instead of the keys date, so `null` for 4 is right. One error: "opzegen". Model: all four plus a phone number in the exam's format, 57 words. Level: comparable, at most slightly fuller because of two invented facts; the vocabulary (huur opzeggen, sleutels inleveren) is everyday. Originality: shares only the verb "opzeggen" with batch003-sportles (a three-line message: which class, from when, confirmation); this is a formal e-mail in another domain with a reason and a procedural question, and a rental notice is a distinct real-life genre on the needed list. Accepted; see the diversity review.

### 4. `A2:writing:batch008-bezorging:1` — pass

Prompt: washing machine bought at Elektrowinkel Van Dam, delivery Tuesday 13 October 9–12, not at home. Scaffold formal and complete. Criteria: reason (invent), another day and time (invent), address and phone (invent), ask the driver to call first. The sample's second quote spans "Kunt u de wasmachine op donderdag 15 oktober bezorgt? Dan ben ik de hele dag thuis." — "de hele dag" is accepted as the time element (any time that day), which the official adequacy scale would also accept; the model gives an explicit time ("na twee uur 's middags"). `null` for 4 is right (no call request). One error: "bezorgt" for the infinitive. Model: nine short sentences, 70 words, the longest in the batch because it carries an address and a phone number; still inside the checker's range and at A2 (average 7.8 words). Level: comparable, at the fuller end. Originality: "delivery" is on the needed list; afspraak verzetten (reschedule a visit to the neighbour) shares the reschedule move but not the setting, addressee, register or the address/phone/call elements; pakketpunt, pakket buren and schoenen are other acts.

### 5. `A2:writing:batch008-meerijden:1` — pass

Prompt: bus does not run next week because of roadworks, colleague Fatima lives nearby and drives. Scaffold informal ("Hoi Fatima," / "Groetjes,"); sample and model use jij/jou/je. Criteria: reason (given), ask for a lift, pick-up place and time (invent), something in return (invent). Sample quotes exact; the pick-up is missing, `null` for 3 right. One error: "mee rijden" as two words (the model writes "meerijden"). Model: "bij de bushalte op de Meerweg, om kwart voor acht", petrol money, 59 words. Level: comparable with the official informal e-mails to a colleague. Originality: no lift request exists; bus (listening) and stadsbus (reading) are receptive.

### 6. `A2:writing:batch008-cadeau:1` — pass

Prompt: course ends in two weeks, a group present for the teacher, e-mail to fellow student Julio. Scaffold informal. Criteria: why (inferable: the course ends, the teacher helped), which present (invent), amount per person (invent), ask Julio to come shopping. Sample quotes exact (two contiguous sentences for 1); "Iedereen in de groep kan iets betalen." names no amount, `null` for 3 right. One error: "geholpt". Model: "Iedereen betaalt dan drie euro.", 59 words. Level: comparable. Originality: no present or collection task exists anywhere in the bank.

### 7. `A2:writing:batch008-kast:1` — pass

Prompt: heavy new wardrobe, third floor, cannot carry it alone, e-mail to neighbour Karim. Scaffold informal, subject "Kun je me helpen?". Three criteria (blueprint allows 3–4): why, ask for help, day and time (invent). Sample quotes exact; duration and coffee replace the day and time, `null` for 3 right. One error: "drink we". Model: "Kan het zaterdag om tien uur?", 54 words; "Alleen krijg ik de kast niet naar boven." is natural and at A2. Level: comparable, slightly easier than the four-bullet e-mails. Originality: batch001-ladder borrows an object and promises its return; this asks for physical help on a chosen day. Different act and information, but the closest neighbour-favour pair; see the diversity review.

### 8. `A2:writing:batch008-oppassen:1` — pass

Prompt: Thursday evening work until ten, ten-year-old daughter Amina cannot stay alone, e-mail to friend Mila. Scaffold informal. Criteria: ask Mila to babysit, why, leaving and return times (invent), bedtime (invent). Sample quotes exact; food and tv replace the bedtime, `null` for 4 right; the times (half zeven to half elf) fit work until ten. One error: "pannekoeken". Model: "Om half negen moet ze naar bed.", 59 words. Level: comparable. Originality: no childcare task exists; the closest is batch002-plant (water the plant while away), which asks how long, the favour, and where the key is; see the diversity review.

### 9. `A2:writing:batch008-reizen:1` — pass (wijkkrant)

Prompt: "U krijgt elke week een wijkkrant. Iedereen uit de buurt mag iets voor deze krant schrijven. U schrijft over hoe u naar uw werk of school reist. Schrijf minimaal drie zinnen op. Schrijf in hele zinnen." with `opening` "Dit is mijn tekst over reizen naar mijn werk of school:" and `minSentences: 3`, as blueprint §4.4 prescribes. Three guiding questions: how, how long, opinion. Sample quotes exact; no duration, `null` for 2 right. One error: "met fiets". Model: 47 words, six sentences; "Ik vind fietsen fijn, want het is gezond en het kost niets." answers question 3 directly and the cycle-path sentence is a supplement, so both readings the author asked about are covered. Level: comparable with the official wijkkrant pieces (three personal questions, at least three sentences). Originality: the official topics seen were a festival, favourite clothes and the weekend; no item asks a learner to describe a commute.

### 10. `A2:writing:batch008-gezond:1` — pass (wijkkrant)

Same prompt frame, topic gezond leven; questions: what, how often, what is hard. Sample quotes exact; nothing about difficulty, `null` for 3 right. One error: "fruits". Model: 55 words, every question answered ("elke dag", "Op zondag", "Het moeilijkste vind ik snoep, want …"); "Het moeilijkste vind ik" is natural and stays at A2 (average 11 words per sentence, longest 14). Level: comparable. Originality: all health items in the bank are receptive.

### 11. `A2:writing:batch008-boodschappen:1` — pass (wijkkrant)

Same frame, topic boodschappen doen; questions: where, when, opinion of the local shops. Sample quotes exact; no time, `null` for 2 right. One error: "op de plein" (a gender error; the official scale tolerates it but it remains a valid learner error for feedback, and it is the most frequent A2 type). Model: "Ik ga meestal op zaterdagochtend, want dan heb ik vrij.", 56 words. Level: comparable. Originality: bakker (listening) is a shop incident; a first-person shopping habit piece is new. "Julianastraat" is a generic street name without number or town, not a real address.

### 12. `A2:writing:batch008-lantaarnpaal:1` — pass (form)

Prompt: broken street light in front of the house for a week, dark at night, "U meldt dit bij de gemeente. Vul het formulier in. Sommige gegevens moet u zelf bedenken." Fields: voor- en achternaam, adres, postcode, woonplaats, telefoonnummer, e-mailadres (the invented personal data, not criteria), three open fields (wat, waar precies, sinds wanneer) and one choice (reply by phone, e-mail or none), which is what a Dutch "melding openbare ruimte" form asks. The four criteria are exactly the three open fields and the choice. Sample: quotes 1, 2, 4 exact; nothing about since when, `null` for 3 right. One error: "bus halte" ("voor de Meidoornstraat 12" with an article is colloquial rather than wrong and is not counted). Model: "sinds maandag 28 september" (a Monday in 2026, a week before a plausible writing date), "voor Meidoornstraat 12 in Hoorn, naast de bushalte", 48 words. Level: comparable with the official municipal-complaint form. Originality: batch003-container is an e-mail about a wrong container; B1 oversteekplaats is a persuasive letter; the report form is a different task type and content.

### 13. `A2:writing:batch008-sportclub:1` — pass (form)

Prompt: son Sem wants to join sportclub De Sprong; registration form. Fields: child's name and date of birth, parent's name, address, postcode and town, phone, e-mail; choice of sport (voetbal, basketbal, judo, hockey: an omnisportvereniging is normal in the Netherlands); open: training days, earlier experience and where, why. Criteria are the choice and the three open fields; no bank details are asked, rightly. Sample: quotes exact; nothing about earlier experience, `null` for 3 right. One error: "Hij vind". Model: "twee jaar gevoetbald bij een club in onze oude stad", 56 words, longest sentence 16 words (within the A2 limit of 18). Level: comparable with the official registration forms; the third-person "hij" adds no difficulty. Originality: batch003-sportles cancels a class; zwemles (reading) and voetbal (listening) are receptive; registration is new and "a sports club" is on the needed list. Sem as a teenage son matches the cast (teenage boy).

### 14. `A2:writing:batch008-nieuwe-patient:1` — pass (form)

Prompt: moved house, looking for a dentist; Tandartspraktijk Molenzicht's new-patient form. Fields: name, date of birth, address, postcode and town, phone, name of the health insurer (a real dental form asks this; the learner invents a name and it is not a criterion), open: why this practice, last dental visit, days and times, plus a reminder choice (sms, e-mail, phone) that is not a criterion. Criteria are the three open fields; no medical information is requested. Criterion 1 has no "Bedenk zelf", but the prompt's "Sommige gegevens moet u zelf bedenken" covers the invented reason. Sample: quotes 2 and 3 exact (the third spans two sentences); no reason for the practice, `null` for 1 right. One error: "Op vrijdag ik ben" (no inversion). Model: distance, the neighbour, "in maart … voor een controle", availability, 54 words. Level: comparable. Originality: tandarts (listening) is a voicemail; huisarts afspraak (reading) is receptive; a registration form is a different act.

### 15. `A2:writing:batch008-restaurant:1` — pass (picture note)

Prompt: "U werkt in een restaurant. Straks komt uw collega Roos. Zij moet een paar dingen doen. Kijk naar de plaatjes. Schrijf een briefje voor Roos. Vertel wat zij moet doen. Schrijf drie dingen op. Schrijf in hele zinnen." matches the official note-to-a-colleague type. Scaffold "Hallo Roos," / "Groeten,". Three briefs: setting a table (plates, glasses, cutlery), cleaning a large window with cloth and spray bottle, washing glasses at a sink; each shows one chore, the same woman with the cast's fixed traits, "No text" in every brief; `kind: drawing`; Dutch alts describe the scene. Criteria mirror the pictures (tafels dekken, ramen schoonmaken, glazen afwassen). Sample: quotes exact; no windows, `null` for 2 right. One error: "De borden en glazen staat". Model: all three chores in order, 49 words. Level: comparable. Originality: first restaurant setting in the bank.

### 16. `A2:writing:batch008-supermarkt:1` — pass (picture note)

Same frame for colleague Sem in a supermarket. Briefs: milk cartons ("plain white cartons without any text or logos") into the cooler, a row of trolleys across the car park, sweeping an aisle; same teenage boy with the cast's traits; no text or signage. Criteria mirror the pictures. Sample: quotes exact; no sweeping, `null` for 3 right. One error: "de magazijn". Model: all three with "Als laatste moet je de vloer vegen bij de ingang.", 46 words. Level: comparable. Originality: winkelcentrum (listening) and magazijn (reading) are receptive; a shift note is new. The two picture notes share the frame by definition of the type and differ in setting and chores; a mock form holds at most one of them.

## Revision requests

None. No task fails a rubric check, so no field needs to change before integration.

Observations the coordinator may act on or leave, none of which blocks (a byte change would need a focused re-review):

- `batch008-nieuwe-patient` criteria[0]: adding "Bedenk zelf een reden." would make the invented reason explicit like the other invented elements; the prompt sentence already covers it.
- Choice fields: lantaarnpaal and sportclub make their choice a criterion, nieuwe-patient does not. Both readings work in the app (the answer box starts with the labels), and a "choose a reminder" criterion would be trivially satisfiable, so the current set is accepted; one rule for all forms would be tidier.
- `batch008-bezorging` model: "Dan doe ik meteen open." can be dropped to bring the model to 66 words; the 70-word model is accepted as it is.
- `batch008-restaurant` criteria[1] says "de ramen" while the brief shows one large window; a learner writing "het raam" meets the criterion, and the feedback instructions should treat singular and plural alike.
- Feedback instructions should accept "Dan ben ik de hele dag thuis." as the time element of bezorging criterion 2, as this review does.

## Sentence starters

`content/batches/008-starters.json` keys match the sixteen item ids in batch order; every task has exactly one starter per criterion in criteria order (4, 4, 4, 4, 4, 4, 3, 4, 3, 3, 3, 4, 4, 3, 3, 3); every starter contains "…"; none equals or is contained in the model; none states a fact the prompt does not give (the dates and days in "Op dinsdag 13 oktober ben ik niet thuis, want …" and "Kun jij donderdagavond …?" come from the prompts); the register follows the scaffold (u-forms in the four formal e-mails and the tandarts form, je/jij/jou in the four informal e-mails and both picture notes, first person in the wijkkrant pieces and the two forms without an addressee). Each fragment was completed with a natural answer and checked for grammar and alignment with its criterion:

| Task | Completion test (starter → natural completion) | Verdict |
| --- | --- | --- |
| contract | "… op 31 oktober." / "… blijven werken." / "… ik graag met klanten praat." / "… een nieuw contract?" | pass |
| groep | "… dinsdagavond." / "… ik nu elke avond werk." / "… donderdagochtend om negen uur." / "Kan ik in die groep komen?" | pass |
| huur | "… de Lindehof 18 in Zwolle." / "… ik naar Utrecht verhuis." / "Vanaf 1 december huur ik …" / "… de sleutels inleveren?" | pass |
| bezorging | "… ik moet werken." (want + main clause) / "… donderdag 15 oktober om twee uur?" (day and time, as criterion 2 asks) / address and number / "… mij eerst bellen?" | pass |
| meerijden | "… de bus niet rijdt." / "… meerijden?" / "… de bushalte om kwart voor acht." / "Als dank wil ik graag meebetalen aan de benzine." | pass |
| cadeau | "… de cursus stopt." / "… een doos chocolade." / "… drie euro." / "… het cadeau te kopen?" (om … te) | pass |
| kast | "… de kast heel zwaar is." / "… helpen?" / "… zaterdag om tien uur?" | pass |
| oppassen | "… op Amina passen?" / "… werken tot tien uur." / "… half zeven … half elf …" / "… half negen …" | pass |
| reizen | "… de fiets naar mijn werk." / "… twintig minuten." / "… fijn, want het is gezond." | pass |
| gezond | "Om gezond te blijven wandel ik elke dag." / "… drie keer per week." / "Moeilijk vind ik snoep, want …" | pass |
| boodschappen | "… de supermarkt op het plein." / "… zaterdagochtend." / "… goed, want alles is dichtbij." | pass |
| lantaarnpaal | "… de lantaarnpaal voor mijn huis kapot is." / "… Meidoornstraat 12." / "… een week." / "… e-mail." | pass |
| sportclub | "… voetballen." / "… maandag en woensdag." / "… een club in onze oude stad." / "… zijn vrienden daar spelen." | pass |
| nieuwe-patient | "… u dicht bij mijn huis zit." / "… maart." / "… dinsdag en donderdag na half vijf." | pass |
| restaurant | "… dekken?" / "… schoonmaken." / "… afwassen?" | pass |
| supermarkt | "… in de koeling?" / "… van de parkeerplaats halen." / "… de vloer vegen." | pass |

Notes, none blocking: the gezond starter "Om gezond te blijven …" needs inversion in the completion; it is grammatical when completed naturally and the structure is common, but "Om gezond te blijven doe ik …" or the author's "Ik blijf gezond door …" would carry the inversion for the learner if the coordinator prefers a safer A2 fragment. The sportclub starter "Hij heeft deze sport eerder gedaan bij …" commits to a "yes"; the criterion's "en waar" expects that branch and a learner who chooses "no" writes a full sentence without the starter, as with the other structural commitments in the file ("Ik wil antwoord per …" beside the option "geen antwoord nodig"). The picture-note starters name the pictured objects and leave the verb phrase; that is the learning content, and it matches the accepted "Wilt u mijn plant …?" pattern.

Starters verdict: pass. `npm run content:integrate` merges a batch's starters into `content/hints/sentence-starters.json` and moves the overlay hash in `content/hints/review.json` when the review JSON records `starters_source`, `starters_sha256` and `starters_verdict: "pass"`, which `008-review.json` does; no separate overlay review is needed for this merge.

## Diversity review

Sixteen distinct settings and acts across all four task types and all eight A2 domains, with formal and informal registers in near-equal numbers. No slug reuse; no re-skin of a catalogue item; the situational prompt sentences are original and only the fixed exam instructions ("Schrijf de e-mail. Schrijf in hele zinnen.", "Schrijf minimaal drie zinnen op.", "Vul het formulier in. Sommige gegevens moet u zelf bedenken.") mirror the official format, which the blueprint requires.

Near pairs flagged by the author, with the reviewer's decision:

1. huur vs batch003-sportles (both "opzeggen"): accepted. Different domain, register, length and information (reason and keys); the blueprint asks for wonen content and a rental notice is a distinct genre.
2. lantaarnpaal vs B1 oversteekplaats: accepted. Different level and task type (report form vs persuasive letter).
3. nieuwe-patient vs the tandarts voicemail: accepted. Different part and act; no medical content.
4. oppassen vs batch002-plant: accepted. Both ask a friend a favour during an absence, but the favour, the reason and the two time elements differ.
5. kast vs batch001-ladder (not flagged by the author as a doubt, noted in the matrix): accepted. Borrowing an object versus asking for help carrying, with different information; the closest pair across neighbour favours.
6. bezorging vs afspraak verzetten: accepted. The reschedule move recurs, the setting, addressee and three of four elements do not.

Set assembly: drills should not pair oppassen with plant, kast with ladder, or huur with sportles; a mock form takes at most one picture note (the official booklets show one across three forms) and the two picture notes share a frame. Within the batch the three wijkkrant pieces share the official three-question structure and differ in topic; the two picture notes differ in setting and chores. Cast names recur (Sem in sportclub and supermarkt, Amina in oppassen) in roles consistent with the cast; consecutive tasks in a form should not reuse a name.

## Notes for the coordinator

- Integration: `008-review.json` records both hashes and `starters_verdict: "pass"`; the starters merge happens inside `npm run content:integrate` (see above). The reviewer did not run it.
- Media: the picture notes carry three `images[]` briefs each without `file`; `scripts/illustrate.ts` generates one job per entry (kind `still`, 1024×640) because the items are not speaking tasks, whereas `config/illustration.json` prefers one three-panel generation for a sequence. Either route works with these briefs, which repeat the fixed traits in every panel; the image review must confirm the traits match across the three pictures, no text appears on cartons, windows or shop signs, and the answer-relevant chore is unambiguous.
- Blueprint §10 still states 20–45 words for A2 open-task models; the checker enforces 20–90 and this batch's four-bullet e-mails need 54–70. Update the sentence in the blueprint when convenient so authors and reviewers use one figure.
- `content/exemplars/` does not exist; the level check here is against the official task descriptions. A stored pair of exemplars per task type would make the next review's level check reproducible.
- Coverage: instanties has one task (lantaarnpaal); the author's police-report idea (a stolen bicycle) is a reasonable candidate for a later batch if a check against the official booklet's police-report content is possible.

## Limitations

This is an AI editorial review. It does not replace review by Dutch-language educators, learner trials, blueprint validation or psychometric calibration, and it does not establish equivalence with an official exam. The A2 labels remain unvalidated authoring targets; the per-task level judgments compare the tasks with the official task descriptions, not with learner data. The review covers text and image briefs only; the generated illustrations and any feedback prompts that use these criteria need their own review after media production.

## Focused re-review (10 September 2026)

**Scope:** the two model-answer revisions the coordinator applied after `content/reviews/008-level-check.md` (see "Coordinator revision after the level check" in `008-notes.md`). Confirmed against the catalogue copies of the sixteen items that nothing else in `008-original.json` changed: apart from `status`, `revision` and the image `file` fields, the only differing fields are the `model` of `batch008-bezorging` and the `model` of `batch008-supermarkt`. Criteria, samples, quotes, scaffolds and the starters file are byte-identical (starters SHA-256 re-verified: `44594f78…e7ede9`).

**New SHA-256 of `008-original.json`:** `e8a0e222e299125c6737ef75176587cf2c6335f7da2bbf932f86c902c82ecfa0` (previous: `f5101326…3602eb9a2`). Checker on the new bytes: `Checked 16 items, 0 questions.` / `info 16 of 16 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.` / `No failures, no warnings.` The info line is expected for a revision.

### bezorging — pass

- **Change.** "…, maar dan ben ik niet thuis. Ik moet die dag werken." became "…, maar dan moet ik werken."; "Mijn adres is Kastanjestraat 7 in Almere. Mijn telefoonnummer is …" became one sentence joined with "en". "Dan doe ik meteen open." was kept.
- **Count.** 7 sentences (was 9); 65 words counting the numerals as the original review did (was 70), 57 without the eight numerals (the coordinator's note says 58, which counts "89." as a word; same text). Average 9.3 tokens per sentence; longest 14 tokens ("Kunt u … 's middags?") apart from the address-and-phone sentence, 16 tokens of which 10 are words. Inside the four-to-eight-sentence range of blueprint §4.4 and no longer the outlier of the batch.
- **Criteria.** (1) reason for not being home on 13 October: "U bezorgt de wasmachine op dinsdag 13 oktober, maar dan moet ik werken." — the reason is tied to the date by "dan"; the fact of not being home is the prompt's own premise, and the sentence answers the "waarom" the criterion asks. (2) new day and time: "donderdag 15 oktober … na twee uur 's middags" (a Thursday in 2026, verified). (3) address and phone: "Kastanjestraat 7 in Almere … 06 23 45 67 89". (4) call first: "Kan de bezorger mij eerst bellen?". All four met.
- **Level.** No subordinate clause at all; coordination with "maar" and "en", fronted "dan" with inversion, modal + infinitive, present and perfect tense, everyday vocabulary (wasmachine, bezorgen, werken, thuis, bellen, opendoen). Reads as A2 throughout.
- **Prompt and scaffold.** No prompt sentence appears in the model; the merge also removed the near-echo of the prompt's "U bent dan niet thuis." "u" is held in every sentence, and the body stops before the scaffold's "Met vriendelijke groet," without repeating it.
- **Non-blocking.** The revised sentence writes "'s middags" with a typographic apostrophe (U+2019) while the batch's other eight apostrophes ('s avonds, collega's) are ASCII. The catalogue already mixes both forms (zo'n, auto's in B1 items), so nothing breaks; normalise it at the next byte change of the batch rather than now, since any edit moves the hash again. The level check's alternative remedy (drop "uw adres en" from criterion 3, or move the address into the header) was not taken; the criteria load is unchanged, so bezorging stays last in the formal e-mail drill order as the level check recommended.

### supermarkt — pass

- **Change.** "want er staan er veel buiten" became "want er staan veel wagens buiten".
- **Count.** 6 sentences, 46 words (unchanged: the swap keeps the token count), longest sentence 15, average 7.7.
- **Sentence.** Existential "er" + plural verb + quantified noun + place ("er staan veel wagens buiten") is a standard A2 pattern and the double "er" is gone. "wagens" picks up "de winkelwagens" earlier in the same sentence, so the referent is unambiguous and the shortening is natural cohesion, not a new word. No change needed.
- **Criteria.** (1) "Wil je de melk in de koeling zetten?" (2) "Daarna moet je de winkelwagens ophalen van de parkeerplaats" (3) "Als laatste moet je de vloer vegen bij de ingang." All three met; "je" throughout with "Hoi Sem," / "Groeten,"; no prompt sentence copied; body does not repeat the closing.
- **Out of scope, noted.** The sample still contains "Er staan er veel buiten." as learner text; it is correct Dutch, the level check objected only to the model showing it, and the sample was not part of this revision.

**Verdict:** both revisions pass. `008-review.json` now records the new source hash and a `revisions` entry; `batch_verdict: "pass"` and `ready_for_integration: true` stand, `starters_sha256` is untouched. The per-item evidence for bezorging above ("70 words in nine short sentences"), the "46–70" model-length range and the observation about dropping "Dan doe ik meteen open." describe the previous hash; the revisions entry carries the current figures. The batch can be re-integrated with `npm run content:integrate`; the integrate step will re-check both hashes.
