/* ----------------------------------------------------------
   PAGE LOADER
   White overlay. Dismissed when critical fonts are ready.

   WHY NOT window.load:
   window.load waits for every image on the page — testimonial
   avatars, carousel images, all of it. That can be 5–10s.
   Users stare at the loader while content is already painted.

   NEW TRIGGER — document.fonts.ready:
   Resolves once all fonts currently in use by the document
   have finished loading. With Phase 1 preloads in place,
   Regular 400 + Medium 500 + Redaction are fetched early,
   so this fires ~300–800ms after parse — not 5–10s.

   FALLBACK CHAIN:
   1. document.fonts.ready  (primary — fires when fonts done)
   2. DOMContentLoaded      (safety net if fonts.ready unavailable)
   3. setTimeout 5s         (hard cap — never blocks past 5s)
---------------------------------------------------------- */
(function () {
    var loader = document.getElementById('page-loader');
    var fill   = document.getElementById('loader-fill');
    if (!loader) return;

    /* Lock scroll while loading */
    document.body.style.overflow = 'hidden';

    var dismissed = false;

    /* Simulated progress bar: creep 0 → 85% while waiting */
    var pct = 0;
    var tick = setInterval(function () {
        pct = Math.min(pct + (Math.random() * 10 + 2), 85);
        if (fill) fill.style.width = pct + '%';
        if (pct >= 85) clearInterval(tick);
    }, 200);

    function dismiss() {
        if (dismissed) return;
        dismissed = true;
        clearInterval(tick);
        clearTimeout(fallback);
        if (fill) fill.style.width = '100%';
        /* 300ms grace: lets the bar visually complete before fade */
        setTimeout(function () {
            loader.classList.add('is-hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    /* Primary: wait for fonts, then dismiss
       Script runs at bottom of <body> so DOM is already parsed —
       no need to wait for DOMContentLoaded here. */
    if (document.fonts && typeof document.fonts.ready !== 'undefined') {
        document.fonts.ready.then(function () {
            dismiss();
        }).catch(function () {
            /* fonts.ready rejected (rare) — dismiss anyway */
            dismiss();
        });
    } else {
        /* Older browser: no fonts.ready API — fall through to timeout */
        if (document.readyState === 'complete') {
            dismiss();
        } else {
            window.addEventListener('load', dismiss, { once: true });
        }
    }

    /* Hard fallback — never block beyond 5s (reduced from 10s;
       safe now that Phase 1 preloads fonts early) */
    var fallback = setTimeout(dismiss, 5000);
})();



/* ----------------------------------------------------------
   P4 · DYNAMIC BACKGROUND SWAP
   IntersectionObserver on [data-bg] elements.
   When 50% visible → set #dynamic-bg background-color.
   Smooth transition handled by CSS (.4s ease).
---------------------------------------------------------- */
function initDynamicBg() {
    var wrapper = document.getElementById('dynamic-bg');
    if (!wrapper || !window.IntersectionObserver) return;

    /* Observer 1 — background colour swap inside #dynamic-bg only */
    var bgSections = wrapper.querySelectorAll('[data-bg]');
    if (bgSections.length) {
        var bgObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    wrapper.style.backgroundColor = entry.target.getAttribute('data-bg');
                }
            });
        }, { threshold: 0.3 });
        bgSections.forEach(function (el) { bgObserver.observe(el); });
    }

    /* Observer 2 — body.dark-mode toggle, watches ONLY the dark section */
    var darkSection = document.getElementById('dark-section');
    if (darkSection) {
        var darkObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            });
        }, { threshold: 0.1 });
        darkObserver.observe(darkSection);
    }
}



/* ----------------------------------------------------------
     CAROUSEL DRAG
     mousedown → track startX + scrollLeft
     mousemove → scrollLeft = scrollLeft - (x - startX)
     isDragging flag blocks accidental click events after drag
  ---------------------------------------------------------- */
function initCarousel() {
    var el = document.getElementById('carousel');
    if (!el) return;

    var isDown = false;
    var isDragging = false;
    var startX = 0;
    var scrollLeft = 0;
    var dragThreshold = 5; /* px moved before we call it a drag */

    /* --- Mouse --- */
    el.addEventListener('mousedown', function (e) {
        isDown = true;
        isDragging = false;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
        el.style.cursor = 'grabbing';
    });

    el.addEventListener('mouseleave', function () {
        isDown = false;
        isDragging = false;
        el.style.cursor = 'grab';
        el.classList.remove('is-dragging');
    });

    el.addEventListener('mouseup', function () {
        isDown = false;
        el.style.cursor = 'grab';
        el.classList.remove('is-dragging');
        /* isDragging stays true until next mousedown so click can check it */
        setTimeout(function () { isDragging = false; }, 0);
    });

    el.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - el.offsetLeft;
        var walk = x - startX;

        /* Only engage drag mode after threshold to avoid accidental drags */
        if (Math.abs(walk) > dragThreshold) {
            isDragging = true;
            el.classList.add('is-dragging');
        }

        el.scrollLeft = scrollLeft - walk * 1.5;
    });

    /* Block clicks that fire after a drag */
    el.addEventListener('click', function (e) {
        if (isDragging) e.stopPropagation();
    }, true);

    /* --- Touch --- */
    var touchStartX = 0;
    var touchScrollLeft = 0;

    el.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = el.scrollLeft;
    }, { passive: true });

    el.addEventListener('touchmove', function (e) {
        var x = e.touches[0].pageX;
        var walk = x - touchStartX;
        el.scrollLeft = touchScrollLeft - walk * 1.2;
    }, { passive: true });
}


