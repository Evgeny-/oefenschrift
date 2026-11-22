# Review of batch 102 (A1 step 2 listening)

Reviewer: independent AI reviewer (Claude). Rubric: content/reviews/rubric.md; contract: docs/briefs/review.md.

## Meaning first (blind packet)

Packet of the author's file: `content/batches/102-meaning-packet.json`, packet_sha256 `90be0d9c34dd8c671fdcc8adbed85293d5adeb37fda686f417b9986f4cc10a79`. Written before the questions, notes or plan were opened.

- **kapper-bellen.** A father phones the hairdresser to book for his son. Each reply answers the last turn: Saturday is full, Friday at four is free, he accepts and asks the price, she gives it and adds how to pay. A real call with a clear result (a booked slot and a known price). The payment sentence is a real thing a salon says. Remaining risk: "pinpas" is a compound and probably not a first-weeks word; "afspraak" is borderline. Coherent, ordinary.
- **fiets-klaar.** A customer collects a bicycle. The seller says it is not ready until Thursday, yet the next turns talk as if the work is done ("heeft nu een nieuwe lamp", the price). The turn "Is er veel kapot?" is also odd for someone who already knows what she brought. "Dat is niet duur" is the seller praising his own price, which is not natural. The exchange mostly follows but the time frame (not ready / work done) is muddled and the last comment is forced. Needs repair of the repair status and of the price remark.
- **juf-bos.** A father asks the teacher at the school door about Friday's class trip: what the class does, what to bring, when the child is back. Every reply follows the question and he gets a practical result (he knows what to pack and when to collect). "Het wordt leuk!" and "Het is een lange dag" are natural teacher comments. Ordinary, coherent. Risk: "meenemen" is a separable verb used twice; "lunch" and "bos" are plain but should be checked against the word list.
- **nieuwe-buren.** A new neighbour introduces herself, the established neighbour asks about work and children, then she invites him for coffee on Sunday. The questions about work and children are a small stocktaking of personal facts and the jump to the invitation comes without a link ("Kom je zondag koffie drinken?" arrives straight after "twee kinderen"). The invitation is a natural close to a first meeting. Acceptable but the middle is loose. Also the roles are swapped in a confusing way: the newcomer asks the invitation of the one who has lived there. Ordinary.
- **pauze-werk.** A new colleague asks the teammate about the break, the coffee and Friday finishing time. A first-day conversation where each question is a thing a new employee would ask; the coffee answer is a light joke ("gratis, maar niet lekker"). Friday end time "vier uur" is plausible. Light humour, simple. Risk: "En de koffie?" is elliptical, and "Tot hoe laat werken we vrijdag?" jumps from coffee to the week without a link, but a new employee listing questions is real.
- **oma-jarig.** Two relatives plan grandmother's birthday on Sunday: party time, who brings a cake, who brings flowers. A real planning exchange between two people who each commit to a task. The opening "oma is zondag jarig" is something both know, but it opens the plan naturally. Ordinary, coherent. Risk: "Dan koop ik bloemen" and the cake are two gifts that could be mixed up; keep question facts separate.

Overall tone: five ordinary, one light humour (pauze-werk).

After the repairs the packet was rebuilt from the proposed bytes: packet_sha256 `146a29c9c13d88b30f485e8229d84a7e974efb54a8012defcceb4bdf2f5fc522`. The meaning pass was repeated for the changed items; the resulting findings are in the review JSON (turn links per turn). Changes of meaning: fiets-klaar now has a consistent repair story; nieuwe-buren now links work, being away and the Sunday invitation; pauze-werk has a real reason for the coffee answer.

## Verdicts

Proposed file: `content/batches/102-proposed.json`, SHA-256 `19507e10900eae006882902d6259aea4f0b739e468adea6db8cf9026a2659621`. Six items, all pass after edits; none rejected. No starters (closed tasks).

| id | verdict | level | reason |
| --- | --- | --- | --- |
| kapper-bellen | pass (edited) | comparable, a little longer than step 1 | Real booking call; "pinpas" replaced. 49 words, 6 turns. |
| fiets-klaar | pass (edited) | comparable | Repair story was contradictory (not ready, yet "heeft nu"); rewritten, self-praising price remark removed. 49 words, 7 turns. |
| juf-bos | pass (edited) | comparable | Coherent school-door exchange; "naartoe" replaced by a plain location question. 54 words, 7 turns. |
| nieuwe-buren | pass (edited) | comparable | Unconnected "ook kinderen" and "druk" removed; Sunday invitation now follows from the talk. 52 words, 6 turns. |
| pauze-werk | pass (edited) | comparable | Elliptical "En de koffie?" and "Leuk!" replaced; one light joke kept. 53 words, 7 turns. |
| oma-jarig | pass (edited) | comparable | Separable "meebrengen" replaced; "Hun moeder" distractor assumed off-page siblings, now "Oma". 48 words, 6 turns. |

Level: all six sit inside the step-2 limits (45-65 words, 5-7 turns, at most 12 words per turn and 9 per sentence) and are harder than step 1 only by length. No item is off-level.

## Edits

