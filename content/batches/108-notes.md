# Batch 108 author notes (KNM batch A, themes 1 and 3)

Author draft of 14 new KNM facts for eindtermen 1.1.1-1.1.7 and 3.1.1-3.3.1. Every source page was opened on 2026-11-22 with `curl -sL` (browser user agent); the quotes in each `sourceNote` were searched in the page text and found verbatim. This is AI author work: it makes no claim of validated A2 difficulty or exam equivalence. Tone of every item: ordinary, no humour. Name pool: Lina, Yusuf, Marieke, Daniel, Fenna, Rachid, Ana, Wouter (none above twice). No voice or older-cast names. Pictures show the setting and never the tested fact; the same person keeps the same three traits (Lina, Rachid, Fenna, Daniel, Marieke).

## Changes against the plan

- `kansrijke-beroepen`: the planned question (which organisation publishes the list, key UWV) is not stated plainly by the UWV page text I could read (it is partly rendered by JavaScript). I tested what the page does state: a kansrijk beroep is a job with good chances of work. Check yearly; no professions are named.
- `taal-doorgroeien`: kept as planned, the 750,000 figure is not used. Loose mapping to 1.1.3, reviewer decides.
- `herplaatsing-bijscholing` (P2): the question asks what the employer must try first when the job disappears; the prompt rules out misconduct, so the condition for the herplaatsing duty is set up. Page URL redirects to /documenten/vraag-en-antwoord/ontslag/herplaatsing-voor-ontslag. First to cut if the batch must shrink.
- `diplomawaardering-idw`: the options name the organisations (Nuffic and SBB) rather than the acronym IDW, which stays on the card only.
- `bijstand-gemeente`: werk.nl and UWV are not used as distractors, because the source names werk.nl as a route; DUO and Belastingdienst are.
- `eerste-woning`: COA is not a distractor, because the page says COA puts people in touch with gemeenten; IND and UWV are used.
- `afval-verschil`: the planned quote (the government is studying differences in separation) is weak. The same page states plainly 'Elke gemeente mag zelf bepalen hoe zij dit doet' (afvalinzameling), so the item asks what can differ per gemeente (the way waste is collected). Milieu Centraal is noted as secondary support.
- `meterstanden-verhuizen` and `energie-voorschot`: the old ConsuWijzer address redirected; the final URLs are used. `participatiewet-werk`: the page card does not say that the gemeente is responsible (not stated in the introduction), so it is left out.
- Question forms: 12 direct or persona facts with a named person, 1 (`taaleis-leraar`) a rule about what an employer may require (no yes/no, no 'nooit/altijd'), no behaviour questions. There are no yes/no items in this batch.

## Items

### 1. A2:knm:batch108-map-module:1 (theme 1, eindterm 1.1.1, key A)

- Prompt: Lina doet de MAP bij haar gemeente. Waar gaat de MAP over?
  - A: Werken en werk zoeken (key)
  - B: Huren en een woning zoeken
  - C: De zorg en de zorgverzekering
- Source: https://www.inburgeren.nl/examen-doen/inhoud-kennisexamens.jsp
- Source note: inburgeren.nl, 'Kennisexamens – Examen doen – Inburgeren' (DUO), opened 2026-11-22, section 'Module Arbeidsmarkt en Participatie (MAP)': 'U doet de MAP bij uw gemeente. Tijdens de brede intake bij uw gemeente vertelt de gemeente hier meer over. De MAP gaat over werken en werk zoeken in Nederland.' The page lists the MAP among the Kennisexamens of the inburgering (Wi2021) and mentions the PIP and Mijn Inburgering. The card says 'hoort bij de inburgering' on that basis. Distractors: wonen/huren and zorgverzekering are other themes of the KNM, not the MAP.
- Explanation: De MAP gaat over werken en werk zoeken in Nederland. Lina leert dus over de arbeidsmarkt. Over wonen en huren of over de zorgverzekering gaat de MAP niet.
- Option lengths (characters): 21/26/29; card 22 words; prompt 12 words.

