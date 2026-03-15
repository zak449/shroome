"use client";
import { useState } from "react";

// ── tokens — NO BLACK. Deep forest green replaces all black ──────
const C = {
  cream:    "#FDF4EE",     // warm blush cream — primary bg
  ink:      "#1B3A24",     // deep forest green (body text / dark anchor)
  matcha:   "#2D5A35",     // medium forest green (logo, accents)
  deep:     "#1B3A24",     // dark section bg — forest green, NOT black
  bright:   "#4A8A52",     // brighter green (labels)
  jade:     "#C8FF3A",     // NEON LIME
  glow:     "#E8C840",     // warm gold CTA
  glowBr:   "#F2DC60",
  straw:    "#E8506A",     // vibrant strawberry
  strawLt:  "#FFEEF3",
  van:      "#C87842",     // warm amber
  vanLt:    "#FFF4EC",
  fog:      "#F2EBE4",     // warm off-white sections
  muted:    "#6B846E",     // muted forest green (secondary text)
  rule:     "rgba(27,58,36,0.1)",
};
const FD = "'Instrument Serif', Georgia, serif";
const FB = "'Syne', system-ui, sans-serif";
const FM = "'Syne Mono', 'DM Mono', monospace";

const dotStyle = (color?: string, size = 22) => ({
  backgroundImage: `radial-gradient(circle, ${color || "rgba(27,58,36,0.06)"} 1px, transparent 1px)`,
  backgroundSize: `${size}px ${size}px`,
});
const grainStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat" as const,
};

// ── data ──────────────────────────────────────────────────────────
const INGREDIENTS = [
  {
    num: "01", emoji: "🍵",
    title: "3g Organic Ceremonial Matcha",
    badge: "First-harvest · Shade-grown",
    body: "Not culinary-grade powder. First-harvest ceremonial, shade-grown for three weeks to concentrate L-theanine. The exact quality that costs $9 at a café.",
    stat: "~75mg", statLabel: "Natural caffeine",
    bg: C.cream,
  },
  {
    num: "02", emoji: "🌿",
    title: "200mg Organic Mushroom Beta Glucans",
    badge: "1,3/1,6 beta glucans · Certified organic",
    body: "The active compounds clinically studied for focus, creativity, and immune support. No filler. No proprietary blend. Just the dose that actually does the thing.",
    stat: "200mg", statLabel: "Beta glucans 1,3/1,6",
    bg: "#EEF7E8",
  },
  {
    num: "03", emoji: "✨",
    title: "2g Grass-Fed Collagen",
    badge: "Type I & III peptides · Pre-dissolved",
    body: "Already dissolved in the sachet so it actually absorbs. Skin elasticity, hair, nails, joints — the beauty supplement you keep forgetting to take, every morning.",
    stat: "2g", statLabel: "Pre-dissolved peptides",
    bg: C.vanLt,
  },
];

const COMPARE = [
  { brand: "shroomé",    us: true,  checks: [true,  true,  true,  true,  true ] },
  { brand: "Clevr",      us: false, checks: [false, false, true,  true,  false] },
  { brand: "RYZE",       us: false, checks: [false, false, false, true,  false] },
  { brand: "MatchaKo",   us: false, checks: [false, true,  false, false, true ] },
  { brand: "Café latte", us: false, checks: [false, true,  false, false, false] },
];
const COMPARE_HEADS = ["Ready-to-Pour", "Ceremonial", "Collagen", "Mushrooms", "$3 or less"];

const STEPS = [
  { num: "01", emoji: "🌿", title: "Pour",  body: "Tear open. 3g of liquid ceremonial matcha concentrate lands in your cup. Zero measuring. Zero clumping. Zero thinking before coffee." },
  { num: "02", emoji: "🌀", title: "Swirl", body: "Pour over oat milk, almond, coconut — whatever you've got. Hot or iced. Watch the green swirl through white. That's the moment." },
  { num: "03", emoji: "✨", title: "Glow",  body: "Clean energy, focus locked in, collagen working while you drink. You literally just out-matched your café. For $3." },
];

