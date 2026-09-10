// Generate exercise illustrations from image briefs in the house style (config/illustration.json).
//
//   tsx scripts/illustrate.ts                       report what would be generated (dry run)
//   tsx scripts/illustrate.ts --generate            generate missing images into assets/images and update the manifest
//   tsx scripts/illustrate.ts --generate --apply    also write image fields into content/catalogue.json
//   tsx scripts/illustrate.ts --file x.json --generate --out tmp/images
//
// An item asks for a picture with `imageBrief` (one still) or `images: [{brief, alt, kind}]` entries without a
// file. Briefs are scene descriptions in English; `alt` (Dutch, no answer revealed) is written by the author.
// The generated PNG is kept in content/images-source (ignored by git); the served file is a 600 px WebP.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type ImageSpec = {
  brief?: string;
  alt?: string;
  kind?: string;
  file?: string;
  credit?: string;
  licence?: string;
  sourceUrl?: string;
  [key: string]: any;
};
type Item = {
  id: string;
  part: string;
  imageBrief?: string;
  imageAlt?: string;
  images?: ImageSpec[];
  [key: string]: any;
};

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const GENERATE = flag('--generate'),
  APPLY = flag('--apply');
const OUT = option('--out', 'assets/images'),
  SOURCE_DIR = option('--source-dir', 'content/images-source');
const services = JSON.parse(readFileSync('config/services.json', 'utf8'));
const style = JSON.parse(readFileSync(option('--style', 'config/illustration.json'), 'utf8'));

function apiKey(): string {
  const path = process.env.INBURGERING_CREDENTIALS_FILE || services.credentials_file;
  let key = process.env.OPENAI_API_KEY || '';
  if (!key && existsSync(path)) {
    const m = readFileSync(path, 'utf8').match(/^\s*(?:export\s+)?OPENAI_API_KEY\s*=\s*(.*?)\s*$/m);
    if (m) key = m[1].replace(/^["']|["']$/g, '');
  }
  if (!key) throw new Error('OPENAI_API_KEY is not configured.');
  return key;
}
const sha = (v: string) => createHash('sha256').update(v).digest('hex');
// Cast members are described with their fixed traits whenever a brief names them.
function expandCast(brief: string): string {
  const notes: string[] = [];
  for (const [name, traits] of Object.entries(style.cast || {}))
    if (name !== 'note' && brief.includes(name)) notes.push(`${name} is ${traits}.`);
  return notes.length ? `${brief} ${notes.join(' ')}` : brief;
}
async function generate(key: string, prompt: string, size: string): Promise<Buffer> {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: style.model,
      prompt,
      size,
      quality: style.quality,
      n: 1,
      output_format: 'png',
    }),
  });
  if (!response.ok)
    throw new Error(
      `Image API returned HTTP ${response.status}: ${(await response.text()).replace(/\s+/g, ' ').slice(0, 160)}`,
    );
  const json = await response.json();
  return Buffer.from(json.data[0].b64_json, 'base64');
}

type Job = { key: string; item: Item; spec: ImageSpec; kind: string; index: number };
function jobs(items: Item[]): Job[] {
  const list: Job[] = [];
  for (const item of items) {
    if (item.imageBrief && !(item.images || []).some((i) => i.file))
      list.push({
        key: `${item.id}#still`,
        item,
        spec: { brief: item.imageBrief, alt: item.imageAlt || '', kind: 'drawing' },
        kind: 'still',
        index: -1,
      });
    (item.images || []).forEach((spec, index) => {
      if (spec.brief && !spec.file)
        list.push({
          key: `${item.id}#image${index}`,
          item,
          spec,
          kind: spec.size || (item.part === 'speaking' ? 'single' : 'still'),
          index,
        });
    });
  }
  return list;
}

async function run() {
  const source = option('--file', '');
  const items: Item[] = JSON.parse(readFileSync(source || 'content/catalogue.json', 'utf8'));
  const manifestPath = source ? resolve(OUT, 'image-manifest.json') : 'content/image-manifest.json';
  const manifest: Record<string, any> = existsSync(manifestPath)
    ? Object.fromEntries(
        (JSON.parse(readFileSync(manifestPath, 'utf8')) as any[]).map((m) => [m.key, m]),
      )
    : {};
  const list = jobs(items);
  console.log(
    `${list.length} images to make for ${items.length} items (model ${style.model}, ${style.quality}).`,
  );
  if (!GENERATE) {
    for (const j of list)
      console.log(
        `  ${manifest[j.key] ? 'have' : 'need'}  ${j.key}  ${j.kind}  ${(j.spec.brief || '').slice(0, 80)}`,
      );
    return;
  }
  const key = apiKey();
  mkdirSync(OUT, { recursive: true });
  mkdirSync(SOURCE_DIR, { recursive: true });
  let generated = 0,
    failures = 0;
  for (const job of list) {
    const size = style.sizes[job.kind] || style.sizes.still;
    const prompt = `${style.stylePrefix} ${expandCast(job.spec.brief!)}`;
    const token = sha(
      JSON.stringify({ prompt, size, model: style.model, quality: style.quality }),
    ).slice(0, 16);
    const png = resolve(SOURCE_DIR, `${token}.png`),
      webp = resolve(OUT, `${token}.webp`),
      file = `images/${token}.webp`;
    if (!job.spec.alt) {
      console.log(`  skip  ${job.key}: alt text (Dutch) is missing`);
      failures++;
      continue;
    }
    try {
      if (!existsSync(png)) writeFileSync(png, await generate(key, prompt, size));
      if (!existsSync(webp))
        execFileSync('cwebp', [
          '-quiet',
          '-q',
          String(style.delivery?.quality || 80),
          '-resize',
          String(style.delivery?.width || 600),
          '0',
          png,
          '-o',
          webp,
        ]);
      const record = {
        key: job.key,
        file,
        alt: job.spec.alt,
        kind: job.spec.kind || 'drawing',
        brief: job.spec.brief,
        prompt_sha256: sha(prompt),
        model: style.model,
        quality: style.quality,
        size,
        reviewed: false,
      };
      manifest[job.key] = record;
      const entry: ImageSpec = {
        file,
        alt: job.spec.alt,
        kind: record.kind,
        brief: job.spec.brief,
      };
      if (job.index < 0) {
        job.item.images = [entry];
        delete job.item.imageBrief;
        delete job.item.imageAlt;
      } else job.item.images![job.index] = { ...job.item.images![job.index], ...entry };
      generated++;
      console.log(`  ok    ${job.key}  ${size}  ${file}`);
    } catch (error) {
      failures++;
      console.log(`  FAIL  ${job.key}: ${(error as Error).message}`);
    }
  }
  mkdirSync(resolve(manifestPath, '..'), { recursive: true });
  writeFileSync(manifestPath, JSON.stringify(Object.values(manifest), null, 2) + '\n');
  console.log(
    `${generated} generated, ${failures} failed, manifest ${manifestPath}. Every new image still needs a human look (manifest reviewed: false).`,
  );
  if (source) {
    writeFileSync(resolve(OUT, 'items-with-images.json'), JSON.stringify(items, null, 2) + '\n');
    return;
  }
  if (APPLY) {
    writeFileSync('content/catalogue.json', JSON.stringify(items, null, 2) + '\n');
    console.log(
      'Catalogue updated with image fields; refresh the sentence-starter review hash (content/hints/review.json).',
    );
  } else console.log('Run with --apply to write image fields into content/catalogue.json.');
}
run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
