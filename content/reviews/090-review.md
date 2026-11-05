# Review of batch 090 (A2 listening, 12 new exercises)

## Meaning first (blind packet)

Packet hash (original source): `7d872994804f81f20c5dbc481ed1a10a00fc39095fada1d40e8603a449208368`. Findings written from the packet only, before the questions, notes or plan were opened.

- **adres-wijzigen.** A man at the gemeente desk wants to register a new address, lacks the rental contract, must rebook, and asks which date to give (key day or moving day). Every reply follows from the previous turn: request for ID, request for contract, objection, refusal, instruction, the date question that the clerk answers. Practical result: a new appointment and the correct date. Coherent (5). Risk: the clerk's rule must stay generally true, with no legal advice (the contract is "needed", not "legally required"). The two dates are a deliberate competing pair and are said once each.
- **buren-keuken.** A neighbour warns an older neighbour about a week of building noise. Replies follow (days, start time, her reaction, contact arrangement). Warm, ordinary, concrete purpose: she knows when it will be loud and whom to call. Coherent (5). Risk: heavy memory load (four days, three clock times, two phone contacts) in one scene; the last turn is long.
- **uitnodiging-gesprek.** A hotel HR employee phones an applicant, proposes a time, she cannot at ten, they settle on a later one, he gives the address, the side entrance and what to bring. Each reply answers the previous turn. Coherent (5). Risk: the dialogue spends two turns on the entrance and the chef; fine because it serves the visit.
- **school-ziek-kind.** A teacher's voicemail: a child has a headache and must be collected; if the parent cannot come someone else may, after calling back; call the school number, not the teacher's phone. Concrete, believable, ordinary (5). Risk: several instructions in one message (who, where, whom, which number).
- **rijles-verzet.** A driving instructor moves a lesson because the car must go to the garage, offers two new slots, says where the lesson starts and how to answer. Ordinary, concrete (5). Risk: two competing days/times plus a call-back time.
- **museum-sluit.** A closing announcement: closing time, café already closed, cloakroom, shop open ten minutes longer, opening time tomorrow. Typical museum announcement, every item is an action a visitor would take (4/5). Risk: the shop "tien minuten langer" must be read as "until ten past five"; fine because both are said.
- **bus-voor-trein.** Station announcement on replacement buses at the weekend: where buses leave, frequency, extra time, ticket validity, other lines unaffected. Coherent, everyday (5). Risk: "niet voor het station" is only clear from the next sentence.
- **afvalpas-uitleg.** A municipal officer explains new underground containers at a neighbourhood evening. Every sentence serves residents: colours, pass, price, what to do when full. Coherent (4). Risk: this is a long information dump (many colours, prices and conditions); the ending question "Hebt u nog vragen?" is natural for a meeting.
- **fysio-oefeningen.** A physiotherapist gives three home exercises with frequency and a stop rule, then a follow-up. Natural for a physio session (5). Risk: counts and frequencies (two a day, ten times, half an hour, two weeks).
- **ziekenhuis-parkeren.** A local news item about cheaper hospital parking, a new garage, a closed back car park and the bus. A normal local news bundle around one hospital. Coherent (4). Risk: very many numbers (old and new price, daily maximum, date, three bus frequencies).
- **nieuwe-zwemplas.** News item about a new outdoor swimming spot: date, distance, free entry, opening hours, lifeguard on weekends, dogs, cycling, parking. Coherent and seasonal (4/5). Risk: "zwemplas" and "badmeester" may be unknown words for A2 and must not carry an answer.
- **kapsalon-reclame.** A new hairdresser's radio advert: walk-in on weekdays, Saturday by appointment, prices, late opening, offer, address. Typical advert, concrete (5). Risk: price and hours load; the invented shop name needs the web check.

Tone: every source is an ordinary everyday scene; none depends on an absurd premise. No topic jumps, no stocktaking-for-distractor dialogue, no recited answer lists: the two dialogues spend each turn on a concrete next step. Remaining doubts go to the full-source pass.

After the repairs the blind packet was rebuilt from the proposed bytes (hash `5cb4fd175e6da7f7027b872d61b69ff35c97f52c80daa18ae823cf82c90faad2`) and the meaning pass repeated for the four changed scripts (adres-wijzigen, school-ziek-kind, afvalpas-uitleg, ziekenhuis-parkeren). Ratings unchanged.

## Verdicts

Proposed file: `content/batches/090-proposed.json`, SHA-256 `ca35cec555f87898060e5de4bca35d054576e6363c5465473b4f06197927a102`. 12 pass, 6 of them edited, 0 rejected. `batch-check` ends with no failures (8 vocabulary warnings judged below).

