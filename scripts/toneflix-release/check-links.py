#!/usr/bin/env python3
import json,urllib.request,urllib.error,concurrent.futures
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin,urlsplit
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='a' and a.get('href'):self.links.append(a['href'])
urls=set()
for f in ['index.html','work/index.html','toneflix/index.html','settle-club/index.html']:
 p=Links();p.feed(Path(f).read_text())
 for u in p.links:
  if u.startswith(('mailto:','tel:')):continue
  u=urljoin('http://localhost:19031/'+f,u).split('#')[0]
  if urlsplit(u).scheme in ['http','https']:urls.add(u)
def check(u):
 try:
  with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0 (compatible; PortfolioLinkCheck/1.0)'}),timeout=15) as r:
   r.read(100);return {'url':u,'status':r.status,'final':r.url,'type':r.headers.get_content_type()}
 except urllib.error.HTTPError as e:return {'url':u,'status':e.code,'note':'External access failures require manual review; may be bot restrictions.' if not u.startswith('http://localhost') else 'Local failure'}
 except Exception as e:return {'url':u,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:result=list(pool.map(check,sorted(urls)))
Path('audit/toneflix-launch/link-checks.json').write_text(json.dumps(result,indent=2));print('Checked',len(result),'destinations; see JSON for access failures.')
