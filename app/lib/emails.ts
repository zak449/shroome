// ─── shroomé emails — identity v2 (Bolden rebrand) ───────────────────────────
// DESIGN SYSTEM (matches the site + packaging):
//   • lavender (#E3D5F7 tintSoft), cream (#FEFFF8 canvas), ink (#2D341A),
//     matcha (#7A881F) CTAs. pink (#FF6DC7) ONLY in strawberry flavor contexts.
//   • footer: mé the sheep + "mé, our sheep. keeps the ledger, never spills."
//
// ART DIRECTION — five distinct pieces, one brand:
//   Each template is its own editorial page, not a re-skin of one layout:
//     welcome   → lavender induction: composed member-card hero art
//     dispatch 001 (sachet)  → cream editorial: specimen art + asymmetric rows
//     dispatch 002 (ledger)  → ink-dominant: sealed-envelope drama on ink
//     dispatch 003 (redacted)→ the production update: warm, plain-spoken
//                              status note on a paper card, exactly one
//                              playful redaction bar (the flavor line)
//     dispatch 004 (ballot)  → election poster: split-field candidates + VS
//   Composite hero art lives in public/email/*.png (generated from brand
//   assets + the brand TTFs, so display type is authentic even though email
//   clients can't load web fonts). Alt text carries the meaning everywhere.
//
// TYPE SYSTEM (email-safe, hierarchy does the work):
//   • headlines: 800 weight, 34–42px, letter-spacing -0.02em, line-height 1.05
//   • eyebrows: 11px / 800 / 0.16em tracking / uppercase
//   • body: 16px/1.7 on a ~480px measure inside the 600 shell
//   • ticker strips: thin ink bands with ✿ separators, one per dispatch masthead
//   • stamps: ink-block cells (cream uppercase, tracked) for ledger beats
//
// MESSAGING — the archive dispatch engine:
//   Every lifecycle email after welcome is a numbered dispatch from mé's
//   ledger. Each dispatch: cold open → one revealed detail → one withheld
//   detail → a next-dispatch tease. Recurring bits: mé's ledger sign-off
//   line, the single flavor-line redaction bar (paid off in dispatch 004:
//   it was covering a blank the flock fills in), the cliffhanger election.
// VOICE: lowercase-cool, warm, confident. "the first run / the next run",
//   sold out = "poured out", speed = "the stir is the recipe". Real numbers
//   only (500 boxes, 9 days). HONESTY RULE ABSOLUTE: never a fake count,
//   date, timer, or member number. Community first, never discount-led.
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
/** Document/typewriter stack for the redacted production-record aesthetic. */
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

/** Ticker strip — thin ink band, ✿-separated, one line, per-dispatch masthead. */
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

/** Two stamps side by side — the POURED OUT ledger beat. */
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

/** Redaction bar — real ink, never a fake number underneath. */
function redact(width: number) {
  return `<span style="display:inline-block;width:${width}px;max-width:60%;height:14px;background-color:${EMAIL.ink};border-radius:2px;vertical-align:middle;">&nbsp;</span>`;
}

/** The serialized tease — every dispatch ends by planting the next one. */
function nextDispatch(text: string) {
  return `
    <tr><td style="padding:36px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:14px;padding:26px 32px 24px;">
          ${eyebrow("next dispatch", EMAIL.lavender, 8)}
          <p style="margin:0;font-family:${DISPLAY};font-size:17px;font-weight:700;line-height:1.5;color:${EMAIL.canvas};">${text}</p>
        </td></tr>
      </table>
    </td></tr>`;
}

