import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refer a Friend — shroomé",
  description:
    "Share shroomé with friends and unlock extra discounts. Give 25% off, get $10 credit. Stack rewards on top of your existing 20% waitlist discount.",
  alternates: {
    canonical: "https://www.drinkshroome.com/refer",
  },
  openGraph: {
    title: "Refer a Friend — shroomé",
    description:
      "Share shroomé with friends and unlock extra discounts. Give 25% off, get $10 credit.",
    type: "website",
    url: "https://www.drinkshroome.com/refer",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refer a Friend — shroomé",
    description:
      "Share shroomé with friends and unlock extra discounts. Give 25% off, get $10 credit.",
  },
};

export default function ReferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
