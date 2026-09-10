import { useLayoutEffect, useRef, useState } from 'react';

// Decorative motion follows the real controls; their semantics stay with Base UI.
export default function useSelectionIndicator(value) {
  const ref = useRef<HTMLDivElement>(null),
    [position, setPosition] = useState(null),
    [animated, setAnimated] = useState(false);
  useLayoutEffect(() => {
    let active = true,
      first,
      second;
    Promise.resolve(document.fonts?.ready).then(() => {
      if (active)
        first = requestAnimationFrame(() => {
          second = requestAnimationFrame(() => {
            if (active) setAnimated(true);
          });
        });
    });
    return () => {
      active = false;
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    // Only the measurement caused by a new value may slide; later corrections (fonts
    // loading, late styles, resizes) move the indicator without a transition.
    let active = true,
      chosen = true;
    const measure = () => {
      if (!active) return;
      const choice = [...container.querySelectorAll<HTMLElement>('[data-choice]')].find(
        (node) => node.dataset.choice === String(value),
      );
      if (!choice) return;
      const bounds = choice.getBoundingClientRect(),
        parent = container.getBoundingClientRect();
      const next = {
        x: bounds.left - parent.left - container.clientLeft,
        width: bounds.width,
        silent: !chosen,
      };
      chosen = false;
      setPosition((old) => (old?.x === next.x && old?.width === next.width ? old : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    container
      .querySelectorAll<HTMLElement>('[data-choice]')
      .forEach((node) => observer.observe(node));
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [value]);
  return {
    ref,
    style: position
      ? {
          width: position.width,
          left: position.x,
          ...(position.silent ? { transition: 'none' } : {}),
        }
      : undefined,
    positioned: !!position,
    animated,
  };
}
