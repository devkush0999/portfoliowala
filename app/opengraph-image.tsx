import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f6f3",
          color: "#1c1b19",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1a5f46",
          }}
        >
          {site.url.replace("https://", "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#55534e",
              maxWidth: 900,
            }}
          >
            React Native · AI · Backend · ESG · Sustainability
          </div>
        </div>
      </div>
    ),
    size,
  );
}
