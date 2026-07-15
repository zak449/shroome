# Creative Director Review — Bolden Identity, One Day In

> Date: 2026-07-15
> Author: Creative Director (Claude session)
> Canon: `Brand/bolden-identity-extraction.md` §b–§e · `Brand/Photography & Image Direction/image-guidelines.md`
> Scope reviewed: homepage, /flavors/*, /drop, /refer, LPShell + LP pages, /lp/pour, 404, `Marketing/Creative/product-creative/*`, `public/og-image.jpg`, `app/lib/emails.ts`

---

## 1. Verdict — what shipped well

**Grade: B+.** The token swap landed cleanly (brand-sync passes), the R02 sachet art is treated as untouchable everywhere (correct), and three moments are genuinely excellent:

- **`public/og-image.jpg`** — the best digital brand asset we have. Full sunburst rays, wordmark, Mé on the lilac mound. This IS the identity at 1200×630. Keep, never touch.
- **The starburst hero treatment on the homepage "Pick your flavor" section** (`app/page.tsx` conic-gradient rays + warm glow behind the floating sachets) — dramatic, warm, on-guideline ("product floats in light"). Best section on the site.
- **The drop ledger** (`/drop`, LPShell) — the rotated "sold out" stamp, mono ledger numbers, pulse dot. Honest scarcity with packaging-sticker energy. Very Bolden.

**Where it was flat before today's pass:**

- Mé existed only as a 32px nav chip. The character canon *encourages* Mé as a personality; she appeared nowhere at scale. "Sheep happens" on the 404 had **no sheep**.
- The sunburst mound — the single most recognizable piece of the R02 art — existed only inside product imagery, never as a native web motif.
- The flavor pages labeled themselves with a generic mono tag ("Flavor Profile") instead of the canonical flavor pill (flavor name, flavor color — the packaging's own device).
- Loading/empty states were generic ("Submitting...", "…") in a brand whose whole promise is a 15-second pour.
- One canon tension to flag (not changed — founder call): the homepage nav + hero and several flavor-page navs sit on **Strawberry pink at 85%**. Guidelines prefer the logotype/symbol placed on **Green or Purple institutional backgrounds**. The pink is energetic and I wouldn't kill it globally, but the *nav bar specifically* (where the mark lives) would be more canonical on Purple `#E3D5F7` or Green. Recommend A/B before launch.
- Second flag: `accent` and `accentMuted` both collapsed to Matcha `#7A881F` per the extraction doc's open question. CTAs currently lean on ink buttons, which works — but if we ever want a louder CTA, Strawberry-as-accent is the documented option.

---

## 2. What I elevated (file + change — all small, all reversible)

**New shared motif — `app/Motif.tsx`**
- `SunburstMound` — the R02 sachet mound rebuilt as a native SVG: alternating Green / flavor-color / Matcha rays, lilac Purple core. Parametrized by flavor color so Strawberry and Vanilla pages each get their own colorway, exactly like the packaging.
- `MeOnMound` — Mé standing on her sunburst mound (sachet front / OG-image moment). Uses the **static delivered symbol** (`public/logo-mark.png`) — never outlined, rotated, distorted, recolored, or animated. New poses stay with Bolden.

**`app/globals.css`**
- `.flavor-pill` — the packaging pill tag as a utility (Syne 800 tracking-wide interim for Tarnac Bold; swap font when licensed).
- `.ticker-track:hover { animation-play-state: paused }` — the marquee pauses so the puns can actually be read.

**`app/page.tsx` (homepage)**
- Ticker now rotates the pun canon: `TEAR. POUR. DONE. ✦ GET SHEEP DONE ✦ ZERO JITTERS ✦ NICE TO MATCHA YOU`.
- Footer: `MeOnMound` (Strawberry colorway) closes the page above the provenance line — the sachet-front moment bookends the visit.
- Loading states de-genericized: `…` → `pouring…`, `Submitting...` → `Pouring it in…` (email, phone, and CTA forms).

**`app/flavors/strawberry/page.tsx` + `app/flavors/vanilla/page.tsx`**
- Generic "Flavor Profile" tag → canonical **flavor pill**: `STRAWBERRY` on `#FF6DC7` with Retro text; `VANILLA` on `#E4CB9F` with Green text — mirrors the sachet's own tag 1:1.
- `SunburstMound` divider (flavor colorway) rises into the footer edge — the sachet-bottom composition, page-scale.

**`app/not-found.tsx` (404)**
- "Sheep happens" finally has the sheep: `MeOnMound` above the headline, entering with the page's existing fade-up cadence. The strongest empty state we own now.

**`app/refer/page.tsx`**
- Success panel: Mé on the mound delivers the good news (she's literally the reward at 3 friends), and the panel title becomes "**nice to matcha you. now share it.**"
- Final CTA gets a `✦ get sheep done ✦` mono eyebrow.

**`app/drop/page.tsx`**
- Product cards get a hover lift (reduced-motion safe) — the grid had zero response to touch.
- `SunburstMound` divider opens "the lineup." section.
- Subscription teaser closes with the canon line: "*matcha for mé? the answer is always.*" — the pun was invented for exactly this always-on context.

**`app/lp/LPShell.tsx` (all 5 LPs: ritual/glow/calm/focus/pour)**
- `.lp-cta-btn` hover lift + accent glow; benefit-card hover lift (reduced-motion safe).
- Legal footer: static Mé mark + "Grown in Kyoto, Made in California" provenance line above the FDA copy — the ghost pages now sign off as the brand.

**`app/lp/DropAccessForm.tsx`** (used on /drop + all LPs)
- Done state: "nice to matcha you — we'll send the drop 002 link the moment it's live."
- `submitting...` → `pouring it in…`; button spinners → `pouring…`.

**`app/lib/emails.ts`**
- Welcome hero eyebrow: `✦ YOU'RE IN ✦` → `✦ NICE TO MATCHA YOU ✦` (pun canon).
- Email shell footer: 28px static Mé mark above the copyright — every send now closes with the character. (Public-URL PNG, email-client safe.)

Verified: `npx tsc --noEmit` clean · `node scripts/check-brand-sync.mjs` passes · eslint: zero new issues (all remaining findings pre-date this pass).

---

## 3. Hero-image art direction — regeneration notes for the Python pipeline

General: the R02 artwork itself is never redrawn — these notes are about **light, composition, and rasterization** only.

### `hero-both-kit-r02.jpg` + `hero-both-variety-r02.jpg` (duo shots, lilac field)
1. **Never crop the wordmark.** The strawberry sachet overlaps the vanilla sachet's `shroomé` wordmark (the "é" is swallowed). Reduce overlap to ≤8% of sachet width **or** stagger vertically (drop strawberry ~10–12% lower) so both wordmarks read completely. The wordmark is the one element we cannot sacrifice.
2. **Sell the depth.** The two sachets read as flat stickers — add a soft contact shadow where strawberry passes over vanilla (blurred, ~12–15% opacity, warm-toned per guidelines: "shadows lean warm, never pure black").
3. **Ray contrast:** `both-variety` has visible-but-soft rays (good); `both-kit` has essentially none. Normalize both to the variety level — the starburst is the signature treatment, it should read at thumbnail size.
4. **Fix the muddy glyph.** The small dark element at the right edge of each mound (the grazing-Mé/berry cluster from the R02 art) rasterizes pixelated/muddy at output size and reads as a compression artifact. Re-rasterize the sachet art from the R02 PDF at 2× target resolution before compositing.

### `hero-strawberry-r02.jpg` (single, pink field)
5. Rays are ~3% contrast — below perception; the "starburst" currently reads as a plain vignette. Target **6–8% luminance delta**, warm-tinted (creamy, not white-clinical).
6. Composition is dead-center with equal margins → static. Raise the sachet ~4% and originate the burst behind the tear cap, so "rip & pour" sits in the brightest zone. Keep the slight tilt — that's the energy the guidelines ask for.

### `hero-vanilla-r02.jpg` (single, beige field)
7. Beige sachet elements on a beige field = lowest-pop image in the set, plus a reddish cast creeping into the corners. Two options: (a) neutralize the corner cast and push ray contrast harder, or (b) — my preference — move vanilla's hero onto **Purple `#E3D5F7`**, the canon institutional background, which flatters the beige pill and green wordmark and differentiates the two flavor heroes.

### `me-keychain-hero.jpg`
8. Charm cluster floats high-center with ~45% dead space below. Re-center the cluster (or crop ~20% tighter square). Center the light burst behind the **charms**, not inside the wire loop — right now the rays crop against the ring and read as a smudge.

### `eye-gels-hero.jpg`
9. Gels occupy ~25% of frame width and stack like a colon — clinical, against the "energy over stillness" rule. Scale up ~40%, offset in a casual diagonal, and move from beige to **Purple or blush** field (the gels are Purple-based product; beige mutes them). Once the Bolden wool-grain texture arrives, this image wants it most.

### `public/og-image.jpg`
10. **No notes. Ship it everywhere.** Use it as the light/composition reference target for all pipeline regenerations above.

---

## 4. Wishlist for Bolden (asset requests, in priority order)

1. **Mé pose SVG library** — the expressive poses as standalone vectors: walking, tumbling, jumping, pouring, holding a cup, plus the sachet-back tear/pour/stir trio. Highest-leverage ask: it unlocks the how-it-works steps (tear/pour/hit with matching poses), loaders (pouring Mé), the refer ladder (jumping Mé at tier 3), and empty states. Today we can only ever place the one static symbol.
2. **Wool-grain texture files** — guidelines p.32 reference a Drive folder (`1onOcZI2rqKLQbUnxYelWbTh50AnPyPpG`) we still can't access. Needed for panel/imagery texture (and the eye-gels reshoot).
3. **Pattern library as vectors** — the eyepatch all-over Mé pattern, the sunburst mound, the cloud-outline stamp, and functional icons as SVGs. (I rebuilt the mound by hand in `app/Motif.tsx`; Bolden's source vector should replace/verify it.)
4. Retro `#FEFFF8` logo export + combined symbol-and-wordmark lockup.
5. Tarnac + Tarnac Sans web license guidance (blocking the real typography — every "Tarnac-Bold-style" element on the site is Syne 800 interim).
6. Scalloped cloud panel vector (sachet-back "MAKING YOUR SHROOMÉ" panel) — wanted for the recipe/how-to modules.

---

## 5. Open creative questions for the founder

- Nav-bar background: Strawberry 85% vs. canonical Purple/Green for mark placement (§1 flag).
- CTA hue: keep ink buttons, or promote Strawberry to `accent` per the extraction doc's open question.
- The hidden-slab Easter egg ("Get sheep done" / "Bringing good energy" printed inside the sachet slab) has no web echo yet — a candidate for the post-purchase / welcome-page moment when that page gets its pass.
