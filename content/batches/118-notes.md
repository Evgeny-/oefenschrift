# Batch 118 author notes (KNM batch G: theme 4 and 3.2)

Thirteen new KNM facts, one per assigned eindterm, from pages opened on 2026-11-22 (curl; all returned HTTP 200, text read in full). Author work, not CEFR validation and not exam equivalence. Every item is `draft`, `targetLevelValidated: false`, ordinary in tone (no humour), with no media or derived fields. Names: Bo, Yasmina, Cas, Valerie, Zakaria, Arjan, Demi (each at most twice; none is a voice name or older cast name). Recurring people (Bo, Valerie, Zakaria, Cas, Demi, Arjan) keep the same three visual traits in both pictures.

Keys in batch order: B A C B A C B A C B A C B. Counts: A 4 (31%), B 5 (38%), C 4 (31%). No letter three times in a row. No yes/no questions; no behaviour questions. The key is never the longest option. All questions are 11-20 words, all cards 15-30 words.

No planned fact was replaced; I chose each fact from the eindterm paraphrase and the source, checking the two existing items per eindterm (and the two 4.3.2 items). New facts, none of them a repeat: GP may refuse (4.1.1), pharmacy interaction check (4.1.2), tandarts tips (4.1.3), consultatiebureau invitation at one month (4.1.4), care without verwijsbrief (4.2.1), eigen risico at the SEH but not at the huisartsenpost (4.3.1), 112 in the EU (4.3.2), paying a pharmacy bill first and claiming back (4.4.2), one month to see the medical file (4.4.3), apply for zorgtoeslag once (4.4.4), what mantelzorg is (4.5.1), slimme meter (3.2.1), opzegvergoeding (3.2.2).

Batch check: `npx tsx scripts/batch-check.ts content/batches/118-original.json` gives "Checked 13 items, 13 questions. Keys: {"B":5,"A":4,"C":4}. Options: {"3":13}. No failures, no warnings." (A first run warned about option lengths for 3.2.2; the third option was replaced by the dynamisch tarief, which the source also states.)

Doubts for the reviewer: (1) 4.4.3 dossier-termijn maps loosely to "administration is digital"; (2) 4.1.3 tandarts-poetstips is an easy fact and its source is Thuisarts (NHG), not a government page; (3) 4.1.2 apotheek-controle and 4.4.2 rekening-apotheek share a source page and a setting (different sections, different people in the pictures: counter versus kitchen table); (4) hard words kept on cards because they are the tested term: opzegvergoeding, eigen risico, mantelzorg.

## Per item

### 1. huisarts-vol (theme 4, 4.1.1, key B, tone ordinary, stable)

- Question: Bo zoekt een nieuwe huisarts. Wanneer mag een huisarts hem niet aannemen?
- Options: A Als hij geen werk heeft. / B Als de praktijk vol is. / C Als hij uit een ander land komt.

- Card: Een huisarts mag een nieuwe patiënt soms niet aannemen. Bijvoorbeeld als de praktijk vol is, of als u te ver weg woont.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/ben-ik-vrij-om-zelf-een-huisarts-te-kiezen-en-hoe-verander-ik-van-huisarts
- Source note and distractors: Rijksoverheid, 'Hoe verander ik van huisarts?' (opened 2026-11-22): 'De huisarts die u kiest mag u weigeren als nieuwe patiënt wanneer: u te ver weg woont; de huisartsenpraktijk vol is; de huisarts niet kan instemmen met bepaalde zorgwensen, bijvoorbeeld een verzoek voor euthanasie.' The same page opens: 'Het is meestal mogelijk om zelf uw huisarts te kiezen en ook om van huisarts te veranderen.' Different fact from 006 huisartskeuze (free choice) and 033 beroepsgeheim. Distractors: no work and a foreign origin are not grounds in the list; refusing for origin would be discrimination.

### 2. apotheek-controle (theme 4, 4.1.2, key A, tone ordinary, stable)

- Question: Yasmina haalt een medicijn op bij de apotheek. Wat controleert de apotheek ook?
- Options: A Of zij andere medicijnen gebruikt. / B Of zij een verwijsbrief heeft. / C Of zij genoeg geld op haar rekening heeft.

