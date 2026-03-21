"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const tickerItems = [
  "Limited to 500 · Founders Batch",
  "✦ 30% Off · Free Shipping · Early Access",
  "✦ Your Name on the Founders Wall",
  "✦ Numbered Boxes · First Come First Served",
];

const benefits = [
  {
    num: "01",
    title: "Numbered Box",
    desc: "Each Founders Batch box is individually numbered (#1–#500). Your number. Your box. Collectors only.",
    color: "#C8FF3A",
  },
  {
    num: "02",
    title: "30% Off Launch Price",
    desc: "Stackable with referral discounts. The deepest discount we'll ever offer — Founders Batch exclusive.",
    color: "#FFB7D1",
  },
  {
    num: "03",
    title: "Free Shipping Forever",
    desc: "Your first 3 orders ship free. No minimums. No codes. Just pour.",
    color: "#D4B8E0",
  },
  {
    num: "04",
    title: "Founders Wall",
    desc: "Your name permanently displayed on the shroomé Founders Wall on our website. You built this.",
    color: "#C8FF3A",
  },
  {
    num: "05",
    title: "2 Weeks Early Access",
    desc: "Your box ships 2 full weeks before public launch. You pour first.",
    color: "#FFB7D1",
  },
];

const faqs = [
  {
    q: "What's a Founders Batch?",
    a: "The Founders Batch is the first 500 boxes of shroomé ever produced. Each box is individually numbered and ships to the earliest supporters — the people who believed before anyone else. It's our way of saying: you were here first.",
  },
  {
    q: "When does it ship?",
    a: "Founders Batch boxes ship 2 weeks before public launch. We'll email you the exact date as soon as production is finalized. You'll be the first to pour.",
  },
  {
    q: "Can I stack my referral discount?",
    a: "Yes. Your 30% Founders Batch discount stacks with referral bonuses. If you referred 3 friends, you could be looking at up to 40% off your first order.",
  },
  {
    q: "What if I'm already on the waitlist?",
    a: "You're automatically in line. Your position on the waitlist determines your Founders Batch number. The earlier you signed up, the lower your number. #001 goes to whoever signed up first.",
  },
];

