# Level check: batch 004 (A2 Lezen) and batch 005 (A2 Luisteren)

Independent level check (blueprint section 12, step 5), 10 September 2026. Input: `content/batches/004-original.json` (12 reading items, 30 questions) and `content/batches/005-original.json` (12 listening items, 28 questions), plus `content/blueprint.md`. The editorial reviews (`004-review.*`, `005-review.*`) and the authors' notes (`004-notes.md`, `005-notes.md`) were not read.

## Method

`content/exemplars/` does not exist yet, so each item was compared against three anchors:

1. **The official form as described in the blueprint.** Section 2: reading texts of 100–250 words with 2–3 questions each, persona and purpose questions, tables; listening fragments of 30–90 seconds (conversations, announcements, voicemails, news, explanations) with the question printed and read aloud. Sections 4.1 and 4.2: task types, question counts, option mix, "difficulty comes from having to find and combine two details, not from vocabulary". Section 10: average sentence length under 12 words, no sentence over 18; subordinate clauses only with omdat, als, dat, wanneer, toen; present and perfect tense, simple future with gaan; at most one less common word per 50, explained by context.
2. **CEFR A2 reading and listening descriptors:** short, simple texts on familiar everyday matters; high-frequency vocabulary; explicit information; operations limited to locating a detail, combining two details, applying a stated rule to a named person, recognising the purpose.
3. **The project's earlier A2 drafts in `content/catalogue.json`** as a lower anchor (read: `A2:reading:p1`, `p3`, `batch002-huisarts`; `A2:listening:batch001-schoolreis`, `batch002-zwembad`). Those are 44–87 words (reading) and 25–50 words (listening) with single-locate questions, i.e. well below the official length. They show what "easier than the exam" looks like in this project.

Measurements. Sentence statistics were computed by script over the prose only: table rows (`a – b – c`), numbered list rows, headers, addresses, signatures and speaker labels were excluded; times (9.00), prices (7,50) and URLs were protected from the splitter. Word counts are for the whole `text` field. Listening durations are the measured `duration` of the rendered fragment in `content/audio-manifest.json` where one exists (10 of 12); the two unrendered fragments are estimated at 2.2–2.7 words per second, the pace of the rendered ones.

Vocabulary. "Words above A2" lists words a typical A2 NT2 learner would not be expected to know (outside roughly the 2,000 most frequent words plus inburgering core words such as gemeente, vergunning, DigiD, huisarts, identiteitsbewijs, pinpas). Marks: **g** = glossed by the surrounding sentence, **n** = not needed for any key or distractor, **!** = needed to answer.

Verdict scale. **comparable** = the item would sit inside the range of the official A2 form as described above; **easier** / **harder** = below or above the typical official item. A **flag** is raised only when an item sits outside the official range and should be revised before use; "easier" with flag "none" therefore means: below the median but still exam-shaped, best used early in a drill.

## Batch 004 — A2 Lezen

| id (`A2:reading:batch004-…`) | taskType | words | avg / longest sentence | words above A2 | verdict | flag |
| --- | --- | --- | --- | --- | --- | --- |
| parkeervergunning | brief | 162 | 6.9 / 9 | verlengen (g, !), kenteken (g), parkeervergunning (core) | comparable | none |
| werkkleding | brief | 142 | 7.3 / 15 | magazijn (!), innemen (g, n) | comparable (easy end) | none |
| praktijkles | email | 150 | 7.6 / 13 | cursist (core), dagopleiding/avondles (transparent, !) | comparable | none |
| picknick | email | 144 | 7.4 / 14 | vijver, verzamelen, kleed, rek (all n) | easier | none |
| telefoon | folder + table | 153 | 6.6 / 11 | oplaadaansluiting (table label, n), waterschade (transparent, n), aannemen (g) | comparable | none |
| stadsbus | folder + table | 158 | 8.1 / 15 | volwassene (g, n) | comparable (upper end) | none |
| bloedprikken | rooster + table | 150 | 6.7 / 12 | nuchter (explicitly glossed, !), uitslag (g, n), prikpost (situation only) | comparable | none |
| verwarming | regels | 161 | 6.5 / 12 | thermostaat (!), waterdruk (g, n), cv-ketel (n), resetknop (transparent), storing (g, !), monteur, bereikbaar (g, n) | comparable (vocabulary at top of A2) | none, borderline |
| magazijn | advertentie | 164 | 6.4 / 14 | ochtend-/middagdienst (transparent, n), tillen (reused in prompt), uitladen (n) | comparable | none |
| ramen | krant | 137 | 8.8 / 13 | enkel/dubbel glas (n), precieze (n), spreekuur (n), daardoor | comparable (questions easy) | none |
| flessenautomaat | bericht | 136 | 7.6 / 14 | statiegeld (n), inwisselen (g, n), kratten (n), ongemak (formula, n) | comparable | none |
| herhaalrecept | brief | 178 | 7.1 / 14 | herhaalmedicijnen (explicitly glossed, !), inspreken (n), bezorging (reused in prompt, !) | comparable (upper end) | none |

