import React from 'react';
import { useStudyContext } from '../StudyContext';
import { Heading } from './ExerciseViews';
import { ContactLink } from './Controls';
import AppLink from './AppLink';
import site from '../../content/site.json';
import {
  PREFERENCES_COOKIE,
  POSITION_COOKIE,
  PASS_COOKIE,
  OPS_COOKIE,
  STORAGE_KEY,
  VISITOR_KEY,
  SESSION_KEY,
} from '../domain/persistence';
// The privacy notice for the public service. Facts that belong to the operator (name,
// contact) come from content/site.json; everything else describes what the code does.
const rows = [
  {
    name: PREFERENCES_COOKIE,
    what: ['Taal, niveau, thema en timerinstelling', 'Language, level, theme and timer setting'],
    life: ['1 jaar', '1 year'],
  },
  {
    name: POSITION_COOKIE,
    what: ['Je plaats in de huidige oefenset', 'Your position in the current practice set'],
    life: ['1 jaar', '1 year'],
  },
  {
    name: PASS_COOKIE,
    what: [
      'Een willekeurig, ondertekend sessienummer waarmee de server het gebruik van AI-feedback en spraakherkenning per browser begrenst. Bevat geen gegevens over jou en is niet leesbaar voor scripts.',
      'A random, signed session number the server uses to limit AI feedback and speech recognition per browser. Holds no data about you and is not readable by scripts.',
    ],
    life: ['24 uur', '24 hours'],
  },
  {
    name: OPS_COOKIE,
    what: [
      'Alleen voor de beheerder na inloggen op de beheeromgeving',
      'Operator only, after signing in to the operations pages',
    ],
    life: ['6 maanden', '6 months'],
  },
];
const storage = [
  {
    name: STORAGE_KEY,
    what: [
      'Je voortgang, resultaten, concepten en transcripties (browseropslag)',
      'Your progress, results, drafts and transcripts (browser storage)',
    ],
    life: ['Tot je ze wist', 'Until you clear it'],
  },
  {
    name: VISITOR_KEY,
    what: [
      'Een willekeurig browsernummer voor de anonieme gebruiksstatistiek',
      'A random browser number for the anonymous usage statistics',
    ],
    life: ['Tot je het wist', 'Until you clear it'],
  },
  {
    name: SESSION_KEY,
    what: [
      'Telt één bezoek per browsersessie (sessieopslag)',
      'Counts one visit per browser session (session storage)',
    ],
    life: ['Tot je de browser sluit', 'Until you close the browser'],
  },
];
export default function Privacy() {
  const { t } = useStudyContext();
  const creator = site.creator?.name || null,
    email = site.creator?.email?.domain ? site.creator.email : null;
  return (
    <>
      <Heading
        title={t('Privacy', 'Privacy')}
        subtitle={t('Bijgewerkt op 11 september 2026', 'Updated 11 September 2026')}
      />
      <div className="privacy-document">
        <p>
          {t(
            'Deze site vraagt geen account en geen naam. Het meeste blijft in je eigen browser. Hieronder staat precies wat de server wél verwerkt, waarom, en hoe lang.',
            'This site asks for no account and no name. Most of what you do stays in your own browser. Below is exactly what the server does process, why, and for how long.',
          )}
        </p>
        <h2>{t('Wie is verantwoordelijk', 'Who is responsible')}</h2>
        <p>
          {creator
            ? t(
                `${creator} maakt en beheert deze site als particulier initiatief en is de verantwoordelijke voor de verwerking van je gegevens.`,
                `${creator} makes and runs this site as a personal initiative and is the controller for your data.`,
              )
            : t(
                'De maker van deze site is de verantwoordelijke voor de verwerking van je gegevens.',
                'The maker of this site is the controller for your data.',
              )}{' '}
          {email ? (
            <>
              {t('Vragen of verzoeken: ', 'Questions or requests: ')}
              <ContactLink email={email} label={t('stuur een e-mail', 'send an e-mail')} />.
            </>
          ) : (
            t(
              'Het contactadres staat onderaan elke pagina.',
              'The contact address is at the bottom of every page.',
            )
          )}
        </p>
        <h2>{t('Op je apparaat', 'On your device')}</h2>
        <p>
          {t(
            'Je voortgang, resultaten, concepten en transcripties die je als antwoord gebruikt, worden in deze browser bewaard en niet naar de server gestuurd. Op de pagina Voortgang kun je ze exporteren of wissen; het wissen van de sitegegevens in je browser verwijdert alles.',
            'Your progress, results, drafts and transcripts used as answers are saved in this browser and never sent to the server. The Progress page lets you export or delete them; clearing site data in your browser removes everything.',
          )}
        </p>
        <h2>{t('Cookies en browseropslag', 'Cookies and browser storage')}</h2>
        <p>
          {t(
            'We gebruiken geen advertentie- of trackingcookies en geen cookies van derden. De cookies hieronder zijn nodig voor de werking en de beveiliging van de site of hebben geen of nauwelijks gevolgen voor je privacy; daarom vragen we er geen toestemming voor met een cookiebanner.',
            'We use no advertising or tracking cookies and no third-party cookies. The cookies below are needed for the site to work and to stay secure, or have no or negligible privacy impact; that is why no cookie banner asks for consent.',
          )}
        </p>
        <table className="storage-table">
          <thead>
            <tr>
              <th>{t('Cookie', 'Cookie')}</th>
              <th>{t('Waarvoor', 'Purpose')}</th>
              <th>{t('Bewaartermijn', 'Lifetime')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <code>{row.name}</code>
                </td>
                <td>{t(row.what[0], row.what[1])}</td>
                <td>{t(row.life[0], row.life[1])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="storage-table">
          <thead>
            <tr>
              <th>{t('Browseropslag', 'Browser storage')}</th>
              <th>{t('Waarvoor', 'Purpose')}</th>
              <th>{t('Bewaartermijn', 'Lifetime')}</th>
            </tr>
          </thead>
          <tbody>
            {storage.map((row) => (
              <tr key={row.name}>
                <td>
                  <code>{row.name}</code>
                </td>
                <td>{t(row.what[0], row.what[1])}</td>
                <td>{t(row.life[0], row.life[1])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>{t('Feedback op je antwoord', 'Feedback on your answer')}</h2>
        <p>
          {t(
            'Als je op Laat nakijken klikt, stuurt de server de opdracht, de beoordelingspunten en je antwoordtekst naar OpenAI, dat de feedback maakt. Er gaat geen naam, browsernummer of adres mee. Bij spreken gaat alleen de tekst mee die je hebt gecontroleerd. Grondslag: je vraagt er zelf om door op de knop te drukken; zonder die knop gebeurt er niets. Je kunt je antwoord altijd zelf nakijken.',
            'When you select Get feedback, the server sends the task, its criteria and your answer text to OpenAI, which generates the feedback. No name, browser number or address goes with it. Speaking feedback uses only the transcript you have checked. Basis: you ask for it yourself by pressing the button; without it nothing is sent. You can always review an answer yourself.',
          )}
        </p>
        <p>
          {t(
            'De server bewaart het resultaat maximaal 30 minuten in het geheugen, zodat een herhaalde aanvraag of een taalwissel geen tweede verwerking nodig heeft. OpenAI gebruikt gegevens uit de API niet om modellen te trainen en kan invoer maximaal 30 dagen bewaren om misbruik te controleren; we vragen OpenAI de response niet op te slaan (store: false).',
            'The server keeps the result in memory for up to 30 minutes so a repeated request or a language switch needs no second processing. OpenAI does not use API data to train its models and may keep inputs for up to 30 days for abuse monitoring; we ask OpenAI not to store the response (store: false).',
          )}
        </p>
        <h2>{t('Je stem', 'Your voice')}</h2>
        <p>
          {t(
            'Tijdens het opnemen blijft je audio in je browser. Als je de opname stopt (of na maximaal twee minuten), stuurt de server die naar ElevenLabs voor Nederlandse spraakherkenning. Je vindt deze uitleg ook onder het informatie-icoon bij de opnameknop, en je kunt altijd typen in plaats van spreken. We gebruiken je stem niet om je identiteit vast te stellen.',
            'Audio stays in your browser while recording. Stopping the recording, or reaching its two-minute limit, sends it to ElevenLabs for Dutch speech recognition. The information icon beside the recording control explains this too, and you can always type instead of speaking. We do not use your voice to identify you.',
          )}
        </p>
        <p>
          {t(
            'De server controleert het geluidsbestand in een tijdelijk bestand en verwijdert dat meteen na de controle. Opnames worden niet opgeslagen; transcripten blijven maximaal 30 minuten in het servergeheugen. Bij ElevenLabs staat het gebruik van onze gegevens voor het trainen van modellen uit. ElevenLabs kan een inzending volgens zijn eigen beleid tijdelijk bewaren; zero retention is voor dit account niet vastgesteld.',
            'The server checks the audio in a temporary file and removes it right after validation. Recordings are not stored; transcripts remain in server memory for up to 30 minutes. At ElevenLabs the use of our data for model training is switched off. ElevenLabs may keep a submission for a while under its own policy; zero retention has not been established for this account.',
          )}
        </p>
        <h2>{t('Doorgifte buiten de EU', 'Transfers outside the EU')}</h2>
        <p>
          {t(
            'OpenAI en ElevenLabs zijn Amerikaanse bedrijven. Doorgifte gebeurt op grond van het EU-VS Data Privacy Framework waar de aanbieder daarvoor gecertificeerd is en anders van de standaardcontractbepalingen in hun verwerkersovereenkomsten. Andere ontvangers zijn er niet: de site gebruikt geen analyse- of advertentiediensten en geen andere externe diensten.',
            'OpenAI and ElevenLabs are US companies. Transfers rely on the EU-US Data Privacy Framework where the provider is certified and otherwise on the standard contractual clauses in their data processing agreements. There are no other recipients: the site uses no analytics or advertising services and no other external services.',
          )}
        </p>
        <h2>{t('Opmerkingen over oefeningen', 'Exercise reports')}</h2>
        <p>
          {t(
            'Een opmerking bevat alleen het nummer en de versie van de oefening, de vraag, je gekozen categorie, je toelichting en het tijdstip. We vragen geen naam of e-mailadres en voegen je antwoord of opname niet toe. Schrijf geen persoonsgegevens in je toelichting; wat je invult, staat in een database die alleen de beheerder ziet. Met het nummer bij je bevestiging kun je vragen de opmerking te verwijderen. Afgehandelde opmerkingen worden uiterlijk een jaar na de melding verwijderd.',
            'A report contains only the exercise ID and version, question ID, chosen category, your note and a timestamp. We do not ask for your name or e-mail and do not attach your answer or recording. Do not put personal data in your note; what you write is kept in a database only the operator sees. Use the receipt number to ask for a report to be removed. Resolved reports are deleted no later than a year after they were filed.',
          )}
        </p>
        <h2>{t('Anonieme gebruiksstatistiek', 'Anonymous usage statistics')}</h2>
        <p>
          {t(
            'Om te zien welke oefeningen lastig zijn en hoeveel mensen oefenen, bewaart de server anonieme gebeurtenissen: een willekeurig browsernummer dat wij niet aan een persoon kunnen koppelen, het nummer van de oefening en de vraag, de gekozen antwoordletter en of die goed was, de interfacetaal, het niveau en het moment. Je geschreven antwoorden, transcripties en opnames maken hier nooit deel van uit. Op de server staat het browsernummer alleen versleuteld; de gebeurtenissen worden na 90 dagen verwijderd.',
            'To see which exercises are hard and how many people practise, the server keeps anonymous events: a random browser number we cannot link to a person, the exercise and question number, the chosen option letter and whether it was correct, the interface language, the level and the time. Your written answers, transcripts and recordings are never part of this. On the server the browser number is kept only in keyed, hashed form; the events are deleted after 90 days.',
          )}
        </p>
        <h2>{t('Beveiliging en misbruik', 'Security and abuse')}</h2>
        <p>
          {t(
            'Om misbruik van de betaalde diensten te voorkomen telt de server per netwerkadres en per sessienummer hoeveel aanvragen er in de laatste minuut, het laatste uur en de laatste dag zijn gedaan. Die tellingen staan alleen in het geheugen van de server, ongeveer een dag, en worden niet opgeslagen of gedeeld. Per dag bewaart de server verder alleen aantallen: hoeveel feedback- en transcriptieaanvragen er waren, hoeveel er mislukten en hoeveel tekst-tokens er zijn verwerkt. Foutmeldingen in het serverlogboek bevatten geen antwoorden, opnames of adressen.',
            'To prevent abuse of the paid services, the server counts per network address and per session number how many requests were made in the last minute, hour and day. Those counts live only in the server’s memory, for about a day, and are neither stored nor shared. Per day the server keeps only totals: how many feedback and transcription requests there were, how many failed and how many text tokens were processed. Error messages in the server log contain no answers, recordings or addresses.',
          )}
        </p>
        <h2>{t('Automatische verwerking en AI', 'Automated processing and AI')}</h2>
        <p>
          {t(
            'De feedback op schrijf- en spreekopdrachten wordt gemaakt door een AI-model en de transcriptie door spraakherkenning. Ze zijn hulp bij het oefenen: geen beoordeling door een persoon, geen examenuitslag en geen voorspelling of je slaagt. Ze kunnen fouten maken. De site neemt geen besluiten over jou en er is niets dat rechtsgevolgen voor je heeft; je kunt de AI-feedback altijd negeren en zelf nakijken, en fouten melden via Meld een probleem.',
            'Feedback on writing and speaking tasks is generated by an AI model and transcripts by speech recognition. They are aids for practice: not an assessment by a person, not an exam result and not a prediction of passing. They can make mistakes. The site takes no decisions about you and nothing here has legal effect for you; you can always ignore the AI feedback, review yourself, and report mistakes through Report a problem.',
          )}
        </p>
        <h2>{t('Je rechten', 'Your rights')}</h2>
        <p>
          {t(
            'Je hebt recht op inzage, correctie en verwijdering van je gegevens en je kunt bezwaar maken tegen een verwerking. Omdat de server geen gegevens bewaart die aan jou gekoppeld zijn, kun je het meeste zelf doen: wis de sitegegevens in je browser. Voor een opmerking gebruik je het nummer bij je bevestiging. Neem contact op via het adres onderaan de pagina; je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.',
            'You have the right to access, correct and erase your data and to object to a processing. Because the server keeps nothing linked to you, you can do most of it yourself: clear the site data in your browser. For a report, use the receipt number. Contact us through the address at the bottom of the page; you can also complain to the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).',
          )}
        </p>
        <p>
          {t(
            'Deze site is bedoeld voor volwassenen die inburgeren en richt zich niet op kinderen.',
            'This site is meant for adults preparing for the integration exams and is not aimed at children.',
          )}
        </p>
        <h2>{t('Aanbieders en verdere informatie', 'Providers and further information')}</h2>
        <p>
          <a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noreferrer">
            OpenAI privacy policy
          </a>{' '}
          ·{' '}
          <a href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noreferrer">
            ElevenLabs privacy policy
          </a>{' '}
          ·{' '}
          <a href="https://www.autoriteitpersoonsgegevens.nl/" target="_blank" rel="noreferrer">
            Autoriteit Persoonsgegevens
          </a>{' '}
          · <AppLink to="terms">{t('Gebruiksvoorwaarden', 'Terms of use')}</AppLink>
        </p>
        <p>
          {t(
            'Wijzigingen in deze verklaring staan op deze pagina, met de datum bovenaan.',
            'Changes to this notice appear on this page, with the date at the top.',
          )}
        </p>
      </div>
    </>
  );
}
