# Batch 090: author notes (A2 Luisteren, twelve fragments)

Batch 090 holds twelve original A2 listening fragments with 28 closed questions. It follows `docs/briefs/a2-expansion-2026-11-05.md` (section "090"), `docs/briefs/author.md` and `content/blueprint.md` §4.2. Each item has a situation line, a script with voice roles from `config/voices.json`, 84–168 spoken words, two or three questions with three or four options, and one context still (`kind: drawing`). The slugs, task types, domains and topics are the ones the plan assigned. All scenarios, scripts, questions and options were written for this project. Official material was read for structure only. `text` is built mechanically from the script as "Speaker: text" lines, and every `evidence` is a verbatim substring of `text`. No audio or pictures exist yet; media and derived fields are left out. Levels are authoring targets (`targetLevelValidated: false`). This is AI-authored material: nothing here claims validated CEFR difficulty or exam equivalence.

## 1. Batch matrix

| # | slug | taskType | domain | Speakers → roles | Turns | Spoken words | ≈ s at 2.2–2.5 w/s | Q | Tone |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | adres-wijzigen | gesprek | instanties | Medewerker → f-adult; Mehmet → m-young | 10 | 130 | 52–59 | 2 | ordinary |
| 2 | buren-keuken | gesprek | wonen-buurt | Kevin → m-casual; Buurvrouw → f-older | 10 | 156 | 62–71 | 2 | lightly humorous |
| 3 | uitnodiging-gesprek | gesprek | werk | Medewerker (personeelszaken) → m-adult; Joyce → f-young | 10 | 150 | 60–68 | 3 | ordinary |
| 4 | school-ziek-kind | voicemail | opleiding | Juf Danielle → f-adult | 1 | 121 | 48–55 | 2 | ordinary |
| 5 | rijles-verzet | voicemail | vervoer | Bart (instructeur) → m-older | 1 | 100 | 40–45 | 2 | ordinary |
| 6 | museum-sluit | omroep | vrije-tijd-familie | Omroeper → narrator | 1 | 84 | 34–38 | 3 | ordinary |
| 7 | bus-voor-trein | omroep | vervoer | Omroeper → narrator | 1 | 105 | 42–48 | 2 | ordinary |
| 8 | afvalpas-uitleg | uitleg | wonen-buurt | Medewerker van de gemeente → f-mature | 1 | 168 | 67–76 | 3 | ordinary |
| 9 | fysio-oefeningen | uitleg | gezondheid | Fysiotherapeut → m-adult | 1 | 144 | 58–65 | 2 | ordinary |
| 10 | ziekenhuis-parkeren | nieuws | gezondheid | Nieuwslezer → presenter | 1 | 122 | 49–55 | 3 | ordinary |
| 11 | nieuwe-zwemplas | nieuws | vrije-tijd-familie | Nieuwslezer → presenter | 1 | 123 | 49–56 | 2 | ordinary, warm |
| 12 | kapsalon-reclame | reclame | winkels-diensten | Kapster → f-young | 1 | 122 | 49–55 | 2 | ordinary, warm |

Totals: 12 items and 28 questions (4 × 3, 8 × 2). 22 questions have three options and 6 have four (21%). Keys: A 8, B 8, C 9, D 3 (29 / 29 / 32 / 11%). No key occurs three times in a row in file order (D B A D C A B C A C B C C A C D B C A B A B C A B C B A). Skills: rule-application 8, time-place 7, quantity 5, detail 4, advice 2, person 1, purpose 1. Twelve prompts are persona scenarios (a situation sentence first, then the question), spread over the nine monologues. The three conversations ask direct questions about their speakers. Twenty prompts name the listener or a speaker. Spoken length is 84–168 words, about 34–76 seconds. The `text` length with labels is 85–172 words, inside the checker's 60–210.

Tone: item 2 is the batch's one lightly humorous item (one in twelve; the plan allows about one in eight). Kevin apologises that the builders start at half past seven, and the older neighbour replies that she is awake at six every day anyway. Items 11 and 12 are ordinary with a little warmth (a free lake, a free coffee in the first month). Everything else is plain everyday business.

