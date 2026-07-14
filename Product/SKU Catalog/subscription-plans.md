# shroomé Subscription Plans — Tiered Subscribe & Save

> Last updated: July 14, 2026
> Owner: Product / SKU Master
> Pricing anchor: $36.00 / 12-pack one-time ($3.00/serving) — see `sku-catalog.md`. All subscription discounts are % off the one-time price of the same quantity.
> Launch state: plans are created and attached at store setup, but every variant is SOLD OUT (inventory 0 / deny) until flip-live.

---

## Architecture

Two levers, one rule: **bigger quantity + tighter cadence = deeper discount.**

- **Cadences:** every 2 weeks · every 30 days · every 60 days
- **Quantity tiers:** 12 / 24 / 48 sachets per delivery
- **Discount band:** 10% base subscribe & save → 20% max (capped), reached at 48/monthly per the unit-economics guardrail extension approved for launch
- Applies to vanilla, strawberry, and variety variants alike (SHR-BOX-VAN/STR-12/-24/-48, SHR-KIT-VAR-12, SHR-BOX-VAR-24/-48 — official SKUMaster codes). The first pour kit (SHR-KIT-VAR-06) is one-time only.
- Physical fulfillment per `sku-catalog.md`: 24/48 tiers ship as multiples of the GTIN'd 12-count retail boxes (2× / 4×); variety = 1+1 or 2+2 VAN/STR boxes; the 12-count variety is 3PL-kitted from loose sachets.

## Discount Matrix

| Sachets per delivery | every 2 weeks | every 30 days | every 60 days |
|---|---|---|---|
| **12** | **15%** | **12%** | **10%** |
| **24** | **18%** | **15%** | **12%** |
| **48** | **20%** (cap) | **20%** | **15%** |

## Price Matrix (one-time base → subscription price → per serving)

Bases: 12 = $36.00 · 24 = $66.00 · 48 = $126.00

| Tier | every 2 weeks | every 30 days | every 60 days |
|---|---|---|---|
| **12 sachets** | 15% → **$30.60** ($2.55/serv) | 12% → **$31.68** ($2.64/serv) | 10% → **$32.40** ($2.70/serv) |
| **24 sachets** | 18% → **$54.12** ($2.26/serv) | 15% → **$56.10** ($2.34/serv) | 12% → **$58.08** ($2.42/serv) |
| **48 sachets** | 20% → **$100.80** ($2.10/serv) | 20% → **$100.80** ($2.10/serv) | 15% → **$107.10** ($2.23/serv) |

Sanity checks (hold in every future price change):
- Every cell < $3.00/serving (anchor) and < the same quantity's one-time per-serving price
- Within any cadence column, per-serving strictly falls as quantity rises (quantity always wins)
- Deepest cell $2.10/serving **exactly matches the founders locked price** ($25.20/12 = $2.10) — narrative: "the founders price, earned back through commitment"
- Cafe anchor: $2.10–2.70 vs ~$7 cafe matcha latte = 61–70% cheaper

### Margin notes (placeholder COGS $0.90/sachet — see CFO template)

| Per-serving | Gross margin | vs 65–75% guardrail |
|---|---|---|
| $2.70 / $2.64 | 66.7% / 65.9% | in band |
| $2.55 | 64.7% | hairline low — acceptable for 2-week LTV |
| $2.42 / $2.34 / $2.26 | 62.8% / 61.5% / 60.2% | below band — funded by retention economics |
| $2.23 / $2.10 | 59.7% / 57.1% | below band — deepest cells; treat gap as retention investment |

**CFO action:** cells below 65% are intentional (subscription LTV > one-time), but real COGS must come in ≤ $0.90/sachet for this table to stand; ≤ $0.735/sachet would put even $2.10 in band. Re-run this table when `unit-economics-template.md` is populated.

---

## Perks Ladder

**#1 value-add — guaranteed drop allocation.** shroomé sells in numbered limited drops (see `sku-catalog.md` → Drop Strategy), and drops sell out. Subscribers **never miss a drop**: every active subscription's units are reserved out of each production run *before* the public window opens. One-time buyers refresh the drop page; subscribers get theirs automatically. Lead every subscription pitch (PDP widget, sold-out states, drop-alert emails) with this.

