"use client";

import { useState } from "react";
import Script from "next/script";

const faqData = [
  {
    category: "The Product",
    num: "01",
    items: [
      {
        q: "What makes shroomé ceremonial grade?",
        a: `shroomé uses first-harvest, shade-grown ceremonial matcha — the highest grade available. Unlike culinary-grade matcha (which most competitors use), ceremonial grade delivers the <strong>highest EGCG antioxidant concentration</strong>, the cleanest L-theanine profile, and vivid green color. It's pre-blended into a ready-to-pour liquid concentrate so you get café-quality matcha with zero prep.`,
      },
      {
        q: "What's the difference between shroomé and matcha powder?",
        a: `Every matcha product on the market is a powder. Powder requires hot water, a frother, time, and cleanup. <strong>shroomé is the world's first ready-to-pour ceremonial matcha latte.</strong> It's already blended, already emulsified, already perfect. Tear it open. Pour it in. Done. Plus, shroomé stacks three benefits in one sachet: 2g ceremonial matcha, 2g grass-fed collagen, and real mushroom extracts.`,
      },
      {
        q: "What flavors does shroomé come in?",
        a: `<strong>Vanilla</strong> and <strong>Strawberry.</strong> Both use real ingredients — real vanilla bean extract and real freeze-dried strawberry. Zero artificial sweeteners or flavoring. Both are designed to pour over oat milk, hot or iced.`,
      },
      {
        q: "Does shroomé taste like mushrooms?",
        a: `Not even a little. shroomé uses <strong>beta glucan 1/3 and 1/6 polysaccharides</strong> — the specific bioactive compounds extracted from mushroom cell walls — not raw mushroom powder. At <strong>70%+ beta glucan concentration</strong> (which is extremely high for the category), these compounds are tasteless when formulated into the liquid matrix. What you actually taste is smooth, naturally sweet ceremonial matcha with the silky mouthfeel of collagen. Most people say it tastes better than the $7 matcha latte from their local café — and it takes <strong>15 seconds instead of 15 minutes.</strong>`,
      },
      {
        q: "How many servings per box?",
        a: `Each box contains <strong>12 single-serve sachets.</strong> Each sachet is one full matcha latte serving — just tear, pour over milk, and you're done. Subscribe for 20% off + free shipping on every box.`,
      },
    ],
  },
  {
    category: "Ingredients & Safety",
    num: "02",
    items: [
      {
        q: "What mushrooms are in shroomé?",
        a: `shroomé contains organic mushroom extracts standardized to <strong>70%+ beta glucan 1/3 and 1/6 polysaccharides</strong> — the specific bioactive compounds responsible for immune modulation and sustained focus. Most mushroom products on the market use low-potency mycelium-on-grain with beta glucan levels under 30%. shroomé's 70%+ concentration is among the highest in the functional food space. These are not psychoactive or psychedelic — they're <strong>food-grade, clinically studied compounds.</strong>`,
      },
      {
        q: "What's in the collagen and why is it included?",
        a: `shroomé includes <strong>2g of grass-fed collagen peptides</strong> pre-dissolved into the liquid — meaning optimal absorption, zero clumping, and no chalky aftertaste. Collagen supports skin, hair, nails, and gut health. Most people buy collagen separately. shroomé puts matcha + collagen + mushrooms into one pour.`,
      },
      {
        q: "Are there any psychoactive or psychedelic ingredients?",
        a: `No. Zero. shroomé contains functional mushroom extracts — not psilocybin, not "magic mushrooms." These are <strong>food-grade compounds</strong> that are legal, non-intoxicating, and clinically studied. You'll feel focused and energized, never altered.`,
      },
      {
        q: "Is shroomé vegan or gluten-free?",
        a: `shroomé is gluten-free, soy-free, and contains no artificial sweeteners, fillers, or preservatives. <strong>Note:</strong> shroomé contains grass-fed collagen (bovine-sourced), so it is not vegan. It fits cleanly into keto, paleo, and Whole30 lifestyles.`,
      },
      {
        q: "Is shroomé safe to drink every day?",
        a: `Yes — shroomé is designed for daily use. Ceremonial matcha, collagen peptides, and mushroom extracts all have long safety track records. If you're pregnant, nursing, or on medication, check with your healthcare provider first.`,
      },
    ],
  },
  {
    category: "Energy & Caffeine",
    num: "03",
    items: [
      {
        q: "Does shroomé contain caffeine?",
        a: `Yes — each sachet contains approximately <strong>50mg of naturally occurring caffeine</strong> from ceremonial matcha, roughly half a cup of coffee. But the difference is matcha's L-theanine creates smooth, sustained energy — focused alertness for 4–6 hours without the spike, jitters, or crash. Café energy without the cortisol rollercoaster.`,
      },
      {
        q: "How does shroomé compare to coffee?",
        a: `Coffee gives you a fast spike that crashes hard. shroomé delivers <strong>smooth, sustained energy</strong> thanks to matcha's natural L-theanine — calm focus without sedation. Most people describe it as 4–6 hours of clean, even alertness. No jitters. No crash. No 2pm wall. Café energy. Home address.`,
      },
    ],
  },
  {
    category: "How to Pour",
    num: "04",
    items: [
      {
        q: "How do I make a shroomé matcha latte?",
        a: `Fill your glass with ice (or warm your mug), add 6–8 oz of your milk of choice, then <strong>tear open the sachet and pour shroomé in last.</strong> Give it a swirl with your hand, a straw, or a spoon — no frother, no whisk, no mess. A full café-quality matcha latte in under 15 seconds.`,
      },
      {
        q: "Can I pour shroomé over oat milk?",
        a: `That's exactly how it's designed. shroomé is a liquid concentrate — just tear it open, pour over ice, and top with oat milk (or any milk). No frother, no whisk, no clumps. Barista-style oat milk gives the best texture, but almond, coconut, cashew, or dairy all work. <strong>Hot or iced — just pour and go.</strong>`,
      },
      {
        q: "Can I drink shroomé iced?",
        a: `Absolutely — shroomé was built for iced. Because it's already a liquid concentrate (not powder), it blends perfectly over ice with zero clumping. Pour over a full glass of ice, top with cold milk, done. <strong>No need to pre-dissolve in warm water</strong> like you would with powder matcha.`,
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/<[^>]*>/g, ""),
      },
    }))
  ),
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
      name: "FAQ",
      item: "https://www.drinkshroome.com/faq",
    },
  ],
};

