"use client";
// ─────────────────────────────────────────────────────────────────────────────
// BOX BUILDER — sold-out configurator for /drop.
// Lets visitors spec their Drop 002 box (size → flavor mix in 6s → cadence)
// and see the real price, but purchase stays locked: every combination is
// sold out, and the only live action is joining the Drop 002 list.
// Pricing source of truth: 05 — Subscription Plans (SKUMaster-approved).
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import Image from "next/image";

const SIZES = [6, 12, 24, 48] as const;
type Size = (typeof SIZES)[number];

/** One-time box prices. */
const ONE_TIME: Record<Size, number> = { 6: 21, 12: 36, 24: 66, 48: 126 };

/** Subscription % off one-time, by size then cadence. 6-pack is one-time only. */
const CADENCES = [
  { key: "once", label: "One-time" },
  { key: "2w", label: "Every 2 weeks" },
  { key: "30d", label: "Every 30 days" },
  { key: "60d", label: "Every 60 days" },
] as const;
type Cadence = (typeof CADENCES)[number]["key"];

const SUB_PCT: Record<Exclude<Size, 6>, Record<Exclude<Cadence, "once">, number>> = {
  12: { "2w": 15, "30d": 12, "60d": 10 },
  24: { "2w": 18, "30d": 15, "60d": 12 },
  48: { "2w": 20, "30d": 20, "60d": 15 },
};

const ink = "var(--brand-ink)";
const pill: React.CSSProperties = {
  fontFamily: "var(--brand-font-body)",
  fontWeight: 700,
  fontSize: "0.72rem",
  letterSpacing: "0.04em",
  border: "2px solid var(--brand-ink)",
  borderRadius: 999,
  padding: "10px 16px",
  cursor: "pointer",
  background: "var(--brand-canvas)",
  color: ink,
  transition: "all 0.15s",
};

