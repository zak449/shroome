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
  lightMatcha:       "#E5EFE1",  // soft matcha green for section variety
  brightMatcha:      "#5CA83B",  // pop green for announcement / accents
};

const STACK = [
  {
    num: "01",
    emoji: "🍵",
    badge: "First-harvest · Shade-grown",
    title: "Ceremonial Matcha",
    body: "Not the $4 culinary powder. First-harvest ceremonial grade — the exact stuff cafés charge $9 a cup for. L-theanine + caffeine = smooth, no-crash focus energy. All day.",
    bg: C.champagneMycelium,
  },
  {
    num: "02",
    emoji: "🧠",
    badge: "200mg organic · beta glucans 1,3/1,6",
    title: "Organic Lion's Mane + Chaga",
    body: "200mg of certified organic mushroom beta glucans (1,3/1,6) — the active compounds that actually do the thing. Clinically studied for focus, creativity, and immune support. You'll feel the difference by week two.",
    bg: C.lightMatcha,
  },
  {
    num: "03",
    emoji: "✨",
    badge: "Type I & III peptides",
    title: "Grass-Fed Collagen",
    body: "Pre-dissolved so it actually absorbs. Skin elasticity, hair, nails, joints. You're getting your beauty supplement whether you remember to take it or not.",
    bg: C.sporeBlush,
  },
];

const TESTIMONIALS = [
  {
    quote: "no but fr i cancelled my daily café order the first week. just did the math.",
    name: "Sofia M.",
    loc: "NYC · early tester",
    initial: "S",
    accent: C.lightMatcha,
  },
  {
    quote: "lion's mane + matcha is actually cheating for focus. brain feels different. i'm not normal anymore.",
    name: "Kira J.",
    loc: "LA · early tester",
    initial: "K",
    accent: C.champagneMycelium,
  },
  {
    quote: "my skin has been doing THINGS since i started getting the collagen every morning. obsessed.",
    name: "Priya S.",
    loc: "Austin · early tester",
    initial: "P",
    accent: C.sporeBlush,
  },
];

const STEPS = [
  {
    num: "01",
    emoji: "🌿",
    title: "Pour",
    body: "Tear open. 3g of ceremonial matcha + mushroom blend in your cup. Zero measuring. Zero mess. Zero thinking before coffee.",
  },
  {
    num: "02",
    emoji: "🌀",
    title: "Swirl",
    body: "Pour over oat milk, almond, coconut — whatever you've got. Hot or iced. Watch the green swirl through white. That's your moment.",
  },
  {
    num: "03",
    emoji: "✨",
    title: "Glow",
    body: "Clean energy, focus locked in, collagen working while you drink. You literally just made a better latte than your café. For $2.",
  },
];

