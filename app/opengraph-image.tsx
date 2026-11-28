import { ImageResponse } from "next/og";
import { profile } from "@/content/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F2ECE0",
          color: "#111111",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "2px",
            paddingBottom: 18,
            borderBottom: "2px solid #111111",
          }}
        >
          <span>VOL. 01 / 2026</span>
          <span>THE ASHISH DISPATCH</span>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: "3px",
            }}
          >
            FRONT PAGE / FEATURE REPORT
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 108,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-6px",
              textTransform: "uppercase",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 30,
              width: 190,
              height: 10,
              backgroundColor: "#FF4A1C",
            }}
          />
          <div style={{ marginTop: 30, fontSize: 36, fontWeight: 700 }}>
            {profile.role}
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: "1px",
            }}
          >
            {profile.location.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ height: 3, backgroundColor: "#111111" }} />
          <div style={{ height: 3, backgroundColor: "#111111" }} />
          <div
            style={{
              marginTop: 10,
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: "2px",
            }}
          >
            PRINTED ON THE WEB · SET IN FRAUNCES &amp; JETBRAINS MONO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