| id | verdict | level vs existing A2 | reason |
| --- | --- | --- | --- |
| adres-wijzigen | pass (edited) | comparable | Option C was a true statement; replaced. Clerk's rule softened to "nu niet". |
| buren-keuken | pass | comparable | Load of days and times is high but each is said once; ordinary, not a joke. |
| uitnodiging-gesprek | pass (edited) | comparable | q2 key was the longest and only role-named option; options made parallel. |
| school-ziek-kind | pass (edited) | comparable | Teacher cannot already stand before the class while phoning: "zo weer". |
| rijles-verzet | pass | comparable | Clean two-slot combination plus fallback. |
| museum-sluit | pass | comparable | Short, all facts said once; garderobe explained twice. |
| bus-voor-trein | pass (edited) | comparable | q2: "treinkaartje" only in the key; prompt and options rebuilt. |
| afvalpas-uitleg | pass (edited) | harder (flag) | Longest uitleg; unasked "container vol" rule cut. Still a little harder than the mean. |
| fysio-oefeningen | pass | comparable | Numbers separated by role; stop rule is plain general advice. |
| ziekenhuis-parkeren | pass (edited) | harder (flag) | Nine figures; "bus acht" collided with "acht euro", now bus twaalf. |
| nieuwe-zwemplas | pass | comparable | Two plain facts asked; badmeester in no prompt or option. |
| kapsalon-reclame | pass | comparable | Typical advert; child price rule tested. |

## Edits

- adres-wijzigen: script turn 7 "uw adres niet veranderen" to "uw adres nu niet veranderen" (and the q1 evidence); q1 option C "Mehmet heeft de sleutel nog niet gekregen." to "Mehmet verhuist pas over een maand." (clearly false, anchored in the dates); q1 explanation follows.
- uitnodiging-gesprek: q2 option A "Naar de chef van de keuken." to "Naar iemand van de keuken." (parallel with B and C; the key is not the longest or the only role).
- school-ziek-kind: "Ik sta voor de klas" to "Ik sta zo weer voor de klas".
- bus-voor-trein: q2 prompt "Youssef heeft al een kaartje voor Apeldoorn. Wat moet hij dit weekend doen?"; options B "Tot maandag wachten.", D "Zijn kaartje gebruiken."
- afvalpas-uitleg: removed "Is een container vol? Zet uw zak er dan niet naast. Meld het in de app van de gemeente." (about 150 spoken words; no question used it).
- ziekenhuis-parkeren: "Bus acht" to "Bus twaalf" (script and q2 explanation).
- Every `text` was rebuilt from the script; all evidence quotes were re-verified as substrings.

## Author's doubts resolved

- adres-wijzigen q1 option C: replaced (see above). The gemeente clerk now speaks only about this visit, gives no deadline or legal claim and the item stays generally true.
- Short museum item with three questions: accepted. Every fact is said once, the three keys are time, status and action, and q3 avoids "garderobe". Option D rests on a mishearing of "kwartier" but is clearly false.
- Number load in ziekenhuis-parkeren: kept with the bus-number fix; flagged slightly harder. Each tested figure is said once; distractors are the other prices and frequencies.
- badmeester: kept. It is explained by "let ... op de zwemmers" and no prompt or option contains it; q1 asks for "iemand". Not tested.
- Other warnings: keukenbedrijf, hoofdpijn, lesauto, museumwinkel, busstation, grasveld, binnenlopen and zwemplas are transparent compounds in context; garderobe (one allowed unlisted word) and knieën are explained in the script and not tested.
- Tone: the author called buren-keuken lightly humorous; I classify all 12 as ordinary (0 light-humor). The coordinator should check the combined A2 mix.

## Rejected

None.

## Diversity and set notes

Titles and premises do not repeat the 38 existing A2 listening items (checked against catalogue titles: no hairdresser, hospital parking, swimming lake, driving lesson, address registration or container item exists). museum-sluit and 022-sluitingstijd are both closing announcements but test different facts. Domains are spread over all eight; task types 3 gesprek, 2 voicemail, 2 omroep, 2 uitleg, 2 nieuws, 1 reclame as planned. Keys A 8, B 8, C 9, D 3 (D only in six four-option questions). Place afvalpas-uitleg and ziekenhuis-parkeren away from the start of a drill set.

## Media notes

Voice pairs differ in every conversation and none is m-adult with f-adult. Stills show no tested fact. Check on the contact sheet that the three containers in afvalpas carry no symbol or sign, and that the museum children wear no coats (q3). Names: the web search on 5 November 2026 found no business called "Hotel De Groene Kade" or "Kapper Kort en Krul".

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. The name check was one combined search. The gemeente procedure is judged plausible, not checked for every municipality. No audio or pictures exist yet.
