// ─────────────────────────────────────────────────────────────────────────────
// Bolden motif primitives — shared creative moments extracted from the R02
// sachet art (Brand/bolden-identity-extraction.md §d–e):
//   • SunburstMound — the radial sunburst mound (alternating Green / flavor /
//     Matcha rays, lilac core) from the sachet front & box lid. Use as a
//     section divider or a pedestal for Mé.
//   • MeOnMound — Mé standing on the sunburst mound, exactly as she appears
//     on the sachet front and the OG image. The symbol is the STATIC delivered
//     mark (public/logo-mark.png): never outlined, rotated, distorted, or
//     recolored (canon §d). New poses come from Bolden, not from us.
// Pure presentational — safe in both server and client components.
// ─────────────────────────────────────────────────────────────────────────────
import Image from "next/image";
import { BRAND } from "./lib/brand";

const C = BRAND.colors;

/** Ray color cycle mirroring the sachet mound: Green / flavor / Green / Matcha. */
function rayColor(i: number, flavor: string): string {
  if (i % 2 === 0) return C.ink; // Bolden "Green"
  return (i % 4 === 1 ? flavor : C.accent); // flavor tag color / Bolden "Matcha"
}

export function SunburstMound({
  flavor = C.flavorFunctional,
  width = 220,
  rays = 13,
  style,
}: {
  /** Flavor accent for alternating rays — Strawberry #FF6DC7 or Vanilla #E4CB9F. */
  flavor?: string;
  width?: number;
  rays?: number;
  style?: React.CSSProperties;
}) {
  const R = 100;
  const cx = 100;
  const cy = 100;
  const step = 180 / rays;
  const pt = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + R * Math.cos(rad), cy - R * Math.sin(rad)];
  };
  const wedges = Array.from({ length: rays }, (_, i) => {
    const a0 = 180 - i * step;
    const a1 = 180 - (i + 1) * step;
    const [x0, y0] = pt(a0);
    const [x1, y1] = pt(a1);
    return (
      <path
        key={i}
        d={`M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${R},${R} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`}
        fill={rayColor(i, flavor)}
      />
    );
  });
  return (
    <svg
      viewBox="0 0 200 100"
      width={width}
      height={width / 2}
      aria-hidden="true"
      style={{ display: "block", ...style }}
    >
      {wedges}
      {/* lilac core — Bolden "Purple" */}
      <path d={`M${cx - 24},${cy} A24,24 0 0 1 ${cx + 24},${cy} Z`} fill={C.tintSoft} />
    </svg>
  );
}

export function MeOnMound({
  flavor = C.flavorFunctional,
  width = 160,
  style,
}: {
  flavor?: string;
  width?: number;
  style?: React.CSSProperties;
}) {
  const meW = Math.round(width * 0.3);
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 0,
        ...style,
      }}
    >
      <Image
        src={BRAND.logos.markPng}
        width={meW}
        height={meW}
        alt="Mé — the shroomé sheep"
        style={{ marginBottom: Math.round(-width * 0.015) }}
      />
      <SunburstMound flavor={flavor} width={width} />
    </span>
  );
}
