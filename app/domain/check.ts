import type { Exercise, Session, StudyState } from '../types';
import { CHECK_PARTS, flatten, startSession } from './study';
// The level check: ten questions across reading and listening at one level — the two
// language skills that can be scored from an answer key. KNM is knowledge, not a level,
// and writing and speaking need feedback, so they stay out.
export const checkPlan = [
  { part: 'reading', items: 3, questions: 5 },
  { part: 'listening', items: 3, questions: 5 },
];
const MIN_QUESTIONS = 4;
function shuffle<T>(list: T[], random: () => number) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
export function checkPool(catalogue: Exercise[], level: string, part: string) {
  return catalogue.filter(
    (item) => item.part === part && item.level === level && item.questions?.length,
  );
}
// What the check would contain at this level: the plan clipped to the content that exists.
export function checkAvailability(catalogue: Exercise[], level: string) {
  const parts = checkPlan
    .map((entry) => {
      const pool = checkPool(catalogue, level, entry.part),
        items = Math.min(entry.items, pool.length),
        questions = Math.min(
          entry.questions,
          [...pool]
            .sort((a, b) => b.questions.length - a.questions.length)
            .slice(0, items)
            .reduce((sum, item) => sum + item.questions.length, 0),
        );
      return { part: entry.part, items, questions };
    })
    .filter((entry) => entry.questions > 0);
  const total = parts.reduce((sum, entry) => sum + entry.questions, 0);
  return { parts, total, enough: total >= MIN_QUESTIONS };
}
// Draw the items and questions. Exercises this browser has not completed come first,
// so a repeat sees fresh material; the questions of an item keep their order.
export function drawCheck(
  catalogue: Exercise[],
  level: string,
  records: StudyState['records'],
  random: () => number = Math.random,
) {
  const ids: string[] = [],
    questions: string[] = [];
  for (const entry of checkPlan) {
    const pool = checkPool(catalogue, level, entry.part),
      unseen = shuffle(
        pool.filter((item) => !records[item.id]?.completed),
        random,
      ),
      seen = shuffle(
        pool.filter((item) => records[item.id]?.completed),
        random,
      ),
      picked = [...unseen, ...seen].slice(0, entry.items);
    let wanted = entry.questions;
    picked.forEach((item, i) => {
      const share = Math.min(item.questions.length, Math.ceil(wanted / (picked.length - i)));
      if (!share) return;
      const chosen = new Set(shuffle(item.questions, random).slice(0, share));
      ids.push(item.id);
      questions.push(
        ...item.questions.filter((q) => chosen.has(q)).map((q) => `${item.id}/${q.id}`),
      );
      wanted -= share;
    });
  }
  return questions.length >= MIN_QUESTIONS ? { ids, questions } : null;
}
export function startCheck(
  catalogue: Exercise[],
  level: string,
  records: StudyState['records'],
  now = Date.now(),
  random: () => number = Math.random,
): Session | null {
  const draw = drawCheck(catalogue, level, records, random);
  if (!draw) return null;
  return startSession(draw.ids, 'check', catalogue, now, draw.questions);
}
export function checkInProgress(state: StudyState) {
  const a = state.active;
  return a?.mode === 'check' && !a.endedAt ? a : null;
}
export function latestCheck(state: StudyState, level: string, startedAt?: number) {
  const checks = (state.checks || []).filter((check) => check.level === level);
  return (startedAt && checks.find((check) => check.startedAt === startedAt)) || checks[0] || null;
}
// Counts per subject and the one to start with: the lowest share of correct answers,
// ties broken by the fewest correct. Never a verdict, only where to begin.
export function checkSummary(session: Session, catalogue: Exercise[]) {
  const questions = flatten(session, catalogue),
    right = (x) => x.q.answer === session.answers[x.key];
  const parts = CHECK_PARTS.map((part) => {
    const qs = questions.filter((x) => x.item.part === part);
    return { part, total: qs.length, correct: qs.filter(right).length };
  }).filter((entry) => entry.total > 0);
  const order = [...parts].sort(
    (a, b) => a.correct / a.total - b.correct / b.total || a.correct - b.correct,
  );
  const weakest = order.find((entry) => entry.correct < entry.total) || null,
    second = order.find((entry) => entry !== weakest && entry.correct < entry.total) || null;
  return {
    total: questions.length,
    correct: questions.filter(right).length,
    parts,
    weakest,
    second,
    missed: questions.filter((x) => !right(x)),
    questions,
  };
}
