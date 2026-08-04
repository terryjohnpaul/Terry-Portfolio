(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
        document.documentElement.classList.add('no-motion');
        return;
    }

    function init() {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Page reveal — container fades up
        gsap.fromTo('#resume', {
            opacity: 0,
            y: 24
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.1
        });

        // Download button fades in after page
        gsap.fromTo('.r-download', {
            opacity: 0,
            y: 12
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.5
        });

        // 2. Section reveals — each section animates once on scroll
        var sections = document.querySelectorAll('.r-section');

        sections.forEach(function (section, i) {
            // Skip header section (already visible from page reveal)
            if (i === 0) return;

            gsap.fromTo(section, {
                opacity: 0,
                y: 32
            }, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 88%',
                    once: true
                }
            });
        });

        // 3. Experience entries — staggered reveal within the experience section
        var entries = document.querySelectorAll('.r-entry');

        entries.forEach(function (entry) {
            gsap.fromTo(entry, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: entry,
                    start: 'top 90%',
                    once: true
                }
            });
        });

        // 4. Metric emphasis — blur-to-sharp + subtle scale
        var metrics = document.querySelectorAll('[data-metric]');

        metrics.forEach(function (metric) {
            gsap.fromTo(metric, {
                filter: 'blur(4px)',
                scale: 0.97,
                opacity: 0.4
            }, {
                filter: 'blur(0px)',
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: metric,
                    start: 'top 92%',
                    once: true
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
