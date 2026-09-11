import { setting as environmentSetting } from './environment.ts';
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { resolve } from 'node:path';
// The Base UI subpaths and the on-demand ECharts modules are pre-bundled up front, so a
// fresh dependency cache never re-optimises and reloads the page while it renders.
export default defineConfig({
  base: (environmentSetting('BASE_PATH') || '') + '/',
  plugins: [reactRouter()],
  // The browser tests give their isolated server its own dependency cache, so it never
  // races a running development server for node_modules/.vite.
  ...(environmentSetting('VITE_CACHE') ? { cacheDir: environmentSetting('VITE_CACHE') } : {}),
  optimizeDeps: {
    include: [
      '@base-ui/react/dialog',
      '@base-ui/react/popover',
      '@base-ui/react/radio',
      '@base-ui/react/radio-group',
      '@base-ui/react/switch',
      'echarts/core',
      'echarts/charts',
      'echarts/components',
      'echarts/renderers',
    ],
  },
  server: {
    fs: {
      deny: [
        '**/.env*',
        ...[
          'config',
          'server',
          'var',
          'reference-private',
          'tmp',
          'research',
          'scripts',
          'tests',
        ].map((path) => resolve(path) + '/**'),
      ],
    },
    watch: { ignored: ['**/tmp/**', '**/var/**', '**/build/**', '**/.git/**'] },
  },
});
