"""Build the local demo catalogue from original pilots and sample audio."""
import array
import json
from pathlib import Path
import sys
import wave

ROOT=Path(__file__).resolve().parents[1]
items=[]
for level in ['A2','B1']:
    pilot=json.loads((ROOT/f'pilots/{level.lower()}-reading-001.json').read_text())
    for p in pilot['passages']:
        items.append(dict(id=f'{level}:reading:{p["id"]}:1',level=level,part='reading',title=p['title'],text=p['text'],questions=p['questions'],type=p.get('type','text')))

for name,title,prompt,options,key,explanation in [
    ('tandarts','Een bericht van de tandarts','Hoe laat moet u bij de praktijk zijn?',{'A':'Om 10.50 uur.','B':'Om 11.00 uur.','C':'Om 11.10 uur.'},'A','De afspraak is om elf uur. U moet tien minuten eerder komen: om 10.50 uur.'),
    ('buurthuis','Taalles in het buurthuis','Waar is de taalles deze week?',{'A':'In lokaal één.','B':'In lokaal drie.','C':'In de ruimte bij de koffie.'},'B','In het bericht staat dat de les deze week in lokaal drie is, op de eerste verdieping.')]:
    with wave.open(str(ROOT/f'demo/audio/{name}.wav')) as f:
        samples=array.array('h',f.readframes(f.getnframes()))
        if sys.byteorder!='little': samples.byteswap()
        duration=f.getnframes()/f.getframerate()
    chunk=max(1,len(samples)//64)
    rms=[(sum(v*v for v in samples[i:i+chunk])/len(samples[i:i+chunk]))**.5 for i in range(0,len(samples),chunk)][:64]
    peaks=[round(max(.08,n/max(rms)),3) for n in rms]
    items.append(dict(id=f'A2:listening:{name}:1',level='A2',part='listening',type='audio',title=title,text=(ROOT/f'demo/audio/{name}.txt').read_text(),audio=f'audio/{name}.wav',duration=duration,peaks=peaks,questions=[dict(id='q1',prompt=prompt,options=options,answer=key,explanation=explanation)]))

for part,slug,title,prompt,criteria,sample,quotes,model in [
    ('writing','afspraak','Een afspraak verzetten','U hebt morgen een afspraak met uw buurvrouw. U kunt niet komen. Schrijf haar een kort bericht.',[['Zeg dat u niet kunt komen.','Say that you cannot come.'],['Vertel waarom.','Give a reason.'],['Stel een andere dag voor.','Suggest another day.']],'Ik kan morgen niet komen. Mijn kind is ziek.',['Ik kan morgen niet komen.','Mijn kind is ziek.',None],'Beste buurvrouw, ik kan morgen niet komen. Mijn kind is ziek. Kan ik vrijdag komen? Groeten, Sara'),
    ('writing','bibliotheekpas','Een nieuwe bibliotheekpas','U bent uw bibliotheekpas kwijt. Schrijf een bericht aan de bibliotheek.',[['Zeg dat u uw pas kwijt bent.','Say that you have lost your card.'],['Schrijf uw naam.','Give your name.'],['Vraag om een nieuwe pas.','Ask for a new card.']],'Ik ben mijn bibliotheekpas kwijt. Mijn naam is Sara de Vries.',['Ik ben mijn bibliotheekpas kwijt.','Mijn naam is Sara de Vries.',None],'Beste medewerker, ik ben mijn bibliotheekpas kwijt. Mijn naam is Sara de Vries. Kan ik een nieuwe pas krijgen? Groeten, Sara'),
    ('speaking','buurvrouw','Bel uw buurvrouw','U kunt morgen niet naar uw buurvrouw. Spreek een kort bericht in.',[['Zeg dat u niet kunt komen.','Say that you cannot come.'],['Vertel waarom.','Give a reason.'],['Stel een andere dag voor.','Suggest another day.']],'Ik kan morgen niet komen. Mijn kind is ziek.',['Ik kan morgen niet komen.','Mijn kind is ziek.',None],'Hallo, ik kan morgen niet komen. Mijn kind is ziek. Kan ik vrijdag komen?'),
    ('speaking','te-laat','U komt later','U komt te laat op uw werk. Bel uw collega en spreek een bericht in.',[['Zeg dat u te laat komt.','Say that you will be late.'],['Vertel waarom.','Give a reason.'],['Zeg hoe laat u er bent.','Say when you will arrive.']],'Ik kom te laat. Mijn bus rijdt niet.',['Ik kom te laat.','Mijn bus rijdt niet.',None],'Hallo, ik kom te laat. Mijn bus rijdt niet. Ik ben er om tien uur.')]:
    items.append(dict(id=f'A2:{part}:{slug}:1',part=part,level='A2',title=title,type='message',prompt=prompt,criteria=criteria,sample=sample,quotes=quotes,model=model))

(ROOT/'demo/data.js').write_text('window.SamenData = '+json.dumps(items,ensure_ascii=False).replace('</','<\\/')+';\n')
print(f'Built {len(items)} original practice items.')
