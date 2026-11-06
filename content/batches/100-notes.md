# Batch 100 author notes

This batch replaces four published A2 KNM facts. The project owner authorised the rewrite on 6 November 2026, and the spec is `tmp/knm-fix-2026-11-06/spec/100.md`. Learner data from production (first attempts only, 10 September – 6 November 2026) showed that these four questions misled learners because of how they were built, not because of what learners knew. On first attempts KNM averages 74% correct. "Who/what/when" questions average 78%, Ja/Nee/Alleen-shaped questions 65%, and questions with "nooit" or "altijd" in a distractor 60%.

The batch starts from `tmp/knm-fix-2026-11-06/base/100-base.json`, which holds the published records without generated media and with `status: "draft"`. Every item keeps these fields byte-identical: ID, level, part, exam, `taskType: feit`, domain, theme, eindterm, title, skill, the image `brief` and the image `alt`. Set membership is not part of the record and is unchanged. `status` stays `draft` and `targetLevelValidated` stays `false`. No `revision`, `questionAudio` or `images[].file` was added. No media was made, and no file outside `content/batches/100-*` was touched; my scratch downloads are in `tmp/knm-fix-2026-11-06/pages/`. All four items are ordinary in tone, with no humour. This is author work. It is not CEFR validation and not exam equivalence.

Replaced IDs, in batch order:

1. `A2:knm:batch033-schoolvakantie:1`: 2 of 13 first attempts were correct, and 10 chose B, "Nee, een leerplichtig kind krijgt nooit vrij buiten de schoolvakanties." The prompt gave no reason for the October trip, yet the key was the work exception. Learners who knew the main rule were marked wrong, which breaks rule 1.
2. `A2:knm:batch033-passief-kiesrecht:1`: 4 of 14 were correct, and 8 chose B, "Het recht om niet te hoeven stemmen." B is the literal reading of "passief", and it is also true in the Netherlands, where voting is not compulsory. This breaks rule 2.
3. `A2:knm:batch032-vuurwerk:1`: 3 of 7 were correct, and A and C were each chosen 3 times. The prompt asked whether Modibo may launch rockets. Both "Nee" options answered that correctly and differed only on sterretjes, which the prompt did not ask about. This breaks rule 3.
4. `A2:knm:batch033-basisbeurs:1`: 5 of 13 were correct, 5 chose C ("Nee, … nooit …") and 3 chose A ("Ja, altijd, …"). The key was a condition while both distractors were absolutes. The belief that a beurs is a gift is also true for mbo 1 and 2. This breaks rules 1 and 2.

## Changes per item

Fields that are not listed are byte-identical to the base. The `sourceNote` texts are summarised here; the full texts are in the JSON.

