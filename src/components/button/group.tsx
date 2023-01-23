import "./index.scss";
import { Button } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

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
