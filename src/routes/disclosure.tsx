import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclosure")({
  head: () => ({
    meta: [
      { title: "Affiliate Disclosure — Digital Cyber Safety" },
      { name: "description", content: "How Digital Cyber Safety uses affiliate links." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Legal</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Affiliate Disclosure</h1>
      <div className="prose-cyber mt-8">
        <p><em>Last updated: April 2026</em></p>
        <h2>The honest version</h2>
        <p>Digital Cyber Safety is a participant in the Amazon Services LLC Associates Program and similar affiliate programs. When you click an affiliate link and make a purchase, we may earn a small commission at no extra cost to you.</p>
        <h2>How recommendations work</h2>
        <p>We only recommend products and services we'd genuinely suggest to a friend. Affiliate revenue does not influence our editorial choices. Our merchandise links go to our sister brand, Advanced Persistent Threads.</p>
        <h2>How affiliate links are marked</h2>
        <p>Sponsored or affiliate content is labeled as such on the page. All outbound affiliate links carry the appropriate <code>rel="sponsored"</code> attribute.</p>
        <h2>Why this matters</h2>
        <p>Affiliate revenue is what keeps this site running with no paywall, no popups, and no third-party tracking. Thank you for supporting it.</p>
      </div>
    </div>
  ),
});
