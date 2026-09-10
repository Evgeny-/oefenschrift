import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { StudyState, Exercise, PracticeSet, ServiceStatus, Session } from './types';
export interface StudyContextValue {
  state: StudyState;
  setState: Dispatch<SetStateAction<StudyState>>;
  setting: (key: string, value: any) => void;
  updateSession: (fn: (session: Session) => Session) => void;
  saved: boolean;
  renderedAt: number;
  ready: boolean;
  api: ServiceStatus | null;
  catalogue: Exercise[];
  practiceSets: PracticeSet[];
  practiceSet?: PracticeSet;
  t: (nl: string, en: string) => string;
  name: (part: string) => string;
  itemsFor: (part: string) => Exercise[];
  go: (route: string, active?: Session) => void;
  start: (ids: string[], mode?: string) => void;
  open: (item: Exercise) => void;
  startSet: (set: PracticeSet, restart?: boolean) => void;
}
export const StudyContext = createContext<StudyContextValue>(null);
export const useStudyContext = () => useContext(StudyContext);
