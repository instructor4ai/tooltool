import { interpolate, spring, useCurrentFrame } from "remotion";
import { MotionBackdrop } from "./AmbientLayers";
import { SceneFrame, getScenePalette } from "./SceneFrame";
import type { ContrastSlide } from "../types";

const panelStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  padding: "0 34px",
};

export const ContrastScene = ({ left, right, tone }: ContrastSlide) => {
  const frame = useCurrentFrame();
  const palette = getScenePalette(tone);
  const reveal = spring({
    fps: 30,
    frame,
    config: {
      damping: 160,
      stiffness: 140,
    },
  });

  const leftX = interpolate(reveal, [0, 1], [-40, 0]);
  const rightX = interpolate(reveal, [0, 1], [40, 0]);

  return (
    <SceneFrame
      tone={tone}
      label="Question shift"
      backdrop={<MotionBackdrop tone={tone} variant="questions" />}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: 56,
        }}
      >
        <div
          style={{
            ...panelStyle,
            transform: `translateX(${leftX}px)`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: palette.muted,
              marginBottom: 26,
            }}
          >
            Too often
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.12,
              fontWeight: 760,
              letterSpacing: "-0.05em",
              whiteSpace: "pre-line",
            }}
          >
            {left}
          </div>
        </div>
        <div
          style={{
            width: 1,
            backgroundColor: palette.line,
          }}
        />
        <div
          style={{
            ...panelStyle,
            transform: `translateX(${rightX}px)`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: palette.accent,
              marginBottom: 26,
            }}
          >
            Ask instead
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              whiteSpace: "pre-line",
            }}
          >
            {right}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
