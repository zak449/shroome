import type { Metadata } from "next";
import MobileNav from "../MobileNav";

export const metadata: Metadata = {
  title: "Privacy Policy — shroomé | Café Energy. Home Address.",
  description:
    "How shroomé collects, uses, and protects your information. Read our full privacy policy.",
  openGraph: {
    title: "Privacy Policy — shroomé",
    description:
      "How shroomé collects, uses, and protects your information. Read our full privacy policy.",
    type: "website",
    url: "https://www.drinkshroome.com/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — shroomé",
    description:
      "How shroomé collects, uses, and protects your information. Read our full privacy policy.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/privacy",
  },
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

export default function Privacy() {
  return (
    <>
      <style>{`
        /* ── TICKER ─── */
        .pp-ticker{background:#1B1F3B;padding:10px 0;overflow:hidden;white-space:nowrap}
        .pp-ticker-track{display:inline-flex;animation:ppTick 28s linear infinite}
        .pp-ticker-item{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:0 28px;color:rgba(253,244,238,.75)}
        .pp-ticker-item em{color:#C8FF3A;font-style:normal;font-weight:500}
        @keyframes ppTick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* ── NAV ─── */
        .pp-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .pp-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .pp-nav-logo img{width:28px;height:28px;filter:brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)}
        .pp-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .pp-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.pp-nav-links{display:none !important}}
        .pp-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .pp-nav-links a:hover{color:#2D4A2D}
        .pp-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .pp-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ─── */
        .pp-hero{position:relative;overflow:hidden;padding:72px 8% 64px}
        .pp-hero-bg{position:absolute;inset:0;background:url('/email-clouds-bg.jpg') center bottom/cover no-repeat;opacity:.45}
        .pp-hero-overlay{position:absolute;inset:0;background:linear-gradient(rgba(255,183,209,0.7) 0%,rgba(255,183,209,0.5) 40%,rgba(253,244,238,0.6) 100%)}
        .pp-blob{position:absolute;border-radius:50%;pointer-events:none;background:#D4B8E0;opacity:.4}
        .pp-blob-a{width:340px;height:340px;top:-80px;right:10%}
        .pp-blob-b{width:200px;height:200px;bottom:-60px;left:5%;background:#FDF4EE;opacity:.3}
        .pp-hero-inner{position:relative;z-index:2;max-width:640px}
        .pp-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:#1B1F3B;margin-bottom:24px;
          opacity:0;animation:ppFadeUp .7s .1s forwards
        }
        .pp-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}
        .pp-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:#2D4A2D;margin-bottom:18px;opacity:0;animation:ppFadeUp .8s .2s forwards
        }
        .pp-hero h1 em{font-style:italic;color:#FF7043}
        .pp-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(27,31,59,0.7);max-width:480px;font-weight:400;
          opacity:0;animation:ppFadeUp .8s .35s forwards
        }
        .pp-hero-sub strong{color:#1B1F3B;font-weight:700}
        @keyframes ppFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── PILL ROW ─── */
        .pp-pill-row{display:flex;gap:0;overflow:hidden;white-space:nowrap;background:#D4B8E0;padding:12px 0}
        .pp-pill-track{display:inline-flex;animation:ppTick 22s linear infinite}
        .pp-pill-item{
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:700;
          letter-spacing:.14em;text-transform:uppercase;color:#1B1F3B;padding:0 28px
        }
        .pp-pill-sep{opacity:.3}

        /* ── CONTENT BODY ─── */
        .pp-body{max-width:820px;margin:0 auto;padding:64px 6% 80px}
        .pp-updated{font-family:'DM Mono',monospace;font-size:11px;color:rgba(27,31,59,0.4);letter-spacing:.06em;margin-bottom:32px}
        .pp-body p{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(27,31,59,0.7);line-height:1.8;margin-bottom:16px;font-weight:400;max-width:680px}
        .pp-body p strong{color:#1B1F3B;font-weight:600}
        .pp-body h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(22px,3vw,30px);font-weight:400;font-style:italic;
          color:#1B1F3B;letter-spacing:-.01em;margin:48px 0 16px;padding-top:8px;
          border-top:1px solid rgba(27,31,59,0.1)
        }
        .pp-body h2:first-of-type{margin-top:32px}
        .pp-body ul{font-family:'Syne',system-ui,sans-serif;font-size:14px;color:rgba(27,31,59,0.7);line-height:1.8;margin-bottom:16px;padding-left:24px;max-width:680px}
        .pp-body ul li{margin-bottom:8px}
        .pp-body ul li strong{color:#1B1F3B;font-weight:600}

        /* ── CTA SECTION ─── */
        .pp-cta{background:#1B1F3B;padding:64px 7%;text-align:center;position:relative;overflow:hidden}
        .pp-cta-tag{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#C8FF3A;margin-bottom:16px}
        .pp-cta h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(30px,4vw,48px);font-weight:400;font-style:italic;
          color:#FDF4EE;line-height:1.05;margin-bottom:12px
        }
        .pp-cta h2 em{font-style:italic;color:#FF7043}
        .pp-cta-sub{font-size:14px;color:rgba(253,244,238,.5);margin-bottom:28px;font-weight:400}
        .pp-btn-cta{
          display:inline-block;background:#C8FF3A;color:#1B1F3B;border:none;
          padding:14px 36px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          cursor:pointer;transition:background .2s,transform .2s;text-decoration:none
        }
        .pp-btn-cta:hover{background:#d4ff5a;transform:translateY(-2px)}

        /* ── FOOTER ─── */
        .pp-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .pp-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .pp-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .pp-footer-top a:hover{color:#2D4A2D}
        .pp-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .pp-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .pp-footer-mid a:hover{color:#1B1F3B}
        .pp-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ─── */
        @media(max-width:640px){
          .pp-nav{padding:0 4%;height:54px;gap:8px}
          /* pp-nav-links hidden via main style block above */
          .pp-nav-logo{gap:6px}
          .pp-nav-logo span{font-size:18px}
          .pp-nav-logo img{width:24px;height:24px}
          .pp-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .pp-hero{padding:48px 5% 44px}
          .pp-hero h1{font-size:clamp(32px,9vw,46px)}
          .pp-hero-sub{font-size:14px}
          .pp-hero-tag{font-size:10px;letter-spacing:.12em}
          .pp-blob-a{width:200px;height:200px;top:-40px;right:5%}
          .pp-blob-b{width:120px;height:120px}
          .pp-body{padding:40px 5% 56px}
          .pp-body h2{font-size:clamp(20px,6vw,26px)}
          .pp-cta{padding:44px 5%}
          .pp-cta h2{font-size:clamp(26px,7vw,38px)}
          .pp-btn-cta{padding:12px 28px;font-size:11px}
          .pp-footer-top{gap:16px;flex-wrap:wrap;justify-content:center}
          .pp-pill-item{font-size:10px;padding:0 20px}
        }
      `}</style>

      {/* ═══ TICKER ═══ */}
      <div className="pp-ticker">
        <div className="pp-ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="pp-ticker-item" dangerouslySetInnerHTML={{
              __html: t.replace(/✦/g, '<em>✦</em>')
            }} />
          ))}
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className="pp-nav">
        <a href="/" className="pp-nav-logo">
          <img src="/logo-mark.png" width={28} height={28} alt="shroomé S" />
          <span>shroomé</span>
        </a>
        <div className="pp-nav-links">
          <a href="/#why">Why shroomé</a>
          <a href="/#ingredients">Ingredients</a>
          <a href="/#how">How It Works</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
        </div>
        <a href="/" className="pp-nav-cta">Get 20% off + free shipping &rarr;</a>
        <MobileNav
          prefix="pp"
          links={[
            { label: "Why shroom\u00e9", href: "/#why" },
            { label: "Ingredients", href: "/#ingredients" },
            { label: "How It Works", href: "/#how" },
            { label: "FAQ", href: "/faq" },
            { label: "Blog", href: "/blog" },
          ]}
        />
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pp-hero">
        <div className="pp-hero-bg" />
        <div className="pp-hero-overlay" />
        <div className="pp-blob pp-blob-a" />
        <div className="pp-blob pp-blob-b" />
        <div className="pp-hero-inner">
          <div className="pp-hero-tag">Legal</div>
          <h1>Privacy <em>Policy.</em></h1>
          <p className="pp-hero-sub">
            Your privacy matters to us. Here&apos;s how <strong>shroomé</strong> collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* ═══ PILL TICKER ═══ */}
      <div className="pp-pill-row">
        <div className="pp-pill-track">
          {[...pills, ...pills].map((p, i) => (
            <span key={i} className="pp-pill-item">
              {p} <span className="pp-pill-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ CONTENT BODY ═══ */}
      <div className="pp-body">
        <p className="pp-updated">Last updated: March 18, 2026</p>

        <p>
          ZSQUARED INC (&quot;shroomé,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website drinkshroome.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or sign up for our waitlist.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information you voluntarily provide, including:</p>
        <ul>
          <li><strong>Email address</strong> — when you join our waitlist</li>
          <li><strong>Phone number</strong> — when you opt in to SMS marketing (optional)</li>
          <li><strong>Usage data</strong> — pages visited, time on site, scroll depth, and interactions via Google Analytics</li>
          <li><strong>Device information</strong> — browser type, operating system, and screen size (collected automatically)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To send you waitlist updates, product launch announcements, and promotional offers via email</li>
          <li>To send you marketing text messages if you opt in to SMS</li>
          <li>To send you your exclusive discount code at launch</li>
          <li>To analyze website traffic and improve our site experience</li>
          <li>To communicate with you about your inquiries or requests</li>
        </ul>

        <h2>SMS Marketing</h2>
        <p>
          By providing your phone number and opting in, you consent to receive marketing text messages from shroomé at the number provided. Message frequency varies. Message and data rates may apply. You can opt out at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for assistance. Your consent to receive SMS is not a condition of purchase.
        </p>

        <h2>Third-Party Services</h2>
        <p>We use the following third-party services to operate our business:</p>
        <ul>
          <li><strong>Klaviyo</strong> — email and SMS marketing platform</li>
          <li><strong>Resend</strong> — transactional email delivery</li>
          <li><strong>Google Analytics</strong> — website analytics</li>
          <li><strong>Cloudflare Turnstile</strong> — bot protection</li>
          <li><strong>Vercel</strong> — website hosting</li>
          <li><strong>Google Sheets</strong> — data backup</li>
        </ul>
        <p>
          These services may collect and process your data in accordance with their own privacy policies. We do not sell your personal information to third parties.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by emailing hello@drinkshroome.com.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt out of marketing communications at any time</li>
          <li>Unsubscribe from emails via the link in any email</li>
          <li>Opt out of SMS by replying STOP</li>
        </ul>

        <h2>Cookies &amp; Tracking</h2>
        <p>
          We use Google Analytics to understand how visitors interact with our site. This may use cookies and similar technologies. You can opt out by using browser privacy settings or the Google Analytics opt-out browser add-on.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at:<br />
          <strong>ZSQUARED INC</strong><br />
          Email: hello@drinkshroome.com
        </p>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="pp-cta">
        <div className="pp-cta-tag">Pre-Launch List</div>
        <h2>
          Be first.
          <br />
          <em>Get 20% off + free shipping.</em>
        </h2>
        <p className="pp-cta-sub">12 servings per box · Tear. Pour. Hit.</p>
        <a href="/" className="pp-btn-cta">
          Claim 20% off →
        </a>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="pp-footer">
        <div className="pp-footer-top">
          <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="pp-footer-mid">
          © 2026 shroomé · hello@drinkshroome.com ·{" "}
          <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a>
        </div>
        <div className="pp-footer-bot">@drinkshroome</div>
      </footer>
    </>
  );
}
