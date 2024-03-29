import { As, Popover } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { Ref } from "@solid-primitives/refs";
import {
	RiSystemAlertFill,
	RiSystemErrorWarningFill,
	RiSystemInformationFill,
} from "solid-icons/ri";
import {
	JSXElement,
	Match,
	Setter,
	Show,
	Switch,
	createEffect,
	createMemo,
	createSignal,
} from "solid-js";
import { Button, Card, Text, Title } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

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
	} & Pick<Popover.PopoverContentProps, "style"> &
		Pick<Popover.PopoverRootProps, "placement">
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
			"placement",
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

		if (event.type === "keypress" || event.type === "keyup") {
			if (
				!(
					(event as KeyboardEvent).key === "Enter" ||
					(event as KeyboardEvent).key === " "
				)
			)
				return;
		}

		// @ts-ignore: Typescript doesn't understand constructor function
		setCapturedEvent(new event.constructor(event.type, event));

		event.preventDefault();
		event.stopImmediatePropagation();

		setOpen(true);
	};

	const handleOutcome = (
		setter: Setter<boolean>,
		fn: (() => void | Promise<void>) | undefined,
		callback?: () => void,
	) => {
		if (fn !== undefined) setter(true);

		setTimeout(async () => {
			await fn?.();

			callback?.();
			setter(false);
			setOpen(false);
		}, 1);
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

	const description = createMemo(() => local.description);

	const combinedProps = combineProps(others, {
		class: `jdd popconfirm ${local.type}`,
	});

	return (
		<Popover.Root
			open={open()}
			onOpenChange={setOpen}
			placement={local.placement}
		>
			<Popover.Anchor ref={ref}>
				{/* @ts-ignore */}
				<Ref ref={setChildRef}>{local.children}</Ref>
			</Popover.Anchor>
			<Popover.Portal>
				<Popover.Content {...combinedProps}>
					<Popover.Arrow class="popconfirm-arrow" />
					<Card contrastBackground size="small">
						<div class="popconfirm-header">
							<Switch>
								<Match when={local.type === "info"}>
									<RiSystemInformationFill
										class="popconfirm-icon"
										aria-hidden={true}
									/>
								</Match>
								<Match when={local.type === "danger"}>
									<RiSystemErrorWarningFill
										class="popconfirm-icon"
										aria-hidden={true}
									/>
								</Match>
								<Match when={local.type === "warning"}>
									<RiSystemAlertFill
										class="popconfirm-icon"
										aria-hidden={true}
									/>
								</Match>
							</Switch>
							<Show when={local.title} fallback={<div />} keyed>
								{(title) => (
									<Popover.Title asChild>
										<As component={Title}>{title}</As>
									</Popover.Title>
								)}
							</Show>
						</div>
						<Popover.Description class="popconfirm-description">
							<Show
								when={typeof description() === "string"}
								fallback={description()}
							>
								<Text>{description()}</Text>
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
