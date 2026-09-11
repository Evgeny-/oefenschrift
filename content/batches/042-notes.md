# Batch 042 author notes

Seven authorised replacements for the older A2 listening records in `tmp/standardization/042-source.json`. Exact exercise IDs and titles survive. Every stimulus and question is rewritten to the current record contract. Target level remains unvalidated; these are original practice scenarios.

## Source and scope

Read `AGENTS.md`, `content/blueprint.md`, `docs/briefs/author.md`, `content/reviews/rubric.md`, `docs/research/content-workflow.md`, the A2 listening paragraph in `docs/research/exam-blueprints-2026-09-10.md`, `config/voices.json`, `config/illustration.json`, batch 005 and the current A2 listening catalogue titles. The locally recorded official-format research supplies only structure: 30–90 second fragments, two or three questions, mixed three/four options and occasional stills. No official exercise language is copied.

All opening hours, appointments, travel arrangements and service instructions describe fictional local events. No general medical or transport rule is asserted. Organisation names from the old records are removed: the school, bakery and swimming pool are unnamed, so there are no invented organisation names to search. Zwolle and Amersfoort identify destinations within a fictional announcement, not a verified live journey.

## Language and diversity

Spoken-word counts exclude speaker labels. Seconds use 2.5 words per second and are estimates before generation. The dialogue will also have pauses between turns.

| Preserved ID suffix | Type | Domain | Words | Mean sentence | Longest sentence | Estimated seconds | Turns |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| tandarts:1 | voicemail | gezondheid | 92 | 7.7 | 10 | 37 | 1 |
| buurthuis:1 | gesprek | opleiding | 107 | 6.3 | 11 | 43 | 8 |
| batch001-markt:1 | omroep | winkels-diensten | 87 | 8.7 | 11 | 35 | 1 |
| batch001-schoolreis:1 | voicemail | opleiding | 92 | 7.7 | 9 | 37 | 1 |
| batch002-trein:1 | omroep | vervoer | 89 | 7.4 | 10 | 36 | 1 |
| batch002-bakker:1 | voicemail | winkels-diensten | 94 | 7.8 | 14 | 38 | 1 |
| batch002-zwembad:1 | uitleg | vrije-tijd-familie | 94 | 8.5 | 11 | 38 | 1 |

The scripts use everyday vocabulary and short main clauses, with occasional `als`, `of` in an indirect question and a simple relative-free construction. There are no unexplained technical terms. `Identiteitsbewijs`, `onderhoud`, `perron` and `balie` are everyday service vocabulary; the action or surrounding setting helps comprehension. A separate reviewer should judge whether any term needs further support.

| Replacement | Nearby catalogue setting | Distinct task focus within the authorised rewrite |
| --- | --- | --- |
| Dentist | Blood result; pharmacy | Appointment arrival calculation and document preparation |
| Language lesson | Computer course; test questions | Temporary room change and next-day materials |
| Market | Supermarket closes early | Weather-related closure plus changed bus boarding location |
| School trip | School study day; childcare voicemail | Group-specific arrival time and packed food |
| Station | Another platform; bus announcement | Platform allocation and finding the accessible route |
| Bakery | Birthday cake order | Unavailable ingredient and requested callback |
| Pool | Sports club notices | Locker payment object and facility closure |

Existing settings are intentionally retained under the migration brief. This batch introduces no new duplicate catalogue IDs. Scene overlap with later catalogue material should be considered when composing future forms; it does not justify changing these preserved situations.

## Closed-question audit

Evidence is stored verbatim in every question and mechanically checked against its own transcript. Keys are A=4, B=4, C=3, D=3. Sequence: A B C D B A D C A D B C A B. No letter repeats three times. There are nine three-option and five four-option questions.

- **tandarts q1, A:** eleven minus ten minutes means ten to eleven. B uses the dentist's appointment time instead of the requested arrival; C uses the practice opening time.
- **tandarts q2, B:** the assistant explicitly requests identification. A ignores that the old form is already stored; C turns an address check into a request for a letter. The address is mentioned, but the document requested for the visit is identification.
- **buurthuis q1, C:** the lesson is in room three upstairs. A selects the room being painted; B selects the downstairs place for coffee before class.
- **buurthuis q2, D:** the teacher asks Roos to bring her notebook. A brings next week's book too early; B ignores that the teacher supplies a pen; C changes drinking coffee there into bringing it.
- **markt q1, B:** today's market closes at three. A uses the ordinary closing time; C uses the bus departure time.
- **markt q2, A:** boarding is at the side entrance. B selects the entrance occupied by trucks; C confuses a sheltered waiting place with the stop.
- **schoolreis q1, D:** group six must arrive at eight. A selects bus departure; B selects the other group's arrival; C selects return from the trip.
- **schoolreis q2, C:** parents must supply bread and drink. A ignores that the school pays; B ignores the permission to leave the raincoat at home.
- **trein q1, A:** the departure platform is seven. B selects the broken train's platform; C mistakes the hour in the departure time for a platform number.
- **trein q2, D:** the lift is beside the bookshop. A gives the stairs' location; B gives the employee's location; C gives the broken train's location.
- **bakker q1, B:** strawberries have not arrived. A ignores that the box is ready; C chooses an available alternative ingredient; D selects the tips supplied at collection.
- **bakker q2, C:** the baker asks for a call before closing. A selects later collection; B selects payment at collection. Neither is the action requested before five.
- **zwembad q1, A:** a one-euro coin operates the locker. B uses the bank card needed at the counter; C uses the admission ticket.
- **zwembad q2, B:** the warm pool is closed for maintenance. A and C are explicitly open; D is part of the route visitors are instructed to use.

Options follow similar forms and lengths. The keyed option does not systematically carry more detail. Incorrect options borrow nearby objects, times, locations or actions; they are not intended as claims about real services.

## Voices and still

All scripts reference configured Netherlands Dutch voice roles. The classroom conversation has eight turns and two distinct roles, `f-young` and `m-adult`. Voicemails and announcements have a single speaker. The pool explanation uses `presenter`. Numbers and times are written as spoken words. `text` is built mechanically from `speaker + ': ' + text` joined with newlines.

The classroom still uses `kind: drawing` under the newer house-style rule in blueprint section 7. Its brief copies Roos's cast traits exactly and supplies no answer objects, clocks or floor clues. The transcript's note identifies the audio-and-still substitution for video. No media, duration, peaks, question audio or revision fields are authored.

## Reviewer attention

Please read all final items independently and assess the synthetic timing estimates. The checker's persona-scenario and purpose warnings apply its broad A2 heuristic to listening, although blueprint section 4.2 does not mandate those reading-specific quotas. The current questions prioritise concrete audible details. The train number distractor and the dentist address-letter distractor use nearby spoken details transformed into plausible mistakes; please judge their usefulness. The market has a waiting area distinct from its bus stop, stated explicitly in the script.

## Final checker output

```text
Checked 7 items, 14 questions. Keys: {"A":4,"B":4,"C":3,"D":3}. Options: {"3":9,"4":5}.
  info  7 of 7 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
  warn  0 persona-scenario prompts for 7 items (A2 asks at least one per text)
  warn  0 purpose questions for 7 items (A2 asks one per two or three texts)
2 warning(s), no failures.
```

Only `042-original.json` and these notes are authored. Separate review, hash verification, adoption and integration remain with the coordinator. Actual duration and media quality remain untested until reviewed media production.
