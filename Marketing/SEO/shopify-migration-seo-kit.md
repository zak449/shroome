# Shopify Migration — SEO & Analytics Continuity Kit

> **Owner:** SEO & Analytics Continuity Engineer
> **Date:** July 14, 2026
> **Mission:** 1:1 carryover of everything that currently indexes and tracks on drinkshroome.com (Next.js/Vercel) to the Shopify store. Zero lost rankings, zero lost analytics continuity.
> **Canonical host:** `https://www.drinkshroome.com` (non-www 301s to www — must be preserved on Shopify)
> **GA4 property:** `G-60FPK4E1PF` — **KEEP IT. Do not create a new property.**
> **Companion files:**
> - `Product/SKU Catalog/shopify-redirects.csv` — Shopify URL-redirect import (53 rows)
> - `scripts/shopify-theme-snippets/` — production Liquid snippets + install README
> - `Product/SKU Catalog/sku-catalog.md` + `scripts/shopify-seed.mjs` — catalog source of truth (handles: `shroome-vanilla`, `shroome-strawberry`, `shroome-variety-pack`, `shroome-first-pour-kit`)

---

## 0. Current-Site Inventory (what must survive)

**48 indexed URLs** in `app/sitemap.ts`: 12 static pages + 27 blog posts + 9 recipes.
Plus 4 deliberately non-indexed routes (`/founders/checkout`, `/founders/success`, `/dashboard`, `/unsubscribe`) and 2 legacy redirects (`/matcha` → `/`, `/vanilla` → `/`) in `next.config.ts`.

**robots.txt today:** allow all; disallow `/api/`, `/dashboard/`, `/unsubscribe/`; sitemap at `https://www.drinkshroome.com/sitemap.xml`.

**Schema types live today (10):** Organization, WebSite, Product (×3: variety/home, vanilla, strawberry), BreadcrumbList (7 templates), FAQPage (15 Q&As), Blog, BlogPosting (×27), Recipe (×9), plus nested AggregateRating/Review/Offer/MerchantReturnPolicy/OfferShippingDetails.

**GA4 events live today (9 distinct names):** `sign_up`, `generate_lead`, `begin_checkout`, `purchase`, `share`, `select_promotion`, `section_view`, `scroll_depth`, `engaged_time` (full map in §3).

---

## 1. Page-by-Page Mapping Table

Shopify destinations use the **real catalog handles** already defined in `Product/SKU Catalog/sku-catalog.md`. `TBD-handle` = page handle not yet created in Shopify admin; create it with exactly this handle so the redirects CSV stays valid.

### 1a. Core pages

