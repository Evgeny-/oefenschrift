import React from 'react';

// Line icons for the word lists, drawn like the navigation icons (24-unit grid, 1.5 stroke,
// round caps and joins): one per list on the index and the practice page, so each row reads
// as a place to go. Kinds of words show what the kind does (an arrow for a verb, a box for a
// thing, a link for a conjunction); themes show their setting.
const glyphs: Record<string, React.ReactNode> = {
  // Two cards, the front one ticked: practising with cards.
  practice: (
    <>
      <rect x="4" y="7" width="11" height="13" rx="1.8" />
      <path d="M8.5 4h9.7A1.8 1.8 0 0 1 20 5.8v10" />
      <path d="M7.2 13.6l2.2 2.2 3.4-4" />
    </>
  ),
  // A ranked list: the longest line first.
  top: (
    <>
      <path d="M9.5 6.5H20M9.5 12h7.5M9.5 17.5h4.5" />
      <circle cx="5.5" cy="6.5" r="1.1" fill="currentColor" />
      <circle cx="5.5" cy="12" r="1.1" fill="currentColor" />
      <circle cx="5.5" cy="17.5" r="1.1" fill="currentColor" />
    </>
  ),
  'my-list': (
    <path d="M7 3.75h10a1.25 1.25 0 0 1 1.25 1.25v15.25L12 16.5l-6.25 3.75V5A1.25 1.25 0 0 1 7 3.75z" />
  ),
  review: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 4.5v4h-4" />
    </>
  ),
  mistakes: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
    </>
  ),
  'regular-verbs': <path d="M4 12h15M14 7l5 5-5 5" />,
  'irregular-verbs': <path d="M3.5 15l4-6 4 6 4-6M15.5 9h4v4" />,
  nouns: (
    <>
      <path d="M12 3.8l7.5 4v8.4L12 20.2l-7.5-4V7.8z" />
      <path d="M4.5 7.8L12 12l7.5-4.2M12 12v8.2" />
    </>
  ),
  adjectives: (
    <>
      <path d="M4 12.6V5.4A1.4 1.4 0 0 1 5.4 4h7.2L20 11.4 11.4 20z" />
      <circle cx="8.5" cy="8.5" r="1.4" />
    </>
  ),
  adverbs: <path d="M3.5 12c2.1-4.5 4.2-4.5 6.3 0s4.2 4.5 6.3 0 2.8-3 4.4-1.5" />,
  'small-words': (
    <>
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8l-4.5 3.5v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.2" />
    </>
  ),
  prepositions: (
    <>
      <rect x="4.5" y="12.5" width="15" height="7" rx="1.5" />
      <circle cx="12" cy="7.5" r="2.6" />
    </>
  ),
  conjunctions: (
    <>
      <path d="M10 14l4-4" />
      <path d="M8.6 11.4l-1.9 1.9a3.1 3.1 0 0 0 4.4 4.4l1.9-1.9" />
      <path d="M15.4 12.6l1.9-1.9a3.1 3.1 0 0 0-4.4-4.4l-1.9 1.9" />
    </>
  ),
  pronouns: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  'question-words': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6M12 16.8h.01" />
    </>
  ),
  numbers: <path d="M9.5 4L8 20M16 4l-1.5 16M5 9h15M4 15h15" />,
  time: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  greetings: (
    <>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4 3.5V16h-.5A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M9 10.5a3.5 3.5 0 0 0 6 0" />
    </>
  ),
  housing: (
    <>
      <path d="M4 11l8-6.5 8 6.5" />
      <path d="M6.2 9.4V19.5h11.6V9.4M10 19.5v-5h4v5" />
    </>
  ),
  work: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
    </>
  ),
  health: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  municipality: (
    <path d="M4 9.5L12 5l8 4.5M4.5 19.5h15M6.5 11v6.5M10.2 11v6.5M13.8 11v6.5M17.5 11v6.5" />
  ),
  shopping: (
    <>
      <path d="M5.5 8.5h13l-1 11h-11z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </>
  ),
  transport: (
    <>
      <circle cx="6.5" cy="15.5" r="3.5" />
      <circle cx="17.5" cy="15.5" r="3.5" />
      <path d="M6.5 15.5L10 9.5h5.5l2 6M10 9.5l2.5 6H6.5M14 7h2.5" />
    </>
  ),
  school: (
    <>
      <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.5v4c1.6 1.4 3.5 2 5.5 2s3.9-.6 5.5-2v-4M21.5 9.5v5" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="8.5" r="2.8" />
      <circle cx="16.5" cy="10" r="2.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0M14.5 15.4a4 4 0 0 1 6 4.1" />
    </>
  ),
  food: (
    <>
      <path d="M7 4v5.5a2 2 0 0 0 4 0V4M9 11.5V20" />
      <path d="M16.5 20V4c-1.6.6-2.5 2.6-2.5 5.5S15 13.5 16.5 13.5" />
    </>
  ),
  'free-time': (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </>
  ),
  a1: <path d="M6 18.5V12M12 18.5v-3.5M18 18.5v-1.5" />,
  a2: <path d="M6 18.5V12M12 18.5V8.5M18 18.5v-1.5" />,
  b1: <path d="M6 18.5V12M12 18.5V8.5M18 18.5V5.5" />,
};

export function WordIcon({ name, size = 20 }: { name: string; size?: number }) {
  const glyph = glyphs[name];
  return glyph ? (
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
      {glyph}
    </svg>
  ) : null;
}
