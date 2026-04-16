"use client";

import { useState } from "react";
import Image from "next/image";
import MobileNav from "../MobileNav";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* ── Color tokens ─────────────────────────────────── */
const C = {
  cream: "#FDF4EE",
  navy: "#1B1F3B",
  lime: "#C8FF3A",
  pink: "#FFB7D1",
  lavender: "#D4B8E0",
  white: "#FFFFFF",
  muted: "#7A7A8E",
} as const;

/* ── Font stacks ──────────────────────────────────── */
const F = {
  heading: "'Instrument Serif', Georgia, serif",
  body: "'Syne', system-ui, sans-serif",
  mono: "'DM Mono', 'SF Mono', monospace",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken: "welcome-page" }),
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
    }
  };

  return (
    <div style={{ background: C.cream, color: C.navy, minHeight: "100vh" }}>
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
            color: C.navy,
          }}
        >
          <Image
            src="/logo-mark.png"
            alt="shroomé S"
            width={28}
            height={28}
            style={{ borderRadius: 6 }}
          />
          <span
            style={{
              fontFamily: F.heading,
              fontStyle: "italic",
              fontSize: 22,
              letterSpacing: "-0.02em",
            }}
          >
            shroomé
          </span>
        </a>
        <a
          href="#signup"
          className="wel-nav-cta"
          style={{
            fontFamily: F.body,
            fontSize: 14,
            fontWeight: 600,
            background: C.navy,
            color: C.cream,
            padding: "10px 22px",
            borderRadius: 100,
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "opacity .2s",
          }}
        >
          Get 20% off &rarr;
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
              background: C.lime,
              display: "inline-block",
              boxShadow: `0 0 6px ${C.lime}`,
            }}
          />
          You found us
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: F.heading,
            fontStyle: "italic",
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 auto 24px",
            maxWidth: 720,
            fontWeight: 400,
          }}
        >
          The matcha latte that{" "}
          <em style={{ fontStyle: "italic", color: C.navy }}>
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
          2.5g ceremonial matcha. Functional mushroom extracts. Collagen peptides.
          One sachet. 15 seconds. No crash.
        </p>
      </section>

      {/* ── SOCIAL PROOF STRIP ─────────────────────── */}
      <div
        style={{
          borderTop: `1px solid ${C.navy}12`,
          borderBottom: `1px solid ${C.navy}12`,
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
            "70%+ Beta-Glucans",
            "Ceremonial Grade",
            "Grass-Fed Collagen",
            "Zero Crash",
          ].map((item) => (
            <span
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ color: C.lime, fontSize: 14 }}>&#10022;</span>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
          }}
        >
          {(
            [
              {
                label: "Real Mushrooms",
                accent: C.lavender,
                body: "200mg fruiting body extracts standardized to 70%+ beta-glucan concentration. Not mycelium-on-grain.",
              },
              {
                label: "Ceremonial Matcha",
                accent: C.lime,
                body: "First-harvest, shade-grown 21+ days, stone-ground. ~60mg caffeine + natural L-theanine.",
              },
              {
                label: "Collagen Peptides",
                accent: C.pink,
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
                border: `1px solid ${C.navy}08`,
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
                  color: C.navy,
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
              { num: "1", text: "Tear" },
              { num: "2", text: "Pour over milk" },
              { num: "3", text: "Feel the shift" },
            ] as const
          ).map((s) => (
            <div key={s.num} style={{ minWidth: 120 }}>
              <div
                style={{
                  fontFamily: F.heading,
                  fontStyle: "italic",
                  fontSize: 48,
                  lineHeight: 1,
                  color: C.navy,
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

      {/* ── EMAIL SIGNUP ───────────────────────────── */}
      <section
        id="signup"
        style={{
          background: C.navy,
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: F.heading,
              fontStyle: "italic",
              fontSize: "clamp(28px, 5vw, 40px)",
              color: C.cream,
              lineHeight: 1.15,
              marginBottom: 12,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Be first. Get 20% off + free shipping.
          </h2>
          <p
            style={{
              fontFamily: F.body,
              fontSize: 14,
              color: `${C.cream}99`,
              marginBottom: 36,
            }}
          >
            Join the pre-launch list. No spam, just early access.
          </p>

          {status === "done" ? (
            <div
              style={{
                fontFamily: F.body,
                fontSize: 16,
                color: C.lime,
                fontWeight: 600,
                padding: "16px 0",
              }}
            >
              You&rsquo;re in! Check your email.
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
                  border: `1px solid ${C.cream}20`,
                  background: `${C.cream}10`,
                  color: C.cream,
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
                  background: C.lime,
                  color: C.navy,
                  cursor: status === "loading" ? "wait" : "pointer",
                  opacity: status === "loading" ? 0.6 : 1,
                  transition: "opacity .2s",
                  letterSpacing: "0.01em",
                }}
              >
                {status === "loading" ? "Joining..." : "Join the list"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p
              style={{
                fontFamily: F.body,
                fontSize: 13,
                color: C.pink,
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
