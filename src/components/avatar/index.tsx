import { combineProps } from "@solid-primitives/props";
import { JSXElement } from "solid-js";
import { Image, Text } from "..";
import AvatarGroup from "../avatar/group";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

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

	const combinedProps = combineProps(others, {
		class: "jdd avatar",
		get classList() {
			return {
				small: local.size === "small",
				large: local.size === "large",
			};
		},
	});

	return (
		<div {...combinedProps}>
			<Image
				src={local.src}
				srcset={local.srcset}
				alt={local.alt}
				fallback={local.icon ? <Text>{local.icon}</Text> : local.alt}
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
