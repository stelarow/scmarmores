import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import LegacyInteractions from './legacy-interactions';
import { catalogCategories } from './catalogo/catalog-data';

const materialImageOverrides = {
  silestones: '/catalogo/editorial/silestones/pagina-004-imagem-02.webp',
  dekton: '/catalogo/editorial/dekton/pagina-013-imagem-02.webp',
  granitos: '/catalogo/editorial/granitos/pagina-024-imagem-01.webp',
  quartzitos: '/catalogo/editorial/quartzitos/pagina-035-imagem-02.webp',
  compacstones: '/catalogo/editorial/compacstones/pagina-045-imagem-02.webp',
  onix: '/catalogo/editorial/onix/pagina-048-imagem-01.webp',
  marmores: '/catalogo/editorial/marmores/pagina-053-imagem-02.webp',
  limestones: '/catalogo/editorial/limestones/pagina-064-imagem-02.webp',
  infinity: '/catalogo/editorial/infinity/pagina-066-imagem-02.webp',
  crystal: '/catalogo/editorial/crystal/pagina-071-imagem-02.webp',
};

const materialGallery = catalogCategories
  .map(
    (category) => `
      <a class="material-tile" href="/catalogo/${category.slug}">
        <img src="${materialImageOverrides[category.slug] || category.hero.src}" alt="Ambiente com aplicação de ${category.shortName || category.name}" loading="lazy" />
        <span class="material-tile-shade"></span>
        <span class="material-tile-meta">${category.eyebrow}</span>
        <strong>${category.shortName || category.name}</strong>
        <i aria-hidden="true">↗</i>
      </a>`,
  )
  .join('');

const replaceBrandPlaceholders = (html) => html.replace(
  /(<a\b[^>]*class="[^"]*\bbrand\b[^"]*"[^>]*>)[\s\S]*?<\/a>/gi,
  '$1<img class="brand-logo" src="/assets/sc-marmores-logo.jpg" alt="SC Mármores" /></a>',
);

