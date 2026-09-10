#!/usr/bin/env python3
"""Loopback app server with bounded, same-origin service endpoints."""
import argparse, base64, hashlib, json, threading, time, uuid
from urllib.parse import unquote, urlsplit
from collections import OrderedDict
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from service_config import ROOT, CONFIG, keys
from feedback import assess, display_feedback, FEEDBACK_VERSION, FeedbackError
from speech import validate_audio,transcribe,SpeechError
from reports import add_report
CACHE=OrderedDict();SPEECH=OrderedDict();LOCK=threading.Lock();CALLS=[];TTL=1800
PENDING={}

def feedback_key(item,answer,contexts,confirmed):
    # Display language never changes the judgment. Prompt revisions invalidate it.
    return hashlib.sha256(json.dumps([FEEDBACK_VERSION,CONFIG['feedback_model'],item,answer,contexts if not confirmed else [],confirmed],sort_keys=True).encode()).hexdigest()

def shared_feedback(item,answer,contexts,confirmed):
    key=feedback_key(item,answer,contexts,confirmed)
    with LOCK:
        prune()
        cached=CACHE.get(key)
        if cached:return cached['result']
        pending=PENDING.get(key)
        owner=pending is None
        if owner:pending=PENDING[key]={'event':threading.Event()}
    if not owner:
        if not pending['event'].wait(55):raise FeedbackError('Feedback is still being prepared. Please retry.')
        if 'result' in pending:return pending['result']
        raise FeedbackError('Feedback unavailable. Please retry.')
    try:
        result=assess(item,answer,speech=contexts,speech_confirmed=confirmed)
        with LOCK:
            CACHE[key]={'result':result,'created':time.monotonic()};prune()
            pending['result']=result
        return result
    finally:
        with LOCK:
            PENDING.pop(key,None);pending['event'].set()

def app_route(path):
    path=unquote(urlsplit(path).path).rstrip('/') or '/'
    return path in {'/','/reading','/listening','/writing','/speaking','/knm','/practice-test','/practice-test/session','/progress','/about','/privacy'} or (path.startswith(('/exercise/','/sets/')) and len(path.split('/'))==3 and bool(path.split('/')[-1]))

def prune():
    now=time.monotonic()
    for cache in (CACHE,SPEECH):
        for key in list(cache):
            if now-cache[key]['created']>=TTL:del cache[key]
        while len(cache)>128:cache.popitem(last=False)

def cleanup():
    while True:
        time.sleep(15)
        with LOCK:prune()

