# Review of batch 079 (A1 speaking, 12 picture-describe tasks)

Independent AI editorial review, 28 October 2026. Not validated CEFR difficulty or exam equivalence. Proposed file sha256 `030bdf46f210…`; starters `232a8dcdbef6…`; blind packet of the proposed file `0b8131aa1688…` (original `6cac9de7dad0…`). Blind findings were written before criteria, models, samples, starters or notes were opened (`review_contract_version: 2`).

Coordinator decision applied: no pretext for picture tasks. Every phone-call framing is removed; prompts are "Kijk naar het plaatje." plus two direct questions (fiets-mand keeps one short sentence, "Dana fietst.").

## Verdicts

All twelve pass after edits. Level for all: fits the simplified A1 profile (prompts 10–17 words, models 7–12, list words only).

| Id (suffix) | Verdict | Tone | Reason |
| --- | --- | --- | --- |
| batch073-reuzenbeker | pass (edited) | ordinary | Gift scene; giver criterion now "oma of een vrouw"; neutral title |
| batch073-langesjaal | pass (edited) | ordinary | Place criterion also accepts "in het park"; Lotte's call gone |
| batch073-koelkastbal | pass (edited) | ordinary | "de koelkast", not "uw"; model repeats the noun instead of "hij" |
| batch073-boekenpan | pass (edited) | ordinary | Place also "in de klas"; teacher's call gone |
| batch073-tuinbed | pass (edited) | ordinary | Sick mother and doctor gone; "de vrouw"; domain gezondheid to wonen-buurt |
| batch073-hondenboek | pass (edited) | ordinary | Missing-dog story gone (incoherent); no invented "mijn tuin" |
| batch073-samenjas | pass (edited) | light-humor | Brief asks for a definite blue; sister's call gone |
| batch073-miniparaplu | pass (edited) | light-humor | Plain bus added behind the shelter; joke no longer announced |
| batch073-stofzuigerdans | pass (edited) | ordinary | Title "Sanne" (old title gave away "work"); colleague's call gone |
| batch079-fiets-mand | pass (edited) | ordinary | "in de mand"; definite green frame; Erik's call gone |
| batch079-kantoor-koffie | pass (edited) | ordinary | Coffee or tea accepted; second question cannot repeat the first |
| batch079-markt-fruit | pass (edited) | ordinary | Pears replaced by four bananas; "nog" and "stuks" gone |

## Decisions on the author's doubts

- **Coffee vs tea (kantoor-koffie).** Keep the picture, accept "koffie of thee". The second question became "Wat doet Jaap op de computer?" so "hij drinkt koffie" cannot answer both goals.
- **Sage green (fiets-mand).** Keep green but the brief now demands a definite leaf green frame. The media review must reject a grey-looking bicycle; fallback is a yellow frame with criterion, model, alt and starter updated. Same for the dusty blue coat in samenjas.
- **One sentence meeting both goals (tuinbed).** Allowed. "Ze slaapt in bed" gives an action and a place, two distinct facts.
- **"hij" for the fridge.** Replaced by "De koelkast is bijna leeg." (no implicit references in the profile).
- **Questions vs commands.** Questions are fine; the blueprint's own example mixes both.
- **Slugs** that no longer describe their scene are acceptable.

## Edits (field → new text; full before/after in the JSON)

- All 12 `title` → neutral: Een cadeau, Een sjaal, Een koelkast, Boeken, Een vrouw, Een hond, Een jas, Een paraplu, Sanne, Op straat, Op kantoor, Op de markt (old titles named callers or part of a goal).
- All 12 `prompt` → pretext removed; referents repeated (de vrouw, de hond, Sanne, Jaap) instead of "hij/ze/haar". Examples: reuzenbeker "Kijk naar het plaatje. Wat krijgt Mo? Wie geeft het cadeau?"; fiets-mand "Dana fietst. Kijk naar het plaatje. Welke kleur heeft de fiets? Wat ligt er in de mand?"; markt-fruit "Kijk naar het plaatje. Welk fruit ligt er? Hoeveel ziet u?".
- criteria: reuzenbeker 2 "oma of een vrouw"; langesjaal 1 "op de bank of in het park"; boekenpan 1 "op de tafel of in de klas"; tuinbed 1–2 "de vrouw"; miniparaplu 1 "bij de halte of de bus"; fiets-mand 1–2 (groen; in de mand: bloemen); kantoor-koffie 1 "koffie of thee", 2 "hij werkt"; markt-fruit 1–2 (bananen; vier).
- models: koelkastbal "Er staat alleen melk in de koelkast. De koelkast is bijna leeg."; tuinbed "De vrouw slaapt. Ze ligt in bed in de slaapkamer."; hondenboek "De hond is in de tuin. Hij speelt met een bal."; fiets-mand "De fiets is groen. In de mand liggen bloemen."; markt-fruit "Er liggen bananen. Ik zie vier bananen."
- samples (still one omitted goal, one null quote, varied errors): tuinbed "De vrouw is in slaapkamer."; hondenboek "De hond zijn in de tuin."; fiets-mand "In mand er zijn bloemen."; markt-fruit "Er is bananen."
- `images[0].brief`: samenjas (definite blue), miniparaplu (plain bus behind the shelter), fiets-mand (definite green, basket kept in view), markt-fruit (four yellow bananas, blue apron). `alt`: fiets-mand and markt-fruit.
- `domain`: tuinbed gezondheid → wonen-buurt (illness premise removed).
- starters (`079-proposed-starters.json`): tuinbed "De vrouw …", "Ze is …"; fiets-mand "De fiets is …", "In de mand …"; markt-fruit "Er liggen …"; kantoor-koffie second "Jaap …". The other eight are the author's.

## Rejected

None.

## Diversity and set assembly

Goals (24): place 6, object/drink 5, action 4, colour 3, count 3, size 1, giver 1, state 1. Domains: vrije-tijd-familie 2, wonen-buurt 3, opleiding 1, winkels-diensten 2, werk 2, vervoer 2; no gezondheid here. Callers are gone from the pictures' people, so the author's four sets still work by scene; Mo, Dana, Sanne and Jaap each occur once. Two funny items (miniparaplu, samenjas): 2/12 is the permitted round-up; with batch 080 the speaking bank has 4 of 24.

## Media notes

Check each picture against both goals: samenjas (blue, two heads, four feet), fiets-mand (green frame), miniparaplu (bus visible, umbrella hand-sized), markt-fruit (exactly four separate bananas), kantoor-koffie (drink may look like tea, both accepted), reuzenbeker (reads as grandmother, mug not a bowl), tuinbed (eyes closed, bed). Prompt narration must be regenerated for all twelve.

## Limitations

AI editorial review only; simplicity ratings are my judgment, not learner data. Bananas also occur in listening `hond-banaan` (077). `stofzuigerdans` keeps domain werk because the brief draws a staff kitchen, though the prompt no longer says so.
