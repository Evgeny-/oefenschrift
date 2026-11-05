# Batch 091 author notes (A2 Schrijven, eight tasks)

Written on 5 November 2026 for the A2 expansion round (`docs/briefs/a2-expansion-2026-11-05.md`, section "091"). Author: Claude Opus 5.5, in a context separate from the reviewer. Eight new A2 writing tasks: three e-mails, two forms, one wijkkrant piece and two picture notes. Every situation, criterion, sample, quote, model, brief and alt was written for this project. Official material was used for structure only: the e-mail header, the "Bedenk zelf …" bullets, "Sommige gegevens moet u zelf bedenken", "Schrijf minimaal drie zinnen op" and the three-picture note to a colleague.

- `status: "draft"`, `targetLevelValidated: false`, no `revision`, no `images[].file`, no `promptAudio`.
- Record shape copied from the current catalogue records `A2:writing:batch008-oppassen:1` (email), `-nieuwe-patient:1` (form), `-boodschappen:1` (wijkkrant) and `-supermarkt:1` (picture-note). Their vocabulary was not reused.
- This is editorial work. It does not validate CEFR difficulty or establish exam equivalence.

Read before writing: `AGENTS.md`; `docs/briefs/author.md`; `docs/briefs/a2-expansion-2026-11-05.md`; `content/blueprint.md` §1, §3, §4.4, §7, §8, §9, §10, §13 (including the 5 November additions on the A2 word gate and the local image model); `content/reviews/rubric.md`; `docs/research/prompt-audit-2026-10-19.md`; the A2 Schrijven paragraph of `docs/research/exam-blueprints-2026-09-10.md`; `content/batches/008-notes.md` and `008-starters.json`; `config/a2-vocabulary.json`; `scripts/a2-vocabulary.ts`; `scripts/batch-validation.ts`; `app/components/OpenExercise.tsx` around line 300.

What the learner sees while writing (from `OpenExercise.tsx`): for e-mails, forms and the wijkkrant the criteria are visible and the starters open on request, so both were checked for giveaways. For picture notes the criteria and the starters stay hidden until review, so each picture-note prompt names everything the criteria check ("Vertel wat hij … moet doen. Schrijf drie dingen op.") and no title, prompt or alt replaces the learner's verb phrase.

## 1. Batch matrix

| # | id | taskType | Domain | Register | Recipient | Task | Tone |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `A2:writing:batch091-vakantiedagen:1` | email | werk | formal (u, "Beste meneer De Groot", "Met vriendelijke groet") | chef Pieter de Groot, hotel kitchen | ask for three days off in December: which days, why (own reason), who covers | ordinary |
| 2 | `A2:writing:batch091-ouderavond-afmelden:1` | email | opleiding | formal (u, "Beste juf Esther", "Met vriendelijke groet") | juf Esther, groep 6 | cannot come to the parents' evening of Thursday 26 November: reason, another moment, one question about Leila | ordinary |
| 3 | `A2:writing:batch091-verhuizen-helpen:1` | email | vrije-tijd-familie | informal (je, "Hoi Zeynep", "Groetjes") | friend Zeynep | ask for help with a move: request, day and time, something to bring, something in return | ordinary, warm |
| 4 | `A2:writing:batch091-zwemles-inschrijven:1` | form | vrije-tijd-familie | formal form | the neighbourhood pool (unnamed) | register son Abdel (6) for swimming lessons: days and times, can he swim a little, one thing the teacher must know | ordinary |
| 5 | `A2:writing:batch091-bedrijfsuitje:1` | form | werk | formal form | the employer | register for the staff outing of Friday 11 June 2027: activity choice, food wishes, lift, idea for next time | ordinary |
| 6 | `A2:writing:batch091-mijn-werk:1` | wijkkrant | werk | personal | wijkkrant readers | your work or the work you would like: what, where, what you like | ordinary |
| 7 | `A2:writing:batch091-oppas-briefje:1` | picture-note | vrije-tijd-familie | informal (je) | babysitter Wesley | pasta for Leila, read a book together, brush teeth | ordinary, warm |
| 8 | `A2:writing:batch091-collega-kantoor:1` | picture-note | werk | informal (je) | colleague Abdel | water the plants, empty the dishwasher, take the post to reception | lightly humorous (one very large plant; the model says "De grote plant heeft altijd dorst!") |

