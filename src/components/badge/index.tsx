import { combineProps } from "@solid-primitives/props";
import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Transition } from "solid-transition-group";
import { Spinner, Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

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
		target?: string;
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
			"target",
		],
	});

	const combinedProps = combineProps(others, {
		class: "jdd badge-wrapper",
	});

	return (
		<div {...combinedProps}>
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
						target={local.target}
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
