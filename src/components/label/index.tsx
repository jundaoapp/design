import "./index.scss";
import { splitProps, ComponentProps } from "solid-js";
import { Text } from "@jundao/design";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type LabelProps = IntrinsicComponentProps<
	"label",
	{
		for: HTMLInputElement;
	}
>;

export default function Label(props: LabelProps) {
	const [local, others] = processProps({
		props,
		keys: ["for", "children"],
	});

	return (
		<label class="jdd label" for={local.for.id || undefined} {...others}>
			{local.for}
			<Text>{local.children}</Text>
		</label>
	);
}
