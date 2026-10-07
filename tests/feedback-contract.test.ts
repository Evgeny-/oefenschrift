import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assess, assessWithRetry, FeedbackRejected, feedbackSchemaFor } from '../server/services';

const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8')),
  exercises = catalogue.filter((item) => ['writing', 'speaking'].includes(item.part)),
  answer = 'Ik oefen Nederlands.';

function judgment(item: any) {
  return {
    on_task: true,
    criteria: item.criteria.map((_: any, index: number) => ({
      index,
      met: true,
      uncertain: false,
      evidence: answer,
      feedback: { nl: 'Duidelijk.', en: 'Clear.' },
    })),
    corrected_text: answer,
  };
}

function completed(result: any) {
  return Response.json({
    status: 'completed',
    output: [{ content: [{ type: 'output_text', text: JSON.stringify(result) }] }],
  });
}

function provider(requests: any[], respond: (attempt: number) => Response): typeof fetch {
  return async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.equal(options?.headers?.['Authorization'], 'Bearer test-placeholder');
    requests.push(JSON.parse(options?.body as string));
    return respond(requests.length);
  };
}

async function offline(run: (warnings: string[]) => Promise<void>) {
  const names = ['OPENAI_API_KEY', 'OEFENSCHRIFT_CREDENTIALS_FILE'],
    before = names.map((name) => process.env[name]),
    warnings: string[] = [],
    originalWarn = console.warn;
  process.env.OPENAI_API_KEY = 'test-placeholder';
  process.env.OEFENSCHRIFT_CREDENTIALS_FILE = '/nonexistent/feedback-contract-test.env';
  console.warn = (...messages: unknown[]) => warnings.push(messages.join(' '));
  try {
    await run(warnings);
  } finally {
    console.warn = originalWarn;
    for (const [index, name] of names.entries()) {
      if (before[index] === undefined) delete process.env[name];
      else process.env[name] = before[index];
    }
  }
}

function retryInstructions(requests: any[]) {
  assert.equal(requests.length, 2, 'a rejected response receives one fresh attempt');
  assert.ok(requests[1].instructions.startsWith(requests[0].instructions));
  return requests[1].instructions.slice(requests[0].instructions.length);
}

function assertRejection(reason: string) {
  return (error: unknown) => error instanceof FeedbackRejected && error.reason === reason;
}

test('every published writing and speaking exercise constrains the provider to its full rubric', async () => {
  await offline(async (warnings) => {
    assert.ok(exercises.length > 0);
    assert.ok(exercises.some((item) => item.part === 'writing'));
    assert.ok(exercises.some((item) => item.part === 'speaking'));
    for (const item of exercises) {
      const requests: any[] = [],
        result = await assess(
          item,
          answer,
          provider(requests, () => completed(judgment(item))),
        ),
        request = requests[0],
        criteriaSchema = request.text.format.schema.properties.criteria,
        indices = item.criteria.map((_: any, index: number) => index),
        task = JSON.parse(request.input[0].content);
      assert.equal(requests.length, 1, item.id);
      assert.equal(request.text.format.strict, true, item.id);
      assert.equal(criteriaSchema.minItems, item.criteria.length, item.id);
      assert.equal(criteriaSchema.maxItems, item.criteria.length, item.id);
      assert.equal(task.criteria_count, item.criteria.length, item.id);
      for (const variant of criteriaSchema.items.anyOf)
        assert.deepEqual(variant.properties.index.enum, indices, item.id);
      assert.deepEqual(
        task.criteria.map((criterion: any) => criterion.index),
        indices,
        item.id,
      );
      assert.deepEqual(
        task.criteria.map((criterion: any) => criterion.criterion),
        item.criteria.map((criterion: any) => criterion[0]),
        item.id,
      );
      assert.equal(request.input[1].content, answer, item.id);
      assert.deepEqual(
        result.criteria.map((criterion: any) => criterion.index),
        indices,
        item.id,
      );
    }
    assert.deepEqual(warnings, []);
  });
});

test('request schemas stay independent when rubric lengths change between requests', () => {
  const byCount = new Map<number, any>(exercises.map((item) => [item.criteria.length, item])),
    snapshots = [...byCount.values()].map((item) => ({ item, schema: feedbackSchemaFor(item) }));
  for (const { item, schema } of snapshots) {
    assert.equal(schema.properties.criteria.minItems, item.criteria.length);
    assert.equal(schema.properties.criteria.maxItems, item.criteria.length);
    for (const variant of schema.properties.criteria.items.anyOf)
      assert.deepEqual(
        variant.properties.index.enum,
        item.criteria.map((_: any, index: number) => index),
      );
  }
});

test('an exercise with a new rubric length receives a matching provider contract', async () => {
  await offline(async () => {
    const item = {
        ...exercises[0],
        id: 'synthetic:seven-criteria',
        criteria: Array.from({ length: 7 }, (_, index) => [
          `Oefen punt ${index + 1}.`,
          `Practise point ${index + 1}.`,
        ]),
      },
      requests: any[] = [],
      result = await assess(
        item,
        answer,
        provider(requests, () => completed(judgment(item))),
      ),
      schema = requests[0].text.format.schema.properties.criteria,
      task = JSON.parse(requests[0].input[0].content);
    assert.equal(schema.minItems, 7);
    assert.equal(schema.maxItems, 7);
    for (const variant of schema.items.anyOf)
      assert.deepEqual(variant.properties.index.enum, [0, 1, 2, 3, 4, 5, 6]);
    assert.equal(task.criteria_count, 7);
    assert.equal(result.criteria.length, 7);
  });
});

