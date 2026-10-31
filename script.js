/* ===== RUPESH ISHI — PORTFOLIO SCRIPT ===== */

// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initTypedText();
    animateCounters();
  }, 2000);
});

// ---- CUSTOM CURSOR ----
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

if (cursorDot && cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }

  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    animateCursor();
  }
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}, { passive: true });

// ---- MOBILE MENU ----
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ---- TYPED TEXT ANIMATION ----
const typedPhrases = [
  'AI Web Developer & Digital Architect',
  'Building Intelligent Web Experiences',
  'Crafting the Future, One Pixel at a Time',
  'Merging AI with Human-Centered Design',
  'SaaS Builder & Prompt Engineer',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedEl;

function initTypedText() {
  typedEl = document.getElementById('typed-text');
  if (!typedEl) return;
  typeLoop();
}

function typeLoop() {
  const currentPhrase = typedPhrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 40 : 70;
  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typedPhrases.length;
    speed = 400;
  }
  setTimeout(typeLoop, speed);
}

// ---- COUNTER ANIMATION ----
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ---- CANVAS PARTICLE SYSTEM (HERO) ----
const canvas = document.getElementById('hero-canvas');
let ctx = null;
let particles = [];
let animId = null;
let isHeroVisible = true;
let mx = -1000, my = -1000;

if (canvas && canvas.getContext) {
  ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#3b82f6' : '#a855f7';
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += 0.02;
      this.opacity = 0.1 + Math.sin(this.pulse) * 0.2;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Connection lines between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#3b82f6';
          ctx.globalAlpha = (1 - dist / 100) * 0.08;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // Mouse interaction on hero container
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    });
    heroEl.addEventListener('mouseleave', () => {
      mx = -1000;
      my = -1000;
    });
  }

  function animateParticles() {
    if (!isHeroVisible) {
      animId = null;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Subtle radial gradient overlay
    const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width * 0.8);
    gradient.addColorStop(0, 'rgba(59,130,246,0.03)');
    gradient.addColorStop(0.5, 'rgba(168,85,247,0.02)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      // Mouse attraction
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        p.x += dx * 0.002;
        p.y += dy * 0.002;
      }
      p.update();
      p.draw();
    });
    
    drawConnections();
    animId = requestAnimationFrame(animateParticles);
  }

  // IntersectionObserver to pause/resume hero canvas
  if (heroEl && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible && !animId) {
          animId = requestAnimationFrame(animateParticles);
        } else if (!isHeroVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0.02 });
    heroObserver.observe(heroEl);
  }

  animId = requestAnimationFrame(animateParticles);
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- SKILL BAR ANIMATION ----
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ---- MAGNETIC BUTTONS ----
if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      btn.style.transition = 'none';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}

// ---- STAGGERED REVEAL for GRID CARDS ----
function setupStaggeredReveal() {
  const grids = document.querySelectorAll('.projects-grid, .skills-grid, .services-grid, .testi-grid');
  grids.forEach(grid => {
    const cards = grid.querySelectorAll('.reveal');
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, i * 80);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    gridObserver.observe(grid);
  });
}
setupStaggeredReveal();

// ---- PROJECT CATEGORY FILTERING ----
function filterProjects(category, buttonEl) {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}
window.filterProjects = filterProjects;

// ---- COMMAND PALETTE ----
const commandItems = [
  { icon: '👤', name: 'About Me', desc: 'Section', action: () => scrollTo('#about') },
  { icon: '⚡', name: 'Skills', desc: 'Section', action: () => scrollTo('#skills') },
  { icon: '🚀', name: 'Projects', desc: 'Section (All 10 Projects)', action: () => scrollTo('#projects') },
  { icon: '📄', name: 'PrintWise', desc: 'PDF Tools & Print Layout', action: () => { scrollTo('#projects'); window.open('https://printwise.ai.studio/', '_blank', 'noopener,noreferrer'); } },
  { icon: '⛅', name: 'ATMOS', desc: 'Atmospheric Weather Telemetry', action: () => { scrollTo('#projects'); window.open('https://rupeshishi3-bot.github.io/Atmos.in/', '_blank', 'noopener,noreferrer'); } },
  { icon: '🔍', name: 'ATS X-Ray', desc: 'Resume Parser Diagnostic', action: () => { scrollTo('#projects'); window.open('https://ats-x-ray-transparent-resume-parser.ai.studio/', '_blank', 'noopener,noreferrer'); } },
  { icon: '📋', name: 'DocReady', desc: 'Document Compliance Checklist', action: () => { scrollTo('#projects'); window.open('https://docready.ai.studio/#purpose-section', '_blank', 'noopener,noreferrer'); } },
  { icon: '🤖', name: 'NEXUS', desc: 'AI Tools & Productivity Portal', action: () => { scrollTo('#projects'); window.open('https://rupeshishi3-bot.github.io/nexus.ai/', '_blank', 'noopener,noreferrer'); } },
  { icon: '📊', name: 'ProjectFlows', desc: 'Workflow Graph Engine', action: () => { scrollTo('#projects'); window.open('https://projectflows.ai.studio/', '_blank', 'noopener,noreferrer'); } },
  { icon: '⌨️', name: 'Typing Website', desc: 'Keystroke WPM Analytics', action: () => { scrollTo('#projects'); window.open('https://rupeshishi3-bot.github.io/Typing-Website-by-Rupesh-Ishi/', '_blank', 'noopener,noreferrer'); } },
  { icon: '📡', name: 'StackRadar', desc: 'Edge Architecture Analyzer', action: () => { scrollTo('#projects'); window.open('https://stackradar.rupeshishi3.workers.dev/', '_blank', 'noopener,noreferrer'); } },
  { icon: '🛡️', name: 'ProofStack', desc: 'Structured Verification Engine', action: () => { scrollTo('#projects'); window.open('https://proofstack-gamma.vercel.app/', '_blank', 'noopener,noreferrer'); } },
  { icon: '⏱️', name: '60Sec News', desc: 'Rapid News Briefing Microservice', action: () => { scrollTo('#projects'); window.open('https://service-60sec-news-881179795897.asia-southeast1.run.app/', '_blank', 'noopener,noreferrer'); } },
  { icon: '💼', name: 'Services', desc: 'Section', action: () => scrollTo('#services') },
  { icon: '⏳', name: 'Timeline', desc: 'Journey', action: () => scrollTo('#timeline') },
  { icon: '✉️', name: 'Contact', desc: 'Get in touch', action: () => scrollTo('#contact') },
  { icon: '📄', name: 'Download Resume', desc: 'PDF', action: downloadResume },
  { icon: '↑', name: 'Back to Top', desc: 'Navigate', action: scrollToTop },
  { icon: '🎮', name: 'Easter Egg', desc: 'Secret', action: openEasterEgg },
];

