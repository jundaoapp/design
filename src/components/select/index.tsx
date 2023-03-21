import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import {
	Select as KobalteSelect,
	MultiSelect as KobalteMultiSelect,
} from "@kobalte/core";
import { AnySelect } from "./select";
import { JSXElement } from "solid-js";

type CommonSelectProps = {
	type?: "primary" | "default";
	size?: "small" | "default" | "large";
	label?: string;
	danger?: boolean;
	disabled?: boolean;
	required?: boolean;
	readonly?: boolean;
	autofocus?: boolean;
	open?: boolean;
	invalid?: boolean;
	errorMessage?: JSXElement;
	description?: JSXElement;
	children?: never;
};

export type SelectProps<Option> = IntrinsicComponentProps<
	"button",
	CommonSelectProps & {
		onChange?: (value: string) => void;
	} & Omit<
			KobalteSelect.SelectRootProps<Option>,
			| "onValueChange"
			| "isOpen"
			| "isDisabled"
			| "isReadOnly"
			| "isRequired"
			| "validationState"
		>
>;

export type MultiSelectProps<Option> = IntrinsicComponentProps<
	"button",
	CommonSelectProps & {
		onChange?: (value: Set<string>) => void;
	} & Omit<
			KobalteMultiSelect.MultiSelectRootProps<Option>,
			| "onValueChange"
			| "isOpen"
			| "isDisabled"
			| "isReadOnly"
			| "isRequired"
			| "validationState"
		>
>;

function Select<Option>(props: SelectProps<Option>) {
	return <AnySelect selectType="select" {...props} />;
}

function MultiSelect<Option>(props: MultiSelectProps<Option>) {
	return <AnySelect selectType="multi" {...props} />;
}

const CompoundedSelect = Select as typeof Select & {
	Multi: typeof MultiSelect;
};
CompoundedSelect.Multi = MultiSelect;
export { CompoundedSelect as Select };
