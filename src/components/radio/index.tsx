import "./index.scss";
import "@jundao/design/button/index.scss";
import { JSX } from "solid-js/types/jsx";
import { ComponentProps, mergeProps, splitProps, useContext } from "solid-js";
import { Label } from "@jundao/design";
import { RadioGroupContext } from "@jundao/design/radio/group";
import RadioGroup from "./group";

export type RadioProps = Omit<ComponentProps<"input">, "value"> & {
	size?: "small" | "default" | "large";
	label?: string;
	value: string | string[] | number;
	danger?: boolean;
};

const defaultProps = {
	size: "default",
	danger: false,
};

function Radio(props: RadioProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"size",
		"label",
		"onChange",
		"value",
		"name",
		"danger",
	]);

	const context = useContext(RadioGroupContext);

	const changeHandler: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
		if (context !== undefined) context[1].setValue(props.value);

		if (typeof local.onChange === "function") local.onChange(event);
	};

	let input = (
		<input
			class="jdd radio"
			type="radio"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			}}
			checked={context !== undefined && context[0].value === local.value}
			name={context !== undefined ? context[0].name : local.name}
			onChange={changeHandler}
			{...others}
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
