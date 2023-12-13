import { Dialog } from "@kobalte/core";
import { mergeRefs } from "@solid-primitives/refs";
import { RiSystemCloseFill } from "solid-icons/ri";
import {
	JSXElement,
	Show,
	createEffect,
	createMemo,
	createSignal,
	on,
} from "solid-js";
import { Card, Text } from "..";
import "../title/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { useOverlayContext } from "../utilities/overlay";
import "./index.scss";

export type ModalProps = IntrinsicComponentProps<
	"div",
	{
		title?: JSXElement;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		footer?: JSXElement;
		level?: number;
	} & Dialog.DialogContentProps
>;

export function Modal(props: ModalProps) {
	const [local, others] = processProps({
		props,
		keys: [
			"open",
			"onOpenChange",
			"children",
			"title",
			"footer",
			"ref",
			"level",
			"class",
		],
	});

	const [OverlayContextProvider, context] = useOverlayContext();

	const level = local.level !== undefined ? local.level : context.level;

	const [sourceElement, setSourceElement] = createSignal<Element>();

	let ref: HTMLDivElement | undefined;

	const handleRef = (element: HTMLDivElement) => {
		mergeRefs((el) => {
			ref = el;
		}, local.ref)(element);

		if (local.open === true) {
			if (ref !== undefined) {
				setSourceElement(document.activeElement ?? document.body);
				const rect = sourceElement()!.getBoundingClientRect();
				const x = Math.round(rect.x + rect.width / 2);
				const y = Math.round(rect.y + rect.height / 2);

				ref!.style.setProperty("--jdd-modal-transition-property", "none");
				ref.style.setProperty(
					"--jdd-modal-position",
					`calc(${x}px - 50%), calc(${y}px - 50%)`,
				);
				setTimeout(() => {
					ref!.style.removeProperty("--jdd-modal-transition-property");
					ref!.style.setProperty(
						"--jdd-modal-position",
						`calc(${window.innerWidth / 2}px - 50%), calc(${
							window.innerHeight / 2
						}px - 50%)`,
					);
				}, 0);
			}
		}
	};

	createEffect(
		on(
			() => local.open,
			(open) => {
				if (open === false) {
					if (ref !== undefined) {
						const rect = sourceElement()!.getBoundingClientRect();
						const x = Math.round(rect.x + rect.width / 2);
						const y = Math.round(rect.y + rect.height / 2);

						ref.style.setProperty(
							"--jdd-modal-position",
							`calc(${x}px - 50%), calc(${y}px - 50%)`,
						);
					}
				}
			},
		),
	);

	const children = createMemo(() => local.children);

	return (
		<OverlayContextProvider value={{ level: level + 1 }}>
			<Dialog.Root
				modal={true}
				open={local.open}
				onOpenChange={local.onOpenChange}
			>
				<Dialog.Portal>
					<div
						class="jdd modal-wrapper"
						style={{ "--jdd-overlay-zindex-increment": level }}
					>
						<Dialog.Overlay class="jdd modal-overlay" />
						<Dialog.Content
							ref={handleRef}
							class={["jdd modal", local.class].join(" ")}
							{...others}
						>
							<Card>
								<div class="modal-header">
									<Show when={local.title} fallback={<div />} keyed>
										{(title) => (
											<Dialog.Title class="jdd title jdd-typography">
												{title}
											</Dialog.Title>
										)}
									</Show>

									<Dialog.CloseButton class="jdd modal-close">
										<RiSystemCloseFill />
									</Dialog.CloseButton>
								</div>
								<Dialog.Description class="modal-description">
									<div class="modal-description-content">
										<Show
											when={typeof children() === "string"}
											fallback={children()}
										>
											<Text>{children()}</Text>
										</Show>
									</div>

									<Show when={local.footer} keyed>
										{(footer) => <div class="modal-footer">{footer}</div>}
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
