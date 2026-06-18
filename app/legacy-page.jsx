import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { blogPosts } from './blog/blog-data';
import LegacyInteractions from './legacy-interactions';

const homeMaterials = [
  {
    slug: 'silestones',
    name: 'Silestones',
    eyebrow: 'Desenho controlado',
    image: '/catalogo/editorial/silestones/pagina-004-imagem-02.webp',
  },
  {
    slug: 'dekton',
    name: 'Dekton',
    eyebrow: 'Amplitude de linguagem',
    image: '/catalogo/editorial/dekton/pagina-013-imagem-02.webp',
  },
  {
    slug: 'granitos',
    name: 'Granitos',
    eyebrow: 'Resistência natural',
    image: '/catalogo/editorial/granitos/pagina-024-imagem-01.webp',
  },
  {
    slug: 'quartzitos',
    name: 'Quartzitos',
    eyebrow: 'Força e expressão',
    image: '/catalogo/editorial/quartzitos/pagina-035-imagem-02.webp',
  },
  {
    slug: 'quartzos',
    name: 'Quartzos',
    eyebrow: 'Uniformidade mineral',
    image: '/catalogo/editorial/compacstones/pagina-045-imagem-02.webp',
  },
  {
    slug: 'onix',
    name: 'Ônix',
    eyebrow: 'Luz e translucidez',
    image: '/catalogo/editorial/onix/pagina-048-imagem-01.webp',
  },
  {
    slug: 'marmores',
    name: 'Mármores',
    eyebrow: 'Veios e profundidade',
    image: '/catalogo/editorial/marmores/pagina-053-imagem-02.webp',
  },
  {
    slug: 'limestones',
    name: 'Limestones',
    eyebrow: 'Textura serena',
    image: '/catalogo/editorial/limestones/pagina-064-imagem-02.webp',
  },
  {
    slug: 'infinity',
    name: 'Infinity',
    eyebrow: 'Planos contínuos',
    image: '/catalogo/editorial/infinity/pagina-066-imagem-02.webp',
  },
  {
    slug: 'crystal',
    name: 'Crystal',
    eyebrow: 'Brilho mineral',
    image: '/catalogo/editorial/crystal/pagina-071-imagem-02.webp',
  },
];

const materialGallery = homeMaterials
  .map(
    (material) => `
      <a class="material-tile" href="/catalogo/${material.slug}">
        <img src="${material.image}" alt="Ambiente com aplicação de ${material.name}" loading="lazy" />
        <span class="material-tile-shade"></span>
        <span class="material-tile-meta">${material.eyebrow}</span>
        <strong>${material.name}</strong>
        <i aria-hidden="true">↗</i>
      </a>`,
  )
  .join('');

const trustSection = `<section class="trust" aria-labelledby="trust-title">
  <div class="trust-intro">
    <p>Confiança comprovada por quem já escolheu a SC Mármores</p>
    <h2 id="trust-title">Experiência reconhecida<br />em cada avaliação.</h2>
    <span>Há 14 anos, orientamos cada escolha e cuidamos de todas as etapas, da definição da pedra à instalação.</span>
  </div>
  <dl class="trust-numbers">
    <div>
      <dt>Anos de experiência</dt>
      <dd><strong>14</strong><span>anos criando soluções sob medida</span></dd>
    </div>
    <div>
      <dt>Nota no Google</dt>
      <dd><strong>4,9</strong><span>de 5 estrelas</span></dd>
    </div>
    <div>
      <dt>Clientes que avaliaram</dt>
      <dd><strong>284</strong><span>avaliações publicadas no Google</span></dd>
    </div>
  </dl>
  <a class="trust-link" href="https://www.google.com/search?q=SCmarmores" target="_blank" rel="noreferrer">
    <span>Ler avaliações no Google</span><b aria-hidden="true">↗</b>
  </a>
</section>`;

