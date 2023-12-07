import { As, Select as KobalteSelect } from "@kobalte/core";
import { SelectBaseItemComponentProps } from "@kobalte/core/dist/types/select/select-base";
import { SelectValueState } from "@kobalte/core/dist/types/select/select-value";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import { RiDevelopmentCodeFill, RiSystemCheckFill } from "solid-icons/ri";
import { For, JSXElement, Show, createMemo } from "solid-js";
import { Button, Card, Space, Tag, Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type SelectProps<Option> = IntrinsicComponentProps<
	"button",
	{
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
		label?: string;
		danger?: boolean;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		autofocus?: boolean;
		open?: boolean;
		invalid?: boolean;
		errorMessage?: JSXElement;
		description?: JSXElement;
		children?: never;
		valueComponent?:
			| JSXElement
			| ((state: SelectValueState<Option>) => JSXElement);
		tags?: boolean;
		multiple?: boolean;
	} & Omit<
		KobalteSelect.SelectRootProps<Option>,
		"validationState" | "itemComponent"
	>
>;

export function Select<Option>(props: SelectProps<Option>) {
	const [local, others] = processProps({
		props,
		default: {
			danger: false,
			invalid: false,
		},
		keys: [
			"size",
			"label",
			"type",
			"danger",
			"autofocus",
			"placeholder",
			"options",
			"errorMessage",
			"description",
			"invalid",
			"value",
			"defaultValue",
			"valueComponent",
			"tags",
			"multiple",
			"onChange",
		],
	});

	let ref!: HTMLButtonElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);
	const errorMessage = createMemo(() => local.errorMessage);

	const valueComponent =
		local.valueComponent ??
		(local.tags
			? TagValueComponent
			: (state: SelectValueState<Option>) =>
					state.selectedOptions().sort().join(", "));

	const combinedProps = combineProps(others, {
		class: local.tags ? "select tags" : "select",
	});

	return (
		// @ts-ignore: TS thinks `value` is incompatible
		<KobalteSelect.Root
			placeholder={local.placeholder}
			options={local.options}
			multiple={local.multiple ?? false}
			value={local.value}
			defaultValue={local.defaultValue}
			onChange={local.onChange}
			validationState={local.invalid ? "invalid" : "valid"}
			itemComponent={(props: SelectBaseItemComponentProps<Option>) =>
				(
					<KobalteSelect.Item item={props.item} class="item">
						<KobalteSelect.ItemLabel asChild>
							<As component={Text} class="label">
								{props.item.rawValue as JSXElement}
							</As>
						</KobalteSelect.ItemLabel>
						<KobalteSelect.ItemIndicator asChild>
							<As component={Text} class="indicator">
								<RiSystemCheckFill />
							</As>
						</KobalteSelect.ItemIndicator>
					</KobalteSelect.Item>
				) as JSXElement
			}
			asChild
		>
			<As component={Space} class="select-wrapper">
				<KobalteSelect.HiddenSelect />
				<Show when={label()}>
					<KobalteSelect.Label class="select-label">
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</KobalteSelect.Label>
				</Show>

				<Space vertical>
					<KobalteSelect.Trigger asChild>
						<As
							component={Button}
							// @ts-ignore: TS doens't understand
							ref={ref}
							size={local.size}
							{...combinedProps}
						>
							<KobalteSelect.Value class="value">
								{valueComponent}
							</KobalteSelect.Value>
							<KobalteSelect.Icon asChild>
								<As component={RiDevelopmentCodeFill} />
							</KobalteSelect.Icon>
						</As>
					</KobalteSelect.Trigger>

					<Show when={description()}>
						<KobalteSelect.Description>
							<Show
								when={typeof description() === "string"}
								fallback={description()}
							>
								<Text type="secondary" size="small">
									{description()}
								</Text>
							</Show>
						</KobalteSelect.Description>
					</Show>

					<Show when={errorMessage()}>
						<KobalteSelect.ErrorMessage>
							<Show
								when={typeof errorMessage() === "string"}
								fallback={errorMessage()}
							>
								<Text type="danger" size="small">
									{errorMessage()}
								</Text>
							</Show>
						</KobalteSelect.ErrorMessage>
					</Show>
				</Space>

				<KobalteSelect.Portal>
					<KobalteSelect.Content asChild>
						<As
							component={Card}
							contrastBackground
							noPadding
							size="small"
							class="jdd select-content"
						>
							<KobalteSelect.Listbox class="select-list" />
						</As>
					</KobalteSelect.Content>
				</KobalteSelect.Portal>
			</As>
		</KobalteSelect.Root>
	);
}

function TagValueComponent<Option>(state: SelectValueState<Option>) {
	return (
		<For
			each={state
				.selectedOptions()
				.sort(
					(a, b) =>
						((a > b) as unknown as number) - ((a < b) as unknown as number),
				)}
		>
			{(item) => (
				<Tag
					closeable
					onClose={() => state.remove(item)}
					onPointerDown={(event: PointerEvent) => event.stopPropagation()}
				>
					{item as JSXElement}
				</Tag>
			)}
		</For>
	);
}
