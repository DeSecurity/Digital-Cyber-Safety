import { Promo } from "@/content/promos";
import { ExternalLink } from "lucide-react";

export function PromoCard({ promo, compact = false }: { promo: Promo; compact?: boolean }) {
  if (promo.kind === "merch") {
    return (
      <a
        href={promo.href}
        target="_blank"
        rel="noopener sponsored"
        className="group block overflow-hidden rounded-xl border border-border bg-card-grad shadow-card transition-all hover:shadow-glow hover:-translate-y-0.5"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={promo.image}
            alt={promo.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono text-primary border border-primary/30">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> APT Merch
          </div>
          <div className="absolute bottom-3 right-3 rounded-md bg-background/90 backdrop-blur px-2.5 py-1 text-sm font-bold">
            {promo.price}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-base leading-tight">{promo.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{promo.subtitle}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover:gap-2 transition-all">
            {promo.cta} <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </a>
    );
  }

  // amazon / resource
  return (
    <a
      href={promo.href}
      target="_blank"
      rel="noopener sponsored"
      className="group block rounded-xl border border-border bg-card-grad p-4 shadow-card transition-all hover:shadow-glow hover:border-primary/40"
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-mono text-primary mb-2">
        {promo.kind === "amazon" ? "Amazon · Affiliate" : "Resource"}
      </div>
      <h3 className="font-display font-bold text-base leading-tight">{promo.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{promo.subtitle}</p>
      {!compact && (
        <ul className="mt-3 space-y-1.5">
          {promo.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover:gap-2 transition-all">
        {promo.cta} <ExternalLink className="h-3 w-3" />
      </div>
    </a>
  );
}
