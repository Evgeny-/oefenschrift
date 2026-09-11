# Batch 047 independent editorial review

All six items pass after local repair. Four items were edited; none were rejected. All six historical IDs and topics remain. GPT-6 Astra reviewed the full source in a separate context under the user’s model exception.

| ID | Verdict | Level verdict | Reason |
| --- | --- | --- | --- |
| A2:writing:afspraak:1 | pass | comparable; unvalidated | email: 48 words; all goals covered by the model. |
| A2:writing:bibliotheekpas:1 | pass | comparable; unvalidated | form: 25 words; all goals covered by the model. |
| A2:writing:batch001-ladder:1 | pass | comparable; unvalidated | email: 48 words; all goals covered by the model. |
| A2:writing:batch001-cursus:1 | pass | comparable; unvalidated | email: 46 words; all goals covered by the model. |
| A2:writing:batch002-sleutel:1 | pass | comparable; unvalidated | form: 32 words; all goals covered by the model. |
| A2:writing:batch002-schoenen:1 | pass | comparable; unvalidated | email: 47 words; all goals covered by the model. |

## Applied edits

- `A2:writing:afspraak:1` / `sample` → "Ik kan morgen helaas niet bij je komen. Zullen we vrijdag om drie uur afspreken? Ik heeft die middag tijd. Laat je me weten of je dan kunt?". Remove the dangling availability question by explicitly proposing Friday at three; the sole omitted goal is now the cancellation reason. Retain one deliberate agreement error.
- `A2:writing:afspraak:1` / `quotes` → ["Ik kan morgen helaas niet bij je komen.", null, "Zullen we vrijdag om drie uur afspreken?", "Laat je me weten of je dan kunt?"]. Rebuild exact sample evidence; afspraak omits reason only and ladder uses the revised purpose sentence.
- `A2:writing:bibliotheekpas:1` / `formFields` → [{"label": "Naam (verzonnen)", "kind": "short"}, {"label": "E-mailadres (verzonnen)", "kind": "short"}, {"label": "Wat is er met uw pas gebeurd?", "kind": "open"}, {"label": "Wat vraagt u aan de bibliotheek?", "kind": "open"}, {"label": "Op welke dag en hoe laat kunt u de nieuwe pas ophalen?", "kind": "open"}]. Ask explicitly for both day and time, matching criterion three.
- `A2:writing:batch001-ladder:1` / `title` → "Een ladder lenen". Use a natural Dutch title for a borrowing request.
- `A2:writing:batch001-ladder:1` / `prompt` → "Een lamp aan uw plafond is kapot. U wilt de lamp vervangen. Uw buurman Tom heeft een ladder. Schrijf hem een e-mail van vier tot acht zinnen. Vraag of u zijn ladder mag lenen. Leg uit waarvoor u de ladder nodig hebt. Schrijf wanneer u de ladder wilt ophalen en wanneer u hem terugbrengt. Bedenk zelf twee tijden.". Replace unclear pronoun wording about putting a new lamp inside something with a direct replacement action.
- `A2:writing:batch001-ladder:1` / `sample` → "Mag ik je ladder lenen? De lamp aan mijn plafond doet het niet meer. Ik wil de kapotte lamp vervangen. Ik kom de ladder graag om zes uur haal.". Clarify the lamp replacement purpose while retaining the missing return time and learner verb error.
- `A2:writing:batch001-ladder:1` / `quotes` → ["Mag ik je ladder lenen?", "Ik wil de kapotte lamp vervangen.", "Ik kom de ladder graag om zes uur haal.", null]. Rebuild exact sample evidence; afspraak omits reason only and ladder uses the revised purpose sentence.
- `A2:writing:batch001-ladder:1` / `model` → "Mag ik vanavond je ladder lenen? De lamp in mijn keuken doet het niet meer. Ik wil de kapotte lamp vervangen. Zonder ladder kan ik niet bij het plafond. Ik wil de ladder graag om zes uur ophalen. Om acht uur breng ik hem weer bij je terug.". Use an unambiguous lamp-replacement sentence without copying the prompt.
- `A2:writing:batch002-schoenen:1` / `criteria` → [["Zeg wanneer u de schoenen hebt gekocht.", "Say when you bought the shoes."], ["Leg uit wat het probleem met de schoenen is.", "Explain the problem with the shoes."], ["Vraag of u de schoenen kunt ruilen voor een grotere maat.", "Ask whether you can exchange the shoes for a larger size."], ["Schrijf welke maat u wilt. Bedenk zelf een maat.", "Say which size you want. Choose a size yourself."]]. Include the larger-size requirement explicitly, as the prompt requests.
- `A2:writing:afspraak:1` / `starters` → ["Morgen kan ik ….", "Ik kan niet komen, omdat ….", "Zullen we op … om … afspreken?", "Kun je dan …?"]. Use a shorter proposal frame and explicitly link the availability question to the proposed time.

## Review findings

Appointment change, lost card, ladder loan, course information, found key and shoe exchange retain the six historical subjects. Four emails differ in purpose and register; two forms collect distinct practical information. Three neighbourhood settings are inherited replacements. This batch is not a complete exam form.

The found-key form preserves the neighbour notice through the building manager. The contact route uses the separately completed email field. Both form models contain one sentence per open field. Four email scaffolds provide the header, greeting and closing.

All 16 non-null quotes appear verbatim. Each sample misses exactly one content goal and retains one comprehensible learner grammar error. All 22 partial frames allow grammatical, criterion-aligned completion; two afspraak frames simplified. No supplied completions or invented facts occur in the starter overlay.

Emails are 46–48 words with six sentences; forms have 25 and 32 words with three sentences. All model sentences are at most 12 words. No complete prompt sentence is copied into any sample or model.

npm run batch:check -- content/batches/047-proposed.json: Checked 6 items, 0 questions. No failures, no warnings. Six existing IDs are intentional replacements.

## Sources and limits

Read AGENTS.md, blueprint, review and author briefs, rubric, content workflow and relevant internal exam-analysis paragraph. Read A2 writing catalogue titles and batch008 contract/group emails plus lantaarnpaal/sportclub forms. content/exemplars is absent, so those project items supply editorial comparisons.

No KNM claims, named invented businesses or factual external dependencies. Scaffolds use reserved example.org addresses. No web verification was needed for generic fictional settings.

No media is required. This is an AI editorial review, with no CEFR validation or established exam equivalence. No items were rejected.

Proposal SHA-256: `209242cd57ed39662d4a1807a19fef133550d3b315fa57e1448459c11eedc962`

Starters SHA-256: `eda3e2d2d7530b84e72711ece2404779ac799e9b9a30f7ebb43dbadc31f7f55d`

The coordinator can adopt the reviewed proposal and starters through the normal hash gate.
