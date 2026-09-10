import hashlib,json,subprocess,sys,tempfile,unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
import integrate_content as content
class IntegrationTests(unittest.TestCase):
 def fixture(self,root):
  (root/'content/batches').mkdir(parents=True);(root/'content/reviews').mkdir()
  (root/'content/catalogue.json').write_text('[]')
  source=root/'content/batches/001-original.json'
  source.write_text(json.dumps([{'id':'test','level':'A2','part':'reading','title':'Test','text':'Morgen is het dicht.','questions':[{'id':'q1','prompt':'Wanneer?','options':{'A':'Morgen','B':'Vandaag'},'answer':'A','evidence':'Morgen is het dicht.'}]}]))
  review={'source':'content/batches/001-original.json','source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'ready_for_integration':True,'batch_verdict':'pass'}
  report=root/'content/reviews/001-review.json';report.write_text(json.dumps(review));return source,report
 def test_gate_survives_python_optimization_and_preserves_catalogue(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);source,_=self.fixture(root);source.write_text(source.read_text()+' ')
   script="import sys;from pathlib import Path;sys.path.insert(0,sys.argv[1]);import integrate_content as c;c.ROOT=Path(sys.argv[2]);c.integrate()"
   result=subprocess.run([sys.executable,'-O','-c',script,str(Path(content.__file__).parent),str(root)],capture_output=True)
   self.assertNotEqual(result.returncode,0);self.assertIn(b'differs from reviewed source',result.stderr)
   self.assertEqual((root/'content/catalogue.json').read_text(),'[]')
 def test_atomic_replace_failure_keeps_old_file_and_cleans_temp(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);self.fixture(root)
   with patch.object(content,'ROOT',root),patch.object(content.os,'replace',side_effect=OSError('disk failure')):
    with self.assertRaises(OSError):content.integrate()
   self.assertEqual((root/'content/catalogue.json').read_text(),'[]')
   self.assertEqual({p.name for p in (root/'content').iterdir()},{'batches','reviews','catalogue.json'})
 def test_approved_source_integrates_with_stable_revision(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);self.fixture(root)
   with patch.object(content,'ROOT',root):
    first=content.integrate();second=content.integrate()
   self.assertEqual(first,second);self.assertTrue(first[0]['revision'].startswith('c1:'))
 def test_starters_reject_changed_content_or_catalogue(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);folder=root/'content/hints';folder.mkdir(parents=True)
   catalogue=[{'id':'writing:1','criteria':[['Explain','Explain']]}]
   source=folder/'sentence-starters.json';source.write_text(json.dumps({'writing:1':['Ik wil …']}))
   review={'ready_for_integration':True,'verdict':'pass','source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'catalogue_sha256':hashlib.sha256((json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n').encode()).hexdigest()}
   (folder/'review.json').write_text(json.dumps(review))
   with patch.object(content,'ROOT',root):
    content.verify_starters(catalogue)
    with self.assertRaisesRegex(ValueError,'updated catalogue'):content.verify_starters([{**catalogue[0],'prompt':'Changed task'}])
    source.write_text(source.read_text()+' ')
    with self.assertRaisesRegex(ValueError,'differ from reviewed'):content.verify_starters(catalogue)
