# Batch 049 independent editorial review

All seven items pass after repairs. Four items changed; none rejected. Both proposed files are ready for hash-verified adoption.

| ID | Verdict | Level verdict | Reason |
| --- | --- | --- | --- |
| B1:writing:batch002-rooster:1 | pass | comparable, unvalidated B1 target | Single subordinate clause fits the documented zinstaak format. Course conflict gives less content choice than the vacancy reference but comparable grammar demand. |
| B1:writing:batch002-geluid:1 | pass | comparable, unvalidated B1 target | One independently chosen practical measure with modal inversion; the embedded infinitive in the model adds a natural B1 structure. |
| B1:writing:batch002-buurtfeest:1 | pass | comparable, unvalidated B1 target | Four open form answers combine motivation, availability and relevant experience. Shorter than the reference forms but within the 50–150-word target. |
| B1:writing:batch003-verkeerssituatie:1 | pass | comparable, unvalidated B1 target | Five requirements connect table observations to an independently proposed intervention and its mechanism. Numeric processing is lighter than the two table references. |
| B1:writing:batch003-opleiding:1 | pass | comparable, unvalidated B1 target | Two distinct job benefits, study hours and conditional work coverage require connected practical reasoning across four form answers. |
| B1:writing:batch003-reparatie:1 | pass | comparable, unvalidated B1 target | One deadline and practical remedy inside om plus te-infinitive. The specified grammar is part of the documented zinstaak range. |
| B1:writing:batch003-vrijwilligersrooster:1 | pass | comparable, unvalidated B1 target | Five elements combine frequency, consequence, sequenced procedure, causal benefit and trial duration. The model uses condition and consequence clauses. |

## Applied edits

- `B1:writing:batch002-buurtfeest:1` `formFields[2].label` → "Van hoe laat tot hoe laat kunt u zaterdag helpen? Kies tijden tussen 10.00 en 18.00 uur.". Match the displayed form question exactly to the criterion; prevent a valid answer to a broader question from failing.
- `B1:writing:batch002-buurtfeest:1` `formFields[4].label` → "Vraag of er vóór het feest een bijeenkomst voor helpers is.". Match the displayed form question exactly to the criterion; prevent a valid answer to a broader question from failing.
- `B1:writing:batch002-buurtfeest:1` `starters[3]` → "Is er vóór … een bijeenkomst voor …?". Keep the partial frame aligned to the meeting or same-day-frequency goal while leaving the learner to complete it.
- `B1:writing:batch003-opleiding:1` `formFields[3].label` → "Vraag studietijd aan. Noem de dag en de begin- en eindtijd.". Match the displayed form question exactly to the criterion; prevent a valid answer to a broader question from failing.
- `B1:writing:batch003-opleiding:1` `formFields[5].label` → "Vraag of uw leidinggevende toestemming geeft voor uw aanvraag.". Match the displayed form question exactly to the criterion; prevent a valid answer to a broader question from failing.
- `B1:writing:batch003-reparatie:1` `prompt` → "Uw laptop zou op 12 april klaar zijn. Het is nu 15 april en u hebt hem nodig voor uw werk. Vraag de reparateur om een oplossing en noem een uiterste datum na 15 april. Kies die datum zelf. Maak de zin op de open plek af.". Make the future deadline and inclusive latest-date wording explicit in both prompt and criterion.
- `B1:writing:batch003-vrijwilligersrooster:1` `sample` → "Ik heb het overzicht van de laatste vier weken bekeken. Er waren twintig diensten en zes keer meldde een vrijwilliger zich pas op de dag zelf af. Nu stuurt de afwezige vrijwilliger alleen u een bericht. Bij vier diensten was er geen vervanger, waardoor de balie het eerste uur gesloten bleef. Bezoekers moesten daardoor een uur op hulp wachten. Volgens mij kunnen we dit anders regelen. Ik stel voor dat vrijwilligers bij een afmelding eerst een bericht in een gezamenlijke groep zetten. Daarna neemt u contact op met mensen van een reservelijst als niemand heeft gereageerd. Zo kunnen beschikbare vrijwilligers meteen antwoorden, terwijl u niet iedereen apart hoeft te bellen. Dat bespaart tijd omdat iedereen krijgen dezelfde informatie.". Ground the sample in six cancellation events and a closed service desk, then rebuild exact quotes.
- `B1:writing:batch003-vrijwilligersrooster:1` `quotes[0]` → "Er waren twintig diensten en zes keer meldde een vrijwilliger zich pas op de dag zelf af. Nu stuurt de afwezige vrijwilliger alleen u een bericht.". Ground the sample in six cancellation events and a closed service desk, then rebuild exact quotes.
- `B1:writing:batch003-vrijwilligersrooster:1` `quotes[1]` → "Bij vier diensten was er geen vervanger, waardoor de balie het eerste uur gesloten bleef. Bezoekers moesten daardoor een uur op hulp wachten.". Ground the sample in six cancellation events and a closed service desk, then rebuild exact quotes.
- `B1:writing:batch003-vrijwilligersrooster:1` `starters[0]` → "Nu meldt een vrijwilliger zich af door …; afmelden op de dag zelf gebeurde in vier weken …". Keep the partial frame aligned to the meeting or same-day-frequency goal while leaving the learner to complete it.

## Verification

The full final source and all 24 starters were read. The three model gaps were inserted into their email bodies; each has the required structure. All samples omit exactly one goal, and all 17 non-null quotes are verbatim. Models contain 9, 12, 76, 142, 82, 10 and 146 words in source order. The final checker reports no failures or warnings.

Traffic and study-time models average 11.8 and 11.7 words per sentence. Their causal links and connected practical demands justify acceptance under the task-specific model rule. No off-level flag is raised. Two adopted project items per format provided comparisons; curated exemplars are absent.

## Diversity and decisions

All supplied topics and IDs remain. This batch contains three zinstaken, two forms and two table tasks; it is not a complete mock. The library permits any plausible measure that reduces phone calls. The traffic proposal does not assert a legal right or guaranteed outcome. Neighbourhood and volunteering topics remain because this is an authorised replacement. Form models cover the open answers; identity fields request fictional data. No media is required.

AI editorial review does not validate CEFR difficulty or establish official exam equivalence. No learner pilot or teacher review was performed. No rejected items.

Proposal SHA-256: `cf080ec83ccdc45327d4084ba90f7c3e31be01a1fa3e4bff6a204fe6efed2d56`.

Starters SHA-256: `5b3ff285e9448493dcaeb75bc07a0caa7d5818614f4e5317f356a2f65c48246a`.
