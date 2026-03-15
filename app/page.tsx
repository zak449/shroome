"use client";

import { useState } from "react";

const TICKER_ITEMS = [
  "PRE-LAUNCH",
  "40% OFF FIRST ORDER",
  "COMING SOON",
  "SHROOMÉ",
  "CEREMONIAL MATCHA",
  "FUNCTIONAL MUSHROOMS",
  "CAFÉ ENERGY AT HOME",
  "JOIN THE LIST",
];

const BENEFITS = [
  {
    icon: "⚡",
    title: "Clean, lasting energy",
    body: "No crash. No jitters. Matcha's L-theanine + caffeine delivers smooth, focused energy that lasts hours — not minutes.",
  },
  {
    icon: "🧠",
    title: "Sharpened focus",
    body: "Lion's mane supports neurogenesis and cognitive clarity. Think clearer, create better, stay present.",
  },
  {
    icon: "🍵",
    title: "Ceremonial grade only",
    body: "First-harvest, shade-grown. The stuff cafés charge $9 for. We put it in a sachet so you don't have to go anywhere.",
  },
  {
    icon: "✦",
    title: "3g precision dose",
    body: "Perfectly measured every time. No clumping, no mess, no under-dosing. Tear, pour, done in 60 seconds.",
  },
  {
    icon: "🌿",
    title: "Works with any milk",
    body: "Oat. Almond. Coconut. Whole. Hot or iced. Your latte, your rules.",
  },
  {
    icon: "🏠",
    title: "The café came to you",
    body: "Same quality. No commute. No line. No $7 parking. Just you, your kitchen, and an obscenely good matcha.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Tear open your sachet",
    body: "3g of ceremonial matcha + functional mushroom blend. Pre-measured. Zero waste. Zero thinking.",
  },
  {
    num: "02",
    title: "Pour over your latte base",
    body: "Steamed oat milk, almond milk, coconut — whatever's yours. Hot or iced. You're the barista now.",
  },
  {
    num: "03",
    title: "Feel the shift",
    body: "Clean energy rises. Focus sets in. This is your café. It doesn't close.",
  },
];

