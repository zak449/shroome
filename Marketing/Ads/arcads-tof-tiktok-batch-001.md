# shroomé — arcads TOF tiktok batch 001

> Date: 2026-07-30 · Owner: Performance Creative Lead
> Purpose: the Monday "hook-copy batch → Arcads variant generation" step of the standing weekly
> pipeline (`../Creative/ai-toolstack.md` §pipeline). Top-of-funnel only. Every script below is
> written to be pasted into Arcads as-is: one **body** per segment, four **swappable hooks** per
> body (we test hooks, not whole videos — kill rule: hook rate < 20% at 1,000 impressions kills
> the hook, keeps the body).
> Sources of truth: `ad-creative-library-v1.md` (architecture, naming, kill/scale),
> `../Creative/ai-toolstack.md` §4 (Arcads rules), `../messaging-dna.md` (voice canon, v1
> 2026-07-25 — supersedes older ad phrasing), `app/lib/drop-config.ts` (real numbers).
>
> **Real numbers in this batch (from drop-config, verified 2026-07-30):** the first run was
> **500 boxes** and **poured out in 9 days**. Drop 002 count and date are **null** — so no
> script or caption below states a next-run count or date, ever. The compliant line is:
> "the next run is coming. no date yet. you hear it first."

---

## 0. Non-negotiables for every Arcads variant (from ai-toolstack §4 + NOT list)

1. **AI actors deliver premises, questions, and product facts only.** Never "I tried it,"
   never "since I switched," never a taste/feeling report, never a testimonial. If a line
   implies the actor personally used the product, cut it.
2. **The actor never drinks, pours, or holds the product on camera.** Consumption and pours
   are real-footage-only (NOT list rules 3 & 7). Arcads output is the talking-head layer;
   the tear / pour / master swirl / label macro get cut in during CapCut assembly.
3. **Disclosure:** TikTok AI-generated-content toggle ON for every upload. File names tagged
   `-aigen`. Spark via brand handle.
4. **Claims:** only approved structure/function language ("supports sustained focus,"
   "supports skin health," "supports immune function," "supports healthy energy levels").
   Any claim anywhere in the cut or caption → FDA disclaimer in caption AND end-card variant.
5. **Calm-segment banned words** (script, caption, alt text, comments): anxiety/anxious,
   withdrawal, addiction, cure, treat, sleep outcomes, timelines, drug names.
6. **Voice canon (messaging-dna):** lowercase copy, short sentences, no em-dashes, sold out =
   "poured out," "the first run / the next run" (never "drop 001/002" in customer-facing copy),
   "you hear it first" verbatim for the access promise, SHROOME30 "replaces your 20% code.
   best code wins." The word "stack" never appears in offer copy.
7. **Honesty rule:** the only numbers allowed are 500 boxes / 9 days (real) and "~60mg caffeine,
   2.5g matcha, 2g collagen, 200mg lion's mane, ≥70% beta-glucans" (label facts). No next-run
   counts, no dates, no invented urgency.
8. **Pre-traffic:** the ~$3 / $8 price references in the pour segment must be re-verified against
   live ops pricing before spend.

---

## 1. How to run this batch in Arcads (account-side steps)

1. Create one Arcads project per segment, named by segment code (`RIT`, `GLW`, `CLM`, `FCS`, `PUR`).
2. For each segment: paste the **body script**, then generate 4 variants by swapping in hooks
   H1–H4 as the opening line. Ad codes below map one code per hook.
3. Cast **2 actors per segment** from the Arcads library per the casting notes (2 actors × 4 hooks
   = 8 raw variants per segment, in line with the 10–20/segment/week target once b-roll cuts land).
4. Output: 9:16 vertical, 20–30s pacing, natural delivery (not announcer).
5. Export raws named `SHR_TOF_[SEG]_SPK_[hook#]-aigen-[actor].mp4` → CapCut brand template for
   that segment: Syne captions, watermark, real b-roll inserts (master swirl ≥1.5s, clockwise,
   never sped past 2×), shared end-card with live drop-status line from config.
6. Thursday compliance pass (claims audit, disclaimer check, AI-disclosure toggle) → traffic as
   spark ads. UTM: `utm_source=tiktok&utm_medium=paid&utm_campaign=lp-{slug}&utm_content={ad_code}`.