- Card: De apotheek controleert uw recept. Ook kijkt de apotheek of u andere medicijnen gebruikt. Die kunnen de werking van een medicijn veranderen.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/geneesmiddelen/wat-betaal-ik-voor-medicijnen-op-recept
- Source note and distractors: Rijksoverheid, 'Wat betaal ik voor medicijnen op recept?' (opened 2026-11-22): 'De apotheek rekent kosten voor: de controle of op het recept de juiste sterkte en hoeveelheid van het medicijn staat; de controle of u andere medicijnen gebruikt die de werking van het medicijn kunnen veranderen; levering van het medicijn; uitleg over gebruik van het medicijn; bijwerken van uw medisch dossier.' Different from 006 receptmedicijnen (where to get it) and 109 drogist (without prescription). Distractors: a verwijsbrief is for specialist care, not for medicine (a recept is needed); the apotheek does not check bank balance.

### 3. tandarts-poetstips (theme 4, 4.1.3, key C, tone ordinary, stable)

- Question: Cas wil leren hoe hij zijn tanden goed poetst. Wie geeft hem tips?
- Options: A Zijn werkgever. / B Zijn zorgverzekeraar. / C Zijn tandarts.

- Card: Heeft u vragen over het poetsen van uw tanden? Dan geeft de tandarts u tips.
- Source: https://www.thuisarts.nl/mond-verzorgen/ik-wil-mijn-tanden-goed-verzorgen
- Source note and distractors: Thuisarts (Nederlands Huisartsen Genootschap), 'Ik wil mijn tanden goed verzorgen', section 'Naar de tandarts' (opened 2026-11-22): 'Heb je vragen over de verzorging van je gebit? Je tandarts kan je tips geven om goed te poetsen. Soms stuurt de tandarts je door naar een mondhygiënist.' The same page says 'Ga elk jaar 1 of 2 keer naar de tandarts voor controle', which is the fact of 109 tandarts-controle and not repeated. Thuisarts is run by the NHG (a responsible professional body); I found no government page with this advice. Distractors: werkgever and zorgverzekeraar give no brushing advice. The fact is easy; it is chosen because the other facts about the tandarts are already tested (free choice without verwijzing, yearly control, children covered).

### 4. consultatiebureau-maand (theme 4, 4.1.4, key B, tone ordinary, stable)

- Question: Valerie heeft een baby gekregen. Wanneer nodigt het consultatiebureau haar uit?
- Options: A Als de baby een week oud is. / B Als de baby een maand oud is. / C Als de baby een jaar oud is.

- Card: Het consultatiebureau volgt de gezondheid van baby's. Het consultatiebureau nodigt u uit als uw baby één maand is. Het bezoek is gratis.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zwangerschap-en-geboorte/bij-wie-kan-ik-terecht-met-vragen-over-de-gezondheid-en-opvoeding-van-mijn-kind
- Source note and distractors: Rijksoverheid, 'Waar kan ik vragen stellen over de gezondheid en opvoeding van mijn kind van 0–4 jaar?' (opened 2026-11-22): 'U kunt vragen stellen over uw baby aan de jeugdarts of verpleegkundige van het consultatiebureau (gratis jeugdgezondheidszorg). [...] Het consultatiebureau nodigt u uit als uw baby 1 maand is.' Different from 006 consultatiebureau (what it does) and 033 kraamzorg. Distractors: one week and one year are both false.

### 5. fysio-zonder-verwijzing (theme 4, 4.2.1, key A, tone ordinary, stable)

- Question: Zakaria heeft last van zijn rug. Naar wie kan hij meestal zonder verwijsbrief?
- Options: A Een fysiotherapeut. / B Een specialist in het ziekenhuis. / C Een chirurg in het ziekenhuis.

