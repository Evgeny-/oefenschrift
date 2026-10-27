export type AudioCasting = Record<string, string>;

const record = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

function roleExists(voices: any, role: string) {
  return (
    Object.hasOwn(voices.roles || {}, role) &&
    typeof voices.roles[role]?.voice_id === 'string' &&
    voices.roles[role].voice_id.trim()
  );
}

function effectiveRole(casting: AudioCasting, source: string) {
  const visited = new Set<string>();
  let role = source;
  while (Object.hasOwn(casting, role)) {
    if (visited.has(role)) throw Error(`Audio casting contains a cycle at role "${role}".`);
    visited.add(role);
    role = casting[role];
  }
  return role;
}

export function validateAudioCasting(voices: any) {
  if (voices.casting === undefined) return;
  if (!record(voices.casting)) throw Error('Audio casting must map exercise IDs to role mappings.');
  for (const [itemId, mapping] of Object.entries(voices.casting)) {
    if (!itemId.trim() || !record(mapping))
      throw Error('Each exercise audio casting needs an ID and role mapping.');
    for (const [source, target] of Object.entries(mapping)) {
      if (!roleExists(voices, source) || typeof target !== 'string' || !roleExists(voices, target))
        throw Error(`Audio casting for "${itemId}" references an unknown voice role.`);
    }
    for (const role of Object.keys(mapping)) effectiveRole(mapping as AudioCasting, role);
  }
}

// Preserve the reviewed script's role labels. Only the configuration behind a role changes,
// so every fragment/question of one exercise gets the same voice and pacing settings.
export function audioVoicesForItem(voices: any, itemId: string) {
  const casting = voices.casting?.[itemId] as AudioCasting | undefined;
  if (!casting || !Object.keys(casting).length) return voices;
  return {
    ...voices,
    roles: Object.fromEntries(
      Object.keys(voices.roles).map((role) => [role, voices.roles[effectiveRole(casting, role)]]),
    ),
  };
}

export function audioCastingFor(
  voices: any,
  itemId: string,
  roles: string[],
): AudioCasting | undefined {
  const mapping = voices.casting?.[itemId] as AudioCasting | undefined;
  if (!mapping) return undefined;
  const casting = Object.fromEntries(
    [...new Set(roles)].flatMap((role) => {
      const effective = effectiveRole(mapping, role);
      return effective === role ? [] : [[role, effective]];
    }),
  );
  return Object.keys(casting).length ? casting : undefined;
}

export function assertDistinctAudioVoices(turns: { role: string }[], voices: any) {
  const roles = [...new Set(turns.map((turn) => turn.role))];
  for (const role of roles)
    if (!roleExists(voices, role))
      throw Error(`Voice role "${role}" has no voice_id in config/voices.json.`);
  if (turns.length > 1 && roles.length < 2)
    throw Error('A conversation needs two different voice roles.');
  if (new Set(roles.map((role) => voices.roles[role].voice_id)).size !== roles.length)
    throw Error('A conversation needs different effective voices after audio casting.');
  const ids = new Set(roles.map((role) => voices.roles[role].voice_id));
  for (const pairing of voices.disallowedPairings || []) {
    if (
      !Array.isArray(pairing.voiceIds) ||
      pairing.voiceIds.length !== 2 ||
      pairing.voiceIds.some((id: unknown) => typeof id !== 'string' || !id.trim())
    )
      throw Error('A disallowed voice pairing must name two voice IDs.');
    if (pairing.voiceIds.every((id: string) => ids.has(id)))
      throw Error('Voice pairing rejected by the saved listening preference: ' + pairing.reason);
  }
}

export function clipWithCasting<T extends { casting?: AudioCasting }>(
  clip: T,
  casting?: AudioCasting,
): T {
  const updated = { ...clip };
  if (casting) updated.casting = { ...casting };
  else delete updated.casting;
  return updated;
}
