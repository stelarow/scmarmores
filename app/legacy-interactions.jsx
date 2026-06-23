'use client';

import { useEffect } from 'react';

export default function LegacyInteractions({ bodyClass }) {
  useEffect(() => {
    document.body.className = bodyClass;

    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navigationEntry?.type === 'reload';

    if (document.querySelector('.hero') && isReload) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      if (window.location.hash) {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const heroVideo = document.querySelector('.hero-video');
    let removeHeroPlaybackListeners = () => {};
    if (heroVideo) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updateHeroPlayback = () => {
        heroVideo.defaultPlaybackRate = 1;
        heroVideo.playbackRate = 1;

        if (reducedMotion.matches) {
          heroVideo.pause();
          heroVideo.currentTime = 0;
          return;
        }

        heroVideo.play().catch(() => {});
      };

      heroVideo.addEventListener('loadedmetadata', updateHeroPlayback);
      reducedMotion.addEventListener('change', updateHeroPlayback);
      removeHeroPlaybackListeners = () => {
        heroVideo.removeEventListener('loadedmetadata', updateHeroPlayback);
        reducedMotion.removeEventListener('change', updateHeroPlayback);
      };
      updateHeroPlayback();
    }

    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');
    const header = document.querySelector('.site-header');
    const listeners = [];
    const listen = (target, event, handler, options) => {
      target?.addEventListener(event, handler, options);
      if (target) listeners.push(() => target.removeEventListener(event, handler, options));
    };

    let headerUpdateQueued = false;
    const updateHeader = () => {
      header?.classList.toggle('scrolled', window.scrollY > 24);
      headerUpdateQueued = false;
    };
    const handleScroll = () => {
      if (headerUpdateQueued) return;
      headerUpdateQueued = true;
      requestAnimationFrame(updateHeader);
    };
    updateHeader();
    listen(window, 'scroll', handleScroll, { passive: true });

    listen(toggle, 'click', () => {
      const open = toggle.classList.toggle('open');
      nav?.classList.toggle('open', open);
      header?.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    nav?.querySelectorAll('a').forEach((link) => listen(link, 'click', () => {
      toggle?.classList.remove('open');
      nav.classList.remove('open');
      header?.classList.remove('menu-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }));

    document.querySelectorAll('a[href="#topo"]').forEach((link) => listen(link, 'click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash !== '#topo') history.pushState(null, '', '#topo');
    }));

    const preview = document.querySelector('.material-preview');
    const updateMaterial = (button) => {
      document.querySelectorAll('.material').forEach((item) => item.classList.toggle('active', item === button));
      if (!preview) return;
      preview.querySelector('span').style.background = button.dataset.color;
      preview.querySelector('strong').textContent = button.dataset.material;
      preview.querySelector('p').textContent = button.dataset.detail;
    };
    document.querySelectorAll('.material').forEach((button) => {
      listen(button, 'mouseenter', () => updateMaterial(button));
      listen(button, 'focus', () => updateMaterial(button));
    });

    const year = document.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();

    const mapFrame = document.querySelector('.lazy-map-frame');
    let mapObserver;
    if (mapFrame?.dataset.src) {
      const loadMap = () => {
        if (!mapFrame.src) mapFrame.src = mapFrame.dataset.src;
      };

      if ('IntersectionObserver' in window) {
        mapObserver = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          loadMap();
          mapObserver.disconnect();
        }, { rootMargin: '700px 0px' });
        mapObserver.observe(mapFrame);
      } else {
        loadMap();
      }
    }

    const formatPhone = (input) => {
      const digits = input.value.replace(/\D/g, '').slice(0, 11);
      const areaCode = digits.slice(0, 2);
      const firstPart = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
      const lastPart = digits.length > 10 ? digits.slice(7) : digits.slice(6);
      input.value = [
        areaCode ? `(${areaCode}` : '',
        areaCode.length === 2 ? ') ' : '',
        firstPart,
        lastPart ? `-${lastPart}` : '',
      ].join('');
    };

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      const phoneInput = contactForm.elements.telefone;
      listen(phoneInput, 'input', () => formatPhone(phoneInput));
      listen(contactForm, 'submit', (event) => {
        event.preventDefault();
        if (!contactForm.checkValidity()) return contactForm.reportValidity();
        const data = new FormData(contactForm);
        const message = [
          'Olá, gostaria de falar com a SC Mármores.',
          '',
          `Nome: ${data.get('nome')}`,
          `Telefone: ${data.get('telefone')}`,
          `Observação: ${data.get('observacao') || 'Não informada'}`,
        ].join('\n');
        window.open(`https://wa.me/554833692112?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      });
    }

    const projectDialog = document.querySelector('#project-dialog');
    const projectForm = document.querySelector('#project-form');
    if (projectDialog && projectForm) {
      const steps = [...projectForm.querySelectorAll('.form-step')];
      const progressItems = [...projectForm.querySelectorAll('[data-progress]')];
      const setStep = (stepNumber) => {
        steps.forEach((step) => step.classList.toggle('active', Number(step.dataset.step) === stepNumber));
        progressItems.forEach((item) => item.classList.toggle('active', Number(item.dataset.progress) <= stepNumber));
        projectDialog.querySelector('.project-dialog-content').scrollTo({ top: 0, behavior: 'smooth' });
      };
      const validateStep = (step) => {
        const invalidField = [...step.querySelectorAll('input, select, textarea')].find((field) => !field.checkValidity());
        if (!invalidField) return true;
        invalidField.reportValidity();
        return false;
      };

      document.querySelectorAll('.project-form-trigger').forEach((trigger) => listen(trigger, 'click', (event) => {
        event.preventDefault();
        projectDialog.showModal();
      }));
      projectDialog.querySelectorAll('.dialog-close').forEach((button) => listen(button, 'click', () => projectDialog.close()));
      listen(projectDialog, 'click', (event) => {
        if (event.target === projectDialog) projectDialog.close();
      });
      listen(projectForm.querySelector('.form-next'), 'click', () => {
        if (validateStep(steps[0])) setStep(2);
      });
      listen(projectForm.querySelector('.form-back'), 'click', () => setStep(1));

      const phoneInput = projectForm.elements.telefone;
      listen(phoneInput, 'input', () => formatPhone(phoneInput));

      listen(projectForm, 'submit', (event) => {
        event.preventDefault();
        if (!projectForm.checkValidity()) return projectForm.reportValidity();
        const data = new FormData(projectForm);
        const message = [
          'Olá, gostaria de apresentar um projeto para a SC Mármores.',
          '',
          `Nome: ${data.get('nome')}`,
          `Perfil: ${data.get('perfil')}`,
          `Tipo de projeto: ${data.get('tipo_projeto')}`,
          `Pedra ou superfície: ${data.get('pedra')}`,
          `Momento do projeto: ${data.get('momento')}`,
          `Cidade da obra: ${data.get('cidade')}`,
          `Prazo desejado: ${data.get('prazo')}`,
          `WhatsApp: ${data.get('telefone')}`,
          `E-mail: ${data.get('email')}`,
          '',
          `Detalhes: ${data.get('descricao') || 'Não informado'}`,
        ].join('\n');
        window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
        projectDialog.close();
      });
    }

    const cleanupReveal = setupScrollReveal();

    return () => {
      listeners.forEach((remove) => remove());
      removeHeroPlaybackListeners();
      mapObserver?.disconnect();
      cleanupReveal?.();
      if (heroVideo) {
        heroVideo.pause();
      }
      document.body.className = '';
    };
  }, [bodyClass]);

  return null;
}

/* Sistema de revelação por scroll ("Editorial Reveal").
 * - IntersectionObserver (sem scroll listener para animar).
 * - Apenas transform + opacity (sem reflow/CLS).
 * - Revela uma vez e desobserva.
 * - Stagger por grupo (30-90ms).
 * - Count-up dos números de confiança.
 * - Respeita prefers-reduced-motion (nada é ocultado). */
function setupScrollReveal() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const SINGLE_REVEAL = [
    '.materials-heading',
    '.process-title',
    '.trust-intro',
    '.home-blog-heading',
    '.location-heading',
    '.catalog-intro',
    '.catalog-index-heading',
    '.catalog-disclaimer',
    '.blog-index-heading',
    '.about-values-heading',
    '.about-products-heading',
    '.about-formation',
    '.suppliers-heading',
    'footer',
  ];

  const STAGGER_GROUPS = [
    { selector: '.material-gallery .material-tile', step: 45 },
    { selector: '.process li', step: 70 },
    { selector: '.trust-numbers > div', step: 90 },
    { selector: '.home-blog-grid .home-blog-card', step: 60 },
    { selector: '.location-shell > *', step: 80 },
    { selector: '.blog-post-list li', step: 40 },
    { selector: '.catalog-category-list li', step: 40 },
    { selector: '.about-value', step: 70 },
    { selector: '.about-products-list li', step: 40 },
    { selector: '.related-links a', step: 50 },
  ];

  const COUNT_TARGETS = '.trust-numbers strong';

  let observer;
  let countObserver;
  const marked = [];
  const originals = new Map();

  try {
    document.documentElement.classList.add('scroll-reveal');

    SINGLE_REVEAL.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.setAttribute('data-reveal', '');
        marked.push(el);
      });
    });

    STAGGER_GROUPS.forEach(({ selector, step }) => {
      document.querySelectorAll(selector).forEach((item, index) => {
        item.setAttribute('data-reveal', '');
        item.style.transitionDelay = `${Math.min(index * step, 480)}ms`;
        marked.push(item);
      });
    });

    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    marked.forEach((el) => observer.observe(el));

    const animateCount = (el) => {
      const raw = el.textContent.trim();
      originals.set(el, raw);
      const target = parseFloat(raw.replace(',', '.'));
      if (Number.isNaN(target)) { el.textContent = raw; return; }
      const hasDecimal = raw.includes(',') || raw.includes('.');
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = hasDecimal ? value.toFixed(1).replace('.', ',') : Math.round(value).toString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = raw;
      };
      requestAnimationFrame(tick);
    };

    countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(COUNT_TARGETS).forEach((el) => countObserver.observe(el));
  } catch (error) {
    observer?.disconnect();
    countObserver?.disconnect();
    document.documentElement.classList.remove('scroll-reveal');
    marked.forEach((el) => { el.classList.remove('is-revealed'); el.removeAttribute('data-reveal'); el.style.transitionDelay = ''; });
    originals.forEach((text, el) => { el.textContent = text; });
    return;
  }

  return () => {
    observer?.disconnect();
    countObserver?.disconnect();
    document.documentElement.classList.remove('scroll-reveal');
    marked.forEach((el) => { el.classList.remove('is-revealed'); el.removeAttribute('data-reveal'); el.style.transitionDelay = ''; });
    originals.forEach((text, el) => { el.textContent = text; });
  };
}
