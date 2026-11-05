# Review of batch 094 (A2 speaking, 8 items)

## Meaning first (blind packet)

Packet hash (original bytes): d9cf253986e6835f5771e5942732eb70eac66517e1d56fbe92812407179c3b29. Written before opening the full batch, starters or notes.

- fietsenmaker-vraag: a customer brings a broken bike to a repair shop; the repairer asks what is wrong and when it is needed; the learner is also told to ask the price. Ordinary and concrete (people really ask this at a counter). The cue is spoken by the repairer standing next to the bike, which fits. Risk: "Hij stelt u een vraag" then "Vraag ook" is the video-answer form; fine.
- docent-vakantie: after the last lesson before summer the teacher asks where the learner goes and what they will do; extra: with whom. Natural small talk with a teacher. Risk: a learner who stays home must still invent a trip; the task is spoken practice and "naartoe" assumes a trip. Ask the full pass to settle.
- fysiotherapie: a woman with a sore shoulder does an exercise on a ball with a weight, guided by a physiotherapist; learner names two things used and gives an opinion on daily exercise. Coherent. The two things (ball, weight) are clearly pictured. Ordinary.
- fietsenstalling: Dennis wanders through a full cycle park at a station and looks at his watch, a train waiting. Coherent (hurry, no place). The prompt asks for two things "Dennis doet": walking with the bike and looking at his watch are visible; "looking for a place" is an inference. Ordinary.
- vakantie-strand-stad: one man, same clothes, at a beach or in an old city street; a real everyday choice. Ordinary. Pair differs in the place only (clothes and bag kept).
- koken-afhalen: the same woman cooks at home or collects takeaway after work; real everyday choice. Ordinary. Pair differs in the choice.
- eerste-werkdag: Faisal at reception, gets a pass, meets colleagues. Believable first day, each panel follows from the previous. Ordinary. The title and prompt state it is his first day, which is context, not a criterion.
- wasmachine-kapot: puddle by the machine, a phone call, a repairman repairs it. Clear cause and effect; the phone call is implied to be to the repairman, picture two does not show that. Light, ordinary.
All eight ordinary; none absurd. The sequence "who she phones" is the only open inference.

After the edits the packet was rebuilt from the proposed bytes: 24b6bbf544b7d6d31cf191966a9b6d445b7f32600b24f4c1e4cb2e0c8a999a08 (this is meaning_first.packet_sha256). Changed items re-read: the docent and vakantie wording stays coherent; the dennis change touches only the model.

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| fietsenmaker-vraag | pass | comparable | Fault, deadline and price question are what a customer says at a repair counter; cue 21 words, model 40. |
| docent-vakantie | pass (edited) | comparable | Natural end-of-course small talk; criteria now allow staying at home. |
| fysiotherapie | pass | comparable | Ball and weight are drawn; "twee" is in the prompt; opinion is about daily exercise. |
| fietsenstalling | pass (edited) | comparable | Two drawn actions (walking, watch); model now leads with them. |
| vakantie-strand-stad | pass (edited) | comparable | Real choice, pair differs in place only; seasonal "deze zomer" removed. |
| koken-afhalen | pass | comparable | Ordinary weekday decision; pair differs in the dinner choice only. |
| eerste-werkdag | pass | comparable | Reception, pass, colleagues; traits copied verbatim in all panels. |
| wasmachine-kapot | pass | comparable | Leak, phone call, repair; "gebeurt" fits the repairman in panel 3. |

## Edits (proposed file hash e856094345855769dc11e15dfda1726f875c4b3849945b91e10f71303e3eab65)

- docent-vakantie criteria 1 and 3: added "of dat u thuis blijft" and "of met wie u thuis bent" (author's stay-at-home doubt). Starters unchanged and still fit.
- fietsenstalling model: both drawn actions first; "zoekt een plek" kept as an extra (resolves the inferred-action doubt; 42 words).
- vakantie-strand-stad prompt: "U gaat een week op vakantie." (no season).

Resolved without change: eerste-werkdag panels 1 and 2 share the desk but differ in the pass, which is a media check, not a text fault.

## Rejected

None.

## Diversity and set notes

Topics are new against the 59 existing A2 speaking items. Two holiday-related items (docent-vakantie, vakantie-strand-stad) differ in task type and purpose. All eight are ordinary; no light humour (the plan allows one at most). Level: all eight comparable to existing A2 items of the same type; no off-level flag. A2 word gate and batch check: no failures, no warnings.

## Media notes

Fietsenstalling: full rows and visible plain watch. Fysiotherapie: only ball and weight. Eerste-werkdag panel 2: blank card clearly visible. Both pairs: same person and clothing. Cue audio roles m-shop and f-adult.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. No rendered pictures or audio were reviewed.