const readLegacyPage = cache((filename) => {
  const source = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
  const bodyMatch = source.match(/<body(?:\s+class="([^"]*)")?[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error(`Não foi possível ler o conteúdo de ${filename}`);
  }

  let html = bodyMatch[2].replace(/<script\b[^>]*src="\/script\.js"[^>]*><\/script>/i, '');

  html = html
    .replaceAll('<a href="/#materiais">Materiais</a>', '<a href="/catalogo">Catálogo</a>')
    .replaceAll('<a href="#materiais">Materiais</a>', '<a href="/catalogo">Catálogo</a>');

  html = replaceBrandPlaceholders(html);

  if (filename === 'index.html') {
    html = html
      .replace(
        /<section class="hero">\s*<img[^>]+src="\/assets\/hero-cozinha\.webp"[^>]*\/>\s*<\/section>/i,
        `<section class="hero">
          <video class="hero-video" muted autoplay loop playsinline preload="auto" aria-hidden="true">
            <source src="/assets/hero-mobile-ping-pong.mp4" type="video/mp4" media="(max-width: 600px)" />
            <source src="/assets/hero-luzes-ping-pong.mp4" type="video/mp4" />
          </video>
          <div class="hero-content">
            <p>SC Mármores</p>
            <h1>Pedras sob medida<br />para transformar ambientes.</h1>
          </div>
          <a class="hero-proof" href="https://www.google.com/search?q=SCmarmores" target="_blank" rel="noreferrer" aria-label="Ver avaliações da SC Mármores no Google">
            <span class="hero-proof-inner">
              <span class="hero-proof-desktop">
                <span class="hero-proof-stars" aria-hidden="true">★★★★★</span>
                <strong>4,9 no Google</strong>
                <span>284 avaliações</span>
                <span>14 anos de experiência</span>
                <b aria-hidden="true">↗</b>
              </span>
              <span class="hero-proof-mobile">
                <span aria-hidden="true">★</span>
                <strong>4,9</strong>
                <span>284 avaliações</span>
                <span>14 anos</span>
                <b aria-hidden="true">↗</b>
              </span>
            </span>
          </a>
        </section>`,
      )
      .replace('<a href="#projetos">Projetos</a>', '<a href="#materiais">Materiais</a>')
      .replace(
        '<a class="header-cta project-form-trigger" href="#contato">Apresentar seu projeto <span>↗</span></a>',
        '<a class="header-cta" href="#contato">Fale conosco <span>↗</span></a>',
      )
      .replace(
        /<section class="manifesto"[\s\S]*?<\/section>/i,
        '',
      )
      .replace(/<section class="projects"[\s\S]*?<\/section>/i, '')
      .replace(
        '<p>Analisamos desenho, resistência, acabamento, manutenção e contexto de uso para indicar uma superfície tão adequada quanto bonita.</p>',
        '<p>Conheça as linhas e os modelos disponíveis na SC Mármores. Nossa equipe auxilia na avaliação de aparência, aplicação, acabamento e disponibilidade.</p><a class="text-link" href="/catalogo">Explorar o catálogo <span>→</span></a>',
      )
      .replace(
        'Cada família responde de forma diferente à luz, ao uso e ao desenho do ambiente. Organizamos a seleção pelo que importa para o projeto, não pela ordem de um catálogo.',
        'Explore diferentes cores, padrões e acabamentos. Se ainda não souber qual material escolher, nossa equipe ajuda a comparar as opções.',
      )
      .replace('Curadoria orientada pelo projeto', 'Opções para diferentes ambientes')
      .replace('Matéria escolhida<br />com intenção.', 'Encontre a pedra certa<br />para o seu ambiente.')
      .replace(
        /<div class="material-gallery"[\s\S]*?<\/div>\s*<\/section>/i,
        `<div class="material-gallery" aria-label="Curadoria de materiais SC Mármores">${materialGallery}</div></section>`,
      )
      .replaceAll('href="/marmores.html"', 'href="/catalogo/marmores"')
      .replaceAll('href="/quartzitos.html"', 'href="/catalogo/quartzitos"')
      .replaceAll('href="/granitos.html"', 'href="/catalogo/granitos"')
      .replace(
        '<a class="material" href="/superficies-especiais.html" data-material="Superfícies especiais" data-detail="Soluções selecionadas para grandes formatos, peças especiais e demandas específicas." data-color="oklch(0.82 0.11 61)">',
        '<a class="material" href="/catalogo" data-material="Catálogo completo" data-detail="Dez categorias reunidas conforme o catálogo SC Mármores 2025." data-color="oklch(0.82 0.11 61)">',
      )
      .replace('<span>04</span><strong>Superfícies especiais</strong><i>↗</i>', '<span>04</span><strong>Catálogo completo</strong><i>↗</i>')
      .replace(
        /<section class="process"[\s\S]*?<\/section>/i,
        `<section class="process" id="processo">
          <div class="process-title">
            <p>Do primeiro contato à instalação</p>
            <h2>Você não precisa<br />saber tudo para começar.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Conte o que você precisa</h3><p>Envie uma foto, referência, medida ou apenas explique qual ambiente deseja transformar.</p></div></li>
            <li><span>02</span><div><h3>Escolha com orientação</h3><p>Nossa equipe apresenta materiais, acabamentos e opções adequadas ao uso e ao resultado que você procura.</p></div></li>
            <li><span>03</span><div><h3>Produção e instalação</h3><p>Produzimos as peças sob medida e cuidamos da instalação para entregar o ambiente finalizado.</p></div></li>
          </ol>
        </section>`,
      )
      .replace(
        /<section class="contact" id="contato">/i,
        `<section class="trust" aria-labelledby="trust-title">
          <div class="trust-intro">
            <p>Confiança construída projeto após projeto</p>
            <h2 id="trust-title">Experiência que se confirma<br />na avaliação dos clientes.</h2>
            <span>Da escolha da pedra à instalação, cada etapa é conduzida com orientação, precisão e cuidado.</span>
          </div>
          <dl class="trust-numbers">
            <div>
              <dt>Experiência</dt>
              <dd><strong>14</strong><span>anos transformando pedras em ambientes</span></dd>
            </div>
            <div>
              <dt>Avaliação no Google</dt>
              <dd><strong>4,9</strong><span>de 5 estrelas</span></dd>
            </div>
            <div>
              <dt>Prova social</dt>
              <dd><strong>284</strong><span>avaliações de clientes</span></dd>
            </div>
          </dl>
          <a class="trust-link" href="https://www.google.com/search?q=SCmarmores" target="_blank" rel="noreferrer">
            <span>Ver avaliações no Google</span><b aria-hidden="true">↗</b>
          </a>
        </section>
        <section class="contact" id="contato">`,
      )
      .replace(
        /<section class="contact" id="contato">[\s\S]*?<\/section>/i,
        `<section class="contact contact-help" id="contato">
          <div class="contact-help-intro">
            <p>Fale conosco</p>
            <h2>Não sabe qual pedra escolher? Nós ajudamos.</h2>
            <span>Conte brevemente o que você precisa. Basta informar seu nome e telefone para nossa equipe entrar em contato.</span>
            <a class="contact-whatsapp-link" href="https://wa.me/554833692112?text=Olá%2C%20gostaria%20de%20falar%20com%20a%20SC%20Mármores." target="_blank" rel="noreferrer">Prefiro falar no WhatsApp <b>↗</b></a>
          </div>
          <form class="contact-form" id="contact-form">
            <label class="form-field">
              <span>Nome</span>
              <input type="text" name="nome" autocomplete="name" required />
            </label>
            <label class="form-field">
              <span>Telefone</span>
              <input type="tel" name="telefone" autocomplete="tel" placeholder="(00) 00000-0000" required />
            </label>
            <label class="form-field">
              <span>Observação <i>opcional</i></span>
              <textarea name="observacao" rows="4" placeholder="Conte sobre o ambiente, material ou dúvida"></textarea>
            </label>
            <button class="contact-submit" type="submit">Enviar contato <b>→</b></button>
            <p>Ao enviar, você será direcionado ao WhatsApp com as informações preenchidas.</p>
          </form>
        </section>`,
      )
      .replace(
        '<div><span>Comece seu projeto</span><a class="project-form-trigger" href="#contato">Apresentar seu projeto</a><a href="mailto:contato@scmarmores.com.br">Enviar plantas e referências</a></div>',
        '<div><span>Fale conosco</span><a href="#contato">Enviar uma mensagem</a><a href="https://wa.me/554833692112" target="_blank" rel="noreferrer">Conversar pelo WhatsApp</a></div>',
      )
      .replace('href="tel:+5500000000000">(00) 00000-0000</a>', 'href="tel:+554833692112">(48) 3369-2112</a>')
      .replace(/<dialog class="project-dialog"[\s\S]*?<\/dialog>/i, '');
  }

  if (filename.startsWith('projeto-')) {
    html = html.replace(/<section class="related-materials">[\s\S]*?<\/section>/i, '');
  }

  return {
    bodyClass: bodyMatch[1] ?? '',
    html,
  };
});

export default function LegacyPage({ filename }) {
  const page = readLegacyPage(filename);

  return (
    <>
      <div className={page.bodyClass || undefined} dangerouslySetInnerHTML={{ __html: page.html }} />
      <LegacyInteractions bodyClass={page.bodyClass} />
    </>
  );
}
