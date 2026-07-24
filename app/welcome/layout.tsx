import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "shroomé — The Matcha Latte That Replaced Our Coffee",
  description:
    "2.5g ceremonial matcha, functional mushroom extracts (70%+ beta-glucans), and grass-fed collagen peptides in one sachet. The coffee alternative that actually works. The first run sold out. Join the Flock for first access to the next run.",
  keywords: [
    "matcha latte",
    "coffee alternative",
    "mushroom supplements",
    "ceremonial matcha",
    "functional mushrooms",
    "beta-glucans",
    "collagen peptides",
    "nootropics",
    "L-theanine",
    "adaptogenic drinks",
    "matcha powder",
    "mushroom coffee",
    "lion's mane",
        "shroomé",
    "drinkshroome",
  ],
  alternates: {
    canonical: "https://www.drinkshroome.com/welcome",
  },
  openGraph: {
    title: "shroomé — The Matcha Latte That Replaced Our Coffee",
    description:
      "2.5g ceremonial matcha + lion's mane beta-glucans + collagen peptides. One sachet, one stir, done — no crash. Pour. Swirl. Go.",
    type: "website",
    url: "https://www.drinkshroome.com/welcome",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — The Matcha Latte That Replaced Our Coffee",
    description:
      "2.5g ceremonial matcha + lion's mane beta-glucans + collagen. One sachet, one stir, done — no crash. The Flock shops the next run first.",
  },
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
