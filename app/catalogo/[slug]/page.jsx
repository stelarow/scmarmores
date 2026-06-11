import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CatalogContact, CatalogFooter, CatalogHeader } from '../catalog-chrome';
import { catalogCategories, getCatalogCategory } from '../catalog-data';

export const generateStaticParams = () => catalogCategories.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }) => {
  const category = getCatalogCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} | Curadoria SC Mármores`,
    description: category.description,
  };
};

const Asset = ({ asset, category, priority = false }) => {
  const orientationClass = asset.role === 'feature' && asset.height > asset.width
    ? ' catalog-asset-portrait'
    : '';

  return (
    <article className={`catalog-asset catalog-asset-${asset.role}${orientationClass}`}>
      <figure style={asset.role === 'feature' ? { aspectRatio: `${asset.width} / ${asset.height}` } : undefined}>
        <img src={asset.src} alt={`${asset.name}, referência de ${category.shortName || category.name}`} loading={priority ? 'eager' : 'lazy'} />
      </figure>
      <div>
        <p>{asset.role === 'feature' ? 'Referência de aplicação' : category.eyebrow}</p>
        <h3>{asset.name}</h3>
        <span>{asset.description}</span>
      </div>
    </article>
  );
};

export default function CatalogCategoryPage({ params }) {
  const category = getCatalogCategory(params.slug);
  if (!category) notFound();

  const currentIndex = catalogCategories.findIndex(({ slug }) => slug === category.slug);
  const nextCategory = catalogCategories[(currentIndex + 1) % catalogCategories.length];
  const hero = category.hero;
  const assets = category.assets.slice(1);

  return (
    <>
      <CatalogHeader />
      <main>
        <section className="catalog-category-hero">
          {category.desktopHeroSrc ? (
            <picture>
              <source media="(min-width: 601px)" srcSet={category.desktopHeroSrc} />
              <img src={hero.src} alt="" />
            </picture>
          ) : (
            <img src={hero.src} alt="" />
          )}
          <div className="catalog-category-hero-content">
            <p><Link href="/catalogo">Curadoria</Link> · {String(currentIndex + 1).padStart(2, '0')}</p>
            <h1>{category.name}</h1>
            <span>{category.description}</span>
          </div>
        </section>

        <section className="catalog-category-intro">
          <p>{category.eyebrow}</p>
          <div>
            <h2>{category.statement}</h2>
            <p>
              As imagens abaixo funcionam como ponto de partida. A escolha final considera o desenho real da chapa,
              acabamento, aplicação e disponibilidade no momento do projeto.
            </p>
          </div>
        </section>

        <section className="catalog-editorial-grid" aria-label={`Seleção de ${category.name}`}>
          {assets.map((asset, index) => (
            <Asset asset={asset} category={category} priority={index < 2} key={asset.id} />
          ))}
        </section>

        <section className="catalog-disclaimer">
          <p>Uma escolha acompanhada</p>
          <h2>Da primeira referência à chapa definida para o projeto.</h2>
          <span>
            Fotografias e amostras representam a aparência geral do material. Pedras naturais apresentam variações de
            tonalidade, veio e desenho. Consulte nossa equipe para avaliar a seleção disponível.
          </span>
        </section>

        <section className="catalog-next">
          <p>Continuar a curadoria</p>
          <Link href={`/catalogo/${nextCategory.slug}`}>
            <span>{nextCategory.name}</span><b>↗</b>
          </Link>
          <Link href="/catalogo">Ver todas as famílias <span>→</span></Link>
        </section>

        <CatalogContact categoryName={category.shortName || category.name} />
      </main>
      <CatalogFooter />
    </>
  );
}
