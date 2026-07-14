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
| **SHROOME30** | 30% off entire order + free shipping | SMS opt-ins only (the +10% phone-number stack, delivered as a single 30% code) | One use per customer | Launch → +14 days |

Mechanics (unit-economics guardrail: waitlist = 20% + free ship, +10% stackable for SMS):
- The "stack" is **implemented as one code** — Shopify won't combine two percentage order discounts, so SMS customers receive SHROOME30 and are told it "stacks because you gave us your number." SHROOME20 and SHROOME30 are **never combinable with each other**.
- **Free shipping mechanic:** a percentage discount code cannot bundle free shipping in the Admin API. Implementation = the codes set `combinesWith.shippingDiscounts: true` **plus** an automatic free-shipping discount ("launch free shipping", min. order $15, launch → +14 days) that combines with order discounts. Net effect at checkout: code gives the %, shipping is free. (The roadmap's "Free shipping: Yes" checkbox note is an admin-UI simplification — this is the API-accurate build; `scripts/shopify-seed.mjs` creates all three objects.)
- Both codes apply to one-time purchases **and** subscription first payments only (`recurringCycleLimit: 1`) — honoring the guardrail's "locked in for early subscribers, applied to first order."

### Margin per code (12-pack example, placeholder COGS $0.90/sachet)

| Code | 12-pack price | Per serving | Gross margin | Note |
|---|---|---|---|---|
| — (none) | $36.00 | $3.00 | 70.0% | anchor |
| SHROOME20 | $28.80 | $2.40 | 62.5% | + ~$6–8 shipping cost absorbed; one order per customer; CAC-equivalent ~$13–15 |
| SHROOME30 | $25.20 | $2.10 | 57.1% | **= founders price** — intentional; deepest public first-order offer |
| SHROOME20 on 24-pack | $52.80 | $2.20 | 59.1% | |
| SHROOME30 on 24-pack | $46.20 | $1.93 | 53.2% | |
| Worst-case stack: SHROOME30 on 48/monthly sub first payment | $70.56 | $1.47 | 38.8% | first payment only; renewals revert to $100.80 (57.1%). Book gap as acquisition cost — recovered by cycle 2 |

---

## 2. Founders / First Pour Pre-Order — GRANDFATHERED TIER

Founders pre-ordered on drinkshroome.com/founders at prices that are **locked and must be honored** in Shopify:

| Founders offer | Price (12-pack) | Per serving | Effective discount | Gross margin* |
|---|---|---|---|---|
| First Pour pre-order (paid via Stripe, ships launch day) | **$25.20** | $2.10 | 30% off $36 | 57.1% |
| 3× reorder codes included with pre-order | $25.20 | $2.10 | 30% | 57.1% |
| + 1 referral | $24.12 | $2.01 | 33% | 55.2% |
| + 3 referrals (VIP) | $23.04 | $1.92 | 36% | 53.1% |
| + 5 referrals (max — "deepest discount ever") | $21.60 | $1.80 | 40% | 50.0% |

\* placeholder COGS $0.90/sachet.

Rules:
- Grandfathered: these prices survive any future price change ("your price is locked at checkout. it never goes up for you").
- Implementation: unique single-use codes per founder (e.g. `FP30-XXXX` ×3 per founder; referral upgrades re-issued as `FP33-/FP36-/FP40-XXXX`), imported at store setup from the Stripe/Klaviyo founders list. **Not** created by the seed script (customer-specific); generate via Shopify bulk discount creation or Klaviyo coupon sync at migration.
- Founders codes are **not combinable** with SHROOME20/SHROOME30, subscription discounts, or referral credits — they already exceed every public offer. One code per order.
- 40% (=$1.80/serving, 50% margin) is the absolute floor of the entire pricing system. Nothing public ever goes deeper.

---

## 3. Subscription Tier Discounts (not codes — selling-plan pricing)

Full matrix in `subscription-plans.md`. Summary: 10% (12/60-day) → 20% cap (48/monthly and 48/bi-weekly); per-serving $2.70 → $2.10. These are automatic price adjustments at checkout, not discount codes — they always apply, and launch codes stack on the **first payment only** (see §1).

---

## 4. Referral Program (post-launch, general customers)

| Side | Offer | Mechanic |
|---|---|---|
| Friend (referee) | 15% off first order | Unique code via referral app (`REF15-XXXX` style), one per customer, not valid on subscriptions beyond first payment |
| Referrer | $10 store credit per converted referral ($15 for 24/48-tier subscribers) | Store credit / gift card; max $30 credit applied per order |

- Platform per roadmap Phase 4: Smile.io or ReferralCandy (post-launch, after 500+ customers); TikTok Shop affiliate runs separately at 10–20% commission.
- Margin note: friend side (15% off $36 = $30.60, $2.55/serving) = 64.7% margin; referrer credit ≈ $10 off a future ~$36+ order — blended cost of a referred acquisition ≈ $15.40, well under the <$25 CAC target.
- Referral credits do **not** combine with SHROOME20/30 or founders codes (customer keeps whichever is deeper). Credits do apply on top of subscription pricing (they're payment, not discount).

---

## 5. Stacking Rules — Single Source of Truth

| ↓ combined with → | SHROOME20 | SHROOME30 | Founders codes | Sub tier pricing | Referral credit | Launch auto free-ship |
|---|---|---|---|---|---|---|
| **SHROOME20** | — | ❌ | ❌ | ✅ first payment only | ❌ | ✅ |
| **SHROOME30** | ❌ | — | ❌ | ✅ first payment only | ❌ | ✅ |
| **Founders codes** | ❌ | ❌ | ❌ (one per order) | ❌ | ❌ | ✅ |
| **Sub tier pricing** | ✅ (1st) | ✅ (1st) | ❌ | — | ✅ | ✅ |
| **Referral credit** | ❌ | ❌ | ❌ | ✅ | ✅ (≤$30/order) | ✅ |

Shopify `combinesWith` settings: SHROOME20/30 → `{ orderDiscounts: false, productDiscounts: false, shippingDiscounts: true }`; launch auto free-ship → `{ orderDiscounts: true, productDiscounts: true }`.

---

## 6. Margin Floor Summary (CFO one-glance)

| Layer | Deepest per-serving | Margin @ $0.90 COGS |
|---|---|---|
| One-time list | $2.63 (48-pack) | 65.7% |
| Subscription steady-state | $2.10 (48/monthly) | 57.1% |
| Public first-order promo | $2.10 (SHROOME30 on 12-pack) | 57.1% |
| First-order promo × sub stack | $1.47 (SHROOME30 × 48/monthly, cycle 1 only) | 38.8% |
| Grandfathered founders max | $1.80 (40% off, founders only) | 50.0% |

Everything at steady state sits ≥ 57% gross; the 65–75% guardrail holds for one-time list prices and the shallow subscription cells. **Re-validate the whole table when real COGS land in `unit-economics-template.md`; if COGS > $1.05/sachet, the $36 anchor itself breaks the 65% floor and pricing goes back to CEO/CFO.**
