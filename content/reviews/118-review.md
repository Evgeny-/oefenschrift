# Review of batch 118 (KNM batch G: theme 4 and 3.2)

## Meaning first (blind packet)

Packet hash (original source): `2cc3c2c0652172341486380929be15e2adf2670736202cb9d3b028c460aafa06`. Written before opening the questions, options, keys or author notes. KNM items are fact cards with a persona, so "meaning" here means: does the fact card read as something the Dutch government or a care body would really say, does the persona question follow from it, and does the picture fit without giving the answer away.

- **huisarts-vol.** Card names two ordinary reasons (praktijk vol, wonen te ver weg). Bo is looking for a new GP; the question "Wanneer mag een huisarts hem niet aannemen?" asks for a condition, which the card supplies. Coherent. Picture (man with laptop) fits the search. Risk: options must not contain a "nooit/altijd" rule; check later.
- **apotheek-controle.** Card says the pharmacy checks the recipe and other medicines. Yasmina collecting medicine; "Wat controleert de apotheek ook?" follows. Coherent. The word "recept" and "werking" are A2-plausible. Risk: "ook" in the prompt points to the second sentence, so the options must not echo "recept" only in the key.
- **tandarts-poetstips.** One simple fact: the dentist gives tips on brushing. Cas wants to learn to brush well. Coherent and calm, but a very easy and low-value fact (anyone would guess "tandarts"). Needs a worth-it judgement.
- **consultatiebureau-maand.** Card: consultatiebureau follows babies, invites at one month, free. Valerie has a baby; the question asks when she is invited. Coherent. Card carries a second fact (gratis) that the question does not use; harmless.
- **fysio-zonder-verwijzing.** Card contrasts specialist (needs referral) with fysiotherapeut (usually not). Zakaria has back pain. Coherent. Risk: the card names both the specialist and the physiotherapist, so the key and the main distractor are in the card; the options must be false statements about the Netherlands (a specialist really needs a referral, a GP does not).
- **hap-eigen-risico.** Card defines eigen risico and says it is not paid at the huisartsenpost but is at spoedeisende hulp. Arjan with a phone on the sofa in the evening. Coherent. Time-sensitive: the rule for the emergency department changes in January 2027; check the final wording.
- **alarmnummer-europa.** Card: 112 works in all EU countries; the second sentence ("alleen als elke seconde telt") is an odd addition (it reads as advice and is not tied to the persona question). Demi on holiday in Spain sees a serious accident; question asks which number. Coherent for the premise, but the second sentence is unfocused.
- **rekening-apotheek.** Card: no contract between insurer and pharmacy, so you pay first and reclaim. Valerie reuses a name from the consultatiebureau item (allowed, two items). Question "Wie betaalt de rekening eerst?" follows. Coherent; picture (receipt and small bag) is calm and shows the setting, not the answer.
- **dossier-termijn.** Card: you may see your medical file, also online; a doctor or hospital must cooperate within one month. Bo asks his GP; question asks the maximum time. Coherent. Risk: the legal term in the card is "binnen één maand"; the source must state that exactly; the eindterm mapping looks loose (it is about the right to see the file, not the term).
- **zorgtoeslag-eenmalig.** Card: apply once online with DigiD; afterwards it continues every year as long as you meet the conditions. Demi at a laptop. Question asks how often she must apply. Coherent. Risk: "u hoeft maar één keer" needs checking against the Dienst Toeslagen page today (the claim is stated with a qualification, but options like "elk jaar" will be tempting for a learner who knows renewal is automatic).
- **mantelzorger-wie.** Card defines mantelzorg. The persona question already states "vrijwillig" and "goed kent" and asks for the term: the answer is derivable from the question text alone, and the card repeats the same words. Arjan carrying soup to the neighbour in the picture fits. Easy term-matching; check that distractors are real Dutch care roles.
- **slimme-meter.** Card: smart meter passes meter readings to the network operator automatically; explains meterstanden. Cas near a meter box. Question "Wat doet die meter?" Coherent. Risk: the card explains the key in nearly the words of the question; check distractors.
- **opzegvergoeding-vast.** Card: fixed tariff contract has a fixed term; early cancellation lets the supplier charge an opzegvergoeding; not at a variable tariff. Zakaria at a laptop. Question asks which contract. Coherent. Risk: the options are probably vast / variabel / something else; a third option must be false in the Netherlands.