Batch-level numbers: 136–178 words per text (official 100–250); average sentence 6.4–8.8 words (heuristic < 12); longest sentence 9–15 (limit 18); no passive, no relative clause, no conditional with zou; subordinate clauses are rare — one als-clause in the whole batch (telefoon: "Wij bellen u als de telefoon klaar is") — and conditions are expressed by the question-then-dan pattern ("Bestelt u vóór 12.00 uur? Dan …"); connectors dus, daarom and one daardoor. Questions: 12 rule-application, 6 purpose, 3 time-place, 3 quantity, 2 sequence, 2 detail, 1 person, 1 advice; every text has at least one persona question; 18 three-option and 12 four-option questions (60/40).

### Item notes

**parkeervergunning.** Gemeente letter in the standard register (Betreft, Geachte heer); question-then-"dan" conditionals and imperatives only. q1 applies "verleng vóór 1 december" to Karim with the no-car case and the wrong moment as distractors; q2 is the "eerst een afspraak" sequence; q3 (purpose) needs the text, because the new car and the appointment are both mentioned as examples. Nothing answerable without the text. Archetypal DUO letter.

**werkkleding.** Employer letter; three dates in the text (9 oktober, 28/29 oktober, 2 november) serve as q1 distractors. q1 is a one-step elimination ("kan niet op woensdag" → donderdag), q2 a four-option purpose question. On level but the easiest of the three brieven.

**praktijkles.** School e-mail with a numbered list. q1 is the most demanding operation in the batch: three lesson times checked against Fatima's working hours (two fall inside, Saturday outside) — apply a stated rule, three comparisons, all explicit. q2 uses the avondles rule; q3 purpose (A is the generic option but B and C are contradicted).

**picknick.** Informal family e-mail; the four less common words are scenery. q1 needs the rain rule and the mapping "bij mij thuis" → the sender Roos (a small but genuine reading operation); q2 is a single locate whose answer sentence repeats the prompt's words. No combination of two details anywhere. Verdict easier; would still not be out of place in the exam.

**telefoon.** Repair folder with a four-row table — the table type section 4.1 asks for. q1 applies "vóór 12.00 dezelfde dag, later de volgende dag" to Tuesday 14.00 and names Wednesday: two details plus a one-day step, exam-typical. q2 applies the Saturday rule; q3 is a single locate. "oplaadaansluiting" is not glossed but only has to be recognised as "not batterij".

**stadsbus.** Ticket folder with a table. q1 turns on the boundary "tot en met 3 jaar" versus "4 tot en met 11"; q2 on "geen pinpas → app of balie"; q3 combines the weekend frequency with the after-22.00 line into four composite options — exactly the "find and combine two details" the blueprint wants. q1 is partly guessable from world knowledge (toddlers travel free) but the table states it. Upper end of comparable.

**bloedprikken.** Rooster with a three-row table. q1 compares three schedules with 7.00–12.00 working hours; only the hospital (7.30–16.00) leaves the afternoon — the reader must see that 16.00 lies after 12.00. q2 (water allowed when fasting) is partly answerable from world knowledge, but the text states it verbatim and glosses "nuchter" in a model way.