/** mé's recurring sign-off ritual — the ledger line that closes every email. */
function ledgerLine(line: string) {
  return `
    <tr><td align="center" style="padding:30px 60px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr><td align="center" style="border-top:2px solid ${EMAIL.ink};padding:18px 8px 0;">
          ${eyebrow("mé's ledger", EMAIL.accent, 8)}
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
 * Masthead variants — each dispatch gets its own composed header
 * (sheep symbol / wordmark / dispatch ticker) so no two emails open alike.
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

/** Footer: mé the sheep, ledger line, legal, unsubscribe. Ours — no ESP branding. */
function footer(email: string) {
  return `
    <tr><td align="center" style="padding:32px 24px 12px;background-color:${EMAIL.lavender};">
      <img src="${ASSET.sheepSolid}" alt="mé the sheep, the shroomé mark" width="44" style="display:block;width:44px;height:auto;border:0;margin:0 auto 10px;" />
      <p style="margin:0;font-family:${SANS};font-size:12px;color:${EMAIL.ink};opacity:0.75;">mé, our sheep. keeps the ledger, never spills.</p>
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

// ─── Welcome email (flock induction) — lavender induction card ───────────────
// Joining is an induction, not a signup confirmation. "you're in the room
// now" energy, real numbers only (no fake member numbers), and the email
// ends by opening the first loop: dispatch 001 is coming, flock reads first.

export function welcomeEmail(email: string, referralCode?: string) {
  const subject = "your name is in the ledger now 🐑";
  const previewText =
    "written in ink, page one. and the first dispatch from the archive is already being drafted.";
  const html = emailShell(`

    ${masthead("lavender", "✿ &nbsp;flock induction&nbsp; · &nbsp;member of record&nbsp; ✿")}

    <!-- hero: the member card (composed art, lavender-seamless) -->
    <tr><td style="padding:0;background-color:${EMAIL.lavender};">
      <img src="${ASSET.heroInduction}" alt="a shroomé member-of-record card: run 001, 500 boxes, poured out on day 9. admitted immediately, privileges standing. stamped: inducted." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- induction headline -->
    <tr><td align="center" style="padding:44px 40px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("welcome to the flock")}
      ${headline("you're in the<br/>room now.", 42)}
    </td></tr>
    <tr><td align="center" style="padding:22px 60px 28px;background-color:${EMAIL.canvas};">
      ${para(
        `that wasn't a newsletter signup. mé opened the ledger, wrote your name in ink, and closed it again. no tiers, no waiting room. you're flock, effective immediately, and the flock hears everything first.`
      )}
    </td></tr>

    <!-- the record so far: stamp beat -->
    <tr><td align="center" style="padding:0 40px 0;background-color:${EMAIL.canvas};">
      ${stampRow(`first run · ${DROP_001.boxes} boxes`, `poured out · day ${DROP_001.soldOutInDays}`)}
    </td></tr>
    <tr><td align="center" style="padding:20px 60px 8px;background-color:${EMAIL.canvas};">
      ${para(
        `that's the whole history so far. ${DROP_001.boxes} boxes, gone in ${DROP_001.soldOutInDays} days, every one of them written into the ledger. the next run is already in motion, and you'll shop it a full day before the public even hears about it.`
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

    <!-- standing privileges (ink card) -->
    <tr><td style="padding:36px 32px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:16px;padding:34px 34px 30px;">
          ${eyebrow("standing privileges", EMAIL.lavender, 10)}
          <p style="margin:0 0 20px;font-family:${DISPLAY};font-size:26px;font-weight:800;letter-spacing:-0.02em;color:${EMAIL.canvas};line-height:1.1;">what the room gets you</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ every run, a full day before the public</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ a vote on what gets made next</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ merch that is never sold, only earned</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ free gifts with subscriptions</p>
          <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.canvas};">✓ the drop-day text. you will not hear it secondhand.</p>
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

    <!-- open loop: dispatch 001 -->
    ${nextDispatch(
      `dispatch 001 lands in a few days: what's actually inside the sachet, gram by gram. one line will be blacked out. the flock reads it first.`
    )}

    <!-- sign-off ritual -->
    ${ledgerLine("tonight's entry: one new name. ink still drying.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      <img src="${ASSET.sheepDrink}" alt="mé the sheep sipping a shroomé" width="90" style="display:block;width:90px;height:auto;border:0;margin:0 auto 14px;" />
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── Dispatch 001: what's inside the sachet — cream editorial ────────────────
// Day-7 follow-up. Cold open: the cut-open sachet on mé's desk. Revealed:
// the three real numbers. Withheld: line four (the next run's page, still
// being written). Tease: dispatch 002, the sealed envelope. Layout: cream
// editorial with specimen art and asymmetric photo/text rows, left-aligned.

export function sachetEmail(email: string) {
  const subject = "dispatch 001: we cut a sachet open";
  const previewText = "three numbers made it out. line four didn't. the flock reads this before anyone.";
  const html = emailShell(`

    ${masthead("cream", "✿ &nbsp;dispatch 001&nbsp; · &nbsp;from the archive&nbsp; · &nbsp;the flock reads it first&nbsp; ✿")}

    <!-- cold open (left-aligned, editorial) -->
    <tr><td style="padding:44px 48px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("dispatch 001 · from the archive")}
      ${headline("we cut one open.", 40)}
    </td></tr>
    <tr><td style="padding:20px 48px 30px;background-color:${EMAIL.canvas};">
      ${para(
        `every run, a few sachets never ship. they go to mé's desk, get cut open, weighed, and written into the ledger. this is that page, copied out for the flock. three lines cleared for release. one didn't.`
      )}
    </td></tr>

    <!-- hero: the specimen (cream-seamless composed art) -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.heroSpecimen}" alt="exhibit: one shroomé sachet, cut open and weighed. 2.5g ceremonial matcha, 200mg mushroom extracts at 70%+ beta-glucans, 2g grass-fed collagen." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
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
            ${para(`no powder, no frother, no 40-second whisk workout. the matcha is already liquid. tear, pour over milk, stir.`, { size: 14 })}
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- asymmetric editorial row: text left, photo right -->
    <tr><td style="padding:28px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="48%" valign="middle" style="padding:0;">
            ${eyebrow("the difference", EMAIL.accent, 10)}
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

    <!-- the ledger page (ink spec sheet, incl. the withheld line) -->
    <tr><td style="padding:36px 32px 0;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:16px;padding:30px 30px 26px;">
          ${eyebrow("weighed &amp; verified · ledger copy", EMAIL.lavender, 16)}
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
              <p style="margin:0;font-family:${SANS};font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.canvas};">line four &nbsp;<span style="background-color:${EMAIL.lavender};border-radius:2px;color:${EMAIL.lavender};">redacted.</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:rgba(254,255,248,0.65);">the next run's page. mé is still writing it. not cleared for this dispatch.</p>
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
        the flock shops the next run a full day early. you're already in.
      </p>
    </td></tr>

    <!-- open loop: dispatch 002 -->
    ${nextDispatch(
      `dispatch 002: mé seals an envelope about the next run. we can show you the envelope. we cannot show you the entry. the flock sees it first.`
    )}

    <!-- sign-off ritual -->
    ${ledgerLine("today's entry: sachet contents verified. everything else stays sealed.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── Dispatch 002: the sealed envelope — ink-dominant drama ──────────────────
// Waiting-period beat. Cold open on ink: two kinds of ledger pages.
// Revealed: the next run exists, it is not a maybe. Withheld: size + date
// (sealed). Honesty rule: promises nothing but "flock hears first". No
// dates, no counts, no timers. Tease: dispatch 003, the redacted sheet.

export function ledgerEmail(email: string) {
  const subject = "dispatch 002: mé sealed something this week";
  const previewText = "entry 002 is about the next run. here's the envelope. the entry stays shut.";
  const html = emailShell(`

    ${masthead("ink", "✿ &nbsp;dispatch 002&nbsp; · &nbsp;from the ledger&nbsp; · &nbsp;seal unbroken&nbsp; ✿", EMAIL.lavender, EMAIL.ink)}

    <!-- hero: the sealed envelope (ink-seamless composed art) -->
    <tr><td style="padding:0;background-color:${EMAIL.ink};">
      <img src="${ASSET.heroEnvelope}" alt="a sealed cream envelope on mé's ink-green desk, stamped with the shroomé circle seal. entry no. 002, the next run. sealed. opens when it opens." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- cold open, cream on ink -->
    <tr><td align="center" style="padding:40px 40px 0;background-color:${EMAIL.ink};">
      ${eyebrow("dispatch 002 · from the ledger", EMAIL.lavender)}
      ${headline("this week, a page<br/>got sealed.", 38, EMAIL.canvas)}
    </td></tr>
    <tr><td align="center" style="padding:22px 56px 40px;background-color:${EMAIL.ink};">
      ${para(
        `the ledger has two kinds of pages. open pages, which the flock reads first, and sealed pages, which nobody reads until mé breaks the wax. the first run filled ${DROP_001.boxes} open lines, and day ${DROP_001.soldOutInDays}, the day it poured out, is underlined twice. this week a new entry went in. then it moved to the sealed side.`,
        { color: "rgba(254,255,248,0.85)" }
      )}
    </td></tr>

    <!-- revealed vs withheld (lavender card on ink) -->
    <tr><td style="padding:0 32px 44px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.lavender};border-radius:16px;padding:30px 34px 26px;">
          ${eyebrow("cleared for the flock", EMAIL.accent, 10)}
          <p style="margin:0 0 18px;font-family:${DISPLAY};font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;color:${EMAIL.ink};">the next run exists.<br/>it is not a maybe. it is in motion.</p>
          ${eyebrow("still under the wax", EMAIL.accent, 10)}
          <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.9;color:${EMAIL.ink};">size: ${redact(110)}<br/>date: ${redact(90)}<br/>opens: when it opens.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- the system, on cream -->
    <tr><td align="center" style="padding:40px 60px 0;background-color:${EMAIL.canvas};">
      ${para(
        `no countdown theater. no invented dates. just the ledger, the wax, and the standing rule: <strong>when the seal breaks, the flock reads the entry a full day before the public does.</strong> that's the whole system.`
      )}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:30px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(`${EMAIL.siteUrl}/drop`, "watch the ledger →")}
      <p style="margin:16px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        mé doesn't leak. but mé does hint.
      </p>
    </td></tr>

    <!-- open loop: dispatch 003 -->
    ${nextDispatch(
      `dispatch 003: the production update. where the next run actually stands, told straight, with exactly one line kept under the bar.`
    )}

    <!-- sign-off ritual -->
    ${ledgerLine("entry 002: sealed. wax unbroken. the flock reads it first.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── Dispatch 003: the production update — warm status note, paper card ──────
// Plain-spoken beat: a straightforward status note from the team about the
// next run, readable on first skim. Everything stated straight: recipes
// locked, materials moving, the flock hears the date first. EXACTLY ONE
// playful withheld detail: the flavor line, under a single ink bar (the
// series' long con: dispatch 004 reveals it was covering a blank the flock
// fills in). Paper-card aesthetic kept, shipper-box photo as the hero.

export function redactedEmail(email: string) {
  const subject = "dispatch 003: the production update";
  const previewText = "recipes locked. materials moving. the flock hears the date first. one line stays covered.";
  const updateLine = (label: string, value: string, last = false) =>
    `<tr><td style="padding:${last ? "14px 0 0" : "14px 0"};${last ? "" : `border-bottom:1px solid rgba(45,52,26,0.15);`}">
      <p style="margin:0 0 3px;font-family:${MONO};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.accent};">${label}</p>
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${EMAIL.ink};">${value}</p>
    </td></tr>`;
  const html = emailShell(`

    ${masthead("cream", "✿ &nbsp;dispatch 003&nbsp; · &nbsp;the production update&nbsp; · &nbsp;the flock reads it first&nbsp; ✿")}

    <!-- hero: the shipper box, packed -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.shipperBox}" alt="a shroomé shipper box, packed and ready to go out" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- cold open: the plain headline -->
    <tr><td align="center" style="padding:44px 40px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("dispatch 003 · the production update")}
      ${headline("the next run<br/>is in motion.", 40)}
    </td></tr>
    <tr><td align="center" style="padding:22px 60px 36px;background-color:${EMAIL.canvas};">
      ${para(
        `a quick status note from the team, no riddles this time. you wait for these emails, so here is exactly where the next run stands, in plain words.`
      )}
    </td></tr>

    <!-- the update (paper card on lavender) -->
    <tr><td style="padding:36px 40px 44px;background-color:${EMAIL.lavender};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.canvas};border:2px solid ${EMAIL.ink};border-radius:6px;padding:26px 30px 22px;">
          <p style="margin:0 0 6px;font-family:${MONO};font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.ink};">the production update<br/>re: the next run</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${updateLine("recipes", `<strong>locked.</strong> same sachets, same real numbers. nothing watered down.`)}
            ${updateLine("materials", `<strong>on the move.</strong> matcha, sachets, and boxes are making their way to the production floor.`)}
            ${updateLine("run date", `<strong>set once everything lands.</strong> the flock hears it first, a full day before the public.`)}
            ${updateLine("flavor line", `${redact(150)}<br/><span style="font-size:13px;opacity:0.7;">the one detail we're keeping under the bar. it comes off in dispatch 004.</span>`, true)}
          </table>
          <p style="margin:18px 0 0;font-family:${MONO};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">one redaction. mé wouldn't allow more suspense than that.</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:36px 60px 0;background-color:${EMAIL.canvas};">
      ${para(
        `that's the whole update. no countdown theater, no invented dates. the first run was ${DROP_001.boxes} boxes and poured out in ${DROP_001.soldOutInDays} days, so this one is being built carefully, and when the date is real you will read it before anyone else does.`
      )}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:28px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(`${EMAIL.siteUrl}/drop`, "follow the run →")}
    </td></tr>

    <!-- open loop: dispatch 004 -->
    ${nextDispatch(
      `dispatch 004: the flavor bar comes off, and what's under it isn't a flavor. it's a ballot. the flock writes that line.`
    )}

    <!-- sign-off ritual -->
    ${ledgerLine("entry 003: recipes locked, materials moving. one line covered, for now.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}

// ─── Dispatch 004: the first flavor ballot — election poster ─────────────────
// The payoff of the redaction bit: the flavor bar was covering a blank line,
// because that line belongs to the flock. The founding perk made real —
// members vote on what gets made, framed as a cliffhanger election.
// Pass the live ballot URL at send time; defaults to the drop ledger page.

export function ballotEmail(email: string, voteUrl: string = `${EMAIL.siteUrl}/drop`) {
  const subject = "dispatch 004: the bar was hiding a blank";
  const previewText = "the flavor line was never a secret. it's unwritten. the first ballot decides who writes it.";
  const html = emailShell(`

    ${masthead("lavender", "✿ &nbsp;dispatch 004&nbsp; · &nbsp;flock business&nbsp; · &nbsp;polls open&nbsp; ✿")}

    <!-- hero: the election poster (composed art) -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.heroBallot}" alt="ballot no. 001: vanilla versus strawberry. one vote per member. the flock decides." width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- cold open: the reveal -->
    <tr><td align="center" style="padding:40px 40px 0;background-color:${EMAIL.canvas};">
      ${eyebrow("dispatch 004 · flock business")}
      ${headline("the flavor line was<br/>blank all along.", 38)}
    </td></tr>
    <tr><td align="center" style="padding:22px 60px 28px;background-color:${EMAIL.canvas};">
      ${para(
        `the redaction on the flavor line comes off today. under it: nothing. not a secret, a blank. the production sheet has one line nobody at shroomé is allowed to write, because it belongs to the flock. the first ballot is open, and it fills that line in.`
      )}
    </td></tr>

    <!-- the empty seat -->
    <tr><td style="padding:0 32px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="center" style="background-color:${EMAIL.lavender};border:2px dashed ${EMAIL.ink};border-radius:16px;padding:30px 16px 26px;">
          <p style="margin:0 0 6px;font-family:${DISPLAY};font-size:44px;font-weight:800;letter-spacing:-0.02em;line-height:1;color:${EMAIL.ink};">?</p>
          <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.ink};opacity:0.7;">seat three · your call</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:26px 60px 0;background-color:${EMAIL.canvas};">
      ${para(
        `one vote per member. the count is read into the ledger, the winner goes to the production floor, and the flock hears the result before anyone else does. obviously. polls do not stay open forever, and mé will not be doing recounts.`
      )}
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:30px 40px 0;background-color:${EMAIL.canvas};">
      ${ctaButton(voteUrl, "cast your vote →")}
    </td></tr>

    <!-- open loop: the count -->
    ${nextDispatch(
      `next dispatch: the count. one flavor takes seat three, the ledger gets a new open page, and the flock hears the winner first.`
    )}

    <!-- sign-off ritual -->
    ${ledgerLine("ballot no. 001: open. mé counts alone. mé has never miscounted anything.")}

    <tr><td align="center" style="padding:20px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email, previewText);

  return { subject, html };
}
