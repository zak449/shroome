# Apply Runbook — Shroomé Dawn Theme Customization via Admin GraphQL

Store: `shroome-3.myshopify.com` · Theme: default Dawn 15.x · API version: `2025-07`
(any ≥ `2024-07` supports `themeFilesUpsert`).

Payload files in this directory:

| File | Applies to | Mode |
|---|---|---|
| `settings_data.patch.json` | `config/settings_data.json` | **MERGE into fetched file** |
| `index.template.json` | `templates/index.json` | Full replace (safe — default Dawn homepage) |
| `announcement.patch.md` | `sections/header-group.json` | **MERGE into fetched file** |
| `theme-layout.patch.md` | `layout/theme.liquid` + 5 new `snippets/*.liquid` + `snippets/structured-data.liquid` | Snippets: new files. theme.liquid/structured-data: **fetch → edit → upsert** |

> **CRITICAL — themeFilesUpsert OVERWRITES the entire file.** Every "MERGE" file must
> be fetched first, patched in memory, and the FULL merged body sent back. Blindly
> uploading `settings_data.patch.json` as `config/settings_data.json` would wipe every
> other theme setting (header/logo config, all other schemes, presets). Same for
> `header-group.json` (contains live nav settings) and `layout/theme.liquid`.

---

## Step 0 — Prerequisites

- The featured-collection section points at collection handle **`the-drop`**. Create a
  manual collection (title: `the drop`, handle `the-drop`) containing the 4 products
  `shroome-vanilla`, `shroome-strawberry`, `shroome-variety-pack`,
  `shroome-first-pour-kit` BEFORE applying, or the section renders placeholder cards.
  All variants are 0/deny → Dawn shows "Sold out" badges automatically.
- Work on an **unpublished duplicate** of Dawn if possible (Admin → Themes → Duplicate)
  and only publish after eyeballing the preview. If editing the live theme directly,
  the backup step below is your only rollback.

## Step 1 — Find the theme ID

```graphql
query ThemeList {
  themes(first: 5) {
    nodes { id name role }
  }
}
```

