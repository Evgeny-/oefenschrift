import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const legacy = new Set<string>(
  JSON.parse(readFileSync('content/reviews/legacy-source-approvals.json', 'utf8')).sources.map(
    (source: any) => source.source_sha256,
  ),
);
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const meaningful = (value: unknown) => typeof value === 'string' && value.trim().length >= 15;

// Deliberately exclude questions, answers, models, success criteria and author
// explanations. Reviewers must establish that the source works on its own.
export function meaningPacket(items: any[]): Record<string, any>[] {
  return items.map((item) => ({
    ...Object.fromEntries(
      [
        'id',
        'level',
        'part',
        'title',
        'situation',
        'intro',
        'text',
        'script',
        'prompt',
        'images',
        'imageBrief',
        'imageAlt',
        'cue',
        'scaffold',
        'formFields',
        'table',
        'opening',
      ]
        .filter((key) => item[key] !== undefined)
        .map((key) => [key, item[key]]),
    ),
    ...(item.questions?.some((question: any) => question.script?.length)
      ? {
          fragments: item.questions
            .filter((question: any) => question.script?.length)
            .map((question: any) => ({
              id: question.id,
              script: question.script,
              text: question.text,
            })),
        }
      : {}),
    ...(item.part === 'knm'
      ? {
          prompts: (item.questions || []).map((question: any) => ({
            id: question.id,
            prompt: question.prompt,
          })),
        }
      : {}),
  }));
}
export const meaningPacketHash = (items: any[]) =>
  digest(JSON.stringify(meaningPacket(items), null, 2) + '\n');

export function meaningReviewErrors(review: any, items: any[], allowLegacy = true): string[] {
  if (allowLegacy && legacy.has(review.source_sha256) && !review.review_contract_version) return [];
  const errors: string[] = [];
  if (review.review_contract_version !== 2)
    errors.push('meaning-first review contract version 2 required');
  const first = review.meaning_first;
  if (
    first?.verdict !== 'pass' ||
    first?.review_order !== 'source-before-questions' ||
    first?.packet_sha256 !== meaningPacketHash(items) ||
    !meaningful(first?.independence_note)
  )
    errors.push('passing source-first review with the exact blind-packet hash required');
  let ordinary = 0;
  let humorous = 0;
  const seenEvidence = new Map<string, string>();
  for (const item of items) {
    const entry = Array.isArray(review.items)
      ? review.items.find((record: any) => record?.id === item.id)
      : review.items?.[item.id];
    const meaning = entry?.meaning;
    const tag = item.id;
    if (meaning?.tone === 'ordinary') ordinary++;
    else if (meaning?.tone === 'light-humor') humorous++;
    else errors.push(`${tag}: classify the source as ordinary or light-humor`);
    if (
      meaning?.verdict !== 'pass' ||
      !Number.isInteger(meaning?.coherence_rating) ||
      meaning.coherence_rating < 4 ||
      meaning.coherence_rating > 5
    )
      errors.push(`${tag}: meaning or coherence has not passed`);
    for (const field of ['situation_summary', 'communicative_purpose', 'contrivance_check']) {
      const value = meaning?.[field];
      if (!meaningful(value)) errors.push(`${tag}: specific ${field} evidence required`);
      else {
        const token = `${field}:${value.trim().toLowerCase().replace(/\s+/g, ' ')}`;
        const previous = seenEvidence.get(token);
        if (previous)
          errors.push(`${tag}: ${field} repeats ${previous}; give item-specific evidence`);
        else seenEvidence.set(token, tag);
      }
    }
    if (!Array.isArray(meaning?.unsupported_assumptions) || meaning.unsupported_assumptions.length)
      errors.push(`${tag}: unresolved invented context or assumptions`);
    const turns = item.script?.length
      ? item.script
      : (item.questions || []).flatMap((question: any) =>
          (question.script || []).map((turn: any) => ({ ...turn, fragment: question.id })),
        );
    if (turns.length) {
      const links = meaning?.turn_links;
      if (
        !Array.isArray(links) ||
        links.length !== turns.length ||
        turns.some(
          (turn: any, index: number) =>
            links[index]?.turn !== index + 1 ||
            links[index]?.quote !== turn.text ||
            (turn.fragment && links[index]?.fragment !== turn.fragment) ||
            !meaningful(links[index]?.response_function),
        )
      )
        errors.push(`${tag}: every exact dialogue turn needs its conversational function checked`);
    }
    if (!item.questions?.length && !meaningful(meaning?.medium_and_recipient_check))
      errors.push(`${tag}: explain why this person would use this medium and recipient`);
  }
  const balance = review.tone_balance;
  if (
    balance?.ordinary !== ordinary ||
    balance?.light_humor !== humorous ||
    balance?.target_share !== 0.15 ||
    !meaningful(balance?.scope_note)
  )
    errors.push('tone balance must count the reviewed items and explain the 15% program target');
  // Round up for small batches; the coordinator also checks the combined program.
  if (humorous > Math.ceil(items.length * 0.15))
    errors.push(
      'too many humorous items: keep the material mostly ordinary, around 15% light humor',
    );
  return errors;
}
