import "./index.scss";
import { splitProps, ComponentProps } from "solid-js";
import { Text } from "@jundao/design";

export type LabelProps = Omit<ComponentProps<"label">, "for"> & {
	for: HTMLInputElement;
};

export default function Label(props: LabelProps) {
	const [local, others] = splitProps(props, ["for", "children"]);

	return (
		<label class="jdd label" for={local.for.id || undefined} {...others}>
			{local.for}
			<Text>{local.children}</Text>
		</label>
	);
}
