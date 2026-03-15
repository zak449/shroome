"use client";

import { useState } from "react";

// ── Brand tokens ──────────────────────────────────────────────────
const C = {
  oatCream:          "#F5F0E8",
  champagneMycelium: "#EDE0CC",
  sporeBlush:        "#E8C4B0",
  ceremonyMatcha:    "#3D5A3E",
  forestFloor:       "#2A3D2B",
  nearBlack:         "#1A2A1C",
};

const STACK = [
  {
    num: "01",
    icon: "🍵",
    title: "Ceremonial Matcha",
    sub: "First-harvest, shade-grown",
    body: "Not the $4 culinary powder. We source first-harvest ceremonial grade — the same quality cafés charge $9 a cup for. Shade-grown for 3 weeks to concentrate L-theanine and chlorophyll.",
  },
  {
    num: "02",
    icon: "🧠",
    title: "Lion's Mane + Chaga",
    sub: "500mg dual-extract blend",
    body: "Clinically-studied beta glucans for sustained focus and immune support. Dual-extract (hot water + alcohol) for full-spectrum bioavailability. Clean, slow, and stackable.",
  },
  {
    num: "03",
    icon: "✦",
    title: "Grass-Fed Collagen",
    sub: "Type I & III peptides",
    body: "Pre-dissolved in the sachet. Skin elasticity, joint health, hair and nail strength — the beauty supplement you keep forgetting is already in your morning ritual.",
  },
];

const TESTIMONIALS = [
  {
    quote: "I replaced my $9 café matcha the first week. I didn't even think twice.",
    name: "Maya R.",
    handle: "early tester · NYC",
  },
  {
    quote: "The focus is real. It's not caffeine jitters — it's just… clarity. By 8am.",
    name: "Jordan K.",
    handle: "early tester · LA",
  },
  {
    quote: "I've tried every functional mushroom product. This is the one that actually dissolved.",
    name: "Priya S.",
    handle: "early tester · Austin",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pour",
    body: "Tear open your sachet. 3g of ceremonial matcha + functional mushroom blend lands in your cup. Zero measuring. Zero thinking.",
  },
  {
    num: "02",
    title: "Swirl",
    body: "Pour over oat milk, almond, coconut — whatever's yours. Hot or iced. Watch the green swirl through white. That's the moment.",
  },
  {
    num: "03",
    title: "Glow",
    body: "Clean energy rises within minutes. Focus sets in. Collagen works while you drink. This is your café. It doesn't close.",
  },
];

