import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import LegacyInteractions from './legacy-interactions';
import { catalogCategories } from './catalogo/catalog-data';

const materialGallery = catalogCategories
  .map(
    (category, index) => `
      <a class="material-tile${index === 0 ? ' material-tile-featured' : ''}" href="/catalogo/${category.slug}">
        <img src="${category.preview.src}" alt="Referência visual de ${category.shortName || category.name}" loading="lazy" />
        <span class="material-tile-shade"></span>
        <span class="material-tile-meta">${category.eyebrow}</span>
        <strong>${category.shortName || category.name}</strong>
        <i aria-hidden="true">↗</i>
      </a>`,
  )
  .join('');

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

  if (filename === 'index.html') {
    html = html
      .replace(
        'Acompanhamos cada projeto da seleção da chapa à instalação. Assim, desenho, paginação, encontros e acabamentos chegam à obra com a precisão que a arquitetura exige.',
        'Reunimos um amplo catálogo de mármores, granitos e superfícies para atender diferentes projetos. Nossa equipe orienta a escolha e acompanha cada etapa, da definição do material à instalação.',
      )
      .replace(
        '<p>Analisamos desenho, resistência, acabamento, manutenção e contexto de uso para indicar uma superfície tão adequada quanto bonita.</p>',
        '<p>Conheça as linhas e os modelos disponíveis na SC Mármores. Nossa equipe auxilia na avaliação de aparência, aplicação, acabamento e disponibilidade.</p><a class="text-link" href="/catalogo">Explorar o catálogo <span>→</span></a>',
      )
      .replace(
        'Cada família responde de forma diferente à luz, ao uso e ao desenho do ambiente. Organizamos a seleção pelo que importa para o projeto, não pela ordem de um catálogo.',
        'Cada família oferece uma leitura diferente de cor, movimento e presença. Reunimos referências para orientar a escolha a partir da arquitetura, do uso e da intenção de cada projeto.',
      )
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
      .replace('<span>04</span><strong>Superfícies especiais</strong><i>↗</i>', '<span>04</span><strong>Catálogo completo</strong><i>↗</i>');
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
