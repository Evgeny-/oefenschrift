# Review of batch 104 (A2 listening, 12 new)

## Meaning first (blind packet)

Blind packet hash (original source): 7d4bbe1d97721ce08f56e55b4bf21cabe66766e92d0fa7e3f1b95004c45b3920. Written before opening questions, keys, notes or the plan.

1. werkgesprek: A chef gives a six-month review, changes Monday start time, and agrees to a course. Each reply follows (praise, "kan er iets beter?", "En op de andere dagen?", "Mag ik iets vragen"). Coherent. Practical result: new schedule and course. Ordinary. Risk: "In september praten we weer" fine.
2. bril-kopen: Customer buys reading glasses, glasses cost extra, pick-up Thursday, pay half now. Coherent purchase. Problem: the employee's first line says "U komt net bij de oogarts vandaan, hoor ik" but nothing in the dialogue tells him; "hoor ik" has no source. Needs a visible reason (she holds a letter or says it). Otherwise ordinary.
3. school-inschrijven: A father enrols a daughter; secretary explains start date, what to bring, school hours, a tour. Each reply answers the question before it. Coherent. Stocktaking risk is low because each fact answers a stated question. Ordinary.
4. schilderwerk-gang: Landlord voicemail about painting: dates, hours, wet paint, bikes out, cleaner, phone number. All one purpose (prepare for work). Coherent. Ordinary.
5. ontruimingsoefening: School announcement about a drill: time correction, bell, stairs, where to stand, coffee after. Coherent; the time correction is a plausible reason. Ordinary.
6. bioscoop-later: Cinema announces a delay for one screen, with compensation. Coherent. The popcorn offer is plausible compensation. Ordinary.
7. zelfscan: Supermarket employee explains self-scan: scanner, bag, produce, pay by card, age check, bag check. Coherent how-to. Ordinary.
8. rookmelder: Fire brigade speaker at a neighbourhood evening explains where to hang a smoke alarm, testing, low battery. Coherent. Official advice must be checked.
9. gladde-wegen: Radio weather item: frost, salting, buses, schools open. Coherent. "Veel mensen vragen" is a normal radio device. Ordinary.
10. gemeente-zaterdag: Radio news: municipal hall open some Saturdays, appointment needed, evening hours. Coherent. Ordinary.
11. wandelgroep: Radio advert for a walking group: days, time, route, coffee, start date. Coherent. Ordinary.
12. radio-vacature: Radio advert for breakfast help at a hotel: shifts, pay, how to apply. Coherent. Ordinary.

All twelve read as ordinary scenes; none is absurd.

Repeat on the proposed bytes (packet hash 631f8a042ed10cae80c7863e58119a15cf3296218cefc21123d103f637aaaa05): the changed items (1, 2, 6, 10, 11) still read as coherent; item 2 now has Khadija say she came from the eye doctor, which removes the unsupported "hoor ik".

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| werkgesprek | pass (edited) | comparable | Unanchored option D removed; list tied to Anil; two hard words replaced. |
| bril-kopen | pass (edited) | comparable | Unsupported opening line fixed; both prices in one turn so one quote entails the total. |
| school-inschrijven | pass | comparable | Invented claim removed from an explanation only. |
| schilderwerk-gang | pass | comparable | Clean. |
| ontruimingsoefening | pass (edited) | comparable | Prompts address u; evidence spans key; explanation corrected. |
| bioscoop-later | pass (edited) | easier | Time option anchored; q1 no longer gives away q3; still shows a man. |
| zelfscan | pass (edited) | comparable | Script and questions both say "apparaat". |
| rookmelder | pass (edited) | comparable | Questions say rookmelder; advice confirmed on brandweer.nl. |
| gladde-wegen | pass (edited) | comparable | Opaque "busbanen" replaced. |
| gemeente-zaterdag | pass (edited) | comparable | Key was longest and odd polarity; options rebuilt. |
| wandelgroep | pass (edited) | comparable | Unanchored options replaced; prices added. |
| radio-vacature | pass (edited) | comparable | Unanchored option replaced; pay raised to 15,50. |

Counts: 1 pass, 11 edited, 0 rejected. Doubts resolved: item 6 "Om acht uur" replaced by "Om tien over acht" (now said); item 11 "Vier euro" now anchored by the coffee-with-biscuit price.

## Edits
Listed field by field in content/reviews/104-review.json (`edits`). Key balance after edits: A 12, B 12, C 9, D 3 (D only in the ten four-option questions).

## Diversity and set notes
No title repeats the catalogue. Keep items 4, 5 and 8 out of one set.

## Media notes
Two stills (school, cinema) show no key. Cinema still changed to a man. Phone numbers in digits as scripted.

## Limitations
AI editorial review does not validate CEFR difficulty or official exam equivalence. "Hotel Zonnehoek" has no hotel match on the web, but a sale-listed group accommodation of that name exists in Exloo; the coordinator may swap the name. The battery price in item 8 is not on the brandweer page and no question depends on it.