/* ----------------------------------------------------------
   SCROLL-LINKED CAROUSEL + AUTO-SCROLL
   1. Vertical page scroll → horizontal carousel scroll
      when the carousel section is in the viewport.
   2. When user stops scrolling, carousel auto-scrolls
      continuously at a gentle pace.
---------------------------------------------------------- */
function initScrollCarousel() {
    var el = document.getElementById('carousel');
    if (!el) return;

    var autoScrollSpeed = 0.5;       /* px per frame */
    var autoScrollDelay = 1200;       /* ms after last scroll to start auto */
    var scrollMultiplier = 2.5;       /* vertical → horizontal ratio */

    var autoScrollRAF = null;
    var scrollTimeout = null;
    var isAutoScrolling = false;
    var lastScrollY = window.pageYOffset;
    var carouselInView = false;

    /* --- Bidirectional seamless loop ---
       Layout: [prepended clones][originals][appended clones]
       Start at scrollLeft = loopWidth (showing originals, room in both directions) */
    var originalItems = Array.from(el.children);

    /* Append clones (forward scroll) */
    originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        el.appendChild(clone);
    });

    /* Prepend clones (backward scroll) — use fragment to keep order */
    var frag = document.createDocumentFragment();
    originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        frag.appendChild(clone);
    });
    el.insertBefore(frag, el.firstChild);

    /* loopWidth = width of one full set (1/3 of total scrollWidth)
       Measured lazily so images have time to render */
    var loopWidth = 0;
    var initialised = false;
    function getLoopWidth() {
        if (!loopWidth && el.scrollWidth > 0) {
            loopWidth = Math.round(el.scrollWidth / 3);
        }
        /* Set starting position to originals on first measure */
        if (loopWidth > 0 && !initialised) {
            initialised = true;
            el.scrollLeft = loopWidth;
        }
        return loopWidth;
    }

    /* Seamless jump — keeps position in the "originals" band */
    function loopCheck() {
        var lw = getLoopWidth();
        if (lw <= 0) return;
        if (el.scrollLeft >= lw * 2) { el.scrollLeft -= lw; }
        if (el.scrollLeft < 50) { el.scrollLeft += lw; }
    }

    /* Fire loopCheck on any native carousel scroll (covers touch drag) */
    el.addEventListener('scroll', loopCheck, { passive: true });

    /* Set initial scroll position to originals (middle set) */
    window.addEventListener('load', function () { getLoopWidth(); });
    /* Fallback: also try immediately in case DOM is already ready */
    getLoopWidth();

    /* Always start — pause only when scrolled out of view */
    carouselInView = true;
    startAutoScroll();

    if (window.IntersectionObserver) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                carouselInView = entry.isIntersecting;
                if (carouselInView && !isAutoScrolling) {
                    startAutoScroll();
                }
                if (!carouselInView) {
                    stopAutoScroll();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(el.closest('section') || el);
    }

    /* Vertical scroll → horizontal carousel scroll */
    window.addEventListener('scroll', function () {
        if (!carouselInView) return;

        var currentY = window.pageYOffset;
        var deltaY = currentY - lastScrollY;
        lastScrollY = currentY;

        /* Drive horizontal scroll from vertical movement */
        el.scrollLeft += deltaY * scrollMultiplier;
        loopCheck();

        /* Pause auto-scroll while user is scrolling */
        stopAutoScroll();

        /* Restart auto-scroll after user stops */
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            if (carouselInView) startAutoScroll();
        }, autoScrollDelay);
    }, { passive: true });

    /* Auto-scroll loop — requestAnimationFrame syncs to display refresh rate */
    function autoScrollStep() {
        el.scrollLeft += autoScrollSpeed;
        loopCheck();
        autoScrollRAF = requestAnimationFrame(autoScrollStep);
    }

    function startAutoScroll() {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        autoScrollRAF = requestAnimationFrame(autoScrollStep);
    }

    function stopAutoScroll() {
        isAutoScrolling = false;
        if (autoScrollRAF) {
            cancelAnimationFrame(autoScrollRAF);
            autoScrollRAF = null;
        }
    }

    /* Pause auto-scroll on manual interaction (drag/touch) */
    el.addEventListener('mousedown', function () {
        stopAutoScroll();
        clearTimeout(scrollTimeout);
    });
    el.addEventListener('mouseup', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            if (carouselInView) startAutoScroll();
        }, autoScrollDelay);
    });
    el.addEventListener('touchstart', function () {
        stopAutoScroll();
        clearTimeout(scrollTimeout);
    }, { passive: true });
    el.addEventListener('touchend', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            if (carouselInView) startAutoScroll();
        }, autoScrollDelay);
    }, { passive: true });
}

/* ----------------------------------------------------------
   P5 · DATA
---------------------------------------------------------- */