const homeBlogSection = `<section class="home-blog" id="blog" aria-labelledby="home-blog-title">
  <div class="home-blog-heading">
    <div>
      <p>Guias para escolher melhor</p>
      <h2 id="home-blog-title">Conteúdo para decidir<br />com mais clareza.</h2>
    </div>
    <span>Leia orientações práticas sobre preço, escolha de materiais, uso em cozinha e cuidados com mármore antes de iniciar seu projeto.</span>
  </div>
  <div class="home-blog-grid">
    ${blogPosts.map((post, index) => `
      <a class="home-blog-card" href="/blog/${post.slug}">
        <figure><img src="${post.heroImage}" alt="" loading="lazy" decoding="async" /></figure>
        <div>
          <p>${post.eyebrow}</p>
          <h3>${post.title}</h3>
          <span>${post.description}</span>
          <small>${post.readTime}</small>
        </div>
        <b aria-hidden="true">↗</b>
      </a>`).join('')}
  </div>
  <a class="home-blog-all" href="/blog">
    <span>Ver todos os artigos</span>
    <b aria-hidden="true">↗</b>
  </a>
</section>`;

const locationSection = `<section class="location" id="como-chegar" aria-labelledby="location-title">
  <div class="location-heading">
    <p>Como chegar até nós</p>
    <h2 id="location-title">Visite a SC Mármores<br />em Florianópolis.</h2>
    <span>Estamos na SC-401, em Vargem Pequena, ao lado da Churrascaria Centenário. Para visitas técnicas, escolha de materiais ou início de orçamento, fale com a equipe antes de vir.</span>
  </div>
  <div class="location-shell">
    <div class="location-map" aria-label="Mapa com localização da SC Mármores">
      <iframe
        class="lazy-map-frame"
        title="Mapa da SC Mármores em Florianópolis"
        data-src="https://www.google.com/maps?q=SC%20M%C3%A1rmores%2C%20Rodovia%20Jos%C3%A9%20Carlos%20Daux%2016994%2C%20Vargem%20Pequena%2C%20Florian%C3%B3polis%2C%20SC&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="location-info">
      <dl>
        <div>
          <dt>Endereço</dt>
          <dd>Rodovia José Carlos Daux, 16994<br />Vargem Pequena, Florianópolis, SC<br /><small>Ao lado da Churrascaria Centenário</small></dd>
        </div>
        <div>
          <dt>Contato</dt>
          <dd><a href="tel:+554833692112">(48) 3369-2112</a><br /><a href="mailto:contato@scmarmores.com.br">contato@scmarmores.com.br</a></dd>
        </div>
        <div>
          <dt>Instagram</dt>
          <dd><a href="https://www.instagram.com/scmarmores/" target="_blank" rel="noreferrer">@scmarmores</a></dd>
        </div>
        <div>
          <dt>Horário de funcionamento</dt>
          <dd>Segunda a quinta: 08:00 às 12:00 e 13:30 às 18:00<br />Sexta: 08:00 às 12:00 e 13:30 às 17:00<br />Sábado e domingo: fechado</dd>
        </div>
      </dl>
      <div class="location-actions">
        <a href="https://www.google.com/maps/dir/?api=1&destination=SC%20M%C3%A1rmores%2C%20Rodovia%20Jos%C3%A9%20Carlos%20Daux%2016994%2C%20Vargem%20Pequena%2C%20Florian%C3%B3polis%2C%20SC" target="_blank" rel="noreferrer">Abrir rota no mapa <b aria-hidden="true">↗</b></a>
      </div>
    </div>
  </div>
</section>`;

const replaceBrandPlaceholders = (html) => html.replace(
  /(<a\b[^>]*class="[^"]*\bbrand\b[^"]*"[^>]*>)[\s\S]*?<\/a>/gi,
  '$1<img class="brand-logo" src="/assets/sc-marmores-logo.jpg" alt="SC Mármores" /></a>',
);

