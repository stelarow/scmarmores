const navigationEntry = performance.getEntriesByType('navigation')[0];
const isReload = navigationEntry
  ? navigationEntry.type === 'reload'
  : performance.navigation?.type === performance.navigation.TYPE_RELOAD;

if (document.querySelector('.hero') && isReload) {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  if (window.location.hash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }

  const resetToHero = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  resetToHero();
  window.addEventListener('pageshow', () => requestAnimationFrame(resetToHero), { once: true });
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const header = document.querySelector('.site-header');

let headerUpdateQueued = false;

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  headerUpdateQueued = false;
};

updateHeader();
window.addEventListener('scroll', () => {
  if (headerUpdateQueued) return;
  headerUpdateQueued = true;
  requestAnimationFrame(updateHeader);
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  nav.classList.toggle('open', open);
  header.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    nav.classList.remove('open');
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const preview = document.querySelector('.material-preview');
document.querySelectorAll('.material').forEach((button) => {
  button.addEventListener('mouseenter', () => updateMaterial(button));
  button.addEventListener('focus', () => updateMaterial(button));
});

function updateMaterial(button) {
  document.querySelectorAll('.material').forEach((item) => item.classList.toggle('active', item === button));
  preview.querySelector('span').style.background = button.dataset.color;
  preview.querySelector('strong').textContent = button.dataset.material;
  preview.querySelector('p').textContent = button.dataset.detail;
}

document.querySelector('#year').textContent = new Date().getFullYear();

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
    const fields = [...step.querySelectorAll('input, select, textarea')];
    const invalidField = fields.find((field) => !field.checkValidity());

    if (invalidField) {
      invalidField.reportValidity();
      return false;
    }

    return true;
  };

  document.querySelectorAll('.project-form-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      projectDialog.showModal();
    });
  });

  projectDialog.querySelectorAll('.dialog-close').forEach((button) => {
    button.addEventListener('click', () => projectDialog.close());
  });

  projectDialog.addEventListener('click', (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });

  projectForm.querySelector('.form-next').addEventListener('click', () => {
    if (validateStep(steps[0])) setStep(2);
  });

  projectForm.querySelector('.form-back').addEventListener('click', () => setStep(1));

  const phoneInput = projectForm.elements.telefone;
  phoneInput.addEventListener('input', () => {
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

  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!projectForm.checkValidity()) {
      projectForm.reportValidity();
      return;
    }

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
