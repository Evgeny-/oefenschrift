import { readPreferences } from './domain/render-state';
import { resolveTheme } from './domain/theme';
import { readStudy } from './domain/persistence';
let preference = readPreferences(document.cookie).theme;
try {
  const s = readStudy(localStorage);
  if (s?.settings?.theme) preference = s.settings.theme;
} catch {}
document.documentElement.dataset.theme = resolveTheme(
  preference,
  matchMedia('(prefers-color-scheme: dark)').matches,
);