The three conversations carry `notes`: "In het officiële examen kan zo'n gesprek als video worden getoond; hier is het audio met één still." (blueprint §4.2).

## 2. Premises, facts mirrored and invented names

All settings are fictional. The generic facts were chosen to be generally true in the Netherlands and are stated as an ordinary organisation would state them:

1. **adres-wijzigen.** The gemeente usually works by appointment at the counter and asks for ID plus proof of residence; for a rented home that is the rental contract. A municipal move form such as Vaals's ([aangifte van vestiging](https://www.vaals.nl/data/downloadables/3/0/aangifte-van-vestiging-in-verhuizing-naar-vaals.pdf)) asks for an identity document and the rental or purchase contract. Den Haag's [bewijs van bewoning](https://www.denhaag.nl/nl/verhuizen-en-migratie/bewijs-van-bewoning/) page shows the same principle. Both were checked on 5 November 2026. The new address takes effect on the moving date. A move may be reported up to four weeks before the move and no later than five days after it (the integrated KNM card `A2:knm:batch003-verhuizing:1`). Mehmet reports on Thursday 5 November for a move on Saturday 14 November, so the timing is inside that window. The script gives no deadline, no sanction and no legal advice. The clerk asks only for ID and the contract and sends him to book a new appointment on the website. That is a simple, common practice; some gemeenten also accept an upload, but the script makes no general claim about that. The calendar is real: 9 November 2026 is a Monday and 14 November 2026 a Saturday.
2. **buren-keuken.** A neighbour warns the next-door neighbour before a renovation: noisy demolition days, quieter fitting days, a skip in the street and a note with phone numbers. Kitchen fitters commonly work from half past seven to four.
3. **uitnodiging-gesprek.** An HR employee invites an applicant, moves the time when she cannot make the first one, and gives the address, the side door near the kitchen, who to ask for (the head of the kitchen, a woman, which avoids the male-boss stereotype) and what to bring (ID and diplomas; the CV and letter are already in). This is ordinary hotel practice; no wage, contract or legal point is made.
4. **school-ziek-kind.** Primary schools in the Netherlands do not send a sick child home alone. They call a parent, who either collects the child or names another adult. The teacher asks the parent to call the school number because she is teaching. No medical detail is given beyond a headache and no fever.
5. **rijles-verzet.** An instructor cancels because the lesson car needs servicing, offers two slots, keeps the meeting point and asks for a text message or, if neither slot suits, a call after six.
6. **museum-sluit.** A closing-time announcement fifteen minutes before five o'clock: the café closed earlier, coats and bags must be collected from the cloakroom now, and the museum shop stays open ten minutes longer.
7. **bus-voor-trein.** Weekend engineering works with replacement buses from the bus station behind the station, about thirty minutes' extra travel time, and the train ticket valid on the bus. NS states that a valid ticket is needed on replacement transport and that nothing extra is charged (summarised from [ns.nl werkzaamheden](https://www.ns.nl/reisinformatie/betere-reis/werkzaamheden-amsterdam.html), checked 5 November 2026). The script says only "Uw treinkaartje is ook geldig in de bus" and gives no check-in procedure. Deventer, Apeldoorn and Zwolle are real towns on a real line. The disruption is fictional and NS is not named, as with Leiden and Den Haag in batch 023.
8. **afvalpas-uitleg.** Many gemeenten use underground containers: residual waste opened with a pass, paper and cardboard, and plastic/metal/drinks cartons (PMD) usually open without one, with glass at the bottle bank. A first pass per household is commonly free, and a replacement or extra pass costs a small fee. The amounts (five euro extra, ten euro replacement) are invented and plausible. The script does not mention fines.
9. **fysio-oefeningen.** Three standard home exercises for non-specific low back pain: knee rocking on the back, the "cat" on hands and knees, and daily walking. They come with the usual advice that a little pain is normal and that an exercise should be stopped when it hurts a lot. There is no diagnosis or medication.
10. **ziekenhuis-parkeren.** Hospitals often charge patients and visitors by the hour with a day cap. The prices (two euro fifty now, one euro from 1 February, eight euro a day at most) are invented and realistic. The hospital and town are unnamed ("het nieuws uit onze stad").
11. **nieuwe-zwemplas.** Municipal swimming lakes are usually free, with a lifeguard at weekends, no dogs on the beach and paid parking. The opening date "zaterdag twaalf juni" is a Saturday in 2027 (the broadcast is undated). The lake sits behind an unnamed sports park.
12. **kapsalon-reclame.** A new hairdresser: walk in on weekdays, appointment only on Saturday, prices for a cut, a wash and cut, and children up to twelve, late opening on Thursday, and free coffee in the first month.

**Invented names, checked on the web on 5 November 2026:**
- **Hotel De Groene Kade.** Searches for `"Hotel De Groene Kade"` and `"De Groene Kade" hotel OR restaurant` found no business of that name. The nearest real names are Boutique Hotel De Grote Kade (Goes), De Kade (Groningen) and Boetiek Hotel de Kade (Zaandam). The reviewer may prefer a name further from "De Grote Kade".
- **Kapper Kort en Krul.** Searches for `"Kapper Kort en Krul"` and `"Kort en Krul" kapsalon` found no salon of that name, only generic salon listings.
- Streets and areas are generic: Havenstraat, Lindestraat and Bomenbuurt. I changed Molenstraat to Lindestraat because sibling batch 089 already uses Molenstraat for its bicycle shop. I changed Bloemenbuurt to Bomenbuurt because the catalogue already uses Bloemenbuurt four times. None of the three occurs in the catalogue or in batches 087–095. No house number is paired with a town.
- The surname "de Bruin" (Joyce de Bruin) is common and occurs nowhere in the catalogue or batches 087–095. I replaced "Vermeulen", which the catalogue already uses.

## 3. Names and people drawn

| Name | Items | Role |
| --- | --- | --- |
| Mehmet | 1, 9 | moves house; physio patient (drawn in both) |
| Kevin | 2, 12 | neighbour (drawn in 2); hears the ad (12, not drawn) |
| Joyce | 3, 5 | job applicant; driving student (drawn in both) |
| Ilham | 4, 11 | mother of Fenna (drawn in 4); hears the news (11, not drawn) |
| Fenna | 4 | Ilham's daughter (not drawn) |
| Danielle | 4, 6 | the teacher (voice only); a museum visitor with her children (drawn in 6) |
| Bart | 5, 8 | the driving instructor (voice only); a resident (8, not drawn) |
| Youssef | 7, 10 | traveller; hospital visitor (drawn in both) |

Unnamed roles: de medewerker (gemeente, hotel, gemeente containers), de buurvrouw, de baas van het keukenbedrijf, de chef van de keuken, de omroeper, de fysiotherapeut, de nieuwslezer, de kapster. No voice name and none of the older recurring cast appears as a character. Danielle and Bart in their two items are clearly different people (a teacher and a mother; an instructor and a resident).

People drawn in two pictures keep three traits, copied verbatim:
- **Mehmet** (items 1, 9): "a man in his thirties with short black hair, a neat beard and a green sweater".
- **Joyce** (items 3, 5): "a young woman with long curly brown hair and a yellow sweater".
- **Youssef** (items 7, 10): "a man in his twenties with a short black beard and a grey jacket".

## 4. Pictures

One still per item, a short positive brief (34–58 words) ending "No text.", and a Dutch alt that uses listed words only. No still shows a tested fact:
1. Mehmet and a clerk at the counter. No documents are named, so neither the contract nor a date is shown.
2. Kevin and the neighbour at her front door. There is no container, clock or builder.
3. Joyce on the sofa, phoning. There is no time, door or documents.
4. Ilham outside an office, listening to her phone. The school is not shown.
5. Joyce on a pavement, listening to her phone, with a white car passing. There is no bus stop, garage or clock. The car is general context; no question asks about the car or the garage.
6. Danielle and two children in a museum hall, wearing sweaters (no coats, because q3 is about coats). There is no café, shop or clock.
7. Youssef on a platform. There is no bus, sign or ticket.
8. The gemeente employee with residents and three containers (grey, blue, orange). The picture does not link a colour to cardboard, and no pass, post or website is shown.
9. Mehmet on a mat with a male physiotherapist (the voice is m-adult). The picture shows no count of repetitions and no stop sign.
10. Youssef at a kitchen table with a radio. There is no car park, bus or price.
11. An empty lake landscape with a beach, a lawn and a bicycle path. There is no dog and no lifeguard, so neither key is shown.
12. A hairdresser cutting a man's hair. There is no child, price or clock.

## 5. Diversity against the catalogue and sibling batch 089

The existing A2 listening items include the tandarts voicemail, taalles buurthuis, the market announcement, schoolreis, the station announcements (002-trein, 023-spoor), bakker, zwembad uitleg, the batch 005 set, the batch 022 set (garage, kinderopvang, sluitingstijd, fietsbrug, koffiegeld, taalcafé, loket, paspoort-klaar, pakket) and the batch 023 set (bloedonderzoek, studiedag, spoor, cv-workshop, bezorgservice, verjaardagstaart, turnles, hitte, herhaalmedicijn). Batch 089 runs at the same time with vakantie-aanvragen, huiswerk-juf, woning-bekijken, fysio-verzet, boek-gereserveerd, tram-omleiding, toernooi-sporthal, printer-uitleg, intake-taalschool, bibliotheek-verhuist, fietsenwinkel-reclame and rijschool-reclame. None of the twelve slugs exists in the catalogue (the checker reports no slug warning).

Closest neighbours, and why each item is still distinct:
- **museum-sluit vs 022-sluitingstijd.** Both are closing-time announcements. The supermarket one is about an early closing and the tills. This one has several facilities with different times (the café already closed, the halls at five, the shop until ten past) and the cloakroom.
- **bus-voor-trein vs 023-spoor, 002-trein and 089-tram-omleiding.** Those are a platform change, a single platform fact and a tram diversion with a bus. This is a weekend line closure with replacement buses from another side of the station, extra travel time and ticket validity.
- **fysio-oefeningen vs 089-fysio-verzet.** 089 is a voicemail that moves an appointment. This is the therapist's explanation of home exercises (frequency, repetitions, when to stop).
- **rijles-verzet vs 089-rijschool-reclame.** 089 is an advertisement. This is a cancellation voicemail with alternatives.
- **adres-wijzigen vs KNM 003-verhuizing and 022-paspoort-klaar.** The KNM card states the reporting window and the passport voicemail is a pick-up notice. This is the counter conversation itself, with a missing document.
- **afvalpas-uitleg vs B1:speaking:batch031-afvalcontainers and A2:writing:batch003-container.** Those are a B1 speaking task and an A2 writing complaint. This is the A2 listening explanation of the pass and the colours.
- **school-ziek-kind vs 001-schoolreis and 023-studiedag.** A trip voicemail and a study-day announcement. This is a sick-child pick-up call.
- **ziekenhuis-parkeren and nieuwe-zwemplas vs 005-speelplaats, 022-fietsbrug and 023-hitte.** These are other local news topics. No existing item covers hospital parking or a swimming lake; 002-zwembad is an explanation at an indoor pool.
- **uitnodiging-gesprek vs 023-cv-workshop and 005-werkdag.** A workshop and a first day. This is the interview invitation call.
- **kapsalon-reclame.** The A2 speaking topic "kapper afspraak" is a speaking task. No listening item covers a hairdresser.

Domains: wonen-buurt 2, vervoer 2, gezondheid 2, vrije-tijd-familie 2, instanties 1, werk 1, opleiding 1, winkels-diensten 1. Neighbourhood appears only where the plan assigned it (items 2 and 8).

## 6. Voice roles

Every conversation uses two different roles, and no conversation pairs m-adult with f-adult. The narrator reads both station and museum announcements, and the presenter reads both news items.

| # | Roles | Why |
| --- | --- | --- |
| 1 | f-adult + m-young | counter clerk; a young man moving house |
| 2 | m-casual + f-older | relaxed young neighbour; older neighbour (Hanneke; spectral-v1 applies) |
| 3 | m-adult + f-young | HR caller; young applicant |
| 4 | f-adult | a teacher |
| 5 | m-older | an experienced instructor |
| 6, 7 | narrator | announcements in a museum and a station |
| 8 | f-mature | a gemeente employee explaining to residents |
| 9 | m-adult | a physiotherapist (male, as drawn) |
| 10, 11 | presenter | radio news |
| 12 | f-young | the hairdresser voicing her own shop's radio ad |

Role use: f-adult 2, f-young 2, m-adult 2, narrator 2, presenter 2, m-young 1, m-casual 1, m-older 1, f-older 1, f-mature 1. m-shop is not used.

## 7. Questions: keys, evidence and distractor rationales

Each key follows from its `evidence` quote. The competing details sit elsewhere in the fragment.

### 1 adres-wijzigen
- **q1** detail (4), key **D** "Mehmet heeft het contract niet bij zich." Evidence: "Zonder huurcontract kan ik uw adres niet veranderen."
  - A: he has an appointment at ten (the clerk says so first).
  - B: he hands over his id-kaart.
  - C: true (the key comes on Monday) but not the reason; the clerk needs the contract, not the key.
- **q2** time-place (3), key **B** "Vanaf veertien november." Evidence: "Uw nieuwe adres geldt dan vanaf veertien november."
  - A: the day he gets the key.
  - C: a plausible misconception (the date of registration). The clerk says the moving day counts.

### 2 buren-keuken
- **q1** time-place (3), key **A** "Op maandag en dinsdag." Evidence: "Op maandag en dinsdag halen de mannen de oude keuken eruit. Dan hoort u veel lawaai."
  - B: the quieter fitting days.
  - C: how long the container stays.
- **q2** time-place (4), key **D** "Vanaf vijf uur." Evidence: "Vanaf vijf uur kunt u mij bellen."
  - A: when the neighbour wakes up (the joke line).
  - B: when the builders start.
  - C: when they stop. During the day she calls the boss of the kitchen firm instead.

### 3 uitnodiging-gesprek
- **q1** time-place (3), key **C** "Om twee uur." Evidence: "Wat vindt u van dinsdag om twee uur?" (accepted in the next turn).
  - A: the first offer, which she declines.
  - B: the time she finishes work.
- **q2** person (3), key **A** "Naar de chef van de keuken." Evidence: "Vraag daar naar de chef van de keuken."
  - B: the reception is for guests, at the main entrance she must not use.
  - C: the caller's department, who only phones.
- **q3** detail (3), key **B** "Haar id-kaart en haar diploma’s." Evidence: "Ja, neem uw paspoort of id-kaart mee, en uw diploma’s."
  - A: the two papers the hotel already has.
  - C: mixes one right document with one that is not needed.

### 4 school-ziek-kind
- **q1** purpose (3), key **C** "Fenna voelt zich niet goed." Evidence: "Ik bel over Fenna. Ze voelt zich niet goed."
  - A: explicitly negated ("Koorts heeft ze niet").
  - B: a misreading of "Ze mag niet alleen naar huis lopen".
- **q2** rule-application (3), key **A** "Het nummer van de school bellen." Evidence: "Bel dan wel even terug en zeg de naam van die persoon. Bel het nummer van de school, niet mijn eigen telefoon."
  - B: the teacher says not to (she is teaching).
  - C: not allowed.

### 5 rijles-verzet
- **q1** rule-application (3), key **C** "Op maandag om vijf uur." Evidence: "Vrijdag om half negen ’s ochtends, of maandag om vijf uur ’s middags." Joyce works on Friday morning, so the learner combines two details.
  - A: the cancelled lesson.
  - B: the slot that clashes with her work.
- **q2** advice (3), key **B** "Bart na zes uur bellen." Evidence: "Kun je allebei niet? Bel me dan na zes uur."
  - A: only if she chooses one of the two slots.
  - C: the cancelled lesson's day plus the unchanged meeting point.

### 6 museum-sluit
- **q1** time-place (4), key **C** "Tot tien over vijf." Evidence: "De museumwinkel bij de uitgang blijft tien minuten langer open, tot tien over vijf."
  - A: when the café closed.
  - B: when the halls close.
  - D: "over een kwartier" misheard as quarter past five.
- **q2** detail (3), key **C** "Het café." Evidence: "Het café op de eerste verdieping is al dicht, sinds half vijf."
  - A: the halls close at five.
  - B: the shop closes at ten past.
- **q3** advice (3), key **A** "De jassen nu ophalen." Evidence: "Hebt u een jas of een tas in de garderobe? Haal die dan nu op."
  - B: "Morgen is het museum weer open" misapplied.
  - C: the café is already closed.

### 7 bus-voor-trein
- **q1** quantity (3), key **C** "Ongeveer dertig minuten." Evidence: "Uw reis naar Apeldoorn duurt ongeveer dertig minuten langer."
  - A: the walk to the bus station.
  - B: the bus frequency.
- **q2** rule-application (4), key **D** "Zijn treinkaartje gebruiken." Evidence: "U hoeft geen nieuw kaartje te kopen. Uw treinkaartje is ook geldig in de bus."
  - A: explicitly unnecessary.
  - B: trains run normally again on Monday, but buses run now.
  - C: Zwolle trains run, but in the wrong direction.

### 8 afvalpas-uitleg
- **q1** rule-application (4), key **B** "In de blauwe container." Evidence: "De blauwe container is voor papier en karton."
  - A: residual waste.
  - C: plastic, tins and cartons; "pakken van melk" may tempt a learner to think of cardboard.
  - D: glass.
- **q2** quantity (3), key **C** "Tien euro." Evidence: "Bent u uw pas kwijt? Dan kost een nieuwe pas tien euro."
  - A: the first pass is free.
  - B: the price of an extra pass.
- **q3** detail (3), key **A** "Met de post." Evidence: "U krijgt de pas deze week met de post. U hoeft dus niet naar het gemeentehuis."
  - B: explicitly unnecessary.
  - C: the website is only for a replacement pass.

### 9 fysio-oefeningen
- **q1** quantity (4), key **B** "Twee keer." Evidence: "Doe deze twee oefeningen twee keer per dag, één keer ’s ochtends en één keer ’s avonds."
  - A: "één keer ’s ochtends" heard alone.
  - C: the number of exercises.
  - D: the repetitions.
- **q2** rule-application (3), key **A** "Stoppen met die oefening." Evidence: "Stop dan meteen met die oefening. De andere oefeningen doet u gewoon."
  - B: over-generalises the rule.
  - C: applies only to a little pain.

### 10 ziekenhuis-parkeren
- **q1** quantity (3), key **B** "Eén euro." Evidence: "Vanaf februari is dat één euro per uur."
  - A: the current price.
  - C: the day cap.
- **q2** time-place (3), key **C** "Naast de hoofdingang." Evidence: "Ook komt er een nieuwe parkeergarage, naast de hoofdingang."
  - A: a plausible assumption, but the old car park at the back closes.
  - B: where bus eight starts.
- **q3** rule-application (3), key **A** "Elk halfuur." Evidence: "’s Avonds gaat er elk halfuur een bus, en op zondag elk uur." Tuesday evening means applying the evening rule.
  - B: daytime.
  - C: Sunday.

### 11 nieuwe-zwemplas
- **q1** time-place (3), key **B** "Op zaterdag en zondag." Evidence: "Op zaterdag en zondag let een badmeester op de zwemmers. Door de week is er geen badmeester."
  - A: the opening hours of the lake.
  - C: the reverse of "door de week". The prompt says "iemand" so the question does not depend on "badmeester".
- **q2** rule-application (3), key **C** "Op het grasveld." Evidence: "Op het grasveld mogen ze wel komen, aan de lijn."
  - A and B: both explicitly not allowed.

### 12 kapsalon-reclame
- **q1** rule-application (3), key **B** "Eerst een afspraak maken." Evidence: "Daarom werken we op zaterdag alleen met een afspraak."
  - A: walking in is for weekdays only.
  - C: late opening on Thursday, but he wants Saturday.
- **q2** quantity (3), key **A** "Twaalf euro." Evidence: "Kinderen tot twaalf jaar betalen twaalf euro." The learner applies the age rule to a son of eight.
  - B: the adult cut.
  - C: wash and cut.

Option-length check: no key is longer than every other option by more than two characters. The closest cases are 7q1 (24 vs 22), 11q2 (16 vs 14) and 7q2 (28 vs 27). No option is a superset of another, and no key repeats a prompt word that the distractors lack.

## 8. Language control

| # | Sentences | Avg words | Longest | Unlisted script words | Compounds (judgement) |
| --- | --- | --- | --- | --- | --- |
| 1 | 25 | 5.2 | 10 | — | — |
| 2 | 28 | 5.6 | 11 | — | keukenbedrijf: transparent, keuken + bedrijf ("de baas van het keukenbedrijf", the firm fitting the kitchen) |
| 3 | 24 | 6.3 | 13 | — | — |
| 4 | 17 | 7.1 | 12 | — | hoofdpijn: transparent, hoofd + pijn, and very common |
| 5 | 14 | 7.1 | 13 | — | lesauto: transparent, les + auto, in a driving-lesson message |
| 6 | 10 | 8.4 | 14 | garderobe (1 allowed) | museumwinkel: transparent, museum + winkel |
| 7 | 13 | 8.1 | 14 | — | busstation: transparent, bus + station |
| 8 | 23 | 7.3 | 13 | — | — |
| 9 | 18 | 8.0 | 17 | knieën (2 allowed) | — |
| 10 | 14 | 8.7 | 13 | — | — |
| 11 | 15 | 8.2 | 16 | — | zwemplas: zwem + plas, transparent with "Zwemmen is gratis" next to it; grasveld: transparent, gras + veld; badmeester: bad + meester is only half transparent, but it is the everyday word from swimming lessons and "let een badmeester op de zwemmers" explains it |
| 12 | 16 | 7.6 | 15 | — | binnenlopen: transparent, binnen + lopen, explained by "zonder afspraak" |

Unlisted words and their context:
- **garderobe** (item 6) is explained by "Hebt u een jas of een tas in de garderobe? … De garderobe is beneden, naast de ingang." q3's prompt and options avoid the word ("De jassen … hangen beneden"), and the answer needs only "jas … Haal die dan nu op".
- **knieën** (item 9) is the plural of the listed word "knie", which the matcher does not inflect (irregular -ën plural). It is explained by "op handen en knieën, zoals een kat". No question depends on it.

All strict fields (titles, situations, prompts, options, explanations and alts) use listed words only (the checker reports no failure). Subordinate clauses are limited to dat ("Dank je wel dat je het komt vertellen") and als, with omdat in explanations. I removed two indirect questions from the drafts ("zeg wie haar komt halen", "kijken we hoe het gaat"). Tenses are present and perfect. Numbers, times and prices are written in words throughout. The scripts contain no fillers; "hoor" in item 2 is a normal particle.

Adjustments to the plan's premises (all small):
- Item 1: Mehmet reports before the move, so the date question has two real dates (key day and moving day). The missing document leads to a new appointment rather than coming back the same day.
- Item 2: the phone number becomes a note with two numbers (the firm by day, Kevin after five), which gives a real choice.
- Item 3: the interview is in the hotel, through the side door near the kitchen, because that is where a kitchen applicant would really go.
- Item 6: the museum shop stays open "tot tien over vijf", which makes "ten more minutes" an explicit time.
- Item 12: "a discount for children" becomes an explicit child price (twelve euro against twenty-four), so the question asks for a number.

## 9. Doubts for the reviewer

1. Item 1 (gemeente). The clerk insists on the rental contract and sends Mehmet to book a new appointment online. This is common but not universal; some gemeenten accept an upload or a declaration. The script states only what this clerk asks and makes no general rule. Please judge whether that is generally true enough.
2. Item 1 q1 option C ("Mehmet heeft de sleutel nog niet gekregen.") is a true statement that is not the reason. I kept it because the clerk names the reason explicitly. Replace it with another wrong reason if it reads as a trick.
3. Item 6 is the shortest fragment (84 words, about 35 seconds) and has three questions; the information density is high but each fact is said once. q1 option D ("Tot kwart over vijf.") rests on the misheard "over een kwartier", not on a stated time.
4. Item 9: "op handen en knieën" uses the unlisted plural "knieën". "Op handen en voeten" would pass the gate but is less natural for the cat exercise.
5. Item 11: "badmeester" is in the script twice and in the q1 evidence, but not in any prompt or option. "Zwemplas" is the plan's own topic word.
6. Item 3: "Hotel De Groene Kade" is unused but close to the real "Boutique Hotel De Grote Kade" in Goes. Rename it if that is too close.
7. Item 10 packs several numbers into a short news item (2.50, 1, 8; every ten minutes, half hour, hour). Only three are tested and each is said once.
8. Item 7 uses a real line (Deventer–Apeldoorn) for a fictional disruption, as batch 023 did with Leiden and Den Haag.

## 10. Requested words

None is needed for the batch to work. For the coordinator's decision:
- **garderobe**: an everyday word in museums, theatres and schools; used here once under the allowance.
- **knieën**: the plural of the listed "knie". This looks like a gap in the matcher's handling of the -ën plural rather than a new word.
- **grond**: "onder de grond" is the natural way to describe underground containers. I avoided it with "Het grootste deel zit onder de straat."

## 11. Checker output

`npx tsx scripts/batch-check.ts content/batches/090-original.json` (5 November 2026, final file):

```
Checked 12 items, 28 questions. Keys: {"D":3,"B":8,"A":8,"C":9}. Options: {"3":22,"4":6}.
  warn  A2:listening:batch090-buren-keuken:1: compounds of listed words (reviewer: transparent at A2?): keukenbedrijf
  warn  A2:listening:batch090-school-ziek-kind:1: compounds of listed words (reviewer: transparent at A2?): hoofdpijn
  warn  A2:listening:batch090-rijles-verzet:1: compounds of listed words (reviewer: transparent at A2?): lesauto
  warn  A2:listening:batch090-museum-sluit:1: unlisted words in the script (allowed 1; the context must explain them and no question may depend on them): garderobe
  warn  A2:listening:batch090-museum-sluit:1: compounds of listed words (reviewer: transparent at A2?): museumwinkel
  warn  A2:listening:batch090-bus-voor-trein:1: compounds of listed words (reviewer: transparent at A2?): busstation
  warn  A2:listening:batch090-fysio-oefeningen:1: unlisted words in the script (allowed 2; the context must explain them and no question may depend on them): knieën
  warn  A2:listening:batch090-nieuwe-zwemplas:1: compounds of listed words (reviewer: transparent at A2?): badmeester, grasveld, zwemplas
  warn  A2:listening:batch090-kapsalon-reclame:1: compounds of listed words (reviewer: transparent at A2?): binnenlopen
9 warning(s), no failures.
```

Every warning is handled in section 8: the compounds are judged there and the two unlisted words are explained there.
