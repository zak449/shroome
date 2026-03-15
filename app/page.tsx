"use client";
import { useState } from "react";

// ── tokens ────────────────────────────────────────────────────────
const C = {
  cream:    "#F7F3EC",
  ink:      "#0D1208",
  matcha:   "#3A5C3C",
  deep:     "#1E3320",
  bright:   "#5A8F5C",
  jade:     "#7EC17F",
  glow:     "#E8D07A",   // golden CTA
  glowBr:   "#F0DE8C",
  straw:    "#C86B62",   // strawberry coral
  strawLt:  "#FAEAE8",
  van:      "#9B7B57",   // vanilla
  vanLt:    "#F5EDE0",
  fog:      "#EEEBE3",
  muted:    "#7A7A6A",
  rule:     "rgba(13,18,8,0.09)",
};
const FD = "'Instrument Serif', Georgia, serif";
const FB = "'Syne', system-ui, sans-serif";
const FM = "'Syne Mono', 'DM Mono', monospace";

// ── SVG textures ──────────────────────────────────────────────────
const dotBg = (color = "rgba(13,18,8,0.06)", size = 22) =>
  `radial-gradient(circle, ${color} 1px, transparent 1px)`;
const dotStyle = (color?: string, size = 22) => ({
  backgroundImage: dotBg(color, size),
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
    bg: "#EAF2E7",
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
  { brand: "Shroomé",     us: true,  checks: [true,  true,  true,  true,  true ] },
  { brand: "Clevr",       us: false, checks: [false, false, true,  true,  false] },
  { brand: "RYZE",        us: false, checks: [false, false, false, true,  false] },
  { brand: "MatchaKo",    us: false, checks: [false, true,  false, false, true ] },
  { brand: "Café latte",  us: false, checks: [false, true,  false, false, false] },
];
const COMPARE_HEADS = ["Ready-to-Pour", "Ceremonial", "Collagen", "Mushrooms", "Under $3"];

const STEPS = [
  { num: "01", emoji: "🌿", title: "Pour",  body: "Tear open. 3g of liquid ceremonial matcha concentrate lands in your cup. Zero measuring. Zero clumping. Zero thinking before coffee." },
  { num: "02", emoji: "🌀", title: "Swirl", body: "Pour over oat milk, almond, coconut — whatever you've got. Hot or iced. Watch the green swirl through white. That's the moment." },
  { num: "03", emoji: "✨", title: "Glow",  body: "Clean energy, focus locked in, collagen working while you drink. You literally just out-matched your café. For $3." },
];

const TESTIMONIALS = [
  { quote: "no but fr i cancelled my daily café order the first week. just did the math.", name: "Sofia M.", loc: "NYC", accent: "#EAF2E7" },
  { quote: "lion's mane + matcha is actually cheating for focus. brain feels different. not normal anymore.", name: "Kira J.", loc: "LA", accent: C.vanLt },
  { quote: "my skin has been doing THINGS since i started the collagen every morning. obsessed.", name: "Priya S.", loc: "Austin", accent: C.strawLt },
];

// ── Logo mark ─────────────────────────────────────────────────────
// Organic calligraphic S/mushroom mark — mirrors the brand logo
function LogoMark({ size = 40, color = "#4A7A50" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={Math.round(size * 1.4)} viewBox="0 0 94 132" fill="none" aria-hidden="true">
      <path
        d="M62 56C82 46 86 18 68 10C50 2 22 12 13 32C5 50 17 66 40 68C64 70 84 84 78 106C72 126 42 128 26 112"
        stroke={color}
        strokeWidth="13"
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
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: dark ? "rgba(232,208,122,0.15)" : C.fog, color: dark ? C.glow : C.matcha, fontFamily: FB, fontSize: "0.9rem", fontWeight: 700 }}>
      ✓ &nbsp;You&apos;re in — 40% off is locked.
    </div>
  );
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "stretch", maxWidth: 500 }}>
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
        style={{ flex: "1 1 220px", padding: "14px 20px", border: dark ? "1px solid rgba(247,243,236,0.2)" : `1px solid ${C.rule}`, background: dark ? "rgba(247,243,236,0.07)" : "#fff", color: dark ? C.cream : C.ink, fontFamily: FB, fontSize: "0.95rem", outline: "none", minWidth: 0 }} />
      <button type="submit" disabled={loading}
        style={{ padding: "14px 26px", border: "none", background: C.glow, color: C.ink, fontFamily: FM, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: loading ? "wait" : "pointer", whiteSpace: "nowrap" as const, opacity: loading ? 0.7 : 1 }}>
        {loading ? "Joining…" : "Claim 40% Off →"}
      </button>
    </form>
  );
}

