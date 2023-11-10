import { Dialog } from "@kobalte/core";
import { createDraggable } from "@neodrag/solid";
import { combineProps } from "@solid-primitives/props";
import { RiSystemCloseFill } from "solid-icons/ri";
import { JSXElement, Show, createMemo, createSignal } from "solid-js";
import { Card, Text } from "..";
import "../title/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { useOverlayContext } from "../utilities/overlay";
import "./index.scss";

export type DrawerProps = IntrinsicComponentProps<
	"div",
	{
		title?: JSXElement;
		position?: "top" | "right" | "bottom" | "left";
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		footer?: JSXElement;
		level?: number;
	} & Dialog.DialogContentProps
>;

export function Drawer(props: DrawerProps) {
	const [local, others] = processProps({
		props,
		default: {
			position: "right",
		},
		keys: [
			"open",
			"onOpenChange",
			"children",
			"title",
			"footer",
			"ref",
			"level",
			"position",
		],
	});

	const { draggable } = createDraggable();

	const [OverlayContextProvider, context] = useOverlayContext();

	const level = local.level !== undefined ? local.level : context.level;

	const children = createMemo(() => local.children);

	const combinedProps = combineProps(others, {
		class: `jdd drawer ${local.position}`,
	});

	const [position, setPosition] = createSignal({ x: 0, y: 0 });
	let handleRef!: HTMLDivElement;
	let closeRef!: HTMLButtonElement;

	return (
		<OverlayContextProvider value={{ level: level + 1 }}>
			<Dialog.Root
				modal={true}
				open={local.open}
				onOpenChange={local.onOpenChange}
			>
				<Dialog.Portal>
					<div
						class="jdd drawer-wrapper"
						style={{ "--jdd-overlay-zindex-increment": level }}
					>
						<Dialog.Overlay class="jdd drawer-overlay" />
						<div
							use:draggable={{
								axis: "y",
								handle: handleRef,
								position: position(),
								onDrag: ({ offsetX, offsetY }) =>
									setPosition({ x: offsetX, y: offsetY }),
								transform: ({ offsetY }) =>
									`translate3d(0, ${customOffset(offsetY)}px, 0)`,
								onDragEnd: ({ currentNode }) => {
									if (
										position().y > 100 ||
										(handleRef.parentElement &&
											position().y > handleRef.parentElement.offsetHeight / 4)
									) {
										closeRef.click();
										setTimeout(() => {
											setPosition({ x: 0, y: 0 });
										}, 500);
										return;
									}

									setPosition({ x: 0, y: 0 });
									currentNode.style.transition =
										"transform 0.3s var(--jdd-transition-function)";
									setTimeout(() => {
										currentNode.style.transform = "translate3d(0, 0, 0)";
									});
									setTimeout(() => {
										currentNode.style.transition = "";
									}, 300);
								},
							}}
							class="drawer-drag"
						>
							<Dialog.Content {...combinedProps}>
								<Card>
									<Show when={local.position === "bottom"}>
										<div class="drawer-handle" ref={handleRef} />
									</Show>
									<div class="drawer-header">
										<Show when={local.title} fallback={<div />} keyed>
											{(title) => (
												<Dialog.Title class="jdd title jdd-typography">
													{title}
												</Dialog.Title>
											)}
										</Show>

										<Dialog.CloseButton class="jdd drawer-close" ref={closeRef}>
											<RiSystemCloseFill />
										</Dialog.CloseButton>
									</div>
									<Dialog.Description class="drawer-description">
										<div>
											<Show
												when={typeof children() === "string"}
												fallback={children()}
											>
												<Text>{children()}</Text>
											</Show>
										</div>

										<Show when={local.footer} keyed>
											{(footer) => <div class="drawer-footer">{footer}</div>}
										</Show>
									</Dialog.Description>
								</Card>
							</Dialog.Content>
						</div>
					</div>
				</Dialog.Portal>
			</Dialog.Root>
		</OverlayContextProvider>
	);
}

function customOffset(offsetY: number): number {
	if (offsetY >= 0) return offsetY;
	return -(4 * Math.sqrt(Math.abs(offsetY)));
}
