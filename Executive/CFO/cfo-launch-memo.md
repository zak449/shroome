# CFO Launch Memo — Pricing Architecture Verdict

> Date: 2026-07-14
> From: CFO
> To: CEO / SKU Master / Growth
> Re: Unit economics, margin guardrails, and GO/NO-GO on the live-site pricing architecture
> Backing model: `Executive/CFO/Financial Models/unit-economics-2026-07.md` (full tables, cell citations, methodology)

---

## VERDICT: **GO-WITH-CHANGES**

The core architecture is sound — $36/12-pack ($3.00/serving), $66–68/24-pack, subscription 10–20% off, and the SHROOME20/SHROOME30 launch codes all clear contribution-positive in the Base COGS scenario, and the $0.75/sachet all-in COGS (`Assumptions!B5`) supports a 72% list-price gross margin. **But two live-site promises are structurally broken and one code-stacking ambiguity is dangerous. Fix the four changes below before launch day.**

### Required changes

1. **Kill or restructure the 40% referral tier (and re-cut 33/36%).** At $21.60/12-pack with free shipping it retains $2.17/order in Base COGS (10% CM) and is **contribution-NEGATIVE (−$3.14/order) in the Premium COGS scenario** — a perpetual loss concentrated on your most active advocates. Contribution break-even is a 46% discount; 40% leaves $0.06/serving of air. Replace percent-off escalation with fixed rewards: free sachets (COGS $0.75, perceived value $3+), or $5/$10/$15 store credit at 1/3/5 referrals. If percent-off must stay, cap the ladder at 30% (= founders parity).
2. **Fence the founders "forever" lock.** $25.20 recurring earns $5.16/order in Base (20.5% CM — contribution-positive, honor it) but goes **negative (−$0.15/order) at Premium COGS**, i.e., a matcha spike to ~$150/kg makes the promise a perpetual liability. Mitigate: (a) hard-cap the founders cohort now and close it at launch; (b) lock 12 months of matcha/collagen pricing in the co-packer PO with a $0.80/sachet all-in ceiling; (c) apply the lock to the 12-pack SKU only, not future SKUs; (d) never allow codes on top of the locked price — SHROOME30 applied over $25.20 is **−$1.67/order in Base**.
3. **Make all discounts mutually exclusive in Shopify.** Roadmap SMS copy says SHROOME30 "stacks." If 20% + 30% combine (44% effective), the 12-pack retains $0.78/order (3.9% CM) in Base and is negative in Premium. Configure SHROOME20/SHROOME30 as "cannot combine with other discounts," one per customer, 14-day expiry (already in roadmap); rewrite the SMS copy — "stackable" must mean *you got the bigger code*, not *use both*.
4. **Raise the post-launch anchor to $40–42/12-pack ($3.34–3.50/serving), or cap all future discounts at 22%.** At the $36 anchor, the deepest sustainable discount that holds a 30% contribution floor is 22%; the sub−20% tier already sits at 29.9% CM (exactly at floor) and SHROOME30 at 22.5%. Founders keep their locked price either way — the anchor raise applies to new customers after the launch window. Target price point in company-overview.md is $2.50–3.50/serving, so $3.34+ stays on-strategy.

---

## (a) COGS Scenarios (per sachet / per 12-pack order all-in incl. fulfillment)

| Scenario | $/sachet | 12-pack product | 12-pack order all-in | Basis |
|---|---|---|---|---|
| Lean | $0.47 | $6.24 | $13.64 | Matcha $80/kg, 25k MOQ, best-case co-pack |
| **Base** | **$0.75** | **$10.00** | **$18.50** | Anchored to `Assumptions!B5`; bottom-up $0.69 + buffer. Matcha $110/kg, 15k MOQ (`Assumptions!B11`), $5 avg ship (`Assumptions!B25`) |
| Premium | $0.98 | $13.21 | $23.81 | Matcha $150/kg, 10k MOQ, heavier QC |

Bottom-up Base build: matcha 2.5g $0.275 + lion's mane 200mg (8:1, ≥70% BG) $0.018 + collagen 2g $0.040 + flavor $0.040 + foil sachet $0.090 + fill/co-pack $0.150 + QC amortized $0.080 = $0.69.

## (b) Margin by SKU / tier / discount — Base COGS (contribution per order, % of net revenue)

| Cell | 12-pack ($36) | 24-pack ($66) |
|---|---|---|
| List one-time | $21.93 (52.3%) | $34.04 (51.6%) |
| Sub −10 / −15 / −20% | $12.07 (37.2%) / $10.34 (33.8%) / $8.62 (29.9%) | $26.69 (44.9%) / $23.53 (41.9%) / $20.37 (38.6%) |
| SHROOME20 | $9.17 (31.8%) | $21.22 (40.2%) |
| SHROOME30 | $5.67 (22.5%) ✗ | $14.81 (32.1%) |
| Founders $25.20 recurring | $5.16 (20.5%) ✗ | — |
| Referral 33 / 36 / 40% | $4.62 (19.2%) ✗ / $3.57 (15.5%) ✗ / $2.17 (10.0%) ✗ | 40%: $8.40 (21.2%) ✗ |
| 20+30 stacked | $0.78 (3.9%) ✗✗ | $7.03 (19.0%) ✗ |
| SHROOME30 on founders price | **−$1.67 NEGATIVE** | — |

