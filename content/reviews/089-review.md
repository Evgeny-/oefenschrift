# Review of batch 089 (A2 listening, 12 items)

## Meaning first (blind packet)

Blind packet hash (original bytes): `4c162252cda9374196231a6c239c71afc14aa5723803ab3ce605a01729118339`. Written before the questions, notes or plan assignment were opened.

1. **vakantie-aanvragen** (gesprek, m-young + f-adult). Rachid asks his warehouse manager for two weeks in July; she refuses the second week because two colleagues are already away, offers the week before, and tells him to enter the days in the app. Every reply answers the previous turn (planning check, "dan een week eerder", holiday-days check, app). The dates are consistent (12 July 2027 is a Monday; 5 July and 19 July too). Coherent, practical. Risk: the first week is "goed" and the shift to 5 July makes the overlap week 12 to 18 July easy to confuse; the dates must stay plain in speech.
2. **huiswerk-juf** (gesprek, m-adult + f-mature). A father asks the teacher about his daughter's slow reading; the teacher suggests a quarter of an hour a day, taking turns by page, and the library reading hour on Wednesday; the father checks the timing against school hours. Natural turns. Risk: "Over zes weken praten we weer" is an extra detail, harmless. Several competing numbers (kwartier, uur, half drie, twaalf uur): load, but each is plainly said.
3. **woning-bekijken** (gesprek by phone, m-older landlord + f-young). The landlord calls a viewer, offers Thursday 17.30, she works until six and gets Saturday ten o'clock; she asks floor, rent, what to bring; he says the latest payslip. Every turn follows. Risk: the landlord leading with "donderdag half zes" then moving: good competing detail. Gas and electricity "ongeveer honderd euro" adds a second price next to the rent.
4. **fysio-verzet** (voicemail, f-adult). The physiotherapy assistant moves Tuesday's first appointment to Thursday 16.15 because the therapist is on a course, says what to bring, that the GP letter is already in, and when to call back. Coherent and realistic. Risk: a great many facts; two days, two times, bring and not-bring items.
5. **boek-gereserveerd** (voicemail, m-young). The library has a reserved gardening book at the desk for seven days, loan three weeks, can be moved to the Noord branch in two days, opening hours with a longer Thursday. Coherent. Risk: many numbers (seven days, three weeks, two days, hours); tested facts must be spaced.
6. **tram-omleiding** (omroep, narrator). Track work: tram stops at Wilgenplein, bus eighteen on the opposite side, every five minutes, ten minutes longer, tram ticket valid. Typical announcement, all facts serve the traveller. Risk: none for meaning.
7. **toernooi-sporthal** (omroep, m-casual). During a children's basketball day an announcer asks the owner of a red car to move it behind the hall, then gives lunch from twelve, final matches at three and prizes at four, all in hall one. Plausible, the parking request has a safety reason (ambulance). "Dan iets anders" signals the topic change, so the jump is announced. Risk: three clock times plus parking; a casual voice for the announcer.
8. **printer-uitleg** (uitleg, m-adult). A colleague shows a new employee the printer in order: send, pass at the reader, choose on screen, green button; colour only with the manager's permission; paper in the cupboard; broken printer goes to reception. Coherent procedure with a reason for the colour rule. Risk: second-person "je" fits a colleague; the colour sentence is easy to hear.
9. **intake-taalschool** (uitleg, f-mature). A language school employee explains the intake (computer test, talk with a teacher), group choice, two class patterns, price and payment in three parts, employer may pay. Realistic. Risk: the longest and most fact-dense script; the word "intake" is a loan word heard in the first sentence, explained in the same sentence by "een korte toets en een gesprek".
10. **bibliotheek-verhuist** (nieuws, presenter). Local news: library moves next to the station, closed two weeks from 9 January, return books after opening with no fine, opening party 23 January with free first year for new members. Dates are consistent (9 and 23 January 2027 are Saturdays). Coherent and useful. Risk: two dates, two durations.
11. **fietsenwinkel-reclame** (reclame, m-shop). A bike shop advertises a spring check at a fixed price with a coffee while waiting and repair within a day. Realistic radio ad. Risk: "binnen één dag" and "voor tien uur, klaar om vijf uur" and "een half uur" sit close together, two kinds of waiting time that may contradict each other in the listener's mind.
12. **rijschool-reclame** (reclame, presenter). A driving school ad for adult and nervous learners, a cheap first lesson, evening and Saturday lessons, closed on Sunday, with a light roundabout joke. Realistic. Light humour. Risk: the joke sentence is the only unusual line and is harmless.

Stills: every brief shows the setting and none of the likely tested facts (no clocks, prices, dates or text). Tone in this packet: 2 light-humour candidates (items 11 and 12 slogans; item 12 joke), the rest ordinary.

