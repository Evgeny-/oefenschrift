import { sitemapPaths } from '../domain/seo';
import { localizePath } from '../domain/routes';
import { getStore } from '../../server/store';
import { basePath, siteOrigin } from '../../server/security';
// Each entry names its Dutch and English addresses, so a crawler learns the pair here as
// well as from the page head; Dutch is the default when neither language matches.
export function loader({ request }) {
  const store = getStore(),
    root = siteOrigin(request) + basePath();
  const paths = sitemapPaths(store.catalogue(), store.sets());
  const escape = (text: string) =>
    text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const alternate = (lang: string, path: string) =>
    `<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(root + path)}"/>`;
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
      paths
        .map((path) => {
          const nl = localizePath(path, 'nl'),
            en = localizePath(path, 'en');
          return `<url><loc>${escape(root + path)}</loc>${alternate('nl', nl)}${alternate('en', en)}${alternate('x-default', nl)}</url>`;
        })
        .join('') +
      '</urlset>',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
