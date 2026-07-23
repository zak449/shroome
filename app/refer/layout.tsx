import type { Metadata } from "next";

// CFO ruling 2026-07-14: referral rewards are fixed credits — $5 / $10 / $15
// at 1 / 3 / 5 referrals (hard cap) + case-001 leaderboard prize.
const TITLE = "Refer Friends, Earn Credit — shroomé Referral Program";
const DESCRIPTION =
  "Share shroomé with friends. They lock in first access to Drop 002.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.drinkshroome.com/refer",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://www.drinkshroome.com/refer",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ReferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