function SachetVisual({ scale = 1 }: { scale?: number }) {
  const w = Math.round(280 * scale);
  const h = Math.round(390 * scale);

  return (
    <div className="sachet-float" style={{ position: "relative", filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.6))" }}>
      {/* Outer glow ring */}
      <div style={{
        position: "absolute",
        inset: "-20px",
        borderRadius: "40px",
        background: "radial-gradient(ellipse at center, rgba(142,214,110,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        width: w,
        height: h,
        borderRadius: Math.round(24 * scale),
        background: "linear-gradient(160deg, #122D1A 0%, #0E2416 35%, #0A1C10 70%, #0E2416 100%)",
        border: "1px solid rgba(142,214,110,0.22)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: Math.round(14 * scale),
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle background texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
          pointerEvents: "none",
        }} />

        {/* Tear strip */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Math.round(44 * scale),
          background: "linear-gradient(180deg, rgba(142,214,110,0.12) 0%, transparent 100%)",
          borderBottom: "1px dashed rgba(142,214,110,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontSize: Math.round(8 * scale),
            letterSpacing: "0.22em",
            color: "rgba(142,214,110,0.5)",
            fontFamily: "'DM Mono', monospace",
            textTransform: "uppercase",
          }}>
            ✂ tear here
          </span>
        </div>

        {/* Brand name */}
        <span className="font-serif" style={{
          fontSize: Math.round(30 * scale),
          color: "#F2EDDF",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginTop: Math.round(22 * scale),
          position: "relative",
          zIndex: 1,
        }}>
          Shroomé
        </span>

        {/* Matcha orb */}
        <div style={{
          width: Math.round(88 * scale),
          height: Math.round(88 * scale),
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #C4EBA0 0%, #8ED66E 25%, #4A9E4A 55%, #1E5520 80%, #0E2A16 100%)",
          boxShadow: `0 0 ${Math.round(40 * scale)}px rgba(142,214,110,0.5), 0 0 ${Math.round(80 * scale)}px rgba(142,214,110,0.15)`,
          position: "relative",
          zIndex: 1,
        }} />

        {/* Tagline */}
        <span style={{
          fontSize: Math.round(9 * scale),
          letterSpacing: "0.2em",
          color: "rgba(242,237,223,0.4)",
          fontFamily: "'DM Mono', monospace",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}>
          Ceremonial Matcha Latte
        </span>

        {/* Ingredient pills */}
        <div style={{ display: "flex", gap: Math.round(6 * scale), position: "relative", zIndex: 1 }}>
          {["Lion's Mane", "Chaga"].map((name, i) => (
            <div key={i} style={{
              padding: `${Math.round(3 * scale)}px ${Math.round(10 * scale)}px`,
              borderRadius: 999,
              border: "1px solid rgba(142,214,110,0.2)",
              fontSize: Math.round(8 * scale),
              color: "rgba(142,214,110,0.65)",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {name}
            </div>
          ))}
        </div>

        {/* Dose line */}
        <span style={{
          fontSize: Math.round(11 * scale),
          color: "rgba(142,214,110,0.6)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.12em",
          position: "relative",
          zIndex: 1,
        }}>
          3g · Single Sachet
        </span>

        {/* Bottom strip */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: Math.round(30 * scale),
          background: "rgba(142,214,110,0.05)",
          borderTop: "1px solid rgba(142,214,110,0.1)",
        }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [status2, setStatus2] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(
    e: React.FormEvent,
    emailVal: string,
    setS: React.Dispatch<React.SetStateAction<"idle" | "loading" | "success" | "error">>
  ) {
    e.preventDefault();
    if (!emailVal) return;
    setS("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailVal }),
      });
      setS(res.ok ? "success" : "error");
    } catch {
      setS("error");
    }
  }

  const TickerContent = () => (
    <>
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-6">
          <span className="font-mono-dm text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(242,237,223,0.5)" }}>
            {item}
          </span>
          <span style={{ color: "#8ED66E", opacity: 0.5 }}>✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "#090E0A" }}>

      {/* ── Ticker ── */}
      <div className="overflow-hidden py-2.5 border-b" style={{ borderColor: "rgba(142,214,110,0.12)", background: "#0A1209" }}>
        <div className="ticker-track">
          <TickerContent /><TickerContent /><TickerContent /><TickerContent />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-4"
        style={{ background: "rgba(9,14,10,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(242,237,223,0.05)" }}
      >
        <span className="font-serif text-xl uppercase" style={{ color: "#F2EDDF", letterSpacing: "0.22em" }}>
          Shroomé
        </span>
        <a href="#waitlist" className="btn-ghost rounded-full px-5 py-2 text-xs font-medium">
          Get 40% Off →
        </a>
      </nav>

      {/* ─────────────────────────────────────────
          HERO — Split editorial layout
      ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden grain-overlay"
        style={{ background: "#090E0A", minHeight: "96vh" }}
      >
        {/* Ambient glow — warm green + amber hint */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 65% 80% at 68% 55%, rgba(142,214,110,0.1) 0%, rgba(210,180,60,0.04) 50%, transparent 72%)",
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16"
          style={{ minHeight: "96vh", display: "flex", alignItems: "center", paddingTop: "60px", paddingBottom: "60px" }}>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center w-full">

            {/* ── Left: Editorial text ── */}
            <div>
              {/* Pre-launch badge */}
              <div className="fade-up delay-100 inline-flex items-center gap-2 mb-8" style={{
                padding: "5px 14px",
                borderRadius: 999,
                border: "1px solid rgba(142,214,110,0.25)",
                background: "rgba(142,214,110,0.07)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8ED66E", display: "inline-block" }} />
                <span className="font-mono-dm" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8ED66E" }}>
                  Coming Soon · Pre-Launch
                </span>
              </div>

              {/* Headline — very large Playfair */}
              <h1 className="font-serif fade-up delay-200" style={{ marginBottom: "1.75rem" }}>
                <span style={{
                  display: "block",
                  fontSize: "clamp(4.2rem, 12vw, 9.5rem)",
                  lineHeight: 0.87,
                  color: "#F2EDDF",
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                }}>
                  Café<br />Energy.
                </span>
                <em style={{
                  display: "block",
                  fontSize: "clamp(4.2rem, 12vw, 9.5rem)",
                  lineHeight: 0.87,
                  color: "#8ED66E",
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "-0.025em",
                  marginTop: "0.05em",
                }}>
                  Home<br />Address.
                </em>
              </h1>

              {/* Subhead */}
              <p className="fade-up delay-350" style={{
                color: "rgba(242,237,223,0.58)",
                fontSize: "1.05rem",
                lineHeight: 1.72,
                maxWidth: "400px",
                fontWeight: 300,
                marginBottom: "2.5rem",
              }}>
                3g ceremonial matcha + functional mushrooms in one sachet.
                Pour over your latte base.{" "}
                <em style={{ color: "#8ED66E", fontStyle: "italic" }}>Feel the shift.</em>
              </p>

              {/* Email form */}
              <form
                id="waitlist"
                className="fade-up delay-500"
                onSubmit={(e) => handleSubmit(e, email, setStatus)}
              >
                {status === "success" ? (
                  <div style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                    padding: "20px 24px",
                    borderRadius: "16px",
                    background: "rgba(142,214,110,0.1)",
                    border: "1px solid rgba(142,214,110,0.3)",
                    maxWidth: "420px",
                  }}>
                    <span style={{ fontSize: "1.6rem" }}>🍵</span>
                    <p style={{ color: "#8ED66E", fontWeight: 600, fontSize: "0.92rem" }}>
                      You&apos;re on the list! Your 40% off code is on its way.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: "flex",
                    gap: "10px",
                    maxWidth: "440px",
                    flexWrap: "wrap",
                  }}>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="waitlist-input"
                      style={{ flex: "1 1 180px", borderRadius: 999, padding: "14px 22px", fontSize: "0.88rem" }}
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-matcha"
                      style={{ borderRadius: 999, padding: "14px 26px", fontSize: "0.78rem", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}
                    >
                      {status === "loading" ? "Joining..." : "Claim 40% Off →"}
                    </button>
                  </div>
                )}
                {status === "error" && (
                  <p style={{ marginTop: "10px", fontSize: "0.75rem", color: "#e57373" }}>
                    Something went wrong. Try again.
                  </p>
                )}
                <p style={{ marginTop: "12px", fontSize: "0.7rem", color: "rgba(242,237,223,0.25)" }}>
                  No spam. Just your discount code + launch day priority access.
                </p>
              </form>

              {/* Social proof */}
              <div className="fade-up delay-650" style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex" }}>
                  {["#A0C878", "#7BA85E", "#C4EBA0", "#8ED66E"].map((c, i) => (
                    <div key={i} style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: c,
                      border: "2px solid #090E0A",
                      marginLeft: i > 0 ? -7 : 0,
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.78rem", color: "rgba(242,237,223,0.4)" }}>
                  <span style={{ color: "#8ED66E", fontWeight: 600 }}>First 500</span> on the list get exclusive 40% off
                </p>
              </div>
            </div>

            {/* ── Right: Sachet hero visual ── */}
            <div className="flex justify-center lg:justify-end items-center lg:pr-8">
              <SachetVisual scale={1} />
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          WARM CREAM SECTION — The Formula
          (Clevr/Graza-inspired color break)
      ───────────────────────────────────────── */}
      <section style={{ background: "#F4EDE0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "96px", paddingBottom: "96px" }}>

          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "64px" }}>
            <div style={{ width: "28px", height: "1px", background: "rgba(13,15,10,0.25)" }} />
            <span className="font-mono-dm" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(13,15,10,0.45)" }}>
              The Formula
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Editorial copy + ingredient list */}
            <div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.05,
                color: "#0D0F0A",
                fontWeight: 800,
                marginBottom: "20px",
              }}>
                We built the café
                <br />
                <em style={{ color: "#2E7A2E", fontWeight: 400 }}>inside a sachet.</em>
              </h2>
              <p style={{
                fontSize: "1.05rem",
                color: "rgba(13,15,10,0.58)",
                lineHeight: 1.78,
                marginBottom: "48px",
                maxWidth: "440px",
              }}>
                Shroomé is a 3g ceremonial-grade matcha latte with functional mushrooms — precision-dosed in a single sachet. Tear it open, pour over your milk of choice, and you&apos;ve got a $9 café drink in under 60 seconds. At home. In your kitchen. In your pajamas.
              </p>

              {/* Ingredient list — editorial numbered */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { num: "01", name: "Ceremonial Matcha", detail: "First-harvest, shade-grown. Not the culinary powder.", tag: "First-harvest" },
                  { num: "02", name: "Lion's Mane", detail: "Cognitive clarity. Creative focus. Neurogenesis.", tag: "Functional" },
                  { num: "03", name: "Chaga", detail: "Adaptogenic immune support. Deep forest energy.", tag: "Adaptogenic" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    padding: "22px 0",
                    borderBottom: "1px solid rgba(13,15,10,0.09)",
                  }}>
                    <span className="font-serif" style={{
                      fontSize: "2.2rem",
                      color: "rgba(13,15,10,0.12)",
                      fontStyle: "italic",
                      lineHeight: 1,
                      minWidth: "48px",
                      fontWeight: 700,
                    }}>
                      {item.num}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.97rem", color: "#0D0F0A" }}>{item.name}</span>
                        <span style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#2E7A2E",
                          background: "rgba(46,122,46,0.1)",
                          padding: "2px 9px",
                          borderRadius: 999,
                          fontFamily: "'DM Mono', monospace",
                        }}>
                          {item.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "rgba(13,15,10,0.48)", lineHeight: 1.55 }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Big stat + secondary stats */}
            <div>
              {/* 3g hero stat box */}
              <div style={{
                padding: "48px 44px",
                background: "#0E2A16",
                borderRadius: "24px",
                marginBottom: "16px",
              }}>
                <span className="font-serif" style={{
                  display: "block",
                  fontSize: "7rem",
                  color: "#8ED66E",
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                }}>
                  3g
                </span>
                <span className="font-mono-dm" style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(242,237,223,0.4)",
                  marginTop: "10px",
                }}>
                  Precision dose · Every sachet
                </span>
                <p style={{ fontSize: "0.9rem", color: "rgba(242,237,223,0.58)", marginTop: "18px", lineHeight: 1.65 }}>
                  No guesswork. No measuring. Just the perfect amount, every single time. The café standard, in your hands.
                </p>
              </div>

              {/* Stat row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { val: "60s", label: "From sachet to sip" },
                  { val: "$9", label: "What the café charges" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: "24px 22px",
                    background: "rgba(13,15,10,0.06)",
                    borderRadius: "16px",
                    border: "1px solid rgba(13,15,10,0.07)",
                  }}>
                    <span className="font-serif" style={{
                      display: "block",
                      fontSize: "2.6rem",
                      color: "#0D0F0A",
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}>
                      {stat.val}
                    </span>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "rgba(13,15,10,0.45)", marginTop: "8px", lineHeight: 1.4 }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          BENEFITS — Back to dark, editorial layout
      ───────────────────────────────────────── */}
      <section style={{ background: "#0A1209", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

          {/* Asymmetric header — label left, copy right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-end mb-16">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <div style={{ width: "28px", height: "1px", background: "rgba(142,214,110,0.4)" }} />
                <span className="font-mono-dm" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(142,214,110,0.55)" }}>
                  Why Shroomé
                </span>
              </div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#F2EDDF",
                fontWeight: 800,
                lineHeight: 1.05,
              }}>
                Everything you want
                <br />
                <em style={{ color: "#8ED66E" }}>from your morning run.</em>
              </h2>
            </div>
            <div className="md:col-span-2 md:pb-1">
              <p style={{ color: "rgba(242,237,223,0.45)", fontSize: "1.05rem", lineHeight: 1.78 }}>
                Minus the wait. Minus the cost. Minus the fact that the barista misspelled your name on the cup again.
              </p>
            </div>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="feature-card rounded-2xl p-7">
                <span style={{ fontSize: 26, display: "block", marginBottom: 14 }}>{b.icon}</span>
                <h3 className="font-serif mb-2" style={{ color: "#F2EDDF", fontSize: "1.1rem", fontWeight: 600 }}>
                  {b.title}
                </h3>
                <p style={{ color: "rgba(242,237,223,0.45)", fontSize: "0.87rem", lineHeight: 1.68 }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          HOW IT WORKS — Dark, clean
      ───────────────────────────────────────── */}
      <section style={{ background: "#090E0A", padding: "96px 0" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
            <div style={{ width: "28px", height: "1px", background: "rgba(142,214,110,0.35)" }} />
            <span className="font-mono-dm" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(142,214,110,0.5)" }}>
              The Ritual
            </span>
          </div>

          <h2 className="font-serif mb-16" style={{
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            color: "#F2EDDF",
            fontWeight: 800,
            lineHeight: 1.08,
          }}>
            Three steps between you
            <br />
            <em style={{ color: "#8ED66E" }}>and your best matcha yet.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {STEPS.map((step, i) => (
              <div key={i}>
                <div className="step-num mb-3">{step.num}</div>
                <div style={{
                  height: 1,
                  background: "linear-gradient(90deg, rgba(142,214,110,0.35), transparent)",
                  marginBottom: "22px",
                }} />
                <h3 className="font-serif mb-3" style={{ color: "#F2EDDF", fontSize: "1.2rem", fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p style={{ color: "rgba(242,237,223,0.45)", lineHeight: 1.68, fontSize: "0.9rem" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECOND CTA — Rich dark forest
      ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden grain-overlay"
        style={{
          background: "linear-gradient(150deg, #0E2A16 0%, #0B1C10 55%, #122418 100%)",
          padding: "120px 24px",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 65% 75% at 50% 50%, rgba(142,214,110,0.1) 0%, transparent 70%)",
        }} />

        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
            <div style={{ width: "28px", height: "1px", background: "rgba(142,214,110,0.4)" }} />
            <span className="font-mono-dm" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(142,214,110,0.6)" }}>
              Limited Pre-Launch Offer
            </span>
            <div style={{ width: "28px", height: "1px", background: "rgba(142,214,110,0.4)" }} />
          </div>

          <h2 className="font-serif mb-6" style={{
            fontSize: "clamp(2.5rem, 7vw, 4.8rem)",
            lineHeight: 0.95,
            color: "#F2EDDF",
            fontWeight: 900,
          }}>
            Your couch is the
            <br />
            <em style={{ color: "#8ED66E" }}>best seat in the house.</em>
          </h2>

          <p style={{ color: "rgba(242,237,223,0.55)", lineHeight: 1.78, marginBottom: "40px", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 40px" }}>
            Join the Shroomé pre-launch list and lock in{" "}
            <strong style={{ color: "#8ED66E", fontWeight: 700 }}>40% off your first order</strong> — plus first access when we drop.
            Only the first 500 signups qualify.
          </p>

          <form onSubmit={(e) => handleSubmit(e, email2, setStatus2)}>
            {status2 === "success" ? (
              <div style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                padding: "36px 48px",
                borderRadius: "20px",
                background: "rgba(142,214,110,0.1)",
                border: "1px solid rgba(142,214,110,0.3)",
              }}>
                <span style={{ fontSize: "2.5rem" }}>🍵</span>
                <p style={{ color: "#8ED66E", fontWeight: 600, fontSize: "1.05rem" }}>
                  You&apos;re in! Check your inbox.
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(242,237,223,0.35)" }}>
                  Welcome to the pre-launch fam.
                </p>
              </div>
            ) : (
              <div style={{
                display: "flex",
                gap: "10px",
                maxWidth: "480px",
                margin: "0 auto",
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  className="waitlist-input"
                  style={{ flex: "1 1 200px", borderRadius: 999, padding: "16px 24px", fontSize: "0.9rem" }}
                />
                <button
                  type="submit"
                  disabled={status2 === "loading"}
                  className="btn-matcha"
                  style={{ borderRadius: 999, padding: "16px 30px", fontSize: "0.78rem", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}
                >
                  {status2 === "loading" ? "Joining..." : "Get 40% Off →"}
                </button>
              </div>
            )}
            {status2 === "error" && (
              <p style={{ marginTop: "10px", fontSize: "0.75rem", color: "#e57373" }}>
                Something went wrong. Refresh and try again.
              </p>
            )}
          </form>

          <p style={{ marginTop: "18px", fontSize: "0.7rem", color: "rgba(242,237,223,0.22)" }}>
            Only the first 500 signups get 40% off. We won&apos;t spam you. Promise.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#090E0A", borderTop: "1px solid rgba(242,237,223,0.05)", padding: "40px 24px" }}>
        <div className="max-w-7xl mx-auto" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <span className="font-serif" style={{ fontSize: "1.1rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,223,0.55)" }}>
            Shroomé
          </span>
          <p style={{ fontSize: "0.7rem", color: "rgba(242,237,223,0.22)", textAlign: "center", lineHeight: 1.6 }}>
            © 2026 Shroomé · Ceremonial matcha, functional mushrooms, no nonsense.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "hello@drinkshroome.com", href: "mailto:hello@drinkshroome.com" },
              { label: "Join the list", href: "#waitlist" },
            ].map((link, i) => (
              <a key={i} href={link.href} style={{ fontSize: "0.72rem", color: "rgba(242,237,223,0.3)", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#8ED66E")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(242,237,223,0.3)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
