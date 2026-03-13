'use strict';

// ─── Scroll Reveal ──────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ─── Nav Scroll Shrink ─────────────────────────────────
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── Mobile Menu ───────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── Color Selector ────────────────────────────────────
const colorDots = document.querySelectorAll('.color-dot');
const colorName = document.getElementById('colorName');

colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    colorDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    colorName.textContent = dot.dataset.color;
  });
});

// ─── Buy Button + Toast ────────────────────────────────
const buyBtn = document.getElementById('buyBtn');
const toast  = document.getElementById('toast');
let toastTimer;

buyBtn.addEventListener('click', () => {
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
});

// ─── Smooth scroll for anchor links ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Animate stats numbers ─────────────────────────────
function animateValue(el, start, end, suffix, duration) {
  const startTime = performance.now();
  const isDecimal = String(end).includes('.');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (end - start) * eased;
    el.textContent = (isDecimal ? value.toFixed(0) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat__number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const text = el.textContent.trim();

    if (text === '40h')   animateValue(el, 0, 40, 'h', 1200);
    if (text === '-42')   animateValue(el, 0, 42, '', 1200), el.textContent = '-42';
    if (text === '5ms')   animateValue(el, 0, 5, 'ms', 1000);
    // "Ti" is not a number, skip

    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));
