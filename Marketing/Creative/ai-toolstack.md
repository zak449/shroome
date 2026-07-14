# shroomé AI Production Stack

> Last updated: July 2026
> Owner: Creative Director
> Scope: paid social creative for the five segment LPs (`../Segments/segment-strategy.md`) and drop-launch content
> Prime directive: AI accelerates concepting, b-roll, and variant volume. It never touches the sachet, the label, or the moments where taste credibility lives. See "what NOT to AI-generate" at the bottom — it overrides everything above it.
> REPOSITIONING NOTE (2026-07-14): visual direction has pivoted to mixed-media energy — collage plates, sticker/badge elements, stop-motion sequences, kinetic transitions (see `creative-direction.md` "anti-earthy mandate"). Generation prompts should skew vivid and layered, never beige/linen/whisper-wellness. Current palette tokens stay until Bolden files land; direction = saturated, not soft-washed. Vocabulary in any generated on-screen text follows the brand ban list (no "ritual," "sacred," "mindful," "grounded," "earthy").

---

## Stack at a glance

| Use case | Primary tool | Backup / alt | Output feeds |
|---|---|---|---|
| Product stills & set concepting | Adobe Firefly (Image Model 4) | Midjourney v7 | moodboards, set briefs for the photographer — NOT final packshots |
| Background/cloud/texture plates | Adobe Firefly | Midjourney v7 | LP backgrounds, ad backplates (approved use per image-guidelines) |
| Video b-roll & macro pour/swirl | Runway Gen-4 | Google Veo 3, Kling 2.x | segment b-roll, transitions, dreamscapes — NOT the hero swirl |
| UGC-style ad variants | Arcads | HeyGen (avatar-led explainers) | high-volume hook testing on TikTok/Meta |
| Voiceover | ElevenLabs | — | VO for b-roll edits, hook variants |
| Editing & assembly | CapCut (desktop) | Adobe Premiere for hero cuts | all vertical deliverables |
| Cleanup & compositing | Adobe Photoshop (Firefly-powered generative fill) | — | retouching real photography (backgrounds only, never the sachet) |

---

## 1. Product stills & set design — Adobe Firefly / Midjourney v7

**What it's for:** concepting, not finals. Generate set-design directions (stone counters, morning light angles, prop palettes), lighting studies for the starburst look, and layout comps for LP heroes before we book the photographer.

**Why it fits the segments:** each of the five LPs needs a distinct set feel (vanity marble for /lp/glow, Green spec-sheet minimalism for /lp/focus, kinetic doorway rush for /lp/pour). Iterating those worlds in Firefly costs hours, not shoot days — then the photographer executes the winning direction for real.

**Workflow note:** generate WITHOUT any sachet in frame (use a gray placeholder block for scale). Composite the real `sachet-vanilla.png` / `sachet-strawberry.png` product photography over comps for internal review only. **Hard flag, per image-guidelines and the launch roadmap: AI packshots are a bridge for concepting; every public-facing product image must be real photography of the real sachets, and the roadmap task "replace AI product images with real product photography" applies to any AI remnants on the site too.** Firefly is the default because its training-data indemnification keeps commercial risk low; Midjourney v7 is for wilder set exploration.

---

## 2. Backgrounds & textures — Adobe Firefly (with Photoshop generative fill)

**What it's for:** the dreamy cloud plates, purple/strawberry-tint gradient environments, and grain textures the brand system already approves for backgrounds (image-guidelines explicitly allows generated imagery for backgrounds only).

**Why it fits the segments:** /lp/calm lives on clouds ("no crash" made visible); /lp/ritual (the matcha-maximalist page — slug kept, segment renamed) needs saturated-surreal gradient skies plus collage/scrapbook texture plates (torn-paper edges, tape, sticker sheets). Generating tinted plates in brand hexes beats stock every time.