### 1. A2:knm:batch033-schoolvakantie:1 (key C → B)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` | Vakantie buiten de schoolvakanties mag niet; ouders riskeren een boete. Uitzondering: als ouders door hun werk in geen enkele schoolvakantie weg kunnen. De directeur kan maximaal tien dagen vrij geven. | Vakantie buiten de schoolvakanties mag niet. Kunnen ouders door hun werk in geen enkele schoolvakantie weg? Dan kan de directeur maximaal tien dagen vrij geven, één keer per schooljaar. | The card now ties the ten days to the work condition in one condition–consequence pair, so the evidence entails the key. "één keer per schooljaar" is from the source. The fine moved to the explanation to stay within 30 words (29). |
| `questions[0].prompt` | Fatima wil in oktober met haar dochter Amina op vakantie, buiten de schoolvakanties. Mag Amina dan vrij van school? | Door haar werk kan Fatima in geen schoolvakantie weg. Hoe lang mag haar dochter Amina buiten de schoolvakanties op vakantie? | The prompt states the work condition (rule 1) and asks how long, so the three options differ only in that (rule 3). It has 20 words. |
| `questions[0].options` | A Ja, Fatima bepaalt zelf wanneer Amina vrij is. / B Nee, een leerplichtig kind krijgt nooit vrij buiten de schoolvakanties. / C Alleen als Fatima door haar werk in geen enkele schoolvakantie weg kan. | A Geen enkele dag. / B Maximaal tien dagen. / C Zo lang als Fatima zelf wil. | Three durations: none, the legal cap, and unlimited. There is no "nooit" or "altijd", no Ja/Nee/Alleen shape, and the key is not the longest option (16/20/28 characters). |
| `questions[0].answer` | C | B | Follows the new options. It also fits the key balance. |
| `questions[0].evidence` | als ouders door hun werk in geen enkele schoolvakantie weg kunnen | Kunnen ouders door hun werk in geen enkele schoolvakantie weg? Dan kan de directeur maximaal tien dagen vrij geven | Verbatim from the new card. It entails "Maximaal tien dagen" for Fatima's situation. |
| `questions[0].explanation` | Buiten de schoolvakanties mag … niet in de eerste twee weken na de zomervakantie. | Fatima kan door haar werk in geen enkele schoolvakantie weg. Dan mag de directeur … Amina maximaal tien dagen vrij geven, één keer per schooljaar en niet in de eerste twee weken na de zomervakantie. Zonder zo'n reden van het werk mag een leerplichtig kind niet … op vakantie; ouders riskeren dan een boete. Voor Fatima geldt de uitzondering wel. Zij bepaalt de lengte ook niet zelf: zij vraagt toestemming, en langer dan tien dagen mag niet. | Says why each distractor fails: "geen dag" is the main rule, and the exception sets it aside; "zo lang als zij wil" is ruled out by the permission and the ten-day cap. |
| `sourceNote` | quotes of 14 Oct, "maximaal 10 dagen", 5-to-18 sentence | quotes as read today ("maximaal 10 dagen per schooljaar", "Langer op vakantie gaan buiten de schoolvakanties mag niet van de wet."), the URL redirect, Leerplichtwet art. 13a lid 2, the 8.1.3 indicator, distractor rationale | The page wording changed slightly. The 5-to-18 sentence was dropped because the card no longer has it. |
| `sourceReviewedAt` | 2026-10-14 | 2026-11-06 | Verified today. |

The image alt "Fatima en Amina staan thuis naast een koffer." still fits the new prompt and reveals no option, so it is unchanged.

### 2. A2:knm:batch033-passief-kiesrecht:1 (key C, unchanged; prompt and card unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].options.B` | Het recht om niet te hoeven stemmen. | Het recht om de burgemeester te kiezen. | The old B was true in the Netherlands (rule 2). The new B is false: the Crown appoints the burgemeester on a recommendation from the gemeenteraad (Gemeentewet art. 61). It is another rule that is easy to confuse, because many countries elect their mayors. |
| `questions[0].explanation` | … 'Passief' betekent hier niet dat u niet stemt. Wie mag stemmen, mag zich in principe ook kandidaat stellen. | Actief kiesrecht is het recht om te stemmen. Passief kiesrecht is het recht om zelf gekozen te worden, … Wie mag stemmen, mag zich in principe ook kandidaat stellen. Inwoners kiezen de burgemeester niet: de Koning en de minister benoemen hem of haar, na een advies van de gemeenteraad. | The sentence about the removed option is dropped. The new sentence says why the new B fails. The first sentence already says why the tempting A (actief) fails. |
| `sourceNote` | Kiesraad quotes; 7.1.4 indicator; batch 019 remark | same Kiesraad quotes, re-verified, plus the Rijksoverheid "Burgemeesters" page and Gemeentewet art. 61 lid 1 for B, and why the old B was removed | Provenance for the new distractor. |
| `sourceReviewedAt` | 2026-09-11 | 2026-11-06 | Verified today. |

I kept the original "what does the term mean" form rather than turning the item round. In the turned-round form ("Hoe heet dat recht?"), the third option would have to be another term that is false. The obvious candidates fail: "stemrecht" is the same thing as actief kiesrecht, "grondrecht" is true (Grondwet art. 4), and "stemplicht" is not a right, which leaves a 50/50.

