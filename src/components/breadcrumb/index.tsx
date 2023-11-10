import { Breadcrumbs as KobalteBreadcrumbs } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { RiSystemMoreFill } from "solid-icons/ri";
import {
	For,
	JSXElement,
	createEffect,
	createMemo,
	createSignal,
	on,
} from "solid-js";
import { Button, Text } from "..";
import "../link/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";
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

	const memoChildren = createMemo(() => local.children);

	const children = // @ts-ignore: memoChildren()() is a function
		typeof memoChildren() === "function" ? memoChildren()() : memoChildren();

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
								<RiSystemMoreFill />
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

	const separator = createMemo(() => local.separator);

	const combinedProps = combineProps(others, {
		class: "jdd breadcrumb",
		get classList() {
			return {
				collapsible: local.collapsed === undefined,
			};
		},
	});

	return (
		<KobalteBreadcrumbs.Root
			aria-label="Breadcrumbs"
			separator={
				typeof separator() === "string" ? (
					<Text>{separator()}</Text>
				) : (
					separator()
				)
			}
			{...combinedProps}
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
