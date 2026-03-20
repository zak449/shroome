import { NextResponse } from "next/server";
import { welcomeEmail, sachetEmail } from "@/app/lib/emails";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "welcome";
  const origin = new URL(req.url).origin; // e.g. http://localhost:3001

  const { html } =
    type === "sachet"
      ? sachetEmail("preview@example.com")
      : welcomeEmail("preview@example.com");

  // Swap drinkshroome.com asset URLs with local origin so images render in preview
  const previewHtml = html.replace(/https:\/\/drinkshroome\.com\//g, `${origin}/`);

  return new NextResponse(previewHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