var SERVICES = [
    {
        label: 'Product Design',
        icon: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/icon-Product_design.webp?v=2',
        title: 'Product Design', subtitle: 'Concept to shipped product, nothing outsourced.',
        tags: ['Service'],
        body: '<p>Most design work ends at the file. Mine doesn’t. I work from the first concept through to the production build, making calls at each stage with the actual shipped product in mind. One person, full ownership, nothing lost between intent and execution.</p>',
        media: {
            type: 'image',
            url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/fitness-mockup.webp',
            alt: 'Product design work'
        }
    },
    {
        label: 'Custom Agents & AI Systems',
        icon: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/icon-Custom_agent.webp?v=2',
        title: 'Custom Agents', subtitle: 'Built to run. Not just to demo.',
        tags: ['AI'], body: '<p>These aren’t prototypes. Each agent is wired to real data, built around a specific workflow, and tested against the edge cases that actually appear in production. The kind of thing your team can hand work off to, not just show to investors.</p>',
        media: { type: 'video', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/impetus.mp4', alt: 'Custom agents demo' }
    },
    {
        label: 'Workflow Automation',
        icon: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/icon-Workflow.webp?v=2',
        title: 'Workflow Automation', subtitle: 'The repetitive work, handled.',
        tags: ['AI'], body: '<p>Every founder and product team has a process that works, but barely. Usually it is a research task, a doc that needs generating, a report that eats half a day. I find it, map it, and build the system that handles it. The result is hours back, every week.</p>',
        media: { type: 'video', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/boltic.mp4', alt: 'Workflow automation demo' }
    },
    {
        label: 'Product Websites',
        icon: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/icon-Product_Website.webp?v=2',
        title: 'Product Brand & Website', subtitle: 'Brand and site, designed and built as one.',
        tags: ['Service'],
        body: '<p>A site that looks right in a presentation and one that performs after launch are two different problems. I solve both in the same engagement: brand, visual design, and the final build. No separate dev handoff. No version gaps.</p>',
        media: {
            type: 'video',
            url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/glamar.mp4',
            alt: 'Product website'
        }
    },
    {
        label: 'AI-Native UX',
        icon: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/icon-AI_Native.webp?v=2',
        title: 'AI-Native UX', subtitle: 'Designed around how the model actually behaves.',
        tags: ['Service'],
        body: '<p>Most AI products treat the interface as an afterthought. The model gets built first, the design gets fitted around it, and the result feels like a technical demo. I work the other way. Latency, uncertainty, failure states, the moments when the model hedges: these are design problems, and they get treated like design problems from the start.</p>',
        media: {
            type: 'video',
            url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/pixelbin-chat.mp4',
            alt: 'AI-Native UX'
        }
    }
];

var PROJECTS = [
    {
        title: 'Pixelbin', subtitle: 'AI image & video platform · Fynd',
        avatar: 'https://www.datocms-assets.com/143253/1760624084-owner-new-2.svg',
        tags: ['AI/ML', 'Generative Tools', 'Enterprise'],
        credits: 'Special thanks to Adam, Rob, Dean, David and collaborators.',
        body: '<p>Leading design for Fynd&#39;s AI image and video platform. Own the full experience — research, design, and production handoff — for generative workflows used by enterprise and creative teams. Background removal, content enhancement, automated editing pipelines. Embedded with ML engineers; involved in capability decisions before they reach design.</p>',
        media: [
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/281shots_so.webp', alt: 'Pixelbin website' },
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/iphone-mockup.webp', alt: 'Pixelbin app' }
        ]
    },
    {
        title: 'BNPL at Scale', subtitle: 'Buy Now Pay Later · Fynd Fintech',
        avatar: 'https://www.datocms-assets.com/143253/1736721026-component-17.svg',
        tags: ['Fintech', 'Payment UX', 'Checkout'],
        credits: 'Special thanks to Faaez, David, Aliaksei, MK, Taha, Fareeha.',
        body: '<p>Led end-to-end design for Fynd&#39;s Buy Now Pay Later system — credit eligibility, installment selection, and payment tracking. Shipped on a platform where one unclear step directly costs a transaction. Stayed in frontend reviews through build. Delivered the lowest drop-off rate seen on any payment flow on the platform.</p>',
        media: [
            { type: 'video', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/video_hipp.mp4', alt: 'BNPL scheduling' },
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/placard-v2.webp', alt: 'BNPL platform' },
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/282shots_so.webp', alt: 'BNPL homepage' },
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/img-02.webp', alt: 'BNPL icon' }
        ]
    },
    {
        title: 'Swadesh Design system', subtitle: 'E-commerce design system · JCP',
        avatar: 'https://www.datocms-assets.com/143253/1736721037-component-19.svg',
        tags: ['Design System', 'E-commerce', 'Scale'],
        credits: 'Special thanks to Sharoon, Ritu and collaborators, James.',
        body: '<p>Architected the design system powering Jio Commerce Platform — used across large-scale e-commerce surfaces by multiple product teams. Owned UX for product discovery, cart, and merchant dashboards. Collaborated through engineering build, not just ahead of it.</p>',
        media: [
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/296shots_so.webp', alt: 'JCP draft order' },
            { type: 'image', url: 'https://pub-d98009c8eb7448a387f7f2d0a543ab76.r2.dev/841shots_so.webp', alt: 'JCP search' }
        ]
    }
];




/* ----------------------------------------------------------
   P5 · BUILD SERVICES LIST — ACCORDION
---------------------------------------------------------- */
function buildServices() {
    var el = document.getElementById('services-list');
    if (!el) return;

    var placeholderSvg = '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="20" r="4" stroke="currentColor" stroke-width="2"/><path d="M6 32l10-8 8 6 6-5 12 9" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

    var html = '';
    for (var i = 0; i < SERVICES.length; i++) {
        var s = SERVICES[i];
        var iconHtml = s.icon
            ? '<div class="interactive-list-icon"><img src="' + s.icon + '" alt="" loading="lazy"></div>'
            : '<div class="interactive-list-icon--empty"></div>';

        var mediaHtml;
        if (s.media) {
            var mediaInner = s.media.type === 'video'
                ? '<video src="' + s.media.url + '" autoplay muted loop playsinline preload="none"></video>'
                : '<img src="' + s.media.url + '" alt="' + (s.media.alt || '') + '" loading="lazy">';
            mediaHtml = '<div class="service-media">' + mediaInner + '</div>';
        } else {
            mediaHtml = '<div class="service-media"><div class="service-media-placeholder">' + placeholderSvg + '</div></div>';
        }

        html += '<div class="interactive-list-item">'
            + '<button class="interactive-list-trigger" data-service="' + i + '">'
            + '<div class="interactive-list-holder">'
            + iconHtml
            + '<span class="interactive-list-label">' + s.label + '</span>'
            + '</div>'
            + '<div class="icon-circle"><svg aria-hidden="true"><use href="#arrow-icon"></use></svg></div>'
            + '</button>'
            + '<div class="service-body"><div class="service-body-inner"><div class="service-content">'
            + '<div class="service-subtitle">' + s.subtitle + '</div>'
            + '<div class="service-text">' + s.body + '</div>'
            + mediaHtml
            + '</div></div></div>'
            + '</div>';
    }
    el.innerHTML = html;

    function openTrigger(btn) {
        var triggers = el.querySelectorAll('.interactive-list-trigger');
        for (var k = 0; k < triggers.length; k++) {
            triggers[k].classList.remove('is-open');
            triggers[k].nextElementSibling.classList.remove('is-open');
        }
        btn.classList.add('is-open');
        btn.nextElementSibling.classList.add('is-open');
    }

    /* Hover → open (desktop) */
    var allTriggers = el.querySelectorAll('.interactive-list-trigger');
    for (var t = 0; t < allTriggers.length; t++) {
        allTriggers[t].addEventListener('mouseenter', function () {
            openTrigger(this);
        });
    }

    /* Mouse leaves list → close all */
    el.addEventListener('mouseleave', function () {
        var triggers = el.querySelectorAll('.interactive-list-trigger');
        for (var k = 0; k < triggers.length; k++) {
            triggers[k].classList.remove('is-open');
            triggers[k].nextElementSibling.classList.remove('is-open');
        }
    });

    /* Click → toggle (mobile / keyboard fallback) */
    el.addEventListener('click', function (e) {
        var btn = e.target.closest('.interactive-list-trigger');
        if (!btn) return;
        var wasOpen = btn.classList.contains('is-open');
        var triggers = el.querySelectorAll('.interactive-list-trigger');
        for (var k = 0; k < triggers.length; k++) {
            triggers[k].classList.remove('is-open');
            triggers[k].nextElementSibling.classList.remove('is-open');
        }
        if (!wasOpen) openTrigger(btn);
    });
}


/* ----------------------------------------------------------
   P5 · BUILD PROJECT LIST
---------------------------------------------------------- */
function buildProjectList() {
    var el = document.getElementById('project-list');
    if (!el) return;

    var html = '<div class="project-list-label">Latest projects</div>';

    /* Active projects */
    for (var i = 0; i < PROJECTS.length; i++) {
        var p = PROJECTS[i];
        var tagsHtml = '';
        for (var t = 0; t < p.tags.length; t++) {
            tagsHtml += '<span class="project-tag">' + p.tags[t] + '</span>';
        }
        html += '<button class="project-item" data-project="' + i + '">'
            + '<div class="project-holder">'
            + '<div class="project-avatar"><img src="' + p.avatar + '" alt="' + p.title + '" loading="lazy"></div>'
            + '<div class="project-info">'
            + '<div class="project-title">' + p.title + '</div>'
            + '<div class="project-subtitle">' + p.subtitle + '</div>'
            + (tagsHtml ? '<div class="project-tags">' + tagsHtml + '</div>' : '')
            + '</div>'
            + '</div>'
            + '<div class="project-icon-wrap"><svg aria-hidden="true"><use href="#arrow-icon"></use></svg></div>'
            + '</button>';
    }




    el.innerHTML = html;

    /* Click handlers on active projects */
    var items = el.querySelectorAll('.project-item');
    for (var k = 0; k < items.length; k++) {
        items[k].addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-project'), 10);
            openProjectModal(idx);
        });
    }
}


/* ----------------------------------------------------------
   P5 · MODAL HELPERS
---------------------------------------------------------- */
function buildTagsHtml(tags) {
    if (!tags || !tags.length) return '';
    var h = '<div class="modal-tags">';
    for (var i = 0; i < tags.length; i++) {
        h += '<span class="modal-tag">' + tags[i] + '</span>';
    }
    h += '</div>';
    return h;
}

function buildMediaHtml(media) {
    if (!media) return '';
    var inner = media.type === 'video'
        ? '<video src="' + media.url + '" autoplay muted loop playsinline preload="none"></video>'
        : '<img src="' + media.url + '" alt="' + media.alt + '" loading="lazy">';
    return '<div class="modal-media">' + inner + '</div>';
}

function openModal(contentHtml) {
    var body = document.getElementById('modal-body');
    var modal = document.getElementById('work-modal');
    if (!body || !modal) return;
    body.innerHTML = contentHtml;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    var modal = document.getElementById('work-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Pause any videos inside */
    var videos = modal.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) {
        videos[i].pause();
        videos[i].currentTime = 0;
    }
}


function openProjectModal(idx) {
    var p = PROJECTS[idx];
    if (!p) return;
    var mediaHtml = '';
    for (var i = 0; i < p.media.length; i++) {
        mediaHtml += buildMediaHtml(p.media[i]);
    }
    var html = buildTagsHtml(p.tags)
        + '<div><div class="modal-title">' + p.title + '</div>'
        + '<div class="modal-subtitle">' + p.subtitle + '</div></div>'
        + '<div class="modal-richtext">' + p.body + '</div>'
        + mediaHtml
        + (p.credits ? '<div class="modal-credits">' + p.credits + '</div>' : '');
    openModal(html);
}


/* ----------------------------------------------------------
   P6 · TESTIMONIALS DATA
---------------------------------------------------------- */
var TESTIMONIALS = [
    {
        quote: 'Terry makes complex AI features feel like they were always supposed to work that way. We showed him our pipeline and within a week he&#39;d mapped a flow our ML team wished they&#39;d built.',
        name: 'Raimon T simon',
        role: 'Co-founder, AI SaaS',
        avatar: null
    },
    {
        quote: 'Most designers hand off and disappear. Terry stayed — edge cases, sprint changes, all of it. The BNPL checkout we shipped had the lowest drop-off we&#39;d seen on any payment flow.',
        name: 'Deepak Patel',
        role: 'Senior PM, Fynd',
        avatar: null
    },
    {
        quote: 'He&#39;d ask about render performance before we brought it up. The component library he built for JCP is still what we go back to.',
        name: 'Prem Surve',
        role: 'Frontend Lead, Fynd',
        avatar: null
    },
    {
        quote: 'Came in mid-level, operated like a principal from week one. Ran his own research, pushed back when the data said to. The Pixelbin design language is largely his.',
        name: 'Sneha Iyer',
        role: 'Design Director, Shopsense',
        avatar: null
    },
    {
        quote: 'Brief and a deadline. He came back with something we hadn&#39;t imagined. Our investors called out the UX by name.',
        name: 'Priyanka Muralidharan',
        role: 'Founder',
        avatar: null
    }
];

/* ----------------------------------------------------------
   P6 · BUILD + RUN TESTIMONIALS
---------------------------------------------------------- */
var testimonialIndex = 0;
var testimonialTimer = null;
var progressTimer = null;
var progressStart = 0;
var SLIDE_DURATION = 5000;

function buildTestimonials() {
    var contentEl = document.getElementById('testimonial-content');
    var authorEl = document.getElementById('author-info');
    var navEl = document.getElementById('testimonial-nav');
    if (!contentEl || !authorEl || !navEl) return;

    /* Build quote slides */
    var qHtml = '';
    for (var i = 0; i < TESTIMONIALS.length; i++) {
        var t = TESTIMONIALS[i];
        var cls = i === 0 ? 'testimonial is-active' : 'testimonial';
        qHtml += '<div class="' + cls + '" data-t="' + i + '">'
            + '<div class="quote-container">'
            + '<p class="quote">' + t.quote + '</p>'
            + '</div>'
            + '</div>';
    }
    contentEl.innerHTML = qHtml;

    /* Build author wrappers */
    var aHtml = '';
    for (var j = 0; j < TESTIMONIALS.length; j++) {
        var a = TESTIMONIALS[j];
        var aCls = j === 0 ? 'author-wrapper is-active' : 'author-wrapper';
        aHtml += '<div class="' + aCls + '" data-a="' + j + '">'
            + '<div class="author-name">' + a.name + '</div>'
            + '<div class="author-role">' + a.role + '</div>'
            + '</div>';
    }
    authorEl.innerHTML = aHtml;

    /* Build dot nav */
    var dHtml = '';
    for (var d = 0; d < TESTIMONIALS.length; d++) {
        var dCls = d === 0 ? 'dot is-active' : 'dot';
        dHtml += '<button class="' + dCls + '" data-dot="' + d + '" aria-label="Testimonial ' + (d + 1) + '">'
            + '<div class="dot-progress"></div>'
            + '</button>';
    }
    navEl.innerHTML = dHtml;

    /* Set initial height */
    syncHeight();

    /* Wire dot clicks */
    var dots = navEl.querySelectorAll('.dot');
    for (var k = 0; k < dots.length; k++) {
        dots[k].addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-dot'), 10));
        });
    }

    /* Start auto-advance */
    startProgress();
    startTimer();

    /* Drag / swipe */
    initTestimonialDrag();
}

