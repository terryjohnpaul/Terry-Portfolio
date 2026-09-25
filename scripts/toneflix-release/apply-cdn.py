#!/usr/bin/env python3
"""Apply only publicly verified manifest URLs. Run after upload-assets.py."""
import json,re,posixpath,html,sys,shutil
from pathlib import Path
from urllib.parse import urlsplit
m=json.loads(Path('audit/toneflix-launch/asset-manifest.json').read_text())
local='--local-preview' in sys.argv
if not local and m['status']!='uploaded-and-publicly-verified': raise SystemExit('Verify the approved CDN first; no files changed.')
assets={a['source']:a for a in m['assets'] if not any('/social-' in v['key'] for v in a['variants'])}
for a in m['assets']:
 for v in a['variants']:
  alias='toneflix/assets/optimised/'+Path(v['file']).name
  assets[alias]=a
  if local:
   Path(alias).parent.mkdir(parents=True,exist_ok=True)
   shutil.copyfile(v['file'],alias)
   v['url']='https://terryjohn.me/'+alias if 'social-' in v['key'] else '/'+alias
def source(url,page):
 u=urlsplit(html.unescape(url))
 if u.netloc and u.netloc!='terryjohn.me': return None
 return posixpath.normpath(u.path.lstrip('/') if u.path.startswith('/') else posixpath.join(str(page.parent),u.path))
for p in [Path(x) for x in ['toneflix/index.html','toneflix/project.css','toneflix/sorted-template.css','toneflix/roadmap.css','toneflix/data-clarity.js','toneflix/research-prototype/index.html','index.html','work/index.html','settle-club/index.html']]:
 s=p.read_text()
 def image(match):
  tag=match.group();src=re.search(r'\bsrc="([^"]+)"',tag)
  if not src: return tag
  a=assets.get(source(src[1],p))
  if not a:return tag
  vs=sorted(a['variants'],key=lambda v:v['width']);v=vs[-1]
  for name in ['src','width','height','srcset','sizes','data-full-src']:
   tag=re.sub(r'\s'+name+r'="[^"]*"','',tag)
  attrs=f' src="{v["url"]}" width="{v["width"]}" height="{v["height"]}" data-full-src="{v["url"]}"'
  if len(vs)>1:
   sizes='100vw' if a['source']=='toneflix/hero-new.png' else '(max-width: 768px) 100vw, 80vw'
   attrs+=' srcset="'+', '.join(f'{v["url"]} {v["width"]}w' for v in vs)+'" sizes="'+sizes+'"'
  return tag[:-1]+attrs+'>'
 s=re.sub(r'<img\b[^>]*>',image,s)
 # Remaining quoted image references include metadata, CSS and JavaScript strings.
 def quoted(match):
  quote,url=match[1],match[2];key=source(url,p);a=assets.get(key)
  if 'social-dc70a996fd940e6e.jpg' in url:a=next(a for a in m['assets'] if any('social-' in v['key'] for v in a['variants']))
  if a:return quote+max(a['variants'],key=lambda v:v['width'])['url']+quote
  return match[0]
 s=re.sub(r'([\"\'])([^\"\'\s<>]+\.(?:png|jpe?g|webp)(?:\?[^\"\']*)?)\1',quoted,s)
 p.write_text(s)
print('Local optimised preview references applied.' if local else 'Verified CDN references applied; rerun browser and link checks.')
