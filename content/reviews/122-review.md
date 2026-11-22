# Review of batch 122 (KNM batch K)

## Meaning first (blind packet)

Packet hash (original): d033a97cb03d9bcc694fc53bc48e81832c09203aff1355bb591d70676e2b4d89. Written before opening the questions, options, keys, notes or the plan assignment.

These are KNM fact cards, not dialogues. Each card is a short plain statement that a learner would meet in an inburgering course; each prompt frames one persona who reads or sees the topic. Read as sources:

- voc-handelsbedrijf: coherent. The card says what the VOC was (a big company, 1602, trade with Asia). Ilias reading about 1602 is a natural reason to ask. Picture of a sailing ship at a quay fits. The question asks "Wat was de VOC?"; the card answers it directly.
- wilhelmus-volkslied: coherent. Card names the anthem and who it is about. Risk: the card says "volkslied van Nederland" and the question repeats "volkslied van Nederland", so the card is only useful after answering. The flag picture is a fitting setting, not the answer.
- duitse-inval-1940: coherent. A date and an event; the card states both. Calm street picture is fine and sensitive-topic safe (no people, no soldiers).
- europa-samenwerken: coherent. The reason is stated in one sentence. Library picture is a believable reading setting. The last sentence of the card (Nederland deed vanaf het begin mee) is a second fact the question does not test; acceptable as context.
- provincie-meeste-inwoners: coherent. The card gives two facts (most inhabitants, largest area) so the question can contrast two provinces; this is a deliberate pair, fine. "Pien kijkt naar de twaalf provincies" is a thin reason but harmless. Train picture fits.
- haven-rotterdam: coherent. Card says "Rotterdamse haven"; the question asks for the city, so the card gives the answer away only after answering, which is the KNM design. Persona "zoekt de grootste haven" is slightly artificial but acceptable.
- ov-saldo: coherent. A traveller needs money on the card; the card defines "saldo". Station-hall picture fits. Time-sensitive (OVpay).
- ov-kaart-uitlenen: coherent. A person who wants to lend a card to her sister is a real reason to ask. The card states the rule for both card types. The question "Welke kaart mag dat?" is answerable from it. Time-sensitive (OVpay).
- tandarts-volwassenen: the card opens with a question ("Gaat u elk jaar naar de tandarts voor controle?"), which is not a statement of fact and sounds odd on a fact card. It contains hard words (röntgenonderzoek, uitneembaar kunstgebit). Possible overlap with the child dentist fact; checked after the blind pass.
- opleiding-ander-beroep: the card is generic ("U kunt een opleiding volgen om in een ander beroep te gaan werken"). The question asks "Waarvoor ... volgens het UWV?" and the answer would be a very general purpose. Risk of a vague fact that nothing on the page pins down; checked after the blind pass.

Nothing here needs an invented premise. No item is a joke. Tone: all ordinary.

Blind findings confirmed after the full pass: the two items flagged in the blind pass (tandarts-volwassenen, opleiding-ander-beroep) are rejected; the rest stay coherent. Packet hash rebuilt from the proposed file: b9929eff66bbf1ff5f4184e8f72861c604a2683fb94dee8afb9a485810c4421f.

## Result

Proposed file: `content/batches/122-proposed.json`, SHA-256 `e2b467e9ac7f0db3b0044a49739be1397fa600a9c44018db8128b3875948b2b6`. 8 items: 5 pass, 3 pass (edited), 2 rejected. Batch check: no failures, no warnings; keys A2 / B3 / C3. Every sourceUrl opened on 2026-11-22.

| id | verdict | level | reason |
| --- | --- | --- | --- |
| voc-handelsbedrijf | pass | comparable | Canon: company founded 1602 for trade with Asia; both distractors false |
| wilhelmus-volkslied | pass (edited) | comparable | Canon verbatim; "strijd/huidige/zeeheld" replaced by plain words |
| duitse-inval-1940 | pass | comparable | Canon verbatim date; bevrijding 1945 and koninkrijk 1815 are false for 1940 |
| europa-samenwerken | pass (edited) | comparable | Canon verbatim reason; "gezamenlijke taal" simplified |
| provincie-meeste-inwoners | pass (edited) | comparable | IPO and CBS confirm Zuid-Holland; Gelderland "grootste oppervlakte" removed (Friesland is larger with water) |
| haven-rotterdam | pass | comparable | Port authority page verbatim; ranking stable, recheck yearly |
| ov-saldo | pass | comparable | 9292 verbatim; check yearly (OVpay) |
| ov-kaart-uitlenen | pass | comparable | 9292: anonymous card may be lent, personal card not; check yearly (OVpay) |
| tandarts-volwassenen | reject | - | Insurance cover (4.4.1), not 4.1.3; repeats the fact behind 033 tandarts-kind; hard words |
| opleiding-ander-beroep | reject | - | Generic sentence, duplicates 117 scholing-gemeente idea, absurd distractors; not what 1.1.5 names |

## Edits

- wilhelmus-volkslied text: "Hij leidde in de zestiende eeuw de strijd tegen Spanje." -> "Hij vocht in de zestiende eeuw tegen Spanje." Explanation: "huidige koning" and "zeeheld" replaced by "de koning van nu"; plain verbs.
- provincie-meeste-inwoners text: second claim about Gelderland removed; explanation says only that Gelderland is large but has fewer inhabitants; sourceNote records the CBS check.
- europa-samenwerken explanation: "gezamenlijke taal" -> "taal voor heel Europa".
- ov-saldo and ov-kaart-uitlenen sourceNote: reviewer check-yearly note (OVpay; wording general).

## Rejected items

See the table. 4.1.3 and 1.1.5 now stay at two items each in the catalogue; the coordinator needs a later fact for 4.1.3 (finding or registering with a tandarts, no primary page found today) and for 1.1.5.

## Diversity and set notes

Theme 5 now has 6 new items (5.1.1 two, 5.1.2 two, 5.2.1 two) plus 5.2.2 two. Forms: direct and persona facts and two rule applications; no yes/no, no behaviour questions. Both OV items share one source page and should not share a mock block. History items rely on the Canon van Nederland, acceptable for history.

## Media notes

Pictures not yet made; briefs show settings only and the alts reveal no key. Pien (twice) and Sjoerd keep identical traits; Olaf appears once after the rejection. Question audio needs generating with exact job keys.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Check yearly: OV-chipkaart rules (OVpay), Rotterdam port ranking, province population.
- Canon is the only source for the Wilhelmus and Europe facts; pictures were not inspected.