Register count: four formal tasks (two e-mails, two forms), four informal or personal (one e-mail, two notes, the wijkkrant). The plan fixed the registers of the three e-mails; the notes are informal by nature. Domains: werk 4, vrije-tijd-familie 3, opleiding 1, as assigned. Tone: seven ordinary (two with a little warmth), one lightly humorous, which matches "about one item in eight".

Slugs are the plan's. The checker reports no slug collision with the catalogue.

### Premises (why this person writes to this recipient)

1. **vakantiedagen.** The prompt says that at this workplace days off are always requested by e-mail. That is a common rule and the reason for an e-mail rather than a word at the counter. The learner chooses the days within December; the reason and the colleague are invented ("Bedenk zelf …").
2. **ouderavond-afmelden.** Every parent has a ten-minute talk with the teacher that evening (stated in the prompt), so missing it creates a real need for another moment. The child's question gives the e-mail a second purpose, as the plan asks.
3. **verhuizen-helpen.** The learner moves within the town and does it without a moving firm, "met hulp van vrienden". Asking a friend in writing for a fixed day is normal. The prompt does not mention a car or boxes, so criterion 3 stays the learner's own idea.
4. **zwemles-inschrijven.** Abdel (6) still has to get his swimming diploma, a very common Dutch situation for newcomer families. The prompt does not say whether he can swim, so criterion 2 is open. The pool is not named, so no organisation name is needed.
5. **bedrijfsuitje.** A staff outing with an activity followed by a meal explains both the activity choice and the food field; the lift field is a normal question on such forms.
6. **mijn-werk.** The wijkkrant has a theme issue about work; "or the work you would like" keeps the task open to learners without a job (the model takes that route, the sample the other).
7. **oppas-briefje.** The babysitter collects Leila from school at three and has a key; the parent works until ten in the evening and leaves a note on the kitchen table. Writer and reader are never in the same place, which meets the "no message to someone beside the writer" rule.
8. **collega-kantoor.** The learner spends tomorrow at a training; Abdel takes over a few tasks but is off today, so the note goes on his desk.

## 2. Per task: criteria, sample, model

Every sample misses exactly one criterion (one `null` quote); the other quotes are verbatim substrings of the sample. No prompt sentence is copied into a sample or model (checked with a script: no prompt sentence occurs in either). Dates were checked with the system calendar: Wednesday 9, Thursday 10 and Friday 11 December 2026; Saturday 12 December 2026; Thursday 26 November 2026; Friday 11 June 2027.

### 1 vakantiedagen (e-mail, 3 criteria)

- Criteria: which three days (own choice); why (own reason); who can do the work (own colleague).
- Sample omits criterion 3 (no colleague). Error: "omdat mijn ouders komen uit Marokko" (verb not at the end of the omdat-clause).
- Model: "van woensdag 9 december tot en met vrijdag 11 december" (1); parents visiting from Morocco, collected from the airport, in the Netherlands for only one week (2); "Mijn collega Wesley kan op die dagen mijn werk doen. Hij vindt dat goed." (3); closing request "Kunt u mij laten weten of het kan?". 60 words, 7 sentences, longest 14 words.
- Three bullets, as in the plan; 008 kast also has three. A fourth bullet ("Vraag wanneer u antwoord krijgt") was considered and left out because the plan names three points.

### 2 ouderavond-afmelden (e-mail, 4 criteria)

- Criteria: that you cannot come; why (own reason); ask for another moment and say when you can; one question about Leila (own question).
- Sample omits criterion 3 (no request for another moment). Errors: "Op donderdagavond ik heb" (no inversion after a fronted time), "Leila vind" (vindt).
- Model: "Ik kan op donderdag 26 november helaas niet naar de ouderavond komen." (1); "Op donderdagavond heb ik les op de taalschool." (2); "Kunnen we op een andere dag een gesprek hebben? Ik kan op maandag en woensdag na drie uur." (3); "Ze vindt rekenen moeilijk. Hoe kan ik haar thuis helpen?" (4). 55 words, 7 sentences, longest 12.
- Criterion 1 transfers a fact from the prompt, as the official e-mails do ("passing on a fact the recipient needs"). The reason, the moment and the question are the learner's own.

