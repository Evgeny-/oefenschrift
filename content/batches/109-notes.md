# Batch 109 author notes (KNM batch B)

Thirteen new KNM facts for themes 1 and 4, written from pages opened on 2026-11-22 (curl, all returned HTTP 200). Author work, not CEFR validation and not exam equivalence. Every item is `draft`, `targetLevelValidated: false`, ordinary in tone (no humour), with no media or derived fields. Name pool: Iris, Mohammed, Sanne, Bilal, Esther, Kofi, Mariam, Thijs (none used more than twice). Recurring people keep their three visual traits in both pictures (Sanne, Thijs, Kofi, Iris, Bilal). There are no yes/no questions. No behaviour questions: every prompt asks who, where, how often or what.

Keys in batch order: B A C A B C A C B A B B A. Counts: A 5 (38%), B 5 (38%), C 3 (23%). No letter three times in a row. Option lengths: the key is never the longest (nota-zorgverlener is 22 against 23, the closest case).

Batch check: `npx tsx scripts/batch-check.ts content/batches/109-original.json` gives "Checked 13 items, 13 questions. Keys: {B:5, A:5, C:3}. Options: {3:13}. No failures, no warnings." (An earlier run warned that the tandarts-controle options differed a lot in length; the short option was lengthened.)

No planned fact was replaced. Three wordings were changed to match what the page says (zzp-pensioen, ww-premie-werkgever, dossier-online); see those items.

## Per item

### 1. vakbond-cao (theme 1, 1.2.2, key B, check: stable)
- Eindterm: werknemersparticipatie (OR, personeelsvereniging, vakbond).
- Source: Rijksoverheid, "Wat is een cao?" (opened 2026-11-22): "Een cao wordt afgesloten door 1 of meer werkgevers, 1 of meer werkgeversorganisaties en 1 of meer werknemersorganisaties (meestal vakbonden)."
- Question: which organisations conclude the cao for the employees. Options: ondernemingsraad, vakbonden, UWV.
- Distractors: the ondernemingsraad is a body inside one company and is not a cao party; the UWV pays benefits and is no party. Both are false.
- The phrase "praten namens de werknemers mee" is a plain paraphrase of "werknemersorganisaties". Not a repeat of 006 cao (what is a cao).

### 2. ww-premie-werkgever (theme 1, 1.2.3, key A, P2, check yearly: low)
- Eindterm: the employer pays premiums and taxes (loonheffing).
- Sources: Belastingdienst, "Hoe betaalt u mee aan de premies werknemersverzekeringen?" (opened 2026-11-22): "De regel is dat uw werkgever of uitkeringsinstantie de premies werknemersverzekeringen betaalt. Hierop is 1 uitzondering: u betaalt misschien mee aan de gedifferentieerde premie Werkhervattingkas (Whk)." The page does not name the WW; the Belastingdienst page "Werknemersverzekeringen" (opened the same day) lists the Werkloosheidswet (WW) as one of them, so the question asks about the WW premium.
- The prompt says "volgens de regel" because of the one exception. The Whk premium is not the WW premium and stays out of the card.
- Distractors: "Mohammed zelf" is false under the rule; "het UWV" pays the WW benefit, not an employee's premium.
- Close to 006 loonheffing; cut first if the bank must shrink.

### 3. discriminatie-vakbond (theme 1, 1.3.1, key C)
- Eindterm: discrimination at work is forbidden; where to get help.
- Source: Rijksoverheid, "Wat kan ik doen als ik ongelijk behandeld word bij een sollicitatie of op het werk?" (opened 2026-11-22): "juridisch advies inwinnen, bijvoorbeeld bij het Juridisch Loket of bij uw vakbond".
- The card says "vragen" for "inwinnen". The key is the vakbond; the Juridisch Loket is on the card but not an option. Antidiscriminatiebureau and meldpunt are not used (003 discriminatie covers them).
- Distractors: the Belastingdienst and the Kamer van Koophandel give no legal advice on discrimination; both are false.

