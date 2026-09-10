import React from 'react';
import { useStudyContext } from '../StudyContext';
import { plainClick, routePath } from '../domain/routes';
import { withBase } from '../domain/base';
// Internal links keep real hrefs for new tabs and copying; a plain click navigates
// in place. `search` adds a query such as ?filter=mistakes to a page route.
export default function AppLink({ to, search = '', onNavigate = undefined, children, ...props }) {
  const { go, state } = useStudyContext();
  return (
    <a
      {...props}
      href={withBase(routePath(to, state.settings.level, state.settings.lang)) + search}
      onClick={(event) => {
        if (plainClick(event)) {
          event.preventDefault();
          if (onNavigate) onNavigate();
          else go(to, undefined, search);
        }
      }}
    >
      {children}
    </a>
  );
}
