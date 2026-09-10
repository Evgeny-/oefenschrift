"""Read only the authorized API keys; never source or log an env file."""
import json, os, re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CONFIG=json.loads((ROOT/'config/services.json').read_text())
def keys():
    result={}
    path=Path(os.environ.get('INBURGERING_CREDENTIALS_FILE',CONFIG['credentials_file']))
    if path.is_file():
        for line in path.read_text().splitlines():
            m=re.match(r'^\s*(?:export\s+)?(OPENAI_API_KEY|ELEVENLABS_API_KEY)\s*=\s*(.*?)\s*$',line)
            if m:result[m[1]]=m[2].strip('"\'')
    for name in ['OPENAI_API_KEY','ELEVENLABS_API_KEY']:
        if os.environ.get(name):result[name]=os.environ[name]
    return result
