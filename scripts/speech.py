"""Dutch transcription for the single editable speaking answer."""
import json, math, os, subprocess, tempfile, urllib.request, urllib.error, uuid
from service_config import keys
class SpeechError(Exception):pass
MIMES={'audio/webm':'webm','audio/ogg':'ogg','audio/mp4':'m4a','audio/mpeg':'mp3','audio/wav':'wav','audio/x-wav':'wav'}
def validate_audio(audio,mime):
    if not 100<=len(audio)<=6*1024*1024 or mime not in MIMES:raise SpeechError('Use an audio recording under 6 MB.')
    if not (audio.startswith((b'RIFF',b'OggS',b'ID3',b'\x1aE\xdf\xa3')) or audio[4:8]==b'ftyp' or audio[:1]==b'\xff'):raise SpeechError('Audio format not recognized.')
    with tempfile.NamedTemporaryFile(suffix='.'+MIMES[mime]) as f:
        f.write(audio);f.flush()
        try:
            command=['ffprobe','-v','error','-protocol_whitelist','file,pipe','-show_entries','format=duration:stream=codec_type','-of','json',f.name]
            info=json.loads(subprocess.run(command,capture_output=True,check=True,timeout=10).stdout)
            if not info.get('streams') or any(s.get('codec_type')!='audio' for s in info['streams']):raise ValueError()
            duration=info.get('format',{}).get('duration')
            if duration is None:
                packets=json.loads(subprocess.run(['ffprobe','-v','error','-protocol_whitelist','file,pipe','-show_entries','packet=pts_time,duration_time','-of','json',f.name],capture_output=True,check=True,timeout=10).stdout)['packets']
                duration=max(float(p.get('pts_time',0))+float(p.get('duration_time',0)) for p in packets)
            duration=float(duration)
            if not math.isfinite(duration) or not .1<=duration<=125:raise ValueError()
        except (ValueError,KeyError,subprocess.SubprocessError,FileNotFoundError):raise SpeechError('Use a valid audio-only recording, up to two minutes.') from None
    return duration

def transcribe(audio,mime):
    key=keys().get('ELEVENLABS_API_KEY')
    if not key:raise SpeechError('Speech recognition is not configured.')
    boundary='inburgering-'+uuid.uuid4().hex;parts=[]
    fields={'model_id':'scribe_v2','language_code':'nld','timestamps_granularity':'word','tag_audio_events':'false','diarize':'false','temperature':'0','seed':'0'}
    for name,value in fields.items():parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode())
    parts.extend([f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="recording.{MIMES[mime]}"\r\nContent-Type: {mime}\r\n\r\n'.encode(),audio,f'\r\n--{boundary}--\r\n'.encode()])
    req=urllib.request.Request('https://api.elevenlabs.io/v1/speech-to-text',data=b''.join(parts),headers={'xi-api-key':key,'Content-Type':f'multipart/form-data; boundary={boundary}'},method='POST')
    try:
        with urllib.request.urlopen(req,timeout=60) as r:result=json.load(r)
    except urllib.error.HTTPError as e:raise SpeechError(f'Transcription provider returned HTTP {e.code}.') from None
    except (urllib.error.URLError,TimeoutError,ValueError):raise SpeechError('Transcription is unavailable. Try again.') from None
    text=result.get('text','').strip()
    if not text or len(text)>6000:raise SpeechError('No usable speech was found. Please record again.')
    words=[]
    for w in result.get('words',[]):
        if w.get('type')!='word':continue
        logprob=w.get('logprob');uncertain=isinstance(logprob,(float,int)) and math.isfinite(logprob) and logprob< -1
        words.append({'text':str(w.get('text','')),'start':w.get('start'),'end':w.get('end'),'uncertain':uncertain})
    return {'text':text,'words':words,'model':'scribe_v2','has_word_confidence':any('logprob' in w for w in result.get('words',[]))}
