# Review of batch 117 (KNM batch F, theme 1)

## Meaning first (blind packet)

Packet hash of the author's file: 11c0b37e3e22e43fa44a4ffd88564a924316ab596052218a67daa5951503049c. Written before the full batch, keys, notes or assignment were opened. KNM items are fact cards with a persona or direct question, so the meaning check asks: does the card say something a real source would say, does the question follow from it, does the picture show the setting only.

- map-routes: card and question are one coherent statement about which inburgering routes include the MAP. Picture (two adults in a classroom) fits. Risk: the claim is a concrete legal fact; must be checked on a current official page. Question says "routes" (plural), so the answer is a pair.
- netwerken-werk: card is general advice ("Vertel veel mensen dat u werk zoekt") and the question asks what is an important way to find work. Coherent, but the card reads as an instruction and the source may be an anecdote. Check that an official page states it plainly.
- kansrijk-verdwijnt: card says why a profession leaves the list; the second reason ("als veel werkzoekenden dat beroep willen") reads as an extra, loosely supported claim. Question follows the card. Needs source check.
- diplomawaardering-werkgever: persona Imane has a foreign diploma; the card says the assessment is advice and is needed only when the employer asks. The question asks "Wanneer", which sets up the condition. Coherent.
- scholing-gemeente: persona on bijstand, card says the gemeente can offer training. Coherent, but the card says "kan", a soft claim; risk that the source does not state the condition. Same persona (Imane) as the previous item, allowed (two items).
- taken-functie-horeca: persona applies for a hospitality job; card says an employer may ask whether you can do the tasks of the job. Coherent and realistic. Distractors will need to be things an employer may not ask.
- wia-na-twee-jaar: persona is ill; card gives the two-year period and what WIA is. Coherent. The card explains WIA in plain words.
- ww-beschikbaar: persona is unemployed and applies for WW; card names the condition "direct beschikbaar". Coherent.
- proeftijd-vast: persona gets a permanent contract; card gives the maximum probation period. Coherent. Fact to confirm live.
- or-voorstellen: direct question about the works council with a card that answers it. Picture of colleagues at a coffee machine shows a workplace conversation, not the OR itself; acceptable as setting.
- loonheffingskorting-een-werkgever: persona with two side jobs; card states the one-employer rule. Coherent, real situation.
- discriminatie-melden-bureau: persona is discriminated at work; card names the reporting website. Coherent; sensitive topic is written calmly, the picture (a man in a warehouse) shows no incident.
- verplichte-zorgverzekering-zzp: persona starts as zzp; card says the basic health insurance is required and others not. Risk: the basic insurance is required for everyone living in the Netherlands, not only zzp'ers, so the zzp framing is loose.

Cast: Ufuk appears in two items, Imane in two; within the allowed limit.

Packet hash after repairs (rebuilt from the proposed bytes): `f8d8c3188b55ad0219d6c2ed874acd6878d80b208ae094739a3f9e494cb3e332`. The meaning check was repeated for the changed items (netwerken-werk, kansrijk-verdwijnt, diplomawaardering-werkgever, scholing-gemeente, loonheffingskorting-een-werkgever, bbz-bedrijfskapitaal); all stay coherent. The blind doubts about the card for netwerken (advice, anecdote), the extra reason in kansrijk, the soft "kan" in scholing and the zzp framing of the insurance item led to the edits below.

All 13 items are ordinary (no humour; KNM items are never jokes). Proposed file SHA-256: see `content/reviews/117-review.json` (`source_sha256`).

## Verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| map-routes | pass (edited) | comparable | MAP fact confirmed on the live Rijksoverheid page ("uitsluitend voor de B1- en Z-route"); URL and quote corrected. |
| netwerken-werk | pass (edited) | comparable | Anecdote ("volgens Pieter") replaced by the UWV statement on 70% of vacancies; new neutral picture. |
| kansrijk-verdwijnt | pass (edited) | comparable | Quote verbatim; "afneemt/populairder" replaced by plain words. |
| diplomawaardering-werkgever | pass (edited) | comparable | Page rule holds only when the diploma meets the job requirement; prompt and card now say so. |
| scholing-gemeente | pass (edited) | comparable | Now tests the purpose of scholing (what 1.1.5 names); the condition is on the page. |
| taken-functie-horeca | pass (edited) | comparable | Fact and quotes verified; explanation words simplified. |
| wia-na-twee-jaar | pass | comparable | Verbatim on the page; URL canonical. |
| ww-beschikbaar | pass | comparable | Verbatim on the page; URL canonical. |
| proeftijd-vast | pass (edited) | comparable | Live page says maximum 2 months for a vast dienstverband; note records this. |
| or-voorstellen | pass (edited) | comparable | Initiatiefrecht verbatim; terms simplified in the explanation. |
| loonheffingskorting-een-werkgever | pass (edited) | comparable | Card now ties the rule to the employer's inhouding (1.2.3); mapping still loose, accepted. |
| discriminatie-melden-bureau | pass (edited) | comparable | Fact verbatim; DUO distractor replaced by the Belastingdienst; page is general, mapping to 1.3.1 accepted. |
| bbz-bedrijfskapitaal (was verplichte-zorgverzekering-zzp) | pass (edited) | comparable | The basiszorgverzekering duty applies to everyone and the zzp page announces a pending AOV law; replaced by the stable Bbz fact. |

## Edits

The complete list with before and after text is in `content/reviews/117-review.json` (`edits`). In short:

- **netwerken-werk:** new source, card, question, options, evidence, explanation, title, picture brief and alt. The old picture (a handshake) showed the key. The source is an editorial UWV page dated 2024; a plainer page could not be opened because werk.nl blocks automated access. Check the figure yearly.
- **kansrijk-verdwijnt:** card, options, evidence and explanation in plain words (werkgevers zoeken minder medewerkers).
- **diplomawaardering-werkgever:** card and prompt carry the condition "diploma goed genoeg voor de baan"; explanation and note updated.
- **scholing-gemeente:** card, prompt, options, key (now A), evidence, explanation, URL and note; the condition ("uitkering van de gemeente") and the purpose sentence are both verbatim on the page. The earlier who-question had the same gemeente key as other items and did not test the importance of scholing.
- **loonheffingskorting-een-werkgever:** card explains inhouding; evidence follows.
- **discriminatie-melden-bureau, taken-functie-horeca, or-voorstellen:** distractor or explanation wording only.
- **map-routes, proeftijd-vast, wia, ww and others:** canonical source URLs and verbatim source notes. Cached copies of the proeftijd page disagreed; the live page was read and says 2 maanden for vast.
- **bbz-bedrijfskapitaal:** the item formerly named verplichte-zorgverzekering-zzp is replaced (new id, card, question, options, key C, source).

## Rejected items

None. One item (the zzp insurance question) was replaced by a new fact for the same eindterm instead of being rejected; its slug changed, so the coordinator must use the new id.

## Diversity and set notes

- Keys: A 5, B 4, C 4. Forms: nine direct or persona facts, no yes/no, no behaviour question.
- Every new item tests a different fact from the two existing items of its eindterm (checked against the catalogue): for example MAP routes (existing: topic of the MAP, Participatiewet), vacancies via netwerken (existing: uitzendbureau is free, werk.nl), initiatiefrecht (existing: what an OR is), reporting site (existing: where to ask advice).
- Gemeente is the key in only one new item (bbz); no other key repeats an institution.
- Imane and Ufuk appear in two items each, with the same three traits in both briefs.

## Media notes

Briefs show settings, not answers. The netwerken-werk brief was rewritten because the handshake picture showed networking. No picture shows text, numbers or screens with content. Question audio is needed for all 13 items. Pictures were not rendered by the reviewer.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Check yearly: the UWV 70 percent figure, the kansrijke-beroepenlijst, proeftijd maxima, MAP and Bbz rules, the loonheffingskorting rule.
- The netwerken-werk source is an editorial page around a UWV interview; if a plainer official page appears, replace it.
- Mapping notes: loonheffingskorting (1.2.3) and discriminatie (1.3.1) map loosely to their eindtermen; accepted, not strong.