const TESTIMONIALS = [
  { quote: "no but fr i cancelled my daily café order the first week. just did the math.", name: "Sofia M.", loc: "NYC", accent: "#EEF7E8" },
  { quote: "lion's mane + matcha is actually cheating for focus. brain feels different. not normal anymore.", name: "Kira J.", loc: "LA", accent: C.vanLt },
  { quote: "my skin has been doing THINGS since i started the collagen every morning. obsessed.", name: "Priya S.", loc: "Austin", accent: C.strawLt },
];

// ── Logo mark ─────────────────────────────────────────────────────
function LogoMark({ size = 40, color = "#2D5A35" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={Math.round(size * 1.34)} viewBox="0 0 100 134" fill="none" aria-hidden="true">
      <path
        d="M78 40C90 26 94 8 66 4C36 0 6 18 6 48C6 68 18 84 46 82C68 80 86 92 78 114C72 128 44 130 22 114"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", background: dark ? "rgba(232,200,64,0.15)" : C.fog, color: dark ? C.glow : C.matcha, fontFamily: FB, fontSize: "1rem", fontWeight: 700 }}>
      ✓ &nbsp;You&apos;re in — 40% off is locked.
    </div>
  );
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "stretch", maxWidth: 520 }}>
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
        style={{ flex: "1 1 240px", padding: "16px 22px", border: dark ? `1px solid rgba(253,244,238,0.25)` : `1px solid ${C.rule}`, background: dark ? "rgba(253,244,238,0.08)" : "#fff", color: dark ? C.cream : C.ink, fontFamily: FB, fontSize: "1rem", outline: "none", minWidth: 0 }} />
      <button type="submit" disabled={loading}
        style={{ padding: "16px 28px", border: "none", background: C.glow, color: C.ink, fontFamily: FB, fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" as const, opacity: loading ? 0.7 : 1 }}>
        {loading ? "Joining…" : "Claim 40% Off →"}
      </button>
    </form>
  );
}

// ── Sachet — CREAM version (pops on forest green blob) ───────────
function Sachet({ scale = 1 }: { scale?: number }) {
  const w = Math.round(240 * scale), h = Math.round(350 * scale);
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div className="sachet-float" style={{ filter: "drop-shadow(0 36px 64px rgba(27,58,36,0.45))" }}>
        <svg width={w} height={h} viewBox="0 0 240 350" fill="none">
          <defs>
            <linearGradient id="sG" x1="0" y1="0" x2="240" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F6F0E8"/><stop offset="55%" stopColor="#EDE4D6"/><stop offset="100%" stopColor="#E2D6C4"/>
            </linearGradient>
            <linearGradient id="sS" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(27,58,36,0)"/><stop offset="40%" stopColor="rgba(27,58,36,0.04)"/><stop offset="100%" stopColor="rgba(27,58,36,0)"/>
            </linearGradient>
            <clipPath id="sC"><rect x="14" y="14" width="212" height="322" rx="0"/></clipPath>
          </defs>
          <rect x="14" y="14" width="212" height="322" fill="url(#sG)"/>
          <rect x="14" y="14" width="212" height="322" fill="url(#sS)"/>
          <rect x="22" y="22" width="196" height="306" fill="none" stroke="rgba(27,58,36,0.14)" strokeWidth="1"/>
          {[70, 120, 170].map((x, i) => <circle key={i} cx={x} cy="23" r="2.5" fill={C.matcha} opacity="0.4"/>)}
          <line x1="30" y1="52" x2="210" y2="52" stroke={C.matcha} strokeWidth="0.75" opacity="0.35"/>
          <text x="120" y="90" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="22" fill={C.ink} letterSpacing="2">shroomé</text>
          <text x="120" y="107" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="6.5" fill={C.matcha} opacity="0.7" letterSpacing="3.5">POUR · SWIRL · GLOW</text>
          <circle cx="120" cy="195" r="58" fill="none" stroke="rgba(27,58,36,0.1)" strokeWidth="1"/>
          <circle cx="120" cy="195" r="46" fill="none" stroke="rgba(27,58,36,0.06)" strokeWidth="0.5"/>
          <svg x="88" y="155" width="65" height="87" viewBox="0 0 100 134">
            <path
              d="M78 40C90 26 94 8 66 4C36 0 6 18 6 48C6 68 18 84 46 82C68 80 86 92 78 114C72 128 44 130 22 114"
              stroke="rgba(27,58,36,0.22)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <circle cx="68"  cy="155" r="2" fill={C.glow} opacity="0.5"/>
          <circle cx="172" cy="235" r="1.5" fill={C.jade} opacity="0.5"/>
          <circle cx="58"  cy="238" r="1.5" fill={C.matcha} opacity="0.2"/>
          <rect x="14" y="276" width="212" height="60" fill="rgba(27,58,36,0.03)" clipPath="url(#sC)"/>
          <line x1="30" y1="278" x2="210" y2="278" stroke={C.matcha} strokeWidth="0.5" opacity="0.25"/>
          <text x="120" y="298" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5.5" fill={C.ink} opacity="0.45" letterSpacing="2.5">ORGANIC CEREMONIAL MATCHA</text>
          <text x="120" y="312" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5.5" fill={C.ink} opacity="0.45" letterSpacing="2.5">ORGANIC MUSHROOM EXTRACTS</text>
          <text x="120" y="326" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5.5" fill={C.ink} opacity="0.45" letterSpacing="2.5">GRASS-FED COLLAGEN</text>
          <rect x="98" y="248" width="44" height="16" fill="none" stroke={C.matcha} strokeWidth="0.75" opacity="0.55"/>
          <text x="120" y="260" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="6.5" fill={C.matcha} letterSpacing="1.5">3g DOSE</text>
        </svg>
      </div>
    </div>
  );
}

