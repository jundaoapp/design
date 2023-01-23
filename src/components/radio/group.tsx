import { JSX, Show } from "solid-js";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { RadioGroup as KobalteRadioGroup } from "@kobalte/core";
import { RadioGroupRootOptions } from "@kobalte/core/dist/types/radio-group";
import { Space, Text } from "..";

export type RadioGroupProps = IntrinsicComponentProps<
	"div",
	{
		label?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		onChange?: (value: string) => void;
		errorMessage?: JSX.Element;
		description?: JSX.Element;
	} & Omit<
		RadioGroupRootOptions,
		"isDisabled" | "isReadOnly" | "isRequired" | "onValueChange"
	>
>;

export default function RadioGroup(props: RadioGroupProps) {
	const [local, others] = processProps({
		props,
		keys: [
			"label",
			"disabled",
			"readonly",
			"required",
			"onChange",
			"errorMessage",
			"description",
		],
	});

	return (
		<KobalteRadioGroup.Root
			isDisabled={local.disabled}
			isReadOnly={local.readonly}
			isRequired={local.required}
			onValueChange={local.onChange}
			{...others}
		>
			<Space vertical>
				<Show when={local.label}>
					<KobalteRadioGroup.Label>
						<Show when={typeof local.label === "string"} fallback={local.label}>
							<Text>{local.label}</Text>
						</Show>
					</KobalteRadioGroup.Label>
				</Show>

				<Space vertical={props.orientation === "vertical"}>
					{props.children}
				</Space>

				<Show when={local.description}>
					<KobalteRadioGroup.Description>
						<Show
							when={typeof local.description === "string"}
							fallback={local.description}
						>
							<Text type="secondary" size="small">
								{local.description}
							</Text>
						</Show>
					</KobalteRadioGroup.Description>
				</Show>

				<Show when={local.errorMessage}>
					<KobalteRadioGroup.ErrorMessage>
						<Show
							when={typeof local.errorMessage === "string"}
							fallback={local.errorMessage}
						>
							<Text type="danger" size="small">
								{local.errorMessage}
							</Text>
						</Show>
					</KobalteRadioGroup.ErrorMessage>
				</Show>
			</Space>
		</KobalteRadioGroup.Root>
	);
}