### 4. zzp-pensioen (theme 1, 1.4.1, key A, check yearly)
- Eindterm: conditions to start a business (pension, AOV).
- Source: Rijksoverheid, page on zzp-pensioen (opened 2026-11-22): "Als zzp'er heeft u recht op AOW als u de AOW-leeftijd bereikt. U kunt daarnaast zelf uw oudedagsvoorziening aanvullen." The page also names the lijfrente.
- The plan said "must arrange"; the page says "kunt", so the card and prompt say "kan zelf regelen" / "Wie regelt". A few professions have a compulsory beroepspensioen; even then the zzp'er takes part himself and no opdrachtgever arranges it, so "Zij zelf" holds.
- Distractors: "haar opdrachtgever" (not an employer, no duty), "de gemeente" (no role). Both false.
- Check yearly: the mandatory AOV (about 2030) and the Zelfstandigenwet are in progress and are not tested.

### 5. huisarts-rekening (theme 4, 4.4.2, key B)
- Eindterm: zorgkosten declareren (bills for care).
- Sources: Rijksoverheid, "Wordt het bezoek aan de huisarts vermeld op mijn zorgnota?" (huisartskosten op zorgnota, opened 2026-11-22): "Uw zorgverzekeraar betaalt rechtstreeks de rekening van uw huisarts." and "Zorgnota controleren" (opened the same day): "Een zorgverlener stuurt een rekening meestal rechtstreeks naar uw zorgverzekeraar."
- Asks who receives the bill, not the eigen risico (006 eigenrisico).
- Distractors: the bill goes to Kofi at home, or to the gemeente. Both are false for a huisarts visit.

### 6. nota-zorgverlener (theme 4, 4.4.2, key C)
- Eindterm: as item 5. The page speaks of rekeningen, not declareren; the eindterm is covered through handling of bills.
- Source: Rijksoverheid, "Zorgnota controleren" (opened 2026-11-22): "Heeft u een vraag over een rekening die u direct ontvangen heeft van de zorgverlener? Dan kunt u met uw vragen terecht bij de zorgverlener." Also: "Heeft u vragen over een zorgnota in 'mijn omgeving' van uw zorgverzekeraar? Dan kunt u met vragen over die rekening terecht bij uw zorgverzekeraar."
- The zorgverzekeraar is not an option, because it is the answer for the other kind of bill and so would be arguably right. The key repeats "fysiotherapeut" from the prompt; this is unavoidable when the question is who sent the bill. Doubt for the reviewer.
- Distractors: gemeente and Belastingdienst do not handle care bills. Not a repeat of 006 zorgnota.

### 7. drogist-zonder-recept (theme 4, 4.1.2, key A)
- Eindterm: apotheek (recept) and drogist (zonder recept).
- Source: Rijksoverheid, "Waar kan ik medicijnen kopen?" (opened 2026-11-22): "Receptmedicijnen kunt u alleen bij een apotheek kopen. Voor zelfzorgmedicijnen heeft u geen recept nodig. Deze zijn ook bij de drogist of andere winkels te koop."
- Some zelfzorgmedicijnen (group UA) are sold only at the apotheek; the card says "ook bij de drogist", and no statement conflicts. The apotheek is not an option, so no option is also true.
- Distractors: consultatiebureau and tandarts do not sell medicines. Not a repeat of 006 receptmedicijnen.

### 8. tandarts-controle (theme 4, 4.1.3, key C)
- Eindterm: tandarts and regular visits.
- Source: Thuisarts (NHG), "Ik wil mijn tanden goed verzorgen" (opened 2026-11-22, text revised 14 April 2026): "Ga elk jaar 1 of 2 keer naar de tandarts voor controle. Ook als je een kunstgebit hebt." The card changes "je" to "u". Thuisarts is run by the Nederlands Huisartsen Genootschap, a responsible professional body; I found no government page with this advice.
- The prompt names Thuisarts, so the question tests the advice and not a rule.
- Distractors: every month and once in five years are not the advice; both false. Fills the "regelmatig bezoek" part that 019 tandartskeuze left out.

