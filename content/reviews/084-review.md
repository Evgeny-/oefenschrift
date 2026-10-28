# Review of batch 084 (A1 listening, 16 revisions of published items)

Independent AI editorial review, 28 October 2026. Reviewed source: `content/batches/084-proposed.json` (SHA-256 `155591689023d5c1acdd8385c0d123a76a8b67ba8904e634a5abbefe58c20a10`). Meaning pass done on the source-only packet of the original (hash `8bc8089f…e0a9`) before questions, keys, options or notes; repeated on the final bytes (packet hash `865e01eb…8687`, written to `content/batches/084-meaning-packet.json`). Difficulty is an authoring target, not validated.

Result: 9 pass, 7 pass (edited), 0 rejected. Keys A 11, B 10, C 11; no key three times in a row. `npm run batch:check` on the proposed file: no failures, no warnings. All sixteen IDs preserved; `replaces` lists all sixteen.

| Item | Verdict | Level | Reason |
| --- | --- | --- | --- |
| gemeente-foto | pass | within A1 target | appointment stated; pasfoto asked, return tomorrow; no extra fact |
| kind-ziek | pass (edited) | within A1 target | q2 "over de dochter" gave away q1; neutral nouns now |
| feest-zaterdag | pass (edited) | within A1 target | key "Bloemen." was the only option without "Een"; options parallel |
| bus-station | pass (edited) | within A1 target | key was the only option with "haar"; options plain |
| hond-banaan (light humor) | pass | within A1 target | feeding facts plausible; banana is a closing treat tip |
| eieren-taart (light humor) | pass (edited) | within A1 target | new brief put her alone in her kitchen against "bij de deur van Jamal"; redrawn at his door |
| tas-kopen | pass | within A1 target | seller names the colour; price in another turn |
| potlood-lenen | pass (edited) | within A1 target | q2 "straks" hinted at q1; prompt reworded |
| grote-hoed | pass | within A1 target | "Wat mag het zijn?" natural; order, price, payment |
| bloem-beker | pass | within A1 target | drinks then food; flower remark tied to the pictured flower |
| dienst-ruilen | pass (edited) | within A1 target | title "Zaterdag werken" answered q1; neutral title |
| buren-sleutel | pass | within A1 target | key and plants linked; "bewaren" fits |
| jas-passen | pass | within A1 target | size and colour apart; new brief shows no green coat |
| apotheek-pil | pass (edited) | within A1 target | q2 "de pil" revealed q1's one pill; now "het medicijn" |
| melk-zoeken | pass | within A1 target | two shopper questions; label "medewerker" fits |
| doos-oren | pass | within A1 target | closed lid, box not held out; fits the dialogue |

## Edits (field to new text, why)

- kind-ziek q2 prompt: "Wat vraagt de juf?" and options "De klas. / Het adres. / De naam." The old "over de dochter" answered q1 (Wie is er ziek?), and "Haar" would have excluded the son option, the same leak batch 078 had repaired.
- feest-zaterdag q2 options: "Taart. / Boeken. / Bloemen." The key was the only option without "Een".
- bus-station q2 option C: "Met een pinpas." The key was the only option with a possessive.
- potlood-lenen q2 prompt: "Waar moet Aya het potlood leggen?" "straks" hinted at a later return and weakened q1.
- dienst-ruilen title: "Op het werk". The visible title "Zaterdag werken" was the key of q1.
- apotheek-pil q2 prompt: "Wanneer neemt Kim het medicijn?" The singular "de pil" revealed q1's key (one pill).
- eieren-taart picture brief and alt: neighbour with an empty mixing bowl in a corridor outside a flat door, Jamal (short black hair, mustard yellow sweater, as in jas-passen) in his open doorway, both whole figures, no eggs, cake, tin, flour or kitchen. Alt: "Een buurvrouw met een kom praat met een jonge man bij zijn deur." The situation says she stands at Jamal's door and the dialogue is addressed to him; the author's brief drew her alone in her own kitchen.

## Rejected

None.

## Meaning pass: what the blind reading found

Repaired: eieren-taart (picture against situation). Accepted with the risk recorded in the JSON: hond-banaan (Max reaching the kitchen implies a key, normal in pet-sitting), jas-passen (the dialogue ends on a request for a coat the picture does not show; no green is drawn on purpose), melk-zoeken (a checkout question after entering is slightly odd but plausible), bloem-beker (the flower remark sits in the order turn, motivated by the pictured flower), gemeente-foto (a real clerk might ask for a new appointment; return the next day is plausible), bus-station (the driver's line simplifies contactless check-in). Author doubts on gemeente-foto, potlood-lenen, bus-station, bloem-beker and kind-ziek are settled as above. "Geen dank" in dienst-ruilen is slightly stiff but idiomatic; left unchanged to avoid new audio.

## Diversity, tone and assembly

Sixteen distinct settings and purposes. Tone: 14 ordinary, 2 light humor (hond-banaan, eieren-taart): 12.5 percent against the 15 percent target, inside the rounding allowance. The coordinator must add these to the combined listening count without counting the replaced items twice. Drawn people repeat only as the same person (Ahmed, Jamal); Kees appears in two items with no shared picture.

## Media notes

Voice roles and speaker order are unchanged from the replaced items, every role exists in `config/voices.json`, and each conversation uses two different roles. Thirteen unchanged pictures were opened and checked against the new scripts: none shows a keyed fact (pasfoto, flowers, pinpas, kitchen, key, post, fiets, check). Redraw three: eieren-taart (edited brief), jas-passen (confirm that no coat reads green; the house palette uses sage green) and doos-oren (lid closed, box not held out). No audio job is added to the author's list: every question edited here was already on the new-narration list, and the dienst-ruilen title is not spoken. Generate audio with `--keys` for exactly the author's jobs, from the adopted bytes. `content/batches/084-meaning-packet.json` now holds the packet rebuilt from the proposed file.

## Limitations

AI editorial judgment only. No teacher review, learner pilot, validated CEFR level, official approval or exam equivalence. Rendered pictures and audio are not reviewed here. Statements about Dutch practice (contactless bus payment, a gemeente return visit, pharmacy instructions) are plausibility judgments, not official procedure.
