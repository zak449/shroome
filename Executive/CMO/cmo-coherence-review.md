# CMO Coherence Review — does the marketing machine still fire as one system?

> Date: 2026-07-15 · Owner: CMO
> Trigger: post-Bolden re-skin + 2026-07-14 claims cleanup ("no added sugar" and beta-glucan % retired). Question: after those two changes, is the full funnel (waitlist → SMS → drop → subscription → referral) still one coherent system, and where are the gaps?
> Scope reviewed: `Brand/bolden-identity-extraction.md`, `Brand/site-reinvention-blueprint.md`, `Marketing/Strategy/*`, `Marketing/Segments/*`, `Marketing/Ads/*`, `Marketing/Email/*`, `Product/SKU Catalog/*`, `Executive/CFO/cfo-launch-memo.md`, `10K-Signups-SOP.md`.
> Companion outputs written this pass: gap triage → `Marketing/Ads/meta-ads-landing-sync-map.md` §3; KPI framework → `Marketing/Strategy/kpi-framework.md`; replacement hooks → email/social docs (listed §6).

---

## 0. Headline verdict

**The system is coherent where it was rebuilt, and incoherent exactly where it was NOT.** The post-cleanup canonical layer — segment strategy, the 5 LP briefs, the ad-creative library, the engagement-capture flows (email/SMS copy), the discount matrix, the promo pack — is a genuinely unified machine: one segment → one LP → one CTA, honest scarcity, CFO-aligned offers, banned words swept. The dead-claim value prop did **not** lose differentiation: the TRUE hooks (2.5g ceremonial dose, liquid no-powder format, $3-vs-$7 café math, the collagen + lion's mane stack, the drop model, Mé) carry *more* differentiation than "no added sugar" (which was false) or a beta-glucan % (a spec-war flex now replaced by "200mg fruiting body, on the label," which wins the same focus-segment trust with zero liability).

The incoherence is concentrated in **stale render artifacts that were never rebuilt** — chiefly the two legacy HTML email flows, which are the pre-reskin ghost still carrying dead claims, disease-adjacent language, banned voice, and the old navy/lime palette. Those are live liabilities, now neutralized in-place (§6), but they expose the real structural risk: **the canonical copy exists in Markdown and the rendered assets drifted from it.**

---

## 1. Funnel coherence — verdict per stage

Differentiation checked at each handoff, post-cleanup.

| Stage | Value-prop differentiator (still TRUE?) | Verdict | Note |
|---|---|---|---|
| **Waitlist (email capture)** | drop-access + waitlist number + SHROOME20 locked + personal referral link | ✅ **COHERENT (canonical)** / render debt | Canonical Flow A EMAIL 1 is clean. The rendered `01-Welcome-Flow.html` was the pre-reskin ghost (dead claims + banned voice) — fixed in-place, full re-skin still owed (§6). |
| **SMS opt-in** | 10-min early access + SHROOME30 ("best code wins," never "stacks") | ✅ **COHERENT** | CFO-aligned everywhere (flows, SMS 1–8, sync-map row 6). This is the drop-day money list — cleanest stage in the funnel. |
| **Drop** | honest scarcity (real runs, published counts), live ledger, SMS exclusion, Mé colorway | ✅ **COHERENT** — with two builds owed | `/drop` still "displays instead of persuades" (funnel-teardown #2: no evidence layer, no comparison table). Needs the anchor-drop module (sync-map G3) before "$15 value" is ever legal. |
| **Subscription** | guaranteed allocation ("subscribers never miss a drop") + first-box keychain + every-3rd gels | ✅ **COHERENT on paper** | Teaser perks now synced (sync-map row 11). Margin watch: deepest sub cell + gels amortization sits ~26% CM — below the 30% floor (promo plan §3); rule already exists (drop P6 to every-4th if COGS >$0.90). |
| **Referral** | fixed credits $5/$10/$15 + earned items (keychain@3, gels@5) + case-001 leaderboard | ⚠️ **COHERENT INTENT, 3 open threads** | (a) double-pay: credits *and* items per milestone (G4, unresolved); (b) no per-ad attribution (G5); (c) **live `/refer` still shows legacy "no limit / refer 100 = $500"** (lifecycle-audit H8) — a standing liability contradicting the CFO ruling. |

**Cross-stage differentiation after the claims cleanup:** intact and arguably stronger. The dead claims were either false ("no added sugar" — 8g added agave sugars) or unsubstantiated (beta-glucan %). Removing them forced the copy onto claims that are both true and more ownable: the *format* (liquid, no whisk), the *dose transparency* (200mg on the label), the *math* ($3 vs $7 café), and the *brand system* (drops + Mé) — none of which any earthy competitor can copy. No stage lost its hook; several got a better one.

---

## 2. The 7 sync-map gaps — triage (written into the sync map §3)

Full reasoning is now in `meta-ads-landing-sync-map.md` §3. Summary:

| Gap | Triage | One-line |
|---|---|---|
| G1 — no SMS-first module on `/lp/pour` | **DO-NOW** | Live message-match leak once VID_07 runs; re-point CTA or ship `?sms=1` variant. |
| G2 — no `/quiz` page | **LATER (ad-sync) / BUILD-NOW (capture)** | No ad points there, so no sync leak — but it's the #1 capture gap; blocks all segmentation. |
| G3 — no anchor-drop landing surface | **DROP-002** | Hard dependency: the anchor legalizes "$15 value"; module must be live drop-002 day. |
| G4 — referral ladder economics | **DECISION DO-NOW / impl DROP-002** | Interim double-pays each milestone; get CFO sign-off on items-replace-credits. |
| G5 — `/refer` no paid-UTM | **DO-NOW** | Referral-start is the primary KPI for RIT_SPK_04/FCS_IMG_02 and it's un-attributable. |
| G6 — gels copy blockers | **DROP-002 (blocked on ops data)** | INCI + pairs/singles gate "uses" copy; $18 decision doesn't unblock it. |
| G7 — anchor-drop ops config | **DROP-002** | Eng dependency for G3; anchor line must read from config, never hardcoded. |

---

## 3. Offer / pricing architecture — stacking & cannibalization verdicts vs CFO guardrails

Checked the live architecture ($21 kit, $36/$66/$126 boxes, $18 gels, $15 keychain anchor, SHROOME30, free-ship $50, GWP $66+) against the CFO guardrails (30% absolute discount cap, 30% CM floor, $50 free-ship, $0.80/sachet COGS ceiling).

| # | Offer interaction | Verdict | Detail / action |
|---|---|---|---|
| V1 | **$21 first-pour kit vs $36 12-pack** | ✅ **No cannibalization** | Kit is $3.50/serving — *higher* than the $36's $3.00 and above the CFO min-viable $3.34. It's a premium trial, not a discount. Sound. |
| V2 | **SHROOME30 on the $21 kit** | 🔴 **UNGUARDED — thinnest cell in the system** | Codes carry no SKU restriction (unlike founders codes, which are 12-pack-only). SHROOME30 on the kit = **$14.70 ($2.45/serving gross)** — the shallowest cell anywhere, un-modeled in the CFO memo (which only tables 12/24-pack). **Recommend: restrict SHROOME20/30 to the 12-pack+ (like founders codes), or CFO-confirm 6-pack contribution at 30% off.** Also a UX edge: $14.70 < the $15 launch free-ship trigger, so a code order on the kit silently loses free shipping. |
| V3 | **Drop-day GWP ($66+ → free gels) + SHROOME30 on a 24-pack** | 🔴 **STACKING CONFLICT — breaches the 30% CM floor** | The promo plan checked the GWP against the *list* 24-pack ($34.04 → $30.79, 46.7% CM ✅). It did **not** check it against a *SHROOME30-discounted* 24-pack: $14.81 contribution (32.1% CM) − $3.25 gels ≈ **$11.56 (~25% CM) — below the 30% floor.** The gels are a $0 cart-transform line so they don't breach the *discount* cap, but they do breach the *contribution* floor when stacked on the deepest code. **Recommend: measure the GWP threshold on the post-discount subtotal, or exclude code orders from the GWP, or CFO-verify the stacked cell.** |
| V4 | **Free-ship $50 + GWP $66** | ✅ **Coherent** | Twin nudges to the 24-pack (the CFO margin workhorse). A 24-pack order clears both — intended. |
| V5 | **$18 gels SKU vs gels given free (GWP / 5-ref / sub perk)** | ✅ **Net positive** | Minor cannibalization (why buy at $18 if free at $66 spend?), but the free gels ride a $66 *drink* purchase — a bonus, not a substitute. Selling the SKU is precisely what makes every "$18 value" claim FTC-safe. Keep. |
| V6 | **$15 keychain one-time anchor** | ✅ **Sound** | Capped at 100 units, one colorway, then earned-only. No discount interaction (a $0 gift or a one-time $15 sale). The anchor is the only thing that makes "$15 value" honest — do not ship any "$15 value" copy until ops confirms the 100 sold (pack §0.6, correctly encoded). |
| V7 | **Referral: credits + earned items (double-pay)** | ⚠️ **Safe on cap, leaky on contribution** | $5/$10/$15 credits *plus* +$1.50 keychain / +$3.25 gels COGS per milestone. Doesn't breach the 30% cap (gift = COGS), but pays twice for one milestone. Resolve via the G4 CFO sign-off (items *replace* credits post-launch). |
| V8 | **SHROOME30 (= founders $25.20, both 30%)** | ✅ **Coherent** | Founders fenced (12-pack only, no codes on top, capped cohort). 30% is the honest system-wide floor and both land there intentionally. |

**Two systemic watch-items** (not a single-offer bug, but the way discount leaks compound): the referral double-pay (V7) and the GWP-on-code stack (V3) both push *blended discount* above the modeled 18% invisibly — and the whole P&L is calibrated to that 18% (CFO risk #4: every +5pts = −$1.60/12-pack). Both belong in the weekly blended-discount read (now in the KPI framework).

---

## 4. Channel-fit — voice vs honest-claims regime

**The anti-earthy / loud-main-character voice does NOT conflict with honest claims — by design.** In the matcha-maximalist (`/lp/ritual`) and fifteen-second (`/lp/pour`) segments the loud voice runs on *taste / aesthetic / convenience* claims, which are unregulated, so those ads are claim-free by construction. In glow/calm/focus the claims carry the FDA disclaimer, and for focus the honest spec ("200mg fruiting body, that's the claim, here's the dose") *is* the flex. Poppi/Starface/Graza energy + honest claims are complementary, not in tension.

**The conflicts were in un-rebuilt creative, now flagged/fixed:**

- 🔴 **Legacy HTML email flows (`01`/`02`)** — the pre-reskin ghost. Carried disease-adjacent claims ("activates your immune system," "immune system on full blast," "zero anxiety"), the banned beta-glucan mg ("200MG BETA GLUCANS"), banned brand voice ("the ritual is ready"), false scarcity/acquisition language ("First 500 only," "CLAIM 20% OFF"), no FDA disclaimer, no postal address — all in the warm/insider email channel that's supposed to be the most on-brand surface. **This is the single biggest incoherence in the funnel.** Neutralized in-place + deprecation banners (§6); a full re-skin from the canonical `engagement-capture-flows.md` copy is still owed.
- 🟡 **Spark-ad-candidate social scripts** — `tiktok-30-day.md` day 8 and `tiktok-scripts.md` stated "70%+ beta-glucans"; the "3 things to check" script demanded a beta-glucan % and then claimed shroomé "passes all three" (a self-contradiction, since shroomé can't state a % pre-CoA). These are marked spark-ad candidates = they *become* paid prospecting, so they must obey the honest-claims regime. Fixed to dose+source language (§6).
- ✅ **Paid prospecting library (`ad-creative-library-v1.md`) is CLEAN** — it explicitly bans a beta-glucan % and uses only "beta-glucans support immune function" + disclaimer. The MOF promo pack is clean too (keychain = zero claims; gels = cosmetic lexicon, lanes kept apart). The formal ad library never drifted; only the social calendars and the legacy emails did.

---

## 5. Measurement — was there a spine? (no; added one)

There was **no shared KPI layer** — each doc named its own success (email had open/click targets, ads had kill rules, the CFO had CM floors) but nothing connected ad → LP → capture → SMS → quiz → referral → drop → sub into one measurable system. Added a lean one-table framework: **`Marketing/Strategy/kpi-framework.md`** — one primary KPI per stage, its source, the launch-window bar, and the linked guardrail, plus the two numbers the founder should watch weekly (CAC:LTV, blended discount %) and the measurement debt (referral attribution, quiz capture, the broken Day-7 cron). The UTM pattern (`utm_content={ad_code}`) is the join key across every row — which is exactly why sync-map G5 (`/refer` missing it) is a DO-NOW.

---

## 6. What I changed (replacement hooks written)

All edits preserve slugs, UTMs, and ad codes. `[CMO]` notes mark genuinely-uncertain calls (chiefly: restore a beta-glucan % only once the Immulink CoA substantiates it).

**Legacy email renders — dead claims / banned voice → TRUE hooks + deprecation banners:**
- `Marketing/Email/Flows/02-Whats-Inside-Flow.html` — "200MG BETA GLUCANS" → "200MG LION'S MANE"; "mushroom beta glucans" → "lion's mane fruiting-body extract"; "Activates your immune system / Macrophages… fully switched on" → "Lion's mane, fruiting-body extract / supports immune function"; "No crash. Zero anxiety." → "No crash. Just steady." (calm, steady energy); "FDA GRAS" → "printed on the label"; "The ritual is ready" → "Your pour is ready"; "CLAIM 20% OFF / First 500 only" → "YOUR 20% IS SAVED / locked to this email"; added FDA disclaimer + postal-address placeholder; deprecation banner → canonical `engagement-capture-flows.md`.
- `Marketing/Email/Flows/01-Welcome-Flow.html` — "FDA GRAS designated" → "The dose is on the label"; "Immune system on full blast / activates macrophages & NK cells" → "Fruiting body, not grain filler / supports immune function"; "Focus that lasts all day" → "Supports sustained focus"; "Better gut. Better skin." → "The beauty step you drink" (2g collagen supports skin health); added FDA disclaimer + postal-address placeholder; deprecation banner.

**Spark-ad-candidate social scripts — banned beta-glucan % → dose/source:**
- `Marketing/Social/Content Calendar/tiktok-30-day.md` (day 8) — "standardized to 70%+ beta-glucans" → "200mg… hot-water extracted, printed on the label."
- `Marketing/Social/tiktok-scripts.md` — "Seventy percent-plus beta-glucans" → "200mg… the actual mushroom, printed on the label"; checklist "Is there a beta-glucan percentage?" → "Does it print the dose and the source?" (so the "shroomé passes all three" claim becomes honest).

**New docs:**
- `Marketing/Ads/meta-ads-landing-sync-map.md` §3 — DO-NOW / DROP-002 / LATER triage written per gap.
- `Marketing/Strategy/kpi-framework.md` — the funnel KPI spine (new).
- This review.

## 7. Top items to hand back to the founder / other owners

1. **Rebuild the two email renders** from canonical `engagement-capture-flows.md` on Bolden tokens (the in-place fixes are triage, not the finished asset). Owner: Lifecycle pod.
2. **CFO: two offer stacks to bless or fence** — (V2) SHROOME30 on the $21 kit, and (V3) GWP + SHROOME30 on a 24-pack (breaches the CM floor as modeled).
3. **Kill the live `/refer` "$500 / no limit" copy** (lifecycle-audit H8) — still contradicts the fixed-credit ruling on a live page.
4. **`10K-Signups-SOP.md` is empty** — a named strategy artifact with no content; either populate or remove so it stops implying a plan exists.
5. **DO-NOW sync-map gaps before the keychain/gels MOF pack trafficks:** G1 (pour SMS routing), G5 (`/refer` UTM), G4-decision (referral double-pay).
