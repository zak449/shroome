import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_KEY = "shroome2026";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== DASHBOARD_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.KLAVIYO_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  const smsListId = process.env.KLAVIYO_SMS_LIST_ID;

  const headers: Record<string, string> = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };

  const stats: Record<string, unknown> = {
    totalSubscribers: 0,
    smsSubscribers: 0,
    recentSignups: [],
    weeklyTrend: { thisWeek: 0, lastWeek: 0 },
    errors: [] as string[],
  };

  if (!apiKey) {
    (stats.errors as string[]).push("KLAVIYO_API_KEY not configured");
    return NextResponse.json(stats);
  }

  // ─── Get total email list subscribers ─────────────────────────────────────
  if (listId) {
    try {
      const res = await fetch(
        `https://a.klaviyo.com/api/lists/${listId}/profiles/?page[size]=1`,
        { headers, next: { revalidate: 0 } }
      );
      if (res.ok) {
        const data = await res.json();
        // The total count is not directly in page[size]=1 response,
        // but we can get it from the list itself
        stats.totalSubscribers = data?.data?.length ?? 0;

        // Get actual count from list relationships
        const countRes = await fetch(
          `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
          { headers, next: { revalidate: 0 } }
        );
        if (countRes.ok) {
          const countData = await countRes.json();
          stats.totalSubscribers = countData?.data?.length ?? 0;
        }
      }
    } catch (err) {
      (stats.errors as string[]).push(`Email list fetch error: ${err}`);
    }
  }

  // ─── Get SMS list subscribers ─────────────────────────────────────────────
  if (smsListId) {
    try {
      const res = await fetch(
        `https://a.klaviyo.com/api/lists/${smsListId}/relationships/profiles/`,
        { headers, next: { revalidate: 0 } }
      );
      if (res.ok) {
        const data = await res.json();
        stats.smsSubscribers = data?.data?.length ?? 0;
      }
    } catch (err) {
      (stats.errors as string[]).push(`SMS list fetch error: ${err}`);
    }
  }

  // ─── Get profiles created this week vs last week ──────────────────────────
  try {
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    // This week signups
    const thisWeekFilter = `greater-or-equal(created,${startOfThisWeek.toISOString()})`;
    const thisWeekRes = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=${encodeURIComponent(thisWeekFilter)}&page[size]=100`,
      { headers, next: { revalidate: 0 } }
    );
    if (thisWeekRes.ok) {
      const thisWeekData = await thisWeekRes.json();
      (stats.weeklyTrend as Record<string, number>).thisWeek = thisWeekData?.data?.length ?? 0;
    }

    // Last week signups
    const lastWeekFilter = `and(greater-or-equal(created,${startOfLastWeek.toISOString()}),less-than(created,${startOfThisWeek.toISOString()}))`;
    const lastWeekRes = await fetch(
      `https://a.klaviyo.com/api/profiles/?filter=${encodeURIComponent(lastWeekFilter)}&page[size]=100`,
      { headers, next: { revalidate: 0 } }
    );
    if (lastWeekRes.ok) {
      const lastWeekData = await lastWeekRes.json();
      (stats.weeklyTrend as Record<string, number>).lastWeek = lastWeekData?.data?.length ?? 0;
    }
  } catch (err) {
    (stats.errors as string[]).push(`Weekly trend fetch error: ${err}`);
  }

  // ─── Get 10 most recent profiles ──────────────────────────────────────────
  try {
    const res = await fetch(
      `https://a.klaviyo.com/api/profiles/?sort=-created&page[size]=10`,
      { headers, next: { revalidate: 0 } }
    );
    if (res.ok) {
      const data = await res.json();
      stats.recentSignups = (data?.data ?? []).map((p: Record<string, Record<string, string>>) => ({
        email: p.attributes?.email ?? "",
        phone: p.attributes?.phone_number ?? null,
        created: p.attributes?.created ?? "",
      }));
    }
  } catch (err) {
    (stats.errors as string[]).push(`Recent profiles fetch error: ${err}`);
  }

  return NextResponse.json(stats);
}
