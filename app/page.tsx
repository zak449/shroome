"use client";
import { useState } from "react";

// ── Color tokens — FUNKY, COLOR-BLOCKED ───────────────────────────
const C = {
  cream:    "#FDF4EE",   // warm blush cream
  navy:     "#1B1F3B",   // dark anchor — body text / dark sections
  sage:     "#809463",   // exact logo green
  sageDark: "#5A6B3E",   // deeper sage for hover / contrast
  pink:     "#FFB7D1",   // bubblegum pink — hero bg
  pinkDeep: "#FF6B9D",   // hot pink — CTA punch
  lime:     "#C8FF3A",   // electric lime
  coral:    "#FF7043",   // warm coral/orange
  teal:     "#00C9A7",   // fresh teal
  lavender: "#D4B8E0",   // soft lavender
  blush:    "#FFE8F2",   // pale blush
  fog:      "#F2EBE4",   // warm off-white
  ink:      "#1B1F3B",   // body text
  muted:    "#7A6E80",   // muted grey-violet
};

// Fonts — NO Syne Mono in any UI text
const FD = "'Instrument Serif', Georgia, serif";
const FB = "'Syne', system-ui, sans-serif";

// ── Logo: the actual traced SVG file ──────────────────────────────
function LogoImg({ size = 40, invert = false, tint }: { size?: number; invert?: boolean; tint?: string }) {
  const filter = invert
    ? "brightness(0) invert(1)"
    : tint === "lime"
    ? "brightness(0) saturate(100%) invert(85%) sepia(60%) saturate(500%) hue-rotate(30deg)"
    : "none";
  return (
    <img
      src="/logo-mark.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ display: "block", filter, objectFit: "contain", flexShrink: 0 }}
    />
  );
}

// ── Data ──────────────────────────────────────────────────────────
const INGREDIENTS = [
  {
    num: "01", emoji: "🍵",
    title: "3g Organic Ceremonial Matcha",
    badge: "First-harvest · Shade-grown",
    body: "Not culinary-grade powder. First-harvest ceremonial, shade-grown for three weeks to concentrate L-theanine. The exact quality that costs $9 at a café.",
    stat: "~75mg", statLabel: "Natural caffeine",
    bg: C.blush, accent: C.pinkDeep,
  },
  {
    num: "02", emoji: "🌿",
    title: "200mg Organic Mushroom Beta Glucans",
    badge: "1,3/1,6 beta glucans · Certified organic",
    body: "The active compounds clinically studied for focus, creativity, and immune support. No filler. No proprietary blend. Just the dose that actually does the thing.",
    stat: "200mg", statLabel: "Beta glucans",
    bg: "#E8F0DB", accent: C.sageDark,
  },
  {
    num: "03", emoji: "✨",
    title: "2g Grass-Fed Collagen",
    badge: "Type I & III peptides · Pre-dissolved",
    body: "Already dissolved in the sachet so it actually absorbs. Skin elasticity, hair, nails, joints — the beauty supplement you keep forgetting to take, every morning.",
    stat: "2g", statLabel: "Pre-dissolved peptides",
    bg: C.lavender, accent: "#5B2D8E",
  },
];

const COMPARE = [
  { brand: "shroomé",    us: true,  checks: [true,  true,  true,  true,  true ] },
  { brand: "Clevr",      us: false, checks: [false, false, true,  true,  false] },
  { brand: "RYZE",       us: false, checks: [false, false, false, true,  false] },
  { brand: "MatchaKo",   us: false, checks: [false, true,  false, false, true ] },
  { brand: "Café latte", us: false, checks: [false, true,  false, false, false] },
];
const COMPARE_HEADS = ["Liquid", "Ceremonial", "Collagen", "Mushrooms", "≤$3"];

const STEPS = [
  { num: "01", title: "Tear",  body: "Tear open. 3g of liquid ceremonial matcha concentrate lands in your cup. Zero measuring. Zero clumping.", bg: C.pink,     ink: C.navy },
  { num: "02", title: "Pour",  body: "Pour over oat milk, almond, coconut — whatever you've got. Hot or iced. Watch the green swirl through white.", bg: C.teal,     ink: C.navy },
  { num: "03", title: "Glow",  body: "Clean energy, focus locked in, collagen working while you drink. You literally just out-matched your café. For $3.", bg: C.lime,     ink: C.navy },
];

