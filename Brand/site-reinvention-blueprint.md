# shroomé — site reinvention blueprint
> Date: 2026-07-14 · Owner: Site Reinvention Architect · Status: BUILD-READY (copy final; visual assets pending from Bolden — every gap is an `[ASSET]` slot with spec)
> Mandate (founder): "completely reinvented, fitting the brand DNA Bolden created with their story, competing at the level of drinkmagna.com and Seed."
> Sources reconciled: `Brand/Brand DNA/Shroome_Brand_DNA_Final.docx` · `Marketing/Strategy/funnel-teardown-2026-07.md` · `Marketing/Segments/segment-strategy.md` · `Product/SKU Catalog/{sku-catalog,subscription-plans,promo-value-add-plan}.md` · `Marketing/Email/Flows/engagement-capture-flows.md` · `Product/Formulation/ingredients-overview.md` · `Product/Compliance & Claims/claims-guidelines.md` · current `app/` (homepage, /drop, /lp/*, /flavors/*, 27 blog posts, 9 recipes) · `Brand/reskin-runbook.md`

---

## HOW TO USE THIS DOCUMENT

- **Copy is FINAL.** Every headline, subhead, CTA, and microcopy block below ships verbatim. Do not "improve" it in the build. Typos in lowercase display copy are not typos.
- **`[ASSET: …]`** marks a visual slot waiting on Bolden identity files. Each slot carries a spec (dimensions, subject, mood). Build the layout with a placeholder block; swap when files land per `Brand/reskin-runbook.md`.
- **Config-driven numbers only.** Every drop count, sellout stat, and list size interpolates from `app/lib/drop-config.ts` (`DROP_001.boxes = 500`, `soldOutInDays = 9`, `DROP_002.boxes = null → "allocation TBA"`, `ACCESS_LIST_COUNT`). The honesty rule is law: no number appears on the site that isn't literally true in config.
- **Economics are frozen.** Prices ($21/$36/$66/$126), the 9-cell subscription matrix (10–20%), SHROOME20/30 mechanics, $5/$10/$15 referral credits, keychain/gels placements — all decided in the companion docs. This blueprint wraps STORY around those mechanics; it changes zero numbers.
- **Compliance baseline (every page):** structure/function claims only, from the approved list in `claims-guidelines.md` — *supports sustained focus · supports healthy energy levels · supports immune function · supports skin health · supports gut health · provides antioxidant support*. FDA disclaimer on every page carrying a claim. No disease language, no "clinically proven," no competitor names in claims. Evidence sections cite ingredient research **categories** ("caffeine + L-theanine have been studied together for attention and alertness"), never disease outcomes.
- **Formulation flag (unresolved upstream):** site copy uses **2.5g ceremonial matcha** per current spec (`sku-catalog.md`); `ingredients-overview.md` says 2g. Product Lead reconciles before the Supplement Facts panel prints. All matcha-gram copy below is written once, in one component constant (`MATCHA_G`), so a change is one edit.
- **Two Brand-DNA adaptations, applied everywhere:** (1) the DNA doc describes a ready-to-pour **bottle**; the shipping product is a **1oz/30ml liquid concentrate sachet** — every "crack the cap" beat becomes "tear the sachet," and the counter-object role the bottle was meant to play transfers to the **box + the Mé keychain**. (2) The March-2026 `image-guidelines.md` "young energy brand" vibe section is superseded by the Bolden direction (quiet luxury, editorial, considered — Aesop/Celine, never supplement-brand); its **hard product rules stand as law**: no powders ever, no whisks, real sachet designs only, dark-green liquid pouring into milk is the hero visual, branded cups only.

---

# 1 · NARRATIVE SPINE

## The story the whole site tells

Somewhere between the café you love and the morning you actually have, there's a gap. The café has the ceremonial matcha, the good light, the drink that tastes like someone cared. Home has you — at 6:52am, with fifteen available seconds. Every wellness brand tries to close that gap by giving you *more to do*: a whisk, a frother, a scoop, a protocol. shroomé closes it by having already done it. Inside a one-ounce sachet is the finished thing — ceremonial matcha already made liquid, grass-fed collagen already dissolved, lion's mane already extracted and verified. You tear it, you pour it, the dark green swirls through the milk, and for a second your kitchen looks like the videos you save. That's the whole ritual: **pour, swirl, glow.** The luxury isn't another step. The luxury is that there are no steps left.

The site tells this arc in order, on every page: **the promise** (café energy, home address) → **the proof it's wanted** (drop 001, 500 boxes, gone in 9 days — real numbers, published) → **the proof it's real** (three ingredients, doses on the label, receipts one tap deep) → **the ritual** (the pour, demonstrated) → **the world** (Mé, the drops, the objects you can't buy) → **the door** (get drop access). Information density of Seed. Offer clarity of Magna. Voice of shroomé.

The commercial architecture underneath never changes: numbered drops with honest scarcity, a waitlist that pays you for data and referrals, subscriptions whose hero perk is *never missing a drop*, and gifts that are earned objects, never discounts. The story's job is to make those mechanics feel like a world instead of a funnel.

## Mé — the lore canon (this is the source of truth; 8 sentences)

1. The last two letters of shroomé were never just an accent — **Mé is a small, cream-colored sheep who lives inside the name**, and she was there before the logo was.
2. She is the anti-hustle mascot: sheep don't grind, don't chase, don't optimize — they are soft, warm, unbothered, and already exactly where they mean to be.
3. Mé is who you're becoming at 7am when the matcha is already made: café energy, home address.
4. She never speaks, never sells, and never appears next to a price — Mé shows up at moments of *arrival*, not moments of persuasion: the welcome email, the bottom of a long page, the inside of the box, the 404 where you're lost and she isn't.
5. Her one physical form is the keychain — cream sheep, deep brownish-green wordmark tag — which cannot be bought at any price, only earned or gifted, one colorway per drop, gone when the drop closes.
6. She is drawn small and used sparingly, like a luxury house motif — an Hermès horse, not a cereal-box tiger; if Mé appears more than twice on a page, the page is wrong.
7. Her temperament is the brand's tone ceiling: nothing shroomé publishes may be more anxious, more urgent, or louder than a sheep at rest.
8. Canon is closed: no speech bubbles, no animated antics, no seasonal costumes, no "Mé says…" — she exists so the brand has something it refuses to make noisy.

**Usage rules for builders and writers:** Mé renders at small scale (≤120px marks in UI; the /me page hero is the single sanctioned large rendering). Never adjacent to CTAs, prices, or discount codes. Sanctioned placements: /me page, one homepage "Mé moment" section, footer corner mark, 404, welcome email sign-off, keychain/collectible contexts, packaging insert. Everything else needs Brand approval.

---

# 2 · SITE MAP

```
drinkshroome.com
│
├─ /                    HOMEPAGE — the full story arc, rewritten (§3.1)
├─ /drop                THE DROP — PDP-grade sold-out storefront + ledger (§3.2)
├─ /ritual              NEW — education hub: how to pour, the library, sourcing, glossary (§3.3)
│    └─ (curates existing /blog posts + /recipes into learning paths — no URL moves)
├─ /me                  NEW — the lore page: who is Mé, the keychain, case 001, leaderboard (§3.4)
├─ /quiz                NEW — "find your pour" 4-question onboarding (§3.6)
├─ /flavors/vanilla     REFRESH — re-narrated to story voice (§3.5)
├─ /flavors/strawberry  REFRESH — re-narrated to story voice (§3.5)
│
├─ /lp/{ritual,glow,calm,focus,pour}   KEEP — ghost LPs, single-CTA discipline (funnel-teardown
│                                      calls this our strongest stage). Only change: post-signup
│                                      step routes into /quiz, and voice-guide sweep (§4).
├─ /founders            KEEP — grandfathered; add "first pour club" framing pass only
├─ /refer               KEEP — copy already corrected to $5/$10/$15 cap; add /me cross-link
├─ /blog, /recipes      KEEP — URLs untouched (SEO); surfaced through /ritual learning paths
├─ /faq, /welcome, /contact, /privacy, /terms, /unsubscribe, /404   KEEP — voice sweep only
│
└─ NAV (global, post-reinvention):  the drop · the ritual · flavors · who is mé · faq
   CTA (persistent, right-aligned): get drop access
   Footer (all pages): FDA disclaimer · privacy · terms · hello@drinkshroome.com ·
   [ASSET: Mé footer mark — 48×48px cream sheep, single color, bottom-right corner, 40% opacity]
```

Navigation rule: ghost LPs keep **zero nav** (one page, one decision — unchanged). Every other page gets the 5-item nav above. "who is mé" in the nav is deliberate — a nav item that sells nothing is itself the quiet-luxury signal.

---

# 3 · PER-PAGE BLUEPRINTS

Legend used in every section block: **[layout]** = layout intent for engineers · **STEAL** = which Magna/Seed move this section takes · **CONVERSION** = the element doing the selling.

---

## 3.1 HOMEPAGE — `/` (full rewrite of `app/page.tsx`)

**Purpose:** tell the entire narrative spine in one scroll and convert every reader into drop access (email → SMS upgrade → quiz). It must satisfy three readers at once: the ritual girlie who converts on the swirl, the label-reader who converts on the evidence layer, and the deal-brain who converts on the offer math.
**Replaces:** the current 1,552-line page (marquee → hero → flavor picker → ingredients → comparison → how-it-works → testimonials → CTA). Sections below are the new canonical order. Keep: analytics scaffolding (section-view, scroll-depth, time-on-site trackers, referral detection), `ExitPopup`, `StickyCTA`, `MobileNav` — re-skin, don't rebuild.
**Page-level conversion furniture:** sticky nav CTA `get drop access` · mobile sticky bottom bar appears after 60% scroll (STEAL: Magna sticky-ATC pattern, adapted to waitlist mode) · exit-intent popup keeps existing offer logic, copy updated in §H below.

### H-1 · MARQUEE BAR
**[layout]** full-width single-line ticker, ink background, canvas mono text, slow scroll, pauses on hover.
**Copy (repeating units, separated by the Mé keychain-tag glyph `[ASSET: 12px wordmark-tag divider glyph]`):**
> drop 001 — 500 boxes — sold out in 9 days · drop 002 is next · the list hears first · pour / swirl / glow

(interpolate from `DROP_001.boxes`, `DROP_001.soldOutInDays`; when `DROP_002.openDate` is set, append `· drop 002 opens [date]`)
**STEAL:** Magna's always-on offer clarity — the top pixel of the site already states the offer and its honesty.

### H-2 · HERO — the ritual promise
**[layout]** full-viewport. Left 55%: copy stack. Right 45%: `[ASSET: hero — 15-second pour loop, 1080×1350 video (webm+mp4, <2MB, autoplay muted loop): hand tears cream sachet, dark-green liquid pours into glass of milk, swirl blooms, no cuts, morning window light, editorial and unhurried — the Aesop version of a TikTok]`. Fallback: existing `lifestyle-hero.png` until asset lands. Mobile: video first, copy overlaid on lower third scrim.
**Eyebrow (mono, uppercase — the one sanctioned caps register):** `CEREMONIAL MATCHA · COLLAGEN · LION'S MANE — IN LIQUID`
**H1 (display, lowercase):**
> café energy. home address.
**Subhead:**
> shroomé is the first ready-to-pour ceremonial matcha latte concentrate — first-harvest matcha, grass-fed collagen, and lion's mane, already made, in a one-ounce sachet. tear, pour, swirl. fifteen seconds to the drink you used to leave the house for.
**Primary CTA (button):** `get drop access →`
**CTA microcopy (mono, small):** `drop 001 sold out. the list gets drop 002 first — 20% off locked at launch.`
**Trust row (below CTA, three mono chips):** `doses on the label` · `no added sugar` · `third-party tested`
**STEAL:** Magna — one hero claim ("first ready-to-pour"), owned completely, above the fold with the offer attached. **CONVERSION:** single CTA; the sold-out fact is the hook, not an apology.

### H-3 · DROP STATUS STRIP
**[layout]** slim horizontal band directly under hero, ink background. Three columns on desktop, stacked on mobile. All values from `drop-config.ts`.
**Column 1:** `drop 001` / `500 boxes — sold out in 9 days` (strikethrough on count)
**Column 2 (pulse dot):** `drop 002` / `allocation TBA — the list hears first` (or real count/date once set)
**Column 3 (link):** `read the ledger →` (→ /drop#ledger)
**Microcopy under strip:**
> our scarcity is the boring kind: drop sizes are real production runs, published here. no fake timers, no "only 3 left."
**STEAL:** nobody — this is ours (honest-scarcity theater). Magna's drop-adjacent urgency, minus the theater.

### H-4 · WHAT IT IS — the fifteen seconds
**[layout]** canvas background, generous whitespace. Centered display headline, then a three-step horizontal strip (numbered 01/02/03), each step: small photo + one line. `[ASSET: 3 step photos, 800×800 each — 01 sachet being torn; 02 pour mid-swirl into iced oat milk; 03 finished latte in shroomé-branded glass, held, out the door]`
**Eyebrow:** `NOT A POWDER. NOT A WHISK. NOT A PROJECT.`
**H2:**
> the matcha is already made.
**Body:**
> inside every sachet is one ounce of finished liquid concentrate — ceremonial matcha already whisked into suspension, collagen already dissolved, lion's mane already extracted. what's left for you takes fifteen seconds and zero skill.
**Steps:**
> **01 — tear.** any sachet, any counter, one hand.
> **02 — pour.** into hot water, iced oat, whatever you're loyal to.
> **03 — swirl.** watch the green move through the milk. that's it. that's the ceremony.
**Section link:** `see every way to pour it →` (→ /ritual)
**STEAL:** Seed — the "mechanism before benefit" instinct, translated: explain *what the format is* before claiming anything. **CONVERSION:** the /ritual link starts the education loop that returns as trust.

### H-5 · THE STACK — Seed-grade ingredient education
**[layout]** the densest section on the site, and proudly so. Ink background ("the label section" — dark, spec-sheet formality). Three ingredient modules stacked vertically; each module: left — `[ASSET: macro ingredient photo, 900×600 — matcha: wet stone-ground paste texture, not powder; collagen: liquid pour ribbon; lion's mane: the mushroom whole, studio-lit like an object, not a forest floor]`; right — spec header + three-line summary + **expandable accordion** ("read the receipts") with dose / why this form / source integrity / research category / deep-dive links. Accordions closed by default; analytics event on open.
**Eyebrow:** `THE STACK — EVERY DOSE ON THE LABEL`
**H2:**
> three things you already buy, already combined.
**Intro:**
> matcha for energy. collagen for skin. lion's mane for focus. you've been buying them in three formats from three brands with three sets of instructions. we compressed the stack into one pour — and printed every dose where you can see it.

**Module 1 — ceremonial matcha · 2.5g**
Summary lines:
> first-harvest, shade-grown, stone-ground ceremonial grade — more real matcha than most cafés put in your $7 latte.
> ~60mg caffeine with matcha's naturally occurring L-theanine. supports sustained focus and healthy energy levels.
> provides antioxidant support (catechins, including EGCG).
Accordion "read the receipts":
> **the dose.** 2.5g per sachet — a genuine ceremonial serving. plenty of "matcha-powered" products run 1–2g of culinary grade and hope you don't ask.
> **why this form.** shade-growing (21+ days under cover) raises L-theanine and chlorophyll; first-harvest leaves are the sweetest and least bitter; stone-grinding keeps particles fine enough to stay silky in liquid. that's why it's smooth, never lawn.
> **why liquid.** matcha is a suspension, not a solution — the reason powder clumps at 6am. ours is already in suspension. the whisk was never the ritual; it was the obstacle.
> **the research category.** caffeine and L-theanine have been studied together for attention and alertness — the "calm focus" pairing matcha is known for. we make no promises beyond the label: supports sustained focus, supports healthy energy levels.
> links: `what makes matcha ceremonial grade →` (blog) · `the caffeine + L-theanine curve →` (blog) · `how much caffeine is in matcha →` (blog)

**Module 2 — grass-fed collagen peptides · 2g**
Summary lines:
> hydrolyzed type I & III peptides from grass-fed, pasture-raised bovine — dissolved into the liquid, so there's no scoop to skip.
> supports skin health and gut health.
> tastes like nothing. on purpose.
Accordion:
> **the dose — straight talk.** 2g is a daily maintenance dose. clinical studies often use 5–10g; we'd rather give you an honest 2g you take every single day than a heroic scoop you abandon by thursday. consistency is the mechanism.
> **why this form.** hydrolyzed peptides are pre-broken into low-molecular-weight fragments for absorption — and because ours are dissolved at the formulation level, there's no clumping, no shaker, no chalk.
> **source integrity.** grass-fed, pasture-raised bovine. no added hormones or antibiotics in the supply chain. collagen is the only animal-derived ingredient in the sachet.
> **the research category.** collagen peptides have been studied for skin elasticity and hydration (type I) and gut-lining structure (type III). our claims stay on the label: supports skin health, supports gut health.
> links: `collagen peptides, explained →` (blog) · `why we put collagen in a matcha latte →` (blog)

**Module 3 — organic lion's mane · 200mg at ≥70% beta-glucans**
Summary lines:
> fruiting-body extract — the mushroom, not the root system it grows from — hot-water extracted, ≥70% beta-glucans, third-party verified.
> supports sustained focus and immune function.
> the number most mushroom brands won't print.
Accordion:
> **the dose.** 200mg of ≥70% beta-glucan fruiting-body extract. concentration beats mass: typical mushroom supplements run 15–30% beta-glucans, often from mycelium grown on grain — which means you're largely buying starch. 200mg of ours carries more measured beta-glucan than gram-level doses of those.
> **why this form.** fruiting body is the mushroom itself; hot-water extraction is the traditional method that actually liberates beta-glucans from the chitin cell walls. spray-dried, then dissolved into the concentrate.
> **source integrity.** organic. third-party tested for beta-glucan content, heavy metals, and microbials. made in a GMP-certified facility. the test isn't a vibe — it's a document.
> **the research category.** beta-glucans are the primary bioactive compounds in functional mushrooms, studied for immune modulation. label claims only: supports immune function, supports sustained focus.
> links: `fruiting body vs mycelium →` (blog) · `what are beta-glucans →` (blog) · `lion's mane: what the research actually says →` (blog)

**Section footer (mono, small):** FDA disclaimer, full text, legible — this section makes structure/function claims.
**STEAL:** Seed — label as spec sheet, mechanism-first education, evidence one tap deep; Magna — every hero claim has a canonical place to be explained (the accordion + blog links). **CONVERSION:** this section converts the skeptic segments (glow getters reading doses, deep workers reading beta-glucan %) that the swirl alone never will.

### H-6 · RITUAL DEMONSTRATION — pour / swirl / glow
**[layout]** full-bleed, canvas. Three vertical panels (stacked on mobile), each a looping video tile with a display-italic word overlaid. `[ASSET: 3 loop videos, 720×900 each, <1.5MB — "pour": sachet into hot water, steam; "swirl": green blooming through iced oat milk, the hero shot; "glow": person at a sunlit table, first sip, unposed]`
**H2 (above panels):**
> pour. swirl. glow.
**Panel captions:**
> **pour** — hot, 6oz water at 170–180°F. or don't heat anything and pour it over ice.
> **swirl** — the fifteen-second show. no tools were harmed because no tools were used.
> **glow** — collagen for skin, matcha for energy, lion's mane for focus. supports the things your morning is actually for.*
**Footnote:** `*supports skin health, healthy energy levels, and sustained focus. see the label — and the FDA disclaimer below.`
**Section link:** `nine recipes, one sachet →` (→ /recipes via /ritual)
**STEAL:** nobody — liquid format theater is ours alone. Powder brands cannot shoot this section.

### H-7 · THE MÉ MOMENT — lore introduction
**[layout]** deliberate register break: the quietest section on the page. Tint-soft background, enormous whitespace, small centered illustration `[ASSET: Mé mark — cream sheep illustration, ≤160px, single placement, from Bolden keychain art]`, narrow text column (max 46ch), no photos, no product.
**Eyebrow:** none. (The absence is the design.)
**H2:**
> the é is a sheep.
**Body:**
> her name is mé — the last two letters of shroomé, and the first resident of the world we're building. she's a sheep because sheep don't hustle. they don't chase, they don't grind, they don't check anything at 2am. they're soft, warm, and already exactly where they mean to be — which is the entire idea: café energy, home address.
>
> you won't see her often. she doesn't do ads, and she's never next to a price. she lives on a keychain you can't buy — one colorway per drop, earned, gifted, gone — and in a few quiet corners of this site, holding the brand to her one rule: nothing we make gets to be louder than a sheep at rest.
**CTA (text link, not a button):** `meet her properly →` (→ /me)
**STEAL:** nobody — this is the second thing neither Magna nor Seed has: a house motif that builds cult without claiming anything. **CONVERSION:** none, deliberately. The section's job is to make the brand feel authored; the /me page monetizes the affection via the referral economy.

### H-8 · SOCIAL PROOF — the honest version
**[layout]** canvas, three-column quote grid + a testing-badge row. Quotes are real drop-001 founder quotes only — pull from founders correspondence; if fewer than 3 exist at build time, render 1–2 and keep the honesty card. Each quote card: text, first name, `drop 001 founder` tag.
**H2:**
> what the first 500 boxes said back.
**Honesty card (always renders, distinct border):**
> every quote here is from a verified drop 001 founder. we don't buy reviews, we don't seed "influencer honesty," and there are no affiliate links on this page. when the reviews are ours to show, you'll see the count — real one, small at first.
**Quote slots (final formatting, content = verified quotes only):** `[VERIFIED QUOTE 1–3 — source: founders list correspondence; must pass claims review: no disease language survives editing, per claims-guidelines testimonial rules]`
**Testing badge row (three mono chips with doc links when /lab docs exist):** `≥70% beta-glucans — third-party verified` · `heavy metals tested` · `GMP-certified facility`
**STEAL:** inverted Magna — where they'd flood the zone with UGC, our pre-revenue truth *is* the differentiator. The honesty card converts the Wellness Curator segment harder than 4,000 unverifiable stars.

### H-9 · VALUE ARCHITECTURE PREVIEW
**[layout]** ink background. Left: subscription story + mini-matrix (3 headline cells, link to full matrix on /drop). Right: first pour kit card + café math stat block.
**H2:**
> subscribers never miss a drop.
**Body:**
> shroomé sells in numbered, limited runs — and runs end. subscribers skip that entirely: every active subscription is reserved out of each production run *before* the public window opens. one-time buyers refresh the page. subscribers get theirs automatically.
**Mini-matrix (three cells, mono):**
> `12 sachets / 30 days — $31.68 ($2.64/serving)` · `24 / 30 days — $56.10 ($2.34)` · `48 / 2 weeks — $100.80 ($2.10 — the founders price, earned back)`
**Matrix microcopy:** `10–20% off, free shipping always, skip or pause anytime, price locked 12 months. full matrix on the drop page.`
**Right card — first pour kit:**
> **the first pour kit — $21.** six sachets, three vanilla, three strawberry. the low-stakes way to find your pour before you commit to a box.
**Café math block (big mono numerals):**
> `your café order: ~$7.` / `shroomé: $2.10–$3.00 a pour.` / `same ceremonial dose. no line.`
**CTA:** `see the full lineup →` (→ /drop)
**STEAL:** Magna — subscription-first price architecture, starter-kit as conversion offer, the everyday-math anchor; Seed — refill-model framing ("one product, one rhythm," the drop allocation is our jar).

### H-10 · WAITLIST CAPTURE + SMS UPGRADE
**[layout]** the conversion altar: tint-blush background, centered, max 640px. Two-step form (existing `DropAccessForm` flow): step 1 email → success state reveals step 2 phone. Post-submit → full-screen share takeover (waitlist number + referral link + quiz invite — the funnel-teardown's Build-Today #3).
**H2:**
> get drop 002 before it's a story you heard.
**Body:**
> join the list and three things are immediately yours: your waitlist number, your personal referral link, and SHROOME20 — 20% off plus free shipping, locked for launch. not a claim-it-by-midnight thing. it's earned, it's saved to your email, it'll be there.
**Email field placeholder:** `your email` · **Button:** `get drop access →`
**Step-2 headline (post-email success):**
> want the doors opened early?
**Step-2 body:**
> the text list gets every drop link 10 minutes before the public — and your code upgrades from 20 to 30. it replaces your 20% code; your best code wins. one text per drop. no spam, ever.
**Phone field placeholder:** `your number` · **Button:** `upgrade to early access →` · **Decline link:** `keep email only`
**Compliance microcopy (below phone field, required, keep existing TCPA disclosure text from `app/page.tsx:929` verbatim):** marketing texts, automated, consent not a condition of purchase, msg freq varies, msg & data rates may apply, STOP/HELP.
**Post-signup takeover copy:**
> **you're #{{waitlist_position}} in line.**
> your link moves you up — every friend who joins is $5 / $10 / $15 in credit at 1 / 3 / 5 (that's the cap; we're a small-batch brand, not a pyramid). and 45 seconds of quiz jumps you 50 spots right now.
> [button: `share my link`] [button: `find my pour — jump 50 spots →`] (→ /quiz)
**STEAL:** Seed — capture that arrives pre-segmented (the quiz handoff); Magna — the escalating named offer. **CONVERSION:** this is the page's only ask; every section above funnels here.

### H-11 · FAQ
**[layout]** canvas, single accordion column, 7 items, schema.org FAQ markup (keep existing JSON-LD approach).
**H2:** `asked, answered.`
1. **is it a powder?** no — and that's the whole invention. each sachet holds one ounce of finished liquid concentrate. the matcha is already suspended, the collagen already dissolved. you pour it into water or milk, hot or iced. nothing to whisk, nothing to rinse.
2. **how much caffeine?** about 60mg per sachet — roughly half an espresso — alongside matcha's naturally occurring L-theanine. supports sustained focus and healthy energy levels without asking your heart to race for it.
3. **what exactly is in it?** per sachet: 2.5g first-harvest ceremonial matcha, 2g grass-fed hydrolyzed collagen peptides (type I & III), 200mg organic lion's mane fruiting-body extract at ≥70% beta-glucans. no added sugar, no artificial sweeteners, no proprietary blends. every dose is printed on the sachet.
4. **when can i actually buy it?** in drops. drop 001 — 500 boxes — sold out in 9 days. drop 002 is next; the list gets the link first, and the text list gets it 10 minutes before everyone. drop sizes are real production runs, published on the drop page.
5. **why drops instead of just… stock?** because we're small-batch and honest about it. a drop's size equals the run we actually received. when it's gone, it's gone until the next run — no fake timers, no eternal "almost sold out." subscribers skip the whole game: their boxes are reserved before doors open.
6. **is it vegan?** everything except the collagen, which is grass-fed, pasture-raised bovine — and the only animal-derived ingredient. no soy, no dairy.
7. **does it actually taste good?** it's a matcha latte first and a stack second. vanilla is warm, floral, latte-like; strawberry is bright and smoothie-like. ceremonial grade is the reason it's smooth instead of bitter — and if six sachets prove us wrong, that's what the $21 first pour kit is for.

### H-12 · FOOTER
**[layout]** ink background. Wordmark, nav links, legal links, contact, FDA disclaimer full-text, `[ASSET: Mé footer mark — 48×48, single-color, 40% opacity, bottom-right]`.
**Sign-off line (above legal):**
> café energy. home address. — the ritual is ready. just pour.
**Legal:** `© 2026 shroomé · ZSQUARED INC` · privacy · terms · `hello@drinkshroome.com` · FDA disclaimer.

---

## 3.2 THE DROP — `/drop` (upgrade from poster to salesperson)

**Purpose:** the PDP. Every ad, email, and referral ultimately lands here; it must convert skeptics, not just believers, while everything is sold out. Funnel-teardown verdict to fix: "our /drop is a poster, theirs is a salesperson." Keep: JSON-LD product schema (update SKUs to `SHR-BOX-VAN-12`/`SHR-BOX-STR-12` + gtin12 per sku-catalog schema-sync note), drop-config interpolation, sub matrix data.
**New conversion furniture:** **sticky mobile CTA bar** (`drop 002 — get access →`, appears after the lineup section, anchors to #waitlist — STEAL: Magna sticky ATC) · evidence accordions · comparison table · box-contents visual · earned-objects module.

### D-1 · HERO — the ledger as headline
**[layout]** ink, centered, pulse-dot status line. Config-driven.
**Eyebrow:** `NUMBERED · LIMITED · HONEST`
**H1:** `drop 001 — sold out in 9 days.`
**Subhead:**
> shroomé ships in numbered, limited drops — real production runs, published counts, no theater. drop 002 is next: same label, same fifteen seconds. the list gets the link first.
**CTA:** `get drop access →` · **Status microcopy:** `● drop 002 — allocation TBA. the access list gets the date first.` (config)

### D-2 · WHAT YOU GET — box contents visualization
**[layout]** canvas. Large exploded flat-lay `[ASSET: box-contents flat-lay, 1600×1000 — open 12-count box, sachets fanned (6 vanilla, 6 strawberry for variety shot), ritual insert card, everything on cream linen, editorial top-down]` with numbered hotspot labels; list mirrors below on mobile.
**H2:** `what's in the box.`
**Hotspot labels:**
> **01 — twelve sachets.** 1oz each. the matcha already made. (`MATCHA_G`g ceremonial matcha · 2g collagen · 200mg lion's mane per sachet — printed right there on the foil.)
> **02 — the box.** it lives on the counter, not in a cabinet. that's a design decision, not an accident.
> **03 — the ritual card.** hot, iced, oat — three pours, fifteen seconds each, illustrated.
> **04 — sometimes, more.** some boxes arrive with something extra in them. the text list knows things.
(Label 04 is the sanctioned P1 keychain *tease* — never explicit, per promo-value-add-plan doctrine: the surprise stays a surprise.)
**STEAL:** Magna — the starter-kit "what you get" anatomy; perceived-value padding without touching price.

### D-3 · THE LINEUP — product grid
**[layout]** keep existing 5-card grid (first pour kit, vanilla 12, strawberry 12, variety 24, 48 stock-up) with sold-out stamps, prices, per-serving, compare-at, sub-from prices. Re-order so **first pour kit leads** (the conversion offer leads, Magna-style). Card CTA: `waitlist for drop 002 →`.
**H2:** `the lineup.`
**Intro:** `every box from drop 001 is gone. drop 002 brings them all back — list first.`
**New card microcopy on first pour kit:** `the starter. 3 vanilla + 3 strawberry, $3.50 a pour. commitment issues welcome.`
**New card microcopy on 48 stock-up:** `$2.63 a pour — and on subscription, $2.10: the founders price, earned back.`

### D-4 · COMPARISON TABLE — the Magna move
**[layout]** horizontal-scroll table on mobile (`overflow-x: auto`), shroomé column visually elevated (tint background, wider). **No competitor names** (claims-guidelines rule) — compare categories.
**H2:** `the honest comparison.`
**Intro:** `no brand names, no strawmen — just the formats, side by side.`

| | **shroomé** | matcha powder brands | mushroom coffee | your café order |
|---|---|---|---|---|
| format | ready-to-pour liquid concentrate | powder — whisk or frother required | powder / instant | someone else makes it |
| prep time | **15 seconds** | 3–5 minutes + cleanup | 1–2 minutes | 15+ minutes incl. the line |
| matcha per serving | **2.5g ceremonial, first-harvest** | 1–2g, often culinary grade | usually none | varies — often ~1g, rarely disclosed |
| collagen | **2g grass-fed, dissolved** | rarely — separate scoop | no | no |
| functional mushroom | **200mg fruiting body, ≥70% beta-glucans, third-party verified** | sometimes — % rarely printed | blend, dose often hidden | no |
| doses disclosed | **every one, on the sachet** | sometimes | "proprietary blend" is common | no label at all |
| cost per serving | **$2.10–3.50** | $1.50–3.00 + your labor | $1.30–2.50 | ~$7 |

**Table footnote (mono):** `category-typical figures; individual products vary. our numbers are printed on every sachet.`
**STEAL:** Magna — the comparison-anchored PDP; this table is also the ad-creative source of truth per the funnel teardown.

### D-5 · EVIDENCE ACCORDIONS — the receipts
**[layout]** re-use the homepage H-5 accordion component verbatim (single source: build as shared `<StackReceipts />`), preceded by a testing block.
**H2:** `read the receipts.`
**Testing block copy:**
> third-party tested for beta-glucan content (≥70% verified), heavy metals (arsenic, lead, cadmium, mercury), and microbials. made in a GMP-certified facility. when the certificates are cleared for publication they'll live here as documents, not badges. `[SLOT: COA/lab PDFs — ops-dependent; render "certificates: coming to this page" until real docs exist — never fabricate]`
**FDA disclaimer** below (claims present).
**STEAL:** Seed — the label as spec sheet, evidence at the point of sale.

### D-6 · THE OBJECTS — earned, never sold
**[layout]** two-card row, tint-soft background. Card 1: keychain `[ASSET: Mé keychain photo, 900×900 — soft-PVC cream sheep charm + wordmark tag on poly bag, product-shot on linen]`. Card 2: eye gels `[ASSET: gels box render, 900×900]`.
**H2:** `some things here can't be bought.`
**Card 1 — the mé keychain:**
> one colorway per drop, gone when the drop closes. not for sale — no exceptions, no price, ever. three converted referrals earns you one; the top 100 referrers each drop get theirs from a numbered case. proof you're inside, not merch.
> `how to earn her →` (→ /me)
**Card 2 — the under-eye gels:**
> the glow you drink, now the glow you wear. hydrating under-eye gels — cooling, refreshing the look of tired mornings. not sold separately (yet): five referrals earns a box, and on drop day they ride free in orders $66+.
(Cosmetic-claim lexicon only: hydrates / cools / refreshes the look of — never "treats puffiness/dark circles.")
**STEAL:** Magna — referral paid in product, gift-not-discount offer architecture; plus our collectible layer neither benchmark has.

### D-7 · SUBSCRIPTION — never miss a drop
**[layout]** keep existing full 9-cell matrix table + caption, re-headed. Add perks ladder strip under the table.
**H2:** `subscribers never miss a drop.`
**Body:** (reuse homepage H-9 body copy verbatim)
**Perks strip (four mono chips):** `allocation reserved every cycle` · `free shipping, always` · `skip / pause / swap anytime` · `price locked 12 months`
**Sub-widget teaser line:** `your first box comes with her — every new subscription's first delivery includes the mé keychain.` (P5 — sanctioned announced placement)
**Badge:** `opens with drop 002`
**STEAL:** Seed — subscription as the default rhythm; Magna — the sub delta made visible cell-by-cell.

### D-8 · THE LEDGER
**[layout]** keep existing ledger rows (ink bars), add permalink anchor `#ledger`.
**H2:** `the ledger.`
Rows (config-driven): `drop 001 — ~~500 boxes~~ — SOLD OUT` / `● drop 002 — allocation TBA — waitlist gets first access`
**Honesty paragraph (keep current copy verbatim — it's already perfect):**
> scarcity here is the boring kind: a drop's size equals the production run we actually received — never an artificial cap, never a fake timer. when it's gone, it's gone until the next run.

### D-9 · WAITLIST CAPTURE
Reuse homepage H-10 module (two-step + takeover) with `source="drop"`.
**H2:** `get drop 002 first.`

### D-10 · FOOTER — global footer (H-12).

---

## 3.3 THE RITUAL — `/ritual` (NEW — the education hub)

**Purpose:** the Seed-style authority layer. One canonical home for "how" and "why" — where ad claims, PDP accordions, and email curriculum all resolve. Curates the existing 27 blog posts and 9 recipes into learning paths **without moving any URL** (SEO preserved; this page is a curation layer, not a migration).
**Voice register:** this is the sentence-case page. Education voice: warm, precise, Seed-calm. Display headlines stay lowercase; body text drops the playfulness a notch.
**Conversion:** soft. One CTA at top nav + one closing capture module. The page converts by making every other page more believable.

### R-1 · HERO
**[layout]** canvas, editorial, text-led. `[ASSET: quiet hero image, 1600×700 — morning table, latte in branded glass, open book energy, no people or one out-of-focus figure]`
**Eyebrow:** `THE RITUAL — HOW, AND WHY`
**H1:** `everything we know, in one place.`
**Subhead:**
> How to pour it, what's actually in it, where it comes from, and what the research categories really say — written the way we'd explain it to a smart friend, with receipts one tap deep.

### R-2 · HOW TO POUR — the three canonical pours
**[layout]** three wide cards, each: `[ASSET: 3 overhead pour photos/loops, 1200×800 — hot / iced oat / blended]` + steps + a mono spec line.
**H2:** `the pours.`
> **the hot one.** tear a sachet into a mug. add 6oz water at 170–180°F — hot, never boiling; boiling water bullies matcha. stir once. milk optional.
> `spec: 6oz water · 170–180°F · 15 seconds`
> **the iced one (the famous one).** fill a glass with ice and 6oz of oat milk. pour the sachet over the top. watch the swirl do the thing. stir when you're done watching.
> `spec: ice · 6oz milk of loyalty · pour high for maximum swirl`
> **the blended one.** sachet + frozen strawberries + banana + your milk. blend. the smoothie that quietly carries your whole stack.
> `spec: 1 sachet · 1 cup fruit · 8oz milk`
**Link row:** `all nine recipes →` (→ /recipes)

### R-3 · THE LIBRARY — curated learning paths
**[layout]** four path cards; each card lists 4–7 existing blog posts in reading order with time-to-read; path progress is cosmetic (no accounts). Post URLs unchanged.
**H2:** `the library.`
**Intro:** `twenty-seven pieces, four paths, zero homework. start where your curiosity is.`
**Path 1 — matcha 101** (`what is ceremonial grade matcha` → `ceremonial vs culinary` → `what does matcha taste like` → `how much caffeine in matcha` → `can you drink matcha every day`)
> everything the café never had time to explain.
**Path 2 — the mushroom files** (`fruiting body vs mycelium` → `what are beta-glucans` → `lion's mane research` → `adaptogens guide` → `ultimate mushroom-matcha guide` → `mushroom coffee vs matcha`)
> how to read a mushroom label like you mean it.
**Path 3 — collagen, straight talk** (`collagen peptides explained` → `collagen in your morning drink` → `collagen matcha benefits`)
> honest dosing, real forms, no miracle math.
**Path 4 — the caffeine curve** (`caffeine + L-theanine science` → `matcha vs coffee: the switch` → `replace coffee without the crash` → `30-day experiment` → `matcha vs pre-workout` → `morning routine stack`)
> calm, steady energy — explained, not promised.
**STEAL:** Seed — education-first authority, the consumer curriculum; Magna — the canonical education page every ad claim points home to.

### R-4 · SOURCING — where it comes from
**[layout]** editorial split: map-style graphic `[ASSET: sourcing illustration/photo, 1200×800 — shaded tea field or stone mill, documentary tone]` + text column.
**H2:** `single-origin, stone-ground, shade-grown.`
**Body:**
> our matcha is first-harvest (ichiban-cha), grown under cover for at least 21 days — the shading that concentrates L-theanine and turns the leaves that impossible green — then stone-ground the slow way. most functional brands use culinary grade because ceremonial is expensive. it is. that's the point of it.
> the collagen is grass-fed, pasture-raised bovine, hydrolyzed for absorption. the lion's mane is organic fruiting body, hot-water extracted, verified at ≥70% beta-glucans by a third party. and the finished concentrate is made in a GMP-certified facility, tested for heavy metals and microbials before it's allowed anywhere near a sachet.
> we honor where all of this comes from by refusing to gatekeep it. the ritual is precious. the preparation is not.
**STEAL:** Seed — supply-chain-as-story; our "ceremonial without the ceremony" pillar does the differentiating.

### R-5 · GLOSSARY
**[layout]** two-column definition list, anchor-linkable terms (ads and emails can deep-link `#beta-glucans`).
**H2:** `small glossary of big words.`
Terms (12, final copy):
> **ceremonial grade** — the top tier of matcha: first-harvest, shade-grown leaves, stone-ground. smooth and naturally sweet where culinary grade is bitter.
> **ichiban-cha** — "first tea." the spring first harvest; the youngest, sweetest leaves.
> **shade-grown** — covering tea plants for 21+ days before harvest, raising L-theanine and chlorophyll.
> **L-theanine** — an amino acid naturally occurring in matcha, studied alongside caffeine for calm, steady alertness.
> **EGCG** — the most-studied catechin (antioxidant compound) in green tea. why "provides antioxidant support" is on our label.
> **concentrate** — the finished drink, minus the water. ours is liquid: pour and dilute, nothing to dissolve.
> **hydrolyzed collagen peptides** — collagen pre-broken into small fragments the body can absorb; the reason it dissolves clean.
> **type I & III collagen** — the forms studied for skin (I) and gut-lining structure (III).
> **fruiting body** — the actual mushroom, above ground. the part with the beta-glucans.
> **mycelium on grain** — the root network grown on rice or oats; sold ground-up, grain and all. mostly starch. we don't use it.
> **beta-glucans** — the primary bioactive polysaccharides in functional mushrooms, studied for immune modulation. ours are third-party verified at ≥70%.
> **a drop** — a numbered, limited production run. published size, real sellouts, no theater.
**FDA disclaimer** at page footer (claims appear on this page).

### R-6 · CLOSING CAPTURE
**H2:** `smarter already. now get in line.`
**Body:** `the list gets every drop first — and our emails teach before they sell. that's a promise, and you can grade us on it.`
Standard capture module (`source="ritual"`).

---

## 3.4 WHO IS MÉ — `/me` (NEW — the lore page)

**Purpose:** the cult-building page. Zero product education, zero prices. It deepens the world, canonizes the keychain economy, and hosts the leaderboard — turning affection into referrals without ever asking loudly. This page is also PR bait: "the matcha brand with a sheep you cannot buy."
**Register:** the quietest page on the site. Maximum whitespace, minimum modules.

### M-1 · HERO
**[layout]** near-empty viewport: canvas, centered `[ASSET: Mé hero illustration — the single sanctioned large rendering, ~420px, from Bolden keychain art: cream sheep, deep brownish-green line work]`, display headline beneath.
**H1:** `this is mé.`
**Subhead:** `rhymes with the end of shroomé. because she is the end of shroomé.`

### M-2 · THE STORY
**[layout]** narrow prose column, 46ch, generous leading. No images.
**Copy (final — the public version of the lore canon):**
> every brand says it stands for calm. we hired a sheep.
>
> mé has been inside the name from the beginning — the é everyone asks about. she's a sheep because sheep are the opposite of the morning we were sold: they don't hustle, don't grind, don't race a clock they can't see. they're soft, warm, unbothered, and already home. café energy, home address — she had it first.
>
> she doesn't speak. she doesn't do ads. she will never appear next to a price, because she isn't selling you anything — she's what's left when the selling stops and the matcha is already made.
>
> you'll meet her in exactly the places you'd hope: at the bottom of a long page, in the corner of a welcome email, on the 404 when you're lost and she isn't. and, if you're one of the people who brings friends into this — on your keys.

### M-3 · THE KEYCHAIN — the object
**[layout]** product-shot treatment for a thing with no buy button. `[ASSET: keychain hero photo, 1400×900 — charm + wordmark tag, macro, linen]` + spec column (mono).
**H2:** `the keychain. not for sale.`
**Spec column:**
> `mé charm — 45×40mm, soft touch` / `wordmark tag — 40×12mm` / `one colorway per drop` / `count published, like everything here` / `price — there isn't one. ever.`
**Body:**
> the moment she has a price, she's merch. while she doesn't, she's proof — that you were in this early, that you brought people with you, that you're inside. each drop gets one colorway; when the drop closes, that colorway is done being made.
**Colorway gallery:** `[ASSET: colorway grid — one tile per released colorway, 600×600 each; drop 002 tile renders "drop 002 colorway — revealed on drop day" until launch. Colorway names ship only after factory-color confirmation (promo-plan §4 rule: never promise hexes the factory can't mold)]`

### M-4 · HOW TO EARN HER
**[layout]** three numbered rows, mono ledger styling.
**H2:** `four ways in. money isn't one of them.`
> **01 — bring three.** three friends join through your link → the current drop's keychain rides along in your next box. (your $10 credit still stacks up the ladder as normal — the sheep is extra.)
> **02 — subscribe.** every new subscription's first delivery includes her. after that you're in the world: gels in every third box on the bigger plans, first look at each colorway on the 48 tier.
> **03 — take the quiz.** every drop, 100 keychains go to "find your pour" finishers, drawn at random. forty-five seconds, honest odds, published count.
> **04 — top the board.** the top 100 referrers each drop earn theirs from a numbered case — see below.
**Microcopy:** `referral credits stay boring and real: $5 / $10 / $15 at 1 / 3 / 5 friends, capped there. the objects are the ceiling above the cap.`

### M-5 · CASE 001 + THE LEADERBOARD
**[layout]** ink section. Left: case story. Right: live leaderboard table (top 10 visible, anonymized handles/initials, pulls existing referral API), `updated live` pulse dot.
**H2:** `case 001.`
**Body:**
> the first sealed case of keychains ever made — one hundred of her, hand-numbered 001 to 100 on the bag. before drop 002 opens, the top 100 referrers on this list get them, in rank order. number 001 goes to number one. there will never be another first case, because that's how counting works.
**Leaderboard header:** `the board — top 100 get numbered. #1 gets 001.`
**CTA:** `get your link →` (→ signup / dashboard if known)
**STEAL:** nobody. Seed has authority, Magna has offers; neither has a numbered object economy with published honest counts. This is moat #2.

### M-6 · CANON FOOTNOTE
**[layout]** small centered mono block before footer.
> mé does not do collabs (yet), does not wear costumes, and does not have a birthday (that we announce). she is a sheep. she is at home. that's the brand.

---

## 3.5 FLAVORS — `/flavors/vanilla` · `/flavors/strawberry` (refresh direction, keep structure)

**Purpose & rule:** keep pages, URLs, JSON-LD, recipe cross-links, and section order (ticker → nav → hero → ingredients → recipes → footer). This is a re-narration pass + hero asset swap, not a rebuild. Effort S.
**Voice move:** each flavor gets a one-line *identity*, a re-written hero block, and a "who it's for" line in story voice. Function copy stays claims-compliant and secondary (flavor pages sell taste; the stack is a supporting cast).

**VANILLA — identity: "the home address."**
**Hero H1:** `vanilla. the one that feels like staying in.`
**Hero body:**
> warm, floral, quietly sweet — madagascar vanilla over that deep matcha umami, with a creamy finish that behaves exactly like the oat-milk latte you'd have ordered. this is the home-address pour: slow morning, good light, nowhere to be.
**Who it's for line:** `for the oat latte loyalists, the chai-curious, and anyone whose favorite chair is load-bearing.`
**Recipes carousel header:** `three ways to pour vanilla →`

**STRAWBERRY — identity: "the one that flirts."**
**Hero H1:** `strawberry. the one that flirts with the whole idea of matcha.`
**Hero body:**
> bright, fruity, a little tart, zero artificial sweetness — real strawberry over ceremonial green, more sunrise smoothie than latte. this is the iced pour, the pink-on-green swirl, the glass that gets photographed before it gets sipped.
**Who it's for line:** `for the iced-everything people, the fruit-forward, and everyone who found matcha on their for-you page.`
**Recipes carousel header:** `three ways to pour strawberry →`

**Shared additions (both pages):** drop-status strip (H-3 component, compact variant) under hero · closing capture module (`source="flavor-vanilla"` / `"flavor-strawberry"`) · `[ASSET per flavor: hero pour loop, 1080×1350 — vanilla: hot pour, warm light; strawberry: iced pour, pink-adjacent styling — real sachet designs only, per image-guidelines LOCKED rule]`.

---

## 3.6 THE QUIZ — `/quiz` · "find your pour" (NEW — spec)

**Purpose:** Seed's quiz-gated onboarding, sized to us: turn every signup from an email into a segmented profile, feed Klaviyo, reward with waitlist position, and mint a shareable identity artifact (the pour profile card). Funnel-teardown Build-Today #1 — everything downstream (FLOW C, properties, +50 spots) is already specced; this is the missing artifact.
**Placement:** (1) post-signup takeover button on every capture module (home, /drop, /ritual, flavors, all 5 LPs); (2) standalone `/quiz` for email 3 & SMS 3 links; (3) `/welcome` step 3. Known-profile visits skip straight to questions (email pre-filled); cold visits capture email on the result screen — the quiz doubles as a capture device (STEAL: Seed — quiz as universal LP).
**Mechanics (frozen upstream):** completion → webhook sets Klaviyo properties + `quiz_completed_at`, jumps waitlist −50 spots, enters the per-drop 100-keychain draw (P2), triggers FLOW C profile email. One completion per profile; retakes update properties but never re-reward.

**Intro screen:**
**H1:** `find your pour.`
**Body:** `four questions, forty-five seconds. you get your first pour profile — the exact way your first shroomé should happen — plus 50 spots up the list and a shot at the drop's keychain draw.`
**CTA:** `start →`

**Q1 — the flavor** (`flavor_pref`)
> **first: which way do you lean?**
> ○ vanilla — warm, floral, latte energy (`vanilla`)
> ○ strawberry — bright, fruity, iced energy (`strawberry`)
> ○ don't make me choose (`both`)

**Q2 — the temperature** (`temp_pref`)
> **how do you take the fifteen seconds?**
> ○ hot — steam, mug, both hands (`hot`)
> ○ iced — glass, clink, the swirl in full view (`iced`)

**Q3 — the hour** (`ritual_time`)
> **when does the ritual happen?**
> ○ morning — it starts the day (`morning`)
> ○ afternoon — it rescues the day (`afternoon`)

**Q4 — the incumbent** (`current_drink`)
> **and what's it replacing? (be honest. coffee people, we love you.)**
> ○ coffee (`coffee`) · ○ energy drinks (`energy_drink`) · ○ café matcha (`matcha`) · ○ tea (`tea`) · ○ nothing yet — i'm new here (`none`)

**Result — the pour profile.** `pour_profile` label = `{temp} {flavor} {time-word}`; time-word: morning → `sunrise`, afternoon → `golden hour`; flavor `both` → `swirl`. Yields 12 archetypes (e.g. `iced strawberry sunrise`, `hot vanilla golden hour`, `iced swirl sunrise`). Result screen:
**H1:** `you're an {{pour_profile}}.`
**Body (dynamic, one line per axis — final copy for each fragment):**
- vanilla → `warm-pour loyalist: madagascar vanilla, oat milk, no notes.`
- strawberry → `iced-glass romantic: pink on green, photographed then sipped.`
- both → `a swirl person. commitment was never the point.`
- hot → `served steaming — 170°F, never boiling, both hands on the mug.`
- iced → `served over ice, poured high for maximum swirl.`
- morning → `first thing. the day starts when the green moves.`
- afternoon → `the 2pm rescue. calm, steady, no crash to pay for later.`
- coffee → `recovering espresso romantic — keep the caffeine (~60mg), lose the spike.`
- energy_drink → `off the neon, onto the green.`
- matcha → `already fluent. we just deleted the line.`
- tea → `steeping graduate. same leaves, more ambition.`
- none → `day-one convert. the best pour profile is a blank one.`
**Reward block:** `done: you jumped 50 spots (now #{{waitlist_position}}) and you're in the drop 002 keychain draw — 100 go out, drawn at random, counts published.`
**Share:** `[ASSET: pour-profile share card template — 1080×1920 + 1080×1080, dynamic text layer for profile name + waitlist number, brand canvas + small Mé mark (sanctioned collectible context)]` · buttons: `share my profile` · `copy my link` (referral link — the share IS the referral).
**Drop-day payoff (build note):** FLOW C + drop-day emails render dynamic hero by `flavor_pref × temp_pref` — "your drop-day email will literally be built for how you pour" is a promise; keep it.

---

# 4 · VOICE GUIDE ADDENDUM

**Two registers, one brand.**
- **Display voice (headlines, CTAs, marquee, product cards, Mé contexts):** all lowercase, always — including sentence starts and "i". Periods end even fragments. `café energy. home address.`
- **Education voice (/ritual body, accordion internals, blog, email curriculum):** sentence case, full punctuation, Seed-calm precision. Warm, never clinical. Display headlines above education body stay lowercase.
- **The one caps register:** mono eyebrow/spec labels (`THE STACK — EVERY DOSE ON THE LABEL`, `SOLD OUT` stamps, `NUMBERED · LIMITED · HONEST`). Caps mean *ledger*, never *excitement*. Never a caps headline, never caps for urgency.
- **Brand renders "shroomé"** lowercase everywhere in display copy; "shroome" only in URLs/UTMs. Drops are three digits: drop 001, drop 002.

**Sentence rhythms.** Short declaratives land the point; one long sentence per block earns the short one that follows ("the luxury isn't another step. the luxury is that there are no steps left."). Numbers stated plainly, mid-sentence, no exclamation ("500 boxes. gone in 9 days."). Self-aware asides in parentheses, max one per section. Questions only in FAQ and quiz. Nothing shroomé publishes is louder than a sheep at rest — if a line needs an exclamation point to work, it doesn't work. Zero exclamation points site-wide (grep-enforceable).

**10 banned phrases** (supplement-brand clichés — auto-fail in review):
1. "unlock your potential" 2. "hack your morning" (or biohack-anything) 3. "elevate your routine" 4. "wellness journey" 5. "clean energy" as a claim 6. "superfood-packed" 7. "clinically proven" (also a compliance fail) 8. "treat yourself" 9. "game-changer" 10. "self-care essential"
Also banned by register: "girlboss/bestie" address, hustle vocabulary (grind, crush, optimize-your-AM), and any "limited time only!" urgency theater.

**10 signature phrases** (use these; they're the house accent):
1. "café energy. home address." 2. "pour / swirl / glow" 3. "the matcha is already made." 4. "ceremonial without the ceremony" 5. "doses on the label" / "read the receipts" 6. "effortless is the luxury" 7. "the list hears first" 8. "honest scarcity — the boring kind" 9. "earned, gifted, gone" (the objects) 10. "science that doesn't sound like science"

**The copy test (from Brand DNA, still law):** if a line could live on a Clevr/Graza/Poppi post, we're close. If it sounds like a GNC label or a 2018 wellness blog, rewrite. New second test: *would you read it aloud next to a sleeping sheep without feeling ridiculous?*

---

# 5 · COMPETITIVE PARITY SCORECARD

**Magna elements — now matched:**

| Magna move | Where we now match it |
|---|---|
| One hero claim, owned completely | H-2: "the first ready-to-pour ceremonial matcha latte concentrate," backed by /ritual as the canonical education page |
| Education page behind the ad claim | /ritual (R-3 library + R-4 sourcing); every claim on ads/PDP has a deep-linkable home (glossary anchors) |
| Starter kit as conversion offer | first pour kit leads the /drop lineup (D-3), previewed on home (H-9) |
| Physical gift as offer instrument | D-6 objects module + sub first-box keychain line (P5) — gift-not-discount doctrine intact |
| Subscription-first price architecture | sub-from price on every product card; 9-cell matrix on /drop; "founders price earned back" narrative |
| Dedicated LP per offer/audience | kept — 5 ghost LPs, single CTA (already our strongest stage) |
| Referral paid in product | keychain at 3, gels at 5, case 001 leaderboard (credits stay as the cash floor) |
| Sticky ATC / PDP conversion density | /drop sticky mobile CTA, comparison table, box-contents visual, evidence at point of sale |

**Seed elements — now matched:**

| Seed move | Where we now match it |
|---|---|
| Education-first authority | /ritual hub; H-5 stack modules with mechanism-before-benefit ordering |
| Label as spec sheet | H-5/D-5 receipts accordions: dose, form, source, research category, per ingredient |
| Quiz-gated onboarding | /quiz "find your pour" — capture, segmentation, commitment escalation, pre-segmented Klaviyo profiles |
| Ingredient evidence depth w/ compliance discipline | research-category citations only, FDA disclaimer placement map, banned-phrase list |
| Refill-model subscription framing | "never miss a drop" allocation = our jar; keychain first box = our durable object |
| Consumer curriculum | R-3 learning paths over existing 27 posts; "our emails teach before they sell" promise (R-6) |
| Teach-before-sell retention | education arc slots into flows (funnel-teardown item 7) — copy source is H-5/R-3 |

**The 3 things NEITHER does:**
1. **Drop scarcity honesty as theater.** A published, config-driven ledger — real run counts, real sellout stats, "scarcity is the boring kind." Magna discounts perpetually; Seed never runs out. We made *truth* the urgency mechanic (H-3, D-1, D-8).
2. **Mé lore + the object economy.** A luxury-house motif with closed canon, a collectible that cannot be bought at any price, colorways per drop, a hand-numbered case, a leaderboard. Neither benchmark has a world — they have a brand. (/me, H-7, D-6.)
3. **Liquid format theater.** The pour/swirl/glow moment is a physical spectacle no powder brand and neither benchmark can film. The site is built around motion (hero loop, H-6 triptych, flavor pour loops) — the format demos itself (H-2, H-6).

---

# 6 · BUILD PLAN

**Phase 0 — ships with the re-skin, day 1** (all buildable NOW; only hero video + Mé mark are asset-gated, both have specified fallbacks)
| Item | Effort | Asset-gated? |
|---|---|---|
| Token swap per `reskin-runbook.md` (prerequisite, separate runbook) | M | YES — Bolden palette/type/logos |
| Homepage rewrite to §3.1 (reuse trackers, forms, popups) | L | partial — H-2 loop, H-7 Mé mark fall back to stills/placeholder |
| /quiz + webhook + FLOW C wiring + post-signup takeover (funnel Build-Today #1 & #3) | M | share-card template only (text-only fallback fine) |
| Voice sweep of kept pages (faq, welcome, refer, LPs, 404) + banned-phrase/exclamation grep | S | no |

**Phase 1 — week 1–2 post-reskin**
| Item | Effort | Depends on |
|---|---|---|
| /drop upgrade to §3.2 (shared `<StackReceipts />`, comparison table, sticky CTA, D-2 flat-lay, D-6 objects) | M–L | D-2/D-6 photos (placeholder blocks OK); COA slot needs ops docs — render honestly empty |
| /ritual build (§3.3) — curation layer over existing posts/recipes | M | R-1/R-2 photography (can ship text-led) |
| Email curriculum reuse of H-5 copy (Emails 7–10, funnel item 7) | S | no |

**Phase 2 — week 3–4**
| Item | Effort | Depends on |
|---|---|---|
| /me build (§3.4) incl. leaderboard on existing referral API | M | Mé hero illustration + keychain photography (page cannot ship on placeholders — this page IS the asset; last in line by design) |
| /flavors re-narration + pour loops (§3.5) | S | flavor loops (stills fallback OK) |
| Colorway gallery + case-001 module go live with real factory colors | S | promo-plan open item #3 |

**Phase 3 — Shopify-gated (drop 002 flip)**
Sub widget copy (D-7 teaser line), P7 GWP drop-day banner, live boxes-remaining bar, first-pour-kit checkout — mechanics per `sku-catalog.md`/`promo-value-add-plan.md`; all copy above is final and waiting.

**Dependency summary:** buildable-now = everything structural + all copy. Asset-gated = hero/section video loops (6), photography (8 slots), Mé illustration set (hero, footer mark, 404, divider glyph), keychain/gels product shots, share-card template. **No phase blocks on assets except /me.**
**Engineering notes:** build H-5 accordions once as `<StackReceipts />` (home + /drop). Keep `MATCHA_G` a single constant pending the 2g/2.5g reconciliation. All drop numbers stay interpolated from `drop-config.ts` — hardcoding a count is a review-blocking offense. FDA disclaimer components: full-text on home (H-5 footer + footer), /drop (D-5 + footer), /ritual (footer), flavors (existing), LPs (existing); /me carries no claims and needs none — keep it that way.

---
*end of blueprint — copy final · assets pending · economics untouched*