### 2. A2:knm:batch108-participatiewet-werk:1 (theme 1, eindterm 1.1.1, key B)

- Prompt: Wouter kan werken, maar hij vindt zonder hulp geen baan. Onder welke wet valt hij?
  - A: De Leerplichtwet
  - B: De Participatiewet (key)
  - C: De Zorgverzekeringswet
- Source: https://www.rijksoverheid.nl/themas/belastingen-uitkeringen-en-toeslagen/participatiewet
- Source note: Rijksoverheid, 'Participatiewet' (the old address /onderwerpen/participatiewet redirects here), opened 2026-11-22: 'Iedereen die kan werken maar het op de arbeidsmarkt zonder ondersteuning niet redt, valt onder de Participatiewet. De wet moet ervoor zorgen dat meer mensen werk vinden, ook mensen met een arbeidsbeperking.' The page does not name the gemeente in its introduction, so the card leaves the gemeente out. The Participatiewet is being reformed in 2026-2027 ('Participatiewet in balans'); only the name and the target group are tested. Check yearly. Distractors: the Leerplichtwet (school attendance) and the Zorgverzekeringswet (health insurance) are real laws on other subjects.
- Explanation: Wouter kan werken, maar vindt zonder ondersteuning geen werk. Dan valt hij onder de Participatiewet. De Leerplichtwet gaat over kinderen en school. De Zorgverzekeringswet gaat over de zorgverzekering.
- Option lengths (characters): 16/18/22; card 23 words; prompt 15 words.

### 3. A2:knm:batch108-werknl-vacatures:1 (theme 1, eindterm 1.1.2, key C)

- Prompt: Yusuf zoekt een baan. Waar kan hij online vacatures zoeken en solliciteren?
  - A: Op duo.nl
  - B: Op belastingdienst.nl
  - C: Op werk.nl (key)
- Source: https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/ww-uitkering/hoe-helpt-uwv-mij-bij-het-vinden-van-werk
- Source note: Rijksoverheid, 'Hoe helpt UWV mij bij het vinden van werk?' (redirects from /vraag-en-antwoord/...), section Werk.nl, opened 2026-11-22: 'Op werk.nl kunt u vacatures zoeken, solliciteren en een uitkering aanvragen.' werk.nl itself blocks automated fetching, so the Rijksoverheid page is the source; the page presents werk.nl as the UWV service. Distractors: duo.nl (education, inburgering) and belastingdienst.nl (tax) do not offer vacancies. Check yearly (site names).
- Explanation: Op werk.nl kunt u vacatures zoeken en solliciteren. Die website is van het UWV. Op duo.nl vindt u informatie over onderwijs en inburgering. Op belastingdienst.nl vindt u informatie over belasting.
- Option lengths (characters): 9/21/10; card 18 words; prompt 12 words.

### 4. A2:knm:batch108-kansrijke-beroepen:1 (theme 1, eindterm 1.1.3, key B)

- Prompt: Fenna leest bij het UWV over kansrijke beroepen. Wat is een kansrijk beroep?
  - A: Een beroep waarin u veel geld verdient
  - B: Een beroep met veel kans op werk (key)
  - C: Een beroep waarvoor u geen diploma nodig hebt
- Source: https://www.uwv.nl/nl/arbeidsmarktinformatie/kansen-beroep/kansrijke-beroepen
- Source note: UWV, 'Kansrijke beroepen: beroepen met goede kansen op werk', opened 2026-11-22: 'De meeste functies op de lijst met kansrijke beroepen bieden al jarenlang veel kans op werk.'; 'Ieder jaar verdwijnen er ook beroepen van de lijst met kansrijke beroepen.'; 'Met de beroepskeuzehulp kunnen mensen binnen hun regio zoeken naar banen met veel kans op werk.' (The page is rendered partly by JavaScript; the text above was in the static HTML.) No professions are named, because the list changes yearly: check yearly. Distractors: kansrijk says nothing about salary, and the page does not tie the list to jobs without a diploma (the 2026 additions include hbo and wo jobs).
- Explanation: Een kansrijk beroep is een beroep met veel kans op werk. Het gaat dus niet om het salaris. Ook hebt u voor veel kansrijke beroepen wel een diploma nodig.
- Option lengths (characters): 38/32/45; card 25 words; prompt 13 words.

