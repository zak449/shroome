import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Turnstile verification ─────────────────────────────────────────────────
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip if not configured
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = await res.json();
  return data.success === true;
}

// ─── Klaviyo: subscribe with proper consent + track event ────────────────────
async function syncToKlaviyo(email: string, phone?: string) {
  const apiKey = process.env.KLAVIYO_API_KEY;
  if (!apiKey) return;

  const listId = process.env.KLAVIYO_LIST_ID;
  const smsListId = process.env.KLAVIYO_SMS_LIST_ID;
  const headers = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };

  const phoneE164 = phone
    ? phone.startsWith("+") ? phone : `+1${phone.replace(/\D/g, "")}`
    : undefined;

  // Subscribe to email list with consent
  if (listId) {
    try {
      const emailSubscription: Record<string, unknown> = {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [{
              type: "profile",
              attributes: {
                email,
                properties: { source: "drinkshroome.com", signup_date: new Date().toISOString() },
                subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
              },
            }],
          },
        },
        relationships: { list: { data: { type: "list", id: listId } } },
      };
      await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
        method: "POST",
        headers,
        body: JSON.stringify({ data: emailSubscription }),
      });
    } catch (err) {
      console.error("Klaviyo email subscribe error:", err);
    }
  }

  // Subscribe to SMS list with consent (if phone provided)
  if (smsListId && phoneE164) {
    try {
      const smsSubscription: Record<string, unknown> = {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [{
              type: "profile",
              attributes: {
                email,
                phone_number: phoneE164,
                properties: { source: "drinkshroome.com", signup_date: new Date().toISOString() },
                subscriptions: { sms: { marketing: { consent: "SUBSCRIBED" } } },
              },
            }],
          },
        },
        relationships: { list: { data: { type: "list", id: smsListId } } },
      };
      await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
        method: "POST",
        headers,
        body: JSON.stringify({ data: smsSubscription }),
      });
    } catch (err) {
      console.error("Klaviyo SMS subscribe error:", err);
    }
  }

  // Track "Waitlist Signup" event for flow triggers
  try {
    // First get/create profile ID
    const profileRes = await fetch("https://a.klaviyo.com/api/profile-import/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email,
            ...(phoneE164 ? { phone_number: phoneE164 } : {}),
            properties: { source: "drinkshroome.com", signup_date: new Date().toISOString() },
          },
        },
      }),
    });

    if (profileRes.ok) {
      const profileData = await profileRes.json();
      const profileId = profileData?.data?.id;
      if (profileId) {
        await fetch("https://a.klaviyo.com/api/events/", {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "event",
              attributes: {
                metric: { data: { type: "metric", attributes: { name: "Waitlist Signup" } } },
                profile: { data: { type: "profile", id: profileId } },
                properties: {
                  source: "drinkshroome.com",
                  has_phone: !!phone,
                  signup_date: new Date().toISOString(),
                },
              },
            },
          }),
        });
      }
    }
  } catch (err) {
    console.error("Klaviyo event tracking error:", err);
  }
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email, phone, turnstileToken } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ─── 0. Verify Turnstile CAPTCHA (on initial email submission) ──────
    if (turnstileToken) {
      const valid = await verifyTurnstile(turnstileToken);
      if (!valid) {
        return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 403 });
      }
    }

    // ─── 1. Sync to Klaviyo ─────────────────────────────────────────────
    try {
      await syncToKlaviyo(email, phone);
    } catch (klaviyoErr) {
      console.error("Klaviyo error:", klaviyoErr);
    }

    // ─── 2. Append to Google Sheets via Apps Script webhook ─────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            phone: phone || "",
            timestamp: new Date().toISOString(),
            source: "drinkshroome.com",
          }),
        });
      } catch (sheetErr) {
        console.error("Sheets webhook error:", sheetErr);
      }
    }

    // ─── 3. Send confirmation email (only on initial signup, not phone update)
    if (!phone) {
      await resend.emails.send({
        from: "Shroomé <noreply@communityattire.com>",
        to: [email],
        subject: "Welcome to Shroomé — We're so excited to share this with you",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#FFB7D1;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFB7D1;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding:48px 32px 36px;background:#1B1F3B;border-radius:24px 24px 0 0;">
                      <p style="margin:0 0 28px;font-size:28px;letter-spacing:0.08em;color:#FFB7D1;font-family:Georgia,'Times New Roman',serif;font-style:italic;">
                        shroomé
                      </p>
                      <h1 style="margin:0 0 16px;font-size:28px;color:#FDF4EE;font-family:Georgia,'Times New Roman',serif;font-weight:700;line-height:1.25;">
                        We are so excited to share Shroomé with you.
                      </h1>
                      <p style="margin:0;font-size:16px;color:rgba(253,244,238,0.7);line-height:1.7;">
                        We hope once we launch, you'll enjoy the latte and the savings. Your <strong style="color:#C8FF3A;">40% off</strong> is locked in — we'll send your code the moment we go live.
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 32px;background:#D4B8E0;">

                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#1B1F3B;border-radius:16px;overflow:hidden;">
                        <tr>
                          <td style="padding:24px 28px;">
                            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.15em;color:#C8FF3A;text-transform:uppercase;font-family:monospace;">
                              Your pre-launch perk
                            </p>
                            <p style="margin:0;font-size:18px;color:#FDF4EE;font-weight:600;">
                              40% off your first Shroomé order
                            </p>
                            <p style="margin:8px 0 0;font-size:13px;color:rgba(253,244,238,0.5);">
                              Delivered to this inbox on launch day. First 500 only.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 20px;font-size:15px;color:#1B1F3B;line-height:1.7;font-weight:500;">
                        Here's what makes Shroomé different:
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${[
                          ["Ceremonial-grade matcha", "First-harvest, shade-grown. 3g per sachet — not the culinary powder."],
                          ["Functional mushrooms", "Lion's Mane + Chaga for clean focus and lasting energy."],
                          ["Grass-fed collagen", "2g pre-dissolved for skin, hair, nails, and gut."],
                          ["Tear. Pour. Done.", "No blender, no whisk. 60 seconds to a café-grade latte."],
                        ]
                          .map(
                            ([title, desc]) => `
                          <tr>
                            <td style="padding:14px 20px;margin-bottom:8px;background:#1B1F3B;border-radius:12px;">
                              <p style="margin:0 0 4px;font-size:14px;color:#C8FF3A;font-weight:600;">${title}</p>
                              <p style="margin:0;font-size:13px;color:rgba(253,244,238,0.6);line-height:1.5;">${desc}</p>
                            </td>
                          </tr>
                          <tr><td style="height:8px;"></td></tr>`
                          )
                          .join("")}
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding:28px 32px;background:#FFB7D1;border-radius:0 0 24px 24px;">
                      <p style="margin:0 0 8px;font-size:13px;color:#1B1F3B;font-weight:500;">
                        Thank you for joining the Shroomé family.
                      </p>
                      <p style="margin:0 0 16px;font-size:12px;color:rgba(27,31,59,0.5);">
                        © 2026 Shroomé · Ceremonial matcha, functional mushrooms, no nonsense.
                      </p>
                      <p style="margin:0;font-size:11px;color:rgba(27,31,59,0.35);">
                        You signed up at drinkshroome.com. We'll never spam you.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      });

      // ─── 4. Notify admin of new signup ──────────────────────────────────
      await resend.emails.send({
        from: "Shroomé Waitlist <noreply@communityattire.com>",
        to: ["zak@communityattire.com"],
        subject: `🍵 New waitlist signup: ${email}`,
        html: `<p style="font-family:Arial,sans-serif;">New waitlist signup from <strong>${email}</strong></p><p style="font-family:Arial,sans-serif;color:#666;">Time: ${new Date().toISOString()}</p>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
