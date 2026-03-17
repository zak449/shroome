// ─── Brand-consistent email templates for Resend (no Klaviyo branding) ───────

const BRAND = {
  navy: "#1B1F3B",
  cream: "#FDF4EE",
  lime: "#C8FF3A",
  pink: "#FFB7D1",
  lavender: "#D4B8E0",
  sage: "#809463",
  logoUrl: "https://drinkshroome.com/logo-navy.png",
  siteUrl: "https://drinkshroome.com",
};

function unsubscribeUrl(email: string) {
  return `${BRAND.siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
}

function emailShell(content: string, email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>shroomé</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.cream};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${BRAND.navy};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};">
    <tr><td align="center" style="padding:40px 20px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Logo -->
        <tr><td align="center" style="padding-bottom:32px;">
          <a href="${BRAND.siteUrl}" style="text-decoration:none;">
            <img src="${BRAND.logoUrl}" alt="shroomé" width="120" style="display:block;border:0;"/>
          </a>
        </td></tr>
        <!-- Content -->
        ${content}
        <!-- Footer -->
        <tr><td style="padding-top:40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.navy};border-radius:12px;">
            <tr><td align="center" style="padding:32px 24px;">
              <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.5);">
                © ${new Date().getFullYear()} shroomé · drinkshroome.com
              </p>
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">
                <a href="${unsubscribeUrl(email)}" style="color:rgba(255,255,255,0.5);text-decoration:underline;">Manage preferences</a>
              </p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeEmail(email: string) {
  const subject = "you're in 🍵✨ welcome to the shroomé fam";
  const html = emailShell(`
    <!-- Hero -->
    <tr><td style="background-color:${BRAND.navy};border-radius:12px;padding:48px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.lime};font-weight:700;">
        PRE-LAUNCH ACCESS CONFIRMED
      </p>
      <h1 style="margin:0 0 16px;font-size:32px;color:#fff;font-weight:400;font-style:italic;line-height:1.2;">
        you're in. let's go.
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.6;">
        you just locked in early access to shroomé — ceremonial matcha meets functional mushrooms in one 3g sachet. no blender, no whisk, no mess.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr><td style="background-color:${BRAND.lime};border-radius:50px;padding:14px 32px;">
          <a href="${BRAND.siteUrl}" style="color:${BRAND.navy};font-size:14px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">
            FIRST 500 ONLY →
          </a>
        </td></tr>
      </table>
    </td></tr>

    <!-- Phone upsell -->
    <tr><td style="padding-top:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.lavender};border-radius:12px;">
        <tr><td style="padding:32px;text-align:center;">
          <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:${BRAND.navy};">
            want an extra 10% on top?
          </p>
          <p style="margin:0;font-size:14px;color:${BRAND.navy};line-height:1.6;">
            head back to <a href="${BRAND.siteUrl}" style="color:${BRAND.navy};font-weight:700;">drinkshroome.com</a> and drop your phone number. that's 30% + 10%. we won't judge.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- What you're getting -->
    <tr><td style="padding-top:32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.sage};font-weight:700;">
        WHAT YOU'RE GETTING
      </p>
      <h2 style="margin:0 0 16px;font-size:24px;font-weight:400;font-style:italic;color:${BRAND.navy};line-height:1.3;">
        the world's first ready-to-pour ceremonial matcha + mushroom sachet
      </h2>
    </td></tr>

    <tr><td style="background-color:${BRAND.navy};border-radius:12px;padding:32px;text-align:center;">
      <p style="margin:0 0 4px;font-size:14px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:2px;">✦ ceremonial-grade matcha</p>
      <p style="margin:0 0 4px;font-size:14px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:2px;">✦ lion's mane + reishi</p>
      <p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:2px;">✦ no blender. no whisk. no mess.</p>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);">
        60 seconds to a café-grade latte.
      </p>
    </td></tr>

    <!-- Closing -->
    <tr><td style="background-color:${BRAND.navy};border-radius:12px;padding:32px;text-align:center;margin-top:24px;">
      <p style="margin:0 0 8px;font-size:18px;font-weight:700;font-style:italic;color:#fff;">
        we're almost ready. you'll be first to know.
      </p>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);">
        talk soon — team shroomé 💚
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding-top:24px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr><td style="background-color:${BRAND.lime};border-radius:50px;padding:14px 32px;">
          <a href="${BRAND.siteUrl}" style="color:${BRAND.navy};font-size:14px;font-weight:700;text-decoration:none;">
            check out the vibe
          </a>
        </td></tr>
      </table>
    </td></tr>
  `, email);

  return { subject, html };
}

export function sachetEmail(email: string) {
  const subject = "what's actually in this thing? 👀🍵 matcha × mushrooms";
  const html = emailShell(`
    <!-- Hero -->
    <tr><td style="background-color:${BRAND.navy};border-radius:12px;padding:48px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.lime};font-weight:700;">
        INSIDE THE SACHET
      </p>
      <h1 style="margin:0 0 16px;font-size:32px;color:#fff;font-weight:400;font-style:italic;line-height:1.2;">
        what's actually in this thing?
      </h1>
      <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.6;">
        we get it — you want to know what you're putting in your body. here's the full breakdown of every ingredient in a shroomé sachet.
      </p>
    </td></tr>

    <!-- Ingredient 1 -->
    <tr><td style="padding-top:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;border-radius:12px;border:1px solid rgba(27,31,59,0.08);">
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.sage};font-weight:700;">01</p>
          <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:${BRAND.navy};">Ceremonial-Grade Matcha</p>
          <p style="margin:0;font-size:14px;color:${BRAND.navy};opacity:0.7;line-height:1.6;">
            stone-ground from first-harvest shade-grown leaves. smooth, naturally sweet, zero bitterness. this is the real deal — not the culinary dust you've been buying.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- Ingredient 2 -->
    <tr><td style="padding-top:12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;border-radius:12px;border:1px solid rgba(27,31,59,0.08);">
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.sage};font-weight:700;">02</p>
          <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:${BRAND.navy};">Lion's Mane Extract</p>
          <p style="margin:0;font-size:14px;color:${BRAND.navy};opacity:0.7;line-height:1.6;">
            the focus mushroom. dual-extracted for maximum bioavailability. supports memory, clarity, and nerve growth factor. your brain's new best friend.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- Ingredient 3 -->
    <tr><td style="padding-top:12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;border-radius:12px;border:1px solid rgba(27,31,59,0.08);">
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.sage};font-weight:700;">03</p>
          <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:${BRAND.navy};">Reishi Extract</p>
          <p style="margin:0;font-size:14px;color:${BRAND.navy};opacity:0.7;line-height:1.6;">
            the calm mushroom. balances your cortisol so the caffeine from matcha lifts you up without the crash. sustained energy, zero jitters.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding-top:32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr><td style="background-color:${BRAND.lime};border-radius:50px;padding:14px 32px;">
          <a href="${BRAND.siteUrl}" style="color:${BRAND.navy};font-size:14px;font-weight:700;text-decoration:none;">
            join the waitlist →
          </a>
        </td></tr>
      </table>
    </td></tr>

    <!-- Closing -->
    <tr><td style="padding-top:24px;text-align:center;">
      <p style="margin:0;font-size:14px;color:${BRAND.navy};opacity:0.5;line-height:1.6;">
        we're almost ready. you'll be the first to know when we launch.
      </p>
      <p style="margin:8px 0 0;font-size:14px;color:${BRAND.navy};opacity:0.5;">
        — team shroomé 💚
      </p>
    </td></tr>
  `, email);

  return { subject, html };
}
