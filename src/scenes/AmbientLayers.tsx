import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { getScenePalette } from "./SceneFrame";
import type { Tone } from "../types";

type EmojiPlacement = {
  emoji: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  rotate: number;
  drift: number;
  slide: number;
  swing: number;
  opacity: number;
};

const emojiLayouts: Record<string, EmojiPlacement[]> = {
  priority: [
    {
      emoji: "⚖️",
      left: 82,
      top: 19,
      size: 212,
      delay: 2,
      rotate: -12,
      drift: 24,
      slide: 58,
      swing: 5,
      opacity: 0.4,
    },
    {
      emoji: "🧭",
      left: 61,
      top: 82,
      size: 78,
      delay: 12,
      rotate: 14,
      drift: 44,
      slide: -36,
      swing: 12,
      opacity: 0.34,
    },
    {
      emoji: "✳️",
      left: 96,
      top: 67,
      size: 132,
      delay: 18,
      rotate: -20,
      drift: 28,
      slide: 70,
      swing: 18,
      opacity: 0.32,
    },
  ],
  tool: [
    {
      emoji: "🪏",
      left: 92,
      top: 76,
      size: 372,
      delay: 3,
      rotate: 22,
      drift: 40,
      slide: 112,
      swing: 12,
      opacity: 0.54,
    },
    {
      emoji: "❓",
      left: 67,
      top: 18,
      size: 142,
      delay: 14,
      rotate: -10,
      drift: 52,
      slide: -48,
      swing: 20,
      opacity: 0.44,
    },
    {
      emoji: "🚜",
      left: 11,
      top: 83,
      size: 304,
      delay: 20,
      rotate: -10,
      drift: 36,
      slide: -118,
      swing: 14,
      opacity: 0.52,
    },
  ],
  learning: [
    {
      emoji: "📈",
      left: 88,
      top: 20,
      size: 372,
      delay: 3,
      rotate: 8,
      drift: 34,
      slide: 118,
      swing: 10,
      opacity: 0.56,
    },
    {
      emoji: "⚙️⚙️⚙️",
      left: 74,
      top: 80,
      size: 176,
      delay: 10,
      rotate: -14,
      drift: 54,
      slide: -82,
      swing: 24,
      opacity: 0.5,
    },
    {
      emoji: "🏭",
      left: 101,
      top: 66,
      size: 286,
      delay: 18,
      rotate: 12,
      drift: 44,
      slide: 132,
      swing: 18,
      opacity: 0.44,
    },
  ],
  essence: [
    {
      emoji: "🔍",
      left: 91,
      top: 26,
      size: 232,
      delay: 2,
      rotate: 10,
      drift: 30,
      slide: 94,
      swing: 8,
      opacity: 0.35,
    },
    {
      emoji: "🧩",
      left: 65,
      top: 71,
      size: 122,
      delay: 12,
      rotate: -12,
      drift: 42,
      slide: -56,
      swing: 18,
      opacity: 0.34,
    },
    {
      emoji: "💭",
      left: 23,
      top: 88,
      size: 86,
      delay: 18,
      rotate: 8,
      drift: 60,
      slide: -62,
      swing: 12,
      opacity: 0.28,
    },
  ],
  need: [
    {
      emoji: "🍳",
      left: 90,
      top: 72,
      size: 238,
      delay: 2,
      rotate: -12,
      drift: 22,
      slide: 92,
      swing: 6,
      opacity: 0.38,
    },
    {
      emoji: "↗️",
      left: 69,
      top: 19,
      size: 104,
      delay: 12,
      rotate: 12,
      drift: 54,
      slide: -46,
      swing: 20,
      opacity: 0.38,
    },
    {
      emoji: "💡",
      left: 18,
      top: 84,
      size: 136,
      delay: 18,
      rotate: -8,
      drift: 34,
      slide: -78,
      swing: 14,
      opacity: 0.32,
    },
  ],
  opportunity: [
    {
      emoji: "💸",
      left: 82,
      top: 16,
      size: 222,
      delay: 2,
      rotate: 12,
      drift: 38,
      slide: 84,
      swing: 10,
      opacity: 0.36,
    },
    {
      emoji: "🧰",
      left: 96,
      top: 78,
      size: 150,
      delay: 12,
      rotate: -10,
      drift: 28,
      slide: 76,
      swing: 11,
      opacity: 0.32,
    },
    {
      emoji: "✨",
      left: 63,
      top: 71,
      size: 76,
      delay: 18,
      rotate: 16,
      drift: 62,
      slide: -48,
      swing: 28,
      opacity: 0.44,
    },
  ],
  naming: [
    {
      emoji: "🏷️",
      left: 86,
      top: 24,
      size: 218,
      delay: 2,
      rotate: -8,
      drift: 24,
      slide: 88,
      swing: 6,
      opacity: 0.36,
    },
    {
      emoji: "✍️",
      left: 60,
      top: 81,
      size: 108,
      delay: 12,
      rotate: 14,
      drift: 48,
      slide: -52,
      swing: 18,
      opacity: 0.34,
    },
    {
      emoji: "🕳️",
      left: 101,
      top: 66,
      size: 156,
      delay: 18,
      rotate: -12,
      drift: 30,
      slide: 82,
      swing: 9,
      opacity: 0.28,
    },
  ],
  ending: [
    {
      emoji: "🧭",
      left: 84,
      top: 18,
      size: 234,
      delay: 2,
      rotate: -8,
      drift: 20,
      slide: 88,
      swing: 5,
      opacity: 0.36,
    },
    {
      emoji: "🛠️",
      left: 93,
      top: 76,
      size: 156,
      delay: 10,
      rotate: 12,
      drift: 38,
      slide: 72,
      swing: 13,
      opacity: 0.32,
    },
    {
      emoji: "✅",
      left: 64,
      top: 82,
      size: 86,
      delay: 18,
      rotate: -12,
      drift: 58,
      slide: -48,
      swing: 18,
      opacity: 0.34,
    },
  ],
};

