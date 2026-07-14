# shroomé — Shopify Seed Runbook (`shopify-seed.mjs`)

Run this the moment the Shopify store + Admin API token exist (launch roadmap Phase 1). It seeds the entire launch catalog in one idempotent pass:

- **4 products / 10 variants** (vanilla, strawberry, variety × 12/24/48 + first pour kit) at the $36/12-pack anchor — all **SOLD OUT** (inventory tracked, 0 available, policy deny), flip-ready
- **3 selling plan groups** — subscribe & save 12/24/48 tiers × cadences (2 weeks / 30 days / 60 days), 10–20% off per the matrix in `Product/SKU Catalog/subscription-plans.md`
- **SHROOME20 + SHROOME30** launch codes — mutually exclusive, one per customer, one-time purchases only, active launch → +14 days (CFO rules baked in)

Pricing source of truth: `Product/SKU Catalog/sku-catalog.md`. If prices change there, change the `CATALOG` constant in the script to match (and vice versa — never let them drift).

---

## 1. Create the store + custom app token

1. Create the store (Shopify Basic is fine) and log into admin.
2. **Settings → Apps and sales channels → Develop apps → Allow custom app development → Create an app** (name it `shroome-seed`).
3. **Configuration → Admin API integration → Edit scopes.** Enable:
   - `write_products`, `read_products` — products, variants, and selling plan groups
   - `write_purchase_options`, `read_purchase_options` — selling plans (subscribe & save)
   - `write_discounts`, `read_discounts` — SHROOME20 / SHROOME30
   - `read_locations` — resolve the location for the explicit 0-available inventory set
   - `write_inventory`, `read_inventory` — set available = 0 at the location
   - `read_own_subscription_contracts`, `write_own_subscription_contracts` — required for the app to own subscription behavior; Loop/ReCharge will request their own when installed
4. **API credentials → Install app**, then reveal the **Admin API access token** (`shpat_…`). It is shown **once** — store it in the password manager, never in git.

## 2. Run

```bash
export SHOPIFY_STORE_DOMAIN="shroome.myshopify.com"   # the *.myshopify.com domain, not drinkshroome.com
export SHOPIFY_ADMIN_TOKEN="shpat_XXXXXXXXXXXX"
export LAUNCH_AT="2026-08-01T16:00:00Z"               # optional — discount window start (default: now). Per roadmap, run T-1 day.

node scripts/shopify-seed.mjs
```

Node 18+ required (uses global `fetch`; zero npm dependencies). Targets Admin GraphQL API **2025-07**.

The script is **idempotent** — it looks up each product by handle, each selling plan group by merchantCode, and each discount by code, and skips anything that exists. Re-run it freely after partial failures. It exits 0 with a summary block; a non-zero exit means a real API error (message printed, nothing half-written thanks to `productSet(synchronous: true)`).

## 3. Verify (5 minutes)

- Admin → Products: 4 products, 10 variants, prices $21/$36/$66/$126, inventory 0 / "deny" → storefront shows **sold out**
- Barcodes (real GS1 GTINs per `Product/SKU Catalog/SKUMaster.xlsx`): SHR-BOX-VAN-12 = `860015741318`, SHR-BOX-STR-12 = `860015741332`; 24/48 variants show the 12-box UPC with `x2`/`x4` notation (online bundles — no separate GTIN); variety + first pour kit have blank barcodes (DTC-only, no GTIN needed unless retail)
- Product page → Purchase options: the right subscribe & save group per pack size (12→10–15%, 24→12–18%, 48→15–20%)
- Discounts: SHROOME20 & SHROOME30, active launch → +14 days, "one use per customer", **can't combine with other discounts**
- Test checkout preview: applying SHROOME30 after SHROOME20 must replace it, never stack; codes must not apply to subscription orders

## 4. Manual follow-ups the script cannot do (also printed at the end of each run)

| # | Task | Where |
|---|---|---|
| 1 | Launch free shipping: temporary **$0 rate for orders ≥ $15**, launch → +14 days, then revert to the standing **$50 threshold** (CFO). Rate-level, not a discount — the codes combine with nothing. | Settings → Shipping and delivery |
| 2 | Import **founders codes** (`FP30-XXXX`, 3 per founder, 12-pack variants only, fenced cohort) from the Stripe/Klaviyo founders export | Discounts (bulk) / Klaviyo coupon sync — spec in `Product/SKU Catalog/discount-matrix.md` §2 |
| 3 | Buy NEW GTINs only if variety packs / first pour kit ever become physical retail boxes (DTC bundles need none) — see `sku-catalog.md` Barcode Plan | GS1 US portal + `SKUMaster.xlsx` |
| 4 | Install **Loop** (or ReCharge) — Loop picks up the native selling plan groups automatically; config spec in `subscription-plans.md` §B | Apps |
| 5 | Theme: sold-out state → back-in-stock/waitlist form (Klaviyo), drop countdown + live "boxes remaining" bar per `sku-catalog.md` Drop Strategy | Theme editor |
| 6 | Flip-live on drop day: receive inventory at the 3PL location — nothing else changes | Products → Inventory |

## 5. Alternative: CSV import (no API)

`Product/SKU Catalog/shopify-products.csv` creates the same products/variants via **Products → Import**. Use **either** the CSV **or** the script for products — not both (the script will skip handles the CSV already created, so script-after-CSV is safe and still adds selling plans + discounts, which the CSV cannot).
