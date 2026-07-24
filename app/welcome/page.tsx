"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import MobileNav from "../MobileNav";
import { BRAND } from "../lib/brand";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* ── Color tokens ─────────────────────────────────────────────────────────
   Literal hexes from BRAND (not CSS vars): this page builds 8-digit
   hex-alpha colors via template concatenation (e.g. `${C.canvas}20`),
   which requires real hex literals. */
const C = {
  canvas: BRAND.colors.canvas,
  ink: BRAND.colors.ink,
  accent: BRAND.colors.accent,
  flavorStrawberry: BRAND.colors.flavorStrawberry,
  flavorFunctional: BRAND.colors.flavorFunctional,
  white: "#FFFFFF",
  muted: "#7A7A8E",
} as const;

/* ── Font stacks ──────────────────────────────────── */
const F = {
  heading: BRAND.fonts.display,
  body: BRAND.fonts.body,
  mono: BRAND.fonts.mono,
} as const;

/* ── Shared styles ────────────────────────────────── */
const wrap: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

export default function WelcomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [step, setStep] = useState<"email" | "captcha">("email");
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading" || step === "captcha") return;
    setStatus("idle");
    setStep("captcha");
  };

  const onTurnstileSuccess = useCallback(async (token: string) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: token }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      window.gtag?.("event", "sign_up", {
        method: "waitlist",
        event_label: "welcome_landing",
      });
      window.gtag?.("event", "generate_lead", {
        currency: "USD",
        value: 5.0,
      });
    } catch {
      setStatus("error");
      setStep("email");
    }
  }, [email]);

  // Load the Turnstile script and render the widget when the captcha step is
  // active (the API rejects token-less signups when Turnstile is configured).
  // Same pattern as app/refer/page.tsx — falls back to Cloudflare's always-pass
  // test sitekey when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (dev).
  useEffect(() => {
    if (step !== "captcha" || status === "done") return;
    const renderWidget = () => {
      if (!captchaRef.current || !window.turnstile) return;
      if (widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey: (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.startsWith("REPLACE")) ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : "1x00000000000000000000AA",
        callback: onTurnstileSuccess,
        // Never submit an empty/fake token (the API fails closed) — return to
        // the email step; resubmitting renders a fresh widget + fresh token.
        "error-callback": () => {
          setStatus("error");
          setStep("email");
        },
        theme: "dark",
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
  }, [step, status, onTurnstileSuccess]);

  return (
    <div style={{ background: C.canvas, color: C.ink, minHeight: "100vh" }}>
      <style>{`@media(max-width:768px){.wel-nav-cta{display:none !important}}`}</style>
      {/* ── NAV ────────────────────────────────────── */}
      <nav
        style={{
          ...wrap,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative" as const,
        }}
      >
        <a
          href="/welcome"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: C.ink,
          }}
        >
          <Image
            src="/brand/symbol-sheep-solid.png"
            alt="shroomé S"
            width={28}
            height={28}
            style={{ borderRadius: 6 }}
          />
          <img src="/brand/wordmark.png" alt="shroomé" style={{ height: 22, width: "auto" }} />
        </a>
        <a
          href="#signup"
          className="wel-nav-cta"
          style={{
            fontFamily: F.body,
            fontSize: 14,
            fontWeight: 600,
            background: C.ink,
            color: C.canvas,
            padding: "10px 22px",
            borderRadius: 100,
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "opacity .2s",
          }}
        >
          Join the Flock &rarr;
        </a>
        <MobileNav
          prefix="wel"
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

      {/* ── HERO ───────────────────────────────────── */}
      <section
        style={{
          ...wrap,
          textAlign: "center",
          paddingTop: 80,
          paddingBottom: 72,
        }}
      >
        {/* Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: F.mono,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.muted,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.accent,
              display: "inline-block",
              boxShadow: `0 0 6px ${C.accent}`,
            }}
          />
          You found us
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: F.heading,
            fontStyle: "normal",
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 auto 24px",
            maxWidth: 720,
            fontWeight: 400,
          }}
        >
          The matcha latte that{" "}
          <em style={{ fontStyle: "normal", color: C.ink }}>
            replaced our coffee.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: F.body,
            fontSize: "clamp(16px, 2.2vw, 19px)",
            lineHeight: 1.6,
            color: C.muted,
            maxWidth: 560,
            margin: "0 auto",
            fontWeight: 400,
          }}
        >
          Your cafe matcha order — the good one, with the lion&apos;s mane and the
          collagen — already made, waiting in your fridge. Tear, pour over milk, go.
          No crash, no line, no name spelled wrong on a cup.
        </p>
        <div style={{ position: "relative", maxWidth: 380, margin: "40px auto 0" }}>
          <img
            src="/brand/hero-pour.jpg"
            alt="shroomé sachet pouring vivid green matcha over milk in a bubble glass"
            style={{ width: "100%", height: "auto", borderRadius: 28, border: "3px solid " + C.ink, boxShadow: "0 22px 52px rgba(45,52,26,0.22)", transform: "rotate(1.5deg)", display: "block" }}
          />
          <img
            src="/brand/badge-ready-to-pour.png"
            alt=""
            aria-hidden
            style={{ position: "absolute", top: -26, left: -22, width: 96, height: "auto", transform: "rotate(-10deg)", filter: "drop-shadow(0 8px 16px rgba(45,52,26,0.2))" }}
          />
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ─────────────────────── */}
      <div
        style={{
          borderTop: `1px solid ${C.ink}12`,
          borderBottom: `1px solid ${C.ink}12`,
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            ...wrap,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            fontFamily: F.mono,
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: C.muted,
          }}
        >
          {[
            "Real Lion's Mane",
            "Ceremonial Grade",
            "Grass-Fed Collagen",
            "Zero Crash",
          ].map((item) => (
            <span
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ color: C.accent, fontSize: 14 }}>&#10022;</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── THREE-COLUMN FEATURES ──────────────────── */}
      <section style={{ ...wrap, paddingTop: 88, paddingBottom: 88 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: 32,
          }}
        >
          {(
            [
              {
                label: "Real Lion's Mane",
                accent: C.flavorFunctional,
                body: "The kind that actually does something — clear-headed focus you can feel, zero mushroom taste.",
              },
              {
                label: "Ceremonial Matcha",
                accent: C.accent,
                body: "First-harvest, shade-grown 21+ days, stone-ground. ~60mg caffeine + natural L-theanine.",
              },
              {
                label: "Collagen Peptides",
                accent: C.flavorFunctional,
                body: "2g grass-fed bovine, hydrolyzed for absorption. Types I & III for skin, joints, gut.",
              },
            ] as const
          ).map((card) => (
            <div
              key={card.label}
              style={{
                background: C.white,
                borderRadius: 16,
                padding: "40px 32px",
                border: `1px solid ${C.ink}08`,
              }}
            >
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: C.muted,
                  background: `${card.accent}30`,
                  padding: "4px 12px",
                  borderRadius: 100,
                }}
              >
                {card.label}
              </span>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: C.ink,
                  marginTop: 20,
                  marginBottom: 0,
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────── */}
      <section
        style={{
          ...wrap,
          paddingTop: 24,
          paddingBottom: 96,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.muted,
          }}
        >
          How it works
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(32px, 8vw, 80px)",
            marginTop: 48,
            flexWrap: "wrap",
          }}
        >
          {(
            [
              { num: "1", text: "Pour" },
              { num: "2", text: "Swirl" },
              { num: "3", text: "Go" },
            ] as const
          ).map((s) => (
            <div key={s.num} style={{ minWidth: 120 }}>
              <div
                style={{
                  fontFamily: F.heading,
                  fontStyle: "normal",
                  fontSize: 48,
                  lineHeight: 1,
                  color: C.ink,
                  marginBottom: 12,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: F.body,
                  fontSize: 15,
                  color: C.muted,
                  fontWeight: 500,
                }}
              >
                {s.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE ARRIVAL ───────────────────────────── */}
      <section style={{ background: C.canvas, padding: "72px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, marginBottom: 14 }}>
          Your cafe order, waiting at the door
        </p>
        <h2 style={{ fontFamily: F.heading, fontWeight: 800, fontSize: "clamp(26px, 4vw, 38px)", color: C.ink, letterSpacing: "-0.02em", marginBottom: 24 }}>
          Cafe energy. Home address.
        </h2>
        <img
          src="/brand/shipper-box.jpg"
          alt="The shroomé box on a doorstep"
          loading="lazy"
          style={{ width: "100%", maxWidth: 640, height: "auto", borderRadius: 24, border: "3px solid " + C.ink, boxShadow: "0 18px 44px rgba(45,52,26,0.18)", margin: "0 auto", display: "block" }}
        />
      </section>

      {/* ── EMAIL SIGNUP ───────────────────────────── */}
      <section
        id="signup"
        style={{
          background: C.ink,
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/brand/wordmark-scatter.png"
          alt=""
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, pointerEvents: "none" }}
        />
        <div
          style={{
            maxWidth: 520,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <h2
            style={{
              fontFamily: F.heading,
              fontStyle: "normal",
              fontSize: "clamp(28px, 5vw, 40px)",
              color: C.canvas,
              lineHeight: 1.15,
              marginBottom: 12,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Drop 001 poured out in 9 days. Don&rsquo;t sleep on 002.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: 14,
              color: `${C.canvas}99`,
              marginBottom: 36,
            }}
          >
            The list gets the Drop 002 link before it&rsquo;s public. No spam — just the flock.
          </p>

          {status === "done" ? (
            <div
              style={{
                fontFamily: F.body,
                fontSize: 16,
                color: C.accent,
                fontWeight: 600,
                padding: "16px 0",
              }}
            >
              <img src="/brand/sheep-drink.png" alt="" aria-hidden style={{ width: 76, height: "auto", margin: "0 auto 14px", display: "block" }} />
              You&rsquo;re in! Check your email.
            </div>
          ) : step === "captcha" ? (
            <div>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  color: `${C.canvas}99`,
                  marginBottom: 12,
                }}
              >
                One quick check&hellip;
              </p>
              <div ref={captchaRef} style={{ display: "flex", justifyContent: "center", minHeight: 65 }} />
              {status === "loading" && (
                <p style={{ fontFamily: F.body, fontSize: 13, color: `${C.canvas}99`, marginTop: 12 }}>
                  Joining...
                </p>
              )}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 12,
                maxWidth: 440,
                margin: "0 auto",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1 1 240px",
                  fontFamily: F.body,
                  fontSize: 15,
                  padding: "14px 20px",
                  borderRadius: 100,
                  border: `1px solid ${C.canvas}20`,
                  background: `${C.canvas}10`,
                  color: C.canvas,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  fontFamily: F.body,
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "14px 28px",
                  borderRadius: 100,
                  border: "none",
                  background: C.accent,
                  color: C.canvas,
                  cursor: status === "loading" ? "wait" : "pointer",
                  opacity: status === "loading" ? 0.6 : 1,
                  transition: "opacity .2s",
                  letterSpacing: "0.01em",
                }}
              >
                {status === "loading" ? "Joining..." : "Join the Flock →"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p
              style={{
                fontFamily: F.body,
                fontSize: 13,
                color: C.flavorFunctional,
                marginTop: 16,
              }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer
        style={{
          ...wrap,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 24px",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 12,
            color: C.muted,
          }}
        >
          &copy; 2026 shroomé &middot; hello@drinkshroome.com
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "TikTok", href: "https://tiktok.com/@drinkshroome" },
            { label: "Instagram", href: "https://instagram.com/drinkshroome" },
            { label: "YouTube", href: "https://youtube.com/@drinkshroome" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: F.mono,
                fontSize: 12,
                color: C.muted,
                textDecoration: "none",
                transition: "color .2s",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
