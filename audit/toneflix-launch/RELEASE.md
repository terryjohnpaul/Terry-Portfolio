# Toneflix launch candidate — 25 September 2026

**Not deployed.** Production remains on deployment `dpl_6hprwP2JKKN9WSdti8HhtL3x9fHY`. Intended canonical: https://terryjohn.me/toneflix/.

## Essential release blockers

1. `index(20260925-093704).html` was not found in the workspace or the searched local locations. Work is prepared against existing `toneflix/index.html`. Confirm that this is the approved content, or supply the approved file location so it can be compared before release.
2. Existing R2 bucket `terry-portfolio-assets` has no custom domain. Its existing public development URL is forbidden by this task for new production assets. Confirm the proposed `assets.terryjohn.me`, or specify the required custom hostname. No DNS or bucket-publicity changes have been made.

These are the reasons publication is held. The production domain itself is confirmed from Vercel as `terryjohn.me`.

## Implemented candidate

| Files | Before → after | Reason |
|---|---|---|
| `toneflix/index.html`, `project.css` | Draft integration → production metadata, responsive images, focus/modal fixes, reduced-motion fixes, meaningful hero alt | Preserve content while making it usable and publishable |
| `index.html` | No selected-work Toneflix card → native linked card using existing treatment and existing Toneflix thumbnail | Homepage discovery |
| `work/index.html`, `settle-club/index.html` | Placeholder Toneflix destination → `/toneflix/` | Listing and related-project navigation |
| `sitemap.xml`, `vercel.json`, `.vercelignore` | Excluded draft → candidate route, sitemap entry, draft exclusions and security headers | Release integration |
| `assets/vendor/*` | Third-party runtime requests → pinned local existing GSAP/Lenis versions with licence notices | Reduce dependencies without changing animation design |
| `assets/js/privacy-controls.js`, `assets/css/privacy-controls.css`, `privacy/index.html` | Immediate optional analytics → explicit opt-in, reject and withdrawal controls | Actual existing tracking requires a choice |
| Homepage, About, First Take, PixelBin hub and three PixelBin case pages | Immediate Clarity/Vercel snippets → shared consent-gated loader | Necessary shared privacy integration; case-study narratives unchanged |
| `scripts/toneflix-release/*` | No repeatable Toneflix pipeline → asset preparation, upload, CDN application and browser/link checks | Reviewable release process |
| `scripts/check_site.py`, `scripts/check_discovery.py`, `README.md` | Draft-only checks/documentation → launch-candidate checks | Keep established verification consistent |

The content remains a 2024 client-pitch concept, never shipped. Hidden sections stay hidden. No new project claims, credits, badges or watermarks were added.

## Metadata

- Title: **Toneflix: Fitness App UX Case Study | Terry John Paul**
- Description: **A fitness app concept for a 2024 funding pitch, exploring connected workouts, nutrition and progress. UX design and prototyping by Terry John Paul.**
- Canonical: `https://terryjohn.me/toneflix/`
- Language: `en-GB`; Open Graph locale: `en_GB`.
- Social image: first main artwork, composed at 1200 × 630 JPEG, 71,781 bytes. Local preview: `toneflix/assets/optimised/social-dc70a996fd940e6e.jpg`.
- Final social CDN URL: **pending custom hostname**, object key `toneflix/20260925/social-dc70a996fd940e6e.jpg`.
- Metadata is literal initial HTML. Current production-domain social URL is a candidate reference, not yet live. Finaliser replaces it with the verified CDN URL.

## Images and R2

`asset-manifest.json` records source files, source hashes, dimensions, byte sizes, optimised variants, object keys and upload status. 57 manifest records (56 source assets plus the social composition), 82 variants. Optimised total 8,803,141 bytes, compared with approximately 38.2 MB of original sources. Variants include sharp UI screenshots and responsive artwork. Hero is eager/high priority; other displayed content is lazy loaded. Lightbox uses the selected image's alt text and full variant.

Objects were uploaded with `public, max-age=31536000, immutable` to the existing bucket. **Custom-domain public GET/MIME/cache verification has not happened.** No temporary signed or `r2.dev` URL has been introduced for these new assets. Existing unrelated portfolio media still uses its previous hosting.

After hostname approval and attachment to the existing bucket:

```sh
/usr/bin/python3 scripts/toneflix-release/upload-assets.py https://APPROVED-HOSTNAME
/usr/bin/python3 scripts/toneflix-release/apply-cdn.py
```

