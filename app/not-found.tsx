import Image from "next/image";
import MobileNav from "./MobileNav";

export default function NotFound() {
  return (
    <>
      <style>{`
        /* ── PAGE WRAPPER (retro warm background) ── */
        .nf-page{
          min-height:100vh;display:flex;flex-direction:column;
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(212,184,224,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(200,255,58,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255,183,209,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          position:relative
        }
        .nf-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B1F3B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── NAV ── */
        .nf-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .nf-nav-logo{
          display:flex;align-items:center;gap:8px;
          text-decoration:none;color:#1B1F3B
        }
        .nf-nav-logo img{width:32px;height:32px;border-radius:6px}
        .nf-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .nf-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.nf-nav-links{display:none !important}.nf-nav-cta{display:none !important}}
        .nf-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .nf-nav-links a:hover{color:#2D4A2D}
        .nf-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .nf-nav-cta:hover{background:#2a2e4f}

        /* ── HERO / CONTENT ── */
        .nf-content{
          flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:80px 6%;text-align:center;position:relative;overflow:hidden
        }
        .nf-blob{position:absolute;border-radius:50%;pointer-events:none;opacity:.35}
        .nf-blob-a{width:360px;height:360px;top:-100px;right:8%;background:#D4B8E0}
        .nf-blob-b{width:240px;height:240px;bottom:-80px;left:5%;background:#FFB7D1;opacity:.25}
        .nf-blob-c{width:180px;height:180px;top:40%;left:60%;background:#C8FF3A;opacity:.12}

        .nf-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.18em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          margin-bottom:28px;
          opacity:0;animation:nfFadeUp .7s .1s forwards
        }
        .nf-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}

        .nf-heading{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(40px,6vw,72px);font-weight:400;font-style:italic;
          line-height:1.05;letter-spacing:-.02em;
          color:#1B1F3B;margin:0 0 20px;
          opacity:0;animation:nfFadeUp .8s .2s forwards
        }

        .nf-sub{
          font-family:'Syne',system-ui,sans-serif;
          font-size:clamp(15px,1.8vw,18px);font-weight:400;
          color:rgba(27,31,59,0.6);line-height:1.7;
          max-width:460px;margin:0 0 40px;
          opacity:0;animation:nfFadeUp .8s .35s forwards
        }

        .nf-links{
          display:flex;flex-wrap:wrap;gap:14px;justify-content:center;
          opacity:0;animation:nfFadeUp .8s .5s forwards
        }
        .nf-link{
          display:inline-block;
          padding:14px 32px;
          font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.08em;
          text-transform:uppercase;text-decoration:none;
          transition:background .2s,transform .2s,color .2s;
          cursor:pointer
        }
        .nf-link-primary{
          background:#1B1F3B;color:#FDF4EE;
        }
        .nf-link-primary:hover{background:#2a2e4f;transform:translateY(-2px)}
        .nf-link-secondary{
          background:transparent;color:#1B1F3B;
          border:1.5px solid rgba(27,31,59,0.2);
        }
        .nf-link-secondary:hover{border-color:#1B1F3B;transform:translateY(-2px)}
        .nf-link-lime{
          background:#C8FF3A;color:#1B1F3B;
        }
        .nf-link-lime:hover{background:#d4ff5a;transform:translateY(-2px)}

        @keyframes nfFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── FOOTER ── */
        .nf-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .nf-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .nf-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .nf-footer-top a:hover{color:#2D4A2D}
        .nf-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .nf-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .nf-footer-mid a:hover{color:#1B1F3B}
        .nf-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ── */
        @media(max-width:640px){
          .nf-nav{padding:0 4%;height:54px;gap:8px}
          .nf-nav-logo{gap:6px}
          .nf-nav-logo span{font-size:18px}
          .nf-nav-logo img{width:30px;height:30px}
          .nf-content{padding:60px 5%}
          .nf-heading{font-size:clamp(32px,9vw,46px)}
          .nf-sub{font-size:14px}
          .nf-links{flex-direction:column;align-items:stretch;gap:10px}
          .nf-link{padding:14px 24px;text-align:center}
          .nf-blob-a{width:200px;height:200px;top:-50px;right:5%}
          .nf-blob-b{width:140px;height:140px}
          .nf-blob-c{width:100px;height:100px}
          .nf-footer-top{gap:16px;flex-wrap:wrap;justify-content:center}
        }
      `}</style>

      <div className="nf-page">
        {/* ═══ NAV ═══ */}
        <nav className="nf-nav" aria-label="Main navigation">
          <a href="/" className="nf-nav-logo">
            <Image src="/logo-mark.png" width={32} height={32} alt="shroomé S" style={{ borderRadius: 6 }} priority />
            <span>shroomé</span>
          </a>
          <div className="nf-nav-links">
            <a href="/#why">Why shroomé</a>
            <a href="/#ingredients">Ingredients</a>
            <a href="/#how">How It Works</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">Blog</a>
            <a href="/recipes">Recipes</a>
          </div>
          <a href="/" className="nf-nav-cta">Get 20% off + free shipping &rarr;</a>
          <MobileNav
            prefix="nf"
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

        {/* ═══ CONTENT ═══ */}
        <section className="nf-content">
          <div className="nf-blob nf-blob-a" />
          <div className="nf-blob nf-blob-b" />
          <div className="nf-blob nf-blob-c" />

          <div className="nf-tag">404 — Page Not Found</div>
          <h1 className="nf-heading">Oops. This page<br />doesn&apos;t exist.</h1>
          <p className="nf-sub">Maybe you were looking for one of our recipes?</p>

          <div className="nf-links">
            <a href="/recipes" className="nf-link nf-link-primary">Browse Recipes &rarr;</a>
            <a href="/" className="nf-link nf-link-secondary">Back to Home &rarr;</a>
            <a href="/blog" className="nf-link nf-link-lime">Read the Blog &rarr;</a>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="nf-footer">
          <div className="nf-footer-top">
            <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className="nf-footer-mid">
            &copy; 2026 shroomé &middot; hello@drinkshroome.com &middot;{" "}
            <a href="/privacy">Privacy Policy</a> &middot; <a href="/terms">Terms of Service</a>
          </div>
          <div className="nf-footer-bot">@drinkshroome</div>
        </footer>
      </div>
    </>
  );
}
