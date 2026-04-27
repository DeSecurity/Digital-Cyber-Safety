import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { getArticle, getRelated, articles } from "@/content/articles";
import { defaultPlacement, getPromos } from "@/content/promos";
import { ArticleBody } from "@/components/ArticleBody";
import { TableOfContents } from "@/components/TableOfContents";
import { PromoCard } from "@/components/PromoCard";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article" }] };
    const a = loaderData.article;
    const title = a.seo?.title || `${a.title} — Digital Cyber Safety`;
    const desc = a.seo?.description || a.excerpt;
    const ogImage = a.seo?.ogImage || a.cover;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: a.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: a.date },
        ...(a.updated ? [{ property: "article:modified_time", content: a.updated }] : []),
        ...(ogImage ? [{ property: "og:image", content: ogImage }, { name: "twitter:image", content: ogImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://digitalcybersafety.com/articles/${a.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Article not found</h1>
      <Link to="/articles" className="mt-6 inline-block text-primary hover:underline">Back to all articles</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = getRelated(article.slug, 3);
  const idx = articles.findIndex((a) => a.slug === article.slug);
  const prev = articles[idx + 1];
  const next = articles[idx - 1];
  const sidebarPromos = getPromos(article.promos?.sidebar || defaultPlacement.sidebar);
  const inlinePromos = article.promos?.inline || defaultPlacement.inline;

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Digital Cyber Safety",
      url: "https://digitalcybersafety.com",
    },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border/60">
        {article.cover && (
          <>
            <img src={article.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          </>
        )}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="flex flex-wrap gap-2 mb-5">
            {article.categories.map((c) => (
              <Link
                key={c}
                to="/categories/$name"
                params={{ name: c }}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-primary hover:bg-primary/20"
              >
                {c}
              </Link>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-glow">{article.title}</h1>
          {article.subtitle && <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-3xl">{article.subtitle}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-2"><User className="h-3.5 w-3.5" />{article.author}</span>
            <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{article.readingMinutes} min read</span>
          </div>
        </div>
      </header>

      {/* Body + sidebar */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <ArticleBody article={article} inlinePromoIds={inlinePromos} />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {article.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-mono text-muted-foreground">#{t}</span>
              ))}
            </div>
          )}

          {/* Prev/Next */}
          <nav className="mt-10 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link to="/articles/$slug" params={{ slug: prev.slug }} className="group rounded-xl border border-border bg-card-grad p-5 hover:border-primary/40 hover:shadow-glow transition-all">
                <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground"><ChevronLeft className="h-3 w-3" />Previous</span>
                <p className="mt-2 font-display font-semibold group-hover:text-primary line-clamp-2">{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link to="/articles/$slug" params={{ slug: next.slug }} className="group rounded-xl border border-border bg-card-grad p-5 text-right hover:border-primary/40 hover:shadow-glow transition-all">
                <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">Next<ChevronRight className="h-3 w-3" /></span>
                <p className="mt-2 font-display font-semibold group-hover:text-primary line-clamp-2">{next.title}</p>
              </Link>
            ) : <div />}
          </nav>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents markdown={article.content} />
          {sidebarPromos.map((p, i) => (
            <div key={p.id}>
              {i === 0 && <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">Supports our work</p>}
              <PromoCard promo={p} compact={p.kind !== "merch"} />
            </div>
          ))}
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 border-t border-border/60">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Continue your training</p>
          <h2 className="mt-2 font-display text-3xl font-bold mb-8">Related briefings</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}
    </article>
  );
}
