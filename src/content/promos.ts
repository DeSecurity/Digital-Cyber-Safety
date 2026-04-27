// Configuration-driven promotion system.
// Add or edit promos here — they appear across the site by ID.
import dissent from "@/assets/merch-dissent.jpg";
import mask from "@/assets/merch-mask.jpg";
import rtu from "@/assets/merch-rtu.jpg";
import { siteConfig } from "./site.config";

export type Promo =
  | {
      id: string;
      kind: "merch";
      title: string;
      subtitle: string;
      image: string;
      price: string;
      href: string;
      cta: string;
    }
  | {
      id: string;
      kind: "amazon";
      title: string;
      subtitle: string;
      bullets: string[];
      href: string;
      cta: string;
    }
  | {
      id: string;
      kind: "resource";
      title: string;
      subtitle: string;
      bullets: string[];
      href: string;
      cta: string;
    };

export const promos: Record<string, Promo> = {
  "merch-dissent": {
    id: "merch-dissent",
    kind: "merch",
    title: "Dissent. Defy. Disobey.",
    subtitle: "Premium tee from Advanced Persistent Threads",
    image: dissent,
    price: "$32",
    href: `${siteConfig.merchStore}/products/dissent-defy-disobey`,
    cta: "Shop the tee",
  },
  "merch-mask": {
    id: "merch-mask",
    kind: "merch",
    title: "Hacker Mask Word Cloud",
    subtitle: "Heavyweight hoodie · APT collection",
    image: mask,
    price: "$58",
    href: `${siteConfig.merchStore}/products/hacker-mask-word-cloud`,
    cta: "Get the hoodie",
  },
  "merch-rtu": {
    id: "merch-rtu",
    kind: "merch",
    title: "Red Team University",
    subtitle: "Varsity-style tee · APT apparel",
    image: rtu,
    price: "$32",
    href: `${siteConfig.merchStore}/products/red-team-university`,
    cta: "Shop now",
  },
  "amazon-tools": {
    id: "amazon-tools",
    kind: "amazon",
    title: "Recommended Security Tools",
    subtitle: "Hand-picked hardware & books on Amazon",
    bullets: [
      "Hardware security keys (FIDO2)",
      "Privacy screen filters",
      "Encrypted USB drives",
    ],
    href: siteConfig.amazon.storefront,
    cta: "View on Amazon",
  },
  "amazon-privacy": {
    id: "amazon-privacy",
    kind: "amazon",
    title: "Privacy Essentials",
    subtitle: "Everyday gear to lock down your digital life",
    bullets: ["Webcam covers", "RFID-blocking wallets", "Faraday pouches"],
    href: siteConfig.amazon.wishlist,
    cta: "Browse essentials",
  },
  "amazon-starter": {
    id: "amazon-starter",
    kind: "amazon",
    title: "Cybersecurity Starter Kit",
    subtitle: "Everything a non-technical user needs to begin",
    bullets: [
      "Password manager subscription cards",
      "Beginner-friendly security books",
      "Backup external SSDs",
    ],
    href: siteConfig.amazon.storefront,
    cta: "Get the kit",
  },
};

// Default placement strategy — overridable per-article via frontmatter.
export const defaultPlacement = {
  sidebar: ["merch-dissent", "amazon-tools", "merch-mask"],
  inline: ["amazon-starter", "merch-rtu"],
  homepage: ["merch-dissent", "amazon-tools", "merch-mask", "amazon-privacy"],
};

export function getPromos(ids: string[] = []): Promo[] {
  return ids.map((id) => promos[id]).filter(Boolean);
}