**Workflow note:** always tint to palette (Purple #E3D5F7, Strawberry tint #FFE2F4, Purple #E3D5F7), add grain per creative-direction, and keep clouds clearly stylized — never photoreal weather that could read as a location claim. File naming: `bg-cloud-[palette]-[nn].png` into `Assets/Backgrounds/`.

---

## 3. Video b-roll — Runway Gen-4 / Google Veo 3 / Kling

**What it's for:** connective tissue — dreamy transitions, cloud fly-throughs, abstract green-ink-in-milk macro *inspiration* shots, ambient morning-light room plates, and the "energy curve" motion graphics backplates for /lp/calm.

**Why it fits the segments:** hook testing needs 10–20 video variants per segment per week; we can't shoot that. Gen-4 is the workhorse for stylized macro liquid and camera-controlled product-adjacent moves (again: sachet never generated). Veo 3 wins for realistic ambient scenes with native audio beds. Kling is the budget volume lane for TikTok-pace transition shots.

**Workflow note:** the REAL hero swirl gets shot once, properly, macro, on a real camera — that's the signature asset (see creative-direction). AI liquid shots may appear only as clearly stylized dream-sequences, never presented as the actual product pouring. Rule of thumb: if a viewer could reasonably believe they're watching shroomé concentrate hit milk, it must be real footage. Tag all AI clips `-aigen` in filenames so editors can't confuse them.

---

## 4. UGC-style ad variants — Arcads (primary) / HeyGen (explainer lane)

**What it's for:** volume hook-testing in UGC formats — talking-head openers, "get ready with me" framings, hook-line permutations across the five segments before we spend creator budget on winners.

**Why it fits the segments:** /lp/calm and /lp/pour convert on narrative hooks ("day 14 without coffee," "one hand, fifteen seconds") where we need dozens of copy variants; AI actors let us kill 80% of hooks cheaply, then re-shoot the winners with real creators holding real product. HeyGen's avatar lane suits /lp/focus label-explainer formats.

**Workflow note — disclosure guidance (non-negotiable):**
- AI-actor ads never claim personal product experience ("I tried it for 30 days" is off-limits for a synthetic person — that's a fabricated testimonial). They deliver premises, questions, and product facts only.
- Label AI-generated humans per platform rules: TikTok requires the AI-generated content toggle; Meta requires disclosure for photorealistic synthetic people in ads. Do it even where enforcement is lax.
- Real experience narratives come only from real creators with real product, #ad disclosed, "individual results may vary" on results-style content, briefed against `Product/Compliance & Claims/claims-guidelines.md`.
- Anything with a structure/function claim carries the FDA disclaimer regardless of who — or what — is speaking.

---

## 5. Voiceover — ElevenLabs

**What it's for:** VO on b-roll edits, hook-variant testing (same cut, 12 different opening lines), multilingual tests later, and scratch VO to time edits before a human session.

**Why it fits the segments:** each segment wants a different vocal energy — bright and conspiratorial for /lp/ritual (the matcha maximalists; ASMR texture stays, whisper-wellness delivery goes), warm and wry for /lp/pour mom-humor, precise and calm for /lp/focus. Design one saved voice per segment for consistency (name them after the LP slugs).

**Workflow note:** never clone the founder's voice or any real person's. Founder-voice content is recorded by the founder — that authenticity is a brand asset (see the NOT list). Disclose synthetic VO where platform rules require; keep VO scripts inside compliance language.

---

## 6. Editing & assembly — CapCut (desktop), Premiere for hero work

**What it's for:** all vertical assembly — captions in Syne, end-cards, the drop-countdown sticker templates, auto-captioning, 9:16/4:5/1:1 reformatting.

**Why it fits the segments:** CapCut's template + batch tools let one editor version a winning cut across five segments and three aspect ratios in an afternoon; its native TikTok-pacing instincts match where the media budget lives. Premiere handles the flagship swirl film and anything going on the site.

**Workflow note:** build one CapCut brand template per segment (fonts, accent colors, watermark, end-card per creative-direction.md) so every variant ships on-system. All cuts end on the shared end-card: real sachet packshot + drop-status line ("drop 002 — limited run") + `get drop access`.

---

## Standing production pipeline (weekly)

1. **Mon:** hook-copy batch per segment (marketing) → Arcads/HeyGen variant generation
2. **Tue:** Firefly/Runway b-roll batch to fill gaps; ElevenLabs VO passes
3. **Wed:** CapCut assembly — 10+ variants per priority segment
4. **Thu:** compliance pass (claims language, disclaimers, AI-disclosure toggles) → traffic
5. **Fri:** kill/scale review; winning AI-tested hooks queued for REAL creator/product re-shoots

---

## What NOT to AI-generate (override list — no exceptions, no "just this once")

1. **The sachets and any packshot.** The sachet design is locked and untouchable (image-guidelines). No generation, no AI modification, no "cleanup" that touches the pouch or label. Real photography only, and AI concepting comps never leave internal review.
2. **The nutrition/supplement facts panel and any label text.** A hallucinated dose is a regulatory incident, not a typo. Panels are rendered from source design files only.
3. **The real pour and swirl for taste credibility.** The hero pour/swirl macro footage — the moment that sells taste — must be real concentrate hitting real milk. AI liquid is for stylized dream inserts only, never passed off as product.
4. **The founder's face and voice.** No avatar founder, no voice clone, no synthetic founder-to-camera. Community content (content-pillars: founder is a real person making this happen) trades entirely on authenticity.
5. **Testimonials and experience claims.** No AI actor may say they used, tasted, or felt anything. No fabricated reviews, ratings, or "customer" quotes in any medium.
6. **Third-party trust artifacts.** Lab certificates, test results, press logos, "as seen in" imagery — real documents or nothing.
7. **People drinking the product in ad-final footage.** Consumption moments = real humans, real drink. (AI background extras in stylized wides are acceptable; a synthetic person sipping is not.)

If a deliverable is blocked because the real asset doesn't exist yet, the answer is "shoot it," never "generate it."
