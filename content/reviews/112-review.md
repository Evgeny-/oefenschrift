# Review of batch 112 (KNM, themes 6 and 8)

## Meaning first (blind packet)

Packet hash of the original source: c1919dbafbce39aea9b998dc2a16a43953e27946878b7aadb9c90fc2b93dc1db (written before any question, option, key or note was opened).

- voedselbank: Stijn has too little money for food and an almost empty fridge; the card says what a food bank is. Coherent; purpose is a practical lookup. No risk.
- nibud-geldzaken: Rana with notebook and coins wants independent money information for families; the card defines Nibud. Coherent. Slight risk: "onafhankelijk" in prompt and card repeats a word only for the key (check against options later).
- gemeente-afvalheffing: Lieve holds an envelope next to a bin; bill for afvalstoffenheffing; card names municipal taxes. Coherent and realistic.
- ozb-huiseigenaar: Willem owns a house; asks which tax he pays yearly to the municipality. Coherent. The card gives the tax name, so the question depends on the term only.
- afstand-nationaliteit: Hiba with a passport is naturalising; the prompt asks what she must do with her old nationality "in principe", so the general rule is set up and the exceptions are only on the card. Coherent.
- netto-loon: Oscar reads a payslip; card defines bruto and netto. Coherent.
- belastinggeld: no persona; a piggy bank and coins as a setting. Coherent as a direct fact; the picture is a loose symbol.
- inkomen-doorgeven: Ines gets a benefit and her income rises; asks for the consequence of not reporting. The card's last two sentences are fragments; wording needs care.
- aangifte-diefstal: Mustafa's bike is stolen; where to report. Coherent and practical.
- ombudsman-gemeente: Lieve wants to complain about her municipality; the card says it depends on whether the municipality has joined. Risk: the prompt does not set up the condition, so the key may be an unset exception.
- avp-niet-verplicht: a general question about liability insurance for a family; toppled vase shows a household accident. Coherent; no persona.
- schoolboeken-gratis: Rana's daughter in the first year of secondary school; who arranges the course books. Coherent; the card adds atlas and calculator as the exception.
- kindpakket: Hiba, low income, poolside picture; the card says "Elke gemeente"; the claim must be checked. Coherent otherwise.

Packet hash of the proposed source: 80f0cbb11a322743a2c166db7230be50a708ed8e1ea095237644dd6fb832ea19. Proposed file SHA-256: be9e5f2aa3e655b53b98bfc4b75003610cf984e893bc3ba4e81547a9f8b899ec

## Verdicts

| id | verdict | level | reason |
|---|---|---|---|
| batch112-voedselbank | pass | comparable | Direct fact with a persona; the card gives the plain definition and the other options are two familiar bodies. Same depth as batch 006 wmo. |
| batch112-nibud-geldzaken | pass (edited) | comparable | Name-of-institution fact; card defines Nibud in plain words after the edit. |
| batch112-gemeente-afvalheffing | pass (edited) | comparable | Same shape as batch 006 wmo (key de gemeente) but a different fact (a municipal levy). |
| batch112-ozb-huiseigenaar | pass (edited) | comparable | Term recognition for a house owner; acronym options keep the key short. |
| batch112-afstand-nationaliteit | pass | comparable | General rule asked with 'in principe', exceptions on the card only; comparable to batch 007 naturalisatie. |
| batch112-netto-loon | pass (edited) | comparable | Definition item; plain wording after the edit; overlaps loonheffing (006) only in setting. |
| batch112-belastinggeld | pass (edited) | comparable | General civic fact; options rebuilt as parallel 'voor iedereen' phrases. |
| batch112-inkomen-doorgeven | pass (edited) | comparable | Consequence question instead of yes/no; plain wording after the edit. |
| batch112-aangifte-diefstal | pass (edited) | easier | Single obvious body; easy end of the bank, as planned. |
| batch112-ombudsman-gemeente | pass (edited) | comparable | Conditional key set up by 'kan'; no distractor offers the municipality's own desk. |
| batch112-avp-niet-verplicht | pass (edited) | comparable | Rule item (verplicht or not); source is the Nibud, not a ministry. |
| batch112-schoolboeken-gratis | pass (edited) | comparable | Persona fact on school costs; only the brugklas is asked. |
| batch112-kindpakket | pass (edited) | comparable | Definition item; options are three kinds of help. |

## Edits (30, in the review JSON with before/after)

