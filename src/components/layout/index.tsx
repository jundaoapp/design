import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { combineProps } from "@solid-primitives/props";
import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import LayoutContent from "./content";
import LayoutFooter from "./footer";
import { LayoutContextProvider, useLayoutContext } from "./context";
import { createSignal, Show } from "solid-js";
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
		<LayoutContextProvider value={undefined}>
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

	const [swipeStart, setSwipeStart] = createSignal({ x: 0, y: 0 });
	const [leftSidebarOffset, setLeftSidebarOffset] = createSignal(0);
	const [rightSidebarOffset, setRightSidebarOffset] = createSignal(0);
	const [sidebarTransition, setSidebarTransition] = createSignal("");
	const [leftSidebarOpen, setLeftSidebarOpen] = createSignal(false);
	const [rightSidebarOpen, setRightSidebarOpen] = createSignal(false);

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
				"--jdd-sidebar-transition": sidebarTransition(),
			};
		},
	});

	const context = useLayoutContext();

	const [getContent] = context.content;
	const [getSidebarLeft] = context.sidebarLeft;
	const [getSidebarRight] = context.sidebarRight;

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
				<WindowEventListener
					onTouchstart={(e) =>
						setSwipeStart({
							x: e.touches[0].clientX,
							y: e.touches[0].clientY,
						})
					}
					onTouchmove={(e) => {
						const swipeEnd = {
							x: e.touches[0].clientX,
							y: e.touches[0].clientY,
						};

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

						if (swipeDirection === "right") {
							setLeftSidebarOffset(swipeDiff.x);
						} else {
							setRightSidebarOffset(swipeDiff.x);
						}
					}}
					onTouchend={() => {
						setSidebarTransition(
							"transform 0.3s var(--jdd-transition-function)",
						);
						setTimeout(() => {
							setSidebarTransition("");
						}, 300);

						console.log(leftSidebarOffset(), rightSidebarOffset());

						if (leftSidebarOffset() > 75) {
							setLeftSidebarOpen(true);
						}

						if (rightSidebarOffset() > 75) {
							setRightSidebarOpen(true);
						}

						setTimeout(() => {
							setLeftSidebarOffset(0);
							setRightSidebarOffset(0);
						});
					}}
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
