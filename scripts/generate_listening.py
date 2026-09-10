"""Generate only the reviewed local listening catalogue, with cached audio."""
import array, hashlib, json, subprocess, sys, urllib.request, urllib.error, wave
from pathlib import Path
from service_config import ROOT, CONFIG, keys
from integrate_content import integrate
catalogue=integrate()
key=keys()['ELEVENLABS_API_KEY']
manifest=[]
for item in catalogue:
    if item['part']!='listening':continue
    token=hashlib.sha256((item['text']+CONFIG['voice_id']+CONFIG['voice_model']).encode()).hexdigest()[:16]
    target=ROOT/f'demo/audio/{token}.mp3'
    if not target.exists():
        body={'text':item['text'],'model_id':CONFIG['voice_model'],'language_code':'nl','voice_settings':CONFIG['voice_settings']}
        req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{CONFIG['voice_id']}?output_format=mp3_44100_128",data=json.dumps(body).encode(),headers={'xi-api-key':key,'Content-Type':'application/json'},method='POST')
        try:
            with urllib.request.urlopen(req,timeout=60) as r:audio=r.read()
        except urllib.error.HTTPError as e:raise SystemExit(f'ElevenLabs returned HTTP {e.code}; no credentials logged.')
        target.write_bytes(audio)
    wav=ROOT/f'tmp/{token}.wav'
    subprocess.run(['afconvert','-f','WAVE','-d','LEI16@22050',str(target),str(wav)],check=True,capture_output=True)
    with wave.open(str(wav)) as f:
        frames=f.getnframes();duration=frames/f.getframerate();samples=array.array('h',f.readframes(frames))
    if sys.byteorder!='little':samples.byteswap()
    step=max(1,len(samples)//64)
    rms=[(sum(v*v for v in samples[i:i+step])/len(samples[i:i+step]))**.5 for i in range(0,len(samples),step)][:64]
    item.update(audio=f'audio/{token}.mp3',duration=duration,peaks=[round(max(.08,n/max(rms)),3) for n in rms],voice='ElevenLabs · Dutch')
    manifest.append({'id':item['id'],'audio':item['audio'],'voice_id':CONFIG['voice_id'],'model':CONFIG['voice_model'],'text_sha256':hashlib.sha256(item['text'].encode()).hexdigest(),'duration':duration})
    print(f"Audio ready: {item['id']} ({duration:.1f}s)",flush=True)
(ROOT/'content/catalogue.json').write_text(json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n')
(ROOT/'content/audio-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