// ── Sachet Visual ─────────────────────────────────────────────────
function SachetVisual({ scale = 1 }: { scale?: number }) {
  const w = Math.round(260 * scale);
  const h = Math.round(370 * scale);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* warm ambient glow */}
        <div style={{
          position: "absolute",
          inset: -60,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(61,90,62,0.18) 0%, rgba(232,196,176,0.10) 45%, transparent 72%)",
          pointerEvents: "none",
        }} />
        <div className="sachet-float" style={{ position: "relative", filter: "drop-shadow(0 32px 48px rgba(42,61,43,0.28))" }}>
          <svg width={w} height={h} viewBox="0 0 260 370" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sachetBodyGrad" x1="0" y1="0" x2="260" y2="370" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#2F4430" />
                <stop offset="55%"  stopColor="#2A3D2B" />
                <stop offset="100%" stopColor="#1C2E1D" />
              </linearGradient>
              <linearGradient id="sachetSheen" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(245,240,232,0)" />
                <stop offset="35%"  stopColor="rgba(245,240,232,0.09)" />
                <stop offset="55%"  stopColor="rgba(245,240,232,0.04)" />
                <stop offset="100%" stopColor="rgba(245,240,232,0)" />
              </linearGradient>
              <linearGradient id="bottomBand" x1="0" y1="290" x2="0" y2="355" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(245,240,232,0.04)" />
                <stop offset="100%" stopColor="rgba(245,240,232,0.09)" />
              </linearGradient>
              <clipPath id="sachetClip">
                <rect x="16" y="16" width="228" height="338" rx="14" />
              </clipPath>
            </defs>
            {/* body */}
            <rect x="16" y="16" width="228" height="338" rx="14" fill="url(#sachetBodyGrad)" />
            <rect x="16" y="16" width="228" height="338" rx="14" fill="url(#sachetSheen)" />
            {/* inner border */}
            <rect x="24" y="24" width="212" height="322" rx="10" fill="none" stroke="rgba(245,240,232,0.07)" strokeWidth="1" />
            {/* perforation dots */}
            {[80, 130, 180].map((x, i) => (
              <circle key={i} cx={x} cy="27" r="2.5" fill="#EDE0CC" opacity="0.45" />
            ))}
            {/* top rule */}
            <line x1="36" y1="56" x2="224" y2="56" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.5" />
            {/* wordmark */}
            <text x="130" y="96" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="24" fill="#F5F0E8" letterSpacing="3">SHROOMÉ</text>
            <text x="130" y="114" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7" fill="#F5F0E8" opacity="0.45" letterSpacing="3.5">POUR · SWIRL · GLOW</text>
            {/* center illustration circle */}
            <circle cx="130" cy="205" r="60" fill="none" stroke="rgba(245,240,232,0.07)" strokeWidth="1" />
            <circle cx="130" cy="205" r="50" fill="none" stroke="rgba(232,196,176,0.10)" strokeWidth="0.5" />
            {/* mushroom cap */}
            <ellipse cx="130" cy="190" rx="30" ry="14" fill="rgba(245,240,232,0.13)" stroke="rgba(245,240,232,0.18)" strokeWidth="0.75" />
            {/* mushroom stem */}
            <rect x="125" y="204" width="10" height="22" rx="5" fill="rgba(245,240,232,0.09)" stroke="rgba(245,240,232,0.15)" strokeWidth="0.75" />
            {/* gills */}
            {[-14, -7, 0, 7, 14].map((offset, i) => (
              <line key={i} x1={130 + offset} y1="203" x2={130 + offset * 0.6} y2="196" stroke="rgba(245,240,232,0.11)" strokeWidth="0.75" />
            ))}
            {/* decorative stars */}
            <text x="54"  y="162" fontSize="8" fill="#E8C4B0" opacity="0.5">✦</text>
            <text x="194" y="248" fontSize="6" fill="#E8C4B0" opacity="0.4">✦</text>
            <text x="67"  y="252" fontSize="5" fill="#F5F0E8" opacity="0.2">◎</text>
            <text x="186" y="165" fontSize="5" fill="#E8C4B0" opacity="0.3">◎</text>
            {/* bottom band */}
            <rect x="16" y="290" width="228" height="64" fill="url(#bottomBand)" clipPath="url(#sachetClip)" />
            <text x="130" y="313" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6" fill="#F5F0E8" opacity="0.55" letterSpacing="2.5">CEREMONIAL MATCHA</text>
            <text x="130" y="327" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6" fill="#F5F0E8" opacity="0.55" letterSpacing="2.5">LION&apos;S MANE · CHAGA</text>
            <text x="130" y="341" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6" fill="#F5F0E8" opacity="0.55" letterSpacing="2.5">GRASS-FED COLLAGEN</text>
            {/* bottom rule */}
            <line x1="36" y1="352" x2="224" y2="352" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.35" />
            {/* dose badge */}
            <rect x="108" y="260" width="44" height="18" rx="9" fill="rgba(232,196,176,0.14)" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.85" />
            <text x="130" y="273" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7" fill="#E8C4B0" letterSpacing="1.5">3g DOSE</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Email Form ────────────────────────────────────────────────────
