# Batch 018 editorial review (KNM, theme 2 Omgangsvormen, waarden en normen)

**Verdict:** Pass after edits. 12 of 12 items pass in the proposed file; 4 unchanged, 8 edited (option or wording repairs, no premise changed); 0 rejected. Ready for `npm run batch:adopt 018`.

**Reviewed source:** `content/batches/018-original.json`, SHA-256 `d1ef87f3eae449ae8e8415cc0a1ec0cdaecf8f1181c4d791a7b4315f6523a847` (matches the notes).
**Proposed file:** `content/batches/018-proposed.json`, SHA-256 `ad66645abd1430444fe194f4148337f7f76145ddf44812667f48b7fc34f549c0` (recorded as `source_sha256` in `018-review.json`). No starters (closed items only).
**Review date:** 10 September 2026. Independent reviewer; the batch was not authored by the reviewer. Items were judged before the author's notes were used to check the claimed source sentences.

## Method

- Read: blueprint §1, §3, §4.5, §5, §7, §8, §10, §12, §13; research document §3.1 "KNM"; the rubric; the author brief; `006-007-level-check.md` (the KNM rules: no key decodable from the question, no prompt word only in the key, yes/no key not the odd polarity out, no longest key, no "what should you do", one clear picture with cast traits verbatim); the 56 KNM items in `content/catalogue.json`; `config/illustration.json`. `019-original.json` does not exist; batches 020–025 hold no KNM items.
- Check 13 (decisive): every `sourceUrl` and every secondary page named in a `sourceNote` was fetched with curl into the scratch directory on 10 September 2026 — 17 pages, all HTTP 200 — and the supporting sentence was located in the page text. The Regeling inburgering 2021 on wetten.overheid.nl (`Geldend van 18-04-2026 t/m heden`, bijlage 2, Thema 2) was read in full; the seven eindterm numbers exist, belong to theme 2, and the eindterm and indicator texts quoted in the `sourceNote` fields match the page verbatim (2.1.1, 2.1.2, 2.1.3 indicator, 2.1.4 indicator, 2.2.1 indicator). Burgerlijk Wetboek Boek 1 artikel 30 lid 1 read on wetten.overheid.nl (`Geldend van 05-07-2025`). Two extra pages were fetched for edits: the Rijksoverheid FAQ on the Herdenkingsjaar Slavernijverleden (Keti Koti, 1 juli) and the vlag page's vlaginstructie (Koninkrijksdag, 15 december); the Rijksoverheid page on the vrijwilligersvergoeding returned 404, which is why item 10's explanation was trimmed.
- Per item: the fourteen rubric points; key proved from the verbatim evidence; each distractor tested for anchoring, plausibility and falsity by the page; option length, specificity, polarity and prompt-word echo measured by script; A2 heuristics (§10) on prompt, options and fact text; picture brief against the cast; level verdict against the official item described in research §3.1 (no exemplars exist in `content/exemplars/`).

## Checker output (proposed file)

```
npm run batch:check content/batches/018-proposed.json
Checked 12 items, 12 questions. Keys: {"A":4,"B":4,"C":4}. Options: {"3":12}.
No failures, no warnings.
```

Measured on the proposed file: prompts 11–19 words (limit 20); fact cards 19–30 words in 2–3 sentences, longest sentence 15, average 7.7–11.0 words per sentence; options 5–9 words, no key the longest by more than two characters, no prompt word that recurs only in the key; every evidence a verbatim substring of `text`; ids and slugs unique and unused in the catalogue; cast traits verbatim for all eight characters; every brief ends in "no text"; all alt texts neutral Dutch. Keys A 4 / B 4 / C 4, sequence A B C A B C A C B C A B (unchanged: no edit moved a key letter).

## Per-item table

