import "./index.scss";
import { ComponentProps, mergeProps, splitProps } from "solid-js";

export type IconProps = ComponentProps<"i"> & {
	icon: string;
	line?: boolean;
	spin?: boolean;
	label?: string;
};

const defaultProps = {
	line: false,
	spin: false,
	label: "",
};

export default function Icon(props: IconProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"icon",
		"line",
		"spin",
		"label",
		"class",
		"classList",
	]);

	const suffix = local.line ? "-line" : "-fill";

	return (
		<i
			class={`jdd icon ri-${local.icon}${suffix} ${local.class ?? ""}`}
			role="img"
			aria-label={local.label}
			classList={{
				spin: local.spin,
				...local.classList,
			}}
			{...others}
		/>
	);
}