test('the four-point cadeau exercise retries a missing assessment with the correct count', async () => {
  await offline(async (warnings) => {
    const item = exercises.find((entry) => entry.id === 'A2:writing:batch008-cadeau:1');
    assert.ok(item, 'the production incident exercise remains covered');
    assert.equal(item.criteria.length, 4);
    const requests: any[] = [],
      result = await assessWithRetry(
        item,
        answer,
        provider(requests, (attempt) => {
          const response = judgment(item);
          if (attempt === 1) response.criteria.pop();
          return completed(response);
        }),
      ),
      note = retryInstructions(requests);
    assert.match(note, /criteria-count/);
    assert.match(note, /exactly\s+4\b/i);
    assert.match(note, /0\s*,\s*1\s*,\s*2\s*,\s*3/);
    assert.doesNotMatch(note, /previous judgment quoted words/i);
    assert.equal(result.criteria.length, 4);
    assert.deepEqual(
      result.criteria.map((criterion: any) => criterion.index),
      [0, 1, 2, 3],
    );
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /criteria-count/);
  });
});

test('a second wrong criterion count fails closed for every published rubric length', async () => {
  await offline(async (warnings) => {
    const byCount = new Map<number, any>(exercises.map((item) => [item.criteria.length, item]));
    for (const item of byCount.values()) {
      const requests: any[] = [],
        offset = warnings.length;
      await assert.rejects(
        assessWithRetry(
          item,
          answer,
          provider(requests, (attempt) => {
            const response = judgment(item);
            if (attempt === 1) response.criteria.pop();
            else response.criteria.push({ ...response.criteria[0], index: item.criteria.length });
            return completed(response);
          }),
        ),
        assertRejection('criteria-count'),
      );
      assert.match(
        retryInstructions(requests),
        new RegExp(`exactly\\s+${item.criteria.length}\\b`, 'i'),
      );
      assert.equal(warnings.length - offset, 2);
      assert.match(warnings.at(-1)!, /rejected again \(criteria-count\)/);
    }
  });
});

test('an evidence mismatch keeps its quote-specific retry guidance', async () => {
  await offline(async (warnings) => {
    const item = exercises[0],
      requests: any[] = [],
      result = await assessWithRetry(
        item,
        answer,
        provider(requests, (attempt) => {
          const response = judgment(item);
          if (attempt === 1) response.criteria[0].evidence = 'Verzonnen woorden over een fiets.';
          return completed(response);
        }),
      ),
      note = retryInstructions(requests);
    assert.match(note, /evidence-not-in-answer/);
    assert.match(note, /character for character/);
    assert.match(note, /learner answer/);
    assert.doesNotMatch(note, /criteria-count/);
    assert.equal(result.criteria[0].evidence, answer);
    assert.equal(warnings.length, 1);
  });
});

test('other malformed responses retry with the actual rejection reason', async () => {
  await offline(async () => {
    const item = exercises[0],
      cases = [
        {
          reason: 'criteria-order',
          response: () => {
            const result = judgment(item);
            result.criteria[1].index = 0;
            return completed(result);
          },
        },
        {
          reason: 'on-task-type',
          response: () => completed({ ...judgment(item), on_task: 'true' }),
        },
        {
          reason: 'corrected-text-type',
          response: () => completed({ ...judgment(item), corrected_text: null }),
        },
        {
          reason: 'feedback-languages',
          response: () => {
            const result: any = judgment(item);
            result.criteria[0].feedback = { nl: 'Duidelijk.' };
            return completed(result);
          },
        },
        {
          reason: 'output-unparseable',
          response: () =>
            Response.json({
              status: 'completed',
              output: [{ content: [{ type: 'output_text', text: '{' }] }],
            }),
        },
        {
          reason: 'response-incomplete:max_output_tokens',
          response: () =>
            Response.json({
              status: 'incomplete',
              incomplete_details: { reason: 'max_output_tokens' },
            }),
        },
      ];
    for (const entry of cases) {
      const requests: any[] = [],
        result = await assessWithRetry(
          item,
          answer,
          provider(requests, (attempt) =>
            attempt === 1 ? entry.response() : completed(judgment(item)),
          ),
        ),
        note = retryInstructions(requests);
      assert.ok(note.includes(entry.reason), entry.reason);
      assert.doesNotMatch(note, /previous judgment quoted words/i, entry.reason);
      assert.equal(result.criteria.length, item.criteria.length);
    }
  });
});

test('incomplete and unreadable second attempts log their final reason and still reject', async () => {
  await offline(async (warnings) => {
    const item = exercises[0],
      cases = [
        {
          reason: 'response-incomplete:max_output_tokens',
          response: () =>
            Response.json({
              status: 'incomplete',
              incomplete_details: { reason: 'max_output_tokens' },
            }),
        },
        { reason: 'response-unreadable', response: () => new Response('{') },
      ];
    for (const entry of cases) {
      const requests: any[] = [],
        offset = warnings.length;
      await assert.rejects(
        assessWithRetry(
          item,
          answer,
          provider(requests, (attempt) => {
            if (attempt === 2) return entry.response();
            const result = judgment(item);
            result.criteria.pop();
            return completed(result);
          }),
        ),
        assertRejection(entry.reason),
      );
      assert.equal(requests.length, 2);
      assert.equal(warnings.length - offset, 2);
      assert.ok(warnings.at(-1)!.includes(`rejected again (${entry.reason})`));
    }
  });
});
