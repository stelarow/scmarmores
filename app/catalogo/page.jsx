import Link from 'next/link';
import { CatalogContact, CatalogFooter, CatalogHeader } from './catalog-chrome';
import { catalogCategories } from './catalog-data';

export const metadata = {
  title: 'Curadoria de materiais | SC Mármores',
  description: 'Explore mármores, granitos e superfícies com a curadoria da SC Mármores.',
};

export default function CatalogPage() {
  const hero = catalogCategories.find(({ slug }) => slug === 'quartzitos').hero;

  return (
    <>
      <CatalogHeader />
      <main>
        <section className="catalog-hero">
          <img src={hero.src} alt="" />
          <div className="catalog-hero-content">
            <p>Curadoria de materiais</p>
            <h1>Matéria escolhida<br />com <em>intenção.</em></h1>
            <span>
              Cada superfície responde de forma própria à luz, ao uso e ao desenho do ambiente. Nossa seleção começa
              pelo que o projeto precisa comunicar.
            </span>
          </div>
        </section>

        <section className="catalog-intro">
          <p>Dez famílias · mais de 200 modelos</p>
          <div>
            <h2>Um repertório amplo, apresentado com clareza.</h2>
            <p>
              Explore as famílias disponíveis e observe cores, movimentos e possibilidades de aplicação. Na etapa de
              especificação, nossa equipe orienta a escolha e confirma a disponibilidade.
            </p>
          </div>
        </section>

        <section className="catalog-index" aria-labelledby="catalog-index-title">
          <div className="catalog-index-heading">
            <h2 id="catalog-index-title">Explore por matéria.</h2>
            <p>Cada seleção reúne referências visuais e modelos para iniciar uma conversa sobre o projeto.</p>
          </div>
          <ol className="catalog-category-list">
            {catalogCategories.map((category, index) => (
              <li key={category.slug}>
                <Link href={`/catalogo/${category.slug}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="catalog-category-eyebrow">{category.eyebrow}</p>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                  <figure>
                    <img src={category.preview.src} alt="" loading="lazy" />
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
