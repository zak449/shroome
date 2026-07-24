import { BRAND, svgHex } from "@/app/lib/brand";
import type { Metadata } from "next";
import Image from "next/image";
import MobileNav from "../MobileNav";

export const metadata: Metadata = {
  title: "Terms of Service — shroomé",
  description:
    "Terms of Service for drinkshroome.com, operated by ZSQUARED INC. Read our terms before using the site.",
  openGraph: {
    title: "Terms of Service — shroomé",
    description:
      "Terms of Service for drinkshroome.com, operated by ZSQUARED INC. Read our terms before using the site.",
    type: "website",
    url: "https://www.drinkshroome.com/terms",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — shroomé",
    description:
      "Terms of Service for drinkshroome.com, operated by ZSQUARED INC. Read our terms before using the site.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/terms",
  },
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

export default function Terms() {
  return (
    <>
      <style>{`
        /* ── PAGE WRAPPER (retro 90s background) ── */
        .tos-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(var(--brand-flavor-functional-rgb),0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(var(--brand-accent-rgb),0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(227,213,247,0.5) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          position:relative
        }
        .tos-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${svgHex(BRAND.colors.ink)}' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── TICKER ─── */
        .tos-ticker{background:var(--brand-ink);padding:10px 0;overflow:hidden;white-space:nowrap}
        .tos-ticker-track{display:flex;justify-content:center;flex-wrap:wrap;row-gap:6px}
        .tos-ticker-item{font-family:var(--brand-font-mono);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(var(--brand-canvas-rgb),.75)}
        .tos-ticker-item em{color:var(--brand-tint-soft);font-style:normal;font-weight:500}
        @media(max-width:480px){.tos-ticker{white-space:normal}.tos-ticker-item{padding:0 10px;letter-spacing:.08em;font-size:9px;white-space:normal;text-align:center}}
        @keyframes tosTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ─── */
        .tos-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(var(--brand-canvas-rgb),0.88);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(var(--brand-ink-rgb),0.06)
        }
        .tos-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:var(--brand-ink)
        }
        .tos-nav-logo img{width:32px;height:32px;border-radius:6px}
        .tos-nav-logo span{font-family:var(--brand-font-display);font-size:22px;font-weight:700;font-style:normal;color:var(--brand-ink)}
        .tos-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.tos-nav-links{display:none !important}.tos-nav-cta{display:none !important}}
        .tos-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:var(--brand-font-body);font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:var(--brand-ink);
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .tos-nav-links a:hover{color:var(--brand-accent-deep)}
        .tos-nav-cta{
          background:var(--brand-ink);color:var(--brand-canvas);border:none;
          padding:10px 20px;font-family:var(--brand-font-body);
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .tos-nav-cta:hover{background:#3c452a}

        /* ── HERO ─── */
        .tos-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .tos-hero-bg{position:absolute;inset:0;background:url('/email-clouds-bg.jpg') center bottom/cover no-repeat;opacity:.45}
        .tos-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(227,213,247,0.8) 0%,rgba(227,213,247,0.5) 40%,rgba(var(--brand-canvas-rgb),0.6) 100%)}
        .tos-blob{position:absolute;border-radius:50%;pointer-events:none;background:var(--brand-flavor-functional);opacity:.4}
        .tos-blob-a{width:340px;height:340px;top:-80px;right:10%}
        .tos-blob-b{width:200px;height:200px;bottom:-60px;left:5%;background:var(--brand-canvas);opacity:.3}
        .tos-hero-inner{position:relative;z-index:2;max-width:640px}
        .tos-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:var(--brand-ink);margin-bottom:24px;
          opacity:0;animation:tosFadeUp .7s .1s forwards
        }
        .tos-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--brand-accent);flex-shrink:0}
        .tos-hero h1{
          font-family:var(--brand-font-display);
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:var(--brand-accent-deep);margin-bottom:18px;opacity:0;animation:tosFadeUp .8s .2s forwards
        }
        .tos-hero h1 em{font-style:normal;color:var(--brand-accent-deep)}
        .tos-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(var(--brand-ink-rgb),0.7);max-width:480px;font-weight:400;
          opacity:0;animation:tosFadeUp .8s .35s forwards
        }
        .tos-hero-sub strong{color:var(--brand-ink);font-weight:700}
        @keyframes tosFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── PILL ROW ─── */
        .tos-pill-row{display:flex;gap:0;overflow:hidden;white-space:nowrap;background:var(--brand-flavor-functional);padding:12px 0}
        .tos-pill-track{display:flex;justify-content:center;flex-wrap:wrap;row-gap:6px}
        .tos-pill-item{
          font-family:var(--brand-font-body);font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;color:var(--brand-ink);padding:0 28px
        }
        .tos-pill-sep{opacity:.3}

        /* ── CONTENT BODY ─── */
        .tos-body{max-width:820px;margin:0 auto;padding:64px 6% 80px}
        .tos-updated{font-family:var(--brand-font-mono);font-size:11px;color:rgba(var(--brand-ink-rgb),0.4);letter-spacing:.06em;margin-bottom:32px}
        .tos-body p{font-family:var(--brand-font-body);font-size:14px;color:rgba(var(--brand-ink-rgb),0.7);line-height:1.8;margin-bottom:16px;font-weight:400;max-width:680px}
        .tos-body p strong{color:var(--brand-ink);font-weight:600}
        .tos-body h2{
          font-family:var(--brand-font-display);
          font-size:clamp(22px,3vw,30px);font-weight:700;font-style:normal;
          color:var(--brand-ink);letter-spacing:-.01em;margin:48px 0 16px;padding-top:8px;
          border-top:1px solid rgba(var(--brand-ink-rgb),0.1)
        }
        .tos-body h2:first-of-type{margin-top:32px}
        .tos-body ul{font-family:var(--brand-font-body);font-size:14px;color:rgba(var(--brand-ink-rgb),0.7);line-height:1.8;margin-bottom:16px;padding-left:24px;max-width:680px}
        .tos-body ul li{margin-bottom:8px}
        .tos-body ul li strong{color:var(--brand-ink);font-weight:600}

        /* ── CTA SECTION ─── */
        .tos-cta{background:var(--brand-ink);padding:64px 7%;text-align:center;position:relative;overflow:hidden}
        .tos-cta-tag{font-family:var(--brand-font-mono);font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--brand-accent);margin-bottom:16px}
        .tos-cta h2{
          font-family:var(--brand-font-display);
          font-size:clamp(30px,4vw,48px);font-weight:700;font-style:normal;
          color:var(--brand-canvas);line-height:1.05;margin-bottom:12px
        }
        .tos-cta h2 em{font-style:normal;color:var(--brand-accent-deep)}
        .tos-cta-sub{font-size:14px;color:rgba(var(--brand-canvas-rgb),.5);margin-bottom:28px;font-weight:400}
        .tos-btn-cta{
          display:inline-block;background:var(--brand-accent);color:var(--brand-canvas);border:none;
          padding:14px 36px;font-family:var(--brand-font-body);
          font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          cursor:pointer;transition:background .2s,transform .2s;text-decoration:none
        }
        .tos-btn-cta:hover{background:#ff8fd4;transform:translateY(-2px)}

        /* ── FOOTER ─── */
        .tos-footer{background:var(--brand-flavor-functional);padding:32px 6%;text-align:center;border-top:1px solid rgba(var(--brand-ink-rgb),0.06)}
        .tos-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .tos-footer-top a{
          font-family:var(--brand-font-mono);font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:var(--brand-ink);text-decoration:none;transition:color .2s
        }
        .tos-footer-top a:hover{color:var(--brand-accent-deep)}
        .tos-footer-mid{font-size:12px;color:rgba(var(--brand-ink-rgb),0.45);margin-bottom:8px}
        .tos-footer-mid a{color:rgba(var(--brand-ink-rgb),0.45);text-decoration:underline;transition:color .2s}
        .tos-footer-mid a:hover{color:var(--brand-ink)}
        .tos-footer-bot{font-family:var(--brand-font-mono);font-size:10px;color:rgba(var(--brand-ink-rgb),0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ─── */
        @media(max-width:640px){
          .tos-nav{padding:0 4%;height:54px;gap:8px}
          /* tos-nav-links hidden via main style block above */
          .tos-nav-logo{gap:6px}
          .tos-nav-logo span{font-size:18px}
          .tos-nav-logo img{width:30px;height:30px}
          .tos-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .tos-hero{padding:48px 5% 44px}
          .tos-hero h1{font-size:clamp(32px,9vw,46px)}
          .tos-hero-sub{font-size:14px}
          .tos-hero-tag{font-size:10px;letter-spacing:.12em}
          .tos-blob-a{width:200px;height:200px;top:-40px;right:5%}
          .tos-blob-b{width:120px;height:120px}
          .tos-body{padding:40px 5% 56px}
          .tos-body h2{font-size:clamp(20px,6vw,26px)}
          .tos-cta{padding:44px 5%}
          .tos-cta h2{font-size:clamp(26px,7vw,38px)}
          .tos-btn-cta{padding:12px 28px;font-size:11px}
          .tos-footer-top{gap:16px;flex-wrap:wrap;justify-content:center}
          .tos-pill-item{font-size:10px;padding:0 20px}
        }
      `}</style>

      {/* ═══ TICKER ═══ */}
      <div className="tos-page">
      <div className="tos-ticker">
        <div className="tos-ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="tos-ticker-item" dangerouslySetInnerHTML={{
              __html: t.replace(/✦/g, '<em>✦</em>')
            }} />
          ))}
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="tos-nav" aria-label="Main navigation">
        <a href="/" className="tos-nav-logo">
          <Image src="/brand/symbol-sheep-solid.png" width={32} height={32} alt="shroomé S" style={{ borderRadius: 6 }} priority />
          <img src="/brand/wordmark.png" alt="shroomé" style={{ height: 22, width: "auto" }} />
        </a>
        <div className="tos-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
          <a href="/recipes">Recipes</a>
          <a href="/drop">Shop</a>
        </div>
        <a href="/" className="tos-nav-cta">Join the Flock &rarr;</a>
        <MobileNav
          prefix="tos"
          links={[
            { label: "Why shroom\u00e9", href: "/#why" },
            { label: "Ingredients", href: "/#ingredients" },
            { label: "How It Works", href: "/#how" },
            { label: "FAQ", href: "/faq" },
            { label: "Blog", href: "/blog" },
            { label: "Recipes", href: "/recipes" },
            { label: "Shop", href: "/drop" },
          ]}
        />
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="tos-hero">
        <div className="tos-hero-bg" />
        <div className="tos-hero-overlay" />
        <div className="tos-blob tos-blob-a" />
        <div className="tos-blob tos-blob-b" />
        <div className="tos-hero-inner">
          <div className="tos-hero-tag">Legal</div>
          <h1>Terms of <em>Service.</em></h1>
          <p className="tos-hero-sub">
            By using <strong>drinkshroome.com</strong>, you agree to these terms. Please read them carefully.
          </p>
        </div>
      </section>

      {/* ═══ PILL TICKER ═══ */}
      <div className="tos-pill-row">
        <div className="tos-pill-track">
          {pills.map((p, i) => (
            <span key={i} className="tos-pill-item">
              {p} <span className="tos-pill-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ CONTENT BODY ═══ */}
      <div className="tos-body">
        <p className="tos-updated">Last updated: March 18, 2026</p>

        <p>
          Welcome to drinkshroome.com, operated by ZSQUARED INC (&quot;shroomé,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website, you agree to be bound by these Terms of Service.
        </p>

        <h2>Use of Website</h2>
        <p>
          Our website sells shroomé in numbered, limited drops and collects signups for our membership list (&quot;the Flock&quot;), which receives early drop access and member offers. By using this website, you agree to provide accurate information and to use the site only for lawful purposes.
        </p>

        <h2>The Flock &amp; Promotions</h2>
        <ul>
          <li>Joining the Flock does not guarantee product availability or pricing</li>
          <li>Promotional codes, credits, and member perks are subject to terms stated at the time of each drop</li>
          <li>Discount codes are non-transferable and may have expiration dates</li>
          <li>We reserve the right to modify or cancel promotions at any time</li>
          <li>Discount codes do not stack &mdash; the best single code wins</li>
        </ul>

        <h2>SMS Terms</h2>
        <p>
          By opting in to receive text messages from shroomé, you agree to the following:
        </p>
        <ul>
          <li>You consent to receive recurring automated marketing text messages at the phone number provided</li>
          <li>Consent is not a condition of any purchase</li>
          <li>Message frequency varies; message and data rates may apply</li>
          <li>You can opt out at any time by replying <strong>STOP</strong></li>
          <li>For help, reply <strong>HELP</strong> or contact hello@drinkshroome.com</li>
          <li>Compatible carriers include but are not limited to AT&T, T-Mobile, Verizon, and Sprint</li>
          <li>shroomé and its service providers (including Klaviyo) may have access to your phone number for the purpose of sending messages</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website — including text, graphics, logos, images, and software — is the property of ZSQUARED INC and is protected by United States and international intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
        </p>

        <h2>Product Information</h2>
        <p>
          Product descriptions, ingredient information, and health-related statements on this website are for informational purposes only. These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any new supplement.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          This website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ZSQUARED INC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or services.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website constitutes acceptance of the revised terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about these Terms? Contact us at:<br />
          <strong>ZSQUARED INC</strong><br />
          Email: hello@drinkshroome.com
        </p>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="tos-cta">
        <div className="tos-cta-tag">The Flock</div>
        <h2>
          Be first.
          <br />
          <em>Join the Flock.</em>
        </h2>
        <p className="tos-cta-sub">12 servings per box · Pour. Swirl. Go.</p>
        <a href="/" className="tos-btn-cta">
          Join the Flock →
        </a>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="tos-footer">
        <div className="tos-footer-top">
          <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="tos-footer-mid">
          © 2026 shroomé · hello@drinkshroome.com ·{" "}
          <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a>
        </div>
        <div className="tos-footer-bot">@drinkshroome</div>
      </footer>
      </div>
    </>
  );
}
