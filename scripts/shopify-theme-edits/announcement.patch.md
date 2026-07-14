# Announcement Bar Patch — Dawn 15.x

The announcement bar does NOT live in `templates/index.json`. In Dawn 15 it is a
section inside the **header section group**: `sections/header-group.json`. That file
must be **fetched, merged, and re-upserted whole** (never overwritten blind — it also
contains the `header` section with the store's live nav/logo settings).

## Target copy

- Text: `drop 001 sold out — drop 002 loading. waitlist gets in first →`
- Link: `https://www.drinkshroome.com` (Dawn `url` settings accept full external URLs;
  the whole bar becomes a link when `link` is set on the block)
- Color scheme: `scheme-3` (accent lime `#C8FF3A` bg / ink text — defined in
  `settings_data.patch.json`). If scheme-3 was not applied, fall back to `"scheme-2"`
  (ink bg / canvas text).

## Merge procedure

1. Fetch current `sections/header-group.json` (see `apply-runbook.md` step 2) and save
   the original to `scripts/shopify-theme-edits/backup/`.
2. In the fetched JSON, find the section whose `"type": "announcement-bar"` inside the
   `"sections"` object. Default Dawn names the key `announcement-bar`, but the key can
   differ if a merchant edited the theme — match on `type`, not key name.
3. Replace ONLY that section's `blocks` / `block_order` and merge the listed `settings`
   keys (keep any other existing settings, e.g. country/language selector toggles,
   untouched). Leave the `header` section and top-level `order` exactly as fetched.
4. If NO `announcement-bar` section exists in the fetched file, add the object below
   under `"sections"` with key `"announcement-bar"` and prepend `"announcement-bar"` to
   the top-level `"order"` array (before `"header"`).

## Section JSON (merge target)

```json
{
  "type": "announcement-bar",
  "blocks": {
    "announcement-drop": {
      "type": "announcement",
      "settings": {
        "text": "drop 001 sold out — drop 002 loading. waitlist gets in first →",
        "link": "https://www.drinkshroome.com"
      }
    }
  },
  "block_order": ["announcement-drop"],
  "settings": {
    "auto_rotate": false,
    "color_scheme": "scheme-3",
    "show_line_separator": true
  }
}
```

## Schema notes / verify against live theme

- Dawn 15 `announcement` block settings are `text` (plain text) and `link` (url).
  Some Dawn point releases also expose `text_alignment` on the block — do not add it
  unless the live theme's `sections/announcement-bar.liquid` schema shows it.
- Section settings `auto_rotate`, `change_slides_speed`, `show_line_separator`,
  `color_scheme`, plus utility-bar toggles (`show_social`, `enable_country_selector`,
  `enable_language_selector`) exist in Dawn 15. We only SET the three above; preserve
  whatever else is in the fetched file.
- A single announcement block means no rotation UI; `auto_rotate: false` is belt and
  suspenders.
