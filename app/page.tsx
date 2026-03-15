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
  { icon: "✦", title: "Ceremonial Matcha",   body: "First-harvest, shade-grown. The stuff cafés charge $9 for." },
  { icon: "◎", title: "Lion's Mane + Chaga", body: "Clinically-backed beta glucans for focus, immunity, and your morning biology." },
  { icon: "❋", title: "Grass-Fed Collagen",  body: "Pre-dissolved. Skin elasticity, joint health, and your glow — already in the sachet." },
];

const BENEFITS = [
  { icon: "⚡", title: "No crash. No jitters.",  body: "Matcha's L-theanine + caffeine delivers smooth, focused energy that lasts hours — not minutes." },
  { icon: "🧠", title: "Sharpened focus",         body: "Lion's Mane supports cognitive clarity. Think clearer, create better, stay present." },
  { icon: "🍵", title: "Ceremonial grade only",   body: "First-harvest, shade-grown. The same quality you'd pay $9 for at a café." },
  { icon: "✦",  title: "3g precision dose",       body: "Perfectly measured every time. No clumping, no mess, no thinking." },
  { icon: "🌿", title: "Works with any milk",     body: "Oat. Almond. Coconut. Hot or iced. Your latte, your rules." },
  { icon: "❋",  title: "Beauty from within",      body: "Collagen + beta glucans every morning. Your glow is in the sachet." },
];

const STEPS = [
  { num: "01", title: "Pour",  body: "Tear open your sachet. 3g of ceremonial matcha + functional mushroom blend. Zero measuring. Zero thinking." },
  { num: "02", title: "Swirl", body: "Over oat milk, almond milk, coconut — whatever's yours. Hot or iced. The green swirling through white is the moment." },
  { num: "03", title: "Glow",  body: "Clean energy rises. Focus sets in. Collagen works. This is your café. It doesn't close." },
];

