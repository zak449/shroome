import { ImageResponse } from "next/og";
import { BRAND, alpha } from "@/app/lib/brand";
import { readFile } from "fs/promises";
import { join } from "path";
import { blogPosts, getPostBySlug } from "../posts";

export const alt = "shroomé Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

const categoryColors: Record<string, { bg: string; text: string; accent: string }> = {
  Ingredients: { bg: "#E8F0DD", text: "#5A7A3A", accent: BRAND.colors.accentMuted },
  Wellness: { bg: "#FFE4EE", text: "#B44C7A", accent: BRAND.colors.flavorStrawberry },
  "How-To": { bg: "#F0FFD0", text: "#4A6B1A", accent: BRAND.colors.accent },
  Science: { bg: "#EDE4F0", text: "#6B4D7A", accent: BRAND.colors.flavorFunctional },
};

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return new ImageResponse(<div style={{ width: "100%", height: "100%", background: BRAND.colors.ink }} />, size);
  }

  const fontsDir = join(process.cwd(), "app/fonts");
  const instrumentSerifItalic = await readFile(join(fontsDir, BRAND.fonts.files.displayItalic));
  const instrumentSerifRegular = await readFile(join(fontsDir, BRAND.fonts.files.displayRegular));
  const syne = await readFile(join(fontsDir, BRAND.fonts.files.bodyBold));

  const colors = categoryColors[post.category] || categoryColors.Ingredients;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND.colors.flavorStrawberry,
          padding: "60px 80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: colors.accent,
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: BRAND.colors.flavorFunctional,
            opacity: 0.35,
          }}
        />

        {/* Top: brand + category */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p
            style={{
              fontFamily: BRAND.fonts.displayName,
              fontStyle: "italic",
              fontSize: "34px",
              color: BRAND.colors.ink,
            }}
          >
            shroomé
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.5)",
              padding: "8px 18px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: colors.text,
              }}
            />
            <p
              style={{
                fontFamily: BRAND.fonts.bodyName,
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.text,
              }}
            >
              {post.category}
            </p>
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", maxWidth: "900px" }}>
          <h1
            style={{
              fontFamily: BRAND.fonts.displayName,
              fontSize: post.title.length > 50 ? "52px" : "62px",
              color: BRAND.colors.accentDeep,
              lineHeight: 1.1,
              margin: "0",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "15px",
              color: alpha("ink", 0.5),
              marginTop: "16px",
              letterSpacing: "0.04em",
            }}
          >
            {post.readTime} · {post.author}
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
            background: BRAND.colors.ink,
            margin: "0 -80px",
            padding: "0 80px",
          }}
        >
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "15px",
              color: BRAND.colors.canvas,
              letterSpacing: "0.05em",
            }}
          >
            www.drinkshroome.com/blog
          </p>
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "12px",
              color: BRAND.colors.accent,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            20% off + free shipping
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: BRAND.fonts.displayName,
          data: instrumentSerifRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: BRAND.fonts.displayName,
          data: instrumentSerifItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: BRAND.fonts.bodyName,
          data: syne,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
