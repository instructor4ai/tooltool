import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import {
	SlidePreview,
	TOTAL_DURATION_IN_FRAMES,
	ToolToolPresentation,
} from "./Composition";
import { getSlideNavLabel, slides } from "./slides";

type ViewMode = "slide" | "flow";

export const DeckApp = () => {
	const [selectedSlideId, setSelectedSlideId] = useState(slides[0].id);
	const [viewMode, setViewMode] = useState<ViewMode>("slide");
	const [shouldAutoplaySlide, setShouldAutoplaySlide] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const slidePlayerRef = useRef<PlayerRef | null>(null);
	const flowPlayerRef = useRef<PlayerRef | null>(null);
	const playerFrameRef = useRef<HTMLDivElement | null>(null);

	const selectedSlide =
		slides.find((slide) => slide.id === selectedSlideId) ?? slides[0];

	const activePlayerRef =
		viewMode === "slide" ? slidePlayerRef : flowPlayerRef;

	useEffect(() => {
		const onFullscreenChange = () => {
			setIsFullscreen(document.fullscreenElement === playerFrameRef.current);
		};

		document.addEventListener("fullscreenchange", onFullscreenChange);
		return () =>
			document.removeEventListener("fullscreenchange", onFullscreenChange);
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement | null;
			const isTypingTarget =
				target instanceof HTMLInputElement ||
				target instanceof HTMLSelectElement ||
				target instanceof HTMLTextAreaElement ||
				target?.isContentEditable === true;

			if (isTypingTarget) {
				return;
			}

			if (event.key === " " || event.code === "Space") {
				event.preventDefault();
				activePlayerRef.current?.toggle();
				return;
			}

			if (event.key.toLowerCase() === "f" || event.key === "ㄹ") {
				event.preventDefault();
				const playerFrame = playerFrameRef.current;
				if (!playerFrame) {
					return;
				}

				if (document.fullscreenElement === playerFrame) {
					void document.exitFullscreen();
				} else {
					void playerFrame.requestFullscreen();
				}
				return;
			}

			if (viewMode !== "slide") {
				return;
			}

			const currentIndex = slides.findIndex((slide) => slide.id === selectedSlideId);
			if (event.key === "ArrowRight" || event.key === "PageDown") {
				event.preventDefault();
				const nextSlideId =
					slides[Math.min(currentIndex + 1, slides.length - 1)].id;
				setShouldAutoplaySlide(true);
				setSelectedSlideId(nextSlideId);
				return;
			}

			if (event.key === "ArrowLeft" || event.key === "PageUp") {
				event.preventDefault();
				const previousSlideId = slides[Math.max(currentIndex - 1, 0)].id;
				setShouldAutoplaySlide(true);
				setSelectedSlideId(previousSlideId);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [activePlayerRef, selectedSlideId, viewMode]);

	useEffect(() => {
		if (viewMode !== "slide" || !shouldAutoplaySlide) {
			return;
		}

		const rafId = window.requestAnimationFrame(() => {
			slidePlayerRef.current?.seekTo(0);
			slidePlayerRef.current?.play();
			setShouldAutoplaySlide(false);
		});

		return () => window.cancelAnimationFrame(rafId);
	}, [selectedSlideId, shouldAutoplaySlide, viewMode]);

	const slideIndex = useMemo(
		() => slides.findIndex((slide) => slide.id === selectedSlideId),
		[selectedSlideId],
	);

	const onSlideSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		setShouldAutoplaySlide(false);
		setSelectedSlideId(event.target.value);
	};

	return (
		<div className="deck-shell">
			<aside className="deck-sidebar">
				<div>
					<p className="deck-eyebrow">툴툴거리자</p>
				</div>

				<div className="deck-mode-switch">
					<button
						className={viewMode === "slide" ? "is-active" : ""}
						onClick={() => setViewMode("slide")}
						type="button"
					>
						슬라이드 모드
					</button>
					<button
						className={viewMode === "flow" ? "is-active" : ""}
						onClick={() => setViewMode("flow")}
						type="button"
					>
						플로우 모드
					</button>
				</div>

				<div className="deck-field">
					<label htmlFor="slide-select">현재 장면</label>
					<select
						id="slide-select"
						value={selectedSlideId}
						onChange={onSlideSelect}
					>
						{slides.map((slide, index) => (
							<option key={slide.id} value={slide.id}>
								{index + 1}. {getSlideNavLabel(slide)}
							</option>
						))}
					</select>
				</div>

				<div className="deck-stats">
					<div>
						<span>총 장면</span>
						<strong>{slides.length}</strong>
					</div>
					<div>
						<span>현재 위치</span>
						<strong>
							{slideIndex + 1}/{slides.length}
						</strong>
					</div>
				</div>

				<div className="deck-list">
					{slides.map((slide, index) => (
						<button
							key={slide.id}
							type="button"
							className={slide.id === selectedSlideId ? "is-selected" : ""}
							onClick={() => {
								setViewMode("slide");
								setShouldAutoplaySlide(false);
								setSelectedSlideId(slide.id);
							}}
						>
							<span>{String(index + 1).padStart(2, "0")}</span>
							<strong>{getSlideNavLabel(slide)}</strong>
						</button>
					))}
				</div>
			</aside>

			<main className="deck-main">
				<div className="deck-topbar">
					<div>
						<p>{viewMode === "slide" ? "선택 장면 재생" : "전체 흐름 재생"}</p>
						<h2>
							{viewMode === "slide"
								? getSlideNavLabel(selectedSlide)
								: "Tool Tool 거리자! 전체 발표"}
						</h2>
					</div>
					<div className="deck-tip">
						{viewMode === "slide"
							? "Space 재생, F/ㄹ 전체화면, 좌우 이동 시 자동재생"
							: "Space 재생, F/ㄹ 전체화면"}
					</div>
				</div>

				<div className="deck-player-frame" ref={playerFrameRef}>
					{viewMode === "slide" ? (
						<Player
							ref={slidePlayerRef}
							component={SlidePreview}
							inputProps={{ slideId: selectedSlideId }}
							durationInFrames={selectedSlide.durationInFrames}
							fps={30}
							compositionWidth={1920}
							compositionHeight={1080}
							controls={!isFullscreen}
							autoPlay={false}
							moveToBeginningWhenEnded={false}
							style={{ width: "100%", aspectRatio: "16 / 9" }}
						/>
					) : (
						<Player
							ref={flowPlayerRef}
							component={ToolToolPresentation}
							durationInFrames={TOTAL_DURATION_IN_FRAMES}
							fps={30}
							compositionWidth={1920}
							compositionHeight={1080}
							controls={!isFullscreen}
							autoPlay={false}
							moveToBeginningWhenEnded={false}
							style={{ width: "100%", aspectRatio: "16 / 9" }}
						/>
					)}
				</div>
			</main>
		</div>
	);
};
