import Link from 'next/link';
import { CatalogContact, CatalogFooter, CatalogHeader } from './catalog-chrome';
import { catalogCategories, catalogPageImage } from './catalog-data';

export const metadata = {
  title: 'Catálogo de materiais | SC Mármores',
  description: 'Explore as categorias e os modelos apresentados no catálogo SC Mármores 2025.',
};

export default function CatalogPage() {
  return (
    <>
      <CatalogHeader />
      <main>
        <section className="catalog-hero">
          <img src="/catalogo/quartzitos/pagina-33.webp" alt="" />
          <div className="catalog-hero-content">
            <p>Catálogo SC Mármores · 2025</p>
            <h1>Matéria em muitas<br />formas de <em>expressão.</em></h1>
            <span>
              Explore as linhas disponíveis na SC Mármores. Cada categoria reúne os modelos apresentados em nosso
              catálogo, com disponibilidade confirmada durante o atendimento.
            </span>
          </div>
        </section>

        <section className="catalog-intro">
          <p>Dez categorias · mais de 200 produtos</p>
          <div>
            <h2>Um catálogo amplo para escolhas bem orientadas.</h2>
            <p>
              As categorias abaixo seguem a mesma organização do catálogo SC Mármores. Entre em cada seleção para
              conhecer todos os modelos reunidos naquela linha.
            </p>
          </div>
        </section>

        <section className="catalog-index" aria-labelledby="catalog-index-title">
          <div className="catalog-index-heading">
            <h2 id="catalog-index-title">Explore o catálogo.</h2>
            <p>Nomes, imagens e descrições foram preservados conforme o material original.</p>
          </div>
          <ol className="catalog-category-list">
            {catalogCategories.map((category, index) => (
              <li key={category.slug}>
                <Link href={`/catalogo/${category.slug}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                  <figure>
                    <img
                      src={catalogPageImage(category, category.pages[Math.min(1, category.pages.length - 1)])}
                      alt={`Prévia da categoria ${category.name}`}
                      loading="lazy"
                    />
                  </figure>
                  <b aria-hidden="true">↗</b>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <CatalogContact />
      </main>
      <CatalogFooter />
    </>
  );
}
