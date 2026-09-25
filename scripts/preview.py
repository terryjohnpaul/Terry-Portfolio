#!/usr/bin/env python3
"""Preview static files, including unpublished drafts, with Vercel redirects locally."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent


class PreviewHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        url = urlsplit(self.path)
        config = json.loads((ROOT / 'vercel.json').read_text())
        for rule in config.get('redirects', []):
            source = rule['source']
            destination = rule['destination']
            if source.endswith('/:path*'):
                prefix = source[:-len(':path*')]
                if not url.path.startswith(prefix):
                    continue
                destination = destination.replace(':path*', url.path[len(prefix):])
            elif url.path != source:
                continue
            if url.query:
                destination += ('&' if '?' in destination else '?') + url.query
            self.send_response(308 if rule.get('permanent') else 307)
            self.send_header('Location', destination)
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        return super().send_head()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(PreviewHandler, directory=str(ROOT)))
    print(f'Portfolio preview: http://localhost:{args.port}/toneflix/', flush=True)
    print('Includes local drafts; this is not a deployment preview.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
