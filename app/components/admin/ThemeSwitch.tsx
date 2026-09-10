import React, { useEffect, useState } from 'react';
import { Segments, ThemeIcon } from '../Controls';
import { resolveTheme } from '../../domain/theme';
import { PREFERENCES_COOKIE, readPreferences } from '../../domain/render-state';
import { cookiePath } from '../../domain/base';
// The same Light / Dark / System choice as the practice site. It updates the
// document at once and writes both places the site reads on the next load: the
// preference cookie (server render) and the saved study settings (browser).
export default function ThemeSwitch({ initial }: { initial: 'light' | 'dark' | 'system' }) {
  const [theme, setTheme] = useState(initial);
  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(theme, system.matches);
    };
    apply();
    system.addEventListener('change', apply);
    return () => system.removeEventListener('change', apply);
  }, [theme]);
  const choose = (value) => {
    setTheme(value);
    const settings = { ...readPreferences(document.cookie), theme: value };
    document.cookie = `${PREFERENCES_COOKIE}=${encodeURIComponent(JSON.stringify(settings))}; Path=${cookiePath}; SameSite=Lax; Max-Age=31536000`;
    try {
      const key = 'inburgering.study.v2',
        saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved?.settings) {
        saved.settings.theme = value;
        localStorage.setItem(key, JSON.stringify(saved));
      }
    } catch {}
  };
  return (
    <Segments
      id="ops-theme"
      label="Theme"
      value={theme}
      options={[
        { value: 'light', label: <ThemeIcon theme="light" />, ariaLabel: 'Light' },
        { value: 'dark', label: <ThemeIcon theme="dark" />, ariaLabel: 'Dark' },
        { value: 'system', label: <ThemeIcon theme="system" />, ariaLabel: 'System' },
      ]}
      onChange={choose}
    />
  );
}
