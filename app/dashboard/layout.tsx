import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — shroomé",
  robots: { index: false, follow: false },
  // Prevent inheriting the root layout's canonical ("/") on this internal page.
  alternates: { canonical: null },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
