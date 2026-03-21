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
        .rec-nav-logo img{width:28px;height:28px;filter:brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)}
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

        /* ── TILE GRID ── */
        .rec-grid-section{max-width:1100px;margin:0 auto;padding:64px 6% 48px}
        .rec-grid-title{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:32px
        }
        .rec-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:18px
        }
        .rec-tile{
          position:relative;overflow:hidden;
          border-radius:16px;
          min-height:320px;
          display:flex;flex-direction:column;justify-content:flex-end;
          cursor:pointer;
          text-decoration:none;
          transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s
        }
        .rec-tile:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(27,31,59,0.18)}
        .rec-tile-img{
          position:absolute;inset:0;
          background-size:cover;background-position:center;
          transition:transform .4s cubic-bezier(.22,1,.36,1)
        }
        .rec-tile:hover .rec-tile-img{transform:scale(1.04)}
        .rec-tile-overlay{
          position:absolute;inset:0;
          background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.55) 100%);
          transition:background .3s
        }
        .rec-tile-color{
          position:absolute;inset:0;
          opacity:0;
          mix-blend-mode:multiply;
          transition:opacity .3s
        }
        .rec-tile:hover .rec-tile-color{opacity:0.35}
        .rec-tile-badge{
          position:absolute;top:14px;right:14px;
          font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
          letter-spacing:.14em;text-transform:uppercase;
          padding:5px 12px;border-radius:100px;
          background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);
          color:#FDF4EE;z-index:2
        }
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
          font-size:clamp(20px,2.2vw,26px);font-weight:400;font-style:italic;
          line-height:1.15;letter-spacing:-.01em;
          color:#FDF4EE;
          text-shadow:0 1px 8px rgba(0,0,0,0.2)
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
          .rec-tile{min-height:260px}
          .rec-nav{padding:0 4%;height:54px;gap:8px}
          /* rec-nav-links hidden via main style block above */
          .rec-nav-logo{gap:6px}
          .rec-nav-logo span{font-size:18px}
          .rec-nav-logo img{width:24px;height:24px}
          .rec-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .rec-hero{padding:48px 6% 40px}
          .rec-tile-content{padding:18px}
        }
        @media(max-width:480px){
          .rec-grid{grid-template-columns:1fr;gap:12px}
          .rec-tile{min-height:280px}
        }
      `}</style>

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
              <div
                className="rec-tile-img"
                style={{ backgroundImage: `url(${recipe.image})` }}
              />
              <div className="rec-tile-overlay" />
              <div
                className="rec-tile-color"
                style={{ background: recipe.color }}
              />
              <div className="rec-tile-badge">
                {recipe.prepLabel}
              </div>
              <div className="rec-tile-content">
                <div className="rec-tile-ingredients">
                  {recipe.ingredients.length} ingredients
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
    </>
  );
}
