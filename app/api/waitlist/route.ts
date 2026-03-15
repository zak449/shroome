import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 1. Send confirmation to the subscriber
    await resend.emails.send({
      from: "Shroomé <hello@shroome.com>",
      to: [email],
      subject: "You're on the list 🍵 — Your 40% off is locked in",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#090E0A;font-family:'Inter',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#090E0A;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding:40px 32px 32px;background:#0E1810;border-radius:24px 24px 0 0;border:1px solid rgba(142,214,110,0.15);border-bottom:none;">
                      <p style="margin:0 0 24px;font-size:28px;letter-spacing:0.2em;color:#F2EDDF;font-family:Georgia,serif;text-transform:uppercase;">
                        Shroomé
                      </p>
                      <div style="width:56px;height:56px;border-radius:50%;background:radial-gradient(circle,#8ED66E 0%,#3A8C3A 60%,#1A4A1A 100%);margin:0 auto 24px;box-shadow:0 0 30px rgba(142,214,110,0.4);"></div>
                      <h1 style="margin:0 0 12px;font-size:26px;color:#F2EDDF;font-family:Georgia,serif;font-weight:700;line-height:1.2;">
                        You're officially on the list.
                      </h1>
                      <p style="margin:0;font-size:16px;color:rgba(242,237,223,0.6);line-height:1.6;">
                        Your <strong style="color:#8ED66E;">40% off discount</strong> is locked in and waiting.
                        We'll drop it in your inbox the second we launch.
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:32px;background:#0E1810;border:1px solid rgba(142,214,110,0.15);border-top:none;border-bottom:none;">

                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-radius:16px;overflow:hidden;">
                        <tr style="background:rgba(142,214,110,0.06);border:1px solid rgba(142,214,110,0.15);">
                          <td style="padding:20px 24px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;color:rgba(142,214,110,0.6);text-transform:uppercase;font-family:monospace;">
                              What you're getting
                            </p>
                            <p style="margin:0;font-size:17px;color:#F2EDDF;font-weight:600;">
                              40% off your first Shroomé order
                            </p>
                            <p style="margin:6px 0 0;font-size:13px;color:rgba(242,237,223,0.45);">
                              Delivered to this inbox on launch day. First 500 only.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 20px;font-size:14px;color:rgba(242,237,223,0.55);line-height:1.7;">
                        While you wait, here's what Shroomé is all about:
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${[
                          ["🍵", "Ceremonial-grade matcha", "First-harvest, shade-grown. Not the culinary powder."],
                          ["🧠", "Functional mushrooms", "Lion's Mane + Chaga. Clean focus, lasting energy."],
                          ["✦", "3g precision dose", "Tear open. Pour over milk. Done in 60 seconds."],
                        ]
                          .map(
                            ([icon, title, desc]) => `
                          <tr>
                            <td style="padding:12px 0;border-bottom:1px solid rgba(242,237,223,0.06);">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-right:14px;font-size:20px;vertical-align:top;padding-top:2px;">${icon}</td>
                                  <td>
                                    <p style="margin:0 0 2px;font-size:14px;color:#F2EDDF;font-weight:500;">${title}</p>
                                    <p style="margin:0;font-size:12px;color:rgba(242,237,223,0.4);">${desc}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>`
                          )
                          .join("")}
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding:24px 32px;background:#090E0A;border-radius:0 0 24px 24px;border:1px solid rgba(142,214,110,0.1);border-top:1px solid rgba(142,214,110,0.1);">
                      <p style="margin:0 0 8px;font-size:12px;color:rgba(242,237,223,0.25);">
                        © 2026 Shroomé · Ceremonial matcha, functional mushrooms, no nonsense.
                      </p>
                      <p style="margin:0;font-size:12px;color:rgba(242,237,223,0.2);">
                        You signed up at shroome.com. We'll never spam you.
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

    // 2. Notify admin of new signup
    await resend.emails.send({
      from: "Shroomé Waitlist <hello@shroome.com>",
      to: ["hello@shroome.com"],
      subject: `🍵 New waitlist signup: ${email}`,
      html: `<p>New waitlist signup from <strong>${email}</strong></p><p>Time: ${new Date().toISOString()}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
