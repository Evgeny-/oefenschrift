# Batch 112 author notes (KNM batch E, themes 6 and 8)

13 new KNM `feit` items, all drafts, opened against their sources on 2026-11-22. All items are ordinary in tone; none is humorous. This is author work: no CEFR validation, no exam equivalence. Names come from the 112 pool (Stijn, Rana, Lieve, Willem, Hiba, Oscar, Ines, Mustafa); no name appears in more than two items. Keys: A 4, B 5, C 4 (B 38%); no key three times in a row. Yes/no items: none. Behaviour questions: none. No amounts, hours or income limits are tested.

Batch check: `npx tsx scripts/batch-check.ts content/batches/112-original.json` printed "Checked 13 items, 13 questions. Keys: {"B":5,"C":4,"A":4}. Options: {"3":13}. No failures, no warnings."

Changes to the plan:

- E4 `ozb-huiseigenaar`: the planned page lists the OZB but never says that owners pay it. I used the Rijksoverheid page on house-buying costs, which says it.
- E8 `inkomen-doorgeven`: the planned yes/no form would give two "Nee" options that differ only in their reason (the batch 032 vuurwerk problem). I asked what can happen if Ines does not report it.
- E11 `avp-niet-verplicht`: the Consumentenbond is not a government page and no Rijksoverheid or Verbond page states it plainly. The Nibud page "Kosten voor verzekeringen" states the same sentence, so it is the source; the Consumentenbond is corroboration. The reviewer may still cut this item first.
- E13 `kindpakket`: asks what a kindpakket is, to avoid the 032 jeugdfonds key.
- E12 `schoolboeken-gratis`: asks about leerboeken en werkboeken (the page's "verschillende", not "de meeste").
- Planned names Hasan, Roos, Karim, Sabrina, Sem, Julio, Fatima, De Vries were replaced by pool names.

## E1 `voedselbank` (6.1.2, key B)

- Eindterm: other instanties, such as the voedselbank. Source: <https://voedselbankennederland.nl/>, "Homepage - Vereniging van Voedselbanken Nederland": "Wij zorgen voor gezond en gratis voedsel voor iedereen die extra hulp goed kan gebruiken."
- Distractors: Het UWV regelt uitkeringen en geeft geen voedsel. De woningcorporatie verhuurt woningen en geeft geen voedsel.
- No income limits (local). The page mentions October 2026 news, so it is current. Check yearly: no.
- Tone: ordinary.

## E2 `nibud-geldzaken` (6.1.2, key C)

- Source: <https://www.nibud.nl/over-het-nibud/missie-en-impact/>, "Onze missie en impact": "Het Nibud (Nationaal Instituut voor Budgetvoorlichting) is een onafhankelijk kennis en voorlichtingsinstituut op het gebied van huishoudfinanciën."
- Distractors: de Sociale Verzekeringsbank betaalt kinderbijslag en AOW, geen voorlichting over uitgaven; de Kamer van Koophandel schrijft bedrijven in.
- No amounts. Check yearly: no. Tone: ordinary.

## E3 `gemeente-afvalheffing` (6.2.4, key A)

- Source: <https://www.rijksoverheid.nl/onderwerpen/gemeenten/vraag-en-antwoord/welke-belastingen-heft-de-gemeente> (redirects to /documenten/vraag-en-antwoord/gemeenten/...), "Welke belastingen heft de gemeente?": "De gemeente heft een aantal gemeentelijke belastingen. Per gemeente kunnen de belastingen verschillen." and "Voorbeelden van heffingen zijn de rioolheffing en de afvalstoffenheffing."
- Distractors: de Belastingdienst int landelijke belastingen, niet deze heffing (some gemeenten use a belastingsamenwerking, which is a gemeente body, not the Belastingdienst); de provincie heft haar niet.
- Check yearly: no. Tone: ordinary.

## E4 `ozb-huiseigenaar` (6.2.4, key B)

- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/huis-kopen/met-welke-kosten-krijg-ik-te-maken-als-ik-een-huis-koop>, "Met welke kosten krijg ik te maken als ik een huis koop?": "Als huiseigenaar moet u elk jaar Onroerendezaakbelasting (OZB) betalen aan uw gemeente."
- The prompt says "aan zijn gemeente". Distractors: inkomstenbelasting and btw go to the Belastingdienst, not the gemeente.
- Check yearly: no. Tone: ordinary.

## E5 `afstand-nationaliteit` (6.2.3, key C)

- Source: <https://www.rijksoverheid.nl/themas/migratie-en-reizen/nederlandse-nationaliteit/dubbele-nationaliteit>, "Dubbele nationaliteit": "Daarom moet u bij naturalisatie verplicht afstand doen van uw oorspronkelijke nationaliteit, als dat kan." The page lists the exceptions (automatic loss, impossible, married to a Dutch person, recognised refugees); the card names two.
- The prompt says "in principe". Distractors: "altijd houden" is false because the rule is to give up (exceptions are the exception, and the prompt sets "in principe"); "pas na vijf jaar" invents a term that the rule does not have.
- Check yearly: yes, a bill for a new Rijkswet op het Nederlanderschap is pending. Tone: ordinary.

## E6 `netto-loon` (6.3.1, key A)

- Source: <https://www.belastingdienst.nl/wps/wcm/connect/nl/jongeren/content/brutoloon-en-nettoloon>, "Brutoloon en nettoloon": "Nettoloon is het bedrag dat je op je rekening ontvangt." and "Wat resteert is je nettoloon."
- Distractors: B describes the brutoloon; C is what the employer pays to the overheid (belasting and premies), not the loon. Option C is the longest (52 characters against 40 for the key), so the key is not the longest.
- Near batch 006 loonheffing; different term. Check yearly: no. Tone: ordinary.

## E7 `belastinggeld` (6.3.2, key B)

- Source: <https://www.rijksoverheid.nl/themas/belastingen-uitkeringen-en-toeslagen/belastingplan/achtergrond-belastingen>, "De achtergrond van belastingen", video transcript: "Dankzij belastinggeld is er geld voor zorg, uitkeringen, onderwijs en veiligheid voor iedereen." The second video adds roads, scholen, brandweer, politie and leger.
- Distractors: "alleen leger en politie" and "alleen wegen, bruggen en stations" are false because the money also pays for zorg, uitkeringen and onderwijs. I used plausible parts of the truth instead of absurd options.
- No amounts. Check yearly: no. Tone: ordinary.

## E8 `inkomen-doorgeven` (6.3.3, key A)

- Source: <https://www.belastingdienst.nl/wps/wcm/connect/nl/werk-en-inkomen/content/mijn-inkomen-verandert-moet-ik-dat-doorgeven>, "Mijn inkomen verandert - moet ik dat doorgeven?": "Ja, als u een voorlopige aanslag of een toeslag hebt. Zo voorkomt u dat u moet terugbetalen. Of dat u juist te weinig krijgt." The key says "misschien" because not every higher income leads to a repayment.
- Distractors: "later meer toeslag" is the opposite of what a higher income does; the zorgverzekering is compulsory and does not end because of unreported income.
- No limits. Check yearly: the Toeslagen channels may change. Tone: ordinary.

## E9 `aangifte-diefstal` (6.4.1, key C)

- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/fiets/fiets-gestolen>, "Wat kan ik doen als mijn fiets is gestolen?": "Doe aangifte bij de politie als uw fiets gestolen is." politie.nl blocks automated fetching, so this page is cited.
- Distractors: the gemeente only removes weesfietsen into a depot and takes no aangifte; a fietsenwinkel takes no aangifte.
- Check yearly: no. Tone: ordinary. Easy end of the drill, as planned.

## E10 `ombudsman-gemeente` (6.5.1, key B)

- Source: <https://www.nationaleombudsman.nl/vraag-en-antwoord/ik-heb-een-klacht-over-een-gemeente>, "Ik heb een klacht over een gemeente": "Staat uw gemeente er bij? Schrijf ons dan een brief of gebruik het klachtformulier." and the two possibilities (aangesloten, or eigen klachtvoorziening). The key says "kan" and the card names the condition.
- Distractors: the Huurcommissie only judges rent disputes; the Belastingdienst does not investigate complaints about gemeenten.
- Check yearly: the list of affiliated gemeenten changes. Tone: ordinary.

## E11 `avp-niet-verplicht` (6.6.1, key A)

- Source: <https://www.nibud.nl/consumenten/aansprakelijkheidsverzekering/>, "Kosten voor verzekeringen": "Een aansprakelijkheidsverzekering is niet verplicht, maar wel verstandig om af te sluiten." Corroboration: Consumentenbond, "Is een aansprakelijkheidsverzekering verplicht?", bijgewerkt 7 juli 2026, same sentence.
- Distractors: no law makes it compulsory for every gezin; also not for homeowners (what is required for owners is the opstalverzekering, which is a different insurance, per the Nibud page). The key (41 characters) is shorter than C (48).
- Check yearly: no. Reviewer: decide whether a Nibud page is acceptable as a primary source. Tone: ordinary.

## E12 `schoolboeken-gratis` (8.3.1, key C)

- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/voortgezet-onderwijs/gratis-schoolboeken-voortgezet-onderwijs>, "Wanneer zijn schoolboeken en lesmaterialen in het voortgezet onderwijs gratis?": "Verschillende studieboeken en lesmaterialen zijn gratis voor leerlingen op het voortgezet onderwijs. De middelbare school zorgt hier voor." The list of free materials names leerboeken and werkboeken.
- Distractors: ouders pay for leer- and werkboeken: false, those are free; the gemeente does not provide them.
- Asked only about the brugklas (mbo and particulier onderwijs differ). Check yearly: no. Tone: ordinary.

## E13 `kindpakket` (8.3.2, key B)

- Source: <https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/armoedebestrijding/kan-ik-ondersteuning-voor-mijn-kinderen-krijgen>, "Kan ik ondersteuning krijgen voor mijn kind(eren)?": "Elke gemeente ondersteunt huishoudens met een laag inkomen. Bijvoorbeeld met een kindpakket." and "Er zitten bijvoorbeeld tegoedbonnen in voor kleding en zwemlessen."
- Distractors: kinderopvangtoeslag is a different regeling from the Belastingdienst, not a kindpakket; schoolboeken come from the school, not DUO.
- Local offer differs ("Per gemeente kunnen de voorwaarden en het aanbod anders zijn"); the key says "bijvoorbeeld". Check yearly: yes, the term and local offer. Tone: ordinary.
