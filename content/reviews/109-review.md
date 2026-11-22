# Review of batch 109 (KNM batch B: themes 1 and 4)

## Meaning first (blind packet)

Packet hash (original): 755f06857639d61475f8bc04f1a22ea5e800c3e489804bfab74179687467e5c8. Written before the options, keys, notes or plan assignment were opened. KNM items are fact cards, so the check asks whether each persona has a real reason to need the fact and whether the card supports the prompt.

- vakbond-cao: Sanne works in a warehouse with a cao; asking who concludes the cao is a plain fact question. Card and prompt agree. Fine. Risk: the prompt says "organisaties", the card says "werknemersorganisaties", so the key may echo the prompt; check in the options.
- ww-premie-werkgever: Mohammed is an employee; who pays the WW premium is a natural fact for an employee reading a payslip. Card agrees. "In loondienst" and "volgens de regel" are fair but "loondienst" is a harder term (check).
- discriminatie-vakbond: Bilal suspects discrimination at work; where to get legal advice. Card lists two bodies ("bijvoorbeeld"), so the options must hold exactly one of them. Calm tone. Risk: "juridisch advies" is a hard phrase (check).
- zzp-pensioen: Iris is self-employed; who arranges extra pension. Natural. Card says the zzp'er arranges it herself. Risk: "lijfrente" is a hard word, but only on the card; the question itself is plain.
- huisarts-rekening: Kofi has a doctor's appointment; where the bill goes. The card says the same thing twice in two sentences (stocktaking, but harmless). Natural.
- nota-zorgverlener: Mariam gets a physiotherapist bill she does not understand; whom to ask. The card sets up the exception (direct bill goes to the provider). The prompt gives the condition. Works. Risk: the card repeats "fysiotherapeut" from the prompt (coordinator doubt).
- drogist-zonder-recept: Thijs has a cold and wants medicine without prescription; natural. Card is clear. Prompt matches.
- tandarts-controle: Kofi wants healthy teeth; how often the dentist advises a check. The prompt names Thuisarts as source, so the question is "what does this body advise", which is awkward for a learner (a source name in the question) but coherent. Source quality to check.
- ggz-doorverwijzing: Esther has heavy psychological complaints; who refers her. Calm, no distress shown. Card supports it.
- spoed-huisartsenpost-eerst: Thijs has stomach ache on Saturday, life not in danger; whom to call first. The prompt sets up the condition (Saturday, no danger) that the card names. Coherent. The picture shows him in daylight holding his stomach; calm.
- dossier-online: Sanne wants her medical file online; where. Card names the PGO. Real reason, but "persoonlijke gezondheidsomgeving" is a hard term for A2 (coordinator doubt).
- toeslagen-servicepunt: Iris finds DigiD and allowances hard; where help. Realistic. Card agrees.
- schuldhulp-gemeente: Bilal has debts; which organisation. Card says the gemeente. Calm tone. Overlap with older "de gemeente" keys to check.

Blind verdict: all thirteen are coherent, ordinary scenes with a practical reason; no item needs a premise that is not on the page.

After the repairs the blind packet was rebuilt from the proposed bytes (hash `3ee0bc54574f100e84277a82737fa1bb921754ff1f115ca065bb86eaf3fc9d20`) and the changed cards and prompts were read again. All thirteen still pass; the repaired nota-zorgverlener now needs the learner to tell a bill sent by the provider from one on the insurer's website, which the card sets up.

## Verdicts

