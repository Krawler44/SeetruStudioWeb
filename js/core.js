// core.js — shared across all pages (lenis, cursor, nav, loader, scroll progress)

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
const lenis = new Lenis({
  duration: 1.25,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let fX = mouseX, fY = mouseY;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateCursor() {
  fX += (mouseX - fX) * 0.11;
  fY += (mouseY - fY) * 0.11;
  follower.style.left = fX + 'px';
  follower.style.top  = fY + 'px';
  requestAnimationFrame(animateCursor);
})();

function initCursorHovers() {
  document.querySelectorAll('a, button, .work-card, .work-item, .service-item, .award-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
      follower.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
      follower.classList.remove('is-hovering');
    });
  });
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progressBar.style.height = pct + '%';
}, { passive: true });

// ============================================================
// PAGE LOADER
// ============================================================
const loaderEl  = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
let pct = 0;

function dismissLoader(onDone) {
  loaderEl.classList.add('is-done');
  loaderEl.addEventListener('transitionend', () => {
    loaderEl.style.display = 'none';
    if (onDone) onDone();
  }, { once: true });
}

const fillLoader = setInterval(() => {
  pct += Math.random() * 18 + 4;
  if (pct >= 100) {
    pct = 100;
    clearInterval(fillLoader);
    loaderBar.style.width = '100%';
    setTimeout(() => dismissLoader(window.__onLoaderDone), 280);
  } else {
    loaderBar.style.width = pct + '%';
  }
}, 65);

// ============================================================
// NAVIGATION / HAMBURGER MENU
// ============================================================
const menuBtn     = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menuBtn.classList.toggle('open', menuOpen);
  menuOverlay.classList.toggle('open', menuOpen);
  menuOpen ? lenis.stop() : lenis.start();
});

menuOverlay.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    menuBtn.classList.remove('open');
    menuOverlay.classList.remove('open');
    lenis.start();
  });
});

initCursorHovers();