| Perk | 12-tier | 24-tier | 48-tier ("inner circle") |
|---|---|---|---|
| **Guaranteed drop allocation — never miss a drop** | ✅ reserved every cycle | ✅ | ✅ reserved first |
| Free shipping | ✅ every delivery (all subscriptions ship free; one-time orders ship free at $50+) | ✅ | ✅ priority processing |
| Skip / pause / swap flavor anytime | ✅ | ✅ | ✅ |
| Early flavor access (new flavors 1 week before public) | ✅ | ✅ | ✅ + input on flavor votes |
| Refer-a-friend credit (fixed ladder, see `discount-matrix.md`) | $5 / $10 / $15 credit at 1 / 3 / 5 referrals | same | same + free-sachet option |
| Limited drops & merch | — | early access | first access + annual founders-style gift |
| Price lock | 12 months | 12 months | 12 months |

Free-shipping threshold logic: one-time 12-pack ($36) sits below the $50 threshold on purpose — the nudge is "subscribe (free ship + 10–15% off) or step up to the 24-pack ($66, free ship)."

---

## Implementation Spec

### A. Native Shopify subscriptions (sellingPlanGroups) — what `scripts/shopify-seed.mjs` creates

Because a selling plan's discount is fixed per plan (not per variant), quantity tiers = **three selling plan groups**, each attached only to the variants of its quantity:

| Group name (merchantCode) | Attached variants | Plans (name → billing/delivery → discount) |
|---|---|---|
| subscribe & save — 12 sachets (`shroome-sub-12`) | SHR-BOX-VAN-12, SHR-BOX-STR-12, SHR-KIT-VAR-12 | every 2 weeks → WEEK/2 → 15% · every 30 days → DAY/30 → 12% · every 60 days → DAY/60 → 10% |
| subscribe & save — 24 sachets (`shroome-sub-24`) | SHR-BOX-VAN-24, SHR-BOX-STR-24, SHR-BOX-VAR-24 | every 2 weeks → WEEK/2 → 18% · every 30 days → DAY/30 → 15% · every 60 days → DAY/60 → 12% |
| subscribe & save — 48 sachets (`shroome-sub-48`) | SHR-BOX-VAN-48, SHR-BOX-STR-48, SHR-BOX-VAR-48 | every 2 weeks → WEEK/2 → 20% · every 30 days → DAY/30 → 20% · every 60 days → DAY/60 → 15% |

Plan settings (all plans): `category: SUBSCRIPTION`, billing = delivery (no prepaid at launch), pricing policy `fixed` / `PERCENTAGE`, anchors: none (cycle starts at checkout). Group option label: `delivery every`; plan option values: `2 weeks` / `30 days` / `60 days`.

GraphQL (Admin API 2025-07): `sellingPlanGroupCreate(input: {...}, resources: { productVariantIds: [...] })`. Requires scopes `write_products` + `read_purchase_options`/`write_purchase_options`; subscription contracts at checkout additionally need a subscriptions-capable app with `read/write_own_subscription_contracts`. See `scripts/README-shopify.md`.

### B. Loop or ReCharge (per launch roadmap Phase 1, ~$99/mo)

- **Loop Subscriptions** (recommended first choice): Loop reads/writes **native selling plan groups**, so the three groups above appear in Loop automatically after install — configure widget display, cancellation flows, and the perks ladder (free gifts at 48-tier) in Loop; do not duplicate plans.
- **ReCharge**: choose the **Shopify Checkout Integration** (native selling plans). Recreate the matrix in ReCharge as three plan groups mirroring the table above (ReCharge will own the selling plan groups it creates — if migrating from seed-script groups, delete the native groups first to avoid duplicate widgets).
- Either way, the **matrix table above is the single source of truth**; app config must match it cell-for-cell.
- Dunning: 3 retries over 7 days, then pause (not cancel). Surcharge-free flavor swap between vanilla/strawberry/variety within the same tier (same price, same plan).

### C. Interplay with launch discount codes (CFO verdict 2026-07-14)

SHROOME20 / SHROOME30 are **one-time-purchase only** (`appliesOnSubscription: false`, `combinesWith` all false) and are mutually exclusive with each other. They **never** stack on selling-plan pricing — the CFO's absolute cap is 30% off any single order, and subscription pricing (max 20%) is the standing offer while launch codes are the one-time offer. Waitlist pitch: "use your code once, or subscribe and save up to 20% forever — plus never miss a drop." Full stacking rules and margin table: `discount-matrix.md`.

### D. Klaviyo events

Tag subscription tier + cadence as Klaviyo profile properties at checkout (`sub_tier: 12|24|48`, `sub_cadence: 14|30|60`) for winback and upsell flows (12 → 24 upgrade flow at month 2).
