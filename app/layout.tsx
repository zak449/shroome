import type { Metadata, Viewport } from "next";
import Script from "next/script";
import BackToTop from "./BackToTop";
import StickyCTA from "./StickyCTA";
import ExitPopup from "./ExitPopup";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drinkshroome.com"),
  alternates: {
    canonical: "/",
  },
  title: "shroomé — Café Energy. Home Address.",
  description: "Ceremonial matcha meets functional mushrooms. 2.5g. One sachet. Pour over your latte base and feel the shift. Join the pre-launch list for 20% off + free shipping on your first order.",
  keywords: ["ceremonial matcha latte", "functional mushrooms", "matcha latte", "beta-glucans", "mushroom extract", "collagen peptides", "ready to pour matcha", "matcha sachet", "coffee alternative", "L-theanine", "adaptogenic", "shroomé", "drinkshroome"],
  openGraph: {
    title: "shroomé — Café Energy. Home Address.",
    description: "2.5g ceremonial matcha + functional mushrooms in one sachet. The café came home. Join the pre-launch list for 20% off + free shipping.",
    type: "website",
    siteName: "shroomé",
    url: "https://www.drinkshroome.com",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "shroomé — Café Energy. Home Address.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "shroomé — Café Energy. Home Address.",
    description: "2.5g ceremonial matcha + functional mushrooms in one sachet. Join the list for 20% off + free shipping.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ZSQUARED INC",
  "brand": { "@type": "Brand", "name": "shroomé" },
  "alternateName": ["Shroome", "Shroomé", "drinkshroome", "drink shroome"],
  "url": "https://www.drinkshroome.com",
  "logo": "https://www.drinkshroome.com/logo-mark.png",
  "description": "shroomé is the world's first ready-to-pour ceremonial matcha latte — combining 2.5g ceremonial-grade matcha, 200mg organic mushroom extracts (70%+ beta-glucans via fruiting body extraction), and 2g grass-fed collagen peptides in a single-serve sachet.",
  "foundingDate": "2025",
  "founder": {
    "@type": "Person",
    "name": "Zachary Kaufman",
    "jobTitle": "Founder & CEO"
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://tiktok.com/@drinkshroome",
    "https://instagram.com/drinkshroome",
    "https://youtube.com/@drinkshroome"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@drinkshroome.com",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "knowsAbout": [
    "Ceremonial Matcha",
    "Beta-Glucans",
    "Functional Mushroom Extracts",
    "Collagen Peptides",
    "Functional Beverages",
    "L-Theanine"
  ]
};


const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "shroomé",
  "alternateName": ["drinkshroome", "Shroomé", "Shroome"],
  "url": "https://www.drinkshroome.com",
  "description": "The world's first ready-to-pour ceremonial matcha latte with organic mushroom extracts and grass-fed collagen.",
  "publisher": { "@type": "Organization", "name": "ZSQUARED INC" },
  "inLanguage": "en-US"
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
        <BackToTop />
        <StickyCTA />
        <ExitPopup />
      </body>
    </html>
  );
}
