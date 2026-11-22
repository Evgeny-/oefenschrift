import { VOLUME_KEY, readStored, writeStored } from './persistence';

// One playback volume for every player and clip button, remembered per browser.
export type Volume = { level: number; muted: boolean };
export const DEFAULT_VOLUME: Volume = Object.freeze({ level: 1, muted: false });

export function clampLevel(level: number) {
  return Number.isFinite(level) ? Math.round(Math.min(1, Math.max(0, level)) * 100) / 100 : 1;
}
// A malformed or missing entry falls back to full volume, never to silence.
export function parseVolume(raw: string | null): Volume {
  try {
    const value = JSON.parse(raw);
    if (typeof value?.level !== 'number' || !Number.isFinite(value.level)) return DEFAULT_VOLUME;
    return { level: clampLevel(value.level), muted: value.muted === true };
  } catch {
    return DEFAULT_VOLUME;
  }
}
export function readVolume(storage): Volume {
  return parseVolume(readStored(storage, VOLUME_KEY));
}
export function writeVolume(storage, volume: Volume) {
  return writeStored(storage, VOLUME_KEY, JSON.stringify(volume));
}
// Moving the slider above zero unmutes; at zero the mute state is left as it was.
export function withLevel(volume: Volume, level: number): Volume {
  const next = clampLevel(level);
  return { level: next, muted: next > 0 ? false : volume.muted };
}
// Unmuting a player that was turned all the way down restores half volume.
export function toggledMute(volume: Volume): Volume {
  if (volume.muted || volume.level === 0) return { level: volume.level || 0.5, muted: false };
  return { ...volume, muted: true };
}
export const isSilent = (volume: Volume) => volume.muted || volume.level === 0;

// The in-page store behind useVolume. Storage that throws or refuses a write leaves the
// volume working for this page; it is only not remembered.
let current: Volume | null = null;
const listeners = new Set<() => void>();
function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function notify() {
  for (const listener of listeners) listener();
}
function storageChanged(event: StorageEvent) {
  if (event.key !== null && event.key !== VOLUME_KEY) return;
  current = readVolume(browserStorage());
  notify();
}
export function currentVolume(): Volume {
  if (!current) current = readVolume(browserStorage());
  return current;
}
export function updateVolume(change: (volume: Volume) => Volume) {
  current = change(currentVolume());
  writeVolume(browserStorage(), current);
  notify();
}
export function subscribeVolume(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener('storage', storageChanged);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener('storage', storageChanged);
  };
}
