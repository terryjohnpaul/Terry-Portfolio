#!/usr/bin/env python3
"""Stage immutable objects in the existing bucket; no bucket or domain changes."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json,subprocess,hashlib
p=Path('audit/toneflix-launch/asset-manifest.json');m=json.loads(p.read_text())
variants=[v for a in m['assets'] for v in a['variants']]
def upload(v):
 r=subprocess.run(['wrangler','r2','object','put',m['bucket']+'/'+v['key'],'--file',v['file'],'--content-type',v['type'],'--cache-control','public, max-age=31536000, immutable','--remote'],capture_output=True,text=True)
 if r.returncode:raise RuntimeError('Upload failed for '+v['key'])
 return v['key']
with ThreadPoolExecutor(max_workers=4) as pool:
 for key in pool.map(upload,variants):
  next(v for v in variants if v['key']==key)['uploaded']=True
  p.write_text(json.dumps(m,indent=2))
m['status']='uploaded-awaiting-production-cdn-verification';p.write_text(json.dumps(m,indent=2))
print('Staged',len(variants),'immutable objects. Production CDN verification still required.')