// ── Sachet Visual ─────────────────────────────────────────────────
function SachetVisual({ scale = 1 }: { scale?: number }) {
  const w = Math.round(260 * scale);
  const h = Math.round(370 * scale);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          position: "absolute", inset: -60, borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(92,168,59,0.15) 0%, rgba(232,196,176,0.12) 45%, transparent 72%)",
          pointerEvents: "none",
        }} />
        <div className="sachet-float" style={{ position: "relative", filter: "drop-shadow(0 28px 44px rgba(42,61,43,0.3))" }}>
          <svg width={w} height={h} viewBox="0 0 260 370" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sG" x1="0" y1="0" x2="260" y2="370" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#2F4430" />
                <stop offset="60%"  stopColor="#2A3D2B" />
                <stop offset="100%" stopColor="#1C2E1D" />
              </linearGradient>
              <linearGradient id="sS" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(245,240,232,0)" />
                <stop offset="38%"  stopColor="rgba(245,240,232,0.10)" />
                <stop offset="58%"  stopColor="rgba(245,240,232,0.04)" />
                <stop offset="100%" stopColor="rgba(245,240,232,0)" />
              </linearGradient>
              <linearGradient id="sB" x1="0" y1="290" x2="0" y2="355" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(245,240,232,0.04)" />
                <stop offset="100%" stopColor="rgba(245,240,232,0.09)" />
              </linearGradient>
              <clipPath id="sC"><rect x="16" y="16" width="228" height="338" rx="14" /></clipPath>
            </defs>
            <rect x="16" y="16" width="228" height="338" rx="14" fill="url(#sG)" />
            <rect x="16" y="16" width="228" height="338" rx="14" fill="url(#sS)" />
            <rect x="24" y="24" width="212" height="322" rx="10" fill="none" stroke="rgba(245,240,232,0.07)" strokeWidth="1" />
            {[80, 130, 180].map((x, i) => <circle key={i} cx={x} cy="27" r="2.5" fill="#EDE0CC" opacity="0.45" />)}
            <line x1="36" y1="56" x2="224" y2="56" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.5" />
            <text x="130" y="96" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="24" fill="#F5F0E8" letterSpacing="3">SHROOMÉ</text>
            <text x="130" y="114" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7" fill="#F5F0E8" opacity="0.45" letterSpacing="3.5">POUR · SWIRL · GLOW</text>
            <circle cx="130" cy="205" r="60" fill="none" stroke="rgba(245,240,232,0.07)" strokeWidth="1" />
            <circle cx="130" cy="205" r="50" fill="none" stroke="rgba(232,196,176,0.10)" strokeWidth="0.5" />
            <ellipse cx="130" cy="190" rx="30" ry="14" fill="rgba(245,240,232,0.13)" stroke="rgba(245,240,232,0.18)" strokeWidth="0.75" />
            <rect x="125" y="204" width="10" height="22" rx="5" fill="rgba(245,240,232,0.09)" stroke="rgba(245,240,232,0.15)" strokeWidth="0.75" />
            {[-14, -7, 0, 7, 14].map((o, i) => <line key={i} x1={130+o} y1="203" x2={130+o*0.6} y2="196" stroke="rgba(245,240,232,0.11)" strokeWidth="0.75" />)}
            <text x="54"  y="162" fontSize="8" fill="#E8C4B0" opacity="0.5">✦</text>
            <text x="194" y="248" fontSize="6" fill="#E8C4B0" opacity="0.4">✦</text>
            <text x="67"  y="252" fontSize="5" fill="#F5F0E8" opacity="0.2">◎</text>
            <text x="186" y="165" fontSize="5" fill="#E8C4B0" opacity="0.3">◎</text>
            <rect x="16" y="290" width="228" height="64" fill="url(#sB)" clipPath="url(#sC)" />
            <text x="130" y="313" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6" fill="#F5F0E8" opacity="0.55" letterSpacing="2.5">CEREMONIAL MATCHA</text>
            <text x="130" y="327" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6" fill="#F5F0E8" opacity="0.55" letterSpacing="2.5">LION&apos;S MANE · CHAGA</text>
            <text x="130" y="341" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6" fill="#F5F0E8" opacity="0.55" letterSpacing="2.5">GRASS-FED COLLAGEN</text>
            <line x1="36" y1="352" x2="224" y2="352" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.35" />
            <rect x="108" y="260" width="44" height="18" rx="9" fill="rgba(232,196,176,0.14)" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.85" />
            <text x="130" y="273" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7" fill="#E8C4B0" letterSpacing="1.5">3g DOSE</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Email Form ────────────────────────────────────────────────────
