import "./index.scss";
import { HTMLAttributes } from "solid-js/types/jsx";
import { splitProps } from "solid-js";

export interface IconProps extends HTMLAttributes<HTMLElement> {
	icon: string,
	line?: boolean,
	fill?: boolean,
	spin?: boolean,
	label?: string,
}

export default function Icon(props: IconProps) {
	const [{ icon, line, fill, spin, label }, others] = splitProps(
		props,
		["icon", "line", "fill", "spin", "label"],
	);

	const suffix = line === true
		? "-line"
		: fill === true
			? "-fill"
			: "";

	return (
		<i class={`jdd icon ri-${icon}${suffix}`} role="img" aria-label={label} classList={{
			spin: spin === true,
		}} {...others}></i>
	);
}
