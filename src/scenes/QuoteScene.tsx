import { interpolate, spring, useCurrentFrame } from "remotion";
import { MotionBackdrop } from "./AmbientLayers";
import { SceneFrame, getScenePalette } from "./SceneFrame";
import type { QuoteSlide } from "../types";

export const QuoteScene = ({ text, tone }: QuoteSlide) => {
  const frame = useCurrentFrame();
  const palette = getScenePalette(tone);
  const reveal = spring({
    fps: 30,
    frame,
    config: {
      damping: 140,
      stiffness: 125,
    },
  });

  return (
    <SceneFrame
      tone={tone}
      backdrop={<MotionBackdrop tone={tone} variant="quote" />}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1260,
            transform: `scale(${interpolate(reveal, [0, 1], [0.96, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: palette.muted,
              marginBottom: 34,
            }}
          >
            One sentence to remember
          </div>
          <div
            style={{
              fontSize: 94,
              lineHeight: 1.18,
              fontWeight: 760,
              letterSpacing: "-0.052em",
              whiteSpace: "pre-line",
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