function syncHeight() {
    /* rAF splits the read (offsetHeight) and write (style.height)
       across separate frames — eliminates forced synchronous reflow */
    requestAnimationFrame(function () {
        var contentEl = document.getElementById('testimonial-content');
        if (!contentEl) return;
        var active = contentEl.querySelector('.testimonial.is-active');
        if (!active) return;
        var h = active.offsetHeight; /* read */
        requestAnimationFrame(function () {
            contentEl.style.height = h + 'px'; /* write */
        });
    });
}

function goToSlide(idx) {
    if (idx === testimonialIndex) return;
    testimonialIndex = idx;

    /* Swap quote classes */
    var quotes = document.querySelectorAll('.testimonial');
    for (var i = 0; i < quotes.length; i++) {
        quotes[i].classList.toggle('is-active', parseInt(quotes[i].getAttribute('data-t'), 10) === idx);
    }

    /* Swap author classes */
    var authors = document.querySelectorAll('.author-wrapper');
    for (var j = 0; j < authors.length; j++) {
        authors[j].classList.toggle('is-active', parseInt(authors[j].getAttribute('data-a'), 10) === idx);
    }

    /* Swap dot classes + reset progress bars */
    var dots = document.querySelectorAll('.dot');
    for (var d = 0; d < dots.length; d++) {
        var isActive = parseInt(dots[d].getAttribute('data-dot'), 10) === idx;
        dots[d].classList.toggle('is-active', isActive);
        dots[d].querySelector('.dot-progress').style.width = '0%';
    }

    /* Reset timers */
    clearTimeout(testimonialTimer);
    clearInterval(progressTimer);
    setTimeout(syncHeight, 50);
    startProgress();
    startTimer();
}

