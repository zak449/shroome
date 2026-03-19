"use client";
import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"email" | "captcha" | "phone" | "done">("email");
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const observers = useRef<IntersectionObserver[]>([]);

  // ── Analytics: section visibility tracking ──
  const sectionsSeen = useRef<Set<string>>(new Set());
  const scrollMilestones = useRef<Set<number>>(new Set());
  const sessionStart = useRef(Date.now());

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
    window.gtag?.("event", "begin_checkout", { items: [{ item_name: "waitlist_signup" }] });
    setStep("captcha");
  };

  const onTurnstileSuccess = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: token }),
      });
      const data = await res.json();
      if (data.closed) {
        setStep("done");
        setLoading(false);
        return;
      }
    } catch {}
    setLoading(false);
    setStep("phone");
    window.gtag?.("event", "generate_lead", { currency: "USD", value: 1.0 });
  }, [email]);

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
        "error-callback": () => { onTurnstileSuccess(""); },
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
        body: JSON.stringify({ email, phone }),
      });
    } catch {}
    setLoading(false);
    setStep("done");
    window.gtag?.("event", "sign_up", { method: "waitlist_phone" });
  };

  const skipPhone = () => {
    setStep("done");
    window.gtag?.("event", "sign_up", { method: "waitlist_email_only" });
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

  return (
    <>
      <style>{`
        @keyframes morphA {
          0%, 100% { border-radius: 42% 58% 62% 38% / 45% 55% 45% 55%; transform: translate(0, 0) scale(1); }
          33% { border-radius: 55% 45% 38% 62% / 52% 48% 52% 48%; transform: translate(15px, -20px) scale(1.04); }
          66% { border-radius: 38% 62% 55% 45% / 48% 52% 48% 52%; transform: translate(-10px, 15px) scale(0.97); }
        }
        @keyframes morphB {
          0%, 100% { border-radius: 55% 45% 48% 52% / 42% 58% 42% 58%; transform: translate(0, 0) scale(1); }
          33% { border-radius: 45% 55% 52% 48% / 58% 42% 58% 42%; transform: translate(-20px, 10px) scale(1.06); }
          66% { border-radius: 52% 48% 42% 58% / 55% 45% 55% 45%; transform: translate(12px, -15px) scale(0.95); }
        }
        @keyframes morphC {
          0%, 100% { border-radius: 48% 52% 55% 45% / 38% 62% 38% 62%; transform: translate(0, 0) scale(1); }
          50% { border-radius: 62% 38% 45% 55% / 52% 48% 52% 48%; transform: translate(8px, 12px) scale(1.03); }
        }
        .blob-a { animation: morphA 18s ease-in-out infinite; }
        .blob-b { animation: morphB 14s ease-in-out infinite; }
        .blob-c { animation: morphC 22s ease-in-out infinite; }
        .lift:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
        .lift { transition: transform 0.3s, box-shadow 0.3s; }
      `}</style>

      {/* ════════════════════ MARQUEE TOP BAR ════════════════════ */}
      <div
        style={{
          background: "#1B1F3B",
          padding: "10px 0",
          overflow: "hidden",
          position: "relative",
          zIndex: 100,
        }}
      >
        <div className="ticker-track">
          {Array(4)
            .fill(
              "THE WORLD'S FIRST READY-TO-POUR MATCHA LATTE  ✦  ENERGY WITHOUT THE CRASH  ✦  2G MATCHA · MUSHROOM EXTRACTS · COLLAGEN  ✦  "
            )
            .map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  color: "#C8FF3A",
                  paddingRight: 16,
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
        </div>
      </div>

      {/* ════════════════════ STICKY NAV ════════════════════ */}
      <nav
        className="site-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
          background: "rgba(255,183,209,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(27,31,59,0.08)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo-mark.svg" width={28} height={28} alt="S" style={{ filter: "brightness(0) saturate(100%) invert(10%) sepia(30%) saturate(1500%) hue-rotate(200deg) brightness(95%)" }} />
          <span
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "#1B1F3B",
            }}
          >
            shroomé
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[
            { label: "Why shroomé", id: "why" },
            { label: "Ingredients", id: "ingredients" },
            { label: "How It Works", id: "how" },
            { label: "FAQ", id: "faq", href: "/faq" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => { if ((l as { href?: string }).href) { window.location.href = (l as { href: string }).href; } else { scrollTo(l.id); } }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1B1F3B",
                cursor: "pointer",
                display: "none",
              }}
              className="nav-link"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo("cta"); window.gtag?.("event", "select_promotion", { promotion_name: "nav_cta_30_off" }); }}
            className="nav-cta-btn"
            style={{
              background: "#1B1F3B",
              color: "#FDF4EE",
              border: "none",
              padding: "10px 22px",
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
            }}
          >
            Get 20% off + free shipping →
          </button>
        </div>
      </nav>

      {/* ════════════════════ HERO — PINK WITH CLOUD BACKGROUND ════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          background: "#FFB7D1",
          position: "relative",
          overflow: "hidden",
          padding: "80px 24px 100px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Cloud background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/email-clouds-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
        {/* Pink overlay to blend clouds with brand */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(255,183,209,0.5) 0%, rgba(255,183,209,0.2) 40%, rgba(253,244,238,0.4) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Morphing blobs */}
        <div
          className="blob-a"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "62vw",
            height: "62vw",
            background: "#D4B8E0",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
        <div
          className="blob-b"
          style={{
            position: "absolute",
            bottom: "15%",
            left: "-8%",
            width: "20vw",
            height: "20vw",
            background: "#C8FF3A",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />
        <div
          className="blob-c"
          style={{
            position: "absolute",
            top: "35%",
            left: "15%",
            width: "18vw",
            height: "18vw",
            background: "#FF7043",
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />
        <div
          className="blob-b"
          style={{
            position: "absolute",
            top: "60%",
            right: "5%",
            width: "22vw",
            height: "22vw",
            background: "#FDF4EE",
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />
        <div
          className="blob-a"
          style={{
            position: "absolute",
            top: "10%",
            left: "-8%",
            width: "20vw",
            height: "20vw",
            background: "#FFB7D1",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          {/* Left — copy */}
          <div style={{ flex: "1 1 440px", minWidth: 300 }}>
            <p
              className="fade-up"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2D4A2D",
                marginBottom: 20,
                opacity: 0,
              }}
            >
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#C8FF3A", marginRight: 10, verticalAlign: "middle" }} />
              Pre-launch · 20% off + free shipping
            </p>

            <h1
              className="fade-up delay-100"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                color: "#2D4A2D",
                lineHeight: 1.05,
                marginBottom: 8,
                opacity: 0,
              }}
            >
              Café energy.
              <br />
              Home address.
              <br />
              <span style={{ fontStyle: "italic", color: "#FF7043" }}>No crash.</span>
            </h1>

            <p
              className="fade-up delay-200"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: "0.95rem",
                color: "rgba(27,31,59,0.7)",
                lineHeight: 1.65,
                maxWidth: 420,
                margin: "24px 0",
                opacity: 0,
              }}
            >
              The world&apos;s first ready-to-pour ceremonial matcha latte. 2g matcha. 2g collagen. Real mushrooms.{" "}
              <strong>Tear it open. Pour it in. Done.</strong>
            </p>

            <p
              className="fade-up delay-350"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#2D4A2D",
                marginBottom: 24,
                opacity: 0,
              }}
            >
              50mg caffeine · Zero jitters · Actually tastes good.
            </p>

            {/* Ingredient pills */}
            <div className="fade-up delay-350" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, opacity: 0 }}>
              {[
                { label: "2g Matcha", bg: "rgba(255,112,67,0.2)", color: "#1B1F3B" },
                { label: "Mushroom Extracts", bg: "rgba(212,184,224,0.35)", color: "#1B1F3B" },
                { label: "Collagen", bg: "rgba(200,255,58,0.3)", color: "#1B1F3B" },
                { label: "No Mixing", bg: "rgba(27,31,59,0.12)", color: "#1B1F3B" },
              ].map((p) => (
                <span
                  key={p.label}
                  style={{
                    fontFamily: "'Syne', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: p.bg,
                    color: p.color,
                    padding: "8px 16px",
                    borderRadius: 2,
                  }}
                >
                  {p.label}
                </span>
              ))}
            </div>

            {/* Email + price */}
            <div className="fade-up delay-500" style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap", opacity: 0 }}>
              <div style={{ flex: "1 1 260px" }}>
                {step === "done" ? (
                  <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#2D4A2D" }}>
                    ✓ You&apos;re on the list — 20% off + free shipping locked in. Add your phone for an extra 10%!
                  </p>
                ) : step === "captcha" ? (
                  <div>
                    <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#2D4A2D", marginBottom: 14 }}>
                      Quick verification for {email}
                    </p>
                    <div ref={captchaRef} style={{ marginBottom: 8 }} />
                    {loading && (
                      <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(27,31,59,0.45)" }}>
                        Submitting...
                      </p>
                    )}
                  </div>
                ) : step === "phone" ? (
                  <>
                    <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "#2D4A2D", marginBottom: 12 }}>
                      ✓ 20% off + free shipping locked in! Add your number for an extra 10% off code.
                    </p>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        border: "2px solid #1B1F3B",
                        background: "#fff",
                        fontFamily: "'Syne', system-ui, sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        marginBottom: 10,
                      }}
                    />
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <button
                        onClick={(e) => { e.preventDefault(); handlePhoneSubmit(e as unknown as React.FormEvent); }}
                        disabled={loading}
                        style={{
                          padding: "16px 32px",
                          border: "none",
                          background: "#C8FF3A",
                          color: "#2D4A2D",
                          fontFamily: "'Syne', system-ui, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          cursor: loading ? "wait" : "pointer",
                        }}
                      >
                        {loading ? "…" : "Add phone →"}
                      </button>
                      <button
                        onClick={skipPhone}
                        style={{
                          padding: "16px 16px",
                          border: "none",
                          background: "transparent",
                          color: "rgba(27,31,59,0.45)",
                          fontFamily: "'Syne', system-ui, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.72rem",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Skip
                      </button>
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: "0.6rem", color: "rgba(27,31,59,0.35)", lineHeight: 1.4, maxWidth: 400 }}>
                      By providing your phone number, you agree to receive marketing texts from shroomé. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        border: "2px solid #1B1F3B",
                        background: "#fff",
                        fontFamily: "'Syne', system-ui, sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        marginBottom: 10,
                      }}
                    />
                    <button
                      onClick={(e) => { e.preventDefault(); handleEmailSubmit(e as unknown as React.FormEvent); }}
                      disabled={loading}
                      style={{
                        padding: "16px 32px",
                        border: "none",
                        background: "#C8FF3A",
                        color: "#2D4A2D",
                        fontFamily: "'Syne', system-ui, sans-serif",
                        fontWeight: 800,
                        fontSize: "0.78rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        cursor: loading ? "wait" : "pointer",
                      }}
                    >
                      {loading ? "…" : "Claim 20% off →"}
                    </button>
                    <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(27,31,59,0.45)", marginTop: 10 }}>
                      No spam. 20% off + free shipping code drops at launch. Add your phone for an extra 10%.
                    </p>
                  </>
                )}
              </div>
              <div
                style={{
                  border: "1px solid rgba(27,31,59,0.15)",
                  padding: "14px 24px",
                  textAlign: "center",
                  background: "rgba(253,244,238,0.6)",
                }}
              >
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(27,31,59,0.5)", marginBottom: 4 }}>Per box</p>
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "2rem", color: "#2D4A2D", lineHeight: 1 }}>12</p>
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.68rem", color: "rgba(27,31,59,0.4)", fontStyle: "italic" }}>servings per box</p>
              </div>
            </div>
          </div>

          {/* Right — sachet images */}
          <div
            style={{
              flex: "1 1 420px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 24,
              minWidth: 0,
            }}
          >
            <img
              src="/sachet-vanilla.png?v=2"
              alt="shroomé vanilla sachet"
              className="sachet-float"
              style={{ width: "48%", maxWidth: 280, height: "auto", filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.15))" }}
            />
            <img
              src="/sachet-strawberry.png?v=2"
              alt="shroomé strawberry sachet"
              className="sachet-float"
              style={{ width: "48%", maxWidth: 280, height: "auto", animationDelay: "2s", filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.15))" }}
            />
          </div>
        </div>

        {/* Flavor sidebar */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 40,
            background: "#1B1F3B",
            color: "#FDF4EE",
            padding: "20px 20px",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8FF3A", marginBottom: 8 }}>Flavors</p>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.5 }}>Vanilla<br />Strawberry</p>
        </div>
      </section>

      {/* ════════════════════ DARK — PICK YOUR FLAVOR (GHIA STYLE) ════════════════════ */}
      <section
        id="why"
        style={{
          padding: "120px 24px 48px",
          marginTop: -2,
          background: "linear-gradient(180deg, #FFB7D1 0%, #c47a96 8%, #6b3a52 18%, #1B1F3B 30%, #000 40%, #000 100%)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          color: "#FDF4EE",
        }}
      >
        {/* Dramatic starburst light rays */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            background: `conic-gradient(
              from 0deg at 50% 45%,
              transparent 0deg, rgba(255,240,220,0.18) 4deg, transparent 8deg,
              transparent 14deg, rgba(255,240,220,0.14) 18deg, transparent 22deg,
              transparent 28deg, rgba(255,240,220,0.2) 32deg, transparent 36deg,
              transparent 44deg, rgba(255,240,220,0.12) 48deg, transparent 52deg,
              transparent 58deg, rgba(255,240,220,0.18) 62deg, transparent 66deg,
              transparent 74deg, rgba(255,240,220,0.14) 78deg, transparent 82deg,
              transparent 88deg, rgba(255,240,220,0.2) 92deg, transparent 96deg,
              transparent 104deg, rgba(255,240,220,0.12) 108deg, transparent 112deg,
              transparent 118deg, rgba(255,240,220,0.18) 122deg, transparent 126deg,
              transparent 134deg, rgba(255,240,220,0.14) 138deg, transparent 142deg,
              transparent 148deg, rgba(255,240,220,0.2) 152deg, transparent 156deg,
              transparent 164deg, rgba(255,240,220,0.12) 168deg, transparent 172deg,
              transparent 178deg, rgba(255,240,220,0.18) 182deg, transparent 186deg,
              transparent 194deg, rgba(255,240,220,0.14) 198deg, transparent 202deg,
              transparent 208deg, rgba(255,240,220,0.2) 212deg, transparent 216deg,
              transparent 224deg, rgba(255,240,220,0.12) 228deg, transparent 232deg,
              transparent 238deg, rgba(255,240,220,0.18) 242deg, transparent 246deg,
              transparent 254deg, rgba(255,240,220,0.14) 258deg, transparent 262deg,
              transparent 268deg, rgba(255,240,220,0.2) 272deg, transparent 276deg,
              transparent 284deg, rgba(255,240,220,0.12) 288deg, transparent 292deg,
              transparent 298deg, rgba(255,240,220,0.18) 302deg, transparent 306deg,
              transparent 314deg, rgba(255,240,220,0.14) 318deg, transparent 322deg,
              transparent 328deg, rgba(255,240,220,0.2) 332deg, transparent 336deg,
              transparent 344deg, rgba(255,240,220,0.12) 348deg, transparent 352deg,
              transparent 360deg
            )`,
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, white 0%, white 50%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, white 0%, white 50%, transparent 80%)",
            pointerEvents: "none",
          }}
        />
        {/* Central warm glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 45% 50% at 50% 45%, rgba(255,220,180,0.25) 0%, rgba(255,180,140,0.1) 40%, transparent 70%)", pointerEvents: "none" }} />
        {/* Subtle edge vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
          <div {...anim("flavor-head")}>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8FF3A", marginBottom: 16 }}>
              2 Flavors
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, marginBottom: 8 }}>
              Pick your flavor.
              <br />
              <span style={{ fontStyle: "italic", color: "#FFB7D1" }}>Both hit different.</span>
            </h2>
          </div>

          {/* Sachet images — large with reflections */}
          <div
            {...anim("flavor-imgs", 0.2)}
            style={{
              ...anim("flavor-imgs", 0.2).style,
              display: "flex",
              justifyContent: "center",
              gap: 32,
              margin: "40px auto 0",
              maxWidth: 720,
            }}
          >
            {[
              { src: "/sachet-vanilla.png?v=2", alt: "Vanilla", delay: "0s", shadow: "rgba(255,220,180,0.3)" },
              { src: "/sachet-strawberry.png?v=2", alt: "Strawberry", delay: "1.8s", shadow: "rgba(212,114,122,0.35)" },
            ].map((s) => (
              <div key={s.alt} style={{ width: "46%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={s.src}
                  alt={s.alt}
                  className="sachet-float"
                  style={{
                    width: "100%",
                    height: "auto",
                    animationDelay: s.delay,
                    filter: `drop-shadow(0 0 40px ${s.shadow}) drop-shadow(0 0 80px ${s.shadow})`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Floor spacer */}
          <div style={{ height: 16 }} />

          {/* Flavor cards side by side */}
          <div {...anim("flavor-cards", 0.3)} style={{ ...anim("flavor-cards", 0.3).style, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40, textAlign: "center" }}>
            <div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "1.5rem", marginBottom: 8 }}>Vanilla</h3>
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.82rem", color: "rgba(253,244,238,0.4)", letterSpacing: "0.06em" }}>Warm · Floral · Grounding</p>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "1.5rem", marginBottom: 8 }}>Strawberry</h3>
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.82rem", color: "rgba(253,244,238,0.4)", letterSpacing: "0.06em" }}>Bright · Fruity · Fresh</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ INGREDIENTS ════════════════════ */}
      <section
        id="ingredients"
        style={{ padding: "100px 24px", marginTop: -2, background: "linear-gradient(180deg, #000 0%, #1B1F3B 5%, #4a3560 12%, #8b6a9e 20%, #D4B8E0 30%, #D4B8E0 100%)", position: "relative", overflow: "hidden" }}
      >
        <div className="blob-c" style={{ position: "absolute", top: "5%", right: "3%", width: "25vw", height: "25vw", background: "#FFB7D1", opacity: 0.4, pointerEvents: "none" }} />
        <div className="blob-b" style={{ position: "absolute", bottom: "5%", left: "3%", width: "20vw", height: "20vw", background: "#1B1F3B", opacity: 0.12, pointerEvents: "none" }} />
        <div className="blob-a" style={{ position: "absolute", top: "40%", left: "50%", width: "15vw", height: "15vw", background: "#C8FF3A", opacity: 0.2, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div {...anim("ing-head")} style={{ ...anim("ing-head").style, textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#1B1F3B", marginBottom: 16 }}>
              What&apos;s inside
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#1B1F3B", lineHeight: 1.1 }}>
              Clean label. Real doses.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { name: "Ceremonial Matcha", dose: "2g", detail: "First-harvest, shade-grown. ~50mg caffeine. Not culinary grade — the real thing.", color: "#C8FF3A", bg: "#1B1F3B" },
              { name: "Organic Mushroom Extracts", dose: "200mg", detail: "70%+ beta-glucan (1/3, 1/6) purity. Immune activation, sustained focus, no crash. Most brands: 15-30%.", color: "#FFB7D1", bg: "#1B1F3B" },
              { name: "Grass-Fed Collagen", dose: "2g", detail: "Pre-dissolved bioavailable peptides for skin, hair, nails, and gut.", color: "#C8FF3A", bg: "#1B1F3B" },
            ].map((item, i) => (
              <div
                key={item.name}
                className="lift"
                {...anim(`ing-${i}`, i * 0.1)}
                style={{
                  ...anim(`ing-${i}`, i * 0.1).style,
                  padding: "32px 28px",
                  background: item.bg,
                  borderRadius: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "2.2rem", color: item.color, lineHeight: 1 }}>{item.dose}</span>
                  <span style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(253,244,238,0.5)" }}>{item.name}</span>
                </div>
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.85rem", color: "rgba(253,244,238,0.45)", lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ COMPARISON TABLE ════════════════════ */}
      <section style={{ padding: "80px 24px 100px", background: "#FFB7D1", color: "#1B1F3B", position: "relative", overflow: "hidden" }}>
        <div className="blob-c" style={{ position: "absolute", top: "8%", left: "3%", width: "20vw", height: "20vw", background: "#D4B8E0", opacity: 0.4, pointerEvents: "none" }} />
        <div className="blob-a" style={{ position: "absolute", bottom: "8%", right: "3%", width: "16vw", height: "16vw", background: "#C8FF3A", opacity: 0.15, pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("comp-head")} style={{ ...anim("comp-head").style, textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#1B1F3B", marginBottom: 16 }}>
              How we compare
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.1, color: "#1B1F3B" }}>
              Not all matcha is created equal.
            </h2>
          </div>

          <div {...anim("comp-table", 0.15)} style={{ ...anim("comp-table", 0.15).style, background: "#1B1F3B", borderRadius: 16, padding: "8px 0", boxShadow: "0 4px 30px rgba(0,0,0,0.2)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", minWidth: 580, borderCollapse: "collapse", fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.85rem" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "14px 14px", borderBottom: "1px solid rgba(253,244,238,0.08)", color: "rgba(253,244,238,0.35)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}></th>
                    {["shroomé", "Clevr", "RYZE", "MatchaKo", "Café"].map((b) => (
                      <th key={b} style={{ textAlign: "center", padding: "14px 10px", borderBottom: "1px solid rgba(253,244,238,0.08)", color: b === "shroomé" ? "#C8FF3A" : "rgba(253,244,238,0.35)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{b}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Ceremonial matcha", values: [true, false, false, true, true] },
                    { feature: "Collagen", values: [true, false, false, false, false] },
                    { feature: "Mushrooms", values: [true, true, true, false, false] },
                    { feature: "Ready to pour", values: [true, false, false, false, true] },
                    { feature: "12+ servings", values: [true, false, true, true, false] },
                  ].map((row) => (
                    <tr key={row.feature}>
                      <td style={{ padding: "16px 14px", borderBottom: "1px solid rgba(253,244,238,0.06)", color: "#FDF4EE", fontWeight: 600, fontSize: "0.85rem" }}>{row.feature}</td>
                      {row.values.map((v, i) => (
                        <td key={i} style={{ textAlign: "center", padding: "16px 10px", borderBottom: "1px solid rgba(253,244,238,0.06)" }}>
                          <span style={{ display: "inline-block", width: 34, height: 34, lineHeight: "34px", borderRadius: 4, fontSize: "1rem", fontWeight: 700, background: v ? "rgba(200,255,58,0.2)" : "rgba(253,244,238,0.04)", color: v ? "#C8FF3A" : "rgba(253,244,238,0.15)" }}>
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
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section id="how" style={{ padding: "100px 24px", background: "#1B1F3B", position: "relative", overflow: "hidden" }}>
        <div className="blob-a" style={{ position: "absolute", top: "10%", right: "3%", width: "18vw", height: "18vw", background: "#FFB7D1", opacity: 0.08, pointerEvents: "none" }} />
        <div className="blob-c" style={{ position: "absolute", bottom: "5%", left: "5%", width: "14vw", height: "14vw", background: "#D4B8E0", opacity: 0.06, pointerEvents: "none" }} />
        <div className="blob-b" style={{ position: "absolute", top: "5%", left: "8%", width: "12vw", height: "12vw", background: "#D4B8E0", opacity: 0.08, pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div {...anim("how-head")}>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8FF3A", marginBottom: 16 }}>
              How it works
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#FDF4EE", lineHeight: 1.1, marginBottom: 64 }}>
              Tear. Pour. <span style={{ color: "#FFB7D1" }}>Hit.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            {[
              { num: "01", title: "Tear", desc: "Rip open one sachet — that's your perfectly measured dose." },
              { num: "02", title: "Pour", desc: "Over your milk of choice. Oat, almond, coconut, dairy. Hot or iced." },
              { num: "03", title: "Hit", desc: "Stir once. 30 seconds to café-grade matcha latte. No blender, no whisk, no mess." },
            ].map((step, i) => (
              <div key={step.num} {...anim(`step-${i}`, i * 0.12)}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#C8FF3A", marginBottom: 14 }}>{step.num}</p>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "1.6rem", color: "#FDF4EE", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.85rem", color: "rgba(253,244,238,0.45)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ HANDS PHOTO ════════════════════ */}
      <section style={{ padding: "60px 24px 0", background: "#D4B8E0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Subtle abstract blobs */}
        <div className="blob-a" style={{ position: "absolute", top: "5%", left: "3%", width: "18vw", height: "18vw", background: "#FFB7D1", opacity: 0.3, pointerEvents: "none" }} />
        <div className="blob-b" style={{ position: "absolute", top: "5%", right: "5%", width: "14vw", height: "14vw", background: "#1B1F3B", opacity: 0.06, pointerEvents: "none" }} />
        <div className="blob-c" style={{ position: "absolute", bottom: "25%", right: "8%", width: "12vw", height: "12vw", background: "#D4B8E0", opacity: 0.15, pointerEvents: "none" }} />
        <div className="blob-a" style={{ position: "absolute", bottom: "15%", left: "6%", width: "10vw", height: "10vw", background: "#FFB7D1", opacity: 0.1, pointerEvents: "none" }} />
        <div {...anim("hands")} style={{ ...anim("hands").style, maxWidth: 600, margin: "0 auto", overflow: "hidden", borderRadius: "16px 16px 0 0", position: "relative", zIndex: 1 }}>
          <img src="/sachets-both.png" alt="Both flavors" style={{ width: "100%", height: "auto", display: "block", marginBottom: "-12%" }} />
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section style={{ padding: "80px 24px 100px", background: "#FFB7D1", position: "relative", overflow: "hidden" }}>
        <div className="blob-b" style={{ position: "absolute", top: "10%", right: "5%", width: "18vw", height: "18vw", background: "#D4B8E0", opacity: 0.4, pointerEvents: "none" }} />
        <div className="blob-a" style={{ position: "absolute", bottom: "10%", left: "3%", width: "15vw", height: "15vw", background: "#C8FF3A", opacity: 0.15, pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div {...anim("test-head")} style={{ ...anim("test-head").style, textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#1B1F3B", marginBottom: 16 }}>
              Early testers
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#1B1F3B", lineHeight: 1.1 }}>
              What people are saying.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { quote: "I replaced my $7 oat milk latte with this. Tastes better, costs less, and I actually feel focused.", name: "Sarah M.", loc: "Austin, TX" },
              { quote: "The strawberry one is insane. My kids think it's a treat. I know it's fuel.", name: "Mike R.", loc: "Brooklyn, NY" },
              { quote: "Finally a matcha product that doesn't taste like grass. The vanilla is my daily non-negotiable.", name: "Jess L.", loc: "Portland, OR" },
            ].map((t, i) => (
              <div
                key={t.name}
                className="lift"
                {...anim(`test-${i}`, i * 0.1)}
                style={{
                  ...anim(`test-${i}`, i * 0.1).style,
                  padding: "28px 24px",
                  background: "#1B1F3B",
                  borderRadius: 8,
                }}
              >
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#FDF4EE", lineHeight: 1.55, marginBottom: 20 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#C8FF3A" }}>{t.name}</p>
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.68rem", color: "rgba(253,244,238,0.4)" }}>{t.loc} · Early tester</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FINAL CTA ════════════════════ */}
      <section
        id="cta"
        style={{
          padding: "100px 24px 60px",
          background: "#D4B8E0",
          color: "#1B1F3B",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cloud background overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/email-clouds-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />
        {/* Warm pink overlay to blend */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(212,184,224,0.6) 0%, rgba(255,183,209,0.3) 50%, rgba(212,184,224,0.5) 100%)", pointerEvents: "none" }} />
        <div className="blob-a" style={{ position: "absolute", top: "10%", right: "5%", width: "25vw", height: "25vw", background: "#FFB7D1", opacity: 0.3, pointerEvents: "none" }} />

        <div {...anim("cta-block")} style={{ ...anim("cta-block").style, maxWidth: 520, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#1B1F3B", marginBottom: 16 }}>
            Pre-launch list
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1, marginBottom: 14, color: "#1B1F3B" }}>
            Be first. Get 20% off + free shipping.
          </h2>
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.88rem", color: "rgba(27,31,59,0.5)", lineHeight: 1.6, marginBottom: 36 }}>
            Get 20% off + free shipping on your first order — add your phone for an extra 10% off code.
          </p>
          {step === "done" ? (
            <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1B1F3B" }}>
              ✓ You&apos;re on the list.
            </p>
          ) : step === "captcha" ? (
            <div>
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "#1B1F3B", marginBottom: 14 }}>
                Quick verification for {email}
              </p>
              {!captchaRef.current && <div ref={captchaRef} style={{ display: "flex", justifyContent: "center", marginBottom: 8 }} />}
              {loading && (
                <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(27,31,59,0.45)" }}>
                  Submitting...
                </p>
              )}
            </div>
          ) : step === "phone" ? (
            <div>
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "#1B1F3B", marginBottom: 14 }}>
                ✓ 20% off + free shipping locked in! Add your number for an extra 10% off code.
              </p>
              <form onSubmit={handlePhoneSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  style={{ flex: "1 1 240px", padding: "15px 20px", border: "2px solid #1B1F3B", background: "rgba(255,255,255,0.5)", color: "#1B1F3B", fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.95rem", fontWeight: 500, minWidth: 0 }}
                />
                <button type="submit" disabled={loading} style={{ padding: "15px 28px", border: "none", background: "#1B1F3B", color: "#C8FF3A", fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" }}>
                  {loading ? "…" : "Add phone →"}
                </button>
              </form>
              <button onClick={skipPhone} style={{ marginTop: 10, background: "transparent", border: "none", color: "rgba(27,31,59,0.45)", fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.72rem", cursor: "pointer", textDecoration: "underline" }}>
                Skip
              </button>
              <p style={{ margin: "8px 0 0", fontSize: "0.6rem", color: "rgba(27,31,59,0.35)", lineHeight: 1.4, maxWidth: 400 }}>
                By providing your phone number, you agree to receive marketing texts from shroomé. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ flex: "1 1 240px", padding: "15px 20px", border: "2px solid #1B1F3B", background: "rgba(255,255,255,0.5)", color: "#1B1F3B", fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.95rem", fontWeight: 500, minWidth: 0 }}
              />
              <button type="submit" disabled={loading} style={{ padding: "15px 28px", border: "none", background: "#1B1F3B", color: "#C8FF3A", fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" }}>
                {loading ? "…" : "Claim 20% off →"}
              </button>
            </form>
          )}
        </div>

        <div style={{ marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(27,31,59,0.08)", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 20 }}>
            {[
              { label: "TIKTOK", href: "https://tiktok.com/@drinkshroome" },
              { label: "INSTAGRAM", href: "https://instagram.com/drinkshroome" },
              { label: "YOUTUBE", href: "https://youtube.com/@drinkshroome" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", color: "#1B1F3B", textDecoration: "none" }}>
                {s.label}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.68rem", color: "rgba(27,31,59,0.3)", letterSpacing: "0.08em" }}>
            © 2026 shroomé · hello@drinkshroome.com
          </p>
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.62rem", color: "rgba(27,31,59,0.2)", marginTop: 8 }}>
            <a href="/privacy" style={{ color: "rgba(27,31,59,0.3)", textDecoration: "underline" }}>Privacy Policy</a>
            {" · "}
            <a href="/terms" style={{ color: "rgba(27,31,59,0.3)", textDecoration: "underline" }}>Terms of Service</a>
            {" · "}
            <a href="/faq" style={{ color: "rgba(27,31,59,0.3)", textDecoration: "underline" }}>FAQ</a>
          </p>
          <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "0.6rem", color: "rgba(27,31,59,0.2)", marginTop: 6 }}>
            @drinkshroome
          </p>
        </div>
      </section>
    </>
  );
}
