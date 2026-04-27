// Markdown content pipeline.
// Articles live as .md files in src/content/posts/*.md with frontmatter.
// To publish: drop a new .md file, push to GitHub, site rebuilds automatically.

import matter from "gray-matter";
import readingTime from "reading-time";

// Vite glob: all markdown posts loaded at build time as raw strings.
const rawPosts = import.meta.glob("./posts/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

export type ArticleSection = {
  heading: string;
  body: string;
};

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  updated?: string;
  tags: string[];
  categories: string[];
  cover?: string;
  excerpt: string;
  readingMinutes: number;
  content: string;
  // Structured callout sections (optional, parsed from frontmatter)
  whatThisMeans?: string;
  doRightNow?: string[];
  stayingSafe?: string[];
  faq?: { q: string; a: string }[];
  // Promo placement overrides
  promos?: {
    sidebar?: string[];
    inline?: string[];
  };
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
};

// Resolve cover image references from frontmatter to actual asset URLs.
const coverAssets = import.meta.glob("../assets/*.{jpg,png,webp}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
function resolveCover(name?: string): string | undefined {
  if (!name) return undefined;
  if (name.startsWith("http")) return name;
  const match = Object.entries(coverAssets).find(([k]) => k.endsWith(`/${name}`));
  return match?.[1];
}

function parsePost(path: string, raw: string): Article {
  const { data, content } = matter(raw);
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const stats = readingTime(content);
  const excerpt =
    data.excerpt ||
    content
      .replace(/^#.*$/gm, "")
      .replace(/[#*_`>\[\]]/g, "")
      .trim()
      .slice(0, 180) + "…";

  return {
    slug,
    title: data.title || slug,
    subtitle: data.subtitle,
    author: data.author || "Digital Cyber Safety Team",
    date: data.date || new Date().toISOString(),
    updated: data.updated,
    tags: data.tags || [],
    categories: data.categories || ["General"],
    cover: resolveCover(data.cover),
    excerpt,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    content,
    whatThisMeans: data.whatThisMeans,
    doRightNow: data.doRightNow,
    stayingSafe: data.stayingSafe,
    faq: data.faq,
    promos: data.promos,
    seo: data.seo,
  };
}

export const articles: Article[] = Object.entries(rawPosts)
  .map(([p, r]) => parsePost(p, r))
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getRelated(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return [];
  return articles
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      a,
      score:
        a.categories.filter((c) => current.categories.includes(c)).length * 2 +
        a.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

export function getAllCategories() {
  const map = new Map<string, number>();
  articles.forEach((a) => a.categories.forEach((c) => map.set(c, (map.get(c) || 0) + 1)));
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export function getAllTags() {
  const set = new Set<string>();
  articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}
