# Re-skin Runbook — New Brand Identity Swap

**Purpose:** Execute the full brand overhaul ("Mé the sheep" mascot identity — new palette, new logo files, possibly new type) as a **config swap, not a rewrite**.
**Prepared:** 2026-07-14. Supersedes the "Brand Asset Refresh SOP" in `Executive/CEO/Vision & Strategy/launch-roadmap.md` for code-level steps (third-party/social steps there still apply — see Step 8).

The codebase is fully tokenized. Every brand color, font stack, and logo path flows from **one file pair**:

| File | Role |
|---|---|
| `app/lib/brand.ts` | **Source of truth** — JS constants consumed by emails, OG images, manifest, SVG attributes, data-URI SVGs, `welcome` page hex-alpha composition |
| `app/globals.css` (`:root` block, lines ~9–37) | **CSS mirror** — `--brand-*` custom properties consumed by all styled-jsx / inline styles |

Keep them in sync. `node scripts/check-brand-sync.mjs` verifies (exit 0 = in sync).

---

## Step 1 — Update color tokens

Edit **both** `app/lib/brand.ts` (`colors` + `rgb`) and `app/globals.css` (`:root`).

| Token (brand.ts / CSS var) | Current value | Old name | Likely new value |
|---|---|---|---|
| `ink` / `--brand-ink` | `#1B1F3B` | navy | deep dark brownish-green |
| `canvas` / `--brand-canvas` | `#FDF4EE` | cream | cream/off-white |
| `accent` / `--brand-accent` | `#C8FF3A` | lime | TBD |
| `accentContrast` / `--brand-accent-contrast` | `#1B1F3B` | — | text color ON accent surfaces (see note below) |
| `accentDeep` / `--brand-accent-deep` | `#2D4A2D` | matcha green | TBD (link hovers, `<em>`) |
| `accentWarm` / `--brand-accent-warm` | `#FF7043` | coral | TBD (highlights + error text) |
| `accentWarmSoft` / `--brand-accent-warm-soft` | `#E8936D` | peach | TBD (email art) |
| `accentMuted` / `--brand-accent-muted` | `#809463` | sage | TBD (blog links) |
| `accentMutedDeep` / `--brand-accent-muted-deep` | `#5A7A3A` | — | TBD (blog link hover) |
| `flavorStrawberry` / `--brand-flavor-strawberry` | `#FFB7D1` | pink | flavor tint — may stay |
| `flavorFunctional` / `--brand-flavor-functional` | `#D4B8E0` | lavender | flavor tint — may stay |
| `tintSoft` / `--brand-tint-soft` | `#E8D5F0` | soft lavender | TBD |
| `tintBlush` / `--brand-tint-blush` | `#FFE0EC` | blush | TBD |

**Also update the RGB triplets** (`BRAND.rgb` and every `--brand-*-rgb` var) — they must match the hexes above; they feed all `rgba(var(--brand-*-rgb), α)` translucency.

**`accentContrast` note:** the old accent (lime) was light, so text on accent surfaces used `ink` directly — the token exists but most on-accent text literally references ink. If the new accent is **dark**, grep for `--brand-accent` usages paired with `--brand-ink` text and switch those to `--brand-accent-contrast` (then set it to canvas/white).

### Derived shades intentionally left as literals (re-derive from new palette)
- Page-background gradient stops `#F0E4D8 / #EDE0D4 / #E8D8CC` (blog, faq, terms, privacy, recipes, refer, not-found headers) — warm darkenings of old canvas.
- `#d4ff5a` — accent hover lighten in `app/not-found.tsx` (`.nf-link-accent:hover`).
- Blog **category chip colors** in `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/[slug]/opengraph-image.tsx` (`categoryColors` maps: `#B44C7A`, `#6B4D7A`, `#4A6B1A`, `#E8F0DD`, `#FFE4EE`, `#F0FFD0`, `#EDE4F0`, `#5A7A3A`) — per-category derivations, restyle with the new palette.
- `rgba(255,255,255,…)` / `#fff` / `#000` and other non-brand utility colors — out of scope by design.
- `manifest` colors `#0A0A0A` — tokenized as `BRAND.manifest.*`; set to new ink or keep near-black.

