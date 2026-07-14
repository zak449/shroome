# shroomé — Launch Day Report
> 2026-07-14 · Prepared by the launch agent org · Branch: `claude/pensive-albattani-5pk3fo`

## What shipped today

### 1. Shopify store — LIVE and seeded (shroome-3.myshopify.com)
- 4 products / 10 variants, ACTIVE with images: vanilla, strawberry, variety pack, first pour kit
- Official SKUs from SKUMaster.xlsx (`SHR-BOX-VAN-12`, …) with real GS1 GTINs (860015741318 / 860015741332) on the 12-boxes
- All inventory 0, tracked, deny policy → everything shows SOLD OUT
- `SHROOME20` live: 20% off, once per customer, combines with nothing
- `SHROOME30` live: 30% off, **gated to the "SMS subscribers (early drop access)" customer segment** — physically unusable without phone opt-in; replaces the 20 (best code wins)
- Collection "the drop" (handle `the-drop`) with all 4 products

### 2. Website (Vercel — deploys when this branch merges to main)
- `/drop` storefront: drop 001 sold-out grid, real GTIN product schema, subscription matrix teaser, drop ledger
- 5 ghost LPs (noindexed, single CTA, per-segment GA4 tagging): `/lp/ritual` `/lp/glow` `/lp/calm` `/lp/focus` `/lp/pour`
- Lifecycle bugs fixed: Turnstile fail-closed on every signup surface, RFC 8058 one-click unsubscribe + postal footer, duplicate signups reuse referral codes, day-7 cron can never 500, referral counts never fabricate, robust phone normalization
- Copy aligned to CFO ruling everywhere: codes never stack; referrals = fixed $5/$10/$15 credits + case-001 leaderboard; grandfather line on /founders
- Honest social proof only (ops-owned figures in `app/lib/drop-config.ts`)
- Build: clean, 99 pages

### 3. Commercial architecture
- SKU catalog, 3×3 subscription matrix (12/24/48 × 2wk/30d/60d, 10→20%, subscriber drop allocation guaranteed), discount matrix with stacking-truth table
- CFO verdict: **GO-WITH-CHANGES** (all four changes implemented). Guardrails: 30% max discount, 30% contribution floor, $50 free-ship threshold, CAC ceiling $9→$13
- Shopify seed script (`scripts/shopify-seed.mjs`) kept as idempotent re-run/backup

### 4. Marketing arsenal
- 5 segments + full LP copy briefs, creative direction, AI toolstack
- 30-day TikTok + 30-day Instagram calendars (Jul 20–Aug 18) with sold-out→restock arc
- Ad Creative Library v1: 30 segment ads + 6 BOF drop ads + creator/UGC briefs + testing matrix with kill/scale rules
- Funnel teardown (Magna/Seed) with prioritized upgrades
- Lifecycle: capture-ladder flows (6 emails + 8 SMS, TCPA-checked), Klaviyo setup runbook
- SEO/GA4 Shopify migration kit: 53 redirects, Liquid schema/tracking snippets, cutover runbook

## Founder action list (only you can do these)
1. **Merge the branch to `main`** → Vercel deploys the new site (drop page, LPs, all fixes)
2. **Verify Resend sending domain** (top email blocker — welcome emails may silently fail until done)
3. **Set env vars in Vercel**: `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (now enforced), optional `REFERRAL_STATS_URL`
4. **Shopify dashboard**: pick theme (Dawn), connect payments/shipping/taxes, install Klaviyo app (syncs SMS consent → powers the SHROOME30 gate), install Loop/ReCharge and load the subscription matrix
5. **Paula's brand assets**: Promo Kit folder shares as empty — have Bolden re-share folder + contents, or add copies to your Shroomé folder
6. **Upload to Drive**: final sachet/box dielines, COAs, vector logo masters (audit lists all gaps)
7. **Ops truth check** in `app/lib/drop-config.ts`: confirm "sold out in 9 days" and set DROP 002 date/allocation when real

## Decisions flagged for you
- **JSON-LD reviews/ratings on homepage + flavor pages look fabricated** (5★, reviewCount 6-12, "Early Taster" reviews). If these aren't real collected reviews, remove them — Google penalizes fake review markup and it's an FTC risk. Same question for the /founders "Beta Tester" quotes.
- **/founders is date-stale**: counts down to June 15 (past) and success page says "numbered box" while the FAQ says "no numbered boxes." Needs a product decision (retire the page or re-premise it for drop 002).
- **Trial kit SKU** renamed `SHR-KIT-VAR-06` (new KIT/VAR codes) — needs your sign-off in the SKUMaster Code Reference tab.
- **Post-launch anchor**: CFO says either move to $40–42/12-pack or cap all future discounts at 22%.
- **Formula doc discrepancy RESOLVED**: Bolden formulation sheet V2 (6/18/2026) confirms **2.5g matcha** — the repo formulation doc (which said 2g) has been corrected and the site 2.5g is canonical. Note two other claims flagged in the same audit and swept from live copy: (1) **beta-glucan %** — the sheet documents 200mg lion's mane *extract* with no BG % → all "≥70% beta-glucans"/"200mg beta-glucans" claims pulled pending an Immulink CoA; (2) **"no added sugar"/"no preservatives"** pulled — 10g agave = 8g added sugars, and the formula contains Prolong 2.0. Caffeine (~60mg) and Kyoto origin are on-pack but still need supplier CoAs.
