import "./index.scss";
import "../link/index.scss";
import {
	createEffect,
	createMemo,
	createSignal,
	For,
	JSXElement,
	on,
} from "solid-js";
import { Button, Icon, Text } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Breadcrumbs as KobalteBreadcrumbs } from "@kobalte/core";
import { BreadcrumbLink } from "./link";

export type BreadcrumbProps = IntrinsicComponentProps<
	"nav",
	{
		separator?: JSXElement;
		collapsed?: boolean;
		max?: number;
		beforeCollapse?: number;
		afterCollapse?: number;
	}
>;

function Breadcrumb(props: BreadcrumbProps) {
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
		<KobalteBreadcrumbs.Root
			class="jdd breadcrumb"
			aria-label="Breadcrumbs"
			classList={{ collapsible: local.collapsed === undefined }}
			separator={
				typeof local.separator === "string" ? (
					<Text>{local.separator}</Text>
				) : (
					local.separator
				)
			}
			{...others}
		>
			<ol>
				<For each={renderItems()}>
					{(item, index) => {
						if (index() + 1 < renderItems().length) {
							return (
								<li>
									{item}
									<KobalteBreadcrumbs.Separator />
								</li>
							);
						}

						return item;
					}}
				</For>
			</ol>
		</KobalteBreadcrumbs.Root>
	);
}

const CompoundedBreadcrumb = Breadcrumb as typeof Breadcrumb & {
	Link: typeof BreadcrumbLink;
};
CompoundedBreadcrumb.Link = BreadcrumbLink;
export { CompoundedBreadcrumb as Breadcrumb };
