import "./index.scss";
import {
	children,
	ComponentProps,
	createEffect,
	createMemo,
	createSignal,
	For,
	JSXElement,
	mergeProps,
	on,
	splitProps,
} from "solid-js";
import { Button, Icon, Spinner, Text } from "@jundao/design";

export type BreadcrumbProps = ComponentProps<"div"> & {
	separator?: JSXElement;
	collapsed?: boolean;
	max?: number;
	beforeCollapse?: number;
	afterCollapse?: number;
};

const defaultProps = {
	separator: "/",
	max: 4,
};

export default function Breadcrumb(props: BreadcrumbProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"separator",
		"collapsed",
		"max",
		"beforeCollapse",
		"afterCollapse",
	]);

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
							<Button onClick={() => setCollapsed(false)} size="small">
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
