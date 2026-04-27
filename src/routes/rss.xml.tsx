import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/content/articles";
import { siteConfig } from "@/content/site.config";

function buildRss() {
  const items = articles
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteConfig.url}/articles/${a.slug}</link>
      <guid>${siteConfig.url}/articles/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt}]]></description>
      ${a.categories.map((c) => `<category>${c}</category>`).join("")}
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

export const Route = createFileRoute("/rss/xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRss(), {
          headers: { "content-type": "application/rss+xml; charset=utf-8" },
        }),
    },
  },
});
