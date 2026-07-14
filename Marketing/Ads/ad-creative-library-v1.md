# shroomé paid ad creative library — v1

> Date: 2026-07-14 · Owner: Performance Creative Lead
> State: DROP MODEL. drop 001 sold out; every ad drives **drop-access signups** to the segment ghost LPs. SMS opt-in = 10-minute early access + SHROOME30 (replaces SHROOME20 — **best code wins, never say "stacks"**).
> Sources of truth: `../Segments/segment-strategy.md` (segments + claims), `../Segments/lp-briefs/*.md` (ad→LP congruence), `../Creative/creative-direction.md` (visual system), `../Creative/ai-toolstack.md` (what AI may and may not touch), `Product/Compliance & Claims/claims-guidelines.md` (claims), `../Strategy/funnel-teardown-2026-07.md` (funnel thesis).
> Palette: Navy `#1B1F3B` · Cream `#FDF4EE` · Lime `#C8FF3A` · Pink `#FFB7D1` · Lavender `#D4B8E0` · Soft Lavender `#E8D5F0` · Blush `#FFE0EC`.
> **Honesty rule (inherited, non-negotiable):** every scarcity statement in every ad must be literally true. Box counts, dates, and live counters come from the ops config — placeholders in this doc: `[DROP_002_COUNT]`, `[DROP_001_COUNT]`, `[DROP_002_DATE]`, `[LIVE_LIST_COUNT]`, `[LIVE_BOXES_REMAINING]`. If ops can't feed a real number, the line is cut, not faked.
> **AI production rule (inherited):** the sachet, the label, the hero swirl, testimonials, and the founder are NEVER AI-generated. Generation prompts below produce **backgrounds, sets, and stylized b-roll only**; the real sachet photography (`sachet-vanilla.png` / `sachet-strawberry.png`) and the real master swirl footage are composited/cut in. AI-actor (Arcads/HeyGen) variants deliver premises and facts only — never "I tried it."

---

# 1. LIBRARY ARCHITECTURE

## 1.1 Funnel stages

| Stage | Audience | Job | Destination | Creative energy |
|---|---|---|---|---|
| **TOF** — cold prospecting | Broad + interest stacks per segment (one segment per ad set, never blended) | Stop the scroll, earn the click, sell the *access* not the product | Segment ghost LP (`/lp/ritual` `/lp/glow` `/lp/calm` `/lp/focus` `/lp/pour`) | Sensory, cultural, native to each feed |
| **MOF** — engaged + retarget | 25%+ video viewers, IG/TT engagers (180d), LP visitors who didn't sign up (30d) | Answer the objection they left with; receipts, label, math | Same segment LP they touched (UTM-matched) | Proof, specificity, wry honesty |
| **BOF** — drop-conversion | Drop-access list (email match + site custom audiences), SMS list excluded from "join" messaging | Convert waitlist → drop 002 purchase in the open window | `/drop` (live store) once drop 002 opens; LP before | Factual urgency, countdowns to real dates only |

Stage transitions: TOF and MOF run now (waitlist mode). The BOF pack (§3) is built, trafficked, and **paused** until ops confirms `[DROP_002_DATE]` — then it flips on T-72h.

## 1.2 Naming convention

`SHR_[stage]_[segment]_[format]_[hook#]`

- **stage:** `TOF` / `MOF` / `BOF` / `RTG` (BOF retarget)
- **segment:** `RIT` (ritual) / `GLW` (glow) / `CLM` (calm) / `FCS` (focus) / `PUR` (pour) / `ALL` (list-wide BOF)
- **format:** `IMG` (static), `CAR` (carousel), `VID` (Meta video/reel), `SPK` (TikTok spark-style vertical)
- **hook#:** two digits, unique within segment+format

Example: `SHR_TOF_RIT_SPK_01`. Every ad below carries its code. UTMs: `utm_source={meta|tiktok}&utm_medium=paid&utm_campaign=lp-{slug}&utm_content={ad_code}`.

## 1.3 Testing matrix — the first 6 (launch flight, day 0)

One ad set per segment (ABO, not CBO — we need clean per-segment reads), plus a second ad set on ritual (largest audience, cheapest CPMs, our best-proven organic format). Budget shown as % of daily test budget `[DAILY_TEST_BUDGET]` (recommend $250–300/day minimum for signal in 7 days).

| # | Ad code | Segment | Platform | Why it launches first | Budget |
|---|---|---|---|---|---|
| 1 | `SHR_TOF_RIT_SPK_01` | ritual | TikTok | the swirl is our single most thumb-stopping asset; pure-sensory has the broadest cold reach | 15% |
| 2 | `SHR_TOF_RIT_VID_03` | ritual | Meta | cost-per-cup math — the strongest rational hook for the aesthetic audience | 10% |
| 3 | `SHR_TOF_GLW_VID_02` | glow | Meta | us-vs-them (scoop vs pour) — proven DTC format, biggest AOV segment | 17.5% |
| 4 | `SHR_TOF_CLM_VID_02` | calm | Meta | the 2pm split-screen — highest-emotion hook, biggest switching audience | 20% |
| 5 | `SHR_TOF_FCS_SPK_01` | focus | TikTok | the rice exposé — highest-shareability concept we own (per 30-day calendar data) | 20% |
| 6 | `SHR_TOF_PUR_SPK_01` | pour | TikTok→Meta same-day mirror | the stopwatch one-take — the ad IS the proof; strongest Meta-native segment | 17.5% |

## 1.4 Kill / scale rules

**Kill (whichever trips first):**
- CTR (link) < 0.5% at 1,000 impressions
- TikTok hook rate (3s views ÷ impressions) < 20% at 1,000 impressions — kill the hook, keep the body, re-cut with next hook variant
- Cost per drop-access signup > 2× blended target `[TARGET_CPL]` after $40 spend on the ad
- Any comment thread trending "scam / fake sold out" that the day-of reply playbook (see tiktok-30-day.md) doesn't turn within 24h — pause, escalate to founder reply video

**Scale:**
- Winners (CTR ≥ 1%, CPL ≤ target, SMS opt-in rate on its LP ≥ list average) get +20% budget/day — never more; big jumps reset learning
- Duplicate into a fresh ad set at 3× budget only after the 7-day gate, keeping the original running
- A winning TikTok hook gets re-shot with a real creator within 7 days (AI/lean version proves it; real product re-earns it — per ai-toolstack Friday rule)

**Decision gates:**
- **Day 3 — creative gate.** Read hook rate, CTR, CPC only (CPL too noisy). Kill clear losers, promote next hook variant from this library into the empty slot. No budget changes to survivors.
- **Day 7 — economics gate.** Read CPL, LP conversion rate, SMS opt-in rate per segment. Rank segments; rebalance to 40/30/30 across top-3 segments if spread is wide. Any segment with CPL > 3× target gets its LP reviewed before more spend (congruence problem, not creative problem).
- Weekly thereafter: Friday kill/scale review per the standing production pipeline (ai-toolstack §pipeline).

## 1.5 Cultural fluency guardrails (all ads, all segments)

- Nothing that dates in a month: no dead memes, no "girl dinner"-era slang, no millennial-pause open ("hey guys!"), no forced brainrot terms. If a phrase peaked before 2026, it's out.
- Lean on durable mid-2026 formats: voiceover essays, "explaining my order" POVs, soft-launch aesthetics, deinfluencing counter-positioning, group-chat-screenshot storytelling, one-take proof videos.
- Each segment gets culture cues matched to ITS feed (specified per segment below) — never one-size-fits-all.
- lowercase in all display copy; the wordmark is always "shroomé"; ads never read "supplement brand."
- SMS framing everywhere: "the text list gets the link 10 minutes early" + SHROOME30 **replaces** the 20% code. Best code wins. The word "stack" is banned.

---

# 2. THE ADS — 30 (6 per segment: 3 Meta + 3 TikTok)

Shared spec unless overridden: Meta = 4:5 feed + 9:16 reels/stories cuts; TikTok = 9:16, 15–30s, spark-ad via brand or whitelisted handle. Every video ends on the shared end-card (creative-direction §end-card): real sachet packshot on Navy, "pour / swirl / glow," drop-status line, Lime `get drop access` chip, FDA disclaimer baked into the template when the cut carries a claim. The swirl plays ≥1.5s, clockwise, never sped past 2×, always cut from the real master.

---

## SEGMENT 1 — the ritual girlies → /lp/ritual

Culture cues for this feed: matcha-tok, romanticize-your-life voiceover essays, soft-launch aesthetic (the drink shot like a new relationship), "explaining my order" POVs, saved-video energy ("this is going in my morning-inspo folder"). Palette world: Soft Lavender → Blush gradients, Cream, Pink flavor moments, Lime CTA only.

---

### SHR_TOF_RIT_IMG_01 — "minus the ceremony" (hero still)
- **Format:** Meta static, 4:5 + 1:1
- **Hook (first line of primary text):** the matcha girlies were right about everything except the whisk.
- **Primary text:** shroomé is ceremonial-grade matcha that pours. tear a 1oz sachet into your milk, watch the swirl do its thing, drink the video you keep saving. drop 001 sold out — drop 002 is a limited run of [DROP_002_COUNT] boxes. get drop access and the link comes to you first (text list gets it 10 minutes early).
- **Headline:** ceremonial matcha, minus the ceremony.
- **Description:** drop 001 sold out. get access to drop 002.
- **CTA / destination:** `Sign Up` → /lp/ritual (`utm_content=SHR_TOF_RIT_IMG_01`)
- **Visual spec — generate (Firefly Image 4 / MJ v7, background plate only):** "dreamy vertical gradient field, soft lavender #E8D5F0 melting into blush #FFE0EC, soft stylized cloud texture at 35% opacity, warm golden morning light from upper right, subtle film grain, gentle starburst glow center-right, empty stone countertop edge in warm cream #FDF4EE at bottom third, no objects, no text, editorial still-life lighting, 4:5" — then composite: REAL photograph of the mid-pour swirl glass (backlit, plume blooming) center-right, REAL vanilla sachet leaning at glass base, wordmark "shroomé" bottom-left Cream 85%. Headline set in Instrument Serif italic Navy across upper negative space: *ceremonial matcha, minus the ceremony.* Lime chip: `get drop access`.
- **Shoot it real (iPhone fallback):** golden hour, kitchen counter near a window. Tall clear glass, cold oat milk, pour the concentrate on 0.5× lens ~30cm away, burst mode through the bloom; sachet propped against glass; shoot 20 frames, pick the ribbon moment. Lock exposure on the glass highlight; warm white balance.
- **Compliance:** taste/aesthetic/convenience only — no structure/function claims. **Disclaimer: N.** Scarcity lines pull from ops config.

