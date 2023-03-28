import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";

export type IconProps = IntrinsicComponentProps<
	"i",
	{
		icon: string;
		line?: boolean;
		fill?: boolean;
		spin?: boolean;
		label?: string;
	}
>;

export function Icon(props: IconProps) {
	const [local, others] = processProps({
		props,
		default: {
			line: false,
			spin: false,
			fill: true,
			label: "",
		},
		keys: ["icon", "line", "spin", "label", "fill"],
	});

	const suffix = local.line ? "-line" : local.fill ? "-fill" : "";

	const combinedProps = combineProps(others, {
		class: `jdd icon ri-${local.icon}${suffix}`,
		get classList() {
			return {
				spin: local.spin,
			};
		},
	});

	return <i role="img" aria-label={local.label} {...combinedProps} />;
}
