import { Collapsible } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { RiArrowsArrowDownSLine } from "solid-icons/ri";
import { JSXElement, Show, createMemo } from "solid-js";
import { Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type CardProps = IntrinsicComponentProps<
	"div",
	{
		title?: JSXElement;
		size?: "small" | "default";
		noPadding?: boolean;
		collapsible?: boolean;
		collapsed?: boolean;
		defaultCollapsed?: boolean;
		contrastBackground?: boolean;
	}
>;

export function Card(props: CardProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			noPadding: false,
			collapsible: false,
			defaultCollapsed: false,
			contrastBackground: false,
		},
		keys: [
			"title",
			"size",
			"children",
			"noPadding",
			"collapsible",
			"collapsed",
			"defaultCollapsed",
			"contrastBackground",
		],
	});

	const title = createMemo(() => local.title);

	const combinedProps = combineProps(others, {
		class: "jdd card",
		get classList() {
			return {
				collapsible:
					local.collapsible || local.collapsed || local.defaultCollapsed,
				small: local.size === "small",
				"no-padding": local.noPadding,
				"contrast-background": local.contrastBackground,
			};
		},
	});

	if (!(local.collapsible || local.collapsed || local.defaultCollapsed)) {
		return (
			<div {...combinedProps}>
				<Show when={title()}>
					<div class="title">
						<Show when={typeof title() === "string"} fallback={title()}>
							<Text>{title()}</Text>
						</Show>
					</div>
				</Show>
				<div class="content">{local.children}</div>
			</div>
		);
	}

	return (
		<Collapsible.Root
			open={local.collapsed === undefined ? undefined : !local.collapsed}
			defaultOpen={!local.defaultCollapsed}
			{...combinedProps}
		>
			<Show
				when={
					title() ||
					local.collapsible ||
					local.collapsed ||
					local.defaultCollapsed
				}
			>
				<div class="title">
					<Show when={typeof title() === "string"} fallback={title()}>
						<Text>{title()}</Text>
					</Show>

					<Show when={local.collapsible || local.defaultCollapsed}>
						<Collapsible.Trigger class="jdd collapse-toggle">
							<Text>
								<RiArrowsArrowDownSLine />
							</Text>
						</Collapsible.Trigger>
					</Show>
				</div>
			</Show>
			<Collapsible.Content class="content">
				{local.children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
