# layout/theme.liquid Patch — GA4 + JSON-LD Snippet Wiring (Dawn 15.x)

Wires the five production snippets in `scripts/shopify-theme-snippets/` into the theme.
Full background: `scripts/shopify-theme-snippets/README.md`.

## Step 1 — Create five snippet files via themeFilesUpsert

Upsert each local file's **verbatim contents** to the theme path on the right
(all five can go in ONE `themeFilesUpsert` batch; these are net-new files, no
merge needed):

| Local source (repo)                                              | Theme filename                        |
|------------------------------------------------------------------|---------------------------------------|
| `scripts/shopify-theme-snippets/ga4-tracking.liquid`             | `snippets/ga4-tracking.liquid`         |
| `scripts/shopify-theme-snippets/json-ld-organization.liquid`     | `snippets/json-ld-organization.liquid` |
| `scripts/shopify-theme-snippets/json-ld-product.liquid`          | `snippets/json-ld-product.liquid`      |
| `scripts/shopify-theme-snippets/json-ld-faq.liquid`              | `snippets/json-ld-faq.liquid`          |
| `scripts/shopify-theme-snippets/meta-tags-override.liquid`       | `snippets/meta-tags-override.liquid`   |

## Step 2 — Edit `layout/theme.liquid` (fetch → edit → upsert whole file)

`themeFilesUpsert` replaces the whole file, so FETCH the current
`layout/theme.liquid` first, save the original to `backup/`, apply the two edits
below to the fetched text, then upsert the edited full body.

### Edit A — replace Dawn's title/description/canonical block

FIND this block in `<head>` (Dawn 15 default; whitespace may vary — anchor on the
`<title>` open tag and the `canonical_url` line):

```liquid
    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}
```

REPLACE the whole block (title + description conditional) with the single line:

```liquid
    {% render 'meta-tags-override' %}
```

ALSO find the canonical line (it sits ABOVE the title block in Dawn 15, near
`<link rel="preconnect" ...>`):

```liquid
    <link rel="canonical" href="{{ canonical_url }}">
```

DELETE that line (the override snippet emits its own forced
`www.drinkshroome.com` canonical).

Leave Dawn's `{% render 'meta-tags' %}` in place — it must come AFTER
`{% render 'meta-tags-override' %}` (first og: tag wins).

### Edit B — insert JSON-LD + GA4 before `</head>`

FIND (end of head — the context immediately before is Dawn's
`{{ content_for_header }}` / script tags; anchor simply on the closing tag):

```liquid
  </head>
```

INSERT immediately BEFORE it:

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

Result shape:

```liquid
    ...existing last head lines...
    {% render 'json-ld-organization' %}
    {%- if request.page_type == 'product' -%}
      {% render 'json-ld-product', product: product %}
    {%- endif -%}
    {%- if request.page_type == 'page' and page.handle == 'faq' -%}
      {% render 'json-ld-faq' %}
    {%- endif -%}
    {% render 'ga4-tracking' %}
  </head>
```

Use `{% render %}` (not the deprecated `{% include %}`) — all five snippets are
written for `render` scope; `json-ld-product` receives `product` explicitly.

## Step 3 — Disable Dawn's duplicate structured data (one entity, one block)

Fetch `snippets/structured-data.liquid` (Dawn 15 location; save original to
`backup/`). Comment out the `Organization`, `WebSite`, and `Product` JSON-LD
branches by wrapping each branch's output in `{% comment %} ... {% endcomment %}`
— keep the `BreadcrumbList` branch if present. If the file does not exist on the
live theme (older Dawn), the Product block lives in
`sections/main-product.liquid` (search `application/ld+json`) and
Organization/WebSite inline in `layout/theme.liquid` — same treatment.

## Verify after apply

- `view-source:` on the preview URL: exactly ONE Organization JSON-LD block,
  ONE Product block on a product page, no duplicate `<title>`/canonical.
- GA4 DebugView (property `G-60FPK4E1PF`): page_view fires; newsletter submit
  fires `sign_up` + `generate_lead`.
- The gtag snippet self-guards against the Google & YouTube channel app — never
  add another raw gtag snippet elsewhere.
