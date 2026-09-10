import { sitemapPaths } from '../domain/seo';
import { getStore } from '../../server/store';
export function loader({ request }) {
  const store = getStore(),
    origin = new URL(request.url).origin;
  const paths = sitemapPaths(store.catalogue(), store.sets());
  const escape = (text: string) =>
    text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      paths.map((path) => `<url><loc>${escape(origin + path)}</loc></url>`).join('') +
      '</urlset>',
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
