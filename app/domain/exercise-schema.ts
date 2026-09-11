import { DOMAINS, TASK_LABELS, TASK_TYPES } from './exercise-types';

// Metadata is validated by the same contract in authoring, integration and admin drafts.
// Content-specific requirements (scripts, evidence, scaffolds and question counts) live
// in scripts/batch-validation.ts; editorial review still verifies meaning and KNM facts.
export function exerciseMetadataErrors(item: any): string[] {
  if (!item || typeof item !== 'object' || Array.isArray(item))
    return ['Exercise must be an object'];
  const errors: string[] = [];
  const fail = (message: string) => errors.push(`${item.id || '(no id)'}: ${message}`);
  const { level, part } = item;
  if (!['A2', 'B1'].includes(level)) fail('level must be A2 or B1');
  const expectedExam = part === 'knm' ? 'knm' : level === 'B1' ? 'nt2-i' : 'duo-a2';
  if (item.exam !== expectedExam) fail(`exam must be ${expectedExam}`);
  if (part === 'knm' && level !== 'A2') fail('KNM uses A2 language');
  if (Object.hasOwn(item, 'type'))
    fail('use taskType; the legacy type field is no longer accepted');
  const types: string[] | undefined =
    Object.hasOwn(TASK_TYPES, part) && ['A2', 'B1'].includes(level)
      ? TASK_TYPES[part][level]
      : undefined;
  if (!types?.includes(item.taskType))
    fail(`taskType must be one of ${types?.join(', ') || '(unknown subject)'}`);
  const labels = Object.hasOwn(TASK_LABELS, item.taskType) ? TASK_LABELS[item.taskType] : undefined;
  if (!labels?.every((label) => typeof label === 'string' && label.trim()))
    fail('taskType needs Dutch and English display labels');
  const domains = ['A2', 'B1'].includes(level) ? DOMAINS[level] : undefined;
  if (!domains?.has(item.domain)) fail(`domain must be one of ${[...(domains || [])].join(', ')}`);
  if (
    level === 'B1' &&
    ['reading', 'listening'].includes(part) &&
    !['persuasief', 'descriptief', 'instructief', 'beschouwend'].includes(item.textType)
  )
    fail('B1 reading/listening needs textType');
  if (
    ['reading', 'listening'].includes(part) &&
    !(typeof item.situation === 'string' && item.situation.trim().length >= 10)
  )
    fail('situation line missing');
  if (typeof item.title !== 'string' || !item.title.trim()) fail('title missing');
  if (!['draft', 'ai-editorially-reviewed'].includes(item.status))
    fail('status must be draft or ai-editorially-reviewed');
  if (item.targetLevelValidated !== false) fail('targetLevelValidated must be false');
  if (['writing', 'speaking'].includes(part)) {
    const rubric = `${String(level).toLowerCase()}-${part === 'writing' ? 'schrijven' : 'spreken'}`;
    if (item.rubric !== rubric) fail(`rubric must be ${rubric}`);
  }
  if (part === 'knm') {
    if (item.taskType !== 'feit') fail('new KNM exercises must use taskType feit');
    if (!Number.isInteger(item.theme) || item.theme < 1 || item.theme > 8)
      fail('KNM needs theme 1–8');
    if (typeof item.eindterm !== 'string' || !/^\d+\.\d+\.\d+$/.test(item.eindterm))
      fail('KNM needs an eindterm');
    try {
      if (new URL(item.sourceUrl).protocol !== 'https:') throw Error();
    } catch {
      fail('KNM needs a valid HTTPS sourceUrl');
    }
    if (typeof item.sourceNote !== 'string' || !item.sourceNote.trim())
      fail('KNM needs a sourceNote');
    if (
      typeof item.sourceReviewedAt !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(item.sourceReviewedAt) ||
      !Number.isFinite(Date.parse(item.sourceReviewedAt)) ||
      new Date(item.sourceReviewedAt).toISOString().slice(0, 10) !== item.sourceReviewedAt
    )
      fail('KNM needs sourceReviewedAt as YYYY-MM-DD');
  }
  return errors;
}
