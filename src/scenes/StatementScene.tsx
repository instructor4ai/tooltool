import { interpolate, spring, useCurrentFrame } from "remotion";
import { EmojiAccent } from "./AmbientLayers";
import { SceneFrame, getScenePalette } from "./SceneFrame";
import type { StatementSlide } from "../types";

const emojiBySlideId: Record<
  string,
  Parameters<typeof EmojiAccent>[0]["kind"]
> = {
  "need-vs-convenience": "priority",
  "tool-is-not-the-goal": "tool",
  "steep-learning-curve": "learning",
  "essence-hidden": "essence",
  "good-tools-from-need": "need",
  "need-or-opportunity": "opportunity",
  naming: "naming",
};

export const StatementScene = ({
  id,
  title,
  subtitle,
  tone,
}: StatementSlide) => {
  const frame = useCurrentFrame();
  const palette = getScenePalette(tone);
  const emphasis = interpolate(
    spring({
      fps: 30,
      frame,
      config: {
        damping: 140,
        stiffness: 110,
      },
    }),
    [0, 1],
    [24, 0],
  );

  return (
    <SceneFrame
      tone={tone}
      backdrop={<EmojiAccent tone={tone} kind={emojiBySlideId[id]} />}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 1320,
        }}
      >
        <div
          style={{
            fontSize: 112,
            lineHeight: 1.08,
            fontWeight: 780,
            letterSpacing: "-0.055em",
            transform: `translateX(${emphasis}px)`,
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 34,
              fontSize: 34,
              lineHeight: 1.5,
              fontWeight: 500,
              color: palette.muted,
              maxWidth: 860,
              whiteSpace: "pre-line",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </SceneFrame>
  );
};
