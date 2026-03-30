import type { Metadata } from "next";
import Link from "next/link";

import Image from "next/image";
import { blogPosts } from "./posts";
import MobileNav from "../MobileNav";

export const metadata: Metadata = {
  title: "Blog — shroomé | Matcha, Mushrooms & Wellness",
  description:
    "Evidence-based articles on ceremonial matcha, functional mushrooms, collagen, and building a better morning routine. No hype — just real information.",
  openGraph: {
    title: "Blog — shroomé",
    description:
      "Evidence-based articles on ceremonial matcha, functional mushrooms, collagen, and building a better morning routine.",
    type: "website",
    url: "https://www.drinkshroome.com/blog",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — shroomé",
    description:
      "Evidence-based articles on ceremonial matcha, functional mushrooms, collagen, and wellness.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/blog",
  },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Ingredients: { bg: "rgba(128,148,99,0.15)", text: "#5A7A3A" },
  Wellness: { bg: "rgba(255,183,209,0.25)", text: "#B44C7A" },
  "How-To": { bg: "rgba(200,255,58,0.2)", text: "#4A6B1A" },
  Science: { bg: "rgba(212,184,224,0.3)", text: "#6B4D7A" },
  Lifestyle: { bg: "rgba(255,223,150,0.25)", text: "#8B6914" },
  Education: { bg: "rgba(150,200,255,0.25)", text: "#2A5A8C" },
  Press: { bg: "rgba(40,40,40,0.12)", text: "#333333" },
};

