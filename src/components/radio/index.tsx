import "./index.scss";
import { Space, Text } from "..";
import RadioGroup from "./group";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { RadioGroup as KobalteRadioGroup } from "@kobalte/core";
import { Show } from "solid-js";
import { RadioGroupItemOptions } from "@kobalte/core/dist/types/radio-group";
import { createAutofocus } from "@solid-primitives/autofocus";

export type RadioProps = IntrinsicComponentProps<
	"label",
	{
		size?: "small" | "default" | "large";
		label?: string;
		danger?: boolean;
		disabled?: boolean;
		autofocus?: boolean;
	} & Omit<RadioGroupItemOptions, "isDisabled">
>;

function Radio(props: RadioProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			danger: false,
		},
		keys: ["size", "label", "danger", "disabled", "autofocus"],
	});

	let ref!: HTMLInputElement;
	if (local.autofocus) createAutofocus(() => ref);

	return (
		<KobalteRadioGroup.Item
			class="jdd radio"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			}}
			isDisabled={local.disabled}
			{...others}
		>
			<KobalteRadioGroup.ItemInput ref={ref} />

			<Space align="center">
				<KobalteRadioGroup.ItemControl class="radio-control">
					<KobalteRadioGroup.ItemIndicator class="radio-indicator" />
				</KobalteRadioGroup.ItemControl>
				<Show when={local.label}>
					<KobalteRadioGroup.Label>
						<Show when={typeof local.label === "string"} fallback={local.label}>
							<Text>{local.label}</Text>
						</Show>
					</KobalteRadioGroup.Label>
				</Show>
			</Space>
		</KobalteRadioGroup.Item>
	);
}

const CompoundedRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup;
};
CompoundedRadio.Group = RadioGroup;
export { CompoundedRadio as Radio };
