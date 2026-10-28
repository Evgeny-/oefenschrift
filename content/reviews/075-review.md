# Batch 075: independent review (A1 reading rebuild)

Pass: 15 items and 30 questions (7 unchanged, 8 edited by the reviewer). Rejected: 0. A1 is a foundation authoring target; difficulty is unvalidated and nothing here claims exam equivalence.

Proposed SHA-256: `b9facbcfad9d567a375e5c4635acad2a7e7925c85ec638efbaab556a63e5e0f5`. Final source-packet SHA-256: `030a4e182320a67f0f94b045b34b1272cd7e120254cbc614ff7ffe9159a18a2d` (author packet `b50f3249f7c9aae48822aa4ae49ece0f004d1d85f26625bda21e59bd26a89915`).

The blind meaning findings were written before any question, key, note or earlier review was opened and repeated on the final bytes. `npm run batch:check` on the proposed file reports no failures or warnings.

| ID | Verdict | Level | Practical purpose |
| --- | --- | --- | --- |
| `A1:reading:batch069-lesboek:1` | pass | A1 foundation | De cursist komt morgen voorbereid naar de les, met het boek bij zich, en weet welke oefening na de tekst komt. |
| `A1:reading:batch071-eend-tas:1` | pass (edited) | A1 foundation | Afspreken dat de lezer Eva om twee uur bij het station ophaalt, met de zware tas als duidelijke reden om te vragen. |
| `A1:reading:batch071-plant-ogen:1` | pass | A1 foundation | De lezer naar de keuken laten komen voor koffie; de plant met ogen is een vrolijke extra reden om te komen kijken. |
| `A1:reading:batch071-kat-werkt:1` | pass | A1 foundation | Een belafspraak om vier uur maken zodat Jan zijn vraag over het rooster kan stellen terwijl hij thuis werkt. |
| `A1:reading:batch071-taart-staart:1` | pass | A1 foundation | De lezer uitnodigen voor het verjaardagsdiner en laten weten wat er te eten is, zodat hij of zij kan komen. |
| `A1:reading:batch075-kip-tuin:1` | pass (edited) | A1 foundation | Erachter komen van wie de kip is en de lezer laten bellen voordat de buurvrouw na zes uur niet meer thuis is. |
| `A1:reading:batch071-hoed-les:1` | pass (edited) | A1 foundation | De lezer vragen een groet op de gezamenlijke kaart te schrijven voor Lisa, die morgen jarig is. |
| `A1:reading:batch071-winkel-sok:1` | pass (edited) | A1 foundation | De klant laten weten wanneer hij de bestelde jas kan ophalen en wat hij moet betalen. |
| `A1:reading:batch069-tafel-dragen:1` | pass (edited) | A1 foundation | Hulp vragen bij een tafel die voor één persoon te zwaar is, en een tijd afspreken. |
| `A1:reading:batch069-kopjes:1` | pass | A1 foundation | De lezer vragen vóór het teameten kopjes te kopen en vertellen waar dat goedkoop kan. |
| `A1:reading:batch071-beer-dokter:1` | pass (edited) | A1 foundation | De patiënt voorbereiden op de afspraak: weten hoe laat hij of zij komt en waar hij of zij moet wachten. |
| `A1:reading:batch071-hond-feest:1` | pass (edited) | A1 foundation | De lezer uitnodigen voor de wandeling en afspreken dat Kofi hem of haar komt ophalen. |
| `A1:reading:batch071-koffer-les:1` | pass | A1 foundation | De klas vertellen waar zij vandaag heen moet, wat zij meeneemt en waar en wanneer Tom wacht. |
| `A1:reading:batch075-nieuw-paspoort:1` | pass (edited) | A1 foundation | De ontvanger vertellen wanneer hij of zij naar de gemeente moet komen en wat hij of zij meeneemt. |
| `A1:reading:batch075-zwarte-schoenen:1` | pass | A1 foundation | De werknemer laten weten hoe laat de dienst begint en wat hij of zij aantrekt. |

## Reviewer edits (field, new text, why)

