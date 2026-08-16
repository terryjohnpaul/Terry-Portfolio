(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Evidence Reveal ──
  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll('.k-a');
    if (revealElements.length && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
      revealElements.forEach(function (el) { revealObserver.observe(el); });
    }
  }


  // ── Panoramic Viewer (Chapter I) ──
  var panoramicSection = document.getElementById('panoramic-1');
  if (panoramicSection && !prefersReducedMotion && window.innerWidth >= 768) {
    var imageWrap = document.getElementById('panoramic-1-wrap');
    var scrollTrack = document.getElementById('panoramic-1-track');

    if (imageWrap && scrollTrack) {
      var zoomTargets = [
        { scale: 1, x: 0, y: 0 },
        { scale: 2.2, x: -15, y: -10 },
        { scale: 2.8, x: 20, y: 5 },
        { scale: 2.4, x: -25, y: 15 }
      ];

      var panoramicRaf = null;
      function updatePanoramic() {
        panoramicRaf = null;
        var trackRect = scrollTrack.getBoundingClientRect();
        var trackHeight = scrollTrack.offsetHeight;
        if (trackHeight === 0) return;
        var progress = Math.max(0, Math.min(1, -trackRect.top / trackHeight));
        var count = zoomTargets.length;
        var raw = progress * count;
        var idx = Math.min(Math.floor(raw), count - 1);
        var next = Math.min(idx + 1, count - 1);
        var local = Math.max(0, Math.min(1, raw - idx));
        var s = zoomTargets[idx].scale + (zoomTargets[next].scale - zoomTargets[idx].scale) * local;
        var x = zoomTargets[idx].x + (zoomTargets[next].x - zoomTargets[idx].x) * local;
        var y = zoomTargets[idx].y + (zoomTargets[next].y - zoomTargets[idx].y) * local;
        imageWrap.style.transform = 'scale(' + s.toFixed(4) + ') translate(' + x.toFixed(2) + '%, ' + y.toFixed(2) + '%)';
      }

      window.addEventListener('scroll', function () {
        if (!panoramicRaf) panoramicRaf = requestAnimationFrame(updatePanoramic);
      }, { passive: true });
    }
  }
})();
