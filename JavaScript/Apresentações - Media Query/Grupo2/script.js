/* ============================================
   TRIP GO - JavaScript
   ============================================ */

/* ---- DOM Elements ---- */
const navbar      = document.getElementById('navbar');
const navLinks    = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('.section');
const fadeElements = document.querySelectorAll('.fade-up');
const menuToggle  = document.getElementById('menu-toggle');
const navLeft     = document.querySelector('.nav-left');
const navRight    = document.querySelector('.nav-right');

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */

function updateActiveNavLink() {
    let currentSection = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target    = document.querySelector(href);
            const offsetTop = target.offsetTop - navbar.offsetHeight;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

/* ============================================
   HAMBURGER MENU
   ============================================ */

function openMenu() {
    menuToggle.classList.add('active');
    navLeft.classList.add('active');
    navRight.classList.add('active');
    document.body.style.overflow = 'hidden'; // trava scroll enquanto menu aberto
}

function closeMenu() {
    menuToggle.classList.remove('active');
    navLeft.classList.remove('active');
    navRight.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
});

/* fecha menu ao clicar em qualquer link */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

/* ============================================
   INTERSECTION OBSERVER - ANIMAÇÕES
   ============================================ */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => observer.observe(el));

/* ============================================
   LAZY LOADING
   ============================================ */

document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

/* ============================================
   THROTTLE
   ============================================ */

function throttle(func, limit) {
    let inThrottle;
    return function () {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   INIT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    handleNavbarScroll();
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
});

/* ============================================
   ERROR HANDLING
   ============================================ */

window.addEventListener('error', (e) => console.error('Erro:', e.error));
window.addEventListener('unhandledrejection', (e) => console.error('Promise rejeitada:', e.reason));