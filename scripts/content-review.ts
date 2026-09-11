// Historical reviews used both ID-keyed objects and arrays. Preserve those
// audit records while interpreting their explicit passing verdicts consistently.
const PASSING_VERDICTS = new Set([
  'pass',
  'pass (edited)',
  'pass (after edit)',
  'pass (prompt edited)',
  'pass (domain edited)',
]);

export function itemPassedReview(review: any, id: string): boolean {
  const items = review.items;
  const entry = Array.isArray(items)
    ? items.find((item) => item?.id === id)
    : items && typeof items === 'object' && Object.hasOwn(items, id)
      ? items[id]
      : undefined;
  return PASSING_VERDICTS.has(entry?.verdict);
}
