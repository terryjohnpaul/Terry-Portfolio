# Terry John Paul — portfolio

Production: https://terryjohn.me. Static HTML, CSS and JavaScript, hosted on Vercel with media on Cloudflare R2.

This release branch starts with a byte-verified snapshot of the previous production deployment, followed by the reviewed homepage changes. The working development branch contains additional drafts and is not the deployment source.

## Preview and validation

Run `python3 scripts/preview.py --port 8000` and open http://localhost:8000/.

Before release, run:

```sh
python3 scripts/check_site.py
python3 scripts/check_discovery.py
BASE_URL=http://localhost:8000 node scripts/check_homepage_release.cjs
```

The browser check uses Playwright. Set `PLAYWRIGHT_PATH` when it is installed outside the project.

## Production structure

- `index.html`: homepage; `work/`, `about/`, `resume/`, `first-take/`: supporting pages.
- `sorted/`, `pixelbin/`, `swadesh/`, `settle-club/`, `toneflix/`: published case studies.
- `privacy/`: privacy information and cookie preferences.
- `toneflix/research-prototype/`: linked client-only demonstration.
- `assets/`, `fonts/`: production assets; preserve their published paths.
- `our-work-portfolio.css` and `our-work-portfolio.js`: selected-work source. The homepage loads identical content-hashed copies in `assets/home-v1/`. Generate new filenames when these sources change; do not overwrite immutable assets.
- `vercel.json`: redirects, headers and hosting configuration. Legacy `/bharat-app/` URLs redirect to `/sorted/`.

## Releases

Release notes are in `release-notes/`; `release-manifest.json` records the production baseline and exact changed assets. These files and the validation scripts are excluded from deployment by `.vercelignore`.

Deploy a preview of the committed release branch, verify it, then promote that exact preview to production. Keep the previous deployment ID for rollback. Do not deploy a development directory with unrelated edits or drafts.
