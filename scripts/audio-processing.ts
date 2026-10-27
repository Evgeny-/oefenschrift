export const VOICE_NOISE_REDUCTION = {
  'spectral-v1': 'highpass=f=80,afftdn=nr=12:nf=-42:tn=1:gs=8',
} as const;
export type VoiceProcessing = Record<
  string,
  { preset: string; filter: string; stage: 'after-level-match' }
>;

export function audioProcessingFor(voices: any, roles: string[]): VoiceProcessing | undefined {
  const processing: VoiceProcessing = {};
  for (const role of new Set(roles)) {
    const preset = voices.roles[role]?.noiseReduction;
    if (preset === undefined) continue;
    if (typeof preset !== 'string' || !Object.hasOwn(VOICE_NOISE_REDUCTION, preset))
      throw Error(`Voice role "${role}" has an unknown noise-reduction preset.`);
    processing[role] = {
      preset,
      filter: VOICE_NOISE_REDUCTION[preset],
      stage: 'after-level-match',
    };
  }
  return Object.keys(processing).length ? processing : undefined;
}

export function assertProcessingMode(mode: string, processing?: VoiceProcessing) {
  if (mode === 'dialogue' && processing)
    throw Error('Per-voice noise reduction requires stitched synthesis.');
}