function startTimer() {
    testimonialTimer = setTimeout(function () {
        goToSlide((testimonialIndex + 1) % TESTIMONIALS.length);
    }, SLIDE_DURATION);
}

function startProgress() {
    var dots = document.querySelectorAll('.dot');
    var activeDot = dots[testimonialIndex];
    if (!activeDot) return;
    var bar = activeDot.querySelector('.dot-progress');
    bar.style.width = '0%';
    progressStart = Date.now();

    clearInterval(progressTimer);
    progressTimer = setInterval(function () {
        var elapsed = Date.now() - progressStart;
        var pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        bar.style.width = pct + '%';
        if (pct >= 100) clearInterval(progressTimer);
    }, 50);
}

function initTestimonialDrag() {
    var slider = document.getElementById('testimonials-slider');
    if (!slider) return;

    var startX = 0;
    var SWIPE_THRESHOLD = 40;

    slider.addEventListener('mousedown', function (e) { startX = e.clientX; });
    slider.addEventListener('mouseup', function (e) {
        var diff = startX - e.clientX;
        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            goToSlide(diff > 0
                ? (testimonialIndex + 1) % TESTIMONIALS.length
                : (testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
        }
    });

    slider.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            goToSlide(diff > 0
                ? (testimonialIndex + 1) % TESTIMONIALS.length
                : (testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
        }
    }, { passive: true });
}


