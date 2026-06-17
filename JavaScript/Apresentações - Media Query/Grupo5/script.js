/* ------------------------------------------------------------------
   1. CUSTOM CURSOR
------------------------------------------------------------------ */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

// Smooth ring follow
function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
const hoverables = document.querySelectorAll('a, button, .spec-card, .gallery-item');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ------------------------------------------------------------------
   2. SCROLL SUAVE — Nav links
   (reforço além do `scroll-behavior: smooth` no CSS,
    com offset para compensar a nav fixa)
------------------------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('nav').offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ------------------------------------------------------------------
   3. FADE-IN ao Scroll — Intersection Observer
------------------------------------------------------------------ */
const fadeEls = document.querySelectorAll('.fade-up');
const specCards = document.querySelectorAll('.spec-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);  // dispara apenas uma vez
    }
  });
}, {
  threshold: 0.15,   // 15% visível já dispara
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));
specCards.forEach(el => observer.observe(el));

/* ------------------------------------------------------------------
   4. PARALLAX SUAVE no Hero Background
------------------------------------------------------------------ */
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
  }
}, { passive: true });