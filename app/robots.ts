import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /lp/* and /unsubscribe are intentionally NOT disallowed here:
      // they carry robots noindex meta, and Google can only honor noindex
      // if it is allowed to crawl the page.
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: "https://www.drinkshroome.com/sitemap.xml",
  };
}
