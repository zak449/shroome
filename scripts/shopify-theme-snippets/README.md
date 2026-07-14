# shroomé — Shopify Theme Snippets (SEO & Analytics Continuity)

Production Liquid snippets that carry the current drinkshroome.com metadata,
JSON-LD, and GA4 tracking (property `G-60FPK4E1PF`) onto the Shopify store 1:1.

Companion docs:
- `Marketing/SEO/shopify-migration-seo-kit.md` — master mapping + metafield contract (§2) + cutover runbook
- `Product/SKU Catalog/shopify-redirects.csv` — URL redirect import
- `scripts/README-shopify.md` + `scripts/shopify-seed.mjs` — catalog seeding (run first; creates the 4 products these snippets decorate)

## Files

| File | Purpose | Renders on |
|---|---|---|
| `ga4-tracking.liquid` | gtag bootstrap (guarded against the Google & YouTube channel app) + custom events: `sign_up`, `generate_lead`, `share`, `select_promotion`, `section_view`, `scroll_depth`, `engaged_time` | every page |
| `json-ld-organization.liquid` | ZSQUARED INC Organization + WebSite schema (founder, sameAs socials, contactPoint) | every page |
| `json-ld-product.liquid` | Full Product schema from `product` + metafields (aggregateRating, beta-glucan/caffeine facts, return policy, shipping, PreOrder→InStock switch) | product pages |
| `json-ld-faq.liquid` | FAQPage schema — all 15 real Q&As + FAQ breadcrumb | `/pages/faq` |
| `meta-tags-override.liquid` | Title/description/canonical parity where Dawn defaults differ (no title suffixing, forced `www.drinkshroome.com` canonical host, homepage description, keywords meta, unsubscribe noindex) | every page |

## Install — Dawn theme, exact steps

1. **Upload snippets.** Shopify admin → Online Store → Themes → (Dawn copy) →
   `...` → **Edit code** → Snippets → *Add a new snippet* for each of:
   `ga4-tracking`, `json-ld-organization`, `json-ld-product`, `json-ld-faq`,
   `meta-tags-override` — paste each file's contents (the `.liquid` extension
   is added automatically).

2. **Wire into `layout/theme.liquid`** inside `<head>`:

   a. Find Dawn's default head block:
      ```liquid
      <title> ... </title>
      {% if page_description %}<meta name="description" content="{{ page_description | escape }}">{% endif %}
      <link rel="canonical" href="{{ canonical_url }}">
      ```
      **Replace those three lines** with:
      ```liquid
      {% render 'meta-tags-override' %}
      ```
      Leave `{% render 'meta-tags' %}` in place but AFTER the override (first
      og: tag wins), or delete the duplicated og:/twitter: tags from
      `snippets/meta-tags.liquid`.

   b. Just above `</head>`, add:
      ```liquid
      {% render 'json-ld-organization' %}
      {%- if request.page_type == 'product' -%}
        {% render 'json-ld-product', product: product %}
      {%- endif -%}
      {%- if request.page_type == 'page' and page.handle == 'faq' -%}
        {% render 'json-ld-faq' %}
      {%- endif -%}
      {% render 'ga4-tracking' %}
      ```

3. **Disable Dawn's duplicate schema** (one entity, one block):
   - Dawn 15+: `snippets/structured-data.liquid` — comment out the
     `Organization`, `WebSite`, and `Product` JSON-LD branches (keep
     `BreadcrumbList` if present).
   - Older Dawn: the Product block lives in `sections/main-product.liquid`
     (search `application/ld+json`) and Organization/WebSite in
     `layout/theme.liquid`.

4. **Create metafield definitions** (Settings → Custom data) per the table in
   `shopify-migration-seo-kit.md` §2, then populate on each product:
   - `shroome-vanilla`: rating 5 / count 8, mpn `SHROOME-VAN-V1`, review dated 2026-02-15
   - `shroome-strawberry`: rating 5 / count 6, mpn `SHROOME-STR-V1`, review dated 2026-02-20
   - `shroome-variety-pack`: rating 5 / count 12, mpn `SHROOME-V1`
   - all: caffeine `about 60mg per sachet`, **leave `beta_glucan` blank** (unsubstantiated
     until a supplier CoA — do not seed "70%+" per 2026-07 claims audit),
     matcha_grade `Ceremonial (first harvest, shade-grown)`,
     collagen_source `Grass-fed bovine, hydrolyzed peptides`, servings `12`,
     `preorder = true` (flip to false at launch — this switches schema
     availability from PreOrder to InStock automatically).

5. **GA4 hooks in theme markup:**
   - Header CTA link/button: add `data-ga4-promo="nav_cta_waitlist"`;
     mobile drawer CTA: `data-ga4-promo="mobile_nav_cta_waitlist"`.
   - Referral share buttons on `/pages/refer`: `data-ga4-share="copy_link"`,
     `"instagram"`, `"tiktok"`, `"text"`, `"twitter"`.
   - Optional: wrap any signup section in `data-ga4-label="homepage"` (etc.)
     to control the `event_label` on `sign_up`.

6. **Order of operations with the Google & YouTube channel app:** install the
   app and connect property `G-60FPK4E1PF` BEFORE launch. The snippet detects
   the app's tag and will not double-install; if you preview the theme before
   the app is connected, the snippet bootstraps gtag itself so events still
   flow. Never paste an additional raw gtag snippet anywhere else.

7. **Validate** (per the cutover runbook §6):
   - Rich Results Test the homepage, both flavor product pages, `/pages/faq`,
     and one recipe article.
   - GA4 DebugView: newsletter submit → `sign_up` + `generate_lead`
     (value 5.00 USD); scroll a long page → `scroll_depth` 25/50/75/100;
     idle 30s → `engaged_time`.
   - `view-source:` one product page — confirm exactly ONE Product JSON-LD
     block and ONE Organization block.

## Not included here (by design)

- **Recipe schema** for the 9 `/blogs/recipes/*` articles — follow the same
  pattern as `json-ld-product.liquid` with article metafields; source data
  lives in `app/recipes/data.ts` and the mapping in the migration kit §1c.
- Checkout/purchase tracking — owned entirely by the Google & YouTube channel
  app (theme code cannot execute on checkout).
