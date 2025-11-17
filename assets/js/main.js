// Mobile nav toggle & close on link click
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Year in footer: set for any element whose id starts with "year"
const yearEls = document.querySelectorAll('[id^="year"]');
const yearStr = String(new Date().getFullYear());
yearEls.forEach(el => { el.textContent = yearStr; });

// Theme toggle
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', next);
    }
  });
}

// Active nav link highlighting by section intersection (only if internal hash links exist)
const sectionIds = ['car','pricing','gallery','book','contact'];
const observerOptions = {root:null,rootMargin:'0px 0px -60% 0px',threshold:0};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    if (!id) return;
    const link = navLinks && navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, observerOptions);
sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// Lightbox (dialog) with ESC + basic focus management
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox && lightbox.querySelector('img');
const lbCap = lightbox && lightbox.querySelector('.lightbox-caption');
const lbClose = lightbox && lightbox.querySelector('.lightbox-close');
let previousFocus = null;

function openLightbox(href, cap){
  if (!lightbox || !lbImg || !lbCap) return;
  lbImg.src = href;
  lbCap.textContent = cap;
  previousFocus = document.activeElement;
  lightbox.showModal();
  lightbox.classList.remove('hidden');
  lbClose.focus();
}
function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  if (typeof lightbox.close === 'function') lightbox.close();
  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll('.glightbox').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href || link.getAttribute('href');
    const cap = link.getAttribute('data-caption') || '';
    openLightbox(href, cap);
  });
});
if (lbClose && lightbox) {
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
  });
}

// Booking form validation (return date after pickup)
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    const pickup = bookingForm.querySelector('#pickup-date');
    const drop = bookingForm.querySelector('#drop-date');
    const note = bookingForm.querySelector('.form-note');
    if (pickup && drop && note) {
      const pVal = pickup.value;
      const dVal = drop.value;
      if (pVal && dVal && dVal < pVal) {
        e.preventDefault();
        note.textContent = 'Return date must be after pickup date.';
        drop.focus();
      } else {
        note.textContent = '';
      }
    }
  });
}