### 5. A2:knm:batch108-taal-doorgroeien:1 (theme 1, eindterm 1.1.3, key A)

- Prompt: Rachid werkt in een magazijn en spreekt weinig Nederlands. Wat kan dat voor hem betekenen?
  - A: Minder kansen om door te groeien (key)
  - B: Minder vakantiedagen dan zijn collega's
  - C: Een hogere belasting over zijn loon
- Source: https://www.rijksoverheid.nl/themas/werk/arbeidsovereenkomst-en-cao/taalakkoord-taalvaardigheid-werknemers-verbeteren
- Source note: Rijksoverheid, 'Taalakkoord: taalvaardigheid werknemers verbeteren', opened 2026-11-22: 'Onvoldoende taalbeheersing ... Dan kan dat bijvoorbeeld gevolgen hebben voor de veiligheid en duurzame inzetbaarheid op de werkvloer. En voor doorgroeimogelijkheden.' The mapping to 1.1.3 (factors that influence chances, including Dutch) is loose; the reviewer decides. The prompt says 'kan', as the source does. Distractors: holiday days follow the contract and the law, not language; tax on wages follows the wage, not language. No figures used.
- Explanation: Onvoldoende Nederlands op het werk kan gevolgen hebben voor de veiligheid en voor doorgroeimogelijkheden. Rachid heeft dus minder kans om door te groeien. Vakantiedagen en belasting hangen niet af van zijn taal.
- Option lengths (characters): 32/39/35; card 22 words; prompt 15 words.

### 6. A2:knm:batch108-taaleis-leraar:1 (theme 1, eindterm 1.1.6, key C)

- Prompt: Een school zoekt een leraar Nederlands. Wat mag de school van een sollicitant eisen?
  - A: Dat hij in Nederland is geboren
  - B: Dat hij een Nederlands paspoort heeft
  - C: Dat hij perfect Nederlands spreekt (key)
- Source: https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/gelijke-behandeling-op-het-werk/mag-een-werkgever-onderscheid-maken-tussen-sollicitanten
- Source note: Rijksoverheid, 'Mag een werkgever onderscheid maken tussen sollicitanten?', opened 2026-11-22: 'Of als een kandidaat aan bepaalde eisen moet voldoen om de functie goed uit te kunnen voeren. Een werkgever mag bijvoorbeeld van een leraar Nederlands verlangen dat deze perfect Nederlands spreekt.' The prompt sets up the job (leraar Nederlands) and asks what may be required, so no general rule is hidden. Distractors: requiring birth in the Netherlands or Dutch nationality for a teacher is not a job requirement and would be discrimination on origin (art. 1 Grondwet, Algemene wet gelijke behandeling). Not a yes/no item. Check yearly (low risk).
- Explanation: Een werkgever mag eisen stellen als dat nodig is voor de functie. Een leraar Nederlands moet perfect Nederlands spreken. Waar iemand is geboren of welk paspoort hij heeft, zegt niets over zijn werk. Zulke eisen zijn discriminatie.
- Option lengths (characters): 31/37/34; card 22 words; prompt 14 words.

### 7. A2:knm:batch108-vog-gastouder:1 (theme 1, eindterm 1.1.6, key B)

- Prompt: Ana wil gastouder worden. Welk document is voor dat werk wettelijk verplicht?
  - A: Een rijbewijs
  - B: Een VOG (key)
  - C: Een medische verklaring
