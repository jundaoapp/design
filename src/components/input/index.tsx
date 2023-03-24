import "./index.scss";
import { TextField, As } from "@kobalte/core";
import { IntrinsicComponentProps } from "../types";
import {
	JSXElement,
	Show,
	For,
	Switch,
	Match,
	createMemo,
	createSignal,
} from "solid-js";
import { processProps } from "../utilities";
import { Text, Icon, Space } from "..";
import { Dynamic } from "solid-js/web";
import { createAutofocus } from "@solid-primitives/autofocus";

export type InputProps = IntrinsicComponentProps<
	"input" | "textarea",
	{
		value?: string;
		defaultValue?: string;
		onChange?: (value: string) => void;
		type?: "text" | "textarea";
		size?: "small" | "default" | "large";
		label?: string;
		danger?: boolean;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
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
			"disabled",
			"autofocus",
			"required",
			"readonly",
			"onChange",
			"errorMessage",
			"description",
			"invalid",
			"value",
			"defaultValue",
		],
	});

	const [focusVisible, setFocusVisible] = createSignal(false);

	let ref!: HTMLElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);
	const errorMessage = createMemo(() => local.errorMessage);

	return (
		<TextField.Root
			isDisabled={local.disabled}
			isRequired={local.required}
			isReadOnly={local.readonly}
			value={local.value}
			name={local.name}
			defaultValue={local.defaultValue}
			onValueChange={local.onChange}
			validationState={local.invalid ? "invalid" : "valid"}
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
					<Dynamic
						component={
							{
								text: TextField.Input,
								textarea: TextField.TextArea,
							}[local.type!]
						}
						// @ts-ignore: TS Can't infer type
						ref={ref}
						class="jdd input"
						classList={{
							danger: local.danger,
							small: local.size === "small",
							large: local.size === "large",
							"focus-visible": focusVisible(),
						}}
						onFocus={(event: FocusEvent) => {
							setFocusVisible(event.relatedTarget !== null);
						}}
						{...others}
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
