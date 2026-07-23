// ─────────────────────────────────────────────────────────────────────────────
// BRAND — single source of truth for the Shroomé brand identity.
// Identity v2 — Bolden rebrand (05_Brand Presentation / 06_Packaging, 2026).
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
// NAMING: tokens are semantic, not hue-based ("ink", not "forest") so a full
// palette swap is a value change here + in globals.css, not a rename.
//
// TYPE NOTE: the Bolden identity specifies Tarnac Sans (commercial, no license
// on file). Live text uses the closest OFL stand-ins — Schibsted Grotesk for
// the grotesque titles/body voice, Besley (Clarendon) for the serif sticker /
// tag caps seen on packaging. The wordmark + lockups ship as image assets cut
// from the Bolden files, so brand-critical type is always authentic. When a
// Tarnac Sans license is purchased, swap the stacks here + in globals.css.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "shroomé",
  legalName: "ZSQUARED INC",
  domain: "drinkshroome.com",
  siteUrl: "https://www.drinkshroome.com",
  tagline: "Pour. Swirl. Go.",

  colors: {
    /** Primary dark — text, dark sections, footer. Bolden "green" #2D341A. */
    ink: "#2D341A",
    /** Page background / light surfaces. Bolden "retro" cream #FEFFF8. */
    canvas: "#FEFFF8",
    /** Action color — CTAs, highlights, focus rings. Bolden "matcha" #7A881F.
     *  (Pink is a FLAVOR color, not a brand accent — see flavorStrawberry.) */
    accent: "#7A881F",
    /** Text/icon color used ON accent surfaces. */
    accentContrast: "#FEFFF8",
    /** Deep companion to accent — link hovers, <em> emphasis. Bolden "matcha" #7A881F. */
    accentDeep: "#7A881F",
    /** Warm pop — italic highlights, notice text. Bolden "mango" #FA9427. */
    accentWarm: "#FA9427",
    /** Softer warm pop used in email art direction. Bolden "vanilla" #E4CB9F. */
    accentWarmSoft: "#E4CB9F",
    /** Muted green — blog links, "Ingredients" category. Bolden "matcha" #7A881F. */
    accentMuted: "#7A881F",
    /** Darker muted green — hover state of accentMuted. */
    accentMutedDeep: "#5C661A",
    /** Strawberry flavor tint. Bolden flavor "strawberry" #FF6DC7. */
    flavorStrawberry: "#FF6DC7",
    /** Vanilla flavor tint. Bolden flavor "vanilla" #E4CB9F. */
    flavorFunctional: "#E4CB9F",
    /** Soft supporting tint — hero fields, email shell bg. Bolden "purple" #E3D5F7. */
    tintSoft: "#E3D5F7",
    /** Blush supporting tint — gradient partner of flavorStrawberry. */
    tintBlush: "#FFD9EF",
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
    /** Display grotesque — headlines, lockups. (Tarnac Sans stand-in.) */
    display: "'Schibsted Grotesk', system-ui, sans-serif",
    /** Body sans — UI, paragraphs, buttons. (Tarnac Sans stand-in.) */
    body: "'Schibsted Grotesk', system-ui, sans-serif",
    /** Label serif — sticker/tag caps, stats, micro-labels (packaging serif). */
    mono: "'Besley', Georgia, serif",
    /** Bare family names (Satori/next-og font registration, SVG attrs). */
    displayName: "Schibsted Grotesk",
    bodyName: "Schibsted Grotesk",
    monoName: "Besley",
    /** Web-font stylesheet loaded in app/layout.tsx <head>. */
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,700;0,800;1,400;1,700&family=Besley:wght@600;700&display=swap",
    /** Local TTFs in app/fonts/ used by opengraph-image renderers. */
    files: {
      displayRegular: "SchibstedGrotesk-Regular.ttf",
      displayItalic: "SchibstedGrotesk-Bold.ttf",
      bodyBold: "SchibstedGrotesk-Bold.ttf",
    },
  },

  /**
   * Email-safe stacks (emails must use web-safe fonts, not web fonts).
   * Consumed by app/lib/emails.ts.
   */
  emailFonts: {
    display: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    body: "'Helvetica Neue',Helvetica,Arial,sans-serif",
  },

  /** Logo + icon assets under public/. Swap the files, keep the paths. */
  logos: {
    /** mé sheep mark (SVG wrapper around the Bolden symbol). */
    mark: "/logo-mark.svg",
    /** mé sheep mark (PNG, used in nav headers + JSON-LD logo). */
    markPng: "/logo-mark.png",
    /** Dark wordmark lockup (Bolden groovy wordmark). (path name is legacy) */
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
    backgroundColor: "#FEFFF8",
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
