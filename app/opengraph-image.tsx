import { ImageResponse } from "next/og";
import { BRAND } from "./lib/brand";

import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "shroomé — Café Energy. Home Address.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "app/fonts");
  const instrumentSerifItalic = await readFile(join(fontsDir, BRAND.fonts.files.displayItalic));
  const instrumentSerifRegular = await readFile(join(fontsDir, BRAND.fonts.files.displayRegular));
  const syne = await readFile(join(fontsDir, BRAND.fonts.files.bodyBold));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: BRAND.colors.flavorStrawberry,
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Flavor-tint blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: BRAND.colors.flavorFunctional,
            opacity: 0.7,
          }}
        />

        {/* Blush blob bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "350px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(255,160,180,0.5)",
          }}
        />

        {/* Brand */}
        <p
          style={{
            fontFamily: BRAND.fonts.displayName,
            fontStyle: "italic",
            fontSize: "38px",
            color: BRAND.colors.ink,
            marginBottom: "30px",
          }}
        >
          shroomé
        </p>

        {/* Pre-launch tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: BRAND.colors.accent,
            }}
          />
          <p
            style={{
              fontFamily: BRAND.fonts.bodyName,
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: BRAND.colors.accentDeep,
            }}
          >
            Pre-launch · 20% off + free shipping
          </p>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: BRAND.fonts.displayName,
            fontSize: "82px",
            color: BRAND.colors.accentDeep,
            lineHeight: 1.05,
            margin: "0 0 4px",
          }}
        >
          Café energy.
        </h1>
        <h1
          style={{
            fontFamily: BRAND.fonts.displayName,
            fontSize: "82px",
            color: BRAND.colors.accentDeep,
            lineHeight: 1.05,
            margin: "0 0 4px",
          }}
        >
          Home address.
        </h1>
        <h1
          style={{
            fontFamily: BRAND.fonts.displayName,
            fontStyle: "italic",
            fontSize: "82px",
            color: BRAND.colors.accentWarm,
            lineHeight: 1.05,
            margin: "0",
          }}
        >
          No crash.
        </h1>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50px",
            background: BRAND.colors.ink,
            display: "flex",
            alignItems: "center",
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
