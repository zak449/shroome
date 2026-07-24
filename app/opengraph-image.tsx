import { ImageResponse } from "next/og";
import { BRAND } from "./lib/brand";

import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "shroomé — Pour. Swirl. Go.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const root = process.cwd();
  const fontsDir = join(root, "app/fonts");
  const [grotesk, groteskBold, wordmark, sheep, sachetV, sachetS] =
    await Promise.all([
      readFile(join(fontsDir, BRAND.fonts.files.displayRegular)),
      readFile(join(fontsDir, BRAND.fonts.files.bodyBold)),
      readFile(join(root, "public/brand/wordmark.png")),
      readFile(join(root, "public/brand/symbol-sheep-solid.png")),
      readFile(join(root, "public/sachet-vanilla.png")),
      readFile(join(root, "public/sachet-strawberry.png")),
    ]);
  const b64 = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BRAND.colors.tintSoft,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* cream cloud field behind the sachets */}
        <div
          style={{
            position: "absolute",
            right: "-210px",
            top: "-130px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: BRAND.colors.canvas,
            opacity: 0.55,
          }}
        />

        {/* ── Left: wordmark, sticker, headline ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 54px 76px",
            width: "660px",
          }}
        >
          {/* real Bolden wordmark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b64(wordmark)}
            width={300}
            height={65}
            alt=""
            style={{ width: "300px", height: "65px", marginBottom: "38px" }}
          />

          <h1
            style={{
              fontFamily: BRAND.fonts.displayName,
              fontWeight: 700,
              fontSize: "86px",
              color: BRAND.colors.ink,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "0 0 10px",
            }}
          >
            Your cafe matcha.
          </h1>
          <h1
            style={{
              fontFamily: BRAND.fonts.displayName,
              fontWeight: 700,
              fontSize: "86px",
              color: BRAND.colors.accent,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              margin: "0 0 34px",
            }}
          >
            At your door.
          </h1>

          {/* sold-out sticker — rotated, ink on lavender */}
          <div style={{ display: "flex" }}>
            <p
              style={{
                fontFamily: BRAND.fonts.bodyName,
                fontWeight: 700,
                fontSize: "17px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: BRAND.colors.tintSoft,
                background: BRAND.colors.ink,
                padding: "12px 26px",
                borderRadius: "999px",
                transform: "rotate(-2deg)",
              }}
            >
              Drop 001 poured out in 9 days
            </p>
          </div>
        </div>

        {/* ── Right: die-cut sachets + mé ── */}
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "40px",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b64(sachetV)}
            width={224}
            height={470}
            alt=""
            style={{
              width: "224px",
              height: "470px",
              transform: "rotate(-6deg) translateY(14px)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b64(sachetS)}
            width={224}
            height={470}
            alt=""
            style={{
              width: "224px",
              height: "470px",
              transform: "rotate(5deg)",
              marginLeft: "-40px",
            }}
          />
        </div>

        {/* mé peeking above the bottom bar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={b64(sheep)}
          width={104}
          height={116}
          alt=""
          style={{
            position: "absolute",
            right: "540px",
            bottom: "54px",
            width: "104px",
            height: "115px",
          }}
        />

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
            padding: "0 76px",
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
              color: BRAND.colors.tintSoft,
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
