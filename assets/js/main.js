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

// Simple lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox && lightbox.querySelector('img');
const lbCap = lightbox && lightbox.querySelector('.lightbox-caption');
const lbClose = lightbox && lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.glightbox').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const cap = link.getAttribute('data-caption') || '';
    if (lightbox && lbImg && lbCap && href) {
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

// Modern scroll effects
(() => {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scrolled state
  const header = document.querySelector('.site-header');
  // Scroll progress bar element
  let progress = document.getElementById('scroll-progress');
  if (!progress) {
    progress = document.createElement('div');
    progress.id = 'scroll-progress';
    document.body.appendChild(progress);
  }

  // Reveal-on-scroll using IntersectionObserver
  const toReveal = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    toReveal.forEach(el => io.observe(el));
  } else {
    // Fallback: show all
    toReveal.forEach(el => el.classList.add('reveal-visible'));
  }

  // Parallax on hero image
  const heroImg = document.querySelector('.hero-image');

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
    const docHeight = doc.scrollHeight - doc.clientHeight;
    const progressPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = progressPct + '%';

    if (header) header.classList.toggle('scrolled', scrollTop > 10);

    if (!prefersReduced && heroImg) {
      const y = Math.min(60, scrollTop * 0.15);
      heroImg.style.transform = `translateY(${y}px)`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Currency conversion for pricing
(() => {
  const select = document.getElementById('currency-select');
  if (!select) return;

  const symbolMap = { USD: '$', EUR: '€', GBP: '£', LKR: '₨' };
  let rates = { USD: 1 };

  const fmt = (val, code) => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: code, maximumFractionDigits: 2 }).format(val).replace(/^([^\d]+)/, '');
    } catch {
      return String(Math.round(val * 100) / 100);
    }
  };

  const applyCurrency = (code) => {
    const factor = rates[code] || 1;
    document.querySelectorAll('.currency-symbol').forEach(el => { el.textContent = symbolMap[code] || '$'; });
    document.querySelectorAll('.price-amount, .money').forEach(el => {
      const base = parseFloat(el.getAttribute('data-amount-usd') || '0');
      const converted = base * factor;
      el.textContent = fmt(converted, code);
    });
    try { localStorage.setItem('currency', code); } catch {}
  };

  const init = async () => {
    const saved = (() => { try { return localStorage.getItem('currency'); } catch { return null; }})();
    if (saved && symbolMap[saved]) (select).value = saved;
    try {
      const res = await fetch('https://api.exchangerate.host/latest?base=USD');
      const data = await res.json();
      if (data && data.rates) {
        rates = { USD: 1, EUR: data.rates.EUR, GBP: data.rates.GBP, LKR: data.rates.LKR };
      }
    } catch { /* offline or blocked: keep USD=1 */ }
    applyCurrency((select).value);
  };

  select.addEventListener('change', () => applyCurrency((select).value));
  init();
})();

// Booking seat note updater
(() => {
  const select = document.getElementById('service');
  const note = document.getElementById('seat-note');
  const license = document.getElementById('license-note');
  if (!select || !note) return;
  const update = () => {
    const val = select.value;
    if (val === 'self-drive') {
      note.textContent = 'Self-drive: seats for 4 adults + 1 child. With Driver/Driver‑guide: passenger seats up to 4.';
      if (license) license.textContent = 'International travelers: For self‑drive in Sri Lanka, you must carry an International Driving Permit (IDP) plus your valid home‑country license and passport.';
    } else if (val === 'airport-transfer' || val === 'with-driver' || val === 'driver-guide') {
      note.textContent = 'Passenger seats available: up to 4 (one seat is occupied by the Driver/Driver‑guide).';
      if (license) license.textContent = 'No IDP required when booking With Driver, Driver‑guide or Airport Transfer.';
    } else {
      note.textContent = 'Passenger seats: up to 4.';
      if (license) license.textContent = '';
    }
  };
  select.addEventListener('change', update);
  update();
})();
