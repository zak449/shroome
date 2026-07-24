import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — a café matcha latte. the stir is the recipe. the next run won't wait.",
  description:
    "pour. swirl. go. the liquid ceremonial matcha latte — no whisk, no blender, no line. the first run sold out. get drop access before the next run goes.",
  robots: { index: false, follow: false },
  // Prevent inheriting the root layout's canonical ("/") on this noindex LP.
  alternates: { canonical: null },
  openGraph: {
    title: "shroomé — a café matcha latte. the stir is the recipe. the next run won't wait.",
    description:
      "pour. swirl. go. the liquid ceremonial matcha latte — no whisk, no blender, no line. the first run sold out. get drop access before the next run goes.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — a café matcha latte. the stir is the recipe. the next run won't wait.",
    description:
      "pour. swirl. go. the liquid ceremonial matcha latte — no whisk, no blender, no line. the first run sold out. get drop access before the next run goes.",
  },
};

const config: LPConfig = {
  segment: "pour",
  hero: {
    eyebrow: "30 SECONDS · NO WHISK · NO BLENDER · NO LINE",
    headlineLines: ["the café line was the only", "ingredient we removed."],
    subheadline:
      "a liquid ceremonial matcha latte in a 1oz sachet. tear it, pour it into any milk, swirl, go — thirty seconds, one hand, zero cleanup. more ceremonial matcha than your café order, none of the detour.",
    background: "var(--brand-canvas)",
    limeStreak: true,
    sachets: "both",
  },
  stampColor: "var(--brand-tint-soft)",
  benefits: {
    sectionBg: "var(--brand-canvas)",
    cardStyle: "numeral",
    items: [
      {
        title: "thirty seconds, timed honestly",
        body: "tear the sachet, pour the concentrate into 6–8oz of milk, one swirl — done before the toast pops. no whisk to wash, no blender to unclog, no powder dusting your counter at 6:45am.",
      },
      {
        title: "café-grade, not compromise-grade",
        body: "2.5g of first-harvest ceremonial matcha per sachet — more real matcha than most cafés whisk into the $8 order you're skipping. smooth vanilla or bright strawberry, iced or hot, in whatever milk is in the fridge.",
      },
      {
        title: "lives wherever your day happens",
        body: "each sachet is 1oz — shelf-stable, TSA-friendly, one per desk drawer, diaper bag, gym bag, carry-on. the good drink now has the same logistics as a granola bar.",
      },
    ],
  },
  strip: {
    header: "small sachet. full label.",
    bg: "var(--brand-flavor-functional)",
    stats: [
      { stat: "2.5g", label: "ceremonial matcha — first harvest, shade-grown" },
      { stat: "2g", label: "grass-fed collagen peptides" },
      { stat: "200mg", label: "mushroom extracts — organic lion's mane beta-glucans — ≥70% beta-glucans" },
      { stat: "~60mg", label: "caffeine — supports healthy energy levels, no 2pm cliff" },
    ],
    footnote:
      "no added sugar, no artificial sweeteners, no proprietary blends. every dose printed on the sachet. 1 fl oz (30ml) per sachet.",
  },
  proof: {
    header: "the first run moved faster than you do.",
    body: `we made ${X1_BOXES} boxes for the first run. the access list cleared them before the site ever opened to the public. no review wall yet — just a sold-out ledger, a fully disclosed label, and the next run on the way.`,
    counterLabel: "people holding drop access",
    badges: [
      "third-party tested for beta-glucan content",
      "heavy-metals screened",
      "GMP-certified facility",
    ],
  },
  faqs: [
    {
      q: "is it really just a stir?",
      a: "tear, pour, swirl — yes. the concentrate is liquid, so there's nothing to dissolve, froth, or rinse. our engineers timed it while holding a coffee in the other hand.",
    },
    {
      q: "hot or iced? what milk?",
      a: "both, and any — oat is our house pick. pour into cold milk over ice, or into warm milk for a latte. water works in a pinch (it drinks like a strong iced matcha).",
    },
    {
      q: "can i fly with it?",
      a: "yes — each sachet is 1oz (30ml), under the TSA liquid limit. a box of 12 fits in a quart bag with room left for your actual toiletries.",
    },
    {
      q: "how do drops work?",
      a: `we make full production runs and release them as drops. the first run (${X1_BOXES} boxes) poured out in 9 days; the next run is next. drop access gets you the link at open — the text list hears first, with an upgraded welcome code. real runs, real dates, no fake timers.`,
    },
  ],
  final: {
    header: "you have thirty seconds. that's all this takes.",
    body: `the first run sold out. the next run is ${DROP2_RUN} — get access now, the text list shops 10 minutes before the link is public — with an upgraded welcome code.`,
    microcopy: "one text per drop. that's the entire notification load — promise.",
  },
};

export default function PourLP() {
  return <LPShell config={config} />;
}