### 3. A2:knm:batch032-vuurwerk:1 (key C → A)

The consumer ban is still in force on 2026-11-06 (see Sources), so the item stays.

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` | Consumenten mogen zelf geen vuurpijlen afsteken. Klein vuurwerk, zoals sterretjes, mag wel. Voor verenigingen bestaan speciale regels. | Sinds 1 augustus 2026 mogen consumenten alleen klein vuurwerk afsteken, zoals sterretjes. Vuurpijlen en ander groot vuurwerk mogen zij niet afsteken, ook niet op oudejaarsavond. Voor verenigingen gelden aparte regels. | The card now states what is allowed, which is what the new prompt asks. It names the start date of the new law and rules out the six-o'clock window, which is the C confusion. It has 30 words. |
| `questions[0].prompt` | Modibo wil met Oud en Nieuw vuurpijlen afsteken. Mag dat in Nederland? | Modibo wil met Oud en Nieuw vuurwerk afsteken. Wat mag hij zelf afsteken? | The prompt asks for exactly what the options differ on: which fireworks a consumer may set off himself (rule 3). "zelf" separates him from professionals and associations. It has 13 words. |
| `questions[0].options` | A Nee, sterretjes zijn ook verboden. / B Ja, op oudejaarsavond mag dat. / C Nee, sterretjes mogen wel. | A Alleen klein vuurwerk, zoals sterretjes. / B Geen vuurwerk, ook geen sterretjes. / C Ook vuurpijlen, maar pas na zes uur 's avonds. | Three distinct answers: only small fireworks (key), nothing (over-correction), or rockets as well after six (the remembered old window). The key sits in the middle of the scale and is not the longest option (40/35/46 characters). |
| `questions[0].answer` | C | A | Follows the new options. It also fits the key balance. |
| `questions[0].evidence` | Consumenten mogen zelf geen vuurpijlen afsteken. Klein vuurwerk, zoals sterretjes, mag wel. | Sinds 1 augustus 2026 mogen consumenten alleen klein vuurwerk afsteken, zoals sterretjes. | Verbatim from the new card. It entails the key word for word. |
| `questions[0].explanation` | Het landelijke verbod geldt sinds 1 augustus 2026. … Dat is een aparte regeling. | Sinds 1 augustus 2026 geldt in Nederland een vuurwerkverbod voor consumenten. Modibo mag alleen klein vuurwerk van categorie F1 afsteken, zoals sterretjes of knalerwten; dat mag het hele jaar. Sterretjes zijn dus niet verboden. Vuurpijlen mag hij niet afsteken, ook niet op oudejaarsavond na zes uur. Ander vuurwerk is voor professionals, en voor verenigingen of stichtingen met toestemming van de gemeente. | Says why B fails (sterretjes are allowed all year) and why C fails (no rockets, not even after six). |
| `sourceNote` | pages read 2026-09-11 | all pages re-read today, plus "Welk vuurwerk mag ik nog afsteken?", Staatsblad 2026, 168 art. III and nota §5.1, Staatscourant 2020, 45847, and today's in-force status | See the doubt about the spec's "rule until 2026". |
| `sourceReviewedAt` | 2026-09-11 | 2026-11-06 | Verified today. |

The alt ("Modibo staat 's avonds op een balkon …") and the brief (night, no fireworks) still fit and reveal no option.

### 4. A2:knm:batch033-basisbeurs:1 (key B, unchanged; card and evidence unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].prompt` | Roos studeert aan het hbo en krijgt een basisbeurs van DUO. Moet zij die beurs terugbetalen? | Roos krijgt van DUO een basisbeurs voor het hbo. Wanneer hoeft zij die niet terug te betalen? | The prompt asks for the condition itself (rule 1). It has 17 words. "DUO" stays for eindterm 8.3.3. |
| `questions[0].options` | A Ja, altijd, ook als zij haar diploma haalt. / B Nee, niet als zij binnen tien jaar haar diploma haalt. / C Nee, een basisbeurs hoeft een student nooit terug te betalen. | A Als zij tijdens het hbo bij haar ouders woont. / B Als zij binnen tien jaar haar diploma haalt. / C Als zij na haar studie binnen een jaar werk vindt. | Three conditions in the same form, without absolutes. The key is not the longest option (46/44/50 characters). C's "binnen een jaar" mirrors the key's "binnen tien jaar", so the number does not signal the key. A says "tijdens het hbo" rather than "tijdens haar studie", so that the key is not the only option without "studie". |
| `questions[0].explanation` | Voor mbo 3 en 4, hbo en universiteit … Een lening bij DUO moet u altijd terugbetalen. | Voor hbo en universiteit is de basisbeurs een prestatiebeurs. Haalt Roos binnen tien jaar haar diploma, dan wordt de beurs een gift en betaalt zij niets terug. Haalt zij geen diploma, dan betaalt zij het hele bedrag met rente terug, ook als zij werk vindt. Of zij bij haar ouders woont of niet, bepaalt alleen hoe hoog de beurs is. | Says why both distractors fail. |
| `sourceNote` | DUO page "updated 7 September 2026" | DUO pages as read today ("Laatste update was op 05 november 2026"), the woonsituatie sentence for A, the edge cases (first-year stop, illness), and the stability remark | Provenance for the distractor rationale. |
| `sourceReviewedAt` | 2026-09-11 | 2026-11-06 | Verified today. |

