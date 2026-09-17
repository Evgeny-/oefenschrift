import React from 'react';
import { dialogueTurns, highlightParts, wordDiff } from '../domain/text';
const Marked = ({ parts }) =>
  parts.map((p, i) =>
    p.marked ? <mark key={i}>{p.text}</mark> : <React.Fragment key={i}>{p.text}</React.Fragment>,
  );
export function EvidenceText({ text, quotes = [] }) {
  return <Marked parts={highlightParts(text, quotes)} />;
}
// A listening text: one paragraph per turn, the speaker's name set off before the words, so a
// conversation reads as one. A text without speakers stays a single block.
export function Dialogue({ text, quotes = [] }) {
  const turns = dialogueTurns(text, quotes);
  return (
    <div className="dialogue" lang="nl" translate="no">
      {turns ? (
        turns.map((turn, i) => (
          <p className="turn" key={i}>
            <b>{turn.speaker}:</b> <Marked parts={turn.parts} />
          </p>
        ))
      ) : (
        <p>
          <EvidenceText text={text} quotes={quotes} />
        </p>
      )}
    </div>
  );
}
export function AnswerDiff({ before, after }) {
  return (
    <p className="answer-diff" lang="nl" translate="no">
      {wordDiff(before, after).map((p, i) =>
        p.type === 'add' ? (
          <ins key={i}>{p.text}</ins>
        ) : p.type === 'remove' ? (
          <del key={i}>{p.text}</del>
        ) : (
          <React.Fragment key={i}>{p.text}</React.Fragment>
        ),
      )}
    </p>
  );
}
