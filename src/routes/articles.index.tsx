import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "All Articles — Digital Cyber Safety" },
      { name: "description", content: "Every cybersecurity briefing published by Digital Cyber Safety. Plain-English guidance for everyday users." },
      { property: "og:title", content: "All Articles — Digital Cyber Safety" },
      { property: "og:description", content: "Every cybersecurity briefing published by Digital Cyber Safety." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Archive · {articles.length} briefings</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">All articles</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        The full archive of guidance from the watch floor. Sorted newest first.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </div>
  );
}
