// The exercise views, split by screen. This module keeps the shared entry point.
import React from 'react';
import { useStudyContext } from '../StudyContext';
import { Session } from './Session';
import { OpenSetResults } from './Results';
import { OpenExercise } from './OpenExercise';
export { Heading, Back, Clock } from './ExerciseHeader';
export { Session } from './Session';
export { Results } from './Results';
export { OpenExercise } from './OpenExercise';
export function PracticeSet() {
  const { state, catalogue } = useStudyContext(),
    a = state.active;
  const first = catalogue.find((item) => item.id === a.ids[0]);
  if (first.questions) return <Session />;
  if (a.endedAt) return <OpenSetResults />;
  return (
    <OpenExercise
      key={a.ids[a.index]}
      item={catalogue.find((item) => item.id === a.ids[a.index])}
    />
  );
}
