# Review 085: A1 speaking, seven revised items (28 October 2026)

Independent AI editorial focused re-review of the replacement batch. Source `content/batches/085-original.json`, proposed copy `content/batches/085-proposed.json` (sha256 `cb29d9b9a98960512b94f26fd729fca72230da219152252ca73835af2db19902`). Starters unchanged (`085-starters.json`, sha256 `d768193ae8d1e695fd18a4212d28c99811826fd5ecb85044673d2bab5e763fa8`). Final blind packet sha256 `850639a575c07c6634bdcc6cf2f3ef0b207a7feb837e954b68f65d2f20e1d64b` (initial packet `d0eecc00...90f`). The packet file on disk was rebuilt from the proposed bytes, as in batch 080.

| id | verdict | level verdict | reason |
| --- | --- | --- | --- |
| A1:speaking:batch080-vuilniszak:1 | pass (edited brief) | fits simplified A1 | Bag by the kitchen bin is a normal chore; colour and place are drawn facts. Brief now demands a definite green. |
| A1:speaking:batch080-kat-fruitschaal:1 | pass | fits simplified A1 | The one light-humour item; criterion "in de schaal" now matches the picture. |
| A1:speaking:batch080-bakker-brood:1 | pass | fits simplified A1 | Picture shows oven, baskets, peel; "bakkerij" readable; "keuken" accepted leniently. |
| A1:speaking:batch073-stofzuigerdans:1 | pass (edited alt, criterion) | fits simplified A1 | Ordinary vacuuming; alt now names the vacuum cleaner. |
| A1:speaking:batch080-apotheek-tas:1 | pass | fits simplified A1 | No pretext; pharmacy bag is typically Dutch; criterion also accepts "winkel". |
| A1:speaking:batch079-markt-fruit:1 | pass | fits simplified A1 | Unpacked shopping explains four apples; redraw brief is sound. |
| A1:speaking:batch079-fiets-mand:1 | pass (edited criteria) | fits simplified A1 | Flowers upright in the basket; "zit/staan" now consistent. |

Counts: 7 pass, 3 of them with reviewer edits, 0 revise, 0 reject. Tone: 6 ordinary, 1 light humour (14%; rounded cap for seven items is 2).

## Edits made

- vuilniszak, `images.0.brief`: "clearly sage green" bag becomes a definite leaf green, the strongest colour of the picture, with pale cream cupboards. Sage is a grey-green, the house palette uses it for cupboards and bowls, and the bin is grey, so the colour goal needed an unmistakable green.
- stofzuigerdans, `images.0.alt`: now "Sanne maakt de vloer schoon met een stofzuiger. Ze is in de keuken." (12 words). The vacuum cleaner is a pictured fact and the criterion names it.
- stofzuigerdans, criterion 2: "Zeg waar Sanne is: in de keuken." becomes "Waar is Sanne? U zegt: in de keuken." (English half rebuilt). Removes a visible subordinate clause and matches sibling criteria.
- fiets-mand, criteria 1 and 2: "Zeg dat de fiets groen is." and "Zeg wat er in de mand zit: bloemen." become "Welke kleur heeft de fiets? U zegt: groen." and "Wat zit er in de mand? U zegt: bloemen." Same reason.

## Checks of the author's changes (all accepted)

- Prompts: all 11 to 16 words, sentences at most eight words. "Dana fietst." states only the action the picture shows and gives neither goal. Titles ("Het vuilnis", "Bij Ilse thuis", "Joost", "Sanne", "De vrouw", "Boodschappen", "Op straat") supply no goal.
- Criteria cover exactly what the prompt asks and accept natural answers (naast de prullenbak, in de keuken or op de vloer; in de schaal, tussen het fruit or op de tafel; in de bakkerij, bij de bakker or in de keuken; bij de apotheek, winkel or op straat; zak, zakje or tasje).
- Models are 8 to 11 words and natural. Samples omit exactly one goal with one null quote; the other quotes are verbatim.
- Starters ("De zak is ...", "Hij staat ...", "Ik zie een ...", "Er liggen ...", "Ik tel ...", "In de mand ...") are incomplete and give no colour, count, place, object, animal or action.
- Alts keep the pictured facts and stay within 14 words (markt-fruit is exactly 14, so no room to add the woman and the milk carton).
- Word gate: passes with the coordinator's added words `schaal` and `bakkerij`. `npm run batch:check` on the proposed file: no failures, no warnings.

