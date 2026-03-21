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
  siteUrl: "https://www.drinkshroome.com",
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

export function welcomeEmail(email: string, referralCode?: string) {
  const subject = "you just made the list \ud83d\udc9a";
  const heroImg = "https://www.drinkshroome.com/email-hero-cup.jpg";
  const cloudsImg = "https://www.drinkshroome.com/email-clouds-bg.jpg";
  const html = emailShell(`

    <!-- ═══ FULL-BLEED HERO — lifestyle image with overlay ═══ -->
    <tr><td style="padding:0;background-color:${BRAND.navy};">
      <!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:400px;">
      <v:fill type="frame" src="${heroImg}" /><v:textbox inset="0,0,0,0"><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${heroImg}') center top / cover no-repeat ${BRAND.navy};">
        <tr><td style="padding:0;">
          <!-- Overlay — lighter at top to show cup, darker at bottom for text -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, rgba(27,31,59,0.15) 0%, rgba(27,31,59,0.1) 35%, rgba(27,31,59,0.6) 60%, rgba(27,31,59,0.8) 100%);">
            <!-- Top nav bar -->
            <tr><td style="padding:16px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:22px;font-family:${SERIF};font-style:italic;color:#fff;font-weight:400;">shroom\u00e9</td>
                  <td align="right">
                    <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.lime};font-weight:700;">PRE-LAUNCH LIST</span>
                  </td>
                </tr>
              </table>
            </td></tr>

            <!-- Spacer — lets the cup image breathe -->
            <tr><td style="padding:160px 0 0;"></td></tr>

            <!-- Hero text below the cup -->
            <tr><td style="padding:0 36px 12px;text-align:center;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.lime};font-weight:700;">
                \u2726 YOU\u2019RE IN \u2726
              </p>
            </td></tr>
            <tr><td style="padding:0 36px 0;text-align:center;">
              <h1 style="margin:0;font-size:48px;color:#fff;font-weight:400;line-height:1.05;font-family:${SERIF};">
                Caf\u00e9 energy.<br/><span style="font-style:italic;color:${BRAND.lime};">Home address.</span>
              </h1>
            </td></tr>
            <tr><td style="padding:16px 48px 20px;text-align:center;">
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.6;">
                The world\u2019s first ready-to-pour ceremonial matcha latte.<br/>2g matcha \u00b7 mushroom extracts \u00b7 collagen \u00b7 zero crash.
              </p>
            </td></tr>

            <!-- Pill tags on image -->
            <tr><td style="padding:0 36px 40px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border-radius:20px;padding:6px 14px;border:1px solid rgba(255,255,255,0.2);">
                    <span style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;">20% OFF</span>
                  </td>
                  <td style="width:8px;"></td>
                  <td style="background:rgba(255,255,255,0.15);border-radius:20px;padding:6px 14px;border:1px solid rgba(255,255,255,0.2);">
                    <span style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;">FREE SHIPPING</span>
                  </td>
                  <td style="width:8px;"></td>
                  <td style="background:rgba(255,255,255,0.15);border-radius:20px;padding:6px 14px;border:1px solid rgba(255,255,255,0.2);">
                    <span style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;">EARLY ACCESS</span>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
      </table>
      <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
    </td></tr>

    <!-- ═══ PRODUCT SHOWCASE — sachets on lavender ═══ -->
    <tr><td style="padding:0;background-color:${BRAND.lavender};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:40px 36px 8px;text-align:center;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#2D4A2D;opacity:0.6;font-weight:600;">THE RITUAL</p>
          <p style="margin:0;font-size:32px;color:#2D4A2D;font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
            Tear. Pour. <span style="color:#E8936D;">Feel the shift.</span>
          </p>
        </td></tr>
        <tr><td style="padding:24px 20px 0;text-align:center;">
          <img src="${BRAND.sachetsBoth}" alt="shroom\u00e9 vanilla and strawberry sachets" width="480" style="display:inline-block;width:85%;max-width:480px;height:auto;" />
        </td></tr>
        <tr><td style="padding:20px 40px 12px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#2D4A2D;line-height:1.7;opacity:0.65;">
            Two flavors. Twelve sachets per box. Each one pre-dissolved \u2014 no powder, no frother. Just 15 seconds to caf\u00e9-grade matcha.
          </p>
        </td></tr>
        <tr><td style="padding:8px 36px 36px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td style="background:#2D4A2D;border-radius:50px;padding:14px 44px;">
              <a href="${BRAND.siteUrl}" style="color:${BRAND.lime};font-size:12px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
                SEE WHAT\u2019S INSIDE \u2192
              </a>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ REFERRAL SECTION — lime accent block ═══════════════════════ -->
    ${referralCode ? `
    <tr><td style="padding:0;background-color:${BRAND.lime};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:36px 40px 12px;text-align:center;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.navy};opacity:0.5;font-weight:600;">SHARE THE LOVE</p>
          <p style="margin:0 0 16px;font-size:28px;color:${BRAND.navy};font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
            Give your friends the same deal.
          </p>
          <p style="margin:0 0 20px;font-size:14px;color:${BRAND.navy};line-height:1.6;opacity:0.7;">
            Refer 3 friends &rarr; unlock an extra 10% off at launch<br/>(stackable with your existing discount).
          </p>
        </td></tr>
        <tr><td style="padding:0 40px 16px;text-align:center;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td style="background:${BRAND.navy};border-radius:8px;padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:1px;text-transform:uppercase;font-weight:600;">Your referral link</p>
              <a href="https://www.drinkshroome.com?ref=${referralCode}" style="font-size:18px;font-weight:700;color:${BRAND.lime};text-decoration:none;letter-spacing:0.5px;font-family:${SANS};">
                drinkshroome.com?ref=${referralCode}
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:12px 40px 8px;text-align:center;">
          <a href="https://www.drinkshroome.com/refer" style="display:inline-block;background:${BRAND.navy};color:${BRAND.cream};padding:14px 32px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;font-family:${SANS};">
            Share &amp; track your referrals &rarr;
          </a>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:${BRAND.navy};opacity:0.45;">
            Share it everywhere. Every friend who joins counts toward your extra 10% off.
          </p>
        </td></tr>
      </table>
    </td></tr>
    ` : ''}

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
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.4;">70%+ beta-glucan (1/3, 1/6) purity. Immune activation, sustained focus, no crash. Most brands: 15\u201330%.</p>
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
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Lion\u2019s mane beta-glucans + 50mg matcha caffeine + L-theanine.</p>
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

    <!-- ═══ FINAL CTA — clouds image background with overlay ═══ -->
    <tr><td style="padding:0;background-color:${BRAND.pink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${cloudsImg}') center center / cover no-repeat ${BRAND.pink};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, rgba(255,183,209,0.85) 0%, rgba(255,183,209,0.7) 50%, rgba(212,184,224,0.8) 100%);">
            <tr><td style="padding:48px 40px 16px;text-align:center;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.navy};opacity:0.5;font-weight:600;">YOU\u2019RE ON THE LIST</p>
              <p style="margin:0 0 24px;font-size:38px;color:${BRAND.navy};font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.05;">
                This is what<br/>you\u2019re <span style="color:#E8936D;">getting.</span>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr><td style="background:${BRAND.navy};border-radius:50px;padding:16px 52px;">
                  <a href="${BRAND.siteUrl}" style="color:${BRAND.lime};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
                    EXPLORE SHROOM\u00c9 \u2192
                  </a>
                </td></tr>
              </table>
              <p style="margin:14px 0 0;font-size:12px;color:${BRAND.navy};opacity:0.5;">
                Your exclusive 20% off + free shipping drops when we launch.
              </p>
            </td></tr>
            <tr><td style="padding:20px 40px 40px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="text-align:center;padding:0 16px;">
                    <a href="https://tiktok.com/@drinkshroome" style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${BRAND.navy};text-decoration:none;opacity:0.5;">TikTok</a>
                  </td>
                  <td style="text-align:center;padding:0 16px;">
                    <a href="https://instagram.com/drinkshroome" style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${BRAND.navy};text-decoration:none;opacity:0.5;">Instagram</a>
                  </td>
                  <td style="text-align:center;padding:0 16px;">
                    <a href="https://youtube.com/@drinkshroome" style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${BRAND.navy};text-decoration:none;opacity:0.5;">YouTube</a>
                  </td>
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
    <tr><td style="padding:0;background-color:${BRAND.pink};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${cloudsImg}') center top / cover no-repeat ${BRAND.pink};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, rgba(212,184,224,0.8) 0%, rgba(255,183,209,0.7) 50%, rgba(253,244,238,0.85) 100%);">
            <tr><td style="padding:20px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:22px;font-family:${SERIF};font-style:italic;color:${BRAND.navy};font-weight:400;">shroom\u00e9</td>
                  <td align="right"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.navy};font-weight:700;opacity:0.5;">EMAIL 2 OF 2</span></td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:40px 36px 12px;text-align:center;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#2D4A2D;opacity:0.6;font-weight:700;">INSIDE THE SACHET</p>
              <h1 style="margin:0;font-size:44px;color:#2D4A2D;font-weight:400;line-height:1.05;font-family:${SERIF};">
                Not all matcha is<br/>created <span style="color:#E8936D;font-style:italic;">equal.</span>
              </h1>
            </td></tr>
            <tr><td style="padding:16px 48px 44px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#2D4A2D;line-height:1.6;opacity:0.65;">
                Here\u2019s what separates shroom\u00e9 from everything else on the shelf \u2014 and why the ingredients matter more than the label.
              </p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ PRODUCT — vanilla sachet on lavender (visible contrast) ═══ -->
    <tr><td style="padding:0;background-color:${BRAND.lavender};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:36px 20px 0;text-align:center;">
          <img src="${BRAND.sachetVanilla}" alt="shroom\u00e9 vanilla sachet" width="200" style="display:inline-block;width:200px;max-width:200px;height:auto;" />
        </td></tr>
        <tr><td style="padding:20px 40px 36px;text-align:center;">
          <p style="margin:0;font-size:20px;color:#2D4A2D;font-weight:400;font-family:${SERIF};font-style:italic;">
            pour \u00b7 swirl \u00b7 <span style="color:#E8936D;">glow</span>
          </p>
          <p style="margin:10px 0 0;font-size:12px;color:#2D4A2D;opacity:0.55;letter-spacing:1px;text-transform:uppercase;font-weight:600;">
            ceremonial matcha \u00b7 collagen \u00b7 mushroom beta-glucans
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ THE HOOK — full-width on navy ═══ -->
    <tr><td style="padding:48px 40px 20px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.lavender};font-weight:600;">THE DIFFERENCE</p>
      <p style="margin:0 0 14px;font-size:34px;color:#fff;font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
        It\u2019s not the mushroom.
      </p>
      <p style="margin:0;font-size:26px;color:${BRAND.lime};font-weight:700;font-family:${SANS};line-height:1.15;">
        It\u2019s the beta-glucan inside it.
      </p>
    </td></tr>

    <!-- ═══ 70%+ STAT — lime card ═══ -->
    <tr><td style="padding:24px 28px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="background-color:${BRAND.lime};border-radius:16px;padding:36px 24px;text-align:center;">
          <p style="margin:0;font-size:80px;font-weight:800;color:${BRAND.navy};line-height:1;letter-spacing:-3px;">70%+</p>
          <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:${BRAND.navy};letter-spacing:1.5px;text-transform:uppercase;">
            BETA-GLUCAN (1,3 AND 1,6) CONCENTRATION
          </p>
          <p style="margin:10px 0 0;font-size:13px;color:${BRAND.navy};opacity:0.55;line-height:1.5;">
            The highest commercially available. Most supplements: 15\u201330%.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- ═══ VS COMPARISON — side by side ═══ -->
    <tr><td style="padding:24px 28px 8px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="48%" style="background:rgba(255,255,255,0.04);border-radius:12px;padding:20px 16px;text-align:center;vertical-align:top;border:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:700;">THEM</p>
            <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:rgba(255,255,255,0.2);line-height:1;">15\u201330%</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.4;">Mycelium on grain.<br/>Mostly rice starch.<br/>Untested.</p>
          </td>
          <td width="4%"></td>
          <td width="48%" style="background:rgba(200,255,58,0.08);border-radius:12px;padding:20px 16px;text-align:center;vertical-align:top;border:1px solid rgba(200,255,58,0.15);">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.lime};font-weight:700;">SHROOM\u00c9</p>
            <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:${BRAND.lime};line-height:1;">70%+</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.4;">Fruiting body extract.<br/>Hot water extracted.<br/>Third-party verified.</p>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- ═══ BENEFITS LIST ═══ -->
    <tr><td style="padding:28px 36px 12px;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">\u26a1 Immune system on full blast.</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Activates macrophages &amp; natural killer cells.</p>
        </td></tr>
        <tr><td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:16px;font-weight:700;color:#fff;">\ud83e\udde0 Focus that lasts all day.</p>
          <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">Lion\u2019s mane + 50mg matcha caffeine + L-theanine.</p>
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

    <!-- Quote -->
    <tr><td style="padding:24px 40px 40px;background-color:${BRAND.navy};text-align:center;">
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.2);font-style:italic;line-height:1.5;">
        \u201cEvery competitor sells mushroom powder.<br/>We sell what\u2019s actually inside it.\u201d
      </p>
    </td></tr>

    <!-- ═══ FINAL CTA — lifestyle image background ═══ -->
    <tr><td style="padding:0;background-color:${BRAND.navy};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:url('${heroImg}') center center / cover no-repeat ${BRAND.navy};">
        <tr><td style="padding:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg, rgba(27,31,59,0.7) 0%, rgba(27,31,59,0.4) 50%, rgba(27,31,59,0.75) 100%);">
            <tr><td style="padding:60px 40px 20px;text-align:center;">
              <p style="margin:0 0 24px;font-size:38px;color:#fff;font-weight:400;font-family:${SERIF};font-style:italic;line-height:1.1;">
                The ritual is ready.<br/><span style="color:${BRAND.lime};">Just pour.</span>
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr><td style="background:${BRAND.lime};border-radius:50px;padding:16px 52px;">
                  <a href="${BRAND.siteUrl}" style="color:${BRAND.navy};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">
                    EXPLORE SHROOM\u00c9 \u2192
                  </a>
                </td></tr>
              </table>
              <p style="margin:14px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">Your 20% off + free shipping is locked in.</p>
            </td></tr>
            <tr><td style="padding:20px 40px 48px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 16px;"><a href="https://tiktok.com/@drinkshroome" style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.4);text-decoration:none;">TikTok</a></td>
                  <td style="padding:0 16px;"><a href="https://instagram.com/drinkshroome" style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.4);text-decoration:none;">Instagram</a></td>
                  <td style="padding:0 16px;"><a href="https://youtube.com/@drinkshroome" style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.4);text-decoration:none;">YouTube</a></td>
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
