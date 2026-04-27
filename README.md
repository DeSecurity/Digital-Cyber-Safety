# Digital Cyber Safety — Publishing System

A Markdown-driven, GitHub-deployed cybersecurity publication for everyday users.
Static-first. No backend. No CMS.

## Quick start

```bash
bun install
bun dev
```

## Publishing a new article

1. Create a Markdown file in `src/content/posts/` — e.g. `my-new-article.md`.
2. Add the frontmatter (see template below).
3. Write the article in Markdown.
4. Commit and push to GitHub.
5. The site rebuilds and deploys automatically.

That's the entire workflow.

### Frontmatter template

```yaml
---
title: "Your Article Title"
subtitle: "A short, descriptive subtitle"
author: "Digital Cyber Safety Team"
date: "2026-04-30"
updated: "2026-05-01"               # optional
cover: "article-password.jpg"       # filename inside src/assets/
categories: ["Account Security", "Education"]
tags: ["passwords", "phishing"]
excerpt: "Optional custom excerpt."

# Structured callout sections (all optional)
whatThisMeans: "Plain-English explanation of why this matters."
doRightNow:
  - "First action step"
  - "Second action step"
stayingSafe:
  - "Long-term habit one"
  - "Long-term habit two"
faq:
  - q: "Question?"
    a: "Answer."

# Optional: override default promo placements
promos:
  sidebar: ["merch-dissent", "amazon-tools"]
  inline: ["amazon-starter", "merch-rtu"]

# Optional SEO overrides
seo:
  title: "Custom <title> tag"
  description: "Custom meta description"
---

## Your first heading

Body content as Markdown. Standard syntax — headings, lists, **bold**, *italics*,
[links](https://example.com), `code`, > blockquotes — all supported via GFM.
```

## Repository structure

```
src/
├── content/
│   ├── posts/              ← Markdown articles (drop new .md files here)
│   ├── site.config.ts      ← Branding, nav, affiliate links
│   ├── promos.ts           ← Promo definitions + placement strategy
│   └── articles.ts         ← Markdown loader (no edits needed)
├── components/
│   ├── SiteHeader.tsx      ← Header w/ theme toggle + search
│   ├── SiteFooter.tsx
│   ├── ThemeToggle.tsx     ← Light/dark, persists to localStorage
│   ├── ArticleCard.tsx
│   ├── ArticleBody.tsx     ← Renders markdown + structured callouts
│   ├── TableOfContents.tsx
│   └── PromoCard.tsx
├── routes/
│   ├── __root.tsx          ← Layout shell, global SEO
│   ├── index.tsx           ← Cinematic homepage
│   ├── articles.index.tsx  ← Archive
│   ├── articles.$slug.tsx  ← Article page (TOC + sidebar promos)
│   ├── search.tsx          ← Client-side Fuse.js search
│   ├── categories.*.tsx    ← Category index + detail
│   ├── about.tsx
│   ├── privacy.tsx
│   ├── disclosure.tsx
│   ├── rss.xml.tsx         ← RSS feed
│   └── sitemap.xml.tsx     ← XML sitemap
├── assets/                 ← Cover images & merch product photos
└── styles.css              ← Design system (oklch tokens, light + dark)
```

## Promotion system

All promos live in `src/content/promos.ts`. Three types:

- **merch** — clothing from Advanced Persistent Threads (image-driven cards)
- **amazon** — affiliate modules (curated bullet lists)
- **resource** — future guides / checklists / tools

### Default placements

`defaultPlacement` in `promos.ts` controls where promos appear by default:

- `sidebar` — article sidebar (sticky on desktop)
- `inline` — mid- and end-of-article cards
- `homepage` — homepage promo grid

### Per-article overrides

Add a `promos:` block to any article's frontmatter to override the defaults.

## Affiliate links

Update `siteConfig.amazon` in `src/content/site.config.ts` with your real
affiliate IDs. The current values are the provided placeholder URLs.

All affiliate links carry `rel="noopener sponsored"`.

## Search

Fully client-side via Fuse.js. No backend. No tracking. The entire article
index is bundled at build time and searched in the browser.

## SEO & trust

- Per-route `<title>`, meta description, OG tags
- JSON-LD `Article` schema on every post
- Canonical URLs
- `/rss.xml` feed
- `/sitemap.xml`
- `/robots.txt` allowing all crawlers

## Theming

Light/dark mode toggle in the header. Preference persists to `localStorage`
under `dcs-theme`. The shell injects an inline script in `<head>` to apply
the saved theme before paint, preventing flash.

All colors are defined as `oklch` tokens in `src/styles.css`. Add a new
semantic color by registering it in both `:root` and `.dark`, then in the
`@theme inline` block.

## GitHub auto-deploy

This project lives on Lovable, which deploys automatically on every push to
`main` via the GitHub integration. To self-host:

1. Connect GitHub from the Lovable editor (Connectors → GitHub → Connect).
2. Push to `main` — site updates automatically.
3. (Optional) Mirror to Cloudflare Pages / Vercel / Netlify by pointing them
   at the same repo. The included `.github/workflows/deploy.yml` shows the
   build steps for any CI provider.

## License

MIT — content excluded.