- Source: https://www.justis.nl/service-contact/veelgestelde-vragen/vog/waarom-heb-ik-een-vog-nodig
- Source note: Justis, 'Waarom heb ik een VOG nodig?', opened 2026-11-22: 'Voor sommige functies is een VOG wettelijk verplicht, bijvoorbeeld voor onderwijzers, gastouders en taxichauffeurs.' and 'Als er geen wettelijke verplichting is voor het overleggen van een VOG, mag een werkgever zelf bepalen of hij een VOG verplicht stelt.' Loose mapping to 1.1.6 (an employer or the law may set requirements): reviewer decides. Distractors: neither a rijbewijs nor a medical declaration is a legal requirement for gastouders (the page names only the VOG). The card explains the abbreviation but not the content, which the source page does not state in the quoted sentence.
- Explanation: Voor sommige beroepen is een VOG wettelijk verplicht, bijvoorbeeld voor gastouders. Ana heeft dus een VOG nodig. Een rijbewijs of een medische verklaring is voor dit werk niet wettelijk verplicht.
- Option lengths (characters): 13/7/23; card 19 words; prompt 12 words.

### 8. A2:knm:batch108-diplomawaardering-idw:1 (theme 1, eindterm 1.1.4, key A)

- Prompt: Daniel heeft een diploma uit het buitenland. Welke organisaties maken daarvoor een diplomawaardering?
  - A: Nuffic en SBB (key)
  - B: Het UWV en de gemeente
  - C: DUO en de Belastingdienst
- Source: https://www.nuffic.nl/studeren-en-werken-in-nederland/diplomawaardering-aanvragen
- Source note: Nuffic, 'Diplomawaardering aanvragen', opened 2026-11-22: 'De overheid heeft Nuffic en SBB aangewezen om diplomawaarderingen te maken. IDW is het loket voor onze diplomawaarderingen.' and 'Een diplomawaardering is een vergelijking van een buitenlands diploma met een Nederlands diploma.' The acronym IDW is explained on the card but kept out of the options (A2). Distractors: UWV, gemeente, DUO and Belastingdienst are real public bodies that do not make diploma valuations; the page names only Nuffic and SBB as designated. Different fact from batch 006 (what a waardering is). Check yearly (organisation names).
- Explanation: De overheid heeft Nuffic en SBB aangewezen om diplomawaarderingen te maken. U vraagt die aan bij het loket IDW. Het UWV, de gemeente, DUO en de Belastingdienst maken geen diplomawaarderingen.
- Option lengths (characters): 13/22/25; card 27 words; prompt 13 words.

### 9. A2:knm:batch108-herplaatsing-bijscholing:1 (theme 1, eindterm 1.1.5, key C)

- Prompt: Het werk van Marieke verdwijnt. Haar werkgever wil haar ontslaan. Wat moet hij eerst proberen?
  - A: Haar een hoger loon geven
  - B: Een baan bij een ander bedrijf voor haar zoeken
  - C: Een andere passende functie voor haar zoeken (key)
- Source: https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/ontslag/herplaatsing-voor-ontslag
- Source note: Rijksoverheid, 'Heb ik recht op een andere functie voordat ik word ontslagen?' (address /onderwerpen/ontslag/vraag-en-antwoord/herplaatsing-voor-ontslag redirects here), opened 2026-11-22: 'U kunt alleen worden ontslagen als uw werkgever u niet kan herplaatsen.'; 'Het kan zijn dat u door scholing in een andere functie kunt gaan werken.'; 'Uw werkgever moet zich inspannen om u te kunnen herplaatsen in een andere passende functie binnen het bedrijf. Dit kan betekenen dat uw werkgever u laat omscholen of bijscholen.' Exceptions on the page (verwijtbaar handelen, proeftijd, pensioenleeftijd): the prompt gives a lost job, not misconduct, so the condition is set up. Weak mapping to 1.1.5 (importance of bijscholing): P2, reviewer decides. Distractors: the employer owes no higher wage and no search outside the company ('binnen het bedrijf').
- Explanation: Een werkgever moet eerst kijken of er een andere passende functie voor Marieke is. Scholing kan daarbij helpen. Een hoger loon of een baan bij een ander bedrijf hoeft hij niet te zoeken.
- Option lengths (characters): 25/47/44; card 23 words; prompt 15 words.

### 10. A2:knm:batch108-bijstand-gemeente:1 (theme 1, eindterm 1.1.7, key A)

