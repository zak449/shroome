import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import MobileNav from "../../MobileNav";

export const metadata: Metadata = {
  title: "Vanilla — shroomé | Ready-to-Pour Vanilla Matcha Latte",
  description:
    "shroomé Vanilla — ceremonial matcha meets real vanilla bean extract, functional mushroom extracts, and grass-fed collagen peptides. One sachet, 15 seconds, zero compromise.",
  keywords: [
    "vanilla matcha latte",
    "vanilla matcha",
    "shroomé vanilla",
    "ready to pour matcha",
    "matcha with collagen",
    "functional mushroom matcha",
    "ceremonial matcha latte",
  ],
  openGraph: {
    title: "Vanilla — shroomé | Ready-to-Pour Vanilla Matcha Latte",
    description:
      "Ceremonial matcha meets real vanilla bean extract, functional mushroom extracts, and grass-fed collagen. One sachet, 15 seconds.",
    url: "https://www.drinkshroome.com/flavors/vanilla",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanilla — shroomé",
    description:
      "Ceremonial matcha meets real vanilla bean extract, functional mushroom extracts, and grass-fed collagen.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/flavors/vanilla",
  },
};

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
      name: "Vanilla",
      item: "https://www.drinkshroome.com/flavors/vanilla",
    },
  ],
};

const ingredients = [
  {
    name: "Ceremonial Matcha",
    detail: "2g first-harvest, shade-grown ceremonial grade",
  },
  {
    name: "Mushroom Extracts",
    detail: "Organic, 70%+ beta-glucan concentration",
  },
  {
    name: "Grass-Fed Collagen",
    detail: "2g hydrolyzed peptides for skin, hair & gut",
  },
  {
    name: "Real Vanilla Bean Extract",
    detail: "Natural vanilla flavor, zero artificial sweeteners",
  },
];

const recipes = [
  {
    name: "Vanilla Matcha Smoothie",
    href: "/recipes/vanilla-matcha-smoothie",
    desc: "Creamy, thick matcha smoothie with frozen banana and vanilla shroomé.",
  },
];

