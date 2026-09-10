import { useId } from 'react';
import { plainClick } from '../domain/routes';
import useSelectionIndicator from './useSelectionIndicator';
// Segmented choices that are real links: each option has an address of its own for new
// tabs, copying and crawlers, and a plain click navigates in place instead. An option
// without an address is a placeholder that does not navigate.
export default function SegmentLinks({ id, label, value, options, onChange }) {
  const labelId = useId(),
    indicator = useSelectionIndicator(value);
  return (
    <div className="segment-field" id={id}>
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
        {options.map((option) =>
          option.href ? (
            <a
              key={option.value}
              href={option.href}
              className="segment"
              data-choice={option.value}
              data-checked={option.value === value ? '' : undefined}
              aria-current={option.value === value ? 'page' : undefined}
              aria-label={option.ariaLabel}
              title={option.ariaLabel}
              onClick={(event) => {
                if (plainClick(event)) {
                  event.preventDefault();
                  onChange(option.value);
                }
              }}
            >
              {option.label}
            </a>
          ) : (
            <a
              key={option.value}
              className="segment"
              data-choice={option.value}
              aria-disabled="true"
              title={option.note}
            >
              {option.label}
              <span className="sr-only"> · {option.note}</span>
            </a>
          ),
        )}
      </nav>
    </div>
  );
}
