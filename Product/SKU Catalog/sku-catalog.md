# shroomé SKU Catalog — Master Architecture

> Last updated: July 14, 2026
> Owner: Product / SKU Master
> Status: PRE-LAUNCH — all SKUs live in Shopify as SOLD OUT (inventory 0, policy deny) with waitlist capture. Structure is flip-ready for launch day.
> Companion docs: `subscription-plans.md`, `discount-matrix.md`, `shopify-products.csv`, `scripts/shopify-seed.mjs`

---

## Product

Organic ceremonial matcha latte concentrate in 1oz / 30ml single-serve sachets.

Per sachet: 2.5g organic ceremonial matcha (~60mg caffeine, naturally occurring l-theanine), 2g grass-fed collagen peptides, 200mg organic lion's mane extract (≥70% beta-glucans). No added sugar, no artificial sweeteners, no proprietary blends.

> ⚠️ **Formulation flag:** `Product/Formulation/ingredients-overview.md` lists matcha at 2g/sachet; current spec (this catalog, site copy) uses **2.5g**. Product Lead to reconcile before Supplement Facts panel goes to print.

Flavors: **Vanilla** (warm, floral, latte-like) and **Strawberry** (bright, fruity, smoothie-like).

---

## Pricing Anchor — DO NOT MOVE WITHOUT CEO/CFO SIGN-OFF

The canonical anchor is **$36.00 for the 12-pack ($3.00/serving)**. This price is already public:

- Live in JSON-LD product schema on drinkshroome.com (`app/page.tsx`, `app/flavors/*/page.tsx` — schema SKU `SHROOME-STRAWBERRY-12`, price `36.00`)
- Anchors the /founders pre-order: **$25.20 (30% off $36)**, already charged to founders via Stripe
- All discounts, subscription tiers, and compare-at prices below derive from it

Quantity always wins: every step up the pack ladder drops the per-serving price below $3.00.

**Cafe justification:** a cafe matcha latte runs ~$7 (unit-economics guardrail: daily cafe spend $5–7). At $2.63–3.00/serving, shroomé is ~60% below cafe price while delivering a full ceremonial dose plus collagen and lion's mane — with subscription per-serving prices as low as $2.10.

---

## One-Time SKUs

SKU scheme: `SHR-<FLAVOR>-<COUNT>` where flavor ∈ {VAN, STR, VAR (variety), TRY (trial)}.

| SKU | Product / Variant | Sachets | Price | Per Serving | Compare At | UPC | Gross Margin* |
|---|---|---|---|---|---|---|---|
| SHR-TRY-6 | first pour kit (3 vanilla / 3 strawberry) | 6 | $21.00 | $3.50 | — | PENDING-GS1 | ~74% |
| SHR-VAN-12 | vanilla — 12 sachets | 12 | $36.00 | $3.00 | — | PENDING-GS1 | ~70% |
| SHR-STR-12 | strawberry — 12 sachets | 12 | $36.00 | $3.00 | — | PENDING-GS1 | ~70% |
| SHR-VAR-12 | variety — 12 (6 vanilla / 6 strawberry) | 12 | $36.00 | $3.00 | — | PENDING-GS1 | ~70% |
| SHR-VAN-24 | vanilla — 24 sachets | 24 | $66.00 | $2.75 | $72.00 | PENDING-GS1 | ~67% |
| SHR-STR-24 | strawberry — 24 sachets | 24 | $66.00 | $2.75 | $72.00 | PENDING-GS1 | ~67% |
| SHR-VAR-24 | variety — 24 (12 vanilla / 12 strawberry) | 24 | $66.00 | $2.75 | $72.00 | PENDING-GS1 | ~67% |
| SHR-VAN-48 | vanilla — 48 sachets | 48 | $126.00 | $2.63 | $144.00 | PENDING-GS1 | ~66% |
| SHR-STR-48 | strawberry — 48 sachets | 48 | $126.00 | $2.63 | $144.00 | PENDING-GS1 | ~66% |
| SHR-VAR-48 | variety — 48 (24 vanilla / 24 strawberry) | 48 | $126.00 | $2.63 | $144.00 | PENDING-GS1 | ~66% |

\* Gross margin uses a **placeholder COGS of $0.90/sachet** (product COGS only, excl. fulfillment) until `Executive/CFO/Financial Models/unit-economics-template.md` is filled with real vendor quotes. Guardrail: 65–75%. At the $36 anchor, COGS must stay ≤ $1.05/sachet to hold 65%; the deepest subscription cell ($2.10/serving) requires COGS ≤ $0.735/sachet — see `subscription-plans.md` margin notes.

