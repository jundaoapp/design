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
import { Image } from "..";

export type AvatarProps = IntrinsicComponentProps<
	"div",
	{
		size?: "small" | "default" | "large";
		shape?: "circle" | "square";
		icon?: JSXElement;
		src?: string;
		srcset?: string;
		alt?: string;
	}
>;

function Avatar(props: AvatarProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			shape: "circle",
		},
		keys: ["size", "shape", "icon", "src", "srcset", "alt"],
	});

	return (
		<div
			class="jdd avatar"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
			}}
			{...others}
		>
			<Image
				src={local.src}
				srcset={local.srcset}
				alt={local.alt}
				fallback={local.icon ?? local.alt}
				shape={local.shape === "square" ? "rounded" : "circle"}
			/>
		</div>
	);
}

const CompoundedAvatar = Avatar as typeof Avatar & {
	Group: typeof AvatarGroup;
};
CompoundedAvatar.Group = AvatarGroup;
export { CompoundedAvatar as Avatar };
