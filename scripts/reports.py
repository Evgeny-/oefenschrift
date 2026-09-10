"""Local issue queue. No answers, recordings, IP addresses or accounts are attached."""
import json, os, sqlite3, time
from pathlib import Path
from service_config import ROOT
DB=Path(os.environ.get('INBURGERING_REPORT_DB',str(ROOT/'var/reports.sqlite3')))
KINDS={'unclear','answer','level','audio','other'}
def connect():
    DB.parent.mkdir(parents=True,exist_ok=True)
    db=sqlite3.connect(DB);db.execute('CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY, item_id TEXT NOT NULL, question_id TEXT, kind TEXT NOT NULL, message TEXT NOT NULL, created_at INTEGER NOT NULL, status TEXT NOT NULL DEFAULT "open")');
    if 'item_version' not in {r[1] for r in db.execute('PRAGMA table_info(reports)')}:db.execute('ALTER TABLE reports ADD COLUMN item_version TEXT')
    return db

def add_report(data,catalogue):
    if not isinstance(data,dict):raise ValueError('Invalid report.')
    item=next((i for i in catalogue if i['id']==data.get('item_id')),None)
    q=data.get('question_id');kind=data.get('kind');message=data.get('message','')
    if not item or kind not in KINDS or not isinstance(message,str) or len(message)>1200:raise ValueError('Invalid report.')
    if q is not None and not any(x['id']==q for x in item.get('questions',[])):raise ValueError('Invalid question.')
    if not isinstance(data.get('item_version'),str) or not data['item_version'] or data['item_version']!=item.get('revision'):raise ValueError('Exercise version changed. Reload before reporting.')
    with connect() as db:
        row=db.execute('INSERT INTO reports(item_id,question_id,kind,message,created_at,item_version) VALUES(?,?,?,?,?,?)',(item['id'],q,kind,message.strip(),int(time.time()),item.get('revision')));return {'id':row.lastrowid,'status':'queued'}

if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser();parser.add_argument('--resolve',type=int);parser.add_argument('--delete',type=int);args=parser.parse_args()
    with connect() as db:
        if args.resolve:db.execute('UPDATE reports SET status="resolved" WHERE id=?',(args.resolve,))
        if args.delete:db.execute('DELETE FROM reports WHERE id=?',(args.delete,))
        db.row_factory=sqlite3.Row
        print(json.dumps([dict(r) for r in db.execute('SELECT * FROM reports WHERE status="open" ORDER BY created_at')],ensure_ascii=False,indent=2))
