# shroome Unit Economics — Filled Model (July 2026)

> Last updated: 2026-07-14
> Owner: CFO
> Source of truth: `Shroome_FinancialV2.xlsx` where real numbers exist (cells cited as `Sheet!Cell`); all other figures are **market benchmark assumptions** for premium matcha CPG, labeled `[BM]`. Original blank template preserved at `unit-economics-template.md`.
> Pricing basis: LIVE SITE established pricing — 12-pack $36 one-time ($3.00/serving, matches `Assumptions!B8:B9`); founders pre-order $25.20/12-pack locked "forever"; referral ladder 33/36/40% off ($24.12/$23.04/$21.60); SHROOME20 (20% + free ship), SHROOME30 (30% + free ship); subscription 10–20% off the $36 anchor; 24-pack $66–68 (modeled at $66).
> Formulation per sachet (company-overview.md): 2.5g ceremonial matcha + 200mg organic lion's mane fruiting-body extract + 2g grass-fed collagen. (Do not publish a beta-glucan % — unsubstantiated pending supplier CoA; see 2026-07 claims audit.)

---

## Per-Sachet COGS Breakdown — Lean / Base / Premium

The xlsx carries a single all-in figure: **$0.75/sachet** (`Assumptions!B5`), COGS/box $9 at 12 sachets (`Assumptions!B6:B7`, `Optimistic Model!B8`). Bottom-up build below reconciles to it — Base lands at $0.69 raw + ~8% waste/overfill buffer = **$0.75**.

| Line Item | Lean | Base | Premium | Notes |
|---|---|---|---|---|
| Ceremonial matcha (2.5g) | $0.200 | $0.275 | $0.375 | [BM] $80 / $110 / $150 per kg; ~400 sachets/kg |
| Mushroom extract, 200mg (8:1, ≥70% BG) | $0.012 | $0.018 | $0.024 | [BM] $60 / $90 / $120 per kg fruiting-body hot-water extract |
| Collagen peptides (2g, grass-fed) | $0.030 | $0.040 | $0.050 | [BM] $15 / $20 / $25 per kg |
| Flavoring (vanilla/strawberry, natural) | $0.020 | $0.040 | $0.060 | [BM] incl. natural sweetener system |
| Sachet packaging (printed foil stick-pack) | $0.060 | $0.090 | $0.130 | [BM] at 25k / 15k / 10k MOQ; xlsx MOQ = 15,000/flavor (`Assumptions!B11`) |
| Filling & co-packing labor | $0.100 | $0.150 | $0.220 | [BM] co-packer stick-pack line, per-unit at MOQ |
| Quality testing (per batch, amortized) | $0.050 | $0.080 | $0.120 | [BM] ~$750–1,800/batch (beta-glucan, heavy metals, micro) ÷ 15,000 |
| Subtotal (bottom-up) | $0.472 | $0.693 | $0.979 | |
| **Total COGS per sachet (modeled)** | **$0.47** | **$0.75** | **$0.98** | Base anchored to `Assumptions!B5` = $0.75 (incl. buffer) |

**Per-box product COGS** (sachets + printed carton [BM $0.50 / $0.85–1.10 / $1.25] + insert card [BM $0.10–0.20]):

| SKU | Lean | Base | Premium |
|---|---|---|---|
| 12-pack | $6.24 | $10.00 | $13.21 |
| 24-pack | $12.06 | $19.25 | $25.19 |

---

## Shipping & Fulfillment Costs (per order)

| Line Item | Lean | Base | Premium | Notes |
|---|---|---|---|---|
| Pick & pack (3PL) | $2.50 | $3.00 | $3.50 | [BM] per-order + per-item; ShipBob-class 3PL |
| Shipping materials (mailer, tissue, insert) | $0.40 | $0.50 | $0.60 | [BM] |
| Outbound shipping — 12-pack (<1 lb) | $4.50 | $5.00 | $6.50 | Base = xlsx avg free-ship cost $5 (`Assumptions!B25`); USPS GA zone-avg |
| Outbound shipping — 24-pack | $6.00 | $7.00 | $8.50 | [BM] |
| **Total fulfillment — 12-pack order** | **$7.40** | **$8.50** | **$10.60** | |
| **Total fulfillment — 24-pack order** | **$8.90** | **$10.50** | **$12.60** | |