7. Friday: kill/scale. Winning hooks are queued for real-creator re-shoots (archetypes,
   `ad-creative-library-v1.md` §4) — AI proves the hook, real product re-earns it.

**Casting notes (Arcads actor selection):**
- `RIT` — 21–28, feminine, extremely online, bright conspiratorial energy; warm interior set.
- `GLW` — skincare-shelf energy, polished but personable; vanity/bathroom-adjacent set, warm light.
- `CLM` — office-coded, unhurried, deadpan calm; tidy desk set, no clinical white.
- `FCS` — precise skeptic, spreadsheet energy, dry delivery; neutral/dark set (Navy world).
- `PUR` — mom-coded, warm and wry, mid-motion energy; kitchen/entryway set.

---

## 2. SEGMENT RIT — the matcha maximalists → /lp/ritual

**Body script (actor speaks after hook, ~20s):**
"ceremonial grade matcha, already liquid. you tear a one ounce sachet, pour it into your milk,
and the swirl does the whole performance. no whisk, no powder, no technique. the first run was
500 boxes and it poured out in 9 days. the next run is coming, no date yet. join drop access
and you hear it first. the text list gets the link 10 minutes early."

**Hooks (first 1.5s, actor to camera + matching on-screen text):**
| Ad code | Hook |
|---|---|
| `SHR_TOF_RIT_SPK_04` | "the matcha girlies were right about everything except the whisk." |
| `SHR_TOF_RIT_SPK_05` | "someone finally made ceremonial matcha you pour like creamer." |
| `SHR_TOF_RIT_SPK_06` | "this is the prettiest thing you can legally do to a glass of milk." |
| `SHR_TOF_RIT_SPK_07` | "500 boxes. 9 days. and you can't buy one today." |

- **On-screen text beats (assembly):** (0s) hook · (8s) "no whisk. no powder." · (14s) "the first
  run poured out in 9 days" · (18s) "get drop access. shroomé"
- **B-roll inserts (real only):** the tear macro, the master swirl (≥2s, this segment's emotional
  peak), sachet flat-lay. Actor never touches product.
- **Caption:** the whisk was the only hard part, so we removed it. the first run poured out in
  9 days. drop access is free and you hear it first. #matchatok #matcha #icedmatcha #matchalatte
- **CTA / destination:** `Sign up` → /lp/ritual (`utm_content={ad_code}`)
- **Compliance:** taste/aesthetic/convenience only, no claims. **Disclaimer: N.**

---

## 3. SEGMENT GLW — the glow getters → /lp/glow

**Body script (~22s):**
"here's the problem with collagen powder: the scoop. the shaker, the clumps, the tub you abandon
by february. shroomé folds 2 grams of grass fed hydrolyzed collagen peptides into a ceremonial
matcha latte you'd order anyway. collagen supports skin health, and the whole step takes fifteen
seconds. every dose is printed on the sachet. the first run poured out in 9 days. join drop
access and you hear about the next run first."

**Hooks:**
| Ad code | Hook |
|---|---|
| `SHR_TOF_GLW_SPK_04` | "collagen powder girlies, we need to talk about the scoop." |
| `SHR_TOF_GLW_SPK_05` | "what if the most consistent step in your routine was a latte?" |
| `SHR_TOF_GLW_SPK_06` | "beauty from a sachet sounds fake until you read the label." |
| `SHR_TOF_GLW_SPK_07` | "your collagen didn't quit on you. the scoop did." |

- **On-screen text beats:** (0s) hook · (8s) "2g grass-fed collagen. every sachet" · (13s)
  "supports skin health*" · (19s) "*see caption · get drop access"
- **B-roll inserts (real only):** REAL label macro on the 2g line, master swirl blush-graded,
  strawberry sachet still. No AI vanity plates near the label.
- **Caption:** the step you actually remember to take. 2g grass fed collagen peptides in every
  sachet, printed on the label. collagen supports skin health. the first run poured out in 9 days
  and drop access hears about the next one first. *these statements have not been evaluated by
  the fda. this product is not intended to diagnose, treat, cure, or prevent any disease.*
  #skintok #collagenlatte #grwm #matcha