class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT/'demo'),**kwargs)
    def log_message(self,*args):pass
    def allowed_host(self):return self.headers.get('Host') in {f'127.0.0.1:{self.server.server_port}',f'localhost:{self.server.server_port}'}
    def send_json(self,status,data):
        body=json.dumps(data,ensure_ascii=False).encode();self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(body)
    def static_allowed(self):return self.allowed_host() and Path(self.translate_path(self.path)).resolve().is_relative_to((ROOT/'demo').resolve())
    def send_head(self):
        if app_route(self.path):self.path='/index.html'
        path=urlsplit(self.path).path
        if path in {'/index.html','/offline.html','/app.js','/theme.js','/styles.css'}:
            # The local app shell must reflect the current build, even with old validators.
            for header in ('If-Modified-Since','If-None-Match'):
                if header in self.headers:del self.headers[header]
        return super().send_head()
    def end_headers(self):
        if urlsplit(self.path).path in {'/index.html','/offline.html','/app.js','/theme.js','/styles.css'}:
            self.send_header('Cache-Control','no-store')
        super().end_headers()
    def do_GET(self):
        if not self.allowed_host():return self.send_json(403,{'error':'Host rejected.'})
        if self.path=='/api/status':return self.send_json(200,{'feedback':bool(keys().get('OPENAI_API_KEY')),'speech':bool(keys().get('ELEVENLABS_API_KEY')),'reports':True,'model':CONFIG['feedback_model']})
        if not self.static_allowed():return self.send_json(403,{'error':'Path rejected.'})
        return super().do_GET()
    def do_HEAD(self):
        if not self.static_allowed():return self.send_json(403,{'error':'Path rejected.'})
        return super().do_HEAD()
    def do_POST(self):
        if not self.allowed_host() or self.headers.get('Origin') not in {f'http://127.0.0.1:{self.server.server_port}',f'http://localhost:{self.server.server_port}'}:return self.send_json(403,{'error':'Origin rejected.'})
        if self.path not in ['/api/feedback','/api/transcribe','/api/reports']:return self.send_json(404,{'error':'Not found.'})
        try:
            length=int(self.headers.get('Content-Length','0'));limit=9*1024*1024 if self.path=='/api/transcribe' else 16000
            if not 0<length<=limit or self.headers.get_content_type()!='application/json':raise ValueError()
            data=json.loads(self.rfile.read(length))
            if not isinstance(data,dict):raise ValueError()
            catalogue=json.loads((ROOT/'content/catalogue.json').read_text())
        except (ValueError,TypeError):return self.send_json(400,{'error':'Invalid request.'})
        with LOCK:
            now=time.monotonic();prune();CALLS[:]=[x for x in CALLS if now-x<60]
            if len(CALLS)>=30:return self.send_json(429,{'error':'Please wait a minute before making more requests.'})
            CALLS.append(now)
        if self.path=='/api/reports':
            try:return self.send_json(200,add_report(data,catalogue))
            except ValueError:return self.send_json(400,{'error':'Invalid exercise report.'})
        item=next((i for i in catalogue if i['id']==data.get('id') and i['part'] in ['writing','speaking']),None)
        if not item:return self.send_json(400,{'error':'Invalid exercise.'})
        if self.path=='/api/transcribe':return self.handle_speech(item,data)
        answer=data.get('answer');lang=data.get('lang');ids=data.get('speech_ids',[])
        if not isinstance(answer,str) or not 1<=len(answer.strip())<=3000 or lang not in ['nl','en'] or not isinstance(ids,list) or len(ids)>2 or not all(isinstance(x,str) for x in ids):return self.send_json(400,{'error':'Invalid answer.'})
        with LOCK:
            contexts=[SPEECH[x]['result'] for x in ids if x in SPEECH and SPEECH[x]['item_id']==item['id']]
        if len(contexts)!=len(ids):return self.send_json(409,{'error':'Transcription expired. Transcribe again or submit only the edited text.'})
        try:result=shared_feedback(item,answer,contexts,data.get('speech_confirmed') is True)
        except FeedbackError as e:return self.send_json(502,{'error':str(e)})
        except Exception:return self.send_json(502,{'error':'Feedback unavailable. Please try again.'})
        self.send_json(200,display_feedback(result,lang))
    def handle_speech(self,item,data):
        if item['part']!='speaking':return self.send_json(400,{'error':'Choose a speaking exercise.'})
        try:
            mime=data['mime'].split(';')[0];audio=base64.b64decode(data['audio'],validate=True)
            digest=hashlib.sha256(audio).hexdigest()
            with LOCK:cached=next((v['result'] for v in SPEECH.values() if v['item_id']==item['id'] and v['digest']==digest),None)
            if cached:return self.send_json(200,cached)
            duration=validate_audio(audio,mime)
            result=transcribe(audio,mime);token=uuid.uuid4().hex;result.update(id=token,duration=duration)
            with LOCK:SPEECH[token]={'item_id':item['id'],'digest':digest,'result':result,'created':time.monotonic()};prune()
            return self.send_json(200,result)
        except (ValueError,TypeError,KeyError,AttributeError):return self.send_json(400,{'error':'Invalid recording.'})
        except SpeechError as e:return self.send_json(422,{'error':str(e)})
        except Exception:return self.send_json(502,{'error':'Speech recognition unavailable.'})

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8766);args=parser.parse_args()
    threading.Thread(target=cleanup,daemon=True).start()
    with ThreadingHTTPServer(('127.0.0.1',args.port),Handler) as server:
        print(f'Inburgering: http://127.0.0.1:{args.port}/',flush=True)
        try:server.serve_forever()
        except KeyboardInterrupt:pass
if __name__=='__main__':main()
