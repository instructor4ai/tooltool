import { interpolate, spring, useCurrentFrame } from "remotion";
import { MotionBackdrop } from "./AmbientLayers";
import { SceneFrame, getScenePalette } from "./SceneFrame";
import type { TitleSlide } from "../types";

export const TitleScene = ({ title, subtitle, tone }: TitleSlide) => {
  const frame = useCurrentFrame();
  const palette = getScenePalette(tone);
  const scale = interpolate(
    spring({
      fps: 30,
      frame,
      config: {
        damping: 100,
        stiffness: 120,
      },
    }),
    [0, 1],
    [0.94, 1],
  );

  return (
    <SceneFrame
      tone={tone}
      label="Manifesto for builders"
      backdrop={<MotionBackdrop tone={tone} variant="title" />}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 1280,
          transform: `scale(${scale})`,
          transformOrigin: "left center",
        }}
      >
        <div
          style={{
            fontSize: 154,
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 38,
              fontSize: 38,
              lineHeight: 1.45,
              fontWeight: 500,
              color: palette.muted,
              whiteSpace: "pre-line",
              maxWidth: 920,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
