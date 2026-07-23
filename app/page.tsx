"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ExitPopup from "./ExitPopup";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "shroomé Liquid Ceremonial Matcha Latte",
  "description": "The liquid ceremonial matcha latte — 2.5g ceremonial-grade matcha, 200mg organic mushroom extracts (lion's mane, reishi, cordyceps), and 2g grass-fed collagen in a ready-to-pour sachet. Tear, pour over milk, go. No blender, no whisk, no mess.",
  "brand": { "@type": "Brand", "name": "shroomé" },
  "manufacturer": { "@type": "Organization", "name": "ZSQUARED INC" },
  "category": "Functional Beverages",
  "url": "https://www.drinkshroome.com",
  "image": [
    "https://www.drinkshroome.com/brand/hero-pour.jpg",
    "https://www.drinkshroome.com/sachet-vanilla.png",
    "https://www.drinkshroome.com/sachet-strawberry.png"
  ],
  "sku": "SHROOME-VARIETY-12",
  "mpn": "SHROOME-V1",
  "material": "Ceremonial Matcha, Organic Mushroom Extracts, Grass-Fed Collagen",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Caffeine Content", "value": "60mg per sachet" },
    { "@type": "PropertyValue", "name": "Ceremonial Matcha", "value": "2.5g per sachet" },
    { "@type": "PropertyValue", "name": "Organic Mushroom Extracts", "value": "200mg (lion's mane, reishi, cordyceps)" },
    { "@type": "PropertyValue", "name": "Grass-Fed Collagen", "value": "2g per sachet" },
    { "@type": "PropertyValue", "name": "Servings Per Box", "value": "12" },
    { "@type": "PropertyValue", "name": "Prep Time", "value": "30 seconds" }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/SoldOut",
    "itemCondition": "https://schema.org/NewCondition",
    "price": "36.00",
    "priceCurrency": "USD",
    "priceValidUntil": "2027-12-31",
    "url": "https://www.drinkshroome.com/drop",
    "seller": { "@type": "Organization", "name": "ZSQUARED INC" }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "12",
    "bestRating": "5",
    "worstRating": "1"
  },
  "isFamilyFriendly": true
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