### 3 verhuizen-helpen (e-mail, 4 criteria)

- Criteria: ask whether Zeynep will help; day and time (own choice); ask her to bring something (own idea); what you do in return (own idea).
- Sample omits criterion 3 (nothing to bring). Error: "Ik verhuist" (-t after ik). "dat je kan komen" is accepted colloquial Dutch and is not counted as an error.
- Model: "Wil jij mij die dag helpen?" (1); "Ik verhuis op zaterdag 12 december. … om negen uur 's ochtends" (2); "Kun jij je auto meenemen? Dan kunnen we de dozen wegbrengen." (3); "Als dank kook ik 's avonds voor jou. Jij mag kiezen wat we eten!" (4). 54 words, 8 sentences, longest 11.

### 4 zwemles-inschrijven (form, 3 open fields)

- Personal fields: child's name, child's date of birth, parent's name, address, postcode and town, phone, e-mail (text, invented by the learner, not criteria).
- Criteria: days and times (own choice); can the child swim a little (own choice); something the swimming teacher must know (own idea).
- Sample omits criterion 2. Errors: "woensdag middag" (compound written as two words), "Hij spreek" (spreekt).
- Model (open fields only, one sentence each): "Abdel kan op woensdagmiddag na twee uur en op zaterdagochtend komen." / "Hij kan nog niet zwemmen, maar hij is niet bang voor water." / "Hij spreekt nog niet zo goed Nederlands, maar hij begrijpt veel." 34 words, 3 sentences, longest 12. The third answer is a realistic, useful fact for a swimming teacher and avoids a medical detail.

### 5 bedrijfsuitje (form, one choice and 3 open fields)

- Personal fields: first name, surname, department, phone, e-mail.
- Choice: een fietstocht / een workshop koken / een wandeling in het bos.
- Criteria: choose an activity; food wishes; lift (and if yes, where to be picked up); an idea for the next outing.
- Sample omits criterion 4 (no idea). Error: "bij de station" (het station; the official scale tolerates gender errors, but this is the deliberate error and a typical one).
- Model: "Ik kies de fietstocht." (1); "Ik eet geen vlees en geen vis." (2); "Ja, ik wil graag meerijden, want ik heb geen auto. Een collega kan mij om half negen ophalen bij het station." (3); "Volgend jaar kunnen we samen naar de dierentuin gaan." (4). 41 words, 5 sentences, longest 11. The lift answer takes two sentences because its criterion has two parts.
- No company name is used. The prompt's "Eerst is er een activiteit. Daarna eet u samen met uw collega's." gives the food field a reason.

### 6 mijn-werk (wijkkrant, 3 guiding questions)

- Opening "Dit is mijn tekst over werk:", `minSentences: 3`.
- Criteria: what work (or the wished work); where; what you like about it.
- Sample omits criterion 2 (no place). Error: "mijn collega's is" (zijn).
- Model (the "work I would like" route): nurse in training at the mbo, later in the town hospital, likes helping people, not afraid of busy days. 41 words, 5 sentences, longest 10. The sample takes the other route (a cleaner who starts at six), so both routes of the open question are shown.
- Learners are not assigned a gender in the model; "verpleegkundige" is used as a job any learner may want.

### 7 oppas-briefje (picture note, 3 pictures)

- Prompt: Wesley collects Leila at three, has a key, the parent works until ten; "Vertel wat hij vanavond met Leila moet doen. Schrijf drie dingen op." No action appears in the title, prompt or starters.
- Criteria (hidden until review): Leila has pasta this evening; Wesley and Leila read a book together; Leila must brush her teeth. Criterion 1 takes "vanavond" from the prompt and "pasta" from picture 1; criterion 3 no longer requires "before bed", which the picture alone cannot show.
- Sample omits criterion 2 (no book). Error: "moet Leila haar tanden poetst" (finite verb after a modal).
- Model: "Geef Leila om zes uur pasta. De pasta staat in de koelkast." (1); "Na het eten kunnen jullie samen een boek lezen." (2); "Om acht uur moet Leila haar tanden poetsen. Daarna gaat ze naar bed." (3). 35 words, 6 sentences, longest 9.

