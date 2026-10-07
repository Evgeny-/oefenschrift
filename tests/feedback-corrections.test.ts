import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  assess,
  assessWithRetry,
  configuration,
  FeedbackRejected,
  validateFeedback,
} from '../server/services';

const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));

function exercise(id: string) {
  const item = catalogue.find((candidate) => candidate.id === id);
  assert.ok(item, `The reviewed task ${id} must exist.`);
  return item;
}

function marked(item: any, answer: string, met: boolean[], correction: string) {
  assert.equal(met.length, item.criteria.length);
  return {
    on_task: true,
    criteria: item.criteria.map((_: any, index: number) => ({
      index,
      met: met[index],
      uncertain: false,
      evidence: met[index] ? answer : '',
      feedback: met[index]
        ? { nl: 'Dit punt is goed.', en: 'This point is correct.' }
        : { nl: 'Verbeter dit punt.', en: 'Improve this point.' },
    })),
    corrected_text: correction,
  };
}

function completed(result: any) {
  return Response.json({
    status: 'completed',
    output: [{ content: [{ type: 'output_text', text: JSON.stringify(result) }] }],
  });
}

async function offline(run: (warnings: string[]) => Promise<void>) {
  const names = ['OPENAI_API_KEY', 'OEFENSCHRIFT_CREDENTIALS_FILE'],
    previous = names.map((name) => process.env[name]),
    originalWarn = console.warn,
    warnings: string[] = [];
  process.env.OPENAI_API_KEY = 'test-placeholder';
  process.env.OEFENSCHRIFT_CREDENTIALS_FILE = '/nonexistent/feedback-corrections-test.env';
  console.warn = (...messages: unknown[]) => warnings.push(messages.join(' '));
  try {
    await run(warnings);
  } finally {
    console.warn = originalWarn;
    for (const [index, name] of names.entries()) {
      if (previous[index] === undefined) delete process.env[name];
      else process.env[name] = previous[index];
    }
  }
}

function provider(requests: any[], response: (attempt: number) => any): typeof fetch {
  return async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.equal(options?.headers?.['Authorization'], 'Bearer test-placeholder');
    requests.push(JSON.parse(options?.body as string));
    return completed(response(requests.length));
  };
}

test('the configured Luna request explicitly disables reasoning', async () => {
  await offline(async () => {
    const item = exercise('B1:writing:batch014-ziekmelding:1'),
      requests: any[] = [],
      correction = 'kan ik vandaag niet naar mijn werk komen';
    await assess(
      item,
      item.sample,
      provider(requests, () => marked(item, item.sample, [true, false], correction)),
    );
    assert.equal(configuration().feedback_model, 'gpt-6-luna');
    assert.equal(requests[0].model, 'gpt-6-luna');
    assert.deepEqual(requests[0].reasoning, { effort: 'none' });
    assert.equal(requests[0].store, false);
  });
});

test('a grammar-only error retains the model repair without adding a factual placeholder', () => {
  const cases = [
    {
      id: 'B1:writing:batch014-ziekmelding:1',
      correction: 'kan ik vandaag niet naar mijn werk komen',
    },
    {
      id: 'B1:writing:batch014-afscheid:1',
      correction: 'Vanaf 1 november ga ik werken bij een ander bedrijf.',
    },
    {
      id: 'B1:writing:batch014-groepsverslag:1',
      correction: 'de inleiding te schrijven en het verslag af te maken',
    },
    {
      id: 'B1:writing:batch038-korfbal:1',
      correction: 'haalt mijn buurvrouw Farah hem na de training op',
    },
    {
      id: 'B1:writing:batch038-certificaat:1',
      correction: 'ik de kosten van de cursus terugkrijg',
    },
  ];
  for (const entry of cases) {
    const item = exercise(entry.id),
      result = validateFeedback(
        marked(item, item.sample, [true, false], entry.correction),
        item,
        item.sample,
      );
    assert.equal(result.corrected_text, entry.correction, item.id);
    assert.doesNotMatch(result.corrected_text, /\[|\]/, item.id);
    assert.deepEqual(
      result.criteria.map((criterion: any) => criterion.met),
      [true, false],
    );
    assert.equal(result.comment.nl, 'Je hebt 1 van de 2 punten gehaald.');
    assert.equal(result.comment.en, 'You met 1 of 2 points.');
    assert.equal(result.next_step.nl, 'Verbeter de grammatica: ' + item.criteria[1][0]);
    assert.equal(result.next_step.en, 'Correct the grammar: ' + item.criteria[1][1]);
  }
});

