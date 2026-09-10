import React from 'react';
import { useStudyContext } from '../StudyContext';
import { Heading } from './ExerciseViews';
export default function Privacy() {
  const { t } = useStudyContext();
  return (
    <>
      <Heading
        title={t('Privacy in deze lokale versie', 'Privacy in this local version')}
        subtitle={t('Bijgewerkt op 10 september 2026', 'Updated 10 September 2026')}
      />
      <div className="privacy-document">
        <h2>{t('Op je apparaat', 'On your device')}</h2>
        <p>
          {t(
            'Je voortgang, concepten en transcripties die je als antwoord gebruikt, worden in deze browser bewaard. Ze verdwijnen als je de sitegegevens wist. We gebruiken geen analyse- of advertentiecookies.',
            'Your progress, drafts and transcripts used as answers are saved in this browser. Clearing site data removes them. We use no analytics or advertising cookies.',
          )}
        </p>
        <p>
          {t(
            'Cookies onthouden je taal, niveau, thema, timerinstelling en je plaats in de huidige oefenset. De server leest die om meteen de juiste pagina te tonen. Deze cookies bevatten geen antwoorden, scores of gebruikersnummer en verlopen na een jaar zonder gebruik.',
            'Cookies remember your language, level, theme, timer preference and position in the current practice set. The server reads these to render the appropriate page immediately. These cookies contain no answers, scores or learner identifier and expire after a year without use.',
          )}
        </p>
        <h2>{t('Feedback op je antwoord', 'Feedback on your answer')}</h2>
        <p>
          {t(
            'Als je op Laat nakijken klikt, sturen we de opgave en je antwoord naar OpenAI voor AI-feedback. Bij spreken gaat alleen de tekst mee die je hebt gecontroleerd. De server bewaart deze gegevens tijdelijk in het geheugen, maximaal 30 minuten, om herhaalde aanvragen te voorkomen.',
            'When you select Get feedback, the task and your answer are sent to OpenAI for AI feedback. Speaking feedback uses only the transcript you have checked. The server keeps this information in memory for up to 30 minutes to avoid repeated requests.',
          )}
        </p>
        <p>
          {t(
            'We vragen OpenAI de response niet op te slaan (store: false). Dat is geen garantie dat de aanbieder alle gegevens direct verwijdert; het eigen bewaarbeleid en de accountafspraken blijven gelden.',
            'We request that OpenAI does not store the response (store: false). This does not guarantee immediate deletion of all data by the provider; its retention policies and the account agreement still apply.',
          )}
        </p>
        <h2>{t('Je stem', 'Your voice')}</h2>
        <p>
          {t(
            'Tijdens het opnemen blijft je audio in je browser. Als je de opname stopt (of na maximaal twee minuten), sturen we die naar ElevenLabs Scribe voor Nederlandse spraakherkenning. Je vindt deze uitleg onder het informatie-icoon bij de opnameknop. We gebruiken je stem niet om je identiteit vast te stellen.',
            'Audio stays in your browser while recording. Stopping the recording, or reaching its two-minute limit, sends it to ElevenLabs Scribe for Dutch speech recognition. This is explained in the information popup beside the recording control. We do not use your voice to identify you.',
          )}
        </p>
        <p>
          {t(
            'De lokale server controleert het geluidsbestand in een tijdelijk bestand en verwijdert dat na de controle. Opnames worden niet blijvend opgeslagen. Transcripten blijven maximaal 30 minuten in het servergeheugen. ElevenLabs kan de inzending volgens zijn eigen beleid bewaren; zero-retention is voor dit account niet vastgesteld.',
            'The local server checks the audio using a temporary file and removes it after validation. Recordings are not stored permanently. Transcripts remain in server memory for up to 30 minutes. ElevenLabs may retain submissions under its own policy; zero retention has not been established for this account.',
          )}
        </p>
        <h2>{t('Opmerkingen over oefeningen', 'Exercise reports')}</h2>
        <p>
          {t(
            'Een opmerking bevat alleen het nummer en de versie van de oefening, de vraag, je gekozen categorie, je toelichting en het tijdstip. We vragen geen naam of e-mailadres en voegen je antwoord of opname niet toe. Je toelichting kan wel persoonsgegevens bevatten als je die zelf invult.',
            'A report contains the exercise ID and version, question ID, chosen category, your note and a timestamp. We do not ask for your name or email and do not attach your answer or recording. Your note can contain personal data if you include it yourself.',
          )}
        </p>
        <p>
          {t(
            'Opmerkingen staan in een lokale database buiten de websitebestanden. Ze worden niet gepubliceerd en niet automatisch naar een model gestuurd. Met het nummer bij je bevestiging kun je de beheerder vragen de opmerking te verwijderen.',
            'Reports are kept in a local database outside the website files. They are not published or automatically sent to a model. Use the receipt number to ask the local operator to remove a report.',
          )}
        </p>
        <h2>{t('Anonieme gebruiksstatistieken', 'Anonymous usage statistics')}</h2>
        <p>
          {t(
            'Om te zien welke oefeningen lastig zijn en hoeveel mensen oefenen, bewaart de server anonieme gebeurtenissen: een willekeurig browsernummer dat wij zelf niet aan een persoon kunnen koppelen, het nummer van de oefening en de vraag, de gekozen antwoordletter, of die goed was, de gekozen interfacetaal en het niveau, en het moment. Je geschreven antwoorden, transcripties en opnames maken hier nooit deel van uit. Het browsernummer staat in de opslag van deze browser; als je de sitegegevens wist, ontstaat er een nieuw nummer. Op de server wordt het alleen versleuteld bewaard.',
            'To see which exercises are hard and how many people practise, the server keeps anonymous events: a random browser number that we cannot link to a person, the exercise and question number, the chosen option letter and whether it was correct, the chosen interface language and level, and the time. Your written answers, transcripts and recordings are never part of this. The browser number lives in this browser’s storage; clearing site data creates a new one. On the server it is kept only in keyed, hashed form.',
          )}
        </p>
        <h2>{t('Gebruik van de diensten', 'Service usage')}</h2>
        <p>
          {t(
            'We bewaren per dag alleen het aantal feedback- en transcriptieaanvragen, fouten, de totale verwerkingstijd en het aantal verwerkte tokens. Deze tellingen bevatten geen antwoorden, opnames of gebruikersnummers. De beheeromgeving vraagt een gebruikersnaam en wachtwoord en gebruikt een beveiligingscookie die na twaalf uur verloopt.',
            'We store daily counts of feedback and transcription requests, failures, total processing time and processed tokens. These counts contain no answers, recordings or learner identifiers. Administration requires a user name and password and uses a security cookie that expires after twelve hours.',
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
          </a>
        </p>
        <p>
          {t(
            'Deze verklaring beschrijft de huidige lokale ontwikkelversie. Voor een openbare dienst moeten onder meer de verantwoordelijke, contactgegevens, rechtsgrond, bewaartermijnen voor meldingen en afspraken over verwerking en internationale doorgifte worden vastgesteld.',
            'This notice describes the current local development version. A public service still needs an identified controller, contact details, legal basis, report-retention periods and agreements covering processing and international transfers.',
          )}
        </p>
      </div>
    </>
  );
}
