import { useId } from 'react';
import { plainClick } from '../domain/routes';
import useSelectionIndicator from './useSelectionIndicator';
// Levels without reviewed material stay visible as a placeholder link that does not navigate.
export default function LevelNavigation({
  label,
  value,
  hrefFor,
  onChange,
  available = ['A2', 'B1', 'B2'],
  soon = 'Binnenkort',
}) {
  const labelId = useId(),
    indicator = useSelectionIndicator(value);
  return (
    <div className="segment-field" id="level-control">
      <span id={labelId} className="control-label">
        {label}
      </span>
      <nav
        ref={indicator.ref}
        aria-labelledby={labelId}
        className="segments"
        data-positioned={indicator.positioned || undefined}
        data-animated={indicator.animated || undefined}
      >
        <span className="selection-indicator" aria-hidden="true" style={indicator.style} />
        {['A2', 'B1', 'B2'].map((level) =>
          available.includes(level) || level === value ? (
            <a
              key={level}
              href={hrefFor(level)}
              className="segment"
              data-choice={level}
              data-checked={level === value ? '' : undefined}
              aria-current={level === value ? 'page' : undefined}
              onClick={(event) => {
                if (plainClick(event)) {
                  event.preventDefault();
                  onChange(level);
                }
              }}
            >
              {level}
            </a>
          ) : (
            <a
              key={level}
              className="segment"
              data-choice={level}
              aria-disabled="true"
              title={soon}
            >
              {level}
              <span className="sr-only"> · {soon}</span>
            </a>
          ),
        )}
      </nav>
    </div>
  );
}
