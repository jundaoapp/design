import "./index.scss";
import {
	ComponentProps,
	createSignal,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
} from "solid-js";
import { Icon, Text } from "@jundao/design";

export type CardProps = ComponentProps<"div"> & {
	title?: JSXElement;
	size?: "small" | "default";
	noPadding?: boolean;
	collapsible?: boolean;
	collapsed?: boolean;
};

const defaultProps = {
	size: "default",
	noPaddng: false,
	collapsible: false,
};

export default function Card(props: CardProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
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
				small: local.size === "small",
				"no-padding": local.noPadding,
				collapsed: local.collapsed ?? collapsed(),
			}}
			{...others}
		>
			<Show when={local.title || local.collapsible}>
				<div class="title">
					{typeof local.title === "string" ? (
						<Text>{local.title}</Text>
					) : (
						local.title
					)}

					<Show when={local.collapsible}>
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
			<div class="content">{local.children}</div>
		</div>
	);
}
