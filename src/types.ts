export type Tone = "dark" | "light";

type BaseSlide = {
  id: string;
  durationInFrames: number;
  tone: Tone;
};

export type TitleSlide = BaseSlide & {
  type: "title";
  title: string;
  subtitle?: string;
};

export type StatementSlide = BaseSlide & {
  type: "statement";
  title: string;
  subtitle?: string;
};

export type ContrastSlide = BaseSlide & {
  type: "contrast";
  left: string;
  right: string;
};

export type QuoteSlide = BaseSlide & {
  type: "quote";
  text: string;
};

export type ToolSlide = BaseSlide & {
  type: "tool";
  index: number;
  tool: string;
  url: string;
  screenshot: string;
  useFor: string;
  why: string;
  extra?: string;
};

export type EndingSlide = BaseSlide & {
  type: "ending";
  title: string;
  subtitle: string;
};

export type QrSlide = BaseSlide & {
  type: "qr";
  image: string;
  thanks: string;
  qa: string;
};

export type Slide =
  | TitleSlide
  | StatementSlide
  | ContrastSlide
  | QuoteSlide
  | ToolSlide
  | EndingSlide
  | QrSlide;
