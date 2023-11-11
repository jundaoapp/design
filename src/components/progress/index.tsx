import { As, Progress as KobalteProgress } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import {
	RiSystemCheckboxCircleFill,
	RiSystemCloseCircleFill,
} from "solid-icons/ri";
import { For, JSXElement, Match, Show, Switch, createMemo } from "solid-js";
import { Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type ProgressProps = IntrinsicComponentProps<
	"div",
	{
		label?: JSXElement;
		value?: number | number[];
		type?: "line" | "circle";
		min?: number;
		max?: number;
		steps?: boolean;
		showInfo?: boolean;
		statusIcon?: boolean;
		status?: "default" | "active" | "indeterminate" | "success" | "fail";
		successOnComplete?: boolean;
		children?: never;
		customColor?: string | (string | undefined)[];
		mini?: boolean;
	}
>;

export function Progress(props: ProgressProps) {
	const [local, others] = processProps({
		props,
		default: {
			value: 0,
			min: 0,
			max: 100,
			steps: false,
			status: "default",
			showInfo: true,
			successOnComplete: true,
			statusIcon: true,
			type: "line",
			mini: false,
		},
		keys: [
			"label",
			"steps",
			"status",
			"showInfo",
			"successOnComplete",
			"min",
			"max",
			"customColor",
			"value",
			"statusIcon",
			"type",
			"mini",
		],
	});

	const label = createMemo(() => local.label);

	const combinedProps = combineProps(others, {
		class: "jdd progress",
		get classList() {
			return {
				active: local.status === "active",
				success:
					local.status === "success" ||
					(!Array.isArray(local.value) &&
						local.successOnComplete &&
						local.value === local.max),
				fail: local.status === "fail",
				steps: local.steps,
				circle: local.type === "circle",
				mini: local.mini,
			};
		},
	});

	return (
		<KobalteProgress.Root
			indeterminate={local.status === "indeterminate"}
			getValueLabel={
				local.steps ? (params) => `${params.value} / ${params.max}` : undefined
			}
			minValue={local.min}
			maxValue={local.max}
			value={
				Array.isArray(local.value)
					? local.value.reduce((sum, a) => sum + a, 0)
					: local.value
			}
			{...combinedProps}
		>
			<Show when={label()}>
				<KobalteProgress.Label>
					<Show when={typeof label() === "string"} fallback={label()}>
						<Text>{label()}</Text>
					</Show>
				</KobalteProgress.Label>
			</Show>

			<For each={[...Array(local.steps ? local.max! - local.min! : 1).keys()]}>
				{(index) => (
					<KobalteProgress.Track asChild>
						<As
							component={local.type === "circle" ? "svg" : "div"}
							class="progress-track"
							classList={{
								completed: local.steps
									? index < local.value!
									: local.value === local.max,
								current: local.steps ? index === local.value : true,
							}}
						>
							<Show when={local.type === "circle"}>
								<circle class="progress-track" />
							</Show>

							<For
								each={[
									...Array(
										Array.isArray(local.value) ? local.value.length : 1,
									).keys(),
								].reverse()}
							>
								{(fillIndex) => (
									<KobalteProgress.Fill asChild>
										<As
											component={local.type === "circle" ? "circle" : "div"}
											class="progress-fill"
											style={{
												"--jdd-progress-fill-background": Array.isArray(
													local.customColor,
												)
													? local.customColor.length > index
														? local.customColor[local.steps ? index : fillIndex]
														: local.customColor[local.customColor.length - 1]
													: local.customColor,
												"--kb-progress-fill-width": `${
													Array.isArray(local.value)
														? getCurrentValue(fillIndex, local.value)
														: local.value
												}%`,
											}}
										/>
									</KobalteProgress.Fill>
								)}
							</For>
						</As>
					</KobalteProgress.Track>
				)}
			</For>

			<Show
				when={local.showInfo && local.status !== "indeterminate" && !local.mini}
			>
				<Switch
					fallback={
						<Text class="progress-info">
							<KobalteProgress.ValueLabel />
						</Text>
					}
				>
					<Match
						when={
							local.statusIcon &&
							(local.status === "success" ||
								(!Array.isArray(local.value) &&
									local.status !== "fail" &&
									local.successOnComplete &&
									local.value === local.max))
						}
					>
						<Text class="progress-info" type="success">
							<RiSystemCheckboxCircleFill />
						</Text>
					</Match>

					<Match when={local.statusIcon && local.status === "fail"}>
						<Text class="progress-info" type="danger">
							<RiSystemCloseCircleFill />
						</Text>
					</Match>
				</Switch>
			</Show>
		</KobalteProgress.Root>
	);
}

function getCurrentValue(index: number, values: number[]): number {
	let total = 0;
	let i = index;
	while (i >= 0) {
		total += values[i--];
	}
	return total;
}
