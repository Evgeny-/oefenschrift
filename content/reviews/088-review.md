# Review of batch 088 (A2 reading, 12 items)

## Meaning first (blind packet)

Blind packet hash (original bytes): 406fb39a16771a71bd0a317324c2c41cdb589f2bb6a3e7d1fa1ffa8f4613be42. Written before opening questions, keys, notes or the plan assignment. Verdict on the source texts: pass, with the risks named per item.

1. hardloopwedstrijd: a newspaper item on a city run. The organiser-side facts (start, children's run, closed streets 9-15, buses 4 and 7 diverted, stop Markt closed all day, residents may drive out until nine) all serve one practical purpose: how to move around the town on that Sunday. Coherent. Risk: many numbers and times; fine for a reading text.
2. school-verbouwing: the school tells the neighbourhood why the building is replaced, where the children go for a year, how the school bus works and when the parents' evening is. Each paragraph answers a parent's next question. Coherent. Risk: "deze zomer" versus the school year 2027-2028 depends on the article being from spring 2027; the parents' evening in March supports that.
3. feestdagen-huisarts: a practice announces opening hours around the holidays, what to do when it is closed (huisartsenpost, 112) and when to order repeat medicine. Coherent and useful. Risk: the huisartsenpost number must stay invented.
4. oudergesprekken: a school schedule for parent talks with how to pick a time, what to do when the day does not fit, group 8 and an interpreter. Coherent. Risk: the table mixes two time blocks for one group.
5. wijkagent: a police leaflet introducing the neighbourhood officer, what to come for, where the walk-in hours are, what is not handled there and when to call 112. Coherent. Risk: the exact police procedures for aangifte and the 112 text must be correct.
6. kinderboerderij: a leaflet of a city farm with opening times by season, feeding rules, dog rule and children's parties. Coherent. Risk: leaflet is long; the party paragraph is a separate service but belongs in a farm leaflet.
7. camping-regels: house rules of a campsite, each rule tied to a concrete behaviour; the car rule has an exception for arrival and departure. Coherent. Risk: the late-departure rule and reception hours interact.
8. taaltoets-dag: rules for a placement test day at a language school, in order of the morning. Coherent. Risk: "Identiteitskaart" and "uitslag" are hard-ish words.
9. oppas-gezocht: a parent seeks an evening sitter for two named evenings; tasks, requirements, pay and how to react follow naturally from why the parents are away. Coherent. Risk: the mobile number looks real.
10. chauffeur-gezocht: a flower wholesaler advertises a driving job; early start and the finish at 13.00 fit the "call after 14.00" line. Coherent. Risk: "groothandel" is explained by the next sentence.
11. water-onderbreking: a letter to residents of numbered houses about a planned water outage with advice before and after. Coherent. Risk: none beyond length.
12. cadeau-collega: a colleague organises a surprise gift and cake for a 50th birthday and excludes the birthday person from the recipient list. Coherent; the one lightly humorous item. Risk: "Wij horen hem elke ochtend" has an unclear referent (the bike or Patrick) and the joke rests on it.

Repeat after repairs: the edited passages (school building sentences, aangifte sentence, oppas phone number, "schoon", the bike sentences, kinderboerderij title and situation) were re-read in the rebuilt packet; all stay coherent and no unsupported assumption appears. Proposed packet hash: 798907fb7c27bc0cb4fba3bc4bd2ee42dd97aa9394d5681687ffee2811950900 (recorded as meaning_first.packet_sha256).

## Result

Batch verdict: pass. 12 items, 11 pass (edited), 1 pass unchanged (taaltoets-dag), 0 rejected. Proposed file: content/batches/088-proposed.json, SHA-256 15f9ac9955b405431dc5fc6d2e6bd1e3ad9c42cb1e4659087fc1546531c060a7 (see the JSON for the recorded hash). Batch check: no failures. Keys A7 B8 C8 D7; options 16 three-option, 14 four-option.

| id | verdict | level | reason |
| --- | --- | --- | --- |
| hardloopwedstrijd | pass (edited) | comparable, upper end | q1 prompt now paraphrases the text |
| school-verbouwing | pass (edited) | comparable | purpose key was the headline; "gaat weg" clarified |
| feestdagen-huisarts | pass (edited) | comparable | q3 prompt and options made parallel |
| oudergesprekken | pass (edited) | comparable, upper end | q2 prompt asks for another day, so "school kiest" is clearly wrong |
| wijkagent | pass (edited) | comparable | aangifte can also be made by phone |
| kinderboerderij | pass (edited) | comparable to slightly harder | q1 had an odd-polarity key; title and situation use "kinderboerderij" |
| camping-regels | pass (edited) | comparable | q2 key was the only two-step option |
| taaltoets-dag | pass | comparable | no change needed |
| oppas-gezocht | pass (edited) | comparable | q1 odd-polarity key; invented but real-looking mobile number |
| chauffeur-gezocht | pass (edited) | comparable | q1 odd-polarity key |
| water-onderbreking | pass (edited) | comparable | "helder" replaced; q2 prompt no longer echoes the letter |
| cadeau-collega | pass (edited) | comparable | "hem" referent unclear; q2 key was the only date absent from the text |

## Edits

All 27 field edits with before, after and reason are in content/reviews/088-review.json. Main ones: school q3 key paraphrased and reduced to three options; kinderboerderij q1 rebuilt as a days-and-hours question with four options; polarity fixes in oppas q1 and chauffeur q1; camping q2 options reshaped; cadeau bike sentences and q2 fourth date; "schoon" for "helder"; fictitious phone number 06 12 34 56 78 in oppas.

## Author doubts resolved

- D keys in four-option questions: the batch had A8 B8 C8 D6; after the edits A7 B8 C8 D7. Within the four-option questions the keys are now spread over A, B, C and D.
- Easy school purpose question: the key no longer repeats the headline; it paraphrases the second paragraph.
- "helder": too hard; replaced by "schoon".
- Vague city-farm title: now "Een kinderboerderij in het park".

## Rejected

None.

## Diversity and set notes

Twelve distinct purposes. Overlaps with the catalogue are thematic only (flower job, GP hours, police hours) and acceptable. Tables follow the "A – B – C" text-line format of the existing rooster items. Lengths 155-209 words against an existing A2 reading average of 154 (maximum 224); oudergesprekken, school-verbouwing and kinderboerderij sit at the upper end. Persona questions in all twelve texts, purpose questions in five. One light-humour text (cadeau-collega). No media is needed for reading.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Invented organisation names, numbers and addresses were judged for plausibility; only versebloem.nl was checked (DNS, not registered). The huisartsenpost number is invented and must stay so. The coordinator may web-search the remaining invented names (Taalschool De Zinnen, Camping De Zandhoek, Kinderboerderij De Gele Haan, Verse Bloem, Waterbedrijf Westerhout).
