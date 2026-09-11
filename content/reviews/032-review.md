# Batch 032 editorial review (KNM, theme 2 Omgangsvormen, waarden en normen, second batch)

**Verdict:** Pass after edits. 12 of 12 items in the proposed file pass: 6 unchanged, 5 edited (no premise changed), 1 rejected as a repeat and replaced by the author's verified reserve. Ready for `npm run batch:adopt 032`.

**Reviewed source:** `content/batches/032-original.json`, SHA-256 `8285b65da6b4717918b859607f19096d800d11a2a69478c292beda1601f1c030` (matches the notes).
**Proposed file:** `content/batches/032-proposed.json`, SHA-256 `2e2791fc0fbaac48b5c2a08981954f6b4b57e25fd59018e5b3a4223edbf5b322` (recorded as `source_sha256` in `032-review.json`). No starters (closed items only).
**Review date:** 11 September 2026. Independent reviewer, fresh context; the items were judged before the author's notes were used to check the claimed source sentences.

## Method

- Read: blueprint §1, §3, §4.5, §5, §7, §8, §9, §10, §12, §13; research document §3.1 "KNM"; the rubric; the author brief; the KNM rules of `006-007-level-check.md` (no key decodable from the question, no prompt word only in the key, a yes/no key not the odd polarity out, no longest or most specific key, no "what should he do", cast traits verbatim, one neutral picture) and the 018 reviewer's edits (`018-review.md`); the 80 KNM items in `content/catalogue.json` (the twelve 018 items in full); `033-original.json` (12 KNM items, themes 1, 4, 6, 7, 8); `config/illustration.json`.
- Check 13 (decisive): every `sourceUrl` and every secondary page named in a `sourceNote` was fetched with curl into the scratch directory on 11 September 2026 (22 pages, all HTTP 200) and the supporting sentence located in the page text; five more pages were fetched to settle doubts (the Rijksoverheid "Maatregelen … vuurwerk" page, the 17 August 2026 news item, the RDW online-renewal page, the Meertens Instituut keyword bank, the 018 pages behind the Bevrijdingsdag and muisjes distractors). The Regeling inburgering 2021, bijlage 2, Thema 2 (wetten.overheid.nl, "Geldend van 18-04-2026 t/m heden") was read in full: the seven eindtermen 2.1.1–2.2.2 exist and the eindterm and indicator texts quoted in the notes and `sourceNote` fields match the page verbatim.
- Per item: the fourteen rubric points; key proved from the verbatim evidence; each distractor tested against the page for anchoring, plausibility and falsity; option length, specificity, polarity and prompt-word echo measured by script; §10 heuristics on prompt, options and fact card; picture brief against the cast; level judged against the official item described in research §3.1 (no exemplars in `content/exemplars/`).

## Checker output (proposed file)

```
npm run batch:check content/batches/032-proposed.json
Checked 12 items, 12 questions. Keys: {"A":4,"B":4,"C":4}. Options: {"3":12}.
No failures, no warnings.
```

Measured on the proposed file: prompts 12–19 words (limit 20); fact cards 27–38 words in 3–4 sentences, longest sentence 16, average 6.8–11.7 words per sentence; options 3–11 words, no key the longest option by more than two characters (three ties), no prompt word that recurs only in the key; every evidence a verbatim substring of `text`; ids, slugs and titles unused in the catalogue and in batch 033; cast traits verbatim for all eleven appearances; every brief ends in "no text"; alt texts neutral Dutch. Keys A 4 / B 4 / C 4, sequence A B C A B C A A C B C B (the replacement item keeps B, so no key letter moved).

## Per-item table

