"use client";
import { useState } from "react";
import Image from "next/image";
import MobileNav from "../MobileNav";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const tiers = [
  { count: 3, label: "3 Friends", reward: "Free sachet sampler pack", color: "#C8FF3A" },
  { count: 5, label: "5 Friends", reward: "Free box (12 sachets)", color: "#C8FF3A" },
  { count: 10, label: "10 Friends", reward: "Free box + exclusive merch drop", color: "#FFB7D1" },
  { count: 25, label: "25 Friends", reward: "Founding Member status + lifetime 20% off", color: "#FFB7D1" },
  { count: 50, label: "50 Friends", reward: "VIP — early access to every new flavor + free boxes for life", color: "#D4B8E0" },
];

const faqs = [
  { q: "Is there a limit?", a: "No limit. Refer 100 friends, earn $500." },
  { q: "When do I get my credit?", a: "Instantly when your friend\u2019s order ships." },
  { q: "Can I share on social media?", a: "Yes! Your link works everywhere." },
];

export default function ReferPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enter" | "loading" | "done">("enter");
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || step === "loading") return;
    setStep("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: "refer-page" }),
      });
      const data = await res.json();
      if (data.referralCode) setReferralCode(data.referralCode);
      if (data.referralCount) setReferralCount(data.referralCount);
      window.gtag?.("event", "sign_up", { method: "waitlist", event_label: "refer_page" });
      window.gtag?.("event", "generate_lead", { currency: "USD", value: 5.0 });
    } catch {
      /* silently handle */
    }
    setStep("done");
  };

  const referralLink = referralCode ? `https://www.drinkshroome.com?ref=${referralCode}` : "";

  const shareMsg = referralLink
    ? `I just found the cleanest matcha ever \u2014 shroom\u00e9 is ceremonial matcha + mushrooms + collagen in one sachet. Use my link for $5 off: ${referralLink}`
    : "";

  const copyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => { /* noop */ });
    window.gtag?.("event", "share", { method: "copy_link", content_type: "referral" });
  };

  const shareOn = (platform: string) => {
    if (!referralLink) return;
    const msg = encodeURIComponent(shareMsg);
    const url = encodeURIComponent(referralLink);
    switch (platform) {
      case "imessage":
        window.open(`sms:?&body=${msg}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${msg}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${msg}`, "_blank");
        break;
      case "instagram":
        navigator.clipboard.writeText(referralLink).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => { /* noop */ });
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent("You need to try this matcha \u2014 $5 off")}&body=${msg}`,
          "_blank"
        );
        break;
    }
    window.gtag?.("event", "share", { method: platform, content_type: "referral" });
  };

  const scrollToForm = () => {
    const el = document.getElementById("ref-get-link");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* ── PAGE ── */
        .ref-page{
          min-height:100vh;
          background:
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(212,184,224,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 85%, rgba(200,255,58,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 60% 40%, rgba(255,183,209,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #F0E4D8 0%, #EDE0D4 30%, #E8D8CC 60%, #F0E4D8 100%);
          background-attachment:fixed;
          font-family:'Syne',system-ui,sans-serif;color:#1B1F3B;
          position:relative
        }
        .ref-page::before{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B1F3B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:0.6
        }

        /* ── NAV ── */
        .ref-nav{
          position:sticky;top:0;z-index:200;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 5%;height:60px;
          background:rgba(240,228,216,0.9);
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(27,31,59,0.06)
        }
        .ref-nav-logo{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1B1F3B}
        .ref-nav-logo span{font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#1B1F3B}
        .ref-nav-links{display:flex;gap:8px}
        @media(max-width:768px){.ref-nav-links{display:none !important}.ref-nav-cta{display:none !important}}
        .ref-nav-links a{
          background:none;border:none;cursor:pointer;
          font-family:'Syne',system-ui,sans-serif;font-size:11.5px;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          padding:8px 14px;transition:color .2s;text-decoration:none
        }
        .ref-nav-links a:hover{color:#2D4A2D}
        .ref-nav-cta{
          background:#1B1F3B;color:#FDF4EE;border:none;
          padding:10px 20px;font-family:'Syne',system-ui,sans-serif;
          font-size:12px;font-weight:700;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none
        }
        .ref-nav-cta:hover{background:#2a2e4f}

        /* ── HERO ── */
        .ref-hero{
          text-align:center;padding:100px 6% 80px;
          position:relative;overflow:hidden
        }
        .ref-hero-blob1{
          position:absolute;width:420px;height:420px;border-radius:50%;
          background:radial-gradient(circle,#C8FF3A 0%,transparent 70%);
          opacity:0.15;top:-120px;right:5%;pointer-events:none
        }
        .ref-hero-blob2{
          position:absolute;width:320px;height:320px;border-radius:50%;
          background:radial-gradient(circle,#FFB7D1 0%,transparent 70%);
          opacity:0.2;bottom:-80px;left:10%;pointer-events:none
        }
        .ref-hero-inner{position:relative;z-index:1;max-width:720px;margin:0 auto}
        .ref-hero-tag{
          font-family:'DM Mono',monospace;font-size:12px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase;
          color:rgba(27,31,59,0.45);margin-bottom:28px
        }
        .ref-hero h1{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(40px,6vw,72px);font-weight:400;font-style:italic;
          line-height:1.0;margin:0 0 24px;color:#1B1F3B
        }
        .ref-hero h1 .lime{color:#2D4A2D}
        .ref-hero-sub{
          font-size:17px;color:rgba(27,31,59,0.6);line-height:1.7;
          max-width:540px;margin:0 auto 40px
        }
        .ref-hero-cta{
          display:inline-block;
          background:#C8FF3A;color:#1B1F3B;
          padding:18px 40px;border:none;
          font-family:'Syne',system-ui,sans-serif;
          font-size:14px;font-weight:800;letter-spacing:.08em;
          text-transform:uppercase;cursor:pointer;
          transition:transform .2s,box-shadow .2s;
          text-decoration:none
        }
        .ref-hero-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(200,255,58,0.3)}

        /* ── HOW IT WORKS ── */
        .ref-how{background:#1B1F3B;padding:80px 6%;position:relative;z-index:1}
        .ref-how-inner{max-width:900px;margin:0 auto;text-align:center}
        .ref-how-title{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(28px,4vw,44px);font-weight:400;font-style:italic;
          color:#FDF4EE;margin:0 0 16px
        }
        .ref-how-sub{font-size:14px;color:rgba(253,244,238,0.45);margin:0 0 48px}
        .ref-steps{display:flex;gap:48px;justify-content:center;flex-wrap:wrap}
        .ref-step{flex:1;min-width:220px;max-width:260px;text-align:center}
        .ref-step-num{
          font-family:'DM Mono',monospace;font-size:14px;font-weight:700;
          letter-spacing:.12em;color:#C8FF3A;margin-bottom:16px
        }
        .ref-step-icon{
          width:56px;height:56px;border-radius:50%;
          background:#C8FF3A;color:#1B1F3B;
          font-weight:900;font-size:22px;
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 18px;
          box-shadow:0 4px 20px rgba(200,255,58,0.25)
        }
        .ref-step-title{
          font-weight:700;font-size:15px;color:#FDF4EE;
          letter-spacing:.04em;margin-bottom:10px
        }
        .ref-step-desc{font-size:13px;color:rgba(253,244,238,0.5);line-height:1.65}

        /* ── TIERS ── */
        .ref-tiers{padding:80px 6%;text-align:center;position:relative;z-index:1}
        .ref-tiers-title{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(28px,4vw,44px);font-weight:400;font-style:italic;
          color:#1B1F3B;margin:0 0 12px
        }
        .ref-tiers-sub{font-size:14px;color:rgba(27,31,59,0.5);margin:0 0 48px}
        .ref-tier-ladder{
          max-width:600px;margin:0 auto;
          display:flex;flex-direction:column;gap:0
        }
        .ref-tier{
          display:flex;align-items:stretch;
          border:2px solid rgba(27,31,59,0.08);
          border-bottom:none;
          background:#fff;
          transition:transform .2s,box-shadow .2s
        }
        .ref-tier:first-child{border-radius:12px 12px 0 0}
        .ref-tier:last-child{border-bottom:2px solid rgba(27,31,59,0.08);border-radius:0 0 12px 12px}
        .ref-tier:hover{transform:translateX(4px);box-shadow:0 4px 20px rgba(27,31,59,0.08)}
        .ref-tier-badge{
          width:80px;min-height:72px;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          font-family:'DM Mono',monospace;font-size:11px;font-weight:700;
          letter-spacing:.08em;text-transform:uppercase;color:#1B1F3B;
          border-right:2px solid rgba(27,31,59,0.08);
          flex-shrink:0
        }
        .ref-tier-badge-num{font-size:24px;font-weight:900;line-height:1;margin-bottom:2px}
        .ref-tier-content{
          flex:1;display:flex;align-items:center;
          padding:20px 24px;text-align:left
        }
        .ref-tier-reward{font-size:15px;font-weight:600;color:#1B1F3B;line-height:1.4}
        .ref-tier-vip .ref-tier-badge{background:#1B1F3B;color:#C8FF3A}
        .ref-tier-vip .ref-tier-reward{color:#1B1F3B;font-weight:800}
        .ref-tier-founder .ref-tier-badge{background:#2D4A2D;color:#C8FF3A}

        /* ── SOCIAL PROOF ── */
        .ref-proof{
          background:#1B1F3B;padding:48px 6%;
          display:flex;gap:32px;justify-content:center;align-items:center;
          flex-wrap:wrap;position:relative;z-index:1
        }
        .ref-proof-stat{text-align:center;min-width:200px}
        .ref-proof-num{
          font-family:'DM Mono',monospace;font-size:clamp(32px,5vw,48px);
          font-weight:900;color:#C8FF3A;line-height:1
        }
        .ref-proof-label{
          font-size:13px;color:rgba(253,244,238,0.55);
          letter-spacing:.06em;text-transform:uppercase;
          margin-top:8px;font-weight:600
        }
        .ref-proof-divider{
          width:1px;height:48px;background:rgba(253,244,238,0.12)
        }

        /* ── SHARE / FORM ── */
        .ref-share-section{
          padding:80px 6%;text-align:center;
          position:relative;z-index:1
        }
        .ref-share-inner{max-width:560px;margin:0 auto}
        .ref-share-title{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(28px,4vw,44px);font-weight:400;font-style:italic;
          color:#1B1F3B;margin:0 0 12px
        }
        .ref-share-sub{font-size:14px;color:rgba(27,31,59,0.55);margin:0 0 36px}

        .ref-form{display:flex;gap:8px;max-width:460px;margin:0 auto}
        .ref-input{
          flex:1;padding:16px 18px;border:2px solid #1B1F3B;border-radius:0;
          font-size:15px;font-family:'Syne',sans-serif;background:#fff;
          color:#1B1F3B;outline:none
        }
        .ref-input:focus{border-color:#C8FF3A}
        .ref-btn{
          padding:16px 28px;background:#C8FF3A;color:#1B1F3B;
          border:2px solid #1B1F3B;
          font-size:13px;font-weight:800;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;white-space:nowrap;
          font-family:'Syne',sans-serif;transition:all .2s
        }
        .ref-btn:hover{background:#b8ef2a;transform:translateY(-1px)}
        .ref-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}

        /* ── SHARE PANEL (post-submit) ── */
        .ref-panel{margin-top:40px;text-align:center}
        .ref-panel-title{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:28px;font-style:italic;color:#1B1F3B;margin:0 0 8px
        }
        .ref-panel-sub{font-size:14px;color:rgba(27,31,59,0.5);margin:0 0 24px}

        .ref-link-row{
          display:flex;gap:8px;align-items:center;
          max-width:460px;margin:0 auto 20px
        }
        .ref-link-url{
          flex:1;background:#fff;border:2px solid #1B1F3B;
          padding:14px 16px;font-family:'DM Mono',monospace;font-size:13px;
          color:#1B1F3B;overflow:hidden;text-overflow:ellipsis;white-space:nowrap
        }
        .ref-copy-btn{
          padding:14px 22px;border:2px solid #1B1F3B;background:#C8FF3A;
          color:#1B1F3B;font-weight:800;font-size:12px;letter-spacing:.06em;
          text-transform:uppercase;cursor:pointer;font-family:'Syne',sans-serif;
          transition:all .2s;white-space:nowrap
        }
        .ref-copy-btn:hover{background:#b8ef2a}

        .ref-msg-box{
          background:#fff;border:2px solid rgba(27,31,59,0.1);
          padding:20px;margin:0 auto 24px;max-width:460px;
          text-align:left;font-size:14px;color:rgba(27,31,59,0.7);
          line-height:1.6;border-radius:8px;position:relative
        }
        .ref-msg-label{
          font-family:'DM Mono',monospace;font-size:10px;font-weight:700;
          letter-spacing:.12em;text-transform:uppercase;color:rgba(27,31,59,0.35);
          margin-bottom:8px
        }

        .ref-channels{
          display:flex;gap:10px;flex-wrap:wrap;justify-content:center;
          max-width:460px;margin:0 auto
        }
        .ref-channel{
          display:flex;align-items:center;gap:6px;
          padding:12px 20px;border:2px solid #1B1F3B;
          background:#fff;cursor:pointer;
          font-family:'Syne',sans-serif;font-size:12px;font-weight:700;
          letter-spacing:.04em;text-transform:uppercase;color:#1B1F3B;
          transition:all .2s
        }
        .ref-channel:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(27,31,59,0.1)}
        .ref-channel-imessage{background:#C8FF3A}
        .ref-channel-whatsapp{background:#C8FF3A}
        .ref-channel-twitter{background:#FDF4EE}
        .ref-channel-instagram{background:#FFB7D1}
        .ref-channel-email{background:#D4B8E0}

        .ref-progress{
          display:flex;align-items:center;gap:8px;justify-content:center;
          margin-top:24px;flex-wrap:wrap
        }
        .ref-dot{
          width:36px;height:36px;border-radius:50%;
          border:2px solid #1B1F3B;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:700;transition:all .3s;
          font-family:'DM Mono',monospace
        }
        .ref-dot-filled{background:#C8FF3A;border-color:#C8FF3A}

        /* ── FAQ ── */
        .ref-faq{
          background:#1B1F3B;padding:60px 6%;
          position:relative;z-index:1
        }
        .ref-faq-inner{max-width:600px;margin:0 auto}
        .ref-faq-title{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(24px,3.5vw,36px);font-weight:400;font-style:italic;
          color:#FDF4EE;margin:0 0 32px;text-align:center
        }
        .ref-faq-item{
          border-bottom:1px solid rgba(253,244,238,0.1);
          padding:20px 0
        }
        .ref-faq-q{
          font-weight:700;font-size:15px;color:#FDF4EE;
          margin:0 0 8px;letter-spacing:.02em
        }
        .ref-faq-a{
          font-size:14px;color:rgba(253,244,238,0.55);line-height:1.6;margin:0
        }

        /* ── FINAL CTA ── */
        .ref-final{
          padding:80px 6%;text-align:center;
          position:relative;z-index:1
        }
        .ref-final-inner{max-width:600px;margin:0 auto}
        .ref-final-title{
          font-family:'Instrument Serif',Georgia,serif;
          font-size:clamp(32px,5vw,56px);font-weight:400;font-style:italic;
          color:#1B1F3B;margin:0 0 16px;line-height:1.05
        }
        .ref-final-sub{
          font-size:15px;color:rgba(27,31,59,0.55);margin:0 0 32px;line-height:1.6
        }
        .ref-final-btn{
          display:inline-block;
          background:#C8FF3A;color:#1B1F3B;
          padding:18px 44px;border:2px solid #1B1F3B;
          font-family:'Syne',system-ui,sans-serif;
          font-size:14px;font-weight:800;letter-spacing:.08em;
          text-transform:uppercase;cursor:pointer;
          transition:transform .2s,box-shadow .2s;text-decoration:none
        }
        .ref-final-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(200,255,58,0.3)}

        /* ── FOOTER ── */
        .ref-footer{background:#D4B8E0;padding:32px 6%;text-align:center;border-top:1px solid rgba(27,31,59,0.06)}
        .ref-footer-top{display:flex;justify-content:center;gap:24px;margin-bottom:16px}
        .ref-footer-top a{
          font-family:'Syne',system-ui,sans-serif;font-size:11px;font-weight:700;
          letter-spacing:.1em;text-transform:uppercase;color:#1B1F3B;
          text-decoration:none;transition:color .2s
        }
        .ref-footer-top a:hover{color:#2D4A2D}
        .ref-footer-mid{font-size:12px;color:rgba(27,31,59,0.45);margin-bottom:8px}
        .ref-footer-mid a{color:rgba(27,31,59,0.45);text-decoration:underline;transition:color .2s}
        .ref-footer-mid a:hover{color:#1B1F3B}
        .ref-footer-bot{font-family:'DM Mono',monospace;font-size:10px;color:rgba(27,31,59,0.45);letter-spacing:.08em}

        /* ── RESPONSIVE ── */
        @media(max-width:640px){
          .ref-nav{padding:0 4%;height:54px}
          .ref-nav-logo span{font-size:18px}
          .ref-hero{padding:64px 5% 56px}
          .ref-form{flex-direction:column}
          .ref-btn{width:100%}
          .ref-link-row{flex-direction:column}
          .ref-steps{flex-direction:column;align-items:center;gap:32px}
          .ref-tier-badge{width:64px;min-height:60px}
          .ref-tier-badge-num{font-size:20px}
          .ref-tier-content{padding:16px 18px}
          .ref-tier-reward{font-size:14px}
          .ref-proof{flex-direction:column;gap:24px;padding:40px 6%}
          .ref-proof-divider{width:48px;height:1px}
          .ref-channels{gap:8px}
          .ref-channel{padding:10px 16px;font-size:11px}
          .ref-footer-top{gap:16px;flex-wrap:wrap;justify-content:center}
        }
      `}</style>

      <div className="ref-page">
        {/* ═══ NAV ═══ */}
        <nav className="ref-nav" aria-label="Main navigation">
          <a href="/" className="ref-nav-logo">
            <Image src="/logo-mark.png" width={32} height={32} alt="shroom\u00e9 S" style={{ borderRadius: 6 }} priority />
            <span>shroom&eacute;</span>
          </a>
          <div className="ref-nav-links">
            <a href="/#why">Why shroom&eacute;</a>
            <a href="/#ingredients">Ingredients</a>
            <a href="/#how">How It Works</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">Blog</a>
            <a href="/recipes">Recipes</a>
          </div>
          <a href="/" className="ref-nav-cta">Get 20% off &rarr;</a>
          <MobileNav
            prefix="ref"
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

        {/* ═══ 1. HERO ═══ */}
        <section className="ref-hero">
          <div className="ref-hero-blob1" />
          <div className="ref-hero-blob2" />
          <div className="ref-hero-inner">
            <p className="ref-hero-tag">Referral Program</p>
            <h1>
              Give $5, Get $5.<br />
              <span className="lime">Everyone wins.</span>
            </h1>
            <p className="ref-hero-sub">
              Share shroom&eacute; with friends. They get $5 off their first box.
              You get $5 credit for every friend who orders. No limit.
            </p>
            <button className="ref-hero-cta" onClick={scrollToForm}>
              Get Your Referral Link &darr;
            </button>
          </div>
        </section>

        {/* ═══ 2. HOW IT WORKS ═══ */}
        <section className="ref-how">
          <div className="ref-how-inner">
            <h2 className="ref-how-title">how it works</h2>
            <p className="ref-how-sub">Three steps. Zero friction. Unlimited rewards.</p>
            <div className="ref-steps">
              <div className="ref-step">
                <p className="ref-step-num">Step 01</p>
                <div className="ref-step-icon">1</div>
                <p className="ref-step-title">Share your unique link</p>
                <p className="ref-step-desc">
                  Send it via text, post it on social, or email it directly.
                  Your link is yours forever.
                </p>
              </div>
              <div className="ref-step">
                <p className="ref-step-num">Step 02</p>
                <div className="ref-step-icon">2</div>
                <p className="ref-step-title">Friend gets $5 off</p>
                <p className="ref-step-desc">
                  Their first box ships with your code applied.
                  They save, you earn. Simple.
                </p>
              </div>
              <div className="ref-step">
                <p className="ref-step-num">Step 03</p>
                <div className="ref-step-icon">3</div>
                <p className="ref-step-title">You earn $5 credit</p>
                <p className="ref-step-desc">
                  Stacks with every friend. No cap. Refer 10 friends,
                  that&apos;s $50. Refer 100, that&apos;s $500.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 3. REWARD TIERS ═══ */}
        <section className="ref-tiers">
          <h2 className="ref-tiers-title">unlock bigger rewards</h2>
          <p className="ref-tiers-sub">The more friends you refer, the better it gets.</p>
          <div className="ref-tier-ladder">
            {tiers.map((tier, i) => (
              <div
                key={tier.count}
                className={`ref-tier${i === 3 ? " ref-tier-founder" : ""}${i === 4 ? " ref-tier-vip" : ""}`}
              >
                <div className="ref-tier-badge" style={i < 3 ? { background: tier.color } : undefined}>
                  <span className="ref-tier-badge-num">{tier.count}</span>
                  friends
                </div>
                <div className="ref-tier-content">
                  <p className="ref-tier-reward">{tier.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 4. SOCIAL PROOF ═══ */}
        <section className="ref-proof">
          <div className="ref-proof-stat">
            <p className="ref-proof-num">247</p>
            <p className="ref-proof-label">People in the referral program</p>
          </div>
          <div className="ref-proof-divider" />
          <div className="ref-proof-stat">
            <p className="ref-proof-num">34</p>
            <p className="ref-proof-label">Most referrals this month</p>
          </div>
          <div className="ref-proof-divider" />
          <div className="ref-proof-stat">
            <p className="ref-proof-num">$0</p>
            <p className="ref-proof-label">Cost to join</p>
          </div>
        </section>

        {/* ═══ 5. SHARE SECTION / FORM ═══ */}
        <section className="ref-share-section" id="ref-get-link">
          <div className="ref-share-inner">
            {step !== "done" ? (
              <>
                <h2 className="ref-share-title">get your referral link</h2>
                <p className="ref-share-sub">
                  Enter your email to generate your unique link. Already on the list? We&apos;ll find your existing code.
                </p>
                <form className="ref-form" onSubmit={handleSubmit}>
                  <input
                    className="ref-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <button className="ref-btn" type="submit" disabled={step === "loading"}>
                    {step === "loading" ? "Generating..." : "Get My Link"}
                  </button>
                </form>
              </>
            ) : (
              <div className="ref-panel">
                <h2 className="ref-panel-title">you&apos;re in. now share it.</h2>
                <p className="ref-panel-sub">Every friend who orders = $5 credit for you. Start sharing.</p>

                {referralCode && (
                  <>
                    {/* Copy link */}
                    <div className="ref-link-row">
                      <div className="ref-link-url">drinkshroome.com?ref={referralCode}</div>
                      <button className="ref-copy-btn" onClick={copyLink}>
                        {copied ? "Copied!" : "Copy Link"}
                      </button>
                    </div>

                    {/* Pre-written message */}
                    <div className="ref-msg-box">
                      <p className="ref-msg-label">Pre-written message &mdash; copy &amp; paste</p>
                      <p>{shareMsg}</p>
                    </div>

                    {/* Share channels */}
                    <div className="ref-channels">
                      <button className="ref-channel ref-channel-imessage" onClick={() => shareOn("imessage")}>
                        iMessage
                      </button>
                      <button className="ref-channel ref-channel-whatsapp" onClick={() => shareOn("whatsapp")}>
                        WhatsApp
                      </button>
                      <button className="ref-channel ref-channel-twitter" onClick={() => shareOn("twitter")}>
                        Twitter / X
                      </button>
                      <button className="ref-channel ref-channel-instagram" onClick={() => shareOn("instagram")}>
                        Instagram
                      </button>
                      <button className="ref-channel ref-channel-email" onClick={() => shareOn("email")}>
                        Email
                      </button>
                    </div>

                    {/* Progress dots */}
                    <div className="ref-progress">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className={`ref-dot ${i < referralCount ? "ref-dot-filled" : ""}`}>
                          {i < referralCount ? "\u2713" : i + 1}
                        </div>
                      ))}
                      <span style={{ fontSize: 13, color: "rgba(27,31,59,0.5)", fontWeight: 600, marginLeft: 4 }}>
                        {referralCount} friend{referralCount !== 1 ? "s" : ""} referred
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ═══ 6. FAQ ═══ */}
        <section className="ref-faq">
          <div className="ref-faq-inner">
            <h2 className="ref-faq-title">quick questions</h2>
            {faqs.map((faq) => (
              <div className="ref-faq-item" key={faq.q}>
                <p className="ref-faq-q">{faq.q}</p>
                <p className="ref-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 7. FINAL CTA ═══ */}
        <section className="ref-final">
          <div className="ref-final-inner">
            <h2 className="ref-final-title">start referring. get your link.</h2>
            <p className="ref-final-sub">
              No cap on earnings. No expiration. Just share shroom&eacute; with people who deserve better matcha.
            </p>
            <button className="ref-final-btn" onClick={scrollToForm}>
              Get Your Referral Link &uarr;
            </button>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="ref-footer">
          <div className="ref-footer-top">
            <a href="https://tiktok.com/@drinkshroome" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://instagram.com/drinkshroome" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com/@drinkshroome" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className="ref-footer-mid">
            &copy; 2026 shroom&eacute; &middot; hello@drinkshroome.com &middot;{" "}
            <a href="/privacy">Privacy Policy</a> &middot; <a href="/terms">Terms of Service</a>
          </div>
          <div className="ref-footer-bot">@drinkshroome</div>
        </footer>
      </div>
    </>
  );
}
