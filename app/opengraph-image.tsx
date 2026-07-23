import { ImageResponse } from "next/og";
import { BRAND } from "./lib/brand";

import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "shroomé — Pour. Swirl. Go.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "app/fonts");
  const grotesk = await readFile(join(fontsDir, BRAND.fonts.files.displayRegular));
  const groteskBold = await readFile(join(fontsDir, BRAND.fonts.files.bodyBold));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: BRAND.colors.tintSoft,
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Pinwheel-ish flower discs */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: BRAND.colors.accent,
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-20px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: BRAND.colors.accentDeep,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "60px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: BRAND.colors.canvas,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: BRAND.colors.flavorFunctional,
            opacity: 0.8,
          }}
        />

        {/* Wordmark */}
        <p
          style={{
            fontFamily: BRAND.fonts.displayName,
            fontWeight: 700,
            fontSize: "44px",
            letterSpacing: "-0.02em",
            color: BRAND.colors.ink,
            marginBottom: "26px",
          }}
        >
          shroomé
        </p>

        {/* Sold-out tag */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "18px" }}>
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: BRAND.colors.ink,
              background: BRAND.colors.accent,
              padding: "10px 22px",
              borderRadius: "999px",
              border: `2px solid ${BRAND.colors.ink}`,
            }}
          >
            Drop 001 sold out — restock soon
          </p>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: BRAND.fonts.displayName,
            fontWeight: 700,
            fontSize: "84px",
            color: BRAND.colors.ink,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        >
          Your whole morning
        </h1>
        <div style={{ display: "flex", alignItems: "baseline", gap: "22px" }}>
          <h1
            style={{
              fontFamily: BRAND.fonts.displayName,
              fontWeight: 700,
              fontSize: "84px",
              color: BRAND.colors.ink,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            stack.
          </h1>
          <h1
            style={{
              fontFamily: BRAND.fonts.displayName,
              fontWeight: 700,
              fontSize: "84px",
              color: BRAND.colors.accentDeep,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            One pour.
          </h1>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "54px",
            background: BRAND.colors.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 80px",
          }}
        >
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "16px",
              color: BRAND.colors.canvas,
              letterSpacing: "0.05em",
            }}
          >
            www.drinkshroome.com
          </p>
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "16px",
              color: BRAND.colors.accent,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Pour. Swirl. Go.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: BRAND.fonts.displayName,
          data: grotesk,
          style: "normal",
          weight: 400,
        },
        {
          name: BRAND.fonts.displayName,
          data: groteskBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