/* ----------------------------------------------------------
   P7 · CONTACT MODAL — open / close
   Exposed as window-level function so CTA + header can call it.
---------------------------------------------------------- */
function openContactModal() {
    var modal = document.getElementById('contact-modal');
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    var modal = document.getElementById('contact-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    /* Only restore scroll if work modal is also closed */
    var workModal = document.getElementById('work-modal');
    if (!workModal || !workModal.classList.contains('is-open')) {
        document.body.style.overflow = '';
    }
}

/* Expose globally so the CTA guard in P6 can call it */
window.openContactModal = openContactModal;


/* Footer fade-in removed — new footer uses static layout */


/* ----------------------------------------------------------
   P8 · SCROLL REVEAL
   All .reveal elements fade + slide in when 10% visible.
---------------------------------------------------------- */
function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    /* No IntersectionObserver — show everything immediately */
    if (!window.IntersectionObserver) {
        els.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }

    /* Assign stagger delays by sibling group.
       Elements in the same parent get cascading delays (0, 80, 160...ms)
       so siblings animate in sequence rather than all at once.
       Elements in different parents each start fresh from 0ms. */
    var parentGroups = {};
    els.forEach(function (el) {
        var key = el.parentNode ? el.parentNode : 'root';
        if (!parentGroups[key]) parentGroups[key] = [];
        parentGroups[key].push(el);
    });
    Object.keys(parentGroups).forEach(function (key) {
        parentGroups[key].forEach(function (el, i) {
            el.style.transitionDelay = (i * 80) + 'ms';
        });
    });

    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    /* Raised from 0.1 → 0.15: element must be 15% visible
       before animating — feels more intentional on scroll */
    }, { threshold: 0.15 });

    els.forEach(function (el) { obs.observe(el); });
}


