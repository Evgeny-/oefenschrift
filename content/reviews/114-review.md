# Review of batch 114 (A2 listening, 12 items)

Reviewer: independent AI reviewer (Claude). Rubric: content/reviews/rubric.md, docs/briefs/review.md.

## Meaning first (blind packet)

Packet hash (original bytes): cc70f74e4574d4f4541fb1948f5c37653f4eee598877dd8786b0d9fac00f203d. Written before the questions, keys, notes or assignment were opened.

1. proeftijd-gesprek (Floor, Pavel): a kitchen manager confirms a one-year contract, pay, holidays, the signing date and papers. Every reply answers the previous question (contract, pay, when to sign, what to bring). Coherent, ordinary. 1 April 2027 is a Thursday, consistent. Risk: the title "Een contract voor een jaar" names a tested fact. Pay (14.20 then 14.80) and 20 days are competing details, said plainly.
2. sleutel-kwijt (Naoual, landlord): lost keys, price of one or a second key, pickup days, extra cost of a lock change if the key ring shows the street. Purposeful and realistic. Load is high (15, 10, 95 euro; Monday and Thursday; 9 to 12). The unlisted risk words are sleutelhanger and slot. The line "als u uw sleutels vóór donderdag terugvindt, hoeft dat niet" is clear. The reserve key from a neighbour is plausible but a late addition.
3. schap-prijs (Ismail, cashier): shelf label 1.99 against bill 2.49, three tins, 0.50 per tin, 1.50 back. The arithmetic is right and shops really do honour the shelf price. The turn "Dus de bon is goed, maar het kaartje was oud?" is a mild recap of the cashier's own words but works as a check. Three reasoning steps (price difference, number of tins, total). Last turn asks to remove the card and the reply says replace: tiny mismatch, harmless.
4. fiets-weggehaald (Lenka, gemeente): bike taken away after an orange card two weeks earlier, depot, opening days, what to bring, cost, sale after three months. Realistic and purposeful. "Na drie maanden verkopen wij de fietsen" answers "En als ik niet kom?". Pronouns and places are clear.
5. stage-bezoek (docent voicemail to Sinan): visit moved from Thursday 10:00 to Friday 12 March 10:30; bring the logbook; call the school if ill. Realistic. Problem: "Je werkkleding heb je al aan" is not natural in a voicemail (the speaker cannot see what he wears). It reads as an answer-option decoy. Revise.
6. sollicitatie-terugbellen (Femi, Adriana): the shop job is taken, but a weekend till job is offered, with a start date and a deadline to call back. Coherent. Small oddity: "Vraag naar Femi" when Femi is the speaker and gives "mijn nummer". The title "Een andere baan" tells the premise only. Femi is mostly a man's name, so f-young may surprise some learners.
7. uitnodiging-etentje (Lenka to Sinan): birthday dinner moved to Saturday 20 March (a Saturday). Light humour: the father bakes the cake but is no baker. The joke rests on the idiom "sterke maag", which needs cultural knowledge, and "kom met honger" conflicts with it. Also: a home-baked cake at a restaurant dinner needs an explanation. The source has many competing details (18:15, 18:30, 19:00; tram, car, bike; Wednesday); the transport and times are said in a list-like way.
8. heftruck-veiligheid (magazijn announcement): new rules for the middle road, the yellow path and the yellow jacket, plus lunch times for hal A and B. Practical purpose. The rules mix "heftrucks" and "wagens", which can confuse two referents. The lunch times are an add-on and are unrelated to safety, though a morning briefing really does contain this. "Een gele jas" is odd; a safety vest is meant.
9. pontje (ferry announcement): hours, last departures from each side, no cars this week, price, card only. Consistent: hours 7:30 to 18:30 match the last departure from the village at 18:30 and from the city at 18:15. A cyclist on the city side is the right listener. The title and situation mix "pontje" and "bootje" in the text; keep to bootje.
10. verhuizen-uitleg (landlord employee to Ismail): notice, empty and clean rooms, keys, meter readings, photos, deposit back. A realistic checklist. The claim "Dat duurt zes weken" is a national-rule risk (the law sets a shorter period); needs an official check. "Het geld dat u aan het begin hebt betaald" is a fine plain description of a deposit.
11. koor-nieuw-lid (choir leader to new members): times, coffee break, first month free then 8 euro, no sheet music needed, open evening in March, concert in June. Coherent welcome. Mixing "jullie" and "u" is natural for a group. Competing months (March against June) are fine.
12. zomerschool (radio item, Pavel's son is nine): free summer school from Monday 12 July to Friday 23 July 2027 (correct weekdays), mornings, lunch, ages 6 to 12, 60 places, register at the child's own school by 1 June. Coherent and relevant for a parent. The sentence "Geef uw kind op bij de eigen school, niet bij de gemeente" is a plain correction. Dense but one speaker for about 110 words.

Tone: ordinary except item 7 (light humour, planned).

Repeat of the meaning pass on the proposed source: packet hash 682b022e46b4ba95182251d4406895267bf3e9eb0407fc34637bae23136b2cab. Changed sources re-read as speech (items 2, 4, 5, 6, 7, 8, 10, 11, 12 and the title of item 1): the neighbour line, the plain place for the bikes, the voicemail clothing line, the new cake joke, one name for the heftruck, the 14-day deposit sentence, the plain singing welcome and the lunch until one o'clock all follow from the previous turn or sentence. No unsupported assumption remains.

## Verdicts

Proposed file: content/batches/114-proposed.json, SHA-256 0f34cc261bd519a2f329bf93dc2646f9c2b63449ca67cd3db05a63114237bd35. Gate self-check prints []. Batch check: no failures, 8 compound warnings. Result: 12 items pass after edits (0 reject).

| id | verdict | level | reason |
| --- | --- | --- | --- |
| proeftijd-gesprek | pass (edited) | comparable | Title gave away q1; q3 options put "kopie" on the wrong paper. |
| sleutel-kwijt | pass (edited) | harder | Three prices, two days and a condition (157 words); "reservesleutel" replaced by plain words. Keep, but not as a first item in a set. |
| schap-prijs | pass (edited) | comparable | q1 prompt repeated the key of q2. Three reasoning steps are each said in one short sentence, and the refund total is stated, so no sum is needed. |
| fiets-weggehaald | pass (edited) | comparable | "Depot" removed; q3 had a second defensible answer (until Thursday); q2 key was the longest. |
| stage-bezoek | pass (edited) | comparable | Title hinted at the changed day; "werkkleding ... al aan" was unnatural in a voicemail. |
| sollicitatie-terugbellen | pass (edited) | comparable | Title hinted at the second job; q2 prompt gave away q1; "Vraag naar Femi" contradicted the speaker. |
| uitnodiging-etentje | pass (edited) | comparable | The "sterke maag" joke needed an idiom and contradicted itself; replaced by a plain cake joke. Light humour. |
| heftruck-veiligheid | pass (edited) | comparable | "wagens" and "heftrucks" named one vehicle; "middenweg" is not a normal word; lunch times now follow from the announced change. |
| pontje | pass (edited) | comparable | q2 prompt "Wie" with answer "fietsen"; now "Wat mag mee". Key of q1 is the longest by four characters (forced by the clock phrase). |
| verhuizen-uitleg | pass (edited) | comparable | National-rule error (six weeks against the 14 days of rijksoverheid.nl); subset key repaired; "uw huis opzeggen" replaced by "de huur opzeggen". |
| koor-nieuw-lid | pass (edited) | easier | Unanchored "Tien euro"; "koor" replaced by plain words. |
| zomerschool | pass (edited) | comparable | q1 options used "één uur" that was never said; the script now says the lunch lasts until one o'clock. |

## Coordinator's doubts resolved

- Item 11 q2, "Tien euro": removed. Options are now "Niets, het is gratis" (first month), "Acht euro per maand", "Acht euro voor de eerste maand"; all three are anchored.
- Item 10 q2, subset key: the old key was part of the truth and the fietsenschuur key could be misread as "sleutel van zijn fiets". Options now differ only in which keys come back.
- Item 3, three reasoning steps: acceptable. Each step (offer ended, label stayed, shop gives the low price) is said in one short sentence and the total refund is stated, so the listener finds the information and does not calculate. The q1 and q2 prompts no longer share words.
- Pavel and Sinan reused: acceptable. Each name occurs in two items in different situations (Pavel as kitchen worker and father, Sinan as trainee and friend); no picture shows them.
- Fourth-option share (6%): acceptable. Every option is now anchored in the script; the two four-option questions are item 3 q3 and item 5 q1.
- Item 12 has no question on age: acceptable; the age range is in the script and the situation.

## Edits

38 field edits, all listed with before, after and reason in content/reviews/114-review.json. The main ones: item 1 title and q3 options; item 2 neighbour line; item 3 q1 prompt; item 4 place sentence, q2 options, q3 prompt and options; item 5 title and clothing line; item 6 title, closing line and q2 prompt; item 7 cake joke; item 8 vehicle names, road name, lunch link; item 9 q2 prompt; item 10 deposit period, notice phrase, q1 to q3; item 11 welcome sentence and q2; item 12 lunch time.

## Rejected

None.

## Diversity and set notes

Same type and part as the catalogue: items 5 and 6 resemble batch105-dienst-eerder in structure (change, what to bring, what to do if you cannot come); keep items 5 and 6 and that item out of one practice set. Items 1 and 6 are both job news; items 3 and 12 both concern cost. Types and domains as planned (gesprek 4, voicemail 3, omroep 2, uitleg 2, nieuws 1). Tone: 11 ordinary, 1 light humour.

## Media notes

Voices: two different roles in every conversation (m-young with f-adult), no m-adult with f-adult; one voice for the eight single-speaker items. Femi is spoken by f-young. Numbers, times, prices and phone numbers are in words; no fillers. Still: item 3 only, supermarket checkout with three tins and a blank receipt; alt and brief reveal no price. Generate audio with --keys for the twelve new clips only.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Level verdicts compare length and sentence statistics with existing items, not learner data. The deposit rule was read on rijksoverheid.nl on 22 November 2026; the one-month notice rule was confirmed through search results, not by reading the full page. No organisation name needed a web search.
