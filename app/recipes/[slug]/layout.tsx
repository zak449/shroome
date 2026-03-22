import type { Metadata } from "next";
import { recipes } from "../data";

/* ── Per-recipe SEO descriptions & keywords ── */
const seoMap: Record<
  string,
  { description: string; keywords: string[] }
> = {
  "classic-iced-matcha-latte": {
    description:
      "Make a Classic Iced Matcha Latte in 15 seconds with shroomé — ceremonial matcha, lion's mane mushroom, and collagen in one sachet. Just tear, pour over oat milk, and enjoy a layered iced matcha with clean energy and zero prep.",
    keywords: [
      "iced matcha latte recipe",
      "classic iced matcha latte",
      "easy iced matcha",
      "matcha latte recipe",
      "oat milk matcha latte",
      "shroomé recipe",
      "matcha mushroom latte",
      "lion's mane matcha",
      "collagen matcha latte",
      "quick matcha latte",
      "ready to pour matcha",
      "ceremonial matcha latte",
    ],
  },
  "vanilla-matcha-smoothie": {
    description:
      "Blend a creamy Vanilla Matcha Smoothie in under a minute with shroomé vanilla — frozen banana, oat milk, ceremonial matcha, lion's mane mushroom, and collagen. Thick, naturally sweet, and packed with clean energy.",
    keywords: [
      "vanilla matcha smoothie",
      "matcha smoothie recipe",
      "matcha banana smoothie",
      "easy matcha smoothie",
      "shroomé recipe",
      "vanilla matcha",
      "mushroom matcha smoothie",
      "collagen matcha smoothie",
      "blended matcha",
      "healthy matcha smoothie",
      "lion's mane smoothie",
    ],
  },
  "strawberry-rose-matcha-latte": {
    description:
      "Make a stunning Strawberry Rose Matcha Latte in 30 seconds with shroomé strawberry — layered pink milk, rose water, ceremonial matcha, lion's mane mushroom, and collagen. Floral, fruity, and Instagram-worthy.",
    keywords: [
      "strawberry matcha latte",
      "rose matcha latte",
      "strawberry rose matcha",
      "pink matcha latte recipe",
      "shroomé recipe",
      "strawberry matcha",
      "floral matcha latte",
      "mushroom matcha latte",
      "collagen matcha",
      "easy matcha recipe",
      "layered matcha latte",
    ],
  },
  "matcha-affogato": {
    description:
      "Pour a Matcha Affogato in 15 seconds — one shroomé sachet over vanilla ice cream for the easiest matcha dessert ever. Ceremonial matcha, lion's mane mushroom, and collagen meet creamy gelato.",
    keywords: [
      "matcha affogato",
      "matcha affogato recipe",
      "matcha dessert",
      "matcha ice cream",
      "easy matcha dessert",
      "shroomé recipe",
      "matcha over ice cream",
      "mushroom matcha dessert",
      "collagen matcha",
      "matcha treat",
      "quick matcha dessert",
    ],
  },
  "protein-matcha-shake": {
    description:
      "Blend a Protein Matcha Shake in 1 minute with shroomé — ceremonial matcha, lion's mane mushroom, collagen, and your favorite protein powder. Clean post-workout energy with almond milk and ice.",
    keywords: [
      "protein matcha shake",
      "matcha protein shake recipe",
      "post workout matcha",
      "matcha protein smoothie",
      "shroomé recipe",
      "matcha protein powder",
      "mushroom protein shake",
      "collagen protein shake",
      "healthy matcha shake",
      "easy matcha protein",
      "lion's mane protein shake",
    ],
  },
  "hot-matcha-latte": {
    description:
      "Make a Hot Matcha Latte with latte art in under a minute — one shroomé sachet, steamed oat milk, ceremonial matcha, lion's mane mushroom, and collagen. Cozy, clean energy with a professional barista pour.",
    keywords: [
      "hot matcha latte",
      "hot matcha latte recipe",
      "matcha latte at home",
      "easy hot matcha",
      "shroomé recipe",
      "matcha latte art",
      "steamed matcha latte",
      "oat milk matcha",
      "mushroom matcha latte",
      "collagen matcha latte",
      "ceremonial matcha latte",
    ],
  },
  "light-matcha-agua-fresca": {
    description:
      "Stir up a Strawberry Matcha Agua Fresca in 15 seconds with shroomé strawberry — cold water, fresh lemon, agave, ceremonial matcha, lion's mane mushroom, and collagen. Light, citrusy, barely sweet, and ultra-refreshing.",
    keywords: [
      "matcha agua fresca",
      "strawberry matcha agua fresca",
      "matcha water recipe",
      "light matcha drink",
      "shroomé recipe",
      "strawberry matcha water",
      "matcha lemonade",
      "refreshing matcha",
      "mushroom matcha drink",
      "collagen agua fresca",
      "easy matcha refresher",
    ],
  },
  "coconut-water-matcha": {
    description:
      "Mix a Coconut Water Matcha in 15 seconds with shroomé — coconut water, fresh mint, ceremonial matcha, lion's mane mushroom, and collagen. Tropical, hydrating, electrolyte-rich, and dairy-free. No milk needed.",
    keywords: [
      "coconut water matcha",
      "coconut matcha recipe",
      "matcha coconut water",
      "tropical matcha",
      "shroomé recipe",
      "hydrating matcha drink",
      "electrolyte matcha",
      "dairy free matcha",
      "mushroom matcha",
      "collagen coconut matcha",
      "mint matcha drink",
    ],
  },
  "sparkling-matcha": {
    description:
      "Pour a Sparkling Matcha in 15 seconds with shroomé — sparkling water, ceremonial matcha, lion's mane mushroom, and collagen. Fizzy, light, layered, and surprisingly refreshing with an optional oat milk float.",
    keywords: [
      "sparkling matcha",
      "sparkling matcha recipe",
      "fizzy matcha",
      "matcha sparkling water",
      "shroomé recipe",
      "matcha soda",
      "bubbly matcha",
      "mushroom matcha drink",
      "collagen sparkling matcha",
      "easy matcha drink",
      "matcha refresher",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.id === slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found — shroomé",
    };
  }

  const seo = seoMap[recipe.id];
  const title = `${recipe.name} — Easy shroomé Recipe | Matcha + Mushrooms + Collagen`;
  const description = seo?.description ?? recipe.description;
  const keywords = seo?.keywords ?? [
    recipe.name.toLowerCase(),
    "matcha recipe",
    "shroomé recipe",
    "easy matcha",
  ];
  const url = `https://www.drinkshroome.com/recipes/${recipe.id}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: `https://www.drinkshroome.com${recipe.image}`,
          width: 1200,
          height: 630,
          alt: recipe.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.drinkshroome.com${recipe.image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function RecipeSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
