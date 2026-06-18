import Link from 'next/link';
import { CatalogContact, CatalogFooter, CatalogHeader } from '../catalogo/catalog-chrome';
import { blogPosts } from './blog-data';

export const metadata = {
  title: 'Blog | SC Mármores',
  description: 'Guias sobre mármores, granitos, bancadas e cuidados com pedras naturais em Florianópolis.',
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];

  return (
    <>
      <CatalogHeader showBlog={false} />
      <main className="blog-page">
        <section className="blog-hero">
          <img src={featuredPost.heroImage} alt="" />
          <div className="blog-hero-content">
            <p>Blog SC Mármores</p>
            <h1>Escolhas melhores começam com informação clara.</h1>
            <span>
              Conteúdos para comparar materiais, entender orçamento e cuidar de superfícies naturais com a mesma
              atenção que orienta nossos projetos sob medida.
            </span>
          </div>
        </section>

        <section className="blog-index" aria-labelledby="blog-index-title">
          <div className="blog-index-heading">
            <p>Guias para decidir com segurança</p>
            <h2 id="blog-index-title">Artigos em destaque.</h2>
          </div>
          <ol className="blog-post-list">
            {blogPosts.map((post, index) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="blog-post-eyebrow">{post.eyebrow}</p>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <small>{post.readTime}</small>
                  </div>
                  <figure>
                    <img src={post.heroImage} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                  </figure>
                  <b aria-hidden="true">↗</b>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <CatalogContact />
      </main>
      <CatalogFooter showBlogLink={false} />
    </>
  );
}
