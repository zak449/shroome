import { MetadataRoute } from "next";
import { BRAND } from "./lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "shroomé — Functional Mushroom Wellness",
    short_name: "shroomé",
    description:
      "Premium functional mushroom blends for daily wellness. Lion's Mane, Reishi, Chaga & more.",
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
