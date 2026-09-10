# Batch 024 editorial review (B1 Lezen: studieboek, opiniestuk, examenreglement)

**Verdict:** pass after edits. Three texts, twenty questions; all three items pass in the proposed file. No item rejected. Ten edits made (four required, six recommended); no key letter, evidence span or question design changed.

**Reviewed source:** `content/batches/024-original.json`, SHA-256 `f5dfba436654ee60b9dccd90a89b82c1f1fac771ef7c98c72cbc023db22d8114` (matches the task).
**Proposed file:** `content/batches/024-proposed.json`, SHA-256 `ca005d70c3768dde5733097c4a4a4a13f5a9811b8f95932faabe2da8bf869c8e` (recorded as `source_sha256` in `024-review.json`; `npm run batch:check` on it: "Checked 3 items, 20 questions. Keys: {"A":7,"B":6,"C":7}. Options: {"3":20}. No failures, no warnings.").
**No starters** (closed items only). **Review date:** 2026-09-10, fresh context; the batch was judged before the author's notes were read; the notes were then used to check the distractor rationales and to decide the doubts in their section 8.

## 1. Item verdicts

| id | verdict | level | reason |
| --- | --- | --- | --- |
| `B1:reading:batch024-klachtenafhandeling:1` (studieboek · descriptief · werk, 693 words, 7 Q, keys ABCACBC) | pass (edited) | comparable | Textbook page in the official shape: three procedural steps, a plain-terms law paragraph, a worked example; every key proven from a 2–4-sentence span with paraphrase (goedmaken/herstellen, op tijd/binnen een redelijke tijd, kleine zaken/omruilen en korting), rule-to-case (q4), function of the example (q6), purpose informeren. Two legal statements hedged (edits 1–2) and one option repolarised (edit 5). |
| `B1:reading:batch024-gratis-zwemles:1` (artikel · persuasief · overig, 627 words, 6 Q, keys BCACBA) | pass (edited) | comparable; q6 on the easy side | Opinion piece with thesis, cost argument, example, two rebutted objections and an appeal; detail over 2–3 sentences, example-function and summary items in the official forms; purpose waarschuwen is defensible (section 4, doubt 1). Two collocations repaired in the text, one distractor reworded. |
| `B1:reading:batch024-examenreglement:1` (opzoektekst · instructief · educatie, 569 words, 7 Q, keys BAACACB) | pass (edited) | comparable | Look-up text as blueprint §4.6 describes text 6: eight numbered articles, six persona scanning items (four rule applications, one two-figure sum, one date computation), purpose uitleggen. The surcharge in the sum was ambiguous (edit 3); q5 and q6 options made parallel and the key no longer the odd polarity or the only option echoing the prompt (edits 9–10); relabelled `opzoektekst` (edit 4). |

