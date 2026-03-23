import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Pour Pre-Order — shroomé | 30% Off + 3 Reorder Codes",
  description:
    "Pre-order shroomé at 30% off ($25.20 vs $36). Ships June 1 — 2 weeks before public launch. Includes 3 reorder codes at 30% off. Ceremonial matcha + lion's mane + collagen.",
  keywords: [
    "shroomé pre-order",
    "matcha pre-order discount",
    "shroomé first pour",
    "ceremonial matcha latte pre-order",
    "shroomé 30% off",
    "matcha mushroom collagen pre-order",
  ],
  openGraph: {
    title: "First Pour Pre-Order — shroomé | 30% Off + 3 Reorder Codes",
    description:
      "Pre-order shroomé at 30% off. $25.20 vs $36. Ships June 1, 2 weeks early. 3 reorder codes included.",
    url: "https://www.drinkshroome.com/founders",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Pour Pre-Order — shroomé | 30% Off + 3 Reorder Codes",
    description:
      "Pre-order shroomé at 30% off. $25.20 vs $36. Ships June 1, 2 weeks early. 3 reorder codes included.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/founders",
  },
};

export default function FoundersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
