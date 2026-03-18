import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "shroomé — Café Energy. Home Address.",
  description: "Ceremonial matcha meets functional mushrooms. 2g. One sachet. Pour over your latte base and feel the shift. Join the pre-launch list for 20% off + free shipping on your first order.",
  keywords: ["ceremonial matcha", "functional mushrooms", "matcha latte", "adaptogenic", "coming soon", "pre-launch"],
  openGraph: {
    title: "shroomé — Café Energy. Home Address.",
    description: "2g ceremonial matcha + functional mushrooms in one sachet. The café came home. Join the pre-launch list for 20% off + free shipping.",
    type: "website",
    url: "https://drinkshroome.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — Café Energy. Home Address.",
    description: "2g ceremonial matcha + functional mushrooms in one sachet. Join the list for 20% off + free shipping.",
  },
    icons: {
          icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
                ],
          apple: "/apple-touch-icon.png",
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
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-60FPK4E1PF" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-60FPK4E1PF');
          `}
        </Script>
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