// ── Flavor card sachet (dark forest green, on light card bg) ──────
function FlavorCard({ name, desc, price, gradient, accent, badge }: { name: string; desc: string; price: string; gradient: string; accent: string; badge?: string }) {
  return (
    <div className="lift" style={{ background: C.cream, border: `1px solid ${C.rule}`, overflow: "hidden", cursor: "pointer" }}>
      <div style={{ position: "relative", height: 260, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(255,255,255,0.2)", 14), opacity: 0.6, pointerEvents: "none" }} />
        {badge && (
          <div style={{ position: "absolute", top: 12, left: 12, background: C.glow, color: C.ink, fontFamily: FB, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "5px 12px", fontWeight: 700 }}>{badge}</div>
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <svg width="120" height="175" viewBox="0 0 120 175" fill="none">
            <defs>
              <linearGradient id={`cG_${name}`} x1="0" y1="0" x2="120" y2="175" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E4028"/><stop offset="100%" stopColor="#122518"/>
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="108" height="163" fill={`url(#cG_${name})`} style={{ filter: "drop-shadow(0 12px 28px rgba(27,58,36,0.3))" }}/>
            <rect x="10" y="10" width="100" height="155" fill="none" stroke="rgba(232,200,64,0.25)" strokeWidth="0.75"/>
            <text x="60" y="48" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="11" fill="#FDF4EE" letterSpacing="1">shroomé</text>
            <text x="60" y="61" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="4" fill="#E8C840" opacity="0.7" letterSpacing="2.5">POUR·SWIRL·GLOW</text>
            <circle cx="60" cy="100" r="28" fill="none" stroke="rgba(232,200,64,0.12)" strokeWidth="0.75"/>
            <svg x="36" y="74" width="48" height="64" viewBox="0 0 100 134">
              <path
                d="M78 40C90 26 94 8 66 4C36 0 6 18 6 48C6 68 18 84 46 82C68 80 86 92 78 114C72 128 44 130 22 114"
                stroke="rgba(253,244,238,0.25)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <text x="60" y="138" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5" fill={accent} letterSpacing="1">{name.toUpperCase()}</text>
            <rect x="44" y="148" width="32" height="10" fill="none" stroke="#E8C840" strokeWidth="0.5" opacity="0.6"/>
            <text x="60" y="156" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="4.5" fill="#E8C840" letterSpacing="1">3g DOSE</text>
          </svg>
        </div>
      </div>
      <div style={{ padding: "22px 24px 28px" }}>
        <p style={{ fontFamily: FM, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: accent, marginBottom: 6 }}>{name}</p>
        <p style={{ fontFamily: FD, fontSize: "1.3rem", color: C.ink, marginBottom: 8, lineHeight: 1.2 }}>{desc}</p>
        <p style={{ fontFamily: FB, fontSize: "1.15rem", fontWeight: 700, color: C.ink, marginBottom: 18 }}>{price} <span style={{ fontFamily: FM, fontSize: "0.72rem", color: C.muted, fontWeight: 400 }}>/ 12 servings</span></p>
        <button style={{ width: "100%", padding: "13px", background: C.deep, color: C.cream, border: "none", fontFamily: FB, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, cursor: "pointer" }}>
          Join Waitlist →
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=Syne+Mono&display=swap');

        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-track { display:flex; white-space:nowrap; animation:marquee 28s linear infinite; width:max-content; }
        .marquee-track:hover { animation-play-state:paused; }

        @keyframes sachet-float {
          0%   { transform:translateY(0px) rotate(-2deg); }
          50%  { transform:translateY(-20px) rotate(1.5deg); }
          100% { transform:translateY(0px) rotate(-2deg); }
        }
        .sachet-float { animation:sachet-float 6s ease-in-out infinite; }

        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }
        .pulse-dot { animation:pulse 2.2s ease-in-out infinite; }

        /* ── Animated blobs for hero ── */
        @keyframes morphBlob1 {
          0%,100% { border-radius:65% 35% 58% 42% / 52% 46% 54% 48%; transform:translate(0,0) scale(1); }
          25% { border-radius:42% 58% 46% 54% / 60% 40% 56% 44%; transform:translate(14px,-22px) scale(1.03); }
          50% { border-radius:58% 42% 62% 38% / 44% 58% 46% 54%; transform:translate(-10px,10px) scale(0.97); }
          75% { border-radius:46% 54% 38% 62% / 56% 48% 52% 44%; transform:translate(8px,14px) scale(1.01); }
        }
        @keyframes morphBlob2 {
          0%,100% { border-radius:48% 52% 62% 38% / 56% 42% 58% 44%; transform:translate(0,0); }
          33% { border-radius:62% 38% 48% 52% / 42% 58% 44% 56%; transform:translate(-16px,12px); }
          66% { border-radius:38% 62% 54% 46% / 58% 44% 56% 42%; transform:translate(12px,-10px); }
        }
        @keyframes morphBlob3 {
          0%,100% { border-radius:55% 45% 48% 52% / 48% 56% 44% 52%; transform:translate(0,0) rotate(0deg); }
          50% { border-radius:45% 55% 60% 40% / 52% 44% 56% 48%; transform:translate(-8px,16px) rotate(8deg); }
        }

        .hero-blob-1 {
          position:absolute; width:58vw; height:58vw;
          max-width:720px; max-height:720px;
          top:-18%; right:-14%;
          background:#1B3A24;
          border-radius:65% 35% 58% 42% / 52% 46% 54% 48%;
          animation:morphBlob1 14s ease-in-out infinite;
          pointer-events:none; z-index:0;
        }
        .hero-blob-2 {
          position:absolute; width:26vw; height:26vw;
          max-width:340px; max-height:340px;
          bottom:-6%; left:-5%;
          background:#C8FF3A;
          border-radius:48% 52% 62% 38% / 56% 42% 58% 44%;
          animation:morphBlob2 18s ease-in-out infinite;
          pointer-events:none; z-index:0; opacity:0.22;
        }
        .hero-blob-3 {
          position:absolute; width:16vw; height:16vw;
          max-width:200px; max-height:200px;
          top:15%; left:44%;
          background:#E8C840;
          border-radius:55% 45% 48% 52% / 48% 56% 44% 52%;
          animation:morphBlob3 22s ease-in-out infinite;
          pointer-events:none; z-index:0; opacity:0.1;
        }

        /* ── Text entrance animations ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up-1 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .fade-up-2 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .fade-up-3 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .fade-up-4 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
        .fade-up-5 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both; }
        .fade-up-6 { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.8s both; }

        * { box-sizing:border-box; margin:0; padding:0; }
        body { overflow-x:hidden; }
        input::placeholder { color:rgba(27,58,36,0.32); }
        input:focus { outline:none; box-shadow:0 0 0 2px rgba(232,200,64,0.5); }

        .lift { transition:transform .25s ease, box-shadow .25s ease; }
        .lift:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(27,58,36,0.14); }

        /* Neon lime checks with good visibility */
        .chk-y { background:rgba(200,255,58,0.2); color:#C8FF3A; }
        .chk-n { background:rgba(253,244,238,0.07); color:rgba(253,244,238,0.22); }

        @media (max-width:700px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .hero-sachet { order:-1; }
          .hide-mob { display:none !important; }
          .compare-table { font-size:0.8rem !important; }
          .hero-blob-1 { width:90vw; height:90vw; top:-10%; right:-20%; }
          .hero-blob-2 { display:none; }
        }
      `}</style>

      <div style={{ fontFamily: FB, background: C.cream, color: C.ink, overflowX: "hidden" }}>

        {/* ── Announcement ───────────────────────────────────── */}
        <div style={{ background: C.deep, color: C.cream, overflow: "hidden", padding: "11px 0", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(200,255,58,0.06)", 18), pointerEvents: "none" }}/>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["THE WORLD'S FIRST READY-TO-POUR MATCHA LATTE CONCENTRATE", "POUR · SWIRL · GLOW", "3G MATCHA · MUSHROOM EXTRACTS · GRASS-FED COLLAGEN", "FIRST 500 GET 40% OFF", "FREE SHIPPING"].map((t, i) => (
                <span key={p * 100 + i} style={{ fontFamily: FM, fontSize: "0.72rem", letterSpacing: "0.22em", padding: "0 32px", color: C.cream, opacity: 0.8 }}>
                  {t}<span style={{ marginLeft: 32, color: C.jade, opacity: 0.7 }}>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Nav ────────────────────────────────────────────── */}
        <nav style={{ background: `rgba(253,244,238,0.96)`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${C.rule}`, padding: "0 5%", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <LogoMark size={28} color={C.matcha} />
            <span style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.6rem", color: C.ink, letterSpacing: "-0.02em", lineHeight: 1 }}>
              shroomé
            </span>
          </a>
          <div className="hide-mob" style={{ display: "flex", gap: 32 }}>
            {["Why shroomé", "Ingredients", "How it Works"].map(l => (
              <a key={l} href="#" style={{ fontFamily: FM, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: C.muted, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <button
            style={{ background: C.deep, color: C.cream, border: "none", padding: "11px 24px", fontFamily: FB, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.glow; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.deep; e.currentTarget.style.color = C.cream; }}
          >
            Get 40% Off →
          </button>
        </nav>

        {/* ── Hero — LIGHT + ANIMATED BLOBS ──────────────────── */}
        <section style={{ background: C.cream, minHeight: "93vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }} className="hero-grid">
          {/* animated organic blobs */}
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="hero-blob-3" />
          <div style={{ position: "absolute", inset: 0, ...grainStyle, opacity: 0.025, pointerEvents: "none", zIndex: 1 }}/>

          {/* left copy — staggered entrance */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 6% 80px 8%", position: "relative", zIndex: 2 }}>

            {/* Pre-launch badge — BIG as requested */}
            <div className="fade-up-1" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: C.glow, flexShrink: 0 }}/>
              <span style={{ fontFamily: FM, fontSize: "1rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.matcha, fontWeight: 600 }}>
                Pre-Launch · First 500 Get 40% Off
              </span>
            </div>

            <h1 className="fade-up-2" style={{ fontFamily: FD, fontSize: "clamp(52px, 6.5vw, 96px)", fontWeight: 400, lineHeight: 0.93, letterSpacing: "-0.03em", color: C.ink, marginBottom: 28 }}>
              Not a powder.<br />
              A pour.<br />
              <em style={{ fontStyle: "italic", color: C.glow }}>First.</em>
            </h1>

            <p className="fade-up-3" style={{ fontSize: "1.1rem", lineHeight: 1.75, color: C.muted, maxWidth: 400, marginBottom: 12 }}>
              The world&apos;s first liquid ceremonial matcha latte concentrate.
              3g matcha. 2g collagen. Real mushrooms.{" "}
              <strong style={{ color: C.ink, fontWeight: 700 }}>Nothing to mix. Nothing to measure.</strong>
            </p>
            <p className="fade-up-3" style={{ fontFamily: FM, fontSize: "0.9rem", letterSpacing: "0.1em", color: C.bright, marginBottom: 36 }}>
              Tear. Pour. Done.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {["3g Matcha", "Mushroom Extracts", "Collagen", "No Mixing"].map(p => (
                <span key={p} style={{ background: "rgba(200,255,58,0.12)", border: "1px solid rgba(200,255,58,0.3)", padding: "8px 16px", fontFamily: FM, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: C.matcha }}>{p}</span>
              ))}
            </div>

            <div className="fade-up-5">
              <EmailForm dark={false} />
            </div>
            <p className="fade-up-6" style={{ marginTop: 14, fontFamily: FM, fontSize: "0.72rem", letterSpacing: "0.06em", color: C.muted, opacity: 0.7 }}>
              No spam. 40% off code drops at launch.
            </p>
          </div>

          {/* right sachet — cream sachet on forest green blob */}
          <div className="hero-sachet fade-up-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "-8%", right: "-6%", pointerEvents: "none", userSelect: "none" as const }}>
              <LogoMark size={280} color="rgba(27,58,36,0.04)" />
            </div>
            <Sachet scale={1.25} />
            {/* floating stat cards */}
            <div style={{ position: "absolute", bottom: "18%", left: 16, background: "rgba(253,244,238,0.97)", padding: "14px 18px", backdropFilter: "blur(8px)", border: `1px solid ${C.rule}` }}>
              <p style={{ fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.muted, marginBottom: 2 }}>Per serving</p>
              <p style={{ fontFamily: FD, fontSize: "1.8rem", color: C.matcha, lineHeight: 1 }}>$3</p>
              <p style={{ fontSize: "0.8rem", color: C.muted, marginTop: 2 }}>vs. $9 at your café</p>
            </div>
            <div style={{ position: "absolute", top: "16%", right: 16, background: C.deep, padding: "14px 18px" }}>
              <p style={{ fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.jade, marginBottom: 2 }}>Steps</p>
              <p style={{ fontFamily: FD, fontSize: "1.8rem", color: C.cream, lineHeight: 1 }}>3</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(253,244,238,0.6)", marginTop: 2 }}>Pour. Swirl. Glow.</p>
            </div>
          </div>
        </section>

        {/* ── Ticker ─────────────────────────────────────────── */}
        <div style={{ background: C.glow, padding: "12px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["INVENTED NOT IMPROVED", "POUR", "SWIRL", "GLOW", "FIRST-EVER READY-TO-POUR", "12 SERVINGS", "$3 / SERVING", "CEREMONIAL GRADE", "FREE SHIPPING"].map((t, i) => (
                <span key={p * 100 + i} style={{ fontFamily: FB, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.ink, padding: "0 28px" }}>
                  {t}<span style={{ marginLeft: 28, color: "rgba(27,58,36,0.3)" }}>·</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Flavors / Products ──────────────────────────────── */}
        <section style={{ background: C.cream, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.rule} 1px, transparent 1px), linear-gradient(90deg, ${C.rule} 1px, transparent 1px)`, backgroundSize: "48px 48px", opacity: 0.5, pointerEvents: "none" }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontFamily: FM, fontSize: "0.78rem", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 12 }}>The Collection</p>
                <h2 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.0, letterSpacing: "-0.025em", color: C.ink }}>
                  Three ingredients.<br /><em style={{ color: C.glow }}>One pour.</em>
                </h2>
              </div>
              <p style={{ fontFamily: FB, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7, maxWidth: 340 }}>
                Two flavours at launch. Both with the same ceremonial grade matcha, organic mushroom extracts, and grass-fed collagen. Your morning, your way.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
              <FlavorCard name="Strawberry" desc="Strawberry Matcha Latte Concentrate" price="$29.99" gradient="linear-gradient(150deg, #FDE8E6 0%, #F0C4BE 55%, #E5A09A 100%)" accent={C.straw} badge="Best Seller" />
              <FlavorCard name="Vanilla" desc="Vanilla Matcha Latte Concentrate" price="$29.99" gradient="linear-gradient(150deg, #F7EFE4 0%, #EEE0CC 55%, #E0C9A4 100%)" accent={C.van} />
            </div>
          </div>
        </section>

        {/* ── Ingredients ─────────────────────────────────────── */}
        <section style={{ background: C.fog, padding: "96px 5%", borderTop: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontFamily: FM, fontSize: "0.78rem", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 14 }}>What&apos;s Inside 👀</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: C.ink }}>
                Three obsessions.<br /><em style={{ color: C.glow }}>One sachet.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 1, background: C.rule }}>
              {INGREDIENTS.map((card) => (
                <div key={card.title} className="lift" style={{ background: card.bg, padding: "48px 38px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(27,58,36,0.03)", 20), pointerEvents: "none" }}/>
                  <div style={{ position: "absolute", top: 22, right: 26, fontFamily: FM, fontSize: "0.7rem", color: C.muted, opacity: 0.5, letterSpacing: "0.12em" }}>{card.num}</div>
                  <div style={{ fontSize: "2.2rem", marginBottom: 18, position: "relative" }}>{card.emoji}</div>
                  <div style={{ display: "inline-block", padding: "5px 12px", background: "rgba(27,58,36,0.07)", marginBottom: 14, fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.12em", color: C.matcha, textTransform: "uppercase" as const }}>{card.badge}</div>
                  <h3 style={{ fontFamily: FD, fontSize: "1.35rem", color: C.ink, marginBottom: 14, lineHeight: 1.2, position: "relative" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.78, color: C.muted, marginBottom: 28, position: "relative" }}>{card.body}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: FD, fontSize: "2.75rem", color: C.matcha, lineHeight: 1 }}>{card.stat}</span>
                    <span style={{ fontFamily: FM, fontSize: "0.68rem", color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{card.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Invented. Not Improved. ─────────────────────────── */}
        <section style={{ background: C.deep, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(200,255,58,0.05)", 22), pointerEvents: "none" }}/>
          {/* subtle blob decoration on this section too */}
          <div style={{ position: "absolute", width: "40vw", height: "40vw", maxWidth: 520, maxHeight: 520, top: "-20%", right: "5%", background: "#2D5A35", borderRadius: "60% 40% 55% 45% / 50% 46% 54% 48%", pointerEvents: "none", opacity: 0.5 }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "56px 80px", alignItems: "start", position: "relative", zIndex: 1 }}>
            {/* left */}
            <div>
              <p style={{ fontFamily: FM, fontSize: "0.78rem", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.jade, marginBottom: 20 }}>A New Category</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.96, letterSpacing: "-0.03em", color: C.cream, marginBottom: 24 }}>
                Invented.<br /><em style={{ color: C.glow }}>Not improved.</em>
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(253,244,238,0.62)", marginBottom: 28, maxWidth: 400 }}>
                Matcha powders clump. Collagen sinks. Mushroom blends taste like dirt. We didn&apos;t try to fix any of that. We made a liquid concentrate that dissolves all three perfectly, every single time.
              </p>
              <div style={{ background: "rgba(232,200,64,0.07)", borderLeft: `3px solid ${C.glow}`, padding: "18px 22px", marginBottom: 28 }}>
                <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.15rem", color: C.glow, lineHeight: 1.45 }}>
                  &ldquo;Not a better powder. A new category.&rdquo;
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(200,255,58,0.1)" }}>
                {[["3g", "Matcha per serve"], ["2g", "Collagen peptides"], ["200mg", "Beta glucans"], ["~75mg", "Natural caffeine"]].map(([n, l]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.03)", padding: "18px 20px" }}>
                    <div style={{ fontFamily: FD, fontSize: "2rem", color: C.glow, lineHeight: 1, marginBottom: 4 }}>{n}</div>
                    <div style={{ fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(253,244,238,0.45)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — comparison table */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, marginBottom: 12 }}>
                <div/>
                {COMPARE_HEADS.map(h => (
                  <div key={h} style={{ fontFamily: FM, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "rgba(253,244,238,0.75)", textAlign: "center", padding: "0 2px", lineHeight: 1.3 }}>{h}</div>
                ))}
              </div>
              {COMPARE.map((row) => (
                <div key={row.brand} style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, padding: "14px 0", borderTop: `1px solid rgba(253,244,238,${row.us ? "0.12" : "0.05"})`, background: row.us ? "rgba(232,200,64,0.06)" : "transparent", alignItems: "center" }}>
                  <div style={{ fontFamily: FD, fontSize: row.us ? "1.15rem" : "0.95rem", color: row.us ? C.glow : "rgba(253,244,238,0.7)", fontStyle: row.us ? "italic" : "normal" }}>{row.brand}</div>
                  {row.checks.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }} className={c ? "chk-y" : "chk-n"}>{c ? "✓" : "✕"}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────── */}
        <section style={{ background: C.cream, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 24px, rgba(27,58,36,0.02) 24px, rgba(27,58,36,0.02) 25px)`, pointerEvents: "none" }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontFamily: FM, fontSize: "0.78rem", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 14 }}>It&apos;s literally 3 steps</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: C.ink }}>
                Pour. Swirl. <em style={{ color: C.glow }}>Glow.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 1, background: C.rule }}>
              {STEPS.map((step, idx) => (
                <div key={step.num} style={{ background: idx === 1 ? C.fog : C.cream, padding: "52px 42px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(27,58,36,0.035)", 18), pointerEvents: "none" }}/>
                  <div style={{ fontSize: "2.2rem", marginBottom: 18 }}>{step.emoji}</div>
                  <div style={{ fontFamily: FD, fontStyle: "italic", fontSize: "5rem", color: "rgba(27,58,36,0.06)", lineHeight: 1, marginBottom: 22 }}>{step.num}</div>
                  <h3 style={{ fontFamily: FD, fontSize: "2.5rem", fontWeight: 400, color: C.ink, marginBottom: 16, letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.78, color: C.muted }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────── */}
        <section style={{ background: C.fog, padding: "88px 5%", borderTop: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: FM, fontSize: "0.78rem", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 48, textAlign: "center" }}>Early testers are obsessed 🙌</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 1, background: C.rule }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{ background: t.accent, padding: "40px 36px" }}>
                  <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.62, color: C.ink, marginBottom: 28 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${C.matcha}, ${C.deep})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: "1rem", color: C.cream, flexShrink: 0 }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontFamily: FB, fontSize: "0.9rem", fontWeight: 700, color: C.ink }}>{t.name}</div>
                      <div style={{ fontFamily: FM, fontSize: "0.68rem", color: C.muted, letterSpacing: "0.06em" }}>{t.loc} · early tester</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────── */}
        <section style={{ background: C.deep, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(200,255,58,0.05)", 22), pointerEvents: "none" }}/>
          <div style={{ position: "absolute", inset: 0, ...grainStyle, opacity: 0.025, pointerEvents: "none" }}/>
          {/* decorative blob */}
          <div style={{ position: "absolute", width: "50vw", height: "50vw", maxWidth: 640, maxHeight: 640, bottom: "-25%", right: "-12%", background: "#2D5A35", borderRadius: "55% 45% 60% 40% / 48% 56% 44% 52%", pointerEvents: "none", opacity: 0.5 }}/>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <LogoMark size={56} color={C.jade} />
            </div>
            <p style={{ fontFamily: FM, fontSize: "0.82rem", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: C.jade, marginBottom: 20 }}>Join the Waitlist</p>
            <h2 style={{ fontFamily: FD, fontSize: "clamp(2.5rem, 5.5vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", color: C.cream, marginBottom: 16 }}>
              First 500 get <em style={{ color: C.glow }}>40% off.</em>
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.65, color: "rgba(253,244,238,0.55)", maxWidth: 380, margin: "0 auto 40px" }}>
              Drop your email. Your code lands in your inbox the moment we go live.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark={true} />
            </div>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" as const }}>
              {["No spam", "40% off launch price", "Ships free"].map(item => (
                <span key={item} style={{ fontFamily: FM, fontSize: "0.72rem", color: "rgba(253,244,238,0.38)", letterSpacing: "0.06em" }}>✓ {item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer style={{ background: "#122518", color: C.cream, padding: "36px 5%" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "14px 32px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LogoMark size={24} color={C.jade} />
              <span style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.45rem", color: C.cream }}>shroomé</span>
            </div>
            <div style={{ fontFamily: FM, fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(253,244,238,0.32)", textAlign: "center", textTransform: "uppercase" as const }}>The world&apos;s first ready-to-pour matcha latte concentrate. © 2026</div>
            <div style={{ fontFamily: FM, fontSize: "0.75rem", color: "rgba(253,244,238,0.42)", textAlign: "right" }}>hello@drinkshroome.com</div>
          </div>
        </footer>

      </div>
    </>
  );
}
