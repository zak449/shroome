import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createHmac, randomInt, timingSafeEqual } from "crypto";
import { welcomeEmail, unsubHeaders } from "@/app/lib/emails";

// ─── Referral code generation ────────────────────────────────────────────────
// Crypto RNG (Math.random is guessable); ambiguous chars removed.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function generateReferralCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  return code;
}

// ─── HTML escaping for admin notification (avoid content injection) ─────────
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Turnstile verification ─────────────────────────────────────────────────
// Fails CLOSED: if the secret is configured and verification errors, the
// token is treated as invalid. (No-secret dev fallback: verification skipped.)
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Dev fallback: not configured → skip
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification error (failing closed):", err);
    return false;
  }
}

// ─── Phone-step CAPTCHA exemption cookie ─────────────────────────────────────
// The 2-step UI (email → CAPTCHA → phone) POSTs the phone step without a
// Turnstile token. When the email step passes verification we set a short-lived
// HMAC cookie binding this browser to that email; a token-less POST is only
// accepted if it presents a matching cookie. Everything else is rejected.
const SIGNUP_COOKIE = "shroome_signup_verified";
function signupCookieValue(email: string): string | null {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return null;
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}
function hasValidSignupCookie(req: NextRequest, email: string): boolean {
  const expected = signupCookieValue(email);
  const got = req.cookies.get(SIGNUP_COOKIE)?.value;
  if (!expected || !got) return false;
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// ─── Phone → E.164 normalization ─────────────────────────────────────────────
// Robust rules; anything else is dropped (logged) so a bad phone NEVER aborts
// the email signup / Klaviyo sync:
//   "+…"                     → keep, digits only after the +
//   10 digits                → assume US, +1XXXXXXXXXX
//   11 digits starting w/ 1  → +1XXXXXXXXXX
function normalizePhone(raw: unknown): string | undefined {
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) {
    if (digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  } else if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  console.warn(`Waitlist: dropping un-normalizable phone (continuing email-only sync): "${trimmed}"`);
  return undefined;
}

function klaviyoHeaders(apiKey: string) {
  return {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };
}

// ─── Look up an existing Klaviyo profile by email ────────────────────────────
// equals(email,"…") IS a supported /api/profiles filter. Used to reuse an
// existing referral_code instead of regenerating it on repeat signups.
// Returns null on lookup failure (caller falls back to treating as new —
// the signup must never be lost because Klaviyo is down).
async function lookupExistingProfile(
  email: string,
  apiKey: string
): Promise<{ found: boolean; referralCode?: string } | null> {
  try {
    const filter = encodeURIComponent(`equals(email,"${email}")`);
    const res = await fetch(`https://a.klaviyo.com/api/profiles/?filter=${filter}`, {
      headers: klaviyoHeaders(apiKey),
    });
    if (!res.ok) {
      console.error("Klaviyo profile lookup failed:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const profile = data?.data?.[0];
    if (!profile) return { found: false };
    const code = profile?.attributes?.properties?.referral_code;
    return {
      found: true,
      referralCode: typeof code === "string" && code.trim() ? code.trim().toUpperCase() : undefined,
    };
  } catch (err) {
    console.error("Klaviyo profile lookup error:", err);
    return null;
  }
}

// ─── Klaviyo: import profile, add to list, subscribe, and track event ────────
async function syncToKlaviyo(
  email: string,
  phoneE164?: string,
  referralCode?: string,
  referredBy?: string,
  source = "drinkshroome.com"
) {
  const apiKey = process.env.KLAVIYO_API_KEY;
  if (!apiKey) return;

  const listId = process.env.KLAVIYO_LIST_ID;
  const smsListId = process.env.KLAVIYO_SMS_LIST_ID;
  const headers = klaviyoHeaders(apiKey);

  const profileAttributes = (includePhone: boolean) => ({
    email,
    ...(includePhone && phoneE164 ? { phone_number: phoneE164 } : {}),
    properties: {
      source,
      signup_source: source,
      signup_date: new Date().toISOString(),
      ...(referralCode ? { referral_code: referralCode } : {}),
      ...(referredBy ? { referred_by: referredBy } : {}),
    },
  });

  // Step 1: Import/upsert the profile.
  // If Klaviyo rejects the import WITH the phone (e.g. invalid number), retry
  // without it — a bad phone must never abort the email-side sync.
  let profileId: string | undefined;
  for (const includePhone of phoneE164 ? [true, false] : [true]) {
    try {
      const profileRes = await fetch("https://a.klaviyo.com/api/profile-import/", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: { type: "profile", attributes: profileAttributes(includePhone) },
        }),
      });
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        profileId = profileData?.data?.id;
        if (profileId) break;
      } else {
        console.error(
          `Klaviyo profile import failed (${includePhone ? "with" : "without"} phone):`,
          profileRes.status,
          await profileRes.text()
        );
      }
    } catch (err) {
      console.error("Klaviyo profile import error:", err);
    }
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

  // Step 4: Subscribe to SMS (if phone provided)
  // Adds profile to SMS list with single opt-in enabled in Klaviyo.
  // This triggers ONE text: the YES/JOIN keyword response we customized:
  // "hey, it's zack from shroome. you're locked in..."
  // No double opt-in, no "hey bestie", just one personal text.
  if (smsListId && phoneE164) {
    try {
      await fetch(`https://a.klaviyo.com/api/lists/${smsListId}/relationships/profiles/`, {
        method: "POST",
        headers,
        body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
      });
    } catch (err) {
      console.error("Klaviyo SMS list add error:", err);
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
              source,
              signup_source: source,
              has_phone: !!phoneE164,
              signup_date: new Date().toISOString(),
              // CFO ruling 2026-07-14: codes never stack — SHROOME30 REPLACES
              // the 20% code (best code wins).
              discount_tier: phoneE164 ? "30_off_free_shipping" : "20_off_free_shipping",
              discount_tier_upgrade: !!phoneE164,
              ...(referralCode ? { referral_code: referralCode } : {}),
              ...(referredBy ? { referred_by: referredBy } : {}),
            },
          },
        },
      }),
    });
  } catch (err) {
    console.error("Klaviyo event tracking error:", err);
  }

  // Step 6: If this signup came through a referral link, track "Referral
  // Converted" on the NEW profile with the referrer's code in the event
  // properties. A Klaviyo flow/segment on this metric is the reliable way to
  // credit referrers (profiles API cannot filter on properties.referred_by).
  if (referredBy) {
    try {
      await fetch("https://a.klaviyo.com/api/events/", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "event",
            attributes: {
              metric: { data: { type: "metric", attributes: { name: "Referral Converted" } } },
              profile: { data: { type: "profile", id: profileId } },
              properties: {
                referral_code: referredBy,
                referred_email: email,
                converted_at: new Date().toISOString(),
              },
            },
          },
        }),
      });
    } catch (err) {
      console.error("Klaviyo referral event error:", err);
    }
  }
}

