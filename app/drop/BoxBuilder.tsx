"use client";
// ─────────────────────────────────────────────────────────────────────────────
// BOX BUILDER — sold-out configurator for /drop.
// Visitors spec their next-run build with independent per-flavor steppers
// (steps of 6, any total from 6 to 96) plus a cadence, then "Add to cart",
// which saves the build and reveals an email capture that reserves the cart
// for the next run. Purchase stays locked: every combination is sold out
// until the next run opens.
// Totals above 48 ship as a combination of real box tiers (6/12/24/48) and
// are priced as the cheapest combination of those tiers.
// Pricing source of truth: 05 — Subscription Plans (SKUMaster-approved).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DropAccessForm from "../lp/DropAccessForm";

const SIZES = [6, 12, 24, 48] as const;
type Size = (typeof SIZES)[number];

/** One-time box prices per size tier. */
const ONE_TIME: Record<Size, number> = { 6: 21, 12: 36, 24: 66, 48: 126 };

const MAX_TOTAL = 96;
const STEP = 6;

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

/**
 * Cheapest way to ship `total` sachets as a combination of real box tiers.
 * Largest-first greedy is provably optimal here: every tier is double the
 * previous one (6 → 12 → 24 → 48) and two of a tier always cost more than
 * one of the next tier up ($42>$36, $72>$66, $132>$126).
 * Returns the tiers largest-first (e.g. 60 → [48, 12]) or null for 0.
 */
function comboFor(total: number): Size[] | null {
  if (total < STEP || total > MAX_TOTAL || total % STEP !== 0) return null;
  const boxes: Size[] = [];
  let left = total;
  for (const s of [...SIZES].reverse()) {
    while (left >= s) {
      boxes.push(s);
      left -= s;
    }
  }
  return left === 0 ? boxes : null;
}

