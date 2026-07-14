// ─────────────────────────────────────────────────────────────────────────────
// BRAND — single source of truth for the Shroomé brand identity.
//
// Every brand color, font stack, logo path, and identity string the app uses
// lives here (or in the mirrored CSS custom-properties block at the top of
// app/globals.css — keep the two in sync; `node scripts/check-brand-sync.mjs`
// verifies they match).
//
// HOW TOKENS ARE CONSUMED
//   • CSS / styled-jsx / inline style objects  → var(--brand-*) custom props
//     (defined in app/globals.css, mirroring `colors` + `fonts` below).
//   • JS-literal contexts that cannot resolve CSS variables — email HTML
//     (app/lib/emails.ts), OG images rendered by Satori (app/**/opengraph-
//     image.tsx), the web manifest (app/manifest.ts), SVG presentation
//     attributes, and data-URI SVGs — import BRAND directly.
//
// NAMING: tokens are semantic, not hue-based ("ink", not "navy") so a full
// palette swap is a value change here + in globals.css, not a rename.
// See Brand/reskin-runbook.md for the full re-skin procedure.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "shroomé",
  legalName: "ZSQUARED INC",
  domain: "drinkshroome.com",
  siteUrl: "https://www.drinkshroome.com",
  tagline: "Café Energy. Home Address.",
  /** Provenance lockup — sourcing sections, PDP origin strips, packaging echo. */
  provenance: "Grown in Kyoto, Made in California",

  colors: {
    // Bolden identity system (guidelines p.20) — see Brand/bolden-identity-extraction.md §b.
    /** Primary dark — text, dark sections, footer. Bolden "Green". */
    ink: "#2D341A",
    /** Page background / light surfaces. Bolden "Retro" off-white. */
    canvas: "#FEFFF8",
    /** Hero accent — Bolden "Matcha". Contrast is 3.9:1 on canvas: CTAs must
     *  render large/bold text or invert (ink button + accentContrast text). */
    accent: "#7A881F",
    /** Text/icon color used ON accent surfaces. Bolden "Retro". */
    accentContrast: "#FEFFF8",
    /** Deep companion to accent — link hovers, <em> emphasis on light bg. Bolden "Green". */
    accentDeep: "#2D341A",
    /** Warm pop — italic highlights, error/notice text. Bolden "Mango". */
    accentWarm: "#FA9427",
    /** Softer warm pop used in email art direction. Bolden "Vanilla". */
    accentWarmSoft: "#E4CB9F",
    /** Muted green — blog links, "Ingredients" category. Bolden "Matcha". */
    accentMuted: "#7A881F",
    /** Darker muted green — hover state of accentMuted (derived ~70% Matcha). */
    accentMutedDeep: "#5A6517",
    /** Strawberry flavor tag. Bolden "Strawberry" (Pantone 212C). */
    flavorStrawberry: "#FF6DC7",
    /** Functional/vanilla flavor tag. Bolden "Vanilla" (Pantone 468C). */
    flavorFunctional: "#E4CB9F",
    /** Soft supporting tint — calm gradients, email shell bg. Bolden "Purple" (Pantone 263C). */
    tintSoft: "#E3D5F7",
    /** Blush supporting tint — gradient partner of flavorStrawberry (derived ~20% Strawberry). */
    tintBlush: "#FFE2F4",
  },

  /**
   * RGB triplets of the tokens above (kept in sync) for rgba() composition.
   * CSS consumes the mirrored `--brand-*-rgb` vars; JS contexts use alpha().
   */
  rgb: {
    ink: "45,52,26",
    canvas: "254,255,248",
    accent: "122,136,31",
    accentWarm: "250,148,39",
    accentMuted: "122,136,31",
    flavorStrawberry: "255,109,199",
    flavorFunctional: "228,203,159",
  },

  fonts: {
    /** Display serif — headlines, editorial italics. */
    display: "'Instrument Serif', Georgia, serif",
    /** Body sans — UI, paragraphs, buttons. */
    body: "'Syne', system-ui, sans-serif",
    /** Mono — stats, ledger numbers, micro-labels. */
    mono: "'DM Mono', monospace",
    /** Bare family names (Satori/next-og font registration, SVG attrs). */
    displayName: "Instrument Serif",
    bodyName: "Syne",
    monoName: "DM Mono",
    /** Web-font stylesheet loaded in app/layout.tsx <head>. */
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap",
    /** Local TTFs in app/fonts/ used by opengraph-image renderers. */
    files: {
      displayRegular: "InstrumentSerif-Regular.ttf",
      displayItalic: "InstrumentSerif-Italic.ttf",
      bodyBold: "Syne-Bold.ttf",
    },
  },

  /**
   * Email-safe stacks (emails must use web-safe fonts, not web fonts).
   * Consumed by app/lib/emails.ts.
   */
  emailFonts: {
    display: "Georgia,'Times New Roman',Times,serif",
    body: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },

  /** Logo + icon assets under public/. Swap the files, keep the paths. */
  logos: {
    /** Square "S" mark (SVG). */
    mark: "/logo-mark.svg",
    /** Square "S" mark (PNG, used in nav headers + JSON-LD logo). */
    markPng: "/logo-mark.png",
    /** Dark wordmark lockup. (file name is legacy — replace at re-skin) */
    wordmarkDark: "/logo-navy.png",
    favicon: "/favicon.svg",
    appleTouchIcon: "/apple-touch-icon.png", // 180×180 PNG
    icon192: "/icon-192.png", // 192×192 PNG
    icon512: "/icon-512.png", // 512×512 PNG
    /** Static share image fallback. 1200×630 JPG. */
    ogImage: "/og-image.jpg",
  },

  /** PWA manifest colors (app/manifest.ts). */
  manifest: {
    backgroundColor: "#2D341A",
    themeColor: "#2D341A",
  },
} as const;

/**
 * rgba() literal from a BRAND.rgb token — for JS contexts that need literal
 * color strings (emails, OG images). CSS should use
 * `rgba(var(--brand-<token>-rgb), a)` instead.
 */
export function alpha(token: keyof typeof BRAND.rgb, a: number): string {
  return `rgba(${BRAND.rgb[token]},${a})`;
}

/** Percent-encode a hex color for use inside `url("data:image/svg+xml,…")`. */
export function svgHex(hex: string): string {
  return hex.replace("#", "%23");
}