### 9. ggz-doorverwijzing (theme 4, 4.2.1, key B, P2)
- Eindterm: the huisarts refers to a specialist or the ggz.
- Source: Rijksoverheid, "Psychische hulp: huisarts of ggz" (opened 2026-11-22): "De huisarts ... kan mensen met matige tot zware psychische problemen doorverwijzen naar zorgaanbieders binnen de ggz."
- Others (a bedrijfsarts, a medisch specialist) can refer in practice; neither is an option.
- Distractors: a werkgever and a zorgverzekeraar cannot refer to the ggz; both false. Close to 006 verwijsbrief; cut if the bank must shrink.

### 10. spoed-huisartsenpost-eerst (theme 4, 4.3.1, key A)
- Eindterm: huisartsenpost in the evening and weekend.
- Source: Rijksoverheid, "Huisartsenpost en spoedeisende hulp" (opened 2026-11-22): "Neem altijd eerst contact op met uw huisartsenpost voordat u naar de spoedeisende hulppost gaat. Behalve bij een levensbedreigende situatie. Dan kunt u het beste direct 112 bellen."
- Condition rule: the prompt gives the condition (no danger, Saturday) and asks who comes first. The change of 1 January 2027 in how the SEH bill looks is not used.
- Distractors: 112 is false without danger; going to the spoedeisende hulp first is false by the same page.

### 11. dossier-online (theme 4, 4.4.3, key B, P2)
- Eindterm: the administrative side of care is digital.
- Source: Rijksoverheid, "Mag ik mijn medisch dossier inzien?" (opened 2026-11-22): "U kunt uw medisch dossier (online) inzien." and "online in uw persoonlijke gezondheidsomgeving (PGO); bij uw arts of zorginstelling."
- "Patientenportaal" is not on the page, so I did not use it. The card explains PGO in plain words ("een eigen website of app"). PGO is the tested term, so it appears once in the option as "persoonlijke gezondheidsomgeving". Doubt for the reviewer: it is the hardest word of the batch.
- Distractors: the Belastingdienst and the gemeente hold no medical files; both false. Cut if the bank must shrink.

### 12. toeslagen-servicepunt (theme 4, 4.4.4, key B)
- Eindterm: DigiD for applying and declaring; help with care arrangements.
- Source: Dienst Toeslagen (Belastingdienst), "Hulp bij toeslagen zoeken" (opened 2026-11-22): "U kunt ook bij de hulppunten terecht als u het bijvoorbeeld moeilijk vindt om uw toeslagen met DigiD te regelen." The page lists the help for zorgtoeslag, huurtoeslag, kinderopvangtoeslag and kindgebonden budget and links "Vind een toeslagenservicepunt".
- The library is not named (019 informatiepunt keys it).
- Distractors: the UWV and the Sociale Verzekeringsbank give no help with toeslagen; both false. The Belastingdienst is not used as a distractor, because Dienst Toeslagen belongs to it.

### 13. schuldhulp-gemeente (theme 4, 4.5.1, key A)
- Eindterm: welzijnsvoorzieningen via the gemeenteloket or wijkteam.
- Source: Rijksoverheid, "Hoe vraag ik schuldhulpverlening aan?" (opened 2026-11-22): "Voor hulp bij uw schulden kunt u zich melden bij uw gemeente. U kunt daar terecht voor een advies of een aanvraag voor schuldbemiddeling of schuldsanering."
- The card leaves out schuldbemiddeling and schuldsanering. Overlaps 006 wmo (key de gemeente): here the topic is debt, the key letter differs and the distractors are new.
- Distractors: huisarts and woningcorporatie offer no debt help; both false.

## Check yearly

zzp-pensioen (AOV, Zelfstandigenwet). Low risk: ww-premie-werkgever (Whk rules), spoed-huisartsenpost-eerst (SEH billing change from 2027, not tested). No amounts or dates are tested.

## Doubts for the reviewer

- 6: key repeats a prompt word; the zorgverzekeraar is left out on purpose.
- 11: "persoonlijke gezondheidsomgeving" is hard.
- 8: only Thuisarts (not a government page) states the advice.
- 2 and 9 and 11 are P2 (cut first).
