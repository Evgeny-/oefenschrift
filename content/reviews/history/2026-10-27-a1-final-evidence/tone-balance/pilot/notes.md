# Focused ordinary pilot repairs

Author drafts dated 27 October 2026. All six items are intended `ordinary`: three in batch 069 and three in batch 070. The pilot repair contributes no humorous item and does not change the current 36-item expansion's planned five light-humor and thirty-one ordinary exercises. Tone fields were not added to source records. A fresh reviewer must classify the scenes independently.

These drafts preserve IDs, domains, task formats, question counts, answer letters and tested facts. They use the current original batches as their base and follow blueprint §4.0, the updated author/review briefs, rubric and meaning-first workflow. No official-exam equivalence or validated difficulty claim is made. No real institution, factual KNM claim, brand or address was added; no external lookup was needed.

## Frozen source and blind-packet hashes

| File                                                           | SHA-256                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| `var/a1-tone-balance-2026-10-27/pilot/069-authored.json`       | `61ac9dda77a86581610b860dfd701600c2290c9e01770097d069012b12458d88` |
| `var/a1-tone-balance-2026-10-27/pilot/069-meaning-packet.json` | `0db04d1366fdef223218da590b072828a968d4424f6ce0be44577ffee051442d` |
| `var/a1-tone-balance-2026-10-27/pilot/070-authored.json`       | `39e4d9bbacac50833f9e6f7eca7539f481bd1e5ac065eb8210b3a76207afbb98` |
| `var/a1-tone-balance-2026-10-27/pilot/070-meaning-packet.json` | `30f2b56dc6535154760808b773698c134c55cd29d940dcd3546f146ca5137240` |

Packets use the shared canonical `meaningPacket` and `meaningPacketHash` functions. They contain no answer choices, keys, explanations or author notes. Sources are frozen at these hashes for independent review.

## Changes and media

All six source texts and explanations change. Every listening fragment is now four turns and 30–33 spoken words. The bag q1 evidence becomes “Een kleine tas, graag.” All other evidence quotes remain exact in the replacement source.

Pencil q2 changes from “Wanneer geeft Roos het potlood terug?” to “Wanneer geeft Roos het terug?”. Naming the object in q2 previously supplied q1's correct answer. The new prompt uses the natural pronoun and does not name a specific option. Other question prompts and all options remain unchanged.

After independent approval, regenerate the three listening fragments and pencil q2 narration. The other five question narrations can be reused if their existing media checks remain valid. The three current listening image briefs and alts are preserved byte-for-byte, asserted by the author script; no illustration regeneration is requested. Reading items have no images and none were added. No source, image, audio, review, configuration, catalogue or practice-set file outside this pilot draft directory was edited.

## Per-item author intent and question rationale

### A1:reading:batch069-kopjes:1

Intended tone: `ordinary`. Domain: `werk`. Words: 28. Mean sentence: 4.7 words; maximum: 8. One message, two questions.

Omar asks Lina to prepare the kitchen for an upcoming meal. Cups go in the cupboard; the plates on the table remain there for eating. The plate location now serves the same request instead of sitting among unrelated utensils.

- q1: Wat moet Lina in de kast zetten? Key A = De kopjes. Evidence: “Zet de kopjes in de kast.”
  - B (De borden.): Plates must remain on the table, so Lina does not put them in the cupboard.
  - C (De lepels.): Spoons are a familiar kitchen alternative but are not the requested item; the instruction explicitly names cups.
- q2: Waar staan de borden? Key B = Op de tafel. Evidence: “De borden staan op de tafel.”
  - A (In de kast.): The cupboard is the destination of the cups; the plates are on the table.
  - C (Bij de kraan.): The tap is a familiar kitchen location, but the source explicitly locates the plates on the table.

### A1:reading:batch069-lesboek:1

Intended tone: `ordinary`. Domain: `opleiding`. Words: 29. Mean sentence: 4.1 words; maximum: 6. One message, two questions.

Sara prepares the learner for the next lesson: bring the book, read a text together, then do exercise 4 with help available. Room and text numbers and unused stationery have been removed.

- q1: Wat moet je meenemen? Key C = Je boek. Evidence: “Neem je boek mee.”
  - A (Je schrift.): A notebook is familiar lesson material, but Sara explicitly asks for the book.
  - B (Je pen.): A pen is familiar lesson material, but Sara explicitly asks for the book.
- q2: Welke oefening maak je? Key A = Oefening 4. Evidence: “Daarna maak je oefening 4.”
  - B (Oefening 2.): Exercise 2 is a plausible book exercise; the assigned exercise is 4.
  - C (Oefening 3.): Exercise 3 is a plausible book exercise; the assigned exercise is 4.

### A1:reading:batch069-tafel-dragen:1