| # | id (`A2:knm:batch018-…`) | eindterm | verdict | level | one-line reason |
| --- | --- | --- | --- | --- | --- |
| 1 | omgangsvormen | 2.1.1 | pass (explanation edited) | comparable (easy end) | the eindterm's own statement; B and C are the two beliefs it was written against; the key is a general truth a learner may reach without study |
| 2 | directheid | 2.1.2 | pass (text edited) | comparable | key entailed by "veel mensen … zich direct kunnen uiten"; C is the real misreading; gloss now hedged with "meestal" |
| 3 | op-tijd | 2.1.3 | pass | easier (common-sense key), no flag | the indicator's literal fact; the key is what a ten o'clock appointment means in any reading, so it tests a value more than knowledge; exam-shaped, use first in the drill |
| 4 | wegblijftarief | 2.1.3 | pass | comparable | "mag … een rekening sturen" is the page's rule; "Wat mag het ziekenhuis doen?" asks for a right, not for behaviour |
| 5 | gelijk-geslacht | 2.1.4 | pass (option A edited) | comparable | BW1 art. 30 lid 1 verbatim; distractors no longer both "alleen"-prohibitive |
| 6 | burgerlijk-huwelijk | 2.1.4 | pass (options edited) | comparable | Rijksoverheid: ceremony only after the civil marriage; options now share one frame |
| 7 | samenwonen | 2.1.4 | pass | comparable (easy end) | indicator "ongehuwd samenwonen … vaak voorkomt"; ja / ja-maar / nee, key shares polarity with B |
| 8 | dodenherdenking | 2.1.5 | pass (option B edited) | comparable | page: 4 mei, 20:00–20:02, "herdenkt Nederland allen …"; key no longer the only "herdacht" option |
| 9 | koningsdag | 2.1.5 | pass (options edited) | comparable (easy end) | Koninklijk Huis + Rijksoverheid; date removed from the key; "Koningsdag" narrows to B/C by the word, the trouwdag distractor carries the test |
| 10 | vrijwilligerswerk | 2.2.1 | pass (explanation edited) | comparable (easy end) | "onbetaald en onverplicht" on the page; "vrijwilliger" decodes the free-choice half, the unpaid half is the test |
| 11 | geslaagd | 2.2.2 | pass | comparable | vlag page: flag at "het slagen voor een examen", halfstok at a death; muisjes = birth |
| 12 | trakteren | 2.2.2 | pass (option C edited) | comparable | Voedingscentrum presupposes and describes the custom and its shift; distractor C now an actor confusion |

## Edits made (in the proposed file)

Key letters are unchanged in every edit; every evidence quote is still a verbatim substring of its `text`.

