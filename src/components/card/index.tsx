import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { Show, splitProps } from "solid-js";
import { Text } from "@jundao/design";

export type CardProps = JSX.IntrinsicElements["div"] & {
	title?: JSX.Element;
	size?: "small" | "default";
  noPadding?: boolean;
};

export default function Card(props: CardProps) {
	const [{ title, size = "default", children, noPadding = false }, others] = splitProps(props, [
		"title",
		"size",
		"children",
    "noPadding",
	]);

	return (
		<div
			class="jdd card"
			classList={{
				small: size === "small",
        "no-padding": noPadding,
			}}
			{...others}
		>
			<Show when={title}>
        <div class="title">{typeof title === "string" ? <Text>{title}</Text> : title }</div>
			</Show>
			<div class="content">{children}</div>
		</div>
	);
}
