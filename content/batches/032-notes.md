# Batch 032: design notes (KNM, theme 2 *Omgangsvormen, waarden en normen*, second batch, 12 items)

Batch 032 contains 12 original KNM items in the format DUO has used since 1 July 2025 (`content/blueprint.md` §4.5): one picture, one factual question of at most twenty words read by the narrator, three parallel options, `taskType: feit`, level A2, `theme: 2`. It is the second theme 2 batch after 018 and follows the coordinator's brief: 2.1.1, 2.1.2 and 2.2.1 twice each, plus Bevrijdingsdag, a Christian holiday and Oud en Nieuw, the Suikerfeest, verenigingen and membership, a birth custom, and appointments with instanties. The seven eindtermen were read on 11 September 2026 in the consolidated Regeling inburgering 2021, bijlage 2, on wetten.overheid.nl (`https://wetten.overheid.nl/BWBR0045574/2026-04-18#Bijlage2`, "Geldend van 18-04-2026 t/m heden"); the theme 2 text is unchanged since batch 018 (verbatim copy in the author's scratch directory, `b032/src/thema2.txt`).

Theme 2 in the Regeling, verbatim: 2.1.1 "Is ervan op de hoogte dat omgangsvormen, waarden en normen kunnen verschillen per sociale groep, regio, generatie en sociaaleconomische klasse." (indicator: weet hoe hij zich op de hoogte kan stellen van de alledaagse omgangsvormen binnen de (sociale) contexten waarin hij zich begeeft); 2.1.2 "Weet dat veel mensen in Nederland zich direct kunnen uiten."; 2.1.3 "Is ervan op de hoogte dat het doorgaans belangrijk is om van tevoren afspraken te maken o.a. op het werk en met instanties." (indicators: weet hoe hij een afspraak met collega's, instanties of dienst- of zorgverlener kan maken; waarde hechten aan op tijd komen en tijdig afmelden); 2.1.4 samenlevingsvormen; 2.1.5 "Kent de officiële feest- en gedenkdagen, zoals Pasen, Koningsdag, 4 en 5 mei, Kerst, Oud en Nieuw, en de in sommige kringen relevante feestdagen, zoals bijvoorbeeld Sinterklaas, Carnaval, Suikerfeest en Keti Koti."; 2.2.1 "Is ervan op de hoogte dat in Nederland veel maatschappelijke, culturele- en/of sportieve organisaties en verenigingen actief zijn." (indicator: vrijwilligerswerk en actieve betrokkenheid bij verenigingen en organisaties kunnen helpen om sociale netwerken op te bouwen); 2.2.2 "Is op de hoogte van de belangrijkste gebruiken bij familiegebeurtenissen, zoals verjaardag, geboorte, slagen voor examen, bruiloft en overlijden."

Every fact was verified by fetching the cited page with curl on 11 September 2026 (`sourceReviewedAt`) and locating the supporting sentence in the page text; no search snippet was used as verification. Nothing is copied from official practice items. The rules from the 018 review and the 006–007 level check were applied while writing: no key decodable from the question's words, no prompt word that recurs only in the key (measured by script), in the three yes/no items the key shares its polarity with a distractor, no key that is the longest option by more than two characters, parallel option frames within every item, no date or year that only the key carries, no invented rule as a distractor (every distractor is a wrong body, a wrong day, an old rule, a partial reading or a neighbouring custom named on a cited page), and every question asks what a rule or custom *is* — never what the learner should do. Customs are stated with a hedge ("veel", "vaak", "meestal"); rules without one.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

Conventions:

- `text` is the fact shown after answering (three or four A2 sentences, 27–38 words, average sentence 6.8–11.0 words, longest 16); the `evidence` is a verbatim substring of it and entails the key.
- Every prompt is a persona fact (`skill: rule-application`), 12–19 words; options 3–11 words, parallel in form within an item.
- `domain` follows the setting: `werk` (carnaval, kerstdagen), `opleiding` (direct-betekenis, suikerfeest), `instanties` (gemeente-afspraak, jeugdfonds), `wonen-buurt` (direct-nee), `vrije-tijd-familie` (the other five).
- Cast from `config/illustration.json`, traits copied verbatim (checked by script): Karim (2), Fatima (2, once as Amina's mother), Amina (2), Sem (2, once as Hasan's son), Sabrina (2), Julio, Roos, Modibo, Hasan (1 each); meneer De Vries and mevrouw Bakker are not used; family links follow the config note (Fatima mother of Amina and Sem, Hasan Sem's father). Every brief ends with "no text"; no picture shows the answer (no baby in the muisjes picture, no fireworks, no flags on 5 mei, no map or costumes for carnaval).
- Real institutions are named only where the item is about them (gemeente, Jeugdfonds Sport en Cultuur, Belastingdienst, UWV); no invented organisation names in the batch.
- Volatility is named per item; the time-sensitive facts are the fireworks ban (new law, in force 1 August 2026) and the Jeugdfonds conditions.

`npm run batch:check content/batches/032-original.json`: 12 items, keys A 4 / B 4 / C 4, no failures, no warnings (11 September 2026). SHA-256 of the batch at the time of writing these notes: `8285b65da6b4717918b859607f19096d800d11a2a69478c292beda1601f1c030`.

## 1. Batch matrix

| # | id (slug) | Eindterm | Fact tested | Persona | Domain | Key |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | carnaval | 2.1.1 | customs differ per region: carnaval is a big feast mainly in the south (schools there plan a short holiday); not an official holiday | Julio | werk | A |
| 2 | generatie | 2.1.1 | customs differ not only per region but also per social group, generation and class; not uniform | Fatima | vrije-tijd-familie | B |
| 3 | direct-nee | 2.1.2 | a direct "nee" to an invitation is an ordinary direct answer, not anger or a broken contact | Sabrina | wonen-buurt | C |
| 4 | direct-betekenis | 2.1.2 | "direct zijn" means saying openly what one thinks, not punctuality or saying only nice things | Roos | opleiding | A |
| 5 | gemeente-afspraak | 2.1.3 | at many gemeenten you can only come by appointment (paspoort, rijbewijs); cancel online or by phone | Sabrina | instanties | B |
| 6 | bevrijdingsdag | 2.1.5 | 5 mei celebrates the liberation of 1945; official holiday, not everyone free | Sem | vrije-tijd-familie | C |
| 7 | kerstdagen | 2.1.5 | Kerstmis is an official holiday on 25 and 26 December (two days); days off per cao | Karim | werk | A |
| 8 | vuurwerk | 2.1.5 | since 2026 consumers may not set off vuurpijlen at Oud en Nieuw; only small F1 fireworks such as sterretjes | Modibo | vrije-tijd-familie | A |
| 9 | suikerfeest | 2.1.5 | the Suikerfeest is not an official holiday; schools may give the day off; parents ask leave in advance | Amina (with Fatima) | opleiding | C |
| 10 | contributie | 2.2.1 | clubs are verenigingen with members; contributie is the money members pay | Karim | vrije-tijd-familie | B |
| 11 | jeugdfonds | 2.2.1 | with a low income the gemeente or the Jeugdfonds Sport en Cultuur helps pay a child's club fee | Hasan (with Sem) | instanties | C |
| 12 | muisjes | 2.2.2 | beschuit met muisjes is served to visitors after a birth | Amina | vrije-tijd-familie | B |

Question forms: 7 persona facts with a what/where/who question (1, 3, 5, 6, 7, 11, 12), 2 definitional persona questions ("Wat betekent dat?" 4, "Wat is dat?" 10), 3 yes/no with qualification (2: ja / nee / nee, key nee; 8: nee / nee / ja, key nee; 9: ja / nee / nee, key nee). No behaviour questions.

## 2. Key balance

| Key | Count | Items |
| --- | --- | --- |
| A | 4 | 1, 4, 7, 8 |
| B | 4 | 2, 5, 10, 12 |
| C | 4 | 3, 6, 9, 11 |

Sequence A B C A B C A A C B C B: no letter three times in a row. Option lengths (words) per item: 7-7-6, 8-7-6, 6-7-7, 6-6-5, 6-6-5, 7-10-7, 4-3-4, 7-8-11, 7-9-7, 6-7-6, 5-5-5, 5-5-5. Option lengths (characters) with the key marked: 34*/35/30, 49/44*/38, 29/44/37*, 31*/33/33, 35/35*/30, 30/50/39*, 18*/19/18, 48*/50/53, 45/42/43*, 39/41*/36, 30/28/30*, 27/25*/27 — in no item is the key the longest option by more than two characters; in nine items it is not the longest at all, in two (gemeente-afspraak, jeugdfonds) it ties, and in contributie it is longer by two characters. A script checked that no content word of a prompt recurs only in the key (the first draft failed twice: "mag" in the vuurwerk key, and the direct-nee key was the only option without "Sabrina"; both repaired).

## 3. Eindterm coverage

| Eindterm | Items here | With batch 018 | Not covered |
| --- | --- | --- | --- |
| 2.1.1 | carnaval (regio), generatie (groep, generatie, klasse) | 3 | the indicator "weet hoe hij zich op de hoogte kan stellen …" (a skill, not a fact; the 018 notes said the same) |
| 2.1.2 | direct-nee, direct-betekenis | 3 | — |
| 2.1.3 | gemeente-afspraak (van tevoren afspraken maken met instanties; afzeggen) | 3 | "hoe hij een afspraak kan maken" as a procedure |
| 2.1.4 | — | 3 | geregistreerd partnerschap as a form of its own |
| 2.1.5 | bevrijdingsdag, kerstdagen, vuurwerk (Oud en Nieuw), suikerfeest | 6 | Pasen (only as a school-closure fact), Sinterklaas (no primary source, see doubt 10), Keti Koti (018 reserve) |
| 2.2.1 | contributie, jeugdfonds | 3 | "leden beslissen op de ledenvergadering" (in the contributie card, not tested) |
| 2.2.2 | muisjes (geboorte) | 3 | bruiloft (no source for a custom), overlijden (verified reserve, §6) |

Every theme 2 eindterm now has three or more items across 018 and 032.

## 4. Items: source, supporting sentence, distractor rationales

Format per item: eindterm; source (URL, page title, fetched 2026-09-11); the sentence(s) on the page that support the key; volatility; distractors; language figures (prompt words; fact words / sentences (longest)).

### 1 carnaval — 2.1.1 ("regio"; carnaval named in 2.1.5)

- Source: https://www.rijksoverheid.nl/themas/onderwijs/schoolvakanties/vrij-van-school-op-feestdagen — "Op welke feestdagen is mijn kind vrij van school? | Rijksoverheid.nl", section "Vrij met carnaval": "Uw kind krijgt geen vrijstelling van de leerplicht voor carnaval. In de praktijk plannen veel scholen in het zuiden van Nederland een korte vakantie tijdens carnaval."
- Also: https://www.gemeentemaastricht.nl/stad/evenementen/carnaval-2026-maastricht — "Carnaval 2026 in Maastricht | Gemeente Maastricht": "Geen feest in Maastricht is zo bruisend en uitgebreid als carnaval – of de Mestreechter Vastelaovend, zoals wij het noemen. Het is het grootste volksfeest van de stad, waarbij de vastelaovendsvierders 3, soms zelfs 5 dagen lang genieten." and "Dit jaar vieren we carnaval op 15, 16 en 17 februari." Carnaval is absent from the Rijksoverheid list of officiële feestdagen (item 7's source).
- Volatility: none for the custom; the Maastricht page is renewed yearly. "vooral in het zuiden" is the item's reading of the Rijksoverheid sentence (doubt 2).
- B "Vooral in het noorden van het land." — the mirror of the key; anchored in the same regional axis.
- C "Overal in het land even groot." — the uniformity belief that eindterm 2.1.1 was written against (the same confusion as 018 item 1's distractor B).
- The prompt gives no region and no "zuiden"; "groot" recurs in the prompt and in distractor C, not only in the key.
- Language: prompt 19; fact 34 / 4 (15).

### 2 generatie — 2.1.1

- Source: https://wetten.overheid.nl/BWBR0045574/2026-04-18#Bijlage2 — "Regeling inburgering 2021", bijlage 2, eindterm 2.1.1: "Is ervan op de hoogte dat omgangsvormen, waarden en normen kunnen verschillen per sociale groep, regio, generatie en sociaaleconomische klasse."
- Volatility: none (the eindterm itself). "sociale klasse" is the A2 rendering of "sociaaleconomische klasse".
- A "Ja, zij zijn in heel Nederland precies hetzelfde." — the uniformity belief.
- C "Nee, zij verschillen alleen per regio." — the partial reading (regional differences only), false by the eindterm's four axes; this is what makes the item differ from 018's omgangsvormen item, which tested uniformity and "in de wet".
- Yes/no with qualification: ja / nee / nee, the key shares its polarity with C.
- Language: prompt 14; fact 29 / 3 (13).

### 3 direct-nee — 2.1.2

- Source: same Regeling, eindterm 2.1.2: "Weet dat veel mensen in Nederland zich direct kunnen uiten."
- Volatility: none. The clauses "meestal geen teken van boosheid" and "niet dat het contact voorbij is" are the item's hedged gloss on what a direct refusal does not mean, as batch 018's directheid did with "meestal geen teken van boosheid" (accepted by the 018 reviewer with the hedge); see doubt 9.
- A "De buurvrouw is boos op haar." — directness read as anger.
- B "De buurvrouw wil helemaal geen contact meer." — directness read as a rejection of the relationship.
- The prompt quotes the refusal but contains neither "direct" nor "boos" nor "contact"; the first draft's distractors named Sabrina and the key did not, which was repaired.
- Language: prompt 19; fact 34 / 4 (9).

### 4 direct-betekenis — 2.1.2

- Source: same eindterm 2.1.2. The item tests the meaning of "zich direct uiten" (saying openly what one thinks and wants) against two other readings of the word "direct".
- Volatility: none.
- B "Zij komen altijd precies op tijd." — "direct" read as promptness; punctuality is eindterm 2.1.3's own fact, so the distractor is a neighbouring custom, not an invention.
- C "Zij zeggen alleen aardige dingen." — the opposite of directness (politeness first), the expectation many newcomers bring.
- Definitional form ("Wat betekent dat?"), as the blueprint's "Erik woont in een sociale huurwoning. Wat is dat?"; the prompt's "direct" appears in no option, so nothing can be matched.
- Language: prompt 16; fact 36 / 4 (12).

### 5 gemeente-afspraak — 2.1.3 ("van tevoren afspraken maken … met instanties"; "tijdig afmelden")

- Source: https://www.amersfoort.nl/afspraak-maken-met-burgerzaken — "Afspraak maken met Burgerzaken | Gemeente Amersfoort": "De afdeling Burgerzaken werkt alleen op afspraak.", "Voor veel producten en diensten is een afspraak nodig bij de afdeling Burgerzaken, aan de balie in het stadhuis.", "Let op! Maak voor het aanvragen of vernieuwen van een paspoort, ID-kaart of rijbewijs 2 aparte afspraken: 1 voor de aanvraag en 1 voor het afhalen." and "Wil je een geplande afspraak afzeggen of wijzigen? Gebruik dan de link uit je bevestigingsmail of bel met 14 033."
- Also: https://www.gouda.nl/direct-regelen/leven-en-wonen/reizen-en-papieren/paspoort/ — "Paspoort - Gemeente Gouda": "U kunt alleen op afspraak een paspoort aanvragen en ophalen in het Huis van de Stad." and "Ik wil mijn afspraak afzeggen of verplaatsen. … Lukt dit online niet? Bel ons dan op telefoonnummer 14 0182."; https://www.utrecht.nl/contact/afspraak-maken — "Afspraak maken | gemeente Utrecht": "U kunt voor deze onderwerpen alleen met een afspraak langskomen." and "Afspraak veranderen of afzeggen: Dat kan via de link in de bevestiging die u per e-mail krijgt."; https://www.almere.nl/contact/afspraak-maken — "Afspraak maken | Almere": "De gemeente Almere werkt vooral op afspraak." The general statement is eindterm 2.1.3 itself ("doorgaans belangrijk … van tevoren afspraken te maken … met instanties").
- Volatility: low; gemeente pages change, the practice does not. "bij veel gemeenten" is the hedge (four gemeenten checked, one of them "vooral").
- C "Zij regelt alles per telefoon." — the phone is for making or cancelling the appointment (Gouda, Amersfoort), not for the document itself, which is applied for and collected at the balie.
- A "Zij gaat langs zonder een afspraak." — the walk-in expectation, false by "alleen op afspraak".
- The scenario is a rijbewijs renewal rather than a passport because the concurrent batch 033 (paspoort-aanvragen, 6.2.2) already has meneer De Vries applying for a passport at the gemeente; the Amersfoort page names paspoort, ID-kaart and rijbewijs together (doubt 7).
- Language: prompt 14; fact 38 / 4 (12).

### 6 bevrijdingsdag — 2.1.5 ("4 en 5 mei")

- Source: https://www.rijksoverheid.nl/themas/overheid-en-democratie/tweede-wereldoorlog/bevrijdingsdag-5-mei — "Bevrijdingsdag 5 mei | Rijksoverheid.nl": "Bevrijdingsdag is de nationale feestdag waarop we de bevrijding van Nederland in 1945 vieren." and "Bevrijdingsdag valt altijd op 5 mei, ook als 5 mei een zondag of religieuze dag is."
- Also: https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/bevrijdingsdag-5-mei-vrije-dag — "Is Bevrijdingsdag (5 mei) een vrije dag? | Rijksoverheid.nl": "Bevrijdingsdag (5 mei) is een officiële feestdag in Nederland, maar niet iedereen is dan vrij." and "Scholen zijn bijna altijd dicht op Bevrijdingsdag." (supports the prompt's "vrij van school").
- Volatility: none.
- B "De dag dat de doden van de oorlog worden herdacht." — the 4/5 mei confusion, the point of the eindterm (the reverse of 018's dodenherdenking item); anchored in the Nationale Herdenking page cited there.
- A "De dag dat de Koning jarig is." — the other spring feestdag (27 april), anchored in the Koningsdag pages cited in 018.
- The prompt says "5 mei" and never "Bevrijdingsdag", so the key's "bevrijding" cannot be matched; the year was removed from the key so that it is not the most specific option.
- Language: prompt 14; fact 30 / 3 (13).

### 7 kerstdagen — 2.1.5 ("Kerst")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/officiele-feestdagen — "Wanneer zijn de officiële feestdagen in Nederland? | Rijksoverheid.nl": "Kerstmis: vrijdag 25 december en zaterdag 26 december 2026" and "Kerstmis: zaterdag 25 december en zondag 26 december 2027"; "Er is geen wet die heeft vastgelegd dat bepaalde feestdagen vrije dagen zijn voor werknemers. Er is dus geen wettelijk recht op een vrije dag op een feestdag. In uw cao of arbeidsovereenkomst staat of u vrij bent op feestdagen."
- Also: the school page of item 1: "Op de volgende nationale feestdagen zijn alle scholen in principe gesloten: … Eerste en Tweede Kerstdag."
- Volatility: none.
- B "Alleen 25 december." — the one-day Christmas of many countries; the second day is the Dutch particular.
- C "24 en 25 december." — kerstavond counted as a holiday, as in some countries.
- All three options are dates, so the key is not the odd one out (doubt 5); the prompt asks "Welke dag of dagen" so that the plural does not give the two-day answer away.
- Language: prompt 19; fact 33 / 3 (16).

### 8 vuurwerk — 2.1.5 ("Oud en Nieuw")

- Source: https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk/regels-vuurwerk — "Regels vuurwerk afsteken" (Rijksoverheid): "Voor consumenten geldt een vuurwerkverbod. Alleen klein vuurwerk, zoals sterretjes, is nog toegestaan.", "Iedereen mag het hele jaar door klein vuurwerk afsteken. Dit is vuurwerk in de categorie F1.", "Vuurwerk zoals vuurpijlen, cakes, compoundboxen en knalvuurwerk mag alleen nog door professionals worden afgestoken." and "Consumenten mogen deze producten niet meer kopen en bezitten. En zij mogen deze producten ook niet meer afsteken."
- Also: https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk — theme page "Vuurwerk", news item of 1 July 2026: "Het landelijk vuurwerkverbod voor consumenten gaat in op 1 augustus 2026." and of 17 August 2026: "De nieuwe Wet veilige jaarwisseling is per 1 augustus van kracht."; https://www.rijksoverheid.nl/vraag-en-antwoord/vuurwerk/welk-vuurwerk-afsteken — "Welk vuurwerk mag ik nog afsteken?": "U mag als consument alleen vuurwerk van de categorie F1 afsteken, zoals knalerwten, sierfonteintjes en sterretjes."; https://zoek.officielebekendmakingen.nl/stb-2026-168.html — Staatsblad 2026, 168 (Besluit veilige jaarwisseling, 25 June 2026), toelichting 5.1: "Vóór de inwerkingtreding van de Wet veilige jaarwisseling mochten consumenten van 31 december 18.00 uur tot 1 januari 02.00 uur vuurwerk afsteken dat is aangewezen als consumentenvuurwerk in de Rac." (the old rule behind distractor C and the explanation).
- Volatility: high in the sense of being new (in force since 1 August 2026; the first jaarwisseling under the ban is 2026/2027); the rule itself is stable law. Re-check before every jaarwisseling. See doubt 3.
- B "Nee, ook klein vuurwerk zoals sterretjes mag niet." — the over-correction (a total ban); F1 fireworks remain allowed all year.
- C "Ja, maar het mag alleen op 31 december vanaf zes uur." — the rule that applied until 2026, which many people and older course books still carry.
- Yes/no with qualification: nee / nee / ja, the key shares its polarity with B; all three options contain "mag" so the prompt's "Mag dat" marks none of them; the key is the shortest option.
- Language: prompt 12; fact 36 / 4 (12).

### 9 suikerfeest — 2.1.5 ("in sommige kringen relevante feestdagen, zoals … Suikerfeest")

- Source: https://www.rijksoverheid.nl/themas/onderwijs/schoolvakanties/vrij-van-school-op-feestdagen — the school page of item 1, section "Religieuze feestdagen": "Scholen mogen leerlingen vrij geven op andere (religieuze) feestdagen dan de officiële feestdagen. Dit geldt dan voor álle leerlingen van de school. Dus niet alleen voor de groep leerlingen die op de vrije dag een religieuze plicht vervult of een religieus feest viert. Voorbeelden zijn scholen die niet lesgeven op Goede vrijdag, op Bid- en Dankdag voor Gewas en Arbeid, of tijdens het Suikerfeest."
- Also: https://www.rijksoverheid.nl/vraag-en-antwoord/leerplicht/leerplicht-kind-niet-naar-school — "Wanneer hoeft mijn kind niet naar school? | Rijksoverheid.nl": "Vertel de schooldirecteur dat u vrij wilt vragen voor uw kind." and "Wilt u dat uw kind vrij is voor een feestdag? Bijvoorbeeld voor het Suikerfeest of het Joods Paasfeest? Vertel dit vooraf aan de school." The Suikerfeest is absent from the officiële feestdagen list (item 7). Rijksoverheid calls the ramadan "de vastenmaand ramadan" (https://www.rijksoverheid.nl/vraag-en-antwoord/schooladvies-en-doorstroomtoets-basisschool/doorstroomtoets-ramadan) but no government page defines the Suikerfeest as its end; see doubt 4.
- Volatility: none.
- A "Ja, alle scholen zijn dan verplicht gesloten." — the belief that a widely celebrated feast is official; false by the list and by "mogen".
- B "Nee, en vrij vragen voor die dag kan niet." — the opposite over-correction; false by the leerplicht page.
- Yes/no with qualification: ja / nee / nee, the key shares its polarity with B; the picture shows Amina with her mother Fatima (cast link), nothing that chooses between the options.
- Language: prompt 12; fact 30 / 3 (14).

### 10 contributie — 2.2.1

- Source: https://ondernemersplein.overheid.nl/bedrijfsvoering/rechtsvormen-en-organisatie/de-vereniging/ — "De vereniging | Ondernemersplein" (overheid.nl, run by KVK for the ministries): "Een vereniging is een organisatie met leden die samen een doel willen bereiken. Meestal organiseert een vereniging maatschappelijke activiteiten. Zoals een sport- of buurtvereniging.", "Een vereniging bestaat uit minimaal 2 leden. De hoogste macht ligt bij de ledenvergadering.", "De leden hebben allemaal één stem op de ledenvergadering. De ledenvergadering benoemt het bestuur, dat meestal ook uit leden bestaat." and "Het geld van een vereniging komt binnen via de contributies die leden betalen."
- Also: https://www.kvk.nl/starten/de-vereniging/ — "De vereniging: rechtsvorm met leden | KVK": "Je kunt een vereniging oprichten als je een doel wilt bereiken, zoals samen sporten, muziek maken of de natuur beschermen." and "De leden nemen beslissingen tijdens de algemene ledenvergadering."
- Volatility: none (Burgerlijk Wetboek Boek 2, titel 2). "Veel sportclubs en hobbyclubs … zijn verenigingen" is hedged with "veel"; the pages give sports, music and neighbourhood clubs as the typical verenigingen.
- A "De vergadering waar alle leden stemmen." — the ledenvergadering, the page's other element; a definition confusion.
- C "Het bestuur dat de vereniging leidt." — the bestuur, likewise from the page.
- Definitional form ("Wat is dat?"); the prompt's "voetbalvereniging" is echoed by "vereniging" in the key and in C, so nothing marks the key. The explanation ends with the network indicator of 2.2.1.
- Language: prompt 13; fact 27 / 4 (8).

### 11 jeugdfonds — 2.2.1 (membership with a low income)

- Source: https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/sport-en-bewegen/sporten-en-bewegen-voor-kinderen — "Sporten en bewegen voor kinderen | Rijksoverheid.nl", section "Financiële ondersteuning via Jeugdfonds Sport en Cultuur": "Iedereen moet kunnen kiezen voor een actieve en gezonde leefstijl. Ook kinderen die opgroeien in een gezin met een laag inkomen. Om hiervoor te zorgen, ondersteunt de overheid het Jeugdfonds voor Sport en Cultuur. Dit fonds betaalt het lesgeld voor kinderen van wie de ouders het lidmaatschap niet kunnen betalen."
- Also: https://www.rijksoverheid.nl/vraag-en-antwoord/armoedebestrijding/kan-ik-ondersteuning-voor-mijn-kinderen-krijgen — "Kan ik ondersteuning krijgen voor mijn kind(eren)? | Rijksoverheid.nl": "U kunt hulp vragen aan uw gemeente. Elke gemeente ondersteunt huishoudens met een laag inkomen. Bijvoorbeeld met een kindpakket.", "De meeste gemeenten hebben ook zogenoemde participatieregelingen voor volwassenen. Denk aan meedoen aan een cursus. Of lid worden bij een sportclub. Hiervoor kunt u als ouder mogelijk een tegemoetkoming krijgen." and "Veel gemeenten werken samen met lokale maatschappelijke organisaties. Deze bieden financiële ondersteuning, zodat uw kinderen mee kunnen doen. Bijvoorbeeld bij onderwijs, sport, cultuur, verjaardagen en uitjes."
- Volatility: medium; the fund's conditions and age limit change (the page notes a lowering from 4 to 2 years), the gemeente arrangements differ per gemeente and are not tested. Re-check yearly.
- A "De Belastingdienst of het UWV." — the toeslag/uitkering bodies a newcomer associates with money for a low income.
- B "De school of de sportleraar." — the school-based sport of many other countries; Dutch clubs are separate from schools.
- All options name one or two bodies in the same frame; the key is 30 characters against 30 and 28.
- Language: prompt 17; fact 29 / 4 (9).

### 12 muisjes — 2.2.2 ("geboorte")

- Source: https://www.immaterieelerfgoed.nl/nl/page/5447/de-cultuur-van-beschuit-met-muisjes — "De cultuur van beschuit met muisjes - Immaterieel Erfgoed" (Kenniscentrum Immaterieel Erfgoed Nederland, network entry, "Bijgeschreven in netwerk vanaf: augustus 2019"): "Na de geboorte komt er veel bezoek en om te vieren dat er een baby is geboren, trakteert men beschuit met muisjes.", "Beoefenaars en betrokkenen zijn ouders van pasgeboren kinderen met familie en vrienden, zoals grootouders, broers en zussen, buren, kennissen, naasten en overige kraambezoekers." and "Tegenwoordig zijn de muisjes roze/wit bij de geboorte van een meisje en blauw/wit bij een jongen, na de introductie van de blauw met witte muisjes in 1994."
- Volatility: none for the custom. The source is the weakest in the batch (a practitioners' entry on the public knowledge centre's site; its own sources are a packaging text and Wikipedia); no rijksoverheid.nl or gemeente page states the custom (two gemeente geboorteaangifte pages and a site search checked on 11 September 2026). The card is hedged ("vaak bezoek", "veel families"); see doubt 6.
- A "De verjaardag van een kind." — the birthday custom (trakteren, batch 018 item 12).
- C "Het slagen voor een examen." — the exam custom (vlag, batch 018 item 11), where muisjes was itself the distractor.
- Options 5-5-5 words, same frame; the picture shows the rusk named in the prompt and no baby, cradle or card.
- Language: prompt 14; fact 32 / 4 (10).

## 5. Diversity matrix against the catalogue

The catalogue holds 80 KNM items (batches 003 study cards, 006, 007, 018, 019). Batch 033, written concurrently and not yet in the catalogue, holds 12 KNM items for themes 1, 4, 6, 7 and 8; the only touching point is its paspoort-aanvragen item (see the table and doubt 7). Batches 034–038 hold no KNM items. No title, slug or tested fact is repeated. Nearest neighbours and how this batch keeps its distance:

| This batch | Nearest catalogue item | Difference |
| --- | --- | --- |
| carnaval | batch018-omgangsvormen; batch018-koningsdag, dodenherdenking | a regional custom (which part of the country), not the general statement and not a national day |
| generatie | batch018-omgangsvormen | same eindterm sentence; tests the partial reading "alleen per regio" instead of "in de wet" (doubt 1) |
| direct-nee, direct-betekenis | batch018-directheid | a refusal between neighbours and the meaning of the word, not a colleague's feedback at work |
| gemeente-afspraak | batch018-op-tijd, wegblijftarief; batch007-reisdocument; batch033-paspoort-aanvragen (not yet in the catalogue) | appointment-only at the gemeente and cancelling, not punctuality, the hospital fee, which document to carry or where a passport is applied for |
| bevrijdingsdag | batch018-dodenherdenking | 5 mei as the key with 4 mei as the distractor, the reverse of 018 |
| kerstdagen | batch006-cao | the dates of the holiday; the cao rule is in the card, not tested |
| vuurwerk | — | new subject (no catalogue item on Oud en Nieuw or fireworks) |
| suikerfeest | batch007-godsdienstvrijheid; batch003-leerplicht, batch019-kwalificatieplicht | official status of a religious feast and school leave, not freedom of religion or the duty to attend |
| contributie | batch018-vrijwilligerswerk; batch006-kvk | the members' fee of a club, not unpaid work or registering a business |
| jeugdfonds | batch006-bijstandsplicht; batch007-kinderbijslag, kinderopvangtoeslag | who helps pay a club fee, not benefits duties or child allowances |
| muisjes | batch018-geslaagd, trakteren | the birth custom as the key (it was a distractor in geslaagd) |

Settings: an office coffee machine, a market square, two front gardens, a college classroom, a desk at home, a canal cycle path, a warehouse, a balcony at night, a walk to school, a football pitch, a kitchen table with a football, a neighbour's kitchen table. Domains: werk 2, opleiding 2, instanties 2, wonen-buurt 1, vrije-tijd-familie 5 — the theme is about family and free time; work, education and instanties are used where the eindterm allows (2.1.2, 2.1.3, 2.1.5, 2.2.1). Neighbourhood appears once (the direct refusal needs a social setting outside work); no volunteering scenario.

Coordinator topic list, mapped: Bevrijdingsdag — item 6; a Christian holiday — item 7 (Kerst; Pasen appears only in the school-closure sentence of the sources); Oud en Nieuw — item 8 (the new fireworks rule; Nieuwjaarsdag as an official holiday is in the explanation); Suikerfeest — item 9; Sinterklaas — not written, no primary source states the custom (doubt 10); verenigingen and membership — items 10 and 11; births — item 12; weddings — not written, no primary source for a custom (the legal facts are in 018); funerals — verified reserve (§6); keeping appointments and cancelling by phone — item 5; splitting the bill, small talk about the weather, u/je — not written, no primary source found (doubt 10).

## 6. Verified reserves (not in the batch)

Facts verified on 11 September 2026 that can replace an item if the reviewer rejects one.

- 2.2.2 Overlijden: https://www.rijksoverheid.nl/vraag-en-antwoord/overlijden/welke-regels-gelden-er-bij-begraven-en-cremeren — "Wanneer mag ik een overledene laten begraven of cremeren? | Rijksoverheid.nl": "U mag een overledene niet eerder dan 36 uur na overlijden laten begraven of cremeren. En niet later dan 6 werkdagen na overlijden. Het weekend en feestdagen zijn geen werkdagen." and "Bij begraven of cremeren na 6 werkdagen heeft u toestemming nodig van de burgemeester van de gemeente waar het stoffelijk overschot zich bevindt. U kunt bijvoorbeeld toestemming aanvragen om godsdienstige redenen. Of als familie uit een ver land bij de begrafenis of crematie wil zijn." Draft item (mevrouw Bakker, vrije-tijd-familie): "De buurman van mevrouw Bakker is overleden. Wanneer is in Nederland de begrafenis of crematie?" — A* "Uiterlijk zes werkdagen na het overlijden." B "Pas een maand na het overlijden." (the ash-retention period on the same page) C "Op de dag van het overlijden zelf." (excluded by the 36-hour minimum); card: "Na een overlijden is de begrafenis of crematie in Nederland snel: niet eerder dan 36 uur en uiterlijk zes werkdagen na het overlijden. Later mag alleen met toestemming van de burgemeester, bijvoorbeeld als familie uit een ver land komt." A rule rather than a custom; it fits 2.2.2's "gebruiken bij … overlijden" only as the frame within which the uitvaart takes place.
- 2.1.5 Keti Koti: the Rijksoverheid FAQ on the Herdenkingsjaar Slavernijverleden was verified for batch 018 (its notes §6 and the review's edit 5) and not re-fetched today.
- 2.1.5 Nieuwjaarsdag and days off: the officiële feestdagen page (item 7) lists "Nieuwjaarsdag: donderdag 1 januari 2026" and states that no law makes a feestdag a day off; usable as a plainer Oud en Nieuw item if the fireworks rule is judged out of scope (doubt 3).
- 2.2.1 Ledenvergadering: the Ondernemersplein page (item 10): "De hoogste macht ligt bij de ledenvergadering." and "De leden hebben allemaal één stem op de ledenvergadering." Draft: "Karim is lid van een voetbalvereniging. Wie neemt daar de belangrijkste beslissingen?" — A "Het bestuur, zonder de leden." B* "De leden, samen op de ledenvergadering." C "De trainer van het eerste team."

Not usable: the gemeente Land van Cuijk page for the 2026 landelijke intocht (https://www.gemeentelandvancuijk.nl/veelgestelde-vragen-over-intocht-sinterklaas-in-grave) states only "Op zaterdag 14 november komen de Sint en zijn pieten aan in de historische binnenstad van Grave" — the intocht date, not the 5 december custom; the Meertens Instituut item of 22 November 2023 on surprises is a report of a newspaper column; the Kamerbrief on the Suikerfeest at an Amsterdam school (2018) returns 404; no Taalunie, Rijksoverheid or SCP page states a u/je rule; no public page states a bill-splitting or weather-talk custom.

## 7. Open doubts for the reviewer

1. **generatie (item 2) is the nearest thing to a duplicate of 018's omgangsvormen.** The eindterm is one sentence and the coordinator asked for two 2.1.1 items; the second one tests the partial reading ("alleen per regio") rather than uniformity or "in de wet", and uses the yes/no form 018 did not. If the reviewer judges it a repeat, the overlijden reserve (§6) can take its slot and 2.1.1 keeps carnaval plus 018's item.
2. **carnaval (item 1): "vooral in het zuiden".** The Rijksoverheid sentence says that many schools *in the south* plan a holiday for carnaval; the gemeente Maastricht page calls it the city's largest volksfeest. "vooral" is the item's reading of those two statements. Cut "vooral" from the card, the key and the evidence if the inference is too far; the item is tagged 2.1.1 (regio) although carnaval is named in 2.1.5.
3. **vuurwerk (item 8): a rule about Oud en Nieuw under 2.1.5.** Eindterm 2.1.5 asks the learner to *know* the holidays; the item tests the new consumer fireworks ban (in force 1 August 2026; the first jaarwisseling under it is 2026/2027), which is the fact a newcomer most needs about Oud en Nieuw and is squarely on rijksoverheid.nl. If the reviewer wants the eindterm's own grain instead, the Nieuwjaarsdag reserve (§6) replaces it with the same picture.
4. **suikerfeest (item 9): the definition "aan het einde van de ramadan".** Not on a government page (Rijksoverheid only calls the ramadan "de vastenmaand"); the tested facts (not official, schools may give the day off, parents ask in advance) are. Cut the apposition if an unanchored definition is not allowed; the evidence does not depend on it.
5. **kerstdagen (item 7): dates in all three options.** The 018 review removed a date that only the key carried; here every option is a date and the key is not the most specific one. Confirm that this reads as parallel.
6. **muisjes (item 12): the source.** The Kenniscentrum Immaterieel Erfgoed entry is the only public-body statement of the custom found; the 018 reviewer called it weaker than a government page and accepted it for a distractor. The card is hedged and the colour sentence comes from the same page. If a stronger source is required, the overlijden reserve replaces it.
7. **gemeente-afspraak (item 5): "bij veel gemeenten" and the overlap with batch 033.** "bij veel gemeenten" rests on four gemeente pages (Utrecht, Amersfoort, Gouda "alleen op afspraak", Almere "vooral op afspraak") plus the eindterm's "doorgaans"; confirm that four pages carry the hedge. The first draft had meneer De Vries applying for a passport; batch 033 (written concurrently, not yet reviewed) uses that exact scenario for 6.2.2 ("Waar vraagt hij een nieuw paspoort aan?"), so the item was moved to Sabrina renewing her rijbewijs. The tested fact (appointment-only, cancelling) differs from 033's (which body) either way.
8. **jeugdfonds (item 11): scope and wording.** The item names a real foundation (the item is about it), uses "contributie" for the page's "lesgeld"/"lidmaatschap", and leans towards instanties; it answers the coordinator's "membership" request. The ledenvergadering reserve (§6) is the purer 2.2.1 alternative.
9. **direct-nee (item 3): the glosses.** "meestal geen teken van boosheid" and "niet dat het contact voorbij is" go beyond the eindterm's words, as 018's directheid did; both are hedged and each refutes one distractor. Cut the last sentence and distractor B's rationale if that is too much.
10. **Coordinator topics not written.** Sinterklaas (no primary source states the 5 december custom; the gemeente page gives only this year's intocht date), u/je, splitting the bill, small talk about the weather and wedding customs have no primary public source; none was written rather than inventing a rule.
11. **Pictures.** muisjes shows the rusk the prompt names and no baby; suikerfeest shows Amina with Fatima (the cast's mother–daughter link) walking to school; vuurwerk shows a night balcony with no fireworks; bevrijdingsdag a spring cycle ride with no flags; carnaval an office with no costumes or map; gemeente-afspraak a wallet and a plastic card next to a laptop (the answer is the appointment, not the document).

## 8. Checker output

```
> batch:check
> tsx scripts/batch-check.ts content/batches/032-original.json

Checked 12 items, 12 questions. Keys: {"A":4,"B":4,"C":4}. Options: {"3":12}.
No failures, no warnings.
```