export async function POST(req: NextRequest) {
  // ─── CAMPAIGN KILL SWITCH — set WAITLIST_CLOSED=true in Vercel env to close signups ──
  if (process.env.WAITLIST_CLOSED === "true") {
    return NextResponse.json({ error: "Waitlist is closed. We've launched! Visit drinkshroome.com to shop.", closed: true }, { status: 410 });
  }

  // Resend is optional: a missing/broken email provider must never lose the
  // signup (Klaviyo + Sheets writes still happen below).
  const resendKey = process.env.RESEND_API_KEY;
  const resend = resendKey ? new Resend(resendKey) : null;
  if (!resend) console.error("Waitlist: RESEND_API_KEY missing — welcome/admin emails skipped.");

  try {
    const { email, phone: rawPhone, turnstileToken, ref, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Optional source passthrough (defaults to drinkshroome.com)
    const signupSource =
      typeof source === "string" && source.trim() ? source.trim().slice(0, 100) : "drinkshroome.com";

    // Normalize phone; invalid phones are dropped (logged) — the signup continues
    const phone = normalizePhone(rawPhone);

    // ─── 0. Turnstile CAPTCHA — ENFORCED when TURNSTILE_SECRET_KEY is set ──
    // Missing token → 400, unless this browser already passed the CAPTCHA for
    // this email (signed cookie set below — covers the token-less phone step).
    // No secret configured → dev fallback, verification skipped.
    let setVerifiedCookie = false;
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (turnstileToken) {
        const valid = await verifyTurnstile(turnstileToken);
        if (!valid) {
          return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 403 });
        }
        setVerifiedCookie = true;
      } else if (!hasValidSignupCookie(req, email)) {
        return NextResponse.json({ error: "CAPTCHA token required" }, { status: 400 });
      }
    }

    const referredBy = ref && typeof ref === "string" ? ref.toUpperCase() : undefined;

    // ─── Referral code: reuse the existing one on repeat signups ────────
    // Fetch the Klaviyo profile first (equals(email,…) is a supported filter)
    // and reuse its referral_code; only generate for genuinely new profiles.
    // Lookup failure falls back to generating (signups are never lost).
    const apiKey = process.env.KLAVIYO_API_KEY;
    let referralCode: string;
    let isExistingProfile = false;
    if (apiKey) {
      const existing = await lookupExistingProfile(email, apiKey);
      if (existing?.referralCode) {
        referralCode = existing.referralCode;
        isExistingProfile = true;
      } else {
        referralCode = generateReferralCode();
        isExistingProfile = existing?.found === true;
      }
    } else {
      referralCode = generateReferralCode();
    }

    // ─── 1. Sync to Klaviyo ─────────────────────────────────────────────
    try {
      await syncToKlaviyo(email, phone, referralCode, referredBy, signupSource);
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
            source: signupSource,
            signup_source: signupSource,
            discount: "20% off + free shipping",
            // Codes never stack: SHROOME30 replaces the 20% code (best code wins)
            discount_tier_upgrade: phone ? "YES" : "NO",
            total_discount: phone ? "30% off + free shipping" : "20% off + free shipping",
            referral_code: referralCode,
            referred_by: referredBy || "",
          }),
        });
      } catch (sheetErr) {
        console.error("Sheets webhook error:", sheetErr);
      }
    }

    // ─── 3. Send branded welcome email via Resend ────────────────────────
    // Only on the first, email-only call for a genuinely new profile —
    // repeat signups must not re-trigger the welcome email.
    if (!phone && !isExistingProfile && resend) {
      const welcome = welcomeEmail(email, referralCode);
      try {
        await resend.emails.send({
          from: "shroomé <hello@drinkshroome.com>",
          to: [email],
          subject: welcome.subject,
          html: welcome.html,
          headers: unsubHeaders(email), // RFC 8058 one-click unsubscribe
        });
      } catch (emailErr) {
        console.error("Welcome email error:", emailErr);
      }
    }

    // ─── 4. Admin notification (always — both email-only and phone signups) ──
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    try {
      if (!resend) throw new Error("Resend not configured");
      await resend.emails.send({
        from: "shroomé Waitlist <hello@drinkshroome.com>",
        to: ["info@drinkshroome.com"],
        subject: phone ? `📱 Phone added: ${email}` : `🍵 New waitlist signup: ${email}`,
        html: `<p style="font-family:Arial,sans-serif;">${phone ? "Phone number added" : "New waitlist signup"} from <strong>${safeEmail}</strong></p>${phone ? `<p style="font-family:Arial,sans-serif;">Phone: <strong>${safePhone}</strong></p>` : ""}<p style="font-family:Arial,sans-serif;color:#666;">Time: ${new Date().toISOString()}</p><p style="font-family:Arial,sans-serif;color:#666;">Discount: ${phone ? "SHROOME30 — 30% off + free shipping (replaces the 20% code; best code wins)" : "SHROOME20 — 20% off + free shipping"}</p><p style="font-family:Arial,sans-serif;color:#666;">Source: ${escapeHtml(signupSource)}</p><p style="font-family:Arial,sans-serif;color:#666;">Referral code: ${referralCode}${isExistingProfile ? " (existing — reused)" : ""}</p>${referredBy ? `<p style="font-family:Arial,sans-serif;color:#666;">Referred by: ${escapeHtml(referredBy)}</p>` : ""}`,
      });
    } catch (adminErr) {
      console.error("Admin notification error:", adminErr);
    }

    const res = NextResponse.json({ success: true, referralCode, existing: isExistingProfile });
    if (setVerifiedCookie) {
      const cookieVal = signupCookieValue(email);
      if (cookieVal) {
        res.cookies.set(SIGNUP_COOKIE, cookieVal, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 30, // 30 min — long enough to finish the phone step
          path: "/",
        });
      }
    }
    return res;
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
