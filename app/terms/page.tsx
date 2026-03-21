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

export default function Terms() {
  return (
    <>
      <style>{`
        /* ── TICKER ─── */
        .tos-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .tos-ticker-track{display:inline-flex;animation:tosTick 28s linear infinite}
        .tos-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .tos-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes tosTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ─── */
        .tos-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .tos-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .tos-nav-logo img{width:28px;height:28px;filter:brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)}
        .tos-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .tos-nav-links{display:flex;gap:8px}
        .tos-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .tos-nav-links a:hover{color:#2D4A2D}
        .tos-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .tos-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ─── */
        .tos-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .tos-hero-bg{position:absolute;inset:0;background:url('/email-clouds-bg.jpg') center bottom/cover no-repeat;opacity:.45}
        .tos-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(255,183,209,0.7) 0%,rgba(255,183,209,0.5) 40%,rgba(253,244,238,0.6) 100%)}
        .tos-blob{position:absolute;border-radius:50%;pointer-events:none;background:#D4B8E0;opacity:.4}
        .tos-blob-a{width:340px;height:340px;top:-80px;right:10%}
        .tos-blob-b{width:200px;height:200px;bottom:-60px;left:5%;background:#FDF4EE;opacity:.3}
        .tos-hero-inner{position:relative;z-index:2;max-width:640px}
        .tos-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:#1B1F3B;margin-bottom:24px;
          opacity:0;animation:tosFadeUp .7s .1s forwards
        }
        .tos-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}
        .tos-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:#2D4A2D;margin-bottom:18px;opacity:0;animation:tosFadeUp .8s .2s forwards
        }
        .tos-hero h1 em{font-style:italic;color:#FF7043}
        .tos-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(27,31,59,0.7);max-width:480px;font-weight:400;
          opacity:0;animation:tosFadeUp .8s .35s forwards
        }
        .tos-hero-sub strong{color:#1B1F3B;font-weight:700}
        @keyframes tosFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── PILL ROW ─── */
        .tos-pill-row{display:flex;gap:0;overflow:hidden;white-space:nowrap;background:#D4B8E0;padding:12px 0}
        .tos-pill-track{display:inline-flex;animation:tosTick 22s linear infinite}
        .tos-pill-item{
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;color:#1B1F3B;padding:0 28px
        }
        .tos-pill-sep{opacity:.3}

        /* ── CONTENT BODY ─── */
        .tos-body{max-width:820px;margin:0 auto;padding:64px 6% 80px}
        .tos-updated{font-family:'DM Mono',monospace;font-size:11px;color:rgba(27,31,59,0.4);letter-spacing:.06em;margin-bottom:32px}
        .tos-body p{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(27,31,59,0.7);line-height:1.8;margin-bottom:16px;font-weight:400;max-width:680px}
        .tos-body p strong{color:#1B1F3B;font-weight:600}
        .tos-body h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(22px,3vw,30px);font-weight:400;font-style:italic;
          color:#1B1F3B;letter-spacing:-.01em;margin:48px 0 16px;padding-top:8px;
          border-top:1px solid rgba(27,31,59,0.1)
        }
        .tos-body h2:first-of-type{margin-top:32px}
        .tos-body ul{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(27,31,59,0.7);line-height:1.8;margin-bottom:16px;padding-left:24px;max-width:680px}
        .tos-body ul li{margin-bottom:8px}
        .tos-body ul li strong{color:#1B1F3B;font-weight:600}

        /* ── CTA SECTION ─── */
        .tos-cta{background:#1B1F3B;padding:64px 7%;text-align:center;position:relative;overflow:hidden}
        .tos-cta-tag{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#C8FF3A;margin-bottom:16px}
        .tos-cta h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(30px,4vw,48px);font-weight:400;font-style:italic;
          color:#FDF4EE;line-height:1.05;margin-bottom:12px
        }
        .tos-cta h2 em{font-style:italic;color:#FF7043}
        .tos-cta-sub{font-size:14px;color:rgba(253,244,238,.5);margin-bottom:28px;font-weight:400}
        .tos-btn-cta{
          display:inline-block;background:#C8FF3A;color:#1B1F3B;border:none;
          padding:14px 36px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          cursor:pointer;transition:background .2s,transform .2s;text-decoration:none
        }
        .tos-btn-cta:hover{background:#d4ff5a;transform:translateY(-2px)}

        /* ── FOOTER ─── */
        .tos-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .tos-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .tos-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .tos-footer-top a:hover{color:#2D4A2D}
        .tos-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .tos-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .tos-footer-mid a:hover{color:#1B1F3B}
        .tos-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ─── */
        @media(max-width:640px){
          .tos-nav{padding:0 4%;height:54px;gap:8px}
          .tos-nav-links{display:none}
          .tos-nav-logo{gap:6px}
          .tos-nav-logo span{font-size:18px}
          .tos-nav-logo img{width:24px;height:24px}
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
      <div className="tos-ticker">
        <div className="tos-ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="tos-ticker-item" dangerouslySetInnerHTML={{
              __html: t.replace(/✦/g, '<em>✦</em>')
            }} />
          ))}
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="tos-nav">
        <a href="/" className="tos-nav-logo">
          <img src="/logo-mark.png" width={28} height={28} alt="shroomé S" />
          <span>shroomé</span>
        </a>
        <div className="tos-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
        </div>
        <a href="/" className="tos-nav-cta">Get 20% off + free shipping →</a>
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
          {[...pills, ...pills].map((p, i) => (
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
          Our website is currently in pre-launch mode and is used to collect waitlist signups for our upcoming product launch. By using this website, you agree to provide accurate information and to use the site only for lawful purposes.
        </p>

        <h2>Waitlist &amp; Promotions</h2>
        <ul>
          <li>Joining the waitlist does not guarantee product availability or pricing</li>
          <li>Promotional discount codes (20% off + free shipping) are subject to terms at the time of launch</li>
          <li>Discount codes are non-transferable and may have expiration dates</li>
          <li>We reserve the right to modify or cancel promotions at any time</li>
          <li>The additional 10% phone discount is stackable with the base waitlist discount</li>
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
          <li>For help, reply <strong>HELP</strong> or contact info@drinkshroome.com</li>
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
          Email: info@drinkshroome.com
        </p>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="tos-cta">
        <div className="tos-cta-tag">Pre-Launch List</div>
        <h2>
          Be first.
          <br />
          <em>Get 20% off + free shipping.</em>
        </h2>
        <p className="tos-cta-sub">12 servings per box · Tear. Pour. Hit.</p>
        <a href="/" className="tos-btn-cta">
          Claim 20% off →
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
    </>
  );
}
