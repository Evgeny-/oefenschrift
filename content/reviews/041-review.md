# Batch 041 independent review

Eight items pass after repairs to two items. No rejections or language-level flags. All eight primary pages were opened independently and read in full on 11 September 2026.

| Item | Verdict | Editorial level | Reason |
| --- | --- | --- | --- |
| A2:knm:batch003-inschrijven:1 | Pass | Comparable | Municipality registration supported. |
| A2:knm:batch003-verhuizing:1 | Pass after repair | Comparable | Earliest reporting date made explicit. |
| A2:knm:batch003-digid:1 | Pass | Comparable | Public-service login purpose supported. |
| A2:knm:batch003-zorgverzekering:1 | Pass | Comparable | Optional cover supported. |
| A2:knm:batch003-noodnummer:1 | Pass | Comparable | Urgent and non-urgent examples verified. |
| A2:knm:batch003-leerplicht:1 | Pass | Comparable | Age-five threshold supported. |
| A2:knm:batch003-stemmen:1 | Pass | Comparable | Required voting documents verified. |
| A2:knm:batch003-discriminatie:1 | Pass after repair | Comparable | Reporting-service remit verified; image made neutral. |

## Applied edits

- `A2:knm:batch003-verhuizing:1`, `questions[0].prompt` → Roos verhuist binnenkort. Vanaf wanneer mag zij haar nieuwe adres op zijn vroegst doorgeven aan de gemeente? Ask explicitly for the earliest date, excluding a later permitted date.
- `A2:knm:batch003-discriminatie:1`, `imageBrief` → Minimal flat illustration made of a few simple shapes: no outlines, no texture, no background objects. Palette: warm off-white paper, charcoal grey, mustard yellow, plus one or two muted colours used sparingly (dusty blue, sage green, soft terracotta). Large empty space, deliberately low detail, friendly and calm, everyday Netherlands. No text, no captions, no logos. Modibo (young man, short black hair, light shirt) sitting at a small table and looking at a mobile phone whose screen faces away from the viewer; no adviser, legal symbols, text or logos. Replace the adviser scene with neutral information-seeking so the picture cannot favour advice over the legal distractors.
- `A2:knm:batch003-discriminatie:1`, `imageAlt` → Modibo zit aan tafel en kijkt op zijn telefoon. Replace the adviser scene with neutral information-seeking so the picture cannot favour advice over the legal distractors.

## Source verification

The JSON records a short primary-source quote, the full-page verification method and date, exact card evidence, key proof and both distractor rationales for every item.

- [When should I register with the Personal Records Database as a resident?](https://www.government.nl/faq/when-should-i-register-with-the-personal-records-database-as-a-resident): The opening and registration sections require stays longer than four months to be registered with the municipality at the home or correspondence address. Legal residence and identity checks can delay registration; the question only asks which institution handles it.

- [How do I inform the municipality of a change of address?](https://www.government.nl/faq/how-do-i-inform-the-municipality-of-a-change-of-address): The deadline section permits reporting from four weeks before to five days after moving. The repaired prompt explicitly asks for the earliest point, so a permitted later date cannot compete.

- [Wat is DigiD?](https://www.digid.nl/over-digid/wat-digid): The introductory section explains identity authentication and safe login. The eligible-organisations section limits DigiD to bodies legally allowed to use BSNs, including government and public-function organisations. Payment and booking services are outside that purpose.

- [Standard health insurance](https://www.government.nl/themes/family-health-and-care/health-insurance/standard-health-insurance): The additional-insurance section states that supplementary cover is optional and covers care beyond the standard package; providers can refuse applications. A is about choosing whether to seek cover, not a guarantee of acceptance. Employer ZVW contributions mentioned elsewhere do not impose supplementary-insurance enrolment.

- [When can I call 112?](https://www.government.nl/faq/emergency-number-112/when-can-i-call-112): The opening covers urgent help including direct danger to life. Non-urgent examples explicitly include only a dent and a street-wide blackout. The card does not say that direct danger to life is the only reason to call 112.

- [Exemptions from compulsory school attendance](https://www.government.nl/themes/education/compulsory-school-attendance/exemptions-from-compulsory-school-attendance): The opening states the age-five threshold and identifies exemptions; the rest describes exemption types and permissible absence. The question asks an age, not the exact school-day deadline after a birthday. Later qualification duty is outside the question.

- [What do I need to vote in the municipal elections?](https://www.government.nl/faq/elections/what-do-i-need-to-vote-in-the-municipal-elections): The polling-station section requires a voting pass plus an accepted identity document and permits expiry up to five years. Accepted documents include residence permits and specified foreign documents; the item uses the broad Dutch term identiteitsbewijs. The person votes in person, so proxy procedures do not compete.

- [Reporting discrimination](https://www.government.nl/themes/migration-and-travel/discrimination/reporting-discrimination): The local-service section states the advisory, assistance and registration functions. Courts and police appear as separate routes. The answer concerns what the reporting service itself provides; a court judgment or a punitive fine is not its service.

The [July 2025 objectives](https://zoek.officielebekendmakingen.nl/stcrt-2024-15802.html) were fetched as full HTML after the web tool timed out; every supplied mapping was inspected.

## Assembly and media

Preserve all eight IDs. Theme counts are 6: three, 4: two, 7: two and 8: one. The subjects complement the existing facts on digital help, insurance costs, qualification duty and voting rights. Keep municipal-institution questions apart when building drills.

Image briefs match the house style and cast. Rendered images and narrator question/options audio still require generation and media review after adoption. The revised discrimination scene must show the phone rather than an adviser.

## Validation and limits

`npm run batch:check -- content/batches/041-proposed.json` passed: eight items, eight questions, three options each, keys A3/B3/C2, no failures or warnings. Facts meet the 30-word cap and prompts meet the 20-word cap. Every evidence quote is verbatim.

This is an AI editorial pass. It does not validate CEFR difficulty or exam equivalence. No stored exemplar directory exists, so the level comparison used the documented official format and existing KNM items. Recheck the cited rules yearly and when they change.

Proposed SHA-256: `e135ff6b8db8d3da48620a8da86a4883035b9d76e86b7744c6d93ab854deb9a2`. The review source points to `content/batches/041-original.json` for adoption; the hash covers the exact proposed bytes. `replaces` contains all eight retained batch003 IDs.