- batch112-nibud-geldzaken / text: Replace B1 words (onafhankelijk, voorlichting, huishoudens) around the tested term with A2 wording.
- batch112-nibud-geldzaken / questions.0.prompt: Same: plain A2 prompt.
- batch112-nibud-geldzaken / questions.0.evidence: Evidence follows the changed card.
- batch112-nibud-geldzaken / questions.0.explanation: Follows the changed card.
- batch112-gemeente-afvalheffing / text: Explain the hard tested term in plain words.
- batch112-gemeente-afvalheffing / questions.0.explanation: Replace 'heft/int/stelt vast' with A2 wording.
- batch112-ozb-huiseigenaar / questions.0.options: Key was the longest and most specific option (26 characters against 21 and 7); acronym options are parallel and the key is no longer the longest.
- batch112-netto-loon / text: Replace 'houdt in / overblijft' (B1) with plain words.
- batch112-netto-loon / questions.0.options.B: Remove 'inhoudt'.
- batch112-netto-loon / questions.0.evidence: Follows the changed card.
- batch112-netto-loon / questions.0.explanation: Follows the changed card.
- batch112-belastinggeld / questions.0.prompt: Old options (two 'Alleen ...' distractors against one plain key) made the key the odd one out.
- batch112-belastinggeld / questions.0.options: Parallel options, each false except the key; no 'alleen' pattern.
- batch112-belastinggeld / questions.0.evidence: Quote the fuller phrase in the card (shortened to a verbatim substring).
- batch112-belastinggeld / questions.0.explanation: Matches the new options.
- batch112-inkomen-doorgeven / text: Remove fragment sentences and 'voorkomt'.
- batch112-inkomen-doorgeven / questions.0.options: Key was the only hedged option ('misschien'); the prompt already says 'kan'. Options now parallel.
- batch112-inkomen-doorgeven / questions.0.evidence: Follows the changed card.
- batch112-inkomen-doorgeven / questions.0.explanation: Follows the new options.
- batch112-aangifte-diefstal / text: Replace telefonisch and fietsdiefstalregister with plain words.
- batch112-ombudsman-gemeente / text: 'aangesloten' is B1.
- batch112-ombudsman-gemeente / questions.0.explanation: Same.
- batch112-avp-niet-verplicht / text: 'toebrengt' is B2.
- batch112-avp-niet-verplicht / sourceUrl: The recorded URL redirects; cite the live page.
- batch112-avp-niet-verplicht / questions.0.options.B: Drop 'wettelijk' (B1).
- batch112-schoolboeken-gratis / questions.0.prompt: Prompt word 'school' recurred only in the key 'De school'.
- batch112-kindpakket / text: 'huishoudens' is B1; explain purpose.
- batch112-kindpakket / questions.0.options.B: Key was the only hedged option ('bijvoorbeeld'); now parallel with C.
- batch112-kindpakket / imageBrief: The swimming-pool scene showed 'zwemles', part of the key.
- batch112-kindpakket / imageAlt: Follows the brief.

## Rejected

None. avp-niet-verplicht is kept: the Nibud page states 'niet verplicht, maar wel verstandig' plainly, the fact is stable, and no government page states it (search found only Consumentenbond, ANWB and insurers). Flagged as a non-regulator source; the coordinator may cut it first if that is not acceptable.

## Source checks

- ozb-huiseigenaar: live Rijksoverheid page says owners pay OZB to the gemeente each year; correct.
- inkomen-doorgeven: live page says to report income change with a toeslag to avoid repaying or getting too little; 'repay if income rises and unreported' follows. Consequence form works.
- kindpakket: live page says 'Elke gemeente ondersteunt...', kindpakket with tegoedbonnen for kleding and zwemlessen; offer differs per gemeente. The question asks what it is.
- ombudsman-gemeente: page confirms the two cases; the prompt says 'kan' and no option offers the gemeente's own desk.

## Diversity and set notes

Keys A4/B5/C4. No yes/no or behaviour questions. Names appear at most twice (Lieve, Rana, Hiba). No fact repeats an existing KNM item or batches 108-111.

## Media notes
Question text changed in several items, so question audio is generated fresh with exact job keys. kindpakket picture brief changed (no swimming pool). Other briefs show only settings. Pictures not inspected. Hiba traits (woman in her thirties, dark headscarf, teal coat) and Lieve traits are copied verbatim across items.

## Limitations
- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Check yearly: afstand-nationaliteit (new Rijkswet op het Nederlanderschap pending), ombudsman-gemeente (list of affiliated gemeenten), kindpakket (local offer), inkomen-doorgeven (channels).
- avp-niet-verplicht rests on the Nibud, an independent institute and not a regulator; no government page states it plainly. The fact is stable and plain.
- Eindterm mapping checked against docs/research/knm-coverage-2026-11-22.md, not re-read in the Regeling.
- Pictures not inspected.
