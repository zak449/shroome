import Script from "next/script";
import { notFound } from "next/navigation";
import { recipes } from "../data";
import MobileNav from "../../MobileNav";
import CopyLinkButton from "./CopyLinkButton";
import PrintButton from "./PrintButton";
import Breadcrumb from "../../Breadcrumb";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.id }));
}

/* ── Per-recipe Schema.org keyword strings ── */
const schemaKeywordsMap: Record<string, string> = {
  "classic-iced-matcha-latte":
    "iced matcha latte, classic iced matcha, oat milk matcha, shroomé, ceremonial matcha, lion's mane, collagen, easy matcha latte recipe",
  "vanilla-matcha-smoothie":
    "vanilla matcha smoothie, matcha banana smoothie, shroomé, vanilla, ceremonial matcha, lion's mane, collagen, blended matcha recipe",
  "strawberry-rose-matcha-latte":
    "strawberry matcha latte, rose matcha, pink matcha latte, shroomé, strawberry, rose water, ceremonial matcha, lion's mane, collagen",
  "matcha-affogato":
    "matcha affogato, matcha ice cream, matcha dessert, shroomé, vanilla ice cream, ceremonial matcha, lion's mane, collagen",
  "protein-matcha-shake":
    "protein matcha shake, matcha protein smoothie, post workout matcha, shroomé, protein powder, almond milk, ceremonial matcha, lion's mane, collagen",
  "hot-matcha-latte":
    "hot matcha latte, matcha latte art, steamed matcha, shroomé, oat milk, ceremonial matcha, lion's mane, collagen, easy hot matcha recipe",
  "light-matcha-agua-fresca":
    "matcha agua fresca, strawberry matcha water, matcha lemonade, shroomé, strawberry, lemon, agave, ceremonial matcha, lion's mane, collagen",
  "coconut-water-matcha":
    "coconut water matcha, tropical matcha, hydrating matcha, shroomé, coconut water, mint, ceremonial matcha, lion's mane, collagen",
  "sparkling-matcha":
    "sparkling matcha, fizzy matcha, matcha sparkling water, shroomé, sparkling water, ceremonial matcha, lion's mane, collagen, matcha soda",
};

/* ── Recipes that do NOT contain dairy / animal ice cream by default ── */
const veganFriendlyIds = new Set([
  "classic-iced-matcha-latte",
  "vanilla-matcha-smoothie",
  "strawberry-rose-matcha-latte",
  "protein-matcha-shake",
  "hot-matcha-latte",
  "light-matcha-agua-fresca",
  "coconut-water-matcha",
  "sparkling-matcha",
]);

