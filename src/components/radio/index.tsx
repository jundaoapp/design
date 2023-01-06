import "./index.scss";
import "@jundao/design/button/index.scss";
import { Label } from "@jundao/design";
import RadioGroup from "./group";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { AriaRadioProps, createRadio } from "@solid-aria/primitives";

export type RadioProps = IntrinsicComponentProps<
	"input",
	{
		size?: "small" | "default" | "large";
		label?: string;
		danger?: boolean;
	} & Omit<AriaRadioProps, "isDisabled">
>;

function Radio(props: RadioProps) {
	let ref!: HTMLInputElement;

	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			danger: false,
		},
		keys: ["size", "label", "danger"],
	});

	const { inputProps } = createRadio(others, () => ref);

	let input = (
		<input
			ref={ref}
			class="jdd radio"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			}}
			{...inputProps}
		/>
	) as HTMLInputElement;

	if (local.label !== undefined) {
		return <Label for={input}>{local.label}</Label>;
	}

	return input;
}

const CompoundedRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup;
};
CompoundedRadio.Group = RadioGroup;
export default CompoundedRadio;
