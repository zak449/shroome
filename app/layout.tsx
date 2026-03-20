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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ZSQUARED INC",
  "brand": { "@type": "Brand", "name": "shroomé" },
  "url": "https://drinkshroome.com",
  "logo": "https://drinkshroome.com/logo-navy.png",
  "description": "shroomé is the world's first ready-to-pour ceremonial matcha latte with organic mushroom extracts and grass-fed collagen peptides.",
  "sameAs": [
    "https://tiktok.com/@drinkshroome",
    "https://instagram.com/drinkshroome",
    "https://youtube.com/@drinkshroome"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@drinkshroome.com",
    "contactType": "customer service"
  }
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "shroomé Ceremonial Matcha Latte",
  "description": "Ready-to-pour ceremonial matcha latte with organic mushroom extracts (70%+ beta-glucans) and grass-fed collagen peptides",
  "brand": { "@type": "Brand", "name": "shroomé" },
  "category": "Functional Beverages",
  "material": "Ceremonial Matcha, Organic Mushroom Extracts, Grass-Fed Collagen Peptides",
  "url": "https://drinkshroome.com",
  "image": "https://drinkshroome.com/sachets-both.png",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/PreOrder",
    "priceCurrency": "USD"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
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
