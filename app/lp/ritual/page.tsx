import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — the next run is coming. the prettiest 30 seconds of your morning",
  description:
    "liquid ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. the first run sold out. get access to the next run before it goes.",
  robots: { index: false, follow: false },
  // Prevent inheriting the root layout's canonical ("/") on this noindex LP.
  alternates: { canonical: null },
  openGraph: {
    title: "shroomé — the next run is coming. the prettiest 30 seconds of your morning",
    description:
      "liquid ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. the first run sold out. get access to the next run before it goes.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — the next run is coming. the prettiest 30 seconds of your morning",
    description:
      "liquid ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. the first run sold out. get access to the next run before it goes.",
  },
};

const config: LPConfig = {
  segment: "ritual",
  hero: {
    eyebrow: "POUR / SWIRL / GLOW",
    headlineLines: ["ceremonial-grade matcha,", "minus the ceremony."],
    subheadline:
      "the liquid ceremonial matcha latte. tear the sachet, pour into your milk, watch it swirl. thirty seconds to the drink you've been saving on your fyp.",
    background: "linear-gradient(160deg, var(--brand-tint-soft) 0%, var(--brand-tint-blush) 100%)",
    cloudOpacity: 0.35,
    sachets: "both",
  },
  stampColor: "var(--brand-tint-soft)",
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
        body: "every dose is printed right on the sachet — ceremonial matcha, grass-fed collagen, mushroom extracts. the aesthetic is the invitation; the label is the reason you stay.",
      },
    ],
  },
  strip: {
    header: "what's in the pour",
    bg: "var(--brand-flavor-functional)",
    stats: [
      { stat: "2.5g", label: "ceremonial matcha — first harvest, shade-grown" },
      { stat: "2g", label: "grass-fed collagen peptides" },
      { stat: "200mg", label: "mushroom extracts (organic lion's mane beta-glucans), ≥70% beta-glucans" },
      { stat: "~60mg", label: "caffeine, with matcha's natural l-theanine" },
    ],
    footnote:
      "no added sugar. no artificial sweeteners. no proprietary blends. two flavors: vanilla & strawberry.",
  },
  proof: {
    header: "the first run is already gone.",
    body: `we made ${X1_BOXES} boxes. the access list drank them before the first run ever hit the site. no paid reviews to show you yet — just a sold-out ledger and a line forming for the next run.`,
    counterLabel: "people holding drop access",
    badges: [
      "third-party tested for beta-glucan content",
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
      a: `the first run sold out. the next run is ${DROP2_RUN} — drop access members get the link first, and the text list gets it 10 minutes before everyone. that's the honest answer: real runs, real dates, no fake timers.`,
    },
  ],
  final: {
    header: "the next run won't wait around.",
    body: "the first run poured out in 9 days. the next run is one full production run — when it pours out, it pours out. get access now: the text list hears first. (your welcome code upgrades when you add your number.)",
    microcopy: "no spam, ever. we text once per drop. that's the whole relationship.",
  },
};

export default function RitualLP() {
  return <LPShell config={config} />;
}