- Prompt: Lina is nieuw in Nederland en heeft geen inkomen. Waar vraagt zij bijstand aan?
  - A: Bij de gemeente (key)
  - B: Bij DUO
  - C: Bij de Belastingdienst
- Source: https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/bijstand/waar-kan-ik-mijn-bijstand-regelen
- Source note: Rijksoverheid, 'Waar kan ik mijn algemene bijstand aanvragen?', opened 2026-11-22: 'U kunt algemene bijstand aanvragen bij uw gemeente of via werk.nl.' and 'U kunt uw bijstandsuitkering rechtstreeks aanvragen bij uw gemeente of via werk.nl.' The distractors are not werk.nl or UWV (the page names werk.nl as a route). 'Bijstand is een uitkering om van te leven' paraphrases 'bijstandsuitkering'. The Participatiewet is being reformed in 2026-2027: check yearly. Key 'gemeente' also appears in 3.1.1 (item 11); different distractors, different theme and picture. Pairs with batch 006 ww-uitkering (UWV).
- Explanation: U vraagt bijstand aan bij uw gemeente. DUO regelt onder meer studiefinanciering en inburgering. De Belastingdienst regelt belasting en toeslagen. Beide geven geen bijstand.
- Option lengths (characters): 15/7/22; card 23 words; prompt 14 words.

### 11. A2:knm:batch108-eerste-woning:1 (theme 3, eindterm 3.1.1, key B)

- Prompt: Rachid heeft een verblijfsvergunning als vluchteling. Welke organisatie moet zorgen voor zijn eerste woning?
  - A: De IND
  - B: De gemeente (key)
  - C: Het UWV
- Source: https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/asielbeleid/zijn-gemeenten-verplicht-vergunninghouders-aan-een-woning-te-helpen
- Source note: Rijksoverheid, 'Zijn gemeenten verplicht statushouders aan een woning te helpen?', opened 2026-11-22: 'Gemeenten hebben de wettelijke taak om asielzoekers die een verblijfsvergunning krijgen een plek te geven om te wonen.' and 'Daarna moet de gemeente zorgen voor een woning, zoals een zelfstandige woning of huurwoning, of een gedeelde woning.' The page says the COA puts people in touch with gemeenten; COA is therefore not used as a distractor. No waiting times or numbers. Distractors: the IND decides on the permit, not on housing; UWV does not arrange housing. Eindterm 3.1.1: first housing depends on the gemeente. Sensitive-adjacent but ordinary in tone. Key 'gemeente' also in item 10.
- Explanation: De gemeente heeft de wettelijke taak om te zorgen voor een woning voor iemand met een verblijfsvergunning als vluchteling. De IND geeft de verblijfsvergunning, maar regelt geen woning. Het UWV regelt geen woning.
- Option lengths (characters): 6/11/7; card 18 words; prompt 14 words.

### 12. A2:knm:batch108-meterstanden-verhuizen:1 (theme 3, eindterm 3.2.1, key C)

- Prompt: Daniel verhuist naar een ander huis. Wat geeft hij binnen vijf werkdagen door aan zijn energieleverancier?
  - A: Zijn salarisstrook
  - B: Zijn huurcontract
  - C: Zijn meterstanden (key)
- Source: https://consument.acm.nl/elektriciteit-en-gas/meters-meterstanden-verbruik/meterstanden-energierekening
- Source note: ACM ConsuWijzer (consumer service of the Autoriteit Consument en Markt), 'Meterstanden op de energierekening' (the older ConsuWijzer address redirects here), opened 2026-11-22: 'Gaat u verhuizen? Of overstappen? Dan moet u uw meterstanden binnen 5 werkdagen na uw overstap of verhuizing doorgeven.' Smart meters send readings automatically, so the question stays generic and the card does not claim every household must read a meter. The prompt states the five working days, so no absolute is hidden. Distractors: a salary slip and a rental contract are not asked by the energy supplier for a move. Check yearly (energy rules).
- Explanation: Bij een verhuizing geeft u uw meterstanden binnen vijf werkdagen door aan uw energieleverancier. Een salarisstrook of een huurcontract hoeft u niet aan uw leverancier te geven.
- Option lengths (characters): 18/17/17; card 25 words; prompt 16 words.