## How each item meets the three rules

| Item | Rule 1: a condition or exception key is set up or asked for | Rule 2: every distractor is false about the Netherlands | Rule 3: options differ in exactly what is asked |
| --- | --- | --- | --- |
| schoolvakantie | The key is the extent of the work exception, and the prompt states the work condition ("Door haar werk kan Fatima in geen schoolvakantie weg"). A learner who knows only the main rule now sees that the exception applies. | "Geen enkele dag" is false when the work condition holds (Leerplichtwet art. 13a). "Zo lang als Fatima zelf wil" is false: leave needs the directeur's permission and is capped at ten days. | The prompt asks "Hoe lang". The options are three durations: 0, at most 10 days, unlimited. |
| passief-kiesrecht | The key is a definition, not an exception. | "Het recht om te stemmen" is actief kiesrecht, not passief. Nobody in the Netherlands has a right to elect the burgemeester; the Crown appoints the mayor. | The prompt asks for the meaning. The options are three different rights. |
| vuurwerk | The key is the permitted F1 category, and the prompt asks for it ("Wat mag hij zelf afsteken?"). The general ban in B does not trap a learner who knows the rule, because the prompt asks what is still allowed. | Sterretjes (F1) are allowed all year, so B is false. Consumers may not set off rockets at any time, so C is false (rockets have been banned for consumers since 1 December 2020, and the general ban since 1 August 2026). | The prompt asks which fireworks. The options are only small / none / also rockets. No two options give the same answer. |
| basisbeurs | The key is the condition, and the prompt asks "Wanneer …?". | Living with the parents changes only the amount (DUO). A job after the studies converts nothing; only a diploma within ten years does. | The options are three conditions in the same form. |

## Sources verified on 2026-11-06

I downloaded every page below today with `curl -sL` and a browser user agent. I converted each to plain text and searched the text for every quote in the source notes; all Dutch quotes were found verbatim. The downloads are in `tmp/knm-fix-2026-11-06/pages/`. I did not rely on search snippets. I used two web searches only to look for news of a suspension of the ban and to locate the 2020 regulation, then opened the primary documents.