Payment processing: Shopify Payments 2.9% + $0.30 [BM]. Subscription/recurring orders (incl. founders recurring) add Loop/ReCharge transaction fee ~1.25% + $0.19 [BM] on top of the ~$99/mo app fee (launch-roadmap.md, Essential Apps table).

**All-in cost per 12-pack order (product + fulfillment, before fees): Lean $13.64 / Base $18.50 / Premium $23.81.** Per 24-pack order: Lean $20.96 / Base $29.75 / Premium $37.79.

---

## Pricing Architecture (live site) — Product Gross Margin, Base COGS

Template target: 65–75% GM. GM = (net product revenue − product COGS) / net product revenue.

| Price point | 12-pack price | $/serving | GM Base | vs 65–75% target |
|---|---|---|---|---|
| One-time list | $36.00 | $3.00 | 72.2% | PASS |
| Sub −10% | $32.40 | $2.70 | 69.1% | PASS |
| Sub −15% | $30.60 | $2.55 | 67.3% | PASS |
| Sub −20% | $28.80 | $2.40 | 65.3% | PASS (at edge) |
| SHROOME20 | $28.80 | $2.40 | 65.3% | PASS (at edge) |
| SHROOME30 / Founders lock | $25.20 | $2.10 | 60.3% | **FAIL** |
| Referral 33% | $24.12 | $2.01 | 58.5% | **FAIL** |
| Referral 36% | $23.04 | $1.92 | 56.6% | **FAIL** |
| Referral 40% | $21.60 | $1.80 | 53.7% | **FAIL** |
| 24-pack list | $66.00 | $2.75 | 70.8% | PASS |
| 24-pack sub −20% | $52.80 | $2.20 | 63.5% | marginal FAIL |
| 24-pack SHROOME30 | $46.20 | $1.93 | 58.3% | **FAIL** |

---

## Contribution Margin Matrix — Base COGS
(CM = net revenue − product COGS − fulfillment − payment fees − sub fees where recurring. Free shipping on all discounted/sub orders; full-price 12-pack assumed to pay $5.95 shipping. CM% of net revenue.)

| Cell | 12-pack ($36 anchor) | 24-pack ($66) |
|---|---|---|
| Full price one-time | $21.93 (52.3%) | $34.04 (51.6%) |
| Sub −10% | $12.07 (37.2%) | $26.69 (44.9%) |
| Sub −15% | $10.34 (33.8%) | $23.53 (41.9%) |
| Sub −20% | $8.62 (29.9%) ← at floor | $20.37 (38.6%) |
| SHROOME20 (20% + free ship) | $9.17 (31.8%) | $21.22 (40.2%) |
| SHROOME30 (30% + free ship) | $5.67 (22.5%) **below floor** | $14.81 (32.1%) |
| Founders $25.20 locked, recurring | $5.16 (20.5%) **below floor** | — |
| Referral 33% ($24.12) | $4.62 (19.2%) **below floor** | — |
| Referral 36% ($23.04) | $3.57 (15.5%) **below floor** | — |
| Referral 40% ($21.60) | $2.17 (10.0%) **below floor** | $8.40 (21.2%) **below floor** |
| SHROOME20 + SHROOME30 stacked (44% eff.) | $0.78 (3.9%) **near zero** | $7.03 (19.0%) below floor |
| SHROOME30 applied on founders price ($17.64) | **−$1.67 NEGATIVE** | — |

