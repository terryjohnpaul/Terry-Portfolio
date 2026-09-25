#!/usr/bin/env python3
"""Read-only checks for the public static site; no packages required."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import fnmatch
import json
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
EXCLUDES = [s.strip() for s in (ROOT / '.vercelignore').read_text().splitlines()
            if s.strip() and not s.startswith('#')]

def excluded(path):
    name = path.relative_to(ROOT).as_posix()
    return any(name.startswith(p.rstrip('/') + '/') if p.endswith('/') else
               fnmatch.fnmatch(name, p.lstrip('/')) or
               ('/' not in p and fnmatch.fnmatch(path.name, p))
               for p in EXCLUDES)

config = json.loads((ROOT / 'vercel.json').read_text())
errors = []
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('src', 'href', 'poster'):
            if attrs.get(key): check(self.path, attrs[key], self.getpos()[0])

def check(source, value, line=0):
    url = urlsplit(value)
    if url.scheme or url.netloc or not url.path: return
    target = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else source.parent / unquote(url.path)
    target = target.resolve()
    if target.is_dir(): target /= 'index.html'
    if not target.exists() or excluded(target):
        errors.append(f'{source.relative_to(ROOT)}:{line}: missing or excluded: {value}')

pages = [p for p in ROOT.rglob('*.html') if not excluded(p)]
for path in pages:
    parser = Page(path)
    parser.feed(path.read_text())
# Check stylesheets used by public pages, including relative background/font URLs.
for path in ROOT.rglob('*.css'):
    if excluded(path): continue
    for match in re.finditer(r'url\(\s*[\'"]?([^\)\'"\s]+)', path.read_text()):
        check(path, match.group(1))
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [e.text for e in ET.parse(ROOT / 'sitemap.xml').findall('.//s:loc', ns)]
for route in ('/', '/swadesh/', '/sorted/', '/work/'):
    if 'https://terryjohn.me' + route not in urls: errors.append('Sitemap missing ' + route)
for url in urls:
    check(ROOT / 'sitemap.xml', urlsplit(url).path)
if 'https://terryjohn.me/toneflix/' not in urls: errors.append('Toneflix is missing from sitemap')
if not (ROOT / 'sorted').is_dir() or (ROOT / 'sorted').is_symlink(): errors.append('sorted must be a real directory')
if (ROOT / 'bharat-app').exists(): errors.append('Legacy project directory still exists')
if errors:
    print('\n'.join(errors)); sys.exit(1)
print(f'Passed: {len(pages)} public HTML files, local references, CSS assets, sitemap and Sorted directory.')