- **CTA / destination:** `Sign up` → /lp/glow (`utm_content={ad_code}`)
- **Compliance:** claim: "supports skin health." No before/after, no timelines, no "anti-aging."
  **Disclaimer: Y (caption + end-card).**

---

## 4. SEGMENT CLM — the coffee breakup → /lp/calm

**Body script (~24s) — banned-word swept:**
"coffee's caffeine spikes and then drops you at 2pm. matcha's caffeine, about 60 milligrams a
sachet, arrives with naturally occurring l-theanine, so the curve is smoother. it supports
sustained focus and healthy energy levels through the part of the day meetings are made of.
shroomé is that curve as a ceremonial matcha latte you pour in fifteen seconds. the first run
poured out in 9 days. join drop access and you hear about the next run first."

**Hooks:**
| Ad code | Hook |
|---|---|
| `SHR_TOF_CLM_SPK_04` | "coffee spikes. matcha carries. that's the whole video." |
| `SHR_TOF_CLM_SPK_05` | "the 2pm cliff is a curve problem, not a you problem." |
| `SHR_TOF_CLM_SPK_06` | "here's the difference between caffeine that arrives alone and caffeine that arrives with l-theanine." |
| `SHR_TOF_CLM_SPK_07` | "nobody breaks up with caffeine. people break up with the crash." |

- **On-screen text beats:** (0s) hook · (9s) "~60mg caffeine + l-theanine" · (14s) "supports
  sustained focus*" · (20s) "*see caption · get drop access"
