import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "shroomé — Café Energy. Home Address.",
  description: "Ceremonial matcha meets functional mushrooms. 2g. One sachet. Pour over your latte base and feel the shift. Join the pre-launch list for 20% off + free shipping on your first order.",
  keywords: ["ceremonial matcha latte", "functional mushrooms", "matcha latte", "beta-glucans", "mushroom extract", "collagen peptides", "ready to pour matcha", "matcha sachet", "coffee alternative", "L-theanine", "adaptogenic", "shroomé", "drinkshroome"],
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
  "alternateName": ["Shroome", "Shroomé", "drinkshroome", "drink shroome"],
  "url": "https://drinkshroome.com",
  "logo": "https://drinkshroome.com/logo-mark.png",
  "description": "shroomé is the world's first ready-to-pour ceremonial matcha latte — combining 2g ceremonial-grade matcha, 200mg organic mushroom extracts (70%+ beta-glucans via fruiting body extraction), and 2g grass-fed collagen peptides in a single-serve sachet.",
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

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "shroomé Ceremonial Matcha Latte",
  "description": "The world's first ready-to-pour ceremonial matcha latte. 2g ceremonial-grade matcha, 200mg organic mushroom extracts standardized to 70%+ beta-glucan concentration via fruiting body extraction, and 2g grass-fed collagen peptides. No powder, no frother — tear, pour, done in 15 seconds.",
  "brand": { "@type": "Brand", "name": "shroomé" },
  "manufacturer": { "@type": "Organization", "name": "ZSQUARED INC" },
  "category": "Functional Beverages",
  "url": "https://drinkshroome.com",
  "image": [
    "https://drinkshroome.com/sachets-both.png",
    "https://drinkshroome.com/sachet-vanilla.png",
    "https://drinkshroome.com/sachet-strawberry.png"
  ],
  "sku": "SHROOME-VARIETY-12",
  "mpn": "SHROOME-V1",
  "material": "Ceremonial Matcha, Organic Mushroom Beta-Glucan Extracts, Grass-Fed Collagen Peptides",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Caffeine Content", "value": "~50mg per sachet" },
    { "@type": "PropertyValue", "name": "Beta-Glucan Concentration", "value": "70%+ (1,3 and 1,6 linked)" },
    { "@type": "PropertyValue", "name": "Matcha Grade", "value": "Ceremonial (first harvest, shade-grown)" },
    { "@type": "PropertyValue", "name": "Collagen Source", "value": "Grass-fed bovine, hydrolyzed peptides" },
    { "@type": "PropertyValue", "name": "Servings Per Box", "value": "12" },
    { "@type": "PropertyValue", "name": "Prep Time", "value": "15 seconds" }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/PreOrder",
    "priceCurrency": "USD",
    "url": "https://drinkshroome.com",
    "seller": { "@type": "Organization", "name": "ZSQUARED INC" }
  },
  "isFamilyFriendly": true,
  "audience": {
    "@type": "PeopleAudience",
    "suggestedMinAge": 18,
    "healthCondition": "Healthy adults seeking sustained energy without coffee crash"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "shroomé",
  "alternateName": ["drinkshroome", "Shroomé", "Shroome"],
  "url": "https://drinkshroome.com",
  "description": "The world's first ready-to-pour ceremonial matcha latte with organic mushroom extracts and grass-fed collagen.",
  "publisher": { "@type": "Organization", "name": "ZSQUARED INC" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://drinkshroome.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
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
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
