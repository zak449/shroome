import { NextRequest, NextResponse } from "next/server";

// ─── Referral stats lookup ──────────────────────────────────────────────────
// GET /api/referral?code=XXXXXX → { code, referralCount: number|null, live: boolean }
//
// APPROACH (2026-07-14 audit, finding M2):
// The previous implementation filtered Klaviyo /api/profiles on
// properties.referred_by — an UNSUPPORTED filter (custom properties.* fields
// are not filterable), so it 400'd and every user saw a count of 0 forever.
// There is no supported Klaviyo query that aggregates "profiles whose
// referred_by equals X" cheaply, so we do the simplest thing that never lies:
//
// 1. Conversion tracking (source of truth): the waitlist route now fires a
//    "Referral Converted" Klaviyo event on every referred signup with the
//    referrer's code in the event properties — segments/flows in the Klaviyo
//    dashboard credit referrers from that metric.
// 2. Live counts (optional): every signup row in the Google Sheet already
//    carries referred_by. Set REFERRAL_STATS_URL to an Apps Script web-app GET
//    endpoint that tallies the sheet and responds to
//    `<REFERRAL_STATS_URL>?code=XXXXXX` with JSON `{ "count": <number> }`.
//    When configured and healthy, we return that live count.
// 3. Graceful degradation: when the endpoint is not configured or fails, we
//    return referralCount: null / live: false — the /refer page then hides the
//    live tally instead of showing a false "0 friends referred".

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code || code.length < 4) {
    return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
  }

  const upperCode = code.toUpperCase();
  const statsUrl = process.env.REFERRAL_STATS_URL;

  if (!statsUrl) {
    // No live-count backend configured — report "no live count" honestly.
    return NextResponse.json({ code: upperCode, referralCount: null, live: false });
  }

  try {
    const res = await fetch(`${statsUrl}${statsUrl.includes("?") ? "&" : "?"}code=${encodeURIComponent(upperCode)}`, {
      // Apps Script web apps respond via redirect; follow it.
      redirect: "follow",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Referral stats endpoint error:", res.status, await res.text());
      return NextResponse.json({ code: upperCode, referralCount: null, live: false });
    }

    const data = await res.json();
    const count = typeof data?.count === "number" && data.count >= 0 ? data.count : null;

    return NextResponse.json({ code: upperCode, referralCount: count, live: count !== null });
  } catch (err) {
    console.error("Referral lookup error:", err);
    return NextResponse.json({ code: upperCode, referralCount: null, live: false });
  }
}
