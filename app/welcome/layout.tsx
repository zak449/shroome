import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "shroomé — The Matcha Latte That Replaced Our Coffee",
  description:
    "2g ceremonial matcha, functional mushroom extracts (70%+ beta-glucans), and grass-fed collagen peptides in one sachet. The coffee alternative that actually works. Join the waitlist for 20% off + free shipping.",
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
    "reishi",
    "shroomé",
    "drinkshroome",
  ],
  alternates: {
    canonical: "https://www.drinkshroome.com/welcome",
  },
  openGraph: {
    title: "shroomé — The Matcha Latte That Replaced Our Coffee",
    description:
      "2g ceremonial matcha + functional mushroom extracts + collagen peptides. One sachet, 15 seconds, no crash. Get 20% off + free shipping.",
    type: "website",
    url: "https://www.drinkshroome.com/welcome",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — The Matcha Latte That Replaced Our Coffee",
    description:
      "2g ceremonial matcha + functional mushroom extracts + collagen. One sachet, 15 seconds, no crash. Join the waitlist.",
  },
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