- Card: Voor een specialist in het ziekenhuis heeft u een verwijsbrief van de huisarts nodig. Naar een fysiotherapeut kunt u meestal zonder verwijsbrief.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/wanneer-heb-ik-een-verwijsbrief-van-mijn-huisarts-nodig-en-wanneer-mag-hij-deze-weigeren
- Source note and distractors: Rijksoverheid, 'Wanneer heb ik een verwijsbrief van de huisarts nodig?' (opened 2026-11-22): 'Voor specialistische zorg, bijvoorbeeld in ziekenhuizen, heeft u een verwijsbrief nodig.' and 'Voor sommige specialistische zorg heeft u geen verwijzing nodig. Behalve als uw verzekeraar dit uitdrukkelijk aangeeft in uw polis. U kunt meestal zonder verwijzing naar een: fysiotherapeut; oefentherapeut; mondhygiënist; [...]'. The prompt and card say 'meestal' because of the policy exception. Different from 006 verwijsbrief (specialist needs one), 109 ggz and 019 tandarts (no referral, other care). Distractors: a specialist and a chirurg in the hospital both need a verwijsbrief.

### 6. hap-eigen-risico (theme 4, 4.3.1, key C, tone ordinary, check yearly (from 1 Jan 2027 the SEH bill is split; the fact holds))

- Question: Arjan heeft een zorgverzekering. Bij welke zorg betaalt hij wel eigen risico?
- Options: A Bij een bezoek aan de huisarts. / B Bij een bezoek aan de huisartsenpost. / C Bij de spoedeisende hulp.

- Card: Eigen risico is een deel van de zorgkosten dat u zelf betaalt. Bij de huisartsenpost betaalt u dat niet. Bij de spoedeisende hulp wel.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartsenpost-spoedeisende-hulp
- Source note and distractors: Rijksoverheid, 'Wanneer moet ik naar de huisartsenpost of de spoedeisende hulppost?' (opened 2026-11-22): 'Huisartsenzorg wordt volledig vergoed. De zorg gaat niet ten koste van uw verplichte eigen risico. Dat geldt ook voor de zorg op een huisartsenpost. De zorg bij een spoedeisende hulppost vindt plaats in een ziekenhuis. Voor deze zorg geldt wel het verplichte eigen risico.' Also Rijksoverheid, 'Welke misverstanden zijn er rond de zorgverzekering?' (opened 2026-11-22): 'Voor een bezoek aan de huisartsenpost hoeft u geen eigen risico te betalen.' and 'Een behandeling bij de spoedeisende hulp valt voor iedereen vanaf 18 jaar onder het verplicht eigen risico.' Check yearly: from 1 January 2027 the SEH bill is split in two parts; the fact is unchanged. Different from 006 huisartsenpost (what it is) and 109 (call first). Distractors: huisarts and huisartsenpost carry no eigen risico.

### 7. alarmnummer-europa (theme 4, 4.3.2, key B, tone ordinary, stable)

- Question: Demi is op vakantie in Spanje. Zij ziet een ernstig ongeluk. Welk alarmnummer kan zij daar bellen?
- Options: A Het nummer 0900-8844. / B Het nummer 112. / C Het nummer 999.

- Card: Het alarmnummer 112 werkt in alle landen van de Europese Unie. Ook in het buitenland belt u 112 alleen als elke seconde telt.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/alarmnummer-112/112-bellen-in-buitenland
- Source note and distractors: Rijksoverheid, 'Kan ik alarmnummer 112 ook in het buitenland bellen?' (opened 2026-11-22): 'U kunt het alarmnummer 112 bellen in alle landen van de Europese Unie (EU) en in een aantal andere landen.' and 'U mag het internationale alarmnummer 112 alleen bellen wanneer elke seconde telt.' Different from 003 noodnummer (which situations) and 019 alarmnummer (without credit). Distractors: 0900-8844 is the Dutch non-emergency police number (Rijksoverheid, 'Wanneer kan ik alarmnummer 112 bellen?', opened 2026-11-22) and does not work as an alarm number in Spain; 999 is the UK number, not used in Spain. Spain is an EU member state.

### 8. rekening-apotheek (theme 4, 4.4.2, key A, tone ordinary, stable)

- Question: De zorgverzekeraar van Valerie heeft geen contract met haar apotheek. Wie betaalt de rekening voor haar medicijnen eerst?
- Options: A Valerie zelf. / B De zorgverzekeraar. / C De huisarts.

