import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — shroomé | Café Energy. Home Address.",
  description:
    "Frequently asked questions about shroomé — the world's first ready-to-pour ceremonial matcha latte. 2g matcha, 2g collagen, real mushrooms. Learn about ingredients, how to pour, caffeine content, and more.",
  keywords: [
    "shroomé faq",
    "matcha latte questions",
    "ready to pour matcha",
    "liquid matcha",
    "matcha with collagen",
    "functional mushroom matcha",
    "ceremonial matcha latte",
    "matcha alternative to coffee",
    "drinkshroome",
  ],
  openGraph: {
    title: "FAQ — shroomé | Café Energy. Home Address.",
    description:
      "Everything you need to know about shroomé — the world's first ready-to-pour ceremonial matcha latte with collagen + mushrooms.",
    url: "https://www.drinkshroome.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — shroomé | Café Energy. Home Address.",
    description:
      "Everything you need to know about shroomé — the world's first ready-to-pour ceremonial matcha latte with collagen + mushrooms.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
