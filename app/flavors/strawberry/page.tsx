import { BRAND, svgHex } from "@/app/lib/brand";
import type { Metadata } from "next";

import Image from "next/image";
import MobileNav from "../../MobileNav";
import Breadcrumb from "../../Breadcrumb";

const BADGES = [
  { src: "/brand/badge-matcha.png", alt: "Organic ceremonial grade matcha" },
  { src: "/brand/badge-b-glucans.png", alt: "Organic beta-glucans, lion's mane" },
  { src: "/brand/badge-collagen.png", alt: "With grass-fed type 1 and type 3 collagen" },
  { src: "/brand/badge-ready-to-pour.png", alt: "Ready to pour" },
];

export const metadata: Metadata = {
  title: "Strawberry — shroomé | Liquid Strawberry Matcha Latte",
  description:
    "shroomé Strawberry — ceremonial matcha meets real freeze-dried strawberry, organic lion's mane, and grass-fed collagen peptides. One sachet, 30 seconds — tastes like summer, works like matcha.",
  keywords: [
    "strawberry matcha latte",
    "strawberry matcha",
    "shroomé strawberry",
    "ready to pour matcha",
    "matcha with collagen",
    "functional mushroom matcha",
    "ceremonial matcha latte",
  ],
  openGraph: {
    title: "Strawberry — shroomé | Liquid Strawberry Matcha Latte",
    description:
      "Ceremonial matcha meets real freeze-dried strawberry, functional mushroom extracts, and grass-fed collagen. One sachet, 30 seconds.",
    url: "https://www.drinkshroome.com/flavors/strawberry",
    siteName: "shroomé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strawberry — shroomé",
    description:
      "Ceremonial matcha meets real freeze-dried strawberry, functional mushroom extracts, and grass-fed collagen.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/flavors/strawberry",
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
      name: "Strawberry",
      item: "https://www.drinkshroome.com/flavors/strawberry",
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "shroomé Strawberry Matcha Latte",
  "description": "shroomé Strawberry — ceremonial matcha meets real freeze-dried strawberry, organic lion's mane mushroom beta-glucans, and grass-fed collagen peptides. One sachet, 30 seconds — tastes like summer, works like matcha.",
  "brand": { "@type": "Brand", "name": "shroomé" },
  "manufacturer": { "@type": "Organization", "name": "ZSQUARED INC" },
  "category": "Functional Beverages",
  "url": "https://www.drinkshroome.com/flavors/strawberry",
  "image": [
    "https://www.drinkshroome.com/sachet-strawberry.png"
  ],
  "sku": "SHROOME-STRAWBERRY-12",
  "mpn": "SHROOME-STR-V1",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/SoldOut",
    "itemCondition": "https://schema.org/NewCondition",
    "price": "36.00",
    "priceCurrency": "USD",
    "priceValidUntil": "2027-12-31",
    "url": "https://www.drinkshroome.com/drop",
    "seller": { "@type": "Organization", "name": "ZSQUARED INC" },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "USD" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" },
        "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "DAY" }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "6",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Early Taster" },
      "datePublished": "2026-02-20",
      "reviewBody": "The strawberry matcha combo is delicious. Tastes like real strawberries, not artificial at all.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ]
};

const ingredients = [
  {
    name: "Ceremonial Matcha",
    detail: "2.5g first-harvest, shade-grown ceremonial grade",
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
    name: "Real Freeze-Dried Strawberry",
    detail: "Natural strawberry flavor, zero artificial sweeteners",
  },
];

const recipes = [
  {
    name: "Strawberry Rose Matcha Latte",
    href: "/recipes/strawberry-rose-matcha-latte",
    desc: "Floral and fruity — strawberry shroomé meets a splash of rose water for an elevated matcha moment.",
  },
  {
    name: "Strawberry Matcha Agua Fresca",
    href: "/recipes/light-matcha-agua-fresca",
    desc: "Strawberry shroomé stirred into cold water with fresh lemon and a touch of agave. Light, citrusy, and barely sweet.",
  },
];

