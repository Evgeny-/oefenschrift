# A2 expansion plan, 5 November 2026

Evgeny asked for many more A2 exercises across every A2 task type in reading, listening, writing and speaking. They must follow `content/blueprint.md`, be interesting and realistic (never silly or absurd) and keep the vocabulary at A2: some current A2 items use words that are far too hard. KNM, A1 and B1 are out of scope for this round.

Authors follow `docs/briefs/author.md`, `content/blueprint.md` (§1, §3, the §4.x section of the part, §5–§10) and this plan. Reviewers follow `docs/briefs/review.md` and the reviewer section at the end of this plan. One author and one independent reviewer per batch.

## Counts before and after

| Part | Task type | Before | New | After |
| --- | --- | --- | --- | --- |
| Reading | bericht / email / brief / advertentie / regels / folder / rooster / krant | 9 / 8 / 7 / 5 / 5 / 4 / 3 / 2 | 1 / 2 / 2 / 3 / 4 / 4 / 4 / 4 | 10 / 10 / 9 / 8 / 9 / 8 / 7 / 6 |
| Listening | gesprek / voicemail / omroep / uitleg / nieuws / reclame | 12 / 8 / 7 / 4 / 3 / 3 | 6 / 4 / 4 / 4 / 3 / 3 | 18 / 12 / 11 / 8 / 6 / 6 |
| Writing | email / form / wijkkrant / picture-note | 17 / 5 / 3 / 2 | 6 / 4 / 3 / 3 | 23 / 9 / 6 / 5 |
| Speaking | video-answer / picture-describe / picture-choose / picture-sequence | 15 / 15 / 14 / 15 | 6 / 6 / 6 / 6 | 21 / 21 / 20 / 21 |

Batches: 087 and 088 reading (12 each), 089 and 090 listening (12 each), 091 and 092 writing (8 each), 093, 094 and 095 speaking (8 each, two of every type).

## Rules every batch shares

