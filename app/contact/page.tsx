import type { Metadata } from "next";
import MobileNav from "../MobileNav";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact — shroomé",
  description: "Get in touch with shroomé. Questions about your order, press inquiries, or just want to say hi — we're real people who actually respond.",
  alternates: { canonical: "https://www.drinkshroome.com/contact" },
};

const navLinks = [
  { label: "Why shroomé", href: "/#why" },
  { label: "Ingredients", href: "/#ingredients" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Recipes", href: "/recipes" },
];

export default function Contact() {
  return (
    <>
      <style>{`
        .contact-nav{position:sticky;top:0;z-index:99;display:flex;align-items:center;justify-content:space-between;padding:14px 5%;background:rgba(253,244,238,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(27,31,59,0.07)}
        .contact-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none}
        .contact-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:1.3rem;color:#1B1F3B}
        .contact-nav-links{display:flex;gap:28px}
        @media(max-width:768px){.contact-nav-links{display:none}}
        .contact-nav-links a{font-family:'Syne',system-ui,sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;opacity:.7;transition:opacity .2s}
        .contact-nav-links a:hover{opacity:1}

        .contact-hero{background:#FDF4EE;padding:80px 5% 60px;text-align:center}
        .contact-hero-tag{display:inline-block;font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#1B1F3B;opacity:.4;margin-bottom:16px}
        .contact-hero h1{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(42px,7vw,72px);font-weight:400;font-style:italic;color:#1B1F3B;margin:0 0 16px;line-height:1.05}
        .contact-hero-sub{font-family:'Syne',system-ui,sans-serif;font-size:16px;color:#1B1F3B;opacity:.6;max-width:480px;margin:0 auto;line-height:1.6}

        .contact-body{background:#FDF4EE;padding:0 5% 80px;max-width:760px;margin:0 auto}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:48px}
        @media(max-width:600px){.contact-grid{grid-template-columns:1fr}}
        .contact-card{background:#fff;border-radius:16px;padding:32px 28px;border:1px solid rgba(27,31,59,0.07)}
        .contact-card-label{font-family:'DM Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1B1F3B;opacity:.35;margin:0 0 8px}
        .contact-card h2{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B;margin:0 0 8px}
        .contact-card p{font-family:'Syne',system-ui,sans-serif;font-size:13px;color:#1B1F3B;opacity:.55;line-height:1.6;margin:0 0 16px}
        .contact-card a{font-family:'DM Mono',monospace;font-size:12px;font-weight:700;letter-spacing:.08em;color:#1B1F3B;text-decoration:none;border-bottom:2px solid #C8FF3A;padding-bottom:2px;transition:opacity .2s}
        .contact-card a:hover{opacity:.6}

        .contact-social-heading{font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:400;font-style:italic;color:#1B1F3B;margin:0 0 20px;text-align:center}
        .contact-social-links{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
        .contact-social-link{font-family:'DM Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1B1F3B;text-decoration:none;padding:10px 20px;border-radius:8px;border:1.5px solid rgba(27,31,59,0.12);transition:all .2s}
        .contact-social-link:hover{background:#1B1F3B;color:#C8FF3A;border-color:#1B1F3B}

        .contact-footer{background:#D4B8E0;padding:32px 5%;text-align:center}
        .contact-footer p{font-family:'DM Mono',monospace;font-size:10px;color:#1B1F3B;opacity:.35;margin:0}
      `}</style>

      {/* NAV */}
      <nav className="contact-nav" aria-label="Main navigation">
        <a href="/" className="contact-nav-logo">
          <Image src="/logo-mark.png" alt="shroomé" width={32} height={32} style={{ borderRadius: 6 }} />
          <span>shroomé</span>
        </a>
        <div className="contact-nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <MobileNav links={navLinks} prefix="contact" />
      </nav>

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-tag">Contact</div>
        <h1>We actually respond.</h1>
        <p className="contact-hero-sub">
          Real people run shroomé. If you have a question, we&apos;ll get back to you — usually within a few hours.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <div className="contact-body">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-label">General</div>
            <h2>Say hello</h2>
            <p>Questions, feedback, ideas, or just want to talk matcha. We read everything.</p>
            <a href="mailto:hello@drinkshroome.com">hello@drinkshroome.com</a>
          </div>

          <div className="contact-card">
            <div className="contact-card-label">Orders</div>
            <h2>Order support</h2>
            <p>Pre-order questions, shipping inquiries, or issues with your purchase.</p>
            <a href="mailto:hello@drinkshroome.com">hello@drinkshroome.com</a>
          </div>

          <div className="contact-card">
            <div className="contact-card-label">Press</div>
            <h2>Media &amp; press</h2>
            <p>Press kits, interviews, and brand assets available on request.</p>
            <a href="mailto:hello@drinkshroome.com">press@drinkshroome.com</a>
          </div>

          <div className="contact-card">
            <div className="contact-card-label">Partnerships</div>
            <h2>Work with us</h2>
            <p>Brand collabs, creator partnerships, and wholesale inquiries.</p>
            <a href="mailto:hello@drinkshroome.com">hello@drinkshroome.com</a>
          </div>
        </div>

        {/* SOCIAL */}
        <div style={{ textAlign: "center" }}>
          <h2 className="contact-social-heading">Find us everywhere.</h2>
          <div className="contact-social-links">
            <a className="contact-social-link" href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="contact-social-link" href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a className="contact-social-link" href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="contact-footer">
        <p>© {new Date().getFullYear()} shroomé. All rights reserved.</p>
      </footer>
    </>
  );
}
