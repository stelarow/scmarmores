import { CatalogContact, CatalogFooter, CatalogHeader } from '../catalogo/catalog-chrome';

export const metadata = {
  title: 'Sobre nós | SC Mármores',
  description:
    'Há mais de 15 anos, a SC Mármores une curadoria de pedras naturais, fabricação sob medida e instalação precisa na Grande Florianópolis.',
};

const values = [
  {
    label: 'Missão',
    title: 'Qualidade conceito no mercado de pedras.',
    text: 'Ser a empresa conceito em qualidade de produto e atendimento no mercado de mármores, granitos e similares na Grande Florianópolis.',
  },
  {
    label: 'Visão',
    title: 'Referência reconhecida pela durabilidade.',
    text: 'Ser referência no segmento de marmorarias, atuante em toda a Grande Florianópolis, reconhecida pela qualidade e durabilidade dos produtos e serviços e pelo relacionamento com clientes, colaboradores e comunidade.',
  },
  {
    label: 'Valores',
    title: 'Ética, compromisso e valor para o cliente.',
    text: 'Ética, respeito e honestidade. Compromisso com a qualidade em tudo o que produzimos. Garantir a satisfação de todos os atendidos e gerar valor para cada cliente.',
  },
];

const products = [
  'Cozinhas',
  'Bancadas',
  'Cubas esculpidas',
  'Escadas',
  'Lareiras',
  'Lavatórios',
  'Mesas',
  'Nichos',
  'Churrasqueiras',
  'Área de serviço',
  'Pisos',
  'Revestimentos',
  'Soleiras',
  'Porcelanato',
  'Silestone',
  'Granitos',
];

const suppliers = [
  {
    slug: 'dekton',
    name: 'Dekton',
    note: 'Superfície ultracompacta',
    url: 'https://www.cosentino.com/pt-br/dekton/',
  },
  {
    slug: 'gramarcal',
    name: 'Gramarcal',
    note: 'Mármores e granitos',
    url: 'https://gramarcal.com.br/',
  },
  {
    slug: 'portinari',
    name: 'Portinari',
    note: 'Revestimentos',
    url: 'https://www.portinarirevestimentos.com.br/pt/produtos',
  },
  {
    slug: 'portobello',
    name: 'Portobello',
    note: 'Porcelanatos',
    url: 'https://www.portobello.com.br/',
  },
  {
    slug: 'silestone',
    name: 'Silestone',
    note: 'Superfície em quartzo',
    url: 'https://www.cosentino.com/pt-br/silestone/',
  },
  {
    slug: 'thesize',
    name: 'TheSize',
    note: 'Superfícies sinterizadas',
    url: 'https://thesize.com.es/',
  },
];

const SupplierCard = ({ supplier }) => (
  <a
    className="supplier-card"
    href={supplier.url}
    target="_blank"
    rel="noreferrer"
    aria-label={`${supplier.name} — ${supplier.note} (abre em nova aba)`}
  >
    <img
      className="supplier-logo"
      src={`/assets/fornecedores/${supplier.slug}.png`}
      alt={supplier.name}
      width="150"
      height="41"
      loading="lazy"
    />
    <span className="supplier-note">{supplier.note}</span>
    <b aria-hidden="true">↗</b>
  </a>
);