| Current URL | Shopify URL | Title to carry | Meta description to carry | Canonical | Schema to carry | Target keywords visible in metadata |
|---|---|---|---|---|---|---|
| `/` | `/` (theme homepage) | `shroomé — Café Energy. Home Address.` | "Ceremonial matcha meets functional mushrooms. 2.5g. One sachet. Pour over your latte base and feel the shift. Join the pre-launch list for 20% off + free shipping on your first order." | `https://www.drinkshroome.com/` | Organization, WebSite, **Product** (name "shroomé Ceremonial Matcha Latte", sku `SHROOME-VARIETY-12`, mpn `SHROOME-V1`, $36.00 USD, PreOrder, aggregateRating 5/12, 6 additionalProperty facts, return policy 30-day free, free US shipping 1–3d handling / 3–7d transit) | ceremonial matcha latte, functional mushrooms, beta-glucans, collagen peptides, ready to pour matcha, coffee alternative, L-theanine |
| `/flavors/vanilla` | `/products/shroome-vanilla` | `Vanilla — shroomé \| Ready-to-Pour Vanilla Matcha Latte` | "shroomé Vanilla — ceremonial matcha meets real vanilla bean extract, functional mushroom extracts, and grass-fed collagen peptides. One sachet, 15 seconds, zero compromise." | self | Product (sku `SHROOME-VANILLA-12` → operational `SHR-VAN-12`, mpn `SHROOME-VAN-V1`, $36.00, PreOrder, aggregateRating 5/8, review 2026-02-15), BreadcrumbList (Home → Vanilla) | vanilla matcha latte, shroomé vanilla, ready to pour matcha, matcha with collagen, functional mushroom matcha |
| `/flavors/strawberry` | `/products/shroome-strawberry` | `Strawberry — shroomé \| Ready-to-Pour Strawberry Matcha Latte` | "shroomé Strawberry — ceremonial matcha meets real freeze-dried strawberry, functional mushroom extracts, and grass-fed collagen peptides. One sachet, 15 seconds, zero compromise." | self | Product (sku `SHROOME-STRAWBERRY-12` → operational `SHR-STR-12`, mpn `SHROOME-STR-V1`, $36.00, PreOrder, aggregateRating 5/6, review 2026-02-20), BreadcrumbList (Home → Strawberry) | strawberry matcha latte, shroomé strawberry, ready to pour matcha, matcha with collagen |
| `/founders` | `/pages/founders` (TBD-handle; alt: `/products/shroome-first-pour-kit` if the pre-order campaign is retired) | `First Pour Pre-Order — shroomé \| 30% Off + 3 Reorder Codes` | "Pre-order shroomé at 30% off ($25.20 vs $36). Ships June 15 — launch day. Includes 3 reorder codes at 30% off. Ceremonial matcha + lion's mane + collagen." | self | none today (opportunity: add Offer/Product) | shroomé pre-order, matcha pre-order discount, shroomé first pour, shroomé 30% off |
| `/faq` | `/pages/faq` (TBD-handle) | `FAQ — shroomé \| Café Energy. Home Address.` | "Frequently asked questions about shroomé — the world's first ready-to-pour ceremonial matcha latte. 2.5g matcha, 2g collagen, real mushrooms. Learn about ingredients, how to pour, caffeine content, and more." | self | **FAQPage (15 Questions in 4 categories)**, BreadcrumbList | shroomé faq, ready to pour matcha, liquid matcha, matcha with collagen, matcha alternative to coffee |
| `/contact` | `/pages/contact` (TBD-handle) | `Contact — shroomé` | "Get in touch with shroomé. Questions about your order, press inquiries, or just want to say hi — we're real people who actually respond." | self | none | brand/navigational |
| `/refer` | `/pages/refer` (TBD-handle) | `Give $5, Get $5 — Refer Friends to shroomé` | "Share shroomé with friends. They get $5 off their first box. You get $5 credit for every friend who orders. No limit. Unlock free boxes, merch, and VIP status." | self | none | referral/brand |
| `/welcome` | `/pages/welcome` (TBD-handle — ad landing page; keep out of nav) | `shroomé — The Matcha Latte That Replaced Our Coffee` | "2.5g ceremonial matcha, functional mushroom extracts (70%+ beta-glucans), and grass-fed collagen peptides in one sachet. The coffee alternative that actually works. Join the waitlist for 20% off + free shipping." | self | none | coffee alternative, mushroom coffee, lion's mane, reishi, nootropics, adaptogenic drinks |
| `/terms` | `/policies/terms-of-service` (Shopify native policy page) | `Terms of Service — shroomé \| Café Energy. Home Address.` | "Terms of Service for drinkshroome.com, operated by ZSQUARED INC. Read our terms before using the site." | self | none | — |
| `/privacy` | `/policies/privacy-policy` (Shopify native) | `Privacy Policy — shroomé \| Café Energy. Home Address.` | "How shroomé collects, uses, and protects your information. Read our full privacy policy." | self | none | — |
| `/unsubscribe` | `/pages/unsubscribe` (TBD-handle) or Klaviyo preference page | (none — noindex today via robots disallow) | — | — | none | keep **noindexed** (`seo.hidden` metafield = 1) |
| `/founders/checkout`, `/founders/success` | Shopify checkout + native order-status/thank-you page | not indexed (canonical inherits `/founders`) | — | — | none | redirect both to `/pages/founders` (see CSV) |
| `/dashboard` | retire (internal waitlist dashboard; robots-disallowed today) | — | — | — | — | redirect to `/` |
| `/matcha`, `/vanilla` (legacy 301s) | keep as Shopify redirects: `/matcha` → `/`, `/vanilla` → `/products/shroome-vanilla` | — | — | — | — | these already carry inbound-link equity; never drop |

### 1b. Blog (`/blog` → `/blogs/journal`)

