import { MetadataRoute } from "next";
import { BRAND } from "./lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "shroomé — Liquid Ceremonial Matcha Latte",
    short_name: "shroomé",
    description:
      "The liquid ceremonial matcha latte with lion's mane + collagen. Pour. Swirl. Go.",
    start_url: "/",
    display: "standalone",
    background_color: BRAND.manifest.backgroundColor,
    theme_color: BRAND.manifest.themeColor,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
