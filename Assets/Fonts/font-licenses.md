# shroome Font Licenses & Usage

> Last updated: March 2026
> Owner: Design Director

---

## Fonts in Use

### Instrument Serif

| | |
|---|---|
| **Designed by** | Rodrigo Fuenzalida, Jordan Egstad |
| **License** | SIL Open Font License 1.1 (OFL) |
| **Source** | Google Fonts |
| **Download** | https://fonts.google.com/specimen/Instrument+Serif |
| **CSS import** | `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');` |
| **Usage in shroome** | Headings (H1, H2), hero text, pull quotes, product names |
| **Style** | Always italic for brand materials |
| **Weights available** | Regular (400) |
| **Fallback** | Georgia, "Times New Roman", serif |

### Syne

| | |
|---|---|
| **Designed by** | Bonjour Monde, Lucas Descroix |
| **License** | SIL Open Font License 1.1 (OFL) |
| **Source** | Google Fonts |
| **Download** | https://fonts.google.com/specimen/Syne |
| **CSS import** | `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');` |
| **Usage in shroome** | Body copy, buttons, navigation, labels, subheadings, email body |
| **Weights available** | 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold) |
| **Weights used** | 400 (body), 500 (nav), 700 (buttons, subheadings) |
| **Fallback** | system-ui, -apple-system, "Segoe UI", sans-serif |

---

## SIL Open Font License — What It Allows

Both fonts are licensed under the SIL Open Font License 1.1, which permits:

- **Free use** in any project (personal, commercial, client work)
- **Web embedding** via @font-face, Google Fonts API, or self-hosted
- **Modification** of the font files (if redistributed under the same license with a different name)
- **Bundling** with applications or products
- **Redistribution** under the same OFL license

**Restrictions:**
- Cannot sell the font files on their own (must be bundled with software or content)
- Modified versions must use a different name and carry the same OFL license
- Cannot use the reserved font names for modified versions without permission

**For shroome's purposes:** We are using both fonts unmodified via Google Fonts. No license concerns for web, email, social, print, or packaging use.

---

## Implementation

### Web (Next.js)

Using `next/font/google` for optimized loading:

```javascript
import { Instrument_Serif, Syne } from 'next/font/google';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const syne = Syne({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
});
```

### CSS Variables

```css
:root {
  --font-heading: 'Instrument Serif', Georgia, serif;
  --font-body: 'Syne', system-ui, sans-serif;
}
```

### Email

Google Fonts cannot be reliably loaded in all email clients. For email templates:
- Use web fonts with `@import` as a progressive enhancement
- Set fallbacks that degrade gracefully:
  - Headings fallback: Georgia, serif
  - Body fallback: Arial, Helvetica, sans-serif (Syne is geometric, so Arial is a closer email-safe match than Times)

---

## Self-Hosted Font Files

For performance or offline use, download the font files and host them locally:

- **Instrument Serif:** https://fonts.google.com/specimen/Instrument+Serif (click "Download family")
- **Syne:** https://fonts.google.com/specimen/Syne (click "Download family")

Store downloaded .woff2 files in `Assets/Fonts/files/` and reference them via @font-face in CSS.

---

## Licensing Compliance Checklist

- [x] Both fonts are OFL-licensed — free for commercial use
- [x] No license fees or royalties required
- [x] Web embedding is permitted
- [x] Print use is permitted
- [x] Packaging use is permitted
- [ ] If font files are ever modified, rename them and retain OFL license
- [ ] Keep a copy of the OFL license text with any self-hosted font files
