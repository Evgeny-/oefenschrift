import copy,json,sys,threading,time,unittest,urllib.request,urllib.error
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
import server

class SharedFeedbackTests(unittest.TestCase):
    def setUp(self):
        server.CACHE.clear();server.PENDING.clear()
        self.item={'id':'synthetic:1','prompt':'Explain','criteria':[['Waarom?','Why?']]}
        self.result={'criteria':[{'index':0,'met':False,'uncertain':False,'evidence':'','feedback':{'nl':'Geen reden.','en':'No reason.'}}],'comment':{'nl':'Ontbreekt','en':'Missing'},'next_step':{'nl':'Vul aan','en':'Add it'},'corrected_text':''}
    def test_concurrent_languages_share_one_assessment(self):
        def grade(*args,**kwargs):time.sleep(.04);return copy.deepcopy(self.result)
        with patch.object(server,'assess',side_effect=grade) as assess:
            with ThreadPoolExecutor(max_workers=2) as pool:
                views=list(pool.map(lambda lang:server.display_feedback(server.shared_feedback(self.item,'Ik kan niet.',[],True),lang),['nl','en']))
            self.assertEqual(assess.call_count,1)
            self.assertNotEqual(views[0]['comment'],views[1]['comment'])
            self.assertEqual(views[0]['criteria'][0]['met'],views[1]['criteria'][0]['met'])
            server.shared_feedback(self.item,'Ik kan niet.',[],True);self.assertEqual(assess.call_count,1)
            server.shared_feedback(self.item,'Ik werk.',[],True);self.assertEqual(assess.call_count,2)
            with patch.object(server,'FEEDBACK_VERSION','new-rubric'):
                server.shared_feedback(self.item,'Ik werk.',[],True);self.assertEqual(assess.call_count,3)
    def test_failure_is_retryable_and_stale_hypotheses_do_not_change_confirmed_key(self):
        with patch.object(server,'assess',side_effect=[server.FeedbackError('failed'),self.result]) as assess:
            with self.assertRaises(server.FeedbackError):server.shared_feedback(self.item,'A',[],True)
            self.assertFalse(server.PENDING)
            self.assertEqual(server.shared_feedback(self.item,'A',[],True),self.result)
            self.assertEqual(assess.call_count,2)
        self.assertEqual(server.feedback_key(self.item,'A',[],True),server.feedback_key(self.item,'A',[{'text':'wrong'}],True))
        self.assertNotEqual(server.feedback_key(self.item,'A',[],False),server.feedback_key(self.item,'A',[{'text':'wrong'}],False))

class RouteServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.http=server.ThreadingHTTPServer(('127.0.0.1',0),server.Handler)
        cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True);cls.thread.start()
        cls.base=f'http://127.0.0.1:{cls.http.server_port}'
    @classmethod
    def tearDownClass(cls):cls.http.shutdown();cls.http.server_close();cls.thread.join()
    def test_deep_routes_get_current_shell_and_preserve_csp(self):
        for route in ['/reading','/exercise/A2%3Areading%3Ap1%3A1','/sets/a2-listening-01','/practice-test/session','/privacy']:
            for method in ['GET','HEAD']:
                req=urllib.request.Request(self.base+route,method=method,headers={'If-Modified-Since':'Thu, 01 Jan 2099 00:00:00 GMT'})
                with urllib.request.urlopen(req) as response:
                    self.assertEqual(response.status,200);self.assertEqual(response.headers['Cache-Control'],'no-store')
                    if method=='GET':
                        body=response.read().decode();self.assertIn("base-uri 'none'",body);self.assertRegex(body,r'/app\.js\?v=[a-f0-9]{12}')
    def test_missing_assets_are_not_returned_as_html_shell(self):
        for route in ['/missing.js','/audio/not-found.mp3','/not-an-app-route','/scripts/server.py']:
            with self.assertRaises(urllib.error.HTTPError) as error:urllib.request.urlopen(self.base+route)
            self.assertEqual(error.exception.code,404);error.exception.close()
    def test_static_app_assets_ignore_old_conditional_cache(self):
        with urllib.request.urlopen(urllib.request.Request(self.base+'/styles.css?v=old',headers={'If-Modified-Since':'Thu, 01 Jan 2099 00:00:00 GMT'})) as response:
            self.assertEqual(response.status,200);self.assertEqual(response.headers['Cache-Control'],'no-store')
