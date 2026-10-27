import { useStudyContext } from '../StudyContext';
import { Heading } from './ExerciseHeader';
import AppLink from './AppLink';

export default function A1PracticeOnly({ title }) {
  const { t } = useStudyContext();
  return (
    <>
      <Heading
        title={title}
        subtitle={t(
          'Voor A1 kun je lezen, luisteren, schrijven en spreken oefenen.',
          'A1 offers short reading, listening, writing and speaking exercises.',
        )}
      />
      <p className="note">
        {t(
          'Een proefexamen en een niveaucheck zijn voor A1 niet beschikbaar.',
          'A practice test and level check are unavailable for A1.',
        )}
      </p>
      <div className="actions">
        <AppLink className="primary" to="reading">
          {t('Naar Lezen A1', 'Go to A1 Reading')}
        </AppLink>
        <AppLink className="secondary" to="listening">
          {t('Naar Luisteren A1', 'Go to A1 Listening')}
        </AppLink>
      </div>
    </>
  );
}
