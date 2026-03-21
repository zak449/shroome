import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, reason } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.KLAVIYO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const headers = {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      "Content-Type": "application/json",
      revision: "2024-10-15",
    };

    // Find the profile by email
    const profileRes = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`,
      { headers }
    );

    if (!profileRes.ok) {
      return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
    }

    const profileData = await profileRes.json();
    const profile = profileData?.data?.[0];

    if (profile) {
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

      // Track unsubscribe event with reason
      await fetch("https://a.klaviyo.com/api/events/", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "event",
            attributes: {
              metric: { data: { type: "metric", attributes: { name: "Unsubscribed" } } },
              profile: { data: { type: "profile", id: profileId } },
              properties: { reason, unsubscribed_at: new Date().toISOString() },
            },
          },
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
  }
}
