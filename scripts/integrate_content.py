"""Integrate hash-verified editorial batches and exact reviewed evidence."""
import hashlib,json,os,tempfile
from pathlib import Path
from service_config import ROOT

def require(condition,message):
    if not condition:raise ValueError(message)

def atomic_write(path,data):
    name=None
    try:
        with tempfile.NamedTemporaryFile(mode='w',dir=path.parent,encoding='utf-8',delete=False) as f:
            name=f.name;json.dump(data,f,ensure_ascii=False,indent=2);f.write('\n');f.flush();os.fsync(f.fileno())
        os.replace(name,path);name=None
    finally:
        if name:Path(name).unlink(missing_ok=True)

def verify_starters(catalogue):
    open_items={item['id']:item for item in catalogue if not item.get('questions')}
    if not open_items:return
    review=json.loads((ROOT/'content/hints/review.json').read_text())
    source=ROOT/'content/hints/sentence-starters.json'
    require(review['ready_for_integration'] is True and review['verdict']=='pass','Sentence starters have not passed review')
    require(hashlib.sha256(source.read_bytes()).hexdigest()==review['source_sha256'],'Sentence starters differ from reviewed source')
    catalogue_bytes=(json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n').encode()
    require(hashlib.sha256(catalogue_bytes).hexdigest()==review['catalogue_sha256'],'Sentence starters need review against the updated catalogue')
    starters=json.loads(source.read_text())
    require(set(starters)==set(open_items),'Sentence starters do not cover the open catalogue')
    for item_id,lines in starters.items():
        require(isinstance(lines,list) and len(lines)==len(open_items[item_id]['criteria']),'Sentence starters must match criteria')
        require(all(isinstance(line,str) and '…' in line for line in lines),'Sentence starters must remain partial')

def integrate():
    path=ROOT/'content/catalogue.json'
    catalogue=json.loads(path.read_text());by_id={i['id']:i for i in catalogue}
    for review_path in sorted((ROOT/'content/reviews').glob('*-review.json')):
        review=json.loads(review_path.read_text());batch=(ROOT/review['source']).resolve()
        require(batch.is_relative_to((ROOT/'content/batches').resolve()),'Batch path outside content/batches')
        require(review['ready_for_integration'] is True and review['batch_verdict']=='pass','Batch has not passed review')
        require(hashlib.sha256(batch.read_bytes()).hexdigest()==review['source_sha256'],'Batch differs from reviewed source')
        for item in json.loads(batch.read_text()):
            if item['id'] not in by_id:catalogue.append(item);by_id[item['id']]=item
            by_id[item['id']].update({**item,'status':'ai-editorially-reviewed'})
    for review_path in sorted((ROOT/'content/evidence').glob('*-review.json')):
        review=json.loads(review_path.read_text());source=(ROOT/review['source']).resolve()
        require(source.is_relative_to((ROOT/'content/evidence').resolve()),'Evidence path outside content/evidence')
        require(review['ready_for_integration'] is True and review['verdict']=='pass','Evidence has not passed review')
        require(hashlib.sha256(source.read_bytes()).hexdigest()==review['source_sha256'],'Evidence differs from reviewed source')
        for item_id,quotes in json.loads(source.read_text()).items():
            item=by_id[item_id]
            require(set(quotes)=={q['id'] for q in item['questions']},'Evidence question IDs do not match')
            for q in item['questions']:
                require(quotes[q['id']] in item['text'],'Evidence quote is missing from source')
                q['evidence']=quotes[q['id']]
    for item in catalogue:
        for q in item.get('questions',[]):
            require(q['answer'] in q['options'] and q.get('evidence') and q['evidence'] in item['text'],'Invalid answer key or evidence')
        core={k:item[k] for k in ['id','level','part','title','text','prompt','questions','criteria','model','sourceUrl'] if k in item}
        item['revision']='c1:'+hashlib.sha256(json.dumps(core,sort_keys=True,ensure_ascii=False).encode()).hexdigest()[:16]
    verify_starters(catalogue)
    atomic_write(path,catalogue)
    return catalogue
if __name__=='__main__':
    c=integrate();print(f'Integrated {len(c)} exercises with reviewed evidence and content revisions.')
