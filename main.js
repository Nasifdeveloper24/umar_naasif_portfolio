/**
 * UMAR NAASIF — UI/UX DESIGNER PORTFOLIO
 * Designer-First Core Interactions, 8px Grid Engine & Figma Prototype Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initGridOverlay();
  initPrototypeStudio();
  initWireframeToggle();
  initCaseStudyModal();
  initClipboard();
});

/* --- NAVBAR & SCROLLSPY --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 140;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* --- 8PX MATHEMATICAL GRID OVERLAY SYSTEM --- */
function initGridOverlay() {
  const gridToggle = document.getElementById('gridOverlayToggle');
  const gridStateDot = document.querySelector('.grid-state-dot');

  if (!gridToggle) return;

  gridToggle.addEventListener('click', () => {
    document.body.classList.toggle('grid-active');
    const isActive = document.body.classList.contains('grid-active');
    
    if (isActive) {
      gridToggle.classList.add('active');
      gridToggle.setAttribute('title', '8px Grid: Active');
    } else {
      gridToggle.classList.remove('active');
      gridToggle.setAttribute('title', '8px Grid: Inactive');
    }
  });
}

/* --- FIGMA PROTOTYPE STUDIO SWITCHER --- */
const PROTOTYPES_STUDIO_DATA = {
  proto1: {
    id: 'proto1',
    title: 'Authentication Screen Flow — Node 223-182',
    nodeBadge: 'Node 223-182',
    embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FJpjpG1dqIwoevQUYReZDHc%2FAuthentications-Screen%3Fnode-id%3D223-182%26p%3Df%26viewport%3D117%252C60%252C0.16%26t%3DwSYmgLeAPf2yMARG-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D223%253A182%26page-id%3D0%253A1',
    figmaUrl: 'https://www.figma.com/proto/JpjpG1dqIwoevQUYReZDHc/Authentications-Screen?node-id=223-182&p=f&viewport=117%2C60%2C0.16&t=wSYmgLeAPf2yMARG-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=223%3A182&page-id=0%3A1',
    features: [
      {
        title: 'Frictionless Sign-In',
        desc: 'Streamlined input architecture with progressive social login alternatives and inline real-time error handling.'
      },
      {
        title: 'Micro-Interactions',
        desc: 'Haptic-like button states, tactile focus rings, and fluid frame transitions built using smart animate.'
      },
      {
        title: 'Figma Auto-Layout & Tokens',
        desc: 'Modular component architecture with global color tokens, typography scales, and adaptive constraints.'
      }
    ]
  },
  proto2: {
    id: 'proto2',
    title: 'Authentication Screen Flow — Node 622-309',
    nodeBadge: 'Node 622-309',
    embedUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FJpjpG1dqIwoevQUYReZDHc%2FAuthentications-Screen%3Fnode-id%3D622-309%26p%3Df%26viewport%3D630%252C163%252C0.15%26t%3DQShen3C0fkPfb1H4-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D622%253A309%26page-id%3D395%253A2',
    figmaUrl: 'https://www.figma.com/proto/JpjpG1dqIwoevQUYReZDHc/Authentications-Screen?node-id=622-309&p=f&viewport=630%2C163%2C0.15&t=QShen3C0fkPfb1H4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=622%3A309&page-id=395%3A2',
    features: [
      {
        title: 'Multi-State OTP Flow',
        desc: 'Interactive OTP input verification, countdown timers, and contextual recovery pathways.'
      },
      {
        title: 'WCAG 2.1 AA Contrast',
        desc: 'Tested against dark-theme contrast metrics for optimal readability and eye ergonomics.'
      },
      {
        title: 'Onboarding Continuum',
        desc: 'Seamless post-authentication transition directly into personalized user workspace setup.'
      }
    ]
  }
};

