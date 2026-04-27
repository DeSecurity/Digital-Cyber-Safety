import { createFileRoute } from "@tanstack/react-router";
import { articles, getAllCategories } from "@/content/articles";
import { siteConfig } from "@/content/site.config";

function buildSitemap() {
  const staticUrls = ["/", "/articles", "/categories", "/search", "/about", "/privacy", "/disclosure"];
  const articleUrls = articles.map((a) => `/articles/${a.slug}`);
  const catUrls = getAllCategories().map((c) => `/categories/${encodeURIComponent(c.name)}`);
  const all = [...staticUrls, ...articleUrls, ...catUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((u) => `  <url><loc>${siteConfig.url}${u}</loc></url>`).join("\n")}
</urlset>`;
}

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "content-type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