Batch: keys A 7 / B 6 / C 7 (35/30/35 %), no key three times in a row, purpose keys C, A, B; every evidence verbatim (also inside the app's paragraph blocks, which are split on blank lines and highlighted by substring, so the two-line fee-list quote of text 3 q4 highlights correctly under `white-space: pre-line`); no key the longest option in any question; no absolute term in a key; ids and slugs new to the catalogue and to batches 020–025; option counts all three. Level heuristics (prose sentences, headings and fee lines excluded): 42 sentences avg 15.8 longest 28 / 37 avg 16.2 longest 27 / 34 avg 15.4 longest 27, all inside the §10 band. Web checks repeated on 10 September 2026: no "Taalschool Berkenpoort", no municipality "Westerhout" (a Beverwijk neighbourhood, a Druten business park, a Noordwijkerhout street), no public "Thérèse Vermeulen" in a swimming context; consumer-law statements checked against ACM ConsuWijzer (ruilen is no right in a shop; the 14-day bedenktijd covers internet, telephone, street and door sales; the seller stays responsible and may not push the customer to the manufacturer; wettelijke garantie continues after the fabrieksgarantie ends; remedies in the order repair/replacement, then money back).

## 2. Edits made in the proposed file

Required (accuracy or an ambiguous answer):

1. **klachtenafhandeling `text` (law paragraph)** — "Gaat een product te snel kapot, dan …" → "Gaat een product **bij normaal gebruik** te snel kapot, dan heeft de klant recht op gratis reparatie of een nieuw exemplaar." Why: the right to free repair or replacement presupposes the defect is not the customer's doing; without the hedge the page overstates the rule. `q5.evidence` rebuilt verbatim.
2. **klachtenafhandeling `text`** — "Alleen bij een aankoop via internet geldt een wettelijke bedenktijd van veertien dagen." → "Alleen als de klant niet in de winkel koopt, bijvoorbeeld via internet, geldt een wettelijke bedenktijd van veertien dagen." Why: the statutory cooling-off period also covers telephone, street and door sales (ACM); "alleen via internet" taught something false. `q4.evidence` and `q4.explanation` rebuilt to match.
3. **examenreglement `text` (fee list)** — "Late aanmelding: 20 euro extra." → "Late aanmelding: 20 euro extra per aanmelding." and **q4 `prompt`** → "Modibo heeft een onvoldoende voor Lezen en voor Schrijven. Zes dagen vóór de volgende examendatum meldt hij zich in één keer aan voor de herkansing van beide onderdelen. Wat betaalt hij in totaal?" with `q4.evidence` and `q4.explanation` rebuilt. Why: a learner who read the surcharge as per part computed 110 euro, which no option offers; one registration and a per-registration surcharge make 90 the only reading. The persona changed from Roos to Modibo because Roos already carries text 1 q4 in the same batch.
4. **examenreglement `taskType`** — `voorwaarden` → `opzoektekst`. Why: the coordinator describes the item as a look-up text and blueprint §4.6 ties that shape to `opzoektekst`; under `voorwaarden` (a text read in full) §4.6 would require paragraph-span detail items and an opinion/inference item, which this text does not have and, as a look-up text, should not have. The situation line already reads "U zoekt iets op …". Sets are explicit id lists, so nothing else depends on the label; revert to `voorwaarden` at adoption if the coordinator prefers the original brief.

Recommended (signal, parallelism, natural Dutch):

5. **klachtenafhandeling q4 option C** — "De winkel moet de jas terugnemen als Roos de kassabon kan laten zien." → "De winkel hoeft de jas alleen terug te nemen als Roos de kassabon laat zien." Why: the key was the only negative option against two "moet terugnemen" distractors (odd polarity); C still misapplies the receipt sentence and is still false.
6. **gratis-zwemles `text`** — "betaalt die kosten later dubbel terug" → "betaalt daar later dubbel voor". Why: "kosten terugbetalen" means refund; the idiom for paying a price later is "ergens dubbel voor betalen".
7. **gratis-zwemles `text`** — "Ouders tekenen daar een afspraak:" → "Ouders zetten daar hun handtekening onder één regel:". Why: "een afspraak tekenen" is not a Dutch collocation and "afspraak" reads as appointment; the rebuttal needs a signed commitment.
8. **gratis-zwemles q1 option C** — "de prijs van een diploma" → "de prijs van zwemlessen". Why: "zwemles" from the prompt recurred only in the key.
9. **examenreglement q5 options B and C** — "Binnen vier weken een kopie …" → "Uiterlijk 6 juli een kopie van haar werk aanvragen via Mijn Berkenpoort."; "Binnen tien werkdagen zonder afspraak …" → "Uiterlijk 22 juni zonder afspraak langsgaan bij de administratie van de school."; `explanation` rebuilt. Why: the key was the only dated option (the only one that "used" 8 juni); the official look-up items date every option (cf. 010 busabonnement q4). Distractors stay anchored: the four-week certificate term misread as a deadline, the inspection rule without its appointment.
10. **examenreglement q6** — prompt "haalde hij Schrijven opnieuw niet" → "haalde hij Schrijven weer niet"; option B "Hij kan Schrijven tot februari volgend jaar herkansen, omdat zijn voldoendes zo lang geldig zijn." → "Hij hoeft alleen Schrijven opnieuw te doen, omdat zijn voldoendes twaalf maanden geldig blijven."; key C "Hij moet het hele examen opnieuw doen, ook de drie onderdelen die hij al haalde." → "Hij moet alle vier de onderdelen opnieuw doen, ook de drie met een voldoende."; `explanation` rebuilt. Why: "examen", "opnieuw" and "haalde" from the prompt recurred only in the key, and the key was the only obligation among two permissions; the learner must now map "het hele examen" onto "alle vier de onderdelen" (introduced in the text's first paragraph). Key letter, evidence and the two-re-sit logic unchanged.
Not changed on purpose: item 1 q5 distractor A (the guarantee-year misconception; wrong remedy, anchored in the example's "een jaar" — kept over the author's alternative, which is contrived); the two-line evidence of text 3 q4 (renders correctly, see section 1); the sentence "Dit stuk is een waarschuwing." (see doubt 1); "kreeg hij een 5" as the onvoldoende signal in q6 (article 5 defines 6 as a pass; a fair B1 combination).

## 3. Rejected items

None.

## 4. Decisions on the author's doubts (notes §8)

1. **Purpose key waarschuwen for the opinion piece (q6).** Accepted. The text is built as a warning: title, "Dit stuk is een waarschuwing", the danger framing the opening and the closing ("betalen we daar als land een hoge prijs voor", "kost ons uiteindelijk veel meer"), the free-lessons proposal as the remedy. The blueprint's purpose form lists "de lezer waarschuwen voor …", the 010 review asked that later persuasief texts sometimes key it (010 + 011 never do), and the item has exactly one defensible answer because the overtuigen option states the opponents' position, which the writer rejects, and the informeren option misdescribes one paragraph. The explanation already tells the learner that B fails on content, not on the verb. Level note: the self-description makes q6 easier than an official purpose item; accepted because the house rule requires verbatim evidence for purpose keys and 010/011 anchor theirs in similar announcing sentences. The author's swap to overtuigen is not applied.
2. **Legal simplification of text 1.** The paragraph does not mislead in its claims (checked against ACM, section 1); two statements were too strong and are hedged (edits 1–2). Omitting the burden-of-proof rule is acceptable for a textbook page: the example (300 euro, fourteen months, "doet niets meer", no misuse) rests on the expectation test, and "Dat is onjuist" is right as a matter of law because an expired fabrieksgarantie never ends the legal rights. "binnen een redelijke tijd" kept verbatim.
3. **q5 distractor A.** Kept as written (see section 2, not changed).
4. **Sensitivity of text 2.** Within §9: "ongelukken in het water" and "de brandweer die te water gaat" once each, no accident described, a frightened mother at worst.
5. **Fictional evidence (Westerhout, "bijna verdubbeld").** Accepted, as for Modibo's story in 010: an opinion piece may cite its own figures, the town is the bank's fictional one, nothing is presented as a real statistic to the learner.
6. **taskType of text 3.** `opzoektekst` (edit 4). It is the text-6 candidate of the second mock form.
7. **Line break in q4 evidence.** Kept; the app highlights by substring within a blank-line block and renders the block with `white-space: pre-line`, so both fee lines are marked; Results joins evidence with a space.
8. **q6 counting and "kreeg hij een 5".** Accepted; the case wording of the two re-sits was lightened (edit 10) without changing the logic.
9. **Twenty questions.** A set decision: klachtenafhandeling + gratis-zwemles is a 13-question drill; examenreglement (7) waits for a six-question partner from the next B1 reading batch or serves as text 6 of mock form 2 (section 5).
10. **No exemplars.** As in 010/011, level was judged against the Lezen I description in the research document and the six calibrated texts of 010/011.

## 5. Diversity and set assembly

- Within the batch: three domains, three text types, three task types (studieboek, artikel, opzoektekst), a seller's-side procedure, a first-person plea, a regulation; tested operations differ (reason, sequence, roles, rule-to-case, two-step rule, example function, purpose / cause, group, example function, rebuttal, summary, purpose / four rule applications, sum, date, purpose). Personas now unique within the batch (Roos, meneer De Vries; Amina, Thérèse Vermeulen; Julio, Fatima, Hasan, Modibo, Sabrina, Karim).
- Against the catalogue: first studieboek text, first examination regulation (§9 "an exam regulation" needed), first B1 text arguing a public measure for children; nearest neighbours differ in level or shape (`A2:reading:batch021-terugbrengen`, a shop's return rules at A2, in a concurrent batch; `A2:reading:p3` swimming e-mail; `B1:writing:batch015-kledingkast`, a customer's complaint letter). Cast names recur across batches by design (Modibo in 010/011, Roos and Karim in 010).
- With 010 + 011 the bank holds three texts per domain and, by text type, beschouwend 2 / persuasief 2 / instructief 3 / descriptief 2. Mock form 2 can start from klachtenafhandeling (werk, descriptief), gratis-zwemles (overig, persuasief) and examenreglement (educatie, instructief, text 6); it still needs three texts, at least one beschouwend (an interview or nieuwsbericht) and one per domain, from a later batch.
- Drills: `b1-reading-06` = klachtenafhandeling + gratis-zwemles (13 Q); examenreglement pairs with a six-question text from the next B1 reading batch.

## 6. Media notes

None: B1 reading items carry no audio or pictures.

## 7. Notes for the coordinator

- Adopt with `npm run batch:adopt 024`; the hash above is of the proposed bytes.
- The author's notes are now stale in four places (text 3 q4 persona and the surcharge wording, text 3 q5/q6 option wordings, the taskType, the "tekenen een afspraak" sentence); the notes are the author's file and were not edited.
- The app prints "Lees eerst de vraag. Lees daarna de tekst." under the situation line of every reading item, including `nt2-i`; noted before in the 010/011 level check, not a content matter.

## 8. Limitations

AI editorial review; no independent educator review, learner trial or psychometric calibration, and no claim of equivalence with the Staatsexamen NT2 Programma I. Level labels remain unvalidated authoring targets (`targetLevelValidated: false`); the level column compares each text with the official description and the calibrated 010/011 texts, not with an exemplar item (`content/exemplars/` does not exist). Originality rests on the author's declaration and this reviewer's reading of the official formats; the legal statements were checked against ACM ConsuWijzer on 10 September 2026 and are a textbook simplification, not legal advice.
