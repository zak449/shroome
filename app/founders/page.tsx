"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MobileNav from "../MobileNav";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const tickerItems = [
  "First Pour Pre-Order",
  "✦ 30% Off · $25.20 vs $36",
  "✦ Ships June 15 · Launch Day",
  "✦ 3 Reorder Codes Included",
  "✦ Free Shipping · Limited Time",
];

// Launch date — June 15, 2026
const LAUNCH_DATE = new Date("2026-06-15T00:00:00-07:00");

const benefits = [
  {
    num: "01",
    title: "30% Off — Locked",
    desc: "$25.20 instead of $36. Your price is locked at checkout. It never goes up for you.",
    color: "var(--brand-accent)",
  },
  {
    num: "02",
    title: "Ships June 15",
    desc: "Your box ships on launch day, June 15. You're first in line.",
    color: "var(--brand-flavor-strawberry)",
  },
  {
    num: "03",
    title: "Free Shipping",
    desc: "First 3 orders ship free. No minimum. No code. Just pour.",
    color: "var(--brand-flavor-functional)",
  },
  {
    num: "04",
    title: "3 Reorder Codes",
    desc: "You get 3 × 30% off codes to use any time — on your next orders or gift to friends.",
    color: "var(--brand-accent)",
  },
  {
    num: "05",
    title: "First Pour Status",
    desc: "You believed before anyone else. That means something. First Pour supporters get priority access to every new flavor and limited drop.",
    color: "var(--brand-flavor-strawberry)",
  },
];

// CFO ruling 2026-07-14: referral rewards are FIXED account credits —
// $5 / $10 / $15 at 1 / 3 / 5 referrals (hard cap), plus the case-001
// leaderboard prize. Your First Pour price never changes.
const creditTiers = [
  {
    label: "1 Referral",
    reward: "$5",
    unit: "account credit",
    amt: 5,
    desc: "Refer one friend, earn a $5 credit toward future drops.",
    color: "var(--brand-flavor-strawberry)",
  },
  {
    label: "3 Referrals",
    reward: "$10",
    unit: "total credit",
    amt: 10,
    desc: "Three referrals = $10 in total credit.",
    color: "var(--brand-flavor-functional)",
  },
  {
    label: "5 Referrals",
    reward: "$15",
    unit: "total credit",
    amt: 15,
    desc: "Five referrals = $15 total. That's the cap — no games.",
    color: "var(--brand-accent)",
    highlight: true,
  },
  {
    label: "Top Referrer",
    reward: "Case 001",
    unit: "leaderboard prize",
    amt: 15,
    desc: "Our top referrer takes home a hand-numbered box from the very first case.",
    color: "var(--brand-accent)",
  },
];

const faqs = [
  {
    q: "What is First Pour?",
    a: "First Pour is shroomé's pre-order for people who want in before the public launch. You pay now at 30% off ($25.20 vs $36), your box ships June 15 on launch day. No numbered boxes, no gimmicks. Just the best price we'll ever offer and early access.",
  },
  {
    q: "What are the 3 reorder codes?",
    a: "Every First Pour pre-order includes 3 single-use codes for 30% off future orders. Use them on your next boxes or share them with friends. They don't expire at launch — you can use them any time after your first order ships.",
  },
  {
    q: "When does it ship?",
    a: "First Pour orders ship June 15, 2026 — launch day. You'll get a tracking email the moment your box leaves the warehouse.",
  },
  {
    q: "Do referrals change my First Pour price?",
    a: "No — referral rewards are account credits applied to future drops, and your First Pour price stays locked at $25.20. You earn a $5 credit for your 1st referral, $10 total at 3, and $15 total at 5 — that's the cap. Our top referrer also takes home a hand-numbered box from case 001. Share your referral link from the Referral page after checkout.",
  },
  {
    q: "What if you don't ship?",
    a: "Full refund. No questions. We'd rather not have your money than not deliver. That's the deal.",
  },
];

