// ─── shroome emails — premium beverage brand ────────────────────────────────
// DESIGN PHILOSOPHY: One flowing canvas. Every section melts into the next.
// No jarring color blocks. Smooth gradient transitions. Full-bleed images.
// Deep accent-green text (accentDeep), never black. Lifestyle > catalog.
// Inspired by: Blume, Italic, La Machine Cycling Club, Glossier
//
// All brand values come from app/lib/brand.ts (the single source of truth).
// Emails need LITERAL colors at send time, so we read the JS constants here
// (never CSS variables) — the literals are interpolated when the HTML is built.
import { BRAND, alpha } from "./brand";

// Email-scoped shorthands (literal hex at send time).
const EMAIL = {
  ink: BRAND.colors.ink,
  canvas: BRAND.colors.canvas,
  accent: BRAND.colors.accent,
  accentDeep: BRAND.colors.accentDeep,
  accentWarmSoft: BRAND.colors.accentWarmSoft,
  flavorStrawberry: BRAND.colors.flavorStrawberry,
  flavorFunctional: BRAND.colors.flavorFunctional,
  tintSoft: BRAND.colors.tintSoft,
  sachetsBoth: `${BRAND.siteUrl}/sachets-both.png`,
  sachetVanilla: `${BRAND.siteUrl}/sachet-vanilla.png`,
  siteUrl: BRAND.siteUrl,
};

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

const SERIF = BRAND.emailFonts.display;
const SANS = BRAND.emailFonts.body;

