import { setting as environmentSetting } from './environment.ts';
import type { Config } from '@react-router/dev/config';
// The route table is small, so the client receives it whole instead of discovering
// routes with manifest requests while navigating. The base path is a build-time choice
// (OEFENSCHRIFT_BASE_PATH, see .env.example): '/' on an own domain, '/projects/oefenschrift'
// on the shared host.
export default {
  ssr: true,
  routeDiscovery: { mode: 'initial' },
  basename: environmentSetting('BASE_PATH') || '/',
} satisfies Config;
