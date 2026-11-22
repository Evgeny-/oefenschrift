# Review of batch 119 (KNM batch H: theme 6 and 3.3.1)

## Meaning first (blind packet)

Packet hash (original source): 7e634a1bbdd41407a36a5ed142b94e1999beffdc25e31029363fb697d4a1585d

Read from the packet only: fact card, one prompt and the picture brief/alt per item. KNM fact cards are short information texts, not dialogues, so the meaning check asks: is this something an official source would say, does the prompt follow from the card, does the picture fit without showing the answer.

- berichtenbox: coherent official-information card; prompt asks where government post is read online. Picture of a man with a closed laptop fits the topic without showing the answer. No finding.
- ggd-vaccinatie: card says adults contact the GGD, children go to the consultatiebureau. Persona Gerben fits (adult, missed childhood vaccinations). Waiting-room picture is neutral. Risk: distractors must be false for the Netherlands (check later).
- paspoort-geldigheid: card gives 10 years adults, 5 years children; persona Paula (35) fits. Counter picture fits. No finding.
- naturalisatie-ceremonie: card says approval is not yet being Dutch; the ceremony makes you Dutch. Prompt sets the condition (approved). Picture (envelope at table) does not show the ceremony. Same persona Paula as in paspoort (two items, allowed). No finding.
- hondenbelasting: the rule "a municipality may levy only taxes in the law" is useful. The sentence about the kattenbelasting reads like a joke and is odd for a card (nobody would plan such a tax). Revise: keep the rule, drop the cat-tax framing.
- loonstrookjes-bewaren: card links the five-year look-back to keeping pay slips; persona Linda fits. Wording "belasting terugvragen die u nog moet betalen" is awkward Dutch. Check what the eindterm covers.
- aangiftebrief: card: letter means you must file; ways to file. Persona Linda with an unopened envelope fits. No finding on meaning; check that this does not repeat the existing belastingaangifte items.
- huurtoeslag: card explains the allowance and the income condition; prompt asks which allowance helps with housing costs. Empty living room is neutral. No finding.
- politie-geen-spoed: 112 for emergencies, a non-emergency number for the rest; prompt asks for that number. Police car on street is neutral. Number must be checked today; options will contain phone numbers (must read plainly aloud).
- beroep-rechter: card is a plain procedural statement; prompt asks who to go to. Picture shows a man in front of a municipal building, which may suggest the wrong institution (the court) but does not show the answer. Check the distractors.
- wetswinkel: card describes what a wetswinkel is; the prompt asks who works there, which is a fine detail more than a useful fact. Check source and eindterm coverage.
- opstalverzekering: card separates house (opstal) from contents (inboedel); persona Pim has a koopwoning and storm damage; coherent. The storm picture hints at the setting only.
- milieustation: card says each municipality must have a collection point; prompt asks where to go. Man with a box and two bins fits. No finding.

Final packet hash (proposed file): 7d30157a3821ee01e8621839a39e3547a18dc63ccb9da90da5c120fa1d425bb9. Findings above that led to edits: hondenbelasting (cat-tax reads as a joke), loonstrookjes (awkward wording), wetswinkel (trivia, partial mapping), politie (check the number), plus the card words that are above A2. After the edits I read the changed cards and prompts again; the juridischloket-doorsturen item (replacing wetswinkel) states in its prompt that the staff could not help, so the referral is set up in the text. Meaning verdict for all 13: pass, ordinary tone, no unsupported assumptions.

## Verdicts

Proposed file SHA-256: 573b2b8bab0b1d17dfabd434e2051f119fdcf52f33169a0152e9a47422481b8f. Batch check: 13 items, keys A5/B4/C4, no failures, no warnings. Level is an authoring judgment, not validated.

| id | verdict | level | reason |
| --- | --- | --- | --- |
| berichtenbox | pass | comparable | Page confirms the Berichtenbox and its three post examples; bank and insurer channels are false. |
| ggd-vaccinatie | pass | comparable | Page names the GGD for adults and the consultatiebureau for children; "Bij de gemeente" is false (the page names no gemeente route). |
| paspoort-geldigheid | pass | comparable | 10 years from 18, 5 under 18, page opened today; age set in the prompt. |
| naturalisatie-ceremonie | pass | comparable | IND page: not Dutch before the ceremony; approval set in the prompt. |
| hondenbelasting | pass (edited) | comparable | Rule kept (only taxes named in law); cat-tax sentence and option removed; national taxes as distractors. |
| loonstrookjes-bewaren | pass (edited) | comparable | 5 years from the page; mapping to 6.3.1 ("5 jaar bewaren") kept; card wording plain. |
| aangiftebrief | pass (edited) | comparable | Unverified "online / app / paper" sentence removed; explanation restated from the page. |
| huurtoeslag | pass (edited) | comparable | Card names both conditions (income, savings) and is shorter per sentence. |
| politie-geen-spoed | pass (edited) | comparable | Number 0900-8844 stated today; unverified 0800-0543 replaced by the verified 0800-8020. |
| beroep-rechter | pass (edited) | comparable | Hard word beroepschrift replaced on the card; key unchanged. |
| juridischloket-doorsturen | pass (edited) | comparable | Replaces wetswinkel (see below). |
| opstalverzekering | pass | comparable | Nibud page confirms opstal vs inboedel; prompt asks for the house itself. |
| milieustation | pass (edited) | comparable | "grotere verzamelplaats" replaced by plain words; evidence rebuilt. |