export default function StrawberryFlavorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        /* ── PAGE WRAPPER (retro 90s background) ── */
        .sf-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(var(--brand-flavor-functional-rgb),0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(var(--brand-accent-rgb),0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(227,213,247,0.5) 0%, transparent 50%),
            linear-gradient(180deg, var(--brand-canvas) 0%, var(--brand-tint-soft) 45%, var(--brand-canvas) 100%);
          background-attachment:fixed;
          position:relative
        }
        .sf-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${svgHex(BRAND.colors.ink)}' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── TICKER ── */
        .sf-ticker{background:var(--brand-ink);padding:10px 0;overflow:hidden;white-space:nowrap}
        .sf-ticker-track{display:flex;justify-content:center;flex-wrap:wrap}
        .sf-ticker-item{font-family:var(--brand-font-mono);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(var(--brand-canvas-rgb),.75)}
        .sf-ticker-item em{color:var(--brand-tint-soft);font-style:normal;font-weight:500}
        @keyframes sfTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ── */
        .sf-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(var(--brand-canvas-rgb),0.88);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(var(--brand-ink-rgb),0.06)
        }
        .sf-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:var(--brand-ink)
        }
        .sf-nav-logo img{width:32px;height:32px;border-radius:6px}
        .sf-nav-logo span{font-family:var(--brand-font-display);font-size:22px;font-weight:800;color:var(--brand-ink)}
        .sf-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.sf-nav-links{display:none !important}.sf-nav-cta{display:none !important}}
        .sf-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:var(--brand-font-body);font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:var(--brand-ink);
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .sf-nav-links a:hover{color:var(--brand-accent-deep)}
        .sf-nav-cta{
          background:var(--brand-ink);color:var(--brand-canvas);border:none;
          padding:10px 20px;font-family:var(--brand-font-body);
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .sf-nav-cta:hover{background:#3c452a}

        /* ── HERO ── */
        .sf-hero{
          text-align:center;padding:72px 8% 56px;
          position:relative;overflow:hidden
        }
        .sf-hero-blob-a{position:absolute;width:340px;height:340px;border-radius:50%;background:var(--brand-flavor-strawberry);opacity:.3;top:-80px;right:10%}
        .sf-hero-blob-b{position:absolute;width:200px;height:200px;border-radius:50%;background:var(--brand-flavor-functional);opacity:.25;bottom:-60px;left:5%}
        .sf-hero-inner{position:relative;z-index:2;max-width:600px;margin:0 auto}
        .sf-hero-sachet{
          width:250px;height:auto;margin:0 auto 32px;
          filter:drop-shadow(0 12px 32px rgba(var(--brand-ink-rgb),0.15));
          animation:sfFloat 5s ease-in-out infinite
        }
        @keyframes sfFloat{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-14px) rotate(1.5deg)}}
        .sf-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--brand-ink-rgb),0.6);margin-bottom:20px
        }
        .sf-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--brand-accent);flex-shrink:0}
        .sf-hero h1{
          font-family:var(--brand-font-display);
          font-size:clamp(44px,6vw,72px);font-weight:800;
          line-height:1;letter-spacing:-.02em;color:var(--brand-ink);margin-bottom:20px
        }
        .sf-hero-desc{
          font-family:var(--brand-font-body);font-size:16px;line-height:1.75;
          color:rgba(var(--brand-ink-rgb),0.65);max-width:480px;margin:0 auto
        }

        /* ── INGREDIENTS ── */
        .sf-ingredients{max-width:720px;margin:0 auto;padding:56px 6% 64px}
        .sf-label{
          font-family:var(--brand-font-mono);font-size:10px;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:rgba(var(--brand-ink-rgb),0.45);
          margin-bottom:24px;display:flex;align-items:center;gap:12px
        }
        .sf-label::after{content:'';flex:1;height:1px;background:rgba(var(--brand-ink-rgb),0.12)}
        .sf-ing-list{list-style:none;padding:0;margin:0}
        .sf-ing-list li{
          display:flex;align-items:flex-start;gap:14px;
          padding:18px 0;border-bottom:1px solid rgba(var(--brand-ink-rgb),0.08)
        }
        .sf-ing-list li::before{
          content:'';width:8px;height:8px;border-radius:50%;
          background:var(--brand-accent);flex-shrink:0;margin-top:6px
        }
        .sf-ing-name{
          font-family:var(--brand-font-body);font-size:15px;font-weight:700;
          color:var(--brand-ink);margin-bottom:2px
        }
        .sf-ing-detail{
          font-family:var(--brand-font-body);font-size:13px;
          color:rgba(var(--brand-ink-rgb),0.55);line-height:1.5
        }

        /* ── RECIPES ── */
        .sf-recipes{max-width:720px;margin:0 auto;padding:0 6% 64px}
        .sf-recipe-card{
          display:block;background:#fff;border:1px solid rgba(var(--brand-ink-rgb),0.08);
          padding:24px 28px;text-decoration:none;
          transition:transform .25s cubic-bezier(.23,1,.32,1),box-shadow .25s;
          margin-bottom:12px
        }
        .sf-recipe-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(var(--brand-ink-rgb),0.07)}
        .sf-recipe-card h3{
          font-family:var(--brand-font-display);
          font-size:20px;font-weight:700;
          color:var(--brand-ink);margin-bottom:6px
        }
        .sf-recipe-card p{
          font-family:var(--brand-font-body);font-size:13px;
          color:rgba(var(--brand-ink-rgb),0.55);line-height:1.6;margin:0
        }

        /* ── FOOTER ── */
        .sf-footer{background:var(--brand-flavor-functional);padding:32px 6%;text-align:center;border-top:1px solid rgba(var(--brand-ink-rgb),0.06)}
        .sf-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .sf-footer-top a{
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:var(--brand-ink);text-decoration:none;transition:color .2s
        }
        .sf-footer-top a:hover{color:var(--brand-accent-deep)}
        .sf-footer-mid{font-size:12px;color:rgba(var(--brand-ink-rgb),0.45);margin-bottom:8px}
        .sf-footer-mid a{color:rgba(var(--brand-ink-rgb),0.45);text-decoration:underline;transition:color .2s}
        .sf-footer-mid a:hover{color:var(--brand-ink)}
        .sf-footer-bot{font-family:var(--brand-font-mono);font-size:10px;color:rgba(var(--brand-ink-rgb),0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ── */
        @media(max-width:640px){
          .sf-nav{padding:0 4%;height:54px;gap:8px}
          .sf-nav-logo{gap:6px}
          .sf-nav-logo span{font-size:18px}
          .sf-nav-logo img{width:30px;height:30px}
          .sf-hero{padding:48px 5% 40px}
          .sf-hero h1{font-size:clamp(36px,9vw,52px)}
          .sf-hero-sachet{width:190px}
          .sf-ingredients{padding:40px 5% 48px}
          .sf-recipes{padding:0 5% 48px}
          .sf-footer-top{gap:16px;flex-wrap:wrap}
        }
      `}</style>

      <div className="sf-page">
        {/* ── TICKER ── */}
        <div className="sf-ticker">
          <div className="sf-ticker-track">
            {[
              "POUR \u2726 SWIRL \u2726 GO",
              "STRAWBERRY MATCHA LATTE",
              "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
              "REAL FREEZE-DRIED STRAWBERRY",
            ].map((t, i) => (
              <span
                key={i}
                className="sf-ticker-item"
                dangerouslySetInnerHTML={{
                  __html: t.replace(/\u2726/g, "<em>\u2726</em>"),
                }}
              />
            ))}
          </div>
        </div>

        {/* ── NAV ── */}
        <nav className="sf-nav" aria-label="Main navigation">
          <a href="/" className="sf-nav-logo">
            <Image src="/brand/symbol-sheep-solid.png" width={32} height={32} alt="mé the shroomé sheep" priority style={{ borderRadius: 0 }} />
            <Image src="/brand/wordmark.png" width={110} height={24} alt="shroomé" priority style={{ width: 110, height: "auto" }} />
          </a>
          <div className="sf-nav-links">
            <a href="/#why">Why shroom&eacute;</a>
            <a href="/#ingredients">Ingredients</a>
            <a href="/#how">How It Works</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">Blog</a>
            <a href="/recipes">Recipes</a>
          </div>
          <a href="/" className="sf-nav-cta">
            Join the Flock &rarr;
          </a>
          <MobileNav
            prefix="sf"
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
        <section className="sf-hero">
          <div className="sf-hero-blob-a" />
          <div className="sf-hero-blob-b" />
          <div className="sf-hero-inner">
            <Image
              src="/sachet-strawberry.png"
              alt="shroomé Strawberry matcha sachet — single-serve packet with ceremonial matcha, lion's mane, and collagen"
              className="sf-hero-sachet"
              width={306}
              height={639}
              priority
            />
            <div className="sf-hero-tag">Flavor Profile &middot; Drop 001 poured out &middot; 500/500</div>
            <h1>Strawberry</h1>
            <p className="sf-hero-desc">
              Fruity, bright, and naturally sweet. Real freeze-dried strawberry
              meets ceremonial matcha for a berry-forward latte that&apos;s as
              refreshing iced as it is cozy hot. Pour it and taste summer.
            </p>
            <a
              href="/#signup"
              style={{
                display: "inline-block",
                marginTop: 26,
                background: "var(--brand-accent)",
                border: "2px solid var(--brand-ink)",
                borderRadius: 999,
                padding: "14px 28px",
                fontFamily: "var(--brand-font-body)",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--brand-canvas)",
                textDecoration: "none",
              }}
            >
              Missed it? The Flock pours first &mdash; Drop 002 &rarr;
            </a>
          </div>
        </section>

        {/* ── BREADCRUMB ── */}
        <Breadcrumb
          prefix="sf"
          items={[
            { label: "Home", href: "/" },
            { label: "Flavors", href: "/#flavors" },
            { label: "Strawberry" },
          ]}
        />


        {/* ── PACKS & PRICING ── */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 6% 56px" }}>
          <h2 className="sf-label">Packs &amp; Pricing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {[
              { n: "6 sachets", d: "first-pour kit", p: "$21", sub: "one-time only" },
              { n: "12 sachets", d: "the standard box", p: "$36", sub: "less subscribed + a free gift" },
              { n: "24 sachets", d: "the duo stock", p: "$66", sub: "less subscribed + a free gift" },
              { n: "48 sachets", d: "never run dry", p: "$126", sub: "less subscribed + a free gift" },
            ].map((b) => (
              <div key={b.n} style={{ background: "#fff", border: "2px solid var(--brand-ink)", borderRadius: 18, padding: "16px 14px", position: "relative" }}>
                <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(var(--brand-ink-rgb),0.6)" }}>{b.n}</p>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)", margin: "2px 0 8px" }}>{b.d}</p>
                <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1.3rem", color: "var(--brand-ink)" }}>{b.p}</p>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.64rem", fontWeight: 600, color: "var(--brand-accent-deep)" }}>{b.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.55)", marginTop: 14 }}>
            Every pack poured out with Drop 001.{" "}
            <a href="/drop" style={{ color: "var(--brand-ink)", fontWeight: 700, textDecoration: "underline" }}>Build your Drop 002 box →</a>
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "26px 0 0", flexWrap: "wrap" }}>
            {BADGES.map((b, i) => (
              <Image key={b.src} src={b.src} alt={b.alt} width={200} height={200} loading="lazy" style={{ width: "clamp(108px, 11vw, 136px)", height: "auto", transform: `rotate(${i % 2 ? 5 : -5}deg)`, filter: "drop-shadow(0 6px 12px rgba(45,52,26,0.14))" }} />
            ))}
          </div>

        </div>

        {/* ── KEY INGREDIENTS ── */}
        <div className="sf-ingredients">
          <h2 className="sf-label">Key Ingredients</h2>
          <ul className="sf-ing-list">
            {ingredients.map((ing, i) => (
              <li key={i}>
                <div>
                  <div className="sf-ing-name">{ing.name}</div>
                  <div className="sf-ing-detail">{ing.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RECIPES WITH THIS FLAVOR ── */}
        <div className="sf-recipes">
          <h2 className="sf-label">Recipes with Strawberry</h2>
          {recipes.map((r, i) => (
            <a key={i} href={r.href} className="sf-recipe-card">
              <h3>{r.name}</h3>
              <p>{r.desc}</p>
            </a>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <footer className="sf-footer">
          <div className="sf-footer-top">
            <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className="sf-footer-mid">
            &copy; 2026 shroom&eacute; &middot; hello@drinkshroome.com &middot;{" "}
            <a href="/privacy">Privacy Policy</a> &middot;{" "}
            <a href="/terms">Terms of Service</a>
          </div>
          <div className="sf-footer-bot">@drinkshroome</div>
        </footer>
      </div>
    </>
  );
}
