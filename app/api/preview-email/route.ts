import { NextResponse } from "next/server";
import {
  welcomeEmail,
  sachetEmail,
  ledgerEmail,
  redactedEmail,
  ballotEmail,
} from "@/app/lib/emails";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "welcome";
  const origin = new URL(req.url).origin; // e.g. http://localhost:3001

  const preview = "preview@example.com";
  const { html } =
    type === "sachet"
      ? sachetEmail(preview)
      : type === "ledger"
        ? ledgerEmail(preview)
        : type === "redacted"
          ? redactedEmail(preview)
          : type === "ballot"
            ? ballotEmail(preview)
            : welcomeEmail(preview, searchParams.get("ref") || "PREVIEW1");

  // Swap drinkshroome.com asset URLs with local origin so images render in preview
  const previewHtml = html.replace(/https:\/\/(www\.)?drinkshroome\.com\//g, `${origin}/`);

  return new NextResponse(previewHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
