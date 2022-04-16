import "./index.scss";
import { Button } from "@jundao/design";
import { HTMLAttributes } from "solid-js/types/jsx";
import { splitProps } from "solid-js";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	children: typeof Button,
}

export default function ButtonGroup(props: ButtonGroupProps) {
	const [{ children }, others] = splitProps(props, ["children"]);

	return (
		<div class="jdd button-group" role="group" {...others}>
            {children}
        </div>
	);
}