| Item | URL | Page | Supported claim |
| --- | --- | --- | --- |
| 1 | https://www.rijksoverheid.nl/vraag-en-antwoord/leerplicht/leerplicht-schoolvakanties (redirects to …/documenten/vraag-en-antwoord/leerplicht/leerplicht-schoolvakanties) | Mag ik mijn kind meenemen op vakantie buiten de schoolvakantie? | "U mag uw kind niet meenemen op vakantie buiten de schoolvakanties wanneer deze leerplichtig is. U kunt een boete krijgen als u dit wel doet. Als u in de schoolvakanties niet weg kunt door uw werk kunt u toestemming vragen …"; "U vraagt toestemming bij de directeur van de school."; "De directeur mag uw kind vrij geven voor maximaal 10 dagen per schooljaar. Dit mag 1 keer in een schooljaar. Langer op vakantie gaan buiten de schoolvakanties mag niet van de wet."; conditions "dit niet in de eerste 2 weken na de zomervakantie is" and "u door uw werk tijdens het schooljaar in geen enkele schoolvakantie op vakantie kunt"; example "seizoensgebonden werk". New since 14 October: "per schooljaar" and the "Langer …" sentence. |
| 1 | https://wetten.overheid.nl/BWBR0002628/ ("Geldend van 01-08-2026 t/m heden") | Leerplichtwet 1969, art. 13a lid 2 | "kan door het hoofd slechts eenmaal voor ten hoogste tien dagen per schooljaar worden verleend en kan geen betrekking hebben op de eerste twee lesweken van het schooljaar". |
| 2 | https://www.kiesraad.nl/verkiezingen/tweede-kamer/stemmen/kiesgerechtigdheid | Kiesgerechtigdheid | "Het actief kiesrecht is het recht om te stemmen. Het passief kiesrecht is het recht om gekozen te worden." The conditions for passief are the same as for actief, except the test date for age. Unchanged since the earlier review. |
| 2 | https://www.rijksoverheid.nl/themas/overheid-en-democratie/gemeenten/burgemeesters | Burgemeesters | "Een burgemeester wordt benoemd door de Koning en de minister van Binnenlandse Zaken en Koninkrijksrelaties ('de Kroon'). Dit gebeurt op basis van een aanbeveling van de gemeenteraad." The page lists vacancies published on 27 and 30 October 2026. |
| 2 | https://wetten.overheid.nl/BWBR0005416/ ("Geldend van 01-10-2026 t/m heden") | Gemeentewet, art. 61 lid 1 | "De burgemeester wordt bij koninklijk besluit op voordracht van Onze Minister benoemd voor de tijd van zes jaar." |
| 2 | https://wetten.overheid.nl/BWBR0001840/ ("Geldend van 22-02-2023 t/m heden") | Grondwet, art. 131 | "De commissaris van de Koning en de burgemeester worden aangesteld, geschorst en ontslagen op een bij de wet te bepalen wijze." Background for a doubt; not cited in the record. |
| 3 | https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk/regels-vuurwerk | Regels vuurwerk afsteken | "Voor consumenten geldt een vuurwerkverbod. Alleen klein vuurwerk, zoals sterretjes, is nog toegestaan."; "Iedereen mag het hele jaar door klein vuurwerk afsteken. Dit is vuurwerk in de categorie F1." (examples include knalerwten and sterretjes); "Vuurwerk zoals vuurpijlen, cakes, compoundboxen en knalvuurwerk mag alleen nog door professionals worden afgestoken."; "Consumenten mogen deze producten niet meer kopen en bezitten. En zij mogen deze producten ook niet meer afsteken."; associations need an ontheffing from the gemeente. |
| 3 | https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk/maatregelen-voor-minder-gewonden-en-schade-door-vuurwerk | Maatregelen voor minder gewonden en schade door vuurwerk | "Sinds 1 augustus 2026 is er een landelijk vuurwerkverbod voor consumenten."; "Klein vuurwerk van de categorie F1, zoals sterretjes en knalerwten, blijft toegestaan." |
| 3 | https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk/vraag-en-antwoord/vuurwerk/welk-vuurwerk-afsteken | Welk vuurwerk mag ik nog afsteken? | "U mag als consument alleen vuurwerk van de categorie F1 afsteken, zoals knalerwten, sierfonteintjes en sterretjes."; associations with an ontheffing "mogen ook ander vuurwerk afsteken met oud en nieuw". |
| 3 | https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk/vraag-en-antwoord/vuurwerk/toestemming-vereniging-vuurwerk-afsteken | Kan mijn vereniging toestemming krijgen om vuurwerk af te steken? | Ontheffing only for F2 siervuurwerk, at most 200 kilo, from 31 December 18.00 to 1 January 2.00. |
| 3 | https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/vuurwerk and https://www.rijksoverheid.nl/actueel/nieuws/2026/08/17/campagne-rondom-landelijke-vuurwerkinleverdagen-van-start | Vuurwerk (topic page); news of 17-08-2026 | Status today: the topic page links the same rules, and its newest news item is dated 11-09-2026, with nothing on a suspension. The 17 August item: "De nieuwe Wet veilige jaarwisseling is per 1 augustus van kracht." A web search for a court suspension in 2026 found only 2020 local cases. |
| 3 | https://zoek.officielebekendmakingen.nl/stb-2026-168.html | Staatsblad 2026, 168 (Besluit veilige jaarwisseling) | Art. III: "Dit besluit treedt in werking met ingang van 1 augustus 2026 nadat artikel IIa van de Wet veilige jaarwisseling op dezelfde datum in werking is getreden." Nota van toelichting §5.1: before that law, consumers could set off F1 and certain F2 (such as cakeboxen) from 31 December 18.00 to 1 January 02.00, and "al het F2-vuurwerk voor consumenten [is] verboden". |
| 3 | https://zoek.officielebekendmakingen.nl/stcrt-2020-45847.html | Staatscourant 2020, 45847 | Rockets are removed from the consumer-fireworks list ("De rij, behorende bij het onderdeel 'Vuurpijlen' vervalt"); "Deze regeling treedt in werking met ingang van 1 december 2020." |
| 4 | https://duo.nl/particulier/studiefinanciering/basisbeurs.jsp ("Laatste update was op 05 november 2026") | Basisbeurs | "De hoogte van de basisbeurs is afhankelijk van uw woonsituatie: als u uitwonend bent, is de beurs hoger dan wanneer u bij (een van) uw ouders thuis woont." "De prestatiebeurs wordt omgezet in een gift als u binnen 10 jaar uw diploma behaalt. Lukt dit niet, dan moet u het totale bedrag met rente terugbetalen." |
| 4 | https://duo.nl/particulier/studiefinanciering/gift-of-terugbetalen.jsp (same update date) | Gift of terugbetalen | "Pas als u binnen 10 jaar uw diploma haalt, worden deze onderdelen van de studiefinanciering een gift."; "Over de prestatiebeurs loopt rente"; first-year stop: "hoeft u uw beurs en reisproduct over het 1e jaar mogelijk niet terug te betalen"; illness or disability: "Soms kan dan een uitzondering worden gemaakt". No work condition is named. |
| all | https://wetten.overheid.nl/BWBR0045574/ ("Geldend van 07-10-2026 t/m heden") | Regeling inburgering 2021, Bijlage 2 | Eindtermen 2.1.5 (names Oud en Nieuw), 7.1.4 ("Kent het verschil tussen actief en passief kiesrecht"), 8.1.3 ("weet dat de door de school vastgestelde vakantietijden bindend zijn") and 8.3.3 (a DUO application for studiekosten). No mapping changed. |