const pills = [
  "2g Matcha",
  "Collagen",
  "Mushroom Extracts",
  "No Mixing",
  "12 Servings/Box",
  "50mg Caffeine",
  "Zero Crash",
];

const tickerItems = [
  "The World's First Ready-to-Pour Matcha Latte",
  "✦ Energy Without the Crash",
  "✦ 2g Matcha · Mushroom Extracts · Collagen",
  "✦ 50mg Caffeine · Zero Jitters · Actually Tastes Good",
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "01-0": true });

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const cat = key.split("-")[0];
      const next: Record<string, boolean> = {};
      // Close all in same category
      Object.keys(prev).forEach((k) => {
        if (!k.startsWith(cat + "-")) next[k] = prev[k];
      });
      if (!prev[key]) next[key] = true;
      return next;
    });
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        /* ── TICKER ─── */
        .faq-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .faq-ticker-track{display:inline-flex;animation:faqTick 28s linear infinite}
        .faq-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .faq-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes faqTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ─── */
        .faq-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .faq-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .faq-nav-logo img{width:28px;height:28px;filter:brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)}
        .faq-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .faq-nav-links{display:flex;gap:8px}
        .faq-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .faq-nav-links a:hover{color:#2D4A2D}
        .faq-nav-links a.active{color:#2D4A2D}
        .faq-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .faq-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ─── */
        .faq-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .faq-hero-bg{position:absolute;inset:0;background:url('/email-clouds-bg.jpg') center bottom/cover no-repeat;opacity:.45}
        .faq-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(255,183,209,0.7) 0%,rgba(255,183,209,0.5) 40%,rgba(253,244,238,0.6) 100%)}
        .faq-blob{position:absolute;border-radius:50%;pointer-events:none;background:#D4B8E0;opacity:.4}
        .faq-blob-a{width:340px;height:340px;top:-80px;right:10%}
        .faq-blob-b{width:200px;height:200px;bottom:-60px;left:5%;background:#FDF4EE;opacity:.3}
        .faq-hero-inner{position:relative;z-index:2;max-width:640px}
        .faq-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:#1B1F3B;margin-bottom:24px;
          opacity:0;animation:faqFadeUp .7s .1s forwards
        }
        .faq-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}
        .faq-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:#2D4A2D;margin-bottom:18px;opacity:0;animation:faqFadeUp .8s .2s forwards
        }
        .faq-hero h1 em{font-style:italic;color:#FF7043}
        .faq-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(27,31,59,0.7);max-width:480px;font-weight:400;
          opacity:0;animation:faqFadeUp .8s .35s forwards
        }
        .faq-hero-sub strong{color:#1B1F3B;font-weight:700}
        @keyframes faqFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── PILL ROW ─── */
        .faq-pill-row{display:flex;gap:0;overflow:hidden;white-space:nowrap;background:#D4B8E0;padding:12px 0}
        .faq-pill-track{display:inline-flex;animation:faqTick 22s linear infinite}
        .faq-pill-item{
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;color:#1B1F3B;padding:0 28px
        }
        .faq-pill-sep{opacity:.3}

        /* ── FAQ BODY ─── */
        .faq-body{max-width:820px;margin:0 auto;padding:64px 6% 80px}
        .faq-cat{margin-bottom:56px}
        .faq-cat:last-child{margin-bottom:0}
        .faq-cat-hdr{display:flex;align-items:center;gap:12px;margin-bottom:24px}
        .faq-cat-num{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(27,31,59,0.45);white-space:nowrap
        }
        .faq-cat-line{flex:1;height:1px;background:rgba(27,31,59,0.12)}
        .faq-cat-name{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(26px,3.5vw,36px);font-weight:400;font-style:italic;
          color:#1B1F3B;letter-spacing:-.01em;margin:0
        }

        /* ── ACCORDION ─── */
        .faq-item{border-bottom:1px solid rgba(27,31,59,0.12)}
        .faq-item:first-of-type{border-top:1px solid rgba(27,31,59,0.12)}
        .faq-q-btn{
          width:100%;background:none;border:none;text-align:left;
          padding:20px 48px 20px 0;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:clamp(14px,1.5vw,15.5px);
          font-weight:600;color:#1B1F3B;line-height:1.5;position:relative;transition:color .2s
        }
        .faq-q-btn:hover{color:#2D4A2D}
        .faq-q-btn::after{
          content:'+';position:absolute;right:0;top:50%;transform:translateY(-50%);
          font-family:'Instrument Serif',Georgia,serif;font-size:26px;font-weight:400;
          color:#FF7043;transition:transform .3s cubic-bezier(.23,1,.32,1)
        }
        .faq-item-open .faq-q-btn{color:#2D4A2D}
        .faq-item-open .faq-q-btn::after{content:'−'}
        .faq-answer{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.23,1,.32,1),padding .3s cubic-bezier(.23,1,.32,1)}
        .faq-item-open .faq-answer{max-height:500px;padding-bottom:22px}
        .faq-answer p{font-size:14px;color:rgba(27,31,59,0.7);line-height:1.8;font-weight:400;max-width:640px}
        .faq-answer strong{color:#1B1F3B;font-weight:600}

        /* ── CTA SECTION ─── */
        .faq-cta{background:#1B1F3B;padding:64px 7%;text-align:center;position:relative;overflow:hidden}
        .faq-cta-tag{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#C8FF3A;margin-bottom:16px}
        .faq-cta h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(30px,4vw,48px);font-weight:400;font-style:italic;
          color:#FDF4EE;line-height:1.05;margin-bottom:12px
        }
        .faq-cta h2 em{font-style:italic;color:#FF7043}
        .faq-cta-sub{font-size:14px;color:rgba(253,244,238,.5);margin-bottom:28px;font-weight:400}
        .faq-btn-cta{
          display:inline-block;background:#C8FF3A;color:#1B1F3B;border:none;
          padding:14px 36px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          cursor:pointer;transition:background .2s,transform .2s;text-decoration:none
        }
        .faq-btn-cta:hover{background:#d4ff5a;transform:translateY(-2px)}

        /* ── DISCLAIMER ─── */
        .faq-disclaimer{max-width:820px;margin:0 auto;padding:0 6% 40px}
        .faq-disclaimer p{font-family:'DM Mono',monospace;font-size:9.5px;letter-spacing:.06em;color:rgba(27,31,59,0.45);line-height:1.7}

        /* ── FOOTER ─── */
        .faq-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .faq-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .faq-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .faq-footer-top a:hover{color:#2D4A2D}
        .faq-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .faq-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .faq-footer-mid a:hover{color:#1B1F3B}
        .faq-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ─── */
        @media(max-width:640px){
          .faq-nav{padding:0 4%;height:54px;gap:8px}
          .faq-nav-links{display:none}
          .faq-nav-logo{gap:6px}
          .faq-nav-logo span{font-size:18px}
          .faq-nav-logo img{width:24px;height:24px}
          .faq-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .faq-hero{padding:48px 5% 44px}
          .faq-hero h1{font-size:clamp(32px,9vw,46px)}
          .faq-hero-sub{font-size:14px}
          .faq-hero-tag{font-size:10px;letter-spacing:.12em}
          .faq-blob-a{width:200px;height:200px;top:-40px;right:5%}
          .faq-blob-b{width:120px;height:120px}
          .faq-body{padding:40px 5% 56px}
          .faq-cat-name{font-size:clamp(24px,7vw,32px)}
          .faq-q-btn{font-size:14px;padding:18px 40px 18px 0}
          .faq-q-btn::after{font-size:22px}
          .faq-answer p{font-size:13.5px}
          .faq-cta{padding:44px 5%}
          .faq-cta h2{font-size:clamp(26px,7vw,38px)}
          .faq-btn-cta{padding:12px 28px;font-size:11px}
          .faq-footer-top{gap:16px;flex-wrap:wrap;justify-content:center}
          .faq-pill-item{font-size:10px;padding:0 20px}
        }
      `}</style>

      {/* ═══ TICKER ═══ */}
      <div className="faq-ticker">
        <div className="faq-ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="faq-ticker-item" dangerouslySetInnerHTML={{
              __html: t.replace(/✦/g, '<em>✦</em>')
            }} />
          ))}
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="faq-nav">
        <a href="/" className="faq-nav-logo">
          <img src="/logo-mark.png" width={28} height={28} alt="shroomé S" />
          <span>shroomé</span>
        </a>
        <div className="faq-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq" className="active">FAQ</a>
          <a href="/blog">Blog</a>
        </div>
        <a href="/" className="faq-nav-cta">Get 20% off + free shipping →</a>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="faq-hero">
        <div className="faq-hero-bg" />
        <div className="faq-hero-overlay" />
        <div className="faq-blob faq-blob-a" />
        <div className="faq-blob faq-blob-b" />
        <div className="faq-hero-inner">
          <div className="faq-hero-tag">Frequently Asked Questions</div>
          <h1>Got questions?<br /><em>We got answers.</em></h1>
          <p className="faq-hero-sub">
            The world&apos;s first ready-to-pour ceremonial matcha latte. Here&apos;s what people ask us most — from{" "}
            <strong>what&apos;s inside</strong> to <strong>how to pour it.</strong>
          </p>
        </div>
      </section>

      {/* ═══ PILL TICKER ═══ */}
      <div className="faq-pill-row">
        <div className="faq-pill-track">
          {[...pills, ...pills].map((p, i) => (
            <span key={i} className="faq-pill-item">
              {p} <span className="faq-pill-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FAQ BODY ═══ */}
      <div className="faq-body">
        {faqData.map((cat) => (
          <div key={cat.num} className="faq-cat">
            <div className="faq-cat-hdr">
              <span className="faq-cat-num">{cat.num}</span>
              <span className="faq-cat-line" />
            </div>
            <h2 className="faq-cat-name">{cat.category}</h2>
            {cat.items.map((item, idx) => {
              const key = `${cat.num}-${idx}`;
              const isOpen = !!openItems[key];
              return (
                <div key={key} className={`faq-item${isOpen ? " faq-item-open" : ""}`}>
                  <button className="faq-q-btn" onClick={() => toggle(key)}>
                    {item.q}
                  </button>
                  <div className="faq-answer">
                    <p dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ═══ DISCLAIMER ═══ */}
      <div className="faq-disclaimer">
        <p>
          *These statements have not been evaluated by the Food and Drug Administration. This product is not intended
          to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use if you are
          pregnant, nursing, or taking medication. Individual results may vary.
        </p>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="faq-cta">
        <div className="faq-cta-tag">Pre-Launch List</div>
        <h2>
          Be first.
          <br />
          <em>Get 20% off + free shipping.</em>
        </h2>
        <p className="faq-cta-sub">12 servings per box · Tear. Pour. Hit.</p>
        <a href="/" className="faq-btn-cta">
          Claim 20% off →
        </a>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="faq-footer">
        <div className="faq-footer-top">
          <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="faq-footer-mid">
          © 2026 shroomé · hello@drinkshroome.com ·{" "}
          <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a>
        </div>
        <div className="faq-footer-bot">@drinkshroome</div>
      </footer>
    </>
  );
}