| # | id (`A2:knm:batch032-…`) | eindterm | verdict | level | one-line reason |
| --- | --- | --- | --- | --- | --- |
| 1 | carnaval | 2.1.1 (regio; carnaval also in 2.1.5) | pass | comparable | Rijksoverheid ties the carnaval school break to "het zuiden van Nederland", Maastricht calls it the city's largest volksfeest; "vooral" is the hedge; B the mirror, C the uniformity belief |
| 2 | ~~generatie~~ → overlijden | 2.2.2 | rejected → replaced | comparable | generatie repeats 018 omgangsvormen (same key sentence, same uniformity distractor, same persona frame); overlijden is the author's verified reserve: "niet eerder dan 36 uur … niet later dan 6 werkdagen" |
| 3 | direct-nee | 2.1.2 | pass (card and explanation edited) | comparable | the eindterm applied to a refusal; A and B are the two misreadings; glosses now both under "meestal" |
| 4 | direct-betekenis | 2.1.2 | pass (card trimmed) | comparable (easy end) | definitional "Wat betekent dat?"; the key cannot be decoded from "direct", B is the punctuality reading, C the opposite |
| 5 | gemeente-afspraak | 2.1.3 | pass (document changed) | comparable (easy end) | "alleen op afspraak" on three gemeente pages, "vooral" on a fourth; now an identiteitskaart because the RDW renews driving licences online |
| 6 | bevrijdingsdag | 2.1.5 | pass | comparable | "de nationale feestdag waarop we de bevrijding van Nederland in 1945 vieren"; B the 4 mei confusion, A Koningsdag; the reverse of 018 dodenherdenking, a different fact |
| 7 | kerstdagen | 2.1.5 | pass (prompt edited) | comparable | official list: 25 and 26 December; all three options are dates, the key not the odd one out |
| 8 | vuurwerk | 2.1.5 | pass (sourceNote edited) | comparable | consumer ban verified in force since 1 August 2026 (Rijksoverheid, Stb. 2026, 168); F1 exception is the key, total ban and the old 18:00 rule the distractors |
| 9 | suikerfeest | 2.1.5 | pass | comparable | not on the official list; "Scholen mogen leerlingen vrij geven … tijdens het Suikerfeest" and "Vertel dit vooraf aan de school"; ja / nee / nee, key shares polarity with B |
| 10 | contributie | 2.2.1 | pass | comparable (easy end) | Ondernemersplein: "Het geld van een vereniging komt binnen via de contributies die leden betalen"; A and C are the page's other two elements |
| 11 | jeugdfonds | 2.2.1 (loose: membership with a low income) | pass | comparable | Rijksoverheid: the fund "betaalt het lesgeld voor kinderen van wie de ouders het lidmaatschap niet kunnen betalen", "Elke gemeente ondersteunt huishoudens met een laag inkomen" |
| 12 | muisjes | 2.2.2 | pass (sourceNote edited) | comparable | erfgoed entry: "om te vieren dat er een baby is geboren, trakteert men beschuit met muisjes"; corroborated by the Meertens Instituut keyword bank; card hedged |

## Edits made (in the proposed file)

Key letters are unchanged in every edit; every evidence quote is a verbatim substring of its `text`.

1. **direct-nee — `text`** → "Veel mensen in Nederland zeggen direct wat zij willen. Een direct 'nee' op een uitnodiging is hier gewoon. Het is meestal geen teken van boosheid en ook geen einde van het contact." — the flat "En het betekent niet dat het contact voorbij is" went beyond what eindterm 2.1.2 supports; folded into the hedged sentence so "meestal" covers both glosses (the 018 directheid rule); 34 → 31 words. **`explanation`** last clause → "… en het betekent meestal ook niet dat de buurvrouw geen contact meer wil."
2. **direct-betekenis — `text`** → "Veel mensen in Nederland uiten zich direct. Dat betekent: zij zeggen open wat zij denken, ook als het kritiek is. 'Direct zijn' gaat over hoe mensen praten, niet over op tijd komen." — "en wat zij willen" dropped (the key says "wat zij denken") and the verbless fragment folded in; 36 → 32 words. **`evidence`** → "zij zeggen open wat zij denken".
3. **gemeente-afspraak — `questions[0].prompt`** → "Sabrina wil een nieuwe identiteitskaart aanvragen bij de gemeente. Hoe gaat dat bij veel gemeenten?" — the RDW renews driving licences online (rdw.nl "Rijbewijs online verlengen", any Dutch licence issued after 1 October 2006, collected afterwards at the gemeente), so for a rijbewijs the appointment answer was about to become the weaker real-world answer; an identiteitskaart is applied for in person and is named among the appointment-only products on the cited Amersfoort page. Tested fact unchanged. **`text`** and **`explanation`**: "rijbewijs" → "identiteitskaart". **`sourceNote`**: the ID-kaart product line and the RDW page added.
4. **kerstdagen — `questions[0].prompt`** → "Karim werkt in een magazijn. Wanneer is Kerstmis in Nederland een officiële feestdag?" — the original indirect question plus a second question ("Hij vraagt wanneer … is. Welke dag of dagen zijn dat?") was clumsy for a read-aloud item; the singular "feestdag" still hides the two-day answer; 19 → 13 words.
5. **vuurwerk — `sourceNote`** → cites the sentences verified on 11 September 2026 ("Vanaf 1 augustus 2026 is er een landelijk vuurwerkverbod voor consumenten.", "Klein vuurwerk van de categorie F1, zoals sterretjes en knalerwten, blijft toegestaan.", the 17 August 2026 news item "De nieuwe Wet veilige jaarwisseling is per 1 augustus van kracht.") and the Staatsblad entry-into-force article, in place of a 1 July news item that the theme page no longer shows; retire trigger spelled out. Learner-facing text unchanged.
6. **muisjes — `sourceNote`** → adds the Meertens Instituut (KNAW) Volkskundige Trefwoorden Bank, trefwoord "geboorte", which files "Beschuit met muisjes en andere gebruiken rond geboorte" (Strouken, 1991) under the birth customs. Learner-facing text unchanged.
7. **generatie → overlijden** (see Rejected items): the new item `A2:knm:batch032-overlijden:1` takes the same position with key B — prompt "De buurman van mevrouw Bakker is overleden. Wanneer is in Nederland de begrafenis of crematie?"; A "Nog op de dag van het overlijden zelf." B* "Binnen zes werkdagen na het overlijden." C "Meestal een maand na het overlijden."; card "Na een overlijden volgt in Nederland snel de begrafenis of crematie. Dat mag niet eerder dan 36 uur en uiterlijk zes werkdagen na het overlijden. Een latere datum mag alleen met toestemming van de burgemeester."; evidence "uiterlijk zes werkdagen na het overlijden"; picture mevrouw Bakker with white flowers in front of a neighbour's house, no hearse, coffin or cards. Options rebalanced from the author's draft so that the key (39 characters) is not the longest by more than two (38 and 36); the card rewritten from the author's two 20-word sentences into three of 11, 14 and 10 words.