export default function BoxBuilder() {
  const [size, setSize] = useState<Size>(12);
  const [vanilla, setVanilla] = useState(6);
  const [cadence, setCadence] = useState<Cadence>("once");

  const strawberry = size - vanilla;

  const pickSize = (s: Size) => {
    setSize(s);
    setVanilla(Math.min(Math.max(Math.round(s / 12) * 6, 0), s));
    if (s === 6) setCadence("once");
  };

  const step = (dir: 1 | -1) => {
    const next = vanilla + dir * 6;
    if (next >= 0 && next <= size) setVanilla(next);
  };

  const base = ONE_TIME[size];
  const pct = cadence === "once" || size === 6 ? 0 : SUB_PCT[size as Exclude<Size, 6>][cadence as Exclude<Cadence, "once">];
  const price = +(base * (1 - pct / 100)).toFixed(2);

  const label = (style: React.CSSProperties = {}): React.CSSProperties => ({
    fontFamily: "var(--brand-font-mono)",
    fontWeight: 700,
    fontSize: "0.62rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(var(--brand-ink-rgb),0.6)",
    ...style,
  });

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        background: "#fff",
        border: "3px solid var(--brand-ink)",
        borderRadius: 28,
        padding: "clamp(22px, 4vw, 36px)",
        position: "relative",
        textAlign: "left",
      }}
    >
      <Image
        src="/brand/me-01.png"
        alt=""
        aria-hidden
        width={100}
        height={86}
        style={{ position: "absolute", top: -46, left: 26, width: 88, height: "auto" }}
      />
      {/* sold-out stamp */}
      <div
        style={{
          position: "absolute",
          top: -16,
          right: 22,
          background: "var(--brand-ink)",
          color: "var(--brand-canvas)",
          borderRadius: 999,
          padding: "8px 18px",
          transform: "rotate(3deg)",
          fontFamily: "var(--brand-font-mono)",
          fontWeight: 700,
          fontSize: "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Drop 001 · Sold out
      </div>

      {/* ── Size ── */}
      <p style={label({ marginBottom: 10 })}>1 · Box size</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => pickSize(s)}
            aria-pressed={size === s}
            style={{
              ...pill,
              flex: "1 1 90px",
              textAlign: "center",
              background: size === s ? "var(--brand-ink)" : "var(--brand-canvas)",
              color: size === s ? "var(--brand-canvas)" : ink,
            }}
          >
            {s} sachets
            {s === 6 && <span style={{ display: "block", fontWeight: 500, fontSize: "0.6rem", opacity: 0.7 }}>first-pour kit</span>}
          </button>
        ))}
      </div>

      {/* ── Flavor mix ── */}
      <p style={label({ marginBottom: 10 })}>2 · Flavor mix · steps of 6</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <Image src="/sachet-vanilla.png" alt="Vanilla sachet" width={34} height={74} style={{ width: 30, height: "auto" }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.85rem", color: ink }}>Vanilla</p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)" }}>warm · smooth</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button aria-label="less vanilla" onClick={() => step(-1)} disabled={vanilla === 0} style={{ ...pill, padding: "6px 13px", opacity: vanilla === 0 ? 0.3 : 1 }}>−</button>
          <span style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1rem", color: ink, minWidth: 26, textAlign: "center" }}>{vanilla}</span>
          <button aria-label="more vanilla" onClick={() => step(1)} disabled={vanilla === size} style={{ ...pill, padding: "6px 12px", opacity: vanilla === size ? 0.3 : 1 }}>+</button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
        <Image src="/sachet-strawberry.png" alt="Strawberry sachet" width={34} height={74} style={{ width: 30, height: "auto" }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.85rem", color: ink }}>Strawberry</p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)" }}>bright · loud</p>
        </div>
        <span style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1rem", color: ink, padding: "0 12px" }}>{strawberry}</span>
      </div>
      {/* mix bar */}
      <div aria-hidden style={{ display: "flex", height: 10, borderRadius: 999, overflow: "hidden", border: "2px solid var(--brand-ink)", marginBottom: 24 }}>
        <div style={{ width: `${(vanilla / size) * 100}%`, background: "var(--brand-flavor-functional)", transition: "width 0.25s" }} />
        <div style={{ flex: 1, background: "var(--brand-flavor-strawberry)", transition: "width 0.25s" }} />
      </div>

      {/* ── Frequency ── */}
      <p style={label({ marginBottom: 10 })}>3 · Frequency</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
        {CADENCES.map((c) => {
          const disabled = size === 6 && c.key !== "once";
          const active = cadence === c.key;
          return (
            <button
              key={c.key}
              onClick={() => !disabled && setCadence(c.key)}
              disabled={disabled}
              aria-pressed={active}
              style={{
                ...pill,
                fontSize: "0.66rem",
                padding: "9px 13px",
                background: active ? "var(--brand-accent)" : "var(--brand-canvas)",
                color: active ? "var(--brand-canvas)" : ink,
                borderColor: active ? "var(--brand-ink)" : "rgba(var(--brand-ink-rgb),0.35)",
                opacity: disabled ? 0.3 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      {size === 6 && (
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.66rem", color: "rgba(var(--brand-ink-rgb),0.5)", marginBottom: 0 }}>
          the first-pour kit is one-time only.
        </p>
      )}

      {/* ── Price ── */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, borderTop: "2px solid rgba(var(--brand-ink-rgb),0.12)", marginTop: 20, paddingTop: 18, flexWrap: "wrap" }}>
        <div>
          <p style={label()}>Your box</p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.78rem", color: "rgba(var(--brand-ink-rgb),0.7)", marginTop: 4 }}>
            {vanilla > 0 && `${vanilla} vanilla`}
            {vanilla > 0 && strawberry > 0 && " + "}
            {strawberry > 0 && `${strawberry} strawberry`}
            {cadence !== "once" ? ` · ${CADENCES.find((c) => c.key === cadence)!.label.toLowerCase()}` : " · one-time"}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1.9rem", color: ink, lineHeight: 1 }}>
            ${price % 1 === 0 ? price : price.toFixed(2)}
          </p>
          {pct > 0 && (
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "var(--brand-accent-deep)", fontWeight: 700 }}>
              <s style={{ color: "rgba(var(--brand-ink-rgb),0.4)", fontWeight: 500 }}>${base}</s>{" "}subscriber price
            </p>
          )}
        </div>
      </div>

      {/* ── Locked purchase ── */}
      <button
        disabled
        style={{
          width: "100%",
          marginTop: 18,
          padding: "16px 20px",
          borderRadius: 999,
          border: "2px solid rgba(var(--brand-ink-rgb),0.25)",
          background: "rgba(var(--brand-ink-rgb),0.06)",
          color: "rgba(var(--brand-ink-rgb),0.45)",
          fontFamily: "var(--brand-font-body)",
          fontWeight: 800,
          fontSize: "0.78rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "not-allowed",
        }}
      >
        Sold out — every combination
      </button>
      <a
        href="#waitlist"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: 10,
          padding: "16px 20px",
          borderRadius: 999,
          border: "2px solid var(--brand-ink)",
          background: "var(--brand-accent)",
          color: "var(--brand-canvas)",
          fontFamily: "var(--brand-font-body)",
          fontWeight: 800,
          fontSize: "0.78rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        Get first access — Drop 002 →
      </a>
      <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.66rem", color: "rgba(var(--brand-ink-rgb),0.5)", textAlign: "center", marginTop: 10 }}>
        your build is saved in spirit. the list shops before the link is public.
      </p>
    </div>
  );
}
