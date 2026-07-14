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
    /** Primary dark — text, dark sections, footer. (was "navy" #1B1F3B) */
    ink: "#1B1F3B",
    /** Page background / light surfaces. (was "cream" #FDF4EE) */
    canvas: "#FDF4EE",
    /** Hero accent — CTAs, highlights, focus rings. (was "lime" #C8FF3A) */
    accent: "#C8FF3A",
    /** Text/icon color used ON accent surfaces. Currently same as ink. */
    accentContrast: "#1B1F3B",
    /** Deep companion to accent — link hovers, <em> emphasis on light bg. (was "matcha green" #2D4A2D) */
    accentDeep: "#2D4A2D",
    /** Warm pop — italic highlights, error/notice text. (was "coral" #FF7043) */
    accentWarm: "#FF7043",
    /** Softer warm pop used in email art direction. (was "peach" #E8936D) */
    accentWarmSoft: "#E8936D",
    /** Muted green — blog links, "Ingredients" category. (was "sage" #809463) */
    accentMuted: "#809463",
    /** Darker muted green — hover state of accentMuted. */
    accentMutedDeep: "#5A7A3A",
    /** Strawberry flavor tint. (was "pink" #FFB7D1) */
    flavorStrawberry: "#FFB7D1",
    /** Functional/vanilla flavor tint. (was "lavender" #D4B8E0) */
    flavorFunctional: "#D4B8E0",
    /** Soft supporting tint — calm gradients, email shell bg. (was "soft lavender" #E8D5F0) */
    tintSoft: "#E8D5F0",
    /** Blush supporting tint — gradient partner of flavorStrawberry. (was "blush" #FFE0EC) */
    tintBlush: "#FFE0EC",
  },

  /**
   * RGB triplets of the tokens above (kept in sync) for rgba() composition.
   * CSS consumes the mirrored `--brand-*-rgb` vars; JS contexts use alpha().
   */
  rgb: {
    ink: "27,31,59",
    canvas: "253,244,238",
    accent: "200,255,58",
    accentWarm: "255,112,67",
    accentMuted: "128,148,99",
    flavorStrawberry: "255,183,209",
    flavorFunctional: "212,184,224",
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
    backgroundColor: "#0A0A0A",
    themeColor: "#0A0A0A",
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
