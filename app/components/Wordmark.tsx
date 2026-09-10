import React, { useEffect, useRef, useState } from 'react';
import AppLink from './AppLink';
import { useStudyContext } from '../StudyContext';
import { logo } from './logo';
// When the mark was last clicked, kept outside React because going to the start page
// from another section swaps the route element and remounts the sidebar: whichever
// instance is alive after the click plays the motion, each at most once per click.
let clickedAt = 0;
// The sidebar wordmark: the Oefenschrift mark as inline SVG, so the ink follows the
// theme and the accent follows --action. It links to the start page, and a click swings
// the cut through the O to the icon's angle and back: the svg is remounted with a new
// key so the CSS animation restarts every time, never on load or hover.
export default function Wordmark() {
  const { go } = useStudyContext(),
    [tilt, setTilt] = useState(0),
    [, poke] = useState(0),
    seen = useRef(0);
  useEffect(() => {
    if (clickedAt <= seen.current || performance.now() - clickedAt > 1000) return;
    seen.current = clickedAt;
    setTilt((count) => count + 1);
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
      <LogoMark key={tilt} tilt={tilt > 0} />
    </AppLink>
  );
}
// The mark alone, for places without the practice context (the operations panel).
export function LogoMark({ tilt = false }: { tilt?: boolean }) {
  return (
    <svg
      viewBox={logo.viewBox}
      role="img"
      aria-hidden="true"
      data-tilt={tilt || undefined}
      style={{ '--cut-origin': logo.origin } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: logo.markup }}
    />
  );
}
