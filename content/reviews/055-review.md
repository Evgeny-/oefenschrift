# Batch 055 independent review (A2 KNM, 9 items)

This is an independent AI editorial review by a separate-context reviewer who did not write the batch. Sources were checked on 14 October 2026. The review covers `content/batches/055-original.json` against `tmp/content-fix-2026-10-14/base/055-base.json` and spec `tmp/content-fix-2026-10-14/spec/055.md`.

- Proposed file: `content/batches/055-proposed.json`
- SHA-256: `7aa9394d526b37cd941c2aadab4cde0499c6d7ee873fc63b4b8fecaa5ba39f96`
- Batch verdict: **pass**, ready for integration.
- Replacement batch: `replaces` lists all 9 IDs, all already in the catalogue.

## Verdicts

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| A2:knm:batch006-eigenrisico:1 | pass (edited) | comparable | Spec fix done. Reviewer reworded C so the key is no longer the only "Nee" option. |
| A2:knm:batch033-schoolvakantie:1 | pass (edited) | comparable | Spec fix done. Reviewer edits close the parent link and remove the "Fatima only in the key" echo. |
| A2:knm:batch032-direct-nee:1 | pass (edited) | comparable | Spec fix done; new sourceUrl correct. Reviewer replaced the "boos" distractor shared with batch018-directheid. |
| A2:knm:batch019-scholing:1 | pass | comparable | Card states the FAQ rule; key proven. Prompt, options and clip unchanged. |
| A2:knm:batch006-stroomstoring:1 | pass | comparable | 112 sentence matches the 112 page. Key logic holds. Clip unchanged. |
| A2:knm:batch007-kinderopvangtoeslag:1 | pass | comparable | Natural 20-word prompt. All options are regelingen. |
| A2:knm:batch007-bezwaar:1 | pass | comparable | Evidence includes the six weeks. The police distractor is clearly false by the card. |
| A2:knm:batch006-huisartsenpost:1 | pass (edited) | comparable | Spec fix done. Reviewer removed the longest-key and "huisarts" echo cues and extended the evidence. |
| A2:knm:batch032-jeugdfonds:1 | pass | comparable | The hedge matches the fund's FAQ. Clip unchanged. |

Counts: 9 pass, 4 of them edited, 0 rejected. Keys: B C A C B A B A C (A 3, B 3, C 3). Items 4, 5 and 9 keep their base keys, prompts and options byte for byte. No explanation names an option letter.

## Edits made in the proposed file

1. **eigenrisico, option C**: "Ja, maar alleen bij een bezoek 's avonds." → "Nee, maar bij een bezoek 's avonds wel."
   - The author's C left the key as the only "Nee" against two "Ja" options. The review brief forbids a key that is the odd polarity out; the base had Ja/Nee/Nee.
   - The misconception is unchanged: an evening or huisartsenpost visit costs eigen risico.
   - It is still false by the card's unconditional exemption and by the source ("huisartsenzorg (waaronder de huisartsenpost)").
2. **schoolvakantie, prompt**: adds "haar dochter": "Fatima wil in oktober met haar dochter Amina op vakantie, buiten de schoolvakanties. Mag Amina dan vrij van school?" (19 words).
   - C now names Fatima, so the key applies the card's exception for "ouders" to her.
   - Only the cast note, which learners never see, said she is Amina's mother.
3. **schoolvakantie, option A**: "Ja, ouders bepalen zelf wanneer hun kind vrij is." → "Ja, Fatima bepaalt zelf wanneer Amina vrij is."
   - After the spec's fix, the prompt word "Fatima" occurred only in the key.
   - The misconception (the parents decide) and its falsity by the card are unchanged.
4. **direct-nee, option B**: "De buurvrouw is boos op haar." → "De buurvrouw wil wel, maar zegt eerst nee."
   - The rewrite asks the same "usual meaning" question as batch018-directheid, with the same key idea and the same "boos" distractor. The audit lists this as a low near-duplicate finding.
   - The new distractor tests the misconception that belongs to a refused invitation: a polite first "no" that hides a yes. It is the author's own suggestion in doubt 3, reworded.
   - It is false by "zeggen direct wat zij willen".
5. **direct-nee, explanation**: last sentence → "Zij bedoelt dus echt nee. Het betekent ook niet dat zij al het contact wil stoppen." This follows from edit 4.
6. **direct-nee, sourceNote**: the distractor sentence → "Distractors add an unsupported hidden wish (a polite first 'no') or a permanent intention." This follows from edit 4.
7. **huisartsenpost, option A (key)**: "Huisartsenzorg als de eigen praktijk dicht is." → "Een dokter als de praktijk dicht is."
   - The old key was the longest option by 10 characters, and it was the only option echoing the prompt's "huisarts(enpost)".
   - Lengths are now 36/36/35.