**verwarming.** Instruction card. Five to seven less common household words in 161 words puts it above the 1-per-50 heuristic; each is explained by its own step (waterdruk "tussen 1 en 2", storing "doet de verwarming het dan nog niet?", bereikbaar "dag en nacht") and they are the real words on a woningstichting card. q1 is step 1 of the sequence; q2 applies the rule with a negation (wél warm water → website, not the phone). Questions are mid-A2, text at the top of A2. See borderline note below.

**magazijn.** Job advertisement with headed sections. q1 gives "Ja, want / Nee, want" options: the two "Ja" reasons are true facts, so the reader must find the one rule that fails (18 jaar of ouder). q2 applies the calling hours. Comparable; the reasoned-option format is plausible in the official exam.

**ramen.** Neighbourhood-paper item: highest average sentence length in the batch (8.8), a quoted source and dates in parentheses, one "daardoor". q1 is a locate in parentheses. q2 (purpose) is largely answerable from the options alone: A is the generic "informeren" option and B, C and D are implausible purposes for a wijkkrant piece. Comparable overall; q2 is the weakest question in the batch as a measure of reading.

**flessenautomaat.** Shop notice; "statiegeld" and "inwisselen" are not needed for any key. q1 applies opening hours to Thursday; q2 the small-bottles rule (four options); q3 purpose needs the text (B claims the balie is closed). 136 words is long for a "bericht" but inside section 4.1.

**herhaalrecept.** Pharmacy letter, longest text (178 words) and the densest reasoning: before/after-12.00 rule, age-70 rule, herhaal-versus-nieuw exception. q1 applies the first rule to Monday 10.00 → Tuesday from 14.00, with the after-12.00 case as distractor D; q2 the age rule; q3 purpose. All explicit; upper end of comparable.

## Batch 005 — A2 Luisteren

| id (`A2:listening:batch005-…`) | taskType | words / duration | avg / longest sentence | words above A2 | verdict | flag |
| --- | --- | --- | --- | --- | --- | --- |
| training | gesprek, 10 turns | 124 / 40 s | 5.2 / 16 | heftruck (n), leidinggevende (label), "dat wordt lastig" (g) | comparable | none |
| scherm | gesprek, 10 turns | 130 / 54 s | 4.8 / 9 | – | easier | none |
| tabletten | gesprek, 10 turns | 140 / 49 s | 5.7 / 12 | bloeddruk (n), innemen (maps to "neem") | comparable | none |
| feestje | gesprek, 10 turns | 139 / 44 s | 5.5 / 10 | smal (n) | comparable (easy end) | none |
| toets | gesprek, 10 turns | 147 / 46 s | 6.8 / 15 | aantekeningen (distractor), hoofdstuk (n), uitslag (!) | comparable | none |
| parkeervergunning | voicemail | 134 / ≈50–60 s (not rendered) | 8.3 / 14 | kentekenbewijs (needed only as "een document"), aanvraag (core), uploaden (loan) | comparable (upper end) | none |
| voetbal | voicemail | 129 / 35 s | 7.9 / 12 | "we spelen uit" (n), ploeg (n), verzamelen (n) | comparable | none |
| bus | omroep | 121 / 47 s | 8.0 / 14 | – | comparable | none |
| winkelcentrum | omroep | 108 / 42 s | 8.2 / 16 | – ; one passive "is … gevonden" (formulaic) | comparable | none |
| speelplaats | nieuws | 126 / 52 s | 8.3 / 15 | speeltoestellen, klimtoestel, schommel, waterpomp, zandbak, wethouder (all n) | comparable | none |
| werkdag | uitleg | 149 / 45 s | 8.2 / 14 | personeelsingang (transparent, distractor), "pas tegenaan houden" (g, n), apparaat (n) | comparable (upper end) | none |
| computercursus | reclame | 154 / ≈55–70 s (not rendered) | 8.5 / 17 | gevorderden (g), stadspas (reused in prompt, !), "vol is vol" (n) | comparable | none |