test('suggested gap wording omits printed lead-ins while retaining negation and names', () => {
  const cases = [
    {
      id: 'B1:writing:batch014-ziekmelding:1',
      proposed: 'Daarom kan ik vandaag niet naar mijn werk komen.',
      expected: 'kan ik vandaag niet naar mijn werk komen',
    },
    {
      id: 'B1:writing:batch002-rooster:1',
      answer: 'ik op woensdagavond volg les voor mijn opleiding',
      proposed: 'omdat ik op woensdagavond les voor mijn opleiding volg.',
      expected: 'ik op woensdagavond les voor mijn opleiding volg',
    },
    {
      id: 'B1:writing:batch002-rooster:1',
      answer: 'ik op woensdagavond volg les voor mijn opleiding',
      proposed:
        'Ik kan die dienst niet doen, omdat ik op woensdagavond les voor mijn opleiding volg.',
      expected: 'ik op woensdagavond les voor mijn opleiding volg',
    },
    {
      id: 'B1:writing:batch014-groepsverslag:1',
      proposed:
        'Zonder jouw tekst lukt het mij niet om de inleiding te schrijven en het verslag af te maken.',
      expected: 'de inleiding te schrijven en het verslag af te maken',
    },
    {
      id: 'B1:writing:batch038-korfbal:1',
      proposed: 'Die dag haalt mijn buurvrouw Farah hem na de training op.',
      expected: 'haalt mijn buurvrouw Farah hem na de training op',
    },
    {
      id: 'B1:writing:batch028-ophalen:1',
      proposed: 'dat Jari in de klas mag wachten tot ik er ben?',
      expected: 'Jari in de klas mag wachten tot ik er ben',
    },
    {
      id: 'B1:writing:batch028-dienstruil:1',
      answer: 'jij neemt mijn ochtenddienst van zondag 27 september over',
      proposed: 'als jij mijn ochtenddienst van zondag 27 september overneemt.',
      expected: 'jij mijn ochtenddienst van zondag 27 september overneemt',
    },
    {
      id: 'B1:writing:batch014-verjaardag:1',
      answer: 'ik gisteren niet kon reizen door een treinstoring',
      proposed: 'want ik kon gisteren niet reizen door een treinstoring.',
      expected: 'ik kon gisteren niet reizen door een treinstoring',
    },
  ];
  for (const entry of cases) {
    const item = exercise(entry.id),
      submitted = entry.answer || item.sample,
      result = validateFeedback(
        marked(item, submitted, [true, false], entry.proposed),
        item,
        submitted,
      );
    assert.equal(result.corrected_text, entry.expected, item.id);
    assert.doesNotMatch(result.corrected_text, /\[|\]/, item.id);
    assert.deepEqual(
      result.criteria.map((criterion: any) => criterion.met),
      [true, false],
    );
  }
});

test('a complete sentence in an open gap keeps its sentence context', () => {
  const item = exercise('B1:writing:batch014-afscheid:1'),
    correction = 'Vanaf 1 november ga ik werken bij een ander bedrijf.',
    result = validateFeedback(
      marked(item, item.sample, [true, false], correction),
      item,
      item.sample,
    );
  assert.equal(result.corrected_text, correction);
});

test('missing content and grammar need only a placeholder for the missing content', () => {
  const item = exercise('B1:writing:batch014-ziekmelding:1'),
    submitted = 'ik wil naar de winkel gaan',
    correction = 'Daarom [gevolg van de ziekte].',
    result = validateFeedback(marked(item, submitted, [false, false], correction), item, submitted);
  assert.equal(result.corrected_text, '[gevolg van de ziekte]');
  assert.deepEqual(
    result.criteria.map((criterion: any) => criterion.met),
    [false, false],
  );
  assert.equal((result.corrected_text.match(/\[[^\]]+\]/g) || []).length, 1);
  assert.ok(!result.corrected_text.includes(item.criteria[1][0]));
  assert.equal(result.next_step.nl, 'Vul dit punt aan: ' + item.criteria[0][0]);
});

test('an empty grammar repair retries rather than returning a grammar instruction as wording', async () => {
  await offline(async (warnings) => {
    const item = exercise('B1:writing:batch014-ziekmelding:1'),
      requests: any[] = [],
      correction = 'kan ik vandaag niet naar mijn werk komen',
      result = await assessWithRetry(
        item,
        item.sample,
        provider(requests, (attempt) =>
          marked(item, item.sample, [true, false], attempt === 1 ? '' : correction),
        ),
      );
    assert.equal(requests.length, 2);
    assert.match(requests[1].instructions, /corrected-text-empty/);
    assert.equal(result.corrected_text, correction);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /corrected-text-empty/);
  });
});