let activeCmdIndex = 0;
let currentFilteredCommands = [];

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  closeCommandPalette();
}

function openCommandPalette() {
  const overlay = document.getElementById('command-overlay');
  const input = document.getElementById('cmd-input');
  if (overlay) {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  }
  if (input) {
    input.value = '';
    input.focus();
  }
  renderCommandItems('');
}

function closeCommandPalette() {
  const overlay = document.getElementById('command-overlay');
  const input = document.getElementById('cmd-input');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (input) input.value = '';
}

function renderCommandItems(query) {
  const container = document.getElementById('cmd-results');
  if (!container) return;
  const q = (query || '').toLowerCase().trim();
  currentFilteredCommands = commandItems.filter(item =>
    item.name.toLowerCase().includes(q) ||
    (item.desc && item.desc.toLowerCase().includes(q))
  );
  activeCmdIndex = 0;

  if (currentFilteredCommands.length === 0) {
    container.innerHTML = `<div class="cmd-empty" style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No matching commands found</div>`;
    return;
  }

  container.innerHTML = currentFilteredCommands.map((item, i) => `
    <div class="cmd-item ${i === 0 ? 'selected' : ''}" data-index="${i}" onclick="executeCommand(${commandItems.indexOf(item)})" role="option" aria-selected="${i === 0}">
      <span class="cmd-item-icon" aria-hidden="true">${item.icon}</span>
      <span class="cmd-item-name">${item.name}</span>
      <span class="cmd-item-desc">${item.desc || ''}</span>
    </div>
  `).join('');
}

function executeCommand(index) {
  if (commandItems[index] && typeof commandItems[index].action === 'function') {
    commandItems[index].action();
  }
  closeCommandPalette();
}

const cmdInput = document.getElementById('cmd-input');
if (cmdInput) {
  cmdInput.addEventListener('input', (e) => {
    renderCommandItems(e.target.value);
  });

  cmdInput.addEventListener('keydown', (e) => {
    const items = document.querySelectorAll('.cmd-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[activeCmdIndex].classList.remove('selected');
      items[activeCmdIndex].setAttribute('aria-selected', 'false');
      activeCmdIndex = (activeCmdIndex + 1) % items.length;
      items[activeCmdIndex].classList.add('selected');
      items[activeCmdIndex].setAttribute('aria-selected', 'true');
      items[activeCmdIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[activeCmdIndex].classList.remove('selected');
      items[activeCmdIndex].setAttribute('aria-selected', 'false');
      activeCmdIndex = (activeCmdIndex - 1 + items.length) % items.length;
      items[activeCmdIndex].classList.add('selected');
      items[activeCmdIndex].setAttribute('aria-selected', 'true');
      items[activeCmdIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFilteredCommands[activeCmdIndex]) {
        executeCommand(commandItems.indexOf(currentFilteredCommands[activeCmdIndex]));
      }
    }
  });
}

const cmdOverlay = document.getElementById('command-overlay');
if (cmdOverlay) {
  cmdOverlay.addEventListener('click', (e) => {
    if (e.target === cmdOverlay) {
      closeCommandPalette();
    }
  });
}

// Keyboard shortcut Ctrl+K / Cmd+K
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
  if (e.key === 'Escape') closeCommandPalette();
});

// ---- SCROLL TO TOP ----
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- RESUME DOWNLOAD ----
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'resume.pdf';
  link.download = 'Rupesh-Ishi-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const resumeBtn = document.getElementById('resume-btn') || document.querySelector('.resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    const href = resumeBtn.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      downloadResume();
    }
  });
}

