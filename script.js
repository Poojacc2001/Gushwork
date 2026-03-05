
  const images = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80',
    'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=60',
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=200&q=60',
  ];
  const thumbSrcs = images.slice(0, 6);
  let current = 0;
  const mainImg = document.getElementById('mainImg');
  const thumbsEl = document.getElementById('thumbs');

  thumbSrcs.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src; img.alt = 'Product view ' + (i + 1);
    if (i === 0) img.classList.add('active');
    img.onclick = () => selectImg(i);
    thumbsEl.appendChild(img);
  });

  function selectImg(idx) {
    current = idx;
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(1.04)';
    setTimeout(() => {
      mainImg.src = images[current];
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 180);
    thumbsEl.querySelectorAll('img').forEach((t, i) => t.classList.toggle('active', i === current));
  }

  function changeImg(dir) {
    selectImg((current + dir + images.length) % images.length);
  }

  mainImg.style.transition = 'opacity .18s ease, transform .18s ease';

  // Hamburger
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Scroll fade-up
  const observer1 = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer1.unobserve(e.target); }});
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer1.observe(el));

  

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  hamburger.addEventListener('click', () => navbar.classList.toggle('menu-open'));

  // FAQ Accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Industry Carousel
  const track = document.getElementById('cardsTrack');
  const cards = track.querySelectorAll('.industry-card');
  let cardIdx = 0;
  const getVisible = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 4;

  function updateCarousel() {
    const visible = getVisible();
    const cardW = track.parentElement.offsetWidth / visible;
    cards.forEach(c => c.style.flex = `0 0 ${cardW - 16}px`);
    const maxIdx = Math.max(0, cards.length - visible);
    cardIdx = Math.min(cardIdx, maxIdx);
    track.style.transform = `translateX(-${cardIdx * cardW}px)`;
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    const visible = getVisible();
    const max = cards.length - visible;
    cardIdx = cardIdx >= max ? 0 : cardIdx + 1;
    updateCarousel();
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    const visible = getVisible();
    const max = cards.length - visible;
    cardIdx = cardIdx <= 0 ? max : cardIdx - 1;
    updateCarousel();
  });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();

  // Process Tabs
  const processData = [
    { title: 'High-Grade Raw Material Selection', text: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.', bullets: ['PE100 grade material', 'Optimal molecular weight distribution'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop' },
    { title: 'Precision Extrusion Process', text: 'Our twin-screw extruders melt and homogenize raw polymer with exact temperature profiles, ensuring uniform melt quality and consistent flow rates.', bullets: ['Twin-screw configuration', 'Temperature-controlled zones'], img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop' },
    { title: 'Controlled Cooling System', text: 'Precision water bath cooling maintains dimensional stability and prevents warping, ensuring the pipe retains its shape as it solidifies.', bullets: ['Multi-stage water cooling', 'Controlled cooling profiles'], img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop' },
    { title: 'Accurate Sizing & Calibration', text: 'Vacuum calibration sleeves define the exact outer diameter of the pipe while maintaining tight tolerances throughout the production run.', bullets: ['Vacuum calibration', '±0.1mm tolerance'], img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&auto=format&fit=crop' },
    { title: 'Rigorous Quality Control', text: 'In-line sensors continuously monitor wall thickness, ovality, and diameter, with automatic feedback loops to correct any deviations immediately.', bullets: ['Real-time monitoring', 'Automated rejection system'], img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop' },
    { title: 'Traceability Marking', text: 'Inkjet or laser marking systems apply production data, pressure ratings, and lot numbers at high speed without affecting pipe integrity.', bullets: ['Inkjet or laser marking', 'Full traceability data'], img: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&auto=format&fit=crop' },
    { title: 'Precision Cutting', text: 'Planetary saw or blade cutters deliver burr-free, square cuts to exact lengths with high repeatability and minimal material waste.', bullets: ['Burr-free cuts', 'Adjustable cut lengths'], img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop' },
    { title: 'Automated Packaging', text: 'Finished pipes are automatically counted, bundled, and wrapped using our high-speed packaging stations, ready for logistics and dispatch.', bullets: ['Auto bundling', 'Shrink-wrap or banding'], img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop' }
  ];

  let pIdx = 0;
  const tabs = document.querySelectorAll('.ptab');
  const pText = document.getElementById('processText');
  const pImg = document.getElementById('processImg');

  function setProcess(i) {
    pIdx = (i + processData.length) % processData.length;
    const d = processData[pIdx];
    tabs.forEach((t, ti) => t.classList.toggle('active', ti === pIdx));
    pText.innerHTML = `<h3>${d.title}</h3><p>${d.text}</p><ul class="process-bullets">${d.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    pImg.querySelector('img').src = d.img;
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => setProcess(i)));
  document.getElementById('pPrev').addEventListener('click', () => setProcess(pIdx - 1));
  document.getElementById('pNext').addEventListener('click', () => setProcess(pIdx + 1));

  // Scroll reveal
  const reveals = document.querySelectorAll('[data-reveal]');
  const observer2 = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer2.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer2.observe(r));

  