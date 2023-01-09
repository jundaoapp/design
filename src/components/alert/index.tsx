import "./index.scss";
import { createSignal, JSXElement, Show } from "solid-js";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { Transition } from "solid-transition-group";
import { Dynamic } from "solid-js/web";
import { Icon, Spinner, Text } from "@jundao/design";
import { createPress } from "@solid-aria/primitives";

export type AlertProps = IntrinsicComponentProps<
	"div",
	{
		message: JSXElement;
		description?: JSXElement;
		type?: "success" | "info" | "error" | "warning";
		closable?: boolean;
		showIcon?: boolean;
		banner?: boolean;
		onClose?: () => void;
		children: never;
	}
>;

export default function Alert(props: AlertProps) {
	const [local, others] = processProps({
		props,
		default: {
			type: "info",
			closable: false,
			showIcon: true,
			banner: false,
		},
		keys: [
			"message",
			"description",
			"type",
			"closable",
			"showIcon",
			"banner",
			"onClose",
		],
	});

	const [show, setShow] = createSignal(true);

	let buttonRef!: HTMLButtonElement;

	const { pressProps } = createPress(
		{
			preventFocusOnPress: true,
			onPress: () => {
				setShow(false);
			},
		},
		() => buttonRef,
	);

	return (
		<Transition name="alert-animation" appear>
			<Show when={show()}>
				<div
					class={`jdd alert ${local.type}`}
					classList={{
						banner: local.banner,
						closable: local.closable,
						icon: local.showIcon,
						description: local.description !== undefined,
					}}
					role="alert"
					{...others}
				>
					<Show when={local.showIcon}>
						<Text aria-hidden="true" class="alert-icon">
							<Icon
								icon={
									{
										success: "checkbox-circle",
										info: "information",
										error: "error-warning",
										warning: "alert",
									}[local.type!]
								}
							/>
						</Text>
					</Show>

					{typeof local.message === "string" ? (
						<Text class="alert-message" bold={local.description !== undefined}>
							{local.message}
						</Text>
					) : (
						local.message
					)}
					<Show when={local.description}>
						{" "}
						{typeof local.description === "string" ? (
							<Text class="alert-description">{local.description}</Text>
						) : (
							local.description!
						)}
					</Show>

					<Show when={local.closable}>
						<button
							ref={buttonRef}
							class="close"
							data-dismiss="alert"
							aria-label="Close"
							{...pressProps}
						>
							<Text aria-hidden="true">
								<Icon icon="close" />
							</Text>
						</button>
					</Show>
				</div>
			</Show>
		</Transition>
	);
}
