/* =========================================================
   BHAVIK KOTAK PORTFOLIO  –  script.js
   Navbar · Typing Animation · Scroll Reveal · Hamburger
   ========================================================= */

/* ── 1. NAVBAR scroll effect ─────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── 2. HAMBURGER menu ───────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close on nav-link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── 3. TYPING animation ─────────────────────────────── */
const phrases = [
  'Python Developer',
  'Flask & Django Dev',
  'Backend Engineer',
  'REST API Specialist',
  'AI App Builder',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 55 : 100;

  if (!isDeleting && charIndex === current.length) {
    // Pause at end
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

// Start typing after a short delay
setTimeout(type, 800);

/* ── 4. SCROLL REVEAL ────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ── 5. SMOOTH scroll for anchor links ───────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── 6. ACTIVE nav link highlight ────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          link.style.background = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
            link.style.background = 'rgba(59,130,246,0.08)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── 7. DOWNLOAD RESUME btn feedback ─────────────────── */
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const orig = downloadBtn.innerHTML;
    downloadBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Resume ready soon!`;
    downloadBtn.style.opacity = '0.7';
    setTimeout(() => {
      downloadBtn.innerHTML = orig;
      downloadBtn.style.opacity = '';
    }, 2500);
  });
}

/* ── 8. PARTICLE dots on hero ────────────────────────── */
(function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      border-radius: 50%;
      background: rgba(59,130,246,${Math.random() * 0.4 + 0.1});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 1;
      animation: particleFloat ${Math.random() * 6 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    hero.appendChild(dot);
  }

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%,100% { transform: translateY(0) translateX(0); opacity: 0.6; }
      33%      { transform: translateY(-20px) translateX(10px); opacity: 1; }
      66%      { transform: translateY(10px) translateX(-8px); opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
})();

/* ── 9. STAT counter animation ───────────────────────── */
function animateCounter(el, target, isFloat = false) {
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (target - start) * eased;
    el.textContent = isFloat ? value.toFixed(2) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const numEl = entry.target.querySelector('.stat-number');
        if (!numEl) return;
        const raw = numEl.getAttribute('data-value');
        if (!raw) return;
        const isFloat = raw.includes('.');
        const suffix = numEl.querySelector('.stat-plus') ? '+' : '';
        const original = numEl.innerHTML;

        // Replace just the text (keep child elements)
        const textNode = [...numEl.childNodes].find(n => n.nodeType === 3);
        if (textNode) {
          animateCounter({ set value(v) { textNode.nodeValue = isFloat ? parseFloat(v).toFixed(2) : v; } },
            parseFloat(raw), isFloat);
        }
      }
    });
  },
  { threshold: 0.5 }
);

// Set data-value attributes dynamically
document.querySelectorAll('.stat-card').forEach(card => {
  const numEl = card.querySelector('.stat-number');
  if (numEl) {
    // Extract text value (strip plus sign)
    const text = numEl.textContent.replace('+','').trim();
    numEl.setAttribute('data-value', text);
    statObserver.observe(card);
  }
});

/* ── 10. Cursor glow follow (desktop only) ───────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%; pointer-events: none; z-index: 0;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.6s ease, top 0.6s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}