function EmailForm({ dark = false }: { dark?: boolean }) {
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
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "14px 28px", borderRadius: 999,
        background: dark ? "rgba(245,240,232,0.14)" : C.lightMatcha,
        color: dark ? C.oatCream : C.forestFloor,
        fontFamily: "DM Sans, system-ui, sans-serif",
        fontSize: "0.9rem", fontWeight: 600,
      }}>
        ✓ &nbsp;You&apos;re in! 40% off is locked.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "stretch", maxWidth: 500 }}>
      <input
        type="email" required value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{
          flex: "1 1 220px", padding: "14px 22px", borderRadius: 999,
          border: dark ? "1px solid rgba(245,240,232,0.2)" : `1px solid rgba(42,61,43,0.18)`,
          background: dark ? "rgba(245,240,232,0.08)" : "rgba(255,255,255,0.85)",
          color: dark ? C.oatCream : C.forestFloor,
          fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.95rem",
          outline: "none", minWidth: 0,
        }}
      />
      <button
        type="submit" disabled={loading}
        style={{
          padding: "14px 26px", borderRadius: 999, border: "none",
          background: dark ? C.brightMatcha : C.forestFloor,
          color: C.oatCream,
          fontFamily: "DM Sans, system-ui, sans-serif",
          fontSize: "0.85rem", fontWeight: 700,
          cursor: loading ? "wait" : "pointer",
          whiteSpace: "nowrap" as const,
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s, transform 0.15s",
          letterSpacing: "0.01em",
        }}
      >
        {loading ? "Joining…" : "Claim 40% off →"}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex; white-space: nowrap;
          animation: marquee 26s linear infinite;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }

        @keyframes sachet-float {
          0%   { transform: translateY(0px) rotate(-1.5deg); }
          50%  { transform: translateY(-16px) rotate(1.2deg); }
          100% { transform: translateY(0px) rotate(-1.5deg); }
        }
        .sachet-float { animation: sachet-float 6.5s ease-in-out infinite; }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        input::placeholder { color: rgba(42,61,43,0.35); }
        input:focus { box-shadow: 0 0 0 2px rgba(92,168,59,0.3); outline: none; }

        .lift { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .lift:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(42,61,43,0.13); }

        @media (max-width: 680px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-sachet { order: -1; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      <div style={{ fontFamily: "DM Sans, system-ui, sans-serif", background: C.oatCream, color: C.forestFloor, overflowX: "hidden" }}>

        {/* ── Announcement bar ───────────────────────────────── */}
        <div style={{
          background: C.brightMatcha, color: "#fff",
          textAlign: "center", padding: "10px 16px",
          fontFamily: "DM Sans, system-ui, sans-serif",
          fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.01em",
        }}>
          🌿 Pre-launch drop — first 500 get 40% off. Don&apos;t sleep on it.
        </div>

        {/* ── Nav ────────────────────────────────────────────── */}
        <nav style={{
          background: `${C.oatCream}f2`,
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(42,61,43,0.08)",
          padding: "15px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <span style={{
            fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic",
            fontWeight: 700, fontSize: "1.45rem", color: C.forestFloor,
          }}>
            Shroomé
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span className="hide-mobile" style={{
              fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem",
              color: C.forestFloor, opacity: 0.45, fontWeight: 500,
            }}>
              Matcha + Mushrooms + Collagen
            </span>
            <button
              style={{
                padding: "10px 22px", borderRadius: 999, border: "none",
                background: C.forestFloor, color: C.oatCream,
                fontFamily: "DM Sans, system-ui, sans-serif",
                fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = C.brightMatcha)}
              onMouseLeave={e => (e.currentTarget.style.background = C.forestFloor)}
            >
              Get 40% off →
            </button>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section style={{
          background: `radial-gradient(ellipse 75% 55% at 68% 45%, rgba(232,196,176,0.32) 0%, ${C.oatCream} 65%)`,
          padding: "72px 40px 80px",
          maxWidth: 1280, margin: "0 auto",
        }}>
          <div className="hero-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "48px 72px", alignItems: "center",
          }}>
            {/* Copy */}
            <div style={{ maxWidth: 560 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 999,
                background: C.lightMatcha, marginBottom: 32,
              }}>
                <span style={{ fontSize: "0.8rem" }}>🌿</span>
                <span style={{
                  fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", fontWeight: 600,
                  color: C.ceremonyMatcha, letterSpacing: "0.01em",
                }}>
                  New drop · Only 500 spots
                </span>
              </div>

              <h1 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                fontWeight: 700, lineHeight: 1.02,
                color: C.forestFloor, letterSpacing: "-0.025em", marginBottom: 4,
              }}>
                Your matcha era.
              </h1>
              <h1 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                fontWeight: 400, fontStyle: "italic", lineHeight: 1.02,
                color: C.brightMatcha, letterSpacing: "-0.025em", marginBottom: 32,
              }}>
                Supercharged.
              </h1>

              <p style={{
                fontSize: "1.1rem", lineHeight: 1.7, color: C.forestFloor,
                opacity: 0.72, marginBottom: 14, maxWidth: 440,
              }}>
                Ceremonial matcha + Lion&apos;s Mane + collagen.
                One 3g sachet. 60 seconds flat.
              </p>
              <p style={{
                fontSize: "1rem", lineHeight: 1.6, color: C.ceremonyMatcha,
                fontWeight: 600, marginBottom: 36,
              }}>
                You already buy all three of these separately. 🌿
              </p>

              <EmailForm dark={false} />

              <p style={{
                marginTop: 14,
                fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem",
                color: C.forestFloor, opacity: 0.4,
              }}>
                No spam. Your 40% off code drops at launch. First 500 only.
              </p>
            </div>

            {/* Sachet */}
            <div className="hero-sachet" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SachetVisual scale={1.2} />
            </div>
          </div>
        </section>

        {/* ── Marquee ────────────────────────────────────────── */}
        <div style={{
          background: C.forestFloor, overflow: "hidden", padding: "13px 0",
        }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, pass) =>
              ["POUR", "SWIRL", "GLOW", "CEREMONIAL MATCHA", "ORGANIC LION'S MANE", "ORGANIC CHAGA", "GRASS-FED COLLAGEN", "200MG BETA GLUCANS", "3G DOSE", "60 SECONDS", "FIRST HARVEST", "SHADE GROWN"].map((item, i) => (
                <span key={pass * 100 + i} style={{
                  fontFamily: "DM Mono, monospace", fontSize: "0.65rem",
                  letterSpacing: "0.2em", textTransform: "uppercase" as const,
                  color: C.oatCream, padding: "0 22px", opacity: 0.7,
                }}>
                  {item}<span style={{ marginLeft: 22, opacity: 0.35 }}>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Three obsessions ───────────────────────────────── */}
        <section style={{ background: C.oatCream, padding: "96px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{
                fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", fontWeight: 600,
                color: C.brightMatcha, letterSpacing: "0.04em",
                textTransform: "uppercase" as const, marginBottom: 14,
              }}>
                What&apos;s inside 👀
              </p>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 700, color: C.forestFloor,
                lineHeight: 1.15, letterSpacing: "-0.02em",
              }}>
                Three obsessions.<br />
                <em style={{ fontWeight: 400, color: C.ceremonyMatcha }}>One pour.</em>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 16 }}>
              {STACK.map((card) => (
                <div key={card.title} className="lift" style={{
                  background: card.bg, borderRadius: 24, padding: "44px 36px",
                  border: "1px solid rgba(42,61,43,0.07)", position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 22, right: 26,
                    fontFamily: "DM Mono, monospace", fontSize: "0.65rem",
                    color: C.forestFloor, opacity: 0.2, letterSpacing: "0.1em",
                  }}>{card.num}</div>
                  <div style={{ fontSize: "2rem", marginBottom: 18 }}>{card.emoji}</div>
                  <div style={{
                    display: "inline-block", padding: "4px 12px", borderRadius: 999,
                    background: "rgba(42,61,43,0.08)", marginBottom: 14,
                    fontFamily: "DM Mono, monospace", fontSize: "0.62rem",
                    color: C.ceremonyMatcha, letterSpacing: "0.1em",
                  }}>
                    {card.badge}
                  </div>
                  <h3 style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.4rem", fontWeight: 700, color: C.forestFloor,
                    marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.25,
                  }}>{card.title}</h3>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.72, color: C.forestFloor, opacity: 0.68 }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dark anchor — Skip the $9 latte ────────────────── */}
        <section style={{
          background: C.forestFloor, padding: "96px 40px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(245,240,232,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px", pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <p style={{
              fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", fontWeight: 600,
              color: C.oatCream, opacity: 0.45, letterSpacing: "0.06em",
              textTransform: "uppercase" as const, marginBottom: 28,
            }}>
              The math is simple
            </p>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
              fontWeight: 700, color: C.oatCream,
              lineHeight: 1.06, marginBottom: 72, letterSpacing: "-0.025em",
            }}>
              Skip the $9 latte.<br />
              <em style={{ fontWeight: 400, color: C.sporeBlush }}>Keep the glow.</em>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 14, marginBottom: 56 }}>
              {[
                { stat: "3g",  label: "Perfect dose. Every time." },
                { stat: "60s", label: "Tear. Pour. You're done." },
                { stat: "$2",  label: "vs. $9 at your café." },
              ].map((tile) => (
                <div key={tile.stat} style={{
                  background: "rgba(245,240,232,0.07)",
                  border: "1px solid rgba(245,240,232,0.10)",
                  borderRadius: 18, padding: "36px 28px", textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "3.75rem", fontWeight: 700, color: C.oatCream,
                    lineHeight: 1, marginBottom: 12,
                  }}>{tile.stat}</div>
                  <div style={{
                    fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem",
                    color: C.oatCream, opacity: 0.5, lineHeight: 1.5, fontWeight: 500,
                  }}>{tile.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────── */}
        <section style={{ background: C.oatCream, padding: "96px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{
                fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", fontWeight: 600,
                color: C.brightMatcha, letterSpacing: "0.04em",
                textTransform: "uppercase" as const, marginBottom: 14,
              }}>
                It&apos;s literally 3 steps
              </p>
              <h2 style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700, color: C.forestFloor,
                letterSpacing: "-0.015em", lineHeight: 1.2,
              }}>
                Pour. Swirl.{" "}
                <em style={{ fontWeight: 400, color: C.ceremonyMatcha }}>Glow.</em>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "40px 56px" }}>
              {STEPS.map((step) => (
                <div key={step.num} style={{
                  background: C.lightMatcha, borderRadius: 20,
                  padding: "40px 36px", border: "1px solid rgba(42,61,43,0.07)",
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: 16 }}>{step.emoji}</div>
                  <div style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontStyle: "italic", fontSize: "4rem", fontWeight: 400,
                    color: "rgba(42,61,43,0.12)", lineHeight: 1, marginBottom: 16,
                  }}>{step.num}</div>
                  <h3 style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "2rem", fontWeight: 700, color: C.forestFloor,
                    marginBottom: 14, letterSpacing: "-0.015em",
                  }}>{step.title}</h3>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: C.forestFloor, opacity: 0.65 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────── */}
        <section style={{
          background: C.champagneMycelium, padding: "88px 40px",
          borderTop: "1px solid rgba(42,61,43,0.07)",
          borderBottom: "1px solid rgba(42,61,43,0.07)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{
                fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", fontWeight: 600,
                color: C.ceremonyMatcha, letterSpacing: "0.04em",
                textTransform: "uppercase" as const, marginBottom: 10,
              }}>
                Early testers are obsessed 🙌
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 16 }}>
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="lift" style={{
                  background: t.accent, borderRadius: 20,
                  padding: "36px 32px", border: "1px solid rgba(42,61,43,0.06)",
                }}>
                  <p style={{
                    fontFamily: "DM Sans, Georgia, serif",
                    fontSize: "1.05rem", lineHeight: 1.62,
                    color: C.forestFloor, marginBottom: 26,
                    fontWeight: 400,
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.ceremonyMatcha}, ${C.forestFloor})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
                      color: C.oatCream, fontWeight: 700,
                    }}>
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", fontWeight: 700, color: C.forestFloor }}>{t.name}</div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.75rem", color: C.forestFloor, opacity: 0.5 }}>{t.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pull quote ─────────────────────────────────────── */}
        <section style={{ background: C.sporeBlush, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <p style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              fontStyle: "italic", fontWeight: 400,
              lineHeight: 1.48, color: C.forestFloor,
              letterSpacing: "-0.01em", marginBottom: 24,
            }}>
              &ldquo;Ceremonial matcha. Lion&apos;s Mane. Grass-fed collagen.
              You were already buying all three — now they&apos;re in{" "}
              <strong style={{ fontStyle: "normal", fontWeight: 700 }}>one sachet</strong>
              .&rdquo;
            </p>
            <div style={{ width: 40, height: 2.5, background: C.forestFloor, margin: "0 auto", borderRadius: 2, opacity: 0.4 }} />
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────── */}
        <section style={{
          background: C.forestFloor, padding: "96px 40px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(245,240,232,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px", pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 20 }}>🌿</div>
            <p style={{
              fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", fontWeight: 600,
              color: C.oatCream, opacity: 0.4, letterSpacing: "0.1em",
              textTransform: "uppercase" as const, marginBottom: 20,
            }}>
              Join the Waitlist
            </p>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 700, color: C.oatCream,
              lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.025em",
            }}>
              First 500 get{" "}
              <em style={{ fontWeight: 400, color: C.sporeBlush }}>40% off.</em>
            </h2>
            <p style={{
              fontSize: "1rem", lineHeight: 1.65, color: C.oatCream, opacity: 0.55,
              marginBottom: 40, maxWidth: 380, margin: "0 auto 40px",
            }}>
              Drop your email. We&apos;ll send your code when we go live.
              No fluff, no spam. Just your discount.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark={true} />
            </div>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" as const }}>
              {["No spam, ever", "40% off launch price", "Ships free"].map(item => (
                <span key={item} style={{
                  fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem",
                  color: C.oatCream, opacity: 0.38, fontWeight: 500,
                }}>
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer style={{ background: C.nearBlack, color: C.oatCream, padding: "34px 40px" }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "12px 32px", alignItems: "center",
          }}>
            <div style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontStyle: "italic", fontWeight: 700, fontSize: "1.35rem", color: C.oatCream,
            }}>
              Shroomé
            </div>
            <div style={{
              fontFamily: "DM Sans, sans-serif", fontSize: "0.75rem",
              color: C.oatCream, opacity: 0.3, textAlign: "center", fontWeight: 500,
            }}>
              Pour. Swirl. Glow. © 2026
            </div>
            <div style={{
              fontFamily: "DM Sans, sans-serif", fontSize: "0.75rem",
              color: C.oatCream, opacity: 0.4, textAlign: "right",
            }}>
              hello@drinkshroome.com
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