- Card: Heeft uw zorgverzekeraar geen contract met uw apotheek? Dan betaalt u de rekening eerst zelf. Daarna vraagt u het geld terug bij de zorgverzekeraar.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/geneesmiddelen/wat-betaal-ik-voor-medicijnen-op-recept
- Source note and distractors: Rijksoverheid, 'Wat betaal ik voor medicijnen op recept?' (opened 2026-11-22): 'Heeft uw zorgverzekeraar een contract met uw apotheker? Dan stuurt de apotheek de rekening voor uw medicijnen direct naar uw zorgverzekeraar. Heeft uw zorgverzekeraar geen contract met uw apotheek? Dan betaalt u eerst zelf de rekening. Daarna vraagt u de kosten bij uw zorgverzekeraar terug.' This is the declareren eindterm in the plain sense (claim back). Same page as item apotheek-controle, different section and fact. The prompt states the no-contract condition; without it the zorgverzekeraar would be the usual answer. Distractor 'De zorgverzekeraar' is false under this condition; the huisarts never pays.

### 9. dossier-termijn (theme 4, 4.4.3, key C, tone ordinary, stable)

- Question: Bo vraagt zijn huisarts om zijn medisch dossier te zien. Hoe lang heeft de huisarts daarvoor maximaal?
- Options: A Maximaal drie dagen. / B Maximaal een half jaar. / C Maximaal één maand.

- Card: U mag uw medisch dossier inzien, ook online. Een arts of ziekenhuis moet daar binnen één maand aan meewerken.
- Source: https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/rechten-van-patient-en-privacy/uw-medisch-dossier/mag-ik-mijn-medisch-dossier-inzien
- Source note and distractors: Rijksoverheid, 'Mag ik mijn medisch dossier inzien?' (opened 2026-11-22): 'U kunt uw medisch dossier (online) inzien.' and 'Uw arts of zorginstelling moet binnen 1 maand aan uw verzoek om inzage meewerken.' Same page as 109 dossier-online (where to look); this item tests the time limit. The link to eindterm 4.4.3 (administration is digital) is the online route named in the card; the weak mapping is a doubt for the reviewer. Distractors: three days and half a year are both false. Prompt says 'maximaal' so that a faster answer cannot also be right.

### 10. zorgtoeslag-eenmalig (theme 4, 4.4.4, key B, tone ordinary, check yearly (toeslagen reform))

- Question: Demi blijft aan de voorwaarden voor zorgtoeslag voldoen. Hoe vaak moet zij zorgtoeslag aanvragen?
- Options: A Elke maand. / B Eén keer. / C Elk jaar opnieuw.

- Card: U vraagt zorgtoeslag online aan met DigiD. U hoeft dit maar één keer te doen. Daarna krijgt u de zorgtoeslag elk jaar vanzelf, als u aan de voorwaarden blijft voldoen.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/kan-ik-zorgtoeslag-krijgen
- Source note and distractors: Rijksoverheid, 'Kan ik zorgtoeslag krijgen?' (opened 2026-11-22): 'U kunt zorgtoeslag online aanvragen met Mijn toeslagen. Hiervoor heeft u DigiD nodig. U hoeft zorgtoeslag maar 1 keer aan te vragen. Daarna krijgt u de zorgtoeslag ieder jaar vanzelf. U moet wel aan de voorwaarden blijven voldoen.' Also: 'Geef veranderingen door aan de Dienst Toeslagen.' Check yearly: the toeslagen system is being reformed; the fact holds today. Different from 019 zorgtoeslag (DigiD to log in) and 109 servicepunt (help). The prompt sets the condition (she keeps meeting the conditions); 'Elk jaar opnieuw' is the tempting wrong answer and is false.

### 11. mantelzorger-wie (theme 4, 4.5.1, key A, tone ordinary, stable)

- Question: Arjan zorgt elke dag voor zijn zieke buurman. Hij doet dat vrijwillig, omdat hij hem goed kent. Hoe heet dat?
- Options: A Mantelzorg. / B Wijkverpleging. / C Respijtzorg.