const TESTIMONIALS = [
  { quote: "no but fr i cancelled my daily café order the first week. just did the math.", name: "Sofia M.", loc: "NYC", bg: C.blush },
  { quote: "lion's mane + matcha is actually cheating for focus. brain feels different. not normal anymore.", name: "Kira J.", loc: "LA", bg: "#E8F0DB" },
  { quote: "my skin has been doing THINGS since i started the collagen every morning. obsessed.", name: "Priya S.", loc: "Austin", bg: C.lavender },
];

// ── Email form ────────────────────────────────────────────────────
function EmailForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    try { await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); } catch {}
    setLoading(false); setDone(true);
  };
  if (done) return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 36px", background: dark ? "rgba(200,255,58,0.15)" : C.fog, color: dark ? C.lime : C.navy, fontFamily: FB, fontSize: "1.05rem", fontWeight: 700 }}>
      ✓ &nbsp;You&apos;re in — 40% off is locked.
    </div>
  );
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "stretch", maxWidth: 520 }}>
      <input
        type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{ flex: "1 1 240px", padding: "18px 24px", border: dark ? "2px solid rgba(253,244,238,0.3)" : `2px solid ${C.navy}`, background: dark ? "rgba(253,244,238,0.08)" : "#fff", color: dark ? C.cream : C.ink, fontFamily: FB, fontSize: "1rem", fontWeight: 500, outline: "none", minWidth: 0 }}
      />
      <button
        type="submit" disabled={loading}
        style={{ padding: "18px 32px", border: "none", background: C.lime, color: C.navy, fontFamily: FB, fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" as const, opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Joining…" : "Claim 40% Off →"}
      </button>
    </form>
  );
}