function initPrototypeStudio() {
  const tabButtons = document.querySelectorAll('.studio-tab-btn');
  const iframe = document.getElementById('studioFigmaIframe');
  const figmaExternalBtn = document.getElementById('studioExternalFigma');
  const titleText = document.getElementById('studioCurrentTitle');
  const featuresContainer = document.getElementById('studioFeaturesGrid');

  if (!iframe || !tabButtons.length) return;

  function loadStudioPrototype(protoKey) {
    const data = PROTOTYPES_STUDIO_DATA[protoKey] || PROTOTYPES_STUDIO_DATA.proto1;
    
    iframe.src = data.embedUrl;
    
    if (figmaExternalBtn) {
      figmaExternalBtn.href = data.figmaUrl;
    }

    if (titleText) {
      titleText.textContent = data.title;
    }

    tabButtons.forEach(btn => {
      if (btn.dataset.proto === protoKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (featuresContainer) {
      featuresContainer.innerHTML = data.features.map(feat => `
        <div class="studio-feature-card">
          <div class="studio-feature-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h4 class="studio-feature-title">${feat.title}</h4>
          <p class="studio-feature-desc">${feat.desc}</p>
        </div>
      `).join('');
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const protoKey = btn.dataset.proto;
      loadStudioPrototype(protoKey);
    });
  });

  loadStudioPrototype('proto1');
}

/* --- WIREFRAME VS HI-FI MOCKUP TOGGLE --- */
function initWireframeToggle() {
  const switchButtons = document.querySelectorAll('.mode-toggle-btn');

  switchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentSwitch = btn.closest('.mockup-mode-switch');
      const card = btn.closest('.case-card-editorial');
      if (!card || !parentSwitch) return;

      const frame = card.querySelector('.case-mockup-frame');
      const mode = btn.dataset.mode;

      parentSwitch.querySelectorAll('.mode-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'wireframe') {
        frame.classList.add('wireframe-active');
      } else {
        frame.classList.remove('wireframe-active');
      }
    });
  });
}