function buildRecipeSchema(recipe: (typeof recipes)[0]) {
  const keywords =
    schemaKeywordsMap[recipe.id] ??
    `matcha latte, ${recipe.name.toLowerCase()}, shroomé recipe, easy matcha recipe`;

  const suitableForDiet = veganFriendlyIds.has(recipe.id)
    ? ["https://schema.org/VeganDiet", "https://schema.org/GlutenFreeDiet"]
    : ["https://schema.org/GlutenFreeDiet"];

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    image: `https://www.drinkshroome.com${recipe.image}`,
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
    keywords,
    recipeYield: "1 serving",
    suitableForDiet,
    nutrition: {
      "@type": "NutritionInformation",
      calories: "30-50 calories",
      servingSize: "1 serving (1 sachet)",
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.id === slug);

  if (!recipe) {
    notFound();
  }

  const recipeSchema = buildRecipeSchema(recipe);

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
      {
        "@type": "ListItem",
        position: 3,
        name: recipe.name,
        item: `https://www.drinkshroome.com/recipes/${recipe.id}`,
      },
    ],
  };

  return (
    <>
      <Script
        id={`recipe-schema-${recipe.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        /* ── TICKER ── */
        .rd-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .rd-ticker-track{display:inline-flex;animation:rdTick 28s linear infinite}
        .rd-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .rd-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes rdTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ── */
        .rd-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .rd-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .rd-nav-logo img{width:32px;height:32px;border-radius:6px}
        .rd-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .rd-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.rd-nav-links{display:none !important}.rd-nav-cta{display:none !important}}
        .rd-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .rd-nav-links a:hover{color:#2D4A2D}
        .rd-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .rd-nav-cta:hover{background:#2a2e4f}

        /* ── PAGE WRAPPER (retro 90s background) ── */
        .rd-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(212,184,224,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(200,255,58,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255,183,209,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          position:relative
        }
        .rd-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B1F3B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── HERO ── */
        .rd-hero{
          position:relative;overflow:hidden;
          min-height:85vh;
          display:flex;align-items:flex-end;
          padding:0 0 48px 0
        }
        .rd-hero-bg{
          position:absolute;inset:0
        }
        .rd-hero-bg img{
          width:100%;height:100%;
          object-fit:cover;
          object-position:center center
        }
        .rd-hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.6) 100%)
        }
        .rd-hero-inner{
          position:relative;z-index:2;
          padding:0 8%;width:100%
        }
        .rd-hero-back{
          display:inline-flex;align-items:center;gap:6px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.14em;text-transform:uppercase;
          color:rgba(253,244,238,0.8);text-decoration:none;
          margin-bottom:20px;transition:color .2s
        }
        .rd-hero-back:hover{color:#FDF4EE}
        .rd-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(40px,6vw,72px);font-weight:400;font-style:italic;
          line-height:1;letter-spacing:-.02em;
          color:#FDF4EE;margin-bottom:20px;
          text-shadow:0 2px 24px rgba(0,0,0,0.25)
        }
        .rd-hero-badges{display:flex;gap:10px;flex-wrap:wrap}
        .rd-hero-badge{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;
          padding:7px 16px;border-radius:100px;
          background:rgba(255,255,255,0.18);backdrop-filter:blur(10px);
          color:#FDF4EE
        }

        /* ── BODY ── */
        .rd-body{
          max-width:720px;margin:0 auto;
          padding:56px 6% 80px
        }
        .rd-desc{
          font-family:'Syne',system-ui,sans-serif;font-size:17px;line-height:1.8;
          color:rgba(27,31,59,0.75);margin-bottom:48px;max-width:580px
        }

        /* ── SECTION LABELS ── */
        .rd-label{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:rgba(27,31,59,0.45);
          margin-bottom:16px;
          display:flex;align-items:center;gap:12px
        }
        .rd-label::after{content:'';flex:1;height:1px;background:rgba(27,31,59,0.12)}

        /* ── INGREDIENTS ── */
        .rd-ingredients{list-style:none;padding:0;margin:0 0 48px}
        .rd-ingredients li{
          font-family:'Syne',system-ui,sans-serif;font-size:15px;
          color:#1B1F3B;padding:11px 0;
          border-bottom:1px solid rgba(27,31,59,0.08);
          display:flex;align-items:center;gap:12px
        }
        .rd-ingredients li::before{
          content:'';width:7px;height:7px;border-radius:50%;
          background:#C8FF3A;flex-shrink:0
        }

        /* ── STEPS ── */
        .rd-steps{list-style:none;padding:0;margin:0 0 56px;counter-reset:rd-steps}
        .rd-steps li{
          counter-increment:rd-steps;
          font-family:'Syne',system-ui,sans-serif;font-size:15px;line-height:1.8;
          color:#1B1F3B;padding:16px 0;
          border-bottom:1px solid rgba(27,31,59,0.08);
          display:flex;gap:16px
        }
        .rd-steps li::before{
          content:counter(rd-steps,decimal-leading-zero);
          font-family:'DM Mono',monospace;font-size:13px;font-weight:500;
          color:rgba(27,31,59,0.35);padding-top:3px;flex-shrink:0;
          min-width:24px
        }

        /* ── BACK LINK ── */
        .rd-back-section{
          max-width:720px;margin:0 auto;
          padding:0 6% 64px
        }
        .rd-back-link{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.14em;text-transform:uppercase;
          color:rgba(27,31,59,0.5);text-decoration:none;
          padding:12px 24px;
          border:1px solid rgba(27,31,59,0.18);border-radius:100px;
          background:rgba(255,255,255,0.15);backdrop-filter:blur(6px);
          transition:all .2s
        }
        .rd-back-link:hover{color:#1B1F3B;border-color:rgba(27,31,59,0.35);background:rgba(255,255,255,0.3)}

        /* ── CTA ── */
        .rd-cta{
          text-align:center;padding:80px 8%;
          background:linear-gradient(180deg, rgba(212,184,224,0.25) 0%, rgba(200,255,58,0.1) 50%, rgba(255,183,209,0.15) 100%)
        }
        .rd-cta-tag{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.18em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:20px
        }
        .rd-cta h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(32px,4.5vw,52px);font-weight:400;line-height:1.05;
          color:#1B1F3B;margin-bottom:14px
        }
        .rd-cta h2 em{font-style:italic;color:#2D4A2D}
        .rd-cta-sub{
          font-family:'Syne',system-ui,sans-serif;font-size:14px;
          color:rgba(27,31,59,0.6);margin-bottom:28px
        }
        .rd-btn-cta{
          display:inline-block;
          background:#1B1F3B;color:#FDF4EE;
          padding:16px 36px;
          font-family:'Syne',system-ui,sans-serif;font-size:13px;font-weight:700;
          letter-spacing:.08em;text-transform:uppercase;
          text-decoration:none;transition:background .2s
        }
        .rd-btn-cta:hover{background:#2a2e4f}

        /* ── MORE RECIPES ── */
        .rd-more{padding:72px 8% 80px}
        .rd-more-label{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:rgba(27,31,59,0.45);
          margin-bottom:32px;text-align:center
        }
        .rd-more-grid{
          display:grid;grid-template-columns:repeat(3,1fr);gap:24px;
          max-width:960px;margin:0 auto
        }
        .rd-more-card{
          text-decoration:none;color:inherit;
          border-radius:14px;overflow:hidden;
          background:rgba(255,255,255,0.35);
          backdrop-filter:blur(8px);
          border:1px solid rgba(27,31,59,0.08);
          transition:transform .25s ease,box-shadow .25s ease;
          display:flex;flex-direction:column
        }
        .rd-more-card:hover{
          transform:translateY(-6px);
          box-shadow:0 12px 32px rgba(27,31,59,0.12)
        }
        .rd-more-card-img{
          width:100%;aspect-ratio:4/3;object-fit:cover;display:block
        }
        .rd-more-card-body{padding:16px 18px 20px}
        .rd-more-card-name{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:20px;font-weight:400;font-style:italic;
          color:#1B1F3B;line-height:1.2;margin-bottom:6px
        }
        .rd-more-card-meta{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.1em;text-transform:uppercase;
          color:rgba(27,31,59,0.45)
        }
        @media(max-width:768px){
          .rd-more{padding:56px 5% 64px}
          .rd-more-grid{
            display:flex;gap:16px;
            overflow-x:auto;-webkit-overflow-scrolling:touch;
            scroll-snap-type:x mandatory;
            padding-bottom:8px
          }
          .rd-more-card{
            width:260px;min-width:260px;max-width:260px;flex-shrink:0;
            scroll-snap-align:start
          }
        }

        /* ── FOOTER ── */
        .rd-footer{
          background:#1B1F3B;color:rgba(253,244,238,0.6);
          padding:40px 8%;text-align:center;
          font-family:'Syne',system-ui,sans-serif;font-size:12px
        }
        .rd-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .rd-footer-top a{
          color:rgba(253,244,238,0.7);text-decoration:none;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;transition:color .2s
        }
        .rd-footer-top a:hover{color:#C8FF3A}
        .rd-footer-mid{line-height:1.8}
        .rd-footer-mid a{color:rgba(253,244,238,0.5);text-decoration:none;transition:color .2s}
        .rd-footer-mid a:hover{color:#FDF4EE}
        .rd-footer-bot{
          margin-top:12px;
          font-family:'Instrument Serif',Georgia,serif;font-style:italic;
          font-size:14px;color:rgba(253,244,238,0.4)
        }

        /* ── SHARE ── */
        .rd-share{margin-bottom:56px}
        .rd-share-buttons{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px}
        .rd-share-btn{
          display:inline-flex;align-items:center;gap:6px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;
          color:rgba(27,31,59,0.55);text-decoration:none;
          padding:9px 20px;
          border:1px solid rgba(27,31,59,0.18);border-radius:100px;
          background:rgba(255,255,255,0.15);backdrop-filter:blur(6px);
          cursor:pointer;transition:all .2s;
          white-space:nowrap
        }
        .rd-share-btn:hover{
          color:#1B1F3B;
          border-color:rgba(27,31,59,0.35);
          background:rgba(255,255,255,0.35)
        }

        /* ── RESPONSIVE ── */
        @media(max-width:768px){
          .rd-nav{padding:0 4%;height:54px;gap:8px}
          .rd-nav-logo{gap:6px}
          .rd-nav-logo span{font-size:18px}
          .rd-nav-logo img{width:30px;height:30px}
          .rd-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .rd-hero{min-height:70vh;padding-bottom:36px}
          .rd-hero-inner{padding:0 5%}
          .rd-body{padding:40px 5% 56px}
          .rd-back-section{padding:0 5% 48px}
        }
      `}</style>

      <div className="rd-page">
      {/* ── TICKER ── */}
      <div className="rd-ticker">
        <div className="rd-ticker-track">
          {[
            "TEAR ✦ POUR ✦ DONE",
            "9 EASY RECIPES",
            "UNDER 2 MINUTES",
            "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
            "TEAR ✦ POUR ✦ DONE",
            "9 EASY RECIPES",
            "UNDER 2 MINUTES",
            "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
          ].map((t, i) => (
            <span
              key={i}
              className="rd-ticker-item"
              dangerouslySetInnerHTML={{
                __html: t.replace(/✦/g, "<em>✦</em>"),
              }}
            />
          ))}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="rd-nav" aria-label="Main navigation">
        <a href="/" className="rd-nav-logo">
          <img
            src="/logo-mark.png"
            width={32}
            height={32}
            alt="shroomé S"
          />
          <span>shroomé</span>
        </a>
        <div className="rd-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
          <a href="/recipes">Recipes</a>
        </div>
        <a href="/#signup" className="rd-nav-cta">
          Get 20% off + free shipping &rarr;
        </a>
        <MobileNav
          prefix="rd"
          links={[
            { label: "Why shroom\u00e9", href: "/#why" },
            { label: "Ingredients", href: "/#ingredients" },
            { label: "How It Works", href: "/#how" },
            { label: "FAQ", href: "/faq" },
            { label: "Blog", href: "/blog" },
            { label: "Recipes", href: "/recipes" },
          ]}
        />
      </nav>

      {/* ── HERO ── */}
      <section className="rd-hero">
        <div
          className="rd-hero-bg"
          style={{ background: recipe.imageBg }}
        >
          <img src={recipe.heroImage || recipe.image} alt={recipe.imageAlt} width={4165} height={2343} loading="eager" style={{ objectPosition: recipe.heroImage ? 'center center' : 'center 35%' }} />
        </div>
        <div className="rd-hero-overlay" />
        <div className="rd-hero-inner">
          <a href="/recipes" className="rd-hero-back">
            ← All Recipes
          </a>
          <h1>{recipe.name}</h1>
          <div className="rd-hero-badges">
            <span className="rd-hero-badge">Prep: {recipe.prepLabel}</span>
            <span className="rd-hero-badge">
              {recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <Breadcrumb
        prefix="rd"
        items={[
          { label: "Home", href: "/" },
          { label: "Recipes", href: "/recipes" },
          { label: recipe.name },
        ]}
      />

      {/* ── BODY ── */}
      <div className="rd-body">
        <p className="rd-desc">{recipe.description}</p>

        <h2 className="rd-label">Ingredients</h2>
        <ul className="rd-ingredients">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h2 className="rd-label">Steps</h2>
        <ol className="rd-steps">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        {/* ── SHARE ── */}
        <div className="rd-share">
          <h2 className="rd-label">Share This Recipe</h2>
          <div className="rd-share-buttons">
            <CopyLinkButton url={`https://www.drinkshroome.com/recipes/${recipe.id}`} />
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(recipe.name)}&url=${encodeURIComponent(`https://www.drinkshroome.com/recipes/${recipe.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rd-share-btn"
            >
              𝕏 Twitter
            </a>
            <a
              href={`sms:?body=${encodeURIComponent(`Check out this recipe: ${recipe.name} https://www.drinkshroome.com/recipes/${recipe.id}`)}`}
              className="rd-share-btn"
            >
              💬 iMessage
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.drinkshroome.com/recipes/${recipe.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rd-share-btn"
            >
              Facebook
            </a>
            <PrintButton />
          </div>
        </div>
      </div>

      {/* ── BACK ── */}
      <div className="rd-back-section">
        <a href="/recipes" className="rd-back-link">
          ← Back to all recipes
        </a>
      </div>

      {/* ── CTA ── */}
      <section className="rd-cta">
        <div className="rd-cta-tag">Pre-Launch List</div>
        <h2>
          Ready to pour?
          <br />
          <em>Get 20% off + free shipping.</em>
        </h2>
        <p className="rd-cta-sub">
          12 servings per box · Tear. Pour. Done.
        </p>
        <a href="/#signup" className="rd-btn-cta">
          Claim 20% off →
        </a>
      </section>

      {/* ── MORE RECIPES ── */}
      {(() => {
        const currentIndex = recipes.findIndex((r) => r.id === recipe.id);
        const related = Array.from({ length: 3 }, (_, i) => {
          const idx = (currentIndex + 1 + i) % recipes.length;
          return recipes[idx];
        });
        return (
          <section className="rd-more">
            <div className="rd-more-label">More Recipes</div>
            <div className="rd-more-grid">
              {related.map((r) => (
                <a key={r.id} href={`/recipes/${r.id}`} className="rd-more-card">
                  <img
                    src={r.image}
                    alt={r.imageAlt}
                    className="rd-more-card-img"
                    loading="eager"
                    width={400}
                    height={300}
                  />
                  <div className="rd-more-card-body">
                    <div className="rd-more-card-name">{r.name}</div>
                    <div className="rd-more-card-meta">
                      {r.prepLabel} &middot; {r.ingredients.length} ingredient{r.ingredients.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ── FOOTER ── */}
      <footer className="rd-footer">
        <div className="rd-footer-top">
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
        <div className="rd-footer-mid">
          &copy; 2026 shroomé &middot; hello@drinkshroome.com &middot;{" "}
          <a href="/privacy">Privacy Policy</a> &middot;{" "}
          <a href="/terms">Terms of Service</a>
        </div>
        <div className="rd-footer-bot">@drinkshroome</div>
      </footer>
      </div>
    </>
  );
}
