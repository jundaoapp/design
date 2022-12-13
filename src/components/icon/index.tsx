import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { splitProps } from "solid-js";

export type IconProps = JSX.IntrinsicElements["i"] & {
	icon: string;
	line?: boolean;
	spin?: boolean;
	label?: string;
};

export default function Icon(props: IconProps) {
	const [{ icon, line = false, spin = false, label = "" }, others] = splitProps(
		props,
		["icon", "line", "spin", "label", "class", "classList"],
	);

	const suffix = line ? "-line" : "-fill";

	return (
		<i
			class={`jdd icon ri-${icon}${suffix} ${props.class ?? ""}`}
			role="img"
			aria-label={label}
			classList={{
				spin: spin,
				...props.classList,
			}}
			{...others}
		/>
	);
}
