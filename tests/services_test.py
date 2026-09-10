import io,json,sys,tempfile,time,unittest,wave
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
import reports,server
from speech import validate_audio,SpeechError
class ServiceTests(unittest.TestCase):
 def test_report_keeps_only_explicit_feedback(self):
  with tempfile.TemporaryDirectory() as d:
   old=reports.DB;reports.DB=Path(d)/'queue.sqlite3'
   try:
    item={'id':'A2:reading:test:1','revision':'c1:test','questions':[{'id':'q1'}]}
    result=reports.add_report({'item_id':item['id'],'item_version':item['revision'],'question_id':'q1','kind':'answer','message':'Two choices seem correct.','answer':'PRIVATE','recording':'PRIVATE'},[item])
    with reports.connect() as db:
     row=db.execute('SELECT item_id,question_id,kind,message,status FROM reports WHERE id=?',(result['id'],)).fetchone()
    self.assertEqual(row,(item['id'],'q1','answer','Two choices seem correct.','open'))
    with self.assertRaises(ValueError):reports.add_report({'item_id':item['id'],'item_version':item['revision'],'question_id':'wrong','kind':'answer'},[item])
    for version in [None,'','old']:
     with self.assertRaises(ValueError):reports.add_report({'item_id':item['id'],'item_version':version,'kind':'answer'},[item])
    with reports.connect() as db:self.assertEqual(db.execute('SELECT item_version FROM reports').fetchone()[0],'c1:test')
   finally:reports.DB=old
 def test_audio_limits_and_real_duration(self):
  out=io.BytesIO()
  with wave.open(out,'wb') as wav:
   wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(16000);wav.writeframes(b'\0\0'*3200)
  self.assertAlmostEqual(validate_audio(out.getvalue(),'audio/wav'),.2,places=2)
  for audio,mime in [(b'x'*1000,'audio/webm'),(b'x'*(6*1024*1024+1),'audio/wav'),(out.getvalue(),'text/plain')]:
   with self.assertRaises(SpeechError):validate_audio(audio,mime)
 def test_expired_transcripts_and_feedback_are_removed(self):
  try:
   server.CACHE['old']={'created':time.monotonic()-1801,'result':{'sensitive':'answer'}}
   server.SPEECH['old']={'created':time.monotonic()-1801,'result':{'sensitive':'transcript'}}
   server.CACHE['new']={'created':time.monotonic(),'result':{}}
   server.prune()
   self.assertNotIn('old',server.CACHE);self.assertNotIn('old',server.SPEECH);self.assertIn('new',server.CACHE)
  finally:server.CACHE.clear();server.SPEECH.clear()
if __name__=='__main__':unittest.main()
