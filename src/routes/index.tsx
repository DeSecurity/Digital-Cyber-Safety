import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Activity, Lock } from "lucide-react";
import { articles, getAllCategories } from "@/content/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { PromoCard } from "@/components/PromoCard";
import { defaultPlacement, getPromos } from "@/content/promos";
import heroImg from "@/assets/hero-soc.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Cyber Safety — Cyber defense for everyday people" },
      { name: "description", content: "Calm, clear cybersecurity guidance for families and professionals. Stay safe online without the jargon." },
      { property: "og:title", content: "Digital Cyber Safety" },
      { property: "og:description", content: "Calm, clear cybersecurity guidance for families and professionals." },
      { property: "og:image", content: "/og-home.jpg" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = articles[0];
  const recent = articles.slice(1, 5);
  const categories = getAllCategories();
  const homepagePromos = getPromos(defaultPlacement.homepage);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-glow" />
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Defender's Brief · Live
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.05] text-glow">
            Cyber defense for the people who actually use the internet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Plain-English guidance from working defenders. No jargon. No fear-mongering.
            Just the habits and tools that keep you, your family, and your work safe online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/articles" className="inline-flex items-center gap-2 rounded-lg bg-hero px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform">
              Read the briefings <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all">
              Why this exists
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border max-w-3xl">
            {[
              { icon: Shield, label: "Articles", value: articles.length },
              { icon: Activity, label: "Categories", value: categories.length },
              { icon: Lock, label: "Status", value: "Secure" },
            ].map((s) => (
              <div key={s.label} className="bg-card p-5">
                <s.icon className="h-4 w-4 text-primary mb-2" />
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured + recent */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Featured Briefing</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Top of the watch</h2>
          </div>
          <Link to="/articles" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featured && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <ArticleCard article={featured} featured />
            </div>
            <div className="grid gap-6 content-start">
              {recent.slice(0, 2).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Curated row */}
      {recent.length > 2 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Latest dispatches</p>
          <h2 className="mt-2 font-display text-3xl font-bold mb-8">Fresh from the watch floor</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.slice(2).concat(articles.slice(5)).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Promo grid */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 border-t border-border/60">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Gear · Resources · Support</p>
        <h2 className="mt-2 font-display text-3xl font-bold mb-8">Equip the defender in you</h2>
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {homepagePromos.map((p) => (
            <PromoCard key={p.id} promo={p} compact />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 border-t border-border/60">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Browse by topic</p>
        <h2 className="mt-2 font-display text-3xl font-bold mb-8">Educational collections</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/categories/$name"
              params={{ name: c.name }}
              className="group inline-flex items-center gap-3 rounded-xl border border-border bg-card-grad px-5 py-4 hover:border-primary/50 hover:shadow-glow transition-all"
            >
              <span className="font-display font-semibold group-hover:text-primary">{c.name}</span>
              <span className="text-xs font-mono text-muted-foreground">{c.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