export default function Founders() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const diff = LAUNCH_DATE.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function handlePreOrder() {
    window.gtag?.("event", "begin_checkout", {
      event_category: "ecommerce",
      event_label: "first_pour",
      value: 25.20,
      currency: "USD",
    });
    window.location.href = "/founders/checkout";
  }

  return (
    <>
      <style>{`
        .fb-ticker{background:var(--brand-ink);padding:10px 0;overflow:hidden;white-space:nowrap}
        .fb-ticker-track{display:inline-flex;animation:fbTick 28s linear infinite}
        .fb-ticker-item{font-family:var(--brand-font-mono);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(var(--brand-canvas-rgb),.75)}
        .fb-ticker-item em{color:var(--brand-accent);font-style:normal;font-weight:500}
        @keyframes fbTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .fb-nav{position:sticky;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 5%;height:60px;background:rgba(var(--brand-flavor-strawberry-rgb),0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(var(--brand-ink-rgb),0.06)}
        .fb-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--brand-ink)}
        .fb-nav-logo img{width:32px;height:32px;border-radius:6px}
        .fb-nav-logo span{font-family:var(--brand-font-display);font-size:22px;font-weight:400;font-style:italic;color:var(--brand-ink)}
        .fb-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.fb-nav-links{display:none !important}.fb-nav-cta{display:none !important}}
        .fb-nav-links a{background:none;border:none;cursor:pointer;font-family:var(--brand-font-body);font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--brand-ink);opacity:.7;text-decoration:none;padding:6px 10px;border-radius:6px;transition:opacity .2s}
        .fb-nav-links a:hover{opacity:1}
        .fb-nav-cta{font-family:var(--brand-font-mono);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:var(--brand-ink);color:var(--brand-accent);border:none;padding:10px 22px;border-radius:6px;cursor:pointer;text-decoration:none;transition:transform .15s}
        .fb-nav-cta:hover{transform:scale(1.03)}

        .fb-hero{position:relative;background:url('/email-clouds-bg.jpg') center/cover no-repeat var(--brand-flavor-strawberry);min-height:480px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .fb-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(var(--brand-flavor-strawberry-rgb),0.7) 0%,rgba(var(--brand-flavor-functional-rgb),0.6) 50%,rgba(var(--brand-canvas-rgb),0.8) 100%)}
        .fb-hero-content{position:relative;z-index:2;padding:60px 24px 48px}
        .fb-hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(var(--brand-ink-rgb),0.08);border-radius:20px;padding:6px 16px;margin-bottom:20px}
        .fb-hero-dot{width:8px;height:8px;border-radius:50%;background:var(--brand-accent);box-shadow:0 0 8px rgba(var(--brand-accent-rgb),0.5)}
        .fb-hero-tag span{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--brand-ink)}
        .fb-hero h1{font-family:var(--brand-font-display);font-size:clamp(52px,9vw,80px);font-weight:400;font-style:italic;color:var(--brand-ink);line-height:1.02;margin:0 0 16px}
        .fb-hero-sub{font-family:var(--brand-font-body);font-size:16px;color:var(--brand-ink);opacity:.7;margin:0 0 28px;line-height:1.6}
        .fb-hero-pct{font-family:var(--brand-font-display);font-size:clamp(72px,12vw,104px);font-weight:400;font-style:italic;color:var(--brand-ink);line-height:1;margin:0 0 4px;letter-spacing:-.01em}
        .fb-hero-pct-sub{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--brand-ink);opacity:.45;margin:0 0 20px}
        .fb-hero-price{display:inline-flex;align-items:baseline;gap:8px;margin-bottom:28px}
        .fb-hero-price-new{font-family:var(--brand-font-mono);font-size:18px;font-weight:700;color:var(--brand-ink);opacity:.6}
        .fb-hero-price-old{font-family:var(--brand-font-mono);font-size:16px;color:var(--brand-ink);opacity:.3;text-decoration:line-through}
        .fb-hero-price-label{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--brand-ink);opacity:.35}
        .fb-hero-cta{display:inline-block;padding:16px 48px;border-radius:8px;background:var(--brand-ink);color:var(--brand-accent);font-family:var(--brand-font-mono);font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;transition:transform .15s;text-decoration:none}
        .fb-hero-cta:hover{transform:scale(1.03)}
        .fb-hero-trust{font-family:var(--brand-font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--brand-ink);opacity:.35;margin-top:14px}

        .fb-countdown{background:var(--brand-ink);padding:40px 24px;text-align:center}
        .fb-countdown-label{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--brand-canvas-rgb),0.4);margin:0 0 20px}
        .fb-countdown-units{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap}
        .fb-countdown-unit{display:flex;flex-direction:column;align-items:center;gap:4px}
        .fb-countdown-num{font-family:var(--brand-font-mono);font-size:clamp(36px,8vw,64px);font-weight:700;color:var(--brand-accent);line-height:1;min-width:2ch;text-align:center}
        .fb-countdown-unit-label{font-family:var(--brand-font-mono);font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgba(var(--brand-canvas-rgb),0.3)}
        .fb-countdown-sep{font-family:var(--brand-font-mono);font-size:clamp(28px,6vw,48px);font-weight:700;color:rgba(var(--brand-accent-rgb),0.3);line-height:1;align-self:flex-start;margin-top:4px}
        .fb-countdown-sub{font-family:var(--brand-font-body);font-size:13px;color:rgba(var(--brand-canvas-rgb),0.4);margin:16px 0 0}

        .fb-benefits{background:var(--brand-canvas);padding:60px 5%}
        .fb-benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;max-width:900px;margin:0 auto}
        .fb-benefit{background:#fff;border-radius:12px;padding:28px 24px;border:1px solid rgba(var(--brand-ink-rgb),0.06)}
        .fb-benefit-num{font-family:var(--brand-font-mono);font-size:11px;font-weight:700;letter-spacing:.15em;display:inline-block;padding:4px 10px;border-radius:12px;margin-bottom:12px}
        .fb-benefit h3{font-family:var(--brand-font-display);font-size:24px;font-weight:400;font-style:italic;color:var(--brand-ink);margin:0 0 8px}
        .fb-benefit p{font-family:var(--brand-font-body);font-size:13px;color:var(--brand-ink);opacity:.6;margin:0;line-height:1.6}

        .fb-testimonials{background:var(--brand-ink);padding:60px 5%}
        .fb-testimonials-heading{font-family:var(--brand-font-display);font-size:clamp(28px,4vw,40px);font-weight:400;font-style:italic;color:var(--brand-canvas);text-align:center;margin:0 0 40px}
        .fb-testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;max-width:900px;margin:0 auto}
        .fb-testimonial{background:rgba(var(--brand-canvas-rgb),0.05);border:1px solid rgba(var(--brand-canvas-rgb),0.08);border-radius:12px;padding:28px 24px}
        .fb-testimonial-stars{color:var(--brand-accent);font-size:14px;margin:0 0 12px;letter-spacing:2px}
        .fb-testimonial-body{font-family:var(--brand-font-body);font-size:14px;color:rgba(var(--brand-canvas-rgb),0.75);line-height:1.65;margin:0 0 16px;font-style:italic}
        .fb-testimonial-author{font-family:var(--brand-font-mono);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--brand-canvas-rgb),0.3)}

        .fb-stack{background:var(--brand-canvas);padding:0 5% 60px}
        .fb-stack-heading{font-family:var(--brand-font-display);font-size:clamp(28px,4vw,40px);font-weight:400;font-style:italic;color:var(--brand-ink);text-align:center;margin:0 0 6px}
        .fb-stack-sub{font-family:var(--brand-font-body);font-size:14px;color:var(--brand-ink);opacity:.55;text-align:center;margin:0 0 36px}
        .fb-stack-tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;max-width:860px;margin:0 auto}
        .fb-stack-tier{background:#fff;border-radius:12px;padding:24px 20px;border:2px solid transparent;position:relative;overflow:hidden;transition:transform .2s}
        .fb-stack-tier.highlight{border-color:var(--brand-accent);background:#F9FFE8}
        .fb-stack-tier:hover{transform:translateY(-2px)}
        .fb-stack-tier-label{font-family:var(--brand-font-mono);font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--brand-ink);opacity:.5;margin:0 0 8px}
        .fb-stack-tier-discount{font-family:var(--brand-font-display);font-size:38px;font-weight:400;font-style:italic;color:var(--brand-ink);line-height:1;margin:0 0 2px}
        .fb-stack-tier-price{font-family:var(--brand-font-mono);font-size:13px;font-weight:700;color:var(--brand-ink);opacity:.45;margin:0 0 10px}
        .fb-stack-tier-bar-bg{height:4px;background:rgba(var(--brand-ink-rgb),0.08);border-radius:2px;margin:0 0 10px}
        .fb-stack-tier-bar-fill{height:100%;border-radius:2px}
        .fb-stack-tier-desc{font-family:var(--brand-font-body);font-size:12px;color:var(--brand-ink);opacity:.5;margin:0}
        .fb-stack-tier-badge{position:absolute;top:12px;right:12px;background:var(--brand-accent);color:var(--brand-ink);font-family:var(--brand-font-mono);font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 8px;border-radius:20px}
        .fb-stack-note{text-align:center;margin:24px 0 0;font-family:var(--brand-font-body);font-size:12px;color:var(--brand-ink);opacity:.4}
        .fb-stack-note a{color:var(--brand-ink);opacity:1;font-weight:600}

        .fb-preorder{background:var(--brand-ink);padding:72px 24px;text-align:center}
        .fb-preorder h2{font-family:var(--brand-font-display);font-size:clamp(36px,5vw,52px);font-weight:400;font-style:italic;color:var(--brand-canvas);margin:0 0 8px}
        .fb-preorder-sub{font-family:var(--brand-font-body);font-size:14px;color:rgba(var(--brand-canvas-rgb),0.5);margin:0 0 32px}
        .fb-preorder-pct{font-family:var(--brand-font-display);font-size:clamp(72px,12vw,104px);font-weight:400;font-style:italic;color:var(--brand-accent);line-height:1;margin-bottom:4px;letter-spacing:-.01em}
        .fb-preorder-pct-sub{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--brand-canvas-rgb),0.35);margin:0 0 20px}
        .fb-preorder-price{display:inline-flex;align-items:baseline;gap:10px;margin-bottom:32px}
        .fb-preorder-price-new{font-family:var(--brand-font-mono);font-size:20px;font-weight:700;color:rgba(var(--brand-canvas-rgb),0.5);line-height:1}
        .fb-preorder-price-old{font-family:var(--brand-font-mono);font-size:18px;color:rgba(var(--brand-canvas-rgb),0.2);text-decoration:line-through;line-height:1}
        .fb-preorder-btn{display:inline-block;padding:18px 56px;border-radius:8px;border:none;background:var(--brand-accent);color:var(--brand-ink);font-family:var(--brand-font-mono);font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:transform .15s;text-decoration:none}
        .fb-preorder-btn:hover{transform:scale(1.03)}
        .fb-preorder-trust{font-family:var(--brand-font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(var(--brand-canvas-rgb),0.25);margin-top:16px}

        .fb-faq{background:var(--brand-canvas);padding:60px 5%}
        .fb-faq-title{font-family:var(--brand-font-display);font-size:32px;font-weight:400;font-style:italic;color:var(--brand-ink);text-align:center;margin:0 0 32px}
        .fb-faq-list{max-width:700px;margin:0 auto}
        .fb-faq-item{border-top:1px solid rgba(var(--brand-ink-rgb),0.08)}
        .fb-faq-q{width:100%;background:none;border:none;padding:20px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:var(--brand-font-body);font-size:15px;font-weight:600;color:var(--brand-ink)}
        .fb-faq-q span{font-size:20px;transition:transform .2s;flex-shrink:0;margin-left:16px}
        .fb-faq-a{font-family:var(--brand-font-body);font-size:14px;color:var(--brand-ink);opacity:.6;line-height:1.7;padding:0 0 20px;margin:0}

        .fb-footer{background:var(--brand-flavor-functional);padding:40px 5%;text-align:center}
        .fb-footer-social{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .fb-footer-social a{font-family:var(--brand-font-mono);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--brand-ink);opacity:.5;text-decoration:none}
        .fb-footer-social a:hover{opacity:1}
        .fb-footer-links{display:flex;justify-content:center;gap:16px;margin-bottom:12px}
        .fb-footer-links a{font-family:var(--brand-font-body);font-size:11px;color:var(--brand-ink);opacity:.4;text-decoration:none}
        .fb-footer-copy{font-family:var(--brand-font-mono);font-size:10px;color:var(--brand-ink);opacity:.25;margin:0}

        @media(max-width:600px){
          .fb-hero-price{flex-direction:column;align-items:center;gap:4px}
          .fb-preorder-price{flex-direction:column;align-items:center;gap:4px}
        }
      `}</style>

      {/* TICKER */}
      <div className="fb-ticker">
        <div className="fb-ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span className="fb-ticker-item" key={i} dangerouslySetInnerHTML={{ __html: t.replace("✦", '<em>✦</em>') }} />
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav className="fb-nav" aria-label="Main navigation">
        <a href="/" className="fb-nav-logo">
          <Image src="/logo-mark.png" alt="shroomé logo mark" width={32} height={32} priority />
          <span>shroomé</span>
        </a>
        <div className="fb-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
          <a href="/recipes">Recipes</a>
        </div>
        <button className="fb-nav-cta" onClick={handlePreOrder}>Pre-Order &rarr;</button>
        <MobileNav
          prefix="fb"
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

      {/* HERO */}
      <section className="fb-hero">
        <div className="fb-hero-overlay" />
        <div className="fb-hero-content">
          <div className="fb-hero-tag">
            <div className="fb-hero-dot" />
            <span>First Pour Pre-Order</span>
          </div>
          <h1>Pour first.<br />Pay less.</h1>
          <p className="fb-hero-sub">Pre-order shroomé at 30% off.<br />Ships June 15, 2026 — launch day.</p>
          <div className="fb-hero-pct">30% off</div>
          <div className="fb-hero-pct-sub">First Pour Pre-Order Price</div>
          <div className="fb-hero-price">
            <span className="fb-hero-price-new">$25.20</span>
            <span className="fb-hero-price-old">$36</span>
            <span className="fb-hero-price-label">/ box of 12</span>
          </div>
          <br />
          <button className="fb-hero-cta" onClick={handlePreOrder}>Pre-Order Now &rarr;</button>
          <p className="fb-hero-trust">Secure checkout · Full refund if we don&apos;t ship · No subscriptions</p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <div className="fb-countdown">
        <p className="fb-countdown-label">Pre-order closes at launch</p>
        <div className="fb-countdown-units">
          <div className="fb-countdown-unit">
            <span className="fb-countdown-num">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="fb-countdown-unit-label">Days</span>
          </div>
          <span className="fb-countdown-sep">:</span>
          <div className="fb-countdown-unit">
            <span className="fb-countdown-num">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="fb-countdown-unit-label">Hours</span>
          </div>
          <span className="fb-countdown-sep">:</span>
          <div className="fb-countdown-unit">
            <span className="fb-countdown-num">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="fb-countdown-unit-label">Min</span>
          </div>
          <span className="fb-countdown-sep">:</span>
          <div className="fb-countdown-unit">
            <span className="fb-countdown-num">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="fb-countdown-unit-label">Sec</span>
          </div>
        </div>
        <p className="fb-countdown-sub">Launch: June 15, 2026 · After this, pre-order pricing is gone forever.</p>
      </div>

      {/* BENEFITS */}
      <section className="fb-benefits">
        <h2 className="sr-only" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>What you get</h2>
        <div className="fb-benefits-grid">
          {benefits.map((b) => (
            <div className="fb-benefit" key={b.num}>
              <div className="fb-benefit-num" style={{ background: b.color, color: "var(--brand-ink)" }}>{b.num}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="fb-testimonials">
        <h2 className="fb-testimonials-heading">What beta testers are saying.</h2>
        <div className="fb-testimonials-grid">
          {[
            {
              stars: "★★★★★",
              body: "I've tried every matcha brand on the market. This is the only one that actually tastes like what I get at a specialty café — and it took me 15 seconds. I'm genuinely shocked.",
              author: "Jess M. — Beta Tester, LA",
            },
            {
              stars: "★★★★★",
              body: "The lion's mane hit is real. I noticed sharper focus within a week of switching from coffee. And the fact that it's ready-to-pour? I will never go back to powder.",
              author: "Marcus T. — Beta Tester, NYC",
            },
            {
              stars: "★★★★★",
              body: "My morning routine used to take 20 minutes just to make a decent matcha. Now it's a tear and pour. The strawberry flavor is unreal — tastes like a $9 café drink.",
              author: "Priya K. — Beta Tester, Chicago",
            },
          ].map((t, i) => (
            <div className="fb-testimonial" key={i}>
              <div className="fb-testimonial-stars">{t.stars}</div>
              <p className="fb-testimonial-body">&ldquo;{t.body}&rdquo;</p>
              <div className="fb-testimonial-author">{t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REFERRAL CREDIT LADDER */}
      <section className="fb-stack">
        <h2 className="fb-stack-heading">Earn credit for sharing.</h2>
        <p className="fb-stack-sub">Refer friends after checkout — fixed credits at 1, 3, and 5 referrals, applied to future drops. Your First Pour price stays locked.</p>
        <div className="fb-stack-tiers">
          {creditTiers.map((tier) => (
            <div className={`fb-stack-tier${tier.highlight ? " highlight" : ""}`} key={tier.label}>
              {tier.highlight && <span className="fb-stack-tier-badge">The Cap</span>}
              <div className="fb-stack-tier-label">{tier.label}</div>
              <div className="fb-stack-tier-discount">{tier.reward}</div>
              <div className="fb-stack-tier-price">{tier.unit}</div>
              <div className="fb-stack-tier-bar-bg">
                <div className="fb-stack-tier-bar-fill" style={{ width: `${(tier.amt / 15) * 100}%`, background: tier.color }} />
              </div>
              <p className="fb-stack-tier-desc">{tier.desc}</p>
            </div>
          ))}
        </div>
        <p className="fb-stack-note">
          Already shared your link? Anything you earned under the old ladder is honored.
          You&apos;ll get your referral link after checkout. <a href="/refer">Learn how referrals work →</a>
        </p>
      </section>

      {/* PRE-ORDER CTA */}
      <section className="fb-preorder" id="preorder">
        <h2>Ready to pour first?</h2>
        <p className="fb-preorder-sub">Lock your price before June 15. This offer disappears at launch.</p>
        <div className="fb-preorder-pct">30% off</div>
        <div className="fb-preorder-pct-sub">First Pour Pre-Order Price</div>
        <div className="fb-preorder-price">
          <span className="fb-preorder-price-new">$25.20</span>
          <span className="fb-preorder-price-old">$36</span>
        </div>
        <br />
        <button className="fb-preorder-btn" onClick={handlePreOrder}>Pre-Order Now &rarr;</button>
        <p className="fb-preorder-trust">Secure checkout · Full refund if we don&apos;t ship · No subscriptions</p>
      </section>

      {/* FAQ */}
      <section className="fb-faq">
        <h2 className="fb-faq-title">Questions</h2>
        <div className="fb-faq-list">
          {faqs.map((f, i) => (
            <div className="fb-faq-item" key={i}>
              <button className="fb-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && <p className="fb-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fb-footer">
        <div className="fb-footer-social">
          <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="fb-footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="mailto:hello@drinkshroome.com">hello@drinkshroome.com</a>
        </div>
        <p className="fb-footer-copy">© 2026 shroomé. All rights reserved.</p>
      </footer>
    </>
  );
}
