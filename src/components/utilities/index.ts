import {
	splitProps,
	mergeProps,
} from "solid-js";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { ValidComponent } from "solid-js";

export function processProps<
	T extends IntrinsicComponentProps<ValidComponent>,
	D extends Readonly<Partial<T>>,
	K extends Exclude<keyof T, "intrinsic">,
>(options: {
	props: T;
	default?: D;
	keys: K[];
}): [Pick<T & D, K>, Omit<Omit<T & D, K>, "intrinsic"> & T["intrinsic"]] {
	const merged = mergeProps(options.default, options.props);

	const [local, othersAndNestedIntrinsic] = splitProps(merged, options.keys);

	const [nestedIntrinsic, others] = splitProps(othersAndNestedIntrinsic, [
		"intrinsic",
	] as [keyof typeof othersAndNestedIntrinsic]);

	type NestedIntrinsic = {
		intrinsic: T["intrinsic"];
	};

	return [
		local,
		mergeProps(
			others,
			(nestedIntrinsic as unknown as NestedIntrinsic).intrinsic,
		) as Omit<Omit<T & D, K>, "intrinsic"> & T["intrinsic"],
	];
}