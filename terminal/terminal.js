(function () {
  'use strict';
  try {
    /* ================================================================
       TerryTerminal v1.0 — Floating terminal widget for terryjohn.me
       Self-contained IIFE: creates DOM, handles commands, manages state.
       Host pages only need: <script src="/terminal/terminal.js"></script>
       ================================================================ */

    // ── Constants ───────────────────────────────────────────────────
    var ASCII_BANNER =
      '████████╗███████╗██████╗ ██████╗ ██╗   ██╗\n' +
      '╚══██╔══╝██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝\n' +
      '   ██║   █████╗  ██████╔╝██████╔╝ ╚████╔╝ \n' +
      '   ██║   ██╔══╝  ██╔══██╗██╔══██╗  ╚██╔╝  \n' +
      '   ██║   ███████╗██║  ██║██║  ██║   ██║   \n' +
      '   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   \n' +
      '\n' +
      '██████╗  █████╗ ██╗   ██╗██╗     \n' +
      '██╔══██╗██╔══██╗██║   ██║██║     \n' +
      '██████╔╝███████║██║   ██║██║     \n' +
      '██╔═══╝ ██╔══██║██║   ██║██║     \n' +
      '██║     ██║  ██║╚██████╔╝███████╗\n' +
      '╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝';

    var TOTAL_EGGS = 22;

    var FORTUNE_QUOTES = [
      '"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs',
      '"Good design is obvious. Great design is transparent." - Joe Sparano',
      '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
      '"The best error message is the one that never shows up." - Thomas Fuchs',
      '"If you think good design is expensive, you should look at the cost of bad design." - Ralf Speth',
      '"People ignore design that ignores people." - Frank Chimero',
      '"Design is intelligence made visible." - Alina Wheeler',
      '"Whitespace is like air: it is necessary for design to breathe." - Wojciech Zielinski',
      '"A user interface is like a joke. If you have to explain it, it\'s not that good." - Martin LeBlanc',
      '"The details are not the details. They make the design." - Charles Eames',
      '"Every great design begins with an even better story." - Lorinda Mamo',
      '"Less, but better." - Dieter Rams',
    ];

    var MOTD_MESSAGES = [
      'Remember: good design is invisible.',
      'Tip: ship early, ship often.',
      'Today\'s agenda: make something beautiful.',
      'Reminder: the best interface is no interface.',
      'Fun fact: the first website is still online at info.cern.ch.',
      'Thought: accessibility is not a feature, it\'s a requirement.',
      'Mantra: reduce, reuse, refactor.',
      'Pro tip: name things well and the code writes itself.',
    ];

    var NPM_PACKAGES = [
      'creativity@latest',
      'pixel-perfection@3.2.1',
      'design-thinking@7.0.0',
      'ux-empathy@2.4.0',
      'figma-mastery@99.9.9',
      'coffee-to-code@1.0.0',
      'late-night-debugging@4.2.0',
      'imposter-syndrome@0.0.1',
      'stackoverflow-copypaste@999.0.0',
      'deadline-adrenaline@11.59.59',
    ];

    var THEMES = {
      oxide: {
        accent: '#48d597',
        bg: 'rgba(22, 27, 43, 0.98)',
        dimmed: '#3ba878',
        chip: 'rgba(72,213,151,0.1)',
        chipBorder: 'rgba(72,213,151,0.3)',
      },
      green: {
        accent: '#00ff41',
        bg: 'rgba(10, 10, 10, 0.96)',
        dimmed: '#00cc33',
        chip: 'rgba(0,255,65,0.1)',
        chipBorder: 'rgba(0,255,65,0.3)',
      },
      amber: {
        accent: '#ffb000',
        bg: 'rgba(10, 10, 10, 0.96)',
        dimmed: '#cc8e00',
        chip: 'rgba(255,176,0,0.1)',
        chipBorder: 'rgba(255,176,0,0.3)',
      },
      dracula: {
        accent: '#bd93f9',
        bg: 'rgba(40, 42, 54, 0.96)',
        dimmed: '#6272a4',
        chip: 'rgba(189,147,249,0.1)',
        chipBorder: 'rgba(189,147,249,0.3)',
      },
    };

    var reducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var isMobile =
      window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

    // ── State ───────────────────────────────────────────────────────
    var state = {
      isOpen: false,
      history: [],
      historyIndex: -1,
      outputHTML: '',
      firstVisit: true,
      theme: 'oxide',
      crt: true,
      easterEggsFound: new Set(),
    };

    // Load persisted state
    (function loadState() {
      try {
        var saved = sessionStorage.getItem('tw-output');
        if (saved) state.outputHTML = saved;

        var wasOpen = sessionStorage.getItem('tw-open');
        if (wasOpen === 'true') state.isOpen = true;

        var booted = localStorage.getItem('tw-booted');
        if (booted === 'true') state.firstVisit = false;

        var theme = localStorage.getItem('tw-theme');
        if (theme && THEMES[theme]) state.theme = theme;

        var crt = localStorage.getItem('tw-crt');
        if (crt !== null) state.crt = crt === 'true';

        var eggs = localStorage.getItem('tw-eggs');
        if (eggs) {
          try {
            var arr = JSON.parse(eggs);
            state.easterEggsFound = new Set(arr);
          } catch (_) {}
        }

        var hist = sessionStorage.getItem('tw-history');
        if (hist) {
          try {
            state.history = JSON.parse(hist);
          } catch (_) {}
        }
      } catch (_) {}
    })();

    function saveState() {
      try {
        sessionStorage.setItem('tw-open', state.isOpen ? 'true' : 'false');
        localStorage.setItem('tw-theme', state.theme);
        localStorage.setItem('tw-crt', state.crt ? 'true' : 'false');
        localStorage.setItem(
          'tw-eggs',
          JSON.stringify(Array.from(state.easterEggsFound))
        );
        sessionStorage.setItem('tw-history', JSON.stringify(state.history));
      } catch (_) {}
    }

    function saveOutput() {
      try {
        if (outputEl) {
          sessionStorage.setItem('tw-output', outputEl.innerHTML);
        }
      } catch (_) {}
    }

    // ── Utilities ───────────────────────────────────────────────────
    function delay(ms) {
      return new Promise(function (r) {
        setTimeout(r, ms);
      });
    }

    function escapeHTML(str) {
      var d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }

    function scrollToBottom() {
      if (outputEl) {
        outputEl.scrollTop = outputEl.scrollHeight;
      }
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ── DOM Creation ────────────────────────────────────────────────
    var triggerEl,
      teaserEl,
      panelEl,
      titlebarEl,
      outputEl,
      chipsEl,
      inputEl,
      inputRow,
      cursorEl,
      closeBtn,
      minBtn,
      labelEl;

    function createDOM() {
      // Styles are loaded via external terminal.css — no inline injection needed.

      // --- Trigger Button ---
      triggerEl = document.createElement('button');
      triggerEl.className = 'tw-trigger';
      triggerEl.setAttribute('aria-label', 'Open terminal');
      triggerEl.setAttribute('role', 'button');
      triggerEl.setAttribute('tabindex', '0');
      triggerEl.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<polyline points="4 17 10 11 4 5"></polyline>' +
        '<line x1="12" y1="19" x2="20" y2="19"></line>' +
        '</svg>';
      document.body.appendChild(triggerEl);

      // --- Teaser Bubble ---
      teaserEl = document.createElement('div');
      teaserEl.className = 'tw-teaser';
      teaserEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(teaserEl);

      // --- Panel ---
      panelEl = document.createElement('div');
      panelEl.className = 'tw-panel';
      panelEl.setAttribute('role', 'dialog');
      panelEl.setAttribute('aria-label', 'Terminal');

      // Titlebar
      titlebarEl = document.createElement('div');
      titlebarEl.className = 'tw-titlebar';

      var titleText = document.createElement('span');
      titleText.className = 'tw-title-text';
      titleText.textContent = 'terry@portfolio:~$';

      var titleBtns = document.createElement('div');
      titleBtns.className = 'tw-title-btns';

      minBtn = document.createElement('button');
      minBtn.className = 'tw-title-btn tw-btn-min';
      minBtn.setAttribute('aria-label', 'Minimize terminal');
      minBtn.innerHTML = '&ndash;';

      closeBtn = document.createElement('button');
      closeBtn.className = 'tw-title-btn tw-btn-close';
      closeBtn.setAttribute('aria-label', 'Close terminal');
      closeBtn.innerHTML = '&times;';

      titleBtns.appendChild(minBtn);
      titleBtns.appendChild(closeBtn);
      titlebarEl.appendChild(titleText);
      titlebarEl.appendChild(titleBtns);
      panelEl.appendChild(titlebarEl);

      // Drag handle (mobile)
      if (isMobile) {
        var dragHandle = document.createElement('div');
        dragHandle.className = 'tw-drag-handle';
        dragHandle.innerHTML = '<span></span>';
        panelEl.appendChild(dragHandle);
      }

      // Output
      outputEl = document.createElement('div');
      outputEl.className = 'tw-output';
      outputEl.setAttribute('role', 'log');
      outputEl.setAttribute('aria-live', 'polite');
      outputEl.setAttribute('aria-relevant', 'additions');
      panelEl.appendChild(outputEl);

      // Chips
      chipsEl = document.createElement('div');
      chipsEl.className = 'tw-chips';
      var chipCmds = ['help', 'about', 'projects', 'contact'];
      chipCmds.forEach(function (cmd) {
        var chip = document.createElement('button');
        chip.className = 'tw-chip';
        chip.textContent = cmd;
        chip.setAttribute('tabindex', '-1');
        chip.addEventListener('click', function () {
          runCommand(cmd);
        });
        chipsEl.appendChild(chip);
      });
      panelEl.appendChild(chipsEl);

      // Input Row
      inputRow = document.createElement('div');
      inputRow.className = 'tw-input-row';

      var prompt = document.createElement('span');
      prompt.className = 'tw-prompt';
      prompt.textContent = '> ';
      prompt.setAttribute('aria-hidden', 'true');

      labelEl = document.createElement('label');
      labelEl.className = 'tw-sr-only';
      labelEl.textContent = 'Terminal command input';
      labelEl.setAttribute('for', 'tw-input');

      inputEl = document.createElement('input');
      inputEl.type = 'text';
      inputEl.id = 'tw-input';
      inputEl.className = 'tw-input';
      inputEl.setAttribute('autocapitalize', 'off');
      inputEl.setAttribute('autocorrect', 'off');
      inputEl.setAttribute('spellcheck', 'false');
      inputEl.setAttribute('inputmode', 'text');
      inputEl.setAttribute('autocomplete', 'off');

      cursorEl = document.createElement('span');
      cursorEl.className = 'tw-cursor';
      cursorEl.textContent = '█';
      cursorEl.setAttribute('aria-hidden', 'true');

      inputRow.appendChild(prompt);
      inputRow.appendChild(labelEl);
      inputRow.appendChild(inputEl);
      inputRow.appendChild(cursorEl);
      panelEl.appendChild(inputRow);

      document.body.appendChild(panelEl);

      // Apply persisted theme
      applyTheme(state.theme);
      applyCRT(state.crt);
    }

    // Styles handled entirely by external terminal.css

    // ── Theme ───────────────────────────────────────────────────────
    function applyTheme(name) {
      var t = THEMES[name];
      if (!t) return;
      state.theme = name;
      var root = document.documentElement;
      root.style.setProperty('--tw-accent', t.accent);
      root.style.setProperty('--tw-bg', t.bg);
      root.style.setProperty('--tw-dimmed', t.dimmed);
      root.style.setProperty('--tw-chip', t.chip);
      root.style.setProperty('--tw-chipBorder', t.chipBorder);

      // Update bg directly on elements
      if (panelEl) panelEl.style.background = t.bg;
      if (triggerEl) triggerEl.style.background = t.bg;
      saveState();
    }

    function applyCRT(on) {
      state.crt = on;
      if (panelEl) {
        if (on) {
          panelEl.classList.add('tw-crt');
        } else {
          panelEl.classList.remove('tw-crt');
        }
      }
      saveState();
    }

    // ── Output Helpers ──────────────────────────────────────────────
    function echoCommand(text) {
      var div = document.createElement('div');
      div.className = 'tw-line tw-line-cmd';
      div.textContent = '> ' + text;
      outputEl.appendChild(div);
      scrollToBottom();
      saveOutput();
    }

    function printOutput(text, className) {
      var div = document.createElement('div');
      div.className = 'tw-line ' + (className || 'tw-line-sys');
      if (!reducedMotion && text.length < 200) {
        outputEl.appendChild(div);
        scrollToBottom();
        typeWriter(div, text).then(function () {
          saveOutput();
        });
      } else {
        div.textContent = text;
        outputEl.appendChild(div);
        scrollToBottom();
        saveOutput();
      }
    }

    function printInstant(text, className) {
      var div = document.createElement('div');
      div.className = 'tw-line ' + (className || 'tw-line-sys');
      div.textContent = text;
      outputEl.appendChild(div);
      scrollToBottom();
      saveOutput();
    }

    function printHTML(html) {
      var div = document.createElement('div');
      div.className = 'tw-line tw-line-sys';
      div.innerHTML = html;
      outputEl.appendChild(div);
      scrollToBottom();
      saveOutput();
    }

    function printError(text) {
      printInstant(text, 'tw-line-err');
      shakePanel();
    }

    function shakePanel() {
      panelEl.classList.add('tw-shake');
      setTimeout(function () {
        panelEl.classList.remove('tw-shake');
      }, 300);
    }

    async function typeWriter(element, text, speed) {
      speed = speed || 25;
      if (reducedMotion) {
        element.textContent = text;
        scrollToBottom();
        return;
      }
      for (var i = 0; i < text.length; i++) {
        element.textContent += text[i];
        scrollToBottom();
        var ch = text[i];
        var d = speed;
        if (ch === '.' || ch === '!' || ch === '?') d = speed * 6;
        else if (ch === ',') d = speed * 3;
        else if (ch === ' ') d = speed * 0.5;
        else d = speed + (Math.random() - 0.5) * 15;
        await delay(Math.max(5, d));
      }
    }

    async function showSpinner(label, duration) {
      if (reducedMotion) { await delay(100); return; }
      var frames = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
      var div = document.createElement('div');
      div.className = 'tw-line tw-line-sys';
      outputEl.appendChild(div);
      scrollToBottom();
      var start = Date.now();
      var i = 0;
      while (Date.now() - start < (duration || 300)) {
        div.textContent = frames[i % frames.length] + ' ' + (label || 'Processing...');
        i++;
        await delay(80);
      }
      outputEl.removeChild(div);
    }

    async function showProgressBar(label, duration) {
      if (reducedMotion) { await delay(100); return; }
      var div = document.createElement('div');
      div.className = 'tw-line tw-line-sys';
      outputEl.appendChild(div);
      scrollToBottom();
      var width = 25;
      var progress = 0;
      var elapsed = 0;
      var tick = 50;
      while (progress < 100) {
        var filled = Math.round((progress / 100) * width);
        var empty = width - filled;
        var bar = '█'.repeat(filled) + '░'.repeat(empty);
        div.textContent = (label || 'Loading') + ' [' + bar + '] ' + Math.round(progress) + '%';
        scrollToBottom();
        var remaining = 100 - progress;
        var increment = Math.random() * Math.min(8, remaining * 0.3) + 0.5;
        progress = Math.min(100, progress + increment);
        await delay(tick + Math.random() * 30);
      }
      var fullBar = '█'.repeat(width);
      div.textContent = (label || 'Loading') + ' [' + fullBar + '] 100%';
      scrollToBottom();
      saveOutput();
    }

    async function typeLine(text, speed) {
      var div = document.createElement('div');
      div.className = 'tw-line tw-line-sys';
      outputEl.appendChild(div);
      scrollToBottom();
      if (reducedMotion) {
        div.textContent = text;
        scrollToBottom();
      } else {
        await typeWriter(div, text, speed);
      }
      saveOutput();
    }

    // ── Widget Open/Close ───────────────────────────────────────────
    function openWidget() {
      state.isOpen = true;
      panelEl.classList.add('tw-open');
      triggerEl.classList.add('tw-open');
      triggerEl.setAttribute('aria-label', 'Close terminal');
      inputEl.focus();
      saveState();

      // Focus trap setup
      setupFocusTrap();
    }

    function closeWidget() {
      state.isOpen = false;
      panelEl.classList.remove('tw-open');
      triggerEl.classList.remove('tw-open');
      triggerEl.setAttribute('aria-label', 'Open terminal');
      triggerEl.focus();
      saveState();
    }

    function toggleWidget() {
      if (state.isOpen) {
        closeWidget();
      } else {
        openWidget();
        if (outputEl.children.length === 0) {
          bootSequence();
        }
      }
    }

    // ── Boot Sequence ───────────────────────────────────────────────
    async function bootSequence() {
      state.firstVisit = false;
      var skipped = false;

      function onSkip(e) {
        if (e.key === 'Escape') skipped = true;
      }
      document.addEventListener('keydown', onSkip);

      function bootDelay(ms) {
        if (skipped || reducedMotion) return Promise.resolve();
        return delay(ms);
      }

      function addBootLine(html) {
        var div = document.createElement('div');
        div.className = 'tw-line tw-line-sys';
        div.innerHTML = html;
        outputEl.appendChild(div);
        scrollToBottom();
      }

      // ── Phase 1: Kernel messages (instant per line, 30-80ms gaps) ──
      var kernelLines = [
        '<span style="color:#555">[    0.000]</span> TerryOS kernel v2.4.1',
        '<span style="color:#555">[    0.012]</span> CPU: Creative Engine @ ∞ GHz',
        '<span style="color:#555">[    0.034]</span> Memory: 16384 MB .............. <span style="color:#48d597">OK</span>',
        '<span style="color:#555">[    0.089]</span> Loading modules ............... <span style="color:#48d597">OK</span>',
        '<span style="color:#555">[    0.204]</span> Mounting /dev/portfolio ....... <span style="color:#48d597">OK</span>',
        '<span style="color:#555">[    0.312]</span> NET: Established connection',
      ];

      for (var i = 0; i < kernelLines.length; i++) {
        if (skipped) break;
        addBootLine(kernelLines[i]);
        await bootDelay(30 + Math.random() * 50);
      }

      if (!skipped) addBootLine('');
      await bootDelay(150);

      // ── Phase 2: Service startup (100-200ms gaps) ──
      var serviceLines = [
        { text: 'Started Portfolio Engine.', status: 'ok' },
        { text: 'Started Design System.', status: 'ok' },
        { text: 'Started Creative Engine.', status: 'ok' },
        { text: 'Connected to Reality.', status: 'fail' },
        { text: 'Retried with Coffee.', status: 'ok' },
        { text: 'Reached target Ready.', status: 'ok' },
      ];

      for (var j = 0; j < serviceLines.length; j++) {
        if (skipped) break;
        var s = serviceLines[j];
        if (s.status === 'ok') {
          addBootLine('  <span style="color:#48d597">[  OK  ]</span> ' + escapeHTML(s.text));
        } else {
          addBootLine('  <span style="color:#f85149">[ FAIL ]</span> ' + escapeHTML(s.text));
        }
        await bootDelay(100 + Math.random() * 100);
      }

      // ── Phase 3: Clear boot, show banner ──
      await bootDelay(300);
      document.removeEventListener('keydown', onSkip);

      outputEl.innerHTML = '';
      showBanner();
      localStorage.setItem('tw-booted', 'true');
    }

    // ── Context Greetings ───────────────────────────────────────────
    function showBanner() {
      var bannerDiv = document.createElement('div');
      bannerDiv.className = 'tw-line tw-line-sys tw-line-banner';
      bannerDiv.textContent = ASCII_BANNER;
      outputEl.appendChild(bannerDiv);
      scrollToBottom();
      printInstant('');
      printInstant('  Product Designer & Engineer');
      var greeting = getGreeting();
      printInstant(greeting, 'tw-line-accent');
      printInstant('');
      saveOutput();
    }

    function getGreeting() {
      var path = window.location.pathname;
      if (path === '/' || path === '/index.html') {
        return "Welcome to Terry's terminal. Type 'help' to explore.";
      } else if (path.indexOf('/about') === 0) {
        return "/about — Reading the official bio. Try 'fun-facts' for the unofficial version.";
      } else if (path.indexOf('/first-take') === 0) {
        return "Entering the creative archive. Type 'latest' or 'prompt' to dig deeper.";
      }
      return "Terminal ready. Type 'help' for commands.";
    }

    function getCurrentPage() {
      var path = window.location.pathname;
      if (path.indexOf('/about') === 0) return 'about';
      if (path.indexOf('/first-take') === 0) return 'first-take';
      if (path === '/' || path === '/index.html') return 'home';
      return 'other';
    }

    // ── Easter Egg Tracking ─────────────────────────────────────────
    function trackEasterEgg(name) {
      var wasNew = !state.easterEggsFound.has(name);
      state.easterEggsFound.add(name);
      saveState();
      if (wasNew) {
        var found = state.easterEggsFound.size;
        printInstant(
          '[Easter egg ' + found + '/' + TOTAL_EGGS + ' found]',
          'tw-line-accent'
        );
        if (found === TOTAL_EGGS) {
          printHTML(
            '<span style="color:#ffb000">*** CONGRATULATIONS! You found ALL ' +
              TOTAL_EGGS +
              ' easter eggs! You are a true terminal explorer. ***</span>'
          );
        }
      }
    }

    // ── Command Registry ────────────────────────────────────────────
    var commands = {};

    // -- help --
    commands['help'] = {
      desc: 'List available commands',
      hidden: false,
      fn: function (args) {
        var showAll = args === '--all' || args === '-a';
        var lines = ['\n  Available Commands:', '  ' + '─'.repeat(32)];
        var keys = Object.keys(commands).sort();
        keys.forEach(function (k) {
          var c = commands[k];
          if (showAll || !c.hidden) {
            // Skip page-specific commands that aren't relevant
            if (c.page && c.page !== getCurrentPage() && !showAll) return;
            var pad = '                  ';
            var padded = (k + pad).substring(0, 18);
            lines.push('  ' + padded + c.desc);
          }
        });
        if (!showAll) {
          lines.push('');
          lines.push('  (there are more commands than listed here...)');
          lines.push("  Try 'help --all' to see everything.");
        }
        lines.push('');
        printInstant(lines.join('\n'));
      },
    };

    // -- about --
    commands['about'] = {
      desc: 'Who is Terry?',
      hidden: false,
      fn: function () {
        printOutput(
          'Terry John Paul — Senior Product Designer.\n' +
            'AI, commerce, and fintech — end-to-end, from first principles to final pixel.\n' +
            'Currently open to opportunities.'
        );
      },
    };

    // -- projects --
    commands['projects'] = {
      desc: 'View case studies',
      hidden: false,
      fn: function () {
        var output =
          '\n  Case Studies:\n' +
          '  [1] AI Design System      — End-to-end AI product design\n' +
          '  [2] Commerce Platform     — Full-stack e-commerce redesign\n' +
          '  [3] Fintech Dashboard     — Data-driven financial tools\n' +
          '\n' +
          "  Type 'go home' to view them on the portfolio.\n";
        printInstant(output);
      },
    };

    // -- skills --
    commands['skills'] = {
      desc: 'View skills & proficiency',
      hidden: false,
      fn: function (args) {
        if (args === '--verbose' && getCurrentPage() === 'about') {
          trackEasterEgg('skills --verbose');
          var verboseLines = [
            '',
            '  Product Design    ██████████████████░░  95%  (10+ years)',
            '  Frontend Dev      ████████████████░░░░  85%  (8+ years)',
            '  AI/ML             ██████████████░░░░░░  75%  (4+ years)',
            '  Backend           ████████████░░░░░░░░  65%  (6+ years)',
            '  Design Systems    █████████████████░░░  90%  (8+ years)',
            '  Prototyping       ██████████████████░░  92%  (9+ years)',
            '',
          ];
          printInstant(verboseLines.join('\n'));
          return;
        }
        var lines = [
          '',
          '  Product Design    ██████████████████░░  95%',
          '  Frontend Dev      ████████████████░░░░  85%',
          '  AI/ML             ██████████████░░░░░░  75%',
          '  Backend           ████████████░░░░░░░░  65%',
          '',
        ];
        printInstant(lines.join('\n'));
      },
    };

    // -- contact --
    commands['contact'] = {
      desc: 'Get in touch',
      hidden: false,
      fn: function () {
        printHTML(
          '\n' +
            '  <a href="mailto:terryjohnpaul20@gmail.com" target="_blank">Email: terryjohnpaul20@gmail.com</a>\n' +
            '  <a href="https://linkedin.com/in/terryjohnpaul/" target="_blank" rel="noopener">LinkedIn: linkedin.com/in/terryjohnpaul/</a>\n' +
            '  <a href="https://x.com/UXZeldman" target="_blank" rel="noopener">Twitter: x.com/UXZeldman</a>\n' +
            '  <a href="https://instagram.com/ux.zeldman/" target="_blank" rel="noopener">Instagram: instagram.com/ux.zeldman/</a>\n'
        );
      },
    };

    // -- resume --
    commands['resume'] = {
      desc: 'Open resume (new tab)',
      hidden: false,
      fn: async function () {
        await showProgressBar('Downloading resume', 800);
        printInstant('Opening resume in new tab...');
        window.open('https://drive.google.com/file/d/1XU9UV_ZmV6aI-rapMqnlHzWepyLrmMuj/view?usp=sharing', '_blank');
      },
    };

    // -- clear --
    commands['clear'] = {
      desc: 'Clear terminal output',
      hidden: false,
      fn: function () {
        outputEl.innerHTML = '';
        saveOutput();
      },
    };

    // -- go --
    commands['go'] = {
      desc: 'Navigate to a page',
      hidden: false,
      fn: function (args) {
        var pages = {
          home: '/',
          about: '/about/',
          'first-take': '/first-take/',
        };
        var target = (args || '').trim().toLowerCase();
        if (pages[target]) {
          printOutput('Navigating to /' + (target === 'home' ? '' : target + '/') + '...');
          setTimeout(function () {
            window.location.href = pages[target];
          }, 400);
        } else {
          printError(
            "Unknown page: '" +
              escapeHTML(target) +
              "'. Available: home, about, first-take"
          );
        }
      },
    };

    // -- theme --
    commands['theme'] = {
      desc: 'Switch color theme',
      hidden: false,
      fn: function (args) {
        var name = (args || '').trim().toLowerCase();
        if (THEMES[name]) {
          applyTheme(name);
          printOutput('Theme set to ' + name + '.');
        } else {
          printError(
            "Unknown theme: '" +
              escapeHTML(name) +
              "'. Available: oxide, green, amber, dracula"
          );
        }
      },
    };

    // -- history --
    commands['history'] = {
      desc: 'Show command history',
      hidden: false,
      fn: function () {
        if (state.history.length === 0) {
          printOutput('No commands in history.');
          return;
        }
        var lines = state.history.map(function (cmd, i) {
          return '  ' + (i + 1) + '  ' + cmd;
        });
        printInstant(lines.join('\n'));
      },
    };

    // -- banner --
    commands['banner'] = {
      desc: 'Show the ASCII banner',
      hidden: false,
      fn: function () {
        printInstant('\n' + ASCII_BANNER + '\n');
      },
    };

    // -- neofetch --
    commands['neofetch'] = {
      desc: 'System info display',
      hidden: false,
      fn: function () {
        var startYear = 2019;
        var years = new Date().getFullYear() - startYear;
        var info = [
          '',
          '  terry@portfolio',
          '  ' + '─'.repeat(17),
          '  Role: Senior Product Designer',
          '  Focus: AI, Commerce, Fintech',
          '  Stack: Figma, HTML/CSS/JS, React, Python',
          '  Location: India (open to UK)',
          '  Terminal: TerryOS v1.0',
          '  Uptime: ' + years + ' years in tech',
          '',
        ];
        printInstant(info.join('\n'));
      },
    };

    // -- crt --
    commands['crt'] = {
      desc: 'Toggle CRT scanline effect',
      hidden: false,
      fn: function (args) {
        var val = (args || '').trim().toLowerCase();
        if (val === 'on') {
          applyCRT(true);
          printOutput('CRT effects enabled.');
        } else if (val === 'off') {
          applyCRT(false);
          printOutput('CRT effects disabled.');
        } else {
          applyCRT(!state.crt);
          printOutput('CRT effects ' + (state.crt ? 'enabled' : 'disabled') + '.');
        }
      },
    };

    // ── Context-Specific Commands ───────────────────────────────────

    // About page: timeline
    commands['timeline'] = {
      desc: 'Career timeline (about page)',
      hidden: false,
      page: 'about',
      fn: function () {
        if (getCurrentPage() !== 'about') {
          printError("'timeline' is only available on the /about page. Type 'go about' to navigate there.");
          return;
        }
        var log = [
          '',
          '  commit a1b2c3d  (HEAD -> career)',
          '  Date: Present',
          '  ',
          '      Senior Product Designer',
          '      Leading AI-driven product design initiatives',
          '  ',
          '  commit d4e5f6a',
          '  Date: 2021',
          '  ',
          '      Product Designer II',
          '      Commerce and fintech design systems',
          '  ',
          '  commit 7b8c9d0',
          '  Date: 2019',
          '  ',
          '      Product Designer',
          '      Full-stack design for consumer products',
          '  ',
          '  commit e1f2a3b',
          '  Date: 2017',
          '  ',
          '      Junior Designer / Frontend Dev',
          '      Learning the craft, shipping fast',
          '',
        ];
        printInstant(log.join('\n'));
      },
    };

    // About page: fun-facts
    commands['fun-facts'] = {
      desc: 'Unofficial bio (about page)',
      hidden: false,
      page: 'about',
      fn: function () {
        if (getCurrentPage() !== 'about') {
          printError("'fun-facts' is only available on the /about page. Type 'go about' to navigate there.");
          return;
        }
        var facts = [
          '',
          '  Fun Facts About Terry:',
          '  ──────────────────────',
          '  • Can debate Figma vs Sketch for hours',
          '  • Types faster than most people talk',
          '  • Has strong opinions about border-radius',
          '  • Believes dark mode is the only mode',
          '  • Coffee consumption correlates with commit count',
          '  • Once redesigned a menu in a dream',
          '  • Thinks terminal UIs are peak aesthetic',
          '',
        ];
        printInstant(facts.join('\n'));
      },
    };

    // First-take page: latest
    commands['latest'] = {
      desc: 'Latest creative work (first-take page)',
      hidden: false,
      page: 'first-take',
      fn: function () {
        if (getCurrentPage() !== 'first-take') {
          printError("'latest' is only available on the /first-take page. Type 'go first-take' to navigate there.");
          return;
        }
        printOutput(
          'Latest work: Exploring the intersection of AI-generated visuals\n' +
            'and product design. Each piece is a "first take" — raw, unpolished,\n' +
            'and experimental. Scroll the page to see the collection.'
        );
      },
    };

    // First-take page: prompt
    commands['prompt'] = {
      desc: 'Sample AI prompt (first-take page)',
      hidden: false,
      page: 'first-take',
      fn: function () {
        if (getCurrentPage() !== 'first-take') {
          printError("'prompt' is only available on the /first-take page. Type 'go first-take' to navigate there.");
          return;
        }
        printInstant(
          '\n' +
            '  Sample prompt used:\n' +
            '  ────────────────────\n' +
            '  "A minimalist product interface floating in\n' +
            '   an abstract void, isometric perspective,\n' +
            '   soft gradients, cyberpunk palette, 4k render"\n' +
            '\n' +
            '  Model: Midjourney v6 / DALL-E 3\n' +
            '  Post-processing: Figma + manual touch-up\n'
        );
      },
    };

    // ── Easter Egg Commands ─────────────────────────────────────────

    // sudo
    commands['sudo'] = {
      desc: 'Try to gain root access',
      hidden: true,
      fn: function (args) {
        if (args && args.trim().toLowerCase() === 'hire-me') {
          // sudo hire-me
          trackEasterEgg('sudo hire-me');
          var handshake = [
            '',
            '    (▀▀◡▀▀)',
            '    /|   |\\',
            '     |   |',
            '    / \\  / \\',
            '',
            '  Sending hire request to Terry... Done.',
            "  He'll be in touch.",
            '',
          ];
          printInstant(handshake.join('\n'));
          printHTML(
            '  <a href="mailto:terryjohnpaul20@gmail.com">terryjohnpaul20@gmail.com</a>' +
              '  |  <a href="https://linkedin.com/in/terryjohnpaul/" target="_blank" rel="noopener">LinkedIn</a>'
          );
          return;
        }
        trackEasterEgg('sudo');
        printOutput(
          'Permission denied. This incident will be reported.'
        );
      },
    };

    // rm -rf /
    commands['rm'] = {
      desc: 'Remove files',
      hidden: true,
      fn: async function (args) {
        if (args && args.indexOf('-rf') !== -1) {
          trackEasterEgg('rm -rf');
          var files = [
            '/usr/bin/design-skills',
            '/var/creativity',
            '/home/terry/portfolio',
            '/etc/good-taste',
            '/opt/caffeine-reserves',
            '/tmp/imposter-syndrome',
          ];
          for (var i = 0; i < files.length; i++) {
            printInstant('Deleting ' + files[i] + '...', 'tw-line-err');
            if (!reducedMotion) await delay(400);
          }
          if (!reducedMotion) await delay(800);
          printOutput("\nJust kidding. Everything's fine. 😌");
        } else {
          printOutput('rm: missing operand');
        }
      },
    };

    // matrix
    commands['matrix'] = {
      desc: 'Enter the Matrix',
      hidden: true,
      fn: function () {
        trackEasterEgg('matrix');
        startMatrixRain();
      },
    };

    // vim
    commands['vim'] = {
      desc: 'Open vim',
      hidden: true,
      fn: function () {
        trackEasterEgg('vim');
        printOutput(
          "Tip: to exit vim, try :q! ... or just close the browser tab."
        );
      },
    };

    // emacs
    commands['emacs'] = {
      desc: 'Open emacs',
      hidden: true,
      fn: async function () {
        trackEasterEgg('emacs');
        printOutput('Starting emacs...');
        if (!reducedMotion) await delay(2000);
        printOutput("Just kidding. We're a vim household.");
      },
    };

    // exit
    commands['exit'] = {
      desc: 'Try to exit',
      hidden: true,
      fn: function () {
        trackEasterEgg('exit');
        printOutput(
          'You can check out any time you like, but you can never leave.'
        );
      },
    };

    // whoami
    commands['whoami'] = {
      desc: 'Who are you?',
      hidden: true,
      fn: function () {
        trackEasterEgg('whoami');
        var ua = navigator.userAgent;
        var browser = 'Unknown';
        if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
        else if (ua.indexOf('Edg') > -1) browser = 'Edge';
        else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
        else if (ua.indexOf('Safari') > -1) browser = 'Safari';

        var os = 'Unknown';
        if (ua.indexOf('Win') > -1) os = 'Windows';
        else if (ua.indexOf('Mac') > -1) os = 'macOS';
        else if (ua.indexOf('Linux') > -1) os = 'Linux';
        else if (ua.indexOf('Android') > -1) os = 'Android';
        else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

        var res = screen.width + 'x' + screen.height;
        var time = new Date().toLocaleTimeString();

        var lines = [
          '',
          '  You are: guest@terryjohn.me',
          '  Browser: ' + browser,
          '  OS: ' + os,
          '  Screen: ' + res,
          '  Local time: ' + time,
          '',
        ];
        printInstant(lines.join('\n'));
      },
    };

    // coffee
    commands['coffee'] = {
      desc: 'Brew a cup',
      hidden: true,
      fn: function () {
        trackEasterEgg('coffee');
        var cup = [
          '',
          '      ( (',
          '       ) )',
          '    ._______.',
          '    |       |]',
          '    \\       /',
          "     `-----'",
          '',
          '  Here, have a virtual coffee.',
          '',
        ];
        printInstant(cup.join('\n'));
      },
    };

    // fortune
    commands['fortune'] = {
      desc: 'Random wisdom',
      hidden: true,
      fn: function () {
        trackEasterEgg('fortune');
        var quote =
          FORTUNE_QUOTES[Math.floor(Math.random() * FORTUNE_QUOTES.length)];
        printOutput('\n  ' + quote + '\n');
      },
    };

    // cowsay
    commands['cowsay'] = {
      desc: 'Moo',
      hidden: true,
      fn: function (args) {
        trackEasterEgg('cowsay');
        var msg = args || 'moo';
        var border = ' ' + '_'.repeat(msg.length + 2);
        var top = '< ' + msg + ' >';
        var bottom = ' ' + '-'.repeat(msg.length + 2);
        var cow = [
          border,
          top,
          bottom,
          '        \\   ^__^',
          '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\',
          '                ||----w |',
          '                ||     ||',
        ];
        printInstant(cow.join('\n'));
      },
    };

    // ping
    commands['ping'] = {
      desc: 'Ping a host',
      hidden: true,
      fn: async function (args) {
        var host = (args || 'terryjohn.me').trim();
        trackEasterEgg('ping');
        printInstant('PING ' + host + ' (' + '192.168.1.' + randomInt(1, 254) + '): 56 data bytes');
        for (var i = 0; i < 4; i++) {
          if (!reducedMotion) await delay(600);
          var ms = randomInt(12, 85);
          printInstant(
            '64 bytes from ' + host + ': icmp_seq=' + i + ' ttl=64 time=' + ms + ' ms'
          );
        }
        if (!reducedMotion) await delay(300);
        printInstant(
          '\n--- ' + host + ' ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss'
        );
      },
    };

    // curl
    commands['curl'] = {
      desc: 'Fetch a URL',
      hidden: true,
      fn: function () {
        trackEasterEgg('curl');
        var coffees = randomInt(1, 8);
        var json = {
          name: 'Terry John Paul',
          role: 'Senior Product Designer',
          available: true,
          stack: ['Figma', 'HTML/CSS', 'JavaScript', 'React', 'Python'],
          coffee_today: coffees,
        };
        printInstant(JSON.stringify(json, null, 2));
      },
    };

    // npm
    commands['npm'] = {
      desc: 'Node package manager',
      hidden: true,
      fn: async function (args) {
        if (args && args.indexOf('install') !== -1) {
          trackEasterEgg('npm');
          await showSpinner('Resolving dependencies...', 400);
          for (var i = 0; i < 4; i++) {
            var pkg = NPM_PACKAGES[randomInt(0, NPM_PACKAGES.length - 1)];
            await showProgressBar('Installing ' + pkg, 600);
          }
          printInstant('');
          printInstant('added 4 packages in 2.3s');
          printInstant('');
        } else {
          printOutput('Usage: npm install <package>');
        }
      },
    };

    // git
    commands['git'] = {
      desc: 'Git commands',
      hidden: true,
      fn: function (args) {
        if (args && args.trim() === 'log') {
          trackEasterEgg('git log');
          var log = [
            '',
            '  [33mcommit f4a8b2c[0m (HEAD -> main)',
            '  Date: Present',
            '      feat: launched portfolio terminal widget',
            '',
            '  [33mcommit d2e1c9a[0m',
            '  Date: 2023',
            '      feat: redesigned portfolio from scratch',
            '',
            '  [33mcommit b7f3a1d[0m',
            '  Date: 2021',
            '      feat: promoted to senior designer',
            '',
            '  [33mcommit 8c4e2f0[0m',
            '  Date: 2019',
            '      feat: shipped first major product',
            '',
            '  [33mcommit a1b0c3d[0m',
            '  Date: 2017',
            '      init: started career in tech',
            '',
          ];
          // Strip ANSI codes for the terminal widget
          var clean = log.map(function (l) {
            return l.replace(/\[[0-9;]*m/g, '');
          });
          printInstant(clean.join('\n'));
        } else {
          printOutput('Usage: git log');
        }
      },
    };

    // man
    commands['man'] = {
      desc: 'Manual pages',
      hidden: true,
      fn: function (args) {
        trackEasterEgg('man');
        var topic = (args || 'terry').trim().toLowerCase();
        if (topic === 'terry') {
          var page = [
            '',
            '  TERRY(1)               User Commands               TERRY(1)',
            '',
            '  NAME',
            '       terry - a senior product designer',
            '',
            '  SYNOPSIS',
            '       terry [--design] [--code] [--ship]',
            '',
            '  DESCRIPTION',
            '       Terry is a product designer & engineer who',
            '       builds things from first principles to final',
            '       pixel. Specializes in AI, commerce, and fintech.',
            '',
            '  OPTIONS',
            '       --design   Enter design mode (default)',
            '       --code     Write production code',
            '       --ship     Deploy to production',
            '',
            '  SEE ALSO',
            "       about(1), projects(1), contact(1)",
            '',
          ];
          printInstant(page.join('\n'));
        } else {
          printOutput("No manual entry for '" + escapeHTML(topic) + "'");
        }
      },
    };

    // uptime
    commands['uptime'] = {
      desc: 'System uptime',
      hidden: true,
      fn: function () {
        trackEasterEgg('uptime');
        var startYear = 2015;
        var years = new Date().getFullYear() - startYear;
        printOutput(
          'Terry has been online for ' + years + ' years in tech.'
        );
      },
    };

    // cat
    commands['cat'] = {
      desc: 'Print file contents',
      hidden: true,
      fn: function (args) {
        var file = (args || '').trim();
        if (file === '/etc/motd') {
          trackEasterEgg('cat /etc/motd');
          var msg = MOTD_MESSAGES[Math.floor(Math.random() * MOTD_MESSAGES.length)];
          printOutput('\n  Message of the day:\n  ' + msg + '\n');
        } else if (file === 'origin-story.txt' && getCurrentPage() === 'about') {
          trackEasterEgg('cat origin-story.txt');
          printOutput(
            '\n  It started with a curiosity about how things look\n' +
              '  and feel. That curiosity turned into Photoshop mockups,\n' +
              '  then HTML pages, then full product designs. Somewhere\n' +
              '  along the way, the line between design and engineering\n' +
              '  disappeared. Now it\'s all just building.\n'
          );
        } else {
          printOutput("cat: " + escapeHTML(file) + ": No such file or directory");
        }
      },
    };

    // weather
    commands['weather'] = {
      desc: 'Check the weather',
      hidden: true,
      fn: function () {
        trackEasterEgg('weather');
        printOutput("It's always sunny in Terry's terminal.");
      },
    };

    // ls
    commands['ls'] = {
      desc: 'List directory contents',
      hidden: true,
      fn: function () {
        if (getCurrentPage() === 'home') {
          trackEasterEgg('ls');
          printInstant('about/  projects/  first-take/  resume.pdf  .secret/');
        } else {
          printOutput('.');
        }
      },
    };

    // cd
    commands['cd'] = {
      desc: 'Change directory',
      hidden: true,
      fn: function (args) {
        var dir = (args || '').trim();
        if (dir === '.secret' && getCurrentPage() === 'home') {
          trackEasterEgg('cd .secret');
          var secret = [
            '',
            '  You found the secret directory!',
            '  ────────────────────────────',
            '  • Secret skill: can solve a Rubik\'s cube',
            '  • Hidden talent: decent at karaoke',
            '  • Guilty pleasure: 90s sci-fi movies',
            '  • Unpopular opinion: tabs > spaces',
            '  • This terminal was built with pure JS',
            '',
          ];
          printInstant(secret.join('\n'));
        } else {
          printOutput('cd: ' + escapeHTML(dir) + ': not a real filesystem');
        }
      },
    };

    // generate (first-take only)
    commands['generate'] = {
      desc: 'Generate art (first-take page)',
      hidden: true,
      page: 'first-take',
      fn: async function () {
        if (getCurrentPage() !== 'first-take') {
          printError("'generate' is only available on the /first-take page.");
          return;
        }
        trackEasterEgg('generate');
        var steps = [
          'Initializing neural style transfer...',
          'Loading latent space embeddings...',
          'Sampling from distribution...',
          'Applying --style=terry filter...',
          'Rendering at 4096x4096...',
        ];
        for (var i = 0; i < steps.length; i++) {
          printInstant('  [' + (i + 1) + '/' + steps.length + '] ' + steps[i]);
          if (!reducedMotion) await delay(700);
        }
        if (!reducedMotion) await delay(500);
        printOutput(
          "\n  Result: It's just a div with a gradient.\n" +
            '  (Real art requires human taste. AI is just a tool.)\n'
        );
      },
    };

    // ── Matrix Rain ─────────────────────────────────────────────────
    function startMatrixRain() {
      var canvas = document.createElement('canvas');
      canvas.style.cssText =
        'position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;pointer-events:none';
      outputEl.style.position = 'relative';
      outputEl.appendChild(canvas);

      var ctx = canvas.getContext('2d');
      canvas.width = outputEl.offsetWidth;
      canvas.height = outputEl.offsetHeight;

      var fontSize = 12;
      var columns = Math.floor(canvas.width / fontSize);
      var drops = [];
      for (var i = 0; i < columns; i++) {
        drops[i] = randomInt(0, canvas.height / fontSize);
      }

      var chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

      var interval = setInterval(function () {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (var j = 0; j < drops.length; j++) {
          var ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(ch, j * fontSize, drops[j] * fontSize);
          if (drops[j] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[j] = 0;
          }
          drops[j]++;
        }
      }, 40);

      setTimeout(function () {
        clearInterval(interval);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        printOutput('Wake up, Terry...');
      }, 3000);
    }

    // ── Command Execution ───────────────────────────────────────────
    async function executeCommand(input) {
      var parts = input.trim().split(/\s+/);
      var cmd = parts[0].toLowerCase();
      var args = parts.slice(1).join(' ');

      // Handle compound commands like "rm -rf /"
      // and "sudo hire-me"
      if (cmd === 'sudo' && args) {
        await commands['sudo'].fn(args);
        return;
      }

      if (commands[cmd]) {
        var noSpinnerCmds = ['clear','help','history','banner','theme','crt','go','echo'];
        if (noSpinnerCmds.indexOf(cmd) === -1) {
          await showSpinner('Processing...', 250);
        }
        await commands[cmd].fn(args);
      } else {
        // Try conversational resolution
        await showSpinner('Thinking...', 250);
        var response = resolveConversation(input);
        if (response === null) {
          // Already handled by command delegation
        } else if (response) {
          printOutput(response);
        } else {
          printError(
            "Command not found: " +
              escapeHTML(cmd) +
              ". Type 'help' for available commands."
          );
        }
      }
    }

    // ── Conversation Resolver System ──────────────────────────────

    // A. Levenshtein distance (typo tolerance)
    function levenshtein(a, b) {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      var matrix = [];
      for (var i = 0; i <= b.length; i++) matrix[i] = [i];
      for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
      for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
          if (b[i-1] === a[j-1]) {
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i-1][j-1] + 1,
              matrix[i][j-1] + 1,
              matrix[i-1][j] + 1
            );
          }
        }
      }
      return matrix[b.length][a.length];
    }

    function fuzzyWordMatch(inputWord, keyword) {
      if (inputWord === keyword) return true;
      if (keyword.length <= 3) return inputWord === keyword;
      if (inputWord.indexOf(keyword) === 0 || keyword.indexOf(inputWord) === 0) return true;
      var maxDist = keyword.length <= 5 ? 1 : 2;
      return levenshtein(inputWord, keyword) <= maxDist;
    }

    // B. Question type detection
    var QUESTION_PATTERNS = {
      what_is:  /^(?:what(?:'s| is| are)|define|explain)\s+/i,
      who_is:   /^(?:who(?:'s| is| are))\s+/i,
      how_does: /^(?:how (?:do|does|did|can|could|would))\s+/i,
      tell_me:  /^(?:tell me (?:about|more about))\s+/i,
      do_you:   /^(?:do you|can you|are you|have you|did you)\s+/i,
      show_me:  /^(?:show me|let me see|display|list)\s+/i,
      where_is: /^(?:where (?:is|are|do|does))\s+/i
    };

    function detectQuestionType(input) {
      for (var type in QUESTION_PATTERNS) {
        if (QUESTION_PATTERNS[type].test(input)) {
          return type;
        }
      }
      if (input.trim().endsWith('?')) return 'question';
      return 'default';
    }

    // C. Follow-up detection
    var FOLLOWUP_PATTERNS = [
      /^(?:tell me )?more(?:\s+about (?:that|it|this))?$/i,
      /^(?:what|tell me) (?:else|more)$/i,
      /^more$/i,
      /^go on$/i,
      /^continue$/i,
      /^expand(?:\s+on that)?$/i,
      /^and\??$/i,
      /^what about (?:that|it|this)\??$/i
    ];

    function isFollowUp(input) {
      var trimmed = input.trim();
      for (var i = 0; i < FOLLOWUP_PATTERNS.length; i++) {
        if (FOLLOWUP_PATTERNS[i].test(trimmed)) return true;
      }
      return false;
    }

    // D. Conversation state
    var convoState = {
      lastIntent: null,
      askedIntents: [],
      turnCount: 0,
      contextStack: [],
      push: function(intentId) {
        this.lastIntent = intentId;
        if (this.askedIntents.indexOf(intentId) === -1) {
          this.askedIntents.push(intentId);
        }
        this.contextStack.push(intentId);
        if (this.contextStack.length > 10) this.contextStack.shift();
        this.turnCount++;
      },
      getLast: function() {
        return this.contextStack.length > 0 ? this.contextStack[this.contextStack.length - 1] : null;
      }
    };

    // E. Intent scorer (the core brain)
    var STOPWORDS = ['a','an','the','is','are','was','were','do','does','did','can','could','would','should','will','i','me','my','you','your','to','for','of','in','on','at','and','or','but','with','have','has','had','be','been','this','that','it'];

    function scoreIntent(input, intent) {
      var normalized = input.toLowerCase().replace(/[^\w\s]/g, '');
      var score = 0;

      // Phase 1: Exact phrase matches (highest signal)
      if (intent.phrases) {
        for (var i = 0; i < intent.phrases.length; i++) {
          if (normalized.indexOf(intent.phrases[i].phrase) !== -1) {
            score += intent.phrases[i].weight;
          }
        }
      }

      // Phase 2: Keyword matches with fuzzy tolerance
      var words = normalized.split(/\s+/).filter(function(w) {
        return w.length > 1 && STOPWORDS.indexOf(w) === -1;
      });

      if (intent.keywords) {
        for (var j = 0; j < intent.keywords.length; j++) {
          var kw = intent.keywords[j];
          for (var k = 0; k < words.length; k++) {
            if (fuzzyWordMatch(words[k], kw.word)) {
              score += kw.weight;
              break;
            }
          }
        }
      }

      return score;
    }

    function matchIntent(input) {
      if (!TERRY || !TERRY.intents) return null;
      var best = null;
      var bestScore = 0;

      for (var i = 0; i < TERRY.intents.length; i++) {
        var intent = TERRY.intents[i];
        var score = scoreIntent(input, intent);
        if (score >= intent.threshold && score > bestScore) {
          best = intent;
          bestScore = score;
        }
      }

      return best ? { intent: best, score: bestScore } : null;
    }

    // F. Template filler
    function fillTemplate(template) {
      if (!TERRY) return template;
      var m = TERRY.meta;
      var years = new Date().getFullYear() - (m.startYear || 2019);
      var data = {
        name: m.name,
        role: m.role,
        tagline: m.tagline,
        location: m.location || 'India',
        years: years,
        availability: m.available ? 'open to opportunities' : 'not currently looking',
        seeking: m.seeking || 'senior product design roles',
        website: m.website,
        designTools: TERRY.skills.design.tools.join(', '),
        designItems: TERRY.skills.design.items.join(', '),
        engItems: TERRY.skills.engineering.items.join(', '),
        aiItems: TERRY.skills.ai.items.join(', '),
        allTools: TERRY.skills.design.tools.concat(TERRY.skills.engineering.items).concat(TERRY.skills.ai.items).join(', '),
        email: TERRY.contact.email,
        linkedin: TERRY.contact.linkedin,
        twitter: TERRY.contact.twitter,
        process: TERRY.philosophy.process.join(' → '),
        currentRole: m.role,
        engYears: years,
        randomFact: TERRY.funFacts ? TERRY.funFacts[randomInt(0, TERRY.funFacts.length - 1)] : '',
        resumeLink: TERRY.contact.resume
      };

      return template.replace(/\{(\w+)\}/g, function(match, key) {
        return data[key] !== undefined ? data[key] : match;
      });
    }

    // F2. Pool-based intent mapping (for varied responses)
    var POOL_INTENTS = {
      cuss_words: 'cussResponses',
      flirting: 'flirtResponses',
      joke: 'jokeResponses',
      greeting: 'greeting'
    };

    // G. Response generator
    function generateResponse(intentId, questionType) {
      if (!TERRY || !TERRY.responses) return null;

      // Check if this intent should pick from a variation pool
      if (POOL_INTENTS[intentId]) {
        var poolResponse = pickPool(POOL_INTENTS[intentId]);
        if (poolResponse) return poolResponse;
      }

      var templates = TERRY.responses[intentId];
      if (!templates) return null;

      // If templates is a string, return directly
      if (typeof templates === 'string') return fillTemplate(templates);

      // If it's an object, pick by question type
      var template = templates[questionType] || templates['default'];
      if (template === null) return null; // delegate to visual command
      if (!template) return null;

      return fillTemplate(template);
    }

    function getFollowUpSuggestion(intentId) {
      if (!TERRY || !TERRY.pools || !TERRY.pools.followUpSuggestions) return '';
      var suggestion = TERRY.pools.followUpSuggestions[intentId];
      return suggestion ? '\n\n  ' + suggestion : '';
    }

    function getDeepDive(intentId) {
      if (!TERRY || !TERRY.pools || !TERRY.pools.deepDive) return null;
      return TERRY.pools.deepDive[intentId] || null;
    }

    function pickPool(poolName) {
      if (!TERRY || !TERRY.pools || !TERRY.pools[poolName]) return null;
      var pool = TERRY.pools[poolName];
      return pool[randomInt(0, pool.length - 1)];
    }

    // H. The main resolver (replaces smartMatch)
    function resolveConversation(input) {
      // Layer 1: Follow-up detection
      if (isFollowUp(input)) {
        var lastCtx = convoState.getLast();
        if (lastCtx) {
          var deep = getDeepDive(lastCtx);
          if (deep) {
            convoState.push(lastCtx);
            return deep;
          }
        }
        return "I'm not sure what you're referring to. Try asking about Terry's skills, projects, or experience.";
      }

      // Layer 2: Detect question type
      var qType = detectQuestionType(input);

      // Layer 3: Score against intents
      var match = matchIntent(input);

      if (match) {
        var intentId = match.intent.id;
        convoState.push(intentId);

        // Check if this intent should delegate to a visual command
        var response = generateResponse(intentId, qType);
        if (response === null) {
          // Delegate to existing command (skills, projects, etc.)
          if (commands[intentId]) {
            commands[intentId].fn('');
            return null; // signal: already handled
          }
        }

        if (response) {
          var followUp = getFollowUpSuggestion(intentId);
          return response + followUp;
        }
      }

      // Layer 4: Special cases (greeting, farewell, gratitude are handled by intents too)

      // Layer 5: Unknown — pick from pool
      convoState.turnCount++;
      var unknownResponse = pickPool('unknown');
      return unknownResponse || "I'm not sure about that. Type 'help' for available commands.";
    }

    async function runCommand(cmd) {
      state.history.push(cmd);
      state.historyIndex = -1;
      echoCommand(cmd);
      inputEl.value = '';
      inputEl.focus();
      await executeCommand(cmd);
      saveState();
    }

    // ── Tab Completion ──────────────────────────────────────────────
    function tabComplete(partial) {
      if (!partial) return;
      var lower = partial.toLowerCase();
      var matches = Object.keys(commands).filter(function (k) {
        return k.indexOf(lower) === 0 && !commands[k].hidden;
      });
      // Also check hidden commands if partial is longer
      if (matches.length === 0) {
        matches = Object.keys(commands).filter(function (k) {
          return k.indexOf(lower) === 0;
        });
      }
      if (matches.length === 1) {
        inputEl.value = matches[0] + ' ';
      } else if (matches.length > 1) {
        echoCommand(partial);
        printInstant(matches.join('  '));
      }
    }

    // ── Input Handling ──────────────────────────────────────────────
    function setupInput() {
      inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var val = inputEl.value.trim();
          if (!val) return;
          state.history.push(val);
          state.historyIndex = -1;
          echoCommand(val);
          executeCommand(val);
          inputEl.value = '';
          saveState();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (state.history.length === 0) return;
          if (state.historyIndex === -1) {
            state.historyIndex = state.history.length - 1;
          } else if (state.historyIndex > 0) {
            state.historyIndex--;
          }
          inputEl.value = state.history[state.historyIndex] || '';
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (state.historyIndex === -1) return;
          if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            inputEl.value = state.history[state.historyIndex] || '';
          } else {
            state.historyIndex = -1;
            inputEl.value = '';
          }
        } else if (e.key === 'Tab') {
          e.preventDefault();
          tabComplete(inputEl.value.trim());
        }
      });

      // Hide block cursor when input is focused and has content
      inputEl.addEventListener('input', function () {
        cursorEl.style.display = inputEl.value.length > 0 ? 'none' : '';
      });
    }

    // ── Global Keyboard ─────────────────────────────────────────────
    function isTypingElsewhere(e) {
      var tag = e.target.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        e.target.contentEditable === 'true'
      ) {
        return e.target !== inputEl;
      }
      return false;
    }

    function setupGlobalKeys() {
      document.addEventListener('keydown', function (e) {
        // Backtick to toggle
        if (e.key === '`' && !isTypingElsewhere(e)) {
          e.preventDefault();
          toggleWidget();
        }
        // Escape to close
        if (e.key === 'Escape' && state.isOpen) {
          closeWidget();
        }
        // Ctrl+L to clear
        if (e.key === 'l' && (e.ctrlKey || e.metaKey) && state.isOpen) {
          e.preventDefault();
          commands['clear'].fn();
        }
      });
    }

    // ── Focus Trap ──────────────────────────────────────────────────
    function setupFocusTrap() {
      var focusableEls = [closeBtn, inputEl];
      var chips = chipsEl.querySelectorAll('.tw-chip');
      chips.forEach(function (c) {
        focusableEls.push(c);
      });

      panelEl.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;

        var first = focusableEls[0];
        var last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    // ── Button Handlers ─────────────────────────────────────────────
    function setupButtons() {
      triggerEl.addEventListener('click', function () {
        toggleWidget();
      });

      closeBtn.addEventListener('click', function () {
        closeWidget();
      });

      minBtn.addEventListener('click', function () {
        closeWidget();
      });
    }

    // ── Page Loader Awareness ───────────────────────────────────────
    function handlePageLoader() {
      var loader = document.getElementById('page-loader');
      if (!loader) return;

      // Hide trigger until loader is hidden
      triggerEl.classList.add('tw-hidden');

      if (loader.classList.contains('is-hidden')) {
        triggerEl.classList.remove('tw-hidden');
        return;
      }

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (loader.classList.contains('is-hidden')) {
              triggerEl.classList.remove('tw-hidden');
              observer.disconnect();
            }
          }
        });
      });

      observer.observe(loader, { attributes: true });

      // Fallback
      setTimeout(function () {
        triggerEl.classList.remove('tw-hidden');
        observer.disconnect();
      }, 5000);
    }

    // ── Proactive Teaser ────────────────────────────────────────────
    function setupTeaser() {
      if (localStorage.getItem('tw-teaser-shown')) return;
      if (state.isOpen) return;

      setTimeout(function () {
        if (state.isOpen) return;
        if (localStorage.getItem('tw-teaser-shown')) return;

        teaserEl.classList.add('tw-visible');
        var text = '> I have easter eggs...';
        var i = 0;

        if (reducedMotion) {
          teaserEl.textContent = text;
        } else {
          var teaserInterval = setInterval(function () {
            if (i < text.length) {
              teaserEl.textContent += text[i];
              i++;
            } else {
              clearInterval(teaserInterval);
            }
          }, 50);
        }

        setTimeout(function () {
          teaserEl.classList.remove('tw-visible');
          localStorage.setItem('tw-teaser-shown', 'true');
        }, 5000);
      }, 8000);
    }

    // ── Session Persistence ─────────────────────────────────────────
    function restoreSession() {
      // Restore output from sessionStorage
      if (state.outputHTML) {
        outputEl.innerHTML = state.outputHTML;

        // Add navigation breadcrumb
        var navLine = document.createElement('div');
        navLine.className = 'tw-line tw-line-accent';
        navLine.textContent =
          '[navigated to ' + window.location.pathname + ']';
        outputEl.appendChild(navLine);
        scrollToBottom();
        saveOutput();
      }

      // Restore open state
      if (state.isOpen) {
        // Delay slightly to let DOM settle
        setTimeout(function () {
          openWidget();
        }, 100);
      }
    }

    // ── Initialize ──────────────────────────────────────────────────
    function init() {
      createDOM();
      setupInput();
      setupGlobalKeys();
      setupButtons();
      handlePageLoader();
      restoreSession();
      setupTeaser();

      // If first open and not yet opened, show greeting on first open
      // (handled in toggleWidget)
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } catch (e) {
    console.warn('[TerryTerminal] Failed to initialize:', e);
  }
})();
