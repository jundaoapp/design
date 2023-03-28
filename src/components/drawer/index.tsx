import "./index.scss";
import "../title/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { createMemo, JSXElement, Show } from "solid-js";
import { useOverlayContext } from "../utilities/overlay";
import { Dialog } from "@kobalte/core";
import { Card, Icon, Text } from "..";
import { combineProps } from "@solid-primitives/props";

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

	const [OverlayContextProvider, context] = useOverlayContext();

	const level = local.level !== undefined ? local.level : context.level;

	const children = createMemo(() => local.children);

	const combinedProps = combineProps(others, {
		class: `jdd drawer ${local.position}`,
	});

	return (
		<OverlayContextProvider value={{ level: level + 1 }}>
			<Dialog.Root
				isModal={true}
				isOpen={local.open}
				onOpenChange={local.onOpenChange}
			>
				<Dialog.Portal>
					<div
						class="jdd drawer-wrapper"
						style={{ "--jdd-overlay-zindex-increment": level }}
					>
						<Dialog.Overlay class="jdd drawer-overlay" />
						<Dialog.Content {...combinedProps}>
							<Card>
								<div class="drawer-header">
									<Show when={local.title} fallback={<div />} keyed>
										{(title) => (
											<Dialog.Title class="jdd title jdd-typography">
												{title}
											</Dialog.Title>
										)}
									</Show>

									<Dialog.CloseButton class="jdd drawer-close">
										<Icon icon="close" />
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
				</Dialog.Portal>
			</Dialog.Root>
		</OverlayContextProvider>
	);
}