8. **huisartsenpost, evidence**: now the full card.
   - The old quote, "Dan kunt u voor spoed terecht …", left out the condition "Is de huisartsenpraktijk dicht …", on which the key rests.

All eight edits are in items whose question audio is regenerated anyway. Exact before and after strings are in `055-review.json`.

## Decisions on the author's doubts

- **Bezwaar (7)**: keep "Hij mag bij de politie bezwaar maken.".
  - The spec's "kan de politie vragen …" is trivially true, like the removed aangifte option.
  - The card and Awb 6:4 make the police distractor false. Awb 6:15 only forwards a misdirected bezwaarschrift; it is not a right to object at the police.
- **Scholing (4)**: agree with leaving out "De cursus telt als werktijd".
  - It is true under BW 7:611a lid 2, but the cited FAQ does not say it.
  - "Als het kan, volgt u de cursus in werktijd." is supported.
- **Direct nee (3)**: keep "direct". It is the card's and the eindterm's word, and both readings give the same key. The closeness to batch018 is resolved by edit 4.
- **Kinderopvangtoeslag (6)**: keep "de kosten". It refers to the kinderdagverblijf just mentioned, and the card calls kinderbijslag "een andere regeling". The key is longer only because the options are single official names; accepted.
- **Huisartsenpost (8)**: fixed by edits 7 and 8.
- **Schoolvakantie (2)**: keep the qualified "Alleen als …" key.
  - It is the blueprint's KNM yes/no-with-qualification form, and B ties it for length.
  - The stale label "The 5-to-18 sentence" in the sourceNote is metadata only; its quote is still verbatim.
- **Stroomstoring (5)**: keep the explanation.
  - The item's source names the netbeheerder; "elektriciteitsmaatschappij" (112 page) and "leverancier van de nutsvoorziening" (eindterm 3.2.1) are generic.
  - No option names the supplier.
  - The Rijksoverheid energierekening page confirms that the supplier issues the bill.
- **Jeugdfonds (9)**: the hedge is right. The fund works with "veel" gemeenten, reviews each application and "meestal" pays most or all of the fee.
  - Option B ("De school of de sportleraar") was tested: a teacher can forward an application, but the school does not pay, so C is clearly best.
- **Eigen risico (1)**: the card's exemption has no conditions, which is enough; "meestal" for medicines is correct, because insurers may exclude some.

## KNM verification (all accessed 2026-10-14)

Each page was opened with WebFetch and downloaded, so the quotes could be checked by grep. Every quote in the nine sourceNotes is verbatim on the current page.

