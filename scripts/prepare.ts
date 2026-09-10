import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { checkContent } from './content';
await checkContent();
await mkdir('public', { recursive: true });
await cp('assets/fonts', 'public/fonts', { recursive: true });
await cp('assets/icons', 'public', { recursive: true });
await cp('assets/audio', 'public/audio', { recursive: true });
if (existsSync('assets/images')) await cp('assets/images', 'public/images', { recursive: true });
await build({
  entryPoints: ['app/theme-init.ts'],
  outfile: 'public/theme.js',
  bundle: true,
  minify: true,
  format: 'iife',
});
