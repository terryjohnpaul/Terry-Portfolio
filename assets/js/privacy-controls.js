/* Optional analytics stays unloaded until an explicit choice. */
(() => {
 'use strict';
 const key='portfolio-privacy-v1', lifetime=180*24*60*60*1000;
 const useClarity=document.currentScript.hasAttribute('data-clarity');
 const useVercel=document.currentScript.hasAttribute('data-vercel-analytics');
 const eligible=useClarity||useVercel;
 let loaded=false, state=null, returnFocus=null;
 try{state=JSON.parse(localStorage.getItem(key));if(!state||Date.now()-state.savedAt>lifetime)state=null;}catch(_){}
 function clearOptional(){
  for(const name of ['_clck','_clsk'])for(const domain of ['',location.hostname,'.'+location.hostname,'.terryjohn.me'])document.cookie=name+'=; Max-Age=0; Path=/; SameSite=Lax'+(domain?'; Domain='+domain:'');
  for(const storageName of ['localStorage','sessionStorage'])try{const store=window[storageName];Object.keys(store).filter(k=>/^_cl(ck|sk|tk)$/.test(k)).forEach(k=>store.removeItem(k));}catch(_){}
 }
 function start(){
  if(!eligible||loaded)return;loaded=true;
  if(useVercel){const v=document.createElement('script');v.src='https://va.vercel-scripts.com/v1/script.js';v.dataset.endpoint='/_vercel/insights';v.defer=true;document.head.append(v);}
  if(!useClarity)return;
  window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
  window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});
  const s=document.createElement('script');s.src='https://www.clarity.ms/tag/x06tjk9wcc';s.async=true;document.head.append(s);
 }
 function save(analytics){
  state={analytics,savedAt:Date.now()};try{localStorage.setItem(key,JSON.stringify(state));}catch(_){}
  banner.hidden=true;dialog.close();
  if(analytics)start();else{
   clearOptional();
   // A clean document unloads the vendor runtime, including cookieless tracking.
   if(loaded){location.reload();return;}
  }
  if(returnFocus?.isConnected)returnFocus.focus();
 }
 const banner=document.createElement('aside');banner.className='privacy-banner';banner.setAttribute('aria-label','Cookie choices');
 banner.innerHTML='<p><strong>Your privacy choices</strong></p><p>Optional analytics from Microsoft Clarity and Vercel helps me understand visits. Clarity includes heatmaps and session recordings. It stays off unless you accept. Your choice is saved for six months. <a href="/privacy/">Privacy information</a></p><div class="privacy-actions"><button type="button" data-choice="yes">Accept all</button><button type="button" data-choice="no">Reject optional</button><button type="button" data-choice="settings">Preferences</button></div>';
 banner.hidden=!!state||!eligible;document.body.append(banner);
 const dialog=document.createElement('dialog');dialog.className='privacy-dialog';dialog.setAttribute('aria-labelledby','privacy-heading');
 dialog.innerHTML='<div class="privacy-heading-row"><h2 id="privacy-heading">Privacy preferences</h2><button type="button" class="privacy-close" data-choice="close" aria-label="Close privacy preferences">×</button></div><p class="privacy-intro">Choose whether to allow optional analytics. You can change your choice at any time.</p><div class="privacy-essential"><div><strong>Essential storage</strong><p>Remembers your privacy choice for six months.</p></div><span class="privacy-required">Always on</span></div><label class="privacy-option"><input type="checkbox" id="privacy-analytics"><span><strong>Optional analytics</strong>Microsoft Clarity heatmaps and session recordings, and Vercel traffic analytics on selected portfolio pages.</span></label><p class="privacy-note">Toneflix and its fictional prototype do not run analytics.</p><div class="privacy-actions"><button type="button" data-choice="save">Save preferences</button><button type="button" data-choice="no">Reject optional</button></div><p class="privacy-policy"><a href="/privacy/">Read the privacy information</a></p>';
 document.body.append(dialog);
 function show(){returnFocus=document.activeElement;dialog.querySelector('input').checked=!!state?.analytics;dialog.showModal();}
 for(const el of [banner,dialog])el.addEventListener('click',e=>{const action=e.target.dataset.choice;if(action==='yes')save(true);if(action==='no')save(false);if(action==='settings')show();if(action==='save')save(dialog.querySelector('input').checked);if(action==='close')dialog.close();});
 dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
 document.querySelectorAll('[data-privacy-settings]').forEach(el=>el.addEventListener('click',show));
 window.addEventListener('storage',e=>{if(e.key===key)location.reload();});
 if(state?.analytics)start();else clearOptional();
})();
