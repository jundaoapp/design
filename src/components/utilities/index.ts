import { splitProps, mergeProps, SplitProps, MergeProps } from "solid-js";
import { IntrinsicComponentProps } from "../types";
import { ValidComponent } from "solid-js";

export function processProps<
	T extends IntrinsicComponentProps<ValidComponent>,
	D extends Partial<T>,
	K extends keyof T,
>(options: {
	props: T;
	default?: D;
	keys: K[];
}) {
	return splitProps(mergeProps(options.default, options.props), options.keys);
}
