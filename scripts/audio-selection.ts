// A replacement run addresses existing clip jobs, rather than every clip on an item.
// Validate the entire selection before credentials or provider requests are needed.
export function parseAudioKeys(json: string): string[] {
  let keys: unknown;
  try {
    keys = JSON.parse(json);
  } catch {
    throw Error('Audio keys must be a JSON array of exact, unique job keys.');
  }
  if (
    !Array.isArray(keys) ||
    !keys.length ||
    keys.some((key) => typeof key !== 'string' || !key || key.trim() !== key)
  )
    throw Error('Audio keys must be a nonempty JSON array of exact job keys.');
  if (new Set(keys).size !== keys.length) throw Error('Audio keys contain duplicate job keys.');
  return keys;
}

export function selectAudioJobs<T extends { key: string }>(jobs: T[], keys?: string[]): T[] {
  if (!keys) return jobs;
  const wanted = new Set(keys);
  const known = new Set(jobs.map((job) => job.key));
  if (keys.some((key) => !known.has(key)))
    throw Error('Audio keys contain a job key that is absent from the selected source.');
  return jobs.filter((job) => wanted.has(job.key));
}

export function audioOption(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  if (args.lastIndexOf(name) !== index) throw Error(`${name} can only be supplied once.`);
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw Error(`${name} requires a value.`);
  return value;
}
