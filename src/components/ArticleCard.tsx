import { Link } from "@tanstack/react-router";
import { Clock, Calendar } from "lucide-react";
import type { Article } from "@/content/articles";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className={`group block overflow-hidden rounded-xl border border-border bg-card-grad shadow-card transition-all hover:shadow-glow hover:-translate-y-0.5 hover:border-primary/40 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {article.cover && (
        <div className={`relative overflow-hidden bg-muted ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <img
            src={article.cover}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {article.categories.slice(0, 2).map((c) => (
              <span key={c} className="rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono text-primary border border-primary/30">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className={`font-display font-bold leading-tight group-hover:text-primary transition-colors ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          {article.title}
        </h3>
        {article.subtitle && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.subtitle}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {article.readingMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