Notes:
- **48-count exists primarily as the top subscription tier** (see `subscription-plans.md`). It is purchasable one-time at $126 so the variant exists for selling-plan attachment; we do not merchandise it heavily one-time.
- **first pour kit (SHR-TRY-6)** is the low-risk trial: $21 flat, no subscription attached, upsell path to 12-pack subscribe & save. (Distinct from the /founders "First Pour" pre-order campaign, which is a 12-pack at $25.20 — see `discount-matrix.md` grandfathered tier.)
- Compare-at prices show bundle savings vs 12-pack anchor math (24-pack vs 2 × $36; 48 vs 4 × $36). The 12-pack itself carries no compare-at — $36 is the honest anchor.

---

## Shopify Product Structure

4 products, 10 variants (option: **Pack Size**):

| Handle | Product Title | Variants (SKUs) |
|---|---|---|
| `shroome-vanilla` | shroomé vanilla — matcha latte concentrate | SHR-VAN-12 / -24 / -48 |
| `shroome-strawberry` | shroomé strawberry — matcha latte concentrate | SHR-STR-12 / -24 / -48 |
| `shroome-variety-pack` | shroomé variety pack — matcha latte concentrate | SHR-VAR-12 / -24 / -48 |
| `shroome-first-pour-kit` | shroomé first pour kit — 6 sachets | SHR-TRY-6 |

Launch state for every variant: inventory tracked by Shopify, **quantity 0, inventory policy `deny`** → storefront shows SOLD OUT; theme/Klaviyo back-in-stock form captures waitlist. Flip-live = receive inventory at the 3PL location; nothing else changes.

> **Schema sync:** site JSON-LD currently uses marketing SKU `SHROOME-STRAWBERRY-12`. At Shopify migration, update JSON-LD `sku` fields to the operational codes (`SHR-STR-12` etc.) or add both via `mpn`.

---

## UPC / Barcode Plan

Real UPCs are **not yet located in Drive** — no GS1 certificate or spreadsheet found as of 2026-07-14. Until the GS1 Company Prefix is purchased:

- Every SKU carries the placeholder **`PENDING-GS1`** in this catalog, in `shopify-products.csv` (`Variant Barcode` column), and in Shopify admin.
- When GS1 assigns the prefix, drop real GTIN-12 (UPC-A) codes into: (1) the table above, (2) `shopify-products.csv` → re-import or bulk-edit, (3) Shopify admin variant barcode fields, (4) `scripts/shopify-seed.mjs` `CATALOG` constant, (5) packaging dielines.
- Assign one GTIN-12 **per consumer sellable unit** (each row in the table above = one GTIN). Variety packs and the trial kit each need their own GTIN — they are distinct sellable configurations.

### Retail case-pack notes (Phase 6 — retail later)

| Retail Unit | Config | Barcode | Notes |
|---|---|---|---|
| 12-serving retail box | Consumer unit, shelf-facing | UPC-A (GTIN-12) on box back panel | The standard retail box: 12 sachets, fits standard 4" grocery shelf facing |
| 24-serving hero box | Consumer unit, endcap/club | Own UPC-A | Hero/value box for endcaps, online marketplaces, club-adjacent |
| Master case — 12s | 6 × 12-pack boxes | ITF-14 (GTIN-14, indicator digit 1) on two case faces | Case dims TBD with co-packer; keep < 50 lb |
| Master case — 24s | 4 × 24-pack hero boxes | ITF-14 (GTIN-14) | Same |

- ITF-14 case codes derive from each consumer GTIN-12 (add indicator digit + recheck check digit) — no extra GS1 purchase needed.
- Retail boxes must carry: Supplement Facts panel, FDA disclaimer, net weight, lot/best-by (printed at co-packer), UPC-A ≥ 80% magnification with quiet zones.
- DTC shipping cartons (3PL) do not need retail barcodes; SKU labels are sufficient.

---

## Sachet & Shipping Weights (Shopify `Variant Grams`)

| Pack | Contents Weight | Shipped Weight (used in CSV) |
|---|---|---|
| Sachet (1oz/30ml) | ~30g | ~40g incl. foil pouch |
| 6-pack | 180g | 350g |
| 12-pack | 360g | 650g |
| 24-pack | 720g | 1,250g |
| 48-pack | 1,440g | 2,400g |

---

## Copy & Compliance Guardrails (applies to all SKU copy)

Per `Product/Compliance & Claims/claims-guidelines.md` — structure/function only:

- ✅ "supports sustained focus", "supports healthy energy levels", "supports immune function", "supports skin health", "supports gut health", "provides antioxidant support", "70%+ beta-glucan content"
- ❌ "boosts immunity", "cures/treats/prevents", "clinically proven", disease or drug-alternative claims
- FDA disclaimer required on every product page / Body HTML: *"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."*

Brand voice: lowercase, quiet-luxury-meets-gen-z. Ritual language: **pour / swirl / glow**.

---

## Cross-Reference

- Subscription tiers, cadences, per-serving matrix → `subscription-plans.md`
- Launch codes (SHROOME20/SHROOME30), founders grandfathered pricing, stacking rules → `discount-matrix.md`
- Import file → `shopify-products.csv`
- API seeding → `scripts/shopify-seed.mjs` + `scripts/README-shopify.md`
