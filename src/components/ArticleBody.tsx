// Renders the article body (Markdown → HTML) plus structured callout sections.
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { AlertCircle, ListChecks, Shield, HelpCircle } from "lucide-react";
import type { Article } from "@/content/articles";
import { getPromos } from "@/content/promos";
import { PromoCard } from "./PromoCard";

function Callout({
  icon: Icon,
  label,
  tone,
  children,
}: {
  icon: typeof AlertCircle;
  label: string;
  tone: "info" | "action" | "safe" | "faq";
  children: React.ReactNode;
}) {
  const tones = {
    info: "border-primary/40 bg-primary/5",
    action: "border-warning/40 bg-warning/5",
    safe: "border-success/40 bg-success/5",
    faq: "border-border bg-muted/40",
  } as const;
  const iconTones = {
    info: "text-primary",
    action: "text-warning",
    safe: "text-success",
    faq: "text-muted-foreground",
  } as const;
  return (
    <section className={`my-8 rounded-xl border ${tones[tone]} p-5 md:p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${iconTones[tone]}`} />
        <h3 className="font-display font-bold text-sm uppercase tracking-[0.15em]">{label}</h3>
      </div>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}

export function ArticleBody({ article, inlinePromoIds = [] }: { article: Article; inlinePromoIds?: string[] }) {
  const inlinePromos = getPromos(inlinePromoIds);
  const midPromo = inlinePromos[0];
  const endPromo = inlinePromos[1];

  return (
    <div className="prose-cyber">
      {article.whatThisMeans && (
        <Callout icon={AlertCircle} label="What this means for you" tone="info">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.whatThisMeans}</ReactMarkdown>
        </Callout>
      )}

      {article.doRightNow && article.doRightNow.length > 0 && (
        <Callout icon={ListChecks} label="What to do right now" tone="action">
          <ol className="space-y-2 list-decimal pl-5">
            {article.doRightNow.map((s, i) => (
              <li key={i}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children }) => <span>{children}</span> }}>
                  {s}
                </ReactMarkdown>
              </li>
            ))}
          </ol>
        </Callout>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
      >
        {article.content}
      </ReactMarkdown>

      {midPromo && (
        <div className="my-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">Sponsored · Supports our work</p>
          <PromoCard promo={midPromo} />
        </div>
      )}

      {article.stayingSafe && article.stayingSafe.length > 0 && (
        <Callout icon={Shield} label="How to stay safe" tone="safe">
          <ul className="space-y-2 list-disc pl-5">
            {article.stayingSafe.map((s, i) => (
              <li key={i}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children }) => <span>{children}</span> }}>
                  {s}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
        </Callout>
      )}

      {article.faq && article.faq.length > 0 && (
        <Callout icon={HelpCircle} label="Frequently asked" tone="faq">
          <div className="space-y-4">
            {article.faq.map((f, i) => (
              <div key={i}>
                <p className="font-semibold text-foreground">{f.q}</p>
                <p className="mt-1 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </Callout>
      )}

      {endPromo && (
        <div className="my-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">Recommended gear</p>
          <PromoCard promo={endPromo} />
        </div>
      )}
    </div>
  );
}
