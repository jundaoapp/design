import "./index.scss";
import { Button } from "@jundao/design";
import { ComponentProps, splitProps } from "solid-js";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type ButtonGroupProps = IntrinsicComponentProps<
	"div",
	{
		children: ReturnType<typeof Button>;
	}
>;

export default function ButtonGroup(props: ButtonGroupProps) {
	const [local, others] = processProps({ props, keys: ["children"] });

	return (
		<div class="jdd button-group" role="group" {...others}>
			{local.children}
		</div>
	);
}
