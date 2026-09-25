# Terry John Paul — portfolio

Static HTML, CSS and JavaScript site for https://terryjohn.me.

## Organization

- `index.html`: homepage; `work/`, `about/`, `resume/`, `first-take/`: supporting pages.
- `sorted/`, `pixelbin/`, `swadesh/`, `settle-club/`: public case studies.
- `assets/`, `fonts/`: shared production assets. Keep their paths stable.
- `toneflix/`: launch candidate. Integration is enabled on the release branch; production publication is pending approved-source confirmation and a verified R2 custom hostname. See `audit/toneflix-launch/RELEASE.md`.
- `fynd-studio/`, `our-work-standalone/`: unpublished development pages.
- `archive/`: optional local-only storage for future backups and source masters; ignored by Git and deployment. Existing source media remains in place to preserve references.
- `scripts/check_site.py`: public-page reference and sitemap checks.

## Local preview

Run `/usr/bin/python3 scripts/preview.py --port 8000`, then open
http://localhost:8000/toneflix/. The preview serves unpublished drafts and
applies permanent redirects from `vercel.json`; it does not deploy anything.
The current homepage has no Toneflix card, and the Work page retains its
Documentation in Progress placeholder until an explicit launch.

## Before every release

1. Run `python3 scripts/check_site.py`. On this Mac, use `/usr/bin/python3 scripts/check_site.py` if Homebrew Python reports an Expat library error.
2. Review `git status --short`. Untracked production pages and referenced assets must be added deliberately; do not use a blanket `git add .` on this working folder.
3. Commit production pages, their required assets, configuration and the checker together. GitHub Actions runs the same check on pushes and pull requests.
4. Check a preview deployment: homepage, work page, case studies, navigation, mobile layouts and media.
5. Publish only after the preview passes. Check `/sorted/`, legacy `/bharat-app/`, and the sitemap on production.

`.gitignore` controls local version-control noise; `.vercelignore` controls folder-based Vercel uploads. A file being ignored by Git does not alone prevent a manual deployment. Keep both policies deliberate.

## Sorted migration

`sorted/` is now a real directory, with `index.html` as its public entry point. The previous `bharat-app/` routes redirect permanently to Sorted, including nested asset paths. The old shared cover-image URL also redirects. Do not rename hosted R2 objects as part of a local folder rename.

The `v2.html` copy is retained locally and excluded from deployment. Edit `sorted/index.html` for the live case study. Historical Git commits retain their original names; do not rewrite history to rename a project.

## Launching a new case study

Remove its deployment exclusion only when ready, confirm its URL works in a preview, replace its work-card placeholder with a real link, and then add the public URL to `sitemap.xml`. Keep research prototypes and drafts excluded even after launch.

## Backups and media

Keep production image and video paths stable. Put new source masters and experiments under `archive/` or an explicitly excluded development folder. Do not delete or move existing media without checking HTML, CSS, JavaScript and hosted references. Prefer Git history over extra HTML backup copies.