Intended tone: `ordinary`. Domain: `vrije-tijd-familie`. Words: 33. Mean sentence: 4.7 words; maximum: 6. One message, two questions.

Mila asks Sem to carry a new table inside with Ali. The group eats afterward and Noor brings bread. The table movement has an explicit goal and the bread belongs to the shared meal. The unneeded coffee role was removed.

- q1: Wat gaat Sem doen? Key B = De tafel dragen. Evidence: “Jij draagt de tafel met Ali.”
  - A (De koffie maken.): Making coffee is a plausible helper task, but Sem is explicitly assigned carrying the table.
  - C (Het brood meenemen.): Noor brings bread; Sem carries the table with Ali.
- q2: Wie neemt brood mee? Key C = Noor. Evidence: “Noor neemt brood mee.”
  - A (Ali.): Ali helps carry the table; Noor brings bread.
  - B (Mila.): Mila sends the message; she explicitly says Noor brings bread.

### A1:listening:batch070-foto-werk:1

Intended tone: `ordinary`. Domain: `werk`. Words: 33. Mean sentence: 4.1 words; maximum: 8. Four turns, two named speakers and two distinct configured roles.

Sabrina announces a work photo. Julio asks who takes it and where he should stand. Sabrina names Karim and the tree location; Julio accepts and heads outside. Door and corridor jobs and competing positions are removed.

- q1: Wie maakt de foto? Key A = Karim. Evidence: “Karim maakt de foto.”
  - B (Julio.): Julio receives the position instruction; Sabrina explicitly names Karim as photographer.
  - C (Sabrina.): Sabrina gives the instructions; she explicitly names Karim as photographer.
- q2: Waar moet Julio staan voor de foto? Key B = Bij de boom. Evidence: “Je staat buiten bij de boom.”
  - A (In de gang.): A corridor is a familiar workplace place, but the instruction specifies outside by the tree.
  - C (Bij de deur.): A doorway is a familiar workplace place, but the instruction specifies by the tree.

### A1:listening:batch070-potlood-lenen:1

Intended tone: `ordinary`. Domain: `opleiding`. Words: 30. Mean sentence: 3.8 words; maximum: 6. Four turns, two named speakers and two distinct configured roles.

Roos has no pencil and asks to borrow something for drawing. Mark lends his pencil. Roos asks when to return it; Mark says after class. The exchange contains no unrelated schedule, drink or stationery inventory.

- q1: Wat krijgt Roos van de docent? Key C = Een potlood. Evidence: “Ik geef je mijn potlood.”
  - A (Een gum.): An eraser is a familiar drawing tool, but Mark explicitly gives his pencil.
  - B (Het papier.): Paper is familiar drawing material, but the loaned item is a pencil.
- q2: Wanneer geeft Roos het terug? Key A = Na de les. Evidence: “Geef het na de les terug.”
  - B (Voor de les.): Before class is a familiar return time, but Mark says after class.
  - C (In de pauze.): During the break is a familiar return time, but Mark says after class.

### A1:listening:batch070-tas-kopen:1

Intended tone: `ordinary`. Domain: `winkels-diensten`. Words: 31. Mean sentence: 3.9 words; maximum: 5. Four turns, two named speakers and two distinct configured roles.

The seller asks which bag Fatima wants. She chooses a small bag because it is easy to carry. He offers one and directs her to payment. She thanks him and says she pays by card. Backpack inventory and the unused payment methods are removed.

- q1: Wat koopt Fatima? Key B = Een kleine tas. Evidence: “Een kleine tas, graag.”
  - A (Een grote tas.): A large bag is a plausible shop purchase, but Fatima requests a small bag.
  - C (Een nieuwe rugzak.): A backpack is a plausible shop purchase, but the requested item is a small bag.
- q2: Hoe betaalt Fatima? Key C = Met haar pas. Evidence: “Ik betaal met mijn pas.”
  - A (Met haar munten.): Coins are a familiar payment method, but Fatima explicitly chooses her card.
  - B (Met haar telefoon.): A phone is a familiar payment method, but Fatima explicitly chooses her card.

## Validation

Both final authored JSON files were formatted with Prettier. The unchanged image arrays, IDs and answer-letter sequences were asserted against the current original sources.

Commands: `npm run batch:check -- var/a1-tone-balance-2026-10-27/pilot/069-authored.json` and the matching `070-authored.json`.

Each command reports:

```text
Checked 3 items, 6 questions. Keys: {"A":2,"B":2,"C":2}. Options: {"3":6}.
  info  3 of 3 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

Independent source-first review remains outstanding. Please check the kitchen request as a whole, the table movement and later meal, each listening reply and the complete question pairs after recording blind findings. This author did not approve, adopt, integrate or generate media. Frozen 071/072 drafts and proposed sources were not touched.