- `batch071-eend-tas` questions[1].prompt -> 'Hoe laat komt Eva?': The old q2 prompt 'op het station' cued q1's train answer.
- `batch071-eend-tas` images[0].brief -> 'The closed front door of a Dutch terraced house, seen from the street, with a doormat and a small potted plant beside it. Quiet morning light. Do not show bags, trains, buses, cars, bicycles, stations, tickets, people, phones or clocks. No text, letters, numerals, signs, clock faces or logos.': The bag stood at the reader's door although Eva's bag is with Eva; a door is neutral and shows no key.
- `batch071-eend-tas` images[0].alt -> 'Een deur van een huis met een plant.': Alt follows the new picture.
- `batch075-kip-tuin` text -> 'De kip eet uw tomaten!': Removed the ambiguous 'al' and the pronoun 'hij' for a hen (implicit reference); signed 'Uw buurvrouw' like a real note.
- `batch075-kip-tuin` text -> 'Groeten,\nUw buurvrouw': Removed the ambiguous 'al' and the pronoun 'hij' for a hen (implicit reference); signed 'Uw buurvrouw' like a real note.
- `batch075-kip-tuin` questions[0].evidence -> 'De kip eet uw tomaten!': Matches the new sentence verbatim.
- `batch075-kip-tuin` questions[0].explanation -> 'De buurvrouw schrijft: De kip eet uw tomaten!': Matches the new sentence.
- `batch071-hoed-les` questions[1].prompt -> 'Wat koopt Samir?': The old prompt named Lisa and cued q1 'Wie is morgen jarig?'.
- `batch071-winkel-sok` text -> 'U kunt de jas vrijdag ophalen.': Replaced the implicit pronoun 'hem' with 'de jas'.
- `batch071-winkel-sok` questions[0].evidence -> 'U kunt de jas vrijdag ophalen.': Matches the new sentence verbatim.
- `batch071-winkel-sok` questions[0].explanation -> 'De winkel schrijft: U kunt de jas vrijdag ophalen.': Matches the new sentence.
- `batch069-tafel-dragen` text -> 'Mijn nieuwe tafel is erg groot.': Replaced the pronoun sentence 'Hij is erg groot' by one clear sentence about the table.
- `batch071-beer-dokter` text -> 'Hallo,': 'Beste meneer' assumed the patient's gender; 'daar' was an implicit reference.
- `batch071-beer-dokter` text -> 'De dokter komt u halen.': 'Beste meneer' assumed the patient's gender; 'daar' was an implicit reference.
- `batch071-hond-feest` text -> 'om negen uur halen': Pickup time varied (tien uur recurred in four messages).
- `batch075-nieuw-paspoort` title -> 'Naar de gemeente': The title 'Uw nieuwe paspoort' put 'paspoort' next to q2's key 'Uw oude paspoort'.
- `batch075-nieuw-paspoort` questions[0].prompt -> 'Wanneer komt u naar de gemeente?': The old prompt 'het paspoort' recurred only in q2's key; the new prompt names the gemeente instead.
- `batch075-nieuw-paspoort` text -> 'Kom op dinsdag om drie uur.': Pronoun 'het' replaced by 'het paspoort' (implicit reference); pickup time varied from tien to drie uur.
- `batch075-nieuw-paspoort` questions[0].evidence -> 'Kom op dinsdag om drie uur.': Matches the new time verbatim.
- `batch075-nieuw-paspoort` questions[0].explanation -> 'De gemeente schrijft: Kom op dinsdag om drie uur.': Matches the new time.
- `batch075-nieuw-paspoort` text -> 'U kunt het paspoort ophalen bij de gemeente.': Pronoun 'het' replaced by 'het paspoort' (implicit reference); pickup time varied from tien to drie uur.

## Rejected

None.

## Tone, diversity and sets

13 ordinary, 2 light-humor (`plant-ogen`, `kip-tuin`); the plan allows two. Keys A 10, B 10, C 10; the author's five sets keep two of each letter and never put Tom or Kofi in the same set. Purposes are 15 distinct everyday messages. Tom and Kofi recur as the same person in two exercises each.

## Media notes

Only `eend-tas` changed its picture (front door instead of a bag, alt follows). Rewrites change texts, so existing pictures must be regenerated or re-verified against the final briefs. Kofi in `hond-feest` keeps: man about 30, short black hair, round glasses, green jacket. Check the rendered hen shows no tomatoes and the waiting area shows no passport.

## Limitations

Independent AI editorial judgment only. 16 of 30 questions ask time or place with neighbouring-hour distractors. `kip-tuin` asks what the hen eats and until when the neighbour is home (not the animal and place named in the plan) so the picture cannot answer. `kat-werkt` and `koffer-les` are plain and slightly thin but coherent. The coordinator checks the program-wide tone count.