| id | verdict | level | reason |
|---|---|---|---|
| vakbond-cao | pass (edited) | comparable | Key proved by the Rijksoverheid cao page; card word order and 'namens' simplified. |
| ww-premie-werkgever | pass (edited) | comparable | Key proved; 'loondienst' and the 'werkt'/'werkgever' echo removed. |
| discriminatie-vakbond | pass (edited) | comparable | Key proved; 'juridisch advies' simplified; possessive echo removed from the key. |
| zzp-pensioen | pass (edited) | easier | Key proved; 'lijfrente' and 'opdrachtgever' replaced; easy because of 'zelf'. |
| huisarts-rekening | pass (edited) | easier | Key proved; 'rechtstreeks' replaced; evidence now the sentence that says where the bill goes. |
| nota-zorgverlener | pass (edited) | harder | Key proved, but the key repeated the prompt word and the distractors were absurd; insurer and huisarts now compete, 'mijn omgeving' removed. |
| drogist-zonder-recept | pass (edited) | easier | Key proved; the hard distractor 'consultatiebureau' replaced. |
| tandarts-controle | pass (edited) | comparable | Key proved from Thuisarts; the question no longer asks about a website the learner cannot know. |
| ggz-doorverwijzing | pass (edited) | comparable | Key proved; 'matige tot zware' and 'zorgaanbieder' replaced by a plain gloss. |
| spoed-huisartsenpost-eerst | pass | comparable | Passes unchanged: condition set up in the prompt, 112 and SEH false. |
| dossier-online | pass (edited) | comparable | Key proved; card simplified (inzien, zorginstelling); PGO kept and explained. |
| toeslagen-servicepunt | pass (edited) | comparable | Key proved; prompt now names zorgtoeslag so 'toeslagen' is not a lone cue; 'wijzigen' replaced. |
| schuldhulp-gemeente | pass (edited) | easier | Key proved; prompt shortened; easy because 'gemeente' is the commonest key. |

Counts: 1 pass, 12 pass (edited), 0 rejected. Keys B A C A B C A C B A B B A (A 5, B 5, C 3).

## Edits (field, before, after, why)

