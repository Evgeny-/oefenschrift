import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageSeo, sitemapPaths } from '../app/domain/seo';
const bank = JSON.parse(readFileSync('content/catalogue.json', 'utf8')),
  sets = JSON.parse(readFileSync('content/practice-sets.json', 'utf8'));
test('each populated level has distinct canonical metadata and empty levels stay out of the sitemap', () => {
  const a2 = pageSeo('reading', 'A2', bank, sets, 'https://example.test'),
    b1 = pageSeo('reading', 'B1', bank, sets, 'https://example.test');
  assert.notEqual(a2.title, b1.title);
  assert.notEqual(a2.description, b1.description);
  assert.equal(b1.canonical, 'https://example.test/b1/reading');
  assert.equal(b1.noindex, false);
  assert.equal(pageSeo('reading', 'B2', bank, sets, 'https://example.test').noindex, true);
  const paths = sitemapPaths(bank, sets);
  assert.ok(
    paths.includes('/a2/reading') && paths.includes('/b1/reading') && paths.includes('/knm'),
  );
  assert.ok(
    !paths.some(
      (path) =>
        path.startsWith('/b2/') || path.includes('progress') || path.includes('practice-test'),
    ),
  );
  assert.equal(paths.filter((path) => path.startsWith('/exercise/')).length, bank.length);
  assert.equal(paths.filter((path) => path.startsWith('/en/exercise/')).length, bank.length);
  assert.ok(paths.includes('/en') && paths.includes('/en/a2/reading') && paths.includes('/en/knm'));
  assert.ok(
    !sitemapPaths(
      bank.filter((item) => item.level !== 'B1'),
      [],
    ).includes('/b1/reading'),
  );
});
test('private progress and session views request noindex', () => {
  for (const route of ['progress', 'session', 'mock', 'privacy'])
    assert.equal(pageSeo(route, 'A2', bank, sets, 'https://example.test').noindex, true);
});
test('each page has English metadata under /en and names both languages as alternates', () => {
  const nl = pageSeo('reading', 'A2', bank, sets, 'https://example.test'),
    en = pageSeo('reading', 'A2', bank, sets, 'https://example.test', 'en');
  assert.equal(nl.canonical, 'https://example.test/a2/reading');
  assert.equal(en.canonical, 'https://example.test/en/a2/reading');
  assert.deepEqual(nl.alternates, en.alternates);
  assert.deepEqual(en.alternates, {
    nl: 'https://example.test/a2/reading',
    en: 'https://example.test/en/a2/reading',
  });
  assert.ok(nl.title.startsWith('A2 Lezen oefenen') && en.title.startsWith('A2 Reading practice'));
  assert.notEqual(nl.description, en.description);
  assert.ok(en.description.includes('Practise reading at level A2'));
  assert.equal(en.noindex, nl.noindex);
  const home = pageSeo('home', 'A2', bank, sets, 'https://example.test', 'en');
  assert.equal(home.canonical, 'https://example.test/en');
  assert.equal(home.alternates.nl, 'https://example.test/');
  assert.ok(home.title.includes('Inburgering exam practice'));
  const set = sets.find((set) => set.ids.length),
    setEn = pageSeo('set/' + set.id, 'A2', bank, sets, 'https://example.test', 'en');
  assert.ok(setEn.title.includes(`Practice set ${set.number}`));
  assert.equal(setEn.canonical, `https://example.test/en/sets/${set.id}`);
  for (const route of ['progress', 'session', 'mock', 'privacy', 'check-result'])
    assert.equal(pageSeo(route, 'A2', bank, sets, 'https://example.test', 'en').noindex, true);
});
test('the card is the same everywhere and the whole written description survives', () => {
  const home = pageSeo('home', 'A2', bank, sets, 'https://example.test'),
    exercise = pageSeo('exercise/' + bank[0].id, 'A2', bank, sets, 'https://example.test');
  assert.equal(home.image, 'https://example.test/og.png');
  assert.equal(exercise.image, home.image);
  assert.ok(home.imageAlt.includes('Oefenschrift'));
  assert.ok(home.description.endsWith('Zonder account.'));
  for (const page of [home, exercise, pageSeo('knm', 'A2', bank, sets, 'https://example.test')])
    assert.ok(page.description.length <= 165 && !page.description.endsWith(' '));
});
type Site = { '@type': string; url: string };
type Trail = {
  '@type': string;
  itemListElement: { position: number; name: string; item: string }[];
};
test('the home page describes the site and every other page its trail', () => {
  const home = pageSeo('home', 'A2', bank, sets, 'https://example.test');
  assert.equal(home.jsonLd.length, 1);
  const site = home.jsonLd[0] as Site;
  assert.equal(site['@type'], 'WebSite');
  assert.equal(site.url, 'https://example.test/');
  const set = sets.find((set) => set.ids.length),
    trail = pageSeo('set/' + set.id, 'A2', bank, sets, 'https://example.test').jsonLd[0] as Trail;
  assert.equal(trail['@type'], 'BreadcrumbList');
  assert.deepEqual(
    trail.itemListElement.map((step) => [step.position, step.name, step.item]),
    [
      [1, 'Oefenschrift', 'https://example.test/'],
      [2, `${set.level} Lezen`, `https://example.test/${set.level.toLowerCase()}/reading`],
      [3, `Oefenset ${set.number}`, `https://example.test/sets/${set.id}`],
    ],
  );
  const en = pageSeo('set/' + set.id, 'A2', bank, sets, 'https://example.test', 'en')
    .jsonLd[0] as Trail;
  assert.deepEqual(
    en.itemListElement.map((step) => step.item),
    [
      'https://example.test/en',
      `https://example.test/en/${set.level.toLowerCase()}/reading`,
      `https://example.test/en/sets/${set.id}`,
    ],
  );
  // A page Google is told to skip says nothing more about itself.
  assert.deepEqual(pageSeo('progress', 'A2', bank, sets, 'https://example.test').jsonLd, []);
});
