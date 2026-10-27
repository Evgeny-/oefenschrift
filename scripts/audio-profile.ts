import { audioProcessingFor } from './audio-processing';

export type AudioProfile = {
  name: 'A1';
  speedMultiplier: number;
  gapSeconds: number;
};

export function audioProfileFor(item: { level?: string }, voices: any): AudioProfile | undefined {
  if (item.level !== 'A1') return undefined;
  const profile = voices.profiles?.A1;
  if (
    !Number.isFinite(profile?.speedMultiplier) ||
    profile.speedMultiplier <= 0 ||
    profile.speedMultiplier >= 1 ||
    !Number.isFinite(profile?.gapSeconds) ||
    profile.gapSeconds <= 0
  )
    throw Error(
      'A1 audio needs a slower speed multiplier and positive turn gap in config/voices.json.',
    );
  return { name: 'A1', speedMultiplier: profile.speedMultiplier, gapSeconds: profile.gapSeconds };
}

export function voiceSettingsFor(voices: any, role: string, profile?: AudioProfile) {
  const speed = voices.roles[role]?.speed ?? voices.settings.speed ?? 1;
  const a1Speed = voices.roles[role]?.a1Speed;
  if (a1Speed !== undefined && (!Number.isFinite(a1Speed) || a1Speed < 0.7 || a1Speed > 1.2))
    throw Error(`Voice role "${role}" needs an a1Speed between 0.7 and 1.2.`);
  return {
    ...voices.settings,
    speed: profile
      ? (a1Speed ??
        Math.max(0.7, Math.min(1.2, Math.round(speed * profile.speedMultiplier * 10000) / 10000)))
      : speed,
  };
}

export const turnGapFor = (voices: any, profile?: AudioProfile) =>
  profile?.gapSeconds ?? Number(voices.gapSeconds || 0.45);

export function audioModeFor(
  item: { level?: string; audioMode?: 'stitched' | 'dialogue' },
  turns: any[],
  voices: any,
): 'stitched' | 'dialogue' {
  return item.level === 'A1'
    ? 'stitched'
    : item.audioMode ||
        (turns.length > 1 ? voices.defaultConversationMode || 'stitched' : 'stitched');
}

// Keep the legacy fields and property order byte-for-byte: existing A2/B1 filenames
// depend on JSON.stringify of this object. A1 appends its pacing profile; deliberately
// processed voices add their filter and stage so untreated audio cannot alias the new clip.
export function audioCacheInput({
  text,
  roles,
  mode,
  turns,
  voices,
  pipeline,
  rate,
  profile,
  sourceFormat,
}: {
  text: string;
  roles: Record<string, string>;
  mode: 'stitched' | 'dialogue';
  turns: { role: string }[];
  voices: any;
  pipeline: string;
  rate: number;
  profile?: AudioProfile;
  sourceFormat?: string;
}) {
  const processing = audioProcessingFor(
    voices,
    turns.map((turn) => turn.role),
  );
  return {
    text,
    roles,
    model: mode === 'dialogue' ? voices.dialogueModel : voices.model,
    settings:
      mode === 'dialogue' && turns.length > 1
        ? voices.settings
        : Object.fromEntries(
            turns.map((turn) => [turn.role, voiceSettingsFor(voices, turn.role, profile)]),
          ),
    mode,
    loudness: voices.loudness,
    pipeline: `${pipeline}-${rate}`,
    ...(profile ? { profile } : {}),
    ...(sourceFormat === 'mp3_44100_192' ? { sourceFormat } : {}),
    ...(processing ? { processing } : {}),
  };
}
