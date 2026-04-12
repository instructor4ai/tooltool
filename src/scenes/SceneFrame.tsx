import type { PropsWithChildren, ReactNode } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import type { Tone } from "../types";

const paletteByTone = {
  dark: {
    background:
      "radial-gradient(circle at top left, rgba(255,255,255,0.16), transparent 34%), linear-gradient(135deg, #0f172a 0%, #111827 55%, #020617 100%)",
    text: "#f8fafc",
    muted: "rgba(248, 250, 252, 0.72)",
    line: "rgba(248, 250, 252, 0.18)",
    accent: "#f97316",
  },
  light: {
    background:
      "radial-gradient(circle at top left, rgba(249,115,22,0.16), transparent 35%), linear-gradient(135deg, #f8fafc 0%, #fff7ed 55%, #fef2f2 100%)",
    text: "#0f172a",
    muted: "rgba(15, 23, 42, 0.64)",
    line: "rgba(15, 23, 42, 0.16)",
    accent: "#ea580c",
  },
} as const;

export const SceneFrame = ({
  tone,
  label,
  backdrop,
  children,
}: PropsWithChildren<{
  tone: Tone;
  label?: ReactNode;
  backdrop?: ReactNode;
}>) => {
  const frame = useCurrentFrame();
  const reveal = spring({
    fps: 30,
    frame,
    config: {
      damping: 200,
      mass: 0.9,
      stiffness: 140,
    },
  });

  const translateY = interpolate(reveal, [0, 1], [48, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);
  const palette = paletteByTone[tone];

  return (
    <AbsoluteFill
      style={{
        background: palette.background,
        color: palette.text,
        fontFamily:
          '"Pretendard Variable", "SF Pro Display", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          mixBlendMode: tone === "dark" ? "screen" : "multiply",
          opacity: tone === "dark" ? 0.28 : 0.18,
        }}
      />
      {backdrop}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "92px 112px",
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        {label ? (
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: palette.muted,
              marginBottom: 40,
            }}
          >
            {label}
          </div>
        ) : null}
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const getScenePalette = (tone: Tone) => paletteByTone[tone];
