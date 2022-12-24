import "./index.scss";
import {
	ComponentProps,
	createSignal,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
	For,
} from "solid-js";
import { Icon, Text, Avatar } from "@jundao/design";
import { AvatarProps } from "@jundao/design/avatar";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type AvatarGroupProps = IntrinsicComponentProps<
	"div",
	Pick<AvatarProps, "size" | "shape"> & {
		max?: number;
		overlap?: boolean;
		avatarProps?: AvatarProps;
	}
>;

export default function AvatarGroup(props: AvatarGroupProps) {
	const [local, others] = processProps({
		props,
		default: {
			overlap: true,
		},
		keys: ["max", "overlap", "children", "size", "avatarProps", "shape"],
	});

	const children =
		typeof local.children === "function" ? local.children() : local.children;

	const childrendArray: JSXElement[] = Array.isArray(children)
		? children
		: [children];

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
				<Avatar
					size={local.size}
					shape={local.shape}
					icon={
						<Text style={{ "font-size": ".75em" }}>{`+${
							childrendArray.length + 1 - local.max!
						}`}</Text>
					}
					alt={`+${childrendArray.length + 1 - local.max!}`}
					{...local.avatarProps}
				/>
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
