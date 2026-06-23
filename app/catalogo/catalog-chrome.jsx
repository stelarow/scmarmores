import Link from 'next/link';
import LegacyInteractions from '../legacy-interactions';

const whatsappHref = 'https://wa.me/554833692112?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20SC%20M%C3%A1rmores.';

const WhatsAppIcon = () => (
  <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 3.5a8.45 8.45 0 0 0-7.3 12.7l-.88 3.26 3.34-.86a8.45 8.45 0 1 0 4.84-15.1Zm0 1.55a6.9 6.9 0 0 1 5.87 10.52 6.9 6.9 0 0 1-8.12 2.57l-.32-.15-1.98.51.52-1.92-.18-.33a6.9 6.9 0 0 1 4.21-11.2Zm-2.86 3.7c-.15 0-.4.05-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.15 1.63 2.48 3.95 3.48.55.24.98.38 1.32.49.55.18 1.06.15 1.45.09.44-.07 1.36-.56 1.55-1.1.19-.53.19-.99.13-1.09-.06-.1-.21-.15-.45-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.37-.12-.52.12-.15.23-.6.75-.73.9-.14.16-.27.18-.5.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.32-1.64-.14-.23-.01-.36.1-.48.11-.1.24-.27.36-.41.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.73-.19-.46-.38-.39-.52-.4h-.44Z" />
  </svg>
);

const WhatsAppLogo = () => (
  <svg className="whatsapp-logo" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path fill="#FFFFFF" transform="translate(4 4)" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4.75" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.35" cy="6.75" r="1.05" fill="currentColor" stroke="none" />
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
          <Link href="/sobre-nos">Sobre</Link>
          <Link href="/catalogo">Catálogo</Link>
          {showBlog ? <Link href="/blog">Blog</Link> : null}
          <Link href="#contato">Contato</Link>
        </nav>
        <a className="header-cta header-whatsapp-cta" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Fale conosco pelo WhatsApp">
          <WhatsAppLogo />
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
        <nav className="footer-socials" aria-label="Redes sociais">
          <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Fale conosco pelo WhatsApp"><WhatsAppIcon /></a>
          <a href="https://www.instagram.com/scmarmores/" target="_blank" rel="noreferrer" aria-label="Siga a SC Mármores no Instagram"><InstagramIcon /></a>
        </nav>
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
