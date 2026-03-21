import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes — shroomé | Easy Matcha Latte Recipes",
  description:
    "Easy matcha latte recipes using shroomé sachets. Iced matcha latte, matcha smoothie, matcha affogato, and more — all ready in under 2 minutes. The simplest matcha recipes on the internet.",
  keywords: [
    "matcha latte recipe",
    "iced matcha recipe",
    "easy matcha recipe",
    "matcha smoothie recipe",
    "matcha affogato",
    "protein matcha shake",
    "hot matcha latte",
    "shroomé recipes",
    "ready to pour matcha recipes",
    "quick matcha latte",
    "oat milk matcha",
    "matcha with mushrooms",
  ],
  openGraph: {
    title: "Recipes — shroomé | Easy Matcha Latte Recipes",
    description:
      "6 easy matcha latte recipes using shroomé sachets. Iced, hot, blended, and more — all ready in under 2 minutes.",
    url: "https://www.drinkshroome.com/recipes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipes — shroomé | Easy Matcha Latte Recipes",
    description:
      "6 easy matcha latte recipes using shroomé sachets. Iced, hot, blended, and more — all ready in under 2 minutes.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/recipes",
  },
};

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