## Step 2 — Update typography tokens

If type changes, edit in **both files**:
- `brand.ts`: `fonts.display / body / mono` (full stacks), `fonts.displayName / bodyName / monoName` (bare names — used by OG renderers + SVG attrs), `fonts.googleFontsHref` (the `<link>` in `app/layout.tsx` reads this).
- `globals.css`: `--brand-font-display / -body / -mono`.
- **OG local TTFs**: drop new files into `app/fonts/` and update `brand.ts` `fonts.files.*` (currently `InstrumentSerif-Regular.ttf`, `InstrumentSerif-Italic.ttf`, `Syne-Bold.ttf`). Satori needs real TTF/OTF (no variable-font woff2).
- Email stacks stay **web-safe**: update `brand.ts` `emailFonts.display / body` to the closest web-safe equivalents of the new type.

Run `node scripts/check-brand-sync.mjs` after Steps 1–2.

## Step 3 — Replace asset files in `public/`

Replace **files in place** (paths are tokenized in `BRAND.logos`; keeping filenames means zero code edits — but see rename note):

| File | Required spec |
|---|---|
| `favicon.svg` | SVG, works at 32×32; new mark |
| `apple-touch-icon.png` | **180×180** PNG, opaque bg |
| `icon-192.png` | **192×192** PNG (PWA) |
| `icon-512.png` | **512×512** PNG (PWA — referenced by `app/layout.tsx` icons + manifest) |
| `og-image.jpg` | **1200×630** JPG (static share fallback) |
| `logo-mark.svg` / `logo-mark.png` | square mark (PNG used in nav headers + JSON-LD `logo` in `app/layout.tsx`) |
| `logo-navy.png` | dark wordmark lockup — legacy filename; if renaming (e.g. `logo-ink.png`), update `BRAND.logos.wordmarkDark` only |
| `email-hero-cup.jpg`, `email-clouds-bg.jpg`, `sachets-both.png`, `sachet-vanilla.png`, `sachet-strawberry.png`, `lifestyle-hero.png` | re-shoot/re-render in new art direction (emails + LP heroes reference these) |

Bust caches: hard-refresh; favicons may need `?v=2` query or a day of patience.

## Step 4 — Dynamic OG images

`app/opengraph-image.tsx` and `app/blog/[slug]/opengraph-image.tsx` already pull colors/fonts from `BRAND` — they restyle automatically. Still:
- Re-check composition: blob shapes/opacities were tuned to the pastel palette; adjust opacities if new hues muddy.
- One literal remains: `rgba(255,160,180,0.5)` decorative blob in `app/opengraph-image.tsx` — restyle or tokenize.
- Update blog `categoryColors` map (Step 1 note).
- If the new identity includes the Mé mascot, consider embedding the mark (read PNG from `public/`, pass as data URI to an `<img>` inside the renderer).
- Verify locally: `npx next build` then check `/opengraph-image` and a `/blog/<slug>/opengraph-image` render.

## Step 5 — Manifest & identity strings

- `BRAND.manifest.backgroundColor / themeColor` (`app/manifest.ts` reads them).
- `BRAND.name / tagline / legalName` if the agency rework touches naming — note: page copy and `metadata` titles across `app/**/page.tsx` still hard-code "shroomé" strings (copy, not skin — sweep separately if the wordmark spelling changes).

## Step 6 — Emails

