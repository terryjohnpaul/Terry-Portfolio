'use strict';
// BASE_URL=http://localhost:8000 PLAYWRIGHT_PATH=/path/to/playwright node scripts/check_homepage_release.cjs
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://localhost:8000';
const origin = new URL(base).origin;
let playwright;
for (const name of [process.env.PLAYWRIGHT_PATH, 'playwright', '/Users/terrypaul/.npm/_npx/9833c18b2d85bc59/node_modules/playwright'].filter(Boolean)) {
  try { playwright = require(name); break; } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
}
if (!playwright) throw Error('Install Playwright or set PLAYWRIGHT_PATH.');
const report = { base, scenarios: [], passed: false };
(async () => {
  const browser = await playwright.chromium.launch();
  try {
    for (const [width, reduced] of [[1440,false],[1024,false],[800,false],[390,false],[320,false],[1440,true],[390,true]]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: reduced ? 'reduce' : 'no-preference', permissions: ['clipboard-read','clipboard-write'] });
      try {
        const page = await context.newPage();
        if (new URL(base).hostname.endsWith('.vercel.app')) {
          const accessFile = process.env.PREVIEW_ACCESS_FILE;
          if (accessFile) {
            const secret = JSON.parse(fs.readFileSync(accessFile)).secret;
            const r = await page.request.get(base, { headers: {'x-vercel-protection-bypass':secret,'x-vercel-set-bypass-cookie':'true'}, maxRedirects:0 });
            assert([200,307].includes(r.status()), 'Preview access failed');
          }
        }
        await context.addInitScript(() => localStorage.setItem('portfolio-privacy-v1', JSON.stringify({analytics:false,savedAt:Date.now()})));
        await context.route('**/*', r => {
          const u = new URL(r.request().url());
          if (u.hostname === 'mail.google.com') return r.fulfill({contentType:'text/html',body:'<title>Gmail destination verified</title>'});
          return u.origin === origin ? r.continue() : r.abort();
        });
        await page.goto(base, {waitUntil:'load'});
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('.hero-headline .h-reg').innerText(), 'I design things that are easy to use.');
        assert(await page.locator('.hero-headline').evaluate(el => { const r=document.createRange(); r.selectNodeContents(el); return [...r.getClientRects()].every(b=>b.left>=0&&b.right<=innerWidth); }), 'Headline overflows');
        for (const selector of ['.hero-cta-primary','.footer-cta-btn']) {
          const button=page.locator(selector), url=new URL(await button.getAttribute('href'));
          assert.equal(url.hostname,'mail.google.com'); assert.equal(url.searchParams.get('to'),'terryjohnpaul20@gmail.com'); assert.equal(url.searchParams.get('su'),"Let's connect, Terry John");
          assert.equal((await button.innerText()).trim(),'Get in touch');
          const next=page.waitForEvent('popup'); await button.click(); const popup=await next; await popup.waitForLoadState('domcontentloaded'); assert.equal(new URL(popup.url()).hostname,'mail.google.com'); await popup.close();
        }
        const primary=await page.locator('.footer-cta-btn').boundingBox(), secondary=await page.locator('.cta-copy-btn').boundingBox();
        assert.equal(primary.height,secondary.height); if(width>=600) assert.equal(primary.y,secondary.y);
        assert(secondary.x>=0&&secondary.x+secondary.width<=width);
        const label=await page.locator('.cta-label').boundingBox(); assert(label.y>=secondary.y+secondary.height);
        const copy=page.locator('.cta-copy-btn'); await copy.click();
        assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'terryjohnpaul20@gmail.com');
        assert.equal(await page.locator('.cta-copy-action-label').innerText(),'Copied');
        await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(Error('Permission denied'))},configurable:true}));
        await copy.click(); assert.equal(await page.evaluate(()=>getSelection().toString()),'terryjohnpaul20@gmail.com'); assert(await page.locator('.cta-email-copy').getAttribute('data-copy-error')!==null);
        assert.equal(await page.locator('.footer-case-studies').count(),0);
        assert.equal(await page.locator('.footer-right a[href="/privacy/"]').count(),1);
        await page.locator('.footer-right [data-privacy-settings]').click(); assert(await page.locator('.privacy-dialog').evaluate(d=>d.open)); await page.keyboard.press('Escape');
        async function scroll(top) { await page.evaluate(top=>{if(window.lenis)window.lenis.scrollTo(top,{immediate:true});else scrollTo({top,behavior:'instant'});},top); await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))); }
        const start=await page.locator('.capability-row').last().evaluate(el=>scrollY+el.getBoundingClientRect().top-200);
        for(const offset of [0,200,400,600,800,1000,1200,1000,800,600,400,200,0]) {
          await scroll(start+offset);
          assert(await page.evaluate(()=>{const cap=document.querySelector('#capabilities').getBoundingClientRect();return [...document.querySelectorAll('[data-ref-featured-project-title],[data-ref-featured-project-description]')].every(el=>{const r=el.getBoundingClientRect();return !(cap.bottom>0&&r.height>0&&r.bottom>0&&r.top<innerHeight)||r.top>=cap.bottom-1;});}), 'Selected work overlaps capabilities');
        }
        await page.locator('[data-project-id="pixelbin"]').evaluate(el=>{const top=scrollY+el.getBoundingClientRect().top-innerHeight*.25;if(window.lenis)window.lenis.scrollTo(top,{immediate:true});else scrollTo({top,behavior:'instant'});});
        const toggle=page.locator('[data-project-id="pixelbin"] .work-video-toggle'), video=page.locator('[data-project-id="pixelbin"] video');
        await toggle.waitFor({state:'visible'}); const rect=await toggle.boundingBox(); assert.equal(rect.width,44);assert.equal(rect.height,44);assert.equal((await toggle.innerText()).trim(),'');
        if(reduced) {assert(await video.evaluate(v=>v.paused));await toggle.click();}
        await page.waitForFunction(()=>{const v=document.querySelector('[data-project-id="pixelbin"] video');return !v.paused&&v.currentTime>0;});
        assert.match(await toggle.getAttribute('aria-label'),/^Pause/);await toggle.click();assert(await video.evaluate(v=>v.paused));assert.match(await toggle.getAttribute('aria-label'),/^Play/);
        await toggle.focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>!document.querySelector('[data-project-id="pixelbin"] video').paused);
        report.scenarios.push({width,reduced,passed:true});console.log(`PASS ${width}px ${reduced?'reduced':'normal'}: headline, Gmail, clipboard, footer, scroll boundary, video controls`);
      } finally { await context.close(); }
    }
    report.passed=true;
  } finally { await browser.close(); if(process.env.REPORT_PATH)fs.writeFileSync(process.env.REPORT_PATH,JSON.stringify(report,null,2)); }
})().catch(e=>{console.error(e);process.exitCode=1;});
