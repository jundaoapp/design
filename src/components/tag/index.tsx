import "./index.scss";
import { createEffect, createSignal, mergeProps, on, Show } from "solid-js";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Transition } from "solid-transition-group";
import { Dynamic } from "solid-js/web";
import { Icon, Spinner, Text } from "..";
import { combineProps } from "@solid-primitives/props";

export type TagProps = IntrinsicComponentProps<
	"span" | "a",
	{
		status?: "success" | "default" | "error" | "warning";
		color?: string;
		background?: string;
		closeable?: boolean;
		onClose?: () => void;
	}
>;

export function Tag(props: TagProps) {
	const [local, others] = processProps({
		props,
		default: {
			closeable: false,
		},
		keys: ["status", "color", "background", "closeable", "children", "onClose"],
	});

	const [show, setShow] = createSignal(true);

	const combinedProps = combineProps(others, {
		class: "jdd tag",
		get style() {
			return {
				color: local.color,
				background: local.background,
			};
		},
		get classList() {
			return {
				success: local.status === "success",
				error: local.status === "error",
				warning: local.status === "warning",
			};
		},
	});

	return (
		<Transition name="tag-animation" appear>
			<Show when={show()}>
				{/* @ts-ignore: Can't infer type */}
				<Dynamic component={"href" in props ? "a" : "span"} {...combinedProps}>
					{local.children}

					<Show when={local.closeable}>
						<button
							class="tag-close"
							onclick={() => {
								local.onClose?.();
								setShow(false);
							}}
						>
							<Icon icon="close" />
						</button>
					</Show>
				</Dynamic>
			</Show>
		</Transition>
	);
}