`app/lib/emails.ts` reads every color from `brand.ts` (literal hex is interpolated at send time — correct for email clients; CSS vars don't work in email).

Checklist (keyed from the old Brand Asset Refresh SOP):
- [ ] Tokens updated (Step 1) — templates restyle automatically.
- [ ] Verify gradients still "flow" (the design melts sections into each other; new hues may need different gradient stops/alphas — all in `emails.ts` via `alpha("token", α)` calls).
- [ ] Preview: `npm run dev` → `GET /api/preview-email?type=welcome` and `?type=sachet`.
- [ ] Replace email image assets (Step 3) — templates hot-link `https://www.drinkshroome.com/...` images, so **deploy new public/ assets before the next send**.
- [ ] Re-export `Marketing/Email/Flows/01-Welcome-Flow.html` and `02-Whats-Inside-Flow.html` from the preview route (save-page-as against `/api/preview-email`).
- [ ] Klaviyo: update logo in templates + RCS sender profile banner/logo (Settings → Text message → Sender info).

## Step 7 — Verify

1. `node scripts/check-brand-sync.mjs` — token mirror in sync.
2. `npx next build` — must pass clean (99 routes as of 2026-07-14).
3. Grep guard — **no old hexes may survive** (swap in the OLD values being retired):
   `grep -rni "#1B1F3B\|#FDF4EE\|#C8FF3A\|#FFB7D1\|#D4B8E0\|#E8D5F0\|#FFE0EC" app/ --include="*.ts*" --include="*.css"` → only `brand.ts` + `globals.css` (until Step 1 replaces them, after which: zero).
4. Smoke-test emails render literal hex: see `app/api/preview-email` output — no `var(--` may appear in email HTML.

## Step 8 — Visual QA (contrast re-verification — REQUIRED, hues are changing)

Old palette's contrast assumptions (light accent on dark ink; dark text on pastels) may invert. Per page, check at 4.5:1 (text) / 3:1 (UI):

- [ ] **/** (home): hero text on new canvas; CTA text on accent (`accentContrast`!); ticker; comparison table `chk-*` classes (globals.css); footer on ink.
- [ ] **/flavors/**: dark-tint sections — flavor tints may change temperature.
- [ ] **/founders + /founders/checkout + /founders/success**: price/CTA blocks on ink.
- [ ] **/drop, /lp/{ritual,glow,calm,focus,pour}**: `LPShell` dark-hero variant (focus) uses canvas-on-ink; caffeine-curve SVG strokes (`alpha("ink", …)` at 0.25–0.55 — re-check visibility on new canvas); ledger stamp text on flavor tints.
- [ ] **/refer**: tier badges (`accentDeep` bg + `accent` text — highest risk pair if both hues shift).
- [ ] **/faq, /blog (+posts), /recipes (+details), /terms, /privacy, /contact, /unsubscribe, /welcome, 404**: link colors (`accentMuted`) on gradient backgrounds; hover states (`accentDeep`).
- [ ] **StickyCTA / ExitPopup / MobileNav / BackToTop / Breadcrumb**: overlay translucencies use `--brand-*-rgb` — re-tune alphas if new ink is lighter/darker than old navy.
- [ ] **Focus ring** (`globals.css *:focus-visible`, accent): 3:1 against both canvas and ink surfaces.
- [ ] **Emails** in dark-mode clients (Gmail dark inverts light bgs).
- [ ] **Print stylesheet** (recipes) — unaffected (monochrome) but spot-check one recipe print preview.
- [ ] OG images legible at thumbnail size (Slack/iMessage preview).

Then continue with the old SOP's Steps 4–6 (Klaviyo/Resend/GA, Shopify when migrated, social profiles) — unchanged, in `Executive/CEO/Vision & Strategy/launch-roadmap.md`.

---

## Appendix — token consumption map

| Consumer | Mechanism |
|---|---|
| styled-jsx / `<style>` blocks / inline `style={{}}` across all pages & components | `var(--brand-*)` / `rgba(var(--brand-*-rgb), α)` |
| Tailwind utilities (`text-accent`, `text-flavor-strawberry`, `font-sans`, … — dashboard) | `@theme inline` in globals.css → brand vars |
| `app/lib/emails.ts` | imports `BRAND`, `alpha()` — literal hex at send time |
| `app/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx` | imports `BRAND` (+`alpha`) — Satori can't resolve CSS vars |
| `app/manifest.ts` | `BRAND.manifest.*` |
| `app/layout.tsx` | `BRAND.fonts.googleFontsHref` (web-font `<link>`) |
| SVG presentation attributes (`app/lp/LPShell.tsx` caffeine curve) | `BRAND.colors.*` / `alpha()` — SVG attrs can't resolve CSS vars |
| Data-URI SVG background patterns (11 pages) | `${svgHex(BRAND.colors.ink)}` |
| `app/welcome/page.tsx` | `BRAND.colors.*` literals (composes 8-digit hex-alpha like `` `${C.canvas}20` `` — impossible with vars) |
| `app/recipes/data.ts` | `BRAND.colors.*` (recipe card color fields) |
