# Review of batch 113 (A2 reading, 12 new)

## Meaning first (blind packet)

Packet hash of the author's source: 85dbafa9be7aef64b55eb2094b6a5535d8b7b77e02461074f4f4bedeab011de7. Findings written before the questions, keys, notes or assignment were opened.

1. afval-feestdagen: a municipal notice moves paper and plastic pickup to Saturday after two Friday holidays; the green bin stays on Thursday; the afvalpunt closes except Wednesday 30 December. Purpose is clear and practical. Weekdays match 2026 (25 Dec Friday, 30 Dec Wednesday). Risk: "afvalpunt" is not a basic word; the sentence "Hebt u oude spullen" explains it only loosely.
2. salaris-later: an employer tells staff the March salary comes a week late (1 April), the payslip appears on the normal day, and an advance of 400 euro is possible until Friday 26 March. Coherent and believable. Weekdays match 2027.
3. luizen-controle: a teacher announces a head-lice check (3 March) and a second one two weeks later. Warm, mild humour, works without cultural knowledge. Risk: "Na het wassen mag het kind de volgende dag weer naar school" implies the child is sent home, which the text never says.
4. kinderkaart: a bus company answers a parent's question about child fares: half price from 4 to 11, free under 4, a 5-euro card applied for online. Coherent. Risk: invented bus company must not be a real firm.
5. garantie-koffiemachine: a shop answers a complaint; the heating is covered by two-year guarantee, the broken glass is not, wet damage is not; bring machine and receipt. Coherent. Risk: the paragraph with three rules is dense.
6. werkplein-afspraak: a job-centre letter gives day, time, arrival, documents, cancel deadline and lateness rule. Weekdays match 2027. Risk: "Werkplein Zuid" may be a real name.
7. geluid-klacht: a housing association writes about repeated loud music on three Saturdays, quotes house rules and offers free neighbour mediation. Realistic, polite, concrete. Weekdays match 2027.
8. school-geld: a school explains a voluntary parental contribution with two payment options and free books. Realistic and factually right that the contribution is voluntary.
9. vakantie-regels: staff holiday request rules with six numbered rules. Coherent, purely instructive; no stocktaking.
10. fietsenschuur-regels: a housing block's new shed rules: two places per home, a number tag from the caretaker on Tuesday, no scooters, deadline Monday 29 March. Coherent.
11. griepprik: a local-paper notice of a flu-jab session; free; invited groups; two days; bring letter and ID. Real national rule (60 plus and medical risk groups) must be confirmed.
12. wijkteam: a folder for a local help team: what help, no doctor letter needed, a three-row drop-in table, phone hours. Coherent.

No item is a dialogue, so no turn links are needed. No scene is incoherent from the blind packet alone.

## Result

Packet hash of the proposed bytes: 712cc2c3219964f62258abad07513977484960bbc108992c772f5fb0ab52a2c6
Proposed file SHA-256: c8a2acd03e6ce6116a04b93637ec80a8ba0a6558370d24f54ba6ebdc25d8352e

