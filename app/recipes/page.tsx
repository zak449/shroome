import Script from "next/script";

const recipes = [
  {
    id: "classic-iced-matcha-latte",
    name: "Classic Iced Matcha Latte",
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

function buildRecipeSchema(recipe: (typeof recipes)[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    prepTime: recipe.prepTime,
    totalTime: recipe.totalTime,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    author: {
      "@type": "Organization",
      name: "shroomé",
      url: "https://www.drinkshroome.com",
    },
    datePublished: recipe.datePublished,
    recipeCategory: "Beverage",
    recipeCuisine: "American",
    keywords: `matcha latte, ${recipe.name.toLowerCase()}, shroomé recipe, easy matcha recipe`,
    recipeYield: "1 serving",
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.drinkshroome.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Recipes",
      item: "https://www.drinkshroome.com/recipes",
    },
  ],
};

export default function RecipesPage() {
  return (
    <>
      {/* ── Structured Data ── */}
      {recipes.map((recipe) => (
        <Script
          key={recipe.id}
          id={`recipe-schema-${recipe.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildRecipeSchema(recipe)),
          }}
        />
      ))}
      <Script
        id="recipes-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <style>{`
        /* ── TICKER ── */
        .rec-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .rec-ticker-track{display:inline-flex;animation:recTick 28s linear infinite}
        .rec-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .rec-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes recTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ── */
        .rec-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .rec-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .rec-nav-logo img{width:28px;height:28px;filter:brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)}
        .rec-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .rec-nav-links{display:flex;gap:8px}
        .rec-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .rec-nav-links a:hover{color:#2D4A2D}
        .rec-nav-links a.active{color:#2D4A2D}
        .rec-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .rec-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ── */
        .rec-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .rec-hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(200,255,58,0.15) 0%,rgba(255,183,209,0.2) 50%,rgba(212,184,224,0.15) 100%)}
        .rec-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(253,244,238,0.92) 0%,rgba(253,244,238,0.85) 100%)}
        .rec-blob{position:absolute;border-radius:50%;pointer-events:none;opacity:.25}
        .rec-blob-a{width:340px;height:340px;top:-80px;right:10%;background:#C8FF3A}
        .rec-blob-b{width:200px;height:200px;bottom:-60px;left:5%;background:#D4B8E0}
        .rec-hero-inner{position:relative;z-index:2;max-width:640px}
        .rec-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:#1B1F3B;margin-bottom:24px;
          opacity:0;animation:recFadeUp .7s .1s forwards
        }
        .rec-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}
        .rec-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:#1B1F3B;margin-bottom:18px;opacity:0;animation:recFadeUp .8s .2s forwards
        }
        .rec-hero h1 em{font-style:italic;color:#2D4A2D}
        .rec-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(27,31,59,0.7);max-width:520px;font-weight:400;
          opacity:0;animation:recFadeUp .8s .35s forwards
        }
        .rec-hero-sub strong{color:#1B1F3B;font-weight:700}
        @keyframes recFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── PILL ROW ── */
        .rec-pill-row{display:flex;gap:0;overflow:hidden;white-space:nowrap;background:#D4B8E0;padding:12px 0}
        .rec-pill-track{display:inline-flex;animation:recTick 22s linear infinite}
        .rec-pill-item{
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;color:#1B1F3B;padding:0 28px
        }
        .rec-pill-sep{opacity:.3}

        /* ── CARD GRID ── */
        .rec-grid-section{max-width:1100px;margin:0 auto;padding:64px 6% 48px}
        .rec-grid-title{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:32px
        }
        .rec-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px
        }
        .rec-card{
          border-radius:16px;
          padding:32px 28px;
          min-height:220px;
          display:flex;flex-direction:column;justify-content:flex-end;
          cursor:pointer;
          transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;
          text-decoration:none;
          position:relative;overflow:hidden
        }
        .rec-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(27,31,59,0.12)}
        .rec-card-badge{
          position:absolute;top:16px;right:16px;
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.14em;text-transform:uppercase;
          padding:5px 10px;border-radius:100px;
          background:rgba(255,255,255,0.25);backdrop-filter:blur(8px)
        }
        .rec-card-ingredients{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.1em;text-transform:uppercase;
          opacity:.65;margin-bottom:8px
        }
        .rec-card-name{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(22px,2.5vw,28px);font-weight:400;font-style:italic;
          line-height:1.15;letter-spacing:-.01em
        }

        /* ── FULL RECIPES ── */
        .rec-full-section{max-width:820px;margin:0 auto;padding:32px 6% 80px}
        .rec-full-title{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:48px
        }
        .rec-full{
          margin-bottom:64px;
          padding-bottom:64px;
          border-bottom:1px solid rgba(27,31,59,0.1)
        }
        .rec-full:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
        .rec-full-image{
          width:100%;
          height:240px;
          border-radius:14px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:28px;
          position:relative;overflow:hidden
        }
        .rec-full-image-text{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(24px,3vw,32px);font-weight:400;font-style:italic;
          text-align:center;padding:0 24px;
          opacity:.7
        }
        .rec-full-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap}
        .rec-full-name{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(28px,3.5vw,38px);font-weight:400;font-style:italic;
          color:#1B1F3B;line-height:1.1;letter-spacing:-.01em
        }
        .rec-full-time{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.14em;text-transform:uppercase;
          color:rgba(27,31,59,0.55);
          padding:6px 14px;border:1px solid rgba(27,31,59,0.15);border-radius:100px;
          white-space:nowrap;flex-shrink:0
        }
        .rec-full-desc{
          font-family:'Syne',system-ui,sans-serif;font-size:15px;line-height:1.7;
          color:rgba(27,31,59,0.65);margin-bottom:28px;max-width:560px
        }
        .rec-full-label{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(27,31,59,0.45);
          margin-bottom:12px
        }
        .rec-full-ingredients{
          list-style:none;padding:0;margin:0 0 28px
        }
        .rec-full-ingredients li{
          font-family:'Syne',system-ui,sans-serif;font-size:14px;
          color:#1B1F3B;padding:8px 0;
          border-bottom:1px solid rgba(27,31,59,0.06);
          display:flex;align-items:center;gap:10px
        }
        .rec-full-ingredients li::before{
          content:'';width:5px;height:5px;border-radius:50%;
          background:#C8FF3A;flex-shrink:0
        }
        .rec-full-steps{
          list-style:none;padding:0;margin:0;counter-reset:steps
        }
        .rec-full-steps li{
          counter-increment:steps;
          font-family:'Syne',system-ui,sans-serif;font-size:14px;line-height:1.7;
          color:#1B1F3B;padding:12px 0;
          border-bottom:1px solid rgba(27,31,59,0.06);
          display:flex;gap:14px
        }
        .rec-full-steps li::before{
          content:counter(steps,decimal-leading-zero);
          font-family:'DM Mono',monospace;font-size:12px;font-weight:500;
          color:rgba(27,31,59,0.35);padding-top:2px;flex-shrink:0
        }

        /* ── CTA ── */
        .rec-cta{
          text-align:center;padding:80px 8%;
          background:linear-gradient(180deg,#FDF4EE 0%,rgba(200,255,58,0.08) 100%)
        }
        .rec-cta-tag{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.18em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:20px
        }
        .rec-cta h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(32px,4.5vw,52px);font-weight:400;line-height:1.05;
          color:#1B1F3B;margin-bottom:14px
        }
        .rec-cta h2 em{font-style:italic;color:#2D4A2D}
        .rec-cta-sub{
          font-family:'Syne',system-ui,sans-serif;font-size:14px;
          color:rgba(27,31,59,0.6);margin-bottom:28px
        }
        .rec-btn-cta{
          display:inline-block;
          background:#1B1F3B;color:#FDF4EE;
          padding:16px 36px;
          font-family:'Syne',system-ui,sans-serif;font-size:13px;font-weight:700;
          letter-spacing:.08em;text-transform:uppercase;
          text-decoration:none;transition:background .2s
        }
        .rec-btn-cta:hover{background:#2a2e4f}

        /* ── FOOTER ── */
        .rec-footer{
          background:#1B1F3B;color:rgba(253,244,238,0.6);
          padding:40px 8%;text-align:center;
          font-family:'Syne',system-ui,sans-serif;font-size:12px
        }
        .rec-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .rec-footer-top a{
          color:rgba(253,244,238,0.7);text-decoration:none;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;transition:color .2s
        }
        .rec-footer-top a:hover{color:#C8FF3A}
        .rec-footer-mid{line-height:1.8}
        .rec-footer-mid a{color:rgba(253,244,238,0.5);text-decoration:none;transition:color .2s}
        .rec-footer-mid a:hover{color:#FDF4EE}
        .rec-footer-bot{
          margin-top:12px;
          font-family:'Instrument Serif',Georgia,serif;font-style:italic;
          font-size:14px;color:rgba(253,244,238,0.4)
        }

        /* ── RESPONSIVE ── */
        @media(max-width:768px){
          .rec-grid{grid-template-columns:1fr 1fr;gap:14px}
          .rec-nav{padding:0 4%;height:54px;gap:8px}
          .rec-nav-links{display:none}
          .rec-nav-logo{gap:6px}
          .rec-nav-logo span{font-size:18px}
          .rec-nav-logo img{width:24px;height:24px}
          .rec-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .rec-hero{padding:48px 6% 40px}
          .rec-card{padding:24px 20px;min-height:180px}
          .rec-full-image{height:180px}
        }
        @media(max-width:480px){
          .rec-grid{grid-template-columns:1fr;gap:12px}
          .rec-card{min-height:160px}
        }
      `}</style>

      {/* ══ TICKER ══ */}
      <div className="rec-ticker">
        <div className="rec-ticker-track">
          {[
            "TEAR ✦ POUR ✦ DONE",
            "6 EASY RECIPES",
            "UNDER 2 MINUTES",
            "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
            "TEAR ✦ POUR ✦ DONE",
            "6 EASY RECIPES",
            "UNDER 2 MINUTES",
            "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
          ].map((t, i) => (
            <span
              key={i}
              className="rec-ticker-item"
              dangerouslySetInnerHTML={{
                __html: t.replace(/✦/g, "<em>✦</em>"),
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ NAV ══ */}
      <nav className="rec-nav">
        <a href="/" className="rec-nav-logo">
          <img
            src="/logo-mark.png"
            width={28}
            height={28}
            alt="shroomé logo"
          />
          <span>shroomé</span>
        </a>
        <div className="rec-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
        </div>
        <a href="/" className="rec-nav-cta">
          Get 20% off + free shipping →
        </a>
      </nav>

      {/* ══ HERO ══ */}
      <section className="rec-hero">
        <div className="rec-hero-bg" />
        <div className="rec-hero-overlay" />
        <div className="rec-blob rec-blob-a" />
        <div className="rec-blob rec-blob-b" />
        <div className="rec-hero-inner">
          <div className="rec-hero-tag">Recipes</div>
          <h1>
            Nine ways to pour.
            <br />
            <em>All under a minute.</em>
          </h1>
          <p className="rec-hero-sub">
            shroomé was built for convenience. One sachet. Your milk. Done.
            Here are <strong>nine recipes</strong> — every single one takes under 60 seconds. Because your morning shouldn't be a production.
          </p>
        </div>
      </section>

      {/* ══ PILL TICKER ══ */}
      <div className="rec-pill-row">
        <div className="rec-pill-track">
          {[
            "ICED",
            "HOT",
            "BLENDED",
            "DESSERT",
            "PROTEIN",
            "FLORAL",
            "ICED",
            "HOT",
            "BLENDED",
            "DESSERT",
            "PROTEIN",
            "FLORAL",
          ].map((p, i) => (
            <span key={i} className="rec-pill-item">
              {p} <span className="rec-pill-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ RECIPE CARD GRID ══ */}
      <section className="rec-grid-section">
        <div className="rec-grid-title">Pick your pour</div>
        <div className="rec-grid">
          {recipes.map((recipe) => (
            <a
              key={recipe.id}
              href={`#${recipe.id}`}
              className="rec-card"
              style={{
                background: recipe.color,
                color: recipe.textColor,
              }}
            >
              <div
                className="rec-card-badge"
                style={{ color: recipe.textColor }}
              >
                {recipe.prepLabel}
              </div>
              <div
                className="rec-card-ingredients"
                style={{ color: recipe.textColor }}
              >
                {recipe.ingredients.length} ingredients
              </div>
              <div
                className="rec-card-name"
                style={{ color: recipe.textColor }}
              >
                {recipe.name}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ FULL RECIPES ══ */}
      <section className="rec-full-section">
        <div className="rec-full-title">Full recipes</div>
        {recipes.map((recipe) => (
          <article key={recipe.id} id={recipe.id} className="rec-full">
            {/* Image placeholder */}
            <div
              className="rec-full-image"
              style={{
                background: `linear-gradient(135deg, ${recipe.color}40, ${recipe.color}20)`,
              }}
            >
              <div
                className="rec-full-image-text"
                style={{ color: recipe.textColor === "#FDF4EE" ? "#1B1F3B" : recipe.textColor }}
              >
                {recipe.name}
              </div>
            </div>

            {/* Header */}
            <div className="rec-full-header">
              <h2 className="rec-full-name">{recipe.name}</h2>
              <span className="rec-full-time">Prep: {recipe.prepLabel}</span>
            </div>

            <p className="rec-full-desc">{recipe.description}</p>

            {/* Ingredients */}
            <div className="rec-full-label">Ingredients</div>
            <ul className="rec-full-ingredients">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            {/* Steps */}
            <div className="rec-full-label">Steps</div>
            <ol className="rec-full-steps">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      {/* ══ CTA ══ */}
      <section className="rec-cta">
        <div className="rec-cta-tag">Pre-Launch List</div>
        <h2>
          Ready to pour?
          <br />
          <em>Get 20% off + free shipping.</em>
        </h2>
        <p className="rec-cta-sub">
          12 servings per box · Tear. Pour. Done.
        </p>
        <a href="/" className="rec-btn-cta">
          Claim 20% off →
        </a>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="rec-footer">
        <div className="rec-footer-top">
          <a
            href="https://tiktok.com/@drinkshroome"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
          <a
            href="https://instagram.com/drinkshroome"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com/@drinkshroome"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        </div>
        <div className="rec-footer-mid">
          &copy; 2026 shroomé &middot; hello@drinkshroome.com &middot;{" "}
          <a href="/privacy">Privacy Policy</a> &middot;{" "}
          <a href="/terms">Terms of Service</a>
        </div>
        <div className="rec-footer-bot">@drinkshroome</div>
      </footer>
    </>
  );
}
