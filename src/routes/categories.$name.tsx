import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/categories/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.name} — Digital Cyber Safety` },
      { name: "description", content: `Articles in the ${params.name} category.` },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { name } = Route.useParams();
  const list = articles.filter((a) => a.categories.includes(name));
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <Link to="/categories" className="text-xs font-mono uppercase tracking-[0.2em] text-primary hover:underline">← All categories</Link>
      <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold">{name}</h1>
      <p className="mt-2 text-muted-foreground font-mono text-sm">{list.length} article{list.length === 1 ? "" : "s"}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => <ArticleCard key={a.slug} article={a} />)}
      </div>
    </div>
  );
}
