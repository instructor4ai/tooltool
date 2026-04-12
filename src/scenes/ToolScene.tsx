import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { SceneFrame, getScenePalette } from "./SceneFrame";
import type { ToolSlide } from "../types";

const sectionLabelStyle = {
	fontSize: 22,
	letterSpacing: "0.08em",
	textTransform: "uppercase" as const,
	fontWeight: 650,
	marginBottom: 8,
};

const sectionBodyStyle = {
	fontSize: 32,
	lineHeight: 1.2,
	fontWeight: 600,
	letterSpacing: "-0.03em",
	whiteSpace: "pre-line" as const,
};

export const ToolScene = ({
	index,
	tool,
	url,
	screenshot,
	useFor,
	why,
	tone,
}: ToolSlide) => {
	const frame = useCurrentFrame();
	const palette = getScenePalette(tone);
	const reveal = spring({
		fps: 30,
		frame,
		config: {
			damping: 170,
			stiffness: 120,
		},
	});

	const toolScale = interpolate(reveal, [0, 1], [0.98, 1]);
	const urlOpacity = interpolate(reveal, [0, 1], [0, 1]);

	return (
		<SceneFrame tone={tone} label={`내가 요즘 애용하는 도구 #${index}`}>
			<div
				style={{
					display: "flex",
					flex: 1,
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div>
					<div
						style={{
							fontSize: 99,
							lineHeight: 0.98,
							fontWeight: 820,
							letterSpacing: "-0.07em",
							transform: `scale(${toolScale})`,
							transformOrigin: "left center",
							maxWidth: 1320,
						}}
					>
						{tool}
					</div>
					<div
						style={{
							marginTop: 18,
							fontSize: 28,
							fontWeight: 500,
							letterSpacing: "-0.01em",
							color: palette.muted,
							opacity: urlOpacity,
						}}
					>
						{url}
					</div>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Img
						src={staticFile(screenshot)}
						alt={`${tool} screenshot`}
						style={{
							height: 531,
							maxWidth: "100%",
							objectFit: "contain",
							boxShadow:
								tone === "dark"
									? "0 28px 70px rgba(0, 0, 0, 0.38)"
									: "0 24px 64px rgba(15, 23, 42, 0.16)",
						}}
					/>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 44,
						alignItems: "start",
					}}
				>
					<div
						style={{
							paddingTop: 12,
						}}
					>
						<div style={{ ...sectionLabelStyle, color: palette.accent }}>
							어디에 쓰나
						</div>
						<div
							style={sectionBodyStyle}
						>
							{useFor}
						</div>
					</div>

					<div
						style={{
							paddingTop: 12,
						}}
					>
						<div style={{ ...sectionLabelStyle, color: palette.accent }}>
							왜 쓰나
						</div>
						<div
							style={sectionBodyStyle}
						>
							{why}
						</div>
					</div>
				</div>
			</div>
		</SceneFrame>
	);
};
