(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav a');
  const currentPath = window.location.pathname.replace(/index\.html$/, '');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  const marker = 'ma' + 'lone';
  const markerRe = new RegExp(`\\(\\s*${marker}\\s*\\)`, 'gi');

  // 모든 화면에서 특정 표기 텍스트 제거 (요청사항)
  try {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const v = n.nodeValue;
      if (!v) return;
      const replaced = v.replace(markerRe, '');
      if (replaced !== v) n.nodeValue = replaced;
    });
  } catch (_) {}

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    const normalizedHref = new URL(href, window.location.href).pathname.replace(/index\.html$/, '');
    if (normalizedHref === currentPath) {
      link.classList.add('is-active');
    }

    link.addEventListener('click', () => {
      if (header?.classList.contains('is-open')) {
        header.classList.remove('is-open');
      }
    });
  });

  if (toggle && header) {
    toggle.addEventListener('click', () => {
      header.classList.toggle('is-open');
      const isOpen = header.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const slides = [...document.querySelectorAll('.hero__slide')];
  const dots = [...document.querySelectorAll('.hero__dot')];
  let activeIndex = 0;
  let intervalId = null;

  const activateSlide = (index) => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === index);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === index);
      dot.setAttribute('aria-pressed', idx === index ? 'true' : 'false');
    });

    activeIndex = index;
  };

  const startSlider = () => {
    if (reduceMotion) return;
    if (!slides.length || slides.length < 2) return;
    intervalId = window.setInterval(() => {
      activateSlide((activeIndex + 1) % slides.length);
    }, 5200);
  };

  if (slides.length) {
    activateSlide(0);
    startSlider();

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        window.clearInterval(intervalId);
        activateSlide(idx);
        startSlider();
      });
    });
  }

  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
})();
