import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';
import { DEFAULT_VOLUME, currentVolume, subscribeVolume } from './domain/volume';

// The server renders full volume; the stored level replaces it right after hydration.
export function useVolume() {
  return useSyncExternalStore(subscribeVolume, currentVolume, () => DEFAULT_VOLUME);
}
// Every <audio> element follows the shared volume, including the small clip buttons.
export function useAudioVolume(audio: RefObject<HTMLAudioElement | null>) {
  const volume = useVolume();
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = volume.level;
    el.muted = volume.muted;
  }, [audio, volume]);
  return volume;
}
// iOS leaves volume to the hardware buttons: a scripted level is ignored and reads back as 1.
// There the slider is hidden and only the mute button remains.
let adjustable: boolean | undefined;
function volumeAdjustable() {
  if (adjustable === undefined)
    try {
      const probe = new Audio();
      probe.volume = 0.5;
      adjustable = probe.volume === 0.5;
    } catch {
      adjustable = false;
    }
  return adjustable;
}
export function useVolumeAdjustable() {
  const [value, setValue] = useState(true);
  useEffect(() => setValue(volumeAdjustable()), []);
  return value;
}
