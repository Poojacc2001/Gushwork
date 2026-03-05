
  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  hamburger.addEventListener('click', () => navbar.classList.toggle('menu-open'));

  // Testimonial Carousel
  const track = document.getElementById('testiTrack');
  const cards = Array.from(track.children);
  const dotsWrap = document.getElementById('testiDots');
  let tIdx = 0;

  function getVisible() {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 960 ? 2 : 4;
  }

  function buildDots() {
    const visible = getVisible();
    const total = Math.ceil(cards.length / visible);
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(i) {
    const visible = getVisible();
    const maxIdx = Math.max(0, Math.ceil(cards.length / visible) - 1);
    tIdx = Math.min(Math.max(i, 0), maxIdx);
    const cardW = track.parentElement.offsetWidth / visible;
    cards.forEach(c => { c.style.flex = `0 0 ${cardW - 16}px`; });
    track.style.transform = `translateX(-${tIdx * cardW * visible}px)`;
    document.querySelectorAll('.testi-dot').forEach((d, di) => d.classList.toggle('active', di === tIdx));
  }

  function updateCarousel() { buildDots(); goTo(0); }
  window.addEventListener('resize', updateCarousel);
  updateCarousel();

  // Auto-advance
  setInterval(() => {
    const visible = getVisible();
    const max = Math.ceil(cards.length / visible) - 1;
    goTo(tIdx >= max ? 0 : tIdx + 1);
  }, 4500);

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  // Form submit
  document.querySelector('.btn-submit').addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-right input');
    let ok = true;
    inputs.forEach(inp => { if (!inp.value.trim()) { inp.style.borderColor='#e55'; ok=false; setTimeout(()=>inp.style.borderColor='',2000); } });
    if (ok) {
      document.querySelector('.btn-submit').textContent = '✓ Request Sent!';
      document.querySelector('.btn-submit').style.background = '#22c55e';
    }
  });

   // Smooth hover underline on footer links — already handled via CSS
    // Add keyboard accessibility for social buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') btn.click();
      });
    });