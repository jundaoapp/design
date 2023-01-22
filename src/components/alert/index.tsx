import "./index.scss";
import { createSignal, JSXElement, Match, Show, Switch } from "solid-js";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { Transition } from "solid-transition-group";
import { Icon, Text } from "@jundao/design";
import { Alert as KobalteAlert } from "@kobalte/core";
import { Button } from "@kobalte/core";

export type AlertProps = IntrinsicComponentProps<
	"div",
	{
		message: JSXElement;
		description?: JSXElement;
		type?: "default" | "success" | "info" | "error" | "warning";
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
			type: "default",
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

	return (
		<Transition name="alert-animation" appear>
			<Show when={show()}>
				<KobalteAlert.Root
					class="jdd alert"
					classList={{
						banner: local.banner,
						closable: local.closable,
						icon: local.showIcon,
						description: local.description !== undefined,
						info: local.type === "info",
						success: local.type === "success",
						warning: local.type === "warning",
						error: local.type === "error",
					}}
					{...others}
				>
					<Show when={local.showIcon}>
						<Icon
							class="alert-icon"
							aria-hidden="true"
							icon={
								{
									default: "loader",
									success: "checkbox-circle",
									info: "information",
									error: "error-warning",
									warning: "alert",
								}[local.type!]
							}
						/>
					</Show>

					<Show
						when={typeof local.message === "string"}
						fallback={local.message}
					>
						<Text class="alert-message" bold={local.description !== undefined}>
							{local.message}
						</Text>
					</Show>

					<Switch>
						<Match when={typeof local.description === "string"}>
							<Text class="alert-description">{local.description}</Text>
						</Match>
						<Match
							when={
								local.description !== undefined &&
								typeof local.description !== "string"
							}
						>
							{local.description}
						</Match>
					</Switch>

					<Show when={local.closable}>
						<Button.Root
							class="jdd alert-close"
							data-dismiss="alert"
							aria-label="Close"
							onPress={() => setShow(false)}
						>
							<Icon aria-hidden={true} icon="close" />
						</Button.Root>
					</Show>
				</KobalteAlert.Root>
			</Show>
		</Transition>
	);
}
