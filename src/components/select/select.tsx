import { processProps } from "../utilities";
import {
	Select as KobalteSelect,
	MultiSelect as KobalteMultiSelect,
	As,
	CollectionNode,
} from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { Button, Icon, Card, Text, Space, Tag } from "..";
import { SelectProps, MultiSelectProps } from ".";
import { Dynamic } from "solid-js/web";
import { Accessor, createMemo, For, JSXElement, Show } from "solid-js";
import {
	SelectItemComponentProps,
	SelectValueComponentProps,
} from "@kobalte/core/dist/types/select";
import { MultiSelectValueComponentProps } from "@kobalte/core/dist/types/multi-select";
import { SelectBaseItemComponentProps } from "@kobalte/core/dist/types/select/select-base";
import { combineProps } from "@solid-primitives/props";

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
			"disabled",
			"autofocus",
			"required",
			"readonly",
			"open",
			"onChange",
			"placeholder",
			"options",
			"errorMessage",
			"description",
			"invalid",
			"value",
			"defaultValue",
			"valueComponent",
		],
	});

	let ref!: HTMLButtonElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);
	const errorMessage = createMemo(() => local.errorMessage);

	const combinedProps = combineProps(others, {
		class: "select",
	});

	return (
		<KobalteSelect.Root
			ref={ref}
			placeholder={local.placeholder}
			options={local.options}
			isDisabled={local.disabled}
			isRequired={local.required}
			isReadOnly={local.readonly}
			isOpen={local.open}
			value={local.value}
			defaultValue={local.defaultValue}
			onValueChange={local.onChange}
			validationState={local.invalid ? "invalid" : "valid"}
			valueComponent={
				local.valueComponent ??
				((props: SelectValueComponentProps<Option>) =>
					props.item.rawValue as JSXElement)
			}
			itemComponent={(props: SelectItemComponentProps<Option>) =>
				(
					<KobalteSelect.Item item={props.item} class="item">
						<KobalteSelect.ItemLabel asChild>
							<As component={Text} class="label">
								{props.item.rawValue as JSXElement}
							</As>
						</KobalteSelect.ItemLabel>
						<KobalteMultiSelect.ItemIndicator asChild>
							<As component={Text} class="indicator">
								<Icon icon="check" />
							</As>
						</KobalteMultiSelect.ItemIndicator>
					</KobalteSelect.Item>
				) as JSXElement
			}
			asChild
		>
			<As component={Space} class="select-wrapper">
				<Show when={label()}>
					<KobalteSelect.Label class="select-label">
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</KobalteSelect.Label>
				</Show>

				<Space vertical>
					<KobalteSelect.Trigger asChild>
						<As component={Button} size={local.size} {...combinedProps}>
							<KobalteSelect.Value class="value" />
							<KobalteSelect.Icon asChild>
								<As component={Icon} icon="code" />
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
