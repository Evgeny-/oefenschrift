import React, { useEffect, useRef, useState } from 'react';
import AppLink from './AppLink';
import { useStudyContext } from '../StudyContext';
import { logo } from './logo';
// When the mark was last clicked, kept outside React because going to the start page
// from another section swaps the route element and remounts the sidebar: whichever
// instance is alive after the click plays the motion, each at most once per click.
let clickedAt = 0;
// The sidebar wordmark: the Oefenschrift mark as inline SVG, so the name follows the theme,
// the bubble follows --action and its "oe" stays dark. It links to the start page, and a
// click makes the bubble speak — it pops from the tip of its tail and settles while the "oe"
// is said: the svg is remounted with a new key so the CSS animation restarts every time,
// never on load or hover.
export default function Wordmark() {
  const { go } = useStudyContext(),
    [spoken, setSpoken] = useState(0),
    [, poke] = useState(0),
    seen = useRef(0);
  useEffect(() => {
    if (clickedAt <= seen.current || performance.now() - clickedAt > 1000) return;
    seen.current = clickedAt;
    setSpoken((count) => count + 1);
  });
  return (
    <AppLink
      to="home"
      className="wordmark"
      aria-label={logo.name}
      onNavigate={() => {
        clickedAt = performance.now();
        go('home');
        poke((count) => count + 1);
      }}
    >
      <LogoMark key={spoken} speak={spoken > 0} />
    </AppLink>
  );
}
// The mark alone, for places without the practice context (the operations panel).
export function LogoMark({ speak = false }: { speak?: boolean }) {
  return (
    <svg
      viewBox={logo.viewBox}
      role="img"
      aria-hidden="true"
      data-speak={speak || undefined}
      dangerouslySetInnerHTML={{ __html: logo.markup }}
    />
  );
}
