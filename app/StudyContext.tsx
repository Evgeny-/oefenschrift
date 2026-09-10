import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { StudyState, Exercise, PracticeSet, ServiceStatus, Session, Language } from './types';
export interface StudyContextValue {
  state: StudyState;
  setState: Dispatch<SetStateAction<StudyState>>;
  setting: (key: string, value: any) => void;
  // The current page in a language: the same route with or without the /en prefix.
  pathIn: (lang: Language) => string;
  updateSession: (fn: (session: Session) => Session) => void;
  saved: boolean;
  renderedAt: number;
  ready: boolean;
  api: ServiceStatus | null;
  // Marks a service unavailable at once when a call was refused (paused: re-reads
  // /api/status too, so a service that comes back is offered again; allowance: used up
  // for today, no re-read).
  refreshApi: (unavailable?: 'feedback' | 'speech', reason?: 'paused' | 'allowance') => void;
  catalogue: Exercise[];
  practiceSets: PracticeSet[];
  practiceSet?: PracticeSet;
  t: (nl: string, en: string) => string;
  name: (part: string) => string;
  itemsFor: (part: string) => Exercise[];
  go: (route: string, active?: Session, search?: string) => void;
  start: (ids: string[], mode?: string) => void;
  open: (item: Exercise) => void;
  startSet: (set: PracticeSet, restart?: boolean) => void;
}
export const StudyContext = createContext<StudyContextValue>(null);
export const useStudyContext = () => useContext(StudyContext);
