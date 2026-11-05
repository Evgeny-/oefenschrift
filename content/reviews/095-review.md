# Review of batch 095 (A2 speaking, 8 items)

## Meaning first (blind packet)

Blind packet hash (original bytes): 8e8fdbc3a4ed0c474b5a6f967552cade3e8c39a30450940cacc760f481d18145. Written before the full batch, starters or notes were opened.

- reiziger-weg: An elderly traveller with a suitcase asks a passer-by the way from the station to the town hall and how long it takes. Natural, practical, spoken to a stranger in the learner's own town. The extra detail (how she can recognise the town hall) fits the spoken situation. Risk: "herkennen" is a slightly abstract verb for A2. Coherent, 4.
- baliemedewerker: A desk employee greets a visitor and asks what they come for and whether they have an appointment. Everyday and realistic. The extra request "wat u hebt meegenomen" (documents) is a natural follow-up. Coherent, 5.
- ouderavond: A mother and a teacher sit at a small table with a child's drawings, a notebook and coffee; the learner names two table objects and gives an opinion on parents' evenings. Purpose of the picture and the prompt agree. Small risk: the title leaks nothing; the prompt names the event, not the objects. Coherent, 4.
- strand-familie: A family spends a Saturday on the beach; mother reads, father and son play ball. The learner names two things the family does and gives an opinion. Ordinary, clear. Coherent, 5.
- afspraak-bellen-online: One man at a kitchen table, once on the phone, once on a laptop; choose how to make a GP appointment. The pair differs only in the medium. Realistic choice. Coherent, 5.
- tweedehands-nieuw: One man with one bicycle, old versus new, in a bike shop; choose. Pair differs only in the bike's condition. Realistic. Coherent, 5.
- verjaardag-voorbereiden: Cake from the bakery, balloons at home, guests at the door; a clear birthday story with one person. Coherent, 5.
- bibliotheek-lid: A father and son get a library card, choose books, read at home; a clear weekend story. Prompt says "Het is zaterdag", picture three is an evening at home, which is compatible. Coherent, 5.

No topic jumps, stocktaking or off-page rationale. No item asks for real personal data. Tone: all ordinary.

After the full read the proposed batch changes no packet field, so the rebuilt packet hash is unchanged: meaning_first.packet_sha256 = 8e8fdbc3a4ed0c474b5a6f967552cade3e8c39a30450940cacc760f481d18145. Meaning verdict: pass for all eight.

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| reiziger-weg | pass | comparable (directions need a landmark) | Two-part cue plus landmark; hidden criteria all asked; null quote on duration. |
| baliemedewerker | pass | comparable | Desk greeting; purpose, appointment, documents; no personal data requested. |
| ouderavond | pass | comparable | "twee" in prompt; alt keeps pictured table items; male teacher. |
| strand-familie | pass (edited) | comparable | Starter 2 revealed a husband; replaced. |
| afspraak-bellen-online | pass | comparable | Pair differs only in phone versus laptop; closing sentence present. |
| tweedehands-nieuw | pass | comparable | Same bike and shop; only the condition differs. |
| verjaardag-voorbereiden | pass | comparable | One action per panel, traits verbatim. |
| bibliotheek-lid | pass | comparable | Three panels, traits verbatim; "zaterdag" fits the evening panel. |

Counts: 8 pass, 1 with a reviewer edit, 0 rejected. No item is off-level; no easier/harder flags.

## Edits (content/batches/095-proposed-starters.json)

- strand-familie starter 2: "Chantal … en haar man …" -> "Het gezin … en …" (the old frame told the learner a husband is pictured and partly completed the activity criterion).
- 095-proposed.json is byte-identical to the original; no criterion, prompt, model or brief changed.

## Rejected

None.

## Word gate, realism and exam shape

The batch check reports no vocabulary warnings; the single slug warning (ouderavond, B1 reading) is accepted. Realism: gemeente desk, GP booking, bike shop, library card, directions and birthday are all things real people say or do, with no invented off-page premise. Models are 40-43 words, no sentence over 12 words. Samples each omit exactly one criterion with one null quote. Pair and sequence briefs repeat traits verbatim. Tone: 8 ordinary, 0 light humour.

## Diversity and set notes

Eight different domains; against the existing A2 speaking titles (bushalte, gemeente bellen, kringloop, verjaardag, bibliotheekboek) the topics are new or a different task type. Do not place the two sequences in one four-picture drill with batch 026 library or birthday items.

## Media notes

Cue voices: f-older and m-young. Check at display size the used-versus-new bike, the child's drawings, trait consistency (Maaike, Mustafa and son), blank screens, no text.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. No rendered media were reviewed.

Proposed file SHA-256: 8f96942fc91d3c658a14288ef98f78c18114cd99bea8d8c09afc91fdf25dde2e
Proposed starters SHA-256: b4a9564f43fa0399e4e0ada1fc8637e6637bb60f77107e12f337fda5899dbf18
