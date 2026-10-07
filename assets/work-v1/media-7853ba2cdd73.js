/* Work-page media: show previews first; download video only when visible. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var connection = navigator.connection;
  var ready = false;
  var videos = [];
  var images = document.querySelectorAll('img[data-src]:not([data-opening-secondary])');
  var imageObserver;
  function loadImage(img) {
    if (!img.dataset.src) return;
    img.addEventListener('load', function () { img.classList.add('is-loaded'); }, { once: true });
    img.addEventListener('error', function () {
      img.alt = 'Preview unavailable';
      img.classList.add('is-loaded');
    }, { once: true });
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    img.src = img.dataset.src;
    delete img.dataset.src;
    if (imageObserver) imageObserver.unobserve(img);
  }
  function allowed() { return !reduced.matches && !(connection && connection.saveData); }
  function visible(state) {
    var rect = state.card.getBoundingClientRect();
    return !state.card.classList.contains('fade-out') && rect.width > 0 && rect.bottom > 0 && rect.top < innerHeight;
  }
  function stop(state) {
    state.video.pause();
    state.button.textContent = 'Play preview';
    state.button.setAttribute('aria-label', 'Play ' + state.name + ' preview');
    if (!allowed()) state.video.classList.remove('has-frame');
  }
  function play(state, manual) {
    if (state.pending || state.failed || document.hidden || !visible(state)) return;
    if (!manual && (!ready || !allowed() || state.userPaused || state.blocked)) return;
    if (!state.video.src) { state.video.src = state.video.dataset.src; state.video.load(); }
    state.pending = true;
    state.video.play().then(function () {
      state.pending = false;
      if (document.hidden || !visible(state) || (!manual && (!allowed() || state.userPaused))) { stop(state); return; }
      state.video.classList.add('has-frame');
      state.button.textContent = 'Pause preview';
      state.button.setAttribute('aria-label', 'Pause ' + state.name + ' preview');
    }).catch(function () {
      state.pending = false;
      state.blocked = true;
      stop(state);
    });
  }
  function update() {
    videos.forEach(function (state) {
      if (document.hidden || !visible(state) || !allowed()) stop(state);
      else play(state, false);
    });
  }
  document.querySelectorAll('video[data-src]').forEach(function (video) {
    var card = video.closest('.project-card');
    var button = document.createElement('button');
    var name = card.querySelector('.project-card-title').textContent;
    button.type = 'button'; button.className = 'video-toggle';
    button.textContent = 'Play preview'; button.setAttribute('aria-label', 'Play ' + name + ' preview');
    card.appendChild(button);
    var state = {video:video,card:card,button:button,name:name};
    videos.push(state);
    video.addEventListener('error', function () {
      state.failed = true; video.classList.remove('has-frame');
      button.textContent = 'Preview unavailable'; button.disabled = true;
    });
    button.addEventListener('click', function () {
      if (!video.paused) { state.userPaused = true; stop(state); }
      else { state.userPaused = false; state.blocked = false; play(state, true); }
    });
  });
  var observer = 'IntersectionObserver' in window ? new IntersectionObserver(update, {threshold:[0,0.1,0.5]}) : null;
  videos.forEach(function (state) { if (observer) observer.observe(state.card); });
  document.addEventListener('visibilitychange', update);
  document.addEventListener('work:filter', update);
  reduced.addEventListener('change', update);
  if (connection && connection.addEventListener) connection.addEventListener('change', update);
  if (!observer) window.addEventListener('scroll', update, {passive:true});
  // Wait for the opening images before letting lower-priority media compete.
  var critical = Array.from(document.querySelectorAll('img[data-critical]'));
  var primaryReady = Promise.all(critical.map(function (img) {
    return img.decode ? img.decode().catch(function () {}) : Promise.resolve();
  }));
  var secondary = document.querySelector('img[data-opening-secondary]');
  function loadSecondary() {
    if (!secondary) return Promise.resolve();
    loadImage(secondary);
    return secondary.decode ? secondary.decode().catch(function () {}) : Promise.resolve();
  }
  // On a one-column screen, finish the first card before requesting the next.
  var secondaryReady = innerWidth <= 768 ? primaryReady.then(loadSecondary) : loadSecondary();
  Promise.all([primaryReady,secondaryReady]).then(function () {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      if ('IntersectionObserver' in window) {
        imageObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) { if (entry.isIntersecting) loadImage(entry.target); });
        }, {rootMargin:'150px 0px'});
        images.forEach(function (img) { imageObserver.observe(img); });
      } else images.forEach(loadImage);
      ready = true; update();
    }); });
  });
  // Footer fonts are not on the initial rendering path.
  var footer = document.querySelector('#cta');
  if (footer && 'IntersectionObserver' in window && document.fonts) {
    var fontObserver = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      fontObserver.disconnect();
      Promise.all([document.fonts.load('48px "Redaction 10 Regular"'),document.fonts.load('italic 48px "Redaction 50 Italic"')]).then(function () {
        document.documentElement.classList.add('footer-fonts-ready');
      }).catch(function () {});
    }, {rootMargin:'600px'});
    fontObserver.observe(footer);
  }
})();