Facts that changed against the spec or the base notes:

- **Schoolvakantie:** the Rijksoverheid page now says "maximaal 10 dagen per schooljaar" and adds "Langer op vakantie gaan buiten de schoolvakanties mag niet van de wet." The substance is unchanged.
- **Basisbeurs:** the DUO pages were updated on 5 November 2026 (they were 7 September). The substance is unchanged.
- **Vuurwerk:** the spec calls "rockets only after six on 31 December" "the rule until 2026". That is not correct for rockets, which have been banned for consumers since 1 December 2020 (Stcrt. 2020, 45847). The six-to-two window before 2026 covered F1 and some F2, such as cakeboxen. I kept a rockets-after-six distractor, because it is false today and draws on the remembered window. Neither the explanation nor the source note claims that rockets were allowed before 2026.

## Key rationale and distractors

1. **Schoolvakantie, key B "Maximaal tien dagen."** The evidence makes the ten days conditional on the parents not being able to go away in any school holiday because of their work, and the prompt states that Fatima is in that situation. A, "Geen enkele dag.", applies the main rule (no holiday outside the school holidays) and overlooks the exception that the prompt sets up. This was the old B misconception, which is now a fair distractor because the condition is given. C, "Zo lang als Fatima zelf wil.", treats the parent as the one who decides: the directeur must give permission, and the law allows at most ten days, once per school year.
2. **Passief kiesrecht, key C "Het recht om gekozen te worden."** This is the card's definition, verbatim. A, "Het recht om te stemmen.", is the confusion between actief and passief, the very distinction the indicator names. B, "Het recht om de burgemeester te kiezen.", is the belief that Dutch citizens elect their mayor, as in many other countries. The Crown appoints the burgemeester.
3. **Vuurwerk, key A "Alleen klein vuurwerk, zoals sterretjes."** The evidence sentence states it directly. B, "Geen vuurwerk, ook geen sterretjes.", over-applies the new ban to F1. C, "Ook vuurpijlen, maar pas na zes uur 's avonds.", carries over the remembered New Year's Eve window to rockets. Rockets are not allowed for consumers at any time.
4. **Basisbeurs, key B "Als zij binnen tien jaar haar diploma haalt."** The evidence ("Haalt de student binnen tien jaar een diploma? Dan wordt de beurs een gift") entails it. A, "Als zij tijdens het hbo bij haar ouders woont.", confuses the thuiswonend/uitwonend rule, which changes only the amount, with repayment. C, "Als zij na haar studie binnen een jaar werk vindt.", treats the beurs as something you keep once you earn: DUO names no work condition, and only the diploma converts the prestatiebeurs.

