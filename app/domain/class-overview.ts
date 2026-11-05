// The class overview in teacher mode. Kept apart from the profile registry, which the early
// theme script also reads and which must not pull in the study code.
import type { Exercise, Part, StudyState } from '../types';
import { mistakes } from './study';

// One row of the class overview: completed exercises at the learner's level, the share of
// closed questions answered correctly, mistakes still to review and the last activity.
export const OVERVIEW_PARTS: Part[] = ['reading', 'listening', 'writing', 'speaking', 'knm'];
export interface PartSummary {
  done: number;
  total: number;
  score: number | null;
}
export function profileSummary(state: StudyState, catalogue: Exercise[]) {
  const level = state.settings.level,
    parts = {} as Record<Part, PartSummary>;
  let toReview = 0,
    last = 0;
  for (const part of OVERVIEW_PARTS) {
    const items = catalogue.filter(
      (item) => item.part === part && (part === 'knm' || item.level === level),
    );
    let done = 0,
      correct = 0,
      asked = 0;
    for (const item of items) {
      const record = state.records[item.id];
      if (!record?.completed) continue;
      done++;
      last = Math.max(last, record.at || 0);
      if (record.kind === 'quiz' && record.total) {
        correct += record.correct || 0;
        asked += record.total;
      }
      if (mistakes(item, record).length) toReview++;
    }
    parts[part] = {
      done,
      total: items.length,
      score: asked ? Math.round((100 * correct) / asked) : null,
    };
  }
  for (const session of [
    state.active,
    ...Object.values(state.sessions || {}),
    ...(state.checks || []),
  ])
    if (session) last = Math.max(last, session.endedAt || session.startedAt || 0);
  return { level, parts, toReview, last };
}