// ---- CONTACT FORM ----
function handleContact() {
  const nameEl = document.getElementById('name') || document.getElementById('contact-name');
  const emailEl = document.getElementById('email') || document.getElementById('contact-email');
  const projectEl = document.getElementById('project') || document.getElementById('contact-project');
  const msgEl = document.getElementById('contact-msg');
  
  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const msg = msgEl ? msgEl.value.trim() : '';
  
  if (!name || !email || !msg) {
    // Shake animation on empty fields
    [nameEl, emailEl, msgEl].forEach(el => {
      if (el && !el.value.trim()) {
        el.style.animation = 'shake 0.3s ease';
        setTimeout(() => { el.style.animation = ''; }, 300);
      }
    });
    return;
  }
  
  const success = document.getElementById('form-success');
  if (success) success.style.display = 'block';
  
  // Reset form
  if (nameEl) nameEl.value = '';
  if (emailEl) emailEl.value = '';
  if (projectEl) projectEl.value = '';
  if (msgEl) msgEl.value = '';
  
  setTimeout(() => {
    if (success) success.style.display = 'none';
  }, 6000);
}


// ---- EASTER EGG (Konami Code) ----
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      openEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function openEasterEgg() {
  const egg = document.getElementById('easter-egg');
  if (egg) egg.classList.add('open');
}

function closeEasterEgg() {
  const egg = document.getElementById('easter-egg');
  if (egg) egg.classList.remove('open');
}

// Click on footer easter egg hint
const easterEggHint = document.querySelector('.easter-egg-hint');
if (easterEggHint) {
  easterEggHint.addEventListener('click', openEasterEgg);
}

// ---- 3D TILT EFFECT & SPECULAR REFLECTION on CARDS ----
if (window.matchMedia && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project-card, .service-card, .testi-card').forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const tiltX = (py - 0.5) * -10;
      const tiltY = (px - 0.5) * 10;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.setProperty('--mouse-x', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--mouse-y', (py * 100).toFixed(1) + '%');
        card.style.setProperty('--rx', tiltX.toFixed(2) + 'deg');
        card.style.setProperty('--ry', tiltY.toFixed(2) + 'deg');
        card.style.setProperty('--ty', '-6px');
        card.style.setProperty('--specular-opacity', '1');
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--ty', '0px');
      card.style.setProperty('--specular-opacity', '0');
    });
  });
}

// ---- SMOOTH ACTIVE NAV on SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#3b82f6';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ---- TERMINAL TYPING EFFECT ----
function initTerminal() {
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    setTimeout(() => {
      line.style.transition = 'all 0.4s ease';
      line.style.opacity = '1';
      line.style.transform = 'none';
    }, i * 200);
  });
}

// Trigger terminal animation when visible
const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initTerminal();
      terminalObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const terminal = document.querySelector('.ai-terminal');
if (terminal) terminalObserver.observe(terminal);

// ---- PARALLAX HERO CONTENT ----
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.7);
  }
}, { passive: true });

// ---- GLOWING NAVBAR LINK HIGHLIGHT ----
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.textShadow = '0 0 20px rgba(59,130,246,0.5)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.textShadow = '';
  });
});

// ---- DYNAMIC BACKGROUND GLOW on SCROLL ----
window.addEventListener('scroll', () => {
  const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const hue = Math.floor(220 + scrollPct * 60); // blue to purple
  document.documentElement.style.setProperty('--scroll-hue', hue);
}, { passive: true });

// ---- TYPING CURSOR BLINK ----
// Already handled with CSS animation

// ---- SKILLS SECTION — animate on scroll ----
// (handled by skillObserver above)

// ---- SERVICE CARD HOVER GLOW ----
if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--gx', x + 'px');
      card.style.setProperty('--gy', y + 'px');
    });
  });
}

// ---- VISION SECTION SPARKLE ----
const visionSection = document.getElementById('vision');
let isVisionVisible = false;

if (visionSection && 'IntersectionObserver' in window) {
  const visionObserver = new IntersectionObserver((entries) => {
    isVisionVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  visionObserver.observe(visionSection);

  setInterval(() => {
    if (isVisionVisible && !document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      createSparkle(visionSection);
    }
  }, 800);
}

function createSparkle(parent) {
  const sparkle = document.createElement('div');
  sparkle.style.cssText = `
    position: absolute;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: ${Math.random() > 0.5 ? '#3b82f6' : '#a855f7'};
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    pointer-events: none;
    z-index: 1;
    animation: sparkle-anim 1.5s ease forwards;
  `;
  parent.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1500);
}

// ---- INITIALIZE ----
console.log(`
%c
  RUPESH ISHI — AI Web Developer
  You found the console! Welcome to the source.
  
  Try: Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise.
  Or: Press Ctrl+K to open the command palette.
`,
'color: #a855f7; font-family: monospace; font-size: 11px;');

console.log('%cBuilt with obsession. Designed with purpose.', 'color: #3b82f6; font-size: 12px; font-weight: bold;');