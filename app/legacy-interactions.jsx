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
      listen(phoneInput, 'input', () => {
        const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
        const areaCode = digits.slice(0, 2);
        const firstPart = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
        const lastPart = digits.length > 10 ? digits.slice(7) : digits.slice(6);
        phoneInput.value = [
          areaCode ? `(${areaCode}` : '',
          areaCode.length === 2 ? ') ' : '',
          firstPart,
          lastPart ? `-${lastPart}` : '',
        ].join('');
      });

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

    return () => {
      listeners.forEach((remove) => remove());
      document.body.className = '';
    };
  }, [bodyClass]);

  return null;
}
