export interface Recipe {
  id: string;
  name: string;
  image: string;
  heroImage?: string;
  description: string;
  prepTime: string;
  prepLabel: string;
  totalTime: string;
  color: string;
  textColor: string;
  ingredients: string[];
  steps: string[];
  datePublished: string;
}

export const recipes: Recipe[] = [
  {
    id: "classic-iced-matcha-latte",
    name: "Classic Iced Matcha Latte",
    image: "/recipes/iced-matcha-latte.jpg",
    heroImage: "/recipes/hero-iced-matcha-latte.jpg",
    description:
      "The simplest iced matcha latte you'll ever make. One shroomé sachet, oat milk, ice — done in 15 seconds flat.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT1M",
    color: "#C8FF3A",
    textColor: "#1B1F3B",
    ingredients: ["1 shroomé original sachet", "6-8 oz oat milk", "Ice"],
    steps: [
      "Fill a glass with ice and pour in oat milk.",
      "Tear open a shroomé sachet and pour it right in.",
      "Give it a swirl and enjoy.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "vanilla-matcha-smoothie",
    name: "Vanilla Matcha Smoothie",
    image: "/recipes/vanilla-matcha-smoothie.jpg",
    heroImage: "/recipes/hero-vanilla-matcha-smoothie.jpg",
    description:
      "A creamy, thick matcha smoothie with frozen banana and vanilla shroomé. Blend it up in under a minute.",
    prepTime: "PT1M",
    prepLabel: "1 min",
    totalTime: "PT2M",
    color: "#FFB7D1",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé vanilla sachet",
      "1 frozen banana",
      "6 oz oat milk",
      "Handful of ice",
    ],
    steps: [
      "Add the frozen banana, oat milk, and ice to a blender.",
      "Tear open a shroomé vanilla sachet and pour it in.",
      "Blend until smooth and pour into your favorite glass.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "strawberry-rose-matcha-latte",
    name: "Strawberry Rose Matcha Latte",
    image: "/recipes/strawberry-rose.jpg",
    heroImage: "/recipes/hero-strawberry-rose.jpg",
    description:
      "Floral and fruity — strawberry shroomé meets a splash of rose water for an elevated matcha moment.",
    prepTime: "PT30S",
    prepLabel: "30 sec",
    totalTime: "PT1M",
    color: "#D4B8E0",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé strawberry sachet",
      "6-8 oz milk of choice",
      "1 tsp rose water",
    ],
    steps: [
      "Pour milk into a glass with ice (or warm it up for a hot version).",
      "Add a splash of rose water and stir.",
      "Tear open a shroomé strawberry sachet, pour it in, and swirl.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "matcha-affogato",
    name: "Matcha Affogato",
    image: "/recipes/matcha-affogato.jpg",
    heroImage: "/recipes/hero-matcha-affogato.jpg",
    description:
      "Matcha meets ice cream. Pour one shroomé sachet over a scoop of vanilla — the easiest dessert of your life.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#1B1F3B",
    textColor: "#FDF4EE",
    ingredients: [
      "1 shroomé original sachet",
      "1 scoop vanilla ice cream (or coconut ice cream)",
    ],
    steps: [
      "Place a scoop of vanilla ice cream in a small bowl or cup.",
      "Tear open a shroomé sachet and pour it directly over the ice cream.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "protein-matcha-shake",
    name: "Protein Matcha Shake",
    image: "/recipes/protein-matcha-shake.jpg",
    heroImage: "/recipes/hero-protein-matcha-shake.jpg",
    description:
      "Post-workout matcha with protein. Blend a shroomé sachet with your favorite protein powder for clean energy and recovery.",
    prepTime: "PT1M",
    prepLabel: "1 min",
    totalTime: "PT2M",
    color: "#C8FF3A",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "1 scoop vanilla or unflavored protein powder",
      "8 oz almond milk",
      "Handful of ice",
    ],
    steps: [
      "Add almond milk, protein powder, and ice to a blender.",
      "Tear open a shroomé sachet and pour it in.",
      "Blend until smooth. Pour and drink.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "hot-matcha-latte",
    name: "Hot Matcha Latte",
    image: "/recipes/hot-matcha-latte.jpg",
    heroImage: "/recipes/hero-hot-matcha-latte.jpg",
    description:
      "The classic hot matcha latte — steamed oat milk and one shroomé sachet. Cozy, clean energy in under a minute.",
    prepTime: "PT30S",
    prepLabel: "30 sec",
    totalTime: "PT1M30S",
    color: "#FFB7D1",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "6-8 oz steamed or warmed oat milk",
    ],
    steps: [
      "Heat oat milk until steaming (microwave or stovetop — no need to froth).",
      "Pour the warm milk into your favorite mug, then tear open a shroomé sachet and pour it in.",
      "Stir gently and enjoy.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "light-matcha-agua-fresca",
    name: "Light Matcha Agua Fresca",
    image: "/recipes/agua-fresca.jpg",
    heroImage: "/recipes/hero-agua-fresca.jpg",
    description:
      "Half water, half almond milk — a light, refreshing matcha drink with barely-there sweetness. Perfect when you want energy without the heaviness.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#D4B8E0",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "4 oz cold water",
      "4 oz almond milk",
      "Ice",
      "Optional: squeeze of lemon",
    ],
    steps: [
      "Fill a glass with ice. Pour in cold water and almond milk.",
      "Tear open a shroomé sachet and pour it in.",
      "Add a squeeze of lemon if you want a citrus twist. Stir and sip.",
    ],
    datePublished: "2026-03-21",
  },
  {
    id: "coconut-water-matcha",
    name: "Coconut Water Matcha",
    image: "/recipes/coconut-water-matcha.jpg",
    heroImage: "/recipes/hero-coconut-water-matcha.jpg",
    description:
      "Tropical and hydrating — shroomé mixed with coconut water for a light, electrolyte-rich matcha refresher. No milk needed.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#1B1F3B",
    textColor: "#FDF4EE",
    ingredients: [
      "1 shroomé original sachet",
      "8 oz cold coconut water",
      "Ice",
      "Optional: fresh mint leaves",
    ],
    steps: [
      "Pour coconut water over a glass of ice.",
      "Tear open a shroomé sachet and pour it in.",
      "Garnish with fresh mint. Pure tropical energy.",
    ],
    datePublished: "2026-03-21",
  },
  {
    id: "sparkling-matcha",
    name: "Sparkling Matcha",
    image: "/recipes/sparkling-matcha.jpg",
    heroImage: "/recipes/hero-sparkling-matcha.jpg",
    description:
      "Matcha meets sparkling water — fizzy, light, and surprisingly refreshing. The coolest way to pour a shroomé.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#C8FF3A",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "6 oz sparkling water",
      "Ice",
      "Optional: splash of oat milk on top",
    ],
    steps: [
      "Fill a glass with ice and pour in sparkling water.",
      "Tear open a shroomé sachet and pour it slowly over the fizz.",
      "Top with a splash of oat milk for a creamy float effect. Don't stir — let it layer.",
    ],
    datePublished: "2026-03-21",
  },
];