/* Serif micro-label — the packaging tag/sticker type style */
const tagStyle: React.CSSProperties = {
  fontFamily: "var(--brand-font-mono)",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"email" | "captcha" | "phone" | "done">("email");
  const [loading, setLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const observers = useRef<IntersectionObserver[]>([]);

  // ── Referral system state ──
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Analytics: section visibility tracking ──
  const sectionsSeen = useRef<Set<string>>(new Set());
  const scrollMilestones = useRef<Set<number>>(new Set());
  const sessionStart = useRef(Date.now());

  // ── Detect referral code from URL ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && ref.length >= 4) {
      setReferredBy(ref.toUpperCase());
    }
  }, []);

  // ── Fetch referral stats when we have a code and are done ──
  useEffect(() => {
    if (!referralCode) return;
    fetch(`/api/referral?code=${referralCode}`)
      .then((r) => r.json())
      .then((d) => { if (typeof d.referralCount === "number") setReferralCount(d.referralCount); })
      .catch(() => {});
  }, [referralCode, step]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-anim]");
    els.forEach((el) => {
      const ob = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [el.getAttribute("data-anim")!]: true }));
            ob.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      ob.observe(el);
      observers.current.push(ob);
    });
    return () => observers.current.forEach((o) => o.disconnect());
  }, []);

  // ── Track section views (which sections users actually see) ──
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && !sectionsSeen.current.has(id)) {
            sectionsSeen.current.add(id);
            window.gtag?.("event", "section_view", {
              section_name: id,
              time_to_section: Math.round((Date.now() - sessionStart.current) / 1000),
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // ── Scroll depth tracking (25%, 50%, 75%, 100%) ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPct >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          window.gtag?.("event", "scroll_depth", { percent_scrolled: milestone });
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Time on site tracking (30s, 60s, 120s, 300s) ──
  useEffect(() => {
    const timers = [30, 60, 120, 300].map((sec) =>
      setTimeout(() => {
        window.gtag?.("event", "engaged_time", { seconds: sec });
      }, sec * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    window.gtag?.("event", "begin_checkout", { items: [{ item_name: "restock_signup" }] });
    setStep("captcha");
    // The Turnstile widget mounts in the hero form — bring it into view when
    // the submit came from the bottom CTA.
    setTimeout(() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  const onTurnstileSuccess = useCallback(async (token: string) => {
    setLoading(true);
    setCaptchaError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: token, ref: referredBy }),
      });
      const data = await res.json();
      if (data.closed) {
        setStep("done");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        // e.g. CAPTCHA rejected server-side — back to the email step so a
        // resubmit renders a fresh widget (and a fresh token).
        setCaptchaError(data.error || "Verification failed. Please try again.");
        setStep("email");
        setLoading(false);
        return;
      }
      if (data.referralCode) {
        setReferralCode(data.referralCode);
      }
    } catch {}
    setLoading(false);
    setStep("phone");
    window.gtag?.('event', 'sign_up', {
      method: 'waitlist',
      event_category: 'engagement',
      event_label: 'homepage',
    });
    window.gtag?.('event', 'generate_lead', { currency: 'USD', value: 5.00 });
  }, [email, referredBy]);

  // Load Turnstile script and render widget when captcha step is active
  useEffect(() => {
    if (step !== "captcha") return;
    const renderWidget = () => {
      if (!captchaRef.current || !window.turnstile) return;
      // Clear any existing widget
      if (widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey: (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.startsWith("REPLACE")) ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : "1x00000000000000000000AA",
        callback: onTurnstileSuccess,
        // Never submit an empty token (the API fails closed) — return to the
        // email step; resubmitting renders a fresh widget with a fresh token.
        "error-callback": () => {
          setCaptchaError("Verification failed. Please try again.");
          setStep("email");
        },
        theme: "light",
      });
    };
    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }
  }, [step, onTurnstileSuccess]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || loading) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, ref: referredBy }),
      });
    } catch {}
    setLoading(false);
    setStep("done");
    window.gtag?.('event', 'sign_up', { method: 'waitlist_phone', event_category: 'engagement', event_label: 'homepage' });
  };

  const skipPhone = () => {
    setStep("done");
    window.gtag?.('event', 'sign_up', { method: 'waitlist_email_only', event_category: 'engagement', event_label: 'homepage' });
  };

  const anim = (id: string, delay = 0) => ({
    "data-anim": id,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    } as React.CSSProperties,
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Referral helpers ──
  const referralLink = referralCode ? `https://www.drinkshroome.com?ref=${referralCode}` : "";
  const referralMessage = "I just joined the shroomé restock list — the liquid ceremonial matcha latte with lion's mane + collagen. Pour it over milk and go. Use my link and we both get extra perks:";

  const copyReferralLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
    window.gtag?.("event", "share", { method: "copy_link", content_type: "referral" });
  };

  const shareOnPlatform = (platform: string) => {
    if (!referralLink) return;
    const text = encodeURIComponent(`${referralMessage} ${referralLink}`);
    switch (platform) {
      case "instagram":
        navigator.clipboard.writeText(`${referralMessage} ${referralLink}`).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        window.open("https://instagram.com/drinkshroome", "_blank");
        break;
      case "tiktok":
        navigator.clipboard.writeText(`${referralMessage} ${referralLink}`).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        window.open("https://tiktok.com/@drinkshroome", "_blank");
        break;
      case "text":
        window.open(`sms:?&body=${text}`);
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
        break;
    }
    window.gtag?.("event", "share", { method: platform, content_type: "referral" });
  };

  // ── Shared restock form (hero + final CTA) ──
  const restockForm = (variant: "hero" | "cta") => (
    <div style={{ textAlign: variant === "cta" ? "center" : "left" }}>
      {step === "done" ? (
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--brand-ink)", marginBottom: referralCode ? 16 : 0 }}>
            ✓ You&apos;re on the restock list — 20% off locked in.
          </p>
          {referralCode && (
            <div style={{ marginTop: 16, padding: "20px", background: "rgba(var(--brand-canvas-rgb),0.75)", border: "2px solid var(--brand-ink)", borderRadius: 20 }}>
              <p style={{ ...tagStyle, fontSize: "0.72rem", color: "var(--brand-ink)", marginBottom: 8 }}>
                Refer friends → earn up to $15 credit
              </p>
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.75rem", color: "rgba(var(--brand-ink-rgb),0.6)", marginBottom: 12 }}>
                $5 credit at 1 friend, $10 at 3, $15 at 5 — applied at checkout on restock day. Share your link:
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", background: "#fff", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "10px 16px", fontFamily: "var(--brand-font-mono)", fontSize: "0.75rem", color: "var(--brand-ink)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  drinkshroome.com?ref={referralCode}
                </div>
                <button
                  onClick={copyReferralLink}
                  style={{ padding: "10px 20px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: copied ? "var(--brand-ink)" : "var(--brand-accent)", color: copied ? "var(--brand-canvas)" : "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "Instagram", platform: "instagram", bg: "var(--brand-tint-soft)" },
                  { label: "TikTok", platform: "tiktok", bg: "var(--brand-tint-blush)" },
                  { label: "Text a friend", platform: "text", bg: "var(--brand-flavor-functional)" },
                ].map((s) => (
                  <button
                    key={s.platform}
                    onClick={() => shareOnPlatform(s.platform)}
                    style={{ padding: "8px 16px", border: "2px solid var(--brand-ink)", background: s.bg, color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", borderRadius: 999 }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid var(--brand-ink)", background: i < referralCount ? "var(--brand-accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", transition: "all 0.3s" }}>
                      {i < referralCount ? "✓" : ""}
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.6)", fontWeight: 600 }}>
                  {referralCount}/3 friends joined
                </p>
              </div>
              <a
                href="/refer"
                style={{ display: "inline-block", marginTop: 14, fontFamily: "var(--brand-font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--brand-ink)", textDecoration: "underline", opacity: 0.6 }}
              >
                Share &amp; track referrals →
              </a>
            </div>
          )}
        </div>
      ) : step === "captcha" ? (
        <div>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: "var(--brand-ink)", marginBottom: 14 }}>
            Quick verification for {email}
          </p>
          <div ref={variant === "hero" ? captchaRef : undefined} style={{ marginBottom: 8, display: "flex", justifyContent: variant === "cta" ? "center" : "flex-start" }} />
          {loading && (
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.5)" }}>
              Submitting...
            </p>
          )}
        </div>
      ) : step === "phone" ? (
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: "var(--brand-ink)", marginBottom: 12 }}>
            ✓ Restock alert + 20% off locked in! Add your number for a text the second it&apos;s live — and your code upgrades from 20% to 30%.
          </p>
          <form onSubmit={handlePhoneSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              style={{ flex: "1 1 220px", padding: "15px 20px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "#fff", color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", fontWeight: 500, minWidth: 0 }}
            />
            <button type="submit" disabled={loading} style={{ padding: "15px 28px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "var(--brand-ink)", color: "var(--brand-canvas)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" }}>
              {loading ? "…" : "Text me first →"}
            </button>
          </form>
          <button onClick={skipPhone} style={{ marginTop: 10, background: "transparent", border: "none", color: "rgba(var(--brand-ink-rgb),0.5)", fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", cursor: "pointer", textDecoration: "underline" }}>
            Skip
          </button>
          <p style={{ margin: "8px 0 0", fontSize: "0.6rem", color: "rgba(var(--brand-ink-rgb),0.4)", lineHeight: 1.4, maxWidth: 400 }}>
            By providing your phone number, you agree to receive marketing texts from shroomé. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
          </p>
        </div>
      ) : (
        <div>
          <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: variant === "cta" ? "center" : "flex-start" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ flex: "1 1 220px", padding: "15px 20px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "#fff", color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", fontWeight: 500, minWidth: 0 }}
            />
            <button type="submit" disabled={loading} style={{ padding: "15px 28px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "var(--brand-ink)", color: "var(--brand-canvas)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" }}>
              {loading ? "…" : "Notify me →"}
            </button>
          </form>
          {captchaError && (
            <p role="alert" style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "#B3261E", marginTop: 10, fontWeight: 600 }}>
              {captchaError}
            </p>
          )}
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.55)", marginTop: 10 }}>
            No spam — one email when the restock opens, with your 20% code. Add your phone after and it upgrades to 30%.
          </p>
          <p style={{ ...tagStyle, fontSize: "0.62rem", color: "rgba(var(--brand-ink-rgb),0.45)", marginTop: 8 }}>
            Join 100+ on the restock list
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .flower-spin { animation: spinSlow 90s linear infinite; }
        .lift:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(45,52,26,0.12); }
        .lift { transition: transform 0.3s, box-shadow 0.3s; }
        .wobble { transition: transform 0.3s; }
        .wobble:hover { transform: rotate(-3deg) scale(1.03); }
      `}</style>

      {/* ════════════════════ MARQUEE TOP BAR ════════════════════ */}
      <div
        style={{
          background: "var(--brand-ink)",
          padding: "10px 0",
          overflow: "hidden",
          position: "relative",
          zIndex: 100,
        }}
      >
        <div className="ticker-track">
          {Array(16)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                style={{
                  ...tagStyle,
                  fontSize: "0.65rem",
                  color: i % 2 === 0 ? "var(--brand-accent)" : "rgba(var(--brand-canvas-rgb),0.75)",
                  padding: "0 48px",
                  whiteSpace: "nowrap",
                }}
              >
                {i % 4 === 0 ? "POUR. SWIRL. GO." : i % 4 === 1 ? "✿" : i % 4 === 2 ? "DROP 001 SOLD OUT — RESTOCK SOON" : "✿"}
              </span>
            ))}
        </div>
      </div>

      {/* ════════════════════ STICKY NAV ════════════════════ */}
      <nav
        aria-label="Main navigation"
        className="site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
          background: "rgba(var(--brand-canvas-rgb),0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(var(--brand-ink-rgb),0.1)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Image src="/logo-mark.png" width={34} height={34} alt="mé the shroomé sheep" priority style={{ height: 34, width: "auto" }} />
          <Image src="/brand/wordmark.png" width={128} height={28} alt="shroomé" priority style={{ height: 26, width: "auto" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "Why shroomé", id: "why" },
            { label: "Flavors", id: "flavors" },
            { label: "The Ritual", id: "how" },
            { label: "FAQ", id: "faq", href: "/faq" },
            { label: "Recipes", id: "recipes", href: "/recipes" },
            { label: "The Drop", id: "drop", href: "/drop" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => { if ((l as { href?: string }).href) { window.location.href = (l as { href: string }).href; } else { scrollTo(l.id); } }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--brand-font-body)",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--brand-ink)",
                cursor: "pointer",
                display: "none",
              }}
              className="nav-link"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo("cta"); window.gtag?.("event", "select_promotion", { promotion_name: "nav_cta_restock" }); }}
            className="nav-cta-btn"
            style={{
              background: "var(--brand-accent)",
              color: "var(--brand-ink)",
              border: "2px solid var(--brand-ink)",
              borderRadius: 999,
              padding: "10px 22px",
              fontFamily: "var(--brand-font-body)",
              fontWeight: 800,
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
            }}
          >
            Get restock alerts →
          </button>
        </div>

        {/* ── Hamburger button (mobile only) ── */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "1.6rem",
            color: "var(--brand-ink)",
            cursor: "pointer",
            padding: "4px 8px",
            lineHeight: 1,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* ── Mobile dropdown menu ── */}
        <div
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--brand-canvas)",
            maxHeight: menuOpen ? 400 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            boxShadow: menuOpen ? "0 8px 32px rgba(var(--brand-ink-rgb),0.10)" : "none",
          }}
        >
          {[
            { label: "Why shroomé", id: "why" },
            { label: "Flavors", id: "flavors" },
            { label: "The Ritual", id: "how" },
            { label: "FAQ", id: "faq", href: "/faq" },
            { label: "Recipes", id: "recipes", href: "/recipes" },
            { label: "The Drop", id: "drop", href: "/drop" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setMenuOpen(false);
                if ((l as { href?: string }).href) {
                  window.location.href = (l as { href: string }).href;
                } else {
                  scrollTo(l.id);
                }
              }}
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(var(--brand-ink-rgb),0.08)",
                width: "100%",
                padding: "16px 24px",
                fontFamily: "var(--brand-font-body)",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--brand-ink)",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              scrollTo("cta");
              window.gtag?.("event", "select_promotion", { promotion_name: "mobile_nav_cta_restock" });
            }}
            style={{
              background: "var(--brand-accent)",
              color: "var(--brand-ink)",
              border: "2px solid var(--brand-ink)",
              borderRadius: 999,
              width: "calc(100% - 48px)",
              margin: "16px 24px",
              padding: "14px 22px",
              fontFamily: "var(--brand-font-body)",
              fontWeight: 800,
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
            }}
          >
            Get restock alerts →
          </button>
        </div>
      </nav>

      {/* ════════════════════ HERO — LAVENDER FIELD, POUR SHOT ════════════════════ */}
      <section
        className="hero-section"
        style={{
          minHeight: "92vh",
          background: "var(--brand-tint-soft)",
          position: "relative",
          overflow: "hidden",
          padding: "72px 24px 90px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Pinwheel flower motifs */}
        <img
          src="/brand/pattern-flower.svg"
          alt=""
          aria-hidden
          className="flower-spin hero-flower-a"
          style={{ position: "absolute", top: "-14vw", left: "-14vw", width: "30vw", minWidth: 260, opacity: 0.85, pointerEvents: "none" }}
        />
        <img
          src="/brand/pattern-flower.svg"
          alt=""
          aria-hidden
          style={{ position: "absolute", bottom: "-18%", right: "-8%", width: "24vw", minWidth: 220, opacity: 0.55, pointerEvents: "none" }}
        />

        <div className="hero-content" style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap" }}>
          {/* Left — copy */}
          <div style={{ flex: "1 1 460px", minWidth: 300 }}>
            {referredBy && step === "email" && (
              <div
                className="fade-up"
                style={{
                  background: "var(--brand-accent)",
                  border: "2px solid var(--brand-ink)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  marginBottom: 16,
                  display: "inline-block",
                  opacity: 0,
                }}
              >
                <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.72rem", color: "var(--brand-ink)", margin: 0 }}>
                  You were referred by a friend! You both get extra perks.
                </p>
              </div>
            )}

            <p
              className="fade-up"
              style={{
                display: "inline-block",
                background: "var(--brand-accent)",
                border: "2px solid var(--brand-ink)",
                borderRadius: 999,
                padding: "8px 18px",
                transform: "rotate(-2deg)",
                ...tagStyle,
                fontSize: "0.68rem",
                color: "var(--brand-ink)",
                marginBottom: 22,
                opacity: 0,
              }}
            >
              Drop 001 sold out — restock soon
            </p>

            <h1
              className="fade-up delay-100"
              style={{
                fontFamily: "var(--brand-font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.6rem, 5.6vw, 4.3rem)",
                color: "var(--brand-ink)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                marginBottom: 8,
                opacity: 0,
              }}
            >
              Your whole
              <br />
              morning stack.
              <br />
              <span style={{ color: "var(--brand-accent-deep)" }}>One pour.</span>
            </h1>

            <p
              className="fade-up delay-200"
              style={{
                fontFamily: "var(--brand-font-body)",
                fontSize: "1rem",
                color: "rgba(var(--brand-ink-rgb),0.8)",
                lineHeight: 1.65,
                maxWidth: 440,
                margin: "22px 0",
                opacity: 0,
              }}
            >
              The liquid ceremonial matcha latte with lion&apos;s mane + collagen.{" "}
              <strong>Tear the sachet. Pour over milk. Go get charged.</strong>{" "}
              No whisk. No barista. No crash.
            </p>

            <p
              className="fade-up delay-350"
              style={{
                ...tagStyle,
                fontSize: "0.7rem",
                color: "var(--brand-accent-deep)",
                marginBottom: 26,
                opacity: 0,
              }}
            >
              energy ✿ clarity ✿ skin ✿ immunity
            </p>

            {/* Restock notify form */}
            <div className="fade-up delay-500" id="signup" style={{ maxWidth: 460, opacity: 0 }}>
              {restockForm("hero")}
            </div>

            {/* Sticker badges */}
            <div className="fade-up delay-650" style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 30, opacity: 0 }}>
              <Image src="/brand/badge-ready-to-pour.png" width={132} height={85} alt="Ready to pour" style={{ width: 118, height: "auto", transform: "rotate(-4deg)" }} />
              <Image src="/brand/badge-b-glucans.png" width={110} height={113} alt="Organic beta-glucans, lion's mane" style={{ width: 96, height: "auto", transform: "rotate(3deg)" }} />
              <Image src="/brand/badge-collagen.png" width={124} height={101} alt="With grass-fed type 1 and type 3 collagen" style={{ width: 112, height: "auto", transform: "rotate(-2deg)" }} />
              <Image src="/brand/badge-matcha.png" width={140} height={85} alt="Organic ceremonial grade matcha" style={{ width: 126, height: "auto", transform: "rotate(2deg)" }} />
            </div>
          </div>

          {/* Right — hero pour photo */}
          <div
            className="sachet-hero-wrap"
            style={{
              flex: "1 1 380px",
              minWidth: 300,
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div className="wobble" style={{ position: "relative", width: "min(100%, 420px)", transform: "rotate(1.5deg)" }}>
              <Image
                src="/brand/hero-pour.jpg"
                alt="shroomé strawberry sachet pouring vivid green matcha over milk in a bubble glass"
                width={700}
                height={1254}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 32,
                  border: "3px solid var(--brand-ink)",
                  boxShadow: "0 24px 60px rgba(45,52,26,0.25)",
                  display: "block",
                }}
              />
              <Image
                src="/brand/symbol-sheep.png"
                width={104}
                height={115}
                alt=""
                aria-hidden
                className="sachet-float"
                style={{ position: "absolute", top: -34, left: -30, width: 92, height: "auto" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 26,
                  right: -18,
                  background: "var(--brand-ink)",
                  color: "var(--brand-canvas)",
                  borderRadius: 999,
                  padding: "12px 20px",
                  transform: "rotate(3deg)",
                  ...tagStyle,
                  fontSize: "0.66rem",
                }}
              >
                Sold out — again
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ BENEFITS MARQUEE ════════════════════ */}
      <div style={{ background: "var(--brand-accent-deep)", padding: "12px 0", overflow: "hidden" }}>
        <div className="ticker-track">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                style={{
                  ...tagStyle,
                  fontSize: "0.72rem",
                  color: i % 2 === 0 ? "var(--brand-canvas)" : "var(--brand-accent)",
                  padding: "0 36px",
                  whiteSpace: "nowrap",
                }}
              >
                {["ENERGY", "✿", "CLARITY", "✿", "SKIN", "✿", "IMMUNITY", "✿", "GOOD ENERGY", "✿", "NO CRASH", "✿"][i % 12]}
              </span>
            ))}
        </div>
      </div>

      {/* ════════════════════ GOOD ENERGY LOCKUP ════════════════════ */}
      <section id="why" style={{ padding: "96px 24px 80px", background: "var(--brand-canvas)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div {...anim("lockup")} style={{ ...anim("lockup").style, maxWidth: 680, margin: "0 auto" }}>
          <Image
            src="/brand/lockup-good-energy.png"
            alt="Ready to enjoy life with good energy."
            width={840}
            height={551}
            style={{ width: "100%", maxWidth: 560, height: "auto" }}
          />
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.98rem", color: "rgba(var(--brand-ink-rgb),0.75)", lineHeight: 1.7, maxWidth: 520, margin: "28px auto 0" }}>
            We&apos;re a different animal in this space — uniting taste with real benefits,
            and lifestyle with science. Cafe-grade ceremonial matcha, functional mushrooms,
            and collagen, already blended into a liquid you pour like creamer.
          </p>
        </div>
      </section>

      {/* ════════════════════ FLAVORS — SOLD OUT CARDS ════════════════════ */}
      <section
        id="flavors"
        style={{
          padding: "90px 24px 110px",
          background: "var(--brand-canvas)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <img src="/brand/pattern-flower-vanilla.svg" alt="" aria-hidden style={{ position: "absolute", top: "-8%", right: "-6%", width: "18vw", minWidth: 180, opacity: 0.5, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
          <div {...anim("flavor-head")}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 16 }}>
              Launching with two flavors
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.05, marginBottom: 12, color: "var(--brand-ink)", letterSpacing: "-0.02em" }}>
              Pick your pour.
            </h2>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-ink-rgb),0.65)", marginBottom: 48 }}>
              Both sold out in 9 days. Restock list gets them first.
            </p>
          </div>

          <div className="flavor-cards-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { src: "/sachet-vanilla.png", name: "Vanilla", note: "Warm · Smooth · Everyday", href: "/flavors/vanilla", bg: "var(--brand-flavor-functional)", me: "/brand/me-04.png", meStyle: { top: 14, left: 14, width: 74, transform: "rotate(-10deg)" }, alt: "shroomé Vanilla liquid ceremonial matcha latte sachet" },
              { src: "/sachet-strawberry.png", name: "Strawberry", note: "Bright · Fruity · Loud", href: "/flavors/strawberry", bg: "var(--brand-tint-blush)", me: "/brand/me-02.png", meStyle: { top: 18, left: 16, width: 80, transform: "rotate(8deg)" }, alt: "shroomé Strawberry liquid ceremonial matcha latte sachet" },
            ].map((f, i) => (
              <a key={f.name} href={f.href} {...anim(`flavor-${i}`, i * 0.12)} style={{ ...anim(`flavor-${i}`, i * 0.12).style, textDecoration: "none", color: "inherit" }}>
                <div className="lift" style={{ background: f.bg, border: "3px solid var(--brand-ink)", borderRadius: 32, padding: "28px 16px 26px", position: "relative", overflow: "hidden" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 18,
                      right: 18,
                      zIndex: 2,
                      background: "var(--brand-ink)",
                      color: "var(--brand-canvas)",
                      borderRadius: 999,
                      padding: "8px 16px",
                      transform: "rotate(6deg)",
                      ...tagStyle,
                      fontSize: "0.6rem",
                    }}
                  >
                    Sold out
                  </div>
                  <Image
                    src={f.me}
                    alt=""
                    aria-hidden
                    width={120}
                    height={120}
                    loading="lazy"
                    style={{ position: "absolute", height: "auto", zIndex: 2, ...f.meStyle } as React.CSSProperties}
                  />
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={612}
                    height={1278}
                    loading="lazy"
                    style={{ width: "72%", maxWidth: 330, height: "auto", display: "block", margin: "0 auto", filter: "drop-shadow(0 22px 34px rgba(45,52,26,0.28))" }}
                  />
                  <h3 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "1.7rem", margin: "22px 0 6px", color: "var(--brand-ink)" }}>{f.name}</h3>
                  <p style={{ ...tagStyle, fontSize: "0.62rem", color: "rgba(var(--brand-ink-rgb),0.65)" }}>{f.note}</p>
                  <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-ink)", marginTop: 14, textDecoration: "underline" }}>
                    See the flavor →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ THE RITUAL — POUR. SWIRL. GO. ════════════════════ */}
      <section id="how" style={{ padding: "100px 24px", background: "var(--brand-accent-deep)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <div {...anim("how-head")}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-canvas)", opacity: 0.85, marginBottom: 16 }}>
              Making your shroomé
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--brand-canvas)", lineHeight: 1.05, marginBottom: 56, letterSpacing: "-0.02em" }}>
              Pour. Swirl. Go.
            </h2>
          </div>

          <div {...anim("how-card", 0.15)} style={{ ...anim("how-card", 0.15).style, background: "var(--brand-canvas)", border: "3px solid var(--brand-ink)", borderRadius: 36, padding: "48px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 36 }}>
            {[
              { img: "/brand/sheep-sachet.png", num: "1. Tear", desc: "Rip open one sachet. That's your perfectly measured dose." },
              { img: "/brand/sheep-swirl.png", num: "2. Pour", desc: "Over your milk of choice. Oat, almond, coconut, dairy. Hot or iced." },
              { img: "/brand/sheep-drink.png", num: "3. Go", desc: "Stir once. 30 seconds to cafe-grade matcha latte. No blender, no whisk, no mess." },
            ].map((s, i) => (
              <div key={s.num} {...anim(`step-${i}`, 0.2 + i * 0.12)}>
                <Image src={s.img} alt="" aria-hidden width={140} height={140} loading="lazy" style={{ width: 96, height: 96, objectFit: "contain", margin: "0 auto 18px", display: "block" }} />
                <h3 style={{ ...tagStyle, fontSize: "0.9rem", color: "var(--brand-accent-deep)", marginBottom: 10 }}>{s.num}</h3>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.88rem", color: "rgba(var(--brand-ink-rgb),0.75)", lineHeight: 1.65, maxWidth: 260, margin: "0 auto" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ INGREDIENTS / STATS ════════════════════ */}
      <section
        id="ingredients"
        style={{ padding: "100px 24px", background: "var(--brand-tint-soft)", position: "relative", overflow: "hidden" }}
      >
        <img src="/brand/pattern-flower.svg" alt="" aria-hidden style={{ position: "absolute", bottom: "-14%", left: "-7%", width: "20vw", minWidth: 200, opacity: 0.45, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("ing-head")} style={{ ...anim("ing-head").style, textAlign: "center", marginBottom: 48 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-ink)", marginBottom: 16 }}>
              What&apos;s inside
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--brand-ink)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Clean label. Real doses.
            </h2>
          </div>

          {/* Stat strip — mirrors the sachet back panel */}
          <div {...anim("stats", 0.1)} style={{ ...anim("stats", 0.1).style, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
            {[
              { dose: "60mg", label: "Caffeine" },
              { dose: "2.5g", label: "Ceremonial Matcha" },
              { dose: "200mg", label: "Organic Mushroom Extracts" },
              { dose: "2g", label: "Grass-Fed Collagen" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--brand-canvas)", border: "2px solid var(--brand-ink)", borderRadius: 20, padding: "20px 14px", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1.7rem", color: "var(--brand-accent-deep)", lineHeight: 1.1 }}>{s.dose}</p>
                <p style={{ ...tagStyle, fontSize: "0.58rem", color: "rgba(var(--brand-ink-rgb),0.7)", marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { icon: "/brand/icon-whisk.png", name: "Ceremonial Matcha", detail: "First-harvest, shade-grown, stone-ground. Vivid jade color, zero bitterness — the real thing, not culinary grade." },
              { icon: "/brand/icon-mushrooms.png", name: "Functional Mushrooms", detail: "Lion's mane, reishi, and cordyceps extracts with organic β-glucans — clarity and immunity without the mushroom taste." },
              { icon: "/brand/icon-molecule.png", name: "Grass-Fed Collagen", detail: "Type 1 & 3 collagen pre-dissolved into the liquid — silky texture in the glass, skin-deep benefits after." },
            ].map((item, i) => (
              <div
                key={item.name}
                className="lift"
                {...anim(`ing-${i}`, i * 0.1)}
                style={{
                  ...anim(`ing-${i}`, i * 0.1).style,
                  padding: "32px 28px",
                  background: "var(--brand-ink)",
                  borderRadius: 28,
                  textAlign: "left",
                }}
              >
                <Image src={item.icon} alt="" aria-hidden width={64} height={64} loading="lazy" style={{ width: 52, height: 52, objectFit: "contain", marginBottom: 16, filter: "invert(1) brightness(1.6)" }} />
                <p style={{ ...tagStyle, fontSize: "0.72rem", color: "var(--brand-accent)", marginBottom: 12 }}>{item.name}</p>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.85rem", color: "rgba(var(--brand-canvas-rgb),0.72)", lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.55)", textAlign: "center", marginTop: 26, lineHeight: 1.6 }}>
            Ingredients: Ceremonial Grade Matcha (organic), Lion&apos;s Mane Mushroom Extract, Reishi Mushroom Extract,
            Cordyceps Mushroom Extract, Collagen Peptides (Hydrolyzed), Natural Flavor.
          </p>
        </div>
      </section>

      {/* ════════════════════ COMPARISON TABLE ════════════════════ */}
      <section style={{ padding: "90px 24px", background: "var(--brand-canvas)", color: "var(--brand-ink)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("comp-head")} style={{ ...anim("comp-head").style, textAlign: "center", marginBottom: 44 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 16 }}>
              How we compare
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.1, color: "var(--brand-ink)", letterSpacing: "-0.02em" }}>
              Not all matcha is created equal.
            </h2>
          </div>

          <div {...anim("comp-table", 0.15)} style={{ ...anim("comp-table", 0.15).style, background: "var(--brand-ink)", borderRadius: 28, padding: "8px 0", boxShadow: "0 4px 30px rgba(45,52,26,0.25)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", minWidth: 580, borderCollapse: "collapse", fontFamily: "var(--brand-font-body)", fontSize: "0.85rem" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "14px 18px", borderBottom: "1px solid rgba(var(--brand-canvas-rgb),0.1)", color: "rgba(var(--brand-canvas-rgb),0.45)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}></th>
                    {["shroomé", "Clevr", "RYZE", "MatchaKo", "Cafe"].map((b) => (
                      <th key={b} style={{ textAlign: "center", padding: "14px 10px", borderBottom: "1px solid rgba(var(--brand-canvas-rgb),0.1)", color: b === "shroomé" ? "var(--brand-accent)" : "rgba(var(--brand-canvas-rgb),0.45)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{b}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Ceremonial matcha", values: [true, false, false, true, true] },
                    { feature: "Collagen", values: [true, false, false, false, false] },
                    { feature: "Functional mushrooms", values: [true, true, true, false, false] },
                    { feature: "Liquid — ready to pour", values: [true, false, false, false, true] },
                    { feature: "Lives in your bag", values: [true, true, true, true, false] },
                  ].map((row) => (
                    <tr key={row.feature}>
                      <td style={{ padding: "16px 18px", borderBottom: "1px solid rgba(var(--brand-canvas-rgb),0.06)", color: "var(--brand-canvas)", fontWeight: 600, fontSize: "0.85rem" }}>{row.feature}</td>
                      {row.values.map((v, i) => (
                        <td key={i} style={{ textAlign: "center", padding: "16px 10px", borderBottom: "1px solid rgba(var(--brand-canvas-rgb),0.06)" }}>
                          <span style={{ display: "inline-block", width: 34, height: 34, lineHeight: "34px", borderRadius: "50%", fontSize: "1rem", fontWeight: 700, background: v ? "rgba(var(--brand-accent-rgb),0.25)" : "rgba(var(--brand-canvas-rgb),0.05)", color: v ? "var(--brand-accent)" : "rgba(var(--brand-canvas-rgb),0.2)" }}>
                            {v ? "✓" : "—"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p {...anim("comp-anchor", 0.25)} style={{ ...anim("comp-anchor", 0.25).style, textAlign: "center", marginTop: 24, fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", color: "var(--brand-ink)", fontWeight: 600 }}>
            One pour = <span style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, color: "var(--brand-accent-deep)" }}>$3.00</span>.
            Your cafe matcha = <span style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, textDecoration: "line-through", opacity: 0.6 }}>$7</span>.
            Same ceremonial grade — plus the stack.
          </p>
        </div>
      </section>

      {/* ════════════════════ OUR VIBE IS MATCHA-IN — LIFESTYLE ════════════════════ */}
      <section style={{ padding: "90px 24px 100px", background: "var(--brand-accent)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("vibe-head")} style={{ ...anim("vibe-head").style, textAlign: "center", marginBottom: 44 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-ink)", marginBottom: 14 }}>
              @drinkshroome
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4.6vw, 3.2rem)", color: "var(--brand-ink)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Our vibe is matcha-in.
            </h2>
          </div>

          <div {...anim("vibe-grid", 0.15)} style={{ ...anim("vibe-grid", 0.15).style, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {[
              { src: "/brand/ig-matcha-in.jpg", alt: "Friends at a picnic — our vibe is matcha-in" },
              { src: "/brand/ig-glow-skin.jpg", alt: "Glow and skin — smiling model in sunlight" },
              { src: "/brand/ready-to-glow.jpg", alt: "Ready to glow — iced matcha close-up" },
              { src: "/brand/cup-logo.jpg", alt: "Iced shroomé matcha latte in a branded cup" },
            ].map((g, i) => (
              <div key={g.src} className="wobble" style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={500}
                  height={625}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: 24, border: "3px solid var(--brand-ink)", display: "block", background: "var(--brand-canvas)" }}
                />
              </div>
            ))}
          </div>

          <div {...anim("vibe-cta", 0.25)} style={{ ...anim("vibe-cta", 0.25).style, textAlign: "center", marginTop: 36 }}>
            <a
              href="https://instagram.com/drinkshroome"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "var(--brand-canvas)", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "12px 26px", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-ink)", textDecoration: "none" }}
            >
              Follow the flock →
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section style={{ padding: "90px 24px", background: "var(--brand-canvas)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("test-head")} style={{ ...anim("test-head").style, textAlign: "center", marginBottom: 44 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 16 }}>
              Drop 001 reviews
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "var(--brand-ink)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              The flock has spoken.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { quote: "I replaced my $7 oat milk latte with this. Tastes better, costs less, and I actually feel focused.", name: "Sarah M.", loc: "Austin, TX", bg: "var(--brand-tint-soft)" },
              { quote: "The strawberry one is insane. The pour is genuinely the prettiest thing in my kitchen.", name: "Mike R.", loc: "Brooklyn, NY", bg: "var(--brand-tint-blush)" },
              { quote: "Finally a matcha that doesn't taste like grass. The vanilla is my daily non-negotiable.", name: "Jess L.", loc: "Portland, OR", bg: "var(--brand-flavor-functional)" },
            ].map((t, i) => (
              <div
                key={t.name}
                className="lift"
                {...anim(`test-${i}`, i * 0.1)}
                style={{
                  ...anim(`test-${i}`, i * 0.1).style,
                  padding: "28px 24px",
                  background: t.bg,
                  border: "2px solid var(--brand-ink)",
                  borderRadius: 28,
                }}
              >
                <p aria-label="5 out of 5 stars" style={{ color: "var(--brand-accent-deep)", fontSize: "0.95rem", letterSpacing: "0.15em", marginBottom: 12 }}>★★★★★</p>
                <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "1rem", color: "var(--brand-ink)", lineHeight: 1.55, marginBottom: 20 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{ ...tagStyle, fontSize: "0.68rem", color: "var(--brand-ink)" }}>{t.name}</p>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)" }}>{t.loc} · Drop 001</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FINAL CTA — SOLD OUT / NOTIFY ════════════════════ */}
      <section
        id="cta"
        style={{
          padding: "100px 24px 90px",
          background: "var(--brand-tint-soft)",
          color: "var(--brand-ink)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img src="/brand/pattern-flower.svg" alt="" aria-hidden className="flower-spin" style={{ position: "absolute", top: "-20%", right: "-10%", width: "30vw", minWidth: 260, opacity: 0.8, pointerEvents: "none" }} />
        <img src="/brand/pattern-flower-vanilla.svg" alt="" aria-hidden style={{ position: "absolute", bottom: "-16%", left: "-8%", width: "20vw", minWidth: 180, opacity: 0.55, pointerEvents: "none" }} />

        <div {...anim("cta-block")} style={{ ...anim("cta-block").style, maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Image src="/brand/symbol-sheep.png" width={72} height={80} alt="" aria-hidden style={{ width: 64, height: "auto", margin: "0 auto 18px", display: "block" }} />
          <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-ink)", marginBottom: 14 }}>
            Drop 001 · 500 boxes · gone in 9 days
          </p>
          <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.05, marginBottom: 14, color: "var(--brand-ink)", letterSpacing: "-0.02em" }}>
            Sold out. Not gone.
          </h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-ink-rgb),0.7)", lineHeight: 1.65, marginBottom: 28 }}>
            The restock list hears about Drop 002 before anyone else — with 20% off locked in,
            and 30% if you add your number. When it&apos;s gone, it&apos;s gone.
          </p>
          {restockForm("cta")}
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer style={{ background: "var(--brand-ink)", color: "var(--brand-canvas)", padding: "70px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Image src="/brand/wordmark-cream.png" width={300} height={65} alt="shroomé" loading="lazy" style={{ width: 240, height: "auto", margin: "0 auto 18px" }} />
          <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent)", marginBottom: 32 }}>
            Pour. Swirl. Go.
          </p>

          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 26, flexWrap: "wrap" }}>
            {[
              { label: "TIKTOK", href: "https://tiktok.com/@drinkshroome" },
              { label: "INSTAGRAM", href: "https://instagram.com/drinkshroome" },
              { label: "YOUTUBE", href: "https://youtube.com/@drinkshroome" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--brand-canvas)", textDecoration: "none" }}>
                {s.label}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-canvas-rgb),0.55)", letterSpacing: "0.08em" }}>
            © 2026 shroomé · ZSQUARED INC · hello@drinkshroome.com
          </p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.62rem", color: "rgba(var(--brand-canvas-rgb),0.4)", marginTop: 10 }}>
            <a href="/privacy" style={{ color: "rgba(var(--brand-canvas-rgb),0.55)", textDecoration: "underline" }}>Privacy Policy</a>
            {" · "}
            <a href="/terms" style={{ color: "rgba(var(--brand-canvas-rgb),0.55)", textDecoration: "underline" }}>Terms of Service</a>
            {" · "}
            <a href="/faq" style={{ color: "rgba(var(--brand-canvas-rgb),0.55)", textDecoration: "underline" }}>FAQ</a>
            {" · "}
            <a href="/blog" style={{ color: "rgba(var(--brand-canvas-rgb),0.55)", textDecoration: "underline" }}>Blog</a>
            {" · "}
            <a href="/recipes" style={{ color: "rgba(var(--brand-canvas-rgb),0.55)", textDecoration: "underline" }}>Recipes</a>
          </p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.6rem", color: "rgba(var(--brand-canvas-rgb),0.35)", marginTop: 8 }}>
            @drinkshroome
          </p>
        </div>
      </footer>

      {/* Exit-intent popup */}
      <ExitPopup />
    </>
  );
}
