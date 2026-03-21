import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { blogPosts, getPostBySlug, getRelatedPosts } from "../posts";
import BlogCTA from "./BlogCTA";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — shroomé`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `https://www.drinkshroome.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      siteName: "shroomé",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `https://www.drinkshroome.com/blog/${post.slug}`,
    },
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  Ingredients: { bg: "rgba(128,148,99,0.15)", text: "#5A7A3A" },
  Wellness: { bg: "rgba(255,183,209,0.25)", text: "#B44C7A" },
  "How-To": { bg: "rgba(200,255,58,0.2)", text: "#4A6B1A" },
  Science: { bg: "rgba(212,184,224,0.3)", text: "#6B4D7A" },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const dateFormatted = new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const colors = categoryColors[post.category] || {
    bg: "rgba(27,31,59,0.06)",
    text: "#1B1F3B",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Founder & CEO",
      url: "https://www.drinkshroome.com",
      worksFor: { "@type": "Organization", name: "ZSQUARED INC" },
    },
    publisher: {
      "@type": "Organization",
      name: "shroomé",
      url: "https://www.drinkshroome.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.drinkshroome.com/logo-mark.png",
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.drinkshroome.com/blog/${post.slug}`,
    },
    articleSection: post.category,
    wordCount: post.content.replace(/<[^>]*>/g, "").split(/\s+/).length,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    url: `https://www.drinkshroome.com/blog/${post.slug}`,
    keywords: post.metaDescription,
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
        name: "Blog",
        item: "https://www.drinkshroome.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.drinkshroome.com/blog/${post.slug}`,
      },
    ],
  };

  const shareUrl = encodeURIComponent(
    `https://www.drinkshroome.com/blog/${post.slug}`
  );
  const shareTitle = encodeURIComponent(post.title);

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        /* ── NAV ── */
        .post-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(255,183,209,0.85);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .post-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1B1F3B}
        .post-nav-logo img{width:28px;height:28px;filter:brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)}
        .post-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .post-nav-links{display:flex;gap:8px}
        .post-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .post-nav-links a:hover{color:#2D4A2D}
        .post-nav-links a.active{color:#2D4A2D}
        .post-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .post-nav-cta:hover{background:#2a2e4f}

        /* ── ARTICLE HEADER ── */
        .post-header{
          padding:64px 6% 48px;
          background:linear-gradient(135deg,rgba(255,183,209,0.3) 0%,rgba(253,244,238,0.9) 50%,rgba(212,184,224,0.15) 100%)
        }
        .post-header-inner{max-width:680px;margin:0 auto}
        .post-back{
          display:inline-flex;align-items:center;gap:6px;
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:600;
          letter-spacing:.1em;text-transform:uppercase;color:rgba(27,31,59,0.5);
          text-decoration:none;margin-bottom:28px;transition:color .2s
        }
        .post-back:hover{color:#1B1F3B}
        .post-meta{display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap}
        .post-cat{
          display:inline-block;padding:4px 12px;font-family:'DM Mono',monospace;
          font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;border-radius:2px
        }
        .post-date{font-family:'DM Mono',monospace;font-size:11px;color:rgba(27,31,59,0.45);letter-spacing:.06em}
        .post-read{font-family:'DM Mono',monospace;font-size:11px;color:rgba(27,31,59,0.45);letter-spacing:.06em}
        .post-dot{width:3px;height:3px;border-radius:50%;background:rgba(27,31,59,0.2)}
        .post-header h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(32px,4.5vw,52px);font-weight:400;line-height:1.1;
          color:#1B1F3B;letter-spacing:-.02em;margin-bottom:0
        }

        /* ── ARTICLE BODY ── */
        .post-body{max-width:680px;margin:0 auto;padding:48px 6% 56px}
        .post-body h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(24px,3vw,32px);font-weight:400;font-style:italic;
          color:#1B1F3B;margin:40px 0 16px;line-height:1.2;letter-spacing:-.01em
        }
        .post-body h2:first-child{margin-top:0}
        .post-body p{
          font-family:'Syne',system-ui,sans-serif;font-size:15px;
          line-height:1.85;color:rgba(27,31,59,0.72);margin-bottom:20px;font-weight:400
        }
        .post-body strong{color:#1B1F3B;font-weight:600}
        .post-body em{font-style:italic}
        .post-body a{color:#809463;text-decoration:underline;text-underline-offset:3px;transition:color .2s}
        .post-body a:hover{color:#5A7A3A}
        .post-body hr{border:none;border-top:1px solid rgba(27,31,59,0.1);margin:40px 0}
        .post-body ul,.post-body ol{margin:0 0 20px 24px;padding:0}
        .post-body li{
          font-family:'Syne',system-ui,sans-serif;font-size:15px;
          line-height:1.85;color:rgba(27,31,59,0.72);margin-bottom:8px;font-weight:400
        }

        /* ── SHARE ── */
        .post-share{max-width:680px;margin:0 auto;padding:0 6% 40px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
        .post-share-label{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgba(27,31,59,0.45)}
        .post-share-btn{
          display:inline-flex;align-items:center;gap:6px;
          padding:8px 16px;border:1px solid rgba(27,31,59,0.12);background:none;
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:600;
          letter-spacing:.06em;text-transform:uppercase;color:#1B1F3B;
          text-decoration:none;transition:border-color .2s,background .2s
        }
        .post-share-btn:hover{border-color:rgba(27,31,59,0.3);background:rgba(27,31,59,0.03)}

        /* ── AUTHOR ── */
        .post-author{max-width:680px;margin:0 auto;padding:0 6% 48px}
        .post-author-inner{
          display:flex;align-items:center;gap:20px;
          padding:28px;border:1px solid rgba(27,31,59,0.08);background:#fff
        }
        .post-author-avatar{
          width:56px;height:56px;border-radius:50%;
          background:linear-gradient(135deg,#809463 0%,#C8FF3A 100%);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
          font-family:'Instrument Serif',Georgia,serif;font-size:22px;color:#1B1F3B;font-weight:400
        }
        .post-author-info h3{
          font-family:'Syne',system-ui,sans-serif;font-size:14px;font-weight:700;
          color:#1B1F3B;margin-bottom:4px
        }
        .post-author-info p{
          font-family:'Syne',system-ui,sans-serif;font-size:13px;
          color:rgba(27,31,59,0.55);line-height:1.5;font-weight:400
        }

        /* ── CTA ── */
        .post-cta{background:#1B1F3B;padding:64px 7%;text-align:center;position:relative;overflow:hidden}
        .post-cta-tag{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#C8FF3A;margin-bottom:16px}
        .post-cta h2{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(28px,4vw,44px);font-weight:400;font-style:italic;
          color:#FDF4EE;line-height:1.1;margin-bottom:12px
        }
        .post-cta h2 em{font-style:italic;color:#FF7043}
        .post-cta-sub{font-size:14px;color:rgba(253,244,238,.5);margin-bottom:28px;font-weight:400}
        .post-btn-cta{
          display:inline-block;background:#C8FF3A;color:#1B1F3B;border:none;
          padding:14px 36px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
          cursor:pointer;transition:background .2s,transform .2s;text-decoration:none
        }
        .post-btn-cta:hover{background:#d4ff5a;transform:translateY(-2px)}

        /* ── RELATED ── */
        .post-related{max-width:960px;margin:0 auto;padding:56px 6% 64px}
        .post-related-label{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.16em;text-transform:uppercase;color:rgba(27,31,59,0.45);margin-bottom:28px
        }
        .post-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
        .post-related-card{
          background:#fff;border:1px solid rgba(27,31,59,0.08);padding:28px 24px;
          text-decoration:none;display:block;transition:transform .25s cubic-bezier(.23,1,.32,1),box-shadow .25s
        }
        .post-related-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(27,31,59,0.07)}
        .post-related-card-cat{
          display:inline-block;padding:3px 10px;font-family:'DM Mono',monospace;
          font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
          border-radius:2px;margin-bottom:12px
        }
        .post-related-card h3{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:18px;font-weight:400;line-height:1.3;color:#1B1F3B;margin-bottom:8px
        }
        .post-related-card p{font-size:13px;line-height:1.65;color:rgba(27,31,59,0.55);font-weight:400}

        /* ── FOOTER ── */
        .post-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .post-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .post-footer-top a{
          font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
          letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;transition:color .2s
        }
        .post-footer-top a:hover{color:#2D4A2D}
        .post-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .post-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .post-footer-mid a:hover{color:#1B1F3B}
        .post-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ── */
        @media(max-width:640px){
          .post-nav{padding:0 4%;height:54px;gap:8px}
          .post-nav-links{display:none}
          .post-nav-logo{gap:6px}
          .post-nav-logo span{font-size:18px}
          .post-nav-logo img{width:24px;height:24px}
          .post-nav-cta{padding:8px 14px;font-size:10px;letter-spacing:.04em;white-space:nowrap}
          .post-header{padding:44px 5% 36px}
          .post-header h1{font-size:clamp(28px,8vw,40px)}
          .post-body{padding:36px 5% 44px}
          .post-body h2{font-size:clamp(22px,6vw,28px)}
          .post-body p,.post-body li{font-size:14.5px}
          .post-share{padding:0 5% 32px}
          .post-author{padding:0 5% 40px}
          .post-author-inner{flex-direction:column;text-align:center;gap:14px}
          .post-cta{padding:44px 5%}
          .post-cta h2{font-size:clamp(24px,7vw,36px)}
          .post-btn-cta{padding:12px 28px;font-size:11px}
          .post-related{padding:40px 5% 48px}
          .post-related-grid{grid-template-columns:1fr;gap:18px}
          .post-footer-top{gap:16px;flex-wrap:wrap}
        }
      `}</style>

      {/* NAV */}
      <nav className="post-nav">
        <Link href="/" className="post-nav-logo">
          <img src="/logo-mark.png" width={28} height={28} alt="shroomé S" />
          <span>shroom&eacute;</span>
        </Link>
        <div className="post-nav-links">
          <Link href="/#why">Why shroom&eacute;</Link>
          <Link href="/#ingredients">Ingredients</Link>
          <Link href="/#how">How It Works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blog" className="active">Blog</Link>
        </div>
        <Link href="/" className="post-nav-cta">
          Get 20% off + free shipping &rarr;
        </Link>
      </nav>

      {/* HEADER */}
      <header className="post-header">
        <div className="post-header-inner">
          <Link href="/blog" className="post-back">
            &larr; All articles
          </Link>
          <div className="post-meta">
            <span
              className="post-cat"
              style={{ background: colors.bg, color: colors.text }}
            >
              {post.category}
            </span>
            <span className="post-dot" />
            <span className="post-date">{dateFormatted}</span>
            <span className="post-dot" />
            <span className="post-read">{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
        </div>
      </header>

      {/* BODY */}
      <article
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* EMAIL CAPTURE CTA */}
      <BlogCTA />

      {/* SHARE */}
      <div className="post-share">
        <span className="post-share-label">Share</span>
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="post-share-btn"
        >
          X / Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="post-share-btn"
        >
          LinkedIn
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="post-share-btn"
        >
          Facebook
        </a>
      </div>

      {/* AUTHOR */}
      <div className="post-author">
        <div className="post-author-inner">
          <div className="post-author-avatar">ZK</div>
          <div className="post-author-info">
            <h3>Zachary Kaufman</h3>
            <p>
              Founder of shroom&eacute;. Obsessed with doing matcha right — real
              ingredients, real doses, zero compromises.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="post-cta">
        <div className="post-cta-tag">Join the Waitlist</div>
        <h2>
          Try shroom&eacute; for yourself.
          <br />
          <em>20% off + free shipping.</em>
        </h2>
        <p className="post-cta-sub">
          12 servings per box &middot; Ceremonial matcha + mushroom extracts +
          collagen
        </p>
        <Link href="/" className="post-btn-cta">
          Claim 20% off &rarr;
        </Link>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="post-related">
          <div className="post-related-label">Keep reading</div>
          <div className="post-related-grid">
            {related.map((r) => {
              const rc = categoryColors[r.category] || {
                bg: "rgba(27,31,59,0.06)",
                text: "#1B1F3B",
              };
              return (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="post-related-card"
                >
                  <span
                    className="post-related-card-cat"
                    style={{ background: rc.bg, color: rc.text }}
                  >
                    {r.category}
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.excerpt}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="post-footer">
        <div className="post-footer-top">
          <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="post-footer-mid">
          &copy; 2026 shroom&eacute; &middot; hello@drinkshroome.com &middot;{" "}
          <a href="/privacy">Privacy Policy</a> &middot;{" "}
          <a href="/terms">Terms of Service</a>
        </div>
        <div className="post-footer-bot">@drinkshroome</div>
      </footer>
    </>
  );
}
