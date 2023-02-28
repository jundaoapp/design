import "./index.scss";
import {
	createMemo,
	createSignal,
	JSXElement,
	Match,
	Show,
	Switch,
} from "solid-js";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Transition } from "solid-transition-group";
import { Icon, Text } from "..";
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

export function Alert(props: AlertProps) {
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

	const message = createMemo(() => local.message);
	const description = createMemo(() => local.description);

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

					<Show when={typeof message() === "string"} fallback={message()}>
						<Text class="alert-message" bold={description() !== undefined}>
							{message()}
						</Text>
					</Show>

					<Switch>
						<Match when={typeof description() === "string"}>
							<Text class="alert-description">{description()}</Text>
						</Match>
						<Match
							when={
								description() !== undefined && typeof description() !== "string"
							}
						>
							{description()}
						</Match>
					</Switch>

					<Show when={local.closable}>
						<Button.Root
							class="jdd alert-close"
							data-dismiss="alert"
							aria-label="Close"
							onClick={() => setShow(false)}
						>
							<Icon aria-hidden={true} icon="close" />
						</Button.Root>
					</Show>
				</KobalteAlert.Root>
			</Show>
		</Transition>
	);
}
