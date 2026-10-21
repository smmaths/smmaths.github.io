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
   * Hero: each load shows one of the cooling curve, the route, or the shear layer.
   */
  const heroSvg = document.querySelector('#hero-world');
  const heroAnneal = document.querySelector('#hero-anneal');
  const heroScenePick = document.querySelector('#hero-scene');
  const heroShearPick = document.querySelector('#hero-shear');
  if (heroSvg && heroAnneal && heroScenePick && heroShearPick) {
    const heroChoices = [
      {
        keep: heroAnneal,
        drop: [heroScenePick, heroShearPick],
        label: 'A globe. A rough random path cools into a smooth curve along one meridian.'
      },
      {
        keep: heroScenePick,
        drop: [heroAnneal, heroShearPick],
        label: 'A globe. Points appear, and a crossed route untangles into a short circuit along the sphere.'
      },
      {
        keep: heroShearPick,
        drop: [heroAnneal, heroScenePick],
        label: 'A globe. Two bands of spin slide past each other, and the boundary rolls up into vortices.'
      }
    ];
    const heroChoice = heroChoices[Math.floor(Math.random() * heroChoices.length)];
    heroSvg.setAttribute('aria-label', heroChoice.label);
    const heroTitle = heroSvg.querySelector('title');
    if (heroTitle) heroTitle.textContent = heroChoice.label;
    heroChoice.drop.forEach((el) => el.remove());
    heroChoice.keep.removeAttribute('hidden');
  }

  /**
   * Hero route: points on the near side of the globe, then a route that
   * untangles along the shorter arcs of the sphere.
   */
  const heroRoute = document.querySelector('#hero-route');
  const heroFlashes = document.querySelector('#hero-flashes');
  const heroRoutePoints = document.querySelector('#hero-points');
  const heroScene = document.querySelector('#hero-scene');
  if (heroRoute && heroFlashes && heroRoutePoints && heroScene) {
    const CX = 320;
    const CY = 320;
    const GLOBE_R = 200;
    const MAX_ANGLE = 58 * Math.PI / 180;
    const STRIKE_GAP = 150;
    const STRIKE_LEAD = 525;
    const DRAW_PAUSE = 380;
    const DRAW_MS = 760;
    const FRAME_MS = 280;
    const HOLD_MS = 5000;
    const FADE_MS = 850;

    function dot(a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    function dist(a, b) {
      return Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
    }

    function project(p) {
      return { x: CX + GLOBE_R * p.x, y: CY - GLOBE_R * p.y };
    }

    function slerp(a, b, t) {
      const omega = dist(a, b);
      if (omega < 1e-4) return a;
      const s = Math.sin(omega);
      const w1 = Math.sin((1 - t) * omega) / s;
      const w2 = Math.sin(t * omega) / s;
      return {
        x: w1 * a.x + w2 * b.x,
        y: w1 * a.y + w2 * b.y,
        z: w1 * a.z + w2 * b.z
      };
    }

    function placePoints(n) {
      const z0 = Math.cos(MAX_ANGLE);
      for (let min = 0.42; min >= 0.22; min -= 0.05) {
        const pts = [];
        for (let guard = 0; guard < 5000 && pts.length < n; guard++) {
          const z = z0 + Math.random() * (1 - z0);
          const theta = Math.random() * Math.PI * 2;
          const radial = Math.sqrt(Math.max(0, 1 - z * z));
          const p = { x: radial * Math.cos(theta), y: radial * Math.sin(theta), z: z };
          if (pts.every((q) => dist(q, p) >= min)) pts.push(p);
        }
        if (pts.length === n) return pts;
      }
      return [];
    }

    function tourLength(order, pts) {
      let sum = 0;
      for (let i = 0; i < order.length; i++) {
        sum += dist(pts[order[i]], pts[order[(i + 1) % order.length]]);
      }
      return sum;
    }

    function badTour(pts) {
      const around = pts.map((_, i) => i).sort((a, b) =>
        Math.atan2(pts[a].y, pts[a].x) - Math.atan2(pts[b].y, pts[b].x));
      const half = Math.floor(around.length / 2);
      const mixed = [];
      for (let i = 0; i < half; i++) {
        mixed.push(around[i], around[i + half]);
      }
      if (around.length % 2) mixed.push(around[around.length - 1]);
      return mixed;
    }

    function moveDelta(order, pts, i, j) {
      const n = order.length;
      const a = pts[order[(i - 1 + n) % n]];
      const b = pts[order[i]];
      const c = pts[order[j]];
      const d = pts[order[(j + 1) % n]];
      return dist(a, c) + dist(b, d) - dist(a, b) - dist(c, d);
    }

    function reverseSegment(order, i, j) {
      while (i < j) {
        const tmp = order[i];
        order[i] = order[j];
        order[j] = tmp;
        i += 1;
        j -= 1;
      }
    }

    function polish(order, pts) {
      const extra = [];
      const n = order.length;
      for (let guard = 0; guard < 40; guard++) {
        let best = -0.0015;
        let bi = -1;
        let bj = -1;
        for (let i = 0; i < n; i++) {
          for (let span = 2; span <= n - 2; span++) {
            const j = i + span - 1;
            if (j >= n) break;
            const change = moveDelta(order, pts, i, j);
            if (change < best) {
              best = change;
              bi = i;
              bj = j;
            }
          }
        }
        if (bi < 0) break;
        reverseSegment(order, bi, bj);
        extra.push(order.slice());
      }
      return extra;
    }

    function anneal(pts, order) {
      const frames = [order.slice()];
      const steps = 200;
      const n = order.length;
      for (let step = 0; step < steps; step++) {
        const temperature = 0.5 * Math.pow(0.02, step / (steps - 1));
        const span = 2 + Math.floor(Math.random() * (n - 3));
        const i = Math.floor(Math.random() * (n - span + 1));
        const j = i + span - 1;
        const change = moveDelta(order, pts, i, j);
        if (change < 0 || Math.random() < Math.exp(-change / temperature)) {
          reverseSegment(order, i, j);
          frames.push(order.slice());
        }
      }
      let kept = frames;
      if (frames.length > 24) {
        kept = [];
        const stride = (frames.length - 1) / 23;
        for (let i = 0; i < 24; i++) kept.push(frames[Math.round(i * stride)]);
      }
      return kept.concat(polish(order, pts));
    }

    function pathData(order, pts) {
      let d = '';
      let drawing = false;
      for (let i = 0; i < order.length; i++) {
        const a = pts[order[i]];
        const b = pts[order[(i + 1) % order.length]];
        const steps = Math.max(8, Math.ceil(dist(a, b) / (Math.PI / 48)));
        for (let s = 0; s <= steps; s++) {
          if (s === 0 && drawing) continue;
          const p = project(slerp(a, b, s / steps));
          d += (drawing ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1);
          drawing = true;
        }
      }
      return d;
    }

    function buildCycle() {
      const n = 9 + Math.floor(Math.random() * 3);
      const pts = placePoints(n);
      const order = badTour(pts);
      const frames = anneal(pts, order);
      return { pts, frames };
    }

    function paintPoints(pts, ageOf) {
      const pointNodes = heroRoutePoints.children;
      const flashNodes = heroFlashes.children;
      for (let i = 0; i < pts.length; i++) {
        const age = ageOf(i);
        const point = pointNodes[i];
        const flash = flashNodes[i];
        if (age < 0) {
          point.setAttribute('r', '0');
          flash.setAttribute('opacity', '0');
          continue;
        }
        const pop = Math.min(1, age / 220);
        const eased = 1 - Math.pow(1 - pop, 3);
        point.setAttribute('r', (6.5 * eased).toFixed(2));
        const flashAge = age / 380;
        if (flashAge < 1) {
          flash.setAttribute('r', (8 + flashAge * 30).toFixed(1));
          flash.setAttribute('opacity', (0.85 * (1 - flashAge)).toFixed(3));
        } else {
          flash.setAttribute('opacity', '0');
        }
        const hot = Math.max(0, 1 - age / 260);
        point.setAttribute('fill', hot > 0.35 ? '#ffffff' : '#47b2e4');
      }
    }

    function ensureNodes(n) {
      while (heroRoutePoints.children.length < n) {
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const flash = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttribute('r', '0');
        flash.setAttribute('r', '0');
        flash.setAttribute('opacity', '0');
        heroRoutePoints.appendChild(point);
        heroFlashes.appendChild(flash);
      }
      while (heroRoutePoints.children.length > n) {
        heroRoutePoints.removeChild(heroRoutePoints.lastChild);
        heroFlashes.removeChild(heroFlashes.lastChild);
      }
    }

    function layoutNodes(pts) {
      for (let i = 0; i < pts.length; i++) {
        const p = project(pts[i]);
        heroRoutePoints.children[i].setAttribute('cx', p.x.toFixed(1));
        heroRoutePoints.children[i].setAttribute('cy', p.y.toFixed(1));
        heroFlashes.children[i].setAttribute('cx', p.x.toFixed(1));
        heroFlashes.children[i].setAttribute('cy', p.y.toFixed(1));
      }
    }

    let cycle = null;
    let cycleStarted = 0;

    function startCycle(now) {
      cycle = buildCycle();
      cycleStarted = now;
      ensureNodes(cycle.pts.length);
      layoutNodes(cycle.pts);
      heroRoute.setAttribute('d', pathData(cycle.frames[0], cycle.pts));
      heroRoute.style.opacity = '0';
      heroRoute.style.strokeDasharray = '';
      heroRoute.style.strokeDashoffset = '0';
      heroScene.style.opacity = '1';
    }

    function showTour(order, pts, drawU) {
      heroRoute.setAttribute('d', pathData(order, pts));
      if (drawU < 1) {
        const length = heroRoute.getTotalLength();
        heroRoute.style.strokeDasharray = String(length);
        heroRoute.style.strokeDashoffset = String(length * (1 - drawU));
      } else {
        heroRoute.style.strokeDasharray = '';
        heroRoute.style.strokeDashoffset = '0';
      }
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      startCycle(0);
      const last = cycle.frames[cycle.frames.length - 1];
      showTour(last, cycle.pts, 1);
      paintPoints(cycle.pts, () => 1000);
    } else {
      let rafId = 0;
      let running = true;
      let pausedAt = 0;

      function tick(now) {
        if (!running || document.hidden) {
          if (!pausedAt) pausedAt = now;
          rafId = 0;
          return;
        }
        if (pausedAt) {
          cycleStarted += now - pausedAt;
          pausedAt = 0;
        }
        if (!cycle) startCycle(now);
        const t = now - cycleStarted;
        const n = cycle.pts.length;
        const strikeEnd = STRIKE_LEAD + n * STRIKE_GAP;
        const drawStart = strikeEnd + DRAW_PAUSE;
        const drawEnd = drawStart + DRAW_MS;
        const searchEnd = drawEnd + Math.max(0, cycle.frames.length - 1) * FRAME_MS;
        const holdEnd = searchEnd + HOLD_MS;
        const fadeEnd = holdEnd + FADE_MS;

        paintPoints(cycle.pts, (i) => t - (STRIKE_LEAD + i * STRIKE_GAP));

        if (t < drawStart) {
          heroRoute.style.opacity = '0';
        } else if (t < drawEnd) {
          heroRoute.style.opacity = '1';
          showTour(cycle.frames[0], cycle.pts, (t - drawStart) / DRAW_MS);
        } else if (t < searchEnd) {
          heroRoute.style.opacity = '1';
          const index = Math.min(
            cycle.frames.length - 1,
            1 + Math.floor((t - drawEnd) / FRAME_MS)
          );
          showTour(cycle.frames[index], cycle.pts, 1);
        } else if (t < holdEnd) {
          heroRoute.style.opacity = '1';
          showTour(cycle.frames[cycle.frames.length - 1], cycle.pts, 1);
        } else if (t < fadeEnd) {
          showTour(cycle.frames[cycle.frames.length - 1], cycle.pts, 1);
          heroScene.style.opacity = String(1 - (t - holdEnd) / FADE_MS);
        } else {
          startCycle(now);
        }
        rafId = window.requestAnimationFrame(tick);
      }

      function start() {
        if (!rafId) rafId = window.requestAnimationFrame(tick);
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
   * Hero shear: two bands of spin on the globe. Their boundary rolls up into vortices.
   */
  const heroShear = document.querySelector('#hero-shear');
  const heroShearWinds = document.querySelector('#hero-shear-winds');
  const heroShearDye = document.querySelector('#hero-shear-dye');
  const heroShearDots = document.querySelector('#hero-shear-dots');
  if (heroShear && heroShearWinds && heroShearDye && heroShearDots) {
    const CX = 320;
    const CY = 320;
    const R = 200;
    const S0 = 0.75;
    const BETA0 = 18;
    const HOLD_END = 7.6;
    const FADE_END = 8.5;

    function norm(v) {
      const m = Math.hypot(v.x, v.y, v.z) || 1;
      return { x: v.x / m, y: v.y / m, z: v.z / m };
    }
    function front(x, y) {
      return norm({ x: x, y: y, z: Math.sqrt(Math.max(0.04, 1 - x * x - y * y)) });
    }
    function cross(a, b) {
      return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
    }
    function dot(a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    function ang(a, b) {
      return Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
    }
    function project(p) {
      return { x: CX + R * p.x, y: CY - R * p.y };
    }

    let blobs = [];
    let dye = [];
    const WIND = [];
    for (let j = -3; j <= 3; j++) {
      for (let i = -4; i <= 4; i++) {
        const x = i * 0.16;
        const y = j * 0.155;
        if (x * x + y * y > 0.58) continue;
        WIND.push(front(x, y));
      }
    }

    function velocity(p, skip) {
      let x = 0;
      let y = 0;
      let z = 0;
      for (let k = 0; k < blobs.length; k++) {
        if (k === skip) continue;
        const c = blobs[k].p;
        const align = dot(p, c);
        const amp = blobs[k].s * Math.exp(blobs[k].beta * (align - 1));
        const u = cross(p, c);
        x += amp * u.x;
        y += amp * u.y;
        z += amp * u.z;
      }
      return { x: x, y: y, z: z };
    }
    function advect(p, u) {
      const speed = Math.hypot(u.x, u.y, u.z);
      if (speed < 1e-8) return p;
      const step = Math.min(0.0038, speed * 0.0135);
      const h = step / speed;
      return norm({ x: p.x + u.x * h, y: p.y + u.y * h, z: p.z + u.z * h });
    }
    function recenter() {
      let c = { x: 0, y: 0, z: 0 };
      let w = 0;
      for (let i = 0; i < blobs.length; i++) {
        const a = Math.abs(blobs[i].s);
        c.x += a * blobs[i].p.x;
        c.y += a * blobs[i].p.y;
        c.z += a * blobs[i].p.z;
        w += a;
      }
      c = norm(c);
      const axisRaw = cross(c, { x: 0, y: 0, z: 1 });
      const sin = Math.hypot(axisRaw.x, axisRaw.y, axisRaw.z);
      if (sin < 1e-5) return;
      const axis = norm(axisRaw);
      const cos = Math.max(-1, Math.min(1, c.z));
      function apply(p) {
        const kxp = cross(axis, p);
        const kd = dot(axis, p);
        return norm({
          x: p.x * cos + kxp.x * sin + axis.x * kd * (1 - cos),
          y: p.y * cos + kxp.y * sin + axis.y * kd * (1 - cos),
          z: p.z * cos + kxp.z * sin + axis.z * kd * (1 - cos)
        });
      }
      for (let i = 0; i < blobs.length; i++) blobs[i].p = apply(blobs[i].p);
      for (let i = 0; i < dye.length; i++) dye[i] = apply(dye[i]);
    }
    function mergeBlobs() {
      let guard = 0;
      let changed = true;
      while (changed && guard < 6) {
        changed = false;
        guard += 1;
        for (let i = 0; i < blobs.length && !changed; i++) {
          for (let j = i + 1; j < blobs.length; j++) {
            if (blobs[i].s * blobs[j].s <= 0) continue;
            if (ang(blobs[i].p, blobs[j].p) > 0.095) continue;
            const s = blobs[i].s + blobs[j].s;
            blobs[i] = {
              p: norm({
                x: blobs[i].s * blobs[i].p.x + blobs[j].s * blobs[j].p.x,
                y: blobs[i].s * blobs[i].p.y + blobs[j].s * blobs[j].p.y,
                z: blobs[i].s * blobs[i].p.z + blobs[j].s * blobs[j].p.z
              }),
              s: s,
              beta: Math.max(5.5, (blobs[i].beta + blobs[j].beta) * 0.46)
            };
            blobs.splice(j, 1);
            changed = true;
            break;
          }
        }
      }
    }
    function buildShear() {
      const phase = Math.random() * Math.PI;
      const count = 12;
      blobs = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const x = -0.52 + t * 1.04;
        const wave = 0.04 * Math.sin(4 * Math.PI * t + phase);
        blobs.push({ p: front(x, 0.055 + wave), s: S0, beta: BETA0 });
        blobs.push({ p: front(x, -0.055 - wave), s: -S0, beta: BETA0 });
      }
      dye = [];
      const dyeCount = 140;
      for (let i = 0; i < dyeCount; i++) {
        const t = i / (dyeCount - 1);
        dye.push(front(-0.5 + t * 1.0, 0.012 * Math.sin(4 * Math.PI * t + phase)));
      }
    }
    function stepShear() {
      const blobVel = blobs.map((b, i) => velocity(b.p, i));
      for (let i = 0; i < blobs.length; i++) blobs[i].p = advect(blobs[i].p, blobVel[i]);
      for (let i = 0; i < dye.length; i++) dye[i] = advect(dye[i], velocity(dye[i], -1));
      recenter();
      mergeBlobs();
    }
    function dyePath() {
      let d = '';
      let pen = false;
      let prev = null;
      for (let i = 0; i < dye.length; i++) {
        const p = dye[i];
        if (p.z < 0.1 || (prev && ang(prev, p) > 0.2)) pen = false;
        if (p.z < 0.1) {
          prev = null;
          continue;
        }
        const s = project(p);
        d += (pen ? 'L' : 'M') + s.x.toFixed(1) + ' ' + s.y.toFixed(1);
        pen = true;
        prev = p;
      }
      return d;
    }
    function windPath() {
      let d = '';
      const gain = 0.28 * R;
      for (let i = 0; i < WIND.length; i++) {
        const p = WIND[i];
        const u = velocity(p, -1);
        const vx = u.x;
        const vy = -u.y;
        const mag = Math.hypot(vx, vy);
        if (mag < 1e-6) continue;
        const len = Math.min(18, mag * gain);
        if (len < 2.4) continue;
        const s = project(p);
        const ux = vx / mag;
        const uy = vy / mag;
        const x1 = s.x + ux * len;
        const y1 = s.y + uy * len;
        d += 'M' + s.x.toFixed(1) + ' ' + s.y.toFixed(1) + 'L' + x1.toFixed(1) + ' ' + y1.toFixed(1);
        if (len > 6.5) {
          const head = 3.1;
          const wing = 1.7;
          const lx = x1 - ux * head - uy * wing;
          const ly = y1 - uy * head + ux * wing;
          const rx = x1 - ux * head + uy * wing;
          const ry = y1 - uy * head - ux * wing;
          d += 'M' + lx.toFixed(1) + ' ' + ly.toFixed(1) + 'L' + x1.toFixed(1) + ' ' + y1.toFixed(1);
          d += 'L' + rx.toFixed(1) + ' ' + ry.toFixed(1);
        }
      }
      return d;
    }
    function paintShear(sim) {
      heroShearWinds.setAttribute('d', windPath());
      heroShearDye.setAttribute('d', dyePath());
      while (heroShearDots.children.length < blobs.length) {
        heroShearDots.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
      }
      while (heroShearDots.children.length > blobs.length) heroShearDots.removeChild(heroShearDots.lastChild);
      const pop = Math.min(1, sim / 0.45);
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const s = project(b.p);
        const depth = Math.min(1, Math.max(0, (b.p.z - 0.05) / 0.3));
        const dot = heroShearDots.children[i];
        dot.setAttribute('cx', s.x.toFixed(1));
        dot.setAttribute('cy', s.y.toFixed(1));
        dot.setAttribute('r', (3.15 * Math.sqrt(Math.abs(b.s) / S0) * pop * depth).toFixed(2));
        dot.setAttribute('fill', b.s > 0 ? '#47b2e4' : '#f4f7fb');
      }
      const fadeIn = Math.min(1, sim / 0.4);
      const fadeOut = sim > HOLD_END ? Math.max(0, 1 - (sim - HOLD_END) / (FADE_END - HOLD_END)) : 1;
      heroShear.style.opacity = String(fadeIn * fadeOut);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      buildShear();
      for (let i = 0; i < 320; i++) stepShear();
      paintShear(2);
      heroShear.style.opacity = '1';
    } else {
      buildShear();
      let sim = 0;
      let acc = 0;
      let last = 0;
      let rafId = 0;
      let running = true;

      function tick(now) {
        if (!running || document.hidden) {
          last = 0;
          rafId = 0;
          return;
        }
        if (!last) last = now;
        acc += Math.min(0.05, (now - last) / 1000);
        last = now;
        let guard = 0;
        while (acc >= 1 / 60 && guard < 4) {
          sim += 1 / 60;
          if (sim > FADE_END) {
            sim = 0;
            buildShear();
          }
          if (sim > 0.9) stepShear();
          acc -= 1 / 60;
          guard += 1;
        }
        paintShear(sim);
        rafId = window.requestAnimationFrame(tick);
      }

      function start() {
        if (!rafId) rafId = window.requestAnimationFrame(tick);
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
   * Hero path: a Brownian bridge cooled by simulated annealing onto one meridian.
   */
  const heroPath = document.querySelector('#hero-anneal-path');
  const heroAnnealPoints = document.querySelector('#hero-anneal-points');
  if (heroPath && heroAnnealPoints) {
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
   * About: spaghetti finds six points, then those same strands straighten into the hexagon.
   */
  const aboutSvg = document.querySelector('#about-model');
  const aboutSpaghetti = document.querySelector('#about-spaghetti');
  const aboutWalk = document.querySelector('#about-walk');
  const aboutPoints = document.querySelector('#about-points');
  if (aboutSvg && aboutSpaghetti && aboutWalk && aboutPoints) {
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
    const phases = [
      { name: 'spaghetti', ms: 2200 },
      { name: 'find', ms: 3200 },
      { name: 'resolve', ms: 4200 },
      { name: 'walk', ms: 2200 },
      { name: 'hold', ms: 1400 },
      { name: 'return', ms: 1600 }
    ];

    const ball = { x: 540, y: 155, rx: 470, ry: 138 };
    const strands = [];

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

    function pathData(points) {
      return points.map((point, index) => (index === 0 ? 'M' : 'L') + point.x.toFixed(1) + ' ' + point.y.toFixed(1)).join(' ');
    }

    function addNoise(points) {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', pathData(points));
      path.setAttribute('opacity', '0.72');
      aboutSpaghetti.appendChild(path);
      strands.push({ role: 'noise', points: points, path: path });
    }

    function addEdge(from, to, wobbleScale, primary) {
      const steps = 18;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const points = [];
      const straight = [];
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const envelope = Math.sin(t * Math.PI);
        const wobble = envelope * ((rand() - 0.5) * wobbleScale + Math.sin(t * Math.PI * 3) * (rand() - 0.5) * wobbleScale * 0.55);
        straight.push({ x: from.x + dx * t, y: from.y + dy * t });
        points.push({ x: from.x + dx * t + nx * wobble, y: from.y + dy * t + ny * wobble });
      }
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', pathData(points));
      path.setAttribute('opacity', '0.72');
      aboutSpaghetti.appendChild(path);
      strands.push({ role: 'edge', points: points, straight: straight, path: path, primary: primary });
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
        if (strand.length > 3) addNoise(strand);
      }
    });

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
      if (strand.length > 3) addNoise(strand);
    }

    for (let i = 0; i < pts.length; i++) {
      const from = pts[i];
      const to = pts[(i + 1) % pts.length];
      [96, 72, 48].forEach((scale, index) => addEdge(from, to, scale, index === 0));
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

    let walkLength = 0;
    aboutWalk.setAttribute('d', pts.map((point, index) => (index === 0 ? 'M' : 'L') + point.x + ' ' + point.y).join(' ') + ' Z');
    walkLength = aboutWalk.getTotalLength();
    aboutWalk.style.opacity = '0';

    function smoothstep(u) {
      const t = Math.max(0, Math.min(1, u));
      return t * t * (3 - 2 * t);
    }

    function edgeColor(t) {
      const r = Math.round(55 + (71 - 55) * t);
      const g = Math.round(81 + (178 - 81) * t);
      const b = Math.round(126 + (228 - 126) * t);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function renderStrands(settle, noiseOpacity) {
      strands.forEach((strand) => {
        if (strand.role === 'noise') {
          strand.path.setAttribute('opacity', String(0.72 * noiseOpacity));
          return;
        }
        const drawn = strand.points.map((point, index) => ({
          x: point.x + (strand.straight[index].x - point.x) * settle,
          y: point.y + (strand.straight[index].y - point.y) * settle
        }));
        strand.path.setAttribute('d', pathData(drawn));
        if (strand.primary) {
          strand.path.setAttribute('opacity', String(0.72 + 0.28 * settle));
          strand.path.setAttribute('stroke', edgeColor(settle));
          strand.path.setAttribute('stroke-width', String(1.35 + (4.125 - 1.35) * settle));
        } else {
          strand.path.setAttribute('opacity', String(0.72 * (1 - settle)));
        }
      });
    }

    function setPointOpacity(count) {
      pointNodes.forEach((node, index) => {
        const shown = Math.max(0, Math.min(1, count - index));
        node.setAttribute('opacity', String(shown));
      });
    }

    function showHexagon() {
      renderStrands(1, 0);
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

      function frame(now) {
        if (!running || document.hidden) {
          rafId = 0;
          last = now;
          return;
        }
        last = now;
        let elapsed = now - phaseStarted;
        if (elapsed >= phases[phaseIndex].ms) {
          phaseIndex = (phaseIndex + 1) % phases.length;
          phaseStarted = now;
          elapsed = 0;
        }
        const phase = phases[phaseIndex];
        const u = elapsed / phase.ms;
        const eased = smoothstep(u);
        let settle = 0;
        let noiseOpacity = 1;
        let pointCount = 0;
        let walkOpacity = 0;
        let walkOffset = walkLength;

        if (phase.name === 'spaghetti') {
          settle = 0;
          noiseOpacity = 1;
        } else if (phase.name === 'find') {
          settle = 0;
          noiseOpacity = 1 - 0.35 * u;
          pointCount = u * 6;
        } else if (phase.name === 'resolve') {
          settle = eased;
          noiseOpacity = 1 - eased;
          pointCount = 6;
        } else if (phase.name === 'walk') {
          settle = 1;
          noiseOpacity = 0;
          pointCount = 6;
          walkOpacity = 1;
          walkOffset = walkLength * (1 - u);
        } else if (phase.name === 'hold') {
          settle = 1;
          noiseOpacity = 0;
          pointCount = 6;
          walkOpacity = 1;
          walkOffset = 0;
        } else {
          settle = 1 - eased;
          noiseOpacity = eased;
          pointCount = 6 * (1 - u);
          walkOpacity = Math.max(0, 1 - u / 0.35);
          walkOffset = 0;
        }

        renderStrands(settle, noiseOpacity);
        setPointOpacity(pointCount);
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
