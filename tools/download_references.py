"""Download published official practice materials for local personal study.

Uses the public endpoint used by the NT2 catalogue. No authentication needed.
Downloaded content is excluded from Git; no redistribution licence is implied.
"""
import concurrent.futures
import datetime
import hashlib
import json
import pathlib
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'reference-private'
BASE = 'https://oefenexamensnt2.nl/api/facet-service-openbaar/oefenmaterialen'
DUO = 'https://inburgeren.nl/examen-doen/oefenen.jsp'

def fetch(url):
    with urllib.request.urlopen(url, timeout=180) as response:
        return response.read()

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.current = None
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.current = {'url': urllib.parse.urljoin(DUO, dict(attrs).get('href', '')), 'label': ''}
    def handle_data(self, text):
        if self.current is not None:
            self.current['label'] += text
    def handle_endtag(self, tag):
        if tag == 'a' and self.current is not None:
            self.links.append(self.current)
            self.current = None

def download(item):
    dest = ROOT / item['path']
    dest.parent.mkdir(parents=True, exist_ok=True)
    data = dest.read_bytes() if dest.exists() else fetch(item['url'])
    expected = b'%PDF-' if dest.suffix == '.pdf' else b'PK'
    if not data.startswith(expected):
        raise ValueError('Unexpected content: ' + item['path'])
    if not dest.exists():
        temp = dest.with_suffix(dest.suffix + '.part')
        temp.write_bytes(data)
        temp.replace(dest)
    return {**item, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}

def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    catalogue = json.loads(fetch(BASE + '?profiel=NT2'))
    (ROOT / 'nt2-catalogue.json').write_text(json.dumps(catalogue, ensure_ascii=False, indent=2))
    items = []
    for group in catalogue:
        for name in group['bestandsnamen']:
            if pathlib.Path(name).name != name:
                raise ValueError('Unsafe filename')
            params = {'groepindeling': group['groepindeling'], 'bestandsnaam': name, 'profiel': 'NT2'}
            items.append({'path': 'nt2/' + group['groepindeling'] + '/' + name,
                          'url': BASE + '/download?' + urllib.parse.urlencode(params),
                          'publisher': 'CvTE', 'use': 'local personal study; redistribution restricted'})
    html = fetch(DUO).decode()
    parser = Links()
    parser.feed(html)
    duo_links = [x for x in parser.links if 'Oefenexamen' in x['label'] and
                 (x['url'].endswith('.pdf') or 'oefenexamensduo.optimumassessment.com/' in x['url'])]
    (ROOT / 'duo-practice-links.json').write_text(json.dumps(duo_links, ensure_ascii=False, indent=2))
    for link in duo_links:
        if link['url'].endswith('.pdf'):
            items.append({'path': 'a2/' + pathlib.PurePosixPath(urllib.parse.urlparse(link['url']).path).name,
                          'url': link['url'], 'publisher': 'DUO / Ministry of SZW',
                          'use': 'local personal study; redistribution not cleared'})
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for item in pool.map(download, items):
            results.append(item)
            print(str(len(results)) + '/' + str(len(items)) + ' ' + item['path'], flush=True)
    manifest = {'retrieved_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                'catalogue_url': BASE + '?profiel=NT2', 'files': results,
                'nt2_rights_url': 'https://oefenexamensnt2.nl/facet-openbaar-portaal/veelgestelde-vragen#auteursrecht'}
    (ROOT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    print(json.dumps({'files': len(results), 'bytes': sum(x['bytes'] for x in results)}))

if __name__ == '__main__':
    main()