**Margin floor used: contribution margin ≥ 30% of net revenue per order** (needed to fund CAC + opex + 3–5% returns and still net a profit). Cells failing the floor in Base: 12-pack SHROOME30, founders recurring, all three referral tiers, 24-pack referral-40%, and every stacked combination. Only stacked combinations go contribution-NEGATIVE in Base.

### Coordinator-requested worst-case tests (12-pack, free shipping, all three COGS scenarios)

| Case | Lean | Base | Premium |
|---|---|---|---|
| (a) Referral 40% — $21.60 | +$7.03 (32.6%) | +$2.17 (10.0%) | **−$3.14 NEGATIVE** |
| (b) Founders $25.20 locked forever, recurring (incl. sub fees) | +$10.02 (39.8%) | +$5.16 (20.5%) | **−$0.15 NEGATIVE** |
| SHROOME30 $25.20 one-time | +$10.53 (41.8%) | +$5.67 (22.5%) | +$0.36 (1.4%) |

**Findings:**
- The **40% referral tier is a structural problem**: even in Base it retains only $2.17/order — it cannot absorb CAC, a 3–5% return rate, or any COGS drift; in Premium COGS it loses $3.14 per order, forever, on the exact customers who refer the most.
- The **founders "forever" lock is contribution-positive in Base ($5.16/order) but has zero inflation headroom**: at Premium COGS ($0.98/sachet — i.e., a matcha price spike to $150/kg) it goes negative on every recurring order in perpetuity. The lock transfers all input-cost risk to Shroomé with no expiry.
- Contribution break-even discount on the $36 12-pack (Base): **46%**. The 40% tier sits $0.06/serving above insolvency pricing.
- Max discount that holds the 30% CM floor at the $36 anchor: **22%**. Holding a 30% max discount at the floor requires an anchor of **≥$40.05/12-pack ($3.34/serving)**.

Cadence (2wk/30d/60d) does not change per-order economics — it moves LTV via orders/year (26 / 12 / 6 max annual orders).

---

## Customer Acquisition Cost (CAC)

| Channel | Spend | CAC | Source |
|---|---|---|---|
| Organic social | $0 | ~$0 | `Pre-Launch Plan!B4:D4` |
| Paid TikTok | $8,000 pre-launch | $3.20/signup | `Pre-Launch Plan!B5:D5` |
| Paid Meta | $6,000 pre-launch | $3.33/signup | `Pre-Launch Plan!B6:D6` |
| Influencer seeding | $3,000 | $2.00/signup | `Pre-Launch Plan!B7:D7` |
| Email/SMS | $45–150/mo | near-$0 | roadmap budget table |
| **Blended purchase CAC (modeled)** | | **$20–22 M1 → $8 at M18+** | `Assumptions!B37:B38`, `Optimistic Model!B33` |

Referral program adds an acquisition cost of its own: each referred customer's reward is a deeper margin giveaway on the referrer's future orders (see matrix above) — count it in blended CAC.

---

## Lifetime Value (LTV) — 12-month contribution basis, Base COGS

| Assumption | Value | Source |
|---|---|---|
| Subscription conversion | 15% | `Assumptions!B40` |
| Repeat purchase rate (one-time buyers) | 30% (35% target M12) | `Assumptions!B39` |
| Subscriber orders in 12 mo (median, 30d cadence) | 5 | [BM]; template >70% M3 retention |
| One-time buyer 12-mo contribution | ~$14 | SHROOME20 first order $9.17 + 0.30 × ~$15 reorder |
| Subscriber 12-mo contribution | ~$70 | 5 orders × ~$14 avg CM (12/24 mix) |
| Founders-lock customer 12-mo contribution | ~$46 | 9 orders × $5.16 |
| **Blended contribution LTV (12-mo, launch mix)** | **~$27** | 70% one-time / 15% sub / 15% founders |
| Blended LTV (target mix: 25% sub conv, 24-pack hero) | ~$40 | |

