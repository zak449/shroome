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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
