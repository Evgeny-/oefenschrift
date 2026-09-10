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
