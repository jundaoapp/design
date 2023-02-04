import "./index.scss";
import {
	ComponentProps,
	createSignal,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
	For,
	Switch,
	Match,
	JSX,
} from "solid-js";
import { Icon, Text, Avatar, Link } from "..";
import { AvatarProps } from ".";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Button } from "@kobalte/core";

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

	const children =
		typeof local.children === "function" ? local.children() : local.children;

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

	return (
		<div
			class="jdd avatar-group"
			classList={{
				"no-overlap": !local.overlap,
				small: local.size === "small",
				large: local.size === "large",
			}}
			{...others}
		>
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
