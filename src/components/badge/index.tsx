import "./index.scss";
import { createEffect, on, Show } from "solid-js";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Transition } from "solid-transition-group";
import { Dynamic } from "solid-js/web";
import { Spinner, Text } from "..";

export type BadgeProps = IntrinsicComponentProps<
	"div",
	{
		href?: string;
		max?: number;
		count?: number;
		status?: "success" | "default" | "error" | "warning";
		loading?: boolean;
		showZero?: boolean;
		text?: string;
		title?: string;
		show?: boolean;
	}
>;

export function Badge(props: BadgeProps) {
	const [local, others] = processProps({
		props,
		default: {
			status: "default",
			max: 99,
			showZero: false,
			show: true,
		},
		keys: [
			"href",
			"max",
			"count",
			"status",
			"showZero",
			"text",
			"title",
			"children",
			"loading",
			"show",
		],
	});

	return (
		<div class="jdd badge-wrapper" {...others}>
			{local.children}

			<Transition name="badge-animation" appear>
				<Show when={local.show && (local.showZero || local.count !== 0)}>
					<Dynamic
						component={local.href === undefined ? "div" : "a"}
						role="status"
						href={local.href}
						class={`jdd badge ${local.status}`}
						classList={{
							loading: local.loading,
							dot: local.count === undefined,
						}}
						title={local.title}
					>
						{(local.count ?? 0) > (local.max ?? 0)
							? `${local.max}+`
							: local.count}
						<Show when={local.loading}>
							<Spinner />
						</Show>
					</Dynamic>
				</Show>
			</Transition>
			<Show
				when={
					local.show && local.children === undefined && local.text !== undefined
				}
			>
				<Text class="badge-text">{local.text}</Text>
			</Show>
		</div>
	);
}
