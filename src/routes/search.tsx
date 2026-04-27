import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Digital Cyber Safety" },
      { name: "description", content: "Search every Digital Cyber Safety article instantly. Private, fast, no tracking." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const fuse = useMemo(
    () => new Fuse(articles, { keys: ["title", "subtitle", "excerpt", "tags", "categories", "content"], threshold: 0.35, includeScore: true }),
    []
  );
  const results = q.trim() ? fuse.search(q).map((r) => r.item) : articles;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Intel search · Local · Private</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Search the archive</h1>
      <p className="mt-4 text-muted-foreground">Runs entirely in your browser. Nothing is sent anywhere.</p>

      <div className="mt-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try 'phishing', '2fa', 'password manager'…"
          className="w-full rounded-xl border border-border bg-card pl-12 pr-4 py-4 text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:shadow-glow transition-all"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground font-mono">
        {q ? `${results.length} result${results.length === 1 ? "" : "s"} for "${q}"` : `Showing all ${articles.length} articles`}
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {results.map((a) => <ArticleCard key={a.slug} article={a} />)}
        {results.length === 0 && (
          <div className="md:col-span-2 rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            No matches. Try a different term.
          </div>
        )}
      </div>
    </div>
  );
}