### 13. A2:knm:batch108-energie-voorschot:1 (theme 3, eindterm 3.2.2, key A)

- Prompt: Fenna betaalt elke maand een termijnbedrag voor stroom en gas. Wat is dat?
  - A: Een voorschot op de jaarafrekening (key)
  - B: Een boete voor te veel stroom of gas
  - C: Een extra belasting op stroom en gas
- Source: https://consument.acm.nl/elektriciteit-en-gas/wat-betaal-ik-voor-mijn-energie/termijnbedrag
- Source note: ACM ConsuWijzer, 'Het termijnbedrag bij mijn energiecontract', opened 2026-11-22: 'Met het termijnbedrag betaalt u iedere maand alvast een deel van uw jaarafrekening. Het termijnbedrag is een voorschot daarop. Pas als u die jaarafrekening krijgt, weet u of u geld moet bijbetalen of u geld terugkrijgt.' No amounts used. Distractors: the termijnbedrag is not a fine for high use and not a tax (energiebelasting is a separate part of the bill, not the termijnbedrag). Distinct from batch 006 energietarief (vast tarief). Check yearly (energy rules).
- Explanation: Het termijnbedrag is een voorschot op de jaarafrekening: u betaalt elke maand vooraf een deel. Het is geen boete en geen belasting. Bij de jaarafrekening ziet u of u moet bijbetalen of geld terugkrijgt.
- Option lengths (characters): 34/36/36; card 27 words; prompt 13 words.

### 14. A2:knm:batch108-afval-verschil:1 (theme 3, eindterm 3.3.1, key B)

- Prompt: Marieke verhuist naar een andere gemeente. Wat kan daar anders zijn?
  - A: Hoe hoog het minimumloon is
  - B: Hoe het afval wordt opgehaald (key)
  - C: De leeftijd van de leerplicht
- Source: https://www.rijksoverheid.nl/themas/klimaat-milieu-en-natuur/afval/huishoudelijk-afval
- Source note: Rijksoverheid, 'Huishoudelijk afval scheiden en recyclen' (the older address /onderwerpen/afval/huishoudelijk-afval redirects here), section 'Afvalinzameling door gemeenten', opened 2026-11-22: 'De gemeente moet uw huishoudelijk afval inzamelen. Dat staat in de Wet milieubeheer. Elke gemeente mag zelf bepalen hoe zij dit doet. Zo kunnen gemeenten het huis-aan-huis ophalen. Of via een centrale verzamelplaats in de straat.' The same page: 'de overheid onderzoekt ... of de verschillen in afvalscheiding tussen gemeenten kunnen worden verkleind' (not used). Milieu Centraal (a foundation, secondary, opened 2026-11-22) says: 'Je gemeente kiest waar, hoe en wanneer je welk afval moet inleveren.' Distractors: the minimum wage (Wet minimumloon) and the leerplicht age (Leerplichtwet) are national rules, the same in every gemeente. Check yearly (national harmonisation is under study).
- Explanation: Elke gemeente mag zelf bepalen hoe zij het afval inzamelt. Het ophalen kan dus anders zijn. Het minimumloon en de leerplicht zijn landelijke regels. Die zijn in elke gemeente hetzelfde.
- Option lengths (characters): 27/29/29; card 20 words; prompt 11 words.
## Why each distractor is false in the Netherlands today

