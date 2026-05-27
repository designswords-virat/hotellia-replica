// Hotellia replica — interactions

// Smooth scroll (Lenis) — falls back gracefully if the lib failed to load
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
  });
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);

  // Anchor links should use Lenis for the scroll-to
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -20 });
    });
  });
}

// Sticky header background on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu open/close
const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
menuBtn.addEventListener('click', () => {
  const open = menuPanel.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuPanel.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
});
menuPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuPanel.classList.remove('open');
  document.body.style.overflow = '';
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('[data-anim]').forEach(el => io.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
  });
});

// Review carousel
const reviews = [
  {
    quote: '"From the moment we arrived, every detail was perfectly taken care of. The rooms are stunning, the service impeccable, and the views absolutely breathtaking. We will absolutely be returning."',
    cite: 'Sarah M. | TripAdvisor'
  },
  {
    quote: '"A genuinely calming place. The bed was unreal, breakfast was lovely, and the staff made us feel like regulars by the second morning."',
    cite: 'Daniel R. | Google'
  },
  {
    quote: '"Ember has the best old fashioned I have had in years. Grove & Grain\'s tasting menu is worth the trip on its own."',
    cite: 'Aiko T. | Booking.com'
  },
  {
    quote: '"Brought our two kids and the Family Suite was perfect. The concierge had a stroller-friendly walk planned by the time we asked."',
    cite: 'The Patel family | Direct'
  },
  {
    quote: '"Quiet, beautiful, and deeply considered. You can feel the care in every corner — from the towels to the playlist in the lobby."',
    cite: 'Mateo G. | Expedia'
  }
];

const quoteEl = document.getElementById('reviewQuote');
const citeEl  = document.getElementById('reviewCite');
const dots = [...document.querySelectorAll('#reviewDots .dot')];
let activeReview = 0;
let reviewTimer;

function showReview(i) {
  activeReview = (i + reviews.length) % reviews.length;
  quoteEl.style.opacity = 0;
  citeEl.style.opacity = 0;
  setTimeout(() => {
    quoteEl.textContent = reviews[activeReview].quote;
    citeEl.textContent = reviews[activeReview].cite;
    quoteEl.style.opacity = 1;
    citeEl.style.opacity = 1;
  }, 250);
  dots.forEach((d, idx) => d.classList.toggle('active', idx === activeReview));
}
function startReviewLoop() {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(() => showReview(activeReview + 1), 6500);
}
dots.forEach(d => d.addEventListener('click', () => {
  showReview(parseInt(d.dataset.i, 10));
  startReviewLoop();
}));
startReviewLoop();