Batch-level numbers: 108–154 words per fragment; measured 35–54 seconds for the ten rendered fragments (official 30–90 s); average sentence 4.8–8.5 words; longest 9–17 (limit 18); exactly one passive in 24 items; subordinators: als, omdat, dat, want, dus, daarom, one indirect "of"; two simple-past forms ("had", "dacht … was"), both transparent. All five conversations have exactly ten turns (the section 4.2 maximum). Questions: 8 time-place, 6 rule-application, 4 advice, 4 purpose, 3 detail, 2 quantity, 1 person; 17 three-option and 11 four-option questions (61/39).

### Item notes

**training.** Workplace conversation; "heftruck" only names the course. q1 uses the classic listening distractor — the first-mentioned day (dinsdag) is rejected, donderdag is the key; q2 has four items all mentioned, one required; q3 purpose. The official item would be video; audio plus still is noted in the item.

**scherm.** Shop counter conversation with the shortest sentences of all 24 items (avg 4.8) and only everyday transactional words. q1 price (110 euro is the combined price), q2 e-mail instead of a call — both single details said plainly. Verdict easier; exam-shaped and a natural drill opener.

**tabletten.** Pharmacy counter. q1 applies the forgot-a-tablet rule with four options (A is contradicted by "nooit twee tegelijk"); q2 donderdag versus vandaag / twee weken. Comparable.

**feestje.** Neighbour conversation. q1 asks for one of three clock times said in sequence (acht, elf, twaalf) — a real listening discrimination; q2 purpose with two contradicted distractors. Easy end of comparable.

**toets.** Student–teacher conversation. q1 day (donderdag is the lesson, juni the retake), q2 what may be used (four items all mentioned), q3 how the result arrives. Julio's echo "Dinsdag om negen uur, in de grote zaal" repeats the q1 key, which softens section 4.2's "said once" but is natural conversational confirmation.

