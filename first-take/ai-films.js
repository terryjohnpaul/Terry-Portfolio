/* ── Timezone display (top-right) ── */
(function() {
  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var abbr = tz ? tz.split('/').pop().replace(/_/g, ' ') : '';
  var el = document.getElementById('site-timezone');
  if (el) {
    function tick() {
      var now = new Date();
      var t = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      el.textContent = abbr + ' ' + t;
    }
    tick();
    setInterval(tick, 1000);
  }
})();

/* ── Music toggle ── */
(function() {
  var btn = document.getElementById('music-btn');
  var audio = document.getElementById('site-audio');
  var vid = document.getElementById('site-video');
  if (!btn || !audio) return;
  var playing = false;
  btn.addEventListener('click', function() {
    if (playing) {
      audio.pause();
      if (vid) vid.pause();
      btn.classList.remove('playing');
    } else {
      audio.play().catch(function(){});
      if (vid) vid.play().catch(function(){});
      btn.classList.add('playing');
    }
    playing = !playing;
  });
})();

/* ── Nav pill position ── */
(function() {
  var nav = document.getElementById('top-nav');
  var pill = document.getElementById('top-nav-pill');
  var active = nav && nav.querySelector('.top-nav-item.active');
  if (nav && pill && active) {
    var navRect = nav.getBoundingClientRect();
    var r = active.getBoundingClientRect();
    pill.style.left = (r.left - navRect.left) + 'px';
    pill.style.top = (r.top - navRect.top) + 'px';
    pill.style.width = r.width + 'px';
    pill.style.height = r.height + 'px';
  }
})();

/* ── Scroll Reveal ── */
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

/* ── Mute/Unmute toggle ── */
document.querySelectorAll('.mute-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var video = btn.closest('.video-wrap').querySelector('video');
    if (!video) return;
    video.muted = !video.muted;
    var muted = btn.querySelector('.icon-muted');
    var unmuted = btn.querySelector('.icon-unmuted');
    if (video.muted) {
      muted.style.display = '';
      unmuted.style.display = 'none';
    } else {
      muted.style.display = 'none';
      unmuted.style.display = '';
    }
  });
});

/* ── Lazy video play/pause on scroll ── */
var videoObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      if (entry.target.preload === 'none') entry.target.preload = 'metadata';
      entry.target.play().catch(function(){});
    } else {
      entry.target.pause();
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.visual-grid video').forEach(function(v) {
  v.pause();
  v.removeAttribute('autoplay');
  videoObserver.observe(v);
});

/* ── Disable right-click download on all videos ── */
document.querySelectorAll('video').forEach(function(v) {
  v.addEventListener('contextmenu', function(e) { e.preventDefault(); });
});

/* ── Force mailto link to open mail app ── */
document.querySelectorAll('a[href^="mailto:"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = a.href;
  });
});

/* ── Tab title — away message ── */
(function() {
  var defaultTitle = 'Terry John — Directing the Machine';
  var awayTitle = 'Please come back ! \u{1F44B}';
  document.addEventListener('visibilitychange', function() {
    document.title = document.hidden ? awayTitle : defaultTitle;
  });
})();

/* ── Custom Cursor ── */
(function() {
  var cur = document.getElementById('cursor');
  if (!cur || window.matchMedia('(hover: none)').matches) return;

  document.addEventListener('mousemove', function(e) {
    cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
    cur.classList.add('visible');
  }, { passive: true });
  document.addEventListener('mouseleave', function() { cur.classList.remove('visible'); });

  function addState(selector, cls) {
    document.querySelectorAll(selector).forEach(function(el) {
      el.addEventListener('mouseenter', function() { cur.classList.add(cls); });
      el.addEventListener('mouseleave', function() { cur.classList.remove(cls); });
    });
  }

  addState('.intro__title', 'on-text');
  addState('img, video', 'on-big');
  addState('.footer-cta-btn, .top-nav-item, .top-nav-link, .mute-btn, a', 'on-big');
})();
