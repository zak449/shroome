// ─── shroomé emails — identity v2 (Bolden rebrand) ───────────────────────────
// DESIGN SYSTEM (matches the site + packaging):
//   • lavender (#E3D5F7 tintSoft) header field with the wordmark image
//   • cream (#FEFFF8 canvas) body, ink (#2D341A) type
//   • matcha (#7A881F accent) CTA buttons with cream text
//   • pink (#FF6DC7) ONLY in strawberry flavor contexts
//   • footer: mé the sheep + "mé, our sheep. keeps the ledger, never spills."
// VOICE: lowercase-cool, warm, confident. "the first run / the next run",
//   sold out = "poured out", speed = "the stir is the recipe". Real numbers
//   only (500 boxes, 9 days). Community first, never discount-led.
// EMAIL-SAFE: tables + inline styles, max-width 600, bulletproof buttons,
//   alt text on every image, images never load-bearing for meaning.
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
  sheepSolid: `${EMAIL.siteUrl}/brand/symbol-sheep-solid.png`,
  sheepDrink: `${EMAIL.siteUrl}/brand/sheep-drink.png`,
  sachetVanilla: `${EMAIL.siteUrl}/sachet-vanilla.png`,
  sachetStrawberry: `${EMAIL.siteUrl}/sachet-strawberry.png`,
  badgeMatcha: `${EMAIL.siteUrl}/brand/badge-matcha.png`,
  badgeCollagen: `${EMAIL.siteUrl}/brand/badge-collagen.png`,
  badgeGlucans: `${EMAIL.siteUrl}/brand/badge-b-glucans.png`,
  badgeReady: `${EMAIL.siteUrl}/brand/badge-ready-to-pour.png`,
  heroPour: `${EMAIL.siteUrl}/brand/hero-pour.jpg`,
  cupLogo: `${EMAIL.siteUrl}/brand/cup-logo.jpg`,
  shipperBox: `${EMAIL.siteUrl}/brand/shipper-box.jpg`,
  sachetSip: `${EMAIL.siteUrl}/brand/ig-sachet-sip.jpg`,
  me02: `${EMAIL.siteUrl}/brand/me-02.png`,
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

// ─── Shared building blocks ──────────────────────────────────────────────────

/** Lavender header field with the hosted wordmark. */
function header() {
  return `
    <tr><td align="center" style="padding:28px 24px 24px;background-color:${EMAIL.lavender};">
      <a href="${EMAIL.siteUrl}" style="text-decoration:none;">
        <img src="${ASSET.wordmark}" alt="shroomé" width="210" style="display:block;width:210px;max-width:60%;height:auto;border:0;" />
      </a>
    </td></tr>`;
}

