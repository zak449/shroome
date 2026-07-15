# Brand Manager — Zero-Tolerance Consistency Audit (post-Bolden re-skin)

> Date: 2026-07-15
> Author: Brand Manager (Claude session)
> Scope: entire brand surface — `app/`, `Marketing/`, `Product/`, `Executive/`, `scripts/`, `Brand/`
> Canon: `Brand/bolden-identity-extraction.md`, `Brand/Photography & Image Direction/image-guidelines.md`, `app/lib/brand.ts` (Bolden tokens: Green #2D341A ink · Retro #FEFFF8 canvas · Matcha #7A881F accent · Purple #E3D5F7 · Strawberry #FF6DC7 · Vanilla #E4CB9F · Mango #FA9427)

---

## Scorecard by category

| # | Category | Verdict |
|---|---|---|
| 1 | Wordmark / casing discipline | **PASS + FIXED** (6 fixes) |
| 2 | Tagline & mantra consistency | **PASS + FLAGGED** (no drift-to-fix; 3 flags) |
| 3 | Stat-row & claims discipline | **FIXED** (4 fixes) |
| 4 | Voice (no ritual/ceremony; lowercase; Mé she/her) | **PASS** |
| 5 | Flavor color discipline (no old pink/lavender) | **FIXED** (5 files) |
| 6 | Cross-artifact drift (theme / email / OG) | **PARTIAL FIX + FLAGGED** |

Brand-token sync check (`node scripts/check-brand-sync.mjs`): **PASS** — `app/lib/brand.ts` ↔ `app/globals.css` in sync.

---

## Fixes applied

### 1 — Wordmark / casing
- `app/lib/emails.ts` (footer copyright): `© <year> shroome` → `shroomé`.
- `app/api/waitlist/route.ts` (email from-name): `Shroomé Waitlist` → `shroomé Waitlist` (lowercase brand voice; not a grammatical sentence start).
- `Marketing/Social/tiktok-scripts.md` (×2, stage directions): `Shroome sachet` → `shroomé sachet`.
- `Marketing/Email/Flows/01-Welcome-Flow.html`: `<title>`, sachets `alt` text, and final CTA `EXPLORE SHROOME` → `EXPLORE SHROOMÉ`.
- `Marketing/Email/Flows/02-Whats-Inside-Flow.html`: `<title>` and sachet `alt` text → `shroomé`.
- (Footers in both flow files already carried `shroomé` + `ZSQUARED INC` from the CMO's in-place cleanup.)

### 3 — Stat-row & claims
- `app/blog/posts.ts` (3 passages) claimed reishi/chaga are **in shroomé** — the R02 formula is **lion's mane only** (reishi/cordyceps were the superseded April artwork per extraction §f). Corrected the product-ingredient claims to lion's mane only:
  - launch-recipes description: removed reishi from the product ingredient list.
  - antioxidants passage: "lion's mane and reishi in shroomé that provide immune-supporting beta-glucans" → "the lion's mane extract in shroomé — a functional mushroom studied for its immune-supporting beta-glucans" (kept the educational beta-glucan link; removed the product ingredient error).
  - adaptogen-routine passage: "combines lion's mane, reishi, and chaga" → "combines lion's mane".
- `Marketing/Email/Flows/02-Whats-Inside-Flow.html`: banner + strip beta-glucan phrasing ("200MG BETA GLUCANS" / "mushroom beta glucans") had already been neutralised by the CMO pass to "200MG LION'S MANE" / "lion's mane fruiting-body extract" — verified compliant.
- **Not changed (correctly out of scope):** the 500mg/5g/10g doses in `Marketing/Community/reddit-posts-ready.md` and `community-playbook.md` are the *author-personas'* own nootropic stacks and category education, not shroomé's stat row. The generic reishi/chaga/cordyceps education throughout `app/blog/posts.ts` (not asserting they are in the product) stays.

### 5 — Flavor color discipline (old palette purge)
- `Brand/Color & Typography/brand-colors.md`: **fully rewritten** from the old Navy/Cream/Lime/Pink/Lavender system to the Bolden palette (this doc still declared itself the active color reference while contradicting the re-skin — the single biggest stale-canon landmine). Typography section kept (Instrument Serif/Syne is the correct interim OFL stack) with a Tarnac note added.
- `Brand/Photography & Image Direction/image-guidelines.md`: cloud tint names `Lavender/Blush/Soft Lavender` → Bolden Purple/Vanilla/Strawberry-blush; `Cream (#FDF4EE)` → `Retro (#FEFFF8)`; shadow "warm brown/navy" → "warm brown/deep green"; email-header channel row → Purple/Vanilla.
- `Marketing/Partnerships/collab-pipeline.md`: the Mé "never off-palette" guardrail listed the OLD palette hexes — replaced with the Bolden palette and Mé's delivered colorways (Matcha/Green body, Retro-cream cap face).
- `Marketing/Email/Flows/01-Welcome-Flow.html` + `02-Whats-Inside-Flow.html`: mechanical 1:1 HEX swap to Bolden tokens (`#1B1F3B→#2D341A`, `#FDF4EE→#FEFFF8`, `#C8FF3A→#7A881F`, `#E8936D→#E4CB9F`, `#FFB7D1→#FF6DC7`, `#D4B8E0→#E3D5F7`, `#E8D5F0→#E3D5F7`). No old pink/lavender/lime/navy/cream hexes remain anywhere in the brand surface.

### 6 — Cross-artifact drift
- Email flow HTML files (01/02): in addition to the palette swap above, forced all CTA pills to the canonical **Green-button + Retro-text** lockup (they had matcha-on-green / green-on-matcha small text at ~3.3:1). Updated each file's top DEPRECATED banner to state honestly that palette hexes + CTA + casing are now fixed but the **layout rebuild is still owed**.
- Verified already-consistent (no fix needed): Shopify theme payloads (`settings_data.patch.json`, `index.template.json`, `announcement.patch.md`) on Bolden schemes + correct stat row/mantra; `app/lib/emails.ts` reskinned; OG renderers (`app/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`) consume BRAND tokens.

---

## Flagged for founder (ambiguous — not auto-fixed)

1. **Email flow HTML layout rebuild still owed.** `Marketing/Email/Flows/01-Welcome-Flow.html` and `02-Whats-Inside-Flow.html` are now on Bolden colors and claim-clean, but their *layout* is still a direct port of the old navy-bar/stat-card template — not the reskinned flowing-canvas design in `app/lib/emails.ts`. They are marked DEPRECATED; rebuild from `Marketing/Email/Flows/engagement-capture-flows.md` + `brand.ts` before any Klaviyo send. (These are handoff artifacts, not the live send path — `emails.ts` is what the app actually sends.)

2. **Live SMS copy lives outside the repo.** `app/api/waitlist/route.ts:228` documents the actual Klaviyo keyword-reply text as "hey, it's zack from shroome" — lowercase, **no é**. Fix in Klaviyo. Also: `app/welcome/layout.tsx` SEO `keywords` still lists "reishi", which can imply a product ingredient — recommend dropping it (the product is lion's mane only).

3. **Two canon variants deliberately in circulation — ratify the spec.**
   - **Mantra punctuation:** three forms coexist — `pour. swirl. glow.` (periods; the locked web line), `pour / swirl / glow` (an established creative "action-sequence" treatment used in ad end-cards, LP eyebrows, segment decks), and `pour, swirl, glow` (commas, in running Shopify/product prose). No pack↔web cross-contamination found (pack "Pour. Swirl. Go." never leaked to a web asset, and web "glow." never leaked to a pack file). Recommend the founder ratify whether the slash treatment is sanctioned or should collapse to periods.
   - **"café energy. any address."** appears twice as a deliberate multi-location riff (`Marketing/Ads/ad-creative-library-v1.md`, `Marketing/Social/Content Calendar/tiktok-30-day.md`). Left intact as intentional wordplay — confirm it's sanctioned vs. the locked "Home Address."
   - **Provenance** runs in two channel-correct forms: short-form web/marketing "Grown in Kyoto, Made in California" and long-form pack "Grown in Kyoto, Japan / Made in Huntington Beach, CA". Both are canon per extraction §f; a future artwork revision should pick one convention (and a matcha-origin CoA is still owed to substantiate "Kyoto").

### Systemic note (not new to this audit)
- **Matcha accent CTA contrast** is ~3.9:1 on Retro / ~3.3:1 on Green (extraction §b warning). All CTA lockups across the surface now use Green-button + Retro-text or large/bold accent type to compensate, but any new small-text-on-Matcha element will fail WCAG AA — keep the invert rule enforced.
