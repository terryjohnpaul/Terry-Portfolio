#!/usr/bin/env python3
"""Upload prepared assets using existing Wrangler auth; require approved custom domain.
Usage: python3 scripts/toneflix-release/upload-assets.py https://assets.example.com
Does not configure DNS, publish a bucket, delete objects or print credentials.
"""
import json,subprocess,sys,urllib.request
from pathlib import Path
from urllib.parse import urlsplit
base=sys.argv[1].rstrip('/') if len(sys.argv)>1 else ''
u=urlsplit(base)
if u.scheme!='https' or not u.hostname or u.hostname.endswith('r2.dev') or u.query or u.path:
 raise SystemExit('Supply the approved production HTTPS CDN origin (not r2.dev).')
p=Path('audit/toneflix-launch/asset-manifest.json'); m=json.loads(p.read_text())
for a in m['assets']:
 for v in a['variants']:
  subprocess.run(['wrangler','r2','object','put',m['bucket']+'/'+v['key'],'--file',v['file'],'--content-type',v['type'],'--cache-control','public, max-age=31536000, immutable','--remote'],check=True,stdout=subprocess.DEVNULL)
  url=base+'/'+v['key']
  with urllib.request.urlopen(url) as r:
   data=r.read();mime=r.headers.get_content_type()
   if mime!=v['type'] or len(data)!=v['bytes']: raise RuntimeError('CDN asset verification failed: '+url)
  v.update(url=url,verified=True)
  p.write_text(json.dumps(m,indent=2))
m.update(status='uploaded-and-publicly-verified',cdnOrigin=base);p.write_text(json.dumps(m,indent=2))
print('All uploaded variants verified by public GET.')
