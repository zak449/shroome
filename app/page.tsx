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
    body: "No crash. No jitters. Matcha's L-theanine + caffeine combo delivers smooth, focused energy that lasts hours — not minutes.",
  },
  {
    icon: "🧠",
    title: "Sharpened focus",
    body: "Lion's mane mushroom supports neurogenesis and cognitive clarity. Think clearer, create better, stay present.",
  },
  {
    icon: "🍵",
    title: "Ceremonial grade",
    body: "We don't cut corners. Only first-harvest, shade-grown ceremonial matcha — the stuff cafés charge $8 for.",
  },
  {
    icon: "✦",
    title: "3g precision dose",
    body: "Perfectly measured, every time. No clumping, no mess, no under-dosing. Tear, pour, done.",
  },
  {
    icon: "🌿",
    title: "Works with any base",
    body: "Oat milk. Almond milk. Coconut milk. Regular milk. Hot or iced. Your latte, your rules.",
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
    body: "3g of ceremonial matcha + functional mushroom blend — pre-measured, zero waste.",
  },
  {
    num: "02",
    title: "Pour over your latte base",
    body: "Steamed oat milk, coconut milk, whatever's yours. Hot or iced. You're the barista now.",
  },
  {
    num: "03",
    title: "Feel the shift",
    body: "Clean energy rises. The focus sets in. Welcome to the café you never have to leave.",
  },
];

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
      if (res.ok) {
        setS("success");
      } else {
        setS("error");
      }
    } catch {
      setS("error");
    }
  }

  const TickerContent = () => (
    <>
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-6">
          <span className="font-mono-dm text-[10px] tracking-[0.25em] uppercase text-cream-muted">
            {item}
          </span>
          <span className="text-matcha opacity-50">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "#090E0A" }}>

      {/* ─── Announcement Ticker ─── */}
      <div
        className="overflow-hidden py-2.5 border-b"
        style={{ borderColor: "rgba(142,214,110,0.15)", background: "#0E1810" }}
      >
        <div className="ticker-track">
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
        </div>
      </div>

      {/* ─── Navigation ─── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: "rgba(9,14,10,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(242,237,223,0.06)",
        }}
      >
        {/* Logo */}
        <div>
          <span
            className="font-serif text-xl tracking-[0.15em] uppercase"
            style={{ color: "#F2EDDF", letterSpacing: "0.2em" }}
          >
            Shroomé
          </span>
        </div>

        {/* Nav CTA */}
        <a
          href="#waitlist"
          className="btn-ghost rounded-full px-5 py-2 text-xs font-medium"
        >
          Get 40% Off →
        </a>
      </nav>

      {/* ─── Hero ─── */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 md:px-12 pt-12 pb-20 overflow-hidden grain-overlay"
        style={{ background: "linear-gradient(160deg, #090E0A 0%, #0E1810 60%, #090E0A 100%)" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(142,214,110,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,223,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,223,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Coming Soon badge */}
          <div className="fade-up delay-100 flex justify-center mb-8">
            <span className="badge">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8ED66E", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              Coming Soon · Pre-Launch
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="fade-up delay-200 font-serif mb-6" style={{ color: "#F2EDDF" }}>
            <span
              className="block"
              style={{
                fontSize: "clamp(3.2rem, 11vw, 9rem)",
                lineHeight: 0.92,
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              Café Energy.
            </span>
            <span
              className="block font-serif"
              style={{
                fontSize: "clamp(3.2rem, 11vw, 9rem)",
                lineHeight: 0.92,
                fontWeight: 400,
                fontStyle: "italic",
                color: "#8ED66E",
                letterSpacing: "-0.02em",
              }}
            >
              Home Address.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up delay-350 mt-8 mb-10 mx-auto max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(242,237,223,0.65)", fontWeight: 300 }}
          >
            3g ceremonial matcha + functional mushrooms in one sachet.
            <br className="hidden md:block" />
            Pour over your latte base.{" "}
            <span style={{ color: "#8ED66E", fontStyle: "italic" }}>Feel the shift.</span>
          </p>

          {/* Hero email form */}
          <form
            id="waitlist"
            className="fade-up delay-500"
            onSubmit={(e) => handleSubmit(e, email, setStatus)}
          >
            {status === "success" ? (
              <div
                className="inline-flex flex-col items-center gap-2 px-8 py-5 rounded-2xl"
                style={{
                  background: "rgba(142,214,110,0.1)",
                  border: "1px solid rgba(142,214,110,0.3)",
                }}
              >
                <span className="text-2xl">🍵</span>
                <p style={{ color: "#8ED66E" }} className="font-medium text-sm tracking-wide">
                  You&apos;re on the list! Your 40% off code is on its way.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="waitlist-input flex-1 rounded-full px-5 py-3.5 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-matcha rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide whitespace-nowrap"
                >
                  {status === "loading" ? "Joining..." : "Claim 40% Off →"}
                </button>
              </div>
            )}
            {status === "error" && (
              <p className="mt-3 text-xs" style={{ color: "#e57373" }}>
                Something went wrong. Try again or email us directly.
              </p>
            )}
            <p className="mt-4 text-xs" style={{ color: "rgba(242,237,223,0.3)" }}>
              No spam. Just your discount code + launch day priority access.
            </p>
          </form>

          {/* Social proof line */}
          <div className="fade-up delay-650 mt-10 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {["#A0C878","#7BA85E","#C4EBA0","#8ED66E"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid #090E0A",
                  }}
                />
              ))}
            </div>
            <p className="text-xs ml-2" style={{ color: "rgba(242,237,223,0.45)" }}>
              <span style={{ color: "#8ED66E" }}>First 500</span> on the list get exclusive 40% off
            </p>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="divider mx-auto max-w-4xl" />

      {/* ─── What Is Shroomé? ─── */}
      <section className="py-24 px-6 md:px-12" style={{ background: "#090E0A" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left: Sachet Visual (CSS art) */}
            <div className="flex justify-center">
              <div className="sachet-float glow-green" style={{ position: "relative" }}>
                {/* Sachet */}
                <div
                  style={{
                    width: 220,
                    height: 300,
                    borderRadius: 20,
                    background: "linear-gradient(145deg, #0E2A16 0%, #142820 40%, #0A1F12 100%)",
                    border: "1px solid rgba(142,214,110,0.25)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Sachet top tear strip */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 36,
                      background: "linear-gradient(180deg, rgba(142,214,110,0.15), transparent)",
                      borderBottom: "1px dashed rgba(142,214,110,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        color: "rgba(142,214,110,0.6)",
                        fontFamily: "'DM Mono', monospace",
                        textTransform: "uppercase",
                      }}
                    >
                      ✂ tear here
                    </span>
                  </div>

                  {/* Brand name on sachet */}
                  <span
                    className="font-serif"
                    style={{
                      fontSize: 28,
                      color: "#F2EDDF",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginTop: 20,
                    }}
                  >
                    Shroomé
                  </span>

                  {/* Matcha swirl visual */}
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #8ED66E 0%, #3A8C3A 50%, #1A4A1A 100%)",
                      boxShadow: "0 0 30px rgba(142,214,110,0.4)",
                    }}
                  />

                  {/* Tagline on sachet */}
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      color: "rgba(242,237,223,0.45)",
                      fontFamily: "'DM Mono', monospace",
                      textTransform: "uppercase",
                    }}
                  >
                    Ceremonial Matcha Latte
                  </span>

                  {/* Weight */}
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(142,214,110,0.7)",
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.1em",
                    }}
                  >
                    3g · 1oz · 30g
                  </span>

                  {/* Bottom texture strip */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 28,
                      background: "rgba(142,214,110,0.05)",
                      borderTop: "1px solid rgba(142,214,110,0.1)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <div className="badge mb-6">The formula</div>
              <h2
                className="font-serif mb-6"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                  color: "#F2EDDF",
                  fontWeight: 700,
                }}
              >
                We built the café
                <br />
                <em style={{ color: "#8ED66E" }}>inside a sachet.</em>
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{ color: "rgba(242,237,223,0.6)", fontSize: "1.05rem" }}
              >
                Shroomé is a 3g ceremonial-grade matcha latte blend enhanced with
                functional mushrooms — precision-dosed in a single sachet. Tear, pour
                over your milk of choice, and you&apos;ve got a $9 café drink in under
                60 seconds. At home. In your kitchen. In your pajamas. No judgment.
              </p>

              {/* Ingredient pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Ceremonial Matcha", sub: "First-harvest, shade-grown" },
                  { label: "Lion&apos;s Mane", sub: "Cognitive clarity" },
                  { label: "Chaga", sub: "Adaptogenic support" },
                  { label: "Precision 3g dose", sub: "No measuring required" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(242,237,223,0.08)",
                    }}
                  >
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#F2EDDF" }}
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                    <p className="text-xs mt-0.5" style={{ color: "rgba(242,237,223,0.4)" }}>
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section
        className="py-24 px-6 md:px-12"
        style={{ background: "#0E1810" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mb-5 mx-auto inline-flex">Why Shroomé</div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                color: "#F2EDDF",
                fontWeight: 700,
              }}
            >
              Everything you want from your
              <br />
              <em style={{ color: "#8ED66E" }}>morning café run.</em>
            </h2>
            <p
              className="mt-5 max-w-lg mx-auto"
              style={{ color: "rgba(242,237,223,0.5)", fontSize: "1rem", lineHeight: 1.7 }}
            >
              Minus the wait. Minus the cost. Minus the fact that the barista
              misspelled your name on the cup again.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="feature-card rounded-2xl p-6">
                <span style={{ fontSize: 28, display: "block", marginBottom: 16 }}>
                  {b.icon}
                </span>
                <h3
                  className="font-serif mb-3"
                  style={{ color: "#F2EDDF", fontSize: "1.2rem", fontWeight: 600 }}
                >
                  {b.title}
                </h3>
                <p style={{ color: "rgba(242,237,223,0.5)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-24 px-6 md:px-12" style={{ background: "#090E0A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge mb-5 mx-auto inline-flex">The ritual</div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                color: "#F2EDDF",
                fontWeight: 700,
              }}
            >
              Three steps between you
              <br />
              <em style={{ color: "#8ED66E" }}>and your best matcha yet.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="step-num mb-4">{step.num}</div>
                <h3
                  className="font-serif mb-3"
                  style={{ color: "#F2EDDF", fontSize: "1.25rem", fontWeight: 600 }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "rgba(242,237,223,0.5)", lineHeight: 1.65, fontSize: "0.92rem" }}>
                  {step.body}
                </p>

                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block mt-8"
                    style={{
                      height: 1,
                      background: "linear-gradient(90deg, rgba(142,214,110,0.3), transparent)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Second CTA / Waitlist ─── */}
      <section
        className="py-28 px-6 md:px-12 relative overflow-hidden grain-overlay"
        style={{
          background: "linear-gradient(135deg, #0E2A16 0%, #0E1810 50%, #142016 100%)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(142,214,110,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="badge mb-6 mx-auto inline-flex">Limited Pre-Launch Offer</div>
          <h2
            className="font-serif mb-6"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              lineHeight: 1.05,
              color: "#F2EDDF",
              fontWeight: 800,
            }}
          >
            Your couch is the
            <br />
            <em style={{ color: "#8ED66E" }}>best seat in the house.</em>
          </h2>
          <p
            className="mb-10 text-base md:text-lg"
            style={{ color: "rgba(242,237,223,0.6)", lineHeight: 1.7 }}
          >
            Join the Shroomé pre-launch list and get{" "}
            <strong style={{ color: "#8ED66E" }}>40% off your first order</strong> — plus
            first access when we drop. We&apos;re almost ready. Are you?
          </p>

          <form onSubmit={(e) => handleSubmit(e, email2, setStatus2)}>
            {status2 === "success" ? (
              <div
                className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-2xl"
                style={{
                  background: "rgba(142,214,110,0.1)",
                  border: "1px solid rgba(142,214,110,0.3)",
                }}
              >
                <span className="text-3xl">🍵</span>
                <p style={{ color: "#8ED66E" }} className="font-medium">
                  You&apos;re in! Check your inbox for your 40% off code.
                </p>
                <p className="text-xs" style={{ color: "rgba(242,237,223,0.4)" }}>
                  Welcome to the pre-launch fam.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  className="waitlist-input flex-1 rounded-full px-5 py-3.5 text-sm"
                />
                <button
                  type="submit"
                  disabled={status2 === "loading"}
                  className="btn-matcha rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide whitespace-nowrap"
                >
                  {status2 === "loading" ? "Joining..." : "Get 40% Off →"}
                </button>
              </div>
            )}
            {status2 === "error" && (
              <p className="mt-3 text-xs" style={{ color: "#e57373" }}>
                Something went wrong. Refresh and try again.
              </p>
            )}
          </form>

          <p className="mt-6 text-xs" style={{ color: "rgba(242,237,223,0.28)" }}>
            Only the first 500 signups get 40% off. We won&apos;t spam you. We promise.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="py-10 px-6 md:px-12"
        style={{
          background: "#090E0A",
          borderTop: "1px solid rgba(242,237,223,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="font-serif text-lg tracking-widest uppercase"
            style={{ color: "rgba(242,237,223,0.6)" }}
          >
            Shroomé
          </span>
          <p className="text-xs text-center" style={{ color: "rgba(242,237,223,0.25)" }}>
            © 2026 Shroomé. All rights reserved. · Ceremonial matcha, functional mushrooms, no nonsense.
          </p>
          <div className="flex gap-5">
            <a
              href="mailto:hello@shroome.com"
              className="text-xs transition-colors"
              style={{ color: "rgba(242,237,223,0.35)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#8ED66E")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(242,237,223,0.35)")}
            >
              hello@shroome.com
            </a>
            <a
              href="#waitlist"
              className="text-xs transition-colors"
              style={{ color: "rgba(242,237,223,0.35)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#8ED66E")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(242,237,223,0.35)")}
            >
              Join the list
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
