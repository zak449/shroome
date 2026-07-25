// ─── shroomé emails — identity v2 (Bolden rebrand) ───────────────────────────
// DESIGN SYSTEM (matches the site + packaging):
//   • lavender (#E3D5F7 tintSoft), cream (#FEFFF8 canvas), ink (#2D341A),
//     matcha (#7A881F) CTAs. pink (#FF6DC7) ONLY in strawberry flavor contexts.
//   • footer: mé the sheep + "we only email when it matters. no spam, ever."
//
// ART DIRECTION — five distinct pieces, one brand:
//   Each template is its own editorial page, not a re-skin of one layout:
//     welcome            → lavender welcome: composed member-card hero art
//     how to pour it     → cream editorial: specimen art + asymmetric rows
//     what we're making  → ink-dominant: sealed-envelope hero on ink
//     the heads-up       → warm, plain-spoken status note on a paper card
//     the flavor vote    → election poster: split-field candidates + VS
//   Composite hero art lives in public/email/*.png (generated from brand
//   assets + the brand TTFs, so display type is authentic even though email
//   clients can't load web fonts). Alt text carries the meaning everywhere.
//
// TYPE SYSTEM (email-safe, hierarchy does the work):
//   • headlines: 800 weight, 34-42px, letter-spacing -0.02em, line-height 1.05
//   • eyebrows: 11px / 800 / 0.16em tracking / uppercase
//   • body: 16px/1.7 on a ~480px measure inside the 600 shell
//   • ticker strips: thin ink bands with ✿ separators, one per masthead
//   • stamps: ink-block cells (cream uppercase, tracked) for the receipt beat
//
// MESSAGING — per Marketing/messaging-dna.md (the canon):
//   Every email is a short personal note from zak, the founder. Information
//   first, charm second. At most ONE playful wink per email (mé may appear
//   as a cute beat, never as mythology). The five phrases, used verbatim:
//     "you hear it first." / "we only email when it matters. no spam, ever."
//     "the first run poured out in 9 days." / "the stir is the recipe."
//     "never sold, only earned."
// VOICE: lowercase, personal, direct, warm. "the first run / the next run",
//   sold out = "poured out". Real numbers only (500 boxes, 9 days).
//   HONESTY RULE ABSOLUTE: never a fake count, date, timer, or member
//   number. No lore-speak, no dispatch numbering, no riddles, no em-dashes.
// EMAIL-SAFE: tables + inline styles, max-width 600, bulletproof buttons,
//   alt text on every image, images never load-bearing for meaning, no
//   third-party (Klaviyo) branding — footer is ours: unsubscribe + address.
//   Dark-mode safe: text always sits on explicit bgcolor cells.
//
// All brand values come from app/lib/brand.ts (the single source of truth).
// Emails need LITERAL colors at send time, so we read the JS constants here
// (never CSS variables) — the literals are interpolated when the HTML is built.
import { BRAND } from "./brand";
import { DROP_001 } from "./drop-config";

// Email-scoped shorthands (literal hex at send time).
const EMAIL = {
  ink: BRAND.colors.ink,
  canvas: BRAND.colors.canvas,
  accent: BRAND.colors.accent,
  accentContrast: BRAND.colors.accentContrast,
  flavorStrawberry: BRAND.colors.flavorStrawberry,
  flavorVanilla: BRAND.colors.flavorFunctional,
  lavender: BRAND.colors.tintSoft,
  siteUrl: BRAND.siteUrl,
};

// Hosted brand assets (absolute URLs — email clients need them hosted).
const ASSET = {
  wordmark: `${EMAIL.siteUrl}/brand/wordmark.png`,
  wordmarkCream: `${EMAIL.siteUrl}/brand/wordmark-cream.png`,
  lockupGoodEnergy: `${EMAIL.siteUrl}/brand/lockup-good-energy.png`,
  sheepSolid: `${EMAIL.siteUrl}/brand/symbol-sheep-solid.png`,
  sheepDrink: `${EMAIL.siteUrl}/brand/sheep-drink.png`,
  sachetVanilla: `${EMAIL.siteUrl}/sachet-vanilla.png`,
  sachetStrawberry: `${EMAIL.siteUrl}/sachet-strawberry.png`,
  badgeMatcha: `${EMAIL.siteUrl}/brand/badge-matcha.png`,
  badgeCollagen: `${EMAIL.siteUrl}/brand/badge-collagen.png`,
  badgeGlucans: `${EMAIL.siteUrl}/brand/badge-b-glucans.png`,
  heroPour: `${EMAIL.siteUrl}/brand/hero-pour.jpg`,
  cupLogo: `${EMAIL.siteUrl}/brand/cup-logo.jpg`,
  shipperBox: `${EMAIL.siteUrl}/brand/shipper-box.jpg`,
  sachetSip: `${EMAIL.siteUrl}/brand/ig-sachet-sip.jpg`,
  icedClose: `${EMAIL.siteUrl}/brand/ig-iced-close.jpg`,
  // composed email art (public/email/, generated from brand assets + brand TTFs)
  heroInduction: `${EMAIL.siteUrl}/email/hero-induction.png`,
  heroSpecimen: `${EMAIL.siteUrl}/email/hero-specimen.png`,
  heroEnvelope: `${EMAIL.siteUrl}/email/hero-envelope.png`,
  heroBallot: `${EMAIL.siteUrl}/email/hero-ballot.png`,
  stampFlockOnly: `${EMAIL.siteUrl}/email/stamp-flock-only.png`,
} as const;