- **kapper-bellen**, script[5].text: "Dat kost twintig euro. U kunt met uw pinpas betalen." -> "Dat kost twintig euro. U betaalt dan bij ons.". "pinpas" is a compound a first-weeks learner will not know and the payment sentence tests nothing; plain words keep the real salon detail and the turn stays natural.
- **fiets-klaar**, script[3] and script[4], script[6]: "Aylin: Dat is goed. Is er veel kapot? / De verkoper: Nee. De fiets heeft nu een nieuwe lamp. / Het kost vijftien euro. Dat is niet duur." -> "Aylin: Dat is goed. Wat doet u met de fiets? / De verkoper: De fiets krijgt een nieuwe lamp. De oude lamp is kapot. / Dat kost vijftien euro.". The original said the bike was not ready yet but then spoke as if the work was done ("heeft nu", "Nee" to a question she could not ask about work not yet finished), and the seller praised his own price. Now the repair is consistent with the day it is ready and the price follows from it.
- **fiets-klaar**, questions[1] (prompt, evidence): "Wat is nieuw? / De fiets heeft nu een nieuwe lamp." -> "Wat krijgt de fiets? / De fiets krijgt een nieuwe lamp.". Follows the repaired turn; the options stay A/B/C with the same key.
- **fiets-klaar**, questions[2].evidence: "Het kost vijftien euro. Dat is niet duur." -> "Dat kost vijftien euro.". Follows the repaired turn.
- **juf-bos**, questions[0] (prompt, options): "Waar gaat de klas naartoe? / Naar het park. / Naar het strand. / Naar het bos." -> "Waar is de klas vrijdag? / In het park. / Op het strand. / In het bos.". "naartoe" is a function word beginners meet late and the prompt could be read as the route; the plain location question tests the same fact and the key stays C.
- **nieuwe-buren**, script[2..4]: "Ik werk in het ziekenhuis. Het werk is druk. / Mooi! Heb je ook kinderen? / Ja, twee. Kom je zondag koffie drinken?" -> "Ik werk in het ziekenhuis. Ik werk veel. / Mooi! Dan ben je niet vaak thuis. / Ja, maar zondag ben ik thuis. Kom je koffie drinken?". The question about children came from nowhere ("ook" with no earlier mention) and the invitation did not follow from it. Now work leads to being away from home, which leads to Sunday and the invitation. "druk" is also replaced by "veel".
- **nieuwe-buren**, questions[2].evidence/explanation: "Kom je zondag koffie drinken? / Saar vraagt: kom je zondag koffie drinken?" -> "Ja, maar zondag ben ik thuis. / Saar zegt: zondag ben ik thuis.". Follows the repaired turn.
- **pauze-werk**, script[3..5]: "En de koffie? / De koffie is gratis, maar niet lekker. / Leuk! Tot hoe laat werken we vrijdag?" -> "Moet ik koffie kopen? / Nee, de koffie is gratis, maar niet lekker. / Oké. Tot hoe laat werken we vrijdag?". "En de koffie?" is elliptical (what about it?) and "Leuk!" is a strange reaction to the joke. The new question gives the gratis answer a real reason and keeps the one light joke.
- **pauze-werk**, questions[0].prompt: "Hoe laat is de lunch?" -> "Hoe laat is de pauze?". Matches Timo's own question and the word in the situation; "eten" in the answer still has to be understood.
- **oma-jarig**, script[2].text: "Ik breng een grote taart mee. Ik maak hem zelf." -> "Ik neem een grote taart mee. Ik maak hem zelf.". "meebrengen" is a separable verb that is not on the word list; "meenemen" is.
- **oma-jarig**, questions[2].options.B: "Hun moeder." -> "Oma.". The source never says Nora and Mert are siblings, so "Hun moeder" assumed an off-page relationship; "Oma" is anchored (oma wordt blij) and clearly false.
- **nieuwe-buren**, questions[1].evidence: "Ik werk in het ziekenhuis. Het werk is druk." -> "Ik werk in het ziekenhuis.". Follows the repaired turn.
- **pauze-werk**, questions[1].evidence: "De koffie is gratis" -> "de koffie is gratis". Follows the repaired turn (verbatim, lower case after "Nee,").

## Rejected items

None.

## Diversity and set notes

Settings are new in A1 listening (hairdresser call, bike shop, school trip at the door, new neighbours, first-day break, grandmother's birthday); the catalogue already has "Een feest" and two "Op het werk" items, but the purposes differ. Tone: five ordinary, one light-humour (pauze-werk). Keys A/B/C six each. Names Nora, Joep, Saar, Mert, Timo, Aylin, Lena, Jonas appear nowhere in the catalogue or in batches 101-107; Mert is used twice with identical traits. The six items form two step-2 sets of three; the coordinator picks the grouping (for example kapper, fiets, juf as service and school; buren, pauze, oma as people).

## Media notes

Voice pairs: f-adult/m-young, f-young/m-shop, m-adult/f-mature, f-young/m-casual, f-young/m-young (twice); never m-adult with f-adult. Generate audio only after adoption, with --keys for exactly the new job keys. Pictures: no brief or alt reveals a key; check on the contact sheet that the bike shop shows no prominent lamp and the sofa scene shows no cake or flowers.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. The word gate is list-based; "afspraak", "ziekenhuis" and "bos" are listed and judged acceptable but are the hardest words left. Speech naturalness and pace need a listening check on the generated audio.
