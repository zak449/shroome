# Ghost LP Brief — /lp/ritual (the ritual girlies)

> Segment: aesthetic wellness / matcha ritual girlies · See `../segment-strategy.md` §1
> Status: ready to build — all copy below is FINAL, implement verbatim
> Conversion goal: waitlist email signup (single CTA, repeated 3x down-page)
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

- **OG title:** `shroomé — the prettiest 15 seconds of your morning`
- **OG description:** `ready-to-pour ceremonial matcha latte. no whisk, no powder — just pour, swirl, glow. first run sold out. join the waitlist for the next pour.`
- **OG image:** the swirl mid-bloom in a glass of oat milk, warm morning light, sachet leaning against the glass (real product photography only)

---

## 1. Hero

**Headline (H1, Instrument Serif italic):**
> ceremonial matcha, minus the ceremony.

**Subheadline (Syne 400, max 420px wide):**
> the world's first ready-to-pour ceremonial matcha latte. tear the sachet, pour into your milk, watch it swirl. fifteen seconds to the drink you've been saving on your fyp.

**Eyebrow (Syne 700, uppercase, letter-spaced):** POUR / SWIRL / GLOW

**Hero visual direction:** Full-bleed dreamy gradient (Soft Lavender → Blush) with soft cloud texture at 30–40% opacity. Right side: real photograph of dark green concentrate mid-pour into a tall glass of oat milk, the plume swirling — shot through the glass, backlit, starburst glow. Vanilla sachet propped at base of glass, label legible. NO whisks, NO powder, NO bamboo. Motion version: 3-second seamless loop of the swirl.

**Hero CTA button (Lime, Navy text):** `join the waitlist`
**Under-button microcopy (Syne 400, 13px):** first run sold out. next pour drops soon.

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

Header (H2): *the first run is already gone.*
Body copy:
> we made a first production run. the waitlist drank it before it ever hit the site. no paid reviews to show you yet — just a sold-out shelf and a growing list of people waiting on the next pour.

Proof elements (do not fabricate):
- Live waitlist counter pulled from the same source as drinkshroome.com homepage (style: "**[live count]** people on the waitlist")
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
a: our first run sold out. the waitlist gets first access (plus 20% off and free shipping) when the next pour drops. that's the honest answer — join and you're at the front.

---

## 6. Final CTA section (Navy #1B1F3B background, Cream text)

Header (H2, Cream, Instrument Serif italic): *the next pour is coming.*
Body (Cream, 70% opacity): first run sold out. join the waitlist and you're first in line — 20% off and free shipping locked in when we're back.
CTA button (Lime, Navy text): `join the waitlist`
Microcopy under field: no spam, ever. two emails a week, max — and only when we have something worth saying.

---

## 7. Footer disclaimer (every LP, verbatim, legible — 12px minimum, Navy 60% on Cream)

> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.

Plus standard footer: © 2026 shroomé · ZSQUARED INC · privacy · terms · contact

---

## Build notes for engineering

- Single conversion event: waitlist signup → `/api/waitlist` (same endpoint as homepage), append `utm_campaign=lp-ritual`
- CTA appears exactly 3 times: hero, post-FAQ, final section. No nav, no exit links except footer legal — this is a ghost page
- Swirl loop video ≤ 2MB, autoplay muted, `prefers-reduced-motion` fallback to still
- Mobile-first; hero type clamps per brand type scale
