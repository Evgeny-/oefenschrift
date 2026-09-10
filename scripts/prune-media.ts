// Remove generated media that nothing references: clips and pictures superseded by a regeneration.
//
//   tsx scripts/prune-media.ts            list orphans
//   tsx scripts/prune-media.ts --delete   remove them
//
// A file is kept when the catalogue, the audio manifest or the image manifest names it.
import { readFileSync, readdirSync, statSync, unlinkSync } from 'node:fs';

const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));
const audioManifest = JSON.parse(readFileSync('content/audio-manifest.json', 'utf8'));
const imageManifest = JSON.parse(readFileSync('content/image-manifest.json', 'utf8'));
const used = new Set<string>();
const add = (file: unknown) => {
  if (typeof file === 'string' && file) used.add(file.replace(/^\/?(audio|images)\//, ''));
};
for (const item of catalogue) {
  for (const key of ['audio', 'promptAudio', 'cueAudio', 'introAudio']) add(item[key]);
  for (const image of item.images || []) add(image.file);
  for (const q of item.questions || []) {
    add(q.questionAudio);
    add(q.audio);
  }
}
const manifestFiles = (manifest: any) =>
  Array.isArray(manifest) ? manifest : Object.values(manifest || {});
for (const entry of manifestFiles(audioManifest)) add((entry as any).file);
for (const entry of manifestFiles(imageManifest)) add((entry as any).file);

const remove = process.argv.includes('--delete');
let bytes = 0,
  count = 0;
for (const [directory, pattern] of [
  ['assets/audio', /\.mp3$/],
  ['assets/images', /\.webp$/],
  ['content/images-source', /\.png$/],
] as const) {
  for (const name of readdirSync(directory)) {
    const stem = name.replace(/\.png$/, '.webp');
    if (!pattern.test(name) || used.has(name) || used.has(stem)) continue;
    const path = `${directory}/${name}`;
    bytes += statSync(path).size;
    count++;
    if (remove) unlinkSync(path);
    else console.log(`  orphan  ${path}`);
  }
}
console.log(
  `${count} orphaned files, ${(bytes / 1e6).toFixed(1)} MB${remove ? ' removed' : ' (run with --delete to remove)'}. ${used.size} files referenced.`,
);
