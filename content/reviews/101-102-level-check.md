# Level check: batches 101 and 102 (A1 step 2)

Fresh-context check of the first six reading and six listening items of the "A1 step 2" tier (blueprint §4.0, §10, §12 step 5). Compared with ten step-1 items per part (including all batch 071/076/078 samples read in full) and five A2 reading and five A2 listening items.

## Measured load

| | Step 1 (average) | Step 2 (these 12) | A2 (sample) |
| --- | --- | --- | --- |
| Reading words | 27 | 51–57 (mean 53) | about 120–190 |
| Listening spoken words | 34 | 48–54 (mean 51) | about 110–190 |
| Facts a learner holds for the questions | 2 | 3 (one per question) | 2–3, with inference and conditions |

Step 2 roughly doubles the volume of step 1 and sits at about a third of A2. All twelve items sit at the bottom of the allowed ranges (reading 50–80, listening 45–65). Sentence length is still 3–7 words, the same as step 1. The step up is more lines and more facts, not more complex sentences.

## Verdicts

| id (batch101- / batch102-) | Verdict | Reason |
| --- | --- | --- |
| zwemles-donderdag | fits step 2 | Real letter, ten short sentences, a correction ("niet op woensdag") as natural distractor. |
| bieb-tijden | fits step 2 | Schedule plus two notices; answers need row lookup. Q3 needs gratis = nul euro (a vocabulary bridge). |
| nieuwe-collega | too close to step 1 | Fifty-two words, but a chain of "Zij ..." sentences of 3–6 words; feels like step 1 repeated. |
| markt-buurvrouw | fits step 2 | Coherent invitation with several concrete details; the closest to a real message. |
| nieuwe-dokter | fits step 2 | Formal letter; "hetzelfde", "de oude huisarts gaat weg" and a competing "woensdag in de middag" add real load. |
| menu-week | too close to step 1 | A pure list. Three independent look-ups with no sentence load at all. |
| kapper-bellen | fits step 2 | Real call with a refusal and an alternative day; the day and the time must be kept apart. |
| fiets-klaar | fits step 2 | Seven lines, three facts, a "not yet" turn. At the easy end. |
| juf-bos | fits step 2 | Parent and teacher, six facts of which three are tested; "terug" and "weer thuis" need matching. |
| nieuwe-buren | fits step 2 | Natural small talk. Q3 is inferential (see Questions). |
| pauze-werk | fits step 2 | "half één" is at the hard edge for the first months; the joke line is fine. |
| oma-jarig | fits step 2 | Sibling talk with "hem" (for taart) and "ze" as light implicit references. |

Count: 10 fits step 2, 2 too close to step 1, 0 too hard for A1. Nothing here is too hard as a whole; the risk is individual words and a few constructions (below).

## Vocabulary: words a first-months learner may not know

Even where listed in `config/a1-vocabulary.json`. English cognates and plain everyday words (collega, assistent, taart, keuken, bibliotheek, gratis, weekend, lamp, adres) are treated as easy.

| Word | Where | Suggested replacement |
| --- | --- | --- |
| dezelfde | zwemles text ("Het is dezelfde tijd: vier uur.") | "De tijd is niet nieuw" is worse; use "De tijd is vier uur." |
| gesloten | nieuwe-dokter text ("zijn wij gesloten") | "zijn wij dicht" |
| tot en met | bieb-tijden text | "Maandag, dinsdag en woensdag: ..." |
| lenen | bieb-tijden text, last line | "U kunt boeken meenemen." |
| dichtbij | markt-buurvrouw text | "De markt is niet ver" is no easier; delete the sentence. |
| heb je iets nodig | markt-buurvrouw text | "Wil je iets hebben?" |
| ander (kantoor) | nieuwe-collega text | Delete the sentence "Zij komt van een ander kantoor." |
| vol | kapper-bellen script ("Zaterdag is vol.") | "Zaterdag kan niet." |
| vrij (appointment is free) | kapper-bellen script, question-less | "Vrijdag om vier uur kan." |
| verkoper | fiets-klaar speaker label | "De man" |
| kapot | fiets-klaar script | Acceptable; "De lamp werkt niet" if Evgeny disagrees. |
| halen ("kunt u haar halen") | juf-bos script | "Dan kunt u komen." |
| terug / weer thuis | juf-bos script | Use one of the two ("We zijn om drie uur weer thuis."). |
| ziekenhuis | nieuwe-buren script, Q2 option | "bij de dokter" and "in de winkel" as options. |
| vaak | nieuwe-buren script | "Dan ben je weinig thuis" is no easier; drop the line. |
| houdt van | oma-jarig script | "Oma wil graag bloemen." |
| zelf | oma-jarig script | "Ik maak hem." is not clearer; "Ik maak de taart." |
| half één | pauze-werk script, Q1 options | Keep only if a "half" lesson is certain; otherwise "om één uur". |
| pinpas | menu-week text | "Betalen met de kaart." |
| meer dan tweemaal "dan" as adverb | several | Not a word problem; see grammar. |