**CAC ceiling at 3:1 LTV:CAC: $9 (launch mix) → $13 (target mix).** Modeled M1 CAC of $20–22 is ~1.3–1.5:1 — a breach; tolerable only for the first 60 days of launch spend.

---

## Monthly Recurring Costs (Fixed Overhead)

| Line Item | Monthly | Source |
|---|---|---|
| Shopify Basic | $39 | launch-roadmap.md Phase 1 |
| Loop / ReCharge subscriptions | $99 | roadmap Essential Apps |
| Klaviyo (email + SMS) | $45 | roadmap budget (M3 tier) |
| Judge.me reviews | $10 | roadmap Essential Apps |
| Gorgias/Tidio support | $10 | roadmap Essential Apps (low tier) |
| Domain | $2 | [BM] |
| Product liability insurance | $100 | [BM] ~$1,200/yr supplement CPG |
| Accounting/bookkeeping | $150 | [BM] |
| Software misc | $55 | [BM] |
| **Total fixed — LEAN** | **~$510** | |
| + paid ads $5,000, influencer $2,000, partnerships $2,000, app upsize ~$390 | | roadmap Budget Estimates, Month 3 |
| **Total fixed — GROWTH** | **~$9,400** | |

---

## Break-Even Analysis

Blended contribution per sachet (Base COGS): **~$0.80 during launch window** (mix heavy in SHROOME30/founders/referral pricing) rising to **~$1.10 steady-state** (codes expired, mix normalizes toward list + sub ≤15% + 24-packs).

| Scenario | Fixed Costs | Contribution/Sachet | Break-Even |
|---|---|---|---|
| Lean (essentials only) | $510/mo | $0.80 → $1.10 | **~465–640 sachets/mo (≈40–53 orders)** |
| Growth (with marketing) | $9,400/mo | $0.80 → $1.10 | **~8,500–11,750 sachets/mo (≈$26–30k gross rev)** |
| Scaled (+~$25k payroll) | ~$34,400/mo | $1.10 | ~31,300 sachets/mo |

Cross-check: xlsx base case breakeven M5–7 (`Scenarios!C14`) at the same $36 anchor with 18% blended discount (`Assumptions!B26`) and 48.5% CM (`Optimistic Model!B15`).

---

## Key Financial Metrics to Track

| Metric | Frequency | Target |
|---|---|---|
| Product GM per sachet | Monthly | 65–75%; hard floor 60% after any discount |
| Contribution margin per order | Monthly | ≥30% of net revenue |
| Blended CAC (incl. referral giveaway cost) | Monthly | <$13; kill channels >$25 (`Risks & Levers!B13`) |
| LTV:CAC | Quarterly | >3:1 |
| Subscription conversion / retention | Monthly | ≥15% conv (`Assumptions!B40`); >70% at M3 |
| Founders cohort size × avg orders/mo | Monthly | Track locked-price liability |
| Cash runway | Monthly | >6 mo (contingency only $1,400 in $50k plan, `Pre-Launch Plan!B22`) |
| Inventory weeks of supply | Monthly | ≤9 weeks (6wk lead + 3wk safety, `Assumptions!B43:B44`) |

---

## Sensitivity Notes

- **Matcha +20%** ($110→$132/kg): Base sachet $0.75→$0.81. Founders recurring CM falls $5.16→$4.44; referral-40% falls $2.17→$1.45. Floors erode fast because deep-discount cells have no buffer.
- **Full Premium drift** ($0.98/sachet): referral-40% −$3.14/order; founders recurring −$0.15/order; SHROOME30 12-pack ≈ break-even. **PO ceiling: $0.80/sachet all-in.**
- **Returns/refunds 3–5%**: shave ~1.5–2.5 pts off all CM% figures.
- **MOQ 15k→10k**: +$0.03–0.04/sachet packaging; ~0.5 pt margin cost — acceptable to de-risk flavor inventory (`Risks & Levers!C8`: flavor flop = $11k+ dead inventory).
