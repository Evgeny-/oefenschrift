import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const sha = (text: string) => createHash('sha256').update(text).digest('hex');

export function mediaErrors(catalogue: any[], audio: any[], images: any[], exists = existsSync) {
  const errors: string[] = [];
  const clips = new Map(audio.map((clip) => [clip.key, clip]));
  const pictures = new Map(images.map((picture) => [picture.file, picture]));
  function clip(key: string, file: string, text: string) {
    const record = clips.get(key);
    if (!file || !/^audio\/[\w.-]+$/.test(file) || !exists('assets/' + file))
      errors.push(`${key}: generated audio file missing`);
    if (!record || record.file !== file || record.script_sha256 !== sha(text))
      errors.push(`${key}: audio does not match the reviewed script`);
    const words = text.trim().split(/\s+/).length;
    if (
      !record ||
      !Number.isFinite(record.wer) ||
      record.wer > (words < 10 ? 0.15 : 0.04) ||
      (words >= 10 && record.inserted >= 2)
    )
      errors.push(`${key}: audio transcription round trip has not passed`);
  }
  for (const item of catalogue) {
    if (item.script?.length)
      clip(`${item.id}#fragment`, item.audio, item.script.map((turn) => turn.text).join('\n'));
    if (item.part === 'listening' && item.intro)
      clip(`${item.id}#intro`, item.introAudio, item.intro);
    if (['listening', 'knm'].includes(item.part))
      for (const question of item.questions || []) {
        if (question.script?.length)
          clip(
            `${item.id}#${question.id}-fragment`,
            question.audio,
            question.script.map((turn) => turn.text).join('\n'),
          );
        const text =
          item.part === 'knm'
            ? [
                question.prompt,
                ...Object.entries(question.options).map(([key, value]) => `${key}. ${value}`),
              ].join('\n')
            : question.prompt;
        clip(`${item.id}#${question.id}`, question.questionAudio, text);
      }
    if (item.part === 'speaking') {
      clip(`${item.id}#prompt`, item.promptAudio, item.prompt);
      if (item.cue) clip(`${item.id}#cue`, item.cueAudio, item.cue.text);
    }
    if (item.imageBrief) errors.push(`${item.id}: illustration brief has not been generated`);
    for (const picture of item.images || []) {
      if (
        !picture.file ||
        !/^images\/[\w.-]+$/.test(picture.file) ||
        !exists('assets/' + picture.file)
      )
        errors.push(`${item.id}: illustration file missing`);
      if (picture.brief) {
        const record = pictures.get(picture.file);
        if (!record || record.brief !== picture.brief || record.reviewed !== true)
          errors.push(`${item.id}: illustration has not passed review for its current brief`);
      }
    }
  }
  return errors;
}

export function checkMedia() {
  const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
  const catalogue = read('content/catalogue.json');
  const images = read('content/image-manifest.json');
  const failures = mediaErrors(catalogue, read('content/audio-manifest.json'), images);
  const usedPictures = new Set(
    catalogue.flatMap((item) => (item.images || []).map((picture) => picture.file)),
  );
  for (const picture of images) {
    if (
      !usedPictures.has(picture.file) ||
      !picture.file_sha256 ||
      !existsSync('assets/' + picture.file)
    )
      continue;
    const actual = createHash('sha256')
      .update(readFileSync('assets/' + picture.file))
      .digest('hex');
    if (actual !== picture.file_sha256)
      failures.push(`${picture.key}: illustration bytes changed after review`);
  }
  if (failures.length) throw Error('Media checks failed:\n' + failures.join('\n'));
  console.log('Verified required media files, script hashes, audio round trips and image reviews.');
}
