import { Alert as KobalteAlert } from "@kobalte/core";
import { Button } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { RiSystemCloseFill, RiSystemLoaderFill } from "solid-icons/ri";
import { RiSystemCheckboxCircleFill } from "solid-icons/ri";
import { RiSystemInformationFill } from "solid-icons/ri";
import { RiSystemErrorWarningFill } from "solid-icons/ri";
import { RiSystemAlertFill } from "solid-icons/ri";
import {
	JSXElement,
	Match,
	Show,
	Switch,
	createMemo,
	createSignal,
} from "solid-js";
import { Transition } from "solid-transition-group";
import { Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

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

	const combinedProps = combineProps(others, {
		class: "jdd alert",
		get classList() {
			return {
				banner: local.banner,
				closable: local.closable,
				icon: local.showIcon,
				description: local.description !== undefined,
				info: local.type === "info",
				success: local.type === "success",
				warning: local.type === "warning",
				error: local.type === "error",
			};
		},
	});

	return (
		<Transition name="alert-animation" appear>
			<Show when={show()}>
				<KobalteAlert.Root {...combinedProps}>
					<Show when={local.showIcon}>
						<Text class="alert-icon">
							<Switch>
								<Match when={local.type === "default"}>
									<RiSystemLoaderFill />
								</Match>
								<Match when={local.type === "success"}>
									<RiSystemCheckboxCircleFill />
								</Match>
								<Match when={local.type === "info"}>
									<RiSystemInformationFill />
								</Match>
								<Match when={local.type === "error"}>
									<RiSystemErrorWarningFill />
								</Match>
								<Match when={local.type === "warning"}>
									<RiSystemAlertFill />
								</Match>
							</Switch>
						</Text>
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
							<RiSystemCloseFill aria-hidden={true} />
						</Button.Root>
					</Show>
				</KobalteAlert.Root>
			</Show>
		</Transition>
	);
}
