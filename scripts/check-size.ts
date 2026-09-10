// Fails when a source file grows past the agreed limit, so large files get split
// instead of growing. Prose, data and generated output are not counted.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const LIMIT = 1200,
  ROOTS = ['app', 'server', 'scripts', 'tests'],
  TYPES = new Set(['.ts', '.tsx', '.mjs', '.css']);
const files: string[] = [];
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (TYPES.has(extname(name))) files.push(path);
  }
};
for (const root of ROOTS) walk(root);
const large = files
  .map((path) => ({ path, lines: readFileSync(path, 'utf8').split('\n').length }))
  .filter((file) => file.lines > LIMIT);
if (large.length) {
  console.error(
    `Files over ${LIMIT} lines:\n` + large.map((f) => `  ${f.lines}  ${f.path}`).join('\n'),
  );
  process.exit(1);
}
console.log(`${files.length} source files within ${LIMIT} lines.`);
