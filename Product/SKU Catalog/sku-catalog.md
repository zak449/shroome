# shroomé SKU Catalog — Master Architecture

> Last updated: July 14, 2026 (reconciled against founder's `SKUMaster.xlsx` — official SKU pattern + real GS1 GTINs)
> Owner: Product / SKU Master
> Status: PRE-LAUNCH — all SKUs live in Shopify as SOLD OUT (inventory 0, policy deny) with waitlist capture. Structure is flip-ready for launch day.
> Source of truth for SKU codes & barcodes: **`Product/SKU Catalog/SKUMaster.xlsx`** (Master SKU List tab). This doc maps that system onto the DTC/Shopify catalog.
> Companion docs: `subscription-plans.md`, `discount-matrix.md`, `shopify-products.csv`, `scripts/shopify-seed.mjs`

---

## Product

Organic ceremonial matcha latte concentrate in 1oz / 30ml single-serve sachets. GS1 net content: sachet **1 oz (28 g)**; retail box **12 oz (336 g)**.

Per sachet: 2.5g organic ceremonial matcha (about 60mg caffeine, naturally occurring l-theanine), 2g grass-fed collagen peptides, 200mg organic lion's mane extract. No artificial sweeteners, no proprietary blends. Sweetened with organic agave (8g added sugars, 35 cal).

> ⚠️ **Claims flag:** Do **not** state a lion's mane beta-glucan % (e.g. "≥70% beta-glucans") or "200mg beta-glucans" until a supplier CoA is on file — the delivered formulation sheet (V2, 6/18/2026) does not document it. Do **not** claim "no added sugar" or "no preservatives": organic agave is the largest ingredient after water (8g added sugars) and the formula contains the Prolong 2.0 shelf-life system. Caffeine (~60mg) and matcha origin are printed on pack but not yet backed by supplier CoAs. Matcha is confirmed at **2.5g** on formulation sheet V2 (`Product/Formulation/ingredients-overview.md` reconciled to 2.5g).

Flavors: **Vanilla (VAN)** — warm, floral, latte-like — and **Strawberry (STR)** — bright, fruity, smoothie-like. Reserved flavor codes in SKUMaster: MNG, BRY, CHO, LMN, MCH.

---

## Official SKU System (from SKUMaster.xlsx)

Pattern: **`SHR-[CATEGORY]-[FLAVOR]-[PACK QTY]`**

| Category code | Meaning |
|---|---|
| SCH | Single sachet (eaches — internal tracking only, not sold individually) |
| BOX | Retail box of N sachets (primary consumer unit) |
| TRY | Tray / master case of retail boxes |
| PLT | Pallet |
| KCH / EYG / MRC | Keychain / eye gels / merch (future products) |
| **KIT** *(proposed — pending founder sign-off, add to Code Reference tab)* | DTC-kitted pack assembled at 3PL from loose SCH sachets; no GTIN needed unless retail |

Flavor code **VAR** (variety, mixed VAN+STR) is also a **proposed addition** to the Code Reference tab — needed for the DTC variety bundles/kits below.

### Physical hierarchy — real GS1 assignments (prefix 860015741)

| SKU | Level | GTIN | Net content | GS1 description |
|---|---|---|---|---|
| SHR-SCH-VAN-01 | Each (internal only) | GTIN-12 **860015741301** | 1 oz (28 g) | Matcha Latte, Vanilla, Single Serve Sachet, 1 oz (28 g) |
| SHR-BOX-VAN-12 | Retail box — **PRIMARY consumer SKU** | GTIN-12 **860015741318** | 12 oz (336 g) | Matcha Latte, Vanilla, Single Serve Sachets, 12-Count Box |
| SHR-TRY-VAN-24 | Master case (24 boxes — confirm case pack with co-packer) | GTIN-14 **10860015741315** | 288 oz (8,064 g) | Matcha Latte, Vanilla, 12-Count Box, Master Case of 24 |
| SHR-PLT-VAN | Pallet (tray count TBD w/ freight/3PL) | — | — | — |
| SHR-SCH-STR-01 | Each (internal only) | GTIN-12 **860015741325** | 1 oz (28 g) | Matcha Latte, Strawberry, Single Serve Sachet, 1 oz (28 g) |
| SHR-BOX-STR-12 | Retail box — **PRIMARY consumer SKU** | GTIN-12 **860015741332** | 12 oz (336 g) | Matcha Latte, Strawberry, Single Serve Sachets, 12-Count Box |
| SHR-TRY-STR-24 | Master case (24 boxes) | GTIN-14 **10860015741339** | 288 oz (8,064 g) | Matcha Latte, Strawberry, 12-Count Box, Master Case of 24 |
| SHR-PLT-STR | Pallet | — | — | — |

Future products (GTINs assigned, **noted only — not in launch catalog/CSV**): SHR-KCH-01 keychain (860015741349), SHR-KCH-BOX manufacturer case of 100 (860015741356), SHR-EYG-06 under-eye gels (860015741363).

---

## Pricing Anchor — DO NOT MOVE WITHOUT CEO/CFO SIGN-OFF

The canonical anchor is **$36.00 for the 12-pack ($3.00/serving)**. This price is already public:

- Live in JSON-LD product schema on drinkshroome.com (`app/page.tsx`, `app/flavors/*/page.tsx` — schema SKU `SHROOME-STRAWBERRY-12`, price `36.00`)
- Anchors the /founders pre-order: **$25.20 (30% off $36)**, already charged to founders via Stripe
- All discounts, subscription tiers, and compare-at prices below derive from it

Quantity always wins: every step up the pack ladder drops the per-serving price below $3.00.

> **CFO post-launch review (binding):** with 30% launch discounts in the system, minimum-viable anchor math is $3.34/serving. After the 14-day launch window, either move the 12-pack anchor to **$40–42** or cap all future discounts at **22%**. Decision due end of launch month — see `discount-matrix.md` §6. Founders' $25.20 stays grandfathered either way.

**Cafe justification:** a cafe matcha latte runs ~$7 (unit-economics guardrail: daily cafe spend $5–7). At $2.63–3.00/serving, shroomé is ~60% below cafe price while delivering a full ceremonial dose plus collagen and lion's mane — with subscription per-serving prices as low as $2.10.

---

## DTC (Shopify) SKUs — One-Time

Every DTC listing is built from the two GTIN'd physical units (the VAN and STR 12-count retail boxes) or from loose sachets kitted at the 3PL. **No new GTINs are required for any launch DTC SKU.**

| SKU | Product / Variant | Physical config | Sachets | Price | Per Serving | Compare At | Barcode (Shopify field) | Gross Margin* |
|---|---|---|---|---|---|---|---|---|
| SHR-KIT-VAR-06 | first pour kit | 3 VAN + 3 STR loose sachets, 3PL-kitted mailer | 6 | $21.00 | $3.50 | — | — (DTC-only kit — no GTIN needed unless retail) | ~74% |
| SHR-BOX-VAN-12 | vanilla — 12 sachets | 1 sealed retail box | 12 | $36.00 | $3.00 | — | **860015741318** | ~70% |
| SHR-BOX-STR-12 | strawberry — 12 sachets | 1 sealed retail box | 12 | $36.00 | $3.00 | — | **860015741332** | ~70% |
| SHR-KIT-VAR-12 | variety — 12 (6 vanilla / 6 strawberry) | 6+6 loose sachets, 3PL-kitted | 12 | $36.00 | $3.00 | — | — (DTC kit — needs NEW GTIN if ever a physical retail box) | ~70% |
| SHR-BOX-VAN-24 | vanilla — 24 sachets | **2 × SHR-BOX-VAN-12** | 24 | $66.00 | $2.75 | $72.00 | 860015741318 x2 (online bundle — no separate GTIN required) | ~67% |
| SHR-BOX-STR-24 | strawberry — 24 sachets | **2 × SHR-BOX-STR-12** | 24 | $66.00 | $2.75 | $72.00 | 860015741332 x2 (online bundle — no separate GTIN required) | ~67% |
| SHR-BOX-VAR-24 | variety — 24 (12/12) | **1 VAN box + 1 STR box** | 24 | $66.00 | $2.75 | $72.00 | — (bundle of two GTIN'd boxes — no separate GTIN required) | ~67% |
| SHR-BOX-VAN-48 | vanilla — 48 sachets | **4 × SHR-BOX-VAN-12** | 48 | $126.00 | $2.63 | $144.00 | 860015741318 x4 (online bundle — no separate GTIN required) | ~66% |
| SHR-BOX-STR-48 | strawberry — 48 sachets | **4 × SHR-BOX-STR-12** | 48 | $126.00 | $2.63 | $144.00 | 860015741332 x4 (online bundle — no separate GTIN required) | ~66% |
| SHR-BOX-VAR-48 | variety — 48 (24/24) | **2 VAN boxes + 2 STR boxes** | 48 | $126.00 | $2.63 | $144.00 | — (bundle — no separate GTIN required) | ~66% |

\* Gross margin uses a **placeholder COGS of $0.90/sachet** (product COGS only, excl. fulfillment) until `Executive/CFO/Financial Models/unit-economics-template.md` is filled with real vendor quotes. Guardrail: 65–75%. At the $36 anchor, COGS must stay ≤ $1.05/sachet to hold 65%; the deepest subscription cell ($2.10/serving) requires COGS ≤ $0.735/sachet — see `subscription-plans.md` margin notes.

**Legacy code mapping** (earlier drafts — retire everywhere): SHR-VAN-12→SHR-BOX-VAN-12 · SHR-STR-12→SHR-BOX-STR-12 · SHR-VAR-12→SHR-KIT-VAR-12 · SHR-VAN-24→SHR-BOX-VAN-24 · SHR-STR-24→SHR-BOX-STR-24 · SHR-VAR-24→SHR-BOX-VAR-24 · SHR-VAN-48→SHR-BOX-VAN-48 · SHR-STR-48→SHR-BOX-STR-48 · SHR-VAR-48→SHR-BOX-VAR-48 · SHR-TRY-6→SHR-KIT-VAR-06 (old "TRY" trial code collided with the official TRY = tray/master case category).

Fulfillment notes:
- 3PL picks sealed boxes for all BOX SKUs (multiples ship as 2 or 4 boxes in one mailer) and kits KIT SKUs from SCH eaches (internal Code-128 labels `SHR-SCH-VAN-01` / `SHR-SCH-STR-01`). KIT SKUs carry a small per-order kitting fee — factor into the fulfillment cost line.
- If kitting proves uneconomic, retire SHR-KIT-VAR-12 and let SHR-KIT-VAR-06 + SHR-BOX-VAR-24 cover variety demand (pricing grid unaffected).

---

## Shopify Product Structure

4 products, 10 variants (option: **Pack Size**):

| Handle | Product Title | Variants (SKUs) |
|---|---|---|
| `shroome-vanilla` | shroomé vanilla — matcha latte concentrate | SHR-BOX-VAN-12 / -24 / -48 |
| `shroome-strawberry` | shroomé strawberry — matcha latte concentrate | SHR-BOX-STR-12 / -24 / -48 |
| `shroome-variety-pack` | shroomé variety pack — matcha latte concentrate | SHR-KIT-VAR-12, SHR-BOX-VAR-24, SHR-BOX-VAR-48 |
| `shroome-first-pour-kit` | shroomé first pour kit — 6 sachets | SHR-KIT-VAR-06 |

Launch state for every variant: inventory tracked by Shopify, **quantity 0, inventory policy `deny`** → storefront shows SOLD OUT; theme/Klaviyo back-in-stock form captures waitlist. Flip-live = receive inventory at the 3PL location; nothing else changes. (Handles match `shopify-redirects.csv` targets, e.g. `/flavors/vanilla` → `/products/shroome-vanilla`.)

> **Schema sync:** site JSON-LD currently uses marketing SKU `SHROOME-STRAWBERRY-12`. At Shopify migration, update JSON-LD `sku` to `SHR-BOX-STR-12` / `SHR-BOX-VAN-12` and add `gtin12` (`860015741332` / `860015741318`) — real GTINs improve Google Shopping / rich-result eligibility.

---

## Drop Strategy — Numbered Limited Drops

Sales run as numbered, limited drops: **DROP 001 (founders/first pour) — sold out. DROP 002 — next.** Scarcity is honest: a drop's size equals the real production run received at the 3PL, never an artificial cap.

### How a drop works in Shopify

1. **Fixed inventory allocation per drop.** When a production run lands, set each variant's available quantity to its drop allocation (e.g. DROP 002 = 1,000 × 12-boxes split across flavors). Inventory policy stays **`deny`** — when allocation hits 0, the drop is sold out and stays sold out. No overselling, no backorders.
2. **Subscriber reservation first.** Before opening to the public, deduct the units needed to fulfill all active subscription cycles falling within the drop window and hold them (separate 3PL bin / Shopify location or a simple reserved-quantity spreadsheet at launch scale). **Subscribers never compete with the drop.**
3. **Drop opening.** Two supported mechanics — pick per drop:
   - *Scheduled publish:* products unpublished (or Drop page hidden) until drop time; use Shopify's scheduled theme publish or `publishedAt` flip via API at T-0.
   - *Password-page drop:* store password page ON until T-0 (heavier — blocks whole storefront; best for the first public drop moment only).
4. **Klaviyo drop-alert flow.** SMS list gets the live link **10 minutes before** email/public ("your number gets you in first" — reinforces the SMS value prop). Sequence: T-10min SMS → T-0 email + social + site public. Track `drop_open`, `drop_sellout` events for GA4/Klaviyo.
5. **Sold out state.** Variants at 0/deny render SOLD OUT; one-click waitlist (back-in-stock form → Klaviyo `drop_waitlist` list, seeded with drop number) becomes the CTA. Waitlist is the priority audience for the next drop's T-10 window.

### Per-drop identification: metafields, NOT SKU suffixes

Keep the 10 SKUs stable. Tag drops with a product/variant **metafield** (`shroome.drop_number: "002"`) and an order tag at checkout (`drop-002`) for reporting. **Do not** mint per-drop SKUs (SHR-BOX-VAN-12-D002) unless an operational system (3PL lot separation, co-packer traceability) literally requires it — lot/best-by codes already handle traceability at the 3PL. SKU proliferation breaks subscriptions (contracts pin to variant IDs), reviews, and analytics history.

### Impulse mechanics (on-site, per drop)

- **Countdown timer** to drop open (pre-drop) — honest: counts to a real scheduled time.
- **Live "boxes remaining" bar** during the drop — driven by real Shopify inventory levels (theme app block or storefront API poll), never a fake decrement.
- **One-click waitlist** on sellout (email prefilled for known Klaviyo profiles).

### Subscriptions are the pressure release

The #1 subscription value-add: **subscribers never miss a drop — their allocation is reserved before the public window opens.** Drop scarcity creates the urgency; "subscribe and never refresh a drop page again" converts it. Merchandise this on every sold-out state and in the drop-alert emails. (Detail in `subscription-plans.md` perks ladder.)

---

## Barcode Plan (per SKUMaster Barcode Guide)

GS1 Company Prefix **860015741** is live — all launch physical units carry real GTINs (tables above). Usage by system:

- **Shopify Barcode field:** GTIN-12 on the two 12-boxes; `<GTIN> x2` / `x4` notation on same-flavor multiples (aids 3PL pick verification); blank on variety bundles and KIT SKUs (no GTIN required for DTC-only bundles/kits).
- **Internal / 3PL / warehouse scanning:** Code-128 barcodes of the SKU string itself (e.g. `SHR-BOX-VAN-12`, `SHR-SCH-VAN-01`) — free, no registration, per the Barcode Guide tab.
- **Retail / Amazon / wholesale:** UPC-A printed on retail box artwork (≥80% magnification, quiet zones). GTINs are GS1-verified — never resold UPCs (marketplaces delist).

### GTINs still to purchase (only if/when these become physical retail units)

| Future unit | Needs |
|---|---|
| Variety retail box (6/6 or 12/12 in one sealed box) | NEW GTIN-12 — today variety is a DTC-only bundle/kit, none required |
| Physical 24-count "hero" retail box | NEW GTIN-12 — DTC 24 is a 2-box bundle today, none required |
| First pour kit as a retail unit | NEW GTIN-12 — DTC-only today, none required |
| Pallets (SHR-PLT-VAN / SHR-PLT-STR) | GTIN-14s once tray count per pallet is confirmed with freight/3PL |

### Retail case-pack (Phase 6)

| Retail Unit | Config | Barcode | Notes |
|---|---|---|---|
| 12-count retail box (VAN) — SHR-BOX-VAN-12 | Consumer unit — PRIMARY | UPC-A **860015741318** on box back panel | 12 oz (336 g) net; Supplement Facts + FDA disclaimer + net weight + lot/best-by |
| 12-count retail box (STR) — SHR-BOX-STR-12 | Consumer unit — PRIMARY | UPC-A **860015741332** | Same |
| Master case (VAN) — SHR-TRY-VAN-24 | 24 × 12-count boxes (case pack placeholder — confirm with co-packer) | ITF-14 **10860015741315** on two case faces | 288 oz (8,064 g) net; keep < 50 lb |
| Master case (STR) — SHR-TRY-STR-24 | 24 × 12-count boxes | ITF-14 **10860015741339** | Same |
| Pallet — SHR-PLT-VAN / SHR-PLT-STR | Tray count TBD | GTIN-14 TBD | Confirm with freight/3PL; required for UNFI/KeHE distribution centers |

DTC shipping cartons (3PL) do not need retail barcodes; Code-128 SKU labels are sufficient.

---

## Weights (GS1 net content + Shopify `Variant Grams`)

| Unit | Net content (GS1) | Shipped weight (used in CSV, incl. packaging) |
|---|---|---|
| Sachet (1oz/30ml) | 1 oz (28 g) | ~40 g incl. foil pouch |
| 6-kit | 168 g | 350 g |
| 12 (box or kit) | 12 oz (336 g) | 650 g |
| 24 (2 boxes) | 672 g | 1,250 g |
| 48 (4 boxes) | 1,344 g | 2,400 g |
| Master case (24 boxes) | 288 oz (8,064 g) | TBD w/ co-packer |

---

## Copy & Compliance Guardrails (applies to all SKU copy)

Per `Product/Compliance & Claims/claims-guidelines.md` — structure/function only:

- ✅ "supports sustained focus", "supports healthy energy levels", "supports immune function", "supports skin health", "supports gut health", "provides antioxidant support", "200mg organic lion's mane extract"
- ❌ "boosts immunity", "cures/treats/prevents", "clinically proven", disease or drug-alternative claims, **"≥70% beta-glucans" / "200mg beta-glucans"** (unsubstantiated — no supplier CoA), **"no added sugar" / "sugar-free"** (8g added sugars from agave), **"no preservatives"** (contains Prolong 2.0)
- FDA disclaimer required on every product page / Body HTML: *"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."*

Brand voice: lowercase, café-energy-meets-gen-z (2026-07-14 repositioning: energetic, never earthy). Signature action sequence: **pour / swirl / glow**.

---

## Cross-Reference

- Official SKU/GTIN master → `SKUMaster.xlsx` (Master SKU List, Code Reference, Barcode Guide tabs)
- Subscription tiers, cadences, per-serving matrix → `subscription-plans.md`
- Launch codes (SHROOME20/SHROOME30), founders grandfathered pricing, stacking rules → `discount-matrix.md`
- Import file → `shopify-products.csv` · URL migration → `shopify-redirects.csv`
- API seeding → `scripts/shopify-seed.mjs` + `scripts/README-shopify.md`
