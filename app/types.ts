export type Level = 'A2' | 'B1' | 'B2';
export type Part = 'reading' | 'listening' | 'writing' | 'speaking' | 'knm';
export type Language = 'nl' | 'en';
export type Theme = 'light' | 'dark' | 'system';
export interface Question {
  id: string;
  prompt: string;
  options: Record<string, string>;
  answer: string;
  explanation: string;
  evidence?: string;
}
export interface Exercise {
  id: string;
  title: string;
  level: Level | 'KNM';
  part: Part;
  revision: string;
  questions?: Question[];
  criteria?: [string, string][];
  prompt?: string;
  text?: string;
  transcript?: string;
  audio?: string;
  model?: string;
  [key: string]: any;
}
export interface PracticeSet {
  id: string;
  level: Level | 'KNM';
  part: Part;
  number: number;
  ids: string[];
}
export interface Session {
  ids: string[];
  mode: 'practice' | 'mock';
  level: string;
  index: number;
  answers: Record<string, string>;
  checked: Record<string, boolean>;
  startedAt: number;
  endedAt: number | null;
  elapsedSeconds?: number;
  setId?: string;
  questions?: string[];
}
export interface ExerciseRecord {
  completed: boolean;
  kind: 'quiz' | 'ai' | 'self';
  at: number;
  correct?: number;
  total?: number;
  responses?: Record<string, { selected: string; fingerprint: string }>;
}
export interface StudyState {
  version: 2;
  settings: { lang: Language; level: Level; clock: boolean; theme: Theme };
  records: Record<string, ExerciseRecord>;
  drafts: Record<string, string>;
  reviews: Record<string, boolean[]>;
  timers: Record<string, number>;
  sessions: Record<string, Session>;
  active: Session | null;
}
export interface ServiceStatus {
  feedback: boolean;
  speech?: boolean;
  reports?: boolean;
  model?: string;
}
