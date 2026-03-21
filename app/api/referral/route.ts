import { NextRequest, NextResponse } from "next/server";

// ─── Referral stats lookup ──────────────────────────────────────────────────
// GET /api/referral?code=XXXXXX
// Queries Klaviyo for profiles whose `referred_by` property matches the code.
// Returns { code, referralCount }.

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code || code.length < 4) {
    return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
  }

  const upperCode = code.toUpperCase();
  const apiKey = process.env.KLAVIYO_API_KEY;

  if (!apiKey) {
    // Klaviyo not configured — return 0 so the UI still works
    return NextResponse.json({ code: upperCode, referralCount: 0 });
  }

  const headers = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    revision: "2024-10-15",
  };

  try {
    // Use Klaviyo's profile filter to count profiles where referred_by == code
    const filterParam = `equals(properties.referred_by,"${upperCode}")`;
    const url = `https://a.klaviyo.com/api/profiles/?filter=${encodeURIComponent(filterParam)}&fields[profile]=email`;

    const res = await fetch(url, { method: "GET", headers });

    if (!res.ok) {
      console.error("Klaviyo referral lookup error:", res.status, await res.text());
      return NextResponse.json({ code: upperCode, referralCount: 0 });
    }

    const data = await res.json();
    const referralCount = data?.data?.length ?? 0;

    return NextResponse.json({ code: upperCode, referralCount });
  } catch (err) {
    console.error("Referral lookup error:", err);
    return NextResponse.json({ code: upperCode, referralCount: 0 });
  }
}
