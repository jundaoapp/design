import "./index.scss";
import { Button } from "@jundao/design";
import { JSX } from "solid-js/types/jsx";
import { splitProps } from "solid-js";

export type ButtonGroupProps =
	& JSX.IntrinsicElements["div"]
	& { children: typeof Button };

export default function ButtonGroup(props: ButtonGroupProps) {
	const [{ children }, others] = splitProps(props, ["children"]);

	return (
		<div class="jdd button-group" role="group" {...others}>
            {children}
        </div>
	);
}
