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
  { num: "01", title: "Tear",  body: "Tear the tip. 3g of liquid ceremonial matcha hits the cup. No scoop. No clump. No mess.", bg: C.pink,     ink: C.navy },
  { num: "02", title: "Pour",  body: "Drop it into oat milk, almond, coconut — whatever. Hot or iced. The green swirls through and it looks insane.", bg: C.teal,     ink: C.navy },
  { num: "03", title: "Hit",   body: "75mg clean caffeine + lion's mane + collagen kicks in with zero crash, zero jitters. This is what energy is supposed to feel like.", bg: C.lime,     ink: C.navy },
];

const TESTIMONIALS = [
  { quote: "literally replaced my $7 matcha latte. same energy, way less broke.", name: "Sofia M.", loc: "NYC", bg: C.blush },
  { quote: "lion's mane + matcha is cheating for focus. i get more done before 10am now it's unreal.", name: "Kira J.", loc: "LA", bg: "#E8F0DB" },
  { quote: "no crash. no jitters. just locked in from the first sip. i'm not going back.", name: "Priya S.", loc: "Austin", bg: C.lavender },
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

// ── Sachet — uses real product PNG if available, falls back to SVG ─
// Drop sachet-vanilla.png + sachet-strawberry.png into /public/ to activate
// Flat flexible mylar pouch — simple rectangle, heat-seal border, dashed tear line
// viewBox 0 0 160 320
const SACHET_PATH = `M 12,6 L 148,6 Q 154,6 154,12 L 154,308 Q 154,314 148,314 L 12,314 Q 6,314 6,308 L 6,12 Q 6,6 12,6 Z`;
const SACHET_CAP_PATH = `M 14,8 L 146,8 L 146,72 L 14,72 Z`;

const FLAVORS = {
  vanilla: {
    bg:       "#F5F0E8",
    bgEdge:   "#E2DBD0",
    nameColor:"#2C5530",
    sub:      "#8B4A2A",
    subLabel: "vanilla",
    textMid:  "#2C5530",
    capTint:  "rgba(255,255,255,0.14)",
    perf:     "rgba(44,85,48,0.32)",
  },
  strawberry: {
    bg:       "#FFB8C2",
    bgEdge:   "#F09AAA",
    nameColor:"#1A3020",
    sub:      "#9B1A1A",
    subLabel: "strawberry",
    textMid:  "#1A3020",
    capTint:  "rgba(255,255,255,0.18)",
    perf:     "rgba(26,48,32,0.28)",
  },
} as const;

function Sachet({ flavor = "vanilla" as "vanilla" | "strawberry", scale = 1, height }: { flavor?: "vanilla"|"strawberry"; scale?: number; height?: number }) {
  // ↓ Drop your product renders into /public/ to instantly activate:
  //   sachet-vanilla.png  |  sachet-strawberry.png
  const [imgFailed, setImgFailed] = useState(false);
  const pngSrc = `/sachet-${flavor}.png`;
  const w = Math.round(260 * scale);
  const cfg = FLAVORS[flavor];

  if (!imgFailed) {
    const imgStyle: React.CSSProperties = height
      ? { display: "block", height: height, width: "auto", maxWidth: "100%", objectFit: "contain" }
      : { display: "block", maxWidth: "100%", objectFit: "contain" };
    return (
      <div className="sachet-float" style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 8px 24px rgba(0,0,0,0.30))" }}>
        <img
          src={pngSrc}
          alt={`shroomé ${flavor} sachet`}
          {...(!height ? { width: w } : {})}
          style={imgStyle}
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  // Fallback: full SVG sachet render with actual logo + brand colors
  const ph = Math.round(260 * scale);
  const uid = flavor;
  // flat 160×320 pouch coordinate space
  const cx = 80; // horizontal center
  const logoSz = 50;
  const logoX = cx - logoSz / 2;
  const logoY = 98;
  const nameY  = logoY + logoSz + 22;
  const divY   = nameY + 16;
  const flavY  = divY + 14;
  const statsY = 285;
  return (
    <div className="sachet-float" style={{ filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.4))", width: ph, flexShrink: 0 }}>
      <svg viewBox="0 0 160 320" width={ph} style={{ display: "block", overflow: "visible" }}>
        <defs>
          {/* Flat foil gradient — subtle horizontal light sweep */}
          <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={cfg.bgEdge} />
            <stop offset="10%"  stopColor={cfg.bg} />
            <stop offset="38%"  stopColor="#fff" stopOpacity="0.2" />
            <stop offset="50%"  stopColor={cfg.bg} />
            <stop offset="90%"  stopColor={cfg.bg} />
            <stop offset="100%" stopColor={cfg.bgEdge} />
          </linearGradient>
          {/* Slightly darker header tint */}
          <linearGradient id={`hdr-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={cfg.bgEdge} stopOpacity="0.9" />
            <stop offset="50%"  stopColor={cfg.bg} />
            <stop offset="100%" stopColor={cfg.bgEdge} stopOpacity="0.9" />
          </linearGradient>
          <clipPath id={`clip-${uid}`}>
            <path d={SACHET_PATH} />
          </clipPath>
        </defs>

        {/* ── Pouch body ── */}
        <path d={SACHET_PATH} fill={`url(#bg-${uid})`} />

        {/* ── Heat-seal border frame — inset rectangle ── */}
        <rect x="14" y="10" width="132" height="300" rx="2"
          fill="none" stroke={cfg.bgEdge} strokeWidth="3.5" />



        {/* ── Soft sheen diagonal ── */}
        <path d="M 48,76 L 38,316" stroke="white" strokeWidth="22" strokeOpacity="0.11"
          clipPath={`url(#clip-${uid})`} strokeLinecap="round" />

        {/* ── Actual logo mark ── */}
        <image href="/logo-mark.svg" x={logoX} y={logoY} width={logoSz} height={logoSz} />

        {/* ── Brand name ── */}
        <text x={cx} y={nameY}
          fill={cfg.nameColor} fontSize="22"
          fontFamily="'Instrument Serif', Georgia, serif"
          fontStyle="italic" textAnchor="middle">shroomé</text>

        {/* ── Rule ── */}
        <line x1={cx - 28} y1={divY - 3} x2={cx + 28} y2={divY - 3}
          stroke={cfg.nameColor} strokeWidth="0.5" strokeOpacity="0.2" />

        {/* ── Flavor ── */}
        <text x={cx} y={flavY}
          fill={cfg.sub} fontSize="11"
          fontFamily="'Instrument Serif', Georgia, serif"
          fontStyle="italic" textAnchor="middle">{cfg.subLabel}</text>

        {/* ── Stats ── */}
        <text x={cx} y={statsY}
          fill={cfg.nameColor} fontSize="5.8"
          fontFamily="'Syne', system-ui, sans-serif"
          letterSpacing="0.7" textAnchor="middle" opacity="0.38">
          75MG CAFFEINE · LION'S MANE · COLLAGEN
        </text>

        {/* ── Outer seam outline ── */}
        <path d={SACHET_PATH} fill="none" stroke={cfg.bgEdge} strokeWidth="2" />
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
          .hero-sachet { order:-1; min-height:50vw; max-height:90vw; padding:16px 0 8px; overflow:hidden; }
          .hero-sachet img { max-height:82vw !important; width:auto !important; height:auto !important; }
          .hero-stat-card { display:none !important; }
          .hide-mob { display:none !important; }
          .hero-blob-1 { width:95vw; height:95vw; top:-8%; right:-20%; }
          .hero-blob-2 { display:none; }
          .cmp-inner { min-width:0 !important; }
          .cmp-circle { width:22px !important; height:22px !important; font-size:0.72rem !important; }
          .cmp-head { writing-mode:vertical-rl !important; transform:rotate(180deg) !important; font-size:0.58rem !important; letter-spacing:0.06em !important; padding:4px 2px !important; height:90px !important; align-self:end !important; white-space:nowrap !important; }
          .cmp-brand { font-size:0.85rem !important; }
          .cmp-grid { grid-template-columns:1.8fr repeat(5,1fr) !important; }
        }
      `}</style>

      <div style={{ fontFamily: FB, background: C.cream, color: C.ink, overflowX: "clip" as any }}>

        {/* ── Announcement bar ───────────────────────────────── */}
        <div style={{ background: C.navy, color: C.cream, overflow: "hidden", padding: "10px 0" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["THE WORLD'S FIRST READY-TO-POUR MATCHA LATTE", "ENERGY WITHOUT THE CRASH", "3G MATCHA · MUSHROOMS · COLLAGEN", "FIRST 500 GET 40% OFF", "FREE SHIPPING"].map((t, i) => (
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
              Café energy.<br />
              Home address.<br />
              <em style={{ fontStyle: "italic", color: C.coral }}>No crash.</em>
            </h1>

            <p className="fade-up-3" style={{ fontFamily: FB, fontWeight: 500, fontSize: "1.1rem", lineHeight: 1.75, color: C.muted, maxWidth: 400, marginBottom: 10 }}>
              The world&apos;s first ready-to-pour ceremonial matcha latte.
              3g matcha. 2g collagen. Real mushrooms.{" "}
              <strong style={{ color: C.navy, fontWeight: 700 }}>Tear it open. Pour it in. Done.</strong>
            </p>
            <p className="fade-up-3" style={{ fontFamily: FB, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.sageDark, marginBottom: 36 }}>
              75mg caffeine · Zero jitters · Actually tastes good.
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

          {/* Right — both sachets */}
          <div className="hero-sachet fade-up-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, overflow: "visible" }}>
            {/* ghost logo */}
            <div style={{ position: "absolute", bottom: "-5%", right: "-4%", pointerEvents: "none", userSelect: "none" as const, opacity: 0.035 }}>
              <LogoImg size={280} />
            </div>
            {/* Vanilla — back, angled left */}
            <div style={{ position: "absolute", transform: "rotate(-9deg) translateX(-28%)", transformOrigin: "bottom center", zIndex: 1, opacity: 0.88 }}>
              <Sachet flavor="vanilla" height={380} />
            </div>
            {/* Strawberry — front, slight tilt */}
            <div style={{ transform: "rotate(4deg)", transformOrigin: "bottom center", zIndex: 2 }}>
              <Sachet flavor="strawberry" height={380} />
            </div>
            {/* stat cards */}
            <div className="hero-stat-card" style={{ position: "absolute", bottom: "22%", left: 0, background: C.cream, padding: "14px 20px", border: `2px solid ${C.navy}`, zIndex: 3 }}>
              <p style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.muted, marginBottom: 3 }}>Per serving</p>
              <p style={{ fontFamily: FD, fontSize: "2rem", color: C.sageDark, lineHeight: 1 }}>$3</p>
              <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.82rem", color: C.muted, marginTop: 3 }}>vs. $9 at your café</p>
            </div>
            <div className="hero-stat-card" style={{ position: "absolute", top: "18%", right: 0, background: C.navy, padding: "14px 20px", zIndex: 3 }}>
              <p style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.lime, marginBottom: 3 }}>Flavors</p>
              <p style={{ fontFamily: FD, fontSize: "1.1rem", color: C.cream, lineHeight: 1.3 }}>Vanilla<br/>Strawberry</p>
            </div>
          </div>
        </section>

        {/* ── Ghia-style dark product moment ─────────────────────── */}
        <section style={{ background: "#060608", padding: "88px 5% 104px", position: "relative", overflowX: "hidden" as any, borderTop: `2px solid ${C.navy}` }}>
          {/* Star-burst light rays — conic gradient from behind sachets */}
          <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "140%", height: "130%", background: "conic-gradient(from 0deg at 50% 38%, transparent 0deg, rgba(255,240,200,0.055) 3deg, transparent 6deg, transparent 12deg, rgba(255,240,200,0.04) 15deg, transparent 18deg, transparent 24deg, rgba(255,240,200,0.06) 27deg, transparent 30deg, transparent 40deg, rgba(255,240,200,0.04) 43deg, transparent 46deg, transparent 60deg, rgba(255,240,200,0.045) 63deg, transparent 66deg, transparent 90deg, rgba(255,240,200,0.035) 93deg, transparent 96deg, transparent 120deg, rgba(255,240,200,0.05) 123deg, transparent 126deg, transparent 150deg, rgba(255,240,200,0.04) 153deg, transparent 156deg, transparent 180deg, rgba(255,240,200,0.055) 183deg, transparent 186deg, transparent 210deg, rgba(255,240,200,0.035) 213deg, transparent 216deg, transparent 240deg, rgba(255,240,200,0.05) 243deg, transparent 246deg, transparent 270deg, rgba(255,240,200,0.04) 273deg, transparent 276deg, transparent 300deg, rgba(255,240,200,0.06) 303deg, transparent 306deg, transparent 330deg, rgba(255,240,200,0.045) 333deg, transparent 336deg, transparent 360deg)", pointerEvents: "none", zIndex: 0 }}/>
          {/* Central bright halo */}
          <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "60%", background: "radial-gradient(ellipse at 50% 30%, rgba(255,245,220,0.18) 0%, rgba(220,190,130,0.09) 25%, rgba(200,160,100,0.03) 50%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}/>
          {/* Vanilla sachet warm glow */}
          <div style={{ position: "absolute", top: "15%", left: "25%", width: "30vw", height: "70%", background: "radial-gradient(ellipse at 50% 40%, rgba(232,208,148,0.18) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }}/>
          {/* Strawberry sachet rose glow */}
          <div style={{ position: "absolute", top: "15%", right: "18%", width: "30vw", height: "70%", background: "radial-gradient(ellipse at 50% 40%, rgba(225,170,170,0.16) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }}/>

          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
            {/* headline */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.lime, marginBottom: 16, opacity: 0.85 }}>2 Flavors · 1 Ritual</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.8rem, 5vw, 5rem)", fontWeight: 400, lineHeight: 0.93, letterSpacing: "-0.03em", color: C.cream }}>
                Pick your flavor.<br /><em style={{ color: C.pink }}>Both hit different.</em>
              </h2>
            </div>

            {/* sachets side by side */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(16px, 4vw, 56px)", position: "relative", zIndex: 2 }}>
              {/* Vanilla */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{ transform: "rotate(-6deg)", filter: "drop-shadow(0 40px 80px rgba(232,208,148,0.55)) drop-shadow(0 0 40px rgba(255,240,200,0.25))" }}>
                  <Sachet flavor="vanilla" height={420} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: FD, fontSize: "1.4rem", fontStyle: "italic", color: C.cream, marginBottom: 4 }}>Vanilla</p>
                  <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.78rem", color: "rgba(253,244,238,0.45)", letterSpacing: "0.1em" }}>Warm · Floral · Grounding</p>
                </div>
              </div>

              {/* center divider line */}
              <div style={{ width: 1, height: 80, background: "rgba(253,244,238,0.12)", alignSelf: "center" }} className="hide-mob"/>

              {/* Strawberry */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{ transform: "rotate(6deg)", filter: "drop-shadow(0 40px 80px rgba(225,160,160,0.55)) drop-shadow(0 0 40px rgba(255,200,200,0.25))" }}>
                  <Sachet flavor="strawberry" height={420} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: FD, fontSize: "1.4rem", fontStyle: "italic", color: C.cream, marginBottom: 4 }}>Strawberry</p>
                  <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.78rem", color: "rgba(253,244,238,0.45)", letterSpacing: "0.1em" }}>Bright · Fruity · Fresh</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: C.lime, color: C.navy, border: "none", padding: "18px 48px", fontFamily: FB, fontWeight: 800, fontSize: "0.88rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.lime; }}
              >
                Claim 40% Off at Launch →
              </button>
              <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.78rem", color: "rgba(253,244,238,0.38)", letterSpacing: "0.04em" }}>First 500 spots only · Free shipping</p>
            </div>
          </div>
        </section>

        {/* ── Ticker ─────────────────────────────────────────── */}
        <div style={{ background: C.coral, padding: "12px 0", overflow: "hidden", borderTop: `2px solid ${C.navy}`, borderBottom: `2px solid ${C.navy}` }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["ENERGY WITHOUT THE CRASH", "TEAR", "POUR", "HIT", "FIRST-EVER READY-TO-POUR", "12 SERVINGS", "$3 / SERVING", "CEREMONIAL GRADE", "FREE SHIPPING"].map((t, i) => (
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
                Matcha powders clump. Collagen sinks. Mushroom blends taste like dirt. We didn&apos;t try to fix any of that. We made a liquid sachet that dissolves all three perfectly, every single time.
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
                <div className="cmp-inner" style={{ minWidth: 340 }}>
                  <div className="cmp-grid" style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, marginBottom: 14, alignItems: "end" }}>
                    <div/>
                    {COMPARE_HEADS.map(h => (
                      <div key={h} className="cmp-head" style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "rgba(253,244,238,0.75)", textAlign: "center", padding: "0 3px", lineHeight: 1.25 }}>{h}</div>
                    ))}
                  </div>
                  {COMPARE.map((row) => (
                    <div key={row.brand} className="cmp-grid" style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, padding: "13px 0", borderTop: `1px solid rgba(253,244,238,${row.us ? "0.15" : "0.07"})`, background: row.us ? "rgba(200,255,58,0.08)" : "transparent", alignItems: "center" }}>
                      <div className="cmp-brand" style={{ fontFamily: FD, fontSize: row.us ? "1.15rem" : "0.95rem", color: row.us ? C.lime : "rgba(253,244,238,0.6)", fontStyle: row.us ? "italic" : "normal" }}>{row.brand}</div>
                      {row.checks.map((c, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span className={`cmp-circle ${c ? "chk-y" : "chk-n"}`} style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>{c ? "✓" : "✕"}</span>
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
              <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.sage, marginBottom: 14 }}>30 seconds. That&apos;s it.</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: C.navy }}>
                Tear. Pour. <em style={{ color: C.teal }}>Hit.</em>
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
            <p style={{ fontFamily: FB, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.sage, marginBottom: 48, textAlign: "center" }}>Real people. Real energy. 🔋</p>
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
              Drop your email. Your code hits your inbox the second we launch.
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
            <div style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.12em", color: "rgba(253,244,238,0.32)", textAlign: "center", textTransform: "uppercase" as const }}>The world&apos;s first ready-to-pour matcha latte. © 2026</div>
            <div style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.8rem", color: "rgba(253,244,238,0.45)", textAlign: "right" }}>hello@drinkshroome.com</div>
          </div>
        </footer>

      </div>
    </>
  );
}