/** Bulletproof matcha CTA button — cream text on #7A881F, table-wrapped. */
function ctaButton(href: string, label: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr><td align="center" bgcolor="${EMAIL.accent}" style="background-color:${EMAIL.accent};border-radius:999px;">
        <a href="${href}" style="display:inline-block;padding:15px 40px;font-family:${SANS};font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${EMAIL.accentContrast};text-decoration:none;border-radius:999px;">${label}</a>
      </td></tr>
    </table>`;
}

/** Footer: mé the sheep, ledger line, legal, unsubscribe. */
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

function emailShell(content: string, email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>shroomé</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL.lavender};font-family:${SANS};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${EMAIL.lavender};">
    <tr><td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        ${header()}
        ${content}
        ${footer(email)}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Welcome email (flock welcome) ───────────────────────────────────────────

export function welcomeEmail(email: string, referralCode?: string) {
  const subject = "you're in the flock 🐑";
  const html = emailShell(`

    <!-- hero: the pour -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.heroPour}" alt="shroomé matcha pouring over ice in a tall glass" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- headline + body -->
    <tr><td align="center" style="padding:40px 40px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">welcome</p>
      <h1 style="margin:0;font-family:${SANS};font-size:34px;font-weight:800;line-height:1.1;color:${EMAIL.ink};">you're in the flock.</h1>
    </td></tr>
    <tr><td align="center" style="padding:16px 48px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        good timing. the first run was ${DROP_001.boxes} boxes and it poured out in ${DROP_001.soldOutInDays} days.
        the next run is already in motion, and as flock you shop it a full day before anyone else.
      </p>
    </td></tr>
    <tr><td align="center" style="padding:12px 48px 32px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        shroomé is liquid ceremonial matcha with lion's mane and collagen. no powder, no whisk, no clumps.
        pour it over milk and stir. the stir is the recipe.
      </p>
    </td></tr>

    <!-- the two flavors -->
    <tr><td style="padding:0 32px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="48%" align="center" valign="bottom" style="background-color:${EMAIL.flavorVanilla};border-radius:16px;padding:24px 12px 20px;">
            <img src="${ASSET.sachetVanilla}" alt="shroomé vanilla sachet" width="150" style="display:block;width:150px;max-width:90%;height:auto;border:0;margin:0 auto 12px;" />
            <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.ink};">vanilla</p>
          </td>
          <td width="4%" style="font-size:0;line-height:0;">&nbsp;</td>
          <td width="48%" align="center" valign="bottom" style="background-color:${EMAIL.flavorStrawberry};border-radius:16px;padding:24px 12px 20px;">
            <img src="${ASSET.sachetStrawberry}" alt="shroomé strawberry sachet" width="150" style="display:block;width:150px;max-width:90%;height:auto;border:0;margin:0 auto 12px;" />
            <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.canvas};">strawberry</p>
          </td>
        </tr>
      </table>
    </td></tr>
    <tr><td align="center" style="padding:14px 48px 32px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.65;">
        two flavors, twelve sachets per box. ready the second you stir.
      </p>
    </td></tr>

    <!-- badges: what's in every sachet -->
    <tr><td align="center" style="padding:0 40px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0 0 16px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">in every sachet</p>
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
      <p style="margin:14px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.65;">
        2.5g ceremonial matcha · 200mg mushroom extracts at 70%+ beta-glucans · 2g collagen
      </p>
    </td></tr>

    <!-- flock perks (ink card) -->
    <tr><td style="padding:32px 32px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:16px;padding:32px 32px 28px;">
          <p style="margin:0 0 6px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.lavender};">the flock</p>
          <p style="margin:0 0 18px;font-family:${SANS};font-size:22px;font-weight:800;color:${EMAIL.canvas};line-height:1.2;">what being in gets you</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.6;color:${EMAIL.canvas};">✓ shop every run a full day early</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.6;color:${EMAIL.canvas};">✓ vote on new flavors</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.6;color:${EMAIL.canvas};">✓ member-only merch, never sold, only earned</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.6;color:${EMAIL.canvas};">✓ free gifts with subscriptions</p>
          <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;color:${EMAIL.canvas};">✓ the drop-day text, so you never miss a run</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:32px 40px 12px;background-color:${EMAIL.canvas};">
      ${ctaButton(EMAIL.siteUrl, "see the next run →")}
      <p style="margin:14px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
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
            <tr><td align="center" style="padding:28px 32px 8px;">
              <p style="margin:0 0 6px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">bring a friend</p>
              <p style="margin:0 0 12px;font-family:${SANS};font-size:22px;font-weight:800;color:${EMAIL.ink};line-height:1.2;">the flock grows by word of mouth.</p>
              <p style="margin:0 0 16px;font-family:${SANS};font-size:14px;line-height:1.7;color:${EMAIL.ink};">
                every friend who joins through your link earns you real credit for the next run:
                <strong>$5 for your first · $10 total at 3 · $15 total at 5.</strong>
                applied automatically at checkout on drop day.
              </p>
            </td></tr>
            <tr><td align="center" style="padding:0 32px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr><td align="center" bgcolor="${EMAIL.ink}" style="background-color:${EMAIL.ink};border-radius:12px;padding:14px 28px;">
                  <p style="margin:0 0 2px;font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${EMAIL.lavender};">your link</p>
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

    <!-- sign-off -->
    <tr><td align="center" style="padding:28px 40px 32px;background-color:${EMAIL.canvas};">
      <img src="${ASSET.sheepDrink}" alt="mé the sheep sipping a shroomé" width="90" style="display:block;width:90px;height:auto;border:0;margin:0 auto 12px;" />
      <p style="margin:0 0 18px;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.7;">
        glad you're here. mé already wrote you into the ledger.
      </p>
      ${socialRow()}
    </td></tr>

  `, email);

  return { subject, html };
}

// ─── Follow-up email (what's inside the sachet) ──────────────────────────────

export function sachetEmail(email: string) {
  const subject = "the stir is the recipe 🍵";
  const html = emailShell(`

    <!-- hero: sachet + sip -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.sachetSip}" alt="pouring a shroomé sachet into a glass of iced milk" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <!-- headline + body -->
    <tr><td align="center" style="padding:40px 40px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">inside the sachet</p>
      <h1 style="margin:0;font-family:${SANS};font-size:34px;font-weight:800;line-height:1.1;color:${EMAIL.ink};">the stir is the recipe.</h1>
    </td></tr>
    <tr><td align="center" style="padding:16px 48px 28px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        no powder, no frother, no 40-second whisk workout. the matcha is already made.
        tear the sachet, pour it over milk, stir. ready the second you stir.
        here's what's actually in it.
      </p>
    </td></tr>

    <!-- ingredient cards (ink section) -->
    <tr><td style="padding:0 32px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.ink};border-radius:16px;padding:28px 28px 24px;">

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:0 0 14px;border-bottom:1px solid rgba(254,255,248,0.12);">
              <p style="margin:0;font-family:${SANS};"><span style="font-size:30px;font-weight:800;color:${EMAIL.lavender};">2.5g</span>
              <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.canvas};">&nbsp; ceremonial matcha</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:rgba(254,255,248,0.6);">first-harvest, shade-grown, 60mg caffeine. the real thing, not culinary grade.</p>
            </td></tr>
            <tr><td style="padding:14px 0;border-bottom:1px solid rgba(254,255,248,0.12);">
              <p style="margin:0;font-family:${SANS};"><span style="font-size:30px;font-weight:800;color:${EMAIL.lavender};">200mg</span>
              <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.canvas};">&nbsp; mushroom extracts</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:rgba(254,255,248,0.6);">fruiting-body extract at 70%+ beta-glucans (1,3 and 1,6). most brands sit at 15 to 30%.</p>
            </td></tr>
            <tr><td style="padding:14px 0 0;">
              <p style="margin:0;font-family:${SANS};"><span style="font-size:30px;font-weight:800;color:${EMAIL.lavender};">2g</span>
              <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.canvas};">&nbsp; grass-fed collagen</span></p>
              <p style="margin:6px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:rgba(254,255,248,0.6);">pre-dissolved bioavailable peptides for skin, hair, nails, and gut.</p>
            </td></tr>
          </table>

        </td></tr>
      </table>
    </td></tr>

    <!-- why it matters -->
    <tr><td align="center" style="padding:32px 48px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0 0 12px;font-family:${SANS};font-size:22px;font-weight:800;line-height:1.25;color:${EMAIL.ink};">
        other brands sell mushroom powder.<br/>we sell what's inside it.
      </p>
      <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${EMAIL.ink};opacity:0.75;">
        beta-glucans are the part of the mushroom your immune system actually recognizes.
        ours are hot-water extracted from the fruiting body and third-party verified.
        calm focus from lion's mane, steady energy from matcha, no 2pm crash.
      </p>
    </td></tr>

    <!-- badges row -->
    <tr><td align="center" style="padding:24px 40px 8px;background-color:${EMAIL.canvas};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="padding:0 8px;">
            <img src="${ASSET.badgeMatcha}" alt="ceremonial matcha badge" width="80" style="display:block;width:80px;height:auto;border:0;" />
          </td>
          <td align="center" style="padding:0 8px;">
            <img src="${ASSET.badgeGlucans}" alt="beta-glucans badge" width="80" style="display:block;width:80px;height:auto;border:0;" />
          </td>
          <td align="center" style="padding:0 8px;">
            <img src="${ASSET.badgeCollagen}" alt="collagen badge" width="80" style="display:block;width:80px;height:auto;border:0;" />
          </td>
          <td align="center" style="padding:0 8px;">
            <img src="${ASSET.badgeReady}" alt="ready to pour badge" width="80" style="display:block;width:80px;height:auto;border:0;" />
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- the cup moment -->
    <tr><td style="padding:28px 32px 0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.cupLogo}" alt="an iced shroomé matcha latte in a logo cup" width="536" style="display:block;width:100%;height:auto;border:0;border-radius:16px;" />
    </td></tr>
    <tr><td align="center" style="padding:16px 48px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.65;">
        café counter taste, kitchen counter effort.
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:28px 40px 12px;background-color:${EMAIL.canvas};">
      ${ctaButton(EMAIL.siteUrl, "meet shroomé →")}
      <p style="margin:14px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        the first run was ${DROP_001.boxes} boxes and poured out in ${DROP_001.soldOutInDays} days.<br/>
        the flock shops the next run a full day early. you're already in.
      </p>
    </td></tr>

    <!-- sign-off -->
    <tr><td align="center" style="padding:24px 40px 32px;background-color:${EMAIL.canvas};">
      ${socialRow()}
    </td></tr>

  `, email);

  return { subject, html };
}

// ─── Lore drip 1: the sealed envelope ────────────────────────────────────────
// Waiting-period drama beat. mé the archivist has sealed an entry about the
// next run in the ledger. Honesty rule: promises nothing but "members hear
// first". No dates, no counts, no timers.

export function ledgerEmail(email: string) {
  const subject = "mé sealed something in the ledger";
  const html = emailShell(`

    <!-- the archivist -->
    <tr><td align="center" style="padding:40px 40px 8px;background-color:${EMAIL.canvas};">
      <img src="${ASSET.me02}" alt="mé the sheep, keeper of the shroomé ledger" width="120" style="display:block;width:120px;height:auto;border:0;margin:0 auto 16px;" />
      <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">from the ledger</p>
      <h1 style="margin:0;font-family:${SANS};font-size:32px;font-weight:800;line-height:1.15;color:${EMAIL.ink};">mé sealed an entry this week.</h1>
    </td></tr>
    <tr><td align="center" style="padding:16px 48px 28px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        mé keeps the ledger. every box of the first run is written in it, all ${DROP_001.boxes},
        and the day it poured out, day ${DROP_001.soldOutInDays}, is underlined twice.
        this week a new entry went in. then the envelope got sealed.
      </p>
    </td></tr>

    <!-- the sealed envelope -->
    <tr><td align="center" style="padding:0 48px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="center" style="background-color:${EMAIL.lavender};border:2px solid ${EMAIL.ink};border-radius:12px;padding:36px 28px;">
          <img src="${ASSET.sheepSolid}" alt="wax seal pressed with the mé sheep mark" width="56" style="display:block;width:56px;height:auto;border:0;margin:0 auto 14px;" />
          <p style="margin:0 0 6px;font-family:${SANS};font-size:12px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.ink};">entry no. 002 · sealed</p>
          <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${EMAIL.ink};opacity:0.6;">contents: the next run.<br/>size: still secret.<br/>opens: when it opens.</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:28px 48px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        here's what we can say. the next run exists. it is not a maybe.
        and when the envelope opens, the flock reads it a full day before the public does.
        that's the whole system: no countdown theater, just the ledger and who hears first.
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:28px 40px 32px;background-color:${EMAIL.canvas};">
      ${ctaButton(`${EMAIL.siteUrl}/drop`, "read the ledger →")}
      <p style="margin:14px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        mé doesn't leak. but mé does hint.
      </p>
    </td></tr>

  `, email);

  return { subject, html };
}

// ─── Lore drip 2: the redacted production sheet ──────────────────────────────
// Drama beat: a production-floor record with the good parts blacked out.
// The redaction is real text bars (ink blocks), never a fake number.

export function redactedEmail(email: string) {
  const subject = "we blacked most of this out";
  const redact = (width: number) =>
    `<span style="display:inline-block;width:${width}px;max-width:60%;height:12px;background-color:${EMAIL.ink};border-radius:2px;vertical-align:middle;">&nbsp;</span>`;
  const html = emailShell(`

    <!-- archive photo: the first run -->
    <tr><td style="padding:0;background-color:${EMAIL.canvas};">
      <img src="${ASSET.shipperBox}" alt="a shroomé shipper box from the first run, from the archive" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
    </td></tr>

    <tr><td align="center" style="padding:36px 40px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">from the production floor</p>
      <h1 style="margin:0;font-family:${SANS};font-size:32px;font-weight:800;line-height:1.15;color:${EMAIL.ink};">this sheet crossed mé's desk.</h1>
    </td></tr>
    <tr><td align="center" style="padding:16px 48px 24px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        that photo above is the first run. archive material now.
        the sheet below is not from the archive. it's current.
        we're showing you exactly as much as the ledger allows.
      </p>
    </td></tr>

    <!-- the redacted sheet -->
    <tr><td style="padding:0 40px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background-color:${EMAIL.canvas};border:2px solid ${EMAIL.ink};border-radius:12px;padding:28px 28px 24px;">
          <p style="margin:0 0 14px;font-family:${SANS};font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.ink};">production record · the next run</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.9;color:${EMAIL.ink};">status: <strong>in motion</strong></p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.9;color:${EMAIL.ink};">run size: ${redact(120)}</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.9;color:${EMAIL.ink};">new flavor candidate: ${redact(160)}</p>
          <p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.9;color:${EMAIL.ink};">first pour goes to: <strong>the flock, a full day early</strong></p>
          <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.5;">redactions by mé. appeals denied.</p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:24px 48px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${EMAIL.ink};opacity:0.8;">
        the bars come off in order: flock first, then everyone.
        nothing to do right now except be the kind of person who already knows.
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:24px 40px 32px;background-color:${EMAIL.canvas};">
      ${ctaButton(`${EMAIL.siteUrl}/drop`, "watch the ledger →")}
    </td></tr>

  `, email);

  return { subject, html };
}

// ─── Lore drip 3: the first flavor ballot ────────────────────────────────────
// The flock's founding perk made real: members vote on what gets made.
// Pass the live ballot URL at send time; defaults to the drop ledger page.

export function ballotEmail(email: string, voteUrl: string = `${EMAIL.siteUrl}/drop`) {
  const subject = "the first ballot is open 🗳️";
  const html = emailShell(`

    <tr><td align="center" style="padding:40px 40px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};">flock business</p>
      <h1 style="margin:0;font-family:${SANS};font-size:32px;font-weight:800;line-height:1.15;color:${EMAIL.ink};">the first ballot is open.</h1>
    </td></tr>
    <tr><td align="center" style="padding:16px 48px 28px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${EMAIL.ink};">
        we said the flock votes on new flavors. we meant it, and this is the first one.
        somewhere on that redacted production sheet is a blank line.
        your vote is what fills it in.
      </p>
    </td></tr>

    <!-- the incumbents -->
    <tr><td style="padding:0 32px;background-color:${EMAIL.canvas};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="48%" align="center" valign="bottom" style="background-color:${EMAIL.flavorVanilla};border-radius:16px;padding:20px 12px 16px;">
            <img src="${ASSET.sachetVanilla}" alt="shroomé vanilla sachet" width="120" style="display:block;width:120px;max-width:90%;height:auto;border:0;margin:0 auto 10px;" />
            <p style="margin:0;font-family:${SANS};font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.ink};">vanilla · incumbent</p>
          </td>
          <td width="4%" style="font-size:0;line-height:0;">&nbsp;</td>
          <td width="48%" align="center" valign="bottom" style="background-color:${EMAIL.flavorStrawberry};border-radius:16px;padding:20px 12px 16px;">
            <img src="${ASSET.sachetStrawberry}" alt="shroomé strawberry sachet" width="120" style="display:block;width:120px;max-width:90%;height:auto;border:0;margin:0 auto 10px;" />
            <p style="margin:0;font-family:${SANS};font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.canvas};">strawberry · incumbent</p>
          </td>
        </tr>
        <tr><td colspan="3" style="padding:12px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center" style="background-color:${EMAIL.lavender};border:2px dashed ${EMAIL.ink};border-radius:16px;padding:28px 16px;">
              <p style="margin:0 0 4px;font-family:${SANS};font-size:26px;font-weight:800;color:${EMAIL.ink};">?</p>
              <p style="margin:0;font-family:${SANS};font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.ink};opacity:0.7;">seat three · your call</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:24px 48px 8px;background-color:${EMAIL.canvas};">
      <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${EMAIL.ink};opacity:0.8;">
        one vote per member. results get read into the ledger, and the winner goes to the production floor.
        we'll tell the flock what won before we tell anyone else. obviously.
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:28px 40px 32px;background-color:${EMAIL.canvas};">
      ${ctaButton(voteUrl, "cast your vote →")}
      <p style="margin:14px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${EMAIL.ink};opacity:0.55;">
        mé counts the ballots. mé has never miscounted anything.
      </p>
    </td></tr>

  `, email);

  return { subject, html };
}
