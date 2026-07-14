# shroomé MOF promo creative pack — the Mé keychain & under-eye gels

> Date: 2026-07-14 · Owner: Promo & MOF Creative Strategist
> Extends: `ad-creative-library-v1.md` (architecture, naming, kill/scale rules, end-card, honesty rule — ALL inherited). Offer logic: `Product/SKU Catalog/promo-value-add-plan.md`. Visual system: `../Creative/creative-direction.md` · AI boundaries: `../Creative/ai-toolstack.md`.
> Job of this pack: middle-funnel retargeting built AROUND the promo items — audiences who visited LPs or joined the waitlist but haven't taken the next action (SMS opt-in, referral start, sub intent). These ads sell the *ladder*, not the drink; the drink ads already exist.
> Palette: Navy `#1B1F3B` · Cream `#FDF4EE` · Lime `#C8FF3A` · Pink `#FFB7D1` · Lavender `#D4B8E0` · Soft Lavender `#E8D5F0` · Blush `#FFE0EC`.

---

# 0. PACK ARCHITECTURE

## 0.1 Naming — extending library v1

Same convention: `SHR_[stage]_[segment]_[format]_[hook#]`, hook numbers unique within segment+format across ALL stages (library rule). This pack:

- Continues existing segment counters (e.g. RIT SPK is at 03 → this pack starts at 04).
- **Extends `ALL` to MOF**: v1 used `ALL` only for list-wide BOF; this pack uses `SHR_MOF_ALL_*` for list-wide MOF retargeting pools (waitlist non-SMS, engaged social) where the promo item — not a segment story — is the message. Numbering within ALL continues past the BOF/RTG codes already minted (VID at 06 → 07; SPK unused → 01).

## 0.2 The promo items in one line each

- **Mé keychain (SHR-KCH-01):** soft PVC 2D charm of Mé the sheep, 45×40mm, with a 40×12mm wordmark tag. **Never for sale, no price, ever** — earned via referrals (3 = keychain), SMS-tier first boxes, sub first boxes, quiz draws. Colorway per drop. Unlimited creative fun — zero claims exist to break.
- **Under-eye gels (SHR-EYG-06):** box of 6 under-eye gel patches, 30ml total. Earned at 5 referrals, GWP at $66+ on drop day, every 3rd sub delivery (24/48 tiers). Positioning: **"the glow you drink, now the glow you wear."** Cosmetic claims ONLY — see 0.4.

## 0.3 Render-asset rule (new — read before generating anything)

The founder is uploading **Bolden render/art files** for both items to Drive. Until real samples land (keychain 1,000pc test run; gels first PO), **those renders are the only source of truth for what the products look like.**

- Every visual spec below carries a `[RENDER: …]` slot. Fill it from the Bolden files (expected slots: `[RENDER: keychain hero]`, `[RENDER: keychain colorways]`, `[RENDER: keychain polybag]`, `[RENDER: gels box]`, `[RENDER: gel patch]`). **Do not fabricate product details beyond the production facts** (PVC 2D+2D, 45×40mm charm + 40×12mm tag, cream/off-white face, deep brownish-green wordmark, poly bag with logo, assorted colors; gels = box of 6, 30ml).
- Generation prompts below are written **image-to-image / composite-first**: the Bolden render (or its cutout) is the structure reference; AI builds the scene, light, and camera around it. Text-only generation of the keychain is for internal comps ONLY, never traffic.
- **The wordmark is never AI-regenerated.** If the render's tag text softens in generation, composite the vector wordmark from brand files.
- **Sachet / label / swirl rules carry over untouched** (ai-toolstack override list): when the drink appears in these ads, it's the real master footage / real packshots. The keychain and gels renders are *manufacturer art of non-ingestible items* — an approved exception to "no AI product imagery," bounded by: replace renders with real photography as soon as samples arrive (Friday re-shoot rule applies), and **gels applied to skin = real humans, real product only** (consumption-adjacent; a rendered box may float in a still, a rendered patch never touches a rendered face).
- Filenames: `-bolden` for untouched render assets, `-aigen` for anything generated around them.

## 0.4 Gels compliance lexicon (cosmetic — applies to every EYG ad, caption, alt text, comment reply)

