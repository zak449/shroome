# Ghost LP Brief — /lp/ritual (the matcha maximalists)

> SEGMENT RENAMED 2026-07-14: "the ritual girlies" → **"the matcha maximalists"** ("ritual" is banned brand-wide — the earthy competition owns it). The `/lp/ritual` URL slug is deployed and referenced by live ads/UTMs, so the SLUG STAYS; only the segment name and page copy change.
> Segment: aesthetic wellness / the matcha maximalists · See `../segment-strategy.md` §1
> Status: ready to build — all copy below is FINAL, implement verbatim
> Conversion goal: drop-access signup (email → optional SMS early access). Single CTA, repeated 3x down-page. DROP MODEL: product ships in numbered, limited drops — see drop status module below.
> HONESTY RULE (one line, non-negotiable): every scarcity statement on this page must be literally true — drop 001 genuinely sold out, drop sizes are real production run counts, countdowns run to real dates only.
> Fonts per brand system: H1/H2 Instrument Serif 400 *italic*, everything else Syne. Background Cream #FDF4EE unless noted. All display copy lowercase.

---

## Accent color plan (this page)

- **Page base:** Cream #FDF4EE, Navy #1B1F3B text
- **Hero wash:** Dreamy gradient — Soft Lavender #E8D5F0 → Blush #FFE0EC with cloud imagery (per image-guidelines)
- **Section accents:** Pink #FFB7D1 for flavor moments, Lavender #D4B8E0 for the ingredient strip
- **CTA (all instances):** Lime #C8FF3A button, Navy text — never place Lime adjacent to Pink blocks (anti-pattern); buffer with Cream
- Max two accents per section, per brand rules

---

## OG / ad click-through metadata

- **OG title:** `shroomé — drop 002 is coming. the prettiest 15 seconds of your morning`
- **OG description:** `ready-to-pour ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. drop 001 sold out. get access to drop 002 before it goes.`
- **OG image:** the swirl mid-bloom in a glass of oat milk, warm morning light, sachet leaning against the glass (real product photography only)

---

## 1. Hero

**Headline (H1, Instrument Serif italic):**
> ceremonial-grade matcha, minus the ceremony.

*(voice note: "ceremonial" is sanctioned here strictly as the matcha quality spec — it describes the leaf, never the mood.)*

**Subheadline (Syne 400, max 420px wide):**
> the world's first ready-to-pour ceremonial matcha latte. tear the sachet, pour into your milk, watch it swirl. fifteen seconds to the drink you've been saving on your fyp.

**Eyebrow (Syne 700, uppercase, letter-spaced):** POUR / SWIRL / GLOW

**Hero visual direction:** Full-bleed dreamy gradient (Soft Lavender → Blush) with soft cloud texture at 30–40% opacity. Right side: real photograph of dark green concentrate mid-pour into a tall glass of oat milk, the plume swirling — shot through the glass, backlit, starburst glow. Vanilla sachet propped at base of glass, label legible. NO whisks, NO powder, NO bamboo. Motion version: 3-second seamless loop of the swirl.

**Hero CTA button (Lime, Navy text):** `get drop access`
**Under-button microcopy (Syne 400, 13px):** drop 001 sold out. drop 002 is a limited run.

---

## 1b. Drop status module (sits directly under the hero CTA — this page's urgency engine)

Two-row "drop ledger," Syne 700, Navy strip cards on the hero gradient:

