import { RadioGroup as KobalteRadioGroup } from "@kobalte/core";
import { JSX, Show, createMemo } from "solid-js";
import { Space, Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

export type RadioGroupProps = IntrinsicComponentProps<
	"div",
	{
		label?: string;
		errorMessage?: JSX.Element;
		description?: JSX.Element;
		invalid?: boolean;
	} & Omit<KobalteRadioGroup.RadioGroupRootProps, "validationState">
>;

export default function RadioGroup(props: RadioGroupProps) {
	const [local, others] = processProps({
		props,
		default: {
			invalid: false,
		},
		keys: ["label", "errorMessage", "description", "invalid"],
	});

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);
	const errorMessage = createMemo(() => local.errorMessage);

	return (
		<KobalteRadioGroup.Root
			validationState={local.invalid ? "invalid" : "valid"}
			{...others}
		>
			<Space vertical>
				<Show when={label()}>
					<KobalteRadioGroup.Label>
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</KobalteRadioGroup.Label>
				</Show>

				<Space vertical={props.orientation === "vertical"}>
					{props.children}
				</Space>

				<Show when={description()}>
					<KobalteRadioGroup.Description>
						<Show
							when={typeof description() === "string"}
							fallback={description()}
						>
							<Text type="secondary" size="small">
								{description()}
							</Text>
						</Show>
					</KobalteRadioGroup.Description>
				</Show>

				<Show when={errorMessage()}>
					<KobalteRadioGroup.ErrorMessage>
						<Show
							when={typeof errorMessage() === "string"}
							fallback={errorMessage()}
						>
							<Text type="danger" size="small">
								{errorMessage()}
							</Text>
						</Show>
					</KobalteRadioGroup.ErrorMessage>
				</Show>
			</Space>
		</KobalteRadioGroup.Root>
	);
}