- ✅ ALLOWED (appearance/sensory): "hydrates" · "cools" · "refreshes the look of tired under-eyes" · "skin feels smoother" · "reduces the *appearance* of puffiness" (appearance framing mandatory) · "a 15-minute reset" · "looks more awake"
- ❌ BANNED (drug/medical): "treats/reduces puffiness or dark circles" (without "appearance of") · "erases/reduces wrinkles or fine lines" · "anti-aging" · "de-puffs" as an outcome promise · "boosts/rebuilds collagen in your skin" · any timeline promise · before/after eye photos
- The DRINK's claims stay in their own lane: "collagen supports skin health" etc. are supplement structure/function claims → FDA disclaimer required in that ad. **Never blend the lanes in one sentence** ("drink collagen and wear it so your skin repairs itself" = incident).
- ⚠️ All gel-count copy blocked on `[PAIRS_OR_SINGLES]`; all ingredient copy blocked on INCI verification (`promo-value-add-plan.md` §6).
- Keychain ads: no claims exist. Fun is unlimited; honesty rule still applies to every scarcity/mechanic line (colorway counts, referral thresholds — real numbers only).

## 0.5 Shared MOF end-card variant

Library end-card, two changes for this pack: line 2 becomes the earn line — "**not for sale. earned only.**" (keychain cuts) or "**the gift in box 3**" (gels cuts) above the drop-status line; CTA chip stays Lime `get drop access` (keychain referral cuts may use `start referring` when the destination is /refer). Everything else (packshot, pour/swirl/glow, disclaimer slot) unchanged.

---

# 1. KEYCHAIN SIX — Mé as status object

---

