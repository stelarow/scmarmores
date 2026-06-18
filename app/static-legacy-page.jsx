import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import LegacyInteractions from './legacy-interactions';

const whatsappHref = 'https://wa.me/554833692112?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20SC%20M%C3%A1rmores.';
const whatsappIcon = '<svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 3.5a8.45 8.45 0 0 0-7.3 12.7l-.88 3.26 3.34-.86a8.45 8.45 0 1 0 4.84-15.1Zm0 1.55a6.9 6.9 0 0 1 5.87 10.52 6.9 6.9 0 0 1-8.12 2.57l-.32-.15-1.98.51.52-1.92-.18-.33a6.9 6.9 0 0 1 4.21-11.2Zm-2.86 3.7c-.15 0-.4.05-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.15 1.63 2.48 3.95 3.48.55.24.98.38 1.32.49.55.18 1.06.15 1.45.09.44-.07 1.36-.56 1.55-1.1.19-.53.19-.99.13-1.09-.06-.1-.21-.15-.45-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.37-.12-.52.12-.15.23-.6.75-.73.9-.14.16-.27.18-.5.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.32-1.64-.14-.23-.01-.36.1-.48.11-.1.24-.27.36-.41.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.73-.19-.46-.38-.39-.52-.4h-.44Z" /></svg>';
const headerWhatsappCta = `<a class="header-cta header-whatsapp-cta" href="${whatsappHref}" target="_blank" rel="noreferrer" aria-label="Fale conosco pelo WhatsApp">Fale conosco ${whatsappIcon}</a>`;

const replaceBrandPlaceholders = (html) => html.replace(
  /(<a\b[^>]*class="[^"]*\bbrand\b[^"]*"[^>]*>)[\s\S]*?<\/a>/gi,
  '$1<img class="brand-logo" src="/assets/sc-marmores-logo.jpg" alt="SC Mármores" /></a>',
);

const readStaticLegacyPage = cache((filename) => {
  const source = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
  const bodyMatch = source.match(/<body(?:\s+class="([^"]*)")?[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error(`Não foi possível ler o conteúdo de ${filename}`);
  }

  let html = bodyMatch[2].replace(/<script\b[^>]*src="\/script\.js"[^>]*><\/script>/i, '');

  html = html
    .replaceAll('<a href="/#projetos">Projetos</a>', '')
    .replaceAll('<a href="#projetos">Projetos</a>', '')
    .replaceAll('<a href="/#materiais">Materiais</a>', '<a href="/catalogo">Catálogo</a><a href="/blog">Blog</a>')
    .replaceAll('<a href="#materiais">Materiais</a>', '<a href="/catalogo">Catálogo</a><a href="/blog">Blog</a>')
    .replaceAll('<a class="header-cta project-form-trigger" href="#contato">Apresentar seu projeto <span>↗</span></a>', headerWhatsappCta)
    .replaceAll('<a class="header-cta" href="#contato">Apresentar seu projeto <span>↗</span></a>', headerWhatsappCta)
    .replace(
      '<div><span>Comece seu projeto</span><a href="#contato">Apresentar seu projeto</a><a href="mailto:contato@scmarmores.com.br">Enviar plantas e referências</a></div>',
      '<div><span>Fale conosco</span><a href="#contato">Enviar uma mensagem</a><a href="https://wa.me/554833692112" target="_blank" rel="noreferrer">Conversar pelo WhatsApp</a></div>',
    )
    .replace('href="tel:+5500000000000">(00) 00000-0000</a>', 'href="tel:+554833692112">(48) 3369-2112</a>')
    .replace(/<section class="related-materials">[\s\S]*?<\/section>/i, '');

  html = replaceBrandPlaceholders(html);

  return {
    bodyClass: bodyMatch[1] ?? '',
    html,
  };
});

export default function StaticLegacyPage({ filename }) {
  const page = readStaticLegacyPage(filename);

  return (
    <>
      <div className={page.bodyClass || undefined} dangerouslySetInnerHTML={{ __html: page.html }} />
      <LegacyInteractions bodyClass={page.bodyClass} />
    </>
  );
}
