import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { combineProps } from "@solid-primitives/props";
import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import LayoutContent from "./content";
import LayoutFooter from "./footer";
import { LayoutContextProvider, useLayoutContext } from "./context";
import { createEffect, createSignal, Show } from "solid-js";
import { createBreakpoints } from "@solid-primitives/media";
import { WindowEventListener } from "@solid-primitives/event-listener";

export type LayoutProps = IntrinsicComponentProps<
	"div",
	{
		mobileWidthBreakpoint?: string;
	}
>;

function Layout(props: LayoutProps) {
	return (
		<LayoutContextProvider>
			<InnerLayout {...props} />
		</LayoutContextProvider>
	);
}

function InnerLayout(props: LayoutProps) {
	const [local, others] = processProps({
		props,
		default: {
			mobileWidthBreakpoint: "600px",
		},
		keys: ["children", "mobileWidthBreakpoint"],
	});

	const breakpoints = createBreakpoints({
		desktop: local.mobileWidthBreakpoint,
	});

	let ref!: HTMLDivElement;

	const context = useLayoutContext();

	const [getContent] = context.content;
	const [getSidebarLeft] = context.sidebarLeft;
	const [getSidebarRight] = context.sidebarRight;
	const [leftSidebarOpen, setLeftSidebarOpen] = context.sidebarLeftOpen;
	const [rightSidebarOpen, setRightSidebarOpen] = context.sidebarRightOpen;

	const [swipeStart, setSwipeStart] = createSignal({ x: 0, y: 0 });
	const [leftSidebarOffset, setLeftSidebarOffset] = createSignal(0);
	const [rightSidebarOffset, setRightSidebarOffset] = createSignal(0);
	const [sidebarTransition, setSidebarTransition] = createSignal(false);

	createEffect(() => {
		setSidebarTransition(true);

		setTimeout(() => {
			setSidebarTransition(false);
		}, 300);

		if (leftSidebarOpen() || rightSidebarOpen())
			document.body.classList.add("jdd-sidebar-open");
		else document.body.classList.remove("jdd-sidebar-open");
	});

	const combinedProps = combineProps(others, {
		ref: (el) => (ref = el),
		class: "jdd layout",
		get classList() {
			return {
				mobile: !breakpoints.desktop,
				"open-left": leftSidebarOpen(),
				"open-right": rightSidebarOpen(),
			};
		},
		get style() {
			return {
				"--jdd-left-sidebar-offset": `${leftSidebarOffset()}px`,
				"--jdd-right-sidebar-offset": `${rightSidebarOffset()}px`,
				"--jdd-sidebar-transition": sidebarTransition()
					? "transform 0.3s var(--jdd-transition-function), opacity 0.3s var(--jdd-transition-function)"
					: "",
				get ["--jdd-layout-backdrop-opacity"]() {
					if (leftSidebarOpen() || rightSidebarOpen()) {
						return "";
					}

					const leftSidebar = ref.querySelector(
						".layout-sidebar:first-child",
					) as HTMLElement | null;
					if (leftSidebar && leftSidebarOffset() > 0) {
						return leftSidebarOffset() / leftSidebar.offsetWidth;
					}

					const rightSidebar = ref.querySelector(
						".layout-sidebar:last-child",
					) as HTMLElement | null;
					if (rightSidebar && rightSidebarOffset() > 0) {
						return rightSidebarOffset() / rightSidebar.offsetWidth;
					}

					return "";
				},
			};
		},
	});

	const toucheMoveHandler = (e: TouchEvent) => {
		const swipeEnd = {
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
		};

		if (leftSidebarOpen() || rightSidebarOpen()) {
			const swipeDiff = {
				x: Math.abs(swipeEnd.x - swipeStart().x),
				y: Math.abs(swipeEnd.y - swipeStart().y),
			};

			if (swipeDiff.x < swipeDiff.y * 2) return;

			if (leftSidebarOpen() && swipeEnd.x < swipeStart().x) {
				setLeftSidebarOffset(swipeDiff.x);
				return;
			}

			if (rightSidebarOpen() && swipeEnd.x > swipeStart().x) {
				setRightSidebarOffset(swipeDiff.x);
				return;
			}
			return;
		}

		let swipeDirection: "left" | "right" | undefined;

		// Left swipe
		if (swipeStart().x < 50) {
			swipeDirection = "right";
		}

		// Right swipe
		if (window.innerWidth - swipeStart().x < 50) {
			swipeDirection = "left";
		}

		if (swipeDirection === undefined) return;

		const swipeDiff = {
			x: Math.abs(swipeEnd.x - swipeStart().x),
			y: Math.abs(swipeEnd.y - swipeStart().y),
		};

		// Threshold swipe orientation
		if (swipeDiff.x < swipeDiff.y * 2) return;

		document.body.style.touchAction = "none";
		document.body.style.userSelect = "none";
		document.body.style.overflowY = "hidden";

		if (swipeDirection === "right") {
			if (!rightSidebarOpen()) setLeftSidebarOffset(swipeDiff.x);
		} else {
			if (!leftSidebarOpen()) setRightSidebarOffset(swipeDiff.x);
		}
	};

	const touchEndHandler = () => {
		if (leftSidebarOffset() + rightSidebarOffset() > 0) {
			setSidebarTransition(true);
		}

		setTimeout(() => {
			setLeftSidebarOffset(0);
			setRightSidebarOffset(0);
		});

		setTimeout(() => {
			setSidebarTransition(false);
			document.body.style.touchAction = "";
			document.body.style.userSelect = "";
			document.body.style.overflowY = "";
		}, 300);

		if (leftSidebarOpen() && leftSidebarOffset() > 75) {
			setLeftSidebarOpen(false);
			return;
		}

		if (rightSidebarOpen() && rightSidebarOffset() > 75) {
			setRightSidebarOpen(false);
			return;
		}

		if (!rightSidebarOpen() && leftSidebarOffset() > 75) {
			setLeftSidebarOpen(true);
		}

		if (!leftSidebarOpen() && rightSidebarOffset() > 75) {
			setRightSidebarOpen(true);
		}
	};

	return (
		<div {...combinedProps}>
			{local.children}
			<div class="layout-main">
				<Show when={getSidebarLeft()} keyed>
					{(sidebarLeft) => sidebarLeft}
				</Show>
				<Show when={getContent()} keyed>
					{(content) => content}
				</Show>
				<Show when={getSidebarRight()} keyed>
					{(sidebarRight) => sidebarRight}
				</Show>
			</div>

			<Show when={!breakpoints.desktop}>
				<div
					class="layout-backdrop"
					onclick={() => {
						setLeftSidebarOpen(false);
						setRightSidebarOpen(false);
					}}
				/>

				<WindowEventListener
					onTouchstart={(e) =>
						setSwipeStart({
							x: e.touches[0].clientX,
							y: e.touches[0].clientY,
						})
					}
					onTouchmove={toucheMoveHandler}
					onTouchend={touchEndHandler}
				/>
			</Show>
		</div>
	);
}

const CompoundedLayout = Layout as typeof Layout & {
	Header: typeof LayoutHeader;
	Sidebar: typeof LayoutSidebar;
	Content: typeof LayoutContent;
	Footer: typeof LayoutFooter;
};
CompoundedLayout.Header = LayoutHeader;
CompoundedLayout.Sidebar = LayoutSidebar;
CompoundedLayout.Content = LayoutContent;
CompoundedLayout.Footer = LayoutFooter;
export { CompoundedLayout as Layout };
export { useLayoutContext };