- Card: Mantelzorg is zorg voor iemand die u kent, bijvoorbeeld een familielid, vriend of buur. U doet dat vrijwillig. De gemeente kan mantelzorgers helpen.
- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/mantelzorg/wanneer-ben-ik-mantelzorger
- Source note and distractors: Rijksoverheid, 'Wanneer ben ik mantelzorger?' (opened 2026-11-22): 'U geeft mantelzorg als u voor iemand zorgt in uw omgeving. U doet dat vrijwillig, omdat u een sociale relatie met die persoon heeft.' and 'Een volwassene die zorgt voor een familielid, vriend of buur.' Rijksoverheid, 'Hoe kan ik als mantelzorger hulp bij de zorg krijgen?' (opened 2026-11-22): 'De gemeente is verantwoordelijk voor de ondersteuning van mantelzorgers.' and 'Als u bij de mantelzorg hulp nodig heeft, kunt u een vrijwilliger of betaalde zorgverlener inschakelen. Dit heet respijtzorg.' The key is not 'de gemeente' (006 wmo and 109 schuldhulp both key the gemeente); the gemeente only appears on the card as welzijn support for 4.5.1. Distractors: wijkverpleging is professional care; respijtzorg is the temporary replacement of a mantelzorger.

### 12. slimme-meter (theme 3, 3.2.1, key C, tone ordinary, stable)

- Question: Cas heeft een slimme meter voor stroom en gas. Wat doet die meter?
- Options: A Hij kiest zelf de goedkoopste energieleverancier. / B Hij betaalt automatisch de energierekening. / C Hij geeft de meterstanden automatisch door.

- Card: Een slimme meter geeft uw meterstanden automatisch door aan de netbeheerder. Meterstanden zijn de getallen op uw meter voor stroom en gas.
- Source: https://consument.acm.nl/elektriciteit-en-gas/meters-meterstanden-verbruik/de-slimme-meter
- Source note and distractors: ACM ConsuWijzer, 'De slimme meter' (opened 2026-11-22): 'De slimme meter geeft uw meterstanden automatisch door aan uw netbeheerder. De netbeheerder (of systeembeheerder) is de eigenaar van uw slimme meter. De netbeheerder geeft de meterstanden aan uw energieleverancier door.' The card omits the second step. Different from 006 stroomstoring (netbeheerder for failures) and 108 meterstanden (what to tell the leverancier on moving). Distractors: a slimme meter does not choose a supplier or pay a bill; both are false.

### 13. opzegvergoeding-vast (theme 3, 3.2.2, key B, tone ordinary, check yearly (energy contract rules))

- Question: Zakaria zegt zijn energiecontract op vóór de einddatum. Bij welk contract mag de leverancier dan een opzegvergoeding vragen?
- Options: A Een contract met een variabel tarief. / B Een contract met een vast tarief. / C Een contract met een dynamisch tarief.

- Card: Bij een vast tarief geldt het contract voor een vaste tijd. Zegt u eerder op? Dan mag de leverancier geld vragen, een opzegvergoeding. Bij een variabel tarief niet.
- Source: https://consument.acm.nl/elektriciteit-en-gas/wat-betaal-ik-voor-mijn-energie/vaste-variabele-leveringskosten-energie
- Source note and distractors: ACM ConsuWijzer, 'Vaste en variabele leveringskosten energie' (opened 2026-11-22): 'Uw vaste tarief geldt voor bepaalde tijd: bijvoorbeeld 1 of 3 jaar. Zegt u vóór de einddatum op? Dan mag uw energieleverancier een opzegvergoeding vragen.' and, for the variabel tarief: 'Zegt u uw contract op? Dan betaalt u geen opzegvergoeding.' Also ACM, 'Tips bij een energieleverancier kiezen' (opened 2026-11-22): 'Als u te vroeg opzegt, moet u waarschijnlijk een opzegvergoeding betalen.' Check yearly (energy law and contract rules change). Different from 006 energietarief (what vast means) and 108 voorschot. The prompt names the condition (cancelling before the end date). The dynamisch tarief is false too: ACM, 'Tips bij een energieleverancier kiezen': 'U betaalt geen opzegvergoeding als u overstapt.'


## Batch-check output

```
Checked 13 items, 13 questions. Keys: {"B":5,"A":4,"C":4}. Options: {"3":13}.
No failures, no warnings.
```
