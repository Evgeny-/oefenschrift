import React from 'react';
import { Slider } from '@base-ui/react/slider';
import { isSilent, toggledMute, updateVolume, withLevel } from '../domain/volume';
import { useVolume, useVolumeAdjustable } from '../useVolume';

// A speaker in the rounded icon language: a muted speaker carries a cross, a quiet one
// a single wave and a louder one two.
export function VolumeIcon({ level }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 10v4a1 1 0 0 0 1 1h3l4.4 3.6c.6.5 1.6.1 1.6-.8V6.2c0-.9-1-1.3-1.6-.8L7.5 9h-3a1 1 0 0 0-1 1z" />
      {level === 0 ? (
        <path d="m16.5 9.5 5 5m0-5-5 5" />
      ) : (
        <>
          <path d="M16.5 9a4 4 0 0 1 0 6" />
          {level >= 0.5 && <path d="M19 6a8 8 0 0 1 0 12" />}
        </>
      )}
    </svg>
  );
}
// The volume sits in the player's time row beside the speed choice. One level serves every
// player and clip button on the site and is remembered in this browser.
export default function VolumeControl({ t }) {
  const volume = useVolume(),
    adjustable = useVolumeAdjustable(),
    shown = isSilent(volume) ? 0 : volume.level;
  return (
    <div className="audio-volume">
      <button
        type="button"
        className="volume-button"
        onClick={() => updateVolume(toggledMute)}
        aria-label={isSilent(volume) ? t('Geluid aan', 'Unmute') : t('Geluid uit', 'Mute')}
      >
        <VolumeIcon level={shown} />
      </button>
      {adjustable && (
        <Slider.Root
          className="volume-slider"
          value={shown}
          min={0}
          max={1}
          step={0.05}
          largeStep={0.25}
          format={{ style: 'percent' }}
          onValueChange={(value) => updateVolume((current) => withLevel(current, value))}
        >
          <Slider.Control className="volume-control">
            <Slider.Track className="volume-track">
              <Slider.Indicator className="volume-indicator" />
              <Slider.Thumb className="volume-thumb" getAriaLabel={() => t('Volume', 'Volume')} />
            </Slider.Track>
          </Slider.Control>
        </Slider.Root>
      )}
    </div>
  );
}
