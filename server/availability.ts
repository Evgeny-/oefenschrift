import { setting as environmentSetting } from '../environment';
// Whether a paid service is offered right now. One answer feeds the status endpoint, the
// server render and the API guard, so the interface and the server never disagree:
//   available = key configured && operator switch on && breaker closed && under the daily cap
// Switches and caps live in the settings table and survive restarts; breakers do not.
import { getStore, StoreError } from './store';
import { keys, ServiceError } from './services';
import { paused, resume as closeBreaker, type Service } from './breaker';
export type { Service };
export const SERVICES: Service[] = ['feedback', 'speech'];
export const LABELS = { feedback: 'AI feedback', speech: 'Speech recognition' };
const stat = { feedback: 'feedback', speech: 'transcribe' },
  keyName = { feedback: 'OPENAI_API_KEY', speech: 'ELEVENLABS_API_KEY' },
  capVariable = {
    feedback: 'FEEDBACK_DAILY_CAP',
    speech: 'SPEECH_DAILY_CAP',
  },
  refusal = {
    feedback: 'AI feedback is not available right now.',
    speech: 'Speech recognition is not available right now.',
  };
export const DEFAULT_CAPS = { feedback: 2000, speech: 600 },
  CAP_MAX = 1000000;
const validCap = (value: unknown) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= CAP_MAX ? n : null;
};
export function defaultCap(service: Service) {
  return validCap(environmentSetting(capVariable[service])) ?? DEFAULT_CAPS[service];
}
export type Reason = 'unconfigured' | 'off' | 'paused' | 'cap' | null;
export type ServiceState = {
  service: Service;
  configured: boolean;
  enabled: boolean;
  cap: number;
  today: number;
  pause: { until: number; reason: 'errors' | 'rejected' } | null;
  capped: boolean;
  available: boolean;
  reason: Reason;
};
export function serviceState(service: Service, now = Date.now(), store = getStore()) {
  const configured = !!keys()[keyName[service]],
    enabled = store.setting(service + '_enabled') !== 'off',
    cap = validCap(store.setting(service + '_daily_cap')) ?? defaultCap(service),
    today = store.callsToday(stat[service], now),
    pause = paused(service, now),
    capped = today >= cap;
  const reason: Reason = !configured
    ? 'unconfigured'
    : !enabled
      ? 'off'
      : pause
        ? 'paused'
        : capped
          ? 'cap'
          : null;
  return {
    service,
    configured,
    enabled,
    cap,
    today,
    pause,
    capped,
    available: !reason,
    reason,
  } satisfies ServiceState;
}
export function availability(now = Date.now(), store = getStore()) {
  return {
    feedback: serviceState('feedback', now, store),
    speech: serviceState('speech', now, store),
  };
}
// What the browser learns: whether each service is offered, and whether an absent service
// is a temporary state (configured but off, paused or capped) rather than never offered.
export function serviceStatus(now = Date.now(), store = getStore()) {
  const { feedback, speech } = availability(now, store);
  return {
    feedback: feedback.available,
    speech: speech.available,
    feedbackPaused: feedback.configured && !feedback.available,
    speechPaused: speech.configured && !speech.available,
  };
}
// Called before any provider work; the refusal carries a code such as feedback_off.
export function guard(service: Service, now = Date.now(), store = getStore()) {
  const state = serviceState(service, now, store);
  if (!state.available) throw new ServiceError(refusal[service], 503, service + '_' + state.reason);
  return state;
}
export function setEnabled(service: Service, enabled: boolean, store = getStore()) {
  store.setSetting(service + '_enabled', enabled ? null : 'off');
}
export function setCap(service: Service, value: unknown, store = getStore()) {
  const cap = validCap(value);
  if (cap === null) throw new StoreError(`Use a whole number between 1 and ${CAP_MAX}.`);
  store.setSetting(service + '_daily_cap', String(cap));
}
export function resume(service: Service) {
  closeBreaker(service);
}
