import Link from 'next/link';
import LegacyInteractions from '../legacy-interactions';

const Brand = ({ footer = false }) => (
  <Link className={`brand${footer ? ' footer-brand' : ''}`} href="/" aria-label="SC Mármores, início">
    <svg viewBox="0 0 54 54" aria-hidden="true">
      <path d="M42 10H21C13 10 8 16 8 27s5 17 13 17h21M36 18H23c-4 0-6 3-6 9s2 9 6 9h13M36 18v18" />
    </svg>
    <span>SC <b>Mármores</b></span>
  </Link>
);

export function CatalogHeader() {
  return (
    <>
      <header className="site-header catalog-site-header" id="topo">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <Link href="/#projetos">Projetos</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/execucao.html">Processo</Link>
          <Link href="#contato">Contato</Link>
        </nav>
        <Link className="header-cta" href="#contato">Consultar materiais <span>↗</span></Link>
        <button className="menu-toggle" aria-label="Abrir menu" aria-expanded="false">
          <span></span><span></span>
        </button>
      </header>
      <LegacyInteractions bodyClass="catalog-page" />
    </>
  );
}

export function CatalogFooter() {
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
        href="tel:+554833692112"
      >
        <span>{categoryName ? `Consultar ${categoryName}` : 'Conversar sobre os materiais'}</span><b>↗</b>
      </a>
      <p className="contact-note">
        As imagens são referências visuais. Tonalidades, desenhos e disponibilidade podem variar. Consulte nossa equipe
        antes de definir o material.
      </p>
    </section>
  );
}
