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
  mode: 'practice' | 'mock' | 'check';
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
  // Finished level checks, newest first.
  checks: Session[];
}
export interface ServiceStatus {
  feedback: boolean;
  speech?: boolean;
  // A configured service that is switched off, paused after provider errors or over its
  // daily cap: absent for now, not never offered.
  feedbackPaused?: boolean;
  speechPaused?: boolean;
  // What this browser may still ask for today (per-pass allowance).
  remaining?: { feedback: number; speech: number };
  reports?: boolean;
  model?: string;
}
// Refusal codes from /api/feedback and /api/transcribe that mean the service is not
// offered at the moment; the interface then falls back to self-review or typing.
export const unavailableCodes = (service: 'feedback' | 'speech') =>
  ['off', 'paused', 'cap', 'unconfigured'].map((reason) => `${service}_${reason}`);