/** "a 48 + a 12", "two 48s", "a 48 + a 24 + a 6" — for the cart summary. */
function comboLabel(boxes: Size[]): string {
  const counts = new Map<Size, number>();
  for (const b of boxes) counts.set(b, (counts.get(b) ?? 0) + 1);
  const words = ["", "a", "two", "three", "four"];
  return [...counts.entries()]
    .map(([s, n]) => `${words[n] ?? n} ${s}${n > 1 ? "s" : ""}`)
    .join(" + ");
}

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
  const [vanilla, setVanilla] = useState(6);
  const [strawberry, setStrawberry] = useState(6);
  const [cadence, setCadence] = useState<Cadence>("once");
  const [carted, setCarted] = useState(false);
  const reserveRef = useRef<HTMLDivElement>(null);

  const total = vanilla + strawberry;
  const combo = comboFor(total);
  const validSize = combo !== null;
  /** Largest tier in the combo. Subscription assumption: the discount % of
   *  the largest box in the combo applies to the whole combo price
   *  (e.g. 60 = 48+12 uses the 48's SUB_PCT on $162). A 6-only build stays
   *  one-time. */
  const largest: Size = combo?.[0] ?? 12;

  // The first-pour kit (6) is one-time only.
  useEffect(() => {
    if (total === 6 && cadence !== "once") setCadence("once");
  }, [total, cadence]);

  const stepFlavor = (which: "vanilla" | "strawberry", dir: 1 | -1) => {
    const setter = which === "vanilla" ? setVanilla : setStrawberry;
    const current = which === "vanilla" ? vanilla : strawberry;
    const next = current + dir * STEP;
    if (next < 0) return;
    // Cap the combined total, not the single stepper: adding is fine as long
    // as the new total stays within MAX_TOTAL.
    if (dir === 1 && total + STEP > MAX_TOTAL) return;
    setter(next);
  };

  const base = combo ? combo.reduce((sum, s) => sum + ONE_TIME[s], 0) : 0;
  const pct =
    cadence === "once" || largest === 6 || !combo
      ? 0
      : SUB_PCT[largest as Exclude<Size, 6>][cadence as Exclude<Cadence, "once">];
  const price = +(base * (1 - pct / 100)).toFixed(2);

  const nudge = !validSize
    ? total === 0
      ? "add some sachets. builds pour in steps of 6, up to 96."
      : total > MAX_TOTAL
        ? "builds top out at 96 sachets. take a few out."
        : `builds pour in steps of 6. add ${STEP - (total % STEP)} more sachets.`
    : null;

  const addToCart = () => {
    if (!validSize) return;
    try {
      localStorage.setItem(
        "shroome_saved_build",
        JSON.stringify({ size: total, combo, vanilla, strawberry, cadence, price, savedAt: Date.now() })
      );
    } catch {}
    setCarted(true);
    window.gtag?.("event", "add_to_cart", {
      currency: "USD",
      value: price,
      items: [{ item_name: "next_run_box", item_variant: `${vanilla}v-${strawberry}s`, quantity: 1 }],
    });
    window.gtag?.("event", "save_build", { box_size: total, cadence, value: price });
    setTimeout(() => reserveRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  };

  const label = (style: React.CSSProperties = {}): React.CSSProperties => ({
    fontFamily: "var(--brand-font-mono)",
    fontWeight: 700,
    fontSize: "0.62rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(var(--brand-ink-rgb),0.6)",
    ...style,
  });

  const stepperBtn = (disabled: boolean): React.CSSProperties => ({
    ...pill,
    padding: "6px 13px",
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  });

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "34px auto 0",
        background: "#fff",
        border: "3px solid var(--brand-ink)",
        borderRadius: 28,
        padding: "clamp(22px, 4vw, 36px)",
        position: "relative",
        textAlign: "left",
      }}
    >
      <style>{`
        @keyframes meDive {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          45%      { transform: translateY(-10px) rotate(-4deg); }
          60%      { transform: translateY(2px) rotate(1.5deg); }
        }
        .me-dive { animation: meDive 4.5s ease-in-out infinite; transform-origin: 50% 90%; }
        @media (prefers-reduced-motion: reduce) { .me-dive { animation: none; } }
      `}</style>
      <Image
        src="/brand/me-01-solid.png"
        alt=""
        aria-hidden
        width={100}
        height={86}
        className="me-dive"
        style={{ position: "absolute", top: -34, left: 26, width: 76, height: "auto" }}
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
        First run · poured out
      </div>

      {/* ── Flavor quantities ── */}
      <p style={label({ marginBottom: 4, marginTop: 8 })}>1 · Your flavors · steps of 6</p>
      <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.5)", marginBottom: 14 }}>
        mix any way you like, up to 96 sachets. bigger builds ship as a combo of boxes.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <Image src="/sachet-vanilla.png" alt="Vanilla sachet" width={34} height={74} style={{ width: 30, height: "auto" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.85rem", color: ink }}>Vanilla</p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)" }}>warm · smooth</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button aria-label="less vanilla" onClick={() => stepFlavor("vanilla", -1)} disabled={vanilla === 0} style={stepperBtn(vanilla === 0)}>−</button>
          <span style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1rem", color: ink, minWidth: 26, textAlign: "center" }}>{vanilla}</span>
          <button aria-label="more vanilla" onClick={() => stepFlavor("vanilla", 1)} disabled={total + STEP > MAX_TOTAL} style={stepperBtn(total + STEP > MAX_TOTAL)}>+</button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
        <Image src="/sachet-strawberry.png" alt="Strawberry sachet" width={34} height={74} style={{ width: 30, height: "auto" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 700, fontSize: "0.85rem", color: ink }}>Strawberry</p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "rgba(var(--brand-ink-rgb),0.55)" }}>bright · loud</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button aria-label="less strawberry" onClick={() => stepFlavor("strawberry", -1)} disabled={strawberry === 0} style={stepperBtn(strawberry === 0)}>−</button>
          <span style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1rem", color: ink, minWidth: 26, textAlign: "center" }}>{strawberry}</span>
          <button aria-label="more strawberry" onClick={() => stepFlavor("strawberry", 1)} disabled={total + STEP > MAX_TOTAL} style={stepperBtn(total + STEP > MAX_TOTAL)}>+</button>
        </div>
      </div>
      {/* mix bar */}
      <div aria-hidden style={{ display: "flex", height: 10, borderRadius: 999, overflow: "hidden", border: "2px solid var(--brand-ink)", marginBottom: 8, background: "rgba(var(--brand-ink-rgb),0.08)" }}>
        {total > 0 && (
          <>
            <div style={{ width: `${(vanilla / total) * 100}%`, background: "var(--brand-flavor-functional)", transition: "width 0.25s" }} />
            <div style={{ flex: 1, background: "var(--brand-flavor-strawberry)", transition: "width 0.25s" }} />
          </>
        )}
      </div>
      <p
        role={nudge ? "status" : undefined}
        style={{
          fontFamily: "var(--brand-font-mono)",
          fontWeight: 700,
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: nudge ? "var(--brand-accent-deep)" : "rgba(var(--brand-ink-rgb),0.55)",
          marginBottom: 22,
        }}
      >
        {nudge ?? `${total} sachets · ${total === 6 ? "first-pour kit" : `${total}-sachet build`}`}
      </p>

      {/* ── Frequency ── */}
      <p style={label({ marginBottom: 10 })}>2 · Frequency</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
        {CADENCES.map((c) => {
          const disabled = total === 6 && c.key !== "once";
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
      {total === 6 && (
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.66rem", color: "rgba(var(--brand-ink-rgb),0.5)", marginBottom: 0 }}>
          the first-pour kit is one-time only.
        </p>
      )}

      {/* ── Price ── */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, borderTop: "2px solid rgba(var(--brand-ink-rgb),0.12)", marginTop: 20, paddingTop: 18, flexWrap: "wrap" }}>
        <div>
          <p style={label()}>Your cart</p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 600, fontSize: "0.78rem", color: "rgba(var(--brand-ink-rgb),0.7)", marginTop: 4 }}>
            {validSize ? (
              <>
                {vanilla > 0 && `${vanilla} vanilla`}
                {vanilla > 0 && strawberry > 0 && " + "}
                {strawberry > 0 && `${strawberry} strawberry`}
                {cadence !== "once" ? ` · ${CADENCES.find((c) => c.key === cadence)!.label.toLowerCase()}` : " · one-time"}
              </>
            ) : (
              "pick a box size to see your price"
            )}
          </p>
          {combo && combo.length > 1 && (
            <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(var(--brand-ink-rgb),0.55)", marginTop: 4 }}>
              ships as {comboLabel(combo)}
            </p>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "var(--brand-font-mono)", fontWeight: 700, fontSize: "1.9rem", color: validSize ? ink : "rgba(var(--brand-ink-rgb),0.3)", lineHeight: 1 }}>
            {validSize ? `$${price % 1 === 0 ? price : price.toFixed(2)}` : "$ ·"}
          </p>
          {validSize && pct > 0 && (
            <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.68rem", color: "var(--brand-accent-deep)", fontWeight: 700 }}>
              <s style={{ color: "rgba(var(--brand-ink-rgb),0.4)", fontWeight: 500 }}>${base}</s>{" "}subscriber price
            </p>
          )}
        </div>
      </div>

      {/* ── Add to cart → reserve it for the next run ── */}
      <button
        onClick={addToCart}
        disabled={!validSize}
        style={{
          width: "100%",
          marginTop: 18,
          padding: "16px 20px",
          borderRadius: 999,
          border: "2px solid var(--brand-ink)",
          background: validSize ? "var(--brand-accent)" : "rgba(var(--brand-ink-rgb),0.12)",
          color: validSize ? "var(--brand-canvas)" : "rgba(var(--brand-ink-rgb),0.4)",
          fontFamily: "var(--brand-font-body)",
          fontWeight: 800,
          fontSize: "0.78rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: validSize ? "pointer" : "not-allowed",
        }}
      >
        {carted ? "In your cart ✓" : "Add to cart →"}
      </button>

      {carted ? (
        <div ref={reserveRef} style={{ marginTop: 18, borderTop: "2px solid rgba(var(--brand-ink-rgb),0.12)", paddingTop: 18 }}>
          <p style={{ fontFamily: "var(--brand-font-body)", fontWeight: 800, fontSize: "0.85rem", color: ink, marginBottom: 4 }}>
            cart saved. now reserve it.
          </p>
          <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.72rem", color: "rgba(var(--brand-ink-rgb),0.6)", marginBottom: 14 }}>
            drop your email and we&apos;ll hold this exact cart for the next run, then
            send your link the moment it goes live.
          </p>
          <DropAccessForm
            source="drop-builder"
            upsellHref="#join"
            buttonLabel="reserve my cart"
            microcopy="no charge until the next run opens and you check out."
          />
        </div>
      ) : (
        <p style={{ fontFamily: "var(--brand-font-body)", fontSize: "0.78rem", lineHeight: 1.6, color: "rgba(var(--brand-ink-rgb),0.75)", textAlign: "center", marginTop: 16 }}>
          We&apos;ll hold your cart. Members shop the next run a full day early.
        </p>
      )}
    </div>
  );
}
