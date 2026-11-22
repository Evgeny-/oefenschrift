# Review of batch 116 (A2 speaking, 12 new)

## Meaning first (blind packet)

Blind packet hash (original source): fbba4c545c4e14563dd28e33a90ce2c523b0864c08217e76b964a40f76bea3bf. Written before opening questions, criteria, models, notes or the plan. (Hash is recomputed from the proposed bytes at the end; see the final section.)

1. bibliotheek-boek (video-answer). A librarian at the desk asks what kind of book you want and whether it is for you or a child; the prompt adds how long you want to borrow it. Everyday, real purpose (finding a book at the desk). Cue is one greeting plus two linked questions. The loan period is not asked in the cue, so the prompt must carry it (it does: "Zeg ook hoe lang u het boek wilt lenen"). Remaining risk: the name Anouk is reused in item 6 for a different person (allowed, two uses).
2. sportschool-intake (video-answer). First visit, trainer asks how often and why you want to exercise; prompt adds which day you want to come. Coherent intake conversation. Fine.
3. apotheek-ophalen (video-answer). Prompt says you are at the pharmacy "voor een nieuw medicijn" and the assistant speaks, but the cue says the medicine is ready tomorrow and asks what time you will collect it. The prompt then asks you to ask how often to take it. Mismatch: the learner is at the counter now, yet the collection is tomorrow, and the dosage question is a pickup-day question. Needs a clearer premise (medicine arrives tomorrow, learner may ask now or, better, collect later). Also "Vraag ook" is a different task shape from "Zeg ook" (a question to ask, not an answer).
4. ziekenhuis-bezoek (picture-describe). Leyla visits her father in hospital, flowers and grapes visible. Prompt asks for scene, two things visitors bring (pictured), and what you bring yourself. Coherent and everyday; title and prompt do not name the objects.
5. sneeuw-straat (picture-describe). Snowy street, a man clearing the pavement, children in hats and scarves. Prompt asks for scene, two things you wear in winter (hat, scarf are pictured), and what you like doing in winter. Coherent.
6. kinderboerderij (picture-describe). Mother and small son feed a goat, chickens behind them. Prompt asks for scene, two animals (goat, chickens pictured) and whether you visit such places. Coherent. Same slug as a reading item (different part).
7. werk-dag-nacht (picture-choose). Factory shift by day or by night, the same worker in both pictures; real choice with a plain reason. Pair differs only in daylight versus night. Fine.
8. markt-supermarkt (picture-choose). Vegetables at the market or in the supermarket, same woman in both. Real everyday choice. Fine.
9. boek-papier-tablet (picture-choose). Evening reading, paper book or tablet, same woman and sofa. Real choice. Fine.
10. telefoon-kapot (picture-sequence). Phone cracked on the street, handed over in a repair shop, whole again. Clear cause and effect, one protagonist. The prompt does not say the phone breaks; the first picture must show it (a cracked, fallen phone).
11. huisarts-apotheek (picture-sequence). Feels ill at home, sees the doctor, collects medicine at the pharmacy. Natural chain. Prompt does not state any step; fine for picture-sequence.
12. zwemdiploma (picture-sequence). Swimming lesson with float, swimming in front of other children, family celebrates with a paper. The father is named in the prompt but is absent from panels 1 and 2; the girl is unnamed, so the narration subject is "zijn dochter". The pictured paper (a diploma) must be recognisable by context (celebration, cake).

Findings 3 and 12 and the picture-sequence leak (title) were confirmed against the answer material and repaired (see Edits). Everything else in the blind pass held up.

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| bibliotheek-boek | pass | comparable | Real desk exchange; loan period asked in the prompt |
| sportschool-intake | pass | comparable | First-visit chat; three goals split cue/prompt |
| apotheek-ophalen | pass (edited) | comparable | Prompt gave no reason for a medicine "ready tomorrow"; now needs a new medicine |
| ziekenhuis-bezoek | pass | comparable | Gifts pictured; calm room |
| sneeuw-straat | pass | comparable | Clothing pictured; winter given in the prompt |
| kinderboerderij | pass (starter edited) | comparable | Two animals pictured; starter now allows "niet" |
| werk-dag-nacht | pass (edited) | comparable | Day/night pair made unmistakable (sky, moon, stars) |
| markt-supermarkt | pass (edited) | comparable | Sample really missed criterion 3; "kraam" removed |
| boek-papier-tablet | pass | comparable | Clean pair, one difference |
| telefoon-kapot | pass (edited) | comparable | First picture shows picking up, model now says so; clearer crack brief |
| huisarts-apotheek | pass (edited) | comparable | Sample covered picture 3 despite a null quote; bag brief plain |
| zwemdiploma | pass (edited) | comparable | Title leaked the diploma; countable-row brief; count not needed |

## Edits

See `content/reviews/116-review.json` (`edits`) for before and after of each field. In short: apotheek-ophalen prompt (premise and speaker first); werk-dag-nacht briefs and alts (sun and blue sky against moon, stars and lamps); markt-supermarkt sample, model and alt (clean omission, no "kraam"); telefoon-kapot panel 1 brief and model; huisarts-apotheek panel 3 brief, sample and quote; zwemdiploma title, panel 2 brief and alt, model; kinderboerderij third starter (proposed starters file).

## Rejected

None.

## Item checks of the coordinator's list

- Names: item 3 "de assistente" and item 12 "een vader ... zijn dochter" are consistent inside each item (the pharmacy still shows one woman, Carmen only in the brief; the girl is "het meisje" in criteria, alts and model). Anouk and Carmen each name two different women in two items; this is allowed and the briefs differ.
- Item 10 panel 1: brief now says the phone lies face up, large, with a long dark zigzag crack; the model describes picking it up.
- Item 7 pair: windows show blue sky and sun against dark sky, moon and stars plus lamps.
- Item 12 panel 2: a row of three children in different colours, but nothing in the criteria, alt or model needs the count.
- Item 11 panel 3: a small white paper bag held out across the counter.
- Item 6 slug: kept; a reading text and a picture task are different parts and concepts.

## Diversity and set notes

Twelve distinct topics; domains gezondheid 4, vrije-tijd-familie 4, winkels-diensten 2, werk 1, wonen-buurt 1. Keep apotheek-ophalen apart from the older picture-describe apotheek in one set, and bibliotheek-boek apart from 095-bibliotheek-lid. All twelve are ordinary; the combined A2 speaking humour share is for the coordinator.

## Media notes

Cue voices f-mature, m-young, f-adult (all distinct, promptAudio by the narrator). Picture risks: telefoon-kapot panel 1 (cracked phone; may need a second try), werk-dag-nacht (same man in both), zwemdiploma panels 2 and 3 (children, crowded table), huisarts-apotheek panel 3 (small bag, not a box).

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Level verdicts compare with existing A2 speaking items. Pictures and audio are not yet generated or reviewed.

## Final hashes

Proposed batch: see `source_sha256` in `content/reviews/116-review.json`. Meaning-first packet hash after edits: d94f02d4953ae132b72c13a9918eb417accdd26e87e7f86d3c482445beb24079 (original: fbba4c545c4e14563dd28e33a90ce2c523b0864c08217e76b964a40f76bea3bf).
