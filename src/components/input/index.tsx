import { As, TextField } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import { JSXElement, Show, createMemo, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Space, Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type InputProps = IntrinsicComponentProps<
	"input" | "textarea",
	{
		value?: string;
		defaultValue?: string;
		onChange?: (value: string) => void;
		type?: HTMLInputElement["type"] | "textarea";
		size?: "small" | "default" | "large";
		label?: string;
		danger?: boolean;
		autofocus?: boolean;
		invalid?: boolean;
		errorMessage?: JSXElement;
		description?: JSXElement;
		children?: never;
		autoResize?: boolean;
	}
>;

export function Input(props: InputProps) {
	const [local, others] = processProps({
		props,
		default: {
			type: "text",
			size: "default",
			danger: false,
			invalid: false,
		},
		keys: [
			"name",
			"size",
			"label",
			"type",
			"danger",
			"autofocus",
			"errorMessage",
			"description",
			"invalid",
			"value",
			"defaultValue",
			"onChange",
		],
	});

	const [focusVisible, setFocusVisible] = createSignal(false);

	let ref!: HTMLElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);
	const errorMessage = createMemo(() => local.errorMessage);

	const combinedProps = combineProps(others, {
		ref: (el) => {
			ref = el;
		},
		class: "jdd input",
		get classList() {
			return {
				danger: local.danger,
				small: local.size === "small",
				large: local.size === "large",
				"focus-visible": focusVisible(),
			};
		},
		onFocus: (event: FocusEvent) => {
			setFocusVisible(event.relatedTarget !== null);
		},
	});

	return (
		<TextField.Root
			value={local.value}
			name={local.name}
			defaultValue={local.defaultValue}
			validationState={local.invalid ? "invalid" : "valid"}
			onChange={local.onChange}
			asChild
		>
			<As
				component={Space}
				align={
					description() === undefined && errorMessage() === undefined
						? "center"
						: "start"
				}
			>
				<Show when={label()}>
					<TextField.Label>
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</TextField.Label>
				</Show>

				<Space vertical>
					{/* @ts-ignore: TS Can't infer type */}
					<Dynamic
						component={
							local.type === "textarea" ? TextField.TextArea : TextField.Input
						}
						type={local.type === "textarea" ? undefined : local.type}
						{...combinedProps}
					/>

					<Show when={description()}>
						<TextField.Description>
							<Show
								when={typeof description() === "string"}
								fallback={description()}
							>
								<Text type="secondary" size="small">
									{description()}
								</Text>
							</Show>
						</TextField.Description>
					</Show>

					<Show when={errorMessage()}>
						<TextField.ErrorMessage>
							<Show
								when={typeof errorMessage() === "string"}
								fallback={errorMessage()}
							>
								<Text type="danger" size="small">
									{errorMessage()}
								</Text>
							</Show>
						</TextField.ErrorMessage>
					</Show>
				</Space>
			</As>
		</TextField.Root>
	);
}
