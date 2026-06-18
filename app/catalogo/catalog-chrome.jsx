import Link from 'next/link';
import LegacyInteractions from '../legacy-interactions';

const whatsappHref = 'https://wa.me/554833692112?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20SC%20M%C3%A1rmores.';

const WhatsAppIcon = () => (
  <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 3.5a8.45 8.45 0 0 0-7.3 12.7l-.88 3.26 3.34-.86a8.45 8.45 0 1 0 4.84-15.1Zm0 1.55a6.9 6.9 0 0 1 5.87 10.52 6.9 6.9 0 0 1-8.12 2.57l-.32-.15-1.98.51.52-1.92-.18-.33a6.9 6.9 0 0 1 4.21-11.2Zm-2.86 3.7c-.15 0-.4.05-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.15 1.63 2.48 3.95 3.48.55.24.98.38 1.32.49.55.18 1.06.15 1.45.09.44-.07 1.36-.56 1.55-1.1.19-.53.19-.99.13-1.09-.06-.1-.21-.15-.45-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.37-.12-.52.12-.15.23-.6.75-.73.9-.14.16-.27.18-.5.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.32-1.64-.14-.23-.01-.36.1-.48.11-.1.24-.27.36-.41.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.73-.19-.46-.38-.39-.52-.4h-.44Z" />
  </svg>
);

const Brand = ({ footer = false }) => (
  <Link className={`brand${footer ? ' footer-brand' : ''}`} href="/" aria-label="SC Mármores, início">
    <img className="brand-logo" src="/assets/sc-marmores-logo.jpg" alt="SC Mármores" />
  </Link>
);

export function CatalogHeader({ showBlog = true }) {
  return (
    <>
      <header className="site-header catalog-site-header" id="topo">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <Link href="/catalogo">Catálogo</Link>
          {showBlog ? <Link href="/blog">Blog</Link> : null}
          <Link href="#contato">Contato</Link>
        </nav>
        <a className="header-cta header-whatsapp-cta" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Fale conosco pelo WhatsApp">
          Fale conosco <WhatsAppIcon />
        </a>
        <button className="menu-toggle" aria-label="Abrir menu" aria-expanded="false">
          <span></span><span></span>
        </button>
      </header>
      <LegacyInteractions bodyClass="catalog-page" />
    </>
  );
}

export function CatalogFooter({ showBlogLink = true }) {
  return (
    <footer>
      <Brand footer />
      <div>
        <span>Atendimento</span>
        <a href="mailto:contato@scmarmores.com.br">contato@scmarmores.com.br</a>
        <a href="tel:+554833692112">(48) 3369-2112</a>
      </div>
      <div>
        <span>Catálogo</span>
        <Link href="/catalogo">Ver todas as categorias</Link>
        {showBlogLink ? <Link href="/blog">Ler guias do blog</Link> : null}
        <Link href="#contato">Consultar disponibilidade</Link>
      </div>
      <div className="footer-meta">
        <p>© <span id="year"></span> SC Mármores</p>
        <p>Florianópolis, SC</p>
      </div>
    </footer>
  );
}

export function CatalogContact({ categoryName }) {
  return (
    <section className="contact catalog-contact" id="contato">
      <div>
        <p>Atendimento e disponibilidade</p>
        <h2>Escolha com orientação.<br />Execute com precisão.</h2>
      </div>
      <a
        className="contact-action"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <span>Fale conosco</span><b><WhatsAppIcon /></b>
      </a>
      <p className="contact-note">
        As imagens são referências visuais. Tonalidades, desenhos e disponibilidade podem variar. Consulte nossa equipe
        antes de definir o material.
      </p>
    </section>
  );
}
