import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SceneFrame } from "./SceneFrame";
import type { QrSlide } from "../types";

const QR_SIZE = 430;
const TEXT_WIDTH = QR_SIZE * 2;

const AbstractQrBackdrop = () => {
  const frame = useCurrentFrame();
  const slow = Math.sin(frame / 70);
  const medium = Math.sin(frame / 46);
  const sweep = interpolate(Math.sin(frame / 90), [-1, 1], [-18, 18]);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #020617 0%, #080b16 44%, #111827 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -260,
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.16), transparent 0 10%, rgba(249,115,22,0.18) 11%, transparent 28%), radial-gradient(circle at 24% 76%, rgba(14,165,233,0.2), transparent 30%), radial-gradient(circle at 82% 18%, rgba(236,72,153,0.18), transparent 32%)",
          filter: "blur(44px)",
          opacity: 0.82,
          transform: `translate(${slow * 34}px, ${medium * 26}px) rotate(${sweep}deg) scale(1.08)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -160,
          right: -160,
          top: "42%",
          height: 310,
          background:
            "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.08) 28%, rgba(249,115,22,0.16) 48%, rgba(56,189,248,0.1) 66%, transparent 100%)",
          filter: "blur(38px)",
          opacity: 0.7,
          transform: `translateY(${Math.sin(frame / 58) * 44}px) rotate(-8deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(2,6,23,0.18) 42%, rgba(2,6,23,0.82) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const QrThanksScene = ({ image, thanks, qa, tone }: QrSlide) => {
  const frame = useCurrentFrame();
  const qrReveal = spring({
    fps: 30,
    frame,
    config: {
      damping: 120,
      stiffness: 110,
    },
  });
  const thanksReveal = spring({
    fps: 30,
    frame: frame - 22,
    config: {
      damping: 140,
      stiffness: 120,
    },
  });
  const qaReveal = spring({
    fps: 30,
    frame: frame - 42,
    config: {
      damping: 150,
      stiffness: 115,
    },
  });
  const qrScale = interpolate(qrReveal, [0, 1], [0.88, 1]);
  const qrOpacity = interpolate(qrReveal, [0, 1], [0, 1]);
  const thanksY = interpolate(thanksReveal, [0, 1], [32, 0]);
  const qaY = interpolate(qaReveal, [0, 1], [28, 0]);

  return (
    <SceneFrame tone={tone} backdrop={<AbstractQrBackdrop />}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          width: TEXT_WIDTH,
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Img
          src={staticFile(image)}
          alt="Tool Tool QR code"
          style={{
            width: QR_SIZE,
            height: QR_SIZE,
            objectFit: "contain",
            opacity: qrOpacity,
            transform: `scale(${qrScale})`,
            boxShadow:
              tone === "dark"
                ? "0 32px 80px rgba(0, 0, 0, 0.42)"
                : "0 28px 70px rgba(15, 23, 42, 0.18)",
          }}
        />
        <div
          style={{
            width: TEXT_WIDTH,
            marginTop: 36,
            fontSize: 112,
            lineHeight: 1,
            fontWeight: 820,
            letterSpacing: "-0.06em",
            color: "#fed7aa",
            opacity: interpolate(thanksReveal, [0, 1], [0, 1]),
            transform: `translateY(${thanksY}px)`,
          }}
        >
          {thanks}
        </div>
        <div
          style={{
            width: TEXT_WIDTH,
            marginTop: 18,
            fontSize: 56,
            lineHeight: 1,
            fontWeight: 760,
            letterSpacing: "-0.02em",
            color: "#67e8f9",
            opacity: interpolate(qaReveal, [0, 1], [0, 1]),
            transform: `translateY(${qaY}px)`,
          }}
        >
          {qa}
        </div>
      </div>
    </SceneFrame>
  );
};
