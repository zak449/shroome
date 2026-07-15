# shroomé funnel KPI framework — one table that ties ads ↔ LPs ↔ drops together

> Date: 2026-07-15 · Owner: CMO
> Purpose: the marketing machine is specced as one system (segment → LP → capture → SMS → quiz → referral → drop → sub) but had **no shared measurement layer** — each doc named its own success without a spine connecting them. This is that spine. One metric per stage, one source of truth, one guardrail. Pre-revenue today, so "target" = the launch-window bar to beat; revisit at the CFO anchor review (end of launch month).
> Attribution spine (already live, do not change): every LP fires the drop-access event to `/api/waitlist` with `utm_source={meta|tiktok}&utm_medium=paid&utm_campaign=lp-{slug}&utm_content={ad_code}`. Klaviyo segments welcome flows by `utm_campaign`; SMS opt-ins tagged separately. This UTM pattern is the join key across every row below — nothing here works if `utm_content={ad_code}` isn't preserved end-to-end (see sync-map G5: `/refer` is the one surface currently missing it).

## The framework

| # | Funnel stage | Primary KPI (the one that matters) | Source | Launch-window bar | Guardrail / linked doc |
|---|---|---|---|---|---|
| 1 | Ad → click (prospecting) | CTR + CPC by `ad_code`; blended CAC | Meta/TikTok Ads Mgr | Kill any `ad_code` below account-median CTR after 3 days (library kill rule) | CAC ceiling **$9 launch mix / $13 target**, kill channel >$25 — CFO memo (c) |
| 2 | Ad → LP message-match | LP bounce rate + scroll-to-CTA by `utm_campaign` | GA4 / Vercel | Bounce < prospecting benchmark; every ad's headline = its LP h1 | `meta-ads-landing-sync-map.md` §1 (all 5 TOF rows must stay ✅ MATCH) |
| 3 | LP → email capture | Signup conversion rate by `utm_campaign` (LP) | `/api/waitlist` → Klaviyo/Sheets | The core paid-efficiency number; watch per-segment, not blended | Turnstile enforced, dedupe on (lifecycle-audit H1/H2) — dirty list corrupts every downstream rate |
| 4 | Email → SMS opt-in | % of signups adding phone | Klaviyo `sms_opt_in` | SMS list is the drop-day money list — track as the key upgrade rate | "best code wins," never "stacks" (CFO); SMS = SHROOME30 + 10-min early |
| 5 | Signup → quiz complete | Quiz completion % + `pour_profile` coverage | Quiz webhook → Klaviyo | **Blocked — quiz unbuilt** (sync-map G2). Segmentation KPI is dark until then | funnel-teardown #1; unlocks FLOW C + flavor-segmented drop creative |
| 6 | Referral loop | Referral starts per `ad_code`; K-factor (invites × conversion) | `/refer` + referral webhook | Referral starts are the primary metric for `RIT_SPK_04`/`FCS_IMG_02` | **Blocked — no per-ad UTM on `/refer`** (sync-map G5, DO-NOW). Rewards fixed $5/$10/$15, cap $15 |
| 7 | Drop conversion | Sell-through % + time-to-sellout; AOV (24-pack mix) | Shopify | Honest scarcity = real runs only; publish counts = actual production | 30% absolute discount cap; free-ship $50 nudges to 24-pack — CFO memo (c) |
| 8 | Drop → subscription | Sub take rate at checkout; sub % of drop revenue | Shopify / Loop | Sub conversion **≥15% floor, 25% target** (P&L calibrated to this) | Sub cap 20%; below 15% "paid spend destroys value" — CFO risk #3 |
| 9 | Retention | 60-day contribution payback; repeat/reorder rate | Shopify / Klaviyo | Enforce 60-day payback weekly (CFO rule) | Blended discount ≤18% modeled — every +5pts = −$1.60/12-pack (CFO risk #4) |
| 10 | Promo-instrument efficiency | Promo COGS by placement tag vs contribution | Shopify order tags (`gift-sms-001`, `gwp-drop-002`, `ref-3-kch`…) | Every placement clears the 30% CM floor per order | `promo-value-add-plan.md` §3/§5.4 reporting; keychain ≤$2.50, gels ≤$5 landed |

## Two cross-cutting numbers (the ones the founder should see weekly)

- **CAC : 12-mo contribution LTV** — the whole P&L lives or dies here. Launch mix ≈ $27 LTV; keep blended CAC under $9 or the ratio breaks (CFO memo (f) risk #3). Every stage above is a lever on this one ratio.
- **Blended discount %** — modeled at 18% (`Assumptions!B26`). Stacking leaks, the referral double-pay (sync-map G4), and codes on already-discounted prices all push it up silently. This is the single number that turns a positive unit economic negative without anyone noticing.

## What's not measurable yet (measurement debt, ordered)

1. **Referral-start attribution** (G5) — DO-NOW, blocks stage 6.
2. **Quiz/segmentation capture** (G2) — blocks stage 5 entirely; every downstream flow runs un-personalized until built.
3. **Day-7 / lifecycle sends** — the follow-up cron is broken (lifecycle-audit B2); move to Klaviyo flows before any stage-4/9 email metric is trustworthy.
4. **Referral counts read as 0** (lifecycle-audit M2) — stage 6 K-factor is un-instrumented until the code→profile mapping exists.
