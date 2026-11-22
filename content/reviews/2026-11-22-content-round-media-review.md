# Content round picture review, 22 November 2026

All 90 pictures for batches 101–114 were drawn from the reviewed briefs:
- 12 A1 step-2 stills (101, 102);
- 6 A2 writing picture-note panels (107);
- 7 A2 listening stills (104, 105, 114);
- 65 KNM stills (108–112).

Batch 103 rewrote words in 28 published A1 items and kept their pictures, and 106 and 113 (reading) have no pictures. The local model (Z-Image Turbo, 4-bit, 8 steps; see `docs/research/local-image-model-2026-11-05.md`) drew every picture first. A picture that failed review was drawn again with the next seed. One that failed twice went to the image API (`gpt-image-2.5-flare`, low), with the rest of its sequence when the same object or person appears in every panel.

Every picture was looked at on contact sheets and, where a detail carried the task, at full size.

Checks:
- house style: flat, no texture, no blur, and no text, letters, numerals, signs, clock faces or logos;
- no artefacts at display size;
- named people keep the traits in their brief across items;
- listening and KNM stills show the setting without revealing or favouring an answer;
- writing panels show every fact their criteria ask the learner to write about.

The reviewers' picture notes for each batch were checked one by one:
- 101: no dogs, apples or bread at the market; the office man waves and holds nothing; no menu board in the canteen.
- 102: no prominent lamp in the bike shop; no cake or flowers on the sofa.
- 107: one soft front tyre, the lock round the frame, the same bicycle in all three panels.
- 111: the empty child's room instead of a courthouse.
- 112: no swimming pool for the kindpakket.
- 108, 109 and 112: recurring people (Lina, Rachid, Daniel, Fenna, Sanne, Thijs, Kofi, Iris, Bilal, Hiba, Lieve) keep their traits.

## Redraws

Local second attempt (next seed), passed:

- `A2:knm:batch112-ombudsman-gemeente:1`: Lieve's red hair fell over her cheek and read as a beard at display size.

Drawn by the API after two local failures:

- `A2:writing:batch107-huismeester-briefje:1` panel 2: both local drawings showed a whole, lit ceiling lamp. The API drawing shows an empty socket under the shade, which criterion 2 asks the learner to report.
- `A2:writing:batch107-huismeester-briefje:1` panel 3: neither local letterbox had a loose flap. The API flap hangs open at an angle. Panel 1 (the dripping tap) stays local; no person or object repeats across the three panels.
- `A2:listening:batch105-ziekenhuis-lift:1`: both local drawings put Gloria in the wheelchair. The brief and alt have her on a bench, with the wheelchair by the desk.
- `A2:knm:batch112-aangifte-diefstal:1`: both local drawings had Mustafa holding a bicycle, although his bike is the one that was stolen. The first API drawing still put a bicycle beside him. The second shows him beside an empty rack with the open lock on the ground.
- `A2:knm:batch110-eerste-kamer:1`: the brief asks for an empty hall. The local prompt drops "no people" clauses, so both local drawings showed a meeting. The API hall is empty, with wooden benches and a long table.
- `A2:knm:batch110-ov-uitchecken:1`: both local trains were motion-blurred. The API train stands sharp beside the woman.
- `A2:writing:batch107-fiets-lenen:1` (all three panels): in the first local panel the front tyre was round and full, and the red "pump" had no hose, so it read as a post. Criterion 1 needs "put air in the tyre". The API panel connects the pump hose to the front valve. Panels 2 and 3 were drawn by the API too, so the same black bicycle appears in all three (lock and chain round a lamp post; open shed).

Final count: 81 pictures from the local model (80 first attempts, 1 second attempt) and 9 from the image API. The stolen-bike picture needed two API attempts. Rejected drawings and their manifest records were removed.

## Accepted with a note

- `batch101-markt-buurvrouw`: one stall has a few round brown vegetables that read as potatoes. No dog, and nothing that clearly shows bread or apples. The question on what Dina buys for the dog is answered only by the text.
- `batch104-bioscoop-later`: the man stands near a popcorn counter, the setting the script describes. Popcorn is a two-for-one offer, not the free item the question asks about.
- `batch105-school-app`: Sanjay, the parent, sits on a small classroom chair and looks youthful in the flat style. The teacher stands at the board.
- `batch111-schoolreisje-ouders`: the children walk in a single line, not two by two as the alt says. One adult leads them, so the picture does not favour "ouders".
- `batch111-diversiteit-les`: the circle has about nine children; the alt says five. The count is not part of the question.
- `batch111-aansprakelijk-12`: the girl with the football looks a little younger than seventeen. The question states her age, and the window is intact.
- `batch111-geweld-thuis`: the house is drawn on its own with lit windows, not as a terraced house at dusk. It is calm and shows no people.
- `batch112-afstand-nationaliteit`: the passport is a plain dark booklet, as the no-text house style requires.
- `batch112-kindpakket`: the girl has one ponytail instead of two. Hiba keeps her dark headscarf and teal coat from `afstand-nationaliteit`.
- `batch108-map-module`: Lina keeps her long black hair but not her blue scarf (she wears it in `bijstand-gemeente`).
- `batch110-holocaust-herdenking`: the candles on the wall are small at display size. The picture is quiet and shows no people, as briefed.
- `batch110-gastarbeiders-jaren-zestig`: the man has two suitcases; the alt says one.
- `batch110-regering-den-haag` and `batch110-eu-meebeslissen`: a Dutch flag on the building and an EU flag on the windowsill, as the briefs ask. Neither favours an answer.
- `batch110-twaalf-provincies`: the map shows a few unlabelled shapes, so the number of provinces cannot be counted from it.
- `batch110-rechter-beslist`: the two neighbours stand side by side in front of the fence, not on either side of it. The crossed arms still suggest the dispute.
- `batch110-twaalf-provincies` and `batch110-vrouw-directeur` both name Priya in the question, but the alts say "een vrouw" and the two pictures show different women. Neither picture claims to be Priya.

This is an editorial look by the coordinator, not a specialist accessibility or learner test.