Unchanged: carnaval, bevrijdingsdag, suikerfeest, contributie, jeugdfonds, and all options, image briefs and alt texts of the original items.

## Rejected items

- **generatie (`A2:knm:batch032-generatie:1`).** A repeat of the catalogue item `A2:knm:batch018-omgangsvormen:1`: the key is the same eindterm sentence ("Nee, zij verschillen per groep en generatie." against "Ze verschillen per groep, regio en generatie."), the main distractor is the same uniformity belief ("in heel Nederland precies hetzelfde" against "overal in Nederland precies hetzelfde") and the persona frame is the same ("woont sinds een jaar in Nederland" against "sinds kort"); only the third option ("alleen per regio") is new, and it does not carry a distinct fact. Rubric 11 and blueprint §9 count that as a repeat. Removed from the proposed file and replaced by the author's verified 2.2.2 reserve (overlijden), as the coordinator's brief allowed. 2.1.1 keeps carnaval here and omgangsvormen in 018 (two items in the bank).

## Decisions on the author's doubts

1. **generatie versus 018 omgangsvormen.** A repeat; swapped for the overlijden reserve (above).
2. **carnaval, "vooral in het zuiden".** Kept. The Rijksoverheid sentence itself localises the carnaval break to "veel scholen in het zuiden van Nederland", the Maastricht page calls it the city's largest volksfeest, and "vooral" is a hedge, not a stronger claim; the item stays under 2.1.1 (a concrete instance of "verschillen per regio") with 2.1.5 as the secondary mapping. The explanation's "in andere regio's meestal niet" is the same inference, hedged.
3. **vuurwerk under 2.1.5.** Kept with a retire note. Verified in force: Rijksoverheid "Regels vuurwerk afsteken" (present tense, "Voor consumenten geldt een vuurwerkverbod"), "Maatregelen …" ("Vanaf 1 augustus 2026 is er een landelijk vuurwerkverbod voor consumenten"), the news item of 17 August 2026, and Staatsblad 2026, 168 (Besluit veilige jaarwisseling, AMvB of 25 June 2026, published 1 July 2026, artikel III: in force 1 August 2026 after artikel IIa of the Wet veilige jaarwisseling; nota van toelichting 5.1 states the old 31 December 18:00 rule verbatim). The eindterm asks for knowledge of Oud en Nieuw; the ban is the Oud en Nieuw fact a newcomer needs this year, and the card names the holiday first. Re-check before every jaarwisseling; retire or rewrite if the consumer ban is repealed or the F1 exception changes.
4. **suikerfeest, "aan het einde van de ramadan".** Kept. It is a stable general definition, not a time-sensitive government fact (rubric 13 concerns law, benefits, agencies, procedures); no rijksoverheid.nl page defines the feast (searched again on 11 September 2026), the apposition is untested, and it helps a learner who does not know the Dutch name.
5. **kerstdagen, dates in all three options.** Confirmed parallel: three dates, the key not the most specific; only the prompt was made plainer.
6. **muisjes source.** Accepted with the hedged card, as the 018 reviewer accepted it for a distractor; the Meertens Instituut keyword bank was added as corroboration from a public research institute. The custom is not time-sensitive.
7. **gemeente-afspraak, "bij veel gemeenten" and batch 033.** The hedge stands on three "alleen op afspraak" pages (Amersfoort, Gouda, Utrecht), one "vooral" (Almere) and the eindterm's "doorgaans"; the tested fact (how, not where) differs from 033's paspoort-aanvragen and 007's reisdocument. The document was changed to an identiteitskaart for the RDW reason above.
8. **jeugdfonds scope.** Kept: the item answers the coordinator's membership request with a verified Rijksoverheid fact; the eindterm mapping is loose (recorded as such, like wegblijftarief in 018). The ledenvergadering reserve remains available for a third theme 2 batch.
9. **direct-nee glosses.** Kept, both now under "meestal" (edit 1).
10. **Topics not written (Sinterklaas, u/je, splitting the bill, weather talk, weddings).** Agreed: no primary source, nothing to add.
11. **Pictures.** All accepted; see media notes.