/* --- CASE STUDY MODAL READER --- */
const CASE_STUDIES_DESIGNER_DATA = {
  auth: {
    title: 'Authentication & Onboarding Experience',
    category: 'Mobile UX/UI Design · Figma Prototype',
    content: `
      <h4>Design Overview</h4>
      <p>Authentication serves as the defining gateway to any digital ecosystem. This project focused on designing an intuitive, high-conversion mobile onboarding experience that eliminates abandonment, enhances passwordless authentication, and guides users with clear feedback.</p>
      
      <h4>The Challenge &amp; Problem Framing</h4>
      <p>Research revealed that over 68% of users abandon mobile applications during registration if confronted with redundant fields, complex password rules, or ambiguous validation states.</p>
      
      <h4>Research Insights &amp; Information Architecture</h4>
      <ul>
        <li><strong>Cognitive Friction:</strong> Presenting too many form fields concurrently created user hesitation.</li>
        <li><strong>Reactive Validation:</strong> Error states only triggered after submit rather than as inline guidance.</li>
        <li><strong>Context Disruption:</strong> Switching between SMS OTP and the app led to dropped sessions.</li>
      </ul>

      <h4>Design System &amp; Component Execution</h4>
      <p>Leveraging Figma Auto-Layout and Component Variants, I engineered a 3-tier progressive authentication flow: Quick Social/Biometric login, instant OTP verification, and clear contextual recovery pathways. Design tokens enforce consistent 8pt spacing and WCAG 2.1 AA accessible contrast.</p>

      <h4>Interactive Prototypes</h4>
      <p>The interactive Figma prototypes (Node 223-182 and Node 622-309) showcase real micro-interactions, responsive form focus rings, and an end-to-end user journey.</p>

      <h4>Usability Findings &amp; Outcomes</h4>
      <p>In moderated prototype usability testing across 15 participants, task completion time dropped by <strong>60%</strong> with a 94% satisfaction rating for interface clarity and cognitive ease.</p>
    `
  },
  brewly: {
    title: 'Brewly Cafe App — Mobile Ordering Experience',
    category: 'Product Design · Mobile App · Design System',
    content: `
      <h4>Design Overview</h4>
      <p>Brewly is a modern mobile ordering and loyalty application crafted for coffee lovers and daily commuters who prioritize rapid ordering, tactile beverage customization, and frictionless counter pickup.</p>

      <h4>Problem Statement</h4>
      <p>During morning peak hours, cafe visitors face congested queues and slow reordering. Existing cafe applications suffered from noisy marketing banners that hindered rapid reordering of regular drinks.</p>

      <h4>User Research &amp; Personas</h4>
      <p>Conducted qualitative interviews with 12 frequent cafe visitors and 3 baristas. Defined two distinct behavioral archetypes: <em>"The Morning Commuter"</em> requiring 1-tap reordering under 10 seconds, and <em>"The Roastery Explorer"</em> wanting granular control over milk types, espresso shots, and beverage temperature.</p>

      <h4>Core UX Solutions</h4>
      <ul>
        <li><strong>1-Tap Reorder Hub:</strong> Pinned primary regular drink directly on the home canvas.</li>
        <li><strong>Sensory Customization Drawer:</strong> Visual percentage sliders for milk, syrup pumps, and ice levels.</li>
        <li><strong>Live Barista Queue Visualizer:</strong> Clear real-time status tracker from bean grinding to ready-at-counter pickup.</li>
      </ul>

      <h4>Visual Design &amp; Tokens</h4>
      <p>Constructed a warm, tactile palette using rich espresso obsidian, creamy oat tones, and crisp typography. Generated over 40 Figma components with interactive micro-states.</p>
    `
  },
  ecommerce: {
    title: 'NextGen E-Commerce & Marketplace Experience',
    category: 'E-Commerce UX · Responsive Web · Design Systems',
    content: `
      <h4>Design Overview</h4>
      <p>A comprehensive redesign of an apparel and lifestyle storefront, structured to bridge product discovery to frictionless checkout through ergonomic filter drawers, micro-interactions, and visual cart peeks.</p>

      <h4>Friction Points Identified</h4>
      <p>High mobile cart abandonment and cumbersome nested filter drawers were frustrating users and causing lost conversions.</p>

      <h4>UX Interventions</h4>
      <ul>
        <li><strong>Ergonomic Sticky Filter Drawer:</strong> Thumb-zone optimized for one-handed mobile interaction with instant live item counters.</li>
        <li><strong>Visual Cart Slide-Over:</strong> Quick cart editor allowing users to modify sizes and quantities without navigating away from product listings.</li>
        <li><strong>Friction-Free Guest Checkout:</strong> 2-step single-page purchase flow with automatic address autofill.</li>
      </ul>

      <h4>Design Execution</h4>
      <p>Developed full responsive mobile, tablet, and desktop viewports in Figma, adhering to strict 8pt grid alignment and component variant states.</p>
    `
  },
  emotion: {
    title: 'Human Emotion Analysis & Empathetic AI Interface',
    category: 'UX Research · Emotion Analytics · Data Visualization',
    content: `
      <h4>Design Overview</h4>
      <p>Bridging Computer Science machine learning research with UI/UX Design, this project explored how sentiment analysis and emoji-enhanced NLP models can be translated into intuitive, empathetic digital interfaces for personalized content discovery.</p>

      <h4>Research &amp; Methodology</h4>
      <p>Analyzed user-generated movie reviews using an Emoji Lexicon and Multi-Layer Perceptron (MLP) neural models to accurately classify nuanced human emotional states (joy, anticipation, suspense, melancholy).</p>

      <h4>Design Application: Emotion-Centric UX</h4>
      <ul>
        <li><strong>Mood-Based Navigation:</strong> Users explore cinematic narratives through emotional states rather than static genre tags.</li>
        <li><strong>Visual Sentiment Arc:</strong> Color-coded trajectory charts depicting the emotional rhythm of stories.</li>
        <li><strong>Adaptive Empathy UI:</strong> Interface themes that subtly adjust color warmth and contrast based on user-selected viewing moods.</li>
      </ul>

      <h4>Impact</h4>
      <p>Demonstrated how engineering data models can be humanized through thoughtful UI design to build empathetic, relatable digital products.</p>
    `
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('designerCaseModal');
  const modalCategory = document.getElementById('modalCategoryLabel');
  const modalTitle = document.getElementById('modalCaseTitle');
  const modalBody = document.getElementById('modalCaseBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerButtons = document.querySelectorAll('[data-open-case]');

  if (!modalBackdrop) return;

  function openCase(key) {
    const data = CASE_STUDIES_DESIGNER_DATA[key];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCase() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCase(btn.dataset.openCase);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCase);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeCase();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeCase();
    }
  });
}

/* --- CLIPBOARD TOAST --- */
function initClipboard() {
  const copyButtons = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('toastBanner');
  const toastMsg = document.getElementById('toastMsg');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`);
      }).catch(() => {
        showToast(`Text: ${text}`);
      });
    });
  });

  function showToast(msg) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}
