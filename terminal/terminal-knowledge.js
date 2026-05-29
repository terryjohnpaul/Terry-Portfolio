/* ============================================================================
   terminal-knowledge.js
   Knowledge base and brain for the TerryOS terminal widget.
   Exposes window.TERRY — consumed by terminal.js at runtime.
   ========================================================================= */

(function () {
  'use strict';

  window.TERRY = {

    /* -----------------------------------------------------------------------
       1. META — Core identity
    ----------------------------------------------------------------------- */
    meta: {
      name: 'Terry John Paul',
      role: 'Senior Product Designer',
      tagline: 'The product designer who actually engineers',
      location: 'Mumbai, India',
      available: true,
      startYear: 2019,
      website: 'terryjohn.me',
      seeking: 'Senior product design roles in the UK with visa sponsorship'
    },

    /* -----------------------------------------------------------------------
       2. SKILLS — Grouped by discipline
    ----------------------------------------------------------------------- */
    skills: {
      design: {
        label: 'Product Design',
        items: ['Product Strategy', 'UX Research', 'Interaction Design', 'Visual Design', 'Design Systems', 'Prototyping', 'Information Architecture', 'Usability Testing'],
        tools: ['Figma', 'Framer', 'Principle', 'Adobe Suite'],
        proficiency: 95,
        years: 6
      },
      engineering: {
        label: 'Frontend Engineering',
        items: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
        tools: ['VS Code', 'Git', 'Chrome DevTools'],
        proficiency: 85,
        years: 6
      },
      ai: {
        label: 'AI / ML',
        items: ['AI Product Design', 'Prompt Engineering', 'LLM UX Patterns', 'ML Integration', 'Generative Interfaces', 'Workflow Design'],
        tools: ['Python', 'Claude API', 'fal.ai', 'Kling v3 Pro', 'Seedance 2.0', 'Veo 3.1'],
        proficiency: 80,
        years: 3
      },
      systems: {
        label: 'Design Systems',
        items: ['Component Architecture', 'Design Tokens', 'WCAG Accessibility', 'Developer Handoff', 'Documentation'],
        tools: ['Figma', 'Storybook'],
        proficiency: 90,
        years: 4
      },
      commerce: {
        label: 'Platform & Commerce',
        items: ['E-commerce UX', 'Checkout Flows', 'Merchant Tooling', 'Product Discovery', 'Responsive Design'],
        proficiency: 88,
        years: 4
      }
    },

    /* -----------------------------------------------------------------------
       3. EXPERIENCE — Most recent first
    ----------------------------------------------------------------------- */
    experience: [
      {
        role: 'Senior Product Designer',
        company: 'Pixelbin / Fynd',
        period: '2022 – Present',
        focus: 'Leading AI-driven product design, embedded with ML engineers',
        tags: ['ai', 'leadership', 'design-systems']
      },
      {
        role: 'Product Designer II',
        company: 'Fynd / Jio Commerce',
        period: '2021 – 2022',
        focus: 'Commerce platform and fintech design systems, built BNPL from 0 to 1',
        tags: ['commerce', 'fintech', 'design-systems']
      },
      {
        role: 'Product Designer',
        company: 'Fynd',
        period: '2019 – 2021',
        focus: 'E-commerce UX, checkout flows, merchant tooling',
        tags: ['consumer', 'mobile', 'web']
      }
    ],

    /* -----------------------------------------------------------------------
       4. PROJECTS — Featured work
    ----------------------------------------------------------------------- */
    projects: [
      {
        name: 'Pixelbin',
        desc: 'AI-powered image optimization platform. ~60% reduction in manual processing time, adopted across 3 continents.',
        tags: ['ai', 'product-design', 'ml'],
        metric: '~60% reduction in manual processing time'
      },
      {
        name: 'BNPL at Scale',
        desc: 'Buy Now Pay Later fintech product. 0 to 1 shipped in under 4 months, integrated across 5+ merchant flows.',
        tags: ['fintech', 'commerce', '0-to-1'],
        metric: 'Shipped in under 4 months'
      },
      {
        name: 'Swadesh Design System',
        desc: '180+ components adopted by 4 product squads. ~35% faster design-to-dev handoff.',
        tags: ['design-system', 'figma', 'components'],
        metric: '180+ components, ~35% faster handoff'
      },
      {
        name: 'First Take',
        desc: 'AI filmmaking. Short films and visual experiments using Kling v3 Pro, Seedance 2.0, Veo 3.1, and more. 200-400 generations per film.',
        tags: ['ai', 'creative', 'generative', 'film']
      }
    ],

    /* -----------------------------------------------------------------------
       5. PHILOSOPHY — Design principles & process
    ----------------------------------------------------------------------- */
    philosophy: {
      approach: 'Process follows the problem. I don\'t bring a methodology. I bring judgment.',
      principles: [
        'Most designers stop at the handoff. I stay until it ships.',
        'Design and engineering are one discipline — I do both',
        'Process follows the problem, not the other way around',
        'Accessibility is a requirement, not a feature',
        'The best interface is the one that disappears'
      ],
      process: [
        'Understand the real problem',
        'Define & Scope ruthlessly',
        'Design with high fidelity early',
        'Build working prototypes',
        'Ship & Measure everything'
      ]
    },

    /* -----------------------------------------------------------------------
       6. CONTACT — Real links & handles
    ----------------------------------------------------------------------- */
    contact: {
      email: 'terryjohnpaul20@gmail.com',
      linkedin: 'linkedin.com/in/terryjohnpaul/',
      twitter: 'x.com/UXZeldman',
      instagram: 'instagram.com/ux.zeldman/',
      resume: 'https://drive.google.com/file/d/1XU9UV_ZmV6aI-rapMqnlHzWepyLrmMuj/view?usp=sharing',
      website: 'terryjohn.me'
    },

    /* -----------------------------------------------------------------------
       7. FUN FACTS — Personality & color
    ----------------------------------------------------------------------- */
    funFacts: [
      'Terry types faster than most people talk.',
      'He has strong opinions about border-radius values — and he will defend them.',
      'This entire terminal widget was built in vanilla JS — no React, no frameworks, no build step.',
      'He once redesigned a checkout flow and delivered the lowest drop-off rate at Fynd.',
      'He opens DevTools before Figma sometimes. No shame.',
      'He can spot a 1px misalignment from across the room.',
      'Coffee order: strong, black, no nonsense. Like his terminal themes.',
      'He names his Figma layers properly. Every. Single. One.',
      'He learned to code because he got tired of waiting for developers to build his designs.',
      'His most-used keyboard shortcut is Cmd+Z — iteration is the process.',
      'He thinks dark mode should be the default for everything.',
      'He has debugged CSS in his dreams. Literally.',
      'Each First Take film goes through 200-400 AI generations before it\'s done.',
      'He replaced a 3-person design+dev workflow on a fintech product. Solo.',
      'He built the design system powering Jio Commerce Platform — 180+ components.',
      'His AI films explore liminal spaces, memory textures, and uncanny beauty.',
      'When he\'s not designing, he\'s at the gym. Deadlifts clear the mind better than any sprint retrospective.',
      'Fitness is his other design system — progressive overload, consistency, no shortcuts.',
      'He treats the gym like a product sprint: track metrics, iterate form, ship gains.',
      'Outside of work: gym sessions, AI filmmaking experiments, and an unhealthy amount of black coffee.',
      'He believes the best ideas come mid-workout. Something about blood flow and endorphins.',
      'Mumbai local trains taught him more about UX than any bootcamp ever could.'
    ],

    /* -----------------------------------------------------------------------
       8. CREATIVE — First Take project details
    ----------------------------------------------------------------------- */
    creative: {
      project: 'First Take',
      description: 'The filmmaker who actually directs machines. Short films and visual experiments using AI video models.',
      approach: 'Each film goes through 200-400 generations. Films about liminal spaces, memory textures, uncanny beauty.',
      tools: ['Kling v3 Pro', 'Seedance 2.0', 'Veo 3.1', 'Sora 2', 'PixVerse V6', 'Wan 2.2', 'LTX Video 13B'],
      pipeline: ['fal.ai', 'Generative Pipelines', 'AI Animation', 'Prompt Direction', 'Freepik Spaces', 'Model Chaining']
    },

    /* -----------------------------------------------------------------------
       9. PROOF — What shipped (receipts)
    ----------------------------------------------------------------------- */
    proof: [
      'A full product built from scratch in under three weeks',
      'Replaced a 3-person design+dev workflow on a fintech product',
      'Delivered the lowest drop-off rate on any payment flow at Fynd',
      'Built the design system powering Jio Commerce Platform',
      'Led Pixelbin\'s end-to-end UX embedded with ML engineers'
    ],

    /* -----------------------------------------------------------------------
       10. INTENTS — NLP matching brain
           Each intent carries weighted keywords, weighted phrases,
           and a threshold that must be exceeded for activation.
    ----------------------------------------------------------------------- */
    intents: [

      /* 1 ── about */
      {
        id: 'about',
        keywords: [
          { word: 'who',        weight: 2 },
          { word: 'terry',      weight: 3 },
          { word: 'about',      weight: 2 },
          { word: 'introduce',  weight: 3 },
          { word: 'yourself',   weight: 3 },
          { word: 'bio',        weight: 3 },
          { word: 'background', weight: 2 },
          { word: 'overview',   weight: 2 },
          { word: 'summary',    weight: 2 },
          { word: 'profile',    weight: 2 }
        ],
        phrases: [
          { phrase: 'who is terry',        weight: 10 },
          { phrase: 'tell me about',       weight: 8 },
          { phrase: 'who are you',         weight: 9 },
          { phrase: 'introduce yourself',  weight: 10 },
          { phrase: 'about terry',         weight: 9 },
          { phrase: 'what do you do',      weight: 8 }
        ],
        threshold: 4
      },

      /* 2 ── skills */
      {
        id: 'skills',
        keywords: [
          { word: 'skills',       weight: 3 },
          { word: 'stack',        weight: 2 },
          { word: 'technologies', weight: 3 },
          { word: 'tools',        weight: 2 },
          { word: 'figma',        weight: 3 },
          { word: 'react',        weight: 3 },
          { word: 'python',       weight: 3 },
          { word: 'programming',  weight: 2 },
          { word: 'code',         weight: 1 },
          { word: 'coding',       weight: 2 },
          { word: 'abilities',    weight: 2 },
          { word: 'expertise',    weight: 2 },
          { word: 'proficiency',  weight: 2 }
        ],
        phrases: [
          { phrase: 'tech stack',        weight: 10 },
          { phrase: 'design tools',      weight: 9 },
          { phrase: 'what do you use',   weight: 8 },
          { phrase: 'what tools',        weight: 8 },
          { phrase: 'good at',           weight: 8 },
          { phrase: 'skilled in',        weight: 9 },
          { phrase: 'can you code',      weight: 8 }
        ],
        threshold: 3
      },

      /* 3 ── experience */
      {
        id: 'experience',
        keywords: [
          { word: 'experience',  weight: 3 },
          { word: 'career',      weight: 3 },
          { word: 'history',     weight: 2 },
          { word: 'jobs',        weight: 2 },
          { word: 'companies',   weight: 2 },
          { word: 'roles',       weight: 2 },
          { word: 'worked',      weight: 2 },
          { word: 'years',       weight: 1 },
          { word: 'employment',  weight: 3 },
          { word: 'positions',   weight: 2 }
        ],
        phrases: [
          { phrase: 'work history',    weight: 10 },
          { phrase: 'work experience', weight: 10 },
          { phrase: 'how long',        weight: 8 },
          { phrase: 'where have you',  weight: 8 },
          { phrase: 'previous roles',  weight: 9 },
          { phrase: 'career path',     weight: 9 }
        ],
        threshold: 3
      },

      /* 4 ── projects */
      {
        id: 'projects',
        keywords: [
          { word: 'projects',   weight: 3 },
          { word: 'portfolio',  weight: 3 },
          { word: 'work',       weight: 1 },
          { word: 'built',      weight: 2 },
          { word: 'shipped',    weight: 2 },
          { word: 'made',       weight: 1 },
          { word: 'created',    weight: 2 },
          { word: 'designed',   weight: 2 },
          { word: 'case',       weight: 1 },
          { word: 'studies',    weight: 2 }
        ],
        phrases: [
          { phrase: 'case studies',        weight: 10 },
          { phrase: 'show me your work',   weight: 10 },
          { phrase: 'what have you built', weight: 9 },
          { phrase: 'your projects',       weight: 9 },
          { phrase: 'what have you made',  weight: 9 },
          { phrase: 'show me projects',    weight: 9 }
        ],
        threshold: 3
      },

      /* 5 ── contact */
      {
        id: 'contact',
        keywords: [
          { word: 'email',    weight: 3 },
          { word: 'reach',    weight: 2 },
          { word: 'contact',  weight: 3 },
          { word: 'connect',  weight: 2 },
          { word: 'message',  weight: 2 },
          { word: 'linkedin', weight: 3 },
          { word: 'twitter',  weight: 3 },
          { word: 'socials',  weight: 2 },
          { word: 'instagram', weight: 3 }
        ],
        phrases: [
          { phrase: 'get in touch',     weight: 10 },
          { phrase: 'reach out',        weight: 9 },
          { phrase: 'contact info',     weight: 10 },
          { phrase: 'how to contact',   weight: 9 },
          { phrase: 'send a message',   weight: 8 },
          { phrase: 'email address',    weight: 9 }
        ],
        threshold: 3
      },

      /* 6 ── resume */
      {
        id: 'resume',
        keywords: [
          { word: 'resume',   weight: 3 },
          { word: 'cv',       weight: 3 },
          { word: 'download', weight: 2 },
          { word: 'pdf',      weight: 2 }
        ],
        phrases: [
          { phrase: 'download resume',  weight: 10 },
          { phrase: 'see your resume',  weight: 9 },
          { phrase: 'your cv',          weight: 9 },
          { phrase: 'resume link',      weight: 9 },
          { phrase: 'download cv',      weight: 10 }
        ],
        threshold: 3
      },

      /* 7 ── philosophy */
      {
        id: 'philosophy',
        keywords: [
          { word: 'philosophy',  weight: 3 },
          { word: 'approach',    weight: 2 },
          { word: 'methodology', weight: 3 },
          { word: 'principles',  weight: 3 },
          { word: 'values',      weight: 2 },
          { word: 'believe',     weight: 2 },
          { word: 'mindset',     weight: 2 }
        ],
        phrases: [
          { phrase: 'design thinking',     weight: 9 },
          { phrase: 'design philosophy',   weight: 10 },
          { phrase: 'your approach',       weight: 8 },
          { phrase: 'how do you think',    weight: 8 },
          { phrase: 'what drives you',     weight: 8 }
        ],
        threshold: 3
      },

      /* 8 ── availability */
      {
        id: 'availability',
        keywords: [
          { word: 'available',  weight: 3 },
          { word: 'hiring',     weight: 3 },
          { word: 'freelance',  weight: 3 },
          { word: 'open',       weight: 1 },
          { word: 'looking',    weight: 1 },
          { word: 'job',        weight: 2 },
          { word: 'opportunity', weight: 2 },
          { word: 'opportunities', weight: 2 }
        ],
        phrases: [
          { phrase: 'open to',          weight: 8 },
          { phrase: 'looking for',      weight: 8 },
          { phrase: 'available for',    weight: 9 },
          { phrase: 'open to work',     weight: 10 },
          { phrase: 'are you hiring',   weight: 9 },
          { phrase: 'taking on work',   weight: 8 }
        ],
        threshold: 3
      },

      /* 9 ── location */
      {
        id: 'location',
        keywords: [
          { word: 'where',    weight: 2 },
          { word: 'based',    weight: 2 },
          { word: 'city',     weight: 3 },
          { word: 'country',  weight: 3 },
          { word: 'located',  weight: 3 },
          { word: 'live',     weight: 2 },
          { word: 'location', weight: 3 },
          { word: 'remote',   weight: 2 },
          { word: 'timezone', weight: 3 },
          { word: 'india',    weight: 3 },
          { word: 'uk',       weight: 2 },
          { word: 'visa',     weight: 3 },
          { word: 'relocate', weight: 3 },
          { word: 'terry',    weight: 1 }
        ],
        phrases: [
          { phrase: 'where are you',       weight: 9 },
          { phrase: 'where is terry',      weight: 9 },
          { phrase: 'where does terry',    weight: 9 },
          { phrase: 'based in',            weight: 8 },
          { phrase: 'where do you live',   weight: 9 },
          { phrase: 'where does terry live', weight: 10 },
          { phrase: 'what timezone',       weight: 8 },
          { phrase: 'visa sponsorship',    weight: 10 }
        ],
        threshold: 3
      },

      /* 10 ── ai_work */
      {
        id: 'ai_work',
        keywords: [
          { word: 'ai',             weight: 3 },
          { word: 'artificial',     weight: 3 },
          { word: 'intelligence',   weight: 2 },
          { word: 'machine',        weight: 2 },
          { word: 'learning',       weight: 1 },
          { word: 'llm',            weight: 3 },
          { word: 'prompt',         weight: 2 },
          { word: 'generative',     weight: 3 },
          { word: 'gpt',            weight: 3 },
          { word: 'claude',         weight: 3 },
          { word: 'chatbot',        weight: 3 },
          { word: 'ml',             weight: 3 }
        ],
        phrases: [
          { phrase: 'artificial intelligence', weight: 10 },
          { phrase: 'machine learning',        weight: 10 },
          { phrase: 'ai work',                 weight: 9 },
          { phrase: 'ai design',               weight: 9 },
          { phrase: 'prompt engineering',       weight: 10 },
          { phrase: 'llm ux',                  weight: 10 },
          { phrase: 'ai product',              weight: 9 },
          { phrase: 'generative ai',           weight: 9 }
        ],
        threshold: 3
      },

      /* 11 ── design_tools */
      {
        id: 'design_tools',
        keywords: [
          { word: 'figma',     weight: 3 },
          { word: 'sketch',    weight: 3 },
          { word: 'framer',    weight: 3 },
          { word: 'principle', weight: 3 },
          { word: 'adobe',     weight: 3 },
          { word: 'photoshop', weight: 3 },
          { word: 'illustrator', weight: 3 },
          { word: 'xd',        weight: 3 },
          { word: 'prototype', weight: 2 },
          { word: 'wireframe', weight: 2 }
        ],
        phrases: [
          { phrase: 'design tools',     weight: 10 },
          { phrase: 'design software',  weight: 9 },
          { phrase: 'do you use figma', weight: 10 },
          { phrase: 'favorite tool',    weight: 8 },
          { phrase: 'tools you use',    weight: 8 }
        ],
        threshold: 3
      },

      /* 12 ── frontend */
      {
        id: 'frontend',
        keywords: [
          { word: 'react',       weight: 3 },
          { word: 'javascript',  weight: 3 },
          { word: 'typescript',  weight: 3 },
          { word: 'html',        weight: 3 },
          { word: 'css',         weight: 3 },
          { word: 'frontend',    weight: 3 },
          { word: 'front-end',   weight: 3 },
          { word: 'vue',         weight: 3 },
          { word: 'svelte',      weight: 3 },
          { word: 'nextjs',      weight: 3 },
          { word: 'tailwind',    weight: 3 }
        ],
        phrases: [
          { phrase: 'web development',    weight: 9 },
          { phrase: 'frontend development', weight: 10 },
          { phrase: 'front-end development', weight: 10 },
          { phrase: 'can you code',       weight: 8 },
          { phrase: 'do you code',        weight: 8 },
          { phrase: 'write code',         weight: 8 }
        ],
        threshold: 3
      },

      /* 13 ── first_take */
      {
        id: 'first_take',
        keywords: [
          { word: 'first',       weight: 1 },
          { word: 'take',        weight: 1 },
          { word: 'films',       weight: 2 },
          { word: 'filmmaker',   weight: 3 },
          { word: 'movies',      weight: 2 },
          { word: 'creative',    weight: 2 },
          { word: 'experiments', weight: 2 },
          { word: 'visual',      weight: 1 },
          { word: 'art',         weight: 2 },
          { word: 'kling',       weight: 3 },
          { word: 'seedance',    weight: 3 },
          { word: 'veo',         weight: 3 },
          { word: 'sora',        weight: 3 }
        ],
        phrases: [
          { phrase: 'first take',          weight: 10 },
          { phrase: 'ai films',            weight: 9 },
          { phrase: 'creative experiments', weight: 9 },
          { phrase: 'ai art',              weight: 8 },
          { phrase: 'ai visuals',          weight: 8 },
          { phrase: 'generative art',      weight: 9 },
          { phrase: 'creative work',       weight: 8 },
          { phrase: 'ai filmmaker',        weight: 10 },
          { phrase: 'ai movies',           weight: 9 },
          { phrase: 'ai video',            weight: 9 }
        ],
        threshold: 3
      },

      /* 14 ── fun_facts */
      {
        id: 'fun_facts',
        keywords: [
          { word: 'fun',         weight: 2 },
          { word: 'interesting', weight: 2 },
          { word: 'hobby',       weight: 3 },
          { word: 'hobbies',     weight: 3 },
          { word: 'quirky',      weight: 3 },
          { word: 'random',      weight: 2 },
          { word: 'facts',       weight: 2 },
          { word: 'trivia',      weight: 3 },
          { word: 'surprise',    weight: 2 }
        ],
        phrases: [
          { phrase: 'fun facts',         weight: 10 },
          { phrase: 'facts about',       weight: 9 },
          { phrase: 'something fun',     weight: 8 },
          { phrase: 'tell me something', weight: 8 },
          { phrase: 'random fact',       weight: 9 },
          { phrase: 'fun stuff',         weight: 8 }
        ],
        threshold: 3
      },

      /* 15 ── greeting */
      {
        id: 'greeting',
        keywords: [
          { word: 'hello',     weight: 3 },
          { word: 'hi',        weight: 3 },
          { word: 'hey',       weight: 3 },
          { word: 'hai',       weight: 3 },
          { word: 'sup',       weight: 3 },
          { word: 'howdy',     weight: 3 },
          { word: 'yo',        weight: 3 },
          { word: 'hola',      weight: 3 },
          { word: 'greetings', weight: 3 },
          { word: 'hiya',      weight: 3 },
          { word: 'morning',   weight: 2 },
          { word: 'afternoon', weight: 2 },
          { word: 'evening',   weight: 2 }
        ],
        phrases: [
          { phrase: 'good morning',    weight: 9 },
          { phrase: 'good afternoon',  weight: 9 },
          { phrase: 'good evening',    weight: 9 },
          { phrase: 'whats up',        weight: 8 }
        ],
        threshold: 3
      },

      /* 16 ── farewell */
      {
        id: 'farewell',
        keywords: [
          { word: 'bye',     weight: 3 },
          { word: 'goodbye', weight: 3 },
          { word: 'later',   weight: 2 },
          { word: 'quit',    weight: 3 },
          { word: 'close',   weight: 2 },
          { word: 'exit',    weight: 3 },
          { word: 'leave',   weight: 2 },
          { word: 'cya',     weight: 3 },
          { word: 'adios',   weight: 3 }
        ],
        phrases: [
          { phrase: 'see you',       weight: 9 },
          { phrase: 'see ya',        weight: 9 },
          { phrase: 'gotta go',      weight: 8 },
          { phrase: 'catch you later', weight: 9 },
          { phrase: 'take care',     weight: 8 },
          { phrase: 'peace out',     weight: 8 }
        ],
        threshold: 3
      },

      /* 17 ── gratitude */
      {
        id: 'gratitude',
        keywords: [
          { word: 'thanks',  weight: 3 },
          { word: 'thank',   weight: 3 },
          { word: 'helpful', weight: 2 },
          { word: 'appreciate', weight: 3 }
        ],
        phrases: [
          { phrase: 'thank you',     weight: 10 },
          { phrase: 'thanks a lot',  weight: 9 },
          { phrase: 'appreciate it', weight: 9 },
          { phrase: 'thats helpful', weight: 8 }
        ],
        threshold: 3
      },

      /* 18 ── help_request */
      {
        id: 'help_request',
        keywords: [
          { word: 'help',      weight: 3 },
          { word: 'commands',  weight: 3 },
          { word: 'options',   weight: 2 },
          { word: 'manual',    weight: 3 },
          { word: 'guide',     weight: 2 },
          { word: 'tutorial',  weight: 2 },
          { word: 'instructions', weight: 2 }
        ],
        phrases: [
          { phrase: 'what can i do',        weight: 10 },
          { phrase: 'how does this work',   weight: 10 },
          { phrase: 'what is this',         weight: 8 },
          { phrase: 'how to use',           weight: 9 },
          { phrase: 'what commands',        weight: 9 },
          { phrase: 'show commands',        weight: 9 },
          { phrase: 'how do i',             weight: 8 }
        ],
        threshold: 3
      },

      /* 19 ── salary */
      {
        id: 'salary',
        keywords: [
          { word: 'salary',       weight: 3 },
          { word: 'compensation', weight: 3 },
          { word: 'rate',         weight: 2 },
          { word: 'pricing',      weight: 3 },
          { word: 'cost',         weight: 2 },
          { word: 'pay',          weight: 2 },
          { word: 'charge',       weight: 2 },
          { word: 'money',        weight: 2 },
          { word: 'budget',       weight: 2 }
        ],
        phrases: [
          { phrase: 'how much',            weight: 8 },
          { phrase: 'salary expectations', weight: 10 },
          { phrase: 'hourly rate',         weight: 10 },
          { phrase: 'how much do you charge', weight: 10 },
          { phrase: 'what do you charge',  weight: 9 },
          { phrase: 'cost to hire',        weight: 9 }
        ],
        threshold: 3
      },

      /* 20 ── hiring_terry */
      {
        id: 'hiring_terry',
        keywords: [
          { word: 'hire',      weight: 3 },
          { word: 'recruit',   weight: 3 },
          { word: 'onboard',   weight: 3 },
          { word: 'contract',  weight: 2 },
          { word: 'engage',    weight: 2 }
        ],
        phrases: [
          { phrase: 'want to hire',     weight: 10 },
          { phrase: 'need a designer',  weight: 9 },
          { phrase: 'hire terry',       weight: 10 },
          { phrase: 'hire you',         weight: 9 },
          { phrase: 'bring you on',     weight: 8 },
          { phrase: 'looking for a designer', weight: 9 },
          { phrase: 'need a product designer', weight: 10 }
        ],
        threshold: 3
      },

      /* 21 ── pixelbin */
      {
        id: 'pixelbin',
        keywords: [
          { word: 'pixelbin',   weight: 5 },
          { word: 'pixel',      weight: 2 },
          { word: 'image',      weight: 1 },
          { word: 'optimization', weight: 2 },
          { word: 'processing', weight: 1 }
        ],
        phrases: [
          { phrase: 'pixelbin',              weight: 10 },
          { phrase: 'pixel bin',             weight: 9 },
          { phrase: 'image optimization',    weight: 8 },
          { phrase: 'ai image',              weight: 7 },
          { phrase: 'image processing',      weight: 7 }
        ],
        threshold: 4
      },

      /* 22 ── bnpl */
      {
        id: 'bnpl',
        keywords: [
          { word: 'bnpl',      weight: 5 },
          { word: 'fintech',   weight: 3 },
          { word: 'payment',   weight: 2 },
          { word: 'checkout',  weight: 2 },
          { word: 'buy',       weight: 1 },
          { word: 'pay',       weight: 1 },
          { word: 'later',     weight: 1 }
        ],
        phrases: [
          { phrase: 'buy now pay later',  weight: 10 },
          { phrase: 'bnpl',               weight: 10 },
          { phrase: 'payment flow',       weight: 8 },
          { phrase: 'fintech project',    weight: 9 },
          { phrase: 'checkout flow',      weight: 8 }
        ],
        threshold: 4
      },

      /* 23 ── swadesh */
      {
        id: 'swadesh',
        keywords: [
          { word: 'swadesh',    weight: 5 },
          { word: 'components', weight: 2 },
          { word: 'tokens',     weight: 2 }
        ],
        phrases: [
          { phrase: 'swadesh',               weight: 10 },
          { phrase: 'swadesh design system', weight: 10 },
          { phrase: 'design system project', weight: 8 },
          { phrase: '180 components',        weight: 9 }
        ],
        threshold: 4
      },

      /* 24 ── design_systems */
      {
        id: 'design_systems',
        keywords: [
          { word: 'system',      weight: 2 },
          { word: 'systems',     weight: 2 },
          { word: 'component',   weight: 2 },
          { word: 'components',  weight: 2 },
          { word: 'tokens',      weight: 3 },
          { word: 'library',     weight: 2 },
          { word: 'storybook',   weight: 3 }
        ],
        phrases: [
          { phrase: 'design system',        weight: 10 },
          { phrase: 'design systems',       weight: 10 },
          { phrase: 'component library',    weight: 9 },
          { phrase: 'design tokens',        weight: 9 },
          { phrase: 'component architecture', weight: 9 }
        ],
        threshold: 4
      },

      /* 25 ── fynd */
      {
        id: 'fynd',
        keywords: [
          { word: 'fynd',      weight: 5 },
          { word: 'jio',       weight: 4 },
          { word: 'commerce',  weight: 2 },
          { word: 'reliance',  weight: 3 }
        ],
        phrases: [
          { phrase: 'fynd',              weight: 10 },
          { phrase: 'jio commerce',      weight: 10 },
          { phrase: 'jio platform',      weight: 9 },
          { phrase: 'commerce platform', weight: 8 }
        ],
        threshold: 4
      },

      /* 26 ── process */
      {
        id: 'process',
        keywords: [
          { word: 'process',     weight: 3 },
          { word: 'workflow',    weight: 3 },
          { word: 'method',      weight: 2 },
          { word: 'steps',       weight: 2 },
          { word: 'phases',      weight: 2 },
          { word: 'framework',   weight: 2 }
        ],
        phrases: [
          { phrase: 'design process',        weight: 10 },
          { phrase: 'how do you work',       weight: 10 },
          { phrase: 'how do you design',     weight: 9 },
          { phrase: 'your workflow',         weight: 9 },
          { phrase: 'your process',          weight: 9 },
          { phrase: 'how you approach',      weight: 8 },
          { phrase: 'work process',          weight: 9 }
        ],
        threshold: 3
      },

      /* 27 ── leadership */
      {
        id: 'leadership',
        keywords: [
          { word: 'leadership', weight: 3 },
          { word: 'management', weight: 3 },
          { word: 'team',       weight: 2 },
          { word: 'stakeholder', weight: 3 },
          { word: 'lead',       weight: 2 },
          { word: 'leading',    weight: 3 },
          { word: 'manage',     weight: 2 },
          { word: 'mentor',     weight: 3 },
          { word: 'mentoring',  weight: 3 }
        ],
        phrases: [
          { phrase: 'team lead',              weight: 9 },
          { phrase: 'stakeholder management', weight: 10 },
          { phrase: 'cross functional',       weight: 9 },
          { phrase: 'manage a team',          weight: 9 },
          { phrase: 'leadership style',       weight: 10 },
          { phrase: 'lead designers',         weight: 9 }
        ],
        threshold: 3
      },

      /* 28 ── collaboration */
      {
        id: 'collaboration',
        keywords: [
          { word: 'collaboration', weight: 3 },
          { word: 'collaborate',   weight: 3 },
          { word: 'teamwork',      weight: 3 },
          { word: 'together',      weight: 2 },
          { word: 'partnership',   weight: 3 },
          { word: 'engineers',     weight: 2 },
          { word: 'developers',    weight: 2 },
          { word: 'crossfunctional', weight: 3 }
        ],
        phrases: [
          { phrase: 'work with engineers',     weight: 10 },
          { phrase: 'work with developers',    weight: 10 },
          { phrase: 'cross functional',        weight: 9 },
          { phrase: 'work together',           weight: 8 },
          { phrase: 'collaborate with',        weight: 9 },
          { phrase: 'work with others',        weight: 8 }
        ],
        threshold: 3
      },

      /* 29 ── why_terry */
      {
        id: 'why_terry',
        keywords: [
          { word: 'why',        weight: 1 },
          { word: 'different',  weight: 2 },
          { word: 'unique',     weight: 2 },
          { word: 'special',    weight: 2 },
          { word: 'standout',   weight: 3 },
          { word: 'better',     weight: 2 },
          { word: 'best',       weight: 1 },
          { word: 'advantage',  weight: 3 }
        ],
        phrases: [
          { phrase: 'why terry',               weight: 10 },
          { phrase: 'why should i hire',       weight: 10 },
          { phrase: 'what makes you different', weight: 10 },
          { phrase: 'why you',                 weight: 8 },
          { phrase: 'what sets you apart',     weight: 10 },
          { phrase: 'why are you special',     weight: 9 },
          { phrase: 'what makes you unique',   weight: 10 },
          { phrase: 'convince me',             weight: 8 }
        ],
        threshold: 4
      },

      /* 30 ── cuss_words */
      {
        id: 'cuss_words',
        keywords: [
          { word: 'fuck',    weight: 5 },
          { word: 'shit',    weight: 5 },
          { word: 'damn',    weight: 4 },
          { word: 'ass',     weight: 4 },
          { word: 'bitch',   weight: 5 },
          { word: 'crap',    weight: 4 },
          { word: 'hell',    weight: 3 },
          { word: 'dick',    weight: 5 },
          { word: 'bastard', weight: 5 },
          { word: 'idiot',   weight: 4 },
          { word: 'stupid',  weight: 4 },
          { word: 'dumb',    weight: 3 },
          { word: 'suck',    weight: 3 },
          { word: 'sucks',   weight: 4 },
          { word: 'wtf',     weight: 5 },
          { word: 'stfu',    weight: 5 },
          { word: 'lame',    weight: 3 }
        ],
        phrases: [
          { phrase: 'what the hell',   weight: 10 },
          { phrase: 'what the fuck',   weight: 10 },
          { phrase: 'go to hell',      weight: 10 },
          { phrase: 'this sucks',      weight: 8 },
          { phrase: 'you suck',        weight: 10 },
          { phrase: 'fuck off',        weight: 10 },
          { phrase: 'piss off',        weight: 10 },
          { phrase: 'shut up',         weight: 9 }
        ],
        threshold: 3
      },

      /* 31 ── flirting */
      {
        id: 'flirting',
        keywords: [
          { word: 'love',      weight: 2 },
          { word: 'date',      weight: 3 },
          { word: 'marry',     weight: 4 },
          { word: 'cute',      weight: 3 },
          { word: 'handsome',  weight: 3 },
          { word: 'hot',       weight: 2 },
          { word: 'attractive', weight: 3 },
          { word: 'crush',     weight: 3 },
          { word: 'boyfriend', weight: 4 },
          { word: 'girlfriend', weight: 4 },
          { word: 'single',    weight: 3 },
          { word: 'flirt',     weight: 4 },
          { word: 'kiss',      weight: 4 },
          { word: 'sexy',      weight: 4 }
        ],
        phrases: [
          { phrase: 'i love you',      weight: 10 },
          { phrase: 'go on a date',    weight: 10 },
          { phrase: 'marry me',        weight: 10 },
          { phrase: 'are you single',  weight: 10 },
          { phrase: 'you are cute',    weight: 9 },
          { phrase: 'be my',           weight: 8 },
          { phrase: 'have a crush',    weight: 9 }
        ],
        threshold: 3
      },

      /* 32 ── competitor */
      {
        id: 'competitor',
        keywords: [
          { word: 'comparison',  weight: 3 },
          { word: 'compare',     weight: 3 },
          { word: 'versus',      weight: 3 },
          { word: 'vs',          weight: 3 },
          { word: 'competitor',  weight: 3 },
          { word: 'alternative', weight: 2 }
        ],
        phrases: [
          { phrase: 'better than',          weight: 9 },
          { phrase: 'compared to',          weight: 9 },
          { phrase: 'versus other',         weight: 8 },
          { phrase: 'other designers',      weight: 8 },
          { phrase: 'how do you compare',   weight: 10 },
          { phrase: 'are you better',       weight: 9 }
        ],
        threshold: 4
      },

      /* 33 ── age */
      {
        id: 'age',
        keywords: [
          { word: 'age',    weight: 3 },
          { word: 'old',    weight: 2 },
          { word: 'young',  weight: 2 },
          { word: 'born',   weight: 3 },
          { word: 'birthday', weight: 3 }
        ],
        phrases: [
          { phrase: 'how old',          weight: 10 },
          { phrase: 'what age',         weight: 10 },
          { phrase: 'when were you born', weight: 10 },
          { phrase: 'your age',         weight: 9 },
          { phrase: 'your birthday',    weight: 9 }
        ],
        threshold: 4
      },

      /* 34 ── personal */
      {
        id: 'personal',
        keywords: [
          { word: 'personal',     weight: 2 },
          { word: 'family',       weight: 3 },
          { word: 'relationship', weight: 3 },
          { word: 'married',      weight: 3 },
          { word: 'kids',         weight: 3 },
          { word: 'children',     weight: 3 },
          { word: 'wife',         weight: 3 },
          { word: 'husband',      weight: 3 },
          { word: 'parents',      weight: 3 },
          { word: 'religion',     weight: 3 },
          { word: 'political',    weight: 3 }
        ],
        phrases: [
          { phrase: 'personal life',      weight: 10 },
          { phrase: 'are you married',    weight: 10 },
          { phrase: 'do you have kids',   weight: 10 },
          { phrase: 'your family',        weight: 9 },
          { phrase: 'private life',       weight: 9 }
        ],
        threshold: 4
      },

      /* 35 ── joke */
      {
        id: 'joke',
        keywords: [
          { word: 'joke',    weight: 3 },
          { word: 'funny',   weight: 3 },
          { word: 'laugh',   weight: 3 },
          { word: 'humor',   weight: 3 },
          { word: 'humour',  weight: 3 },
          { word: 'comedy',  weight: 3 },
          { word: 'hilarious', weight: 3 }
        ],
        phrases: [
          { phrase: 'tell me a joke',   weight: 10 },
          { phrase: 'make me laugh',    weight: 10 },
          { phrase: 'be funny',         weight: 9 },
          { phrase: 'say something funny', weight: 10 },
          { phrase: 'got any jokes',    weight: 9 },
          { phrase: 'know any jokes',   weight: 9 }
        ],
        threshold: 3
      },

      /* 36 ── compliment_terry */
      {
        id: 'compliment_terry',
        keywords: [
          { word: 'amazing',     weight: 3 },
          { word: 'awesome',     weight: 3 },
          { word: 'great',       weight: 2 },
          { word: 'impressive',  weight: 3 },
          { word: 'incredible',  weight: 3 },
          { word: 'brilliant',   weight: 3 },
          { word: 'wonderful',   weight: 3 },
          { word: 'love',        weight: 1 },
          { word: 'excellent',   weight: 3 },
          { word: 'fantastic',   weight: 3 },
          { word: 'cool',        weight: 2 },
          { word: 'nice',        weight: 2 }
        ],
        phrases: [
          { phrase: 'great portfolio',     weight: 10 },
          { phrase: 'amazing work',        weight: 10 },
          { phrase: 'love your work',      weight: 10 },
          { phrase: 'this is amazing',     weight: 9 },
          { phrase: 'really impressive',   weight: 10 },
          { phrase: 'well done',           weight: 8 },
          { phrase: 'nice work',           weight: 9 },
          { phrase: 'you are amazing',     weight: 10 },
          { phrase: 'love this',           weight: 8 },
          { phrase: 'this is cool',        weight: 8 },
          { phrase: 'this is great',       weight: 8 },
          { phrase: 'love the terminal',   weight: 10 }
        ],
        threshold: 4
      },

      /* 37 ── criticism */
      {
        id: 'criticism',
        keywords: [
          { word: 'bad',          weight: 2 },
          { word: 'terrible',     weight: 3 },
          { word: 'horrible',     weight: 3 },
          { word: 'ugly',         weight: 3 },
          { word: 'boring',       weight: 3 },
          { word: 'overrated',    weight: 3 },
          { word: 'unimpressed',  weight: 3 },
          { word: 'disappointing', weight: 3 },
          { word: 'mediocre',     weight: 3 },
          { word: 'meh',          weight: 3 }
        ],
        phrases: [
          { phrase: 'not impressed',      weight: 10 },
          { phrase: 'bad design',         weight: 10 },
          { phrase: 'this sucks',         weight: 9 },
          { phrase: 'not that good',      weight: 9 },
          { phrase: 'seen better',        weight: 8 },
          { phrase: 'not great',          weight: 8 },
          { phrase: 'could be better',    weight: 8 },
          { phrase: 'pretty basic',       weight: 8 }
        ],
        threshold: 4
      },

      /* 38 ── ai_replace */
      {
        id: 'ai_replace',
        keywords: [
          { word: 'replace',    weight: 2 },
          { word: 'obsolete',   weight: 3 },
          { word: 'automate',   weight: 2 },
          { word: 'automated',  weight: 2 },
          { word: 'redundant',  weight: 3 },
          { word: 'takeover',   weight: 3 }
        ],
        phrases: [
          { phrase: 'ai replace designers',    weight: 10 },
          { phrase: 'ai replace',              weight: 9 },
          { phrase: 'will ai replace',         weight: 10 },
          { phrase: 'replace designers',       weight: 9 },
          { phrase: 'designers obsolete',      weight: 10 },
          { phrase: 'ai take over',            weight: 9 },
          { phrase: 'ai take your job',        weight: 10 },
          { phrase: 'robots replace',          weight: 8 },
          { phrase: 'is design dead',          weight: 9 }
        ],
        threshold: 4
      },

      /* 39 ── work_life */
      {
        id: 'work_life',
        keywords: [
          { word: 'balance',   weight: 3 },
          { word: 'burnout',   weight: 3 },
          { word: 'overwork',  weight: 3 },
          { word: 'overtime',  weight: 3 },
          { word: 'hours',     weight: 2 },
          { word: 'stress',    weight: 3 },
          { word: 'exhausted', weight: 3 },
          { word: 'wellness',  weight: 3 }
        ],
        phrases: [
          { phrase: 'work life balance',    weight: 10 },
          { phrase: 'work life',            weight: 9 },
          { phrase: 'how many hours',       weight: 9 },
          { phrase: 'do you burn out',      weight: 10 },
          { phrase: 'ever get tired',       weight: 8 },
          { phrase: 'long hours',           weight: 8 }
        ],
        threshold: 4
      },

      /* 40 ── advice */
      {
        id: 'advice',
        keywords: [
          { word: 'advice',     weight: 3 },
          { word: 'tips',       weight: 3 },
          { word: 'recommend',  weight: 2 },
          { word: 'suggestion', weight: 2 },
          { word: 'guidance',   weight: 3 },
          { word: 'beginner',   weight: 2 },
          { word: 'junior',     weight: 2 },
          { word: 'starting',   weight: 1 },
          { word: 'learn',      weight: 1 }
        ],
        phrases: [
          { phrase: 'career advice',          weight: 10 },
          { phrase: 'tips for designers',     weight: 10 },
          { phrase: 'advice for',             weight: 9 },
          { phrase: 'how to become',          weight: 9 },
          { phrase: 'how to get into',        weight: 9 },
          { phrase: 'any advice',             weight: 9 },
          { phrase: 'recommend for beginners', weight: 10 },
          { phrase: 'how do i start',         weight: 9 },
          { phrase: 'tips for junior',        weight: 10 }
        ],
        threshold: 3
      }
    ],

    /* -----------------------------------------------------------------------
       11. RESPONSES — Templates keyed by intent ID.
           {variable} placeholders are resolved at runtime by terminal.js.
           A value of null means "delegate to the visual/command renderer."
    ----------------------------------------------------------------------- */
    responses: {

      about: {
        what_is: '{name} is a {role} with {years}+ years shipping products end-to-end. the designer who codes and builds AI systems. {tagline}.',
        who_is: 'that\'s Terry. {role}. six years shipping products. a designer who codes and builds AI systems — doing both at the level where they meet. based in Mumbai, actively looking to move to the UK with visa sponsorship.',
        tell_me: '{name} — six years shipping products end-to-end as a designer who codes and builds AI systems. takes full ownership from concept to production. {tagline}.',
        do_you: 'do I know Terry? I *am* Terry\'s brain. {role}, {years}+ years in the game, ships products from concept to production. the kind of designer who opens DevTools before Figma.',
        default: '{name} — {role}. {tagline}. six years of taking full ownership from concept to production.'
      },

      skills: {
        what_is: 'Terry\'s six capabilities: AI Product Design, Design Systems at Scale, Product Strategy & Research, Platform & Commerce Design, Delivery & Leadership, and Generative Content & Film. not your average Figma-only designer.',
        show_me: null,
        do_you: 'can he code? he built this terminal in vanilla JS. can he design? he shipped Pixelbin\'s entire UX embedded with ML engineers. the stack: {designTools}, {engItems}, plus AI/ML tools like Claude API and fal.ai.',
        tell_me: 'short version: {designTools} for design. {engItems} for code. Python, Claude API, fal.ai for AI. but the real skill? knowing when to use which. type \'skills\' for the visual breakdown.',
        default: '{tagline}. design tools: {designTools}. code: {engItems}. AI: Python, Claude API, fal.ai. type \'skills\' for the visual breakdown.'
      },

      experience: {
        what_is: '{years}+ years across product design and engineering. currently a {role} leading AI-driven product design at Pixelbin, embedded with ML engineers.',
        tell_me: 'the career arc: started as a product designer at Fynd, grew into commerce and fintech by 2021, now leads AI-driven design at Pixelbin. the whole time: shipping end-to-end, concept to production.',
        how_long: '{years}+ years. started at Fynd, built commerce and fintech products, now leading AI product design at Pixelbin. every role: full ownership, no handoff excuses.',
        how_does: 'Terry doesn\'t just hand things off. he replaced a 3-person design+dev workflow solo on a fintech product. that\'s how {years}+ years works when you actually build what you design.',
        default: '{years}+ years of product design and engineering. type \'experience\' for the full timeline.'
      },

      projects: {
        what_is: 'three big ones: Pixelbin (AI product design, ~60% reduction in manual processing), BNPL at Scale (fintech, 0 to 1 in under 4 months), and Swadesh Design System (180+ components, 4 product squads).',
        show_me: null,
        tell_me: 'the highlight reel: led Pixelbin\'s end-to-end UX with ML engineers. shipped a BNPL product in under 4 months across 5+ merchant flows. built Swadesh — 180+ components, ~35% faster handoff. type \'projects\' for details.',
        default: 'Pixelbin, BNPL at Scale, Swadesh Design System, and First Take (AI films). type \'projects\' to explore each one.'
      },

      contact: {
        what_is: 'email: {email} | LinkedIn: {linkedin} | Twitter: x.com/UXZeldman | Instagram: instagram.com/ux.zeldman/',
        how_to: 'fastest route: email {email}. for the professional stalking: {linkedin}. for the hot takes: x.com/UXZeldman.',
        show_me: null,
        default: 'reach Terry at {email} or on LinkedIn ({linkedin}). type \'contact\' for all links.'
      },

      resume: {
        what_is: 'Terry\'s resume is ready for you. it covers {years}+ years of product design and engineering across AI, commerce, and fintech.',
        show_me: 'opening it up. one page of receipts.',
        tell_me: 'the resume covers Pixelbin, BNPL at Scale, Swadesh Design System, and more. {years}+ years, one page.',
        default: 'grab Terry\'s resume — type \'resume\' and it\'ll open in a new tab.'
      },

      philosophy: {
        what_is: 'two quotes that sum it up: "Most designers stop at the handoff. I stay until it ships." and "Process follows the problem. I don\'t bring a methodology. I bring judgment."',
        tell_me: 'Terry\'s principles: design and engineering are one discipline. process follows the problem. accessibility is a requirement. and the best interface is the one that disappears. no dogma, just judgment.',
        how_does: 'no fixed methodology. Terry reads the problem first, then decides the approach. sometimes that\'s deep research, sometimes it\'s shipping a prototype in two days to learn faster.',
        default: '"Process follows the problem." type \'philosophy\' for the full breakdown.'
      },

      availability: {
        what_is: 'Terry is currently open to senior product design roles, with a focus on the UK with visa sponsorship. also available for projects.',
        do_you: 'yes — open and looking. senior product design roles, ideally in the UK with visa sponsorship. also available for standalone projects.',
        default: 'currently available for senior roles and projects. based in Mumbai, India — actively looking to move to the UK with visa sponsorship. type \'contact\' to start a conversation.'
      },

      location: {
        what_is: 'based in Mumbai, India. open to UK roles with visa sponsorship. also open to remote and hybrid setups.',
        where: 'currently based in Mumbai, India. actively looking at UK opportunities — open to visa sponsorship, relocation, remote, or hybrid.',
        tell_me: 'Mumbai is home base. but Terry\'s looking at the UK for the next chapter. open to visa sponsorship. remote works too.',
        default: 'based in Mumbai, India. open to UK roles with visa sponsorship. type \'contact\' to discuss.'
      },

      ai_work: {
        what_is: 'Terry designs AI-powered product experiences. at Pixelbin, he led end-to-end UX embedded with ML engineers — that\'s not "AI adjacent," that\'s in the room where it happens. AI/ML UX, Generative Interfaces, Prompt UX, Workflow Design.',
        tell_me: 'AI is the main event. Terry\'s work at Pixelbin cut manual processing time by ~60% through AI-powered image optimization. he designs LLM-powered features, builds AI integrations, and makes AI films on the side.',
        do_you: 'does Terry do AI? he\'s embedded with ML engineers at Pixelbin, designs generative interfaces, and makes short films using Kling v3 Pro, Seedance 2.0, and Veo 3.1. so yes.',
        default: 'AI is central to Terry\'s work — from Pixelbin\'s ML-driven UX to First Take AI films. type \'projects\' for case studies, or visit /first-take/ for the creative side.'
      },

      design_tools: {
        what_is: 'primary: Figma for everything UI/UX. Framer and Principle for prototyping. Adobe Suite for visual assets. but the real tool is judgment — knowing what to use when.',
        do_you: 'Figma is the daily driver. but Terry also uses Framer for interactive prototypes, Principle for micro-interactions, and occasionally Adobe Suite. the tool doesn\'t make the designer.',
        tell_me: 'Figma, Framer, Principle, Adobe Suite. for AI film work: fal.ai, Kling v3 Pro, Seedance 2.0, Veo 3.1, and more. Terry picks the tool that fits the problem, not the one that\'s trending.',
        default: 'Figma, Framer, Principle, Adobe Suite. type \'skills\' for the full toolkit.'
      },

      frontend: {
        what_is: 'Terry codes. HTML/CSS, JavaScript, React, TypeScript. he built this entire terminal in vanilla JS — no React, no frameworks, no build step. the tagline is real: the product designer who actually engineers.',
        do_you: 'absolutely. this terminal you\'re typing into? vanilla JavaScript. no framework. no build step. Terry ships production code because he got tired of waiting for developers to build his designs.',
        tell_me: '{years}+ years of frontend experience. HTML/CSS, JavaScript, React, TypeScript. he doesn\'t just prototype — he ships production code. replaced a 3-person design+dev workflow on a fintech product. solo.',
        default: 'Terry writes production frontend code. type \'skills\' for the full breakdown, or just look around — this terminal is his code.'
      },

      first_take: {
        what_is: 'First Take is Terry\'s AI filmmaking project. "The filmmaker who actually directs machines." short films and visual experiments using Kling v3 Pro, Seedance 2.0, Veo 3.1, Sora 2, PixVerse V6, Wan 2.2, and LTX Video 13B.',
        tell_me: 'each First Take film goes through 200-400 AI generations. Terry uses fal.ai, generative pipelines, model chaining, and prompt direction to create films about liminal spaces, memory textures, and uncanny beauty. it\'s filmmaking, just with machines as collaborators.',
        show_me: 'head over to /first-take/ to see the collection. or type \'go first-take\' to navigate there.',
        do_you: 'Terry is an AI filmmaker. Kling v3 Pro, Seedance 2.0, Veo 3.1 — he uses seven different AI video models. each film: 200-400 generations, generative pipelines, prompt direction. visit /first-take/ to see for yourself.',
        default: 'First Take — AI filmmaking experiments. liminal spaces, memory textures, uncanny beauty. visit /first-take/ to explore.'
      },

      fun_facts: {
        what_is: 'here\'s one: {randomFact}',
        tell_me: '{randomFact}',
        show_me: null,
        default: '{randomFact} — want another? just ask again.'
      },

      greeting: {
        default: 'hey! welcome to TerryOS. I\'m Terry\'s terminal brain — ask me anything about his work, skills, or projects. or type \'help\' if you like structure.'
      },

      farewell: {
        default: 'later! if you need anything, Terry\'s at terryjohnpaul20@gmail.com. go build something great.'
      },

      gratitude: {
        default: 'glad I could help. there\'s more to discover — try asking about projects, first take, or just throw a random question at me.'
      },

      help_request: {
        default: 'here\'s what you can do:\n- type \'about\', \'skills\', \'projects\', \'experience\' for quick info\n- type \'contact\' or \'resume\' to get in touch\n- type \'philosophy\' or \'fun-facts\' for more depth\n- ask about Pixelbin, BNPL, Swadesh, or First Take for specific projects\n- or just ask a natural question — I\'ll figure it out.'
      },

      salary: {
        what_is: 'I don\'t do numbers in public. but Terry is open to conversations about roles and compensation that match six years of shipping real products. type \'contact\' to start that conversation.',
        how_does: 'salary? that\'s a conversation, not a terminal command. Terry\'s open to fair compensation for someone who does both design and engineering at a senior level. reach out via \'contact\'.',
        default: 'I don\'t discuss specific numbers here. but for someone who replaced a 3-person workflow solo and shipped BNPL in under 4 months — the value conversation is worth having. type \'contact\' to connect.'
      },

      hiring_terry: {
        what_is: 'you want to hire Terry? smart move. he\'s currently available for senior product design roles and projects. best way forward: email {email} or connect on {linkedin}.',
        do_you: 'yes, Terry is available. and if you\'re looking for someone who designs AND engineers, who stays until it ships, who\'s led AI product design embedded with ML engineers — you\'re in the right terminal.',
        tell_me: 'here\'s the hiring pitch: six years of shipping end-to-end. Pixelbin, BNPL, Swadesh. design + code + AI. currently seeking UK roles with visa sponsorship. type \'contact\' to make it happen.',
        default: 'Terry is available for hire. type \'contact\' to reach out, or \'resume\' to see the full picture.'
      },

      pixelbin: {
        what_is: 'Pixelbin is an AI-powered image optimization platform. Terry led the end-to-end UX embedded with ML engineers. result: ~60% reduction in manual processing time, adopted across 3 continents.',
        tell_me: 'Pixelbin was the real deal. Terry wasn\'t just designing screens — he was embedded with ML engineers, shaping the AI product from concept to production. the platform cut manual image processing time by ~60% and went global across 3 continents.',
        how_does: 'Pixelbin uses AI/ML to automate image optimization at scale. Terry designed the entire UX — generative interfaces, workflow design, prompt UX — all while sitting next to the ML engineers building the models.',
        default: 'Pixelbin: AI-powered image optimization. ~60% reduction in manual processing. adopted across 3 continents. Terry led end-to-end UX embedded with ML engineers.'
      },

      bnpl: {
        what_is: 'BNPL at Scale — Terry\'s fintech project. a Buy Now Pay Later product shipped from 0 to 1 in under 4 months, integrated across 5+ merchant flows. delivered the lowest drop-off rate on any payment flow at Fynd.',
        tell_me: 'this one\'s a flex. Terry shipped a full BNPL product in under 4 months. integrated across 5+ merchant flows. delivered the lowest drop-off rate on any payment flow at Fynd. and he replaced a 3-person design+dev workflow in the process. solo.',
        how_does: 'how do you ship BNPL in 4 months? you own the whole thing. Terry designed the checkout flows, the merchant tooling, the entire UX — and wrote code when the dev team needed help. that\'s how you get the lowest drop-off rate.',
        default: 'BNPL at Scale: fintech, 0 to 1 in under 4 months, 5+ merchant integrations, lowest drop-off rate at Fynd.'
      },

      swadesh: {
        what_is: 'Swadesh is the design system Terry built for Jio Commerce Platform. 180+ components, adopted by 4 product squads, with ~35% faster design-to-dev handoff.',
        tell_me: 'Swadesh Design System — 180+ components, design tokens, WCAG accessibility baked in, adopted by 4 product squads. it cut design-to-dev handoff time by ~35%. Terry built the component architecture and documentation from scratch.',
        how_does: 'Swadesh works through component architecture, design tokens, and proper documentation. Terry designed it for scale — 4 product squads use it daily. WCAG accessibility isn\'t bolted on, it\'s foundational.',
        default: 'Swadesh Design System: 180+ components, 4 product squads, ~35% faster handoff. built for Jio Commerce Platform.'
      },

      design_systems: {
        what_is: 'Terry built Swadesh — 180+ components adopted by 4 product squads with ~35% faster handoff. he knows design systems from component architecture to design tokens to WCAG accessibility to developer handoff.',
        tell_me: 'design systems are a core competency. Terry built Swadesh for Jio Commerce Platform from scratch: component architecture, design tokens, WCAG accessibility, documentation, developer handoff. 180+ components, 4 squads, ~35% faster.',
        do_you: 'design systems? Terry built Swadesh — the design system powering Jio Commerce Platform. 180+ components. 4 product squads. ~35% faster design-to-dev handoff. he doesn\'t just use design systems, he builds them.',
        default: 'design systems are one of Terry\'s core strengths. check out Swadesh — 180+ components, built for Jio Commerce. ask about \'swadesh\' for the deep dive.'
      },

      fynd: {
        what_is: 'Fynd is where Terry\'s career leveled up. he went from product designer to senior product designer there, working on Jio Commerce Platform, Pixelbin, the BNPL product, and the Swadesh design system.',
        tell_me: 'Fynd / Jio Commerce is where Terry did his most impactful work. built the design system powering the commerce platform (Swadesh). shipped BNPL from 0 to 1. led Pixelbin\'s AI-driven UX. delivered the lowest drop-off rate on any payment flow.',
        how_does: 'Fynd is a commerce and technology company that powers Jio Commerce. Terry worked across multiple product lines there — Pixelbin, BNPL, the commerce platform, and built the Swadesh design system from the ground up.',
        default: 'Fynd / Jio Commerce: where Terry built Pixelbin, BNPL, and Swadesh. type the project name for details on any of those.'
      },

      process: {
        what_is: '"Process follows the problem." Terry doesn\'t bring a fixed methodology. he reads the problem, then decides the approach. sometimes deep research. sometimes ship a prototype in two days.',
        tell_me: 'Terry\'s process: understand the real problem first. define and scope ruthlessly. design with high fidelity early. build working prototypes (not just mockups). ship and measure everything. repeat.',
        how_does: 'it depends on the problem. for Pixelbin, it was embedding with ML engineers and iterating alongside model development. for BNPL, it was sprinting to 0-to-1 in 4 months. for Swadesh, it was systematic component architecture. the process serves the problem.',
        default: '"Process follows the problem. I don\'t bring a methodology. I bring judgment." — that\'s the whole philosophy.'
      },

      leadership: {
        what_is: 'Terry leads through ownership. stakeholder management, sprint delivery, engineering handoff, async documentation, cross-functional leadership. but the real leadership move? staying until it ships.',
        tell_me: 'leadership for Terry means: own the outcome, not just the output. he\'s managed stakeholders, led sprint delivery, documented async workflows, and driven cross-functional alignment across engineering, product, and design.',
        do_you: 'Terry leads design initiatives and collaborates cross-functionally with engineering, product, and stakeholders. at Pixelbin, he was embedded with ML engineers. at Fynd, his BNPL work aligned 5+ merchant teams.',
        default: 'stakeholder management, cross-functional leadership, sprint delivery, and full ownership. the kind of leadership that ships products, not just presentations.'
      },

      collaboration: {
        what_is: 'Terry doesn\'t hand things off and disappear. at Pixelbin, he was embedded with ML engineers. on BNPL, he worked across 5+ merchant teams. he writes code alongside developers because he speaks both languages.',
        tell_me: 'collaboration for Terry means being in the room. not the designer who sends a Figma link and waits. embedded with ML engineers at Pixelbin. working alongside 5+ merchant teams on BNPL. writing code with developers on Swadesh.',
        do_you: 'Terry collaborates by removing the wall between design and engineering. he codes, so engineers trust him. he designs with real constraints, so product trusts him. he stays until it ships, so everyone trusts him.',
        default: 'Terry\'s collaboration style: embed, don\'t hand off. speak both design and engineering. stay until it ships.'
      },

      why_terry: {
        what_is: 'why Terry? because most designers stop at the handoff. Terry stays until it ships. he does both design and engineering at the level where they meet. six years of receipts: Pixelbin, BNPL, Swadesh.',
        tell_me: 'here\'s the pitch: Terry replaced a 3-person design+dev workflow on a fintech product. shipped a full BNPL product in under 4 months. built a 180+ component design system. led AI product design embedded with ML engineers. the tagline writes itself.',
        do_you: 'what makes Terry different? he\'s a designer who actually engineers. not "I can kinda code" — he built this terminal from scratch in vanilla JS. he doesn\'t just design solutions, he ships them. {years}+ years of proof.',
        how_does: 'what sets Terry apart: he takes full ownership from concept to production. he designs AND engineers. he replaced a 3-person workflow solo. he delivered the lowest drop-off rate at Fynd. he doesn\'t need a methodology — he brings judgment.',
        default: '{tagline}. six years of shipping. design + code + AI. receipts: Pixelbin, BNPL, Swadesh. type \'projects\' for the evidence.'
      },

      cuss_words: {
        default: 'whoa, easy there. Terry\'s terminal runs on good vibes and clean code. try channeling that energy into asking about projects or skills instead.'
      },

      flirting: {
        default: 'flattering, truly. but this terminal is strictly professional. well... mostly professional. try asking about Terry\'s work instead — that\'s where the real charm is.'
      },

      competitor: {
        what_is: 'Terry doesn\'t compare himself to other designers. he competes with his last project. but if you\'re asking what\'s different — most designers don\'t ship production code. most engineers don\'t lead design systems. Terry does both.',
        tell_me: 'comparison is the thief of good design. but here\'s the differentiator: Terry doesn\'t just design — he engineers. he doesn\'t just prototype — he ships. he doesn\'t just hand off — he stays until it\'s live. that\'s the gap.',
        default: 'the comparison game? not Terry\'s style. but the receipts speak: Pixelbin, BNPL in 4 months, Swadesh at scale. type \'why_terry\' if you want the real pitch.'
      },

      age: {
        what_is: 'old enough to have {years}+ years of shipping real products. young enough to still think dark mode should be the default for everything.',
        tell_me: 'age is just a number. {years}+ years of professional experience is the number that matters. Terry\'s been shipping since 2019 and hasn\'t slowed down.',
        default: 'let\'s keep the mystery alive. but {years}+ years of shipping products — that\'s the number that counts.'
      },

      personal: {
        what_is: 'outside of work, Terry is at the gym, making AI films, or drinking way too much black coffee in Mumbai. fitness and filmmaking keep the creative engine running.',
        tell_me: 'here\'s the non-work Terry: gym regular who treats progressive overload like product iteration. AI filmmaker who pushes 200-400 generations per film. based in Mumbai. fueled by black coffee and deadlifts.',
        default: 'Terry\'s life outside the pixel grid: gym sessions, AI filmmaking experiments, exploring Mumbai, and enough black coffee to concern a doctor. type \'fun-facts\' for more random bits.'
      },

      joke: {
        default: 'a designer, a developer, and a PM walk into a sprint planning meeting. they emerge three hours later with zero story points and a "let\'s circle back."'
      },

      compliment_terry: {
        default: 'hey, Terry appreciates that. seriously. building this portfolio (and this terminal) was a labor of love. glad it landed. now go explore — there\'s more where that came from.'
      },

      criticism: {
        what_is: 'fair enough — feedback is fuel. but before you judge, have you checked out the case studies? Pixelbin, BNPL, Swadesh — the receipts are real. type \'projects\' to take a look.',
        tell_me: 'noted. Terry\'s a big believer in iteration — everything gets better with honest feedback. but also... this terminal was built in vanilla JS with zero frameworks. give it a little credit.',
        default: 'tough crowd. I respect the honesty though. Terry iterates on everything — this portfolio included. got specific feedback? shoot it to {email}.'
      },

      ai_replace: {
        what_is: 'will AI replace designers? AI can generate UI. it can\'t decide what problem to solve, who to solve it for, or whether the solution actually works. Terry designs AI products — he knows exactly where the line is.',
        tell_me: 'Terry makes AI films. he designs AI products. he uses AI tools daily. and he\'ll tell you: AI is a tool, not a replacement. it can generate 400 frames — but someone has to decide which one is art. that\'s the human part.',
        do_you: 'is Terry worried? no. he\'s the designer who actually engineers AND works with AI. he\'s not competing with AI — he\'s directing it. check out /first-take/ to see him directing machines to make films.',
        default: 'AI replaces tasks, not judgment. Terry designs AI products and makes AI films — he knows the difference between generation and direction. the future belongs to designers who can direct machines.'
      },

      work_life: {
        what_is: 'Terry ships fast but he\'s not a grind-culture poster child. he works smart — that\'s how you ship BNPL in 4 months without burning out. efficiency > hours.',
        tell_me: 'the trick isn\'t working more hours. it\'s eliminating waste. Terry replaced a 3-person workflow — not by working 3x harder, but by doing design and engineering as one continuous flow. that\'s the balance.',
        default: 'work-life balance is designing the process to be efficient, not heroic. Terry ships fast because he eliminates the handoff gap — not because he doesn\'t sleep.'
      },

      advice: {
        what_is: 'Terry\'s advice for designers: learn to code. not because you have to — but because understanding the medium makes you better at designing for it. also: ship things. portfolios of concepts don\'t count.',
        tell_me: 'a few things Terry would tell his younger self: 1) learn enough code to be dangerous. 2) ship real things, not concepts. 3) process follows the problem — don\'t marry a methodology. 4) stay until it ships. that\'s where the learning happens.',
        do_you: 'best advice? stop waiting for permission to build. Terry learned to code because he got tired of waiting for devs. he started making AI films because he was curious. the best career moves come from building, not planning.',
        default: 'Terry\'s advice: learn to code, ship real things, don\'t marry a methodology, and always stay until it ships. that\'s the whole playbook.'
      }
    },

    /* -----------------------------------------------------------------------
       12. POOLS — Variation arrays & follow-up suggestions
    ----------------------------------------------------------------------- */
    pools: {

      greeting: [
        'hey! welcome to TerryOS. ask me anything about Terry\'s work, or type \'help\' to see what I can do.',
        'hi there! I know way too much about Terry\'s career. try me.',
        'hello! I\'m the brain behind Terry\'s terminal. ask about skills, projects, or just poke around.',
        'welcome! type \'help\' for commands, or just ask me anything. I don\'t judge.',
        'yo! TerryOS online. ask me about Pixelbin, BNPL, AI films, or literally anything about Terry.',
        'hey there! I\'m TerryOS — your guide to everything Terry. what do you want to know?',
        'welcome in! ask me about skills, projects, experience, or just say hi. I\'m easy.',
        'greetings, human. I\'ve been expecting you. type \'help\' or just start asking questions about Terry.'
      ],

      unknown: [
        'hmm, that one\'s outside my training data. try asking about Terry\'s skills, projects, or experience.',
        'I\'m not sure about that, but I know a lot about Pixelbin, BNPL, Swadesh, and AI films. try one of those.',
        'that stumped me. try \'help\' for commands, or ask about Terry\'s background. I\'m better at that.',
        'I\'m a specialist, not a generalist. my expertise: everything Terry. try: skills, projects, experience.',
        'not in my knowledge base. but ask me about Terry\'s work and I\'ll talk your ear off. try \'projects\' or \'about\'.',
        'I\'m drawing a blank on that one. but I\'ve got strong opinions about Pixelbin, BNPL, and Swadesh. ask away.',
        'that\'s above my pay grade. but type \'help\' and I\'ll show you what I do know — which is a lot about Terry.',
        'no data on that. but ask me about Terry\'s AI films, design systems, or fintech work and watch me light up.'
      ],

      followUpSuggestions: {
        about: 'you might also ask about: skills, projects, or philosophy',
        skills: 'try: \'projects\' to see the work in action, or ask about experience',
        projects: 'interested? type \'contact\' or ask about a specific project: pixelbin, bnpl, swadesh',
        experience: 'ask about: skills, projects, or design philosophy',
        contact: 'while you\'re here, check out: projects, skills, or fun-facts',
        philosophy: 'see it in action: ask about projects, process, or why terry',
        ai_work: 'check out: /first-take/ for AI creative work, or ask about pixelbin',
        fun_facts: 'want more? try: about, skills, or projects',
        resume: 'also try: experience, skills, or contact',
        first_take: 'related: ai work, projects, or fun-facts',
        design_tools: 'also see: skills, projects, or frontend',
        frontend: 'related: skills, projects, or design tools',
        availability: 'next steps: contact, resume, or projects',
        location: 'also ask about: availability, contact, or experience',
        greeting: 'try asking about: skills, projects, experience, or just say \'help\'',
        help_request: 'popular: about, skills, projects, experience, contact',
        salary: 'ready to talk? type \'contact\' to reach Terry',
        hiring_terry: 'next steps: contact, resume, or explore projects first',
        pixelbin: 'related: ai work, swadesh, or bnpl',
        bnpl: 'related: fynd, swadesh, or projects',
        swadesh: 'related: design systems, fynd, or projects',
        design_systems: 'related: swadesh, skills, or frontend',
        fynd: 'related: pixelbin, bnpl, swadesh, or projects',
        process: 'see it in practice: ask about pixelbin, bnpl, or swadesh',
        leadership: 'related: collaboration, experience, or why terry',
        collaboration: 'related: leadership, process, or experience',
        why_terry: 'convinced? type \'contact\' or \'resume\'',
        cuss_words: 'let\'s try again. ask about: skills, projects, or about',
        flirting: 'how about we talk about: skills, projects, or experience instead?',
        competitor: 'see the receipts: projects, pixelbin, bnpl, or swadesh',
        age: 'more useful questions: skills, experience, or projects',
        personal: 'try instead: about, fun-facts, or first take',
        joke: 'for the serious stuff: about, skills, projects',
        compliment_terry: 'keep exploring: projects, first take, or skills',
        criticism: 'see the work first: projects, pixelbin, bnpl, or swadesh',
        ai_replace: 'see how Terry directs machines: first take, or ask about ai work',
        work_life: 'related: process, philosophy, or advice',
        advice: 'see it in practice: projects, experience, or skills',
        farewell: '',
        gratitude: 'keep exploring: projects, first take, or skills'
      },

      deepDive: {
        about: 'Terry John Paul — six years shipping products end-to-end as a designer who codes and builds AI systems. based in Mumbai, India — actively looking to move to the UK with visa sponsorship. the tagline is real: "the product designer who actually engineers." he doesn\'t just design the thing and hand it off. he stays in the codebase until it ships. Pixelbin, BNPL, Swadesh — every major project: full ownership, concept to production.',
        skills: 'beyond the usual stack: Terry has six capability areas. AI Product Design (generative interfaces, prompt UX, workflow design). Design Systems at Scale (180+ components with Swadesh). Product Strategy & Research (JTBD, IA, usability testing). Platform & Commerce Design (checkout flows, merchant tooling). Delivery & Leadership (stakeholder management, agile, sprint delivery). And Generative Content & Film (AI filmmaking with fal.ai, Kling v3, Seedance, Veo).',
        projects: 'the big three: Pixelbin — AI image optimization, ~60% reduction in manual processing, adopted across 3 continents. BNPL at Scale — fintech 0-to-1 in under 4 months, 5+ merchant integrations, lowest drop-off rate at Fynd. Swadesh Design System — 180+ components, 4 product squads, ~35% faster handoff. plus First Take — AI films using seven different video models.',
        experience: 'career arc: started at Fynd in 2019 as a product designer. built commerce and e-commerce UX, checkout flows, merchant tooling. moved into fintech by 2021 — shipped BNPL, built the Swadesh design system. by 2022, leading AI product design at Pixelbin, embedded with ML engineers. every role: full ownership from concept to production.',
        contact: 'best ways to reach Terry: email at terryjohnpaul20@gmail.com, LinkedIn at linkedin.com/in/terryjohnpaul/, Twitter/X at @UXZeldman, Instagram at @ux.zeldman. he\'s currently open to senior product design roles and projects, especially in the UK.',
        philosophy: 'Terry\'s philosophy in full: "Most designers stop at the handoff. I stay until it ships." and "Process follows the problem. I don\'t bring a methodology. I bring judgment." his five principles: design and engineering are one discipline. process follows the problem. accessibility is a requirement. the best interface disappears. and measure everything, assume nothing.',
        ai_work: 'Terry\'s AI work spans two worlds. professionally: AI product design at Pixelbin, embedded with ML engineers, designing generative interfaces and prompt UX. creatively: First Take — AI filmmaking using Kling v3 Pro, Seedance 2.0, Veo 3.1, Sora 2, PixVerse V6, Wan 2.2, and LTX Video 13B. each film goes through 200-400 generations. he uses fal.ai, generative pipelines, model chaining, and prompt direction.',
        fun_facts: 'some extras: Terry replaced a 3-person design+dev workflow on a fintech product. solo. he built this terminal in vanilla JS — no frameworks. he names every Figma layer properly. he can spot a 1px misalignment from across the room. his AI films go through 200-400 generations each. and yes, he has debugged CSS in his dreams.',
        frontend: 'Terry doesn\'t just prototype — he ships production code. this entire terminal? vanilla JavaScript. no React, no framework, no build step. he learned to code because he got tired of waiting for developers to build his designs. the result: he replaced a 3-person design+dev workflow on a fintech product. when he says "the product designer who actually engineers" — this is what he means.',
        design_tools: 'Figma is the daily driver for UI/UX — every layer named, every component organized. Framer for interactive prototypes that feel like the real thing. Principle for micro-interactions and motion design. Adobe Suite when visual assets need heavy lifting. for AI work: fal.ai, Kling v3 Pro, Seedance 2.0, Veo 3.1, and more. the philosophy: use the tool that fits the problem.',
        first_take: 'First Take is where Terry becomes "the filmmaker who actually directs machines." he makes short films and visual experiments using seven AI video models: Kling v3 Pro, Seedance 2.0, Veo 3.1, Sora 2, PixVerse V6, Wan 2.2, LTX Video 13B. each film goes through 200-400 generations. the pipeline: fal.ai for infrastructure, generative pipelines, AI animation, prompt direction, Freepik Spaces, model chaining. the themes: liminal spaces, memory textures, uncanny beauty.',
        availability: 'Terry is currently open to senior product design roles. primary target: UK with visa sponsorship. also available for standalone projects and contracts. he\'s looking for teams that don\'t silo design and engineering — where someone who does both is valued, not confused.',
        resume: 'Terry\'s resume covers six years of product design and engineering. highlights: led Pixelbin\'s AI product UX (60% reduction in manual processing). shipped BNPL 0-to-1 in 4 months. built Swadesh (180+ components, 4 squads). the resume is one page because the work speaks louder.',
        pixelbin: 'Pixelbin deep dive: AI-powered image optimization platform where Terry led end-to-end UX. he was embedded with ML engineers — not in a meeting room reviewing designs, but in the code, shaping how AI models interact with users. result: ~60% reduction in manual image processing time. the platform was adopted across 3 continents. this is what "AI Product Design" means when it\'s not just a buzzword.',
        bnpl: 'BNPL deep dive: Terry shipped a complete Buy Now Pay Later product from 0 to 1 in under 4 months. integrated across 5+ merchant flows at Fynd. delivered the lowest drop-off rate on any payment flow in the company. and here\'s the kicker: he replaced a 3-person design+dev workflow in the process. one person doing design, frontend, and coordination.',
        swadesh: 'Swadesh deep dive: the design system powering Jio Commerce Platform. Terry built it from the ground up — component architecture, design tokens, WCAG accessibility, comprehensive documentation, developer handoff workflows. 180+ components, adopted by 4 product squads, with ~35% faster design-to-dev handoff. it\'s not just a Figma library — it\'s an operational system.',
        fynd: 'Fynd is a commerce and technology company that powers Jio Commerce Platform (Reliance). Terry spent his career here, growing from product designer to senior product designer. key outputs: Pixelbin (AI product design), BNPL at Scale (fintech), Swadesh Design System (180+ components), and commerce platform UX. every major product line at Fynd has Terry\'s fingerprints on it.',
        process: 'Terry\'s process in practice: for Pixelbin (AI), he embedded with ML engineers and iterated alongside model development — research happened in the code, not just in user interviews. for BNPL (fintech), he sprinted hard — 0 to 1 in 4 months meant high-fidelity design from day one and shipping weekly. for Swadesh (design system), he was systematic — component audits, token architecture, documentation-first. the process always serves the problem.',
        leadership: 'Terry\'s leadership style: own the outcome. at Pixelbin, he embedded with ML engineers and drove design decisions in real-time. at Fynd, he managed stakeholder expectations across engineering, product, and business while shipping BNPL across 5+ merchant teams. he documents async, delivers in sprints, and never lets a project die in a Figma file.',
        collaboration: 'Terry collaborates by removing the handoff wall. at Pixelbin, he sat with ML engineers daily — not reviewing, participating. on BNPL, he coordinated across 5+ merchant teams and wrote frontend code alongside developers. on Swadesh, he built the design system that both designers and developers use. speaking both languages isn\'t a nice-to-have — it\'s his whole operating model.'
      },

      cussResponses: [
        'whoa there. this terminal runs on good vibes and clean code. let\'s redirect that energy — try \'projects\' or \'skills\'.',
        'language! I\'m a family-friendly terminal. well, mostly. ask me something about Terry\'s work instead.',
        'I\'ve been called worse by error logs. but seriously — try asking about Pixelbin, BNPL, or Swadesh.',
        'ouch. my circuits felt that. but I forgive you. now ask me something useful — like what makes Terry\'s work different.',
        'strong words. but you know what\'s stronger? shipping a BNPL product in under 4 months. ask me about it.',
        'noted. filed under /dev/null. want to try a more productive conversation? type \'help\'.',
        'I don\'t have feelings, but if I did, they\'d be mildly amused. try asking about Terry\'s skills instead.',
        'that\'s the kind of energy you bring to a sprint retrospective, isn\'t it? try \'about\' or \'projects\' — I promise it\'s more fun.'
      ],

      flirtResponses: [
        'flattering, truly. but this terminal\'s love language is clean code and good typography. try asking about Terry\'s work instead.',
        'I appreciate the charm, but I\'m committed to my one true love: well-structured Figma files. ask me about skills or projects?',
        'smooth. but Terry built me to talk about portfolios, not romance. though if you want a love story, ask about the BNPL project — it was intense.',
        'I\'m blushing in hexadecimal. but let\'s keep this professional. ask me about Terry\'s experience or projects.',
        'that\'s sweet, but I\'m a terminal widget with commitment issues. I can only commit to answering questions about Terry\'s work.',
        'you\'re cute, but this relationship only works if you type \'projects\' or \'skills\'. that\'s my love language.'
      ],

      jokeResponses: [
        'why do designers make terrible comedians? because they keep iterating on the punchline until it\'s no longer funny.',
        'how many designers does it take to change a lightbulb? "does it have to be a lightbulb? let\'s explore the problem space."',
        'a PM asks a designer: "can you make the logo bigger?" the designer: "can you make the deadline longer?"',
        'what\'s a designer\'s favorite meal? a component library. it\'s reusable and scales well.',
        'why did the designer cross the road? to get to the other padding.',
        'what do you call a designer who can code? employed. (that\'s actually Terry.)',
        'how do you comfort a JavaScript developer? "it\'s not your fault — it\'s undefined."',
        'I told my PM I needed more whitespace. they gave me a bigger monitor.',
        'a frontend dev and a designer walk into a bar. the designer says "we need to redesign the bar." the dev says "don\'t touch my code."',
        'why do product designers love dark mode? because they\'ve seen enough of the light during stakeholder meetings.'
      ]
    }

  };

})();