## Rejected items

None.

## Diversity and set assembly

Four of seven scenes are kitchens (vuilniszak, kat-fruitschaal, stofzuigerdans, markt-fruit), and the vuilniszak woman wears the same mustard jumper as Sanne. Keep these out of one set; the coordinator may vary the jumper colour in the redraw. Goals differ in each item (colour+place, animal+place, place+object, action+place, place+object, fruit+count, colour+contents). Domain tag "werk" for stofzuigerdans rests on the brief only (nothing in the picture says work); accepted, since the learner is not asked about it.

## Media notes

- Redraw: vuilniszak (reviewer-edited brief) and markt-fruit (new brief). Both new briefs are judged sound as briefs: one bag, one bin, no other bag; exactly four separate red apples, none in the bag or her hands, plain unprinted milk carton. The redraws need a media review.
- Alt-only updates (no redraw): kat-fruitschaal, bakker-brood, stofzuigerdans, apotheek-tas, fiets-mand. The five existing pictures were opened and match the new text; briefs for these are unchanged from the image manifest.
- New prompt narration: apotheek-tas, markt-fruit, fiets-mand.
- Residual risk: apotheek-tas has no cross or sign, so the shop could read as a generic shop (criterion accepts "winkel"). The prompt "Hoeveel ziet u?" in markt-fruit is read as "how many of that fruit".

## Limitations

AI editorial review against the local A1 foundation target. It is not validated CEFR difficulty or exam equivalence, and no rendered media was approved.

## Blind meaning-first findings (written before the answer material was opened)

Blind meaning-first pass on content/batches/085-meaning-packet.json (packet_sha256 d0eecc004acaf37245c847232c870167cabd79d37dd11bff909c7b1befe6a90f). Only title, prompt, image brief and image alt were visible.

- vuilniszak: a woman in a home kitchen sets one tied sage-green bag on the floor beside a closed grey pedal bin. Ordinary and plausible (a full bag ready to go out). Task: colour and place of the bag, both pictured. Risk: "sage green" can read grey-green beside a light grey bin; the brief should ask for a clearly saturated green. Title "Het vuilnis" supplies no goal. Rating 4, ordinary.
- kat-fruitschaal: a grey cat curled asleep in the middle of a shallow bowl brimming with apples and bananas. The only deliberate oddity (animal in a surprising place), so light humour. Risk: a cat asleep on top of fruit is physically doubtful; a bowl that is not full to the brim would be more believable. Prompt asks animal and where it sleeps, both pictured. Rating 4 only if the place answer stays simple (in the bowl). light-humor.
- bakker-brood: a baker in an apron holds a tray of three loaves in a bakery with an oven in the wall and a worktable. Ordinary, plausible. Risk: oven plus worktable could read as a home kitchen; the picture needs bakery cues (shelf of loaves, flour) so that "in de bakkerij" is the evident place. Rating 4, ordinary.
- stofzuigerdans: a woman vacuums the floor of a small staff kitchen at work with an ordinary upright vacuum cleaner. No more dance; ordinary. Risk: "at work" cannot be drawn, so the place goal must accept "in de keuken" alone; the alt should keep the vacuum cleaner as pictured fact. Rating 4, ordinary.
- apotheek-tas: a woman steps out of a pharmacy door holding a small white paper bag; window shows shelves of small white boxes. Ordinary and typically Dutch (medicine in a small paper bag). Risk: with no cross or text, the shop may read as a generic shop; the goal should accept a generic correct reading or the brief should show clearer pharmacy cues. Rating 4, ordinary.
- markt-fruit: home kitchen after shopping; cloth bag with a loaf on the table, exactly four red apples in a row, woman lifts a milk carton from the bag. Coherent (unpacking shopping). Task: fruit kind and count. Risk: bread and milk are not fruit, so the question must stay on "fruit"; count of four must be unambiguous. Rating 5, ordinary.
- fiets-mand: Dana rides a leaf-green bicycle along a quiet street, a bunch of flowers upright in the front basket. Typically Dutch and plausible. Task: colour of bicycle and contents of basket, both pictured. Risk: flowers must stand in the basket (alt says "staan"). Rating 5, ordinary.

Tone so far: 1 light humour (kat-fruitschaal), 6 ordinary.