## Language control

| # | Item | Card words | Prompt words | Option characters A/B/C | Key | Longest option |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | schoolvakantie | 29 (6/10/13) | 20 | 16/20/28 | B | C |
| 2 | passief-kiesrecht | 30 (5/8/17), unchanged | 10, unchanged | 24/39/31 | C | B |
| 3 | vuurwerk | 30 (12/13/5) | 13 | 40/35/46 | A | C |
| 4 | basisbeurs | 30 (9/8/6/7), unchanged | 17 | 46/44/50 | B | C |

Every card has at most 30 words and every prompt at most 20, and each question has exactly three options. No key is the longest option, and no option contains "nooit" or "altijd". No prompt word or five-letter stem recurs only in the key; where a prompt word recurs, it is in a distractor ("geen" and "lang" in item 1, "vuurwerk" in item 3, "hbo" in item 4). The vocabulary stays plain. The less common words are "directeur", "kiesrecht", "burgemeester", "consumenten", "sterretjes", "oudejaarsavond", "prestatiebeurs" and "gift"; each is either the topic itself or explained by its sentence. The A2 word gate does not apply to KNM.

Catalogue overlap: no other KNM item covers vuurwerk, the appointment of the burgemeester, or repayment of the basisbeurs. `batch007-studiefinanciering` asks who handles studiefinanciering (DUO), `batch019-kiesrecht` which election non-EU residents may vote in, and `batch003-stemmen` which documents a voter needs. `batch003-leerplicht` (now the starting age, after batch 041; the batch-003 study card taught leave via the hoofd) and `batch032-suikerfeest` (asking for a day off in advance) do not test the length of holiday leave. The schoolvakantie key does not name the directeur.

## Media consequences

KNM question audio reads the prompt and every option with its letter. All four items changed a prompt or options, so all four `questions[0].questionAudio` clips need regenerating after review, with `--keys` for these four only. No brief changed, so no new drawings are needed, and no alt text changed.

## Key distribution

Answer order: B C A B. That gives A 1, B 2 and C 1. Every letter appears, none more than twice and none twice in a row, as the spec asks. The checker's batch rule (no letter above 40%) cannot be met with four questions of three options each; see doubt 1.