export default function VanillaFlavorPage() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        /* ── PAGE WRAPPER (retro 90s background) ── */
        .vf-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(212,184,224,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(200,255,58,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255,183,209,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          position:relative
        }
        .vf-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B1F3B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── TICKER ── */
        .vf-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .vf-ticker-track{display:inline-flex;animation:vfTick 28s linear infinite}
        .vf-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .vf-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes vfTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ── */
        .vf-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .vf-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .vf-nav-logo img{width:32px;height:32px;border-radius:6px}
        .vf-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .vf-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.vf-nav-links{display:none !important}.vf-nav-cta{display:none !important}}
        .vf-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .vf-nav-links a:hover{color:#2D4A2D}
        .vf-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .vf-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ── */
        .vf-hero{
          text-align:center;padding:72px 8% 56px;
          position:relative;overflow:hidden
        }
        .vf-hero-blob-a{position:absolute;width:340px;height:340px;border-radius:50%;background:#D4B8E0;opacity:.3;top:-80px;right:10%}
        .vf-hero-blob-b{position:absolute;width:200px;height:200px;border-radius:50%;background:#FFB7D1;opacity:.25;bottom:-60px;left:5%}
        .vf-hero-inner{position:relative;z-index:2;max-width:600px;margin:0 auto}
        .vf-hero-sachet{
          width:180px;height:auto;margin:0 auto 32px;
          filter:drop-shadow(0 12px 32px rgba(27,31,59,0.15));
          animation:vfFloat 5s ease-in-out infinite
        }
        @keyframes vfFloat{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-14px) rotate(1.5deg)}}
        .vf-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:rgba(27,31,59,0.6);margin-bottom:20px
        }
        .vf-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}
        .vf-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(44px,6vw,72px);font-weight:400;font-style:italic;
          line-height:1;letter-spacing:-.02em;color:#1B1F3B;margin-bottom:20px
        }
        .vf-hero-desc{
          font-family:'Syne',system-ui,sans-serif;font-size:16px;line-height:1.75;
          color:rgba(27,31,59,0.65);max-width:480px;margin:0 auto
        }

        /* ── INGREDIENTS ── */
        .vf-ingredients{max-width:720px;margin:0 auto;padding:56px 6% 64px}
        .vf-label{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:rgba(27,31,59,0.45);
          margin-bottom:24px;display:flex;align-items:center;gap:12px
        }
        .vf-label::after{content:'';flex:1;height:1px;background:rgba(27,31,59,0.12)}
        .vf-ing-list{list-style:none;padding:0;margin:0}
        .vf-ing-list li{
          display:flex;align-items:flex-start;gap:14px;
          padding:18px 0;border-bottom:1px solid rgba(27,31,59,0.08)
        }
        .vf-ing-list li::before{
          content:'';width:8px;height:8px;border-radius:50%;
          background:#C8FF3A;flex-shrink:0;margin-top:6px
        }
        .vf-ing-name{
          font-family:'Syne',system-ui,sans-serif;font-size:15px;font-weight:700;
          color:#1B1F3B;margin-bottom:2px
        }
        .vf-ing-detail{
          font-family:'Syne',system-ui,sans-serif;font-size:13px;
          color:rgba(27,31,59,0.55);line-height:1.5
        }

        /* ── RECIPES ── */
        .vf-recipes{max-width:720px;margin:0 auto;padding:0 6% 64px}
        .vf-recipe-card{
          display:block;background:#fff;border:1px solid rgba(27,31,59,0.08);
          padding:24px 28px;text-decoration:none;
          transition:transform .25s cubic-bezier(.23,1,.32,1),box-shadow .25s;
          margin-bottom:12px
        }
        .vf-recipe-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(27,31,59,0.07)}
        .vf-recipe-card h3{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:20px;font-weight:400;font-style:italic;
          color:#1B1F3B;margin-bottom:6px
        }
        .vf-recipe-card p{
          font-family:'Syne',system-ui,sans-serif;font-size:13px;
          color:rgba(27,31,59,0.55);line-height:1.6;margin:0
        }

        /* ── FOOTER ── */
        .vf-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .vf-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .vf-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .vf-footer-top a:hover{color:#2D4A2D}
        .vf-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .vf-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .vf-footer-mid a:hover{color:#1B1F3B}
        .vf-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ── */
        @media(max-width:640px){
          .vf-nav{padding:0 4%;height:54px;gap:8px}
          .vf-nav-logo{gap:6px}
          .vf-nav-logo span{font-size:18px}
          .vf-nav-logo img{width:30px;height:30px}
          .vf-hero{padding:48px 5% 40px}
          .vf-hero h1{font-size:clamp(36px,9vw,52px)}
          .vf-hero-sachet{width:140px}
          .vf-ingredients{padding:40px 5% 48px}
          .vf-recipes{padding:0 5% 48px}
          .vf-footer-top{gap:16px;flex-wrap:wrap}
        }
      `}</style>

      <div className="vf-page">
        {/* ── TICKER ── */}
        <div className="vf-ticker">
          <div className="vf-ticker-track">
            {[
              "TEAR \u2726 POUR \u2726 DONE",
              "VANILLA MATCHA LATTE",
              "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
              "REAL VANILLA BEAN EXTRACT",
              "TEAR \u2726 POUR \u2726 DONE",
              "VANILLA MATCHA LATTE",
              "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
              "REAL VANILLA BEAN EXTRACT",
            ].map((t, i) => (
              <span
                key={i}
                className="vf-ticker-item"
                dangerouslySetInnerHTML={{
                  __html: t.replace(/\u2726/g, "<em>\u2726</em>"),
                }}
              />
            ))}
          </div>
        </div>

        {/* ── NAV ── */}
        <nav className="vf-nav" aria-label="Main navigation">
          <a href="/" className="vf-nav-logo">
            <Image src="/logo-mark.png" width={32} height={32} alt="shroomé S" priority />
            <span>shroom&eacute;</span>
          </a>
          <div className="vf-nav-links">
            <a href="/#why">Why shroom&eacute;</a>
            <a href="/#ingredients">Ingredients</a>
            <a href="/#how">How It Works</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">Blog</a>
            <a href="/recipes">Recipes</a>
          </div>
          <a href="/" className="vf-nav-cta">
            Get 20% off + free shipping &rarr;
          </a>
          <MobileNav
            prefix="vf"
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
        <section className="vf-hero">
          <div className="vf-hero-blob-a" />
          <div className="vf-hero-blob-b" />
          <div className="vf-hero-inner">
            <Image
              src="/sachet-vanilla.png"
              alt="shroomé Vanilla matcha sachet — single-serve packet with ceremonial matcha, lion's mane, and collagen"
              className="vf-hero-sachet"
              width={180}
              height={270}
              priority
            />
            <div className="vf-hero-tag">Flavor Profile</div>
            <h1>Vanilla</h1>
            <p className="vf-hero-desc">
              Smooth, naturally sweet, and impossibly creamy. Real vanilla bean
              extract meets ceremonial matcha for a latte that tastes like it
              came from your favorite caf&eacute; &mdash; but takes 15 seconds
              to pour.
            </p>
          </div>
        </section>

        {/* ── KEY INGREDIENTS ── */}
        <div className="vf-ingredients">
          <h2 className="vf-label">Key Ingredients</h2>
          <ul className="vf-ing-list">
            {ingredients.map((ing, i) => (
              <li key={i}>
                <div>
                  <div className="vf-ing-name">{ing.name}</div>
                  <div className="vf-ing-detail">{ing.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RECIPES WITH THIS FLAVOR ── */}
        <div className="vf-recipes">
          <h2 className="vf-label">Recipes with Vanilla</h2>
          {recipes.map((r, i) => (
            <a key={i} href={r.href} className="vf-recipe-card">
              <h3>{r.name}</h3>
              <p>{r.desc}</p>
            </a>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <footer className="vf-footer">
          <div className="vf-footer-top">
            <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className="vf-footer-mid">
            &copy; 2026 shroom&eacute; &middot; hello@drinkshroome.com &middot;{" "}
            <a href="/privacy">Privacy Policy</a> &middot;{" "}
            <a href="/terms">Terms of Service</a>
          </div>
          <div className="vf-footer-bot">@drinkshroome</div>
        </footer>
      </div>
    </>
  );
}
