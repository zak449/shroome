import type { Metadata } from "next";
import LPShell, { type LPConfig } from "../LPShell";
import { X1_BOXES, DROP2_RUN } from "../../lib/drop-config";

export const metadata: Metadata = {
  title: "shroomé — break up with the crash, not with caffeine",
  description:
    "~60mg caffeine + matcha's natural l-theanine for calm, steady energy. a liquid ceremonial matcha latte. the first run sold out — get access to the next run.",
  robots: { index: false, follow: false },
  // Prevent inheriting the root layout's canonical ("/") on this noindex LP.
  alternates: { canonical: null },
  openGraph: {
    title: "shroomé — break up with the crash, not with caffeine",
    description:
      "~60mg caffeine + matcha's natural l-theanine for calm, steady energy. a liquid ceremonial matcha latte. the first run sold out — get access to the next run.",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — break up with the crash, not with caffeine",
    description:
      "~60mg caffeine + matcha's natural l-theanine for calm, steady energy. a liquid ceremonial matcha latte. the first run sold out — get access to the next run.",
  },
};

const config: LPConfig = {
  segment: "calm",
  hero: {
    eyebrow: "CALM, STEADY ENERGY · SUPPORTS SUSTAINED FOCUS",
    headlineLines: ["break up with the crash.", "keep the energy."],
    subheadline:
      "shroomé is a liquid ceremonial matcha latte with ~60mg of caffeine and matcha's naturally occurring l-theanine — energy that arrives smooth, stays steady, and leaves quietly. no 2pm cliff. no jitters. no apology tour.",
    background: "linear-gradient(155deg, var(--brand-tint-soft) 0%, var(--brand-tint-soft) 55%, var(--brand-tint-soft) 100%)",
    cloudOpacity: 0.4,
    sachets: "vanilla",
  },
  stampColor: "var(--brand-flavor-functional)",
  curve: true,
  benefits: {
    sectionBg: "var(--brand-tint-soft)",
    cardStyle: "soft",
    disclaimer: true,
    items: [
      {
        title: "the l-theanine difference",
        body: "shade-grown ceremonial matcha naturally carries l-theanine alongside its caffeine — a pairing known for smooth, focused alertness rather than a spike-and-crash. it's why matcha energy feels like a hum, not an alarm.",
      },
      {
        title: "~60mg, on purpose",
        body: "about half an espresso shot of caffeine, delivered with matcha's slower absorption character. enough to support healthy energy levels through your morning — gentle enough that switching, or tapering alongside your coffee, feels easy instead of brutal.",
      },
      {
        title: "a drink you'd choose anyway",
        body: "quitting the crash shouldn't taste like punishment. this is a genuinely good latte — 2.5g ceremonial matcha in vanilla or strawberry, poured into your milk in thirty seconds. the switch sticks because you look forward to it.",
      },
    ],
  },
  strip: {
    header: "what's doing the work",
    bg: "var(--brand-flavor-functional)",
    stats: [
      { stat: "~60mg", label: "caffeine — about half an espresso shot" },
      { stat: "2.5g", label: "ceremonial matcha — naturally occurring l-theanine, supports sustained focus" },
      { stat: "200mg", label: "mushroom extracts (organic lion's mane beta-glucans) — ≥70% beta-glucans" },
      { stat: "2g", label: "grass-fed collagen peptides — along for the ride" },
    ],
    footnote:
      "no added sugar, no artificial anything, no proprietary blends. every dose printed on the sachet.",
  },
  proof: {
    header: "the first run didn't survive the access list.",
    body: `we're not going to show you a fake wall of five-star reviews — we're pre-launch and the first run (${X1_BOXES} boxes) already sold out. what we can show you: a fully disclosed label, third-party testing, and the line forming for the next run.`,
    counterLabel: "people holding drop access",
    badges: [
      "third-party tested for beta-glucan content",
      "heavy-metals screened",
      "GMP-certified facility",
    ],
  },
  faqs: [
    {
      q: "will 60mg of caffeine be enough for me?",
      a: "if you're used to multiple coffees, try the gradual route — keep your morning coffee and make shroomé your second drink, then let it take over. most people find the steadiness means they stop chasing the second and third cup.",
    },
    {
      q: "what does “no crash” actually mean?",
      a: "coffee's caffeine tends to hit fast and drop hard. matcha's caffeine arrives with naturally occurring l-theanine and absorbs more gradually, so the energy curve is flatter — a longer, calmer carry instead of a spike and a cliff.",
    },
    {
      q: "does it taste like grass?",
      a: "no — that's culinary-grade matcha's reputation, and we don't use it. first-harvest ceremonial matcha is smooth and naturally sweet, finished with madagascar vanilla or real strawberry.",
    },
    {
      q: "when can i buy it?",
      a: `the first run sold out. the next run is ${DROP2_RUN} — drop-access members get the link at open, and the text list gets it 10 minutes early. real runs, real dates, nothing manufactured.`,
    },
  ],
  final: {
    header: "your last crash is behind you. the next run is ahead.",
    body: "the first run poured out in 9 days. the next run is one full production run — when it pours out, it pours out. get access now — the text list hears first, with an upgraded welcome code.",
    microcopy: "one text per drop. two emails a week max. all signal.",
  },
};

export default function CalmLP() {
  return <LPShell config={config} />;
}
