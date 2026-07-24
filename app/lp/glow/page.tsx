import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — drop 002: your matcha latte is now a beauty step",
  description:
    "2g grass-fed collagen + ceremonial matcha in one ready-to-pour sachet. supports skin health. tastes like a treat. drop 001 sold out — get access to drop 002.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "shroomé — drop 002: your matcha latte is now a beauty step",
    description:
      "2g grass-fed collagen + ceremonial matcha in one ready-to-pour sachet. supports skin health. tastes like a treat. drop 001 sold out — get access to drop 002.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — drop 002: your matcha latte is now a beauty step",
    description:
      "2g grass-fed collagen + ceremonial matcha in one ready-to-pour sachet. supports skin health. tastes like a treat. drop 001 sold out — get access to drop 002.",
  },
};

const config: LPConfig = {
  segment: "glow",
  hero: {
    eyebrow: "COLLAGEN + CEREMONIAL MATCHA + LION'S MANE",
    headlineLines: ["the beauty step", "you drink."],
    subheadline:
      "2g of grass-fed collagen peptides folded into a ceremonial matcha latte you'll actually crave. skin-health support that doesn't taste like a supplement — because it isn't one more scoop, shake, or chore.",
    background: "var(--brand-tint-blush)",
    cloudOpacity: 0.28,
    sachets: "strawberry",
  },
  stampColor: "var(--brand-flavor-functional)",
  benefits: {
    sectionBg: "var(--brand-tint-blush)",
    cardStyle: "soft",
    disclaimer: true,
    items: [
      {
        title: "skin support, disguised as a latte",
        body: "every sachet carries 2g of grass-fed, hydrolyzed collagen peptides — types I and III, the ones that support skin health and gut health. it dissolves completely into the pour, so the only texture you notice is creamy.",
      },
      {
        title: "the antioxidant part is the matcha",
        body: "2.5g of first-harvest ceremonial matcha provides antioxidant support with every glass — catechins and EGCG come standard, not as an add-on. your morning drink was always going to happen; now it's pulling double duty.",
      },
      {
        title: "the routine you'll actually keep",
        body: "collagen only works if you take it, and scoops get skipped. this is a thirty-second pour that tastes like vanilla or strawberry — consistency stops being discipline and starts being the best part of your morning.",
      },
    ],
  },
  strip: {
    header: "read it like an ingredient list — because it is one",
    bg: "var(--brand-tint-soft)",
    stats: [
      { stat: "2g", label: "grass-fed collagen peptides — hydrolyzed, low molecular weight, types I & III" },
      { stat: "2.5g", label: "ceremonial matcha — antioxidant support, naturally occurring l-theanine" },
      { stat: "200mg", label: "mushroom extracts (organic lion's mane beta-glucans) — ≥70% beta-glucans, third-party tested" },
      { stat: "0g", label: "added sugar. zero artificial sweeteners, colors, or proprietary blends" },
    ],
    footnote:
      "grass-fed, pasture-raised bovine collagen. no soy, no dairy. every dose printed on the sachet.",
  },
  proof: {
    header: "drop 001 sold out before we could brag.",
    body: `${X1_BOXES} boxes went to the access list and disappeared. we don't have a wall of reviews yet — we have a label we'll put next to anyone's, and a line already forming for drop 002.`,
    counterLabel: "people holding drop access",
    badges: [
      "third-party tested",
      "heavy-metals screened",
      "GMP-certified facility",
      "doses fully disclosed",
    ],
  },
  faqs: [
    {
      q: "is 2g of collagen actually meaningful?",
      a: "it's a daily maintenance dose of hydrolyzed, low-molecular-weight peptides — the form your body can absorb efficiently. our philosophy: the dose you take every single day beats the bigger scoop you abandon by february.",
    },
    {
      q: "can i taste the collagen?",
      a: "no. hydrolyzed peptides dissolve clean into the concentrate. you taste madagascar vanilla or real strawberry over smooth ceremonial matcha — nothing chalky, nothing “supplement-y.”",
    },
    {
      q: "is it clean?",
      a: "grass-fed, pasture-raised bovine collagen, organic mushroom extracts (organic lion's mane beta-glucans), ceremonial matcha. no added sugar, no artificial sweeteners, no dyes, no proprietary blends. every dose is on the label.",
    },
    {
      q: "it's sold out — how do drops work?",
      a: `we make full production runs and release them as drops. drop 001 (${X1_BOXES} boxes) poured out in 9 days; drop 002 is next. access members get the link at open, the text list hears first. real runs, real dates — we don't do fake countdowns.`,
    },
  ],
  final: {
    header: "glow is a habit. drop 002 is the start.",
    body: `drop 001 sold out. drop 002 is ${DROP2_RUN} — get access now, the text list shops 10 minutes before the link is public — with an upgraded welcome code.`,
    microcopy: "one text per drop. we'd rather show up rarely and matter.",
  },
};

export default function GlowLP() {
  return <LPShell config={config} />;
}
