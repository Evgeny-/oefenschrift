# Review 097: eight revised A2 listening items

## Meaning first (blind packet)

Packet hash of the author's original: e999758df227a903666a5b496e9a0b9ec2f701e21e51c39980535a344ad20c16 (final hash after repairs is recorded below). Written before the full batch, notes, questions or sources were opened.

- batch002-bakker: The baker phones Karim because the strawberries did not arrive for his Friday cake. He offers chocolate at the same price, or strawberries on Saturday, and asks for a call back before five so he knows which. Every sentence serves that decision; the box, payment and storage-tip lines are ordinary pickup information. Ordinary.
- batch005-training: A supervisor asks Karim to follow a forklift safety training. Tuesday fails (client in Utrecht), Thursday is agreed; then what to bring, lunch and timetable entry. Each reply answers the previous turn. "Leidinggevende" label vs "chef" in the situation line is a labelling question for the full pass. Ordinary.
- batch005-parkeervergunning: A municipal voicemail says one document (a copy of the car papers) is missing from the parking permit request, how to deliver it, desk hours, a two-week limit, and that payment comes later. Complete and purposeful. Ordinary.
- batch005-werkdag: A team leader gives a new hotel employee the first-day rules: staff entrance, card reader for hours, locker key at reception, canteen, breaks, how to report sick. A natural welcome monologue; the sick call before seven with no text message is the practical rule. Ordinary.
- batch005-computercursus: A radio advert for an eight-lesson beginners computer course in a library, with a pass discount and a harder evening course as the competing detail. A normal advert. Ordinary.
- batch022-kinderopvang: A childcare worker leaves a voicemail: Lina has a fever, must go home, who may fetch her, when she may return, and a request to call back. Strong cause and effect. Ordinary.
- batch023-cv-workshop: An adviser explains a two-morning CV workshop to Sabrina: dates, room, what to bring, what happens each day, cost, how to register. Coherent. Ordinary.
- batch023-verjaardagstaart: Roos orders a cake for her father's 60th at a bakery; the shop suggests the size by number of people, she adds a text, the pickup is after eleven, deposit now and the rest on Saturday. Each turn follows the last. Ordinary.

Final blind packet (rebuilt from the proposed bytes after the one speaker-label edit): 8f40e871382a54bcc535ef7bf6ad8e57254afe007aa799075ec05b20de686440. The meaning findings above are unchanged.

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| A2:listening:batch002-bakker:1 | pass | comparable | Only the q1 explanation changed ("ontbreken" gone); spoken text and keys untouched. |
| A2:listening:batch005-training:1 | pass (edited) | comparable | "chef" everywhere; speaker label "Leidinggevende" renamed "Chef" by me so the word is gone from the transcript. |
| A2:listening:batch005-parkeervergunning:1 | pass | comparable | "papieren van uw auto" replaces "kentekenbewijs"; q3 evidence verbatim. |
| A2:listening:batch005-werkdag:1 | pass | comparable | Explanation-only change. |
| A2:listening:batch005-computercursus:1 | pass | comparable | "een moeilijkere cursus" answers "te makkelijk"; q1 explanation follows. |
| A2:listening:batch022-kinderopvang:1 | pass | comparable | "kinderopvang" in title, situation, turn, q2 explanation, q3 prompt and label. |
| A2:listening:batch023-cv-workshop:1 | pass | comparable | "Dat kan tot en met vrijdag"; q3 options parallel, key not longest. |
| A2:listening:batch023-verjaardagstaart:1 | pass | comparable | Alt only; brief byte-identical. |

Counts: 7 pass, 1 pass (edited), 0 revise, 0 reject. Tone: 8 ordinary, 0 light humor.

## Edits

- batch005-training, script speaker label and transcript: "Leidinggevende" to "Chef" (five turns). Labels are not voiced; the clip is dropped on integration and regenerated.

## Rejected

None.

## Checks

- batch-check on the proposed file: no failures, no warnings. A2 gate: no failures; parkeervergunning warns for "der" and "uploaden" (within the allowance of two, no question depends on them).
- Diff of every item against its source: only hard-word replacements and their consequences. Picture briefs and imageBrief fields byte-identical. Keys, option counts and question ids unchanged.
- Questions read together: no question or option gives away another key; cv-workshop q3 options are parallel.

## Media notes

- Script audio to regenerate: training (label change only), parkeervergunning, computercursus, kinderopvang, cv-workshop.
- Question audio to regenerate: training q3, kinderopvang q3, cv-workshop q3 (options changed, prompt identical).
- No audio change: bakker, werkdag, verjaardagstaart.
- Pictures kept, briefs unchanged (training, computercursus, cv-workshop, verjaardagstaart); alts changed for training and verjaardagstaart.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Whether "de papieren van uw auto" is what every sender would say is an editorial judgment.
