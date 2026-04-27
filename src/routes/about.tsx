import { createFileRoute } from "@tanstack/react-router";
import { Shield, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Digital Cyber Safety" },
      { name: "description", content: "Why Digital Cyber Safety exists, who it's for, and how we work." },
      { property: "og:title", content: "About Digital Cyber Safety" },
      { property: "og:description", content: "Why Digital Cyber Safety exists, who it's for, and how we work." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary font-mono">Mission brief</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">Cyber defense, translated.</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Digital Cyber Safety exists because most cybersecurity content is written by experts for experts.
        That's a problem — because the people most likely to be targeted are the ones least equipped to read it.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Shield, title: "Defenders first", body: "Built around the practical habits that actually keep people safe." },
          { icon: Eye, title: "Calm, not alarmist", body: "Clear writing. No fear-mongering. No hype." },
          { icon: Heart, title: "For real people", body: "Families, professionals, and anyone who just uses the internet." },
        ].map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card-grad p-5">
            <p.icon className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-bold">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="prose-cyber mt-12">
        <h2>Who we are</h2>
        <p>Digital Cyber Safety is part of a small ecosystem of sites built by working defenders — people who spend their days protecting other people's networks. We translate the lessons we learn at work into guidance anyone can use.</p>
        <h2>Who we write for</h2>
        <p>Non-technical users. Families. Small business owners. Professionals outside IT. If you've ever felt overwhelmed by a security article, this site is for you.</p>
        <h2>How we make money</h2>
        <p>We participate in affiliate programs (including Amazon Associates) and earn small commissions when readers buy through our links. We also sell apparel through our sister brand, Advanced Persistent Threads. Every recommendation is something we'd give to a friend — paid or not. See the <a href="/disclosure">affiliate disclosure</a> for details.</p>
      </div>
    </div>
  );
}