## Grammar and reference notes (beyond §4.0)

- Implicit references: "Het is dezelfde tijd" (zwemles), "Het adres is hetzelfde" (nieuwe-dokter), "Ik maak hem zelf" (oma-jarig), "Dan ben je niet vaak thuis" (nieuwe-buren; "dan" as consequence), "Wil je mee?" (markt, verb omitted).
- Fixed expressions: "Wat doe je voor werk?", "Het wordt leuk!", "Oma wordt heel blij", "iets nodig hebben", "Wat leuk", "houdt van". None needs an idiom to answer, but all are more than main clauses with plain verbs.
- Adverbial "dan" at the start of a sentence (inversion: "Dan komt u morgen terug.", "Dan koop ik bloemen.") appears in six items. Plain main clauses, yet the first-months learner tends to read it as a connector.
- Separable and phrasal verbs: "meenemen", "terugkomen", "meegaan"-type use is limited and mostly on the list; check "kunt u haar halen" and "Komen jullie ook?".
- No subordinate clauses, perfect tense or modal chains beyond the list. Joined clauses are rare: only "maar" in pauze-werk and nieuwe-buren and "en" lists. The tier hardly uses the permitted en/maar/want/of joins, which is why sentences stay step-1-like.

## Questions

- All three questions are answerable from one stated sentence, except nieuwe-buren Q3 ("Wanneer is de koffie?"). Saar says "zondag ben ik thuis" and then asks "Kom je koffie drinken?"; the learner must link the two turns. Fix: let Saar say "Kom zondag koffie drinken."
- bieb-tijden Q3 needs "gratis" matched to "Nul euro". Make the key "Het is gratis." or the text "kost nul euro".
- Independence is good everywhere: no question names another question's answer. Two soft spots: pauze-werk Q2 ("Wat is gratis?") repeats Timo's "koffie" from the previous turn, so the answer is partly given; oma-jarig Q3 sets Mert against Nora, a classic who-said-what trap, though both lines are short.
- Competing facts are used with care: kapper (zaterdag/vrijdag), nieuwe-dokter (woensdag in de middag), juf-bos (drie/twee/vier). These are the real source of the step-up in listening and are worth keeping.

## Is it a real step up?

Partly. A learner who finds step 1 too simple will notice the length and the second sentence of context, and will feel the step in zwemles, markt-buurvrouw, nieuwe-dokter, kapper-bellen and juf-bos. They will not feel it in nieuwe-collega, menu-week and fiets-klaar. The sentences are as short as step 1 ("Zij komt van een ander kantoor."). The load rises mainly because there are more lines to scan.

## Recommendation

1. Build more step-2 items; the tier is worth continuing and none of the twelve is too hard. Aim for about 12 to 18 further items in two batches, mixing letters, notices, calls and everyday conversations. Do not exceed the current word list.
2. Replace the listed words above before audio and pictures are generated for the weaker items, and rewrite nieuwe-collega and menu-week (or drop them) because they do not carry the tier.
3. Move the limits slightly up so that the tier cannot sit on the floor: reading 55–85 words, listening 50–70 spoken words in six to eight turns, at most eleven words per reading sentence. Keep three questions and keep the per-turn and per-sentence caps.
4. Make the step visible in syntax, within §4.0: require at least two sentences per item joined with "en", "maar", "want" or "of", and at least one competing detail (a second day, a second time, a correction). Avoid sentence runs that start with "Zij ...".
5. Keep notices and lists to one item in three, with real sentences between the rows.

## Limitations

Editorial AI judgement; it does not validate CEFR difficulty. It is not a learner calibration, and no official exam comparison is made.
