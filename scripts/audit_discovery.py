#!/usr/bin/env python3
"""Read-only local/HTTP SEO inventory. HTTP requests do not establish indexing."""
import argparse, concurrent.futures, hashlib, json, re, subprocess
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parent.parent
class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(); self.meta={}; self.canonicals=[]; self.links=[]; self.assets=[]; self.schemas=[]; self.text=[]; self.images=[]; self.title=''; self.mode=''; self.buf=''; self.body=False
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='body': self.body=True
        if tag in ('script','style','title'): self.mode=tag; self.buf=''; self.ld=a.get('type')=='application/ld+json'
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.canonicals.append(a.get('href'))
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='img': self.images.append({'src':a.get('src'),'alt':a.get('alt')})
        for key in ('src','poster'):
            if a.get(key): self.assets.append(a[key])
    def handle_data(self,data):
        if self.mode: self.buf+=data
        elif self.body and data.strip(): self.text.append(data.strip())
    def handle_endtag(self,tag):
        if tag==self.mode:
            if tag=='title': self.title=self.buf
            if tag=='script' and self.ld:
                try: self.schemas.append(json.loads(self.buf))
                except ValueError: self.schemas.append({'PARSE_ERROR':self.buf})
            self.mode=''
    def result(self):
        return {'title':self.title,'description':self.meta.get('description'), 'canonicals':self.canonicals,'robots':{k:v for k,v in self.meta.items() if k in ('robots','googlebot','bingbot')}, 'json_ld':self.schemas,'links':self.links,'assets':self.assets,'images':self.images,'initial_text_words':len(' '.join(self.text).split()),'text':'\n'.join(self.text)}
def fetch(url, folder, key, agent=None):
    folder.mkdir(parents=True,exist_ok=True)
    h=folder/(key+'.headers'); b=folder/(key+'.html')
    cmd=['curl','-sS','-L','--max-time','35','--max-redirs','6','-D',str(h),'-o',str(b),'-w','%{http_code}\n%{url_effective}',url]
    if agent: cmd+=['-A',agent]
    p=subprocess.run(cmd,capture_output=True,text=True)
    status,_,final=p.stdout.partition('\n')
    data=b.read_text(errors='replace') if b.exists() else ''
    headers=h.read_text() if h.exists() else ''
    return {'request_url':url,'status':status,'final_url':final,'error':p.stderr,'redirects':re.findall(r'(?im)^location: (.*)',headers),'x_robots_tags':re.findall(r'(?im)^x-robots-tag: (.*)',headers),'sha256':hashlib.sha256(data.encode()).hexdigest(),**Page(data).result()}
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--base',default='https://terryjohn.me'); ap.add_argument('--out',required=True); ap.add_argument('--local-only',action='store_true'); args=ap.parse_args(); out=ROOT/args.out; out.mkdir(parents=True,exist_ok=True)
    urls=[e.text for e in ET.parse(ROOT/'sitemap.xml').iter() if e.tag.endswith('}loc')]
    routes=sorted(set([urlsplit(u).path for u in urls]+['/pixelbin/'+n+'/' for n in ['batch-editor','desktop-studio','utility-tools','video-editor']]))
    routes=[r for r in routes if (ROOT/(r.lstrip('/')+'index.html')).exists()]
    local={}
    for route in routes:
        source=route.lstrip('/')+'index.html'; data=(ROOT/source).read_text(); local[route]={'source':source,'production_url':'https://terryjohn.me'+route,'sitemap': 'https://terryjohn.me'+route in urls,**Page(data).result()}
    for route,item in local.items():
        item['inbound_links']=[r for r,x in local.items() if any(urlsplit(urljoin('https://terryjohn.me'+r,a)).netloc=='terryjohn.me' and urlsplit(urljoin('https://terryjohn.me'+r,a)).path==route for a in x['links'])]
    (out/'local.json').write_text(json.dumps(local,indent=2))
    if not args.local_only:
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            live=dict(zip(routes,pool.map(lambda r:fetch(args.base.rstrip('/')+r,out/'responses',r.strip('/').replace('/','__') or 'home'),routes)))
        (out/'http.json').write_text(json.dumps(live,indent=2))
    print('Inventoried',len(local),'pages in',out)
if __name__=='__main__': main()