export const EmojiAccent = ({
  tone,
  kind,
}: {
  tone: Tone;
  kind: keyof typeof emojiLayouts;
}) => {
  const frame = useCurrentFrame();
  const palette = getScenePalette(tone);
  const placements = emojiLayouts[kind];

  return (
    <AbsoluteFill>
      {placements.map((item) => {
        const appear = interpolate(frame - item.delay, [0, 24], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const drift = Math.sin((frame + item.delay * 3) / 24) * item.drift;
        const slide = interpolate(appear, [0, 1], [item.slide, 0]);
        const rotate =
          item.rotate + Math.sin(frame / 36 + item.delay) * item.swing;
        const pulse = 1 + Math.sin(frame / 30 + item.delay) * 0.035;

        return (
          <div
            key={`${kind}-${item.emoji}-${item.left}`}
            style={{
              position: "absolute",
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: item.size,
              lineHeight: 1,
              filter:
                tone === "dark"
                  ? "drop-shadow(0 22px 42px rgba(0,0,0,0.36))"
                  : "drop-shadow(0 18px 32px rgba(15,23,42,0.16))",
              opacity: appear * item.opacity * (tone === "dark" ? 1.28 : 1.34),
              transform: `translate(-50%, -50%) translate(${slide}px, ${drift}px) rotate(${rotate}deg) scale(${interpolate(appear, [0, 1], [0.42, pulse])})`,
            }}
          >
            {item.emoji}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          right: 116,
          bottom: 88,
          width: 360,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`,
          opacity: tone === "dark" ? 0.36 : 0.28,
          transform: `translateX(${Math.sin(frame / 26) * 26}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const MotionBackdrop = ({
  tone,
  variant = "rings",
}: {
  tone: Tone;
  variant?: "rings" | "questions" | "quote" | "title";
}) => {
  const frame = useCurrentFrame();
  const palette = getScenePalette(tone);
  const line =
    tone === "dark" ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.14)";
  const accent =
    tone === "dark" ? "rgba(249,115,22,0.32)" : "rgba(234,88,12,0.26)";
  const soft =
    tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: variant === "title" ? "74px 74px" : "96px 108px",
          border: `1px solid ${line}`,
          opacity: variant === "quote" ? 0.18 : 0.28,
          transform: `scale(${1 + Math.sin(frame / 46) * 0.012})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: variant === "questions" ? 94 : 138,
          top: variant === "quote" ? 150 : 188,
          width: variant === "quote" ? 520 : 430,
          height: variant === "quote" ? 520 : 430,
          borderRadius: "50%",
          border: `2px solid ${accent}`,
          opacity: 0.58,
          transform: `rotate(${frame * 0.16}deg) scale(${1 + Math.sin(frame / 34) * 0.035})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: variant === "questions" ? 210 : 248,
          top: variant === "quote" ? 270 : 310,
          width: variant === "quote" ? 300 : 260,
          height: variant === "quote" ? 300 : 260,
          borderRadius: "50%",
          border: `1px dashed ${line}`,
          opacity: 0.58,
          transform: `rotate(${-frame * 0.28}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: variant === "questions" ? 820 : 120,
          bottom: variant === "quote" ? 120 : 150,
          width: 620,
          height: 150,
          background: `repeating-linear-gradient(110deg, ${soft} 0 2px, transparent 2px 28px)`,
          opacity: variant === "quote" ? 0.42 : 0.56,
          transform: `translateX(${Math.sin(frame / 31) * 34}px) skewX(-10deg)`,
        }}
      />
      {variant === "questions" ? (
        <div
          style={{
            position: "absolute",
            left: 900,
            top: 138,
            fontSize: 210,
            lineHeight: 1,
            fontWeight: 850,
            color: palette.accent,
            opacity: 0.12,
            transform: `translateY(${Math.sin(frame / 24) * 18}px) rotate(${Math.sin(frame / 38) * 6}deg)`,
          }}
        >
          ?
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