---

### SHR_MOF_RIT_CAR_02 — "pour / swirl / glow" (sequence carousel)
- **Format:** Meta carousel, 5 cards 1:1 — retargets 25% video viewers + LP bouncers
- **Hook (first line):** the five prettiest seconds of your morning, frame by frame.
- **Primary text:** you watched the swirl. here's the whole ritual: tear, pour, swirl, settle, sip — fifteen seconds, zero whisk, 2.5g of first-harvest ceremonial matcha. drop 001 sold out before it hit the site. drop access = the drop 002 link before the public, and the text list gets it 10 minutes earlier still.
- **Cards:** 1) fingers on the sachet notch, caption chip *tear* · 2) concentrate column entering milk, *pour* · 3) full ribbon bloom, *swirl* · 4) resolved sage latte, *glow* · 5) drop ledger card — Navy, Syne 700: "drop 001 — sold out ~~[DROP_001_COUNT] boxes~~ / drop 002 — limited run of [DROP_002_COUNT]" + Lime `get drop access` chip.
- **Headline (per card):** pour / swirl / glow / drop 002 is limited
- **Description:** no whisk. no powder. no line.
- **CTA / destination:** `Sign Up` → /lp/ritual (`utm_content=SHR_MOF_RIT_CAR_02`)
- **Visual spec — generate:** none — cards 1–4 are frame-grabs from the REAL master swirl footage (creative-direction: one master, five worlds), graded warm, Blush vignette. Card 5 built from the end-card template.
- **Shoot it real:** if master grabs unavailable: tripod overhead + side angle, 4K60, one pour, pull 4 stills at 0s/2s/5s/12s.
- **Compliance:** claim-free. **Disclaimer: N.**

---

### SHR_TOF_RIT_VID_03 — "the $8 audit" (cost-per-cup math, reel)
- **Format:** Meta reels + 4:5 feed video, 22s
- **Hook (0–1.5s, VO + text):** i did the math on my matcha order and now i can't unsee it.
- **Primary text:** $8 a cup, 4 cups a week, is a $1,600-a-year situation. shroomé is café-grade ceremonial matcha — 2.5g per sachet, more than most cafés whisk into the order — for about $3 a pour, made prettier than the café makes it. drop 001 sold out; get access before drop 002 goes.
- **Script / shot timing:** (0–1.5s) receipt macro, thumb tapping the $8 line, VO hook. (1.5–6s) gentle voiceover-essay math over café b-roll: "eight dollars. four times a week. i love her but she's a subscription." (6–13s) cut home: the real ritual — tear, pour, THE SWIRL (real master cut, ≥2s), golden light. VO: "2.5 grams of ceremonial matcha. about three dollars. and the swirl comes home with you." (13–18s) side-by-side text card: "café: $8 + the line / shroomé: ~$3 + your kitchen light." (18–22s) end-card, drop status line, Lime chip.
- **Headline:** your café order, at home, ~$3.
- **Description:** drop 002 is a limited run. get access.
- **CTA / destination:** `Sign Up` → /lp/ritual (`utm_content=SHR_TOF_RIT_VID_03`)
- **Visual spec — generate (Runway Gen-4, b-roll only):** "warm café interior, morning light through large windows, soft focus queue of anonymous customers, creamy highlights, cinematic 24fps, gentle push-in, no readable branding, no faces in focus" — stylized filler only; every product/pour frame is real footage. Text cards in Syne 700 Navy on Cream.
- **Shoot it real:** iPhone: (1) your actual café receipt on a table, overhead; (2) kitchen pour sequence per RIT_IMG_01 setup, video 4K30; (3) caption cards in CapCut brand template.
- **Compliance:** price/taste/convenience claims only; per-cup figure must match real drop-002 pricing from ops (`[PRICE_PER_SACHET]` ≈ $3 — verify before traffic). **Disclaimer: N.**

---

### SHR_TOF_RIT_SPK_01 — "listen" (ASMR sensory dare) ⭐ launch-six
- **Format:** TikTok spark, 9:16, 21s
- **Hook (0–1.5s):** dead silence, extreme macro of fingers on the sachet notch, one word of text: **"listen."**
- **Script / shot timing:** (0–1.5s) macro grip, silence, hook text. (1.5–3s) THE TEAR — amplified, nothing else. (3–8s) overhead: dark green concentrate streams into iced oat milk, unbroken. (8–14s) through-the-glass: the swirl, real master footage, ribbons curling, no cuts. (14–18s) one slow clockwise hand-swirl; streaks resolve to sage. (18–21s) hard cut to end-card: sachet packshot, "drop 001 — sold out. drop 002 — limited run." Lime `get drop access` chip. Pour sound resolves under the card.
- **On-screen text beats:** (0s) "listen." · (10s) "pour / swirl / glow" · (16s) "drop 001: sold out." · (19s) "shroomé — get drop access"
- **Caption:** we can't sell you one right now. we can still ruin your feed with the sound. drop access = the drop 002 link first. #asmr #matchaasmr #matcha #pourswirlglow
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content=SHR_TOF_RIT_SPK_01`)
- **Visual spec:** 100% REAL footage (ai-toolstack hard rule: the taste-credibility pour is never generated). Sound design: tear, pour, bloom, glass-on-counter; barely-there pad from 8s. Warm grade, Blush lift in highlights.
- **Shoot it real:** iPhone 4K60 + a $20 clip mic taped near the glass; dim room, one warm window; macro mode for the tear; overhead phone mount for the pour; do 5 takes, use the crispest tear.
- **Compliance:** claim-free by design. **Disclaimer: N.**

---

### SHR_TOF_RIT_SPK_02 — "explaining my order" (POV, culturally current)
- **Format:** TikTok spark, 9:16, 24s — creator or founder-adjacent talent (real person, real product)
- **Hook (0–1.5s):** to camera, holding the sachet like a boarding pass: **"explaining my matcha order to the barista i no longer have."**
- **Script / shot timing:** (0–1.5s) hook, deadpan warmth. (1.5–7s) mock order voice: "hi, yes — iced ceremonial oat matcha, first harvest, shade-grown, extra pretty, no whisk anywhere near it, and can you make it in my kitchen in fifteen seconds. thank you." (7–14s) the ritual answers: tear → pour → swirl (real master insert), golden light. (14–19s) sip, small nod: "she understood the assignment. she IS the assignment." (19–24s) end-card + drop line.
- **On-screen text beats:** (0s) hook · (4s) "the order:" list appears line by line · (12s) "pour / swirl / glow" · (20s) "drop 002 — limited run · get drop access"
- **Caption:** the barista is me and the tip is joining the access list. drop 001 sold out — 002 is a limited run. #matchatok #matcha #icedmatcha #morningritual
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content=SHR_TOF_RIT_SPK_02`)
- **Visual spec — generate:** none for hero moments. Optional Firefly backplate for an insert card: "soft blush #FFE0EC gradient card with cream #FDF4EE border, warm light, subtle grain, no text" for the order-list overlay. Talent wardrobe: neutral warm tones; kitchen set per creative-direction ritual world (fluted glass, linen, claw clip in frame).
- **Shoot it real:** iPhone front camera for hook (slightly too close = native), rear camera for ritual; window light only; order list as CapCut text preset in Syne.
- **Compliance:** taste/ritual only. Ordering-language stays flavor/aesthetic — no function words. **Disclaimer: N.** Real talent may not claim health outcomes; this script contains none.

---

