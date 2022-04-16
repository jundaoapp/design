import "./index.scss";
import { HTMLAttributes } from "solid-js/types/jsx";
import { JSXElement, splitProps } from "solid-js";
import { Text } from "@jundao/design";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	children?: JSXElement,
	vertical?: boolean,
	dashed?: boolean,
	orientation?: "left" | "right",
}

export default function Divider(props: DividerProps) {
	const [{ children, vertical, dashed, orientation }, others] = splitProps(
		props,
		["children", "vertical", "dashed", "orientation"],
	);

	let child = children;

	if (!!children) {
		child = <Text>{child}</Text>;
	}

	return (
		<div class={`jdd jdd-divider ${orientation ?? ""}`}
             classList={{
                 vertical: vertical === true,
                 dashed: dashed === true,
                 "with-text": !!children,
             }}
             role="separator"
             children={child}
             {...others} />
	);
}