| Item | URL | Confirms |
| --- | --- | --- |
| 1 | rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/eigen-risico-zorgverzekering | No eigen risico for "huisartsenzorg (waaronder de huisartsenpost)". The amount is € 385 in 2026. Insurers may exclude medicines. |
| 1 | rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartskosten-op-zorgnota | A huisarts visit is not charged to the eigen risico; extra tests and prescribed medicines are. The huisartsenpost is fully reimbursed. The insurer pays the huisarts. |
| 2 | rijksoverheid.nl/vraag-en-antwoord/leerplicht/leerplicht-schoolvakanties | The ban and fine, the work exception, the directeur, max 10 days once a year, not in the first 2 weeks after the summer. |
| 2 | rijksoverheid.nl/themas/onderwijs/leerplicht/geoorloofd-schoolverzuim-en-spijbelen | "Jongeren tussen de 5 en 18 jaar moeten onderwijs volgen." |
| 3 (and all eindtermen) | wetten.overheid.nl/BWBR0045574/2026-10-07#Bijlage2 | "Geldend van 07-10-2026 t/m heden". The old version runs 18-04-2026 to 06-10-2026. Bijlage 2 is identical in both, in force since 2025-07-01. Eindterm 2.1.2 is verbatim. The nine eindterm mappings hold. |
| 4 | rijksoverheid.nl/documenten/2022/08/02/faq-transparante-arbeidsvoorwaarden and the linked SZW FAQ PDF | Compulsory training is free; it is in working time where reasonably possible; the computer-system example. The PDF was read with pdftotext because WebFetch cannot decode it. BW 7:611a (version from 08-10-2026) was checked as background. |
| 5 | rijksoverheid.nl/vraag-en-antwoord/energie-thuis/vragen-over-gas-of-stroomstoringen | Outages go to the netbeheerder, number 0800-9009. |
| 5 | rijksoverheid.nl/vraag-en-antwoord/alarmnummer-112/wanneer-112-bellen | 112 is for "levensbedreigende en heterdaad situaties", fire and a crime. A street-wide power cut is not a 112 case. |
| 6 | rijksoverheid.nl/vraag-en-antwoord/kinderopvangtoeslag/wanneer-heb-ik-recht-op-kinderopvangtoeslag | Definition and conditions. |
| 6 | rijksoverheid.nl/onderwerpen/kinderbijslag/vraag-en-antwoord/hoe-vraag-ik-kinderbijslag-aan | Kinderbijslag comes from the SVB. |
| 6 | rijksoverheid.nl/actueel/nieuws/2026/09/21/… | The bill went to the Raad van State. A subsidy replaces the toeslag "vanaf 2029". The toeslag is higher in 2027. |
| 7 | rijksoverheid.nl/vraag-en-antwoord/bezwaar-en-beroep/bezwaar-tegen-beslissing-overheid | Bezwaar goes to the deciding organisation within 6 weeks. The page does not mention the police. Awb 6:4, 6:7 and 6:15 (version from 15-08-2026) were checked as background. |
| 8 | rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartsenpost-spoedeisende-hulp | When the practice is closed, you go to the huisartsenpost. Contact it before the SEH, except in a life-threatening situation (112). |
| 8 | rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/ben-ik-vrij-om-zelf-een-huisarts-te-kiezen-en-hoe-verander-ik-van-huisarts | "in de avond, nacht of in het weekend kunt u gebruikmaken van een huisartsenpost" |
| 9 | rijksoverheid.nl/themas/familie-zorg-en-gezondheid/sport-en-bewegen/sporten-en-bewegen-voor-kinderen | The government supports the Jeugdfonds, which pays lesgeld. |
| 9 | jeugdfondssportencultuur.nl/veelgestelde-vragen/ | "veel" gemeenten; local funds; each application reviewed; "Meestal" a large part or all of the fee. |
| 9 | rijksoverheid.nl/vraag-en-antwoord/armoedebestrijding/kan-ik-ondersteuning-voor-mijn-kinderen-krijgen | Every gemeente supports low incomes, for example with a kindpakket. |

## Rejected items

None.

## Diversity and set assembly

- The batch spans themes 1, 2, 2, 3, 4, 4, 6, 8 and 8, with different settings and concepts.
- After edit 4, the three items on eindterm 2.1.2 test different things:
  - batch032-direct-betekenis: the definition of being direct;
  - batch018-directheid: directness is not anger or a complaint;
  - batch032-direct-nee: a "nee" means no; it is not a polite first refusal and not an end to contact.
- In set knm-knm-05, eigenrisico and huisartsenpost complement each other; neither card nor explanation gives away the other item's key.

## Media notes

- **New question audio** (one narrator reading of the prompt plus "A. …", "B. …" and "C. …") is needed for six clips. They are the same six the author listed; the reviewer edits add none:
  - `A2:knm:batch006-eigenrisico:1#q1`
  - `A2:knm:batch033-schoolvakantie:1#q1`
  - `A2:knm:batch032-direct-nee:1#q1`
  - `A2:knm:batch007-kinderopvangtoeslag:1#q1`
  - `A2:knm:batch007-bezwaar:1#q1`
  - `A2:knm:batch006-huisartsenpost:1#q1`
- **Stale clips after regeneration:** `audio/4f3aec5e518cf3eb.mp3`, `76fb1dbe352b3f5e.mp3`, `110f086e255689f7.mp3`, `2de91818093413ee.mp3`, `3637f6ea9d51027b.mp3`, `55c80917c581655e.mp3`.
- **Still valid:** the clips for scholing, stroomstoring and jeugdfonds (`8e45f096eb359778`, `a28279c95d3c6821`, `7613891600bfbfdd`). Their spoken text equals the manifest text.
- **Images:** no brief changed, so no new drawings are needed. Only the huisartsenpost alt changed (the author's edit).

## For the coordinator

1. Run `npm run batch:adopt 055`. It verifies the hash above. There is no starters file.
2. After integration, generate the six clips with the round trip, then prune the stale ones.
3. Optional: relabel the "5-to-18 sentence" wording in the schoolvakantie sourceNote later.
4. Recheck the time-sensitive items:
   - kinderopvangtoeslag: retire when the toeslag is replaced, planned for 2029;
   - the Jeugdfonds conditions: yearly;
   - the scholing source: BW 7:611a has a change scheduled for 01-01-2028.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Prompts or options changed in six items, so new question audio still needs generation and a transcription round trip.
- Facts are as published on 14 October 2026.
- Level verdicts compare each item with the official KNM item form in the blueprint, not with calibrated data.
- Spoken naturalness was judged from the text.