### SHR_MOF_RIT_SPK_03 — "10 minutes early is my personality" (SMS flex / waitlist FOMO)
- **Format:** TikTok spark, 9:16, 20s — retargets engagers of RIT_SPK_01/02
- **Hook (0–1.5s):** phone screen fills frame, a text notification sliding in, VO whisper: **"getting the drop link 10 minutes before everyone else is my new personality."**
- **Script / shot timing:** (0–1.5s) lock screen, notification: "shroomé: early access is live." (1.5–6s) VO essay, soft: "drop 001 sold out while most people were still deciding. the text list didn't have to decide fast — it just got there first." (6–12s) slow ritual b-roll: sachet laid out the night before next to the glass, like an outfit (soft-launch aesthetic). (12–16s) the swirl, real master, one breath. (16–20s) end-card: "drop 002 — limited run of [DROP_002_COUNT] boxes. the text list gets the link 10 minutes early, and SHROOME30 replaces your 20% code — best code wins."
- **On-screen text beats:** (0s) hook · (7s) "staged tonight. poured tomorrow." · (13s) "text list = 10 minutes early" · (18s) "get drop access — shroomé"
- **Caption:** the earliest possible version of on time. drop access is free; the text list just gets the door first. #matchatok #matcha #softlaunch #morningritual
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content=SHR_MOF_RIT_SPK_03`)
- **Visual spec — generate (Runway, insert only):** "dreamy time-lapse of dawn light moving across a cream #FDF4EE wall, soft lavender #E8D5F0 shadows, warm, grain, no objects" as a 2s transition plate. Notification mock uses our real SMS copy (engagement-capture-flows §sms) — never a fabricated customer message.
- **Shoot it real:** screen-record a staged notification on a real phone (airplane mode), film phone-in-hand in warm lamp light; nightstand flat-lay of sachet + glass.
- **Compliance:** offer mechanics only. SHROOME30 phrasing per email-flow rule: "replaces your 20% code — best code wins." **Never "stack." Disclaimer: N.**

---

## SEGMENT 2 — the glow getters → /lp/glow

Culture cues: skincare-tok routine logic, GRWM with a thesis, "morning shed" jokes retired — use routine-stacking logic and deinfluencing counter-positioning instead; vanity flat-lays, shelfie pans, match-cut serum-to-pour. Palette world: Blush leads, Pink strawberry accents, Soft Lavender science moments; Lime CTA buffered by Cream (never adjacent to Pink).

**Segment compliance note:** most ads here carry "supports skin health" / "provides antioxidant support" → FDA disclaimer in caption AND end-card. Never before/after skin, never timelines, never "anti-aging."

---

### SHR_TOF_GLW_IMG_01 — "step you drink" (vanity still)
- **Format:** Meta static, 4:5
- **Hook (first line):** my skincare routine has 9 steps. this one you drink.
- **Primary text:** shroomé folds 2g of grass-fed, hydrolyzed collagen peptides (types I & III) into a ceremonial matcha latte you'd order anyway. collagen supports skin health; matcha provides antioxidant support — and the whole step takes fifteen seconds, no scoop, no shaker. drop 001 sold out. get access to drop 002 before it goes. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Headline:** the beauty step you drink.
- **Description:** 2g grass-fed collagen. every pour. drop 002 is limited.
- **CTA / destination:** `Sign Up` → /lp/glow (`utm_content=SHR_TOF_GLW_IMG_01`)
- **Visual spec — generate (Firefly, set plate only):** "warm marble vanity surface in soft blush #FFE0EC morning light, one architectural frosted-glass skincare bottle out of focus at frame left with no label, mirror edge catching warm light upper right, creamy highlights, dewy soft-focus atmosphere, subtle grain, empty space center-right, 4:5, beauty editorial lighting, never clinical white" — composite the REAL strawberry sachet leaning against a REAL glass of blush-topped iced matcha center-right. Type: Instrument Serif italic Navy headline, Syne small-caps ingredient line "2g grass-fed collagen · 2.5g ceremonial matcha," Lime chip on Cream buffer.
- **Shoot it real:** bathroom counter, morning window; borrow one unbranded skincare bottle for depth; iced strawberry pour in a short glass; shoot 0.5× at counter height, focus on sachet label.
- **Compliance:** claims: "supports skin health," "provides antioxidant support." **Disclaimer: Y (caption + on-image small text).**

---

### SHR_TOF_GLW_VID_02 — "the scoop" (us-vs-them) ⭐ launch-six
- **Format:** Meta reels + 4:5, 24s
- **Hook (0–1.5s, VO + text):** collagen powder girlies… we need to talk about the scoop.
- **Primary text:** the scoop is why you quit. the shaker, the clumps, the tub gathering dust by february. shroomé dissolves 2g of hydrolyzed grass-fed collagen into a ceremonial matcha latte — the step does itself because you already wanted the drink. supports skin health. tastes like vanilla, not virtue. drop 001 sold out; drop 002 is a limited run. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Script / shot timing:** (0–1.5s) macro: a generic unbranded scoop stuck mid-tub, hook text + VO. (1.5–6s) quick honest montage of the chore: shaker rattle, clump on a spoon, tub pushed to the back of a shelf (all unbranded, no competitor names). (6–9s) hard cut on the tear sound: the sachet. (9–16s) pour + swirl (real master), match-cut from a serum drop to the concentrate stream — the visual thesis: skincare you drink. (16–20s) sip at the vanity, dewy skin in soft focus (real person, real drink). (20–24s) end-card with disclaimer line baked in.
- **Headline:** collagen without the scoop.
- **Description:** 2g in every pour. drop 002 is limited — get access.
- **CTA / destination:** `Sign Up` → /lp/glow (`utm_content=SHR_TOF_GLW_VID_02`)
- **Visual spec — generate (Runway, stylized insert only):** "macro slow motion of a single golden serum drop falling through warm blush-tinted light #FFE0EC, creamy bokeh, 120fps feel, luxurious, no product, no text" for the match-cut half; the concentrate half is REAL master footage. Chore montage shot real with unbranded props.
- **Shoot it real:** buy one generic collagen tub, peel label; kitchen + vanity locations; serum-drop shot with any dropper bottle against a blush card; match the cut on motion in CapCut.
- **Compliance:** claims: "supports skin health." No competitor names, no before/after, no timeline. **Disclaimer: Y.**

---

### SHR_MOF_GLW_CAR_03 — "read the label" (ingredient receipt carousel)
- **Format:** Meta carousel, 4 cards 1:1 — retargets GLW video viewers + LP bouncers
- **Hook (first line):** beauty from a sachet sounds fake until you read the label.
- **Primary text:** so here's the label. 2g grass-fed hydrolyzed collagen peptides (types I & III). 2.5g first-harvest ceremonial matcha — antioxidant support included. 200mg lion's mane fruiting-body extract, ≥70% beta-glucans, third-party tested. 0g added sugar. no proprietary blends, nothing hidden. drop 001 sold out — get drop access before 002 goes. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Cards:** 1) REAL label macro, "2g grass-fed collagen — types I & III" · 2) "2.5g ceremonial matcha — antioxidant support" over swirl still · 3) "0g added sugar. 0 proprietary blends." on Soft Lavender card · 4) drop ledger + Lime chip.
- **Headline (rotating):** doses on the label / not one more scoop / drop 002 is limited
- **Description:** every dose printed on the sachet.
- **CTA / destination:** `Sign Up` → /lp/glow (`utm_content=SHR_MOF_GLW_CAR_03`)
- **Visual spec:** card 1 is REAL macro photography of the actual sachet back panel (never generated, never retouched on-label — ai-toolstack rule 2); cards 2–3 use Firefly plates: "soft lavender #E8D5F0 gradient card, warm light sweep, fine grain, empty, 1:1" with Syne 700 Navy figures set large; card 4 from end-card template.
- **Shoot it real:** label macro: iPhone macro mode, sachet flat on cream linen, window light at 45°, no flash.
- **Compliance:** claims: "provides antioxidant support" (+ factual dose statements). **Disclaimer: Y.**

---

### SHR_TOF_GLW_SPK_01 — "step 9: drink it" (GRWM routine)
- **Format:** TikTok spark, 9:16, 28s — real creator (archetype 1, §4)
- **Hook (0–1.5s):** tapping the sachet against the bathroom mirror: **"my routine has one step you've never seen — because it lives in the kitchen."**
- **Script / shot timing:** (0–1.5s) mirror hook. (1.5–8s) routine speedrun, one beat per action: cleanser, serum, SPF — tactile close-ups, no brand labels. (8–10s) walk-follow from mirror to kitchen (the signature follow shot, robe + claw clip). (10–17s) tear → pour → swirl in blush light; VO: "2 grams of grass-fed collagen peptides, dissolved into a matcha latte. collagen supports skin health — and this version i actually remember to take." (17–23s) sip at the counter, "step 9: drink it" text lands. (23–28s) end-card with disclaimer.
- **On-screen text beats:** (0s) hook · (3s) step counter "1… 2… 3…" ticking up · (12s) "2g grass-fed collagen — every sachet" · (15s) "supports skin health*" · (24s) "*see caption · drop 002 — limited · get drop access"
- **Caption:** the routine finally has a step i crave. collagen peptides support skin health — 2g in every sachet, printed on the label. drop 001 sold out; access list hears about 002 first. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #grwm #skintok #collagenlatte #matcha
- **CTA / destination:** `Sign up` → /lp/glow (`utm_content=SHR_TOF_GLW_SPK_01`)
- **Visual spec:** all real footage (consumption + person on camera = real, always). Grade: blush lift, creamy highlights, zero clinical white. Match creative-direction glow world (marble, mirror edge, one architectural bottle).
- **Shoot it real:** iPhone on small tripod for mirror + counter; follow shot handheld at chest height; morning light only.
- **Compliance:** claims: "supports skin health." Creator must be real, #ad disclosed, briefed per §4 — **no visible-results promises, no timelines.** **Disclaimer: Y (caption + end-card).**

---

### SHR_TOF_GLW_SPK_02 — "i'm not telling you to buy it" (deinfluencing counter-position)
- **Format:** TikTok spark, 9:16, 22s
- **Hook (0–1.5s):** to camera, hands up, sachet nowhere in sight: **"i'm not going to tell you to buy this. you literally can't."**
- **Script / shot timing:** (0–1.5s) hook, deadpan. (1.5–7s) "deinfluencing hat on: most ingestible beauty is a tub you abandon and a blend that won't tell you what's inside. delete, delete." (7–13s) turn: "influencing hat back on: this one prints every dose on the sachet — 2 grams of grass-fed collagen, 2.5 grams of ceremonial matcha — and it sold out before i could even be annoying about it." reveal the sachet. (13–18s) the swirl, real master, blush grade. (18–22s) end-card: "drop 002 — limited run of [DROP_002_COUNT] boxes. access list first."
- **On-screen text beats:** (0s) hook · (4s) "deinfluencing:" strikethroughs over "mystery blends" / "the scoop era" · (10s) "every dose on the label" · (19s) "sold out is the review — get drop access"
- **Caption:** deinfluencing you into a waitlist, which is a new one even for me. doses on the label, receipts on the page. drop 002 is a real limited run. #deinfluencing #skintok #matcha #cleanlabel
- **CTA / destination:** `Sign up` → /lp/glow (`utm_content=SHR_TOF_GLW_SPK_02`)
- **Visual spec:** real talent, real sachet. Backdrop: warm cream wall, one blush card in frame for palette. Text strikethroughs in Syne, Pink #FFB7D1 stamp energy per glow accent plan.
- **Shoot it real:** front-camera monologue in window light, cutaway inserts on rear camera; CapCut brand template for strikethrough beats.
- **Compliance:** dose statements are factual; keep the deinfluencing half generic (no competitor names, no category-wide disease implications). This cut carries **no** structure/function claim → **Disclaimer: N** (keep it that way in edits; if "supports skin health" gets added, flip to Y).

---

### SHR_MOF_GLW_SPK_03 — "the shelf pan" (ASMR shelfie + drop ledger)
- **Format:** TikTok spark, 9:16, 18s — retargets glow engagers
- **Hook (0–1.5s):** slow locked-off pan across a vanity shelf, text: **"everything on this shelf restocks. one thing on it drops."**
- **Script / shot timing:** (0–1.5s) shelf pan begins, hook text. (1.5–7s) the pan continues past skincare (labels away), lands on the strawberry sachet leaning against a small glass — a hand places it there mid-pan (shelfie-in-motion per creative-direction). (7–13s) match-cut to the pour + swirl, blush-graded, ≥2s real master. (13–18s) end-card: drop ledger — "drop 001 — sold out ~~[DROP_001_COUNT] boxes~~ / drop 002 — limited run of [DROP_002_COUNT]" + "the text list gets the link 10 minutes early."
- **On-screen text beats:** (0s) hook · (8s) "the step you drink" · (14s) "drop 002 — get access first"
- **Caption:** it restocks like a sneaker and sells out like one too. drop access is free — the text list just walks in 10 minutes early. #shelfie #skintok #matcha #dropculture
- **CTA / destination:** `Sign up` → /lp/glow (`utm_content=SHR_MOF_GLW_SPK_03`)
- **Visual spec:** real shelf, real sachet, real pour. Light sweep across frame (move a warm lamp on a slider or slow handheld). Ledger card from end-card template, Lavender "sold out" stamp per glow LP accent plan (not Pink on Pink).
- **Shoot it real:** stack books under the phone for the locked shot; slide a warm desk lamp for the light sweep; one take, 3 attempts.
- **Compliance:** claim-free (drop mechanics + aesthetics). **Disclaimer: N.**

---

## SEGMENT 3 — the coffee breakup → /lp/calm

Culture cues: corporate-girlie 2pm content, voiceover essays over near-still footage, "unsettlingly calm" quiet humor, honest switch narratives (creator-only), group-chat screenshot storytelling. Palette world: Lavender fields, generous Cream air, clouds = soft landing, Navy grounding, no Pink. Motion: near-stillness as a flex.

**Segment compliance note (read twice):** highest-risk segment. NEVER "anxiety," "anxious," "withdrawal," "addiction," "cures," "treats," or sleep-outcome promises — in copy, VO, alt text, captions, or comments. Describe the *feeling* ("calm, steady energy," "no 2pm cliff"), never a condition. "No crash" is framed as caffeine-curve/experience language tied to caffeine + L-theanine. Claims used → FDA disclaimer.

---

### SHR_TOF_CLM_IMG_01 — "the napkin curve" (education still)
- **Format:** Meta static, 4:5
- **Hook (first line):** coffee spikes. matcha carries. someone finally drew it.
- **Primary text:** shroomé is a ready-to-pour ceremonial matcha latte with ~60mg of caffeine and matcha's naturally occurring l-theanine — energy that arrives smooth, stays steady, and leaves quietly. supports sustained focus and healthy energy levels, minus the 2pm cliff. drop 001 sold out; drop 002 is a limited run. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Headline:** break up with the crash. keep the energy.
- **Description:** ~60mg caffeine + l-theanine. drop 002 is limited.
- **CTA / destination:** `Sign Up` → /lp/calm (`utm_content=SHR_TOF_CLM_IMG_01`)
- **Visual spec — generate (Firefly, plate only):** "warm café napkin and cream ceramic saucer on a pale cream #FDF4EE table, soft lavender #D4B8E0 window shadow falling across, morning light, shallow depth, fine grain, empty napkin surface, 4:5" — overlay the curve as clean Navy line art drawn on the napkin: coffee line spiking then cliff-dropping (labeled *the 2pm cliff*), shroomé line rising gently into a long Lavender-filled plateau (labeled *the carry*). Composite REAL vanilla sachet + finished latte glass at frame edge. Small caption: "illustrative of typical caffeine + l-theanine absorption character, not a measured clinical result."
- **Shoot it real:** actual napkin + fine-liner pen, draw the two curves by hand (imperfect = credible), overhead iPhone shot beside the real latte.
- **Compliance:** claims: "supports sustained focus," "supports healthy energy levels." Curve carries the "illustrative" caption (mandatory, mirrors LP). **Disclaimer: Y.** Banned-word audit before traffic.

---

### SHR_TOF_CLM_VID_02 — "2pm, both timelines" (split screen) ⭐ launch-six
- **Format:** Meta reels + 4:5, 26s
- **Hook (0–1.5s):** split screen, both sides showing the same desk at 2:00pm, text: **"2pm on coffee vs 2pm on matcha. same person. same deadline."**
- **Primary text:** left: the spike already left the building. right: ~60mg of caffeine that arrived with matcha's naturally occurring l-theanine — a smooth curve that supports sustained focus into the afternoon instead of billing you for the morning. shroomé is a ceremonial matcha latte you pour in fifteen seconds. drop 001 sold out — get access to drop 002. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Script / shot timing:** (0–1.5s) split opens, hook text. (1.5–8s) LEFT: handheld-jittery camera, third coffee cup, restless desk chaos — the camera performs the crash (no acted "symptoms," just filmic restlessness). RIGHT: locked-off, sunlit, steady typing, one glass of matcha catching light. (8–14s) right side takes over full frame; the pour + swirl (real master) as VO: "sixty milligrams, plus the l-theanine matcha grew itself. calm, steady energy — that's the whole trick." (14–20s) thin Navy curve animates across the bottom: spike-and-cliff vs the lavender plateau. (20–26s) end-card with disclaimer.
- **Headline:** the 2pm cliff is optional.
- **Description:** calm, steady energy. drop 002 is limited — get access.
- **CTA / destination:** `Sign Up` → /lp/calm (`utm_content=SHR_TOF_CLM_VID_02`)
- **Visual spec — generate (Runway, right-side ambience only):** "sun-drenched calm home office, dust motes in warm light, lavender-tinted #E8D5F0 wall shadows, locked-off wide, nothing moves but a curtain, cinematic, no people close-up" as establishing plate; typing hands, drink, pour = REAL footage. Curve animation: Navy line on Cream, Lavender fill, easing per creative-direction (fast in, long soft out).
- **Shoot it real:** same desk, two lighting setups; handheld for left (walk in place while filming), tripod for right; clock insert at 2:00 both times.
- **Compliance:** claims: "supports sustained focus" (+ caffeine-curve experience framing). The left side shows restlessness, not a health condition — no words like "anxious" anywhere including alt text. **Disclaimer: Y.**

---

### SHR_MOF_CLM_VID_03 — "i didn't quit caffeine" (text-on-pour, quiet)
- **Format:** Meta reels + stories, 18s — retargets calm video viewers + LP bouncers
- **Hook (0–1.5s):** near-still frame, steam rising off a shroomé mug, text fades in: **"i didn't quit caffeine. i quit the crash."**
- **Primary text:** ~60mg of caffeine from ceremonial matcha, arriving with naturally occurring l-theanine. supports healthy energy levels — smooth in, steady through, quiet out. the drink you switch TO, not the thing you give up. drop 001 sold out. drop 002 is a limited run of [DROP_002_COUNT] boxes. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Script / shot timing:** (0–6s) cinemagraph energy: only the steam moves. Text line 1. (6–12s) single slow cut to the swirl in warm milk (real master, warm-milk version), text: "~60mg caffeine + l-theanine, already together in the leaf." (12–18s) hands wrap the mug, window light; end-card fades over, disclaimer line baked in.
- **Headline:** the switch that doesn't feel like one.
- **Description:** calm, steady energy. get drop access.
- **CTA / destination:** `Sign Up` → /lp/calm (`utm_content=SHR_MOF_CLM_VID_03`)
- **Visual spec — generate (Firefly still → Runway loop, background only):** "soft lavender #D4B8E0 clouds outside a bright window, warm interior sill, morning haze, almost imperceptible cloud drift, dreamy, stylized, no product" as the window plate; mug (reading "shroomé"), steam, hands, swirl = REAL. Long holds, no music — room tone + one warm piano note.
- **Shoot it real:** warm mug by a real window, backlight the steam (dark background behind steam, light from the side), iPhone 4K30 locked; 10-second holds.
- **Compliance:** claims: "supports healthy energy levels." First-person line is brand voice about product design, not a testimonial of results — keep it exactly as written. **Disclaimer: Y.**

---

### SHR_TOF_CLM_SPK_01 — "3pm and you feel… fine?" (unsettlingly calm POV)
- **Format:** TikTok spark, 9:16, 20s
- **Hook (0–1.5s):** locked-off office shot, subject typing steadily, clock reads 3:04, text: **"pov: it's 3pm and you feel… fine? suspiciously fine?"**
- **Script / shot timing:** (0–1.5s) hook over the too-calm desk. (1.5–7s) VO, deadpan: "no third coffee. no bargaining with the vending machine. just… a person, doing tasks, at 3pm. unsettling." (7–13s) flashback grade shift to morning: the ritual — tear, pour, swirl (real master). VO: "sixty milligrams of caffeine plus the l-theanine matcha comes with. supports sustained focus. that's it. that's the plot twist." (13–17s) back to 3pm desk, one slow sip, tiny smug nod. (17–20s) end-card + disclaimer.
- **On-screen text beats:** (0s) hook · (5s) "3:04pm. still upright." · (10s) "caffeine + l-theanine — calm, steady energy" · (14s) "supports sustained focus*" · (18s) "*see caption · get drop access"
- **Caption:** the afternoon plot twist is that there isn't one. ~60mg caffeine + l-theanine from ceremonial matcha supports sustained focus and healthy energy levels. drop 001 sold out — access list hears first. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #matcha #focustok #corporatetok #matchalatte
- **CTA / destination:** `Sign up` → /lp/calm (`utm_content=SHR_TOF_CLM_SPK_01`)
- **Visual spec:** real desk, real person, real pour. Grade: 3pm scenes warm and steady; morning flashback slightly lifted lavender. No red-eyed "before" acting — restraint is the joke.
- **Shoot it real:** office corner or tidy home desk, iPhone on tripod at eye level; clock prop; two wardrobe-identical setups.
- **Compliance:** claims: "supports sustained focus," "supports healthy energy levels." Humor never names a condition. **Disclaimer: Y.**

---

### SHR_TOF_CLM_SPK_02 — "a short essay about the 2pm cliff" (voiceover essay)
- **Format:** TikTok spark, 9:16, 30s
- **Hook (0–1.5s):** black frame, one line of white serif text as the VO begins: **"a short essay about the 2pm cliff, read over the calmest video i own."**
- **Script / shot timing:** (0–1.5s) hook card. (1.5–10s) VO essay over near-still windowsill footage (steam, curtain, houseplant shadow): "the cliff is not a personality flaw. it's a curve. coffee's caffeine goes up like a firework and comes down like one too." (10–18s) the napkin curve appears, hand-drawn line animating; VO: "matcha's caffeine — about sixty milligrams a sachet — arrives with l-theanine and takes the long way down. a plateau instead of a cliff. supports sustained focus through the part of the day meetings are made of." (18–25s) the swirl, real master, warm milk; VO: "shroomé is that curve, poured in fifteen seconds." (25–30s) end-card + disclaimer; VO: "essay over. the access list is open."
- **On-screen text beats:** (0s) hook · (11s) "the spike vs the carry" under the curve · (20s) "pour / swirl / glow" · (26s) "drop 002 — limited · get drop access"
- **Caption:** an essay, a napkin, and a curve. ~60mg caffeine + naturally occurring l-theanine — supports sustained focus and healthy energy levels. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #voiceoveressay #matcha #ltheanine #slowmorning
- **CTA / destination:** `Sign up` → /lp/calm (`utm_content=SHR_TOF_CLM_SPK_02`)
- **Visual spec — generate (Runway, ambience only):** "extreme slow drift across a warm windowsill at golden hour, lavender #E8D5F0 sky beyond, curtain barely breathing, houseplant shadow play on cream wall #FDF4EE, cinemagraph pace, stylized warmth" — steam, drink, swirl = REAL. VO: ElevenLabs "calm" segment voice or real VO artist; hushed, unhurried; disclose synthetic VO where platform rules require.
- **Shoot it real:** one windowsill, three 10s locked shots (steam / curtain / shadow); read the essay into voice memos twice, pick the softer take.
- **Compliance:** claims: "supports sustained focus," "supports healthy energy levels" + illustrative-curve caption on the graphic. **Disclaimer: Y.** Essay never mentions any condition.

---

### SHR_MOF_CLM_SPK_03 — "my group chat did not let me forget" (drop FOMO, screenshot storytelling)
- **Format:** TikTok spark, 9:16, 22s — retargets calm engagers
- **Hook (0–1.5s):** phone screen, a group chat scrolling (mocked, clearly ours), text: **"i missed drop 001. my group chat did not let me forget it."**
- **Script / shot timing:** (0–1.5s) hook over chat scroll — bubbles read: "it's live" / "got mine" / "…zak?" (our own team names only; never fabricated customers). (1.5–8s) VO, wry: "drop 001 was [DROP_001_COUNT] boxes. it sold out to the access list before the site ever said buy. i was making toast." (8–14s) the ritual filmed like a memory: soft, warm, the swirl (real master). VO: "drop 002 is [DROP_002_COUNT] boxes. this time i'm on the list, and my phone gets the link ten minutes before the internet does." (14–18s) lock screen with our real SMS copy sliding in. (18–22s) end-card: "get drop access. the text list goes first."
- **On-screen text beats:** (0s) hook · (5s) "drop 001: sold out ~~[DROP_001_COUNT] boxes~~" · (12s) "drop 002: [DROP_002_COUNT] — that's the run" · (19s) "text list = 10 min early · shroomé"
- **Caption:** dramatization of a preventable tragedy. drop access is free; the text list gets the door 10 minutes early and SHROOME30 replaces the 20% code — best code wins. #dropculture #matcha #groupchat #waitlist
- **CTA / destination:** `Sign up` → /lp/calm (`utm_content=SHR_MOF_CLM_SPK_03`)
- **Visual spec:** chat mock built in-house with team-member names (honesty rule: it's a dramatization and the caption says so; no invented customer praise). Warm lamp-lit phone-in-hand shots; lavender grade.
- **Shoot it real:** screen-record a real (staged, internal) group thread; film phone over shoulder in evening lamp light.
- **Compliance:** drop mechanics only, all numbers from ops config. No claims → **Disclaimer: N.** "dramatization" stays in caption.

---

## SEGMENT 4 — the deep workers → /lp/focus

Culture cues: spec-sheet/changelog aesthetics, "read the label like a term sheet," keyboard-groupbuy and limited-run hardware culture, Huberman-adjacent skepticism (met with receipts, not vibes), desk-setup content. Palette world: Navy leads (only dark-mode segment), Cream type, Lime data-highlighter strokes under numerals, Lavender functional band. No RGB, no brains, no gamer chaos.

**Segment compliance note:** only "supports sustained focus" and "supports immune function" (beta-glucans). Never memory/brain-boost/NGF/cognitive-decline/drug comparisons. Compliant language IS the flex.

---

### SHR_TOF_FCS_IMG_01 — "the label is the ad" (spec-sheet still)
- **Format:** Meta static, 4:5 + 1:1
- **Hook (first line):** we'd rather show you the label than the ad. so here's both.
- **Primary text:** 200mg organic lion's mane — real fruiting body, hot-water extracted, standardized to ≥70% beta-glucans, third-party tested. 2.5g ceremonial matcha, ~60mg caffeine arriving with naturally occurring l-theanine: supports sustained focus. no proprietary blends. every dose printed on the sachet. drop 001 sold out ([DROP_001_COUNT] boxes, published). drop 002 is [DROP_002_COUNT]. that's the run. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Headline:** read the label. that's the pitch.
- **Description:** ≥70% beta-glucans, third-party tested. get drop access.
- **CTA / destination:** `Sign Up` → /lp/focus (`utm_content=SHR_TOF_FCS_IMG_01`)
- **Visual spec — generate (Firefly, backdrop only):** "deep navy #1B1F3B studio field, subtle film grain, faint warm starburst rim-light from upper left, soft vignette, completely empty, premium watch-advertisement lighting, 4:5" — composite the REAL vanilla sachet angled with back label toward camera (label line legible), rim-lit. Beside it, Syne 700 Cream figures at poster scale: `200mg` / `≥70%` / `2.5g`, each with a Lime #C8FF3A underline stroke. One Instrument Serif italic line beneath: *we'd rather show you the label than the ad.*
- **Shoot it real:** black poster board sweep, one warm lamp raking from behind-left, sachet on a small riser; iPhone portrait mode off (keep label sharp), expose for the label.
- **Compliance:** claims: "supports sustained focus" + factual spec statements. Comparative "typical market range 15–30%" allowed if used (approved comparative), no competitor names. **Disclaimer: Y.**

---

### SHR_TOF_FCS_VID_02 — "3 numbers" (checklist explainer)
- **Format:** Meta reels + 4:5, 28s
- **Hook (0–1.5s, to camera):** **"the 3 numbers to check before you buy any mushroom product. most brands print zero of them."**
- **Primary text:** number one: beta-glucan percentage — ours is ≥70%, third-party tested; typical mushroom supplements land between 15 and 30. number two: fruiting body or mycelium — ours is fruiting body, hot-water extracted, no grain filler. number three: the actual dose — 200mg, printed on the sachet next to everything else. beta-glucans support immune function; matcha's caffeine + l-theanine support sustained focus. drop 002 is a published run of [DROP_002_COUNT] boxes. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Script / shot timing:** (0–1.5s) hook, desk setting, Navy backdrop. (1.5–8s) "number one" — label macro insert, Lime underline animates beneath "≥70% beta-glucans." (8–15s) "number two" — two clear jars prop demo: one mostly rice grains, one small dark extract; finger taps the extract jar. (15–21s) "number three" — full label pan; VO: "if a brand won't print the number, that is the number." (21–25s) the pour + swirl as proof-of-life (real master), desk POV. (25–28s) end-card + disclaimer.
- **Headline:** check the numbers. we print ours.
- **Description:** 200mg · ≥70% beta-glucans · third-party tested.
- **CTA / destination:** `Sign Up` → /lp/focus (`utm_content=SHR_TOF_FCS_VID_02`)
- **Visual spec:** label shots = REAL macro of the real sachet (never generated). Jar demo shot real. Backdrop plate optional Firefly: "matte navy #1B1F3B tabletop, warm golden hour rake light, fine grain, empty, overhead." Numerals in Syne 700 tabular, Lime strokes.
- **Shoot it real:** two mason jars, dry rice + a shot of cold brew standing in for extract (never presented as our product — it's a category demo); label macro per GLW_CAR_03 method.
- **Compliance:** claims: "supports immune function," "supports sustained focus," approved comparative on beta-glucan range. No competitor names on screen. **Disclaimer: Y.**

---

### SHR_MOF_FCS_CAR_03 — "changelog" (receipts carousel)
- **Format:** Meta carousel, 5 cards 1:1 — retargets focus engagers + LP bouncers
- **Hook (first line):** we publish our drop sizes like we publish our doses. here's the changelog.
- **Primary text:** drop 001 — [DROP_001_COUNT] boxes, sold out. drop 002 — [DROP_002_COUNT] boxes, window: [DROP_002_DATE]. inside every sachet, unchanged: 200mg lion's mane fruiting body (≥70% beta-glucans, third-party tested), 2.5g ceremonial matcha (~60mg caffeine + naturally occurring l-theanine — supports sustained focus), 2g grass-fed collagen, 0 proprietary blends. access list gets the link first; the text list gets it 10 minutes earlier. *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*
- **Cards:** 1) Navy changelog card: "v001 — sold out ~~[DROP_001_COUNT]~~ / v002 — [DROP_002_COUNT] · [DROP_002_DATE]" in monospaced-feel Syne · 2) REAL label macro, Lime underline on ≥70% · 3) "third-party tested" card — REAL lab-report b-roll still on Navy felt (real documents or the card is cut) · 4) the swirl still, "fifteen seconds. zero friction." · 5) Lime CTA card: `get drop access`.
- **Headline:** doses published. drops published.
- **Description:** the spec sheet you can drink.
- **CTA / destination:** `Sign Up` → /lp/focus (`utm_content=SHR_MOF_FCS_CAR_03`)
- **Visual spec:** cards 1/5 from templates; card 2 real macro; card 3 REAL COA pages fanned on Navy felt, overhead, warm raking light (ai-toolstack rule 6: real trust artifacts or nothing); card 4 master grab.
- **Shoot it real:** print the actual COAs, navy fabric from a craft store, overhead shot in window light.
- **Compliance:** claims: "supports sustained focus" + factual specs. Card 3 ships ONLY with real lab documents. **Disclaimer: Y.**

---

### SHR_TOF_FCS_SPK_01 — "mostly rice" (greenscreen exposé) ⭐ launch-six
- **Format:** TikTok spark, 9:16, 26s
- **Hook (0–1.5s):** greenscreen over a photo of plain white rice, arms crossed, deadpan: **"your mushroom latte is mostly rice. mine has receipts."**
- **Script / shot timing:** (0–1.5s) hook over rice image. (1.5–7s) greenscreen over the phrase "mycelium grown on grain": "most mushroom products count the grain their mushroom grew on. you're largely drinking the substrate." (7–13s) cut to hands + sachet: "shroomé is lion's mane fruiting body — the actual mushroom — hot-water extracted, standardized to seventy percent or more beta-glucans. third-party tested." (13–18s) REAL label macro, finger under the line; Lime underline animates. "beta-glucans support immune function. if a brand won't print the percentage, ask why." (18–23s) tear → pour → swirl (real master): "and it lives in a matcha latte, not a chalky brown mystery." (23–26s) to camera: "read your labels. even ours." end-card + disclaimer.
- **On-screen text beats:** (0s) hook · (4s) "mycelium on grain = mostly grain" · (9s) "fruiting body = the actual mushroom" · (15s) "≥70% beta-glucans. printed." · (24s) "drop 002 — [DROP_002_COUNT] boxes · get drop access"
- **Caption:** the mushroom industry has a rice problem. ours is fruiting body at ≥70% beta-glucans — printed on the label, tested by a third party. beta-glucans support immune function. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #lionsmane #betaglucans #readthelabel #supplementtok #matcha
- **CTA / destination:** `Sign up` → /lp/focus (`utm_content=SHR_TOF_FCS_SPK_01`)
- **Visual spec:** real talent greenscreen (TikTok native effect), generic rice/diagram images (never a competitor's product or name). Label + pour = real. Navy end-card, Lime data strokes.
- **Shoot it real:** TikTok in-app greenscreen, window light on face; label macro + pour on rear camera; assemble in CapCut brand template (focus variant).
- **Compliance:** claims: "supports immune function." Category critique stays generic — no brand names, no disease language. **Disclaimer: Y.**

---

### SHR_TOF_FCS_SPK_02 — "one label" (pill-bottle sweep)
- **Format:** TikTok spark, 9:16, 20s
- **Hook (0–1.5s):** overhead desk, a forearm sweeps six unbranded supplement bottles out of frame, one sachet remains, text: **"i put my entire morning stack on one label."**
- **Script / shot timing:** (0–1.5s) the sweep, hook text. (1.5–8s) VO, precise and calm: "the stack was five bottles, two mysteries, and a proprietary blend i couldn't audit. the replacement is one sachet that publishes everything." (8–13s) spec reveal: slow 180° orbit around the sachet (creative-direction focus motion), numerals landing one by one: 200mg / ≥70% / 2.5g / ~60mg. (13–17s) pour + swirl at the desk, laptop open, "one pour. one block." (17–20s) end-card + disclaimer.
- **On-screen text beats:** (0s) hook · (9s) numerals with Lime strokes, one per beat · (14s) "one pour. one block." · (18s) "drop 002 — get drop access"
- **Caption:** audit-friendly mornings. 200mg lion's mane fruiting body (≥70% beta-glucans, third-party tested) + ceremonial matcha's caffeine + l-theanine — supports sustained focus. every dose on the label. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #deskSetup #nootropics #lionsmane #deepwork #matcha
- **CTA / destination:** `Sign up` → /lp/focus (`utm_content=SHR_TOF_FCS_SPK_02`)
- **Visual spec:** real desk, unbranded/blank-label bottles (tape over labels), real sachet on a small turntable for the orbit. Golden-hour rake, matte laptop, mechanical keyboard in frame, no RGB.
- **Shoot it real:** lazy susan + iPhone at label height for the orbit; sweep shot in one take, three attempts; numerals in CapCut.
- **Compliance:** claims: "supports sustained focus." "stack" here = supplement-routine slang, not code-stacking — allowed; the banned "stack" only concerns discount codes. No drug names, no "replaces your meds" framing (bottles are generic supplements). **Disclaimer: Y.**

---

### SHR_MOF_FCS_SPK_03 — "groupbuy energy" (drop-culture wink)
- **Format:** TikTok spark, 9:16, 19s — retargets focus engagers
- **Hook (0–1.5s):** slow push on the sachet propped against a mechanical keyboard, text: **"sold out like a keyboard groupbuy. except this one supports sustained focus."**
- **Script / shot timing:** (0–1.5s) hook frame. (1.5–8s) VO, dry: "limited run. published count. drop 001 — [DROP_001_COUNT] boxes — went to the access list before the public page said buy. if you've ever camped a groupbuy, you know this genre." (8–13s) changelog card animates like release notes: "v001 sold out → v002: [DROP_002_COUNT] boxes · [DROP_002_DATE]." (13–16s) the swirl at the desk, one beat. (16–19s) end-card: "get drop access — the text list ships, i mean *enters*, 10 minutes early."
- **On-screen text beats:** (0s) hook · (9s) the changelog card · (17s) "get drop access · shroomé"
- **Caption:** we publish drop sizes like we publish doses. v002 is [DROP_002_COUNT] boxes and the access list hears first. matcha's caffeine + l-theanine supports sustained focus — that's the claim, here's the label. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #groupbuy #dropculture #deskSetup #lionsmane
- **CTA / destination:** `Sign up` → /lp/focus (`utm_content=SHR_MOF_FCS_SPK_03`)
- **Visual spec:** real desk world; changelog card in monospaced-feel Syne on Navy, Lavender "sold out" stamp, Lime pulse dot on v002 — drop assets follow brand motion easing, never red-urgency styling.
- **Shoot it real:** desk at golden hour, keyboard + sachet, slow push by walking the phone forward on a slider (or two hands, elbows tucked).
- **Compliance:** claim: "supports sustained focus" (in hook + caption). All counts/dates from ops config. **Disclaimer: Y.**

---

## SEGMENT 5 — the fifteen-second crowd → /lp/pour

Culture cues: momtok honesty, car-line/school-pickup content, bag-dump ("what's in my bag") formats, real-time challenges, airport-tray-table content. This segment watches muted — captions carry everything. Palette world: Cream base, Lime-to-Cream motion streaks (the one segment where Lime escapes the CTA, fills only), Navy type at poster scale, Pink strictly the strawberry chip.

**Segment compliance note:** runs nearly claim-free (speed/taste/convenience). Only permitted claim: "supports healthy energy levels." NEVER pregnancy/nursing safety statements, never child-directed framing, no pregnancy interest targeting.

---

### SHR_TOF_PUR_IMG_01 — "the line was the only ingredient we removed" (kinetic still)
- **Format:** Meta static, 4:5 + 1:1 (Advantage+ friendly)
- **Hook (first line):** a café matcha latte in 15 seconds. the line was the only ingredient we removed.
- **Primary text:** tear the 1oz sachet, pour into any milk, one swirl, out the door. 2.5g of ceremonial matcha — more than most cafés whisk into the $8 order — with zero whisk, zero blender, zero cleanup. drop 001 sold out; drop 002 is a limited run of [DROP_002_COUNT] boxes. get drop access and the link comes to you.
- **Headline:** 15 seconds. no whisk. no line.
- **Description:** drop 002 is limited — get access first.
- **CTA / destination:** `Sign Up` → /lp/pour (`utm_content=SHR_TOF_PUR_IMG_01`)
- **Visual spec — generate (Firefly, plate only):** "bright warm kitchen counter at 6:45am, cream #FDF4EE surface, kinetic lime #C8FF3A to cream gradient streak sweeping diagonally behind the action area as an abstract speed cue, keys and a canvas tote soft-focus in foreground, morning-rush warmth, fine grain, energetic but premium, empty center, 4:5" — composite REAL mid-pour photo (one-handed, into a to-go cup reading "shroomé"). Poster-scale Syne 700 Navy: "15 SECONDS." Instrument Serif italic one-liner beneath: *the café line was the only ingredient we removed.* Lime chip CTA.
- **Shoot it real:** entryway counter, keys + tote staged, one-handed pour into a to-go cup, second person shoots burst on 0.5×; morning window light.
- **Compliance:** speed/taste/convenience only; "$8 order" is a market-price reference, not a competitor claim. **Disclaimer: N.**

---

### SHR_TOF_PUR_VID_02 — "the drive-through audit" (time + money math)
- **Format:** Meta reels + 4:5, 24s
- **Hook (0–1.5s):** dashboard POV of a drive-through queue, elapsed-time counter already running, text: **"this line is about to cost you 15 minutes and $8. watch me spend 15 seconds and ~$3."**
- **Primary text:** the drive-through: 15 minutes, $8, a cup that's mostly ice. the counter at home: tear, pour, swirl — 15 seconds, about $3, 2.5g of ceremonial matcha (more than most cafés use). shroomé is the good drink with granola-bar logistics. drop 001 sold out — get access to drop 002 before it goes.
- **Script / shot timing:** (0–1.5s) queue POV, timer burning. (1.5–8s) split screen: LEFT the queue crawls (timer: 4:12… 9:40…); RIGHT the kitchen one-take begins — tear, pour, swirl, lid — its timer stops at 0:15. (8–14s) right side full-frame replay of the swirl (real master), text: "2.5g ceremonial matcha. ~$3." (14–19s) both "arrive": left pulls away from the window; right is already buckling a seatbelt, cup in the holder, text: "same latte energy. 14 minutes back." (19–24s) end-card.
- **Headline:** 15 minutes vs 15 seconds.
- **Description:** café-grade, ~$3 a pour. drop 002 is limited.
- **CTA / destination:** `Sign Up` → /lp/pour (`utm_content=SHR_TOF_PUR_VID_02`)
- **Visual spec:** all real footage (the one-take make may not be cut — cuts read as cheating, per creative-direction). Timer burns in Syne 700 tabular. No competitor signage readable in the queue shot.
- **Shoot it real:** film an anonymous queue from inside a parked car (no logos in frame); kitchen one-take on a tripod; split-screen in CapCut.
- **Compliance:** price/time/taste claims only; per-pour price must match ops pricing. **Disclaimer: N.**

---

### SHR_MOF_PUR_VID_03 — "things that just make sense" (logistics montage)
- **Format:** Meta reels + stories, 22s — retargets pour engagers + LP bouncers
- **Hook (0–1.5s):** sachet sliding into a jeans back pocket, text: **"things that just make sense when your whole matcha bar weighs 30 grams."**
- **Primary text:** one sachet: desk drawer. one: diaper bag. one: carry-on (1oz — TSA says she flies). one: glove box. it pours into whatever milk exists wherever you are — hot or iced, fifteen seconds, one hand. drop 001 sold out. the text list gets the drop 002 link 10 minutes early.
- **Script / shot timing:** (0–1.5s) pocket slide. (1.5–5s) desk drawer, sachet next to pens. (5–8s) diaper bag side pocket, one-handed grab (other arm visibly holding a kid's jacket). (8–11s) TSA bin beat: quart bag, sachet on top, text "under 3.4oz. she flies." (11–16s) gate-side pour into a clear cup of oat milk, tray table; the swirl (real master insert). (16–19s) 4-location finished-drink montage, one beat each. (19–22s) end-card.
- **Headline:** café energy. any address.
- **Description:** 1oz. shelf-stable. everywhere you are.
- **CTA / destination:** `Sign Up` → /lp/pour (`utm_content=SHR_MOF_PUR_VID_03`)
- **Visual spec:** all real, candid-styled; location labels in Syne ("the desk" / "the bag" / "gate 34" / "the car"). Warm grade everywhere — airport included (creative-direction: warm terminal window light).
- **Shoot it real:** one afternoon, four locations, iPhone; the airport scene can be any bench + window with a boarding pass as set dressing.
- **Compliance:** convenience/factual only (TSA line is factual). Kid-adjacent props ok; never kid-directed framing or "kids love it." **Disclaimer: N.**

---

### SHR_TOF_PUR_SPK_01 — "before the toast pops" (stopwatch one-take) ⭐ launch-six
- **Format:** TikTok spark, 9:16, 25s (mirrored to Meta same-day)
- **Hook (0–1.5s):** toaster lever pushed down, stopwatch starts in-frame, text: **"café matcha latte before the toast pops. no cuts. go."**
- **Script / shot timing:** (0–1.5s) toaster + stopwatch. (1.5–17s) ONE UNBROKEN TAKE: tear (1s), pour into cold oat milk (4s), the swirl breathes in real time (5s — the take slows here on purpose, this is the show), lid on (2s), stopwatch slapped at ~0:15, hold. toast still down. (17–21s) beat of silence… toast pops. deadpan look to camera. (21–25s) end-card: "drop 001 sold out. drop 002 — limited run. get drop access."
- **On-screen text beats:** (0s) hook · (7s) "no cuts. that's the point." · (15s) "0:15" freeze · (18s) "the toast: still cooking" · (22s) "get drop access — shroomé"
- **Caption:** one take, one hand, one very slow toaster. drop 002 is a limited run — the access list gets the link first, texts get it 10 minutes earlier. #realtime #matcha #momtok #nocuts #matchalatte
- **CTA / destination:** `Sign up` → /lp/pour (`utm_content=SHR_TOF_PUR_SPK_01`)
- **Visual spec:** 100% real, single take (non-negotiable — the honesty of one take IS the ad). Stopwatch physically in frame (phone timer propped). Bright cream kitchen, high-contrast Navy captions sized for sound-off.
- **Shoot it real:** this ad is already the iPhone version. Tripod, 4K30, five attempts, use the one where the swirl behaves.
- **Compliance:** claim-free. **Disclaimer: N.**

---

### SHR_TOF_PUR_SPK_02 — "the load-bearing sachet" (bag-dump)
- **Format:** TikTok spark, 9:16, 26s — real creator (archetype 2, mom-coded)
- **Hook (0–1.5s):** tote upended onto a counter in one motion, text: **"what's in my bag as a mom of two: an audit."**
- **Script / shot timing:** (0–1.5s) the dump. (1.5–9s) rapid-fire item roll call, one beat each, warm and wry: "snack i'll never get back. crayons, feral. wipes, obviously. a hair clip that belongs to no one." (9–14s) she holds up the sachet: "and the load-bearing sachet. café matcha latte, fifteen seconds, one hand — because both hands is a luxury i don't have." (14–20s) real-time-ish make with a toddler's jacket over one shoulder: tear, pour into a to-go cup, swirl, lid. (20–23s) sip in the doorway, keys already in hand. (23–26s) end-card: "drop 002 — limited. the text list gets the link at school pickup, 10 minutes early."
- **On-screen text beats:** (0s) hook · (10s) "the load-bearing sachet" · (16s) "15 seconds. one hand." · (24s) "get drop access — shroomé"
- **Caption:** the bag audit results are in. drop 001 sold out — join the access list and the drop 002 link comes to your phone first. #momtok #whatsinmybag #matcha #schoolrun
- **CTA / destination:** `Sign up` → /lp/pour (`utm_content=SHR_TOF_PUR_SPK_02`)
- **Visual spec:** real creator, real bag, real chaos styled warm (creative-direction pour world: one hand always doing something else). No children on camera required — the jacket does the storytelling.
- **Shoot it real:** counter by the door, overhead for the dump, chest-height for the make; creator's actual bag contents.
- **Compliance:** convenience/taste only. Creator brief flags the landmine: **no pregnancy/nursing statements, ever** (see §4 gate). **Disclaimer: N.**

---

### SHR_MOF_PUR_SPK_03 — "i don't camp drops" (SMS mechanics, phone-first)
- **Format:** TikTok spark, 9:16, 20s — retargets pour engagers
- **Hook (0–1.5s):** phone held one-handed in a parked car (car line energy), text: **"i don't have time to camp a drop. the text list camps it for me."**
- **Script / shot timing:** (0–1.5s) hook, car-seat POV, school pickup ambience. (1.5–8s) VO, matter-of-fact: "drop 001 sold out while i was doing — gestures at everything — this. drop 002 is [DROP_002_COUNT] boxes. so i put my number on the list: the link texts me ten minutes before it goes public, with SHROOME30 loaded instead of the 20% code. best code wins." (8–13s) screen insert: our real SMS ("doors open for you in 10 MINUTES…"), thumb tap, done. (13–17s) cut home later: the 15-second make, swirl included. (17–20s) end-card: "get drop access. add your number if you want the head start."
- **On-screen text beats:** (0s) hook · (6s) "drop 002: [DROP_002_COUNT] boxes" · (9s) "text = 10 min early + SHROOME30 (replaces the 20)" · (18s) "get drop access — shroomé"
- **Caption:** efficiency is a love language. the text list gets every drop 10 minutes early and SHROOME30 replaces the 20% code — best code wins, simple as that. #schoolpickup #momtok #dropculture #matcha
- **CTA / destination:** `Sign up` → /lp/pour (`utm_content=SHR_MOF_PUR_SPK_03`)
- **Visual spec:** real phone, real SMS copy from engagement-capture-flows (never invented messages); parked-car light is naturally warm at pickup hour. Captions extra large — muted viewing assumed.
- **Shoot it real:** parked car, phone mount on the headrest; screen-record the staged SMS on airplane mode.
- **Compliance:** offer mechanics, all real. Code phrasing verbatim: "SHROOME30 replaces the 20% code — best code wins." **Never "stack." Disclaimer: N.**

---

# 3. BOF DROP-CONVERSION PACK — for when drop 002 opens

Rules of engagement: these run ONLY once ops confirms `[DROP_002_DATE]` and the counts are live in config. Countdown ads render real clocks to the real open time. "Boxes left" ads pull `[LIVE_BOXES_REMAINING]` from the same counter the site uses — if the feed breaks, the ad pauses. Audiences: drop-access list (customer-list match + LP converters); SMS members are EXCLUDED from "add your number" messaging and suppressed from ads 3's join-framing variant. Destination: `/drop` (live store). All six use the shared end-card with the drop ledger in its live state. Scarcity dresses in brand — Navy/Lime/Lavender, never generic red urgency.

---

### SHR_BOF_ALL_VID_01 — "the clock is real" (countdown)
- **Format:** Meta + TikTok, 9:16/4:5, 15s. Flight: T-72h → open.
- **Hook (0–1.5s):** the drop ledger fills the frame, the countdown digits tick once: **"drop 002 opens in [dd:hh:mm]. the clock is real — that's the whole point."**
- **Primary text (Meta):** we don't do fake timers, so believe this one. drop 002 — [DROP_002_COUNT] boxes, a real production run — opens [DROP_002_DATE]. you're on the access list: the link comes to you at open. want it 10 minutes before everyone? add your number — SHROOME30 replaces your 20% code. best code wins.
- **Script / shot timing (TikTok):** (0–1.5s) ledger + ticking clock. (1.5–7s) VO: "no resetting timers, no theater. [DROP_002_COUNT] boxes. one date. we published both." (7–12s) the swirl, real master — one breath of desire in a mechanics ad. (12–15s) end-card, live countdown burned in, Lime `shop drop 002` chip (BOF CTA variant).
- **On-screen text beats:** (0s) hook + live clock · (8s) "[DROP_002_COUNT] boxes. that's the run." · (13s) "texts go 10 min early — shroomé"
- **Headline / description (Meta):** drop 002 opens [DROP_002_DATE]. / [DROP_002_COUNT] boxes. real run, real clock.
- **CTA / destination:** `Shop Now` → /drop (`utm_content=SHR_BOF_ALL_VID_01`)
- **Visual spec:** countdown in Syne 700 tabular numerals, Navy on Cream chip, brand easing (fast in, long soft out — same curve as the swirl settle). Dynamic time overlay via platform countdown sticker (TikTok) / rendered daily cuts (Meta).
- **Shoot it real:** the ledger is a motion-graphics asset; only the swirl insert is footage (master).
- **Compliance:** scarcity = facts from config. No product claims → **Disclaimer: N.** Code line phrasing locked ("replaces… best code wins").

---

### SHR_BOF_ALL_IMG_02 — "the allocation" (published-run spec sheet)
- **Format:** Meta static + TikTok image card, 4:5/9:16. Flight: open → close.
- **Hook (first line):** [DROP_002_COUNT] boxes exist. this is not a metaphor.
- **Primary text:** drop 002 is a numbered production run: [DROP_002_COUNT] boxes, counted at the co-packer, published here the way we publish doses. when the counter hits zero the drop closes and we start making drop 003. you're holding access — the link in your email works now.
- **Headline:** drop 002 — limited run of [DROP_002_COUNT].
- **Description:** when it's gone, it's a number, not a tactic.
- **CTA / destination:** `Shop Now` → /drop (`utm_content=SHR_BOF_ALL_IMG_02`)
- **Visual spec — generate (Firefly, backdrop only):** "deep navy #1B1F3B field, faint cloud texture at 8%, subtle grain, warm starburst glow low center, empty, 4:5" — composite REAL packshot (vanilla + strawberry pair), above them Syne 700 Cream at poster scale: "[DROP_002_COUNT] boxes." with a Lime underline stroke; Instrument Serif italic beneath: *that's the run.* Drop ledger strip at bottom, Lavender "sold out" stamp on 001.
- **Shoot it real:** two-sachet packshot on navy card, single warm lamp, slight top-down angle.
- **Compliance:** the count MUST equal the actual production run (honesty rule / investor-update test). No claims → **Disclaimer: N.**

---

### SHR_BOF_ALL_VID_03 — "the texts got in 10 minutes ago" (early-access dramatization)
- **Format:** TikTok spark + Meta reels, 9:16, 20s. Flight: fires at public open, T+0 → T+48h.
- **Hook (0–1.5s):** two phones side by side on a counter, the left one lights up first, text: **"the text list got in 10 minutes ago. this is the other phone's story."**
- **Script / shot timing:** (0–1.5s) hook, left phone buzzing. (1.5–7s) left phone POV: our real SMS ("early access is LIVE… SHROOME30 is loaded. move."), thumb taps, checkout speedrun, confirm. (7–12s) right phone finally lights: "drop 002 is open." taps through — still in stock, but the counter is visibly lower. VO: "both of them got matcha. one of them got options." (12–16s) the swirl, real master — the prize. (16–20s) end-card: "drop 002 is open now. next drop, be the left phone — add your number."
- **On-screen text beats:** (0s) hook · (5s) "SHROOME30 loaded (replaces the 20)" · (10s) "counter: lower." · (17s) "shop drop 002 — shroomé"
- **Primary text (Meta):** dramatization; also just the mechanics. the text list gets every drop 10 minutes before the public, with SHROOME30 loaded — it replaces your 20% code, best code wins. drop 002 is open now with [LIVE_BOXES_REMAINING] of [DROP_002_COUNT] boxes left. both phones welcome.
- **CTA / destination:** `Shop Now` → /drop (`utm_content=SHR_BOF_ALL_VID_03`)
- **Visual spec:** two real phones, staged screens with OUR real SMS/site states only (no fabricated customer messages); warm counter light; checkout screens are the real /drop flow captured on staging.
- **Shoot it real:** screen-record both flows on staging, film phones-on-counter with a third phone.
- **Compliance:** "dramatization" appears in caption; the 10-minute mechanic and code behavior are literally true. **Disclaimer: N.** SMS-list members are excluded from this ad's audience (they already have the perk — see RTG variant instead).

---

### SHR_BOF_ALL_VID_04 — "last boxes" (live-counter close)
- **Format:** Meta + TikTok, 9:16/4:5, 12s. Flight: fires ONLY when `[LIVE_BOXES_REMAINING]` ≤ 20% of run; auto-pauses if the feed breaks.
- **Hook (0–1.5s):** the live counter, big, ticking down one: **"[LIVE_BOXES_REMAINING] boxes left of [DROP_002_COUNT]. same counter ops uses. not a vibe — a number."**
- **Script / shot timing:** (0–1.5s) counter hook. (1.5–6s) VO: "drop 001 ended exactly like this, except you weren't holding a link." (6–9s) the swirl, one breath. (9–12s) end-card: "drop 002 closes when this hits zero. shop now."
- **On-screen text beats:** (0s) live counter · (7s) "drop 001: sold out. you remember." · (10s) "shop drop 002 — shroomé"
- **Primary text (Meta):** the counter on this ad is the counter on the site. [LIVE_BOXES_REMAINING] of [DROP_002_COUNT] boxes remain in drop 002. when they're gone we start production on 003 and this becomes a screenshot.
- **CTA / destination:** `Shop Now` → /drop (`utm_content=SHR_BOF_ALL_VID_04`)
- **Visual spec:** counter in Syne 700 tabular, Navy on Cream, Lime pulse dot; refreshed via daily re-render (Meta) / countdown-adjacent live sticker where supported. No red, no klaxons — the calm of a true number is the flex.
- **Shoot it real:** motion-graphics + master swirl insert only.
- **Compliance:** THE honesty-rule ad. Number must be live and reconciled with ops; if we wouldn't publish it in an investor update, the ad doesn't run. No claims → **Disclaimer: N.**

---

### SHR_RTG_ALL_IMG_05 — "it's already in your inbox" (waitlist non-openers, 1 of 2)
- **Format:** Meta static + stories, 4:5/9:16. Audience: access list matched, drop-open email non-openers (Klaviyo segment sync), T+12h → close.
- **Hook (first line):** you did the hard part months ago. the email you're ignoring is the payoff.
- **Primary text:** you joined the drop 002 access list — and drop 002 is open right now. the link is sitting in your inbox (subject: "the next pour is live"). [LIVE_BOXES_REMAINING] of [DROP_002_COUNT] boxes left. your SHROOME20 is locked to your email; if you ever added your number, SHROOME30 replaced it — best code wins, it's already applied to your link.
- **Headline:** drop 002 is open. you have the link.
- **Description:** check your inbox — or just tap here.
- **CTA / destination:** `Shop Now` → /drop (`utm_content=SHR_RTG_ALL_IMG_05`)
- **Visual spec — generate (Firefly, plate only):** "warm morning nightstand scene, cream #FDF4EE linen, soft lavender #E8D5F0 dawn light through a window, a phone face-up glowing softly (screen blank), fine grain, calm, 4:5" — composite a rendered notification card in-frame using our REAL email subject line, plus the small sachet packshot in a corner card. Never render a fake customer conversation.
- **Shoot it real:** phone on a nightstand at dawn, staged notification, one warm lamp.
- **Compliance:** offer states must match the user's actual tier logic (20 vs 30 copy is conditional by segment sync — run as two ad-set variants, never claim both). No claims → **Disclaimer: N.**

---

### SHR_RTG_ALL_VID_06 — "you joined for this exact moment" (waitlist non-openers, 2 of 2)
- **Format:** Meta reels + TikTok, 9:16, 18s. Audience: same non-opener segment, sequenced after IMG_05 (T+36h).
- **Hook (0–1.5s):** the swirl already mid-bloom, text: **"remember why you joined a waitlist for a drink? this. this is why."**
- **Script / shot timing:** (0–1.5s) master swirl, no preamble. (1.5–8s) VO, warm: "months ago you handed us your email for a matcha you couldn't buy yet. that was the whole transaction. today it's buyable — [LIVE_BOXES_REMAINING] boxes of drop 002 left." (8–13s) the full ritual, unhurried: tear, pour, swirl, sip (real footage). (13–18s) end-card: "your access link is live. drop 002 closes at zero. shop now — shroomé."
- **On-screen text beats:** (0s) hook · (6s) "drop 002: open · [LIVE_BOXES_REMAINING] left" · (15s) "shop drop 002 — shroomé"
- **Primary text (Meta):** the list was step one. this is step two. drop 002 is open — [LIVE_BOXES_REMAINING] of [DROP_002_COUNT] boxes left, your code already applied at the link in your inbox. fifteen seconds to pour; considerably less to check out.
- **CTA / destination:** `Shop Now` → /drop (`utm_content=SHR_RTG_ALL_VID_06`)
- **Visual spec:** master swirl carries the whole ad — this is the one placement where the asset runs nearly uncut for 8+ seconds. Warm grade, minimal text, sound-on pour foley.
- **Shoot it real:** it already is — the master. If a fresh variant is needed: single golden-hour pour, tripod, one take.
- **Compliance:** desire + facts, zero claims → **Disclaimer: N.** Live numbers from config.

---

# 4. CREATOR / UGC BRIEF — one-pager

**What we're buying:** real people, real product, real pours — the taste-credibility layer AI variants can't legally or spiritually provide. AI (Arcads/HeyGen) kills weak hooks cheap; creators re-shoot the winners. No creator content ships until the winner's hook is proven OR the creator is one of the three archetypes below on a standing brief.

## 4.1 The three creator archetypes

| Archetype | Who | Feeds | Segments served | Content DNA |
|---|---|---|---|---|
| **the ritual documentarian** | aesthetic morning creator, 10–100k, matcha-tok/romanticize-your-life native | TikTok, IG Reels | ritual, glow | golden light, unhurried hands, the swirl as the emotional peak; GRWM and shelf-pan formats; taste + beauty language only |
| **the honest switcher** | ex-multiple-coffees-a-day narrator (often mom/office-coded), tells it like a diary, allergic to hype | TikTok, IG, YT Shorts | calm, pour | "i switched" experience narratives (REAL experience only), one-take makes, car-line and 2pm content; must carry "individual results may vary" on results-style content |
| **the label reader** | wellness skeptic-optimizer, reads supplement facts on camera, deadpan, spreadsheet energy | YT Shorts, TikTok, X | focus (+ glow ingredient content) | label macros, jar demos, "3 numbers" checklists, receipts/COA content; compliant precision IS their voice |

## 4.2 Deliverables spec (per creator, per flight)

1. **1 hero vertical (20–30s)** in their native format, built on an approved hook from this library or their own (pre-cleared).
2. **3 alternate hooks** — first 3 seconds re-shot three ways on the same body (we test hooks, not whole videos).
3. **1 15s cutdown** (paid-placement safe, captions burned, sound-off legible).
4. **B-roll pack (min 10 clips, 4K, unedited):**
   - the signature swirl, shot to spec: clockwise, real time ≥3s captured (we use ≥1.5s), backlit through the glass, warm light, no whisk/powder/props
   - the tear (macro, crisp audio), the pour (overhead + through-glass), hands-around-cup, sachet flat-lay label-up, one candid sip, one location-context wide (their world: vanity / desk / doorway / windowsill)
5. **Raw files + project handoff** so we can cut segment variants in the brand CapCut templates.

## 4.3 Usage rights (contract note)

- 90-day paid usage across Meta + TikTok + YT from first traffic date, whitelisting/spark authorization included; renewal at pre-agreed rate (no perpetuity grabs, no "in perpetuity, all media" boilerplate — it poisons creator relationships).
- FTC: #ad disclosure on every post; material connection disclosed even for gifted-only.
- Brand may edit/cut; creator's face never placed on claims they didn't say.

## 4.4 The "pour test" quality gate (from funnel-teardown item 8 — our micro-SeedUniversity)

No creator posts, and no spark code is accepted, until they pass BOTH gates:

1. **The claims quiz** — a 10-minute brief + short quiz on our rules: structure/function language only ("supports sustained focus," "supports skin health," "supports immune function," "supports healthy energy levels"); the banned list (anxiety/withdrawal/addiction/cure/treat/sleep outcomes/anti-aging/timelines/drug names/pregnancy-nursing safety/"codes stack"); disclaimer duty (any claim = FDA disclaimer in caption); "individual results may vary" on experience content. Pass = certificate; the certificate itself is flex content ("i had to pass a compliance quiz to post about a latte" is a post we WANT).
2. **The literal pour test** — creator films one clean, unbroken tear-pour-swirl that meets the swirl spec (clockwise, real time, backlit, warm). If their pour doesn't make the drink look like the drink, the partnership isn't ready — taste credibility is the product.

**Compliance is contractual:** disease language, timeline promises, or scarcity invention = content killed at our discretion, kill fee per contract, no reposts.

---

## Appendix — pre-flight checklist (every ad, every re-cut)

- [ ] scarcity lines pull real values (`[DROP_00X_COUNT]`, `[DROP_002_DATE]`, live counters) from ops config — nothing hardcoded, nothing theatrical
- [ ] claim audit: only approved structure/function claims; calm-segment banned-word sweep (incl. alt text + captions)
- [ ] FDA disclaimer present wherever a claim appears (caption + end-card template variant)
- [ ] SHROOME30 phrasing: "replaces your 20% code — best code wins." the word "stack" does not appear
- [ ] sachet/label/swirl/consumption/founder = real footage; AI assets are backgrounds/inserts only, filenames tagged `-aigen`, platform AI-disclosure toggles set where synthetic humans/VO appear
- [ ] lowercase display copy; wordmark "shroomé"; warm grade passes the image-guidelines warmth check
- [ ] end-card: packshot, "pour / swirl / glow," live drop-status line, Lime CTA chip
- [ ] UTM: `utm_campaign=lp-{slug}`, `utm_content={ad_code}` → Klaviyo segment mapping intact
