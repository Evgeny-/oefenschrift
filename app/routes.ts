import { index, layout, route } from '@react-router/dev/routes';
export default [
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('robots.txt', 'routes/robots.ts'),
  route('api/:service', 'routes/api.ts'),
  route('api/ops/:resource/:id?', 'routes/admin-api.ts'),
  route('ops/login', 'routes/admin-login.tsx'),
  route('ops/logout', 'routes/admin-logout.ts'),
  route('ops', 'routes/admin-layout.tsx', [
    index('routes/admin.tsx'),
    route('exercises', 'routes/admin-exercises.tsx'),
    route('exercises/:id', 'routes/editor.tsx'),
    route('reports', 'routes/admin-reports.tsx'),
    route('services', 'routes/admin-services.tsx'),
  ]),
  // The start page needs an index route: a splat alone does not match "/".
  layout('routes/study-layout.tsx', [
    index('routes/study.tsx', { id: 'home' }),
    route('*', 'routes/study.tsx'),
  ]),
];
