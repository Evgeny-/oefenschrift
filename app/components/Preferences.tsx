import React from 'react';
import { Popover } from '@base-ui/react/popover';
import { useStudyContext } from '../StudyContext';
import { Segments, ThemeIcon, LanguageFlag } from './Controls';
import SegmentLinks from './SegmentLinks';
import { withBase } from '../domain/base';

// The language choice links to this page in the other language (/en or the plain path),
// so the two versions point at each other for readers and crawlers alike.
function Choices({ prefix = '' }) {
  const { state, setting, pathIn, t } = useStudyContext();
  return (
    <>
      <SegmentLinks
        id={prefix + 'language-control'}
        label={t('Taal', 'Language')}
        value={state.settings.lang}
        options={[
          {
            value: 'nl',
            label: <LanguageFlag language="nl" />,
            ariaLabel: 'Nederlands',
            href: withBase(pathIn('nl')),
          },
          {
            value: 'en',
            label: <LanguageFlag language="en" />,
            ariaLabel: 'English',
            href: withBase(pathIn('en')),
          },
        ]}
        onChange={(value) => setting('lang', value)}
      />
      <Segments
        id={prefix + 'theme-control'}
        label={t('Thema', 'Theme')}
        value={state.settings.theme}
        options={[
          { value: 'light', label: <ThemeIcon theme="light" />, ariaLabel: t('Licht', 'Light') },
          { value: 'dark', label: <ThemeIcon theme="dark" />, ariaLabel: t('Donker', 'Dark') },
          {
            value: 'system',
            label: <ThemeIcon theme="system" />,
            ariaLabel: t('Systeem', 'System'),
          },
        ]}
        onChange={(value) => setting('theme', value)}
      />
    </>
  );
}
export default function Preferences() {
  const { t } = useStudyContext();
  return (
    <>
      <div className="side-settings">
        <Choices />
      </div>
      <div className="mobile-preferences">
        <Popover.Root>
          <Popover.Trigger
            className="preferences-trigger"
            aria-label={t('Taal en thema', 'Language and theme')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.12 4.95L10.43 2.53L13.57 2.53L13.88 4.95L15.66 5.68L17.59 4.19L19.81 6.41L18.32 8.34L19.05 10.12L21.47 10.43L21.47 13.57L19.05 13.88L18.32 15.66L19.81 17.59L17.59 19.81L15.66 18.32L13.88 19.05L13.57 21.47L10.43 21.47L10.12 19.05L8.34 18.32L6.41 19.81L4.19 17.59L5.68 15.66L4.95 13.88L2.53 13.57L2.53 10.43L4.95 10.12L5.68 8.34L4.19 6.41L6.41 4.19L8.34 5.68Z" />
              <circle cx="12" cy="12" r="2.6" />
            </svg>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner side="bottom" align="end" sideOffset={8} collisionPadding={16}>
              <Popover.Popup className="preferences-popup">
                <Popover.Title>{t('Voorkeuren', 'Preferences')}</Popover.Title>
                <div className="preferences-choices">
                  <Choices prefix="mobile-" />
                </div>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
}
