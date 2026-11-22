import React from 'react';
import { ICONS } from './lucide-icons';

// One icon per list on the index and the practice page, so each row reads as a place to go,
// and one per answer on a practice card. Lucide icons (see lucide-icons.ts), drawn at the
// navigation's 1.5 stroke with round caps and joins.
export function WordIcon({ name, size = 20 }: { name: string; size?: number }) {
  const nodes = ICONS[name];
  return nodes ? (
    <svg
      className="word-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {nodes.map(([tag, attributes], i) => React.createElement(tag, { key: i, ...attributes }))}
    </svg>
  ) : null;
}
