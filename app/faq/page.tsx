"use client";

import { BRAND, svgHex } from "@/app/lib/brand";
import { useState } from "react";

import Image from "next/image";
import MobileNav from "../MobileNav";

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
        a: `Powder requires hot water, a frother, time, and cleanup. <strong>shroomé is a liquid ceremonial matcha latte.</strong> It's already blended, already emulsified, already perfect. Pour. Swirl. Go. Plus, shroomé stacks three benefits in one sachet: 2.5g ceremonial matcha, 2g grass-fed collagen, and real mushroom extracts.`,
      },
      {
        q: "What flavors does shroomé come in?",
        a: `<strong>Vanilla</strong> and <strong>Strawberry.</strong> Both use real ingredients — real vanilla bean extract and real freeze-dried strawberry. Zero artificial sweeteners or flavoring. Both are designed to pour over oat milk, hot or iced.`,
      },
      {
        q: "Does shroomé taste like mushrooms?",
        a: `Not even a little. shroomé uses <strong>beta glucan 1/3 and 1/6 polysaccharides</strong> — the specific bioactive compounds extracted from mushroom cell walls — not raw mushroom powder. At <strong>70%+ beta glucan concentration</strong> (which is extremely high for the category), these compounds are tasteless when formulated into the liquid matrix. What you actually taste is smooth, naturally sweet ceremonial matcha with the silky mouthfeel of collagen. Most people say it tastes better than the $7 matcha latte from their local café — and it takes <strong>a 30-second pour instead of 15 minutes.</strong>`,
      },
      {
        q: "How many servings per box?",
        a: `Each box contains <strong>12 single-serve sachets.</strong> Each sachet is one full matcha latte serving — pour over milk, swirl, go. Boxes ship in numbered drops: Drop 001 (500 boxes) sold out in 9 days, and the Drop 002 list gets the link before it's public.`,
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
        a: `Yes — each sachet contains approximately <strong>60mg of naturally occurring caffeine</strong> from ceremonial matcha, roughly half a cup of coffee. But the difference is matcha's L-theanine creates smooth, sustained energy — focused alertness for 4–6 hours without the spike, jitters, or crash. Good energy without the cortisol rollercoaster.`,
      },
      {
        q: "How does shroomé compare to coffee?",
        a: `Coffee gives you a fast spike that crashes hard. shroomé delivers <strong>smooth, sustained energy</strong> thanks to matcha's natural L-theanine — calm focus without sedation. Most people describe it as 4–6 hours of clean, even alertness. No jitters. No crash. No 2pm wall. Pour. Swirl. Go.`,
      },
    ],
  },
  {
    category: "How to Pour",
    num: "04",
    items: [
      {
        q: "How do I make a shroomé matcha latte?",
        a: `Fill your glass with ice (or warm your mug), add 6–8 oz of your milk of choice, then <strong>tear open the sachet and pour shroomé in last.</strong> Give it a swirl with your hand, a straw, or a spoon — no frother, no whisk, no mess. A full café-quality matcha latte in one 30-second pour.`,
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
  "2.5g matcha",
  "Collagen",
  "Mushroom Extracts",
  "No Mixing",
  "12 Servings/Box",
  "60mg Caffeine",
  "Zero Crash",
];

const tickerItems = [
  "The Liquid Ceremonial Matcha Latte",
  "✦ Energy Without the Crash",
  "✦ 2.5g matcha · Mushroom Extracts · Collagen",
  "✦ 60mg Caffeine · Zero Jitters · Actually Tastes Good",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        /* ── PAGE WRAPPER (retro 90s background) ── */
        .faq-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(var(--brand-flavor-functional-rgb),0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(var(--brand-accent-rgb),0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(var(--brand-accent-muted-rgb),0.12) 0%, transparent 50%),
            linear-gradient(180deg, var(--brand-canvas) 0%, var(--brand-tint-soft) 45%, var(--brand-canvas) 100%);
          background-attachment:fixed;
          position:relative
        }
        .faq-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${svgHex(BRAND.colors.ink)}' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── TICKER ─── */
        .faq-ticker{background:var(--brand-ink);padding:10px 0;overflow:hidden;white-space:nowrap}
        .faq-ticker-track{display:flex;justify-content:center;flex-wrap:wrap;row-gap:6px}
        .faq-ticker-item{font-family:var(--brand-font-mono);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(var(--brand-canvas-rgb),.75)}
        .faq-ticker-item em{color:var(--brand-tint-soft);font-style:normal;font-weight:500}
        @media(max-width:480px){.faq-ticker{white-space:normal}.faq-ticker-item{padding:0 10px;letter-spacing:.08em;font-size:9px;white-space:normal;text-align:center}}
        @keyframes faqTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ─── */
        .faq-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(var(--brand-canvas-rgb),0.88);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(var(--brand-ink-rgb),0.06)
        }
        .faq-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:var(--brand-ink)
        }
        .faq-nav-logo img{width:32px;height:32px;border-radius:6px}
        .faq-nav-logo span{font-family:var(--brand-font-display);font-size:22px;font-weight:700;font-style:normal;color:var(--brand-ink)}
        .faq-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.faq-nav-links{display:none !important}.faq-nav-cta{display:none !important}}
        .faq-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:var(--brand-font-body);font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:var(--brand-ink);
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .faq-nav-links a:hover{color:var(--brand-accent-deep)}
        .faq-nav-links a.active{color:var(--brand-accent-deep)}
        .faq-nav-cta{
          background:var(--brand-ink);color:var(--brand-canvas);border:none;
          padding:10px 20px;font-family:var(--brand-font-body);
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .faq-nav-cta:hover{background:#3c452a}

        /* ── HERO ─── */
        .faq-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .faq-hero-bg{position:absolute;inset:0;background:url('/email-clouds-bg.jpg') center bottom/cover no-repeat;opacity:.45}
        .faq-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(227,213,247,0.75) 0%,rgba(227,213,247,0.45) 40%,rgba(var(--brand-canvas-rgb),0.6) 100%)}
        .faq-blob{position:absolute;border-radius:50%;pointer-events:none;background:var(--brand-flavor-functional);opacity:.4}
        .faq-blob-a{width:340px;height:340px;top:-80px;right:10%}
        .faq-blob-b{width:200px;height:200px;bottom:-60px;left:5%;background:var(--brand-canvas);opacity:.3}
        .faq-hero-inner{position:relative;z-index:2;max-width:640px}
        .faq-hero-img{position:absolute;right:6%;top:50%;transform:translateY(-50%) rotate(2deg);width:min(24vw,300px);z-index:1;display:block}
        .faq-hero-img img{width:100%;height:auto;border-radius:20px;border:3px solid var(--brand-ink);box-shadow:0 18px 44px rgba(45,52,26,0.22);display:block}
        @media(max-width:900px){.faq-hero-img{display:none}}

        .faq-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:var(--brand-ink);margin-bottom:24px;
          opacity:0;animation:faqFadeUp .7s .1s forwards
        }
        .faq-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--brand-accent);flex-shrink:0}
        .faq-hero h1{
          font-family:var(--brand-font-display);
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:var(--brand-accent-deep);margin-bottom:18px;opacity:0;animation:faqFadeUp .8s .2s forwards
        }
        .faq-hero h1 em{font-style:normal;color:var(--brand-accent-deep)}
        .faq-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(var(--brand-ink-rgb),0.7);max-width:480px;font-weight:400;
          opacity:0;animation:faqFadeUp .8s .35s forwards
        }
        .faq-hero-sub strong{color:var(--brand-ink);font-weight:700}
        @keyframes faqFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── PILL ROW ─── */
        .faq-pill-row{display:flex;gap:0;overflow:hidden;white-space:nowrap;background:var(--brand-flavor-functional);padding:12px 0}
        .faq-pill-track{display:flex;justify-content:center;flex-wrap:wrap;row-gap:6px}
        .faq-pill-item{
          font-family:var(--brand-font-body);font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;color:var(--brand-ink);padding:0 28px
        }
        .faq-pill-sep{opacity:.3}

        /* ── FAQ BODY ─── */
        .faq-body{max-width:820px;margin:0 auto;padding:64px 6% 80px}
        .faq-cat{margin-bottom:56px}
        .faq-cat:last-child{margin-bottom:0}
        .faq-cat-hdr{display:flex;align-items:center;gap:12px;margin-bottom:24px}
        .faq-cat-num{
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--brand-ink-rgb),0.45);white-space:nowrap
        }
        .faq-cat-line{flex:1;height:1px;background:rgba(var(--brand-ink-rgb),0.12)}
        .faq-cat-name{
          font-family:var(--brand-font-display);
          font-size:clamp(26px,3.5vw,36px);font-weight:700;font-style:normal;
          color:var(--brand-ink);letter-spacing:-.01em;margin:0
        }

        /* ── ACCORDION ─── */
        .faq-item{border-bottom:1px solid rgba(var(--brand-ink-rgb),0.12)}
        .faq-item:first-of-type{border-top:1px solid rgba(var(--brand-ink-rgb),0.12)}
        .faq-q-btn{
          width:100%;background:none;border:none;text-align:left;
          padding:20px 48px 20px 0;cursor:pointer;
          font-family:var(--brand-font-body);font-size:clamp(14px,1.5vw,15.5px);
          font-weight:600;color:var(--brand-ink);line-height:1.5;position:relative;transition:color .2s
        }
        .faq-q-btn:hover{color:var(--brand-accent-deep)}
        .faq-q-btn::after{
          content:'+';position:absolute;right:0;top:50%;transform:translateY(-50%);
          font-family:var(--brand-font-display);font-size:26px;font-weight:400;
          color:var(--brand-accent-deep);transition:transform .3s cubic-bezier(.23,1,.32,1)
        }
        .faq-item-open .faq-q-btn{color:var(--brand-accent-deep)}
        .faq-item-open .faq-q-btn::after{content:'−'}
        .faq-answer{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.23,1,.32,1),padding .3s cubic-bezier(.23,1,.32,1)}
        .faq-item-open .faq-answer{max-height:500px;padding-bottom:22px}
        .faq-answer p{font-size:14px;color:rgba(var(--brand-ink-rgb),0.7);line-height:1.8;font-weight:400;max-width:640px}
        .faq-answer strong{color:var(--brand-ink);font-weight:600}

        /* ── CTA SECTION ─── */
        .faq-cta{background:var(--brand-ink);padding:64px 7%;text-align:center;position:relative;overflow:hidden}
        .faq-cta-tag{font-family:var(--brand-font-mono);font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--brand-accent);margin-bottom:16px}
        .faq-cta h2{
          font-family:var(--brand-font-display);
          font-size:clamp(30px,4vw,48px);font-weight:700;font-style:normal;
          color:var(--brand-canvas);line-height:1.05;margin-bottom:12px
        }
        .faq-cta h2 em{font-style:normal;color:var(--brand-accent-deep)}
        .faq-cta-sub{font-size:14px;color:rgba(var(--brand-canvas-rgb),.5);margin-bottom:28px;font-weight:400}
        .faq-btn-cta{
          display:inline-block;background:var(--brand-accent);color:var(--brand-canvas);border:none;
          padding:14px 36px;font-family:var(--brand-font-body);
          font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          cursor:pointer;transition:background .2s,transform .2s;text-decoration:none
        }
        .faq-btn-cta:hover{background:#ff8fd4;transform:translateY(-2px)}

        /* ── DISCLAIMER ─── */
        .faq-disclaimer{max-width:820px;margin:0 auto;padding:0 6% 40px}
        .faq-disclaimer p{font-family:var(--brand-font-mono);font-size:9.5px;letter-spacing:.06em;color:rgba(var(--brand-ink-rgb),0.45);line-height:1.7}

        /* ── FOOTER ─── */
        .faq-footer{background:var(--brand-flavor-functional);padding:32px 6%;text-align:center;border-top:1px solid rgba(var(--brand-ink-rgb),0.06)}
        .faq-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .faq-footer-top a{
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:var(--brand-ink);text-decoration:none;transition:color .2s
        }
        .faq-footer-top a:hover{color:var(--brand-accent-deep)}
        .faq-footer-mid{font-size:12px;color:rgba(var(--brand-ink-rgb),0.45);margin-bottom:8px}
        .faq-footer-mid a{color:rgba(var(--brand-ink-rgb),0.45);text-decoration:underline;transition:color .2s}
        .faq-footer-mid a:hover{color:var(--brand-ink)}
        .faq-footer-bot{font-family:var(--brand-font-mono);font-size:10px;color:rgba(var(--brand-ink-rgb),0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ─── */
        @media(max-width:640px){
          .faq-nav{padding:0 4%;height:54px;gap:8px}
          /* faq-nav-links hidden via main style block above */
          .faq-nav-logo{gap:6px}
          .faq-nav-logo span{font-size:18px}
          .faq-nav-logo img{width:30px;height:30px}
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

      <div className="faq-page">
      {/* ═══ TICKER ═══ */}
      <div className="faq-ticker">
        <div className="faq-ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="faq-ticker-item" dangerouslySetInnerHTML={{
              __html: t.replace(/✦/g, '<em>✦</em>')
            }} />
          ))}
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="faq-nav" aria-label="Main navigation">
        <a href="/" className="faq-nav-logo">
          <Image src="/brand/symbol-sheep-solid.png" width={32} height={32} alt="shroomé S" style={{ borderRadius: 6 }} priority />
          <img src="/brand/wordmark.png" alt="shroomé" style={{ height: 22, width: "auto" }} />
        </a>
        <div className="faq-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq" className="active">FAQ</a>
          <a href="/blog">Blog</a>
          <a href="/recipes">Recipes</a>        </div>
        <a href="/" className="faq-nav-cta">Get first access &rarr;</a>
        <MobileNav
          prefix="faq"
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

      {/* ═══ HERO ═══ */}
      <section className="faq-hero">
        <div className="faq-hero-bg" />
        <div className="faq-hero-overlay" />
        <div className="faq-blob faq-blob-a" />
        <div className="faq-blob faq-blob-b" />
        <div className="faq-hero-img" aria-hidden="true"><img src="/brand/iced-flower.jpg" alt="Iced matcha in a lavender flower glass" loading="lazy" /></div>
        <div className="faq-hero-inner">
          <div className="faq-hero-tag">Frequently Asked Questions</div>
          <h1>Got questions?<br /><em>We got answers.</em></h1>
          <p className="faq-hero-sub">
            The liquid ceremonial matcha latte. Here&apos;s what the flock asks us most — from{" "}
            <strong>what&apos;s inside</strong> to <strong>how to pour it.</strong>
          </p>
        </div>
      </section>

      {/* ═══ PILL TICKER ═══ */}
      <div className="faq-pill-row">
        <div className="faq-pill-track">
          {pills.map((p, i) => (
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
                  <button className="faq-q-btn" onClick={() => toggle(key)} aria-expanded={isOpen}>
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
        <div className="faq-cta-tag">Drop 002 Is Coming</div>
        <h2>
          Still have questions?
          <br />
          <em>The pour answers most of them.</em>
        </h2>
        <p className="faq-cta-sub">Drop 001 sold out in 9 days. The list gets the link first. Pour. Swirl. Go.</p>
        <a href="/" className="faq-btn-cta">
          Join the Drop 002 list &rarr;
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
      </div>
    </>
  );
}
