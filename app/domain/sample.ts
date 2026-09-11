import type { Exercise, Question } from '../types';

export interface SampleEntry {
  item: Exercise;
  q: Question;
  key: string;
}

// A small tour of the published exercises. These answers stay on the home page;
// they do not estimate a level or contribute to saved practice results.
export function sampleQuestions(catalogue: Exercise[], level: string): SampleEntry[] {
  return ['reading', 'listening', 'knm'].flatMap((part) => {
    const candidates = catalogue
      .filter(
        (item) =>
          item.part === part &&
          (part === 'knm' || item.level === level) &&
          item.text &&
          item.questions?.length &&
          (item.taskType !== 'feit' || item.images?.some((image) => image?.file)),
      )
      .flatMap((item) => {
        const q = item.questions[0] as Question & {
          audio?: string;
          text?: string;
          duration?: number;
        };
        if (!q.options[q.answer]) return [];
        if (part === 'listening' && !(q.audio ? q.text : item.audio)) return [];
        const length =
          part === 'listening'
            ? (q.audio ? q.duration : item.duration) || (q.text || item.text).length
            : item.text.length;
        return [{ item, q, key: `${item.id}/${q.id}`, length }];
      })
      .sort((a, b) => a.length - b.length || a.key.localeCompare(b.key));
    return candidates.slice(0, 1).map(({ item, q, key }) => ({ item, q, key }));
  });
}
