import { AbsoluteFill, Sequence } from "remotion";
import { EndingStatementScene } from "./scenes/EndingStatementScene";
import { QuoteScene } from "./scenes/QuoteScene";
import { QrThanksScene } from "./scenes/QrThanksScene";
import { slides } from "./slides";
import { StatementScene } from "./scenes/StatementScene";
import { TitleScene } from "./scenes/TitleScene";
import { ToolScene } from "./scenes/ToolScene";
import { ContrastScene } from "./scenes/ContrastScene";
import type { Slide } from "./types";

export const renderSlide = (slide: Slide) => {
  switch (slide.type) {
    case "title":
      return <TitleScene {...slide} />;
    case "statement":
      return <StatementScene {...slide} />;
    case "contrast":
      return <ContrastScene {...slide} />;
    case "quote":
      return <QuoteScene {...slide} />;
    case "tool":
      return <ToolScene {...slide} />;
    case "ending":
      return <EndingStatementScene {...slide} />;
    case "qr":
      return <QrThanksScene {...slide} />;
    default:
      return null;
  }
};

export const SlidePreview = ({ slideId }: { slideId: string }) => {
  const slide = slides.find((item) => item.id === slideId) ?? slides[0];

  return <AbsoluteFill>{renderSlide(slide)}</AbsoluteFill>;
};

export const TOTAL_DURATION_IN_FRAMES = slides.reduce(
  (sum, slide) => sum + slide.durationInFrames,
  0,
);

export const ToolToolPresentation = () => {
  let from = 0;

  return (
    <AbsoluteFill>
      {slides.map((slide) => {
        const sequenceFrom = from;
        from += slide.durationInFrames;

        return (
          <Sequence
            key={slide.id}
            from={sequenceFrom}
            durationInFrames={slide.durationInFrames}
          >
            {renderSlide(slide)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
