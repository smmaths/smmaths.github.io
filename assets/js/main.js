/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Hero path: a Brownian bridge cooled by simulated annealing onto one meridian.
   */
  const heroPath = document.querySelector('#hero-anneal-path');
  const heroPoints = document.querySelector('#hero-anneal-points');
  if (heroPath && heroPoints) {
    const CX = 320;
    const CY = 320;
    const RX = 88;
    const RY = 200;
    const PHI0 = -60 * Math.PI / 180;
    const PHI1 = 50 * Math.PI / 180;
    const N = 72;
    const phases = [
      { name: 'blank', ms: 900 },
      { name: 'anneal', ms: 8600 },
      { name: 'hold', ms: 2600 },
      { name: 'fade', ms: 700 }
    ];
    const samples = [];
    for (let i = 0; i < N; i++) {
      const phi = PHI0 + (PHI1 - PHI0) * (i / (N - 1));
      const tx = -RX * Math.sin(phi);
      const ty = RY * Math.cos(phi);
      const len = Math.hypot(tx, ty) || 1;
      samples.push({
        x: CX + RX * Math.cos(phi),
        y: CY + RY * Math.sin(phi),
        nx: ty / len,
        ny: -tx / len,
        tx: tx / len,
        ty: ty / len
      });
    }

    let normal = new Array(N).fill(0);
    let tangent = new Array(N).fill(0);
    let spareGaussian = null;

    function gaussian() {
      if (spareGaussian !== null) {
        const value = spareGaussian;
        spareGaussian = null;
        return value;
      }
      let u = 0;
      let v = 0;
      while (u === 0) u = Math.random();
      v = Math.random();
      const mag = Math.sqrt(-2 * Math.log(u));
      spareGaussian = mag * Math.sin(2 * Math.PI * v);
      return mag * Math.cos(2 * Math.PI * v);
    }

    function brownianBridge(scale) {
      const walk = [0];
      for (let i = 1; i < N; i++) walk.push(walk[i - 1] + gaussian());
      const end = walk[N - 1];
      let max = 0;
      const bridge = walk.map((value, i) => {
        const pinned = value - end * (i / (N - 1));
        max = Math.max(max, Math.abs(pinned));
        return pinned;
      });
      return bridge.map((value) => (max ? (value * scale) / max : 0));
    }

    function beginWalk() {
      normal = brownianBridge(46);
      tangent = brownianBridge(16);
      normal[0] = normal[N - 1] = 0;
      tangent[0] = tangent[N - 1] = 0;
    }

    function temperatureOf(u) {
      const hotUntil = 0.62;
      if (u < hotUntil) return 1 - 0.1 * (u / hotUntil);
      const v = (u - hotUntil) / (1 - hotUntil);
      return 0.9 * Math.pow(1 - v, 2.2);
    }

    function coolWalk(temperature, dt) {
      const pull = 0.12 + 4.2 * (1 - temperature) * (1 - temperature);
      const sigmaN = 26 * Math.sqrt(temperature);
      const sigmaT = 9 * Math.sqrt(temperature);
      const jitter = Math.sqrt(dt);
      for (let i = 1; i < N - 1; i++) {
        normal[i] += -pull * normal[i] * dt + gaussian() * sigmaN * jitter;
        tangent[i] += -pull * tangent[i] * dt + gaussian() * sigmaT * jitter;
        normal[i] = Math.max(-64, Math.min(64, normal[i]));
        tangent[i] = Math.max(-24, Math.min(24, tangent[i]));
      }
      const smooth = Math.min(0.4, dt * (4 + 16 * (1 - temperature)));
      if (smooth > 0) {
        const nextN = normal.slice();
        const nextT = tangent.slice();
        for (let i = 1; i < N - 1; i++) {
          nextN[i] = normal[i] * (1 - smooth) + 0.5 * (normal[i - 1] + normal[i + 1]) * smooth;
          nextT[i] = tangent[i] * (1 - smooth) + 0.5 * (tangent[i - 1] + tangent[i + 1]) * smooth;
        }
        normal = nextN;
        tangent = nextT;
      }
      normal[0] = normal[N - 1] = 0;
      tangent[0] = tangent[N - 1] = 0;
    }

    function render(opacity) {
      let d = '';
      for (let i = 0; i < N; i++) {
        const sample = samples[i];
        let x = sample.x + sample.nx * normal[i] + sample.tx * tangent[i];
        let y = sample.y + sample.ny * normal[i] + sample.ty * tangent[i];
        const dx = x - CX;
        const dy = y - CY;
        const dist = Math.hypot(dx, dy);
        const maxR = 193;
        if (dist > maxR) {
          x = CX + (dx * maxR) / dist;
          y = CY + (dy * maxR) / dist;
        }
        d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      heroPath.setAttribute('d', d);
      heroPath.style.opacity = String(opacity);
    }

    function showFinal() {
      normal = new Array(N).fill(0);
      tangent = new Array(N).fill(0);
      render(1);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      showFinal();
    } else {
      let phaseIndex = 0;
      let phaseStarted = performance.now();
      let last = phaseStarted;
      let running = true;
      let rafId = 0;

      function enterPhase(name) {
        if (name === 'anneal') beginWalk();
        if (name === 'hold') showFinal();
      }

      enterPhase(phases[0].name);

      function frame(now) {
        if (!running || document.hidden) {
          rafId = 0;
          last = now;
          return;
        }
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        let elapsed = now - phaseStarted;
        if (elapsed >= phases[phaseIndex].ms) {
          phaseIndex = (phaseIndex + 1) % phases.length;
          phaseStarted = now;
          elapsed = 0;
          enterPhase(phases[phaseIndex].name);
        }
        const phase = phases[phaseIndex];
        const u = phase.ms ? elapsed / phase.ms : 1;
        if (phase.name === 'blank') {
          render(0);
        } else if (phase.name === 'anneal') {
          const temperature = temperatureOf(u);
          coolWalk(temperature, dt);
          const pathOpacity = Math.min(1, u / 0.12);
          render(pathOpacity);
        } else if (phase.name === 'hold') {
          render(1);
        } else {
          render(1 - u);
        }
        rafId = window.requestAnimationFrame(frame);
      }

      function start() {
        if (!rafId) {
          last = performance.now();
          rafId = window.requestAnimationFrame(frame);
        }
      }

      const heroSection = document.querySelector('#home');
      if (heroSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          running = entries[0].isIntersecting;
          if (running) start();
        });
        observer.observe(heroSection);
      }
      start();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && running) start();
      });
    }
  }

  /**
   * About: spaghetti, six points, every noisy link, then a wide hexagon walked once.
   */
  const aboutSvg = document.querySelector('#about-model');
  const aboutSpaghetti = document.querySelector('#about-spaghetti');
  const aboutChords = document.querySelector('#about-chords');
  const aboutWalk = document.querySelector('#about-walk');
  const aboutPoints = document.querySelector('#about-points');
  if (aboutSvg && aboutSpaghetti && aboutChords && aboutWalk && aboutPoints) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    const pts = [
      { x: 160, y: 155 },
      { x: 340, y: 62 },
      { x: 740, y: 62 },
      { x: 920, y: 155 },
      { x: 740, y: 248 },
      { x: 340, y: 248 }
    ];
    const center = { x: 540, y: 155 };
    const samplesPerChord = 20;
    const phases = [
      { name: 'spaghetti', ms: 2200 },
      { name: 'find', ms: 3200 },
      { name: 'pairs', ms: 2200 },
      { name: 'hex', ms: 2800 },
      { name: 'walk', ms: 2200 },
      { name: 'hold', ms: 1400 },
      { name: 'return', ms: 1100 }
    ];

    let spare = null;
    const ball = { x: 540, y: 155, rx: 470, ry: 138 };

    function mulberry32(seed) {
      return function () {
        seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const rand = mulberry32(20261020);

    function insideBall(x, y) {
      const nx = (x - ball.x) / ball.rx;
      const ny = (y - ball.y) / ball.ry;
      return nx * nx + ny * ny <= 1;
    }

    function addStrand(points) {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('opacity', '0.72');
      path.setAttribute('d', points.map((point, index) => (index === 0 ? 'M' : 'L') + point.x.toFixed(1) + ' ' + point.y.toFixed(1)).join(' '));
      aboutSpaghetti.appendChild(path);
    }

    pts.forEach((point, index) => {
      for (let arm = 0; arm < 5; arm++) {
        const angle = (arm / 5) * Math.PI + index * 0.37;
        function offset(step) {
          const along = step * 26;
          const wobble = (rand() - 0.5) * 52;
          return {
            x: point.x + Math.cos(angle) * along - Math.sin(angle) * wobble,
            y: point.y + Math.sin(angle) * along + Math.cos(angle) * wobble
          };
        }
        const left = [];
        for (let step = 1; step <= 7; step++) {
          const next = offset(-step);
          if (!insideBall(next.x, next.y)) break;
          left.push(next);
        }
        left.reverse();
        const right = [];
        for (let step = 1; step <= 7; step++) {
          const next = offset(step);
          if (!insideBall(next.x, next.y)) break;
          right.push(next);
        }
        const strand = left.concat([point], right);
        if (strand.length > 3) addStrand(strand);
      }
    });

    for (let i = 0; i < pts.length; i++) {
      const from = pts[i];
      const to = pts[(i + 1) % pts.length];
      const strand = [from];
      const steps = 7;
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.hypot(dx, dy) || 1;
        const wobble = Math.sin(t * Math.PI) * (rand() - 0.5) * 48;
        strand.push({
          x: from.x + dx * t + (-dy / len) * wobble,
          y: from.y + dy * t + (dx / len) * wobble
        });
      }
      strand.push(to);
      addStrand(strand);
    }

    for (let n = 0; n < 40; n++) {
      const angle = rand() * Math.PI * 2;
      const radius = Math.sqrt(rand()) * 0.75;
      let x = ball.x + Math.cos(angle) * ball.rx * radius;
      let y = ball.y + Math.sin(angle) * ball.ry * radius;
      let heading = rand() * Math.PI * 2;
      const strand = [{ x: x, y: y }];
      for (let s = 0; s < 11; s++) {
        heading += (rand() - 0.5) * 1.1;
        x += Math.cos(heading) * 24;
        y += Math.sin(heading) * 16;
        if (!insideBall(x, y)) break;
        strand.push({ x: x, y: y });
      }
      if (strand.length > 3) addStrand(strand);
    }

    function gaussian() {
      if (spare !== null) {
        const value = spare;
        spare = null;
        return value;
      }
      let u = 0;
      while (u === 0) u = Math.random();
      const v = Math.random();
      const mag = Math.sqrt(-2 * Math.log(u));
      spare = mag * Math.sin(2 * Math.PI * v);
      return mag * Math.cos(2 * Math.PI * v);
    }

    function bridge(scale) {
      const walk = [0];
      for (let i = 1; i < samplesPerChord; i++) walk.push(walk[i - 1] + gaussian());
      const end = walk[samplesPerChord - 1];
      let max = 0;
      const values = walk.map((value, i) => {
        const pinned = value - end * (i / (samplesPerChord - 1));
        max = Math.max(max, Math.abs(pinned));
        return pinned;
      });
      const scaled = values.map((value) => (max ? (value * scale) / max : 0));
      scaled[0] = scaled[samplesPerChord - 1] = 0;
      return scaled;
    }

    const pointNodes = pts.map((point, index) => {
      const group = document.createElementNS(svgNS, 'g');
      group.setAttribute('opacity', '0');
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', point.x);
      dot.setAttribute('cy', point.y);
      dot.setAttribute('r', '6.5');
      dot.setAttribute('fill', '#47b2e4');
      dot.setAttribute('stroke', '#ffffff');
      dot.setAttribute('stroke-width', '1.6');
      const outwardX = point.x - center.x;
      const outwardY = point.y - center.y;
      const outward = Math.hypot(outwardX, outwardY) || 1;
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', point.x + (outwardX / outward) * 26);
      text.setAttribute('y', point.y + (outwardY / outward) * 26);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#37517e');
      text.setAttribute('font-family', 'Jost, sans-serif');
      text.setAttribute('font-size', '18');
      text.setAttribute('font-weight', '600');
      text.textContent = labels[index];
      group.appendChild(dot);
      group.appendChild(text);
      aboutPoints.appendChild(group);
      return group;
    });

    const chords = [];
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('stroke-width', '4.125');
      path.setAttribute('opacity', '0');
      aboutChords.appendChild(path);
      chords.push({
        i: i,
        j: j,
        boundary: true,
        path: path,
        normal: new Array(samplesPerChord).fill(0)
      });
    }

    let walkLength = 0;
    aboutWalk.setAttribute('d', pts.map((point, index) => (index === 0 ? 'M' : 'L') + point.x + ' ' + point.y).join(' ') + ' Z');
    walkLength = aboutWalk.getTotalLength();
    aboutWalk.style.opacity = '0';

    function disturb(scale) {
      chords.forEach((chord) => {
        chord.normal = bridge(scale);
      });
    }

    function coolChords(temperature, dt) {
      const pull = 0.2 + 4 * (1 - temperature) * (1 - temperature);
      const sigma = 18 * Math.sqrt(Math.max(temperature, 0));
      const jitter = Math.sqrt(dt);
      const smooth = Math.min(0.45, dt * (4 + 16 * (1 - temperature)));
      chords.forEach((chord) => {
        const next = chord.normal.slice();
        for (let k = 1; k < samplesPerChord - 1; k++) {
          next[k] += -pull * chord.normal[k] * dt + gaussian() * sigma * jitter;
          next[k] = Math.max(-36, Math.min(36, next[k]));
        }
        if (smooth > 0) {
          const smoothed = next.slice();
          for (let k = 1; k < samplesPerChord - 1; k++) {
            smoothed[k] = next[k] * (1 - smooth) + 0.5 * (next[k - 1] + next[k + 1]) * smooth;
          }
          chord.normal = smoothed;
        } else {
          chord.normal = next;
        }
        chord.normal[0] = chord.normal[samplesPerChord - 1] = 0;
      });
    }

    function drawChord(chord) {
      const from = pts[chord.i];
      const to = pts[chord.j];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      let d = '';
      for (let k = 0; k < samplesPerChord; k++) {
        const t = k / (samplesPerChord - 1);
        let x = from.x + dx * t + nx * chord.normal[k];
        let y = from.y + dy * t + ny * chord.normal[k];
        x = Math.max(20, Math.min(1060, x));
        y = Math.max(18, Math.min(302, y));
        d += (k === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      chord.path.setAttribute('d', d);
    }

    function setPointOpacity(count) {
      pointNodes.forEach((node, index) => {
        const shown = Math.max(0, Math.min(1, count - index));
        node.setAttribute('opacity', String(shown));
      });
    }

    function showHexagon() {
      chords.forEach((chord) => {
        chord.normal = new Array(samplesPerChord).fill(0);
        drawChord(chord);
        chord.path.setAttribute('opacity', chord.boundary ? '1' : '0');
      });
      aboutSpaghetti.style.opacity = '0.14';
      setPointOpacity(6);
      aboutWalk.style.opacity = '0';
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showHexagon();
    } else {
      let phaseIndex = 0;
      let phaseStarted = 0;
      let clockStarted = false;
      let last = 0;
      let running = false;
      let rafId = 0;

      function enterPhase(name) {
        if (name === 'pairs') disturb(22);
        if (name === 'walk') {
          chords.forEach((chord) => {
            chord.normal = new Array(samplesPerChord).fill(0);
          });
        }
      }

      function frame(now) {
        if (!running || document.hidden) {
          rafId = 0;
          last = now;
          return;
        }
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        let elapsed = now - phaseStarted;
        if (elapsed >= phases[phaseIndex].ms) {
          phaseIndex = (phaseIndex + 1) % phases.length;
          phaseStarted = now;
          elapsed = 0;
          enterPhase(phases[phaseIndex].name);
        }
        const phase = phases[phaseIndex];
        const u = elapsed / phase.ms;
        let spaghettiOpacity = 1;
        let pointCount = 0;
        let chordOpacity = 0;
        let diagonalOpacity = 0;
        let temperature = 0;
        let walkOpacity = 0;
        let walkOffset = walkLength;

        if (phase.name === 'spaghetti') {
          spaghettiOpacity = 1;
        } else if (phase.name === 'find') {
          spaghettiOpacity = 1 - 0.86 * u;
          pointCount = u * 6;
        } else if (phase.name === 'pairs') {
          spaghettiOpacity = 0.14;
          pointCount = 6;
          chordOpacity = Math.min(1, u / 0.2);
          temperature = 1;
          coolChords(temperature, dt);
        } else if (phase.name === 'hex') {
          spaghettiOpacity = 0.14;
          pointCount = 6;
          chordOpacity = 1;
          temperature = Math.pow(1 - u, 1.5);
          coolChords(temperature, dt);
        } else if (phase.name === 'walk') {
          spaghettiOpacity = 0.14;
          pointCount = 6;
          chordOpacity = 1;
          diagonalOpacity = 0;
          walkOpacity = 1;
          walkOffset = walkLength * (1 - u);
        } else if (phase.name === 'hold') {
          spaghettiOpacity = 0.14;
          pointCount = 6;
          chordOpacity = 1;
          diagonalOpacity = 0;
          walkOpacity = 1;
          walkOffset = 0;
        } else {
          spaghettiOpacity = 0.14 + 0.86 * u;
          pointCount = 6 * (1 - u);
          chordOpacity = 1 - u;
          diagonalOpacity = 0;
          walkOpacity = 1 - u;
          walkOffset = 0;
        }

        aboutSpaghetti.style.opacity = String(spaghettiOpacity);
        setPointOpacity(pointCount);
        chords.forEach((chord) => {
          drawChord(chord);
          chord.path.setAttribute('opacity', String(chord.boundary ? chordOpacity : diagonalOpacity));
        });
        aboutWalk.style.strokeDasharray = String(walkLength);
        aboutWalk.style.strokeDashoffset = String(walkOffset);
        aboutWalk.style.opacity = String(walkOpacity);
        rafId = window.requestAnimationFrame(frame);
      }

      function start() {
        if (!clockStarted) {
          clockStarted = true;
          phaseStarted = performance.now();
          last = phaseStarted;
        }
        if (!rafId) {
          last = performance.now();
          rafId = window.requestAnimationFrame(frame);
        }
      }
      if (aboutSvg && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          running = entries[0].isIntersecting;
          if (running) start();
        }, { threshold: 0.2 });
        observer.observe(aboutSvg);
      } else {
        start();
      }
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && running) start();
      });
    }
  }

})();
