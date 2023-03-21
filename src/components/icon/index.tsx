import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

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
		keys: ["icon", "line", "spin", "label", "class", "classList", "fill"],
	});

	const suffix = local.line ? "-line" : local.fill ? "-fill" : "";

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