export default function BlogIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "shroomé Blog",
            description:
              "Evidence-based articles on ceremonial matcha, functional mushrooms, collagen, and wellness.",
            url: "https://www.drinkshroome.com/blog",
            inLanguage: "en-US",
            publisher: {
              "@type": "Organization",
              name: "shroomé",
              url: "https://www.drinkshroome.com",
            },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.metaDescription,
              datePublished: post.date,
              url: `https://www.drinkshroome.com/blog/${post.slug}`,
              author: { "@type": "Person", name: post.author },
              articleSection: post.category,
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drinkshroome.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.drinkshroome.com/blog" },
            ],
          }),
        }}
      />

      <style>{`
        /* ── PAGE WRAPPER (retro 90s background) ── */
        .blog-page{
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(212,184,224,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(200,255,58,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255,183,209,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          position:relative
        }
        .blog-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B1F3B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── NAV ── */
        .blog-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .blog-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1B1F3B}
        .blog-nav-logo img{width:32px;height:32px;border-radius:6px}
        .blog-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .blog-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.blog-nav-links{display:none !important}.blog-nav-cta{display:none !important}}
        .blog-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .blog-nav-links a:hover{color:#2D4A2D}
        .blog-nav-links a.active{color:#2D4A2D}
        .blog-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .blog-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ── */
        .blog-hero{
          position:relative;overflow:hidden;padding:72px 8% 56px;
          background:linear-gradient(135deg,rgba(255,183,209,0.4) 0%,rgba(253,244,238,0.8) 60%,rgba(212,184,224,0.25) 100%)
        }
        .blog-hero-inner{position:relative;z-index:2;max-width:640px}
        .blog-hero-tag{
          display:inline-flex;align-items:center;gap:8px;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:#1B1F3B;margin-bottom:24px;
          opacity:0;animation:blogFadeUp .7s .1s forwards
        }
        .blog-hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:#C8FF3A;flex-shrink:0}
        .blog-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(44px,5.5vw,72px);font-weight:400;line-height:1;letter-spacing:-.02em;
          color:#1B1F3B;margin-bottom:18px;opacity:0;animation:blogFadeUp .8s .2s forwards
        }
        .blog-hero h1 em{font-style:italic;color:#809463}
        .blog-hero-sub{
          font-size:15px;line-height:1.75;color:rgba(27,31,59,0.65);max-width:480px;font-weight:400;
          opacity:0;animation:blogFadeUp .8s .35s forwards
        }
        @keyframes blogFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        /* ── POSTS GRID ── */
        .blog-grid{max-width:960px;margin:0 auto;padding:56px 6% 80px;display:grid;grid-template-columns:1fr;gap:32px}
        .blog-card{
          background:#fff;border:1px solid rgba(27,31,59,0.08);
          padding:36px 32px;transition:transform .25s cubic-bezier(.23,1,.32,1),box-shadow .25s;
          text-decoration:none;display:block
        }
        .blog-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(27,31,59,0.08)}
        .blog-card-meta{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap}
        .blog-card-cat{
          display:inline-block;padding:4px 12px;font-family:'DM Mono',monospace;
          font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
          border-radius:2px
        }
        .blog-card-date{font-family:'DM Mono',monospace;font-size:11px;color:rgba(27,31,59,0.45);letter-spacing:.06em}
        .blog-card-read{font-family:'DM Mono',monospace;font-size:11px;color:rgba(27,31,59,0.45);letter-spacing:.06em}
        .blog-card-dot{width:3px;height:3px;border-radius:50%;background:rgba(27,31,59,0.2)}
        .blog-card h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(22px,3vw,28px);font-weight:400;line-height:1.2;
          color:#1B1F3B;margin-bottom:12px;letter-spacing:-.01em
        }
        .blog-card p{font-size:14px;line-height:1.75;color:rgba(27,31,59,0.6);font-weight:400;max-width:560px}
        .blog-card-arrow{
          display:inline-flex;align-items:center;gap:6px;margin-top:20px;
          font-family:'Syne',system-ui,sans-serif;font-size:12px;font-weight:700;
          letter-spacing:.08em;text-transform:uppercase;color:#809463;transition:gap .2s
        }
        .blog-card:hover .blog-card-arrow{gap:10px}

        /* ── FOOTER ── */
        .blog-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .blog-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .blog-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .blog-footer-top a:hover{color:#2D4A2D}
        .blog-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .blog-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .blog-footer-mid a:hover{color:#1B1F3B}
        .blog-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ── */
        @media(max-width:640px){
          .blog-nav{padding:0 4%;height:54px;gap:8px}
          /* blog-nav-links hidden via main style block above */
          .blog-nav-logo{gap:6px}
          .blog-nav-logo span{font-size:18px}
          .blog-nav-logo img{width:30px;height:30px}
          .blog-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .blog-hero{padding:48px 5% 40px}
          .blog-hero h1{font-size:clamp(32px,9vw,46px)}
          .blog-grid{padding:36px 5% 56px;gap:24px}
          .blog-card{padding:28px 22px}
          .blog-card h2{font-size:clamp(20px,5vw,24px)}
          .blog-footer-top{gap:16px;flex-wrap:wrap}
        }
      `}</style>

      <div className="blog-page">
      {/* NAV */}
      <nav className="blog-nav" aria-label="Main navigation">
        <Link href="/" className="blog-nav-logo">
          <Image src="/logo-mark.png" width={32} height={32} alt="shroomé S" style={{ borderRadius: 6 }} priority />
          <span>shroom&eacute;</span>
        </Link>
        <div className="blog-nav-links">
          <Link href="/#why">Why shroom&eacute;</Link>
          <Link href="/#ingredients">Ingredients</Link>
          <Link href="/#how">How It Works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blog" className="active">Blog</Link>
          <Link href="/recipes">Recipes</Link>
        </div>
        <Link href="/#signup" className="blog-nav-cta">
          Get 20% off + free shipping &rarr;
        </Link>
        <MobileNav
          prefix="blog"
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
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <div className="blog-hero-tag">The shroom&eacute; Blog</div>
          <h1>
            Real talk about <em>what you drink.</em>
          </h1>
          <p className="blog-hero-sub">
            Evidence-based articles on ceremonial matcha, functional mushrooms,
            collagen, and building a morning routine that actually works.
          </p>
        </div>
      </section>

      {/* POSTS GRID */}
      <div className="blog-grid">
        {blogPosts.map((post) => {
          const colors = categoryColors[post.category] || {
            bg: "rgba(27,31,59,0.06)",
            text: "#1B1F3B",
          };
          const dateFormatted = new Date(post.date + "T12:00:00").toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" }
          );
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card-meta">
                <span
                  className="blog-card-cat"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {post.category}
                </span>
                <span className="blog-card-dot" />
                <span className="blog-card-date">{dateFormatted}</span>
                <span className="blog-card-dot" />
                <span className="blog-card-read">{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-card-arrow">
                Read article &rarr;
              </span>
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="blog-footer">
        <div className="blog-footer-top">
          <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="blog-footer-mid">
          &copy; 2026 shroom&eacute; &middot; hello@drinkshroome.com &middot;{" "}
          <a href="/privacy">Privacy Policy</a> &middot;{" "}
          <a href="/terms">Terms of Service</a>
        </div>
        <div className="blog-footer-bot">@drinkshroome</div>
      </footer>
      </div>
    </>
  );
}