### 8 collega-kantoor (picture note, 3 pictures)

- Prompt: training tomorrow, Abdel takes over some tasks, he is off today, note on his desk; "Vertel wat hij morgen moet doen. Schrijf drie dingen op."
- Criteria (hidden until review): water the plants; empty the dishwasher; take the post to reception.
- Sample omits criterion 3 (no post). Error: "De planten staat" (staan).
- Model: "Wil jij morgen de planten bij het raam water geven? De grote plant heeft altijd dorst!" (1); "Daarna moet je de vaatwasser leegmaken." (2); "Breng je om twee uur ook de post naar de receptie?" (3). 34 words, 5 sentences, longest 11.

### Sample errors across the batch

Seven different error types, so a learner who works through the batch meets varied feedback: omdat-clause word order (1), missing inversion plus vind/vindt (2), ik + -t (3), split compound plus spreek/spreekt (4), de/het (5), plural agreement collega's is (6), finite verb after a modal (7), plural agreement planten staat (8).

## 3. Language control

`npx tsx scripts/batch-check.ts` passes the A2 word gate for every strict field (titles, prompts, criteria, scaffolds, form labels and options, models, alts, opening) and for the starters. No unlisted word is used anywhere. Samples are outside the gate but use the same words.

| Item | Model words | Sentences | Longest | Target |
| --- | --- | --- | --- | --- |
| vakantiedagen | 60 | 7 | 14 | e-mail 45–70, 4–8 sentences |
| ouderavond-afmelden | 55 | 7 | 12 | e-mail 45–70, 4–8 |
| verhuizen-helpen | 54 | 8 | 11 | e-mail 45–70, 4–8 |
| zwemles-inschrijven | 34 | 3 | 12 | form: one short sentence per open field |
| bedrijfsuitje | 41 | 5 | 11 | form: one per field (lift field two) |
| mijn-werk | 41 | 5 | 10 | wijkkrant 25–45, 3–5 |
| oppas-briefje | 35 | 6 | 9 | picture note 20–40 |
| collega-kantoor | 34 | 5 | 11 | picture note 20–40 |

All models are in main clauses with at most one subordinate clause per sentence (omdat, of, dat; "of" only in "Kunt u mij laten weten of het kan?") and no sentence over 16 words. Tenses: present, one perfect ("heb … gevonden").

### Compounds reported by the checker (judged)

- **zwemleraar** (zwem + leraar): transparent; the form is about swimming lessons. Also in a starter.
- **meerijden** (mee + rijden): transparent separable verb; also used in the catalogue's `batch008-meerijden`. The form label explains it ("met een collega meerijden … waar kan de collega u ophalen?").
- **wijkkrant** (wijk + krant): transparent and the fixed name of the task type in this bank.
- **keukentafel** (keuken + tafel): transparent.
- **leegmaken** (leeg + maken): transparent; picture 2 shows it.

Not reported but worth a look: "woensdagmiddag", "zaterdagochtend", "donderdagavond" (day-part compounds, listed by rule); "zwemdiploma", "vaatwasser", "verhuizing", "fietstocht", "dierentuin", "taalschool", "verpleegkundige" are listed words.

## 4. Pictures

Two picture notes, three drawings each, `kind: "drawing"`. Briefs are plain English, positive, 36–53 words, closing with "No text." A laptop is "closed"; envelopes are "white"; no screens, clocks, numbers or signs. Each picture shows exactly one criterion fact; the alts describe the picture in Dutch and may name the fact, because the task is open.

Named people drawn in more than one picture, with traits copied verbatim in every brief:

| Person | Item | Traits (verbatim) |
| --- | --- | --- |
| Wesley | oppas-briefje, pictures 1–3 | "A young man of about twenty with short red hair and a blue sweater" |
| Leila | oppas-briefje, pictures 1–3 | "A girl of about seven with short curly black hair and an orange dress" |
| Abdel | collega-kantoor, pictures 1–3 | "A man of about forty with short grey hair and a dark green shirt" |

