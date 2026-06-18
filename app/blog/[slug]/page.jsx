import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CatalogContact, CatalogFooter, CatalogHeader } from '../../catalogo/catalog-chrome';
import { blogPosts, getBlogPost } from '../blog-data';

export const generateStaticParams = () => blogPosts.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }) => {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | SC Mármores`,
    description: post.description,
  };
};

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter(({ slug }) => slug !== post.slug);

  return (
    <>
      <CatalogHeader showBlog={false} />
      <main className="blog-article-page">
        <article>
          <section className="blog-article-hero">
            <img src={post.heroImage} alt={post.heroAlt} />
            <div className="blog-article-hero-content">
              <p><Link href="/blog">Blog</Link> · {post.eyebrow}</p>
              <h1>{post.title}</h1>
              <span>{post.description}</span>
              <small>{post.date} · {post.readTime}</small>
            </div>
          </section>

          <div className="blog-article-shell">
            <aside className="blog-article-aside" aria-label="Resumo do artigo">
              <p>Guia SC Mármores</p>
              <span>
                Informação objetiva para escolher materiais, entender limites de uso e conversar sobre orçamento com
                mais clareza.
              </span>
            </aside>

            <div className="blog-article-content">
              {post.intro.map((paragraph) => (
                <p className="blog-article-lead" key={paragraph}>{paragraph}</p>
              ))}

              {post.sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <div className="blog-article-list">
                      {section.listTitle ? <h3>{section.listTitle}</h3> : null}
                      <ul>
                        {section.list.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </section>
              ))}

              <div className="blog-article-cta">
                <p>Quer transformar essas escolhas em um projeto sob medida?</p>
                <a
                  href={`https://wa.me/554833692112?text=${encodeURIComponent(`Olá, li o artigo "${post.title}" e gostaria de falar com a SC Mármores.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {post.cta} <b aria-hidden="true">↗</b>
                </a>
              </div>
            </div>
          </div>
        </article>

        <section className="blog-related" aria-labelledby="blog-related-title">
          <p>Continue lendo</p>
          <h2 id="blog-related-title">Outros guias para o seu projeto.</h2>
          <div>
            {relatedPosts.map((relatedPost) => (
              <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                <span>{relatedPost.eyebrow}</span>
                <strong>{relatedPost.title}</strong>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <CatalogContact />
      </main>
      <CatalogFooter showBlogLink={false} />
    </>
  );
}
