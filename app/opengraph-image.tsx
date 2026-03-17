import { ImageResponse } from "next/og";

import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "shroomé — Café Energy. Home Address.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "app/fonts");
  const instrumentSerifItalic = await readFile(join(fontsDir, "InstrumentSerif-Italic.ttf"));
  const instrumentSerifRegular = await readFile(join(fontsDir, "InstrumentSerif-Regular.ttf"));
  const syne = await readFile(join(fontsDir, "Syne-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#FFB7D1",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Lavender blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "#D4B8E0",
            opacity: 0.7,
          }}
        />

        {/* Pink blob bottom */}
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
            fontFamily: "'Instrument Serif'",
            fontStyle: "italic",
            fontSize: "38px",
            color: "#1B1F3B",
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
              background: "#C8FF3A",
            }}
          />
          <p
            style={{
              fontFamily: "'Syne'",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2D4A2D",
            }}
          >
            Pre-launch · First 500 get 30% off
          </p>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "82px",
            color: "#2D4A2D",
            lineHeight: 1.05,
            margin: "0 0 4px",
          }}
        >
          Café energy.
        </h1>
        <h1
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "82px",
            color: "#2D4A2D",
            lineHeight: 1.05,
            margin: "0 0 4px",
          }}
        >
          Home address.
        </h1>
        <h1
          style={{
            fontFamily: "'Instrument Serif'",
            fontStyle: "italic",
            fontSize: "82px",
            color: "#FF7043",
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
            background: "#1B1F3B",
            display: "flex",
            alignItems: "center",
            padding: "0 80px",
          }}
        >
          <p
            style={{
              fontFamily: "'Syne'",
              fontWeight: 700,
              fontSize: "16px",
              color: "#FDF4EE",
              letterSpacing: "0.05em",
            }}
          >
            drinkshroome.com
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerifRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Serif",
          data: instrumentSerifItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "Syne",
          data: syne,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
