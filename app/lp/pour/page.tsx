import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — a café matcha latte in 15 seconds. drop 002 is limited.",
  description:
    "tear. pour. done. ready-to-pour ceremonial matcha latte — no whisk, no blender, no line. drop 001 sold out. get drop access before 002 goes.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "shroomé — a café matcha latte in 15 seconds. drop 002 is limited.",
    description:
      "tear. pour. done. ready-to-pour ceremonial matcha latte — no whisk, no blender, no line. drop 001 sold out. get drop access before 002 goes.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — a café matcha latte in 15 seconds. drop 002 is limited.",
    description:
      "tear. pour. done. ready-to-pour ceremonial matcha latte — no whisk, no blender, no line. drop 001 sold out. get drop access before 002 goes.",
  },
};

const config: LPConfig = {
  segment: "pour",
  hero: {
    eyebrow: "30 SECONDS · NO WHISK · NO BLENDER · NO LINE",
    headlineLines: ["the café line was the only", "ingredient we removed."],
    subheadline:
      "a ready-to-pour ceremonial matcha latte in a 1oz sachet. tear it, pour it into any milk, swirl, go — fifteen seconds, one hand, zero cleanup. more ceremonial matcha than your café order, none of the detour.",
    background: "var(--brand-canvas)",
    limeStreak: true,
    sachets: "both",
  },
  stampColor: "var(--brand-flavor-strawberry)",
  benefits: {
    sectionBg: "var(--brand-canvas)",
    cardStyle: "numeral",
    items: [
      {
        title: "fifteen seconds, timed honestly",
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
      { stat: "200mg", label: "lion's mane fruiting-body extract — ≥70% beta-glucans" },
      { stat: "~60mg", label: "caffeine — supports healthy energy levels, no 2pm cliff" },
    ],
    footnote:
      "no added sugar, no artificial sweeteners, no proprietary blends. every dose printed on the sachet. 1 fl oz (30ml) per sachet.",
  },
  proof: {
    header: "drop 001 moved faster than you do.",
    body: `we made ${X1_BOXES} boxes for drop 001. the access list cleared them before the site ever opened to the public. no review wall yet — just a sold-out ledger, a fully disclosed label, and drop 002 on the way.`,
    counterLabel: "people holding drop access",
    badges: [
      "third-party tested for beta-glucan content",
      "heavy-metals screened",
      "GMP-certified facility",
    ],
  },
  faqs: [
    {
      q: "is it really 15 seconds?",
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
      a: `we produce in numbered, limited runs. drop 001 (${X1_BOXES} boxes) sold out; drop 002 is ${DROP2_RUN}. drop access gets you the link at open — the text list gets it 10 minutes early, and your code upgrades from 20% to 30% (best code wins). real runs, real dates, no fake timers.`,
    },
  ],
  final: {
    header: "you have fifteen seconds. that's all this takes.",
    body: `drop 001 sold out. drop 002 is ${DROP2_RUN} — get access now, add your number for the 10-minute head start (your code upgrades from 20% to 30% — best code wins). 20% off and free shipping locked in either way.`,
    microcopy: "one text per drop. that's the entire notification load — promise.",
  },
};

export default function PourLP() {
  return <LPShell config={config} />;
}