## Doubts for the reviewer

1. **Checker failure that cannot be avoided.** `npm run batch:check` fails with "answer key B is 50% of keys (max 40%)". With four single-question items and three options, a 40% cap allows each letter at most once, so at most three questions. Any four-question KNM batch therefore fails, and the spec's own target (each letter at least once, none more than twice) means 2/1/1. I did not edit the checker. The coordinator could add a fifth item to the batch (2/2/1 = 40% passes), exempt very small revision batches in the checker, or decide otherwise.
2. **Schoolvakantie prompt form.** The spec suggested asking whether Amina may get time off. With a "Mag …?" prompt, the true answer is "ja, met toestemming", and the "Zo lang als Fatima wil" confusion would also be a "Ja", so two "Ja" options would differ only in a clause. That is the rule-3 coin toss. "Hoe lang" makes the three options differ in exactly what is asked. The key contains "Maximaal", which could read as a hedge, but the question asks for a duration, the cap is the legal answer, and the key is not the longest option. The skill stays `rule-application`; `quantity` would also fit. The prompt says "in geen schoolvakantie" (the card says "in geen enkele"), to stay at 20 words.
3. **"Geen enkele dag" and the directeur's discretion.** The directeur decides and may refuse. As a statement about what is allowed in Fatima's situation, though, "no day at all" is false: the law allows up to ten days when the work condition holds. A stricter prompt would be "Hoe lang mag … maximaal …?", but that would exceed 20 words.
4. **Burgemeester distractor (item 2).** This adds a second fact to the item. A strict reader could argue that voters choose the gemeenteraad and the raad recommends the mayor, so voters choose the mayor indirectly. The appointment is by royal decree (Gemeentewet art. 61), so the option is false as stated. Since 2023, Grondwet art. 131 leaves the method of appointment to ordinary law. Re-check this item if a law for an elected mayor is ever passed. If you prefer no extra fact, an alternative B is "De plicht om te gaan stemmen." (the Netherlands has no voting duty), but I did not verify a primary source for that.
5. **Vuurwerk option C.** It mixes rockets with the old time window. The pre-2026 window applied to F1 and some F2 (cakeboxen), not to rockets. "Ook cakes, maar pas na zes uur 's avonds." would mirror the old rule exactly, but at A2 "cakes" reads as cake. C begins "Ook", so it implies "small fireworks plus rockets". A's "Alleen" makes the two options contradictory rather than one a superset of the other. The night picture matches the "'s avonds" in C, a distractor; it does not point to the key. "groot vuurwerk" on the card is my plain paraphrase for F2–F4 (Rijksoverheid lists "vuurpijlen, cakes, compoundboxen en knalvuurwerk"). The card has exactly 30 words.
6. **Basisbeurs edge cases.** The key is the main condition but not the only one: DUO says a student who stops in the first year of studiefinanciering may not have to repay that year, and it allows exceptions for illness or disability. No option names these cases, so the key is still the one best answer, but "Wanneer …?" could be read as asking for every case. The card is unchanged and is at 30 words. I did not open DUO's repayment (draagkracht) pages. The explanation's "ook als zij werk vindt" rests on the "Gift of terugbetalen" table, where the only column that converts the beurs is "Diploma binnen 10 jaar".
7. **Redirects.** The schoolvakantie `sourceUrl` and the base's vereniging URL now redirect to `/documenten/vraag-en-antwoord/…`. I kept the schoolvakantie `sourceUrl` as published, because it still resolves, and recorded the redirect in the note. For the vereniging page, the vuurwerk note uses the link from the topic page.

## Checker

```text
$ npm run batch:check content/batches/100-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/100-original.json

Checked 4 items, 4 questions. Keys: {"B":2,"C":1,"A":1}. Options: {"3":4}.
  info  4 of 4 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
  FAIL  answer key B is 50% of keys (max 40%)
1 failure(s).
```

There are no other failures and no warnings. The one failure follows from the batch size (doubt 1).