| Current URL | Shopify URL | Carry over |
|---|---|---|
| `/blog` | `/blogs/journal` | Title `Blog — shroomé \| Matcha, Mushrooms & Wellness`; description "Evidence-based articles on ceremonial matcha, functional mushrooms, collagen, and building a better morning routine. No hype — just real information."; Blog + BreadcrumbList schema |
| `/blog/<slug>` (×27) | `/blogs/journal/<same-slug>` | Per-post title `{post.title} — shroomé`, `post.metaDescription`, canonical self, OG `type=article` with `publishedTime` + author, BlogPosting schema (author Person w/ `worksFor` ZSQUARED INC, publisher shroomé w/ logo-mark.png 200×200, articleSection = category, wordCount, dateModified) + 3-level BreadcrumbList |

**Critical:** create the Shopify blog with handle **`journal`** and each article with the **identical slug** (Shopify auto-slugs from title — override the handle field manually for every post). All 27 slugs are enumerated in `shopify-redirects.csv`. Set each article's "published date" to the original `post.date` so dates in SERPs don't reset.

Authors to preserve: `Zachary Kaufman` (most posts), `shroomé` (press post `shroome-launches-9-matcha-recipes`). Categories: Ingredients, Wellness, How-To, Science, Lifestyle, Education, Press → carry as Shopify article tags (they feed `articleSection` in the Liquid schema).

### 1c. Recipes (`/recipes` → `/blogs/recipes`)

| Current URL | Shopify URL | Carry over |
|---|---|---|
| `/recipes` | `/blogs/recipes` | Title `Recipes — shroomé \| Easy Matcha Latte Recipes`; description "Easy matcha latte recipes using shroomé sachets. Iced matcha latte, matcha smoothie, matcha affogato, and more — all ready in under 2 minutes. The simplest matcha recipes on the internet."; BreadcrumbList |
| `/recipes/<id>` (×9) | `/blogs/recipes/<same-id>` | Per-recipe title `{name} — Easy shroomé Recipe \| Matcha + Mushrooms + Collagen`, curated per-recipe description + keyword set (see `app/recipes/[slug]/layout.tsx` seoMap — copy verbatim into article SEO fields), **Recipe schema** (prepTime/totalTime ISO-8601, recipeIngredient, HowToStep instructions, recipeYield "1 serving", suitableForDiet Vegan+GlutenFree except `matcha-affogato` GlutenFree-only, nutrition "30-50 calories", per-recipe schema keywords), 3-level BreadcrumbList, OG image `https://www.drinkshroome.com{recipe.image}` 1200×630 |