**parkeervergunning (voicemail).** Formal gemeente voicemail, the densest fragment: three documents, two channels, two opening times, a deadline and a payment rule. Object-first "Uw rijbewijs en uw huurcontract hebben wij goed ontvangen" is harder to parse by ear than subject-first order but is standard. q1 Thursday hours (8 versus 5 versus the 9 o'clock opening), q2 "pas als de vergunning klaar is" versus the two-week document deadline, q3 purpose. Upper end of comparable.

**voetbal.** Parent voicemail. The message has several points (day change, shirt, lift, confirmation); q1 asks for the purpose and only A is supported while B and C are contradicted. q2 has four bag items all mentioned. Comparable. See the audio note below: the rendered fragment runs at 3.7 words per second.

**bus.** Driver announcement. q1 which stop for the stadhuis (four stops named); q2 "vanaf zaterdag" against maandag (start) and vrijdag (last day). Comparable.

**winkelcentrum.** Shortest fragment (108 words, 42 s). Contains the only passive in both batches, "is een grijze kinderjas gevonden": the fixed lost-and-found formula, transparent. q2 asks for one of four "half"-times (negen, half tien, tien, half elf) — the classic A2 listening trap, explicit. Comparable.

**speelplaats.** Regional radio news. Six playground and civic nouns (klimtoestel … wethouder) are scenery; neither question needs them. q1 who pays (bewoners asked, school opens), q2 where to report (four places). Comparable; the decorative load is what makes a news item sound like news.

**werkdag.** First-day briefing with six named places and three questions on them (sick rule with four options, canteen floor, key at the reception). All explicit; the printed questions make the load manageable. Upper end of comparable.

**computercursus.** Radio advert, longest fragment. The 17-word sentence is a three-item list. q1 stadspas → gratis with 20 and 40 euro as nearby prices; q2 group size among four spoken numbers (acht lessen, tien mensen, 20 en 40 euro). Comparable.

## Flagged items

None of the 24 items is flagged. Two are easier than the median official item (picknick, scherm) but inside the official range; none is harder; no item uses grammar beyond A2 in a way that carries meaning.

### Borderline, no revision required

**004-verwarming (vocabulary density).** Five to seven less common words in 161 words is the only breach of the section 10 heuristic (one per 50) in either batch. It is on level because each word is explained by its own step and none is needed for a key beyond "thermostaat" and "storing melden", which the options repeat verbatim from the text. If the author wants a safety margin, the one free simplification is "Dit nummer is dag en nacht bereikbaar" → "U kunt dit nummer dag en nacht bellen"; "waterdruk", "cv-ketel" and "resetknop" should stay, because they are the words a tenant has to recognise on the real card.

**005-winkelcentrum (one passive).** "Bij de ingang Noord is een grijze kinderjas gevonden" is the only passive in 24 items and is the fixed phrasing of lost-and-found announcements. Leave it; "Wij hebben bij de ingang Noord een grijze kinderjas gevonden" would be the A2-strict alternative if a later heuristic rejects passives outright.

**Questions partly answerable without the stimulus.** No question is fully answerable without the text or audio. Three lean on world knowledge or option shape: 004-bloedprikken q2 (water is allowed when fasting), 004-stadsbus q1 (children of three travel free), 004-ramen q2 (A is the generic "informeren" option, B–D implausible for a wijkkrant). The first two are acceptable as they stand because the text states the fact verbatim and the official exam asks such questions. For ramen q2 a stronger distractor would be a purpose the text partly supports, e.g. "Bewoners uitnodigen voor het spreekuur op 24 september" in place of D; the key stays A because the spreekuur is one closing sentence.

## Conclusions

### Batch 004 — a fair A2 drill

Verdicts: 11 comparable, 1 easier, 0 harder; 0 flags. Every text passes the section 10 heuristics with room to spare (average sentence 6.4–8.8 against a ceiling of 12; longest 9–15 against 18), every text is inside 100–250 words, and the language load is carried by explicit dates, times, prices and rules rather than by vocabulary. On language the batch sits in the lower-middle of the official range; on question demand it sits in the middle, because 12 of 30 questions apply a stated rule to a named person and several combine two details (stadsbus q3, telefoon q1, praktijkles q1, bloedprikken q1, herhaalrecept q1). Compared with the project's earlier A2 drafts (44–87 words, single-locate questions) this batch is a clear step up and is the first reading material in the project that looks like the exam.

Drill order, easiest first: **picknick, werkkleding, ramen, parkeervergunning** (openers: single-locate or one-step questions, familiar content); then flessenautomaat, magazijn, verwarming, telefoon; hardest last: **praktijkles, bloedprikken, stadsbus, herhaalrecept** (three-way comparisons, two-detail combinations, calendar steps). For a 3–4 text drill of one task type, the two brieven to open with are werkkleding then parkeervergunning, ending with herhaalrecept; the two folders in the order telefoon then stadsbus.

Noted in passing, outside this check: D is the key in 3 of 30 questions (10%) — the section 4.1 balance rule ("none below 20%") is for the editorial reviewer to interpret for a batch where only 12 questions have a D.

### Batch 005 — a fair A2 drill

Verdicts: 11 comparable, 1 easier, 0 harder; 0 flags. All fragments are 108–154 words and the ten rendered ones play for 35–54 seconds, inside the official 30–90 s and above the 25–50-word listening drafts in the catalogue. Sentences are short (average 4.8–8.5, longest 17), conversations are natural and every asked-for detail is said once in full, with the competing detail elsewhere in the fragment — the day changed from dinsdag to donderdag, three clock times in a row, four "half"-times, four spoken numbers. The single-speaker fragments (voicemail, omroep, nieuws, uitleg, reclame) are denser than the conversations and carry the top of the batch's difficulty, as they do in the official exam.

Drill order, easiest first: **scherm, feestje, tabletten, training** (conversations, short turns, single-detail keys); then toets, bus, speelplaats, voetbal; hardest last: **winkelcentrum, computercursus, werkdag, parkeervergunning** (four-way time or number discrimination, six named places, formal register with inversion). For a 4-fragment drill of gesprekken: scherm, feestje, tabletten, toets.

Audio note for the media step (pace, not script): the rendered fragments for voetbal (127 words in 34.7 s, 3.7 words/s) and werkdag (148 words in 45.3 s, 3.3 words/s) are markedly faster than the others (2.2–2.7 words/s). The scripts are on level; if those renderings are the final ones, the pace alone would make the two items harder than the official audio, and they should be regenerated at the pace of scherm or speelplaats.