- **vakbond-cao:1** `text`: "Een cao sluiten werkgevers of hun organisaties af met werknemersorganisaties. Dat zijn meestal vakbonden. Vakbonden praten dus namens de werknemers mee over loon en andere afspraken." -> "Werkgevers of hun organisaties sluiten een cao af met werknemersorganisaties. Dat zijn meestal vakbonden. Vakbonden praten dus voor de werknemers mee over loon en andere afspraken.". Normal word order instead of the object-first 'Een cao sluiten ... af'; 'namens' replaced by 'voor'. Evidence kept.
- **vakbond-cao:1** `explanation`: "Een cao wordt afgesloten door werkgevers of werkgeversorganisaties en werknemersorganisaties. Dat zijn meestal vakbonden. De ondernemingsraad praat mee binnen één bedrijf, maar sluit geen cao af. Het UWV regelt uitkeringen en is geen partij bij een cao." -> "Een cao wordt afgesloten door werkgevers of hun organisaties en door werknemersorganisaties. Dat zijn meestal vakbonden. De ondernemingsraad praat mee binnen één bedrijf, maar sluit geen cao af. Het UWV regelt uitkeringen en sluit geen cao af.". Plainer wording; the UWV rationale now says why it is false in the same words as the OR line.
- **ww-premie-werkgever:1** `prompt`: "Mohammed werkt in loondienst. Wie betaalt volgens de regel de WW-premie voor hem aan de Belastingdienst?" -> "Mohammed heeft een baan bij een bouwbedrijf. Wie betaalt volgens de regel de WW-premie voor hem aan de Belastingdienst?". 'In loondienst' is B1 and 'werkt' echoed the key 'werkgever'; the picture shows a building site, so the sentence now matches it.
- **ww-premie-werkgever:1** `explanation`: "Mohammed werkt in loondienst. De regel is dat zijn werkgever de premies voor de werknemersverzekeringen, zoals de WW, aan de Belastingdienst betaalt. Mohammed betaalt deze premie volgens de regel niet zelf. Het UWV betaalt de WW-uitkering aan mensen die werkloos zijn, maar niet de premie voor een werknemer." -> "Mohammed heeft een baan bij een bouwbedrijf. De regel is dat zijn werkgever de WW-premie aan de Belastingdienst betaalt. Mohammed betaalt deze premie volgens de regel niet zelf. Het UWV betaalt de WW-uitkering aan mensen zonder werk, maar niet de premie voor een werknemer.". Follows the new prompt; plain words.
- **discriminatie-vakbond:1** `text`: "Voelt u zich gediscrimineerd op het werk? Dan kunt u juridisch advies vragen, bijvoorbeeld bij het Juridisch Loket of bij uw vakbond." -> "Voelt u zich gediscrimineerd op het werk? Dan kunt u advies over uw rechten vragen, bijvoorbeeld bij het Juridisch Loket of bij uw vakbond.". 'Juridisch advies' is a B1 phrase; 'advies over uw rechten' says the same. Evidence quote unchanged.
- **discriminatie-vakbond:1** `prompt`: "Bilal denkt dat hij op zijn werk wordt gediscrimineerd. Bij wie kan hij juridisch advies vragen?" -> "Bilal denkt dat hij op zijn werk wordt gediscrimineerd. Bij wie kan hij advies over zijn rechten vragen?". Matches the card.
- **discriminatie-vakbond:1** `optionC`: "Bij zijn vakbond." -> "Bij een vakbond.". The key was the only option with a possessive ('zijn vakbond') that echoed the prompt ('zijn werk'); all options now start 'Bij de/een' without a possessive.
- **discriminatie-vakbond:1** `explanation`: "Bij discriminatie op het werk kunt u juridisch advies vragen bij het Juridisch Loket of bij uw vakbond. De Belastingdienst int belasting en de Kamer van Koophandel schrijft bedrijven in. Zij geven geen juridisch advies over discriminatie." -> "Bij discriminatie op het werk kunt u advies over uw rechten vragen bij het Juridisch Loket of bij uw vakbond. De Belastingdienst int belasting en de Kamer van Koophandel schrijft bedrijven in. Zij geven geen advies over discriminatie.". Plain words; follows the card.
- **zzp-pensioen:1** `text`: "Een zzp'er werkt voor zichzelf en heeft recht op AOW. Extra pensioen naast de AOW kan een zzp'er zelf regelen, bijvoorbeeld met een lijfrente." -> "Een zzp'er werkt voor zichzelf en heeft recht op AOW. Extra pensioen naast de AOW kan een zzp'er zelf regelen. Bijvoorbeeld bij een bank.". 'Lijfrente' is a hard word that no question needs; the page also names a bank or insurer. Evidence quote unchanged.
- **zzp-pensioen:1** `optionB`: "Haar opdrachtgever." -> "Haar klant.". 'Opdrachtgever' is above A2; 'klant' is the plain word and is equally false (a client is not an employer).
- **zzp-pensioen:1** `explanation`: "Een zzp'er heeft recht op AOW. Voor extra pensioen daarnaast kiest de zzp'er zelf een regeling, bijvoorbeeld een lijfrente. Een opdrachtgever is geen werkgever en hoeft dat pensioen niet te regelen. De gemeente heeft hier geen taak." -> "Een zzp'er heeft recht op AOW. Voor extra pensioen daarnaast kiest de zzp'er zelf een regeling, bijvoorbeeld bij een bank. Een klant is geen werkgever en hoeft dat pensioen niet te regelen. De gemeente heeft hier geen taak.". Follows the card and option B.
- **huisarts-rekening:1** `text`: "De huisarts stuurt de rekening rechtstreeks naar uw zorgverzekeraar. Uw zorgverzekeraar betaalt rechtstreeks de rekening van uw huisarts." -> "De huisarts stuurt de rekening direct naar uw zorgverzekeraar. Uw zorgverzekeraar betaalt de rekening van uw huisarts.". 'Rechtstreeks' (B1) replaced by 'direct', the word the page uses elsewhere; the first sentence now carries the tested fact.
- **huisarts-rekening:1** `evidence`: "Uw zorgverzekeraar betaalt rechtstreeks de rekening van uw huisarts" -> "De huisarts stuurt de rekening direct naar uw zorgverzekeraar". The question asks where the bill goes, so the evidence is the sentence that says it.
- **huisarts-rekening:1** `explanation`: "De huisarts stuurt de rekening naar de zorgverzekeraar. De zorgverzekeraar betaalt de rekening van de huisarts rechtstreeks. Kofi krijgt voor dit bezoek dus geen rekening thuis. De gemeente betaalt geen zorg van de huisarts." -> "De huisarts stuurt de rekening direct naar de zorgverzekeraar. De zorgverzekeraar betaalt de rekening van de huisarts. Kofi krijgt voor dit bezoek dus geen rekening thuis. De gemeente betaalt geen zorg van de huisarts.". Follows the card.
- **nota-zorgverlener:1** `text`: "Een rekening rechtstreeks van een zorgverlener, zoals een fysiotherapeut? Stel uw vraag dan aan die zorgverlener. Een rekening in 'mijn omgeving' van uw verzekeraar? Vraag het dan aan de verzekeraar." -> "Krijgt u een rekening direct van een zorgverlener, zoals een fysiotherapeut? Stel uw vraag dan aan die zorgverlener. Staat de rekening online bij uw verzekeraar? Vraag het aan de verzekeraar.". 'Mijn omgeving' is a portal name no A2 learner knows; replaced by 'online bij uw verzekeraar'. 30 words. Evidence quote unchanged.
- **nota-zorgverlener:1** `prompt`: "Mariam krijgt een rekening rechtstreeks van haar fysiotherapeut. Zij begrijpt een bedrag niet. Bij wie kan zij daarmee terecht?" -> "Mariam krijgt een rekening direct van haar fysiotherapeut. Zij begrijpt een bedrag niet. Aan wie stelt zij haar vraag?". 'Rechtstreeks' replaced by 'direct'; the question now mirrors the card ('Stel uw vraag ... aan').
- **nota-zorgverlener:1** `optionA`: "Bij de gemeente." -> "Aan de zorgverzekeraar.". Replaces 'Bij de gemeente'. The key repeated 'fysiotherapeut' from the prompt and the two other options were absurd, so the key was found by repetition. The insurer is the real confusion (the card contrasts the two kinds of bill) and is false for a bill that comes directly from the provider.
- **nota-zorgverlener:1** `optionB`: "Bij de Belastingdienst." -> "Aan haar huisarts.". Replaces 'Bij de Belastingdienst' with a plausible care provider who did not send the bill; false.
- **nota-zorgverlener:1** `optionC`: "Bij de fysiotherapeut." -> "Aan de fysiotherapeut.". Key moved to C to keep the letters balanced; wording follows the new prompt.
- **nota-zorgverlener:1** `explanation`: "Mariam heeft de rekening rechtstreeks van haar fysiotherapeut gekregen. Dan stelt zij haar vraag aan de fysiotherapeut. Alleen bij een rekening in 'mijn omgeving' van de zorgverzekeraar gaat de vraag naar de verzekeraar. De gemeente en de Belastingdienst kennen de rekening niet." -> "Mariam heeft de rekening direct van haar fysiotherapeut gekregen. Dan stelt zij haar vraag aan de fysiotherapeut. Alleen een rekening die online bij de verzekeraar staat, bespreekt zij met de verzekeraar. Haar huisarts heeft de rekening niet gestuurd.". Follows the new options.
- **drogist-zonder-recept:1** `optionB`: "Bij het consultatiebureau." -> "Bij de tandarts.". 'Consultatiebureau' is a hard word that is not the subject of the question; replaced by a plain health place.
- **drogist-zonder-recept:1** `optionC`: "Bij de tandarts." -> "Bij de fysiotherapeut.". Second plain health place; both are false (neither sells medicines).
- **drogist-zonder-recept:1** `explanation`: "Medicijnen die u zonder recept mag kopen, heten zelfzorgmedicijnen. Die zijn ook bij de drogist of in andere winkels te koop. Het consultatiebureau is er voor jonge kinderen en de tandarts is voor de tanden. Zij verkopen geen medicijnen." -> "Medicijnen die u zonder recept mag kopen, heten zelfzorgmedicijnen. Die zijn ook bij de drogist of in andere winkels te koop. De tandarts en de fysiotherapeut verkopen geen medicijnen.". Follows the new options.
- **tandarts-controle:1** `text`: "Thuisarts is de website van de huisartsen. Het advies is: Ga elk jaar 1 of 2 keer naar de tandarts voor controle. Ook als u een kunstgebit hebt." -> "Thuisarts is de website van de huisartsen. Het advies is: ga elk jaar 1 of 2 keer naar de tandarts voor controle.". The source name is now explained on the card, not asked in the question; 'kunstgebit' sentence dropped (hard word, not needed). 21 words.
- **tandarts-controle:1** `evidence`: "Ga elk jaar 1 of 2 keer naar de tandarts voor controle" -> "ga elk jaar 1 of 2 keer naar de tandarts voor controle". Matches the new card text.
- **tandarts-controle:1** `prompt`: "Kofi wil zijn tanden gezond houden. Hoe vaak adviseert Thuisarts een controle bij de tandarts?" -> "Kofi wil zijn tanden gezond houden. Hoe vaak adviseren huisartsen een controle bij de tandarts?". A learner cannot know the website 'Thuisarts' before answering; the advice is by the huisartsen (NHG), so the question says so.
- **tandarts-controle:1** `optionA`: "Iedere maand van het jaar." -> "Elke maand van het jaar.". Shorter, parallel with the other two options.
- **tandarts-controle:1** `optionB`: "Een keer in de vijf jaar." -> "Eén keer in de vijf jaar.". Parallel wording.
- **tandarts-controle:1** `optionC`: "1 of 2 keer per jaar." -> "Eén of twee keer per jaar.". Numbers spelled out for the audio and parallel with B.
- **tandarts-controle:1** `explanation`: "Thuisarts adviseert: ga elk jaar 1 of 2 keer naar de tandarts voor controle, ook als u een kunstgebit hebt. Elke maand is veel te vaak, en een keer in de vijf jaar is te weinig om gaatjes op tijd te vinden." -> "Thuisarts is de website van de huisartsen. Het advies is: ga elk jaar 1 of 2 keer naar de tandarts voor controle. Elke maand is veel te vaak. Eén keer in de vijf jaar is te weinig om gaatjes op tijd te vinden.". Follows the card.
- **ggz-doorverwijzing:1** `text`: "De ggz is geestelijke gezondheidszorg. Heeft iemand matige tot zware psychische problemen? Dan kan de huisarts hem doorverwijzen naar een zorgaanbieder in de ggz." -> "De ggz (geestelijke gezondheidszorg) helpt bij psychische problemen, zoals angst. Heeft iemand zware psychische problemen? Dan kan de huisarts hem doorverwijzen naar de ggz.". 'Matige tot zware' and 'zorgaanbieder' are above A2; the card now glosses the ggz with a plain example. 26 words.
- **ggz-doorverwijzing:1** `evidence`: "Dan kan de huisarts hem doorverwijzen naar een zorgaanbieder in de ggz" -> "Dan kan de huisarts hem doorverwijzen naar de ggz". Matches the new card text.
- **ggz-doorverwijzing:1** `explanation`: "Bij matige tot zware psychische problemen kan de huisarts doorverwijzen naar een zorgaanbieder in de ggz. Een werkgever of een zorgverzekeraar kan dat niet. De huisarts behandelt lichte klachten zelf." -> "Bij zware psychische problemen kan de huisarts doorverwijzen naar de ggz. Een werkgever of een zorgverzekeraar kan dat niet. De huisarts helpt zelf bij lichte klachten.". Plain words.
- **dossier-online:1** `text`: "U mag uw medisch dossier inzien. Dat kan online in uw persoonlijke gezondheidsomgeving (PGO), een eigen website of app voor uw gezondheidsgegevens. Of bij uw arts of zorginstelling." -> "U mag uw medisch dossier bekijken. Dat kan online in uw persoonlijke gezondheidsomgeving (PGO), een eigen website of app voor uw gezondheidsgegevens. Of bij uw arts of het ziekenhuis.". 'Inzien' and 'zorginstelling' replaced by 'bekijken' and 'het ziekenhuis'. The PGO is explained in the card; the term stays because it is the tested fact. Evidence quote unchanged.
- **toeslagen-servicepunt:1** `text`: "Is het moeilijk om toeslagen met DigiD te regelen? Dan kunt u terecht bij een toeslagenservicepunt. Daar helpen ze bij het aanvragen, wijzigen en terugbetalen van toeslagen." -> "Is het moeilijk om toeslagen met DigiD te regelen? Dan kunt u terecht bij een toeslagenservicepunt. Daar helpen ze met aanvragen, veranderen en terugbetalen van toeslagen.". 'Wijzigen' replaced by 'veranderen'.
- **toeslagen-servicepunt:1** `prompt`: "Iris vindt het moeilijk om toeslagen met DigiD te regelen. Waar kan zij hulp krijgen?" -> "Iris vindt het moeilijk om haar zorgtoeslag met DigiD te regelen. Waar kan zij hulp krijgen?". Ties the question to the health theme and to the page (zorgtoeslag is named there); 'toeslagen' no longer recurs only in the key.
- **schuldhulp-gemeente:1** `prompt`: "Bilal heeft veel schulden. Bij welke organisatie kan hij zich melden voor hulp bij zijn schulden?" -> "Bilal heeft veel schulden. Bij welke organisatie kan hij zich melden voor hulp?". 'Hulp bij zijn schulden' repeated the card; the shorter prompt asks the same thing.

