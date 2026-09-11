# Batch 048 editorial review

Five items pass after repairs to two items. No rejections or level flags. All five historical IDs and topics are preserved.

| ID | Verdict | Level judgement | Reason |
| --- | --- | --- | --- |
| A2:writing:batch002-plant:1 | pass | comparable, unvalidated A2 | Key collection location omitted. Model covers all four goals. |
| A2:writing:batch003-container:1 | pass | comparable, unvalidated A2 | Container number 48 omitted; own number 26 does not satisfy this goal. Model covers all four goals. |
| A2:writing:batch003-sportles:1 | pass | comparable, unvalidated A2 | No reason for stopping; praise of the class does not explain withdrawal. Model covers all four goals. |
| A2:writing:batch003-logeerkamer:1 | pass | comparable, unvalidated A2 | No question about the nightly price. Model covers all four goals. |
| A2:writing:batch003-loonstrook:1 | pass | comparable, unvalidated A2 | No day or time for discussion. Model covers all four goals. |

Edits in the proposed source:

- `A2:writing:batch003-sportles:1` / `criteria` → [["Zeg met welke sportles u stopt. Bedenk zelf een les.", "Say which sports class you are leaving. Choose a class."], ["Zeg dat u vanaf 1 november stopt.", "Say that you are stopping from 1 November."], ["Leg uit waarom u stopt. Bedenk zelf een reden.", "Explain why you are stopping. Think of a reason."], ["Vraag de club om uw afmelding per e-mail te bevestigen.", "Ask for email confirmation that you have been removed from the class."]] State that the confirmation must arrive by email; the former wording could mean only sending the request by email.
- `A2:writing:batch003-loonstrook:1` / `prompt` → "U bekijkt uw loonstrook van augustus. Dat is het overzicht van uw loon en uw uren. U werkte die maand 80 uur, maar het overzicht vermeldt 72 uur. Schrijf een e-mail aan uw werkgever. Noem de maand en beide aantallen uren. Vraag om controle. Vertel ook wanneer u hierover kunt praten. Bedenk zelf een dag en een tijd. Schrijf in hele zinnen." Make naming the month an explicit instruction to match the first criterion.
- `A2:writing:batch003-loonstrook:1` / `sample` → "Volgens mijn agenda heb ik in augustus 80 uur gewerkt. Op de loonstrook zie ik maar 72 uur. Dat is acht uur te weinig. Kunt u de uren voor mij nakijken? Ik heeft alle tijden in mijn agenda gezet. Die kan ik meenemen." Use an unambiguous verb agreement error; time amounts allow singular agreement, making the former intended error debatable. The missing discussion time is unchanged.
- `A2:writing:batch003-loonstrook:1` / `model` → "Volgens mijn agenda heb ik in augustus 80 uur gewerkt. Op de loonstrook zie ik maar 72 uur. Dat is acht uur te weinig. Kunt u de uren voor mij nakijken? Ik kan woensdag om drie uur met u praten. Dan neem ik mijn agenda mee. Daarin heb ik alle dagen en tijden geschreven." Use a direct numerical explanation without distracting agreement variation.

All 20 starters pass completion tests recorded in the JSON review. The proposed starters copy is unchanged. Each sample has one missing goal and verbatim quotes for its other goals. Models contain 51–57 words, with four to eight sentences and no sentence over 16 words.

The personal message uses the supported informal email type. The formal-heavy distribution follows the preserved recipients; balance registers in later set assembly. These five distinct topics are replacement drills, not a complete exam form. The supplementary grammar metadata does not change their A2 email format. No media is required.

The full proposed source passes `npm run batch:check -- content/batches/048-proposed.json` with no failures or warnings.

Proposal SHA-256: `5fcada86feaeac75495e6b3231c02b1726b583ca7f323812cf481c8cbb75b618`.

AI editorial review cannot validate CEFR difficulty or official exam equivalence. The missing exemplars directory was replaced for comparison by the complete adopted batch008 contract and babysitting emails. No author files, catalogue, sets or media were changed.
