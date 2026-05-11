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
animateCursor();

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- MOBILE MENU ----
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
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
const ctx = canvas.getContext('2d');
let particles = [];
let animId;

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

// Mouse interaction
let mx = 0, my = 0;
canvas.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

function animateParticles() {
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
animateParticles();

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
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

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

// ---- COMMAND PALETTE ----
const commandItems = [
  { icon: '??', name: 'About Me', desc: 'Section', action: () => scrollTo('#about') },
  { icon: '?', name: 'Skills', desc: 'Section', action: () => scrollTo('#skills') },
  { icon: '??', name: 'Projects', desc: 'Section', action: () => scrollTo('#projects') },
  { icon: '???', name: 'Services', desc: 'Section', action: () => scrollTo('#services') },
  { icon: '??', name: 'Timeline', desc: 'Journey', action: () => scrollTo('#timeline') },
  { icon: '??', name: 'Contact', desc: 'Get in touch', action: () => scrollTo('#contact') },
  { icon: '??', name: 'Download Resume', desc: 'PDF', action: downloadResume },
  { icon: '??', name: 'Back to Top', desc: 'Navigate', action: scrollToTop },
  { icon: '??', name: 'Easter Egg', desc: 'Secret', action: openEasterEgg },
];

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  closeCommandPalette();
}

function openCommandPalette() {
  document.getElementById('command-overlay').classList.add('open');
  document.getElementById('cmd-input').focus();
  renderCommandItems('');
}

function closeCommandPalette() {
  document.getElementById('command-overlay').classList.remove('open');
  document.getElementById('cmd-input').value = '';
}

function renderCommandItems(query) {
  const container = document.getElementById('cmd-results');
  const filtered = commandItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    (item.desc && item.desc.toLowerCase().includes(query.toLowerCase()))
  );
  container.innerHTML = filtered.map((item, i) => `
    <div class="cmd-item" data-index="${i}" onclick="executeCommand(${commandItems.indexOf(item)})">
      <span class="cmd-item-icon">${item.icon}</span>
      <span class="cmd-item-name">${item.name}</span>
      <span class="cmd-item-desc">${item.desc || ''}</span>
    </div>
  `).join('');
}

function executeCommand(index) {
  commandItems[index].action();
  closeCommandPalette();
}

document.getElementById('cmd-input').addEventListener('input', (e) => {
  renderCommandItems(e.target.value);
});

document.getElementById('command-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('command-overlay')) {
    closeCommandPalette();
  }
});

// Keyboard shortcut Ctrl+K
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
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
  // Create a dummy PDF-like download trigger
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,Rupesh Ishi - AI Web Developer Resume (PDF would be here)';
  link.download = 'Rupesh_Ishi_Resume.txt';
  link.click();
}
document.getElementById('resume-btn').addEventListener('click', (e) => {
  e.preventDefault();
  downloadResume();
});

// ---- CONTACT FORM ----
function handleContact() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();
  
  if (!name || !email || !msg) {
    // Shake animation on empty fields
    [document.getElementById('contact-name'), document.getElementById('contact-email'), document.getElementById('contact-msg')].forEach(el => {
      if (!el.value.trim()) {
        el.style.animation = 'shake 0.3s ease';
        setTimeout(() => el.style.animation = '', 300);
      }
    });
    return;
  }
  
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  
  // Reset form
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-project').value = '';
  document.getElementById('contact-msg').value = '';
  
  setTimeout(() => {
    success.style.display = 'none';
  }, 6000);
}

// Add shake keyframe
const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`;
document.head.appendChild(style);

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
  document.getElementById('easter-egg').classList.add('open');
}

function closeEasterEgg() {
  document.getElementById('easter-egg').classList.remove('open');
}

// Triple click on footer easter egg hint
document.querySelector('.easter-egg-hint').addEventListener('click', openEasterEgg);

// ---- TILT EFFECT on PROJECT CARDS ----
document.querySelectorAll('.project-card, .service-card, .testi-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'none';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = '';
  });
});

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
});

// ---- GLOWING NAVBAR LINK HIGHLIGHT ----
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.textShadow = '0 0 20px rgba(59,130,246,0.5)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.textShadow = '';
  });
});

// ---- HERO CANVAS MOUSE REPEL ----
document.getElementById('hero').addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mx = e.clientX - rect.left;
  my = e.clientY - rect.top;
});

// ---- DYNAMIC BACKGROUND GLOW on SCROLL ----
window.addEventListener('scroll', () => {
  const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const hue = Math.floor(220 + scrollPct * 60); // blue to purple
  document.documentElement.style.setProperty('--scroll-hue', hue);
});

// ---- TYPING CURSOR BLINK ----
// Already handled with CSS animation

// ---- SKILLS SECTION — animate on scroll ----
// (handled by skillObserver above)

// ---- SERVICE CARD HOVER GLOW ----
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--gx', x + 'px');
    card.style.setProperty('--gy', y + 'px');
  });
});

// ---- VISION SECTION SPARKLE ----
const visionSection = document.getElementById('vision');
if (visionSection) {
  const sparkleInterval = setInterval(() => {
    const rect = visionSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      createSparkle(visionSection);
    }
  }, 600);
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
  
  if (!document.querySelector('#sparkle-style')) {
    const s = document.createElement('style');
    s.id = 'sparkle-style';
    s.textContent = `
      @keyframes sparkle-anim {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px currentColor; }
        100% { opacity: 0; transform: scale(0) translateY(-20px); }
      }
    `;
    document.head.appendChild(s);
  }
  
  setTimeout(() => sparkle.remove(), 1500);
}

// ---- INITIALIZE ----
console.log(`
%c
¦¦¦¦¦¦+ ¦¦+   ¦¦+¦¦¦¦¦¦+ ¦¦¦¦¦¦¦+¦¦¦¦¦¦¦+¦¦+  ¦¦+
¦¦+--¦¦+¦¦¦   ¦¦¦¦¦+--¦¦+¦¦+----+¦¦+----+¦¦¦  ¦¦¦
¦¦¦¦¦¦++¦¦¦   ¦¦¦¦¦¦¦¦¦++¦¦¦¦¦+  ¦¦¦¦¦¦¦+¦¦¦¦¦¦¦¦
¦¦+--¦¦+¦¦¦   ¦¦¦¦¦+---+ ¦¦+--+  +----¦¦¦¦¦+--¦¦¦
¦¦¦  ¦¦¦+¦¦¦¦¦¦++¦¦¦     ¦¦¦¦¦¦¦+¦¦¦¦¦¦¦¦¦¦¦  ¦¦¦
+-+  +-+ +-----+ +-+     +------++------++-+  +-+

  RUPESH ISHI — AI Web Developer
  You found the console! You're clearly extraordinary.
  
  Try: Konami Code ????????BA for a surprise.
  Or: Press Ctrl+K to open the command palette.
`,
'color: #a855f7; font-family: monospace; font-size: 11px;');

console.log('%cBuilt with obsession. Designed with purpose.', 'color: #3b82f6; font-size: 12px; font-weight: bold;');