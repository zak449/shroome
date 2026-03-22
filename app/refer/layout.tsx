import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give $5, Get $5 — Refer Friends to shroomé",
  description:
    "Share shroomé with friends. They get $5 off their first box. You get $5 credit for every friend who orders. No limit. Unlock free boxes, merch, and VIP status.",
  alternates: {
    canonical: "https://www.drinkshroome.com/refer",
  },
  openGraph: {
    title: "Give $5, Get $5 — Refer Friends to shroomé",
    description:
      "Share shroomé with friends. They get $5 off their first box. You earn $5 credit per referral. No limit.",
    type: "website",
    url: "https://www.drinkshroome.com/refer",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "Give $5, Get $5 — Refer Friends to shroomé",
    description:
      "Share shroomé with friends. They get $5 off their first box. You earn $5 credit per referral. No limit.",
  },
};

export default function ReferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
