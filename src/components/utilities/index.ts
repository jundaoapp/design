import { mergeProps, splitProps, type ValidComponent } from "solid-js";
import type { IntrinsicComponentProps } from "../types";

export function processProps<
	T extends IntrinsicComponentProps<ValidComponent>,
	D extends Partial<T>,
	K extends keyof T,
>(options: { props: T; default?: D; keys: K[] }) {
	return splitProps(mergeProps(options.default, options.props), options.keys);
}
