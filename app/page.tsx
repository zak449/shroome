"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "shroomé Liquid Ceremonial Matcha Latte",
  "description": "The liquid ceremonial matcha latte: 2.5g ceremonial-grade matcha, 200mg organic lion's mane beta-glucans, and 2g grass-fed collagen in a sachet. Tear, pour over milk, go. No blender, no whisk, no mess.",
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
    { "@type": "PropertyValue", "name": "Organic Mushroom Extracts", "value": "200mg (organic lion's mane beta-glucans)" },
    { "@type": "PropertyValue", "name": "Grass-Fed Collagen", "value": "2g per sachet" },
    { "@type": "PropertyValue", "name": "Servings Per Box", "value": "12" },
    { "@type": "PropertyValue", "name": "Prep Time", "value": "One stir" }
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
  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [step, setStep] = useState<"email" | "captcha" | "phone" | "city" | "done">("email");
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
  const [gateBox, setGateBox] = useState<string | null>(null);
  const [flockOpen, setFlockOpen] = useState(false);

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
    // The Turnstile widget mounts in the hero form (or in the Flock modal when
    // it is open) — bring the hero into view when the submit came from the
    // bottom CTA.
    if (!flockOpen) {
      setTimeout(() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
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
    // Two tiers: the Flock modal is the DEEP membership flow (phone + profile);
    // inline forms are LIGHT (email only) and finish here with an upsell.
    setStep(flockOpen ? "phone" : "done");
    window.gtag?.('event', 'sign_up', {
      method: flockOpen ? 'waitlist' : 'waitlist_email_only',
      event_category: 'engagement',
      event_label: 'homepage',
    });
    window.gtag?.('event', 'generate_lead', { currency: 'USD', value: 5.00 });
  }, [email, referredBy, flockOpen]);

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
    setStep("city");
    window.gtag?.('event', 'sign_up', { method: 'waitlist_phone', event_category: 'engagement', event_label: 'homepage' });
  };

  const skipPhone = () => {
    setStep("city");
    window.gtag?.('event', 'sign_up', { method: 'waitlist_email_only', event_category: 'engagement', event_label: 'homepage' });
  };

  const handleCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!firstName.trim() && !city.trim()) {
      setStep("done");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: firstName, city, ref: referredBy, tier: "deep" }),
      });
    } catch {}
    setLoading(false);
    setStep("done");
    window.gtag?.('event', 'sign_up', { method: 'waitlist_profile', event_category: 'engagement', event_label: 'homepage' });
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
  const referralMessage = "I just joined the Flock. shroomé's the liquid ceremonial matcha latte with lion's mane + collagen: pour it over milk and go. The next run opens for us a day early. Use my link and we both get extra perks:";

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
  const restockForm = (variant: "hero" | "cta" | "flock") => (
    <div style={{ textAlign: variant === "cta" ? "center" : "left" }}>
      {step === "done" ? (
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: referralCode ? 16 : 0 }}>
            <Image src="/brand/sheep-drink.png" alt="" aria-hidden width={64} height={76} style={{ width: 54, height: "auto" }} />
            <div>
              <p style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--brand-ink)", letterSpacing: "-0.01em" }}>
                Welcome to the flock.
              </p>
              <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.8rem", color: "rgba(var(--brand-ink-rgb),0.65)" }}>
                You&apos;re in. The next run opens for you a full day before the public link.
              </p>
            </div>
          </div>
          {!phone.trim() && variant !== "flock" && (
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.76rem", color: "rgba(var(--brand-ink-rgb),0.65)", marginTop: 12 }}>
              Want more than the date?{" "}
              <button
                onClick={() => { setStep("phone"); setFlockOpen(true); window.gtag?.("event", "select_promotion", { promotion_name: "light_done_flock_upsell" }); }}
                style={{ background: "none", border: "none", padding: 0, color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.76rem", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}
              >
                Join the Flock →
              </button>{" "}
              Shop a day early, vote on flavors, member-only merch.
            </p>
          )}
          {referralCode && (
            <div style={{ marginTop: 16, padding: "20px", background: "rgba(var(--brand-canvas-rgb),0.75)", border: "2px solid var(--brand-ink)", borderRadius: 20 }}>
              <p style={{ ...tagStyle, fontSize: "0.72rem", color: "var(--brand-ink)", marginBottom: 8 }}>
                Refer friends → earn up to $15 credit
              </p>
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.75rem", color: "rgba(var(--brand-ink-rgb),0.6)", marginBottom: 12 }}>
                Bring the group chat. Matcha money lands on your account for every friend who joins, ready to spend on drop day. Share your link:
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", background: "#fff", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "10px 16px", fontFamily: "var(--brand-font-mono)", fontSize: "0.75rem", color: "var(--brand-ink)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  drinkshroome.com?ref={referralCode}
                </div>
                <button
                  onClick={copyReferralLink}
                  style={{ padding: "10px 20px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: copied ? "var(--brand-ink)" : "var(--brand-accent)", color: "var(--brand-canvas)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "Instagram", platform: "instagram", bg: "var(--brand-tint-soft)" },
                  { label: "TikTok", platform: "tiktok", bg: "var(--brand-canvas)" },
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
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid var(--brand-ink)", background: i < referralCount ? "var(--brand-accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: i < referralCount ? "var(--brand-canvas)" : "var(--brand-ink)", fontFamily: "var(--brand-font-body)", transition: "all 0.3s" }}>
                      {i < referralCount ? "✓" : ""}
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.6)", fontWeight: 600 }}>
                  {referralCount}/5 friends in · $15 is the cap
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
          <div ref={(flockOpen ? variant === "flock" : variant === "hero") ? captchaRef : undefined} style={{ marginBottom: 8, display: "flex", justifyContent: variant === "cta" ? "center" : "flex-start" }} />
          {loading && (
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.5)" }}>
              Submitting...
            </p>
          )}
        </div>
      ) : step === "phone" ? (
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: "var(--brand-ink)", marginBottom: 12 }}>
            ✓ You&apos;re in. Add your number and the drop hits your phone the second your early window opens. You&apos;ll be pouring before the link is even public.
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
      ) : step === "city" ? (
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.82rem", color: "var(--brand-ink)", marginBottom: 12 }}>
            ✓ You&apos;re in the Flock. One last thing, totally optional: tell us who&apos;s pouring and where, so your box (and future pop-ups) land close to home.
          </p>
          <form onSubmit={handleCitySubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name (optional)"
              autoComplete="given-name"
              style={{ flex: "1 1 160px", padding: "15px 20px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "#fff", color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", fontWeight: 500, minWidth: 0 }}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City (optional)"
              autoComplete="address-level2"
              style={{ flex: "1 1 160px", padding: "15px 20px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "#fff", color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", fontWeight: 500, minWidth: 0 }}
            />
            <button type="submit" disabled={loading} style={{ padding: "15px 28px", border: "2px solid var(--brand-ink)", borderRadius: 999, background: "var(--brand-ink)", color: "var(--brand-canvas)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" }}>
              {loading ? "…" : "Done →"}
            </button>
          </form>
          <button onClick={() => setStep("done")} style={{ marginTop: 10, background: "transparent", border: "none", color: "rgba(var(--brand-ink-rgb),0.5)", fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", cursor: "pointer", textDecoration: "underline" }}>
            Skip
          </button>
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
              {loading ? "…" : variant === "flock" ? "Join the Flock →" : "Find out first →"}
            </button>
          </form>
          {captchaError && (
            <p role="alert" style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "#B3261E", marginTop: 10, fontWeight: 600 }}>
              {captchaError}
            </p>
          )}
          {variant !== "flock" && (
            <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.78rem", color: "rgba(var(--brand-ink-rgb),0.7)", marginTop: 12 }}>
              Email only: find out when the next run goes live. Want more?{" "}
              <button
                onClick={() => { setFlockOpen(true); window.gtag?.("event", "select_promotion", { promotion_name: "inline_form_flock_upsell" }); }}
                style={{ background: "none", border: "none", padding: 0, color: "var(--brand-ink)", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.78rem", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}
              >
                Join the Flock →
              </button>{" "}
              Early access a full day before launch, flavor votes, member-only merch. 100+ already in.
            </p>
          )}
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

      {/* ════════════════════ ANNOUNCEMENT BAR ════════════════════ */}
      <div
        style={{
          background: "var(--brand-ink)",
          padding: "11px 16px",
          textAlign: "center",
          position: "relative",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => { setFlockOpen(true); window.gtag?.("event", "select_promotion", { promotion_name: "announcement_bar_flock" }); }}
          style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-tint-soft)", margin: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          The first run poured out in 9 days ✿ The Flock shops the next one a day early ✿ <span style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>join free</span>
        </button>
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
          <Image src="/brand/symbol-sheep-solid.png" width={34} height={34} alt="mé the shroomé sheep" priority style={{ height: 34, width: "auto" }} />
          <Image src="/brand/wordmark.png" width={128} height={28} alt="shroomé" priority style={{ height: 26, width: "auto" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { label: "Why shroomé", id: "why" },
            { label: "Flavors", id: "flavors" },
            { label: "Good Energy", id: "how" },
            { label: "FAQ", id: "faq", href: "/faq" },
            { label: "Recipes", id: "recipes", href: "/recipes" },
            { label: "Shop", id: "drop", href: "/drop" },
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
            onClick={() => { setFlockOpen(true); window.gtag?.("event", "select_promotion", { promotion_name: "nav_flock_membership" }); }}
            className="nav-cta-btn"
            style={{
              background: "var(--brand-accent)",
              color: "var(--brand-canvas)",
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
            Join the Flock →
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
            { label: "Good Energy", id: "how" },
            { label: "FAQ", id: "faq", href: "/faq" },
            { label: "Recipes", id: "recipes", href: "/recipes" },
            { label: "Shop", id: "drop", href: "/drop" },
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
              setFlockOpen(true);
              window.gtag?.("event", "select_promotion", { promotion_name: "mobile_nav_flock_membership" });
            }}
            style={{
              background: "var(--brand-accent)",
              color: "var(--brand-canvas)",
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
            Join the Flock →
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
          src="/brand/pattern-flower-brand.svg"
          alt=""
          aria-hidden
          className="flower-spin hero-flower-a"
          style={{ position: "absolute", top: "-14vw", left: "-14vw", width: "30vw", minWidth: 260, opacity: 0.85, pointerEvents: "none" }}
        />
        <img
          src="/brand/pattern-flower-brand.svg"
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
                  background: "var(--brand-tint-soft)",
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
                color: "var(--brand-canvas)",
                marginBottom: 22,
                opacity: 0,
              }}
            >
              The first run poured out in 9 days
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
              The latte&apos;s already in the sachet: ceremonial matcha, lion&apos;s mane,
              collagen. Pour it over milk; <strong>the stir is the recipe.</strong> No whisk,
              no wait.
            </p>

            {/* Restock notify form */}
            <div className="fade-up delay-500" id="signup" style={{ maxWidth: 460, opacity: 0 }}>
              {restockForm("hero")}
            </div>

            {/* Ingredient badge stickers */}
            <div className="fade-up delay-650" style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30, flexWrap: "wrap", opacity: 0 }}>
              {[
                { src: "/brand/badge-matcha.png", alt: "Organic ceremonial grade matcha", rot: "-6deg" },
                { src: "/brand/badge-b-glucans.png", alt: "Organic beta-glucans, lion's mane", rot: "4deg" },
                { src: "/brand/badge-collagen.png", alt: "With grass-fed type 1 and type 3 collagen", rot: "-3deg" },
              ].map((b) => (
                <Image
                  key={b.src}
                  src={b.src}
                  alt={b.alt}
                  width={220}
                  height={220}
                  priority
                  style={{ width: "clamp(120px, 13vw, 158px)", height: "auto", transform: `rotate(${b.rot})`, filter: "drop-shadow(0 6px 12px rgba(45,52,26,0.14))" }}
                />
              ))}
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
                src="/brand/symbol-sheep-solid.png"
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
                  borderRadius: 18,
                  padding: "12px 20px",
                  transform: "rotate(3deg)",
                  textAlign: "center",
                }}
              >
                <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-canvas)" }}>
                  First run · Poured out
                </p>
                <p style={{ ...tagStyle, fontSize: "0.56rem", color: "var(--brand-tint-soft)", borderTop: "1px solid rgba(254,255,248,0.25)", paddingTop: 4, marginTop: 4 }}>
                  500 boxes · 9 days
                </p>
              </div>
            </div>
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

          <div {...anim("how-card", 0.15)} style={{ ...anim("how-card", 0.15).style, background: "var(--brand-canvas)", border: "3px solid var(--brand-ink)", borderRadius: 36, padding: "48px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 36, position: "relative" }}>
            <Image
              src="/brand/lockup-circle.png"
              alt="Ready to enjoy life with good energy"
              width={140}
              height={140}
              loading="lazy"
              className="flower-spin"
              style={{ position: "absolute", top: -54, right: 28, width: 116, height: 116, zIndex: 2 }}
            />
            {[
              { img: "/brand/sheep-sachet.png", num: "1. Tear", desc: "Rip open one sachet. That's your perfectly measured dose." },
              { img: "/brand/sheep-swirl.png", num: "2. Pour", desc: "Over your milk of choice. Oat, almond, coconut, dairy. Hot or iced." },
              { img: "/brand/sheep-drink.png", num: "3. Go", desc: "Stir once. That's the recipe. Cafe-grade matcha latte, done. No blender, no whisk, no mess." },
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

      {/* ════════════════════ DIFFERENT ANIMAL — STATEMENT PANEL ════════════════════ */}
      <section id="why" style={{ padding: "72px 24px", background: "var(--brand-canvas)" }}>
        <div
          {...anim("lockup")}
          style={{
            ...anim("lockup").style,
            maxWidth: 1080,
            margin: "0 auto",
            background: "var(--brand-tint-soft)",
            border: "3px solid var(--brand-ink)",
            borderRadius: 32,
            padding: "clamp(28px, 5vw, 56px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(28px, 4vw, 56px)",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img src="/brand/pattern-flower-brand.svg" alt="" aria-hidden style={{ position: "absolute", bottom: "-22%", right: "-8%", width: 260, opacity: 0.35, pointerEvents: "none" }} />
          <div style={{ flex: "1 1 320px", minWidth: 260, position: "relative" }}>
            <Image
              src="/brand/lockup-good-energy.png"
              alt="Ready to enjoy life with good energy."
              width={840}
              height={551}
              loading="lazy"
              style={{ width: "100%", maxWidth: 400, height: "auto", display: "block", margin: "0 auto" }}
            />
          </div>
          <div style={{ flex: "1 1 340px", minWidth: 280, position: "relative" }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 14 }}>
              A different animal
            </p>
            <p style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)", color: "var(--brand-ink)", lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 22 }}>
              Cafe-grade ceremonial matcha, functional mushrooms, and collagen,
              already blended into a liquid you pour like creamer.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Vote on the next flavor. Members pick what we pour.",
                "One pour, one stir, done. No whisk, no barista.",
                "Energy, clarity, skin, immunity. One sachet.",
              ].map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--brand-accent)", border: "2px solid var(--brand-ink)", flexShrink: 0 }} />
                  <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.9rem", color: "var(--brand-ink)" }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
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
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
          <div {...anim("flavor-head")}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 16 }}>
              Launching with two flavors
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.05, marginBottom: 12, color: "var(--brand-ink)", letterSpacing: "-0.02em" }}>
              Pick your pour.
            </h2>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-ink-rgb),0.65)", marginBottom: 48 }}>
              Both poured out in 9 days. The Flock pours first next time.
            </p>
          </div>

          <div className="flavor-cards-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { src: "/sachet-vanilla.png", name: "Vanilla", note: "Warm · Smooth · Everyday", href: "/flavors/vanilla", bg: "var(--brand-flavor-functional)", me: "/brand/me-04.png", meStyle: { top: 14, left: 14, width: 74, transform: "rotate(-10deg)" }, alt: "shroomé Vanilla liquid ceremonial matcha latte sachet, sold out", stamp: "Poured out.", stampKicker: "First run · gone in 9 days", stampBg: "var(--brand-ink)", stampColor: "var(--brand-canvas)", stampRotate: "rotate(-7deg)" },
              { src: "/sachet-strawberry.png", name: "Strawberry", note: "Bright · Fruity · Loud", href: "/flavors/strawberry", bg: "var(--brand-tint-blush)", me: "/brand/me-02.png", meStyle: { top: 18, left: 16, width: 80, transform: "rotate(8deg)" }, alt: "shroomé Strawberry liquid ceremonial matcha latte sachet, sold out", stamp: "Gone. Loudly.", stampKicker: "First run · gone in 9 days", stampBg: "var(--brand-flavor-strawberry)", stampColor: "var(--brand-ink)", stampRotate: "rotate(6deg)" },
            ].map((f, i) => (
              <a key={f.name} href={f.href} {...anim(`flavor-${i}`, i * 0.12)} style={{ ...anim(`flavor-${i}`, i * 0.12).style, textDecoration: "none", color: "inherit" }}>
                <div className="lift" style={{ background: f.bg, border: "3px solid var(--brand-ink)", borderRadius: 32, padding: "28px 16px 26px", position: "relative", overflow: "hidden" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "46%",
                      left: "50%",
                      transform: `translate(-50%, -50%) ${f.stampRotate}`,
                      zIndex: 2,
                      background: f.stampBg,
                      color: f.stampColor,
                      border: "3px solid var(--brand-ink)",
                      borderRadius: 16,
                      padding: "12px 26px 14px",
                      textAlign: "center",
                      boxShadow: "0 12px 28px rgba(45,52,26,0.28)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: f.stampColor, opacity: 0.85, marginBottom: 3 }}>
                      {f.stampKicker}
                    </p>
                    <p style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                      {f.stamp}
                    </p>
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
                  <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(var(--brand-ink-rgb),0.7)" }}>{f.note}</p>
                  <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand-ink)", marginTop: 14, textDecoration: "underline" }}>
                    See the flavor →
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div {...anim("flavor-packs", 0.2)} style={{ ...anim("flavor-packs", 0.2).style, marginTop: 44 }}>
            <p style={{ ...tagStyle, fontSize: "0.7rem", color: "var(--brand-accent-deep)", marginBottom: 18 }}>
              Pick your box · ships free
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 980, margin: "0 auto" }}>
              {[
                { n: "6 sachets", name: "First-Pour Kit", price: "$21", sub: "one-time only" },
                { n: "12 sachets", name: "The Standard", price: "$36", sub: "less when you subscribe · free gift inside" },
                { n: "24 sachets", name: "The Duo Stock", price: "$66", sub: "less when you subscribe · free gift inside" },
                { n: "48 sachets", name: "Never Run Dry", price: "$126", sub: "less when you subscribe · free gift inside" },
              ].map((b) => (
                <div key={b.n} style={{ background: "#fff", border: "3px solid var(--brand-ink)", borderRadius: 24, padding: "22px 18px 20px", textAlign: "center" }}>
                  <p style={{ ...tagStyle, fontSize: "0.66rem", color: "rgba(var(--brand-ink-rgb),0.65)" }}>{b.n}</p>
                  <p style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "1.05rem", color: "var(--brand-ink)", margin: "6px 0 2px" }}>{b.name}</p>
                  <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1.7rem", color: "var(--brand-ink)" }}>{b.price}</p>
                  <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.72rem", color: "var(--brand-accent-deep)", marginBottom: 14 }}>{b.sub}</p>
                  <button
                    onClick={() => { setGateBox(`${b.name} (${b.n})`); window.gtag?.("event", "add_to_cart_gated", { item_name: b.name }); }}
                    style={{ width: "100%", background: "var(--brand-accent)", color: "var(--brand-canvas)", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "12px 10px", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
                  >
                    Get this box →
                  </button>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.78rem", color: "rgba(var(--brand-ink-rgb),0.6)", marginTop: 16 }}>
              Mix flavors in steps of 6:{" "}
              <a href="/drop" style={{ color: "var(--brand-ink)", fontWeight: 700, textDecoration: "underline" }}>
                build your exact box →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════ THE POUR — POURED OUT MOMENT ════════════════════ */}
      <section aria-label="The pour that poured out the first run" style={{ position: "relative" }}>
        <style>{`
          @keyframes pourTicker { to { transform: translateX(-50%); } }
          .pour-ticker-track { display: flex; width: max-content; animation: pourTicker 36s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .pour-ticker-track { animation: none; } }
        `}</style>
        <div
          style={{
            minHeight: "min(64vw, 520px)",
            backgroundImage: "url(/brand/cup-logo.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 42%",
            display: "flex",
            alignItems: "center",
            padding: "56px 0",
          }}
        >
          <div style={{ maxWidth: 1080, width: "100%", margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                maxWidth: 430,
                background: "rgba(254,255,248,0.94)",
                border: "3px solid var(--brand-ink)",
                borderRadius: 28,
                padding: "clamp(24px, 3.5vw, 36px)",
                transform: "rotate(-1deg)",
              }}
            >
              <p style={{ ...tagStyle, fontSize: "0.64rem", color: "var(--brand-accent-deep)", marginBottom: 12 }}>
                The cup that did the numbers
              </p>
              <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)", color: "var(--brand-ink)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 12 }}>
                This pour cleared 500 boxes in 9 days.
              </h2>
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.9rem", color: "rgba(var(--brand-ink-rgb),0.75)", lineHeight: 1.65, marginBottom: 20 }}>
                The prettiest pour on your FYP, and the reason the first run is history.
                Next run, it happens in your kitchen.
              </p>
              <button
                onClick={() => scrollTo("signup")}
                style={{ display: "inline-block", background: "var(--brand-accent)", color: "var(--brand-canvas)", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "13px 24px", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Join the Flock →
              </button>
            </div>
          </div>
        </div>
        {/* POURED OUT ticker strip */}
        <div aria-hidden style={{ background: "var(--brand-ink)", overflow: "hidden", padding: "12px 0" }}>
          <div className="pour-ticker-track">
            {[0, 1].map((k) => (
              <p key={k} style={{ ...tagStyle, fontSize: "0.68rem", color: "var(--brand-canvas)", whiteSpace: "nowrap", paddingRight: 8 }}>
                the first run poured out <span style={{ color: "var(--brand-tint-soft)" }}>✿</span> 500 boxes{" "}
                <span style={{ color: "var(--brand-tint-soft)" }}>✿</span> 9 days{" "}
                <span style={{ color: "var(--brand-tint-soft)" }}>✿</span> we keep making it{" "}
                <span style={{ color: "var(--brand-tint-soft)" }}>✿</span> the flock pours first{" "}
                <span style={{ color: "var(--brand-tint-soft)" }}>✿</span> next run loading{" "}
                <span style={{ color: "var(--brand-tint-soft)" }}>✿</span>{" "}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ OUR VIBE IS MATCHA-IN — LIFESTYLE ════════════════════ */}
      <section style={{ padding: "90px 24px 100px", background: "var(--brand-ink)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("vibe-head")} style={{ ...anim("vibe-head").style, textAlign: "center", marginBottom: 44 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-tint-soft)", marginBottom: 14 }}>
              @drinkshroome
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4.6vw, 3.2rem)", color: "var(--brand-canvas)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Our vibe is matcha-in.
            </h2>
          </div>

          <div {...anim("vibe-grid", 0.15)} style={{ ...anim("vibe-grid", 0.15).style, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22, maxWidth: 1080, margin: "0 auto" }}>
            {[
              { src: "/brand/ig-matcha-in.jpg", alt: "Friends at a picnic, our vibe is matcha-in" },
              { src: "/brand/ig-glow-skin.jpg", alt: "Glow and skin, smiling model in sunlight" },
              { src: "/brand/model-cloud.jpg", alt: "Soft life, resting on the mé cloud" },
              { src: "/brand/ig-iced-close.jpg", alt: "Iced matcha with the mé sheep pour creative" },
              { src: "/brand/ig-good-energy.jpg", alt: "Ready to enjoy life with good energy, cozy moment" },
              { src: "/brand/ig-mushroom-hat.jpg", alt: "Hammock daydream with the mé sheep cloud" },
            ].map((g, i) => (
              <div key={g.src} className="wobble">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={500}
                  height={625}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: 24, border: "3px solid rgba(var(--brand-canvas-rgb),0.25)", display: "block", background: "var(--brand-canvas)" }}
                />
              </div>
            ))}
          </div>

          <div {...anim("vibe-cta", 0.25)} style={{ ...anim("vibe-cta", 0.25).style, textAlign: "center", marginTop: 36 }}>
            <a
              href="https://instagram.com/drinkshroome"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.72rem", color: "var(--brand-tint-soft)", textDecoration: "underline" }}
            >
              @drinkshroome →
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section style={{ padding: "90px 24px", background: "var(--brand-canvas)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("test-head")} style={{ ...anim("test-head").style, textAlign: "center", marginBottom: 44 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 16 }}>
              First run reviews
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "var(--brand-ink)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              The flock has spoken.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { quote: "I replaced my $7 oat milk latte with this. Tastes better, costs less, and I actually feel focused.", name: "Sarah M.", loc: "Austin, TX", bg: "var(--brand-tint-soft)", face: "/brand/me-02.png" },
              { quote: "The strawberry one is insane. The pour is genuinely the prettiest thing in my kitchen.", name: "Mike R.", loc: "Brooklyn, NY", bg: "var(--brand-canvas)", face: "/brand/me-04.png" },
              { quote: "Finally a matcha that doesn't taste like grass. The vanilla is my daily non-negotiable.", name: "Jess L.", loc: "Portland, OR", bg: "var(--brand-flavor-functional)", face: "/brand/me-06.png" },
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
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src={t.face} alt="" aria-hidden width={44} height={44} loading="lazy" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "contain", background: "var(--brand-canvas)", padding: 4, border: "2px solid var(--brand-ink)" }} />
                  <div>
                    <p style={{ ...tagStyle, fontSize: "0.68rem", color: "var(--brand-ink)" }}>{t.name}</p>
                    <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)" }}>{t.loc} · First run</p>
                  </div>
                </div>
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
        <img src="/brand/pattern-flower-brand.svg" alt="" aria-hidden style={{ position: "absolute", bottom: "-14%", left: "-7%", width: "20vw", minWidth: 200, opacity: 0.45, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("ing-head")} style={{ ...anim("ing-head").style, textAlign: "center", marginBottom: 48 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-ink)", marginBottom: 16 }}>
              What&apos;s inside
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--brand-ink)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Clean label. Real doses.
            </h2>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-ink-rgb),0.65)", marginTop: 12 }}>
              No fairy dusting. No mystery blends. Just the stack, at doses that actually do something.
            </p>
          </div>

          {/* Stat strip — mirrors the sachet back panel */}
          <div {...anim("stats", 0.1)} style={{ ...anim("stats", 0.1).style, position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 28 }}>
            <Image src="/brand/me-06.png" width={72} height={90} alt="" aria-hidden loading="lazy" style={{ position: "absolute", top: -54, right: 8, width: 58, height: "auto", transform: "rotate(6deg)", zIndex: 2 }} />
            {[
              { dose: "60mg", label: "Caffeine" },
              { dose: "2.5g", label: "Ceremonial Matcha" },
              { dose: "200mg", label: "Lion\u2019s Mane β-Glucans" },
              { dose: "2g", label: "Grass-Fed Collagen" },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--brand-canvas)", border: "2px solid var(--brand-ink)", borderRadius: 20, padding: "20px 14px", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "2rem", color: "var(--brand-accent-deep)", lineHeight: 1.1 }}>{s.dose}</p>
                <p style={{ ...tagStyle, fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.75)", marginTop: 8 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { icon: "/brand/icon-whisk.png", name: "Ceremonial Matcha", detail: "First-harvest, shade-grown, stone-ground in Japan. Vivid jade, zero bitterness. If your matcha doesn\u2019t glow, it\u2019s not the real thing." },
              { icon: "/brand/icon-mushrooms.png", name: "Lion\u2019s Mane Mushroom", detail: "Organic lion\u2019s mane beta-glucans: clarity and immunity without your latte tasting like the forest floor. Brain fog? Sheep happens. This fixes it." },
              { icon: "/brand/icon-molecule.png", name: "Grass-Fed Collagen", detail: "Type 1 & 3, pre-dissolved into the liquid. Silky in the glass, glowy after. Your skincare routine drinks with us now." },
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
                <Image src={item.icon} alt="" aria-hidden width={64} height={64} loading="lazy" style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 16, filter: "invert(1) brightness(1.6)" }} />
                <p style={{ ...tagStyle, fontSize: "0.8rem", color: "var(--brand-tint-soft)", marginBottom: 12 }}>{item.name}</p>
                <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.85rem", color: "rgba(var(--brand-canvas-rgb),0.72)", lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>

          <div {...anim("badge-row", 0.2)} style={{ ...anim("badge-row", 0.2).style, display: "flex", justifyContent: "center", alignItems: "center", gap: 28, flexWrap: "wrap", marginTop: 40 }}>
            <Image src="/brand/badge-matcha.png" width={280} height={170} alt="Organic ceremonial grade matcha" loading="lazy" style={{ width: 220, height: "auto", transform: "rotate(-2deg)" }} />
            <Image src="/brand/badge-b-glucans.png" width={200} height={205} alt="Organic beta-glucans, lion's mane" loading="lazy" style={{ width: 168, height: "auto", transform: "rotate(2deg)" }} />
            <Image src="/brand/badge-collagen.png" width={230} height={188} alt="With grass-fed type 1 and type 3 collagen" loading="lazy" style={{ width: 196, height: "auto", transform: "rotate(-2deg)" }} />
          </div>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.78rem", color: "rgba(var(--brand-ink-rgb),0.6)", textAlign: "center", marginTop: 26, lineHeight: 1.6 }}>
            Ingredients: Ceremonial Grade Matcha (organic), Lion&apos;s Mane Mushroom Beta Glucans (Organic), Grass-Fed Collagen Peptides, Natural Flavor.
          </p>
        </div>
      </section>

      {/* ════════════════════ CAFE ENERGY. HOME ADDRESS. — THE ARRIVAL ════════════════════ */}
      <section style={{ padding: "100px 24px", background: "var(--brand-canvas)", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", gap: "clamp(28px, 4vw, 60px)", flexWrap: "wrap" }}>
          <div {...anim("arrival-img")} style={{ ...anim("arrival-img").style, flex: "1 1 420px", minWidth: 300, position: "relative" }}>
            <Image
              src="/brand/ig-sachet-sip.jpg"
              alt="Sipping an iced shroomé matcha at home, strawberry sachet in hand"
              width={1000}
              height={1250}
              loading="lazy"
              style={{ width: "100%", height: "auto", aspectRatio: "4 / 4.6", objectFit: "cover", borderRadius: 24, border: "3px solid var(--brand-ink)", boxShadow: "0 20px 48px rgba(45,52,26,0.18)", display: "block" }}
            />
            <Image
              src="/brand/badge-ready-to-pour.png"
              alt=""
              aria-hidden
              width={160}
              height={160}
              loading="lazy"
              style={{ position: "absolute", top: -28, right: -20, width: "clamp(90px, 12vw, 130px)", height: "auto", transform: "rotate(10deg)", filter: "drop-shadow(0 8px 16px rgba(45,52,26,0.2))" }}
            />
          </div>
          <div {...anim("arrival-copy", 0.12)} style={{ ...anim("arrival-copy", 0.12).style, flex: "1 1 380px", minWidth: 280 }}>
            <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-accent-deep)", marginBottom: 14 }}>
              The arrival
            </p>
            <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.9rem, 4vw, 2.8rem)", color: "var(--brand-ink)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 18 }}>
              Cafe energy.<br />Home address.
            </h2>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", color: "rgba(var(--brand-ink-rgb),0.75)", lineHeight: 1.7, marginBottom: 22 }}>
              Your cafe order, the exact one you&apos;d stand in line for, waiting at your
              door. Tear a sachet, pour it over milk, swirl. That&apos;s it. No whisk, no
              hand mixer, no green dust on the counter, no name spelled wrong on the cup.
              It tastes like the good cafe made it, because the good stuff is already in
              the pour.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Barista-level latte, ready the second you stir",
                "No whisk, no clumps, no cleanup",
                "Ships free. Skip, pause, or swap flavors anytime",
              ].map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--brand-accent)", border: "2px solid var(--brand-ink)", flexShrink: 0 }} />
                  <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.88rem", color: "var(--brand-ink)" }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ FLOCK GATE — pre-launch add-to-cart ════════════════════ */}
      {gateBox && (
        <div
          onClick={() => setGateBox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(45,52,26,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{ background: "var(--brand-canvas)", border: "3px solid var(--brand-ink)", borderRadius: 28, padding: "clamp(26px, 5vw, 44px)", maxWidth: 480, width: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}
          >
            <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "url(/brand/pattern-tile.png)", backgroundSize: 200, opacity: 0.07, pointerEvents: "none" }} />
            <button onClick={() => setGateBox(null)} aria-label="Close" style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: "1.4rem", color: "rgba(var(--brand-ink-rgb),0.5)", cursor: "pointer", zIndex: 1 }}>×</button>
            <Image src="/brand/symbol-sheep-solid.png" width={64} height={72} alt="" aria-hidden style={{ width: 56, height: "auto", margin: "0 auto 14px", display: "block" }} />
            <p style={{ ...tagStyle, fontSize: "0.64rem", color: "var(--brand-accent-deep)", marginBottom: 10 }}>
              {gateBox} · the next run
            </p>
            <h3 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "1.6rem", color: "var(--brand-ink)", letterSpacing: "-0.01em", marginBottom: 12 }}>
              Not live yet. But you&apos;re early.
            </h3>
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.9rem", color: "rgba(var(--brand-ink-rgb),0.75)", lineHeight: 1.65, marginBottom: 22 }}>
              The next run hasn&apos;t gone live. The Flock shops it <strong>a full day before
              the public link</strong>. Join free and this box is basically yours before anyone
              else can even see it. Everyone gets in. The early ones just pour first.
            </p>
            <button
              onClick={() => { setGateBox(null); scrollTo("signup"); window.gtag?.("event", "select_promotion", { promotion_name: "flock_gate_join" }); }}
              style={{ width: "100%", background: "var(--brand-accent)", color: "var(--brand-canvas)", border: "2px solid var(--brand-ink)", borderRadius: 999, padding: "16px 20px", fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Join the Flock →
            </button>
            <button onClick={() => setGateBox(null)} style={{ marginTop: 12, background: "none", border: "none", fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.5)", textDecoration: "underline", cursor: "pointer" }}>
              I&apos;ll wait for the public link
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════ FLOCK MEMBERSHIP — THE CLUBHOUSE ════════════════════ */}
      {flockOpen && (
        <div
          onClick={() => setFlockOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(45,52,26,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="The Flock membership"
            style={{ background: "var(--brand-tint-soft)", border: "3px solid var(--brand-ink)", borderRadius: 28, padding: "clamp(26px, 5vw, 44px)", maxWidth: 520, width: "100%", position: "relative", overflow: "hidden", margin: "auto" }}
          >
            <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "url(/brand/pattern-tile.png)", backgroundSize: 220, opacity: 0.08, pointerEvents: "none" }} />
            <button onClick={() => setFlockOpen(false)} aria-label="Close" style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: "1.4rem", color: "rgba(var(--brand-ink-rgb),0.5)", cursor: "pointer", zIndex: 1 }}>×</button>
            <div style={{ position: "relative" }}>
              <Image src="/brand/symbol-sheep-solid.png" width={64} height={72} alt="" aria-hidden style={{ width: 52, height: "auto", marginBottom: 12, display: "block" }} />
              <p style={{ ...tagStyle, fontSize: "0.62rem", color: "var(--brand-accent-deep)", marginBottom: 8 }}>
                shroomé membership · free · everyone&apos;s welcome
              </p>
              <h3 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(1.7rem, 4vw, 2.2rem)", color: "var(--brand-ink)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 10 }}>
                The Flock
              </h3>
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.88rem", color: "rgba(var(--brand-ink-rgb),0.75)", lineHeight: 1.6, marginBottom: 20 }}>
                Not an email list. The room where the drop happens first.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {[
                  { t: "Shop every run a full day early", d: "Your link goes live before the public one exists." },
                  { t: "Vote on new flavors", d: "Members pick what we pour next." },
                  { t: "Member-only merch", d: "Never sold, only earned. Flock hands only." },
                  { t: "Gifts with every subscription", d: "Plus the drop-day text. First to know, always." },
                ].map((b) => (
                  <div key={b.t} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(var(--brand-canvas-rgb),0.8)", border: "2px solid var(--brand-ink)", borderRadius: 18, padding: "14px 16px" }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--brand-accent)", border: "2px solid var(--brand-ink)", flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.86rem", color: "var(--brand-ink)" }}>{b.t}</p>
                      <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.74rem", color: "rgba(var(--brand-ink-rgb),0.6)", lineHeight: 1.5 }}>{b.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              {restockForm("flock")}
              <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)", marginTop: 14, textAlign: "center" }}>
                100+ in already. The first run poured out in 9 days. The Flock pours first next time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════ FINAL CTA — SOLD OUT / NOTIFY ════════════════════ */}
      <section
        id="cta"
        style={{
          padding: "110px 24px",
          backgroundColor: "var(--brand-accent-deep)",
          backgroundImage: "url(/brand/pattern-ripple.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--brand-ink)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          {...anim("cta-block")}
          style={{
            ...anim("cta-block").style,
            maxWidth: 600,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            background: "var(--brand-canvas)",
            border: "3px solid var(--brand-ink)",
            borderRadius: 32,
            padding: "clamp(28px, 5vw, 48px)",
          }}
        >
          <Image src="/brand/symbol-sheep-solid.png" width={72} height={80} alt="" aria-hidden style={{ width: 60, height: "auto", margin: "0 auto 16px", display: "block" }} />
          <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-ink)", marginBottom: 14 }}>
            First run · 500 boxes · gone in 9 days
          </p>
          <h2 style={{ fontFamily: "var(--brand-font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.05, marginBottom: 14, color: "var(--brand-ink)", letterSpacing: "-0.02em" }}>
            Poured out. Not gone.
          </h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-ink-rgb),0.7)", lineHeight: 1.65, marginBottom: 28 }}>
            The first run belongs to the founding 500. The next one opens for members
            <strong> a full day before the public link</strong>, with flavor votes, member-only
            merch, and free gifts on subscriptions. Everyone&apos;s welcome. The Flock just pours first.
          </p>
          {restockForm("cta")}
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer style={{ background: "var(--brand-ink)", color: "var(--brand-canvas)", padding: "70px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Image src="/brand/sheep-stack.png" alt="" aria-hidden width={90} height={226} loading="lazy" style={{ position: "absolute", right: "6%", bottom: 0, width: 74, height: "auto", opacity: 0.85, filter: "invert(1) brightness(1.8)" }} />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Image src="/brand/wordmark-cream.png" width={300} height={65} alt="shroomé" loading="lazy" style={{ width: 240, height: "auto", margin: "0 auto 18px" }} />
          <p style={{ ...tagStyle, fontSize: "0.66rem", color: "var(--brand-tint-soft)", marginBottom: 10 }}>
            Pour. Swirl. Go.
          </p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.7rem", color: "rgba(var(--brand-canvas-rgb),0.55)", marginBottom: 32 }}>
            mé, our sheep. Keeps the ledger, never spills.
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

    </>
  );
}
