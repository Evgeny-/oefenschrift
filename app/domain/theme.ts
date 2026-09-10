export function resolveTheme(preference, systemDark = false) {
  return preference === 'dark' || (preference !== 'light' && systemDark) ? 'dark' : 'light';
}
