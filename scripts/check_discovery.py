#!/usr/bin/env python3
"""Regression checks for public-page identity, indexing and draft isolation."""
import json
import re
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, urljoin
from urllib.robotparser import RobotFileParser
from audit_discovery import Page, ROOT
import check_site

urls=[e.text for e in ET.parse(ROOT/'sitemap.xml').iter() if e.tag.endswith('}loc')]
assert len(urls)==len(set(urls)), 'Duplicate sitemap URL'
config=json.loads((ROOT/'vercel.json').read_text())
redirects={x['source']:x for x in config['redirects']}
robots=RobotFileParser(); robots.parse((ROOT/'robots.txt').read_text().splitlines())
ids=set(); pages={}
for url in urls:
    route=urlsplit(url).path
    assert url.startswith('https://terryjohn.me/') and route.endswith('/'), url
    p=Page((ROOT/(route.lstrip('/')+'index.html')).read_text()); pages[route]=p
    assert p.title and p.meta.get('description'), 'Missing metadata: '+route
    assert p.canonicals==[url], 'Canonical mismatch: '+route
    assert len(' '.join(p.text).split())>100, 'Meaningful initial HTML absent: '+route
    for name in ['robots','googlebot','bingbot']:
        assert not any(x in p.meta.get(name,'').lower() for x in ['noindex','nosnippet','none','max-snippet:0']), route
    for bot in ['Googlebot','bingbot','OAI-SearchBot','PerplexityBot','Claude-SearchBot']:
        assert robots.can_fetch(bot,url), (bot,url)
    for d in p.schemas:
        assert 'PARSE_ERROR' not in d, route
        if d.get('@id'): ids.add(d['@id'])
        if d.get('@type')=='CreativeWork': assert d['author']['@id']=='https://terryjohn.me/#person', route
        if d.get('@type')=='Person': assert 'workExample' not in d, 'workExample belongs to CreativeWork'
    red=redirects[route+'index.html']; assert red['destination']==route and red['permanent'],route
assert 'https://terryjohn.me/#person' in ids
assert 'https://terryjohn.me/#website' in ids
home=pages['/']; person=next(x for x in home.schemas if x['@type']=='Person')
assert person['name']=='Terry John Paul'
assert next(x for x in home.schemas if x['@type']=='WebSite')['author']['@id']==person['@id']
items=next(x for x in home.schemas if x['@type']=='ItemList')
assert items['numberOfItems']==len(items['itemListElement'])
assert all(x['url'] in urls for x in items['itemListElement']), 'Unpublished work in homepage schema'
for route,p in pages.items():
    for href in p.links:
        u=urlsplit(urljoin('https://terryjohn.me'+route,href))
        if u.netloc=='terryjohn.me' and u.fragment and u.path in pages:
            target=(ROOT/(u.path.lstrip('/')+'index.html')).read_text()
            assert u.fragment in re.findall(r'''\bid=["']([^"']+)''',target), 'Missing fragment: '+href
        if u.netloc=='terryjohn.me' and u.path.endswith('/'):
            assert u.path in pages or u.path == '/toneflix/research-prototype/', 'Link to unpublished page: '+route+' -> '+u.path
assert 'Brand book and audit support: Ollie Evill' in ' '.join(pages['/swadesh/'].text)
assert 'Sole Product Designer · Design System Owner' in ' '.join(pages['/swadesh/'].text)
for name in ['batch-editor','desktop-studio','utility-tools','video-editor']:
    assert check_site.excluded(ROOT/'pixelbin'/name/'index.html'), 'Draft deployable: '+name
assert check_site.excluded(ROOT/'audit/ai-discovery/REPORT.md')
print(f'Passed discovery regressions: {len(pages)} canonical pages, identity, authorship, robots, links, redirects and exclusions.')
