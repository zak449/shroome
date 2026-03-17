import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sachetEmail } from "@/app/lib/emails";

// Runs daily via Vercel Cron — sends Day 7 follow-up to profiles who signed up 7 days ago
export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.KLAVIYO_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!apiKey || !resendKey) {
    return NextResponse.json({ error: "Missing keys" }, { status: 500 });
  }

  const resend = new Resend(resendKey);
  const headers = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };

  // Find profiles who signed up exactly 7 days ago (within a 24h window)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

  try {
    // Query Klaviyo for profiles with signup_date in the 7-day window
    const profilesRes = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=and(greater-or-equal(properties.signup_date,${eightDaysAgo.toISOString()}),less-than(properties.signup_date,${sevenDaysAgo.toISOString()}))&fields[profile]=email,properties`,
      { headers }
    );

    if (!profilesRes.ok) {
      const errText = await profilesRes.text();
      console.error("Klaviyo profile query failed:", errText);
      return NextResponse.json({ error: "Klaviyo query failed" }, { status: 500 });
    }

    const profilesData = await profilesRes.json();
    const profiles = profilesData?.data || [];
    let sent = 0;

    for (const profile of profiles) {
      const email = profile?.attributes?.email;
      if (!email) continue;

      // Check if we already sent this follow-up (track via Klaviyo event)
      const eventsRes = await fetch(
        `https://a.klaviyo.com/api/events/?filter=and(equals(profile_id,"${profile.id}"),equals(metric.name,"Follow-Up Email Sent"))`,
        { headers }
      );
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (eventsData?.data?.length > 0) continue; // Already sent
      }

      // Send the follow-up email
      const followUp = sachetEmail(email);
      try {
        await resend.emails.send({
          from: "shroomé <hello@drinkshroome.com>",
          to: [email],
          subject: followUp.subject,
          html: followUp.html,
        });

        // Track that we sent the follow-up
        await fetch("https://a.klaviyo.com/api/events/", {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "event",
              attributes: {
                metric: { data: { type: "metric", attributes: { name: "Follow-Up Email Sent" } } },
                profile: { data: { type: "profile", id: profile.id } },
                properties: { email_type: "sachet_ingredients", sent_at: now.toISOString() },
              },
            },
          }),
        });

        sent++;
      } catch (err) {
        console.error(`Follow-up email failed for ${email}:`, err);
      }
    }

    return NextResponse.json({ success: true, checked: profiles.length, sent });
  } catch (error) {
    console.error("Follow-up cron error:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
