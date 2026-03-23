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
  "✦ Ships June 1 · 2 Weeks Early",
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
    color: "#C8FF3A",
  },
  {
    num: "02",
    title: "Ships June 1",
    desc: "Your box ships 2 full weeks before public launch on June 15. You pour first.",
    color: "#FFB7D1",
  },
  {
    num: "03",
    title: "Free Shipping",
    desc: "First 3 orders ship free. No minimum. No code. Just pour.",
    color: "#D4B8E0",
  },
  {
    num: "04",
    title: "3 Reorder Codes",
    desc: "You get 3 × 30% off codes to use any time — on your next orders or gift to friends.",
    color: "#C8FF3A",
  },
  {
    num: "05",
    title: "First Pour Status",
    desc: "You believed before anyone else. That means something. First Pour supporters get priority access to every new flavor and limited drop.",
    color: "#FFB7D1",
  },
];

const discountTiers = [
  {
    label: "First Pour",
    discount: "30% off",
    price: "$25.20",
    pct: 30,
    desc: "Base pre-order discount. Just for being here.",
    color: "#C8FF3A",
  },
  {
    label: "+ 1 Referral",
    discount: "33% off",
    price: "$24.12",
    pct: 33,
    desc: "Refer one friend, stack 3% more.",
    color: "#FFB7D1",
  },
  {
    label: "+ 3 Referrals",
    discount: "36% off",
    price: "$23.04",
    pct: 36,
    desc: "Three referrals = VIP tier.",
    color: "#D4B8E0",
  },
  {
    label: "+ 5 Referrals",
    discount: "40% off",
    price: "$21.60",
    pct: 40,
    desc: "Max stack. Our deepest discount ever.",
    color: "#C8FF3A",
    highlight: true,
  },
];

