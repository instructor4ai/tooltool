import "./index.css";
import { Composition } from "remotion";
import {
	TOTAL_DURATION_IN_FRAMES,
	ToolToolPresentation,
} from "./Composition";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="ToolToolPresentation"
				component={ToolToolPresentation}
				durationInFrames={TOTAL_DURATION_IN_FRAMES}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
