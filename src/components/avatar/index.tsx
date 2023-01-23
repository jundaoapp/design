import "./index.scss";
import {
	ComponentProps,
	createSignal,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
} from "solid-js";
import AvatarGroup from "../avatar/group";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

export type AvatarProps = IntrinsicComponentProps<
	"div",
	Pick<ComponentProps<"img">, "src" | "srcSet" | "alt" | "crossOrigin"> & {
		size?: "small" | "default" | "large";
		shape?: "circle" | "square";
		icon?: JSXElement;
	}
>;

function Avatar(props: AvatarProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			shape: "circle",
		},
		keys: ["size", "shape", "icon", "src", "srcSet", "alt", "crossOrigin"],
	});

	return (
		<div
			class="jdd avatar"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				square: local.shape === "square",
			}}
			{...others}
		>
			<Show when={local.src !== undefined} fallback={local.icon ?? local.alt}>
				<img
					src={local.src}
					srcSet={local.srcSet}
					alt={local.alt}
					crossOrigin={local.crossOrigin}
					draggable={false}
				/>
			</Show>
		</div>
	);
}

const CompoundedAvatar = Avatar as typeof Avatar & {
	Group: typeof AvatarGroup;
};
CompoundedAvatar.Group = AvatarGroup;
export { CompoundedAvatar as Avatar };