Take the node with `role: MAIN` (or the duplicate's id if staging). The `id` is a GID
like `gid://shopify/OnlineStoreTheme/123456789` — the numeric tail is used in the
preview URL later.

## Step 2 — Fetch current file bodies (and back them up)

```graphql
query ThemeFiles($themeId: ID!, $filenames: [String!]!) {
  theme(id: $themeId) {
    files(filenames: $filenames, first: 10) {
      nodes {
        filename
        body {
          ... on OnlineStoreThemeFileBodyText { content }
        }
      }
    }
  }
}
```

Variables:

```json
{
  "themeId": "gid://shopify/OnlineStoreTheme/<ID>",
  "filenames": [
    "config/settings_data.json",
    "sections/header-group.json",
    "templates/index.json",
    "layout/theme.liquid",
    "snippets/structured-data.liquid"
  ]
}
```

**Save each fetched body VERBATIM to `scripts/shopify-theme-edits/backup/<filename>`**
(e.g. `backup/config--settings_data.json`, `backup/layout--theme.liquid`) before any
mutation. This is the rollback set.

## Step 3 — Build merged bodies locally

1. **`config/settings_data.json`** — parse the fetched JSON; deep-merge every key of
   `settings_data.patch.json` into the fetched `current` object:
   - `color_schemes.scheme-1/2/3` → replace those three schemes' `settings` objects
     key-by-key (keep any extra keys a scheme already has; keep scheme-4/5 untouched).
   - All other patch keys (`type_header_font`, `page_width`, radii, …) → set at the top
     level of `current`.
   - Note: on a fresh Dawn install `current` may be a preset NAME (a string like
     `"Default"`) instead of an object. If so, copy the matching object out of
     `presets`, set it as `current`, then merge.
   - Serialize the WHOLE file (`current` + `presets`) back to a string.
2. **`templates/index.json`** — use `index.template.json` verbatim as the full body.
3. **`sections/header-group.json`** — merge per `announcement.patch.md`.
4. **`layout/theme.liquid`** + **`snippets/structured-data.liquid`** — edit fetched
   text per `theme-layout.patch.md`.
5. **Five new snippets** — verbatim bodies from `scripts/shopify-theme-snippets/*.liquid`.

Lint every JSON body before upserting: `node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" <file>`.

## Step 4 — Upsert (batched ≤ 10 files per mutation)

Mutation text (same for every batch):

```graphql
mutation UpsertThemeFiles($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
  themeFilesUpsert(themeId: $themeId, files: $files) {
    upsertedThemeFiles { filename }
    userErrors { field message code }
  }
}
```

Variables shape:

```json
{
  "themeId": "gid://shopify/OnlineStoreTheme/<ID>",
  "files": [
    {
      "filename": "config/settings_data.json",
      "body": { "type": "TEXT", "value": "<FULL MERGED FILE CONTENT AS ONE JSON-ESCAPED STRING>" }
    }
  ]
}
```

Suggested batches (order matters — snippets must exist before theme.liquid renders them):

- **Batch 1 (5 files):** the five new `snippets/*.liquid` (ga4-tracking,
  json-ld-organization, json-ld-product, json-ld-faq, meta-tags-override).
- **Batch 2 (5 files):** `config/settings_data.json` (merged),
  `templates/index.json`, `sections/header-group.json` (merged),
  `layout/theme.liquid` (edited), `snippets/structured-data.liquid` (edited).

Check `userErrors` after each batch — a schema-invalid section setting in a JSON
template surfaces here (code `THEME_FILES_INVALID` / validation message naming the
offending key). If a key is rejected, delete that one key from the payload and retry;
everything else in these payloads is deliberately conservative.

## Step 5 — Verify

Preview URL (works for unpublished themes):
`https://shroome-3.myshopify.com/?preview_theme_id=<numeric theme id>`

Eyeball checklist:

- [ ] Announcement bar: lime (`#C8FF3A`) bar, ink text, "drop 001 sold out — drop 002
      loading. waitlist gets in first →", whole bar links to drinkshroome.com.
- [ ] Hero: ink text box on banner, "the first pour is gone." in the serif display
      font, lime "get drop access" button → `https://www.drinkshroome.com/drop`.
      (No hero image was set — Dawn shows its placeholder art. Upload a brand image in
      the theme editor when the hero asset lands; the copy/settings survive.)
- [ ] Stack story rich-text on canvas `#FDF4EE`.
- [ ] Featured collection: 4 product cards, each with automatic "Sold out" badge.
- [ ] FDA disclaimer rich-text present above the footer sections.
- [ ] Newsletter section: ink background, canvas text, lime submit button; a test
      submit creates a Shopify customer with `accepts_marketing` (Klaviyo app syncs).
- [ ] Fonts: headings render Instrument Serif, body renders Archivo. If headings fall
      back to a default serif, the `instrument_serif_n4` handle didn't resolve — open
      the theme editor → Typography and pick Instrument Serif (or Playfair Display as
      fallback) manually, which writes the correct handle.
- [ ] `view-source:` → one Organization JSON-LD, one canonical, no duplicate title.
- [ ] GA4 DebugView shows `page_view` from the preview.

Then publish (Admin → Themes → Publish, or `themePublish` mutation) if staged on a
duplicate.

## Rollback

`themeFilesUpsert` with the saved originals from `scripts/shopify-theme-edits/backup/`
restores any file (same mutation, original body). For the five NEW snippets, rollback
is `themeFilesDelete`:

```graphql
mutation DeleteThemeFiles($themeId: ID!, $files: [String!]!) {
  themeFilesDelete(themeId: $themeId, files: $files) {
    deletedThemeFiles { filename }
    userErrors { field message }
  }
}
```

…but only delete them AFTER reverting `layout/theme.liquid`, or every page render
breaks on the missing `{% render %}` targets.

## Dawn-schema uncertainties to verify against the live theme before applying

1. **Font handles.** `instrument_serif_n4` — Instrument Serif is in Shopify's font
   library, but confirm the exact handle by picking it once in the theme editor and
   reading back `settings_data.json`, OR accept the editor-pick fallback in Step 5.
   Same for `archivo_n4`. An unrecognized handle falls back to the theme default
   rather than erroring, so this is low-risk but visible.
2. **`heading_size: "h0"`** on the hero heading block exists in Dawn 12+ ("Extra
   large"); if the live Dawn predates it, use `"h1"`.
3. **`image-banner` text block** setting `text_style` values are
   `body` / `subtitle` / `caption-with-letter-spacing` in Dawn 15 — `body` used here.
4. **Announcement block** `text` is plain text in Dawn 15; some point releases add
   `text_alignment` — we don't set it (see `announcement.patch.md`).
5. **`featured-collection`** settings included here are the stable Dawn 15 core set;
   point releases add `description`/`show_description`/`view_all_style`/`quick_add` —
   omitted intentionally (Dawn falls back to schema defaults for omitted keys).
6. **`settings_data.json` `current` may be a preset-name string** on a never-customized
   theme — handle per Step 3.1.
7. **theme.liquid anchor text** — the title/canonical block in `theme-layout.patch.md`
   is Dawn 15 default; diff against the fetched file before replacing.
