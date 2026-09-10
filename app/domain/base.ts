// The path the site is served under: '' at the root of a host, '/projects/oefenschrift' on
// a shared one. Vite bakes it into the client and server bundles at build time
// (INBURGERING_BASE_PATH → BASE_URL); code run outside Vite, such as the tests, reads the
// same variable. React Router adds it to links, navigations and redirects by itself; this
// module covers everything the app builds by hand: API calls, media, icons and cookies.
const viteBase: string | undefined =
  typeof import.meta.env !== 'undefined' ? import.meta.env.BASE_URL : undefined;
export const base = (
  viteBase ?? (typeof process !== 'undefined' ? process.env.INBURGERING_BASE_PATH || '' : '')
).replace(/\/+$/, '');
export const withBase = (path: string) => base + path;
// Catalogue media is recorded as `audio/x.mp3` or `/images/y.webp`; both live under the base.
export const mediaUrl = (file: string) => base + '/' + String(file).replace(/^\/+/, '');
export const cookiePath = base || '/';