export default function SobreNosPage() {
  return (
    <>
      <CatalogHeader />
      <main className="about-page">
        <section className="catalog-hero about-hero" aria-labelledby="about-hero-title">
          <img src="/assets/hero-desktop-poster.webp" alt="" />
          <div className="catalog-hero-content">
            <p>Sobre a SC Mármores</p>
            <h1 id="about-hero-title">
              Pedra natural traduzida<br />em <em>projeto</em>.
            </h1>
            <span>
              Há mais de 15 anos unimos curadoria de materiais, fabricação sob medida e instalação
              precisa para transformar ambientes na Grande Florianópolis.
            </span>
          </div>
        </section>

        <section className="catalog-intro about-intro" aria-labelledby="about-intro-title">
          <p>Quem somos</p>
          <div>
            <h2 id="about-intro-title">
              Experiência que se traduz<br />em <em>precisão</em>.
            </h2>
            <p>
              A SC Mármores nasceu da vivência de profissionais com mais de 15 anos de mercado e de
              uma equipe altamente capacitada para oferecer soluções rápidas e precisas. Cada projeto
              é tratado com o conceito de qualidade total — da escolha da pedra ao acabamento final —
              por pessoas que transformam sonhos e projetos de arquitetura em verdadeiras obras de arte.
            </p>
          </div>
        </section>

        <section className="about-formation" aria-labelledby="about-formation-title">
          <div>
            <p>Formação que faz diferença</p>
            <h2 id="about-formation-title">
              Projetos que começam<br />em <em>3D</em>.
            </h2>
          </div>
          <p className="about-formation-copy">
            Antes de cortar a primeira chapa, grande parte dos nossos ambientes é desenhada em 3D.
            Essa visão espacial é um diferencial da nossa empresa, construído na{' '}
            <a
              href="https://www.escolahabilidade.com/cursos/projetista-3d"
              target="_blank"
              rel="noreferrer"
            >
              formação em Projetista 3D da Escola Habilidade
            </a>{' '}
            — SketchUp e Enscape, presencial em São José, na Grande Florianópolis.
          </p>
        </section>

        <section className="about-values" aria-labelledby="about-values-title">
          <div className="about-values-heading">
            <p>O que nos move</p>
            <h2 id="about-values-title">Missão, visão<br />e valores.</h2>
          </div>
          <div className="about-values-grid">
            {values.map((value) => (
              <article key={value.label} className="about-value">
                <span>{value.label}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-products" aria-labelledby="about-products-title">
          <div className="about-products-heading">
            <p>O que fazemos</p>
            <div>
              <h2 id="about-products-title">
                Do bloco bruto ao<br />ambiente <em>finalizado</em>.
              </h2>
              <p>
                Produzimos peças sob medida em mármore, granito, quartzo, porcelanato e superfícies
                sinterizadas. Trabalhamos cozinhas, bancadas, cubas esculpidas, escadas, lareiras e
                revestimentos com o mesmo cuidado em todas as etapas.
              </p>
            </div>
          </div>
          <ul className="about-products-list" aria-label="Produtos e aplicações">
            {products.map((product) => (
              <li key={product}>{product}</li>
            ))}
          </ul>
        </section>

        <section className="trust about-trust" aria-labelledby="about-trust-title">
          <div className="trust-intro">
            <p>Confiança construída com pedra</p>
            <h2 id="about-trust-title">Cada entrega soma<br />experiência.</h2>
            <span>
              Números que traduzem anos de trabalho, materiais trabalhados e projetos entregues na
              Grande Florianópolis.
            </span>
          </div>
          <dl className="trust-numbers">
            <div>
              <dt>Experiência da equipe</dt>
              <dd>
                <strong>15+</strong>
                <span>anos de atuação no mercado de pedras</span>
              </dd>
            </div>
            <div>
              <dt>Projetos entregues</dt>
              <dd>
                <strong>1561</strong>
                <span>ambientes finalizados com precisão</span>
              </dd>
            </div>
            <div>
              <dt>Materiais trabalhados</dt>
              <dd>
                <strong>47</strong>
                <span>toneladas de pedra transformadas em projeto</span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="suppliers" aria-labelledby="suppliers-title">
          <div className="suppliers-heading">
            <div>
              <p>Fornecedores</p>
              <h2 id="suppliers-title">
                Materiais selecionados<br />entre os melhores.
              </h2>
            </div>
            <span>
              Trabalhamos com fornecedores de referência para oferecer procedência, variedade e
              qualidade consistente em cada superfície.
            </span>
          </div>
          <div className="suppliers-marquee" aria-label="Carrossel de fornecedores">
            <div className="suppliers-track">
              {suppliers.map((supplier) => (
                <SupplierCard key={supplier.name} supplier={supplier} />
              ))}
              {suppliers.map((supplier) => (
                <SupplierCard key={`${supplier.name}-dup`} supplier={supplier} />
              ))}
            </div>
          </div>
        </section>

        <CatalogContact />
      </main>
      <CatalogFooter />
    </>
  );
}
