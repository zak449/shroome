import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — read the label. that's the pitch. (drop 002)",
  description:
    "200mg mushroom extracts (organic lion's mane beta-glucans) at ≥70% beta-glucans, third-party tested. ceremonial matcha with l-theanine for sustained focus. drop 001 sold out — get access to drop 002.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "shroomé — read the label. that's the pitch. (drop 002)",
    description:
      "200mg mushroom extracts (organic lion's mane beta-glucans) at ≥70% beta-glucans, third-party tested. ceremonial matcha with l-theanine for sustained focus. drop 001 sold out — get access to drop 002.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — read the label. that's the pitch. (drop 002)",
    description:
      "200mg mushroom extracts (organic lion's mane beta-glucans) at ≥70% beta-glucans, third-party tested. ceremonial matcha with l-theanine for sustained focus. drop 001 sold out — get access to drop 002.",
  },
};

const config: LPConfig = {
  segment: "focus",
  hero: {
    eyebrow: "FRUITING BODY · ≥70% BETA-GLUCANS · DOSES ON THE LABEL",
    headlineLines: ["we'd rather show you", "the label than the ad."],
    subheadline:
      "200mg of organic mushroom extracts — organic lion's mane beta-glucans — real fruiting body, hot-water extracted, standardized to ≥70% beta-glucans and third-party tested. plus 2.5g of ceremonial matcha whose caffeine + naturally occurring l-theanine support sustained focus. every dose disclosed. nothing proprietary. pour it in thirty seconds and get to work.",
    background: "var(--brand-ink)",
    dark: true,
    dataCallouts: ["200mg", "≥70%", "2.5g"],
    sachets: "vanilla",
  },
  stampColor: "var(--brand-flavor-functional)",
  ledgerLight: true,
  benefits: {
    sectionBg: "var(--brand-canvas)",
    cardStyle: "spec",
    disclaimer: true,
    items: [
      {
        title: "fruiting body, not filler",
        body: "most lion's mane products are mycelium grown on grain — which means you're largely paying for starch. ours is hot-water-extracted fruiting body standardized to ≥70% beta-glucans, where typical mushroom supplements land between 15 and 30 percent.",
      },
      {
        title: "the focus pairing that started it all",
        body: "matcha's ~60mg of caffeine arrives alongside naturally occurring l-theanine — the combination people stack on purpose, already stacked by the leaf. it supports sustained focus with a smooth curve instead of a spike, so your deep-work block doesn't end at the crash.",
      },
      {
        title: "thirty seconds, zero friction",
        body: "flow states die in prep time. tear the sachet, pour into milk, one swirl — your entire pre-work setup now takes less time than opening your task manager. same input, same dose, every single morning.",
      },
    ],
  },
  strip: {
    header: "the spec sheet",
    bg: "var(--brand-flavor-functional)",
    stats: [
      { stat: "200mg", label: "mushroom extracts — organic lion's mane beta-glucans — hot-water extracted" },
      { stat: "≥70%", label: "beta-glucan content — third-party verified (typical market range: 15–30%)" },
      { stat: "2.5g", label: "ceremonial matcha — first harvest, shade-grown, ~60mg caffeine + natural l-theanine" },
      { stat: "2g", label: "grass-fed collagen peptides — disclosed like everything else" },
    ],
    footnote:
      "beta-glucans support immune function. no proprietary blends — if it's in the sachet, it's on the label with a number next to it. heavy-metals and microbial tested; made in a GMP-certified facility.",
  },
  proof: {
    header: "proof, in order of what actually matters.",
    body: `we're pre-launch, so we won't perform a review wall for you. here's what we have instead: third-party test results, a label with no hiding places, and a drop 001 (${X1_BOXES} boxes) that sold out to the access list before the site ever said “buy.”`,
    counterLabel: "people in the queue for drop 002",
    badges: [
      "third-party tested — beta-glucan content",
      "heavy-metals screened (As, Pb, Cd, Hg)",
      "microbial tested",
      "GMP-certified facility",
    ],
  },
  faqs: [
    {
      q: "200mg seems low next to 1g+ mushroom products.",
      a: "compare actives, not grams. 200mg at ≥70% beta-glucans delivers ~140mg of beta-glucans; a 1g mycelium-on-grain serving at 20% delivers ~200mg of everything-including-starch, often far less in actual beta-glucans. concentration is the honest metric, and we print ours.",
    },
    {
      q: "fruiting body or mycelium?",
      a: "fruiting body — the actual mushroom, hot-water extracted, which is the traditional method for freeing beta-glucans from the chitin cell wall. no grain, no “myceliated rice,” no ambiguity.",
    },
    {
      q: "what's the caffeine situation?",
      a: "~60mg per sachet from ceremonial matcha, with naturally occurring l-theanine (~30–40mg). enough to support sustained focus for a morning block; light enough to have a second in the afternoon if that's your style.",
    },
    {
      q: "it's sold out. what's the move?",
      a: `we ship in numbered, limited drops — real production runs, published counts. drop 001 (${X1_BOXES} boxes) is gone; drop 002 is ${DROP2_RUN}. get drop access and you're in at open; add your number and the link hits your texts 10 minutes before the public. 20% off and free shipping locked in.`,
    },
  ],
  final: {
    header: "the label already convinced you. the drop won't wait.",
    body: `drop 001 sold out. drop 002 is ${DROP2_RUN} — get access now, the text list shops 10 minutes before the link is public — with an upgraded welcome code.`,
    microcopy: "one text per drop. we email like we label — only when there's something worth reading.",
  },
};

export default function FocusLP() {
  return <LPShell config={config} />;
}
