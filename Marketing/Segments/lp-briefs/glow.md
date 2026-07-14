# Ghost LP Brief — /lp/glow (the glow getters)

> Segment: collagen-glow beauty seekers · See `../segment-strategy.md` §2
> Status: ready to build — all copy below is FINAL, implement verbatim
> Conversion goal: waitlist email signup (single CTA, repeated 3x down-page)
> Fonts: H1/H2 Instrument Serif 400 *italic*, everything else Syne. All display copy lowercase.
> COMPLIANCE: this page carries structure/function claims ("supports skin health," "supports gut health," "antioxidant support") — FDA disclaimer is mandatory in footer AND echoed as small text directly beneath the benefit blocks.

---

## Accent color plan (this page)

- **Page base:** Cream #FDF4EE, Navy #1B1F3B text
- **Hero wash:** Blush #FFE0EC background (the beauty tint) with soft cloud texture; Pink #FFB7D1 for the strawberry flavor callout
- **Ingredient strip:** Soft Lavender #E8D5F0 band (the "whisper" version — keeps the science feeling gentle)
- **CTA (all instances):** Lime #C8FF3A button, Navy text. Keep CTAs on Cream or Navy zones, never directly on Pink (anti-pattern: Pink + Lime vibrate)

---

## OG / ad click-through metadata

- **OG title:** `shroomé — your matcha latte is now a beauty step`
- **OG description:** `2g grass-fed collagen + ceremonial matcha in one ready-to-pour sachet. supports skin health. tastes like a treat. first run sold out — join the waitlist.`
- **OG image:** sachet on a vanity/marble surface beside a glass of pale-pink strawberry matcha latte, morning window light, one skincare bottle blurred in background (real photography only)

---

## 1. Hero

**Headline (H1, Instrument Serif italic):**
> the beauty step you drink.

**Subheadline (Syne 400):**
> 2g of grass-fed collagen peptides folded into a ceremonial matcha latte you'll actually crave. skin-health support that doesn't taste like a supplement — because it isn't one more scoop, shake, or chore.

**Eyebrow (Syne 700, uppercase):** COLLAGEN + CEREMONIAL MATCHA + LION'S MANE

**Hero visual direction:** Blush background, soft starburst glow behind product. Real photograph: strawberry sachet leaning against a glass of blush-pink-topped iced matcha latte on warm stone. Styling nods to a beauty shelf — one architectural skincare bottle out of focus, no brand visible. Light is creamy, never clinical. NO powder, NO whisk, no lab imagery.

**Hero CTA button (Lime, Navy text):** `join the waitlist`
**Under-button microcopy:** first run sold out. next pour drops soon.

---

## 2. Benefit blocks (3-up; Cream cards on Blush section)

**Block 1 — title:** *skin support, disguised as a latte*
**Body:** every sachet carries 2g of grass-fed, hydrolyzed collagen peptides — types I and III, the ones that support skin health and gut health. it dissolves completely into the pour, so the only texture you notice is creamy.

**Block 2 — title:** *the antioxidant part is the matcha*
**Body:** 2.5g of first-harvest ceremonial matcha provides antioxidant support with every glass — catechins and EGCG come standard, not as an add-on. your morning drink was always going to happen; now it's pulling double duty.

**Block 3 — title:** *the routine you'll actually keep*
**Body:** collagen only works if you take it, and scoops get skipped. this is a fifteen-second pour that tastes like vanilla or strawberry — consistency stops being discipline and starts being the best part of your morning.

**Small text directly under blocks (12px, Navy 60%):** These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.

---

## 3. Ingredient / science strip (Soft Lavender #E8D5F0 band, Navy text)

Strip header (H2): *read it like an ingredient list — because it is one*

| Stat | Label |
|---|---|
| 2g | grass-fed collagen peptides — hydrolyzed, low molecular weight, types I & III |
| 2.5g | ceremonial matcha — antioxidant support, naturally occurring l-theanine |
| 200mg | lion's mane fruiting-body extract — ≥70% beta-glucans, third-party tested |
| 0g | added sugar. zero artificial sweeteners, colors, or proprietary blends |

Strip footnote (13px): grass-fed, pasture-raised bovine collagen. no soy, no dairy. every dose printed on the sachet.

---

## 4. Social proof section (Cream background)

Header (H2): *sold out before we could brag.*
Body copy:
> our first run went to the waitlist and disappeared. we don't have a wall of reviews yet — we have a label we'll put next to anyone's, and a list of people waiting for the next pour.

Proof elements (do not fabricate):
- Live waitlist counter (same source as homepage): "**[live count]** people waiting on the next pour"
- Substance badges: "third-party tested" · "heavy-metals screened" · "GMP-certified facility" · "doses fully disclosed"
- NO before/after skin photos (compliance + honesty), NO testimonials, NO invented press logos. If a genuine press placement exists at build time, a single "as seen in" logo may be added; otherwise omit the concept entirely.

---

## 5. FAQ (accordion, 4 items)

**q: is 2g of collagen actually meaningful?**
a: it's a daily maintenance dose of hydrolyzed, low-molecular-weight peptides — the form your body can absorb efficiently. our philosophy: the dose you take every single day beats the bigger scoop you abandon by february.

**q: can i taste the collagen?**
a: no. hydrolyzed peptides dissolve clean into the concentrate. you taste madagascar vanilla or real strawberry over smooth ceremonial matcha — nothing chalky, nothing "supplement-y."

**q: is it clean?**
a: grass-fed, pasture-raised bovine collagen, organic lion's mane fruiting-body extract, ceremonial matcha. no added sugar, no artificial sweeteners, no dyes, no proprietary blends. every dose is on the label.

**q: it's sold out — what happens when i join the waitlist?**
a: you're first in line for the next production run, with 20% off and free shipping locked in. we email when it's real, not before.

---

## 6. Final CTA section (Navy background, Cream text)

Header (H2, Instrument Serif italic): *glow is a habit. start yours early.*
Body: first run sold out. waitlist members get first access to the next pour — 20% off and free shipping included.
CTA button (Lime, Navy text): `join the waitlist`
Microcopy: we'd rather email you twice a month with something real than twice a day with noise.

---

## 7. Footer disclaimer (verbatim, 12px minimum)

> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.

© 2026 shroomé · ZSQUARED INC · privacy · terms · contact

---

## Build notes for engineering

- Waitlist signup → `/api/waitlist`, `utm_campaign=lp-glow`
- CTA 3x: hero, post-FAQ, final section; ghost page (no nav/exit links except footer legal)
- Disclaimer appears TWICE on this page (under benefit blocks + footer) — non-negotiable
- Strawberry-flavor imagery leads here (Pink association), vanilla secondary
