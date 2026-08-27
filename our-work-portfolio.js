/* ==========================================================================
   Featured Projects — Standalone GSAP ScrollTrigger Logic
   Ported from: js/2087-6807d0478c6325c9.js, module 36382

   Adaptations from original compiled React/Next.js source:
   1. React useRef/useState/useEffect → vanilla DOM + state object
   2. gsap.context scope replaced with direct ScrollTrigger targeting
   3. Removed custom cursor system (setCursorSettings) — not in scope
   4. Removed page-transition system (setRequestedPage) — links use <a>
   5. Removed media-mirror preloading (addMedia) — no Sanity CDN
   6. Video play/pause uses native DOM instead of React state

   All animation values preserved from original:
   - Reveal: start "top center", end "top 25%", scrub
   - Activation: start "top center", end "bottom center"
   - Active opacity: 1 | Inactive opacity: 0.2
   - Title slide: 333ms cubic-bezier(0,0,0,1) enter, 133ms exit
   - Description/footer: 167ms linear, 333ms active delay
   ========================================================================== */

(function () {
  'use strict';

  const BREAKPOINT_SM = 834;
  const BREAKPOINT_MD = 1194;

  const section = document.getElementById('featured-works');
  if (!section) return;

  const container = section.querySelector('[data-ref-container]');
  const projectCards = section.querySelectorAll('[data-project-id]');
  const subtitleItems = section.querySelectorAll('[data-ref-subtitle-item]');
  const descriptionItems = section.querySelectorAll('[data-ref-description-item]');

  let activeIndex = 0;
  const projectCount = projectCards.length;

  function isDesktop() {
    return window.innerWidth >= BREAKPOINT_MD;
  }

  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function updateActiveProject(index) {
    if (index === activeIndex && index !== 0) return;
    activeIndex = index;

    projectCards.forEach(function (card, i) {
      if (isDesktop()) {
        card.style.opacity = i === activeIndex ? '1' : '0.2';
      }
    });

    subtitleItems.forEach(function (item, i) {
      item.classList.remove('translate-y-0', 'translate-y-full', '-translate-y-full');
      item.style.transitionDuration = '';
      item.style.transitionTimingFunction = '';
      item.style.transform = '';

      if (i < activeIndex) {
        item.style.transform = 'translateY(-100%)';
        item.style.transitionDuration = '133ms';
        item.style.transitionTimingFunction = 'cubic-bezier(0.75, 0, 0.85, 1)';
      } else if (i > activeIndex) {
        item.style.transform = 'translateY(100%)';
        item.style.transitionDuration = '133ms';
        item.style.transitionTimingFunction = 'cubic-bezier(0.75, 0, 0.85, 1)';
      } else {
        item.style.transform = 'translateY(0)';
        item.style.transitionDuration = '333ms';
        item.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0, 1)';
      }
    });

    descriptionItems.forEach(function (item, i) {
      if (i === activeIndex) {
        item.style.opacity = '1';
        item.style.transitionDelay = '333ms';
      } else {
        item.style.opacity = '0';
        item.style.transitionDelay = '0ms';
      }
    });

    handleVideoPlayback();
  }

  function handleVideoPlayback() {
    projectCards.forEach(function (card, i) {
      var videos = card.querySelectorAll('video');
      videos.forEach(function (video) {
        if (i === activeIndex) {
          if (video.paused) {
            video.play().catch(function () {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      });
    });
  }

  function initDesktopAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    var mm = gsap.matchMedia();

    mm.add('(min-width: ' + BREAKPOINT_MD + 'px)', function () {
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'top 25%',
          scrub: true
        }
      }).to(
        '[data-ref-featured-project-title], [data-ref-featured-project-subtitle], [data-ref-featured-project-description]',
        {
          opacity: 1,
          duration: 0.2,
          ease: 'linear'
        }
      );

      projectCards.forEach(function (card, index) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top center',
          end: 'bottom center',
          onEnter: function () {
            updateActiveProject(index);
          },
          onEnterBack: function () {
            updateActiveProject(index);
          }
        });
      });

      return function () {};
    });

    return mm;
  }

  function initVideoPlayPause() {
    var buttons = section.querySelectorAll('[data-video-toggle]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var wrapper = btn.closest('[data-media-mirror-id]');
        if (!wrapper) return;
        var video = wrapper.querySelector('video');
        if (!video) return;
        if (video.paused) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    });
  }

  function initLinkBehaviour() {
    var links = section.querySelectorAll('a[href="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  }


  function initCursorFollow() {
    if (window.innerWidth < BREAKPOINT_MD) return;

    var siteCur = document.getElementById('site-cursor');
    var wraps = section.querySelectorAll('.card-media-wrap');

    wraps.forEach(function (wrap) {
      var cursor = wrap.querySelector('.card-cursor');
      if (!cursor) return;

      wrap.style.cursor = 'none';

      wrap.addEventListener('mouseenter', function (e) {
        var rect = wrap.getBoundingClientRect();
        cursor.style.left = (e.clientX - rect.left) + 'px';
        cursor.style.top = (e.clientY - rect.top) + 'px';
        cursor.classList.add('is-visible');
        if (siteCur) siteCur.classList.add('hidden-for-card');
      });

      wrap.addEventListener('mousemove', function (e) {
        var rect = wrap.getBoundingClientRect();
        cursor.style.left = (e.clientX - rect.left) + 'px';
        cursor.style.top = (e.clientY - rect.top) + 'px';
      });

      wrap.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-visible');
        if (siteCur) siteCur.classList.remove('hidden-for-card');
      });
    });
  }

  function init() {
    var mm = null;

    if (!isReducedMotion()) {
      mm = initDesktopAnimations();
    }

    initVideoPlayPause();
    initLinkBehaviour();
    initCursorFollow();
    updateActiveProject(0);

    if (isDesktop()) {
      projectCards.forEach(function (card, i) {
        card.style.opacity = i === 0 ? '1' : '0.2';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