// ── Sachet SVG — flat rectangular pouch ──────────────────────────
function Sachet({ scale = 1 }: { scale?: number }) {
  const w = Math.round(160 * scale), h = Math.round(400 * scale);
  return (
    <div className="sachet-float" style={{ filter: "drop-shadow(0 28px 56px rgba(27,31,59,0.28))" }}>
      <svg width={w} height={h} viewBox="0 0 160 400" fill="none">
        <defs>
          {/* Flat vertical gradient — no cylindrical effect */}
          <linearGradient id="sBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#F2EBE0"/>
            <stop offset="100%" stopColor="#E8E0D2"/>
          </linearGradient>
        </defs>

        {/* ── Outer body — flat rectangle ── */}
        <rect x="0" y="0" width="160" height="400" rx="2" fill="url(#sBg)"/>

        {/* ── Left crimp seal — vertical lines only ── */}
        <rect x="0" y="0" width="13" height="400" rx="1" fill="rgba(90,107,62,0.12)"/>
        <line x1="5"  y1="0" x2="5"  y2="400" stroke="rgba(90,107,62,0.22)" strokeWidth="1"/>
        <line x1="9"  y1="0" x2="9"  y2="400" stroke="rgba(90,107,62,0.12)" strokeWidth="0.6"/>
        <line x1="12" y1="0" x2="12" y2="400" stroke="rgba(90,107,62,0.28)" strokeWidth="0.8"/>

        {/* ── Right crimp seal ── */}
        <rect x="147" y="0" width="13" height="400" rx="1" fill="rgba(90,107,62,0.12)"/>
        <line x1="148" y1="0" x2="148" y2="400" stroke="rgba(90,107,62,0.28)" strokeWidth="0.8"/>
        <line x1="151" y1="0" x2="151" y2="400" stroke="rgba(90,107,62,0.12)" strokeWidth="0.6"/>
        <line x1="155" y1="0" x2="155" y2="400" stroke="rgba(90,107,62,0.22)" strokeWidth="1"/>

        {/* ── Top seal strip ── */}
        <rect x="13" y="0" width="134" height="46" fill="rgba(90,107,62,0.06)"/>
        <line x1="13" y1="46" x2="147" y2="46" stroke="rgba(90,107,62,0.4)" strokeWidth="1"/>
        {/* Perforations */}
        {[22,33,44,55,66,77,88,99,110,121,132,143].map((x,i) => (
          <circle key={i} cx={x} cy={23} r="1.8" fill="rgba(90,107,62,0.45)"/>
        ))}
        {/* Tear notch — right */}
        <path d="M 147 13 L 160 23 L 147 33" fill="rgba(90,107,62,0.22)"/>

        {/* ── Bottom seal strip ── */}
        <rect x="13" y="354" width="134" height="46" fill="rgba(90,107,62,0.06)"/>
        <line x1="13" y1="354" x2="147" y2="354" stroke="rgba(90,107,62,0.4)" strokeWidth="1"/>

        {/* ── Inner label inset border ── */}
        <rect x="20" y="58" width="120" height="282" fill="rgba(255,255,255,0.18)" stroke="rgba(90,107,62,0.14)" strokeWidth="0.75"/>

        {/* ── Logo ── */}
        <image href="/logo-mark.svg" x="56" y="78" width="48" height="48" opacity="0.85"/>

        {/* ── Brand name ── */}
        <text x="80" y="152" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="18" fill="#1B1F3B" letterSpacing="1">shroomé</text>
        <text x="80" y="166" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="600" fontSize="5.2" fill="#809463" opacity="0.7" letterSpacing="3.2">POUR · SWIRL · GLOW</text>

        {/* ── Divider ── */}
        <line x1="44" y1="180" x2="116" y2="180" stroke="#809463" strokeWidth="0.6" opacity="0.3"/>

        {/* ── Dose tag ── */}
        <rect x="55" y="190" width="50" height="18" fill="none" stroke="#809463" strokeWidth="0.8" opacity="0.55"/>
        <text x="80" y="203" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="6.5" fill="#809463" letterSpacing="1.5">3g DOSE</text>

        {/* ── Lower divider ── */}
        <line x1="44" y1="222" x2="116" y2="222" stroke="#809463" strokeWidth="0.4" opacity="0.18"/>

        {/* ── Ingredients ── */}
        <text x="80" y="278" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="500" fontSize="4.8" fill="#1B1F3B" opacity="0.32" letterSpacing="2">ORGANIC CEREMONIAL MATCHA</text>
        <text x="80" y="290" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="500" fontSize="4.8" fill="#1B1F3B" opacity="0.32" letterSpacing="2">ORGANIC MUSHROOM EXTRACTS</text>
        <text x="80" y="302" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="500" fontSize="4.8" fill="#1B1F3B" opacity="0.32" letterSpacing="2">GRASS-FED COLLAGEN</text>

        {/* ── URL ── */}
        <text x="80" y="328" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="600" fontSize="5" fill="#1B1F3B" opacity="0.18" letterSpacing="1">drinkshroome.com</text>
      </svg>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-track { display:flex; white-space:nowrap; animation:marquee 28s linear infinite; width:max-content; }
        .marquee-track:hover { animation-play-state:paused; }

        @keyframes sachet-float {
          0%,100% { transform:translateY(0px) rotate(-1.5deg); }
          50%      { transform:translateY(-18px) rotate(1.5deg); }
        }
        .sachet-float { animation:sachet-float 6s ease-in-out infinite; }

        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.8);opacity:.4} }
        .pulse-dot { animation:pulse 2.2s ease-in-out infinite; }

        /* ── Funky color-blocked hero blobs ── */
        @keyframes morphBlob1 {
          0%,100% { border-radius:60% 40% 55% 45% / 50% 46% 54% 50%; transform:translate(0,0) scale(1); }
          33%  { border-radius:40% 60% 45% 55% / 60% 40% 58% 42%; transform:translate(16px,-20px) scale(1.04); }
          66%  { border-radius:55% 45% 62% 38% / 44% 58% 46% 52%; transform:translate(-10px,12px) scale(0.97); }
        }
        @keyframes morphBlob2 {
          0%,100% { border-radius:48% 52% 60% 40% / 56% 44% 56% 44%; transform:translate(0,0); }
          50%  { border-radius:62% 38% 46% 54% / 42% 58% 44% 56%; transform:translate(-14px,16px); }
        }
        @keyframes morphBlob3 {
          0%,100% { border-radius:55% 45% 50% 50% / 48% 56% 44% 52%; transform:translate(0,0) rotate(0deg); }
          50%  { border-radius:45% 55% 60% 40% / 54% 44% 56% 46%; transform:translate(10px,-14px) rotate(10deg); }
        }

        .hero-blob-1 {
          position:absolute; width:62vw; height:62vw;
          max-width:760px; max-height:760px;
          top:-20%; right:-16%;
          background:#D4B8E0;
          border-radius:60% 40% 55% 45% / 50% 46% 54% 50%;
          animation:morphBlob1 14s ease-in-out infinite;
          pointer-events:none; z-index:0;
        }
        .hero-blob-2 {
          position:absolute; width:28vw; height:28vw;
          max-width:360px; max-height:360px;
          bottom:-8%; left:-4%;
          background:#C8FF3A;
          border-radius:48% 52% 60% 40% / 56% 44% 56% 44%;
          animation:morphBlob2 18s ease-in-out infinite;
          pointer-events:none; z-index:0; opacity:0.35;
        }
        .hero-blob-3 {
          position:absolute; width:18vw; height:18vw;
          max-width:220px; max-height:220px;
          top:12%; left:42%;
          background:#FF7043;
          border-radius:55% 45% 50% 50% / 48% 56% 44% 52%;
          animation:morphBlob3 22s ease-in-out infinite;
          pointer-events:none; z-index:0; opacity:0.18;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up-1 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .fade-up-2 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
        .fade-up-3 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.32s both; }
        .fade-up-4 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.46s both; }
        .fade-up-5 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.60s both; }
        .fade-up-6 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s both; }

        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
        input::placeholder { color:rgba(27,31,59,0.35); }
        input:focus { outline:none; box-shadow:0 0 0 3px rgba(200,255,58,0.45); }

        .lift { transition:transform .25s ease, box-shadow .25s ease; }
        .lift:hover { transform:translateY(-5px); box-shadow:0 20px 56px rgba(27,31,59,0.14); }

        .chk-y { background:rgba(200,255,58,0.25); color:#C8FF3A; }
        .chk-n { background:rgba(253,244,238,0.07); color:rgba(253,244,238,0.22); }

        @media (max-width:700px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .hero-sachet { order:-1; min-height:60vw; padding:24px 0 16px; }
          .hero-stat-card { display:none !important; }
          .hide-mob { display:none !important; }
          .hero-blob-1 { width:95vw; height:95vw; top:-8%; right:-20%; }
          .hero-blob-2 { display:none; }
        }
      `}</style>

      <div style={{ fontFamily: FB, background: C.cream, color: C.ink, overflowX: "hidden" }}>

        {/* ── Announcement bar ───────────────────────────────── */}
        <div style={{ background: C.navy, color: C.cream, overflow: "hidden", padding: "10px 0" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["THE WORLD'S FIRST READY-TO-POUR MATCHA LATTE", "POUR · SWIRL · GLOW", "3G MATCHA · MUSHROOMS · COLLAGEN", "FIRST 500 GET 40% OFF", "FREE SHIPPING"].map((t, i) => (
                <span key={p * 100 + i} style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.2em", padding: "0 32px", color: C.cream, opacity: 0.85 }}>
                  {t}<span style={{ marginLeft: 32, color: C.lime, opacity: 0.9 }}>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Nav ────────────────────────────────────────────── */}
        <nav style={{ background: `rgba(253,244,238,0.97)`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `2px solid ${C.navy}`, padding: "0 5%", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <LogoImg size={32} />
            <span style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.7rem", color: C.navy, letterSpacing: "-0.02em", lineHeight: 1 }}>
              shroomé
            </span>
          </a>
          <div className="hide-mob" style={{ display: "flex", gap: 36 }}>
            {["Why shroomé", "Ingredients", "How it Works"].map(l => (
              <a key={l} href="#" style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.muted, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: C.navy, color: C.cream, border: "none", padding: "12px 26px", fontFamily: FB, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.lime; e.currentTarget.style.color = C.navy; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.cream; }}
          >
            Get 40% Off →
          </button>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section style={{ background: C.pink, minHeight: "92vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflowX: "clip" as any }} className="hero-grid">
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="hero-blob-3" />

          {/* Left — copy */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 6% 80px 8%", position: "relative", zIndex: 2 }}>

            {/* Pre-launch badge */}
            <div className="fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, alignSelf: "flex-start" }}>
              <div className="pulse-dot" style={{ width: 9, height: 9, borderRadius: "50%", background: C.coral, flexShrink: 0 }}/>
              <span style={{ fontFamily: FB, fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.06em", textTransform: "uppercase" as const, color: C.navy }}>
                Pre-Launch · First 500 Get 40% Off
              </span>
            </div>

            <h1 className="fade-up-2" style={{ fontFamily: FD, fontSize: "clamp(54px, 6.5vw, 96px)", fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.03em", color: C.navy, marginBottom: 28 }}>
              Not a powder.<br />
              A pour.<br />
              <em style={{ fontStyle: "italic", color: C.coral }}>First.</em>
            </h1>

            <p className="fade-up-3" style={{ fontFamily: FB, fontWeight: 500, fontSize: "1.1rem", lineHeight: 1.75, color: C.muted, maxWidth: 400, marginBottom: 10 }}>
              The world&apos;s first liquid ceremonial matcha latte concentrate.
              3g matcha. 2g collagen. Real mushrooms.{" "}
              <strong style={{ color: C.navy, fontWeight: 700 }}>Nothing to mix. Nothing to measure.</strong>
            </p>
            <p className="fade-up-3" style={{ fontFamily: FB, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.sageDark, marginBottom: 36 }}>
              Tear. Pour. Done.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {[
                { label: "3g Matcha", bg: C.blush, color: C.pinkDeep },
                { label: "Mushroom Extracts", bg: "#E8F0DB", color: C.sageDark },
                { label: "Collagen", bg: C.lavender, color: "#5B2D8E" },
                { label: "No Mixing", bg: "#FFF0D6", color: C.coral },
              ].map(p => (
                <span key={p.label} style={{ background: p.bg, padding: "9px 18px", fontFamily: FB, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: p.color }}>{p.label}</span>
              ))}
            </div>

            <div className="fade-up-5">
              <EmailForm dark={false} />
            </div>
            <p className="fade-up-6" style={{ marginTop: 14, fontFamily: FB, fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.04em", color: C.muted, opacity: 0.75 }}>
              No spam. 40% off code drops at launch.
            </p>
          </div>

          {/* Right — sachet */}
          <div className="hero-sachet fade-up-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
            {/* large ghost logo behind sachet */}
            <div style={{ position: "absolute", bottom: "-5%", right: "-4%", pointerEvents: "none", userSelect: "none" as const, opacity: 0.04 }}>
              <LogoImg size={300} />
            </div>
            <Sachet scale={1.2} />
            {/* stat cards */}
            <div className="hero-stat-card" style={{ position: "absolute", bottom: "20%", left: 16, background: C.cream, padding: "14px 20px", border: `2px solid ${C.navy}` }}>
              <p style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.muted, marginBottom: 3 }}>Per serving</p>
              <p style={{ fontFamily: FD, fontSize: "2rem", color: C.sageDark, lineHeight: 1 }}>$3</p>
              <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.82rem", color: C.muted, marginTop: 3 }}>vs. $9 at your café</p>
            </div>
            <div className="hero-stat-card" style={{ position: "absolute", top: "16%", right: 16, background: C.navy, padding: "14px 20px" }}>
              <p style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.lime, marginBottom: 3 }}>Steps</p>
              <p style={{ fontFamily: FD, fontSize: "2rem", color: C.cream, lineHeight: 1 }}>3</p>
              <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.82rem", color: "rgba(253,244,238,0.65)", marginTop: 3 }}>Pour. Swirl. Glow.</p>
            </div>
          </div>
        </section>

        {/* ── Ticker ─────────────────────────────────────────── */}
        <div style={{ background: C.coral, padding: "12px 0", overflow: "hidden", borderTop: `2px solid ${C.navy}`, borderBottom: `2px solid ${C.navy}` }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["INVENTED NOT IMPROVED", "POUR", "SWIRL", "GLOW", "FIRST-EVER READY-TO-POUR", "12 SERVINGS", "$3 / SERVING", "CEREMONIAL GRADE", "FREE SHIPPING"].map((t, i) => (
                <span key={p * 100 + i} style={{ fontFamily: FB, fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.cream, padding: "0 28px" }}>
                  {t}<span style={{ marginLeft: 28, color: "rgba(253,244,238,0.5)" }}>·</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Ingredients — color-blocked ──────────────────────── */}
        <section style={{ background: C.cream, padding: "96px 5%" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.sage, marginBottom: 14 }}>What&apos;s Inside 👀</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.2rem, 4vw, 3.75rem)", lineHeight: 1.03, letterSpacing: "-0.025em", color: C.navy }}>
                Three obsessions.<br /><em style={{ color: C.coral }}>One sachet.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 0, border: `2px solid ${C.navy}` }}>
              {INGREDIENTS.map((card, idx) => (
                <div key={card.title} className="lift" style={{ background: card.bg, padding: "52px 40px", position: "relative", borderRight: idx < 2 ? `2px solid ${C.navy}` : "none" }}>
                  <div style={{ position: "absolute", top: 22, right: 24, fontFamily: FB, fontWeight: 800, fontSize: "0.75rem", color: C.navy, opacity: 0.18, letterSpacing: "0.1em" }}>{card.num}</div>
                  <div style={{ fontSize: "2.5rem", marginBottom: 18 }}>{card.emoji}</div>
                  <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(0,0,0,0.07)", marginBottom: 16, fontFamily: FB, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", color: card.accent, textTransform: "uppercase" as const }}>{card.badge}</div>
                  <h3 style={{ fontFamily: FD, fontSize: "1.5rem", color: C.navy, marginBottom: 16, lineHeight: 1.2 }}>{card.title}</h3>
                  <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.95rem", lineHeight: 1.78, color: C.ink, marginBottom: 30, opacity: 0.8 }}>{card.body}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: FD, fontSize: "3rem", color: card.accent, lineHeight: 1 }}>{card.stat}</span>
                    <span style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.75rem", color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{card.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Invented. Not Improved. ─────────────────────────── */}
        <section style={{ background: C.lavender, padding: "96px 5%", position: "relative", borderTop: `2px solid ${C.navy}` }}>
          {/* corner blob — stays within bounds so no overflow:hidden needed */}
          <div style={{ position: "absolute", width: "38vw", height: "38vw", maxWidth: 480, maxHeight: 480, top: "-10%", right: "0%", background: C.pink, borderRadius: "58% 42% 55% 45% / 50% 48% 52% 50%", pointerEvents: "none", opacity: 0.45 }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "56px 80px", alignItems: "start", position: "relative", zIndex: 1 }}>
            {/* left */}
            <div>
              <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.sageDark, marginBottom: 20 }}>A New Category</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", color: C.navy, marginBottom: 24 }}>
                Invented.<br /><em style={{ color: C.coral }}>Not improved.</em>
              </h2>
              <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "1rem", lineHeight: 1.8, color: "rgba(27,31,59,0.68)", marginBottom: 28, maxWidth: 400 }}>
                Matcha powders clump. Collagen sinks. Mushroom blends taste like dirt. We didn&apos;t try to fix any of that. We made a liquid concentrate that dissolves all three perfectly, every single time.
              </p>
              <div style={{ borderLeft: `4px solid ${C.coral}`, paddingLeft: 22, marginBottom: 32 }}>
                <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.2rem", color: C.coral, lineHeight: 1.45 }}>
                  &ldquo;Not a better powder. A new category.&rdquo;
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {[["3g", "Matcha per serve"], ["2g", "Collagen peptides"], ["200mg", "Beta glucans"], ["~75mg", "Natural caffeine"]].map(([n, l]) => (
                  <div key={l} style={{ background: C.navy, padding: "20px 22px" }}>
                    <div style={{ fontFamily: FD, fontSize: "2.2rem", color: C.lime, lineHeight: 1, marginBottom: 4 }}>{n}</div>
                    <div style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(253,244,238,0.5)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — comparison table, dark box */}
            <div style={{ background: C.navy, padding: "28px 22px", border: `2px solid ${C.navy}` }}>
              {/* mobile scroll wrapper */}
              <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as any }}>
                <div style={{ minWidth: 340 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, marginBottom: 14 }}>
                    <div/>
                    {COMPARE_HEADS.map(h => (
                      <div key={h} style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "rgba(253,244,238,0.75)", textAlign: "center", padding: "0 3px", lineHeight: 1.25 }}>{h}</div>
                    ))}
                  </div>
                  {COMPARE.map((row) => (
                    <div key={row.brand} style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, padding: "13px 0", borderTop: `1px solid rgba(253,244,238,${row.us ? "0.15" : "0.07"})`, background: row.us ? "rgba(200,255,58,0.08)" : "transparent", alignItems: "center" }}>
                      <div style={{ fontFamily: FD, fontSize: row.us ? "1.15rem" : "0.95rem", color: row.us ? C.lime : "rgba(253,244,238,0.6)", fontStyle: row.us ? "italic" : "normal" }}>{row.brand}</div>
                      {row.checks.map((c, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }} className={c ? "chk-y" : "chk-n"}>{c ? "✓" : "✕"}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it Works — 3 bold color blocks ───────────────── */}
        <section style={{ background: C.cream, padding: "96px 5%", borderTop: `2px solid ${C.navy}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.sage, marginBottom: 14 }}>It&apos;s literally 3 steps</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: C.navy }}>
                Pour. Swirl. <em style={{ color: C.teal }}>Glow.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 0, border: `2px solid ${C.navy}` }}>
              {STEPS.map((step, idx) => (
                <div key={step.num} className="lift" style={{ background: step.bg, padding: "56px 44px", position: "relative", borderRight: idx < 2 ? `2px solid ${C.navy}` : "none" }}>
                  <div style={{ fontFamily: FD, fontStyle: "italic", fontSize: "5.5rem", color: "rgba(27,31,59,0.1)", lineHeight: 1, marginBottom: 20 }}>{step.num}</div>
                  <h3 style={{ fontFamily: FD, fontSize: "3rem", fontWeight: 400, color: step.ink, marginBottom: 18, letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.98rem", lineHeight: 1.78, color: step.ink, opacity: 0.8 }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────── */}
        <section style={{ background: C.fog, padding: "88px 5%", borderTop: `2px solid ${C.navy}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.sage, marginBottom: 48, textAlign: "center" }}>Early testers are obsessed 🙌</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 0, border: `2px solid ${C.navy}` }}>
              {TESTIMONIALS.map((t, idx) => (
                <div key={t.name} style={{ background: t.bg, padding: "44px 38px", borderRight: idx < 2 ? `2px solid ${C.navy}` : "none" }}>
                  <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.62, color: C.navy, marginBottom: 28 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: "1.1rem", color: C.cream, flexShrink: 0 }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.95rem", color: C.navy }}>{t.name}</div>
                      <div style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.75rem", color: C.muted, letterSpacing: "0.04em" }}>{t.loc} · early tester</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────── */}
        <section id="waitlist" style={{ background: C.pink, padding: "96px 5%", position: "relative", overflow: "hidden", borderTop: `2px solid ${C.navy}` }}>
          {/* corner blobs */}
          <div style={{ position: "absolute", width: "35vw", height: "35vw", maxWidth: 460, maxHeight: 460, bottom: "-20%", left: "-8%", background: C.coral, borderRadius: "55% 45% 60% 40% / 48% 56% 44% 52%", pointerEvents: "none", opacity: 0.3 }}/>
          <div style={{ position: "absolute", width: "24vw", height: "24vw", maxWidth: 320, maxHeight: 320, top: "-14%", right: "8%", background: C.lime, borderRadius: "48% 52% 58% 42% / 52% 44% 56% 48%", pointerEvents: "none", opacity: 0.5 }}/>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <LogoImg size={64} />
            </div>
            <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.navy, marginBottom: 20 }}>Join the Waitlist</p>
            <h2 style={{ fontFamily: FD, fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)", lineHeight: 0.98, letterSpacing: "-0.03em", color: C.navy, marginBottom: 18 }}>
              First 500 get <em style={{ color: C.coral }}>40% off.</em>
            </h2>
            <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "1.05rem", lineHeight: 1.65, color: "rgba(27,31,59,0.65)", maxWidth: 380, margin: "0 auto 40px" }}>
              Drop your email. Your code lands in your inbox the moment we go live.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark={false} />
            </div>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" as const }}>
              {["No spam", "40% off launch price", "Ships free"].map(item => (
                <span key={item} style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.8rem", color: "rgba(27,31,59,0.55)", letterSpacing: "0.04em" }}>✓ {item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer style={{ background: C.navy, color: C.cream, padding: "38px 5%", borderTop: `2px solid ${C.navy}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "14px 32px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LogoImg size={26} invert />
              <span style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.5rem", color: C.cream }}>shroomé</span>
            </div>
            <div style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.12em", color: "rgba(253,244,238,0.32)", textAlign: "center", textTransform: "uppercase" as const }}>The world&apos;s first ready-to-pour matcha latte concentrate. © 2026</div>
            <div style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.8rem", color: "rgba(253,244,238,0.45)", textAlign: "right" }}>hello@drinkshroome.com</div>
          </div>
        </footer>

      </div>
    </>
  );
}