// ── Sachet visual ─────────────────────────────────────────────────
function Sachet({ scale = 1 }: { scale?: number }) {
  const w = Math.round(240 * scale), h = Math.round(350 * scale);
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ position: "absolute", inset: -48, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(126,193,127,0.2) 0%, rgba(232,208,122,0.08) 50%, transparent 72%)", pointerEvents: "none" }} />
      <div className="sachet-float" style={{ filter: "drop-shadow(0 32px 56px rgba(13,18,8,0.35))" }}>
        <svg width={w} height={h} viewBox="0 0 240 350" fill="none">
          <defs>
            <linearGradient id="sG" x1="0" y1="0" x2="240" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#28432A"/><stop offset="60%" stopColor="#1E3320"/><stop offset="100%" stopColor="#152618"/>
            </linearGradient>
            <linearGradient id="sS" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(232,208,122,0)"/><stop offset="40%" stopColor="rgba(232,208,122,0.07)"/><stop offset="100%" stopColor="rgba(232,208,122,0)"/>
            </linearGradient>
            <clipPath id="sC"><rect x="14" y="14" width="212" height="322" rx="0"/></clipPath>
          </defs>
          {/* body — sharp corners */}
          <rect x="14" y="14" width="212" height="322" fill="url(#sG)"/>
          <rect x="14" y="14" width="212" height="322" fill="url(#sS)"/>
          {/* inner line */}
          <rect x="22" y="22" width="196" height="306" fill="none" stroke="rgba(232,208,122,0.12)" strokeWidth="1"/>
          {/* perforation */}
          {[70, 120, 170].map((x, i) => <circle key={i} cx={x} cy="23" r="2.5" fill={C.glow} opacity="0.4"/>)}
          {/* top rule */}
          <line x1="30" y1="52" x2="210" y2="52" stroke={C.glow} strokeWidth="0.75" opacity="0.4"/>
          {/* wordmark */}
          <text x="120" y="90" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="22" fill={C.cream} letterSpacing="2">Shroomé</text>
          <text x="120" y="107" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="6" fill={C.glow} opacity="0.6" letterSpacing="4">POUR · SWIRL · GLOW</text>
          {/* large circle motif */}
          <circle cx="120" cy="195" r="58" fill="none" stroke="rgba(232,208,122,0.09)" strokeWidth="1"/>
          <circle cx="120" cy="195" r="46" fill="none" stroke="rgba(247,243,236,0.06)" strokeWidth="0.5"/>
          {/* S logo mark on sachet */}
          <svg x="88" y="155" width="65" height="90" viewBox="0 0 94 132">
            <path
              d="M62 56C82 46 86 18 68 10C50 2 22 12 13 32C5 50 17 66 40 68C64 70 84 84 78 106C72 126 42 128 26 112"
              stroke="rgba(247,243,236,0.22)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          {/* decorative dots */}
          <circle cx="68"  cy="155" r="2" fill={C.glow} opacity="0.3"/>
          <circle cx="172" cy="235" r="1.5" fill={C.jade} opacity="0.35"/>
          <circle cx="58"  cy="238" r="1.5" fill={C.cream} opacity="0.2"/>
          {/* bottom band */}
          <rect x="14" y="276" width="212" height="60" fill="rgba(232,208,122,0.04)" clipPath="url(#sC)"/>
          <line x1="30" y1="278" x2="210" y2="278" stroke={C.glow} strokeWidth="0.5" opacity="0.3"/>
          <text x="120" y="298" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5.5" fill={C.cream} opacity="0.55" letterSpacing="2.5">ORGANIC CEREMONIAL MATCHA</text>
          <text x="120" y="312" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5.5" fill={C.cream} opacity="0.55" letterSpacing="2.5">ORGANIC MUSHROOM EXTRACTS</text>
          <text x="120" y="326" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5.5" fill={C.cream} opacity="0.55" letterSpacing="2.5">GRASS-FED COLLAGEN</text>
          {/* dose badge */}
          <rect x="98" y="248" width="44" height="16" fill="none" stroke={C.glow} strokeWidth="0.75" opacity="0.7"/>
          <text x="120" y="260" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="6.5" fill={C.glow} letterSpacing="1.5">3g DOSE</text>
        </svg>
      </div>
    </div>
  );
}