## Resolved doubts

- **nota-zorgverlener, key repeats "fysiotherapeut":** confirmed as a signal, because the other options (gemeente, Belastingdienst) were absurd. Repair: the insurer (the real confusion the card is about) and the huisarts are now the distractors, and the question mirrors the card ("Aan wie stelt zij haar vraag?"). The insurer is false for a bill received directly, per the Rijksoverheid page. The item is now harder than a plain institution question.
- **dossier-online, "persoonlijke gezondheidsomgeving":** A2 learners can answer it. The term is built from plain parts and the options are parallel ("In de online omgeving van ..."). The card is simplified (bekijken, het ziekenhuis) and explains the PGO as "een eigen website of app". The key is guessable from the word "gezondheid"; that is acceptable because the term is the tested fact.
- **tandarts-controle, Thuisarts:** acceptable as a responsible-body source. Thuisarts is the public site of the Nederlands Huisartsen Genootschap and the page was revised on 14 April 2026. No government page with the frequency exists (the rijksoverheid.nl tandarts pages tried returned 404). The item now says "huisartsen adviseren" in the question and names Thuisarts on the card, so the learner is not asked about an unknown website.

## Rejected

None.

## Diversity and set notes

- Theme 1 (4 items): cao, WW premium, discrimination, zzp pension. Theme 4 (9 items): GP bill, provider bill, medicines, dentist, ggz, out-of-hours care, medical file, allowances help, debt help. Question forms are direct (cao, dentist), persona (the rest); no yes/no and no behaviour question.
- huisarts-rekening and nota-zorgverlener both test 4.4.2 (plan: UNCOVERED, needs two). They differ in the fact (who gets the bill versus whom to ask), but a form of this exam should not place them next to each other.
- Name use: Sanne, Thijs, Kofi, Iris and Bilal twice each, Mohammed, Esther and Mariam once. None is a voice name or one of the older cast.
- Easy items: zzp-pensioen, huisarts-rekening, drogist-zonder-recept, schuldhulp-gemeente (key follows from a cue word or is the commonest KNM key). Harder: nota-zorgverlener. The mix is acceptable for a set. Cut first if the bank must shrink: ww-premie-werkgever, ggz-doorverwijzing, dossier-online (plan P2).
- Sensitive: ggz and debt items are calm; the pictures show no distress.

## Media notes

Pictures: unchanged briefs and alts; recurring people keep their traits verbatim (Sanne, Thijs, Kofi, Iris, Bilal). No alt reveals a key. Question audio is needed for all 13 questions and their options; the tandarts options spell the numbers out. Use `--keys` for the new clips only.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Check yearly: zzp-pensioen (AOV, Zelfstandigenwet), ww-premie-werkgever (Whk), spoed-huisartsenpost-eerst (billing change on 1 January 2027, not tested), toeslagen-servicepunt (network of service points).
- tandarts-controle rests on a professional-body source. The insurer distractor in nota-zorgverlener rests on the Rijksoverheid contrast between the two kinds of bill.
- toeslagen-servicepunt: the page body speaks of "hulppunten"; "toeslagenservicepunt" appears in the page link and URL and is used as the name of those points.
- Eindterm mapping follows the plan; 4.4.4 and 4.5.1 are loose fits. Pictures were not inspected.

Proposed file: `content/batches/109-proposed.json`, SHA-256 `50245a23639172a84ad109f5dca68e1be39b0af0ebfbbc7dc27951b69509870f`.
