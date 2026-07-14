import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — drop 002 is coming. the prettiest 15 seconds of your morning",
  description:
    "ready-to-pour ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. drop 001 sold out. get access to drop 002 before it goes.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "shroomé — drop 002 is coming. the prettiest 15 seconds of your morning",
    description:
      "ready-to-pour ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. drop 001 sold out. get access to drop 002 before it goes.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — drop 002 is coming. the prettiest 15 seconds of your morning",
    description:
      "ready-to-pour ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. drop 001 sold out. get access to drop 002 before it goes.",
  },
};

const config: LPConfig = {
  segment: "ritual",
  hero: {
    eyebrow: "POUR / SWIRL / GLOW",
    headlineLines: ["ceremonial-grade matcha,", "minus the ceremony."],
    subheadline:
      "the world's first ready-to-pour ceremonial matcha latte. tear the sachet, pour into your milk, watch it swirl. fifteen seconds to the drink you've been saving on your fyp.",
    background: "linear-gradient(160deg, var(--brand-tint-soft) 0%, var(--brand-tint-blush) 100%)",
    cloudOpacity: 0.35,
    sachets: "both",
  },
  stampColor: "var(--brand-flavor-strawberry)",
  benefits: {
    sectionBg: "var(--brand-tint-blush)",
    cardStyle: "soft",
    items: [
      {
        title: "the swirl is the whole show",
        body: "dark green concentrate hits your milk and blooms into ribbons before settling into a perfect sage latte. it's the moment every matcha video is chasing — and now it's the entire recipe.",
      },
      {
        title: "café-order taste, sink stays clean",
        body: "2.5g of first-harvest, shade-grown ceremonial matcha in every sachet — smooth and naturally sweet, never bitter or grassy. no whisk to rinse, no powder on the counter, no skill required.",
      },
      {
        title: "pretty on the outside, honest on the inside",
        body: "every dose is printed right on the sachet — ceremonial matcha, grass-fed collagen, lion's mane extract. the aesthetic is the invitation; the label is the reason you stay.",
      },
    ],
  },
  strip: {
    header: "what's in the pour",
    bg: "var(--brand-flavor-functional)",
    stats: [
      { stat: "~60mg", label: "caffeine, with matcha's natural l-theanine" },
      { stat: "2.5g", label: "ceremonial matcha — first harvest, shade-grown" },
      { stat: "200mg", label: "organic lion's mane extract" },
      { stat: "2g", label: "grass-fed collagen peptides" },
    ],
    footnote:
      "no artificial sweeteners. no proprietary blends. two flavors: vanilla & strawberry.",
  },
  proof: {
    header: "drop 001 is already gone.",
    body: `we made ${X1_BOXES} boxes. the access list drank them before drop 001 ever hit the site. no paid reviews to show you yet — just a sold-out ledger and a line forming for drop 002.`,
    counterLabel: "people holding drop access",
    badges: [
      "third-party tested for purity",
      "heavy-metals tested",
      "made in a GMP-certified facility",
    ],
  },
  faqs: [
    {
      q: "is it actually ceremonial grade?",
      a: "yes — first-harvest (ichiban-cha), shade-grown a minimum of 21 days. that's why it's smooth and naturally sweet instead of bitter. it's the grade cafés wish they used.",
    },
    {
      q: "how do i make it?",
      a: "tear the sachet, pour the 1oz concentrate into 6–8oz of your milk of choice (oat is our house pick), give it one swirl. iced or hot. that's it — no whisk, no frother, no blender.",
    },
    {
      q: "what does it taste like?",
      a: "vanilla is warm and floral — like your favorite oat latte grew up. strawberry is bright and fresh — matcha's summer self. both finish clean, zero chalkiness.",
    },
    {
      q: "when can i actually buy it?",
      a: `drop 001 sold out. drop 002 is ${DROP2_RUN} — drop access members get the link first, and the text list gets it 10 minutes before everyone. that's the honest answer: real runs, real dates, no fake timers.`,
    },
  ],
  final: {
    header: "drop 002 won't wait around.",
    body: "drop 001 sold out. drop 002 is a limited run — get access now, and add your number if you want the link 10 minutes early (your code upgrades from 20% to 30% — best code wins). 20% off and free shipping are locked in either way.",
    microcopy: "no spam, ever. we text once per drop. that's the whole relationship.",
  },
};

export default function RitualLP() {
  return <LPShell config={config} />;
}
