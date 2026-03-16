import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shroomé — Café Energy. Home Address.",
  description: "Ceremonial matcha meets functional mushrooms. 3g. One sachet. Pour over your latte base and feel the shift. Join the pre-launch list for 40% off your first order.",
  keywords: ["ceremonial matcha", "functional mushrooms", "matcha latte", "adaptogenic", "coming soon", "pre-launch"],
  openGraph: {
    title: "Shroomé — Café Energy. Home Address.",
    description: "3g ceremonial matcha + functional mushrooms in one sachet. The café came home. Join the pre-launch list for 40% off.",
    type: "website",
    url: "https://shroome.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shroomé — Ceremonial Matcha Latte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shroomé — Café Energy. Home Address.",
    description: "3g ceremonial matcha + functional mushrooms in one sachet. Join the list for 40% off.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=Syne+Mono:wght@400;500&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