### SHR_MOF_RIT_SPK_04 — "she's on my keys now" (charm macro, soft-launch)
- **Format:** TikTok spark, 9:16, 18s — retargets /lp/ritual visitors (30d non-signup) + RIT engagers
- **Hook (0–1.5s):** extreme macro, keys lifting off a linen tray in golden light, the little sheep charm swinging into focus: **"you can't buy her. i had to earn her."**
- **Script / shot timing:** (0–1.5s) macro hook, charm catching light. (1.5–6s) VO, soft-launch energy: "no link. no price. she comes in the first box if you're on the text list — or at three referrals if your group chat loves you." (6–11s) the charm clipped to a tote strap, then a belt loop, one beat each — worn like jewelry, not merch. (11–14s) the pour answers: tear → pour → swirl (REAL master insert, ≥1.5s) with the keys resting beside the glass. (14–18s) MOF end-card: "not for sale. earned only." + drop line + Lime chip.
- **On-screen text beats:** (0s) hook · (4s) "not sold. anywhere." · (8s) "3 referrals = mé" · (15s) "get drop access — shroomé"
- **Caption:** she's 45 millimeters of pvc and she's never touching a shopping cart. text list gets her in the first box; three referrals earns her outright. #matchatok #keychain #softlaunch #dropculture
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content=SHR_MOF_RIT_SPK_04`)
- **Visual spec — generate (Firefly/Photoshop composite + Runway img2video):** base = `[RENDER: keychain hero]` cutout. Scene prompt (plate only): "sun-drenched morning still life on cream #FDF4EE linen, brass house keys and a claw clip, soft lavender #E8D5F0 shadow field, golden backlight with gentle flare, shallow depth of field, editorial macro product photography, 9:16, fine film grain, empty space center for composite." Composite the charm at true scale (45×40mm ≈ two key-heads wide — scale against the keys), **glossy soft-PVC specular highlights along the molded color edges, 5mm thickness visible at the rim, top loop + small chain to the 40×12mm wordmark tag hanging below**. Motion: Runway image-to-video parallax push (see §4). Real footage for: hands, tote/belt-loop wear shots (use an actual sample as soon as the test run lands — until then these two beats are cut and the ad runs 15s render-only).
- **Compliance:** no claims. "earned" mechanics must match live referral config. **Disclaimer: N.**

---

### SHR_MOF_ALL_SPK_01 — "the colorway drop" (stop-motion lineup)
- **Format:** TikTok spark + Meta reels, 9:16, 15s — retargets engaged social (IG/TT 180d)
- **Hook (0–1.5s):** empty cream seamless, then keychains hop into frame one by one, stop-motion, each landing with a soft click: **"the sachet has flavors. mé has colorways."**
- **Script / shot timing:** (0–1.5s) first charm lands, hook text. (1.5–7s) stop-motion lineup builds — one colorway per beat, name-chips appearing under each ("drop 002 — [COLORWAY_NAME]" on the live one, others greyed "gone" / "not yet"). (7–11s) all but the current colorway slide off; it rotates once (turntable move). VO: "one colorway per drop. when the drop closes, so does she." (11–15s) end-card: "drop 002 colorway — in first boxes for the text list. not for sale."
- **On-screen text beats:** (0s) hook · (5s) colorway name-chips · (9s) "one per drop. then gone." · (13s) "get drop access — shroomé"
- **Caption:** collecting a sheep is not a personality trait but it's about to be mine. one colorway per drop, earned not bought. #stopmotion #keychain #dropculture #matcha
- **CTA / destination:** `Sign up` → /lp/ritual as default LP for untagged engagers (`utm_content=SHR_MOF_ALL_SPK_01`)
- **Visual spec — generate:** base = `[RENDER: keychain colorways]` (the assorted-colors sheet). If Bolden supplies per-color renders: build the stop-motion from stills — each colorway cut out, dropped onto a Firefly plate: "warm cream #FDF4EE seamless studio sweep, soft top-light, gentle shadow pool under each object position, 9:16, fine grain, empty." 12fps stop-motion cadence assembled in CapCut (deliberately handmade, not smooth interpolation). Turntable beat: Runway image-to-video orbit on the hero colorway (§4). Colorway names/counts from ops config — **honesty rule: only render colorways the factory actually confirmed.**
- **Compliance:** no claims; colorway scarcity lines must be literally true. **Disclaimer: N.**

---

### SHR_MOF_FCS_IMG_02 — "price: —" (spec-sheet status static)
- **Format:** Meta static, 4:5 + 1:1 — retargets /lp/focus visitors (30d non-signup)
- **Hook (first line of primary text):** we publish every dose and every drop size. here's the one number we won't publish: her price.
- **Primary text:** the mé keychain doesn't have one. soft pvc, 45×40mm, molded in one colorway per drop, packed in with the first boxes for the text list — or earned at three converted referrals. it is not in the store. it will never be in the store. some things you can't spec into a cart. drop 001 sold out; drop 002 is a limited run of [DROP_002_COUNT] boxes. get drop access.
- **Headline:** msrp: not applicable.
- **Description:** earned only. 3 referrals or the text list.
- **CTA / destination:** `Sign Up` → /lp/focus (`utm_content=SHR_MOF_FCS_IMG_02`)
- **Visual spec — generate (Firefly plate + composite):** plate: "deep navy #1B1F3B studio field, subtle film grain, faint warm rim-light from upper left, premium watch-advertisement lighting, completely empty, 4:5." Composite `[RENDER: keychain hero]` centered on a small riser shadow, rim-lit so the PVC gloss reads. Beside it, a Syne 700 Cream spec table, hairline Navy rules, Lime underline strokes: `material — soft pvc` / `size — 45×40mm` / `run — one colorway per drop` / `price — —`. The em-dash in the price row is the ad. Instrument Serif italic footer: *not for sale is the spec.*
- **Compliance:** no claims; referral threshold + drop counts from config. **Disclaimer: N.**

---

### SHR_MOF_ALL_VID_07 — "the box had a passenger" (unboxing surprise POV)
- **Format:** Meta reels + TikTok, 9:16, 20s — **audience: waitlist members NOT on SMS** (Klaviyo segment sync; SMS list excluded)
- **Hook (0–1.5s):** hands opening the shipper on a kitchen counter, POV: **"the text list's boxes come with a passenger."**
- **Script / shot timing:** (0–1.5s) box flaps open, hook. (1.5–6s) POV lift: the retail box, and tucked beside it a small poly bag with the logo print — held up to the light, the sheep silhouette visible through it. (6–10s) bag torn (crisp audio), charm dropped into palm, macro beat on the gloss. VO: "not announced. not sold. just… in there, if your number is." (10–14s) charm clipped to the keys that are already on the counter; the pour + swirl behind (REAL master insert). (14–20s) end-card: "you're on the list. add your number: the drop 002 link 10 minutes early, SHROOME30 replaces your 20% code — best code wins — and mé rides in your first box."
- **On-screen text beats:** (0s) hook · (7s) "not sold. included." · (12s) "text list = 10 min early + her" · (17s) "add your number — shroomé"
- **Caption:** surprise-and-delight is a strategy and also a small sheep in a poly bag. add your number: early link, best code, first-box passenger. #unboxing #matcha #dropculture
- **CTA / destination:** `Sign up` → /lp/pour SMS-first module for untagged, else matched LP (`utm_content=SHR_MOF_ALL_VID_07`)
- **Visual spec:** unboxing hands/box/counter = REAL footage (shipper + retail box exist). The charm inserts are `[RENDER: keychain hero]` + `[RENDER: keychain polybag]` composited into two locked frames until samples land — then re-shoot the palm-drop and clip-on for real (the tactile beats are the ad; renders are the bridge, per §0.3). Poly-bag silhouette shot: backlight through the printed bag, logo print sharp — if compositing, keep the bag's logo from the Bolden art, never generated type.
- **Compliance:** SMS mechanics verbatim from the locked phrasing: "SHROOME30 replaces your 20% code — best code wins." **The word "stack" does not appear.** First-box keychain promise must match live P1 config before traffic. **Disclaimer: N.**

---

### SHR_MOF_ALL_SPK_02 — "which colorway are you" (duet-bait)
- **Format:** TikTok spark, 9:16, 13s — engaged social (commenters/sharers 180d); organic-first, spark the winner
- **Hook (0–1.5s):** four charms in a 2×2 grid on cream, camera slowly zooming, text: **"which mé are you? wrong answers get duetted."**
- **Script / shot timing:** (0–1.5s) grid + hook. (1.5–8s) each colorway gets a one-beat zodiac-style caption chip, deadpan VO: "[COLORWAY_1]: journals at golden hour. [COLORWAY_2]: 14 tabs open, thriving. [COLORWAY_3]: replies 'omw' from bed. [COLORWAY_4]: has never missed a drop." (8–11s) grid collapses to the current drop colorway, pulse. (11–13s) end-card: "one of these ships in drop 002 first boxes. not for sale. get drop access."
- **On-screen text beats:** (0s) hook · (2–8s) caption chips · (12s) "get drop access — shroomé"
- **Caption:** assigning you a sheep based on vibes alone. duet with your pick — the correct answer is whichever one you actually earn. #whichoneareyou #duetthis #keychain #matcha
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content=SHR_MOF_ALL_SPK_02`)
- **Visual spec — generate:** 2×2 grid built from `[RENDER: keychain colorways]` cutouts on a Firefly plate: "soft blush #FFE0EC to cream #FDF4EE gradient field, even beauty light, four gentle shadow pools in a grid, 9:16, fine grain, empty." Zoom = post move, not regeneration. Caption chips Syne 700 Navy on Cream pills. Only factory-confirmed colorways appear (honesty rule).
- **Compliance:** no claims. Personality captions are jokes, not testimonials. **Disclaimer: N.**

