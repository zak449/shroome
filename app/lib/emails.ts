// ─── shroome emails — premium beverage brand ────────────────────────────────
// ONE concept. SHORT copy. BOLD type. CONFIDENT.
// 60% beta glucans · 20% collagen · 20% drink
// Visual DNA: sachets on lavender/pink, organic circles, navy stat cards, lime accents

const BRAND = {
  navy: "#1B1F3B",
  cream: "#FDF4EE",
  lime: "#C8FF3A",
  pink: "#FFB7D1",
  lavender: "#D4B8E0",
  softLav: "#E8D5F0",
  blush: "#FFE0EC",
  sachetsBoth: "https://www.drinkshroome.com/sachets-both.png",
  sachetVanilla: "https://www.drinkshroome.com/sachet-vanilla.png",
  siteUrl: "https://drinkshroome.com",
};

function unsub(email: string) {
  return `${BRAND.siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
}

const SERIF = "Georgia,'Times New Roman',Times,serif";
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";

function emailShell(content: string, email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>shroome</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.softLav};font-family:${SANS};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.softLav};">
    <tr><td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        ${content}
        <tr><td align="center" style="padding:20px 24px 32px;background-color:${BRAND.softLav};">
          <p style="margin:0 0 4px;font-size:10px;color:${BRAND.navy};opacity:0.25;">\u00a9 ${new Date().getFullYear()} shroome</p>
          <a href="${unsub(email)}" style="font-size:10px;color:${BRAND.navy};opacity:0.2;text-decoration:underline;">unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeEmail(email: string) {
  const subject = "you just made the list \ud83d\udc9a";
  const html = emailShell(`

    <!-- NAVY TOP BAR — scrolling marquee feel -->
    <tr><td style="padding:12px 16px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${BRAND.lime};font-weight:600;">
        ENERGY WITHOUT THE CRASH \u2726 2G MATCHA \u00b7 MUSHROOM EXTRACTS \u00b7 COLLAGEN
      </p>
    </td></tr>

    <!-- ═══ HERO SECTION — lavender canvas + organic circles + sachets ═══ -->
    <!-- Matches drinkshroome.com hero exactly: big serif, sachets floating on color -->

    <!-- Wordmark + headline on lavender -->
    <tr><td style="padding:44px 40px 0;background-color:${BRAND.softLav};">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.navy};opacity:0.5;font-weight:600;">YOU\u2019RE IN \u2726 WELCOME TO THE LIST</p>
    </td></tr>
    <tr><td style="padding:8px 40px 0;background-color:${BRAND.softLav};">
      <h1 style="margin:0;font-size:52px;color:${BRAND.navy};font-weight:400;line-height:1.0;font-family:${SERIF};">
        Caf\u00e9 energy.<br/>Home address.<br/><span style="color:#E8936D;font-style:italic;">No crash.</span>
      </h1>
    </td></tr>

    <!-- Sub-line — matches site -->
    <tr><td style="padding:20px 40px 8px;background-color:${BRAND.softLav};">
      <p style="margin:0;font-size:14px;color:${BRAND.navy};line-height:1.6;">
        The world's first ready-to-pour ceremonial matcha latte. 2g matcha. 2g collagen. Real mushrooms. <strong>Tear it open. Pour it in. Done.</strong>
      </p>
    </td></tr>

    <!-- Pill tags — like the website -->
    <tr><td style="padding:16px 40px 12px;background-color:${BRAND.softLav};">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background-color:${BRAND.cream};border-radius:20px;padding:6px 14px;margin-right:6px;">
            <span style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${BRAND.navy};">2G MATCHA</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background-color:${BRAND.cream};border-radius:20px;padding:6px 14px;">
            <span style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${BRAND.navy};">MUSHROOM EXTRACTS</span>
          </td>
          <td style="width:8px;"></td>
          <td style="background-color:${BRAND.cream};border-radius:20px;padding:6px 14px;">
            <span style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${BRAND.navy};">COLLAGEN</span>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- SACHETS IMAGE — the actual product, on pink canvas with organic circle -->
    <tr><td style="padding:0;background-color:${BRAND.pink};text-align:center;">
      <!-- Pink circle accent behind sachets (organic shape like the website) -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.pink};">
        <tr>
          <td style="padding:20px 24px 0;text-align:center;">
            <img src="${BRAND.sachetsBoth}" alt="shroome vanilla and strawberry sachets" width="480" style="display:inline-block;width:80%;max-width:480px;height:auto;" />
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- Organic circle accents — lavender circle on pink (the shroome signature) -->
    <tr><td style="padding:0 0 0;background-color:${BRAND.pink};text-align:center;line-height:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="width:80px;height:80px;border-radius:50%;background-color:${BRAND.softLav};opacity:0.5;"></td>
          <td style="width:200px;"></td>
          <td style="width:120px;height:120px;border-radius:50%;background-color:${BRAND.lavender};opacity:0.35;"></td>
        </tr>
      </table>
    </td></tr>

    <!-- CTA — lime pill on pink -->
    <tr><td style="padding:24px 36px 36px;background-color:${BRAND.pink};text-align:center;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr><td style="background:${BRAND.lime};border-radius:50px;padding:16px 48px;">
          <a href="${BRAND.siteUrl}" style="color:${BRAND.navy};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
            SEE WHAT\u2019S INSIDE \u2192
          </a>
        </td></tr>
      </table>
      <p style="margin:10px 0 0;font-size:11px;color:${BRAND.navy};opacity:0.45;">
        Your 20% off + free shipping code drops at launch. You\u2019re locked in.
      </p>
    </td></tr>

    <!-- ═══ BETA-GLUCAN SECTION (60%) — navy block ═══════════════════════
         The education hook. Point-blank. Bold.
         ═════════════════════════════════════════════════════════════════ -->
    <tr><td style="padding:48px 40px 24px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.lavender};font-weight:600;">WHAT\u2019S INSIDE</p>
      <p style="margin:0 0 16px;font-size:38px;color:${BRAND.lavender};font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.05;opacity:0.6;">
        Clean label. Real doses.
      </p>
    </td></tr>

    <!-- Three stat cards — matching drinkshroome.com exactly -->
    <tr><td style="padding:0 24px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <!-- 2g MATCHA card -->
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;">
                <span style="font-size:36px;font-weight:300;color:${BRAND.lime};font-family:${SERIF};font-style:italic;">2g</span>
                <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-left:12px;"> CEREMONIAL MATCHA</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">First-harvest, shade-grown. 50mg caffeine. Not culinary grade \u2014 the real thing.</p>
            </td></tr>
          </table>
        </td></tr>
        <!-- 200mg MUSHROOM EXTRACTS card -->
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;">
                <span style="font-size:36px;font-weight:300;color:${BRAND.lime};font-family:${SERIF};font-style:italic;">200mg</span>
                <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-left:12px;"> ORGANIC MUSHROOM EXTRACTS</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">Immune support and sustained focus.</p>
            </td></tr>
          </table>
        </td></tr>
        <!-- 2g COLLAGEN card -->
        <tr><td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background-color:rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;">
                <span style="font-size:36px;font-weight:300;color:${BRAND.lime};font-family:${SERIF};font-style:italic;">2g</span>
                <span style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-left:12px;"> GRASS-FED COLLAGEN</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">Pre-dissolved bioavailable peptides for skin, hair, nails, and gut.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- THE BIG HOOK — beta-glucan education -->
    <tr><td style="padding:36px 40px 20px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0 0 14px;font-size:32px;color:#fff;font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
        Other brands sell you<br/>mushroom powder.
      </p>
      <p style="margin:0;font-size:28px;color:${BRAND.lime};font-weight:700;font-family:${SANS};line-height:1.15;">
        We sell you what's inside it.
      </p>
    </td></tr>

    <!-- LIME STAT CARD — 70%+ hero number -->
    <tr><td style="padding:20px 36px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background-color:${BRAND.lime};border-radius:16px;padding:32px 24px;text-align:center;">
          <p style="margin:0;font-size:72px;font-weight:800;color:${BRAND.navy};line-height:1;letter-spacing:-3px;">70%+</p>
          <p style="margin:6px 0 0;font-size:13px;font-weight:700;color:${BRAND.navy};letter-spacing:1.5px;text-transform:uppercase;">
            BETA-GLUCAN (1/3, 1/6) CONCENTRATION
          </p>
          <p style="margin:8px 0 0;font-size:12px;color:${BRAND.navy};opacity:0.6;">
            The highest you can get. Most brands: 15\u201330%.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- POINT BLANK BETA-GLUCAN FACTS -->
    <tr><td style="padding:28px 40px 12px;background-color:${BRAND.navy};">
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
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Lion\u2019s mane beta-glucans + 75mg matcha caffeine + L-theanine.</p>
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

    <!-- Organic circle accent on navy -->
    <tr><td style="padding:0 0 0;background-color:${BRAND.navy};text-align:right;line-height:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-left:auto;">
        <tr>
          <td style="width:100px;height:100px;border-radius:50%;background-color:${BRAND.lavender};opacity:0.08;"></td>
          <td style="width:30px;"></td>
        </tr>
      </table>
    </td></tr>

    <!-- FINAL CTA — pink canvas, you're in, this is yours -->
    <tr><td style="padding:40px 40px 16px;background-color:${BRAND.pink};text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.navy};opacity:0.5;font-weight:600;">YOU\u2019RE ON THE LIST</p>
      <p style="margin:0 0 24px;font-size:38px;color:${BRAND.navy};font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.05;">
        This is what you\u2019re getting.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr><td style="background:${BRAND.navy};border-radius:50px;padding:16px 52px;">
          <a href="${BRAND.siteUrl}" style="color:${BRAND.lime};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
            EXPLORE SHROOME \u2192
          </a>
        </td></tr>
      </table>
      <p style="margin:14px 0 0;font-size:12px;color:${BRAND.navy};opacity:0.4;">
        Your exclusive 20% off + free shipping drops when we launch. Stay tuned.
      </p>
    </td></tr>

    <!-- Organic circles on pink — bottom accent -->
    <tr><td style="padding:0 0 20px;background-color:${BRAND.pink};text-align:left;line-height:0;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:20px;"></td>
          <td style="width:70px;height:70px;border-radius:50%;background-color:${BRAND.softLav};opacity:0.5;"></td>
          <td style="width:260px;"></td>
          <td style="width:50px;height:50px;border-radius:50%;background-color:${BRAND.cream};opacity:0.4;"></td>
        </tr>
      </table>
    </td></tr>

  `, email);

  return { subject, html };
}

export function sachetEmail(email: string) {
  const subject = "what\u2019s actually in it \ud83d\udc9a";
  const html = emailShell(`

    <!-- NAVY BAR -->
    <tr><td style="padding:12px 16px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${BRAND.lime};font-weight:600;">
        2G MATCHA \u2726 200MG BETA GLUCANS \u2726 2G COLLAGEN \u2726 READY TO POUR
      </p>
    </td></tr>

    <!-- HERO -->
    <tr><td style="padding:44px 40px 20px;background-color:${BRAND.softLav};">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.navy};opacity:0.5;font-weight:600;">HOW WE COMPARE</p>
      <h1 style="margin:0;font-size:44px;color:${BRAND.navy};font-weight:400;line-height:1.05;font-family:${SERIF};">
        Not all matcha is<br/>created <em style="color:#E8936D;">equal.</em>
      </h1>
    </td></tr>

    <!-- VANILLA SACHET — single product hero -->
    <tr><td style="padding:24px 40px 0;background-color:${BRAND.softLav};text-align:center;">
      <img src="${BRAND.sachetVanilla}" alt="shroome vanilla sachet" width="220" style="display:inline-block;width:220px;max-width:220px;height:auto;" />
    </td></tr>

    <!-- Organic circles -->
    <tr><td style="padding:0;background-color:${BRAND.softLav};text-align:center;line-height:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="width:60px;height:60px;border-radius:50%;background-color:${BRAND.pink};opacity:0.5;"></td>
          <td style="width:180px;"></td>
          <td style="width:90px;height:90px;border-radius:50%;background-color:${BRAND.lavender};opacity:0.4;"></td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:20px 40px 36px;background-color:${BRAND.softLav};text-align:center;">
      <p style="margin:0;font-size:14px;color:${BRAND.navy};line-height:1.6;">
        <strong>pour / swirl / glow</strong><br/>
        ceremonial matcha \u00b7 grass-fed collagen \u00b7 mushroom beta glucans
      </p>
    </td></tr>

    <!-- BETA-GLUCAN HOOK — navy -->
    <tr><td style="padding:40px 40px 20px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0 0 14px;font-size:32px;color:#fff;font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
        It\u2019s not the mushroom.
      </p>
      <p style="margin:0;font-size:28px;color:${BRAND.lime};font-weight:700;font-family:${SANS};line-height:1.15;">
        It\u2019s the beta-glucan inside it.
      </p>
    </td></tr>

    <!-- LIME STAT CARD -->
    <tr><td style="padding:20px 36px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background-color:${BRAND.lime};border-radius:16px;padding:32px 24px;text-align:center;">
          <p style="margin:0;font-size:72px;font-weight:800;color:${BRAND.navy};line-height:1;letter-spacing:-3px;">70%+</p>
          <p style="margin:6px 0 0;font-size:13px;font-weight:700;color:${BRAND.navy};letter-spacing:1.5px;text-transform:uppercase;">
            BETA-GLUCAN (1/3, 1/6) CONCENTRATION
          </p>
          <p style="margin:8px 0 0;font-size:12px;color:${BRAND.navy};opacity:0.6;">
            The highest you can get. Most brands: 15\u201330%.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- POINT BLANK FACTS -->
    <tr><td style="padding:24px 40px 12px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">200mg per sachet. FDA GRAS.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Most brands sit at 15\u201330%. If they even test.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">Activates your immune system.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Macrophages and natural killer cells. Fully switched on.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">Focus without the spike.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Lion\u2019s mane beta-glucans support nerve growth factor.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">No crash. Zero anxiety.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Reishi beta-glucans balance cortisol.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;">
            <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">Gut health. Skin glow.</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Prebiotic + 2g grass-fed collagen. Week two is when you feel it.</p>
          </td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:20px 40px 40px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.25);font-style:italic;">
        Every competitor sells mushroom powder. We sell the most concentrated beta-glucan extract you can put in a drink.
      </p>
    </td></tr>

    <!-- CTA — pink -->
    <tr><td style="padding:40px 40px 16px;background-color:${BRAND.pink};text-align:center;">
      <p style="margin:0 0 24px;font-size:34px;color:${BRAND.navy};font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
        The ritual is ready.<br/>Just pour.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr><td style="background:${BRAND.navy};border-radius:50px;padding:16px 52px;">
          <a href="${BRAND.siteUrl}" style="color:${BRAND.lime};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
            CLAIM 20% OFF \u2192
          </a>
        </td></tr>
      </table>
      <p style="margin:14px 0 0;font-size:12px;color:${BRAND.navy};opacity:0.4;">First 500 only.</p>
    </td></tr>

  `, email);

  return { subject, html };
}
