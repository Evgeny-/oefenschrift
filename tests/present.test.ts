import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { presentTense } from '../app/domain/present';
import { isNewSection } from '../app/domain/new-sets';
import type { WordEntry } from '../app/domain/words';

const show = (nl: string, separable = false) =>
  presentTense(nl, { separable })
    .map(([pronoun, form]) => `${pronoun} ${form}`)
    .join(' · ');

test('the present tense follows the spelling rules a learner is taught', () => {
  const cases: [string, string, boolean?][] = [
    ['werken', 'ik werk · hij werkt'],
    ['zitten', 'ik zit · hij zit'], // double consonant, stem already ends in t
    ['bellen', 'ik bel · hij belt'],
    ['maken', 'ik maak · hij maakt'], // long vowel written double
    ['eten', 'ik eet · hij eet'],
    ['geven', 'ik geef · hij geeft'], // v becomes f
    ['reizen', 'ik reis · hij reist'], // z becomes s
    ['worden', 'ik word · hij wordt'],
    ['vergeten', 'ik vergeet · hij vergeet'], // stress after an unstressed prefix
    ['betalen', 'ik betaal · hij betaalt'],
    ['veroorzaken', 'ik veroorzaak · hij veroorzaakt'], // a stays long unstressed
    ['luisteren', 'ik luister · hij luistert'], // schwa stays single
    ['betekenen', 'ik beteken · hij betekent'],
    ['openen', 'ik open · hij opent'],
    ['studeren', 'ik studeer · hij studeert'], // stressed loan
    ['beoordelen', 'ik beoordeel · hij beoordeelt'],
    ['eindigen', 'ik eindig · hij eindigt'],
    ['zijn', 'ik ben · jij bent · hij is'],
    ['hebben', 'ik heb · jij hebt · hij heeft'],
    ['kunnen', 'ik kan · jij kunt · hij kan'],
    ['mogen', 'ik mag · hij mag'],
    ['komen', 'ik kom · hij komt'],
    ['bestaan', 'ik besta · hij bestaat'],
    ['douchen', 'ik douche · hij douchet'],
    ['regenen', 'het regent'],
    ['zich schamen', 'ik schaam me · hij schaamt zich'],
    ['ophalen', 'ik haal op · hij haalt op', true],
    ['opendoen', 'ik doe open · hij doet open', true],
    ['terugkomen', 'ik kom terug · hij komt terug', true],
    ['voorbereiden', 'ik bereid voor · hij bereidt voor', true],
    ['achterlaten', 'ik laat achter · hij laat achter', true],
    ['omkleden', 'ik kleed me om · hij kleedt zich om', true],
    ['voorkomen', 'ik voorkom · hij voorkomt'], // inseparable: to prevent
  ];
  for (const [nl, expected, separable] of cases) assert.equal(show(nl, separable), expected, nl);
});

test('every verb in the word lists has a present tense', () => {
  const verbs = readdirSync('content/words')
    .filter((name) => /^words-\d+\.json$/.test(name))
    .flatMap((name) => JSON.parse(readFileSync(`content/words/${name}`, 'utf8')).entries)
    .filter((entry: WordEntry) => entry.verb) as WordEntry[];
  assert.ok(verbs.length > 400);
  for (const verb of verbs) {
    const forms = presentTense(verb.nl, verb.verb!);
    assert.ok(forms.length, verb.nl);
    for (const [pronoun, form] of forms) {
      assert.match(pronoun, /^(ik|jij|hij|het)$/, verb.nl);
      assert.match(form, /^[a-zé]+( [a-z]+)*$/, `${verb.nl}: ${form}`);
    }
    // A separable verb puts its particle last: "ik bel terug".
    if (verb.verb!.separable) assert.ok(forms[0][1].includes(' '), verb.nl);
  }
});

test('a new section is marked until its date and not after', () => {
  assert.equal(isNewSection('words', Date.parse('2026-12-01')), true);
  assert.equal(isNewSection('words', Date.parse('2027-02-01')), false);
  assert.equal(isNewSection('mock', Date.parse('2026-12-01')), false);
});
