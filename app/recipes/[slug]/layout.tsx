import type { Metadata } from "next";
import { recipes } from "../data";

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

  const title = `${recipe.name} — shroomé Recipe`;
  const description = recipe.description;
  const url = `https://www.drinkshroome.com/recipes/${recipe.id}`;

  return {
    title,
    description,
    keywords: [
      recipe.name.toLowerCase(),
      "matcha recipe",
      "shroomé recipe",
      "easy matcha latte",
      "matcha latte recipe",
      "ready to pour matcha",
    ],
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
