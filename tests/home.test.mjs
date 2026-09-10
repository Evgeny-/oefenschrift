import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pageSeo, sitemapPaths } from '../app/domain/seo.ts';
const catalogue = JSON.parse(
  fs.readFileSync(new URL('../content/catalogue.json', import.meta.url)),
);
const sets = JSON.parse(fs.readFileSync(new URL('../content/practice-sets.json', import.meta.url)));
test('the home page is indexable at the root and listed in the sitemap', () => {
  const seo = pageSeo('home', 'A2', catalogue, sets, 'http://127.0.0.1:8766');
  assert.equal(seo.canonical, 'http://127.0.0.1:8766/');
  assert.equal(seo.noindex, false);
  assert.ok(seo.title.includes('gratis'));
  assert.ok(sitemapPaths(catalogue, sets).includes('/'));
});