The finaliser refuses an unverified manifest. Local optimised references are currently used to test the candidate without pretending CDN verification is complete. Source preparation uses Sharp; scripts require externally installed dependencies (`sharp`, `playwright`, `@axe-core/playwright`). No credentials are stored in these files.

## Verification completed

- Established `check_site.py` and `check_discovery.py` pass: 19 public HTML files, 14 sitemap routes, local dependencies, identity and route checks. Static site: no framework build/lint package exists.
- Chromium, Firefox and WebKit: 320, 375, 390, 768, 1024 and 1440 CSS pixels; no accidental horizontal page overflow; one H1; no page JavaScript errors in recorded checks.
- Modal stops Lenis/background scrolling; Escape closes and focus returns; controls expose names and visible focus. Reduced motion disables Lenis and uses instant navigation.
- Home → Toneflix card → case study → work-section return passes. Work listing and Settle Club related link are present.
- No-JavaScript heading, first flow and return link remain available. 720-pixel effective viewport check represents layout at 200% of a 1440px viewport; this is not a complete real-browser text-zoom audit.
- `hero-390.png`, `hero-1440.png`, `flow-390.png`, `flow-1440.png` record the candidate. Cannot certify exact comparison with missing approved HTML.
- WebKit is Playwright desktop automation, **not real Safari/iPhone hardware testing**.
- Axe flags 11 deliberately pale decorative section numbers. They are redundant, `aria-hidden`, and retain the user's expressly requested appearance. Other detected text-contrast issues were corrected. No complete WCAG compliance claim.
- Link GET checker: 23 destinations checked. ukactive returned 403 using curl (Python TLS also failed), so source is retained and marked access-restricted rather than replaced. Other checked destinations resolved. No inferred source substitution.
- Privacy test: fresh 0 optional requests; rejected 0; accepted 8; withdrawn/reloaded 0, no remaining observed cookies. Recorded in `consent-checks.txt`.

## Lab performance

Lighthouse on localhost, mobile simulated throttling, headless Chromium, one optimised run:

| Metric | Result |
|---|---:|
| Performance | 82 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 2.6 s |
| LCP | 4.2 s |
| TBT | 40 ms |
| CLS | 0 |
| Speed index | 3.0 s |

`lighthouse-optimised-local.json` includes full conditions. This is **not field data**, and LCP still needs improvement/measurement on the hosted preview with CDN caching and compression. The earlier unoptimised local run was diagnostic and had concurrent browser activity; do not present it as a controlled before/after comparison.

## Privacy and protection

Current official ICO storage/consent guidance was consulted. The existing Clarity and Vercel analytics now require explicit opt-in. Accept, reject and preferences have equivalent controls; optional analytics is off by default; preference lasts 180 days. Withdrawal clears site-controlled Clarity storage and reloads to unload its runtime. Clarity ad storage is denied. Toneflix and its prototype run no analytics. `data-clarity.js` is an in-memory fictional chart demonstration, not Microsoft Clarity.

Privacy page describes actual providers and settings without claiming legal certification or unverified account retention. Guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/ . Microsoft consent documentation: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2 .

No real public submission endpoint was found in this release; prototype controls stay fictional and client-only. No CAPTCHA, blanket bot challenge or unnecessary form service added. Candidate headers: `nosniff`, strict-origin referrer policy, CSP restricting object embedding/base URL/frame ancestors. This is a limited policy, not a fully restrictive script CSP. No broad HSTS or WAF changes made. **None of these new controls is deployed yet.** Account-level bot/WAF controls and production header behaviour remain unverified.

## Release and rollback

Repository workflow: static checks → preview → review → production using authenticated Vercel owner CLI. Git production branch is `master`, but the current production deployment was CLI-created. Do not blindly deploy the dirty workspace: it contains pre-existing unrelated work. `production-baseline.json` records the existing deployed source comparison (1,231 of 1,246 files matched local source before our integration).

Production rollback target:

- Deployment: `dpl_6hprwP2JKKN9WSdti8HhtL3x9fHY`
- URL: `https://portfolio-4y796udc8-terryjohnpaul20-gmailcoms-projects.vercel.app`
- Vercel project: `portfolio`

Use Vercel's deployment rollback/promote workflow to restore that deployment if necessary. Immutable R2 objects are additive; leave them in place during rollback and restore previous code references. Do not delete objects or force-push.

Still required after the two blockers are resolved: compare approved source, attach/verify CDN, apply final URLs, protected hosted preview, rerun checks and final performance measurements, verify production redirect/status/MIME/security/cache behaviour, deploy through the established owner workflow, then verify real public URLs. No production deployment or PR is claimed by this report.
