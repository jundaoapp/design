import { RadioGroup as KobalteRadioGroup } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import { Show, createMemo } from "solid-js";
import { Space, Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import RadioGroup from "./group";
import "./index.scss";

export type RadioProps = IntrinsicComponentProps<
	"label",
	{
		size?: "small" | "default" | "large";
		label?: string;
		danger?: boolean;
		disabled?: boolean;
		autofocus?: boolean;
	} & KobalteRadioGroup.RadioGroupItemProps
>;

function Radio(props: RadioProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			danger: false,
		},
		keys: ["size", "label", "danger", "autofocus"],
	});

	let ref!: HTMLInputElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);

	const combinedProps = combineProps(others, {
		class: "jdd radio",
		get classList() {
			return {
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			};
		},
	});

	return (
		<KobalteRadioGroup.Item {...combinedProps}>
			<KobalteRadioGroup.ItemInput ref={ref} />

			<Space align="center">
				<KobalteRadioGroup.ItemControl class="radio-control">
					<KobalteRadioGroup.ItemIndicator class="radio-indicator" />
				</KobalteRadioGroup.ItemControl>
				<Show when={label()}>
					<KobalteRadioGroup.Label>
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
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