function emailShell(content: string, email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>shroomé</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL.tintSoft};font-family:${SANS};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${EMAIL.tintSoft};">
    <tr><td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        ${content}
        <tr><td align="center" style="padding:20px 24px 32px;background-color:${EMAIL.tintSoft};">
          <p style="margin:0 0 4px;font-size:10px;color:${EMAIL.ink};opacity:0.25;">\u00a9 ${new Date().getFullYear()} shroome</p>
          ${/* TODO: insert full street address before first commercial send \u2014 CAN-SPAM requires a valid physical postal address */""}
          <p style="margin:0 0 6px;font-size:10px;color:${EMAIL.ink};opacity:0.25;">SHROOM\u00c9 \u00b7 Z Squared Beverages LLC \u00b7 Los Angeles, CA</p>
          <a href="${unsub(email)}" style="font-size:10px;color:${EMAIL.ink};opacity:0.3;text-decoration:underline;">unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeEmail(email: string, referralCode?: string) {
  const subject = "you just made the list \ud83d\udc9a";
  const heroImg = "https://www.drinkshroome.com/email-hero-cup.jpg";
  const cloudsImg = "https://www.drinkshroome.com/email-clouds-bg.jpg";
  const G = EMAIL.accentDeep; // deep accent-green shorthand
  const html = emailShell(`

    <!-- ═══ HERO — full-bleed lifestyle image, text below the cup ═══ -->
    <tr><td style="padding:0;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${heroImg}') center top / cover no-repeat ${EMAIL.ink};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, ${alpha("ink",0.08)} 0%, ${alpha("ink",0.05)} 30%, ${alpha("ink",0.55)} 55%, ${alpha("ink",0.88)} 100%);">
            <tr><td style="padding:16px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:22px;font-family:${SERIF};font-style:normal;color:#fff;font-weight:400;">shroom\u00e9</td>
                  <td align="right"><span style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.accent};font-weight:700;">PRE-LAUNCH</span></td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:300px 0 0;"></td></tr>
            <tr><td style="padding:0 36px 8px;text-align:center;">
              <p style="margin:0 0 10px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accent};font-weight:700;">\u2726 YOU\u2019RE IN \u2726</p>
              <h1 style="margin:0;font-size:42px;color:#fff;font-weight:400;line-height:1.05;font-family:${SERIF};">
                Caf\u00e9 energy.<br/><span style="font-style:normal;color:${EMAIL.accent};">Home address.</span>
              </h1>
            </td></tr>
            <tr><td style="padding:12px 48px 16px;text-align:center;">
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.8);line-height:1.6;">
                The world\u2019s first liquid ceremonial matcha latte.<br/>2.5g matcha \u00b7 mushroom extracts \u00b7 collagen \u00b7 zero crash.
              </p>
            </td></tr>
            <tr><td style="padding:0 36px 28px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background:${alpha("accent",0.15)};border-radius:20px;padding:5px 13px;border:1px solid ${alpha("accent",0.25)};"><span style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${EMAIL.accent};">FIRST ACCESS</span></td>
                  <td style="width:6px;"></td>
                  <td style="background:${alpha("accent",0.15)};border-radius:20px;padding:5px 13px;border:1px solid ${alpha("accent",0.25)};"><span style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${EMAIL.accent};">FREE SHIPPING</span></td>
                  <td style="width:6px;"></td>
                  <td style="background:${alpha("accent",0.15)};border-radius:20px;padding:5px 13px;border:1px solid ${alpha("accent",0.25)};"><span style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${EMAIL.accent};">EARLY ACCESS</span></td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ FLOW: hero → sachets (ink fades into flavor tint) ═══ -->
    <tr><td style="padding:0;background:linear-gradient(180deg, ${EMAIL.ink} 0%, ${EMAIL.flavorFunctional} 100%);text-align:center;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:36px 36px 6px;text-align:center;">
          <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.4);font-weight:600;">THE 30 SECONDS</p>
          <p style="margin:0;font-size:30px;color:#fff;font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
            Tear. Pour. <span style="color:${EMAIL.accent};">Feel the shift.</span>
          </p>
        </td></tr>
        <tr><td style="padding:20px 16px 0;text-align:center;">
          <img src="${EMAIL.sachetsBoth}" alt="shroom\u00e9 sachets" width="460" style="display:inline-block;width:82%;max-width:460px;height:auto;" />
        </td></tr>
        <tr><td style="padding:16px 40px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:${G};line-height:1.7;opacity:0.7;">
            Two flavors. Twelve per box. Pre-dissolved \u2014 no powder, no frother. 30 seconds to caf\u00e9-grade matcha.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ REFERRAL SECTION — accent block ═══════════════════════ -->
    ${referralCode ? `
    <tr><td style="padding:0;background-color:${EMAIL.accent};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:36px 40px 12px;text-align:center;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.ink};opacity:0.5;font-weight:600;">SHARE THE LOVE</p>
          <p style="margin:0 0 16px;font-size:28px;color:${EMAIL.ink};font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
            Give your friends the same deal.
          </p>
          <p style="margin:0 0 20px;font-size:14px;color:${EMAIL.ink};line-height:1.6;opacity:0.7;">
            Every friend who joins through your link = credit on your account:<br/><strong>$5 for your 1st &middot; $10 total at 3 &middot; $15 total at 5.</strong><br/>Real dollars, applied automatically at checkout on drop day.
          </p>
        </td></tr>
        <tr><td style="padding:0 40px 16px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td style="background:${EMAIL.ink};border-radius:8px;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:1px;text-transform:uppercase;font-weight:600;">Your referral link</p>
              <a href="https://www.drinkshroome.com?ref=${referralCode}" style="font-size:18px;font-weight:700;color:${EMAIL.accent};text-decoration:none;letter-spacing:0.5px;font-family:${SANS};">
                drinkshroome.com?ref=${referralCode}
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:12px 40px 8px;text-align:center;">
          <a href="https://www.drinkshroome.com/refer" style="display:inline-block;background:${EMAIL.ink};color:${EMAIL.canvas};padding:14px 32px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;font-family:${SANS};">
            Share &amp; track your referrals &rarr;
          </a>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:${EMAIL.ink};opacity:0.45;">
            Credits cap at $15 &mdash; and our top referrer gets a hand-numbered box from case 001.
          </p>
        </td></tr>
      </table>
    </td></tr>
    ` : ''}

    <!-- ═══ FLOW: tint → ink (smooth transition into ingredients) ═══ -->
    <tr><td style="padding:40px 40px 24px;background:linear-gradient(180deg, ${EMAIL.flavorFunctional} 0%, ${EMAIL.ink} 100%);text-align:center;">
      <p style="margin:0 0 6px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5);font-weight:600;">WHAT\u2019S INSIDE</p>
      <p style="margin:0;font-size:34px;color:#fff;font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
        Clean label. <span style="color:${EMAIL.accent};">Real doses.</span>
      </p>
    </td></tr>

    <!-- Three stat cards — matching drinkshroome.com exactly -->
    <tr><td style="padding:0 24px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <!-- 2.5g matcha card -->
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;">
                <span style="font-size:36px;font-weight:300;color:${EMAIL.accent};font-family:${SERIF};font-style:normal;">2.5g</span>
                <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-left:12px;"> CEREMONIAL MATCHA</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">First-harvest, shade-grown. 60mg caffeine. Not culinary grade \u2014 the real thing.</p>
            </td></tr>
          </table>
        </td></tr>
        <!-- 200mg MUSHROOM EXTRACTS card -->
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;">
                <span style="font-size:36px;font-weight:300;color:${EMAIL.accent};font-family:${SERIF};font-style:normal;">200mg</span>
                <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-left:12px;"> ORGANIC MUSHROOM EXTRACTS</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">70%+ beta-glucan (1/3, 1/6) purity. Immune activation, sustained focus, no crash. Most brands: 15\u201330%.</p>
            </td></tr>
          </table>
        </td></tr>
        <!-- 2g COLLAGEN card -->
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;">
                <span style="font-size:36px;font-weight:300;color:${EMAIL.accent};font-family:${SERIF};font-style:normal;">2g</span>
                <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-left:12px;"> GRASS-FED COLLAGEN</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">Pre-dissolved bioavailable peptides for skin, hair, nails, and gut.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- THE BIG HOOK — beta-glucan education -->
    <tr><td style="padding:36px 40px 20px;background-color:${EMAIL.ink};text-align:center;">
      <p style="margin:0 0 14px;font-size:32px;color:#fff;font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
        Other brands sell you<br/>mushroom powder.
      </p>
      <p style="margin:0;font-size:28px;color:${EMAIL.accent};font-weight:700;font-family:${SANS};line-height:1.15;">
        We sell you what's inside it.
      </p>
    </td></tr>

    <!-- ACCENT STAT CARD — 70%+ hero number -->
    <tr><td style="padding:20px 36px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background-color:${EMAIL.accent};border-radius:16px;padding:32px 24px;text-align:center;">
          <p style="margin:0;font-size:72px;font-weight:800;color:${EMAIL.ink};line-height:1;letter-spacing:-3px;">70%+</p>
          <p style="margin:6px 0 0;font-size:13px;font-weight:700;color:${EMAIL.ink};letter-spacing:1.5px;text-transform:uppercase;">
            BETA-GLUCAN (1/3, 1/6) CONCENTRATION
          </p>
          <p style="margin:8px 0 0;font-size:12px;color:${EMAIL.ink};opacity:0.6;">
            The highest you can get. Most brands: 15\u201330%.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- POINT BLANK BETA-GLUCAN FACTS -->
    <tr><td style="padding:28px 40px 12px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">FDA GRAS designated.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Not a random blend. Specific, bioactive, defensible.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">Immune system on full blast.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Activates macrophages &amp; natural killer cells.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">Focus that lasts all day.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Lion\u2019s mane beta-glucans + 60mg matcha caffeine + L-theanine.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">No 2pm crash.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Reishi beta-glucans regulate cortisol. Energy up, anxiety down.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0;">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">Better gut. Better skin.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Prebiotic for your microbiome. Week two is when you feel it.</p>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- ═══ FLOW: ink → clouds CTA (seamless transition) ═══ -->
    <tr><td style="padding:0;background:linear-gradient(180deg, ${EMAIL.ink} 0%, ${EMAIL.flavorStrawberry} 100%);">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:36px 40px 0;text-align:center;">
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.2);font-style:normal;">
            \u201cEvery competitor sells mushroom powder. We sell what\u2019s actually inside it.\u201d
          </p>
        </td></tr>
        <tr><td style="padding:24px 0 0;"></td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:0;background-color:${EMAIL.flavorStrawberry};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${cloudsImg}') center center / cover no-repeat ${EMAIL.flavorStrawberry};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, ${alpha("flavorStrawberry",0.75)} 0%, ${alpha("flavorStrawberry",0.55)} 40%, ${alpha("flavorFunctional",0.7)} 100%);">
            <tr><td style="padding:40px 40px 16px;text-align:center;">
              <p style="margin:0 0 20px;font-size:34px;color:${G};font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
                This is what<br/>you\u2019re <span style="color:${EMAIL.accentWarmSoft};">getting.</span>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr><td style="background:${G};border-radius:50px;padding:14px 48px;">
                  <a href="${EMAIL.siteUrl}" style="color:${EMAIL.accent};font-size:12px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
                    EXPLORE SHROOM\u00c9 \u2192
                  </a>
                </td></tr>
              </table>
              <p style="margin:12px 0 0;font-size:11px;color:${G};opacity:0.5;">
                20% off + free shipping locked in.<br/>
                reply with your number for SHROOME30 &mdash; it replaces your 20% code. best code wins.
              </p>
            </td></tr>
            <tr><td style="padding:24px 40px 36px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 14px;"><a href="https://tiktok.com/@drinkshroome" style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${G};text-decoration:none;opacity:0.4;">TikTok</a></td>
                  <td style="padding:0 14px;"><a href="https://instagram.com/drinkshroome" style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${G};text-decoration:none;opacity:0.4;">Instagram</a></td>
                  <td style="padding:0 14px;"><a href="https://youtube.com/@drinkshroome" style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${G};text-decoration:none;opacity:0.4;">YouTube</a></td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

  `, email);

  return { subject, html };
}