function EmailForm({ dark = false, size = "md" }: { dark?: boolean; size?: "sm" | "md" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: size === "sm" ? "10px 22px" : "14px 28px",
        borderRadius: 999,
        background: dark ? "rgba(245,240,232,0.12)" : C.champagneMycelium,
        color: dark ? C.oatCream : C.forestFloor,
        fontFamily: "DM Mono, monospace",
        fontSize: size === "sm" ? "0.72rem" : "0.8rem",
        letterSpacing: "0.08em",
      }}>
        ✓ &nbsp;You&apos;re on the list — 40% off is yours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "stretch", maxWidth: 500 }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{
          flex: "1 1 220px",
          padding: size === "sm" ? "11px 18px" : "14px 22px",
          borderRadius: 999,
          border: dark ? "1px solid rgba(245,240,232,0.25)" : `1px solid rgba(42,61,43,0.2)`,
          background: dark ? "rgba(245,240,232,0.07)" : "rgba(255,255,255,0.8)",
          color: dark ? C.oatCream : C.forestFloor,
          fontFamily: "DM Sans, system-ui, sans-serif",
          fontSize: size === "sm" ? "0.875rem" : "0.95rem",
          outline: "none",
          minWidth: 0,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: size === "sm" ? "11px 22px" : "14px 28px",
          borderRadius: 999,
          border: "none",
          background: dark ? C.sporeBlush : C.forestFloor,
          color: dark ? C.forestFloor : C.oatCream,
          fontFamily: "DM Mono, monospace",
          fontSize: size === "sm" ? "0.7rem" : "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          cursor: loading ? "wait" : "pointer",
          whiteSpace: "nowrap" as const,
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {loading ? "JOINING…" : "CLAIM 40% OFF →"}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=DM+Mono:wght@0,400;0,500&display=swap');

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }

        @keyframes sachet-float {
          0%   { transform: translateY(0px) rotate(-1.5deg); }
          50%  { transform: translateY(-14px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(-1.5deg); }
        }
        .sachet-float {
          animation: sachet-float 7s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }

        input::placeholder { color: rgba(42,61,43,0.35); }
        input:focus { box-shadow: 0 0 0 2px rgba(61,90,62,0.25); }

        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(42,61,43,0.12);
        }

        @media (max-width: 700px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-sachet { order: -1; }
        }
      `}</style>

      <div style={{ fontFamily: "DM Sans, system-ui, sans-serif", background: C.oatCream, color: C.forestFloor, overflowX: "hidden" }}>

        {/* ── Announcement bar ─────────────────────────────── */}
        <div style={{
          background: C.forestFloor,
          color: C.oatCream,
          textAlign: "center",
          padding: "10px 16px",
          fontFamily: "DM Mono, monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          Pre-Launch · First 500 Get 40% Off · Ships Free
        </div>

        {/* ── Nav ──────────────────────────────────────────── */}
        <nav style={{
          background: `${C.oatCream}f0`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid rgba(42,61,43,0.08)`,
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}>
          <span style={{
            fontFamily: "Playfair Display, Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "1.45rem",
            color: C.forestFloor,
            letterSpacing: "0.01em",
          }}>
            Shroomé
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: C.forestFloor, opacity: 0.5, textTransform: "uppercase" }}>
              Coming Soon
            </span>
            <button style={{
              padding: "10px 22px",
              borderRadius: 999,
              border: `1.5px solid ${C.forestFloor}`,
              background: "transparent",
              color: C.forestFloor,
              fontFamily: "DM Mono, monospace",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = C.forestFloor; (e.target as HTMLButtonElement).style.color = C.oatCream; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; (e.target as HTMLButtonElement).style.color = C.forestFloor; }}
            >
              Get 40% Off →
            </button>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section style={{
          background: `radial-gradient(ellipse 80% 60% at 65% 40%, rgba(232,196,176,0.28) 0%, rgba(245,240,232,0) 65%), ${C.oatCream}`,
          padding: "72px 40px 80px",
          maxWidth: 1280,
          margin: "0 auto",
        }}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px 80px",
              alignItems: "center",
            }}
          >
            {/* Copy */}
            <div style={{ maxWidth: 580 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                border: `1px solid rgba(61,90,62,0.25)`,
                background: "rgba(61,90,62,0.06)",
                marginBottom: 32,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.ceremonyMatcha, display: "inline-block" }} />
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.64rem", letterSpacing: "0.18em", color: C.ceremonyMatcha, textTransform: "uppercase" }}>
                  Ceremonial Matcha · Pre-Launch
                </span>
              </div>

              <h1 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                fontWeight: 700,
                lineHeight: 1.02,
                color: C.forestFloor,
                letterSpacing: "-0.025em",
                marginBottom: 6,
              }}>
                The ritual<br />is ready.
              </h1>
              <h1 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.02,
                color: C.ceremonyMatcha,
                letterSpacing: "-0.025em",
                marginBottom: 36,
              }}>
                Just pour.
              </h1>

              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: C.forestFloor,
                opacity: 0.7,
                marginBottom: 40,
                maxWidth: 430,
              }}>
                3g ceremonial matcha + Lion&apos;s Mane + collagen, pre-measured in a single sachet.
                Pour over oat milk. Feel the shift in 60 seconds.
              </p>

              <EmailForm dark={false} />

              <p style={{
                marginTop: 16,
                fontFamily: "DM Mono, monospace",
                fontSize: "0.64rem",
                color: C.forestFloor,
                opacity: 0.4,
                letterSpacing: "0.08em",
              }}>
                No spam. Your 40% off code arrives at launch. First 500 only.
              </p>
            </div>

            {/* Sachet */}
            <div
              className="hero-sachet"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <SachetVisual scale={1.2} />
            </div>
          </div>
        </section>

        {/* ── Marquee ──────────────────────────────────────── */}
        <div style={{
          background: C.champagneMycelium,
          borderTop: `1px solid rgba(42,61,43,0.07)`,
          borderBottom: `1px solid rgba(42,61,43,0.07)`,
          overflow: "hidden",
          padding: "13px 0",
        }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, pass) =>
              ["POUR", "SWIRL", "GLOW", "CEREMONIAL MATCHA", "LION'S MANE + CHAGA", "GRASS-FED COLLAGEN", "3G PRECISION DOSE", "FIRST HARVEST", "SHADE GROWN", "60 SECONDS"].map((item, i) => (
                <span key={pass * 100 + i} style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.forestFloor,
                  padding: "0 24px",
                  opacity: 0.65,
                }}>
                  {item}<span style={{ marginLeft: 24, opacity: 0.35 }}>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── The Stack ────────────────────────────────────── */}
        <section style={{ background: C.oatCream, padding: "100px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 16 }}>
                What&apos;s Inside
              </p>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: C.forestFloor,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}>
                Three products you already buy.
                <br />
                <em style={{ fontWeight: 400, color: C.ceremonyMatcha }}>One sachet.</em>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
              {STACK.map((card) => (
                <div
                  key={card.title}
                  className="card-hover"
                  style={{
                    background: C.champagneMycelium,
                    borderRadius: 24,
                    padding: "44px 36px",
                    border: `1px solid rgba(42,61,43,0.07)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 24,
                    right: 28,
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: C.forestFloor,
                    opacity: 0.25,
                  }}>
                    {card.num}
                  </div>
                  <div style={{ fontSize: "1.8rem", marginBottom: 20 }}>{card.icon}</div>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 10, opacity: 0.85 }}>
                    {card.sub}
                  </p>
                  <h3 style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: C.forestFloor,
                    marginBottom: 14,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: C.forestFloor, opacity: 0.65 }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dark anchor — Effortless ──────────────────────── */}
        <section style={{
          background: C.forestFloor,
          padding: "100px 40px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* subtle texture dots */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(245,240,232,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.oatCream, opacity: 0.4, marginBottom: 32 }}>
              The Philosophy
            </p>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
              fontWeight: 700,
              color: C.oatCream,
              lineHeight: 1.06,
              marginBottom: 72,
              letterSpacing: "-0.025em",
            }}>
              Effortless<br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: C.sporeBlush }}>is the luxury.</em>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16, marginBottom: 64 }}>
              {[
                { stat: "3g",  label: "Precision dose, every time" },
                { stat: "60s", label: "Tear. Pour. Done." },
                { stat: "$9",  label: "What cafés charge you." },
              ].map((tile) => (
                <div key={tile.stat} style={{
                  background: "rgba(245,240,232,0.06)",
                  border: "1px solid rgba(245,240,232,0.1)",
                  borderRadius: 18,
                  padding: "36px 28px",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "3.75rem",
                    fontWeight: 700,
                    color: C.oatCream,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}>
                    {tile.stat}
                  </div>
                  <div style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.64rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: C.oatCream,
                    opacity: 0.5,
                    lineHeight: 1.5,
                  }}>
                    {tile.label}
                  </div>
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.oatCream,
              opacity: 0.3,
            }}>
              THE RITUAL IS READY. JUST POUR.
            </p>
          </div>
        </section>

        {/* ── How it works — Pour / Swirl / Glow ───────────── */}
        <section style={{
          background: C.oatCream,
          padding: "100px 40px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 16 }}>
                The Ritual
              </p>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
                color: C.forestFloor,
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
              }}>
                Three steps.{" "}
                <em style={{ fontWeight: 400, color: C.ceremonyMatcha }}>One perfect morning.</em>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "40px 56px" }}>
              {STEPS.map((step) => (
                <div key={step.num}>
                  <div style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "5rem",
                    fontWeight: 400,
                    color: C.sporeBlush,
                    lineHeight: 1,
                    marginBottom: 20,
                  }}>
                    {step.num}
                  </div>
                  <div style={{ width: 36, height: 2, background: C.sporeBlush, marginBottom: 22, borderRadius: 2 }} />
                  <h3 style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: C.forestFloor,
                    marginBottom: 16,
                    letterSpacing: "-0.015em",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: C.forestFloor, opacity: 0.65 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────── */}
        <section style={{
          background: C.champagneMycelium,
          padding: "96px 40px",
          borderTop: `1px solid rgba(42,61,43,0.07)`,
          borderBottom: `1px solid rgba(42,61,43,0.07)`,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.ceremonyMatcha,
              marginBottom: 52,
              textAlign: "center",
            }}>
              Early Testers
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="card-hover"
                  style={{
                    background: C.oatCream,
                    borderRadius: 20,
                    padding: "36px 32px",
                    border: `1px solid rgba(42,61,43,0.06)`,
                  }}
                >
                  <p style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: C.forestFloor,
                    marginBottom: 24,
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.ceremonyMatcha}, ${C.forestFloor})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Playfair Display, Georgia, serif",
                      fontSize: "0.95rem",
                      color: C.oatCream,
                      fontWeight: 700,
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", fontWeight: 600, color: C.forestFloor }}>
                        {t.name}
                      </div>
                      <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.62rem", color: C.forestFloor, opacity: 0.45, letterSpacing: "0.06em" }}>
                        {t.handle}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pull quote ───────────────────────────────────── */}
        <section style={{
          background: C.oatCream,
          padding: "96px 40px",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ color: C.sporeBlush, fontSize: "3rem", lineHeight: 1, marginBottom: 24, fontFamily: "Georgia, serif" }}>&ldquo;</div>
            <p style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.45,
              color: C.forestFloor,
              letterSpacing: "-0.01em",
              marginBottom: 32,
            }}>
              Ceremonial-grade matcha. Functional mushrooms. Grass-fed collagen.
              <br />
              <span style={{ color: C.ceremonyMatcha }}>You were already going to buy all three.</span>
            </p>
            <div style={{ width: 48, height: 2, background: C.sporeBlush, margin: "0 auto", borderRadius: 2 }} />
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────── */}
        <section style={{
          background: C.forestFloor,
          padding: "100px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(245,240,232,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
            <p style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.oatCream,
              opacity: 0.4,
              marginBottom: 28,
            }}>
              Join the Waitlist
            </p>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 700,
              color: C.oatCream,
              lineHeight: 1.08,
              marginBottom: 20,
              letterSpacing: "-0.025em",
            }}>
              First 500 get{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: C.sporeBlush }}>40% off.</em>
            </h2>
            <p style={{
              fontSize: "1rem",
              lineHeight: 1.65,
              color: C.oatCream,
              opacity: 0.55,
              marginBottom: 44,
              maxWidth: 420,
              margin: "0 auto 44px",
            }}>
              Drop your email. We&apos;ll send your code the moment we go live.
              No spam. No noise. Just your discount.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark={true} />
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 32 }}>
              {["No spam, ever", "40% off launch price", "Ships free"].map(item => (
                <span key={item} style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  color: C.oatCream,
                  opacity: 0.4,
                }}>
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer style={{
          background: C.nearBlack,
          color: C.oatCream,
          padding: "36px 40px",
        }}>
          <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "12px 32px",
            alignItems: "center",
          }}>
            <div style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "1.35rem",
              color: C.oatCream,
            }}>
              Shroomé
            </div>
            <div style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              color: C.oatCream,
              opacity: 0.35,
              textTransform: "uppercase",
              textAlign: "center",
            }}>
              Pour. Swirl. Glow. © 2026
            </div>
            <div style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.67rem",
              letterSpacing: "0.04em",
              color: C.oatCream,
              opacity: 0.45,
              textAlign: "right",
            }}>
              hello@drinkshroome.com
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