/* ----------------------------------------------------------
   P8 · HEADER LIGHT-FORCED ON DARK SECTIONS
   Watches #dark-section — when 10% visible, header pill
   switches to .--light-forced (light text on dark bg).
---------------------------------------------------------- */
/* ----------------------------------------------------------
   TOP NAV — pill slide + scroll-aware active state
   This is a single-page work portfolio. "Work" is the
   default active state. "About" activates only when the
   about section (#text-content) is in view.
---------------------------------------------------------- */
function initTopNav() {
    var nav = document.getElementById('top-nav');
    var pill = document.getElementById('top-nav-pill');
    if (!nav || !pill) return;

    var items = Array.from(nav.querySelectorAll('.top-nav-item:not(.top-nav-name):not(.top-nav-link)'));

    function movePill(el, animate) {
        /* Read all layout values first (single reflow),
           then write in one batch — prevents 4 forced reflows */
        var l = el.offsetLeft;
        var t = el.offsetTop;
        var w = el.offsetWidth;
        var h = el.offsetHeight;
        if (!animate) pill.style.transition = 'none';
        pill.style.left   = l + 'px';
        pill.style.top    = t + 'px';
        pill.style.width  = w + 'px';
        pill.style.height = h + 'px';
        if (!animate) requestAnimationFrame(function () { pill.style.transition = ''; });
    }

    var initial = nav.querySelector('.top-nav-item.active');
    /* Paint 1 — snap immediately so pill is always visible on load */
    if (initial) movePill(initial, false);

    /* Paint 2 — re-snap after fonts settle to fix any layout shift */
    function resnapPill() {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                var active = nav.querySelector('.top-nav-item.active');
                if (active) movePill(active, false);
            });
        });
    }
    if (document.readyState === 'complete') {
        resnapPill();
    } else {
        window.addEventListener('load', resnapPill);
    }

    /* Re-snap pill on resize so it stays aligned */
    window.addEventListener('resize', function () {
        var active = nav.querySelector('.top-nav-item.active');
        if (active) movePill(active, false);
    });

    /* Scroll to target section with offset for the fixed nav */
    function scrollToSection(targetId) {
        var target = document.getElementById(targetId);
        if (!target) return;
        var navHeight = nav.getBoundingClientRect().bottom + 12;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
    }

    /* Click — scroll + move pill */
    items.forEach(function (item) {
        item.addEventListener('click', function () {
            var section = item.getAttribute('data-section');
            if (section === 'work') { window.location.href = 'https://terryjohn.me'; return; }
            if (section === 'writing') scrollToSection('writing');
        });
    });

    /* Scroll-aware: Writing activates when its section is in view,
       Portfolio re-activates when Writing scrolls out */
    var writingSection = document.getElementById('writing');
    var workBtn = nav.querySelector('[data-section="work"]');
    var writingBtn = nav.querySelector('[data-section="writing"]');

    if (writingSection && workBtn && writingBtn && window.IntersectionObserver) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                items.forEach(function (i) { i.classList.remove('active'); });
                if (entry.isIntersecting) {
                    /* Writing section visible — activate Writing */
                    writingBtn.classList.add('active');
                    movePill(writingBtn, true);
                } else {
                    /* Writing section not visible — restore Portfolio as active */
                    workBtn.classList.add('active');
                    movePill(workBtn, true);
                }
            });
        }, { threshold: 0.5 });
        sectionObserver.observe(writingSection);
    }
}


/* ----------------------------------------------------------
   MOBILE NAV — hamburger toggle + menu + music
---------------------------------------------------------- */
(function () {
    var hamburger      = document.getElementById('mobile-hamburger');
    var menu           = document.getElementById('mobile-menu');
    var mobileMusicBtn = document.getElementById('mobile-music-btn');
    var audio          = document.getElementById('site-audio');
    var siteVideo      = document.getElementById('site-video');
    var mobileSiteVideo = document.getElementById('mobile-site-video');
    if (!hamburger || !menu) return;

    /* Toggle menu open/close */
    hamburger.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        menu.setAttribute('aria-hidden', String(!isOpen));
        /* Dark mode class for body when menu is open */
    });

    /* Close when a nav item is clicked */
    menu.querySelectorAll('button[data-section]').forEach(function (item) {
        item.addEventListener('click', function () {
            menu.classList.remove('open');
            hamburger.classList.remove('open');
            menu.setAttribute('aria-hidden', 'true');
            var section = item.getAttribute('data-section');
            if (section === 'about') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (section === 'writing') {
                var target = document.getElementById('writing');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* Mobile music button — mirrors the main music toggle */
    if (mobileMusicBtn && audio) {
        mobileMusicBtn.addEventListener('click', function () {
            if (audio.paused) {
                audio.play().catch(function () {});
                if (siteVideo) siteVideo.play().catch(function () {});
                if (mobileSiteVideo) mobileSiteVideo.play().catch(function () {});
                mobileMusicBtn.classList.add('playing');
            } else {
                audio.pause();
                if (siteVideo) siteVideo.pause();
                if (mobileSiteVideo) mobileSiteVideo.pause();
                mobileMusicBtn.classList.remove('playing');
            }
        });
    }
})();


/* ==========================================================
   SINGLE DOMContentLoaded LISTENER
   Consolidates all init calls that were previously spread
   across 9 separate addEventListener('DOMContentLoaded', ...)
   ========================================================== */
document.addEventListener('DOMContentLoaded', function () {

    /* Immediate inits */
    initDynamicBg();
    initReveal();
    initTopNav();

    /* Deferred inits (setTimeout 0 — yield to paint) */
    setTimeout(function () {
        initCarousel();
        initScrollCarousel();

        /* Tier 1: services accordion (may be near fold) */
        buildServices();

        /* Tier 2: project list + modal wiring (below fold) */
        buildProjectList();

        /* Work modal — close button + backdrop + ESC */
        var closeBtn = document.getElementById('modal-close-btn');
        var backdrop = document.getElementById('modal-backdrop');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);

        /* Testimonials */
        buildTestimonials();

        /* Contact modal — backdrop + close button */
        var contactBackdrop = document.getElementById('contact-modal-backdrop');
        var contactCloseBtn = document.getElementById('contact-close-btn');
        if (contactBackdrop) contactBackdrop.addEventListener('click', closeContactModal);
        if (contactCloseBtn) contactCloseBtn.addEventListener('click', closeContactModal);

        /* Unified ESC handler for both modals */
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var contactModal = document.getElementById('contact-modal');
            if (contactModal && contactModal.classList.contains('is-open')) {
                closeContactModal();
                return;
            }
            if (typeof closeModal === 'function') closeModal();
        });

        /* CTA button — wire to contact modal */
        var ctaBtn = document.getElementById('cta-btn');
        if (ctaBtn) {
            var newCta = ctaBtn.cloneNode(true);
            ctaBtn.parentNode.replaceChild(newCta, ctaBtn);
            newCta.addEventListener('click', openContactModal);
        }
    }, 0);
});