export function sachetEmail(email: string) {
  const subject = "what\u2019s actually in it \ud83d\udc9a";
  const heroImg = "https://www.drinkshroome.com/email-hero-cup.jpg";
  const cloudsImg = "https://www.drinkshroome.com/email-clouds-bg.jpg";
  const html = emailShell(`

    <!-- ═══ HERO — clouds background with overlay ═══ -->
    <tr><td style="padding:0;background-color:${EMAIL.flavorStrawberry};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${cloudsImg}') center top / cover no-repeat ${EMAIL.flavorStrawberry};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, ${alpha("flavorFunctional",0.8)} 0%, ${alpha("flavorStrawberry",0.7)} 50%, ${alpha("canvas",0.85)} 100%);">
            <tr><td style="padding:20px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:22px;font-family:${SERIF};font-style:normal;color:${EMAIL.ink};font-weight:400;">shroom\u00e9</td>
                  <td align="right"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.ink};font-weight:700;opacity:0.5;">EMAIL 2 OF 2</span></td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:40px 36px 12px;text-align:center;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.accentDeep};opacity:0.6;font-weight:700;">INSIDE THE SACHET</p>
              <h1 style="margin:0;font-size:44px;color:${EMAIL.accentDeep};font-weight:400;line-height:1.05;font-family:${SERIF};">
                Not all matcha is<br/>created <span style="color:${EMAIL.accentWarmSoft};font-style:normal;">equal.</span>
              </h1>
            </td></tr>
            <tr><td style="padding:16px 48px 44px;text-align:center;">
              <p style="margin:0;font-size:14px;color:${EMAIL.accentDeep};line-height:1.6;opacity:0.65;">
                Here\u2019s what separates shroom\u00e9 from everything else on the shelf \u2014 and why the ingredients matter more than the label.
              </p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ FLOW: clouds hero → sachet on flavor tint → ink ═══ -->
    <tr><td style="padding:0;background:linear-gradient(180deg, ${EMAIL.flavorStrawberry} 0%, ${EMAIL.flavorFunctional} 100%);">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:32px 20px 0;text-align:center;">
          <img src="${EMAIL.sachetVanilla}" alt="shroom\u00e9 vanilla sachet" width="180" style="display:inline-block;width:180px;max-width:180px;height:auto;" />
        </td></tr>
        <tr><td style="padding:16px 40px 28px;text-align:center;">
          <p style="margin:0;font-size:20px;color:${EMAIL.accentDeep};font-weight:400;font-family:${SERIF};font-style:normal;">
            pour \u00b7 swirl \u00b7 <span style="color:${EMAIL.accentWarmSoft};">glow</span>
          </p>
          <p style="margin:8px 0 0;font-size:11px;color:${EMAIL.accentDeep};opacity:0.5;letter-spacing:1px;text-transform:uppercase;font-weight:600;">
            ceremonial matcha \u00b7 collagen \u00b7 mushroom beta-glucans
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ FLOW: tint → ink (seamless) ═══ -->
    <tr><td style="padding:40px 40px 20px;background:linear-gradient(180deg, ${EMAIL.flavorFunctional} 0%, ${EMAIL.ink} 100%);text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${EMAIL.flavorFunctional};font-weight:600;">THE DIFFERENCE</p>
      <p style="margin:0 0 14px;font-size:34px;color:#fff;font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
        It\u2019s not the mushroom.
      </p>
      <p style="margin:0;font-size:26px;color:${EMAIL.accent};font-weight:700;font-family:${SANS};line-height:1.15;">
        It\u2019s the beta-glucan inside it.
      </p>
    </td></tr>

    <!-- ═══ 70%+ STAT — accent card ═══ -->
    <tr><td style="padding:24px 28px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background-color:${EMAIL.accent};border-radius:16px;padding:36px 24px;text-align:center;">
          <p style="margin:0;font-size:80px;font-weight:800;color:${EMAIL.ink};line-height:1;letter-spacing:-3px;">70%+</p>
          <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:${EMAIL.ink};letter-spacing:1.5px;text-transform:uppercase;">
            BETA-GLUCAN (1,3 AND 1,6) CONCENTRATION
          </p>
          <p style="margin:10px 0 0;font-size:13px;color:${EMAIL.ink};opacity:0.55;line-height:1.5;">
            The highest commercially available. Most supplements: 15\u201330%.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ VS COMPARISON — side by side ═══ -->
    <tr><td style="padding:24px 28px 8px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="48%" style="background:rgba(255,255,255,0.04);border-radius:12px;padding:20px 16px;text-align:center;vertical-align:top;border:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:700;">THEM</p>
            <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:rgba(255,255,255,0.2);line-height:1;">15\u201330%</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.4;">Mycelium on grain.<br/>Mostly rice starch.<br/>Untested.</p>
          </td>
          <td width="4%"></td>
          <td width="48%" style="background:${alpha("accent",0.08)};border-radius:12px;padding:20px 16px;text-align:center;vertical-align:top;border:1px solid ${alpha("accent",0.15)};">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${EMAIL.accent};font-weight:700;">SHROOM\u00c9</p>
            <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:${EMAIL.accent};line-height:1;">70%+</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.4;">Fruiting body extract.<br/>Hot water extracted.<br/>Third-party verified.</p>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- ═══ BENEFITS LIST ═══ -->
    <tr><td style="padding:28px 36px 12px;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">\u26a1 Immune system on full blast.</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Activates macrophages &amp; natural killer cells.</p>
        </td></tr>
        <tr><td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">\ud83e\udde0 Focus that lasts all day.</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Lion\u2019s mane + 60mg matcha caffeine + L-theanine.</p>
        </td></tr>
        <tr><td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">\u2728 Skin glow. Gut health.</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">2g grass-fed collagen peptides + prebiotic beta-glucans.</p>
        </td></tr>
        <tr><td style="padding:16px 0;">
          <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">\ud83d\udc9a No crash. Zero anxiety.</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Reishi regulates cortisol. Energy up, jitters gone.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ FLOW: ink → lifestyle CTA (seamless with gradient bridge) ═══ -->
    <tr><td style="padding:0;background:linear-gradient(180deg, ${EMAIL.ink} 0%, ${alpha("ink",0.85)} 100%);">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:28px 40px;text-align:center;">
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.2);font-style:normal;">
            \u201cEvery competitor sells mushroom powder. We sell what\u2019s actually inside it.\u201d
          </p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:0;background-color:${EMAIL.ink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${heroImg}') center center / cover no-repeat ${EMAIL.ink};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, ${alpha("ink",0.8)} 0%, ${alpha("ink",0.35)} 40%, ${alpha("flavorStrawberry",0.5)} 100%);">
            <tr><td style="padding:48px 40px 16px;text-align:center;">
              <p style="margin:0 0 20px;font-size:36px;color:#fff;font-weight:400;font-family:${SERIF};font-style:normal;line-height:1.1;">
                The matcha is already made.<br/><span style="color:${EMAIL.accent};">Just pour.</span>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr><td style="background:${EMAIL.accent};border-radius:50px;padding:14px 48px;">
                  <a href="${EMAIL.siteUrl}" style="color:${EMAIL.ink};font-size:12px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
                    EXPLORE SHROOM\u00c9 \u2192
                  </a>
                </td></tr>
              </table>
              <p style="margin:12px 0 0;font-size:11px;color:rgba(255,255,255,0.55);">20% off + free shipping locked in.</p>
            </td></tr>
            <tr><td style="padding:20px 40px 40px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 14px;"><a href="https://tiktok.com/@drinkshroome" style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.35);text-decoration:none;">TikTok</a></td>
                  <td style="padding:0 14px;"><a href="https://instagram.com/drinkshroome" style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.35);text-decoration:none;">Instagram</a></td>
                  <td style="padding:0 14px;"><a href="https://youtube.com/@drinkshroome" style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.35);text-decoration:none;">YouTube</a></td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

  `, email);

  return { subject, html };
}
