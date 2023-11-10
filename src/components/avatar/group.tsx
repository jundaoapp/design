import { Button } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import {
	For,
	JSX,
	JSXElement,
	Match,
	Show,
	Switch,
	createMemo,
} from "solid-js";
import { AvatarProps } from ".";
import { Avatar, Link, Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type AvatarGroupProps = IntrinsicComponentProps<
	"div",
	Pick<AvatarProps, "size" | "shape"> & {
		max?: number;
		overlap?: boolean;
		avatarProps?: AvatarProps;
		moreSrc?: string;
		moreOnClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
	}
>;

export default function AvatarGroup(props: AvatarGroupProps) {
	const [local, others] = processProps({
		props,
		default: {
			overlap: true,
		},
		keys: [
			"max",
			"overlap",
			"children",
			"size",
			"avatarProps",
			"shape",
			"moreSrc",
			"moreOnClick",
		],
	});

	const memoChildren = createMemo(() => local.children);

	const children = // @ts-ignore: memoChildren()() is a function
		typeof memoChildren() === "function" ? memoChildren()() : memoChildren();

	const childrendArray: JSXElement[] = Array.isArray(children)
		? children
		: [children];

	const moreAvatar = (
		<Avatar
			size={local.size}
			shape={local.shape}
			icon={
				<Text style={{ "font-size": ".75em" }}>
					+{childrendArray.length + 1 - local.max!}
				</Text>
			}
			alt={`+${childrendArray.length + 1 - local.max!}`}
			{...local.avatarProps}
		/>
	);

	const combinedProps = combineProps(others, {
		class: "jdd avatar-group",
		get classList() {
			return {
				"no-overlap": !local.overlap,
				small: local.size === "small",
				large: local.size === "large",
			};
		},
	});

	return (
		<div {...combinedProps}>
			<Show
				when={local.max !== undefined && childrendArray.length >= local.max}
			>
				<Switch fallback={moreAvatar}>
					<Match when={local.moreSrc}>
						<Link href={local.moreSrc}>{moreAvatar}</Link>
					</Match>
					<Match when={local.moreOnClick}>
						<Button.Root class="jdd" onClick={local.moreOnClick}>
							{moreAvatar}
						</Button.Root>
					</Match>
				</Switch>
			</Show>

			<For each={childrendArray}>
				{(item, index) => {
					if (local.max !== undefined && index() >= local.max) return;
					return item;
				}}
			</For>
		</div>
	);
}