## Edits

| id | field | change | why |
| --- | --- | --- | --- |
| hondenbelasting | text, prompt, options, explanation, imageBrief, sourceNote | Card keeps the rule and the hondenbelasting; options now hondenbelasting / wegenbelasting / inkomstenbelasting; "heffen" becomes "vragen"; brief no longer names an absent object | Cat tax reads as a joke; KNM items are never jokes. The rule is useful; the item keeps it. |
| loonstrookjes-bewaren | text, evidence, sourceNote | "belasting terugvragen die u nog moet betalen" becomes "extra belasting vragen"; "minstens 5 jaar" | Awkward Dutch. Eindterm paraphrase 6.3.1 contains "5 jaar bewaren", so the item is kept. |
| aangiftebrief | text, explanation, sourceNote | Sentence on online/app/paper removed; "Hebt u geen brief gehad? Dan moet u soms ook aangifte doen." added; explanation no longer claims anything about a refund | Not on the cited page; could not be verified. |
| huurtoeslag | text | Two conditions in short sentences (income, savings) | Page names both; fixes sentence length warning. |
| politie-geen-spoed | options B, explanation, sourceNote | 0800-0543 becomes 0800-8020 | The page for 0800-0543 was not confirmed; 0800-8020 is on a Rijksoverheid page opened today. |
| beroep-rechter | text, explanation | "met een beroepschrift" becomes "met een brief" | Hard word that no question depends on. |
| wetswinkel to juridischloket-doorsturen | id, title, text, question, sourceNote | Replaced by "the Juridisch Loket sometimes sends you on to an advocaat" | See coordinator points. |
| milieustation | text, evidence, explanation | "een grotere verzamelplaats" becomes "een plek waar u afval zelf naartoe kunt brengen" | Not A2; evidence rebuilt verbatim. |

## Coordinator points

- **wetswinkel (6.5.2).** The paraphrase names advocaat, Juridisch Loket and eigen bijdrage, not the wetswinkel, and the fact asked (who works there) was trivia. Repaired toward the Juridisch Loket and advocaat with a fact the Rijksoverheid page states today. Slug renamed to juridischloket-doorsturen; the hallway picture and Quinten's traits stay.
- **loonstrookjes-bewaren (6.3.1).** The paraphrase has "jaaropgave 5 jaar bewaren"; the page states 5 years for loonstrookjes and bankafschriften, so the "5 jaar bewaren" element is covered. Kept.
- **hondenbelasting.** Judged useful as a rule (a gemeente may levy only taxes named in law), not as cat trivia; edited as above.
- **ggd-vaccinatie.** "Bij de gemeente" is false: the Rijksoverheid page names only the GGD for adults and the consultatiebureau for children. Weak but plausible; kept.
- **politie-geen-spoed.** The number 0900-8844 is stated on the page today (2 cent per minute; tariff not used). Options with phone numbers read plainly: scripts/audio.ts reads numbers digit by digit and 112 as "een een twee".

## Rejected items

None. One item (wetswinkel) was replaced by a repaired item rather than rejected.

## Diversity and set notes

- Keys: A 5, B 4, C 4. Question forms: direct facts and persona facts, one qualified yes/no-shaped item (aangiftebrief).
- Each item tests a fact different from the two existing items of its eindterm (checked against the catalogue and the paraphrase).
- Overlap to watch: the Juridisch Loket now appears in an existing item and in this batch, with different facts; belasting items 6.3.1/6.3.2 were kept apart (look-back term versus letter rule).
- Names: Paula, Linda and Quinten twice, others once; no voice names or older cast.

## Media notes

- Pictures show settings only; Paula, Linda and Quinten keep their traits. Naturalisatie's opened envelope may draw the eye to the wrong option; check it on the contact sheet. Pictures not rendered by me.
- Question audio: generate with --keys for exactly the new clips. The politie options hold phone numbers (spoken digit by digit).

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Re-check yearly: 0900-8844 and its tariff, the naturalisation procedure (law pending), toeslagen rules, passport validity, the 5-year look-back.
- Nibud is the source for the opstalverzekering item (government-funded institute).
- Eindterm mapping from docs/research/knm-coverage-2026-11-22.md; the Regeling was not re-opened.

## Follow-up repair (after adoption)

- naturalisatie-ceremonie: imageBrief and imageAlt changed. The opened envelope pointed at distractor A ("Meteen, na de brief van de IND"). New brief: Paula (woman in her thirties, long black hair, red coat) walks along a path in a sunny park, no letter, passport, town hall or ceremony; alt: "Een vrouw in een rode jas loopt over een pad in een zonnig park." The item verdict is now pass (edited); counts are 6 pass, 7 edited.
- New proposed SHA-256: f09eda913c1009287dfa43e1ff95256c9d5fabbc772be0916f9006aeff86c4a6. New blind packet hash: 48fd3c3adb18d4dab69a055f7c11bdc5f7a7adce992d80f36f33a49f03423281. The old picture must be redrawn.
