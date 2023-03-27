import "./index.scss";
import { createEffect, createSignal, mergeProps, on, Show } from "solid-js";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Transition } from "solid-transition-group";
import { Dynamic } from "solid-js/web";
import { Icon, Spinner, Text } from "..";

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
		keys: [
			"status",
			"color",
			"background",
			"closeable",
			"style",
			"children",
			"onClose",
		],
	});

	const [show, setShow] = createSignal(true);

	return (
		<Transition name="tag-animation" appear>
			<Show when={show()}>
				<Dynamic
					component={"href" in props ? "a" : "span"}
					class="jdd tag"
					classList={{
						success: local.status === "success",
						error: local.status === "error",
						warning: local.status === "warning",
					}}
					style={mergeProps(
						{
							color: local.color,
							background: local.background,
						},
						local.style,
					)}
					{...others}
				>
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
