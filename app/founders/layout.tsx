import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founders Batch — shroomé | First 500 Numbered Boxes",
  description:
    "Join the shroomé Founders Batch — the first 500 numbered boxes with 30% off, free shipping, and your name on the Founders Wall. Limited edition ceremonial matcha latte.",
  keywords: [
    "shroomé founders batch",
    "limited edition matcha",
    "pre-order matcha latte",
    "numbered matcha box",
    "shroomé early access",
    "ceremonial matcha latte pre-launch",
  ],
  openGraph: {
    title: "Founders Batch — shroomé | First 500 Numbered Boxes",
    description:
      "The first 500 boxes. Numbered. Yours. 30% off + free shipping + your name on the Founders Wall.",
    url: "https://www.drinkshroome.com/founders",
    siteName: "shroomé",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders Batch — shroomé | First 500 Numbered Boxes",
    description:
      "The first 500 boxes. Numbered. Yours. 30% off + free shipping + your name on the Founders Wall.",
  },
  alternates: {
    canonical: "https://www.drinkshroome.com/founders",
  },
};

export default function FoundersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
