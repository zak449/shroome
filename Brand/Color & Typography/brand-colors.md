# shroomé Brand Colors & Typography

> Last updated: 2026-07-15 (re-skinned to the Bolden identity)
> Owner: Brand Director
> Source of truth: `Brand/bolden-identity-extraction.md` §b + `app/lib/brand.ts`. This doc mirrors those tokens in human terms — if they ever disagree, `brand.ts` wins.

---

## Primary Palette (Bolden)

### Green — #2D341A
- **Role:** Primary dark color (token: `ink` / `accentDeep`)
- **Usage:** Body text, headings, navigation, footer backgrounds, dark sections, packaging line art
- **Accessibility:** Use on Retro (#FEFFF8) backgrounds for maximum contrast
- **Do not** use Green text on Matcha, Strawberry, or any mid-tone accent for small copy — contrast will fail

### Retro — #FEFFF8
- **Role:** Primary light / background color (token: `canvas` / `accentContrast`)
- **Usage:** Page backgrounds, card surfaces, form fields, email body backgrounds, sachet/box front stock
- **Notes:** This is the default canvas for all digital and print materials. It is a warm off-white — not pure white (#FFFFFF).

### Matcha — #7A881F
- **Role:** Accent / brand green (token: `accent` / `accentMuted`)
- **Usage:** Hero accents, Mé body, pattern rays, links, badges, highlights
- **Pairing:** Contrast is only ~3.9:1 on Retro and ~3.3:1 on Green. For CTAs, render large/bold text **or invert** — Green button with Retro text is the primary CTA lockup.
- **Do not** rely on Matcha for small body text on light or dark backgrounds — it is a signal/large-type color.

---

## Secondary Palette (Bolden)

### Strawberry — #FF6DC7
- **Role:** Strawberry flavor association (token: `flavorStrawberry`; Pantone 212 C)
- **Usage:** Strawberry product cards, flavor pill tags, decorative gradients, accent blocks
- **Pairing:** Works as a gradient endpoint with its blush tint (#FFE2F4) or Vanilla

### Vanilla — #E4CB9F
- **Role:** Vanilla / "functional" flavor association (token: `flavorFunctional` / `accentWarmSoft`; Pantone 468 C)
- **Usage:** Vanilla flavor pill tags, warm email art direction, sunburst rays on the vanilla pack
- **Note:** Replaces the retired lavender association — the functional/vanilla SKU tint is now Vanilla beige.

### Mango — #FA9427
- **Role:** Warm pop / future mango flavor (token: `accentWarm`; Pantone 2011 C)
- **Usage:** Italic highlights, error/notice text, future mango flavor tag

### Purple — #E3D5F7
- **Role:** Institutional pastel tint (token: `tintSoft`; Pantone 263 C)
- **Usage:** Calm section backgrounds, box interiors, email shell background, hover surfaces
- **Note:** This is the Bolden supporting pastel — it replaces the old "Soft Lavender".

### Chocolate — #956A3C
- **Role:** Future chocolate flavor tag (secondary; no Pantone given). Not in the digital token set yet.

---

## Color Usage Guidelines

### Backgrounds
| Context | Color | Hex |
|---|---|---|
| Default page background | Retro | #FEFFF8 |
| Dark sections / footer | Green | #2D341A |
| Feature highlight / calm sections | Purple | #E3D5F7 |
| Strawberry product sections | Strawberry (or blush tint #FFE2F4) | #FF6DC7 |
| Vanilla product sections | Vanilla | #E4CB9F |

### Text
| Context | Color | Hex |
|---|---|---|
| Body text on light backgrounds | Green | #2D341A |
| Body text on dark backgrounds | Retro | #FEFFF8 |
| Links / interactive text | Green | #2D341A |
| Link hover | Matcha | #7A881F |

### Buttons
| Type | Background | Text | Border |
|---|---|---|---|
| Primary CTA | Green #2D341A | Retro #FEFFF8 | None |
| Accent CTA (large/bold only) | Matcha #7A881F | Retro #FEFFF8 | None |
| Secondary | Transparent | Green #2D341A | Green 1px |
| Ghost (dark bg) | Transparent | Retro #FEFFF8 | Retro 1px |

### Gradients
- **Calm gradient:** Purple (#E3D5F7) to Strawberry-blush (#FFE2F4) — hero sections, cloud backgrounds
- **Warm gradient:** Vanilla (#E4CB9F) to Retro (#FEFFF8) — soft emphasis
- **Flavor gradient:** Strawberry (#FF6DC7) to Vanilla (#E4CB9F) — decorative use only

---

## Typography

> **Bolden's specified faces are Tarnac + Tarnac Sans (Sharp Type).** They are not yet licensed/self-hosted — until purchase, the site ships the interim OFL stack below (Instrument Serif + Syne). See `Brand/bolden-identity-extraction.md` §c and `Assets/Fonts/font-licenses.md`.

### Instrument Serif (interim display)
- **Role:** Display / Headings — fallback for Tarnac
- **Weight:** Regular (400), typically set in *italic*
- **Usage:** H1, H2, hero headlines, pull quotes, product names
- **Source:** Google Fonts (SIL Open Font License) — **Fallback:** Georgia, serif

### Syne (interim body)
- **Role:** Body / UI — fallback for Tarnac Sans
- **Weight:** Bold (700) for emphasis, Regular (400) for body, Medium (500) for navigation
- **Usage:** Body copy, buttons, navigation, labels, form text, email body
- **Source:** Google Fonts (SIL Open Font License) — **Fallback:** system-ui, sans-serif

### DM Mono (site-only stat role)
- **Role:** Stats, ledger numbers, micro-labels (not a Bolden-specified face; site convention)
- **Source:** Google Fonts (OFL)

### Type Scale (Web)
| Element | Font | Weight | Size | Line Height |
|---|---|---|---|---|
| H1 | Instrument Serif | 400 italic | 48–64px | 1.1 |
| H2 | Instrument Serif | 400 italic | 36–48px | 1.15 |
| H3 | Syne | 700 | 24–28px | 1.2 |
| Body | Syne | 400 | 16–18px | 1.5 |
| Small / Caption | Syne | 400 | 13–14px | 1.4 |
| Button | Syne | 700 | 14–16px | 1.0 |
| Nav links | Syne | 500 | 14–16px | 1.0 |

---

## Quick Reference — Hex Values

```
Green (ink):       #2D341A
Retro (canvas):    #FEFFF8
Matcha (accent):   #7A881F
Strawberry:        #FF6DC7
Vanilla:           #E4CB9F
Mango:             #FA9427
Purple (tint):     #E3D5F7
Chocolate:         #956A3C
```

---

## Anti-Patterns

- Never use pure black (#000000) — always use Green (#2D341A)
- Never use pure white (#FFFFFF) as a surface — always use Retro (#FEFFF8)
- Never set small body text in Matcha — it is a large-type / fill signal color
- Never put Green small-text on Matcha, Strawberry, or Vanilla — invert to Retro text or enlarge
- Never use more than two accent colors in a single section