export default function Founders() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: "founders-page" }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        window.gtag?.("event", "sign_up", {
          method: "waitlist",
          event_category: "engagement",
          event_label: "founders_batch",
        });
        window.gtag?.("event", "generate_lead", {
          currency: "USD",
          value: 10.0,
        });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
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
        .fb-nav-logo img{width:28px;height:28px}
        .fb-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .fb-nav-links{display:flex;gap:8px}
        .fb-nav-links a{background:none;border:none;cursor:pointer;font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#1B1F3B;opacity:.7;text-decoration:none;padding:6px 10px;border-radius:6px;transition:opacity .2s}
        .fb-nav-links a:hover{opacity:1}
        .fb-nav-cta{font-family:'DM Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:#1B1F3B;color:#C8FF3A;border:none;padding:10px 22px;border-radius:6px;cursor:pointer;text-decoration:none;transition:transform .15s}
        .fb-nav-cta:hover{transform:scale(1.03)}

        .fb-hero{position:relative;background:url('/email-clouds-bg.jpg') center/cover no-repeat #FFB7D1;min-height:420px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .fb-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,183,209,0.7) 0%,rgba(212,184,224,0.6) 50%,rgba(253,244,238,0.8) 100%)}
        .fb-hero-content{position:relative;z-index:2;padding:60px 24px 48px}
        .fb-hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(27,31,59,0.08);border-radius:20px;padding:6px 16px;margin-bottom:20px}
        .fb-hero-dot{width:8px;height:8px;border-radius:50%;background:#C8FF3A;box-shadow:0 0 8px rgba(200,255,58,0.5)}
        .fb-hero-tag span{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:#1B1F3B}
        .fb-hero h1{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(48px,8vw,72px);font-weight:400;font-style:italic;color:#1B1F3B;line-height:1.05;margin:0 0 16px}
        .fb-hero p{font-family:'Syne',system-ui,sans-serif;font-size:16px;color:#1B1F3B;opacity:.7;margin:0;line-height:1.6}

        .fb-counter{background:#FDF4EE;padding:48px 24px;text-align:center}
        .fb-counter-num{font-family:'DM Mono',monospace;font-size:clamp(48px,10vw,80px);font-weight:700;color:#1B1F3B;line-height:1}
        .fb-counter-label{font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#1B1F3B;opacity:.4;margin-top:8px}
        .fb-counter-bar{width:80%;max-width:400px;height:6px;background:rgba(27,31,59,0.08);border-radius:3px;margin:20px auto 0;overflow:hidden}
        .fb-counter-fill{height:100%;background:linear-gradient(90deg,#C8FF3A,#FFB7D1);border-radius:3px;width:25.4%}

        .fb-benefits{background:#FDF4EE;padding:0 5% 60px}
        .fb-benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;max-width:900px;margin:0 auto}
        .fb-benefit{background:#fff;border-radius:12px;padding:28px 24px;border:1px solid rgba(27,31,59,0.06)}
        .fb-benefit-num{font-family:'DM Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.15em;display:inline-block;padding:4px 10px;border-radius:12px;margin-bottom:12px}
        .fb-benefit h3{font-family:'Instrument Serif',Georgia,serif;font-size:24px;font-weight:400;font-style:italic;color:#1B1F3B;margin:0 0 8px}
        .fb-benefit p{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:#1B1F3B;opacity:.6;margin:0;line-height:1.6}

        .fb-signup{background:#1B1F3B;padding:60px 24px;text-align:center}
        .fb-signup h2{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(32px,5vw,44px);font-weight:400;font-style:italic;color:#FDF4EE;margin:0 0 8px}
        .fb-signup p{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(253,244,238,0.5);margin:0 0 28px}
        .fb-signup-form{display:flex;gap:8px;max-width:440px;margin:0 auto}
        .fb-signup-input{flex:1;padding:14px 18px;border-radius:8px;border:1px solid rgba(253,244,238,0.15);background:rgba(253,244,238,0.06);color:#FDF4EE;font-family:'Syne',system-ui,sans-serif;font-size:14px;outline:none}
        .fb-signup-input::placeholder{color:rgba(253,244,238,0.3)}
        .fb-signup-input:focus{border-color:#C8FF3A}
        .fb-signup-btn{padding:14px 28px;border-radius:8px;border:none;background:#C8FF3A;color:#1B1F3B;font-family:'DM Mono',monospace;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:transform .15s}
        .fb-signup-btn:hover{transform:scale(1.03)}
        .fb-signup-btn:disabled{opacity:.5;cursor:not-allowed}
        .fb-signup-success{font-family:'Syne',system-ui,sans-serif;font-size:16px;color:#C8FF3A;margin:0}
        .fb-signup-error{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:#ff6b6b;margin:8px 0 0}

        .fb-faq{background:#FDF4EE;padding:60px 5%}
        .fb-faq-title{font-family:'Instrument Serif',Georgia,serif;font-size:32px;font-weight:400;font-style:italic;color:#1B1F3B;text-align:center;margin:0 0 32px}
        .fb-faq-list{max-width:700px;margin:0 auto}
        .fb-faq-item{border-top:1px solid rgba(27,31,59,0.08);padding:0}
        .fb-faq-q{width:100%;background:none;border:none;padding:20px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:'Syne',system-ui,sans-serif;font-size:15px;font-weight:600;color:#1B1F3B}
        .fb-faq-q span{font-size:20px;transition:transform .2s}
        .fb-faq-a{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:#1B1F3B;opacity:.6;line-height:1.7;padding:0 0 20px;margin:0}

        .fb-cta{background:#1B1F3B;padding:48px 24px;text-align:center}
        .fb-cta h2{font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:400;font-style:italic;color:#FDF4EE;margin:0 0 16px}
        .fb-cta a{display:inline-block;padding:14px 40px;border-radius:8px;background:#C8FF3A;color:#1B1F3B;font-family:'DM Mono',monospace;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:transform .15s}
        .fb-cta a:hover{transform:scale(1.03)}

        .fb-footer{background:#D4B8E0;padding:40px 5%;text-align:center}
        .fb-footer-social{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .fb-footer-social a{font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1B1F3B;opacity:.5;text-decoration:none}
        .fb-footer-social a:hover{opacity:1}
        .fb-footer-links{display:flex;justify-content:center;gap:16px;margin-bottom:12px}
        .fb-footer-links a{font-family:'Syne',system-ui,sans-serif;font-size:11px;color:#1B1F3B;opacity:.4;text-decoration:none}
        .fb-footer-copy{font-family:'DM Mono',monospace;font-size:10px;color:#1B1F3B;opacity:.25;margin:0}

        @media(max-width:768px){
          .fb-nav-links{display:none}
          .fb-signup-form{flex-direction:column}
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
      <nav className="fb-nav">
        <a href="/" className="fb-nav-logo">
          <img src="/logo-mark.png" alt="shroomé S" />
          <span>shroomé</span>
        </a>
        <div className="fb-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
        </div>
        <a href="#signup" className="fb-nav-cta">Claim Your Box →</a>
      </nav>

      {/* HERO */}
      <section className="fb-hero">
        <div className="fb-hero-overlay" />
        <div className="fb-hero-content">
          <div className="fb-hero-tag">
            <div className="fb-hero-dot" />
            <span>Limited to 500</span>
          </div>
          <h1>Founders Batch.</h1>
          <p>The first 500 boxes. Numbered. Yours.</p>
        </div>
      </section>

      {/* COUNTER */}
      <div className="fb-counter">
        <div className="fb-counter-num">127<span style={{ fontSize: "0.4em", opacity: 0.3 }}> / 500</span></div>
        <div className="fb-counter-label">Claimed</div>
        <div className="fb-counter-bar"><div className="fb-counter-fill" /></div>
      </div>

      {/* BENEFITS */}
      <section className="fb-benefits">
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

      {/* SIGNUP */}
      <section className="fb-signup" id="signup">
        <h2>Claim your number.</h2>
        <p>Join the Founders Batch — first 500 only.</p>
        {done ? (
          <p className="fb-signup-success">You&apos;re in. Your number is locked. Check your email.</p>
        ) : (
          <form className="fb-signup-form" onSubmit={handleSubmit}>
            <input
              className="fb-signup-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="fb-signup-btn" type="submit" disabled={loading}>
              {loading ? "Claiming..." : "Claim My Box →"}
            </button>
          </form>
        )}
        {error && <p className="fb-signup-error">{error}</p>}
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

      {/* CTA */}
      <section className="fb-cta">
        <h2>Don&apos;t miss your number.</h2>
        <a href="#signup">Claim Founders Batch →</a>
      </section>

      {/* FOOTER */}
      <footer className="fb-footer">
        <div className="fb-footer-social">
          <a href="https://tiktok.com/@drinkshroome">TikTok</a>
          <a href="https://instagram.com/drinkshroome">Instagram</a>
          <a href="https://youtube.com/@drinkshroome">YouTube</a>
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
