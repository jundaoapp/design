import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { createSignal, Show, splitProps } from "solid-js";
import { Icon, Text } from "@jundao/design";

export type CardProps = JSX.IntrinsicElements["div"] & {
	title?: JSX.Element;
	size?: "small" | "default";
	noPadding?: boolean;
	collapsible?: boolean;
	collapsed?: boolean;
};

export default function Card(props: CardProps) {
	const [
		{
			title,
			size = "default",
			children,
			noPadding = false,
			collapsible = false,
		},
		others,
	] = splitProps(props, [
		"title",
		"size",
		"children",
		"noPadding",
		"collapsible",
		"collapsed",
	]);

	const [collapsed, setCollapsed] = createSignal(false);

	return (
		<div
			class="jdd card"
			classList={{
				small: size === "small",
				"no-padding": noPadding,
				collapsed: props.collapsed ?? collapsed(),
			}}
			{...others}
		>
			<Show when={title || collapsible}>
				<div class="title">
					{typeof title === "string" ? <Text>{title}</Text> : title}

					<Show when={collapsible}>
						<Text>
							<Icon
								class="collapse-toggle"
								icon="arrow-down-s"
								line
								onClick={() => {
									setCollapsed(!collapsed());
								}}
							/>
						</Text>
					</Show>
				</div>
			</Show>
			<div class="content">{children}</div>
		</div>
	);
}
