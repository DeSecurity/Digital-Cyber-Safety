// Builds an in-page table of contents from the article markdown headings.
import { useEffect, useState } from "react";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const [active, setActive] = useState<string>("");

  const headings = markdown
    .split("\n")
    .filter((l) => /^##\s/.test(l))
    .map((l) => {
      const text = l.replace(/^##\s+/, "").trim();
      return { text, id: slugify(text) };
    });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [markdown]);

  if (headings.length < 2) return null;

  return (
    <nav className="rounded-xl border border-border bg-card-grad p-5 shadow-card">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-3">On this page</p>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 pl-3 transition-colors ${
                active === h.id
                  ? "border-primary text-primary font-medium"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