Verdict of the blind pass: all twelve sources are coherent; no item is rejected on meaning. The full pass follows.

Packet hash of the proposed bytes (after repairs, meaning pass repeated on the changed items): `da4b86f0d77a76cf04e2ba21a7afda34d61046f8c21cd9da1dea2c9eda2b5d2b`. Proposed file SHA-256: `7fd175ce536dd05edf9e9350cc3bde4948fbb6dda52aad58591c3bf4c56967d6`.

## Verdicts

Batch verdict: pass. 12 items: 6 pass unchanged, 6 pass (edited), 0 rejected. Tone: 11 ordinary, 1 light humour (rijschool-reclame; cap for the batch is 2).

| Item | Verdict | Level vs existing A2 listening | Reason |
| --- | --- | --- | --- |
| vakantie-aanvragen | pass | comparable (upper end) | 166 words, two overlapping date ranges, keys proved from the dates |
| huiswerk-juf | pass (edited) | comparable to slightly harder | 178 words is the longest script; title leaked q1/q2 and was neutralised |
| woning-bekijken | pass (edited) | comparable | odd-one-out options, q3 prompt leaked the day, EUR 950 and money distractors anchored |
| fysio-verzet | pass (edited) | comparable | key was the longest option; q3 prompt leaked the day |
| boek-gereserveerd | pass | comparable | clear persona question for the Thursday opening |
| tram-omleiding | pass | comparable | 97 words, two questions, clean distractors |
| toernooi-sporthal | pass (edited) | comparable | free-sandwich question replaced by "Waar is de lunch?" with anchored places |
| printer-uitleg | pass | comparable | steps, permission rule, paper place; all distractors anchored |
| intake-taalschool | pass (edited) | comparable to slightly harder | "intake" replaced; explanation of q2 corrected |
| bibliotheek-verhuist | pass | comparable | dates verified as Saturdays in 2027 |
| fietsenwinkel-reclame | pass | comparable (easier on length) | three prices clearly apart |
| rijschool-reclame | pass (edited) | easier on length | yes/no options with an odd polarity key rebuilt as parallel times; still redrawn as Ingrid |

## Edits (details with before/after in the JSON)

- huiswerk-juf: title "Lezen oefenen met Merel" becomes "Een gesprek met de juf".
- woning-bekijken: landlord now says the total once ("Samen is dat ongeveer negenhonderdvijftig euro") so the EUR 950 distractor is anchored; adds "Geld hoeft u nog niet mee te nemen" to exclude the money distractor; q1 option C "Zaterdag om half zes" so the key is not the only Saturday option; q3 prompt no longer says "zaterdag".
- fysio-verzet: q2 key "Een handdoek." (was the longest, two items); q3 prompt "De nieuwe afspraak past niet." (no "donderdag").
- toernooi-sporthal: q3 becomes "Waar is de lunch?" (in zaal één / achter de sporthal / in de kantine, key C).
- intake-taalschool: "intake" becomes "eerste afspraak"; q2 explanation no longer claims what the script does not say.
- rijschool-reclame: q2 rebuilt as "Tot hoe laat kan ze op werkdagen les krijgen?" with parallel times; still brief draws Ingrid with her item-1 traits.

## Rejected

None.

## Doubts of the author resolved

- "intake": replaced (not transparent at A2).
- Item 7 q3 thin: replaced by the author's alternative; the free-sandwich fact was wrong-by-silence for soup and fruit.
- EUR 950 distractor (item 3): kept, but anchored by one added sentence from the landlord.
- Voices: item 7 m-casual and item 11 m-shop kept; narrator or presenter is a safe fallback after audition.
- Item 6 has two questions: acceptable (two or three per fragment); a ticket question would need weak distractors.

## Diversity and set notes

Task types and domains vary across the twelve; no A2 listening title is repeated. Items 5 and 10 (both library) belong in different practice sets, as does item 4 with 090 fysio-oefeningen and item 12 with 090 rijles-verzet. Item 2 is the longest script of any A2 listening item (178 words): do not place it first in a set.

## Media notes

Voice pairs: m-young + f-adult, m-adult + f-mature, m-older + f-young; no m-adult with f-adult. Stills show no tested fact; Agnieszka, Stefan, Naima keep their three traits; Ingrid is now consistent in items 1 and 12. Generate audio only from the proposed bytes and with `--keys` for the new jobs (items 3, 7, 9 and 12 have changed question or script text).

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Level verdicts are relative to existing items only. Organisation names (Trapkracht, Zijspiegel) were checked by the author, not again by me. Audio and pictures are not yet produced or reviewed.
