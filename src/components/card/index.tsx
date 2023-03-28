import "./index.scss";
import { createMemo, JSXElement, Show } from "solid-js";
import { Icon, Text } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Collapsible } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";

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
		class: !(local.collapsible || local.collapsed || local.defaultCollapsed)
			? "jdd card"
			: "jdd card collapsible",
		get classList() {
			return {
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
			isOpen={local.collapsed === undefined ? undefined : !local.collapsed}
			defaultIsOpen={!local.defaultCollapsed}
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
								<Icon icon="arrow-down-s" line />
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
