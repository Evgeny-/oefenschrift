import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { formatTime } from '../domain/study';
import { analyseRecording } from '../domain/audio';
import { AudioPlayback } from './AudioPlayer';
import { RecordingInfo } from './Controls';
import { visitorId } from '../domain/telemetry';
export default function SpeakingRecorder({ item, onTranscript, onBusy, inputToggle }) {
  const { t, api } = useStudyContext();
  const [phase, setPhase] = useState('idle'),
    [blob, setBlob] = useState(null),
    [preview, setPreview] = useState(null),
    [seconds, setSeconds] = useState(0),
    [error, setError] = useState('');
  const recorder = useRef(null),
    stream = useRef(null),
    timer = useRef(null),
    request = useRef(null),
    mounted = useRef(true),
    callbacks = useRef({ onTranscript, onBusy });
  callbacks.current = { onTranscript, onBusy };
  const busy = ['requesting', 'recording', 'transcribing'].includes(phase);
  useEffect(() => {
    callbacks.current.onBusy(busy);
  }, [busy]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current?.abort();
      clearInterval(timer.current);
      if (recorder.current?.state === 'recording') recorder.current.stop();
      stream.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  useEffect(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    let active = true;
    setPreview({ url, peaks: [], duration: 0 });
    analyseRecording(blob)
      .then((data) => {
        if (active) setPreview({ url, ...data });
      })
      .catch(() => {});
    // Unsupported decoding keeps the regular seek bar; playback is independent.
    return () => {
      active = false;
      URL.revokeObjectURL(url);
    };
  }, [blob]);
  function stop() {
    if (recorder.current?.state === 'recording') recorder.current.stop();
    clearInterval(timer.current);
  }
  async function transcribe(recording) {
    if (!api?.speech) {
      setPhase('ready');
      setError(
        t(
          'Spraakherkenning is niet beschikbaar. Typ je antwoord hieronder.',
          'Speech recognition is unavailable. You can type your answer.',
        ),
      );
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setPhase('transcribing');
    setError('');
    try {
      const bytes = new Uint8Array(await recording.arrayBuffer());
      let binary = '';
      for (let i = 0; i < bytes.length; i += 32768)
        binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          mime: recording.type || 'audio/webm',
          audio: btoa(binary),
          visitor: visitorId(),
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) throw Error();
      if (controller.signal.aborted || !mounted.current) return;
      if (!result.text?.trim()) throw Error();
      callbacks.current.onTranscript(result.text);
      setPhase('ready');
    } catch (e) {
      if ((!(e instanceof Error) || e.name !== 'AbortError') && mounted.current) {
        setPhase('failed');
        setError(
          t(
            'Omzetten lukt niet. Je opname is bewaard; probeer opnieuw of typ je antwoord.',
            'Transcription failed. Your recording is still here; retry or type your answer.',
          ),
        );
      }
    }
  }
  async function record() {
    request.current?.abort();
    setError('');
    setSeconds(0);
    setPhase('requesting');
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw Error();
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) {
        media.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = media;
      const mime = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4'].find((type) =>
        MediaRecorder.isTypeSupported(type),
      );
      const rec = new MediaRecorder(media, mime ? { mimeType: mime } : undefined);
      recorder.current = rec;
      const chunks = [];
      let bytes = 0,
        failed = false;
      rec.ondataavailable = (e) => {
        if (e.data.size) {
          chunks.push(e.data);
          bytes += e.data.size;
          if (bytes > 6 * 1024 * 1024) stop();
        }
      };
      rec.onerror = () => {
        failed = true;
        stop();
        if (mounted.current) {
          setError(t('Opnemen is mislukt. Probeer opnieuw.', 'Recording failed. Please retry.'));
          setPhase('idle');
        }
      };
      rec.onstop = () => {
        clearInterval(timer.current);
        media.getTracks().forEach((track) => track.stop());
        if (!mounted.current || failed) return;
        const recording = new Blob(chunks, { type: rec.mimeType });
        if (recording.size > 6 * 1024 * 1024) {
          setError(
            t('Neem een korter antwoord op (max. 6 MB).', 'Record a shorter answer (up to 6 MB).'),
          );
          setPhase('idle');
          return;
        }
        setBlob(recording);
        transcribe(recording);
      };
      rec.start(250);
      setPhase('recording');
      const started = Date.now();
      timer.current = setInterval(() => {
        const sec = Math.floor((Date.now() - started) / 1000);
        setSeconds(sec);
        if (sec >= 120) stop();
      }, 250);
    } catch (e) {
      if (!mounted.current) return;
      stream.current?.getTracks().forEach((track) => track.stop());
      setPhase('idle');
      setError(
        e instanceof Error && e.name === 'NotAllowedError'
          ? t(
              'Geef toegang tot de microfoon of typ je antwoord.',
              'Allow microphone access or type your answer.',
            )
          : t(
              'Opnemen lukt niet. Je kunt je antwoord typen.',
              'Recording is unavailable. You can type your answer.',
            ),
      );
    }
  }
  return (
    <div className="speaking-recorder">
      <div className="recorder-actions">
        <div className="record-control">
          <button
            className={phase === 'recording' ? 'record-button recording' : 'record-button'}
            onClick={phase === 'recording' ? stop : record}
            disabled={['requesting', 'transcribing'].includes(phase)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {phase === 'recording' ? (
                <rect x="6" y="6" width="12" height="12" rx="1" />
              ) : (
                <>
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5 10h2v2a5 5 0 0 0 10 0v-2h2v2a7 7 0 0 1-6 6.93V21h3v2H8v-2h3v-2.07A7 7 0 0 1 5 12z" />
                </>
              )}
            </svg>
            {phase === 'recording'
              ? t('Stop en zet om', 'Stop & transcribe')
              : phase === 'requesting'
                ? t('Microfoon openen…', 'Opening microphone…')
                : blob
                  ? t('Opnieuw', 'Record again')
                  : t('Opnemen', 'Record')}
          </button>
          <RecordingInfo />
        </div>
        {phase === 'recording' && (
          <span className="recording-time">{formatTime(seconds)} / 2:00</span>
        )}
        {inputToggle}
      </div>
      {preview && (
        <div className="recording-preview">
          <AudioPlayback
            key={preview.url}
            src={preview.url}
            peaks={preview.peaks}
            knownDuration={preview.duration}
            t={t}
            label={t('Je opname', 'Your recording')}
            suspended={phase === 'requesting' || phase === 'recording'}
          />
        </div>
      )}
      {phase === 'transcribing' && (
        <p className="processing-status" role="status">
          {t('Je opname wordt omgezet…', 'Transcribing your recording…')}
        </p>
      )}
      {error && (
        <p className="feedback-error" role="alert">
          {error}
        </p>
      )}
      {phase === 'failed' && (
        <button className="text-button" onClick={() => transcribe(blob)}>
          {t('Opnieuw proberen', 'Retry transcription')}
        </button>
      )}
    </div>
  );
}
