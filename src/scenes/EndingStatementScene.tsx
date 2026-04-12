import { EmojiAccent } from "./AmbientLayers";
import { SceneFrame, getScenePalette } from "./SceneFrame";
import type { EndingSlide } from "../types";

export const EndingStatementScene = ({
  title,
  subtitle,
  tone,
}: EndingSlide) => {
  const palette = getScenePalette(tone);

  return (
    <SceneFrame
      tone={tone}
      label="Final point"
      backdrop={<EmojiAccent tone={tone} kind="ending" />}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 1340,
        }}
      >
        <div
          style={{
            fontSize: 114,
            lineHeight: 1.06,
            fontWeight: 820,
            letterSpacing: "-0.06em",
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 42,
            fontSize: 40,
            lineHeight: 1.45,
            fontWeight: 580,
            color: palette.muted,
            whiteSpace: "pre-line",
            maxWidth: 960,
          }}
        >
          {subtitle}
        </div>
      </div>
    </SceneFrame>
  );
};