const whatsappHref = 'https://wa.me/554833692112?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20SC%20M%C3%A1rmores.';
const whatsappIcon = '<svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 3.5a8.45 8.45 0 0 0-7.3 12.7l-.88 3.26 3.34-.86a8.45 8.45 0 1 0 4.84-15.1Zm0 1.55a6.9 6.9 0 0 1 5.87 10.52 6.9 6.9 0 0 1-8.12 2.57l-.32-.15-1.98.51.52-1.92-.18-.33a6.9 6.9 0 0 1 4.21-11.2Zm-2.86 3.7c-.15 0-.4.05-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.15 1.63 2.48 3.95 3.48.55.24.98.38 1.32.49.55.18 1.06.15 1.45.09.44-.07 1.36-.56 1.55-1.1.19-.53.19-.99.13-1.09-.06-.1-.21-.15-.45-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.37-.12-.52.12-.15.23-.6.75-.73.9-.14.16-.27.18-.5.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.32-1.64-.14-.23-.01-.36.1-.48.11-.1.24-.27.36-.41.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.73-.19-.46-.38-.39-.52-.4h-.44Z" /></svg>';
const headerWhatsappCta = `<a class="header-cta header-whatsapp-cta" href="${whatsappHref}" target="_blank" rel="noreferrer" aria-label="Fale conosco pelo WhatsApp">Fale conosco ${whatsappIcon}</a>`;

const readLegacyPage = cache((filename) => {
  const source = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
  const bodyMatch = source.match(/<body(?:\s+class="([^"]*)")?[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error(`Não foi possível ler o conteúdo de ${filename}`);
  }

  let html = bodyMatch[2].replace(/<script\b[^>]*src="\/script\.js"[^>]*><\/script>/i, '');

  html = html
    .replaceAll('<a href="/#projetos">Projetos</a>', '')
    .replaceAll('<a href="#projetos">Projetos</a>', '')
    .replaceAll('<a href="#contato">Contato</a>', '')
    .replaceAll('<a href="/#materiais">Materiais</a>', '<a href="/catalogo">Catálogo</a>')
    .replaceAll('<a href="#materiais">Materiais</a>', '<a href="/catalogo">Catálogo</a>')
    .replaceAll('<a href="/catalogo">Catálogo</a>', '<a href="/catalogo">Catálogo</a><a href="/blog">Blog</a>')
    .replaceAll('<a class="header-cta project-form-trigger" href="#contato">Apresentar seu projeto <span>↗</span></a>', headerWhatsappCta)
    .replaceAll('<a class="header-cta" href="#contato">Apresentar seu projeto <span>↗</span></a>', headerWhatsappCta);

  html = replaceBrandPlaceholders(html);

  if (filename === 'index.html') {
    html = html
      .replace(
        /<section class="hero">\s*<img[^>]+src="\/assets\/hero-cozinha\.webp"[^>]*\/>\s*<\/section>/i,
        `<section class="hero">
          <video class="hero-video" muted autoplay loop playsinline preload="metadata" poster="/assets/hero-desktop-poster.webp" aria-hidden="true">
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
        `<div class="material-gallery" aria-label="Curadoria de materiais SC Mármores">${materialGallery}</div></section>${trustSection}${homeBlogSection}${locationSection}`,
      )
      .replaceAll('<a href="/blog">Blog</a>', '<a href="#blog">Blog</a>')
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
        /<section class="contact" id="contato">[\s\S]*?<\/section>/i,
        '',
      )
      .replace(
        '<div><span>Comece seu projeto</span><a class="project-form-trigger" href="#contato">Apresentar seu projeto</a><a href="mailto:contato@scmarmores.com.br">Enviar plantas e referências</a></div>',
        '<div><span>Fale conosco</span><a href="mailto:contato@scmarmores.com.br">Enviar email</a><a href="https://wa.me/554833692112" target="_blank" rel="noreferrer">Conversar pelo WhatsApp</a></div>',
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
