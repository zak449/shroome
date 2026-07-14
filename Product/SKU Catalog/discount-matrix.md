# shroomé Discount Matrix — Codes, Stacking Rules & Margin Notes

> Last updated: July 14, 2026
> Owner: Product / SKU Master (pricing sign-off: CEO/CFO)
> Anchor: $36.00 / 12-pack ($3.00/serving). Margin notes use placeholder COGS $0.90/sachet (product COGS only) until the CFO unit-economics template is populated.
> Timing per launch roadmap: launch codes are created and sent **T-1 day** (Klaviyo email 6:00 PM, SMS 6:05 PM), active launch day → +14 days.

---

## 1. Launch Codes (Waitlist Campaign)

| Code | Offer | Audience | Limits | Window |
|---|---|---|---|---|
| **SHROOME20** | 20% off entire order + free shipping | All waitlist subscribers (email) | One use per customer | Launch → +14 days |
| **SHROOME30** | 30% off entire order + free shipping — **replaces SHROOME20, never stacks** | SMS opt-ins only (the phone-number reward: a 10%-deeper code) | One use per customer | Launch → +14 days |

Mechanics (per CFO verdict 2026-07-14, GO-WITH-CHANGES — these override earlier drafts and the unit-econ template's "stackable" phrasing):
- **SHROOME30 REPLACES SHROOME20 — it never stacks.** The two codes are **mutually exclusive**: Shopify `combinesWith: { orderDiscounts: false, productDiscounts: false, shippingDiscounts: false }` on both, one use per customer. SMS opt-ins simply receive the deeper single code. ⚠️ **Copy correction required:** existing SMS/roadmap copy says SHROOME30 "stacks because you gave us your number" — rewrite to "your code is 10% deeper because you gave us your number" before the T-1 send (`launch-roadmap.md` Step 2 SMS script and Klaviyo keyword replies).
- **Codes apply to one-time purchases only** (`appliesOnSubscription: false`). They do **not** apply on top of subscription pricing — this enforces the CFO's **absolute 30% cap on any single-order discount** (subscription max is 20%; code max is 30%; never combined). Waitlist members who want subscription pricing get up to 20% forever instead of 30% once.
- **Free shipping mechanic:** with `combinesWith` all-false, the codes cannot pair with any shipping *discount*. Free shipping for the launch window is therefore delivered at the **shipping-rate level**: a temporary $0 rate on orders ≥ $15 (Settings → Shipping) active launch → +14 days, then reverted to the standing **$50 free-shipping threshold**. Not a discount object → no combinability conflict. `scripts/shopify-seed.mjs` creates the two codes and logs a reminder for this manual rate config.

### Margin per code (12-pack example, placeholder COGS $0.90/sachet)

| Code | 12-pack price | Per serving | Gross margin | Note |
|---|---|---|---|---|
| — (none) | $36.00 | $3.00 | 70.0% | anchor |
| SHROOME20 | $28.80 | $2.40 | 62.5% | + ~$6–8 shipping cost absorbed; one order per customer; CAC-equivalent ~$13–15 |
| SHROOME30 | $25.20 | $2.10 | 57.1% | **= founders price** — intentional; deepest public offer on the 12-pack |
| SHROOME20 on 24-pack | $52.80 | $2.20 | 59.1% | |
| SHROOME30 on 24-pack | $46.20 | $1.93 | 53.2% | system floor for public offers — 30% is the absolute single-order discount cap (CFO) |

No code × subscription stacking exists: codes are one-time-only, so the deepest possible order discount anywhere in the system is 30%.

---

## 2. Founders / First Pour Pre-Order — GRANDFATHERED TIER

Founders pre-ordered on drinkshroome.com/founders at a price that is **locked and must be honored** in Shopify — but the tier is **fenced** per CFO verdict:

| Founders offer | Price (12-pack) | Per serving | Effective discount | Gross margin* |
|---|---|---|---|---|
| First Pour pre-order (paid via Stripe, ships launch day) | **$25.20** | $2.10 | 30% off $36 | 57.1% |
| 3× reorder codes included with pre-order | $25.20 | $2.10 | 30% | 57.1% |
| Referral rewards (1 / 3 / 5 referrals) | fixed **$5 / $10 / $15 account credit** (or free-sachet equivalents: 2 / 4 / 7 sachets) | — | credit, not % | see note |

\* placeholder COGS $0.90/sachet.

Fencing rules (CFO — the tier is contribution-negative if it leaks):
- **Capped cohort:** the founders list is frozen at Shopify migration (Stripe + Klaviyo export). No new members, ever.
- **12-pack only:** founders codes (`FP30-XXXX`, 3 per founder, single-use) are restricted to the 12-pack variants (SHR-BOX-VAN-12 / SHR-BOX-STR-12 / SHR-KIT-VAR-12 — official SKUMaster codes). Not valid on 24/48-packs, the first pour kit, or subscriptions.
- **No codes on top:** nothing applies over $25.20 — no SHROOME codes, no referral credits, no sub pricing. `combinesWith` all false, one code per order. 30% remains the absolute system-wide discount cap.
- Grandfathered price: $25.20 survives any future price change ("your price is locked at checkout. it never goes up for you").
- Implementation: customer-specific codes imported at store setup — **not** created by the seed script.
- ⚠️ **Site copy correction required:** /founders currently advertises a 33/36/40% referral ladder (`app/founders/page.tsx`, FAQ). CFO replaces percentages with the fixed $5/$10/$15 credits above. Update the page + FAQ + `/refer`, and grant any founder who already earned a percentage tier the equivalent fixed credit, with a personal note from Zak.

---

## 3. Subscription Tier Discounts (not codes — selling-plan pricing)

Full matrix in `subscription-plans.md`. Summary: 10% (12/60-day) → 20% cap (48/monthly and 48/bi-weekly); per-serving $2.70 → $2.10. These are automatic price adjustments at checkout, not discount codes — they always apply. Launch codes do **not** apply to subscription orders (one-time only, per CFO 30% cap); subscription pricing is the standing offer, launch codes are the one-time offer, and the customer picks a lane.

---

## 4. Referral Program (post-launch, general customers) — FIXED REWARDS (CFO)

| Side | Offer | Mechanic |
|---|---|---|
| Friend (referee) | 15% off first order | Unique code via referral app (`REF15-XXXX` style), one per customer, one-time purchases only |
| Referrer | Fixed ladder: **$5 / $10 / $15 account credit** at 1 / 3 / 5 converted referrals (or free-sachet equivalents: 2 / 4 / 7 sachets tucked into the next box) | Store credit / gift card; credits usable up to $15 per order and never push the effective order discount past the **30% absolute cap** |

- No percentage referral ladders anywhere in the system (CFO verdict) — percentages compound unpredictably; fixed credits have a known ceiling.
- Platform per roadmap Phase 4: Smile.io or ReferralCandy (post-launch, after 500+ customers); TikTok Shop affiliate runs separately at 10–20% commission.
- Margin note: friend side (15% off $36 = $30.60, $2.55/serving) = 64.7% margin; full referrer ladder costs $30 across 5 acquisitions ≈ $6/acquisition + $6.12 friend discount ≈ $12 blended — well under the <$25 CAC target.
- Referral credits do **not** combine with SHROOME20/30 or founders codes (customer keeps whichever is deeper). Credits may be redeemed against subscription orders (they're stored payment, not a discount), subject to the 30% cap check at redemption.

---

## 5. Stacking Rules — Single Source of Truth

| ↓ combined with → | SHROOME20 | SHROOME30 | Founders codes | Sub tier pricing | Referral credit | Launch free shipping (rate-level) |
|---|---|---|---|---|---|---|
| **SHROOME20** | — | ❌ mutually exclusive | ❌ | ❌ one-time only | ❌ | ✅ (shipping rate, not a discount) |
| **SHROOME30** | ❌ mutually exclusive | — | ❌ | ❌ one-time only | ❌ | ✅ |
| **Founders codes** | ❌ | ❌ | ❌ (one per order) | ❌ | ❌ | ✅ |
| **Sub tier pricing** | ❌ | ❌ | ❌ | — | ✅ (credit = payment; 30% cap check) | ✅ |
| **Referral credit** | ❌ | ❌ | ❌ | ✅ | ✅ (≤$15/order) | ✅ |

Shopify `combinesWith` on ALL codes (SHROOME20, SHROOME30, founders): `{ orderDiscounts: false, productDiscounts: false, shippingDiscounts: false }` + `appliesOncePerCustomer: true`. SHROOME codes additionally `appliesOnSubscription: false`. Launch free shipping is a temporary $0 shipping rate, not a discount object — see §1. **Absolute cap: no order ever exceeds 30% off list.**

---

## 6. Margin Floor Summary (CFO one-glance)

| Layer | Deepest per-serving | Margin @ $0.90 COGS |
|---|---|---|
| One-time list | $2.63 (48-pack) | 65.7% |
| Subscription steady-state | $2.10 (48/monthly, 20% cap) | 57.1% |
| Public promo (one-time only) | $1.93 (SHROOME30 on 24-pack) | 53.2% |
| Grandfathered founders (fenced, 12-pack only) | $2.10 ($25.20, 30%) | 57.1% |
| **Absolute system floor** | **30% off — nothing goes deeper, ever** | |

Everything sits ≥ 53% gross at placeholder COGS; the 65–75% guardrail holds for one-time list prices and the shallow subscription cells.

### CFO guardrails (verdict 2026-07-14 — binding)

1. **Absolute single-order discount cap: 30%.** No stack, code, credit, or tier combination may exceed it.
2. **Margin floor: 30% contribution per order** (after COGS + fulfillment + payment fees). Any new promo must clear this before it ships.
3. **Free-shipping threshold: $50** standing (temporarily $15 during the 14-day launch window only, at the shipping-rate level).
4. **Post-launch anchor review:** CFO's minimum-viable-price math says a system that contains 30% discounts needs ≥ $3.34/serving at anchor. Two sanctioned paths after the launch window closes — **move the 12-pack anchor to $40–42** ($3.33–3.50/serving), or **cap all future discounts at 22%** while holding $36. Decide by end of launch month; founders' $25.20 is grandfathered either way.
5. Re-validate every table in this folder when real COGS land in `unit-economics-template.md`; if COGS > $1.05/sachet, the $36 anchor breaks the 65% gross floor and pricing goes back to CEO/CFO.
