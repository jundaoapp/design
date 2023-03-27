import "./index.scss";
import { processProps } from "../utilities";
import { MultiSelect as KobalteMultiSelect, As } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { Button, Icon, Card, Text, Space, Tag } from "..";
import { MultiSelectProps } from ".";
import { createMemo, For, JSXElement, onMount, Show } from "solid-js";
import { SelectValueComponentProps } from "@kobalte/core/dist/types/select";
import {
	MultiSelectItemComponentProps,
	MultiSelectValueComponentProps,
} from "@kobalte/core/dist/types/multi-select";

export function MultiSelect<Option>(props: MultiSelectProps<Option>) {
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
			"tags",
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
			: (props: MultiSelectValueComponentProps<Option>) =>
					props.items
						.map((i) => i.rawValue)
						.sort()
						.join(", "));

	return (
		<KobalteMultiSelect.Root
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
			valueComponent={valueComponent}
			itemComponent={(props: MultiSelectItemComponentProps<Option>) =>
				(
					<KobalteMultiSelect.Item item={props.item} class="item">
						<KobalteMultiSelect.ItemLabel asChild>
							<As component={Text} class="label">
								{props.item.rawValue as JSXElement}
							</As>
						</KobalteMultiSelect.ItemLabel>
						<KobalteMultiSelect.ItemIndicator asChild>
							<As component={Text} class="indicator">
								<Icon icon="check" />
							</As>
						</KobalteMultiSelect.ItemIndicator>
					</KobalteMultiSelect.Item>
				) as JSXElement
			}
			asChild
		>
			<As component={Space} class="select-wrapper">
				<Show when={label()}>
					<KobalteMultiSelect.Label class="select-label">
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</KobalteMultiSelect.Label>
				</Show>

				<Space vertical>
					<KobalteMultiSelect.Trigger asChild {...others}>
						<As
							component={Button}
							class={local.tags ? "select tags" : "select"}
							size={local.size}
						>
							<KobalteMultiSelect.Value class="value" />
							<KobalteMultiSelect.Icon asChild>
								<As component={Icon} icon="code" />
							</KobalteMultiSelect.Icon>
						</As>
					</KobalteMultiSelect.Trigger>

					<Show when={description()}>
						<KobalteMultiSelect.Description>
							<Show
								when={typeof description() === "string"}
								fallback={description()}
							>
								<Text type="secondary" size="small">
									{description()}
								</Text>
							</Show>
						</KobalteMultiSelect.Description>
					</Show>

					<Show when={errorMessage()}>
						<KobalteMultiSelect.ErrorMessage>
							<Show
								when={typeof errorMessage() === "string"}
								fallback={errorMessage()}
							>
								<Text type="danger" size="small">
									{errorMessage()}
								</Text>
							</Show>
						</KobalteMultiSelect.ErrorMessage>
					</Show>
				</Space>

				<KobalteMultiSelect.Portal>
					<KobalteMultiSelect.Content asChild>
						<As
							component={Card}
							contrastBackground
							noPadding
							size="small"
							class="jdd select-content"
						>
							<KobalteMultiSelect.Listbox class="select-list" />
						</As>
					</KobalteMultiSelect.Content>
				</KobalteMultiSelect.Portal>
			</As>
		</KobalteMultiSelect.Root>
	);
}

function TagValueComponent<Option>(
	props: MultiSelectValueComponentProps<Option>,
) {
	return (
		<For
			each={props.items.sort(
				(a, b) =>
					((a.rawValue > b.rawValue) as unknown as number) -
					((a.rawValue < b.rawValue) as unknown as number),
			)}
		>
			{(item) => (
				<Tag
					closeable
					onClose={() => props.remove(item)}
					onPointerDown={(event: PointerEvent) => event.stopPropagation()}
				>
					{item.rawValue as JSXElement}
				</Tag>
			)}
		</For>
	);
}
