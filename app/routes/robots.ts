import { basePath, siteOrigin } from '../../server/security';
export function loader({ request }) {
  return new Response(
    `User-agent: *\nDisallow: ${basePath()}/ops\nDisallow: ${basePath()}/api/\nSitemap: ${siteOrigin(request)}${basePath()}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
