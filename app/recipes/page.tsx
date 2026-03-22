import Script from "next/script";
import { recipes } from "./data";
import MobileNav from "../MobileNav";

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
        .rec-nav-logo img{width:32px;height:32px;border-radius:6px}
        .rec-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .rec-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.rec-nav-links{display:none !important}}
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

        /* ── PAGE WRAPPER (retro 90s background) ── */
        .rec-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(212,184,224,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(200,255,58,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255,183,209,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          position:relative
        }
        .rec-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B1F3B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── HERO ── */
        .rec-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .rec-hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(200,255,58,0.2) 0%,rgba(255,183,209,0.25) 50%,rgba(212,184,224,0.2) 100%)}
        .rec-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(240,228,216,0.85) 0%,rgba(237,224,212,0.8) 100%)}
        .rec-blob{position:absolute;border-radius:50%;pointer-events:none;opacity:.3}
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

        /* ── TILE GRID ── */
        .rec-grid-section{padding:48px 0 0}
        .rec-grid-title{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:32px;padding:0 6%;text-align:center
        }
        /* Desktop: 3-col grid, no gaps, colors bleed together */
        .rec-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:0
        }
        .rec-tile{
          position:relative;overflow:hidden;
          aspect-ratio:2/3;
          display:flex;flex-direction:column;justify-content:flex-end;
          cursor:pointer;
          text-decoration:none;
          transition:filter .3s,transform .3s
        }
        .rec-tile:hover{filter:brightness(1.06);transform:scale(1.02);z-index:2}
        .rec-tile-img{
          position:absolute;inset:0;
          display:flex;align-items:center;justify-content:center;
          transition:transform .5s cubic-bezier(.22,1,.36,1)
        }
        .rec-tile-img img{
          width:100%;height:100%;
          object-fit:cover;
          object-position:center 15%
        }
        .rec-tile:hover .rec-tile-img{transform:scale(1.04)}
        .rec-tile-overlay{
          position:absolute;inset:0;
          background:linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0.5) 100%);
          pointer-events:none
        }
        .rec-tile-badge{display:none}
        .rec-tile-content{
          position:relative;z-index:2;
          padding:24px
        }
        .rec-tile-ingredients{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.1em;text-transform:uppercase;
          color:rgba(253,244,238,0.7);margin-bottom:6px
        }
        .rec-tile-name{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(22px,2.5vw,32px);font-weight:400;font-style:italic;
          line-height:1.1;letter-spacing:-.01em;
          color:#FDF4EE;
          text-shadow:0 2px 16px rgba(0,0,0,0.25)
        }

        /* ── CTA ── */
        .rec-cta{
          text-align:center;padding:80px 8%;
          background:linear-gradient(180deg, rgba(212,184,224,0.25) 0%, rgba(200,255,58,0.1) 50%, rgba(255,183,209,0.15) 100%)
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
          .rec-nav{padding:0 4%;height:54px;gap:8px}
          .rec-nav-logo{gap:6px}
          .rec-nav-logo span{font-size:18px}
          .rec-nav-logo img{width:30px;height:30px}
          .rec-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .rec-hero{padding:48px 6% 40px}
          .rec-grid{grid-template-columns:1fr}
          .rec-tile{aspect-ratio:auto;min-height:80vh}
          .rec-tile-content{padding:0 6% 40px}
          .rec-tile-name{font-size:clamp(28px,7vw,42px)}
        }
        @media(max-width:480px){
          .rec-tile{min-height:75vh}
          .rec-tile-content{padding:0 5% 32px}
        }
      `}</style>

      <div className="rec-page">
      {/* ── TICKER ── */}
      <div className="rec-ticker">
        <div className="rec-ticker-track">
          {[
            "TEAR ✦ POUR ✦ DONE",
            "9 EASY RECIPES",
            "ALL UNDER A MINUTE",
            "CEREMONIAL MATCHA + MUSHROOMS + COLLAGEN",
            "TEAR ✦ POUR ✦ DONE",
            "9 EASY RECIPES",
            "ALL UNDER A MINUTE",
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

      {/* ── NAV ── */}
      <nav className="rec-nav">
        <a href="/" className="rec-nav-logo">
          <img
            src="/logo-mark.png"
            width={32}
            height={32}
            alt="shroomé S"
          />
          <span>shroomé</span>
        </a>
        <div className="rec-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
          <a href="/recipes" className="active">Recipes</a>
        </div>
        <a href="/" className="rec-nav-cta">
          Get 20% off + free shipping &rarr;
        </a>
        <MobileNav
          prefix="rec"
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

      {/* ── PILL TICKER ── */}
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

      {/* ── RECIPE TILE GRID ── */}
      <section className="rec-grid-section">
        <div className="rec-grid-title">Pick your pour</div>
        <div className="rec-grid">
          {recipes.map((recipe) => (
            <a
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="rec-tile"
            >
              <div className="rec-tile-img">
                <img src={recipe.image} alt={recipe.name} />
              </div>
              <div className="rec-tile-overlay" />
              <div className="rec-tile-content">
                <div className="rec-tile-ingredients">
                  {recipe.ingredients.length} ingredients · {recipe.prepLabel}
                </div>
                <div className="rec-tile-name">
                  {recipe.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
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

      {/* ── FOOTER ── */}
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
      </div>
    </>
  );
}
