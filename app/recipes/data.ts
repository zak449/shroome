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
  imageBg: string;
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

    heroImage: "/recipes/hero/hero-iced-matcha-latte.jpg",
    description:
      "The simplest iced matcha latte you'll ever make. One shroomé sachet, oat milk, ice — done in 15 seconds flat.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT1M",
    color: "#C8FF3A",
    imageBg: "#D9585B",
    textColor: "#1B1F3B",
    ingredients: ["1 shroomé original sachet", "6-8 oz oat milk", "Ice"],
    steps: [
      "Fill a tall glass with ice and pour in oat milk about three-quarters full.",
      "Tear open a shroomé sachet and pour it slowly over the back of a spoon so the matcha layers on top of the milk.",
      "Don't stir — the layered look is the whole vibe. Sip and let it mix naturally.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "vanilla-matcha-smoothie",
    name: "Vanilla Matcha Smoothie",
    image: "/recipes/vanilla-matcha-smoothie.jpg",

    heroImage: "/recipes/hero/hero-vanilla-matcha-smoothie.jpg",
    description:
      "A creamy, thick matcha smoothie with frozen banana and vanilla shroomé. Blend it up in under a minute.",
    prepTime: "PT1M",
    prepLabel: "1 min",
    totalTime: "PT2M",
    color: "#FFB7D1",
    imageBg: "#E8C820",
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
      "Blend until smooth and thick. Pour into a stemless glass for the cleanest look.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "strawberry-rose-matcha-latte",
    name: "Strawberry Rose Matcha Latte",
    image: "/recipes/strawberry-rose.jpg",

    heroImage: "/recipes/hero/hero-strawberry-rose.jpg",
    description:
      "Floral and fruity — strawberry shroomé meets a splash of rose water for an elevated matcha moment.",
    prepTime: "PT30S",
    prepLabel: "30 sec",
    totalTime: "PT1M",
    color: "#D4B8E0",
    imageBg: "#E8956A",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé strawberry sachet",
      "6-8 oz milk of choice",
      "1 tsp rose water",
      "Garnish: dried rose petals",
    ],
    steps: [
      "Pour milk into a glass — about halfway. Add a splash of rose water and stir gently to combine the pink base.",
      "Tear open a shroomé strawberry sachet and pour it slowly on top so the green matcha floats over the pink milk, creating a layered effect.",
      "Don't stir — let the layers sit. Scatter a few dried rose petals around the glass for the finishing touch.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "matcha-affogato",
    name: "Matcha Affogato",
    image: "/recipes/matcha-affogato.jpg",

    heroImage: "/recipes/hero/hero-matcha-affogato.jpg",
    description:
      "Matcha meets ice cream. Pour one shroomé sachet over a scoop of vanilla — the easiest dessert of your life.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#1B1F3B",
    imageBg: "#9B8ACA",
    textColor: "#FDF4EE",
    ingredients: [
      "1 shroomé original sachet",
      "1 scoop vanilla ice cream (or coconut ice cream)",
    ],
    steps: [
      "Place a generous scoop of vanilla ice cream in a short rocks glass or tumbler.",
      "Tear open a shroomé sachet and pour it slowly over the top — let it drip down the sides of the ice cream for the full affogato effect.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "protein-matcha-shake",
    name: "Protein Matcha Shake",
    image: "/recipes/protein-matcha-shake.jpg",

    heroImage: "/recipes/hero/hero-protein-matcha-shake.jpg",
    description:
      "Post-workout matcha with protein. Blend a shroomé sachet with your favorite protein powder for clean energy and recovery.",
    prepTime: "PT1M",
    prepLabel: "1 min",
    totalTime: "PT2M",
    color: "#C8FF3A",
    imageBg: "#4DD9A5",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "1 scoop vanilla or unflavored protein powder",
      "8 oz almond milk",
      "Handful of ice",
      "Garnish: fresh mint sprig and lemon slice",
    ],
    steps: [
      "Add almond milk, protein powder, and ice to a blender.",
      "Tear open a shroomé sachet and pour it in.",
      "Blend until smooth and thick. Pour into a tall glass and garnish with a mint sprig and lemon slice on the rim.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "hot-matcha-latte",
    name: "Hot Matcha Latte",
    image: "/recipes/hot-matcha-latte.jpg",

    heroImage: "/recipes/hero/hero-hot-matcha-latte.jpg",
    description:
      "The classic hot matcha latte — steamed oat milk and one shroomé sachet. Cozy, clean energy in under a minute.",
    prepTime: "PT1M",
    prepLabel: "1 min",
    totalTime: "PT2M",
    color: "#FFB7D1",
    imageBg: "#1565C0",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "6-8 oz oat milk",
      "Milk frother or steam wand for latte art",
    ],
    steps: [
      "Tear open a shroomé sachet into your favorite mug. Add 1-2 tablespoons of hot water and whisk until the matcha is fully dissolved into a smooth, concentrated paste.",
      "Heat and froth oat milk until steaming with a nice microfoam (a handheld frother or steam wand works best).",
      "Pour the frothed milk slowly into the center of the matcha — tilt the mug and pour gently to create a heart or rosetta pattern on top.",
    ],
    datePublished: "2026-03-01",
  },
  {
    id: "light-matcha-agua-fresca",
    name: "Strawberry Matcha Agua Fresca",
    image: "/recipes/agua-fresca.jpg",

    heroImage: "/recipes/hero/hero-agua-fresca.jpg",
    description:
      "A true agua fresca — strawberry shroomé stirred into cold water with fresh lemon and a touch of agave. Light, citrusy, and barely sweet. The easiest refresher you'll ever make.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#D4B8E0",
    imageBg: "#E87830",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé strawberry sachet",
      "8 oz cold water",
      "Squeeze of fresh lemon juice (about half a lemon)",
      "1 tsp agave or honey",
      "Ice",
      "Garnish: lemon wedge",
    ],
    steps: [
      "Fill a tall glass with ice. Pour in cold water.",
      "Squeeze in fresh lemon juice and drizzle in a teaspoon of agave. Stir to dissolve.",
      "Tear open a shroomé strawberry sachet and pour it in. Stir gently — the matcha will turn the water a soft, pale green with a hint of berry. Place a lemon wedge on the rim.",
    ],
    datePublished: "2026-03-21",
  },
  {
    id: "coconut-water-matcha",
    name: "Coconut Water Matcha",
    image: "/recipes/coconut-water-matcha.jpg",

    heroImage: "/recipes/hero/hero-coconut-water-matcha.jpg",
    description:
      "Tropical and hydrating — shroomé mixed with coconut water for a light, electrolyte-rich matcha refresher. No milk needed.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#1B1F3B",
    imageBg: "#3BBFA0",
    textColor: "#FDF4EE",
    ingredients: [
      "1 shroomé original sachet",
      "8 oz cold coconut water",
      "Ice",
      "4-5 fresh mint leaves + extra sprig for garnish",
      "Garnish: lemon slice",
    ],
    steps: [
      "Drop a few fresh mint leaves into a tall glass and press them gently with a spoon to release the oils. Fill the glass with ice.",
      "Pour coconut water over the ice. Tear open a shroomé sachet and pour it in. Stir gently to combine — the mint leaves will float throughout the drink.",
      "Top with a fresh mint sprig and lemon slice on the rim. Tropical energy, zero effort.",
    ],
    datePublished: "2026-03-21",
  },
  {
    id: "sparkling-matcha",
    name: "Sparkling Matcha",
    image: "/recipes/sparkling-matcha.jpg",

    heroImage: "/recipes/hero/hero-sparkling-matcha.jpg",
    description:
      "Matcha meets sparkling water — fizzy, light, and surprisingly refreshing. The coolest way to pour a shroomé.",
    prepTime: "PT15S",
    prepLabel: "15 sec",
    totalTime: "PT30S",
    color: "#C8FF3A",
    imageBg: "#D65A50",
    textColor: "#1B1F3B",
    ingredients: [
      "1 shroomé original sachet",
      "6 oz sparkling water",
      "Ice",
      "Garnish: fresh mint sprig and lemon slice",
      "Optional: splash of oat milk on top",
    ],
    steps: [
      "Fill a tall glass with ice and pour in sparkling water.",
      "Tear open a shroomé sachet and pour it slowly over the fizz — the matcha will sink and create a deep green layer.",
      "Top with a splash of oat milk for a creamy float effect. Garnish with fresh mint and a lemon slice on the rim. Don't stir — let it layer.",
    ],
    datePublished: "2026-03-21",
  },
];
