// main.js — index.html page-specific logic
// Shared setup (lenis, cursor, nav, loader) lives in core.js

// Tell core.js loader what to run after the intro wipe
window.__onLoaderDone = startHeroAnimation;

// ============================================================
// HERO ENTRANCE ANIMATION
// ============================================================
function startHeroAnimation() {
  const lineInners = document.querySelectorAll('.hero-headline .line-inner');

  gsap.to(lineInners, {
    y: 0,
    duration: 1.3,
    ease: 'power4.out',
    stagger: 0.12,
    delay: 0.1,
  });

  gsap.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.1,
    delay: 0.55,
  });

  gsap.to('.hero-scroll-hint', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.1,
  });

  // Word cycle
  const items = document.querySelectorAll('.word-cycle .cycle-item');
  let idx = 0;

  setInterval(() => {
    const current = items[idx];
    const next    = items[(idx + 1) % items.length];

    current.classList.remove('active');
    current.classList.add('exit');
    next.classList.remove('enter');
    next.classList.add('active');

    setTimeout(() => {
      current.classList.remove('exit');
      current.classList.add('enter');
    }, 700);

    idx = (idx + 1) % items.length;
  }, 2600);
}

// ============================================================
// SERVICES — STAGGERED SCROLL REVEAL
// ============================================================
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach((item, i) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 87%',
    onEnter: () => {
      setTimeout(() => item.classList.add('is-visible'), i * 75);
    },
  });
});

// ============================================================
// STATS — COUNT-UP ANIMATION
// ============================================================
document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  const target = parseInt(el.dataset.target, 10);
  let counted  = false;

  ScrollTrigger.create({
    trigger: el,
    start: 'top 82%',
    onEnter: () => {
      if (counted) return;
      counted = true;
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = Math.round(this.targets()[0].val) + '+';
        },
      });
    },
  });
});

// ============================================================
// GENERAL FADE-UP REVEALS
// ============================================================
const fadeTargets = [
  '.about-headline',
  '.about-text',
  '.about-pillars',
  '.works-headline',
  '.awards-headline',
  '.footer-slogan',
  '.stats-quote',
  '.works-footer',
];

fadeTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 82%' },
      y: 45,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });
});

// ============================================================
// AWARD ITEMS — STAGGER FADE IN
// ============================================================
gsap.from('.award-item', {
  scrollTrigger: { trigger: '.awards-list', start: 'top 78%' },
  y: 28,
  opacity: 0,
  duration: 0.75,
  stagger: 0.1,
  ease: 'power3.out',
});

// ============================================================
// WORKS GRID — STAGGER FADE IN
// ============================================================
gsap.from('.work-item', {
  scrollTrigger: { trigger: '.works-grid', start: 'top 78%' },
  y: 36,
  opacity: 0,
  duration: 0.7,
  stagger: 0.07,
  ease: 'power3.out',
});

// ============================================================
// STATS GRID — STAGGER FADE IN
// ============================================================
gsap.from('.stat-item', {
  scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
  y: 30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: 'power3.out',
});

// ============================================================
// FOOTER BODY — STAGGER COLS
// ============================================================
gsap.from('.footer-col', {
  scrollTrigger: { trigger: '.footer-body', start: 'top 80%' },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power3.out',
});

// ============================================================
// SECTION LABELS
// ============================================================
document.querySelectorAll('.section-label').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    x: -20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  });
});

// ============================================================
// PILLAR ITEMS — STAGGER
// ============================================================
gsap.from('.pillar', {
  scrollTrigger: { trigger: '.about-pillars', start: 'top 78%' },
  y: 20,
  opacity: 0,
  duration: 0.65,
  stagger: 0.1,
  ease: 'power3.out',
});

// ============================================================
// HERO CANVAS — PARTICLE CONSTELLATION
// ============================================================
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  let mX = -9999, mY = -9999;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r:  Math.random() * 1.4 + 0.4,
      a:  Math.random() * 0.3 + 0.06,
    }));
  }

  document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });

  function tick() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      const dx = mX - p.x, dy = mY - p.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 220) {
        p.vx += dx * 0.000018;
        p.vy += dy * 0.000018;
      }
      p.vx *= 0.998;
      p.vy *= 0.998;
      p.x  += p.vx;
      p.y  += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,203,52,${(1 - d / 130) * 0.07})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,203,52,${p.a})`;
      ctx.fill();
    });

    requestAnimationFrame(tick);
  }

  resize();
  makeParticles();
  tick();

  window.addEventListener('resize', () => { resize(); makeParticles(); });
})();
