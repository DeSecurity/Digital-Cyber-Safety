import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllCategories } from "@/content/articles";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Categories — Digital Cyber Safety" },
      { name: "description", content: "Browse Digital Cyber Safety articles by topic." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const cats = getAllCategories();
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Topics</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Browse by category</h1>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cats.map((c) => (
          <Link
            key={c.name}
            to="/categories/$name"
            params={{ name: c.name }}
            className="group rounded-xl border border-border bg-card-grad p-6 hover:border-primary/50 hover:shadow-glow transition-all"
          >
            <p className="font-display text-xl font-bold group-hover:text-primary">{c.name}</p>
            <p className="mt-1 text-sm font-mono text-muted-foreground">{c.count} article{c.count === 1 ? "" : "s"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