function unsub(email: string) {
  return `${EMAIL.siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
}

// RFC 8058 one-click unsubscribe headers — required by Gmail/Yahoo bulk-sender
// rules. Pass to every marketing send via Resend's `headers` option.
// The https URL points at /api/unsubscribe, which handles the one-click POST
// (and GET redirects to the /unsubscribe page for non-RFC-8058 clients).
export function unsubHeaders(email: string): Record<string, string> {
  return {
    "List-Unsubscribe": `<${EMAIL.siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}>, <mailto:unsubscribe@drinkshroome.com?subject=unsubscribe>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

const SANS = BRAND.emailFonts.body;
const DISPLAY = BRAND.emailFonts.display;
/** Document/typewriter stack for the status-note paper-card aesthetic. */
const MONO = "'Courier New',Courier,monospace";

// ─── Shared building blocks ──────────────────────────────────────────────────

/** Hidden preheader — the inbox preview line. Padded so body copy never bleeds in. */
function preheader(text: string) {
  const pad = "&nbsp;&zwnj;".repeat(48);
  return `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${text}${pad}</div>`;
}

/** Eyebrow label — 11px / 800 / 0.16em tracking / uppercase. */
function eyebrow(text: string, color: string = EMAIL.accent, marginBottom = 14) {
  return `<p style="margin:0 0 ${marginBottom}px;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${color};">${text}</p>`;
}

/** Display headline — 800 weight, tight tracking and leading. */
function headline(text: string, size = 40, color: string = EMAIL.ink) {
  return `<h1 style="margin:0;font-family:${DISPLAY};font-size:${size}px;font-weight:800;letter-spacing:-0.02em;line-height:1.05;color:${color};">${text}</h1>`;
}

/** Body paragraph — 16px/1.7. */
function para(text: string, opts: { size?: number; opacity?: number; margin?: string; color?: string; align?: string } = {}) {
  const { size = 16, opacity = 1, margin = "0", color = EMAIL.ink } = opts;
  return `<p style="margin:${margin};font-family:${SANS};font-size:${size}px;line-height:1.7;color:${color};${opacity < 1 ? `opacity:${opacity};` : ""}">${text}</p>`;
}

/** Ticker strip — thin ink band, ✿-separated, one line, per-email masthead. */
function ticker(line: string, bg: string = EMAIL.ink, fg: string = EMAIL.canvas) {
  return `
    <tr><td align="center" bgcolor="${bg}" style="background-color:${bg};padding:9px 10px;">
      <p style="margin:0;font-family:${SANS};font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${fg};white-space:nowrap;">${line}</p>
    </td></tr>`;
}

/** Ink "rubber stamp" cell — cream uppercase on ink, tracked wide. */
function stampCell(label: string) {
  return `<td align="center" bgcolor="${EMAIL.ink}" style="background-color:${EMAIL.ink};border-radius:4px;padding:11px 18px;">
    <p style="margin:0;font-family:${DISPLAY};font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:${EMAIL.canvas};white-space:nowrap;">${label}</p>
  </td>`;
}

/** Two stamps side by side — the POURED OUT receipt beat. */
function stampRow(a: string, b: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr>
        ${stampCell(a)}
        <td width="10" style="font-size:0;line-height:0;">&nbsp;</td>
        ${stampCell(b)}
      </tr>
    </table>`;
}

/** Ink bar — a design element for "not decided yet" values. Always labeled honestly. */
function inkBar(width: number) {
  return `<span style="display:inline-block;width:${width}px;max-width:60%;height:14px;background-color:${EMAIL.ink};border-radius:2px;vertical-align:middle;">&nbsp;</span>`;
}

/** "Next from us" card — tells her exactly what the next email is, and that we'll be quiet otherwise. */
function nextUp(text: string) {
  return `
    <tr><td style="padding:36px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:14px;padding:26px 32px 24px;">
          ${eyebrow("next from us", EMAIL.lavender, 8)}
          <p style="margin:0;font-family:${DISPLAY};font-size:17px;font-weight:700;line-height:1.5;color:${EMAIL.canvas};">${text}</p>
        </td></tr>
      </table>
    </td></tr>`;
}

/** The ps — a short personal closing line from zak (or one cute mé beat). */
function psNote(line: string) {
  return `
    <tr><td align="center" style="padding:30px 60px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr><td align="center" style="border-top:2px solid ${EMAIL.ink};padding:18px 8px 0;">
          ${eyebrow("ps", EMAIL.accent, 8)}
          <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;color:${EMAIL.ink};opacity:0.8;">${line}</p>
        </td></tr>
      </table>
    </td></tr>`;
}

/** Bulletproof matcha CTA button — cream text on #7A881F, 16px bold. */
function ctaButton(href: string, label: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr><td align="center" bgcolor="${EMAIL.accent}" style="background-color:${EMAIL.accent};border-radius:999px;">
        <a href="${href}" style="display:inline-block;padding:16px 42px;font-family:${DISPLAY};font-size:16px;font-weight:700;letter-spacing:-0.01em;color:${EMAIL.accentContrast};text-decoration:none;border-radius:999px;">${label}</a>
      </td></tr>
    </table>`;
}

/**
 * Masthead variants — each email gets its own composed header
 * (sheep symbol / wordmark / ticker) so no two emails open alike.
 */
function masthead(variant: "lavender" | "cream" | "ink", tickerLine?: string, tickerBg?: string, tickerFg?: string) {
  const bg = variant === "ink" ? EMAIL.ink : variant === "cream" ? EMAIL.canvas : EMAIL.lavender;
  const wm = variant === "ink" ? ASSET.wordmarkCream : ASSET.wordmark;
  return `
    <tr><td align="center" style="padding:26px 24px 22px;background-color:${bg};">
      <a href="${EMAIL.siteUrl}" style="text-decoration:none;">
        <img src="${wm}" alt="shroomé" width="200" style="display:block;width:200px;max-width:58%;height:auto;border:0;" />
      </a>
    </td></tr>
    ${tickerLine ? ticker(tickerLine, tickerBg, tickerFg) : ""}`;
}

/** Footer: mé the sheep, the no-spam promise, legal, unsubscribe. Ours — no ESP branding. */
function footer(email: string) {
  return `
    <tr><td align="center" style="padding:32px 24px 12px;background-color:${EMAIL.lavender};">
      <img src="${ASSET.sheepSolid}" alt="mé the sheep, the shroomé mark" width="44" style="display:block;width:44px;height:auto;border:0;margin:0 auto 10px;" />
      <p style="margin:0;font-family:${SANS};font-size:12px;color:${EMAIL.ink};opacity:0.75;">we only email when it matters. no spam, ever.</p>
    </td></tr>
    <tr><td align="center" style="padding:8px 24px 32px;background-color:${EMAIL.lavender};">
      <p style="margin:0 0 4px;font-family:${SANS};font-size:10px;color:${EMAIL.ink};opacity:0.4;">© ${new Date().getFullYear()} shroomé</p>
      ${/* TODO: insert full street address before first commercial send — CAN-SPAM requires a valid physical postal address */ ""}
      <p style="margin:0 0 8px;font-family:${SANS};font-size:10px;color:${EMAIL.ink};opacity:0.4;">SHROOMÉ · Z Squared Beverages LLC · Los Angeles, CA</p>
      <a href="${unsub(email)}" style="font-family:${SANS};font-size:10px;color:${EMAIL.ink};opacity:0.5;text-decoration:underline;">unsubscribe</a>
    </td></tr>`;
}

/** Social links row (on cream). */
function socialRow() {
  const link = (href: string, label: string) =>
    `<td style="padding:0 12px;"><a href="${href}" style="font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${EMAIL.ink};opacity:0.5;text-decoration:none;">${label}</a></td>`;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr>
        ${link("https://tiktok.com/@drinkshroome", "TikTok")}
        ${link("https://instagram.com/drinkshroome", "Instagram")}
        ${link("https://youtube.com/@drinkshroome", "YouTube")}
      </tr>
    </table>`;
}

function emailShell(content: string, email: string, previewText = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>shroomé</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL.lavender};font-family:${SANS};-webkit-font-smoothing:antialiased;">
  ${previewText ? preheader(previewText) : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${EMAIL.lavender};">
    <tr><td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        ${content}
        ${footer(email)}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Welcome email — thank you, and the promise ──────────────────────────────
// A personal thank-you from zak. The founder's brief, made literal: we worked
// hard on this, it poured out, you clearly want the next one, so you come
// first. Early access before go-live + member-only limited merch + the
// no-spam promise. One wink: mé saw your name come in.

export function welcomeEmail(email: string, referralCode?: string) {
  const subject = "thank you. you're in. 🐑";
  const previewText =
    "the first run poured out in 9 days. the next one, you shop first. and we will not spam you.";
  const html = emailShell(`

    ${masthead("lavender", "✿ &nbsp;welcome to the flock&nbsp; · &nbsp;you hear it first&nbsp; ✿")}

    <!-- hero: the member card (composed art, lavender-seamless) -->
    <tr><td style="padding:0;background-color:${EMAIL.lavender};">
      <img src="${ASSET.heroInduction}" alt="your shroomé member card: the first run, 500 boxes, poured out on day 9. you're in." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- the thank-you -->
    <tr><td align="center" style="padding:44px 40px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("welcome to the flock")}
      ${headline("thank you.<br/>really.", 42)}
    </td></tr>
    <tr><td align="center" style="padding:22px 60px 28px;background-color:${EMAIL.canvas};">
      ${para(
        `hey, it's zak. i make shroomé. we worked so hard on the first run, and it poured out faster than we ever expected. if you're signing up after that, you really want the next one. so here's my promise: you come first.`
      )}
    </td></tr>

    <!-- the record so far: stamp beat -->
    <tr><td align="center" style="padding:0 40px 0;background-color:${EMAIL.canvas};">
      ${stampRow(`first run · ${DROP_001.boxes} boxes`, `poured out · day ${DROP_001.soldOutInDays}`)}
    </td></tr>
    <tr><td align="center" style="padding:20px 60px 8px;background-color:${EMAIL.canvas};">
      ${para(
        `that's our whole story so far. ${DROP_001.boxes} boxes, gone in ${DROP_001.soldOutInDays} days. we're already making more, and you'll shop the next run a full day before anyone else. you hear it first.`
      )}
    </td></tr>
    <tr><td align="center" style="padding:14px 60px 36px;background-color:${EMAIL.canvas};">
      ${para(
        `the drink, in one breath: liquid ceremonial matcha with lion's mane and collagen. no powder, no whisk, no clumps. pour it over milk, stir. the stir is the recipe.`
      )}
    </td></tr>

    <!-- the two flavors -->
    <tr><td style="padding:0 32px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="48%" align="center" valign="bottom" style="background-color:${EMAIL.flavorVanilla};border-radius:16px;padding:24px 12px 20px;">
            <img src="${ASSET.sachetVanilla}" alt="shroomé vanilla sachet" width="150" style="display:block;width:150px;max-width:90%;height:auto;border:0;margin:0 auto 12px;" />
            <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.ink};">vanilla</p>
          </td>
          <td width="4%" style="font-size:0;line-height:0;">&nbsp;</td>
          <td width="48%" align="center" valign="bottom" style="background-color:${EMAIL.flavorStrawberry};border-radius:16px;padding:24px 12px 20px;">
            <img src="${ASSET.sachetStrawberry}" alt="shroomé strawberry sachet" width="150" style="display:block;width:150px;max-width:90%;height:auto;border:0;margin:0 auto 12px;" />
            <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.canvas};">strawberry</p>
          </td>
        </tr>
      </table>
    </td></tr>
    <tr><td align="center" style="padding:14px 60px 36px;background-color:${EMAIL.canvas};">
      ${para("two flavors, twelve sachets per box. ready the second you stir.", { size: 13, opacity: 0.65 })}
    </td></tr>

    <!-- badges: what's in every sachet -->
    <tr><td align="center" style="padding:0 40px 8px;background-color:${EMAIL.canvas};">
      ${eyebrow("in every sachet")}
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="padding:0 10px;">
            <img src="${ASSET.badgeMatcha}" alt="2.5g ceremonial matcha" width="88" style="display:block;width:88px;height:auto;border:0;" />
          </td>
          <td align="center" style="padding:0 10px;">
            <img src="${ASSET.badgeGlucans}" alt="200mg mushroom extracts, 70%+ beta-glucans" width="88" style="display:block;width:88px;height:auto;border:0;" />
          </td>
          <td align="center" style="padding:0 10px;">
            <img src="${ASSET.badgeCollagen}" alt="2g grass-fed collagen" width="88" style="display:block;width:88px;height:auto;border:0;" />
          </td>
        </tr>
      </table>
      <p style="margin:14px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.65;">
        2.5g ceremonial matcha · 200mg mushroom extracts at 70%+ beta-glucans · 2g collagen
      </p>
    </td></tr>

    <!-- the promise (ink card) -->
    <tr><td style="padding:36px 32px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:16px;padding:34px 34px 30px;">
          ${eyebrow("our promise to you", EMAIL.lavender, 10)}
          <p style="margin:0 0 20px;font-family:${DISPLAY};font-size:26px;font-weight:800;letter-spacing:-0.02em;color:${EMAIL.canvas};line-height:1.1;">what being here means</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ early access. you shop every run a full day before go-live.</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ member-only limited-edition merch. never sold, only earned.</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ a real vote on what we make next.</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ the drop-day text, so you hear it first, not secondhand.</p>
          <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ and we only email when it matters. no spam, ever.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:36px 40px 12px;background-color:${EMAIL.canvas};">
      ${ctaButton(EMAIL.siteUrl, "see the next run →")}
      <p style="margin:16px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        your welcome code and free shipping are locked to this email.<br/>
        reply with your number and SHROOME30 replaces it. best code wins.
      </p>
    </td></tr>

    ${referralCode ? `
    <!-- referral: the flock grows by word of mouth -->
    <tr><td style="padding:28px 32px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.lavender};border-radius:16px;padding:0;overflow:hidden;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:0;border-radius:16px 16px 0 0;">
              <img src="${ASSET.shipperBox}" alt="the shroomé shipper box, packed and ready" width="536" style="display:block;width:100%;height:auto;border:0;border-radius:16px 16px 0 0;" />
            </td></tr>
            <tr><td align="center" style="padding:30px 36px 8px;">
              ${eyebrow("bring a friend", EMAIL.accent, 10)}
              <p style="margin:0 0 14px;font-family:${DISPLAY};font-size:26px;font-weight:800;letter-spacing:-0.02em;color:${EMAIL.ink};line-height:1.1;">the flock grows by<br/>word of mouth.</p>
              <p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
                every friend who joins through your link earns you real credit for the next run:
                <strong>$5 for your first · $10 total at 3 · $15 total at 5.</strong>
                applied automatically at checkout on drop day.
              </p>
            </td></tr>
            <tr><td align="center" style="padding:0 32px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr><td align="center" bgcolor="${EMAIL.ink}" style="background-color:${EMAIL.ink};border-radius:12px;padding:14px 28px;">
                  <p style="margin:0 0 2px;font-family:${SANS};font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.lavender};">your link</p>
                  <a href="${EMAIL.siteUrl}?ref=${referralCode}" style="font-family:${SANS};font-size:16px;font-weight:700;color:${EMAIL.canvas};text-decoration:none;">drinkshroome.com?ref=${referralCode}</a>
                </td></tr>
              </table>
            </td></tr>
            <tr><td align="center" style="padding:4px 32px 12px;">
              ${ctaButton(`${EMAIL.siteUrl}/refer`, "share &amp; track referrals →")}
            </td></tr>
            <tr><td align="center" style="padding:0 32px 28px;">
              <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.6;">
                credits cap at $15. our top referrer gets a hand-numbered box from the first run.
              </p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
    ` : ""}

    <!-- brand lockup moment -->
    <tr><td align="center" style="padding:40px 70px 0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.lockupGoodEnergy}" alt="ready to enjoy life with good energy." width="400" style="display:block;width:400px;max-width:100%;height:auto;border:0;margin:0 auto;" />
    </td></tr>

    <!-- what's next -->
    ${nextUp(
      `how to pour it. the whole ritual in one short email, plus exactly what's in the sachet, gram by gram. after that, we quiet down until there's real news.`
    )}

    <!-- ps -->
    ${psNote("mé, our sheep, saw your name come in. she's thrilled. (she's a sheep, but still.)")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      <img src="${ASSET.sheepDrink}" alt="mé the sheep sipping a shroomé" width="90" style="display:block;width:90px;height:auto;border:0;margin:0 auto 14px;" />
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── How to pour it — the useful product email (cream editorial) ─────────────
// Day-2 follow-up. Pure usefulness: the ritual in three steps and exactly
// what's inside every sachet, stated plainly. One wink: mé taste-tests.

export function sachetEmail(email: string) {
  const subject = "how to pour it 🍵";
  const previewText = "no powder, no whisk. tear, pour over milk, stir. here's exactly what's inside.";
  const html = emailShell(`

    ${masthead("cream", "✿ &nbsp;the pour guide&nbsp; · &nbsp;from our kitchen to yours&nbsp; ✿")}

    <!-- open (left-aligned, editorial) -->
    <tr><td style="padding:44px 48px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("the pour guide")}
      ${headline("the whole ritual<br/>is a stir.", 40)}
    </td></tr>
    <tr><td style="padding:20px 48px 30px;background-color:${EMAIL.canvas};">
      ${para(
        `hey, it's zak. before your first box (or your next one), here's how to pour it and exactly what's inside every sachet. no secrets, just the good stuff, weighed out.`
      )}
    </td></tr>

    <!-- hero: the specimen (cream-seamless composed art) -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.heroSpecimen}" alt="one shroomé sachet, opened and weighed: 2.5g ceremonial matcha, 200mg mushroom extracts at 70%+ beta-glucans, 2g grass-fed collagen." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- asymmetric editorial row: photo left, text right -->
    <tr><td style="padding:36px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="45%" valign="middle" style="padding:0;">
            <img src="${ASSET.sachetSip}" alt="pouring a shroomé sachet into a glass of iced milk" width="241" style="display:block;width:100%;height:auto;border:0;border-radius:16px;" />
          </td>
          <td width="7%" style="font-size:0;line-height:0;">&nbsp;</td>
          <td width="48%" valign="middle" style="padding:0;">
            ${eyebrow("the ritual", EMAIL.accent, 10)}
            <p style="margin:0 0 12px;font-family:${DISPLAY};font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.1;color:${EMAIL.ink};">the stir is<br/>the recipe.</p>
            ${para(`no powder, no frother, no 40-second whisk workout. the matcha is already liquid. tear, pour over milk, stir. hot or iced, oat or dairy, it just works.`, { size: 14 })}
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- asymmetric editorial row: text left, photo right -->
    <tr><td style="padding:28px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="48%" valign="middle" style="padding:0;">
            ${eyebrow("why it's different", EMAIL.accent, 10)}
            <p style="margin:0 0 12px;font-family:${DISPLAY};font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.1;color:${EMAIL.ink};">we sell what's inside the mushroom.</p>
            ${para(`beta-glucans are the part your immune system actually recognizes. ours are hot-water extracted from the fruiting body and third-party verified. calm focus from lion's mane, steady energy from matcha, no 2pm crash.`, { size: 14 })}
          </td>
          <td width="7%" style="font-size:0;line-height:0;">&nbsp;</td>
          <td width="45%" valign="middle" style="padding:0;">
            <img src="${ASSET.icedClose}" alt="iced shroomé matcha, up close" width="241" style="display:block;width:100%;height:auto;border:0;border-radius:16px;" />
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- the spec sheet (ink card): every sachet, weighed out -->
    <tr><td style="padding:36px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:16px;padding:30px 30px 26px;">
          ${eyebrow("every sachet, weighed out", EMAIL.lavender, 16)}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:0 0 16px;border-bottom:1px solid rgba(254,255,248,0.12);">
              <p style="margin:0;font-family:${DISPLAY};"><span style="font-size:34px;font-weight:800;letter-spacing:-0.02em;color:${EMAIL.lavender};">2.5g</span>
              <span style="font-family:${SANS};font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.canvas};">&nbsp; ceremonial matcha</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:rgba(254,255,248,0.65);">first-harvest, shade-grown, 60mg caffeine. the real thing, not culinary grade.</p>
            </td></tr>
            <tr><td style="padding:16px 0;border-bottom:1px solid rgba(254,255,248,0.12);">
              <p style="margin:0;font-family:${DISPLAY};"><span style="font-size:34px;font-weight:800;letter-spacing:-0.02em;color:${EMAIL.lavender};">200mg</span>
              <span style="font-family:${SANS};font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.canvas};">&nbsp; mushroom extracts</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:rgba(254,255,248,0.65);">fruiting-body extract at 70%+ beta-glucans (1,3 and 1,6). most brands sit at 15 to 30%.</p>
            </td></tr>
            <tr><td style="padding:16px 0;border-bottom:1px solid rgba(254,255,248,0.12);">
              <p style="margin:0;font-family:${DISPLAY};"><span style="font-size:34px;font-weight:800;letter-spacing:-0.02em;color:${EMAIL.lavender};">2g</span>
              <span style="font-family:${SANS};font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.canvas};">&nbsp; grass-fed collagen</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:rgba(254,255,248,0.65);">pre-dissolved bioavailable peptides for skin, hair, nails, and gut.</p>
            </td></tr>
            <tr><td style="padding:16px 0 0;">
              <p style="margin:0;font-family:${SANS};font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.canvas};">and that's it.</p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:rgba(254,255,248,0.65);">nothing artificial, nothing you'd need to google. what's on this card is what's in the cup.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- the cup moment -->
    <tr><td style="padding:36px 32px 0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.cupLogo}" alt="an iced shroomé matcha latte in a logo cup" width="536" style="display:block;width:100%;height:auto;border:0;border-radius:16px;" />
    </td></tr>
    <tr><td align="center" style="padding:16px 60px 8px;background-color:${EMAIL.canvas};">
      ${para("café counter taste, kitchen counter effort.", { size: 13, opacity: 0.65 })}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:28px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(EMAIL.siteUrl, "meet shroomé →")}
      <p style="margin:16px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        the first run was ${DROP_001.boxes} boxes and poured out in ${DROP_001.soldOutInDays} days.<br/>
        the next run, you shop a full day early. you're already in.
      </p>
    </td></tr>

    <!-- what's next -->
    ${nextUp(
      `what we're making right now. a real status update on the next run, sent only when there's something true to say.`
    )}

    <!-- ps -->
    ${psNote("mé taste-tests every batch. she is extremely thorough about it.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── What we're making — honest status on ink ────────────────────────────────
// Waiting-period note. The next run is real and in motion; no date or count
// yet, and we say so instead of inventing one. The promise: you hear it
// first, a full day before the public. One wink: mé is sworn to secrecy.

export function ledgerEmail(email: string) {
  const subject = "what we're making right now";
  const previewText = "the next run is real and in motion. no date yet, and we won't invent one. you hear it first.";
  const html = emailShell(`

    ${masthead("ink", "✿ &nbsp;what we're making&nbsp; · &nbsp;you hear it first&nbsp; ✿", EMAIL.lavender, EMAIL.ink)}

    <!-- hero: the sealed envelope (ink-seamless composed art) -->
    <tr><td style="padding:0;background-color:${EMAIL.ink};">
      <img src="${ASSET.heroEnvelope}" alt="a sealed cream envelope stamped with the shroomé seal, resting on a deep green desk. the next run's details, not announced yet." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- open, cream on ink -->
    <tr><td align="center" style="padding:40px 40px 0;background-color:${EMAIL.ink};">
      ${eyebrow("a note from zak", EMAIL.lavender)}
      ${headline("the next run<br/>is happening.", 38, EMAIL.canvas)}
    </td></tr>
    <tr><td align="center" style="padding:22px 56px 40px;background-color:${EMAIL.ink};">
      ${para(
        `quick note, because you signed up to actually know things. the next run is not a maybe. it's in motion right now. the first run was ${DROP_001.boxes} boxes and poured out in ${DROP_001.soldOutInDays} days, so we're making this one properly, and that takes a minute.`,
        { color: "rgba(254,255,248,0.85)" }
      )}
    </td></tr>

    <!-- what we know / what we don't (lavender card on ink) -->
    <tr><td style="padding:0 32px 44px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.lavender};border-radius:16px;padding:30px 34px 26px;">
          ${eyebrow("what we know", EMAIL.accent, 10)}
          <p style="margin:0 0 18px;font-family:${DISPLAY};font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;color:${EMAIL.ink};">it's real. it's in motion.<br/>and you shop it first.</p>
          ${eyebrow("what we don't know yet", EMAIL.accent, 10)}
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.9;color:${EMAIL.ink};">size: ${inkBar(110)}<br/>date: ${inkBar(90)}</p>
          <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.7;">not a tease. we genuinely don't have final numbers, and we'd rather tell you nothing than guess. the moment they're real, they're yours.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- the system, on cream -->
    <tr><td align="center" style="padding:40px 60px 0;background-color:${EMAIL.canvas};">
      ${para(
        `no countdown theater, no invented dates. when the date is real you get one email and one text, <strong>a full day before the public</strong>. that's the whole system, and it's the reason we barely email you in between.`
      )}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:30px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(`${EMAIL.siteUrl}/drop`, "watch the next run →")}
      <p style="margin:16px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        mé has seen the production notes. she's sworn to secrecy. (she's very good at it.)
      </p>
    </td></tr>

    <!-- what's next -->
    ${nextUp(
      `a proper heads-up the moment anything changes. that's it. we only email when it matters.`
    )}

    <!-- ps -->
    ${psNote("thank you for waiting with us. it genuinely means a lot. zak")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── The heads-up — plain production update on a paper card ──────────────────
// A straightforward status note from the team about the next run, readable
// on first skim: recipes locked, materials moving, you hear the date first.
// One wink: a single covered line on the flavor row, saved for the vote.

export function redactedEmail(email: string) {
  const subject = "a quick heads-up";
  const previewText = "recipes locked. materials moving. when the date is real, you hear it first.";
  const updateLine = (label: string, value: string, last = false) =>
    `<tr><td style="padding:${last ? "14px 0 0" : "14px 0"};${last ? "" : `border-bottom:1px solid rgba(45,52,26,0.15);`}">
      <p style="margin:0 0 3px;font-family:${MONO};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.accent};">${label}</p>
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${EMAIL.ink};">${value}</p>
    </td></tr>`;
  const html = emailShell(`

    ${masthead("cream", "✿ &nbsp;the heads-up&nbsp; · &nbsp;real news only&nbsp; ✿")}

    <!-- hero: the shipper box, packed -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.shipperBox}" alt="a shroomé shipper box, packed and ready to go out" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- the plain headline -->
    <tr><td align="center" style="padding:44px 40px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("the heads-up")}
      ${headline("here's where<br/>things stand.", 40)}
    </td></tr>
    <tr><td align="center" style="padding:22px 60px 36px;background-color:${EMAIL.canvas};">
      ${para(
        `it's zak. you signed up to actually know things, so here's the next run's status, plain and honest, straight from our production notes.`
      )}
    </td></tr>

    <!-- the update (paper card on lavender) -->
    <tr><td style="padding:36px 40px 44px;background-color:${EMAIL.lavender};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.canvas};border:2px solid ${EMAIL.ink};border-radius:6px;padding:26px 30px 22px;">
          <p style="margin:0 0 6px;font-family:${MONO};font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.ink};">status update<br/>re: the next run</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${updateLine("recipes", `<strong>locked.</strong> same sachets, same real numbers. nothing watered down.`)}
            ${updateLine("materials", `<strong>on the move.</strong> matcha, sachets, and boxes are making their way to the production floor.`)}
            ${updateLine("run date", `<strong>set the moment everything lands.</strong> you hear it first, a full day before the public.`)}
            ${updateLine("flavor three", `${inkBar(150)}<br/><span style="font-size:13px;opacity:0.7;">the one line we're covering, because it isn't ours to write. the flavor vote is next, and it's your call.</span>`, true)}
          </table>
          <p style="margin:18px 0 0;font-family:${MONO};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">one covered line. mé insisted we save you the surprise.</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:36px 60px 0;background-color:${EMAIL.canvas};">
      ${para(
        `that's the whole update. the first run was ${DROP_001.boxes} boxes and poured out in ${DROP_001.soldOutInDays} days, so we're building this one carefully. no countdowns, no invented dates. when it's real, you'll read it before anyone else.`
      )}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:28px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(`${EMAIL.siteUrl}/drop`, "follow the run →")}
    </td></tr>

    <!-- what's next -->
    ${nextUp(
      `the flavor vote. vanilla and strawberry are staying. flavor three is your call.`
    )}

    <!-- ps -->
    ${psNote("thank you for being patient with a small team. we're going as fast as good allows. zak")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── The flavor vote — the membership perk made real (election poster) ───────
// The promise from the welcome email, kept: members vote on what we make
// next. Vanilla and strawberry stay; flavor three is the member's call.
// One wink: mé counts the votes. Pass the live ballot URL at send time;
// defaults to the drop page.

export function ballotEmail(email: string, voteUrl: string = `${EMAIL.siteUrl}/drop`) {
  const subject = "flavor three is your call 🗳️";
  const previewText = "vanilla and strawberry are staying. you pick what joins them. one vote per member.";
  const html = emailShell(`

    ${masthead("lavender", "✿ &nbsp;the flavor vote&nbsp; · &nbsp;polls open&nbsp; ✿")}

    <!-- hero: the election poster (composed art) -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.heroBallot}" alt="the first shroomé flavor vote: vanilla and strawberry on the poster, one open spot. one vote per member." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- the ask, stated straight -->
    <tr><td align="center" style="padding:40px 40px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("the flavor vote")}
      ${headline("we're making a third<br/>flavor. you pick it.", 38)}
    </td></tr>
    <tr><td align="center" style="padding:22px 60px 28px;background-color:${EMAIL.canvas};">
      ${para(
        `hey, it's zak. when you joined we promised you a real vote on what we make next. this is it. vanilla and strawberry are staying. the third flavor goes on the next production sheet, and that line is yours to write.`
      )}
    </td></tr>

    <!-- the open spot -->
    <tr><td style="padding:0 32px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="center" style="background-color:${EMAIL.lavender};border:2px dashed ${EMAIL.ink};border-radius:16px;padding:30px 16px 26px;">
          <p style="margin:0 0 6px;font-family:${DISPLAY};font-size:44px;font-weight:800;letter-spacing:-0.02em;line-height:1;color:${EMAIL.ink};">?</p>
          <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.ink};opacity:0.7;">flavor three · your call</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:26px 60px 0;background-color:${EMAIL.canvas};">
      ${para(
        `one vote per member. we count them, tell you the winner before anyone else, and send it straight to the production floor. no committee, no focus group. just you.`
      )}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:30px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(voteUrl, "cast your vote →")}
    </td></tr>

    <!-- what's next -->
    ${nextUp(
      `the vote result, sent to you first. then quiet again until there's real news. we only email when it matters.`
    )}

    <!-- ps -->
    ${psNote("mé counts the votes herself. she has never miscounted anything.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}