/* ==========================================================
   CUSTOM CURSOR PILL — card image panels
   ========================================================== */
(function () {
    const cursor = document.getElementById('customCursor');
    const panels = document.querySelectorAll('.card-image-panel');
    let raf = null;
    let cx = 0, cy = 0;

    function moveCursor(e) {
        cx = e.clientX;
        cy = e.clientY;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
            cursor.style.transform = 'translate(calc(-50% + ' + cx + 'px), calc(-50% + ' + cy + 'px))';
        });
    }

    panels.forEach(function (panel) {
        panel.addEventListener('mouseenter', function () {
            cursor.classList.add('visible');
            document.addEventListener('mousemove', moveCursor);
        });
        panel.addEventListener('mouseleave', function () {
            cursor.classList.remove('visible');
            document.removeEventListener('mousemove', moveCursor);
        });
    });
})();

/* ==========================================================
   PARALLAX — card image depth effect
   ========================================================== */
(function () {
    var cards = Array.prototype.slice.call(
        document.querySelectorAll('.works-card-wrapper')
    );

    function lerp(a, b, t) { return a + (b - a) * t; }

    // Store each card's image and pre-computed offsetTop
    var items = cards.map(function (card) {
        return {
            img: card.querySelector('.card-image-link img'),
            card: card
        };
    });

    var lastScrollY = -1;
    var raf = null;

    function render() {
        raf = null;
        var scrollY = window.pageYOffset;
        var vh = window.innerHeight;

        items.forEach(function (item) {
            if (!item.img) return;

            // Distance of card centre from viewport centre
            var rect = item.card.getBoundingClientRect();
            var cardCY = rect.top + rect.height * 0.5;
            var vpCY = vh * 0.5;

            // How far card centre is from screen centre, as fraction of screen height
            // Range roughly -1 (card below) to +1 (card above)
            var factor = (vpCY - cardCY) / vh;

            // Parallax shift: image moves 20% as fast as scroll → visible depth
            var shift = factor * 80;

            item.img.style.transform = 'translateY(' + shift.toFixed(2) + 'px)';
        });
    }

    function onScroll() {
        if (!raf) raf = requestAnimationFrame(render);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Kick off immediately
    render();
})();

/* ==========================================================
   CARD ENTRANCE ANIMATION — IntersectionObserver reveal
   ========================================================== */
(function () {
    var cards = document.querySelectorAll('.works-card-wrapper');

    if (!('IntersectionObserver' in window)) {
        // Fallback: just show all cards immediately
        cards.forEach(function (c) { c.classList.add('is-visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // fire once only
            }
        });
    }, {
        threshold: 0.06,
        rootMargin: '0px 0px 0px 0px'
    });

    cards.forEach(function (c) { observer.observe(c); });
})();

/* ==========================================================
   VISIBILITY TITLE — tab away/back title swap
   ========================================================== */
(function () {
    var originalTitle = document.title;
    document.addEventListener('visibilitychange', function () {
        document.title = document.hidden ? 'Please come back in!' : originalTitle;
    });
})();

/* ==========================================================
   TIMEZONE CLOCK (ported from hero.html)
   ========================================================== */
(function () {
    var el = document.getElementById('site-timezone');
    if (!el) return;
    function tick() {
        var now = new Date();
        var time = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        el.textContent = time + ' IST';
    }
    tick();
    /* Store interval ID so it can be cleared when page is hidden */
    var tzInterval = setInterval(tick, 10000);

    /* Pause updates when tab is hidden, resume on visibility */
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            clearInterval(tzInterval);
        } else {
            tick();
            tzInterval = setInterval(tick, 10000);
        }
    });
})();

/* ==========================================================
   MUSIC TOGGLE — horse.mp4 video in button + track.mp3 audio
   (ported from hero.html)
   ========================================================== */
(function () {
    var btn   = document.getElementById('music-btn');
    var audio = document.getElementById('site-audio');
    var video = document.getElementById('site-video');
    if (!btn || !audio || !video) return;

    audio.volume = 0.5;

    btn.addEventListener('click', function () {
        if (audio.paused) {
            btn.classList.add('playing');
            audio.play().catch(function () {
                btn.classList.remove('playing');
            });
            video.play().catch(function () {});
        } else {
            audio.pause();
            video.pause();
            btn.classList.remove('playing');
        }
    });
})();

/* ==========================================================
   GLOBAL CURSOR — exact parity with hero.html
   ========================================================== */
(function () {
    var cur = document.getElementById('cursor');
    if (!cur || window.matchMedia('(hover: none)').matches) return;

    /* Track + show */
    document.addEventListener('mousemove', function (e) {
        cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
        cur.classList.add('visible');
    }, { passive: true });
    document.addEventListener('mouseleave', function () { cur.classList.remove('visible'); });

    /* Helper */
    function addState(selector, cls) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.addEventListener('mouseenter', function () { cur.classList.add(cls); });
            el.addEventListener('mouseleave', function () { cur.classList.remove(cls); });
        });
    }

    /* on-text: headings */
    addState('h1, h2, h3', 'on-text');

    /* on-big: images + buttons + nav */
    addState('img', 'on-big');
    addState('.footer-cta-btn, .cta-btn, .top-nav-item, .top-nav-link, button, a', 'on-big');
})();
