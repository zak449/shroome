import { NextRequest, NextResponse } from "next/server";

// Unsubscribes an email from all Shroomé marketing (Klaviyo lists + global
// suppression). Reached from:
// - the /unsubscribe page (JSON POST { email, reason? } — reason is OPTIONAL,
//   opt-out must never be conditioned on providing one)
// - RFC 8058 one-click unsubscribe (mailbox providers POST
//   "List-Unsubscribe=One-Click" form data to the List-Unsubscribe URL,
//   which carries ?email=… — see unsubHeaders() in app/lib/emails.ts)
// - a plain GET on the header URL (non-RFC-8058 clients) → redirect to the
//   /unsubscribe page with the email prefilled.

async function unsubscribeEmail(email: string, reason?: string): Promise<void> {
  const apiKey = process.env.KLAVIYO_API_KEY;
  if (!apiKey) throw new Error("KLAVIYO_API_KEY not configured");

  const headers = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };

  // Find the profile by email (filter value URL-encoded so "+" addresses work)
  const profileRes = await fetch(
    `https://a.klaviyo.com/api/profiles/?filter=${encodeURIComponent(`equals(email,"${email}")`)}`,
    { headers }
  );

  if (!profileRes.ok) throw new Error(`Klaviyo profile lookup failed: ${profileRes.status}`);

  const profileData = await profileRes.json();
  const profile = profileData?.data?.[0];

  if (!profile) return; // Unknown email — nothing to suppress, still report success

  const profileId = profile.id;
  const listId = process.env.KLAVIYO_LIST_ID;
  const smsListId = process.env.KLAVIYO_SMS_LIST_ID;

  // Remove from email list
  if (listId) {
    await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
    });
  }

  // Remove from SMS list
  if (smsListId) {
    await fetch(`https://a.klaviyo.com/api/lists/${smsListId}/relationships/profiles/`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
    });
  }

  // Suppress the profile (global unsubscribe)
  await fetch("https://a.klaviyo.com/api/profile-suppression-bulk-create-jobs/", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "profile-suppression-bulk-create-job",
        attributes: {
          profiles: {
            data: [{ type: "profile", attributes: { email } }],
          },
        },
      },
    }),
  });

  // Track unsubscribe event (reason is optional)
  await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          metric: { data: { type: "metric", attributes: { name: "Unsubscribed" } } },
          profile: { data: { type: "profile", id: profileId } },
          properties: {
            ...(reason ? { reason } : {}),
            unsubscribed_at: new Date().toISOString(),
          },
        },
      },
    }),
  });
}

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.includes("@");
}

export async function POST(req: NextRequest) {
  try {
    // One-click unsubscribe POSTs form data to the header URL, which carries
    // the email in the query string; the /unsubscribe page POSTs JSON.
    let email: unknown = req.nextUrl.searchParams.get("email");
    let reason: string | undefined;
    if (!isValidEmail(email)) {
      try {
        const body = await req.json();
        email = body?.email;
        reason = typeof body?.reason === "string" && body.reason.trim() ? body.reason.trim() : undefined;
      } catch {
        // Non-JSON body (e.g. RFC 8058 form data) — query param was the only source
      }
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await unsubscribeEmail(email, reason);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
  }
}

// Non-RFC-8058 clients may open the List-Unsubscribe https URL directly —
// send them to the human unsubscribe page with the email prefilled.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || "";
  const target = new URL("/unsubscribe", req.nextUrl.origin);
  if (email) target.searchParams.set("email", email);
  return NextResponse.redirect(target);
}
