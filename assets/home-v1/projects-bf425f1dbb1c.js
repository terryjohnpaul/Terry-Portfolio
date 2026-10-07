/* Selected work: visibility-driven media and narrative, independent of GSAP. */
(function () {
  'use strict';

  function init() {
    var section = document.getElementById('featured-works');
    if (!section) return;
    var cards = Array.from(section.querySelectorAll('[data-project-id]'));
    var subtitles = section.querySelectorAll('[data-ref-subtitle-item]');
    var descriptions = section.querySelectorAll('[data-ref-description-item]');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var desktop = window.matchMedia('(min-width: 74.625rem)');
    var pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    var connection = navigator.connection;
    var states = [];
    var frame = 0;
    var activeIndex = -1;
    var pageHidden = false;
    var posters = new Map();
    var deferredImages = section.querySelectorAll('img[data-src]');
    var criticalPoster = section.querySelector('[data-project-id="pixelbin"] img.project-poster');

    section.querySelectorAll('img.project-poster, img[data-src]').forEach(function (image) {
      var status = { ready: false, failed: false, decoding: false };
      posters.set(image, status);
      function failed() {
        status.failed = true;
        status.ready = false;
        status.decoding = false;
        schedule();
      }
      function loaded() {
        if (!image.complete || !image.naturalWidth || status.decoding) return;
        image.classList.add('is-loaded');
        status.failed = false;
        status.decoding = true;
        // Wait for a useful painted preview before allowing competing video requests.
        Promise.resolve().then(function () {
          return image.decode ? image.decode() : undefined;
        }).then(function () {
          status.decoding = false;
          status.ready = image.complete && image.naturalWidth > 0;
          schedule();
        }, failed);
      }
      image.addEventListener('load', loaded);
      image.addEventListener('error', failed);
      if (image.complete && !image.dataset.src && !image.dataset.srcset) {
        if (image.naturalWidth > 0) loaded();
        else failed();
      }
    });

    function hydrateImages() {
      var critical = posters.get(criticalPoster);
      if (critical && !critical.ready && !critical.failed) return;
      deferredImages.forEach(function (image) {
        if (!image.dataset.src && !image.dataset.srcset) return;
        var rect = image.getBoundingClientRect();
        if (!rect.width || !rect.height || rect.bottom < -300 ||
            rect.top > window.innerHeight + 300 || rect.right < -300 ||
            rect.left > window.innerWidth + 300) return;
        var status = posters.get(image);
        status.failed = false;
        status.ready = false;
        // Our viewport gate owns loading; do not defer again to native lazy heuristics.
        image.loading = 'eager';
        if (image.dataset.srcset) {
          image.srcset = image.dataset.srcset;
          delete image.dataset.srcset;
        }
        if (image.dataset.src) {
          image.src = image.dataset.src;
          delete image.dataset.src;
        }
      });
    }

    function visiblePostersReady() {
      for (var entry of posters) {
        var image = entry[0];
        var status = entry[1];
        var rect = image.getBoundingClientRect();
        var onscreen = rect.width > 0 && rect.height > 0 && rect.bottom > 0 &&
          rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
        // A failed image must not indefinitely block the other projects.
        if (onscreen && !status.failed && !(status.ready && image.complete && image.naturalWidth > 0)) return false;
      }
      return true;
    }

    function visible(element) {
      var rect = element.getBoundingClientRect();
      var height = window.innerHeight;
      var width = window.innerWidth;
      var overlap = Math.min(rect.bottom, height) - Math.max(rect.top, 0);
      return rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < width &&
        overlap >= Math.min(rect.height, height) * 0.2;
    }

    function allowed(state) {
      var poster = posters.get(state.poster);
      return !pageHidden && !document.hidden && visible(state.video) && state.manual !== 'pause' &&
        !state.blocked && (state.manual === 'play' ||
          (poster && poster.ready && visiblePostersReady() &&
            !motion.matches && !(connection && connection.saveData)));
    }

    function revealFrame(state) {
      // loadeddata alone is not playback: retain the image until playing has fired.
      if (state.playing && !state.video.paused && !state.video.error &&
          state.video.readyState >= 2 && allowed(state)) {
        state.video.classList.add('has-frame');
      }
    }

    function renderControl(state) {
      var playing = state.pending || !state.video.paused;
      state.button.textContent = playing ? 'Pause preview' : 'Play preview';
      state.button.setAttribute('aria-label', (playing ? 'Pause' : 'Play') + ' ' + state.name + ' video preview');
    }

    function hydrate(video) {
      var changed = false;
      [video].concat(Array.from(video.querySelectorAll('source'))).forEach(function (source) {
        if (source.dataset.src) {
          source.src = source.dataset.src;
          delete source.dataset.src;
          changed = true;
        }
      });
      if (changed) video.load();
    }

    function stop(state) {
      // Invalidate callbacks before pausing: pause can reject an outstanding play().
      state.request += 1;
      state.pending = false;
      state.playing = false;
      state.video.pause();
      renderControl(state);
    }

    function playback(state) {
      if (!allowed(state)) {
        stop(state);
        return;
      }
      if (state.pending || !state.video.paused) return;
      hydrate(state.video);
      var request = ++state.request;
      state.pending = true;
      renderControl(state);
      var attempt;
      try { attempt = state.video.play(); } catch (error) { attempt = Promise.reject(error); }
      Promise.resolve(attempt).then(function () {
        if (request !== state.request) return;
        state.pending = false;
        if (!allowed(state)) state.video.pause();
        renderControl(state);
      }, function (error) {
        if (request !== state.request) return;
        state.pending = false;
        // An interrupted request can retry on the next visibility change.
        if (!error || error.name !== 'AbortError') state.blocked = true;
        state.playing = false;
        state.video.classList.remove('has-frame');
        renderControl(state);
      });
    }

    cards.forEach(function (card, cardIndex) {
      var heading = card.querySelector('h3');
      var name = heading ? heading.textContent.trim() : card.dataset.projectId;
      card.querySelectorAll('video').forEach(function (video, videoIndex) {
        video.autoplay = false;
        video.removeAttribute('autoplay');
        video.preload = 'none';
        video.muted = true;
        video.playsInline = true;
        video.pause();
        if (!video.id) video.id = 'work-preview-' + cardIndex + '-' + videoIndex;
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'work-video-toggle';
        button.setAttribute('data-video-toggle', '');
        button.setAttribute('aria-controls', video.id);
        // The article owns the control; it must never be inside the case-study link.
        card.appendChild(button);
        var media = video.closest('.card-media-wrap') || card;
        var state = { video: video, button: button, name: name, manual: null, blocked: false,
          pending: false, playing: false, request: 0, poster: media.querySelector('img.project-poster') };
        if (state.poster) {
          function syncNativePoster() {
            if (state.poster.complete && state.poster.naturalWidth > 0) {
              video.poster = state.poster.currentSrc || state.poster.src;
            }
          }
          state.poster.addEventListener('load', syncNativePoster);
          syncNativePoster();
        }
        video.classList.remove('has-frame');
        states.push(state);
        button.addEventListener('click', function () {
          state.manual = state.pending || !video.paused ? 'pause' : 'play';
          state.blocked = false;
          // src remains assigned after hydration; load() resets a terminal media error.
          if (state.manual === 'play' && video.error) video.load();
          playback(state);
        });
        video.addEventListener('play', function () {
          if (!allowed(state)) video.pause();
          renderControl(state);
        });
        video.addEventListener('playing', function () {
          state.playing = true;
          revealFrame(state);
          renderControl(state);
        });
        video.addEventListener('loadeddata', function () { revealFrame(state); });
        video.addEventListener('emptied', function () {
          state.playing = false;
          video.classList.remove('has-frame');
        });
        video.addEventListener('pause', function () {
          state.playing = false;
          renderControl(state);
        });
        video.addEventListener('error', function () {
          state.blocked = true;
          stop(state);
          video.classList.remove('has-frame');
          renderControl(state);
        });
        renderControl(state);
      });
    });

    function update() {
      frame = 0;
      hydrateImages();
      var nearest = activeIndex < 0 ? 0 : activeIndex;
      var distance = Infinity;
      cards.forEach(function (card, index) {
        var media = card.querySelector('.card-media-wrap') || card;
        if (!visible(media)) return;
        var rect = media.getBoundingClientRect();
        var nextDistance = Math.abs((rect.top + rect.bottom) / 2 - window.innerHeight / 2);
        if (nextDistance < distance) { distance = nextDistance; nearest = index; }
      });
      activeIndex = nearest;
      cards.forEach(function (card, index) {
        card.style.opacity = desktop.matches && !motion.matches && index !== activeIndex && !card.contains(document.activeElement) ? '0.2' : '1';
      });
      subtitles.forEach(function (item, index) {
        item.style.transform = 'translateY(' + (index < activeIndex ? '-100%' : index > activeIndex ? '100%' : '0') + ')';
        item.setAttribute('aria-hidden', String(index !== activeIndex));
      });
      descriptions.forEach(function (item, index) {
        item.style.opacity = index === activeIndex ? '1' : '0';
        item.style.visibility = index === activeIndex ? 'visible' : 'hidden';
        item.style.transitionDelay = '0ms';
        item.setAttribute('aria-hidden', String(index !== activeIndex));
      });
      states.forEach(function (state) {
        // Also supports old responsive copies while markup is being consolidated.
        state.button.hidden = !state.video.getClientRects().length;
        playback(state);
      });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    section.addEventListener('focusin', schedule);
    section.addEventListener('focusout', schedule);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) states.forEach(stop);
      else schedule();
    });
    window.addEventListener('pagehide', function () {
      pageHidden = true;
      states.forEach(stop);
    });
    window.addEventListener('pageshow', function () { pageHidden = false; schedule(); });
    function preferenceChanged() {
      states.forEach(playback);
      schedule();
    }
    if (motion.addEventListener) motion.addEventListener('change', preferenceChanged);
    else if (motion.addListener) motion.addListener(preferenceChanged);
    if (connection && connection.addEventListener) connection.addEventListener('change', preferenceChanged);
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(schedule, { threshold: [0, 0.2, 0.5, 1] });
      cards.forEach(function (card) { observer.observe(card); });
      states.forEach(function (state) { observer.observe(state.video); });
      var imageObserver = new IntersectionObserver(schedule, { rootMargin: '300px' });
      deferredImages.forEach(function (image) { imageObserver.observe(image); });
    }

    section.querySelectorAll('.card-media-wrap').forEach(function (wrap) {
      var cursor = wrap.querySelector('.card-cursor');
      if (!cursor) return;
      cursor.setAttribute('aria-hidden', 'true');
      wrap.addEventListener('pointermove', function (event) {
        if (!desktop.matches || !pointer.matches || motion.matches) {
          cursor.classList.remove('is-visible');
          return;
        }
        var rect = wrap.getBoundingClientRect();
        cursor.style.left = (event.clientX - rect.left) + 'px';
        cursor.style.top = (event.clientY - rect.top) + 'px';
        cursor.classList.add('is-visible');
      });
      wrap.addEventListener('pointerleave', function () { cursor.classList.remove('is-visible'); });
    });
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
