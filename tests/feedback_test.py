"""Canonical decisions, localized display and quote integrity without paid calls."""
import copy, io, json, sys, unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
import feedback

class FeedbackTests(unittest.TestCase):
    item={'level':'A2','part':'writing','prompt':'Schrijf een bericht.','criteria':[['Zeg hallo.','Say hello.']]}

    def result(self):
        return {'comment':{'nl':'Duidelijk.','en':'Clear.'},
                'next_step':{'nl':'Oefen een andere opdracht.','en':'Practise another task.'},
                'corrected_text':'Hallo.',
                'criteria':[{'index':0,'met':True,'uncertain':False,'evidence':'Hallo',
                             'feedback':{'nl':'Je groet de lezer.','en':'You greet the reader.'}}]}

    def response(self,result=None):
        return io.BytesIO(json.dumps({'status':'completed','output':[{'content':[{'type':'output_text','text':json.dumps(result or self.result())}]}]}).encode())

    def call(self,result=None,**kwargs):
        with patch.object(feedback,'keys',return_value={'OPENAI_API_KEY':'test-placeholder'}),patch.object(feedback.urllib.request,'urlopen',return_value=self.response(result)):
            return feedback.assess(kwargs.pop('item',self.item),kwargs.pop('answer','Hallo'),**kwargs)

    def test_model_override_omits_unsupported_reasoning(self):
        with patch.object(feedback,'keys',return_value={'OPENAI_API_KEY':'test-placeholder'}),patch.object(feedback.urllib.request,'urlopen',return_value=self.response()) as request:
            result=feedback.assess(self.item,'Hallo','en',model='gpt-4.1-mini')
            body=json.loads(request.call_args.args[0].data)
        self.assertNotIn('reasoning',body)
        self.assertEqual(result['model'],'gpt-4.1-mini')
        self.assertFalse(body['store'])

    def test_language_never_changes_model_input_or_canonical_result(self):
        bodies=[];results=[]
        for lang in ['nl','en']:
            with patch.object(feedback,'keys',return_value={'OPENAI_API_KEY':'test-placeholder'}),patch.object(feedback.urllib.request,'urlopen',return_value=self.response()) as request:
                results.append(feedback.assess(self.item,'Hallo',lang,model='gpt-5.4-nano'))
                bodies.append(json.loads(request.call_args.args[0].data))
        self.assertEqual(bodies[0],bodies[1]);self.assertEqual(results[0],results[1])
        self.assertNotIn('lang',json.loads(bodies[0]['input']))
        self.assertEqual(bodies[0]['reasoning'],{'effort':'none'})

    def test_localized_display_preserves_decisions_quotes_and_rewrite(self):
        result=self.result();before=copy.deepcopy(result)
        nl=feedback.display_feedback(result,'nl');en=feedback.display_feedback(result,'en')
        for field in ['met','uncertain','evidence','index']:
            self.assertEqual(nl['criteria'][0][field],en['criteria'][0][field])
        self.assertEqual(nl['corrected_text'],en['corrected_text'])
        self.assertEqual(nl['comment'],'Duidelijk.');self.assertEqual(en['comment'],'Clear.')
        self.assertEqual(en['translations']['nl']['criteria_feedback'],['Je groet de lezer.'])
        self.assertEqual(en['feedback_version'],feedback.FEEDBACK_VERSION)
        self.assertEqual(result,before)

    def test_fabricated_or_missing_support_is_rejected(self):
        for change in [{'evidence':'Hallo morgen'},{'evidence':''},{'met':False},
                       {'uncertain':True},{'met':'true'},{'index':False}]:
            with self.subTest(change=change):
                result=self.result();result['criteria'][0].update(change)
                with self.assertRaises(feedback.FeedbackError):self.call(result)

    def test_malformed_or_incomplete_translation_is_rejected(self):
        for value in [{'nl':'Duidelijk.'},{'nl':'','en':'Clear.'},['nl','en'],'Clear.']:
            with self.subTest(value=value):
                result=self.result();result['criteria'][0]['feedback']=value
                with self.assertRaises(feedback.FeedbackError):self.call(result)

    def test_summary_is_derived_from_decisions_not_model_advice(self):
        result=self.result();result['comment']={'nl':'Je mist alles.','en':'Everything is missing.'}
        response=self.call(result)
        self.assertEqual(response['comment']['en'],'You clearly covered 1 of 1 points.')
        self.assertEqual(response['next_step']['en'],'Practise another task next.')
        result['criteria'][0].update(met=False,evidence='')
        response=self.call(result)
        self.assertIn('0 of 1',response['comment']['en'])
        self.assertIn('Say hello.',response['next_step']['en'])
        self.assertEqual(response['corrected_text'],'Hallo\n[Zeg hallo.]')

    def test_uncertainty_is_allowed_only_for_unconfirmed_speech(self):
        result=self.result();result['criteria'][0].update(met=False,uncertain=True,evidence='')
        speech_item={**self.item,'part':'speaking'}
        uncertain=self.call(result,item=speech_item)
        self.assertTrue(uncertain['criteria'][0]['uncertain'])
        self.assertEqual(uncertain['corrected_text'],'Hallo\n[Zeg hallo.]')
        with self.assertRaises(feedback.FeedbackError):self.call(result)
        with self.assertRaises(feedback.FeedbackError):self.call(result,item=speech_item,speech_confirmed=True)

    def test_suggestion_remains_visible_with_missing_information(self):
        result=self.result();result['criteria'][0].update(met=False,evidence='')
        result['corrected_text']='[begroeting], ik kom morgen.'
        self.assertEqual(self.call(result)['corrected_text'],result['corrected_text'])
        result['corrected_text']=''
        self.assertEqual(self.call(result)['corrected_text'],'Hallo\n[Zeg hallo.]')
        complete=self.result();complete['corrected_text']=''
        self.assertEqual(self.call(complete)['corrected_text'],'Hallo')

    def test_confirmed_answer_ignores_stale_speech_hypotheses(self):
        result=self.result();result['criteria'][0]['evidence']='Goedemorgen'
        speech_item={**self.item,'part':'speaking'};speech=[{'text':'Goedemorgen','words':[]}]
        with self.assertRaises(feedback.FeedbackError):
            self.call(result,item=speech_item,speech=speech,speech_confirmed=True)
        self.assertEqual(self.call(result,item=speech_item,speech=speech)['criteria'][0]['evidence'],'Goedemorgen')
        with patch.object(feedback,'keys',return_value={'OPENAI_API_KEY':'test-placeholder'}),patch.object(feedback.urllib.request,'urlopen',return_value=self.response()) as request:
            feedback.assess(speech_item,'Hallo',speech=speech,speech_confirmed=True)
            prompt=json.loads(json.loads(request.call_args.args[0].data)['input'])
        self.assertEqual(prompt['speech_hypotheses'],[])

if __name__=='__main__':unittest.main()