---

### SHR_MOF_RIT_VID_04 — "who is mé?" (lore essay)
- **Format:** Meta reels + TikTok, 9:16, 28s — retargets RIT + GLW engagers (25%+ viewers) and waitlist openers, non-SMS
- **Hook (0–1.5s):** near-still frame, the charm resting on an open notebook in lamp light, VO begins: **"a short essay about the sheep on the box."**
- **Script / shot timing:** (0–1.5s) hook frame. (1.5–9s) VO essay, hushed: "her name is mé. accent included — she came with the wordmark. sheep spend their whole lives making something soft and letting people take it. that felt right for a brand whose whole job is making mornings softer." (9–15s) slow beats: the wordmark tag macro (deep brownish-green on cream), the charm beside a steaming shroomé mug, the swirl (REAL master, one breath). (15–22s) VO: "you can't buy her. she arrives with first boxes for the text list, or after three friends join because of you. she's not merch. she's a receipt — proof you were here early." (22–28s) end-card: "who is mé? whoever earns her. get drop access."
- **On-screen text beats:** (0s) "who is mé?" · (10s) "mé. as in shroo-mé." · (17s) "not merch. a receipt." · (24s) "get drop access — shroomé"
- **Caption:** lore drop: the sheep has a name and a no-purchase policy. mé arrives in text-list first boxes or at three referrals. #brandlore #mascot #matcha #keychain
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content=SHR_MOF_RIT_VID_04`)
- **Visual spec — generate:** stills built on `[RENDER: keychain hero]` + `[RENDER: keychain tag detail]` over Firefly plates: "warm evening desk, cream #FDF4EE notebook paper texture, soft lavender #E8D5F0 lamp shadow, intimate macro depth, 9:16, heavy fine grain, empty center." Runway parallax on each still (§4), 3s+ holds — calm-segment pacing in maximalist clothes. Mug/steam/swirl = REAL. VO: ElevenLabs RIT-segment voice or founder-adjacent read; **never a founder voice clone.** Lore stays product-true: name, accent, softness — no fabricated origin dates, no fake "since" claims.
- **Compliance:** no claims. Lore is framing, not fact-claims about provenance. **Disclaimer: N.**

---

# 2. EYE-GEL SIX — educate and sell the glow bridge

---

### SHR_MOF_GLW_VID_03 — "inside and outside" (the collagen loop)
- **Format:** Meta reels + 4:5, 24s — retargets /lp/glow visitors (30d non-signup) + GLW video viewers
- **Hook (0–1.5s):** split frame — left: the pour hitting milk; right: a gel patch lifted off its tray, both moves synced, text: **"the glow you drink. now the glow you wear."**
- **Script / shot timing:** (0–1.5s) synced split, hook. (1.5–8s) left side full: the swirl (REAL master), VO: "inside: 2 grams of grass-fed collagen peptides in every sachet — collagen supports skin health." (8–15s) right side full: real hands placing a patch under a real eye, 15-minute timer chip appears. VO: "outside: an under-eye gel that cools, hydrates, and refreshes the look of the morning you almost had." (15–20s) both together on the vanity — sachet + gels box (`[RENDER: gels box]` until samples land), text: "one story. both directions." (20–24s) end-card: "the gels aren't sold separately. they're earned — five referrals, or free with $66+ on drop day." + FDA disclaimer line.
- **On-screen text beats:** (0s) hook · (5s) "2g collagen — every sachet" · (11s) "cools. hydrates. 15 minutes." · (21s) "earned, not sold — get drop access"
- **Caption:** the collagen story finally has a matching accessory. inside: 2g grass-fed collagen peptides — supports skin health. outside: a cooling under-eye gel for the look of more sleep. earned at five referrals or free over $66 on drop day. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #skintok #collagen #eyepatches #matcha
- **CTA / destination:** `Sign Up` → /lp/glow (`utm_content=SHR_MOF_GLW_VID_03`)
- **Visual spec — generate:** gels-box beauty still: composite `[RENDER: gels box]` onto Firefly plate: "warm marble vanity in blush #FFE0EC morning light, mirror edge catching light upper right, dewy soft-focus atmosphere, creamy highlights, fine grain, empty center-right, 4:5, beauty editorial, never clinical white." Patch-on-skin, hands, sip = REAL humans only (§0.3 hard rule). Swirl = real master. Match-cut sync built in CapCut.
- **Compliance:** two lanes, kept apart: drink claim "collagen supports skin health" (supplement) → **Disclaimer: Y**; gel language cosmetic-only per §0.4. Never suggest the gels deliver collagen into skin. Earn mechanics from live config.

---

### SHR_MOF_GLW_SPK_04 — "pour. patch. fifteen." (the morning stack)
- **Format:** TikTok spark, 9:16, 22s — retargets GLW engagers; real creator (morning documentarian archetype)
- **Hook (0–1.5s):** creator taps a gel patch against the mirror like a credential: **"my morning has a 15-minute intermission and both leads are matcha-adjacent."**
- **Script / shot timing:** (0–1.5s) mirror hook. (1.5–7s) the stack, one beat each: tear the sachet, pour, the swirl breathes (REAL master); patches on while the latte settles. (7–14s) the intermission montage — patches on, mug in hand, journal open, sunlight; timer chip counts 15:00 → 0:00 in three jumps. VO: "the drink does its thing. the gels cool and hydrate while i pretend to read. fifteen minutes, two upgrades, zero extra effort." (14–18s) patches off, one blink to camera, sip. (18–22s) end-card: "the gift in box 3 — or five referrals gets you the box early. get drop access."
- **On-screen text beats:** (0s) hook · (4s) "pour." · (6s) "patch." · (9s) "15:00" · (19s) "get drop access — shroomé"
- **Caption:** the intermission is the routine. gels cool + hydrate while the matcha does the drinking part. not sold separately — earned via referrals or every 3rd sub box. #grwm #matchalatte #eyepatches #matcha
- **CTA / destination:** `Sign up` → /lp/glow (`utm_content=SHR_MOF_GLW_SPK_04`)
- **Visual spec:** all REAL footage (patch application + consumption = real humans, real product — book this only after gel samples land; until then this ad is queued, not trafficked). Blush grade, vanity-kitchen crossover set per creative-direction glow world. `[RENDER: gels box]` may appear only as a shelf insert if the real box isn't printed yet.
- **Compliance:** cosmetic sensory language only ("cool," "hydrate"). No claims about the drink in this cut → **Disclaimer: N** (if a "supports skin health" line gets added in edit, flip to Y). Creator passes the pour test + claims quiz; no results promises, no timelines.

---

### SHR_MOF_GLW_IMG_02 — "the gift in box 3" (subscription tease static)
- **Format:** Meta static + stories, 4:5/9:16 — retargets glow + RIT LP visitors who scrolled ≥75% (high intent, non-signup) and waitlist non-subscribers
- **Hook (first line):** subscribers get their boxes reserved before every drop. box 3 comes with a secret.
- **Primary text:** every third delivery on the 24- and 48-sachet subscriptions includes our under-eye gels — the glow you drink, now the glow you wear. cooling, hydrating, not sold separately. subscriptions already skip the drop-day refresh (your allocation is reserved first); the gels are just us saying thanks for staying. drop 001 sold out. get drop access, then pick your cadence when 002 opens.
- **Headline:** box 3 has a plus-one.
- **Description:** gels every 3rd delivery, 24/48 tiers. never sold separately.
- **CTA / destination:** `Sign Up` → /lp/glow (`utm_content=SHR_MOF_GLW_IMG_02`)
- **Visual spec — generate:** three retail boxes in a row on a Firefly plate ("soft lavender #E8D5F0 gradient field, warm light sweep left to right, three gentle shadow pools, fine grain, 4:5, empty") — boxes 1 and 2 are REAL packshots; box 3 sits slightly open with the gels box (`[RENDER: gels box]`) peeking out, a Blush ribbon of light on it. Syne 700 Navy chips under each: "box 1" / "box 2" / "box 3 ✧". Instrument Serif italic headline across top: *the gift in box 3.*
- **Compliance:** perk mechanics must match Loop config (every 3rd, 24/48 only) before traffic. Cosmetic adjectives only. **Disclaimer: N.**

---

### SHR_MOF_GLW_SPK_05 — "GRWM, intermission included" (GRWM integration)
- **Format:** TikTok spark, 9:16, 28s — retargets skincare-interest pools + GLW LP bouncers; real creator
- **Hook (0–1.5s):** GRWM already mid-flow, patches ON, latte in hand, creator leans in: **"get ready with me, except the under-eyes and the matcha are from the same brand and nobody sold me either one."**
- **Script / shot timing:** (0–1.5s) hook, patches visible. (1.5–9s) GRWM continues around the patches — brows, balm, hair clip — the latte getting sips between steps. (9–16s) rewind bumper: "how we got here" — 3-beat flashback: pour + swirl (REAL master), patches out of the box, on. VO: "the sachet has 2 grams of collagen in it. the gels came free in my third box. the brand has a bit and the bit is consistency." (16–23s) patches off on the last step, gloss, done; charm on her keys as she grabs them (Easter-egg crossover, no line about it). (23–28s) end-card: "gels: every 3rd sub box, or five referrals. get drop access."
- **On-screen text beats:** (0s) hook · (10s) "the glow you drink →" · (13s) "→ now the glow you wear" · (25s) "get drop access — shroomé"
- **Caption:** grwm with a 15-minute cooling intermission. the gels aren't for sale — they show up in every third subscription box like a well-behaved plot twist. #grwm #skintok #eyepatches #matcha *2g collagen per sachet — collagen supports skin health. these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.*
- **CTA / destination:** `Sign up` → /lp/glow (`utm_content=SHR_MOF_GLW_SPK_05`)
- **Visual spec:** all REAL (creator, application, consumption). Requires: gel samples + a real or printed gels box + keychain sample for the Easter egg — this is the pack's "everything has landed" flagship; queue last. Blush/cream grade, no clinical white.
- **Compliance:** the caption's collagen line is a supplement claim → **Disclaimer: Y (caption)**. On-camera gel language stays sensory ("cooling"). "came free in my third box" must be literally true for the creator (seed her sub) — no fabricated experience.

---

### SHR_MOF_FCS_SPK_04 — "what these don't do" (ingredient honesty, deadpan)
- **Format:** TikTok spark, 9:16, 24s — retargets /lp/focus visitors + FCS engagers (the label-reader audience); works for GLW skeptics as a dupe test
- **Hook (0–1.5s):** the gels box on navy, label toward camera, deadpan VO: **"an under-eye gel ad with a list of things this gel will not do. lawyers, look away."**
- **Script / shot timing:** (0–1.5s) hook. (1.5–9s) the NOT list types on like a changelog, one line per beat: "will not erase wrinkles. will not 'de-puff' you medically. will not rebuild your collagen. will not replace sleep." (9–16s) turn: "here's what it does do, because it's a cosmetic and we read the rules: cools. hydrates. refreshes the look of tired under-eyes for about fifteen quiet minutes." Real patch-on-skin beat. (16–20s) "and the drink it matches prints every dose on the sachet. same brand, same policy: say less, mean all of it." Label macro (REAL sachet). (20–24s) end-card: "earned at five referrals. never oversold, never sold. get drop access."
- **On-screen text beats:** (0s) hook · (2–9s) the NOT list · (11s) "cools. hydrates. refreshes the look." · (21s) "get drop access — shroomé"
- **Caption:** honesty as a skincare step. the gels cool, hydrate, and refresh the look of tired under-eyes — that's the whole claim, on purpose. earned at 5 referrals or free over $66 on drop day. #ingredienthonesty #skintok #readthelabel #eyepatches
- **CTA / destination:** `Sign up` → /lp/focus (`utm_content=SHR_MOF_FCS_SPK_04`)
- **Visual spec — generate:** box-on-navy still from `[RENDER: gels box]` on Firefly plate: "deep navy #1B1F3B studio field, warm rim light, subtle grain, premium spec-sheet minimalism, 9:16, empty." NOT-list in monospaced-feel Syne, Lavender strikethrough stamps; the do-list gets Lime underline strokes. Patch-on-skin + sachet label macro = REAL.
- **Compliance:** the ad's engine is §0.4 itself — the NOT list must exactly mirror the banned list (legal reviews final cut). No drink claims → **Disclaimer: N.** ⚠️ blocked on INCI + `[PAIRS_OR_SINGLES]` before any "6 uses" variant.

---

### SHR_MOF_CLM_SPK_04 — "9:58am" (before-the-meeting POV)
- **Format:** TikTok spark + Meta reels, 9:16, 20s — retargets /lp/calm visitors + CLM engagers (corporate-girlie pool)
- **Hook (0–1.5s):** laptop clock reads 9:43, camera-off meeting tile visible, patches going on, text: **"pov: camera-on at 10. the under-eyes found out at 9:43."**
- **Script / shot timing:** (0–1.5s) hook, desk POV. (1.5–8s) quiet montage: patches on, the pour + swirl beside the keyboard (REAL master), inbox scrolled calmly. VO, dry: "fifteen minutes of cooling for the eyes, sixty milligrams of caffeine with l-theanine for the rest of me. supports sustained focus — the meeting will simply have to match my energy." (8–14s) 9:58 — patches off, one unhurried sip, camera-on click. Steady. (14–20s) end-card: "the gels ride along — every 3rd sub box, or five referrals. get drop access." + disclaimer.
- **On-screen text beats:** (0s) hook · (5s) "cool. hydrate. 15 min." · (9s) "caffeine + l-theanine — calm, steady energy" · (16s) "get drop access — shroomé"
- **Caption:** the 9:43 protocol: patches for the look of sleep, matcha for the feel of focus. ~60mg caffeine + l-theanine supports sustained focus and healthy energy levels. gels earned, never sold. *these statements have not been evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.* #corporatetok #wfh #eyepatches #matcha
- **CTA / destination:** `Sign up` → /lp/calm (`utm_content=SHR_MOF_CLM_SPK_04`)
- **Visual spec:** REAL desk, real person, real patches, real pour — calm-world grade (lavender lift, near-stillness, locked-off). Optional Firefly window plate per CLM_VID_03 spec. Gels box insert from `[RENDER: gels box]` until printed boxes exist.
- **Compliance:** drink claims "supports sustained focus / healthy energy levels" → **Disclaimer: Y.** Gel language cosmetic-sensory only; "the look of sleep" stays appearance-framed — never "fixes tired eyes," never sleep-outcome promises (calm segment banned-word sweep applies, incl. alt text).

---

# 3. AUDIENCE / PLACEMENT MATRIX

| Ad code | Item | Retargeting pool | Platform | Primary metric it moves | Secondary |
|---|---|---|---|---|---|
| SHR_MOF_RIT_SPK_04 | keychain | /lp/ritual visitors 30d non-signup + RIT engagers | TikTok | referral starts (/refer visits) | waitlist joins |
| SHR_MOF_ALL_SPK_01 | keychain | engaged social 180d (IG+TT), list excluded | TikTok + Meta reels | waitlist joins | shares/saves → pool growth |
| SHR_MOF_FCS_IMG_02 | keychain | /lp/focus visitors 30d non-signup | Meta | referral starts | waitlist joins |
| SHR_MOF_ALL_VID_07 | keychain | **waitlist non-SMS** (Klaviyo sync; SMS excluded) | Meta + TikTok | **SMS opt-in rate** | — |
| SHR_MOF_ALL_SPK_02 | keychain | engaged social — commenters/sharers 180d | TikTok (organic-first, spark winner) | engagement → retarget-pool growth | waitlist joins |
| SHR_MOF_RIT_VID_04 | keychain | RIT+GLW 25% viewers + waitlist openers non-SMS | Meta reels + TikTok | waitlist joins / SMS opt-in | brand search lift |
| SHR_MOF_GLW_VID_03 | gels | /lp/glow visitors 30d non-signup + GLW viewers | Meta | waitlist joins | sub intent (LP widget clicks) |
| SHR_MOF_GLW_SPK_04 | gels | GLW engagers 180d | TikTok | referral starts | waitlist joins |
| SHR_MOF_GLW_IMG_02 | gels | glow+RIT LP 75%-scroll non-signup + waitlist non-sub | Meta + stories | **sub intent** (plan-picker engagement at open) | waitlist joins |
| SHR_MOF_GLW_SPK_05 | gels | skincare interest pools + GLW LP bouncers | TikTok | waitlist joins | sub intent |
| SHR_MOF_FCS_SPK_04 | gels | /lp/focus visitors + FCS engagers | TikTok | waitlist joins (trust unlock) | referral starts |
| SHR_MOF_CLM_SPK_04 | gels | /lp/calm visitors + CLM engagers | TikTok + Meta reels | waitlist joins | SMS opt-in |

Flight logic: keychain cuts that need real tactile beats (ALL_VID_07 palm-drop, RIT_SPK_04 wear shots) run render-only 15s versions until the 1,000pc test run lands, then re-cut (Friday re-shoot rule). Gel creator cuts (GLW_SPK_04/05) queue behind gel samples. Kill/scale rules, day-3/day-7 gates, and the pre-flight checklist inherit unchanged from library v1 — add one checklist line: **"[RENDER] slots filled from Bolden files or beat cut; no invented product detail."**

---

# 4. RENDER PRODUCTION WORKFLOW — Bolden art → hyperreal ad assets

How the factory render/art files (once in Drive → mirrored to `Assets/Promo/`) become traffic-ready stills and motion. All outputs `-aigen` tagged except untouched `-bolden` masters.

## 4.1 Intake & prep
1. Pull Bolden files from Drive → `Assets/Promo/` as `kch-hero-bolden.*`, `kch-colorway-[name]-bolden.*`, `kch-polybag-bolden.*`, `eyg-box-bolden.*`, `eyg-patch-bolden.*`. These fill every `[RENDER: …]` slot above.
2. **Cutouts:** `image_remove_background` (Adobe/Photoshop) on each render → clean alpha PNGs. Check edges at 400% — PVC gloss rims and the tag chain are where mattes fail; hand-refine, never generative-fill across the product.
3. **Wordmark check:** if the tag/box type is soft in the render, replace with the vector wordmark from brand files. Rendered-then-regenerated type is how hallucinated labels happen (ai-toolstack rule 2 logic applies to promo items too).

## 4.2 Stills pipeline (Firefly + Photoshop)
1. Generate the scene plate ONLY (prompts per ad above) — warm light, brand hexes, empty composition space. Never prompt the product into the plate.
2. Composite the cutout at true scale (charm = 45×40mm — always place a scale anchor in the plate: keys, a thumb, the sachet).
3. **Relight to match the plate:** `image_adjust_color_temperature` (warm — the warmth check is non-negotiable), `image_adjust_highlights` / `image_adjust_light_portions` to sit the PVC speculars into the key light, `image_adjust_exposure` on the shadow pool. Paint a soft contact shadow; gloss kicks on the molded color edges sell "real object."
4. **Platform crops:** `image_generative_expand` to build 4:5 / 1:1 / 9:16 from the master — **mask the product and any type first; expansion touches background only.**
5. Finish: `image_add_grain` (fine, per creative-direction), watermark, end-card assembly in the CapCut/Premiere templates.

## 4.3 Motion pipeline (Runway Gen-4 / Veo 3, image-to-video)
- **Parallax macro push:** feed the finished composite still; prompt camera-only motion ("slow push-in, shallow parallax, nothing in the scene deforms"). 2–4s beats for RIT_SPK_04, RIT_VID_04 holds.
- **Turntable:** single-object orbit on the cutout-on-plate frame ("slow 180° orbit, object static, specular highlights sweeping") for ALL_SPK_01's hero beat and any spec-reveal moment. If the model warps the charm's silhouette, drop to a 15° wiggle-loop — a small true move beats a big melted one.
- **Stop-motion:** don't interpolate — assemble colorway stills at ~12fps in CapCut for ALL_SPK_01; the handmade stutter is the aesthetic and it can't hallucinate.
- Keep generated motion to backgrounds/camera. Hands, unboxing, wear, patch application, sips: real footage only, shot when samples land.

## 4.4 Rules carried over (non-negotiable)
1. **The sachet, the label, and the swirl are NEVER AI-generated** — every drink moment in this pack is the real master footage / real packshots, exactly as in library v1.
2. Bolden renders are manufacturer art, not AI packshots — but AI may not *add* product detail beyond the production facts; if a beat needs a detail the render doesn't show, the answer is "wait for the sample," never "generate it."
3. **Real samples replace renders on arrival** — test-run keychains and gel samples trigger re-shoots of every tactile beat (Friday kill/scale review owns the queue).
4. Gels on skin = real humans, real product (consumption-adjacent rule). Rendered patches never touch rendered or real faces.
5. No founder cloning, no fabricated testimonials, no invented colorways/counts — honesty rule governs the sheep exactly as it governs the drops.
