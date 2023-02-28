import "./index.scss";
import {
	ComponentProps,
	createMemo,
	createSignal,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
} from "solid-js";
import { Icon, Text } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Collapsible } from "@kobalte/core";

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

	if (!(local.collapsible || local.collapsed || local.defaultCollapsed)) {
		return (
			<div
				class="jdd card"
				classList={{
					small: local.size === "small",
					"no-padding": local.noPadding,
					"contrast-background": local.contrastBackground,
				}}
				{...others}
			>
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
			class="jdd card collapsible"
			classList={{
				small: local.size === "small",
				"no-padding": local.noPadding,
			}}
			isOpen={local.collapsed === undefined ? undefined : !local.collapsed}
			defaultIsOpen={!local.defaultCollapsed}
			{...others}
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
