# Review of batch 101 (A1 step 2 reading)

## Meaning first (blind packet)

Packet read before any question, option, key, note or assignment. Original packet hash: 644a789eb31ac8f1b99cf79731581c754dcca3afc464b0f83f1571743d0173c2 (the final packet hash for the proposed bytes is recorded in the review JSON).

- zwemles-donderdag: a swimming pool tells a parent that this week's lesson moves from Wednesday to Thursday at the same time, with what to bring. Coherent, real purpose, ordinary. Risks: "handdoek", "fles" and "wachten" are beyond a first-weeks vocabulary; "Niet op woensdag" is a fragment.
- bieb-tijden: opening hours plus two "Nieuw" notices at a library. Real notice, ordinary. Risks: "Donderdag: van negen tot negen uur" reads as nine to nine (evening); "pas" and "gratis" are hard; the opening line "wij zijn open" is odd for a notice that includes "Zondag: dicht".
- nieuwe-collega: a colleague mails the team about a new colleague (start day and time, who shows her round, a cake on Friday). Coherent, ordinary. Risks: "Dat is om twaalf uur" has an implicit reference; "de kasten" is an odd thing to show a new colleague; "ander kantoor" adds load; the sentence "Komen jullie ook?" is clear.
- markt-buurvrouw: a neighbour asks whether the reader wants anything from the Saturday market and invites them along. Coherent, with a light joke (apples for a dog). Risks: "bij de deur" has no referent (whose door?), "Of stuur me een bericht voor vrijdag" is vague, "Ik heb twee tassen" is stocktaking that serves nothing, "fruit" and "appels" overlap.
- nieuwe-dokter: a practice letter announcing a new GP on 1 December, same address, how to book, closed Wednesday afternoon. Realistic letter, ordinary. Risks: "huisarts" and "afspraak" are hard A1 words; "dokter Sara" uses a first name as a title.
- menu-week: a school canteen menu with prices and opening times. Realistic list, ordinary. Risks: "toetje", "pinpas", "pasta", "tomaat", "kip" are beyond a beginner list; the picture shows adults in a canteen, which sits oddly with "school".

Repeat meaning pass on the proposed bytes: the rebuilt packet hash is 37189ebe4892f3af030f8cfa5987148570b3445224d094c45d90726108261441. Changes made after the blind pass: the market message now has an owner for "de deur" and no stocktaking; the collega message lost the odd "kasten" and the implicit "Dat"; the library hours no longer read "negen tot negen"; the GP letter and the menu lost hard or awkward words. All six sources now read as things the sender would really write.

## Verdicts

Proposed file SHA-256: 2de02f46e80f71a099de5b4c991173435ce8175ad48dc66d263084b2bd6123df. Result: 0 pass unchanged, 6 pass (edited), 0 rejected. Checker: no failures, one warning (item 1, greeting joined to the first sentence counts 13 words; the sentence has 10).

| id | verdict | level | reason |
| --- | --- | --- | --- |
| zwemles-donderdag | pass (edited) | A1 step 2, harder than step 1 as intended | Prompt q3 now matches "kunt wachten"; brief shortened. Hard words kept: handdoek, fles. |
| bieb-tijden | pass (edited) | A1 step 2 | Thursday no longer "negen tot negen"; q2 asks a stated hour; q3 options are all prices; one word (kaart) instead of pas and kaart. |
| nieuwe-collega | pass (edited) | A1 step 2 | Removed "kasten" and the implicit "Dat"; added "Zij zit naast Ivo" (matches the picture). |
| markt-buurvrouw | pass (edited) | A1 step 2, light humor | "bij je deur" has an owner; no stocktaking; no fruit/appels overlap. |
| nieuwe-dokter | pass (edited) | A1 step 2 | q3 had two defensible readings (closed only Wednesday afternoon); now "Wie gaat weg?"; adres and signature fixed. |
| menu-week | pass (edited) | A1 step 2 | "toetje" removed; weekend line keeps the text at 51 words. |

## Word difficulty (owner's priority)

The checker passes every word, but its list is broad. Words from the list that a first-weeks learner may not know: handdoek, fles (item 1), gratis (item 2, needed for q3), huisarts and afspraak (item 5), tomaat, pasta, kip, pinpas (item 6). I removed the two that were avoidable and unneeded (toetje, the pas/kaart pair) and the unusual "kasten", "negen tot negen", "bij de deur" without owner. The rest are everyday words in Dutch courses and stay; the coordinator may ask for a picture glossary if learners report trouble. Nothing outside the list was introduced (kaas, nul and assistent are listed).

## Edits

28 edits are recorded in the review JSON; summary by field.

- zwemles-donderdag: q3 prompt "Waar wacht u?" to "Waar kunt u wachten?" (text says kunt); brief cut to scene plus "No text."
- bieb-tijden: text (Thursday to acht uur; "De boeken liggen" instead of "Ze liggen"; "uw kaart" instead of "uw pas"); q2 prompt, evidence and explanation; q3 option A "Niets." to "Nul euro." and one-line evidence; brief.
- nieuwe-collega: text (no kasten; "Op vrijdag om twaalf uur is er taart."; "Zij zit naast Ivo."); q2 and q3 evidence; brief.
- markt-buurvrouw: text (no "Wat heb je nodig?", no "Ik heb twee tassen", brood en kaas, "Hij eet elke dag een appel", "bij je deur", "Heb je iets nodig?"); q2 evidence; q3 prompt, evidence and explanation; brief.
- nieuwe-dokter: text ("Het adres is hetzelfde.", signature "het team van de huisarts"); q3 replaced with "Wie gaat weg?" and options De oude dokter / De nieuwe dokter / De assistent (key A, skill person).
- menu-week: text (toetje line replaced by "Zaterdag en zondag: dicht."); brief.

## Rejected

None.

## Diversity and set notes

Six different information structures and five domains across the two sets of three (set 1: items 1-3, set 2: items 4-6). Keys A 6, B 6, C 6, no run of three equal keys. Tone: 5 ordinary, 1 light humor (markt-buurvrouw), within the rounded cap of 1. Against the A1 reading titles in the catalogue (lunch, kapper, medicijn, pas-klaar, boodschappen and others) no setting repeats; swimming lesson, library hours as lines, new colleague, new GP and canteen menu are new. Library echoes pas-klaar (batch 076) in setting only; the purpose differs.

## Media notes

Briefs now follow the round rule (scene plus "No text."). Closed-task alts reveal no key. Risks for the drawing review: keep the market free of dogs, apples and bread; the office man waves and must not hold anything; no menu board or readable prices in the canteen. Nothing was generated or approved.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Level verdicts compare only with the step-1 items and the §4.0 step 2 limits. Pictures need their own review. The listed-but-hard words above remain the likeliest source of learner trouble.