- **B-roll inserts (real only):** napkin-curve graphic (with mandatory "illustrative of typical
  caffeine + l-theanine absorption character, not a measured clinical result" caption), warm-milk
  swirl, steam-off-mug hold. Actor delivers the education; a real human owns any desk/sip moment.
- **Caption:** the crash is a curve, and curves are optional. ~60mg caffeine plus naturally
  occurring l-theanine supports sustained focus and healthy energy levels. the first run poured
  out in 9 days. drop access hears about the next run first. *these statements have not been
  evaluated by the fda. this product is not intended to diagnose, treat, cure, or prevent any
  disease.* #matcha #focustok #corporatetok #ltheanine
- **CTA / destination:** `Sign up` → /lp/calm (`utm_content={ad_code}`)
- **Compliance:** claims: "supports sustained focus," "supports healthy energy levels." Highest-risk
  segment: run the banned-word sweep on script, captions, and alt text before traffic. The AI actor
  states facts about curves and the product, never a personal switch story (that lane is
  real-creators-only, archetype "the honest switcher"). **Disclaimer: Y.**

---

## 5. SEGMENT FCS — the deep workers → /lp/focus

**Body script (~26s):**
"three numbers to check before you buy any mushroom product. one: beta glucan percentage. ours
is 70 percent or more, third party tested. typical products land between 15 and 30, when they
print it at all. two: fruiting body or mycelium. mycelium grown on grain means you're mostly
drinking the grain. ours is 200 milligrams of lion's mane fruiting body, hot water extracted.
three: the dose, printed on the sachet next to everything else. beta glucans support immune
function. if a brand won't print the number, that is the number."

**Hooks:**
| Ad code | Hook |
|---|---|
| `SHR_TOF_FCS_SPK_04` | "your mushroom latte is probably mostly rice." |
| `SHR_TOF_FCS_SPK_05` | "the three numbers to check before you buy any mushroom product. most brands print zero of them." |
| `SHR_TOF_FCS_SPK_06` | "we'd rather show you the label than the ad. so here's both." |
| `SHR_TOF_FCS_SPK_07` | "if a supplement brand won't print the percentage, ask why." |

- **On-screen text beats:** (0s) hook · (6s) "≥70% beta-glucans. third-party tested" · (13s)
  "fruiting body, not grain" · (18s) "200mg. printed." · (23s) "get drop access. shroomé"
- **B-roll inserts (real only):** REAL label macro with Lime underline animating on ≥70%, the
  jar demo (generic category demo, never presented as our product), one desk swirl beat. COA
  imagery only if real documents are on hand (NOT list rule 6).
- **Caption:** the mushroom industry has a rice problem. ours is lion's mane fruiting body at
  ≥70% beta glucans, third party tested, every dose printed. beta glucans support immune
  function. *these statements have not been evaluated by the fda. this product is not intended
  to diagnose, treat, cure, or prevent any disease.* #lionsmane #betaglucans #readthelabel
  #supplementtok
- **CTA / destination:** `Sign up` → /lp/focus (`utm_content={ad_code}`)
- **Compliance:** claims: "supports immune function" (+ approved comparative on the 15–30% range,
  no competitor names). Never memory/brain-boost/cognitive language. **Disclaimer: Y.**

---

## 6. SEGMENT PUR — the fifteen-second crowd → /lp/pour

**Body script (~22s):**
"a café matcha latte is fifteen minutes of your morning and about 8 dollars. this is the same
drink in fifteen seconds. tear a one ounce sachet, pour it into any milk, one swirl, out the
door. 2.5 grams of ceremonial matcha, more than most cafés whisk into the order, for about
3 dollars a pour. it lives in a bag, a desk drawer, a carry on. the first run poured out in
9 days. get drop access and the link comes to you first."

**Hooks:**
| Ad code | Hook |
|---|---|
| `SHR_TOF_PUR_SPK_04` | "the café line was the only ingredient we removed." |
| `SHR_TOF_PUR_SPK_05` | "this matcha latte takes less time than your toaster." |
| `SHR_TOF_PUR_SPK_06` | "your latte order has a fifteen second version now." |
| `SHR_TOF_PUR_SPK_07` | "one hand. fifteen seconds. any milk that exists." |

- **On-screen text beats:** (0s) hook · (7s) "15 seconds. no whisk. no line" · (13s) "2.5g
  ceremonial matcha, ~$3 a pour" · (19s) "get drop access. shroomé"
- **B-roll inserts (real only):** the one-take tear-pour-swirl-lid sequence, pocket/bag slide,
  to-go cup beat. This segment watches muted: captions extra large, Navy at poster scale.
- **Caption:** same latte energy, fourteen minutes back. the first run poured out in 9 days.
  drop access is free, the text list gets every link 10 minutes early, and SHROOME30 replaces
  your 20% code. best code wins. #momtok #matcha #realtime #matchalatte
- **CTA / destination:** `Sign up` → /lp/pour (`utm_content={ad_code}`)
- **Compliance:** speed/taste/convenience only, no claims. **Verify $8 / ~$3 against live ops
  pricing before traffic.** Never pregnancy/nursing statements, never kid-directed framing.
  **Disclaimer: N.**

---

## 7. Launch order + budget (hook-test flight)

Run all 5 segments simultaneously if budget allows; if staging, follow the proven library order:

| Priority | Segment | Why first |
|---|---|---|
| 1 | RIT | largest audience, cheapest CPMs, claim-free (fastest compliance pass) |
| 2 | FCS | "mostly rice" is the highest-shareability concept owned |
| 3 | CLM | biggest switching audience, highest-emotion premise |
| 4 | PUR | strongest muted-viewing format, near-claim-free |
| 5 | GLW | biggest AOV segment, but heaviest disclaimer overhead |

- One ad set per segment (ABO, clean per-segment reads). Suggested test spend per the library:
  $250–300/day minimum across the flight for 7-day signal.
- Day 3 creative gate (hook rate / CTR / CPC), day 7 economics gate (CPL / LP conversion /
  SMS opt-in), kill and scale per `ad-creative-library-v1.md` §1.4.
- Every winning hook goes to a real-creator re-shoot within 7 days. The Arcads cut proves the
  hook; the real pour re-earns it.

---

## 8. Open items before traffic

- [ ] Verify ~$3 per-pour and $8 café reference against live ops pricing (PUR + any price copy)
- [ ] Confirm end-card template line: creative-direction still specifies "pour / swirl / glow";
      messaging-dna v1 (07-25) canonizes "Pour. Swirl. Go." once-exactly. Brand call needed;
      scripts above avoid the tagline entirely so either template works.
- [ ] TikTok AI-generated-content toggle ON per upload; `-aigen` in every raw filename
- [ ] Claims + banned-word audit (CLM especially) on final assembled cuts, including alt text
- [ ] Real b-roll inserts sourced from the master swirl + real sachet photography only
