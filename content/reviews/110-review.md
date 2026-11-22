# Review of batch 110 (KNM, themes 5 and 7)

## Meaning first (blind packet)

Packet hash (original source): `557d4b29a5919f22813b83542ef6fedae84ff92d15f06d25d2c5c2bd9e3dcb8e`. Written before opening the options, keys, notes or plan. KNM fact cards are short factual statements, so "meaning" here means: does the card say one coherent thing, does the question follow from it, does the persona have a reason to ask, and is the picture a setting, not the answer?

- **deltawerken.** Card explains dams and sluices against sea water in one chain (what they are, what they do, result). The question "Wat zijn de Deltawerken?" follows directly. Picture of a dam in the sea matches and is a setting, not the answer text. Risk: "hoogwater" and "sluizen" are not everyday A2 words; the card explains them only partly. Check later.
- **slavernij-afgeschaft.** Card gives date, event, yearly commemoration and its name. The prompt already says "nationale herdenking op 1 juli", then asks what happened on 1 July 1863. That is coherent, but the prompt hands over the commemoration, so the answer must still require knowing the event and not just the word "herdenking". Check the options for that. Calm tone; a monument picture without people is fitting.
- **holocaust-herdenking.** Card defines the Holocaust, then gives the yearly date of the commemoration. The prompt gives the date and asks what is remembered. Coherent. Risk: the exact date rule ("laatste zondag van januari") must be verified against an official page; if the real rule differs the whole item fails. Tone is calm, no people shown.
- **gastarbeiders-jaren-zestig.** Persona (Hatice's grandfather) gives a believable reason to ask about the sixties. Card answers the "why" (Nederland had workers needed). Picture of a man with a suitcase on a platform fits and is neutral.
- **regering-den-haag.** Persona lives in Amsterdam, which makes Amsterdam the tempting wrong answer; the card names both cities with their roles. Coherent. Picture of a man walking to a building with a flag shows a setting. Risk: "regering" versus "Tweede/Eerste Kamer" needs the source to say it plainly.
- **twaalf-provincies.** Persona looks at a map and asks how many provinces; natural. The second card sentence ("bestuur ... tussen regering en gemeenten") is extra and uses "bestuur", which is hard for A2 and not needed for the question.
- **ov-uitchecken.** Persona travels with an OV-chipkaart; the question asks what she must do at every trip. The card covers both card types. Coherent, and the picture shows a card at a reader (setting). Risk: the obligation must hold for every mode in the official OV information, and the item must state only the national rule.
- **reisplanner-9292.** Persona wants to travel by bus and train to another city and asks what 9292 is. Natural reason. Picture at a bus stop matches. No coherence problem.
- **gelijk-loon.** Two named colleagues, same company, same work value; the rule for pay follows. The card uses "werk van gelijke waarde" and "bonussen", both above A2. Coherent otherwise.
- **vrouw-directeur.** Persona applies for a director job and is told it must be a man; the question asks what that is by law. Plausible as a clear-cut illegal statement. "Weigeren" and "discriminatie" are the tested term and a close neighbour; check the options. Picture of an interview-like desk scene is a setting.
- **eerste-kamer.** Card lays out the order (Tweede Kamer, then Eerste Kamer) and what the Eerste Kamer may do. Question follows from the card. The picture (empty room with green benches) is a setting. "Wetsvoorstel" is the subject term and needs explaining.
- **eu-meebeslissen.** Persona reads about the EU; the question asks what membership means for EU laws. Coherent. The brief puts a small EU flag in the picture, which is a cue near the topic but not the answer.
- **rechter-beslist.** Two neighbours with a fence dispute that they cannot solve themselves; the card says who decides and who does not. Realistic and coherent. Check that "ruzie over de regels" is fitting for a fence dispute.

Meaning verdict before answer material: all 13 coherent; no item needs a new premise. Open risks are word level (deltawerken, gelijk-loon, provincies, eerste-kamer), source facts (holocaust date, OV rule) and the commemoration prompts.

Packet hash after the reviewer's edits (proposed bytes): `b10a246d06280c6bb193a89f18421f9449e5e49003eb03b2aa23a6e072d232f3`. The changed cards, prompts and briefs were re-read and still read as one coherent fact each.

## Verdict

13 items, all pass after edits (0 pass unchanged, 13 pass (edited), 0 rejected). Proposed file: `content/batches/110-proposed.json`, SHA-256 `59f1dccdd80836043c1ee8656c3bb5683b458c6e7b560ab944dab5710e0ae803`. Every source page was opened on 2026-11-22 and states the keyed fact. Keys A5 / B4 / C4 (38 / 31 / 31 percent).

| id | verdict | level | reason |
| --- | --- | --- | --- |
| deltawerken | pass (edited) | easier | "bouwwerken", "sluizen", "hoogwater", "molens", "steden" replaced; picture showed a dam (the answer), now a coast |
| slavernij-afgeschaft | pass (edited) | comparable | prompt named the commemoration and so pointed to the key; removed; "afgeschaft" explained |
| holocaust-herdenking | pass (edited) | comparable | date verified; "afschaffing" replaced; date in the prompt is the tested fact, accepted |
| gastarbeiders-jaren-zestig | pass (edited) | easier | "vluchtten", "economie", "arbeiders" replaced; options parallel |
| regering-den-haag | pass (edited) | comparable | source accepted (see below); explanation no longer says "op het Binnenhof" |
| twaalf-provincies | pass (edited) | easier | "bestuur ... staat tussen", "het Rijk" replaced; map picture could show a wrong count |
| ov-uitchecken | pass (edited) | comparable | distractor "alleen uitchecken" was not a real misconception; picture showed the check-in act |
| reisplanner-9292 | pass (edited) | easier | persona described the answer; picture hinted (phone at a stop); weak distractor "weer-app" |
| gelijk-loon | pass (edited) | comparable | "werk van gelijke waarde", "bonussen", "bepaalt" above A2; prompt echoed "gelijk" only in the key |
| vrouw-directeur | pass (edited) | comparable | key was longest/most specific; option A was literally true; "weigeren", "overheid" replaced |
| eerste-kamer | pass (edited) | comparable | "wetsvoorstel" unexplained; "uitvoeren", "besproken" replaced; bench colour neutral |
| eu-meebeslissen | pass (edited) | comparable | "uitvoeren" replaced by "volgen"; otherwise unchanged |
| rechter-beslist | pass (edited) | easier | explanation "partijen" replaced; otherwise unchanged |

## Decisions on the coordinator's questions

- **Source substitutions.** The Tweede Kamer audio-tour PDF for regering-den-haag is acceptable: it is the parliament's own text and says the Binnenhof is "niet de hoofdstad ... en toch is hier de regeringszetel gevestigd"; the Grondwet gives Amsterdam as capital. The Canon page on Amsterdam also says the parliament sits in Den Haag. No plain government page was found; I kept the PDF and recorded this as a limitation. 9292's own site for reisplanner-9292 is acceptable: it states what the service is, and no ministry page names it. For ov-uitchecken I kept 9292, which says "het hele OV", and added the NS page as corroboration.
- **Commemoration in the prompt.** slavernij-afgeschaft: the prompt named the national commemoration, so the only option that fits a commemoration was the key. I removed it; the learner now needs the date fact. holocaust-herdenking: the date is the tested fact ("what is remembered on this date"), both distractors have a well-known other date (1 July, 5 May), so the prompt may keep it. I judge it acceptable.
- **ov-uitchecken against the official OV information.** 9292 and NS both state in- and uitchecken at every trip. The item states only that national rule; it does not use the price, the bank-pass-in-one-bus-company detail or the penalty of the A2 listening item batch105-ov-uitchecken. The slug is the same but the part differs.
- **History facts.** Deltawerken (Rijkswaterstaat), 1 July 1863 and the Nationale Herdenking Slavernijverleden (Rijksoverheid), last Sunday of January Holocaust commemoration (Rijksoverheid), gastarbeiders from Turkey and Morocco in the 1960s (Canon van Nederland, national canon), twelve provinces (IPO), Amsterdam capital / Den Haag seat of government: all confirmed. Tone is calm and factual; no people in distress are drawn. Distractor facts: no new Grondwet in 1863 (revisions 1848, 1887), first train 1839, liberation is celebrated on 5 May, slavery commemorated on 1 July.

## Edits

55 field edits are listed with before, after and reason in `content/reviews/110-review.json`. Main groups:

- **Words (owner priority).** Replaced words outside the tested term that are not on the A2 list: bouwwerken, sluizen, hoogwater, molens, steden, pijlers, stenen gedenkteken, afschaffing, vluchtten, groeide, economie, arbeiders, aktetas, bestuur, het Rijk, vlakken, bonussen, bepaalt, toeslagen, weigeren, overheid, besproken, uitvoeren, vergaderzaal, partijen, ernaar. Kept as subject terms: Deltawerken, koloniën, afgeschaft, Holocaust, Joden, slachtoffers, gastarbeiders, OV, OVpay, provincie, discriminatie, wetsvoorstel (now explained), goedkeuren, afkeuren, Eerste/Tweede Kamer, rechter, burgemeester. "bonus" is an English cognate and counts as A2. "ruzie" and "oorlog" are everyday words and stay.
- **Key signals.** vrouw-directeur key was the longest and most specific option; slavernij prompt named the commemoration; gelijk-loon prompt shared "gelijke" only with the key; reisplanner persona (bus and train) described the answer.
- **Distractors.** vrouw-directeur A ("Een keuze van het bedrijf") was literally true; ov-uitchecken C ("alleen uitchecken") nobody believes; eerste-kamer C and reisplanner A are now real mix-ups with clearly false statements.
- **Pictures.** deltawerken now a coast (the dam was the answer); twaalf-provincies a plain map (a drawn map could show a wrong number); ov-uitchecken no tapping act; reisplanner no phone; eerste-kamer neutral wood benches; alts without hard words.

## Rejected

None.

## Diversity and set notes

- Three place or number facts (regering, provincies, deltawerken), three date or reason facts (slavernij, holocaust, gastarbeiders), two OV facts, five rule or role facts. Question forms: direct (5), persona (8); no yes/no and no behaviour question.
- Names: Hatice, Gerrit, Priya (twice), Sven, Layla (twice), Jeroen, Zeynep, Milan; none from the voice or old-cast lists. Priya and Layla each appear in two items, the allowed maximum.
- Near neighbours in the catalogue, all different facts: batch006-sollicitatie (discrimination by origin; vrouw-directeur is sex and 7.2.1), batch007-wetten (who makes laws), batch007-europese-unie (free movement), batch007-hoger-beroep (appeal), batch018-bevrijdingsdag and dodenherdenking (5 May and 4 May; they appear only as a distractor).
- In one mock form, slavernij-afgeschaft and holocaust-herdenking should not sit next to each other, because each explanation names the other date.

## Media notes

- Pictures: all are drawings in the house style, no text. Slavery and Holocaust pictures are empty memorial scenes without people. Do not draw a map with names (twaalf-provincies) and keep the EU flag small; redraw if the local model draws unreadable stars.
- No audio exists. Generate question and option audio only after adoption, with exact job keys (`audio --keys`).

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Check yearly: OV check-in details, the pending pay-transparency law and the Binnenhof renovation (only the city is asked).
- regering-den-haag rests on a Tweede Kamer PDF and the Grondwet; reisplanner-9292 rests on 9292's own site.
- Eindterm mapping follows the coverage audit; the Regeling was not re-opened.
- Pictures were not seen; none exist yet.
