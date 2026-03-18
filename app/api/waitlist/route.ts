import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { welcomeEmail } from "@/app/lib/emails";

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

// ─── Klaviyo: import profile, add to list, subscribe, and track event ────────
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

  // Step 1: Import/upsert the profile
  let profileId: string | undefined;
  try {
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
      profileId = profileData?.data?.id;
    }
  } catch (err) {
    console.error("Klaviyo profile import error:", err);
  }

  if (!profileId) return;

  // Step 2: Directly add profile to email list (reliable, triggers "Added to list" flows)
  if (listId) {
    try {
      await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
      });
    } catch (err) {
      console.error("Klaviyo list add error:", err);
    }
  }

  // Step 3: Subscribe email consent
  if (listId) {
    try {
      await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [{
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                  },
                }],
              },
            },
            relationships: { list: { data: { type: "list", id: listId } } },
          },
        }),
      });
    } catch (err) {
      console.error("Klaviyo email subscribe error:", err);
    }
  }

  // Step 4: Add to SMS list + subscribe (if phone provided)
  if (smsListId && phoneE164) {
    try {
      await fetch(`https://a.klaviyo.com/api/lists/${smsListId}/relationships/profiles/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
      });
      await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [{
                  type: "profile",
                  attributes: {
                    email,
                    phone_number: phoneE164,
                    subscriptions: { sms: { marketing: { consent: "SUBSCRIBED" } } },
                  },
                }],
              },
            },
            relationships: { list: { data: { type: "list", id: smsListId } } },
          },
        }),
      });
    } catch (err) {
      console.error("Klaviyo SMS subscribe error:", err);
    }
  }

  // Step 5: Track "Waitlist Signup" event for flow triggers
  try {
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
              discount_tier: phone ? "30_off_free_shipping" : "20_off_free_shipping",
              stackable_extra_10: !!phone,
            },
          },
        },
      }),
    });
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
            discount: "20% off + free shipping",
            stackable_extra_10: phone ? "YES" : "NO",
            total_discount: phone ? "30% off + free shipping" : "20% off + free shipping",
          }),
        });
      } catch (sheetErr) {
        console.error("Sheets webhook error:", sheetErr);
      }
    }

    // ─── 3. Send branded welcome email via Resend (no Klaviyo branding) ──
    if (!phone) {
      const welcome = welcomeEmail(email);
      try {
        await resend.emails.send({
          from: "shroomé <hello@drinkshroome.com>",
          to: [email],
          subject: welcome.subject,
          html: welcome.html,
        });
      } catch (emailErr) {
        console.error("Welcome email error:", emailErr);
      }

      // Admin notification
      try {
        await resend.emails.send({
          from: "Shroomé Waitlist <hello@drinkshroome.com>",
          to: ["info@drinkshroome.com"],
          subject: `🍵 New waitlist signup: ${email}`,
          html: `<p style="font-family:Arial,sans-serif;">New waitlist signup from <strong>${email}</strong></p><p style="font-family:Arial,sans-serif;color:#666;">Time: ${new Date().toISOString()}</p><p style="font-family:Arial,sans-serif;color:#666;">Discount: 20% off + free shipping${phone ? " + extra 10% (phone provided)" : ""}</p>`,
        });
      } catch (adminErr) {
        console.error("Admin notification error:", adminErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
