import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe — shroomé",
  description: "Manage your shroomé email preferences.",
  robots: { index: false, follow: false },
  // Prevent inheriting the root layout's canonical ("/") on this utility page.
  alternates: { canonical: null },
};

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
