import "./index.scss";
import { Button } from "@jundao/design";
import { ComponentProps, splitProps } from "solid-js";

export type ButtonGroupProps = ComponentProps<"div"> & {
	children: typeof Button;
};

export default function ButtonGroup(props: ButtonGroupProps) {
	const [local, others] = splitProps(props, ["children"]);

	return (
		<div class="jdd button-group" role="group" {...others}>
			{local.children}
		</div>
	);
}
