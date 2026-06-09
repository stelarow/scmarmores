import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CatalogContact, CatalogFooter, CatalogHeader } from '../catalog-chrome';
import { catalogCategories, catalogPageImage, getCatalogCategory } from '../catalog-data';

export const generateStaticParams = () => catalogCategories.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }) => {
  const category = getCatalogCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} | Catálogo SC Mármores`,
    description: category.description,
  };
};

export default function CatalogCategoryPage({ params }) {
  const category = getCatalogCategory(params.slug);
  if (!category) notFound();

  const currentIndex = catalogCategories.findIndex(({ slug }) => slug === category.slug);
  const nextCategory = catalogCategories[(currentIndex + 1) % catalogCategories.length];

  return (
    <>
      <CatalogHeader />
      <main>
        <section className="catalog-category-hero">
          <img src={catalogPageImage(category, category.pages[0])} alt="" />
          <div className="catalog-category-hero-content">
            <p><Link href="/catalogo">Catálogo</Link> · {String(currentIndex + 1).padStart(2, '0')}</p>
            <h1>{category.name}</h1>
            <span>{category.description}</span>
          </div>
        </section>

        <section className="catalog-category-intro">
          <p>Catálogo completo da categoria</p>
          <div>
            <h2>Todos os modelos,<br />em uma única seleção.</h2>
            <p>
              Percorra as pranchas abaixo para conhecer os modelos desta categoria. As informações e imagens seguem o
              catálogo original da SC Mármores.
            </p>
          </div>
        </section>

        <section className="catalog-sheets" aria-label={`Pranchas do catálogo de ${category.name}`}>
          {category.pages.map((page, index) => (
            <figure className="catalog-sheet" key={page}>
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{category.shortName || category.name}</strong>
              </figcaption>
              <img
                src={catalogPageImage(category, page)}
                alt={`Prancha ${index + 1} do catálogo de ${category.name}`}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </section>

        <section className="catalog-next">
          <p>Continuar no catálogo</p>
          <Link href={`/catalogo/${nextCategory.slug}`}>
            <span>{nextCategory.name}</span><b>↗</b>
          </Link>
          <Link href="/catalogo">Ver todas as categorias <span>→</span></Link>
        </section>

        <CatalogContact categoryName={category.shortName || category.name} />
      </main>
      <CatalogFooter />
    </>
  );
}