test('copying the full printed email is rejected and retried as a gap-only repair', async () => {
  await offline(async (warnings) => {
    const item = exercise('B1:writing:batch014-ziekmelding:1'),
      requests: any[] = [],
      correction = 'kan ik vandaag niet naar mijn werk komen',
      fullEmail =
        item.scaffold.salutation +
        '\n' +
        item.scaffold.body.replace('___', correction) +
        '\n' +
        item.scaffold.closing,
      result = await assessWithRetry(
        item,
        item.sample,
        provider(requests, (attempt) =>
          marked(item, item.sample, [true, false], attempt === 1 ? fullEmail : correction),
        ),
      );
    assert.equal(requests.length, 2);
    assert.match(requests[1].instructions, /corrected-text-context/);
    assert.equal(result.corrected_text, correction);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /corrected-text-context/);
  });
});

test('open writing tasks still require placeholders for every missing factual point', () => {
  const item = exercise('A2:writing:batch008-cadeau:1'),
    submitted = 'Hoi Julio, ik wil onze docent bedanken. Ik wil een kaart geven. Groetjes, Sara',
    missingAmount = item.criteria[2][0],
    missingInvitation = item.criteria[3][0],
    result = validateFeedback(
      marked(
        item,
        submitted,
        [true, true, false, false],
        'Hoi Julio, ik wil onze docent bedanken. Ik wil een kaart geven. Groetjes, Sara',
      ),
      item,
      submitted,
    );
  assert.equal(
    result.corrected_text,
    'Hoi Julio, ik wil onze docent bedanken. Ik wil een kaart geven.\n[' +
      missingAmount +
      ']\n[' +
      missingInvitation +
      ']\nGroetjes, Sara',
  );
  assert.equal(result.comment.nl, 'Je hebt 2 van de 4 punten duidelijk genoemd.');
  assert.equal(result.comment.en, 'You clearly covered 2 of 4 points.');
  assert.equal(result.next_step.nl, 'Vul dit punt aan: ' + missingAmount);
  assert.equal((result.corrected_text.match(/\[[^\]]+\]/g) || []).length, 2);
});

test('a second empty grammar repair still fails closed', async () => {
  await offline(async (warnings) => {
    const item = exercise('B1:writing:batch014-ziekmelding:1'),
      requests: any[] = [];
    await assert.rejects(
      assessWithRetry(
        item,
        item.sample,
        provider(requests, () => marked(item, item.sample, [true, false], '')),
      ),
      (error: unknown) =>
        error instanceof FeedbackRejected && error.reason === 'corrected-text-empty',
    );
    assert.equal(requests.length, 2);
    assert.match(warnings.at(-1)!, /rejected again \(corrected-text-empty\)/);
  });
});

test('a repaired sentence with missing content retries for a semantic placeholder', async () => {
  await offline(async (warnings) => {
    const item = exercise('B1:writing:batch014-ziekmelding:1'),
      submitted = 'ik wil naar de winkel gaan',
      requests: any[] = [],
      result = await assessWithRetry(
        item,
        submitted,
        provider(requests, (attempt) =>
          marked(
            item,
            submitted,
            [false, false],
            attempt === 1 ? 'wil ik naar de winkel gaan' : '[gevolg van de ziekte]',
          ),
        ),
      );
    assert.equal(requests.length, 2);
    assert.match(requests[1].instructions, /corrected-text-placeholders/);
    assert.equal(result.corrected_text, '[gevolg van de ziekte]');
    assert.deepEqual(
      result.criteria.map((criterion: any) => criterion.met),
      [false, false],
    );
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /corrected-text-placeholders/);
  });
});

test('a second sentence repair without its missing content placeholder fails closed', async () => {
  await offline(async (warnings) => {
    const item = exercise('B1:writing:batch014-ziekmelding:1'),
      submitted = 'ik wil naar de winkel gaan',
      requests: any[] = [];
    await assert.rejects(
      assessWithRetry(
        item,
        submitted,
        provider(requests, () =>
          marked(item, submitted, [false, false], 'wil ik naar de winkel gaan'),
        ),
      ),
      (error: unknown) =>
        error instanceof FeedbackRejected && error.reason === 'corrected-text-placeholders',
    );
    assert.equal(requests.length, 2);
    assert.match(warnings.at(-1)!, /rejected again \(corrected-text-placeholders\)/);
  });
});
