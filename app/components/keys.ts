import { useEffect } from 'react';

// Shortcuts never interfere with typing, dialogs or a focused control's own Enter.
function shortcutTarget(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return null;
  const target = event.target as HTMLElement | null;
  if (
    target?.closest(
      'textarea, select, [contenteditable="true"], [role="dialog"], input:not([type="radio"]):not([type="checkbox"])',
    )
  )
    return null;
  return target;
}
// Enter runs the primary action of a view, such as continuing after feedback.
export function useEnterAction(enabled: boolean, action: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      const target = shortcutTarget(event);
      if (target === null || event.key !== 'Enter' || target?.closest('button, a, summary')) return;
      event.preventDefault();
      action();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, action]);
}
// Answer keys (A, B, C) and 1, 2, 3 select an option; Enter checks or continues.
export function useAnswerKeys({ options, chosen, checked, mock, select, check, next }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = shortcutTarget(event);
      if (target === null) return;
      const keys = Object.keys(options),
        option = /^[1-9]$/.test(event.key)
          ? keys[Number(event.key) - 1]
          : keys.find((k) => k.toLowerCase() === event.key.toLowerCase());
      if (option) {
        if (!checked) {
          event.preventDefault();
          select(option);
        }
        return;
      }
      if (event.key === 'Enter' && chosen && !target?.closest('button, a, summary')) {
        event.preventDefault();
        if (!mock && !checked) check();
        else next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options, chosen, checked, mock, select, check, next]);
}