None of these overlaps a cast description in `config/illustration.json` (Sem is a teenage boy with brown hair and a green sweater; Amina a girl of about ten with braids and a purple hoodie; Karim has a beard and a grey jacket). The receptionist in collega-kantoor picture 3 is a one-off "older man with a white beard", chosen so that the batch does not draw a female receptionist next to a female teacher; the babysitter is a young man for the same reason.

## 5. Names and organisations

Pool: Leila, Pieter, Zeynep, Wesley, Esther, Abdel. Each appears in at most two items:

- Pieter (de Groot): chef, item 1.
- Wesley: colleague in the item 1 model; babysitter in item 7.
- Esther: teacher, item 2.
- Leila: daughter in groep 6, item 2; the child in item 7 (different items, no link implied).
- Zeynep: friend, item 3.
- Abdel: son of six, item 4; office colleague, item 8 (different people).

Surnames: "de Groot" (item 1) and "Mulder" (only in the teacher's e-mail address) are common Dutch surnames, added because a formal e-mail to a chef needs one. No voice name or older cast name is used.

Invented organisations and domains, checked with WebSearch on 5 November 2026:

- **Hotel Kanaalzicht** (`p.degroot@hotelkanaalzicht.nl`): searches for "Hotel Kanaalzicht" and "hotelkanaalzicht.nl OR Kanaalzicht hotel restaurant Nederland" found no business of that name or domain. Nearest hits were other "-zicht" hotels (Amstelzicht, Museumzicht, Ruimzicht, Parkzicht).
- **Basisschool De Wilgenboog** (`e.mulder@bsdewilgenboog.nl`): a search for "basisschool De Wilgenboog" found no school of that name. Real schools with close names exist (De Wilgenhoek in Haarlem and Zuidoostbeemster, De Wilgen in Vlijmen); the reviewer may prefer a more distant name if "Wilgenboog" seems too close.
- The pool (item 4) and the company (item 5) are not named. `kandidaat@mail.nl` and `zeynep@mail.nl` follow the catalogue's existing placeholder convention (008).

No brand names, real addresses or real people.

## 6. Diversity against the catalogue

| New item | Nearest existing items | Why it is not a repeat |
| --- | --- | --- |
| vakantiedagen | A2 `batch008-contract` (e-mail to a chef about a contract), `batch003-loonstrook`; B1 `batch028-vrije-dag` (a zinstaak with one gap) | No A2 task asks for days off. The B1 item is a one-sentence gap fill; this is a full e-mail with dates, reason and cover. |
| ouderavond-afmelden | B1 reading `batch003-ouderavond` (a text about a new format); A2 `batch008-groep` (e-mail to a course teacher) | First A2 writing task to a child's teacher; cancelling an appointment-like talk and asking about the child is new. |
| verhuizen-helpen | A2 `batch008-kast` (help carrying a wardrobe), `batch001-ladder`; A2 speaking `batch027-verhuizen` (picture sequence) | Different act: organising a whole move with a friend, with something to bring and a favour in return. The kast item is the closest; see doubts. |
| zwemles-inschrijven | A2 form `batch008-sportclub` (register a son at a sports club); A2 reading `p3`, `batch021-zwemrooster`; listening `batch002-zwembad` | Same form type as sportclub, but the open fields differ (ability, a fact for the teacher, times); see doubts. |
| bedrijfsuitje | A2 `batch008-meerijden` (e-mail asking a colleague for a lift) | First staff-outing item; the lift is one field among four. |
| mijn-werk | A2 wijkkrant `batch008-reizen`, `-gezond`, `-boodschappen` | First wijkkrant about one's (wished) work. |
| oppas-briefje | A2 e-mail `batch008-oppassen` (asking a friend to babysit) | The existing item asks for a babysitter; this one instructs the babysitter from pictures. |
| collega-kantoor | A2 picture notes `batch008-restaurant`, `-supermarkt`; A2 e-mail `batch002-plant` (ask a friend to water a plant) | First office setting for a picture note; the plant is one of three tasks. |

## 7. Sentence starters (`content/batches/091-starters.json`)

One fragment per criterion, in criteria order, each with "…", in the register of the task, all inside the A2 word list (checked by the batch checker). None states a day, time, reason, object or action the learner must supply.

| Task | Starters |
| --- | --- |
| vakantiedagen | Ik wil graag vrij van … tot en met … / Ik heb deze dagen nodig, omdat … / Op die dagen kan mijn collega … |
| ouderavond-afmelden | Op donderdag 26 november kan ik … / Ik kan niet komen, omdat … / Kunnen we een gesprek hebben op …? / Ik heb ook een vraag over Leila: …? |
| verhuizen-helpen | Wil jij mij …? / Ik verhuis op … om … / Kun jij … meenemen? / Als dank … |
| zwemles-inschrijven | Mijn zoon kan op … komen. / Hij kan … zwemmen. / De zwemleraar moet weten dat … |
| bedrijfsuitje | Ik kies … / Ik eet … / Ik wil … meerijden, want … / Een idee voor het volgende uitje: … |
| mijn-werk | Ik werk als … / Ik werk in … / Ik vind dit werk leuk, want … |
| oppas-briefje | Om zes uur … / Na het eten kunnen jullie … / Daarna moet Leila … |
| collega-kantoor | Wil jij morgen eerst …? / Daarna moet je … / Kun je ook …? |

Picture-note starters keep only order words and a modal, following the 067 decision that sequence starters must not name what the pictures supply (the 008 starters still name objects). "Om zes uur …" offers a time but no fact from the pictures. The mijn-werk starters follow the "I work" route; a learner who writes about wished work can ignore them.

## 8. Doubts for the reviewer

1. **"Beste juf Esther" as a formal salutation.** Dutch parents commonly write to a primary-school teacher as "juf + first name" while using u and "Met vriendelijke groet". I kept that because "Beste mevrouw Mulder" sounds stiff for a groep-6 teacher. If the reviewer wants an unmistakably formal header, change the salutation to "Beste mevrouw Mulder," and the prompt to "juf Esther Mulder".
2. **zwemles-inschrijven next to sportclub.** Both are forms for registering a son for a sport. The plan assigned this one. The open fields differ, but a learner may feel the shape repeats. Practice sets should not put them side by side.
3. **verhuizen-helpen next to kast.** Both ask for physical help. Here the request is for a whole day, with something to bring and a favour in return. If the reviewer reads it as the same concept, criterion 3 could change to "Vraag of Zeynep nog iemand kent die kan helpen" without a new premise.
4. **Leila in two items.** She is a groep-6 pupil in item 2 and a girl of about seven in item 7. The items are independent; renaming the item 7 child would need a seventh pool name, so I kept it within the "two items" rule.
5. **Criterion 1 of item 7** takes "vanavond" from the prompt and "pasta" from the picture. A note that says only "Geef Leila pasta" should pass; the judge sees the alt "Een jonge man zet een bord pasta op de keukentafel voor een meisje."
6. **Bedrijfsuitje lift field.** "Wilt u met een collega meerijden? Zo ja, waar kan de collega u ophalen?" is two questions in one label, like the catalogue's sportclub label "Zo ja, waar?". A learner who answers "Nee, ik kom met de fiets" meets criterion 3.
7. **Wilgenboog** is close to the real school names De Wilgenhoek and De Wilgen (see section 5).

## 9. Requested words

None. I avoided "trouwen" and "bruiloft" (not listed) by giving a family visit as the reason in item 1, and "gieter" (not listed) by keeping the watering can in the English brief only.

## 10. Checker output

```
$ npx tsx scripts/batch-check.ts content/batches/091-original.json
Checked 8 items, 0 questions. Keys: {}. Options: {}.
  warn  A2:writing:batch091-zwemles-inschrijven:1: compounds of listed words (reviewer: transparent at A2?): zwemleraar
  warn  A2:writing:batch091-bedrijfsuitje:1: compounds of listed words (reviewer: transparent at A2?): meerijden
  warn  A2:writing:batch091-mijn-werk:1: compounds of listed words (reviewer: transparent at A2?): wijkkrant
  warn  A2:writing:batch091-oppas-briefje:1: compounds of listed words (reviewer: transparent at A2?): keukentafel
  warn  A2:writing:batch091-collega-kantoor:1: compounds of listed words (reviewer: transparent at A2?): leegmaken
5 warning(s), no failures.
```

All five warnings are compounds, judged in section 3. `npx prettier --check` passes on both JSON files.