Second Shopify blog with handle **`recipes`**. Recipe schema is NOT emitted by Dawn — needs `json-ld-recipe` treatment: store the recipe fields in article metafields (`recipe.prep_time`, `recipe.total_time`, `recipe.ingredients` (list), `recipe.steps` (list), `recipe.vegan` boolean) and render via a Liquid snippet (pattern identical to `json-ld-product.liquid`; the 9 recipes' data lives in `app/recipes/data.ts`).

---

## 2. JSON-LD Parity Plan

### What Shopify/Dawn emits natively (and why it is NOT enough)

| Schema | Dawn native? | Gap vs. our current markup |
|---|---|---|
| Product | Yes (basic) | Dawn emits name/image/sku/offer price + availability only. **Missing:** `aggregateRating` (5★/12·8·6 reviews), `review` bodies, `additionalProperty` (Caffeine ~60mg, Beta-Glucan 70%+, Ceremonial grade, Grass-fed collagen, 12 servings, 15-sec prep), `manufacturer`/`seller` = **ZSQUARED INC**, `mpn`, `hasMerchantReturnPolicy` (30-day free return by mail), `shippingDetails` (free US, 1–3d handling, 3–7d transit), `priceValidUntil` 2027-12-31, PreOrder availability |
| Organization | Partial (name/logo/url only) | Missing: legal name **ZSQUARED INC**, brand shroomé, alternateName list, founder Zachary Kaufman, foundingDate 2025, CA/US address, `sameAs` (tiktok/instagram/youtube @drinkshroome), contactPoint hello@drinkshroome.com, knowsAbout list |
| WebSite | Yes | acceptable; our alternateName list is a nice-to-have via the org snippet |
| BreadcrumbList | Yes (Dawn 9+) | verify 3-level article breadcrumbs render; else extend snippet |
| FAQPage | **No** | custom Liquid required — `json-ld-faq.liquid` ships all 15 real Q&As |
| BlogPosting | Partial (`Article`) | Dawn emits bare Article; our author/publisher/worksFor/articleSection/wordCount detail needs custom Liquid if parity matters (medium priority — Article vs BlogPosting is rank-neutral, but author E-E-A-T fields are worth carrying) |
| Recipe | **No** | custom Liquid + metafields required (see §1c) — this markup earns recipe rich results today |
| Blog (index) | No | low priority; BreadcrumbList on the blog index is sufficient |

### Where custom values get injected (metafield contract)

All custom snippets in `scripts/shopify-theme-snippets/` read these metafields — create them under **Settings → Custom data → Products / Pages / Articles**:

| Metafield (namespace.key) | Type | Example value | Consumed by |
|---|---|---|---|
| `custom.rating_value` | decimal | `5` | json-ld-product |
| `custom.rating_count` | integer | `8` (vanilla) / `6` (strawberry) / `12` (variety) | json-ld-product |
| `custom.mpn` | single line text | `SHROOME-VAN-V1` | json-ld-product |
| `custom.beta_glucan` | single line text | `70%+ (1,3 and 1,6 linked)` | json-ld-product |
| `custom.caffeine` | single line text | `~60mg per sachet` | json-ld-product |
| `custom.matcha_grade` | single line text | `Ceremonial (first harvest, shade-grown)` | json-ld-product |
| `custom.collagen_source` | single line text | `Grass-fed bovine, hydrolyzed peptides` | json-ld-product |
| `custom.servings` | integer | `12` | json-ld-product |
| `custom.preorder` | boolean | `true` until launch stock arrives | json-ld-product availability switch |
| `custom.seo_title` / `custom.seo_description` | text | per §1 table | meta-tags-override |
| `custom.review_body` / `custom.review_author` / `custom.review_date` / `custom.review_rating` | text | see flavor pages | json-ld-product (single featured review) |

**Availability switch (PreOrder → InStock):** today every Offer says `https://schema.org/PreOrder`. On Shopify the snippet resolves availability as: `custom.preorder == true` → PreOrder; else `product.available` → InStock; else → SoldOut (matches the seed script's inventory-0/deny launch state). Flip = set `custom.preorder` to false + receive inventory; no code change.

**SKU sync (from `sku-catalog.md`):** site JSON-LD uses marketing SKUs (`SHROOME-VANILLA-12` etc.); Shopify variants use operational codes (`SHR-VAN-12` etc.). The product snippet emits **variant SKU as `sku`** and keeps the old marketing code in `mpn`-adjacent continuity via the `custom.mpn` metafield, so Merchant Center/GSC product identifiers stay resolvable.

---

## 3. GA4 Continuity — property `G-60FPK4E1PF`

### Golden rule

**Keep the existing property.** Reporting history, audiences, conversions, and GSC linkage live on the property, not the site. Migration = repoint the same Measurement ID at the new storefront.

### Install path

1. Install the **Google & YouTube channel app** (Shopify admin → Apps). Connect the existing Google account → select GA4 property `G-60FPK4E1PF`. This gives you: pixel on storefront **and checkout** (which theme code cannot reach), native `view_item` / `add_to_cart` / `begin_checkout` / `purchase` with items arrays and transaction IDs, and Consent Mode wiring.
2. Add `snippets/ga4-tracking.liquid` (this kit) for the **custom** events the channel app does not know about (waitlist `sign_up`/`generate_lead`, `share`, `select_promotion`, `section_view`, `scroll_depth`, `engaged_time`). The snippet is **double-install-guarded**: it only bootstraps gtag.js if the channel app hasn't already, and never re-fires `config` page_views if one exists (see comments in the file for the exact decision table).
3. Do NOT also paste the raw gtag snippet into theme.liquid `<head>` alongside the channel app — that double-counts page_view.

### Event mapping (current → Shopify)

| Current event (source file) | Params today | On Shopify |
|---|---|---|
| `config G-60FPK4E1PF` (`app/layout.tsx`) | — | Channel app owns config/page_view |
| `sign_up` (`page.tsx`, `welcome/page.tsx`, `refer/page.tsx`, `ExitPopup.tsx`, `blog/[slug]/BlogCTA.tsx`) | `method`: `waitlist` \| `waitlist_phone` \| `waitlist_email_only`; `event_label`: `homepage`, `welcome_landing`, `refer_page`, `exit_popup`, `exit_popup_phone`, `blog_inline_cta`, `blog_sticky_bar`, `blog_inline_cta_phone`, `blog_sticky_bar_phone` | **Keep verbatim** via `ga4-tracking.liquid` waitlist-form listener (fires on Klaviyo/theme newsletter submit). Preserve `method` + `event_label` values so existing explorations keep working |
| `generate_lead` (same 5 surfaces) | `currency: USD, value: 5.00` | **Keep verbatim** — this is the waitlist-era conversion; keep marked as key event in GA4 |
| `begin_checkout` (`page.tsx` waitlist pseudo-checkout; `founders/page.tsx` value 25.20; `founders/checkout/page.tsx` label `founders_batch`) | mixed | **Retire the waitlist pseudo-`begin_checkout`** (it pollutes ecommerce funnels) — the homepage email-step intent is re-expressed as `generate_lead` funnel. Real `begin_checkout` now comes from the channel app with proper `items[]` |
| `purchase` (`founders/success/page.tsx`) | `event_category: ecommerce, event_label: founders_batch, currency: USD` — **no value, no transaction_id today** | Channel app `purchase` fixes this: real `transaction_id`, `value`, `items[]`. This is an upgrade, not just parity — dedupe and revenue reporting start working |
| `share` (`page.tsx`, `refer/page.tsx`) | `method`: copy_link/instagram/tiktok/text/twitter; `content_type: referral` | Keep verbatim in `ga4-tracking.liquid` (referral module on `/pages/refer`) |
| `select_promotion` (`page.tsx`) | `promotion_name`: `nav_cta_waitlist`, `mobile_nav_cta_waitlist` | Keep for nav CTA in theme header |
| `section_view` (`page.tsx`) | `section_name`, `time_to_section` | Keep — snippet observes `section[id]` exactly as today |
| `scroll_depth` (`page.tsx`) | `percent_scrolled`: 25/50/75/100 | Optional: GA4 Enhanced measurement covers 90% scroll only; keep custom event for the 4-milestone series (registered custom dimension `percent_scrolled` continues) |
| `engaged_time` (`page.tsx`) | `seconds`: 30/60/120/300 | Keep verbatim |
| — new — | `view_item`, `add_to_cart`, `view_cart`, `add_payment_info`, `add_shipping_info` | Free from the channel app; register `add_to_cart` and `purchase` as key events day one |

### Settings checklist

- **Enhanced measurement:** leave ON (page_view, scroll, outbound, site search — map Shopify's `/search?q=` with query param `q`), but rely on our custom `scroll_depth` for milestone analysis.
- **Cross-domain:** modern Shopify checkout stays on `www.drinkshroome.com` — no cross-domain config needed. ONLY if checkout ever renders on `checkout.shopify.com` or a `*.myshopify.com` interstitial appears, add both domains under Admin → Data streams → Configure tag settings → Configure your domains. Also add `www.drinkshroome.com` referral exclusion sanity check so sessions don't split at checkout.
- **Consent Mode v2:** required for EEA traffic and for Google ads modeling. The channel app + Shopify's Customer Privacy API handle `ad_storage`/`ad_user_data`/`ad_personalization`/`analytics_storage` defaults; `ga4-tracking.liquid` sets a `default` denied-until-consent block **only when the channel app hasn't** (guarded). Turn on Shopify Settings → Customer privacy → cookie banner for EEA/UK regions.
- **Key events (conversions):** keep `generate_lead` + `sign_up`; add `purchase`, `begin_checkout`, `add_to_cart`. Do not delete the old ones — historical conversion continuity.
- **Data stream:** keep the existing Web stream for `www.drinkshroome.com`. Same stream, same Measurement ID → sessions and user counts remain comparable pre/post cutover.
- **Referral exclusions / unwanted referrals:** confirm no `vercel.app` ghost referrals post-cutover.

---

## 4. Google Search Console Continuity

- We hold (or should hold) a **Domain property** for `drinkshroome.com` (DNS-verified). A domain property **survives the host/CMS change untouched** — DNS TXT verification is independent of Vercel. Verify TODAY (pre-cutover) that the DNS TXT record `google-site-verification=...` lives at the DNS zone (Cloudflare/registrar), NOT as a Vercel-managed record that dies with the project. If verification is currently meta-tag or file based on Vercel, add the DNS TXT method NOW.
- **Sitemap:** Shopify auto-generates `/sitemap.xml` (index → products/pages/blogs children). On cutover day, in GSC: remove nothing, just **submit `https://www.drinkshroome.com/sitemap.xml` again** (same URL — contents change, path doesn't; Next.js served the same path). Also submit to Bing Webmaster Tools.
- **Robots parity:** Shopify's default robots.txt disallows `/checkout`, `/cart`, `/account`, `/search` etc. Our current disallows (`/api/`, `/dashboard/`, `/unsubscribe/`) are covered by redirects + Shopify defaults; add `/pages/unsubscribe` via `robots.txt.liquid` template or the page `seo.hidden` metafield (noindex).
- **Coverage monitoring during cutover:** GSC → Indexing → Pages, daily for 14 days. Expect: "Page with redirect" count rising (good — that's the 53 redirects being consumed), "Crawled – currently not indexed" transient spikes, and re-crawl of the 48 canonical URLs. Use URL Inspection → Request indexing for the top 10 URLs on day 0.
- **Expected crawl dip:** a 5–15% impression dip for 1–3 weeks is normal on a same-domain replatform with clean 301s. Escalate only if: (a) clicks down >25% at day 14, (b) any of the top-10 URLs shows "Not indexed" at day 7, or (c) rich results (FAQ/Recipe/Product) drop out of the Enhancements reports — that means a schema snippet isn't rendering.
- Keep the GA4 ↔ GSC link intact (it links to the property — untouched).

---

## 5. Pixels (start paid attribution clean)

| Pixel | Install path | Notes |
|---|---|---|
| **Meta Pixel + Conversions API** | **Facebook & Instagram channel app** (Shopify admin) | Connect the existing Business Manager pixel if one exists; otherwise create under the ZSQUARED INC BM before launch ads. App gives browser pixel + server-side CAPI with event dedup — never hand-paste the pixel base code as well |
| **TikTok Pixel + Events API** | **TikTok channel app** | Same pattern: app-managed pixel + server events. @drinkshroome TikTok is the primary organic channel — install before any Spark Ads so ViewContent/AddToCart/Purchase seed the ad account's learning from day one |
| GA4 | Google & YouTube channel app (§3) | — |

All three apps read Shopify's Customer Privacy consent state — one banner governs everything (Consent Mode v2 compliant).

---

## 6. Cutover-Day Runbook

**T-7 to T-1 (prep):**
1. Theme complete on `*.myshopify.com` preview: all snippets from `scripts/shopify-theme-snippets/` installed per its README; metafields populated per §2; both blogs (`journal`, `recipes`) fully populated with matching slugs and original publish dates.
2. Import `Product/SKU Catalog/shopify-redirects.csv` (Settings → Navigation → URL redirects → Import). Verify count = 53.
3. Channel apps installed and connected (Google & YouTube → `G-60FPK4E1PF`, Meta, TikTok). Test on preview domain with GA4 DebugView.
4. Confirm GSC domain-property DNS TXT record is registrar-level (§4). Lower DNS TTL to 300s.
5. Shopify domains: add `drinkshroome.com` + `www.drinkshroome.com`; set **`www.drinkshroome.com` as primary** → Shopify then 301s non-www → www automatically (parity with today's `next.config.ts` host redirect).

**T-0 (switch order):**
1. Freeze content/deploys on Vercel.
2. Point DNS: `A @ → 23.227.38.65` (or Shopify's current IP/ANAME instruction shown in admin) and `CNAME www → shops.myshopify.com`. Do NOT delete the GSC TXT record.
3. Wait for cert issuance on both hosts (Shopify auto-TLS); confirm `https://drinkshroome.com/anything` → 301 → `https://www.drinkshroome.com/anything`.
4. **Run the redirect verification script** (below) from any machine; require 100% pass.
5. GSC: resubmit `sitemap.xml`; URL-Inspect + Request Indexing for top 5 (below).
6. GA4 Realtime check: open homepage, a product page, add to cart, reach checkout → see `page_view`, `view_item`, `add_to_cart`, `begin_checkout` in Realtime with the SAME property. Submit a test waitlist/newsletter signup → see `sign_up` + `generate_lead` (value 5.00 USD).
7. **Rich Results Test (https://search.google.com/test/rich-results) on the top 5 URLs:**
   - `https://www.drinkshroome.com/` — Organization + Product (rating 5, $36, availability)
   - `https://www.drinkshroome.com/products/shroome-vanilla` — Product + Breadcrumb
   - `https://www.drinkshroome.com/products/shroome-strawberry` — Product + Breadcrumb
   - `https://www.drinkshroome.com/pages/faq` — FAQPage (15 questions detected)
   - `https://www.drinkshroome.com/blogs/recipes/classic-iced-matcha-latte` — Recipe
8. Keep the Vercel project alive but dark for 30 days (instant rollback = DNS revert).

**Redirect verification script** (also usable pre-cutover against preview with `-H "Host: ..."`):

```bash
#!/usr/bin/env bash
# verify-redirects.sh — run: bash verify-redirects.sh "Product/SKU Catalog/shopify-redirects.csv"
HOST="https://www.drinkshroome.com"; FAIL=0
tail -n +2 "${1:?csv path required}" | while IFS=, read -r FROM TO; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HOST$FROM")
  LOC=$(curl -s -o /dev/null -w "%{redirect_url}" "$HOST$FROM")
  if [[ "$CODE" == "301" && "$LOC" == "$HOST$TO"* ]]; then
    echo "PASS  $FROM -> $TO"
  else
    echo "FAIL  $FROM  got $CODE -> $LOC (want 301 -> $HOST$TO)"; FAIL=1
  fi
done
# Host-level parity checks
for u in "https://drinkshroome.com/" "https://drinkshroome.com/faq"; do
  echo "HOST-CHECK $u -> $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$u")"
done
exit $FAIL
```

**T+1 to T+3:** re-run script daily; watch GSC Coverage + GA4 Realtime vs. same weekday last week.

---

## 7. KPI Watchlist — 30 Days Post-Cutover

| KPI | Source | Baseline (pre-cutover) | Alarm threshold |
|---|---|---|---|
| Organic clicks / impressions (site total) | GSC Performance | export final 28-day window from Vercel era on T-1 | clicks −25% at day 14 |
| Rankings: "ready to pour matcha", "matcha latte with collagen", "strawberry matcha latte", "vanilla matcha latte", "mushroom matcha", brand terms (shroomé / drinkshroome) | GSC queries + rank tracker | capture T-1 | any top-10 term drops >5 positions for >7 days |
| Indexed pages | GSC Pages report | 48 | <40 indexed at day 21 |
| "Page with redirect" count | GSC | 0 | should rise toward ~53 then plateau — if 0 after day 7, redirects aren't being crawled |
| Rich result eligibility (Product, FAQ, Recipe, Breadcrumb) | GSC Enhancements + weekly Rich Results Test on top 5 | all valid | any type drops to 0 valid items |
| 404s | Shopify admin → Analytics → top online store searches/404 report + GSC Not found | ~0 | any 404 with >5 hits/week → add redirect |
| GA4 daily users & sessions | GA4 (same property — direct comparability) | T-30→T-1 average | −20% WoW beyond seasonal |
| `generate_lead` + `sign_up` count | GA4 key events | current waitlist run-rate | −30% day-over-day after cutover (form listener broken) |
| `purchase` events carry transaction_id + value | GA4 → Monetization | n/a (new) | any purchase missing transaction_id = channel app misconfig |
| (dis)continuity check: session source/medium at checkout | GA4 | — | spike in `www.drinkshroome.com / referral` self-referrals = cross-domain/exclusion issue |
| Core Web Vitals | GSC CWV report | current field data | LCP "poor" URLs > 10% at day 28 (Dawn is usually fine; watch app bloat) |
| Waitlist→customer email flows still firing | Klaviyo/ESP | — | zero flow triggers in 24h |

---

## 8. Known deltas & decisions log

- Homepage Product schema (variety, `SHROOME-VARIETY-12`) maps to product `shroome-variety-pack`; decide whether the Shopify homepage keeps a Product block (snippet supports rendering it with the variety product handle) or the schema moves exclusively to `/products/shroome-variety-pack`. Recommendation: move it to the product page; keep Organization + WebSite only on `/` (Google increasingly ignores homepage Product markup without a buyable module).
- `priceValidUntil: 2027-12-31` and the 30-day free return policy values are encoded in `json-ld-product.liquid` — keep in sync with the actual Shopify return policy you publish.
- The waitlist-era `begin_checkout` on email focus is intentionally retired (§3) — flag in the GA4 annotations panel on cutover day ("replatform: begin_checkout semantics now ecommerce-true").
- Aggregate ratings are self-reported early-taster counts (12/8/6). Once real Shopify reviews exist (Judge.me/Loox), switch `custom.rating_*` metafields to the review app's values — never emit both.
- `sku-catalog.md` formulation flag (2g vs 2.5g matcha) also appears in schema/FAQ copy — resolve before re-typing content into Shopify so we don't index contradictory claims.
