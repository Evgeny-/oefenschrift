import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
export class StoreError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
const fingerprint = (value) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 16);
// Retention the Privacy page promises, applied at startup and once a day: anonymous
// learning events feed statistics that look back at most 90 days; a resolved report goes
// a year after it was filed.
export const EVENT_RETENTION_DAYS = 90,
  REPORT_RETENTION_DAYS = 365;
const parts = ['reading', 'listening', 'writing', 'speaking', 'knm'];
export function validateExercise(item) {
  if (
    !item ||
    typeof item !== 'object' ||
    Array.isArray(item) ||
    !/^[-\w:]{1,120}$/.test(item.id || '') ||
    !parts.includes(item.part) ||
    !['A2', 'B1', 'B2', 'KNM'].includes(item.level) ||
    typeof item.title !== 'string' ||
    !item.title.trim() ||
    item.title.length > 240
  )
    throw new StoreError('Include a stable ID, title, subject and level.');
  if (JSON.stringify(item).length > 40000)
    throw new StoreError('An exercise must be smaller than 40 KB.');
  if (['writing', 'speaking'].includes(item.part)) {
    if (
      typeof item.prompt !== 'string' ||
      !item.prompt.trim() ||
      !Array.isArray(item.criteria) ||
      !item.criteria.length ||
      item.criteria.length > 10 ||
      !item.criteria.every(
        (c) =>
          Array.isArray(c) && c.length === 2 && c.every((s) => typeof s === 'string' && s.trim()),
      )
    )
      throw new StoreError('Open tasks need a prompt and Dutch/English criteria.');
  } else {
    if (
      !Array.isArray(item.questions) ||
      !item.questions.length ||
      item.questions.length > 30 ||
      !item.questions.every(
        (q) =>
          typeof q.id === 'string' &&
          typeof q.prompt === 'string' &&
          q.prompt.trim() &&
          q.options &&
          Object.keys(q.options).length >= 2 &&
          Object.values(q.options).every((s) => typeof s === 'string' && s.trim()) &&
          Object.hasOwn(q.options, q.answer) &&
          typeof q.explanation === 'string',
      )
    )
      throw new StoreError(
        'Questions need IDs, prompts, answer choices, a valid answer key and an explanation.',
      );
    if (new Set(item.questions.map((q) => q.id)).size !== item.questions.length)
      throw new StoreError('Question IDs must be unique.');
  }
  if (
    item.audio &&
    !(typeof item.audio === 'string' && /^\/?audio\/[a-zA-Z0-9_.-]+$/.test(item.audio))
  )
    throw new StoreError('Audio must reference a local audio file.');
  return item;
}
export class ContentStore {
  db: DatabaseSync;
  prunedAt = 0;
  constructor(path, catalogue = [], sets = []) {
    if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
    this.db = new DatabaseSync(path);
    this.db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
    this.db
      .exec(`CREATE TABLE IF NOT EXISTS schema_migrations(version INTEGER PRIMARY KEY,applied_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS exercises(id TEXT PRIMARY KEY,published TEXT,draft TEXT,archived INTEGER NOT NULL DEFAULT 0,version INTEGER NOT NULL DEFAULT 1,source_hash TEXT,updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS practice_sets(id TEXT PRIMARY KEY,payload TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS reports(id INTEGER PRIMARY KEY,item_id TEXT NOT NULL,question_id TEXT,kind TEXT NOT NULL,message TEXT NOT NULL,created_at INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'open',item_version TEXT);
      CREATE TABLE IF NOT EXISTS exercise_history(id INTEGER PRIMARY KEY,item_id TEXT NOT NULL,version INTEGER NOT NULL,payload TEXT,operation TEXT NOT NULL,created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS service_stats(day TEXT NOT NULL,service TEXT NOT NULL,calls INTEGER NOT NULL DEFAULT 0,failures INTEGER NOT NULL DEFAULT 0,total_ms INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(day,service));
      CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY,created_at INTEGER NOT NULL,day TEXT NOT NULL,visitor TEXT NOT NULL,kind TEXT NOT NULL,item_id TEXT,question_id TEXT,selected TEXT,correct INTEGER,lang TEXT,level TEXT,mode TEXT);
      CREATE INDEX IF NOT EXISTS events_day ON events(day,kind);
      CREATE INDEX IF NOT EXISTS events_item ON events(item_id,question_id);`);
    if (
      !this.db
        .prepare('PRAGMA table_info(reports)')
        .all()
        .some((row) => row.name === 'item_version')
    )
      this.db.exec('ALTER TABLE reports ADD COLUMN item_version TEXT');
    // Token counts arrive with the provider response; older rows keep zero.
    if (
      !this.db
        .prepare('PRAGMA table_info(service_stats)')
        .all()
        .some((row) => row.name === 'input_tokens')
    )
      this.db.exec(
        'ALTER TABLE service_stats ADD COLUMN input_tokens INTEGER NOT NULL DEFAULT 0; ALTER TABLE service_stats ADD COLUMN output_tokens INTEGER NOT NULL DEFAULT 0;',
      );
    // Operator settings: the provider switches and daily caps (schema migration 3).
    this.db.exec(
      'CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL,updated_at TEXT NOT NULL)',
    );
    for (const version of [1, 2, 3])
      this.db
        .prepare('INSERT OR IGNORE INTO schema_migrations VALUES(?,?)')
        .run(version, new Date().toISOString());
    // Reviewed JSON remains the import source; runtime drafts are never published by startup.
    this.db.exec('BEGIN IMMEDIATE');
    try {
      for (const item of catalogue) {
        const old = this.db.prepare('SELECT * FROM exercises WHERE id=?').get(item.id),
          hash = fingerprint(item),
          now = new Date().toISOString();
        if (!old)
          this.db
            .prepare('INSERT INTO exercises(id,published,source_hash,updated_at) VALUES(?,?,?,?)')
            .run(item.id, JSON.stringify(item), hash, now);
        else if (old.source_hash !== hash) {
          this.history(old, 'reviewed-import');
          this.db
            .prepare(
              'UPDATE exercises SET published=?,source_hash=?,version=version+1,updated_at=? WHERE id=?',
            )
            .run(JSON.stringify(item), hash, now, item.id);
        }
      }
      for (const set of sets)
        this.db
          .prepare('INSERT OR IGNORE INTO practice_sets VALUES(?,?)')
          .run(set.id, JSON.stringify(set));
      this.db.exec('COMMIT');
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
    this.pruneEvents();
  }
  pruneEvents(now = Date.now()) {
    if (now - this.prunedAt < 86400000) return 0;
    this.prunedAt = now;
    const events = this.db
        .prepare('DELETE FROM events WHERE day<?')
        .run(new Date(now - EVENT_RETENTION_DAYS * 86400000).toISOString().slice(0, 10)).changes,
      reports = this.db
        .prepare("DELETE FROM reports WHERE status='resolved' AND created_at<?")
        .run(Math.floor(now / 1000) - REPORT_RETENTION_DAYS * 86400).changes;
    return Number(events) + Number(reports);
  }
  history(row, operation) {
    this.db
      .prepare(
        'INSERT INTO exercise_history(item_id,version,payload,operation,created_at) VALUES(?,?,?,?,?)',
      )
      .run(row.id, row.version, row.draft || row.published, operation, new Date().toISOString());
  }
  list() {
    return this.db
      .prepare('SELECT * FROM exercises ORDER BY rowid')
      .all()
      .map((row) => ({
        ...row,
        id: String(row.id),
        archived: Number(row.archived),
        version: Number(row.version),
        updated_at: String(row.updated_at),
        published: row.published ? JSON.parse(String(row.published)) : null,
        draft: row.draft ? JSON.parse(String(row.draft)) : null,
      }));
  }
  catalogue() {
    return this.list()
      .filter((row) => row.published && !row.archived)
      .map((row) => row.published);
  }
  sets() {
    const ids = new Set(this.catalogue().map((i) => i.id));
    return this.db
      .prepare('SELECT payload FROM practice_sets ORDER BY rowid')
      .all()
      .map((row) => JSON.parse(String(row.payload)))
      .map((set) => ({ ...set, ids: set.ids.filter((id) => ids.has(id)) }))
      .filter((set) => set.ids.length);
  }
  get(id) {
    return this.list().find((row) => row.id === id) || null;
  }
  saveDraft(item, expectedVersion) {
    validateExercise(item);
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db.prepare('SELECT * FROM exercises WHERE id=?').get(item.id),
        now = new Date().toISOString();
      if (row) {
        if (expectedVersion !== row.version)
          throw new StoreError('This exercise changed. Reload before saving.', 409);
        this.history(row, 'save-draft');
        this.db
          .prepare('UPDATE exercises SET draft=?,version=version+1,updated_at=? WHERE id=?')
          .run(JSON.stringify(item), now, item.id);
      } else {
        if (expectedVersion !== 0) throw new StoreError('Exercise not found.', 404);
        this.db
          .prepare('INSERT INTO exercises(id,draft,updated_at) VALUES(?,?,?)')
          .run(item.id, JSON.stringify(item), now);
      }
      this.db.exec('COMMIT');
      return this.get(item.id);
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
  }
  archive(id, archived, expectedVersion) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const row = this.db.prepare('SELECT * FROM exercises WHERE id=?').get(id);
      if (!row) throw new StoreError('Exercise not found.', 404);
      if (expectedVersion !== row.version)
        throw new StoreError('This exercise changed. Reload before saving.', 409);
      this.history(row, archived ? 'archive' : 'restore');
      this.db
        .prepare('UPDATE exercises SET archived=?,version=version+1,updated_at=? WHERE id=?')
        .run(archived ? 1 : 0, new Date().toISOString(), id);
      this.db.exec('COMMIT');
      return this.get(id);
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
  }
  report(data) {
    const item = this.catalogue().find((i) => i.id === data?.item_id);
    if (
      !item ||
      !['unclear', 'answer', 'level', 'audio', 'other'].includes(data.kind) ||
      typeof data.message !== 'string' ||
      data.message.length > 1200 ||
      !data.item_version ||
      data.item_version !== item.revision ||
      (data.question_id != null && !item.questions?.some((q) => q.id === data.question_id))
    )
      throw new StoreError('Invalid report or outdated exercise. Reload and try again.');
    const result = this.db
      .prepare(
        'INSERT INTO reports(item_id,question_id,kind,message,created_at,item_version) VALUES(?,?,?,?,?,?)',
      )
      .run(
        item.id,
        data.question_id ?? null,
        data.kind,
        data.message.trim(),
        Math.floor(Date.now() / 1000),
        item.revision,
      );
    return { id: Number(result.lastInsertRowid), status: 'queued' };
  }
  reports() {
    return this.db.prepare('SELECT * FROM reports ORDER BY created_at DESC,id DESC').all();
  }
  resolveReport(id, status) {
    if (!['open', 'resolved'].includes(status)) throw new StoreError('Invalid report status.');
    if (!this.db.prepare('UPDATE reports SET status=? WHERE id=?').run(status, id).changes)
      throw new StoreError('Report not found.', 404);
  }
  statistic(
    service,
    failed,
    ms,
    usage: { input_tokens?: number; output_tokens?: number } | null = null,
  ) {
    if (!['feedback', 'transcribe'].includes(service)) return;
    const tokens = (key) => Math.max(0, Math.round(Number(usage?.[key]) || 0));
    this.db
      .prepare(
        'INSERT INTO service_stats(day,service,calls,failures,total_ms,input_tokens,output_tokens) VALUES(?,?,1,?,?,?,?) ON CONFLICT(day,service) DO UPDATE SET calls=calls+1,failures=failures+excluded.failures,total_ms=total_ms+excluded.total_ms,input_tokens=input_tokens+excluded.input_tokens,output_tokens=output_tokens+excluded.output_tokens',
      )
      .run(
        new Date().toISOString().slice(0, 10),
        service,
        failed ? 1 : 0,
        Math.max(0, Math.round(ms)),
        tokens('input_tokens'),
        tokens('output_tokens'),
      );
  }
  // A provider call that only produced token usage (a cached feedback result served twice still bills once).
  tokens(service, usage) {
    if (!['feedback', 'transcribe'].includes(service)) return;
    this.db
      .prepare(
        'INSERT INTO service_stats(day,service,calls,failures,total_ms,input_tokens,output_tokens) VALUES(?,?,0,0,0,?,?) ON CONFLICT(day,service) DO UPDATE SET input_tokens=input_tokens+excluded.input_tokens,output_tokens=output_tokens+excluded.output_tokens',
      )
      .run(
        new Date().toISOString().slice(0, 10),
        service,
        Math.max(0, Math.round(Number(usage?.input_tokens) || 0)),
        Math.max(0, Math.round(Number(usage?.output_tokens) || 0)),
      );
  }
  stats(limit = 60) {
    return this.db
      .prepare('SELECT * FROM service_stats ORDER BY day DESC,service LIMIT ?')
      .all(limit);
  }
  // Requests counted today (UTC) for a service, cache hits and refusals included; the
  // daily cap compares against this number.
  callsToday(service, now = Date.now()) {
    const row = this.db
      .prepare('SELECT calls FROM service_stats WHERE day=? AND service=?')
      .get(new Date(now).toISOString().slice(0, 10), service) as any;
    return Number(row?.calls || 0);
  }
  setting(key) {
    const row = this.db.prepare('SELECT value FROM settings WHERE key=?').get(key) as any;
    return row ? String(row.value) : null;
  }
  setSetting(key, value) {
    if (!/^[a-z_]{1,64}$/.test(key)) throw new StoreError('Invalid setting.');
    if (value === null) this.db.prepare('DELETE FROM settings WHERE key=?').run(key);
    else
      this.db
        .prepare(
          'INSERT INTO settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at',
        )
        .run(key, String(value), new Date().toISOString());
  }
  // Anonymous learning events. The visitor value is already hashed by the caller;
  // correctness is decided here from the answer key, never taken from the client.
  recordEvents(visitor, events, now = Date.now()) {
    if (
      typeof visitor !== 'string' ||
      !/^[a-f0-9]{32}$/.test(visitor) ||
      !Array.isArray(events) ||
      !events.length ||
      events.length > 50
    )
      throw new StoreError('Invalid events.');
    this.pruneEvents(now);
    const catalogue = this.catalogue(),
      day = new Date(now).toISOString().slice(0, 10),
      insert = this.db.prepare(
        'INSERT INTO events(created_at,day,visitor,kind,item_id,question_id,selected,correct,lang,level,mode) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
      );
    const rows = [];
    for (const event of events) {
      if (!event || typeof event !== 'object') continue;
      const lang = ['nl', 'en'].includes(event.lang) ? event.lang : null,
        level = ['A2', 'B1', 'B2'].includes(event.level) ? event.level : null;
      if (event.kind === 'visit') {
        rows.push(['visit', null, null, null, null, lang, level, null]);
        continue;
      }
      const item = catalogue.find((i) => i.id === event.item);
      if (!item) continue;
      if (event.kind === 'answer') {
        const question = item.questions?.find((q) => q.id === event.question);
        if (!question || !Object.hasOwn(question.options, event.selected)) continue;
        rows.push([
          'answer',
          item.id,
          question.id,
          event.selected,
          question.answer === event.selected ? 1 : 0,
          lang,
          level,
          ['practice', 'mock', 'retry', 'check'].includes(event.mode) ? event.mode : 'practice',
        ]);
      } else if (event.kind === 'review' && !item.questions && ['ai', 'self'].includes(event.mode))
        rows.push(['review', item.id, null, null, null, lang, level, event.mode]);
    }
    if (!rows.length) return 0;
    this.db.exec('BEGIN');
    try {
      for (const row of rows) insert.run(now, day, visitor, ...row);
      this.db.exec('COMMIT');
    } catch (e) {
      this.db.exec('ROLLBACK');
      throw e;
    }
    return rows.length;
  }
  serviceEvent(kind, visitor, itemId, now = Date.now()) {
    if (
      !['feedback', 'transcribe'].includes(kind) ||
      typeof visitor !== 'string' ||
      !/^[a-f0-9]{32}$/.test(visitor)
    )
      return;
    this.db
      .prepare('INSERT INTO events(created_at,day,visitor,kind,item_id) VALUES(?,?,?,?,?)')
      .run(now, new Date(now).toISOString().slice(0, 10), visitor, kind, itemId || null);
  }
  // Aggregates for administration. Nothing here returns a visitor value or free text.
  analytics(days = 30, now = Date.now()) {
    const dayOf = (offset) => new Date(now - offset * 86400000).toISOString().slice(0, 10),
      since = dayOf(days - 1),
      since7 = dayOf(6);
    const q = (sql, ...args): any[] => this.db.prepare(sql).all(...args);
    const daily = Object.fromEntries(
      Array.from({ length: days }, (_, i) => [
        dayOf(days - 1 - i),
        {
          day: dayOf(days - 1 - i),
          visitors: 0,
          answers: 0,
          correct: 0,
          reviews: 0,
          feedback: 0,
          transcribe: 0,
        },
      ]),
    );
    for (const row of q(
      'SELECT day,COUNT(DISTINCT visitor) visitors FROM events WHERE day>=? GROUP BY day',
      since,
    ))
      if (daily[row.day]) daily[row.day].visitors = Number(row.visitors);
    for (const row of q(
      "SELECT day,COUNT(*) answers,COALESCE(SUM(correct),0) correct FROM events WHERE kind='answer' AND day>=? GROUP BY day",
      since,
    ))
      if (daily[row.day])
        Object.assign(daily[row.day], {
          answers: Number(row.answers),
          correct: Number(row.correct),
        });
    for (const row of q(
      "SELECT day,kind,COUNT(*) n FROM events WHERE kind IN ('review','feedback','transcribe') AND day>=? GROUP BY day,kind",
      since,
    ))
      if (daily[String(row.day)])
        daily[String(row.day)][String(row.kind) === 'review' ? 'reviews' : String(row.kind)] =
          Number(row.n);
    const count = (sql, ...args) => Number((this.db.prepare(sql).get(...args) as any)?.n || 0);
    const catalogue = this.catalogue(),
      meta = Object.fromEntries(catalogue.map((item) => [item.id, item]));
    const byItem = q(
      "SELECT item_id,COUNT(*) answers,COALESCE(SUM(correct),0) correct,COUNT(DISTINCT visitor) visitors FROM events WHERE kind='answer' AND day>=? GROUP BY item_id",
      since,
    ).map((row) => ({
      item: String(row.item_id),
      answers: Number(row.answers),
      correct: Number(row.correct),
      visitors: Number(row.visitors),
    }));
    const parts = {};
    for (const row of byItem) {
      const item = meta[row.item];
      if (!item) continue;
      const key = item.part + '/' + item.level;
      parts[key] ??= { part: item.part, level: item.level, answers: 0, correct: 0 };
      parts[key].answers += row.answers;
      parts[key].correct += row.correct;
    }
    const reviewsByItem = q(
      "SELECT item_id,COUNT(*) n,COUNT(DISTINCT visitor) visitors,SUM(CASE WHEN mode='ai' THEN 1 ELSE 0 END) ai FROM events WHERE kind='review' AND day>=? GROUP BY item_id",
      since,
    ).map((row) => ({
      item: String(row.item_id),
      reviews: Number(row.n),
      visitors: Number(row.visitors),
      ai: Number(row.ai),
    }));
    const hardest = q(
      "SELECT item_id,question_id,COUNT(*) n,COALESCE(SUM(correct),0) correct FROM events WHERE kind='answer' AND day>=? GROUP BY item_id,question_id HAVING COUNT(*)>=3 ORDER BY SUM(correct)*1.0/COUNT(*) ASC,COUNT(*) DESC LIMIT 10",
      since,
    ).map((row) => {
      const item = meta[String(row.item_id)],
        question = item?.questions?.find((x) => x.id === row.question_id);
      const wrong = this.db
        .prepare(
          "SELECT selected,COUNT(*) n FROM events WHERE kind='answer' AND item_id=? AND question_id=? AND correct=0 AND day>=? GROUP BY selected ORDER BY n DESC LIMIT 1",
        )
        .get(row.item_id, row.question_id, since) as any;
      return {
        item: String(row.item_id),
        title: item?.title || String(row.item_id),
        question: String(row.question_id),
        prompt: question?.prompt || '',
        answers: Number(row.n),
        correct: Number(row.correct),
        answer: question?.answer || null,
        wrong: wrong ? { option: String(wrong.selected), count: Number(wrong.n) } : null,
      };
    });
    const split = (key) =>
      q(
        `SELECT ${key} value,COUNT(DISTINCT visitor) visitors FROM events WHERE kind='visit' AND day>=? AND ${key} IS NOT NULL GROUP BY ${key}`,
        since,
      ).map((row) => ({ value: String(row.value), visitors: Number(row.visitors) }));
    return {
      days,
      since,
      daily: Object.values(daily),
      visitors7: count('SELECT COUNT(DISTINCT visitor) n FROM events WHERE day>=?', since7),
      visitors: count('SELECT COUNT(DISTINCT visitor) n FROM events WHERE day>=?', since),
      returning: count(
        'SELECT COUNT(*) n FROM (SELECT visitor FROM events WHERE day>=? GROUP BY visitor HAVING COUNT(DISTINCT day)>=2)',
        since,
      ),
      learners: count(
        "SELECT COUNT(DISTINCT visitor) n FROM events WHERE day>=? AND kind IN ('answer','review')",
        since,
      ),
      answers7: count("SELECT COUNT(*) n FROM events WHERE kind='answer' AND day>=?", since7),
      correct7: count(
        "SELECT COALESCE(SUM(correct),0) n FROM events WHERE kind='answer' AND day>=?",
        since7,
      ),
      feedback7: count(
        "SELECT COALESCE(SUM(calls),0) n FROM service_stats WHERE service='feedback' AND day>=?",
        since7,
      ),
      parts: Object.values(parts),
      byItem,
      reviewsByItem,
      hardest,
      lang: split('lang'),
      level: split('level'),
      services: q('SELECT * FROM service_stats WHERE day>=? ORDER BY day', since),
      reportsOpen: count("SELECT COUNT(*) n FROM reports WHERE status='open'"),
    };
  }
  questionStats(itemId, days = 90, now = Date.now()) {
    const since = new Date(now - (days - 1) * 86400000).toISOString().slice(0, 10),
      item = this.get(itemId)?.published;
    if (!item?.questions) return [];
    return item.questions.map((question) => {
      const rows = this.db
        .prepare(
          "SELECT selected,COUNT(*) n FROM events WHERE kind='answer' AND item_id=? AND question_id=? AND day>=? GROUP BY selected",
        )
        .all(itemId, question.id, since) as any[];
      const answers = rows.reduce((n, row) => n + Number(row.n), 0);
      return {
        id: question.id,
        prompt: question.prompt,
        answer: question.answer,
        answers,
        correct: Number(rows.find((row) => row.selected === question.answer)?.n || 0),
        options: Object.keys(question.options).map((option) => ({
          option,
          count: Number(rows.find((row) => row.selected === option)?.n || 0),
        })),
      };
    });
  }
  close() {
    this.db.close();
  }
}
const stores = (globalThis.__inburgeringStores ??= new Map());
export function getStore() {
  const path = resolve(process.env.INBURGERING_DB || 'var/reports.sqlite3');
  if (!stores.has(path))
    stores.set(
      path,
      new ContentStore(
        path,
        JSON.parse(readFileSync('content/catalogue.json', 'utf8')),
        JSON.parse(readFileSync('content/practice-sets.json', 'utf8')),
      ),
    );
  return stores.get(path);
}
