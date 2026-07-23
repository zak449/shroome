"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DropAccessForm from "./DropAccessForm";
import { BRAND, alpha } from "../lib/brand";
import {
  DROP_001,
  DROP_002,
  X1_BOXES,
  DROP2_LEDGER,
  DROP2_SOON_LINE,
  ACCESS_LIST_COUNT,
  FDA_DISCLAIMER,
} from "../lib/drop-config";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LPConfig {
  segment: string; // "ritual" | "glow" | "calm" | "focus" | "pour"
  hero: {
    eyebrow: string;
    headlineLines: string[];
    subheadline: string;
    /** CSS background for the hero section. */
    background: string;
    /** Dark hero (ink bg, canvas text) — focus page. */
    dark?: boolean;
    /** Soft cloud texture overlay opacity (0 = none). */
    cloudOpacity?: number;
    /** Accent→canvas energy streak behind the pour — pour page only. */
    limeStreak?: boolean;
    /** Focus page: big data figures with accent underline strokes. */
    dataCallouts?: string[];
    sachets: "both" | "vanilla" | "strawberry";
  };
  /** Sold-out stamp color on the drop ledger (a flavor tint). */
  stampColor: string;
  /** Focus page: canvas ledger cards on the ink hero. */
  ledgerLight?: boolean;
  /** Calm page: render the caffeine-curve section after the hero. */
  curve?: boolean;
  benefits: {
    sectionBg: string;
    /** "soft" (rounded canvas cards) | "spec" (ink-bordered) | "numeral" (big numerals, ink rules) */
    cardStyle: "soft" | "spec" | "numeral";
    items: { title: string; body: string }[];
    /** Echo the FDA disclaimer directly under the blocks (glow/calm/focus). */
    disclaimer?: boolean;
  };
  strip: {
    header: string;
    bg: string;
    stats: { stat: string; label: string }[];
    footnote: string;
  };
  proof: {
    header: string;
    body: string;
    counterLabel: string;
    badges: string[];
  };
  faqs: { q: string; a: string }[];
  final: {
    header: string;
    body: string;
    microcopy: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Drop ledger (shared urgency module)
// ─────────────────────────────────────────────────────────────────────────────

function useCountdown(target: string | null) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(null);
  useEffect(() => {
    if (!target) return;
    const t = new Date(target).getTime();
    const tick = () => {
      const diff = t - Date.now();
      if (diff <= 0) {
        setLeft({ d: 0, h: 0, m: 0 });
        return;
      }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [target]);
  return left;
}

function DropLedger({ stampColor, light }: { stampColor: string; light?: boolean }) {
  const countdown = useCountdown(DROP_002.openDate);
  const cardBg = light ? "var(--brand-canvas)" : "var(--brand-ink)";
  const cardText = light ? "var(--brand-ink)" : "var(--brand-canvas)";
  const cardFaint = light ? "rgba(var(--brand-ink-rgb),0.5)" : "rgba(var(--brand-canvas-rgb),0.5)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520, width: "100%" }}>
      {/* drop 001 */}
      <div className="lp-ledger-card" style={{ background: cardBg, color: cardText }}>
        <span className="lp-ledger-label">drop 001</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <s style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.8rem", color: cardFaint }}>
            {X1_BOXES} boxes
          </s>
          <span className="lp-ledger-stamp" style={{ background: stampColor }}>
            sold out
          </span>
        </span>
      </div>
      {/* drop 002 */}
      <div className="lp-ledger-card" style={{ background: cardBg, color: cardText }}>
        <span className="lp-ledger-label">
          <span className="lp-pulse-dot" aria-hidden="true" />
          drop 002
        </span>
        <span style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.8rem" }}>
          {DROP_002.openDate && countdown
            ? `opens in ${String(countdown.d).padStart(2, "0")} : ${String(countdown.h).padStart(2, "0")} : ${String(countdown.m).padStart(2, "0")} · ${DROP2_LEDGER}`
            : DROP2_LEDGER}
        </span>
      </div>
      {!DROP_002.openDate && (
        <p
          style={{
            fontFamily: "var(--brand-font-body)",
            fontStyle: "normal",
            fontSize: "0.78rem",
            color: light ? "rgba(var(--brand-canvas-rgb),0.65)" : "rgba(var(--brand-ink-rgb),0.6)",
            margin: 0,
          }}
        >
          {DROP2_SOON_LINE}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Caffeine curve (calm page signature section) — inline SVG per brief
// ─────────────────────────────────────────────────────────────────────────────

function CurveSection() {
  return (
    <section style={{ background: "var(--brand-canvas)", padding: "72px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 className="lp-h2" style={{ color: "var(--brand-ink)", textAlign: "center", marginBottom: 36 }}>
          coffee spikes. matcha carries.
        </h2>
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="Illustrative chart: coffee's energy line spikes at 30 minutes then drops below baseline by hour 3 — the 2pm cliff. The shroomé line rises gently and plateaus through hour 5 — the carry."
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* axes */}
          <line x1="52" y1="20" x2="52" y2="248" stroke={BRAND.colors.ink} strokeWidth="1.5" />
          <line x1="52" y1="248" x2="616" y2="248" stroke={BRAND.colors.ink} strokeWidth="1.5" />
          {/* baseline (dashed) */}
          <line x1="52" y1="200" x2="616" y2="200" stroke={alpha("ink", 0.25)} strokeWidth="1" strokeDasharray="4 5" />
          {/* shroomé curve fill (flavor-functional tint) */}
          <path
            d="M 52 200 C 110 190 150 120 220 108 C 320 92 440 96 560 116 L 600 124 L 600 248 L 52 248 Z"
            fill={BRAND.colors.flavorFunctional}
            opacity="0.55"
          />
          {/* shroomé line */}
          <path
            d="M 52 200 C 110 190 150 120 220 108 C 320 92 440 96 560 116 L 600 124"
            fill="none"
            stroke={BRAND.colors.ink}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* coffee line (ink 40%) — sharp peak, hard drop, dips below baseline */}
          <path
            d="M 52 200 C 70 170 84 60 118 52 C 150 46 168 120 210 178 C 250 232 300 236 380 226 L 600 214"
            fill="none"
            stroke={alpha("ink", 0.4)}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1 0"
          />
          {/* labels */}
          <text x="228" y="212" fontFamily={BRAND.fonts.body} fontSize="13" fontStyle="italic" fill={alpha("ink", 0.55)}>
            the 2pm cliff
          </text>
          <text x="360" y="84" fontFamily={BRAND.fonts.body} fontSize="13" fontStyle="italic" fill={BRAND.colors.ink}>
            the carry
          </text>
          <text x="122" y="40" fontFamily={BRAND.fonts.body} fontSize="12" fill={alpha("ink", 0.45)}>
            coffee
          </text>
          <text x="560" y="106" fontFamily={BRAND.fonts.body} fontSize="12" fontWeight="700" fill={BRAND.colors.ink}>
            shroomé
          </text>
          {/* axis labels */}
          <text x="330" y="284" textAnchor="middle" fontFamily={BRAND.fonts.body} fontSize="12" fill={alpha("ink", 0.55)}>
            hours after your first sip
          </text>
          <text x="24" y="140" textAnchor="middle" fontFamily={BRAND.fonts.body} fontSize="12" fill={alpha("ink", 0.55)} transform="rotate(-90 24 140)">
            how it feels
          </text>
        </svg>
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "13px", color: "rgba(var(--brand-ink-rgb),0.5)", textAlign: "center", marginTop: 16 }}>
          illustrative of typical caffeine + l-theanine absorption character, not a measured clinical result.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shell
// ─────────────────────────────────────────────────────────────────────────────

export default function LPShell({ config }: { config: LPConfig }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { hero, benefits, strip, proof, faqs, final } = config;
  const source = `lp-${config.segment}`;

  const heroText = hero.dark ? "var(--brand-canvas)" : "var(--brand-ink)";
  const heroFaint = hero.dark ? "rgba(var(--brand-canvas-rgb),0.8)" : "rgba(var(--brand-ink-rgb),0.7)";
  const heroMicro = hero.dark ? "rgba(var(--brand-canvas-rgb),0.6)" : "rgba(var(--brand-ink-rgb),0.6)";

  const scrollToFinal = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top">
      <style>{`
        .lp-h1{font-family:var(--brand-font-display);letter-spacing:-0.02em;font-weight:800;font-size:clamp(2.4rem,6vw,4rem);line-height:1.05;margin:0 0 20px}
        .lp-h2{font-family:var(--brand-font-display);letter-spacing:-0.02em;font-weight:800;font-size:clamp(1.7rem,4vw,2.5rem);line-height:1.15;margin:0}
        .lp-eyebrow{font-family:var(--brand-font-body);font-weight:700;font-size:0.68rem;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 18px}
        .lp-sub{font-family:var(--brand-font-body);font-size:0.95rem;line-height:1.65;max-width:420px;margin:0 0 28px}
        .lp-ledger-card{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;flex-wrap:wrap}
        .lp-ledger-label{font-family:var(--brand-font-body);font-weight:700;font-size:0.78rem;letter-spacing:0.12em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px}
        .lp-ledger-stamp{font-family:var(--brand-font-body);font-weight:800;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--brand-ink);padding:4px 10px;transform:rotate(-2deg);display:inline-block}
        .lp-pulse-dot{width:8px;height:8px;border-radius:50%;background:var(--brand-accent);display:inline-block;animation:lpPulse 1.8s ease-in-out infinite}
        @keyframes lpPulse{0%,100%{box-shadow:0 0 0 0 rgba(var(--brand-accent-rgb),0.6)}50%{box-shadow:0 0 0 6px rgba(var(--brand-accent-rgb),0)}}
        .lp-benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;max-width:1020px;margin:0 auto}
        .lp-card{padding:28px 24px}
        .lp-card h3{font-family:var(--brand-font-display);font-weight:700;font-size:1.4rem;color:var(--brand-ink);margin:0 0 10px}
        .lp-card p{font-family:var(--brand-font-body);font-size:0.85rem;color:rgba(var(--brand-ink-rgb),0.7);line-height:1.65;margin:0}
        .lp-card-soft{background:var(--brand-canvas);border-radius:12px;box-shadow:0 4px 24px rgba(var(--brand-ink-rgb),0.05)}
        .lp-card-spec{background:var(--brand-canvas);border:2px solid var(--brand-ink)}
        .lp-card-numeral{background:var(--brand-canvas);border-top:3px solid var(--brand-ink)}
        .lp-card-num{font-family:var(--brand-font-mono);font-size:2rem;font-weight:500;color:var(--brand-ink);display:block;margin-bottom:10px}
        .lp-strip-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;max-width:1020px;margin:0 auto}
        .lp-stat{background:rgba(var(--brand-canvas-rgb),0.55);padding:22px 18px;text-align:left}
        .lp-stat-num{font-family:var(--brand-font-mono);font-size:1.7rem;font-weight:500;color:var(--brand-ink);display:block;margin-bottom:6px}
        .lp-stat-label{font-family:var(--brand-font-body);font-size:0.75rem;color:rgba(var(--brand-ink-rgb),0.7);line-height:1.5}
        .lp-badge{font-family:var(--brand-font-mono);font-size:0.68rem;letter-spacing:0.06em;color:var(--brand-ink);background:rgba(var(--brand-ink-rgb),0.06);border:1px solid rgba(var(--brand-ink-rgb),0.15);padding:8px 14px;white-space:nowrap}
        .lp-faq-item{border-top:1px solid rgba(var(--brand-ink-rgb),0.1)}
        .lp-faq-q{width:100%;background:none;border:none;padding:20px 0;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:var(--brand-font-body);font-size:0.95rem;font-weight:700;color:var(--brand-ink);gap:16px}
        .lp-faq-q span{font-size:20px;flex-shrink:0;transition:transform .2s}
        .lp-faq-a{font-family:var(--brand-font-body);font-size:0.88rem;color:rgba(var(--brand-ink-rgb),0.65);line-height:1.7;padding:0 0 20px;margin:0;max-width:640px}
        .lp-cta-btn{display:inline-block;background:var(--brand-accent);color:var(--brand-canvas);border:none;padding:16px 36px;font-family:var(--brand-font-body);font-weight:800;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer}
        .lp-hero-grid{display:flex;align-items:center;gap:48px;flex-wrap:wrap;max-width:1120px;margin:0 auto;position:relative;z-index:1}
        .lp-data-callout{font-family:var(--brand-font-body);font-weight:700;font-size:clamp(1.4rem,3vw,2rem);color:var(--brand-canvas);position:relative;display:inline-block;padding:0 4px}
        .lp-data-callout::after{content:'';position:absolute;left:0;right:0;bottom:2px;height:10px;background:var(--brand-accent);z-index:-1}
        @media(prefers-reduced-motion:reduce){.lp-pulse-dot{animation:none}}
        @media(max-width:600px){.lp-hero-grid{gap:32px}}
      `}</style>

      {/* ── Minimal header: logo mark only, no nav (ghost page) ── */}
      <header
        style={{
          padding: "18px 24px",
          display: "flex",
          justifyContent: "center",
          background: hero.dark ? "var(--brand-ink)" : "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }} aria-label="shroomé">
          <Image src="/brand/symbol-sheep-solid.png" width={30} height={30} alt="shroomé S" style={{ borderRadius: 6 }} priority />
          <span
            style={{
              fontFamily: "var(--brand-font-display)",
              fontStyle: "normal",
              fontSize: "1.3rem",
              color: heroText,
            }}
          >
            shroomé
          </span>
        </a>
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section
        style={{
          background: hero.background,
          position: "relative",
          overflow: "hidden",
          padding: "110px 24px 72px",
        }}
      >
        {hero.cloudOpacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/email-clouds-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: hero.cloudOpacity,
              pointerEvents: "none",
            }}
          />
        ) : null}
        {hero.limeStreak ? (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18%",
              right: "-12%",
              width: "70%",
              height: 200,
              background: "linear-gradient(90deg, rgba(var(--brand-accent-rgb),0.55) 0%, rgba(var(--brand-canvas-rgb),0) 85%)",
              transform: "rotate(-8deg)",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
        ) : null}

        <div className="lp-hero-grid">
          <div style={{ flex: "1 1 440px", minWidth: 300 }}>
            <p className="lp-eyebrow" style={{ color: heroText }}>
              {!hero.dark ? null : <span className="lp-pulse-dot" style={{ marginRight: 10 }} aria-hidden="true" />}
              {hero.eyebrow}
            </p>
            <h1 className="lp-h1" style={{ color: heroText }}>
              {hero.headlineLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < hero.headlineLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="lp-sub" style={{ color: heroFaint }}>{hero.subheadline}</p>

            {hero.dataCallouts && (
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
                {hero.dataCallouts.map((d) => (
                  <span key={d} className="lp-data-callout">{d}</span>
                ))}
              </div>
            )}

            <DropAccessForm
              source={source}
              dark={hero.dark}
              microcopy="drop 001 sold out. drop 002 is a limited run."
            />
            <div style={{ marginTop: 28 }}>
              <DropLedger stampColor={config.stampColor} light={config.ledgerLight} />
            </div>
            <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.65rem", color: heroMicro, marginTop: 16, letterSpacing: "0.03em" }}>
              {ACCESS_LIST_COUNT} people holding drop access
            </p>
          </div>

          <div style={{ flex: "1 1 320px", display: "flex", justifyContent: "center", alignItems: "center", gap: 20, minWidth: 0 }}>
            {(hero.sachets === "both" || hero.sachets === "vanilla") && (
              <Image
                src="/sachet-vanilla.png"
                alt="shroomé Vanilla matcha sachet — single-serve packet with ceremonial matcha, mushroom extracts, and collagen"
                width={260}
                height={372}
                className="sachet-float"
                priority
                style={{
                  width: hero.sachets === "both" ? "44%" : "62%",
                  maxWidth: 260,
                  height: "auto",
                  filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.18))",
                  transform: hero.dark ? "rotate(6deg)" : undefined,
                }}
              />
            )}
            {(hero.sachets === "both" || hero.sachets === "strawberry") && (
              <Image
                src="/sachet-strawberry.png"
                alt="shroomé Strawberry matcha sachet — single-serve packet with ceremonial matcha, mushroom extracts, and collagen"
                width={260}
                height={372}
                className="sachet-float"
                priority
                style={{
                  width: hero.sachets === "both" ? "44%" : "62%",
                  maxWidth: 260,
                  height: "auto",
                  animationDelay: "2s",
                  filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.18))",
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* ══════════════ CURVE (calm only) ══════════════ */}
      {config.curve && <CurveSection />}

      {/* ══════════════ BENEFITS ══════════════ */}
      <section style={{ background: benefits.sectionBg, padding: "80px 24px" }}>
        <div className="lp-benefits-grid">
          {benefits.items.map((b, i) => (
            <div key={b.title} className={`lp-card lp-card-${benefits.cardStyle}`}>
              {benefits.cardStyle === "numeral" && (
                <span className="lp-card-num">{String(i + 1).padStart(2, "0")}</span>
              )}
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
        {benefits.disclaimer && (
          <p
            style={{
              fontFamily: "var(--brand-font-body)",
              fontSize: "12px",
              color: "rgba(var(--brand-ink-rgb),0.6)",
              maxWidth: 1020,
              margin: "24px auto 0",
              lineHeight: 1.5,
            }}
          >
            {FDA_DISCLAIMER}
          </p>
        )}
      </section>

      {/* ══════════════ INGREDIENT / SCIENCE STRIP ══════════════ */}
      <section style={{ background: strip.bg, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <h2 className="lp-h2" style={{ color: "var(--brand-ink)", marginBottom: 32 }}>{strip.header}</h2>
          <div className="lp-strip-grid">
            {strip.stats.map((s) => (
              <div key={s.stat + s.label} className="lp-stat">
                <span className="lp-stat-num">{s.stat}</span>
                <span className="lp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "13px", color: "rgba(var(--brand-ink-rgb),0.65)", marginTop: 20 }}>
            {strip.footnote}
          </p>
        </div>
      </section>

      {/* ══════════════ SOCIAL PROOF ══════════════ */}
      <section style={{ background: "var(--brand-canvas)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="lp-h2" style={{ color: "var(--brand-ink)", marginBottom: 20 }}>{proof.header}</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.95rem", color: "rgba(var(--brand-ink-rgb),0.7)", lineHeight: 1.7, margin: "0 auto 28px", maxWidth: 560 }}>
            {proof.body}
          </p>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "0.85rem", color: "var(--brand-ink)", marginBottom: 28 }}>
            <strong>{ACCESS_LIST_COUNT}</strong> {proof.counterLabel}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {proof.badges.map((b) => (
              <span key={b} className="lp-badge">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section style={{ background: "var(--brand-canvas)", padding: "24px 24px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 className="lp-h2" style={{ color: "var(--brand-ink)", marginBottom: 28, textAlign: "center" }}>questions</h2>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className="lp-faq-item">
                <button
                  className="lp-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p className="lp-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
          {/* Post-FAQ CTA (CTA #2 of 3) */}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="lp-cta-btn" onClick={scrollToFinal}>
              get drop access →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA (ink) ══════════════ */}
      <section id="final-cta" style={{ background: "var(--brand-ink)", padding: "88px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 className="lp-h2" style={{ color: "var(--brand-canvas)", marginBottom: 18 }}>{final.header}</h2>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.92rem", color: "rgba(var(--brand-canvas-rgb),0.7)", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: 520 }}>
            {final.body}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DropAccessForm source={source} dark microcopy={final.microcopy} />
          </div>
        </div>
      </section>

      {/* ══════════════ LEGAL FOOTER ══════════════ */}
      <footer style={{ background: "var(--brand-canvas)", padding: "40px 24px", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--brand-font-body)",
            fontSize: "12px",
            color: "rgba(var(--brand-ink-rgb),0.6)",
            maxWidth: 620,
            margin: "0 auto 20px",
            lineHeight: 1.6,
          }}
        >
          {FDA_DISCLAIMER}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
          <a href="/privacy" style={{ fontFamily: "var(--brand-font-body)", fontSize: "11px", color: "rgba(var(--brand-ink-rgb),0.55)", textDecoration: "none" }}>privacy</a>
          <a href="/terms" style={{ fontFamily: "var(--brand-font-body)", fontSize: "11px", color: "rgba(var(--brand-ink-rgb),0.55)", textDecoration: "none" }}>terms</a>
          <a href="mailto:hello@drinkshroome.com" style={{ fontFamily: "var(--brand-font-body)", fontSize: "11px", color: "rgba(var(--brand-ink-rgb),0.55)", textDecoration: "none" }}>contact</a>
        </div>
        <p style={{ fontFamily: "var(--brand-font-mono)", fontSize: "10px", color: "rgba(var(--brand-ink-rgb),0.4)", margin: 0 }}>
          © 2026 shroomé · ZSQUARED INC
        </p>
      </footer>
    </div>
  );
}