| Item | Distractors | Why false |
| --- | --- | --- |
| map-module | B huren en een woning zoeken; C de zorg en de zorgverzekering | Other KNM themes; the inburgeren.nl page says the MAP is about working and looking for work. |
| participatiewet-werk | A Leerplichtwet; C Zorgverzekeringswet | Real laws on school attendance and health insurance, not on support to find work. |
| werknl-vacatures | A duo.nl; B belastingdienst.nl | Sites for education/inburgering and for tax; neither offers vacancies. |
| kansrijke-beroepen | A veel geld verdienen; C geen diploma nodig | The UWV page defines kansrijk by chances of work only; the 2026 list includes hbo and wo jobs. |
| taal-doorgroeien | B minder vakantiedagen; C hogere belasting | Holiday days and tax do not depend on a worker's Dutch. |
| taaleis-leraar | A in Nederland geboren; B Nederlands paspoort | Not job requirements for a teacher; discrimination on origin or nationality (art. 1 Grondwet). |
| vog-gastouder | A rijbewijs; C medische verklaring | The Justis page names only the VOG as legally required for gastouders. |
| diplomawaardering-idw | B UWV en gemeente; C DUO en Belastingdienst | Only Nuffic and SBB are designated to make diplomawaarderingen. |
| herplaatsing-bijscholing | A hoger loon; B baan bij een ander bedrijf | The duty is another suitable function within the company; no raise, no search outside. |
| bijstand-gemeente | B DUO; C Belastingdienst | Study finance and tax/toeslagen bodies; bijstand is applied for at the gemeente (or via werk.nl). |
| eerste-woning | A IND; C UWV | The IND decides on the permit; the UWV does not arrange housing; the gemeente has the legal task. |
| meterstanden-verhuizen | A salarisstrook; B huurcontract | The supplier needs meter readings within five working days, not these documents. |
| energie-voorschot | B boete; C extra belasting | The termijnbedrag is a monthly advance on the jaarafrekening, not a fine, not a tax. |
| afval-verschil | A minimumloon; C leeftijd leerplicht | National rules, equal in every gemeente; only the gemeente decides how waste is collected. |

## Check yearly

participatiewet-werk (reform 2026-2027, only the name is tested); werknl-vacatures (site names); kansrijke-beroepen (list changes yearly, no professions named); bijstand-gemeente (Participatiewet reform); diplomawaardering-idw (organisation names); meterstanden-verhuizen and energie-voorschot (energy rules); afval-verschil (national harmonisation under study). The others do not change yearly; re-check at the yearly KNM round.

## Keys and language control

Key order: A B C B A C B A C A B C A B. Counts A 5 (36%), B 5 (36%), C 4 (29%); no letter three times in a row. All questions have three options; cards 18-27 words; prompts 11-16 words. The key is the longest option in no item. No "nooit" or "altijd" option and no yes/no item. Hard words that are the subject of the item: MAP, Participatiewet, kansrijk beroep, VOG, Nuffic, SBB, IDW (card only), verblijfsvergunning, meterstanden, voorschot, termijnbedrag, jaarafrekening. The A2 word gate does not apply to KNM.

Catalogue overlap checked against all 104 KNM items: no repeated fact. Nearest: batch006 diplomawaardering (what it is; here who makes it), batch006 ww-uitkering (UWV; here bijstand at the gemeente), batch006 energietarief (vast tarief; here termijnbedrag), batch006 gft (which bin; here collection differs per gemeente), batch006 huurcontract (3.1.1; here who arranges the first home), batch019 uitzendbureau (1.1.2; here werk.nl).

## Doubts for the reviewer

1. `kansrijke-beroepen` tests a definition that is nearly given away by the word 'kansrijk'; the UWV page was partly JavaScript. Consider swapping for a fact from a fuller page.
2. `taal-doorgroeien`, `vog-gastouder` and `herplaatsing-bijscholing` map loosely to 1.1.3, 1.1.6 and 1.1.5 (see source notes). `herplaatsing-bijscholing` is the first to cut.
3. `diplomawaardering-idw`: the key is the only option with unfamiliar names; a learner may pick by elimination.
4. Two items have the key 'de gemeente' (bijstand, eerste woning), as the brief expected; distractors and pictures differ.
5. `eerste-woning` names 'vluchteling'; calm and factual, no numbers.

## Batch check output

```
Checked 14 items, 14 questions. Keys: {"A":5,"B":5,"C":4}. Options: {"3":14}.
No failures, no warnings.
```

(Run with `npx tsx scripts/batch-check.ts content/batches/108-original.json`. Earlier runs had four sentence-length warnings, 12.5-13.5 words on average; I shortened the four cards and they are gone.)