- **Words.** New A2 batches pass the A2 word gate (`config/a2-vocabulary.json` on top of `config/a1-vocabulary.json`, checked by `scripts/a2-vocabulary.ts` inside `npm run batch:check`). Titles, situations, prompts, questions, options, explanations, criteria, scaffolds, form labels, models, alts and starters use listed words only. A reading text or listening script may hold one unlisted word per 50 words, when the context explains it and no question depends on it. Compounds of two listed words pass but are reported; use them only when an A2 learner can see the meaning from the parts. Authors never edit the list. Prefer the plain phrase: "de huur gaat omhoog" rather than "huurverhoging", "de verhuurder" rather than "woningcorporatie", "uw paspoort of id-kaart" rather than "identiteitsbewijs", "uiterlijk vrijdag" becomes "vóór vrijdag" or "tot en met vrijdag". If a scene cannot work without a missing everyday word, write it under "Requested words" in the notes; the coordinator decides.
- **Sentences.** §10: average under 12 words, none over 18; subordinate clauses only with omdat, als, dat, wanneer, toen; present, perfect and simple future. Difficulty comes from finding and combining two details, never from vocabulary.
- **Realistic and interesting.** Every text, call or task is something a real organisation or person would send or say, with a concrete practical purpose and believable details (prices, times, dates in 2026–2027). No absurd premises, no classroom role-plays, no messages to someone who stands beside the writer, no "imagine you are…" set-ups. A little warmth or a mild surprise is welcome (a lost cuddly toy at the swimming pool, a colleague's 50th birthday); about one item in eight may be lightly humorous, never silly.
- **Address.** Instructions, situations and questions address the learner with **u**. People inside a text use **je** or **u** as their relationship requires.
- **People.** Use the batch's name pool below plus unnamed roles ("de verhuurder", "de assistente"). A name appears in at most two items of a batch. Do not use the voice names (Roos, Lieke, Ruben, Daan, Ruth, Jerry, Robert, Arjen, Hanneke, Peter, Serge) or the older recurring cast (Sem, Karim, Fatima, meneer De Vries, mevrouw Bakker, Julio, Amina, Modibo, Sabrina, Hasan) as characters. A named person drawn in more than one picture keeps the same three visual traits, copied verbatim in every brief and listed in the notes.
- **Organisations.** Invented, plausible and checked on the web (blueprint §13). Real public bodies (gemeente, huisartsenpost, NS, DUO, UWV, politie) only when the item is about them. No brand names. Web addresses end in `.nl` and are invented.
- **Topics.** Use the topic and slug assigned below. The slugs are new in their part; keep them. You may adjust details of a premise to make it more natural, and record why in the notes. Avoid the blueprint §9 avoid list (politics, religion beyond facts, graphic illness, crime, asylum, debt collection, brand names).
- **Pictures** (listening stills, speaking and picture-note images). One plain scene per picture in the house style. Write the brief as plain English: the people (age, hair, one clothing colour), what they do, where, and the two or three objects that matter. Keep it short (at most about 60 words) and positive: describe what is there; do not list things to leave out apart from the closing "No text." The generator adds the style. Never ask for readable text, numbers, clocks, signs, screens with content or logos; a screen, card or paper is "blank". Closed-task stills show the setting and never a tested fact (no time, price, colour, object or person that a question asks about). Open-task pictures show exactly the facts the criteria need. Write a Dutch `alt` that describes the picture; for closed tasks it must not reveal a key.
- **Audio.** Listening scripts and speaking cues name roles from `config/voices.json`; two different roles per conversation; never pair `m-adult` (Robert) with `f-adult` (Lieke); `narrator` reads announcements in stations and shops, `presenter` may read a news item or an advertisement. Numbers, times and prices in words in scripts ("om half negen", "vijf euro vijftig"). No fillers ("eh", "nou ja").
- **Status.** `status: "draft"`, `targetLevelValidated: false`, no media or derived fields.
- **Check.** `npx tsx scripts/batch-check.ts content/batches/<NNN>-original.json` must end without failures. Read every warning: unlisted words in a text need a reason in the notes; reported compounds need a judgement ("transparent: zwem + tas").

## Batches

### 087 — reading, 12 new

Names: Aziz, Marloes, Dirk, Yasmin, Tomasz, Grace, Wout, Shirin.

1. `gezondheidscentrum`, krant, gezondheid: a neighbourhood paper reports that a new health centre opens on a date: two GPs, a physiotherapist and a pharmacy in one building; patients of the old practice move automatically; new patients register online or at the desk; parking behind the building.
2. `schoolstraat`, krant, opleiding: the street in front of a primary school closes to cars at the start and end of school (times given); parents can park at a nearby car park; a trial for three months; a meeting for parents on a date.
3. `vakantiesport`, rooster, vrije-tijd-familie: an autumn-holiday sports programme for children: a table of activity, age, day, time and price; register before a date; bring sports shoes and a drink.
4. `stagedagen`, rooster, opleiding: an MBO class gets its internship schedule: a table of weeks with school days and internship days, plus one return day; what to do when ill on an internship day.
5. `fietsles`, folder, vervoer: a folder for cycling lessons for adult women and men: groups in a table (beginners, a bit of experience), days, location, price, a bike is provided; register by phone.
6. `consultatiebureau`, folder, gezondheid: the child health clinic explains when parents come with their baby or toddler (a short table of ages and what happens: weighing, measuring, a talk), that it is free, and how to move an appointment.
7. `werkplaatsregels`, regels, werk: rules in the workshop of a furniture maker for new staff: safety shoes, gloves for the saw, no phones in the workshop, breaks in the canteen, report every small accident to the team leader.
8. `ziekmelden`, regels, werk: a company's rules for calling in sick: phone the team leader before eight (no app or e-mail), say how long you expect to be away, stay reachable, call again when you are better; a doctor's note only after a week.
9. `kamer-te-huur`, advertentie, wonen-buurt: a room for rent in a family home: size, price including energy, from a date, shared kitchen and bathroom, no pets, suitable for a student or someone who works; how to react.
10. `huur-omhoog`, brief, wonen-buurt: a letter from the landlord: the rent goes up on 1 July by a stated amount; old and new rent; what tenants can do if they cannot pay (rent benefit, a talk); questions by phone on weekday mornings.
11. `stagegesprek`, email, opleiding: an e-mail from the school mentor to a student about an internship interview at a care home: date, time, address, what to bring, how to dress, and to send a message afterwards.
12. `retour-ontvangen`, bericht, winkels-diensten (light humour allowed): a webshop confirms it received a returned item (a jumper that was far too big) and refunds the money within five working days; the shipping cost is not refunded; a discount code for a next order.

Spread: at least four persona questions over the batch (one per text is the target), a `purpose` question in four or five texts, about 60% three-option and 40% four-option questions, keys balanced.

### 088 — reading, 12 new

Names: Hamid, Tessa, Koen, Elif, Patrick, Malika, Jesse, Olga.

1. `hardloopwedstrijd`, krant, vervoer: a city run on a Sunday; streets closed between stated times; buses 4 and 7 take another route; the stop at the market is closed; residents can drive out until nine.
2. `school-verbouwing`, krant, opleiding: a primary school gets a new building; for one school year the children have lessons in a temporary building in another street; the school bus; a meeting for parents.
3. `feestdagen-huisarts`, rooster, gezondheid: GP practice opening hours around Christmas and New Year in a table; when the practice is closed, call the huisartsenpost (number written as the exam does); repeat medicines must be ordered before a date.
4. `oudergesprekken`, rooster, opleiding: a table of ten-minute parent–teacher talks per group and evening; parents choose a time on the school website before a date; an interpreter can be arranged.
5. `wijkagent`, folder, instanties: a folder from the police about the neighbourhood officer: who it is, when there is a walk-in hour (table of place, day and time), what you can ask, and that for an emergency you call 112.
6. `kinderboerderij`, folder, vrije-tijd-familie: a city farm: free entrance, opening hours in a table (summer and winter), feeding the goats only with food from the farm shop, dogs not allowed, birthday parties for children with a price.
7. `camping-regels`, regels, vrije-tijd-familie: rules of a small campsite: quiet between eleven at night and eight in the morning, cars on the car park, dogs on a lead, rubbish in the containers at the entrance, departure before twelve.
8. `taaltoets-dag`, regels, opleiding: a language school's rules for test day (not an official exam): arrive fifteen minutes early, bring your ID card, phones in the bag at the front, a dictionary is not allowed, results by e-mail within two weeks.
9. `oppas-gezocht`, advertentie, vrije-tijd-familie: a family looks for a babysitter for two children on two fixed evenings a week; age and experience; pay per hour; tasks; how to react.
10. `chauffeur-gezocht`, advertentie, werk: a flower wholesaler looks for a delivery driver: driving licence B, early start, four days a week, a van; pay; a day to try the work; send a short e-mail with your CV.
11. `water-onderbreking`, brief, wonen-buurt: the water company writes that the water is off on a date between stated times because of work on the pipes; fill a few bottles in advance; do not use the washing machine; afterwards the water can be brown for a short time.
12. `cadeau-collega`, email, werk (light humour allowed): a colleague organises a gift for a colleague who turns fifty: give money in an envelope at reception before a date, a card to sign, cake in the canteen on the day; keep it a surprise.

Spread as in 087.

### 089 — listening, 12 new

Names: Rachid, Ingrid, Bayu, Merel, Stefan, Naima, Johan, Agnieszka.

1. `vakantie-aanvragen`, gesprek, werk: an employee asks the manager for holiday days in July; the manager agrees to one week but not the other, because two colleagues are already away; they settle on dates.
2. `huiswerk-juf`, gesprek, opleiding: a parent talks to the teacher after school about a child who finds reading hard; the teacher suggests reading together every day and the library's reading hour on Wednesday.
3. `woning-bekijken`, gesprek, wonen-buurt: a phone call with a landlord about viewing a flat: a day and time, the floor and the lift, what to bring (payslip), and the rent.
4. `fysio-verzet`, voicemail, gezondheid: the physiotherapy practice moves an appointment to another day and time and asks the patient to bring a towel and comfortable clothes; call back if it does not suit.
5. `boek-gereserveerd`, voicemail, winkels-diensten: the library calls that a reserved book is ready; it stays at the desk for seven days; you can also borrow it at the other branch; opening hours.
6. `tram-omleiding`, omroep, vervoer: an announcement in a tram: because of work on the track the tram does not go to the station today; get off at a stated stop and take bus twelve; it takes about ten minutes longer.
7. `toernooi-sporthal`, omroep, vrije-tijd-familie: an announcement during a youth tournament in a sports hall: a parent must move a car that blocks the entrance; lunch in the canteen from twelve; prizes at four.
8. `printer-uitleg`, uitleg, werk: a colleague explains the office printer: hold your staff pass at the printer, choose your document on the screen, colour only with permission, paper in the cupboard next to it.
9. `intake-taalschool`, uitleg, opleiding: an employee of a language school explains the intake: first a short test on the computer, then a talk; lessons on two mornings or two evenings; the price and who can pay it.
10. `bibliotheek-verhuist`, nieuws, vrije-tijd-familie: local news: the library moves to the new building next to the station; closed for two weeks; books borrowed now can be returned later without a fine; a party on the opening day.
11. `fietsenwinkel-reclame`, reclame, winkels-diensten: a bicycle shop advertises a spring check for a fixed price, a free coffee while you wait, and repairs within one day.
12. `rijschool-reclame`, reclame, vervoer (light humour allowed): a driving school advertises lessons for adults, a cheaper first lesson, lessons in the evening and on Saturday, and patient instructors who also teach nervous drivers.

### 090 — listening, 12 new

Names: Mehmet, Joyce, Kevin, Ilham, Bart, Danielle, Youssef, Fenna.

1. `adres-wijzigen`, gesprek, instanties: at the gemeente counter someone registers a new address after moving; the employee asks for ID and the rental contract; a missing document means coming back; the change takes effect on a date.
2. `buren-keuken`, gesprek, wonen-buurt: a neighbour comes to say that the kitchen will be renovated next week; noise on stated days and times; the skip in the street; a phone number for problems.
3. `uitnodiging-gesprek`, gesprek, werk: a company calls a job applicant to invite them for an interview: day and time, the address, whom to ask for, bring ID and diplomas.
4. `school-ziek-kind`, voicemail, opleiding: the school calls a parent: the child has a headache and wants to go home; can the parent pick her up, or call back to say who comes.
5. `rijles-verzet`, voicemail, vervoer: the driving instructor moves Thursday's lesson because the car goes to the garage; offers two other times; the meeting point stays the same.
6. `museum-sluit`, omroep, vrije-tijd-familie: an announcement in a museum: closing in fifteen minutes; the café is already closed; collect coats and bags at the cloakroom; the shop stays open ten more minutes.
7. `bus-voor-trein`, omroep, vervoer: an announcement on a station: no trains between two stated towns this weekend; buses leave from the bus station on the other side; travel about thirty minutes longer; tickets are valid on the bus.
8. `afvalpas-uitleg`, uitleg, wonen-buurt: a gemeente employee explains the new underground containers: open them with the pass, which bag goes where, the pass is free, a new pass costs money when you lose it.
9. `fysio-oefeningen`, uitleg, gezondheid: a physiotherapist explains three home exercises for a sore back: how often a day, how many times, when to stop, and to come back in two weeks.
10. `ziekenhuis-parkeren`, nieuws, gezondheid: local news: parking at the hospital becomes cheaper for patients and visitors from a date; a new car park with more spaces; the bus from the station every ten minutes.
11. `nieuwe-zwemplas`, nieuws, vrije-tijd-familie: local news: a new swimming lake opens on a date; free; a lifeguard at weekends; no dogs on the beach; a bike path from the city.
12. `kapsalon-reclame`, reclame, winkels-diensten: a new hairdresser in the shopping street: walk in without an appointment on weekdays, a discount for children, open late on Thursday.

### 091 — writing, 8 new

Names: Leila, Pieter, Zeynep, Wesley, Esther, Abdel.

1. `vakantiedagen`, email, werk, formal: write to your manager to ask for three days off; say which days, why (think of a reason yourself), and who can do your work.
2. `ouderavond-afmelden`, email, opleiding, formal: write to the teacher that you cannot come to the parents' evening; why; ask for another moment; ask one question about your child.
3. `verhuizen-helpen`, email, vrije-tijd-familie, informal: ask a friend to help you move house: the day and time, what she can bring, what you do for her in return.
4. `zwemles-inschrijven`, form, vrije-tijd-familie: register your child for swimming lessons at a pool: personal fields plus open fields (which days suit you, can your child already swim a little, anything the teacher must know).
5. `bedrijfsuitje`, form, werk: register for the staff outing: personal fields plus a choice of activity and open fields (food wishes, do you need a lift, one idea for the next outing).
6. `mijn-werk`, wijkkrant, werk: write in the neighbourhood paper about your work or the work you would like (what, where, what you like about it).
7. `oppas-briefje`, picture-note, vrije-tijd-familie: three pictures show what the babysitter must do this evening (give the child pasta for dinner, read a book together, brush the child's teeth before bed). Write a note.
8. `collega-kantoor`, picture-note, werk: three pictures show what a colleague must do tomorrow while you are away (water the plants, empty the dishwasher, take the post to reception). Write a note.

### 092 — writing, 8 new

Names: Kerem, Annelies, Marco, Hatice, Jeroen, Tamara.

1. `pakket-niet-ontvangen`, email, winkels-diensten, formal: write to a webshop: the parcel did not arrive; when you ordered and what; what you want now.
2. `raam-kapot`, email, wonen-buurt, formal: write to the landlord that a window in the bedroom does not close; since when; what the problem is for you; when the repairman can come.
3. `buurman-feest`, email, wonen-buurt, informal: tell the neighbours that you have a birthday party on Saturday evening; till what time; invite them to come for a drink.
4. `woning-zoeken`, form, wonen-buurt: register as a house seeker with a housing organisation: personal fields plus open fields (with how many people you will live, why you want to move, in which part of the town you want to live).
5. `klacht-winkel`, form, winkels-diensten: a complaint form of an electronics shop: personal fields plus open fields (what you bought and when, what is wrong, what you want the shop to do).
6. `weekend`, wijkkrant, vrije-tijd-familie: write about your weekend (what you usually do, with whom, what you like best).
7. `nederlands-leren`, wijkkrant, opleiding: write about learning Dutch (where and how you learn, what is hard, a tip for other people).
8. `buurman-vakantie`, picture-note, wonen-buurt: three pictures show what the neighbour must do while you are on holiday (feed the cat, take the post from the mat, water the tomato plants on the balcony). Write a note.

### 093, 094, 095 — speaking, 8 new each

Two of each type per batch. Video-answer: the situation names who asks first, the cue asks one question with two parts, the prompt tells the learner to answer and asks for one more detail (blueprint §4.3). One still of the speaker. Picture-describe: "Vertel wat u ziet. Noem twee dingen die … Vertel ook wat u van … vindt." Picture-choose: two pictures that differ only in the choice, "Kies een van de plaatjes. Vertel ook waarom. Zeg ook iets over het andere plaatje." Picture-sequence: three pictures of one person in one setting, "Vertel iets over alle plaatjes."

093 — names: Ayoub, Mirjam, Henk, Gülsen, Sander, Inge.
1. `buurman-hond`, video-answer, wonen-buurt: the neighbour asks whether you can walk his dog on Saturday and at what time.
2. `collega-weekend`, video-answer, werk: a colleague asks on Monday what you did at the weekend and whether you liked it.
3. `bouwmarkt`, picture-describe, winkels-diensten: a man in a DIY store with paint pots and a brush in his trolley; name two things he buys; what do you think of doing jobs in the house yourself.
4. `vergadering`, picture-describe, werk: a team meeting with coffee and a laptop; name two things on the table; what do you think of meetings at work.
5. `cadeau-kiezen`, picture-choose, vrije-tijd-familie: a gift for a colleague: flowers or a box of chocolates.
6. `kantoor-thuiswerken`, picture-choose, werk: work at the office or at home.
7. `fiets-lek`, picture-sequence, vervoer: a woman finds a flat tyre in the morning, walks her bike to the bicycle shop, rides away with the repaired bike.
8. `boodschappen-online`, picture-sequence, winkels-diensten: a man orders groceries on a laptop, a delivery person brings the crates, he puts the food in the fridge.

094 — names: Faisal, Laura, Gerrit, Saida, Dennis, Eline.
1. `fietsenmaker-vraag`, video-answer, winkels-diensten: the bicycle repairer asks what is wrong with your bike and when you need it again.
2. `docent-vakantie`, video-answer, opleiding: the teacher asks where you are going in the holidays and what you will do there.
3. `fysiotherapie`, picture-describe, gezondheid: a woman does an exercise with a physiotherapist; name two things you see; what do you think of exercising every day.
4. `fietsenstalling`, picture-describe, vervoer: a full bicycle parking at a station with a man looking for a place; name two things; what do you think of cycling to the station.
5. `vakantie-strand-stad`, picture-choose, vrije-tijd-familie: a holiday at the beach or in a city.
6. `koken-afhalen`, picture-choose, winkels-diensten: cook dinner yourself or pick up food from a restaurant.
7. `eerste-werkdag`, picture-sequence, werk: a man arrives at reception, gets a staff pass, meets his new colleagues at a desk.
8. `wasmachine-kapot`, picture-sequence, wonen-buurt: water on the floor near the washing machine, a phone call, a repairman fixes it.

095 — names: Mustafa, Sophie, Roel, Chantal, Vincent, Maaike.
1. `reiziger-weg`, video-answer, vervoer: a traveller at the station asks how to walk to the town hall and how long it takes.
2. `baliemedewerker`, video-answer, instanties: an employee at the gemeente desk asks what you come for and whether you have an appointment.
3. `ouderavond`, picture-describe, opleiding: a mother and a teacher at a small table look at a child's drawings; name two things on the table; what do you think of parents' evenings.
4. `strand-familie`, picture-describe, vrije-tijd-familie: a family on the beach; name two things the family does; what do you think of a day at the beach.
5. `afspraak-bellen-online`, picture-choose, gezondheid: make an appointment with the doctor by phone or online.
6. `tweedehands-nieuw`, picture-choose, winkels-diensten: buy a second-hand or a new bicycle.
7. `verjaardag-voorbereiden`, picture-sequence, vrije-tijd-familie: a woman buys a cake at the bakery, hangs balloons at home, opens the door for guests.
8. `bibliotheek-lid`, picture-sequence, opleiding: a father registers at the library desk with his son, they choose books, they read together on the sofa at home.

Each speaking batch may have one lightly humorous item at most (for example the dog in `buurman-hond`); the rest is ordinary.

## Reviewer contract for this round

Use `docs/briefs/review.md` in full: the blind packet first (`npm run batch:review-source -- content/batches/<NNN>-original.json`), persisted meaning findings, then the full item pass, a proposed file with repairs, the review JSON and Markdown. `content/reviews/085-review.json` shows the current JSON shape (contract version 2, `meaning_first`, `tone_balance`, per-item `meaning`); `scripts/meaning-review.ts` is the gate. In addition to the rubric:

- **A2 words.** Run the batch check and read every vocabulary warning. Judge reported compounds and the allowed unlisted text words: replace any that an A2 learner would not understand from the parts or the context, or that a question depends on. Flag single words that pass the list but are still too hard in context.
- **Realism.** Would this organisation or person really send or say this, with these details? Is the purpose concrete? Reject an item whose premise needs inventing, rather than rewriting it.
- **Exam shape.** Lengths, question counts, option counts, persona and purpose questions (reading), turn counts and spoken numbers (listening), the hidden-criteria prompt rules and the 25–45-word models (speaking), and the writing model targets of §10.
- **Pictures.** Briefs follow this plan's picture rule; closed-task alts and stills do not reveal a key; open-task pictures show what the criteria need.
- **Bounded effort.** One careful pass plus a re-check of what you changed. Do not spawn other agents. Keep the review JSON concise but item-specific.

Write the files named in `docs/briefs/review.md`, with `review_contract_version: 2`, `reviewed_at` set to the current UTC time and `limitations` including "AI editorial review does not validate CEFR difficulty or official exam equivalence."

## After review

The coordinator adopts each passing proposal (`npm run batch:adopt <NNN>`), integrates (`npm run content:integrate`), adds practice sets, generates audio with `--keys` for exactly the new clips, and generates pictures with the local Z-Image Turbo model (see `docs/research/local-image-model-2026-11-05.md`), reviewing every picture on a contact sheet before `reviewed: true`.
