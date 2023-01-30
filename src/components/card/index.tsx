import "./index.scss";
import {
	ComponentProps,
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
		},
		keys: [
			"title",
			"size",
			"children",
			"noPadding",
			"collapsible",
			"collapsed",
			"defaultCollapsed",
		],
	});

	return (
		<Collapsible.Root
			class="jdd card"
			classList={{
				small: local.size === "small",
				"no-padding": local.noPadding,
			}}
			isOpen={local.collapsed === undefined ? undefined : !local.collapsed}
			defaultIsOpen={!local.defaultCollapsed}
			{...others}
		>
			<Show when={local.title || local.collapsible || local.defaultCollapsed}>
				<div class="title">
					{typeof local.title === "string" ? (
						<Text>{local.title}</Text>
					) : (
						local.title
					)}

					<Show when={local.collapsible || local.defaultCollapsed}>
						<Collapsible.Trigger
							class="jdd collapse-toggle"
							preventFocusOnPress
						>
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
