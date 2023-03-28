import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Image as KobalteImage } from "@kobalte/core";
import { createMemo, JSX, Show } from "solid-js";
import { combineProps } from "@solid-primitives/props";

export type ImageProps = IntrinsicComponentProps<
	"span",
	{
		src?: string;
		alt?: string;
		fallback?: JSX.Element;
		srcset?: string;
		loading?: "eager" | "lazy";
		shape?: "circle" | "rounded" | "square";
		children?: never;
	} & KobalteImage.ImageRootProps
>;

export function Image(props: ImageProps) {
	const [local, others] = processProps({
		props,
		default: {
			shape: "rounded",
		},
		keys: ["shape", "src", "alt", "fallback", "srcset", "loading"],
	});

	const fallback = createMemo(() => local.fallback);

	const combinedProps = combineProps(others, {
		class: "jdd image",
		get classList() {
			return {
				circle: local.shape === "circle",
				rounded: local.shape === "rounded",
			};
		},
	});

	return (
		<KobalteImage.Root {...combinedProps}>
			<KobalteImage.Img
				src={local.src}
				alt={
					local.alt ?? typeof fallback() === "string"
						? (fallback() as string)
						: undefined
				}
				srcset={local.srcset}
				loading={local.loading}
				class="image-image"
			/>
			<Show when={fallback()}>
				<KobalteImage.Fallback class="image-fallback">
					{fallback()}
				</KobalteImage.Fallback>
			</Show>
		</KobalteImage.Root>
	);
}