✗ = fails the 30%-CM margin floor. **Cells below floor in Base: 12-pack SHROOME30, founders recurring, all referral tiers, 24-pack referral-40%, all stacks.** Contribution-negative in Base: only stacked combos on founders pricing. In Premium COGS, referral-40% and founders-recurring both go negative; SHROOME30 12-pack is break-even (+$0.36).

Worst-case tests requested: **$21.60 + free ship → Lean +$7.03 / Base +$2.17 / Premium −$3.14. Founders $25.20 recurring → Lean +$10.02 / Base +$5.16 / Premium −$0.15.**

## (c) GUARDRAILS

| Guardrail | Number | Rationale |
|---|---|---|
| Minimum viable price per serving (list) | **$3.34** ($40.05/12-pack) if 30% discounts exist; at the $36 anchor ($3.00/serving), max discount is 22% | 30% CM floor after product + fulfillment + fees |
| Absolute price floor (any cell, any promo) | **$2.35/serving net** ($28.20/12-pack net) | Below this the order can't fund CAC + returns + opex |
| Max total discount depth | **30%, non-stackable, one code per customer, 14-day window** | 46% = contribution break-even; 30% is the last cell that's meaningfully positive |
| Free-shipping threshold | **$50** (24-pack qualifies; 12-pack pays $5.95 unless using a launch code) | Ship cost $5–7/order; threshold pushes AOV to the 24-pack, the margin workhorse ($20–34/order CM) |
| COGS ceiling in vendor POs | **$0.80/sachet all-in** | Above this, founders lock and 30% cells go negative |
| CAC ceiling @ 3:1 LTV:CAC | **$9 blended at launch mix; $13 at target mix** (25% sub conversion, 24-pack hero). Kill any channel >$25 (`Risks & Levers!B13`) | 12-mo contribution LTV ≈ $27 launch mix / $40 target mix. Modeled M1 CAC $20–22 (`Assumptions!B37`) runs ~1.4:1 — acceptable ≤60 days only |

## (d) Break-even (Base COGS, blended contribution $0.80/sachet launch mix → $1.10 steady-state)

| Scenario | Fixed/mo | Break-even |
|---|---|---|
| **Lean** (Shopify $39 + Loop $99 + Klaviyo $45 + apps/insurance/accounting ≈ $510) | $510 | **~465–640 sachets/mo (~40–53 orders)** |
| **Growth** (roadmap M3 budget: +$5k ads, $2k influencer, $2k partnerships ≈ $9,400) | $9,400 | **~8,500–11,750 sachets/mo (~$26–30k gross revenue)** |

Consistent with xlsx base-case breakeven at M5–7 (`Scenarios!C14`).

## (e) Verdict

**GO-WITH-CHANGES** — the four changes at top. The $36 anchor with codes ≤30%, subs ≤20%, and the 24-pack at $66 is launchable as-is; the referral ladder and unfenced founders lock are not. No change is needed to COGS plan or MOQ strategy (15k/flavor, `Assumptions!B11`) to launch.

## (f) Top 5 financial risks pre-launch

1. **Cash runway.** $50k plan leaves $1,400 contingency (`Pre-Launch Plan!B22`); xlsx flags "one bad month = crisis" (`Risks & Levers!C4`) and the optimistic model needed $275k of debt draws with cash dipping negative before draws (`Optimistic Model!A66:A70`).
2. **Locked-price liability + COGS inflation.** Founders "forever" at $25.20 with matcha spot prices volatile: a drift to Premium COGS makes an entire cohort permanently contribution-negative. Hedge with 12-mo supplier pricing and the $0.80/sachet PO ceiling.
3. **CAC vs LTV breach.** Modeled M1 CAC $20–22 against a $27 launch-mix contribution LTV is ~1.4:1, not 3:1. If CAC doesn't fall on the xlsx glide path ($8 by M18, `Assumptions!B38`) or sub conversion stalls below 15% (`Assumptions!B40`), paid spend destroys value. 60-day payback rule from the template must be enforced weekly.
4. **Discount leakage.** Stackable-code ambiguity, referral 40% tier, and codes applying to already-discounted founders/sub prices can silently push blended discount past the modeled 18% (`Assumptions!B26`) — the whole P&L is calibrated to that number; every 5 pts of extra blended discount cuts ~$1.60 contribution per 12-pack.
5. **Inventory concentration.** 15k sachets/flavor MOQ, 6-week lead, 3-week safety stock (`Assumptions!B43:B44`): a flavor flop strands ~$11k (`Risks & Levers!C8`), while a launch spike beyond 2,500 boxes stocks out with no reorder inside 6 weeks — both tails are expensive at a $50k capital base.

---
*Model detail, matrix math, and sensitivity analysis: `Executive/CFO/Financial Models/unit-economics-2026-07.md`. Original template untouched at `unit-economics-template.md`.*
