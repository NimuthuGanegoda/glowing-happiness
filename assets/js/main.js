// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Year in footer: set for any element whose id starts with "year"
const yearEls = document.querySelectorAll('[id^="year"]');
const yearStr = String(new Date().getFullYear());
yearEls.forEach(el => { el.textContent = yearStr; });

// Simple lightbox (vanilla JS)
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox && lightbox.querySelector('img');
const lbCap = lightbox && lightbox.querySelector('.lightbox-caption');
const lbClose = lightbox && lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.glightbox').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.href || link.getAttribute('href');
    const cap = link.getAttribute('data-caption') || '';
    if (lightbox && lbImg && lbCap) {
      lbImg.src = href;
      lbCap.textContent = cap;
      lightbox.classList.remove('hidden');
    }
  });
});

if (lbClose && lightbox) {
  lbClose.addEventListener('click', () => lightbox.classList.add('hidden'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.add('hidden');
  });
}