// ── Sachet Visual ─────────────────────────────────────────────────
function SachetVisual({ scale = 1 }: { scale?: number }) {
  const w = Math.round(280 * scale);
  const h = Math.round(390 * scale);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
      <div style={{ position: "relative", width: w + 80, height: h + 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: -40, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(61,90,62,0.22) 0%, rgba(42,61,43,0.10) 50%, transparent 75%)", pointerEvents: "none" }} />
        <div className="sachet-float" style={{ position: "relative" }}>
          <svg width={w} height={h} viewBox="0 0 280 390" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sachetBodyGrad" x1="0" y1="0" x2="280" y2="390" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#2A3D2B" />
                <stop offset="100%" stopColor="#1E2E1F" />
              </linearGradient>
              <linearGradient id="sachetSheen" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(245,240,232,0)" />
                <stop offset="40%"  stopColor="rgba(245,240,232,0.07)" />
                <stop offset="60%"  stopColor="rgba(245,240,232,0.03)" />
                <stop offset="100%" stopColor="rgba(245,240,232,0)" />
              </linearGradient>
              <clipPath id="sachetClip">
                <rect x="20" y="20" width="240" height="350" rx="14" />
              </clipPath>
            </defs>
            <rect x="20" y="20" width="240" height="350" rx="14" fill="url(#sachetBodyGrad)" />
            <rect x="20" y="20" width="240" height="350" rx="14" fill="url(#sachetSheen)" />
            <rect x="28" y="28" width="224" height="334" rx="10" fill="none" stroke="rgba(245,240,232,0.08)" strokeWidth="1" />
            {[90, 140, 190].map((x, i) => (
              <circle key={i} cx={x} cy="30" r="3" fill="#EDE0CC" opacity="0.5" />
            ))}
            <line x1="40" y1="62" x2="240" y2="62" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.6" />
            <text x="140" y="105" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="26" fill="#F5F0E8" letterSpacing="3">SHROOMÉ</text>
            <text x="140" y="126" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#F5F0E8" opacity="0.5" letterSpacing="3">POUR · SWIRL · GLOW</text>
            <circle cx="140" cy="215" r="62" fill="none" stroke="rgba(245,240,232,0.09)" strokeWidth="1" />
            <circle cx="140" cy="215" r="52" fill="none" stroke="rgba(232,196,176,0.12)" strokeWidth="0.5" />
            <ellipse cx="140" cy="200" rx="28" ry="14" fill="rgba(245,240,232,0.14)" stroke="rgba(245,240,232,0.2)" strokeWidth="0.75" />
            <rect x="135" y="214" width="10" height="20" rx="5" fill="rgba(245,240,232,0.10)" stroke="rgba(245,240,232,0.16)" strokeWidth="0.75" />
            {[-12, -6, 0, 6, 12].map((offset, i) => (
              <line key={i} x1={140 + offset} y1="213" x2={140 + offset * 0.7} y2="207" stroke="rgba(245,240,232,0.12)" strokeWidth="0.75" />
            ))}
            <text x="60"  y="170" fontSize="8" fill="#E8C4B0" opacity="0.5">✦</text>
            <text x="204" y="258" fontSize="6" fill="#E8C4B0" opacity="0.4">✦</text>
            <text x="74"  y="262" fontSize="5" fill="#F5F0E8" opacity="0.2">◎</text>
            <rect x="20" y="300" width="240" height="70" fill="rgba(245,240,232,0.05)" clipPath="url(#sachetClip)" />
            <text x="140" y="324" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6.5" fill="#F5F0E8" opacity="0.6" letterSpacing="2">CEREMONIAL MATCHA</text>
            <text x="140" y="338" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6.5" fill="#F5F0E8" opacity="0.6" letterSpacing="2">LION&apos;S MANE · CHAGA</text>
            <text x="140" y="352" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="6.5" fill="#F5F0E8" opacity="0.6" letterSpacing="2">GRASS-FED COLLAGEN</text>
            <line x1="40" y1="365" x2="240" y2="365" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.4" />
            <rect x="116" y="274" width="48" height="18" rx="9" fill="rgba(232,196,176,0.15)" stroke="#E8C4B0" strokeWidth="0.75" opacity="0.8" />
            <text x="140" y="287" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#E8C4B0" letterSpacing="1.5">3g DOSE</text>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 999, background: dark ? "rgba(245,240,232,0.12)" : C.champagneMycelium, color: dark ? C.oatCream : C.forestFloor, fontFamily: "DM Mono, monospace", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
        ✓ You&apos;re on the list!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", maxWidth: 480 }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{ flex: "1 1 220px", padding: "14px 20px", borderRadius: 999, border: dark ? "1px solid rgba(245,240,232,0.3)" : `1px solid ${C.forestFloor}`, background: dark ? "rgba(245,240,232,0.07)" : "#fff", color: dark ? C.oatCream : C.forestFloor, fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.95rem", outline: "none", minWidth: 0 }}
      />
      <button
        type="submit"
        style={{ padding: "14px 28px", borderRadius: 999, border: "none", background: C.sporeBlush, color: C.forestFloor, fontFamily: "DM Mono, monospace", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}
      >
        CLAIM 40% OFF →
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; white-space: nowrap; animation: marquee 22s linear infinite; width: max-content; }
        .marquee-track:hover { animation-play-state: paused; }
        * { box-sizing: border-box; }
        body { overflow-x: hidden; }
      `}</style>

      <div style={{ fontFamily: "DM Sans, system-ui, sans-serif", background: C.oatCream, color: C.forestFloor, overflowX: "hidden" }}>

        {/* Announcement bar */}
        <div style={{ background: C.forestFloor, color: C.oatCream, textAlign: "center", padding: "10px 16px", fontFamily: "DM Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          PRE-LAUNCH · FIRST 500 GET 40% OFF · SHIPS FREE
        </div>

        {/* Nav */}
        <nav style={{ background: C.oatCream, borderBottom: "1px solid rgba(42,61,43,0.1)", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.5rem", color: C.forestFloor, letterSpacing: "0.02em" }}>Shroomé</span>
          <button style={{ padding: "10px 24px", borderRadius: 999, border: "none", background: C.forestFloor, color: C.oatCream, fontFamily: "DM Mono, monospace", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
            GET 40% OFF →
          </button>
        </nav>

        {/* Hero */}
        <section style={{ background: C.oatCream, padding: "80px 40px 72px", maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "48px 64px", alignItems: "center" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 24 }}>
              Ceremonial Matcha · Pre-Launch
            </p>
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(3.4rem, 8vw, 7.5rem)", fontWeight: 700, lineHeight: 1.04, color: C.forestFloor, margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
              The ritual<br />is ready.
            </h1>
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(3.4rem, 8vw, 7.5rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.04, color: C.ceremonyMatcha, margin: "0 0 32px 0", letterSpacing: "-0.02em" }}>
              Just pour.
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.65, color: C.forestFloor, opacity: 0.75, marginBottom: 36, maxWidth: 440 }}>
              3g ceremonial matcha + functional mushrooms. Pour over oat milk. Feel the shift in 60 seconds.
            </p>
            <EmailForm dark={false} />
            <p style={{ marginTop: 14, fontFamily: "DM Mono, monospace", fontSize: "0.68rem", color: C.forestFloor, opacity: 0.45, letterSpacing: "0.06em" }}>
              No spam. Your discount code arrives at launch.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SachetVisual scale={1.1} />
          </div>
        </section>

        {/* Marquee strip */}
        <div style={{ background: C.champagneMycelium, borderTop: "1px solid rgba(42,61,43,0.08)", borderBottom: "1px solid rgba(42,61,43,0.08)", overflow: "hidden", padding: "14px 0" }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, pass) =>
              ["POUR", "SWIRL", "GLOW", "CEREMONIAL MATCHA", "GRASS-FED COLLAGEN", "MUSHROOM BETA GLUCANS", "POUR", "SWIRL"].map((item, i) => (
                <span key={pass * 100 + i} style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.forestFloor, padding: "0 28px", opacity: 0.7 }}>
                  {item}<span style={{ marginLeft: 28, opacity: 0.4 }}>·</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* The Stack */}
        <section style={{ background: C.oatCream, padding: "96px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 18, textAlign: "center" }}>What&apos;s Inside</p>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, color: C.forestFloor, textAlign: "center", marginBottom: 56, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              Three products you already buy.<br />
              <em style={{ fontWeight: 400, color: C.ceremonyMatcha }}>One sachet.</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 20 }}>
              {STACK.map((card) => (
                <div key={card.title} style={{ background: C.champagneMycelium, borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(42,61,43,0.08)" }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: 20, color: C.ceremonyMatcha }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: C.forestFloor, marginBottom: 12, letterSpacing: "-0.01em" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: C.forestFloor, opacity: 0.7 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark anchor — Effortless is the luxury */}
        <section style={{ background: C.forestFloor, padding: "96px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 6rem)", fontWeight: 700, color: C.oatCream, lineHeight: 1.08, marginBottom: 64, letterSpacing: "-0.02em" }}>
              Effortless<br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>is the luxury.</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16, marginBottom: 56 }}>
              {[
                { stat: "3g",  label: "Precision dose, every time" },
                { stat: "60s", label: "Tear. Pour. Done." },
                { stat: "$9",  label: "What cafés charge. What you save." },
              ].map((tile) => (
                <div key={tile.stat} style={{ background: "rgba(245,240,232,0.08)", border: "1px solid rgba(245,240,232,0.12)", borderRadius: 16, padding: "36px 28px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "3.5rem", fontWeight: 700, color: C.oatCream, lineHeight: 1, marginBottom: 10 }}>{tile.stat}</div>
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.oatCream, opacity: 0.55, lineHeight: 1.5 }}>{tile.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.oatCream, opacity: 0.45 }}>
              THE RITUAL IS READY. JUST POUR.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section style={{ background: C.oatCream, padding: "96px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 18 }}>Why Shroomé</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "32px 64px", alignItems: "start", marginBottom: 64 }}>
              <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, color: C.forestFloor, lineHeight: 1.15, letterSpacing: "-0.01em", margin: 0 }}>
                Clean energy.<br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: C.ceremonyMatcha }}>Beautiful mornings.</em>
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: C.forestFloor, opacity: 0.7, maxWidth: 440, paddingTop: 6, margin: 0 }}>
                Shroomé is the latte you already want — with everything you&apos;d have to buy separately already inside. Ceremonial matcha, Lion&apos;s Mane, Chaga, and grass-fed collagen. One tear. One pour.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
              {BENEFITS.map((b) => (
                <div key={b.title} style={{ padding: "32px 28px", borderRadius: 16, background: C.champagneMycelium, border: "1px solid rgba(42,61,43,0.07)" }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 14 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: C.forestFloor, marginBottom: 8, letterSpacing: "-0.01em" }}>{b.title}</h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: C.forestFloor, opacity: 0.65 }}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — Pour / Swirl / Glow */}
        <section style={{ background: C.champagneMycelium, padding: "96px 40px", borderTop: "1px solid rgba(42,61,43,0.08)", borderBottom: "1px solid rgba(42,61,43,0.08)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.ceremonyMatcha, marginBottom: 18, textAlign: "center" }}>The Ritual</p>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: C.forestFloor, textAlign: "center", marginBottom: 64, letterSpacing: "-0.01em" }}>
              Three steps.{" "}
              <em style={{ fontWeight: 400, color: C.ceremonyMatcha }}>One perfect morning.</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "32px 48px" }}>
              {STEPS.map((step) => (
                <div key={step.num}>
                  <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic", fontSize: "4.5rem", fontWeight: 400, color: C.ceremonyMatcha, lineHeight: 1, marginBottom: 20, opacity: 0.75 }}>
                    {step.num}
                  </div>
                  <div style={{ width: 40, height: 1, background: C.sporeBlush, marginBottom: 20 }} />
                  <h3 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: C.forestFloor, marginBottom: 14, letterSpacing: "-0.01em" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: C.forestFloor, opacity: 0.68 }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: C.forestFloor, padding: "96px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.oatCream, opacity: 0.45, marginBottom: 24 }}>Join the Waitlist</p>
            <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 700, color: C.oatCream, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.02em" }}>
              First 500 get{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>40% off.</em>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.65, color: C.oatCream, opacity: 0.65, marginBottom: 40 }}>
              Join the waitlist. Your code arrives on launch day.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EmailForm dark={true} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: C.nearBlack, color: C.oatCream, padding: "40px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "16px 32px", alignItems: "center" }}>
            <div style={{ fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4rem", color: C.oatCream }}>Shroomé</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.14em", color: C.oatCream, opacity: 0.45, textTransform: "uppercase", textAlign: "center" }}>Pour. Swirl. Glow. © 2026 Shroomé.</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.06em", color: C.oatCream, opacity: 0.55, textAlign: "right" }}>hello@drinkshroome.com</div>
          </div>
        </footer>

      </div>
    </>
  );
}
