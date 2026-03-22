"use client";
import { useState } from "react";
import MobileNav from "../MobileNav";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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
    } catch {}
    setStep("done");
  };

  const referralLink = referralCode ? `https://www.drinkshroome.com?ref=${referralCode}` : "";

  const copyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
    window.gtag?.("event", "share", { method: "copy_link", content_type: "referral" });
  };

  const shareOn = (platform: string) => {
    if (!referralLink) return;
    const msg = encodeURIComponent(
      `I just joined the shroomé waitlist — the world's first ready-to-pour matcha latte. Use my link for extra perks: ${referralLink}`
    );
    const url = encodeURIComponent(referralLink);
    switch (platform) {
      case "text":
        window.open(`sms:?&body=${msg}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${msg}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${msg}`, "_blank");
        break;
      case "email":
        window.open(`mailto:?subject=${encodeURIComponent("You need to try this matcha")}&body=${msg}`, "_blank");
        break;
    }
    window.gtag?.("event", "share", { method: platform, content_type: "referral" });
  };

  return (
    <>
      <style>{`
        .ref-page { min-height: 100vh; background: #FDF4EE; font-family: 'Syne', system-ui, sans-serif; color: #1B1F3B; }
        .ref-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 6%; height: 60px; border-bottom: 1px solid rgba(27,31,59,0.06); position: relative; }
        .ref-nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #1B1F3B; }
        .ref-nav-logo span { font-family: 'Instrument Serif', Georgia, serif; font-size: 22px; font-style: italic; }
        .ref-nav-cta { background: #1B1F3B; color: #FDF4EE; padding: 10px 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; transition: background 0.2s; }
        .ref-nav-cta:hover { background: #2a2e4f; }

        .ref-hero { text-align: center; padding: 80px 6% 60px; position: relative; overflow: hidden; }
        .ref-blob-1 { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: #D4B8E0; opacity: 0.3; top: -80px; right: 10%; }
        .ref-blob-2 { position: absolute; width: 200px; height: 200px; border-radius: 50%; background: #FFB7D1; opacity: 0.25; bottom: -40px; left: 15%; }
        .ref-hero-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .ref-tag { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(27,31,59,0.5); margin-bottom: 24px; }
        .ref-h1 { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(36px, 5vw, 56px); font-weight: 400; line-height: 1.05; margin: 0 0 20px; color: #2D4A2D; }
        .ref-h1 em { font-style: italic; color: #FF7043; }
        .ref-sub { font-size: 15px; color: rgba(27,31,59,0.6); line-height: 1.7; max-width: 480px; margin: 0 auto 40px; }

        .ref-how { background: #1B1F3B; padding: 60px 6%; }
        .ref-how-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .ref-how-title { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(28px, 4vw, 40px); font-weight: 400; font-style: italic; color: #FDF4EE; margin: 0 0 40px; }
        .ref-steps { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; }
        .ref-step { flex: 1; min-width: 200px; max-width: 220px; text-align: center; }
        .ref-step-num { width: 48px; height: 48px; border-radius: 50%; background: #C8FF3A; color: #1B1F3B; font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .ref-step-title { font-weight: 700; font-size: 14px; color: #FDF4EE; letter-spacing: 0.04em; margin-bottom: 8px; }
        .ref-step-desc { font-size: 13px; color: rgba(253,244,238,0.5); line-height: 1.6; }

        .ref-perks { padding: 60px 6%; text-align: center; }
        .ref-perks-title { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(24px, 3.5vw, 36px); font-weight: 400; font-style: italic; color: #1B1F3B; margin: 0 0 32px; }
        .ref-perks-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; max-width: 800px; margin: 0 auto; }
        .ref-perk-card { background: #fff; border: 1px solid rgba(27,31,59,0.08); border-radius: 12px; padding: 28px 24px; flex: 1; min-width: 200px; max-width: 250px; text-align: center; }
        .ref-perk-emoji { font-size: 28px; margin-bottom: 12px; }
        .ref-perk-label { font-weight: 700; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: #1B1F3B; margin-bottom: 6px; }
        .ref-perk-desc { font-size: 13px; color: rgba(27,31,59,0.5); line-height: 1.5; }

        .ref-cta { background: #D4B8E0; padding: 60px 6%; text-align: center; }
        .ref-cta-inner { max-width: 480px; margin: 0 auto; }
        .ref-cta-title { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(28px, 4vw, 40px); font-weight: 400; font-style: italic; color: #1B1F3B; margin: 0 0 12px; }
        .ref-cta-sub { font-size: 14px; color: rgba(27,31,59,0.6); margin: 0 0 28px; }
        .ref-form { display: flex; gap: 8px; max-width: 420px; margin: 0 auto; }
        .ref-input { flex: 1; padding: 14px 16px; border: 2px solid #1B1F3B; border-radius: 0; font-size: 14px; font-family: 'Syne', sans-serif; background: #fff; color: #1B1F3B; outline: none; }
        .ref-input:focus { border-color: #C8FF3A; }
        .ref-btn { padding: 14px 24px; background: #1B1F3B; color: #FDF4EE; border: none; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; white-space: nowrap; font-family: 'Syne', sans-serif; transition: background 0.2s; }
        .ref-btn:hover { background: #2a2e4f; }
        .ref-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ref-share { max-width: 480px; margin: 24px auto 0; }
        .ref-share-link { display: flex; gap: 8px; align-items: center; margin-bottom: 16px; }
        .ref-share-url { flex: 1; background: #fff; border: 2px solid #1B1F3B; padding: 12px 14px; font-family: 'DM Mono', monospace; font-size: 13px; color: #1B1F3B; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ref-copy-btn { padding: 12px 20px; border: none; background: #C8FF3A; color: #1B1F3B; font-weight: 800; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; font-family: 'Syne', sans-serif; transition: all 0.2s; white-space: nowrap; }
        .ref-share-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .ref-share-btn { padding: 10px 18px; border: none; border-radius: 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer; font-family: 'Syne', sans-serif; color: #1B1F3B; transition: transform 0.2s; }
        .ref-share-btn:hover { transform: translateY(-2px); }
        .ref-progress { display: flex; align-items: center; gap: 10px; justify-content: center; margin-top: 20px; }
        .ref-dot { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #1B1F3B; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; transition: all 0.3s; }
        .ref-dot-filled { background: #C8FF3A; }

        .ref-footer { text-align: center; padding: 24px 6%; font-size: 12px; color: rgba(27,31,59,0.35); }
        .ref-footer a { color: rgba(27,31,59,0.35); text-decoration: underline; }

        @media(max-width:640px) {
          .ref-hero { padding: 48px 5% 40px; }
          .ref-form { flex-direction: column; }
          .ref-btn { width: 100%; }
          .ref-share-link { flex-direction: column; }
          .ref-steps { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="ref-page">
        {/* Nav */}
        <nav className="ref-nav">
          <a href="/" className="ref-nav-logo">
            <img src="/logo-mark.png" width={32} height={32} alt="shroomé S" style={{ borderRadius: 6 }} />
            <span>shroomé</span>
          </a>
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

        {/* Hero */}
        <section className="ref-hero">
          <div className="ref-blob-1" />
          <div className="ref-blob-2" />
          <div className="ref-hero-inner">
            <p className="ref-tag">Referral Program</p>
            <h1 className="ref-h1">
              Share shroomé.<br /><em>Stack your discount.</em>
            </h1>
            <p className="ref-sub">
              Share your unique link with friends. When 3 friends join the waitlist,
              you unlock an extra 10% off — for a total of 30% off + free shipping at launch.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="ref-how">
          <div className="ref-how-inner">
            <h2 className="ref-how-title">how it works</h2>
            <div className="ref-steps">
              <div className="ref-step">
                <div className="ref-step-num">1</div>
                <p className="ref-step-title">Join the list</p>
                <p className="ref-step-desc">Enter your email below to get your unique referral link.</p>
              </div>
              <div className="ref-step">
                <div className="ref-step-num">2</div>
                <p className="ref-step-title">Share your link</p>
                <p className="ref-step-desc">Text it, post it, DM it. Every friend who signs up counts.</p>
              </div>
              <div className="ref-step">
                <div className="ref-step-num">3</div>
                <p className="ref-step-title">Stack your discount</p>
                <p className="ref-step-desc">3 friends = extra 10% off. That&apos;s 30% off + free shipping at launch.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="ref-perks">
          <h2 className="ref-perks-title">what they get, what you get</h2>
          <div className="ref-perks-grid">
            <div className="ref-perk-card">
              <p className="ref-perk-emoji">🎁</p>
              <p className="ref-perk-label">Your friend gets</p>
              <p className="ref-perk-desc">20% off + free shipping on their first box when they use your link.</p>
            </div>
            <div className="ref-perk-card">
              <p className="ref-perk-emoji">🍵</p>
              <p className="ref-perk-label">You get</p>
              <p className="ref-perk-desc">After 3 friends join: extra 10% off stacked on your existing discount.</p>
            </div>
            <div className="ref-perk-card">
              <p className="ref-perk-emoji">💚</p>
              <p className="ref-perk-label">Both of you</p>
              <p className="ref-perk-desc">Early access to new flavors, exclusive drops, and launch-day priority.</p>
            </div>
          </div>
        </section>

        {/* CTA / Signup + Share */}
        <section className="ref-cta">
          <div className="ref-cta-inner">
            {step !== "done" ? (
              <>
                <h2 className="ref-cta-title">get your link</h2>
                <p className="ref-cta-sub">Already on the list? Enter your email to get your referral link.</p>
                <form className="ref-form" onSubmit={handleSubmit}>
                  <input
                    className="ref-input"
                    type="email"
                    placeholder="your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="ref-btn" type="submit" disabled={step === "loading"}>
                    {step === "loading" ? "..." : "Get link"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="ref-cta-title">you&apos;re ready to share 💚</h2>
                <p className="ref-cta-sub">Send your link to friends. We&apos;ll track signups automatically.</p>
                {referralCode && (
                  <div className="ref-share">
                    <div className="ref-share-link">
                      <div className="ref-share-url">drinkshroome.com?ref={referralCode}</div>
                      <button className="ref-copy-btn" onClick={copyLink}>
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="ref-share-btns">
                      <button className="ref-share-btn" style={{ background: "#C8FF3A" }} onClick={() => shareOn("text")}>
                        📱 Text
                      </button>
                      <button className="ref-share-btn" style={{ background: "#FFB7D1" }} onClick={() => shareOn("whatsapp")}>
                        💬 WhatsApp
                      </button>
                      <button className="ref-share-btn" style={{ background: "#D4B8E0" }} onClick={() => shareOn("twitter")}>
                        𝕏 Twitter
                      </button>
                      <button className="ref-share-btn" style={{ background: "#FDF4EE" }} onClick={() => shareOn("email")}>
                        ✉️ Email
                      </button>
                    </div>
                    <div className="ref-progress">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className={`ref-dot ${i < referralCount ? "ref-dot-filled" : ""}`}>
                          {i < referralCount ? "✓" : ""}
                        </div>
                      ))}
                      <span style={{ fontSize: 13, color: "rgba(27,31,59,0.5)", fontWeight: 600 }}>
                        {referralCount}/3 friends joined
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="ref-footer">
          <p>
            © 2026 shroomé · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · hello@drinkshroome.com
          </p>
        </footer>
      </div>
    </>
  );
}