1. **omgangsvormen — `questions[0].explanation`** → "Omgangsvormen en gewoonten kunnen in Nederland verschillen per sociale groep, regio en generatie. Ze zijn dus niet overal precies hetzelfde. Ze staan ook niet in de wet: een wet geldt voor iedereen, een gewoonte niet." — the original ended "alleen wetten gelden voor iedereen", which reads as if norms bind nobody; the new sentence states the law/custom contrast distractor C confuses.
2. **directheid — `text`** → "Veel mensen in Nederland zeggen direct wat zij denken of willen. Dat is hier een gewone manier van praten. Het is meestal geen teken van boosheid." — the flat "geen teken van boosheid" overstated what eindterm 2.1.2 supports; "meestal" matches the prompt and the explanation; split into three sentences to keep the A2 average under 12 words (my first version triggered the checker's 12.5 warning). Evidence unchanged.
3. **gelijk-geslacht — `options.A`** → "Zij moeten eerst een geregistreerd partnerschap sluiten." — A and C both carried "alleen" and were both prohibitive, so the key was the odd polarity out and the only option without an absolute term (§5; 006-007 level check). The partnership confusion stays, now as a false requirement. **`explanation`** → "… Een geregistreerd partnerschap of samenwonen kan ook, maar dat is niet verplicht en niet de enige mogelijkheid."
4. **burgerlijk-huwelijk — `options`** → A "Zij hoeven alleen in de moskee te trouwen." B "Zij mogen in Nederland niet in een moskee trouwen." C* "Zij moeten eerst bij de gemeente trouwen." — the distractors shared the frame "Trouwen in de moskee is …" and the key did not (the reisdocument failure of the 007 review); now hoeven / mogen / moeten in one frame, key the shortest. **`explanation`** → "Voor de wet telt alleen het huwelijk bij de ambtenaar van de burgerlijke stand van de gemeente. Een religieuze ceremonie in een kerk of moskee is toegestaan, maar pas nadat het burgerlijk huwelijk is gesloten: eerst de gemeente, daarna de moskee."
5. **dodenherdenking — `options.B`** → "Het einde van de slavernij wordt herdacht." — A and B both ended "wordt gevierd" and only the key "worden herdacht"; the new B (Keti Koti, 1 juli, in eindterm 2.1.5) shares "herdacht" with the key and "Het einde van de" with A, so no option is the odd one out on every axis. Verified on rijksoverheid.nl: "Op 1 juli 1863 werd de slavernij in de voormalige koloniën formeel afgeschaft. Het is ook de datum waarop de Nationale Herdenking Slavernijverleden plaatsvindt." **`explanation`** → "… Het einde van de oorlog wordt gevierd op 5 mei, Bevrijdingsdag. Het einde van de slavernij wordt herdacht op 1 juli, Keti Koti." **`sourceNote`** → adds that page for distractor B.
6. **koningsdag — `options.B`** → "De verjaardag van de Koning." and **`options.C`** → "De trouwdag van de Koning." — the key alone carried a date ("op 27 april"), the most specific option (§5); C shortened to the key's five-word frame so the key does not stand alone in length; A (the Koninkrijksdag confusion, 15 december in the vlaginstructie) stays. **`explanation`** → "… Het is niet zijn trouwdag en niet de dag waarop Nederland een koninkrijk werd."
7. **vrijwilligerswerk — `questions[0].explanation`** → "Vrijwilligerswerk is werk dat u onbetaald en uit vrije wil doet voor anderen of voor de samenleving, bijvoorbeeld bij een sportclub. Een vrijwilliger krijgt geen loon en kiest zelf voor dit werk; het is geen plicht." — "hoogstens een kleine onkostenvergoeding" is not on the cited page (the Rijksoverheid vergoeding page returned 404) and its yearly limit is untested.
8. **trakteren — `options.C`** → "De juf trakteert de hele klas." — "De juf geeft de klas vrij" was an invented rule anchored in nothing (rubric 7); the new C is the who-treats-whom confusion, grounded in the custom and false by "Het deelt zelf iets kleins uit". **`explanation`** → "Op veel basisscholen trakteert de jarige: het jarige kind deelt zelf iets kleins uit aan de klas. De juf deelt niets uit, en de klas geeft de jarige geen cadeau. Sommige scholen vieren een verjaardag zonder traktatie, met een feestje in de klas."

Unchanged: op-tijd, wegblijftarief, samenwonen, geslaagd, and all prompts, evidence quotes, image briefs and alt texts.

## Rejected items

None.

## Decisions on the author's doubts

1. **Eindterm as the primary source (items 1, 2, 3).** Accepted. For a custom the Regeling is the normative statement of what the exam tests; batch 007 did the same for 7.2.3, and no rijksoverheid.nl page states these customs. The quoted eindterm texts match the page verbatim. Keep the wetten.overheid.nl URL as cited (the `#Bijlage2` fragment is harmless to curl).
2. **"geen teken van boosheid" (item 2).** Kept, hedged: the key "een gewone manier van praten" is entailed by "veel mensen … zich direct kunnen uiten"; the anger clause is the misreading the eindterm exists to prevent, but stated flatly it went beyond the source, so it now reads "meestal geen teken van boosheid" in its own sentence.
3. **Common-sense key (item 3).** Verdict easier, flag none: the key is reached by the literal reading of "afspraak om tien uur", but the item is exam-shaped, tests the indicator's own fact, and both distractors are real beliefs; place it first in the drill (the sollicitatie precedent in the 006-007 check).
4. **"Wat mag het ziekenhuis doen?" (item 4).** Read as a rule question about the hospital's right; not a behaviour question. The hospital setting is right because the page speaks only of hospitals.
5. **Date in the key (item 9).** Not accepted: the date made the key the most specific option; removed, lengths rebalanced by shortening C.
6. **Topics without a theme 2 eindterm.** Agreed; nothing to add.
7. **Voedingscentrum as source (item 12).** Accepted: a responsible public body, the custom is not time-sensitive, both pages presuppose the custom ("wil je trakteren", "Wordt er bij jullie op school … nog getrakteerd?") and describe the shift, and the fact card already says some schools celebrate without a treat. Re-check yearly as the author proposes.
8. **Schooltas clause (item 11).** Kept: it is untested, it is the recognisable form of the custom, and the minister's "zoals de jaarlijkse traditie" on rijksoverheid.nl is a government statement of it (page fetched, quote verbatim).
9. **"vriendin" (item 5).** Kept; unambiguous after "wil trouwen met".
10. **Pictures.** All accepted; see media notes.

## Diversity and set assembly

- The catalogue holds no theme 2 item; the 56 KNM items cover themes 1, 3, 4, 6, 7, 8 and the eight batch-003 study cards. No slug, title or fact repeats; the nearest neighbours the author lists (zelfbeschikking, verwijsbrief/eigenrisico, bijstandsplicht, wetten, ouderbijdrage) test different facts. Batches 020–025 contain no KNM items.
- Within the batch: twelve settings (village square, office, office entrance, two living rooms, park bench, flat doorway, town square at dusk, vrijmarkt, sports field, front door, classroom), eight cast members none more than twice, domains vrije-tijd-familie 9 / werk 2 / gezondheid 1 (the theme is about family and free time). Question forms: 11 persona facts, 1 yes/no with qualification; no direct-fact question, which the next theme 2 batch could add.
- Eindterm coverage: all seven eindtermen of theme 2; 2.1.3, 2.1.4 (three) and 2.1.5 twice or more; 2.1.1, 2.1.2 and 2.2.1 once. For the launch bank's "every eindterm at least twice" the next theme 2 batch should add: 5 mei / Bevrijdingsdag, an official Christian holiday (Pasen or Kerst) or Oud en Nieuw, a Suikerfeest or Sinterklaas item if a primary source exists, a second 2.1.2 angle, verenigingen/contributie (2.2.1), and geboorte (beschuit met muisjes, the erfgoed page is weaker), bruiloft or overlijden (2.2.2). The author's reserve list has verified sentences for Keti Koti, Bevrijdingsdag, officiële feestdagen and vrijwilligerswerk naast een uitkering.
- Drill order (one theme, easy first, no key letter three times in a row): op-tijd (C) → samenwonen (A) → koningsdag (B) → vrijwilligerswerk (C) → omgangsvormen (A) → directheid (B) → geslaagd (A) → trakteren (B) → gelijk-geslacht (B) → burgerlijk-huwelijk (C) → dodenherdenking (C) → wegblijftarief (A). A ten-item drill can drop op-tijd and wegblijftarief (both 2.1.3) and keep 3/4/3.

## Media notes

- Twelve single illustrations at 816×816 in the house style; cast traits verbatim in all twelve briefs (Karim ×2, Julio ×2, Roos ×2, Amina ×2, Fatima, meneer De Vries, mevrouw Bakker, Sem).
- Answer-relevance risks to check on the contact sheet: geslaagd must show no flag; dodenherdenking no monument, flag or wreath; trakteren nothing being handed out (the decorated chair and paper crown are the feestbeleid page's own description and neutral); directheid's "both calm" mildly weakens distractor C but is the honest picture of "een gewone manier van praten" (a frowning colleague would contradict the key, which is worse); koningsdag's orange crowd cues the day already named in the prompt, not the answer; gelijk-geslacht shows the couple the prompt names, not the law.
- Question audio: prompt plus options for all twelve; the edited options (items 5, 6, 8, 9, 12) must be generated from the proposed text.

## Retire triggers

koningsdag: change of monarch (rewrite). trakteren: yearly check whether the feestbeleid has become the norm. wegblijftarief: yearly check of the Rijksoverheid page (amounts are not tested). Everything else is constitutional, statutory (BW1 art. 30, art. 68) or a stable custom.

## Limitations

- AI editorial review; no independent educator review, learner trial or psychometric calibration; A2 remains an authoring target and nothing here claims official equivalence.
- Level is judged against the description of the official item in the research document, not against a stored exemplar.
- Pictures and audio do not exist yet; briefs were judged as text.
- Items 1–3 rest on the eindterm text alone, which is the only primary statement of those customs; a learner-facing government page for them was not found.
