import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { siteConfig } from "@/content/site.config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero shadow-glow">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">Digital Cyber Safety</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">{siteConfig.description}</p>
          <p className="mt-4 text-xs text-muted-foreground/70 font-mono">
            STATUS: <span className="text-success">● OPERATIONAL</span> · v1.0
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/articles" className="hover:text-primary">All Articles</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
            <li><Link to="/search" className="hover:text-primary">Search</Link></li>
            <li><a href="/rss.xml" className="hover:text-primary">RSS Feed</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Trust</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/disclosure" className="hover:text-primary">Affiliate Disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.domain}
      </div>
    </footer>
  );
}
