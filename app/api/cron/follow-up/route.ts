import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sachetEmail, unsubHeaders } from "@/app/lib/emails";

// Runs daily via Vercel Cron — sends the Day-7 follow-up to profiles created
// 7 days ago.
//
// IMPLEMENTATION NOTES (2026-07-14 lifecycle audit, findings B2/H4/M3/M4):
// - The old version filtered on properties.signup_date, which the Klaviyo
//   /api/profiles filter does NOT support (custom properties.* fields are not
//   filterable) → the query 400'd and this route 500'd every day, sending
//   nothing. We now filter on `created` (a supported datetime filter), which
//   matches signup date because profiles are created by the waitlist route at
//   signup time.
// - Suppressed/unsubscribed profiles are excluded before sending (CAN-SPAM):
//   we request additional-fields[profile]=subscriptions and require
//   can_receive_email_marketing / consent + an empty suppression list.
// - Dedupe now filters events on metric_id (metric.name is not a supported
//   events filter) and fails CLOSED: if we can't prove the follow-up wasn't
//   already sent, we skip rather than risk a duplicate.
// - This route never returns 500 — on any Klaviyo failure it degrades to a
//   200 no-op with a log. The recommended long-term replacement is a Klaviyo
//   flow triggered off the "Waitlist Signup" metric with a 7-day delay
//   (suppression, quiet hours, and retries handled by Klaviyo — see
//   Marketing/Email/klaviyo-setup-runbook.md).
export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.KLAVIYO_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!apiKey || !resendKey) {
    // No-op, not an error — cron must not alarm on missing config, just log it.
    console.error("Day-7 cron: KLAVIYO_API_KEY or RESEND_API_KEY missing — skipping run.");
    return NextResponse.json({ success: false, sent: 0, note: "Missing API keys — no-op" });
  }

  const resend = new Resend(resendKey);
  const headers = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };

  // Day-7 cohort: profiles created between 8 and 7 days ago (24h window,
  // matched to the daily cron cadence).
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const eightDaysAgo = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);

  try {
    // Resolve the dedupe metric ID once ("Follow-Up Email Sent"). The events
    // API filters on metric_id, not metric.name. If the lookup itself fails we
    // fail closed (no sends this run) to avoid duplicate emails.
    let dedupeMetricId: string | null = null;
    let metricLookupOk = false;
    try {
      const metricRes = await fetch(
        `https://a.klaviyo.com/api/metrics/?filter=${encodeURIComponent('equals(name,"Follow-Up Email Sent")')}`,
        { headers }
      );
      if (metricRes.ok) {
        const metricData = await metricRes.json();
        dedupeMetricId = metricData?.data?.[0]?.id ?? null; // null = metric never fired yet
        metricLookupOk = true;
      } else {
        console.error("Day-7 cron: metric lookup failed:", metricRes.status, await metricRes.text());
      }
    } catch (err) {
      console.error("Day-7 cron: metric lookup error:", err);
    }
    if (!metricLookupOk) {
      return NextResponse.json({
        success: false,
        sent: 0,
        note: "Dedupe metric lookup failed — failing closed (no sends this run)",
      });
    }

    // Query the day-7 cohort by `created` (supported filter), including
    // subscription state, paginating past the default page size.
    const filter = encodeURIComponent(
      `and(greater-or-equal(created,${eightDaysAgo.toISOString()}),less-than(created,${sevenDaysAgo.toISOString()}))`
    );
    let pageUrl: string | null =
      `https://a.klaviyo.com/api/profiles/?filter=${filter}&additional-fields[profile]=subscriptions&page[size]=100`;

    type KlaviyoProfile = {
      id: string;
      attributes?: {
        email?: string;
        subscriptions?: {
          email?: {
            marketing?: {
              consent?: string;
              can_receive_email_marketing?: boolean;
              suppression?: unknown[];
              suppressions?: unknown[];
            };
          };
        };
      };
    };

    const profiles: KlaviyoProfile[] = [];
    let pages = 0;
    while (pageUrl && pages < 10) {
      const profilesRes: Response = await fetch(pageUrl, { headers });
      if (!profilesRes.ok) {
        const errText = await profilesRes.text();
        console.error(
          "Day-7 cron: Klaviyo profile query failed — no emails sent this run.",
          "If this persists, replace this cron with a Klaviyo flow (Waitlist Signup metric + 7-day delay);",
          "see Marketing/Email/klaviyo-setup-runbook.md.",
          profilesRes.status,
          errText
        );
        // Never 500 — a broken query must not page anyone and must not alarm Vercel cron.
        return NextResponse.json({ success: false, sent: 0, note: "Klaviyo query failed — no-op" });
      }
      const profilesData = await profilesRes.json();
      profiles.push(...(profilesData?.data ?? []));
      pageUrl = profilesData?.links?.next ?? null;
      pages++;
    }

    let sent = 0;
    let skippedSuppressed = 0;
    let skippedDeduped = 0;

    for (const profile of profiles) {
      const email = profile?.attributes?.email;
      if (!email) continue;

      // CAN-SPAM gate: only send to profiles that can receive email marketing.
      // Fail closed — missing subscription info means skip.
      const marketing = profile?.attributes?.subscriptions?.email?.marketing;
      const suppressed =
        (Array.isArray(marketing?.suppression) && marketing.suppression.length > 0) ||
        (Array.isArray(marketing?.suppressions) && marketing.suppressions.length > 0);
      const canReceive =
        marketing?.can_receive_email_marketing === true ||
        (marketing?.can_receive_email_marketing === undefined && marketing?.consent === "SUBSCRIBED");
      if (!marketing || suppressed || !canReceive) {
        skippedSuppressed++;
        continue;
      }

      // Dedupe: skip if a "Follow-Up Email Sent" event already exists for this
      // profile. Fails closed on lookup errors.
      if (dedupeMetricId) {
        try {
          const eventsRes = await fetch(
            `https://a.klaviyo.com/api/events/?filter=${encodeURIComponent(
              `and(equals(metric_id,"${dedupeMetricId}"),equals(profile_id,"${profile.id}"))`
            )}`,
            { headers }
          );
          if (!eventsRes.ok) {
            console.error("Day-7 cron: dedupe check failed for", email, "— skipping (fail closed).");
            skippedDeduped++;
            continue;
          }
          const eventsData = await eventsRes.json();
          if (eventsData?.data?.length > 0) {
            skippedDeduped++;
            continue; // Already sent
          }
        } catch (err) {
          console.error("Day-7 cron: dedupe check error for", email, "— skipping (fail closed).", err);
          skippedDeduped++;
          continue;
        }
      }

      // Send the follow-up email
      const followUp = sachetEmail(email);
      try {
        await resend.emails.send({
          from: "shroomé <hello@drinkshroome.com>",
          to: [email],
          subject: followUp.subject,
          html: followUp.html,
          headers: unsubHeaders(email), // RFC 8058 one-click unsubscribe
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

    return NextResponse.json({
      success: true,
      checked: profiles.length,
      sent,
      skippedSuppressed,
      skippedDeduped,
    });
  } catch (error) {
    // Never 500 — log and no-op so Vercel cron doesn't report daily failures.
    console.error(
      "Day-7 cron error (returning 200 no-op). Consider replacing this cron with a Klaviyo flow —",
      "see Marketing/Email/klaviyo-setup-runbook.md:",
      error
    );
    return NextResponse.json({ success: false, sent: 0, note: "Cron error — no-op" });
  }
}
