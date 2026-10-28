# Review of batch 083 (A1 reading, 11 replacement items)

Independent AI editorial review of `content/batches/083-original.json`. Proposed file: `content/batches/083-proposed.json`, sha256 `9fbe50b9abf1ef4a0487e5fca9eb6b2514faf775ab157437c05b784c848ea39f`. Meaning-first packet hash of the proposed source: `cfc5f4c7c7e3d029837793cc61c55d3ae3a2aff90de483f5f672b2f6214109a1` (the author's packet hash for the original was `1f6bc358...`). `npm run batch:check` on the proposed file: no failures, no warnings. Keys A 7, B 8, C 7. Blind findings were written from the packet first; all eleven items replace published IDs (`replaces` lists them).

| Item | Verdict | Level | Reason |
| --- | --- | --- | --- |
| vuilnis-dinsdag | pass | within A1 target | Realistic gemeente notice; old day named for a purpose |
| pas-klaar | pass | within A1 target | Library pass pick-up with ID; picture shows only a blank card |
| medicijn | pass | within A1 target | Normal pharmacy stock message; no contradiction |
| beer-dokter | pass | within A1 target | Ordinary huisarts reminder |
| nieuw-paspoort | pass | within A1 target | Collection by appointment, old passport handed in |
| geen-water | pass (edited) | within A1 target | Unnatural reason sentence removed |
| voetbal-zoon | pass (edited) | within A1 target | q2 prompt mirrors the evidence verb |
| koffer-les | pass (edited) | within A1 target | Teacher renamed (Tom reused, Tom/Tim clash) |
| ander-lokaal | pass | within A1 target | Same-day room change from the teacher |
| kip-tuin | pass | within A1 target | Light humour (one item); coherent neighbour note |
| winkel-sok | pass (edited) | within A1 target | 'nu in de winkel' vs 'vrijdag ophalen' contradiction fixed |

## Edits

- geen-water, text: removed "Er is dan werk aan het water." (not natural Dutch; the notice works without a reason). 29 words remain.
- voetbal-zoon, q2 prompt: "Waar is het voetbal?" becomes "Waar speelt haar zoon voetbal?" (mirrors "Hij speelt bij de club.").
- koffer-les, situation, text, q2 prompt and both explanations: Tom becomes Erik. Tom already signs A1:reading:batch069-lesboek (names are not reused across A1 batches) and Tom/Tim as two teachers in one batch invites confusion.
- winkel-sok, title "Uw nieuwe jas"; text "Uw nieuwe jas is vrijdag in de winkel. U kunt de jas ophalen."; q1 prompt "Wanneer is de jas in de winkel?", evidence and explanation follow. The old "nu in de winkel" plus "vrijdag ophalen" asked why the customer could not collect it today. Key stays A.

## Rejected

None.

## Checks and doubts from the author's notes

- Pictures: the eight kept pictures (pas-klaar, medicijn, beer-dokter, nieuw-paspoort, geen-water, ander-lokaal, kip-tuin, winkel-sok) were opened. All fit the new texts and show no key. pas-klaar's blank card shows no ID, so it favours neither paspoort nor pinpas. The new briefs for vuilnis-dinsdag, voetbal-zoon and koffer-les are sound as designs (no day, time, place or goal shown).
- Winkel De Jas: two web searches (28 October 2026) found no shop with that name. It stays.
- pas-klaar versus nieuw-paspoort (both about bringing a paspoort): kept; they sit in different sets and the second asks for the oude paspoort.
- Two library items: pas-klaar and koffer-les test different facts and sit in different sets.
- koffer-les "bij de deur": reads as the school door; neither question depends on it.
- voetbal-zoon q1 changed to time: agreed, the boy in the picture would show "zoon".

## Diversity and set assembly (coordinator)

- Four messages are "your thing is ready, collect it" (pas, medicijn, paspoort, jas). pas-klaar and medicijn are in the same practice set (with bus-tram) and both ask about opening hours or collection at an institution. Move one: for instance swap medicijn with geen-water, keys stay unchanged.
- Tone: 10 ordinary, 1 light-humour (kip-tuin). Check the combined count of the reading bank (target about 4-5 of 30).

## Media notes

Draw vuilnis-dinsdag, voetbal-zoon and koffer-les from the new briefs and check the rendered images against both questions. After adoption, regenerate `083-meaning-packet.json` with `npm run batch:review-source` (not done here to leave the author's file untouched).

## Limitations

Independent AI editorial judgment only; no teacher review, learner pilot, validated CEFR difficulty or exam-equivalence claim.
