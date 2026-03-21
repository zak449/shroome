import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/unsubscribe/"],
    },
    sitemap: "https://drinkshroome.com/sitemap.xml",
  };
}
