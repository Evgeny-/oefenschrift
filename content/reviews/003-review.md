# Batch 003 editorial review

**Verdict:** Pass. All 32 items are ready for integration.

**Reviewed source:** `content/batches/003-original.json`  
**SHA-256:** `8295ec2e0fa4368add9e9c35c013ab85c624e306fb64e4b6767cf509028c2556`

The batch contains eight A2 KNM items, four A2 and four B1 reading items, four A2 and four B1 writing items, and four A2 and four B1 speaking items. All IDs are unique. Every closed `evidence` value is a verbatim source substring that supports the key. Every open sample quote matches exactly, the null marks its omitted goal, and each model covers all three criteria.

## Item verdicts

| Item | Verdict | Evidence and distractor check |
| --- | --- | --- |
| `A2:knm:batch003-inschrijven:1` | Pass | Municipality and BSN facts verified; wrong bodies and documents have no stated role. |
| `A2:knm:batch003-verhuizing:1` | Pass | Municipality, reporting window, and rental-contract proof verified; unrelated records remain false. |
| `A2:knm:batch003-digid:1` | Pass | Online identity, no credential sharing, and authorisation verified; payment/travel alternatives do not compete. |
| `A2:knm:batch003-zorgverzekering:1` | Pass | Standard insurance duty and optional supplementary cover verified. |
| `A2:knm:batch003-noodnummer:1` | Pass | Urgent use of 112, non-urgent police number, and operator information verified. |
| `A2:knm:batch003-leerplicht:1` | Pass | Ages 5–16, illness reporting, and advance permission for wedding/funeral verified. |
| `A2:knm:batch003-stemmen:1` | Pass | Voting pass, identity document including five-year expiry allowance, and ballot booth verified after revision. |
| `A2:knm:batch003-discriminatie:1` | Pass | Local advice service and police complaint route for offences verified. |
| `A2:reading:batch003-dierenarts:1` | Pass | Saturday and refusal to eat key B and A; other times have different functions. |
| `A2:reading:batch003-lift:1` | Pass | Tuesday outage and Monday call deadline key B and A. |
| `A2:reading:batch003-bibliobus:1` | Pass | New 15.30 arrival and required library card key B and C. |
| `A2:reading:batch003-kantine:1` | Pass | Pickup payment and consulting the cook key B and C. |
| `B1:reading:batch003-deelauto:1` | Pass | Purpose, fee exception, and charging-failure rule key A, B, C. |
| `B1:reading:batch003-stage:1` | Pass | Limited capacity, provisional status, and default assignment key A, B, A. |
| `B1:reading:batch003-warmtefonds:1` | Pass | Immediate measures, later approval, and priority rule key B, A, A. |
| `B1:reading:batch003-ouderavond:1` | Pass | Prior-format problem, personal-question channel, and newsletter handling key A, B, A. |
| `A2:writing:batch003-container:1` | Pass | Exact problem/number quotes; model requests action. |
| `A2:writing:batch003-sportles:1` | Pass | Exact class/date quotes; model requests confirmation. |
| `A2:writing:batch003-logeerkamer:1` | Pass | Exact date/availability quotes; model asks price. |
| `A2:writing:batch003-loonstrook:1` | Pass | Exact 80/72-hour quotes; model requests review. |
| `B1:writing:batch003-verkeerssituatie:1` | Pass | Exact risk/time quotes; model proposes a concrete measure. |
| `B1:writing:batch003-opleiding:1` | Pass | Exact relevance/study-period quotes; model explains work coverage. |
| `B1:writing:batch003-reparatie:1` | Pass | Exact date/urgency quotes; model asks for a timed solution. |
| `B1:writing:batch003-vrijwilligersrooster:1` | Pass | Exact problem/consequence quotes; model proposes a procedure. |
| `A2:speaking:batch003-tramkaart:1` | Pass | Exact destination/problem quotes; model asks for purchase help. |
| `A2:speaking:batch003-jas:1` | Pass | Exact event/description quotes; model asks when to visit. |
| `A2:speaking:batch003-monteur:1` | Pass | Exact appointment/absence quotes; model asks arrival time. |
| `A2:speaking:batch003-speeltuin:1` | Pass | Exact object/location quotes; model explains the danger. |
| `B1:speaking:batch003-werkdruk:1` | Pass | Exact deadline/risk quotes; model negotiates priority. |
| `B1:speaking:batch003-buurtvergadering:1` | Pass | Exact benefit/problem quotes; model offers a compromise. |
| `B1:speaking:batch003-inwerken:1` | Pass | Exact cause/guidance quotes; model adds an evaluation step. |
| `B1:speaking:batch003-cursuslocatie:1` | Pass | Exact travel/affected-group quotes; model offers feasible alternatives. |

## KNM source verification

The reviewer opened all eight current Government.nl pages on 9 September 2026. They support the final claims about [BRP registration](https://www.government.nl/faq/when-should-i-register-with-the-personal-records-database-as-a-resident), [moving address](https://www.government.nl/faq/how-do-i-inform-the-municipality-of-a-change-of-address), [DigiD](https://www.government.nl/themes/government-and-democracy/online-access-to-public-services-european-economic-area-eidas/digid/digid-applications-from-the-netherlands), [standard health insurance](https://www.government.nl/themes/family-health-and-care/health-insurance/standard-health-insurance), [112](https://www.government.nl/faq/emergency-number-112/when-can-i-call-112), [school attendance exemptions](https://www.government.nl/themes/education/compulsory-school-attendance/exemptions-from-compulsory-school-attendance), [municipal voting](https://www.government.nl/faq/elections/what-do-i-need-to-vote-in-the-municipal-elections), and [reporting discrimination](https://www.government.nl/themes/migration-and-travel/discrimination/reporting-discrimination).

The voting item was revised before acceptance. Its original wording required a “valid” identity document and asked where a voter “makes the choice.” The final item states the five-year expiry allowance and asks where the ballot is filled in, matching the official page and leaving one defensible answer.

## Diversity and limitations

No item duplicates an earlier title or repeats an earlier item by changing only names, objects, or numbers. Familiar domains recur where appropriate, while the tested action and information structure differ. B1 tasks add connected conditions, consequences, explanations, or negotiation beyond the A2 pattern.

This is an AI editorial review. It does not replace review by Dutch-language educators, learner trials, blueprint validation, or psychometric calibration. The A2 and B1 labels remain unvalidated authoring targets. Official pages support KNM facts; they do not validate exercise quality, official equivalence, readiness, or a pass score. Facts need periodic rechecking.
