import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Digital Cyber Safety" },
      { name: "description", content: "How Digital Cyber Safety handles your data." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Legal</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Privacy Policy</h1>
      <div className="prose-cyber mt-8">
        <p><em>Last updated: April 2026</em></p>
        <h2>Short version</h2>
        <p>This site is static. We don't run a backend. We don't collect personal data ourselves. Search runs entirely in your browser.</p>
        <h2>What we do collect</h2>
        <p>Our hosting provider receives basic, anonymized request logs (IP address, user agent, page viewed) for security and uptime — standard for any website. These logs are not used for tracking or advertising and are rotated regularly.</p>
        <h2>Cookies & local storage</h2>
        <p>We store one local preference in your browser: your theme choice (dark or light). That's it. We don't use tracking cookies, advertising pixels, or fingerprinting.</p>
        <h2>Third-party links</h2>
        <p>Links to Amazon and our merch store may set their own cookies once you click through. We have no control over those services. See their respective privacy policies.</p>
        <h2>Contact</h2>
        <p>Privacy questions: <a href="mailto:privacy@digitalcybersafety.com">privacy@digitalcybersafety.com</a></p>
      </div>
    </div>
  ),
});
