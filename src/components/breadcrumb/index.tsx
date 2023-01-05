import "./index.scss";
import {
	createEffect,
	createMemo,
	createSignal,
	For,
	JSXElement,
	on,
} from "solid-js";
import { Button, Icon, Text } from "@jundao/design";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type BreadcrumbProps = IntrinsicComponentProps<
	"div",
	{
		separator?: JSXElement;
		collapsed?: boolean;
		max?: number;
		beforeCollapse?: number;
		afterCollapse?: number;
	}
>;

export default function Breadcrumb(props: BreadcrumbProps) {
	const [local, others] = processProps({
		props,
		default: {
			separator: "/",
			max: 4,
		},
		keys: [
			"children",
			"separator",
			"collapsed",
			"max",
			"beforeCollapse",
			"afterCollapse",
		],
	});

	const [collapsed, setCollapsed] = createSignal(true);
	const [renderItems, setRenderItems] = createSignal<JSXElement[]>([]);

	const beforeCollapse =
		local.beforeCollapse ??
		(local.afterCollapse === undefined ? 1 : local.max - local.afterCollapse);

	const afterCollapse =
		local.afterCollapse ??
		local.max - (local.beforeCollapse ?? beforeCollapse) - 1;

	const children =
		typeof local.children === "function" ? local.children() : local.children;

	const childrendArray: JSXElement[] = Array.isArray(children)
		? children
		: [children];

	createEffect(
		on(
			() => local.collapsed ?? collapsed(),
			(collapsed) => {
				if (
					childrendArray.length <= local.max ||
					!(local.collapsed ?? collapsed)
				) {
					setRenderItems(childrendArray);
				} else if (local.max <= 1) {
					setRenderItems([childrendArray[childrendArray.length - 1]]);
				} else {
					setRenderItems(
						createMemo(() => [
							...childrendArray.slice(0, beforeCollapse),
							<Button onPress={() => setCollapsed(false)} size="small">
								<Icon icon="more" />
							</Button>,
							...[...childrendArray]
								.reverse()
								.slice(0, afterCollapse)
								.reverse(),
						]),
					);
				}
			},
		),
	);

	return (
		<div
			class="jdd breadcrumb"
			aria-label="Breadcrumbs"
			classList={{ collapsible: local.collapsed === undefined }}
			{...others}
		>
			<For each={renderItems()}>
				{(item, index) => {
					if (index() + 1 < renderItems().length) {
						return (
							<>
								{item}
								{typeof local.separator === "string" ? (
									<Text>{local.separator}</Text>
								) : (
									local.separator
								)}
							</>
						);
					}

					return item;
				}}
			</For>
		</div>
	);
}