| id | verdict | level | reason |
|---|---|---|---|
| afval-feestdagen | pass | comparable | Bericht of about 140 words in short lines; the persona question needs a holiday shift (Friday to Saturday) and |
| salaris-later | pass (edited) | comparable | Bericht of about 115 words; three questions each find one date among four (25 March, 26 March, 1 April); simil |
| luizen-controle | pass (edited) | comparable | Bericht of about 135 words with a rule per sentence; the learner applies two rules (hair loose and dry; back t |
| kinderkaart | pass (edited) | comparable | Email of about 135 words with an age range, a free group and a validity rule; both persona questions need the  |
| garantie-koffiemachine | pass (edited) | comparable | Email of about 160 words; the learner separates what the guarantee covers (heating) from what it does not (dro |
| werkplein-afspraak | pass (edited) | comparable | Brief of about 110 words in short lines; one time-limit question and one lateness rule with a small calculatio |
| geluid-klacht | pass (edited) | comparable | Brief of about 130 words with a reassuring tone; the rule question needs the right day group (Sunday falls und |
| school-geld | pass (edited) | comparable | Brief of about 105 words; q1 needs a two-step sum (2 x 20), q3 a negation ('betaalt niet, doet toch mee'). Com |
| vakantie-regels | pass | comparable | Regels of about 115 words, six numbered rules; q2 needs a date count of four weeks, otherwise rule lookups. Co |
| fietsenschuur-regels | pass (edited) | comparable | Regels of about 110 words, two questions; both are direct rule applications with a date (30 March after 29 Mar |
| griepprik | pass (edited) | comparable | Krant of about 115 words with a two-day, two-slot schedule in prose; q1 now requires combining the persona's w |
| wijkteam | pass (edited) | comparable | Folder of about 105 words with a three-row table written as lines; q1 combines work hours with the table, q2 a |

## Edits

- salaris-later / text: "Wij halen die 400 euro later van uw salaris af." -> "Uw salaris van maart is dan 400 euro lager.". Idiom 'van het salaris afhalen' is above A2; plain statement of the consequence.
- luizen-controle / text: "Dan belt de juf dezelfde dag met de ouder van het kind. Koop dan shampoo bij de drogist." -> "Dan belt de juf dezelfde dag met de ouder van het kind. Het kind gaat naar huis. Koop dan een speciale shampoo". The text never said the child is sent home, yet the key relies on 'weer naar school de volgende dag'; shampoo type made clear.
- kinderkaart / q1.evidence: "Daarna betaalt uw kind de gewone prijs." -> "De kaart is geldig tot de twaalfde verjaardag van uw kind. Daarna betaalt uw kind de gewone prijs.". Evidence must entail the key: 'Daarna' needs the preceding sentence.
- garantie-koffiemachine / text: "U schrijft ook dat het glas van de machine een keer is gevallen en kapot is." -> "U schrijft ook dat u het glas van de machine een keer hebt laten vallen. Het glas is nu kapot.". Natural wording; matches question q3 ('laten vallen').
- garantie-koffiemachine / q1.evidence: "Kom naar onze winkel op het Kerkplein." -> "Wat moet u doen? Kom naar onze winkel op het Kerkplein.". Purpose key needs the 'what must you do' sentence, not only the address.
- garantie-koffiemachine / q1.optC: "Zij vraagt geld voor een nieuw glas." -> "Zij zegt dat een nieuw glas gratis is.". The original C is partly true (Aisha pays for the glass), so it was defensible; the new C is clearly false.
- werkplein-afspraak / title, situation, text, q2.evidence, q2.explanation: "Werkplein Zuid" -> "Werkplein Zandhoek". 'Werkplein Zuid' is a real name (DWI Werkplein Zuid in Amsterdam, Werkplein Zuid-Oost Drenthe in Emmen). 'Werkplein Zandhoek' returned no organisation.
- werkplein-afspraak / q3.optA: "Hij praat nog met de adviseur." -> "Hij praat nog een uur met de adviseur.". Anchored in 'duurt ongeveer een uur'; clearly false for a late arrival.
- werkplein-afspraak / q3.optC: "Hij praat tien minuten met de adviseur." -> "Hij praat korter met de adviseur.". Option C was weakly anchored (coordinator doubt); now a plausible misreading of the lateness rule.
- werkplein-afspraak / q3.explanation: "Dat is meer dan vijftien minuten, dus krijgt hij een nieuwe afspraak." -> "Dat is meer dan vijftien minuten, dus krijgt hij een nieuwe afspraak. Hij praat dan niet korter en ook niet ee". Explain the new distractors.
- geluid-klacht / text: "Wij hebben een melding van uw buren gekregen. Zij horen" -> "Uw buren hebben ons gebeld. Zij horen". 'melding' is B1; plain verb.
- geluid-klacht / text: "Gaat de muziek door? Dan krijgt u een tweede brief." -> "Is er weer harde muziek? Dan krijgt u een tweede brief.". 'doorgaan' idiom replaced by plain wording.
- geluid-klacht / q2.optA: "Hij heeft al een tweede brief gehad." -> "Hij krijgt een boete voor de harde muziek.". Option B (Anton heard the neighbours' music) was not a reason for the letter and not anchored; A now anchored in 'nog geen boete'.
- geluid-klacht / q2.optB: "Hij heeft muziek van de buren gehoord." -> "Hij heeft al een tweede brief gehad.". Anchored in 'tweede brief' and clearly false.
- geluid-klacht / q2.explanation: "De verhuurder heeft een melding van de buren gekregen en wil met Anton praten. De tweede b" -> "De verhuurder heeft van de buren gehoord over harde muziek en wil met Anton praten. Het is nog geen boete. De ". Matches new options and text.
- school-geld / text: "Maak het geld over op de rekening van de school." -> "Betaal op de rekening van de school.". 'overmaken' avoided.
- school-geld / q2.optC: "Kinderen zonder geld blijven thuis." -> "De school vraagt elke maand geld.". Old C was the negation of q3's key and leaked it; new C is anchored in 'elk jaar'.
- school-geld / q3.prompt: "Mirela betaalt de 40 euro niet." -> "Mirela betaalt het geld niet.". 'de 40 euro' is per child; avoids ambiguity.
- fietsenschuur-regels / text: "Bedankt voor uw hulp!
De huismeester" -> "Bedankt voor uw hulp!
De verhuurder". The text refers to 'de huismeester' in the third person, so he cannot sign it.
- fietsenschuur-regels / q2.optC: "Liam moet de fiets repareren." -> "De huismeester doet er een kaartje op.". Old C was implausible; new C is a plausible misreading of the caretaker's role.
- fietsenschuur-regels / q2.explanation: "Na maandag 29 maart nemen zij fietsen zonder kaartje mee. Dinsdag 30 maart is na maandag 2" -> "Na maandag 29 maart nemen zij fietsen zonder kaartje mee. Dinsdag 30 maart is na maandag 29 maart. De huismees". Matches new C.
- griepprik / text: "Mensen met een longziekte of een hartziekte krijgen ook een uitnodiging." -> "Sommige mensen met een ziekte krijgen ook een uitnodiging, bijvoorbeeld mensen met een hartziekte.". 'longziekte' is not A2; the statement stays true to the RIVM groups and does not claim the list is complete.
- griepprik / q1.prompt: "Liam is 63 jaar. Hij werkt op dinsdagochtend en op donderdagmiddag. Welke tijd past bij he" -> "Liam is 63 jaar. Hij werkt op dinsdag de hele dag. Op donderdag werkt hij tot 12.00 uur. Welke tijd past bij h". Coordinator note: the old persona also fitted Tuesday 14.00-16.00. Now exactly one stated slot (Thursday 14.00-16.00) fits.
- griepprik / q1.options/answer/explanation: "A Di 10.00, B Di 13.00, C Do 10.00 (key), D Do 15.00" -> "A Di 10.00, B Di 15.00, C Do 10.00, D Do 15.00 (key)". Matches the new persona; key moves from C to D.
- griepprik / q2 prompt/options/explanation: "Liam krijgt om half tien de prik. Wanneer mag hij weg? (Na een kwartier / Meteen na de pri" -> "Liam krijgt om 14.30 uur de prik. Hoe laat mag hij weg?". 'Half tien' clashed with the new persona and added nothing; the time sum makes the question more than a copy of the sentence.
- wijkteam / text: "Bellen kan ook. Wij zijn bereikbaar op werkdagen van 9.00 tot 17.00 uur: 0345 27 61 00." -> "Bellen kan ook. U kunt ons bellen op werkdagen van 9.00 tot 17.00 uur: 0345 27 61 00.". 'bereikbaar' is B1.
- wijkteam / text: "Bel ons dan." -> "Zeg dat dan aan de telefoon.". Avoids repeating 'bel ons'.
- school-geld / text: "(99 words)" -> "added 'Hebt u een vraag? Vraag het dan aan de juf van uw kind.'". Text had 99 words; blueprint asks 100-250.

## Rejected

None.

## Diversity and set notes

Six task types, seven domains; three money/date notices (salaris, school-geld, kinderkaart) differ in structure (delay with advance, voluntary payment, age rule); two regels items differ in domain. Keys A8 B8 C7 D7. One light-humour item (luizen-controle).

## Media notes

Reading only; no media.

## Coordinator doubts resolved

Item 11 q1: persona now makes exactly one stated slot fit (Thursday 15.00). Item 6 q3: weak option C replaced. Item 1 q2: 'oude spullen wegbrengen' links directly to 'Hebt u oude spullen? Die brengt u naar het afvalpunt.', so no change. Item 6: name replaced as above.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Prices, hours and organisations are invented; the griepprik national rule was checked on rivm.nl on 22 November 2026 and may change each year.
- Absence of a web result for an invented name is not proof that no such organisation exists.
