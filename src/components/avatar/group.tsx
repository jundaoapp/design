import "./index.scss";
import {
	ComponentProps,
	createSignal,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
} from "solid-js";
import { Icon, Text, Avatar } from "@jundao/design";
import { AvatarProps } from "@jundao/design/avatar"

export type AvatarGroupProps = ComponentProps<"div"> & Pick<AvatarProps, "size" | "shape"> & {
  max?: number;
  overlap?: boolean;
  avatarProps?: AvatarProps;
};

const defaultProps = {
  overlap: true,

};

export default function AvatarGroup(props: AvatarGroupProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"max",
    "overlap",
    "children",
    "size",
    "avatarProps",
    "shape",
	]);

    const childrendArray: JSXElement[] = Array.isArray(local.children())
		? local.children()
		: [local.children()];


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

      <Show when={local.max !== undefined && childrendArray.length >= local.max}>
        <Avatar size={local.size} shape={local.shape} icon={<Text style={{"font-size": ".75em"}}>{`+${childrendArray.length + 1 - local.max}`}</Text>} alt={`+${childrendArray.length + 1 - local.max}`} {...local.avatarProps}/>
      </Show>

      <For
      each={childrendArray}
      >
        {(item, index) => {
          if (local.max !== undefined && index() >= local.max) return;
          return item;
      }}
        </For>
		</div>
	);
}