// ── Flavor card ───────────────────────────────────────────────────
function FlavorCard({ name, desc, price, gradient, accent, badge }: { name: string; desc: string; price: string; gradient: string; accent: string; badge?: string }) {
  return (
    <div className="lift" style={{ background: C.cream, border: `1px solid ${C.rule}`, overflow: "hidden", cursor: "pointer" }}>
      {/* image area */}
      <div style={{ position: "relative", height: 260, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* dot overlay */}
        <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(255,255,255,0.18)", 14), opacity: 0.6, pointerEvents: "none" }} />
        {badge && (
          <div style={{ position: "absolute", top: 12, left: 12, background: C.glow, color: C.ink, fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, padding: "4px 10px" }}>{badge}</div>
        )}
        {/* Placeholder sachet in card */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <svg width="120" height="175" viewBox="0 0 120 175" fill="none">
            <defs>
              <linearGradient id={`cG_${name}`} x1="0" y1="0" x2="120" y2="175" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#28432A"/><stop offset="100%" stopColor="#152618"/>
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="108" height="163" fill={`url(#cG_${name})`} style={{ filter: "drop-shadow(0 12px 28px rgba(13,18,8,0.3))" }}/>
            <rect x="10" y="10" width="100" height="155" fill="none" stroke={`rgba(232,208,122,0.2)`} strokeWidth="0.75"/>
            <text x="60" y="48" textAnchor="middle" fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="11" fill="#F7F3EC" letterSpacing="1">Shroomé</text>
            <text x="60" y="61" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="4" fill="#E8D07A" opacity="0.6" letterSpacing="2.5">POUR·SWIRL·GLOW</text>
            <circle cx="60" cy="100" r="28" fill="none" stroke="rgba(232,208,122,0.1)" strokeWidth="0.75"/>
            {/* S logo mark on mini sachet */}
            <svg x="36" y="74" width="48" height="52" viewBox="0 0 94 132">
              <path
                d="M62 56C82 46 86 18 68 10C50 2 22 12 13 32C5 50 17 66 40 68C64 70 84 84 78 106C72 126 42 128 26 112"
                stroke="rgba(247,243,236,0.22)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <text x="60" y="138" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="5" fill={accent} letterSpacing="1">{name.toUpperCase()}</text>
            <rect x="44" y="148" width="32" height="10" fill="none" stroke={C.glow} strokeWidth="0.5" opacity="0.6"/>
            <text x="60" y="156" textAnchor="middle" fontFamily="Syne Mono, monospace" fontSize="4.5" fill={C.glow} letterSpacing="1">3g DOSE</text>
          </svg>
        </div>
      </div>
      {/* body */}
      <div style={{ padding: "20px 22px 24px" }}>
        <p style={{ fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: accent, marginBottom: 6 }}>{name}</p>
        <p style={{ fontFamily: FD, fontSize: "1.25rem", color: C.ink, marginBottom: 8, lineHeight: 1.2 }}>{desc}</p>
        <p style={{ fontFamily: FB, fontSize: "1.1rem", fontWeight: 700, color: C.ink, marginBottom: 16 }}>{price} <span style={{ fontFamily: FM, fontSize: "0.65rem", color: C.muted, fontWeight: 400 }}>/ 12 servings</span></p>
        <button style={{ width: "100%", padding: "11px", background: C.deep, color: C.cream, border: "none", fontFamily: FM, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, cursor: "pointer" }}>
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
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-track { display:flex; white-space:nowrap; animation:marquee 28s linear infinite; width:max-content; }
        .marquee-track:hover { animation-play-state:paused; }

        @keyframes sachet-float {
          0%   { transform:translateY(0px) rotate(-2deg); }
          50%  { transform:translateY(-18px) rotate(1.5deg); }
          100% { transform:translateY(0px) rotate(-2deg); }
        }
        .sachet-float { animation:sachet-float 6s ease-in-out infinite; }

        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }
        .pulse-dot { animation:pulse 2.2s ease-in-out infinite; }

        * { box-sizing:border-box; margin:0; padding:0; }
        body { overflow-x:hidden; }
        input::placeholder { color:rgba(13,18,8,0.3); }
        input:focus { outline:none; box-shadow:0 0 0 2px rgba(232,208,122,0.5); }

        .lift { transition:transform .25s ease, box-shadow .25s ease; }
        .lift:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(13,18,8,0.14); }

        .chk-y { background:rgba(126,193,127,0.15); color:#4A9B4C; }
        .chk-n { background:rgba(13,18,8,0.06); color:rgba(13,18,8,0.2); }

        @media (max-width:700px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .hero-sachet { order:-1; }
          .hide-mob { display:none !important; }
          .compare-table { font-size:0.75rem !important; }
        }
      `}</style>

      <div style={{ fontFamily: FB, background: C.cream, color: C.ink, overflowX: "hidden" }}>

        {/* ── Announcement ───────────────────────────────────── */}
        <div style={{ background: C.deep, color: C.cream, overflow: "hidden", padding: "10px 0", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(126,193,127,0.07)", 18), pointerEvents: "none" }}/>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["THE WORLD'S FIRST READY-TO-POUR MATCHA LATTE CONCENTRATE", "POUR · SWIRL · GLOW", "3G MATCHA · MUSHROOM EXTRACTS · GRASS-FED COLLAGEN", "FIRST 500 GET 40% OFF", "FREE SHIPPING"].map((t, i) => (
                <span key={p * 100 + i} style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.22em", padding: "0 32px", color: C.cream, opacity: 0.7 }}>
                  {t}<span style={{ marginLeft: 32, color: C.glow, opacity: 0.6 }}>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Nav ────────────────────────────────────────────── */}
        <nav style={{ background: `rgba(247,243,236,0.95)`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${C.rule}`, padding: "0 5%", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <LogoMark size={26} color={C.matcha} />
            <span style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.5rem", color: C.deep, letterSpacing: "-0.02em", lineHeight: 1 }}>
              Shroomé
            </span>
          </a>
          <div className="hide-mob" style={{ display: "flex", gap: 28 }}>
            {["Why Shroomé", "Ingredients", "How it Works"].map(l => (
              <a key={l} href="#" style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.muted, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <button
            style={{ background: C.deep, color: C.cream, border: "none", padding: "10px 22px", fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.glow) && (e.currentTarget.style.color = C.ink)}
            onMouseLeave={e => (e.currentTarget.style.background = C.deep) && (e.currentTarget.style.color = C.cream)}
          >
            Get 40% Off →
          </button>
        </nav>

        {/* ── Hero — DARK ────────────────────────────────────── */}
        <section style={{ background: C.deep, minHeight: "92vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden" }} className="hero-grid">
          {/* grain + glow */}
          <div style={{ position: "absolute", inset: 0, ...grainStyle, opacity: 0.04, pointerEvents: "none" }}/>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 20% 80%, rgba(126,193,127,0.09) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(232,208,122,0.07) 0%, transparent 50%)`, pointerEvents: "none" }}/>

          {/* left copy */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 6% 80px 8%", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
              <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: C.glow }}/>
              <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.jade }}>
                Pre-Launch · First 500 Get 40% Off
              </span>
            </div>

            <h1 style={{ fontFamily: FD, fontSize: "clamp(52px, 6.5vw, 94px)", fontWeight: 400, lineHeight: 0.94, letterSpacing: "-0.03em", color: C.cream, marginBottom: 28 }}>
              Not a powder.<br />
              A pour.<br />
              <em style={{ fontStyle: "italic", color: C.glow }}>First.</em>
            </h1>

            <p style={{ fontSize: "1rem", lineHeight: 1.78, color: "rgba(247,243,236,0.68)", maxWidth: 400, marginBottom: 14 }}>
              The world&apos;s first liquid ceremonial matcha latte concentrate.
              3g matcha. 2g collagen. Real mushrooms.{" "}
              <strong style={{ color: C.glow, fontWeight: 600 }}>Nothing to mix. Nothing to measure.</strong>
            </p>
            <p style={{ fontFamily: FM, fontSize: "0.72rem", letterSpacing: "0.1em", color: C.jade, marginBottom: 36 }}>
              Just tear and pour. 60 seconds.
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {["3g Matcha", "Mushroom Extracts", "Collagen", "No Mixing"].map(p => (
                <span key={p} style={{ background: "rgba(126,193,127,0.12)", border: "1px solid rgba(126,193,127,0.25)", padding: "7px 14px", fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.jade }}>{p}</span>
              ))}
            </div>

            <EmailForm dark={true} />
            <p style={{ marginTop: 14, fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.06em", color: "rgba(247,243,236,0.3)" }}>
              No spam. 40% off code drops at launch.
            </p>
          </div>

          {/* right sachet */}
          <div className="hero-sachet" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, overflow: "hidden" }}>
            {/* big logo watermark */}
            <div style={{ position: "absolute", bottom: "-8%", right: "-6%", pointerEvents: "none", userSelect: "none" as const }}>
              <LogoMark size={260} color="rgba(247,243,236,0.045)" />
            </div>
            <Sachet scale={1.25} />
            {/* floating stat cards */}
            <div style={{ position: "absolute", bottom: "18%", left: 16, background: "rgba(247,243,236,0.96)", padding: "12px 16px", backdropFilter: "blur(8px)" }}>
              <p style={{ fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.muted, marginBottom: 2 }}>Per serving</p>
              <p style={{ fontFamily: FD, fontSize: "1.6rem", color: C.matcha, lineHeight: 1 }}>$3</p>
              <p style={{ fontSize: "0.7rem", color: C.muted, marginTop: 2 }}>vs. $9 at your café</p>
            </div>
            <div style={{ position: "absolute", top: "16%", right: 16, background: C.deep, padding: "12px 16px", border: "none" }}>
              <p style={{ fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.jade, marginBottom: 2 }}>Ready in</p>
              <p style={{ fontFamily: FD, fontSize: "1.6rem", color: C.cream, lineHeight: 1 }}>60s</p>
              <p style={{ fontSize: "0.7rem", color: "rgba(247,243,236,0.55)", marginTop: 2 }}>Just tear & pour</p>
            </div>
          </div>
        </section>

        {/* ── Golden ticker ───────────────────────────────────── */}
        <div style={{ background: C.glow, padding: "11px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, p) =>
              ["INVENTED NOT IMPROVED", "POUR", "SWIRL", "GLOW", "FIRST-EVER READY-TO-POUR", "12 SERVINGS", "$3 / SERVING", "CEREMONIAL GRADE", "FREE SHIPPING"].map((t, i) => (
                <span key={p * 100 + i} style={{ fontFamily: FB, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.ink, padding: "0 24px" }}>
                  {t}<span style={{ marginLeft: 24, color: "rgba(13,18,8,0.3)" }}>·</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Flavors / Products ──────────────────────────────── */}
        <section style={{ background: C.cream, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.rule} 1px, transparent 1px), linear-gradient(90deg, ${C.rule} 1px, transparent 1px)`, backgroundSize: "48px 48px", opacity: 0.5, pointerEvents: "none" }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 12 }}>The Collection</p>
                <h2 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.0, letterSpacing: "-0.025em", color: C.ink }}>
                  Three ingredients.<br /><em style={{ color: C.matcha }}>One pour.</em>
                </h2>
              </div>
              <p style={{ fontFamily: FB, fontSize: "0.85rem", color: C.muted, lineHeight: 1.7, maxWidth: 340 }}>
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
              <p style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 14 }}>What&apos;s Inside 👀</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: C.ink }}>
                Three obsessions.<br /><em style={{ color: C.matcha }}>One sachet.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 1, background: C.rule }}>
              {INGREDIENTS.map((card) => (
                <div key={card.title} className="lift" style={{ background: card.bg, padding: "44px 36px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(13,18,8,0.035)", 20), pointerEvents: "none" }}/>
                  <div style={{ position: "absolute", top: 20, right: 24, fontFamily: FM, fontSize: "0.6rem", color: C.muted, opacity: 0.4, letterSpacing: "0.12em" }}>{card.num}</div>
                  <div style={{ fontSize: "2rem", marginBottom: 16, position: "relative" }}>{card.emoji}</div>
                  <div style={{ display: "inline-block", padding: "4px 10px", background: "rgba(13,18,8,0.07)", marginBottom: 12, fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.12em", color: C.matcha, textTransform: "uppercase" as const }}>{card.badge}</div>
                  <h3 style={{ fontFamily: FD, fontSize: "1.25rem", color: C.ink, marginBottom: 12, lineHeight: 1.2, position: "relative" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: C.muted, marginBottom: 24, position: "relative" }}>{card.body}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: FD, fontSize: "2.5rem", color: C.matcha, lineHeight: 1 }}>{card.stat}</span>
                    <span style={{ fontFamily: FM, fontSize: "0.6rem", color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{card.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Invented. Not Improved. ─────────────────────────── */}
        <section style={{ background: C.ink, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(126,193,127,0.07)", 22), pointerEvents: "none" }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "56px 80px", alignItems: "start", position: "relative", zIndex: 1 }}>
            {/* left */}
            <div>
              <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.jade, marginBottom: 20 }}>A New Category</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.96, letterSpacing: "-0.03em", color: C.cream, marginBottom: 24 }}>
                Invented.<br /><em style={{ color: C.glow }}>Not improved.</em>
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(247,243,236,0.6)", marginBottom: 28, maxWidth: 400 }}>
                Matcha powders clump. Collagen sinks. Mushroom blends taste like dirt. We didn&apos;t try to fix any of that. We made a liquid concentrate that dissolves all three perfectly, every single time.
              </p>
              <div style={{ background: "rgba(232,208,122,0.07)", borderLeft: `3px solid ${C.glow}`, padding: "16px 20px", marginBottom: 28 }}>
                <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.1rem", color: C.glow, lineHeight: 1.45 }}>
                  &ldquo;Not a better powder. A new category.&rdquo;
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(126,193,127,0.1)" }}>
                {[["3g", "Matcha per serve"], ["2g", "Collagen peptides"], ["200mg", "Beta glucans"], ["~75mg", "Natural caffeine"]].map(([n, l]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.03)", padding: "16px 18px" }}>
                    <div style={{ fontFamily: FD, fontSize: "1.8rem", color: C.glow, lineHeight: 1, marginBottom: 3 }}>{n}</div>
                    <div style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(247,243,236,0.45)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — comparison table */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, marginBottom: 6, paddingRight: 0 }}>
                <div/>
                {COMPARE_HEADS.map(h => (
                  <div key={h} style={{ fontFamily: FM, fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(247,243,236,0.35)", textAlign: "center", padding: "0 2px" }}>{h}</div>
                ))}
              </div>
              {COMPARE.map((row) => (
                <div key={row.brand} style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 0, padding: "13px 0", borderTop: `1px solid rgba(247,243,236,${row.us ? "0.12" : "0.05"})`, background: row.us ? "rgba(232,208,122,0.05)" : "transparent", alignItems: "center" }}>
                  <div style={{ fontFamily: FD, fontSize: row.us ? "1.1rem" : "0.9rem", color: row.us ? C.glow : "rgba(247,243,236,0.7)", fontStyle: row.us ? "italic" : "normal" }}>{row.brand}</div>
                  {row.checks.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", ...(c ? { background: "rgba(126,193,127,0.15)", color: C.jade } : { background: "rgba(247,243,236,0.05)", color: "rgba(247,243,236,0.2)" }) }}>{c ? "✓" : "✕"}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────── */}
        <section style={{ background: C.cream, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 24px, rgba(13,18,8,0.02) 24px, rgba(13,18,8,0.02) 25px)`, pointerEvents: "none" }}/>
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 14 }}>It&apos;s literally 3 steps</p>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: C.ink }}>
                Pour. Swirl. <em style={{ color: C.matcha }}>Glow.</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 1, background: C.rule }}>
              {STEPS.map((step, idx) => (
                <div key={step.num} style={{ background: idx === 1 ? C.fog : C.cream, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(13,18,8,0.04)", 18), pointerEvents: "none" }}/>
                  <div style={{ fontSize: "2rem", marginBottom: 16 }}>{step.emoji}</div>
                  <div style={{ fontFamily: FD, fontStyle: "italic", fontSize: "4.5rem", color: "rgba(13,18,8,0.07)", lineHeight: 1, marginBottom: 20 }}>{step.num}</div>
                  <h3 style={{ fontFamily: FD, fontSize: "2.25rem", fontWeight: 400, color: C.ink, marginBottom: 14, letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.78, color: C.muted }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────── */}
        <section style={{ background: C.fog, padding: "88px 5%", borderTop: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.bright, marginBottom: 48, textAlign: "center" }}>Early testers are obsessed 🙌</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 1, background: C.rule }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{ background: t.accent, padding: "36px 32px" }}>
                  <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.62, color: C.ink, marginBottom: 24 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${C.matcha}, ${C.deep})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: "0.9rem", color: C.cream }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontFamily: FB, fontSize: "0.82rem", fontWeight: 700, color: C.ink }}>{t.name}</div>
                      <div style={{ fontFamily: FM, fontSize: "0.6rem", color: C.muted, letterSpacing: "0.06em" }}>{t.loc} · early tester</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────── */}
        <section style={{ background: C.deep, padding: "96px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...dotStyle("rgba(126,193,127,0.06)", 22), pointerEvents: "none" }}/>
          <div style={{ position: "absolute", inset: 0, ...grainStyle, opacity: 0.035, pointerEvents: "none" }}/>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <LogoMark size={52} color={C.jade} />
            </div>
            <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: C.jade, opacity: 0.7, marginBottom: 20 }}>Join the Waitlist</p>
            <h2 style={{ fontFamily: FD, fontSize: "clamp(2.5rem, 5.5vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", color: C.cream, marginBottom: 16 }}>
              First 500 get <em style={{ color: C.glow }}>40% off.</em>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "rgba(247,243,236,0.55)", marginBottom: 40, maxWidth: 380, margin: "0 auto 40px" }}>
              Drop your email. Your code lands in your inbox the moment we go live.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark={true} />
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" as const }}>
              {["No spam", "40% off launch price", "Ships free"].map(item => (
                <span key={item} style={{ fontFamily: FM, fontSize: "0.6rem", color: "rgba(247,243,236,0.35)", letterSpacing: "0.06em" }}>✓ {item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer style={{ background: "#070D07", color: C.cream, padding: "32px 5%" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "12px 32px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LogoMark size={22} color={C.jade} />
              <span style={{ fontFamily: FD, fontStyle: "italic", fontSize: "1.35rem", color: C.cream }}>Shroomé</span>
            </div>
            <div style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(247,243,236,0.28)", textAlign: "center", textTransform: "uppercase" as const }}>The world&apos;s first ready-to-pour matcha latte concentrate. © 2026</div>
            <div style={{ fontFamily: FM, fontSize: "0.68rem", color: "rgba(247,243,236,0.38)", textAlign: "right" }}>hello@drinkshroome.com</div>
          </div>
        </footer>

      </div>
    </>
  );
}