General: pictures all show a calm setting and none shows the answer (the doctor's office picture for dossier-termijn shows a doctor and a closed folder, which hints at the topic but not at "one month"). Names Valerie, Bo, Demi, Arjan, Cas and Zakaria each appear in two items at most. No graphic illness and no behaviour questions at this stage.

After the repairs the blind packet was rebuilt from the proposed bytes (hash `6414c9c9510f4da3050a7c4afe1a175e306cc5efc19cb42a65d86cf8d7675167`) and the meaning pass repeated for the changed items (apotheek-controle prompt, consultatiebureau-maand, dossier-logging): all coherent, no unsupported assumptions.

## Result

Proposed file: `content/batches/118-proposed.json`, SHA-256 `f7dd5f05e04388b2cd1fd327c39654bb4ad241ee9533496ef30f20c9bc4ffd64`. 12 items: 4 pass, 8 pass (edited), 1 rejected and removed. Keys A4 / B4 / C4. Batch check: no failures, no warnings. Every sourceUrl was opened on 2026-11-22 and the keyed sentence found.

| id | verdict | level | reason |
| --- | --- | --- | --- |
| huisarts-vol | pass (edited) | comparable | key was the only option about the practice; all options now about Bo, key "te ver weg woont" |
| apotheek-controle | pass (edited) | comparable | prompt word "medicijn" recurred only in the key; prompt now names the recept |
| tandarts-poetstips | rejected | - | trivial fact, implausible distractors, non-government source, no new official fact (children covered is 033) |
| consultatiebureau-maand | pass (edited) | comparable | week/month/year scale; "een jaar" and "een week" not clearly false; options reworked |
| fysio-zonder-verwijzing | pass | comparable | fact verified; B and C both hospital specialists, both plainly false |
| hap-eigen-risico | pass (edited) | comparable | key odd one out in form; options parallel; fact stays true after 1 Jan 2027 |
| alarmnummer-europa | pass | easier | 112 in the EU verified; 0900-8844 and 999 false for Spain |
| rekening-apotheek | pass | comparable | condition set up in the prompt; verified |
| dossier-termijn -> dossier-logging | pass (edited) | comparable | term not in the 4.4.3 paraphrase; repaired to the logging right on the same page |
| zorgtoeslag-eenmalig | pass | comparable | verified; condition in the prompt; re-check yearly |
| mantelzorger-wie | pass (edited) | easier | respijtzorg and wijkverpleging replaced by plain options |
| slimme-meter | pass (edited) | easier | "meter" cue in the key only; options share "automatisch" |
| opzegvergoeding-vast | pass (edited) | comparable | "dynamisch" replaced by "prijs per uur"; key moved to C for balance |

## Answers to the coordinator's points

- **dossier-termijn (4.4.3).** The paraphrase says "administrative side of care is digital"; a one-month term does not follow from it, and the key was the middle of a three-step scale. Repaired toward the logging right on the same Rijksoverheid page ("U heeft het recht om te weten wie er in uw dossier heeft gekeken"), with a new picture (Bo on a sofa with a tablet) and id `dossier-logging`. The coordinator updates plan and notes references to the old slug.
- **tandarts-poetstips.** Rejected. The suggested repair (children under 18 covered by the basic insurance) is true on the Rijksoverheid page but is already tested by 033 tandarts-kind, which also states the adult side. No other official page states a plain tandarts fact that is not already used.
- **alarmnummer-europa and opzegvergoeding-vast.** Every distractor is false. 112: 0900-8844 is the Dutch police number for non-emergencies and 999 is the United Kingdom's number; Spain is in the EU. Opzegvergoeding: ACM states "Bij contracten met variabele en dynamische tarieven betaalt u geen opzegvergoeding"; only the vast tarief carries it.
- **hap-eigen-risico.** The Rijksoverheid page says that from 1 January 2027 the spoedeisende hulp bill is split into the visit and the care, and that you never pay more than your remaining eigen risico. The rule that eigen risico applies at the spoedeisende hulp and not at the huisartsenpost is unchanged, so card and key stay true. The explanation no longer says "gratis". Re-check yearly.

## Edits

See the `edits` list in `content/reviews/118-review.json` for the exact before and after of each field. In short: huisarts-vol (option B, evidence, explanation); apotheek-controle (prompt); consultatiebureau-maand (all three options and explanation); hap-eigen-risico (options A and B, explanation); dossier-termijn (whole item rewritten as dossier-logging); mantelzorger-wie (options B and C, explanation, source note); slimme-meter (options A, B, C, explanation); opzegvergoeding-vast (options and key, explanation, second source in the note).

## Rejected

- tandarts-poetstips (reasons above).

## Diversity and set notes

Eindterm facts are new against the existing items (apotheek-controle and rekening-apotheek share a Rijksoverheid page but test different sections; zorgtoeslag-eenmalig follows 019 DigiD with a different fact; mantelzorger-wie keys the term, not "de gemeente" as 006 and 109 do). 4.1.3 keeps two items after the rejection. Mantelzorg maps loosely to 4.5.1 (welzijn via the gemeente) through the card's third sentence. Fysio options B and C are both hospital specialists; acceptable.

## Media notes

Pictures are calm everyday scenes with no text and no visible answer. Bo appears in two briefs; the dossier picture was changed from a laptop to a tablet on the sofa so the pair differs. Keep the alarmnummer street free of signs and numbers, the meter box free of a display, and the tablet free of readable content. Audio after integration with `--keys` for the new clips only. Re-check yearly: hap-eigen-risico, zorgtoeslag-eenmalig, opzegvergoeding-vast.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Facts were read on 2026-11-22 only. The claim that 999 is not an emergency number in Spain rests on the Rijksoverheid statement that 112 is the number across the EU, not on a Spanish page.