## Diversity and set assembly

- Against the catalogue: no slug, title or tested fact repeats after the swap. Nearest neighbours are the reverse pairs 5 mei / 4 mei (018 dodenherdenking) and muisjes / vlag (018 geslaagd), which test different facts; direct-nee and direct-betekenis sit beside 018 directheid on the same one-sentence eindterm but test a refusal and the meaning of the word rather than feedback at work. Batch 033 touches only through the gemeente (paspoort-aanvragen asks where, this item asks how).
- Within the batch: twelve settings (office coffee machine, a street of terraced houses, two front gardens, college classroom, desk at home, canal cycle path, warehouse, night balcony, walk to school, football pitch, kitchen table, neighbour's kitchen); cast Karim, Fatima, Amina, Sem, Sabrina twice each, Julio, Roos, Modibo, Hasan, mevrouw Bakker once; domains vrije-tijd-familie 5, werk 2, opleiding 2, instanties 2, wonen-buurt 1. Question forms: 8 persona facts, 2 definitional ("Wat betekent dat?", "Wat is dat?"), 2 yes/no with qualification (vuurwerk nee/nee/ja, suikerfeest ja/nee/nee; both keys share their polarity with a distractor); still no direct fact question without a persona, which a third theme 2 batch could add.
- Eindterm coverage with 018: 2.1.1 ×2, 2.1.2 ×3, 2.1.3 ×3, 2.1.4 ×3, 2.1.5 ×6, 2.2.1 ×3, 2.2.2 ×4 — every theme 2 eindterm at least twice for the launch bank.
- Drill order (easy first, no key letter three times in a row): contributie (B) → direct-betekenis (A) → kerstdagen (A) → bevrijdingsdag (C) → gemeente-afspraak (B) → carnaval (A) → muisjes (B) → direct-nee (C) → jeugdfonds (C) → vuurwerk (A) → suikerfeest (C) → overlijden (B). A ten-item drill drops direct-nee and kerstdagen (second items of 2.1.2 and 2.1.5) and keeps 3/4/3.

## Media notes

- Twelve single illustrations at 816×816 in the house style; cast traits verbatim in all briefs; every brief ends "no text".
- Answer-relevance risks for the contact sheet: muisjes shows the rusk the prompt names and must show no baby, cradle or card; bevrijdingsdag no flags or bunting; vuurwerk no fireworks; carnaval no costumes or map; overlijden no hearse, coffin or cards (white flowers and closed curtains are neutral); direct-nee's "both women relaxed" mildly weakens distractor A but is the honest picture of an ordinary refusal (the 018 directheid reasoning); suikerfeest shows the mother–daughter link from the cast note and nothing that chooses between the options.
- Question audio: prompt plus options for all twelve, from the proposed text; the kerstdagen and gemeente-afspraak prompts and the whole overlijden item differ from the original.

## Retire triggers

vuurwerk: before every jaarwisseling (new law; repeal or a changed F1 exception retires it). gemeente-afspraak: gemeente pages yearly; the identiteitskaart stays in person, the rijbewijs is deliberately not the scenario (RDW online renewal). jeugdfonds: yearly (fund conditions and age limit; the tested fact is stable). overlijden: yearly (Wet op de lijkbezorging under modernisation; the 36-hour and six-working-day terms are the tested fact). kerstdagen, bevrijdingsdag, suikerfeest: the officiële feestdagen list, yearly and trivial. carnaval, direct-nee, direct-betekenis, contributie, muisjes: stable customs and statute.

## Limitations

- AI editorial review; no independent educator review, learner trial or psychometric calibration; A2 remains an authoring target and nothing here claims official equivalence.
- Level is judged against the description of the official item in the research document, not against a stored exemplar.
- Pictures and audio do not exist yet; briefs were judged as text.
- The overlijden item was written by the reviewer from the author's verified reserve; its wording has had one pair of eyes, not two.
- Items 3 and 4 rest on the eindterm text alone, the only primary statement of the directness custom; the muisjes custom rests on a heritage entry plus a folklore bibliography rather than a government page; the Suikerfeest definition is untested general knowledge.