> **drop 001** — sold out ~~[X₁] boxes~~ *(struck through; "sold out" stamped in Pink #FFB7D1)*
> **drop 002** — [date window from ops] · limited run of **[X₂] boxes** *(pulsing Lime dot, live state)*

- **Countdown spec:** once ops confirms the drop 002 date, render a live countdown (`dd : hh : mm`, Syne 700 tabular numerals, Navy on Cream chip). Before the date is confirmed, render instead: *"next drop: soon. the access list gets the date first."* Never run a timer to a fake or movable date.
- **Quantity spec:** [X₁]/[X₂] must be the actual production run counts from ops — pull from a config value, not hardcoded copy. If we wouldn't publish the number in an investor update, we don't publish it here.
- **SMS early-access step:** after email submit, step 2 offers phone: *"the text list gets the drop link 10 minutes before everyone else — plus an extra 10% off."* Skippable in one tap; email-only members still get drop access at public open.

---

## 2. Benefit blocks (3-up on desktop, stacked mobile; Cream cards on Blush section background)

**Block 1 — title:** *the swirl is the whole show*
**Body:** dark green concentrate hits your milk and blooms into ribbons before settling into a perfect sage latte. it's the moment every matcha video is chasing — and now it's the entire recipe.

**Block 2 — title:** *café-order taste, sink stays clean*
**Body:** 2.5g of first-harvest, shade-grown ceremonial matcha in every sachet — smooth and naturally sweet, never bitter or grassy. no whisk to rinse, no powder on the counter, no skill required.

**Block 3 — title:** *pretty on the outside, honest on the inside*
**Body:** every dose is printed right on the sachet — ceremonial matcha, grass-fed collagen, lion's mane extract. the aesthetic is the invitation; the label is the reason you stay.

---

## 3. Ingredient / science strip (Lavender #D4B8E0 band, Navy text, 4 stat tiles)

Strip header (H2, Instrument Serif italic): *what's in the pour*

| Stat | Label |
|---|---|
| 2.5g | ceremonial matcha — first harvest, shade-grown |
| 2g | grass-fed collagen peptides |
| 200mg | lion's mane extract, ≥70% beta-glucans |
| ~60mg | caffeine, with matcha's natural l-theanine |

Strip footnote (13px): no added sugar. no artificial sweeteners. no proprietary blends. two flavors: vanilla & strawberry.

---

## 4. Social proof section (Cream background)

Header (H2): *drop 001 is already gone.*
Body copy:
> we made [X₁] boxes. the access list drank them before drop 001 ever hit the site. no paid reviews to show you yet — just a sold-out ledger and a line forming for drop 002.

Proof elements (do not fabricate):
- Live access-list counter pulled from the same source as drinkshroome.com homepage (style: "**[live count]** people holding drop access")
- Ingredient stat badges as proof-of-substance: "third-party tested for beta-glucan content" · "heavy-metals tested" · "made in a GMP-certified facility"
- NO testimonials, NO star ratings, NO "as seen in" (no verified press placements at this time — if a real placement lands, add logo here and nowhere else)

---

## 5. FAQ (accordion, 4 items)

**q: is it actually ceremonial grade?**
a: yes — first-harvest (ichiban-cha), shade-grown a minimum of 21 days. that's why it's smooth and naturally sweet instead of bitter. it's the grade cafés wish they used.

**q: how do i make it?**
a: tear the sachet, pour the 1oz concentrate into 6–8oz of your milk of choice (oat is our house pick), give it one swirl. iced or hot. that's it — no whisk, no frother, no blender.

**q: what does it taste like?**
a: vanilla is warm and floral — like your favorite oat latte grew up. strawberry is bright and fresh — matcha's summer self. both finish clean, zero chalkiness.

**q: when can i actually buy it?**
a: drop 001 sold out. drop 002 is a limited run of [X₂] boxes — drop access members get the link first, and the text list gets it 10 minutes before everyone. that's the honest answer: real runs, real dates, no fake timers.

---

## 6. Final CTA section (Navy #1B1F3B background, Cream text)

Header (H2, Cream, Instrument Serif italic): *drop 002 won't wait around.*
Body (Cream, 70% opacity): drop 001 sold out. drop 002 is a limited run — get access now, and add your number if you want the link 10 minutes early (plus an extra 10% off). 20% off and free shipping are locked in either way.
CTA button (Lime, Navy text): `get drop access`
Microcopy under field: no spam, ever. we text once per drop. that's the whole relationship.

---

## 7. Footer disclaimer (every LP, verbatim, legible — 12px minimum, Navy 60% on Cream)

> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.

Plus standard footer: © 2026 shroomé · ZSQUARED INC · privacy · terms · contact

---

## Build notes for engineering

- Single conversion event: drop-access signup → `/api/waitlist` (same endpoint as homepage; email step, then optional phone step for SMS early access), append `utm_campaign=lp-ritual`
- CTA appears exactly 3 times: hero, post-FAQ, final section. No nav, no exit links except footer legal — this is a ghost page built for impulse: one decision, zero browsing detours
- Drop numbers [X₁]/[X₂] and drop 002 date come from a shared config (ops-owned) — never hardcode; honesty rule applies
- SMS opt-in requires TCPA-compliant consent language at the phone field ("msg & data rates may apply, reply STOP to opt out") — one text per drop, that's the promise
- Swirl loop video ≤ 2MB, autoplay muted, `prefers-reduced-motion` fallback to still
- Mobile-first; hero type clamps per brand type scale
