import { useEffect } from 'react';

// Native <details> snaps open and shut. One document-level handler animates the height
// of any disclosure on the site instead, so FAQ entries, sentence starters, transcripts,
// criteria and result reviews all open the same way. Keyboard activation reaches here as
// a click as well. Reduced motion, or a disclosure already animating, keeps native behaviour.
export default function useDisclosureMotion() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const summary = (event.target as HTMLElement | null)?.closest('summary');
      const details = summary?.parentElement;
      if (!summary || !(details instanceof HTMLDetailsElement) || event.defaultPrevented) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || details.dataset.motion) return;
      event.preventDefault();
      const duration = 220,
        easing = 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        from = details.offsetHeight;
      details.dataset.motion = 'on';
      details.style.overflow = 'hidden';
      const finish = (open: boolean) => {
        if (!details.dataset.motion) return;
        details.open = open;
        details.style.height = '';
        details.style.overflow = '';
        delete details.dataset.motion;
      };
      // Closing shrinks to the summary alone, then really closes; opening opens first and
      // grows to the full height. A hidden tab pauses animations, so a timer settles the
      // disclosure regardless and it never sticks half-way.
      const open = !details.open;
      if (open) details.open = true;
      const to = open ? details.scrollHeight : summary.offsetHeight;
      const animation = details.animate({ height: [`${from}px`, `${to}px`] }, { duration, easing });
      animation.onfinish = () => finish(open);
      animation.oncancel = () => finish(open);
      setTimeout(() => finish(open), duration + 80);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
