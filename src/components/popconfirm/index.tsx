import "./index.scss";
import "../title/index.scss";
import { IntrinsicComponentProps } from "../types";
import { Popover } from "@kobalte/core";
import { processProps } from "../utilities";
import { createEffect, createSignal, JSXElement, Setter, Show } from "solid-js";
import { Icon, Button, Card, Text } from "..";
import { Ref } from "@solid-primitives/refs";
import { PopoverContentOptions } from "@kobalte/core/dist/types/popover";

export type PopconfirmProps = IntrinsicComponentProps<
	"div",
	{
		title?: JSXElement;
		description?: JSXElement;
		type?: "info" | "danger" | "warning";
		disabled?: boolean;
		confirmText?: string;
		cancelText?: string;
		showCancel?: boolean;
		onConfirm?: () => void | Promise<void>;
		onCancel?: () => void | Promise<void>;
	} & Pick<PopoverContentOptions, "style">
>;

export function Popconfirm(props: PopconfirmProps) {
	const [local, others] = processProps({
		props,
		default: {
			type: "info",
			disabled: false,
			confirmText: "OK",
			cancelText: "Cancel",
			showCancel: true,
		},
		keys: [
			"children",
			"title",
			"description",
			"type",
			"disabled",
			"confirmText",
			"cancelText",
			"showCancel",
			"onConfirm",
			"onCancel",
		],
	});

	let ref!: HTMLDivElement;

	const [open, setOpen] = createSignal(false);
	const [cancelLoading, setCancelLoading] = createSignal(false);
	const [confirmLoading, setConfirmLoading] = createSignal(false);
	const [capturedEvent, setCapturedEvent] = createSignal<
		MouseEvent | KeyboardEvent
	>();
	const [childRef, setChildRef] = createSignal<Element>();

	const handleInteraction = (event: MouseEvent | KeyboardEvent) => {
		if (local.disabled || confirmLoading()) return;

		// @ts-ignore: Typescript doesn't understand constructor function
		setCapturedEvent(new event.constructor(event.type, event));

		event.preventDefault();
		event.stopImmediatePropagation();

		setOpen(true);
	};

	const handleOutcome = async (
		setter: Setter<boolean>,
		fn: (() => void | Promise<void>) | undefined,
		callback?: () => void,
	) => {
		setter(true);

		await fn?.();

		callback?.();
		setter(false);
		setOpen(false);
	};

	const handleCancel = () => {
		handleOutcome(setCancelLoading, local.onCancel);
	};

	const handleConfirm = () => {
		handleOutcome(setConfirmLoading, local.onConfirm, () => {
			childRef()?.dispatchEvent(capturedEvent()!);
		});
	};

	createEffect(() => {
		ref.addEventListener("click", handleInteraction, true);
		ref.addEventListener("keypress", handleInteraction, true);
		ref.addEventListener("keyup", handleInteraction, true);
	});

	return (
		<Popover.Root isOpen={open()} onOpenChange={setOpen}>
			<Popover.Anchor ref={ref}>
				<Ref ref={setChildRef}>{local.children}</Ref>
			</Popover.Anchor>
			<Popover.Portal>
				<Popover.Content class={`jdd popconfirm ${local.type}`} {...others}>
					<Popover.Arrow class="popconfirm-arrow" />
					<Card contrastBackground size="small">
						<div class="popconfirm-header">
							<Icon
								class="popconfirm-icon"
								icon={
									{
										info: "information",
										danger: "error-warning",
										warning: "alert",
									}[local.type!]
								}
								aria-hidden={true}
							/>
							<Show when={local.title} fallback={<div />}>
								<Popover.Title class="jdd title jdd-typography">
									{local.title}
								</Popover.Title>
							</Show>
						</div>
						<Popover.Description class="popconfirm-description">
							<Show
								when={typeof local.description === "string"}
								fallback={local.description}
							>
								<Text>{local.description}</Text>
							</Show>

							<div class="popconfirm-footer">
								<Show when={local.showCancel}>
									<Button
										autofocus={local.type === "danger"}
										loading={cancelLoading()}
										disabled={confirmLoading()}
										onClick={handleCancel}
										size="small"
									>
										{local.cancelText}
									</Button>
								</Show>
								<Button
									autofocus={local.type !== "danger"}
									loading={confirmLoading()}
									disabled={cancelLoading()}
									onClick={handleConfirm}
									type="primary"
									danger={local.type === "danger"}
									size="small"
								>
									{local.confirmText}
								</Button>
							</div>
						</Popover.Description>
					</Card>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