const faqs = [
  {
    q: "What is First Pour?",
    a: "First Pour is shroomé's pre-order for people who want in before the public launch. You pay now at 30% off ($25.20 vs $36), your box ships June 1 — two weeks before anyone else gets theirs. No numbered boxes, no gimmicks. Just the best price we'll ever offer and early access.",
  },
  {
    q: "What are the 3 reorder codes?",
    a: "Every First Pour pre-order includes 3 single-use codes for 30% off future orders. Use them on your next boxes or share them with friends. They don't expire at launch — you can use them any time after your first order ships.",
  },
  {
    q: "When does it ship?",
    a: "First Pour orders ship June 1, 2026 — 2 weeks before the public launch date of June 15. You'll get a tracking email the moment your box leaves the warehouse.",
  },
  {
    q: "Can I stack my referral discount?",
    a: "Yes. Your 30% First Pour discount stacks with referral bonuses. Refer 1 friend for 33% off, 3 friends for 36%, 5 friends for 40% — our deepest discount ever. Share your referral link from the Referral page after checkout.",
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
        .fb-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .fb-ticker-track{display:inline-flex;animation:fbTick 28s linear infinite}
        .fb-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .fb-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes fbTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .fb-nav{position:sticky;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 5%;height:60px;background:rgba(255,183,209,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(27,31,59,0.06)}
        .fb-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1B1F3B}
        .fb-nav-logo img{width:32px;height:32px;border-radius:6px}
        .fb-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .fb-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.fb-nav-links{display:none !important}.fb-nav-cta{display:none !important}}
        .fb-nav-links a{background:none;border:none;cursor:pointer;font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#1B1F3B;opacity:.7;text-decoration:none;padding:6px 10px;border-radius:6px;transition:opacity .2s}
        .fb-nav-links a:hover{opacity:1}
        .fb-nav-cta{font-family:'DM Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:#1B1F3B;color:#C8FF3A;border:none;padding:10px 22px;border-radius:6px;cursor:pointer;text-decoration:none;transition:transform .15s}
        .fb-nav-cta:hover{transform:scale(1.03)}

        .fb-hero{position:relative;background:url('/email-clouds-bg.jpg') center/cover no-repeat #FFB7D1;min-height:480px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .fb-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,183,209,0.7) 0%,rgba(212,184,224,0.6) 50%,rgba(253,244,238,0.8) 100%)}
        .fb-hero-content{position:relative;z-index:2;padding:60px 24px 48px}
        .fb-hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(27,31,59,0.08);border-radius:20px;padding:6px 16px;margin-bottom:20px}
        .fb-hero-dot{width:8px;height:8px;border-radius:50%;background:#C8FF3A;box-shadow:0 0 8px rgba(200,255,58,0.5)}
        .fb-hero-tag span{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:#1B1F3B}
        .fb-hero h1{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(52px,9vw,80px);font-weight:400;font-style:italic;color:#1B1F3B;line-height:1.02;margin:0 0 16px}
        .fb-hero-sub{font-family:'Syne',system-ui,sans-serif;font-size:16px;color:#1B1F3B;opacity:.7;margin:0 0 28px;line-height:1.6}
        .fb-hero-pct{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(72px,12vw,104px);font-weight:400;font-style:italic;color:#1B1F3B;line-height:1;margin:0 0 4px;letter-spacing:-.01em}
        .fb-hero-pct-sub{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1B1F3B;opacity:.45;margin:0 0 20px}
        .fb-hero-price{display:inline-flex;align-items:baseline;gap:8px;margin-bottom:28px}
        .fb-hero-price-new{font-family:'DM Mono',monospace;font-size:18px;font-weight:700;color:#1B1F3B;opacity:.6}
        .fb-hero-price-old{font-family:'DM Mono',monospace;font-size:16px;color:#1B1F3B;opacity:.3;text-decoration:line-through}
        .fb-hero-price-label{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1B1F3B;opacity:.35}
        .fb-hero-cta{display:inline-block;padding:16px 48px;border-radius:8px;background:#1B1F3B;color:#C8FF3A;font-family:'DM Mono',monospace;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;transition:transform .15s;text-decoration:none}
        .fb-hero-cta:hover{transform:scale(1.03)}
        .fb-hero-trust{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#1B1F3B;opacity:.35;margin-top:14px}

        .fb-countdown{background:#1B1F3B;padding:40px 24px;text-align:center}
        .fb-countdown-label{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(253,244,238,0.4);margin:0 0 20px}
        .fb-countdown-units{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap}
        .fb-countdown-unit{display:flex;flex-direction:column;align-items:center;gap:4px}
        .fb-countdown-num{font-family:'DM Mono',monospace;font-size:clamp(36px,8vw,64px);font-weight:700;color:#C8FF3A;line-height:1;min-width:2ch;text-align:center}
        .fb-countdown-unit-label{font-family:'DM Mono',monospace;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgba(253,244,238,0.3)}
        .fb-countdown-sep{font-family:'DM Mono',monospace;font-size:clamp(28px,6vw,48px);font-weight:700;color:rgba(200,255,58,0.3);line-height:1;align-self:flex-start;margin-top:4px}
        .fb-countdown-sub{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:rgba(253,244,238,0.4);margin:16px 0 0}

        .fb-benefits{background:#FDF4EE;padding:60px 5%}
        .fb-benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;max-width:900px;margin:0 auto}
        .fb-benefit{background:#fff;border-radius:12px;padding:28px 24px;border:1px solid rgba(27,31,59,0.06)}
        .fb-benefit-num{font-family:'DM Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.15em;display:inline-block;padding:4px 10px;border-radius:12px;margin-bottom:12px}
        .fb-benefit h3{font-family:'Instrument Serif',Georgia,serif;font-size:24px;font-weight:400;font-style:italic;color:#1B1F3B;margin:0 0 8px}
        .fb-benefit p{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:#1B1F3B;opacity:.6;margin:0;line-height:1.6}

        .fb-testimonials{background:#1B1F3B;padding:60px 5%}
        .fb-testimonials-heading{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(28px,4vw,40px);font-weight:400;font-style:italic;color:#FDF4EE;text-align:center;margin:0 0 40px}
        .fb-testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;max-width:900px;margin:0 auto}
        .fb-testimonial{background:rgba(253,244,238,0.05);border:1px solid rgba(253,244,238,0.08);border-radius:12px;padding:28px 24px}
        .fb-testimonial-stars{color:#C8FF3A;font-size:14px;margin:0 0 12px;letter-spacing:2px}
        .fb-testimonial-body{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(253,244,238,0.75);line-height:1.65;margin:0 0 16px;font-style:italic}
        .fb-testimonial-author{font-family:'DM Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(253,244,238,0.3)}

        .fb-stack{background:#FDF4EE;padding:0 5% 60px}
        .fb-stack-heading{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(28px,4vw,40px);font-weight:400;font-style:italic;color:#1B1F3B;text-align:center;margin:0 0 6px}
        .fb-stack-sub{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:#1B1F3B;opacity:.55;text-align:center;margin:0 0 36px}
        .fb-stack-tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;max-width:860px;margin:0 auto}
        .fb-stack-tier{background:#fff;border-radius:12px;padding:24px 20px;border:2px solid transparent;position:relative;overflow:hidden;transition:transform .2s}
        .fb-stack-tier.highlight{border-color:#C8FF3A;background:#F9FFE8}
        .fb-stack-tier:hover{transform:translateY(-2px)}
        .fb-stack-tier-label{font-family:'DM Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#1B1F3B;opacity:.5;margin:0 0 8px}
        .fb-stack-tier-discount{font-family:'Instrument Serif',Georgia,serif;font-size:38px;font-weight:400;font-style:italic;color:#1B1F3B;line-height:1;margin:0 0 2px}
        .fb-stack-tier-price{font-family:'DM Mono',monospace;font-size:13px;font-weight:700;color:#1B1F3B;opacity:.45;margin:0 0 10px}
        .fb-stack-tier-bar-bg{height:4px;background:rgba(27,31,59,0.08);border-radius:2px;margin:0 0 10px}
        .fb-stack-tier-bar-fill{height:100%;border-radius:2px}
        .fb-stack-tier-desc{font-family:'Syne',system-ui,sans-serif;font-size:12px;color:#1B1F3B;opacity:.5;margin:0}
        .fb-stack-tier-badge{position:absolute;top:12px;right:12px;background:#C8FF3A;color:#1B1F3B;font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 8px;border-radius:20px}
        .fb-stack-note{text-align:center;margin:24px 0 0;font-family:'Syne',system-ui,sans-serif;font-size:12px;color:#1B1F3B;opacity:.4}
        .fb-stack-note a{color:#1B1F3B;opacity:1;font-weight:600}

        .fb-preorder{background:#1B1F3B;padding:72px 24px;text-align:center}
        .fb-preorder h2{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(36px,5vw,52px);font-weight:400;font-style:italic;color:#FDF4EE;margin:0 0 8px}
        .fb-preorder-sub{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(253,244,238,0.5);margin:0 0 32px}
        .fb-preorder-pct{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(72px,12vw,104px);font-weight:400;font-style:italic;color:#C8FF3A;line-height:1;margin-bottom:4px;letter-spacing:-.01em}
        .fb-preorder-pct-sub{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(253,244,238,0.35);margin:0 0 20px}
        .fb-preorder-price{display:inline-flex;align-items:baseline;gap:10px;margin-bottom:32px}
        .fb-preorder-price-new{font-family:'DM Mono',monospace;font-size:20px;font-weight:700;color:rgba(253,244,238,0.5);line-height:1}
        .fb-preorder-price-old{font-family:'DM Mono',monospace;font-size:18px;color:rgba(253,244,238,0.2);text-decoration:line-through;line-height:1}
        .fb-preorder-btn{display:inline-block;padding:18px 56px;border-radius:8px;border:none;background:#C8FF3A;color:#1B1F3B;font-family:'DM Mono',monospace;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:transform .15s;text-decoration:none}
        .fb-preorder-btn:hover{transform:scale(1.03)}
        .fb-preorder-trust{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(253,244,238,0.25);margin-top:16px}

        .fb-faq{background:#FDF4EE;padding:60px 5%}
        .fb-faq-title{font-family:'Instrument Serif',Georgia,serif;font-size:32px;font-weight:400;font-style:italic;color:#1B1F3B;text-align:center;margin:0 0 32px}
        .fb-faq-list{max-width:700px;margin:0 auto}
        .fb-faq-item{border-top:1px solid rgba(27,31,59,0.08)}
        .fb-faq-q{width:100%;background:none;border:none;padding:20px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:'Syne',system-ui,sans-serif;font-size:15px;font-weight:600;color:#1B1F3B}
        .fb-faq-q span{font-size:20px;transition:transform .2s;flex-shrink:0;margin-left:16px}
        .fb-faq-a{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:#1B1F3B;opacity:.6;line-height:1.7;padding:0 0 20px;margin:0}

        .fb-footer{background:#D4B8E0;padding:40px 5%;text-align:center}
        .fb-footer-social{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .fb-footer-social a{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1B1F3B;opacity:.5;text-decoration:none}
        .fb-footer-social a:hover{opacity:1}
        .fb-footer-links{display:flex;justify-content:center;gap:16px;margin-bottom:12px}
        .fb-footer-links a{font-family:'Syne',system-ui,sans-serif;font-size:11px;color:#1B1F3B;opacity:.4;text-decoration:none}
        .fb-footer-copy{font-family:'DM Mono',monospace;font-size:10px;color:#1B1F3B;opacity:.25;margin:0}

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
          <p className="fb-hero-sub">Pre-order shroomé at 30% off and get your box<br />2 weeks before the public launch.</p>
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
              <div className="fb-benefit-num" style={{ background: b.color, color: "#1B1F3B" }}>{b.num}</div>
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

      {/* STACKING DISCOUNT */}
      <section className="fb-stack">
        <h2 className="fb-stack-heading">Stack your discount.</h2>
        <p className="fb-stack-sub">Refer friends after checkout to stack up to 40% off future orders.</p>
        <div className="fb-stack-tiers">
          {discountTiers.map((tier) => (
            <div className={`fb-stack-tier${tier.highlight ? " highlight" : ""}`} key={tier.label}>
              {tier.highlight && <span className="fb-stack-tier-badge">Max Stack</span>}
              <div className="fb-stack-tier-label">{tier.label}</div>
              <div className="fb-stack-tier-discount">{tier.discount}</div>
              <div className="fb-stack-tier-price">{tier.price} / box</div>
              <div className="fb-stack-tier-bar-bg">
                <div className="fb-stack-tier-bar-fill" style={{ width: `${(tier.pct / 40) * 100}%`, background: tier.color }} />
              </div>
              <p className="fb-stack-tier-desc">{tier.desc}</p>
            </div>
          ))}
        </div>
        <p className="fb-stack-note">
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
